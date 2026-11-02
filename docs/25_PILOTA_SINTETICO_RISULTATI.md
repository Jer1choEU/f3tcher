# 25 — Primo pilota sperimentale locale: risultati e limiti (2026-11-02)

**Stato: ESEGUITO, solo testbed sintetico su 127.0.0.1.** Questo è il **primo codice sperimentale realmente eseguito** dopo la preparazione del [protocollo 24](24_PROTOCOLLO_VALIDAZIONE_SCIENTIFICA.md). Non è ancora un benchmark scientifico preregistrato, non esistono confronti con prodotti terzi o f3tcher come motore funzionante. L'utente ha chiesto di **procedere** dopo la proposta di testbed controllato. La portata del consenso è interpretata **solo come realizzazione di una prova locale gratuita e non invasiva**, non sviluppo definitivo, attivazione di fonti reali, servizi cloud o spese.

**Codice, istruzioni e dati osservati:** [\`experiments/pilot01/\`](../experiments/pilot01/), file [\`pilot_http.py\`](../experiments/pilot01/pilot_http.py), [\`test_pilot.py\`](../experiments/pilot01/test_pilot.py), [\`results.json\`](../experiments/pilot01/results.json). Ambiente verificato Python **3.13.5**, solo stdlib, server HTTP locale, 4 scenari, 3 metodi.

## Risultati osservati — solo su questo campione costruito ad hoc

| Canale | Record gold recuperati | Richieste HTTP locali | Scenario incompleto riconosciuto | Esiti \`unknown\` |
|---|---:|---:|---:|---:|
| Solo HTML | **24/54 (44,44%)** | 4 | 0 | 4 |
| Solo API dichiarata | **28/54 (51,85%)** | 9 | 2 | 1 |
| HTML ∪ API dichiarata | **46/54 (85,19%)** | 9 | 1 | 1 |

**Gold fixture:** HTML \`html\` 12/12, API \`api\` 12/12, \`mixed\` 18 (8 HTML, 12 API, 2 di overlap), \`truncated\` 12 (4 esposti su HTML e API con metadata \`declared_total=12\`); **54** in totale. Hash canonico della struttura gold nel report JSON: \`2ff0d8bae6c68db47e5d33fbbf502fa86024c3cae3b5a1e49556189a45479508\`.

**Per caso e metodo:**

| Scenario | Gold | HTML | API | HTML∪API |
|---|---:|---:|---:|---:|
| html | 12 | 12 | 0 | 12 |
| api | 12 | 0 | 12 | 12 |
| mixed | 18 | 8 | 12 | 18 |
| truncated | 12 | 4 | 4 | 4 |

Per \`truncated\`, API e unione indicano correttamente \`incomplete\` rispetto al conteggio del publisher; HTML, senza inventario, indica \`unknown\`. Per \`mixed\`, API segnala correttamente 12/18 come incompleto mentre unione ottiene 18/18 e lo indica \`complete_within_declared_count\`. «Completo nel conteggio dichiarato» **NON** equivale a «tutto il contenuto esistente di una fonte reale».

## Esecuzione effettiva, unit test e prova browser esclusa

Eseguite e superate **2 unit test**:
1. \`test_expected_gold_and_measured_results\`: ricontrolla campione, tre metriche e giudizi di incompletezza.
2. \`test_no_external_or_out_of_scope_urls\`: rifiuto di target non locali, schemi remoti, traversal di path \`../\` e endpoint non autorizzati.

Il sistema blocca nel client qualsiasi richiesta che non sia sotto \`/s/\` sulla porta di \`127.0.0.1\` assegnata al server locale. **Nessuna fonte reale, nessuna chiave, nessuna chiamata API commerciale**, nessun server pubblico o dato personale consultato.

È stato tentato un benchmark browser basato su Playwright/Chromium, ma **Chromium ha rifiutato l'URL locale con \`net::ERR_BLOCKED_BY_ADMINISTRATOR\`**. Non siamo riusciti a misurare il browser: nessun dato del browser entra nel confronto. La versione finale usa solo la libreria standard Python e non prova a eludere la restrizione amministrativa. **Browser=non testato, NON 0% recall**.

## Interpretazione rigorosa

Questi dati dimostrano soltanto che un piccolo simulatore può: (a) esporre fonti con copertura diversa; (b) confrontare conteggi di record sotto un gold noto; (c) unire record HTML+API senza contarli due volte; (d) segnalare una discrepanza con il totale dichiarato.

**Non dimostrano:** un routing intelligente, guadagno di un algoritmo non banale, novità mondiale, prestazioni reali, completezza generalizzabile, confronto fra Scrapy e Crawlee, gestione di JS, robustezza del parser su siti reali, costi comparabili. Il metodo hybrid è una **semplice unione** dei due percorsi: le sue prestazioni sono favorite dal disegno stesso del simulatore. Nessuna ripetizione o holdout, nessuna confidence interval e nessuna misura CPU, RAM, browser-seconds, euro o fairness.

**Osservazione metodologica cruciale:** HTML e API insieme richiedono lo stesso numero di GET della baseline API in questo particolare simulatore perché la pagina HTML viene **comunque letta** per individuare il link alternativo. Non significa che un multicanale costi sempre quanto un'API reale. Anche un \`declared_total\` corretto in un simulatore non è affidabile per definizione su fonti esterne.

## Stato del percorso e prossimi passi possibili

- **G0 — protocollo documentale:** doc24, esistente.
- **G1 — consenso per un pilota locale:** interpretato dalla richiesta \`procedi\`, per scopo **limitato**.
- **G2 — preregistrazione comparativa completa:** **NON soddisfatto**. I test attuali sono un **exploratory smoke test**, non valutazione confermatoria; gold e algoritmi sono stati progettati insieme.
- **G3 — prove su tool terzi e testbed indipendente:** **NON eseguito**.
- **G4 — decisioni architetturali su prove:** **NON avviato**.

La prossima prova scientificamente utile richiede fixture **indipendenti** dai metodi, benchmark con **Scrapy/Crawlee** su versioni congelate, casi JS solo in un ambiente dove il browser sia consentito, metriche separate e costi/quote confrontabili. I vincoli di legalità e diritti rimangono invariati e qualsiasi accesso esterno o costo richiede una nuova decisione consapevole.

**Non modificare il codice del simulatore per inseguire una soglia percentuale.** Congelare il gold, registrare qualsiasi deviazione futura e pubblicare anche i casi in cui il metodo multicanale non aggiunge valore.