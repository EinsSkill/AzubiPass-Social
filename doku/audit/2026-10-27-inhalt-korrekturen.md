# Inhaltliche Korrekturen nach den Lehrplan-Audits · 27.10.2026

**Auftrag:** Lukes, 27.10.2026 („du hast die erlaubnis direkt schritt 1 auszuführen“) — Schritt 1 der zusammengeführten Reihenfolge: alle bestätigten Fachfehler beheben.
**Grundlage:** `doku/audit/2026-10-27-lernfeld-audit-claude.md` (Claude) und `doku/audit/2026-10-27-lehrplan-und-langfassungen.md` (ChatGPT, Branch `doku/lerninhalte-audit-2026-10-27`). ChatGPTs F01–F07 wurden am Code nachgeprüft und alle bestätigt.
**Ausgangsstand:** `main` f943f65. **Branch:** `inhalt-korrekturen-2026-10-27`. Nicht gemergt, nicht live.

## Korrekturen

Kennungen: **C** = Claude-Audit, **G** = ChatGPT-Review.

| # | Kennung | Datei | Korrektur |
|---|---|---|---|
| 1 | G-F01 | `k4-erfolgskonten` | Abschlusskette in der Langfassung richtig herum: GuV an Aufwandskonto, Ertragskonto an GuV, GuV an EK, SBK an Aktivkonto, Passivkonto an SBK. Fallbeispiel als durchgerechneter Mini-Abschluss mit Kontrolle (alle Konten null, SBK 50.000 € ausgeglichen) und Gegenbeleg, warum „Mietaufwand an GuV“ falsch ist. |
| 2 | G-F02 | `k7-personal` | Pflegeversicherung hälftig 1,8/1,8 statt 1,9/1,7 (Grafik, Tabelle, Detail, Zusammenfassung). Alle Folgebeträge: SV je Seite 634,50 €, Netto 1.850,25 €, Personalkosten 3.634,50 € — in Text, Buchungssätzen und Buchungsgrafik. Sonderfälle (Kinderlosenzuschlag, Sachsen) benannt, Fallannahme offengelegt. Lohnsteuer 15 % als Übungsvorgabe gekennzeichnet; Personalkosten als „mindestens“ mit Hinweis auf Unfallversicherung und Umlagen. |
| 3 | C-F01 | `k5-warenkonten` (Kapitel + Aufgaben), `lf9-k1` Aufgabe | Skonto nicht mehr als „Skontoertrag/Skontoaufwand“, sondern IKR-gerecht: Einkauf → 6001 Nachlässe, Verkauf → 5001 Erlösberichtigungen. Tabelle, Merke, Karteikarte, Langfassung, Selbsttest, Prüfungstipp, Aufgabenerklärung. Die Aufgabe `buchfuehrung-k5-03` buchte bereits auf 6001 — Text und Lösung widersprachen sich vorher. |
| 4 | C-F02 | `k6-umsatzsteuer` (Kapitel + Aufgaben) | Neu: Steuerberichtigung nach § 17 UStG bei Skonto (Einkauf/Verkauf) und Rücksendung, mit Rechenweg brutto → netto + Steuer und Achtung-Kasten. Neue Buchungsaufgabe `buchfuehrung-k6-06` (Skonto mit Vorsteuerkorrektur, Zufallszahlen). |
| 5 | C-F03 | `k1-grundlagen` (Kapitel, Aufgaben), `gemeinsam.json` | § 141 AO: 800.000 € Umsatz / 80.000 € Gewinn statt 600.000 € / 60.000 € (seit 2024). |
| 6 | G-F03 | `lf4-k1-bedarf` | ABC-Check eindeutig gemacht: Gesamtwert (50.000 €) und Klassengrenze stehen jetzt in der Frage, „nicht bestimmbar“ wird korrekt begründet statt mit „in der Prüfung genügt die Größenordnung“ abgetan. Langfassung mit Gegenfall 38 Mio. €. |
| 7 | G-F04 | `lf4-k6-mangel` | Objektive Anforderungen: Abweichung zwischen Unternehmen durch klare Vereinbarung möglich, gegenüber Verbrauchern nur mit gesondertem Hinweis und ausdrücklicher Zustimmung (§ 476 BGB). |
| 8 | G-F05 | `lf8-k4-entgelt` | Job-Ticket nicht mehr pauschal steuerpflichtig; Steuerfreiheit nach § 3 Nr. 15 EStG genannt. |
| 9 | G-F06 | `lf8-k4-entgelt` | Einzugsstelle für den Gesamtsozialversicherungsbeitrag (KV, PV, RV, AV), Unfallversicherung gesondert — Erklärung, Tabelle, Verständnisfrage, Zusammenfassung. Weiche Trennstellen im langen Wort, damit 320 px nicht überlaufen. |
| 10 | G-F07 | `lf9-k6-investition` | Kalkulatorische Zinsen auf das durchschnittlich gebundene Kapital: ohne Restwert AK ÷ 2, mit Restwert (AK + R) ÷ 2. Gegenfall mit 20.000 € Restwert im Fallbeispiel durchgerechnet. „Immer“ entfernt. |
| 11 | C-F04 | `lf4-k4-kaufvertrag` | Beispiel: Bestellung ist der Antrag, nicht die Anfrage. |
| 12 | C-F05 | `lf12-k4-reisekosten` (Kapitel + Aufgaben) | Verpflegungspauschalen 2026 eingetragen (14 € / 28 €), Fallbeispiel und Selbsttest in Euro durchgerechnet (33,60 €). |
| 13 | C-F06–F08 | `lf3-k5-rechnung`, `lf3-k6-din5008`, `lf2-k5-datenschutz` | Kleinbetragsrechnung bis 250 € brutto (§ 33 UStDV); DIN-5008-Maße (Form A 27 mm, Form B 45 mm, Anschriftfeld 85 × 45 mm, Infoblock ab 125 mm, Ränder 25/20 mm), Grafik auf Form B ausgerichtet; DSGVO-Auskunft: ein Monat, Verlängerung um zwei Monate mit Begründung (Art. 12 Abs. 3). |
| 14 | C-S01 | `build.py`, `azubipass.css`, 6 Inhaltsdateien | Neues Feld `standhinweis` für Lernende („Stand: …“, ruhig gestaltet) statt redaktioneller „Zu prüfen“-Kästen. Umgestellt: Basiszinssatz (LF 4 K7, IK LF 3), Jahreswerte LF 1, Leasing-Zurechnung (LF 9 K5, Aussage präzisiert), Verpackungsrecht (IK LF 7 K5, Inhalt konkretisiert: LUCID, duales System, PPWR), ArbZG-Neuregelung (IK LF 12 K4). Der Build zählt Stand-Hinweise zur jährlichen Durchsicht. **In keinem Kapitel steht mehr ein sichtbarer Prüf-Marker.** |
| 15 | C-S02–S05 | `ausbildungsgaenge.json`, `buchfuehrung.lernfeld.json`, LF 3 | Lehrjahre nach RLP: LF 5 → 2, LF 9/10 → 3. LF-6-Untertitel mit offiziellem Titel und Zeitrichtwert. Vier Verweise aus LF 3 („kennst du aus Lernfeld 6/9“) als Vorausverweise formuliert. |

