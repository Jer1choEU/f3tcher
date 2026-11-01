# 09 — Completezza dimostrabile per perimetri, incertezza statistica e verifica delle estrazioni

**Data della ricognizione:** 2026-11-01. **Fase:** ricerca, nessun software, benchmark, test su sorgenti o architettura approvata. Integra i documenti [07](07_RICOGNIZIONE_2026-11-01.md) e [08](08_ADOZIONE_CONSISTENZA_E_LONG_TAIL.md), senza sostituirli. Fonti primarie verificate direttamente come articoli/abstract, standard o documentazioni; paper non replicati. L'etichetta **V** riguarda la consultazione della fonte, **non** la convalida sperimentale di f3tcher; **H** indica una nuova ipotesi da sottoporre a prova.

## Risultato principale: non esiste un solo significato di completezza

La completezza ha almeno dimensioni non intercambiabili:

1. **Query / inventory completeness**: per una specifica interrogazione, un perimetro e una versione/istante di riferimento, la raccolta comprende tutte le risorse che un *inventario autorevole rispetto a quel perimetro* dichiara. Questo **non** prova che l'inventario copra tutto ciò che esiste nella realtà.
2. **Population coverage estimation**: quando l'inventario esaustivo manca, è possibile stimare un totale non osservato **solo sotto assunzioni identificative esplicite**; altrimenti la conclusione corretta è **non stimabile**.
3. **Temporal completeness**: specchio dello stato corrente, presenza di tutti gli eventi intermedi e disponibilità di eventi entro una finestra temporale sono proprietà distinte; nessun watermark locale trasforma automaticamente un flusso imperfetto in una storia completa.
4. **Extraction/field completeness**: un file può essere integro e lo schema JSON formalmente valido, ma mancare righe, pagine, campi, entità o versioni; servono metodi di valutazione sensibili al tipo di campo e alle liste.
5. **Evidential / legal boundaries**: una dichiarazione di completezza è attendibile solo se accompagnata da fonte dell'affermazione, perimetro, epoca, condizioni e diritti. Una pagina pubblica non autorizza automaticamente riuso.

**H — scoped completeness claims:** studiare un modello teorico per esprimere attestazioni *limitate e revocabili* anziché un punteggio globale: `risorsa/fonte + query + periodo/istantanea + inventario/versione + tipo di prova + premesse + osservazione + diritti + scadenza`. Questo non è un componente approvato, uno schema definitivo né una garanzia universale.

## A. Ricerche sulla completezza locale delle interrogazioni (V)

**V1 — Razniewski & Nutt (2011), _Completeness of Queries over Incomplete Databases_**, PVLDB 4(11), pp. 749–760.
- Fonte primaria: https://www.vldb.org/pvldb/vol4/p749-razniewski.pdf (titolo, abstract e prima pagina controllati).
- Il lavoro distingue **table completeness statements** e **query completeness statements**; studia in quali condizioni dichiarazioni riguardanti parti della base dati permettono di inferire la completezza delle risposte a determinate query.
- **Trasferibilità limitata:** il quadro formale presuppone dichiarazioni di completezza corrette rispetto a un database ideale e dipende dalla classe di query. Un inventario web non diventa automaticamente attendibile perché f3tcher lo ha letto.

**V2 — Darari, Nutt, Pirrò & Razniewski (2018), _Completeness Management for RDF Data Sources_**, ACM Transactions on the Web 12(3).
- Fonte primaria: https://doi.org/10.1145/3196248 ; scheda istituzionale: https://research.uniroma1.it/en/pubblicazioni/53908 .
- Estende il ragionamento a sorgenti RDF e a *completeness statements* per parti dei dati, utilizzabili per annotare con informazioni di completezza le risposte a query.
- **Non** dimostra che RDF in generale sia completo; il Web semantico usa di norma l'ipotesi *open world*.

**V3 — Darari et al. (2020), _Completeness and Soundness Guarantees for Conjunctive SPARQL Queries over RDF Data Sources with Completeness Statements_**, Semantic Web 11(3).
- Fonte: https://doi.org/10.3233/SW-190344 ; record istituzionale: https://bia.unibz.it/esploro/outputs/journalArticle/Completeness-and-soundness-guarantees-for-conjunctive/991005834451601241 .
- Distinguere *assenza del dato* da *dato attestato come assente* è critico, soprattutto con negazione. Un sistema che non trova documenti **non** può concludere automaticamente che non esistano.

**V4 — W3C SHACL Recommendation**: https://www.w3.org/TR/shacl/
- SHACL verifica che un grafo dati soddisfi condizioni strutturali espresse in uno shapes graph. **Schema conformance ≠ population completeness**: passare la validazione sulle entità presenti non dimostra che non ne manchino altre.

