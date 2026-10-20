# MAKEL, Englisch und Prüfungsvorbereitung

Stand: 20.10.2026. Ergänzung zum [Gesamtplan](01-gesamtplan.md).

## 1. Unternehmenswelt

Die bestehende `quellen/musterunternehmen.json` bleibt die gemeinsame Quelle für Identität, Personen und bestehende Konditionen. Gelesen am Planungsstand `cd4d6cf37164260ddc32584a7820df1f1e1c352c`: MAKEL ist eine Düsseldorfer Streetwear-GmbH mit eigener Musterfertigung, Textildruck/Veredelung und Qualitätskontrolle; Serienfertigung und Stoffbeschaffung erfolgen teilweise extern. Die dortige grobe Fertigungstiefe wird nicht stillschweigend geändert.

Für die Unterrichtsfälle drei Abläufe klar unterscheiden:

| Weg | Material und Tätigkeit | Didaktischer Schwerpunkt |
|---|---|---|
| Muster | Stoffe und Zubehör, eigene Mustererstellung | Produktentwicklung, Stückliste, Einzelauftrag |
| Veredelung | Zugekaufte Rohlinge, eigener Druck und Prüfung | Rüsten, Kapazität, Qualität, eigene Wertschöpfung |
| Externe Serie | Beauftragte Lohnfertigung mit definierten Unterlagen | Lieferantensteuerung, Schnittstellen, Logistik und Make-or-buy |

Für Fließ-/Massenfertigung, spezielle Lagertechnik und andere nicht sinnvoll bei MAKEL vorhandene Verfahren ergänzende, ausdrücklich andere Betriebe verwenden. MAKEL nicht nachträglich zum vollintegrierten Chemie-, Metall- oder Textilwerk erklären.

## 2. Fiktives Produktionsfallpaket P1

Diese Werte sind **neue didaktische Fallannahmen**, keine Änderung der bestehenden Jahresstammdaten. Sie werden als zusammengehöriges Paket gepflegt; unabhängige Kapitelaufgaben können ausdrücklich andere Werte besitzen.

| Datum des Falls | Wert und Konvention |
|---|---|
| Auftrag | 400 bedruckte Hoodies, ein Druckmotiv, vollständiger Absatz |
| Rohling | Ein Rohling je fertigem Teil, Netto-Einkaufspreis im Fall 20 Euro |
| Druckmaterial | 20 Gramm je Stück, Netto-Preis im Fall 50 Euro je Kilogramm |
| Verpackung | Ein Stück je fertigem Teil, Netto-Preis 0,50 Euro |
| Materialmenge | 400 Rohlinge, 8 Kilogramm Druckmaterial, 400 Verpackungen; kein Ausschusszuschlag |
| Materialeinzelkosten | 8.000 + 400 + 200 = 8.600 Euro, also 21,50 Euro je Stück |
| Maschinenzeit | 60 Minuten Rüsten und 3 Minuten je Stück = 1.260 Minuten = 21 Stunden |
| Maschinenstundensatz | Vorgegebene 40 Euro je Stunde einschließlich der im Satz benannten Maschinenkosten |
| Maschinenkosten | 840 Euro insgesamt; keine zusätzliche Rüstkostenpauschale für denselben Rüstvorgang |
| Direkte Arbeitszeit | Vorgegebene 25 Stunden zu 24 Euro = 600 Euro; diese Arbeitszeit wird im Maschinenstundensatz ausdrücklich nicht mitgerechnet |
| Verfügbare Maschinenkapazität | 24 produktive Stunden im vorgegebenen Zeitraum; Belegung 87,5 Prozent, Rest 3 Stunden |
| Gegebene sonstige Herstellgemeinkosten | 960 Euro für diesen Auftrag; ausdrücklich ohne die schon erfassten Maschinen- und direkten Lohnkosten |
| Vereinfachte Herstellkosten | 8.600 + 840 + 600 + 960 = 11.000 Euro; 27,50 Euro je Stück |
| Verwaltung und Vertrieb im KLR-Fall | Zusammen vorgegebene 1.000 Euro; Selbstkosten 12.000 Euro beziehungsweise 30 Euro je Stück |
| Verkauf im Fall | 40 Euro netto je Stück ohne Skonto und Rabatt; 16.000 Euro Nettoerlös |
| Vereinfachtes Auftragsergebnis | 4.000 Euro nach den vollständig vorgegebenen Selbstkosten; keine Aussage zum gesamten MAKEL-Jahresgewinn |

