// Real Crawlee CheerioCrawler and HttpCrawler, local-only, no browser/proxies.
// Results in argv[2], or pilot04-crawlee.json. No fixture gold is imported.
import { CheerioCrawler, HttpCrawler, log } from 'crawlee';
import { writeFile } from 'node:fs/promises';

const base = process.env.BASE_URL || '';
const parsed = new URL(base);
if (parsed.hostname !== '127.0.0.1' || parsed.protocol !== 'http:' || !parsed.port) {
  throw new Error('BASE_URL must be a 127.0.0.1 HTTP fixture service');
}
const expectedOrigin = parsed.origin;
const safe = (path) => {
  const url = new URL(path, expectedOrigin);
  if (url.origin !== expectedOrigin || !/^\/(static\/catalog|dynamic\/catalog|api\/dynamic-products|failure\/500)/.test(url.pathname)) {
    throw new Error('Out-of-scope path: ' + path);
  }
  return url.href;
};
log.setLevel(log.LEVELS.WARNING);
const items = [];
const htmlCrawler = new CheerioCrawler({
  maxConcurrency: 1,
  maxRequestsPerCrawl: 5,
  maxRequestRetries: 0,
  useSessionPool: false,
  requestHandlerTimeoutSecs: 12,
  requestHandler: async ({ request, $, enqueueLinks }) => {
    const scenario = request.userData.scenario;
    if (!['static', 'dynamic_html'].includes(scenario)) throw new Error('Unexpected scenario');
    const ids = $('article.product-card[data-product-id]')
      .map((_, el) => Number($(el).attr('data-product-id'))).get();
    items.push({ scenario, url: request.url, status: 200, ids });
    if (scenario === 'static') {
      const href = $('a.next-page[href]').attr('href');
      if (href) {
        safe(href);
        await enqueueLinks({ selector: 'a.next-page', strategy: 'same-origin',
                             userData: { scenario: 'static' } });
      }
    }
  },
  failedRequestHandler: ({ request }) => {
    throw new Error('CheerioCrawler request failed: ' + request.url);
  },
});
await htmlCrawler.run([
  { url: safe('/static/catalog?page=1'), userData: { scenario: 'static' } },
  { url: safe('/dynamic/catalog'), userData: { scenario: 'dynamic_html' } },
]);

const apiCrawler = new HttpCrawler({
  additionalMimeTypes: ['application/json'],
  maxConcurrency: 1,
  maxRequestRetries: 0,
  useSessionPool: false,
  requestHandlerTimeoutSecs: 12,
  requestHandler: async ({ request, body, response }) => {
    const records = JSON.parse(String(body));
    items.push({
      scenario: 'api',
      url: request.url,
      status: response.statusCode,
      ids: records.map((row) => Number(row.id)),
    });
  },
  failedRequestHandler: ({ request }) => {
    throw new Error('HttpCrawler API request failed: ' + request.url);
  },
});
await apiCrawler.run([safe('/api/dynamic-products')]);

const response = await fetch(safe('/failure/500'), { redirect: 'manual' });
items.push({ scenario: 'error500', url: response.url, status: response.status, ids: [] });

const dest = process.argv[2] || 'pilot04-crawlee.json';
await writeFile(dest, JSON.stringify(items, null, 2) + '\n');
console.log('Pilot04 Crawlee wrote ' + items.length + ' page observations to ' + dest);
