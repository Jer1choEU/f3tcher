# 29 — Prima integrazione delle tecnologie di Fetcher-Silvestri

**Data:** 2026-11-02 · **Stato:** codice sperimentale, non distribuito in produzione.

## Criterio
Si trasferiscono i **meccanismi generici**, non le fonti, i segreti, i domini parlamentari o i dati di produzione del repository privato. Nessun accesso viene attivato automaticamente. La nuova richiesta di integrazione prevale, per il solo prototipo, sulla precedente decisione di rimandare qualsiasi codice fino alla conclusione dei benchmark. I confronti metodologici nei documenti 00–28 rimangono validi.

## Matrice di trasferimento

| Capacità Fetcher-Silvestri | f3tcher, prima fase | Limite |
|---|---|---|
| Rotazione per fonte e budget per tick | Implementato (max tre fonte per ciclo predefinito) | Nessun ottimizzatore adattivo |
| ETag, Last-Modified, full refresh | Implementato | Solo per risorse con checkpoint completi |
| Backoff esponenziale, Retry-After, cooldown host | Implementato | Polling sequenziale, senza coda distribuita |
| Stop permanente per HTTP 403 | Implementato e persistito | Sblocco soltanto tramite intervento sul DB dopo revisione |
| Download bounded e sicurezza redirect | Implementato | Redirect cross-host rifiutati; nessuna risoluzione DNS preventiva |
| RSS/Atom, API JSON, CSV e documenti | Adattatori base | XML/CSV semplificati; PDF e binari solo hash/asset |
| Dataset istituzionali specifici ISTAT/Eurostat/DFP/PNSL/ANBSC | Non copiati | Richiedono adattatori, tipologie e licenze specifiche |
| Turso/libSQL, atomicità record/checkpoint | Implementato | Schema v1, da migrare/versionare nel seguito |
| Lease per collisioni tra Cron | Implementato | TTL fisso di 20 minuti; politiche distribuite da migliorare |
| Provenienza di assets e domini | Record, sightings, classificazione candidata | Non attesta fatti, licenze né indipendenza delle fonti |
| Error ledger e quality health | Implementati, aggregati | Niente issue GitHub automatica o dashboard |
| Revisione editoriale, clustering, dossier | Non copiati | Non appartenenti al core universale; eventuali plugin |
| Protezione accessi/robots | Gate di revisione esplicita | Non è una verifica robots automatica; non raccogliere senza verifica |
| Historicals e backfill | Supporto con intervalli lunghi | Nessuna orchestrazione backfill/cursor incrementale ancora implementata |

## Garanzie pratiche
- Catalogo di produzione distribuito vuoto: nessuna richiesta a terzi quando non configurato.
- Il modulo HTTPS rifiuta credenziali embedded, nomi locali e IP letterali; non sostituisce hardening di rete o controlli anti-SSRF DNS.
- Nessun contenuto completo di articoli viene memorizzato; titoli, URL e metadati si conservano solo per fonti riviste con condizioni d'uso documentate.
- Lo stato di risposta 304 non può certificare una scansione incompleta: in quel caso i validator vengono cancellati.
- La deduplicazione per URL non dimostra che due notizie descrivano lo stesso evento.
- Le metriche interne misurano dati registrati, **non copertura empirica** delle fonti.

## Verifica
`npm test` esegue fixture locali, le prove su HTTP 403/304/429, controllo accessi, deduplica e audit sulla base temporanea libSQL. `npm run build` esegue il Worker dry-run. I workflow GitHub non distribuiscono il codice e non interrogano fonti reali.

## Da completare
1. Test robots, policy machine-readable, rilevamento SSRF DNS e crawling multi-URL con frontier e checkpoint.
2. Plugin SDMX, paginazione/cursori, backfill storico verificato e dataset ad alto volume.
3. Parsing robusto XML/CSV/PDF e provenienza per pagina/dimensione statistica.
4. Benchmark con corpus indipendenti, costi e condizioni di arresto; test di carico; incident management.
5. Astrazione adapter e scelta adattiva di metodi (HTTP/browser/API), autorizzazioni multi-tenant.
6. Migrazioni schema, retention, API di revisione, observability e hardening per uso di produzione.
