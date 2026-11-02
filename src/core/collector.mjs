import { validateCatalog, validateHolds, responseErrorCode } from "./catalog.mjs";
import { selectDueSources, validators, nextSuccess, nextFailure } from "./polling.mjs";
import { fetchBounded } from "./transport.mjs";
import { extractResponse } from "./extract.mjs";
/**
 * A limited, resumable tick. Each source's records and successful checkpoint
 * are committed in the SAME libSQL transaction, including valid HTTP 304.
 * Multi-run concurrency is controlled by a persisted lease.
 */
export async function runCollector({catalog,holds={schema_version:"f3tcher-holds-v1",holds:[]},store,fetchImpl=fetch,now=new Date(),limit=3}) {
  const sources=validateCatalog(catalog);
  const policy=validateHolds(holds,sources);
  const startedAt=now.toISOString(), startedMs=now.getTime();
  if (!Number.isFinite(startedMs)) throw Error("COLLECTOR_CLOCK_INVALID");
  await store.init();
  await store.sync(sources,policy);
  const owner=crypto.randomUUID();
  if (!await store.lease(owner,startedAt))
    return {status:"already_running",checked:0,added:0,not_modified:0,failed:0};
  const stats={status:"completed",checked:0,added:0,not_modified:0,failed:0,errors:[]};
  try {
    const [rows,holds]=await Promise.all([store.sources(),store.holds()]);
    const catalogById=new Map(sources.map(x=>[x.id,x]));
    const batch=selectDueSources(rows.filter(x=>catalogById.get(x.id)?.enabled),
      holds,startedMs,limit);
    await store.beginRun(owner,startedAt);
    for (const source of batch) {
      // Reserve time for durable checkpoints and lease release.
      if (Date.now()-startedMs > 10*60*1000) break;
      stats.checked++;
      const checkedAt=new Date().toISOString();
      try {
        const response=await fetchBounded(source,{
          fetchImpl,validators:validators(source,startedMs)
        });
        const extracted=await extractResponse(catalogById.get(source.id),response);
        response.complete=extracted.complete;
        response.checkpoint=nextSuccess(source,response,checkedAt);
        stats.added+=await store.success({...source,
          license_reference:catalogById.get(source.id)?.license_reference || null},
          response,extracted,checkedAt);
        if(response.not_modified)stats.not_modified++;
      } catch(error) {
        const code=responseErrorCode(error);
        const retry=nextFailure(source,code,error?.retryAfterMs,Date.now());
        await store.failure(source,error,checkedAt,retry);
        stats.failed++;
        stats.errors.push({source_id:source.id,error_code:code});
      }
    }
    stats.status=stats.failed ? "completed_with_errors" : "completed";
    await store.finishRun(owner,new Date().toISOString(),stats);
    return stats;
  } finally {
    await store.release(owner);
  }
}
