# 19 — Reality check: adozione e interoperabilità dei protocolli su portali reali

**Ricognizione:** 2026-11-02 (Europe/Rome). **Fase:** sola ricerca, nessuna implementazione, benchmark f3tcher, esecuzione di crawler, acquisizione massiva, download di dataset o architettura approvata. Segue la [sintesi 18](18_SINTESI_COMPARATIVA_E_LACUNE.md). Obiettivo mirato: passare da **standard dichiarati** a **portali concreti documentati**, e, quando possibile, leggere **una singola risposta metadata leggera**. La selezione è *intenzionale e non rappresentativa*: NON stimare la percentuale di tutti i portali conformi.

**Legenda delle evidenze (rigorosa)**:
- **R** — risposta di un endpoint di metadati GET **letta direttamente tramite il servizio di consultazione web**; si è osservata quella risposta, **non** provata disponibilità stabile, completezza, prestazioni, conformità end-to-end o compatibilità con f3tcher.
- **D** — endpoint/capacità **documentati dal publisher ufficiale** ma non verificati end-to-end con parsing dell'output in questa sessione.
- **A** — implementazione elencata in una **directory degli adottanti** (autodichiarata/curata), non verificata direttamente.
- **U** — risposta **non valutabile con lo strumento corrente** (es. `text/xml`, `application/ld+json` non renderizzati, accesso attraverso il tool non riuscito). **U non equivale a HTTP 4xx, downtime o mancanza di supporto**.
- **H** — ipotesi da falsificare in un futuro testbed o audit autorizzato, NON risultato.

Le nostre osservazioni non costituiscono *benchmark*, non autorizzano raccolta o analisi indiscriminata e non mutano la policy di [04_LEGALITA_E_SICUREZZA.md](04_LEGALITA_E_SICUREZZA.md).

## 1. Il risultato più significativo: cambio reale di endpoint e semantica con STAC nel 2026

**Copernicus Data Space Ecosystem**, annuncio ufficiale **16 ottobre 2026**:
https://dataspace.copernicus.eu/news/2026-10-16-new-sfeos-stac-catalogue-endpoint

- Nuovo endpoint `https://stac.opensearch.dataspace.copernicus.eu/v1/` disponibile e con **parallel run** con il precedente `https://stac.dataspace.copernicus.eu/v1/`. Annunciata sostituzione del precedente **12 gennaio 2027**. Queste sono le date pubblicate dal provider, non verifica futura della loro esecuzione.
- Nuovo backend dichiarato **SFEOS / stac-fastapi-elasticsearch-opensearch**, migliore velocità delle query e queryables più numerosi; le prestazioni dichiarate sono claim del provider, **non misure f3tcher**.
- **Quote annunciate sul nuovo backend**: fino a **10 richieste/s per burst**, **60 richieste/minuto/IP senza autenticazione**, **240 richieste/minuto con token**. Si applicano alle condizioni del publisher e vanno ricontrollate prima di eventuale uso; non interrogare intenzionalmente fino al limite. Non inferire che questi valori si applichino all'endpoint precedente.
- **R1 — risposta vecchio endpoint letta:** https://stac.dataspace.copernicus.eu/v1/ restituisce JSON `type=Catalog`, `id=cdse-stac`, `stac_version=1.0.0`, links `collections`, `search`, `queryables`, `service-desc`. Osservazione puntuale **2026-11-02**.
- **R2 — risposta nuovo endpoint letta:** https://stac.opensearch.dataspace.copernicus.eu/v1/ restituisce JSON `type=Catalog`, `id=stac-fastapi`, `stac_version=1.1.0`, link `collections`, `search`, `service-desc`, `collections-search`, `structure`, `queryables` e altri. Osservazione puntuale **2026-11-02**.
- **Caveat:** si è verificata la **root JSON**, non la restituzione di item per query reale, il download di un asset, il rispetto di ogni STAC conformance class o l'equivalenza fra vecchio e nuovo catalogo. Differenze fra `conformsTo` pubblicate dai due server **non** equivalgono da sole a prove indipendenti di compatibilità funzionale o di contenuto identico.
- Copernicus conferma più interfacce (OData, STAC, Sentinel Hub Catalog) per lo stesso ecosistema di dati: https://dataspace.copernicus.eu/analyse/apis/catalogue-apis . Riconciliare per ID e versione, **non** contare ogni API come una fonte diversa.
- **H1:** pianificare un futuro test controllato di migrazione su una manciata di ID/collection/asset di riferimento e per la stessa data, prima e dopo la scadenza 2027; verificare il cambiamento degli endpoint/conformance con la metadata discovery, non creare automaticamente infinite richieste.

