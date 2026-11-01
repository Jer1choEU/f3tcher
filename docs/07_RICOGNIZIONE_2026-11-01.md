# 07 — Nuova ricognizione: workflow descritti, discovery tipizzata, delta consistente e policy

**Data:** 2026-11-01. **Stato:** ricerca documentale, nessun codice, test o benchmark f3tcher. **V** = fonte primaria consultata direttamente nella ricognizione; **P** = pista da approfondire. Le implicazioni per f3tcher sono *ipotesi*, non impegni architetturali.

## Sintesi: cosa aggiunge rispetto ai documenti 00–06

1. **Workflow API machine-readable, non solo endpoint** — Arazzo 1.1.0 consente di descrivere dipendenze, input/output, success criteria e workflow fra API (incluse descrizioni OpenAPI / AsyncAPI). Ipotesi: utilizzare workflow pubblicati e consentiti come *procedure di acquisizione verificabili* prima di generare navigazioni nuove con AI. Una descrizione non concede accesso; non eseguire operazioni mutative o non autorizzate.
2. **Typed-link discovery e inventari delegati** — FAIR Signposting e RFC 9264 Linkset collegano landing page, contenuti, metadati, identificativi e licenze, anche con link esposti via header HTTP e linkset indipendenti. Ipotesi: aumentare discovery di collezioni poco navigabili, con informazioni meno costose rispetto al rendering integrale. I link di terzi richiedono trust/validazione.
3. **Sincronizzazione con significato di consistenza** — OData Delta traccia aggiunte, modifiche, eliminazioni, pagine di delta in ordine e scadenza dei token (es. 410 -> refetch). Ipotesi: misurare *consistenza del mirror* e capacità di riconciliazione, non solo velocità dei polling. Supporto del server necessario; OData 4.02 consultato è una specifica evolutiva, non assumere che ogni server la implementi.
4. **Policy espresse come dati** — W3C ODRL 2.2 consente permission, prohibition, duty, constraint su asset. Ipotesi: raccogliere espressioni leggibili da macchina per il registro di policy; **mai** considerare ODRL come autorizzazione giuridica autosufficiente o sostituto di valutazione umana/contrattuale.
5. **Separare active search e active surveying** — lo studio di Garnett et al. (ICML 2012) distingue il trovare rapidamente elementi rari dall'estimare la percentuale di una categoria nel totale. Per un motore generalista potrebbero essere due obiettivi complementari della stessa strategia automatica: massimizzare dati utili e misurare quanto si ignora, soprattutto su fonti rare.
6. **Integrità e conservazione delle acquisizioni** — BagIt RFC 8493 definisce manifest e checksum dei payload; OCFL 1.1 propone versioning e struttura preservabile. Complementi possibili a WARC/WACZ; non aumentano automaticamente la quantità di informazioni acquisite e non autorizzano la conservazione di contenuti protetti.

## Registro nuove fonti controllate (V)

| ID | Fonte primaria | Fatto verificato | Limiti / domanda per f3tcher |
|---|---|---|---|
| V-07-01 | OpenAPI Initiative, Arazzo Spec 1.1.0, https://spec.openapis.org/arazzo/latest.html | Workflow fra operazioni/API con dipendenze, input, output, condizioni di successo e fallimento | Copertura reale degli Arazzo pubblicati da provider; autenticazioni e mutazioni sempre soggette a policy |
| V-07-02 | OAI/Arazzo-Specification, https://github.com/OAI/Arazzo-Specification | Spec ufficiale e catalogo tooling Arazzo; licensing del progetto specifica Apache-2.0 | Ecosistema eterogeneo; niente runtime adottato |
| V-07-03 | UseArazzo, https://github.com/usearazzo | Toolkit con runner/validator; dichiara Arazzo 1.0–1.1 e OpenAPI 2/3.0/3.1; AsyncAPI non supportato nel runner descritto; pre-1.0 | Verificare release, licenza, sandbox, gestione richieste non idempotenti e sicurezza prima di qualsiasi riuso |
| V-07-04 | RFC 9264 Linkset, https://www.rfc-editor.org/rfc/rfc9264.html | Linkset JSON e formato Link-header; relazione linkset e link di terzi | Provenienza e fiducia dei link di terzi; non implica accessibilità dei target |
| V-07-05 | FAIR Signposting, https://signposting.org/FAIR/ | Typed links per identifiers/metadata/content/license; livelli 1 e 2, HTTP Link e Linkset | Diffusione disomogenea; licenza segnalata non sostituisce analisi dei diritti |
| V-07-06 | OASIS OData Protocol (bozza in evoluzione 4.02), https://oasis-tcs.github.io/odata-specs/odata-protocol/odata-protocol.html | Delta link/paginazione/tombstone; 410 Gone per token scaduto e refetch | Specifica evolutiva; non assumere supporto diffuso né istantanee coerenti per API non OData |
| V-07-07 | W3C ODRL Information Model 2.2, https://www.w3.org/TR/odrl-model/ | Espressione di permission, prohibition, duty, constraint | Compliance non automatica; dichiarazioni incomplete o contraddittorie richiedono review |
| V-07-08 | RFC 8493 BagIt, https://www.rfc-editor.org/info/rfc8493/ | Payload manifest, completezza e validazione checksum | Integrità dei byte != veridicità del contenuto, né titolo legale di archivio |
| V-07-09 | OCFL Specifications, https://ocfl.io/ | Layout trasparente, versionamento degli oggetti e controllabilità della consistenza | Costi di storage/versioning; confrontare con WARC/WACZ |
| V-07-10 | Garnett et al., Bayesian Optimal Active Search and Surveying, ICML 2012, https://publications.ri.cmu.edu/bayesian-optimal-active-search-and-surveying | Obiettivi formali distinti: trovare positivi vs stimare prevalenza | Modelli teorici non dimostrano efficacia nel crawling web e con bias MNAR |

