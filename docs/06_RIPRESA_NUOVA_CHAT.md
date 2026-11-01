# 06 — Ripresa del progetto in una nuova chat

**Questo è il punto di ingresso per recuperare il contesto.** Stato congelato al 2026-11-01; aggiornare a ogni nuova sessione di ricerca.

## Procedura per una nuova chat

1. Collegarsi all'account GitHub **`Jer1choEU`** (attenzione: non **`EUJer1cho`**) e aprire **https://github.com/Jer1choEU/f3tcher**.
2. Leggere README e i file `docs/00_...` fino a `docs/05_...` e tutte le ricognizioni successive (attualmente `docs/07_RICOGNIZIONE_2026-11-01.md` e `docs/08_ADOZIONE_CONSISTENZA_E_LONG_TAIL.md` e `docs/09_COMPLETEZZA_LOCALE_E_PROVE.md` e `docs/10_INVENTARI_E_GARANZIE.md` e `docs/11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md` e `docs/12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md`). Non basarsi soltanto su precedenti risposte di chat.
3. Se il repository è cambiato, verificare commit/stato corrente prima di riassumere.
4. Riprendere la **fase di ricerca**, non implementare né formalizzare una proposta definitiva, salvo nuova richiesta dell'utente.
5. Se viene chiesto di continuare la ricerca, cercare fonti primarie accademiche, standard, repository, esperienze indipendenti e test comparabili; aggiornare i documenti con risultati verificati, distinguendoli da piste.
6. Non fare promesse di lavoro futuro in background né dichiarare test/code completati senza evidenze.
7. Tenere nota della data della nuova ricognizione e annotare cambiamenti in stato, decisioni e livello di verifica.

## Prompt da copiare nella nuova chat

> Riprendiamo la ricerca sul progetto f3tcher: https://github.com/Jer1choEU/f3tcher . Usa il mio account GitHub **Jer1choEU**, NON EUJer1cho.
>
> **Prima leggi il README e tutti i file in `docs/`**, incluse le ricognizioni 07, 08, 09, 10, 11 e 12, in particolare `00_STATO_E_DECISIONI.md`, `01_ATLANTE_FUNZIONALITA.md`, `02_PROGETTI_E_TECNOLOGIE.md`, `03_STUDI_E_FONTI.md`, `04_LEGALITA_E_SICUREZZA.md` e `05_DOMANDE_E_BENCHMARK.md`.
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

## Ulteriore aggiornamento: adozione, consistenza, long tail (2026-11-01)

È disponibile [08_ADOZIONE_CONSISTENZA_E_LONG_TAIL.md](08_ADOZIONE_CONSISTENZA_E_LONG_TAIL.md), che verifica documentalmente la presenza di FAIR Signposting in repository reali e del benchmark Apples-to-Apples, distingue l'ecosistema Arazzo disponibile dalle adozioni dei provider, documenta le limitazioni concrete di Microsoft Graph Delta/paginazione offset e i bias di campionamento/long tail. Introduce soltanto ipotesi di *debito di discovery, sincronizzazione e verifica delle evidenze* da misurare: **non** sono architettura, requisiti o test f3tcher. Leggere il documento prima della nuova ricerca.

## Aggiornamento: completezza locale, stime e omissioni (2026-11-01)

La [ricognizione 09](09_COMPLETEZZA_LOCALE_E_PROVE.md) trova basi formali per la **completezza delle risposte a specifiche query su basi dati incompleti** (Razniewski/Nutt, Darari et al.), e un limite fondamentale della stima delle popolazioni nascoste: servono *assunzioni identificative*, altrimenti il risultato valido è **non stimabile**. Apache Flink mostra che watermark e gestione di eventi tardivi non equivalgono a una storia perfetta; Debezium dimostra watermarks con garanzie dipendenti da log transazionali. Verificati **due benchmark distinti chiamati ExtractBench**: ContextualAI (35 PDF) e run-llama/LlamaIndex (370 documenti), entrambi estrazione strutturata ma con metriche differenti. Sono solo ipotesi da testare, **non** architettura, benchmark f3tcher o adozioni.

## Aggiornamento: inventari reali e limiti probatori (2026-11-01)

La [ricognizione 10](10_INVENTARI_E_GARANZIE.md) identifica esempi concreti di **inventari e stati di esportazione** (Wikimedia), snapshot pubblici/riservati e aggiornamenti con rischio di reindex (Crossref), changefile a pagamento e retention di 60 giorni (OpenAlex), download con DOI che non garantiscono bytes perpetui (GBIF), audit e Change List dello standard ResourceSync, limiti specifici di `completeListSize` e `deletedRecord` in OAI-PMH, nonché ciò che una prova di inclusione Merkle (RFC 9162) **non** dimostra. Evidenza di origine/versione/perimetro ≠ garanzia universale; *research only*. Prossima ricerca: autentificazione dei manifest, indipendenza degli inventari, condizioni di recovery da gap e snapshot atomiche. Non avviare software né inventare benchmark.


## Aggiornamento: indipendenza delle evidenze e attestazioni (2026-11-01)

Leggere [11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md](11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md): studio PVLDB 2009/2010 su copying e co-copying/transitività; W3C PROV-O/PROV Constraints e database provenance; TUF (firme, versione, scadenza), C2SP witness di log, nuovi **RFC 9942/9943 (2026)** su COSE receipts e SCITT. Distinzione chiave: **fonti indipendenti sul piano fattuale** ≠ **testimoni indipendenti della consistenza del registro** ≠ **più firme dello stesso manifest**. Una proof-of-non-inclusion vale per l'insieme impegnato, non per l'universo. Nessun test, stack o implementazione f3tcher. Prossima ricerca: identificabilità delle genealogie, dataset con ground truth delle copie, qualità del lineage a livello di affermazione e condizioni di uso/liceità.

## Aggiornamento: genealogie ricostruibili e astensione (2026-11-01)

Leggere [12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md](12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md): corpus **METER** (reale, giornali e agenzia, accesso/licenza da verificare), **COUNTER** (600 coppie urdu, CC BY-NC-SA e uso ricerca/accademia), **USTRC** (2.684 coppie brevi urdu), **PAN-PC-11** (plagio simulato), **PAN 2025** (span di riutilizzo parafrasato da LLM), **PAN 2026** (recupero di almeno due sorgenti in testo sintetico, accesso riservato a ricerca, niente redistribuzione), **NewsEdits** (versioni dello stesso articolo), **FakeWiki/DataDignity** (hard negatives di supporto fattuale), **MAVIS** (attribuzione multimodale), **Nature Data Provenance 2024** (audit di licenze e lineage). Non confondere similarity, reuse, supporto, derivazione causale o titolarità dei diritti; misurare la **capacità di dire origine ignota**. Nessuna prova o implementazione f3tcher. Prossime verifiche: ground truth di intermediari/co-copying, bias e identificabilità, split per fonte/epoca, permessi effettivi dei corpora.

## Sintesi dei punti di partenza più promettenti

**Guadagno informativo atteso**, **discovery protocol-first**, **focused crawling con bandit e ricerca semantica**, **stima delle lacune e controllo statistico dei bias**, **estrazione verificabile e compilata in procedure ripetibili**, **ricrawl/delta sync**, **provenienza temporale e replay**, **resilienza distribuita**, **difese contro contenuti ostili**.

Tutti sono **filoni di studio**, non scelte di implementazione finali.

---
*Questo handoff è deliberatamente autonomo: contiene identità del repo, obiettivo, vincoli, stato, documenti da leggere e prompt di ripartenza.*
