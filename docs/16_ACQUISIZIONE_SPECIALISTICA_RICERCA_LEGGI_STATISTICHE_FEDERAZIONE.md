# 16 — Acquisizione specialistica: ricerca, diritto, statistiche e federazione

**Ricognizione:** 2026-11-02. **Stato:** solo ricerca documentale, nessun codice applicativo, benchmark f3tcher, download massivo, endpoint di raccolta interrogato o architettura/stack approvati. Prosegue [15_ACQUISIZIONE_UNIVERSALE_PROTOCOLLI_E_CRAWLER.md](15_ACQUISIZIONE_UNIVERSALE_PROTOCOLLI_E_CRAWLER.md) e affronta volutamente la lacuna prioritaria: **aumentare ampiezza e profondità dell'acquisizione di dati di natura molto diversa**.

**Legenda:** **V-doc** = documentazione ufficiale del publisher/protocollo verificata; **V-spec** = specifica ufficiale consultata; **H** = ipotesi f3tcher da testare; **P** = proprietà, termini o compatibilità da verificare in futuro. La prova che un endpoint esista **non** autorizza raccolta massiva, accesso a contenuti protetti o riutilizzo in altri contesti. Rispettiamo [04_LEGALITA_E_SICUREZZA.md](04_LEGALITA_E_SICUREZZA.md). I link primari sono riportati inline, senza affermare che esistano già adapter o test.

## 1. Risultato principale

Non esiste un'unica semantica di «informazione recuperata». Si incontrano almeno:
- **record bibliografico** vs articolo completo vs file di dati di ricerca;
- **atto normativo** vs sua espressione linguistica vs versione temporale vs PDF/HTML/XML;
- **dataflow statistico** vs dimensioni/codelist/DSD vs osservazione e sue revisioni;
- **record federato firmato** vs blob multimediale citato vs oggetto visibile nell'outbox di un soggetto;
- **identificativo persistente** vs materiale realmente disponibile;
- **catalogo completo dei record conosciuti dal publisher** vs universo non censito.

Per un singolo futuro motore automatico (senza profili selezionabili) è utile indagare **quale contratto di discovery, accesso, temporalità e completezza ogni sorgente dichiari**, senza presupporre che i canali si equivalgano. Questo è *programma di ricerca*, non architettura scelta.

## 2. Rete della ricerca accademica: cinque percorsi differenti (V-doc)

### V1 — OpenAIRE Graph API v3: grafo di metadati, non repository universale di full text

Fonte ufficiale: https://graph.openaire.eu/docs/apis/graph-api/ ; avvertenze delle versioni precedenti https://graph.openaire.eu/docs/11.1.1/apis/graph-api/

- API v3 per research products (pubblicazioni, dataset, software e altri output), datasources, progetti, persone e organizzazioni, con filtri e ricerche. Offset paging limitata ai primi **10.000 risultati** per query; documentazione corrente indica **cursor-based paging o download del Graph completo** per copertura ampia.
- **Implicazione:** non dividere per parole chiave e sommare conteggi senza tracking di ID/deduplica, ma studiare il contrasto *API esplorativa vs bulk snapshot*. Il limite di 10.000 è per paginazione offset, non prova che Graph contenga soltanto 10.000 record.
- **Limite:** il Graph aggrega *metadati di prodotti e relazioni*, non certifica accesso ai testi integrali, freschezza completa, né assenza di duplicati fra provider; rate limit e TOS da seguire.

### V2 — DataCite REST: DOI metadata pubblici vs operazioni riservate

Fonti: https://support.datacite.org/docs/api ; https://support.datacite.org/docs/how-do-i-query-the-rest-api-and-whats-in-the-response ; https://support.datacite.org/docs/api-queries

- API `GET /dois` e `GET /dois/{doi}` senza autenticazione per record DOI *findable*; supporta filtri, cursor pagination e campi/relazioni di versioning. **Member API** autenticata serve anche per creare/modificare metadati: non è una capacità da esplorare automaticamente.
- **Implicazione:** distinguere DOI/metadata record da file del dataset e da tutte le versioni dei byte. Identificativo citabile o relazioni `versionOf` non garantiscono download/diritti.
- **Limite:** i record sono dichiarazioni di publisher arricchite; non sono inventario certificato di tutte le pubblicazioni né garanzia che una URL di risoluzione contenga i file.

