# Pilot 01 — acquisizione HTML + API (testbed locale e sintetico)

**Stato:** piccolo esperimento effettivamente eseguito il 2026-11-02 in un ambiente locale, **NON** un benchmark delle prestazioni di f3tcher, Crawlee, Scrapy o browser. Il codice è uno strumento di ricerca *usa e getta*, non il motore da distribuire né una scelta di architettura. È la prima attività di prova successiva al [protocollo 24](../../docs/24_PROTOCOLLO_VALIDAZIONE_SCIENTIFICA.md), con **perimetro limitato** a P1 (canale) e P2 (incompletezza dichiarata).

## Come eseguire, senza servizi esterni

Da questa directory:

~~~sh
python3 pilot_http.py > results_reproduced.json
python3 -m unittest discover -s . -p 'test_*.py' -v
~~~

Dipendenze: **solo Python 3**, libreria standard. Il server ascolta su una porta temporanea di **127.0.0.1** e le funzioni di acquisizione rifiutano URL verso altri host o fuori da \`/s/\`. Non richiede GitHub secrets, chiavi API, servizi cloud o siti pubblici.

Il codice di prova definisce **quattro corpora sintetici**; \`GOLD\` è visibile al server e al valutatore, ma **non è passato ai tre metodi di acquisizione**. Questo non equivale a un vero holdout esterno: chi ha scritto il metodo conosce il testbed. Non usare il risultato per rivendicare generalizzazione.

## Sorgenti sintetiche

| Scenario | Gold | Accessibile tramite HTML | Accessibile tramite API pubblicizzata |
|---|---:|---:|---:|
| \`html\` | 12 | 12 | Nessuna API |
| \`api\` | 12 | 0 | 12, in 2 pagine |
| \`mixed\` | 18 | 8 | 12 (due record sovrapposti) |
| \`truncated\` | 12 | 4 | 4, con \`declared_total=12\` |
| **Totale** | **54** | **24** | **28** |

Il metodo \`hybrid\` **non è un router adattivo né un agente AI**: legge l'HTML e segue anche l'alternate link verso l'API quando esposto, unendo gli ID. Il metodo \`api\` legge la landing solo per scoprire l'alternate link, ma non interpreta i record HTML.

## Risultati effettivamente osservati (un run deterministico)

| Metodo | Recuperati / gold | Recall solo su questo testbed | Richieste GET locali | Scenari segnalati come incompleti |
|---|---:|---:|---:|---:|
| HTML | 24 / 54 | 44,44% | 4 | 0 (4 esiti **unknown**) |
| API | 28 / 54 | 51,85% | 9 | 2 |
| Hybrid HTML+API | 46 / 54 | 85,19% | 9 | 1 |

Fonte: [results.json](results.json), ottenuto con [pilot_http.py](pilot_http.py). La maggiore copertura dell'unione è **attesa per costruzione**: è un controllo di fattibilità e di conteggio, **NON** evidenza che «f3tcher batte altri sistemi». Le richieste GET sono *sul simulatore*, non confronti di costo CPU, RAM, traffico, browser-seconds o denaro. Non sono presenti repliche, intervalli di confidenza, campioni indipendenti o controllo di drift.

**Risultato di affidabilità:** nello scenario \`truncated\`, API e hybrid recuperano **4/12** e segnano \`incomplete\` perché la sorgente fornisce esplicitamente un totale dichiarato. Senza un conteggio o inventario attendibile, un'implementazione reale deve dire **unknown**, non «completo».

**Caso \`mixed\`:** API 12/18 dichiara \`incomplete\`; hybrid 18/18 dichiara \`complete_within_declared_count\`. Anche questo stato è **circoscritto** a un totale fornito dal simulatore: non equivale a censimento dell'universo dei dati.

## Limite browser — nessun risultato attribuibile a Chromium

Un primo harness comprendeva una prova Playwright/Chromium sulla sola pagina locale, ma l'ambiente ne ha bloccato l'accesso a 127.0.0.1 con **\`net::ERR_BLOCKED_BY_ADMINISTRATOR\`**. La prova **non è stata completata**; il codice definitivo e i risultati conservati qui includono **esclusivamente HTML e API**, senza simulare o forzare un browser né modificare restrizioni amministrative.

## Limiti e prossima prova richiesta

- Un solo campione di quattro casi costruiti insieme al codice; **nessuna validità esterna**.
- Non testati HTTP/browser adattivo, JavaScript SPA, feed, file composti, deduplica semantica, diritti reali, API quota, concorrenza, costi reali, shock temporali, storico o casi non-adopter.
- I totali dichiarati possono essere errati nelle fonti vere; non sono prova di completeness assoluta.
- Per un confronto scientificamente utile occorre un **gold testbed congelato indipendentemente dal metodo**, casi holdout, versioni software congelate, baseline reali (Scrapy/Crawlee se lecite/possibili), più repliche e budget primari comparabili secondo il doc 24.
- Ogni accesso futuro a fonti reali richiede una verifica separata dei diritti e delle condizioni della sorgente.

**Il primo passo sperimentale non seleziona un framework definitivo.**
