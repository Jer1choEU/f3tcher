# 15 — Acquisizione universale: cataloghi, protocolli, browser e motori ibridi

**Data della ricognizione:** 2026-11-01. **Fase:** SOLO ricerca e confronto, nessun codice applicativo, test f3tcher, stack, architettura o roadmap approvati. Riprende [14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md](14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md) ma **riequilibra il lavoro verso la massima capacità di acquisizione**. Le condizioni di legalità in [04_LEGALITA_E_SICUREZZA.md](04_LEGALITA_E_SICUREZZA.md) restano inderogabili.

**Evidenza:** V-spec = standard ufficiale letto; V-doc = documentazione primaria dell'implementazione; V-paper = abstract/paper presso editore o proceedings; T = claim del produttore/autore non riprodotto; H = nuova ipotesi f3tcher da validare; P = pista da verificare ulteriormente. Nessun esito è benchmark di f3tcher e le stime prestazionali pubblicate da autori non sono generalizzabili senza test.

## 1. Risultato principale: la sorgente non è necessariamente un insieme di pagine HTML

Le tecniche di acquisizione non vanno classificate soltanto come **static scraper** o **browser scraper**. Un sito può offrire vie diverse, con semantiche e diritti diversi:

- **Catalogo autorevole / inventory**: dataset, distribuzioni, raccolte, record e URL di accesso, con serie/versioni.
- **API tipizzate per settore**: query su item o record con filtri spaziali, temporali e identificatori.
- **Feed/notification/delta**: variazioni dopo una baseline, con limiti di retention, delete e delivery.
- **HTTP/HTML strutturato**: link, embedded structured data, document metadata, canonical/alternate, sitemap e navigazione statica.
- **Navigazione browser**: JavaScript, cambi di stato, paginazione interattiva, risultati non disponibili nel DOM iniziale.
- **Risorse non HTML**: tabelle, documenti, scansioni, audio/video, rappresentazioni XML e archivi WARC/WACZ.
- **Archivi storici**: snapshot conservate, copie citabili, manifest/versioni e replay, non necessariamente copie originali online.

**H:** la strategia «scoprire interfacce dichiarate → valutarne permessi e limiti → scegliere il canale di acquisizione appropriato → confrontare canali differenti → riconciliare omissioni» merita confronto. Non è un protocollo unico esistente né una garanzia di completezza. Restano necessarie risorse non catalogate e fonti con metadati difettosi.

## 2. Nuovi protocolli verticali e interoperabilità (fonti primarie)

### V1 — W3C DCAT 3 (Recommendation, 22 agosto 2024)
https://www.w3.org/TR/vocab-dcat/
- Catalog, Dataset, Distribution, DataService e le relazioni con access URL, download URL, rights, media type, access service; DCAT 3 amplia dataset series, versioning e proprietà di relazione mantenendo compatibilità con DCAT 2.
- Opportunità: riconoscere dataset pubblicati da portali diversi, la stessa collezione in formati diversi e canali machine-readable.
- Limite: metadata dichiarati e incompleti, licenze di ciascuna distribuzione; una Distribution non coincide automaticamente con i byte di tutti i record di un dataset.

### V2 — DCAT-AP 3.0.1, profilo europeo (2025)
https://interoperable-europe.ec.europa.eu/collection/semic-support-centre/solution/dcat-application-profile-data-portals-europe/release/301
- Il profilo europeo descrive metadati di dataset pubblici e ricerca trasversale fra portali, include guidance multilingua, dataset series e riferimenti SHACL di conformance.
- Limite: una dichiarazione DCAT-AP non certifica che ogni dataset pubblico del territorio sia nel catalogo; profilo e grado di conformità dei portali variano.

### V3 — STAC, cataloghi e API geospaziali
Spec: https://stacspec.org/en/about/stac-spec/ ; esempio operativo documentato da Copernicus Data Space: https://documentation.dataspace.copernicus.eu/APIs/STAC.html
- Catalog / Collection / Item / Asset e API `/search` che supportano interrogazioni spaziali/temporali e paginazione. Copernicus CDSE documenta `/collections`, singole collection e search extension (filter, query, fields, sort).
- **Non** assumere che ogni backend supporti ogni estensione; file/bande/risoluzioni possono essere differenziati e avere regole di accesso distinte.
- **H:** testare la ricchezza di asset scoperti per stessa area/periodo rispetto a search web, limitando alla medesima sorgente e allo stesso budget.