## 2. Rijksmuseum: un publisher con OAI-PMH, LDES, IIIF e download; proprietà diverse

Documentazione ufficiale:
- servizi: https://data.rijksmuseum.nl/docs/
- OAI-PMH: https://data.rijksmuseum.nl/docs/oai-pmh/
- IIIF: https://data.rijksmuseum.nl/tutorials/iiif/
- Change Discovery entry point **documentato**: `https://data.rijksmuseum.nl/cd/collection.json`
- LDES: https://data.rijksmuseum.nl/tutorials/ldes/ ; doc https://data.rijksmuseum.nl/docs/ldes

**D1 — OAI-PMH:** il provider dichiara `https://data.rijksmuseum.nl/oai`, verb `Identify`, `ListSets`, `ListRecords`, `GetRecord`, `ListIdentifiers`; *solo oggetti della collezione museale*, non i record della biblioteca o gli archivi. La documentazione dell'11 giugno 2026 avvisa che la nuova rappresentazione XML **EDM** può causare modifiche incompatibili per chi usa parser XML anziché grafi RDF, pur cercando di soddisfare XML Schema e Schematron di Europeana. Il solo nome del protocollo **non garantisce schema invariato**.

**D2 — IIIF:** Image API recupera/trasforma immagini; Presentation descrive composizione dell'oggetto; Change Discovery indica risorse cambiate e richiede nuovo fetch. Dunque *change event* ≠ nuovo asset già disponibile nel feed. Il provider fornisce root `/cd/collection.json`.

**D3 — LDES / TREE:** `https://data.rijksmuseum.nl/ldes/collection.json` usa stream/fragment paginati; **anche se LDES può modellare eventi immutabili e versioni**, la specifica implementazione Rijksmuseum dichiara una **retentionPolicy `LatestVersionSubset`, `amount=1`**. Non usare questo stream come prova che si possa ricostruire tutta la storia degli oggetti. La pagina di documentation precisa inoltre che la scoperta automatica dei numeri dei dataset non è disponibile via LDES e rimanda ad altri canali.

**U1 — verifica diretta del change endpoint:** il tool di consultazione ha segnalato **content-type `application/ld+json` non supportato dal visualizzatore** per `/cd/collection.json`; non si può affermare che l'endpoint abbia fallito o che sia stato parsato. Non sono stati scaricati gli eventi.

**H2:** confrontare su un piccolo perimetro autorizzato e versionato **OAI-PMH vs LDES vs IIIF discovery vs bulk** per risorse realmente uniche, stato aggiornato, cancellazioni, perdita di versioni, semantica dei dataset e diritti; senza assumere che più protocolli producano maggiore copertura.

## 3. Zenodo: OAI-PMH realmente documentato, ma metadata ≠ file

**D4 — documentation ufficiale** https://developers.zenodo.org/
- Base OAI-PMH pubblicata `https://zenodo.org/oai2d`, indicata per harvest del repository. **Metadata CC0**; i file delle singole registrazioni possono essere soggetti ad altre licenze o a **closed access**.
- **U2 — verifica diretta:** `https://zenodo.org/oai2d?verb=Identify` restituisce un content type **`text/xml` non supportato dal visualizzatore corrente**. Questo non prova che OAI sia inoperativo o risponda correttamente al verb: solo la guida del provider è una fonte applicativa consultabile in questa sessione.
- **H3:** confrontare record metadata, link ai file e bytes autorizzati per un dataset realmente OA, evitando che «record harvested» venga conteggiato come «dataset fully downloaded».

