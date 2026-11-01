# 18 — Sintesi comparativa: quali capacità servono davvero e che cosa manca alla ricerca

**Data ricognizione:** 2026-11-02. **Tipo di lavoro:** sintesi e audit comparativo della documentazione [00](00_STATO_E_DECISIONI.md)–[17](17_BREVETTI_BIOLOGIA_AUDIOVISIVI_CONSERVAZIONE.md). **Stato invariato:** non esistono ancora software f3tcher, architettura, stack, benchmark, adattatori, prove di conformità o deployment approvati. Le tabelle qui sotto **non** costituiscono una distinta dei componenti da installare. È sempre un **solo motore automatico senza profili selezionabili**, massimamente capace entro limiti tecnici/legali.

**Legenda:** **E** = capacità o limite documentato presso una fonte esterna o nel registro della ricerca; **H** = combinazione/beneficio ipotizzato per f3tcher; **U** = domanda non risolta. Nessun test indipendente di f3tcher. «Esiste uno standard/prodotto» non implica che funzioni sulla specifica istanza, che sia concesso usarlo o che sia più efficace. Le affermazioni prestazionali dei vendor sono **T** e vanno verificate. I rimandi ai documenti della repo e alle fonti primarie permettono di risalire alle premesse.

## 1. Diagnosi della ricerca: profondità sbilanciata, ma senza vuoti teorici insormontabili noti

Da [01](01_ATLANTE_FUNZIONALITA.md), [02](02_PROGETTI_E_TECNOLOGIE.md), [03](03_STUDI_E_FONTI.md), [05](05_DOMANDE_E_BENCHMARK.md) e ricognizioni [07](07_RICOGNIZIONE_2026-11-01.md)–[17](17_BREVETTI_BIOLOGIA_AUDIOVISIVI_CONSERVAZIONE.md):

**Coperti documentalmente, ma NON validati sperimentalmente:**
- Discovery HTML/sitemap/feed, protocol-first, archivi, cataloghi open data, API di settore, dati federati e streaming.
- Crawling distribuito/continuous frontier, HTTP vs browser e cattura WARC/WACZ.
- Documenti/PDF/XML/CSV, oggetti multi-file, media e formati verticali.
- Snapshot e delta, limiti di paging e storia, deduplica e provenienza, falsi «success» e prove locali di completezza.
- Pianificazione adattiva, focused crawl, attribuzione della provenienza e valore della prossima prova.
- Limiti legali, quote, licenze dei file/dataset e sicurezza dei manifest.

**Ancora insufficientemente studiati o misurati:**
- Frequenza reale di protocolli funzionanti sulle sorgenti che ci interessano; *specification coverage* ≠ *ecosystem adoption*.
- Costi e prestazioni di scelta automatica API/bulk/HTTP/browser/render/archivio; quanti falsi negativi evita l'escalation?
- Costi operativi/di storage e profili di errore su scala con limiti per host; budget teorico non è throughput misurato.
- Metriche comparabili di **risorse uniche, componenti, revisioni e campi** e benchmark eterogenei senza falsi denominatori.
- Compatibilità di licenze e reale maturità/gestibilità delle implementazioni proposte.
- Trade-off tra ricchezza del sistema (più tecniche) e sua affidabilità/operabilità (più failure modes).

**Conclusione:** prima di altre rassegne estese, la ricerca rende di più se è **comparativa e discriminante**, cioè se può escludere o declassare alcune opzioni. Non trasformare il numero delle ricognizioni o una «percentuale di avanzamento» in metrica scientifica.

## 2. Atlante trasversale delle capacità: somiglianze, differenze e limiti

