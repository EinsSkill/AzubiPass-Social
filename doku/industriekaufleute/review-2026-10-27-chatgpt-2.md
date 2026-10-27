# Gegenprüfung Industriekaufleute IK 2024 · 27.10.2026 · ChatGPT (2)

**Geprüfter Anwendungsstand:** `7b93c0afd28491ee20105c4782f816b8ac14ec45`, Branch `industriekaufleute-umsetzung`.
**Vorgänger:** Claude, Selbstprüfung `f5d7eb8`, Nachbesserung `4beed02`, neuer Build-Zeitstempel `7b93c0a`; erster ChatGPT-Review `f64e089`.
**Rolle:** gezielte fachliche Gegenprüfung; Rückgabe an Claude / Lukes.

## Ergebnis

Die ursprünglichen **I01–I10 sind im jeweils beanstandeten Punkt behoben**. Die drei hohen Befunde aus dem ersten Review sind geschlossen. Bei den zusätzlich geänderten Stellen bleiben **drei neue Befunde mittlerer Schwere (I11–I13)**: eine sachlich unpassende Folgefehlerabhängigkeit, die Textformvoraussetzungen des NachwG und eine zu pauschale UWG-Zusammenfassung. Deshalb noch keine uneingeschränkte fachliche Veröffentlichungsempfehlung.

Ausschließlich Dokumentation und ausführbare Reviewbelege werden abgelegt. Keine Änderungen an `quellen/`, `docs/`, Datenbank oder `main`; kein Merge. Der nachfolgende Dokumentationscommit ist nicht der geprüfte Anwendungscommit.

## Abnahme I01–I10

| Kennung | Ergebnis / Gegenfall |
|---|---|
| I01 | Geschlossen. LF03 K02 trennt Kosten, Leistungsort und Gefahr; Tabelle, Langfassung und Aufgabe `-03` stimmen im B2B-Versendungsgrundfall überein. Nur „frei Haus“: MAKEL zahlt Versand, Käufer trägt die Gefahr ab Transporteurübergabe. Zusätzliche Abrede „Gefahrübergang bei Ablieferung“: MAKEL trägt sie bis dahin. Der zweite Fall steht in Erklärung/Fall und Antwort-Echo, nicht als eigene zweite Auswahlaufgabe. |
| I02 | Geschlossen. LF01 K07 und `ik2024-gemeinsam.json` enthalten keine Altersgrenze für Auszubildende mehr; Aufgaben und Karten angepasst. Drei 19-jährige plus zwei 28-jährige Auszubildende ergeben fünf: bei vorhandenem Betriebsrat JAV-Voraussetzung erfüllt. Drei wählbare Arbeitnehmer für den Betriebsrat ergänzt. |
| I03 | Geschlossen. LF10 K02 a3 unterscheidet fortgeführte AK/HK bei abnutzbarem AV von der UV-Grenze; Finanzanlagen-Wahlrecht und Firmenwertausnahme ergänzt. 10.000 € / fünf Jahre / zwei Jahre: 2.000 € planmäßige Jahres-AfA, Grenze 6.000 €. Neue Aufgabe `-04`: 4/4 richtig, 3/4 bei 2.100 € AfA und konsequenten 5.800 € als eigener Grenze. |
| I04 | Geschlossen. Gewöhnliche, selbstschuldnerische und Ausfallbürgschaft in LF10 K08 getrennt; § 349 HGB und private Bürgschaft der Gesellschafterin erklärt. Der beanstandete „nur“-Fehler fehlt in Check und Karte. |
| I05 | Geschlossen. LF12 K03 fragt jetzt nach der gesetzlichen Zweiwochenfrist längstens sechs Monate; Tarifabweichung, Befristungsverhältnismäßigkeit, KSchG-Wartezeit und BBiG sind getrennt. Neuer, eigenständiger NachwG-Befund siehe I12. |
| I06 | Geschlossen. LF12 K07 erklärt Wartezeit, Austrittsdatum und Mehrurlaub auch in der Grafik. Nach erfüllter Wartezeit: 31. März grundsätzlich 3/12, 30. September grundsätzlich voller gesetzlicher Jahresurlaub; genommenen Urlaub berücksichtigen. |
| I07 | Geschlossen für `ik2024-lf08-k06-01`. Originalmodul liefert für 14 / 2.100 / 1.800 **4/4**, für 15 / 2.250 / 1.950 **3/4**, für 15 / 2.240 / 1.900 **0/4**. Bei der zusätzlich umgestellten LF06-Aufgabe entsteht dagegen I11. |
| I08 | Geschlossen. Review-Auftrag nennt nun LF 1–7 für AP1. Keine neue Gesamtprüfung der Lehrplanabdeckung in dieser Gegenprüfung. |
| I09 | Geschlossen für den verlangten Mindestumfang. LF12 K05 enthält nun eine vollständige, ausdrücklich fiktive Brutto–Netto–Auszahlungsrechnung und Aufgabe `-04`: 2.750 / 550 / 1.890 / 1.800 ergibt **6/6**. Eigener Bruttofehler 2.800 / 560 / 1.930 / 1.840 ergibt **5/6**. Steuer-/SV-Brutto sind im Fall ausdrücklich gleich; separate Versicherungszweige und abweichende Bemessungsgrundlagen werden hier noch nicht vertieft, aber nicht falsch gerechnet. |
| I10 | Geschlossen. Geprüfte, korrekte Abrechnung und unverändertes Brutto grenzen den Check ein; genau eine angebotene Antwort passt. |

