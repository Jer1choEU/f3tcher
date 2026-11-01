# 11 — Indipendenza delle fonti, provenienza e prove crittografiche circoscritte

**Data ricognizione:** 2026-11-01. **Fase:** solo ricerca scientifica/standard, *nessuna implementazione, scelta di stack, benchmark f3tcher o acquisizione di dataset*. Continua [10_INVENTARI_E_GARANZIE.md](10_INVENTARI_E_GARANZIE.md). **V** = consultazione diretta della fonte primaria (non riproduzione dei risultati); **H** = ipotesi di ricerca. Non trasformare i risultati in requisiti definitivi. Restano validi i vincoli legali e di accesso in [04_LEGALITA_E_SICUREZZA.md](04_LEGALITA_E_SICUREZZA.md).

## Risultato principale: «fonte», «osservatore», «testimone» e «prova» sono concetti diversi

La medesima informazione può apparire su dieci URL provenienti da:
- uno **stesso produttore** e nove mirror;
- nove **ripubblicazioni** di una fonte originaria;
- più aggregatori che usano la **stessa API o feed**;
- produttori distinti, ma dipendenti da **una singola testimonianza o statistica**;
- osservazioni realmente autonome ma con errori correlati, conflitti di data e versione.

**Un conteggio di domini/URL/pubblicazioni non misura la quantità di evidenze indipendenti**. Si può ridurre la falsa ridondanza e preservare le fonti senza cancellare i documenti duplicati tecnicamente: la deduplica del contenuto non è la deduplica dell'evidenza e non è la deduplica della relazione di derivazione. Identificare *chi ha copiato chi* non è sempre possibile e va rappresentata anche l'incertezza.

Sono necessari tre livelli concettuali distinti (non componenti software decisi):
1. **Provenienza dichiarata**: chi afferma di aver prodotto/riutilizzato cosa (citazioni, `prov:wasDerivedFrom`, metadati, attributi delle fonti).
2. **Dipendenza inferita**: sospetto di copia, co-copia, dipendenza transitiva sulla base di segnali, con incertezza e verifica; non una sentenza sull'originalità o sulla verità.
3. **Prova crittografica**: autenticità di una firma, integrità di un file, appartenenza a un registro o continuità del registro, *non* conferma della veridicità o completezza dell'universo.

## A. Letteratura primaria sulla dipendenza tra fonti (V)

**V1 — Dong, Berti-Equille, Srivastava (2009), _Truth Discovery and Copying Detection in a Dynamic World_, PVLDB 2**  
Fonte: https://www.vldb.org/pvldb/vol2/vldb09-335.pdf  
Studia dati conflittuali, fonti che copiano altre fonti, staleness e precisione variabile nel tempo; propone un Hidden Markov Model per le dipendenze di copia in un contesto con storico noto e un modello probabilistico per l'aggregazione dei valori. **Non** garantisce di conoscere la genealogia reale senza storico affidabile e non autorizza trasferire indiscriminatamente risultati da dati strutturati a tutte le forme del Web.

**V2 — Berti-Equille, Dong, Hu, Srivastava (2010), _Global Detection of Complex Copying Relationships Between Sources_, PVLDB 3**  
Fonte: https://vldb.org/pvldb/vol3/R120.pdf  
Il caso più interessante è **co-copying e copying transitivo**: una fonte aggrega due altre, o più fonti derivano dallo stesso upstream; un detector a coppie può inferire erroneamente un collegamento diretto. Studia un algoritmo di rilevamento globale e direzione della copia. Verificato l'abstract originale; **nessun algoritmo replicato**.

**V3 — Dong, Berti-Equille, Srivastava, _Data Fusion: Resolving Conflicts from Multiple Sources_**  
Fonte primaria PDF: https://research.google.com/pubs/archive/41657.pdf  
Il lavoro osserva che accordo sullo stesso dato vero è meno diagnostico della copia rispetto a errori improbabili in comune. Ma un copiatore può anche produrre osservazioni originali e verifiche indipendenti; **non è corretto annullare tutti i dati della fonte che copia**. L'accordo *non prova* la dipendenza; un disaccordo *non prova* indipendenza.

**H1 — Triangolazione dependency-aware:** stimare la dipendenza fra *affermazioni/versioni specifiche*, non bollare interi domini come indipendenti o come copioni. Conservarne traccia, incertezza e disaccordi; non sommare probabilità in modo ingenuo né trattare il voto della maggioranza come verità. Esito critico da misurare: *falsa indipendenza* e *falsa attribuzione di copia*.

## B. Standard per tracciare origine e derivazioni (V)

**V4 — W3C PROV-O Recommendation**  
https://www.w3.org/TR/prov-o/  
Definisce Entity, Activity, Agent e relazioni `wasDerivedFrom`, `wasQuotedFrom`, `wasRevisionOf`, `wasAttributedTo`, `used`, `wasGeneratedBy`. Aiuta a distinguere «questo record deriva da quel file» da «questo giornale cita un altro». Rappresenta *affermazioni di provenienza*, non ne certifica la sincerità né la completezza.