## Piste già nel registro 03 ora controllate sull'abstract primario (V-parziale)

- https://arxiv.org/abs/2610.13321 — Malte Ostendorff, *Host-Aware Web Crawling for LLM Pretraining Data* (ottobre 2026): negli esperimenti dichiarati, pochi campioni per host guidano l'allocazione verso pagine classificate di qualità; la qualità *pretraining* non coincide con il valore/completezza per f3tcher. Verificato **abstract**, non replicazione.
- https://arxiv.org/abs/2602.24262 — Qi et al., *Coverage-Aware Web Crawling ... Web–Knowledge–Web* (febbraio 2026): pipeline che usa grafo e stima copertura per indirizzare discovery; **abstract verificato**, risultati di un solo settore, generalità non dimostrata.
- https://arxiv.org/abs/2607.13636 — Paris, Celikkanat, Foppiano, *Measuring What the Crawler Sees* (luglio 2026): discovery curves, distinzione core persistente / shell dinamica, discrepanze fra modelli uniformi e osservazioni. **Abstract verificato**, nessuna applicazione empirica a f3tcher.

## Ipotesi di ricerca e prove da definire (non eseguite)

| Ipotesi | Controllo comparabile | Segnale di fallimento |
|---|---|---|
| H1: Arazzo + OpenAPI consentono acquisizioni affidabili con meno esplorazione | Stesso provider/testbed autorizzato: procedura documentata vs generata da zero, conteggi validi, costo e recupero errori | Workflow non pubblicati, incompleti, mutativi o semanticamente inadeguati |
| H2: typed links aumentano scoperta di risorse | Collezioni che pubblicano FAIR Signposting/Linkset: baseline HTML crawl vs HTML + Link/Linkset, stesso budget | Nessun incremento di risorse uniche verificabili; link esterni non affidabili |
| H3: delta protocol-native riduce perdite e duplicati | Testbed simulato con add/update/delete, token scaduto, cursor e pagine fuori ordine; confrontare full scan e delta+reconcile | Mirror divergente dopo guasto/ripresa; eliminazioni ignorate |
| H4: policy leggibili da macchina migliorano la tracciabilità senza falsi allow | Dataset di policy ODRL e restrizioni testuali su testbed; decisioni allow/deny/review tracciate da policy evaluator | Falsi permessi o soppressione di vincoli non interpretati |
| H5: active search + active surveying proteggono anche collezioni rare | Simulare fonti con diverse prevalenze e costi; confrontare FIFO, host-aware, bandit e active-search/surveying | Aumento produttività media ma perdita sistematica delle categorie rare |
| H6: manifest e versioni migliorano l'affidabilità degli archivi | Corrupt/partial download/replay su testbed; checksum, perdita di record, tempo e spazio necessari | Archivi formalmente validi ma contenuti incompleti o cancellazioni non applicate |

## Questioni trasversali emerse

- **Copertura e consistenza sono diverse:** un mirror può essere sincronizzato correttamente rispetto all'inventario conosciuto, ma aver scoperto solo una parte della popolazione.
- **Legalità e tracciamento diritti sono diverse:** le espressioni ODRL sono indizi/asserzioni da valutare, non autorizzazione universale.
- **Descrizioni e procedure non sono credenziali:** Arazzo/OpenAPI/Linkset segnalano interfacce, senza concedere diritto a usarle.
- **Archive fixity e source truth sono diverse:** checksum prova integrità della copia, non qualità o completezza del dato.
- **Valore informativo e numero di pagine sono diversi:** studiare l'obiettivo active-search insieme alla stima del non osservato, non un solo score di qualità.

## Prossima ricerca (non roadmap di sviluppo)

- Cercare dataset reali che espongano Arazzo, Linkset/FAIR Signposting e OData Delta, per studiare adozione e fallimenti ordinari, senza fare acquisizioni non autorizzate.
- Verificare licenze, maturità e sicurezza dei runner Arazzo; non incorporare prima di valutazione.
- Cercare lavori di *snapshot-consistent pagination*, rilevamento di omissioni e sincronizzazione multi-fonte sotto aggiornamenti concorrenti.
- Approfondire bias delle fonti rare e modelli di *active search/surveying* in presenza di popolazioni non stazionarie.
- Studiare quali politiche macchina siano davvero adottate dalle fonti e come segnalare review anziché falso allow.

Nessuna decisione di stack, specifica o implementazione discende automaticamente da questo documento.
