# 00 — Stato, decisioni e perimetro

**Ultimo consolidamento:** 2026-11-01. **Fase:** ricerca esplorativa, nessuna implementazione approvata. **Account GitHub:** `Jer1choEU` (non `EUJer1cho`). **Repository:** https://github.com/Jer1choEU/f3tcher — pubblico.

## Decisioni dell'utente (confermate)

1. Il progetto serve come **motore di acquisizione universale riutilizzabile** in tutti i progetti futuri; non va costruito per un unico caso d'uso, tema, sito o cliente.
2. **Massimo delle capacità disponibili** da strumenti commerciali, open source e ricerca scientifica; combinare idee, implementazioni e metodologie, senza limitarsi ai prodotti più noti.
3. **Un solo sistema**, senza profili selezionabili di potenza come Fast/Deep/Maximum. Il motore deve selezionare internamente strategie, motori e fallback, senza dipendere da selezioni manuali.
4. **Ambizione alta / distintività**, ma “unico” **non** significa che ogni singola tecnica debba essere mai stata inventata: si può riutilizzare e combinare il meglio dell'esistente. Non rivendicare novità assoluta senza confronto.
5. **Legalità non negoziabile.** L'utente non vuole infrangere leggi. Desidera la massima capacità e “penetrabilità” compatibile con la legge; **403 = arresto su quella risorsa/percorso**, senza elusione. Altri vincoli possono comunque applicarsi.
6. **Ricerca prima di specifiche e codice:** approfondire accademia, documentazione ufficiale, GitHub, siti di programmazione, Hacker News, Reddit/forum; ampliare i filoni che emergono. Non cristallizzare prematuramente architettura, linguaggio, hosting o roadmap definitiva.
7. **Conservare gli apprendimenti nella repo** in modo che una futura chat possa riprendere senza perdere contesto, distinguendo fatti, decisioni, proposte e ipotesi.

## Stato reale alla data

- Inizialmente la repo era **vuota** (0 KB, main dichiarato come branch predefinito senza commit).
- Questa documentazione è la **prima consegna materiale**: non esistono ancora codice applicativo, librerie selezionate, test eseguiti, infrastruttura, CI/CD, crawl, baseline empirica o valutazione giuridica per singola fonte.
- Le architetture descritte in conversazione erano **schemi concettuali**, non decisioni. Cloudflare/Turso/R2, Crawlee, Scrapy, Playwright, ecc. sono **candidati**, non stack fissato.
- Nessun benchmark misurato da noi. I numeri riportati nelle fonti sono di autori e fornitori, con condizioni e limiti specifici.
- Nessun profilo selezionabile. Possibili policy operative interne automatiche **non** equivalgono a profili utente.

## Obiettivo: misura del successo

Massimizzare il volume di **informazioni lecite, pertinenti, nuove, complete, aggiornate, verificabili e utilizzabili**, non il numero grezzo di richieste o di pagine. Evitare che un 200 OK o un job “success” mascherino mancanze e contenuti errati.

Distinguere:
- **Discovery**: risorsa nota/individuata (anche attraverso indici terzi).
- **Accesso**: autorizzazione e possibilità tecnica, senza presupporre che siano equivalenti.
- **Acquisizione**: bytes/record realmente recuperati.
- **Estrazione**: campi e contenuti strutturati ricavati.
- **Verifica**: evidenze, integrità, copertura e qualità effettiva.
- **Disponibilità ai progetti**: distribuzione nel perimetro dei diritti e dei permessi.

## Intuizioni forti emerse (non ancora requisiti approvati)

- Source capability discovery: capire quale tipo di fonte è e quali interfacce **dichiara** di offrire.
- Frontier adattiva e focused crawling (bandit, campionamento host, teoria del guadagno informativo).
- Approccio **Web → Knowledge → Web**: i dati recuperati generano nuove piste di scoperta.
- Crawler consapevole delle lacune: stimare copertura e incertezza, evitando pretese di 100%.
- Controlli **differenziali e metamorfici** tra API, sitemaps, moduli di ricerca, periodi e dataset; rilevazione di errori silenziosi.
- Apprendere procedure di estrazione/navigazione, validarle, compilare DSL/esecutori deterministici, rieseguirle offline e aggiornarle quando cambiano i siti.
- Protocol-first: utilizzare API, feed eventi, cataloghi, delta sync, dataset colonnari e archivi preesistenti prima di ripetere HTML/browser quando opportuno.
- Scegliere più parser in base alla struttura e verificare le **omissioni**, non solo le allucinazioni.
- Conservarne *provenienza, temporalità, versioni e limiti legali*; deduplicare senza cancellare fonti indipendenti.
- Eventuale cache/acquisizione condivisa tra progetti con separazione di credenziali, licenze, permessi e retention.
- Autonomia controllata: input web non è istruzione fidata; policy, sandbox, SSRF e segreti confinati.

## Questioni non ancora decise

- Perimetro operativo esatto e priorità di compatibilità fra sorgenti, nonostante obiettivo generalista.
- Quale stack, runtime e distribuzione cloud/on-prem/hybrid; costi e limiti reali.
- Forma concreta delle API/SDK/eventi, degli adattatori, del database e dell'archivio.
- Se/come usare modelli AI o agenti: quando aiutano davvero rispetto a tecniche deterministiche.
- Quali indici esterni o servizi commerciali adottare, dipendenze e costi.
- Come valutare la liceità di ogni acquisizione in contesti e giurisdizioni differenti; serve analisi giuridica specifica prima dell'uso.
- Come stimare la copertura senza confondere dati osservati, ipotesi e campionamento distorto.
- Licensing dei componenti, in particolare AGPL, e sua compatibilità con il modello d'uso futuro.
- Casi d'uso benchmark, dataset di riferimento e soglie di qualità; architettura finale solo dopo evidenze.

## Regole per chi riprende il lavoro

1. **Leggere prima tutti i documenti indicizzati dal README**, soprattutto il registro fonti con stato di verifica.
2. Non dire “già implementato”, “garantito”, “originale al mondo”, “legale perché pubblico” o “completo al 100%”.
3. Evitare suggerimenti di bypass di 403, CAPTCHA, paywall, sistemi di accesso, limiti tecnici o dati non autorizzati. Cercare vie di accesso alternative **legittime**.
4. Mantenere la ricerca aperta finché l'utente non autorizza esplicitamente la progettazione/implementazione.
5. Quando si aggiungono nuove fonti, registrare URL, data, claim esatto, livello di evidenza, limiti e capacità associata. Correggere i link non verificati, non inventare bibliografia.
6. A ogni sessione aggiornare data e stato, senza confondere evoluzione delle idee con avanzamento di codice.
