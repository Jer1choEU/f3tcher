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

## M. Ricognizione 11 — dipendenza delle evidenze e autenticità, senza decisioni architetturali

Dettagli: [11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md](11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md). **Piste non implementate**:
- Distinguere fonte originaria, ripubblicazione, mirror, aggregatore, copia transitiva, co-copia e osservazione autonoma per *specifica affermazione/versione* (non assegnare un'etichetta definitiva a un intero dominio).
- Conservare anche le fonti dipendenti: deduplicare i bytes non significa eliminare la traccia delle ripubblicazioni e delle eventuali aggiunte originali.
- PROV-O / lineage per affermazioni e valori derivati; validità del grafo non equivale a verità della fonte.
- Distinguere garanzie: hash integrità, firma autenticità, TUF version/freshness, transparency checkpoint consistency, COSE inclusion/non-inclusion in uno specifico insieme, e corroborazione fattuale indipendente.
- Una proof-of-non-inclusion non dimostra assenza nel mondo; una firma valida su manifest incompleto non dimostra che il publisher abbia elencato tutto.
- Ipotesi di *dependency-aware evidence accounting*: confrontare qualità/costi con conteggio URL e semplice near-dup; non imporre uno score unico né agenti di «verità» auto-certificata.

## N. Ricognizione 12 — genealogia fonte, versione e affermazione (piste)

Vedi [12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md](12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md). **Non requisiti**:
- Separare somiglianza/near-duplicate, riutilizzo di passaggi, revisione dello stesso articolo, citazione dichiarata, dipendenza causale dimostrata, conferma fattuale indipendente e licenza.
- Conservare le aggiunte originali nei documenti **parzialmente derivati**; un dominio non è «copiatore» per tutti i fatti.
- Ragionare su **multiple upstream sources** (PAN 2026), non solo coppie; non inventare antenati non osservati.
- Usare hard negatives con stesso argomento ma fatti decisivi mancanti (FakeWiki) per verificare se una fonte *supporta* un claim.
- **Astensione motivata** sulla genealogia quando i dati non discriminano tra copia diretta, fonte comune ignota e indipendenza.
- Registrare lineage temporale/versioni (NewsEdits) senza moltiplicare artificialmente fonti autonome.
- Considerare la derivazione anche come rischio di **licence laundering**: verifica origine/condizioni e separazione accesso, conservazione, elaborazione, distribuzione.
Nessun algoritmo o formato scelto, nessun benchmark eseguito.

## O. Ricognizione 13 — sorgenti possibili e indagine attiva della provenienza (ipotesi)

Vedi [13_DIFFUSIONE_IDENTIFICABILITA_E_ASTENSIONE.md](13_DIFFUSIONE_IDENTIFICABILITA_E_ASTENSIONE.md). Nessun requisito adottato:
- Misurare *diffusione* da cluster di frasi, hyperlink e timestamp (MemeTracker/NETINF); **non** trattare grafo di archi inferiti da un algoritmo come ground truth reale.
- Modelli di origini multiple/alternative: fonte diretta, fonte comune ignota, catena parziale, stessa notizia indipendente.
- Conservare un **insieme di candidati compatibili** dove appropriato; astensione quando l'originale non è osservato o la direzione è indecidibile.
- Considerare *risk-coverage* e calibrazione, verificando ipotesi e drift: le garanzie conformal non sono trasferibili automaticamente alla rete Web.
- **Active provenance investigation (H):** cercare la prossima prova lecita che discrimini fra genealogie, rispetto a puro crawling per volume; attenzione a fonti rare, costi e feedback loops.
- Considerare timestamp falsi/retrodatati, ritardi di indicizzazione, revisioni e intermediari mancanti, come variabili del test e non rumore da ignorare.

## P. Ricognizione 14 — valore probatorio della prossima acquisizione (ipotesi)

Vedi [14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md](14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md). Idee **non approvate**:
- Distinguere acquisto della prossima prova **rilevante**, **nuova**, **indipendente**, **disambiguante**, **lecita** e **a costo giustificato**: non sono sinonimi né necessariamente un punteggio unico.
- Ricerca iterativa con STOP (FIRE), decisioni sequenziali cost-aware (AFA/POMDP), *expected information gain*, considerare informazioni complementari (lookahead) quando myopic fallisce.
- Studiare il rischio che un *prior errato* faccia convergere più rapidamente verso la genealogia sbagliata; includere verifiche **falsificanti** e upstream assenti.
- Non dichiarare automaticamente garanzie greedy (adaptive submodularity), conformal (selection-induced shift) né causalità comprovata dall'aumento di confidenza.
- Una politica che sceglie cosa esplorare cambia ciò che è osservato: il benchmark deve tenere conto dei **controfattuali mancanti/off-policy support**, non valutare soltanto i successi passati.
- Baseline pratiche da confrontare: k fisso, ranking semantico, diversità, random lecito, FIRE-like, EIG myopic/lookahead, senza dichiarare già vincente una strategia.

## Q. Ricognizione 15 — acquisizione universale prima di scraping generico

Vedi [15_ACQUISIZIONE_UNIVERSALE_PROTOCOLLI_E_CRAWLER.md](15_ACQUISIZIONE_UNIVERSALE_PROTOCOLLI_E_CRAWLER.md). **Ipotesi, non specifica approvata**:
- Scoprire dataset, distribuzioni, asset, servizi e versioni da **cataloghi machine-readable dichiarati**: DCAT/DCAT-AP, STAC, OGC, CKAN, IIIF.
- Distinguere **notifications/push** (WebSub) e inventario completo: un evento push non dimostra che non ci siano gap.
- Capire quando una pagina **HTTP statica/SSR** è sufficiente, quando serve browser interattivo e quando un dato va recuperato via API pubblicata; non rendere il browser obbligatorio e non introdurre profili selezionabili.
- Riconciliare più vie **in parallelo concettuale**: dataset landing page, CSV/XLS, IIIF manifest, feed, archivi, metadati RDF; conteggiare *asset unici verificati*, non URL.
- Non confondere doc scaricato, doc processato e estrazione completa di tabelle, pagine, formule e media.
- Studiare *LLM expensive setup → deterministic repeated harvest* senza rivendicarne l'invenzione; confronto con baseline semplici e failure silenziose quando cambia sito.
- Crawler streaming/distribuiti e polite rate limiting: throughput vincolato dal publisher prima ancora che dal calcolo; monitorare l'eventuale starvation delle fonti rare.
- Usare ambienti sintetici/verificabili per test futuri, mai probing invasivo di sorgenti reali.

## R. Ricognizione 16 — acquisizione specialistica (solo capacità da indagare)

[Dettagli e fonti primarie](16_ACQUISIZIONE_SPECIALISTICA_RICERCA_LEGGI_STATISTICHE_FEDERAZIONE.md).
- Ricerca scientifica: distinguere metadata, OA full text e allegati; identificatori DOI e arXiv-id non garantiscono le versioni/byte; cursor e bulk per oltre 10.000 risultati OpenAIRE.
- Diritto: originale vs vigente/multivigente, fonte ufficiale vs redazionale, lingue e manifestazioni dei documenti UE, feed di novità vs archivio dell'atto; preservarli senza collassi.
- Statistiche: dataflow + DSD + codelists + unità + flag + observation vintage; Eurostat **non mantiene la history dei valori delle API**; rispettare quota Istat (5 query/min/IP).
- Federazione: outbox ActivityPub pubbliche secondo ACL, ATProto CAR/firehose ma media blob distinti; gap rilevabili vs interi repo invisibili per filtraggio.
- Formati: non trattare CSV/JSON come unità semantiche autosufficienti; usare descrizioni Data Package/Formex/Akoma Ntoso/SDMX quando disponibili e lecite.
- Eventuale sistema unico seleziona strategie in modo interno, ma **nessun profilo/architettura/algoritmo deciso**.

## S. Ricognizione 17 — oggetti digitali composti, non solo pagine

[Fonti e ipotesi](17_BREVETTI_BIOLOGIA_AUDIOVISIVI_CONSERVAZIONE.md). **Possibili capacità future da valutare**, non requisiti:
- EPO brevetti: identità pubblicazione vs famiglia, bibliografici vs full text, TIFF/PDF/A e condizioni REST/bulk con quote.
- ENA/NCBI: accessioni e metadati vs sequenze/file FASTQ/FASTA/assemblaggi; quote diverse anche all'interno dello stesso ente.
- Europeana: metadata CC0 != media open; IIIF, licenze per asset e file master/derivati, annotazioni.
- EBUCore/WebVTT: programma/track/segment/timecode, senza confondere testo sottotitoli con intera informazione audiovisiva.
- METS fileSec/structMap, PREMIS preservation events e diritti, E-ARK CSIP/SIP/AIP/DIP, BagIt complete vs valid; enumerare, verificare, registrare perimetro/diritti.
- **Manifest safety**: fetch.txt e collegamenti nei cataloghi possono contenere URL/path ostili, non eseguire recuperi da network interni o fuori policy.
- Non sommare come fonti indipendenti versioni/formati dello stesso documento. Non presumere dati conservati == dati distribuiti.

## T. Sintesi comparativa 18 — cosa conta e quali sovrapposizioni evitare (ricerca)

Vedi [18_SINTESI_COMPARATIVA_E_LACUNE.md](18_SINTESI_COMPARATIVA_E_LACUNE.md). Il valore del futuro motore non è incorporare senza criterio tutti i crawler, tutte le API e tutti gli LLM: l'eventuale miglioramento andrà verificato rispetto alle baseline su **scoperta di asset unici, recupero di versioni/componenti, correttezza d'estrazione, sincronizzazione, costo, rare-source coverage, false completeness, rispetto diritti/politeness**. Priorità di studio **non approvate**: (1) quando usare API/bulk/catalogo/HTML/browser/archivio, (2) aggiunta marginale di ogni canale rispetto agli altri, (3) casi multi-file e semantica di campo/versione, (4) consistenza sotto mutazioni e quote, (5) benchmark trasversali con ground truth, (6) adozione reale e licenze. Usare score separati e astensione se manca il denominatore. Non disegnare oggi moduli o API f3tcher; un sistema senza profili selezionabili resta l'unico vincolo d'interfaccia.

## U. Ricognizione 19 — la compatibilità dei protocolli è una proprietà osservata/versionata

[Fonti e limiti nel documento 19](19_ADOZIONE_REALE_E_COMPATIBILITA_PORTALI.md). Ipotesi, non requisiti: riconoscere un endpoint con la **versione** e le classi di conformità dichiarate (Copernicus STAC 1.0.0→1.1.0, migrazione); trattare **quote/annunci decommissioning** come condizioni variabili del provider; non assumere che la stessa versione risponda agli stessi field/queryables. Riesaminare **versioning degli schemi metadata** (Rijksmuseum EDM XML 2026), **retention degli stream** (Rijksmuseum LDES latest-only), **subset esclusi dall'API** (data.gov.uk curated collections, Rijksmuseum bibliografico vs museale) e **mapping fra viste** (RNDT ISO19139→GeoDCAT→dati.gov.it). La capacità del protocollo ≠ garanzia del provider; l'esito di verifica deve distinguere **R risposta osservata**, **D documentato**, **A adottante dichiarato** e **U non verificabile con il tool**, senza percentuali di adozione inventate. Sono piste di ricerca, nessun algoritmo/router/stack deciso.

## V. Ricognizione 20 — senza API documentata: stati, moduli, liste e astensione

[Fonti e limiti della ricognizione 20](20_SORGENTI_DIFFICILI_MODULI_STATI_E_OMISSIONI.md). Solo **piste di ricerca**, non requisiti:
- Riconoscere che una URL può rappresentare *molti stati* di una SPA e che una scheda/iter istituzionale può puntare a più versioni, documenti e allegati.
- Non dedurre «nessuna API esistente» da un portale che espone ricerca form/UI; cercare solo canali dichiarati e leciti, non inventare endpoint.
- Confrontare query-based harvesting di moduli autorizzati vs URL/sitemap/archivi, con limiti rate e *sampling bias*, evitando enumeration combinatoria invasiva.
- Distinguerne gli esiti: HTTP 200 + vuoto, soft404, elenco solo parziale, lista virtualizzata, pulsante load more, scrolling timeout, search no-hits, blocco/403; **non** successo generico.
- Evitare sinonimia di **readiness di rete**, **stato stabile del DOM**, **ultimo elemento caricato**, **fine dell'elenco**, **completezza del dataset**.
- Layout semantico e script/selector drift: WebLists/SCRIBES già studiano *LLM setup + deterministic reuse*, va misurato record/field recall e costo, non solo output JSON valido.
- Identità di record vs canonical SEO: versioni/parametri e resource graph non collassabili ciecamente.
- Studi futuri solo su testbed autorizzato e con gold inventory, indipendenza delle fonti e registrazione diritti; nessuna configurazione o tecnologia adottata.

## W. Ricognizione 21 — efficienza verificabile, tre vincoli indipendenti

Vedi [21_SCALABILITA_COSTI_E_ACQUISIZIONE_EFFICIENTE.md](21_SCALABILITA_COSTI_E_ACQUISIZIONE_EFFICIENTE.md). **Piste non approvate**:
- Separare capacità lecita della **fonte** (quota/robots/Retry-After/403), risorse lato **crawler/cloud** (CPU/RAM/concorrenza browser/costi), e guadagno **informativo** (asset nuovi/verificati/versioni/perdita).
- HTTP 304 / ETag / Vary / conditional requests e Range/206 quando la fonte supporta: evita byte, ma `304 HTML` non prova invariabilità di dati JS collegati, `206` non è file completo.
- Throttling per host/domain/IP (StormCrawler) e per latenza (Scrapy) vs autoscaling client (Crawlee) **sono capacità diverse**, ciascuna già esistente; nessun incremento parallelo per aggirare provider limits.
- Revisit adattivo e controllo freshness, **mai** inferire storico completo o assenza di eventi persi da immutabilità apparente di una pagina.
- Browser on demand vs browser-first e costo per **asset valido e realmente distinto**; quote cloud Browser Run ottobre 2026 sono separate dai permessi del sito.
- Potenziale confronto `archive-first` Common Crawl/bulk vs live HTTP/API, con staleness, diritti e coverage caveat.
- Long-tail fairness e condivisione cross-project di copie solo nel rispetto di permessi/retention/privacy.

## X. Ricognizione 22 — decisione sul canale e validazione separata

[Documento 22](22_ROUTING_ADATTIVO_SCELTA_METODO_E_VALIDAZIONE.md). Piste **non approvate**:
- La scelta fra HTTP/browser è **già** automatizzata in Crawlee 3.x con detection/campioni e checker; differenziarsi solo sul rendering non sarebbe difendibile.
- Separare concettualmente **source capability**, scelta canale fra API/catalog/archivi/HTTP/browser, ranking della frontier, parsing, refresh, validazione, astensione. Sono problemi distinti, non un «agente intelligente» unico già specificato.
- Controllo fonte-scoped: HTTP e browser possono condividere la stessa omissione e sembrare equivalenti; necessarie evidenze esterne/denominatore quando disponibile, altrimenti «unknown».
- Confrontare regole trasparenti, multi-route e bandit rispetto a AI; misurare *asset/record recall, tail coverage, false success, costo*, non score di task agent o qualità LLM.
- Eseguire un checker che distingue zero risultati validi da shell non renderizzata e un blocco da bisogno di browser; una negazione **non** deve far partire workaround.
- Non trasformare documenti/HTML/JSON in istruzioni agenti; prompt injection è rischio dimostrato in benchmark WASP/TRAP, vincoli di sicurezza prevalgono.
- Doppio tentativo/ritentativo può avere side effect; il rollback di storage Crawlee v4 RC non garantisce idempotenza di operazioni esterne.
