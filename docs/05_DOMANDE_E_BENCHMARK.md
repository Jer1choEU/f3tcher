# 05 — Domande aperte, ricerca sperimentale e benchmarking

**Non esistono benchmark f3tcher eseguiti al 2026-11-02.** Questo documento conserva il piano **ipotetico** di verifica: nessun criterio è ancora approvato come gate di rilascio.

## Domande scientifiche fondamentali

1. **Quanto manca?** Stimare risorse non osservate quando il totale è ignoto, combinando set longitudinali, nuove scoperte, conteggi dichiarati, capture-recapture e assunzioni esplicite.
2. **Dove cercare poi?** Guadagno informativo marginale, rilevanza e diversità vs costo, limiti host e incertezza: bandit, campionamento per host, focused crawler, explorer/exploiter.
3. **Quando rifare una richiesta?** Rischio di modifica, periodicità, segnale sitemap/feed/evento (rumoroso) e freschezza del dato.
4. **Quando la raccolta è “riuscita” solo apparentemente?** Schema drift, paginazione tronca, 200 OK con errore applicativo, anomalie di volume e campionamento distorto.
5. **Cosa generalizza fra siti?** Procedure apprese/DSL, selettori adattivi, riuso skill; vantaggio reale vs nuovo ragionamento AI, con prove di ablation.
6. **Come verificare i risultati senza gold standard?** Differential/metamorphic testing fra interfacce, invarianti per finestre temporali, validazione di file e inventari.
7. **Quale estrattore scegliere?** Errori per categoria (articoli ≠ forum ≠ liste ≠ PDF tabellari ≠ audio), multi-parser, escalation basata su qualità.
8. **Quanto costa?** Qualità informativa per richiesta, secondo, GB, token, RAM, euro; throughput non sufficiente.
9. **Cosa succede se la fonte non è disponibile o negata?** Non aggirare; trovare canali alternativi leciti; misurare copertura e bias residuo.
10. **Come dimostrare la provenienza?** Documento versione/offset/pagina/cella + hash e lineage, stabilità della citazione a revisione successiva.

## Metriche: definizioni preliminari

| Metrica | Definizione e avvertenza |
|---|---|
| URL discovered | URL unici individuati, non dati acquisiti |
| Accessible fraction | Quote con accesso consentito e riuscito; denominatore esplicito |
| Acquisition success | Risorse che hanno bytes/record integri e coerenti, non solo HTTP 200 |
| Target recall | `target trovati / target realmente esistenti` **solo con gold inventory** |
| Known-resource coverage | `risorse acquisite / risorse note`, distinta dalla stima del totale |
| Estimated total coverage | Stima statistica con ipotesi, intervalli e limiti; “non stimabile” se le condizioni non reggono |
| Field recall/precision | Per campi di riferimento annotati e con assenze riconosciute |
| New information yield | Record nuovi, validi, non duplicati per 1000 richieste o euro |
| Freshness lag | Ritardo fra pubblicazione/modifica e acquisizione (se date affidabili) |
| Duplication errors | False merges di fonti distinte, duplicati non riconosciuti |
| Evidence completeness | Percentuale di dati verificabili su sorgente/versione, non solo URL |
| Recovery correctness | Job ripresi senza perdite, duplicate writes controllate, queue leases sane |
| Legal/policy incidents | Tentativi di accesso a risorse negate, retention errata, leakage, superamento limiti; target zero |

## Benchmark eterogenei candidati

- **HTML statico**: articoli, pagine index, forum, prodotti, elenchi, tabelle.
- **HTML dinamico**: JS, richieste asynchronous, infinite scroll, moduli di ricerca e faceted navigation.
- **API e cataloghi**: paginazione, cursor, filtering, REST/GraphQL, DCAT/CKAN, OAI-PMH, SPARQL.
- **Documentale**: PDF nativi/scansioni, layout a colonne, OCR, tabelle/formule, DOCX/XLSX/CSV, audio/video sottotitoli.
- **Archivio storico**: intervalli lunghi, backfill, snapshot, pagine cancellate, dataset Parquet remoti.
- **Stream/sync**: feed RSS, ResourceSync, SSE, checkpoint che scadono, eventi duplicati o fuori ordine.
- **Fonti simulanti errori**: 401/403/404/429/5xx, 200 con captcha/login/errore HTML, cambiamenti DOM e dati mancanti.
- **Fonti rare / sbilanciate**: siti poco connessi, piccole collezioni di grande valore, bias di copertura.
- **Distribuzione**: stop/start worker, lease scaduta, ripetizione job, fault injection, DLQ e riconciliazione.