**V5 — W3C Data Quality Vocabulary (DQV)**: https://www.w3.org/TR/vocab-dqv/
- Vocabolario per descrivere dimensioni/misure della qualità di dataset, inclusa la *completeness*. Una misura documentata non è una prova che il valore dichiarato sia corretto.

### H1 — Approccio falsificabile, non ancora deciso

Testbed con: inventario ufficiale autorevole per una collezione e periodo, inventario intenzionalmente parziale, duplicati, elementi rimossi, delta in ritardo e query ristrette a intervalli. Confrontare:
- report di un crawler che dichiara soltanto `success`;
- report che dichiara `completo rispetto all'inventario I/versione V/tempo T`, `incompleto`, oppure `ignoto`.
- Indicatore principale: **falsi claim di completezza** e capacità di riconoscere l'assenza di base probatoria, non la percentuale alta.

## B. Popolazioni non osservate: ipotesi ineliminabili (V)

**V6 — _The central role of the identifying assumption in population size estimation_**, Biometrics 80(1), 2024.
- https://academic.oup.com/biometrics/article/80/1/ujad028/7624336 .
- La *multiple-systems estimation / capture–recapture* è un problema di dati mancanti: con gli stessi record osservati si possono avere stime arbitrariamente divergenti se cambiano le assunzioni identificative non verificabili. Se manca un'ipotesi adeguata, gli autori raccomandano **di non produrre una stima**.
- **Ricaduta:** confrontare URL da sitemap/API/feed/archivi può essere utile come controllo differenziale, ma le loro dipendenze (e gli stessi criteri di selezione) vietano di trattarli come campioni indipendenti senza prova.

**V7 — Chao & Jost (2012), _Coverage-based rarefaction and extrapolation: standardizing samples by completeness rather than size_**, Ecology.
- https://doi.org/10.1890/11-1952.1 ; scheda https://pubmed.ncbi.nlm.nih.gov/23431585/ .
- Studia la **sample coverage**, proporzione della probabilità di osservazione relativa alle specie già individuate, distinta dalla frazione di tutte le specie/URL scoperte; applicabile sotto ipotesi di campionamento definite. NON usare la stima `1 - singletons/n` come percentuale di URL del Web acquisiti.
- **Ricaduta:** utile per studiare scoperta in collezioni campionate, ma serve formalizzare il meccanismo di campionamento; non mescolare ogni metodo in un unico score.

**V8 — Chao et al. (2014), _Rarefaction and extrapolation with Hill numbers_**, Ecological Monographs.
- https://doi.org/10.1890/13-0133.1 .
- Descrive confronti standardizzati per numero di campioni e loro completezza; l'estrapolazione a lunga distanza può perdere accuratezza e dipende dalla diversità del campione.

### H2 — Una conclusione valida può essere «non stimabile»

Simulare collezioni con:
- probabilità di scoperta omogenee vs diseguali;
- canali indipendenti vs dipendenti;
- popolazioni stabili vs pagine che nascono/scompaiono;
- fonti poco connesse vs sovra-rappresentate.
Misurare anche *miscalibration*, intervalli che non contengono il valore vero e frequenza con cui il sistema rifiuta correttamente una stima. Mai interpretare `coverage by sample mass` come percentuale di risorse recuperate.

## C. Consistenza temporale: watermark come dichiarazione, non oracolo (V)

**V9 — Apache Flink, _Streaming Analytics_**: https://nightlies.apache.org/flink/flink-docs-master/docs/learn-flink/streaming_analytics/ .
- Event time, ingestion time e processing time hanno semantiche diverse. I **watermark** esprimono progresso stimato fino a un timestamp. La documentazione tratta esplicitamente il compromesso latenza/completezza, i late arrivals e risultati aggiornabili.
- **Per f3tcher:** ricevere un delta token o completare una scansione non garantisce che tutti i cambiamenti futuri o intermedi siano già stati osservati. Se si adotta un modello watermark, è un'**asserzione della fonte o dell'algoritmo**, soggetta a violazioni/ritardi.

**V10 — Debezium, _Incremental snapshot design (DDD-8)_**: https://github.com/debezium/debezium-design-documents/blob/main/DDD-8.md ; documentazione https://debezium.io/documentation/reference/stable/connectors/mysql.html .
- Snapshot a chunk intrecciati al change stream utilizzano watermarks e deduplicazione per gestire collisioni fra immagine corrente ed eventi di modifica.
- **Limite decisivo:** queste garanzie si appoggiano a log transazionali/ID e funzioni della sorgente. Una API REST o un feed RSS comuni non forniscono automaticamente le stesse proprietà.

### H3 — Contratti di tempo e recupero differenziati