| Problema reale | Tecniche/progetti già individuati (non necessari tutti) | Sovrapposizione / complementarità | Proprietà che **non** viene dimostrata | Fonti repo |
|---|---|---|---|---|
| Esplorazione link HTML e frontier | Crawlee, Scrapy, Heritrix, Apache StormCrawler, URL Frontier, Katana, Spider | Ampia **sovrapposizione** per scheduling/fetch; alcune differenze sostanziali: distribuzione, archivi, sessioni, JS | Copertura completa degli stati e delle risorse nascoste | 01, 02, 15 |
| Browser dinamico e web archiving | Playwright/Puppeteer, Browsertrix, Heritrix/WARC, Webrecorder | Parte browser/runtime sovrapposta a Crawlee; Browsertrix concentra replay/archiviazione | WACZ riproducibile ≠ ogni asset/stato esplorato | 02, 15 |
| API/connettori/sync | Airbyte, dlt, Meltano/Singer e connector pattern; OData Delta, ResourceSync, WebSub | Si sovrappongono su *state/load/CDC* dove compatibile; protocolli della fonte complementari | Incremental cursor ≠ storia completa o nessun evento perso | 02, 07, 08, 10 |
| Catalog discovery | DCAT 3/DCAT-AP, CKAN, OpenAPI/Arazzo, Signposting/Linkset, sitemaps | **Complementari ma talvolta ridondanti**: catalogo dataset, metodi API, link semantici, elenco URL non sono stessa cosa | Il catalogo descrive tutti gli asset esistenti | 07, 08, 15 |
| Cataloghi verticali | STAC, OGC API Records, IIIF, OAI-PMH, SDMX, OpenAIRE/DataCite, Cellar, Normattiva | Complementari per semantica/settore; lo stesso asset può comparire da più vie | Un record di metadata equivale a full text/file/serie storica | 15, 16 |
| Federazione e change streams | ActivityPub outbox, ATProto CAR+firehose, ResourceSync, WebSub | Distinte semantiche; push, rete federata e snapshot non sono equivalenti | Tutte le attività, repository e blob vengono sempre osservati | 08, 16 |
| Corpus preacquisiti e archivi | Common Crawl WARC/WAT/WET e URL/CDXJ Index, Wikipedia dump, Crossref bulk, OpenAlex snapshot, GBIF download | Canali alternativi/complementari a live-fetch e browser | Archivio terzo contiene l'universo dei contenuti; diritto di reuso automatico | 08, 10, 15; nuova verifica §3 |
| Formati, componenti e payload | Docling/MinerU/olmOCR, EBUCore, WebVTT, Formex/Akoma Ntoso, METS/PREMIS/E-ARK/BagIt | Parser e *descrittori di struttura* non sono concorrenti; conversione vs inventario dei componenti | JSON valido/BagIt valid ≠ informazione completa | 09, 15, 16, 17 |
| Archiviazione, versioning, integrità | WARC/WACZ, OCFL, BagIt, TUF, checksums, Merkle, SCITT/COSE | Sovrapposizione limitata; integrità, autentica origine, versioni e trasparenza sono **assicurazioni diverse** | Autenticità o inclusione ≠ verità, assenza universale o completezza | 07, 10, 11, 17 |
| Quality / incomplete data | ExtractBench 1+2, WCXB, query completeness, capture–recapture, metamorphic/differential tests | Due tipi di errore distinti: *contenuto perso durante parsing* e *risorsa mai scoperta* | Non-osservato ≠ inesistente; score di estrazione ≠ recall dell'intero crawl | 03, 05, 08, 09 |
| Adattamento intelligente e agenti | WebDART, BaRA (P), FIRE, active search, Bayesian design, bandit, focus host, skills/routines | Si sovrappongono in selezione/esecuzione, ma optimizing fact-check ≠ optimizing crawl discovery | Un LLM o high-EIG garantisce originalità, completezza, legalità, costo minore | 01, 03, 12–15 |
| Provenienza e conferme | PROV-O, copy detection PVLDB, MemeTracker/NETINF, METER, COUNTER/PAN, selective prediction | Complementari: lineage *dichiarato*, copying *inferito*, benchmark di *riuso* | Similarità/rete inferita ≠ causalità né fonte indipendente | 11–14 |
| Access control/rights | Robots/ToS/licenze, ODRL, ACL federate, API keys, security sandbox | Regole legali, diritti di riuso e condizioni tecniche sono livelli **diversi**, non un oracolo automatico | HTTP 200/OpenAPI/CC0 metadata significa diritto di ripubblicare qualsiasi asset | 04, 07, 12, 15–17 |

**Lettura corretta:** la riga «API/connettori/sync» non dimostra che Airbyte/dlt possiedano già tutta la *web discovery*; la riga «browser» non dimostra che Browsertrix sappia enumerare qualsiasi API; un motore generalista non sarebbe necessariamente una semplice collezione di tutti questi prodotti.

## 3. Quattro controlli esterni aggiuntivi alla sintesi (verificati su fonti primarie 2026-11-02)

