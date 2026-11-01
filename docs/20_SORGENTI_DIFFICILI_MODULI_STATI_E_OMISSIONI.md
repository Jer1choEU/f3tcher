# 20 — Sorgenti difficili: moduli, stati dinamici, liste incomplete e acquisizioni apparentemente riuscite

**Ricognizione:** 2026-11-02. **Fase:** solo ricerca documentale; nessun codice, configurazione, benchmark, accesso automatizzato a portali terzi, test su moduli o architettura approvati. Segue [19](19_ADOZIONE_REALE_E_COMPATIBILITA_PORTALI.md) e mira alle **sorgenti che non espongono un catalogo/API interoperabile evidente**. Non assumere mai che «API non trovata in questa ricerca» significhi che il publisher non ne abbia una.

**Legenda:** **V-paper** = fonte scientifica primaria dell'autore/editore consultata; **V-doc** = documentazione primaria del fornitore/ente; **H** = nostra ipotesi da falsificare; **U** = proprietà non accertata o impossibile da inferire. Le prestazioni dei paper sono risultati dei rispettivi autori, **non** di f3tcher. Vincoli legali e sicurezza in [04](04_LEGALITA_E_SICUREZZA.md); l'assenza di un endpoint documentato **non** autorizza enumeration, elusione, probing intensivo di form, CAPTCHA, 403, autenticazione o rate limit.

## 1. Risultato generale: assenza di API visibile non significa assenza di struttura

La pagina può esporre indizi utilizzabili **senza inventare API o simulare utenti all'infinito**:
- link a risultati HTML, paginazione con URL stabili, sitemap/feeds;
- moduli di ricerca documentati con campi e vincoli, anche se nessun JSON/API pubblico è noto;
- file allegati e varianti di uno stesso atto, a volte collegati da una scheda;
- risultati caricati dinamicamente (pulsante *carica altro*, tab, infinite scroll, cambi URL via JS);
- archivi pubblicati in PDF o collezioni indicizzate da motori esterni, nel perimetro dei relativi diritti;
- HTTP 200 con pagina vuota, messaggio d'errore o un sottoinsieme di risultati apparentemente valido.

**Tre domande diverse:** (a) la risorsa è *scopribile* tramite canali consentiti? (b) il contenuto/asset è *recuperabile* con diritti e quote rispettati? (c) il sistema può dimostrare *quale sottoinsieme* ha effettivamente raccolto? Non confondere questi stati in «crawled=true».

**Nota epistemica:** la mancanza di API pubblicata/documentata può essere solo un limite dell'osservazione; non produce una prova di assenza. Un servizio con form HTML potrebbe comunque avere bulk export, feed, sitemap o una API da scoprire nella documentazione ufficiale. Il futuro motore **non deve** considerare endpoint interni dedotti da JavaScript come permessi di raccolta.

## 2. La Deep Web dietro moduli HTML è un problema studiato dal 2008 (V-paper)

### V1 — Madhavan et al. (PVLDB 2008), *Google's Deep-Web Crawl*
- Paper primario: https://www.vldb.org/pvldb/vol1/1454163.pdf
- Resoconto dell'autore: https://jayantmadhavan.blogspot.com/2008/09/crawling-deep-web.html
- Studia il **surfacing** di contenuti raggiungibili tramite moduli HTML: generare un insieme limitato e informativo di query e indicizzare le pagine che producono, anziché presumere che il link crawler raggiunga tutto.
- **Limiti da non nascondere:** gli spazi possibili dei campi possono essere enormi o sconosciuti; contenuti dipendenti da input, ordinamento, quote, aggiornamenti e permessi; il surfacing non certifica tutte le tuple nel database retrostante. Sono metodi del 2008, non una garanzia moderna.
- **Legalità:** solo interfacce destinate a consultazione automatizzata/consentita e con limiti/termini rispettati. Il fatto che un umano possa fare una ricerca non autorizza necessariamente un crawler a interrogare ogni combinazione.

