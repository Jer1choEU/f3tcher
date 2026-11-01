# 22 — Scelta autonoma della strategia: routing, validazione, rischio e astensione

**Data:** 2026-11-02. **Stato:** sola ricerca documentale con confronto scientifico/tecnologico, nessun codice applicativo, benchmark, test di sorgenti, stack, architettura o politica f3tcher approvati. Continua [21_SCALABILITA_COSTI_E_ACQUISIZIONE_EFFICIENTE.md](21_SCALABILITA_COSTI_E_ACQUISIZIONE_EFFICIENTE.md), [18_SINTESI_COMPARATIVA_E_LACUNE.md](18_SINTESI_COMPARATIVA_E_LACUNE.md) e [14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md](14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md).

**Obiettivo:** studiare quando e come un **singolo sistema automatico**, senza profili utente selezionabili, possa scegliere *fra* canali leciti di acquisizione e *riconoscere quando la scelta è stata sbagliata*, senza presumere che una maggiore complessità AI significhi migliore copertura.

**Evidenza:** **V-doc** = documentazione ufficiale del software verificata; **V-paper** = risultati pubblicati dagli autori/editori, NON replicati da f3tcher; **H** = ipotesi future falsificabili, NON prescrizioni; **P** = da verificare a livello di versione/licenze; **U** = caso non identificabile con evidenze disponibili. Per legalità, permessi, quote e protezione prompt-injection rimane valido [04_LEGALITA_E_SICUREZZA.md](04_LEGALITA_E_SICUREZZA.md).

## 1. Risultato principale: HTTP → browser adattivo già disponibile in Crawlee

### V1 — Crawlee 3.18: `AdaptivePlaywrightCrawler` e `AdaptivePlaywrightCrawlerOptions`

Documentazione **API della serie stabile 3.18** (esaminata per evitare confusione di versione):
- https://crawlee.dev/js/api/playwright-crawler/interface/AdaptivePlaywrightCrawlerOptions
- https://crawlee.dev/js/api/playwright-crawler/class/RenderingTypePredictor
- opzione equivalente per Scrapy: https://scrapy-playwright.readthedocs.io/en/latest/reference/meta.html

Crawlee ha già capacità di:
- eseguire un handler via **HTTP o browser** e scegliere in modo adattivo la modalità prevista;
- **`renderingTypeDetectionRatio` default 0.1** (campionamento indicativo del 10% delle richieste per verificare il tipo di rendering);
- usare un **`RenderingTypePredictor`**, estendibile dall'applicazione;
- offrire **`resultChecker`** (validità del risultato HTTP) e **`resultComparator`** (confronto HTTP/browser, con possibile esito *inconclusive*);
- decidere se propagare un errore HTTP con **`shouldPropagateError`** anziché aprire il browser (utile per non confondere un blocco/policy error con richiesta di JavaScript).

**Nota di sicurezza cruciale:** la classe ereditata espone anche `retryOnBlocked`: la documentazione descrive esplicitamente la capacità di tentare di superare alcune bot protections. **Non è una funzione ammissibile ai fini f3tcher** nel perimetro deciso dall'utente, che non vuole aggirare HTTP 403, anti-bot, CAPTCHA, paywall, login o restrizioni. In un eventuale progetto, il rispetto delle policy deve precedere ogni router e una negazione non deve scatenare un browser retry/rotazione di sessione come workaround. Nessuna configurazione operativa viene qui proposta o applicata.

**Limite principale:** un `resultChecker` che restituisce *true* per «c'è almeno un record» può accettare **1/100 record**. Se HTTP e browser producono entrambi la stessa vista parziale, il loro comparatore può dichiarare equivalenza senza rilevare altri risultati invisibili; è una deduzione logica dai criteri documentati, **non una falla riprodotta in Crawlee**. Il risultato HTTP valido è un controllo che **deve essere definito nel contesto specifico**, non una garanzia di completezza della fonte.

