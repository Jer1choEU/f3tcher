# 13 — Diffusione, identificabilità delle origini e astensione calibrata

**Ricognizione:** 2026-11-01. **Fase invariata:** ricerca documentale. Non esistono codebase applicativa, crawler operativo, benchmark f3tcher, architettura, stack o uso dei dataset approvati. Questo documento segue [12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md](12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md).

**Legenda di evidenza:** **V** = fonte primaria consultata (editore, autori, dataset ufficiale); **H** = ipotesi di ricerca non sperimentata; **P** = pista non sufficientemente verificata. I risultati dei paper sono attribuiti agli autori, non riproduzioni di f3tcher. Ogni futura raccolta o riuso di dati richiede verifiche di accesso, licenza, privacy e restrizioni come in [04_LEGALITA_E_SICUREZZA.md](04_LEGALITA_E_SICUREZZA.md).

## Esito principale

L'obiettivo non è semplicemente **produrre il grafo più plausibile**, ma **individuare quali relazioni sono osservate, quali sono inferite, quali sono compatibili con più storie e quali non sono identificabili con i dati disponibili**.

Un corpus di URL, citazioni, hyperlink e timestamp può supportare l'inferenza di *diffusione*. Non conferma in modo automatico *copia causale, derivazione dell'intero articolo o originalità fattuale*. L'ordine d'osservazione dipende anche da ritardi di crawling, clock, revisioni e scomparsa di sorgenti. Un grafo di diffusione ricostruito algoritmicamente **non** è il gold truth della catena reale.

Sembra utile studiare **l'origine come insieme di ipotesi compatibili**, con condizioni esplicite che permettano di distinguerle, invece di obbligare una singola etichetta.

## A. Il progetto Stanford NETINF: una baseline concreta (V)

**V1 — Gomez-Rodriguez, Leskovec, Krause (KDD 2010), _Inferring Networks of Diffusion and Influence_.**
- Pagina ufficiale di progetto e risorse: https://snap.stanford.edu/netinf/
- Testo del paper su Stanford: https://www-cs-faculty.stanford.edu/people/jure/pubs/netinf-kdd10.pdf
- Il progetto fornisce codice, esempio di formato delle **cascades** (ID del sito e timestamp di osservazione) e output di reti direzionali inferite con *marginal gain*, frequenza di uso dell'arco e differenze temporali.
- Usa le tracce MemeTracker per inferire una rete `who-copies-from-whom / who-repeats-after-whom` in siti di notizie e blog; **la denominazione della relazione è operativa rispetto al modello, non certificazione di una copia realmente avvenuta**.
- Nelle rappresentazioni scaricabili `InfoNet...`, gli archi sono il **risultato inferito dall'algoritmo**, non etichette indipendenti di ground truth. Non usare tali archi come target perfetto per misurare la capacità f3tcher di scoprire la vera genealogia.
- **H1:** confrontare baseline temporale NETINF-style con hyperlink, citazioni esplicite, near-dup e tracciamento di versioni; includere upstream mancanti e falsi link per argomento in comune.

**V2 — Gomez-Rodriguez, Leskovec, Schölkopf (2013), _Structure and Dynamics of Information Pathways in Online Media_.**
- Fonte da recuperare e verificare nel dettaglio prima di riportare risultati: **P**, non trattare titolo come nuova conclusione testata. Si collega al filone di ricostruzione e variazione delle reti, ma non è usato come evidenza in questa ricognizione.

## B. MemeTracker: osservazioni di rete, non genealogia certificata (V)

**V3 — Stanford SNAP, _96 million Memetracker memes_:** https://snap.stanford.edu/data/memetracker9.html
**V4 — Dataset e formato originali:** https://snap.stanford.edu/memetracker/data.html

- La pagina SNAP riporta **96.608.034 documenti**, **210.999.824 menzioni di frasi**, **418.237.269 hyperlink**.
- Nei dati grezzi le righe hanno `P` (URL della pubblicazione), `T` (tempo dichiarato), `Q` (frase) e `L` (collegamenti); i cluster associano varianti testuali e URL.
- Queste informazioni possono studiare *phrase propagation*, citazioni, riscritture e ordinamento temporale, ma non indicano necessariamente chi abbia letto chi, se due editori abbiano ricevuto un comunicato non osservato, o se una frase fosse già nota prima della raccolta.
- Rischi concreti: *sampling bias* verso fonti osservate, clock inaccurati, duplicati di pubblicazione, link inseriti dopo la diffusione, periodi storici (2008–2009), copertura linguistica e copyright dei testi/link.
- **Non è un dataset di causal ground truth delle copie.** La grande scala non corregge da sola la mancata osservazione dei veri intermediari.

**V5 — Stanford NIFTY:** https://snap.stanford.edu/nifty/about.html
- Progetto di clustering incrementale delle varianti delle frasi citate su vasta scala. La pagina del progetto dichiara prestazioni e numeri sul suo corpus, ma non sono stati replicati. È una possibile *baseline per phrase mutation*, **non** un metodo di autenticazione della genealogia.