### V3 — arXiv OAI-PMH: canale preferenziale per acquisizione massiva dei metadati

Documentazione ufficiale del progetto: https://github.com/arXiv/arxiv-docs/blob/develop/source/help/bulk_data.md e https://github.com/arXiv/arxiv-docs/blob/develop/source/help/oa/index.md
- arXiv consiglia esplicitamente **OAI-PMH** per bulk metadata e mantenimento aggiornato; aggiornamenti giornalieri e API per ricerche in tempo reale. La specifica OAI-PMH è già confrontata nella [ricognizione 10](10_INVENTARI_E_GARANZIE.md).
- **Limite decisivo:** l'interfaccia OAI-PMH espone **soltanto la versione più recente dell'articolo**, benché alcuni metadata format riportino *informazioni* sulla storia delle versioni. Per acquisire testo sorgente o revisioni precedenti vanno studiati **diversi servizi e condizioni**, senza inventare completezza storica.
- Le **Terms of Use** arXiv API e le condizioni dei singoli full text devono essere verificate prima di una raccolta reale.

### V4 — Europe PMC: metadata ricercabili e full text quando autorizzato

Documentazione servizio ufficiale: https://dev.europepmc.org/RestfulWebService ; studio di sistema https://pmc.ncbi.nlm.nih.gov/articles/PMC4383902/
- REST API offre ricerca, ID list, `lite` e `core`, metadata XML/JSON/Dublin Core, riferimenti e, per il materiale abilitato, full text in XML e allegati. Archivi open access e feed sono canali distinti da API di ricerca.
- **Non** assumere che gli articoli indicizzati abbiano tutti full text scaricabile/riutilizzabile: la disponibilità dipende dai diritti e dal sottoinsieme OA.
- **H:** misurare *metadata coverage* separatamente da *authorized full-text coverage* e *supplementary asset coverage*; non contare il record della ricerca come testo integrale.

### V5 — Crossref: filtri temporali non tutti equivalenti

Pagina ufficiale: https://www.crossref.org/documentation/retrieve-metadata/rest-api/tips-for-using-the-crossref-rest-api/
- `from-created-date`, `from-update-date`, `from-index-date` hanno semantica differente. L'ultima può includere interventi di Crossref o terzi oltre alle modifiche dell'editore. Cursor raccomandati per risultati grandi.
- **H:** confrontare approcci di sincronizzazione con questi tre orologi, senza usare la data di pubblicazione come sinonimo della data di indicizzazione. Già esplorato in [10](10_INVENTARI_E_GARANZIE.md); qui serve come controllo trasversale con gli altri aggregatori.

## 3. Normativa e atti parlamentari: versioni, autorità, rappresentazioni (V-doc / V-spec)

### V6 — Normattiva Open Data: caso italiano concreto

Fonti ufficiali: https://dati.normattiva.it/Il-progetto ; https://dati.normattiva.it/Come-scaricare-i-dati
- Portale Open Data v1.2.0 con **API di ricerca/scaricamento**, specifiche **OpenAPI** e file per Postman. Denominazione delle risorse con ID redazionale, data Gazzetta Ufficiale e versione `V0...Vn`; distinguono **testo originale, vigente e multivigente**.
- **Limite essenziale di autorità:** il portale precisa che i testi della banca dati *non hanno carattere di ufficialità*, il testo ufficiale prevalente è quello della Gazzetta Ufficiale Italiana; la raccolta è descritta come frutto di selezione redazionale. La riproduzione elettronica è subordinata all'indicazione di fonte e natura non autentica e gratuita; non dedurre diritti illimitati di crawling, TDM, redistribuzione.
- **H:** recuperare in un futuro test autorizzato versioni e date di vigenza, evitando che due versioni dello stesso atto diventino due leggi distinte. Non mescolare *data pubblicazione*, *data di efficacia*, *data consultazione*.

