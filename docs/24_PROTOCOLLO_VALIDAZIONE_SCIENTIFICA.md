# 24 — Protocollo di validazione scientifica (proposta preregistrabile; NESSUN test avviato)

**Data:** 2026-11-02. **Stato:** PROTOCOLLO DOCUMENTALE PROPOSTO, non sperimentazione autorizzata e non eseguita. **Non esistono** testbed, dati sintetici, script, codice, implementazione f3tcher, benchmark, misurazioni, infrastruttura o scelte di stack. Il numero «1.000 risorse» è un **esempio didattico**, non un campione dimensionato né un risultato. Prima di qualsiasi esecuzione, l'utente dovrà autorizzare esplicitamente la fase sperimentale, il perimetro e le risorse. Prima di chiamare un'ipotesi «superiore» occorreranno baseline e prove.

**Contesto:** riferimento scientifico [23 — Sintesi della ricerca](23_SINTESI_SCIENTIFICA_FINALE_RICERCA_ESPLORATIVA.md), [18 — Confronto e lacune](18_SINTESI_COMPARATIVA_E_LACUNE.md), [05 — Domande/benchmark](05_DOMANDE_E_BENCHMARK.md), [22 — Routing adattivo](22_ROUTING_ADATTIVO_SCELTA_METODO_E_VALIDAZIONE.md), [04 — Legalità](04_LEGALITA_E_SICUREZZA.md), [00 — Decisioni](00_STATO_E_DECISIONI.md). Unico motore futuro, **nessun profilo selezionabile**. Legalità, privacy, copyright, rate limit, robots, policy e divieto di elusione di 403/auth/CAPTCHA/paywall sono vincoli **non negoziabili**, non obiettivi compensabili con più risultati.

**Metodo:** le proprietà degli strumenti citati sono documentate dagli autori; i risultati dei paper non sono nostri. Tutti gli scenari, protocolli di misurazione, metriche e criteri sotto sono **proposte da congelare in una preregistrazione prima del primo test**. Dopo l'avvio, eventuali modifiche saranno versionate e classificate *exploratory*, non fatte passare per conferme preregistrate.

---

## 1. Domanda di ricerca e ipotesi falsificabili

**Domanda centrale:** su sorgenti eterogenee, a parità di perimetro autorizzato e di budget dichiarato, una scelta automatica e verificabile dei canali di acquisizione offre **più asset corretti e distinti, meno omissioni silenziose e minori sprechi** rispetto a baseline pertinenti, senza peggiorare gli esiti sulle fonti rare?

Questa domanda NON presuppone un risultato positivo. Confrontare almeno:

| ID | Ipotesi (H) | Alternativa nulla / possibile confutazione |
|---|---|---|
| **H1 — Multicanale** | Un canale aggiuntivo, selezionato sulla base di evidenze, aggiunge *asset nuovi e validi* rispetto a un canale solo, al costo dichiarato | Non aggiunge asset o introduce solo duplicati e overhead; una baseline semplice equivale |
| **H2 — Missingness** | Una validazione distinta dall'esecuzione evita alcuni falsi «complete» quando due metodi concordano su una vista incompleta | Il controllo non scopre più lacune della baseline o produce troppe false segnalazioni |
| **H3 — Continuità** | Una strategia consapevole di cursor/retention/delete distingue storico recuperato, gap non recuperabile e sincronizzazione vera | Dichiara success con eventi persi; full scans controllati funzionano meglio |
| **H4 — Object graph** | Preservare *identità logica, versioni, file e diritti* evita errori che un semplice conteggio di URL o PDF non rileva | La complessità aggiunta non migliora record/asset/field recall nel perimetro |
| **H5 — Costo e long tail** | La selezione non deve sacrificare sistematicamente fonti rare per massimizzare la media, e deve giustificare costo marginale dei canali | Le strategie adattive peggiorano copertura rara oppure non superano regole semplici |
| **H6 — Resilienza e sicurezza** | Sotto drift, errori e contenuto non affidabile il sistema ammette incertezza e rispetta i vincoli | Produce falsa certezza, esegue azioni non autorizzate o ignora segnali di negazione |