## 4. Data.gov.uk: CKAN reale, con limitazione espressa della directory

**D5 — guida ufficiale** https://guidance.data.gov.uk/get_data/api_documentation/
- Directory/portale UK espone CKAN Action API `https://data.gov.uk/api/action/` con `package_list`, `package_show`, `package_search`, `organization_list`.
- Il publisher dichiara **nessuna API key necessaria e nessun rate limit** sulla directory; ciò **non** autorizza volumi aggressivi o richieste che violino altri termini o incidano sul servizio.
- **Esclusione di copertura:** la guida segnala che le **curated collections non sono ancora disponibili via API**. La disponibilità di `package_search` **non** dimostra la piena parità funzionale con l'interfaccia utente.
- **U3 — verifica diretta:** una semplice URL `/api/action/package_search?q=fish&rows=1` è risultata non accessibile attraverso il servizio di consultazione usato. **Nessuna conclusione** su uptime o stato della risposta reale; doc publisher confermata.
- **H4:** inventory directory API vs UI (nei termini leciti) e test di mismatch nel testbed; *assenza nell'API* non significa assenza dal portale.

## 5. Italia: RNDT GeoDCAT-AP e REST non sono solo uno schema sulla carta

**D6 — Repertorio Nazionale dei Dati Territoriali**, documentazioni aggiornate nel 2026:
- REST: https://geodati.gov.it/geoportale/strumenti/api-rest (**ultima modifica 31 luglio 2026**), endpoint e filtri documentati `q`, `id`, `bbox`, `modified`, ordinamento.
- GeoDCAT-AP: https://geodati.gov.it/geoportale/eng/strumenti-en/geodcat-ap-endpoint ; https://geodati.gov.it/geodcat-ap_it/ . Il publisher dichiara una trasformazione da **ISO TS 19139 → GeoDCAT-AP(_IT)/DCAT-AP(_IT)** e restituzione di metadati **RDF/XML oppure JSON-LD** via REST/CSW; questi metadata confluiscono anche in **dati.gov.it**.
- **Caveat:** una trasformazione semantica non equivale a equivalenza perdita-zero di tutti i campi e le loro restrizioni; *metadata catalogati* non significano dataset geospaziale disponibile. Non eseguita query diretta all'endpoint RNDT (D, non R).
- **H5:** confrontare ID provenienza, campi/relazioni e availability della distribuzione per record RNDT → GeoDCAT → portale nazionale, senza contare tre presentazioni dello stesso dataset come tre risorse independenti.

## 6. Europa: data.europa.eu è un harvester multiprotocollo, e il monitoraggio non è una prova del dato

**D7 — guida dell'harvester europeo:** https://dataeuropa.gitlab.io/data-provider-manual/how-to-publish/request-harvesting/
- Preferisce **DCAT-AP**, ma riceve anche metadata via **OAI-PMH**, **RDF/XML dumps**, **SPARQL**, e la guida descrive CKAN API e servizi geospaziali CSW/INSPIRE. Questo è un esempio reale di soluzione **multicanale già esistente**: non rivendicare universal harvesting come novità in sé.
- Portale pubblico documenta Search, SPARQL, Registry e MQA APIs: https://data.europa.eu/en/faq ; la pagina di documentazione di Search `https://data.europa.eu/api/hub/search/` è stata consultata ma non è stato eseguito un search API live.
- **Metadata Quality Assessment (MQA)** https://data.europa.eu/mqa/methodology?locale=e : controlla completezza dei campi metadata, conformità, formato e in alcuni casi accessibilità URL via HEAD/HTTP. La **metodologia stessa** dichiara di NON misurare la correttezza intrinseca, completezza, legalità o veridicità dei dataset collegati.
- La metodologia MQA corrente separa la validazione SHACL di DCAT-AP dal proprio **punteggio MQA**; non fondere score di framework differenti.
- **Open Data Maturity 2025** https://data.europa.eu/en/open-data-maturity/2025 fornisce punteggi istituzionali (per es. *EU average* **86,0** e indicatore *DCAT-AP compliance* **86,6** nel proprio modello 2025). **Questi sono punteggi di maturità, NON la percentuale dei dataset che restituiscono file validi, né una misura di recall della rete.** I metodi e periodi delle valutazioni non sono intercambiabili.
- **H6:** costruire solo in un futuro studio controllato un *conformance funnel*: catalogued → field-shape-valid → access URL works → actual bytes reachable → parse usable → authorized reuse; **non** usare MQA come punteggio di completezza del contenuto.

