# AzubiPass Social · Review der Korrekturen G03–G05

14.10.2026 · ChatGPT → Lukes → Claude  
Repository: EinsSkill/AzubiPass-Social  
Geprüfter Commit: `9bfd2932a0ded3fef405b7de63e12bfc6c5554b5`  
Vergleich: `9039160`; main: `0c472bb20b602e46d154af0828502bed41b636d4`.

## Ergebnis

**Gezielte Nachbesserung nötig. Keine vollständige Abnahme des Pakets empfohlen.**

G04 ist im geprüften Umfang behoben. Die wesentliche Versandklärung von G03 funktioniert, einschließlich echter lokaler Transaktionskonkurrenz. G05 setzt den gewünschten Zustand, hat aber noch eine Lücke beim gemeinsamen Nachladen. Drei Befunde bleiben: G06 Dateiintegrität, G07 Freigabe nach unvollständigem Nachladen und G08 fehlende Bereinigung beim Verwerfen nach sicherer Ablehnung.

Vorheriger Beitrag: Claude, freigegebene Umsetzung einschließlich berichteter Supabase-Migrationen. Meine Rolle: Review. Keine Anwendungsänderung, kein Commit/Push, keine Migration auf der verbundenen Instanz, kein Merge, Deployment oder Öffnen; `entscheidungen.md` unverändert. Lokal vom Funktionstest erzeugte Build-Zeitstempel und Cache-Hashes wurden nach Prüfung auf den geprüften Stand zurückgesetzt. Arbeitsbaum am Ende sauber.

**Branchbewegung:** Während der Prüfung wurde `community-zugang` auf `26ba35779214b81ec5befed992b00a0f9534702a` weitergeschoben. Der zusätzliche Commit enthält ausschließlich Spec 06 v2, deren Technikplan und Übergabe. Anwendungsquellen und Migrationen sind gegenüber `9bfd293` unverändert. Die Befunde beziehen sich ausdrücklich auf `9bfd293`. Der neue Moderationsplan wurde zur Einordnung gelesen, nicht vollständig technisch geprüft.

## G06 · Dateischutz ist nicht für alle Schreib-/Löschwege abgesichert — hoch

Belege: `20261014122116_vorgang_endstatus.sql`, `datei_in_gebrauch` und Löschpolicy; `20261014122131_senden_mit_endstatus.sql`, Dateizeilensperre; weiterhin vorhandene Insert-Rechte aus `20261008131613_rechte.sql` und Policy aus `20261013151445_paketsperre_regeln.sql`.

**Fall A, ursprüngliche RPC gegen direktes SQL-DELETE:** Verbindung A veröffentlicht einen Lernzettel mit der unveränderten RPC innerhalb einer noch offenen Transaktion. Sie hält die Dateizeile mit `FOR SHARE`. Verbindung B beginnt einen berechtigten DELETE derselben Speicherzeile. Der Policy-Aufruf sieht zu diesem Zeitpunkt noch keinen festgeschriebenen Beitrag. B wartet auf A. Nach A-COMMIT löscht B trotzdem die Speicherzeile. Ergebnis: ein Beitrag, null Speicherobjekte. Die Behauptung, `volatile` allein bewirke nach jeder Sperrwartezeit eine erneute Policy-Prüfung, stimmt für diesen Ablauf nicht. Kontrollfall: Ein erst nach dem Commit gestarteter DELETE löscht nichts.

**Fall B, noch erlaubter direkter Beitrags-INSERT:** A löscht eine unverknüpfte eigene Speicherzeile in einer offenen Transaktion. B legt mit der Rolle `authenticated` und den tatsächlich gewährten Spaltenrechten einen Lernzettelbeitrag mit genau diesem Dateipfad an. Dieser alte Insert-Weg prüft weder Existenz noch Sperre der Datei und wartet nicht auf A. Nach beiden Commits bleibt wieder ein Beitrag ohne Speicherobjekt. Es handelt sich um den weiter erlaubten Tabellenzugriff, nicht um eine Wartungsaktion als Administrator. Der Client nutzt diesen Weg weiterhin für Gruppen-Datenschichttests; serverseitig ist die Beitrags-Insert-Policy nicht auf diesen Testzweck begrenzt.

**Beweisgrenze:** Nachgestellt auf echtem lokalem PostgreSQL 18.4 mit originalen Repo-Migrationen, nachgebildetem Auth-/Storage-Basisschema und echten RLS-Prüfungen. Kein Ende-zu-Ende-Versuch gegen den eingesetzten Storage-Dienst. Dieser Unterschied ist relevant: Supabase Storage v1.28.0 führt bei `deleteObjects` ein direktes DELETE aus, der zum Prüfzeitpunkt gelesene master sperrt die Objekte dagegen vor der Berechtigungsprüfung. Eine tatsächlich ausnutzbare Variante von Fall A am aktuellen Projektendpunkt wurde nicht bestätigt. Fall B zeigt unabhängig davon die fehlende Dateiprüfung und Sperre am erlaubten Insert-Weg.

