# 14 — Active Provenance Investigation: utilità della prossima prova e rischio di auto-conferma

**Data:** 2026-11-01. **Fase:** ricerca documentale; nessun codice, infrastruttura, benchmark o politica operativa approvata. Continua [13_DIFFUSIONE_IDENTIFICABILITA_E_ASTENSIONE.md](13_DIFFUSIONE_IDENTIFICABILITA_E_ASTENSIONE.md). Le fonti di seguito sono **V = controllate direttamente su editori/proceedings/siti primari**; le conclusioni di progettazione sono **H = ipotesi non validate**. Le prestazioni appartengono ai rispettivi studi. Accessi, diritti, robots, privacy e sicurezza rimangono quelli in [04_LEGALITA_E_SICUREZZA.md](04_LEGALITA_E_SICUREZZA.md).

## 1. Risultato: «scegliere la prossima prova» non è una novità assoluta

Esistono già ricerche e implementazioni che integrano acquisizione iterativa, scelta guidata dall'informazione e decisione di fermarsi. Il possibile valore distintivo per f3tcher *non è* inventare una nuova etichetta per agentic search, ma verificare se un unico sistema possa combinare **discovery lecita**, **evidenze indipendenti**, **ipotesi di provenienza**, **copertura delle fonti rare**, **dichiarazioni circoscritte di completezza**, **astensione**, **verifica degli errori di modello** e **costo** meglio di baseline pertinenti.

### V1 — FIRE: ricerca e verifica iterativa, incluso STOP

- Xie et al. (Findings NAACL 2025), *FIRE: Fact-checking with Iterative Retrieval and Verification*: https://aclanthology.org/2025.findings-naacl.158/
- Codice degli autori indicato nella versione arXiv: https://github.com/mbzuai-nlp/fire ; paper: https://arxiv.org/abs/2411.00784
- FIRE spezza in claim, combina retrieval e verifica, sceglie se concludere oppure generare una query ulteriore in base alla fiducia corrente. Gli autori riportano **7,6 volte meno costi LLM** e **16,5 volte meno costi di ricerca** medi nel loro confronto, con miglioramenti modesti nella prestazione: numeri **non verificati indipendentemente e non riferiti a f3tcher**.
- **Differenza da testare:** FIRE mira alla verifica di affermazioni; non prova la ricostruzione di tutti gli antenati informativi, la completezza di un corpus, la legalità della raccolta o la copertura di canali non-web.

### V2 — Chen et al.: verifica di claim complessi con evidenze temporalmente disponibili

- *Complex Claim Verification with Evidence Retrieved in the Wild*, NAACL 2024: https://aclanthology.org/2024.naacl-long.196/
- Richiede decomposizione, retrieval web, evidence a grana fine, sintesi e giudizio. Impone al retriever di considerare **solo documenti disponibili prima dell'affermazione**, per limitare la leakage del futuro.
- **Limite:** il tempo di pubblicazione è di solito una stima; se una fonte viene modificata o retrodatata non è necessariamente riproducibile ciò che un osservatore poteva realmente leggere allora.

### V3 — AVeriTeC come corpus di evidenze in conflitto e insufficienza

- Dati ufficiali: https://fever.ai/dataset/averitec.html ; pubblicazione NeurIPS 2023: https://papers.neurips.cc/paper_files/paper/2023/hash/cd86a30526cd1aff61d6f89f107634e4-Abstract-Datasets_and_Benchmarks.html
- **4.568 claim** di 50 organizzazioni di fact-checking, con domande/risposte, evidenze e giustificazioni. Quattro esiti: Supported, Refuted, Not Enough Evidence, Conflicting Evidence/Cherry-picking.
- **Limite:** misura qualità di supporto/verdetto su claim, **non** genealogia completa degli editori o numero effettivo di fonti indipendenti. Dataset e testi sorgente richiedono controllo delle licenze prima di usarli; la pagina cita una licenza ma ciò non garantisce i diritti di ogni pagina web collegata.

## 2. Valore atteso dell'informazione: cornice scientifica, non score fissato

### V4 — Aronsson, Rahbar, Chehreghani, *A Survey on Active Feature Acquisition Strategies* (IJCAI 2026)
- https://ijcai.org/proceedings/2026/860
- Un sistema può acquisire sequenzialmente segnali pagando un costo, stimare l'informazione condizionale e scegliere **STOP**; la survey organizza le famiglie in decision tree cost-aware, model-based, model-free e ibride, con lettura come POMDP.
- **Distinzione chiave:** politica *myopic* esamina solo la prossima mossa; alcune osservazioni sono poco informative isolatamente ma **decisive congiuntamente**. La survey nota che i metodi più costosi/non-myopic non sono sempre superiori su dataset ordinari. Non assume che le «feature» della survey siano fonti web interscambiabili: costi, permessi, ritardi e dipendenze differiscono.

