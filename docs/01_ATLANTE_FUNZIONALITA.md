# 01 — Atlante delle capacità esplorate (non specifiche definitive)

**Stato 2026-11-01:** inventario delle idee emerse. Tutte le voci sono **potenziali**. Non è una lista di funzionalità implementate o un obbligo di usare sempre ogni algoritmo. **Un unico motore, niente profili selezionabili**; routing automatico di metodi secondo il caso e nel rispetto delle policy.

## A. Discovery: trovare risorse che il crawler classico non vede
- Crawling per link, sitemaps e sitemap index, link HTTP RFC 8288, RSS/Atom, feed, ricerche e paginazioni.
- **Source Capability Discovery:** riconoscere automaticamente protocolli e interfacce pubblicate: link `service-desc`, `service-doc`, OpenAPI/GraphQL documentati, OAI-PMH, CKAN, DCAT 3, DataCite, Crossref, OpenAlex, SPARQL, RDF/JSON-LD, Microdata, IIIF e OGC/STAC.
- **Ricerca interna dei siti / query-based hidden web:** interpretare moduli accessibili, filtri, calendario, paginazione e indici aperti; verificare l'inventario con conteggi e interrogazioni disgiunte, evitando combinazioni esplosive e operazioni non autorizzate.
- Metaricerca e discovery federata via motori e cataloghi che ne consentono l'uso; *non* assumere disponibilità di un indice completo di Internet.
- Link nei PDF/allegati, riferimenti bibliografici, identificativi e citazioni → nuove piste; **Web–Knowledge–Web** e grafo delle relazioni.
- Storico: Wayback/Memento quando disponibili, Common Crawl (CDXJ, URL Index Parquet, WARC), dataset e snapshot aperti, reverse discovery da collezioni, archivi istituzionali.
- **Copertura dei siti poco connessi:** campionamento esplorativo ed esplicita quota di attenzione a fonti rare, per evitare bias verso siti centrali/populari.
- Scoperta di media, file e asset: URL di documenti, sottotitoli, trascrizioni, immagini e metadati quando disponibili e utilizzabili.
- **Distinguere** URL scoperto, risorsa accessibile, recuperata, verificata, strutturata e riutilizzabile.

## B. Acquisizione web/browser
- HTTP diretto, conditional requests (ETag/If-None-Match, Last-Modified/If-Modified-Since), range requests, gestione MIME/charset, redirect, HTTP caching e controllo della qualità dei body.
- Browser reali controllati (Playwright o equivalenti), rendering JavaScript, scroll infinito, paginazione, click e form consentiti, osservazione del traffico di navigazione; **non** accesso a endpoint privati o elusione di autenticazioni e barriere.
- Riconoscere XHR/fetch/WebSocket e risorse caricate durante normale navigazione; valutare l'uso degli endpoint **solo se autorizzato**.
- Retry e circuit breakers per guasti transitori; gestione 429 e Retry-After; 403 = stop della via negata, registrazione, analisi di alternative lecite; 401 solo credenziali proprie/autorizzate.
- Rate/concurrency per host, protezione della disponibilità della fonte, limiti di profondità derivanti da utilità e permessi, non profili di potenza.
- Riconoscimento di crawler traps: URL parametrici combinatori, calendari infiniti, session IDs, faceted navigation, duplicati e near-duplicati; non tagliare arbitrariamente risorse uniche.

## C. Acquisizione su più protocolli e sistemi digitali
- REST, GraphQL, JSON/XML/CSV, download bulk, SQL/Parquet remoto quando l'accesso parziale è supportato; uso di range/pruning per evitare download integrali.
- Protocollo di raccolta metadata OAI-PMH (checkpoint e overlap temporali, backfill `earliestDatestamp`), OpenSearch, CKAN, DCAT, SPARQL, JSON-LD.
- Flussi di aggiornamento: ResourceSync, LDES, IIIF Change Discovery, WebSub, SSE/WebSocket pubblici, eventi Wikimedia, AT Protocol firehose, delta-token in provider autorizzati.
- Geospaziale/scientifico: STAC, OGC API Records, IIIF, cataloghi scientifici, dataset satellitari e patrimoniali.
- Repository di codice tramite API ufficiali, versioni Git, release, issue e changelog accessibili.
- Audio/video: metadati e tracce disponibili, sottotitoli, trascrizione autorizzata; verificare effettivo download e integrità media.
- Cataloghi di pubblicazioni: OPDS 2.0 e protocolli di biblioteche digitali.
- Adozione di nuovi protocolli tramite **adattatori** e documentazione; non presumere universalità reale.