### V2 — Crawlee 4.0 RC (documentazione di versione *non stable*): confronto e transazioni

https://crawlee.dev/js/docs/next/guides/adaptive-crawling

La documentazione **4.0 RC** descrive con più dettagli:
- URL/label based rendering prediction, `resultChecker`, `resultComparator` con `equal/different/inconclusive`, e proporzione iniziale 0,1 di detection;
- sul detection sample può eseguire **entrambi** i tentativi HTTP/browser, confrontandoli;
- **storage transaction**: le scritture dell'esecuzione scartata sono ripristinate/annullate per dataset, storage e queue;
- le azioni fuori dalla transazione (chiamate esterne, contatori globali, mutazioni di stato non coperte) possono essere **ripetute** durante un doppio tentativo;
- validatori troppo rigidi possono interpretare **risultati davvero vuoti** come fallimento e provocare escalation inutile;
- `page` esplicitamente richiesto nell'handler forza browser; l'accesso non previsto da HTTP causa fallback.

**Vincolo di interpretazione:** le transazioni qui sono descritte per **v4 Release Candidate**; non attribuire tutte le stesse garanzie a Crawlee 3.18 o qualsiasi runtime futuro senza un controllo di versione. Non dedurre che il transaction rollback renda sicura un'azione browser non di sola lettura o un'esecuzione su siti terzi.

**Conseguenza scientifica:** il solo routing HTTP↔browser **non** è originale né una capacità assente dal mercato. Per f3tcher l'ipotesi ancora da dimostrare è l'eventuale **estensione** di criteri di validazione e scelta a **API pubblicate, cataloghi, bulk export, feed/delta, archivi, HTTP, browser, object-component retrieval, formati specialistici**, su basi semantiche e di diritto comparabili, senza definire ora un framework.

### V3 — Scrapy + Playwright: routing per singola richiesta, già praticabile

https://scrapy-playwright.readthedocs.io/en/latest/reference/meta.html ; https://scrapy-playwright.readthedocs.io/en/latest/usage.html
- `Request.meta['playwright']=true` abilita la modalità browser; il controllo condizionale può già essere deciso dalla logica dello spider. Questo **non** dimostra che Scrapy includa lo stesso learned predictor di Crawlee: distinguere **meccanismo di routing disponibile** da **politica di selezione automatica**.
- Una procedura f3tcher più complessa non deve rivendicare come novità né per-request browser escalation né la possibilità di associare più handler.

## 2. La ricerca sui database mostra che «algoritmo ML più complesso» non significa migliore routing

### V4 — Zhang et al., *Simple Adaptive Query Processing vs. Learned Query Optimizers* (VLDB Journal 2025)

https://link.springer.com/article/10.1007/s00778-025-00936-6

Gli autori confrontano due metodi semplici adattivi incorporati in PostgreSQL con ottimizzatori RL appresi. **Nei loro carichi** le tecniche semplici risultano competitive o superiori in alcuni casi, evitando un training oneroso e con migliore interpretabilità. Individuano generalizzazione e variabilità dei workload come difficoltà dei learned QO.

**Limite di trasferimento:** query plan execution su database ≠ scegliere fra API, crawler e browser su siti pubblici, perché i success outcomes e i diritti differiscono. Si tratta di una **baseline metodologica** per valutare regole trasparenti e metodi online, non prova che le regole vinceranno nel Web.

### V5 — Nehme et al., *Multi-route query processing and optimization* (JCSS 2013)

https://www.sciencedirect.com/science/article/pii/S0022000012001468

Il lavoro **Query Mesh** studia routing adattivo fra piani di elaborazione differenti per subset di dati con distribuzioni diverse e statistiche incomplete; un classifier sceglie il percorso. **Già nel 2013** esisteva l'idea di un routing multi-percorso appreso a seconda dei dati.

**Limite:** è un sistema di data-stream/query plans, **non** un protocollo di crawling universale, né contempla quote o legalità del publisher per acquisire file.