**V5 — W3C PROV Constraints**  
https://www.w3.org/TR/prov-constraints/  
Vincoli formali di unicità, ordinamento degli eventi, impossibilità e tipi; validità del grafo ≠ autenticità delle dichiarazioni o completezza degli input. In particolare un grafo coerente di sole fonti secondarie può essere perfettamente valido e non contenere nessuna testimonianza primaria.

**V6 — Cheney, Chiticariu, Tan (2009), _Provenance in Databases: Why, How, and Where_**  
https://research.ibm.com/publications/provenance-in-databases-why-how-and-where  
Distingue *why/how/where provenance* e il relativo uso in debugging, manutenzione viste e tracciamento delle origini. Questa letteratura è rilevante per ricostruire **quali record grezzi hanno contribuito a un campo derivato**.

**V7 — Green, Karvounarakis, Tannen (2007), _Provenance Semirings_, PODS**  
https://web.cs.ucdavis.edu/~green/papers/pods07.pdf  
Formalizza annotazioni che propagano le dipendenze nelle operazioni relazionali. Utile come *lente teorica* per distinguere più cammini di derivazione dello stesso fatto, **non** proposta di imporre semiring a ogni documento web o di decidere già una struttura interna.

**H2 — Evidence lineage vs URL counting:** confrontare sistemi che annotano ogni campo con URL e timestamp contro sistemi che trattengono la derivazione da documento/record/versione/estrattore e le trasformazioni. La **validità formale** non va contata come correttezza fattuale.

## C. Autenticità e freschezza degli inventari: TUF offre un modello rigoroso ma circoscritto (V)

**V8 — The Update Framework (TUF), Roles and metadata**  
https://theupdateframework.org/docs/metadata/ ; specifica https://theupdateframework.github.io/specification/  
Definisce ruoli diversi `root`, `targets`, `snapshot`, `timestamp`: metadati firmati, elenco dei target con hash/dimensioni, versione coerente dei metadati, scadenza per rilevare stati vecchi, controllo dei rollback. Trust delegata e soglie di firma possono limitare rischi da singola chiave compromessa.

**Applicabilità:** potenziale modello di **manifest autentici, completi rispetto alla lista firmata e freschi secondo una policy temporale** quando un publisher espone davvero metadata TUF, o eventualmente in futuro per archivi *pubblicati da f3tcher*. **Non** attribuire queste garanzie ad API che non usano TUF, non dedurre che ogni file che *dovrebbe esistere* sia nei targets, né adottare lo standard oggi. Un publisher che firma un inventario deliberatamente incompleto può emettere un inventario autentico ma incompleto.

**H3 — Authentic but incomplete:** confrontare checksum/manifest senza firme vs manifest verificabili/firmati vs inventari con prove indipendenti. Misurare falsi «completo» per file mancanti *fuori* dall'insieme dichiarato e rollback/expiry, senza usare TUF come prova della verità dei fatti.

## D. Log di trasparenza: testimonianza sulla sequenza, non sul contenuto (V)

**V9 — C2SP, Transparency Log Witness Protocol v1.1.0**  
https://c2sp.org/tlog-witness@v1.1.0  
Witness indipendenti verificano che un nuovo checkpoint sia **consistente** con quello da loro precedentemente convalidato, poi possono co-firmarlo. Questo rende più difficile servire viste incompatibili a client diversi, se il sistema di monitoraggio e la policy di quorum funzionano. **Il testimone non verifica che un documento registrato sia vero, che il publisher sia autorizzato a pubblicarlo, o che non esistano documenti esterni al registro**.

**V10 — C2SP, Transparency Log Trust Policy**  
https://c2sp.org/tlog-policy  
Esplicita policy di quorum e gruppi di testimoni per decidere quali cosignature siano richieste. **Più firme non significano necessariamente più osservazioni originarie del dato**.

**V11 — RFC 9942, _COSE Receipts_, giugno 2026**  
https://www.rfc-editor.org/rfc/rfc9942  
Receipt di strutture di dati verificabili per inclusione, consistenza e, per determinate strutture, **non-inclusione**. Quest'ultima riguarda un oggetto in *una struttura impegnata e un determinato stato*, non un'asserzione che l'oggetto non esista da nessuna parte. Non tutte le strutture forniscono gli stessi tipi di prova.

**V12 — RFC 9943, _An Architecture for Trustworthy and Transparent Digital Supply Chains_, 2026**  
https://www.rfc-editor.org/rfc/rfc9943  
Architettura SCITT: signed statements, transparency services e receipts. La documentazione ricorda esplicitamente che la trasparenza **non impedisce a un emittente disonesto o compromesso di mentire**; ne favorisce l'accountability. Il contesto applicativo primario è la supply chain digitale. Uso generalista per f3tcher **non dimostrato**.

**H4 — Separazione di garanzie:** distinguere **integrità dei byte**, **firma dell'emittente**, **appartenenza al registro**, **append-only continuity**, **assenza all'interno dell'insieme impegnato**, **copertura rispetto a un inventario autorevole** e **correttezza fattuale**. Evitare l'etichetta unica «verificato» o un presunto livello automatico di verità.