## 7. FAIR Signposting: supporto dichiarato su più software, non penetrazione misurata

**A1 — elenco pubblico di implementazioni:** https://signposting.org/adopters/ ; profilo https://signposting.org/FAIR/
- Elenca casi concreti e software: Dataverse 5.14+, DSpace 7, Digital Repository Ireland, DANS Data Stations, InvenioRDM, HAL, figshare, Dryad, CKAN extension ecc.
- Questo mostra **che l'adozione non è puramente teorica**; è una directory a partecipazione/dichiarazione, **non un censimento indipendente della totalità dei repository né una verifica che tutte le installazioni siano conformi o espongano il medesimo livello**.
- **H7:** su campione motivato, verificare presenza di HTTP `Link` e `linkset`, formati, DOI/metadati/file reachable, senza presumere che tutte le istanze Dataverse/DSpace attivino gli stessi segnali o diritti.

## 8. Matrice del campione: dichiarazioni D, osservazioni R e blocchi U

**Selezione intenzionale, non random, non rappresentativa. I produttori scelti sono esempi di interfacce, non un insieme statistico omogeneo.**

| Publisher/servizio | Famiglia | Evidenza diretta | Cosa sappiamo | Cosa NON è provato |
|---|---|---|---|---|
| Copernicus vecchio STAC | STAC 1.0.0 | **R1**, JSON root letto 2026-11-02 | Catalog e link alle capacità pubblicati | Asset recall, query, uptime e equivalenza |
| Copernicus nuovo STAC | STAC 1.1.0 | **R2**, JSON root letto 2026-11-02 | Catalog e link alle capacità pubblicati, nuova migrazione ufficiale | Ogni conformance class realmente soddisfatta |
| Rijksmuseum | IIIF / OAI / LDES | **D1–D3**, **U1** | Documentazione ufficiale completa; limiti di retention espliciti | Contenuto `application/ld+json` parsato live |
| Zenodo | OAI-PMH | **D4**, **U2** | Base endpoint e licenze dichiarati | Risposta XML validata nel visualizzatore |
| Data.gov.uk | CKAN | **D5**, **U3** | Directory API con omissione curated collections | Risposta API live per esempio fish |
| RNDT Italia | REST / GeoDCAT | **D6** | Metadati territoriali trasformati da ISO 19139 e condivisi | Conformità campo-per-campo e accesso asset |
| data.europa.eu | DCAT/AP + harvester | **D7** | Harvest multiprotocollo, MQA e servizi search/SPARQL | Qualità del contenuto e copertura degli archivi |
| Signposting adopter registry | FAIR Signposting | **A1** | Implementazioni registrate di software e istituzioni | Quota di adozione globale, uptime, correttezza |

**Contabilità rigorosa:** 8 righe ma **7 righe di servizi/publisher/registry non indipendenti come universo di studio**, con **2 risposte JSON STAC lette** provenienti dal **medesimo publisher**. L'unico numero direttamente osservato qui è due root JSON; non si ricava una percentuale di adozione o successo. Le U sono limiti del nostro visualizzatore e non HTTP 403. Nessun test completo dei protocolli, nessun benchmark eseguito.

## 9. Cinque differenze che incidono sulla futura ricerca più della popolarità dello standard

