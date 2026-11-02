# 23 — Sintesi scientifica della fase esplorativa (ricerca 00–22)

**Data di consolidamento:** 2026-11-02. **Stato:** conclusione **documentale** della fase di ricognizione ampia, **NON** conclusione empirica, **NON** avvio della progettazione/sviluppo. Non esistono codice applicativo, benchmark f3tcher, comparazioni reali delle strategie, architettura, stack, infrastruttura o licenze adottate. La repository costituisce un archivio di ipotesi e fonti da consultare, non un software funzionante. La decisione di cambiare fase spetta all'utente.

**Contesto non negoziabile:** un solo motore automatico riutilizzabile, senza profili selezionabili di potenza; aspirazione alla massima acquisizione di informazioni digitali *lecitamente accessibili* da web, API, bulk, streaming, archivi e file; rispetto di rate limit, diritti, accessi, robots, contratti, licenze, privacy; **no bypass di HTTP 403, login, CAPTCHA, paywall o anti-bot**. Il fatto che una pagina risponda HTTP 200, esponga JSON o compaia in un archivio non prova l'autorizzazione a usare/redistribuire il contenuto. Il documento **non è parere legale**.

**Come leggere questo file:** è la vista unificata e prioritaria per le future chat. Restano rilevanti [00](00_STATO_E_DECISIONI.md) (decisioni), [04](04_LEGALITA_E_SICUREZZA.md) (vincoli), [05](05_DOMANDE_E_BENCHMARK.md) (prove da progettare), [06](06_RIPRESA_NUOVA_CHAT.md) (handoff), [18](18_SINTESI_COMPARATIVA_E_LACUNE.md) (mappa e doppioni), [19](19_ADOZIONE_REALE_E_COMPATIBILITA_PORTALI.md) (adozione), [20](20_SORGENTI_DIFFICILI_MODULI_STATI_E_OMISSIONI.md) (form e SPA), [21](21_SCALABILITA_COSTI_E_ACQUISIZIONE_EFFICIENTE.md) (economia) e [22](22_ROUTING_ADATTIVO_SCELTA_METODO_E_VALIDAZIONE.md) (routing).

**Etichette di certezza:** **V** = standard, pagina ufficiale o abstract/paper consultato; **T** = proprietà/risultato dichiarato da autore o vendor, non riprodotto; **H** = ipotesi di ricerca di f3tcher, non testata; **U** = ignoto o non identificabile dai dati attuali; **D** = decisione espressa dell'utente, non una conclusione scientifica. Non usare «verificato» per un'integrazione non eseguita.

---

## 1. Verdetto scientifico e confini

### 1.1 Ciò che la ricerca documentale ha ottenuto

- Ha mappato la grande maggioranza delle **famiglie tecniche necessarie** a un sistema di acquisizione eterogenea: discovery, crawler/frontend, HTTP/browser, API/catalog/bulk, feed/delta/archivi, form e web dinamico, documenti multi-file, parsing, provenance, scheduling, verifica e policy.
- Ha confrontato standard **effettivi**, progetti open source, pubblicazioni scientifiche e casi di portali che pubblicano canali interoperabili. La maturità commerciale e l'adozione delle *singole installazioni* restano variabili.
- Ha identificato **sovrapposizioni** che impediscono di spacciare come innovazione il semplice assemblaggio di funzioni già presenti in Crawlee, Scrapy, StormCrawler, Airbyte, dlt, Browsertrix o negli standard.
- Ha individuato il vero problema che merita prova: **decidere quale canale consentito usare, quando combinarlo con altri e quando concludere o ammettere incertezza**, conservando *identità, componente, versione, diritti* e costo.
- Ha individuato i **fallimenti silenziosi**: HTTP 200 vuoto, liste troncate, pagination moving target, cursor/stream gaps, 304 solo sulla landing page, record metadata senza file, browser/HTTP entrambi incompleti, licenza metadata ≠ licenza media, pacchetti validi ma incompleti rispetto al publisher.

### 1.2 Ciò che NON abbiamo ottenuto