## E. Rischi che il numero di fonti nasconde

1. **Echo chamber dei mirror**: 30 siti che riproducono lo stesso dataset diventano erroneamente 30 fonti autonome.
2. **False-original inference**: una fonte che pubblica prima non è necessariamente il primo produttore; timestamp e crawling incompleti possono invertire l'ordine.
3. **False-copy inference**: accordo su dati ampiamente veri (es. numeri di un comunicato pubblico) non è prova di copia diretta fra editori.
4. **Independence changes by claim**: due giornali possono usare lo stesso comunicato per un fatto e verificare separatamente un altro.
5. **Partial provenance**: il grafo può non esplicitare intermediari, API comuni, query identiche, fonti cancellate o versioni modificate.
6. **Signed incomplete manifests**: firme valide su elenchi parziali, o firme di testimoni della consistenza, non validano il denominatore esterno.
7. **Correlated extraction errors**: estrattori differenti possono concordare perché condividono lo stesso OCR/LLM/dataset o perché entrambi perdono un'intera sezione.
8. **Legal scope**: citare una fonte, conservarne contenuti, costruire derivati e redistribuire sono attività con permessi potenzialmente diversi.

## F. Nuove ipotesi di confronto (NON sperimentate)

| Studio proposto | Gold testbed controllato | Falsi successi che devono emergere |
|---|---|---|
| H1: indipendenza delle conferme | 1 produttore, 5 mirror, 3 aggregatori della stessa API, 2 osservatori realmente autonomi | 10 citazioni considerate 10 osservazioni indipendenti |
| H2: dipendenze non semplici | Co-copia, copia transitiva, osservazioni originali mescolate alle copie, versioni divergenti | Traccia di derivazione inventata o falsa fusione dell'intero dominio |
| H3: provenienza a livello di campo | Record derivati da più documenti/versioni/trasformazioni | Una sola URL citata per un valore composto da fonti differenti |
| H4: integrità vs contenuto vero | Publisher firma manifest valido ma omette documenti dell'inventario esterno | «Completezza provata» solo perché firma e hash sono corretti |
| H5: testimoni di trasparenza | Log con due fork serviti a client diversi; witness aggiornati/stale e quorum diversi | Checkpoint non coerenti accettati, o quorum scambiato per conferma dei fatti |
| H6: non-inclusione limitata | Merkle authenticated set di 100 item, 101° item in sorgente esterna | Proof-of-non-inclusion presentata come assenza universale |
| H7: co-errore degli estrattori | Due pipeline con OCR o componenti condivisi, omissione di una pagina | Accordo fra output interpretato come doppia verifica indipendente |

**Metriche candidate (non approvate)**: false independence rate, false copy attribution, provenance trace recall, errori di direzione delle dipendenze, falsi claim di assenza/completezza, detection of equivocation, astensione corretta, costo per evidenza effettivamente distinta. Distinguere *true source independence* definita nel testbed e indipendenza stimata sul Web reale, generalmente non osservabile.

## G. Ipotesi di differenziazione da investigare

**Dependency-aware evidence accounting:** la prossima unità informativa di f3tcher potrebbe essere *un'affermazione con la sua catena di derivazione, versione e provenienza delle verifiche*, non il semplice conteggio delle pagine. Questo consentirebbe in linea teorica di:
- acquisire quanto più possibile mantenendo ogni documento nel proprio contesto, anziché eliminarlo perché duplicato;
- classificare le conferme in base a indipendenza **osservata/dichiarata/inferita/ignota**;
- distinguere provenienza verificabile dalla correttezza del contenuto e dalle eventuali restrizioni;
- trovare disaccordi dove apparentemente dieci mirror davano certezza, oppure scoprire che un documento «diverso» in realtà viene dalla stessa sorgente.

Si tratta di un **filone di ricerca**, non di una decisione architetturale. Occorre anche dimostrare quanto costa e quanto migliora la qualità rispetto a baseline più semplici. Non promettere «verità automatica», «certificazione legale», «completezza universale» o «originalità unica al mondo».

## Nuove domande per la ricognizione successiva

1. In quali condizioni una genealogia di copie è **identificabile** da dati pubblici e quando serve dichiararla ignota?
2. Esistono benchmark pubblici con **grafo di derivazione noto** per separare somiglianza e copia, evitando di allenarsi/valutarsi sugli stessi dati?
3. Come misurare *effective independent coverage* senza assegnare un peso inventato a ogni dominio?
4. Quale relazione tra provenance, versioning e **query-completeness statements** della ricognizione 09 è rigorosa anziché meramente narrativa?
5. Come rappresentare nel registro il fatto che una conferma deriva da *una stessa sorgente originaria*, pur mantenendo traccia di tutte le trasformazioni?
6. Quando conviene verificare firme, freshness, witness checkpoint e quando sarebbe un costo inutile rispetto a una fonte affidabile con API semplice?

**Chiusura:** soltanto bibliografia e ipotesi. Nessun software f3tcher, crawler, esperimento, benchmark, stack, licenza o policy automatizzata approvata.