## C. Perché identificare l'origine da osservazioni incomplete è difficile (V)

**V6 — Farajtabar et al. (AISTATS 2015), _Back to the Past: Source Identification in Diffusion Networks from Partially Observed Cascades_.**
- Fonte peer-reviewed: https://proceedings.mlr.press/v38/farajtabar15.html
- Utilizza una rete di diffusione appresa da tracce storiche e un metodo probabilistico per inferire la sorgente e il tempo iniziale da tracce incomplete.
- **Condizioni:** modello di propagazione, osservazioni e parametri; non prova identificabilità dell'origine di ogni documento Web.

**V7 — Zhu & Ying (IEEE INFOCOM 2016), _Information source detection in networks: Possibility and impossibility results_.**
- Fonte istituzionale: https://asu.elsevierpure.com/en/publications/information-source-detection-in-networks-possibility-and-impossib/
- Studia il modello *independent cascade* e individua regioni di possibilità/impossibilità dell'identificazione in particolari grafi e regimi. Il risultato non può essere copiato come teorema per la rete dei giornali senza modellare il processo.

**V8 — Dawkins, Li, Xu (ICML 2021), _Diffusion Source Identification on Networks with Statistical Confidence_.**
- Fonte primaria: https://proceedings.mlr.press/v139/dawkins21a.html
- Propone un **confidence set di possibili nodi sorgente** invece di scegliere sempre uno, con una garanzia teorica nell'ambito del modello studiato.
- **H2:** studiare la restituzione di *più antenati compatibili* e un esito non identificabile; per f3tcher la calibrazione dovrebbe essere verificata sul task specifico e non importata dal paper di epidemiologia/diffusione.

**V9 — Feizi et al. (IEEE Transactions on Network Science and Engineering, 2019), _Network Infusion to Infer Information Sources in Networks_.**
- Versione istituzionale MIT: https://dspace.mit.edu/entities/publication/d86ff728-02e6-40c1-9c7c-56b849241087
- Inferenza di una o più origini in grafi con dinamiche parzialmente ignote; risultati attribuiti agli autori, con test anche su notizie Digg. Il modello non è un certificatore di origine editoriale.

**Limite trasversale:** un algoritmo può essere *statisticamente utile* pur sbagliando la catena causale per uno specifico documento. La distinzione «previsione» vs «prova» resta fondamentale.

## D. Quando non assegnare un'origine: selective prediction (V)

**V10 — Geifman & El-Yaniv (NeurIPS 2017), _Selective Classification for Deep Neural Networks_.**
- Fonte primaria: https://papers.neurips.cc/paper_files/paper/2017/hash/4a8423d5e91fda00bb7e46540e2b0cf1-Abstract.html
- Studia un classificatore con *reject option*, che bilancia **risk** e **coverage**: scegliere di non classificare i casi incerti può ridurre gli errori sui casi accettati. Le garanzie dipendono da condizioni di addestramento/calibrazione e dalla definizione di rischio.

**V11 — Geifman & El-Yaniv (ICML 2019), _SelectiveNet_.**
- Fonte: https://proceedings.mlr.press/v97/geifman19a.html
- Integra la decisione di astensione nell'addestramento; esperimenti e risultati dei soli autori. Non adottare modelli o soglie senza benchmark.

**V12 — Angelopoulos et al. (ICLR 2024), _Conformal Risk Control_.**
- Fonte: https://proceedings.iclr.cc/paper_files/paper/2024/hash/f3549ef9b5ff520a7e41ff3cc306ab2b-Abstract-Conference.html
- Studia il controllo del rischio atteso per specifiche funzioni di perdita sotto ipotesi proprie di conformal prediction; non garantisce che ogni previsione individuale sia corretta e non risolve da solo la presenza di una fonte vera **fuori dai candidati**.

**V13 — Zhou et al. (ACM Computing Surveys 2025), _Conformal Prediction: A Data Perspective_.**
- Fonte: https://doi.org/10.1145/3736575
- Sottolinea il ruolo dell'**exchangeability** e le difficoltà con *distribution shift* e serie temporali. È una ragione per non applicare automaticamente garanzie conformal calibrate su un corpus di anni passati ai nuovi siti dell'anno corrente.
- **Non confondere** 1) percentuale di casi per cui il modello emette una genealogia, 2) correttezza condizionata sui casi emessi e 3) frazione di tutti gli antenati realmente osservati. Sono tre denominatori differenti.

**H3 — calibrated source attribution:** separare `source-known`, `candidate-source-present`, `candidate-source-absent` e `source-undecidable` nei test. Misurare in quali casi un sistema *si astiene correttamente*, senza scambiare calibrazione del classificatore per certificazione del Web.

## E. Ground truth: quale dataset serve per quale aspetto?

