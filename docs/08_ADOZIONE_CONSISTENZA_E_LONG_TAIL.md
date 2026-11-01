# 08 — Ricognizione empirica: adozione dei protocolli, consistenza delle sincronizzazioni e copertura selettiva

**Data:** 2026-11-01. **Stato:** solo ricerca; nessun codice, benchmark o interrogazione automatica di fonti esterne eseguiti da f3tcher. Prosegue [07_RICOGNIZIONE_2026-11-01.md](07_RICOGNIZIONE_2026-11-01.md), che contiene le definizioni dei protocolli. L'obiettivo qui è **passare dalla possibilità teorica agli esempi di adozione e ai limiti documentati**, senza fissare stack, componenti o requisiti.

**Legenda:** **V-doc** = pagina primaria/documentazione o pubblicazione verificata; **V-adozione dichiarata** = elenco/esempio del gestore verificato, *senza* test di endpoint dal vivo; **T** = dichiarazione di un fornitore o curatore non replicata; **H** = ipotesi nostra da testare. Citazioni qui come URL stabili, non come prove di prestazioni f3tcher.

## 1. Discovery tipizzata: FAIR Signposting ha implementazioni reali

- **V-adozione dichiarata:** https://signposting.org/adopters/ elenca Dataverse (supporto annunciato da 5.14), DSpace (da 7.6), DSpace-CRIS, InvenioRDM, Zenodo, Biblio Ghent, Digital Repository Ireland, CKAN extension, DANS, ecc.; attenzione: *elenco di implementazioni dichiarate*, non censimento di ogni istanza attiva.
- **V-doc, esempio concreto:** nella stessa pagina, Biblio dell'Università di Ghent ha un esempio di header `Link` contenente `cite-as`, `item` (PDF) e `describedby` (RDF/XML, BibTeX, MODS, ecc.). URL esempio: https://biblio.ugent.be/publication/8762613 . Non abbiamo verificato live gli header di questa risorsa.
- **V-doc:** https://signposting.org/FAIR/ distingue Level 1, typed links in `Link` header / HTML `<link>`, e Level 2 con Linkset comprensivo, potenzialmente letto da client automatici senza rendering della pagina.
- **V-doc / benchmark esterno esistente:** https://w3id.org/a2a-fair-metrics/ e https://s11.no/2022/a2a-fair-metrics/ descrivono test `Apples-to-Apples` (header HTTP, elementi HTML, Linkset JSON/testuale, IRIs/IDNA, relazioni `cite-as`/`item`/`describedby`). Questi sono **casi di test pubblicati**, NON benchmark eseguiti da f3tcher.
- **V-doc:** rapporto 2024 https://s11.no/2024/signposting-report/ descrive implementazioni e problemi di interoperabilità, inclusi bug scoperti nei test di Dataverse. Rapporto 2025 https://zenodo.org/records/15064493 descrive strategie, valutazioni e casi presso centri dati.
- **H:** su un corpus controllato di repository, confrontare HTML-only vs HTML+Link header vs HTML+Linkset (stesso budget) per quantità di **risorse uniche validate e autorizzate**, non solo nuovi URL. Testare link esterni, type MIME errato, redirect, identifier che non risolve e linkset incompleto.

**Interpretazione:** protocol-first è giustificato come *direzione di ricerca*: esistono casi reali. Resta ignota la frequenza delle installazioni che lo implementano bene, il vantaggio quantitativo e la robustezza generale. Non presumere che Linkset equivalga a inventario completo.

## 2. Workflow API: Arazzo esiste, ma supporto e diffusione non vanno sopravvalutati

- **V-doc:** https://www.openapis.org/arazzo-specification e https://spec.openapis.org/arazzo/latest.html : Arazzo 1.1.0 (maggio 2026) esplicita workflow di API OpenAPI/AsyncAPI, dipendenze, selector e criteri. Un documento Arazzo non autorizza l'esecuzione; alcune procedure includono POST, autenticazioni o operazioni mutative.
- **T (ecosistema censito dal vendor, non prova di adozione generalizzata):** https://usearazzo.com/ecosystem/ (revisionato 2026-10-02) elenca esempi, implementazioni e toolkit. Riporta che **la maggioranza dei tool mira ancora ad Arazzo 1.0.1** pur essendo 1.1.0 la spec attuale.
- **T, esempi di workflow realmente pubblicati:** https://usearazzo.com/ecosystem/ elenca workflow Jentic, directory APIs.io e Stedi healthcare; in aggiunta, esempio pubblico di un provider: https://connectbyjbrh.com/developers/arazzo-workflows/ (dichiara Arazzo 1.1.0 e tre workflow sulle API documentali). Sono *affermazioni dei siti*, non abbiamo eseguito quei workflow né verificato la correttezza di tutte le risorse.
- **V-doc + T dell'autore:** https://github.com/strefethen/arazzo-cli offre un esecutore con validazione, simulazione/dry-run e trace; https://usearazzo.com/ descrive validator/runner/CLI pre-1.0. Non sono soluzioni adottate e non ne sono stati esaminati licenza/versioni eseguibili nel dettaglio.
- **H:** studiare la *discovery della descrizione Arazzo* (non basta che esista un file), la compatibilità/versione, la distinzione fra procedure read-only e side effect, la validazione dei riferimenti e l'esecuzione solo in ambienti propri/consentiti. Confrontare documenti scritti da provider con documenti generati da terzi.
- **Conclusione prudente:** Arazzo rimane un candidato interessante *ma non base universale*. In assenza di documenti pubblicati dalla fonte, l'adattatore deve poter usare altre interfacce autorizzate; non impegnarci a un runner o formato prima delle prove.

