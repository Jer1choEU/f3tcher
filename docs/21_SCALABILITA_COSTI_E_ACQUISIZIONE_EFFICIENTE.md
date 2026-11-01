# 21 — Scalabilità e costo dell'acquisizione: limiti di sorgente, carico del crawler e informazioni verificate

**Data ricognizione:** 2026-11-02. **Stato:** SOLO ricerca documentale e disegno ipotetico di confronti. Nessun crawler f3tcher, test, benchmark, codice, stack, cloud, prezzi effettivamente pagati o architettura approvati. Continua [20](20_SORGENTI_DIFFICILI_MODULI_STATI_E_OMISSIONI.md) dopo la [sintesi 18](18_SINTESI_COMPARATIVA_E_LACUNE.md).

**Legenda:** **V-spec** = standard/RFC verificato; **V-doc** = documentazione ufficiale di framework/servizio verificata; **V-paper** = pagina editoriale/abstract scientifico verificato; **T** = numero o prestazione dichiarato da vendor, non replicato; **H** = ipotesi scientifica di confronto NON testata; **U** = proprietà sconosciuta da verificare. Specifiche, implementazioni e quote evolvono. Le misure future dovranno essere su testbed proprio/autorizzato, con accessi leciti, privacy e diritti come in [04](04_LEGALITA_E_SICUREZZA.md).

## 1. Risultato principale: il numero di richieste/secondo è una metrica insufficiente

Il problema della scala ha **almeno tre colli di bottiglia indipendenti**:

1. **Sorgente e permessi**: limiti/quote autorizzati, ritardi per host/IP/account/token, robots/ToS, capacità del provider, 429/503.
2. **Infrastruttura che acquisisce**: CPU, RAM, browser concurrency, storage, bandwidth, traffico in uscita, parser/OCR/LLM, prezzi e limiti del fornitore.
3. **Valore informativo**: duplicati, pagine non mutate, asset non scoperti, record omessi, versioni e aggiornamenti mancanti, estrazione non valida, dati non riusabili.

Una formulazione **qualitativa** di ricerca, non un modello ottimizzato approvato: `throughput utile ≤ min(capacità lecita della fonte, capacità dell'infrastruttura, opportunità di lavoro effettivamente utile)`. Anche moltiplicando i worker, non si supera in modo corretto il limite per origine; anzi si possono aumentare collisioni, duplicati e carico. L'obiettivo da confrontare è la resa in **asset distinti, leciti, validati e utilizzabili** per unità di costo, insieme alla *coverage* e *freshness* dichiarate per un perimetro.

**Attenzione:** «più richieste per valuta», «più byte», «più URL» e «più dati verificati» sono metriche differenti, non surrogati l'una dell'altra.

## 2. Scheduling politeness: capacità già esistente, non novità (V-doc)

### V1 — Scrapy AutoThrottle
- Pagina officiale: https://docs.scrapy.org/en/master/topics/autothrottle.html (revisione del ramo master osservata al 2026-11-02).
- L'estensione regola il ritardo dei *download slots* sulla base della latenza e del `AUTOTHROTTLE_TARGET_CONCURRENCY` e **rispetta** `DOWNLOAD_DELAY` e `CONCURRENT_REQUESTS_PER_DOMAIN`.
- Una risposta **non 200** più veloce non può ridurre il ritardo calcolato: evita un falso miglioramento di velocità proprio mentre un server è in errore.
- **Limite:** stimare carico dalla latenza non misura la reale capacità del publisher; la configurazione è fondamentale e non garantisce conformità normativa/contrattuale o completezza.