Herstellkosten der Kostenrechnung sind nicht automatisch die handelsrechtlichen Herstellungskosten. Für einen Bilanzierungsfall die einbezogenen Positionen und Wahlrechte getrennt und mit aktueller Quelle bestimmen. Die Wertansätze des P1-KLR-Falls nicht ungeprüft als Bilanzansätze verwenden. Für Deckungsbeitragsaufgaben die Kosten zusätzlich nach kurzfristig variabel/vermeidbar aufteilen; die obige Vollkostenliste allein liefert diese Aufteilung nicht.

### Zuständigkeiten aus dem Bestand

- Deniz: Einkauf und Produktion; Jonas: Lager und Versand.
- Marlene: Vertrieb; Sandra: Buchführung und Ausbildungsbegleitung.
- Ayla: Personal; Tobias: kaufmännische Steuerung; Yuki: Strategie.
- Luca kann in eindeutig gekennzeichneten Fehlersuchaufgaben auftreten.

IDs, Schreibweisen und tatsächliche Rollen bei Umsetzung aus der aktuellen Stammdatei übernehmen. Keine zusätzlichen Familien-, Nutzer- oder Kontodaten in die Beispiele aufnehmen.

### Vorhandene Daten nicht ungeprüft ausweiten

Die Stammdatei enthält unter anderem pauschale Café-Umsatzsteueraussagen, Standard-Mahngebühren und Beispiel-Nutzungsdauern. Das sind keine automatische Grundlage für neue rechtliche Falllösungen. Besonders Café-/Getränkesteuersätze, Erstattungsfähigkeit von Mahnkosten und steuerliche Nutzungsdauerannahmen sind außerhalb dieses Industriekaufleute-Auftrags nicht als geprüft zu behandeln. Neue Industriefälle nutzen eigene eindeutige Sachverhalte und aktuelle Quellen. Keine sachfremde globale Bereinigung der bestehenden Aufgaben ohne gesonderte Begründung.

## 3. Gemeinsame Beleg- und Datenregeln

1. Gemeinsame Stammdaten von fallbezogenen Zahlen unterscheiden. Eine Aufgabe überschreibt keine globalen Preise.
2. Für jeden vernetzten Fall eine Fallkennung, Zeitraum, Quellenannahmen, Einheiten und Netto-/Bruttokonvention hinterlegen.
3. Bei zufälliger Aufgabenauswahl notwendige Ausgangswerte wiederholen. Folgeaufgaben entweder unabhängig lösbar machen oder Ersatz-Zwischenwerte und Folgefehlerregeln anbieten.
4. Einkaufs-, Produktions-, Lager- und Buchungsbelege eines Fallpakets müssen mengen- und wertmäßig zusammenpassen.
5. Industrielle Konten von Material, Rohlingen, Handelswaren und eigenen Erzeugnissen fachlich prüfen; nicht mit erfundenen Kontonummern auffüllen.
6. Rechtliche Störungen enthalten alle entscheidenden Angaben: Vertragsrolle, Vereinbarung, Zugang, Fälligkeit, Entdeckungszeitpunkt und gegebenenfalls weitere Tatsachen.
7. Keine echten IHK-/AkA-Aufgabentexte oder geschützten Aufgabenbilder kopieren.

## 4. Berufsbezogenes Englisch

Ziel: vier neue 20er-Blöcke mit stabilen Industriekaufleute-Kennungen. Je Eintrag englischer Begriff, kontextbezogene deutsche Bedeutung und eigener Beispielsatz aus der Unternehmenswelt. Beide Lernrichtungen und vorhandene Wiederholungsmechanik nutzen. Polyseme Wörter im Kontext eindeutig machen. Der bestehende Büromanagement-Wortschatz und sein Lernstand bleiben erhalten.