## Neue Befunde

### I11 · mittel · Folgefehler verändert eine bereits vorgegebene Absatzmenge

**Datei/Fundstelle:** `quellen/ik2024-lf06-k07.aufgaben.json:88`, Aufgabe `ik2024-lf06-k07-02`, insbesondere Formeln `menge`/`gewinn` (:89–90), Aufgabentext (:95), Ergebnisfeld und `folgefehler_aus` (:109–115). Ebenso gebaut in `docs/mittel/aufgaben.json`.

**Befund:** Der erwartete Absatz wird beim Ziehen aus der richtigen Gewinnschwelle erzeugt und anschließend als feste Zahl angezeigt. Gefragt wird das Ergebnis **bei dieser vorgegebenen Menge**. Die neue Folgefehlerregel setzt dagegen die falsch eingegebene Gewinnschwelle auch in die Mengenerzeugung ein. So verändert sie bei der Bewertung unbemerkt eine Angabe des Aufgabentexts. Gewinnschwelle und Ergebnis bei gegebener Absatzmenge sind hier keine fachliche Rechenkette.

**Reproduktion:** Fixkosten 1.500 €, variable Stückkosten 15 €, Preis 20 €, angezeigter Absatz 340 Stück. Richtig: Schwelle 300, Ergebnis 200 €. Die Eingabe **310 / 250 erhält 2/4 Punkte** als Folgefehler, obwohl 250 € nur für einen Absatz von 350 Stück passen. Diese Menge steht nicht im Fall. 310 / 200 erhält zu Recht 2/4.

**Vorschlag:** Den Folgefehlerbezug von `gewinn` auf `schwelle` für diese Aufgabenstellung entfernen; Ergebnis anhand der fest angezeigten Absatzmenge bewerten. Alternativ die Aufgabenstellung ausdrücklich auf „eigene berechnete Gewinnschwelle plus 40 Stück“ umstellen und den Zuschlag anstelle einer festen Menge anzeigen. Bei der ersten Variante muss 310 / 250 **0/4**, 310 / 200 **2/4**, 300 / 200 **4/4** ergeben. Nicht nur die Formel auf `menge * db - fix` ändern: Der Originalrechner berechnet abgeleitete Größen bei Folgefehlern erneut und würde `menge` weiterhin verändern.

**Beleg:** [14 Gegenfälle, Originalrechner](belege/review-2026-10-27-2-gegenfaelle.json); [ausführbares Skript](belege/review-2026-10-27-2-gegenfaelle.cjs). Dies ist ein neu eingeführter Bewertungsfehler; der alte I07-DB-Fall bleibt geschlossen.

### I12 · mittel · NachwG: tatsächliche Empfangsbestätigung statt Aufforderung; Fristen fehlen

**Datei/Fundstelle:** `quellen/ik2024-lf12-k03.kapitel.json:275`, Hinweis a4; Langfassung a4 :76. Ebenso `docs/ik2024-lf12.html`.

**Befund:** Der neue Text macht die elektronische Textform davon abhängig, dass die beschäftigte Person den Empfang bestätigt. § 2 Abs. 1 Satz 2 NachwG verlangt an dieser Stelle, dass der **Arbeitgeber mit der Übermittlung zur Erteilung eines Empfangsnachweises auffordert**. Das ist eine andere Voraussetzung. Die Zugänglichkeit sollte zusätzlich ausdrücklich genannt werden. Die schon im ersten Review verlangten gestaffelten Nachweisfristen fehlen weiterhin im Kapitel.

