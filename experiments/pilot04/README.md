# Pilota 04 — Scrapy vs Crawlee reali in GitHub Actions

**Stato iniziale:** prova CI automatizzata su GitHub Actions, non una versione funzionante del motore f3tcher. **Non riportare alcuna prestazione come misurata finché la run CI non ha terminato con esito positivo e sono state esaminate le tracce.**

## Perché questo ambiente
Il runtime della sessione ChatGPT non ha Scrapy/Crawlee installati e le interrogazioni a PyPI/npm falliscono con DNS temporaneamente indisponibile. GitHub Actions su **runner standard di una repository pubblica** è documentato da GitHub come gratuito; il workflow ha timeout di 8 minuti e permessi \`contents: read\`. Non usa runner maggiorati, credenziali/segreti o servizi cloud a pagamento.

Il workflow [pilot04.yml](../../.github/workflows/pilot04.yml) è attivato da PR che modificano \`experiments/pilot04/**\` e da trigger manuale. Solo un server HTTP locale su \`127.0.0.1\`, fornito dal **pilota 03**, viene interrogato. File originali di server e inventario gold sono identici alla fixture MIT \`thunderbit-operations/scraper-benchmark\`, commit upstream \`f01471d6eafb345df0f009f1fb517622c43a1dd7\`.

## Test e baseline
- **Scrapy** \`2.19.0\`, spider \`scrapy_spider.py\`, paginazione del catalogo statico tramite \`response.follow\`, pagina JS come HTTP grezzo, JSON publisher come richiesta esplicita, errore HTTP 500.
- **Crawlee** \`3.17.0\`, \`CheerioCrawler\` con coda/link paginazione e \`HttpCrawler\` per \`application/json\`; la pagina 500 viene verificata con un semplice controllo \`fetch\` separato (non spacciarlo per acquisizione di errore da Crawlee).
- Nessun browser Chromium: queste baseline sono **HTTP-only**. Una pagina che renderizza dati soltanto via JS può risultare vuota, senza che ciò sia un bug.
- **Valutatore** \`evaluate.py\`: legge il gold MIT **solo dopo** l'esecuzione dei due framework; controlla esattamente 2 pagine statiche (12 ID), la pagina JS grezza (0), una API JSON (8 ID) e l'errore 500. Rileva pagine/ID mancanti, duplicati e status inattesi.

## Come riprodurre
Il workflow è la modalità preferita. Su computer con Python, Node, Scrapy, Crawlee installati:
1. Avviare \`node experiments/pilot03/serve.mjs\`, copiare URL locale.
2. \`scrapy runspider experiments/pilot04/scrapy_spider.py -a base=http://127.0.0.1:PORT -O /tmp/pilot04-scrapy.jsonl:jsonlines\`.
3. \`BASE_URL=http://127.0.0.1:PORT node experiments/pilot04/crawlee_runner.mjs /tmp/pilot04-crawlee.json\`.
4. \`python experiments/pilot04/evaluate.py --scrapy /tmp/pilot04-scrapy.jsonl --crawlee /tmp/pilot04-crawlee.json --output /tmp/pilot04-evaluation.json\`.

**Limitazioni:** non blind (codice scritto dopo aver visto la fixture), un solo sito simulato, API note a priori e non scoperte autonomamente, JavaScript/browser non testati, costi/throughput sul Web reale non misurati, conformance dei protocolli non valutata, policy f3tcher no-403-bypass rispettata. L'eventuale successo certifica soltanto che Scrapy/Crawlee eseguono questi casi riproducibili e che i risultati attesi tornano sul dataset esterno. Il confronto **non** stabilisce quale framework sia migliore.

**Provenienza del risultato:** usare URL della run GitHub Actions, commit/PR, versioni e artefatti associati, non percentuali autoattribuite da documentazioni altrui.