### V5 — Golovin e Krause, *Adaptive Submodularity* (JAIR 2011)
- https://ocs.aaai.org/Library/JAIR/Vol42/jair42-012.php
- Le garanzie di approssimazione delle politiche greedy esistono **quando** l'obiettivo soddisfa la proprietà di adaptive submodularity e altre ipotesi del teorema; relazioni tra fonti, feedback loops e prove combinate possono violarle.
- **H:** dimostrare o confutare quelle proprietà per un testbed controllato invece di chiamare «ottima» una frontier greedy senza evidenza.

### V6 — Sloman, Cavagnaro, Broomell (Behavior Research Methods 2024)
- *Knowing what to know: Implications of the choice of prior distribution on the behavior of adaptive design optimization*: https://link.springer.com/article/10.3758/s13428-024-02410-7
- Mostra un rischio importante: massimizzare expected information gain con un **prior scorretto** può rinforzare la scelta del modello sbagliato. La riduzione dell'incertezza intorno a un insieme **errato** di ipotesi non misura il recupero della verità.
- **H — model-challenge acquisition:** introdurre nei test vie di falsificazione dell'ipotesi favorita, ricerche per upstream sconosciuto e hard negatives. Non sostituire EIG con un nuovo score complessivo non validato.

### V7 — Goal-oriented Bayesian optimal experimental design
- Zhong et al., SIAM/ASA Journal on Uncertainty Quantification, https://doi.org/10.1137/24M1649344
- Distinzione metodologica: l'informazione utile può riguardare una **quantità d'interesse** (ad esempio correttezza dell'orientamento di una derivazione), anziché massimizzare solo la conoscenza dei parametri del modello. È un collegamento teorico, **non un algoritmo web**.

## 3. Feedback loop e garanzie statistiche: «il modello sceglie cosa osservare»

### V8 — Prinster et al., *Conformal Validity Guarantees Exist for Any Data Distribution (and How to Find Them)* (ICML 2024)
- https://proceedings.mlr.press/v235/prinster24a.html
- I dati acquisiti da una politica adattiva non seguono automaticamente l'ipotesi di exchangeability; il lavoro studia procedimenti che recuperano garanzie anche con specifici *agent-induced covariate shifts*. La soluzione completamente generale è dichiarata **computazionalmente impraticabile**: non promettere calibrazione valida sotto ogni distribuzione con un wrapper pronto all'uso.

### V9 — Gibbs e Candès, *Conformal Inference for Online Prediction with Arbitrary Distribution Shifts* (JMLR 2024)
- https://jmlr.org/beta/papers/v25/22-1218.html
- Procedimenti che adattano la calibrazione nel tempo rispetto a shift, con nozioni di regret locale definite dal paper. Non prova che le origini attribuite da f3tcher siano corrette in ogni caso: va definita la variabile da predire e il regime di osservazione delle etichette.

### V10 — Madhow, Qiao, Yin, Wang, *Rates for Offline Reinforcement Learning with Adaptively Collected Data* (L4DC 2025)
- https://proceedings.mlr.press/v283/madhow25a.html
- La valutazione offline su dati raccolti adattivamente non coincide con un dataset IID fisso; il lavoro studia condizioni e stimatori per MDP tabulari, e nei test la raccolta adattiva modifica anche il **segno** dell'errore.
- **H — policy-evaluation honesty:** confrontare due strategie solo dopo aver identificato quali outcome delle azioni alternative sono osservabili; registrare la politica che ha scelto le URL e gli eventuali meccanismi di campionamento. Non fare replay di una nuova politica dai soli successi della vecchia come se si conoscesse il controfattuale.

### V11 — Cief, Kveton, Kompan (AAAI 2025), *Cross-Validated Off-Policy Evaluation*
- https://ojs.aaai.org/index.php/AAAI/article/view/33765
- Studia scelta degli stimatori e tuning OPE con cross-validation; applicabilità a f3tcher solo dopo modellazione corretta degli outcome, spazio di azioni e condizioni di sovrapposizione fra politiche.

## 4. Perché le cinque parole chiave non sono sinonimi

- **Rilevanza:** il contenuto sembra rispondere alla domanda o riguardare il medesimo fatto.
- **Novità:** apporta documenti/record/campi non osservati prima; una pagina nuova può copiare le stesse prove.
- **Indipendenza:** evidenza derivata da un'origine realmente distinta, spesso non dimostrabile.
- **Disambiguazione:** aiuta a escludere una fra più ipotesi sull'origine; informativa anche se non aggiunge un documento completo.
- **Completezza:** riguarda un perimetro e un denominatore specifico, non si deduce da un verdetto sicuro su un claim.

Un candidato può essere molto rilevante ma ridondante; un archivio raro può essere poco simile al documento corrente ma contenere l'elemento che cambia la genealogia. **Massimizzare un solo numero** rischia di trascurare gli altri criteri.

## 5. Ipotesi falsificabili (nessuna prova eseguita)

| H | Domanda | Scenario di testbed controllato | Errore da rilevare |
|---|---|---|---|
| H1 | Iterazione rispetto a retrieval fisso | Nuovi fatti emergono solo dopo seconda/terza query; confronto FIRE-style vs k fisso | Alti costi o falsi STOP prematuri |
| H2 | Valore della prossima prova vs volume | Fonte di archivio che distingue due genealogie, 10 mirror che confermano solo una | Più pagine ma meno attribuzioni corrette |
| H3 | Ipotesi mancanti / prior avverso | Sorgente C reale nascosta; A e B simili; modello privilegia A→B | EIG che auto-conferma genealogia errata |
| H4 | Sinergie di due acquisizioni | Una query trova timestamp, una trova vecchia versione; solo insieme discriminano | Greedy myopic scarta entrambe |
| H5 | Indipendenza di canali | Due motori usano lo stesso feed upstream, uno è davvero autonomo | Ripetizione dello stesso errore come corrobora |
| H6 | STOP e astensione | Origine non osservata, nessun canale lecito ulteriore o budget esaurito | «Fonte originale identificata» senza prova |
| H7 | Policy evaluation | Log di una politica con selezione non casuale, confronto policy alternative | Falso miglioramento da selezione delle sole query di successo |
| H8 | Shift e calibrazione | Anni/lingue/host nuovi dopo training, fonti rare nei sottogruppi | Safety claim rimane invariato nonostante drift |
| H9 | Evidenza temporalmente valida | Articolo alterato dopo il claim, screenshot tardivo, archive snapshot pre-claim | Retrodatazione che crea causalità inesistente |
| H10 | Costo e tutela delle fonti rare | Sorgenti centrali numerose e 1 rara con unica prova | Ottimizzazione media elimina sistematicamente le fonti periferiche |

**Baseline teoriche (da valutare senza implementazione):** FIFO, random entro accessi consentiti, priorità di novità URL, similarità del claim, diversità/host sampling, k fisso, FIRE-style search/stop, EIG one-step, piccola lookahead, strategie che testano ipotesi alternative. Non è detto che ogni baseline sia sensata per tutte le sorgenti o che sia disponibile codice/licenza compatibile.

**Metriche candidate:** *correct origin / attribution recall*, false causal attribution, valid abstention, cost per correctly disambiguated source, independent evidence gain, value per request, rare-source recall, reliability diagrams sotto shift, policy off-support fraction, gap tra coverage nota e stimata, *false stop rate*, legal/policy violations target zero. Non mescolare l'efficacia sul fact-checking AVeriTeC con causal lineage real-world o copertura del corpus.

## 6. Risultati e limiti dei benchmark esistenti

**AVeriTeC** (NeurIPS 2023): 4.568 claim e QA/evidence web, inclusi insufficienti e conflittuali; utile per confrontare *se le prove supportano una risposta* (fonte https://fever.ai/dataset/averitec.html), **non** fornisce automaticamente una genealogia editoriale completa o controfattuali relativi a query non effettuate.

**FIRE** è l'esistente più direttamente pertinente come recupero+decisione sequenziale e va usato come benchmark concettuale, non ignorato per rivendicare novità. Le comparazioni devono esplicitare versioni, costi reali e funzioni/permessi applicabili al task. Anche la licenza di paper, repo, dataset e pagine web collegate sono diverse e vanno verificate prima di qualunque riproduzione.

## 7. Possibile nuovo avanzamento teorico, non nuova architettura

**Falsification-aware active acquisition** (etichetta di ricerca, **non rivendicazione di originalità**): esaminare politiche che non perseguano soltanto la riduzione dell'incertezza tra ipotesi già note, ma riservino capacità di raccogliere evidenze che potrebbero **smentirle**, trovare sorgenti invisibili e rilevare lacune di copertura.

Possibile esito utile da misurare: una procedura che, davanti a due ipotesi e nessuna verifica indipendente, dica *«non identificabile con le evidenze lecite disponibili»* invece di continuare a raccogliere copie dello stesso comunicato o proclamare una falsa origine.

**Non decisi:** funzioni obiettivo, pesi, algoritmi, stack, agenti, strumenti, deployment, costi accettati, soglie, policy automatiche, tipologia di interfaccia. I limiti legali restano stop sui percorsi negati, nessuna elusione di 403, CAPTCHA, paywall, rate limit o riserve d'uso.

## 8. Prossime piste di ricerca, non roadmap di sviluppo

1. Disegni sperimentali in cui fonti A/B possono condividere un upstream C non osservato: quando un'acquisizione futura cambia davvero l'identificabilità?
2. Decisioni non miopi con **informazioni complementari** (metadata + archive + link), confrontate con greedy; misurare complessità e overhead.
3. Come registrare/valutare controfattuali e confini *off-support* senza chiedere accessi impropri a sorgenti pubbliche.
4. Evidenze confutanti vs corroboranti: metodi per impedire auto-rinforzo dei modelli di probabilità.
5. Se in presenza di fonti scarse o rare un obiettivo multicriterio può essere stimato e validato senza pesi arbitrari.
6. Benchmark che puniscano esplicitamente il **falso arresto** e la **certezza non giustificata**, non solo il numero di record raccolti.

**Chiusura:** nuove fonti primarie verificate e nuove ipotesi. Nessun sistema f3tcher implementato o benchmark eseguito; originalità e superiorità restano da dimostrare.
