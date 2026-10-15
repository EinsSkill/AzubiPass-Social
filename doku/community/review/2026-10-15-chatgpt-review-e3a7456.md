# AzubiPass Social – Gegenprüfung e3a7456

Datum: 15.10.2026  
Repository: EinsSkill/AzubiPass-Social  
Branch: `community-zugang`  
Geprüfter Commit: `e3a7456241409f9b7cb306c3f4816d69c39eb36c`  
Vergleich: `89968be4a8c02f81f7c55c8e6da0cc390b89a54b`

Vorheriger Beitrag: Claude – R01-Korrektur, Ergänzungen R02/R03 im Spec-06-Technikplan.  
Rolle: ChatGPT – Gegenprüfung und Review.  
Nächste Übergabe: Lukes für die offenen Entscheidungen; danach Claude zur freigegebenen Umsetzung und Abnahme.

**Ergebnis: R01 ist im geprüften Umfang behoben. R02 und R03 erfüllen auf Planungsebene die bisherigen Korrekturaufträge. Keine weiteren blockierenden Befunde in den hier geprüften Änderungen. Dies ist keine Abnahme der noch nicht implementierten Datenbankkorrekturen und keine Einspiel-, Merge- oder Live-Freigabe.**

## 1. Befunde einzeln

| Befund | Bewertung | Begründung |
|---|---|---|
| R01 – gemeinsamer Wiederholungsweg verschwindet | Behoben, unabhängig getestet | Der Fehlerzweig von `laden()` ruft bei `standOffen` nun `standFehler()` auf und beendet sich vor dem bisherigen reinen Antwortabruf-Wiederholungsweg. „Erneut laden“ bleibt erhalten und ruft Kopf und Antworten gemeinsam ab. |
| R02 – Wiedererkennung nach dem Warten fehlt | Auf Planungsebene erfüllt | Abschnitt 4.1 sucht nach Erwerb der Thread-Sperre mit einer eigenen Anweisung erneut nach der eigenen Meldung, vor Sichtbarkeit und Bremse. Der Eindeutigkeitsindex bleibt zusätzliche Sicherung. Die bisherige Meldungsbremse im Trigger soll für Meldungen entfallen; der RPC-Weg verwendet `APB01`. |
| R03 – Sichtbarkeitsprüfung vor dem Warten | Auf Planungsebene erfüllt | Abschnitt 12.2 plant ausdrücklich `SELECT … FOR SHARE` auf den Beitrag vor der Sichtbarkeitsprüfung. Die schnelle Wiedererkennung bereits angelegter eigener Antworten bleibt davor. Sperrreihenfolge Beitrag → Vorgang → Antwort und eine eigene Migration sind benannt. |

Die sieben neuen Mockprüfungen prüfen den R01-Fehlerpfad, den erhaltenen Knopf, beide tatsächlich angehaltenen Nachladeabrufe, die fortbestehende Sperre bei nur einer freigegebenen Hälfte, die Freigabe nach beiden Teilen, das Ausbleiben einer weiteren Markierungsänderung und genau eine gespeicherte Antwort. Die neue axe-Prüfung läuft nach erfolgreichem gemeinsamen Nachladen.

R03 bleibt bis zur tatsächlichen Umsetzung ein vorhandener Datenbankfehler. Dass der Plan jetzt korrekt ist, behebt die produktive Funktion noch nicht.

## 2. Unabhängige Prüfungen

- `community_korrekturen_test.py`: **87/87 bestanden**, einschließlich sieben enthaltener axe-Prüfungen. Echte JS-Module im Chromium-Browser gegen eine nachgebildete Supabase-Schnittstelle.
- Zusätzliche R01-Gegenprobe mit demselben Fehlerablauf gegen beide JS-Stände:

| Stand | „Erneut laden“ | Reiner Antwortabruf „Erneut versuchen“ | Aktive Lösungsknöpfe im Fehlerzustand |
|---|---:|---:|---:|
| `89968be` | 0 | 1 | 0 |
| `e3a7456` | 1 | 0 | 0 |

Im neuen Stand führt „Erneut laden“ anschließend zur Wiederherstellung des gemeinsamen Stands und zu drei verfügbaren Lösungsknöpfen. Damit ist die Regression am alten Stand unabhängig bestätigt.

- Die gebaute `docs/mittel/community-beitraege.js` stimmt mit der aktuellen Quelldatei überein.
- Der Commit basiert direkt auf `89968be`. Die Änderung an `docs/datenschutz.html` betrifft nur das erzeugte Standdatum; die übrigen Buildänderungen enthalten die entsprechende Aktualisierung der Ausgabedateien und Cache-Hashes.
- GitHub-Refs geprüft: `community-zugang = e3a7456241409f9b7cb306c3f4816d69c39eb36c`; `main = 0c472bb20b602e46d154af0828502bed41b636d4`.

Ausgeführte Befehle in der Prüfungsumgebung:

```text
PYTHONPATH=/workspace/scratch/51f0d4291d17/test-deps AXE_PFAD=/workspace/scratch/45f10f524fd2/review-tools/node_modules/axe-core/axe.min.js python run_suite.py community_korrekturen_test.py
PYTHONPATH=/workspace/scratch/51f0d4291d17/test-deps python r01_e3a7456.py
```

## 3. Grenzen der Abnahme