Distinguere a livello concettuale:
- `snapshot-consistent` (fotografia coerente *se* supportata);
- `event-history-complete` (tutti i cambiamenti intermedi, molto più difficile);
- `best-effort/current-state` (copia riconciliata per l'inventario noto, storico incompleto);
- `unknown-after-gap` (finestra persa, token scaduto, ritardi non delimitati).
Non sono profili selezionabili: sono **proprietà delle evidenze disponibili**, da confermare in ciascuna sorgente. Le assenze non diventano cancellazioni certe senza tombstone o verifica appropriata.

## D. Estrazione: due benchmark diversi chiamati «ExtractBench» (V)

**V11 — Ferguson et al. (febbraio 2026), _ExtractBench: A Benchmark and Evaluation Methodology for Complex Structured Extraction_**.
- https://arxiv.org/abs/2602.12247 ; codice https://github.com/ContextualAI/extract-bench .
- **35 PDF**, **12.867 campi valutabili**, 5 schemi; metriche per campo (exact, numeric tolerance, semantic), liste e gestione esplicita di missing/null. Autori riportano difficoltà dei modelli su schemi molto ampi. Numeri/risultati dagli autori, **non** riprodotti da f3tcher.

**V12 — Zhang et al. (luglio 2026), _ExtractBench: A Benchmark for Schema-Guided Enterprise Document Extraction_**.
- https://arxiv.org/abs/2607.29677 ; codice https://github.com/run-llama/ExtractBench ; https://www.extractbench.ai/ .
- **370 documenti**, **4.869 pagine**, 8 domini e 67 tipologie di documenti. Valuta completezza delle liste, grounding a livello di parola/pagina e costo. Gli autori riportano che su documenti lunghi si possono perdere righe nonostante i valori trovati siano corretti.
- Il nome *ExtractBench* è ambiguo: **non aggregare i punteggi fra le due pubblicazioni**, i dataset/criteri differiscono. Le leaderboard dei fornitori sono risultati dichiarati nel proprio setting.

**V13 — W3C SHACL (vedi V4) e JSON Schema** sono controlli di conformità delle strutture; non sostituiscono una valutazione contro un gold standard che includa **tutti gli elementi attesi**.

### H4 — Test specifici di omissione

In un eventuale testbed autorizzato:
- PDF con righe ripetute, tabelle su più pagine, celle vuote, riferimenti e versioni;
- separare **field precision**, **field recall**, **record-list recall**, **document completeness**, **source grounding precision** e **costo**;
- ottenere un `JSON valid` non deve essere conteggiato come estrazione completa;
- includere deliberatamente fallimenti e documenti non processati nel denominatore (principio adottato nel benchmark run-llama), evitando il survivorship bias.

## E. Ipotesi di salto di qualità da confrontare, non da implementare

**H5 — Evidence-scoped acquisition:** valutare se un unico motore che tracci *per quale collezione, periodo, query e versione esista una prova/assunzione di completezza* riduca i falsi successi rispetto a un motore che mostra solo contatori e HTTP 200.

**H6 — Negative evidence discipline:** una risposta vuota, un errore HTTP 404, nessun risultato dalla ricerca, nessun evento entro il watermark o una pagina senza allegati hanno significati diversi; senza perimetro verificato l'assenza va marcata **non osservata**, non **inesistente**.

**H7 — Failure-aware extraction:** comparare parser unico, router multi-parser e controllo differenziale su dataset documentali; capire quando la verifica stessa costa più del guadagno di recall e se un verifier LLM introduce errori sistematici.

**H8 — Calibrated uncertainty:** prove con percentuali volutamente ingannevoli, fonti dipendenti e dati MNAR; valutare la *capacità di non emettere affermazioni non giustificate*, oltre alla copertura osservata.

Tutte le H sono piste. Nessuna implica una gerarchia di sistemi, un DSL scelto, un protocollo interno fisso o l'uso obbligatorio di AI.

## F. Nuova priorità di indagine, senza roadmap esecutiva

1. Casi concreti di **inventari autorevoli versionati** (data catalogs, collezioni archivistiche, registri periodici) dove sia possibile verificare una query limitata, distinguendoli da inventari auto-dichiarati e incompleti.
2. Condizioni in cui modelli statistici di copertura *identificano* una popolazione; test su dipendenze e cambiamenti nel tempo.
3. Delta feeds con eventuale garanzia di snapshot consistency, delete markers e late-event handling documentate, non inferite.
4. Confronto metodologico dei **due ExtractBench** e di benchmark di liste lunghe, separando record-level recall da campo-level precision.
5. Verifiche sulla liceità del dataset/benchmark prima di ogni riproduzione; nessun contenuto non autorizzato entra in f3tcher.

## Stato di chiusura

- **Solo ricerca e documentazione**. Nessuna architettura definita, codice, test, benchmark, accesso a fonti protette o deployment.
- È stata verificata documentalmente una base formale per la **completezza relativa a query/perimetri**, insieme a limiti forti delle stime statistiche e dell'uso di watermark.
- La peculiarità da verificare non è una promessa di *100% assoluto*, ma la possibilità di **formulare e controllare claim locali, falsificabili e accompagnati dalle loro premesse**.