### V4 — OGC API — Records, Part 1 Core (v1.0)
https://www.ogc.org/standards/ogcapi-records/ ; dettagli https://ogcapi.ogc.org/records/
- API per ricerca e browsing di cataloghi di record geospaziali: filtri `bbox`, `datetime`, `q`, `type`, `ids`, `externalIds`; può segnalare l'accesso a servizi e dati derivati. Parte 2 Facets e Parte 3 CRUD/Harvest **ancora bozze**, non confondere con Core normativo.
- Non è una scorciatoia per scaricare ogni asset descritto e non consente automaticamente modifiche mutative.

### V5 — IIIF Change Discovery v1.0.0, patrimonio culturale
https://iiif.io/api/discovery/ ; overview https://iiif.io/api/ ; implementers https://guides.iiif.io/guide_for_implementers/
- Change stream su resource IIIF Presentation: `Create`, `Update`, `Delete` (e altre attività), pagine/collection e livelli di conformità; contenuti e metadati possono puntare a Image API, Presentation e `seeAlso` con descrizioni LIDO/CIDOC/Dublin Core.
- Distinguere **Content Search** (ricerca all'interno di risorse note) da **Change Discovery** (trovare risorse/aggiornamenti). Le API IIIF hanno anche flussi di autorizzazione.
- Non assumere che tutte le immagini/manifest siano pubblicamente utilizzabili o che il change stream riporti ogni versione storica.

### V6 — CKAN Action API, dataset e servizi tabulari
https://docs.ckan.org/en/latest/api/
- `package_list`, `package_search`, `package_show`, `resource_search`, `recently_changed_packages_activity_list`; il DataStore ha proprie interfacce `datastore_search` e `datastore_search_sql`.
- **H:** catalog-first vs ricerca HTML su portali CKAN permessi, distinguendo i dataset individuati dalla completezza delle risorse pubblicate.
- Non usare le azioni mutative, i servizi autenticati o endpoint SQL arbitrari in test non autorizzati; presenza di una API non è consenso a scansioni indiscriminate.

### V7 — WebSub, W3C Recommendation (aggiornamento 2 giugno 2026)
https://www.w3.org/TR/websub/ ; cronologia https://www.w3.org/standards/history/websub/
- Publisher topic → hub → subscriber via callback HTTP e `rel=hub`/`rel=self`; possibile integrazione di **push events** dove il publisher pubblica hub e autorizza la sottoscrizione.
- Limiti: callback accessibile, policy di hub, auth, consegna non universalmente garantita, possibili notifiche mancanti. Non equivale a diario storico completo, né elimina snapshot/reconciliation.

### V8 — Schema.org Dataset markup + sitemap
https://developers.google.com/search/docs/appearance/structured-data/dataset
- `Dataset` metadata, `sameAs`, canonical landing page, sitemaps sono pratiche di discovery utili. Un markup su una landing page non dimostra che ogni distribuzione o record del dataset sia elencato.
- **H:** confrontare semantica di discoverability e *real asset retrieval*; non aumentare artificiosamente il conteggio con landing pages duplicate.

## 3. Crawler reali: differenze di costo e funzioni (V-doc; nessuna scelta di stack)

### V9 — Apache StormCrawler v3.7 (2026)
https://stormcrawler.apache.org/docs/latest/index.html ; https://stormcrawler.apache.org/
- Crawling distribuito continuo su Apache Storm: URL frontier, partizionamento e *politeness* per host/dominio/IP, retry, sitemap/RSS/Atom, HTTP fetch, Tika per documenti e supporto Playwright come opzione per headless browsing. URL storage esterno e topology continuo.
- Prezioso come baseline di **streaming e frontier**; provider ammette che il limite di fetch per singolo host è vincolato ai delay e che **non esiste un termine automatico** per una topology continua. Le dichiarazioni di produzione del sito sono del provider, non benchmark indipendenti.
- Non implicare che l'integrazione Tika significhi comprensione affidabile di ogni PDF, tabella o video.

### V10 — Scrapy, stato persistente JOBDIR
https://doc.scrapy.org/en/latest/topics/jobs.html
- Scheduler persistente, dedupe su disco e spider state se il processo è sospeso **pulitamente**, requisiti di serializzazione; ripresa potenzialmente incompatibile fra versioni. Crash brutali possono corrompere JOBDIR.
- **Limite importante:** una ripresa tecnica del job non dimostra che nessuna pagina o evento sia stato perso o che la sorgente sia rimasta immutata.

### V11 — Crawlee, HTTP vs browser
https://crawlee.dev/js/docs/quick-start ; https://github.com/apify/crawlee
- Componenti `CheerioCrawler` (HTTP/HTML senza JS), `PlaywrightCrawler`/`PuppeteerCrawler` (browser), RequestList/RequestQueue. I documenti consigliano di partire da HTTP quando sufficiente; il browser consuma risorse e introduce ulteriori stati.
- **H:** capire quando *è necessario* rendering completo e quando un protocollo/HTML dichiarato è sufficiente, non forzare browser su ogni sito.
- L'uso di browser non autorizza a eludere blocchi, autenticazione, CAPTCHA, paywall o limiti di accesso.

### V12 — Browsertrix Crawler
https://crawler.docs.browsertrix.com/ ; https://crawler.docs.browsertrix.com/user-guide/outputs/
- Puppeteer / Chromium tramite Chrome DevTools Protocol; configurazione behaviours per pagine dinamiche, file WARC/WACZ, logging e QA basata su replay per verificare qualità dell'archiviazione.
- Può usare fetch non browser per risorse non HTML e produce output e log. Codice https://github.com/webrecorder/browsertrix-crawler (repository dichiara **AGPL-3.0**, da verificare per compatibilità in eventuale adozione).
- Limite: **fedeltà del replay** a una visita non equivale a **completezza degli URL** o recupero di tutti gli stati possibili dell'interfaccia; comportamenti di login richiedono autorizzazione reale.

### V13 — Docling come riferimento di eterogeneità dei formati, non un web crawler
https://docling.ai/formats/
- Supporta input PDF/Office/HTML/XML/CSV/XLS/EPUB, immagini e media audio/video via componenti di trasformazione, con elementi come tabelle, layout, provenance.
- **Distinguere dichiarazione di formati supportati da accuratezza per ogni formato.** Test specifici per liste, fogli, metadata e timestamp sono trattati in docs 09/12. Non scartare il sorgente originale dopo una conversione parziale.

## 4. Ricerca 2026: quanto vale l'intelligenza agentica?

### V14 — WebDART, Yang et al., Findings ACL 2026
https://aclanthology.org/2026.findings-acl.568/
- Distingue navigazione, estrazione, esecuzione e ripianifica quando compaiono filtri/scorciatoie. Gli autori riportano **fino a +13,7 punti percentuali** nel successo sui compiti di WebChoreArena, non in recall di un crawl universale. Paper dice che il codice sarà pubblicato; **non** affermare che sia già disponibile.
- **Limite:** benchmark di task navigazionali, non prova che il sistema scopra ogni pagina o asset.

### V15 — BaRA (preprint 2026; abstract indicizzato, link arXiv da riverificare)
https://arxiv.org/abs/2607.00007
- Gli autori propongono *Budget-constrained and Reliable Web Data Collection Agent*: discovery BFS, verifica dei link vivi, validazione di artefatti testo/immagine/video e controllo su budget.
- **P** per dettagli codice, metrica e dataset: l'abstract è stato visto tramite indice, ma l'accesso diretto a arXiv è risultato indisponibile in questa sessione. Non classificare il paper come verificato per contenuti ulteriori e non citare numeri inesistenti.

### V16 — Abitov, Dakhnovich, Moskvin (journal russo 2026)
https://jisp.spbstu.ru/en/article/2026.28.7/
- Due fasi: analisi onerosa mediante LLM, seguita da raccolta massiva economica e deterministica; autori riportano un **F1=0,89** nel loro dataset. Limiti dichiarati: fragilità dei selector, cambiamenti delle difese dei siti, costo dell'impostazione.
- È **una linea già esistente** che impedisce di rivendicare «prima invenzione al mondo» per *LLM once, deterministic many*. La licenza del paper è CC BY-NC e non si trasferisce automaticamente al software o ai dati di prova.

### V17 — VeriEnv, Chae, Park, Ritter, ICML 2026
https://proceedings.mlr.press/v306/chae26a.html
- Ambienti simulati e verificabili che riproducono siti per apprendimento web agents senza sperimentazione indiscriminata in produzione; ricompense programmatiche.
- **H:** utilizzare ambienti di prova controllati per determinare se una tecnica di acquisizione regge paginazione, stati dinamici e modifiche HTML, **senza** interrogare con esperimenti invasivi siti terzi. Non è un engine di scraping universale né esistono benchmark f3tcher.

### V18 — A systematic review of web scraping (Data & Knowledge Engineering, luglio 2026)
https://doi.org/10.1016/j.datak.2026.102598
- Rassegna su metodi classici, LLM-enhanced, metriche e vincoli legali; disponibile abstract dell'editore, **non** replica né lettura integrale sistematica in questa sessione. Utile come controllo di copertura della futura bibliografia.

## 5. Sintesi comparativa: cosa risolve ciascun approccio

| Metodo | Discovery | Costo operativo / fattore critico | Omissione possibile |
|---|---|---|---|
| DCAT/CKAN | Cataloghi, dataset e distribuzioni pubblicati | Basso per metadati; download può essere costoso | Asset non catalogati, metadata non validi |
| STAC/OGC | Metadati di asset geospaziali con query | Query service + bytes grandi | Estensioni non presenti, paginazione, coverage parziale |
| IIIF/ResourceSync | Variazioni di oggetti dichiarati | Feed/catch-up e necessità baseline | Retention delete, provider incompleti |
| WebSub | Notifiche quando il publisher ha un hub | Callback, verifica, lease | Notification loss, subscriber offline |
| Scrapy/Crawlee HTTP | HTML/link e endpoint già dichiarati | Più economico che un browser per pagine statiche | Contenuto client-only e stati interattivi |
| Browsertrix/Playwright | DOM renderizzato, interazioni consentite | CPU/RAM, tempo e stati; politeness | Stati inesplorati, replay non completo |
| StormCrawler | Frontier e scheduling continui distribuiti | Storage, backpressure, politeness host | Limiti globali per host, gap se publisher instabile |
| Docling / parser | Contenuto di file e multimodalità dopo download | OCR/media e qualità dell'estrazione | Righe, immagini, relazioni e metadata persi |

**La tabella non è una classifica né un'architettura proposta.** Sono capacità dichiarate e limiti da confrontare; alcuni metodi sono complementari, altri sostituibili in contesti specifici.

## 6. Piste potenzialmente differenzianti (H — NON implementate)

1. **Protocol awareness before crawling:** identificare i canali pubblicati prima di scegliere HTTP, catalogo, stream o browser; misurare nuove *risorse uniche* e costo della discovery, non solo pagine.
2. **Evidence-constrained route selection:** quando esistono più interfacce che descrivono il medesimo asset, valutare diritti, provenienza, latenza, retention e qualità; conservare traccia di ciò che differisce e non confondere due URL con due risorse.
3. **Format-aware acquisition:** non perdere distribuzioni PDF/CSV/XLS/IIIF/GeoTIFF/audio/video perché l'HTML espone solo un titolo; separare *asset discovery* da *asset parse* e *usable structured extraction*.
4. **Browser only when useful:** confrontare HTTP/structured data contro browser, con regole d'escalation **da scoprire attraverso test**, evitando che l'LLM decida da solo in modo opaco.
5. **AI-to-deterministic reuse:** l'analisi LLM costosa può essere riutilizzata in procedure deterministiche dove verificabile, ma vanno misurati selector drift, versioni, false omission e recupero di errori; già esiste letteratura sul tema.
6. **Cross-channel reconciliation:** catalogo + pagina + feed + archivio possono rivelare asset diversi; non sommare ingenuamente i conteggi, verificare identità e dipendenze.
7. **Recovery after gap:** notifiche push e delta non equivalgono ad archivio; distinguere ripresa, full rescan, e irreversibilità con flag esplicito.
8. **Long-tail-aware frontier:** non trascurare siti e dataset periferici a causa di metriche solo di throughput; controllare costi e fairness dei budget.
9. **Policy-conscious capability discovery:** esplorare documentazione/metadata pubblicati e consentiti, mai enumerare endpoint a forza, bypassare 403, autenticazione, CAPTCHA, paywall, robots, rate limit e condizioni di riutilizzo.
10. **Adaptive failure instrumentation:** HTTP 200, WACZ riproducibile e JSON valido **non** significano che ogni pagina, asset o riga sia presente.

## 7. Test scientifici proposti (NON eseguiti, nessun requisito)

| Confronto | Ground truth di un futuro testbed autorizzato | Falsi successi da scoprire |
|---|---|---|
| HTML-only vs catalog-first | Dataset, distribuzioni e file inventariati, inclusi oggetti non linkati da HTML | «Tutti i file trovati» ma solo landing pages |
| Discovery multisettoriale | Portali CKAN/DCAT, STAC/OGC, IIIF e provider con metadata volutamente falsi | Un solo protocollo usato per tutti, false completeness |
| HTTP vs browser | SPA che carica dati in più stati, più pagina SSR identica | Rendering inutile o contenuti interattivi assenti |
| Browser QA vs recall | WACZ riproducibile ma link/asset nascosti in tab o paginazione | Replay perfetto scambiato per copertura completa |
| AI setup vs deterministic | Selector validi, selector drift, cambio pagine, missing fields | Parser che continua a emettere JSON valido ma perde righe |
| Push/delta vs scan | Feed con notifiche mancanti, retention limitata, tombstone | Completezza storica dichiarata nonostante gap |
| Frontier long tail | Host piccoli rari e un host grande con link ripetuti | Throughput alto con copertura rara bassa |
| Document/media acquisition | PDF multipagina, spreadsheet, XML, scansioni, IIIF e allegati | Risorsa scaricata ma dati non estratti |
| Failover e retry | Crash brutale, timeouts, canonical collision, alt format | Task «success» con URL invisibili e duplicati |
| Rispetto permessi | Sorgenti read-only consentite vs endpoint mutativi/negati | Probing invasivo, abuso o uso non autorizzato |

Metriche future da discutere: risorse uniche scoperte per budget, *asset recall*, field/record recall, freshness, missingness, failure detection, cost per correct artifact, tail coverage, false completeness claims, data integrity, permission violations (target zero). Confronti a tempo/budget/ambito/diritti uguali. Per dati senza ground truth nessun recall assoluto dichiarabile.

## 8. Nuove domande che restano aperte

- **Copertura dei protocolli:** quanti portali reali italiani/europei pubblicano metadati DCAT-AP, CKAN, STAC, IIIF, OGC Records e WebSub interoperabili, non solo conformi sulla carta?
- **Discovery senza crawling invasivo:** quando sitemap, `Link` headers, feed e cataloghi permettono di trovare contenuti che un browser non mostra?
- **Decisione automatica del canale:** regole leggere e verificabili (MIME/HTML/metadata) contro LLM e ripianificazione; trade-off e failure rate.
- **Scaling sotto vincoli:** esistono condizioni dove il semplice limite di politeness domina completamente ogni ottimizzazione?
- **Formati rari e profondità:** quali strumenti per XML legislativo, pacchetti documentali, sottotitoli, pagine scansite, dati statistici e serie temporali specialistiche?
- **Specializzazioni non prioritarie:** protocolli di federazione, open science e repository dati non trattati qui; prossime ricognizioni devono coprire le famiglie mancanti prima di progettare.
- **Compliance:** verificare limiti contrattuali/licenze/robots e protezione dei dati quando l'asset discovery trova accessi tecnicamente funzionanti.

## Stato finale

**Questa è una ricognizione di protocolli e sistemi già esistenti, non un design di f3tcher**. Sono emersi standard verticali utili, un caso europeo reale (DCAT-AP/Copernicus STAC), meccanismi push (WebSub), crawler con funzioni distinte e tre filoni scientifici del 2026 sull'uso di agenti, più la separazione LLM setup e raccolta deterministica. Originalità, superiorità, prestazioni e costo ottimali restano **non dimostrati**. Nessun codice o benchmark di f3tcher eseguito.
