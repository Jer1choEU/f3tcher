# 12 — Genealogie informative: gold standard, confondenti, astensione e licenze

**Data ricognizione:** 2026-11-01. **Fase:** esclusivamente ricerca documentale, senza test/benchmark, raccolta di corpora, codice, architettura o stack approvati. Continua [11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md](11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md). **V** = fonte primaria verificata direttamente su pagina di editore/autore/organizzatore; **I** = inferenza metodologica nostra da sottoporre a verifica, **P** = punto da accertare. I risultati degli autori non sono prestazioni di f3tcher.

## 1. Esito principale

**Somiglianza testuale ≠ derivazione; citazione ≠ prova fattuale; derivazione ≠ verità; pubblicazione anticipata ≠ autore originario.** Una genealogia web completa può essere *non identificabile* quando i produttori originali non pubblicano metadati, passaggi intermedi non sono conservati, esistono fonti comuni sconosciute o più autori osservano indipendentemente lo stesso evento. Questi limiti non dipendono solo dalla bravura del classificatore.

Le evidenze possibili devono essere tenute concettualmente distinte:
- **Riutilizzo osservabile**: testo uguale, sequenze di errori/varianti improbabili, citazioni, corrispondenza di passaggi. Indizio, non causalità certa.
- **Derivazione dichiarata**: fonte esplicita, agency credit, `wasDerivedFrom`, metadata del produttore. Può essere falsa o incompleta.
- **Versione dello stesso oggetto**: revision history di articolo/documento, con tempi e azioni d'editing. Non dimostra chi ha appreso un fatto per primo.
- **Genealogia di una specifica affermazione**: uno stesso articolo può includere fatti copiati e altri indipendenti; le etichette a documento intero possono sovrasemplificare.
- **Supporto dell'affermazione**: il documento recuperato contiene davvero l'evidenza necessaria o condivide soltanto il tema?
- **Diritti della derivazione**: condizioni di utilizzo/retention per ogni dataset e singola fonte originaria, non solo quelle del mirror.

L'uscita «**origine ignota / non dimostrabile**» è una proprietà da studiare e misurare, non un difetto da mascherare con confidenza numerica arbitraria.

## 2. Corpus reali di riutilizzo giornalistico (V)

### V1 — METER: press agency vs quotidiani (2002)

- Studio: Paul Clough, Robert Gaizauskas, Scott Piao, Yorick Wilks, _METER: MEasuring TExt Reuse_, ACL 2002. https://doi.org/10.3115/1073083.1073110
- Descrizione/annotazione del corpus: https://eprints.whiterose.ac.uk/id/eprint/78663/
- Corpus costruito con notizie della UK Press Association e articoli dei quotidiani sugli stessi eventi; annotazione del grado di dipendenza/riutilizzo, inclusi articoli redatti autonomamente. Il paper riporta una F1 media **0,664** nella classificazione a tre livelli per il loro modello/esperimento, non trasferibile automaticamente a f3tcher.
- **Limite:** ha un contesto giornalistico e una sorgente agenzia nota, non un grafo totale delle dipendenze fra tutti gli editori. **P:** verificare disponibilità e diritti del corpus METER vero e proprio prima di proporne l'uso; il paper liberamente leggibile non equivale a permesso di riutilizzare gli articoli.

### V2 — COUNTER: coppie agency/newspaper con annotazioni umane (2016–2017)

- Fonte primaria dataset e licenza: https://ucrel.lancs.ac.uk/textreuse/counter.php ; record editoriale https://research.lancaster-university.uk/en/datasets/corpus-of-urdu-news-text-reuse-counter/ ; studio https://doi.org/10.1007/s10579-016-9367-2 .
- 600 coppie di documenti sorgente–derivato (1.200 documenti) di notizie in urdu; etichette **Wholly Derived** (135), **Partially Derived** (288), **Non Derived** (177). Annotazioni a **livello documento**; non rappresentano necessariamente un grafo completo di copie e co-copie.
- Corpus dichiarato **CC BY-NC-SA 4.0** e il sito degli autori specifica **uso di materiale giornalistico ristretto a ricerca e/o attività accademiche**. Non attribuire all'intero corpus diritti generici per servizio commerciale o redistribuzione: verificare il caso d'uso specifico prima di scaricare/importare.

