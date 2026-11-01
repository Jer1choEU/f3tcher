# 05 — Domande aperte, ricerca sperimentale e benchmarking

**Non esistono benchmark f3tcher eseguiti al 2026-11-01.** Questo documento conserva il piano **ipotetico** di verifica: nessun criterio è ancora approvato come gate di rilascio.

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
