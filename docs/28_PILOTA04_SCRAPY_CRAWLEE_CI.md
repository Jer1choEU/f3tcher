# 28 — Pilota 04: confronto reale Scrapy vs Crawlee in GitHub Actions

**Data:** 2026-11-02. **Stato:** **ESEGUITO** in GitHub Actions, su server HTTP locale, con i veri framework **Scrapy 2.19.0** e **Crawlee 3.17.0**. Si tratta di **uno smoke test comparativo circoscritto**, non di uno studio alla cieca, una prova su fonti reali, un'architettura approvata o un motore f3tcher sviluppato. Nessun browser eseguito e nessun sito terzo crawled.

**Run verificata più recente:** [GitHub Actions #41368927807](https://github.com/Jer1choEU/f3tcher/actions/runs/41368927807) — job **compare-frameworks**, **success** e [artefatto CI #13108123370](https://github.com/Jer1choEU/f3tcher/actions/runs/41368927807/artifacts/13108123370) creato (ZIP 2.483 byte, retention 1 giorno). La [run iniziale #41368813344](https://github.com/Jer1choEU/f3tcher/actions/runs/41368813344) era anch'essa passata, ma non aveva salvato l'artefatto; è stata corretta solo la destinazione del suo upload. PR: [#4](https://github.com/Jer1choEU/f3tcher/pull/4). Scrapy, Crawlee e valutatore sono stati effettivamente eseguiti. PR: [#4](https://github.com/Jer1choEU/f3tcher/pull/4). La configurazione Actions è [pilot04.yml](../.github/workflows/pilot04.yml), codice in [experiments/pilot04](../experiments/pilot04/README.md).

## 1. Sorgente e condizioni

Usata la **stessa fixture immutata MIT** del [pilota 03](27_PILOTA03_FIXTURE_ESTERNA_E_ROUTING_API.md), proveniente da [Thunderbit Scraper Benchmark](https://github.com/thunderbit-operations/scraper-benchmark) (commit upstream \`f01471d6eafb345df0f009f1fb517622c43a1dd7\`; server Git blob \`f33a3402bf8e1db6a612ae4c8f51c115430dab15\`, gold Git blob \`8b0d88367b45d84df86a110a3e282aa8647d3d92\`).

I dati sono pubblicati da un'organizzazione terza, ma **sia la fixture sia i suoi selector sono noti prima di creare gli spider**: non è un **blind holdout**. Il publisher è un vendor commerciale che dichiara differenze fra i propri tool-pack; noi abbiamo eseguito **solo la fixture unica custodita nel repo f3tcher**, non abbiamo ricopiato i risultati di strumenti terzi.

La run avvia **solo Node server su 127.0.0.1, porta temporanea**. I tool ricevono il suo base URL da variabile di ambiente. Il runner standard \`ubuntu-latest\` per la repo pubblica è gratuito secondo GitHub, con \`permissions: contents: read\`, \`timeout-minutes: 8\`, niente runner maggiorati, segreti, login, proxy o crawling Internet. Non è stata scelta un'infrastruttura per f3tcher; qui GitHub Actions serve soltanto a superare l'impossibilità di installare pacchetti nell'ambiente di chat.

## 2. Programmi davvero eseguiti e che cosa fanno

**Scrapy 2.19.0:** [scrapy_spider.py](../experiments/pilot04/scrapy_spider.py); segue \`a.next-page\` usando \`response.follow\`, esamina la pagina JS con **solo HTML HTTP**, scarica l'**endpoint JSON conosciuto e autorizzato della fixture** e produce un record di errore \`500\` (HTTPERROR_ALLOWED_CODES). Niente retry, robots obey abilitato e concorrenza per dominio = 1.

**Crawlee 3.17.0:** [crawlee_runner.mjs](../experiments/pilot04/crawlee_runner.mjs); \`CheerioCrawler\` per HTML/statico (paginazione tramite \`enqueueLinks\`) e pagina JS **non renderizzata**; \`HttpCrawler\` separato per JSON. Verifica il 500 con **Node fetch**, *non* con l'handler di errore di un crawler, dettaglio da non nascondere. Concorrenza = 1, retry = 0; nessuna Playwright/Puppeteer session, fingerprinting o aggiramento di difese.

**Valutatore indipendente dal processo di acquisizione:** [evaluate.py](../experiments/pilot04/evaluate.py) confronta i dati finali contro il gold della fixture MIT. Il gold **non è importato dagli spider**. Fallisce esplicitamente se mancano pagine, si duplicano ID, sono introdotti ID falsi o lo status non è atteso.

## 3. Risultati effettivamente osservati nelle run #41368813344 e #41368927807

| Criterio | Scrapy 2.19.0 | Crawlee 3.17.0 |
|---|---:|---:|
| Pagine statiche processate | 2 | 2 |
| Prodotti HTML statici | **12/12** | **12/12** |
| Prodotti dinamici nella risposta HTML senza rendering JS | **0/8** | **0/8** |
| Prodotti letti dall'API JSON conosciuta | **8/8** | **8/8** |
| Rilevazione di HTTP 500 | sì, callback dello spider | sì, \`fetch\` Node separato |
| Pagine/osservazioni emesse | **5** | **5** |
| Valutazione automatica sul gold | **PASS** | **PASS** |

**Non esiste un vincitore su questo campione.** La parità di copertura riguarda solo queste prove, non prova identità delle capacità dei framework. \`0/8\` sulla pagina JS è *atteso*: nessuno dei due metodi HTTP esegue il JavaScript, e gli otto ID sono recuperabili dall'API esplicita. Il recupero dell'API NON è scelta autonoma del canale, perché il percorso era già noto agli script.

La **prima run valida** è passata ma **non ha caricato gli artefatti** per un errore nel pattern del percorso (\`/tmp\` anziché \`runner.temp\`). La correzione è stata verificata con la **seconda run #41368927807: success + artefatto ZIP f3tcher-pilot04-local effettivamente pubblicato**. Gli artefatti temporanei hanno retention di un giorno; i risultati e i link a entrambe le run sono conservati in questo documento.

## 4. Condizioni di validità e sicurezza

- **Solo sorgente sintetica esterna, conosciuta; non blind/representative.**
- **Nessuna prova di completezza delle fonti**: il gold del simulatore è noto, non esiste un inventario globale dei portali pubblici.
- **Nessun benchmark dei costi/throughput**: le installazioni, code, runtime e meccaniche di errore sono differenti; non fare classifiche dai tempi del job CI.
- **Nessuna comparazione browser**: niente Playwright in questo pilota, e i blocchi del precedente ambiente restano rispettati.
- **Nessuna scelta di architettura, stack o attivazione del motore**. Sono strumenti candidati per prove future.
- **No bypass**: i 403, login, paywall, anti-bot e vincoli di publisher restano stop; non si usano proxy/rotazioni. La fixture rende disponibili tutte le risorse del test e nessun sito esterno è stato interrogato dagli spider.
- **Riproducibilità parziale**: le versioni principali sono fissate (Scrapy 2.19.0, Crawlee 3.17.0), le dipendenze transitive sono state risolte al momento della run e stampate nei log/file di versioni. La catena software andrà congelata con lockfile per benchmark confermatori.

## 5. Risposta alla domanda e prossima sperimentazione utile

**Risposta osservata:** sia Scrapy sia Crawlee sono in grado di seguire paginazione e recuperare un endpoint JSON pubblicato dalla fixture senza browser. Nessuno vede contenuto creato solo a runtime JS nella pagina HTML ricevuta. La prova rende riproducibili queste capacità di base, ma **non verifica** la decisione automatica «quando usare API, HTTP o browser» né il vantaggio di f3tcher.

**Prossima prova ad alto valore:** nuovo insieme di fixture **non ispezionate prima di congelare il parser**, con fonti dove HTTP basta, dove serve browser, dove un'API è disponibile, dove un'API è fuorviante o manca; confrontare una baseline deterministica HTTP-first, una baseline Crawlee adaptive realmente eseguita e l'approccio multicanale in futuro sperimentale, con metriche su *record/asset recall, false complete, tempo browser, costi e permessi*. Non dichiarare chiusa la validazione scientifica dopo un smoke test.

**Stato:** piloti 01–04 esplorativi, primi confronti effettivi con framework completi ottenuti via Actions. f3tcher software non sviluppato; nessun risultato commerciale, novità o superiorità dimostrata.
