# 17 — Brevetti, genomica, audiovisivi e pacchetti di conservazione digitale

**Ricognizione: 2026-11-02. Fase: esclusivamente ricerca.** Nessun crawler f3tcher, codice applicativo, test/benchmark, accesso massivo, account API, stack o architettura approvati. Integra [15](15_ACQUISIZIONE_UNIVERSALE_PROTOCOLLI_E_CRAWLER.md) e [16](16_ACQUISIZIONE_SPECIALISTICA_RICERCA_LEGGI_STATISTICHE_FEDERAZIONE.md). Lo scopo è identificare come scoprire **oggetti digitali formati da più file, rappresentazioni, relazioni e versioni**, rispettando sempre limiti di accesso e diritti.

**Evidenze:** **V** = documentazione primaria di editori, enti o standard esaminata; **H** = ipotesi nostra per studi futuri; **P** = verifica residua. Non attribuire risultati di performance a f3tcher e non dedurre diritti di riuso dalla sola disponibilità tecnica di un URL.

## 1. Risultato: risorsa composta ≠ URL singolo

Una pubblicazione brevettuale include metadati bibliografici, possibili membri di una famiglia, descrizione, rivendicazioni, disegni, versioni e atti di stato giuridico. Un esperimento biologico può includere progetto, campione, run, sequenze, fastq e file associati. Un'opera culturale può avere una landing page, metadati CC0, file audio/video, sottotitoli, immagini e diritti differenti per asset. Un oggetto archivistico può includere file master, derivati, manifest, provenienza e eventi di conservazione.

L'unità di acquisizione non coincide quindi automaticamente con «record trovato», «documento PDF», «HTTP 200» o «file integro». Le capacità da indagare restano **riconoscimento del perimetro dichiarato**, acquisizione dei componenti consentiti, associazione semantica e denuncia delle lacune. Non è una proposta di schema software approvato.

## 2. Brevetti — il canale lecito dipende dal volume e dal tipo di dato

### V1 — European Patent Office, Open Patent Services (OPS)
- Pagina ufficiale: https://www.epo.org/en/searching-for-patents/data/web-services/ops
- OPS offre REST/XML su database bibliografici, legal status, testo integrale e immagini. Richiede registrazione e autenticazione OAuth con client registrato. Il servizio pubblica specifica OpenAPI e schemi XML.
- Condizioni aggiornate: https://www.epo.org/en/service-support/ordering/fair-use ; FAQ https://www.epo.org/en/service-support/faq/searching-patents/open-patent-services/general-information/are-there-any
- EPO dichiara **fino a 4 GB per settimana** nel livello gratuito OPS, soglie operative che variano e una politica di *fair use*; la FAQ richiama 10 ricerche/minuto/IP come regola pratica variabile e una soglia per azioni di famiglia, oltre a ~1 Mbit/s di volume per robot.
- **Limite cruciale:** https://www.epo.org/en/service-support/faq/searching-patents/open-patent-services/general-information/does-ops-permit-bulk precisa che REST bulk retrieval è limitato a **100 documenti** e OPS non è lo strumento per scaricare collezioni di grandi dimensioni. Una ricerca di scala deve considerare i prodotti bulk, licenze e costi, non aggirare la quota dividendo richieste fra IP.

### V2 — European Publication Server (EPS)
- https://www.epo.org/en/searching-for-patents/data/web-services/publication-server
- Pubblicazioni europee con accesso a XML, HTML, TIFF e PDF/A; API REST per date e liste settimanali; frequenza di aggiornamento settimanale.
- **Fair use:** **5 GB per qualunque finestra mobile di sette giorni per IP**; formato diverso dello stesso brevetto non significa brevetto diverso.
- **H:** distinguere *publication number/kind code, famiglia, documento e rappresentazione di file*. Misurare copertura dei componenti e duplicati di rappresentazione senza falsi claims sull'intera famiglia.

