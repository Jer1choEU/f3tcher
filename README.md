# f3tcher — ricerca e prototipo di acquisizione

> **Stato dal 2 novembre 2026:** al precedente archivio scientifico e ai quattro piloti si aggiunge un **primo core sperimentale eseguibile**, derivato dalle capacità generiche di Fetcher-Silvestri. Non è un crawler universale completo, né un servizio in produzione; non sono attive fonti per impostazione predefinita. Architettura, stack definitivo e benchmark sono ancora soggetti a validazione.

## Core sperimentale (prima integrazione Fetcher-Silvestri)

Sono implementati un catalogo di fonti con revisione esplicita e hold indipendenti, fetch HTTPS limitato con timeout sul corpo, redirect controllati, RSS/Atom e risorse JSON/CSV/HTML/testo/PDF/binari (questi ultimi **solo come asset e hash**, senza estrazione del contenuto), raccolte JSON/CSV configurabili, checksum SHA-256, archiviazione opzionale di record JSON/CSV solo con licenza di riuso revisionata, deduplicazione tra fonti, sightings e domini candidati, checkpoint atomici in libSQL/Turso, lease per impedire corse sovrapposte, polling equo, ETag/Last-Modified, refresh completo giornaliero, backoff con Retry-After 429/503 e disabilitazione persistente per 403, monitor di integrità/qualità, Worker Cloudflare e CLI locale. Nessuna implementazione effettua bypass di login, blocchi o robots; l'accesso è disabilitato fino a revisione umana documentata.

```sh
npm ci
npm test
npm run build          # dry-run, nessun deploy
npm run collect        # catalogo vuoto: nessuna richiesta esterna
npm run health         # riepilogo locale
```

Le fonti si configurano in `config/sources.json` usando `config/sources.example.json`; gli hold indipendenti sono in `config/holds.json`.  e restano disabilitate fino a revisione. Il Worker richiede `TURSO_URL`, `TURSO_AUTH_TOKEN` e (per `POST /admin/run`) `ADMIN_TOKEN` come secret, mai nel repository; `GET /health` espone solo aggregati. Il Cron è una configurazione non ancora distribuita. Vedi [documentazione della migrazione](docs/29_INTEGRAZIONE_FETCHER_SILVESTRI.md) per confini, prove e funzionalità non ancora trasferite.

---

## Archivio storico della ricerca

> **Stato dei piloti prima del core:** ricerca esplorativa consolidata; protocollo di validazione documentato (24); **quattro piloti sperimentali eseguiti (25–28); nel quarto Scrapy e Crawlee reali sono stati confrontati su GitHub Actions**, senza benchmark scientifico indipendente né codice del motore f3tcher. All'epoca dei piloti non esistevano ancora architettura approvata, stack deciso o motore funzionante; il codice aggiunto è **esclusivamente il simulatore sperimentale**, non un benchmark confermatorio. Questo repository conserva le conoscenze emerse dalle conversazioni di ricerca e permette di riprendere il lavoro in una nuova chat.

## Obiettivo condiviso

Costruire **un unico motore universale di acquisizione di informazioni digitali** utilizzabile da progetti futuri: web scraping, crawling, discovery, API, feed, archivi, documenti, streaming e altre fonti digitali. Ambizione: **massima copertura, profondità storica, freschezza, autonomia, completezza, affidabilità e interoperabilità**, senza profili Fast/Deep/Maximum e senza inutili limiti artificiali di prodotto.

Il motore dovrà scegliere **automaticamente** i metodi più adatti alla fonte, anche in combinazione; potrà riutilizzare le acquisizioni per più progetti con isolamento dei permessi.

**Vincolo non negoziabile: rispetto delle leggi e degli accessi autorizzati.** Un HTTP 403 è un segnale di arresto per quel percorso, ma **l'assenza di un 403 non è un'autorizzazione legale universale**. Niente elusione di autenticazioni, barriere di sicurezza o divieti. Si studiano, invece, vie alternative legittime (API, archivi aperti, dataset, autorizzazioni).

## Documenti di lavoro

