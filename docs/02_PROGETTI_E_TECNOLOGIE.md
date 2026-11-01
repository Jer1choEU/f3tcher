# 02 — Progetti, prodotti, librerie e standard da confrontare

**Stato:** candidati esplorati nelle conversazioni fino al 2026-11-01; **nessuno è stato installato, integrato o benchmarkato**. Licenze, funzionalità e modalità di deployment da ricontrollare nel commit/versione effettiva. Licenza di un progetto ≠ licenza di tutte le sue dipendenze/servizi.

## Motori di crawling e discovery

| Candidato | URL | Idee da valutare |
|---|---|---|
| Crawlee (Apify) | https://github.com/apify/crawlee | Code, HTTP/browser, concorrenza, sessioni, backoff, selezione metodo |
| Scrapy | https://github.com/scrapy/scrapy | Spider, middleware/pipeline, job persistenti, throughput, auto-throttle |
| Apache StormCrawler | https://github.com/apache/stormcrawler | Architettura distribuita, frontier, indicizzazione |
| crawler-commons URL Frontier | https://github.com/crawler-commons/url-frontier | Standard gRPC per gestione frontier; caveat persistenza stato operativo |
| Heritrix 3 | https://github.com/internetarchive/heritrix3 | Lungo periodo, focus archivistico, WARC, politeness |
| Katana | https://github.com/projectdiscovery/katana | Esplorazione, URL/JS/endpoint discovery su fonti autorizzate |
| Spider (Rust) | https://github.com/spider-rs/spider | Runtime efficiente, crawling veloce, browser opzionale |
| Scrapling | https://github.com/D4Vinci/Scrapling | Selettori adattivi, replay, gestione di strutture variabili |
| Crawl4AI | https://github.com/unclecode/crawl4ai | Contenuto pulito e strutturato, focused/adaptive crawling |
| Playwright | https://playwright.dev/ | Browser automation e analisi traffico in pagine consentite |
| Browser Use | https://github.com/browser-use/browser-use | Navigazione tramite agenti, procedure riutilizzabili |
| SearXNG | https://github.com/searxng/searxng | Discovery federata attraverso motori integrabili |
| Huginn | https://github.com/huginn/huginn | Agenti persistenti per osservare eventi e attivare flussi |

## Estrazione, documenti e semantica

| Candidato | URL | Idee |
|---|---|---|
| Firecrawl | https://github.com/firecrawl/firecrawl | API unified: scrape/crawl/map/search/extract/monitor, routing |
| Trafilatura | https://github.com/adbar/trafilatura | Extraction HTML, metadati e contenuti principali |
| Docling | https://github.com/docling-project/docling | Document AI, layout, tabelle, OCR e normalizzazione |
| MinerU | https://github.com/opendatalab/MinerU | PDF complessi e layout sofisticati |
| olmOCR | https://github.com/allenai/olmocr | Parsing visivo PDF e verifiche di fedeltà |
| MarkItDown | https://github.com/microsoft/markitdown | Normalizzazione file diversi per ricerca downstream |
| dlt | https://github.com/dlt-hub/dlt | Schema evolution, checkpoint, incremental loading |
| Airbyte | https://github.com/airbytehq/airbyte | Catalogo connettori, cursor sync, pipeline connector-native |
| OpenLineage | https://openlineage.io/ | Lineage fra esecuzioni, input e output |

## Archiviazione, sync e piattaforme

| Progetto | URL | Idee |
|---|---|---|
| ArchiveBox | https://github.com/ArchiveBox/ArchiveBox | Snapshot in più formati e archivi personali |
| Browsertrix Crawler | https://github.com/webrecorder/browsertrix-crawler | Cattura browser di pagine dinamiche, WARC/WACZ |
| Browsertrix Behaviors | https://github.com/webrecorder/browsertrix-behaviors | Comportamenti di navigazione e scroll riutilizzabili |
| pywb | https://github.com/webrecorder/pywb | Replay offline degli archivi WARC |
| changedetection.io | https://github.com/dgtlmoon/changedetection.io | Monitoraggio delle differenze HTML/JSON/PDF |
| Common Crawl | https://commoncrawl.org/ | Dati e indici web storici, CDXJ, Parquet, WARC |
| DuckDB | https://duckdb.org/ | Query parziali di Parquet remoto, colonne e row-group pruning |
| Apache Parquet | https://parquet.apache.org/ | Formato colonnare per dataset grandi |
| Delta Lake | https://delta.io/ | Versioni di tabelle e time travel |
| lakeFS | https://lakefs.io/ | Versionamento degli oggetti e riproducibilità |
| Great Expectations | https://greatexpectations.io/ | Data quality e profiling |
| Soda | https://www.soda.io/ | Contratti di dati e rilevazione anomalie |
| OpenAlex | https://help.openalex.org/data/sources/repositories/ | Pattern di harvesting OAI-PMH giornaliero con overlap e retry |

