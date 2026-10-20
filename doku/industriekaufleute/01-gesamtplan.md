# AzubiPass · Industriekaufleute

## Vollständiger Kapitelplan v3 · 20. Oktober 2026

**Status:** Vollständiger Planungs- und Redaktionsauftrag für 85 Kapitel in 13 Lernfeldern. Alle Kapitel sind mit drei Lernzielen, vier Abschnitten, einem MAKEL-Fall und zwei Aufgabenentwürfen konkretisiert. Die App-Inhalte selbst sind noch zu schreiben. Umsetzung und Abnahme regelt [00-claude-auftrag.md](00-claude-auftrag.md); technische Details regelt [03-umsetzung-und-abnahme.md](03-umsetzung-und-abnahme.md).

**Ziel:** Ein vollständiger zweiter Ausbildungsgang für Industriekaufmann und Industriekauffrau nach der Neuordnung 2024, mit dem bestehenden AzubiPass-Aufbau für Büromanagement.

## 1. Festgelegte Grundlage

- Der Aufbau folgt dem vorhandenen Büromanagement-Bereich: Lernfelder, Kapitel, Lernziele, Kurzfassung und ausführliche Erläuterungen am selben Abschnitt, Grafiken, Begriffe, Gesetzesverweise, Merksätze, Karteikarten, Übungen und Probeklausuren.
- Die fachliche Gliederung folgt dem eigenen Industriekaufleute-Lehrplan. Gleiche Lernfeldnummern bedeuten nicht gleiche Inhalte in beiden Berufen.
- MAKEL Studio GmbH begleitet die Lernfelder. Ergänzende Branchenbeispiele werden eingesetzt, wenn sie einen anderen Sachverhalt besser zeigen.
- MAKEL bleibt ein Streetwear-Unternehmen mit eigener Musterfertigung und Veredelung sowie externer Serienfertigung. Für die neue Ausbildung werden diese Prozesse genauer beschrieben.
- Die bisherige Kapitelzahl des Büromanagement-Bereichs wird nicht als Zielvorgabe übernommen. Aus dem nachfolgenden Entwurf ergeben sich **85 Kapitel**.

Lukes hat den gemeinsamen Aufbau und MAKEL festgelegt und am 20.10.2026 die vollständige Vorbereitung zur anschließenden Erstellung durch Claude beauftragt. Kapitelgrenzen, Aufgaben und technische Umsetzungsvorschläge stammen von ChatGPT. Claude darf sie fachlich begründet korrigieren und dokumentiert Abweichungen, ohne routinemäßige Detailentscheidungen an Lukes zurückzugeben.

## 2. Quellen und Reichweite

### Amtliche Grundlagen

