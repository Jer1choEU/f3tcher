# Pilot 02 — confronto locale di acquisitori HTTP e parser esistenti

**Eseguito il 2026-11-02. Non è un benchmark scientifico indipendente e non è il motore f3tcher.**

Il testbed di prova simula 9 tipi di collezione, con 3 seed deterministici che **cambiano gli identificatori ma non i template**. Le 27 collezioni sono affrontate da 4 metodi = **108 run/coppie metodo×caso**. Tutto gira soltanto su \`127.0.0.1\`, senza crawler o siti di terzi.

## Comandi

Da questa directory, con Python 3.13+ e dipendenze già installate:

~~~sh
python -m unittest discover -s . -p "test_*.py" -v
python benchmark.py > results_reproduced.json
~~~

Per le versioni dell'esecuzione verificata: **Python 3.13.5, requests 2.32.5, Beautiful Soup 4.14.3, lxml 6.1.1**. Le librerie sono strumenti **reali e preesistenti**, ma **non** Crawlee, Scrapy o piattaforme complete di crawling. Scrapy non era installato e l'ambiente non poteva risolvere il registro PyPI: **non è stato confrontato**, né gli è stata assegnata una recall pari a zero. Analogamente il browser non è stato eseguito a seguito del blocco di Chromium documentato nel pilota 01.

**File:**
- \`fixtures.py\`: generatore/versione dei corpus e publisher HTTP controllato, include gold nascosto ai client.
- \`clients.py\`: tre baseline HTML (stdlib urllib/HTMLParser, requests+BeautifulSoup, requests+lxml) e una combinazione HTML+API (requests+BeautifulSoup+JSON).
- \`benchmark.py\`: valutatore che conosce l'inventario e registra recuperi, bytes e dichiarazioni di completezza.
- \`test_pilot.py\`: 4 test automatici (gold stabile, URL locale, 403 senza retry e risultati/assertions).
- \`results_trace.json\`: 108 risultati per caso, senza tempi locali rumorosi; il report completo con wall-clock locale si rigenera da \`benchmark.py\`.

### Limite fondamentale del «blind holdout»

\`clients.py\` **non importa** \`fixtures.py\` e l'inventario gold è disponibile soltanto al server e al valutatore. Questo è **isolamento procedurale dei dati a runtime**, **NON vera indipendenza scientifica**: gli scenari e i client sono stati progettati nello stesso lavoro. I tre seed permutano i nomi dei record senza cambiare i meccanismi; **non** sono tre prove indipendenti. Non applicare intervalli di confidenza o proclamare generalizzazione.

## Risultati del run verificato

Escludendo dal denominatore 3 collezioni sintetiche con HTTP 403, il publisher possiede **240 record gold**, ma **solo 195** sono effettivamente raggiungibili tramite i canali pubblicati nel simulatore. Sono **denominatori diversi**: la differenza di 45 comprende risorse non pubblicate nei canali disponibili, non necessariamente un difetto dei client.

| Metodo | Record raggiungibili recuperati | Copertura sui 195 raggiungibili | GET localhost | Byte di risposta |
|---|---:|---:|---:|---:|
| \`stdlib_urllib_html\` | 135 | 69,23% | 42 | 21.567 |
| \`requests_bs4_html\` | 135 | 69,23% | 42 | 21.567 |
| \`requests_lxml_html\` | 135 | 69,23% | 42 | 21.567 |
| \`requests_bs4_hybrid\` | 195 | 100% | 78 | 29.217 |

**Non interpretare 100% come universalità:** l'ibrido ha recuperato tutti gli oggetti **raggiungibili di questo testbed specifico**, non i 45 record non esposti, né alcun sito reale. Il risultato è atteso perché alcune fixture pubblicano record solo nell'API. Per la categoria \`redundant\`, aggiungere l'API non recupera alcun record in più, producendo solo un costo supplementare.

### Caso decisivo: falsa completezza

Per \`deceptive_total\` il gold contiene **10**, i due canali espongono soltanto **7**, e i metadati dell'API dichiarano **7**. L'ibrido conclude \`complete_within_declared_count\`, ma **ha perso 3 record rispetto al gold**. Succede una volta per ciascuno dei 3 seed: **3 false complete su 12 dichiarazioni «complete»** (non campioni indipendenti).

Per \`truncated\`, gold **12**, pubblicati **4**, \`declared_total=12\`: l'ibrido indica \`incomplete_vs_declared_count\` correttamente. Per \`empty\` l'esito è \`unknown\`, non una percentuale di recall definita.

**Conclusione verificabile:** il conteggio dichiarato dal publisher è una *possibile evidenza di omissione* quando i numeri non coincidono; non è una prova della completezza quando coincidono.

### Carico, sicurezza e limiti

Il metodo ibrido ha effettuato **36 GET in più** (78 vs 42) e trasferito **7.650 byte in più** (29.217 vs 21.567) rispetto a una baseline HTML. Sono valori di fixture, non costi reali, e non si può dedurre un confronto in euro o CPU. I tempi del server locale non sono un benchmark significativo.

Tutte le richieste sono GET e le funzioni \`safe_url\` rifiutano URL esterni, host diversi, traversal e path fuori dal caso. I redirect automatici sono disabilitati. Ogni caso \`denied\` (403) produce **una richiesta e nessun retry**. Nessuna richiesta su Internet.

**Cosa NON è stato testato:** Scrapy/Crawlee, browser JavaScript, API reali, file composti, feed storici, mutable-state pagination, scalabilità distribuita, diritti di asset terzi, performance in produzione, fair scheduling, AI routing, crawling su sorgenti pubbliche.

## Prossima domanda scientifica — non decisione architetturale

Serve un **vero** set di test realizzato/annotato indipendentemente da chi implementa i metodi, con holdout per dominio, e uno strumento completo di crawling installabile in un ambiente autorizzato. Il pilot02 delimita i requisiti del benchmark (denominatore e false complete), ma non sceglie il futuro stack né dimostra che f3tcher sia migliore.
