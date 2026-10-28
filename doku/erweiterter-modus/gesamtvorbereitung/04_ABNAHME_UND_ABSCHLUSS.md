# Abnahme des vollständigen erweiterten Modus

## Arbeitsstatus sauber führen

`abschnittsplan.csv` ist die Ausgangsliste von 567 Abschnitten, nicht der aktuelle Fertigstellungsbericht. Die drei Piloten sind gesondert markiert. Neue Abschnitte und Kapitel ergänzen und ihre Zahl berichten. Für jeden Eintrag Commit, Textprüfung, fachlichen Beleg und betroffenen Testlauf eintragen. Zustände: `vorbereitet` → `redigiert` → `eingebaut` → `fachlich geprüft` → `technisch geprüft` → `abgenommen`. Prüfende Stelle und Datum nennen; kein automatisch gesetztes „bestanden“ aufgrund befüllter Felder.

## Textprüfung jedes Abschnitts

- Lernziel im neuen Text tatsächlich erklärt, nicht nur wiederholt.
- Vorwissen knapp aufgefangen; Haupttext ohne Öffnen optionaler Details verständlich.
- Gegenüber der normalen Fassung zusätzliche Begründung, vollständiger Anwendungsweg oder klarer Fallvergleich erkennbar.
- Erforderliche Voraussetzungen und Modellannahmen genannt; fachliche Grenzen nicht unterschlagen.
- Beispiel vollständig, Einheiten/Bezugsgrößen und Interpretation stimmig; bei Kommunikation/Prozess tatsächlich ausgeführte Anwendung.
- Vorhandene sachliche Inhalte zugeordnet, fachlich falsche Aussagen gezielt berichtigt und dokumentiert.
- Optionale Details wirklich optional; Antworten getrennt und begründet.
- Quellen und Jahreswerte aktuell geprüft, keine redaktionellen Aufträge für Lernende sichtbar.

Pro Kapitel im Bericht zwei Fragen konkret beantworten: „Was versteht man jetzt zusätzlich?“ und „Welcher alte Inhalt ist wo erhalten oder weshalb berichtigt?“ Wortzahl oder Textähnlichkeitswert allein reichen nicht.

## Technische Abnahme

Die ursprünglichen A01–A26 in `referenz-v1/abnahme.json` gelten weiter mit Präzisierungen E01/E02/M01 aus dem Technikauftrag. Bestehende Tests anpassen, wo sie bewusst das abweichende Verhalten testen. Nicht dieselbe Funktion aufrufen und das Ergebnis ungeprüft als unabhängigen Fachbeleg ausgeben.