### E1 — USENIX Security 2024, **SoK: State of the Krawlers** / Arachnarium
https://www.usenix.org/conference/usenixsecurity24/presentation/stafeev
- Stafeev e Pellegrino confrontano ricomposizioni di tecniche di crawling su **9 applicazioni reali, 2 benchmark e 10k siti CrUX**, rispetto a *code coverage*, *link coverage* e *JavaScript source coverage*.
- L'articolo riferisce che, nei setting considerati, alcune politiche pubblicate ottennero risultati peggiori di politiche randomizzate e che **nessuna configurazione era universalmente migliore**; la composizione e la risorsa di calcolo cambiano il risultato. **Non** generalizzare questo risultato a ogni tipo di web crawling o all'utilità di crawling random.
- **Conseguenza sulla ricerca:** prima di inventare una policy «AI best», studiare *Arachnarium* come metodologia e baseline. Non usare una sola metrica «numero di URL» per decidere il vincitore.

### E2 — Common Crawl: distinguere archivio raw, metadata e plaintext
https://www.commoncrawl.org/get-started ; https://www.commoncrawl.org/url-index ; https://www.commoncrawl.org/cdxj-index
- **WARC** conserva risposte HTTP; **WAT** contiene metadati/link estratti; **WET** testo reso. **CDXJ Index** adatto a look-up di singoli URL/catture; **URL Index** (Parquet) a query analitiche e bulk.
- Un index di snapshot pubblici già esistenti può talvolta offrire discovery/storico senza nuove visite alla fonte, ma **non** risolve i siti non catturati, le modifiche tra snapshot, l'assenza di asset o le condizioni legali di riutilizzo. Non scaricate copie in questa ricognizione.
- **Conseguenza:** includere il confronto **archive-first vs fresh-fetch** fra i futuri test, misurando recupero di versioni, costo, staleness e diritti separatamente.

### E3 — Data ingestion: dlt, Airbyte sono baseline già concrete di sync
https://dlthub.com/docs/general-usage/incremental-loading ; https://dlthub.com/docs/general-usage/incremental/advanced-state ; https://docs.airbyte.com/platform/understanding-airbyte/cdc
- **dlt** documenta full/append/merge, cursori incremental, lag windows, deduplica/upsert, SCD2 e checkpoint/state integrato al load.
- **Airbyte** documenta CDC con log di database, snapshot iniziale e posizioni di ripresa. Necessita accesso e semantiche di sorgente; non attribuire le garanzie di CDC a generica HTML/API REST.
- **Conseguenza:** non rivendicare come originale una struttura incrementale con state/cursor/merge e non reimplementare automaticamente ogni capacità. Studiare invece i limiti di copertura e recupero in fonti dove la sorgente non offre garanzie transazionali.

### E4 — Web Content Extraction Benchmark (WCXB)
https://webcontentextraction.org/
- Benchmark pubblico mantenuto dal curatore, con **2.008 pagine annotate, 7 tipi di pagina, 1.613 domini e 12 extractor come baseline**, e separazione sviluppo/test. Le classifiche restano **risultati dell'organizzatore**, non valutazioni indipendenti di f3tcher.
- Misura **estrazione del contenuto principale**; non la copertura degli URL di un sito, tutti i componenti di un archivio o le versioni di un dato.
- **Conseguenza:** affiancarlo ai due *ExtractBench* della ricognizione 09 senza confondere **main-content F1**, **field/list extraction recall** e **discovery/asset recall**.

**Cautela sui benchmark commerciali 2026:** classifiche di API di scraping o di siti protetti possono misurare soltanto 2xx/contenuto atteso e includere accessi che per un caso d'uso non sarebbero consentiti. Non incorporare rating o percentuali promozionali come decisioni del progetto, e non progettare prove che tentino di aggirare difese. Si richiede metodologia, dati e compatibilità di accesso verificabili.

## 4. Identificazione dei doppioni concettuali: dove NON moltiplicare componenti

### D1 — «AI spider», «browser agent» e «crawler JS» non sono tre capacità distinte in ogni caso
Un browser capace di renderizzare/esplorare un'interfaccia può già fare parte di Crawlee/Browsertrix; l'agente che decide il click e il motore che esegue il click sono ruoli diversi ma con forte sovrapposizione pratica. **U:** l'AI aggiunge *unique assets found* sullo stesso budget o soltanto overhead?

### D2 — «Raccolta incrementale», «delta sync» e «CDC» non sono sinonimi
Si sovrappongono sui checkpoint, ma CDC e delta log forniscono semantiche di sorgente che non possono essere imitate da un crawler. **U:** quando usare stato+reconciliation e quando ammettere che alcuni eventi sono irrecuperabili?

