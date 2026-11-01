# 10 — Inventari verificabili, continuità storica e limiti delle prove

**Ricognizione:** 2026-11-01. **Stato:** ricerca e confronto documentale, non sviluppo. Integra [09_COMPLETEZZA_LOCALE_E_PROVE.md](09_COMPLETEZZA_LOCALE_E_PROVE.md); nessuna architettura, libreria, benchmark di f3tcher, dataset scaricato o deployment deciso. **V-doc**: documentazione primaria consultata; **P**: pista ulteriore; **H**: ipotesi nostra, non fatto. La verifica di una pagina ufficiale non equivale a collaudo dei suoi endpoint. Fonte pubblicata ≠ autorizzazione generalizzata ad acquisire/copiare/redistribuire: applicano le policy di [04_LEGALITA_E_SICUREZZA.md](04_LEGALITA_E_SICUREZZA.md).

## Risultato: «inventario ufficiale» non basta; contano identità, epoca, continuità, diritti e tipo di evidenza

La letteratura sulla completezza di query (ricognizione 09) trova nella pratica casi molto differenti:
- **Inventario di file generati**: elenca output di una specifica esportazione, con stato e checksum; permette audit dei byte *rispetto all'inventario*, non dimostra il censimento dell'intera realtà.
- **Snapshot/bulk dump**: fotografia di un dataset delimitato da data e ambito; permette verifiche puntuali della copia, **non** garantisce che aggiornamenti intermedi o risorse non indicizzate siano catturati.
- **Feed/delta**: segnala alcune variazioni dopo il baseline; semantica di cancellazione e retention sono parte della garanzia, non un dettaglio operativo.
- **Conteggio di ricerca/cursor**: aiuta a orientare le scansioni, ma la cardinalità può variare mentre la sorgente muta e non costituisce un inventario certificato.
- **Identifier/DOI persistente**: mantiene citabilità e riferimento a una vista/versione, ma non sempre la disponibilità perpetua degli stessi file.
- **Prova crittografica**: attesta proprietà *dell'insieme impegnato* (integrità, inclusione, consistenza), non che il gestore abbia pubblicato ogni record possibile.

Queste sono **categorie di evidenza**, non profili selezionabili, non livelli di potenza f3tcher e non un modello dati approvato.

## A. Cinque casi pratici verificati nella documentazione primaria

### A1. Wikimedia dump monitoring: manifest, stato del processo e integrità (V-doc)

- Fonte: https://meta.wikimedia.org/wiki/Data_dumps/Monitoring
- La documentazione descrive per ciascun run file quali `dumpruninfo.json`, `dumpspecialfiles.json`, `report.json`, `dumpstatus.json`; quest'ultimo registra lo stato di ciascun job (`done`, `failed`, `in-progress`, ecc.) e, quando presenti, file, dimensione, checksum MD5/SHA1. L'indice aggregato è documentato su `https://dumps.wikimedia.org/index.json`.
- Variante di esportazione: https://wikitech.wikimedia.org/wiki/MediaWiki_Content_File_Exports (pagina/mirror da ricontrollare alla fase operativa) descrive collezioni `mediawiki_content_current` e `mediawiki_content_history` e manifest `SHA256SUMS`; la presenza del manifest è usata come segnale di export pronto, e ciascun file può essere controllato contro il relativo digest.
- **Permette di studiare**: completezza del trasferimento rispetto ai file elencati in un run completato; distinzione fra completezza di *current* e di *history*.
- **NON permette di dedurre**: che ogni contenuto dei progetti Wikimedia sia stato esportato, che l'export sia una transazione simultanea, che sia autorizzata ogni forma di ridistribuzione, o che MD5/SHA1 siano prove crittografiche moderne contro un avversario intenzionale.

### A2. Crossref: bulk pubblico, snapshot premium e cambiamenti API (V-doc)

- Fonti: https://www.crossref.org/documentation/retrieve-metadata/bulk-downloads/ ; https://www.crossref.org/documentation/retrieve-metadata/rest-api/tips-for-using-the-crossref-rest-api/
- Crossref documenta file pubblici **annuali** con metadati DOI registrati; snapshot **mensili per Metadata Plus** (>200 GB), con retention limitata, e API con filtri `created`, `update`, `index`, oltre a cursori.
- La documentazione precisa che durante una ricerca di molti risultati alcune opere possono essere reindicizzate e quindi aggiunte/tolte dall'insieme dei risultati; suggerisce query più piccole per ridurre il rischio.
- **Permette di studiare**: baseline limitata temporalmente + aggiornamenti selettivi + riconciliazione ricorrente, distinzione fra significato di `update` e `index`.
- **NON permette di dedurre**: snapshot-consistent pagination delle API live, disponibilità gratuita delle snapshot mensili, né raccolta garantita di ogni evento storico.

### A3. OpenAlex: snapshot gratuito vs delta a retention finita e a pagamento (V-doc)

