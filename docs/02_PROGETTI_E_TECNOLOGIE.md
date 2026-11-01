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

## Ricognizione 11 — standard e riferimenti sulla provenienza, senza integrazioni

La [ricognizione 11](11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md) introduce riferimenti aggiuntivi da confrontare **senza adottarli**:
- **W3C PROV-O / PROV Constraints** https://www.w3.org/TR/prov-o/ ; https://www.w3.org/TR/prov-constraints/ — modello di Entity/Activity/Agent e vincoli per validità del lineage.
- **TUF (The Update Framework)** https://theupdateframework.org/docs/metadata/ — metadata firmati a ruoli (root, targets, snapshot, timestamp), anti-rollback e scadenza; applicabile solo quando dati e relazioni di trust sono disponibili.
- **C2SP witness** https://c2sp.org/tlog-witness@v1.1.0 e **trust policy** https://c2sp.org/tlog-policy — co-firme dei checkpoint e quorum, non attestazione delle notizie registrate.
- **SCITT / RFC 9943** https://www.rfc-editor.org/rfc/rfc9943 e **COSE Receipts / RFC 9942** https://www.rfc-editor.org/rfc/rfc9942 — statements firmati e prove sulla struttura dati; differenza esplicita fra inclusione, consistenza e verità.
- **Data provenance formale** https://web.cs.ucdavis.edu/~green/papers/pods07.pdf — annotazioni semiring *come teoria candidata*, non vincolo per la struttura dati di f3tcher.

Questi riferimenti non dimostrano il vantaggio di una soluzione rispetto a baseline più semplici, e non è stato implementato alcun componente.

## Ricognizione 12 — corpus e benchmark distinti per task (nessuno adottato)

Vedi [12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md](12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md). **METER** https://eprints.whiterose.ac.uk/id/eprint/78663/ (riuso agenzia/giornale, licenza/accesso dataset da verificare); **COUNTER** https://ucrel.lancs.ac.uk/textreuse/counter.php (600 coppie reali urdu, CC BY-NC-SA + ricerca/accademia); **USTRC** https://ucrel.lancs.ac.uk/textreuse/ustrc.php (2.684 coppie brevi urdu, CC BY-NC-SA); **PAN-PC-11** https://zenodo.org/records/3250095 (plagio simulato); **PAN 2025** https://pan.webis.de/clef25/pan25-web/generated-plagiarism-detection.html (passaggi parafrasati); **PAN 2026** https://pan.webis.de/clef26/pan26-web/generated-plagiarism-detection.html (retrieval multi-sorgente, research only/no redistribution); **NewsEdits** https://github.com/isi-nlp/NewsEdits (revisioni intra-articolo); **FakeWiki/DataDignity** https://arxiv.org/abs/2605.05687 (hard negative di supporto fattuale, preprint); **MAVIS** https://ojs.aaai.org/index.php/AAAI/article/view/40585 (citazione multimodale); **Data Provenance Explorer** https://www.nature.com/articles/s42256-024-00878-8 (audit licenze e genealogia dataset). Non installare né importare corpora senza verifica di diritti. Nessuno di questi dataset è un test universale della copia transitiva nel web reale.

## Ricognizione 13 — baseline e dataset di diffusione, nessuno adottato

La [ricognizione 13](13_DIFFUSIONE_IDENTIFICABILITA_E_ASTENSIONE.md) verifica **Stanford NETINF** https://snap.stanford.edu/netinf/ (implementazione storica, output di relazioni inferite), **MemeTracker** https://snap.stanford.edu/data/memetracker9.html (corpus storico con URL/timestamp/quote/link, grandezza dichiarata dal publisher), **NIFTY** https://snap.stanford.edu/nifty/about.html (clustering frasi a scala elevata), **Diffusion Source Identification with Statistical Confidence** https://proceedings.mlr.press/v139/dawkins21a.html (insiemi di possibili sorgenti) e **SelectiveNet** https://proceedings.mlr.press/v97/geifman19a.html (reject option). Non tutti sono programmi candidati da installare: alcuni sono paper, dati, modelli o metodologie. Memetracker/NETINF non costituiscono gold truth della copia causale. Versione, disponibilità, licenze dei dati/codice e adeguatezza del task richiedono una verifica prima di test.

## Ricognizione 14 — baseline pratiche e teorie della scelta adattiva (NON adottate)