## 3. Consistenza: il protocollo delta non equivale a uno storico completo né alla replica perfetta

- **V-doc ufficiale** https://learn.microsoft.com/en-us/graph/delta-query-overview : Microsoft Graph usa `@odata.nextLink` (pagine successive) e `@odata.deltaLink` (ciclo completo). La documentazione avverte di duplicati, riordino delle entità, ritardi di propagazione, proprietà non tracciate, replay, scadenza/invalidazione token con 410 e necessità di full sync.
- **V-doc ufficiale** https://learn.microsoft.com/en-us/graph/api/listitem-delta?view=graph-rest-1.0 : l'output è **stato più recente**, non ogni modifica intermedia (es. due rinominazioni possono diventare una). Questione **fondamentale**: *mirror dello stato corrente* e *storia completa degli eventi* sono obiettivi diversi.
- **V-doc ufficiale** https://developer.zendesk.com/documentation/api-basics/pagination/understanding-the-limitations-of-offset-pagination/ : sotto inserimenti e cancellazioni contemporanei, la paginazione offset può ripetere o saltare record; cursor migliori ma solo se supportati e con semantica adeguata.
- **V-doc ufficiale / confronto di un altro dominio, non promessa web** https://debezium.io/documentation/reference/stable/connectors/postgresql.html : Debezium combina snapshot iniziale, capture del log, snapshot incrementali riavviabili in presenza di eventi continui. Richiede accesso al log della sorgente: non trasferire queste garanzie a un sito/API generica.
- **V-doc ufficiale** https://docs.getdbt.com/best-practices/how-we-handle-cdc/1-intro : snapshot periodiche non catturano ogni cambiamento intermedio; modelli incrementali e storia sono distinti. 
- **H1: continuity ledger.** Distinguere *stato mirrorizzato* da *eventi osservati* e *storia provabile*: `change observed` non significa `all changes observed`.
- **H2: bounded reconciliation.** Sulle fonti con API permessa, confrontare inventari e delta dopo fault/expiry/lag senza fingere snapshot isolation quando non fornita. Se il solo canale è offset pagination, registrare l'incertezza e usare finestre/overlap/riletture consentite.
- **H3: freshness debt.** Accumulare l'intervallo di modifica che non si è potuto verificare, invece di azzerare artificialmente il ritardo al success del job. È una metrica *ipotetica*, non una garanzia algoritmica.

## 4. Risorse rare e bias: più efficienza media può ridurre la copertura di ciò che conta

- **V-articolo peer-reviewed, 2025:** Brown et al., *Web scraping for research: Legal, ethical, institutional, and scientific considerations*, https://journals.sagepub.com/doi/10.1177/20539517251381686 . Evidenzia scarsa conoscenza del sampling frame e **missingness non casuale**; le interfacce possono ordinare/filtrare i risultati in modo non rappresentativo.
- **V-articolo peer-reviewed, 2025:** Hagar & Bandy, *Practical Datasets for Analyzing LLM Corpora Derived from Common Crawl*, https://ojs.aaai.org/index.php/ICWSM/article/view/35948 : dataset su **96 snapshot Common Crawl** e URL di più corpora per indagare rappresentazione delle fonti e filtri. Non è un benchmark di f3tcher né una stima della parte non osservabile.
- **V-articolo peer-reviewed, 2004:** Cothey, *Web-crawling reliability*, https://onlinelibrary.wiley.com/doi/10.1002/asi.20078 : politiche di crawling cambiano il contenuto osservato; il problema è strutturale e non nato con gli LLM.
- **V-abstract / paper recente:** https://aclanthology.org/2026.wac-1.7/ *Host-Aware Web Crawling for LLM Pretraining Data* (Ostendorff, 2026): campionare alcune pagine per host e allocare fetch a host di maggiore valore incrementa la resa per *pretraining* nei suoi esperimenti, **non prova** che sia giusto trascurare fonti piccole per un acquisitore universale.
- **T / database metodologico da verificare nel metodo:** https://measuretheweb.org/design/sampling registra pratiche di campionamento in letteratura sicurezza/privacy, con enfasi sui bias dei top-N. Non trasformare le percentuali presentate nel sito in prevalenze universali del web.
- **H4: dual objective**: distinguere il massimo *yield* di informazioni desiderate dalla protezione delle *code rare* (long tail), con una quota esplorativa e risultati per strato/fonte; il modello matematico e le pesature sono da studiare, non scelte.
- **H5: explicit uncertainty**: non dichiarare 100% né percentuali quando manca l'inventario di riferimento; confrontare più canali solo se sufficientemente indipendenti e valutare bias/dipendenze. Registrare anche il motivo dei blocchi legali senza aggirarli.