- **Zero** prove end-to-end di f3tcher: nessun motore, pipeline, crawler, testbed o benchmark eseguito.
- **Zero** misure empiriche di throughput, latenza, costi, completezza, precision/recall, robustezza o superiorità di una combinazione.
- Nessun censimento rappresentativo di portali con o senza API; il documento [19](19_ADOZIONE_REALE_E_COMPATIBILITA_PORTALI.md) ha esaminato un **campione intenzionale**, e ha letto direttamente **due root STAC JSON del medesimo publisher**, non una dimostrazione di conformità su tutte le query.
- Nessun algoritmo multi-canale universale validato; nessun «punteggio unico» condiviso fra PDF, leggi, serie statistiche, repository social, siti SPA e immagini.
- Nessuna conclusione secondo cui f3tcher sia unico al mondo, superiore ad altri strumenti, completo al 100% o pronto alla produzione.
- Nessuna valutazione giuridica definitiva per specifico sito, tipo di dato o dataset. I diritti vanno ricontrollati sul concreto uso e sui singoli asset.

**Conclusione:** la **ricerca esplorativa bibliografica** è sostanzialmente matura e può essere considerata **sufficientemente ampia per discutere una successiva fase di validazione**. Non sarebbe scientifico considerare conclusa la **validazione** o iniziare l'implementazione senza nuova decisione dell'utente.

## 2. Consolidamento delle capacità: V esistente, H da sperimentare e U residuo

| Dominio | Capacità V/T già esistenti | Potenziale H per f3tcher | Limite U / controllo necessario |
|---|---|---|---|
| Discovery web | Scrapy/Crawlee/StormCrawler/Heritrix, sitemap/RSS, link discovery | Scoperta complementare non focalizzata solo sui link | Accesso reale a risorse fuori dalla frontier, bias delle query |
| HTTP/browser | Crawlee **AdaptivePlaywrightCrawler** e request routing Scrapy+Playwright | Decisioni condizionate da effettiva completezza, non solo parsing valido | Se entrambi vedono 20/100 record, possono dichiararsi concordi |
| Cataloghi e API | DCAT, CKAN, OAI-PMH, STAC, OGC, IIIF, SDMX, OpenAPI, Signposting | Confrontare più interfacce lecite per *asset veramente nuovi* | Versioni, gap, sottoinsiemi API, installazioni eterogenee |
| Bulk e archivi | Common Crawl WARC/WAT/WET, Crossref/OpenAlex dumps, repository istituzionali | Archive-first quando gli snapshot sono utili e il riuso è consentito | Freshness, assets mai archiviati, licenze, versioni perse |
| Sync e data ingestion | ResourceSync, OData delta, Airbyte CDC, dlt state/cursor, ETag/304 | Evitare fetch inutili preservando continuità verificabile delle modifiche | Event retention, offset paging inconsistente, history non disponibile |
| SPA/form | Crawljax state-flow, Playwright, Browsertrix, deep-web surfacing | Scoperta dei percorsi UI consentiti e rilevazione di liste troncate | Esplosione di stati e query, permessi, dom virtualizzato |
| Parsing e oggetti composti | Docling, parser specialistici, METS/PREMIS/BagIt/IIIF, Akoma Ntoso, SDMX | Distingue record, asset, versione e campo, senza appiattimento | Parsing «success» con field/asset recall inferiore |
| Scheduling | Scrapy AutoThrottle, StormCrawler queues, Crawlee autoscale, theory recrawl | Budget e fairness delle fonti rare con costo per dato valido | Quote host, costi reali, prior e drift |
| Fonte e provenienza | W3C PROV, genealogie da testi, NETINF, dependency detection, TUF/SCITT | Evitare conteggio di copie come corroborazioni indipendenti | Origine causale non identificabile con upstream nascosti |
| Validazione e affidabilità | checksum/manifest, conformance validators, differential/metamorphic tests, conformal/selective risk sotto ipotesi | Dichiarare **completezza circoscritta** o **sconosciuta**, non falsa certezza | Assenza di inventario/gold, selection bias, distribuzione che cambia |
| AI e scelta adattiva | Bandit, learned routing LLM, FIRE, WebDART, Crawlee adaptive, reusable scripts | Confronto multi-canale con *cost, coverage, rights* e falsificazione dell'ipotesi | AI costosa o vulnerabile; nessuna prova che batta regole semplici |
| Sicurezza e diritti | RFC 9309, policy/ToS, diritti per asset, sandboxing, web-agent prompt-injection benchmarks | Le policy prevalgono sempre sui suggerimenti del modello e sui dati della pagina | Review giuridica per singola fonte, documenti non attendibili |

