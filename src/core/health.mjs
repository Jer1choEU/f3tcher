/** Read-only aggregate audit. This does not claim completeness of external data. */
export async function inspectQuality(store, now = new Date()) {
  const base=await store.health();
  const db=store.client;
  const result=await db.execute("SELECT id,kind,domains,enabled,last_success_at,"+
    "last_error,interval_minutes,next_due_at FROM sources ORDER BY id LIMIT 500");
  let overdue=0,never=0,failed=0,blocked=0;
  const domains={};
  for(const s of result.rows) {
    if(s.last_error)failed++;
    if(s.last_error==="SOURCE_HTTP_403")blocked++;
    if(!s.enabled)continue;
    if(!s.last_success_at)never++;
    if(!s.next_due_at || Date.parse(s.next_due_at)<=now.getTime())overdue++;
    for(const d of JSON.parse(s.domains)) {
      if(!domains[d])domains[d]={enabled_sources:0,never_successful:0};
      domains[d].enabled_sources++;
      if(!s.last_success_at)domains[d].never_successful++;
    }
  }
  const dates=await db.execute("SELECT "+
    "SUM(CASE WHEN published_at IS NULL THEN 1 ELSE 0 END) AS missing,"+
    "SUM(CASE WHEN published_at>? THEN 1 ELSE 0 END) AS future "+
    "FROM records");
  const records=await db.execute("SELECT title,canonical_url FROM records "+
    "WHERE title IS NOT NULL AND title<>'' ORDER BY first_observed_at DESC LIMIT 300");
  const titles=new Map();
  for(const row of records.rows) {
    const title=String(row.title).normalize("NFKD").replace(/[\u0300-\u036f]/g,"")
      .toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
    if(title.length<20 || title.split(" ").length<4)continue;
    if(!titles.has(title))titles.set(title,new Set());
    titles.get(title).add(row.canonical_url);
  }
  return {...base,never_successful_sources:never,due_sources:overdue,
    sources_with_errors:failed,blocked_http_403:blocked,domains,
    publication_dates:{missing:Number(dates.rows[0]?.missing||0),
      future:Number(dates.rows[0]?.future||0)},
    possible_duplicate_headline_groups:[...titles.values()].filter(s=>s.size>1).length,
    sample_limit:300,duplicates_scope:"candidate_only_not_confirmed",
    coverage_status:"not_established"};
}