### V2 — Apache StormCrawler: code per host, dominio o IP
- Documentazione ufficiale: https://stormcrawler.apache.org/docs/latest/index.html
- `fetcher.queue.mode` può essere `byHost` (default), `byDomain`, `byIP`; il fetcher usa ritardi per coda, thread e controlli di politeness. Sito documenta `fetcher.server.delay` default 1 s e `fetcher.threads.number` default 10.
- La configurazione comprende `fetcher.max.crawl.delay` e un comportamento specifico se la sorgente chiede ritardi maggiori; l'utilizzo di una configurazione che limita artificialmente un ritardo **non significa permesso** di ignorare il valore più prudente richiesto dal publisher.
- **H1:** su sorgenti sintetiche con più sottodomini che puntano allo stesso servizio, comparare `byHost/byDomain/byIP` per sovraccarico, throughput lecito e starvation di fonti rare. Un raggruppamento IP può accorpare soggetti indipendenti dietro un CDN: **non** è sempre più corretto.
- Metriche pubblicate dal framework: `fetched/sec`, `queue_wait_time`, `download_time`, `activethreads`. **Mancano**, se misurate da sole, distinct verified asset recall e errori di completezza.

### V3 — RFC 9309, Robots Exclusion Protocol
- https://www.rfc-editor.org/rfc/rfc9309.html
- Formalizza Allow/Disallow e regole di matching; **robots.txt non è una forma di autorizzazione**. Se robots è *unreachable* a causa di errori server/network (es. 5xx) il crawler MUST assumere complete disallow, salvo regole di fallback normativo descritte nella RFC; cache di norma non oltre 24h salvo eccezioni.
- RFC 9309 consente interpretare altri record come `Sitemap`, ma `Crawl-delay` è una **estensione non parte del core ABNF standardizzato**. Non attribuire la semantica dettagliata di StormCrawler a una garanzia IETF.
- **Policy più prudente scelta dall'utente**: HTTP 403 sul percorso = stop, anche quando l'interpretazione tecnica di `/robots.txt` assente sarebbe permissiva; lecito e tecnicamente disponibile sono condizioni diverse.
- **H2:** distinguere stop da policy, quota temporanea, rete irraggiungibile e contenuto non più disponibile, senza tentare bypass o probing.

### V4 — RFC 6585 (429) e RFC 9110 (Retry-After/503)
- https://www.rfc-editor.org/rfc/rfc6585.html ; https://www.rfc-editor.org/rfc/rfc9110.html
- `429 Too Many Requests` può contenere un `Retry-After`; `503` può segnalare sovraccarico e periodo di sospensione. `Retry-After` è HTTP-date o ritardo in secondi. `429` **non è obbligatorio** per tutti i limiti; il server può chiudere la connessione o ridurre il servizio.
- **H3:** usare in futuro soltanto mock con quota severa, `Retry-After` e pause su errore: testare che backoff non si trasformi in retry storm, e che la mancanza di 429 non venga interpretata come licenza di frequenze aggressive.

## 3. Ottimizzazioni sul traffico: condizionali e intervalli, non garanzie di completezza

### V5 — RFC 9111 / HTTP conditional GET
- Standard https://www.rfc-editor.org/rfc/rfc9111.html ; guida https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Conditional_requests
- `ETag/If-None-Match`, `Last-Modified/If-Modified-Since`, `304 Not Modified` possono evitare trasferimenti inutili. `Vary` determina quando varianti in cache siano riutilizzabili. `Cache-Control`, autenticazione, `private` e altre direttive devono essere rispettate. La scelta di usare cache condivise fra progetti **richiede isolamento dei diritti**, non solo uguaglianza dell'URL.
- `304` conferma la rappresentazione condizionata **alla richiesta**, non l'intero stato degli asset linkati, pagine figlie, paginazioni o dataset. Valori ETag deboli o rigenerati continuamente possono diminuire il beneficio; `Last-Modified` non garantisce eventi intermedi in una finestra.
- **H4:** comparare full GET vs conditional GET con documento immutato, documento mutato, `Vary` personalizzato, ETag erroneo, pagina HTML invariata ma dati API dinamici: misurare bytes evitati, stato veritiero e omissioni. **Se il 304 è relativo a HTML, non dedurre che gli asset JSON dinamici siano immutati.**

