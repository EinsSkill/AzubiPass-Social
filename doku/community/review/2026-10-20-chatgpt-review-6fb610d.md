# Gegenprüfung Lernstand-Korrekturen · ChatGPT · 20.10.2026

**Ergebnis:** LS01 und die ursprünglichen Nachstellungen S01–S03 bestehen. H02 ist im Test richtiggestellt. Die neue Aktualisierung offener Lernzettelseiten verursacht jedoch **LS03 (hoch): Nach einer Übernahme aus einem anderen Tab werden neue Selbsttest-Eingaben nicht mehr gespeichert.** Vor Merge des Gesamtstands diesen einen belegten Restfehler beheben.

**Vorgänger:** Claude, `6fb610d`, Umsetzung LS01/LS02 und H02 nach Review `f325191`.
**Rolle:** gezielte Gegenprüfung, einschließlich betroffener Lernkern-/Sicherungswege; keine Umsetzung.
**Geprüfter Anwendungsstand:** `6fb610d2e3eb1577879e6457e4e518ccf1ba42da` auf `community-zugang`.
**Grundlagen:** AGENTS.md, README.md, neueste Übergabe, Claudes Korrekturbericht, vorheriges Review und Reproduktionen; Diff `f325191` → `6fb610d`, insbesondere kern.js, lernstand-sync.js, azubipass.js und die neuen Tests. Aktuelle Repository-Quellen genügen für diesen technischen Folgeauftrag; kein neuer persönlicher Kontext nötig.

## Bestätigte Korrekturen

- **LS01:** Konto-Zuordnung entsteht jetzt vor einem erfolgreichen Serverabgleich, auch aus der gespeicherten Sitzung. Der Wechsel trennt den Stand; ungesendete Daten werden für das bisherige Konto zurückgelegt. Die 64 bestehenden/neuen Lernstand-Fälle bestehen unabhängig, einschließlich Rückkehr zu A, verlorener erster Speicherantwort und Neustart ohne Netz.
- **Ursprüngliche LS02-Nachstellungen:** Meine unveränderten Kernabläufe S02/S03 verlieren die Lesezeichen nicht mehr. Das Kapitel-Lesezeichen bleibt erhalten; nach Änderungen in zwei App-Tabs enthält der Server beide neuen Lesezeichen. [S01–S03-Rohbeleg](2026-10-20-chatgpt-6fb610d/s01-s03.log). Die neue Regression LS03 betrifft die bereits gebundenen Aufgabenobjekte im Kapitel.
- **H02:** Der Moderationstest wartet jetzt auf das tatsächliche Falldetail; Originalsuite **128/128**. Keine zusätzliche Warte-Probe mehr nötig.
- **F01/F02:** bleiben gemäß vorheriger Gegenprüfung abgeschlossen; keine Datenbankänderung in diesem Commit. Gruppen-Mock einschließlich F01 erneut **47/47**.

## LS03 · hoch · Selbsttest-Eingaben nach Aktualisierung aus anderem Tab gehen verloren

**Ort:** `quellen/kern.js` 287–297 (`einsetzen`), aufgerufen über `kontoAuffrischen`/`nachFremdemSchreiben`; `quellen/azubipass.js` 536–580 (`selbsttest`, gespeichertes `gemerkt`).

`einsetzen()` erhält zwar das äußere Kapitelobjekt `f`, ersetzt dessen Eigenschaften aber vollständig. Dadurch werden unter anderem `f.test` und seine einzelnen Aufgabenobjekte ausgetauscht. Ein bereits aufgebauter Selbsttest hält das alte Aufgabenobjekt in seiner Closure `gemerkt` fest (`aufgabenstand(...)`). Nach der Übernahme schreibt das Eingabe-Ereignis weiterhin `gemerkt.t`, während `AP.sichern()` den neuen, davon getrennten Aufgabenstand serialisiert. Das Textfeld zeigt deshalb die neue Antwort an, der gespeicherte Stand enthält die alte Antwort.

### Unabhängige Reproduktion mit echter Lernzettelseite und echten Eingabe-Ereignissen

1. `lf1.html#k1` öffnen und in die erste Selbsttest-Antwort **„Antwort vor Abgleich“** tippen; lokal speichern.
2. Im selben Browser einen App-Tab öffnen und dort ein neues Lesezeichen setzen. Das löst im weiter geöffneten Kapitel die neue Übernahme des gemeinsamen Lernstands aus.
3. In derselben, nicht neu geladenen Kapitelansicht **„Neue Antwort nach Abgleich“** in das Textfeld tippen und speichern.
4. Das Eingabefeld zeigt den neuen Text. Sowohl `AP.stand.fortschritt['lf1-k1'].test` als auch der tatsächliche `localStorage` enthalten weiter **„Antwort vor Abgleich“**.
5. Kapitel neu laden: Im Textfeld erscheint wieder die alte Antwort. Die neue Eingabe wurde trotz ausgeführtem Speichern verloren.

