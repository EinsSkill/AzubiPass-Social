# Zwischenprüfung · Erweiterter Modus

28.10.2026 · ChatGPT · **fest geprüfter Stand `bab38a7`**, Branch `erweiterter-modus-2026-10-28`. Fortschrittsprüfung, keine vollständige Fach-/Browserabnahme. Claude arbeitet weiter; spätere Commits sind hier nicht eingeschlossen.

## Belegbarer Umfang

Bestand anhand der tatsächlichen Lernfeldregistries und Kapitelquellen gezählt; Format-2-Einträge mit dem Originalvalidator geprüft. Insgesamt jetzt **161 Kapitel / 585 Abschnitte**, davon **42 Kapitel vollständig** und **148 Abschnitte** als Vollfassung. Ausgangsbestand war 160/567: ein neues Kapitel und insgesamt 18 zusätzliche Abschnitte. Der Anteil von ungefähr einem Viertel beschreibt die Umstellung, nicht fachliche Freigabe oder geschätzten Restaufwand.

| Lernfeld KfB | Vollständige Kapitel | Vollfassungsabschnitte |
|---|---:|---:|
| LF1 | 7/7 | 23/23 |
| LF4 | 7/7 | 25/25 |
| LF6 / Buchführung | 9/9 | 35/35 |
| LF8 | 6/6 | 20/20 |
| LF9 | 7/7 | 21/21 |
| LF10 | 6/6 | 22/22 |
| LF2 | 0/6 | 1/18 (Pilot) |
| LF3 | 0/6 | 1/16 (Pilot) |

KfB LF5/7/11/12/13 und alle 85 IK-Kapitel haben weiterhin keinen neuen Format-2-Vollbestand. Ihre alten Langfassungen sind damit nicht als inhaltslos oder unbrauchbar bewertet. Neu ist KfB LF9 K7 Rechtsformen. Weitere Hauptabschnitte betreffen unter anderem Lagerung, Vertrags-/Zahlungsarten, Personal, Rentabilität und Ergebnistabelle/Normal-/Istkosten.

## Inhaltlicher Fortschritt

`doku/erweiterter-modus/umsetzung/kapitelnotizen.md` beschreibt Mehrwert, Zuordnung des Altbestands und Lehrplan-IDs je Kapitel. An tatsächlich gelesenen Stichproben bestätigt: zusammenhängende Erklärung, vollständige Muster und Gegenfälle statt bloßer Acht-Felder-Umbenennung. Gelesen wurden insbesondere LF1 K1 a4 (Weiterbildung), LF4 K1 b4 (Lagerkennzahlen/Eigen-Fremdlager), Buchführung K5 e1 (Verfahren), LF9 K7 b3 (Haftung/Gewinnverteilung) und LF10 K1 b4 (Ergebnistabelle).

Damit ist die gewünschte Richtung erkennbar umgesetzt. Diese Stichproben sind **keine fachliche Freigabe aller neuen Rechtsaussagen, Jahreswerte und 148 Texte**. Rechtsformen und zahlreiche Personal-/Steuerdetails benötigen die vereinbarte vollständige Gegenprüfung am aktuellen Primärquellenstand.

## Technik und eigene Prüfungen

- E01: Unbekannte Darstellungs-/Formatkennzeichnung wird vor dem Filtern abgewiesen; die vorhandenen negativen Fälle für alle drei ursprünglichen Piloten selbst erneut ohne Browser ausgeführt und bestanden.
- M01: Die alte Pflicht zu einem Absatz in der Kurzfassung ist entfernt. Die Vollfassung selbst braucht erklärenden Text. An zwei echten ursprünglichen Problemfällen (LF3 K1 a2 und LF9 K2 b3) mit reinen In-Memory-Einträgen selbst erfolgreich geprüft.
- M02: Der Validator verlangt nun einen einmaligen Platz für alle vorhandenen Basiselemente. Alle 148 aktuellen Vollfassungen bestehen diese Strukturprüfung.
- E02: Im JavaScript bleiben explizite Detailparameter zunächst erhalten; bewusstes Schließen entfernt nur die betreffenden Parameter. Neue Browserabnahmen dafür sind im Test vorgesehen. Hier nur Quellprüfung, keine eigene Browserbestätigung.
- Gegen `d0cfb8a` fehlen auf keiner der 26 Lernfeldseiten bisherige Kennungen für Checks, Karten, Zuordnungen, Fragen/Zeilen. Neue Elemente kommen hinzu. Das beweist ID-Erhaltung, nicht jede Laufzeit-/Lernstandseigenschaft.
- `python quellen/industriekaufleute_test.py`: **8.271 bestanden, 0 Fehler**, 285 Aufgaben. Keine neue IK-Gesamtfachprüfung.