| Documento | Contenuto |
|---|---|
| [docs/00_STATO_E_DECISIONI.md](docs/00_STATO_E_DECISIONI.md) | Decisioni confermate, stato reale, vincoli, questioni aperte e consegne |
| [docs/01_ATLANTE_FUNZIONALITA.md](docs/01_ATLANTE_FUNZIONALITA.md) | Tutte le famiglie di capacità e le idee emerse, **non** requisiti definitivi |
| [docs/02_PROGETTI_E_TECNOLOGIE.md](docs/02_PROGETTI_E_TECNOLOGIE.md) | Confronto di prodotti, repository open source e standard |
| [docs/03_STUDI_E_FONTI.md](docs/03_STUDI_E_FONTI.md) | Registro di studi, articoli, documentazione e fonti con stato delle verifiche |
| [docs/04_LEGALITA_E_SICUREZZA.md](docs/04_LEGALITA_E_SICUREZZA.md) | Confini legali, gestione accesso, sicurezza, riservatezza e licenze |
| [docs/05_DOMANDE_E_BENCHMARK.md](docs/05_DOMANDE_E_BENCHMARK.md) | Ipotesi scientifiche, prove comparabili e metriche |
| [docs/06_RIPRESA_NUOVA_CHAT.md](docs/06_RIPRESA_NUOVA_CHAT.md) | Istruzioni operative e prompt di ripartenza per nuove conversazioni |
| [docs/07_RICOGNIZIONE_2026-11-01.md](docs/07_RICOGNIZIONE_2026-11-01.md) | Nuove fonti verificate e ipotesi: Arazzo, FAIR Signposting/Linkset, OData Delta, ODRL, Active Search, BagIt/OCFL |
| [docs/08_ADOZIONE_CONSISTENZA_E_LONG_TAIL.md](docs/08_ADOZIONE_CONSISTENZA_E_LONG_TAIL.md) | Adozione verificata documentalmente, limiti dei delta, pagination, fonti rare e ipotesi di ricerca senza benchmark |
| [docs/09_COMPLETEZZA_LOCALE_E_PROVE.md](docs/09_COMPLETEZZA_LOCALE_E_PROVE.md) | Completezza verificabile per interrogazione/perimetro, limiti capture-recapture, watermark e due benchmark ExtractBench distinti |
| [docs/10_INVENTARI_E_GARANZIE.md](docs/10_INVENTARI_E_GARANZIE.md) | Inventari e checksum reali (Wikimedia), bulk/delta/retention (Crossref, OpenAlex, GBIF), OAI-PMH, ResourceSync e limiti delle prove crittografiche |
| [docs/11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md](docs/11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md) | Dipendenze/copia fra fonti, provenance, TUF, witness, SCITT e prove crittografiche circoscritte |
| [docs/12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md](docs/12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md) | Corpus METER/COUNTER/USTRC/NewsEdits/PAN 2025-2026, provenienza multilivello, casi di incertezza e diritti |
| [docs/13_DIFFUSIONE_IDENTIFICABILITA_E_ASTENSIONE.md](docs/13_DIFFUSIONE_IDENTIFICABILITA_E_ASTENSIONE.md) | Stanford NETINF/MemeTracker, inferenza delle origini da cascades, confidence sets, astensione calibrata, limiti e nuove ipotesi |
| [docs/14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md](docs/14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md) | Ricerca iterativa delle prove, FIRE, AFA/POMDP, rischio del prior errato, feedback e valutazione off-policy |
| [docs/15_ACQUISIZIONE_UNIVERSALE_PROTOCOLLI_E_CRAWLER.md](docs/15_ACQUISIZIONE_UNIVERSALE_PROTOCOLLI_E_CRAWLER.md) | Scoperta e acquisizione multiprotocollo: DCAT/DCAT-AP, STAC, OGC, IIIF, CKAN, WebSub, crawler e agenti |
| [docs/16_ACQUISIZIONE_SPECIALISTICA_RICERCA_LEGGI_STATISTICHE_FEDERAZIONE.md](docs/16_ACQUISIZIONE_SPECIALISTICA_RICERCA_LEGGI_STATISTICHE_FEDERAZIONE.md) | OpenAIRE, DataCite, arXiv, Europe PMC, Normattiva, Cellar, Europarl, Eurostat/Istat SDMX e ActivityPub/ATProto |
| [docs/17_BREVETTI_BIOLOGIA_AUDIOVISIVI_CONSERVAZIONE.md](docs/17_BREVETTI_BIOLOGIA_AUDIOVISIVI_CONSERVAZIONE.md) | Brevetti EPO, archivi ENA/NCBI, Europeana/EBU/WebVTT, METS/PREMIS/E-ARK/BagIt e acquisizione di oggetti composti |
| [docs/18_SINTESI_COMPARATIVA_E_LACUNE.md](docs/18_SINTESI_COMPARATIVA_E_LACUNE.md) | **Sintesi comparativa 00–17:** sovrapposizioni, complementarità, limiti, otto confronti decisivi e criteri di conclusione della ricerca |
| [docs/19_ADOZIONE_REALE_E_COMPATIBILITA_PORTALI.md](docs/19_ADOZIONE_REALE_E_COMPATIBILITA_PORTALI.md) | **Reality check su portali reali:** Copernicus STAC 2026 old/new (JSON letto), Rijksmuseum IIIF/OAI/LDES, RNDT GeoDCAT, Zenodo, UK CKAN, data.europa e Signposting; confini delle verifiche |
| [docs/20_SORGENTI_DIFFICILI_MODULI_STATI_E_OMISSIONI.md](docs/20_SORGENTI_DIFFICILI_MODULI_STATI_E_OMISSIONI.md) | **Sorgenti difficili:** moduli di ricerca, deep web lecito, AJAX/SPA, liste dinamiche, paginazione, soft-200 e false acquisizioni complete |
| [docs/21_SCALABILITA_COSTI_E_ACQUISIZIONE_EFFICIENTE.md](docs/21_SCALABILITA_COSTI_E_ACQUISIZIONE_EFFICIENTE.md) | **Efficienza e scala:** politeness per host/IP, Scrapy/StormCrawler, HTTP caching e Range, revisite, Crawlee, Browser Run, costi informativi e 10 confronti |
| [docs/22_ROUTING_ADATTIVO_SCELTA_METODO_E_VALIDAZIONE.md](docs/22_ROUTING_ADATTIVO_SCELTA_METODO_E_VALIDAZIONE.md) | **Routing adattivo reale:** Crawlee AdaptivePlaywrightCrawler, regole vs ML, bandit, escalation, controlli sulle omissioni, sicurezza dell'agente |
| [docs/23_SINTESI_SCIENTIFICA_FINALE_RICERCA_ESPLORATIVA.md](docs/23_SINTESI_SCIENTIFICA_FINALE_RICERCA_ESPLORATIVA.md) | **PUNTO DI PARTENZA ATTUALE:** conclusioni scientifiche 00–22, claim non sostenibili, tre ipotesi, sei confronti discriminanti, lacune e criteri per eventuale fase sperimentale |
| [docs/24_PROTOCOLLO_VALIDAZIONE_SCIENTIFICA.md](docs/24_PROTOCOLLO_VALIDAZIONE_SCIENTIFICA.md) | **PROTOCOLLO PROPOSTO (NON ESEGUITO):** 6 famiglie di prove, baseline, gold corpus, denominatori, metriche, statistica, costi, sicurezza e gate di autorizzazione |
| [docs/25_PILOTA_SINTETICO_RISULTATI.md](docs/25_PILOTA_SINTETICO_RISULTATI.md) | **PRIMA PROVA LOCALE ESEGUITA:** 54 record sintetici, HTML 24, API 28, unione 46; browser bloccato, 2 test automatici superati, nessuna generalizzazione |
| [docs/26_PILOTA02_BASELINE_METRICHE_FALSE_COMPLETE.md](docs/26_PILOTA02_BASELINE_METRICHE_FALSE_COMPLETE.md) | **SECONDA PROVA LOCALE ESEGUITA:** 27 casi/4 metodi, 195/195 record raggiungibili con HTML+API ma 3 false complete; 4 test automatici, senza benchmark indipendente |
| [docs/27_PILOTA03_FIXTURE_ESTERNA_E_ROUTING_API.md](docs/27_PILOTA03_FIXTURE_ESTERNA_E_ROUTING_API.md) | **TERZA PROVA LOCALE ESEGUITA:** fixture MIT esterna identica all'originale, 12/12 HTML statico, 0/8 dinamico senza JS, 8/8 da API esplicita; 4 test superati, non blind |
| [docs/28_PILOTA04_SCRAPY_CRAWLEE_CI.md](docs/28_PILOTA04_SCRAPY_CRAWLEE_CI.md) | **QUARTO PILOTA ESEGUITO SU ACTIONS:** Scrapy 2.19 e Crawlee 3.17 entrambi 12/12 statici e 8/8 via JSON, 0/8 senza rendering JS; run e artefatto verificati |