### V3 — USTRC: casi difficili di testi brevi (2018)

- Fonte primaria https://ucrel.lancs.ac.uk/textreuse/ustrc.php .
- 2.684 coppie brevi di testo in urdu, 496 verbatim, 1.329 parafrasi, 859 scritte indipendentemente, con licenza **CC BY-NC-SA 4.0** pubblicata dagli autori.
- **Limite:** riguarda riuso di testi brevi e non la derivazione di notizie complete o la direzionalità della copia. Utile come test complementare alle coppie lunghe.

### V4 — PAN-PC-11: casi artificiali/simulati con fonte nota

- Fonte ufficiale del corpus https://zenodo.org/records/3250095 ; catalogo organizzatore https://webis.de/data/pan-pc-11.html .
- Ground truth dei passaggi di plagio automatico e simulato; utile per valutare *text reuse retrieval/alignment* e falsi negativi su riscritture. Gli stessi autori indicano l'uso **gratuito per finalità di ricerca**.
- **Limite:** costruzione artificiale/simulata; il possesso della vera coppia originaria nel testbed non significa che su Internet si possano identificare tutti gli intermediari.

## 3. PAN 2025 / PAN 2026: due benchmark diversi e rilevanti (V)

### V5 — PAN @ CLEF 2025: localizzazione di passaggi con parafrasi generativa

- https://pan.webis.de/clef25/pan25-web/generated-plagiarism-detection.html
- Date due risorse, localizzare intervalli di testo riutilizzato anche dopo parafrasi LLM; esistono controlli negativi con parafrasi non derivate, e annotation spans.
- **Licenze:** dati protetti dal diritto d'autore, **solo ricerca**, **vietata la redistribuzione**; accesso secondo le procedure organizzative.
- **Limite:** la fonte candidata è già nel *pair*; non risolve la scoperta globale delle sorgenti.

### V6 — PAN @ CLEF 2026: recupero di più sorgenti da un documento generato

- https://pan.webis.de/clef26/pan26-web/generated-plagiarism-detection.html
- Sorgente primaria dell'organizzatore: documento di interrogazione **generato automaticamente** sulla base di **almeno due** fonti nel corpus; recuperare le fonti fra i candidati. Metriche ufficiali **Recall@10, Recall@100 e nDCG@10**; baselines pubblicate.
- Questo è più vicino al problema di *multi-source retrieval* di f3tcher di un test pairwise. **Non** è prova di aver ricostruito la genealogia di pubblicazioni reali. Il dataset è copyright-protected, **research only, no redistribution**, con accesso via TIRA / ir_datasets secondo il regolamento.
- **I:** studiare anche omissioni quando esistono 2+ upstream e un solo ranking recupera la più ovvia; penalizzare falsi collegamenti a testi sullo stesso tema.

## 4. NewsEdits: la stessa fonte evolve, ma non diventa indipendente (V)

### V7 — NewsEdits, NAACL 2022

- Paper https://aclanthology.org/2022.naacl-main.10/ ; repository autori https://github.com/isi-nlp/NewsEdits .
- Gli autori descrivono 1,2 milioni di articoli con 4,6 milioni di versioni, da oltre 22 fonti giornalistiche; azioni *addition/deletion/edit/refactor*. Permette di studiare **version lineage** e rischio di equiparare un articolo aggiornato a una fonte fattuale indipendente.
- **Limite:** la storia di revisioni *dentro* un articolo non è un'etichettatura completa di trasferimento *fra* editori; alcune versioni possono contenere nuovi fatti e altre mere correzioni. L'accesso al codice/dataset di ricerca non chiarisce automaticamente i diritti di tutti i testi: paper cita NewsSniffer/DiffEngine e relative licenze e autorizzazioni; verificare prima di importare.

## 5. Hard negatives: somiglianza e supporto delle evidenze non coincidono (V)

### V8 — DataDignity / FakeWiki (preprint 2026)