### V2 — Barrio & Gravano, *Sampling strategies for information extraction over the deep web* (Information Processing & Management, 2017)
- Fonte primaria editore: https://www.sciencedirect.com/science/article/pii/S0306457316306318 ; DOI https://doi.org/10.1016/j.ipm.2016.11.006
- La ricerca confronta scheduling di query e campionamento su collezioni reali: privilegiare query «efficaci» può aumentare l'efficienza, mentre interrogazioni più diversificate possono migliorare **la qualità/varietà del campione**. I risultati dipendono da task e dataset.
- **H1:** non misurare una strategia soltanto con numero di record pertinenti per richiesta: può riprodurre sempre le entità più frequenti e trascurare classi rare.

## 3. I siti dinamici richiedono una nozione di stato, non solo URL (V-paper / V-doc)

### V3 — Mesbah, van Deursen & Lenselink (ACM TWEB 2012), Crawljax
- Ricerca istituzionale: https://research.tudelft.nl/en/publications/crawling-ajax-based-web-applications-through-dynamic-analysis-of-/
- Implementazione degli autori: https://github.com/crawljax/crawljax
- Il progetto scopre **stati del DOM** e **transizioni indotte dagli eventi**, rappresentate in un *state-flow graph*.
- **Caveat:** due stati con DOM uguale possono differire per dati non osservati; differenze DOM trascurabili possono generare stati duplicati; click/scroll ripetuti e dati asincroni portano a enorme spazio di stati. L'esistenza di uno strumento stateful non prova di avere esplorato *tutte* le interazioni né che siano lecite.
- **H2:** confronto static HTML vs navigazione per URL vs browser con *state graph* su un sito SPA controllato; misurare *novi asset unici scoperti* e stati effettivamente utili, non numero di click.

### V4 — Browsertrix: comportamento automatico, ma sempre con timeout e scopo finito
- Fonte primaria: https://crawler.docs.browsertrix.com/user-guide/behaviors/
- Documenta **Autoscroll**, **Autofetch**, **Autoplay**, **Autoclick** (non attivo nelle impostazioni di default riportate) e azioni specifiche per sito. I behaviours hanno timeout (documentato **90 secondi** di default per un comportamento), e possono finire per timeout anche se non è stata esaurita la risorsa.
- **Criticità:** «scroll fino a fondo» potrebbe fermarsi prima di un blocco successivo, scroll virtualizzati eliminano record precedenti dal DOM, click su schede può cambiare una selezione, *auto click indiscriminato non è opportuno o sempre lecito*. Un WARC riproducibile dimostra la cattura di quella sessione, non tutti gli stati.
- **H3:** distinguere *behavior finished*, *behavior timed out*, *no new items*, *indeterminate end* come esiti diversi negli esperimenti futuri.

### V5 — Playwright: stati di caricamento e liste dinamiche
- Fonte primaria: https://playwright.dev/docs/api/class-page ; https://playwright.dev/docs/api/class-locator
- La documentazione **sconsiglia l'uso di `networkidle` come prova di pagina pronta** nei test; suggerisce assertion sullo stato atteso. Anche `locator.all()` non attende il completamento di liste dinamiche e può fornire risultati instabili se invocato prima del termine del caricamento.
- **H4:** il futuro benchmark dovrebbe punire «HTML visibile ma elenco parziale», «networkidle raggiunto con polling o richieste mancanti», «spinner sparito ma nuovo batch non ancora incorporato».
- Non stiamo scegliendo Playwright come dipendenza obbligatoria: è **evidenza di un problema di misura**.

## 4. Pagination, infinite scroll e alias: rischi riconosciuti dai motori di ricerca (V-doc)

### V6 — Google Search Central, *Pagination, incremental page loading, and their impact on Google Search*
https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading
- **Pagination URL**, **Load More** e **infinite scroll** hanno comportamenti distinti. La guida dichiara che Googlebot segue in genere URL negli `<a href>` e non fa click sui bottoni per caricare altro. Raccomanda collegamenti paginati reali con URL distinti.
- **H5:** stessa risorsa di test implementata in (a) `?page=n`, (b) `load more`, (c) infinite scroll senza URL, (d) JSON per pagina; misurare omissioni quando browser/HTTP/connettori sono usati nello stesso budget.
- **Caveat:** sono consigli SEO per publisher, non una garanzia che un crawler diverso scopra tutte le pagine o che siano sempre permessi click/form submission.