- Fonte: https://developers.openalex.org/download/changefiles
- Documenta **snapshot pubblici trimestrali**, snapshot mensili e **changefiles giornalieri per abbonati**. L'endpoint changefile elenca le modifiche disponibili negli **ultimi 60 giorni**: per data/tipo di entità offre conteggi, URL, dimensioni, JSONL/Parquet; in un giorno i record sono entità create o modificate, con corpo aggiornato da upsert per `id`.
- **Permette di studiare**: finestra massima osservabile di un flusso autorizzato, decisione fra ricostruzione da nuovo snapshot e uso di delta; conteggi/bytes come verifiche dell'artefatto.
- **NON permette di dedurre**: che chi usa il solo snapshot gratuito possa avere aggiornamenti giornalieri, che un delta riporti tutte le versioni intermedie, né che i delete tombstone siano coperti dalla documentazione consultata.

### A4. GBIF: versione citabile e data availability diverse (V-doc)

- Fonti: https://www.gbif.org/citation-guidelines ; https://www.gbif.org/faq ; https://techdocs.gbif.org/en/openapi/v1/occurrence
- I download occurrence sono identificati con DOI e la landing page conserva filtri e contributori; alcuni servizi di creazione download richiedono registrazione/autenticazione e hanno limiti di carico. DOI e citazione consentono riferimento riproducibile a un download.
- **Limite fondamentale riportato nella FAQ:** i file dei download sono inizialmente conservati **sei mesi**; successivamente il CSV/Darwin Core **può essere cancellato**, mentre metadati, DOI e riferimenti persistono. Un DOI valido **non è una garanzia che i byte siano ancora scaricabili**.
- **Permette di studiare**: separazione fra identificazione/provenienza, disponibilità fisica, gestione retention e ricostruibilità.
- **NON permette di dedurre**: accesso perpetuo al file, che ogni media associato abbia stessa licenza, né permessi illimitati di download.

### A5. ResourceSync 1.1: modello esplicito di sincronizzazione + audit (V-doc)

- Fonte: https://www.openarchives.org/rs/1.1/resourcesync_highlighted
- Il protocollo definisce **Resource Lists** / **Resource Dumps** per inizializzare, **Change Lists** / **Change Dumps** per aggiornare, e capacità di **Audit** confrontando copertura e accuratezza dei contenuti rispetto alla sorgente. Per le Change Lists usa tipo di modifica (create/update/delete), intervalli temporali e metadati per risorsa (lastmod, length, digest dove pubblicati).
- Importante: non impone una durata generale della disponibilità delle liste delle modifiche. Se i delta necessari sono scaduti, l'aggiornamento può non avere più basi sufficienti senza un nuovo baseline.
- **Permette di studiare**: un modello dichiarativo unificato di baseline, delta, verifica, cancellazioni e audit *quando il publisher espone le capacità*.
- **NON permette di dedurre**: che le sorgenti web ordinarie supportino ResourceSync, che ogni archivio conservi tutti gli eventi, che ogni inventario sia corretto o che si possano aggirare restrizioni di accesso.

## B. Un limite dello standard OAI-PMH che cambia la qualità delle dichiarazioni

**V-doc:** protocollo 2.0 https://www.openarchives.org/OAI/openarchivesprotocol.html e implementer guidelines https://www.openarchives.org/OAI/2.0/guidelines-repository.htm

1. `resumptionToken` per `ListIdentifiers`/`ListRecords` è opaco e può avere `expirationDate`. Quando la fonte cambia durante la sequenza la stretta idempotenza non è garantita; può arrivare `badResumptionToken` e occorre ricominciare la sequenza.
2. `completeListSize` è **facoltativo** e può essere **stimato/revisionato durante il paging** (accuratezza affidabile soprattutto se il result set è in cache). Non usare `completeListSize=1000` come prova matematica che siano esistite *esattamente* 1000 risorse per sempre.
3. `Identify/deletedRecord` distingue `no`, `transient` e `persistent`. Con `no`, una cancellazione può non essere individuabile mediante harvesting incrementale; con `transient`, il gestore non garantisce conservazione stabile dei tombstone. Non falsificare la continuità storica.
4. Le richieste selettive per datestamp hanno granulosità dichiarata dalla sorgente. Errori di intervallo/UTC e lag devono restare distinguibili dalla mancata presenza dei record.

**Ipotesi:** trattare semantica del provider e classe delle cancellazioni come *premesse delle affermazioni* di completezza temporale; non assumere che qualsiasi feed con cursori sia equivalente a un inventario versionato.

## C. Proprietà crittografiche: cosa provano davvero

**V-doc:** RFC 9162 (Certificate Transparency v2, *Experimental*, 2021), https://www.rfc-editor.org/rfc/rfc9162.html
- I Merkle tree permettono di verificare **inclusione** di una specifica voce e **consistenza append-only** fra stati firmati di un log, sotto un modello di fiducia e un protocollo concreto.
- Perfino nel proprio dominio, l'RFC avverte sul problema di viste inconsistenti offerte a client diversi e sulla necessità di verifiche/monitoraggio.
- **Non** può dimostrare che un publisher abbia pubblicato tutti i documenti del mondo o ogni suo record. Hash di un inventario autogenerato da f3tcher attestano al massimo un'istantanea di *ciò che f3tcher conosceva*, non l'assenza di dati fuori dall'inventario.
- **H — evidence assurance:** studiare se notarizzazioni / checksum / versioni / inclusione firmata debbano essere annotati come **tipi di evidenza distinti**, senza suggerire una falsa «proof of completeness» assoluta.