| Risorsa | Cosa è davvero osservato / annotato | **Non** misura direttamente |
|---|---|---|
| MemeTracker | URL, tempo, frasi, hyperlink, varianti | Copia causale certa e intermediari invisibili |
| NETINF output | Rete di influenze/copie **inferita** da un algoritmo | Ground truth indipendente degli archi |
| METER / COUNTER (doc 12) | Riutilizzo di agenzia vs articolo, anche parziale, in coppie documentali | Ogni sorgente reale di tutta la cascata |
| PAN 2026 (doc 12) | Più sorgenti **note per costruzione** di un testo sintetico generato | Genealogie storiche di giornalismo autentico |
| NewsEdits (doc 12) | Revisioni del singolo articolo | Relazione causale fra editori |
| Testbed sintetico futuro | Produttore originale, copie, co-copie, fonti latenti e timestamp controllati | La distribuzione e la causalità del Web reale |

**Conclusione:** non usare l'output di NETINF o un grafo ricavato da hyperlink come *etichette vere* per validare un algoritmo che usa gli stessi input: sarebbe circolare. Servono controlli separati e test con origine conosciuta per costruzione, più valutazione realistica su dati osservativi senza forzare claim di verità.

## F. Nuove ipotesi comparabili (non testate)

1. **H1 — multi-cascade vs pairwise:** confrontare copia/somiglianza per coppie con inferenza di rete usando molte cascades; misurare sia i vantaggi sia gli errori su fonti comuni nascoste.
2. **H2 — missing upstream:** testbed in cui il vero primo produttore viene deliberatamente escluso dalla collection; il sistema deve poter rispondere *non osservato*, non scegliere obbligatoriamente il primo fra i candidati.
3. **H3 — timestamp distortions:** edit post-pubblicazione, orologi disallineati, indicizzazione asincrona e data retrodatata; misurare false direzioni di copia.
4. **H4 — acyclic/loopy diffusion:** reti con ritorni, co-copie e intermediari; vedere se un grafo semplice forza relazioni inesistenti.
5. **H5 — risk-coverage vs forced origin:** curve di errore sui casi accettati in funzione della frazione di attribuzioni emesse, includendo gruppi rari e fonti piccole.
6. **H6 — temporal calibration shift:** addestramento su anni/lingue/editori passati, test su altri anni/lingue/editori; misurare caduta delle garanzie e casi non stimabili.
7. **H7 — evidence acquisition value:** quando A e B restano compatibili, confrontare una strategia che tenta la prossima acquisizione **consentita** per discriminarle con una che continua a raccogliere pagine solo per ranking di popolarità; misurare il guadagno di informazione e i costi.
8. **H8 — citation vs cause:** link esplicito inserito dopo la pubblicazione, hyperlink a riferimento generico, frase identica in due fonti indipendenti; evitare che sia imposto `A copied B` senza prove.

**Metriche candidate:** false causal attribution, edge direction error, true-source recall quando noto, top-k candidate recall, valid abstention rate, non-identifiable detection, calibration error, selective risk/coverage, edge provenance completeness, evidence value per richiesta e diritti rispettati. **Nessuna soglia, benchmark o algoritmica adottata**.

## G. Nuovo filone da esplorare: active provenance investigation

**H9 — Inquiry-guided acquisition:** il futuro motore potrebbe, in via teorica, usare le sue ipotesi concorrenti sulla provenienza per decidere *quale fonte lecita indagare dopo* (es. indice archivistico, citazione, originale di agenzia, snapshot temporale, registro di versioni), invece di aumentare indistintamente il numero di documenti.

Punti di attenzione: **valore informativo atteso ≠ certezza causale**, fonti rare da tutelare, siti negati da non interrogare, evitare trasformare un falso sospetto in una sequenza interminabile di ricerche, costi extra di LLM e rischio di feedback loop sui propri risultati non verificati.

**Non è una scelta architetturale né affermazione di originalità**: focused crawling, active learning e source inference sono già campi esistenti; l'eventuale vantaggio va misurato con confronti e ablation.

## H. Problemi da ricercare in seguito

- Benchmark di **causal information lineage** con upstream nascosti e copy chains annotate indipendentemente; verificare se esistono corpus reali adatti, invece di assumere che MemeTracker lo sia.
- Applicabilità pratica di *confidence sets* quando il vero originale è **fuori** dalla lista dei candidati.
- Calibrazione sotto *temporal shift*, cambiamento di lingua/editori e distribuzioni MNAR.
- Relazione tra indipendenza delle evidenze (doc 11), *completeness claims* (doc 09), e upstream provenance (doc 12) senza accreditare testimoni come fonti fattuali.
- Protocollo di test su sorgenti controllate con interruzioni, errori HTTP, falsi timestamp, edit e copyright/retention differenziata; tutti **futuri e autorizzati**, non eseguiti ora.

## Chiusura verificabile

La ricerca ha trovato **NETINF** e **MemeTracker** come baseline e materiale osservativo, **diffusion source identification** e **selective prediction** come cornici metodologiche. Non ha trovato (né dimostrato che non esista) un corpus pubblico con gold truth esaustivo delle genealogie causali di ogni articolo, inclusi intermediari non osservati.

**f3tcher non è stato implementato e non è stato testato.** Le fonti sono citate per le loro proprietà verificate sui siti primari; la trasferibilità al Web generale resta una domanda aperta.