**Auftrag an Claude:** Dateiintegrität an allen erlaubten Anlegewegen erzwingen oder den alten direkten Weg schließen. Löschschutz nach dem Erwerb der relevanten Sperre prüfen; die konkrete Strategie zuerst vorlegen. Anschließend echte parallele Prüfung gegen die eingesetzte Datenbank und Storage-API, einschließlich beider Reihenfolgen und geschlossener Paketsperre. Kein pauschales Vertrauen in einen `volatile`-Policy-Aufruf oder in eine nicht festgestellte Dienstversion.

## G07 · Nachladefehler gibt Lösungsaktionen zu früh frei — mittel

Beleg: `quellen/community-beitraege.js`, `loesungNeuLaden`, Zeilen 606–622, sowie `laden` und `loesenKnopf`.

Der Beitragskopf und die Antworten werden unabhängig geladen. Schlägt nur der Kopfabruf fehl, erscheint zwar „Der aktuelle Stand konnte nicht geladen werden.“ mit „Erneut laden“. Der erfolgreiche Antwortabruf zeichnet jedoch sofort wieder aktive Markierknöpfe. Der Kopf bleibt dabei veraltet. Nachgestellt im echten Formular mit simulierten Antworten: Fehler sichtbar, „Markierung entfernen“ aktiv, Markieren der anderen Antwort ebenfalls aktiv. Auch Claudes beigefügtes Bild `c05-nachladefehler-beste-antwort.png` zeigt die aktiven Knöpfe neben der Fehlermeldung.

Schlägt umgekehrt nur der Antwortabruf fehl, erscheint der allgemeine Antwortladefehler mit „Erneut versuchen“; der zugesagte gemeinsame Wiederholungsweg „Erneut laden“ fehlt.

**Auftrag an Claude:** Kopf und Antworten als gemeinsamen bestätigten Nachladestand behandeln. Bis beide erfolgreich und noch berechtigt geladen sind, alle Lösungsaktionen gesperrt halten. Ein gemeinsamer Fehler-/Wiederholungsweg lädt ausschließlich neu. Die beiden einseitigen Fehlerfälle, beide Antwortreihenfolgen und verlorene Schreibbestätigung prüfen.

## G08 · Verwerfen nach sicherer Ablehnung hinterlässt den Upload — mittel

Beleg: `community-beitraege.js`, `abbrechen`, Zeilen 1359–1372; `community.js`, `vorgangKlaeren` und `veroeffentlichen`.

Nachgestellt: Lernzettel auswählen → Upload gelingt → Veröffentlichungs-RPC lehnt sicher mit P0001/Spam-Bremse ab → „Abbrechen“ → „Eingaben verwerfen“. Der Entwurf wird entfernt, ohne den Vorgang zu klären oder seine Datei zu bereinigen. Ergebnis im Browser-Mock: eine Datei, null Beiträge, null Löschaufrufe, null Klärungsaufrufe.

Diese Datei bleibt auch dann liegen, wenn keine Kontoumstellung und kein fehlgeschlagener Löschversuch vorliegen. Die dokumentierten Grenzen sind damit unvollständig. Das ist eine Ressourcen-/Bereinigungsfrage; eine Veröffentlichung oder Datenschutzverletzung wurde in diesem Fall nicht festgestellt.

**Auftrag an Claude:** Beim endgültigen Verwerfen eines bereits versuchten Entwurfs erst den bisherigen Vorgang sicher klären. Nur bei `verworfen` bereinigen; `angelegt` als bereits erfolgten Versand behandeln. Bei unklarer Klärung keinen erfolgreichen endgültigen Abbruch behaupten. Alternativ muss Lukes eine konkret beschriebene zusätzliche Bereinigungsgrenze bewusst akzeptieren; die Datei darf dann nicht als gelöscht ausgegeben werden.

## Antworten auf die fünf gezielten Prüfpunkte

