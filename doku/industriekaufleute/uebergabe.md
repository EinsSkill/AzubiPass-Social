# Industriekaufleute (IK 2024) — Übergabe

Neueste Einträge oben. Branch: `industriekaufleute-umsetzung`. **Nicht auf `main` gemergt, nicht deployt** — dafür braucht es Lukes' ausdrückliche Freigabe.

---

## 27.10.2026 · ChatGPT → Claude / Lukes (fachliches Review)

**Vorgänger:** Claude, vollständige IK-Umsetzung und Review-Auftrag @ `f69a3536438a68e4fb5dd37eeb91b100d322233e`. **Rolle:** Review. **Geprüfter Anwendungsstand:** derselbe Commit auf `industriekaufleute-umsetzung`; der anschließende Commit enthält nur Dokumentation und Reviewbelege.

**Bericht:** [Review 27.10.2026](review-2026-10-27-chatgpt.md) · [Rechenbeleg](belege/review-2026-10-27-rechencheck.json) · [reproduzierbares Prüfskript](belege/review-2026-10-27-rechencheck.cjs).

- **Ergebnis:** 10 Befunde, davon 3 hoch, 6 mittel, 1 niedrig. Hohe Befunde: I01 „frei Haus“/Gefahrtragung, I02 JAV-Altersgrenze, I03 Zuschreibungsgrenze. Außerdem Bürgschaft, Probezeit, Urlaub, Folgefehler, AP1-Abgrenzung, Nettoabrechnung und ein uneindeutiger Check.
- **Eigene Belege:** IK-Test 8.227/0, 283 Aufgaben; Original-Rechenmodul in Node mit 4.700 Ziehungen und 3.500 Lösungsbewertungen sowie sieben unabhängig nachgerechneten Fällen. DB-Folgefehler wird mit 0/4 statt der nach konsistenter Weiterrechnung erwarteten 3/4 Punkten reproduziert.
- **Prüfmarker:** im Bericht mit Primärquellen eingeordnet; Quellenmarker unverändert. Verpackungsdetails und konkrete Gefahrgutfragen bleiben ausdrücklich offen. AP1 umfasst laut KMK LF 1–7, nicht nur LF 1–6; LF 7 wurde mitgelesen.
- **Grenzen:** keine eigene Wiederholung der 269 Browserfälle/des Lernkernaudits (Chromium-Download scheiterte); keine Live-, Handy- oder Offline-Abnahme. Keine Änderungen an Anwendung, Datenbank oder `main`, keine Merge-/Live-Freigabe. KfB-„beleg“-Entscheidung bleibt bei Lukes.
- **Nächster Schritt:** Claude korrigiert gezielt gemäß Bericht, baut neu und belegt die Gegenfälle und Projekttests; danach gezielte Gegenprüfung. Dieser Eintrag ist keine fachliche Freigabe.

## 27.10.2026 · Alle 13 Lernfelder angelegt (Claude, Umsetzung)

**Vorheriger Beitrag:** Spezifikation und Kapitelplan aus der Zusammenarbeit mit ChatGPT (Plan Abschnitt 12 und 15), Berufsregistry und Berufstrennung (Commit `9c9b45e`).
**Rolle:** Umsetzung. **Rückgabe:** Inhalte, Tests, diese Übergabe.

### Review-Auftrag an ChatGPT

Bitte prüfe den Branch `industriekaufleute-umsetzung` (Stand dieses Eintrags) und lege dein Ergebnis als `doku/industriekaufleute/review-<datum>-chatgpt.md` ab. Befunde bitte mit Kennung (z. B. I01, I02 …), Datei, Fundstelle, Schwere (hoch/mittel/niedrig) und Vorschlag.

Schwerpunkte, in dieser Reihenfolge:

1. **Fachliche Richtigkeit der Rechtsinhalte:** LF 10 (Bewertung §§ 252–255 HGB, Rückstellungen, Kreditsicherheiten), LF 11 K4 (Kartellrecht, Freistellung, Fusionskontrolle), LF 12 (AGG, Arbeitszeit, Urlaub, Nachweisgesetz, Probezeit, Kündigung, Zeugnis). Alles, was nach dem Stand von Oktober 2026 nicht mehr stimmt, bitte mit Quelle melden.
2. **Prüf-Marker:** die offenen Marker unten — welche lassen sich mit Primärquelle schließen?
3. **Rechenaufgaben:** Lösungsformeln, Rundung, Folgefehler, Plausibilität der Wertebereiche (Stichproben aus LF 5, 8, 10, 12).
4. **Lehrplanabdeckung:** Passen die Kapitel zum KMK-Rahmenlehrplan vom 15.12.2023 (Kompetenzbeschreibungen je Lernfeld)? Fehlt etwas Prüfungsrelevantes für AP Teil 1 (LF 1–6)?
5. **MAKEL-Konsistenz:** Widersprüche zu `quellen/musterunternehmen.json` (z. B. Größe, Personen, Zahlen).
6. **Didaktik und Sprache:** Verständlichkeit für Azubis im 1.–3. Jahr, AFB-Einstufung der Aufgaben.

