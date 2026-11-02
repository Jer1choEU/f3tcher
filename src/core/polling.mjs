/**
 * Adapted from Fetcher-Silvestri scheduling principles: fairness by oldest due
 * time, host isolation, conditional full refresh and persistent 403 holds.
 */
export const FULL_REFRESH_MS = 24 * 60 * 60 * 1000;
export const REPRESENTATION_VERSION = "f3tcher-v1";
const stamp = x => { const n = Date.parse(x || ""); return Number.isFinite(n) ? n : 0; };
export function selectDueSources(rows, holds = [], nowMs = Date.now(), limit = 3) {
  if (!Number.isFinite(nowMs) || !Number.isSafeInteger(limit) || limit < 1 ||
      limit > 20 || !Array.isArray(rows)) throw Error("COLLECTOR_SELECTION_INVALID");
  const blocked = new Map(holds.map(h => [h.host, stamp(h.retry_not_before)]));
  const due = rows.filter(s => s.enabled === 1 || s.enabled === true).filter(s =>
    s.last_error !== "SOURCE_HTTP_403" && stamp(s.next_due_at) <= nowMs &&
    stamp(s.retry_not_before) <= nowMs &&
    (blocked.get(new URL(s.url).hostname) || 0) <= nowMs);
  due.sort((a,b) => stamp(a.next_due_at) - stamp(b.next_due_at) ||
    Number(b.priority || 0) - Number(a.priority || 0) || a.id.localeCompare(b.id));
  const selected = [], hosts = new Set();
  for (const source of due) {
    const host = new URL(source.url).hostname;
    if (hosts.has(host)) continue;
    hosts.add(host); selected.push(source);
    if (selected.length === limit) break;
  }
  return selected;
}
export function validators(source, nowMs = Date.now()) {
  const age = nowMs - stamp(source.last_body_at);
  if (!source.last_body_at || age < 0 || age >= FULL_REFRESH_MS ||
      source.representation_key !== REPRESENTATION_VERSION) return {};
  return {
    etag: source.etag || null,
    lastModified: source.last_modified || null
  };
}
export function nextSuccess(source, response, checkedAt) {
  const unchanged = response.not_modified === true;
  const complete = unchanged || response.complete === true;
  const interval = Number(source.interval_minutes) * 60_000;
  return {
    etag: complete ? response.etag || (unchanged ? source.etag : null) || null : null,
    last_modified: complete ? response.last_modified ||
      (unchanged ? source.last_modified : null) || null : null,
    representation_key: complete ? REPRESENTATION_VERSION : null,
    last_body_at: unchanged ? source.last_body_at : checkedAt,
    next_due_at: new Date(Date.parse(checkedAt) + interval).toISOString(),
    complete
  };
}
export function nextFailure(source, code, retryAfterMs = 0, nowMs = Date.now()) {
  const attempts = Math.min(16, Number(source.consecutive_failures || 0) + 1);
  const base = Math.min(FULL_REFRESH_MS, Number(source.interval_minutes) * 60_000 * 2 ** (attempts - 1));
  const delay = code === "SOURCE_HTTP_403" ? 365 * FULL_REFRESH_MS : Math.max(base, retryAfterMs || 0);
  return {
    attempts,
    next_due_at: new Date(Math.min(nowMs + delay, 8.64e15)).toISOString(),
    retry_not_before: ["SOURCE_HTTP_429", "SOURCE_HTTP_503"].includes(code)
      ? new Date(Math.min(nowMs + delay, 8.64e15)).toISOString() : null
  };
}
