# 27 — Pilota 03: benchmark locale su fixture di un soggetto terzo (2026-11-02)

**Stato: ESEGUITO**, test locale dimostrativo con dati pubblicati da terzi, **NON benchmark scientifico alla cieca, NON un confronto tra crawler completi e NON f3tcher implementato**. Tutte le prove sono state effettuate su server **127.0.0.1**. Nessuna attività di crawling su siti esterni, nessun cloud, costo, credenziale, bypass di 403/robots/CAPTCHA o richiesta verso un sistema pubblico.

Questo lavoro segue [24](24_PROTOCOLLO_VALIDAZIONE_SCIENTIFICA.md), [25](25_PILOTA_SINTETICO_RISULTATI.md) e [26](26_PILOTA02_BASELINE_METRICHE_FALSE_COMPLETE.md). A differenza dei precedenti due piloti, **i contenuti e il gold del server di prova sono stati progettati da un autore esterno al progetto**, pur essendo stati letti prima di scrivere i nostri client.

## 1. Fonte esterna, versione congelata, licenza e limiti

- Repository del publisher: https://github.com/thunderbit-operations/scraper-benchmark ; metodologia: https://github.com/thunderbit-operations/scraper-benchmark/blob/main/METHODOLOGY.md .
- **Origine fissata:** commit \`f01471d6eafb345df0f009f1fb517622c43a1dd7\`, 14 agosto 2026.
- Server Node originale: \`tools/crawlee/fixture-server.mjs\`, **Git blob SHA-1** \`f33a3402bf8e1db6a612ae4c8f51c115430dab15\`.
- Gold originale: \`tools/crawlee/results/local_fixture_ground_truth.json\`, **Git blob SHA-1** \`8b0d88367b45d84df86a110a3e282aa8647d3d92\`.
- Licenza del materiale upstream: **MIT, Copyright (c) 2026 Thunderbit**; la copia della licenza è in [vendor_thunderbit/LICENSE](../experiments/pilot03/vendor_thunderbit/LICENSE). Gli originali sono stati copiati **byte per byte**, e confrontati sia tramite i Git blob sia da test automatici.
- Si tratta di un progetto pubblicato da un **fornitore commerciale che opera anche nel settore scraping**; non è un comitato di valutazione accademico indipendente. La sua metodologia ammette esplicitamente che fixture diverse per ogni strumento hanno struttura comune ma contenuto lievemente diverso: non utilizzare indiscriminatamente punteggi di testo estratto tra tool.

**Artefatti riproducibili nella nostra repo:** [experiments/pilot03](../experiments/pilot03/README.md), in particolare [benchmark.py](../experiments/pilot03/benchmark.py), [test_benchmark.py](../experiments/pilot03/test_benchmark.py), [results.json](../experiments/pilot03/results.json), [serve.mjs](../experiments/pilot03/serve.mjs) e i file originali MIT in [vendor_thunderbit](../experiments/pilot03/vendor_thunderbit/).

## 2. Cosa è stato effettivamente eseguito

Ambiente del test: Python **3.13.5**, Node **22.16.0**, Requests **2.32.5**, Beautiful Soup **4.14.3**, server HTTP Node su loopback a porta temporanea, niente accesso Internet durante l'esecuzione.

**Tre baseline eseguite:**
1. \`urllib_html\`: solo HTML, con \`urllib\` e \`HTMLParser\` della libreria standard.
2. \`requests_bs4_html\`: solo HTML, con \`requests\` e \`BeautifulSoup\`.
3. \`requests_bs4_literal_api\`: stesso client HTML, con **riconoscimento di un unico \`fetch('/api/dynamic-products')\` letterale presente nel codice della pagina**, poi richiesta GET alla sola API locale, se trovata. **Non** è una scoperta di API generica o un interprete JS; l'espediente è intenzionalmente circoscritto alla fixture.

**Quattro verifiche funzionali per metodo:** catalogo HTML paginato di 12 prodotti, catalogo client-rendered di 8 prodotti, estrazione di 3 paragrafi centrali in una pagina con boilerplate, riconoscimento della risposta HTTP **500** prevista dal testbed. Misuriamo richieste e byte, non throughput produttivo.

### Risultati della singola esecuzione verificata

| Metodo | Catalogo statico | Catalogo dinamico **visibile via HTTP** | Via recupero API esplicita | Paragrafi articolo | HTTP 500 segnalato | GET locali | Byte risposta |
|---|---:|---:|---:|---:|---|---:|---:|
| urllib / HTMLParser | **12/12** | **0/8** | non usata | **3/3** | sì | **5** | **7.724** |
| Requests + Beautiful Soup | **12/12** | **0/8** | non usata | **3/3** | sì | **5** | **7.724** |
| Requests + Beautiful Soup + API da JS | **12/12** | **0/8** | **8/8** | **3/3** | sì | **6** | **8.440** |

Costo marginale osservato: **+1 GET e +716 byte** per otto record dinamici nello scenario specifico, rispetto alla versione con sola lettura dell'HTML. La maggiore copertura era **attesa** in quanto questa fixture espone proprio un endpoint JSON con i record dinamici.

**4 test automatici superati**:
- il Git blob del file sorgente Node e del gold coincidono con gli originali upstream;
- la richiesta al client impedisce host esterni, path traversal e accesso a \`/ground-truth.json\`/percorso disallowed;
- il 500 è osservato come errore, non aggirato né trasformato in successo;
- risultati static/dynamic/article riconosciuti con 12/12, 0/8, 8/8, 3/3 e **nessuna lettura del gold da parte dei client**.

I risultati grezzi registrano **per ogni metodo URL locale richiesto, HTTP status e byte della risposta**. Il valutatore, non gli acquisitori, legge il gold. Il JSON archiviato è una rappresentazione ordinata dei risultati osservati e può essere rigenerato con \`python benchmark.py > results_regenerated.json\`.

## 3. Limiti sperimentali ed epistemici — obbligatori

1. **Non è un blind holdout:** abbiamo letto le pagine e gli schemi prima di scrivere gli acquisitori; l'autore della fixture è indipendente dal progetto, **non** lo è la selezione del test rispetto allo sviluppo dei client. La neutralità del publisher non è attestata.
2. **Non abbiamo confrontato Scrapy né Crawlee.** Scrapy non è presente in questa installazione, così come Crawlee Node; non si è potuto scaricarli dal registro dei pacchetti (DNS/richieste esterne bloccate). I risultati riportati dagli autori di Thunderbit sui loro crawler sono **solo loro**, non una nostra misura, e non vanno mescolati ai numeri di questa prova.
3. **Browser non misurato:** Python Playwright è presente ma il suo browser predefinito non è installato; tentando Chromium già installato nel sistema, la navigazione locale restituisce \`net::ERR_BLOCKED_BY_ADMINISTRATOR\`. Non è stata cercata né applicata alcuna elusione della policy. Non attribuire una recall di 0% a Chrome/Playwright.
4. **L'algoritmo API è limitato a una \`fetch()\` letterale:** non interpreta JavaScript generale, non distingue endpoint privati da autorizzati in siti reali (qui opera solo su fixture MIT locale), non gestisce GraphQL, OData, paginazioni API, token, sessioni o change streams.
5. I 12 prodotti e gli 8 dinamici **non** sono campioni indipendenti di famiglie di siti, e le prove hanno un solo schema. Non si possono trarre conclusioni statistiche di affidabilità o prestazione su Web reale.
6. Le misure di byte e richieste derivano dalla struttura di un **solo server locale**; non rappresentano costi generali, latenza su Internet o ricadute cloud.
7. Un publisher potrebbe omettere record anche dall'API, dichiarare un totale inesatto e non permettere verifiche esterne: il risultato 8/8 è **possibile perché il gold di questo test è noto**, non dimostra capacità di scoprire omissioni nascoste nel mondo reale.

## 4. Quale ipotesi abbiamo chiarito?

La ricerca 23–24 propone di misurare separatamente **capacità di raggiungere il dato**, **reale completezza**, **costo marginale**, **validazione**, **sorgenti e permessi**. Questo pilota dimostra circoscrittamente:

- Una **fonte esterna congelata** è importabile e utilizzabile con provenienza, licenza e integrità verificabili.
- Un parser HTTP che non esegue JS può ottenere 12/12 sugli asset statici ma **0/8 su elementi aggiunti dal browser**; questo è **comportamento atteso**, non un bug di urllib/BeautifulSoup.
- Una API JSON già esposta dal JavaScript della stessa fixture consente acquisizione degli otto record con **una richiesta HTTP aggiuntiva**.
- La rilevazione di errori e la protezione dei limiti di accesso possono essere comprese in test di regressione.
- Nulla di ciò costituisce ancora un sistema autonomo o una dimostrazione di miglioramento rispetto ai crawler completi, né di universalità.

**Prossimo passaggio con maggiore valore informativo:** usare un ambiente di prova dove **Scrapy e Crawlee siano installabili legittimamente**, distinguere policy di scelta automatica effettivamente esistenti da script ad hoc, e ottenere campioni **held-out** con formati e siti diversi; in alternativa rafforzare prima la validazione **indipendente dalle dichiarazioni del publisher** senza creare codice definitivo. Nessuno dei due implica attivare siti esterni o scegliere un'architettura.

**Stato dopo 27:** tre piloti locali realmente eseguiti, ultimo basato su fixture terze MIT; ancora nessun motore f3tcher, nessuna scelta di stack e nessun benchmark confermatorio completo.