Vedi [14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md](14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md).
- **FIRE**, paper https://aclanthology.org/2025.findings-naacl.158/ e codice riportato dagli autori https://github.com/mbzuai-nlp/fire : agent search/verify/STOP; va benchmarkato nel proprio perimetro (fact-checking, non prova genealogia).
- **AVeriTeC**, https://fever.ai/dataset/averitec.html : 4568 claim con evidenze/QA e classi di insufficienza/conflitto, non dataset completo di source copying.
- **IJCAI 2026 AFA survey**, https://ijcai.org/proceedings/2026/860 : decisioni adattive cost-aware, myopic/nonmyopic, POMDP e metodi model-based/model-free/ibridi.
- **Golovin/Krause JAIR**, https://ocs.aaai.org/Library/JAIR/Vol42/jair42-012.php : basi teoriche delle garanzie greedy sotto ipotesi adaptive submodularity.
- **Sloman et al. 2024**, https://link.springer.com/article/10.3758/s13428-024-02410-7 : prior errato e rischio di rinforzo di modello sbagliato.
- **Off-policy evaluation con dati adattivi**, https://proceedings.mlr.press/v283/madhow25a.html : benchmark solo se le azioni controfattuali hanno supporto valutabile.

La verifica dei paper è documentale; nessuna libreria o corpus scaricato/installato, nessuna licenza delle dipendenze del codice FIRE approvata.

## Ricognizione 15 — confronto di capacità di acquisizione, NON scelte di stack

Consultare [15_ACQUISIZIONE_UNIVERSALE_PROTOCOLLI_E_CRAWLER.md](15_ACQUISIZIONE_UNIVERSALE_PROTOCOLLI_E_CRAWLER.md) per fonti e limiti documentali.

- **Catalog-first**: DCAT 3 / DCAT-AP 3.0.1, CKAN, STAC (esempio Copernicus), OGC API Records, IIIF Change Discovery, Schema.org Dataset/sitemap. Non tutti i provider espongono un inventory completo; alcune API sono mutative o richiedono permessi.
- **Update-first**: WebSub hub/topics e IIIF change streams; la consegna push non certifica assenza di eventi mancanti.
- **HTTP/browser trade-off**: Crawlee (Cheerio/Playwright/Puppeteer), Scrapy, Browsertrix con QA replay WARC/WACZ; la resa va misurata a parità di budget e di diritti.
- **Continuous frontier**: Apache StormCrawler 3.7, politeness per host/dominio/IP, feed+sitemap e parse Tika; documentazione Apache, no benchmark di f3tcher.
- **Formati**: Docling supporto documenti, tabelle, media con caveat per conversioni e accuratezza.
- **Ricerca recente**: WebDART (ACL 2026), Abitov et al. 2026 (LLM setup + deterministic crawl, **già esiste**), VeriEnv (ICML 2026); BaRA *P* (abstract indicizzato); review D&KE 2026.

La finalità della ricognizione è individuare possibili capacità utili al **singolo motore automatico**, non proporre selezioni di profili o un sistema costituito obbligatoriamente da tutti questi componenti. **Nessuna dipendenza scelta, installazione o test.**

## Ricognizione 16 — tecnologie verticali e contesti di uso (nessuna adozione)

Vedi [16_ACQUISIZIONE_SPECIALISTICA_RICERCA_LEGGI_STATISTICHE_FEDERAZIONE.md](16_ACQUISIZIONE_SPECIALISTICA_RICERCA_LEGGI_STATISTICHE_FEDERAZIONE.md).
- **Scholarly acquisition**: OpenAIRE Graph v3 (search, cursor, bulk), DataCite (DOI metadata), arXiv (OAI-PMH metadata), Europe PMC (metadata vs OA full text), Crossref (clock created/update/index). I servizi sono *canali con coperture diverse*, non librerie obbligatorie.
- **Legal acquisition**: Normattiva API/OpenAPI con multivigenza, Gazzetta feed per novità e fonte ufficiale, EUR-Lex/Cellar con Formex/SPARQL e differenti rappresentazioni, Europarl OpenAPI v2 con quote, Congress.gov API key, Akoma Ntoso XML.
- **Statistics**: Eurostat Catalogue/SDMX 2.1/3.0/JSON-stat, IstatData SDMX con quota severa, SDMX 3.1 specifica, DSD e code list. Non confondere versioni del metadata con storia dei numeri.
- **Federation**: ActivityPub outbox con ACL e paginazione; AT Protocol CAR/CBOR/firehose, revision chain e media blob separati. Non assumere accesso ai private inbox o completezza della rete.
- **Packaging**: Frictionless Data Package / Table Schema per schemi e più risorse, Formex e LegalDocML per struttura legale; non convertire tutto in plain text senza documentare perdite.