## 5. Confronto focalizzato: nuovi interrogativi misurabili, non implementati

| Nodo | Ipotesi e confronto (da definire su testbed autorizzato) | Esito che la smentirebbe |
|---|---|---|
| Typed discovery | HTTP+HTML vs HTTP+HTML+Signposting/Linkset (A2A come test di conformità) | Costi superiori, nessuna risorsa *verificata* aggiuntiva |
| Workflow published vs inferred | Arazzo provider/third-party e API read-only vs azioni inferite; schema-only validation vs semantic+dry-run | Documenti rari, run non deterministiche, side effects non classificabili |
| Continuous changes | Offset vs cursor vs delta; add/update/delete durante più pagine, evento duplicato, lag e token scaduto | Mirror divergente o history completeness falsa dopo full resync |
| Long tail | Priorità per resa media vs campionamento stratificato/host e quota di esplorazione | Migliora throughput ma peggiora recall nelle fonti rare |
| Stima copertura | Known inventory, intersection, indicatori esterni e categorie senza ground truth | Stime troppo sicure/false sotto missingness non casuale |
| Audit delle acquisizioni | Success tecnico vs coverage, freshness debt, document versions | Successi HTTP 200 con omissioni che passano inosservate |

Le sei righe sono **ipotesi di ricerca**, non criteri di rilascio né esperimenti già eseguiti. Un eventuale confronto richiede budget identico, stesso periodo, diritti equivalenti e un ground truth sulle fonti di prova; per le fonti senza ground truth, dichiarare limiti.

## 6. Opportunità per distinguere f3tcher (ipotesi, non claim di originalità)

Potrebbe emergere un **motore che non ottimizza soltanto il prossimo fetch, ma quantifica anche il debito di copertura, consistenza e provenienza**. Le dimensioni restano distinte:
1. *Discovery debt*: quali classi/fasce di dati potrebbero mancare.
2. *Synchronization debt*: quali intervalli di aggiornamenti non sono stati riconciliati.
3. *Evidence debt*: quali record estratti non hanno riscontri sufficienti.
4. *Permission constraints*: dati disponibili tecnicamente ma non acquisibili/riutilizzabili nel perimetro lecito.

Non serve inventare profili utente o costruire subito un'architettura di quattro sistemi: queste sono **proprietà da misurare all'interno dell'unico motore automatico**. L'obiettivo è evitare che un job `success` diventi una falsa dichiarazione di qualità.

## 7. Prossimi filoni aperti

- **Prove sul campo non invasive**, una volta autorizzata una fase di benchmark: verificare header pubblici di una piccola selezione di repository Signposting e qualità di Linkset (senza scaricare dati protetti, senza bypass).
- **Esempi Arazzo realmente pubblicati dai provider**: distinguere workflow prodotti dal provider vs directory di terze parti e verificare discovery/interoperabilità di 1.0.1 e 1.1.
- **Capture–recapture non stazionario** e missingness MNAR: identificare quando stimare la copertura è impossibile, non forzare un numero.
- **Snapshot-consistent paging senza transazioni esposte**: esaminare protocolli che forniscono reali garanzie, senza attribuirle per analogia alle normali REST API.
- **Trade-off della long tail**: definire dati di riferimento che contengano fonti rare realmente importanti, non solo pagine ad alto ranking.
- **Critica dei benchmark**: distinguere benchmark di conformità a standard, benchmark di estrazione, di navigazione, e di copertura: non creare una classifica unica che confonde gli obiettivi.

## Stato al termine di questa sessione

- Nessuna implementazione o stack approvato.
- Nessuna prova eseguita da f3tcher e nessuna endpoint live interrogata in nome di f3tcher.
- **Nuove fonti primarie e casi di adozione verificati documentalmente; nuove ipotesi formalizzate soltanto come piste.**
- Restano validi tutti i confini di legalità e sicurezza in `04_LEGALITA_E_SICUREZZA.md`: API pubblicata, workflow pubblicato o linkset pubblicato **non** equivalgono automaticamente a diritto di raccogliere, conservare o redistribuire dati.