## Prodotti commerciali: confronto di capacità dichiarate (non dati misurati da noi)

- [Zyte API](https://www.zyte.com/zyte-api/): acquisizione e estrazione assistite, switching metodo.
- [Diffbot](https://www.diffbot.com/): crawling/estrazione semantica, Knowledge Graph.
- [Apify](https://apify.com/): gestione esecutori, scheduling, dataset e marketplace.
- [Firecrawl Cloud](https://www.firecrawl.dev/): API-first, estrazione dati strutturati.
- [Cloudflare Browser Run](https://developers.cloudflare.com/browser-run/): esecuzione browser e crawling gestiti, costi/limiti da studiare.
- [Browserbase](https://www.browserbase.com/): infrastruttura browser; studiare idee di procedure/skill riutilizzabili.
- Confrontare anche qualità/freschezza, non solo conteggio di feature pubblicizzate.

## Standard e canali di acquisizione da riconoscere

| Categoria | Standard / riferimento |
|---|---|
| Crawling / policy | Robots Exclusion Protocol: https://www.rfc-editor.org/rfc/rfc9309.html |
| Relazioni fra risorse | Web Linking RFC 8288 https://www.rfc-editor.org/rfc/rfc8288 |
| Service description | RFC 8631 https://www.rfc-editor.org/rfc/rfc8631 |
| Open Data | W3C DCAT 3 https://www.w3.org/TR/vocab-dcat-3/ |
| Open Data catalog | CKAN https://docs.ckan.org/ |
| Harvesting scientifico | OAI-PMH https://www.openarchives.org/OAI/openarchivesprotocol.html |
| Archivi storici | Memento RFC 7089 https://www.rfc-editor.org/rfc/rfc7089 |
| Resource updates | ResourceSync https://www.openarchives.org/rs/1.1/resourcesync |
| Linked Data Event Streams | https://w3id.org/ldes/specification |
| Notifications | WebSub https://www.w3.org/TR/websub/ |
| IIIF / Change Discovery | https://iiif.io/api/ |
| Dati geospaziali | STAC https://stacspec.org/ ; OGC Records https://ogcapi.ogc.org/records/ |
| Web/linked-data semantico | RDF, JSON-LD, SPARQL, schema.org, Triple Pattern Fragments |
| Pubblicazioni digitali | OPDS 2.0 https://specs.opds.io/opds-2.0 |
| Public edit streams | Wikimedia EventStreams https://wikitech.wikimedia.org/wiki/EventStreams |
| Social public event streams | AT Protocol https://atproto.com/specs/event-stream |
| Dati narrativi e citazioni puntuali | W3C Web Annotation https://www.w3.org/TR/annotation-model/ |
| Archivi web | ISO WARC, WACZ https://specs.webrecorder.net/ |
| Provenienza | W3C PROV-O https://www.w3.org/TR/prov-o/ |
| API documentate | OpenAPI, GraphQL schema e introspection **solo quando consentita** |
| HTTP efficiencies | RFC 9110 Conditional Requests/Range: https://www.rfc-editor.org/rfc/rfc9110 |

## Esperimenti, librerie e idee meno note (esplorate; da riverificare)

- https://github.com/foiacquire/foia — presunto toolkit per acquisizione FOIA, da verificare disponibilità/versioni.
- https://github.com/0xchasercat/draco — progetto Draco, claims performance non indipendentemente confermati.
- https://github.com/ApGa/Go-Browse — navigazione come grafo e skill reuse.
- https://github.com/RongchangLi/WebTraveler — memoria della navigazione.
- https://github.com/perplexityai/wandr — benchmark ampio di discovery/ricerca.
- https://github.com/AntoineGauquier/efficient_crawler_for_scalable_web_data_acquisition — codice di focused crawling associato allo studio 2026.
- https://github.com/MLAI-Yonsei/BaRA-Agent — ricerca su validità dei link media.
- https://github.com/cxcscmu/AgentWebBench — agenti fornitori di informazioni e cooperazione.

## Licenze: indicazioni preliminari

Licenze permissive (MIT/BSD/Apache) possono semplificare l'integrazione; AGPL richiede un'analisi specifica in caso di software modificato offerto tramite rete. **Non assumere mai** che tutte le librerie, modelli, dataset, servizi e dipendenze di un progetto condividano la stessa licenza. Verificare SPDX e condizioni nella versione scelta; tenere distinto riuso di idee, adattamento del codice e dipendenza da servizio.

**Nota:** nessun programma di cui sopra è stato testato o adottato in questa repo. Questo documento è un inventario per la fase di confronto.