### V7 — Google Search Central, *Fix Lazy-Loaded Website Content*
https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading
- Per infinite scroll raccomanda **URL permanenti** e contenuto stabile per «chunk». Una pagina da cui il JS rimuove le righe precedenti crea difficoltà ai parser che leggono solo il DOM finale.
- **H6:** verificare su list/virtualized scroll se elementi temporaneamente renderizzati vengono persi anche con WARC completo.

### V8 — Google Search Central, soft 404 / HTTP status
https://developers.google.com/crawling/docs/troubleshooting/http-status-codes
- Un **HTTP 200** può consegnare un messaggio di errore, una pagina vuota o un *soft 404*, quindi un job «success» basato solo sul codice non certifica né che l'applicazione abbia funzionato né che il contenuto principale sia presente.
- **H7:** testare `200+empty app shell`, `200+captcha/login/error text`, `200+partial results`, `200+200 search no hits`: distinguerli senza bypass dei controlli.
- Le definizioni Google sono specifiche del loro crawler, non un classificatore f3tcher già implementato.

### V9 — `rel=canonical`, redirects, sitemaps: indizi, non identità dimostrata
https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Per Google i **redirect** sono un segnale forte, `rel=canonical` forte, **sitemap inclusion** debole di canonicalization. Ma `rel=canonical` è la preferenza del publisher per la rappresentazione da indicizzare.
- **H8:** non cancellare le versioni/parametri `page=n`, i file allegati o gli snapshot perché tutti puntano allo stesso canonical di marketing; la canonicalizzazione SEO **non prova** che il loro contenuto informativo/versione sia identico.

## 5. Estrazione di liste difficili: risultati reali e limiti nel trasferimento (V-paper)

### V10 — *WebLists* (Bohra et al., 2025)
https://arxiv.org/abs/2504.12682
- Gli autori presentano **200 task** di estrazione su siti interattivi, con raccolte strutturate e schemi prefissati. Nelle loro prove, web agent generici / strumenti di ricerca hanno recall rispettivamente **31% / 3%**, mentre **BardeenAgent 66%**, con riduzione di costo per riga dichiarata dagli autori. **Questi numeri non sono prestazioni f3tcher e non sono confronti contro ogni crawler classico**.
- BardeenAgent usa *LLM once / reusable code/selectors repeated*; la linea è **già esistente**, non nuova per f3tcher.
- **H9:** list-level recall e field-level correctness vanno misurati **insieme**: «20 righe correttamente parsed delle 100 esistenti» non può essere un successo del 100%.

### V11 — *Multi-Record Web Page Information Extraction From News Websites* (Kustenkov et al., 2025)
https://arxiv.org/abs/2502.14625
- Dataset scientifico dichiarato dagli autori: **13.120 pagine** con liste di news in russo, campi opzionali e multivalore. È un problema di *list-page extraction*, non censimento dei siti né prova di completeness generale.
- **H10:** testare con record opzionali, multivalore, titoli ripetuti, link duplicati, date mancante e ordinamento che cambia: non forzare «una riga = un documento unico».

### V12 — *SCRIBES* (Liu et al., 2025), preprint
https://arxiv.org/abs/2510.01832
- Un framework accademico per produrre **script riutilizzabili** su gruppi di pagine con layout simile, usando reinforcement learning e reward legato a somiglianza di layout. Gli autori dichiarano miglioramenti su valutazioni proprie, **non** sulla ricostruzione di ogni risorsa di un sito.
- **Limite:** similarità del layout non implica equivalenza semantica: la stessa tabella può cambiare ordine colonne, omettere un campo o introdurre righe di subtotal; script riutilizzabile ≠ estrazione stabile.
- **H11:** confronto LLM per pagina, script generato 1x, parser manuale con schema valido, fallback e differenziale su layout drift, con *true record recall* e *cost per correct record*.