Es wurden die unveränderten App-/Kapitelmodule, ein echtes Textfeld (`fill`, damit echtes input-Ereignis) und zwei Tabs mit gemeinsamem Browser-Speicher benutzt. Nur die Community-Schnittstelle ist simuliert; keine produktiven Konten oder Daten.

**Gegenprobe:** Derselbe Ablauf auf `2d2f478` speichert die neue Antwort und zeigt sie nach Neuladen an. Dieser konkrete Eingabeverlust ist eine Regression der neuen Übernahme; der alte Stand hatte daneben die bereits bekannten Probleme mit fremden Tab-Änderungen.

- [Reproduktion](2026-10-20-chatgpt-6fb610d/kapitel-probe.py)
- [Neuer Stand: neue Antwort verloren](2026-10-20-chatgpt-6fb610d/kapitel-probe.log)
- [Alter Stand: neue Antwort bleibt](2026-10-20-chatgpt-6fb610d/kapitel-probe-alt.log)

### Gezielter Korrekturauftrag

Sicherstellen, dass bereits gebundene Aufgaben-/Eingabeobjekte nach der Übernahme in den aktuell gespeicherten Lernstand schreiben. Die Referenz auf das äußere Kapitel allein genügt nicht. Die Strategie kann Claude wählen; offene Eingaben und die Kontotrennung müssen erhalten bleiben. Derselbe Referenzmechanismus wird auch von Checks und Zuordnungen benutzt und gehört in die gezielte Abnahme, ohne hier einen ungeprüften weiteren Fehler zu behaupten.

**Abnahme:** Den oben beschriebenen Fall als Regressionstest mit echter Kapiteloberfläche aufnehmen; neue Antwort muss im Arbeitsspeicher, lokalen Speicher, nach Neuladen und beim nächsten Kontoabgleich erhalten bleiben. Bei bereits geöffnetem Kapitel zusätzlich Selbsttest-Bewertung, Checks und Zuordnungen nach Übernahme testen. Eine weitere Übernahme darf die Bindung nicht wieder lösen. S01–S03, Kontowechsel und die bisherigen 64 Lernstand-Fälle weiter bestehen lassen. Keine erneute allgemeine R04–R07-Runde.

## Unabhängige Prüfungen

| Prüfung | Ergebnis |
|---|---|
| `lernstand_sync_test.py`, axe 4.10.2 | **64/64** |
| Eigene ursprüngliche Nachstellungen S01–S03 | frühere Fehler nicht mehr reproduzierbar |
| Neue Kapitelprobe einschließlich Altvergleich | **LS03 reproduziert** |
| Gruppen-Mock einschließlich F01 | **47/47** |
| Korrekturen-Mock | **97/97** |
| Moderations-Mock mit H02 | **128/128** |
| `funktionstest.py` einschließlich Build/Sicherungswege | **269/269**, reproduzierbarer Bestand |
| `pruefe.py --schnell` | keine Fehler; acht bekannte offene Inhalts-Prüfmarker |
| `lernkern_audit_test.py` | **51/52**, allein bekannter Altbefund: Buchführung K6 bei 320 px ist 321 px breit |

Die Abweichung zu Claudes 52/52 wurde nicht verschwiegen: Derselbe 1-Pixel-Überlauf ist bereits in den früheren unabhängigen Reviews belegt. Kein neuer Korrekturauftrag daraus. Die allgemeine Testsuite deckt den konkreten Ablauf „Kapitel offen → externer Stand übernommen → erneut tippen“ bisher nicht ab; die grünen Tests entkräften LS03 daher nicht.

[Rohprotokolle](2026-10-20-chatgpt-6fb610d/). Quellen und gebaute JS-Module wurden verglichen; lokale Build-Zeitstempel werden nicht in die Übergabe übernommen.

## Grenzen und nächster Schritt

- Keine Anwendung, Migration oder produktive Datenbank verändert. Keine neue SQL-Runde: Supabase-Code gegenüber dem zuvor lokal geprüften Stand unverändert. Keine eigenen Live-Konto-/Storage-/Mail- oder Zwei-Geräte-Prüfungen.
- H03 (neuere axe-Version) bleibt der bereits dokumentierte Nebenbefund. Hier mit dem im Projekt verwendeten axe 4.10.2 geprüft; kein neues Urteil über den 4.14-Lauf und keine Änderung der Knöpfe.
- Brevo, Datenschutzangaben und der veraltete Community-Datenschutzabschnitt sowie die gesonderte Paketöffnung bleiben Betriebs-/Freigabeaufgaben.
- **Nächster Schritt:** Claude behebt gezielt **LS03**, danach Gegenprüfung des Kapitel-Speicherwegs. Kein erneuter Auftrag zu LS01, H02 oder F01/F02, solange die Korrektur diese Wege nicht verändert. Gesamtstand noch nicht zum Merge empfohlen; fachliche Freigaben bleiben Lukes vorbehalten.