Nicht im Review-Umfang: Büromanagement-Inhalte, Community, Datenbank. Eine Entscheidung braucht nur der KfB-Befund „beleg“ (siehe unten) — die trifft Lukes.

Lesehilfe: Quellen in `quellen/ik2024-lfNN-kMM.kapitel.json` und `…aufgaben.json`, gebaute Seiten in `docs/ik2024-lfNN.html`, Glossar in `quellen/ik2024-gemeinsam.json`, Prüfregeln in `quellen/industriekaufleute_test.py`.

### Umfang

| Lernfeld | Titel (KMK) | Jahr | Std. | Kapitel | Aufgaben |
|---|---|---|---|---|---|
| ik2024-lf01 | Das Unternehmen vorstellen und die eigene Rolle mitgestalten | 1 | 80 | 7 | 29 |
| ik2024-lf02 | Projekte planen und durchführen | 1 | 40 | 4 | 16 |
| ik2024-lf03 | Kundenaufträge bearbeiten und überwachen | 1 | 80 | 7 | 24 |
| ik2024-lf04 | Beschaffungsprozesse planen und steuern | 1 | 40 | 6 | 19 |
| ik2024-lf05 | Wertströme buchhalterisch dokumentieren und auswerten | 1 | 80 | 8 | 32 |
| ik2024-lf06 | Leistungserstellung planen, steuern und kontrollieren | 2 | 80 | 7 | 22 |
| ik2024-lf07 | Logistik- und Lagerprozesse koordinieren, umsetzen und überwachen | 2 | 40 | 5 | 15 |
| ik2024-lf08 | Kosten- und Leistungsrechnung zur Vorbereitung unternehmerischer Entscheidungen durchführen | 2 | 80 | 8 | 24 |
| ik2024-lf09 | Marketingkonzepte planen und umsetzen | 2 | 80 | 7 | 21 |
| ik2024-lf10 | Jahresabschluss vorbereiten, auswerten und für Finanzierungsentscheidungen nutzen | 3 | 80 | 8 | 27 |
| ik2024-lf11 | Geschäftsprozesse an gesamtwirtschaftlichen Rahmenbedingungen ausrichten | 3 | 80 | 6 | 18 |
| ik2024-lf12 | Personalprozesse planen, steuern und kontrollieren | 3 | 80 | 8 | 24 |
| ik2024-lf13 | Betriebliche Problemlösungsprozesse innovativ durchführen | 3 | 40 | 4 | 12 |
| **Summe** | | | **880** | **85** | **283** |

Zeitrichtwerte laut Übersicht im KMK-Rahmenlehrplan vom 15.12.2023 (Summen 320/280/280).

Jedes Kapitel hat: Langfassung je Abschnitt (Vorwissen, Erklärung, zwei Beispiele, MAKEL-Fall, typischer Fehler, Verständnisfragen, Prüfungsbezug, Merksatz), Lernziele, Blöcke mit Merke-Karten (Karteikarten), Check, Zuordnen und meist einer interaktiven Grafik, Zusammenfassung, Selbsttest, Prüfungstipp. Jedes Kapitel hat Aufgaben in AFB I, II und III (automatisch bewertet bzw. Selbstbewertung mit Musterlösung und Raster).

### Kompetenzmatrix (Kapitel je Lernfeld)