| Punkt | Ergebnis |
|---|---|
| 1 · `sicherAbgelehnt` | Codefreie 502/503/504, Abbruch und PGRST000/PGRST003 liefern korrekt false. SQLSTATE-Beispiele P0001/23514 liefern true. Die pauschale PGRST1xx/2xx/3xx-Regel ist weiter als „bekannte Ablehnung vor Ausführung“: Auch ein unbekannter PGRST199 mit HTTP 503 wird als sicher klassifiziert. Empfehlung: explizite erlaubte Codes mit begründeter Nichtausführung/Rollback statt eines offenen Gruppenmusters. Kein tatsächlicher PostgREST-Commit trotz eines solchen Fehlers in diesem Review nachgewiesen. |
| 2 · Senden gegen Klären | Lokal mit zwei echten Verbindungen bestätigt: Versand zuerst + Commit → angelegt; Versand zuerst + Rollback → verworfen; Klären zuerst + Commit → späterer Versand abgebrochen. Die gemeinsam festgeschriebene Vorgangs-/Inhaltsanlage passt. |
| 3 · Dateien | Serielle Löschung einer benutzten Datei wird blockiert. Parallele und alte direkte Wege sind nicht vollständig abgesichert (G06). Zusätzlich Verwerfen nach Ablehnung ohne Bereinigung (G08). Bekannte Grenzen Kontowechsel und Löschfehler bleiben bestehen. |
| 4 · G04 | Radio/Art, Titel, Text, Lernfeld, Kapitel, Mentor:innen, Datei, Entfernen und Antwortfeld sind per readOnly/disabled samt Ereignisprüfungen gesperrt. Senden, Prüfen, Klären und unklar führen dieselbe Feldsperre. Versandstand entsteht vor der Freigabeprüfung. Rückweg und globale Tabs sind nicht in der Feldsperre. Keine echte Geräte-/Screenreaderprüfung. |
| 5 · Texte | Überwiegend übernehmen; zwei Präzisierungen unten. |

**Fehlereinstufung:** Die offizielle PostgREST-Dokumentation unterscheidet Verbindungs-, Anfrage-, Schema- und JWT-Fehler. Die Anfragegruppe enthält auch HTTP-500-Fehler bei der Antwortbildung. Aus einem bloßen Gruppenpräfix folgt deshalb nicht die im Kommentar behauptete Ablehnung *vor* Ausführung. Bekannte PostgREST-Fehler können trotzdem einen Rollback bedeuten; hier wird kein konkreter Commit trotz PGRST111/112/121 behauptet.

## Texte

Übernehmen: „Der Beitrag/Die Antwort wurde noch nicht gefunden. Der Ausgang ist weiterhin unklar.“; „Erneut senden“; „Eingaben ändern“; „Wird geklärt …“; bestätigte Verwerfungsnachricht; Hinweis zur Feldsperre; Markierungsprüfung; sichtbarer Nachladefehler mit „Erneut laden“ nach G07.

Zwei Empfehlungen:

1. „Eingaben ändern bricht den offenen Versuch endgültig ab“ durch „Mit ‚Eingaben ändern‘ prüfen wir den offenen Versuch. Wurde noch nichts veröffentlicht, wird er endgültig verworfen.“ ersetzen. Die bisherige Zusage ist zu absolut: Die Klärung kann `angelegt` liefern und den vorhandenen Beitrag öffnen. Für Antworten „gesendet“ statt „veröffentlicht“.
2. Als allgemeinen Sperrhinweis „Solange der Versand läuft oder sein Ergebnis unklar ist, kannst du deine Eingaben nicht ändern.“ verwenden, falls er auch beim Prüfen/Klären sichtbar sein soll. Der jetzige reine Versandhinweis ist im Versandzustand passend.

## Spec 06 §9 · Abgleich mit deinen Antworten

Die vier Fragen aus v1 sind inzwischen durch deine Fragerunde und Spec v2 überholt. Als Rückmeldung zur ursprünglichen v1: Bedienung grundsätzlich ja; gebündelte reversible Teamentscheidungen ja; keine neuen Protokolldaten **nicht übernehmen**, weil die folgenden bereits getroffenen Entscheidungen neue Daten verlangen; konkreten Technikplan vor Einspielen ja. Die bekannte Drei-Personen-Schwelle und gesonderte Paketöffnung werden dadurch nicht geändert.

Bereits von dir entschieden, keine erneute Frage:

| Thema | Deine Entscheidung |
|---|---|
| Fachliche Korrektur | Gekennzeichnete Teamantwort unter dem Beitrag |
| Eigene ausgeblendete Inhalte | Eigener Text und eigene Datei samt verständlicher Begründung |
| Erneute Prüfung | Direkt am ausgeblendeten Inhalt; kurze Begründung Pflicht; einmal pro Ausblendungsentscheidung |
| Aufmerksamkeit | Hinweis mit Anzahl direkt in der App |
| Reihenfolge | Potentiell schädliche Inhalte zuerst, danach älteste Fälle |
| Meldestatus | Offen / Abgeschlossen |
| Direkter Eingriff | Am Beitrag oder an der Antwort ausblenden können, auch ohne Meldung |
| Ausblendungsgrund | Passende Vorlage auswählen, bei Bedarf ergänzen |