### D3 — «Catalogo dataset», «API descritta», «sitemap» e «Linkset» non sono un superindice completo
Sono interfacce che descrivono classi diverse di risorse e possono contenere esattamente gli stessi ID. **U:** in quali domini un secondo canale aggiunge asset *veramente* nuovi o un controllo di omissioni?

### D4 — «Provenienza», «firma», «truth discovery» e «completezza» non sono livelli di uno score unico
Provenienza dichiarata, origine autenticata, relazione inferita e completezza circoscritta hanno premesse differenti. **U:** quanto valore aggiungono al *motore di acquisizione* rispetto al loro costo, senza costruire prematuramente un motore generale di fact-checking?

### D5 — «Supporto dei formati» e «accuratezza dell'estrazione» non sono la stessa capacità
Docling / parser dichiarano formati; i benchmark mostrano omissioni anche con output valido. **U:** per quali combinazioni MIME/schema/versione serve estrazione specializzata o secondo controllo?

### D6 — «Archiviazione riproducibile» e «storia completa» non sono equivalenti
WARC, BagIt, OCFL, TUF, ResourceSync, OAI-PMH e atproto garantiscono proprietà diverse, e talvolta soltanto se il publisher fornisce i metadati richiesti. **U:** quali attestazioni locali possono essere confermate senza accessi privilegiati?

## 5. Matrice di priorità di ricerca — motivata, ma NON una roadmap approvata

**Criteri qualitativi:** (A) ampiezza dei casi d'uso toccati, (B) rischio di acquisizione incompleta o falsa, (C) capacità di discriminare tra alternative, (D) fattibilità di indagine documentale/test controllato, (E) legalità/permessi, (F) costo di ritardare le decisioni sul progetto. La classe deriva da valutazione ragionata **non da valori numerici misurati**.

| Priorità di *indagine* | Problema | Perché può cambiare la futura scelta | Cosa costituisce evidenza sufficiente |
|---|---|---|---|
| **Alta** | Routing della sorgente: bulk/API/HTML/browser/archivio | Influenza costo, copertura e affidabilità su quasi ogni sorgente | Classi di casi + comparazioni controlled con cost/recall e falsi fallback |
| **Alta** | Discovery di asset composti e diversi canali | Errori silenziosi di «ho il record ma non il file» comuni a settori differenti | Corpus noto di dataset/asset/metadata e verifiche per diritti e versioni |
| **Alta** | Stato/consistenza e recupero dopo gap | Un successo di job può perdere cambiamenti/record | Confronti full vs delta/paging con mutazioni controllate e veri gold states |
| **Alta** | Benchmark trasversali e falsi «successi» | Senza misure confrontabili ogni ricerca resta una lista di possibilità | Testbed per web statico, JS, API, cataloghi, allegati e cambiamenti |
| **Alta** | Adozione reale, maturità e licenze | Standard poco adottato/runner acerbo può sprecare ricerca e integrazione | Inventario verificabile di istanze/provider/versioni/diritti, senza scansioni invasive |
| **Media** | Costi di estrazione, OCR/AI e fallback | Determina se un approccio avanzato conviene davvero | Misure per tipi di documento, field/list recall, costo e drift |
| **Media** | Fairness della long tail e bias della frontier | Ottimizzare host popolari sacrifica risorse rare | Ground truth con host rari, stesso budget, metriche tail coverage |
| **Media** | Provenance e ricerca falsification-aware | Potenziale differenziazione, ma rischio di spostare il progetto da acquisizione a fact-checking | Miglioramento misurato su attribuzioni corrette/false e costo |
| **Media** | Preservazione/rights per asset e pacchetti | Fattore abilitante e vincolo legale, non feature opzionale | Semantiche METS/PREMIS/BagIt e access-control simulate su testbed |
| **Esplorativa** | Novel AI agents, score globali, schemi di verità | Letteratura forte ma trasferibilità al crawling universale non provata | Solo approfondire se risolve un fallimento concreto delle alternative |

**Non si tratta di profili utente, fasi di implementazione, stack o calendario.** Dire «Alta» non significa implementare adesso: è l'ordine con cui smettere di aggiungere bibliografia indifferenziata e iniziare a porre domande che escludono alternative.

## 6. Un insieme più piccolo di confronti davvero decisivi (proposte, non test effettuati)

### C1 — Il canale giusto trova più asset?
Testbed autorizzato con sito SSR, SPA, catalogo DCAT/CKAN, REST metadata, file raw (PDF/CSV), feed e snapshot. Baseline: HTTP/link-only, browser-only, catalog-first e una *scelta automatica teorica* da definire soltanto dopo la ricerca. **Metriche distinte:** dataset, asset, versioni, file corretti, tempo/cpu/rete, accessi consentiti.