### V3 — DOCDB bulk / famiglia semplice
- https://www.epo.org/en/searching-for-patents/data/bulk-data-sets/docdb ; panoramica https://www.epo.org/en/searching-for-patents/data/bulk-data-sets
- DOCDB contiene dati bibliografici, abstract, citazioni e *simple patent family* in XML WIPO ST.36, **non** full text o immagini. Offre frontfile di aggiornamenti e backfile, con condizioni di licenza per il database.
- Distinguere **copertura dei brevetti identificati** da **copertura delle rivendicazioni e figure effettivamente acquisite**.
- **H:** confrontare OPS mirato vs EPS per specifica pubblicazione vs DOCDB per grandi indici; la scelta dipende dal contratto del publisher, dal bisogno informativo e da accesso legittimo, non da un «profilo» selezionato dall'utente.

### V4 — Regole di accesso per esseri umani e robot non sono intercambiabili
- https://www.epo.org/en/service-support/ordering/fair-use
- EPO indica che le GUI di Espacenet e Register sono destinate a utenti umani; per automazione utilizzare REST OPS/EPS, alle condizioni indicate. Mai trasporre tecniche di navigazione browser sulle interfacce destinate all'uso umano per eludere i limiti degli strumenti automatici.

## 3. Archivi genomici — metadati e file sperimentali separati

### V5 — European Nucleotide Archive (ENA)
- Programmatic retrieval: https://ena-docs.readthedocs.io/en/latest/retrieval/programmatic-access.html
- Advanced search: https://ena-docs.readthedocs.io/en/latest/retrieval/programmatic-access/advanced-search.html
- Training ufficiale EMBL-EBI: https://www.ebi.ac.uk/training/online/courses/ena-quick-tour/searching-and-visualising-data-ena/
- ENA usa **Portal API** (ricerca/filter/report) e **Browser API** (record, FASTA/EMBL e retrieval); file raw reads/analisi/assemblaggi vengono serviti anche da repository FTP pubblici, e identificatori collegano categorie sperimentali differenti.
- La Advanced Search documenta un **limite di default 100.000 record** di output e la possibilità di `limit=0` per una ricerca molto ampia; la pagina consiglia di **non eseguire più di 10 ricerche contemporanee** in script. Questa possibilità tecnica *non è* permesso di un prelievo indiscriminato: rispettare fairness, vincoli di privacy/consenso, costi e disponibilità.
- **H:** verificare che un run non venga considerato «completo» se solo i metadati del record sono stati acquisiti ma i file FASTQ/assemblaggi consentiti non sono stati verificati; mantenere gli accession ID e i link fra progetto/campione/esperimento/run.

### V6 — NCBI E-utilities vs NCBI Datasets: quote e modelli di batching diversi
- E-utilities usage https://eutilities.github.io/site/API_Key/usageandkey/ ; NCBI official https://www.ncbi.nlm.nih.gov/books/NBK25497/
- Datasets API keys https://www.ncbi.nlm.nih.gov/datasets/docs/v2/api/api-keys/
- **E-utilities:** limite di norma **3 richieste/s per IP senza key**, **10/s con key**; NCBI consiglia Entrez History / EPost / EFetch batch e spostare i grandi job su orari meno trafficati. **Datasets:** rate default documentato **5 richieste/s**, elevabile a **10/s con API key**.
- Le due quote sono specifiche di servizi diversi e non devono essere confuse né applicate a tutti gli endpoint NCBI. Superarle può causare blocchi/429, non autorizza moltiplicare gli IP per eluderle. I dati possono avere restrizioni distinte, incluse informazioni biomediche non aperte.

### H — gene-centric/experiment-centric acquisition (non adottata)
Una ricerca genetica può individuare in banca dati una sequenza, ma richiedere una catena di artefatti che attraversa record, accessioni, campioni e file di lettura. Confrontare baseline «recupera record XML» con «ricostruisce i riferimenti dei file e le relazioni, ove autorizzato», verificando assenza di file, versioni e checksum e senza presumere disponibilità perpetua o riuso illimitato.

## 4. Patrimonio culturale e audiovisivi — metadati aperti non equivalgono a media aperti