Nessuna libreria, framework, runtime, plugin o standard interno selezionato. Le scelte dovranno essere dimostrate successivamente attraverso benchmark e compatibilità d'uso.

## Ricognizione 17 — acquisitori settoriali, metadata e package formats (nessuna adozione)

Approfondimento: [17_BREVETTI_BIOLOGIA_AUDIOVISIVI_CONSERVAZIONE.md](17_BREVETTI_BIOLOGIA_AUDIOVISIVI_CONSERVAZIONE.md).
- **EPO OPS** https://www.epo.org/en/searching-for-patents/data/web-services/ops (XML/REST OAuth e fair use), **EPS** https://www.epo.org/en/searching-for-patents/data/web-services/publication-server (XML/TIFF/PDF/A), **DOCDB** https://www.epo.org/en/searching-for-patents/data/bulk-data-sets/docdb (bulk metadati e famiglia, no full text).
- **ENA Portal/Browser** https://ena-docs.readthedocs.io/en/latest/retrieval/programmatic-access.html (ricerca scientifica + artefatti raw), **NCBI E-utilities** https://eutilities.github.io/site/API_Key/usageandkey/ e **NCBI Datasets** https://www.ncbi.nlm.nih.gov/datasets/docs/v2/api/api-keys/ (quote e batch differenti).
- **Europeana** https://www.europeana.eu/eu/apis (Search/Record/IIIF + OAI-PMH/SPARQL, metadata CC0 ma media soggetti a rights), **EBUCore** https://tech.ebu.ch/publications/tech3293?categoryFilter=presentations e **WebVTT** https://www.w3.org/TR/webvtt1/ (metadata e timecoded tracks).
- **METS** https://loc.gov/standards/mets/METSOverview.v3_en.html ; **PREMIS 3.0** https://www.loc.gov/standards/premis/v3/ ; **E-ARK** https://digital-strategy.ec.europa.eu/en/policies/earchiving-specifications ; **BagIt RFC8493** https://www.rfc-editor.org/rfc/rfc8493.html . Metadata e pacchetti per struttura, diritti e checksum, non conferme di completezza universale.

Tutte le tecnologie elencate sono oggetto di studio, **non stack o framework scelti**.

## Sintesi comparativa 18 — evitare duplicati di capacità, non scegliere stack

Leggere [18_SINTESI_COMPARATIVA_E_LACUNE.md](18_SINTESI_COMPARATIVA_E_LACUNE.md) prima di considerare tecnologie singole. Per crawling/frontier/JS, **Crawlee, Scrapy, StormCrawler, Heritrix, Browsertrix** e approcci browser+AI hanno **aree sovrapposte**; per ETL incremental **Airbyte, dlt, Meltano/Singer** hanno capacità già disponibili; per discovery dataset DCAT/STAC/IIIF/OAI/SDMX sono **interfacce con semantiche diverse**, non tool da attivare tutti. **USENIX SoK Arachnarium** https://www.usenix.org/conference/usenixsecurity24/presentation/stafeev è una baseline metodologica importante che documenta la mancanza di un miglior algoritmo/configurazione universale nei suoi esperimenti. **Common Crawl URL Index** https://www.commoncrawl.org/url-index e **CDXJ Index** https://www.commoncrawl.org/cdxj-index permettono confronto archive-first/fresh-fetch, con differenza WARC/WAT/WET. **dlt** https://dlthub.com/docs/general-usage/incremental-loading e **Airbyte CDC** https://docs.airbyte.com/platform/understanding-airbyte/cdc dimostrano che state/cursor/upsert/CDC sono tecniche esistenti. **WCXB** https://webcontentextraction.org/ fornisce una baseline main-content (non discovery). Licenze/versioni/adozione, benchmark e costi non ancora verificati in f3tcher. Questa è **ricerca, non una selezione di dipendenze**.

## Ricognizione 19 — istanze documentate, cambi di versione e limiti di adozione

