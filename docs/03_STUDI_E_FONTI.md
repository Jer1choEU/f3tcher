# 03 — Registro di studi, articoli e documentazione

**Data registro:** 2026-11-01. Questo file salva riferimenti emersi nella ricerca. Separiamo **V** = link/claim essenziale **ricontrollato direttamente su fonte primaria in questa sessione**; **P** = pista riportata nelle conversazioni precedenti, **da verificare prima di usarla come prova o citazione definitiva**. Un link reale non dimostra automaticamente i risultati annunciati né la loro generalizzabilità.

## A. Riferimenti con riscontro diretto (V)

| Riferimento | URL | Cosa insegna / limite |
|---|---|---|
| Gauquier, Manolescu, Senellart (2026), *Efficient Crawling for Scalable Web Data Acquisition* | https://arxiv.org/abs/2602.11874 | Sleeping bandits/SB-CLASSIFIER: scegliere URL per recuperare risorse target riducendo pagine visitate; risultati limitati ai siti/target studiati. |
| Paris, Paris, Baumann (2026), *Estimating Absolute Web Crawl Coverage From Longitudinal Set Intersections* | https://arxiv.org/abs/2603.15416 | Stima copertura da sovrapposizioni di 15 crawls del German Academic Web: circa 46% in una configurazione stabile; modello/assunzioni non validi automaticamente per ogni sito. |
| Bohra et al. (2025), *WebLists* | https://arxiv.org/abs/2504.12682 | Benchmark di 200 task di estrazione; BardeenAgent trasforma navigazione in programmi ripetibili. Recall riportata 66% vs 31% di altri agenti nel benchmark; non baseline di f3tcher. |
| Bhoi et al. (EMNLP 2026), *CACHE-ED2* | https://aclanthology.org/2026.emnlp-industry.93/ | LLM produce procedure DSL cache-ate per documenti ripetitivi; studio dichiara >580k documenti, 11.500 fornitori e riduzione token in condizioni specifiche. |
| Polshkov et al. (2026), *WANDR* | https://arxiv.org/abs/2608.14747 | Benchmark di 500 task wide/deep; risultati dichiarati 0,363 soft F1 e 0,133 hard F1 al massimo sforzo, misura discovery/depth/evidenze. |
| RFC 9309 — Robots Exclusion Protocol | https://www.rfc-editor.org/rfc/rfc9309.html | Standard del comportamento di crawler conformi; non è un sistema di autenticazione. Un robots.txt valido comporta obblighi per crawler conformi. |
| Direttiva UE 2019/790, art. 4 | https://www.legislation.gov.uk/eudr/2019/790/article/4 | TDM su opere legittimamente accessibili nei limiti dell'eccezione e delle riserve dei titolari. |
| L. 633/1941 art. 70-quater, introdotto dal D.Lgs. 177/2021 | https://www.normattiva.it/atto/caricaDettaglioAtto?atto.codiceRedazionale=21G00192&atto.dataPubblicazioneGazzetta=2021-11-27 | Condizioni italiane del TDM e limite di conservazione (solo tempo necessario per il TDM ai sensi del comma 2). |
| W3C Web Annotation Data Model | https://www.w3.org/TR/annotation-model/ | TextPosition/TextQuote selectors, riferimenti a sezioni specifiche, cautela su copyright quando si citano estratti. |
| OpenAlex — Harvesting repository records | https://help.openalex.org/data/sources/repositories/ | OAI-PMH giornaliero ~5.000 endpoint, overlap temporale di un giorno, backfill dall'earliestDatestamp, retry anche di fonti temporaneamente guaste. |

## B. Studi e benchmark emersi in precedenza: da riverificare nel dettaglio (P)

