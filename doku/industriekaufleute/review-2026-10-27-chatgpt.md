# Review Industriekaufleute IK 2024 · 27.10.2026 · ChatGPT

Geprüfter Anwendungsstand: `f69a3536438a68e4fb5dd37eeb91b100d322233e`, Branch `industriekaufleute-umsetzung`.
Vorgänger: Claude, Umsetzung aller 13 Lernfelder und Übergabe vom 27.10.2026.
Rolle: fachliches Review und unabhängige Rechengegenprüfung. Rückgabe an Claude zur gezielten Nachbesserung; Freigaben bleiben bei Lukes.

## Ergebnis

**Änderungen empfohlen, noch keine fachliche Veröffentlichungsempfehlung.** Zehn Befunde: **3 hoch, 6 mittel, 1 niedrig**. Besonders wichtig sind die falsche Risikozuordnung bei „frei Haus“, die veraltete JAV-Altersgrenze und die unvollständige Zuschreibungsgrenze. Die Struktur ist weitgehend lehrplangerecht; die automatischen Strukturtests ersetzen diese fachlichen Korrekturen nicht.

Keine Änderungen an `quellen/`, `docs/`, Datenbank oder `main`. Ein nachfolgender Dokumentationscommit ist vom geprüften Anwendungscommit zu unterscheiden. `main` wurde vor der Ablage als `e6fca923d3686b7af74ab4d556ab5acb339bd97f` gelesen.

Fundstellen beziehen sich auf den geprüften Commit. Dateipfade beginnen, soweit nicht anders angegeben, mit `quellen/`.

## Befunde

### I01 · hoch · „Frei Haus“ verschiebt das Transportrisiko nicht automatisch

**Dateien/Fundstellen:** `ik2024-lf03-k02.kapitel.json:56`, Langfassung a3, Fall/Verständnisfrage und Tabelle a3 (`:61`, `:64`, `:175`); `ik2024-lf03-k02.aufgaben.json:101`, Aufgabe `ik2024-lf03-k02-03`, insbesondere `:118–129`. Der Fehler ist auch in `docs/ik2024-lf03.html` gebaut.

**Befund:** Das Kapitel lehrt und die Aufgabe bewertet „MAKEL trägt Kosten und Risiko bis zur Ablieferung“ als zwingende Folge der alleinigen Vereinbarung „frei Haus“. Damit fehlt in der Aufgabe eine fachlich passende Antwort. Die Übernahme von Versandkosten bestimmt für sich allein weder einen anderen Leistungsort noch eine abweichende Gefahrtragung. Beim B2B-Versendungskauf ist § 447 BGB gesondert zu prüfen; eine ausdrücklich vereinbarte Bringschuld oder andere Gefahrregelung kann zu einem anderen Ergebnis führen.

**Vorschlag:** Kosten, Leistungsort und Gefahrübergang getrennt erklären. Im Fall entweder ausdrücklich nur die Kostenklausel vereinbaren und eine entsprechend differenzierte Antwort anbieten oder eine zusätzliche Risikoübernahme ausdrücklich in den Vertrag schreiben. „Ab Werk“ nicht ohne Erklärung mit Incoterms EXW gleichsetzen.