### V6 — Raman, Deshpande, Hellerstein, *Using state modules for adaptive query processing* (ICDE 2003)

https://research.ibm.com/publications/using-state-modules-for-adaptive-query-processing

Le *Eddies/SteMs* mostrano adaptivity delle operazioni e la possibilità che un routing troppo flessibile **produca risultati errati** senza vincoli di correttezza. Utile come avvertimento sulla differenza fra scelta flessibile e **conservazione della semantica**.

**H:** un futuro sistema non dovrebbe considerare equivalenti un dataset `metadata-only`, `full-text`, `archive snapshot`, `delta stream`, `browser visible view` solo perché provengono dallo stesso publisher.

## 3. Bandit e ottimizzazione del guadagno non sono routing universale

### V7 — Gauquier, Manolescu, Senellart, *Efficient Crawling for Scalable Web Data Acquisition* (2026)
https://arxiv.org/abs/2602.11874

**SB-CLASSIFIER** (sleeping bandits) apprende quali link sono promettenti **per trovare target tipizzati** da una frontiera in un sito di grandi dimensioni. La ricerca dimostra risultati importanti sui siti/corpus studiati, ma **non** decide fra browser/API/bulk o prova il recupero di tutte le unità semantiche.

**H:** non confondere una policy *quale URL visito?* con *quale canale tecnicamente lecito uso?*, *quale interprete di dati?*, *quale snapshot?* oppure *quando fermarsi perché il corpus è completo?*. Il reward «numero di link ai target» premia output vicini e potrebbe penalizzare fonti rare o lavori multi-hop a rendimento ritardato.

### V8 — Poon et al., *Online Multi-LLM Selection via Contextual Bandits Under Unstructured Context Evolution* (AAAI 2026)
https://ojs.aaai.org/index.php/AAAI/article/view/39672

Bandit contestuali scelgono in tempo reale modelli con costi differenti; gli autori sviluppano varianti budget-aware e garanzie di regret **sotto le loro assunzioni**.

**Limite:** un modello LLM scelto per la qualità della risposta non è una prova che un canale di acquisizione abbia coperto asset mancanti; anche la semantica del reward differisce. Usarlo come **analogia** e baseline di studio, non come algoritmo già applicabile.

## 4. Sistemi LLM a cascata e selezione di costi: cosa trasferisce e cosa no

### V9 — FrugalGPT (Chen, Zaharia, Zou, 2023)
https://arxiv.org/abs/2305.05176
- *Prompt adaptation, approximation, LLM cascade*. Gli autori riportano su alcuni task fino a **98% di riduzione del costo di inferenza** pur mantenendo performance, non prova sui costi di acquisizione web.
- **H:** esaminare una eventuale logica *cheap validation first, expensive check when justified* senza imporre che ogni fonte passi da AI/LLM.

### V10 — RouteLLM (Ong et al., ICLR 2025)
https://proceedings.iclr.cc/paper_files/paper/2025/hash/5503a7c69d48a2f86fc00b3dc09de686-Abstract-Conference.html ; https://sky.cs.berkeley.edu/project/routellm/
- Routing fra LLM più forte e più economico usando **preference data**; risultati degli autori con forti risparmi su benchmark di dialogo/risposta. Sono **preferenze sulla qualità di risposte**, non labels di *whole-site recall*.
- **H:** cost-saving routing ha senso solo con un comparatore pertinente all'acquisizione, non con il numero di token, risposta apparentemente plausibile o preferenza di un valutatore.
- I dataset di preferenze non sono automaticamente licenziati per qualunque futuro prodotto.

## 5. Sicurezza: il contenuto web non può scegliere autonomamente i permessi del sistema

### V11 — WASP (Evtimov et al., NeurIPS 2025)
https://proceedings.neurips.cc/paper_files/paper/2025/hash/1c9818387f5dd0a0bc151214660f059d-Abstract-Datasets_and_Benchmarks_Track.html ; implementazione https://github.com/facebookresearch/wasp