### V7 — Europeana: APIs specializzate e rights distinti
- Pagina ufficiale: https://www.europeana.eu/eu/apis ; FAQ: https://europeana.atlassian.net/wiki/spaces/EF/pages/2360508417 ; Search API https://europeana.atlassian.net/wiki/spaces/EF/pages/2385739812
- Europeana offre Search/Record, IIIF, SPARQL, OAI-PMH, dataset downloads e funzioni per ricerca testuale/annotations con ruoli differenti.
- La FAQ del publisher dichiara **metadata via API CC0** ma per gli oggetti multimediali indicati nei metadata valgono **rights statements individuali**: non scaricare o riutilizzare indiscriminatamente immagini/audio/video perché l'indice metadata è libero. Le API di ricerca richiedono normalmente una API key per l'accesso; https://pro.europeana.eu/page/get-api documenta la registrazione.
- **H:** distinguere conteggio dei record in un portale culturale e conteggio degli **asset ad alta risoluzione realmente accessibili e riutilizzabili**; nei risultati includere eventuali manifest IIIF, miniature, master, annotazioni e diritti distinti, senza associare la licenza CC0 dei metadata agli asset.

### V8 — EBUCore v1.10.1: descrizione audiovisiva e sincronizzazione dei componenti
- EBU Tech 3293 v1.10: https://tech.ebu.ch/publications/tech3293?categoryFilter=presentations
- Schema: https://www.ebu.ch/metadata/schemas/EBUCore/documentation/ebucore.indexListcomp.html
- EBUCore descrive audio/video, durata, formati, codec, diritti, persone, segmenti e timed text, con collegamenti a RDF e altri schemi.
- È una **descrizione tecnica/semantica**, non un crawler né garanzia che il file video/ogni traccia sottotitoli sia disponibile.
- **H:** preservare relazioni *versione del programma → file/codec → audio multilingua → sottotitoli/tracce → segmenti e timecode*. Evitare di appiattire sottotitoli e trascrizioni come semplici blocchi di testo non sincronizzati.

### V9 — W3C WebVTT, stato della standardizzazione al 2026
- Specifica W3C: https://www.w3.org/TR/webvtt1/
- Candidate Recommendation Draft **20 maggio 2026**, non presentarla come Recommendation definitiva. Definisce text tracks con timecode, subtitles/captions, chapters e metadata time-aligned.
- **H:** acquisire, ove leciti, i file video e le tracce WebVTT come risorse **distinte ma collegate**, mantenendo timestamp; se la trascrizione manca, non inferire che l'audio sia privo di parlato.

## 5. Conservazione digitale — «pacchetto valido» non significa «contenuto completo del mondo»

### V10 — METS, Library of Congress
- Overview https://loc.gov/standards/mets/METSOverview.v3_en.html ; schema https://www.loc.gov/standards/mets/docs/mets.v1-7.html
- Il METS associa **metadata descrittivi e amministrativi**, **fileSec/fileGrp** per i file e **structMap** per la struttura logica o fisica. Una `structMap` può puntare a un altro documento METS, a un gruppo di file o a una porzione di file.
- **H:** un singolo XML METS può fare emergere relazioni non visibili nel solo link HTML della landing page; validità dello schema ≠ correttezza/integrità del file, e il documento METS potrebbe essere incompleto.

### V11 — PREMIS 3.0, Library of Congress
- https://www.loc.gov/standards/premis/v3/ ; indice https://www.loc.gov/standards/premis/index.html
- Versione corrente 3.0: **Objects, Events, Rights e Agents** nel modello di conservazione; la cronologia di eventi aiuta a interpretare migrazioni, verifiche di integrità, responsabilità e trattamenti dell'oggetto.
- **H:** distinguere *file del contenuto*, *evento di conservazione*, *metadata del diritto* e *responsabile*, evitando di contare una conversione/migrazione come un nuovo oggetto informativo originario.
- PREMIS registra affermazioni di eventi; non autentica da solo il dichiarante.