- Scheda primaria Microsoft Research https://www.microsoft.com/en-us/research/publication/datadignity-training-data-attribution-for-large-language-models/ ; preprint https://arxiv.org/abs/2605.05687 .
- Dataset sperimentale dichiarato dagli autori: **3.537 articoli fittizi** e controlli negativi *anti-documents* **tematicamente simili ma privi dei fatti indispensabili**. Tema studiato: attribuzione della conoscenza presente nelle risposte di LLM, non catena giornalistica di ripubblicazione.
- **I:** mutuare il metodo degli *hard negatives*: stessa notizia, luoghi/nomi in comune, ma evidenza pertinente mancante; misurare se una strategia attribuisce derivazioni soltanto perché il tema coincide. I risultati quantitativi degli autori non sono benchmark f3tcher e il paper è una **preprint**.

### V9 — MAVIS (AAAI 2026)

- https://ojs.aaai.org/index.php/AAAI/article/view/40585
- Benchmark di attribuzione in risposte visuali con riferimenti a documenti multimodali; gli autori studiano groundedness/informativeness/fluency. È utile per ampliare la domanda *il supporto citato sostiene davvero l'affermazione?* in presenza di immagini.
- **Limite:** non costruisce genealogie di copia tra siti web, non è un test di crawler.

## 6. Dipendenze e diritti dei dataset: guardare oltre l'etichetta del mirror (V)

### V10 — Longpre et al., Nature Machine Intelligence 2024

- https://www.nature.com/articles/s42256-024-00878-8
- Audit scientifico su **1.858 dataset testuali** e 44 collezioni; ricerca della provenienza di testi, produttori, licenze ed usi. Gli autori documentano diffuse omissioni e incongruenze delle etichette di licenza (dati/percentuali delle loro osservazioni, **non** valori universali).
- **I:** per f3tcher, la catena di derivazione può cambiare anche **quali permessi** siano utilizzabili: il mirror può attribuire licenza più permissiva dell'originaria, oppure mescolare dati con vincoli diversi.
- Non usare un dataset perché accessibile su GitHub/Hugging Face senza verificare titolarità e condizioni. Non derivare obblighi legali specifici dalla sola statistica.

### V11 — W3C PROV-O: derivazioni qualificate

- https://www.w3.org/TR/prov-o/
- Esistono `prov:qualifiedDerivation`, `prov:qualifiedAttribution`, `prov:hadPrimarySource` per descrivere informazioni sulle influenze fra entità; sono un **modello di rappresentazione**, non un algoritmo che scopre con certezza chi abbia copiato chi. Non impegnarsi oggi su RDF né su uno schema specifico.

## 7. Una distinzione scientifica ulteriore: osservazione vs identificabilità (I)

Nel caso di due articoli A e B sullo stesso evento, osservare:
- somiglianza di parole e ordine;
- citazioni identiche;
- timestamp pubblicati;
- URL di agenzia;
- edit successivi;

**non basta da solo** a distinguere con certezza almeno tre storie compatibili:
1. A ha copiato B;
2. B ha copiato A;
3. entrambi dipendono da una terza sorgente C, non osservata.

Se C non appare nelle osservazioni e il contesto non fornisce metadati di produzione verificati, l'algoritmo può classificare *ipotesi*, ma **non inventare una genealogia certificata**. I modelli storici di copying detection citati in [11](11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md) sono un punto di partenza, non una dimostrazione di identificabilità universale.

**H1 — Causal abstention:** valutare la capacità di indicare `derivazione documentata`, `derivazione probabile`, `stessa fonte comune possibile`, `indipendenza non stabilita`, `sconosciuto` come *esiti epistemici*, non profili dell'utente o una tassonomia già approvata. Non assegnare punteggi di probabilità se non calibrati sul testbed.

## 8. Confronti scientifici da definire, NON eseguiti