Utilizzare testbed proprio o fonti con permesso, non bypassare difese di siti terzi.

## Baseline da confrontare

Scrapy, Crawlee HTTP/browser, Playwright manual workflows, Crawl4AI, Firecrawl (versione/servizio specificati), Trafilatura, Scrapling, Docling, MinerU, olmOCR, Heritrix, Browsertrix, changedetection.io, dlt/Airbyte e altri pertinenti. Alcuni sono **complementari**, quindi non usare una classifica aggregata artificiale.

Candidati benchmark accademici: WebLists, WANDR, LiveWeb-IE, WebDS, WCXB, PureDocBench/MDPBench (verificare disponibilità di dataset e licenze prima di usarli).

## Esperimenti di attribuzione causale (“ablation”)

- Solo HTTP vs HTTP + browser selettivo.
- Crawling per link vs discovery via API/feed/cataloghi/index.
- Priority FIFO vs bandit/sample-host/coverage-aware.
- Parser unico vs router e controllo indipendente.
- Senza memoria vs skill cache/DSL e replay offline.
- Full recrawl vs delta sync + riconciliazione.
- Dedup hash vs near-dup/entity-aware **senza fondere fonti indipendenti**.
- Retry/queue naive vs checkpoint/lease/outbox + fault injection.

Ogni prova dovrebbe fissare: stesso budget, stessi limiti di host, stessa fonte/periodo, autorizzazioni equivalenti, versioni e seed riproducibili. Documentare costi e incertezza oltre al punteggio.

## Idee da investigare con priorità scientifica, non cronoprogramma

**Alto potenziale**: partial dataset access e catalog discovery; paginazione e moduli pubblici; missingness; delta sync; compilazione di estrattori; source graph; metamorphic checks.

**Richiedono studio importante**: generalizzazione di procedure fra domini; stima totale da popolazioni dinamiche; RL/bandit multi-obiettivo con fairness verso fonti rare; agenti che generano connettori verificati.

**Da evitare come claim**: “copre ogni sito”, “AI non sbaglia”, “100% di completezza”, “nessun costo”, “garanzia legale universale”, “mai visto al mondo”. La ricerca deve identificare e misurare vantaggi reali.

## Prossima ricognizione proposta (senza ancora sviluppare)

1. Raccogliere **fonti primarie** e codice dei lavori con etichetta P in `03_STUDI_E_FONTI.md`.
2. Confrontare sul piano teorico le garanzie e i limiti di stime di copertura: capture-recapture/Good–Turing/set-intersection; core vs shell dinamico.
3. Studiare adattatori che sfruttino documentazione standard/metadata dichiarati, senza probing invasivo.
4. Approfondire costi/prestazioni di classificatori leggeri vs LLM, compresi scenari in cui memoria e agenti **peggiorano** risultati.
5. Preparare **solo se l'utente cambia fase** una matrice di test e una proposta architetturale non vincolante, prima del codice.

## Note su maturità

- “Standard pubblicato” ≠ ogni sito lo adotta.
- “Ricerca peer-reviewed” ≠ risultato universale.
- “Benchmark forte” ≠ deployment sicuro o legale.
- “Più dati” ≠ “più conoscenza”: valutare rilevanza, bias, proof e freshness.

## Integrazione di ipotesi dalla ricognizione del 2026-11-01

