# f3tcher — archivio della ricerca (non implementato)

> **Stato al 2026-11-02:** progetto in fase di **ricerca e ricognizione**. Non esiste ancora un'architettura approvata, uno stack deciso, un motore funzionante, un benchmark eseguito o codice applicativo. Questo repository conserva le conoscenze emerse dalle conversazioni di ricerca e permette di riprendere il lavoro in una nuova chat.

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
| [docs/09_COMPLETEZZA_LOCALE_E_PROVE.md](docs/09_COMPLETEZZA_LOCALE_E_PROVE.md) | Completezza verificabile per interrogazione/perimetro, limiti capture-recapture, watermark e due benchmark ExtractBench distinti |
| [docs/10_INVENTARI_E_GARANZIE.md](docs/10_INVENTARI_E_GARANZIE.md) | Inventari e checksum reali (Wikimedia), bulk/delta/retention (Crossref, OpenAlex, GBIF), OAI-PMH, ResourceSync e limiti delle prove crittografiche |
| [docs/11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md](docs/11_INDIPENDENZA_FONTI_E_ATTESTAZIONI.md) | Dipendenze/copia fra fonti, provenance, TUF, witness, SCITT e prove crittografiche circoscritte |
| [docs/12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md](docs/12_GENEALOGIE_BENCHMARK_E_ABSTENTION.md) | Corpus METER/COUNTER/USTRC/NewsEdits/PAN 2025-2026, provenienza multilivello, casi di incertezza e diritti |
| [docs/13_DIFFUSIONE_IDENTIFICABILITA_E_ASTENSIONE.md](docs/13_DIFFUSIONE_IDENTIFICABILITA_E_ASTENSIONE.md) | Stanford NETINF/MemeTracker, inferenza delle origini da cascades, confidence sets, astensione calibrata, limiti e nuove ipotesi |
| [docs/14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md](docs/14_ACTIVE_PROVENANCE_INFORMATION_VALUE.md) | Ricerca iterativa delle prove, FIRE, AFA/POMDP, rischio del prior errato, feedback e valutazione off-policy |
| [docs/15_ACQUISIZIONE_UNIVERSALE_PROTOCOLLI_E_CRAWLER.md](docs/15_ACQUISIZIONE_UNIVERSALE_PROTOCOLLI_E_CRAWLER.md) | Scoperta e acquisizione multiprotocollo: DCAT/DCAT-AP, STAC, OGC, IIIF, CKAN, WebSub, crawler e agenti |
| [docs/16_ACQUISIZIONE_SPECIALISTICA_RICERCA_LEGGI_STATISTICHE_FEDERAZIONE.md](docs/16_ACQUISIZIONE_SPECIALISTICA_RICERCA_LEGGI_STATISTICHE_FEDERAZIONE.md) | OpenAIRE, DataCite, arXiv, Europe PMC, Normattiva, Cellar, Europarl, Eurostat/Istat SDMX e ActivityPub/ATProto |
| [docs/17_BREVETTI_BIOLOGIA_AUDIOVISIVI_CONSERVAZIONE.md](docs/17_BREVETTI_BIOLOGIA_AUDIOVISIVI_CONSERVAZIONE.md) | Brevetti EPO, archivi ENA/NCBI, Europeana/EBU/WebVTT, METS/PREMIS/E-ARK/BagIt e acquisizione di oggetti composti |
| [docs/18_SINTESI_COMPARATIVA_E_LACUNE.md](docs/18_SINTESI_COMPARATIVA_E_LACUNE.md) | **Sintesi comparativa 00–17:** sovrapposizioni, complementarità, limiti, otto confronti decisivi e criteri di conclusione della ricerca |
| [docs/19_ADOZIONE_REALE_E_COMPATIBILITA_PORTALI.md](docs/19_ADOZIONE_REALE_E_COMPATIBILITA_PORTALI.md) | **Reality check su portali reali:** Copernicus STAC 2026 old/new (JSON letto), Rijksmuseum IIIF/OAI/LDES, RNDT GeoDCAT, Zenodo, UK CKAN, data.europa e Signposting; confini delle verifiche |
| [docs/20_SORGENTI_DIFFICILI_MODULI_STATI_E_OMISSIONI.md](docs/20_SORGENTI_DIFFICILI_MODULI_STATI_E_OMISSIONI.md) | **Sorgenti difficili:** moduli di ricerca, deep web lecito, AJAX/SPA, liste dinamiche, paginazione, soft-200 e false acquisizioni complete |
| [docs/21_SCALABILITA_COSTI_E_ACQUISIZIONE_EFFICIENTE.md](docs/21_SCALABILITA_COSTI_E_ACQUISIZIONE_EFFICIENTE.md) | **Efficienza e scala:** politeness per host/IP, Scrapy/StormCrawler, HTTP caching e Range, revisite, Crawlee, Browser Run, costi informativi e 10 confronti |

Per una vista aggiornata e senza duplicazioni della ricerca leggere **prima [la sintesi comparativa 18](docs/18_SINTESI_COMPARATIVA_E_LACUNE.md)**, poi le fonti e i registri dettagliati pertinenti.

## Avvertenze di metodo

- **Ricerca ≠ implementazione.** Nessun tool o studio citato implica che f3tcher possieda già quella funzionalità.
- **Risultati riportati ≠ benchmark di f3tcher.** I numeri appartengono a pubblicazioni o affermazioni dei rispettivi autori.
- **Verifica dei riferimenti.** Parte dei link è stata controllata direttamente su documentazione primaria il 2026-11-01; altri sono **piste emerse nelle chat precedenti da riverificare**. Il registro indica la distinzione.
- **Niente specifiche definitive per ora.** La preferenza dell'utente è continuare a cercare e confrontare prima di fissare architettura, stack o roadmap di sviluppo.
- **Quando riprendi:** leggi prima [docs/06_RIPRESA_NUOVA_CHAT.md](docs/06_RIPRESA_NUOVA_CHAT.md) e [docs/00_STATO_E_DECISIONI.md](docs/00_STATO_E_DECISIONI.md).

Aggiornato con ricognizioni di fonti primarie fino al **2 novembre 2026**, senza sviluppo o benchmark eseguiti.

Creato come archivio della ricerca concordata fino al **1 novembre 2026**, non come promessa di originalità assoluta o fattibilità già dimostrata.
