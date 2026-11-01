# f3tcher — archivio della ricerca (non implementato)

> **Stato al 2026-11-01:** progetto in fase di **ricerca e ricognizione**. Non esiste ancora un'architettura approvata, uno stack deciso, un motore funzionante, un benchmark eseguito o codice applicativo. Questo repository conserva le conoscenze emerse dalle conversazioni di ricerca e permette di riprendere il lavoro in una nuova chat.

## Obiettivo condiviso

Costruire **un unico motore universale di acquisizione di informazioni digitali** utilizzabile da progetti futuri: web scraping, crawling, discovery, API, feed, archivi, documenti, streaming e altre fonti digitali. Ambizione: **massima copertura, profondità storica, freschezza, autonomia, completezza, affidabilità e interoperabilità**, senza profili Fast/Deep/Maximum e senza inutili limiti artificiali di prodotto.

Il motore dovrà scegliere **automaticamente** i metodi più adatti alla fonte, anche in combinazione; potrà riutilizzare le acquisizioni per più progetti con isolamento dei permessi.

**Vincolo non negoziabile: rispetto delle leggi e degli accessi autorizzati.** Un HTTP 403 è un segnale di arresto per quel percorso, ma **l'assenza di un 403 non è un'autorizzazione legale universale**. Niente elusione di autenticazioni, barriere di sicurezza o divieti. Si studiano, invece, vie alternative legittime (API, archivi aperti, dataset, autorizzazioni).

## Documenti di lavoro

| Documento | Contenuto |
|---|---|
| [docs/00_STATO_E_DECISIONI.md](docs/00_STATO_E_DECISIONI.md) | Decisioni confermate, stato reale, vincoli, questioni aperte e consegne |
| [docs/01_ATLANTE_FUNZIONALITA.md](docs/01_ATLANTE_FUNZIONALITA.md) | Tutte le famiglie di capacità e le idee emerse, **non** requisiti definitivi |
| [docs/02_PROGETTI_E_TECNOLOGIE.md](docs/02_PROGETTI_E_TECNOLOGIE.md) | Confronto di prodotti, repository open source e standard |
| [docs/03_STUDI_E_FONTI.md](docs/03_STUDI_E_FONTI.md) | Registro di studi, articoli, documentazione e fonti con stato delle verifiche |
| [docs/04_LEGALITA_E_SICUREZZA.md](docs/04_LEGALITA_E_SICUREZZA.md) | Confini legali, gestione accesso, sicurezza, riservatezza e licenze |
| [docs/05_DOMANDE_E_BENCHMARK.md](docs/05_DOMANDE_E_BENCHMARK.md) | Ipotesi scientifiche, prove comparabili e metriche |
| [docs/06_RIPRESA_NUOVA_CHAT.md](docs/06_RIPRESA_NUOVA_CHAT.md) | Istruzioni operative e prompt di ripartenza per nuove conversazioni |
| [docs/07_RICOGNIZIONE_2026-11-01.md](docs/07_RICOGNIZIONE_2026-11-01.md) | Nuove fonti verificate e ipotesi: Arazzo, FAIR Signposting/Linkset, OData Delta, ODRL, Active Search, BagIt/OCFL |
| [docs/08_ADOZIONE_CONSISTENZA_E_LONG_TAIL.md](docs/08_ADOZIONE_CONSISTENZA_E_LONG_TAIL.md) | Adozione verificata documentalmente, limiti dei delta, pagination, fonti rare e ipotesi di ricerca senza benchmark |

## Avvertenze di metodo

- **Ricerca ≠ implementazione.** Nessun tool o studio citato implica che f3tcher possieda già quella funzionalità.
- **Risultati riportati ≠ benchmark di f3tcher.** I numeri appartengono a pubblicazioni o affermazioni dei rispettivi autori.
- **Verifica dei riferimenti.** Parte dei link è stata controllata direttamente su documentazione primaria il 2026-11-01; altri sono **piste emerse nelle chat precedenti da riverificare**. Il registro indica la distinzione.
- **Niente specifiche definitive per ora.** La preferenza dell'utente è continuare a cercare e confrontare prima di fissare architettura, stack o roadmap di sviluppo.
- **Quando riprendi:** leggi prima [docs/06_RIPRESA_NUOVA_CHAT.md](docs/06_RIPRESA_NUOVA_CHAT.md) e [docs/00_STATO_E_DECISIONI.md](docs/00_STATO_E_DECISIONI.md).

Aggiornato con una nuova ricognizione di fonti primarie il **1 novembre 2026**, senza sviluppo o benchmark eseguiti.

Creato come archivio della ricerca concordata fino al **1 novembre 2026**, non come promessa di originalità assoluta o fattibilità già dimostrata.