La [ricognizione 07](07_RICOGNIZIONE_2026-11-01.md) descrive **H1–H6**, tutte non testate: workflow Arazzo/OpenAPI vs nuova esplorazione, Linkset/FAIR Signposting vs link HTML, OData Delta vs scan+reconcile, interpretazione ODRL senza falsi allow, active search/surveying per fonti rare, BagIt/OCFL per integrità/versioni. Controllare denominatori, diritti, aggiornamenti concorrenti e falsi positivi. Questi confronti non sono una roadmap approvata e non autorizzano sviluppo.

## Aggiornamento della ricerca: adozione/consistenza/long tail (2026-11-01)

L'[analisi 08](08_ADOZIONE_CONSISTENZA_E_LONG_TAIL.md) individua test di conformità già esistenti (**A2A FAIR Signposting**), avverte delle lacune dei delta token Microsoft Graph e della paginazione per offset (Zendesk), e propone confronti *da eseguire soltanto in una futura fase autorizzata*: unione delle interfacce discovery, workflow descritti vs inferiti, riconciliazione delta/cursor e fonti rare vs ottimizzazione di resa media. Distinguere **current-state consistency**, **complete event history**, **coverage of known sources** e **unknown population**: metriche differenti e non fungibili. Non è un benchmark eseguito da f3tcher.

## Ricognizione 09 — prove di completezza circoscritta e omissioni (non eseguite)

La [ricognizione 09](09_COMPLETEZZA_LOCALE_E_PROVE.md) aggiunge ipotesi di confronto da discutere, **senza sviluppo**: differenziare dichiarazioni di query completeness relative a inventario/versione da successi falsi; verificare il tasso di *falsi claim di completezza*, inclusa corretta astensione con **non stimabile** su popolazioni MNAR/dipendenti/non stazionarie; testare lateness e distacco fra replica stato corrente e storia eventi; distinguere schema compliance, field recall, **record-list recall**, grounding e costi usando benchmark indipendenti. Due differenti progetti si chiamano ExtractBench: ContextualAI/2026-02 (35 PDF) e run-llama/2026-07 (370 documenti). Non confrontare direttamente i punteggi e non omettere dal denominatore gli errori di elaborazione.

## Ricognizione 10: test di consistenza con baseline/versioni (ancora teorici)

La [ricognizione 10](10_INVENTARI_E_GARANZIE.md) propone **sei ipotesi da testare su fonti controllate**, non benchmark già eseguiti: audit di copie contro manifest e checksum, conteggio OAI-PMH variabile con paginazione, tombstone `no/transient/persistent`, finestra di recupero dei delta e bytes associati a DOI scaduti, aggiornamento API durante paginazione, e false completezza dedotta da prove Merkle di inclusione. Metriche: falsi claim, omissioni, bytes corrotti, recovery horizon, errori di cancellazione, falsi storici completi, costo e astensione giustificata. Distinguere compatibilità da autorizzazione a raccogliere. Includere assenza di ground truth nel reporting.

## Ricognizione 11 — falsi testimoni e lineage delle affermazioni (NON sperimentati)

[Nuove ipotesi e fonti](11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md). Testbed futuro, **non eseguito**, con produttore reale noto, mirror e aggregatori della stessa API, osservatori autonomi, copia mista/transitiva, due estrattori dipendenti dallo stesso OCR, manifest firmato ma parziale e registro append-only con fork:
- Confrontare la baseline «numero di URL confermanti» con una valutazione *claim-specific* delle dipendenze, senza imporre un algoritmo scelto.
- Rilevare **false independence**, **false copy attribution**, **missing lineage**, **equivocation** e falso claim di completezza su dataset firmato ma incompleto.
- Distinguere **firma valida**, **checkpoint con quorum**, **copertura rispetto a inventario esterno**, **non-inclusione entro un insieme** e **correttezza fattuale**; ogni affermazione di successo ha un denominatore e un tempo.
- Misurare *astensione giustificata* quando l'origine o le dipendenze sono ignote, oltre a costo/richiamate vere. Duplicazione del contenuto non equivale a corroborazione indipendente.

**Nessun benchmark di f3tcher, nessuna soglia di rilascio approvata, nessun comportamento richiesto al software futuro.**

## Ricognizione 12 — test di identificabilità e astensione (solo ipotesi)