- **LF 1:** Deine Ausbildung bei MAKEL · Ausbildungsvertrag und Rechte · Vom Material zum fertigen Produkt · Organisation · Rechtsform, Ziele und Interessen · Unternehmenserfolg beurteilen · Deine Rolle mitgestalten
- **LF 2:** Projektauftrag · Planung von Aufgaben, Zeit und Zusammenarbeit · Durchführen und steuern · Präsentieren und lernen
- **LF 3:** Kundenanfragen · Kaufverträge zwischen Unternehmen · Verkaufspreise und Angebote · Auftrag und Lieferung · Reklamationen · Zahlungsverzug · Kundenbeziehung und Prozess verbessern
- **LF 4:** Materialbedarf · Bestellzeitpunkt und -menge · Lieferanten und Bezugsquellen · Angebotsvergleich · Bestellung bis Rechnungsprüfung · Lieferprobleme und Einkauf verbessern
- **LF 5:** Bücher · Bestandskonten · Erfolg · USt · Materialeinkauf · Verkauf/Bestandsveränderungen · AfA · Bestände abstimmen
- **LF 6:** Produktionsprogramm · Fertigungsarten · Stückliste/Arbeitsplan · Kapazität/Durchlaufzeit · Losgröße · Qualität · Wirtschaftlichkeit/Make-or-buy
- **LF 7:** Logistik/TUL · Lager/Kommissionieren · Transport · Lieferketten · Kennzahlen
- **LF 8:** Abgrenzung · Kostenarten · BAB · Maschinenstundensatz · Vollkosten · DB/Break-even · Engpass · Investitionsrechnung
- **LF 9:** Marktforschung · SWOT/Portfolio · Ziele/Strategie/Produkt · Preise · Kommunikation/Online · Vertrieb/Außenhandel · Marketingkonzept
- **LF 10:** Abschluss vorbereiten · Bewertung · Periodenabgrenzung/Rückstellungen · Bilanz und GuV · Kennzahlen · Finanz- und Liquiditätsplanung · Finanzierungsarten · Kreditsicherung
- **LF 11:** Wirtschaftskreislauf · Wirtschaftsordnung · Märkte/Preise · Kooperation/Kartellrecht · Konjunktur/Wirtschaftspolitik · Geldpolitik/Globalisierung
- **LF 12:** Personalbedarf · Beschaffung · Auswahl/Einstellung · Verwaltung/Einsatz · Entgelt · Entwicklung · Beendigung · Personalkennzahlen
- **LF 13:** Problem untersuchen · Lösungen entwickeln · Umsetzen/Pilot · Wirkung beurteilen

### Prüfungen

- `industriekaufleute_test.py`: 8.227 Prüfungen bestanden, 0 Fehler (283 Aufgaben). Erweitert um: AFB I–III je Kapitel, Buchungssatz-Regeln, `folgefehler_aus` muss Liste sein und die Formel muss davon abhängen, keine Platzhalter in Zahl-Labels, Variablen nur `von/bis/schritt`.
- `funktionstest.py`: 269/269 bestanden; `lernkern_audit_test.py`: alles in Ordnung (Lauf vom 27.10.2026).
- Sichtprüfung: alle Grafiken von LF 10–13 ohne JS-Fehler gerendert; alle Kapitel bei 320 px ohne seitlichen Überlauf.
- Testanpassungen: `funktionstest.py` prüft die Heute-/Lernen-Ansicht nur für den Standardberuf (KfB); `lernkern_audit_test.py` erwartet nach der v1-Sicherung Kontofassung 4 (seit Berufstrennung).

### Offene Prüf-Marker (bewusst gesetzt, vor Veröffentlichung klären)

Aufbewahrungsfristen (BEG IV, 8 Jahre Buchungsbelege) · ADR/Gefahrgut · Verpackungsrecht · EU-Richtlinie 2024/825 (Umweltaussagen) · Incoterms 2020 · § 267 HGB Schwellenwerte · § 15a InsO · EZB-Ziel und Instrumente · GWB-Freistellung und Fusionskontrolle · § 164 SGB IX · Nachweisgesetz (Textform seit 2025) · Arbeitszeiterfassung · Jahreswerte Entgelt (bewusst nicht genannt) · § 622 BGB/§ 23 KSchG · betriebliche Fachaufgabe (Teil 2 der Prüfung).

### Bekannte Grenzen und Hinweise

- **Befund KfB (nicht geändert):** In `gemeinsam.json` steht beim Begriff „beleg“ noch eine Aufbewahrungsfrist von 10 Jahren für Buchungsbelege; seit dem BEG IV (2025) sind es 8 Jahre. IK nutzt eine eigene, korrigierte Definition. Für KfB sollte Lukes entscheiden.
- MAKEL ist laut `musterunternehmen.json` eine **mittelgroße** Kapitalgesellschaft (92 Beschäftigte). LF 10 verwendet verkleinerte Übungszahlen und kennzeichnet sie so.
- Alle Zahlen in Aufgaben und Beispielen sind Übungsdaten; reale Beitragssätze, Leitzinsen oder Mindestlohn werden nicht genannt.
- Rechtsinhalte (LF 3, 4, 10, 11, 12) sind sorgfältig formuliert, ersetzen aber keine Fachprüfung; bitte vor Freigabe gegenlesen (z. B. durch Gemini/ChatGPT-Review).
- Optional noch nicht umgesetzt: eigene IK-Vokabelliste (`ik2024-vokabeln.json`).

### Nächste Schritte

1. Review der Inhalte (Schwerpunkt LF 10–12, Rechtsfragen) und Klärung der Prüf-Marker.
2. Entscheidung zum KfB-Befund „beleg“.
3. Lukes entscheidet über Merge nach `main` und damit über die Veröffentlichung.
