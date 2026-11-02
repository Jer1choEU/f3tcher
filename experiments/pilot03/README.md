# Pilot 03 — benchmark di fixture esterne con origine verificata (non blind)

**Eseguito localmente il 2026-11-02.** Qui non c'è un nuovo motore f3tcher: ci sono solo client HTTP di confronto e un testbed pubblicato da un progetto **terzo**. Nessuna richiesta verso Internet durante il benchmark.

## Materiale upstream

- Repo: https://github.com/thunderbit-operations/scraper-benchmark
- Commit upstream fissato: \`f01471d6eafb345df0f009f1fb517622c43a1dd7\` (14 agosto 2026).
- MIT copyright (c) 2026 Thunderbit: [licenza completa](vendor_thunderbit/LICENSE).
- Copia **non modificata** di \`tools/crawlee/fixture-server.mjs\`, Git blob \`f33a3402bf8e1db6a612ae4c8f51c115430dab15\`.
- Copia **non modificata** di \`tools/crawlee/results/local_fixture_ground_truth.json\`, Git blob \`8b0d88367b45d84df86a110a3e282aa8647d3d92\`.
- Specifica della fixture esterna: https://github.com/thunderbit-operations/scraper-benchmark/blob/main/METHODOLOGY.md

**Nota sull'indipendenza:** sorgente + inventario sono stati pubblicati da un'organizzazione **altra rispetto a f3tcher**. Tuttavia i client \`benchmark.py\` sono stati programmati **dopo aver letto quella fixture**; non è uno studio alla cieca. Thunderbit opera commercialmente nel settore; non è un benchmark neutrale per definizione. Il fatto che i suoi runner dichiarino risultati Crawlee/Scrapy NON costituisce una nostra riproduzione.

## Comandi senza costi e senza Internet

Prerequisiti: \`node\` (il server originale usa solo Node stdlib), \`python3\`, \`requests\`, \`beautifulsoup4\`. Ambiente effettivo Python **3.13.5**, Node **22.16.0**, Requests **2.32.5**, Beautiful Soup **4.14.3**.

~~~sh
python -m pip install -r requirements.txt   # solo quando il download è consentito; già installate nel runner originale
python -m unittest discover -p "test_*.py" -v
python benchmark.py > results_regenerated.json
~~~

Per questo benchmark i client accettano solo richieste \`GET\` sotto la porta **loopback 127.0.0.1** del server, disabilitano redirects e vietano l'accesso a \`/ground-truth.json\` e al percorso robots disallowed. Nel codice non sono presenti esecuzioni remote, mutazioni del server, credential usage o proxy.

## Risultati osservati nella prova locale

| Strategia | Prodotti HTML statici | Prodotti JS visibili in HTML grezzo | Prodotti da API letta in modo lecito | Paragrafi articolo | Richieste | Byte di risposta |
|---|---:|---:|---:|---:|---:|---:|
| \`urllib_html\` | 12/12 | 0/8 | non tentata | 3/3 | 5 | 7.724 |
| \`requests_bs4_html\` | 12/12 | 0/8 | non tentata | 3/3 | 5 | 7.724 |
| \`requests_bs4_literal_api\` | 12/12 | 0/8 | **8/8** | 3/3 | 6 | 8.440 |

Il client \`requests_bs4_literal_api\` legge esclusivamente il **literal \`fetch('/api/dynamic-products')\` presente nella pagina**; esegue una singola GET localmente e abbina gli 8 ID al ground truth. **Non** esegue JavaScript, non scopre API generiche, non è un crawler completo o un selettore adattivo.

Tutti i metodi hanno registrato la risposta **HTTP 500** alla pagina \`/failure/500\`. Il costo marginale dell'API in questa fixture è una GET e **716 byte**: non è una previsione sui costi di altre fonti.

**4 test automatici superati**: corrispondenza esatta dei Git blob upstream, scope/URL guard, errore HTTP 500 e assenza di accessi al gold dal client, verifica degli esiti statici/dinamici/articolo.

## Cosa NON abbiamo misurato

- Scrapy e Crawlee **non installati** nell'ambiente: non attribuire loro 0/12 né confrontare prestazioni.
- Playwright Python presente, ma l'engine standard non è installato e l'uso del Chromium di sistema termina con \`net::ERR_BLOCKED_BY_ADMINISTRATOR\` per l'URL locale: **browser non testato**; nessuna elusione di questa policy.
- Non abbiamo eseguito l'originario benchmark Thunderbit completo, le sue baseline JS/browser o suoi tool.
- Nessuna analisi statistica su fonti indipendenti, ripetizioni per dominio, corpus rappresentativo, cambiamenti del publisher o dati legali concreti.
- I casi sono di difficoltà modesta e il risultato 12/12 o 8/8 è una **verifica circoscritta** di un'unica fixture. Nel mondo reale una API linkata via JS non è automaticamente autorizzata al prelievo batch: va verificata la sua policy.
- Il campione Thunderbit è creato da un fornitore commerciale; la licenza MIT permette l'uso e la redistribuzione della fixture con attribuzione, ma **non** garantisce neutralità metodologica.

**Valore aggiunto rispetto al Pilota 02:** origine terza e hash congelati, client HTML e JSON verificati su una fixture che non abbiamo inventato. La vera valutazione blind e il confronto di crawler completi restano in sospeso.