`funktionstest.py`: erwartete Zahl der Buchführungsbausteine 45 → 46 (neue Aufgabe k6-06).

## Tests

| Prüfung | Ergebnis |
|---|---|
| `build.py`, `build_app.py`, `build_landing.py` | fehlerfrei; keine offenen Prüf-Marker in Kapiteln; 26 LF, 529 Bausteine |
| `funktionstest.py` | 269/269 |
| `lernkern_audit_test.py` | alles in Ordnung (inkl. A09 320 px nach Trennstellen-Korrektur) |
| `industriekaufleute_test.py` | 8.271 bestanden, 0 Fehler |
| `pruefe.py --schnell` (11 geänderte Seiten) | keine Fehler, Freigabe möglich |

## Grenzen

- Aufgaben-interne `pruefen`-Felder in `k7-personal.aufgaben.json` und `k8-afa.aufgaben.json` bleiben bestehen; sie werden in der App nicht angezeigt und dienen der jährlichen Durchsicht.
- Jahreswerte (Pauschalen, Beitragssätze, § 141 AO, DIN-Maße) nach Stand Oktober 2026; DIN 5008 einmal am Normtext gegenhalten.
- Nicht enthalten (Schritt 2 ff.): Lehrplanlücken KfB (G01–G09 bzw. L-Punkte), Ausbau der Langfassungen, IK-Vertiefung.

## Nachbesserung nach ChatGPT-Review K01–K06 · 28.10.2026

Review: [review-2026-10-27-inhaltkorrekturen-chatgpt.md](review-2026-10-27-inhaltkorrekturen-chatgpt.md) @ `9662ce3`. Alle Befunde am Code bestätigt; K01 zusätzlich an den ZSVR-Seiten „Rollen und Pflichten“ und „Versand und Onlinehandel“ gegengeprüft.

