# 04 — Legalità, sicurezza, accessi e licenze

**Stato:** principi di cautela e filoni di verifica, **non parere legale**. L'utente richiede il massimo delle tecniche lecite; “non è uscito 403” **non** autorizza automaticamente scraping, redistribuzione o conservazione.

## Principio operativo

> Ottenere quante più informazioni possibili **attraverso canali tecnicamente e giuridicamente consentiti**. Non aggirare autenticazione, blocchi di accesso, barriere tecniche, paywall o sistemi di protezione. Se un percorso non è accessibile, valutare API pubbliche, open data, licenze o autorizzazioni alternative e archivi utilizzabili legalmente.

**Distinguere quattro aspetti**: (1) risposta tecnica del server, (2) autorizzazione a ottenere i dati, (3) diritto a copiarli/analizzarli/conservarli, (4) diritto a fornirli ai progetti utilizzatori. Non sono equivalenti.

## Risposte HTTP e comportamenti da valutare

| Segnale | Comportamento di sicurezza orientativo |
|---|---|
| 2xx | Non equivale a licenza; estrarre soltanto nell'ambito ammesso |
| 304 | Usare copia validata già disponibile; non affermare nuova acquisizione |
| 401 | Nessun bypass. Credenziali soltanto se legittimamente autorizzate |
| 403 | **Fermare quel percorso e registrare il divieto**; niente bypass con camouflage, proxy/identità aggiranti, token altrui, o endpoints di controllo |
| 404/410 | Registrare indisponibilità, stato storico e possibili alternative lecite |
| 429 | Rispettare Retry-After/rallentare, non rotazione elusiva per aggirare i limiti |
| 5xx/timeouts | Retry limitati, backoff e circuit breaker |
| CAPTCHA / login / paywall / divieto esplicito | Non superare senza autorizzazione, contratto o intervento appropriato |

N.B. Non tutte le barriere sono espresse come 403: es. login wall HTTP 200, rate limit, restrizioni contrattuali, esclusioni da robots, riserve copyright, dati personali.

## Normativa e standard da riesaminare prima della produzione

1. **UE Direttiva (UE) 2019/790 art. 4**: eccezione TDM per opere legittimamente accessibili, salvo riserva espressa in modo appropriato, anche leggibile da macchina per contenuti online. Testo: https://www.legislation.gov.uk/eudr/2019/790/article/4
2. **Italia legge 633/1941, art. 70-quater**, introdotto dal D.Lgs. 177/2021: TDM su contenuti cui si ha legittimamente accesso ove l'utilizzo non sia espressamente riservato; copie del comma 1 conservate **solo per il tempo necessario** ai fini TDM; requisiti di sicurezza. Fonte: https://www.normattiva.it/atto/caricaDettaglioAtto?atto.codiceRedazionale=21G00192&atto.dataPubblicazioneGazzetta=2021-11-27
3. **RFC 9309 robots.txt:** https://www.rfc-editor.org/rfc/rfc9309.html; lo standard dice che un crawler conforme **deve** rispettare le regole parseable quando scarica con successo un robots valido. robots.txt non è sistema di autenticazione e da solo non decide il titolo giuridico; **non è una ragione per ignorarlo**.
4. **GDPR**, regolamento (UE) 2016/679: dati personali anche pubblicamente accessibili possono richiedere base giuridica, minimizzazione, limiti di conservazione e gestione degli interessati. Fonte: https://eur-lex.europa.eu/eli/reg/2016/679/oj
5. Protezione delle banche dati, licenze open data/API, termini contrattuali e diritto d'autore: possono applicarsi separatamente a copia, archiviazione e redistribuzione.
6. Per licenze software e modelli AI: MIT/BSD/Apache differiscono da GPL/AGPL; AGPL può imporre obblighi di sorgente nel caso di versioni modificate rese disponibili attraverso rete. Verificare il repository/versione concreta e tutte le dipendenze.
7. Norme e condizioni **dipendono da giurisdizione, fonte, finalità e soggetto utilizzatore**: necessaria verifica legale specifica per deployment/uso reale; non trattare questa nota come semaforo automatico.

## Idee per un motore automatico di conformità (ricerca, non implementato)

- Registrare per fonte e, ove necessario, per risorsa: provenance, permission basis, robots policy, termini d'uso, licenza, riserva TDM, credenziali consentite, area geografica, finalità, retention e ambito di redistribuzione.
- Policy decidibile e auditabile: **allow / deny / review** con motivazione e timestamp. Default conservativo su ambiguità giuridiche; permettere riesame, non aggiramento.
- Credenziali per tenant/progetto, mai condivise senza autorizzazione; protocolli autenticati solo dietro mandato valido.
- Separare metadata discovery (es. titolo e URL) da copia/archiviazione del contenuto integrale; licenze distinte possono richiedere trattamenti diversi.
- Retention per fonte e classe di dato; cancellazione e invalidazione delle cache su richiesta legittima o scadenza.
- Privacy by design, minimizzazione, audit log protetti, controlli accesso per output e per progetti destinatari.

