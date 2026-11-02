import { readFile } from "node:fs/promises";
import { openStore } from "../src/core/store.mjs";
import { runCollector } from "../src/core/collector.mjs";
import { inspectQuality } from "../src/core/health.mjs";
const opts=process.argv.slice(2);
const pick=(flag,fallback)=> {
  const index=opts.indexOf(flag);
  return index===-1?fallback:opts[index+1];
};
if(opts.includes("--help")) {
  console.log("node scripts/run.mjs [--config config/sources.json] [--db file:./f3tcher.db] [--health]");
  process.exit(0);
}
const file=pick("--config","config/sources.json");
const url=pick("--db",process.env.TURSO_URL || "file:./f3tcher.db");
const catalog=JSON.parse(await readFile(file,"utf8"));
const store=await openStore(url,process.env.TURSO_AUTH_TOKEN);
try {
  const result=opts.includes("--health") ?
    (await store.init(),await inspectQuality(store)) :
    await runCollector({catalog,store});
  console.log(JSON.stringify(result,null,2));
  if(result.failed)process.exitCode=1;
} finally {store.close();}