| Block | Geplante 20 Begriffe mit Arbeitsübersetzung |
|---|---|
| IK 1 · Orders and purchasing | enquiry – Anfrage; quotation – Angebot; purchase order – Bestellung; order confirmation – Auftragsbestätigung; supplier – Lieferant; customer – Kunde; delivery date – Lieferdatum; payment terms – Zahlungsbedingungen; discount – Rabatt; cash discount – Skonto; invoice – Rechnung; due date – Fälligkeitstermin; complaint – Beschwerde; defect – Mangel; replacement – Ersatz; refund – Erstattung; quantity – Menge; specification – Spezifikation; lead time – Vorlauf-/Durchlaufzeit im jeweiligen Kontext; outstanding payment – ausstehende Zahlung |
| IK 2 · Production and logistics | raw material – Rohstoff; blank garment – unveredeltes Kleidungsstück/Rohling; finished goods – fertige Erzeugnisse; work in progress – unfertige Erzeugnisse; bill of materials – Stückliste; work schedule – Arbeitsplan im Fertigungskontext; batch – Los; setup time – Rüstzeit; capacity – Kapazität; bottleneck – Engpass; quality control – Qualitätskontrolle; reject – fehlerhaftes Teil; rework – Nacharbeit; warehouse – Lager; inventory – Bestand; stocktaking – Inventur; picking – Kommissionierung; shipment – Sendung; carrier – Frachtführer; supply chain – Lieferkette |
| IK 3 · Accounting and control | asset – Vermögensgegenstand; liability – Verbindlichkeit; equity – Eigenkapital; revenue – Erlös; expense – Aufwand; cost – Kosten; profit – Gewinn; loss – Verlust; balance sheet – Bilanz; income statement – Gewinn- und Verlustrechnung; depreciation – Abschreibung; fixed costs – fixe Kosten; variable costs – variable Kosten; contribution margin – Deckungsbeitrag; break-even point – Gewinnschwelle; cost centre – Kostenstelle; overheads – Gemeinkosten; cash flow – Cashflow; liquidity – Liquidität; investment – Investition |
| IK 4 · People, markets and projects | recruitment – Personalbeschaffung; vacancy – freie Stelle; applicant – Bewerber/Bewerberin; employment contract – Arbeitsvertrag; payroll – Entgeltabrechnung; gross pay – Bruttoentgelt; net pay – Nettoentgelt; training – Aus-/Weiterbildung im Kontext; staff turnover – Personalfluktuation; target group – Zielgruppe; market research – Marktforschung; competitor – Wettbewerber; pricing – Preisgestaltung; distribution channel – Vertriebsweg; campaign – Kampagne; project scope – Projektumfang; milestone – Meilenstein; deadline – Frist; stakeholder – Anspruchsgruppe; evaluation – Auswertung |

Die Arbeitsübersetzungen sind Redaktionsvorgaben, keine Behauptung, ein Wort habe in jeder Situation dieselbe Bedeutung. Überschneidungen mit vorhandenen allgemeinen Vokabeln nicht als vermeintlich neue Bedeutungen aufblasen.

## 5. Prüfungsgrundlagen