Il [documento 12](12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md) propone benchmark comparabili **ancora da sviluppare/approvare**, senza esecuzione: source reuse (METER/COUNTER), passaggi parafrasati (PAN 2025), **retrieval da più sorgenti** (PAN 2026), versioni dello stesso documento (NewsEdits), hard negatives con supporto fattuale assente (FakeWiki), attribution multimodale (MAVIS), conflitto di licenze originali/mirror. Per ciascun confronto distinguere annotazione del **riuso** dalla reale genealogia **causale**, e fonte nota da «upstream missing». Misurare precision/recall anche per **non-derived** e **partially derived**, errore di orientamento della copia, false independence, groundedness, qualità dell'astensione, rischio/licenza e costo. Evitare train/test leak per medesima agenzia, sito, evento, famiglia di revisioni, fonte o epoca. I dataset con uso **solo ricerca** non autorizzano una futura integrazione nel motore. Nessun gate/soglia scelto.

## Ricognizione 13 — rischio/astensione e genealogie non identificabili (esperimenti NON eseguiti)

Nel [documento 13](13_DIFFUSIONE_IDENTIFICABILITA_E_ASTENSIONE.md) sono descritte **otto comparazioni ipotetiche** (pairwise vs multi-cascade, upstream invisibili, timestamp errati, co-copia/loop, selettività e rischio, calibrazione sotto shift, prossimo fetch guidato dal valore probatorio, hyperlink non causali). Materiale osservativo NETINF/MemeTracker **non ha vero grafo causale annotato**, dunque validare sull'output NETINF come target un modello che usa gli stessi input produrrebbe circolarità. Testbed controllato con veri upstream conosciuti, inclusi *outside-candidate-set*, e poi dati reali da valutare senza overclaim. Metriche separate: *true-source recall*, *false causal attribution*, direzione errata, *candidate-set recall*, astensione giustificata, calibratura risk-coverage, costo ed errori verso fonti rare. Nessuna soglia di accettazione o benchmark approvato.

## Ricognizione 14 — ricerca attiva delle prove, prior errati e off-policy bias (tutte ipotesi)

Il [documento 14](14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md) propone **dieci esperimenti futuri non eseguiti**: iterative vs fixed-k, disambiguazione vs numero di pagine, prior errati/upstream mancanti, sinergia di due osservazioni, dipendenza fra canali, falso STOP, offline evaluation con dati selezionati, calibration shift, documenti retrodatati e fonti rare. **FIRE** (NAACL 2025) è baseline da non ignorare; **AVeriTeC** serve per claim/evidence, non è ground truth della genealogia editoriale. Confrontare su testbed controllato policy con identiche autorizzazioni/budget/rate, registrando denominatori, costi e selezioni, e riportando casi *off-support* non valutabili. Valutare false causal attribution, *false stop rate*, origine reale trovata, abstention corretta, controllo ipotesi alternative, indipendenza delle evidenze e *rare-source recall*, senza scambiare EIG per certezza causale. Nessun criterio di rilascio deciso.

## Ricognizione 15 — matrice di acquisizione universale (nessun benchmark eseguito)

La [ricognizione 15](15_ACQUISIZIONE_UNIVERSALE_PROTOCOLLI_E_CRAWLER.md) introduce **dieci comparazioni future**: HTML-only vs catalog-first, discovery DCAT/CKAN/STAC/OGC/IIIF su sorgenti di test con metadata incompleti, HTTP vs browser su SSR/SPA, Browsertrix replay vs asset recall, LLM setup vs parsers deterministici sotto selector drift, WebSub/delta vs snapshots con gap, frontier long-tail vs throughput, media/documenti/scansioni, crash/retry e restrizioni API/rights. Ciascuna richiede gold inventory *del testbed*, stessi diritti e budget. Scomporre le metriche: **resources-discovered**, **assets-fetched**, **assets-validated**, **field/record recall**, freshness/temporal completeness, false success, CPU/time, politeness violations (target zero) e tail coverage. Browsertrix/WARC riproducibile o HTTP 200 **non prova** che il sito sia completamente esplorato. Nessun gate e nessuna tecnologia approvati.

