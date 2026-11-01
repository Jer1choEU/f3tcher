# 06 — Ripresa del progetto in una nuova chat

**Questo è il punto di ingresso per recuperare il contesto.** Stato congelato al 2026-11-01; aggiornare a ogni nuova sessione di ricerca.

## Procedura per una nuova chat

1. Collegarsi all'account GitHub **`Jer1choEU`** (attenzione: non **`EUJer1cho`**) e aprire **https://github.com/Jer1choEU/f3tcher**.
2. Leggere README e i file `docs/00_...` fino a `docs/05_...` e tutte le ricognizioni successive (attualmente `docs/07_RICOGNIZIONE_2026-11-01.md`). Non basarsi soltanto su precedenti risposte di chat.
3. Se il repository è cambiato, verificare commit/stato corrente prima di riassumere.
4. Riprendere la **fase di ricerca**, non implementare né formalizzare una proposta definitiva, salvo nuova richiesta dell'utente.
5. Se viene chiesto di continuare la ricerca, cercare fonti primarie accademiche, standard, repository, esperienze indipendenti e test comparabili; aggiornare i documenti con risultati verificati, distinguendoli da piste.
6. Non fare promesse di lavoro futuro in background né dichiarare test/code completati senza evidenze.
7. Tenere nota della data della nuova ricognizione e annotare cambiamenti in stato, decisioni e livello di verifica.

## Prompt da copiare nella nuova chat

> Riprendiamo la ricerca sul progetto f3tcher: https://github.com/Jer1choEU/f3tcher . Usa il mio account GitHub **Jer1choEU**, NON EUJer1cho.
>
> **Prima leggi il README e tutti i file in `docs/`**, inclusa la ricognizione 07, in particolare `00_STATO_E_DECISIONI.md`, `01_ATLANTE_FUNZIONALITA.md`, `02_PROGETTI_E_TECNOLOGIE.md`, `03_STUDI_E_FONTI.md`, `04_LEGALITA_E_SICUREZZA.md` e `05_DOMANDE_E_BENCHMARK.md`.
>
> Obiettivo: costruire in futuro un **unico motore universale** per la massima acquisizione lecita di informazioni digitali da web, API, feed, archivi, documenti, dataset, flussi di eventi e altre fonti. Deve scegliere autonomamente i metodi migliori, **senza profili selezionabili**, massimizzando completezza, profondità storica, affidabilità, freschezza, provenienza e interoperabilità. Non voglio violare alcuna legge: **nessun bypass di 403, login, paywall, CAPTCHA, rate limit o altri divieti**; non interpretare la semplice accessibilità pubblica come autorizzazione universale.
>
> **Siamo ancora nella fase esplorativa.** Continua a ricercare paper, repository GitHub, documentazione e discussioni tecniche; amplia la ricerca se trovi nuovi filoni. Non fissare ancora stack/architettura né scrivere codice senza mio via libera. Distingui studi verificati, claim dei fornitori, ipotesi e test realmente eseguiti. Se emergono nuove scoperte, aggiorna i documenti della repo e indica cosa è cambiato. Non ripetere semplicemente gli spunti già documentati: cerca miglioramenti nuovi e supportati da evidenze.

## Decisioni rapide da non perdere

- **Un solo sistema**. “Massimo” significa tutte le capacità disponibili e scelta adattiva, non ricorso forzato ad algoritmi costosi per ogni richiesta.
- “Unico” significa ambizioso/distintivo, **non** obbligo di originalità assoluta.
- **La legalità viene prima della capacità tecnica**; HTTP 403 stop, ma attenzione anche a GDPR, TDM, robots, licenze e condizioni d'uso.
- **Priorità acquisizione** e qualità reale: scoprire risorse, recuperare, estrarre, verificare, mantenere aggiornato; le dashboard non sono il primo obiettivo.
- **Nessuna tecnologia adottata ufficialmente.** Cloudflare, Turso, Crawlee, Scrapy, Docling, ecc. sono solo opzioni emerse dalla ricerca.
- Fino al salvataggio di questo archivio, **nessun software funzionante**, nessun benchmark proprio, nessun deployment.
- **Le fonti in `03_STUDI_E_FONTI.md` sono contrassegnate V/P**: continuare a verificarle, non trasformarle in risultati certi senza controlli.

## Procedura di mantenimento del repository durante le future ricerche

- Prima aggiornare `03_STUDI_E_FONTI.md` con URL primario, data, claim e livello evidenza; poi aggiungere la ricaduta nell'atlante o nella matrice tecnica.
- Per ogni nuova idea registrare: problema, capacità proposta, concorrenti che già la possiedono, base scientifica, rischi/limiti, condizioni di test.
- Se si prende una decisione effettiva, scriverla in `00_STATO_E_DECISIONI.md`; non scambiare un suggerimento dell'assistente per una decisione dell'utente.
- Un eventuale cambio di fase a implementazione dovrà aggiornare chiaramente il README da **ricerca** a **sviluppo**, inserendo codice, test e stato CI documentati.
- Non includere in repo segreti, password, token, contenuti di terzi non autorizzati o dati personali superflui.

## Aggiornamento della nuova ricognizione (2026-11-01)

Nuove piste salvate nel [documento 07](07_RICOGNIZIONE_2026-11-01.md): Arazzo 1.1.0, FAIR Signposting/Linkset RFC 9264, OData Delta, W3C ODRL, teoria Active Search/Surveying, BagIt/OCFL. Gli abstract dei lavori host-aware, Web–Knowledge–Web e core/shell sono stati verificati, ma non replicati. Nessuna scelta architetturale e nessun test f3tcher. Ripartire verificando l'adozione reale di queste interfacce e le loro condizioni di uso, non iniziando il codice.

## Sintesi dei punti di partenza più promettenti

**Guadagno informativo atteso**, **discovery protocol-first**, **focused crawling con bandit e ricerca semantica**, **stima delle lacune e controllo statistico dei bias**, **estrazione verificabile e compilata in procedure ripetibili**, **ricrawl/delta sync**, **provenienza temporale e replay**, **resilienza distribuita**, **difese contro contenuti ostili**.

Tutti sono **filoni di studio**, non scelte di implementazione finali.

---
*Questo handoff è deliberatamente autonomo: contiene identità del repo, obiettivo, vincoli, stato, documenti da leggere e prompt di ripartenza.*