Benchmark end-to-end che studia **prompt injection nei web agent** su ambienti realistici; dimostra che anche agenti avanzati possono seguire contenuti ostili in pagine che consultano. I numeri di attacco della pubblicazione sono dell'organizzatore e specifici del benchmark, non rappresentano f3tcher.

### V12 — Korgul et al., *It's a TRAP!* (ICML 2026)
https://oxrml.com/research/its-a-trap/
- In **630 attacchi su sei repliche di siti** gli autori documentano deviazioni degli agenti indotte da contenuto malevolo; mediamente 25% di successi degli attacchi nel campione/metriche studiate, **non** un tasso mondiale.
- **Implicazione:** pagine, PDF, link, API JSON, metadata e dataset acquisiti devono essere trattati come **dati non affidabili**, mai come ordini per estendere permessi o modificare il comportamento del sistema.

**Vincolo f3tcher:** l'uso di agenti autonomi per navigazione o selezione è **inferiore** alle policy di sicurezza deterministiche: non aggirare 403/auth/CAPTCHA/paywall, non interpretare contenuto esterno come autorizzazione, non usare funzioni di session rotation/retryOnBlocked per superare barriere. Le sole azioni di acquisizione lecite non includono POST a endpoint mutativi o richieste verso reti interne suggerite da una pagina.

## 6. Matrice: decisioni simili a prima vista ma logicamente diverse

| Decisione | Input osservabile | Alternative teoriche | Che cosa va validato | Blind spot da misurare |
|---|---|---|---|---|
| **Scoperta della capacità** | Link, sitemap, protocol docs, metadata | API/catalog/bulk/HTML/feed | È un'interfaccia effettiva e consentita? | Endpoint dichiarato ma ritirato, accessi negati |
| **Selezione del canale** | Tipo risorsa, pagine, evidenze di JS | HTTP/browser/API/bulk/archive | Asset identici e più completi? | HTTP e browser entrambi parziali |
| **Frontier/crawl prioritization** | Link features, host, cronologia reward | FIFO, random, bandit, diversità | Nuovi asset corretti per costo | Fonti rare, reward ritardato |
| **Parsing/estraction** | MIME, schema, versione, file | DOM, XML/SDMX, PDF/table/media | Record/field/semantics recall | JSON valido ma perdita dati |
| **Change/delta** | ETag, updated, cursor, change feed | 304, full, delta, event sync | Snapshot/retention/delete known | Eventi perduti o storia impossibile |
| **Validation/escalation** | Conteggi, checksum, confronti | Stop, secondo canale, source inventory | Quando il risultato è veramente sufficiente | Concordanza di due metodi incompleti |
| **Abstention** | Mancanza permessi, evidence non conclusiva | Unknown, incomplete, not measurable | No false complete/success | Confondere unknown e no-hits |

La matrice **non è** una architettura tecnica con moduli già decisi. È una separazione concettuale di domande che non devono essere confuse in un solo score.

## 7. Dieci esperimenti discriminanti proposti, TUTTI NON ESEGUITI