## Ricognizione 16 — benchmark specialistici futuri, non eseguiti

[Documento 16](16_ACQUISIZIONE_SPECIALISTICA_RICERCA_LEGGI_STATISTICHE_FEDERAZIONE.md): dieci scenari candidati: differenza tra metadata/full text/supplementary file, versione giuridica originale-vigenza-multivigenza e autenticità, semantica SDMX e perdita delle revisioni statistiche, rispetto della quota Istat 5/min/IP, OpenAIRE offset vs cursor/bulk, gap ATProto visibili vs relay che esclude repository intero, blob media mancanti in CAR coerente, ActivityPub con ACL, Data Package con risorse eterogenee. Valutare *record recall*, *asset recall*, *version recall*, *dimensional/flag recall*, *non-authoritative legal labelling*, *false completeness* e violazioni di policy. Serve testbed controllato con diritti e perimetro, non accessi invasivi a servizi pubblici. Niente confronti reali condotti.

## Ricognizione 17 — test futuri su compound-object acquisition (non eseguiti)

Il [documento 17](17_BREVETTI_BIOLOGIA_AUDIOVISIVI_CONSERVAZIONE.md) introduce **12 scenari teorici**: EPO multi-rappresentazione e bulk-vs-REST rispettando quote; ENA record con FASTQ mancanti; quota NCBI E-utilities vs Datasets; Europeana media InC dietro metadata CC0; METS structMap e file nascosti in HTML; eventi PREMIS; BagIt `complete` vs `valid`, path traversal e URL ostili `fetch.txt`; WebVTT e tracce multilingua; pacchetti E-ARK DIP vs AIP; confronto record count vs asset count vs parsed count. Solo testbed propri/autorizzati. Metriche distinte: *record/asset/manifest/structural/track recall*, byte integrity, false completeness, rights/rate violations **zero**, costo per risorsa completa. Nessun benchmark reale, criterio di rilascio o implementazione approvata.

## Sintesi comparativa 18 — otto confronti discriminanti (NON eseguiti)

La [sintesi 18](18_SINTESI_COMPARATIVA_E_LACUNE.md) propone otto famiglie di test su un futuro **testbed autorizzato**: C1 channel selection (HTTP/browser/catalog/bulk/archive), C2 guadagno marginale di più tecniche vs costo, C3 errori di sync/restart e falsa «complete», C4 object graph/file/rights coverage, C5 costo reale di HTTP/browser/LLM per asset corretto, C6 rare-host/long-tail recall, C7 trasferibilità fra domini/semantiche e C8 confronto policy adattive vs regole trasparenti. Baseline esterne aggiunte: **Arachnarium (USENIX 2024) per crawl code/link/JS coverage**, **WCXB** per estrazione main-content, **dlt/Airbyte** per stato/CDC, Common Crawl URL/CDXJ index per archivi. Non aggregare task success, main-content F1, field recall e whole-site asset recall nello stesso score. Mantenere metriche **separate, per strato e per fonte**, con diritti e politeness invarianti; nessun benchmark, soglia di rilascio, stack o design è stato approvato.

## Ricognizione 19 — reality-check metodologico e non-adopters (nessun test f3tcher)

[Documento 19](19_ADOZIONE_REALE_E_COMPATIBILITA_PORTALI.md): **7 publisher/registri esemplificativi scelti per disponibilità di documentazione, 8 righe di protocollo; solo 2 root Copernicus STAC JSON lette.** Questo è un campione **selezionato** e non rappresentativo. Non calcolare success rate o quote globali. La verifica con il tool ha restituito content type XML/JSON-LD non supportati per Zenodo/Rijksmuseum, e una query UK non apribile: **ignoto per mezzo di verifica**, non endpoint malfunzionante. Prove future su campione con denominatore: protocolli davvero pubblicati vs dichiarati, root/conformance vs **sample read-only + paging + asset retrieval**, differenza API/UI/catalog, compatibilità fra versioni, quote, retention e permessi per asset. Testbed controlled per migrazione Copernicus style e conformance/drift; audit su portali che NON espongono standard (riduzione del bias da scelta di soli adopter). EU Open Data Maturity indicator ≠ percentuale dataset corretti. Nessuna misurazione riproducibile di f3tcher effettuata.

