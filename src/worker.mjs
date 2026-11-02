import catalog from "../config/sources.json" with {type:"json"};
import holds from "../config/holds.json" with {type:"json"};
import { openStore } from "./core/store.mjs";
import { runCollector } from "./core/collector.mjs";
import { inspectQuality } from "./core/health.mjs";
const HEADERS={"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"};
async function storeFrom(env) {
  if (!env.TURSO_URL || !env.TURSO_AUTH_TOKEN) throw Error("STORE_NOT_CONFIGURED");
  return openStore(env.TURSO_URL,env.TURSO_AUTH_TOKEN);
}
async function authorized(request,secret) {
  const value=request.headers.get("authorization") || "";
  if (!secret || secret.length<16 || !value.startsWith("Bearer ")) return false;
  const a=new TextEncoder().encode(value.slice(7)),b=new TextEncoder().encode(secret);
  const [ha,hb]=await Promise.all([
    crypto.subtle.digest("SHA-256",a),crypto.subtle.digest("SHA-256",b)
  ]);
  const x=new Uint8Array(ha),y=new Uint8Array(hb);
  let diff=0;for(let i=0;i<x.length;i++)diff|=x[i]^y[i];
  return diff===0;
}
async function run(env) {
  const store=await storeFrom(env);
  try {return await runCollector({catalog,holds,store});}
  finally {store.close();}
}
export default {
  async scheduled(_event,env,ctx){ ctx.waitUntil(run(env)); },
  async fetch(request,env) {
    const pathname=new URL(request.url).pathname;
    if(request.method==="GET"&&pathname==="/health") {
      let store;
      try {
        store=await storeFrom(env);
        await store.init();
        return Response.json(await inspectQuality(store),{headers:HEADERS});
      } catch {
        return Response.json({ok:false,status:"unavailable"},
          {status:503,headers:HEADERS});
      } finally {store?.close();}
    }
    if(pathname==="/admin/run" && request.method==="POST") {
      if (!await authorized(request,env.ADMIN_TOKEN))
        return Response.json({ok:false,error:"unauthorized"},
          {status:401,headers:HEADERS});
      try {return Response.json(await run(env),{headers:HEADERS});}
      catch {return Response.json({ok:false,error:"collector_failed"},
        {status:503,headers:HEADERS});}
    }
    return new Response("Not found",{status:404,headers:HEADERS});
  }
};