## Sicurezza di rete, esecuzione e AI

- **SSRF e DNS rebinding**: proteggere ambienti interni e indirizzi link-local/loopback/privati/cloud metadata, revalidare DNS, bloccare redirect verso destinazioni proibite.
- Browser e parser in esecutori isolati (container/sandbox), minimi privilegi, limiti CPU/RAM/processi e di uscita rete; niente shell diretta da una pagina o da un modello.
- Contenuti scaricati, HTML, PDF, YAML, markdown e risposte delle API sono **input non fidati**: non eseguirne istruzioni/prompts; attacchi di prompt injection.
- Segreti in secret manager, evitare log/URL non necessari contenenti token; cifratura e segregazione dei dati.
- Identità e user-agent trasparenti quando appropriato, contatto operativo, policy di rate limiting, backpressure e stop immediato su accesso negato.
- Nessun programma di “browser stealth/anti-bot bypass” da considerare automaticamente lecito: per f3tcher il target è **efficienza su percorsi permessi**, non elusione delle protezioni.
- Test di funzionalità con **siti controllati/esplicitamente autorizzati**, incluso comportamento 401/403/429 e CAPTCHA simulati.

## Attenzione a costi e limiti infrastrutturali

La piattaforma di esecuzione non è scelta. Qualsiasi proposta Cloudflare Workers / Browser Run / Turso / R2 / container va verificata su limiti di RAM, CPU, browser, storage, costi, regioni, conformità e controllo dei dati. Separare componenti che richiedono browser pesanti/OCR da request handlers leggeri, se i benchmark lo giustificano.

## Prossimi controlli necessari

1. Matrice giuridica per tipo di fonte e finalità (es. notizie, archivi, portali governativi, dati personali, piattaforme social).
2. Verifica licenze e condizioni dei componenti scelti **prima** di importare codice, modelli o dataset.
3. Regole di gestione delle risorse negate, dei reclami e della cancellazione.
4. Threat model e test di sicurezza prima di esporre un'acquisizione arbitrary-URL.

## Ricognizione 12 — licenze dei benchmark e upstream informativi (2026-11-01)