## Offene Zwischenstandsprobleme

### P01 · Suchindex hinter den gebauten Seiten

Der gepushte `docs/mittel/suche.json` enthält **161** eindeutige neue Ansichts-/Detailziele. Der aktuelle Originalgenerator `build_app.suche_sammeln()` liefert aus den aktuellen Quellen **684**; dieselbe Zielmenge ergibt sich aus den gebauten Vollfassungsbereichen aller 26 Seiten. **523 Ziele fehlen im Index**, kein überzähliges Ziel. Betroffen: Buchführung 140, LF8 93, LF9 95, LF1 98, LF10 97.

Konkretes Beispiel: `buchfuehrung.html?ansicht=ausfuehrlich#k2-b1` ist im HTML vorhanden und wird vom aktuellen Generator erzeugt, aber fehlt im gepushten Index. Der letzte Indexcommit ist `1dc09f6`, während die neueren Seiten bis `bab38a7` fortgeschrieben wurden. Das spricht für einen noch nicht nachgezogenen vollständigen App-Build, nicht für einen nachgewiesenen Defekt des Suchgenerators.

**Nächster Schritt:** Vollständigen App-/Index-/Cache-Build auf dem aktuellen Bestand nachziehen und Synchronität erneut prüfen; keine Zusammenfassung „Suche vollständig bestanden“ für diesen Snapshot.

### P02 · Pilot-Test an Gesamtumstellung anpassen

Die originalen Funktionen `statisch()` und `vertrag()` aus `erweiterter_modus_test.py` erneut ausgeführt, allein Playwright-Import für diesen Nichtbrowserlauf ausgelassen. Drei Assertions schlagen fehl:

1. LF4 vergleicht die gesamte alte/neue Übungs-ID-Liste auf Gleichheit. Neue Hauptabschnitte erzeugen zusätzliche IDs. Eigene Teilmengenprüfung zeigt: **keine alte ID fehlt**. Erhaltung alter IDs getrennt von erlaubten neuen IDs prüfen.
2. A26 vergleicht den gesamten Suchindex mit erwarteten Zielen aus nur LF2/3/4. Erwartungsmenge auf alle registrierten Lernfelder ausweiten. **Zusätzlich** ist P01 ein echtes Artefaktproblem; die bloße Testanpassung behebt es nicht.
3. „Gültiger Pilot“ erwartet für LF4 K3 weiterhin genau `{"b1"}`; das Kapitel hat inzwischen drei gültige Vollfassungen. Test auf gezielte Gültigkeit bzw. aktuelle Abschnittsmenge umstellen.

Außerdem wird der Legacy-Kompatibilitätsfall still übersprungen, weil sein LF1-K1-Beispiel inzwischen konvertiert wurde. Ein tatsächlich verbliebenes Legacy-Beispiel oder eine kleine passende Testfixture benutzen, damit diese Prüfung weiter ausgeführt wird.

Diese Testwartung ist normale Folge der erweiterten Inhalte. Die fehlgeschlagenen Assertions dürfen weder als durchgehend grüne Regression noch pauschal als drei Anwendungsausfälle ausgegeben werden.

## Nächste Arbeit und Grenzen

Gesamtredaktion auf dem Arbeitsbranch fortsetzen, P01/P02 spätestens vor Gesamtprüfung erledigen. Die Arbeitslisten der Vorbereitung bleiben Ausgangslisten; neue Abschnitte und tatsächliche Fach-/Testabnahmen nachvollziehbar nachtragen. Abschlussbericht und gemeinsame Übergabe am Ende auf den Gesamtstand umstellen; der alte Pilotbericht enthält noch die inzwischen überholte Reihenfolge „Pilotenmerge, Rest später“.

Keine Kapitelquelle verändert, keine Korrekturen an Claudes Umsetzung, kein Push/Merge/Deployment. Keine eigene Browser-/axe-/Service-Worker-Offlineprobe und keine erneute vollständige Lehrplanprüfung. Entscheidung bleibt: erst vollständige Umsetzung und Prüfung, danach Mergevorlage.