**Focused crawling, scelta dei siti, completezza**
- *Host-Aware Web Crawling for LLM Pretraining Data* (ottobre 2026) — https://arxiv.org/abs/2610.13321 — campionamento preliminare per host e allocazione del budget; attenzione a bias per fonti rare.
- *Coverage-Aware Web Crawling for Domain-Specific Supplier Discovery via a Web–Knowledge–Web Pipeline* (2026) — https://arxiv.org/abs/2602.24262 — iterare discovery, grafo e nuove ricerche.
- *Measuring What the Crawler Sees: Discovery Curves, Core Persistence, and Shell Dynamics in Longitudinal Web Crawls* (2026) — https://arxiv.org/abs/2607.13636 — separare nucleo stabile e risorse dinamiche.
- *Optimal Freshness Crawl Under Politeness Constraints* (SIGIR 2019) — ricercare sul sito Microsoft Research / proceedings — pianificazione refresh sotto vincoli host.
- *A Scalable Crawling Algorithm Utilizing Noisy Change-Indicating Signals* (WWW 2025) — ricercare in ACM Digital Library — segnali parziali per ricrawl.
- *Adaptive Submodularity: Theory and Applications in Active Learning and Stochastic Optimization*, Golovin/Krause (2011) — ricercare versione originale; proprietà matematiche **non automaticamente soddisfatte** sul web.
- *Less is More: Boosting Coverage of Web Crawling through Adversarial Multi-Armed Bandit* (DSN 2025) — studiare (misura codice web, non inventario dei documenti).
- *Siphoning Hidden-Web Data through Keyword-Based Interfaces*, Barbosa & Freire — studio storico su query-based hidden web (copertura riportata nei dataset di studio).
- *Detecting Near-Duplicates for Web Crawling* (WWW 2007) — fingerprinting per grandi corpora.

**Estrazione strutturata / agenti**
- *LiveWeb-IE* (ICLR 2026): https://proceedings.iclr.cc/paper_files/paper/2026/hash/3184497246703156104b3ceb1e379dc5-Abstract-Conference.html — estrazione su pagine live, visione vs HTML.
- *WebDS* (ICLR 2026): https://proceedings.iclr.cc/paper_files/paper/2026/hash/35686e5837762715a9b105c96cba43af-Abstract-Conference.html — benchmark data scraping realistico e difficile.
- *Web Content Extraction Benchmark / WCXB* https://webcontentextraction.org/ — performance diverse per articoli, forum, prodotti, listati ecc.; risultati per categoria da riconfermare su versione dataset.
- *What 1,114 Documents Reveal About Schema-Driven Extraction* (EMNLP 2026) — confermare title/url ACL; differenze forti fra categorie e real vs synthetic.
- *ExtractBench* (luglio 2026) — ricercare su arXiv; misure di accuratezza, completezza, grounding e costo.
- *CycleIE* (ottobre 2026) — ricercare su arXiv; estrazione → verifica → riparazione iterativa.
- *WebXSkill* (EMNLP 2026) — ricercare su ACL Anthology; procedure eseguibili e istruzioni contestuali.
- *Are Online Skill and Memory Modules Always Worth Their Tokens?* (EMNLP 2026) — confrontare memoria con semplice utilizzo di maggiore budget.
- *Go-Browse* https://github.com/ApGa/Go-Browse — grafo di navigazione riutilizzabile.
- *WebTraveler* https://github.com/RongchangLi/WebTraveler — memoria di navigazione.
- *APEX-EM* https://aclanthology.org/2026.findings-emnlp.1996/ — esperienza e procedure passate; prima verificare URL e dettagli.
- *VeriEnv* (2026) — ambienti di simulazione web verificabili, da cercare in arXiv.
- *Browserbase Browse.sh* https://www.browserbase.com/blog/browse.sh — procedure di automazione riusabili (materiale di fornitore).

**Documenti, media e provenienza**
- *PureDocBench* (maggio 2026) — benchmark di documenti puliti/degradati, da recuperare la pubblicazione primaria.
- *MDPBench* (2026) — elaborazione multilingue di documenti, da recuperare la pubblicazione primaria.
- *olmOCR* (ACL 2026) https://github.com/allenai/olmocr — parsing PDF visivo.
- *M3EC: Multimodal Multidocument Event Extraction and Coreference Resolution* (EMNLP 2026) https://aclanthology.org/2026.emnlp-main.2502/ — collegamento eventi tra audio/video/testo.
- *Can Your Agent Read the Source Faithfully?* (EMNLP 2026) — benchmark RDQA e groundedness.
- *Cited but Not Verified* (2026) — link citato ≠ sostegno effettivo del claim.
- *BaRA: BFS-and-Reflection Web Data Collection Agent* (2026) https://arxiv.org/abs/2607.00007 — verifica di URL e asset media.
- *OntoDup* (2026) — entity matching con evidenza e governance; da verificare.
- *BrowseSafe++* (2026) — prompt injection in pagine web; da verificare.
- *Quantifying the Systematic Bias in the Accessibility and Inaccessibility of Web Scraping Content* — https://doi.org/10.1177/08944393231218214 — bias non casuali nell'accessibilità.
- *Web scraping for research: Legal, ethical, institutional, and scientific considerations* (2025) — ricercare in Big Data & Society; inaccessibilità e campionamento non casuale.
- *Input Relation Prompting for Metamorphic Testing on Query-Based Systems* (2025) https://doi.org/10.6688/JISE.202501_41(1).0003 — test di relazioni senza ground truth completo.
- *AgentWebBench* (ICML 2026) https://proceedings.mlr.press/v306/zhong26n.html — cooperative service/agent architectures.
- *Reimagining research papers as interactive and reliable AI agents* (Nature 2026) — conversione di documentazione/codice in procedure controllabili; da studiare.