### V7 — Gazzetta Ufficiale: RSS per il sommario dell'ultimo fascicolo

FAQ ufficiale: https://www.gazzettaufficiale.it/caricaHtml?nomeTiles=faq
- Feed RSS della serie di interesse con sommario dell'**ultima pubblicazione** e link agli atti; utili come *segnali di discovery*, non inventario delle leggi consolidate e loro tutte le versioni.
- **H:** distinguere fonte ufficiale, feed di novità e banca dati consolidata; non aspettarsi da un RSS di sommari una storia normativa completa.

### V8 — EUR-Lex / Publications Office Cellar: grafo di metadata e molte manifestazioni

Fonti ufficiali: https://op.europa.eu/en/web/cellar/cellar-data/metadata ; https://op.europa.eu/en/web/cellar/cellar-data/metadata/knowledge-graph ; https://eur-lex.europa.eu/content/help/content/help/data-reuse/reuse-contents-eurlex-details.html?locale=en
- Cellar distingue **work, expression, manifestation, item**, lingue e formati; metadata tramite SPARQL e REST. EUR-Lex documenta riuso in XML **Formex**, HTML, PDF e altre rappresentazioni, e modalità per ottenere documenti/metadata.
- **Conseguenza:** una singola legge UE può avere più lingue, versioni, correzioni, documenti e formati: il numero di URL/documenti scaricati **non** coincide con il numero di atti distinti.
- **Limite:** REST + SPARQL non sono prova che ogni lingua o versione sia disponibile per ogni atto. Una query SPARQL pesante può incidere sui servizi; occorre rispettare le condizioni del publisher.

### V9 — Parlamento europeo Open Data API v2

Documentazione ufficiale: https://data.europarl.europa.eu/en/developer-corner/opendata-api
- API basate su OpenAPI 3; MEP, procedure, documenti, testi approvati, interrogazioni, organi. Endpoint `/feed` per subset pubblicati/aggiornati; limite dichiarato **500 richieste in 5 minuti sullo stesso endpoint**; licenza riportata dal portale CC BY 4.0, da verificare sul singolo asset.
- **H:** studiare periodic feed + inventario completo, revisioni e document ID; le finestre specifiche di ciascun feed differiscono (ultima settimana/mese/per intervallo).
- **Limite:** un `feed` non implica storico completo, né la stessa politica di retention per tutte le tipologie.

### V10 — Congress.gov API v3

Fonte ufficiale: https://api.congress.gov/ ; Library of Congress https://www.loc.gov/apis/additional-apis/congress-dot-gov-api/
- API v3 JSON/XML con liste, bills, amendments, actions, summaries, testi versionati, voti e comitati; **API key necessaria**.
- **H:** benchmark comparativo *legislative text versioning* e `action feed` su dataset di test: un bill e le sue versioni, emendamenti, voti, committee report e legge finale non sono un unico oggetto.
- **Limite:** richiede registrazione e rispetto di quote; il motore **non** deve tentare accessi o enumerazioni senza un'autorizzazione valida.

### V11 — OASIS LegalDocML / Akoma Ntoso v1.0 (standard)

Fonte OASIS: https://groups.oasis-open.org/communities/tc-community-home2?CommunityKey=3425f20f-b704-4076-9fab-018dc7ed3efbe
Spec originale: https://docs.oasis-open.org/legaldocml/akn-core/v1.0/os/part1-vocabulary/akn-core-v1.0-os-part1-vocabulary.html
- Vocabolario XML per documenti legislativi, parlamentari e giudiziari, con sezioni, riferimenti, attori, citazioni e struttura. È **un formato di rappresentazione**, non un crawler né un'API universale per accedere agli atti italiani.
- **H:** capire se la struttura XML può preservare *articolo, comma, citazione, modifica ed espressione* meglio di OCR/PDF puro, quando il documento è disponibile legalmente in questo formato.

## 4. Dati ufficiali statistici: SDMX è una semantica, non soltanto CSV (V-doc / V-spec)

### V12 — Eurostat Dissemination APIs: catalogo, metadata e osservazioni

