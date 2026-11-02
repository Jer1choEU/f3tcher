import { REPRESENTATION_VERSION } from "./polling.mjs";
import { responseErrorCode } from "./catalog.mjs";
import { sha256 } from "./extract.mjs";
export const SCHEMA = [
  "CREATE TABLE IF NOT EXISTS sources(id TEXT PRIMARY KEY,url TEXT NOT NULL,kind TEXT NOT NULL,domains TEXT NOT NULL,enabled INTEGER NOT NULL,interval_minutes INTEGER NOT NULL,priority INTEGER NOT NULL DEFAULT 0,hold_reason TEXT,last_checked_at TEXT,last_success_at TEXT,last_body_at TEXT,representation_key TEXT,etag TEXT,last_modified TEXT,next_due_at TEXT,retry_not_before TEXT,consecutive_failures INTEGER NOT NULL DEFAULT 0,last_error TEXT)",
  "CREATE TABLE IF NOT EXISTS host_cooldowns(host TEXT PRIMARY KEY,retry_not_before TEXT NOT NULL)",
  "CREATE TABLE IF NOT EXISTS records(id TEXT PRIMARY KEY,canonical_url TEXT NOT NULL UNIQUE,origin_source_id TEXT NOT NULL,kind TEXT NOT NULL,title TEXT,published_at TEXT,content_sha256 TEXT,first_observed_at TEXT NOT NULL,FOREIGN KEY(origin_source_id) REFERENCES sources(id))",
  "CREATE TABLE IF NOT EXISTS sightings(source_id TEXT NOT NULL,record_id TEXT NOT NULL,first_seen_at TEXT NOT NULL,last_seen_at TEXT NOT NULL,PRIMARY KEY(source_id,record_id),FOREIGN KEY(source_id) REFERENCES sources(id),FOREIGN KEY(record_id) REFERENCES records(id))",
  "CREATE TABLE IF NOT EXISTS record_domains(record_id TEXT NOT NULL,domain_id TEXT NOT NULL,classification_status TEXT NOT NULL DEFAULT 'candidate',PRIMARY KEY(record_id,domain_id),FOREIGN KEY(record_id) REFERENCES records(id))",
  "CREATE TABLE IF NOT EXISTS source_errors(id TEXT PRIMARY KEY,source_id TEXT NOT NULL,occurred_at TEXT NOT NULL,error_code TEXT NOT NULL)",
  "CREATE TABLE IF NOT EXISTS collector_runs(id TEXT PRIMARY KEY,started_at TEXT NOT NULL,finished_at TEXT,checked INTEGER NOT NULL DEFAULT 0,added INTEGER NOT NULL DEFAULT 0,not_modified INTEGER NOT NULL DEFAULT 0,failed INTEGER NOT NULL DEFAULT 0,state TEXT NOT NULL)",
  "CREATE TABLE IF NOT EXISTS collector_leases(name TEXT PRIMARY KEY,owner TEXT NOT NULL,expires_at TEXT NOT NULL)"
];
export class LibsqlStore {
  constructor(client){this.client=client;}
  async init(){for(const sql of SCHEMA)await this.client.execute(sql);}
  async sync(catalog) {
    for(const s of catalog) {
      await this.client.execute({sql:
        "INSERT INTO sources(id,url,kind,domains,enabled,interval_minutes,priority) VALUES (?,?,?,?,?,?,?) "+
        "ON CONFLICT(id) DO UPDATE SET url=excluded.url,kind=excluded.kind,domains=excluded.domains,"+
        "enabled=CASE WHEN sources.last_error='SOURCE_HTTP_403' OR sources.hold_reason IS NOT NULL "+
        "THEN 0 ELSE excluded.enabled END,interval_minutes=excluded.interval_minutes,priority=excluded.priority",
        args:[s.id,s.url,s.kind,JSON.stringify(s.domains),Number(s.enabled),
          s.interval_minutes,s.priority || 0]});
    }
  }
  async sources() {
    const rows=await this.client.execute("SELECT * FROM sources ORDER BY id");
    return rows.rows;
  }
  async holds() {
    const rows=await this.client.execute("SELECT host,retry_not_before FROM host_cooldowns");
    return rows.rows;
  }
  async lease(owner,now) {
    const until=new Date(Date.parse(now)+20*60*1000).toISOString();
    const result=await this.client.execute({sql:
      "INSERT INTO collector_leases(name,owner,expires_at) VALUES ('collector',?,?) "+
      "ON CONFLICT(name) DO UPDATE SET owner=excluded.owner,expires_at=excluded.expires_at "+
      "WHERE collector_leases.expires_at<=? RETURNING owner",
      args:[owner,until,now]});
    return result.rows.length===1 && result.rows[0].owner===owner;
  }
  async release(owner) {
    await this.client.execute({sql:"DELETE FROM collector_leases WHERE name='collector' AND owner=?",args:[owner]});
  }
  async beginRun(id,startedAt){
    await this.client.execute({sql:"INSERT INTO collector_runs(id,started_at,state) VALUES (?,?,?)",
      args:[id,startedAt,"running"]});
  }
  async finishRun(id,finishedAt,stats){
    await this.client.execute({sql:"UPDATE collector_runs SET finished_at=?,checked=?,added=?,"+
      "not_modified=?,failed=?,state=? WHERE id=?",
      args:[finishedAt,stats.checked,stats.added,stats.not_modified,stats.failed,
        stats.failed?"completed_with_errors":"completed",id]});
  }
  async success(source,response,parsed,checkedAt) {
    const next=response.checkpoint;
    const commands=[];
    const candidates=[];
    for(const item of parsed.records) {
      const id=await sha256(item.url);
      candidates.push({item,id});
      commands.push({sql:"INSERT OR IGNORE INTO records(id,canonical_url,origin_source_id,"+
        "kind,title,published_at,content_sha256,first_observed_at) VALUES (?,?,?,?,?,?,?,?)",
        args:[id,item.url,source.id,item.kind,item.title,item.published_at,
          parsed.payload_hash,checkedAt]});
      commands.push({sql:"INSERT INTO sightings(source_id,record_id,first_seen_at,last_seen_at) "+
        "VALUES (?,?,?,?) ON CONFLICT(source_id,record_id) DO UPDATE SET last_seen_at=excluded.last_seen_at",
        args:[source.id,id,checkedAt,checkedAt]});
      for(const domain of JSON.parse(source.domains))commands.push({sql:
        "INSERT OR IGNORE INTO record_domains(record_id,domain_id,classification_status) VALUES (?,?,'candidate')",
        args:[id,domain]});
    }
    commands.push({sql:"UPDATE sources SET last_checked_at=?,last_success_at=?,last_body_at=?,"+
      "representation_key=?,etag=?,last_modified=?,next_due_at=?,retry_not_before=NULL,"+
      "consecutive_failures=0,last_error=NULL WHERE id=?",
      args:[checkedAt,checkedAt,next.last_body_at,next.representation_key,
        next.etag,next.last_modified,next.next_due_at,source.id]});
    await this.client.batch(commands,"write");
    // Idempotent record IDs avoid duplicates across different feeds.
    return candidates.length;
  }
  async failure(source,error,when,next) {
    const code=responseErrorCode(error);
    const commands=[
      {sql:"UPDATE sources SET last_checked_at=?,last_error=?,consecutive_failures=?,"+
        "next_due_at=?,retry_not_before=?,enabled=CASE WHEN ?='SOURCE_HTTP_403' "+
        "THEN 0 ELSE enabled END WHERE id=?",
        args:[when,code,next.attempts,next.next_due_at,next.retry_not_before,code,source.id]},
      {sql:"INSERT INTO source_errors(id,source_id,occurred_at,error_code) VALUES (?,?,?,?)",
        args:[crypto.randomUUID(),source.id,when,code]}
    ];
    if(next.retry_not_before)commands.push({sql:
      "INSERT INTO host_cooldowns(host,retry_not_before) VALUES (?,?) "+
      "ON CONFLICT(host) DO UPDATE SET retry_not_before=MAX(host_cooldowns.retry_not_before,excluded.retry_not_before)",
      args:[new URL(source.url).hostname,next.retry_not_before]});
    await this.client.batch(commands,"write");
    return code;
  }
  async health() {
    const get=async sql => Number((await this.client.execute(sql)).rows[0]?.n || 0);
    const [sources,active,records,sightings,errors,runs,unlinked]=await Promise.all([
      get("SELECT COUNT(*) AS n FROM sources"),
      get("SELECT COUNT(*) AS n FROM sources WHERE enabled=1"),
      get("SELECT COUNT(*) AS n FROM records"),
      get("SELECT COUNT(*) AS n FROM sightings"),
      get("SELECT COUNT(*) AS n FROM source_errors"),
      get("SELECT COUNT(*) AS n FROM collector_runs"),
      get("SELECT COUNT(*) AS n FROM sightings s LEFT JOIN records r ON r.id=s.record_id WHERE r.id IS NULL")
    ]);
    return {ok:true,status:runs?"ready":"awaiting_first_run",sources,active_sources:active,
      records,sightings,error_events:errors,runs,unlinked_sightings:unlinked,
      integrity:unlinked?"gaps_detected":"consistent",
      scope:"persisted_records_not_external_coverage"};
  }
  close(){this.client.close();}
}
export async function openStore(url,authToken) {
  // In Workers the URL is a Turso https/libsql endpoint; in local Node it can
  // be file:... . No secrets or source-specific schemas are bundled.
  const clientModule=url.startsWith("file:") ?
    await import("@libsql/client") : await import("@libsql/client/web");
  return new LibsqlStore(clientModule.createClient({
    url, ...(authToken?{authToken}: {})
  }));
}
