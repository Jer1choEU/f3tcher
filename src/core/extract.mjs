import { safeUrl } from "./catalog.mjs";
export const MAX_ITEMS = 150;
const textDecoder = new TextDecoder("utf-8", {fatal:false});
export async function sha256(value) {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : value;
  return [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))]
    .map(n => n.toString(16).padStart(2,"0")).join("");
}
function unescapeXml(s) {
  return String(s ?? "").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ").replace(/&(#x[0-9a-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (_,entity) => {
      const map={amp:"&",quot:'"',apos:"'",lt:"<",gt:">"};
      const n=entity.toLowerCase();
      const point=n.startsWith("#x") ? parseInt(n.slice(2),16) :
        n.startsWith("#") ? parseInt(n.slice(1),10) : null;
      return point !== null && Number.isInteger(point) && point > 0 && point <= 0x10ffff
        ? String.fromCodePoint(point) : map[n] || _;
    }).replace(/\s+/g," ").trim();
}
function field(body, tag) {
  const pattern = new RegExp("<(?:[\\w-]+:)?" + tag +
    "(?:\\s[^>]*)?>([\\s\\S]*?)<\\/(?:[\\w-]+:)?" + tag + "\\s*>","i");
  return unescapeXml(body.match(pattern)?.[1] || "");
}
function atomLink(body) {
  for (const m of body.matchAll(/<link\b[^>]*>/gi)) {
    const attrs = Object.fromEntries([...m[0].matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/g)]
      .map(([,k,,v]) => [k.toLowerCase(),unescapeXml(v)]));
    if ((attrs.rel || "alternate") === "alternate" && attrs.href &&
        (!attrs.type || /^(text\/html|application\/xhtml\+xml)/i.test(attrs.type)))
      return attrs.href;
  }
  return "";
}
function normalizeUrl(value, base) {
  try {
    const url = new URL(value,base);
    url.hash="";
    return safeUrl(url.href).href;
  } catch { return null; }
}
function dateIso(value) {
  if (!value) return null;
  const n = Date.parse(value);
  return Number.isFinite(n) ? new Date(n).toISOString() : null;
}
function rss(text, source) {
  if (!/<(?:rss|feed|rdf:RDF)\b/i.test(text)) throw Error("SOURCE_NOT_RSS_ATOM");
  const entries=[...text.matchAll(/<(item|entry)(?:\s[^>]*)?>([\s\S]*?)<\/\1\s*>/gi)];
  const records=[];
  for (const entry of entries.slice(0,MAX_ITEMS)) {
    const body=entry[2];
    const url=normalizeUrl((entry[1].toLowerCase() === "entry" ? atomLink(body) : "") ||
      field(body,"link"),source.url);
    const title=field(body,"title");
    if (!url || !title) continue;
    records.push({url,title:title.slice(0,1000),
      published_at:dateIso(field(body,"pubDate") || field(body,"published") ||
        field(body,"updated")),kind:"article"});
  }
  return {records, examined:Math.min(entries.length,MAX_ITEMS), available:entries.length,
    complete:entries.length <= MAX_ITEMS && records.length === entries.length};
}
function atPath(obj,path) {
  return path.split(".").reduce((v,k) => v?.[k],obj);
}
function structured(records,source) {
  const result=[];
  for (const item of records.slice(0,MAX_ITEMS)) {
    if (!item || typeof item !== "object") continue;
    const f=source.fields || {};
    const url=normalizeUrl(atPath(item,f.url || "url"),source.url);
    if (!url) continue;
    result.push({url, title:String(atPath(item,f.title || "title") || "").slice(0,1000),
      published_at:dateIso(atPath(item,f.published_at || "published_at")),kind:"item"});
  }
  return {records:result,available:records.length,
    examined:Math.min(records.length,MAX_ITEMS),
    complete:records.length <= MAX_ITEMS && result.length === records.length};
}
function parseCsv(text) {
  const lines=[], row=[]; let field="",quote=false;
  for (let i=0;i<text.length;i++) {
    const c=text[i];
    if (c === '"') {
      if (quote && text[i+1] === '"') {field+='"';i++;} else quote=!quote;
    } else if (c === "," && !quote) {row.push(field);field="";}
    else if ((c === "\n" || c === "\r") && !quote) {
      row.push(field);field="";
      if (row.some(x=>x.trim())) lines.push([...row]);
      row.length=0;
      if (c === "\r" && text[i+1] === "\n") i++;
    } else field+=c;
  }
  if (quote) throw Error("SOURCE_CSV_INVALID");
  row.push(field);if(row.some(x=>x.trim()))lines.push([...row]);
  const columns=lines.shift() || [];
  if (!columns.length) throw Error("SOURCE_CSV_INVALID");
  return lines.map(values => Object.fromEntries(columns.map((c,i)=>[c.trim(),values[i]||""])));
}
export async function extractResponse(source,response) {
  if (response.not_modified) return {records:[], complete:true, payload_hash:null,
    available:0, examined:0};
  const bytes=response.bytes;
  const payload_hash=await sha256(bytes);
  let out;
  if (source.kind === "rss") out=rss(textDecoder.decode(bytes),source);
  else if (source.kind === "json" && source.items_path) {
    let body;
    try { body=JSON.parse(textDecoder.decode(bytes)); }
    catch {throw Error("SOURCE_JSON_INVALID");}
    const items=atPath(body,source.items_path);
    if (!Array.isArray(items)) throw Error("SOURCE_ITEMS_NOT_ARRAY");
    out=structured(items,source);
  } else if (source.kind === "csv" && source.fields) {
    out=structured(parseCsv(textDecoder.decode(bytes)),source);
  } else {
    if (source.kind === "json") {
      try { JSON.parse(textDecoder.decode(bytes)); }
      catch {throw Error("SOURCE_JSON_INVALID");}
    }
    // One evidence asset per document/dataset; binary content is not republished.
    out={records:[{url:response.final_url, title:"", published_at:null,
      kind:["pdf","binary","html","text"].includes(source.kind)?"document":"dataset"}],
      available:1,examined:1,complete:true};
  }
  return {...out,payload_hash};
}