La [ricognizione 19](19_ADOZIONE_REALE_E_COMPATIBILITA_PORTALI.md) distingue esempi **reali** e modalità di verifica: due JSON root **osservati** di Copernicus STAC, vecchio 1.0.0 https://stac.dataspace.copernicus.eu/v1/ e nuovo 1.1.0 https://stac.opensearch.dataspace.copernicus.eu/v1/ ; annuncio migrazione 16-10-2026 https://dataspace.copernicus.eu/news/2026-10-16-new-sfeos-stac-catalogue-endpoint e sunset 12-01-2027, nuove quote 60/min anonime, 240/min autenticato. Implementazioni **documentate**: Rijksmuseum OAI, LDES (only latest `LatestVersionSubset`) e IIIF Change https://data.rijksmuseum.nl/docs/ ; Zenodo OAI https://developers.zenodo.org/ ; data.gov.uk CKAN https://guidance.data.gov.uk/get_data/api_documentation/ (curated collections escluse); RNDT GeoDCAT-AP https://geodati.gov.it/geodcat-ap_it/ ; data.europa DCAT/harvesting https://dataeuropa.gitlab.io/data-provider-manual/how-to-publish/request-harvesting/ ; Signposting adopters https://signposting.org/adopters/ (directory self-declared). Verifica end-to-end di JSON-LD/XML e sample query **non eseguita**, un content-type non supportato dal visualizzatore non è falla dell'API. Tutto resta **ricerca**.

## Ricognizione 20 — soluzioni esistenti per portali senza catalogo standard evidente

[Analisi e benchmark futuri](20_SORGENTI_DIFFICILI_MODULI_STATI_E_OMISSIONI.md): **Crawljax** https://github.com/crawljax/crawljax (state-flow graph DOM/eventi, sito JS), **Browsertrix behaviors** https://crawler.docs.browsertrix.com/user-guide/behaviors/ (autoscroll/autofetch/autoclick e timeout), **Playwright** https://playwright.dev/docs/api/class-page (non assumere che networkidle == ready, liste dinamiche), **Google Deep-Web Crawl** https://www.vldb.org/pvldb/vol1/1454163.pdf (form surfacing già studiato nel 2008), **WebLists/BardeenAgent** https://arxiv.org/abs/2504.12682 (200 task con incompletezza di estrazione, risultati autori), **SCRIBES** https://arxiv.org/abs/2510.01832 (script riusabili e RL, preprint), **multi-record news list corpus** https://arxiv.org/abs/2502.14625 (13.120 pagine, lingua russa), **Google Search Central pagination** https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading . Si sovrappongono in *UI exploration*, *extractors* e *reusable scripts*, ma non sono intercambiabili né garanzia di copertura. Niente libreria scelta.

## Ricognizione 21 — scalabilità: evitare doppioni fra throttling, autoscaling, caching

[Fonti e confronti](21_SCALABILITA_COSTI_E_ACQUISIZIONE_EFFICIENTE.md).
- **Scrapy AutoThrottle** https://docs.scrapy.org/en/master/topics/autothrottle.html adatta latenza per *download slot* e minimo per host; **StormCrawler** https://stormcrawler.apache.org/docs/latest/index.html usa code host/domain/IP, delays, thread e **AdaptiveScheduler** per intervalli di revisit. Strategie **esistenti**, non nuove.
- **Crawlee AutoscaledPool** https://crawlee.dev/js/api/3.16/core/class/AutoscaledPool adatta CPU/RAM/event loop, non quota publisher; API evolvono in v4.
- **Cloudflare Browser Run (ex Browser Rendering)** https://developers.cloudflare.com/browser-run/limits/ : limiti standard ottobre 2026 diversi da annuncio aprile https://developers.cloudflare.com/changelog/post/2026-04-15-br-rename/ . Il tempo browser ha metriche/costi propri https://developers.cloudflare.com/browser-run/pricing/; nessun cloud selezionato.
- **HTTP caching** https://www.rfc-editor.org/rfc/rfc9111.html e **Range/If-Range** https://www.rfc-editor.org/rfc/rfc9110.html ottimizzano byte e resume, ma non riproducono record/versioni della sorgente automaticamente.
- **Crawl budget** https://developers.google.com/crawling/docs/crawl-budget capacity + demand; **Cho/García-Molina (ACM 2003)** https://doi.org/10.1145/958942.958945 mostra i limiti di schedulare refresh ingenuamente per change frequency.

Non scegliere oggi librerie o stack. Mappare invece il **guadagno di informazione verificata** sopra al costo CPU/browser/rete e ai limiti di fonte.
