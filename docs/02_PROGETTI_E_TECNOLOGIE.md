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

## Estensioni individuate nella ricognizione del 2026-11-01 (nessuna integrazione decisa)

| Candidato verificato | URL | Idea da misurare e limite |
|---|---|---|
| OpenAPI Arazzo 1.1.0 | https://spec.openapis.org/arazzo/latest.html | Descrizione interoperabile di workflow API con dipendenze e criteri; non equivale a permesso di esecuzione |
| UseArazzo | https://github.com/usearazzo | Runner/validator pre-1.0 da confrontare; nella matrice consultata l'AsyncAPI non è eseguibile |
| RFC 9264 Linkset | https://www.rfc-editor.org/rfc/rfc9264.html | Inventari di link tipizzati, anche di terze parti; verificare affidabilità degli indici |
| FAIR Signposting | https://signposting.org/FAIR/ | Scoprire risorse, metadati, ID e license tramite typed links; adozione da verificare |
| OData Delta | https://oasis-tcs.github.io/odata-specs/odata-protocol/odata-protocol.html | Sync con cambiamenti e cancellazioni, token scaduti e recovery; supporto/versione del server da verificare |
| W3C ODRL | https://www.w3.org/TR/odrl-model/ | Esprimere diritti e obblighi per risorsa; non sostituisce verifica giuridica |
| BagIt RFC 8493 + OCFL | https://www.rfc-editor.org/info/rfc8493/ ; https://ocfl.io/ | Integrità pacchetti e versioni archivistiche, complementi a WARC/WACZ |

Prove, limiti e ulteriori fonti in [07_RICOGNIZIONE_2026-11-01.md](07_RICOGNIZIONE_2026-11-01.md).

## Riscontri pratici della seconda ricognizione (2026-11-01)

Vedi [08_ADOZIONE_CONSISTENZA_E_LONG_TAIL.md](08_ADOZIONE_CONSISTENZA_E_LONG_TAIL.md): **FAIR Signposting** non è soltanto specifica (implementazioni dichiarate su Dataverse/DSpace/InvenioRDM/Zenodo, test pubblicati A2A); l'ecosistema **Arazzo** contiene validator/runner e workflow di esempio, ma una curazione aggiornata a ottobre 2026 indica forte presenza di tooling per 1.0.1 rispetto a 1.1.0; **Microsoft Graph Delta** e **Zendesk offset** documentano limiti reali della sincronizzazione; **Debezium** è una baseline per snapshot+CDC soltanto dove il fornitore concede accesso al log. **Nessuna libreria è stata scelta, installata o provata.**

## Ricognizione 09 — strumenti/benchmark con omonimia da evitare

Vedi [09_COMPLETEZZA_LOCALE_E_PROVE.md](09_COMPLETEZZA_LOCALE_E_PROVE.md).

- **ExtractBench (Ferguson et al., ContextualAI, febbraio 2026)** https://github.com/ContextualAI/extract-bench ; https://arxiv.org/abs/2602.12247 : 35 PDF, 5 schemi, 12.867 campi, metriche specifiche per campo; articoli/risultati non replicati.
- **ExtractBench (Zhang et al., run-llama, luglio 2026)** https://github.com/run-llama/ExtractBench ; https://arxiv.org/abs/2607.29677 : 370 documenti, 4.869 pagine, estrazione di liste, grounding e costo; *non è lo stesso benchmark*.
- **Apache Flink / watermarks** https://nightlies.apache.org/flink/flink-docs-master/docs/learn-flink/streaming_analytics/ : semantica event time, late arrivals e compromesso latenza/completezza, non promessa di completamento assoluto.
- **Debezium incremental snapshots / collision windows** https://github.com/debezium/debezium-design-documents/blob/main/DDD-8.md : modello di riferimento per fonti con accesso autorizzato al transaction log; non trasferibile a ogni web API.
- **W3C SHACL** https://www.w3.org/TR/shacl/ e **DQV** https://www.w3.org/TR/vocab-dqv/ : espressione di vincoli/misure qualità, non prova di copertura web.

## Ricognizione 10 — fonti reali e sistemi da confrontare, nessuno adottato

Le pagine primarie e i limiti sono descritti in [10_INVENTARI_E_GARANZIE.md](10_INVENTARI_E_GARANZIE.md).

| Sorgente / tecnologia | Riferimento | Fenomeno da studiare, senza assumere garanzie inesistenti |
|---|---|---|
| Wikimedia dump monitoring | https://meta.wikimedia.org/wiki/Data_dumps/Monitoring | Stati per job, manifest, dimensioni, MD5/SHA1 dove disponibili; prova di recupero solo per i file dichiarati |
| Crossref public data + REST | https://www.crossref.org/documentation/retrieve-metadata/bulk-downloads/ | Dump annuale pubblico, snapshot mensile Metadata Plus, filtri/cursor e reindicizzazione |
| OpenAlex changefiles | https://developers.openalex.org/download/changefiles | Snapshot gratuito trimestrale, delta giornalieri premium e retention 60 giorni |
| GBIF downloads + DOI | https://www.gbif.org/citation-guidelines | Citabilità e filtri/versioni di download, senza confondere DOI con bytes disponibili per sempre |
| OAI-PMH 2.0 | https://www.openarchives.org/OAI/openarchivesprotocol.html | `resumptionToken`, `completeListSize` stimabile e supporto delete dichiarato `no/transient/persistent` |
| ResourceSync | https://www.openarchives.org/rs/1.1/resourcesync_highlighted | Resource List/Dump + Change List/Dump + audit, se il provider pubblica tali capacità |
| RFC 9162 (CT) | https://www.rfc-editor.org/rfc/rfc9162.html | Prove Merkle di inclusione/consistenza append-only, non completezza del mondo; RFC sperimentale |

**Non sono dipendenze scelte e non sono state eseguite acquisizioni live da f3tcher.** Verificare licenze/condizioni di ciascuna fonte prima dei futuri test.