Grundlage ist die [Industriekaufleuteausbildungsverordnung 2024](https://www.gesetze-im-internet.de/indkflausbv/) mit [§ 8](https://www.gesetze-im-internet.de/indkflausbv/__8.html), [§ 11](https://www.gesetze-im-internet.de/indkflausbv/__11.html), [§ 12](https://www.gesetze-im-internet.de/indkflausbv/__12.html), [§ 13](https://www.gesetze-im-internet.de/indkflausbv/__13.html) und [§ 14](https://www.gesetze-im-internet.de/indkflausbv/__14.html). Vor Auslieferung aktuelle Fassung nochmals prüfen.

| Reale Prüfungsbereiche | Dauer | Anteil am Gesamtergebnis |
|---|---:|---:|
| Teil 1: Leistungserstellung, Logistik, Beschaffung und Buchhaltung | 90 Minuten | 25 % |
| Teil 2: Marketing, Vertrieb, Personal und kaufmännische Steuerung/Kontrolle | 150 Minuten | 35 % |
| Fachaufgabe im Einsatzgebiet | Präsentation und Fachgespräch zusammen 30 Minuten, zusätzlich Erstellung gemäß § 12 | 30 % |
| Wirtschafts- und Sozialkunde | 60 Minuten | 10 % |

Keine pauschale Umrechnung jeder Übungsprozentzahl in ein garantiertes Prüfungsergebnis. Bestehensregeln und Gewichtung getrennt darstellen. Eine aus vier Bereichen berechnete Gesamtwertung darf nur dann vollständig sein, wenn alle erforderlichen Teilwerte vorhanden sind. Ohne tatsächliche oder selbst eingetragene Fachaufgabenbewertung „unvollständig“ statt fiktiver Gesamtnote anzeigen.

## 6. Eigene AP1-Übungsvorlage

LF 1–7 bilden die vorgesehene schulische Grundlage vor Teil 1. Die folgende 100-Punkte-Aufteilung ist eine **eigene AzubiPass-Übungsvorlage**, keine amtliche Gewichtung einzelner Lernfelder.

| Aufgabenblock | Inhalt | Punkte | Richtzeit |
|---|---|---:|---:|
| 1 | Produktionsauftrag, Unterlagen, Anforderungen | 10 | 8 Min. |
| 2 | Stückliste, Kapazität, Durchlaufzeit | 10 | 10 Min. |
| 3 | Wirtschaftlichkeit, Gewinnschwelle oder Eigen-/Fremdbezug | 10 | 10 Min. |
| 4 | Lagerkennzahl und Bestandsdaten | 10 | 8 Min. |
| 5 | Logistikkonzept und begründete Auswahl | 10 | 8 Min. |
| 6 | Beschaffungsrechnung und Lieferantenvergleich | 15 | 12 Min. |
| 7 | Bestellung, Rechnungskontrolle oder Lieferstörung | 10 | 9 Min. |
| 8 | Grundbuchungen und Belegprüfung | 10 | 9 Min. |
| 9 | Material, Steuer und Bestandsveränderung | 10 | 9 Min. |
| 10 | Abschreibung, Abstimmung und Ergebnisinterpretation | 5 | 7 Min. |
| **Gesamt** | | **100** | **90 Min.** |

Kommunikation, Datenqualität, Nachhaltigkeit und Zusammenarbeit innerhalb passender Aufgaben bewerten. Kein neues Fachwissen aus LF 8–13 voraussetzen, das nicht ausdrücklich als Grundwissen oder als vorgegebene Information verfügbar ist.

## 7. Eigene AP2- und WiSo-Vorlagen

### Schriftlicher Hauptbereich: 150 Minuten, 100 Übungspunkte

| Gruppe | Aufgabenbezug | Punkte | Richtzeit |
|---|---|---:|---:|
| Marketing | Zielgruppe, Strategie, Marketing-Mix und Kontrolle | 25 | 35 Min. |
| Vertrieb | Angebots-/Kundenprozess, Kommunikation und internationale Aspekte | 20 | 30 Min. |
| Personal | Bedarf, Auswahl, Einsatz, Abrechnung und Rechtsprüfung | 25 | 40 Min. |
| Kaufmännische Steuerung | KLR, Entscheidung, Jahresabschluss und Finanzierung | 30 | 45 Min. |
| **Gesamt** | | **100** | **150 Min.** |

### WiSo: 60 Minuten, 100 Übungspunkte

| Gruppe | Inhalt | Punkte |
|---|---|---:|
| Ausbildung | Rechte, Pflichten und duales System | 15 |
| Arbeitswelt | Beteiligung, Arbeitsrecht und soziale Absicherung | 20 |
| Wirtschaftsordnung | Märkte, Wettbewerb und gesellschaftliche Zusammenhänge | 20 |
| Wirtschaftspolitik | Konjunktur, staatliche Maßnahmen und Geldpolitik | 20 |
| Internationales und Verantwortung | Globale Verflechtung und nachhaltige Entscheidungen | 15 |
| Vernetzter Fall | Mehrere berufliche und gesellschaftliche Perspektiven verbinden | 10 |
| **Gesamt** | | **100** |

Für beide Vorlagen keine amtliche Aufgabenverteilung behaupten. WiSo nicht mit LF 11 gleichsetzen; die Inhalte aus mehreren Lernfeldern und gegebenenfalls aktuellen ergänzenden Vorgaben zusammenführen.

### Varianten und Auswertung

- Mindestens drei reproduzierbar geprüfte Varianten je AP1-, schriftlicher AP2- und WiSo-Vorlage. Das sind neun geprüfte Beispielbögen; die Zahl sagt nichts über die Anzahl zulässiger generierter Varianten aus.
- Varianten dürfen aus geeigneten vorhandenen Aufgabenbausteinen entstehen. Neue Zahlen müssen vollständige, lösbare und plausibel begrenzte Fälle erzeugen.
- Ergebnisse mit Musterweg, Teilpunkten, sachgerechter Selbstbewertung offener Antworten und Hinweis auf Folgefehler darstellen. Automatische Bewertung nicht vortäuschen, wenn die Antwortform sie nicht trägt.
- Lernmodus erlaubt Lösungshinweise; Prüfungsmodus zeigt sie erst nach Abgabe. Speichern, Fortsetzen und Timer nach bestehendem Verhalten erhalten.
- Fragen nach Rechtsfolgen enthalten genügend Tatsachen. Fehlende individuelle Steuer- oder Personaldaten nicht mit stillen Standardannahmen ergänzen.

## 8. Fachaufgabe im Einsatzgebiet

Ein eigener achtteiliger Vorbereitungsleitfaden, zusätzlich zu den 85 Fachkapiteln:

1. **Geeignete echte Aufgabe finden:** betrieblicher Prozess, eigener Beitrag, Alternativen, Entscheidung und auswertbares Ergebnis.
2. **Anforderungen und Antrag prüfen:** gewähltes Einsatzgebiet und aktueller Ablauf der zuständigen Kammer; Antrag vor Durchführung zur Genehmigung vorlegen.
3. **Ziele und Bewertungskriterien festlegen:** Ausgangslage, Aufwand, messbarer Nutzen, Risiken und Beteiligte.
4. **Durchführung nachvollziehbar dokumentieren:** eigene Entscheidungen, tatsächlich verwendete Daten und begründete Vorgehensweise.
5. **Dokumentation erstellen:** drei bis fünf Seiten; zulässige ergänzende praxisübliche Unterlagen und aktuelle Formvorgaben beachten.
6. **Präsentation vorbereiten:** Planung, Durchführung und Auswertung; Präsentation höchstens zehn Minuten innerhalb der insgesamt 30 Minuten für Präsentation und Fachgespräch.
7. **Fachgespräch üben:** Auswahlbegründung, Alternativen, Fehler, Schnittstellen, Rechts-/Datenfragen und wirtschaftliche Bewertung erläutern.
8. **Selbst prüfen:** nachvollziehbare Aufgabenstellung, eigener Beitrag, roter Faden, belegte Zahlen, Grenzen und Reflexion.

§ 12 gewichtet innerhalb dieses Prüfungsbereichs Dokumentation mit 10 Prozent, Präsentation mit 20 Prozent und Fachgespräch mit 70 Prozent. Die dortigen Erstellungszeiten (Dokumentation bis zu 16 Stunden, Präsentation bis zu acht Stunden) von der betrieblichen Durchführung der Aufgabe und vom mündlichen Termin unterscheiden. Maximal drei Seiten ergänzende praxisübliche Unterlagen nach der aktuellen Verordnung prüfen.

Der Leitfaden verwendet einen gekennzeichneten MAKEL-Probefall. Er ersetzt keine persönliche betriebliche Leistung, keine Genehmigung und kein echtes Fachgespräch. Keine automatische „offizielle Benotung“ versprechen. Keine Uploadpflicht für vertrauliche Betriebsunterlagen schaffen.