### C2 — Più tecniche valgono il costo?
Stesso set di sorgenti con HTTP+API+browser attivi. Confrontare guadagno marginale di ciascun canale e fallimenti quando lo stesso elemento appare con diversi URL. Misurare **unique verified asset gain per additional cost**; un secondo motore che ritrova solo duplicati non è un successo.

### C3 — Lo scheduler sa di aver perso qualcosa?
Mock API con nuovi record durante paginazione, cursor scaduto, log delta perso, 404/410/tombstone, retention, crash+restart e quota. Risultato atteso da testare: non falsamente «complete/success»; se impossibile recuperare storico, segnalarlo.

### C4 — Una buona cattura include tutti i componenti?
Oggetto multisorgente: un brevetto con immagini; dataset scientifico con 3 asset; pagina IIIF con rappresentazioni; documento legale con revisioni; BagIt con manifest incompleto/corrotto. Misurare *object graph coverage, verified asset recall, structural recall, provenance gaps* e diritti.

### C5 — Qual è il vero costo di HTTP vs browser vs LLM?
Stesso task e perimetro: HTTP-first, browser-first, document parser, LLM extraction e combinazioni selettive. Controllare cache/parallelism/hardware e test su cambi HTML, lunghe liste, JS. Misurare **falsi negativi**, CPU, memoria, tempo, costo per *asset corretto* e quanto spende la decisione stessa.

### C6 — Il miglioramento regge i casi rari?
Corpus controllato per host piccoli, pagine profonde, directory non linkate ma dichiarate da cataloghi leciti, lingue meno comuni e dataset verticali. Una policy con maggiore resa media ma perdita della long-tail **non può essere definita superiore su tutti gli obiettivi**.

### C7 — Il vantaggio si trasferisce tra domini?
Ripetere i medesimi principi su news, dati istituzionali, statistica SDMX, repository scientifici, IIIF e leggi XML. Non forzare un unico formato d'uscita semantico né fingere che i denominatori siano uguali. Stratificare risultati e segnalare *unmeasurable*.

### C8 — L'acquisizione adattiva migliora rispetto a regole trasparenti?
Baseline random lecito, URL priority, sitemap/catalog-first, simple host stratification, focused-crawl e decisione AI; introdurre ipotesi errate e upstream ignoti. Misurare **marginal verified information** oltre a *policy violation=0* e errori di feedback, non soltanto task success di agent browser.

**Condizioni di comparabilità:** stesso periodo, budget/tempo/hardware per task, diritti equivalenti, quotazioni per host rispettate, profondità/copertura per categoria con ground truth noto del testbed. Se manca il ground truth del Web reale, **non** presentare percentuali assolute.

## 7. Cosa possiamo *scartare come pretesa*, non come tecnologia

Già **non sostenibili** sulla base delle fonti:
- «Un solo browser avanzato è sufficiente per ogni sorgente».
- «Un solo crawler/configurazione ottiene il miglior risultato ovunque».
- «API pubblica = tutti i file/diritti/revisioni».
- «Un redirect risolto o HTTP 200 = acquisizione riuscita e completa».
- «Un archivio WARC/WACZ o un hash validato = verità o completezza universale».
- «Più pagine / più LLM / più URL simili = più informazioni indipendenti».
- «FIRE/WebDART/WebChoreArena task success = recall di un intero sito».
- «La tecnica setup LLM + replay deterministico sarebbe originale di f3tcher».
- «Risultati vendor o benchmark di accesso a siti protetti trasferibili senza condizioni al perimetro lecito».
- «Tutte le tecniche trovate devono essere integrate per essere futuristici».

Questo riduce il rischio di progettare su idee non dimostrate, ma **non sceglie** quale tecnologia scartare in assoluto: dipende dai dati e dal contesto di accesso.

## 8. Quanta ricerca resta? Condizioni per fermarsi, non percentuali arbitrarie

Questa sintesi non può sostenere in modo verificabile il precedente **65–70%**: era una *stima soggettiva*, non un calcolo. Una modalità più rigorosa di valutare la fine della fase esplorativa è richiedere che siano soddisfatti **criteri di sufficienza della conoscenza**:

