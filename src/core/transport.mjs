import { safeUrl } from "./catalog.mjs";
const MIME = {
  rss: "application/rss+xml, application/atom+xml, application/xml, text/xml",
  json: "application/json, application/geo+json, application/ld+json",
  csv: "text/csv, application/csv, text/plain",
  html: "text/html", text: "text/plain",
  pdf: "application/pdf", binary: "application/octet-stream"
};
export function cleanEtag(value) {
  return typeof value === "string" && value.length <= 512 &&
    /^(?:W\/)?"[\x21\x23-\x7e\x80-\xff]*"$/.test(value) ? value : null;
}
export function cleanModified(value) {
  return typeof value === "string" && value.length <= 64 &&
    /^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/.test(value) &&
    Number.isFinite(Date.parse(value)) ? value : null;
}
export function parseRetryAfter(value, nowMs = Date.now()) {
  if (typeof value !== "string" || value.length > 64) return 0;
  const s = value.trim();
  const n = /^\d+$/.test(s) ? Number(s) * 1000 :
    cleanModified(s) ? Math.max(0, Date.parse(s) - nowMs) : 0;
  return Number.isFinite(n) ? Math.min(n, Math.max(0, 8.64e15 - nowMs)) : 0;
}
export async function fetchBounded(source, options = {}) {
  const fetchImpl = options.fetchImpl || fetch;
  const timeoutMs = options.timeoutMs ?? 12000;
  const maxBytes = options.maxBytes ?? 4_000_000;
  const checks = options.validators || {};
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 120000 ||
      !Number.isSafeInteger(maxBytes) || maxBytes < 1 || maxBytes > 20_000_000)
    throw Error("SOURCE_BOUNDS_INVALID");
  const target = safeUrl(source.url);
  const ctl = new AbortController();
  let timer, timedOut = false, reader;
  const deadline = new Promise((_, reject) => {
    timer = setTimeout(() => {
      timedOut = true;
      ctl.abort();
      reject(Error("SOURCE_TIMEOUT"));
    }, timeoutMs);
  });
  const bounded = promise => Promise.race([promise, deadline]);
  try {
    let url = target;
    const headers = {
      Accept: MIME[source.kind] || MIME.binary,
      "User-Agent": "f3tcher/0.1 (+reviewed public data acquisition)",
      ...(cleanEtag(checks.etag) ? {"If-None-Match":checks.etag} : {}),
      ...(cleanModified(checks.lastModified) ? {"If-Modified-Since":checks.lastModified} : {})
    };
    const conditional = Boolean(headers["If-None-Match"] || headers["If-Modified-Since"]);
    let response;
    for (let hop = 0; hop <= 3; hop++) {
      response = await bounded(fetchImpl(url.href, {
        redirect: "manual", signal: ctl.signal, headers
      }));
      if (![301,302,303,307,308].includes(response.status)) break;
      if (hop === 3) throw Error("SOURCE_TOO_MANY_REDIRECTS");
      const location = response.headers.get("location");
      if (!location) throw Error("SOURCE_REDIRECT_INVALID");
      const next = safeUrl(new URL(location, url.href).href);
      // A cross-host redirect requires a new access/robots review and must not
      // silently inherit the permission of the reviewed source.
      if (next.hostname !== target.hostname) throw Error("SOURCE_REDIRECT_NOT_REVIEWED");
      url = next;
    }
    if (response.status === 304) {
      if (!conditional || url.href !== target.href) throw Error("SOURCE_UNEXPECTED_304");
      return {not_modified:true, etag:cleanEtag(response.headers.get("etag")),
        last_modified:cleanModified(response.headers.get("last-modified")),
        final_url:url.href, complete:true, bytes:new Uint8Array()};
    }
    if (!response.ok) {
      const error = Error("SOURCE_HTTP_" + response.status);
      if ([429,503].includes(response.status))
        error.retryAfterMs = parseRetryAfter(response.headers.get("retry-after"));
      throw error;
    }
    const length = Number(response.headers.get("content-length") || 0);
    if (length > maxBytes) throw Error("SOURCE_RESPONSE_TOO_LARGE");
    if (!response.body) throw Error("SOURCE_NO_BODY");
    reader = response.body.getReader();
    const chunks = [];
    let lengthRead = 0;
    while (true) {
      const part = await bounded(reader.read());
      if (part.done) break;
      lengthRead += part.value.byteLength;
      if (lengthRead > maxBytes) throw Error("SOURCE_RESPONSE_TOO_LARGE");
      chunks.push(part.value);
    }
    const bytes = new Uint8Array(lengthRead);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    return {not_modified:false, bytes, complete:true,
      final_url:url.href, content_type:response.headers.get("content-type") || null,
      etag:url.href === target.href ? cleanEtag(response.headers.get("etag")) : null,
      last_modified:url.href === target.href ?
        cleanModified(response.headers.get("last-modified")) : null};
  } catch (err) {
    if (timedOut) throw Error("SOURCE_TIMEOUT");
    throw err;
  } finally {
    if (reader) { try { await reader.cancel(); } catch {} try { reader.releaseLock(); } catch {} }
    clearTimeout(timer);
  }
}