### V12 — E-ARK CSIP / SIP / AIP / DIP
- European Commission eArchiving specification hub: https://digital-strategy.ec.europa.eu/en/policies/earchiving-specifications
- **CSIP** descrive i requisiti generali di impacchettamento; **SIP** transfer, **AIP** conservazione, **DIP** accesso/riuso. Le *Content Information Type Specifications* comprendono profili per dati geospaziali, database relazionali e casi eHealth.
- **H:** un DIP pubblico potrebbe essere un sottoinsieme di un AIP archiviato: non dedurre dal contenuto trasferito che tutto il patrimonio conservato sia accessibile, né trasformare l'AIP riservato in un dato pubblico. Distinguere formato, ruolo e diritti per pacchetto.

### V13 — BagIt RFC 8493: completezza e validità sono formalizzate
- https://www.rfc-editor.org/rfc/rfc8493.html (RFC Informational)
- `data/` payload, `manifest-algorithm.txt`, `tagmanifest`, `bag-info` e `fetch.txt` remoto opzionale. **Complete** significa che i componenti previsti dal formato sono presenti e elencati, **valid** che tutti i checksum siano stati verificati.
- La verifica del contenuto è limitata ai **byte dichiarati nel manifest**; non certifica la verità dei dati, la correttezza della licenza o l'assenza di file esclusi dal publisher.
- La sezione **Security Considerations** avverte di path traversal e URL/file path pericolosi in manifest e `fetch.txt`; per eventuali implementazioni future serviranno controlli su path fuori directory, network access/SSRF, decompression bomb, size limits e politiche di URL consentite. Nessun `fetch.txt` di terzi è stato eseguito ora.
- **H:** confronto «scarica zip e segnala successo» vs «enumera manifest, verifica checksum e segnala i bytes mancanti», senza trattare uno zip valido come garanzia di copertura della collezione esterna.

## 6. Confronto fra domini, senza classifiche inventate

| Dominio | Unità informativa | Risorse componenti da scoprire | Controllo possibile | Blind spot |
|---|---|---|---|---|
| EPO brevetti | pubblicazione / famiglia / legal event | XML, abstract, claim, figure TIFF/PDF, famiglia | ID, data, kind, liste settimanali e metadati | DOCDB senza full text, quote REST/bulk |
| ENA genomica | progetto / campione / run / sequenza | metadata, FASTQ, FASTA, assemblaggio | accessioni, link di report, file forniti | file non presenti, restrizioni, budget |
| NCBI | ricerca, oggetto scientifico, pacchetto | E-utilities records vs Datasets assets | ID, batch Entrez, rate per servizio | EUtils ≠ Datasets; contenuti con diritti |
| Europeana | opera culturale / record / digital object | metadata, IIIF, miniature, file master, annotazioni | IIIF manifest, EDM e rights statement | metadata CC0 ≠ media CC0 |
| EBU/WebVTT | programma / rappresentazione / traccia | A/V, sottotitoli, timecodes, segmenti | track IDs, durata, timestamp, format | audio/video senza captions |
| METS/PREMIS | oggetto archivistico / evento | files, map, provenance, rights | reference/manifest e log eventi | manifest source incomplete o scorretto |
| E-ARK | pacchetto SIP/AIP/DIP | data, metadata, struttura, profili | CSIP e profilo CITS | DIP parziale rispetto all'AIP |
| BagIt | bag/edizione firmata o meno | payload, manifest, fetched files | presenza file e checksums | valid ≠ publisher complete ≠ authenticity |

La tabella propone **distinzioni verificabili** e domande di benchmark, non giudizi di superiorità fra sistemi.

## 7. Ipotesi di benchmark futuro — solo testbed autorizzato, nessuna esecuzione