- Die 269/269 Funktionstests sind Claudes Bericht; in dieser Gegenprüfung nicht erneut ausgeführt.
- Abnahmefälle 19–23 und die übrigen Datenbanktests des Moderationspakets wurden hier nicht ausgeführt. Sie betreffen geplante, noch nicht implementierte Änderungen.
- Keine Community-Livetests, keine echte Storage-API-Prüfung und keine aktuelle lesende Prüfung der produktiven Paketsperre.
- Keine Änderungen am Projekt-Repository, keine Commits, kein Push, Merge oder Deployment. Produktive Datenbank unverändert.
- „Sperre zu“ ist Claudes Übergabestand; er wurde hier nicht durch einen Live-Abruf erneut bestätigt.

## 4. Empfehlung für den nächsten Schritt

**G06 und die eigenständige R03-Korrektur:** Ich empfehle Lukes die separate Freigabe beider Pläne. Claude kann dann die beiden überschaubaren Korrekturen umsetzen und die vorgesehenen echten Tests ausführen. Bei G06 bleiben beide Konkurrenzreihenfolgen und der tatsächliche Storage-API-Weg erforderlich. Bei R03 bleiben beide Reihenfolgen, die Wiederholung nach späterer Ausblendung und die Gegenprobe am alten Stand erforderlich. Eine solche Freigabe ist noch nicht erteilt.

**Spec 06 / E14:** Die bisherigen R02/R03-Planbefunde stehen einer Freigabe nicht mehr entgegen. Vor dem Umsetzen müssen Lukes' offenen Produktentscheidungen und die exakte Freigabe feststehen. Die später implementierten RPCs, Rechteänderungen und Transaktionen benötigen danach ihre eigene Abnahme.

Die bisherigen Empfehlungen bleiben:

| Entscheidung | Empfehlung an Lukes |
|---|---|
| E1 | Prüfanfrage erst nach erster Teambestätigung einer automatischen Ausblendung. |
| E2 | Wiedereinblenden bzw. Aufheben einer Prüfanfrage zusammen mit optionaler Korrektur in einer Entscheidung. |
| E3 | Neutrale fachliche Vorlage; die konkrete betroffene Aussage benennen. |
| E4 | Internes Feld darf leer bleiben, wenn der Server den vorhandenen Autortext übernimmt. |
| E5 | Vorlagenverwaltung später; Texte je Entscheidung anpassbar. |
| E6 | Eigene Antworten unter fremden ausgeblendeten Beiträgen in der Eigenansicht zugänglich halten. |
| E7 | Antwortbezug an Teamkorrekturen aufnehmen, mit aktueller Sichtbarkeitsprüfung. |
| E8 | Öffentlich „Team · Fachliche Korrektur“, intern handelndes Konto; keine Anonymität gegenüber direkten Datenabfragen versprechen. |
| E9 | Protokoll bis zu einem festen Prüftermin behalten: Ende der Klassen-Beta, spätestens 31.12.2026; dann über Behalten/Löschen entscheiden. |
| E10 | Direkte Teamlöschung fremder Inhalte entfernen. |
| E11 | `geloest` nur über kontrollierte Abläufe setzen. |
| E12 | Bearbeitung eigener ausgeblendeter Inhalte weiter erlauben; aktuellen Stand vor Entscheidung prüfen. |
| E13 | Lukes muss das gewünschte Teamkonto ausdrücklich benennen. Keine Adresse erraten, `test-neu1` nicht automatisch übernehmen. |
| E14 | Überarbeiteter Plan ist aus Sicht dieser Gegenprüfung zur Entscheidung bereit; ausdrückliche Freigabe bleibt Lukes vorbehalten. |

## 5. Vier offene Texte

Aus Review-Sicht passend; noch keine Bestätigung durch Lukes:

1. „Mit ‚Eingaben ändern‘ prüfen wir den offenen Versuch. Wurde noch nichts veröffentlicht, wird er endgültig verworfen. Wurde dein Beitrag bereits veröffentlicht, öffnen wir ihn.“

   Antwortvariante: „Mit ‚Eingaben ändern‘ prüfen wir den offenen Versuch. Wurde noch nichts gesendet, wird er endgültig verworfen. Wurde deine Antwort bereits gesendet, zeigen wir sie.“

2. „Solange der Versand läuft oder sein Ergebnis unklar ist, kannst du deine Eingaben nicht ändern.“

3. „Deine Eingaben konnten noch nicht verworfen werden. Versuch es erneut.“

4. „Deine Antwort wurde gesendet. Der aktuelle Stand konnte nicht geladen werden.“ – mit „Erneut laden“.

`entscheidungen.md` bleibt unverändert. Die Empfehlungen und dieses Review dürfen nicht als bereits von Lukes erteilte Freigaben eingetragen werden.

## 6. Übergabe an Claude nach Lukes' Entscheidungen

R01 im geprüften Umfang schließen. R02/R03 als geprüfte Planänderungen führen, nicht als bereits behobene Livefehler.

Nach ausdrücklicher Freigabe ausschließlich den benannten Umfang umsetzen, tatsächliche Migrationsdateien und Testergebnisse dokumentieren, echte und simulierte Prüfungen trennen und anschließend zur Gegenprüfung zurückgeben. Merge, Deployment und Öffnen der Paketsperre benötigen weiterhin Lukes' gesonderte Freigabe.

Quellen:
- [Commit e3a7456](https://github.com/EinsSkill/AzubiPass-Social/commit/e3a7456241409f9b7cb306c3f4816d69c39eb36c)
- [Clientquelle](https://github.com/EinsSkill/AzubiPass-Social/blob/e3a7456/quellen/community-beitraege.js)
- [Regressionstests](https://github.com/EinsSkill/AzubiPass-Social/blob/e3a7456/quellen/community_korrekturen_test.py)
- [Technikplan, Abschnitte 4.1 und 12](https://github.com/EinsSkill/AzubiPass-Social/blob/e3a7456/doku/community/06-technik-plan.md)
