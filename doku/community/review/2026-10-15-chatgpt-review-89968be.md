# AzubiPass Social – Gegenprüfung von 89968be

Datum: 15.10.2026  
Repository: EinsSkill/AzubiPass-Social  
Branch: `community-zugang`  
Geprüfter Commit: `89968be4a8c02f81f7c55c8e6da0cc390b89a54b`  
Vergleich: `3bed8d13605aa5a1b892c23170e26185813aa3b3`

Vorheriger Beitrag: Claude – G07-Nachbesserungen und Spec-06-Technikplan Version 2.  
Meine Rolle: Gegenprüfung/Review.  
Nächste Übergabe: Claude für drei gezielte Nachbesserungen; anschließend ChatGPT zur Gegenprüfung und Lukes für Entscheidungen.

**Ergebnis: Beide ursprünglich gemeldeten G07-Wege sind behoben. Die vorhandenen 80 Mockprüfungen bestehen unabhängig wiederholt. Ein weiterer G07-Fehlerpfad und zwei Lücken im Technikplan bleiben offen. Eine vollständige technische Abnahme des Pakets empfehle ich daher noch nicht.**

## 1. Bestätigte Korrekturen

- **G07, Antwortversand nach ungeklärtem Lösungsstand:** Bei erfolgreichem Nachladen der Antworten bleiben die Lösungsknöpfe gesperrt. Der gemeinsame Nachladehinweis bleibt erhalten. Erst erfolgreiches gemeinsames Nachladen gibt die Aktionen wieder frei.
- **G07, inzwischen ausgeblendeter Beitrag:** Der neue Kopf baut die Ansicht neu auf. Antwortformular und Lösungsknöpfe verschwinden. Die von Claude noch nicht ausgeführte Gegenprobe habe ich ergänzt: Am alten Stand bleiben zwei Lösungsknöpfe aktiv und „Antwort schreiben“ verfügbar; im neuen Stand verschwinden beide.
- **Plan P2–P5:** Wiederholungen nach abgeschlossener Anfrage, Moderationsversion, ausdrückliche Fehlercode-Liste und atomare Kombination aus Aufheben und Korrektur sind auf Planungsebene passend ergänzt. Das ist keine Abnahme bereits implementierter Moderations-RPCs.
- **E2, E8 und E9:** Die Präzisierungen entsprechen den bisherigen Empfehlungen. Der Prüftermin für das Protokoll ist ein Entscheidungsvorschlag; eine automatische Erinnerung wurde nicht eingerichtet.
- **G08/C01:** Keine Änderung in diesem Commit; die bisherige Bewertung bleibt bestehen.

## 2. R01 – G07: weiterer Nachladefehler entfernt den gemeinsamen Wiederholungsweg

**Priorität: mittel. Reproduziert im Browser mit nachgebildetem Server.**