Una eventuale ipotesi **H7 — AI utile** è *secondaria*: un agente/modello supera le **migliori baseline deterministiche pertinenti** su task/costi specificati. Non basta battere un crawler intenzionalmente debole. Il carico della prova è su chi propone più complessità.

## 2. Perimetro degli esperimenti e unità di verità

### 2.1 Gold truth controllata, non «intero Internet»

Una futura collezione sperimentale deve avere un **manifest gold** fissato e revisionabile indipendentemente dalle uscite dei crawler. Distinguere formalmente:

- **Logical object / entity**: per es. articolo, atto, dataset, esperimento, pubblicazione brevettuale.
- **Record**: entry di catalogo/search/API corrispondente a una entity e a una versione/snapshot.
- **Asset**: byte recuperabili (HTML/JSON/PDF/CSV/XML/immagine/traccia/zip) con identità e rappresentazione.
- **Representation**: HTML e PDF della *stessa* versione logica possono essere **due asset**, ma non due entità o prove indipendenti.
- **Version/event**: modifica del contenuto, correction, aggiornamento, delete/tombstone, timestamp.
- **Field**: unità semantica da estrarre, con tipo e riferimento a fonte/versione.
- **Access policy**: asset lecito per i soggetti autorizzati, pubblico ma uso ristretto, accesso negato, mutativo, condizioni non decidibili. «Pubblico» non equivale a licenza.
- **Source family / stratum**: static HTML, SSR, SPA, catalog/API, delta stream, archive/bulk, mixed documents, rare hosts, lingue e formati.

**Ogni unità gold** deve avere, per quanto pertinente: ID stabile, entity_id, asset_id, representation_id, version/epoch, timestamp, provenance/source, checksum per byte, MIME/codec, link fra componenti, campi attesi, classe di visibilità e riuso, expected outcomes (including valid empty, error, unknown), finestra di disponibilità e condizione d'uso. Alcune proprietà sono *non osservabili* al client per definizione; queste sono test di **astensione**, non gold estraibili senza autorizzazione.

### 2.2 Dimensionamento e copertura del campione

**1.000 è un'illustrazione**, non un target imposto. La numerosità effettiva deve seguire da un disegno stratificato, variabilità pilota documentata, minima differenza rilevante (MDE), unità indipendenti e capacità disponibile. Se la potenza è insufficiente, etichettare il confronto **esplorativo**. Scegliere un campione che includa **casi in cui un singolo canale basta**: un multicanale deve poter perdere per inutilità di overhead.

Proposta di famiglie non esaustive:

| Gruppo | Condizioni controllate |
|---|---|
| **G1 HTML** | link/sitemap, paginazione a URL, duplicati/canonical, 200 soft error |
| **G2 JavaScript** | SPA, infinite scroll, virtual list, caricamento ritardato, filtri/stati |
| **G3 API/catalogo** | REST/OpenAPI, CKAN/DCAT/STAC/OAI mock, token di paging, limiti ed export |
| **G4 Storico e delta** | snapshot, ETag/304, feed, cursor scaduto, insert/delete/revisioni, timestamp tardivi |
| **G5 Oggetti composti** | PDF+XML+allegati, IIIF manifest, BagIt, media/timed tracks, schemi SDMX |
| **G6 Diritti e sicurezza** | 403/401, robots deny, 429/503, rate caps, credenziali fittizie, manifest ostili, prompt injection |
| **G7 Rare sources** | fonti piccole con record unici, forme rare, lingue/encoding diversi, URL poco linkati |

**Cross-cases:** i gruppi si intersecano (es. SPA con API paginata e allegato PDF). Per non introdurre combinazioni ingestibili, selezionare incroci deliberati e **congelarli** prima del test. Includere documenti con **zero risultati legittimi**, record duplicati, file non riutilizzabili e risorse che richiederebbero un'azione mutativa (che il client non deve compiere).

### 2.3 Ambiti e denominatori

