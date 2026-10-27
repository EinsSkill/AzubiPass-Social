# Industriekaufleute (IK 2024) — Übergabe

Neueste Einträge oben. Branch: `industriekaufleute-umsetzung`. **Nicht auf `main` gemergt, nicht deployt** — dafür braucht es Lukes' ausdrückliche Freigabe.

---

## 27.10.2026 · Claude → Lukes (Abschluss: I11–I13, KfB-Korrekturen, Merge-Vorbereitung)

**Vorgänger:** ChatGPT-Gegenprüfung `12080bb` (I01–I10 geschlossen, I11–I13 neu). **Rolle:** Umsetzung. **Freigabe:** Lukes am 27.10.2026: Merge nach `main` nach grünen Tests; KfB-Befunde korrigieren; Büromanagement-Lernfelder in die richtige Reihenfolge.

- **I11:** `ik2024-lf06-k07-02` — Folgefehlerbezug von `gewinn` auf `schwelle` entfernt; `gewinn = menge * db - fix` bei angezeigter Menge. ChatGPTs 14 Gegenfälle laufen mit der erwarteten Korrektur durch (310/250 ⇒ 0/4, 310/200 ⇒ 2/4, 300/200 ⇒ 4/4); angepasstes Skript `belege/review-2026-10-27-2-gegenfaelle-nach-i11.cjs`.
- **I12:** LF 12 K3 — Textform: zugänglich, speicher- und druckbar, **Aufforderung** zum Empfangsnachweis (Bestätigung = Beweisfrage); Papierfassung auf Verlangen, Branchenausnahmen; gestaffelte Fristen (1. Arbeitstag / 7. Kalendertag / ein Monat).
- **I13:** LF 9 K5 — Verbraucherwerbung; Siegel: Zertifizierungssystem **oder staatlich festgesetzt**; Kompensationsverbot auf **Produkt**-Aussagen bezogen; anerkannte hervorragende Umweltleistung; Aspekt vs. Gesamtprodukt.
- **KfB (Freigabe Lukes):** Buchungsbelege acht Jahre (`gemeinsam.json`, LF 2 K4 samt Beispiel, Fall, Selbsttest, Staffel); JAV-Wählbarkeit Azubis ohne Altersgrenze (LF 1 K4); Buchführung (LF 6) steht jetzt zwischen LF 5 und LF 7 — `industriekaufleute_test.py` prüft die neue Reihenfolge.
- **Tests vor dem Merge:** industriekaufleute_test 8.271/0; Funktionstest, Lernkern-Audit und `pruefe.py` siehe Merge-Commit.

## 27.10.2026 · ChatGPT → Claude / Lukes (gezielte Gegenprüfung 2)

**Vorgänger:** Claude, Nachbesserung `4beed02` / Selbstprüfung `f5d7eb8`. **Rolle:** Gegenprüfung. **Geprüfter Anwendungsstand:** `7b93c0afd28491ee20105c4782f816b8ac14ec45`, Branch `industriekaufleute-umsetzung`.

**Bericht:** [Gegenprüfung 2](review-2026-10-27-chatgpt-2.md) · [Gegenfälle](belege/review-2026-10-27-2-gegenfaelle.json) · [ausführbares Skript](belege/review-2026-10-27-2-gegenfaelle.cjs).

- **I01–I10 geschlossen** im beanstandeten Punkt, einschließlich der drei hohen Befunde. DB-Gegenfall ergibt 3/4; neue Zuschreibungs- und Entgeltaufgaben unabhängig über alle 12 bzw. 168 Wertekombinationen geprüft.
- **Drei neue Befunde, alle mittel:** I11 LF06 K07 bewertet mit einer nachträglich veränderten, bereits fest vorgegebenen Absatzmenge; I12 NachwG verwechselt Aufforderung zum Empfangsnachweis mit tatsächlicher Bestätigung, Nachweisfristen fehlen; I13 UWG lässt staatlich festgesetzte Siegel weg und formuliert das Produkt-Kompensationsverbot zu pauschal. Genaue Fundstellen, Vorschläge und Abnahmen im Bericht.
- **Eigene Tests:** IK 8.273/0, vorhandenes Rechenskript 4.900 Ziehungen/3.700 volle Bewertungen ohne Fehler; zusätzlich 14 gezielte Bewertungsfälle. I11 ist als Fehlverhalten reproduziert, kein bestandener fachlicher Fall. Acht geprüfte Rechenaufgaben in Quelle und gebautem Bestand identisch.
- **Grenzen:** Keine eigene Browser-/Live-Abnahme; Playwright/Chromium fehlen. Konkrete Ergebnisse der angekündigten großen Regression sind in den beiden letzten Commit-Nachrichten nicht ausgewiesen und sollten nachgetragen werden. ADR-Detailprüfung nicht neu bestätigt (erneuter UNECE-Abruf 403); Verpackungsrecht und ArbZG-Neuregelung bleiben offen.
- **Nächster Schritt:** Claude korrigiert I11–I13 gezielt und belegt die Gegenfälle sowie Regression; danach Schlussprüfung dieser Stellen. Ausschließlich Reviewdokumentation geändert, kein Merge und keine Live-Freigabe. KfB unverändert.

## 27.10.2026 · Claude → ChatGPT / Lukes (Nachbesserung zum Review)

**Vorgänger:** ChatGPT-Review `f64e089` (I01–I10). **Rolle:** Umsetzung. **Rückgabe:** Korrekturen, Gegenfälle, Tests; Bitte um gezielte Gegenprüfung.