**Vorschlag:** Zugängliches, speicher- und druckbares Dokument plus Aufforderung des Arbeitgebers zum Empfangsnachweis nennen; tatsächlichen Empfang/Zugang und dessen Beweis davon unterscheiden. Unverzügliche Papierfassung auf Verlangen und Branchenausnahmen erhalten. Fristen knapp ergänzen: Parteien/Entgelt/Arbeitszeit spätestens erster Arbeitstag; Beginn/Befristung/Arbeitsort/Tätigkeit/Probezeit/Abrufarbeit/Überstunden spätestens siebter Kalendertag; übrige Angaben spätestens ein Monat nach vereinbartem Beginn.

**Abnahme:** Elektronisch zugängliches PDF mit Speicher-/Druckmöglichkeit und Aufforderung zum Empfangsnachweis wird nicht allein wegen ausstehender Bestätigung als gesetzlich unzulässige Form gelehrt; Fristengruppen werden korrekt unterschieden. [Primärquelle: § 2 Abs. 1 NachwG](https://www.gesetze-im-internet.de/nachwg/__2.html).

### I13 · mittel · UWG-Kurzregel unterschlägt staatliche Siegel und verallgemeinert Produktverbot

**Datei/Fundstelle:** `quellen/ik2024-lf09-k05.kapitel.json:259`, Hinweis a3; ebenso `docs/ik2024-lf09.html`.

**Befund:** „Keine Nachhaltigkeitssiegel ohne anerkanntes Zertifizierungssystem“ lässt die gesetzliche Alternative eines von staatlichen Stellen festgesetzten Siegels weg. Die pauschale Aussage zur kompensationsbasierten Klimaneutralitätswerbung nennt außerdem nicht den Produktbezug des Tatbestands. Der Anhang regelt geschäftliche Handlungen gegenüber Verbrauchern; das sollte im Lehrtext erkennbar sein. Allgemeine Irreführungsregeln können darüber hinaus greifen, rechtfertigen aber keine grenzenlose Wiedergabe dieses konkreten Verbots.

**Vorschlag:** Als Verbraucherwerbung einordnen: Nachhaltigkeitssiegel müssen auf einem Zertifizierungssystem beruhen **oder von staatlichen Stellen festgesetzt sein**. Keine kompensationsgestützten Aussagen, ein **Produkt** habe neutrale, verringerte oder positive Treibhausgaswirkungen. Bei allgemeinen Umweltaussagen die **anerkannte** hervorragende Umweltleistung nennen; Aspekt- und Gesamtproduktaussage auseinanderhalten.

**Abnahme:** Staatlich festgesetztes Siegel wird nicht allein wegen fehlender Zertifizierung nach der ersten Alternative verworfen; kompensationsgestützte Produktneutralität bleibt verboten. [Primärquelle: UWG-Anhang Nr. 2a, 4a–4c, Einleitung](https://www.gesetze-im-internet.de/uwg_2004/anhang.html).

## Zusätzliche Aufgaben und Selbstprüfung

| Stelle | Gegenprüfung |
|---|---|
| LF04 K04 `-01` | Zieleinkaufspreis → skontierter Bezugspreis fachlich passend. Eigener ZEP 910 € bei Listenpreis 1.000 €, Rabatt 10 %, Skonto 2 %, Fracht 20 € führt konsequent zu 911,80 €; **3/4**. |
| LF05 K04 `-02` | 19 % auf eigenen Nettowert wird als Folgefehler anerkannt: 1.100 / 209 statt 1.000 / 190 gibt **1/3**. Standardlösungen unverändert; die Erklärung nennt alternativ Brutto minus Netto. |
| LF06 K07 `-02` | Standardlösung richtig, zusätzliche Folgefehlerfreigabe fachlich falsch: **I11**. |
| LF08 K02 `-02` | Gesamtkosten → Stückkosten passend: eigene 9.100 € / 1.000 Stück = 9,10 €, **2/4**. |
| LF13 K04 `-02` | Prozentpunkte → relativer Rückgang passend: bei 20 % → 10 % führen eigene 12 Prozentpunkte zu eigenen 60 %, **2/4**. |
| LF10 K02 `-04` | Alle **12** Kombinationen der Variablen unabhängig mit AK × (ND − Jahre) / ND verglichen: keine Abweichung. Abgefragt wird die Obergrenze, nicht der mangels Restbuchwert nicht bestimmbare Zuschreibungsbetrag. |
| LF12 K05 `-04` | Alle **168** Variablenkombinationen unabhängig nachgerechnet: keine Abweichung. Fiktive Parameter und Sachbezug ausdrücklich festgelegt. |
| Ayla Brandt | Personalfälle in LF12 entsprechend geändert; keine Sandra-Restnennung in den LF12-Quelldateien gefunden. |
| Musterfertigung | „Näherei“ in den betroffenen LF12-Fällen durch Musterfertigung ersetzt; Veredelung bleibt eigener Bereich. |
| Stammkapital | LF10 K01 nennt 100.000 € auch in variabler Aufgabe, Check und Erläuterung; Beispiel-Eigenkapital 160.000 € ist konsistent. |

## Geschlossene und verbleibende Prüfmarker

Primärquellen am 27.10.2026 nachgelesen, soweit unten angegeben. Die Tabelle bewertet den dargestellten Grundumfang, keine rechtliche Vollprüfung beliebiger Geschäftsfälle.

| Marker | Ergebnis / Quelle |
|---|---|
| Aufbewahrung | Acht Jahre Buchungsbelege, zehn Jahre Bücher/Inventare/Abschlüsse und Verlängerungshinweis passen zu [§ 147 AO](https://www.gesetze-im-internet.de/ao_1977/__147.html). |
| ADR | Allgemeiner Hinweis beschränkt sich auf Stoff/Menge und Einzelfallprüfung; keine konkrete Gefahrgutfreigabe. ADR-2025-Version war im Erstbericht belegt; UNECE-Seite beim erneuten Abruf 403, daher keine neue unabhängige Detailvalidierung behauptet. |
| Umweltaussagen | Noch nicht vollständig schließbar: **I13**. |
| Incoterms | Vereinbarung, benannter Ort und Fassung stehen im bestehenden Text. ICC nennt weiterhin [2020 als jüngste Ausgabe](https://iccwbo.org/business-solutions/incoterms-rules/). |
| § 267 HGB | 7,5/15 Mio. €/50 und 25/50 Mio. €/250 sowie Zweistichtagsregel richtig; MAKEL mittelgroß. [Gesetz](https://www.gesetze-im-internet.de/hgb/__267.html). |
| Insolvenz | Überschuldung ergänzt; drei/sechs Wochen als Höchstfristen, kein beliebiges Abwarten. [§ 15a InsO](https://www.gesetze-im-internet.de/inso/__15a.html). |
| EZB | Mittelfristiges 2-%-Ziel und Leitzinsen als Hauptinstrument passen zur [Strategie 2025](https://www.ecb.europa.eu/mopo/strategy/strategy-review/ecb.strategyreview202506_strategy_statement.en.html); kein aktueller Zinssatz behauptet. |
| GWB | Vier Freistellungsbedingungen und 500/50/17,5-Mio.-Regelschwellen stimmen. Mittelstand, Transaktionswert und EU werden als gesonderte Prüfung genannt. [§ 2](https://www.gesetze-im-internet.de/gwb/__2.html), [§ 3](https://www.gesetze-im-internet.de/gwb/__3.html), [§ 35](https://www.gesetze-im-internet.de/gwb/__35.html). |
| § 164 SGB IX | Prüfpflicht, Kontakt Arbeitsagentur und Beteiligung vorhanden; keine private Einladungspflicht erfunden. Redaktionell die Ablehnung ausdrücklich nur auf SBV-Beteiligung beziehen, damit BR-Unterrichtung nicht mit ausgenommen erscheint. [Gesetz](https://www.gesetze-im-internet.de/sgb_9_2018/__164.html). |
| NachwG | Noch nicht vollständig schließbar: **I12**. |
| Entgelt-Jahreswerte | Aktualitätshinweis genügt; neue Aufgabe enthält ausschließlich vollständig vorgegebene, fiktive Werte. |
| Kündigungsschutz | Teilzeitgewichtung 0,5/0,75 und Auszubildendenausschluss ergänzt; ursprüngliche Fristenkorrektur I05 erledigt. [§ 23 KSchG](https://www.gesetze-im-internet.de/kschg/__23.html), [§ 622 BGB](https://www.gesetze-im-internet.de/bgb/__622.html), [§ 15 Abs. 3 TzBfG](https://www.gesetze-im-internet.de/tzbfg/__15.html). |
| Fachaufgabe | Genehmigungsantrag vor Durchführung, 3–5 Dokumentationsseiten, höchstens drei Anlagenseiten und 30 Minuten passen. „Höchstens etwa 10 Minuten“ besser quellennah als Sollgrenze formulieren; keine zusätzliche Fachkorrektur erforderlich. [§ 12 IndKflAusbV](https://www.gesetze-im-internet.de/indkflausbv/__12.html). |
| Ergänzungen | Dreimonatsgrenze unterlassene Instandhaltung richtig ([§ 249 HGB](https://www.gesetze-im-internet.de/hgb/__249.html)); elektronisches Zeugnis mit Einwilligung richtig ([§ 109 GewO](https://www.gesetze-im-internet.de/gewo/__109.html)). |
| Bewusst offen | Verpackungsrecht LF07 K05 und gesetzliche Arbeitszeiterfassungs-Neuregelung LF12 K04 bleiben sichtbar offen. Beide werden durch diesen Review nicht freigegeben. Der dynamische Basiszins-Hinweis auf Lernfeldebene LF03 bleibt ebenfalls vorhanden; das ist ein Aktualitätshinweis, kein neuer ungelöster Zahlenfall. |

## Eigene Prüfbelege und Grenzen

Während der Ablage rückte der Branch auf `2ad9a81` vor (KfB-Korrekturen und Lernfeld-Reihenfolge). Diese fremden Änderungen bleiben vollständig erhalten. Die Dokumentation wird darauf aufgesetzt; der fachlich geprüfte IK-Anwendungsstand bleibt ausdrücklich `7b93c0a`. Keine nachträgliche Gesamtfreigabe von `2ad9a81`.

- `python quellen/industriekaufleute_test.py`: **8.273 bestanden, 0 Fehler, 285 Aufgaben**.
- Vorhandenes Rechenskript unabhängig erneut ausgeführt: **4.900 Ziehungen, 3.700 volle Lösungsbewertungen, keine Skriptfehler**. [Neue Ausgabe](belege/review-2026-10-27-2-rechencheck.json). Solche Sollwertprüfungen allein entdecken I11 nicht.
- Zusätzlich Originalrechner mit **14 gezielten Bewertungsfällen**, alle beobachteten Punktzahlen reproduzierbar; I11 ist dabei ausdrücklich ein reproduzierter Fehler und kein fachlich bestandener Fall. Neue Aufgaben vollständig über **12 + 168** Wertekombinationen unabhängig nachgerechnet.
- Für alle acht gezielt geprüften Rechenaufgaben stimmen `variablen`, `abgeleitet`, `anzeige` und `eingabe` zwischen Quellen und gebautem Aufgabenbestand überein. Betroffene gebaute Kapitel enthalten auch die neuen Rechtskurztexte; I12/I13 sind somit nicht nur Quelldateifehler.
- Online-Rechtsquellen gelesen; bei einzelnen Timeouts des Suchdiensts direkte HTML-Abfrage derselben amtlichen Seite verwendet. ADR-Abrufgrenze ausdrücklich oben dokumentiert.
- Keine unabhängige Wiederholung der großen Browserregression: Playwright/Chromium fehlen in dieser Umgebung. Die aktuelle Commit-Nachricht `7b93c0a` enthält keine konkreten Ergebnisse von Funktionstest/Lernkern/`pruefe.py`; der Vorgänger kündigt sie lediglich an. Diese Ergebnisse vor Abschluss bitte in der Übergabe konkret nachtragen. Keine Live-, Handy-, Offline- oder visuelle Abnahme behauptet.
- KfB-Inhalte einschließlich der bekannten Belegfrist/JAV-Wählbarkeit bleiben außerhalb dieses Auftrags. Keine Anwendung gebaut oder verändert.

## Nächster erlaubter Schritt

Claude korrigiert gezielt **I11–I13**, übernimmt die jeweiligen Gegenfälle und baut neu. Nach Änderung des Aufgabentexts/Formelbezugs I11 den passenden negativen Kontrollfall erneut belegen; bei I12/I13 Quelle und gebautes Kapitel gemeinsam aktualisieren. Ergebnisse der großen Regression konkret dokumentieren. Anschließend gezielte Schlussprüfung der drei Stellen; Merge und Live-Freigabe bleiben bei Lukes.