1. Ogni grande famiglia d'acquisizione (web, API, catalogo, bulk, streaming, archivio, documento composto) ha **alternative reali** documentate e almeno una baseline sensata.
2. Per ogni alternativa importante è noto **che cosa NON garantisce**, i costi/le restrizioni da controllare e una fonte primaria pertinente.
3. Le sovrapposizioni fondamentali (crawler/browser, ETL/CDC, catalog/protocol, parser/validation, provenance/integrity) sono esplicitate e non generano doppie funzioni obbligatorie.
4. Le domande che potrebbero cambiare il futuro progetto sono poche, prioritizzate, **falsificabili** e con idea di denominatore/ground truth.
5. Abbiamo segnalato in modo trasparente **adozione reale non verificata, licenze non verificate, dati non stimabili e assunzioni teoriche**.
6. Incontri scientifici o nuovi tool aggiungono valore solo se cambiano una delle domande precedenti: altrimenti vanno archiviati come link, non diventare infinite ricognizioni.
7. L'utente decide esplicitamente quando chiudere l'esplorazione e autorizzare una fase di progettazione/benchmark: la presente ricerca non è tale autorizzazione.

**Valutazione qualitativa ora:** la ricerca bibliografica è **ampia** e le famiglie cruciali sono coperte; le aree più deboli restano l'**evidenza empirica d'adozione**, il **confronto dei costi/falsi negativi** e la **valutazione trasversale**. Non confondere «ricerca documentale quasi matura» con «soluzione tecnologica provata».

## 9. Prossimo studio ad alto rendimento informativo (non roadmap approvata)

**18-A — Adoption/Reality Check:** preparare un campione limitato e non invasivo di portali pubblici autorizzati per valutare quanto spesso cataloghi e API funzionino davvero e quanto aggiungano a HTTP/browser. Non necessario in questa sessione.

**18-B — Decision Matrix:** per ogni grande famiglia indicare *3 alternative praticabili* oppure «non confrontabili» con:
- disponibilità e maturità;
- dipendenze e licenze;
- costo/risorse presumibili da verificare;
- tipo di risorsa;
- recuperabilità di omissioni e storici;
- metrica che ne dimostrerebbe il vantaggio.

**18-C — Benchmark design:** disegnare soltanto un protocollo di confronto su siti/archivi controllati, *prima* di codice e raccolta, distinguendo discovery/asset/field/temporal/provenance/legal outcomes. Solo con consenso esplicito alla fase di prove.

**18-D — Literature gap targeting:** approfondire ricerca ulteriore esclusivamente sulle lacune che risultano discriminanti (es. simultaneità di API paginata, selection policy su sorgenti rare, opportunità di archives-first) invece di inseguire il numero di fonti.

**Decisione confermata rimasta invariata:** singolo sistema automatico, nessun profilo Fast/Deep/Maximum, massime capacità lecite, no bypass, ricerca prima di stack/codice. Questa è una sintesi comparativa della ricerca, **non** un'architettura scelta.

## Riferimenti principali della ricognizione comparativa

- [00](00_STATO_E_DECISIONI.md), [01](01_ATLANTE_FUNZIONALITA.md), [02](02_PROGETTI_E_TECNOLOGIE.md), [03](03_STUDI_E_FONTI.md), [04](04_LEGALITA_E_SICUREZZA.md), [05](05_DOMANDE_E_BENCHMARK.md), [06](06_RIPRESA_NUOVA_CHAT.md)
- [07](07_RICOGNIZIONE_2026-11-01.md), [08](08_ADOZIONE_CONSISTENZA_E_LONG_TAIL.md), [09](09_COMPLETEZZA_LOCALE_E_PROVE.md), [10](10_INVENTARI_E_GARANZIE.md), [11](11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md), [12](12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md), [13](13_DIFFUSIONE_IDENTIFICABILITA_E_ASTENSIONE.md), [14](14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md), [15](15_ACQUISIZIONE_UNIVERSALE_PROTOCOLLI_E_CRAWLER.md), [16](16_ACQUISIZIONE_SPECIALISTICA_RICERCA_LEGGI_STATISTICHE_FEDERAZIONE.md), [17](17_BREVETTI_BIOLOGIA_AUDIOVISIVI_CONSERVAZIONE.md)
- Nuove verifiche primarie in §3: USENIX 2024, Common Crawl, dlt, Airbyte, WCXB. Non testati; gli organismi e autori mantengono la titolarità dei propri risultati e contenuti.

**Stato chiusura:** solo documentazione su `main`; nessun software/test/benchmark f3tcher e nessuna tecnologia scelta.
