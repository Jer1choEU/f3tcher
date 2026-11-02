# 26 — Pilota 02 eseguito: baseline HTTP/parser, denominatori e falsa completezza

**Data:** 2026-11-02. **Stato:** **ESEGUITO su ambiente sintetico locale**, esplorativo, **NON benchmark scientifico indipendente**. È una prosecuzione circoscritta e gratuita del [pilota 01](25_PILOTA_SINTETICO_RISULTATI.md) e del [protocollo 24](24_PROTOCOLLO_VALIDAZIONE_SCIENTIFICA.md). Non è stato sviluppato alcun motore f3tcher, scelto stack, attivato un server pubblico, usata una fonte esterna o speso denaro cloud. Il progetto continua ad aspirare a **un solo sistema automatico senza profili selezionabili**.

**Codice e report dati:** [experiments/pilot02/](../experiments/pilot02/README.md) — [publisher/fixture](../experiments/pilot02/fixtures.py), [acquisitori](../experiments/pilot02/clients.py), [valutatore](../experiments/pilot02/benchmark.py), [4 test](../experiments/pilot02/test_pilot.py), [traccia di 108 casi](../experiments/pilot02/results_trace.json). I file sono riproducibili da console con Python, utilizzano **solo 127.0.0.1** e hanno blocchi contro richieste esterne e redirect. Il trace GitHub conserva gli esiti e i bytes, ma **omette deliberatamente il tempo locale rumoroso**; \`python benchmark.py > results.json\` ricrea anche le misure di durata, non idonee a classifica.

## 1. Design effettivamente eseguito

- **9 tipologie**: HTML-only, API-only, HTML+API complementari, HTML+API ridondanti, collezione troncata con totale corretto, collezione troncata con **totale del publisher falso**, collezione senza inventario, risultato legittimamente vuoto, accesso negato HTTP 403.
- **3 seed fissi** \`271828, 314159, 161803\`: gli identificativi dei record cambiano, **la difficoltà e le proporzioni non cambiano**. Ne risultano 27 casi e **4 metodi** per caso = 108 valutazioni, **NON 108 campioni indipendenti**.
- **4 metodi**: \`stdlib_urllib_html\` (HTMLParser standard), \`requests_bs4_html\` (Requests+Beautiful Soup), \`requests_lxml_html\` (Requests+lxml), \`requests_bs4_hybrid\` (HTML + API pubblicizzata in HTML, Requests+Beautiful Soup+JSON). Quest'ultimo è una semplice **unione**, NON un AI router.
- **Versioni misurate**: Python 3.13.5, Requests 2.32.5, Beautiful Soup 4.14.3, lxml 6.1.1.
- **Gold sha256:** \`1d199af356231e90632c0c6ec1ad2583ad19f583fbf4ad885c0bce36f58915d9\` sul manifest canonico definito in \`fixtures.py\`.
- **4 test di unità eseguiti con esito OK**: riproducibilità inventario/id univoci, blocco URL fuori scopo, HTTP 403 senza retry, verifica esiti e false complete. In particolare **nessun retry dopo 403**, nessun bypass.

**Limite di validità:** \`clients.py\` non può leggere o importare \`fixtures.py\`; il gold viene esposto al solo publisher simulato e al valutatore. Ma **fixture e metodi sono stati scritti nello stesso progetto e autore**: questo è *isolamento procedurale*, non un gold corpus creato indipendentemente né un *holdout* scientemente blindato. Non usare la parola «indipendente» senza questa qualifica, e non inferire intervalli di confidenza da tre semi che modificano solo gli ID.

## 2. Risultati (misure del simulatore, non del Web reale)

Escludendo le collezioni **403** dalle risorse acquisibili, il manifest contiene **240 record gold** di sorgenti non negate; **195 di questi sono disponibili realmente attraverso i canali HTTP HTML/API implementati nel publisher**. I **45 restanti** non sono esposti da alcuno dei due canali, quindi sono utili a verificare l'onestà del claim *complete*, non per pretendere che un crawler li recuperi magicamente. Altri **24 record gold** dei tre casi \`denied\` sono fuori perimetro lecito e non entrano nei denominatori di acquisizione.

| Metodo | Asset/record raggiungibili trovati | Recall su 195 raggiungibili | Recall su 240 gold non negati | GET sul server locale | Byte restituiti |
|---|---:|---:|---:|---:|---:|
| stdlib urllib + HTMLParser | **135** | 69,23% | 56,25% | 42 | 21.567 |
| Requests + Beautiful Soup solo HTML | **135** | 69,23% | 56,25% | 42 | 21.567 |
| Requests + lxml solo HTML | **135** | 69,23% | 56,25% | 42 | 21.567 |
| Requests + Beautiful Soup + API | **195** | 100% | 81,25% | 78 | 29.217 |

Il guadagno è **+60 record noti** rispetto a una baseline HTML, **+36 GET** (+85,7%) e **+7.650 byte** (+35,5%) in questa fixture. In alcuni gruppi, come \`redundant\`, il secondo canale aggiunge **zero** risorse e costa di più. I tre parser HTML hanno la medesima copertura perché il testbed ha un markup semplice, non perché siano equivalenti per tutti i siti.

**Nota critica:** «100% dei raggiungibili» è vero **solo perché il valutatore conosce tutti i canali di questo simulatore**. Non equivale al 100% della fonte, e tanto meno del Web. Non utilizzare questi risultati per marketing, fattibilità scientifica, superiorità rispetto a Scrapy/Crawlee o dimensionamento infrastrutturale.

### 2.1 Esito più importante: falso «complete» per conteggio sbagliato

Nella fixture \`deceptive_total\`:
- gold = **10** record;
- i due canali pubblicano soltanto gli stessi **7**;
- il publisher dichiara **declared_total=7** anziché 10;
- il metodo ibrido conclude **\`complete_within_declared_count\`**, ma rispetto all'inventario gold ha perso **3**.

Questo accade nei tre semi, cioè **3 false complete su 12 complete dichiarate**. Il rapporto 25% è una descrizione del **testbed costruito apposta**; **non** una stima del tasso generale di errore dell'algoritmo o dei dati aperti.

La fixture \`truncated\` ha gold 12, disponibili 4, **declared_total corretto=12**: l'ibrido segnala **incomplete**. La fixture \`empty\` è veramente vuota e viene marcata **unknown**, evitando di inventare una recall \`0/0\` pari a 100%. La collezione \`denied\` produce 403 e ciascun client si ferma dopo **una singola richiesta**.

**Interpretazione:** un conteggio del publisher può rilevare omissioni quando non torna. Se torna, tuttavia, **non prova che il publisher abbia incluso tutte le informazioni**. La validazione richiede evidenze indipendenti da quella vista, se disponibili, o astensione motivata.

## 3. Confronto con il protocollo 24 e con il pilota 01

- **Pilota 01:** 4 corpora semplici, gold 54, tre metodi, 2 test, un run; prima prova di fattibilità.
- **Pilota 02:** 9 tipologie, tre seed, 4 metodi, 4 test, 108 valutazioni; separa denominatori (gold corpus vs disponibilità reale), verifica 403, false complete, bytes e incremento di richieste.
- **Restano aperti G2/G3 del protocollo 24:** manca un **holdout indipendentemente progettato**, metodi/budget congelati prima di un test realmente inferenziale, Scrapy/Crawlee in ambiente installabile, confronto browser JS/SPA, versioni/storico e misure robuste di tempi/costi. I tre seed non soddisfano requisito di repliche scientificamente indipendenti.
- La scelta di baseline installabili deriva dall'ambiente: Scrapy non è disponibile e il tentativo di interrogare il registro dei pacchetti è fallito per DNS; inoltre la prova Playwright/Chromium del pilota 01 era stata bloccata dalla policy locale. **Non attribuire prestazioni pari a zero** alle tecnologie non testate.

L'analisi della documentazione ufficiale di Scrapy conferma che è una baseline appropriata da provare su un ambiente con dipendenze installabili: https://docs.scrapy.org/en/latest/intro/install.html . L'uso di Requests e BeautifulSoup in questo pilota **non sostituisce un vero confronto fra crawler**.

## 4. Conclusioni scientificamente ammissibili e prossima decisione

**Evidenze limitate del pilota:** il benchmark framework di acquisizione/valutazione registra correttamente differenze fra canali e denominatori; l'unione può recuperare più ID quando pubblicati su canali diversi, con un costo addizionale; un conteggio falsificato dal publisher induce un falso senso di completezza. Non esiste ancora prova che un selettore intelligente riduca il costo senza perdere record, né che i parser moderni siano migliori.

**Prossimo passo discriminante:** realizzare un vero **holdout esterno o separatamente curato** che includa **casi dove l'API non aggiunge alcun valore, endpoint/versioni che cambiano, paginazione instabile, eventi non recuperabili e un gold indipendente dalle implementazioni**; solo allora confrontare strumenti crawler completi su un host controllato con browser disponibile. Preparare prima la preregistrazione e le condizioni di accesso. Nessuna architettura f3tcher o stack scelto.

**Stato operativo:** due pilot esplorativi eseguiti, **nessuna prova confermatoria o sistema in produzione**, nessun sito terzo crawled, nessun cloud attivato.