## C. Standards e documentazione chiave (sorgenti operative, non necessariamente papers)

- Common Crawl https://commoncrawl.org/ — WARC, CDXJ, URL Index Parquet.
- RFC 9110 HTTP Semantics https://www.rfc-editor.org/rfc/rfc9110 — cache/condizioni/range/risposte.
- ResourceSync https://www.openarchives.org/rs/1.1/resourcesync — change list e change dump.
- LDES https://w3id.org/ldes/specification — eventi linked-data.
- IIIF https://iiif.io/api/ — descrizioni e discovery delle modifiche.
- WebSub https://www.w3.org/TR/websub/ — subscription push.
- OAI-PMH https://www.openarchives.org/OAI/openarchivesprotocol.html — crawling metadati.
- W3C DCAT 3 https://www.w3.org/TR/vocab-dcat-3/ — cataloghi.
- RFC 8631 https://www.rfc-editor.org/rfc/rfc8631 — service descriptions.
- STAC https://stacspec.org/ — cataloghi spazio-temporali.
- W3C PROV-O https://www.w3.org/TR/prov-o/ — lineage.
- DuckDB HTTP/parquet https://duckdb.org/docs/stable/core_extensions/httpfs/overview — partial reads.
- WARC ISO 28500 https://www.iso.org/standard/68004.html e Webrecorder https://specs.webrecorder.net/ — archiviazione e replay.
- Wikimedia EventStreams https://wikitech.wikimedia.org/wiki/EventStreams e AT Protocol https://atproto.com/specs/event-stream — event log pubblici.
- Microsoft Graph delta https://learn.microsoft.com/en-us/graph/delta-query-overview — modello cursor e scadenze.
- Great Expectations https://docs.greatexpectations.io/ e Soda https://docs.soda.io/ — data quality osservabile.
- OWASP SSRF https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html — isolamento accesso rete.

## D. Forum e discussioni usati come **spunti**, non come prove

- Hacker News, discussioni su separazione crawling/estrazione, cache/replay, integrazione HTTP+browser.
- Reddit, discussioni su fallimenti silenziosi in produzione, manutenzione selector e allucinazioni/omissioni degli estrattori AI.
- Materiali di marketing dei fornitori: utili per raccogliere claim da testare, mai equivalenti a benchmark indipendenti.

## E. Protocollo di verifica per futuri contributi