## 6. Caso istituzionale per le prossime verifiche: Senato — percorsi distinti e documenti versionati (V-doc)

**Non** classificato «sito senza API» e **nessuna query automatizzata effettuata**.

- Pagina ufficiale: https://www.senato.it/leggi-e-documenti
- Schede dei progetti: https://www.senato.it/guida-al-sito/banche-dati/schede-dei-progetti-di-legge
- Testi dei disegni di legge: https://www.senato.it/guida-al-sito/banche-dati/testi-dei-disegni-di-legge
- Ultimi atti: https://www.senato.it/leggi-e-documenti/ultimi-atti-pubblicati

Documentazione dell'ente distingue **schede di progetto e letture**, **testi**, **emendamenti**, **iter e relazioni**, e **ultimi atti**; l'elenco di ultimi atti espone pubblicazioni per date con PDF. Le schede di ricerca per progetto possono rimandare a più versioni, relazioni e documenti diversi. I metodi di ricerca hanno **filtri e perimetri differenti**; la guida spiega che alcuni motori ricercano da determinate legislature, e che una scheda può avere più letture. Il sistema potrebbe dunque trovare solo «gli ultimi atti» senza aver scoperto tutte le versioni storiche, pur avendo un elenco aggiornato.

**Cosa NON si può inferire da questa ricerca:** assenza di API, mancanza di bulk export, accesso consentito all'enumerazione automatica, copertura completa per qualsiasi legislatura, equivalenza fra scheda e tutti i PDF. Una verifica di eventuali canali ufficiali machine-readable deve precedere ogni proposta di automazione.

**H12:** testbed con *scheda → letture multiple → documenti PDF → emendamenti → duplicati con suffissi*: confrontare (a) lista «ultimi», (b) query per titolo, (c) document navigation e (d) inventario gold del testbed, sempre senza eseguire test non consentiti sul vero portale.

## 7. Interpretazione delle «sorgenti non standard»: una tassonomia di ricerca

| Caso | Segnale osservabile | Falso successo frequente | Possibile controllo in testbed futuro |
|---|---|---|---|
| Modulo di ricerca HTML | Filtri nome/data/stato, GET/POST consentiti? | Query di prova vista come elenco esaustivo | Query set controllato + gold inventory, limiti |
| Pagine indicizzate a chunk | `?page`, next link, offset | «Pagina 1 acquisita» = archivio completo | Unique IDs per chunk e overlap |
| Pulsante carica altro | DOM cresce dopo click | Solo prime N righe | Count e sentinel di fine elenco |
| Infinite scroll/virtual list | righe create/rimosse | DOM finale nasconde righe precedenti | Asset unique IDs lungo gli stati |
| Filtri/sort | stessa URL, DOM diverso | Un filtro trattato come l'universo | Faceted coverage e cross-check |
| Multipli percorsi istituzionali | scheda, testo, emendamento, PDF | Un solo PDF ritenuto atto intero | Relazioni e versioni del gold graph |
| Hard/soft errors | HTTP 200, login shell, JS error | Job success senza dati | Content assertions e reason for abstention |
| Aliases/canonical | redirect/rel=canonical | Versioni e allegati collassati | Checksums, timestamp e semantic IDs |
| Script extraction riusato | layout ricorrente | parse valido ma dati mancanti | Record/field recall con schema drift |
| Form non autorizzato | accesso, quote, ToS, robots | «Accesso tecnicamente possibile» = permesso | **No action**, classificazione permessi |

**Nota:** in alcuni sistemi l'accesso a contenuti di ricerca attraverso UI può richiedere login, token CSRF, cookies, interazioni legittime o restrizioni contrattuali. Questi vincoli **non** sono autorizzazioni implicite a riprodurre automaticamente le chiamate nascoste. In caso di mancanza di permesso, trovare un altro canale autorizzato o registrare il gap.

## 8. Nove possibili confronti discriminanti — ipotesi NON testate