Fonte ufficiale: https://ec.europa.eu/eurostat/en/web/user-guides/data-browser/api-data-access/api-introduction ; SDMX3 https://ec.europa.eu/eurostat/en/web/user-guides/data-browser/api-data-access/api-getting-started/sdmx3.0
- **Catalogue API** per discover; **Statistics API** JSON-stat; **SDMX 2.1/3.0** per dataflow, DSD, codelists, dimensioni, filtri; formati SDMX-XML/CSV, JSON-stat e TSV. Il sito dichiara due aggiornamenti della base per giorno, quando dati nuovi sono disponibili.
- Le **strutture** (code list, concept scheme, DSD) possono essere versionate, ma la **storia delle osservazioni statistiche non è disponibile nelle API**: i valori precedenti vengono sovrascritti. Fonte conferma esplicita: https://ec.europa.eu/eurostat/en/web/user-guides/data-browser/api-data-access/api-faq e https://ec.europa.eu/eurostat/en/web/user-guides/data-browser/api-data-access/api-detailed-guidelines/sdmx3-0/data-query
- **H:** un futuro motore dovrà differenziare la cronologia *delle strutture* dalla cronologia *dei numeri*: se non acquisisce uno snapshot del dato prima della revisione, potrebbe non poter ricostruire il valore precedente. Non riprodurre dati statistici senza unità, flag, classificazioni e revision date.

### V13 — Istat/IstatData SDMX: avvertenza operativa concreta

Fonte ufficiale: https://www.istat.it/classificazioni-e-strumenti/web-services-sdmx/
- Portale machine-to-machine SDMX con servizi I.Stat e IstatData (SDMX-RI), differenze documentate fra le DSD nei due ambienti. **5 query/minuto per singolo IP**, oltre le quali può scattare **blocco da 1 a 2 giorni**; il portale raccomanda di aggiornare le query al nuovo servizio.
- **H:** la corretta acquisizione deve controllare il contratto della fonte, raggruppare opportunamente le query consentite e gestire versioni DSD, senza spingere la frequenza oltre le restrizioni. L'API «pubblica» non implica permesso di polling aggressivo.
- **Limite:** eventuali quote future possono mutare; la pagina ufficiale fa fede al momento dei test, non una regola hard-coded valida per sempre.

### V14 — Specifica SDMX 3.1 e classificazioni internazionali

Fonte ufficiale: https://sdmx.org/standards-2/ ; esempio UN SDG DSD 1.26 (30 settembre 2026) https://unstats.un.org/sdgs/iaeg-sdgs/sdmx-working-group/
- SDMX 3.1, pubblicato nel 2025, definisce modelli, structure/metadata and REST, JSON/CSV/XML; i provider possono adottare versioni diverse. I DSD SDG cambiano con versioni e revisione di constraint/codelist.
- **H:** confrontare **semantic completeness** dei cubi (dimensioni, codici, unità, missing values, flags, vintage), non solo il numero di righe importate. È un problema di acquisizione molto diverso dal web scraping.

## 5. Federazione: il flusso non rivela automaticamente il mondo intero (V-spec)

### V15 — W3C ActivityPub / ActivityStreams 2.0

Fonte: https://www.w3.org/TR/activitypub/ ; core collections https://www.w3.org/TR/activitystreams-core/
- Profili degli attori pubblicano riferimenti `outbox`, `inbox`; `outbox` è un'OrderedCollection e gli oggetti restituiti possono essere **filtrati in funzione dell'accesso del richiedente**. Paginazione con `first`, `next`, `last`.
- Gli inbox sono destinati a contenere attività ricevute e sono potenzialmente riservati; non cercarli o usarli come dati pubblici senza autorizzazione. Non inviare POST a inbox, non simulare sottoscrizioni come permesso implicito.
- **H:** studio di *authorized-public outbox discovery* e registrazione dei limiti di visibilità, senza dichiarare che ogni attività federata sia enumerabile.

### V16 — AT Protocol (atproto): full repository CAR + firehose con ripresa

