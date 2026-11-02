import test from "node:test";
import assert from "node:assert/strict";
import {validateCatalog,validateHolds,safeUrl} from "../src/core/catalog.mjs";
import {selectDueSources,nextFailure,validators,REPRESENTATION_VERSION} from "../src/core/polling.mjs";
import {cleanEtag,parseRetryAfter,fetchBounded} from "../src/core/transport.mjs";
import {extractResponse} from "../src/core/extract.mjs";
import {openStore} from "../src/core/store.mjs";
import {runCollector} from "../src/core/collector.mjs";
import {inspectQuality} from "../src/core/health.mjs";
const feed=(id="feed")=>({id,url:"https://example.org/feed.xml",kind:"rss",
  domains:["example-domain"],enabled:true,access_reviewed:true,
  review_reference:"human-review:example.org:2026-11-02",
  interval_minutes:30,priority:1});
const catalog=(...sources)=>({schema_version:"f3tcher-sources-v1",sources});
const item='<item><title>Example article title on the web</title>'+
  '<link>https://example.org/a</link><pubDate>Sun, 01 Nov 2026 10:00:00 GMT</pubDate></item>';
const xml='<?xml version="1.0"?><rss><channel>'+item+'</channel></rss>';
const respond=(body,status=200,headers={})=>new Response(body,{status,headers});
test("catalog: explicit reviewed access, unique sources, safe HTTPS",()=>{
  assert.equal(validateCatalog(catalog(feed())).length,1);
  assert.throws(()=>validateCatalog(catalog({...feed(),access_reviewed:false})),/REVIEW/);
  assert.throws(()=>validateCatalog(catalog(feed(),feed())),/CONFIG/);
  assert.throws(()=>safeUrl("http://example.org"),/UNSAFE/);
  assert.throws(()=>safeUrl("https://127.0.0.1/foo"),/UNSAFE/);
  assert.throws(()=>safeUrl("https://user:pass@example.org"),/UNSAFE/);
});
test("polling: host fairness, priority tiebreak and persistent 403",()=>{
  const rows=[{id:"b",url:"https://a.example.org/b",enabled:1,next_due_at:null,priority:0},
    {id:"a",url:"https://a.example.org/a",enabled:1,next_due_at:null,priority:2},
    {id:"c",url:"https://b.example.org/",enabled:1,next_due_at:null,priority:0},
    {id:"d",url:"https://c.example.org/",enabled:1,next_due_at:null,last_error:"SOURCE_HTTP_403"}];
  assert.deepEqual(selectDueSources(rows,[],Date.now(),3).map(x=>x.id),["a","c"]);
  assert.deepEqual(selectDueSources(rows,[{host:"b.example.org",
    retry_not_before:"9999-01-01T00:00:00.000Z"}],Date.now(),3).map(x=>x.id),["a"]);
});
test("validators: full refresh and bounded Retry-After",()=>{
  assert.equal(cleanEtag('"123"'),'"123"');
  assert.equal(cleanEtag("new\r\nx"),null);
  assert.equal(parseRetryAfter("120",Date.now()),120000);
  const now=Date.now();
  const s={representation_key:REPRESENTATION_VERSION,etag:'"abc"',
    last_body_at:new Date(now-10000).toISOString()};
  assert.equal(validators(s,now).etag,'"abc"');
  assert.deepEqual(validators({...s,last_body_at:new Date(now-25*60*60*1000).toISOString()},now),{});
  assert.equal(nextFailure({interval_minutes:30,consecutive_failures:0},
    "SOURCE_HTTP_429",120000,now).attempts,1);
});
test("transport: 304 only for a genuine conditional request",async()=>{
  const s=feed();
  let headers;
  const fetchImpl=(_url,options)=>{headers=options.headers;
    return respond(null,304,{etag:'"abc"'});};
  await assert.rejects(fetchBounded(s,{fetchImpl}),/UNEXPECTED_304/);
  const r=await fetchBounded(s,{fetchImpl,validators:{etag:'"old"'}});
  assert.equal(r.not_modified,true);
  assert.equal(headers["If-None-Match"],'"old"');
});
test("transport: 403 stops, cross-host redirects cannot bypass review",async()=>{
  const s=feed();
  await assert.rejects(fetchBounded(s,{fetchImpl:async()=>respond("blocked",403)}),
    /SOURCE_HTTP_403/);
  await assert.rejects(fetchBounded(s,{fetchImpl:async()=>respond(null,302,{
    location:"https://elsewhere.example.org/feed"})}),/REDIRECT_NOT_REVIEWED/);
});
test("extract: RSS provenance and a JSON API collection",async()=>{
  const a=await extractResponse(feed(),{
    bytes:new TextEncoder().encode(xml),final_url:feed().url,not_modified:false});
  assert.equal(a.records.length,1);
  assert.equal(a.records[0].published_at,"2026-11-01T10:00:00.000Z");
  assert.match(a.payload_hash,/^[a-f0-9]{64}$/);
  assert.equal(a.complete,true);
  const s={...feed(),kind:"json",items_path:"data.items",fields:{
    url:"link",title:"name",published_at:"date"}};
  const data=JSON.stringify({data:{items:[{link:"/b",name:"Example",date:"2026-01-01"}]}});
  const b=await extractResponse(s,{bytes:new TextEncoder().encode(data),
    final_url:s.url,not_modified:false});
  assert.equal(b.records[0].url,"https://example.org/b");
  assert.equal(b.complete,true);
});
test("extract: truncation is NEVER represented as complete",async()=>{
  const data='<?xml version="1.0"?><rss><channel>'+item.repeat(151)+'</channel></rss>';
  const r=await extractResponse(feed(),{bytes:new TextEncoder().encode(data),
    final_url:feed().url,not_modified:false});
  assert.equal(r.available,151);assert.equal(r.records.length,150);assert.equal(r.complete,false);
});
test("database: atomic ingest, provenance, idempotence, conditional 304",async()=>{
  const store=await openStore("file::memory:");
  try {
    let calls=0,seen;
    const fetchImpl=async(_url,opts)=>{
      calls++; seen=opts.headers;
      return calls===1 ? respond(xml,200,{etag:'"v1"'}) :
        respond(null,304,{etag:'"v1"'});
    };
    const first=await runCollector({catalog:catalog(feed()),store,fetchImpl});
    assert.equal(first.failed,0);
    assert.equal(first.added,1);
    let h=await store.health();
    assert.equal(h.records,1);assert.equal(h.sightings,1);
    await store.client.execute("UPDATE sources SET next_due_at='2000-01-01' WHERE id='feed'");
    const second=await runCollector({catalog:catalog(feed()),store,fetchImpl});
    assert.equal(second.not_modified,1);
    assert.equal(seen["If-None-Match"],'"v1"');
    h=await inspectQuality(store);
    assert.equal(h.records,1);assert.equal(h.unlinked_sightings,0);
    assert.equal(h.coverage_status,"not_established");
  } finally {store.close();}
});
test("database: 403 permanently disables the source even after catalog sync",async()=>{
  const store=await openStore("file::memory:");
  try {
    const blocked=async()=>respond(null,403);
    const first=await runCollector({catalog:catalog(feed()),store,fetchImpl:blocked});
    assert.equal(first.failed,1);
    assert.equal(first.errors[0].error_code,"SOURCE_HTTP_403");
    const second=await runCollector({catalog:catalog(feed()),store,fetchImpl:blocked});
    assert.equal(second.checked,0);
    const row=(await store.sources())[0];
    assert.equal(row.enabled,0);
    const quality=await inspectQuality(store);
    assert.equal(quality.blocked_http_403,1);
  } finally {store.close();}
});
test("database: Retry-After creates a shared host cooldown",async()=>{
  const store=await openStore("file::memory:");
  try {
    const s={...feed(),id:"one"};
    const second={...feed(),id:"two",url:"https://example.org/other.xml"};
    const result=await runCollector({catalog:catalog(s,second),store,
      fetchImpl:async()=>respond(null,429,{"retry-after":"120"})});
    assert.equal(result.failed,1);
    const holds=await store.holds();
    assert.equal(holds.length,1);
    assert.equal(holds[0].host,"example.org");
    assert.equal(selectDueSources(await store.sources(),holds,Date.now()).length,0);
  } finally {store.close();}
});
test("database: lease prevents overlapping runs",async()=>{
  const store=await openStore("file::memory:");
  try {
    await store.init();
    assert.equal(await store.lease("owner",new Date().toISOString()),true);
    const result=await runCollector({catalog:catalog(feed()),store,
      fetchImpl:async()=>respond(xml)});
    assert.equal(result.status,"already_running");
    await store.release("owner");
  } finally {store.close();}
});

test("independent access holds override enabled catalog sources",async()=>{
  const store=await openStore("file::memory:");
  const holds={schema_version:"f3tcher-holds-v1",
    holds:[{source_id:"feed",reason:"manual_access_hold",evidence:"review ticket #123"}]};
  try {
    assert.equal(validateHolds(holds,[feed()]).length,1);
    let calls=0;
    const result=await runCollector({catalog:catalog(feed()),holds,store,
      fetchImpl:async()=>{calls++;return respond(xml);}});
    assert.equal(result.checked,0);assert.equal(calls,0);
    assert.equal((await store.sources())[0].hold_reason,"manual_access_hold");
  } finally {store.close();}
});
test("deduplication counts inserts, preserves distinct source sightings",async()=>{
  const store=await openStore("file::memory:");
  try {
    const second={...feed(),id:"other",url:"https://other.example.net/feed.xml"};
    const stats=await runCollector({catalog:catalog(feed(),second),store,
      fetchImpl:async()=>respond(xml)});
    const audit=await store.health();
    assert.equal(stats.added,1);
    assert.equal(audit.records,1);
    assert.equal(audit.sightings,2);
  } finally {store.close();}
});
