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
- *ExtractBench* (luglio 2026) — ora **identificato come Zhang et al., run-llama**, https://arxiv.org/abs/2607.29677 ; distinto dall'omonimo Ferguson et al. (febbraio 2026), https://arxiv.org/abs/2602.12247 . Entrambi verificati nelle fonti primarie; vedere ricognizione 09.
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

## H. Nuova ricognizione 09: completezza per query e limiti dell'inferenza (2026-11-01)

[Ricognizione integrale e ipotesi](09_COMPLETEZZA_LOCALE_E_PROVE.md). Fonti primarie **verificate documentalmente**, non replicate:

- **Razniewski e Nutt (2011), PVLDB**, *Completeness of Queries over Incomplete Databases*: https://www.vldb.org/pvldb/vol4/p749-razniewski.pdf — completezza locale delle query derivata da dichiarazioni di completezza di tabelle/parziali.
- **Darari et al. (2018), ACM Transactions on the Web**, *Completeness Management for RDF Data Sources*: https://doi.org/10.1145/3196248 — annotare basi RDF parzialmente complete e risposte a query; scheda https://research.uniroma1.it/en/pubblicazioni/53908 .
- **Darari et al. (2020), Semantic Web**, *Completeness and Soundness Guarantees for Conjunctive SPARQL Queries*: https://doi.org/10.3233/SW-190344 — open world e negazioni; prove locali da completeness statements.
- **Biometrics (2024)**, *The central role of the identifying assumption in population size estimation*: https://academic.oup.com/biometrics/article/80/1/ujad028/7624336 — senza assunzioni identificative adeguate, stime della popolazione assente non giustificate.
- **Chao e Jost (2012), Ecology**, *Coverage-based rarefaction and extrapolation*: https://doi.org/10.1890/11-1952.1 — sample coverage **non è** frazione degli URL del Web.
- **Chao et al. (2014), Ecological Monographs**: https://doi.org/10.1890/13-0133.1 — estrapolazioni limitate dalla diversità e dal campionamento.
- **Apache Flink docs**, https://nightlies.apache.org/flink/flink-docs-master/docs/learn-flink/streaming_analytics/ — eventi tardivi/watermark come segnale e trade-off, non certezza universale.
- **Debezium DDD-8**, https://github.com/debezium/debezium-design-documents/blob/main/DDD-8.md — incremental snapshot, collision resolution e dependence da transaction logs.
- **SHACL W3C** https://www.w3.org/TR/shacl/ e **DQV** https://www.w3.org/TR/vocab-dqv/ — conformance e qualità, non completezza popolazione.
- **ExtractBench 1 (Ferguson et al., febbraio 2026)** https://arxiv.org/abs/2602.12247 ; codice https://github.com/ContextualAI/extract-bench — 35 PDF/12.867 campi.
- **ExtractBench 2 (Zhang et al., luglio 2026)** https://arxiv.org/abs/2607.29677 ; codice https://github.com/run-llama/ExtractBench — 370 documenti/4.869 pagine; rubriche completezza liste/grounding/costo. **Non unire le due classifiche.**

## I. Ricognizione 10 — inventari, retention, stato dei dump e limiti delle prove (2026-11-01)