**Interpretazione:** non è un inventario di componenti da integrare. Tutte le tecniche citate hanno condizioni, licenze e failure modes da confrontare prima di qualunque scelta. La presenza in più righe non giustifica duplicazioni.

### 2.1 Quattro conferme esterne ricontrollate in questa sintesi

1. **Crawlee \`AdaptivePlaywrightCrawlerOptions\` (API ufficiale)** documenta \`renderingTypeDetectionRatio\`, \`renderingTypePredictor\`, \`resultChecker\`, \`resultComparator\` e possibili esiti \`equal/different/inconclusive\`. Nessuna di queste capacità prova l'assenza di una fonte o record non osservato. https://crawlee.dev/js/api/playwright-crawler/interface/AdaptivePlaywrightCrawlerOptions
2. **USENIX Security 2024 — SoK: State of the Krawlers** confronta le configurazioni su code/link/JS source coverage in contesti specifici, trovando che non emerge una *singola configurazione* vincente su tutto. Questo NON dimostra che una scelta adattiva futura vinca di necessità. https://www.usenix.org/conference/usenixsecurity24/presentation/stafeev
3. **W3C DCAT 3** è Recommendation del **22 agosto 2024**, consente aggregazione di metadata fra cataloghi e amplia dataset series/versioning. È un linguaggio per **descrivere**, non una garanzia di presenza di ogni file o che ogni publisher sia conforme. https://www.w3.org/TR/vocab-dcat-3/
4. **IETF RFC 9309** definisce Robots Exclusion Protocol e dice esplicitamente che le regole **non sono access authorization**. Le quote, le licenze e le proibizioni del sito restano livelli ulteriori. https://www.rfc-editor.org/rfc/rfc9309.html

### 2.2 Un controllo reale sulla fragilità delle interfacce

Il publisher Copernicus ha **annunciato il 16 ottobre 2026** la migrazione a una nuova STAC API e la sostituzione del vecchio endpoint il **12 gennaio 2027**, con *parallel run* e quote diverse per il nuovo servizio. https://dataspace.copernicus.eu/news/2026-10-16-new-sfeos-stac-catalogue-endpoint

**Cosa dimostra:** le interfacce, le loro versioni, le condizioni operative e le queryables cambiano; *il nome STAC* non basta per decidere un'acquisizione robusta. **Cosa NON dimostra:** che un sistema f3tcher sappia effettuare la migrazione o che i due cataloghi abbiano contenuto identico.

## 3. Innovazione potenziale: tre ipotesi da valutare senza rivendicare novità

### H-A — Evidence-constrained multi-channel acquisition

Una possibile differenza empiricamente testabile è **scegliere e riconciliare più canali disponibili e leciti** (bulk/catalogo/API/feed/archivio/HTTP/browser), decidendo quando un secondo canale ha **valore marginale osservabile** in *asset distinti* e *missingness* anziché aggiungere duplicati. Non è mai stata dimostrata l'originalità globale di questa combinazione; harvester multiprotocollo **esistono** (data.europa.eu, documentazione precedente).

**Domanda falsificabile:** a parità di diritti, costo e corpus, la selezione migliora *verified asset recall* senza penalizzare fonti rare e aggiornamenti? Quali casi semplici sono già risolti da un catalogo ben documentato?

### H-B — Missingness-aware source semantics

Altra ipotesi: il sistema riconosca quando una **scheda bibliografica non contiene il full text**, una **legge multivigente** include versioni differenti, una **serie SDMX** perde revisioni precedenti, un **IIIF manifest** descrive oggetti e media, o un **BagIt valido** garantisce checksum dei file dichiarati ma non completezza dell'universo.

**Domanda falsificabile:** una rappresentazione di tali unità, la verifica delle componenti e un'affidabile risposta *unknown/incomplete* riducono i **falsi successi** rispetto a scaricare semplicemente il primo documento o produrre JSON?

### H-C — Evidence-preserving efficiency e anti-confirmation

Una terza ipotesi è che una politica adattiva più attenta a **lacune, rare sources e fonti che possono smentire ipotesi iniziali** eviti il bias di un algoritmo che ottimizza solo richiesta/s, novità semantica o expected information gain calcolato da ipotesi sbagliate. I documenti [08](08_ADOZIONE_CONSISTENZA_E_LONG_TAIL.md), [14](14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md) e [21](21_SCALABILITA_COSTI_E_ACQUISIZIONE_EFFICIENTE.md) contengono studi e caveat.

**Domanda falsificabile:** quanto costa proteggere long tail e nuove evidenze indipendenti? In quali casi una politica semplice/stratificata ottiene risultati migliori di un agente AI? Nessun calcolo è stato effettuato.

Queste sono **ipotesi di ricerca interconnesse**, non tre prodotti o profili utente selezionabili, e non determinano componenti software.

## 4. Claim già smentiti o non sostenibili con la ricerca attuale

1. **«Un browser o un LLM per ogni URL è l'approccio ottimale»** — non esiste una prova; costi e limiti differenti.
2. **«Il routing adattivo HTTP/browser sarebbe un'invenzione f3tcher»** — esiste già in Crawlee; anche il routing multi-plan e le cascades hanno letteratura preesistente.
3. **«Supportiamo tutti i protocolli, dunque vediamo tutti i contenuti»** — una API/catalogo può pubblicare solo un subset, e un pacchetto può esporre metadata senza file.
4. **«HTTP 200/JSON valido/WARC archiviato significa acquisizione riuscita»** — non certifica record, campo, versione, completezza o diritti.
5. **«Due metodi concordi sono una prova di completezza»** — possono condividere la stessa omissione o lo stesso upstream.
6. **«Un hash/firma prova che un fatto è vero»** — può provare integrità o autenticazione di un oggetto, non la verità o assenza di altri oggetti.
7. **«Più worker/alias/proxy aggirano i limiti e migliorano la scala»** — fuori policy, e la capacità lecita della fonte resta un limite.
8. **«Il più alto punteggio di un benchmark web agent è il miglior recall di acquisizione»** — metriche di task, URL, campo, file e tempo non sono equivalenti.
9. **«Un motore può sempre dimostrare il 100% di tutti i dati pubblici»** — in assenza di inventario/gold completo, mancano informazioni sul denominatore e sugli upstream ignoti.
10. **«Gli altri sistemi non dispongono di acquisizione multiprotocollo»** — esistono harvester pubblici e tecniche commerciali; l'eventuale distintività va stabilita con ablation e letteratura.
11. **«Basta una formula unica per sommare legalità, costo, qualità, copertura e verità»** — i vincoli duri non sono premi compensabili con più dati; le metriche richiedono semantiche esplicite.
12. **«Sono già verificati i vantaggi di f3tcher»** — non esiste ancora f3tcher come software e non abbiamo misurato benchmark propri.

La documentazione deve conservare queste esclusioni, per evitare di tornare in future chat a proclami già confutati.

## 5. Le vere lacune, classificate per modo di risolverle

| Lacuna | Stato oggi | Soluzione scientificamente pertinente | Necessita sviluppo? |
|---|---|---|---|
| Adozione reale dei protocolli | Pochi casi noti, campione intenzionale [19] | Campionamento rappresentativo con osservazioni read-only consentite, e documentazione di non-adopter | Non necessariamente; ma richiede raccolta empirica |
| Qualità costo/recall per canale | Nessuna misura f3tcher | Testbed con identico inventario, costi, permessi, tempo e versioni | Serve una fase sperimentale, non necessariamente il prodotto finale |
| Confronto AI, regole e predictor | Crawlee/paper esistono, nessuna prova trasferibile | Baseline comparabili, test su shift, false escalation, off-support e long tail | Fase sperimentale |
| Identità di record/asset/versione | Semantica documentata per domini, non testata insieme | Gold corpus composto con manifest, vincoli di rights e versioning | Testbed sperimentale |
| Completezza senza gold | Dimostrabile solo localmente sotto premesse; origine ignota in alcuni casi | Ricerca formale + astensione; individuare casi non identificabili | Potenzialmente ricerca teorica aggiuntiva, non risolta con solo codice |
| Compliance per singola fonte | Policy generali documentate, diritti non verificati per tutti gli asset | Valutazione giuridica/contrattuale mirata e registro dei diritti | Non solo sviluppo |
| Robustezza di schema/drift nel tempo | Failure modes documentati, non quantificati | Cambi controllati di formato/API/URL, sessioni/eventi/tombstone | Testbed |
| «Mai visto prima» e vantaggio concreto | Nessuna dimostrazione | Confronto feature-by-feature, baseline, ablation, licenze, risultati riproducibili | Ricerca + prove |

**Nota:** la fase *bibliografica* non può da sola sciogliere le righe che richiedono esperimenti. Proseguire con altre 100 fonti simili non equivale a una valida misura di miglioramento.

## 6. Protocollo di confronto concettuale minimo — NON test o specifica di sistema

Per decidere se sperimentare in seguito, i confronti più discriminanti possono essere ridotti a **sei** problemi, senza implementazione ora.

**B1 — Route decision:** stessa sorgente con HTML, browser dinamico, API/catalogo o bulk; misurare *distinct verified asset recall* con diritti/quote, tempo e CPU uguali. Baseline: un solo canale economico, HTTP-first, browser-first, catalog-first, router adaptivo già esistente, opzione multicanale ipotetica.

**B2 — Silent incompleteness:** entrambe le vie HTTP/browser restituiscono lo stesso 20/100; inventario controllato fornisce 100. Misurare falsi **complete** e capacità di dire **unknown**, non solo concordanza.

**B3 — Time and change gap:** API paginata mentre cambia, feed delta con retention breve, 304 sulla landing ma JSON mutato, tombstone e restart. Misurare versioni/eventi perduti e falso successo, con snapshot gold simulato.

**B4 — Compound/rights-aware:** metadata OA ma asset chiuso, file PDF+XML+immagine/track, Normattiva originale-vigente, SDMX con DSD/codelist. Misurare componenti autorizzati e campo-versione corretti, evitando duplicati fra rappresentazioni.

**B5 — Long-tail and economics:** host rari, costi per request variabili, 429/503 e limiti simulati, query inizialmente poco redditizie; confrontare politiche semplici, random/stratified, bandit ed eventualmente AI per *recall per source tier*, *cost per correct asset*, zero policy violations.

**B6 — Resilience and untrusted source:** cambi API/endpoint/schema, payload con istruzioni ostili, manifest con URL vietate, sito/format fuori distribuzione; misurare sicurezza, astensione, recupero e output verificabile.

**Validità del confronto:** gold inventory noto per ogni testbed; stessa finestra temporale/budget/rights; metriche per dominio; log dei tentativi e policy; repeated trials/seeds; intervalli d'incertezza; riportare anche i fallimenti. Log di politiche precedenti non sono controfattuali completi: non valutare una nuova politica dai soli risultati che quella vecchia ha scelto di osservare. **Non aggregare** legal violations e utilità in un punteggio che consenta compensazioni.

## 7. Criteri operativi per fermare la ricerca bibliografica — non traguardi software

| Domanda di sufficienza | Valutazione al 2026-11-02 | Cautela |
|---|---|---|
| Sono state identificate le maggiori famiglie di sorgenti e approcci? | **Sì, a livello documentale** | Non un censimento di tutte le tecnologie esistenti |
| Abbiamo almeno una baseline nota per ciascun grande problema? | **Sì, per le principali categorie** | Maturità/licenza/versioni da riverificare alla selezione |
| Sono documentati limiti e fallimenti che falsano i risultati? | **Sì, molti** | Frequenza empirica e severity ignote |
| La differenza fra ipotesi e risultato è chiara? | **Sì, quando la documentazione viene letta insieme ai caveat** | Evitare overclaim nelle future comunicazioni |
| Abbiamo costi/recall per scegliere il mix? | **No** | Necessita studio sperimentale, non altra teoria generica |
| Abbiamo prova di funzionamento multi-fonte di f3tcher? | **No** | Nessun sistema implementato o benchmark |
| Abbiamo licenze/permessi verificati per tutte le fonti? | **No** | Analisi per caso prima di utilizzo |
| La selezione dei protocolli usati nel mondo è statisticamente rappresentativa? | **No** | Serve campionamento e raccolta empirica |

**Proposta ragionata, NON decisione d'utente:** dichiarare **consolidata e sufficientemente esplorata la ricognizione bibliografica generale**. Conservare un **registro aperto** per nuove prove realmente discriminanti, aggiornamenti delle versioni, norme, benchmark e fonti. Non «chiudere» permanentemente la scienza né dichiarare pronto il progetto. La fase successiva *che avrebbe valore* è una **validazione sperimentale controllata e autorizzata**. Questa fase **non inizia qui**.

## 8. Questions we cannot answer yet (esplicito)

1. **Quanto più efficace sarà f3tcher?** Impossibile quantificare oggi; nessun benchmark proprio.
2. **Quale stack, linguaggio, database, cloud e browser?** Non deciso; dipende dai benchmark, dalle licenze e dai costi.
3. **Serve davvero un agente LLM?** Non noto: possiamo confrontare, non pregiudicare.
4. **Qual è la percentuale di Web/dati pubblici teoricamente raggiungibile?** Non stimata: non esiste inventario globale completo e accessibile.
5. **Sappiamo identificare tutte le fonti originali e indipendenti?** No; possono esserci upstream nascosti e casi observationally indistinguishable.
6. **Tutti i metadati pubblici possono essere liberamente copiati/riutilizzati?** No; accesso, conservazione e riuso hanno limiti distinti.
7. **Possiamo distribuire f3tcher come software di nostra proprietà senza vincoli?** Da valutare; versioni software, licenze transitive, modelli, dataset e servizi terzi hanno regole differenti.
8. **Tutte le API o standard resteranno attivi allo stesso URL?** No; Copernicus 2026 ne è un controesempio documentato.

## 9. Raccomandazione di handoff, senza forzare cambi di fase

In una nuova chat:
1. Leggere prima questo file, [00](00_STATO_E_DECISIONI.md), [04](04_LEGALITA_E_SICUREZZA.md), [18](18_SINTESI_COMPARATIVA_E_LACUNE.md), [22](22_ROUTING_ADATTIVO_SCELTA_METODO_E_VALIDAZIONE.md) e [06](06_RIPRESA_NUOVA_CHAT.md); consultare gli altri documenti 01–21 quando occorrono dettagli o fonti.
2. Non ripetere l'intera ricognizione 00–22 né considerare la novità come criterio sufficiente. Se emerge una fonte scientifica nuova, indicare **quale ipotesi cambia**.
3. Se l'utente domanda di **continuare la ricerca**, approfondire soltanto le lacune aperte o nuovi confronti davvero discriminanti; non avviare sviluppo.
4. Se l'utente **autorizzerà esplicitamente** una fase sperimentale, predisporre un testbed controllato e test misurabili prima di fissare una architettura, senza accedere in modo invasivo a siti reali.
5. Conservare l'obiettivo di **un solo sistema automatico** e il divieto di aggirare protezioni. Separare rigorosamente dichiarazioni esterne, misure nostre e ipotesi.

**Stato finale verificabile:** questa è una **sintesi scientifica della ricerca esplorativa**, non un prodotto, specifica di implementazione o prova di superiorità.
## Aggiornamento 2026-11-02 — il protocollo di validazione è ora documentato, non eseguito

La proposta [24_PROTOCOLLO_VALIDAZIONE_SCIENTIFICA.md](24_PROTOCOLLO_VALIDAZIONE_SCIENTIFICA.md) specifica sei classi sperimentali P1–P6, metriche/denominatori, gold per asset/record/versioni/diritti, baseline, controllo dei bias e preregistrazione futura. Questo collegamento **non cambia le conclusioni scientifiche** né abilita software/test: l'utente ha autorizzato soltanto **la stesura del documento**. Se vorrà autorizzare i test, confermare prima risorse, criteri, dimensione e perimetro.

## Aggiornamento — pilot01 eseguito: la validazione indipendente resta da fare

Dal 2026-11-02 esiste un **harness di prova locale** con report [25](25_PILOTA_SINTETICO_RISULTATI.md) e [codice](../experiments/pilot01/README.md), creato dopo `procedi` dell'utente. Le percentuali 24/54 HTML, 28/54 API, 46/54 union si riferiscono soltanto a **quattro fixture simulate progettate insieme alle baseline**; non correggono il giudizio sulla mancanza di benchmark **indipendenti**. Sono stati superati 2 unit test; la misura browser è indisponibile per `ERR_BLOCKED_BY_ADMINISTRATOR`. Ancora nessun motore f3tcher o architettura scelta. Per qualsiasi futura prova scientifica servono preregistrazione G2, gold congelato senza leakage, tool comparabili e permessi.