I corpora proposti in [12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md](12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md) sono solo **candidati di ricerca**: COUNTER e USTRC dichiarano licenza **CC BY-NC-SA** (COUNTER con ulteriore avvertenza dell'autore su uso di testi giornalistici ricerca/accademia), mentre PAN 2025 e 2026 dichiarano contenuti protetti **solo ricerca e senza redistribuzione**; accesso/test richiede le condizioni effettive degli organizzatori. NewsEdits usa dati precedentemente raccolti da soggetti con licenze e autorizzazioni specifiche; **non assumere** che licenza del codice == permessi illimitati dei testi. METER è confermato come lavoro scientifico, ma la licenza/fornitura del corpus testuale resta da verificare. L'audit Longpre et al. 2024 (Nature Machine Intelligence, https://www.nature.com/articles/s42256-024-00878-8) mostra perché la licenza dichiarata da un aggregatore non sempre corrisponde a quella della fonte originale. Nessun corpus è stato scaricato in questa ricognizione.

## Ricognizione 16 — confini specifici dei nuovi canali (2026-11-02)

La [ricognizione 16](16_ACQUISIZIONE_SPECIALISTICA_RICERCA_LEGGI_STATISTICHE_FEDERAZIONE.md) verifica specifiche ufficiali che impongono attenzione:
- **Istat** dichiara **5 query/minuto per IP** per SDMX, con possibile blocco da **1 a 2 giorni** oltre il limite: neanche a titolo di benchmark eseguire test di limite su produzione.
- **Parlamento europeo** OpenData v2 documenta **500 richieste in 5 minuti sullo stesso endpoint**; verificare ulteriori regole per asset/publisher.
- **Congress.gov** richiede una chiave API legittimamente registrata; mai ottenere o simulare credenziali altrui.
- **DataCite** separa public read API e Member API per scritture; non usare operazioni mutative o sistemi autenticati in esplorazioni non autorizzate.
- **Normattiva** avverte del carattere non ufficiale/redazionale dei testi e delle condizioni di riproduzione: non confondere disponibilità pubblica con possibilità di riutilizzo illimitato.
- **Europe PMC / arXiv**: metadata indicizzabili possono riguardare articoli con diritti sul full text più restrittivi; gli endpoint per metadata non autorizzano prelievi di file coperti.
- **ActivityPub**: inbox e dati filtrati dalle ACL non sono pubblici solo perché un profilo è federato; **AT Protocol**: onorare cancellazioni, migrazioni e deactivation, non creare indiscriminatamente archivi statici dei contenuti.
- In qualsiasi caso mantenere il blocco contro bypass di HTTP 403, autenticazione, CAPTCHA, paywall e limiti di rate/uso. Nessuna richiesta massiva o interazione con endpoint reali effettuata in questa ricognizione.

## Ricognizione 17 — brevetti, biologia, media e sicurezza dei manifest (2026-11-02)

[Fonti di ricerca](17_BREVETTI_BIOLOGIA_AUDIOVISIVI_CONSERVAZIONE.md):
- EPO indirizza i robot verso REST **OPS/EPS**, non GUI Espacenet/Register. OPS richiede OAuth e condizioni fair-use (4 GB/settimana free; bulk REST max 100 docs); EPS 5 GB/7 giorni/IP; non aggirare quote con IP/proxy o account multipli.
- ENA distingue API ricerca da repository di file scientifici; la disponibilità pubblica di un accession non conferisce accesso a materiale biomedico non pubblico o diritti illimitati. NCBI E-utilities (3/s senza key) e Datasets (5/s default) hanno quote separate.
- Europeana indica metadata **CC0**, ma **media e relativi oggetti sono regolati dal rights statement per oggetto**: nessun riuso automatico da licenza metadata.
- Package BagIt `fetch.txt` contiene URI esterne, che non devono essere eseguite fidandosi ciecamente: rischi SSRF, accessi a IP privati, path traversal, decompression bomb, file size incontrollata e metadata manipolati. RFC 8493 contiene avvertenze su path malevoli.
- E-ARK DIP, PREMIS rights e METS rights possono dichiarare restrizioni diverse da quelle del catalogo; un pacchetto con metadata aperti non concede automaticamente accesso al contenuto AIP.

Nessuna sorgente con accesso protetto o servizio robotico è stata interrogata in questa ricerca e nessun corpus è stato scaricato.

## Ricognizione 20 — confine fra consultazione UI e acquisizione automatizzata (2026-11-02)

[Documento 20](20_SORGENTI_DIFFICILI_MODULI_STATI_E_OMISSIONI.md). Il lavoro su moduli di ricerca e siti dinamici NON autorizza sistematicamente enumerazioni di parametri, invii ripetuti di form, riproduzioni di endpoint interni scoperti dal JS, automazione di login, accessi a pagine protette o aggiramento di CAPTCHA/pagamenti/403/quote. La presenza di un modulo per un utente, HTTP 200 o URL in uno script non equivale a permesso per batch harvesting o redistribuzione. Browsertrix supporta `autoclick` e altre azioni: **la disponibilità tecnica non legittima l'attivazione indiscriminata**. Includere nei test soltanto mock/site controllati con azioni di lettura consentite e protezioni per link/URL che possano attivare mutazioni. Per i casi reali preferire fonti/portali ufficiali di bulk e canali di dati permessi, oppure segnalare in modo chiaro dati non acquisibili. Il Senato è stato consultato solo documentalmente, non acquisito via scraping.

## Ricognizione 21 — scalabilità non deve essere elusione del publisher (2026-11-02)

La [ricognizione 21](21_SCALABILITA_COSTI_E_ACQUISIZIONE_EFFICIENTE.md) distingue i **limiti del provider sorgente** dai **limiti dell'infrastruttura di crawling**. Le quote di Cloudflare Browser Run (o di altro browser cloud) non autorizzano ad aumentare il ritmo verso un singolo host; vietato ripartire richieste su IP/account/token diversi per aggirare il limite. Osservare pause richieste da `429 Retry-After`, `503`, termini API, robots, e **403 stop**; i server non sono obbligati a usare 429 per segnalare sovraccarico. **RFC 9309** robots è una policy di accesso di robot, **non** contratto di copyright o autorizzazione totale; se robots è unreachable per 5xx la specifica indica complete disallow in prima battuta. `Crawl-delay` può essere interpretato da singoli software come StormCrawler, ma non appartiene al core RFC 9309. **Cache cross-project** e copie WARC/HTTP rispettano licenza, `private`, varianti autorizzate, retention e segregazione dei dati; URL uguale non significa stessa autorizzazione. Nessun servizio è stato stressato, né fatto traffic generator, crawler o API probe; il documento conserva solo indicazioni di ricerca.