### V6 — HTTP Range / If-Range, trasferimenti parziali
- RFC 9110 https://www.rfc-editor.org/rfc/rfc9110.html (sezioni 13–15)
- `Range` e `If-Range` permettono, se la fonte supporta le byte range, di recuperare porzioni o riprendere download; risposta `206 Partial Content`, `Content-Range` e validatori forti devono essere controllati. I server possono ignorare `Range`.
- **H5:** testare il valore di resume su archivi grandi con interruzioni e cambi di versione; non concatenare parti di versioni diverse né scambiare 206 per download completo. Anche un trasferimento meno costoso non aggiunge automaticamente dati nuovi.

### V7 — Recrawl e freschezza: un problema studiato almeno dal 2003
- Cho & García-Molina, *Effective Page Refresh Policies for Web Crawlers*, ACM TODS 2003: https://doi.org/10.1145/958942.958945
- Modelli per freshness/age e scelta frequenza di ricrawl; gli autori dimostrano sotto **specifiche assunzioni** che sincronizzare in proporzione ingenua alla frequenza di modifica non è sempre ottimale.
- **H6:** non riutilizzare come regola universale un modello Poisson di modifiche; introdurre nei test **burst, stagionalità, deletion, late publication, timestamp falsi**, e perfino sorgenti per le quali una storia precedente non è recuperabile.
- StormCrawler documenta anche `AdaptiveScheduler`, che regola intervalli dopo confronto firme MD5 della pagina (https://stormcrawler.apache.org/docs/latest/index.html); **questa idea è già implementata**, non una novità f3tcher. MD5 signature sul payload non osserva necessariamente revisioni di record paginati/JS.

### V8 — Google, crawl capacity vs demand
- Guida ufficiale 2026 https://developers.google.com/crawling/docs/crawl-budget
- Distingue **crawl capacity limit** e **crawl demand**, con inventario percepito, popolarità e staleness; l'esempio Google non è la definizione universale della strategia f3tcher, ma mostra che massima capacità non equivale a massima utilità.
- **H7:** future priorità da confrontare per *unique resource information / cost*, non popolarità: capire se fairness per host piccolo protegge la long tail (docs 08, 18) senza abbassare troppo il rendimento di risorse principali.

## 4. I limiti dell'infrastruttura browser sono indipendenti dai limiti dei siti

### V9 — Crawlee AutoscaledPool
- https://crawlee.dev/js/api/3.16/core/class/AutoscaledPool ; Snapshotter https://crawlee.dev/js/api/core/class/Snapshotter
- Adatta il numero di task concorrenti al carico **CPU, memoria e event loop**. In Crawlee v4 la strategia di concurrency è oggetto di modifica di API: https://crawlee.dev/js/docs/next/upgrading/upgrading-to-v4/autoscaling (documentazione di preview, non stable contract).
- **Limite:** l'autoscaling lato client non garantisce il rispetto della quota API/server, né trasforma una pagina dinamica incompleta in una acquisizione corretta. Autothrottle di sorgente e autoscaling della macchina sono **meccanismi differenti e potenzialmente complementari**.

### V10 — Cloudflare Browser Run, modifica 2026 e quote (documentazione vendor)
- Cloudflare ha rinominato **Browser Rendering → Browser Run** il **15 aprile 2026**, e ha annunciato aumenti di concorrenza (all'epoca 30→120 browser account Workers Paid): https://developers.cloudflare.com/changelog/post/2026-04-15-br-rename/
- **Documento limiti aggiornato il 14 ottobre 2026:** https://developers.cloudflare.com/browser-run/limits/ — per **Workers Paid, default**: **200 browser concorrenti per account**, **3 nuove istanze/s**, browser timeout **60 s**, **30 quick actions/s**. Workers Free: **3 concorrenti**, 1 nuova istanza ogni 20 s, **10 minuti browser al giorno**, timeout **60 s**, quick action 1 ogni 10 s; `/crawl` su Free 5 job/die, 100 pagine/job. I limiti sono specifici della data, piano e tipi di operazione, non del sito sorgente.
- **Pricing/telemetria:** https://developers.cloudflare.com/browser-run/pricing/ documenta consumo in browser hours e l'header `X-Browser-Ms-Used` per quick actions. Non abbiamo calcolato prezzi/bollette reali, né scelto Cloudflare.
- **Caveat:** il changelog di aprile e la tabella di ottobre differiscono perché il servizio **è cambiato**: non usare i numeri del vecchio annuncio come valori «attuali». Un numero di browser simultanei consentiti dal provider non autorizza altrettante connessioni verso un host; costi e limiti possono cambiare.
- **H8:** confrontare HTTP browserless, rendering solo su necessità, browser session reuse e browser-first su sorgenti di prova con asset gold, ma misurare *verified unique assets per browser second*, costo/GB, failure e freshness; nessun benchmark reale in questa ricognizione.

## 5. Archivio prima di nuova richiesta: evitare doppio lavoro, non confondere vecchio e fresco

- Da [18](18_SINTESI_COMPARATIVA_E_LACUNE.md) e [10](10_INVENTARI_E_GARANZIE.md): **Common Crawl** WARC/WAT/WET + URL Index/ CDXJ può permettere di trovare snapshot già pubblicati; **Wikimedia dumps** manifest/status/integrità, **Crossref/OpenAlex** bulk/snapshot e changefiles con condizioni differenti.
- **H9:** confrontare *archive-first* / *publisher bulk* / *live API* / *HTML/browser* su un testbed controllato con veri timestamp: misurare risorse uniche, versioni mancanti, consumo di rete e costi. L'archivio può avere lacune/freschezza scaduta/diritti differenti, e recuperare una cattura esistente non prova che la sorgente corrente sia invariata.
- **H10:** distinguere risparmio per copia offline (che non aumenta richieste alla fonte) da ricontrollo che richiede rete o nuovo diritto di accesso; il riuso dei dati fra progetti deve rispettare licenze/retention e isolamento dei permessi.

## 6. Matrice dei colli di bottiglia e falsi ottimi

| Risorsa o segnale ottimizzato | Beneficio possibile | Falso miglioramento da evitare |
|---|---|---|
| Request/second del crawler | Maggior throughput client | Coda host satura, 429, ban, domande non lecite |
| Concorrenza/browser per account | Più rendering parallelo | Quota sorgente invariata, spesa e RAM in aumento |
| Download bytes risparmiati | ETag/304, Range, cache, snapshot | Record JS/API cambiati senza cambiare il validator della landing |
| Meno job/richieste API | Bulk/catalog-first | Payload incompleto, API non espone tutto, metadata senza file |
| Più `fetched`/sec | Parallel scheduler | Duplicati e contenuto non estratto/diritti negati |
| Refresh più frequente | Versioni più fresche | Rate policy violata e pochi nuovi fatti per query |
| Refresh più raro | Risparmio CPU/rete | Storici non recuperabili e eventi scaduti |
| LLM o browser riusato | Setup ridotto per siti simili | Selector drift silenzioso, campi persi |
| Cache condivisa cross-project | Riuso byte senza retargeting sito | Contaminazione privacy e diritti differenti |
| Archivio storico già esistente | Possibile meno fetch live | Snapshot vecchio/partial, condizioni di riuso diverse |

**Non** esiste un ordine globale dimostrato fra queste righe. Un singolo score costo/throughput farebbe perdere la distinzione fra *acquisizione*, *validazione*, *completezza* e *conformità*.

## 7. Dieci confronti futuri discriminanti, NON eseguiti

1. **H1 — queue grouping:** stessi 30 host sintetici, con 6 host condivisi via IP/CDN; policy `byHost/byDomain/byIP`, controllo overload, starvation e verified asset recall.
2. **H2 — legal/policy constraint:** mock robots aggiornato, disallow, 403, quote per IP e token e richiesta contemporanea da 2 progetti; *zero violazioni*, nessuna espansione con IP diversi.
3. **H3 — overload:** 429/503 `Retry-After`, errori rapidissimi e timeouts; AutoThrottle vs fixed delay/backoff, metrica tempo al recupero e no retry storms.
4. **H4 — HTTP conditional:** ETag, Vary, Last-Modified, contenuto HTML immutato ma API secondaria mutata; misurare veri cambi persi, byte risparmiati e falsi `complete`.
5. **H5 — download resume:** risposta 206, server che ignora Range, archivio cambia fra richieste; prevenire unioni byte di versioni incompatibili.
6. **H6 — freshness:** fonte bursty vs statica, tombstones e late events, full scan vs adaptive recrawl vs feed; valutare age, freshness, missed revisions e recovery.
7. **H7 — long-tail fairness:** 3 host grandi e 100 piccoli con record rari, stessa quota globale e costi; throughput vs recall degli host rari.
8. **H8 — HTTP/browser switching:** SSR/SPA/browser-required e documenti pesanti; benchmark totale wall time, peak RAM/CPU, browser-seconds, verified asset yield e omissioni.
9. **H9 — archive-first:** fonte con snapshot pre-esistente, dato fresco diverso e archivio incompleto; costo/latenza/asset e storico e condizioni di riuso.
10. **H10 — progetto multiplo:** due utenti/contesti con dataset pubblico condivisibile e uno privato o con licenza diversa; evitare che dedup/cache di bytes mischi accessi, retention o diritti.

Per ogni test: inventario gold noto, stesso budget e time window, corrispondenza diritti, concorrenti raggruppati in modo dichiarato, simulazione locale dei limiti (non stress su server veri), report di errori, intervalli di confidenza dove appropriati, metriche per categoria. **Nessun test f3tcher eseguito in questa sessione**.

## 8. Nuova idea di ricerca: ottimizzazione degli *sprechi dimostrabili*

**H11 — Evidence-preserving acquisition efficiency:** invece di minimizzare indiscriminatamente le richieste, valutare riduzioni di costo che non peggiorino **verifiable asset recall, freshness, record completeness, tail coverage, legal policy compliance** su perimetri controllati. Conservare esplicite le dimensioni:
- *savings*: bytes non ripresi, richieste evitate, CPU/browser seconds e costo;
- *regret*: asset/versioni non osservate, tempo di rilevazione, perdita di dati rari e falsi `success`;
- *safety*: rate/ToS/robots/403, retention e privacy, provenienza e permessi;
- *uncertainty*: sorgenti prive di inventario e metriche non stimabili.

Questa formulazione è **una domanda scientifica**, non un algoritmo inventato o una funzione di reward approvata. Le tecniche di cache, rate control, adaptive revisits e autoscaling **esistono già**; un vantaggio distintivo andrà dimostrato sperimentalmente nelle loro interazioni e nei falsi successi che evitano.

## 9. Nuove priorità di ricerca, non una roadmap tecnica

1. Definire una **matrice di costo comparabile**, senza inventare prezzi globali: CPU seconds, peak RAM, bytes egress/ingress, browser-second, richieste fatturabili, storage e fetcher concurrency.
2. Verificare quanto siano sensibili a *version drift* le API/licenze dei provider: Cloudflare Browser Run 2026 è un caso di cambio reale in mesi.
3. Stabilire quale quota del miglioramento di una strategia derivi da **già noti** HTTP validators/bulk/incremental, prima di chiamare «intelligente» un nuovo planner.
4. Confrontare politiche che proteggano **fonti rare** vs massima media; report per sorgenti piccole e contenuti unici.
5. Preparare in modo puramente concettuale un **protocollo di benchmark** su contenuti e servizi controllati, poi decidere con l'utente se terminare la ricognizione e autorizzare prove; oggi **non** si cambia fase.
6. Continuare a cercare informazioni in aree ignorate solo quando aggiungono **alternative discriminanti**, evitando di fare rassegne senza criterio.

**Chiusura della ricognizione 21:** documentati colli di bottiglia, standard e comportamenti esistenti; dieci confronti futuri e ipotesi H11. Nessun software f3tcher, stack, benchmark, fonte sottoposta a stress, spesa cloud, gestione API keys o architettura scelta.