1. [KMK-Rahmenlehrplan vom 15.12.2023 mit Liste der Entsprechungen](https://www.kmk.org/fileadmin/Dateien/pdf/Bildung/BeruflicheBildung/rlp/Industriekaufleute_2023-12-15-mitEL.pdf): Schuljahre, Unterrichtsstunden und Kompetenzanforderungen der 13 Lernfelder. Die Kompetenzbeschreibungen wurden für den Plan gelesen.
2. [Industriekaufleuteausbildungsverordnung vom 12.03.2024](https://www.gesetze-im-internet.de/indkflausbv/): betrieblicher Ausbildungsrahmenplan und Abschlussprüfung. Besonders relevant sind [§ 8](https://www.gesetze-im-internet.de/indkflausbv/__8.html), [§ 11](https://www.gesetze-im-internet.de/indkflausbv/__11.html), [§ 12](https://www.gesetze-im-internet.de/indkflausbv/__12.html), [§ 13](https://www.gesetze-im-internet.de/indkflausbv/__13.html) und [§ 14](https://www.gesetze-im-internet.de/indkflausbv/__14.html).
3. [NRW-Erlass vom 28.06.2026](https://bass.schule.nrw/20308.htm): Der 2024 zunächst vorläufige Bildungsplan wurde endgültig in Kraft gesetzt. Das ist eine Bestätigung des Status, keine Behauptung eines neuen fachlichen Lehrplans von 2026.
4. [NRW-Berufsseite](https://www.berufsbildung.nrw.de/cms/bildungsgaenge-bildungsplaene/fachklassen-duales-system-anlage-a/berufe-a-bis-z/industriekaufleute/index.html): landesspezifischer Einstieg. Die Detail-PDF des NRW-Plans war bei der Recherche nicht vollständig abrufbar. Eine gesonderte Zuordnung zu NRW-Bündelungsfächern und zu berufsübergreifenden Fächern ist daher noch nicht erarbeitet.

**Geltungsbereich:** Neuer Ausbildungsgang nach Neuordnung 2024. Eine gesonderte Altordnungsfassung wird hier nicht geplant. Die 880 Unterrichtsstunden betreffen den berufsbezogenen KMK-Rahmenlehrplan; zusätzliche Schulfächer sind damit nicht vollständig abgedeckt.

Die Lernfeldnamen in diesem Dokument sind gekürzte Arbeitsbezeichnungen. Kapitelüberschriften, Methoden und Fallideen sind eine eigene didaktische Konkretisierung. Sie sind weder amtliche Kapitelvorgaben noch ein vollständiger IHK-Prüfungskatalog.

### Bestehendes AzubiPass als Referenz

Die erste Bestandsaufnahme erfolgte auf `main` bei `0c472bb20b602e46d154af0828502bed41b636d4`. Am 20.10.2026 wurden AGENTS, README, relevante Build-/Datenmodellstellen und MAKEL erneut auf `main` bei `cd4d6cf37164260ddc32584a7820df1f1e1c352c` gelesen. Das ist die technische Planungsreferenz; vor Implementierung erneut aktuellen Stand prüfen.

Geprüfte Referenzen: `AGENTS.md`, `doku/kapitel-format.md`, `doku/ausfuehrliche-kapitel-protokoll.md`, `doku/musterunternehmen.md`, die 13 vorhandenen Lernfeld-Dateien einschließlich des gesonderten Buchführungsbereichs, `quellen/musterunternehmen.json` und beispielhaft `quellen/lf4-k6-mangel.kapitel.json`.

Die Wiederverwendungseinschätzung unten beruht überwiegend auf den Kapitelverzeichnissen. Sie ist keine fachliche Vollprüfung sämtlicher bestehender Texte oder Aufgaben. Community-Arbeiten wurden in dieser Inhaltsplanung nicht erneut geprüft. Es wurden keine Änderungen am Repository oder an der Live-App vorgenommen.

## 3. Übersicht

| Lehrjahr | LF | Thema | Unterrichtsstunden | Kapitel im Entwurf |
|---|---:|---|---:|---:|
| 1 | 1 | Betrieb, Ausbildung und eigene Rolle | 80 | 7 |
| 1 | 2 | Grundlagen der Projektarbeit | 40 | 4 |
| 1 | 3 | Kundenanfrage bis Auftragsabschluss | 80 | 7 |
| 1 | 4 | Einkauf und Materialversorgung | 40 | 6 |
| 1 | 5 | Laufende Buchführung | 80 | 8 |
| 2 | 6 | Produktion und Leistungserstellung | 80 | 7 |
| 2 | 7 | Logistik und Lager | 40 | 5 |
| 2 | 8 | Kostenrechnung und Entscheidungen | 80 | 8 |
| 2 | 9 | Marketing und internationale Vermarktung | 80 | 7 |
| 3 | 10 | Jahresabschluss und Finanzierung | 80 | 8 |
| 3 | 11 | Gesamtwirtschaft und Wirtschaftspolitik | 80 | 6 |
| 3 | 12 | Personalwirtschaft | 80 | 8 |
| 3 | 13 | Komplexe betriebliche Problemlösung | 40 | 4 |
| **Gesamt** | **13** | | **880** | **85** |

Jahr 1: 32 Kapitel / 320 Unterrichtsstunden. Jahr 2: 27 Kapitel / 280 Unterrichtsstunden. Jahr 3: 26 Kapitel / 280 Unterrichtsstunden. Unterrichtsstunden sind keine geschätzten App-Lesezeiten.

## 4. Geplante Kapitel

### LF 1 · Betrieb, Ausbildung und eigene Rolle

**1. Lehrjahr · 80 Unterrichtsstunden · 7 Kapitel**

| Nr. | Kapitel | Inhaltlicher Umfang |
|---:|---|---|
| 1 | Deine Ausbildung bei MAKEL | Duales System, Beteiligte, Ausbildungsordnung, Ausbildungsablauf und Lernstrategien. |
| 2 | Ausbildungsvertrag und Rechte | Vertrag, Rechte und Pflichten, Jugendarbeitsschutz sowie betriebliche Vollmachten und ihre Grenzen. |
| 3 | Vom Material zum fertigen Produkt | Leistungsprogramm, Produktionsfaktoren sowie Güter-, Dienstleistungs-, Geld- und Informationsflüsse. |
| 4 | So ist MAKEL organisiert | Aufbauorganisation, Organisationsformen, Schnittstellen, Kern- und Unterstützungsprozesse sowie erste ereignisgesteuerte Prozessketten. |
| 5 | Rechtsform, Ziele und Interessen | Eigentümerstruktur, GmbH und grundlegender Rechtsformvergleich, Anspruchsgruppen, internationale Verflechtungen, Zielkonflikte und Leitbild. |
| 6 | Unternehmenserfolg beurteilen | Produktivität, Wirtschaftlichkeit und Rentabilität; Größen unterscheiden, berechnen und Ergebnisse erklären. |
| 7 | Deine Rolle mitgestalten | Mitbestimmung und JAV, ergonomisches und sicheres Arbeiten, Selbstmanagement, Datenschutz und Urheberrecht; MAKEL adressatengerecht präsentieren. |

**MAKEL-Fall:** Du bereitest den Einstieg neuer Auszubildender vor und stellst ihnen den Betrieb, seine Abläufe und ihre Mitgestaltungsmöglichkeiten vor.

**Vorhandene Grundlage:** Büromanagement LF 1, ergänzend LF 2 und LF 11. Unternehmenskennzahlen und die industrielle Prozesssicht sind gezielt zu ergänzen.

### LF 2 · Grundlagen der Projektarbeit

**1. Lehrjahr · 40 Unterrichtsstunden · 4 Kapitel**

| Nr. | Kapitel | Inhaltlicher Umfang |
|---:|---|---|
| 1 | Aus einer Idee wird ein Projektauftrag | Projektmerkmale, Auftraggebende, Rahmenbedingungen, Ziele und überprüfbare Ergebnisse. |
| 2 | Aufgaben, Zeit und Zusammenarbeit planen | Projektstruktur, Arbeitspakete, Rollen, Ressourcen und Termine; passende klassische oder agile Vorgehensweise auswählen. |
| 3 | Das Projekt durchführen und steuern | Digitale Zusammenarbeit, Informationsfluss, Datenschutz, Kreativitätstechniken, Konflikte, Status und Anpassungen bei Abweichungen. |
| 4 | Ergebnisse präsentieren und daraus lernen | Zielgruppenbezogene Präsentation, Feedbackregeln, Zielerreichung und Reflexion der Teamarbeit. |

**MAKEL-Fall:** Das Team entwickelt ein überschaubares Konzept für die Einführung neuer Mitarbeitender. So ist Projektarbeit möglich, bevor Produktions- und Kostenwissen vorausgesetzt werden kann.

**Vorhandene Grundlage:** Büromanagement LF 13; Inhalte aus LF 7 zur Kommunikation. Komplexität für das erste Lehrjahr anpassen. Projektarbeit wird später in LF 9 und LF 13 erneut angewendet.

### LF 3 · Kundenanfrage bis Auftragsabschluss

**1. Lehrjahr · 80 Unterrichtsstunden · 7 Kapitel**

| Nr. | Kapitel | Inhaltlicher Umfang |
|---:|---|---|
| 1 | Kundenanfragen verstehen | Kundenstatus, Bedarf, Leistungsangebot, Bonität und Teilprozesse der Auftragsabwicklung. |
| 2 | Kaufverträge zwischen Unternehmen | Zustandekommen und Inhalte, Besitz und Eigentum, AGB sowie Liefer- und Zahlungsbedingungen. |
| 3 | Verkaufspreise und Angebote | Auf gegebenen Selbstkosten aufbauende Verkaufskalkulation, Rabatte, Skonto und passende Serviceangebote. |
| 4 | Auftrag erfassen und Lieferung abstimmen | Auftragsunterlagen, Datenschutz, Schnittstellen zu Produktion und Versand sowie situationsgerechte Kommunikation, auch auf Englisch. |
| 5 | Reklamationen und mangelhafte Lieferungen | Schlechtleistung aus Vertriebssicht, rechtliche Grundlagen, Beschwerdemanagement und kundenorientierte Lösung. |
| 6 | Wenn Kunden nicht zahlen | Zahlungsverzug, außergerichtliches Mahnverfahren und Verjährung; wirtschaftlich sinnvolle Handlungsoptionen. |
| 7 | Kundenbeziehung und Auftragsprozess verbessern | Kundenzufriedenheit, Kundenbindung, nachhaltige Leistungsangebote und Auswertung des gesamten Auftragsablaufs. |

**MAKEL-Fall:** Ein Geschäftskunde bestellt individualisierte Hoodies. Anfrage, Angebot, Auftrag und spätere Abweichungen bilden den gemeinsamen Kontext; jede einzelne Aufgabe enthält alle benötigten Angaben.

**Vorhandene Grundlage:** Büromanagement LF 3, LF 4 K4/K6/K7 und LF 7. Die industrielle Auftragskoordination und der konsequente B2B-Bezug sind auszubauen.

### LF 4 · Einkauf und Materialversorgung

**1. Lehrjahr · 40 Unterrichtsstunden · 6 Kapitel**

| Nr. | Kapitel | Inhaltlicher Umfang |
|---:|---|---|
| 1 | Materialbedarf und Versorgung | Wert- und Mengenanteile, Verbrauchsstruktur sowie Bereitstellung mit und ohne Vorrat; ABC- und XYZ-Analyse als geeignete Konkretisierung. |
| 2 | Wann und wie viel bestellen? | Bestellpunkt- und Bestellrhythmusverfahren, Bestellzeitpunkt und optimale Bestellmenge samt anschaulicher Auswertung. |
| 3 | Lieferanten und Bezugsquellen | Regionale bis internationale Beschaffung, ein oder mehrere Lieferanten, digitale B2B-Beschaffung und fremdsprachige Anfragen. |
| 4 | Angebote nachvollziehbar vergleichen | Bezugskalkulation, unterschiedliche Währungen und Wechselkursrisiken, Nutzwertanalyse sowie ökologische und soziale Kriterien. |
| 5 | Bestellung bis Rechnungsprüfung | Bestellung, Wareneingang, Prüfprotokolle, Eingangsrechnung und Zahlung; Zuständigkeiten und interne Abstimmung. |
| 6 | Lieferprobleme lösen und Einkauf verbessern | Lieferverzug, Schlechtleistung, Mängelrüge und Mahnung; Lieferantenbeziehungen und globale Auswirkungen der Beschaffung bewerten. |

**MAKEL-Fall:** Stoffe und Zutaten für die nächste Kollektion beschaffen; bei der eigenen Veredelung zusätzlich Rohlinge und Druckmaterial betrachten. Die jeweiligen Beschaffungswege werden ausdrücklich unterschieden.

**Vorhandene Grundlage:** Büromanagement LF 4 K1–K6. Industrielle Disposition, internationale Beschaffung und die Konkretisierung der Bestellverfahren prüfen und ergänzen.

### LF 5 · Laufende Buchführung

**1. Lehrjahr · 80 Unterrichtsstunden · 8 Kapitel**

| Nr. | Kapitel | Inhaltlicher Umfang |
|---:|---|---|
| 1 | Warum MAKEL Bücher führt | Aufgaben, gesetzliche Grundlagen, Belege, Organisation sowie Zusammenhang von Inventur, Inventar und Bilanz. |
| 2 | Bestandskonten und Buchungssätze | Aktiv- und Passivkonten, Soll und Haben sowie Auswirkungen von Geschäftsfällen auf Vermögen und Kapital. |
| 3 | Aufwendungen, Erträge und Erfolg | Erfolgskonten, grundlegende GuV-Zusammenhänge und Abgrenzung zum bloßen Geldfluss. |
| 4 | Umsatzsteuer aus Belegen erfassen | Eingangs- und Ausgangsbelege, Vorsteuer und Umsatzsteuer; vollständiger Rechen- und Buchungsweg. |
| 5 | Materialeinkauf richtig buchen | Beschaffungsbelege, Bezugskosten, Anschaffungskosten, Nachlässe und Rücksendungen. |
| 6 | Verkauf und Bestandsveränderungen | Ausgangsrechnungen, Erlösschmälerungen und Bestandsveränderungen bei eigenen Erzeugnissen; Abgrenzung zum Handel mit fertigen Waren. |
| 7 | Anlagegüter und planmäßige Abschreibung | Anschaffung und laufende Wertminderung, zeitlicher Bezug und Auswirkungen auf den Unternehmenserfolg. |
| 8 | Bestände abstimmen und Ergebnisse erklären | Buchbestände mit tatsächlichen Beständen vergleichen, Korrekturen durchführen und die Aussage der laufenden Buchführung beurteilen. |

**MAKEL-Fall:** Eine Belegfolge verbindet Materialeinkauf, Veredelungsauftrag, Verkauf und Bestandskontrolle.

**Vorhandene Grundlage:** Gesonderter Buchführungsbereich K1–K6/K8 und Teile K9. Industriekonten, Materialverbrauch und Erzeugnisbestände sind fachlich neu zu prüfen. Die vorhandenen Handelswarenbeispiele reichen hierfür nicht automatisch aus.

**Grenze:** Jahresabschlussbewertung, Rechnungsabgrenzung und Rückstellungen werden erst in LF 10 systematisch behandelt. Entgeltabrechnung gehört zu LF 12; ihre Buchung kann dort ergänzend an LF 5 anknüpfen.

### LF 6 · Produktion und Leistungserstellung

**2. Lehrjahr · 80 Unterrichtsstunden · 7 Kapitel**

| Nr. | Kapitel | Inhaltlicher Umfang |
|---:|---|---|
| 1 | Vom Kundenauftrag zum Produktionsprogramm | Auftrag, Kundenbedürfnisse, Ziele, Ressourcen und zeitliche Anforderungen. |
| 2 | Wie Produkte gefertigt werden | Fertigungsverfahren und organisatorische Formen aus wirtschaftlicher Sicht; Digitalisierung, Nachhaltigkeit und Gesundheitsschutz. |
| 3 | Stücklisten und Arbeitspläne nutzen | Materialzusammensetzung, Bearbeitungsschritte, Zeiten und Informationen für einen Fertigungsauftrag. |
| 4 | Kapazitäten und Durchlaufzeiten planen | Verfügbare Maschinen und Mitarbeitende, Termin- und Kapazitätsplanung sowie Bearbeitungs-, Liege- und Transportzeiten. |
| 5 | Die passende Losgröße bestimmen | Zusammenhang von Rüstaufwand, Losgröße und Lagerung; optimale Losgröße berechnen und Entscheidung begründen. |
| 6 | Qualität sichern und Störungen bearbeiten | Auftrag hinsichtlich Zeit, Kosten, Menge und Qualität überwachen; Abweichungen, Schnittstellen und Produktionsdaten. |
| 7 | Produktion wirtschaftlicher gestalten | Rationalisierung, Kennzahlen, Gewinnschwelle sowie Eigenfertigung oder Fremdbezug; quantitative und qualitative Argumente. |

**MAKEL-Fall:** Eine größere Serie bedruckter Hoodies muss mit begrenzter Veredelungskapazität termingerecht hergestellt werden. Die externe Serienfertigung bleibt ein eigener, klar abgegrenzter Prozess.

**Vorhandene Grundlage:** Einzelne Grafiken und Grundlagen aus Büromanagement LF 10 und LF 11. Der wesentliche Produktionsinhalt ist neu zu erarbeiten. Ein anderes Industriebeispiel ergänzt Fertigungsformen, die MAKEL nicht sinnvoll selbst abbilden kann.

### LF 7 · Logistik und Lager

**2. Lehrjahr · 40 Unterrichtsstunden · 5 Kapitel**

| Nr. | Kapitel | Inhaltlicher Umfang |
|---:|---|---|
| 1 | Material und Informationen gemeinsam steuern | Logistikziele, Lieferkette, Transport, Umschlag und Lagerung sowie Zusammenhang von Material- und Informationsfluss. |
| 2 | Lager gestalten und Aufträge kommissionieren | Lagersysteme, Einrichtungen, Lagerorganisation und Kommissioniermethoden. |
| 3 | Transportmittel und Dienstleister auswählen | Innerbetriebliche, vernetzte und autonome Systeme, multimodale Wege, Lager- und Transportkosten sowie gesetzliche Anforderungen. |
| 4 | Lieferketten abstimmen | Supply-Chain-Management, Push und Pull, Beschaffung, Produktion und Distribution; digitale Koordination und begleitende Dokumente. |
| 5 | Logistik messen und verbessern | Lagerkennzahlen, Energie, Umweltverträglichkeit, Entsorgung, Gefahrstoffe, Sicherheit und Zusammenarbeit mit Dienstleistern. |

**MAKEL-Fall:** Rohlinge, Druckmaterial und Fertigwaren müssen trotz wechselnder Auftragsmengen zuverlässig durch Lager, Veredelung und Versand laufen.

**Vorhandene Grundlage:** Teile aus Büromanagement LF 4 und LF 11. Lagertechnik, SCM, Transportsysteme und logistikspezifische Sicherheit benötigen neue Inhalte.

### LF 8 · Kostenrechnung und Entscheidungen

**2. Lehrjahr · 80 Unterrichtsstunden · 8 Kapitel**

| Nr. | Kapitel | Inhaltlicher Umfang |
|---:|---|---|
| 1 | Von der Buchführung zur Kostenrechnung | Externes und internes Rechnungswesen; Aufwendungen und Erträge gegenüber Kosten und Leistungen abgrenzen. |
| 2 | Kostenarten richtig einordnen | Einzel- und Gemeinkosten, fixe und variable Kosten sowie relevante Abgrenzungspositionen. |
| 3 | Kosten auf Kostenstellen verteilen | Mehrstufige Kostenstellenrechnung, innerbetriebliche Leistungen und Betriebsabrechnungsbogen. |
| 4 | Maschinenstunden kalkulieren | Maschinenbezogene Kosten und Auslastung; Maschinenstundensatz ermitteln und sachgerecht verwenden. |
| 5 | Produkte auf Vollkostenbasis kalkulieren | Kostenträger und Selbstkosten; Ist-, Normal- und vorgegebene Plankosten unterscheiden und nutzen. |
| 6 | Deckungsbeiträge und Preisuntergrenzen | Deckungsbeitragsrechnung, Zusatzaufträge und kurzfristige Entscheidungen auf Basis passender Ausgangsdaten. |
| 7 | Engpässe und Zielkonflikte beurteilen | Optimales Produktionsprogramm bei einem Engpass; Entscheidungen mit quantitativen und qualitativen Zielen begründen. |
| 8 | Investitionen rechnerisch vergleichen | Statische Verfahren, ihre Aussagegrenzen sowie langfristige Entscheidungen und Nachhaltigkeitsaspekte. |

**MAKEL-Fall:** Zwei Aufträge konkurrieren um dieselbe Druckmaschine. MAKEL untersucht außerdem, ob sich eine weitere Maschine rechnet.

**Vorhandene Grundlage:** Büromanagement LF 10 und LF 9 K6. Mehrstufige Verteilung, Maschinenstundensätze, Planwerte und Engpassentscheidungen sind gegenüber dem Bestand gezielt zu vertiefen.

### LF 9 · Marketing und internationale Vermarktung

**2. Lehrjahr · 80 Unterrichtsstunden · 7 Kapitel**

| Nr. | Kapitel | Inhaltlicher Umfang |
|---:|---|---|
| 1 | Märkte und Zielgruppen untersuchen | Marktsegmente, Wettbewerb, Marktanalyse und Marktbeobachtung sowie Primär- und Sekundärforschung. |
| 2 | Die Unternehmenslage einschätzen | Produktlebenszyklus, Portfolio und SWOT; Informationen zu einer begründeten Ausgangslage verbinden. |
| 3 | Ziele, Strategie und Produktangebot | Marketingziele, Positionierung und Produktpolitik; Bedürfnisse, Ressourcen und übergeordnete Unternehmensziele. |
| 4 | Preise und Konditionen gestalten | Preisentscheidungen, Konditionen und Wirkung auf Zielgruppen; Verbindung zur Kalkulation herstellen. |
| 5 | Kommunikation und Online-Marketing | Maßnahmen und Kanäle, wettbewerbsrechtliche Grenzen, Urheberrecht, Datenschutz und interkulturelle Kommunikation. |
| 6 | Vertrieb und Außenhandel | Vertriebswege, internationale Chancen und Risiken, Incoterms, Dokumentenakkreditiv und Dokumenteninkasso. |
| 7 | Ein Marketingkonzept umsetzen und prüfen | Instrumente zu einem Marketing-Mix verbinden, Projektarbeit, Präsentation, Kennzahlen und Erfolgskontrolle. |

**MAKEL-Fall:** Die nächste Kollektion soll neue Geschäftskunden und einen weiteren europäischen Markt erreichen.

**Vorhandene Grundlage:** Büromanagement LF 5, ergänzt um LF 3 und LF 13. Außenhandelsabsicherung und der internationale Bezug sind besonders zu ergänzen.

### LF 10 · Jahresabschluss und Finanzierung

**3. Lehrjahr · 80 Unterrichtsstunden · 8 Kapitel**

| Nr. | Kapitel | Inhaltlicher Umfang |
|---:|---|---|
| 1 | Den Jahresabschluss vorbereiten | Inventurergebnisse und bereinigte Kontensalden als Ausgangspunkt; Aufgaben von Bilanz und GuV einer Kapitalgesellschaft. |
| 2 | Vermögen und Schulden bewerten | Handelsrechtliche Bewertungsgrundsätze, Anschaffungs- und Herstellungskosten, Tageswert und zentrale Bewertungsprinzipien. |
| 3 | Beträge der richtigen Periode zuordnen | Antizipative und transitorische Posten, Rechnungsabgrenzung und Rückstellungen. |
| 4 | Bilanz und GuV zusammenführen | Vorbereitung und Zusammenspiel der Abschlussbestandteile; Eigenkapital und Informationsgehalt des Abschlusses. |
| 5 | Den Abschluss mit Kennzahlen auswerten | Vermögens- und Kapitalstruktur, Anlagenfinanzierung, Liquidität, Rentabilität und Cashflow. |
| 6 | Finanzbedarf und Zahlungsfähigkeit planen | Finanz- und Liquiditätsplanung auf Grundlage der Unternehmenssituation. |
| 7 | Geeignete Finanzierung auswählen | Innen- und Außenfinanzierung, Eigen- und Fremdfinanzierung sowie Kosten und Risiken vergleichen. |
| 8 | Finanzierung absichern und beurteilen | Sicherungsübereignung, Eigentumsvorbehalt und Grundschuld; relevante Unterschiede zwischen Personen- und Kapitalgesellschaften. |

**MAKEL-Fall:** Vor der Finanzierung einer neuen Veredelungsmaschine werden Jahresabschluss und Finanzlage aufbereitet. Eine ergänzende Personengesellschaft zeigt Unterschiede, die die GmbH allein nicht abdeckt.

**Vorhandene Grundlage:** Buchführung K2/K8/K9 sowie Büromanagement LF 9. Bewertung eigener Erzeugnisse, Herstellungskosten und Auswertung einer Kapitalgesellschaft fachlich vertiefen.

### LF 11 · Gesamtwirtschaft und Wirtschaftspolitik

**3. Lehrjahr · 80 Unterrichtsstunden · 6 Kapitel**

| Nr. | Kapitel | Inhaltlicher Umfang |
|---:|---|---|
| 1 | MAKEL im Wirtschaftskreislauf | Beziehungen der Wirtschaftssubjekte in einer offenen Volkswirtschaft und internationale Verflechtungen. |
| 2 | Wirtschaftsordnung und unternehmerischer Spielraum | Soziale Marktwirtschaft, Ordnungsrahmen und Auswirkungen auf betriebliche Entscheidungen. |
| 3 | Märkte, Preise und Marktmacht | Unternehmen als Anbieter und Nachfrager; Polypol, Angebotsoligopol und preis- beziehungsweise mengenpolitische Spielräume. |
| 4 | Wettbewerb, Kooperation und Konzentration | Chancen und Risiken sowie nationales und europäisches Wettbewerbs- und Kartellrecht. |
| 5 | Konjunktur und staatliche Wirtschaftspolitik | Konjunkturphasen, Stabilitäts- und Wachstumsziele, Fiskal-, Struktur- und weitere wirtschaftspolitische Maßnahmen. |
| 6 | Geldpolitik und globale Einflüsse | EZB-Offenmarktpolitik, europäische und weltweite Organisationen sowie Folgen für einen konkreten Geschäftsprozess. |

**MAKEL-Fall:** Steigende Finanzierungskosten und veränderte Nachfrage führen zu einer begründeten Anpassung von Einkauf, Produktion und Vertrieb.

**Vorhandene Grundlage:** Einzelne Grundlagen aus Büromanagement LF 1, LF 5 und LF 9. Ein großer Teil der gesamtwirtschaftlichen Systematik muss neu ausgearbeitet werden.

### LF 12 · Personalwirtschaft

**3. Lehrjahr · 80 Unterrichtsstunden · 8 Kapitel**

| Nr. | Kapitel | Inhaltlicher Umfang |
|---:|---|---|
| 1 | Den Personalbedarf ermitteln | Quantitativer und qualitativer Bedarf, Bestandsdaten, Stellenbeschreibungen sowie interne und externe Einflüsse. |
| 2 | Mitarbeitende gewinnen | Interne und externe Beschaffung, Arbeitgebermarke, Stellenausschreibung sowie Inklusion, Integration und fremdsprachige Ansprache. |
| 3 | Auswählen und einstellen | Auswahlverfahren, Individual- und Kollektivarbeitsrecht, erforderliche Unterlagen und Arbeitsvertrag. |
| 4 | Personal verwalten und einsetzen | Personalakte, Datenschutz, Arbeitszeit, Urlaub und flexible Modelle für Arbeitsort und Arbeitszeit. |
| 5 | Entgelt und Abrechnung verstehen | Entgeltformen, Brutto- und Nettoentgelt sowie gesetzliche und tarifliche Grundlagen. |
| 6 | Personal entwickeln und Zusammenarbeit stärken | Beurteilung, Weiterbildung, Motivation, Arbeitszufriedenheit und Kommunikation. |
| 7 | Arbeitsverhältnisse beenden | Abmahnung, Kündigung, rechtliche Voraussetzungen und Arbeitszeugnis. |
| 8 | Personalpolitik mit Kennzahlen prüfen | Personalstatistiken, quantitative und qualitative Kriterien, Zielerreichung und Verbesserungsmaßnahmen. |

**MAKEL-Fall:** Für die wachsende Veredelung werden zusätzliche Mitarbeitende benötigt. Ein personeller Engpass wird von der Bedarfsermittlung bis zur Erfolgskontrolle betrachtet.

**Vorhandene Grundlage:** Büromanagement LF 8, ergänzend LF 1 und LF 7. Industrielle Einsatzplanung, Kennzahlen und Arbeitgebermarke gezielt ergänzen. Jahresabhängige Entgelt- und Sozialversicherungswerte separat aktuell prüfen.

### LF 13 · Komplexe betriebliche Problemlösung

**3. Lehrjahr · 40 Unterrichtsstunden · 4 Kapitel**

| Nr. | Kapitel | Inhaltlicher Umfang |
|---:|---|---|
| 1 | Ein betriebliches Problem untersuchen | Komplexe Fragestellung, betroffene Prozesse und Schnittstellen, Ursachen sowie rechtliche und wirtschaftliche Rahmenbedingungen. |
| 2 | Informationen und innovative Lösungen entwickeln | Recherche auch in fremder Sprache, Entwicklungstrends, digitale Anwendungen, Kreativitätstechniken und begründete Auswahl. |
| 3 | Die Lösung planen und umsetzen | Ziele, Projektmanagement, Termine, Zuständigkeiten und methodengeleitete Durchführung. |
| 4 | Ergebnis, Wirkung und Vorgehen beurteilen | Dokumentation, zielgruppengerechte Präsentation, Wechselwirkungen, Zielerreichung und kontinuierliche Verbesserung. |

**MAKEL-Fall:** Wiederkehrende Lieferprobleme werden über Einkauf, externe Fertigung, eigene Veredelung, Lager und Vertrieb hinweg untersucht. Eine begründete Lösung verbindet Wissen aus mehreren Lernfeldern.

**Vorhandene Grundlage:** Büromanagement LF 11 und LF 13. Das Abschlussprojekt muss fachlich stärker vernetzt sein als das Einstiegsprojekt aus LF 2.

**Grenze:** Das Lernfeld bereitet methodisch auf anspruchsvolle betriebliche Aufgaben vor. Es ersetzt nicht automatisch die persönlichen Anforderungen und das Genehmigungsverfahren der Prüfungsfachaufgabe im Einsatzgebiet.

## 5. Lernreihenfolge und Grenzen zwischen den Lernfeldern

| Schnittstelle | Geplante Abgrenzung |
|---|---|
| LF 2 und LF 13 | LF 2 vermittelt Projektgrundlagen an einem überschaubaren Auftrag; LF 13 nutzt diese für eine komplexe, vernetzte Problemlösung. |
| LF 3 und LF 9 | LF 3 bearbeitet einen konkreten Kundenauftrag; LF 9 entwickelt die übergeordnete Markt- und Marketingkonzeption. |
| LF 3 und LF 4 | Kaufrecht wird an Einkaufs- und Verkaufsrollen angewendet. Grundlagen werden verlinkt und aus der jeweiligen Perspektive erläutert. |
| LF 3 vor LF 8 | Für die frühe Verkaufskalkulation werden Selbstkosten vorgegeben. Ihre vollständige Herleitung folgt in LF 8. |
| LF 4 und LF 7 | LF 4 behandelt Beschaffungsentscheidung und Materialversorgung; LF 7 die physische und informationelle Abwicklung der Lieferkette. |
| LF 5, LF 8 und LF 10 | LF 5: laufende Buchführung. LF 8: internes Rechnungswesen und Entscheidungen. LF 10: Abschluss, externe Auswertung und Finanzierung. |
| LF 6 vor LF 8 | In LF 6 werden einfache fixe/variable Kosten, Gewinnschwelle und Eigen-/Fremdbezug an konkreten Produktionsentscheidungen eingeführt. LF 8 systematisiert und vertieft die Verfahren. |
| LF 8 und LF 10 | LF 8 beurteilt die Wirtschaftlichkeit einer Investition; LF 10 prüft Kapitalbedarf, Finanzierungsform und Zahlungsfähigkeit. |
| LF 5 und LF 12 | Grundlagen der Buchführung kommen früh. Personalabrechnung folgt fachlich in LF 12; eine Gehaltsbuchung kann darauf aufbauen. |

Digitalisierung, Datenschutz, Nachhaltigkeit, Kommunikation, Zusammenarbeit und fremdsprachliche Handlungssituationen werden in den betreffenden Kapiteln mitgeführt. Sie sollen keine isolierten Anhänge werden. Englisch wird insbesondere bei Anfragen, Angeboten, Marketing, Personalgewinnung und Recherche eingebunden. Der berufsbezogene Vokabelbestand umfasst vier neue 20er-Blöcke gemäß 02-makel-und-pruefungen.md.

## 6. Prüfungsvorbereitung

### Teil 1

- Nach dem KMK-Rahmenlehrplan müssen LF 1–7 vor Teil 1 unterrichtet werden. Der Einstiegspfad umfasst damit **44 geplante Kapitel**, einschließlich Produktion und Logistik aus dem zweiten Lehrjahr.
- Der Prüfungsbereich verbindet Produktion, Logistik, Einkauf und Buchhaltung. Prüfungszeit: **90 Minuten**, Gewichtung: **25 Prozent**.
- Die Inhaltsgrenze der Prüfung ergibt sich aus der Ausbildungsordnung und dem zugehörigen Berufsschulstoff. Die LF-Zuordnung ist eine Lernplanung, keine Garantie bestimmter Aufgaben.
- Eigene Übungssätze verbinden passende Geschäftsfälle; sie übernehmen keine geschützten Originalaufgaben.

### Teil 2

| Bereich | Geplante Vorbereitung | Gewichtung am Gesamtergebnis |
|---|---|---:|
| Marketing, Vertrieb, Personal und kaufmännische Steuerung | Vernetzte Aufgaben aus passenden Kapiteln, insbesondere LF 3 und LF 8–12; schriftliche Prüfung: 150 Minuten. | 35 % |
| Fachaufgabe im Einsatzgebiet | Ergänzender Leitfaden zu Themenwahl, Antrag, eigener betrieblicher Aufgabe, Dokumentation, Präsentation und Fachgespräch. | 30 % |
| Wirtschafts- und Sozialkunde | Berufliche, wirtschaftliche und gesellschaftliche Grundlagen thematisch bündeln; schriftliche Prüfung: 60 Minuten. | 10 % |

Zusätzlich zu den 85 Fachkapiteln sind drei Arten schriftlicher Übungsvorlagen und ein achtteiliger Fachaufgabenleitfaden gemäß 02-makel-und-pruefungen.md vorgesehen. Wirtschafts- und Sozialkunde darf nicht pauschal mit LF 11 gleichgesetzt werden; insbesondere Ausbildungs- und Arbeitswelt kommen aus weiteren Lernfeldern und gegebenenfalls ergänzenden Vorgaben.

Für die Fachaufgabe sind die Anforderungen aus § 12 maßgeblich: unter anderem drei bis fünf Seiten Dokumentation und eine Präsentation mit anschließendem Fachgespräch. Kammerbezogene organisatorische Vorgaben sind vor der Ausarbeitung aktuell zu prüfen. Ein fachlicher Probefall bei MAKEL ersetzt keine eigene betriebliche Prüfungsleistung.

## 7. MAKEL: Was konkret auszuarbeiten ist

| Bereich | Vorgesehene Ergänzung |
|---|---|
| Bestehende Identität | Name, Rechtsform, Sitz, bestehende Personen und Markenprofil als Ausgangspunkt erhalten. Zahlen und Zuständigkeiten erst nach gesondertem Konsistenzabgleich ergänzen. |
| Produktionswege | Eigene Musterfertigung, eigene Veredelung und externe Serienfertigung als getrennte Abläufe beschreiben. Nicht stillschweigend eine vollständig integrierte Textilfabrik daraus machen. |
| Artikel und Material | Kleine überschaubare Auswahl an Hoodies, Shirts und Varianten; Rohlinge, Stoffe und Druckmaterial je nach Prozess. |
| Produktionsunterlagen | Material- und Stücklisten, Arbeitspläne, Rüst- und Stückzeiten sowie Qualitätskriterien. |
| Ressourcen | Maschinen, Arbeitsplätze, Personalkapazitäten und Schichten, soweit ein Fall sie benötigt. |
| Mengen und Kosten | Konsistente Bestände, Preise, Verbrauchsmengen und Kalkulationsdaten; Werte erst für konkrete Fallpakete festlegen. |
| Belege und Kommunikation | Anfragen, Angebote, Aufträge, Wareneingang, Rechnungen und Auswertungen in derselben Unternehmenswelt. |
| Ergänzende Branchen | Beispielsweise Metall- oder Möbelbetrieb für wirtschaftlich typische Fertigungsformen; keine unnötige Erweiterung von MAKEL. |

**Aufgabenregel:** Jede unabhängig auswählbare Aufgabe enthält die notwendigen Daten. Ein gemeinsamer Fall darf mehrere Schritte verbinden, wenn Abhängigkeiten ausdrücklich ausgewiesen werden und notwendige Zwischenwerte verfügbar bleiben. Bestehende Personen- und Kontenkennungen erst nach tatsächlichem Abgleich verwenden.

## 8. Vorläufige Wiederverwendungskarte

| Neuer Bereich | Vorhandene Büromanagement-Grundlage | Geplante Bearbeitung |
|---|---|---|
| LF 1 | LF 1, Teile LF 2 und LF 11 | An Industrieprozesse anpassen und Kennzahlen ergänzen. |
| LF 2 | LF 13 und Kommunikation aus LF 7 | Als Einstiegsprojekt neu zuschneiden. |
| LF 3 | LF 3, ausgewählte Kapitel LF 4 und LF 7 | B2B-Auftragsbearbeitung und Schnittstellen ausarbeiten. |
| LF 4 | LF 4 K1–K6 | Disposition und internationalen Einkauf vertiefen. |
| LF 5 | Buchführungsbereich | Material, Produktion und Erzeugnisbestände ergänzen. |
| LF 6 | Einzelne Grundlagen aus LF 10 und LF 11 | Wesentlichen Produktionsstoff neu schreiben. |
| LF 7 | Einzelne Grundlagen aus LF 4 und LF 11 | Logistikstoff überwiegend neu schreiben. |
| LF 8 | LF 10 und LF 9 K6 | Kostenrechnung für den Industrieeinsatz vertiefen. |
| LF 9 | LF 5, Teile LF 3 und LF 13 | Außenhandel und integriertes Marketingkonzept ergänzen. |
| LF 10 | Buchführung und LF 9 | Abschlussbewertung und industrielle Auswertung vertiefen. |
| LF 11 | Einzelne Grundlagen aus LF 1, LF 5 und LF 9 | Gesamtwirtschaftliche Systematik überwiegend neu schreiben. |
| LF 12 | LF 8, ergänzt um LF 1 und LF 7 | Industriefälle und Kennzahlen ergänzen. |
| LF 13 | LF 11 und LF 13 | Als vernetzte Problemlösung neu zuschneiden. |

Wiederverwendung bedeutet fachlich prüfen, passend zuordnen und erforderlichenfalls neu formulieren. Eine identische Überschrift oder ein bestandener Büromanagement-Test belegt noch keine Abdeckung der Industriekaufleute-Kompetenz.

## 9. Vorgeschlagene Ausarbeitungsreihenfolge

1. **Gesamtplan:** Den vorliegenden Kapitelentwurf fachlich verfeinern und pro Kapitel eine Zuordnung zu den Kompetenzpassagen des Rahmenlehrplans anlegen. Damit werden Lücken und bewusste Ergänzungen nachweisbar.
2. **MAKEL-Grunddaten:** Die für Einkauf, Produktion, Buchführung und Logistik gemeinsam benötigten Abläufe und Stammdaten abstimmen. Noch keine umfangreiche neue Unternehmensgeschichte schreiben.
3. **Referenzkapitel:** Ein angepasstes Kapitel aus einem bekannten Thema und ein neues Produktionskapitel vollständig ausarbeiten. Daran Stil, Tiefe, Aufgaben und Zahlenkonsistenz prüfen.
4. **Erstes vollständiges Paket:** LF 1–7 mit 44 Kapiteln einschließlich Übungen und eigener AP1-Vorbereitung ausarbeiten. Die konkrete Schreibreihenfolge berücksichtigt die Vorwissensgrenzen aus Abschnitt 5.
5. **Erweiterung:** LF 8–13 mit 41 weiteren Kapiteln, dann die ergänzende AP2-Vorbereitung ausarbeiten.
6. **Qualität und Einbindung:** Fachliche Prüfung, Kompetenzabdeckung und Aufgabenrechnungen kontrollieren; danach die technische Einbindung mit dem aktuellen Repository-Stand planen und prüfen.

Arbeitsreihenfolge für Claude: vollständiger Ausbau des zweiten Ausbildungsgangs in prüfbaren Etappen; zunächst Referenzkapitel und technische Berufstrennung, dann LF 1–7, dann LF 8–13 und beide Prüfungspfade. Nach einer Etappe weiterarbeiten, sofern keine echte externe Abhängigkeit blockiert. Veröffentlichung ist ein eigener späterer Schritt; keine neue Live-Freigabe wird hier dokumentiert.

## 10. Anforderungen vor einer späteren Umsetzung

- Neue berufsbezogene Kennungen müssen Kapitel, Aufgaben, Karteikarten und Lernfortschritt zuverlässig vom Büromanagement-Bestand unterscheiden. Beispielsweise dürfen zwei verschiedene LF 1 nicht dieselben gespeicherten Fortschrittsdaten verwenden.
- Gemeinsame Erklärungen dürfen zusammen genutzt werden, wenn Lernziele, fachliche Tiefe und Quellenlage tatsächlich übereinstimmen. Die konkrete Speicherstruktur wird erst nach Prüfung der dann aktuellen Build- und App-Logik festgelegt.
- Gesetzesangaben, Entgeltwerte, Beitragssätze und andere zeitabhängige Angaben erhalten einen geprüften Stand. Dieses Dokument erfindet dafür keine Jahreswerte.
- Der Quellenabgleich muss die Kompetenzpassagen, Aufgabenformen und Lösungen umfassen. Der vorliegende Plan ist noch kein Nachweis vollständiger fachlicher Abdeckung auf Abschnittsebene.
- Die Einbindung erfolgt in der bestehenden App und mit ihrem vorhandenen Erscheinungsbild. Berufsauswahl und Datenzuordnung sind in 03-umsetzung-und-abnahme.md geplant; neue Zugriffsrechte oder Community-Berufsräume sind nicht Teil des Auftrags.
- Bestehender Büromanagement-Lernstand und bestehende Inhalte werden durch die Planung nicht verändert.

## 11. Bearbeitungsstand und nächster Schritt

LF 1–5 stehen in Abschnitt 12, LF 6–13 in Abschnitt 15. Der vollständige Entwurf enthält **85 Kapitel, 255 Lernziele, 340 Abschnittsvorschläge und 170 Aufgabenentwürfe**. Lehrplananker geben die gedruckte Seite und den fachlichen Bezug an.

Claude erstellt daraus die Lerninhalte und die Einbindung in die bestehende App gemäß dem beigefügten Auftrag. Fachliche Quellenprüfung, endgültige Lösungstexte und Nachweise der Lehrplanabdeckung gehören zur Erstellung, nicht zu einer zusätzlichen vorherigen Ideenrunde. Die vollständige unabhängige Abnahme ist noch offen.

## 12. Feingliederung LF 1–5

### Redaktionsregeln für die Kapitel

- Die nachfolgenden Kennungen dienen der Planung; sie legen noch keine technischen IDs im App-Code fest.
- Jedes Kapitel erhält drei Lernziele und vier Abschnitte. Die Lernziele werden bei der späteren JSON-Erstellung an die jeweils passenden Abschnitts-IDs gebunden.
- Kurzfassung und Langfassung bleiben im selben Kapitel. Die Langfassung erklärt Voraussetzungen, Warum und Wie, mindestens zwei Anwendungsbeispiele, einen gelösten Fall oder Rechenweg, typische Fehler und begründete Antworten.
- Merksätze liefern eigenständig verständliche Karteikartenfragen. Zuordnungen und Checks werden wie im vorhandenen Bereich eingesetzt. Ein Check erhält Rückmeldungen zu richtigen und falschen Antworten.
- Die zwei Aufgaben je Kapitel sind konkrete redaktionelle Entwürfe für das vorhandene Aufgabensystem. Ihre endgültige Punkteverteilung, Parametrisierung und technische Aufgabenart stehen noch nicht fest.
- Zahlen sind ausdrücklich **fiktive Aufgabendaten**, keine neuen verbindlichen MAKEL-Stammdaten. Aufgaben nennen alle benötigten Werte und Rundungsregeln. Kaufmännische Rundung erfolgt grundsätzlich erst beim ausgewiesenen Ergebnis; Abweichungen werden benannt.
- Netto- und Bruttobeträge, Mengen, Bezugsgrößen und zeitliche Annahmen stehen direkt in der Aufgabe. Bei Buchungen werden hier Kontennamen verwendet; Kontonummern werden erst nach Prüfung des aktuellen Kontenplans zugeordnet.
- Gesetzliche Regeln werden in der endgültigen Redaktion mit aktuellen Primärquellen belegt. Dieser Plan legt nur ausdrücklich benannte einzelne Rechenannahmen oder geprüfte Regeln fest; offene Detailfälle erhalten keine erfundenen Rechtsfolgen.

**Lehrplananker:** Gedruckte Seiten 10–14 des [KMK-Rahmenlehrplans](https://www.kmk.org/fileadmin/Dateien/pdf/Bildung/BeruflicheBildung/rlp/Industriekaufleute_2023-12-15-mitEL.pdf). Die nachfolgenden Anker sind eigene, sinngemäße Zuordnungen zu den jeweiligen Kompetenzpassagen, keine amtlichen Absatznummern. Alle didaktischen Unterthemen, die über die ausdrücklichen Begriffe des Lehrplans hinausgehen, werden als Konkretisierung behandelt.

### LF 1 · Sieben Kapitel im Detail

#### IK-LF01-K01 · Deine Ausbildung bei MAKEL

**Lehrplananker:** KMK S. 10, Orientierung im dualen Ausbildungssystem und Entwicklung von Arbeits- und Lernstrategien.

**Lernziele:** Du kannst (1) Aufgaben von Betrieb, Berufsschule und zuständiger Stelle unterscheiden, (2) Ausbildungsordnung, schulischen Rahmenlehrplan und betrieblichen Ausbildungsplan zuordnen und (3) einen nachvollziehbaren persönlichen Lernablauf planen.

**Abschnitte:** A1: Zwei Lernorte und ihre Zusammenarbeit. A2: Ordnungsmittel und betrieblicher Ablauf. A3: Zuständigkeiten und geeignete Ansprechpersonen. A4: Ausbildungsnachweis, Lernstrategien und Transfer zwischen Schule und Betrieb.

**MAKEL-Fall:** Zum Ausbildungsstart erhältst du einen betrieblichen Ausbildungsplan und einen Schulstundenplan. Du klärst, wie beides zusammengehört.

**Aufgabe 1:** Ordne drei Anliegen zu: praktisches Einweisen an einem Arbeitsplatz, Klärung einer schulischen Lernaufgabe und Organisation der Abschlussprüfung. **Lösungskriterium:** Betrieb beziehungsweise ausbildende Person; Berufsschule; zuständige Stelle, für diesen MAKEL-Fall die IHK. Keine Gleichsetzung von Schule und Prüfungsstelle.

**Aufgabe 2:** Entwirf eine Lernwoche mit einer betrieblichen Beobachtung, einer Erklärung aus dem Unterricht und einer eigenen Übung. **Lösungskriterium:** Alle drei Elemente beziehen sich auf dasselbe Thema, sind zeitlich eingeplant und enden mit einer überprüfbaren Lernfrage.

**Typischer Fehler:** Den schulischen Rahmenlehrplan als persönlichen betrieblichen Einsatzplan lesen. **Grundlage:** Büromanagement LF 1 K1; industriellen Berufsbezug und Ausbildungsablauf neu formulieren.

#### IK-LF01-K02 · Ausbildungsvertrag und Rechte

**Lehrplananker:** KMK S. 10, vertragliche und gesetzliche Grundlagen sowie Grenzen erteilter Vollmachten.

**Lernziele:** Du kannst (1) wichtige Vertragsangaben erklären, (2) typische Rechte und Pflichten zuordnen und (3) bei einer Aufgabe die Grenze einer ausdrücklich erteilten Vollmacht erkennen.

**Abschnitte:** A1: Vertrag und Ausbildungszweck. A2: Pflichten beider Seiten. A3: Probezeit und besondere Schutzvorschriften für Jugendliche. A4: Vollmacht, Rückfrage und verantwortliches Handeln.

**MAKEL-Fall:** Ein Vertragsentwurf und eine Einkaufsanweisung enthalten Punkte, die du vor der Unterschrift beziehungsweise Bestellung klären musst.

**Aufgabe 1:** Im Entwurf stehen sechs Monate Probezeit. Beurteile dies anhand [§ 20 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__20.html). **Erwartete Lösung:** Die zulässige Probezeit liegt zwischen einem und vier Monaten; sechs Monate entsprechen dieser Vorschrift nicht.

**Aufgabe 2:** Eine schriftliche Einzelvollmacht erlaubt den Kauf eines bestimmten Scanners bis 300 Euro. Das gewählte Gerät kostet 420 Euro. Was tust du vor der Bestellung? **Lösungskriterium:** Preisgrenze erkennen, Bestellung zurückstellen und erweiterten Auftrag beziehungsweise Freigabe einholen. Die Aufgabe fragt nach sachgerechtem Vorgehen, nicht nach einer pauschalen Bewertung sämtlicher Außenwirkungen einer Vollmachtsüberschreitung.

**Typischer Fehler:** Probezeitregeln beliebiger Arbeitsverträge auf Ausbildungsverträge übertragen. **Grundlage:** Büromanagement LF 1 K2/K3; [§ 14 BBiG](https://www.gesetze-im-internet.de/bbig_2005/__14.html) und weitere einschlägige Schutzvorschriften bei Redaktion prüfen.

#### IK-LF01-K03 · Vom Material zum fertigen Produkt

**Lehrplananker:** KMK S. 10, Leistungsprogramm, Produktionsfaktoren und Ströme von der Beschaffung bis zum Absatz.

**Lernziele:** Du kannst (1) Produkte und Dienstleistungen unterscheiden, (2) eingesetzte Produktionsfaktoren zuordnen und (3) Waren-, Geld- und Informationsflüsse getrennt darstellen.

**Abschnitte:** A1: Was MAKEL anbietet. A2: Material, Betriebsmittel und menschliche Arbeit. A3: Eigene Musterfertigung und Veredelung gegenüber externer Serienfertigung. A4: Die drei wesentlichen Flussrichtungen im Geschäftsablauf.

**MAKEL-Fall:** Ein Geschäftskunde bestellt bedruckte Hoodies. MAKEL beschafft Rohlinge, veredelt sie und versendet die fertige Ware.

**Aufgabe 1:** Ordne Druckmaschine, Arbeitszeit und Rohlinge den Faktoren zu. **Erwartete Lösung:** Betriebsmittel, menschliche Arbeit und Werkstoffe; jeweils mit einer Begründung anhand der Funktion im Fall.

**Aufgabe 2:** Zeichne den Ablauf Bestellung, Materiallieferung, Fertigwarenlieferung und Zahlung als getrennte Flüsse. **Lösungskriterium:** Bestellung als Information; Material und Fertigware als Güterfluss; Zahlung als Geldfluss. Rollen von Lieferant, MAKEL und Kunde bleiben erkennbar.

**Typischer Fehler:** Fremdfertigung als eigene Produktion ausweisen. **Grundlage:** Büromanagement LF 1 K5/K6; die industrielle Wertschöpfungskette neu ausarbeiten.

#### IK-LF01-K04 · So ist MAKEL organisiert

**Lehrplananker:** KMK S. 10, Aufbauorganisation, Organisationsformen, Geschäftsprozesse und ereignisgesteuerte Prozessketten.

**Lernziele:** Du kannst (1) Aufbau und Ablauf unterscheiden, (2) Kern- und Unterstützungsprozesse begründet zuordnen und (3) einen einfachen Ablauf als ereignisgesteuerte Prozesskette darstellen.

**Abschnitte:** A1: Abteilungen, Stellen und Weisungswege. A2: Organisationsformen und Schnittstellen. A3: Kernprozesse und unterstützende Prozesse. A4: Einfache EPK mit Ereignissen, Funktionen und passenden Verknüpfungen.

**MAKEL-Fall:** Ein Auftrag bleibt zwischen Vertrieb, Veredelung und Versand liegen. Du machst Zuständigkeiten und Übergaben sichtbar.

**Aufgabe 1:** Ordne Auftragsabwicklung und interne Personalverwaltung im vereinfachten Fall zu. **Lösungskriterium:** Auftragsabwicklung als kundengerichteter Kernprozess, interne Personalverwaltung als Unterstützungsprozess; die jeweilige Wertschöpfungsfunktion erläutern.

**Aufgabe 2:** Stelle „Auftrag eingegangen – Auftrag prüfen – Auftrag freigegeben“ als kleine EPK dar. **Erwartete Lösung:** Ereignis, Funktion, Ereignis in dieser Reihenfolge; keine reine Liste von Abteilungen.

**Typischer Fehler:** Ein Organigramm für eine zeitliche Ablaufbeschreibung halten. **Grundlage:** Büromanagement LF 1 K5 und LF 11 K1/K2; EPK am industriellen Auftrag vertiefen.

#### IK-LF01-K05 · Rechtsform, Ziele und Interessen

**Lehrplananker:** KMK S. 10, Eigentümerstruktur, Rechtsform, Anspruchsgruppen, internationale Verflechtungen und Unternehmensziele.

**Lernziele:** Du kannst (1) Rechtsform und Eigentümerstruktur auseinanderhalten, (2) Interessen verschiedener Anspruchsgruppen benennen und (3) Zielbeziehungen anhand einer Entscheidung erklären.

**Abschnitte:** A1: MAKEL als GmbH und grundlegende Rechtsformunterschiede. A2: Eigentum und Geschäftsführung. A3: Wirtschaftliche, soziale, ökologische und ethische Ziele. A4: Unternehmenskultur, Leitbild und internationale Beziehungen.

**MAKEL-Fall:** MAKEL vergleicht günstigeres Material mit einer teureren, nachvollziehbar dokumentierten Alternative.

**Aufgabe 1:** Nenne mögliche Interessen von Beschäftigten, Kunden und Eigentümern bei der Materialentscheidung. **Lösungskriterium:** Drei unterschiedliche, zum Fall passende Interessen; keine stereotype Behauptung, alle Beteiligten hätten nur ein einziges Ziel.

**Aufgabe 2:** Ein Materialwechsel senkt laut Vorgabe den Ausschuss und die Gesamtkosten; eine andere Maßnahme verbessert Arbeitsbedingungen bei höheren Kosten. Unterscheide die Zielbeziehungen. **Erwartete Lösung:** Im ersten Fall mögliche Zielharmonie von Ressourcenschonung und Wirtschaftlichkeit; im zweiten ein zu bewertender Zielkonflikt zwischen sozialem Ziel und kurzfristigem Kostenminimum.

**Typischer Fehler:** Ein Leitbild mit einer nachgewiesenen Zielerreichung gleichsetzen. **Grundlage:** Büromanagement LF 1 K5/K6; konkrete Rechtsformaussagen vor Redaktion anhand des GmbHG und weiterer Primärquellen prüfen.

#### IK-LF01-K06 · Unternehmenserfolg beurteilen

**Lehrplananker:** KMK S. 10, Kennzahlen für Produktivität, Wirtschaftlichkeit und Rentabilität.

**Lernziele:** Du kannst (1) die drei Kennzahlarten unterscheiden, (2) mit ausdrücklich genannten Bezugsgrößen rechnen und (3) ein Ergebnis unter Beachtung seiner Aussagegrenze erklären.

**Abschnitte:** A1: Mengenmäßige Produktivität. A2: Wertmäßige Wirtschaftlichkeit. A3: Rentabilität mit klar benanntem Kapitalbezug. A4: Vergleich, Interpretation und Grenzen einzelner Kennzahlen.

**MAKEL-Fall:** Das Veredelungsteam prüft eine Woche und einen vereinfachten Jahresfall. Die Zahlen gehören zu getrennten Aufgaben.

**Aufgabe 1:** 240 Shirts werden in 30 Arbeitsstunden fertiggestellt. Berechne die Arbeitsproduktivität. **Erwartete Lösung:** 240 / 30 = 8 Shirts je Arbeitsstunde; die Einheit gehört zum Ergebnis.

**Aufgabe 2:** Ertrag 150.000 Euro, Aufwand 120.000 Euro; Jahresgewinn im vereinfachten Fall 30.000 Euro und durchschnittliches Eigenkapital 200.000 Euro. Berechne Wirtschaftlichkeit und Eigenkapitalrentabilität. **Erwartete Lösung:** 1,25 beziehungsweise 125 Prozent als Verhältnis von Ertrag zu Aufwand; Eigenkapitalrentabilität 15 Prozent. Die Wirtschaftlichkeitskennzahl bedeutet nicht 125 Prozent Gewinn.

**Typischer Fehler:** Produktivität mit Gewinn oder einer beliebigen Prozentzahl verwechseln. **Grundlage:** Neue systematische Kennzahleneinführung; vorhandene Darstellungen aus LF 1 und LF 9 nur nach Abgleich nutzen.

#### IK-LF01-K07 · Deine Rolle mitgestalten

**Lehrplananker:** KMK S. 10, ergonomisches Arbeiten, Mitbestimmung, Unternehmenspräsentation, Datenschutz, Urheberrecht und Selbstmanagement.

**Lernziele:** Du kannst (1) Verbesserungsmöglichkeiten für Arbeitsplatz und Zusammenarbeit begründen, (2) betriebliche Beteiligungswege zuordnen und (3) eine datensparsame, adressatengerechte Unternehmensvorstellung planen.

**Abschnitte:** A1: Ergonomisch, sicher und gesund arbeiten. A2: Beteiligung, JAV und Betriebsrat in einer erläuterten Betriebskonstellation. A3: Zusammenarbeit und Selbstmanagement. A4: MAKEL vorstellen und Informationen verantwortlich auswählen.

**MAKEL-Fall:** Du erstellst eine kurze Vorstellung für neue Auszubildende und sammelst zugleich Verbesserungsvorschläge für den Arbeitsplatz.

**Aufgabe 1:** In einer Präsentation stehen Abteilungsaufgaben, private Telefonnummern und ein Foto ohne geklärte Nutzungsrechte. Was bearbeitest du? **Lösungskriterium:** Sachlich erforderliche Betriebsinformationen erhalten; private Kontaktdaten entfernen beziehungsweise ihre Erforderlichkeit und zulässige Verwendung prüfen; Bildrechte klären oder geeignetes Ersatzmaterial einsetzen.

**Aufgabe 2:** Plane eine dreiminütige Vorstellung mit Zielgruppe, drei Kerninformationen und einem Verbesserungsvorschlag zum eigenen Arbeitsplatz. **Lösungskriterium:** Roter Faden, Zeitrahmen und begründeter Vorschlag; keine bloße Aufzählung von Folientiteln.

**Typischer Fehler:** Datenschutz oder Mitbestimmung ohne Bezug zum konkreten Arbeitsablauf behandeln. **Grundlage:** Büromanagement LF 1 K4/K7, LF 2 K1/K2/K5 und LF 7; Voraussetzungen einzelner Beteiligungsrechte gesondert prüfen.

### LF 2 · Vier Kapitel im Detail

#### IK-LF02-K01 · Aus einer Idee wird ein Projektauftrag

**Lehrplananker:** KMK S. 11, Projektauftrag hinsichtlich Rahmenbedingungen und Zielen analysieren.

**Lernziele:** Du kannst (1) ein Projekt gegenüber wiederkehrenden Aufgaben abgrenzen, (2) einen Auftrag in überprüfbare Ziele übersetzen und (3) Grenzen und Annahmen dokumentieren.

**Abschnitte:** A1: Projektmerkmale. A2: Auftrag, Beteiligte und Rahmenbedingungen. A3: Ziele und Abnahmekriterien. A4: Umfang, Nichtziele und offene Fragen.

**MAKEL-Fall:** Neue Mitarbeitende sollen künftig einen einheitlichen, verständlichen Einstieg erhalten. Du planst die Erstellung eines kleinen Onboarding-Pakets.

**Aufgabe 1:** Vergleiche „jede Woche die Anwesenheitsliste pflegen“ mit „bis zu einem vorgegebenen Termin ein neues Onboarding-Paket entwickeln“. **Lösungskriterium:** Wiederkehrende Routine gegenüber zeitlich begrenztem Vorhaben mit eigenem Ergebnis und Abstimmungsbedarf unterscheiden.

**Aufgabe 2:** Verbessere das Ziel „Das Onboarding soll besser werden“. **Musterlösung:** Bis zum vorgegebenen Termin liegt eine erprobte Checkliste mit den festgelegten Pflichtinformationen vor; zwei neue Teammitglieder können die ausdrücklich genannten Einstiegsaufgaben damit nachvollziehen. Termine und Pflichtinformationen müssen im endgültigen Fall vorgegeben sein.

**Typischer Fehler:** Eine Tätigkeit als Ergebnisziel formulieren. **Grundlage:** Büromanagement LF 13 K1; Projektumfang für das erste Lehrjahr begrenzen.

#### IK-LF02-K02 · Aufgaben, Zeit und Zusammenarbeit planen

**Lehrplananker:** KMK S. 11, selbstorganisierte Teamarbeit und strukturierte Projektplanung mit einer geeigneten Methode.

**Lernziele:** Du kannst (1) Arbeitspakete und Verantwortlichkeiten festlegen, (2) Abhängigkeiten in einen Terminplan übersetzen und (3) eine geeignete Vorgehensweise begründet wählen.

**Abschnitte:** A1: Ergebnis in Arbeitspakete zerlegen. A2: Rollen, Kommunikation und Zusammenarbeit. A3: Ressourcen, Termine und Abhängigkeiten. A4: Klassisches und agiles Vorgehen an einem überschaubaren Fall.

**MAKEL-Fall:** Das Onboarding-Paket benötigt zuerst Inhalte, dann Layout und schließlich einen Probelauf.

**Aufgabe 1:** Inhaltserstellung dauert zwei Arbeitstage, Layout einen und der anschließende Probelauf einen. Alle Schritte laufen nacheinander; zusätzliche Wartezeiten gibt es nicht. **Erwartete Lösung:** Mindestdauer vier Arbeitstage. Vier Tage Dauer sind nicht automatisch vier Personentage Aufwand, solange die Besetzung nicht angegeben ist.

**Aufgabe 2:** Begründe für einen vorgegebenen Fall eine feste Ablaufplanung oder kurze Feedbackschleifen. **Lösungskriterium:** Die Wahl bezieht sich auf stabile beziehungsweise veränderliche Anforderungen und auf den Abstimmungsbedarf; Rollen und Verantwortlichkeiten bleiben klar.

**Typischer Fehler:** Dauer, Aufwand und Personenzahl gleichsetzen. **Grundlage:** Büromanagement LF 13 K2 und LF 2 K2/K3.

#### IK-LF02-K03 · Das Projekt durchführen und steuern

**Lehrplananker:** KMK S. 11, Zusammenarbeit, Datenschutz, Konfliktlösung, Kreativität und Überwachung des Projektfortschritts.

**Lernziele:** Du kannst (1) Projektstatus anhand vereinbarter Kriterien darstellen, (2) auf Abweichungen mit begründeten Maßnahmen reagieren und (3) Informationen sicher und respektvoll im Team austauschen.

**Abschnitte:** A1: Aufgaben bearbeiten und Fortschritt dokumentieren. A2: Zusammenarbeit, Daten und digitale Werkzeuge. A3: Konflikte und kreative Lösungen. A4: Soll-Ist-Vergleich und Anpassung.

**MAKEL-Fall:** Beim Probelauf fehlen Inhalte; gleichzeitig enthält ein geteiltes Dokument unnötige personenbezogene Informationen.

**Aufgabe 1:** Von sechs gleich großen Arbeitspaketen sind drei abgeschlossen und zwei begonnen. Bestimme den sicher belegbaren Abschlussstand. **Erwartete Lösung:** Drei von sechs, also 50 Prozent der Pakete abgeschlossen. Der gesamte Bearbeitungsgrad lässt sich ohne Regel für angefangene Pakete nicht genau angeben.

**Aufgabe 2:** Ein Pflichtkapitel verzögert sich. Nenne zwei Handlungsoptionen und begründe die Auswahl. **Lösungskriterium:** Zum Beispiel Unterstützung organisieren oder Reihenfolge geeigneter Arbeiten ändern; Auswirkungen auf Ziel, Termin und Qualität bewerten. Pflichtinhalte nicht kommentarlos streichen.

**Typischer Fehler:** Begonnene Arbeit automatisch als fertig zählen. **Grundlage:** Büromanagement LF 13 K3, LF 2 K5 und LF 7 K4.

#### IK-LF02-K04 · Ergebnisse präsentieren und daraus lernen

**Lehrplananker:** KMK S. 11, Präsentation, konstruktives Feedback, Bewertung des Ergebnisses und Reflexion der Zusammenarbeit.

**Lernziele:** Du kannst (1) ein Ergebnis gegenüber vereinbarten Zielen beurteilen, (2) sachliches Feedback formulieren und (3) aus dem Ablauf eine konkrete Verbesserung ableiten.

**Abschnitte:** A1: Ergebnis für die Zielgruppe aufbereiten. A2: Präsentation und konstruktive Rückmeldungen. A3: Ziele und Abnahmekriterien prüfen. A4: Zusammenarbeit auswerten und Erfahrungen sichern.

**MAKEL-Fall:** Das Onboarding-Paket wird vorgestellt und mit den ursprünglichen Anforderungen verglichen.

**Aufgabe 1:** Vier von fünf Abnahmekriterien sind erfüllt. Das fünfte ist als zwingend gekennzeichnet. Ist die Abnahme automatisch erfolgreich? **Erwartete Lösung:** Nein. 80 Prozent erfüllte Kriterien ersetzen nicht die ausdrücklich festgelegte Muss-Anforderung.

**Aufgabe 2:** Formuliere aus „Das Team hat schlecht kommuniziert“ eine verwertbare Erkenntnis. **Musterlösung:** Freigaben fehlten im gemeinsamen Aufgabenplan; künftig wird je Arbeitspaket eine verantwortliche Person und ein dokumentierter Freigabetermin festgelegt.

**Typischer Fehler:** Ergebnisqualität und persönliche Sympathie im Team vermischen. **Grundlage:** Büromanagement LF 13 K4, LF 1 K7 und LF 7 K4.

### LF 3 · Sieben Kapitel im Detail

#### IK-LF03-K01 · Kundenanfragen verstehen

**Lehrplananker:** KMK S. 12, Kundenstatus und Kundenbedarf analysieren sowie Auftragsablauf überblicken.

**Lernziele:** Du kannst (1) aus einer Anfrage relevante Anforderungen herausarbeiten, (2) fehlende Informationen gezielt erfragen und (3) Kundenstatus und Bonitätsprüfung in den Auftragsprozess einordnen.

**Abschnitte:** A1: Wer fragt an und wofür? A2: Menge, Ausführung, Termin und Servicebedarf. A3: Leistungsangebot und Bonität. A4: Vom Erstkontakt zu einem bearbeitbaren Auftrag.

**MAKEL-Fall:** Ein neuer Geschäftskunde fragt 100 bedruckte Hoodies für eine Veranstaltung an, nennt aber weder Größen noch benötigten Liefertermin.

**Aufgabe 1:** Formuliere vier sinnvolle Rückfragen. **Lösungskriterium:** Zum Beispiel Größenverteilung, Druckmotiv beziehungsweise Druckumfang, gewünschter Liefertermin und Lieferort; Antworten müssen für Angebot oder Machbarkeit relevant sein.

**Aufgabe 2:** Erkläre, warum ein Neukunde nicht allein wegen seiner Unternehmens-E-Mail-Adresse auf offene Rechnung beliefert werden sollte. **Lösungskriterium:** Identität und Bonität sind unterschiedliche Prüfungen; Zahlungsbedingungen werden anhand nachvollziehbarer Informationen und betrieblicher Vorgaben festgelegt.

**Typischer Fehler:** Eine unverbindliche Anfrage schon als fertigen Auftrag behandeln. **Grundlage:** Büromanagement LF 3 K1/K3, LF 5 und LF 7; industrielle Anforderungen und Bonitätsbezug ergänzen.

#### IK-LF03-K02 · Kaufverträge zwischen Unternehmen

**Lehrplananker:** KMK S. 12, rechtliche Grundlagen von Aufträgen zwischen Unternehmen einschließlich AGB, Besitz und Eigentum.

**Lernziele:** Du kannst (1) Angebot und Annahme in einem eindeutigen Sachverhalt erkennen, (2) vereinbarte Leistungs- und Zahlungsbedingungen zuordnen und (3) Besitz und Eigentum begrifflich unterscheiden.

**Abschnitte:** A1: Wie zwei Erklärungen zusammenpassen. A2: Inhalt des Kaufvertrags und abweichende Erklärungen. A3: Lieferbedingungen, Zahlungsbedingungen und AGB. A4: Besitz, Eigentum und Vorbehaltsvereinbarungen.

**MAKEL-Fall:** Ein schriftliches Angebot über bestimmte Ware wird zunächst unverändert und in einer zweiten Variante mit einer anderen Menge beantwortet.

**Aufgabe 1:** Das Angebot nennt 100 Hoodies; die Antwort lautet „Wir bestellen zu diesen Bedingungen 120“. Identifiziere den Klärungsbedarf. **Lösungskriterium:** Eine Mengenabweichung ist keine unveränderte Zustimmung. Die endgültige Rechtsfolge wird in der ausgearbeiteten Lösung anhand der einschlägigen BGB-Regeln erklärt; ein Vertrag über 100 oder 120 Stück darf nicht ohne weitere Prüfung behauptet werden.

**Aufgabe 2:** Du erhältst einen betrieblichen Scanner nur zur Benutzung. Unterscheide tatsächliche Sachherrschaft und rechtliche Zuordnung. **Erwartete Lösung:** Benutzung beziehungsweise unmittelbarer Besitz bedeutet nicht automatisch Eigentum.

**Typischer Fehler:** Bei jedem B2B-Kauf pauschal Verbraucher-Widerrufsrechte unterstellen. **Grundlage:** Büromanagement LF 3 K2 und LF 4 K4; Vertragsfälle vor Freigabe anhand aktueller Primärquellen vollständig prüfen.

#### IK-LF03-K03 · Verkaufspreise und Angebote

**Lehrplananker:** KMK S. 12, Verkaufspreise auf vorgegebenen Selbstkosten kalkulieren und ein kundenbezogenes Angebot erstellen.

**Lernziele:** Du kannst (1) vorgegebene Selbstkosten für eine Verkaufskalkulation verwenden, (2) Zuschläge und Abzüge mit korrekten Bezugsgrößen berechnen und (3) ein Angebot mit passenden Bedingungen nachvollziehbar aufbauen.

**Abschnitte:** A1: Was Selbstkosten in diesem Kapitel bedeuten. A2: Gewinn, Skonto und Rabatt in der Kalkulation. A3: Mengen, Preise und Angebotsunterlagen. A4: Liefer-, Zahlungs- und Servicebedingungen.

**MAKEL-Fall:** MAKEL kalkuliert ein Angebot für bedruckte Hoodies. Die Herstellungskosten werden hier noch nicht selbst hergeleitet.

**Aufgabe 1:** Selbstkosten je Stück 40 Euro; Gewinnzuschlag 20 Prozent auf die Selbstkosten; keine Rabatte, kein Skonto. Gesucht ist der Nettoverkaufspreis. **Erwartete Lösung:** 40 × 1,20 = 48 Euro. Das ist ein Zuschlag auf die Kosten, keine Gewinnmarge von 20 Prozent des Verkaufspreises.

**Aufgabe 2:** Der gewünschte Barverkaufspreis beträgt netto 48 Euro. Es werden 2 Prozent Kundenskonto und 10 Prozent Kundenrabatt auf die jeweils vorgelagerte Preisstufe einkalkuliert. **Erwartete Lösung:** Zielverkaufspreis 48 / 0,98; Listenverkaufspreis 48 / 0,98 / 0,90 = 54,42 Euro netto bei Rundung erst am Ende. Rechenschema und Bezugsgrößen mitbewerten.

**Typischer Fehler:** Beim Rückwärtsrechnen Prozentsätze einfach addieren. **Grundlage:** Büromanagement LF 3 K3, LF 10 K4 und geeignete Kalkulationsbeispiele; Vollkostenherleitung erst LF 8.

#### IK-LF03-K04 · Auftrag erfassen und Lieferung abstimmen

**Lehrplananker:** KMK S. 12, Auftragserfassung, Datenschutz, interkulturelle und fremdsprachliche Kommunikation sowie Abstimmung mit Schnittstellen.

**Lernziele:** Du kannst (1) benötigte Auftragsdaten vollständig erfassen, (2) Übergaben zwischen Vertrieb, Produktion und Versand begründen und (3) eine klare Rückfrage oder Bestätigung formulieren.

**Abschnitte:** A1: Auftragsbestätigung und Datenqualität. A2: Machbarkeit und Kapazitätsabstimmung. A3: Lieferunterlagen und Statusüberwachung. A4: Zielgerichtete Kommunikation, auch auf Englisch.

**MAKEL-Fall:** Der Liefertermin steht, aber die Druckdatei ist noch nicht freigegeben. Vertrieb und Veredelung müssen den Ablauf abstimmen.

**Aufgabe 1:** Nenne Informationen, die vor Produktionsfreigabe fehlen dürfen beziehungsweise zwingend geklärt sein müssen. **Lösungskriterium:** Menge, Größen, Druckausführung, Freigabestatus und Termin als fallrelevante Angaben erkennen; keine Produktion auf Grundlage ungeklärter Pflichtdaten empfehlen.

**Aufgabe 2:** Formuliere eine kurze englische Rückfrage zur fehlenden Druckfreigabe. **Lösungskriterium:** Fehlenden Inhalt benennen, um eindeutige Bestätigung bitten, erforderlichen Zeitpunkt aus der Aufgabe nennen und Auswirkung auf den Termin sachlich erklären. Es gibt mehrere korrekte Formulierungen.

**Typischer Fehler:** Eine erfasste Bestellung mit einer technisch freigegebenen Produktion gleichsetzen. **Grundlage:** Büromanagement LF 3 K4/K5, LF 7 und LF 11; industriellen Freigabeablauf ergänzen.

#### IK-LF03-K05 · Reklamationen und mangelhafte Lieferungen

**Lehrplananker:** KMK S. 12, Schlechtleistung, rechtliche Grundlagen und aktives Beschwerdemanagement.

**Lernziele:** Du kannst (1) vereinbarte und tatsächliche Leistung vergleichen, (2) einen Reklamationsfall mit den entscheidenden Informationen aufnehmen und (3) eine rechtlich zu prüfende, kundenorientierte Bearbeitung planen.

**Abschnitte:** A1: Was wurde vereinbart und geliefert? A2: Sachverhalt, Nachweise und B2B-Besonderheiten. A3: Rechte, Nacherfüllung und weitere Schritte im geprüften Fallschema. A4: Kommunikation, Zufriedenheit und Verbesserungsmaßnahmen.

**MAKEL-Fall:** Auf einem Teil einer Lieferung ist das freigegebene Motiv falsch aufgedruckt.

**Aufgabe 1:** Von 100 gelieferten Hoodies sind 15 falsch bedruckt. Bestimme den Anteil und dokumentiere die Abweichung. **Erwartete Lösung:** 15 Prozent; zusätzlich Artikel, Motiv, betroffene Menge, vereinbarte Ausführung, Liefer- und Entdeckungszeitpunkt sowie geeignete Nachweise erfassen.

**Aufgabe 2:** Entwirf eine erste sachliche Antwort auf die Reklamation. **Lösungskriterium:** Eingang bestätigen, Problem konkret benennen, nötige Angaben erfragen und einen nächsten Prüfschritt beziehungsweise Rückmeldetermin nennen. Weder pauschal alle Ansprüche ablehnen noch ungeprüft eine bestimmte Rechtsfolge versprechen.

**Typischer Fehler:** Die Mangelquote als ausreichende Grundlage für jede rechtliche Entscheidung ansehen. **Grundlage:** Büromanagement LF 4 K6 und LF 7 K3/K4; Verkaufsrolle und tatsächliche Voraussetzungen des Einzelfalls berücksichtigen.

#### IK-LF03-K06 · Wenn Kunden nicht zahlen

**Lehrplananker:** KMK S. 12, verspätete Zahlung, außergerichtliches Mahnverfahren und Verjährung.

**Lernziele:** Du kannst (1) Fälligkeit und Verzug unterscheiden, (2) eine nachvollziehbare außergerichtliche Bearbeitungsfolge planen und (3) Zinsen mit vollständig vorgegebenen Parametern berechnen.

**Abschnitte:** A1: Rechnung, Fälligkeit und ausstehende Zahlung. A2: Voraussetzungen des Verzugs. A3: Mahnkommunikation und dokumentierte Schritte. A4: Verzugsfolgen und Verjährung als getrennte Fragen.

**MAKEL-Fall:** Ein Geschäftskunde hat eine Rechnung trotz ausdrücklich im Fall festgestellten Verzugs nicht bezahlt.

**Aufgabe 1:** Nenne die Informationen, die zur Prüfung eines Verzugsfalls vorliegen müssen. **Lösungskriterium:** Anspruch und Fälligkeit, vereinbarter Zahlungstermin, Zugang einer gegebenenfalls erforderlichen Mahnung beziehungsweise einschlägige Ausnahme, Zahlungseingänge und weitere fallrelevante Umstände. „Rechnung offen“ allein reicht als Begründung nicht.

**Aufgabe 2:** Für eine reine Rechenübung werden 2.000 Euro Forderung, 10 Prozent Jahreszins, 30 Zinstage und die ausdrücklich vereinbarte Rechenkonvention 30/360 vorgegeben. **Erwartete Lösung:** 2.000 × 0,10 × 30 / 360 = 16,67 Euro. Der angenommene Zinssatz und die 30/360-Konvention sind keine Aussage zum aktuellen gesetzlichen Verzugszinssatz oder zur gesetzlichen Zinstageberechnung.

**Typischer Fehler:** Immer drei Mahnungen für zwingend halten oder die Fälligkeit automatisch mit Verzug gleichsetzen. **Grundlage:** Büromanagement LF 4 K7; [§ 286 BGB](https://www.gesetze-im-internet.de/bgb/__286.html), [§ 288 BGB](https://www.gesetze-im-internet.de/bgb/__288.html) und Verjährungsvorschriften bei Ausarbeitung vollständig zuordnen.

#### IK-LF03-K07 · Kundenbeziehung und Auftragsprozess verbessern

**Lehrplananker:** KMK S. 12, Auftragsprozess hinsichtlich Unternehmenszielen und Kundenzufriedenheit bewerten und optimieren.

**Lernziele:** Du kannst (1) geeignete Kennzahlen auswerten, (2) eine Verbesserung aus einer belegten Ursache ableiten und (3) Kunden- und Unternehmensinteressen gemeinsam berücksichtigen.

**Abschnitte:** A1: Was einen guten Auftragsprozess ausmacht. A2: Kennzahlen und Rückmeldungen. A3: Ursachen statt Vermutungen. A4: Maßnahmen, Zielkonflikte und Erfolgskontrolle.

**MAKEL-Fall:** Kunden bemängeln wechselnde Lieferauskünfte. Du untersuchst den Informationsfluss zwischen Vertrieb und Versand.

**Aufgabe 1:** Von 80 Aufträgen sind 72 termingerecht; bei vier Aufträgen ging jeweils eine Reklamation ein. Berechne Termintreue und auftragsbezogene Reklamationsquote. **Erwartete Lösung:** 90 Prozent und 5 Prozent. Die betrachteten 80 Aufträge und die Bedeutung „mindestens eine Reklamation je betroffenem Auftrag“ müssen eindeutig sein.

**Aufgabe 2:** Schlage eine Maßnahme gegen widersprüchliche Statusauskünfte vor und bestimme eine Erfolgskontrolle. **Musterlösung:** Gemeinsamer freigegebener Auftragsstatus mit Verantwortlichkeit; anschließend Anteil widersprüchlicher Auskünfte über einen festgelegten Zeitraum vergleichen.

**Typischer Fehler:** Eine bessere Durchschnittszahl ohne Blick auf Ursachen als gesicherten Maßnahmenerfolg interpretieren. **Grundlage:** Büromanagement LF 5 K6 und LF 11 K3/K4.

### LF 4 · Sechs Kapitel im Detail

#### IK-LF04-K01 · Materialbedarf und Versorgung

**Lehrplananker:** KMK S. 13, Bedarfsanforderungen, Wert- und Mengenanteile, Verbrauchsstruktur und Bereitstellungsverfahren.

**Lernziele:** Du kannst (1) eine Bedarfsanforderung aus einem einfachen Produktionsauftrag ableiten, (2) Wertanteile und Verbrauchsverhalten unterscheiden und (3) Vorrats- und auftragsbezogene Beschaffung begründet vergleichen.

**Abschnitte:** A1: Welches Material wird benötigt? A2: Bedarf, verfügbarer Bestand und Reservierungen. A3: ABC- und XYZ-Betrachtung als didaktische Konkretisierung. A4: Bereitstellung mit und ohne Vorrat.

**MAKEL-Fall:** Für einen Druckauftrag werden Rohlinge und ein eindeutig vorgegebener Materialverbrauch benötigt.

**Aufgabe 1:** Für 500 Shirts sind laut Fall 20 Gramm Druckmaterial je Shirt nötig. Verwendbarer, nicht reservierter Bestand: 3 Kilogramm. Kein Ausschusszuschlag und keine offenen Lieferungen. **Erwartete Lösung:** Bruttobedarf 10 Kilogramm, zusätzlicher Bedarf 7 Kilogramm. Einheiten vor der Subtraktion angleichen.

**Aufgabe 2:** Ein Material bindet 60 Prozent des jährlichen Beschaffungswerts, macht aber nur 10 Prozent der betrachteten Mengeneinheiten aus. Was folgt daraus? **Lösungskriterium:** Hohe wertmäßige Bedeutung erläutern. Keine feste ABC-Klasse ohne vorgegebene Klassengrenzen behaupten und keine Aussage über regelmäßigen Verbrauch allein aus dem Wertanteil ableiten.

**Typischer Fehler:** Einen hohen Wertanteil als Nachweis eines gleichmäßigen Verbrauchs lesen. **Grundlage:** Büromanagement LF 4 K1; Bedarf für die eigene Veredelung und externe Serienfertigung getrennt halten.

#### IK-LF04-K02 · Wann und wie viel bestellen?

**Lehrplananker:** KMK S. 13, Bestellpunkt- und Bestellrhythmusverfahren, Bestellzeitpunkte und optimale Bestellmenge.

**Lernziele:** Du kannst (1) die beiden Bestellverfahren erklären, (2) einen Meldebestand mit klaren Annahmen ermitteln und (3) Bestell- und Lagerkosten bei der Wahl einer Menge berücksichtigen.

**Abschnitte:** A1: Bestellpunkt oder fester Rhythmus. A2: Verbrauch, Lieferzeit und Sicherheitsbestand. A3: Zielkonflikt zwischen Bestell- und Lagerkosten. A4: Optimale Menge und Grenzen des vereinfachten Modells.

**MAKEL-Fall:** MAKEL verbraucht regelmäßig Rohlinge und möchte unnötige Fehlbestände vermeiden.

**Aufgabe 1:** Tagesverbrauch 40 Stück, Lieferzeit fünf Arbeitstage, Sicherheitsbestand 100 Stück; gleichmäßiger Verbrauch und sichere Lieferzeit. **Erwartete Lösung:** Meldebestand 40 × 5 + 100 = 300 Stück. Der Sicherheitsbestand ist bereits enthalten.

**Aufgabe 2:** Jahresbedarf 10.000 Stück, Kosten je Bestellung 50 Euro und mengenproportionale jährliche Lagerkosten von 2 Euro je Stück. Im vereinfachten Modell gilt q* = √(2 × Jahresbedarf × Bestellkosten / jährliche Lagerkosten je Stück). **Erwartete Lösung:** √500.000 ≈ 707 Stück. Der ganzzahlige Vorschlag wird gerundet und die Modellannahmen werden genannt; keine allgemeine betriebliche Bestellvorgabe daraus machen.

**Typischer Fehler:** Lagerkosten je Stück mit einem Lagerkostensatz in Prozent verwechseln. **Grundlage:** Büromanagement LF 4 K1 und vorhandene Lagergrafik; Formel, Einheiten und Modellannahmen ausdrücklich ergänzen.

#### IK-LF04-K03 · Lieferanten und Bezugsquellen

**Lehrplananker:** KMK S. 13, regionale bis internationale Bezugsquellen, Anzahl der Lieferanten, digitale Beschaffung und fremdsprachige Anfrage.

**Lernziele:** Du kannst (1) geeignete Quellen für Lieferantendaten auswählen, (2) eine Beschaffungsstrategie anhand vorgegebener Kriterien vergleichen und (3) eine vollständige Anfrage formulieren.

**Abschnitte:** A1: Bezugsquellen recherchieren und Informationen prüfen. A2: Ein, zwei oder mehrere Lieferanten. A3: Regionale und internationale Risiken sowie digitale B2B-Beschaffung. A4: Anfrage mit technischen, zeitlichen und kaufmännischen Angaben.

**MAKEL-Fall:** Für einen Rohling kommen ein regionaler Anbieter und ein weiterer Lieferant im Ausland infrage.

**Aufgabe 1:** Vergleiche einen günstigeren Einlieferantenfall mit einem ausdrücklich vorgegebenen Zweilieferantenfall. **Lösungskriterium:** Abhängigkeit, Ausfallrisiko, Konditionen, Abstimmungsaufwand und tatsächlich genannte Lieferfähigkeit abwägen; keine Strategie generell für überlegen erklären.

**Aufgabe 2:** Entwirf eine kurze Anfrage auf Englisch. **Lösungskriterium:** Artikel und Spezifikation, Menge, gewünschter Termin, Lieferort und erbetene Preis- beziehungsweise Zahlungsbedingungen vollständig und verständlich benennen. Die Anfrage wird nicht als Bestellung formuliert.

**Typischer Fehler:** Die erste Suchmaschinenfundstelle als geprüften Lieferanten behandeln. **Grundlage:** Büromanagement LF 4 K2, LF 2 K6 und LF 7; internationale und digitale Beschaffung ergänzen.

#### IK-LF04-K04 · Angebote nachvollziehbar vergleichen

**Lehrplananker:** KMK S. 13, quantitativer und qualitativer Angebotsvergleich, Währungen, Wechselkursrisiko und Nachhaltigkeit.

**Lernziele:** Du kannst (1) vergleichbare Bezugspreise berechnen, (2) einen vorgegebenen Wechselkurs korrekt anwenden und (3) eine Nutzwertanalyse mit transparenter Gewichtung erstellen.

**Abschnitte:** A1: Angebote auf dieselbe Grundlage bringen. A2: Rabatt, Skonto und Bezugskosten. A3: Währungen und Kursrisiko. A4: Nutzwertanalyse sowie wirtschaftliche, ökologische und soziale Kriterien.

**MAKEL-Fall:** Zwei Anbieter unterscheiden sich in Preis, Transportkosten und Lieferzuverlässigkeit.

**Aufgabe 1:** Alle Beträge netto, keine Umsatzsteuerbetrachtung: A bietet 1.000 Euro Listenpreis, 10 Prozent Rabatt, 2 Prozent Skonto auf den rabattierten Warenwert und 40 Euro nicht skontierbare Bezugskosten. B bietet 930 Euro einschließlich Bezugskosten ohne weitere Abzüge. **Erwartete Lösung:** A: 1.000 × 0,90 × 0,98 + 40 = 922 Euro; A ist rein preislich 8 Euro günstiger. Daraus folgt noch keine vollständige Lieferantenentscheidung.

**Aufgabe 2:** Ein Angebot lautet auf 1.100 US-Dollar. Vorgegebener Aufgabenkurs: 1 Euro = 1,10 US-Dollar. Andere Kosten bleiben unberücksichtigt. **Erwartete Lösung:** 1.000 Euro; die Kurseinheit begründet die Division. Zusätzlich ein Kriterium nennen, das in einer Nutzwertanalyse über den Preis hinausgehen könnte.

**Typischer Fehler:** Bezugskosten ungeprüft rabattieren oder eine Notenskala in der Nutzwertanalyse umgekehrt verwenden. **Grundlage:** Büromanagement LF 4 K3; Währungsumrechnung und Nachhaltigkeitsbewertung ergänzen.

#### IK-LF04-K05 · Bestellung bis Rechnungsprüfung

**Lehrplananker:** KMK S. 13, Bestellung, Wareneingang, Protokolle, Rechnung und Zahlungsanweisung.

**Lernziele:** Du kannst (1) Bestell- und Lieferdaten abgleichen, (2) eine Rechnung anhand der Unterlagen rechnerisch und sachlich prüfen und (3) eine dokumentierte Freigabe oder Klärung veranlassen.

**Abschnitte:** A1: Bestellung eindeutig auslösen. A2: Wareneingang und Prüfprotokoll. A3: Bestellung, Lieferung und Rechnung vergleichen. A4: Abweichung klären und Zahlung freigeben.

**MAKEL-Fall:** Bestellmenge, tatsächlich angenommene Ware und Rechnung stimmen nicht vollständig überein.

**Aufgabe 1:** Bestellt sind 100 Stück zu netto 8 Euro; zunächst geliefert wurden 90 Stück, berechnet werden 100. **Lösungskriterium:** 100/90/100 als Abweichung dokumentieren, Netto-Warenwerte von 800 beziehungsweise 720 Euro unterscheiden und offene Teillieferung oder Rechnungsfehler klären. Ohne weitere Vertragsangaben ist „nur 720 Euro zahlen“ keine vollständig begründete rechtliche Lösung.

**Aufgabe 2:** Drei Unterlagen sind vorgegeben: Bestellung, Wareneingangsprotokoll und Rechnung. Bestimme, womit du Menge, vereinbarten Preis und Rechnungssumme prüfst. **Erwartete Lösung:** Menge mit Bestellung und tatsächlichem Eingang; Preis mit vereinbarten Konditionen; Summe durch nachvollziehbare Rechnung und passenden Belegabgleich.

**Typischer Fehler:** Eine rechnerisch richtige Rechnung automatisch sachlich freigeben. **Grundlage:** Büromanagement LF 3 K4/K5 und LF 4; industrielle Übergaben und dokumentierte Freigaben ergänzen.

#### IK-LF04-K06 · Lieferprobleme lösen und Einkauf verbessern

**Lehrplananker:** KMK S. 13, verspätete oder mangelhafte Lieferung, Mahnung und Mängelrüge sowie Bewertung des Beschaffungsprozesses.

**Lernziele:** Du kannst (1) eine Lieferstörung anhand von Belegen beschreiben, (2) rechtlich relevante Sachverhaltsangaben für die weitere Bearbeitung identifizieren und (3) Maßnahmen für eine zuverlässigere Versorgung begründen.

**Abschnitte:** A1: Lieferverzug und Schlechtleistung auseinanderhalten. A2: B2B-Prüfung und Dokumentation. A3: Sachliche Kommunikation und passende weitere Schritte. A4: Lieferantenbewertung und nachhaltige Verbesserung.

**MAKEL-Fall:** Eine Lieferung trifft verspätet ein; bei der Prüfung werden zusätzlich falsch ausgeführte Rohlinge entdeckt.

**Aufgabe 1:** Formuliere einen vollständigen Entwurf einer Mängelmitteilung mit vorgegebenen Belegangaben. **Lösungskriterium:** Bestellung und Lieferung eindeutig zuordnen, vereinbarte und tatsächliche Ausführung nennen, betroffene Menge und Entdeckungszeitpunkt dokumentieren sowie sachliche Klärung verlangen. Die zeitlichen und rechtlichen Voraussetzungen der Untersuchungs- und Rügepflicht werden vor der endgültigen Lösung am Gesetz geprüft.

**Aufgabe 2:** Von zehn bewerteten Lieferungen waren sieben termingerecht. Die Zielvorgabe lautet mindestens 90 Prozent. **Erwartete Lösung:** Istwert 70 Prozent, Abweichung 20 Prozentpunkte. Anschließend eine begründete Maßnahme nennen, etwa Ursachenklärung, realistische Terminabstimmung oder ergänzende Bezugsquelle, unter Beachtung möglicher Mehrkosten.

**Typischer Fehler:** Prozent und Prozentpunkte verwechseln oder jede Lieferstörung mit demselben Standardschreiben behandeln. **Grundlage:** Büromanagement LF 4 K5/K6; [§ 377 HGB](https://www.gesetze-im-internet.de/hgb/__377.html) und passende BGB-Regeln bei Redaktion vollständig prüfen.

### LF 5 · Acht Kapitel im Detail

**Gemeinsame Konvention für die nachfolgenden Übungsentwürfe:** Bei den Umsatzsteueraufgaben ist ein normal steuerpflichtiger inländischer Fall mit 19 Prozent Umsatzsteuer und vollem Vorsteuerabzug ausdrücklich vorgegeben. Es handelt sich um vereinfachte Aufgabendaten. Ausland, Steuerbefreiungen, Privatanteile und Sonderfälle werden nicht stillschweigend eingemischt. Eingekauftes Material wird zunächst auf einem Bestandskonto erfasst; der Verbrauch wird gesondert gebucht. Für die eigene Produktion werden Materialbestände und eigene fertige Erzeugnisse von Handelswaren getrennt. Der konkret zu verwendende Kontenplan ist vor der technischen Umsetzung zu prüfen.

#### IK-LF05-K01 · Warum MAKEL Bücher führt

**Lehrplananker:** KMK S. 14, Ziele und gesetzliche Grundlagen der Finanzbuchhaltung sowie Organisation und Dokumentation der Wertströme.

**Lernziele:** Du kannst (1) Zwecke und Nutzer der Buchführung erläutern, (2) Beleg, Inventur, Inventar und Bilanz unterscheiden und (3) eine einfache Bilanzgleichung anwenden.

**Abschnitte:** A1: Was die Buchführung abbildet. A2: Gesetzliche Verpflichtung und verantwortliche Dokumentation. A3: Von der Bestandsaufnahme zur Bilanz. A4: Vermögen, Schulden und Eigenkapital im Zusammenhang.

**MAKEL-Fall:** Für einen vereinfachten Betriebsausschnitt werden Bestände und Belege zusammengetragen; es handelt sich nicht um den vollständigen echten MAKEL-Jahresabschluss.

**Aufgabe 1:** Ein vollständig vorgegebener Mini-Fall enthält Materialbestand 500 Euro und Bankguthaben 4.500 Euro sowie Schulden 2.000 Euro. Weitere Bilanzpositionen gibt es in diesem Mini-Fall nicht. **Erwartete Lösung:** Vermögen 5.000 Euro, Eigenkapital 3.000 Euro; beide Bilanzseiten ergeben 5.000 Euro.

**Aufgabe 2:** Ordne „Bestände aufnehmen“, „ausführliches Bestandsverzeichnis erstellen“ und „Vermögen und Kapital verdichtet gegenüberstellen“ zu. **Erwartete Lösung:** Inventur, Inventar, Bilanz. Als passende Nachweise werden beispielsweise Zählprotokoll und Kontoauszug unterschieden.

**Typischer Fehler:** Inventur und Inventar als dieselbe Sache bezeichnen. **Grundlage:** Buchführung K1/K2; industrielle Bestände ergänzen und handelsrechtliche Grundlagen bei Inhaltsredaktion aktuell zuordnen.

#### IK-LF05-K02 · Bestandskonten und Buchungssätze

**Lehrplananker:** KMK S. 14, Bestandskonten und ordnungsgemäße Erfassung von Geschäftsfällen.

**Lernziele:** Du kannst (1) Aktiv- und Passivkonten unterscheiden, (2) Zu- und Abgänge auf der richtigen Kontoseite eintragen und (3) einen einfachen Buchungssatz samt Bilanzwirkung erklären.

**Abschnitte:** A1: Von der Bilanz zum Konto. A2: Soll und Haben bei Aktiv- und Passivkonten. A3: Geschäftsfälle schrittweise buchen. A4: Bilanzveränderungen und Kontrolle der Gleichheit.

**MAKEL-Fall:** MAKEL hebt Bargeld vom Bankkonto ab und begleicht später eine bereits gebuchte Lieferantenverbindlichkeit. Umsatzsteuer wird bei diesen Zahlungen nicht neu berechnet.

**Aufgabe 1:** 600 Euro werden vom betrieblichen Bankkonto abgehoben und in die Kasse gelegt. **Erwartete Lösung:** Kasse 600 Euro an Bank 600 Euro; Aktivtausch, keine Veränderung des Gewinns.

**Aufgabe 2:** Eine bereits gebuchte Lieferantenverbindlichkeit von 500 Euro wird ohne Skonto per Bank überwiesen. **Erwartete Lösung:** Verbindlichkeiten aus Lieferungen und Leistungen 500 Euro an Bank 500 Euro; Bilanzverkürzung, keine erneute Aufwandsbuchung.

**Typischer Fehler:** Soll mit positiv und Haben mit negativ gleichsetzen. **Grundlage:** Buchführung K2/K3 und vorhandene T-Konto-Darstellung.

#### IK-LF05-K03 · Aufwendungen, Erträge und Erfolg

**Lehrplananker:** KMK S. 14, Erfolgskonten und Auswirkungen von Wertströmen auf das Unternehmensergebnis.

**Lernziele:** Du kannst (1) Bestands- und Erfolgsvorgänge unterscheiden, (2) einfachen Aufwand und Ertrag buchen und (3) erklären, warum Geldzufluss und Gewinn nicht dasselbe sind.

**Abschnitte:** A1: Warum Erfolgskonten gebraucht werden. A2: Aufwand und Ertrag erfassen. A3: GuV und Eigenkapitalbezug. A4: Erfolg gegenüber Ein- und Auszahlung abgrenzen.

**MAKEL-Fall:** Für zwei getrennte Mini-Fälle sind vereinfachte Periodendaten beziehungsweise eine Zahlung auf eine alte Forderung gegeben.

**Aufgabe 1:** Die vollständig vorgegebenen Periodenerträge betragen 1.200 Euro und die Periodenaufwendungen 600 Euro. Weitere Erfolgsvorgänge gibt es in diesem Mini-Fall nicht. **Erwartete Lösung:** Gewinn 600 Euro; die Aufgabe erlaubt ohne zusätzliche Daten keine Aussage zum Bankguthaben.

**Aufgabe 2:** Ein Kunde bezahlt 1.000 Euro auf eine bereits gebuchte Forderung. **Erwartete Lösung:** Bank 1.000 Euro an Forderungen aus Lieferungen und Leistungen 1.000 Euro. Geldzugang ja, neuer Ertrag nein; der Ertrag wurde beim zugrunde liegenden Verkauf erfasst.

**Typischer Fehler:** Jede Kundenzahlung noch einmal als Umsatzerlös buchen. **Grundlage:** Buchführung K4, ergänzend Abgrenzungsgrundlagen aus Büromanagement LF 9/LF 10.

#### IK-LF05-K04 · Umsatzsteuer aus Belegen erfassen

**Lehrplananker:** KMK S. 14, Belege identifizieren und die rechtlichen Vorgaben der Umsatzbesteuerung bei der Erfassung berücksichtigen.

**Lernziele:** Du kannst (1) netto, Steuer und brutto unterscheiden, (2) Vorsteuer und Umsatzsteuer in eindeutigen Belegfällen zuordnen und (3) aus Brutto- oder Nettowerten die jeweils fehlenden Größen berechnen.

**Abschnitte:** A1: Nettowert, Steuer und Bruttowert. A2: Eingangsbeleg und Vorsteuer. A3: Ausgangsbeleg und Umsatzsteuer. A4: Belegkontrolle und Zusammenhang der Steuerkonten.

**MAKEL-Fall:** MAKEL bearbeitet je eine vollständig vorgegebene Eingangs- und Ausgangsrechnung unter der oben genannten Übungskonvention.

**Aufgabe 1:** Ein Materialeinkauf kostet netto 1.000 Euro bei vorgegebenen 19 Prozent Umsatzsteuer. **Erwartete Lösung:** Vorsteuer 190 Euro, Rechnungsbetrag 1.190 Euro. Buchung: Materialbestand 1.000 Euro und Vorsteuer 190 Euro an Verbindlichkeiten aus Lieferungen und Leistungen 1.190 Euro.

**Aufgabe 2:** Eine Verkaufsrechnung beträgt brutto 2.380 Euro einschließlich vorgegebener 19 Prozent Umsatzsteuer. **Erwartete Lösung:** Netto 2.000 Euro, Umsatzsteuer 380 Euro; 2.380 / 1,19 ist der richtige Ausgangsweg, nicht ein Abzug von 19 Prozent des Bruttobetrags.

**Typischer Fehler:** Beim Einkauf und Verkauf dasselbe Steuerkonto verwenden. **Grundlage:** Buchführung K6; Voraussetzungen des Vorsteuerabzugs und Rechnungsangaben vor der Inhaltsfreigabe anhand der einschlägigen UStG-Vorschriften prüfen.

#### IK-LF05-K05 · Materialeinkauf richtig buchen

**Lehrplananker:** KMK S. 14, Eingangsrechnungen, Bezugskosten, Preisnachlässe, Rücksendungen und Anschaffungskosten.

**Lernziele:** Du kannst (1) die Kosten eines Materialzugangs mit gegebenen Konditionen bestimmen, (2) einen Einkauf mit Steuer buchen und (3) eine Rücksendung auf Bestand, Verbindlichkeit und Steuer nachvollziehbar übertragen.

**Abschnitte:** A1: Materialarten und gewählte Buchungsmethode. A2: Preisnachlässe und zurechenbare Bezugskosten. A3: Zugang und Verbrauch als getrennte Vorgänge. A4: Rücksendungen und Berichtigungen.

**MAKEL-Fall:** MAKEL erhält Rohstoffe einschließlich vom selben Lieferanten berechneter Transportkosten. Die Aufgabe verwendet bewusst ein einfaches Bestandsbuchungsverfahren.

**Aufgabe 1:** Warenlistenwert netto 1.000 Euro, 10 Prozent Rabatt, zusätzlich netto 50 Euro zurechenbare Transportkosten vom selben Lieferanten; kein Skonto. **Erwartete Lösung:** Materialzugang 950 Euro, Vorsteuer 180,50 Euro, Verbindlichkeit 1.130,50 Euro. Buchung: Rohstoffe 950 Euro und Vorsteuer 180,50 Euro an Verbindlichkeiten aus Lieferungen und Leistungen 1.130,50 Euro.

**Aufgabe 2:** In einem getrennten Fall werden noch unbezahlte Rohstoffe im Nettowert von 100 Euro zurückgesendet; Gutschrift einschließlich 19 Prozent Steuer liegt vor. **Erwartete Lösung:** Verbindlichkeiten aus Lieferungen und Leistungen 119 Euro an Rohstoffe 100 Euro und Vorsteuer 19 Euro. Es geht um eine echte Warenrücksendung, nicht um eine zusätzliche Lieferung.

**Typischer Fehler:** Eingekauftes Material gleichzeitig voll als Bestand und erneut als sofortigen Verbrauch erfassen. **Grundlage:** Buchführung K5/K6; industrielle Kontenbezeichnungen und die Bestandsmethode explizit neu zuschneiden. Maßgebliche Bewertungsgrundlage: [§ 255 HGB](https://www.gesetze-im-internet.de/hgb/__255.html).

#### IK-LF05-K06 · Verkauf und Bestandsveränderungen

**Lehrplananker:** KMK S. 14, Ausgangsrechnungen, Erlösschmälerungen und Bestandsveränderungen erfassen.

**Lernziele:** Du kannst (1) eine Ausgangsrechnung mit Steuer buchen, (2) eigene Erzeugnisse von Handelswaren unterscheiden und (3) eine einfache Bestandserhöhung eigener Erzeugnisse erklären und buchen.

**Abschnitte:** A1: Verkauf und Forderungsentstehung. A2: Nachlässe und Rücksendungen aus Verkaufssicht. A3: Handelswaren gegenüber eigenen Erzeugnissen. A4: Bestandsänderung und Unternehmenserfolg im vereinfachten Gesamtkostenverfahren.

**MAKEL-Fall:** Für den Übungsfall sind von MAKEL selbst veredelte und als eigene Erzeugnisse behandelte Produkte ausdrücklich vorgegeben. Ihre Bewertung ist bereits geprüft und als Ausgangswert angegeben; eine rechtliche Einordnung beliebiger externer Serienfertigung wird daraus nicht abgeleitet.

**Aufgabe 1:** Verkauf eigener Erzeugnisse auf Ziel zu netto 2.000 Euro und 19 Prozent Umsatzsteuer. **Erwartete Lösung:** Forderungen aus Lieferungen und Leistungen 2.380 Euro an Umsatzerlöse 2.000 Euro und Umsatzsteuer 380 Euro. Bei der Rechnungserstellung entsteht noch kein Bankzugang.

**Aufgabe 2:** Ein gegebener, bereits korrekt bewerteter Fertigerzeugnisbestand steigt von 1.200 auf 1.500 Euro. **Erwartete Lösung:** Erhöhung 300 Euro; Fertige Erzeugnisse 300 Euro an Bestandsveränderungen 300 Euro. Die Bestandsänderung ist kein eigener Verkauf und löst in diesem Fall keine zusätzliche Umsatzsteuer aus.

**Typischer Fehler:** Jede Bestandsmehrung als verkaufte Menge behandeln oder Erzeugnisse mit beliebigen Verkaufspreisen bewerten. **Grundlage:** Buchführung K4/K5/K6; eigene Erzeugnisse und Bestandsveränderungen fachlich neu ausarbeiten. Herstellungskostenbewertung folgt vertieft in LF 10.

#### IK-LF05-K07 · Anlagegüter und planmäßige Abschreibung

**Lehrplananker:** KMK S. 14, Anschaffungskosten und planmäßige Wertminderung des Anlagevermögens.

**Lernziele:** Du kannst (1) zurechenbare Anschaffungskosten von vorgegebenen anderen Kosten unterscheiden, (2) eine lineare Abschreibung mit gegebener Nutzungsdauer ermitteln und (3) Aufwand und Buchwertentwicklung erklären.

**Abschnitte:** A1: Anlagegut oder Materialverbrauch? A2: Anschaffung und Betriebsbereitschaft. A3: Planmäßige Abschreibung mit gegebenen Parametern. A4: Buchung, Buchwert und Ergebniswirkung.

**MAKEL-Fall:** MAKEL kauft eine Veredelungsmaschine. Alle Beträge sind netto; voller Vorsteuerabzug ist vorgegeben. Eine steuerliche Nutzungsdauer wird nicht aus dem Produktnamen geraten.

**Aufgabe 1:** Maschinenpreis 10.000 Euro, zurechenbare Fracht 500 Euro, notwendige Montage zur Betriebsbereitschaft 500 Euro; keine Preisnachlässe. **Erwartete Lösung:** Anschaffungskosten 11.000 Euro. Abziehbare Vorsteuer wird bei diesen ausdrücklich vorgegebenen Voraussetzungen nicht Teil der Anschaffungskosten.

**Aufgabe 2:** Anschaffungskosten 11.000 Euro, fünf Jahre gegebene Nutzungsdauer, kein Restwert und Betriebsbereitschaft ab Jahresbeginn. Lineare Verteilung ist vorgegeben. **Erwartete Lösung:** Jährliche Abschreibung 2.200 Euro, Buchwert nach einem vollen Jahr 8.800 Euro. Buchung: Abschreibungen auf Sachanlagen 2.200 Euro an Maschinen 2.200 Euro.

**Typischer Fehler:** Abschreibung mit einer jährlichen Auszahlung verwechseln. **Grundlage:** Buchführung K8; [§ 255 HGB](https://www.gesetze-im-internet.de/hgb/__255.html) und [§ 253 HGB](https://www.gesetze-im-internet.de/hgb/__253.html). Zeitanteilige und andere Verfahren erst mit ausdrücklich festgelegter fachlicher Grundlage ergänzen.

#### IK-LF05-K08 · Bestände abstimmen und Ergebnisse erklären

**Lehrplananker:** KMK S. 14, tatsächliche Bestände mit Buchwerten vergleichen, Korrekturen durchführen und Ergebnisse der Finanzbuchhaltung beurteilen.

**Lernziele:** Du kannst (1) Buch- und Istbestand vergleichen, (2) eine belegte Ursache korrekt nachbuchen und (3) Erfolgsaussagen von Aussagen zur Zahlungsfähigkeit trennen.

**Abschnitte:** A1: Warum Buch und tatsächlicher Bestand abweichen können. A2: Unterlagen, Ursachen und belegbare Korrekturen. A3: Plausibilitätsprüfung und sorgfältige Dokumentation. A4: Ergebnis für unterschiedliche Adressaten erklären.

**MAKEL-Fall:** Ein Inventurvergleich zeigt eine Differenz, die sich durch einen noch nicht verbuchten Materialentnahmeschein erklären lässt.

**Aufgabe 1:** Buchbestand Rohstoffe 800 Euro, tatsächlicher Bestand 750 Euro. Ein überprüfter, bisher nicht verbuchter Entnahmeschein weist Rohstoffverbrauch von 50 Euro nach. **Erwartete Lösung:** Fehlende Verbrauchsbuchung über 50 Euro; Aufwendungen für Rohstoffe an Rohstoffe 50 Euro nach der vorgegebenen Bestandsmethode. Ohne den Nachweis dürfte die Ursache nicht einfach als Verbrauch unterstellt werden.

**Aufgabe 2:** Für einen getrennten Mini-Fall sind sämtliche Periodenerträge mit 6.000 Euro und sämtliche Periodenaufwendungen mit 5.200 Euro angegeben. Behauptung: „Damit muss MAKEL 800 Euro mehr auf dem Bankkonto haben.“ **Erwartete Lösung:** Gewinn 800 Euro; die Bankbehauptung folgt daraus nicht. Aufwendungen und Erträge können zeitlich von Zahlungen abweichen; Bestands- und Finanzierungsvorgänge sind zusätzlich zu betrachten.

**Typischer Fehler:** Eine Differenz ungeprüft ausbuchen, damit die Zahlen wieder passen. **Grundlage:** Buchführung K1–K4 und geeignete Abstimmungsfälle; Abschlussbewertung, Rückstellungen und Rechnungsabgrenzung bleiben in LF 10.

## 13. Gemeinsame Fälle, Grafiken und Redaktionsreihenfolge

### Zusammenhängende Fallpakete

| Fallpaket | Verwendete Kapitel | Gemeinsamer Nutzen |
|---|---|---|
| Einstieg bei MAKEL | LF 1 K1–K7, Projekt in LF 2 | Unternehmensverständnis, eigene Rolle und sinnvolle Zusammenarbeit. |
| Geschäftskundenauftrag | LF 3 K1–K7 | Von der unvollständigen Anfrage über Angebot und Lieferung bis zur Auswertung. |
| Rohlinge und Druckmaterial beschaffen | LF 4 K1–K6 | Mengenplanung, Angebotsvergleich, Dokumentation und Lieferantenbewertung. |
| Vom Materialzugang zum Erzeugnis | LF 5 K1–K8 | Einheitliche Beleg- und Kontenlogik; Produktion und Buchführung nachvollziehbar verbinden. |

Diese Pakete bilden eine gemeinsame Welt. Sie sind kein Zwang, Aufgaben in genau einer Reihenfolge zu lösen. Bei zufälliger Auswahl werden notwendige Ausgangsdaten erneut genannt; bei absichtlich mehrteiligen Fällen werden Abhängigkeiten und Zwischenwerte kenntlich gemacht.

### Vorhandene Darstellungen gezielt nutzen

| Inhalt | Geeignete vorhandene Darstellung | Noch zu prüfen |
|---|---|---|
| Organisation und Rolle | Organigramm, Vergleich, Prozessdarstellung | Konkrete MAKEL-Zuständigkeiten und EPK-Darstellung. |
| Kennzahlen | Vergleich und schrittweise Rechenerklärung | Die drei Kennzahlarten optisch sauber unterscheiden. |
| Projektplanung | Balkenplan mit Abhängigkeiten | Aufwand und Dauer getrennt darstellen. |
| Angebotskalkulation | Kalkulationsleiter | Bezugsgrößen und Rückwärtsrechnung. |
| Materialversorgung | Lagerkurve | Bestellpunkt und Rhythmus nicht in derselben Kurve vermischen. |
| Buchführung | T-Konto, Bilanzveränderung und Abschlusskette | Steuerkonten, industrielle Bestände und aktuelle Renderer-Möglichkeiten. |

Dies ist eine Auswahl fachlich passender Bestandteile, keine Zusage neuer technischer Funktionen. Umfang und tatsächliche Darstellung richten sich nach dem geprüften aktuellen System und dem didaktischen Bedarf.

### Vorgeschlagene Schreibreihenfolge innerhalb LF 1–5

1. Referenzkapitel LF 1 K3 und LF 5 K6: industrielle Wertschöpfung und eigene Erzeugnisse klären, bevor entsprechende Beispiele breit kopiert werden.
2. Die sieben Kapitel aus LF 1 und die vier Kapitel aus LF 2 ausarbeiten.
3. LF 3 und LF 4 parallel im fachlichen Sinn aufeinander abstimmen; bei der tatsächlichen Bearbeitung schreibt weiterhin jeweils nur eine KI gleichzeitig in denselben Projektbestand.
4. Die acht Buchführungskapitel mit der einheitlichen Bestandsmethode und geprüften Steuerfällen ausarbeiten.
5. Lernziele, Lehrplananker, Aufgabenrechnungen und Fallkonsistenz unabhängig gegenprüfen. Die Detailplanung für LF 6–13 liegt in Abschnitt 15 vor; die notwendigen Vorgriffe auf Kostenrechnung bei der Redaktion abstimmen.

Diese Reihenfolge betrifft die Redaktion. Die Lehrjahres- und Lernfeldzuordnung bleibt die des Rahmenlehrplans.

## 14. Konkrete offene Punkte vor Inhaltsfreigabe

| Punkt | Nötige Klärung | Stand |
|---|---|---|
| Rechtsfälle | Für jeden ausformulierten Fall einschlägige Vorschriften, Voraussetzungen und Rechtsfolge prüfen; insbesondere B2B-Kaufrecht, Rügepflicht, Verzug und Verjährung. | Für die endgültige Redaktion offen; die Aufgabenentwürfe vermeiden unbelegte pauschale Rechtsfolgen. |
| Industrielle Buchführung | Bestandsmethode und Kontenplan verbindlich abstimmen; Rohstoffe, Rohlinge, Handelswaren und eigene Erzeugnisse konsistent unterscheiden. | Didaktische Methode für die vorliegenden Beispiele festgelegt; technische Kontenzuordnung offen. |
| MAKEL-Stammdaten | Bestehende Personen, Konditionen und Kennzahlen vor Ergänzungen mit der aktuellen Stammdatei vergleichen. | Keine fiktiven Aufgabenwerte als Stammdaten übernommen. |
| Langfassungen | Je Abschnitt zwei tragfähige Beispiele und verständliche Herleitung ausformulieren; Umfang am vorhandenen Niveau orientieren. | Plan steht; Lerntexte noch zu schreiben. |
| Prüffähige Abdeckung | Pro Lernfeld die einzelnen Kompetenzpassagen gegen Lernziele und konkrete Inhalte abgleichen. | Nachvollziehbare Seiten- und Themenanker für alle 85 Kapitel vorhanden; vollständige unabhängige Prüfung offen. |
| Zugang und Lernstand | Berufsauswahl und getrennte Fortschrittskennungen anhand von 03-umsetzung-und-abnahme.md umsetzen. | In diesem Paket spezifiziert; Erstellung durch Claude ausstehend. |

**Zwischenstand des vorherigen Abschnitts:** Die 32 Kapitel aus LF 1–5 enthalten 96 Lernziele, 128 Abschnittsvorschläge und 64 Aufgabenentwürfe. Die vollständige Ergänzung für LF 6–13 folgt jetzt.


## 15. Feingliederung LF 6–13

Die Redaktionsregeln aus Abschnitt 12 gelten auch hier. Alle Zahlen sind eigenständige fiktive Aufgabendaten, keine Änderung der bestehenden MAKEL-Stammdaten. Für Modellrechnungen sind die jeweils genannten Annahmen zwingend. Quellenanker: KMK-Rahmenlehrplan, gedruckte Seiten 15–22. Die Gliederung ist eine eigene didaktische Ausarbeitung der Kompetenzziele.

### LF 6 · Produktion und Leistungserstellung

#### IK-LF06-K01 · Vom Kundenauftrag zum Produktionsprogramm

**Lehrplananker:** KMK S. 15, Kompetenzbezug: Auftragsanforderungen herausarbeiten; ergänzend Produktionsprogramm und einzelne Fertigungsaufträge unterscheiden und Bedarf und verfügbare Kapazität in Beziehung setzen.

**Lernziele:** Du kannst (1) Auftragsanforderungen herausarbeiten, (2) Produktionsprogramm und einzelne Fertigungsaufträge unterscheiden und (3) Bedarf und verfügbare Kapazität in Beziehung setzen.

**Abschnitte:** A1: Kundenbedarf und Spezifikation. A2: Breite, Tiefe und Mengen des Programms. A3: Auftragsdaten und Machbarkeit. A4: Abstimmung von Prioritäten und Lieferzusage.

**MAKEL-Fall:** MAKEL erhält einen größeren Veredelungsauftrag für eine Firmenveranstaltung.

**Aufgabe 1:** 400 Stück benötigen je 3 Minuten Maschinenzeit; Rüsten dauert 60 Minuten. Wie viel Zeit wird insgesamt benötigt? **Lösungskriterium:** 1.260 Minuten beziehungsweise 21 Maschinenstunden; Rüstzeit nur einmal für das vorgegebene Los berücksichtigen.

**Aufgabe 2:** Welche Angaben fehlen, wenn nur Menge und Lieferdatum bekannt sind? **Lösungskriterium:** Unter anderem Druckausführung, Größen, Materialverfügbarkeit und Freigabestatus; Anfrage an Produktion und Einkauf begründen.

**Typischer Fehler:** Auftragseingang bereits als gesicherte Lieferfähigkeit lesen. **Grundlage:** LF 3 und LF 11; Produktionsprogramm neu ausarbeiten.

#### IK-LF06-K02 · Wie Produkte gefertigt werden

**Lehrplananker:** KMK S. 15, Kompetenzbezug: Fertigungsformen anhand ihrer Merkmale unterscheiden; ergänzend Vor- und Nachteile für einen Auftrag abwägen und Digitalisierung, Nachhaltigkeit und Gesundheitsschutz einbeziehen.

**Lernziele:** Du kannst (1) Fertigungsformen anhand ihrer Merkmale unterscheiden, (2) Vor- und Nachteile für einen Auftrag abwägen und (3) Digitalisierung, Nachhaltigkeit und Gesundheitsschutz einbeziehen.

**Abschnitte:** A1: Einzel-, Serien- und Massenfertigung. A2: Werkstatt, Gruppe und Fluss. A3: Digitale Vernetzung und Informationen. A4: Wirtschaftliche und soziale Bewertung.

**MAKEL-Fall:** Eigene Muster und wiederkehrende Veredelungsaufträge werden einem ergänzenden Industriefall gegenübergestellt.

**Aufgabe 1:** Vergleiche ein individuelles Musterstück mit 1.000 identischen Druckaufträgen. **Lösungskriterium:** Einzelauftrag und Serie begründet unterscheiden; Stückzahl allein ersetzt nicht die Beschreibung des Produktionsablaufs.

**Aufgabe 2:** Ein neues Verfahren spart Transportwege, ist aber unflexibler. Welche Informationen braucht die Entscheidung? **Lösungskriterium:** Mengen, Varianten, Umrüstungen, Investition, Belastung und Energiebedarf; mindestens zwei Zielkonflikte erläutern.

**Typischer Fehler:** Fertigungsart und räumliche Organisationsform gleichsetzen. **Grundlage:** Überwiegend neu; vorhandene Prozessdarstellungen nutzen.

#### IK-LF06-K03 · Stücklisten und Arbeitspläne nutzen

**Lehrplananker:** KMK S. 15, Kompetenzbezug: Materialmengen aus einer Stückliste ableiten; ergänzend Arbeitsplan und Stückliste unterscheiden und Änderungsstände und Freigaben prüfen.

**Lernziele:** Du kannst (1) Materialmengen aus einer Stückliste ableiten, (2) Arbeitsplan und Stückliste unterscheiden und (3) Änderungsstände und Freigaben prüfen.

**Abschnitte:** A1: Materialstruktur und Varianten. A2: Mengen und Einheiten. A3: Arbeitsfolge, Zeiten und Betriebsmittel. A4: Freigabe und Datenqualität.

**MAKEL-Fall:** Ein als eigene Veredelung ausgewiesener MAKEL-Artikel benötigt Rohling, Druckmaterial und Verpackung.

**Aufgabe 1:** Ein Stück benötigt 20 Gramm Druckmaterial; produziert werden 250 Stück, ohne Ausschuss. Berechne den Bedarf. **Lösungskriterium:** 5 Kilogramm. Einheiten umrechnen; weder Verpackung noch fremde Stücklistenpositionen erfinden.

**Aufgabe 2:** Eine Stückliste nennt zwei Verpackungsvarianten ohne gültige Versionsangabe. Wie gehst du vor? **Lösungskriterium:** Gültige Variante und Freigabe klären; Arbeitsplan enthält Tätigkeiten, Stückliste Materialien. Nicht ungeprüft beide Varianten einsetzen.

**Typischer Fehler:** Zeiten aus dem Arbeitsplan als Materialmengen lesen. **Grundlage:** Neu; Übersichten und Tabellen des bestehenden Formats.

#### IK-LF06-K04 · Kapazitäten und Durchlaufzeiten planen

**Lehrplananker:** KMK S. 15, Kompetenzbezug: Kapazitätsbedarf berechnen; ergänzend Aufwand und Durchlaufzeit unterscheiden und Engpässe samt geeigneter Reaktion erläutern.

**Lernziele:** Du kannst (1) Kapazitätsbedarf berechnen, (2) Aufwand und Durchlaufzeit unterscheiden und (3) Engpässe samt geeigneter Reaktion erläutern.

**Abschnitte:** A1: Verfügbare und benötigte Kapazität. A2: Belegungs- und Terminplan. A3: Bearbeitung, Liegen, Transport und Prüfung. A4: Abweichungen und Handlungsmöglichkeiten.

**MAKEL-Fall:** Ein MAKEL-Auftrag belegt eine Maschine und durchläuft mehrere interne Stationen.

**Aufgabe 1:** Eine Maschine steht 8 Stunden bereit. Der Auftrag benötigt 9 Stunden. Berechne Auslastung und Überlast. **Lösungskriterium:** 112,5 Prozent geplante Auslastung und 1 Stunde Überlast; eine Lösung erfordert zusätzliche oder verschobene Kapazität.

**Aufgabe 2:** Bearbeitung 90, Liegen 120, Transport 15 und Prüfung 15 Minuten; alles läuft nacheinander. Wie lang ist die Durchlaufzeit? **Lösungskriterium:** 240 Minuten beziehungsweise 4 Stunden. Die reine Bearbeitungszeit beträgt nur 90 Minuten.

**Typischer Fehler:** Liegezeit als Maschinenbearbeitung zählen. **Grundlage:** Vorhandene Durchlaufzeit- und Balkenplangrafiken; Produktionsbezug ergänzen.

#### IK-LF06-K05 · Die passende Losgröße bestimmen

**Lehrplananker:** KMK S. 15, Kompetenzbezug: Rüst- und Lagerkostenzusammenhang erklären; ergänzend Eine Losgröße unter angegebenen Modellannahmen berechnen und Ein rechnerisches Ergebnis betrieblich einordnen.

**Lernziele:** Du kannst (1) Rüst- und Lagerkostenzusammenhang erklären, (2) Eine Losgröße unter angegebenen Modellannahmen berechnen und (3) Ein rechnerisches Ergebnis betrieblich einordnen.

**Abschnitte:** A1: Los und Rüstvorgang. A2: Kostenkonflikt und Durchschnittsbestand. A3: Vereinfachtes Losgrößenmodell. A4: Grenzen durch Termine und Ressourcen.

**MAKEL-Fall:** MAKEL entscheidet über die Bündelung gleichartiger Veredelungsaufträge.

**Aufgabe 1:** Im vereinfachten Modell mit sofortiger Losbereitstellung gelten Jahresbedarf D=10.000 Stück, Rüstkosten S=50 Euro und jährliche Lagerkosten h=2 Euro je Stück. Nutze q*=√(2DS/h). **Lösungskriterium:** q*≈707 Stück. Modell und Einheit benennen; keine automatische Übertragung auf das Produktionsmodell mit endlicher Zuflussrate.

**Aufgabe 2:** Ein Kunde benötigt bereits morgen 200 Stück. Darf die rechnerische Losgröße den Liefertermin ersetzen? **Lösungskriterium:** Nein. Termin, Kapazität, Lager und verfügbare Auftragsmenge müssen zusätzlich geprüft werden; mögliche Teilproduktion begründen.

**Typischer Fehler:** Optimale Bestellmenge und jedes Fertigungslos ohne Modellprüfung gleichsetzen. **Grundlage:** LF 4 als Vorwissen; Produktionsannahmen neu präzisieren.

#### IK-LF06-K06 · Qualität sichern und Störungen bearbeiten

**Lehrplananker:** KMK S. 15, Kompetenzbezug: Qualitätsanforderungen überprüfbar beschreiben; ergänzend Abweichungen anhand von Daten erkennen und Maßnahmen mit zuständigen Schnittstellen abstimmen.

**Lernziele:** Du kannst (1) Qualitätsanforderungen überprüfbar beschreiben, (2) Abweichungen anhand von Daten erkennen und (3) Maßnahmen mit zuständigen Schnittstellen abstimmen.

**Abschnitte:** A1: Prüfkriterien und Prüfzeitpunkt. A2: Soll-Ist-Abgleich bei Menge, Zeit und Kosten. A3: Störung, Ursache und Dokumentation. A4: Korrektur und Nachkontrolle.

**MAKEL-Fall:** Ein Teil einer MAKEL-Druckserie entspricht nicht dem freigegebenen Motiv.

**Aufgabe 1:** Bei 500 geprüften Teilen sind 20 fehlerhaft. Berechne Fehlerquote und einwandfreie Menge. **Lösungskriterium:** 4 Prozent Fehlerquote; 480 einwandfreie Teile. Ob die fehlerhaften Teile nacharbeitbar sind, ist noch nicht bekannt.

**Aufgabe 2:** Nenne eine Sofortmaßnahme und eine vorbeugende Maßnahme bei wiederkehrendem Motivfehler. **Lösungskriterium:** Zum Beispiel betroffene Ware kennzeichnen und Prozess stoppen beziehungsweise Freigabeversion verbindlich prüfen; Zuständigkeit und Wirksamkeitskontrolle angeben.

**Typischer Fehler:** Fehlerquote ohne geklärte Stichprobe als gesicherte Quote aller Lieferungen ausgeben. **Grundlage:** LF 3/LF 4 zu Reklamationen; Produktionskontrolle neu.

#### IK-LF06-K07 · Produktion wirtschaftlicher gestalten

**Lehrplananker:** KMK S. 15, Kompetenzbezug: Einfache Kostenverläufe und Gewinnschwelle erklären; ergänzend Eigenfertigung und Fremdbezug mit gleichen Leistungsgrenzen vergleichen und Quantitative und qualitative Kriterien verbinden.

**Lernziele:** Du kannst (1) Einfache Kostenverläufe und Gewinnschwelle erklären, (2) Eigenfertigung und Fremdbezug mit gleichen Leistungsgrenzen vergleichen und (3) Quantitative und qualitative Kriterien verbinden.

**Abschnitte:** A1: Rationalisierung und Kennzahlen. A2: Fixe und variable Kosten als Vorgriff. A3: Gewinnschwelle und Mengenvergleich. A4: Make-or-buy und begründete Empfehlung.

**MAKEL-Fall:** MAKEL prüft eine zusätzliche eigene Veredelungskapazität gegenüber Fremdvergabe.

**Aufgabe 1:** Monatlich fixe Kosten 2.000 Euro, Preis 30 Euro und variable Kosten 20 Euro je Stück. Berechne die Gewinnschwelle. **Lösungskriterium:** 200 Stück bei vollständigem Absatz und den gegebenen linearen Annahmen; an der Grenze ist das Ergebnis null.

**Aufgabe 2:** Eigenfertigung kostet 1.000 Euro fix plus 8 Euro je Stück, Fremdbezug 12 Euro je Stück ohne Zusatzkosten. Bestimme die Kostenindifferenz. **Lösungskriterium:** 250 Stück. Oberhalb ist Eigenfertigung rein rechnerisch günstiger; Qualität, Risiko und Kapazität zusätzlich prüfen.

**Typischer Fehler:** Verrechnete fixe Kosten automatisch als kurzfristig vermeidbar ansehen. **Grundlage:** LF 10 im Büromanagement; systematische Vertiefung erst neues LF 8.

### LF 7 · Logistik und Lager

#### IK-LF07-K01 · Material und Informationen gemeinsam steuern

**Lehrplananker:** KMK S. 16, Kompetenzbezug: Logistische Teilaufgaben zuordnen; ergänzend Material- und Informationsfluss verbinden und Ein Logistikkonzept anhand eines Auftrags analysieren.

**Lernziele:** Du kannst (1) Logistische Teilaufgaben zuordnen, (2) Material- und Informationsfluss verbinden und (3) Ein Logistikkonzept anhand eines Auftrags analysieren.

**Abschnitte:** A1: Ziele und Objekte der Logistik. A2: Transport, Umschlag und Lagerung. A3: Materialfluss und Begleitinformationen. A4: Schnittstellen und Logistikkonzept.

**MAKEL-Fall:** Ein Lieferant meldet den Versand von Rohlingen; MAKEL muss Material und Daten passend zusammenführen.

**Aufgabe 1:** Ordne Lkw-Fahrt, Umladen und Aufbewahren den drei Teilaufgaben zu. **Lösungskriterium:** Transport, Umschlag, Lagerung; dieselbe Lieferung kann alle drei Aufgaben nacheinander auslösen.

**Aufgabe 2:** Die Versandmeldung nennt 100 Kartons, tatsächlich kommen 90 an. Welche Daten werden geprüft und weitergegeben? **Lösungskriterium:** Liefermeldung, tatsächlicher Eingang, Auftragszuordnung und Mengenabweichung dokumentieren; Einkauf und betroffene Produktion informieren.

**Typischer Fehler:** Einen digitalen Status als Nachweis der tatsächlich vorhandenen Ware behandeln. **Grundlage:** LF 4/LF 11; Logistikkonzept neu.

#### IK-LF07-K02 · Lager gestalten und Aufträge kommissionieren

**Lehrplananker:** KMK S. 16, Kompetenzbezug: Lagersysteme anhand von Anforderungen vergleichen; ergänzend Kommissioniermethoden unterscheiden und Eine geeignete Organisation begründen.

**Lernziele:** Du kannst (1) Lagersysteme anhand von Anforderungen vergleichen, (2) Kommissioniermethoden unterscheiden und (3) Eine geeignete Organisation begründen.

**Abschnitte:** A1: Lagerzweck und Artikelstruktur. A2: Lagersysteme und Einrichtungen. A3: Kommissionierablauf. A4: Fehlervermeidung und Kennzeichnung.

**MAKEL-Fall:** MAKEL lagert Rohlinge mit Größen- und Farbvarianten sowie fertige Aufträge.

**Aufgabe 1:** 120 Positionen werden in 6 Stunden kommissioniert. Berechne die Positionen je Stunde. **Lösungskriterium:** 20 Positionen je Stunde. Auftrag, Stück und Position sind nicht automatisch identisch.

**Aufgabe 2:** Vergleiche feste und dynamische Lagerplätze bei häufig wechselnden Varianten. **Lösungskriterium:** Auffindbarkeit, Flächennutzung, Buchungsdisziplin und Systemunterstützung abwägen; eine konkrete Empfehlung mit Voraussetzungen geben.

**Typischer Fehler:** Hohe Flächenauslastung stets als beste Lagerorganisation bewerten. **Grundlage:** Bestandsgrundlagen LF 4; Lagerorganisation neu.

#### IK-LF07-K03 · Transportmittel und Dienstleister auswählen

**Lehrplananker:** KMK S. 16, Kompetenzbezug: Transportmittel hinsichtlich der Anforderungen vergleichen; ergänzend Kosten auf gleicher Basis gegenüberstellen und Sicherheit, Nachhaltigkeit und Vernetzung berücksichtigen.

**Lernziele:** Du kannst (1) Transportmittel hinsichtlich der Anforderungen vergleichen, (2) Kosten auf gleicher Basis gegenüberstellen und (3) Sicherheit, Nachhaltigkeit und Vernetzung berücksichtigen.

**Abschnitte:** A1: Innerbetriebliche und autonome Systeme. A2: Externe und multimodale Transporte. A3: Dienstleister- und Kostenvergleich. A4: Sicherer und ressourcenschonender Einsatz.

**MAKEL-Fall:** MAKEL vergleicht Versandangebote für eine termingebundene Lieferung.

**Aufgabe 1:** A berechnet 200 Euro Grundpreis plus 2 Euro je Packstück, B 50 Euro plus 4 Euro je Packstück. Vergleiche 100 Packstücke ohne Zusatzkosten. **Lösungskriterium:** A: 400 Euro, B: 450 Euro; A ist 50 Euro günstiger. Identischen Leistungsumfang voraussetzen.

**Aufgabe 2:** Welche zusätzlichen Kriterien sind bei einem Gefahrstofftransport zu prüfen? **Lösungskriterium:** Stoffklassifikation, zulässige Verpackung, Kennzeichnung, Dokumente und Eignung des Dienstleisters anhand aktueller Fachvorschriften prüfen; keine konkrete Transportfreigabe aus dem Preis ableiten.

**Typischer Fehler:** Schnellstes Angebot ohne Blick auf geforderte Leistung und Sicherheit wählen. **Grundlage:** Kalkulation aus LF 4; Transport- und Gefahrstoffwissen neu.

#### IK-LF07-K04 · Lieferketten abstimmen

**Lehrplananker:** KMK S. 16, Kompetenzbezug: Push und Pull erklären; ergänzend Lieferkettenübergreifende Abhängigkeiten erkennen und Maßnahmen digital nachvollziehbar koordinieren.

**Lernziele:** Du kannst (1) Push und Pull erklären, (2) Lieferkettenübergreifende Abhängigkeiten erkennen und (3) Maßnahmen digital nachvollziehbar koordinieren.

**Abschnitte:** A1: Supply-Chain-Management. A2: Push und Pull. A3: Informationen und Begleitdokumente. A4: Abstimmung mit Produktion und Dienstleistern.

**MAKEL-Fall:** MAKEL passt Nachschub und Versand an schwankende Kundenabrufe an.

**Aufgabe 1:** Vergleiche Produktion auf Prognose mit Nachschub auf einen tatsächlich gemeldeten Verbrauch. **Lösungskriterium:** Push- beziehungsweise Pull-Prinzip begründet zuordnen; echte Abläufe können Mischformen enthalten.

**Aufgabe 2:** Ein Lieferverzug betrifft einen zugesagten Kundenauftrag. Plane die Informationskette. **Lösungskriterium:** Auswirkung auf Bestand, Produktion und Versand prüfen; Einkauf, Produktionsplanung und Vertrieb mit belastbaren Statusdaten koordinieren, Kundeninformation zuständig freigeben.

**Typischer Fehler:** Eine lokale Lageroptimierung ohne Auswirkung auf die gesamte Lieferkette beurteilen. **Grundlage:** LF 3/LF 4/LF 11; SCM neu.

#### IK-LF07-K05 · Logistik messen und verbessern

**Lehrplananker:** KMK S. 16, Kompetenzbezug: Lagerkennzahlen mit passenden Bezugsgrößen berechnen; ergänzend Kosten und Ressourcen gemeinsam bewerten und Eine Verbesserung samt Kontrolle formulieren.

**Lernziele:** Du kannst (1) Lagerkennzahlen mit passenden Bezugsgrößen berechnen, (2) Kosten und Ressourcen gemeinsam bewerten und (3) Eine Verbesserung samt Kontrolle formulieren.

**Abschnitte:** A1: Kennzahlen und Datenbasis. A2: Kosten, Energie und Umwelt. A3: Entsorgung, Sicherheit und Daten. A4: Konzeptbewertung und Verbesserungszyklus.

**MAKEL-Fall:** MAKEL prüft Kapitalbindung und Reichweite eines Rohstofflagers.

**Aufgabe 1:** Materialverbrauch im Jahr 120.000 Euro, durchschnittlicher gleichartig bewerteter Lagerbestand 20.000 Euro. Berechne Umschlag und Dauer bei ausdrücklich vorgegebenen 360 Tagen. **Lösungskriterium:** Umschlag 6 pro Jahr; durchschnittliche Lagerdauer 60 Tage. Keine Umsatzerlöse statt Materialverbrauch einsetzen.

**Aufgabe 2:** Eine kleinere Verpackung spart Material, verursacht aber mehr Transportschäden. Wie wird die Maßnahme bewertet? **Lösungskriterium:** Materialeinsparung, Schadenquote, Ersatztransporte, Kosten und Kundenwirkung gemeinsam vergleichen; Messzeitraum und Zielgröße nennen.

**Typischer Fehler:** Weniger Verpackungsmaterial ohne Gesamtwirkung als automatisch nachhaltig bezeichnen. **Grundlage:** LF 4 und LF 11; Logistikkennzahlen vertiefen.

### LF 8 · Kostenrechnung und Entscheidungen

#### IK-LF08-K01 · Von der Buchführung zur Kostenrechnung

**Lehrplananker:** KMK S. 17, Kompetenzbezug: Zwecke beider Rechnungsbereiche unterscheiden; ergänzend Aufwendungen und Erträge sachgerecht abgrenzen und Kosten und Leistungen aus gegebenen Ausgangsdaten ableiten.

**Lernziele:** Du kannst (1) Zwecke beider Rechnungsbereiche unterscheiden, (2) Aufwendungen und Erträge sachgerecht abgrenzen und (3) Kosten und Leistungen aus gegebenen Ausgangsdaten ableiten.

**Abschnitte:** A1: Adressaten und Zwecke. A2: Grundbegriffe. A3: Sachliche Abgrenzung. A4: Überleitung und Interpretation.

**MAKEL-Fall:** MAKEL überführt eine vereinfachte Periodenrechnung in eine Betriebsergebnisrechnung.

**Aufgabe 1:** Aufwand 50.000 Euro, davon 5.000 Euro vorgegebener neutraler Aufwand; zusätzlich 2.000 Euro ausdrücklich vorgegebene kalkulatorische Zusatzkosten. Weitere Abgrenzungen fehlen. Berechne die Kosten. **Lösungskriterium:** 47.000 Euro: 50.000 − 5.000 + 2.000. Zusatzkosten nicht nochmals im Aufwand suchen.

**Aufgabe 2:** Warum können bilanzieller Gewinn und Betriebsergebnis voneinander abweichen? **Lösungskriterium:** Unterschiedliche Zwecke und Abgrenzungen erklären; ein passendes Beispiel für neutralen Aufwand oder kalkulatorische Kosten geben.

**Typischer Fehler:** Alle Auszahlungen automatisch als Kosten behandeln. **Grundlage:** Büromanagement LF 10 K1; neue industrielle Daten.

#### IK-LF08-K02 · Kostenarten richtig einordnen

**Lehrplananker:** KMK S. 17, Kompetenzbezug: Kosten nach Zurechenbarkeit unterscheiden; ergänzend Fixe und variable Kosten voneinander abgrenzen und Bezugsobjekt und Zeitraum ausdrücklich berücksichtigen.

**Lernziele:** Du kannst (1) Kosten nach Zurechenbarkeit unterscheiden, (2) Fixe und variable Kosten voneinander abgrenzen und (3) Bezugsobjekt und Zeitraum ausdrücklich berücksichtigen.

**Abschnitte:** A1: Kostenarten und Bezugsobjekt. A2: Einzel- und Gemeinkosten. A3: Fixe und variable Kosten. A4: Mischungen und Entscheidungsbezug.

**MAKEL-Fall:** MAKEL untersucht Material, Hallenmiete und Energiekosten der Veredelung.

**Aufgabe 1:** 8.000 Euro fixe und 4 Euro variable Stückkosten bei 1.000 Stück. Ermittle Gesamt- und Stückkosten. **Lösungskriterium:** 12.000 Euro und 12 Euro je Stück. Die variablen Stückkosten bleiben 4 Euro.

**Aufgabe 2:** Sind Einzelkosten immer variabel und Gemeinkosten immer fix? **Lösungskriterium:** Nein. Zurechenbarkeit und Mengenabhängigkeit sind unterschiedliche Einteilungskriterien; am vorgegebenen Bezugsobjekt erläutern.

**Typischer Fehler:** Einzel-/Gemeinkosten mit fix/variabel gleichsetzen. **Grundlage:** Büromanagement LF 10 K2.

#### IK-LF08-K03 · Kosten auf Kostenstellen verteilen

**Lehrplananker:** KMK S. 17, Kompetenzbezug: Verteilungsschlüssel anwenden; ergänzend Hilfs- und Hauptkostenstellen unterscheiden und Mehrstufige Umlagen nachvollziehbar prüfen.

**Lernziele:** Du kannst (1) Verteilungsschlüssel anwenden, (2) Hilfs- und Hauptkostenstellen unterscheiden und (3) Mehrstufige Umlagen nachvollziehbar prüfen.

**Abschnitte:** A1: Kostenstellen und BAB. A2: Primäre Verteilung. A3: Innerbetriebliche Leistungsverrechnung. A4: Kontrolle und Zuschlagsgrundlagen.

**MAKEL-Fall:** MAKEL verteilt Raumkosten und Leistungen einer Hilfskostenstelle.

**Aufgabe 1:** 10.000 Euro Raumkosten auf 100 und 300 Quadratmeter verteilen; Gesamtfläche 400 Quadratmeter. **Lösungskriterium:** 2.500 und 7.500 Euro. Verteilungssumme bleibt 10.000 Euro.

**Aufgabe 2:** Die Hilfskostenstelle wird vollständig auf Hauptkostenstellen umgelegt. Warum darf ihr Betrag nicht zusätzlich nochmals als Gesamtgemeinkosten addiert werden? **Lösungskriterium:** Sonst Doppelzählung. Verrechnung verändert die Zuordnung, nicht ohne Weiteres die insgesamt entstandenen Kosten; Leistungsbeziehungen und gewählte Methode nennen.

**Typischer Fehler:** Umlagebeträge als zusätzlich entstandene Kosten zählen. **Grundlage:** Büromanagement LF 10 K3; Mehrstufigkeit ergänzen.

#### IK-LF08-K04 · Maschinenstunden kalkulieren

**Lehrplananker:** KMK S. 17, Kompetenzbezug: Maschinenabhängige Kosten identifizieren; ergänzend Stundensatz mit gegebener Beschäftigung bestimmen und Maschinenzeiten in Auftragskosten übersetzen.

**Lernziele:** Du kannst (1) Maschinenabhängige Kosten identifizieren, (2) Stundensatz mit gegebener Beschäftigung bestimmen und (3) Maschinenzeiten in Auftragskosten übersetzen.

**Abschnitte:** A1: Maschinenkosten und Abgrenzung. A2: Planstunden und Auslastung. A3: Stundensatz. A4: Auftragsanwendung und Grenzen.

**MAKEL-Fall:** MAKEL kalkuliert eine Druckmaschine mit vorgegebenen Jahreskosten.

**Aufgabe 1:** Jährlich zurechenbare Maschinenkosten 48.000 Euro, geplante produktive Maschinenstunden 1.200. Berechne den Satz. **Lösungskriterium:** 40 Euro je Maschinenstunde. Nur die angegebenen produktiven Stunden verwenden.

**Aufgabe 2:** Ein Auftrag benötigt 2,5 Stunden einschließlich des ausdrücklich in diesen 2,5 Stunden enthaltenen Rüstens. Berechne die Maschinenkosten bei 40 Euro/Stunde. **Lösungskriterium:** 100 Euro; Rüstzeit nicht nochmals addieren. Andere Kosten nur berücksichtigen, wenn die Aufgabe sie angibt.

**Typischer Fehler:** Kalenderstunden oder verfügbare Stunden mit produktiven Planstunden verwechseln. **Grundlage:** Büromanagement LF 10; industrielle Vertiefung neu.

#### IK-LF08-K05 · Produkte auf Vollkostenbasis kalkulieren

**Lehrplananker:** KMK S. 17, Kompetenzbezug: Kostenarten, Stellen und Träger verbinden; ergänzend Selbstkosten aus gegebenen Sätzen ableiten und Ist-, Normal- und Planwerte unterscheiden.

**Lernziele:** Du kannst (1) Kostenarten, Stellen und Träger verbinden, (2) Selbstkosten aus gegebenen Sätzen ableiten und (3) Ist-, Normal- und Planwerte unterscheiden.

**Abschnitte:** A1: Kostenträger und Kalkulationsschema. A2: Herstell- und Selbstkosten. A3: Ist-/Normal-/Plankosten. A4: Abweichung und Aussagegrenze.

**MAKEL-Fall:** MAKEL ermittelt die Vollkosten eines vorgegebenen Veredelungsauftrags.

**Aufgabe 1:** Materialeinzelkosten 100 Euro, Materialgemeinkosten 10 Prozent darauf; Fertigungseinzelkosten 80 Euro, Fertigungsgemeinkosten 50 Prozent darauf. Verwaltung und Vertrieb zusammen 10 Prozent der so berechneten Herstellkosten; weitere Positionen fehlen. **Lösungskriterium:** Herstellkosten 230 Euro; Verwaltung und Vertrieb 23 Euro; Selbstkosten 253 Euro. Kein Gewinn enthalten.

**Aufgabe 2:** Warum dürfen gegebene Normalzuschläge nicht kommentarlos als tatsächlich entstandene Istkosten bezeichnet werden? **Lösungskriterium:** Bezugszeitraum und Planungs-/Verrechnungszweck unterscheiden; Abweichungen gesondert beurteilen.

**Typischer Fehler:** Zuschlagssätze auf eine falsche Basis anwenden. **Grundlage:** Büromanagement LF 10 K4; Maschinen- und Planbezug ergänzen.

#### IK-LF08-K06 · Deckungsbeiträge und Preisuntergrenzen

**Lehrplananker:** KMK S. 17, Kompetenzbezug: Deckungsbeiträge berechnen; ergänzend Kurzfristige Zusatzaufträge mit freier Kapazität beurteilen und Vollkosten- und Teilkostenaussagen unterscheiden.

**Lernziele:** Du kannst (1) Deckungsbeiträge berechnen, (2) Kurzfristige Zusatzaufträge mit freier Kapazität beurteilen und (3) Vollkosten- und Teilkostenaussagen unterscheiden.

**Abschnitte:** A1: Teilkosten und Deckungsbeitrag. A2: Fixkostendeckung. A3: Preisuntergrenzen unter Annahmen. A4: Zusatzauftrag und Nebenbedingungen.

**MAKEL-Fall:** MAKEL erhält einen Zusatzauftrag bei ausdrücklich freier Kapazität.

**Aufgabe 1:** Preis netto 30 Euro, variable Stückkosten 18 Euro, Absatz 200 Stück; zusätzliche fixe Periodenkosten 1.000 Euro. Berechne DB und Ergebnis des vereinfachten Falls. **Lösungskriterium:** Stück-DB 12 Euro, Gesamt-DB 2.400 Euro, Ergebnis 1.400 Euro.

**Aufgabe 2:** 100 Zusatzstücke zu 20 Euro bei variablen Stückkosten 18 Euro; keine neuen fixen Kosten, keine Verdrängung und kein sonstiger Effekt. Beurteile den rechnerischen Zusatzbeitrag. **Lösungskriterium:** 200 Euro positiver Zusatzbeitrag; Markt-, Qualitäts- und Kapazitätsannahmen ausdrücklich nennen, keine generelle Preispolitik daraus ableiten.

**Typischer Fehler:** Positive Deckungsbeiträge schon als vollständigen Unternehmensgewinn lesen. **Grundlage:** Büromanagement LF 10 K5/K6.

#### IK-LF08-K07 · Engpässe und Zielkonflikte beurteilen

**Lehrplananker:** KMK S. 17, Kompetenzbezug: Relativen Deckungsbeitrag bestimmen; ergänzend Ein Produktionsprogramm bei einem Engpass ableiten und Quantitative und qualitative Ziele abwägen.

**Lernziele:** Du kannst (1) Relativen Deckungsbeitrag bestimmen, (2) Ein Produktionsprogramm bei einem Engpass ableiten und (3) Quantitative und qualitative Ziele abwägen.

**Abschnitte:** A1: Engpass und Restriktionen. A2: DB je Engpasseinheit. A3: Produktionsprogramm. A4: Zielkonflikte und Robustheit.

**MAKEL-Fall:** Zwei MAKEL-Produkte konkurrieren um 60 Maschinenminuten.

**Aufgabe 1:** A: DB 12 Euro, Bedarf 6 Minuten; B: DB 10 Euro, Bedarf 2 Minuten. Rangfolge nach relativem DB? **Lösungskriterium:** A: 2 Euro/Minute; B: 5 Euro/Minute. Bei sonst gleichen Voraussetzungen zuerst B.

**Aufgabe 2:** Es gibt 60 freie Minuten, höchstens 20 B und ausreichend Nachfrage nach A. Beide Produkte nur ganzzahlig, keine Rüstzeiten. Bestimme das Programm. **Lösungskriterium:** 20 B benötigen 40 Minuten; anschließend 3 A benötigen 18 Minuten. 2 Minuten bleiben frei; Gesamt-DB 236 Euro. Bestehende Lieferpflichten wären zusätzlich zu prüfen.

**Typischer Fehler:** Nach absolutem Stück-DB priorisieren, obwohl Maschinenzeit knapp ist. **Grundlage:** Büromanagement LF 10 K6; Engpassrechnung vertiefen.

#### IK-LF08-K08 · Investitionen rechnerisch vergleichen

**Lehrplananker:** KMK S. 17, Kompetenzbezug: Statische Investitionsverfahren anwenden; ergänzend Gewinn, Zahlungsrückfluss und Kapitaleinsatz unterscheiden und Verfahrensgrenzen erläutern.

**Lernziele:** Du kannst (1) Statische Investitionsverfahren anwenden, (2) Gewinn, Zahlungsrückfluss und Kapitaleinsatz unterscheiden und (3) Verfahrensgrenzen erläutern.

**Abschnitte:** A1: Kosten- und Gewinnvergleich. A2: Rentabilitätsvergleich. A3: Statische Amortisation. A4: Qualitative Kriterien und Unsicherheit.

**MAKEL-Fall:** MAKEL vergleicht zwei Veredelungsmaschinen mit ausdrücklich vergleichbaren Leistungen.

**Aufgabe 1:** Investition 20.000 Euro, durchschnittlicher jährlicher Zahlungsüberschuss 5.000 Euro, kein Restwert und keine Veränderung. Berechne die statische Amortisationsdauer. **Lösungskriterium:** 4 Jahre; Zahlungsüberschuss, nicht ein beliebiger Gewinnwert, steht im Nenner.

**Aufgabe 2:** Warum kann die kürzere Amortisationszeit allein keine vollständige Investitionsentscheidung liefern? **Lösungskriterium:** Zum Beispiel unterschiedliche Nutzungsdauern, Gesamtüberschüsse, Qualität und Risiko sowie fehlende Abzinsung der statischen Verfahren nennen.

**Typischer Fehler:** Abschreibung mit Auszahlung oder Gewinn mit Rückfluss gleichsetzen. **Grundlage:** Büromanagement LF 9 K6 und LF 10; Verfahren abgrenzen.

### LF 9 · Marketing und internationale Vermarktung

#### IK-LF09-K01 · Märkte und Zielgruppen untersuchen

**Lehrplananker:** KMK S. 18, Kompetenzbezug: Marktsegmente anhand relevanter Merkmale bilden; ergänzend Primär- und Sekundärforschung unterscheiden und Erhebungsdaten vorsichtig interpretieren.

**Lernziele:** Du kannst (1) Marktsegmente anhand relevanter Merkmale bilden, (2) Primär- und Sekundärforschung unterscheiden und (3) Erhebungsdaten vorsichtig interpretieren.

**Abschnitte:** A1: Markt und Wettbewerb. A2: Segmentierung und Zielgruppe. A3: Forschungsmethoden. A4: Datenqualität und Interpretation.

**MAKEL-Fall:** MAKEL untersucht eine neue Gruppe von Geschäftskunden.

**Aufgabe 1:** Von 200 Befragten nennen 60 das angebotene Merkmal als wichtig. Berechne den Anteil. **Lösungskriterium:** 30 Prozent innerhalb dieser Befragung; ohne passende Stichprobenanlage keine sichere Aussage über den gesamten Markt.

**Aufgabe 2:** Ordne eigene Kundenbefragung und Auswertung eines vorhandenen Branchenberichts zu. **Lösungskriterium:** Primär- und Sekundärforschung; Herkunft, Aktualität und Eignung der Daten jeweils prüfen.

**Typischer Fehler:** Eine kleine freiwillige Umfrage für repräsentativ erklären. **Grundlage:** Büromanagement LF 5 K1/K2.

#### IK-LF09-K02 · Die Unternehmenslage einschätzen

**Lehrplananker:** KMK S. 18, Kompetenzbezug: Interne und externe Analysefaktoren unterscheiden; ergänzend Lebenszyklus und Portfolio als Modelle nutzen und Aus Analysen begründete Handlungsoptionen ableiten.

**Lernziele:** Du kannst (1) Interne und externe Analysefaktoren unterscheiden, (2) Lebenszyklus und Portfolio als Modelle nutzen und (3) Aus Analysen begründete Handlungsoptionen ableiten.

**Abschnitte:** A1: Informationsbasis. A2: SWOT. A3: Produktlebenszyklus und Portfolio. A4: Schlussfolgerungen und Modellgrenzen.

**MAKEL-Fall:** MAKEL bewertet eine bestehende Kollektion und einen möglichen neuen Markt.

**Aufgabe 1:** Ordne freie eigene Druckkapazität und eine neue Konkurrenzmarke in eine SWOT ein. **Lösungskriterium:** Kapazität als potenzielle interne Stärke, Konkurrenz als externe Bedrohung; die konkrete Wirkung begründen.

**Aufgabe 2:** Ein Produkt hat wachsende Umsätze. Ist damit seine Lebenszyklusphase sicher bestimmt? **Lösungskriterium:** Nein. Zeitraum, Marktvergleich und weitere Indikatoren prüfen; das Modell ist eine begründete Einordnung, kein Naturgesetz.

**Typischer Fehler:** Interne Schwächen und externe Risiken vermischen. **Grundlage:** Büromanagement LF 5; SWOT und Portfolio vertiefen.

#### IK-LF09-K03 · Ziele, Strategie und Produktangebot

**Lehrplananker:** KMK S. 18, Kompetenzbezug: Ein Marketingziel überprüfbar formulieren; ergänzend Strategie und einzelne Maßnahme unterscheiden und Produktpolitik auf Bedürfnisse und Ressourcen beziehen.

**Lernziele:** Du kannst (1) Ein Marketingziel überprüfbar formulieren, (2) Strategie und einzelne Maßnahme unterscheiden und (3) Produktpolitik auf Bedürfnisse und Ressourcen beziehen.

**Abschnitte:** A1: Ziele und Unternehmensbezug. A2: Positionierung und Strategie. A3: Produkt- und Sortimentspolitik. A4: Bewertung von Varianten und Zielkonflikten.

**MAKEL-Fall:** MAKEL plant ein Angebot für wiederkehrende Geschäftskunden.

**Aufgabe 1:** Verbessere das Ziel „mehr Geschäftskunden gewinnen“. **Lösungskriterium:** Messgröße, Ausgangswert, Zielwert, Zeitraum und Zielgruppe nennen; Zahlen als Planungsannahmen kennzeichnen.

**Aufgabe 2:** Bewerte eine zusätzliche Farbvariante bei kleinen Nachfragemengen. **Lösungskriterium:** Kundennutzen gegen Material-, Bestands-, Rüst- und Komplexitätskosten abwägen; Empfehlung am gegebenen Bedarf begründen.

**Typischer Fehler:** Eine Werbeaktion als vollständige Marketingstrategie ausgeben. **Grundlage:** Büromanagement LF 5 K3.

#### IK-LF09-K04 · Preise und Konditionen gestalten

**Lehrplananker:** KMK S. 18, Kompetenzbezug: Preisentscheidungen mit Kosten und Markt verbinden; ergänzend Wirkung von Preisnachlässen berechnen und Konditionen hinsichtlich Zielgruppe und Unternehmensziel beurteilen.

**Lernziele:** Du kannst (1) Preisentscheidungen mit Kosten und Markt verbinden, (2) Wirkung von Preisnachlässen berechnen und (3) Konditionen hinsichtlich Zielgruppe und Unternehmensziel beurteilen.

**Abschnitte:** A1: Kosten, Nachfrage und Wettbewerb. A2: Preisstrategien. A3: Rabatte und Zahlungsbedingungen. A4: Wirkung und Erfolgskontrolle.

**MAKEL-Fall:** MAKEL bewertet einen Rabatt für eine Kundengruppe.

**Aufgabe 1:** Netto-Listenpreis 100 Euro, Rabatt 10 Prozent, variable Kosten 60 Euro. Bestimme den Stück-DB nach Rabatt. **Lösungskriterium:** Preis 90 Euro, Stück-DB 30 Euro. Vor Rabatt betrug er 40 Euro.

**Aufgabe 2:** Bisher 100 Stück mit 40 Euro DB. Wie viele ganze Stücke mit 30 Euro DB sind für mindestens denselben Gesamt-DB erforderlich? **Lösungskriterium:** Mindestens 134 Stück: 4.000/30=133,33…, aufrunden; Absatz und Kapazität sind nicht garantiert.

**Typischer Fehler:** Zehn Prozent Rabatt mit zehn Prozent weniger Gewinn gleichsetzen. **Grundlage:** Büromanagement LF 5 K4 und LF 10.

#### IK-LF09-K05 · Kommunikation und Online-Marketing

**Lehrplananker:** KMK S. 18, Kompetenzbezug: Kommunikationsmaßnahmen passend zur Zielgruppe auswählen; ergänzend Reichweite und Reaktion anhand definierter Kennzahlen auswerten und Rechtliche und interkulturelle Grenzen berücksichtigen.

**Lernziele:** Du kannst (1) Kommunikationsmaßnahmen passend zur Zielgruppe auswählen, (2) Reichweite und Reaktion anhand definierter Kennzahlen auswerten und (3) Rechtliche und interkulturelle Grenzen berücksichtigen.

**Abschnitte:** A1: Zielgruppe und Botschaft. A2: Kanäle und Online-Instrumente. A3: Rechte, Daten und Wettbewerb. A4: Kennzahlen und Reflexion.

**MAKEL-Fall:** MAKEL plant eine digitale Kampagne für Geschäftskunden.

**Aufgabe 1:** 50.000 Einblendungen, 1.000 Klicks und 20 Bestellungen nach Klick. Berechne Klickrate und hier als Bestellungen/Klicks definierte Conversionrate. **Lösungskriterium:** 2 Prozent Klickrate und 2 Prozent Conversionrate; unterschiedliche Nenner klar nennen.

**Aufgabe 2:** Vor Veröffentlichung sollen fremde Fotos und eine nicht belegte Umweltbehauptung verwendet werden. Welche Prüfung ist nötig? **Lösungskriterium:** Bildnutzungsrechte und Nachweis der Aussage klären; Werberecht, Datenschutz und Zielgruppenverständnis anhand aktueller Primärquellen prüfen. Kein rechtssicheres Werbeversprechen erfinden.

**Typischer Fehler:** Reichweite als Beweis tatsächlicher Käufe behandeln. **Grundlage:** Büromanagement LF 5 K6; Online- und Rechtsbezug aktuell prüfen.

#### IK-LF09-K06 · Vertrieb und Außenhandel

**Lehrplananker:** KMK S. 18, Kompetenzbezug: Vertriebswege hinsichtlich Ziel und Aufwand vergleichen; ergänzend Lieferklauseln und Zahlungsabsicherung funktional unterscheiden und Internationale Risiken mit geeigneten Maßnahmen verbinden.

**Lernziele:** Du kannst (1) Vertriebswege hinsichtlich Ziel und Aufwand vergleichen, (2) Lieferklauseln und Zahlungsabsicherung funktional unterscheiden und (3) Internationale Risiken mit geeigneten Maßnahmen verbinden.

**Abschnitte:** A1: Direkter und indirekter Vertrieb. A2: Außenhandelsrisiken. A3: Incoterms und benannter Ort. A4: Dokumenteninkasso und Akkreditiv.

**MAKEL-Fall:** MAKEL plant einen ausländischen Geschäftskundenauftrag.

**Aufgabe 1:** Warum reicht die Nennung einer Lieferklausel ohne benannten Ort und geltende Fassung für eine klare Fallbearbeitung nicht? **Lösungskriterium:** Kosten-, Risiko- und Leistungspunkte hängen von der konkreten Klausel und dem Ort ab. Die Klausel regelt nicht automatisch Eigentumsübergang oder alle Zahlungsfragen.

**Aufgabe 2:** Vergleiche Inkasso und Akkreditiv als Absicherungsinstrumente anhand eines vorgegebenen Risikos. **Lösungskriterium:** Dokumentenabwicklung gegenüber bedingtem Bankzahlungsversprechen unterscheiden; Bedingungen und verbleibende Risiken benennen. Konkrete Klauseln und Regeln bei Ausarbeitung an zulässigen Primärquellen prüfen.

**Typischer Fehler:** Incoterms als vollständigen Kaufvertrag oder Zahlungsgarantie darstellen. **Grundlage:** Büromanagement LF 5 K5; internationale Sicherung überwiegend neu.

#### IK-LF09-K07 · Ein Marketingkonzept umsetzen und prüfen

**Lehrplananker:** KMK S. 18, Kompetenzbezug: Marketinginstrumente zu einem konsistenten Mix verbinden; ergänzend Maßnahmen in einem Projekt koordinieren und Zielerreichung aus geeigneten Daten beurteilen.

**Lernziele:** Du kannst (1) Marketinginstrumente zu einem konsistenten Mix verbinden, (2) Maßnahmen in einem Projekt koordinieren und (3) Zielerreichung aus geeigneten Daten beurteilen.

**Abschnitte:** A1: Konzept und Budget. A2: Abstimmung der Instrumente. A3: Umsetzung und Präsentation. A4: Kennzahlen und Verbesserung.

**MAKEL-Fall:** MAKEL führt eine kleine Kampagne für eine neue Geschäftskundengruppe durch.

**Aufgabe 1:** Ein Budget von 5.000 Euro enthält 1.500 für Gestaltung, 2.000 für Ausspielung und 800 für Muster. Bestimme die Reserve. **Lösungskriterium:** 700 Euro. Bei einer zusätzlichen Ausgabe von 900 Euro wäre das Budget um 200 Euro überschritten.

**Aufgabe 2:** Die Klickrate steigt, aber Bestellungen bleiben gleich. Wie bewertest du das Kampagnenziel „mehr Bestellungen“? **Lösungskriterium:** Nicht allein durch Klicks erreicht. Nachfrage, Angebot, Abbruchstellen, Zeitraum und Kosten prüfen; Ergebnis zielbezogen präsentieren.

**Typischer Fehler:** Jedes einzelne Instrument ohne den restlichen Marketing-Mix optimieren. **Grundlage:** Büromanagement LF 5/LF 13; gemeinsames Konzept neu verbinden.

### LF 10 · Jahresabschluss und Finanzierung

#### IK-LF10-K01 · Den Jahresabschluss vorbereiten

**Lehrplananker:** KMK S. 19, Kompetenzbezug: Vorbereitende Arbeiten in eine sinnvolle Reihenfolge bringen; ergänzend Inventur- und Kontensalden abstimmen und Abschlussbestandteile einer Kapitalgesellschaft einordnen.

**Lernziele:** Du kannst (1) Vorbereitende Arbeiten in eine sinnvolle Reihenfolge bringen, (2) Inventur- und Kontensalden abstimmen und (3) Abschlussbestandteile einer Kapitalgesellschaft einordnen.

**Abschnitte:** A1: Zweck und Adressaten. A2: Inventur und bereinigte Salden. A3: Vorbereitung und Zuständigkeiten. A4: Bilanz, GuV und weitere relevante Bestandteile.

**MAKEL-Fall:** MAKEL bereitet einen ausdrücklich vereinfachten Abschlussfall vor.

**Aufgabe 1:** Ein Rohstoffkonto enthält 12.000 Euro; belegter, noch nicht verbuchter Verbrauch beträgt 500 Euro. Welcher Bestand folgt nach dieser Korrektur? **Lösungskriterium:** 11.500 Euro. Eine zusätzlich nötige Bewertungsprüfung ist damit nicht vorweggenommen.

**Aufgabe 2:** Warum dürfen unbereinigte Salden nicht kommentarlos als fertiger Jahresabschluss übernommen werden? **Lösungskriterium:** Vollständigkeit, Inventurdifferenzen, Periodenzuordnung und Bewertung erfordern Prüfung; konkrete Zuständigkeiten und Nachweise nennen.

**Typischer Fehler:** Eine Saldenliste als fertigen vollständigen Abschluss ausgeben. **Grundlage:** Buchführung K9 und neues LF 5.

#### IK-LF10-K02 · Vermögen und Schulden bewerten

**Lehrplananker:** KMK S. 19, Kompetenzbezug: Bewertungsgrundsätze auf eindeutige Fälle beziehen; ergänzend Anschaffungs- und Herstellungskosten unterscheiden und Bilanzansatz und Verkaufspreis auseinanderhalten.

**Lernziele:** Du kannst (1) Bewertungsgrundsätze auf eindeutige Fälle beziehen, (2) Anschaffungs- und Herstellungskosten unterscheiden und (3) Bilanzansatz und Verkaufspreis auseinanderhalten.

**Abschnitte:** A1: Vorsicht, Realisation und Imparität. A2: Anschaffungs- und Herstellungskosten. A3: Anlage- und Umlaufvermögen. A4: Fallbewertung und Informationsgrenzen.

**MAKEL-Fall:** MAKEL bewertet gegebene Material- und Erzeugnisbestände.

**Aufgabe 1:** Für einen einfachen Vorratsfall gelten Anschaffungskosten 1.000 Euro und ein maßgeblicher niedrigerer Stichtagswert von 800 Euro; die handelsrechtlichen Voraussetzungen sind im Fall ausdrücklich gegeben. Welcher Wert wird angesetzt? **Lösungskriterium:** 800 Euro; Wertminderung 200 Euro. Nicht ohne Prüfung auf beliebige Anlagegüter übertragen.

**Aufgabe 2:** Warum darf ein fertiger Hoodie im Vorratsbestand nicht einfach zum Verkaufspreis angesetzt werden? **Lösungskriterium:** Herstellungskosten und noch nicht realisierte Vertriebsmarge unterscheiden; Bestand nach den einschlägigen Bewertungsregeln prüfen.

**Typischer Fehler:** Handelsrechtliche Herstellungskosten mit Selbstkosten gleichsetzen. **Grundlage:** Buchführung K8/K9; HGB §§ 252, 253, 255 aktuell zuordnen.

#### IK-LF10-K03 · Beträge der richtigen Periode zuordnen

**Lehrplananker:** KMK S. 19, Kompetenzbezug: Zahlung und wirtschaftliche Zugehörigkeit trennen; ergänzend Antizipative und transitorische Fälle unterscheiden und Rückstellung und sichere Verbindlichkeit abgrenzen.

**Lernziele:** Du kannst (1) Zahlung und wirtschaftliche Zugehörigkeit trennen, (2) Antizipative und transitorische Fälle unterscheiden und (3) Rückstellung und sichere Verbindlichkeit abgrenzen.

**Abschnitte:** A1: Periodenabgrenzung. A2: Aktive und passive Rechnungsabgrenzung. A3: Noch zu erfassende Aufwendungen und Erträge. A4: Rückstellungen und Begründung.

**MAKEL-Fall:** MAKEL bezahlt eine Versicherung im Voraus und beurteilt weitere Abschlussfälle.

**Aufgabe 1:** Am 1. Dezember werden 1.200 Euro für zwölf Monate Versicherung bezahlt. Kalenderjahr, gleichmäßiger Verbrauch, Steuer unberücksichtigt. Welcher Betrag betrifft das nächste Jahr? **Lösungskriterium:** 1.100 Euro für elf Monate; 100 Euro Aufwand im laufenden Jahr. Buchungsschema zur aktiven Abgrenzung erläutern.

**Aufgabe 2:** Eine Rechnung mit eindeutigem Betrag liegt vor; bei einem zweiten Fall sind Verpflichtungsgrund oder Höhe noch ungewiss. Was ist zu unterscheiden? **Lösungskriterium:** Sichere Verbindlichkeit von prüfungsbedürftiger Rückstellung trennen; Ansatzvoraussetzungen und Höhe am konkreten Fall prüfen, keine Rückstellung als frei verfügbare Sparreserve darstellen.

**Typischer Fehler:** Jede künftige Ausgabe bereits als Rückstellung buchen. **Grundlage:** Buchführung K9; periodengerechte Fälle vertiefen.

#### IK-LF10-K04 · Bilanz und GuV zusammenführen

**Lehrplananker:** KMK S. 19, Kompetenzbezug: Ergebnis und Eigenkapital rechnerisch verbinden; ergänzend Abschlusspositionen sachgerecht zuordnen und Aussagegrenzen einer vereinfachten Bilanz erklären.

**Lernziele:** Du kannst (1) Ergebnis und Eigenkapital rechnerisch verbinden, (2) Abschlusspositionen sachgerecht zuordnen und (3) Aussagegrenzen einer vereinfachten Bilanz erklären.

**Abschnitte:** A1: Erfolgskonten und GuV. A2: Eigenkapitalentwicklung. A3: Bilanzaufbereitung. A4: Abschlussleser und Grenzen.

**MAKEL-Fall:** MAKEL untersucht einen vereinfachten Kapitalgesellschaftsfall.

**Aufgabe 1:** Anfangseigenkapital 100.000 Euro, Gewinn 20.000 Euro, keine Ausschüttung, Einlagen oder anderen Änderungen. Endwert? **Lösungskriterium:** 120.000 Euro im vereinfachten Fall; nicht zugleich einen entsprechenden Bankbestand behaupten.

**Aufgabe 2:** Weshalb beweist eine ausgeglichene Bilanz nicht, dass alle Buchungen fachlich richtig sind? **Lösungskriterium:** Soll-Haben-Gleichheit verhindert nicht falsche Konten, unvollständige Belege oder unzutreffende Bewertungen; geeignete weitere Kontrollen nennen.

**Typischer Fehler:** Bilanzgleichheit als vollständigen Richtigkeitsnachweis verstehen. **Grundlage:** Buchführung K2/K4/K9.

#### IK-LF10-K05 · Den Abschluss mit Kennzahlen auswerten

**Lehrplananker:** KMK S. 19, Kompetenzbezug: Kapital-, Liquiditäts- und Rentabilitätskennzahlen berechnen; ergänzend Bezugsgrößen und Zeitraum transparent angeben und Kennzahlen gemeinsam statt isoliert beurteilen.

**Lernziele:** Du kannst (1) Kapital-, Liquiditäts- und Rentabilitätskennzahlen berechnen, (2) Bezugsgrößen und Zeitraum transparent angeben und (3) Kennzahlen gemeinsam statt isoliert beurteilen.

**Abschnitte:** A1: Vermögens- und Kapitalstruktur. A2: Anlagenfinanzierung. A3: Liquidität und Rentabilität. A4: Vereinfachter Cashflow und Interpretation.

**MAKEL-Fall:** MAKEL bereitet Zahlen für ein Finanzierungsgespräch auf.

**Aufgabe 1:** Eigenkapital 300.000 Euro, Bilanzsumme 1.000.000 Euro; liquide Mittel 50.000 und kurzfristige Verbindlichkeiten 200.000 Euro. Berechne Eigenkapitalquote und Liquidität ersten Grades. **Lösungskriterium:** 30 Prozent und 25 Prozent. Stichtagsbezug und Nenner nennen.

**Aufgabe 2:** Periodengewinn 40.000 Euro plus im Fall zahlungsunwirksame Abschreibungen 10.000 Euro; weitere Korrekturen sind ausdrücklich null. Vereinfachter Cashflow? **Lösungskriterium:** 50.000 Euro. Das ist weder automatisch der tatsächliche Bankanstieg noch eine vollständige Kapitalflussrechnung.

**Typischer Fehler:** Aus einer einzigen Kennzahl die ganze Unternehmenslage ableiten. **Grundlage:** Büromanagement LF 9 und Buchführung; Kennzahlen erweitern.

#### IK-LF10-K06 · Finanzbedarf und Zahlungsfähigkeit planen

**Lehrplananker:** KMK S. 19, Kompetenzbezug: Ein- und Auszahlungen zeitlich zuordnen; ergänzend Liquiditätslücken berechnen und Geeignete Maßnahmen mit ihren Folgen bewerten.

**Lernziele:** Du kannst (1) Ein- und Auszahlungen zeitlich zuordnen, (2) Liquiditätslücken berechnen und (3) Geeignete Maßnahmen mit ihren Folgen bewerten.

**Abschnitte:** A1: Finanzbedarf und Zeitraum. A2: Liquiditätsplan. A3: Lücken und Reserve. A4: Maßnahmen und Nebenwirkungen.

**MAKEL-Fall:** MAKEL muss Material vor dem Eingang der Kundenzahlung bezahlen.

**Aufgabe 1:** Anfangsbestand 10.000 Euro, Einzahlungen 25.000 und Auszahlungen 40.000 Euro, keine weiteren Bewegungen. Geplanter Endbestand? **Lösungskriterium:** −5.000 Euro; Finanzierungslücke mindestens 5.000 Euro zuzüglich einer gegebenenfalls geplanten Reserve.

**Aufgabe 2:** Vergleiche spätere Investition mit früherer Kundenzahlung als mögliche Maßnahme. **Lösungskriterium:** Liquiditätswirkung, Umsetzbarkeit, Kosten und Kunden-/Produktionsfolgen erläutern; Gewinn nicht als vorhandene Liquidität behandeln.

**Typischer Fehler:** Umsatz bei Rechnungsstellung ohne Zahlungsplan als Einzahlung erfassen. **Grundlage:** Büromanagement LF 9 K1.

#### IK-LF10-K07 · Geeignete Finanzierung auswählen

**Lehrplananker:** KMK S. 19, Kompetenzbezug: Finanzierungsarten in zwei Dimensionen einordnen; ergänzend Kosten und Laufzeit eines gegebenen Angebots vergleichen und Finanzierung am Zweck und Risiko ausrichten.

**Lernziele:** Du kannst (1) Finanzierungsarten in zwei Dimensionen einordnen, (2) Kosten und Laufzeit eines gegebenen Angebots vergleichen und (3) Finanzierung am Zweck und Risiko ausrichten.

**Abschnitte:** A1: Innen und außen. A2: Eigen und fremd. A3: Kredit- und alternative Finanzierung. A4: Kosten, Laufzeit und Entscheidung.

**MAKEL-Fall:** MAKEL prüft die Finanzierung einer Veredelungsmaschine.

**Aufgabe 1:** Ein Bankdarlehen und eine Bareinlage des Gesellschafters werden verglichen. Ordne beide ein. **Lösungskriterium:** Darlehen: Außen-/Fremdfinanzierung. Einlage: Außen-/Eigenfinanzierung. Herkunft und Kapitalart getrennt begründen.

**Aufgabe 2:** Ein einjähriger endfälliger Kredit beträgt 20.000 Euro bei 5 Prozent einfachem Jahreszins ohne Gebühren. Zinsbetrag? **Lösungskriterium:** 1.000 Euro; Rückzahlung insgesamt 21.000 Euro am Ende. Nicht als Annuitätenkredit behandeln.

**Typischer Fehler:** Außenfinanzierung mit Fremdfinanzierung gleichsetzen. **Grundlage:** Büromanagement LF 9 K2/K3/K5.

#### IK-LF10-K08 · Finanzierung absichern und beurteilen

**Lehrplananker:** KMK S. 19, Kompetenzbezug: Sicherheiten funktional unterscheiden; ergänzend Kosten und Risiken einer Besicherung erläutern und Rechtsform und Vertragsbedingungen in die Prüfung einbeziehen.

**Lernziele:** Du kannst (1) Sicherheiten funktional unterscheiden, (2) Kosten und Risiken einer Besicherung erläutern und (3) Rechtsform und Vertragsbedingungen in die Prüfung einbeziehen.

**Abschnitte:** A1: Sicherungsbedarf. A2: Eigentumsvorbehalt und Sicherungsübereignung. A3: Grundschuld. A4: Vertrag, Kosten und Rechtsformvergleich.

**MAKEL-Fall:** MAKEL vergleicht die Besicherung einer Maschine mit einer ergänzenden Personengesellschaft.

**Aufgabe 1:** Unterscheide vereinfacht Sicherungsübereignung einer Maschine und Grundschuld an einem Grundstück. **Lösungskriterium:** Bewegliches Sicherungsgut gegenüber Grundpfandrecht; Besitz, Nutzung, Eigentum und Verwertung nicht pauschal gleichsetzen.

**Aufgabe 2:** Welche Informationen braucht ein Vergleich der Haftungsrisiken von GmbH und einer konkret benannten Personengesellschaft? **Lösungskriterium:** Gesellschaftsform, Beteiligtenstellung, Vertrag, persönliche Sicherheiten und rechtliche Voraussetzungen; pauschale Aussage „GmbH bedeutet keinerlei persönliches Risiko“ vermeiden.

**Typischer Fehler:** Eine Sicherheit als Wegfall der Rückzahlungspflicht ansehen. **Grundlage:** Büromanagement LF 9 K4; rechtliche Details aktuell belegen.

### LF 11 · Gesamtwirtschaft und Wirtschaftspolitik

#### IK-LF11-K01 · MAKEL im Wirtschaftskreislauf

**Lehrplananker:** KMK S. 20, Kompetenzbezug: Wirtschaftssubjekte und ihre Beziehungen darstellen; ergänzend Reale und monetäre Ströme unterscheiden und Die offene Volkswirtschaft auf betriebliche Vorgänge beziehen.

**Lernziele:** Du kannst (1) Wirtschaftssubjekte und ihre Beziehungen darstellen, (2) Reale und monetäre Ströme unterscheiden und (3) Die offene Volkswirtschaft auf betriebliche Vorgänge beziehen.

**Abschnitte:** A1: Haushalte, Unternehmen und Staat. A2: Finanzsektor. A3: Ausland und offene Volkswirtschaft. A4: Rückwirkungen auf MAKEL.

**MAKEL-Fall:** MAKEL zahlt Löhne, bezieht Waren aus dem Ausland und beliefert Geschäftskunden.

**Aufgabe 1:** Ordne Lohnzahlung und Arbeitsleistung als verbundene Flüsse ein. **Lösungskriterium:** Geldfluss Unternehmen zu Haushalt; Arbeitsleistung als realer Gegenstrom. Die Darstellung ist ein Modell.

**Aufgabe 2:** Wie erweitert ein Materialimport den vereinfachten inländischen Kreislauf? **Lösungskriterium:** Auslandssektor sowie Güter- und Zahlungsbeziehungen ergänzen; keinen bestimmten volkswirtschaftlichen Saldo aus nur einem Vorgang ableiten.

**Typischer Fehler:** Modellströme mit einzelnen Buchungskonten gleichsetzen. **Grundlage:** Büromanagement LF 1 K6; offene Volkswirtschaft vertiefen.

#### IK-LF11-K02 · Wirtschaftsordnung und unternehmerischer Spielraum

**Lehrplananker:** KMK S. 20, Kompetenzbezug: Merkmale der sozialen Marktwirtschaft erklären; ergänzend Staatlichen Ordnungsrahmen von Einzelmaßnahmen unterscheiden und Auswirkungen auf unternehmerische Entscheidungen beurteilen.

**Lernziele:** Du kannst (1) Merkmale der sozialen Marktwirtschaft erklären, (2) Staatlichen Ordnungsrahmen von Einzelmaßnahmen unterscheiden und (3) Auswirkungen auf unternehmerische Entscheidungen beurteilen.

**Abschnitte:** A1: Koordination durch Märkte. A2: Sozialer Ausgleich und Regeln. A3: Unternehmensfreiheit und Grenzen. A4: Fallentscheidung und Interessen.

**MAKEL-Fall:** MAKEL plant ein neues Angebot unter vorgegebenen rechtlichen Rahmenbedingungen.

**Aufgabe 1:** Nenne einen Unterschied zwischen allgemeiner Wettbewerbsregel und einmaliger betrieblicher Förderung. **Lösungskriterium:** Allgemeiner Ordnungsrahmen gegenüber konkreter wirtschaftspolitischer Maßnahme; Wirkung am Fall erklären.

**Aufgabe 2:** Warum bedeutet Marktwirtschaft nicht, dass ein Unternehmen ohne gesetzliche Grenzen entscheiden kann? **Lösungskriterium:** Eigentum, Vertragsfreiheit, Wettbewerb sowie soziale und rechtliche Bindungen zusammen erläutern; keine abstrakte Schlagwortliste allein.

**Typischer Fehler:** Ordnungspolitik mit jeder einzelnen Unternehmensentscheidung verwechseln. **Grundlage:** Gesamtwirtschaftliche Systematik überwiegend neu.

#### IK-LF11-K03 · Märkte, Preise und Marktmacht

**Lehrplananker:** KMK S. 20, Kompetenzbezug: Anbieter- und Nachfragerrolle unterscheiden; ergänzend Polypol und Angebotsoligopol anhand von Merkmalen vergleichen und Preisentscheidungen unter Wettbewerbsbedingungen beurteilen.

**Lernziele:** Du kannst (1) Anbieter- und Nachfragerrolle unterscheiden, (2) Polypol und Angebotsoligopol anhand von Merkmalen vergleichen und (3) Preisentscheidungen unter Wettbewerbsbedingungen beurteilen.

**Abschnitte:** A1: Angebot und Nachfrage. A2: Marktformen. A3: Preis- und Mengenspielräume. A4: Modellannahmen und betriebliche Folgen.

**MAKEL-Fall:** MAKEL steht als Verkäufer und als Einkäufer in unterschiedlichen Märkten.

**Aufgabe 1:** Viele kleine Anbieter und Nachfrager stehen einem Markt mit wenigen großen Anbietern gegenüber. Welche Grundformen sind gemeint? **Lösungskriterium:** Polypol gegenüber Angebotsoligopol bei ansonsten passend beschriebenem Markt; relevanten Markt und Zahl der Nachfrager mitberücksichtigen.

**Aufgabe 2:** Warum kann MAKEL gestiegene Einkaufskosten nicht automatisch vollständig auf Kunden überwälzen? **Lösungskriterium:** Nachfrage, Wettbewerb, Ersatzmöglichkeiten und Konditionen begrenzen den Spielraum; Wirkung ohne gegebene Daten nicht exakt beziffern.

**Typischer Fehler:** Marktform allein aus der Zahl der Verkaufsstellen einer Firma ableiten. **Grundlage:** Büromanagement LF 5 K1; gesamtwirtschaftliche Modelle erweitern.

#### IK-LF11-K04 · Wettbewerb, Kooperation und Konzentration

**Lehrplananker:** KMK S. 20, Kompetenzbezug: Kooperation und Konzentration unterscheiden; ergänzend Wirtschaftliche Chancen und Risiken vergleichen und Wettbewerbsrechtliche Fragen erkennen.

**Lernziele:** Du kannst (1) Kooperation und Konzentration unterscheiden, (2) Wirtschaftliche Chancen und Risiken vergleichen und (3) Wettbewerbsrechtliche Fragen erkennen.

**Abschnitte:** A1: Formen der Zusammenarbeit. A2: Zusammenschlüsse und Marktmacht. A3: Nationaler und europäischer Ordnungsrahmen. A4: Begründete betriebliche Bewertung.

**MAKEL-Fall:** MAKEL prüft eine Einkaufskooperation und einen anders gelagerten Zusammenschluss.

**Aufgabe 1:** Vergleiche gemeinsame Beschaffung rechtlich selbständiger Unternehmen mit einer Fusion. **Lösungskriterium:** Kooperation gegenüber Konzentrationsvorgang; tatsächliche Vertragsstruktur und Selbständigkeit prüfen.

**Aufgabe 2:** Ein Konkurrent schlägt gemeinsame Verkaufspreise vor. Welche Reaktion ist erforderlich? **Lösungskriterium:** Wettbewerbsrechtliches Risiko erkennen, nicht ungeprüft zusagen und fachlich prüfen lassen; keine pauschale Freigabe durch Behauptung einer Effizienzsteigerung.

**Typischer Fehler:** Jede Zusammenarbeit als automatisch zulässig oder unzulässig einstufen. **Grundlage:** Überwiegend neu; aktuelle GWB-/EU-Primärquellen bei Redaktion.

#### IK-LF11-K05 · Konjunktur und staatliche Wirtschaftspolitik

**Lehrplananker:** KMK S. 20, Kompetenzbezug: Konjunkturindikatoren im Zusammenhang interpretieren; ergänzend Wirtschaftspolitische Ziele und Zielkonflikte erklären und Maßnahmen auf mögliche betriebliche Folgen beziehen.

**Lernziele:** Du kannst (1) Konjunkturindikatoren im Zusammenhang interpretieren, (2) Wirtschaftspolitische Ziele und Zielkonflikte erklären und (3) Maßnahmen auf mögliche betriebliche Folgen beziehen.

**Abschnitte:** A1: Phasen und Indikatoren. A2: Stabilität und Wachstum. A3: Fiskal-, Struktur- und weitere Politik. A4: Entscheidung unter Unsicherheit.

**MAKEL-Fall:** MAKEL reagiert auf eine vorgegebene schwächere Nachfragesituation.

**Aufgabe 1:** Auftragseingänge sinken, Lager steigen und Investitionen werden zurückgestellt. Welche Konjunkturüberlegung ist plausibel? **Lösungskriterium:** Abschwung als begründete Hypothese; mehrere Indikatoren, Zeitraum und mögliche branchenspezifische Ursachen beachten.

**Aufgabe 2:** Eine Förderung soll Investitionen erhöhen. Nenne Wirkungskette und mögliche Grenze. **Lösungskriterium:** Kosten beziehungsweise Anreize können Investitionsbereitschaft ändern; Nachfrage, Kapazität, Finanzierung und Mitnahmeeffekte begrenzen die Wirkung.

**Typischer Fehler:** Eine wirtschaftspolitische Maßnahme als sichere Ursache eines bestimmten Einzelbetriebsergebnisses darstellen. **Grundlage:** Gesamtwirtschaftlicher Aufbau neu.

#### IK-LF11-K06 · Geldpolitik und globale Einflüsse

**Lehrplananker:** KMK S. 20, Kompetenzbezug: Die Grundidee der EZB-Offenmarktpolitik erklären; ergänzend Zins- und Wechselkurseinflüsse auf MAKEL erläutern und Internationale Organisationen anhand ihrer Aufgaben einordnen.

**Lernziele:** Du kannst (1) Die Grundidee der EZB-Offenmarktpolitik erklären, (2) Zins- und Wechselkurseinflüsse auf MAKEL erläutern und (3) Internationale Organisationen anhand ihrer Aufgaben einordnen.

**Abschnitte:** A1: EZB und geldpolitische Übertragung. A2: Finanzierung und Nachfrage. A3: Globalisierung, EU und Organisationen. A4: Geschäftsprozess anpassen und präsentieren.

**MAKEL-Fall:** MAKEL beurteilt eine Investition bei veränderten Finanzierungskosten.

**Aufgabe 1:** Ein ausdrücklich einfacher Jahreszins steigt für einen endfälligen Kredit über 100.000 Euro von 3 auf 5 Prozent; keine weiteren Kosten. Jährliche Mehrbelastung? **Lösungskriterium:** 2.000 Euro; Anstieg um 2 Prozentpunkte, nicht um 2 Prozent des bisherigen Zinsbetrags.

**Aufgabe 2:** Entwickle eine mögliche Anpassung bei stärker schwankenden internationalen Beschaffungskosten. **Lösungskriterium:** Beispielsweise Bezugsquellen, Vertragsbedingungen oder Reserve prüfen; Risiken und Unternehmensziele nennen. Aufgaben von EU, WTO oder IWF sachlich voneinander abgrenzen.

**Typischer Fehler:** Eine Leitzinsänderung als sofortige gleich große Änderung aller Kundenkredite behandeln. **Grundlage:** Büromanagement LF 9 als Anknüpfung; Geldpolitik und Organisationen neu.

### LF 12 · Personalwirtschaft

#### IK-LF12-K01 · Den Personalbedarf ermitteln

**Lehrplananker:** KMK S. 21, Kompetenzbezug: Quantitativen und qualitativen Bedarf unterscheiden; ergänzend Verfügbares Arbeitsvolumen und Bedarf berechnen und Einflussfaktoren und gesellschaftliche Verantwortung berücksichtigen.

**Lernziele:** Du kannst (1) Quantitativen und qualitativen Bedarf unterscheiden, (2) Verfügbares Arbeitsvolumen und Bedarf berechnen und (3) Einflussfaktoren und gesellschaftliche Verantwortung berücksichtigen.

**Abschnitte:** A1: Aufgaben und Stellenbeschreibung. A2: Bestand und Veränderungen. A3: Bedarfsrechnung. A4: Qualifikationen und Verantwortung.

**MAKEL-Fall:** MAKEL plant die personelle Besetzung der Veredelung.

**Aufgabe 1:** 480 produktive Stunden sind erforderlich. Je Vollzeitkraft stehen laut Fall 160 produktive Stunden zur Verfügung. Bedarf? **Lösungskriterium:** 3 Vollzeitäquivalente; Ausfallzeiten sind bereits in den gegebenen produktiven Stunden berücksichtigt.

**Aufgabe 2:** Drei Stellen werden benötigt, zwei passend qualifizierte Kräfte sind verfügbar; keine Zu-/Abgänge geplant. Nettobedarf? **Lösungskriterium:** 1 Vollzeitäquivalent. Arbeitszeitvolumen und Kopfzahl können bei Teilzeit voneinander abweichen.

**Typischer Fehler:** Eine Person immer mit einem Vollzeitäquivalent gleichsetzen. **Grundlage:** Büromanagement LF 8 K1.

#### IK-LF12-K02 · Mitarbeitende gewinnen

**Lehrplananker:** KMK S. 21, Kompetenzbezug: Interne und externe Wege vergleichen; ergänzend Stellenausschreibungen aus einer Beschreibung entwickeln und Inklusion, Integration und Arbeitgebermarke berücksichtigen.

**Lernziele:** Du kannst (1) Interne und externe Wege vergleichen, (2) Stellenausschreibungen aus einer Beschreibung entwickeln und (3) Inklusion, Integration und Arbeitgebermarke berücksichtigen.

**Abschnitte:** A1: Beschaffungswege. A2: Anforderungsbezogene Ausschreibung. A3: Arbeitgebermarke und digitale Ansprache. A4: Inklusive und fremdsprachige Kommunikation.

**MAKEL-Fall:** MAKEL sucht eine Person für Lager und Versand.

**Aufgabe 1:** Entwirf fünf notwendige Bestandteile einer Ausschreibung. **Lösungskriterium:** Aufgaben, tatsächlich benötigte Kompetenzen, Arbeitsbedingungen, betrieblicher Bezug und Bewerbungsweg; unzulässige oder unbegründete Ausschlüsse vermeiden.

**Aufgabe 2:** Formuliere einen kurzen englischen Abschnitt, der eine konkrete Tätigkeit verständlich beschreibt. **Lösungskriterium:** Aufgabe und relevante Anforderung sachlich benennen; keine unbelegten Sprach- oder Herkunftsanforderungen erfinden.

**Typischer Fehler:** Eine Liste gewünschter persönlicher Eigenschaften ohne Tätigkeitsbezug als Stellenbeschreibung ausgeben. **Grundlage:** Büromanagement LF 8 K2; Arbeitgebermarke und Inklusion vertiefen.

#### IK-LF12-K03 · Auswählen und einstellen

**Lehrplananker:** KMK S. 21, Kompetenzbezug: Ein nachvollziehbares Auswahlverfahren planen; ergänzend Individual- und Kollektivarbeitsrecht unterscheiden und Erforderliche Vertrags- und Einstellungsunterlagen einordnen.

**Lernziele:** Du kannst (1) Ein nachvollziehbares Auswahlverfahren planen, (2) Individual- und Kollektivarbeitsrecht unterscheiden und (3) Erforderliche Vertrags- und Einstellungsunterlagen einordnen.

**Abschnitte:** A1: Auswahlkriterien und Verfahren. A2: Gespräch und Entscheidung. A3: Rechtlicher Rahmen. A4: Vertrag und Einstellung.

**MAKEL-Fall:** MAKEL vergleicht zwei Bewerbungen mit einer vorgegebenen Bewertungsmatrix.

**Aufgabe 1:** Gewichte Fachkompetenz mit 60 Prozent und passende Erfahrung mit 40 Prozent. A erhält 4 und 3, B 3 und 5 Punkte auf einer Skala mit höher=besser. **Lösungskriterium:** A: 3,6 Punkte; B: 3,8 Punkte. Die Matrix ist Entscheidungshilfe und ersetzt nicht die Prüfung der Kriterien.

**Aufgabe 2:** Ordne Arbeitsvertrag und einschlägigen Tarifvertrag funktional ein. **Lösungskriterium:** Individuelle Vereinbarung gegenüber kollektivem Regelungswerk; konkrete Anwendbarkeit prüfen, nicht jede Tarifregel automatisch voraussetzen.

**Typischer Fehler:** Kriterien nachträglich passend zur bevorzugten Person verändern. **Grundlage:** Büromanagement LF 8 K3 und LF 1; Arbeitsrecht aktuell belegen.

#### IK-LF12-K04 · Personal verwalten und einsetzen

**Lehrplananker:** KMK S. 21, Kompetenzbezug: Einsatzplanung aus Arbeitszeitvolumen ableiten; ergänzend Zeit- und Urlaubsmodelle nachvollziehbar vergleichen und Personalinformationen zweckgebunden verarbeiten.

**Lernziele:** Du kannst (1) Einsatzplanung aus Arbeitszeitvolumen ableiten, (2) Zeit- und Urlaubsmodelle nachvollziehbar vergleichen und (3) Personalinformationen zweckgebunden verarbeiten.

**Abschnitte:** A1: Personalakte und Datenzugang. A2: Arbeitszeit und Arbeitsort. A3: Urlaub und Einsatzplanung. A4: Dokumentation und Kontrolle.

**MAKEL-Fall:** MAKEL plant eine Woche mit unterschiedlichen Teilzeitmodellen.

**Aufgabe 1:** Drei Personen arbeiten 40, 20 und 20 Stunden. Wie viele Vollzeitäquivalente bei 40 Stunden Vollzeit? **Lösungskriterium:** 2 Vollzeitäquivalente; dennoch drei Personen.

**Aufgabe 2:** Im vereinfachten Fall entsprechen 30 Urlaubstage bei fünf Arbeitstagen pro Woche sechs Urlaubswochen. Wie viele Tage entsprechen bei gleichmäßigen drei Arbeitstagen sechs Wochen? **Lösungskriterium:** 18 Tage. Das ist die Umrechnung gleicher Urlaubsdauer, keine vollständige individuelle Urlaubsanspruchsprüfung.

**Typischer Fehler:** Personaldaten ohne sachlichen Bedarf im gesamten Team teilen. **Grundlage:** Büromanagement LF 8 K5 und LF 2 K5; konkrete Rechtsvorgaben prüfen.

#### IK-LF12-K05 · Entgelt und Abrechnung verstehen

**Lehrplananker:** KMK S. 21, Kompetenzbezug: Entgeltformen und Bestandteile erklären; ergänzend Brutto und Netto anhand vollständig gegebener Daten unterscheiden und Gesetzliche und tarifliche Grundlagen samt Jahresstand prüfen.

**Lernziele:** Du kannst (1) Entgeltformen und Bestandteile erklären, (2) Brutto und Netto anhand vollständig gegebener Daten unterscheiden und (3) Gesetzliche und tarifliche Grundlagen samt Jahresstand prüfen.

**Abschnitte:** A1: Zeit- und leistungsbezogenes Entgelt. A2: Bruttobestandteile. A3: Abzüge und Netto. A4: Nachweise und aktuelle Parameter.

**MAKEL-Fall:** MAKEL erklärt eine ausdrücklich vereinfachte Übungsabrechnung.

**Aufgabe 1:** Grundentgelt 2.500 Euro und gegebene Zulage 200 Euro. Errechne das vorgegebene Gesamtbrutto. **Lösungskriterium:** 2.700 Euro; Steuer- und Sozialversicherungspflicht der einzelnen Bestandteile ist damit noch nicht geprüft.

**Aufgabe 2:** Für eine reine Rechenübung sind auf dieses Brutto insgesamt 600 Euro Abzüge und keine weiteren Bewegungen vorgegeben. Auszahlung? **Lösungskriterium:** 2.100 Euro. Keine reale Lohnabrechnung oder pauschale Abgabenquote daraus ableiten; spätere gesetzliche Aufgaben brauchen vollständige persönliche und jahresbezogene Parameter.

**Typischer Fehler:** Nettolohn mit einem pauschal geratenen Prozentsatz ausrechnen. **Grundlage:** Büromanagement LF 8 K4/Buchführung K7; aktuelle Werte separat recherchieren.

#### IK-LF12-K06 · Personal entwickeln und Zusammenarbeit stärken

**Lehrplananker:** KMK S. 21, Kompetenzbezug: Qualifizierungsbedarf aus einer Tätigkeit ableiten; ergänzend Beurteilung und Feedback sachlich gestalten und Motivation, Arbeitszufriedenheit und Entwicklung verbinden.

**Lernziele:** Du kannst (1) Qualifizierungsbedarf aus einer Tätigkeit ableiten, (2) Beurteilung und Feedback sachlich gestalten und (3) Motivation, Arbeitszufriedenheit und Entwicklung verbinden.

**Abschnitte:** A1: Kompetenzen und Bedarf. A2: Beurteilung und Gespräch. A3: Entwicklungsmaßnahmen. A4: Transfer und Wirkungskontrolle.

**MAKEL-Fall:** MAKEL führt ein neues digitales Lagerverfahren ein.

**Aufgabe 1:** Plane eine Maßnahme für Mitarbeitende ohne Erfahrung mit dem neuen System. **Lösungskriterium:** Konkretes Lernziel, passende Einweisung, Übungsfall und Transferkontrolle; kein allgemeiner Seminartitel ohne Tätigkeitsbezug.

**Aufgabe 2:** Wie lässt sich prüfen, ob die Schulung hilft, wenn die Fehlerquote vorher und nachher verglichen wird? **Lösungskriterium:** Gleiche Definition, vergleichbare Tätigkeiten, geeigneter Zeitraum und weitere Einflussfaktoren berücksichtigen; sinkende Quote allein beweist keine Kausalität.

**Typischer Fehler:** Beurteilung als Persönlichkeitsurteil statt als nachvollziehbares Feedback formulieren. **Grundlage:** Büromanagement LF 8 K5 und LF 7.

#### IK-LF12-K07 · Arbeitsverhältnisse beenden

**Lehrplananker:** KMK S. 21, Kompetenzbezug: Verschiedene Beendigungswege unterscheiden; ergänzend Rechtserhebliche Informationen für einen Fall sammeln und Abmahnung, Kündigung und Zeugnis funktional abgrenzen.

**Lernziele:** Du kannst (1) Verschiedene Beendigungswege unterscheiden, (2) Rechtserhebliche Informationen für einen Fall sammeln und (3) Abmahnung, Kündigung und Zeugnis funktional abgrenzen.

**Abschnitte:** A1: Beendigungsarten. A2: Abmahnung und Kündigungsprüfung. A3: Ablauf und Dokumente. A4: Arbeitszeugnis und respektvolle Kommunikation.

**MAKEL-Fall:** MAKEL muss einen konkreten Personalvorgang sorgfältig dokumentieren.

**Aufgabe 1:** Warum lässt sich eine Kündigungsfrist nicht allein aus der Berufsbezeichnung ableiten? **Lösungskriterium:** Vertragsart, Dauer, anwendbare Regelungen, Schutzvorschriften und genauer Sachverhalt sind erforderlich. Keine unvollständige Fristberechnung als endgültige Lösung präsentieren.

**Aufgabe 2:** Unterscheide sachliche Tätigkeitsbeschreibung und Leistungsbeurteilung im Zeugnis. **Lösungskriterium:** Aufgaben und Beurteilung getrennt einordnen; zulässige Form, Wahrheit und Wohlwollen anhand der einschlägigen Primärquellen prüfen.

**Typischer Fehler:** Drei Abmahnungen als ausnahmslos notwendige oder ausreichende Voraussetzung jeder Kündigung behaupten. **Grundlage:** Büromanagement LF 8 K6; arbeitsrechtliche Einzelfälle aktuell prüfen.

#### IK-LF12-K08 · Personalpolitik mit Kennzahlen prüfen

**Lehrplananker:** KMK S. 21, Kompetenzbezug: Personalstatistiken mit definierten Bezugsgrößen berechnen; ergänzend Quantitative und qualitative Ziele verbinden und Verbesserungen mit Messkriterien begründen.

**Lernziele:** Du kannst (1) Personalstatistiken mit definierten Bezugsgrößen berechnen, (2) Quantitative und qualitative Ziele verbinden und (3) Verbesserungen mit Messkriterien begründen.

**Abschnitte:** A1: Daten und Definitionen. A2: Personalbezogene Kennzahlen. A3: Ziele und Bewertung. A4: Maßnahmen, Datenschutz und Reflexion.

**MAKEL-Fall:** MAKEL wertet eine ausdrücklich fiktive Personalperiode aus.

**Aufgabe 1:** Vier Austritte bei durchschnittlich 80 Beschäftigten. Nutze die hier ausdrücklich definierte Quote Austritte/durchschnittlicher Bestand. **Lösungskriterium:** 5 Prozent. Andere Fluktuationsdefinitionen müssen als andere Definitionen gekennzeichnet werden.

**Aufgabe 2:** Warum reicht eine niedrige Fehlzeitenquote allein nicht für die Aussage „alle sind zufrieden“? **Lösungskriterium:** Kennzahl misst nicht unmittelbar Zufriedenheit; qualitative Rückmeldungen, Bedingungen, Datenschutz und mögliche andere Ursachen ergänzen.

**Typischer Fehler:** Kleine Personengruppen durch detaillierte Auswertungen indirekt identifizierbar machen. **Grundlage:** Büromanagement LF 8; Kennzahlen und qualitative Bewertung ergänzen.

### LF 13 · Komplexe betriebliche Problemlösung

#### IK-LF13-K01 · Ein betriebliches Problem untersuchen

**Lehrplananker:** KMK S. 22, Kompetenzbezug: Eine komplexe Fragestellung eingrenzen; ergänzend Prozesse und Schnittstellen vernetzt analysieren und Ursache, Symptom und Datenlücke unterscheiden.

**Lernziele:** Du kannst (1) Eine komplexe Fragestellung eingrenzen, (2) Prozesse und Schnittstellen vernetzt analysieren und (3) Ursache, Symptom und Datenlücke unterscheiden.

**Abschnitte:** A1: Auftrag und Systemgrenze. A2: Prozess- und Schnittstellenbild. A3: Daten und Ursachenhypothesen. A4: Ziele und Rahmenbedingungen.

**MAKEL-Fall:** MAKEL untersucht wiederkehrende verspätete Kundenlieferungen über mehrere Abteilungen hinweg.

**Aufgabe 1:** Von 50 Aufträgen sind zehn verspätet. Bei sechs davon wird ein fehlender Freigabeschritt dokumentiert. Was ist sicher belegbar? **Lösungskriterium:** 20 Prozent Verspätungsquote; bei 60 Prozent der verspäteten Fälle fehlt dieser dokumentierte Schritt. Damit ist noch keine alleinige Ursache aller Verzögerungen bewiesen.

**Aufgabe 2:** Formuliere eine prüfbare Problemfrage. **Lösungskriterium:** Zum Beispiel: An welcher Schnittstelle und unter welchen Bedingungen verlängert sich die Durchlaufzeit? Zeitraum, Prozessgrenze und Datenbedarf nennen.

**Typischer Fehler:** Eine zuerst genannte Vermutung unmittelbar zur Ursache erklären. **Grundlage:** Büromanagement LF 11 und LF 13; vernetzter Industriefall.

#### IK-LF13-K02 · Informationen und innovative Lösungen entwickeln

**Lehrplananker:** KMK S. 22, Kompetenzbezug: Geeignete Quellen und Methoden wählen; ergänzend Entwicklungstrends mit dem betrieblichen Problem verbinden und Lösungen anhand transparenter Kriterien vergleichen.

**Lernziele:** Du kannst (1) Geeignete Quellen und Methoden wählen, (2) Entwicklungstrends mit dem betrieblichen Problem verbinden und (3) Lösungen anhand transparenter Kriterien vergleichen.

**Abschnitte:** A1: Recherche auch in fremder Sprache. A2: Datenqualität und Trends. A3: Kreative Lösungsvarianten. A4: Bewertung und Auswahl.

**MAKEL-Fall:** MAKEL vergleicht eine digitale Freigabe, klare Verantwortlichkeiten und zusätzliche Reservebestände.

**Aufgabe 1:** Eine Nutzwertmatrix gewichtet Zuverlässigkeit zu 50 Prozent und Aufwandseignung zu 50 Prozent. A erhält 4/2, B 3/4 Punkte, höher=besser. **Lösungskriterium:** A: 3,0; B: 3,5 Punkte. Gewichtung und Skalenrichtung offenlegen; wirtschaftliche Machbarkeit gesondert prüfen.

**Aufgabe 2:** Welche Informationen fehlen bei einem Anbietertext, der nur „KI spart 50 Prozent“ verspricht? **Lösungskriterium:** Bezugsgröße, Testbedingungen, Vergleich, Daten, Kosten und Datenschutzanforderungen; Werbeaussage nicht als Beleg übernehmen.

**Typischer Fehler:** Eine neue Technologie allein wegen ihrer Neuheit als beste Lösung einstufen. **Grundlage:** Büromanagement LF 2 K6/LF 11/LF 13; Innovationen problembezogen konkretisieren.

#### IK-LF13-K03 · Die Lösung planen und umsetzen

**Lehrplananker:** KMK S. 22, Kompetenzbezug: Ziele und Maßnahmen in Arbeitspakete übersetzen; ergänzend Verantwortlichkeiten und Risiken koordinieren und Abweichungen methodisch bearbeiten.

**Lernziele:** Du kannst (1) Ziele und Maßnahmen in Arbeitspakete übersetzen, (2) Verantwortlichkeiten und Risiken koordinieren und (3) Abweichungen methodisch bearbeiten.

**Abschnitte:** A1: Lösungsauftrag und Ziele. A2: Projektplan und Zuständigkeiten. A3: Pilot und Umsetzung. A4: Kontrolle und Anpassung.

**MAKEL-Fall:** MAKEL erprobt einen geänderten Freigabeprozess zunächst an einer begrenzten Auftragsgruppe.

**Aufgabe 1:** Drei zwingend aufeinanderfolgende Pakete dauern 2, 3 und 1 Arbeitstage; keine Wartezeit. Mindestdauer? **Lösungskriterium:** 6 Arbeitstage. Parallelisierung ist nur zulässig, wenn fachliche Abhängigkeiten das tatsächlich erlauben.

**Aufgabe 2:** Welche Abbruch- oder Anpassungsregel ist für einen Pilotversuch sinnvoll? **Lösungskriterium:** Vorab messbare Qualitäts-/Sicherheitsgrenzen, Zuständigkeit und Rückfallweg definieren; nicht erst nach einem Fehlschlag Kriterien erfinden.

**Typischer Fehler:** Ein Pilotproblem ohne Prüfung sofort auf alle Aufträge ausrollen. **Grundlage:** Büromanagement LF 13 und neues LF 2; komplexere Schnittstellen.

#### IK-LF13-K04 · Ergebnis, Wirkung und Vorgehen beurteilen

**Lehrplananker:** KMK S. 22, Kompetenzbezug: Ergebnis und Zielerreichung nachvollziehbar dokumentieren; ergänzend Wechselwirkungen und Nebenfolgen bewerten und Eine adressatengerechte Präsentation und Verbesserung ableiten.

**Lernziele:** Du kannst (1) Ergebnis und Zielerreichung nachvollziehbar dokumentieren, (2) Wechselwirkungen und Nebenfolgen bewerten und (3) Eine adressatengerechte Präsentation und Verbesserung ableiten.

**Abschnitte:** A1: Ergebnisdokumentation. A2: Ziel- und Wirkungsprüfung. A3: Präsentation und Rückfragen. A4: Reflexion und kontinuierliche Verbesserung.

**MAKEL-Fall:** MAKEL bewertet den Piloten und entscheidet über weitere Verwendung.

**Aufgabe 1:** Verspätete Aufträge sinken in einer vergleichbar definierten Stichprobe von 20 auf 10 Prozent. Beschreibe absolute und relative Veränderung. **Lösungskriterium:** 10 Prozentpunkte Rückgang beziehungsweise 50 Prozent relative Verringerung. Vergleichbarkeit und andere Einflüsse gesondert prüfen.

**Aufgabe 2:** Was gehört in die Vorstellung einer Lösung, wenn Liefertermine besser, aber Bestände höher geworden sind? **Lösungskriterium:** Beide Wirkungen, Kosten, Zielkonflikt, Datenbasis, Grenzen und begründete Empfehlung offenlegen; keine reine Erfolgserzählung.

**Typischer Fehler:** Schulisches Abschlussprojekt als bereits genehmigte persönliche Prüfungsfachaufgabe behandeln. **Grundlage:** Büromanagement LF 11/LF 13; § 12 der Ausbildungsordnung getrennt berücksichtigen.

## 16. Vollständigkeit und Redaktionsnachweis

Alle 13 Lernfelder haben eine eigene Kapitelplanung. Gesamt: 85 Kapitel, 255 Lernziele, 340 Abschnittsvorschläge und 170 Aufgabenentwürfe. Die Zahlen sind Strukturkontrollen und kein Qualitätszertifikat für noch nicht geschriebene Lerntexte.

Für jede Kompetenzpassage des Lehrplans legt Claude im Repository eine Zuordnung zu Kapitel, Abschnitt und prüfender Aufgabe an. Querschnittsthemen (Sprache, Zusammenarbeit, Digitalisierung, Nachhaltigkeit, Datenschutz) werden darin mitbelegt. Nicht ausdrücklich im Lehrplan genannte Methoden werden als didaktische Konkretisierung erkennbar gehalten. NRW-Bündelungsfächer oder berufsübergreifende Fächer werden nicht als bereits vollständig abgedeckt behauptet.

Der Auftrag ist auf bundesweiten berufsbezogenen Inhalt der Neuordnung 2024 zugeschnitten. Eine genaue NRW-Fachsortierung darf Claude ergänzen, wenn die Quelle erreichbar und geprüft ist; sie darf die nationale Grundstruktur nicht blockieren. Aktuelle gesetzliche Parameter, echte Prüfungstermine und persönliche Prüfungsfachaufgaben werden nicht aus fiktiven Aufgabenwerten abgeleitet.