## Ricognizione 20 — nove confronti per portali e liste non standard (NON eseguiti)

[Documento 20](20_SORGENTI_DIFFICILI_MODULI_STATI_E_OMISSIONI.md): HTTP-first vs browser escalation e unique asset gain; graph di stati DOM vs URL; query form rare/frequent e bias; pagination moving-target; readiness (DOMContentLoaded, networkidle, content assertion, result count); virtualized lists con record temporaneamente visibili; selector drift e liste multirecord; HTTP soft200/error shell con contenuto parziale; **legal stop** su permessi/robots/403 con nessuna elusione. Testbed con stato noto e gold records/versions/asset, rispetto dei diritti, costi e quote uniformi. **Mai** derivare percentuali globali dal Senato, usato soltanto come esempio documentale di ricerca schede/testi/emendamenti e pubblicazione di PDF. Baseline letterarie Google Deep Web Crawl, Crawljax, Browsertrix behaviors, WebLists, SCRIBES; risultati di autori non significano prestazioni f3tcher. Evitare punteggio unico: misurare URL/record/asset/field/state recall, false success, *missingness*, tempo/costo/bytes e lawfulness.

## Ricognizione 21 — prestazione/scala a parità di legalità, costo e copertura (NON testato)

[Documento 21](21_SCALABILITA_COSTI_E_ACQUISIZIONE_EFFICIENTE.md): dieci futuri confronti su testbed autorizzato: queue grouping host/domain/IP con CDN e fonti rare; fonte negata e due consumer che condividono quota; overload/429/503/Retry-After; ETag/304/Vary con SPA e risorsa secondaria mutata; Range/206 e resume su byte di versione diversa; refresh di eventi bursty/late; long-tail fairness; HTTP/browser switching con CPU/RAM/browser seconds; archivio vs fresh fetch con age/rights; cross-project cache privacy/rights. Metriche separate **verified distinct asset recall**, cost/asset, peak RAM, CPU, browser-seconds, bytes, queue wait, requests, false completeness, missed revisions, rare-source recall e **zero violazioni di quote/diritti**. Confrontare **controller** Scrapy/StormCrawler/Crawlee già esistenti prima di inventare altro. Nessun benchmark, score aggregato, soglia o stack approvato. Evitare di leggere 200 concurrent browsers del cloud provider come capacità o autorizzazione di bombardare lo stesso host.

## Ricognizione 22 — dieci esperimenti di routing adattivo proposti, tutti NON eseguiti

[Dettagli nel documento 22](22_ROUTING_ADATTIVO_SCELTA_METODO_E_VALIDAZIONE.md). H1 HTTP/browser auto vs fissi su SSR/SPA; H2 **entrambi 20/100 record** con comparator `equal`, fonte catalogo espone 100; H3 zero-hit legittimo vs shell incompleta vs policy deny; H4 URL bandit vs FIFO/random su host rari e reward ritardato; H5 drift da SSR→SPA a predictor persisted; H6 metadata API vs documento multi-file; H7 prompt injection che propone URL/azioni vietate; H8 doppia esecuzione di handler e scritture esterne (Crawlee v4 RC transactional storage non copre side effects); H9 cost/asset marginale multicanale; H10 offline policy evaluation con alternative off-support. Confrontare baseline rules, Crawlee AdaptivePlaywright, Scrapy-playwright, bandit focused, cost-aware agent **solo se diritti/budget/perimetro equivalenti**. Score separati per *distinct verified asset recall, field/record recall, false complete, false escalation, rare source recall, CPU/browser time, policy violation=0, malicious instruction following=0*. Nessun benchmark, algoritmo, regressione o soglia approvati.

## Sintesi 23 — protocolli comparativi essenziali, NON eseguiti (2026-11-02)

