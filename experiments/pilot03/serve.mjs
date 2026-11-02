// Local-only runner for the unchanged, third-party MIT fixture.
import { startFixtureServer } from './vendor_thunderbit/fixture-server.mjs';
const server = await startFixtureServer();
console.log(server.baseUrl);
const shutdown = async () => { await server.close(); process.exit(0); };
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