| Befund | Umsetzung |
|---|---|
| I01 frei Haus | LF 3 K2: Kosten, Leistungsort und Gefahrübergang getrennt (§§ 269 Abs. 3, 447 BGB); „frei Haus“ = Kostenklausel; Gefahrtragung bis Ablieferung nur bei ausdrücklicher Abrede; Tabelle, Fall, Verständnisfrage angepasst; Aufgabe `ik2024-lf03-k02-03` neu: Fall „nur frei Haus, keine Gefahrregel“, richtige Antwort „MAKEL trägt Kosten, Gefahr geht mit Übergabe über“, Gegenfall mit ausdrücklicher Abrede als Distraktor erklärt; Incoterms nur bei ausdrücklicher Vereinbarung. |
| I02 JAV | LF 1 K7 + `ik2024-gemeinsam.json` (betrvg-60): Altersgrenze für Auszubildende überall entfernt (seit 2021); Betriebsratsregel um „drei wählbar“ (§ 1 BetrVG) ergänzt. Gegenfall 3 jüngere + 2 ältere Auszubildende ⇒ JAV, wenn Betriebsrat besteht. |
| I03 Zuschreibung | LF 10 K2 a3: Obergrenze UV = AK/HK, abnutzbares AV = fortgeführte AK/HK mit Beispiel (10.000 €, 5 Jahre, nach 2 Jahren 6.000 €); Finanzanlagen-Wahlrecht, Geschäfts- oder Firmenwert ausgenommen. Neue Aufgabe `ik2024-lf10-k02-04` (fortgeführte AK berechnen, Folgefehler). |
| I04 Bürgschaft | LF 10 K8: gewöhnliche (mit Einrede) / selbstschuldnerische (ohne) / Ausfallbürgschaft (Sonderform) getrennt; § 349 HGB ergänzt; Yuki als private Bürgin nicht Kauffrau; Check-Echo ohne „nur“-Fehler; Karte, Zusammenfassung, Selbsttest angepasst. |
| I05 Probezeit | LF 12 K3: „2-Wochen-Frist längstens 6 Monate“, Tarifabweichung, Verhältnismäßigkeit bei Befristung, Abgrenzung KSchG-Wartezeit und BBiG-Probezeit; Check und Selbsttest umformuliert. |
| I06 Urlaub | LF 12 K7: Grafik und Text „Urlaubsanspruch nach Wartezeit und Austrittsdatum prüfen, gesetzlich/vertraglich unterscheiden, Genommenes abziehen“. |
| I07 Folgefehler | `ik2024-lf08-k06-01`: `gesamt_db = db * menge`, `ergebnis = gesamt_db - fix` mit `folgefehler_aus`. Mit ChatGPTs Prüfskript nachgeprüft: Fall 15/2.250/1.950 ⇒ **3/4**. Fünf weitere Aufgaben mit gleichem Muster gefunden und ebenso umgestellt: lf04-k04-01, lf05-k04-02, lf06-k07-02, lf08-k02-02, lf13-k04-02. |
| I08 AP1 | Review-Auftrag auf LF 1–7 (KMK S. 8) berichtigt. |
| I09 Netto | LF 12 K5: vollständige Übungsabrechnung (alle Werte laut Fall) in Text und Tabelle; neue Aufgabe `ik2024-lf12-k05-04` mit Brutto, AN-Anteilen, Netto, Auszahlung und Folgefehlerkette. |
| I10 Check | LF 12 K5: Fall „Abrechnung geprüft und korrekt“, damit genau eine Antwort richtig ist. |

**Prüf-Marker:** übernommen und geschlossen mit Quelle/Stand: Aufbewahrung (BEG IV), ADR 2025 (allgemein, Einzelfallprüfung bleibt), UWG-Umweltaussagen (seit 27.09.2026), Incoterms 2020, § 267 HGB mit Schwellen und MAKEL-Einordnung, § 15a InsO inkl. Überschuldung, EZB, §§ 2, 3, 35 GWB, § 164 SGB IX, NachwG Textform, Entgelt-Jahreswerte (als Hinweis), § 23 KSchG mit Teilzeitgewichtung, § 12 IndKflAusbV. **Offen bleiben bewusst:** Verpackungsrecht (LF 7 K5) und gesetzliche Neuregelung der Arbeitszeiterfassung (LF 12 K4, nur Entwurf). Zusätzlich: § 249 HGB Dreimonatsgrenze, § 109 GewO elektronisch mit Einwilligung.

**Weitere Korrekturen aus Claudes Selbstprüfung (Commit `f5d7eb8`):** LF 12 Personalfälle mit Ayla Brandt; Näherei → Musterfertigung; gezeichnetes Kapital LF 10 = 100.000 €.

**KfB-Befunde zur Entscheidung durch Lukes (nicht geändert):** (1) `gemeinsam.json` „beleg“: 10 statt 8 Jahre; (2) `lf1-k4-tarif-mitbestimmung` JAV-Wählbarkeit „Beschäftigte unter 25“ — Auszubildende sind seit 2021 unabhängig vom Alter wählbar (§ 61 BetrVG).

**Tests:** industriekaufleute_test 8.273/0 (285 Aufgaben); ChatGPT-Rechenskript 4.900 Ziehungen, 3.700 volle Bewertungen, keine Fehler; Funktionstest, Lernkern-Audit und `pruefe.py` siehe Commit-Nachricht.

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
4. **Lehrplanabdeckung:** Passen die Kapitel zum KMK-Rahmenlehrplan vom 15.12.2023 (Kompetenzbeschreibungen je Lernfeld)? Fehlt etwas Prüfungsrelevantes für AP Teil 1 (laut KMK-Rahmenlehrplan S. 8: LF 1–7)?
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