| Kennung | Ausführung | Bestanden wenn |
|---|---|---|
| G01 | Aktuelle Lernfeldregistries gegen Arbeitsliste vergleichen | Jedes registrierte Kapitel und jeder Abschnitt erfasst, keine Duplikate; neue Hauptinhalte aufgenommen. |
| G02 | Vollfassungen validieren und Altbestand prüfen | Jeder Zielabschnitt fachlich redigiert; Legacy-Fallback wird nicht als fertige neue Redaktion gezählt. Bewusst ausgenommener Inhalt mit Grund ist sichtbar dokumentiert und vor Abschluss entschieden. |
| G03 | E01-Negativfall, echte Alt-/Mischdatei | Ungültige ausdrückliche Darstellung bricht verständlich ab; echte Legacy-Kompatibilität während Migration erhalten. |
| G04 | Tabelle/Grafik ohne ursprünglichen Absatz (M01) | Ausführliche Erklärung funktioniert; Originale einmal; kein Dummytext, keine zurückgesetzten Eingaben. |
| G05 | Eine Grafik verändern, einen Check beantworten und mehrfach umschalten | Gleiche Instanzen/IDs und unveränderte Antworten, Werte, Punkte und Karten. |
| G06 | Haupttext-, Detail- und Frage-Treffer öffnen | Treffer sichtbar am richtigen Ziel; Antwort weiter verborgen; sechs bisherigen Pilotantworten und neue Antworttexte nicht als Antworttreffer indexiert. |
| G07 | Expliziten Detail-Link kopieren und neu laden | Dasselbe Ziel offen; normaler Aufruf ohne Parameter startet kompakt. |
| G08 | KfB/IK, Konto-/Kapitelwechsel und Resetfälle der bestehenden Regression | Kein berufsfremder Inhalt oder fremder Zustand, keine unbeabsichtigte Lernstandsmigration. |
| G09 | 320/375 px, große Schrift, Tastatur und vorhandene axe-Prüfung | Kein Seitenüberlauf, Tabellen bedienbar, sichtbarer Fokus, sinnvoller Name/Zustand und Lesereihenfolge. |
| G10 | Nach Cacheaufbau offline neu starten und anderes gecachtes Kapitel öffnen | Volltext, Details und Suche funktionieren mit aktivem Service Worker ohne Netz. |
| G11 | Vollständigen Build nach finaler Redaktion ausführen | Quellen, HTML, Suchindex und Cacheversion passen zusammen; keine alten gemischten Artefakte. |
| G12 | Größte fertige Lernfeldseite mobil laden und bedienen | Keine gemeldeten Fehler; tatsächliche Lade-/Bedienbeobachtung und Dateigröße dokumentiert. Kein erfundener numerischer Grenzwert. |
| G13 | Gewählte kompakte/ausführliche Ansicht drucken | Keine ungewollte doppelte Textfassung und keine zerstörte Tabelle; gewählte bestehende Druckregeln dokumentiert. |
| G14 | Alle L01–L30/K01–K19 und aktuellen Strukturpunkte zuordnen | Jede Zeile mit Ist-Entscheidung, Ziel und Beleg abgeschlossen oder ausdrücklich als verbleibende Sperre ausgewiesen. |

## Fachprüfung skalieren, ohne Prüfungen zu erfinden

Alle neuen Texte lesen. Jeden vollständigen Zahlenfall unabhängig nachrechnen, nicht nur Quell-/HTML-Gleichheit prüfen. Buchung zusätzlich sachlich prüfen, nicht nur Summengleichheit. Bei Recht die tatsächlich angewandten Voraussetzungen und Fristen an aktuellen Primärquellen prüfen. Jahreswerte an einer zentral nachvollziehbaren Stelle nachweisen und Wiederholungen auf Konsistenz kontrollieren.

Browserabnahme sinnvoll über repräsentative Risikofälle plus automatisierte Gesamtstruktur-/Referenzprüfung verteilen; es braucht nicht dieselbe manuelle Klickfolge 567-mal. Fachliche Lesekontrolle der redigierten 567 Abschnitte ist damit aber nicht ersetzt. Neue Abschnitte zusätzlich erfassen. Notwendige bestehende Regression einmal nach Abschluss, erneut nur nach relevanten Folgeveränderungen oder Fehlern.

## Pro-Charge-Bericht zum Ausfüllen

| Feld | Eintrag von Claude |
|---|---|
| Anwendungscommit / Branch | offen |
| Tatsächlich redigierte Abschnittsschlüssel | offen |
| Neue Hauptabschnitte/Kapitel | offen |
| Inhaltlicher Mehrwert gegenüber Kompakt | offen |
| Zuordnung/Erhaltung/gezielte Korrektur des Altbestands | offen |
| Bearbeitete Lehrplan-IDs, Ist-Beleg und Ziel | offen |
| Fachquellen mit geprüfter Aussage und Datum | offen |
| Nachgerechnete Fälle und unabhängiger Kontrollweg | offen |
| Ausgeführte Builds/Tests und Ergebnis | offen |
| Bekannte Grenzen und konkrete nächste Arbeit | offen |

## Abschlussvorlage für Lukes

Anwendungscommit und Dokumentationscommit unterscheiden. Aktuellen Umfang, vollständig abgenommene Kapitel/Abschnitte, Lehrplanergänzungen, Quellenstand und tatsächliche Fach-/Technikprüfungen nennen. Bei einer offenen notwendigen Prüfung lautet das Ergebnis „noch nicht vollständig abgeschlossen“ und die konkrete Sperre wird genannt. Diese Vorbereitung ist keine Erlaubnis, Restbestände still nach dem Merge zu erledigen. Erst nach der vollständigen Umsetzung und Prüfung steht die Mergeentscheidung an.