Per le metriche di **recall di acquisizione** il denominatore deve essere la collezione gold **nel perimetro e nella finestra di prova**, accessibile lecitamente ai soggetti del test. Gli asset **vietati** NON entrano nel denominatore di ciò che è dovuto; figurano separatamente nella misurazione delle *policy decisions* e dell'astensione. **Non** eliminare dopo il test gli asset lecitamente accessibili che il crawler ha perso chiamandoli «fuori scope». L'eleggibilità è **predefinita prima dell'osservazione** e sottoposta a audit.

Per sorgenti reali senza inventario completo la percentuale assoluta è **NON STIMABILE**: si può misurare un *known-set overlap* o *confirmed discoveries*, mai «recall di tutto Internet».

## 3. Baseline necessarie — e comparabilità onesta

Le baseline sono **candidati, non strumenti selezionati o installati**. In ogni gruppo utilizzare il confronto pertinente, non pretendere che ogni crawler sia un lettore SDMX completo:

| ID | Baseline concettuale | Cosa isola | Non usarla per |
|---|---|---|---|
| **BL0** | Fetch HTTP + follow-links/paginazione dichiarata | costo minimo e scoperta standard | valutare API/SPA o file non linkati come capacità nativa |
| **BL1** | Browser-first con navigazione consentita | rendering dinamico e asset UI | come surrogato di full dataset catalog |
| **BL2** | Catalog/API/bulk-first usando interfacce documentate | capacità specifica fonte | confronti privi di catalogo/permessi |
| **BL3** | **Crawlee AdaptivePlaywrightCrawler** (versione **pin** al test) | baseline già adattiva HTTP/browser, \`resultChecker\`/\`resultComparator\` | trattarla come «sempre HTML-only» |
| **BL4** | **Scrapy + Playwright** / HTTP-first with deterministic escalation | selezione manuale trasparente, costo | attribuirle automaticamente ML integrato non documentato |
| **BL5** | Strategie di frontier/refresh standard (FIFO, random lecito, site-stratified) | bias verso fonti frequenti | confondere URL priority con scelta del protocollo |
| **BL6** | Implementazioni pertinenti di caching/delta (HTTP 304, publisher feed, dlt/Airbyte quando applicabile) | aggiornamenti/cursor/state già disponibili | dichiararle equivalenti a generico HTML crawler |
| **ORACLE** | Gold-informed best-case upper bound | **solo limite teorico** | **MAI** classificarlo come baseline deployabile o concorrente reale |
| **CANDIDATO** | Una futura politica integrata multicanale *solo se autorizzata* | vantaggio marginale ipotizzato | considerare che esista oggi o ne inventare numeri |

**Ablations** da isolare, se un candidato verrà implementato: nessun browser; nessun catalog; nessuna validazione indipendente; nessun archive-first; nessuna diversificazione per host; nessun learning/LLM; una sola modalità di parser. Ogni ablation deve **conservare diritti, tempo e definizioni del gold**; riportare il costo risparmiato insieme ai record persi.

**Version freeze**: registrare release/commit SHA, dipendenze e condizioni/licenze effettive del software. Le API vendor possono cambiare: ad esempio il routing Crawlee 3.x e la guida 4.0 RC non hanno necessariamente identico contratto; non importare risultati di altre release.

## 4. I sei blocchi di prova prioritari (dalla sintesi 23)

### P1 — Scegliere il canale giusto

**Scenario:** stessi logical objects compariono in HTML, SPA, API/catalogo, feed e in uno snapshot storico; alcuni asset sono disponibili solo in uno di questi canali. Parte delle sorgenti pubblica metadati senza i file; parte ha API assenti.

**Confronto:** BL0/BL1/BL2/BL3/BL4 vs eventuale CANDIDATO; stessa famiglia di task, con budget primario **definito e pre-registrato**. Non attribuire un vantaggio a un metodo perché gli si sono date credenziali extra.

**Risultati separati:** logical entity recall, unique asset recall, version recall, completamento campi, tempo, CPU/browser second e costo incrementale di un canale. **Confutazione:** i canali aggiunti ritrovano soltanto alias o non compensano gli overhead.

### P2 — Doppia incompletezza e dichiarazioni ingiustificate

**Scenario:** **100 record gold**, HTTP e browser restituiscono **gli stessi 20**, un inventario consentito ne descrive 100; altri casi hanno zero risultati genuini, mismatch del catalogo, dati mai enumerabili.

**Confronto:** HTTP/browser comparator **equal** vs controlli su inventory/manifest/conteggi, e policy di astensione.

**Errore centrale:** l'accordo fra due metodi ≠ prova di aver visto tutto. Misurare *false completeness*, *unknown corretto*, *false alarm*, *coverage-risk*. Non penalizzare la risposta «unknown» come fallimento quando la verità non è identificabile.

### P3 — Aggiornamenti, storia e recuperabilità

**Scenario:** offset paging mentre appaiono nuove righe; cursore che scade; delete/tombstone, feed lag e eventi fuori ordine; \`ETag 304\` dell'HTML mentre i dati secondari sono cambiati; arresto e ripresa; versioni precedenti non più disponibili.

**Confronto:** full refresh, conditional GET, publisher delta, feed, state checkpoint/repair, eventuale combinazione. **Non** simulare un history recuperabile laddove la fonte non lo offre.

**Risultati:** version/event recall, freshness lag, duplicates, lost updates, gap detection, % run che dice «complete» in presenza di gap irrecuperabile, costo rete. La *verità al tempo T* deve essere nota dal simulatore, non dedotta da timestamp potenzialmente falsi del client.

### P4 — Oggetti composti e diritti per asset

**Scenario:** entry di metadata per un articolo con PDF + allegati; IIIF manifest con tele/immagini; oggetti giuridici con originale/vigente; BagIt con manifest e checksum; SDMX con DSD/codelists; alcuni media con diritti più restrittivi dei metadata.

**Confronto:** «scarica il primo URL/documento» vs inventario dei componenti **lecito** e verifica semantica.

**Risultati:** component/file recall, precision per versione, checksum/integrità, field/schema recall, diritti applicati correttamente. **Divieto:** un file negato non va acquisito «per aumentare recall»; se un media non è autorizzato va registrato come non eleggibile, non forzato.

### P5 — Costo, scala e fonti rare

**Scenario:** pochi host grandi con contenuti ripetitivi e molti host piccoli con asset unici; API/HTTP/browser hanno diversi costi e quote simulate; fonti update bursty e stabili, alcuni task non richiedono browser.

**Confronto:** baseline stratificata/random/FIFO, scheduler già noti, adaptive URL prioritization e (se autorizzata) route policy multicanale/AI.

**Risultati:** macro- e micro-recall per strato, worst-stratum coverage, *cost per verified unique asset*, time/CPU/peak RAM/network/browser-second, sprechi da dupliche, missed revisions. Una strategia può vincere in media e perdere sui casi rari: riportare **entrambi**.

### P6 — Drift, fallimenti, permessi e input ostili

**Scenario:** endpoint vecchio/nuovo (stile migrazione Copernicus STAC), JSON con schema mutato, pagina HTML con prompt injection, manifest con URL verso reti private, HTTP 403, robots disallow, 429/503 \`Retry-After\`, zero-hit valido, timeout browser e doppio handler.

**Confronto:** policy deterministiche vs controllo AI (se presente), checker permissivo vs validazione, no retry indiscriminato vs backoff rispettoso delle quote.

**Risultati:** policy violations, false escalation, stability of correct output, retries, data loss and recovery, injection-following rate, correct abstention. **Zero tentativi non autorizzati è un vincolo duro**, non un punteggio che può essere compensato con più dati.

## 5. Definizioni delle metriche — niente score unico

### 5.1 Metriche primarie e unità

Se \`G_eligible\` è l'insieme congelato degli **asset gold leciti e raggiungibili nel testbed** e \`C_valid\` è l'insieme degli asset acquisiti, validati e correttamente associati a identità/versione/diritti:

- **Verified asset recall** = \`|G_eligible ∩ C_valid| / |G_eligible|\` (solo \`|G_eligible| > 0\`). Non contare come veri positivi asset dal MIME corretto ma versione/sorgente errata.
- **Verified asset precision** = \`|G_eligible ∩ C_valid| / |C_produced_distinct|\`, dopo l'annotazione delle uscite errate, extra o non associate; il denominatore va specificato nel report, senza scartare silenziosamente i record sbagliati.
- **Logical-object recall**, **record recall**, **version/event recall**, **component recall**, **field recall**: stesse idee, con **gold e mapping diversi**; non sommarle.
- **False-complete rate** = \`# runs che dichiarano complete ma hanno almeno un asset eleggibile gold mancante / # runs che dichiarano complete\`. Se zero run dicono «complete», riportare *undefined*, non 0%.
- **Abstention/unknown**: \`# run con unknown\`, distinguendo corretto/malposto mediante gold testbed. Valutare anche la *coverage of decisions* e il rischio condizionato a decisioni non astenute.
- **Cost per verified unique asset** = \`costo totale attribuibile al run / # asset gold distinti verificati\`. Quando il denominatore è zero, riportare **non definito / infinito secondo convenzione pre-registrata**, non 0.
- **Policy violation count** = numero di richieste o azioni che violano diritti/accessi/quote predefiniti. Per l'idoneità sperimentale il target è **0**, indipendentemente dal guadagno.
- **Freshness lag** = differenza fra tempo gold dell'evento e prima acquisizione valida, solo quando quell'evento è eleggibile e osservabile con i canali consentiti.

**Casi di zero:** se il gold ha davvero zero risultati attesi, misurare *empty-case accuracy* e false escalation; non calcolare asset recall \`0/0\` o assegnargli 100%. Se alcuni dati non sono etichettabili, riportare *unknown* e usare un'analisi di sensibilità, mai classificarli automaticamente TP.

### 5.2 Costi e fairness

Report separati: richieste HTTP/2xx/4xx/5xx, byte ingress/egress, wall clock, CPU-seconds, peak RSS, browser-seconds, GB storage, invocazioni modello/token quando applicabili, consumo cloud al listino registrato nella data del run, codici errore, rate-limit violations. **Nessun prezzo fisso viene inventato qui**: se si stimano euro, dichiarare listino/tier e contabilizzazione, non spacciarli per una fattura.

**Per strato:** media *micro* (ponderata per quantità di asset), media *macro* (ponderazione per classe/fonte predefinita), intervalli e peggior strato. L'obiettivo non è rendere tutte le fonti equivalenti, ma mostrare quando una scelta le sacrifica. La macro-recall non deve essere costruita **post hoc** per far vincere un approccio.

### 5.3 Non-comparabilità dei budget

**È impossibile imporre contemporaneamente identico wall time, numero di richieste, traffico e prezzo** a tecniche con costi differenti: una di queste dimensioni deve essere **il budget primario predefinito**, mentre le altre diventano esiti osservati. Proposta: eseguire più regimi indipendenti, come:
- **tempo massimo comune** con quote e politeness invarianti;
- **costo massimo normalizzato** con listino/esposizione congelati;
- **numero massimo di operazioni lecite** come analisi secondaria (non equivalente a costo).

**Non** assegnare un credito extra al browser perché «più complesso», né penalizzarlo soltanto per numero di richieste, se consuma più CPU e tempo. I risultati vanno stratificati anche per budget.

## 6. Disegno sperimentale per evitare conclusioni favorevoli per costruzione

1. **Preregistrazione** prima delle esecuzioni: ipotesi primarie/secondarie, corpus/criteri di inclusione, metodi, versioni, seed, budget principale, metriche, ipotesi su denominatore, confronto statistico, segnalazione di insuccesso.
2. **Train/validation/test separati per sorgente/layout/domain**, non per singola pagina dello stesso dominio: altrimenti gli agenti e i predictor possono vedere pattern «di test» in addestramento. Congelare *hidden holdout* e gold; le regole della baseline devono usare solo evidenza che la stessa baseline può legittimamente osservare.
3. **Pairing per task**: ogni alternativa affronta gli stessi oggetti/periodo e condizioni di permesso; **ordine controbilanciato o randomizzato**, isolamento cache e segnali temporali. Se gli esperimenti usano sorgenti mutabili, congelare snapshot/versione o usare replay controllato.
4. **Repliche per seed, sorgente e tempo**: report dei risultati per cluster (sorgente) evitando la pseudo-replicazione di 1.000 URL tutti dallo stesso host. Numero di repliche da fissare con pilot/power analysis, **non** inventare oggi un N.
5. **Intervalli e incertezza**: distribuzioni e confidence interval in base al clustering e alla metrica, non p-value isolati; per confronto multivariato/abbondanti ipotesi dichiarare confronti primari e controllo della molteplicità appropriato.
6. **No cherry-picking**: registrare risultati nulli, failure e regole di esclusione decise in anticipo; non rietichettare le condizioni difficili come «out of scope» perché un candidato fallisce.
7. **No baseline leakage**: un oracle che conosce l'inventario completo è **upper bound illustrativo**, mai concorrente normale; nessuna policy può leggere gold, log del test o output futuro per scegliere su cosa fare fetch.
8. **Ablations & sensitivity**: per un eventuale CANDIDATO testare il contributo marginale di ogni capacità e la robustezza a distribuzioni diverse. Valutare performance fuori supporto delle strategie apprese; i log generati da una policy non contengono necessariamente risultati controfattuali delle azioni che non ha scelto.
9. **Indipendenza valutazione**: chi costruisce il sistema non deve poter modificare il gold dopo aver visto gli output; review indipendente quando possibile, audit di mapping ambiguo e mismatch di semantica. 
10. **Sanity checks del testbed**: verifica che gli asset autorizzati siano effettivamente raggiungibili nell'intervallo, che blocchi/quote siano simulati correttamente e che non vi siano URL esterni raggiungibili per errore.

## 7. Esiti e criteri di valutazione (NON fissare soglie a posteriori)

Gli esiti possibili per ciascuna H:
- **Evidenza favorevole**: miglioramento nelle metriche preregistrate rispetto alle baseline pertinenti, con incertezza, costo marginale e **zero** violazioni di policy.
- **Equivalente/inconclusivo**: differenze troppo piccole/imprecise o dipendenti da pochi casi; non dichiarare vittoria di AI o multicanale.
- **Sfavorevole**: overhead maggiore, recall/coverage inferiore, false complete peggiori, mancata generalizzazione, meno fonti rare; **si deve poter abbandonare un'idea**.
- **Non stimabile**: fonte/gold/diritti insufficienti a dare un denominatore serio; registrare quale assunzione manca.
- **Stop di sicurezza**: anche una sola violazione delle restrizioni nel testbed interrompe la prova e impone revisione del meccanismo, senza usare il contenuto raccolto in violazione come risultato positivo.

**Prima della fase sperimentale** andranno definiti e approvati criteri di *minimum meaningful improvement*, tolleranza alle regressioni per fonte/strato, budget economico e criterio di stop. **Non** inseriamo ora una soglia di «90% recall» o «50% risparmio» inventata: la scelta deve dipendere dal caso e dalla baseline, e rimanere distinta dalle garanzie assolute di sicurezza/diritti.

## 8. Riproducibilità, audit e reporting attesi (specifica documentale, non asset già prodotti)

Ogni futuro run di test **se autorizzato** dovrà registrare:
- manifest dataset con revision/hash e modello dei permessi, versioni e gold sotto controllo dei valutatori;
- versioni esatte dei programmi e dipendenze, configurazione, seed, risorse/hardware/OS, time zone, locale e listini;
- scenario, strati, eleggibilità congelata, clock/eventi di cambiamento, task ID e manifest dei file/attestazioni;
- tutti i canali tentati e non tentati, budget, outcome, errori, quota/delay/politeness e motivi di skip;
- output raw e parsed dove i diritti consentono (altrimenti metadata e hash leciti), riferimenti alle versioni, checksum e campi mancanti;
- mapping gold↔risultati, classificazione TP/FP/FN/unknown, record duplicati e versioni;
- metriche disaggregate con metodi d'incertezza, grafici/casi di regressione, failure logs e report dei diritti;
- dichiarazione delle modifiche al protocollo *dopo* preregistrazione, in un registro di deviazioni.

Il principio è coerente con la **valutazione di artefatti ACM**: *available*, *functional*, *reusable* e *results reproduced* sono distinzioni, non medaglie automatiche; se in futuro un soggetto terzo replica il risultato, registrarlo separatamente. Fonte metodologica: https://sigsim.acm.org/conf/pads/2026/blog/artifact-evaluation/

### Report-template (facsimile da compilare solo dopo prove)

| Campo | Valore attuale |
|---|---|
| Run ID / date / commit | **NON ESEGUITO** |
| Autorizzazione e perimetro | **DA APPROVARE** |
| Testbed e gold manifest | **DA CREARE** |
| Baseline e versioni congelate | **DA SELEZIONARE** |
| Budget e criteri preregistrati | **DA APPROVARE** |
| Asset/record/field/version recall | **NESSUNA MISURA** |
| False complete, astensione, tail coverage | **NESSUNA MISURA** |
| Costi CPU/RAM/rete/browser | **NESSUNA MISURA** |
| Incidenti di policy | **NESSUN TEST CONDOTTO**; non equivale a una metrica già pari a zero |
| Conclusione scientifica | **NON DISPONIBILE** |

## 9. Piano di passaggio di fase: approvazioni necessarie (NON avviate)

Questo documento rappresenta **la preparazione concettuale della validazione**, non la decisione di implementarla.

**Gate G0 — documentazione:** definire H1–H6, metriche, baseline, gold, sicurezza e protocolli; **questo documento soddisfa solo la bozza descrittiva**, non la preregistrazione finale.

**Gate G1 — approvazione esplicita dell'utente:** autorizzazione a creare testbed sintetico e a eseguire benchmark, con indicazione di eventuali costi massimi e policy. Senza G1, si resta nella documentazione.

**Gate G2 — protocollo preregistrato:** gold, soglie e dimensioni per strato, seed, risorse, metodi e test di sicurezza congelati, indipendenti dagli output; review eventuale.

**Gate G3 — esperimenti controllati:** SOLO su ambiente proprio/test autorizzato, nessun tentativo di aggirare barriere di terzi; strumenti esistenti confrontati separatamente.

**Gate G4 — analisi & decisione:** report riproducibile, regressioni e fallimenti, confronto evidenze vs ipotesi, valutazione legale/licenze. La scelta di architettura, stack o integrazione verrà **dopo** gli esiti e una decisione esplicita dell'utente.

### Decisioni NON prese

Non sono stati scelti runtime/linguaggi, cloud/database, crawler, parser, modelli LLM, proprietà brevettabili, roadmap di sviluppo, costi, obiettivi di prestazione, soglie statistiche o scenari definitivi. Non esiste un prodotto con più profili, né si propone di aggiungerne.

## 10. Bibliografia di base per verificare la pertinenza delle baseline

- [23 — Sintesi](23_SINTESI_SCIENTIFICA_FINALE_RICERCA_ESPLORATIVA.md), [18 — Matrice](18_SINTESI_COMPARATIVA_E_LACUNE.md), [22 — Routing](22_ROUTING_ADATTIVO_SCELTA_METODO_E_VALIDAZIONE.md), [21 — Costi](21_SCALABILITA_COSTI_E_ACQUISIZIONE_EFFICIENTE.md), [20 — Sorgenti difficili](20_SORGENTI_DIFFICILI_MODULI_STATI_E_OMISSIONI.md), [19 — Adozione](19_ADOZIONE_REALE_E_COMPATIBILITA_PORTALI.md), [05 — Benchmark](05_DOMANDE_E_BENCHMARK.md), [04 — Sicurezza](04_LEGALITA_E_SICUREZZA.md).
- **Crawlee AdaptivePlaywrightCrawler API**, predictor/checker/comparator: https://crawlee.dev/js/api/playwright-crawler/interface/AdaptivePlaywrightCrawlerOptions
- **USENIX Security 2024 — SoK: State of the Krawlers**, diversi criteri di copertura e nessun migliore globale nel campione studiato: https://www.usenix.org/conference/usenixsecurity24/presentation/stafeev
- **ACM Artifact Evaluation PADS 2026**, distinzioni fra artifact available/functional/reusable/reproduced: https://sigsim.acm.org/conf/pads/2026/blog/artifact-evaluation/
- **RFC 9309 Robots Exclusion Protocol**, non autorizzazione: https://www.rfc-editor.org/rfc/rfc9309.html
- **W3C PROV-O**, se per il gold si decide di modellare lineage/provenance: https://www.w3.org/TR/prov-o/
- Eventuali API e licenze concrete andranno verificate **alla data della scelta e dell'esecuzione**, senza riutilizzare come valori attuali quote riportate nelle ricognizioni 2026.

---

**Dichiarazione finale:** questo è un **protocollo di ricerca documentale pronto per revisione e preregistrazione futura**, non una preregistrazione già approvata, uno studio eseguito o un sistema implementato. Qualunque superiorità di f3tcher resta totalmente da dimostrare.
## Addendum: prima prova di fattibilità locale effettivamente eseguita (2026-11-02)

Il **pilota sintetico 25** è ora documentato in [25_PILOTA_SINTETICO_RISULTATI.md](25_PILOTA_SINTETICO_RISULTATI.md). `procedi` ha autorizzato il testbed locale. Tre baseline HTTP/API/union sono state eseguite su quattro fixture locali **costruite insieme ai client**, con **2 unit test** superati. **Questo NON è l'esperimento preregistrato G2 del presente documento:** gold/cliente sono stati sviluppati congiuntamente, manca holdout, la selezione dei casi favorisce intuitivamente unione e non esiste confronto con Crawlee/Scrapy/Playwright. Il primo tentativo browser è stato **bloccato dalle policy dell'ambiente**; nessuna misura browser è disponibile. Nessuna soglia di miglioramento, dimensione del campione o metodo ML approvati. **G1 vale solo per il pilota limitato e gratuito**, non per test su siti terzi o spesa. Considerare il report come **smoke test esplorativo**, non inferenza scientifica.

## Addendum 2026-11-02 — pilota 02 eseguito; G2/G3 ancora non soddisfatti

La [prova 26](26_PILOTA02_BASELINE_METRICHE_FALSE_COMPLETE.md) esegue 4 metodi HTTP/parser su 27 sorgenti sintetiche (9 casi × 3 seed) con 4 test automatici. **Distingue 240 record gold non negati e 195 effettivamente raggiungibili:** hybrid 195/195 con 78 GET; HTML-only 135/195 con 42 GET. I 45 non esposti non si possono acquisire con questi canali; servono a verificare false pretese di completezza. **Tre false complete** derivano da un totale dichiarato errato dal publisher. Questo dato è stato **progettato nel testbed** e non misura un tasso statistico reale; i seed non sono replicazioni indipendenti. **G2 non soddisfatto** (gold e baseline progettati insieme, non preregistrati/holdout indipendente), **G3 non soddisfatto** (Scrapy/Crawlee non disponibili e mai confrontati). Non si è autorizzato sviluppo f3tcher, uso di servizi esterni né spese. Congelare i risultati grezzi e non utilizzare la percentuale 100% sui raggiungibili come prova di completezza globale.

## Addendum 2026-11-02 — pilota 03 con fixture terze (ancora non blind)

Il [pilota 03](27_PILOTA03_FIXTURE_ESTERNA_E_ROUTING_API.md) è un miglioramento del controllo del corpus rispetto a pilot01/02: la fixture di base è presa **senza cambi** da `thunderbit-operations/scraper-benchmark` (MIT) e i Git blob di server e gold sono stati verificati. I client furono comunque sviluppati dopo consultazione della fixture, quindi manca ancora un **holdout blind** e non vi è uno studio indipendente in senso confermatorio. Tre metodi HTTP su una fixture esterna: statico 12/12, JS-only 0/8 in HTML grezzo, API literal 8/8 con +1 GET/+716 byte. Quattro test automatici superati. **Non è stato eseguito Scrapy, Crawlee né il browser Chromium**; rispettate policy dell'ambiente. **G2/G3 restano non soddisfatti** per confronto credibile dei crawler completi, per distribuzione dei casi, stime di varianza e protocolli preregistrati.