## D. Estrazione multimodale e specializzata
- Conservare la fonte e i metadati (quando permesso) separatamente dai risultati di parsing.
- HTML: estrazione per CSS/XPath/DOM, main content, liste, forum, prodotti, tabelle, allegati, metadati strutturati. Non scartare commenti e componenti “secondari” quando sono informativi.
- Parser documentali modulari: PDF nativo/scansioni, OCR multilingue, DOCX/XLSX/CSV, immagini, tabelle, formule, layout multi-colonna, audio/video, sottotitoli.
- Motori candidati Docling, MinerU, olmOCR, MarkItDown, Trafilatura; qualità diversa per documenti diversi.
- **Router di estrazione adattivo:** classificazione del formato/struttura, selezione automatica di parser, controllo della qualità, escalation a tecniche più costose se utile.
- AI per elaborare formati sconosciuti e **compilare procedure ripetibili** (es. CSS, DSL, pipeline deterministica); verifica su più campioni, firma/versionamento, rollback e replay.
- Non affidare all'AI azioni incontrollate: input esterno ostile, prompt injection e allucinazioni.

## E. Qualità, completezza e statistica della copertura
- Registrare quattro dimensioni distinte: **risorse scoperte, risorse acquisite, dati estratti, dati verificati**; sempre definire il denominatore.
- Distinguere duplicato tecnico (stesso byte), near-duplicato (testo), nuova versione dello stesso documento e **fonti indipendenti che riportano lo stesso evento**.
- Hash, identificativi canonici, schema validation, righe/tabelle attese, riferimenti, validità URL e dei file, struttura dei risultati.
- Metamorphic/differential testing: confronti condizionati a equivalenza tra conteggi per anno/mese, sitemaps/API/form, inventari e risultati su più percorsi. La discrepanza è un segnale, non la prova che una versione sia giusta.
- **Silent failure detection:** HTTP 200 ma login wall/HTML vuoto/errore applicativo, diminuzione del numero di allegati, drift DOM o dei campi, dati parziali, schema drift e anomalia dei volumi.
- Copertura storica: periodi mancanti, lacune di identificativi e risorse scoperte in acquisizioni successive.
- Stima della parte non osservata: set intersections longitudinali, capture–recapture, Good–Turing e Chao solo quando rispettate le ipotesi; distinguere la *mass coverage* dalla percentuale di URL. Intervalli di confidenza o "non stimabile".
- **Missingness Intelligence:** lacune per fonte/categoria/formato/periodo e probabilità di campionamento non casuale; rendere evidente il bias derivante da fonti inaccessibili.
- Contraddizioni fra fonti e verifica puntuale di estrazioni; preferire controlli deterministici quando possibili.
- Provenienza e traceability a livello di valore: versione del documento, sezione, pagina/cella, testo circostante (W3C Web Annotation), affidabilità e modalità di derivazione.

## F. Pianificazione/adattamento
- **URL frontier distribuita** con code persistenti, priorità, deduplica, claim/lease, scadenze e controllo host; ripresa coerente dopo incidenti.
- Focused crawling e algoritmi di selezione URL: classificatori di percorsi, bandit/sleeping bandits, uncertainty/information gain, host-level sampling; esplorazione vs sfruttamento.
- Priorità guidate da segnali esterni e novità attesa, **non** solo da PageRank o centralità (altrimenti si ignorano fonti rare).
- Crawl budget inteso come vincoli di risorse e politeness, non semplice massimizzazione dei download.
- Adaptive refresh: frequenza osservata delle modifiche, indicazioni sitemap `lastmod`, eventi e altri segnali rumorosi; verifica della loro affidabilità per fonte.
- Compensazione errori: overlap negli intervalli temporali, resumption token, riconciliazione dopo scadenza dei delta token, backfill storico.
- Memoria delle strategie: risultati positivi/negativi, apprendimenti trasferibili solo dopo verifica. La memoria può peggiorare costi/prestazioni: testare ablation.

## G. Archivi, versioni e condivisione
- Archivio di oggetti e contenuti acquisiti (solo nei termini consentiti), WARC/WACZ, snapshot, replay offline (pywb), contenuti indicizzati per hash.
- Bitemporalità: data/evento dichiarato, osservazione, acquisizione e registrazione nel sistema; gestione di modifiche e cancellazioni.
- Cache tra progetti con isolation di licenze, dati personali, accessi e segreti: deduplica e disaccoppiamento dal consumer, **senza** condividere dati riservati fra utenze.
- Lineage OpenLineage/PROV-O: dal raw alla versione dell'estrattore fino al record derivato.
- Interfacce API/SDK/webhook/eventi ed eventuale MCP per consumer futuri; nessun consumer o dashboard è definito.
- Privacy by design, retention limitata e soppressione/cancellazione ove dovute.

## H. Resilienza, sicurezza e operatività
- Exactly-once come **effetto idempotente** sullo storage (non promessa di una sola richiesta in rete), outbox/event log, retry limitati, checkpoint transazionali, backpressure, DLQ, metriche e allarmi.
- Esecutori isolati, limiti CPU/memoria/rete, protezione SSRF e DNS rebinding, block reti interne/metadata services, gestione credenziali e audit.
- Limiti di frequenza e 429; policy di accesso che può essere riesaminata in caso di modifiche autentiche, non bypass automatico.
- Prompt injection defenses: HTML/PDF/JS e contenuti web sono **dati non fidati**, non istruzioni per l'agente.
- Test su fonti reali autorizzate e testbed controllati; confronto con baseline commerciali e open source.