## D. Scala concettuale di forza delle attestazioni, NON profili utente

La seguente è **una proposta da indagare**, non una classificazione approvata:
- **Solo discovery**: URL individuato, risorsa non ancora letta.
- **Conteggio dichiarato**: `count`/sitemap/indice disponibile, ma volatilità/denominatore sconosciuti.
- **Manifest di un'edizione**: elenco di file e contesto (run, data, corpus, eventuali hashes), non necessariamente stabile né completo del mondo.
- **Manifest validato**: file effettivamente recuperati e confrontati con l'edizione dichiarata; verifica **entro quel perimetro**.
- **Continuità verificata**: baseline + delta senza gap noti e audit finale contro una sorgente che offre davvero quelle garanzie.
- **Ignoto/non autorizzato**: niente prova di inventario, retention scaduta, permessi insufficienti; dichiarazione negativa corretta, non falsa completezza.

**Due discriminanti da registrare in qualsiasi futuro esperimento:** `validità_del_perimetro` (chi dice cosa sia l'insieme?) e `validità_temporale` (a quale istante o intervallo si riferisce?). Un manifest di dump completo *rispetto alla lista generata* non attesta la completezza di documenti registrati successivamente né la veridicità delle informazioni contenute.

## E. Test falsificabili da studiare; NON eseguiti

| Ipotesi | Test su testbed controllato (futuro, se autorizzato) | Falsificazione / errore da rilevare |
|---|---|---|
| H1: riconciliazione «manifest-aware» | Inventario originario con file mancanti, corrotti, sostituiti, hash errati; confronto solo HTTP-success vs manifest+digest | Claim «completo» nonostante file mancante/corrotto |
| H2: conteggi non sono certificazioni | OAI-PMH simulated changing result set: `completeListSize` variabile, token scaduto, datestamp ai margini | Uso del numero stimato come esatto, perdita silenziosa |
| H3: fedeltà allo storico | `deletedRecord=no/transient/persistent` con cancellazioni e source lag | Affermazione non giustificata `all changes captured` |
| H4: tempo e accesso sono parte della qualità | OpenAlex-like delta con retention 60 giorni e GBIF-like DOI con bytes espirati | «accessibile e riacquisibile» quando la finestra è passata |
| H5: vendor API vs snapshot | Crossref-like reindex durante cursor pagination, poi confronto con una edizione statica dello stesso perimetro | Mancate osservazioni non rilevate o confusione su date `created/update/index` |
| H6: inclusione non è universo | Merkle/signed log contenente solo un sottoinsieme degli oggetti di un inventario esterno | Prova di inclusione presentata come copertura di ogni oggetto |

Condizioni minime dei confronti: stessa autorizzazione e politica di rate, perimetri temporali espliciti, identità stabili, gold inventory del testbed (non della rete mondiale), *false-positive completeness rate* principale, costi, casi senza gold truth marcati «non verificabile», documentare ogni anomalia.

## F. Opportunità di ricerca, non progettazione definitiva

1. **Epistemic routing / source-declared guarantees:** non scegliere solo «come scaricare», ma riconoscere *quali proprietà della fonte consentono quali affermazioni* e rifiutare quelle prive di premesse.
2. **Recovery horizon:** distinguere un gap di aggiornamento recuperabile via log/delta, recuperabile solo via nuovo snapshot, e irrecuperabile per mancanza di storico o diritti; retention effettiva, non costo della chiamata, è il vincolo.
3. **Independent-witness triangulation:** confrontare inventari, dump, link discovery, feed e dati indipendenti per trovare discrepanze; **non** assumere indipendenza statistica né preferire sempre la fonte con più record.
4. **Evidence aging:** una prova valida al tempo T non certifica il tempo T+1. Studiare scadenza, revisione delle dichiarazioni, versione delle sorgenti e segnalazioni di gap.

Il sistema rimane **uno solo**, autonomo, senza profili selezionabili. Tutte le capacità e le tecnologie citate sono oggetto di ricerca, non decisioni.

## Chiusura e piste da continuare

- Verificare su casi reali se esistano **versioned source manifests con dichiarazioni forti di epoch/snapshot** rispetto ai soli status di dump.
- Confrontare *independent witnesses* vs inventari tutti derivati dalla stessa API (falsa indipendenza).
- Studiare a livello accademico condizioni sotto cui una serie di delta/inventory è sufficiente a sostenere claim specifici senza snapshots atomiche.
- Studiare le differenze fra checksum e **autenticità** del manifest, e cosa possono garantire firme/registri di trasparenza senza creare una «prova di assenza» fasulla.
- Considerare istituzioni/data publishers con API e licenze aperte come casi di benchmark futuri, non come autorizzazioni già ottenute.

**Nessun benchmark di f3tcher, nessun test di endpoint, nessun nuovo stack e nessun codice applicativo.** Ricognizione di documentazione primaria aggiornata a questa sessione.