Quelle: [community-beitraege.js, laden(), Zeilen 598–612](https://github.com/EinsSkill/AzubiPass-Social/blob/89968be/quellen/community-beitraege.js#L598-L612).

Ablauf:

1. Beste Antwort markieren.
2. Beim gemeinsamen Nachladen scheitert der Kopf.
3. Eine Antwort senden; der Server bestätigt den Versand.
4. Nun scheitert auch das anschließende Nachladen der Antworten.

Ergebnis: Die Lösungsknöpfe bleiben korrekt gesperrt. Allerdings leert Zeile 612 die Meldungsbox einschließlich „Erneut laden“. Es bleibt nur „Erneut versuchen“, das ausschließlich `laden()` aufruft und damit nur Antworten lädt. Der gemeinsame Wiederholungsweg wird erst nach einem später erfolgreichen Antwortabruf wieder angeboten.

Gemessener neuer Stand: 0 aktive Lösungsknöpfe, 0 Knöpfe „Erneut laden“, leere gemeinsame Meldungsbox.

**Korrekturauftrag:** Solange `standOffen` gilt, auch im Fehlerzweig den Hinweis auf den ungeklärten gemeinsamen Stand und eine Aktion zu `loesungNeuLaden()` erhalten. Die bestätigte Antwort darf weiterhin als gesendet bezeichnet werden. Ein alleiniger Antwortabruf darf weder die Sperre noch den gemeinsamen Wiederholungsweg entfernen.

**Abnahme:** Genau diese Fehlerfolge testen. Danach „Erneut laden“ ausführen; beide Abrufe müssen erfolgen und erst ihr gemeinsamer Erfolg darf die Lösungsknöpfe freigeben.

## 3. R02 – Plan P1: Wiedererkennung muss nach dem Warten wiederholt werden

**Priorität: mittel. Planbefund; die RPC ist noch nicht implementiert.**

Quelle: [06-technik-plan.md, Abschnitt 4.1, Zeilen 209–224](https://github.com/EinsSkill/AzubiPass-Social/blob/89968be/doku/community/06-technik-plan.md#L209-L224).

Die erste Suche nach der eigenen Meldung erfolgt vor der Thread-Sperre. Für zwei gleichzeitige Erstversuche desselben Kontos sagt der Plan ausdrücklich, dass Schritt 2 nach dem Warten nicht wiederholt wird. Stattdessen soll später der Eindeutigkeitsfehler abgefangen werden.

Das reicht nicht:

- Beide Aufrufe finden zunächst keine eigene Meldung.
- Der erste legt die dritte Meldung an und blendet den fremden Inhalt aus.
- Der zweite erhält danach die Sperre.
- Die Sichtbarkeitsprüfung kann bereits mit `APZ01` abbrechen, bevor der Insert den Eindeutigkeitsindex erreicht.
- Ebenso kann eine inzwischen erreichte Spam-Bremse vor dem Insert abbrechen.

**Korrekturauftrag:** Die schnelle Wiedererkennung vor der Sperre behalten; nach Erwerb der Sperre die eigene Meldung erneut suchen und gegebenenfalls zurückgeben – vor Sichtbarkeitsprüfung und Bremse. Den Eindeutigkeitsindex als zusätzliche Sicherung behalten.

**Abnahme:** Zwei gleichzeitige Aufrufe desselben normalen Kontos auf einen fremden Inhalt mit bereits zwei Meldungen. Genau eine neue Meldung, genau eine automatische Ausblendung, beide Aufrufe erfolgreich erkannt, keine verborgenen Inhaltsdaten im Ergebnis. Zusätzlich dieselbe Konkurrenz mit inzwischen erreichter Bremse prüfen.

## 4. R03 – Plan P6: antwort_senden prüft vor dem Warten

**Priorität: hoch für die Vollständigkeit der geplanten Schreibsperren. Am aktuellen SQL lokal reproduziert.**

Quellen:

- [06-technik-plan.md, Schreibwege-Tabelle, Zeilen 177–188](https://github.com/EinsSkill/AzubiPass-Social/blob/89968be/doku/community/06-technik-plan.md#L177-L188)
- [20261014122131_senden_mit_endstatus.sql](https://github.com/EinsSkill/AzubiPass-Social/blob/89968be/supabase/migrations/20261014122131_senden_mit_endstatus.sql)

Die Tabelle behauptet: `antwort_senden` warte über den Fremdschlüssel und prüfe die Sichtbarkeit danach neu. Die vorhandene Funktion liest und prüft den Beitrag jedoch **vor** dem Insert. Nach dem Warten bei der Fremdschlüsselprüfung folgt keine erneute Sichtbarkeitsprüfung. Der Plan muss eine konkrete Änderung an dieser RPC enthalten.

Lokaler Nachweis mit den unveränderten 21 Migrationen:

1. Verbindung A sperrt den Beitrag `FOR UPDATE` und setzt `versteckt = true`, noch ohne Commit.
2. Verbindung B ruft als freigeschaltetes Testkonto `antwort_senden` auf.
3. B liest zunächst den alten sichtbaren Stand und wartet später tatsächlich auf eine Zeilensperre.
4. A committet.
5. B meldet Erfolg. Endzustand: `versteckt = true`, neue Antwort vorhanden.

Prüfausgabe:

```text
ANSWER_WAITING true
ANSWER_RESULT {"ok":true,...}
FINAL [{"versteckt":true,"answers":"1"}]
```

Das war eine isolierte lokale PostgreSQL-18.4-Datenbank mit nachgebildeten Supabase-Grundobjekten und echten Projektmigrationen. Kein Test am produktiven Supabase-Projekt.

**Korrekturauftrag:** Im Technikplan eine Migration zur Änderung von `antwort_senden` aufführen. Beitrag vor der Sichtbarkeitsprüfung ausdrücklich passend zur gemeinsamen Sperrstrategie sperren und den aktuellen Stand nach dem Warten prüfen. Sperrreihenfolge einschließlich Vorgangszeile festlegen; Wiederholungen eines bereits bestätigten Versands müssen weiterhin ihr gespeichertes Ergebnis liefern. Das Entziehen des direkten Antwort-Insert-Grants ist zusätzlich sinnvoll, ersetzt diese Änderung aber nicht.

**Abnahme:** Beide Reihenfolgen mit zwei Verbindungen: Moderation zuerst → neuer Antwortversuch nach dem Warten abgelehnt, keine neue Antwort; Antwortversand zuerst → definierte Reihenfolge ohne Verklemmung. Wiederholung einer bereits angelegten Antwort nach späterer Ausblendung bleibt idempotent.

Hintergrund zur Sperrsemantik: [PostgreSQL, Row-Level Locks](https://www.postgresql.org/docs/current/explicit-locking.html#LOCKING-ROWS). Das Warten auf eine Fremdschlüsselsperre wiederholt keine zuvor ausgeführte anwendungsfachliche Sichtbarkeitsprüfung.

## 5. Belege und Prüfgrenzen

- `community_korrekturen_test.py`: **80/80 bestanden**, einschließlich der sechs enthaltenen axe-Prüfungen. Echte JS-Module im Chromium-Browser, nachgebildete Supabase-Schnittstelle.
- Zusätzliche Browserprüfung: drei gezielte Fälle jeweils gegen `89968be` und den alten JS-Stand `3bed8d1`. Beide ursprünglichen Fehler am alten Stand bestätigt; R01 am neuen Stand reproduziert.
- Lokale SQL-Konkurrenzprüfung: R03 mit zwei Verbindungen reproduziert. Die verwendeten Migrationen stimmen anhand ihrer Git-Blob-IDs mit dem geprüften Commit überein.
- Die funktionale Gesamtsuite 269/269 wurde in dieser Gegenprüfung nicht erneut ausgeführt; diese Zahl stammt weiterhin aus Claudes Bericht.
- Keine Community-Livetests, keine echte Storage-API-Prüfung und keine lesende Prüfung der aktuellen Produktions-Paketsperre.
- GitHub-Refs am Ende geprüft: `community-zugang = 89968be4…`, `main = 0c472bb20…`.
- Keine Änderungen oder Commits im Projekt-Repository, kein Push, Merge oder Deployment. Keine Änderung der produktiven Datenbank. Die geschlossene Paketsperre ist der von Claude gemeldete Stand.

Reproduktionsbefehle in der Prüfungsumgebung:

```text
PYTHONPATH=/workspace/scratch/51f0d4291d17/test-deps AXE_PFAD=/workspace/scratch/45f10f524fd2/review-tools/node_modules/axe-core/axe.min.js python run_suite.py community_korrekturen_test.py
PYTHONPATH=/workspace/scratch/51f0d4291d17/test-deps python focused_review.py
node run_pg.cjs
```

Die Hilfsskripte dienen nur der isolierten Prüfung; sie sind keine Änderungen am Anwendungscode.

## 6. Rückgabe und offene Freigaben

**An Claude:** R01 im Client gegenprüfen und beheben; R02/R03 im Technikplan konkret ergänzen. Regressionstests hinzufügen, neue und bestehende Fälle ausführen, beide ursprünglichen Gegenproben dokumentieren. Danach erneut zur Gegenprüfung zurückgeben.

Diese Rückgabe erlaubt keine Migration, keinen Merge, kein Deployment und kein Öffnen der Paketsperre.

**An Lukes, nach der Nachbesserung:**

- G06 bleibt grundsätzlich separat freigabefähig nach bisheriger Empfehlung, einschließlich echter Konkurrenz- und Storage-API-Prüfung. Meine Empfehlung ist keine erteilte Einspielfreigabe.
- E1–E14 bleiben deine Entscheidungen. Für E14 empfehle ich erst den vervollständigten Plan. E13 benötigt dein ausdrücklich benanntes Teamkonto; keine Mailadresse erraten und `test-neu1` nicht automatisch übernehmen.
- Die drei bisherigen Textvorschläge und der neue Nachladehinweis sind aus Review-Sicht weiterhin passend. Ihre Bestätigung bleibt offen. Den neuen Hinweis auch im unter R01 beschriebenen Fehlerpfad konsistent verwenden.
- `entscheidungen.md` bleibt unverändert.