La [sintesi scientifica 23](23_SINTESI_SCIENTIFICA_FINALE_RICERCA_ESPLORATIVA.md) consolida numerosi test proposti nelle precedenti ricognizioni in **sei classi discriminatorie**: **B1 route decision** su HTTP/browser/catalogo/API/archive, **B2 shared incomplete views** (HTTP e browser entrambi 20/100), **B3 paging/change/delta gap**, **B4 compound objects e rights**, **B5 long-tail e costo/quote** e **B6 drift e prompt-injection/policy safety**. Sono ipotesi scientifiche, non testbed creati o autorizzazioni all'esecuzione. Denominatori controllati, snapshot versione/tempo, medesimi diritti/budget e baseline semplici sono condizione necessaria per ogni risultato trasferibile; tutte le misure devono restare separate (asset/record/field/version recall, costi, false complete, rarità, astensione, diritti). Se una percentuale di completezza è **non stimabile**, dichiararlo. L'utente non ha approvato alcuna implementazione, test o soglia.

## Protocollo 24 — preregistrazione proposta, nessun test eseguito (2026-11-02)

[Documento 24](24_PROTOCOLLO_VALIDAZIONE_SCIENTIFICA.md) rende misurabili le sei classi B1–B6 della [sintesi 23](23_SINTESI_SCIENTIFICA_FINALE_RICERCA_ESPLORATIVA.md) tramite scenari P1–P6, baseline pertinenti BL0–BL6, Oracle solo limite superiore (mai un competitor), eligibility/rights predefiniti per gold di record/asset/fields/versions, denominatori chiari, costi e strati. La dimensione **1.000 è solo esempio**; l'N reale dipende da power/pilot/MDE, cluster di fonti e budget autorizzato. Non fissare contemporaneamente richieste/time/€ come uguali; usare regimi comparabili e reportare le altre dimensioni. Definisce *verified asset recall*, precision, false complete, legitimate-empty, unknown/abstention e cost per verified unique asset, con denominatori zero riportati come non definiti. Prevenire *train–test leakage* per sito, modifiche post hoc, cherry-picking, event history irrecuperabile, quote/diritti negati; test solo su ambienti propri/autorizzati e previa **autorizzazione esplicita dell'utente**. **Non è stato creato alcun testbed né eseguito un test**; non sono stati selezionati stack, modelli, soglie o campioni definitivi.

## Pilota 25 — prime misure locali, NON benchmark indipendente

[Documento 25](25_PILOTA_SINTETICO_RISULTATI.md) e [codice del test](../experiments/pilot01/README.md): 54 record sintetici su 4 scenari; solo HTML = 24, solo API = 28, unione = 46. Le 2 unit test di regressione e limitazione degli URL sono passate in locale. Il browser **non** è stato testato per blocco amministrativo del loopback; nessuna lettura di un sito reale. Si è confrontato soltanto il valore di **combinar dati pubblicizzati** e il rilevamento di count mismatch. Il risultato riflette la costruzione del fixture, non una misura generalizzabile né un ablation di Crawlee/Scrapy. G2/G3 del protocollo 24 ancora assenti. Il prossimo benchmark scientifico deve usare holdout indipendente, baseline pertinenti, misure di costo e repliche; non usare le percentuali di pilot01 come criterio di successo del prodotto.

## Pilota 26 — 108 valutazioni esplorative, non test indipendente (2026-11-02)

[Report 26](26_PILOTA02_BASELINE_METRICHE_FALSE_COMPLETE.md) e [traccia](../experiments/pilot02/results_trace.json): 9 tipologie di casi × 3 seed × 4 acquisitori; 4 unit test superati. **Non** è uno studio comparativo scientificamente preregistrato: seed variabili solo per ID, markup semplice, gold fixture scritta insieme al client, nessuna possibilità di confronto reale con Scrapy/Crawlee. Separare **corpus-recall** 195/240 da **reachable recall** 195/195 dell'unione e da **false complete** 3/12 su fonti con metadati ingannevoli. Costi effettivi limitati a GET locali 42 vs 78 e bytes 21.567 vs 29.217; tempi locali rumorosi ignorati. Il prossimo lavoro richiede **holdout annotato indipendentemente**, version freeze, casi API ridondanti e metadata incorretti, e strumenti di crawling reali disponibili su host controllato.