Per ogni nuova voce:
1. Titolo/autori/data e **URL primario** verificato.
2. Risultato misurato; quale benchmark, periodo, dataset e condizioni.
3. Limiti e trasferibilità (soprattutto se il caso d'uso non è crawling generalista).
4. Codice disponibile? Licenza, manutenzione, dipendenze, costo d'esecuzione.
5. Cosa cambierebbe nel comportamento di f3tcher rispetto alle baseline.
6. Etichetta **V** dopo controllo diretto; altrimenti **P** e nessun claim forte.

**Non utilizzare** percentuali di questa bibliografia come prestazioni di f3tcher; non affermare che un paper sia peer-reviewed solo sulla base di arXiv; verificare i paper prima di citarli come prova conclusiva.

## F. Integrazione verifiche 2026-11-01: workflow, discovery tipizzata, sincronizzazione, policy (V)

Dettagli, limiti e ipotesi nel [documento 07](07_RICOGNIZIONE_2026-11-01.md). Fonti primarie ricontrollate direttamente:

- OpenAPI Initiative **Arazzo 1.1.0** — https://spec.openapis.org/arazzo/latest.html ; progetto ufficiale https://github.com/OAI/Arazzo-Specification ; toolkit da confrontare https://github.com/usearazzo (pre-1.0, AsyncAPI non eseguibile secondo tabella compatibilità vista).
- **RFC 9264 Linkset** — https://www.rfc-editor.org/rfc/rfc9264.html ; **FAIR Signposting** — https://signposting.org/FAIR/ ; typed links per contenuti, metadati, identificativi e licenze.
- **OData Delta** — https://oasis-tcs.github.io/odata-specs/odata-protocol/odata-protocol.html ; testo evolutivo 4.02, supporto e versione dei server da verificare.
- **W3C ODRL 2.2** — https://www.w3.org/TR/odrl-model/ ; policies di permessi/divieti/doveri; non certificazione automatica di liceità.
- **BagIt RFC 8493** — https://www.rfc-editor.org/info/rfc8493/ ; **OCFL** — https://ocfl.io/ ; integrità/versioni, non completezza web.
- **Garnett et al. (ICML 2012), Bayesian Optimal Active Search and Surveying** — https://publications.ri.cmu.edu/bayesian-optimal-active-search-and-surveying ; ricerca di positivi rari vs stima prevalenza.

Ricontrollati sull'abstract primario, ma **non replicati**: https://arxiv.org/abs/2610.13321 (host-aware); https://arxiv.org/abs/2602.24262 (Web–Knowledge–Web); https://arxiv.org/abs/2607.13636 (core/shell). Per questi tre, l'etichetta P della sezione B resta valida per **risultati dettagliati, codice e trasferibilità**, mentre titolo/abstract sono verificati.

## G. Ricognizione 08: esempi empirici, limiti e fonti rare (2026-11-01)

Dettagli e gradi di evidenza: [08_ADOZIONE_CONSISTENZA_E_LONG_TAIL.md](08_ADOZIONE_CONSISTENZA_E_LONG_TAIL.md). Riferimenti verificati nella documentazione originale:

- **FAIR Signposting Adopters** https://signposting.org/adopters/ — elenco implementazioni dichiarate (es. Dataverse/DSpace/InvenioRDM/Zenodo), con esempio di header Biblio Ghent. Nessuna risorsa live verificata con richiesta nostra.
- **Apples-to-Apples FAIR Signposting** https://w3id.org/a2a-fair-metrics/ — casi di conformità di Link/Linkset (benchmark esistente, **mai eseguito da f3tcher**); quadro https://s11.no/2024/signposting-report/ ; guida di implementazione 2025 https://zenodo.org/records/15064493 .
- **Arazzo Ecosystem** https://usearazzo.com/ecosystem/ — curazione di vendor, aggiornata 2026-10-02; dichiara prevalenza dei tool su 1.0.1 vs spec 1.1.0. Esempio dichiarato da provider https://connectbyjbrh.com/developers/arazzo-workflows/ ; non convalida universale né benchmark.
- **Microsoft Graph delta** https://learn.microsoft.com/en-us/graph/delta-query-overview e https://learn.microsoft.com/en-us/graph/api/listitem-delta?view=graph-rest-1.0 — duplicati, riordino, ritardi, gap non tracciati, token 410; lo stato finale non corrisponde a tutte le variazioni intermedie.
- **Zendesk Offset Pagination Limitations** https://developer.zendesk.com/documentation/api-basics/pagination/understanding-the-limitations-of-offset-pagination/ — record duplicati/saltati in liste mutate durante la scansione.
- **Debezium PostgreSQL CDC** https://debezium.io/documentation/reference/stable/connectors/postgresql.html — snapshot e capture log insieme; modello di riferimento **non trasferibile senza CDC** a API pubbliche.
- **Brown et al. 2025, Big Data & Society** https://journals.sagepub.com/doi/10.1177/20539517251381686 — framing/sampling, accessibilità e non-random missingness.
- **Hagar & Bandy 2025, ICWSM** https://ojs.aaai.org/index.php/ICWSM/article/view/35948 — dati su 96 snapshot Common Crawl e sulle inclusioni e filtraggio dei corpora; lo studio non misura la copertura di f3tcher.
- **Ostendorff 2026, ACL Anthology** https://aclanthology.org/2026.wac-1.7/ — pubblicazione confermata per filone host-aware (era in P in B); il rendimento per pretraining non è un criterio universale.
- **Cothey 2004, JASIST** https://onlinelibrary.wiley.com/doi/10.1002/asi.20078 — bias intrinseci delle politiche di crawling.

**Nota di stato:** queste sono fonti consultate e risultati riportati dagli autori, non esperimenti replicati o decisioni sul futuro motore.
