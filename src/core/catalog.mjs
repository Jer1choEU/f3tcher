/**
 * Generic, reviewed-source catalog. No source from the parliamentary project
 * is distributed or enabled by this package.
 */
const ID = /^[a-z][a-z0-9-]{1,99}$/;
const KINDS = new Set(["rss", "json", "csv", "html", "text", "pdf", "binary"]);
const PRIVATE = /^(?:localhost|.*\.localhost|.*\.local|.*\.internal|.*\.test)$/i;
export function safeUrl(value) {
  let u;
  try { u = new URL(value); } catch { throw Error("SOURCE_URL_INVALID"); }
  if (u.protocol !== "https:" || u.username || u.password || u.port && u.port !== "443" ||
      u.hash || !u.hostname || PRIVATE.test(u.hostname) ||
      /^\d+(?:\.\d+){3}$/.test(u.hostname) || u.hostname.includes(":") ||
      /^\d+$/.test(u.hostname) || u.hostname.endsWith(".onion")) {
    throw Error("SOURCE_URL_UNSAFE");
  }
  return u;
}
export function validateCatalog(value) {
  if (!value || value.schema_version !== "f3tcher-sources-v1" ||
      !Array.isArray(value.sources) || value.sources.length > 500)
    throw Error("SOURCE_CATALOG_INVALID");
  const ids = new Set();
  for (const s of value.sources) {
    if (!s || !ID.test(s.id || "") || ids.has(s.id) || !KINDS.has(s.kind) ||
        typeof s.enabled !== "boolean" || !Array.isArray(s.domains) ||
        s.domains.some(d => !ID.test(d)) || new Set(s.domains).size !== s.domains.length ||
        !Number.isSafeInteger(s.interval_minutes) || s.interval_minutes < 30 ||
        s.interval_minutes > 43200 || !Number.isSafeInteger(s.priority ?? 0) ||
        (s.priority ?? 0) < 0 || (s.priority ?? 0) > 10) throw Error("SOURCE_CONFIG_INVALID");
    safeUrl(s.url);
    // Permission and access review is an affirmative gate, not a crawler guess.
    if (s.enabled && (s.access_reviewed !== true ||
        typeof s.review_reference !== "string" || !s.review_reference.trim()))
      throw Error("SOURCE_REVIEW_REQUIRED");
    if (s.items_path !== undefined &&
        (s.kind !== "json" || !/^[a-zA-Z0-9_.]{1,120}$/.test(s.items_path)))
      throw Error("SOURCE_ITEMS_PATH_INVALID");
    if (s.fields !== undefined && (!["json", "csv"].includes(s.kind) ||
        !s.fields || typeof s.fields !== "object" ||
        Object.keys(s.fields).some(k => !["url", "title", "published_at"].includes(k)) ||
        Object.values(s.fields).some(v => typeof v !== "string" || !/^[a-zA-Z0-9_.-]{1,120}$/.test(v))))
      throw Error("SOURCE_FIELDS_INVALID");
    ids.add(s.id);
  }
  return value.sources;
}
export function responseErrorCode(error) {
  const code = error?.code || error?.message;
  return typeof code === "string" && /^(?:SOURCE|COLLECTOR|STORE)_[A-Z0-9_]{2,52}$/.test(code)
    ? code : "SOURCE_FAILED";
}

export function validateHolds(value,catalog) {
  if(!value || value.schema_version!=="f3tcher-holds-v1" ||
      !Array.isArray(value.holds))throw Error("SOURCE_HOLDS_INVALID");
  const known=new Set(catalog.map(x=>x.id)),seen=new Set();
  for(const h of value.holds) {
    if(!h || !known.has(h.source_id) || seen.has(h.source_id) ||
       typeof h.reason!=="string" ||
       !/^[a-z0-9_]{5,80}$/.test(h.reason) ||
       typeof h.evidence!=="string" || !h.evidence.trim())
      throw Error("SOURCE_HOLD_INVALID");
    seen.add(h.source_id);
  }
  return value.holds;
}