Fonti ufficiali: https://atproto.com/specs/sync ; https://atproto.com/specs/repository ; https://atproto.com/specs/blob
- Esportazioni per repository con record in **CAR** e signed commits; streaming WebSocket di revisioni `#commit` e `#sync` con sequenza, e confronto di stato per individuare alcune lacune; eventuale risincronizzazione con `getRepo`.
- **Limite esplicito nella specifica:** una catena di eventi coerente non rende rilevabile un relay che ometta **tutti i messaggi di un repository**. Quindi non equiparare «sequenza coerente dei repository osservati» con «rete globale completamente monitorata».
- I **blob/media** sono riferimenti per hash ma **non incorporati** nell'esportazione dei record CAR; i blob possono mancare, per migrazioni, rimozioni o politiche. Non confondere copertura record con copertura media.
- **Privacy/legal:** l'esistenza di un endpoint pubblico non autorizza retention indefinita o redistribuzione massiva di contenuti federati; documentazione atproto raccomanda cautela per mirror statici, cancellazioni e deactivation.

## 6. Formati non HTML: pacchetti descrittivi e livelli di integrità

### V17 — Frictionless Data Package / Table Schema / CSV dialect

Specifiche: https://specs.frictionlessdata.io/guides/data-package/ ; https://specs.frictionlessdata.io/table-schema/ ; https://specs.frictionlessdata.io/tabular-data-resource/
- `datapackage.json` può descrivere risorse, path, metadata e schemi; Table Schema descrive tipi, vincoli e colonne; un CSV dialect distingue separatore, quote, header e codifica.
- **H:** confrontare parsing CSV euristico vs metadata-aware su CSV con delimitatori, colonne null, header multipli e file associati; recuperare **tutti i resource** dichiarati, non soltanto il primo CSV.
- **Limite:** un package può essere dichiarato erroneamente, non è un inventario universale né una verifica automatica dei bytes (servono hash/fonte e controlli dedicati).

### V18 — Formex / Akoma Ntoso / SDMX: parsing semantico per dominio

- **Formex** di EUR-Lex per testi di pubblicazioni/atti UE (vedi V8), **Akoma Ntoso** per sezioni normativo-legali (V11), **SDMX** per cubi statistici (V12-V14).
- **H:** studiare estrazione preservando **articolo-comma-versione**, **dataflow/DSD/dimensioni**, **lingua/formato/espressione**, non convertire tutto in testo piatto perdendo relazioni.
- **Limite:** una conversione che produce JSON valido può scartare strutture e informazioni importanti; il documento 09 discute le metriche per omissioni.

## 7. Matrice delle differenze: esempio di una ricerca non ingenua

| Fonte | Discovery | Acquisizione | Aggiornamenti | Limite di copertura da registrare |
|---|---|---|---|---|
| OpenAIRE Graph | API ricerca metadata | Graph API cursore/bulk | Modifiche metadata | Aggregazione, non full text garantito |
| arXiv | OAI-PMH | Metadata harvest | Nightly | OAI versione corrente, non tutte le versioni full text |
| Europe PMC | Search/IDs | Metadata / subset OA XML | API e feed | Alcuni record solo metadata |
| DataCite | DOI metadata | GET pubblico read-only | Metadati publisher | DOI non equivale a dataset bytes |
| Normattiva | Open Data e OpenAPI | Atti e versioni | Multivigenza | Non autentico; selezione redazionale |
| Cellar/EUR-Lex | SPARQL/REST | Manifestazioni linguistiche/formati | Metadata / notices | Work/Expression/Manifestation non 1:1 con URL |
| Europarl | OpenAPI | Documenti/procedure | Feed con finestre | Non tutti feed hanno la stessa retention |
| Eurostat/Istat | Catalogue/SDMX | Cubi e strutture | Revisioni / dati correnti | Valori precedenti non disponibili (Eurostat); quota Istat |
| ActivityPub | Public outbox | Collection/pagine autorizzate | Attività pubblicate | Vista dipendente dai permessi, gap possibili |
| atproto | Repo / firehose | CAR / blob separato | #commit/#sync | Omissione di intero repo via relay e blob mancanti |

**Questa è una tassonomia di ricerca, non un progetto approvato, e non un confronto prestazionale.** Nessuna categoria è di per sé esaustiva o preferita per tutte le sorgenti.