Per una vista consolidata leggere **prima [la sintesi scientifica 23](docs/23_SINTESI_SCIENTIFICA_FINALE_RICERCA_ESPLORATIVA.md)**, poi **[il protocollo di validazione proposto 24](docs/24_PROTOCOLLO_VALIDAZIONE_SCIENTIFICA.md)**, quindi [la matrice comparativa 18](docs/18_SINTESI_COMPARATIVA_E_LACUNE.md) e le fonti pertinenti. **Il documento 24 non è una preregistrazione definitiva e non autorizza test, architettura o codice.**

## Avvertenze di metodo

- **Ricerca ≠ implementazione.** Nessun tool o studio citato implica che f3tcher possieda già quella funzionalità.
- **Risultati esterni ≠ benchmark di f3tcher.** I numeri di studi terzi appartengono agli autori. I numeri dei **piloti 25/26/27** sono nostri ma soltanto su quattro sorgenti sintetiche progettate insieme ai client, senza validazione indipendente.
- **Verifica dei riferimenti.** Parte dei link è stata controllata direttamente su documentazione primaria il 2026-11-01; altri sono **piste emerse nelle chat precedenti da riverificare**. Il registro indica la distinzione.
- **Niente specifiche definitive per ora.** La preferenza dell'utente è continuare a cercare e confrontare prima di fissare architettura, stack o roadmap di sviluppo.
- **Quando riprendi:** leggi prima [docs/06_RIPRESA_NUOVA_CHAT.md](docs/06_RIPRESA_NUOVA_CHAT.md) e [docs/00_STATO_E_DECISIONI.md](docs/00_STATO_E_DECISIONI.md).

Aggiornato al **2 novembre 2026** con un **harness sperimentale locale eseguito**, ma senza motore f3tcher implementato o benchmark confermatorio.

Creato come archivio della ricerca concordata fino al **1 novembre 2026**, non come promessa di originalità assoluta o fattibilità già dimostrata.