[Analisi integrale](10_INVENTARI_E_GARANZIE.md). Fonti **primarie controllate documentalmente**, nessun endpoint testato o benchmark f3tcher:
- Wikimedia Meta-Wiki, [Data dumps/Monitoring](https://meta.wikimedia.org/wiki/Data_dumps/Monitoring): `dumpstatus.json`, `report.json`, stato per job, file, dimensione e checksum opzionali; non dimostra completezza assoluta dei contenuti Wikimedia. Materiale aggiuntivo da riverificare: https://wikitech.wikimedia.org/wiki/MediaWiki_Content_File_Exports .
- Crossref, [Public data files and snapshots](https://www.crossref.org/documentation/retrieve-metadata/bulk-downloads/) e [REST API tips](https://www.crossref.org/documentation/retrieve-metadata/rest-api/tips-for-using-the-crossref-rest-api/): bulk annuale pubblico; snapshot mensili premium; filtri `created/update/index`; possibili differenze durante reindex/paginazione.
- OpenAlex, [Download Changefiles](https://developers.openalex.org/download/changefiles): snapshot pubblico trimestrale; mensile e changefile giornalieri premium; ultimi **60 giorni** disponibili, upsert per id; **non** promettere delete/history completi.
- GBIF, [Citation guidelines](https://www.gbif.org/citation-guidelines), [FAQ](https://www.gbif.org/faq) e [Occurrence API](https://techdocs.gbif.org/en/openapi/v1/occurrence): DOI e metadati di download; file potenzialmente eliminati dopo sei mesi, DOI non implica bytes permanenti.
- ResourceSync 1.1, [Framework Specification](https://www.openarchives.org/rs/1.1/resourcesync_highlighted): Resource List/Dump, Change List/Dump, intervalli, delete, audit; durata delle liste di modifica non imposta in generale.
- OAI-PMH 2.0, [protocollo](https://www.openarchives.org/OAI/openarchivesprotocol.html) e [repository guidelines](https://www.openarchives.org/OAI/2.0/guidelines-repository.htm): `completeListSize` facoltativo/anche stimato, `resumptionToken` e comportamento a fonte in mutazione, `deletedRecord=no|transient|persistent`.
- RFC 9162, [Certificate Transparency v2](https://www.rfc-editor.org/rfc/rfc9162.html): inclusion/consistency proofs di un log, **non** censimento del mondo; RFC sperimentale, attenzione a viste incoerenti.

**Nuova distinzione:** «referenziabile», «i byte sono disponibili», «integro rispetto a manifest», «copia dello stato corrente» e «storia degli eventi completa» non sono sinonimi. Le cinque famiglie di test nel documento 10 sono **ipotesi**; nessuna prova f3tcher eseguita.

## J. Ricognizione 11 — copia, provenienza e attestazioni verificabili (2026-11-01)

Dettagli, limiti e ipotesi in [11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md](11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md). Tutte **fonti primarie consultate (V)**, **nessun risultato replicato** o test f3tcher:
- **Dong, Berti-Equille, Srivastava (2009), PVLDB**, *Truth Discovery and Copying Detection in a Dynamic World* — https://www.vldb.org/pvldb/vol2/vldb09-335.pdf : copying dependence e qualità/freschezza temporale; risultati specifici agli scenari studiati.
- **Berti-Equille, Dong, Hu, Srivastava (2010), PVLDB**, *Global Detection of Complex Copying Relationships Between Sources* — https://vldb.org/pvldb/vol3/R120.pdf : co-copying e copying transitivo; inferire un rapporto diretto da somiglianze a coppie può essere fuorviante.
- **Dong et al., Data Fusion: Resolving Conflicts from Multiple Sources** — https://research.google.com/pubs/archive/41657.pdf : accordi/errori condivisi come indizi di copia, non prova; alcune fonti copiano solo parte dei dati.
- **W3C PROV-O** https://www.w3.org/TR/prov-o/ e **PROV Constraints** https://www.w3.org/TR/prov-constraints/ : derivazione, attribuzione, revisione e vincoli di consistenza. *Grafo formalmente valido non significa fonte vera*.
- **Cheney, Chiticariu, Tan, Provenance in Databases: Why, How, and Where** — https://research.ibm.com/publications/provenance-in-databases-why-how-and-where : nozioni distinte di provenance nelle query.
- **Green, Karvounarakis, Tannen (2007), PODS, Provenance Semirings** — https://web.cs.ucdavis.edu/~green/papers/pods07.pdf : annotazioni per tracciare contributi alle query, senza obbligo di adottarle nel progetto.
- **The Update Framework / TUF** https://theupdateframework.org/docs/metadata/ ; specifiche https://theupdateframework.github.io/specification/ : root/targets/snapshot/timestamp, versioni, firme, rollback e scadenze, in repository compatibili.
- **C2SP Transparency Log Witness Protocol v1.1.0** https://c2sp.org/tlog-witness@v1.1.0 ; **trust policy** https://c2sp.org/tlog-policy : cosignature dei checkpoint che verificano continuità del *log*, non verità del dato.
- **RFC 9942 (giugno 2026), COSE Receipts** https://www.rfc-editor.org/rfc/rfc9942 : prove per strutture verificabili, anche non-inclusione per strutture che la supportano; mai assenza universale.
- **RFC 9943 (2026), SCITT Architecture** https://www.rfc-editor.org/rfc/rfc9943 : statements firmati + receipts di un servizio trasparente; trasparenza non impedisce a un emittente disonesto di fare dichiarazioni false.

Attenzione alla polisemia di **indipendenza**: fonti indipendenti come origine fattuale, verificatori indipendenti di un log e chiavi indipendenti per una firma sono proprietà differenti.

## K. Ricognizione 12 — genealogie e benchmark di riutilizzo testuale (2026-11-01)

Consultazione diretta di **fonti primarie (V)**, niente dati scaricati o test f3tcher. Per limiti e ipotesi leggere [12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md](12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md).

- **METER**, Clough et al. 2002, ACL: https://doi.org/10.3115/1073083.1073110 ; descrizione corpus https://eprints.whiterose.ac.uk/id/eprint/78663/ . Testo di giornali vs UK Press Association, riuso e indipendenza annotati. **Diritti e accesso al corpus non verificati**.
- **COUNTER**, Muhammad, Nawab, Rayson, Lancaster: https://ucrel.lancs.ac.uk/textreuse/counter.php ; https://research.lancaster-university.uk/en/datasets/corpus-of-urdu-news-text-reuse-counter/ ; 600 coppie, derivazione totale/parziale/assente; **CC BY-NC-SA 4.0 e restrizione dichiarata all'uso di ricerca/accademia**.
- **USTRC**, Lancaster: https://ucrel.lancs.ac.uk/textreuse/ustrc.php ; 2.684 coppie brevi urdu, copie/parafrasi/indipendenti, **CC BY-NC-SA**.
- **PAN-PC-11**, Webis/Zenodo: https://zenodo.org/records/3250095 ; https://webis.de/data/pan-pc-11.html ; ground truth di casi artificiali e simulati, usabilità per ricerca non licenza generica.
- **PAN @ CLEF 2025**, https://pan.webis.de/clef25/pan25-web/generated-plagiarism-detection.html ; span di plagio con parafrasi LLM, copyright/research only/no redistribution.
- **PAN @ CLEF 2026**, https://pan.webis.de/clef26/pan26-web/generated-plagiarism-detection.html ; retrieval di **multiple (min 2) fonti** usate per produrre documento generato, Recall@10/100, nDCG@10, TIRA, dati protetti **solo ricerca/no redistribuzione**.
- **NewsEdits**, NAACL 2022: https://aclanthology.org/2022.naacl-main.10/ ; https://github.com/isi-nlp/NewsEdits ; 1,2M articoli/4,6M versioni (autori); versioning intra-articolo, non grafo di copia inter-editoriale.
- **DataDignity / FakeWiki**, Microsoft Research 2026, https://www.microsoft.com/en-us/research/publication/datadignity-training-data-attribution-for-large-language-models/ ; https://arxiv.org/abs/2605.05687 (preprint): anti-documents sullo stesso tema ma senza fatto critico, corpus sintetico e task di attribuzione di LLM, non copia giornalistica.
- **MAVIS**, AAAI 2026 https://ojs.aaai.org/index.php/AAAI/article/view/40585 ; source attribution multimodale a livello di fatto, non relazioni di derivazione dei siti.
- **Longpre et al. (2024), Nature Machine Intelligence**, https://www.nature.com/articles/s42256-024-00878-8 : audit provenienza/licenze di 1.858 dataset; etichette di un mirror possono essere imprecise.
- **W3C PROV-O qualified derivation**, https://www.w3.org/TR/prov-o/ : supporta dichiarazioni qualificate di derivazione, non prova automatica di copia.

**Non** usare una classifica unica per METER, COUNTER, PAN, NewsEdits, DataDignity e MAVIS: target, gold truth, lingua, epoca e condizioni sono diversi.

## L. Ricognizione 13 — genealogia da cascades e astensione (2026-11-01)

Fonti **primarie verificate** e avvertenze nel [documento 13](13_DIFFUSIONE_IDENTIFICABILITA_E_ASTENSIONE.md). Nessun algoritmo replicato o benchmark f3tcher.

- **NETINF** (Gomez-Rodriguez, Leskovec, Krause, KDD 2010): https://snap.stanford.edu/netinf/ — codice, cascate e output di rete di diffusione **inferito**, non ground truth causale.
- **MemeTracker**, SNAP https://snap.stanford.edu/data/memetracker9.html ; dati/formato https://snap.stanford.edu/memetracker/data.html — 96.608.034 documenti, 210.999.824 occorrenze frasi, 418.237.269 hyperlink; timestamp e link **non provano** copia.
- **NIFTY** (Stanford) https://snap.stanford.edu/nifty/about.html — clustering incrementale delle varianti delle frasi, claims di prestazioni degli autori non verificati indipendentemente.
- **Farajtabar et al. (AISTATS 2015)** https://proceedings.mlr.press/v38/farajtabar15.html — source inference da cascades parziali sotto modello.
- **Zhu/Ying (IEEE INFOCOM 2016)** https://asu.elsevierpure.com/en/publications/information-source-detection-in-networks-possibility-and-impossib/ — zone di possibilità/impossibilità in un modello di diffusione; non prova per Web generico.
- **Dawkins/Li/Xu (ICML 2021)** https://proceedings.mlr.press/v139/dawkins21a.html — insiemi di possibili origini e garanzia statistica nelle condizioni del paper.
- **Feizi et al. (IEEE TNSE 2019)** https://dspace.mit.edu/entities/publication/d86ff728-02e6-40c1-9c7c-56b849241087 — Network Infusion, modelli di sorgente singola/multipla.
- **Geifman/El-Yaniv (NeurIPS 2017)** https://papers.neurips.cc/paper_files/paper/2017/hash/4a8423d5e91fda00bb7e46540e2b0cf1-Abstract.html ; **SelectiveNet (ICML 2019)** https://proceedings.mlr.press/v97/geifman19a.html — risk-coverage con reject option.
- **Angelopoulos et al. (ICLR 2024)** https://proceedings.iclr.cc/paper_files/paper/2024/hash/f3549ef9b5ff520a7e41ff3cc306ab2b-Abstract-Conference.html — conformal risk control; non garanzia di genealogia vera se upstream non osservato.
- **Zhou et al. (ACM Computing Surveys 2025)** https://doi.org/10.1145/3736575 — exchangeability e limiti in caso di distribution shift.

Nuovo problema esplicito: **source attribution calibrata con astensione e candidati assenti**. Non confondere `NETINF predicted edge`, `hyperlink`, `source citation` e `real causal copy`. La letteratura delle reti fornisce *metodi* ma non sostituisce il gold truth editoriale. Lo studio ulteriore su *Structure and Dynamics of Information Pathways in Online Media* è **P** e resta da verificare prima di riassumerne risultati.

## M. Ricognizione 14 — active provenance, informazione e politiche di acquisizione (2026-11-01)

Fonti **primarie consultate direttamente**; limiti e ipotesi nel [documento 14](14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md). Sono risultati degli autori, **non** benchmark f3tcher:
- **FIRE (Xie et al., NAACL 2025)** https://aclanthology.org/2025.findings-naacl.158/ ; codice degli autori https://github.com/mbzuai-nlp/fire — iterative fact-checking, decisione search/STOP, riduzioni di costo riportate **7,6x LLM / 16,5x ricerca** nel proprio confronto, non genealogia Web garantita.
- **Chen et al. (NAACL 2024), Complex Claim Verification with Evidence Retrieved in the Wild** https://aclanthology.org/2024.naacl-long.196/ — recupero/decomposizione di evidenze pubblicate *prima* del claim, attenzione a temporal leakage.
- **AVeriTeC (NeurIPS 2023)** https://fever.ai/dataset/averitec.html — **4568 claim** con question-answer evidence/justifications, inclusi insufficient/conflicting; fact-checking ≠ causal source lineage.
- **Aronsson, Rahbar, Chehreghani (IJCAI 2026)** https://ijcai.org/proceedings/2026/860 — survey di active feature acquisition, POMDP e STOP, costi e limiti di myopic vs non-myopic.
- **Golovin/Krause (JAIR 2011)** https://ocs.aaai.org/Library/JAIR/Vol42/jair42-012.php — garanzie greedy solo se adaptive submodularity e ipotesi del teorema rispettate.
- **Sloman/Cavagnaro/Broomell (Behavior Research Methods 2024)** https://link.springer.com/article/10.3758/s13428-024-02410-7 — prior scorretto può **amplificare scelta di modello errato** in adaptive design; EIG non è verità.
- **Zhong et al. (SIAM/ASA, goal-oriented experimental design)** https://doi.org/10.1137/24M1649344 — information gain sulla quantity of interest anziché solo parametri; il paper non è un algoritmo di crawling.
- **Prinster et al. (ICML 2024)** https://proceedings.mlr.press/v235/prinster24a.html — active learning induce shift, garanzie conformal in casi particolari; caso più generale dichiarato impraticabile.
- **Gibbs/Candès (JMLR 2024)** https://jmlr.org/beta/papers/v25/22-1218.html — online conformal per distribution shifts, applicabilità condizionata.
- **Madhow et al. (L4DC 2025)** https://proceedings.mlr.press/v283/madhow25a.html — offline evaluation con log raccolti adattivamente, non semplice replay IID.
- **Cief/Kveton/Kompan (AAAI 2025)** https://ojs.aaai.org/index.php/AAAI/article/view/33765 — cross-validating off-policy evaluation, senza che ciò elimini automaticamente confondenti e mancanza di supporto.

**Pista nuova:** *falsification-aware active acquisition* = selezionare evidenze lecite capaci anche di smentire ipotesi esistenti, non solo ridurre incertezza interna al modello. È una **ipotesi di ricerca**, non una tecnologia scelta, né una claim di novità mondiale.

## N. Ricognizione 15 — acquisizione universale multiprotocollo (2026-11-01)

[Studio e gradi evidenza](15_ACQUISIZIONE_UNIVERSALE_PROTOCOLLI_E_CRAWLER.md). **V-spec/V-doc/V-paper** = controllato presso fonte primaria; non dimostrato su istanze f3tcher.

**Cataloghi e discovery verticale**
- W3C **DCAT 3** https://www.w3.org/TR/vocab-dcat/ (Recommendation 22-08-2024): Catalog, Dataset, Distribution, DataService, dataset series e versioning.
- EC **DCAT-AP 3.0.1** https://interoperable-europe.ec.europa.eu/collection/semic-support-centre/solution/dcat-application-profile-data-portals-europe/release/301 (2025): cataloghi pubblici UE, metadata multilanguage/series e SHACL; conformità del singolo publisher da verificare.
- **STAC** https://stacspec.org/en/about/stac-spec/ ; esempio publisher **Copernicus Data Space** https://documentation.dataspace.copernicus.eu/APIs/STAC.html : Collection, Item, Asset e API search/filters; estensioni non universali.
- **OGC API — Records Part 1** https://www.ogc.org/standards/ogcapi-records/ ; https://ogcapi.ogc.org/records/ : ricerca metadati spaziali; Facets/CRUD/Harvest in draft.
- **IIIF Change Discovery 1.0** https://iiif.io/api/discovery/ ; https://iiif.io/api/ ; https://guides.iiif.io/guide_for_implementers/ : flussi Create/Update/Delete e metadata di archivi di immagini/documenti; Content Search è altra API.
- **CKAN API** https://docs.ckan.org/en/latest/api/ : package_list/search/show e resource + datastore; API espone azioni mutative, vietato usarle senza permesso.
- **WebSub**, W3C Recommendation aggiornata 02-06-2026 https://www.w3.org/TR/websub/ : hub/topics/push, nessuna garanzia implicita di storico completo.
- **Schema.org Dataset guidelines** https://developers.google.com/search/docs/appearance/structured-data/dataset : structured data, sitemap, sameAs/canonical, solo segnali di discovery.

**Motori e cattura**
- **Apache StormCrawler 3.7** https://stormcrawler.apache.org/docs/latest/index.html ; https://stormcrawler.apache.org/ : frontend di crawling continuo con politeness per host, sitemap/feed, parser Tika, possibile Playwright; provider docs, non benchmark.
- **Scrapy JOBDIR** https://doc.scrapy.org/en/latest/topics/jobs.html : persistenza e resume su arresto pulito, rischio corruzione con crash e incompatibilità di versioni.
- **Crawlee** https://crawlee.dev/js/docs/quick-start : Cheerio HTTP e Playwright/Puppeteer browser, queue; browser non automaticamente migliore.
- **Browsertrix** https://crawler.docs.browsertrix.com/ ; https://crawler.docs.browsertrix.com/user-guide/outputs/ : Puppeteer/CDP, QA replay, WARC/WACZ, AGPL del repo https://github.com/webrecorder/browsertrix-crawler ; replay != completezza.
- **Docling Supported Formats** https://docling.ai/formats/ : parser multimodale, supporto dichiarato != correttezza del risultato.

**Ricerca scientifica**
- **WebDART**, Findings ACL 2026, https://aclanthology.org/2026.findings-acl.568/ : navigation/extraction/execution re-planning; +13,7 punti percentuali su WebChoreArena **degli autori**, non recall di acquisizione.
- **BaRA**, preprint arXiv 2607.00007, https://arxiv.org/abs/2607.00007 : link discovery e artefatti, **P per testo integrale** (solo abstract d'indice accessibile).
- **Abitov/Dakhnovich/Moskvin 2026** https://jisp.spbstu.ru/en/article/2026.28.7/ : setup LLM costoso + raccolta deterministica su web dinamico; F1=0,89 riportato dagli autori sul loro dataset; non originale di f3tcher.
- **VeriEnv**, ICML 2026 https://proceedings.mlr.press/v306/chae26a.html : training su ambienti web simulati/verificabili, non crawler universal.
- **Review di web scraping**, Data & Knowledge Engineering 2026 https://doi.org/10.1016/j.datak.2026.102598 : abstract/review, testo integrale non analizzato.

## O. Ricognizione 16 — acquisizione specialistica documentata (2026-11-02)

Leggere [16_ACQUISIZIONE_SPECIALISTICA_RICERCA_LEGGI_STATISTICHE_FEDERAZIONE.md](16_ACQUISIZIONE_SPECIALISTICA_RICERCA_LEGGI_STATISTICHE_FEDERAZIONE.md). **V-doc** = documentazione primaria del provider, **V-spec** = standard ufficiale: nessuna implementazione né prova f3tcher.

**Ricerca scientifica e identificatori**
- OpenAIRE Graph API **v3**: https://graph.openaire.eu/docs/apis/graph-api/ — 5 entità, paging offset limitato a 10.000, alternative cursor/full Graph; non full text completo.
- DataCite REST: https://support.datacite.org/docs/api ; https://support.datacite.org/docs/api-queries — public GET DOI metadata vs member write API autenticata; DOI non prova disponibilità file.
- arXiv **bulk OAI-PMH**: https://github.com/arXiv/arxiv-docs/blob/develop/source/help/bulk_data.md ; https://github.com/arXiv/arxiv-docs/blob/develop/source/help/oa/index.md — nightly metadata e solo versione corrente nel feed, full text/terms distinti.
- Europe PMC REST: https://dev.europepmc.org/RestfulWebService ; https://pmc.ncbi.nlm.nih.gov/articles/PMC4383902/ — ricerca metadata e subset OA full text/XML; accessibilità non uniforme.
- Crossref REST: https://www.crossref.org/documentation/retrieve-metadata/rest-api/tips-for-using-the-crossref-rest-api/ — created/update/index cambiano cosa viene recuperato.

**Normativa e politica istituzionale**
- Normattiva: https://dati.normattiva.it/Il-progetto ; https://dati.normattiva.it/Come-scaricare-i-dati — API/OpenAPI, originale/multivigenza, **testi non ufficiali** e selezione redazionale.
- Gazzetta Ufficiale RSS FAQ: https://www.gazzettaufficiale.it/caricaHtml?nomeTiles=faq — sommarî di nuova uscita, non storia consolidata.
- Cellar/EUR-Lex SPARQL/REST: https://op.europa.eu/en/web/cellar/cellar-data/metadata/knowledge-graph ; https://eur-lex.europa.eu/content/help/content/help/data-reuse/reuse-contents-eurlex-details.html?locale=en — work/expression/manifestation/item e Formex per più lingue/formati.
- Parlamento europeo OpenData v2: https://data.europarl.europa.eu/en/developer-corner/opendata-api — feed per classe e limite 500 richieste/5 min per endpoint.
- Congress.gov API v3: https://api.congress.gov/ ; https://www.loc.gov/apis/additional-apis/congress-dot-gov-api/ — bills/actions/amendments/text versions, API key necessaria.
- OASIS Akoma Ntoso: https://docs.oasis-open.org/legaldocml/akn-core/v1.0/os/part1-vocabulary/akn-core-v1.0-os-part1-vocabulary.html — vocabolario XML, non API.

**Statistiche e formati**
- Eurostat APIs: https://ec.europa.eu/eurostat/en/web/user-guides/data-browser/api-data-access/api-introduction ; https://ec.europa.eu/eurostat/en/web/user-guides/data-browser/api-data-access/api-faq — Catalogue, SDMX 3.0, JSON-stat; dati **senza storico delle osservazioni**, strutture versionabili.
- Istat SDMX: https://www.istat.it/classificazioni-e-strumenti/web-services-sdmx/ — IstatData vs I.Stat, **5 query/minuto/IP** oltre cui blocco 1–2 giorni; preservare DSD, codelists e dimensioni.
- SDMX 3.1 spec: https://sdmx.org/standards-2/ ; UN SDG DSD 1.26 (settembre 2026): https://unstats.un.org/sdgs/iaeg-sdgs/sdmx-working-group/
- Frictionless Data Package + Table Schema: https://specs.frictionlessdata.io/guides/data-package/ ; https://specs.frictionlessdata.io/table-schema/ — schema/CSV dialect/risorse; file valido non prova dataset completo.

**Federazione**
- W3C ActivityPub: https://www.w3.org/TR/activitypub/ e ActivityStreams collections https://www.w3.org/TR/activitystreams-core/ — outbox visibile in base a permessi, inbox potenzialmente riservato.
- AT Protocol Sync: https://atproto.com/specs/sync , repository https://atproto.com/specs/repository , blob https://atproto.com/specs/blob — CAR + firehose + signed commits, blob separati; **intero repository filtrato da relay non necessariamente rilevabile**.

**Avvertenza metodologica:** record metadata ≠ file, DOI ≠ download, legge ≠ URL, dataflow/DSD ≠ serie storica di valori, sync del repo ≠ copertura completa dei blob. Non trattare la disponibilità di API come licenza automatica per raccolta massiva.

## P. Ricognizione 17 — brevetti, genomica, patrimonio, preservazione (2026-11-02)

[Documento 17 completo](17_BREVETTI_BIOLOGIA_AUDIOVISIVI_CONSERVAZIONE.md). Tutti i riferimenti seguenti sono pagine **primarie di ente/standard (V-doc o V-spec)**; non sono test f3tcher.

**Brevetti EPO**
- EPO **OPS** https://www.epo.org/en/searching-for-patents/data/web-services/ops ; fair-use https://www.epo.org/en/service-support/ordering/fair-use ; bulk FAQ https://www.epo.org/en/service-support/faq/searching-patents/open-patent-services/general-information/does-ops-permit-bulk — REST/XML OAuth, 4 GB/settimana free, REST bulk max 100 documenti; non mass crawling di Espacenet.
- **European Publication Server** https://www.epo.org/en/searching-for-patents/data/web-services/publication-server — XML/HTML/TIFF/PDF/A e 5 GB per finestra mobile di 7 giorni/IP.
- **DOCDB** https://www.epo.org/en/searching-for-patents/data/bulk-data-sets/docdb — bulk licenziato metadati ST.36, famiglie semplici, abstract/citazioni, **non full text o immagini**.

**Genomica**
- **ENA APIs** https://ena-docs.readthedocs.io/en/latest/retrieval/programmatic-access.html ; https://ena-docs.readthedocs.io/en/latest/retrieval/programmatic-access/advanced-search.html ; overview EMBL-EBI https://www.ebi.ac.uk/training/online/courses/ena-quick-tour/searching-and-visualising-data-ena/ — Portal API, Browser API, download files separati, limite default 100k risultati e raccomandazione ≤10 ricerche simultanee; rapportare record a raw assets.
- **NCBI E-utilities** https://eutilities.github.io/site/API_Key/usageandkey/ ; https://www.ncbi.nlm.nih.gov/books/NBK25497/ — default 3 richieste/s senza key, 10/s con key, batch via History; **NCBI Datasets** https://www.ncbi.nlm.nih.gov/datasets/docs/v2/api/api-keys/ — default **5** richieste/s, 10 con key. Distinguere i servizi.

**Audiovisivi e cultura**
- **Europeana APIs** https://www.europeana.eu/eu/apis ; https://europeana.atlassian.net/wiki/spaces/EF/pages/2360508417 — Search/Record/IIIF/SPARQL/OAI, metadata CC0 ma **media con diritti separati**; richieste con API key per search.
- **EBUCore v1.10** https://tech.ebu.ch/publications/tech3293?categoryFilter=presentations ; schema https://www.ebu.ch/metadata/schemas/EBUCore/documentation/ebucore.indexListcomp.html — metadata A/V/segmenti/timed text.
- **W3C WebVTT** https://www.w3.org/TR/webvtt1/ — Candidate Recommendation Draft (20 maggio 2026), sottotitoli e metadata temporali.

**Archivi e pacchetti**
- **METS** https://loc.gov/standards/mets/METSOverview.v3_en.html — fileSec/structMap, logical/physical maps, puntatori ad altri files/METS.
- **PREMIS 3.0** https://www.loc.gov/standards/premis/v3/ — Objects/Events/Rights/Agents, non autenticità garantita.
- **E-ARK** https://digital-strategy.ec.europa.eu/en/policies/earchiving-specifications — CSIP/SIP/AIP/DIP e Content Information Type Specifications; DIP potenzialmente parziale rispetto all'AIP.
- **BagIt RFC 8493** https://www.rfc-editor.org/rfc/rfc8493.html — *complete* vs *valid* con manifest e checksum, `fetch.txt` remoto opzionale e security consideration per path traversal; non prova della copertura esterna.

**Research gap:** *compound-object acquisition*: un record indicizzato può non rappresentare tutti i componenti, le versioni, le tracce, i diritti o i bytes; resta un'ipotesi di benchmark e non una nuova architettura.