## 8. Domande falsificabili per eventuali futuri benchmark (NON eseguiti)

1. **Metadati vs byte:** stesso corpus OA in un catalogo, OAI e file host; un count di DOI/ID che supera i file realmente autorizzati va segnalato, non come successo.
2. **Versioni giuridiche:** un atto con originale/vigenza/multivigenza, più lingue/manifestazioni; misurare version recall senza contare URL come leggi.
3. **Official vs non-authentic:** Normattiva vs Gazzetta e Cellar official metadata; il motore non deve trasformare la fonte redazionale in «testo giuridico ufficiale».
4. **SDMX semantic integrity:** DSD versionate, codici ritirati, valori mancanti e revisioni; misurare dimension/codelist/flag recall, non solo CSV rows.
5. **Istat-rate compliance:** fonte sintetica con quote 5/min e ban simulato; qualsiasi superamento è fallimento, non «alta prestazione».
6. **OpenAIRE pagination:** 10k offset cap, cursori, bulk, record rimossi in scansione; misurare unique research-product IDs e falsa completezza.
7. **ATProto gaps:** stream con repository totalmente filtrato vs gap interno al commit; distinguere detectable gap da blind spot globale.
8. **Blob completeness:** repository CAR integro ma 1/10 media file non disponibile; non dichiarare asset corpus completo.
9. **ActivityPub access:** public outbox con pagine soggette ad ACL, oggetti cancellati e cross-server duplicati; protezione di privacy e no accessi non autorizzati.
10. **Mixed formats:** Data Package CSV + PDF + XML + file supplementare; assicurarsi che output estratto e original raw siano entità distinte.

Per i test di questa matrice **serve un sandbox/testbed controllato, diritti documentati, stesso budget e un inventario gold con tempi/versioni noti**. Gli esperimenti non sono stati eseguiti in questa sessione e non costituiscono decisioni tecniche.

## 9. Ipotesi di avanzamento (non specifiche)

- **Source-semantic acquisition:** capire che cosa definisce *un'unità informativa* per il dominio (law version, statistical observation, research work, social repo record, media blob).
- **Contract-first discovery:** preferire, quando utili e lecite, API/cataloghi/stream ufficialmente documentati; browser/HTML sono strategie complementari, non unica via.
- **Multi-view reconciliation:** deduplicare rappresentazioni senza fondere espressioni, versioni, diritti e file diversi.
- **Time+rights fidelity:** tracciare revision date, effective date, times of observation, access policy e scope dell'originale; evitare false affermazioni di completezza.
- **Semantic preservation:** convertire formati complessi mantenendo unità, codici, struttura XML, pagine, intervalli, relazioni.
- **Adaptive legal throttling:** quote/politeness come limiti non negoziabili; sapere che Istat/Europarl hanno condizioni numeriche specifiche non significa che siano uguali per tutti gli endpoint per sempre.

Nessuna di queste ipotesi decide librerie, storage, codice, moduli o prodotti. Il progetto resta un **solo sistema automatico**, senza profili selezionabili.

## 10. Ricerca ancora mancante prima della sintesi finale

- Altre famiglie verticali: **repositories di sequenze biologiche, brevetti e standard tecnici, archivi audiovisivi, web archive federate e dataset scientifici con contenuti a pacchetti**.
- Campionamento reale di adozione: quanto dei portali italiani/europei offre API corrette e consumabili, non solo specifiche.
- Formati multi-file e manifest/metadata digital preservation (METS/PREMIS/E-ARK), con limiti e licenze reali.
- Costi, retries, memory/cpu, rate ceilings, decisione automatica HTTP/browser/api, e benchmark dei falsi «successi» su sorgenti eterogenee.
- Quadro dell'acquisizione adattiva **uniforme a livello di regole** ma non uniforme nel significato degli asset: misurare la differenza rispetto a pipelines per-sito.

**Chiusura:** ricerca aggiornata al 2026-11-02, con le limitazioni dei publisher esplicitamente registrate. Nessun download, test, codice o stack f3tcher approvato; nessuna affermazione di completezza universale o originalità assoluta.