## I. Idee di differenziazione da indagare (ipotesi, non promesse)
1. **Source Digital Twin / Source Capability Graph**: modello persistente delle interfacce e della struttura del sito.
2. **Acquisition Intelligence**: motore che sceglie la prossima acquisizione in funzione di novità, copertura, incertezza, costo e policy.
3. **Coverage & Missingness Intelligence**: distingue ciò che manca, ciò che non si può sapere e perché.
4. **Replay/Compilation**: apprende e compila procedure da fonti sconosciute, le prova offline e ne misura la stabilità.
5. **Evidence-first acquisition**: il dato è accompagnato da percorso di verifica; non confondere citazione/link e prova valida.
6. **Protocol-native acquisition**: interrogare sorgenti nelle forme più efficienti disponibili, anziché sempre simulare un browser.
7. **Self-improving but test-driven**: niente "AI che si migliora" senza benchmark, ablation e regression test.

**Priorità nella ricerca:** indagare soprattutto capacità che aumentano *documenti e dati corretti recuperati* o riducono omissioni; non inseguire novità esclusivamente estetiche.

## J. Nuova ricognizione verificata (2026-11-01): estensioni da studiare, non requisiti

Vedi [07_RICOGNIZIONE_2026-11-01.md](07_RICOGNIZIONE_2026-11-01.md) per fonti, caveat ed esperimenti:

- **Procedure API pubblicate:** riconoscere Arazzo (workflow con dipendenze e criteri di riuscita), non solo OpenAPI/AsyncAPI; ogni operazione resta soggetta ad autorizzazione, sandbox e limitazione degli effetti.
- **Discovery tipizzata:** seguire Linkset RFC 9264 e FAIR Signposting per collegare landing page, file, licenza, metadata e identificatori; attenzione a collegamenti di terzi e disponibilità reale.
- **Replica riconciliabile:** studiare semantica OData Delta per tombstone, cursori scaduti e verifica dello stato finale; non attribuire garanzie di consistenza ai sistemi che non le offrono.
- **Diritti leggibili da macchina:** ODRL come *input* di un registro allow/deny/review, senza inferenze di liceità automatiche da un singolo campo.
- **Obiettivi di acquisizione distinti:** active search di risorse rare e active surveying della prevalenza; valutare compromessi con equità verso fonti periferiche.
- **Fixity/versioni:** BagIt e OCFL come possibili complementi di WARC/WACZ, senza confondere conservazione con diritto di conservare o copertura.

## K. Ricognizione scientifica 09 — limiti delle dichiarazioni di completezza

Vedi [09_COMPLETEZZA_LOCALE_E_PROVE.md](09_COMPLETEZZA_LOCALE_E_PROVE.md). **Ipotesi, non requisiti**: distinguere (1) completezza relativa a una query e un inventario versionato, (2) stima di una popolazione non osservata con ipotesi identificative, (3) completezza temporale/stato corrente vs storico di eventi, (4) omissioni nelle estrazioni di liste e campi, (5) tracciabilità e diritti. Non inferire il 100% della realtà da un inventario ufficiale o da uno schema valido; watermark locali non sono garanzia assoluta di assenza di eventi tardivi. Studiare dichiarazioni limitate, verificabili e falsificabili di completezza, con esito **non stimabile/ignoto** quando mancano basi adeguate. Per i documenti, validità JSON e correttezza/recall dei campi sono metriche differenti.

## L. Ricognizione 10: capacità e garanzie della fonte (piste, non requisiti)

Vedi [10_INVENTARI_E_GARANZIE.md](10_INVENTARI_E_GARANZIE.md). Ipotesi di studio:
- Fonte pubblica con manifest ed esito di esportazione, conteggio approssimativo, finestra delta, DOI citabile e inventario validabile sono **classi di evidenza differenti**.
- Riconoscere la differenza fra disponibilità dei dati, durata dei token/delta, disponibilità dei bytes e versioni conservate: recupero da gap **possibile, solo full-snapshot, impossibile o non noto**.
- Valutare recupero di delete da OAI-PMH `no/transient/persistent`; nessuna promessa di cronologia completa quando mancano i tombstone.
- Integrità degli artefatti rispetto a manifest `!=` veridicità del manifest o completezza dell'universo di documenti.
- Studiare «evidence aging»: dichiarazioni di completezza con identità di fonte/versione/tempo, non certificati eterni.
- Prove di inclusione e consistenza di Merkle log (RFC 9162) `!=` prova di non esistenza di record fuori dal log.
Nessun profilo selezionabile e nessuno stack deciso.