| Kennung | Datei | Nachbesserung | Gegenfall / Abnahme |
|---|---|---|---|
| K01 | `ik2024-lf07-k05` (Kurzfassung a3, Langfassung a3, Stand-Hinweis) | Rechtsrahmen PPWR + VerpackDG seit 12.08.2026 (VerpackG abgelöst). Erst Rolle klären (Erzeuger/Hersteller), dann zwei MAKEL-Fälle. | Onlineshop: Versandkarton mit Logo an Privatkunden → Transportverpackung nach PPWR, aber ausnahmslos systembeteiligungspflichtig, LUCID-Registrierung. Großhandel: palettierte Lieferung an Boutiquen → keine Systembeteiligung, Rücknahme und nachweisliche Verwertung, künftig Zulassungspflicht (Übergang bis Ende 2027). Stand-Hinweis neu formuliert, nicht nur umdatiert. |
| K02 | `lf9-k5-leasing` (Grafikdetail, Hinweis) | Auf Vollamortisationsvertrag über Mobilien ohne Option und ohne Spezialleasing begrenzt. „Kennzahlen unberührt“ ersetzt: Keine Aktivierung und keine Darlehensschuld beim Nutzer, aber Raten mindern Gewinn und Liquidität. | Kaufoption 1.000 € bei 40.000 € Restwert → Zurechnung beim Leasingnehmer trotz 50 % Grundmietzeit. Hinweis nennt die Vertragstypen des Mobilien-Leasing-Erlasses. |
| K03 | `lf8-k4-entgelt` (Langfassung d2: Erklärung, Beispiel, Prüfungsbezug; Zusammenfassung; Aufgabe lf8-k4 Zuordnung + Erklärung) | Überall „steuerpflichtige geldwerte Vorteile“; Job-Ticket-Ausnahme nach § 3 Nr. 15 EStG in Langfassung, Zusammenfassung und Aufgabe. | Dienstwagen privat erhöht das Steuerbrutto, zusätzlich gewährtes ÖPNV-Ticket nicht — in jeder Darstellungsform. |
| K04 | `k1-grundlagen` (Kurzfassung, Tabelle, Zusammenfassung, Langfassung a2, Selbsttest), `k1-grundlagen.aufgaben` (Echo), `gemeinsam.json` (§ 141 AO, § 238 HGB, neu § 241a HGB) | Überall „mehr als“; Pflichtbeginn ab dem Wirtschaftsjahr nach Mitteilung des Finanzamts; Befreiung kleiner Einzelkaufleute nach § 241a HGB (800.000/80.000 an zwei Stichtagen), nie für Gesellschaften. | Genau 800.000/80.000 → keine Pflicht nach § 141; 1 € mehr → Pflicht ab dem Jahr nach Mitteilung; Einzelkaufmann 2 × 300.000/40.000 → befreit; GmbH mit denselben Zahlen → pflichtig. Die MAKEL-Aufgabe (Formkaufmann) bleibt richtig. |
| K05 | `lf4-k6-mangel` (b1) | Verbraucher wird **vor Abgabe seiner verbindlichen Bestellung** informiert, Abweichung ausdrücklich und gesondert vereinbart (§ 476 Abs. 1 BGB). B2B: AGB-Klausel muss wirksam einbezogen sein. | Hinweis vor der Bestellung + eigenes Ankreuzfeld → wirksam; Hinweis erst in der Bestellbestätigung → zu spät; AGB-Klausel → nie ausreichend. |
| K06 | `lf3-k6-din5008` (Briefgrafik, Lead, Anschriftfeld-Notiz, Regel) | Textzonen auf 25 mm linken Rand und 20 mm rechten Rand ausgerichtet (x = 25, Breite 165), Anschriftfeld beginnt bei 20 mm mit Hinweis auf eingerückte Anschrift bei 25 mm, Infoblock bis 190 mm. Grafik ausdrücklich als schematisch gekennzeichnet; Verweis auf DIN 5008:2020-03 und die Briefvorlage des Betriebs. | **Grenze:** Volltext der Norm war auch hier nicht zugänglich; die Maße sind als gängige Normangaben übernommen, nicht am Normtext verifiziert. |

**Regression nach Nachbesserung:** drei Builds fehlerfrei (595 Begriffe: § 241a HGB neu im Speicher und auf der Buchführungsseite verlinkt; Anzahl unaufgelöster Verweise in Datenblöcken gegenüber vorher unverändert), `funktionstest.py` 269/269, `lernkern_audit_test.py` alles in Ordnung, `industriekaufleute_test.py` 8.271/0, `pruefe.py --schnell` auf den sechs betroffenen Seiten ohne Fehler.

## Nächster Schritt

Gezielte Schlussprüfung von K01–K06 durch ChatGPT, dann Lukes: Merge-Freigabe. Danach Schritt 2 (KfB-Pflichtlücken) und die Langfassungen nach dem gemeinsamen Zielstandard.