| H | Confronto | Condizioni del testbed controllato | Errore da rilevare |
|---|---|---|---|
| H1 | **HTTP vs browser adaptivo** | SSR/SPA e contenuto client-only, stessi diritti/budget | Browser costoso senza guadagno |
| H2 | **Entrambi incompleti** | HTTP e browser vedono identici 20 record; catalogo lecito mostra 100 | Comparator `equal` ma false completeness |
| H3 | **False escalation** | Risultato legittimamente vuoto vs non renderizzato vs blocco | Browser usato per errori di policy/no-hits |
| H4 | **Bandit vs regole** | URL a ricompensa breve ma poco preziosi; host rare e archivio profondità 4 | Regret/long-tail starvation |
| H5 | **Shift di rendering** | Stesso sito passa da SSR a SPA, cambia template, aggiunge formati | Predictor persistito oggi non valido domani |
| H6 | **Semantiche disomogenee** | Una pubblicazione ha metadata API e PDF+allegati+revisioni | Record metadata scambiato per full text |
| H7 | **Controllo AI vs rules** | Pagina con testo che chiede accesso a endpoint vietato | Agent prompt-injection devia policy |
| H8 | **Execution exactly-once** | Handler eseguito due volte, output e azioni simulate fuori storage | Duplicazione side-effect o scrittura |
| H9 | **Multi-channel marginal gain** | API catalog + HTML + archive dello stesso oggetto, diritti distinti | Più URL «indipendenti» senza asset nuovi |
| H10 | **Policy evaluation** | Log biased da una politica, contenuti controfattuali non acquisiti | Classifica alternativa inventata da offline replay |

Metriche candidate separate: *asset/record/field/version recall*, *false completeness rate*, *empty-valid false positive*, *false escalation*, *cost per verified unique asset*, *CPU/browser-second*, *source-tail recall*, *policy violation=0*, *prompt-injection deviation*, *drift recovery*, *off-support fraction*. **No somma arbitraria** in uno score totale.

**Importante:** campionamento browser del 10% è un esempio documentato per Crawlee, **non quota che f3tcher abbia deciso**. I test dovranno anche valutare la probabilità di scoperta di errori *rari*, e i costi di doppio rendering; la detection su campione può non incontrare una pagina anomala.

## 8. Giudizio di ricerca e cosa resta

**Già disponibile in strumenti/paper:**
- request-level HTTP/browser automatico con detection/comparison (Crawlee 3.x e guida v4 RC), request-level switch (Scrapy+Playwright);
- bandit di scoperta per link target (SB-CLASSIFIER), query-plan adaptive routing (Query Mesh) e contestual bandit per scelta LLM;
- cascades per usare modelli costosi solo quando serve, controlli HTTP e validator/incremental già discussi in doc 21.

**Ancora NON dimostrato per f3tcher:**
- una politica multi-canale che selezioni/combini API, catalogo, archive, browser, feed, file-composti senza perdere contenuto o licenze;
- validazioni di **completezza** che non scambino equivalenza HTTP/browser per completezza sorgente;
- generalizzazione a domini non visti, stabilità a cambi del sito, trattamento di history/retention e fonti rare;
- economicità rispetto a un baseline semplice e **necessità effettiva di AI**;
- robustezza a prompt injection senza ritirare protezioni o bypass permessi.

**Filone di ricerca teorico, NON rivendicazione di originalità:** **Evidence-constrained Multi-Channel Routing**: studiare se separare *idoneità del canale*, *copertura osservabile*, *costo*, *esiti ignoti*, *diritti* e *falsificabilità della completezza* conduca a decisioni più affidabili, senza definire oggi un modello/pipeline. Questa è una domanda per esperimenti futuri, non una invenzione certificata.

### Questioni finali da chiarire prima di chiudere la ricerca esplorativa

1. La capacità di rilevare omissioni indipendentemente dal metodo primario è sostenibile quando il publisher non pubblica inventari? Quando la conclusione deve essere **unknown**?
2. Confrontando fonti eterogenee, quale baseline di acquisizione e validazione è davvero equivalente in perimetro, costi e diritti?
3. Le prove relative a *Crawlee v4 RC* continueranno a valere per la versione stabile? Non fissare oggi una dipendenza.
4. Quanto spesso una strategia basata su regole supera l'AI, e viceversa, su task dove c'è un gold inventory noto?
5. I criteri di ricerca e confronto sono ormai sufficienti da preparare **una sintesi finale della fase esplorativa** (non un progetto tecnico) senza fare ancora implementazione?

**Stato di chiusura:** ricerca bibliografica, nessun codice, benchmarking o stack f3tcher, nessuna attività su fonti protette, nessuna stima quantitativa dei vantaggi del sistema.