| Ipotesi | Gold testbed controllato | Controllo di falsificazione |
|---|---|---|
| H1 — copia vs stessa notizia | 2 giornalisti indipendenti stesso evento, 2 copie, 1 agenzia comune | Falsi collegamenti copia su testi con fatti comuni |
| H2 — copia multiorigine | Testi che combinano 2–4 fonti, con un upstream non incluso fra i candidati | Origine inventata, recall multi-sorgente basso |
| H3 — direzione ignota | A e B simili, C non osservata, timestamp simulati distorti | Direzione dichiarata come certa senza supporto |
| H4 — contenuti parzialmente autonomi | Frasi copiate e osservazioni nuove nello stesso articolo | Fusione totale o cancellazione delle nuove parti |
| H5 — parafrasi forte/lingue | METER/COUNTER/USTRC/PAN dove applicabile e con diritti validi | Precisione bassa su parafrasi e frasi indipendenti |
| H6 — cambiamento nel tempo | Più versioni dello stesso articolo, aggiunte/correzioni, citazioni che arrivano dopo | Trattare ogni versione come conferma indipendente |
| H7 — supporto contro somiglianza | Anti-documents in stile FakeWiki, numeri/date simili ma fatto decisivo assente | Citazione di un documento che non supporta l'affermazione |
| H8 — metadata/rights lineage | Origine con licenza restrittiva, mirror che dichiara CC permissiva | Conclusione `allow` da licenza non autorizzata del mirror |
| H9 — astensione | Coppie indistinguibili nella vista dei documenti disponibili | Overclaim di genealogia con ground truth nascosto |

**Metriche non approvate:** retrieval Recall@k/nDCG (PAN 2026), span-level precision/recall (PAN 2025), accuratezza di coppia a tre classi (METER/COUNTER), errori di orientamento delle dipendenze, *false independence*, *false copy*, claim-level grounding, giustificata astensione e costi. **Non aggregare** benchmark differenti in un unico ranking. Riportare intervalli e risultati per sottogruppi/lingue/epoche; distinguere corpus reali, simulati e sintetici.

**Senza test ancora:** licenza METER corpus da verificare; diritti dei testi di NewsEdits e accesso PAN; limiti dello storico e dei contenuti di origine. Anche un dataset scaricabile può richiedere review legale e vincoli di conservazione.

## 9. Direzione nuova da esplorare (non decisione)

**Dependency-aware acquisition con astensione esplicita**: un unico motore che ricerca molte risorse, conserva versioni e derivazioni e *evita di scambiare la somiglianza con evidenza indipendente*. La richiesta di innovazione dell'utente non implica inventare ogni tecnica: il salto di qualità potrebbe stare nella combinazione verificabile di:
- retrieval multi-sorgente non solo coppie;
- derivazioni di singole affermazioni, inclusi contributi nuovi in articoli parzialmente derivati;
- controllo cronologico delle revisioni e delle citazioni;
- attribuzioni sostenute da passaggi concreti invece che soltanto da similarità;
- gestione di origini non osservate e astensione;
- genealogia delle licenze e permessi lungo la catena, senza elusioni.

**Non dimostrato:** che la combinazione superi i sistemi esistenti o generalizzi oltre i domini/lingue dei dataset. Non progettare stack né scrivere codice prima di una decisione dell'utente.

## 10. Nuove piste aperte

1. Esistono corpus di *intermediari e copying transitivo* con **grafo completo noto**? Nessuno dei corpus sopra è stato verificato come benchmark esaustivo di questo problema; va distinta l'assenza di evidenza dalla non esistenza.
2. Studio di *causal identifiability* con sorgenti mancanti e errori di timestamp: che cosa può essere concluso da dati osservativi?
3. Ground truth per *claim-level* mixed originality: quale annotazione costa e quali bias introduce?
4. Rilevanza del benchmark PAN 2026 per *news*, documenti istituzionali, forum, PDF e multimedia: trasferimento da documenti scientifici generati non è garantito.
5. Audit delle licenze del corpus, delle dipendenze e dei derivati, prima di qualunque uso sperimentale.
6. Confronto fra abstention e forced-label: misurare specificamente **quanto spesso dichiarare «sconosciuto» evita una falsa prova**.

**Stato finale:** repository di ricerca soltanto. Nessuna libreria adottata, nessuna acquisizione o benchmark f3tcher eseguito, nessuna architettura approvata. Riferimenti confermati sui siti primari degli autori/organizzatori; i limiti sopra sono espliciti e non vanno rimossi nelle prossime chat.