1. **Browser escalation vs HTTP-first:** quanto aumenta la scoperta di *asset realmente distinti*, costo e false omission, su pagine statiche/SSR/SPA?
2. **State explosion:** quante azioni browser sono utili per ogni nuovo ID/record? Confrontare navigazione a URL e state-flow su un testbed autorizzato.
3. **Form query coverage:** query frequenti vs diverse per categorie rare; verificare se ottimizzare soltanto costo marginale produce bias, come avverte Barrio/Gravano.
4. **Pagination stability:** pagina cambia fra fetch; record spostati tra offset per nuovi inserimenti; nessun claim di completezza da pagine 1..k senza snapshot/denominatore.
5. **Ready state ambiguity:** `load`, `networkidle`, assertion applicativa, contatore di righe e ricerca del marker finale producono «complete» diversi.
6. **Virtual lists:** durante lo scroll i record scompaiono dal DOM; misurare copertura sugli ID osservati in ciascuno stato, non solo DOM finale.
7. **List extraction drift:** parser/LLM/script riusabile su colonne mutate e righe rare, con metrics *precision + recall + empty/optional fields*, confrontando WebLists/SCRIBES e regole trasparenti.
8. **HTTP soft-success errors:** `200 login shell/blank/soft404/results partial` con stati HTTP identici; stimare falsi successi senza classificare indiscriminatamente pagine valide come errori.
9. **Legal stop cases:** endpoint/form negato, robots disallow o API riservata; nessun bypass/credential guessing, stop del singolo percorso e ricerca esclusiva di alternative pubblicate/autorizzate.

**Testbed necessario:** siti e interfacce controllati, inventario gold per filtri/versioni/componenti, mutazioni temporali, permessi espliciti, identità note e log dei costi. Separare **URL recall**, **distinct record recall**, **asset/file recall**, **field recall**, **temporal recall**, **state/interaction coverage**, *false completeness* e **diritti rispettati**. Nessun benchmark f3tcher eseguito e nessuna metrica soddisfatta sul Web reale.

## 9. Decisione di ricerca: cosa aggiunge questo documento rispetto ai precedenti

- La [ricognizione 15](15_ACQUISIZIONE_UNIVERSALE_PROTOCOLLI_E_CRAWLER.md) documentava protocolli e crawler; la presente studia **sorgenti senza contratto standard pubblicato** e quando UI state/forme sono essenziali.
- La [ricognizione 18](18_SINTESI_COMPARATIVA_E_LACUNE.md) concludeva che non esiste il crawler migliore in assoluto: la presente identifica **i falsi successi specifici** che dovrebbero discriminare le opzioni senza una semplice leaderboard.
- La [ricognizione 19](19_ADOZIONE_REALE_E_COMPATIBILITA_PORTALI.md) selezionava noti adopter: la presente usa **il Senato come caso documentale di interfacce pubbliche multiple**, **senza** dimostrare assenza di API né misurare adozione di non-adopter.
- **WebLists**, **SCRIBES**, **Crawljax**, **Google's Deep-Web Crawl** mostrano che *code reuse, form surfacing, state exploration, list extraction* sono già filoni consolidati. Non fare affermazioni di originalità basate sul solo assemblaggio di etichette.

## 10. Priorità residue e prossimo studio mirato

**Ricerca 21 suggerita:** costi e scalabilità reale sotto vincoli di *politeness*, quote API, caching, browser/browserless, bulk, fallback, identità/asset e limiti CPU/memoria. Confrontare a **parità di perimetro e diritti**, non cercare record rate più alto tramite bypass.

**Alternativa utile da raccogliere:** *adoption audit* di portali selezionati senza precondizione che supportino API note; serviranno campionamento, regole di osservazione leggere, gestione U=non verificabile e permessi. Non trarre percentuali da campione di esempi scelti a mano.

**Stato finale:** ricerca documentale 2026-11-02, con fonti primarie e limiti; nessun codice, test, stack, esecuzione di form, crawling reale o decisione architetturale.