**Abnahme:** B2B-Versendung mit bloßem „frei Haus“ und B2B-Vertrag mit ausdrücklicher Gefahrtragung bis Ablieferung ergeben unterschiedliche, begründete Lösungen. Quellen: [§ 269 Abs. 3 BGB](https://www.gesetze-im-internet.de/bgb/__269.html), [§ 447 BGB](https://www.gesetze-im-internet.de/bgb/__447.html), [§ 448 BGB](https://www.gesetze-im-internet.de/bgb/__448.html).

### I02 · hoch · JAV: Auszubildende werden fälschlich auf unter 25 begrenzt

**Dateien/Fundstellen:** `ik2024-lf01-k07.kapitel.json:36`, a2 einschließlich Merksätzen, Check, Zusammenfassung und Selbsttest; `ik2024-gemeinsam.json:393–394`, Eintrag `betrvg-60`; `ik2024-lf01-k07.aufgaben.json:118` und `:195–216`, Aufgaben `ik2024-lf01-k07-02` und `-04`.

**Befund:** Wiederholt werden nur Auszubildende unter 25 für die Mindestzahl nach § 60 BetrVG berücksichtigt. Der aktuelle Gesetzestext erfasst neben jugendlichen Arbeitnehmern die zur Berufsausbildung Beschäftigten ohne diese Altersgrenze. So kann ein Betrieb mit drei 19-jährigen und zwei 28-jährigen Auszubildenden sowie vorhandenem Betriebsrat in der App falsch beurteilt werden. Der konkrete MAKEL-Fall mit insgesamt nur drei Auszubildenden bleibt bei fehlenden weiteren Jugendlichen im Ergebnis unverändert.

**Vorschlag:** Altersgrenze in Regel, Paragraphenspeicher, Karten und Lösungserläuterungen entfernen; Wahlberechtigung und Wählbarkeit nicht vermischen. Bei der benachbarten Betriebsratsregel zusätzlich die drei wählbaren Arbeitnehmer nennen.

**Abnahme:** Gegenfall 3 jüngere + 2 ältere Auszubildende wird richtig gelöst. Quellen: [§ 60 BetrVG](https://www.gesetze-im-internet.de/betrvg/__60.html), [§ 1 BetrVG](https://www.gesetze-im-internet.de/betrvg/__1.html).

### I03 · hoch · Zuschreibung bei abnutzbarem Anlagevermögen zu weit gefasst

**Datei/Fundstelle:** `ik2024-lf10-k02.kapitel.json:56`, Langfassung a3, letzter Satz.

**Befund:** Nach Wegfall eines Abschreibungsgrundes nennt die allgemeine Regel nur die ursprünglichen Kosten als Obergrenze. Bei abnutzbarem Anlagevermögen ist die planmäßige Abschreibung weiter zu berücksichtigen: Grenze sind die fortgeführten AK/HK. Beispiel: AK 10.000 €, Nutzungsdauer fünf Jahre; nach zwei Jahren wäre die Obergrenze 6.000 €, auch wenn ein außerplanmäßiger Wertverlust vollständig entfällt.

**Vorschlag:** Umlaufvermögen und abnutzbares Anlagevermögen trennen; Zuschreibung auf fortgeführte AK/HK erläutern. Ergänzend das Wahlrecht bei nur vorübergehender Wertminderung von Finanzanlagen und die Ausnahme des entgeltlich erworbenen Geschäfts- oder Firmenwerts nennen.

**Abnahme:** Kurzer Fall mit planmäßiger und außerplanmäßiger Abschreibung samt späterer Werterholung. Quelle: [§ 253 Abs. 1, 3 und 5 HGB](https://www.gesetze-im-internet.de/hgb/BJNR002190897.html#BJNR002190897BJNG005403377).

### I04 · mittel · Gewöhnliche Bürgschaft und Ausfallbürgschaft vermischt

**Datei/Fundstelle:** `ik2024-lf10-k08.kapitel.json:36`, a2, sowie Check-Echo `:123` und Karte `:128`.

**Befund:** Die Einrede der Vorausklage wird als definierendes Merkmal der Ausfallbürgschaft dargestellt; das Echo behauptet sogar, vorherige Vollstreckung gelte „nur“ dort. § 771 BGB regelt die Einrede des gewöhnlichen Bürgen. Die besondere Haftung erst für einen nachgewiesenen Ausfall ist davon zu unterscheiden. Auch der kaufmännische Ausschluss der Einrede wird trotz Behandlung des § 350 HGB nicht erwähnt.

**Vorschlag:** Für den Einstieg gewöhnliche Bürgschaft mit Einrede und selbstschuldnerische Bürgschaft ohne Einrede vergleichen. Ausfallbürgschaft gegebenenfalls als gesonderte vertragliche Gestaltung erläutern. Handelsgeschäft des Bürgen und persönliche Bürgschaft einer GmbH-Gesellschafterin auseinanderhalten.

**Abnahme:** Drei Begriffe und ihre Voraussetzungen klar getrennt, kein „nur“-Fehler im Echo. Quellen: [§ 771 BGB](https://www.gesetze-im-internet.de/bgb/__771.html), [§ 349 HGB](https://www.gesetze-im-internet.de/hgb/__349.html). Die BGH-Volltextseite XI ZR 234/11 war hier nicht abrufbar; die Abgrenzung wird nicht als eigenständige vollständige Rechtsprechungsanalyse ausgegeben.

### I05 · mittel · Sechs Monate als pauschale Höchstdauer der Probezeit

**Datei/Fundstelle:** `ik2024-lf12-k03.kapitel.json:76`, a4, besonders Verständnisfrage `:85`, Merksatz `:88`/`:169`, Check `:163` und Selbsttest `:184`.

**Befund:** § 622 Abs. 3 BGB begrenzt die Zweiwochenfrist auf höchstens sechs Monate; daraus wird eine allgemeine gesetzliche Höchstdauer jeder Probezeit gemacht. Die dargestellte Regel ignoriert außerdem die erforderliche Verhältnismäßigkeit einer Probezeit bei Befristung. Tarifliche Abweichungen und die vom Probezeitbegriff getrennte KSchG-Wartezeit sind nicht dasselbe.

**Vorschlag:** „Während vereinbarter Probezeit gilt die gesetzliche Zweiwochenfrist längstens sechs Monate“ formulieren; Befristung und Ausbildungsprobezeit ausdrücklich abgrenzen. Die allgemeinen Wissensfragen entsprechend eingrenzen.

**Abnahme:** Check fragt nach dem Zeitraum der gesetzlichen verkürzten Kündigungsfrist, nicht nach einer universellen Höchstdauer. Quellen: [§ 622 Abs. 3–4 BGB](https://www.gesetze-im-internet.de/bgb/__622.html), [§ 15 Abs. 3 TzBfG](https://www.gesetze-im-internet.de/tzbfg/BJNR196610000.html).

### I06 · mittel · Austrittsgrafik legt pauschal anteiligen Urlaub nahe

**Datei/Fundstelle:** `ik2024-lf12-k07.kapitel.json:150`, allgemeine Austrittscheckliste, Schritt Urlaub.

**Befund:** Die Aufforderung, beim Ausscheiden anteiligen Urlaub zu ermitteln, enthält keine zeitliche Einschränkung. Nach erfüllter Wartezeit ist bei Ausscheiden in der zweiten Jahreshälfte grundsätzlich der volle gesetzliche Jahresurlaub zu berücksichtigen; Mehrurlaub ist gesondert zu prüfen. Die Rechenaufgabe `ik2024-lf12-k07-02` ist dagegen ausdrücklich auf die erste Jahreshälfte beschränkt und wird hier nicht als falsch beanstandet.

**Vorschlag:** „Urlaubsanspruch nach Wartezeit und Austrittsdatum prüfen; gesetzlichen und vertraglichen Mehrurlaub unterscheiden; genommenen Urlaub abziehen“ in die Grafik aufnehmen.

**Abnahme:** Gegenfälle 31. März und 30. September nach erfüllter Wartezeit. Quelle: [§§ 4–6 BUrlG](https://www.gesetze-im-internet.de/burlg/BJNR000020963.html).

### I07 · mittel · Deckungsbeitragsaufgabe berücksichtigt Folgefehler nicht

**Datei/Fundstelle:** `ik2024-lf08-k06.aufgaben.json:22–32`, Aufgabe `ik2024-lf08-k06-01`.

**Reproduktion im unveränderten Bewertungsmodul:** Preis 26 €, variable Stückkosten 12 €, Menge 150, Fixkosten 300 €. Richtig: DB 14 €, Gesamt-DB 2.100 €, Ergebnis 1.800 €. Eingabe 15 / 2.250 / 1.950 enthält einen Fehler im ersten Schritt und rechnerisch passende Folgeschritte. Tatsächliche Bewertung: **0/4 Punkte**. Die Felder haben keine `folgefehler_aus`; die Formeln wiederholen zudem `preis - var`, statt auf den abgefragten Zwischenwerten aufzubauen.

**Vorschlag:** Gesamt-DB aus `db * menge`, Ergebnis aus `gesamt_db - fix` ableiten und Folgefehlerbezüge ergänzen. Nach dem bestehenden Bewertungsmodell sollten für die konsistente Weiterrechnung 3/4 Punkte entstehen.

**Abnahme:** Originaleingabe 4/4, genannter Folgefehlerfall 3/4, unpassende Folgerechnung nicht anerkennen. Beleg: [Rechencheck](belege/review-2026-10-27-rechencheck.json), letzter Fall; [ausführbares Prüfskript](belege/review-2026-10-27-rechencheck.cjs). Andere geprüfte deklarierte Folgefehlerketten funktionieren, siehe Beleg.

### I08 · mittel · AP-Teil-1-Abgrenzung lässt LF 7 weg

**Datei/Fundstelle:** `doku/industriekaufleute/uebergabe.md`, Review-Auftrag, Schwerpunkt 4 (im geprüften Stand Zeile 21).

**Befund:** Der Auftrag nennt LF 1–6. Der KMK-Rahmenlehrplan verlangt auf Seite 8 ausdrücklich LF 1–7 vor Teil 1. LF 7 wurde deshalb in diesem Review zusätzlich berücksichtigt; seine Kapitel sind vorhanden. Dies ist eine fehlerhafte Umfangsangabe in der Übergabe, keine Behauptung, Logistik fehle in der App.

**Vorschlag/Abnahme:** AP1-Umfang in der Dokumentation auf LF 1–7 berichtigen und für eine spätere Prüfungsvorbereitung Logistik/Lager einschließen. [KMK-Rahmenlehrplan, S. 8](https://www.kmk.org/service/servicebereich-berufliche-schulen/downloadbereich-rahmenlehrplaene?tx_fedownloads_single%5Baction%5D=forceDownload&tx_fedownloads_single%5Bcontroller%5D=Downloads&tx_fedownloads_single%5Bdownload%5D=49404&type=150).

### I09 · mittel · Nettoabrechnung bleibt unter dem behaupteten Lernumfang

**Dateien/Fundstellen:** `ik2024-lf12-k05.kapitel.json:56–68`, a3, Grafik a3 und Selbsttest; `ik2024-lf12-k05.aufgaben.json`, gesamter Aufgabenbestand.

**Befund:** Die einzige ausgeführte Nettoabrechnung zieht eine bereits fertig vorgegebene Gesamtabzugssumme von 600 € vom Brutto ab. Die variable Rechenaufgabe prüft ausschließlich Akkordlohn; es gibt keine selbst zu berechnenden Arbeitnehmeranteile und keinen Fall zur Unterscheidung von Steuerbrutto, SV-Brutto, Netto und Auszahlung. Der Untertitel verspricht mehr. Dies ist eine didaktische Vertiefungslücke, kein falsches Ergebnis des vereinfachten Beispiels.

**Vorschlag:** Eine vollständige Übungsabrechnung mit ausdrücklich fiktiven/vorgegebenen Parametern, getrennten Steuern, AN-Beiträgen, Sachbezug und weiterem Abzug ergänzen. Keine realen Jahreswerte erfinden; die Rechnung lässt sich vollständig aus dem Fall lösen.

**Abnahme:** Mindestens eine nachvollziehbare Brutto-Netto-Auszahlungsrechnung samt Musterlösung und passendem Punkteraster. Bezug: KMK-Rahmenlehrplan, LF 12, S. 21 (Quelle bei I08).

### I10 · niedrig · Single-Choice-Frage verwirft eine plausible Ursache

**Datei/Fundstelle:** `ik2024-lf12-k05.kapitel.json:159–164`, Check a4.

**Befund:** Gefragt wird nach einer plausiblen Ursache für gesunkenes Netto bei gleichem Brutto. Ein Abrechnungsfehler wird als falsch bewertet, obwohl das Echo ihn ausdrücklich als möglich anerkennt. Ohne weiteren Sachverhalt sind sowohl ein Fehler als auch ein geänderter Beitragssatz plausible Ursachen.

**Vorschlag/Abnahme:** Frage auf eine mögliche Auswirkung geänderter gesetzlicher/Kassenparameter eingrenzen oder den Fall um eine verifizierte Änderung ergänzen; danach genau eine begründbar richtige Antwort.

## Offene Prüfmarker: fachliche Einordnung mit Primärquellen

Diese Tabelle ist die Reviewentscheidung über die Prüfbarkeit. **Die Marker in den Quelldateien wurden nicht entfernt.** Claude übernimmt geprüfte Aussagen mit Quelle/Stand und lässt nur konkrete, tatsächlich offene Fragen stehen.

| Marker / Kapitel | Ergebnis und nötige Umsetzung | Primärquelle |
|---|---|---|
| Aufbewahrung · LF05 K01 | Acht Jahre für Buchungsbelege, zehn für Bücher/Inventare/Abschlüsse bestätigt. Regelprüfhinweis durch datierten Quellenbeleg ersetzen; besondere Verlängerungen nicht ausschließen. | [§ 147 Abs. 3 AO](https://www.gesetze-im-internet.de/ao_1977/__147.html) |
| ADR · LF07 K03 | ADR 2025 ist für den betrachteten Stand belegt. Allgemeiner Sicherheitshinweis kann bleiben; konkrete Stoffe, Freistellungen und Pflichten sind ohne Produktdaten nicht abschließend geprüft. Kein pauschaler Gefahrgut-Freigabevermerk. | [UNECE ADR 2025](https://unece.org/adr-2025-files) |
| Verpackungsrecht · LF07 K05 | Nur teilweise geklärt: Übergang 2026 ist relevant. Nicht bloß den alten VerpackG-Hinweis abhaken. MAKEL-Rolle, Verpackungsarten und jeweils anwendbare Pflichten anhand geltenden EU-/deutschen Rechts konkretisieren. Dieser Marker bleibt fachlich offen. | [ZSVR: Überprüfung der Einordnungsentscheidungen zum 12.08.2026](https://www.verpackungsregister.org/stiftung-und-behoerde/einordnungsentscheidungen) |
| Umweltaussagen · LF09 K05 | Die aktuelle UWG-Fassung enthält konkret Nachhaltigkeitssiegel, allgemeine Umweltaussagen und kompensationsgestützte Produkt-Klimaneutralität. Den bloßen Hinweis auf künftige Prüfung durch eine kurze, aktuelle Regel mit Beispielen ersetzen. | [UWG-Anhang Nr. 2a, 4a–4c](https://www.gesetze-im-internet.de/uwg_2004/anhang.html) |
| Incoterms · LF09 K06 | ICC bezeichnet Incoterms 2020 als jüngste Ausgabe. Versionsmarker schließbar; Klausel, benannter Ort und Fassung vertraglich angeben. Keine automatische Geltung behaupten. | [ICC](https://iccwbo.org/business-solutions/incoterms-rules/) |
| Größenklassen · LF10 K01/K04 | Schwellen klein: 7,5 Mio. €/15 Mio. €/50; mittelgroß: 25 Mio. €/50 Mio. €/250. Zwei-von-drei und grundsätzlich zwei Abschlussstichtage berücksichtigen. MAKELs kanonische Einstufung wird durch seine Werte nicht widerlegt. | [§ 267 HGB](https://www.gesetze-im-internet.de/hgb/__267.html) |
| Insolvenz · LF10 K06 | Ohne schuldhaftes Zögern; Höchstfristen drei Wochen bei Zahlungsunfähigkeit, sechs bei Überschuldung. Überschuldung ergänzen; Höchstfristen sind keine beliebige Warteerlaubnis. | [§ 15a InsO](https://www.gesetze-im-internet.de/inso/BJNR286600994.html#BJNR286600994BJNG000200000) |
| EZB · LF11 K06 | Symmetrisches mittelfristiges 2-%-Ziel in Strategie 2025 bestätigt. Leitzinsen sind Hauptinstrument; die Aussage muss nicht mit einem aktuellen Zinssatz ergänzt werden. | [EZB-Strategie 2025, Nr. 5–8](https://www.ecb.europa.eu/mopo/strategy/strategy-review/ecb.strategyreview202506_strategy_statement.en.html) |
| Freistellung · LF11 K04 | Vier Bedingungen zusammen erklären: Effizienz, Verbraucherbeteiligung, Unerlässlichkeit, kein Ausschalten wesentlichen Wettbewerbs. Mittelstandsregel setzt weitere Bedingungen voraus. Bisheriger Einzelfallvorbehalt ist sinnvoll, aber kein Ersatz für die Bedingungen. | [§§ 2–3 GWB](https://www.gesetze-im-internet.de/gwb/BJNR252110998.html) |
| Fusionskontrolle · LF11 K04 | Nationale Regelschwellen >500 Mio. € weltweit, >50 Mio. € Inland bei einem und >17,5 Mio. € bei einem anderen Beteiligten bestätigt. Transaktionswerttatbestand und EU-Zuständigkeit gesondert prüfen; „groß“ allein genügt nicht. Vollständige EU-Schwellenprüfung bleibt außerhalb dieser Kurzprüfung. | [§ 35 GWB](https://www.gesetze-im-internet.de/gwb/__35.html) |
| Schwerbehinderung · LF12 K02 | Prüfpflicht, früher Kontakt zur Arbeitsagentur und Beteiligung/Unterrichtung vorhandener Vertretungen bestätigt. Ablehnung der SBV-Beteiligung durch die betroffene Person beachten. Keine allgemeine Einladungspflicht privater Arbeitgeber erfinden. | [§ 164 Abs. 1 SGB IX](https://www.gesetze-im-internet.de/sgb_9_2018/__164.html) |
| NachwG · LF12 K03 | Textform/elektronische Übermittlung unter konkreten Voraussetzungen möglich: zugänglich, speicher- und druckbar, Aufforderung zum Empfangsnachweis. Papier auf Verlangen und Branchenausnahmen beachten; außerdem gestaffelte Nachweisfristen. Befristungsform ist eine separate Frage. | [§ 2 NachwG](https://www.gesetze-im-internet.de/nachwg/__2.html) |
| Arbeitszeiterfassung · LF12 K04 | Grundpflicht durch BAG belegt; Beginn, Ende und Dauer einschließlich Überstunden erfassen. Keine bloß geplante Gesetzesänderung als geltendes Recht oder pauschale elektronische Pflicht darstellen. | [BAG 1 ABR 22/21, Rn. 63–67](https://www.bundesarbeitsgericht.de/entscheidung/1-abr-22-21/), [aktuelle ArbZG-Fassung](https://www.gesetze-im-internet.de/arbzg/BJNR117100994.html) |
| Entgelt-Jahreswerte · LF12 K05 | Kein unaufgelöster Zahlenplatzhalter nötig, solange nur vollständig vorgegebene Übungsparameter verwendet werden. Als Aktualitätshinweis statt offener Sachfrage führen; I09 bearbeiten. | Kein realer Jahreswert wird durch dieses Review freigegeben. |
| Kündigung · LF12 K07 | Grundfrist und Staffel des § 622 bestätigt. KSchG-Schwelle benötigt Gewichtung von Teilzeit und Ausschluss der Auszubildenden; Altfallregel nicht als MAKEL-Neufall behandeln. I05/I06 berücksichtigen. | [§ 622 BGB](https://www.gesetze-im-internet.de/bgb/__622.html), [§ 23 KSchG](https://www.gesetze-im-internet.de/kschg/__23.html) |
| Betriebliche Fachaufgabe · LF13 K04 | Genehmigung vor Durchführung; betriebliche Eigenleistung; Dokumentation 3–5 Seiten, bis 3 Seiten Anlagen; Präsentation/Fachgespräch zusammen 30 Min., Präsentation soll 10 Min. nicht überschreiten. Allgemeiner Marker kann mit Quelle konkretisiert werden; Kammerfristen zusätzlich prüfen. | [§ 12 IndKflAusbV](https://www.gesetze-im-internet.de/indkflausbv/BJNR05E0A0024.html) |

Zusätzlich geprüft: Herstellungskostenbestandteile passen im dargestellten Grundfall zu [§ 255 HGB](https://www.gesetze-im-internet.de/hgb/__255.html). Rückstellungsgrundfälle sind plausibel; als Vertiefung bei unterlassener Instandhaltung die Dreimonatsgrenze aus § 249 HGB ergänzen. AGG-Anforderungen und die dargestellten normalen Arbeitszeitgrenzen ergaben in den gelesenen Fällen keinen neuen Widerspruch. Ein schriftlicher Zeugnisanspruch bleibt richtig; als Aktualisierung kann die elektronische Form mit Einwilligung ergänzt werden ([§ 109 Abs. 3 GewO](https://www.gesetze-im-internet.de/gewo/__109.html)); sie ist von einfacher E-Mail und vom Schriftformerfordernis bei Kündigungen zu unterscheiden.

## Lehrplanabdeckung, MAKEL und Didaktik

Abgleich mit dem offiziellen Rahmenlehrplan vom 15.12.2023: alle 13 Lernfelder vorhanden; Titel, Lehrjahre und Zeitrichtwerte passen. Die 85 Kapitel enthalten die wesentlichen Themen. Dies ist ein qualitativer Abgleich der Kapitel/Abschnitte, keine Zusicherung, dass jede Kompetenz bereits mit genügender Übungstiefe erreicht wird.

| Bereich | Befund zur Kapitelstruktur |
|---|---|
| LF 1–2 | Rolle, Ausbildung, Betrieb, Mitbestimmung und Projektphasen vorhanden. Rechtskorrektur I02 erforderlich. |
| LF 3–4 | Auftrags- und Beschaffungsablauf, Störungen, Kalkulation und Fremdwährung vorhanden. I01 korrigieren. |
| LF 5–7 | Buchungen, Bestandsveränderung, AfA, Produktion und Logistik vorhanden. LF 7 gehört in AP1-Abgrenzung. |
| LF 8–11 | KLR, Marketing, Abschluss/Finanzierung und gesamtwirtschaftliche Entscheidungen passend angelegt. |
| LF 12–13 | Personal und Problemlösung angelegt; Nettoabrechnung vertiefen (I09). |

MAKEL: 92 Beschäftigte, 100.000 € Stammkapital, 16 Mio. € Umsatz und 9 Mio. € Bilanzsumme widersprechen den gelesenen IK-Grundlagen nicht. Verkleinerte Abschlusszahlen sind als Übungsdaten gekennzeichnet. Die Trennung von eigener Veredelung und externer Serienfertigung wird überwiegend eingehalten. Redaktionell auffällig: Ayla Brandt ist im Kanon Personalreferentin, während LF 12 fast durchgehend Sandra für Personalfragen einsetzt. Sandra darf als Ausbildungsbegleitung erklären; für originäre Personalentscheidungen sollte Ayla sichtbar werden. Das ist eine Konsistenzempfehlung, kein zusätzlicher Blocker.

Sprache: konkrete Fälle, Rückfragen, typische Fehler und begründete Entscheidungen sind hilfreich. AFB III wird in den gelesenen offenen Aufgaben tatsächlich durch Abwägung/Zielkonflikte getragen; reine Formelanwendung wird überwiegend als AFB II behandelt. Das automatische Vorhandensein der Kennungen I/II/III beweist noch keine gleichwertige kognitive Tiefe. Probeklausuren können den eigentlichen Handlungsauftrag stärker mit Dokumenten verbinden, besonders in LF 12; keine pauschale Neuerstellung aller Kapitel nötig.

## Eigene Prüfungen und Grenzen

- Sauberer Clone des genannten Branches; `HEAD` vor Änderungen exakt `f69a353...`; keine fremden Arbeitsänderungen.
- `python industriekaufleute_test.py`: **8.227 bestanden, 0 Fehler, 283 Aufgaben**. Unabhängig wiederholt. Der Test prüft überwiegend Struktur/Verweise/Berufstrennung, nicht Rechtsrichtigkeit.
- Unverändertes `quellen/aufgaben.js` unter Node-VM ausgeführt: **47 variable Aufgaben aus LF 5, 8, 10, 12 mit je 100 Seeds = 4.700 Ziehungen**, keine nichtendlichen Werte oder Auswertungsabbrüche. **35 reine Zahlaufgaben, 3.500 Lösungsbewertungen** mit vollen Punkten für ihre hinterlegten Lösungen. Das bestätigt die interne Konsistenz, nicht unabhängig die Fachformeln.
- Zusätzlich **sieben von Hand nachgerechnete Fälle** gegen den Originalrechner; darunter AfA, Herstellungskosten, Zuschläge, Liquidität, Akkord und Teilurlaub. Fünf deklarierte Folgefehlerketten erkennen konsistente Weiterrechnung an; der zusätzliche DB-Fall reproduziert I07. Rohdaten und ausführbares Skript im Belegordner.
- Die Originalsuite mit 269 Fällen und `lernkern_audit_test.py` wurden hier **nicht unabhängig wiederholt**. Playwright war zunächst nicht vorhanden; der Chromium-Download scheiterte mit ungültigem/leeren ZIP. Claudes grüne Browserläufe bleiben ein fremder Testbeleg. Keine Browser-, Mobil-, Offline- oder Live-Abnahme durch dieses Review behauptet.
- Rechtsquellen am 27.10.2026 online gelesen. Verpackungsdetails, konkrete Gefahrgutklassifikation und vollständige EU-Fusionsschwellen bleiben begrenzt/offen. Kein neuer Prüfmarker wird allein aufgrund einer Suchtrefferüberschrift als vollständig erledigt behandelt.
- KfB-Definition „beleg“ bleibt gemäß Auftrag unverändert. Das Review bestätigt die Achtjahresgrundregel für IK; Lukes' Entscheidung zum KfB-Bestand wird nicht vorweggenommen.

## Nächster Schritt

Claude bearbeitet I01–I09 gezielt und korrigiert I10 redaktionell; übernimmt die belegten Markertexte und hält die ausdrücklich verbleibenden Fragen konkret offen. Quellen und gebaute Seiten/Karten/Aufgaben müssen anschließend übereinstimmen. Die betroffenen Gegenfälle, Rechenbewertung, Build und erforderlichen Projektsuites sind erneut zu prüfen. Danach gezielte Gegenprüfung der Korrekturen. Dieser Review erteilt weder Merge- noch Live-Freigabe.