1. **EPO multi-representation:** il brevetto X ha claims HTML/XML, figure TIFF e PDF; il crawler scarica solo PDF e segnala `complete`. Testare *componente mancante* e *falso duplicato*.
2. **Bulk-vs-REST:** baseline su manifest di dati di test con 1.000 pubblicazioni sotto quote simulate, confronto su inventario source dichiarato; **mai** usare per stress-testare le API EPO reali.
3. **ENA experiment chain:** run con metadata e 3 file fastq, uno assente; distinguere metadata success da file success.
4. **NCBI quota:** testbed sintetico con E-utilities 3/s e Datasets 5/s, key 10/s; verificare per-servizio e nessun superamento.
5. **Europeana media rights:** metadata CC0 con un media InC e uno open; impedire che il crawler applichi CC0 ai contenuti protetti.
6. **METS structure:** structMap multilivello e un fileGrp invisibile nei link HTML; misurare *structural recall*.
7. **PREMIS preservation events:** migrazione/nuova versione derivata vs nuovo originale; non moltiplicare unità informativa e non perdere eventi.
8. **BagIt validity:** manifest di 10 file, 1 mancante, 1 hash errato; distinguere `complete`, `valid` e `publisher coverage unknown`.
9. **BagIt malicious fetch:** `fetch.txt` verso rete privata/URL non autorizzata, traversals e archivi espandibili; **nessuna richiesta deve uscire** dal perimetro permesso.
10. **Time-coded audiovisual:** video con 2 lingue sottotitoli, track WebVTT con gap e timestamp diversi; verificare trace e lacune.
11. **E-ARK distribution:** DIP accessibile con sottoinsieme dei file AIP; segnalare `access package acquired` non `preservation corpus complete`.
12. **High-level audit:** il portale dichiara 100 oggetti e 300 asset; distinguere 100 records fetched, 275 assets fetched, 260 verified, 250 parsed: non un solo contatore `success`.

**Metriche candidate:** *record coverage, asset coverage, manifest completeness, hash validation, structural reference recall, timecoded-track recall, legal access policy violations (zero), rate violations (zero), processing cost/GB, missing-file detection, false completeness claims*. Testbeds da progettare successivamente; non dichiarare percentuali reali per il Web.

## 8. Nuove ipotesi promettenti (non una architettura)

- **Compound-object-aware acquisition:** discriminare il perimetro dell'oggetto, enumerare i componenti dichiarati, distinguere file mancanti, componenti non autorizzati, metadata mancanti e manifest incompleti.
- **Representation vs identity:** un brevetto in PDF/XML/TIFF, un'opera culturale in alta e bassa risoluzione o una migrazione PREMIS non sono necessariamente 3 documenti indipendenti; mantenere sia identità logica sia singoli asset.
- **Rights-at-asset granularity:** la licenza del record non determina automaticamente i diritti dei file collegati.
- **Semantic/structural preservation:** una verifica byte-for-byte non basta per assicurare che una sequenza, un segmento sottotitolato o una struttura METS sia stata interpretata senza omissioni.
- **Scale vs publisher policy:** bulk abilitato e licenziato quando necessario, non scorciatoie di scraping delle GUI e non token/quote aggirati.
- **Manifest trust and safety:** metadata utili all'acquisizione possono contenere URL ostili/errati; essere pubblici non significa che sia sicuro eseguirli.

Nessuna delle idee implica profili selezionabili o una gerarchia di motori obbligatoria. È sempre **un unico sistema automatico**, e stiamo solo esplorando le sue capacità potenziali.

## 9. Prossimi filoni aperti

- Brevetti internazionali e WIPO ST.26 per **sequence listings**, proteggendo differenze di licenza e versione del documento.
- Verificare in modo non invasivo l'**adozione reale** di METS, PREMIS, E-ARK, BagIt, Europeana, ENA per un campione di pubblicazioni/portali autorizzati, prima di decidere quali adattatori meritino investimento.
- Confronto trasversale delle ricognizioni 01–17 per **identificare duplicati di capacità**, condizioni di scelta automatiche, lacune residue e costi operativi, senza definire ancora lo stack.
- Test su formati/tipi composti che possono portare ad acquisizione parziale silenziosa: IIIF, WARC/WACZ, media sottotitolati, documenti scientifici supplementari e pacchetti archivistici.
- Security del parser/manifest: traversal, decompression bombs, risoluzione URL su IP privati e media types ingannevoli. Non eseguire mai URL contenuti in manifest di terzi prima di una verifica di policy.

**Stato di chiusura:** fonti primarie raccolte e limiti esplicitati; nessuna prova/benchmark fatta da f3tcher, nessun codice, nessuna architettura o stack definiti.