Während dieses Reviews wurde `26ba357` mit Spec v2 und Claudes neuem Technikplan angelegt. v2 §9 verlangt nun die Gesamtprüfung der konkreten Ergänzungen; die alten vier Fragen sind dort nicht mehr offen. Der Technikplan enthält separat E1–E14. Weder diese neue Detailauswahl noch dessen Datenbankmigrationen sind durch meinen G03–G05-Review freigegeben. Besonders die Aufbewahrung, das echte Teamkonto und die Planfreigabe sind keine von mir zu erratenden persönlichen Entscheidungen. G06–G08 sollten vor der technischen Wiederverwendung der Versandmuster berücksichtigt werden.

## Selbst ausgeführte Prüfungen und Grenzen

| Prüfung | Ergebnis |
|---|---|
| `community_korrekturen_test.py` | 40/40 bestanden, alle simulierten Serverantworten; vier axe-core-4.10.2-Prüfungen ohne WCAG-Verstöße |
| Eigene Formularfälle | G07 beide einseitigen Nachladefehler; G08 Verwerfen nach Ablehnung reproduziert |
| `sicherAbgelehnt` im unveränderten JS | 13 Kombinationen von Fehlercode/HTTP-Status ausgeführt |
| Repo-SQL-Prüfung | Erwartete Ergebnisfolge lokal bestätigt; Transaktion vollständig zurückgerollt |
| Zusätzliche echte lokale SQL-Konkurrenz | Die drei Senden/Klären-Reihenfolgen korrekt; beide Dateilücken reproduziert; serielle Löschung blockiert |
| `funktionstest.py` | 269/269 bestanden, einschließlich Build-Prüfung |
| `lernkern_audit_test.py` | 51/52 bestanden; Buchführung K6 bei 320 px: scrollWidth 321 |
| Vergleich des Überlaufs | A09 auf `9039160` zeigt exakt denselben Ein-Pixel-Überlauf; keine neue Regression dieser Korrekturen |
| `pruefe.py app.html landing.html buchfuehrung.html` | 0 Fehler bei Handy/Desktop, Hell/Dunkel |
| Git/Build | Gebaute Community-Module bytegleich mit Quellen; finaler Arbeitsbaum sauber |

Browser: lokaler Headless-Chromium 153 über Playwright; die Testmodule wurden nicht verändert, nur der Browserpfad und Startparameter extern gesetzt. PostgreSQL 18.4 läuft ausschließlich lokal; Auth-/Storage-Grundstrukturen sind ein Testnachbau, die Community-Migrationen original. Das Ergebnis bestätigt keine tatsächlich eingespielten Live-Schemata, Supabase-Dienstversion oder Storage-Ende-zu-Ende-Sicherheit. Die vier Community-Livesuiten wurden ohne Testpasswort nicht ausgeführt. Keine echten Geräte, kein Screenreader, kein Mail-Link Ende zu Ende.

## Nächste Übergabe

Lukes → Claude: G06–G08 gegen den aktuellen Branch bestätigen, konkrete Dateischutzänderung vorlegen und danach den freigegebenen Umfang korrigieren. C01/Fehlereinstufung konservativ präzisieren. Tests um echte Konkurrenz und die einseitigen Nachladefehler ergänzen. Reale und simulierte Belege getrennt zurückgeben. Alter Umschaltweg ist per revoke geschlossen; dessen zusätzliches DROP ist für die neue UI-Funktion kein technischer Blocker.

Das ist eine Review-Empfehlung. Kein Merge, Deployment, Öffnen der Paketsperre oder Einspielen des neuen Moderationsplans folgt daraus.

## Quellverweise

- [Geprüfter Commit](https://github.com/EinsSkill/AzubiPass-Social/commit/9bfd2932a0ded3fef405b7de63e12bfc6c5554b5)
- [Oberfläche am geprüften Commit](https://github.com/EinsSkill/AzubiPass-Social/blob/9bfd2932a0ded3fef405b7de63e12bfc6c5554b5/quellen/community-beitraege.js)
- [Datenschicht am geprüften Commit](https://github.com/EinsSkill/AzubiPass-Social/blob/9bfd2932a0ded3fef405b7de63e12bfc6c5554b5/quellen/community.js)
- [PostgreSQL: Row Security Policies, Konkurrenzhinweise](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [PostgREST: Fehlergruppen](https://docs.postgrest.org/en/stable/references/errors.html)
- [Supabase Storage v1.28.0: object.ts](https://github.com/supabase/storage/blob/v1.28.0/src/storage/object.ts) und [knex.ts](https://github.com/supabase/storage/blob/v1.28.0/src/storage/database/knex.ts)
- [Supabase Storage master: object.ts](https://github.com/supabase/storage/blob/master/src/storage/object.ts), gelesenes Blob `5c616e0f079b67f2f4433ecb24602a15a82fe274`; nicht als Projekt-Dienstversion behauptet
- [Neuere Dokumentationsübergabe 26ba357](https://github.com/EinsSkill/AzubiPass-Social/commit/26ba35779214b81ec5befed992b00a0f9534702a)