1. **Versione e migrazione operative:** old/new STAC Copernicus con date e quote aggiornate; lo stesso nome protocollo non garantisce compatibilità o continuità futura.
2. **Implementazione ≠ modello astratto:** LDES Rijksmuseum mantiene `LatestVersionSubset` pur essendo basato su eventi; IIIF Change Discovery può segnalare cambiamenti senza contenuto; OAI cambia la forma EDM.
3. **Catalogo/API ≠ tutto il portale:** UK CKAN non include curated collections; Rijksmuseum OAI solo collezione, non biblioteca/archivio; RNDT GeoDCAT solo dataset secondo il perimetro della trasformazione.
4. **Metadata quality ≠ data quality:** EU MQA dichiara esplicitamente limiti intrinseci; percentuale di campi popolati o HEAD 2xx non conferma tutti i file reali.
5. **Multi-canale ≠ multi-origine:** Copernicus STAC e OData, Rijksmuseum OAI/LDES/IIIF, RNDT ISO/GeoDCAT/data.gov sono più viste di contesti condivisi; il conteggio di evidenze indipendenti non aumenta automaticamente.

## 10. Prossime ipotesi scientifiche — da ricercare, non da sviluppare

### H8 — Protocol Reality-Check rubric
Studiare una rubrica comparabile senza punteggio unica: `docs`, `root`, `declared conformance`, `read-only sample`, `pagination`, `delta/tombstone`, `retention`, `asset access`, `format fidelity`, `rights`, `change notices`. Lo stato deve poter essere **unknown/tool unsupported** e non attribuire falsi fallimenti.

### H9 — Migrazione e resilienza al protocol drift
Testbed sintetico modellato su Copernicus con due endpoint STAC, versioni differenti, annuncio sunset, quote e queryables mutati. Verificare che il routing automatico *non* presupponga interoperabilità perfetta dal nome di protocollo; monitorare advisories e condizioni legali. Nessun controllo reale stressante su API di terzi.

### H10 — Semantic crosswalk loss
RNDT `ISO19139 → GeoDCAT`, Rijksmuseum `EDM XML→graph`, EU `DCAT harvesting`: confronti futuri della perdita semantica in conversone di metadati e degli asset/diritti a valle. Un file `RDF/XML` parsabile non dimostra equivalenza informativa.

### H11 — Evidence and bias-aware sample expansion
Per capire **quanto** l'adozione sia diffusa servirà un **frame di campionamento**: portali per Paese/settore/software, selezione esplicita inclusi sistemi non compatibili, data di osservazione, parità di richieste e limiti. La selezione attuale è volutamente di casi **noti come adopter** ed è condizionata dal risultato. Evitare di stimare da questo campione frequenze o capacità generalizzate.

### H12 — Freshness and loss
Il valore di una sincronizzazione si vede soprattutto quando si verifica un cambiamento: Rijksmuseum latest-only, UK API con subset, Copernicus transition. Futuri test controllati con un dataset di ground truth versionato e update/delete, non la sola capacità di produrre JSON.

## 11. Conclusioni e stato

La ricerca ha verificato **adozione istituzionale realmente documentata** di DCAT/AP, CKAN, STAC, OAI-PMH, IIIF Change Discovery, LDES/TREE e Signposting, e ha **letto direttamente due radici STAC JSON** dello stesso publisher in parallelo durante un passaggio operativo del 2026. Ha anche trovato importanti limiti che cambiano la progettazione futura: **sunset e quote per endpoint, API con sottoinsiemi esclusi, stream con retention latest-only, metadata qualità diversa dalla qualità dei dati, differenze di diritto per risorsa**.

**Non abbiamo:** eseguito crawl o benchmarking di f3tcher, validato end-to-end API oltre le due root STAC, scaricato dataset, provato percentuali di adozione, calcolato la copertura degli asset, valutato licenze per ogni file o definito uno stack. La fase resta esplorativa.

**Prossima ricerca ad alto rendimento:** audit documentale delle differenze fra pubblicazioni reali e protocolli teorici su *più esempi fuori dal gruppo di adottanti*, metodologia di campionamento, migrazioni/versioni, incompletezza di cataloghi e costo di parsare realmente i formati; poi valutare se le evidenze raccolte sono sufficienti per chiudere la ricerca bibliografica con consenso dell'utente, **senza** implementare in automatico.
