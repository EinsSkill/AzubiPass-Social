# Review Fachkorrekturen Schritt 1 · ChatGPT · 27.10.2026

## Ergebnis

**Nachbesserung vor Merge empfohlen.** Die zentralen Rechenkorrekturen funktionieren. Es bleiben **sechs Befunde: K01 hoch, K02–K05 mittel, K06 niedrig/offener Normabgleich**. Besonders der neue Verpackungsrechtstext und die Leasingregel sind fachlich noch nicht freigabefähig. Ein Stand-Hinweis behebt diese inhaltlichen Probleme nicht.

**Geprüfter App-Stand:** `8166b368a051b500cb8e2b12aa6fe550902130cc`. **Branch:** `inhalt-korrekturen-2026-10-27`. Gelesener Übergabestand: `b4c88c8`; die Differenz von `8166b36` zu diesem Stand betrifft ausschließlich `doku/audit/2026-10-27-inhalt-korrekturen.md` und `doku/community/uebergabe.md`. `quellen/` und `docs/` sind identisch.

**Vorgänger:** Claude, Fachkorrekturen Schritt 1 auf Grundlage der beiden in der Übergabe benannten Audits. **Eigene Rolle:** Gegenprüfung der Änderungen, keine Umsetzung. Maßgeblich waren der Diff gegen `main`-Basis `f943f65`, die aktuellen Quelldaten, der gebaute Stand, eigene Rechengegenproben und die unten verlinkten Primärquellen. Der hier nicht im Branch enthaltene frühere ChatGPT-Bericht wurde nicht als frisch gelesene Quelle ausgegeben.

**Umfang:** die fünf beauftragten Schwerpunkte. Lehrplanlücken und genereller Ausbau der Langfassungen sind ausgenommen. Lokale Arbeit ausschließlich an Reviewdokumentation/Belegen, keine Inhaltskorrektur, keine produktive Datenänderung und kein Merge.

## Bestätigte Korrekturen

| Gegenstand | Eigene Prüfung / Ergebnis |
|---|---|
| LF6 K4 Abschlusskette | Buchungsrichtungen stimmen. Der Mini-Abschluss mit 12.000 € Aufwand, 35.000 € Ertrag, 50.000 € Bank und 27.000 € altem EK geht auf. Nach den fünf Abschlussbuchungen sind die ursprünglichen Konten einschließlich GuV ausgeglichen; SBK-Zugänge sind 50.000 € auf beiden Seiten. |
| LF6 K7 Gehalt | Unter den ausdrücklich vereinfachten Übungsannahmen SV-AN 634,50 €, SV-AG 634,50 €, Steuern einschließlich vorgegebenem SolZ/Kirchensteuer 515,25 €, Netto 1.850,25 €, Gesamtzahlung 3.634,50 €. Abzugsleiter anhand ihrer tatsächlichen Stufen nachgerechnet; alle drei Gehaltsbuchungen ausgeglichen, die drei Verbindlichkeitskonten danach null. |
| Pflegeversicherung/Jahreswerte | 3,6 % allgemeiner Beitrag und 1,8/1,8 außerhalb Sachsens ohne Kinderlosenzuschlag bzw. Mehrkinderabschläge passen. Die 2,9 % sind der bekanntgegebene durchschnittliche KV-Zusatzbeitrag 2026, kein für alle Kassen identischer tatsächlicher Satz. Übungscharakter der Steuerrechnung ist nun benannt; das ist keine realistische individuelle Lohnabrechnung. |
| LF6 K5 Skonto | Geänderte Skontobuchungen auf die im Projekt verwendeten Nachlass-/Erlösberichtigungskonten passen. Der Ausschluss der Umsatzsteuer in der betreffenden K5-Aufgabe ist sichtbar; die neue K6-Aufgabe ergänzt die Steuerkorrektur. |
| LF6 K6 Steuerberichtigung | Einkaufsbeispiel: 1.190 € Verbindlichkeit an 1.166,20 € Bank, 20 € Nachlass und 3,80 € Vorsteuer. Verkaufsbeispiel: 2.332,40 € Bank, 40 € Erlösberichtigung, 7,60 € USt an 2.380 € Forderung. Die geänderten Buchungen sind ausgeglichen und passen zu § 17 UStG. |
| Neue Aufgabe `buchfuehrung-k6-06` | Sämtliche **51 möglichen Nettowerte** von 1.000 bis 6.000 € in 100-€-Schritten unabhängig in ganzen Cent nachgerechnet. Original-Rechenmodul liefert für jeden Fall dieselben Beträge. Korrekte Buchung bekommt 6/6, auch bei umgekehrter Zeilenfolge. **102 volle Bewertungen** geprüft. Weitere 1.000 Ziehungen liegen im erlaubten Wertebereich. Ohne Vorsteuerkorrektur keine volle Punktzahl. |
| LF4 K1 ABC-Check | Gesamtwert und Klassengrenze stehen nun im Check; der neue Langfassungsgegenfall erklärt die relative Bedeutung des Verbrauchswerts. Die frühere Abwertung der formal richtigen Antwort ist behoben. |
| LF9 K6 kalkulatorische Zinsen | Gegenfall mit 120.000 € AK, 20.000 € Restwert, 8 Jahren, 5 % und 41.000 € Betriebskosten: AfA 12.500 €, Durchschnittskapital 70.000 €, Zinsen 3.500 €, Gesamtkosten 57.000 €. Kurztext, Langtext und Karte nennen die korrigierte Restwertformel. |
| LF12 K4 Verpflegung | 14/28 € im Inland sind bestätigt. Dreitagesfall: 14 € + 11,20 € + 8,40 € = **33,60 €**. Kürzung vom vollen Tagessatz ist richtig. In der Aufgabe sind die Pauschalen Fallvorgaben; ihre Rechenlogik wurde nicht geändert. |
| LF3 K5 Kleinbetragsrechnung | Grenze **bis einschließlich 250 € Gesamtbetrag** ist richtig. Die Sonderausnahmen aus § 33 UStDV bleiben bei weiterem Ausbau zu beachten; hier kein eigener neuer Blocker. |
| LF2 K5 DSGVO | Ein Monat und ggf. Verlängerung um zwei weitere Monate mit Mitteilung und Begründung innerhalb des ersten Monats entspricht Art. 12 Abs. 3. |
| Lehrjahre/Vorausverweise | LF5 in Jahr 2, LF9/LF10 in Jahr 3; Formulierungen mit zukünftig zu lernender Buchführung sind gegenüber den bisherigen Rückverweisen verbessert. |

## K01 · Hoch · Verpackungsrecht: neuer Text und Stand-Hinweis sind für Oktober 2026 überholt

**Fundstelle:** `quellen/ik2024-lf07-k05.kapitel.json:147`, Abschnitt a3, neu konkretisierter Absatz samt `standhinweis`; entsprechend `docs/ik2024-lf07.html`.

**Befund:** Der Absatz begründet Pflichten weiterhin mit dem Verpackungsgesetz; der Hinweis behauptet, die PPWR gelte seit 12.08.2026 **neben** diesem. Die Zentrale Stelle Verpackungsregister erklärt ausdrücklich, dass PPWR und **VerpackDG** das bisherige Verpackungsgesetz am 12.08.2026 abgelöst haben. Der aktuelle amtliche Gesetzestext bestätigt das VerpackDG einschließlich Übergangsregeln. Damit wurde der offene Prüfmarker durch eine als geprüft ausgewiesene, aber veraltete Rechtsrahmendarstellung ersetzt.

Zusätzlich ist die neue Gegenüberstellung „Versandkarton an Privatkunden“ gegenüber „Transportverpackung im Großhandel“ zu grob: Die PPWR ordnet Verpackungen des elektronischen Handels den Transportverpackungen zu; deren Systembeteiligung ist nicht allein an den bisherigen Begriffen zu erklären. Hersteller-/Erzeugerrolle, Vertriebsweg und Verpackungsart müssen nachvollziehbar auf den MAKEL-Fall angewandt werden. Rücknahme bzw. Verwertung nicht systembeteiligungspflichtiger Verpackungen ist nicht mit einem beliebigen „entsorgen lassen“ erledigt.

**Vorschlag:** Den Absatz knapp auf PPWR + VerpackDG aktualisieren. Erzeuger/Hersteller zunächst unterscheiden, dann für einen konkret beschriebenen MAKEL-Onlineversandfall Registrierung/Systembeteiligung erläutern. Für gewöhnliche B2B-Transportverpackungen Rücknahme und ordnungsgemäße Verwertung getrennt erklären; keine allgemeine Gleichsetzung von B2B und Befreiung. Einzelne Übergangsfristen nur aufnehmen, wenn sie für den Fall gebraucht werden.

**Abnahme:** (1) Stand-Hinweis nennt den zutreffenden aktuellen Rechtsrahmen. (2) Ein Onlineversandfall und ein gewöhnlicher B2B-Transportfall führen zu begründeten, unterschiedlichen Pflichten. (3) Der alte Hinweis wird nicht lediglich umdatiert. Quelle: [ZSVR Rollen/Pflichten](https://www.verpackungsregister.org/hilfe/rollen-pflichten), [ZSVR Versand/Onlinehandel](https://www.verpackungsregister.org/themen/versand-und-onlinehandel), [amtliches VerpackDG](https://www.gesetze-im-internet.de/verpackdg/BJNR0CF0B0026.html).

## K02 · Mittel · Leasing: 40–90 % allein reicht nicht; Bilanzkennzahlen bleiben nicht generell unverändert

**Fundstelle:** `quellen/lf9-k5-leasing.kapitel.json:138` und `:152`, Grafikdetail und Stand-Hinweis.

**Befund:** Die neue Aussage verknüpft die Zurechnung beim Leasinggeber mit einer Grundmietzeit zwischen 40 und 90 % der Nutzungsdauer, ohne den Vertragstyp zu begrenzen. Der BMF-Erlass unterscheidet insbesondere Verträge ohne Option, mit Kaufoption und mit Verlängerungsoption sowie Spezialleasing. Eine günstige Kaufoption kann trotz passender Mietzeit zur Zurechnung beim Leasingnehmer führen. Der allgemeine Hinweis auf Vertragsabhängigkeit unter der Grafik präzisiert die konkrete Regel nicht ausreichend.

Auch „Die Bilanzkennzahlen des Nutzers bleiben unberührt“ ist falsch verallgemeinert: Keine Aktivierung des Leasingobjekts und keine entsprechende Finanzierungsverbindlichkeit bedeuten nicht, dass Ergebnis, liquide Mittel, Eigenkapital oder daraus berechnete Kennzahlen durch Leasingraten unverändert bleiben.

**Vorschlag:** Auf einen ausdrücklich benannten vereinfachten Mobilien-Vollamortisationsfall ohne Option und ohne Spezialleasing begrenzen. Keine allgemeine handelsrechtliche Abnahme allein aus der steuerlichen Faustregel ableiten. Vorteil als „Objekt wird in diesem Fall beim Leasinggeber bilanziert“ beschreiben, keine unveränderten Kennzahlen versprechen.

**Gegenfall/Abnahme:** 8 Jahre Nutzungsdauer, 4 Jahre Grundmietzeit, AK 80.000 €, Kaufoption 1.000 €, linearer Restbuchwert 40.000 €, gemeiner Wert 40.000 €: Die 50-%-Mietzeit allein rechtfertigt keine Zurechnung beim Geber. Normalfall ohne Option danebenstellen. [BMF, Mobilien-Leasing-Erlass, Abschnitt III](https://lsth.bundesfinanzministerium.de/esth/2024/C-Anhaenge/Anhang-21/I/inhalt.html) (gezielte amtliche Suchausgabe abgerufen; Direktabruf zeitweise 503).

## K03 · Mittel · Jobticket-Ausnahme fehlt weiterhin in Langfassung und Zusammenfassung

**Fundstellen:** `quellen/lf8-k4-entgelt.kapitel.json:36`, Langfassung d2; `:256`, Zusammenfassung; gegenüber dem korrigierten Grafikdetail `:162`.

**Befund:** Das Grafikdetail nennt jetzt die steuerfreie Ausnahme nach § 3 Nr. 15 EStG. Langfassung und Zusammenfassung formulieren unverändert uneingeschränkt, geldwerte Vorteile erhöhten das steuerpflichtige Brutto. Damit ist gerade die beauftragte Konsistenz noch nicht erreicht. Eine Leserin der ausführlichen Fassung erhält die pauschale Regel, während erst das Grafikdetail sie einschränkt.

**Vorschlag:** An beiden Stellen „steuerpflichtige geldwerte Vorteile“ schreiben und die Jobticket-Ausnahme kurz verknüpfen. Das gilt auch für das erste Beispiel in d2. Gesamtbrutto und steuerpflichtiges Brutto nicht gleichsetzen.

**Abnahme:** Der zusätzlich zum Lohn gewährte begünstigte ÖPNV-Fall erhöht in keiner Darstellungsform automatisch das Steuerbrutto. Das Gegenbeispiel einer nicht steuerbefreiten Leistung bleibt möglich. [§ 3 Nr. 15 EStG](https://www.gesetze-im-internet.de/estg/__3.html).

## K04 · Mittel · Buchführungspflicht: richtige neue Zahlen, aber Grenze und Ausnahmen weiter inkonsistent

**Fundstellen:** `quellen/k1-grundlagen.kapitel.json:274` und `:289`; `quellen/gemeinsam.json:1100`; Tabelle in K1 a2.

**Befund:** Die Tabelle sagt korrekt **mehr als** 800.000/80.000 €. Zusammenfassung und Glossarkurztext sagen **ab** diesen Beträgen. Genau 800.000 € Umsatz und 80.000 € Gewinn lösen § 141 Abs. 1 AO allein aber nicht aus. Außerdem wird im geänderten Selbsttest weiterhin allen Kaufleuten eine ausnahmslose HGB-Pflicht zugeschrieben, obwohl § 241a HGB kleine Einzelkaufleute unter den gesetzlichen Voraussetzungen befreit. Die steuerliche Pflicht nach § 141 setzt regelmäßig die Mitteilung der Finanzbehörde mit dem gesetzlich bestimmten Beginn voraus.

Die pauschale HGB-Aussage war bereits vorher vorhanden, wird aber im gerade zur Schwellenwertkorrektur überarbeiteten Regelvergleich erneut als richtige Lösung vermittelt. Dies ist eine gezielte fachliche Nachbesserung dieses Abschnitts, kein Auftrag zum Ausbau anderer Lernfelder. Die MAKEL-GmbH bleibt buchführungspflichtig; deren Formkaufmann-Aufgabe wird dadurch nicht falsch.

**Vorschlag:** Überall „mehr als/über“; einen Satz zu § 241a und zum Beginn nach behördlicher Mitteilung ergänzen. HGB-Grundregel und Befreiung sichtbar trennen.

**Abnahme:** Grenzwertfall exakt 800.000/80.000; Überschreitung um 1 €; kleiner Einzelkaufmann über zwei Jahre; GmbH mit kleinen Zahlen. [§ 141 AO](https://www.gesetze-im-internet.de/ao_1977/__141.html), [§ 241a HGB](https://www.gesetze-im-internet.de/hgb/__241a.html).

## K05 · Mittel · B2C-Mangelvereinbarung: Hinweis muss vor der Verbrauchererklärung erfolgen

**Fundstelle:** `quellen/lf4-k6-mangel.kapitel.json:74`, neu formulierter Absatz in b1.

**Befund:** Der Hinweis muss laut neuem Text „vor Vertragsschluss“ erfolgen. § 476 Abs. 1 Nr. 1 BGB verlangt ihn genauer **vor Abgabe der Vertragserklärung des Verbrauchers**. Ein Hinweis nach dessen verbindlicher Bestellung, aber vor der späteren Verkäuferannahme, wäre zwar vor Vertragsschluss, erfüllt diese Anforderung jedoch nicht. Die erforderliche ausdrückliche und gesonderte Vereinbarung wird im Übrigen zutreffend genannt.

**Vorschlag:** Die gesetzliche zeitliche Voraussetzung in verständlicher Form übernehmen: „Bevor der Verbraucher seine verbindliche Erklärung abgibt, muss er eigens über die konkrete Abweichung informiert werden; die Abweichung wird ausdrücklich und gesondert vereinbart.“ Bei B2B nicht suggerieren, jede AGB-Klausel sei schon allein durch deutliche Formulierung wirksam.

**Abnahme:** Zwei zeitlich verschiedene Bestellfälle (Hinweis davor/danach); nur im ersten Fall kann die geschilderte Verbraucherabweichung wirksam vereinbart sein. [§ 476 Abs. 1 BGB](https://www.gesetze-im-internet.de/bgb/__476.html).

## K06 · Niedrig / Normabgleich offen · DIN-Grafik ist noch keine verifizierte maßgenaue Vorlage

**Fundstellen:** `quellen/lf3-k6-din5008.kapitel.json:94`, Anschriftfeld; `:134`, Brieftext; `:196`, neue Maßregel; `quellen/azubipass.js:1144` ff. (`gBrief`).

**Gesichert aus dem Code:** Das SVG verwendet echte A4-Koordinaten mit `viewBox` 210 × 297 als Blatt. Der Brieftext-Zonenanfang bleibt bei x=24 mm, obwohl die neu angegebene Regel 25 mm linken Textrand nennt. Die Zone ist kein ausformulierter Musterbrief, wird aber mit festen Positionen erklärt; die jetzige Beschriftung lässt diese schematische Abweichung nicht erkennen. Auch Anschriftfeld und tatsächlichen Anschrifttext nicht als identische linke Startposition behandeln.

**Prüfgrenze:** Die Verlagsseite zu DIN 5008:2020-03 einschließlich Berichtigung wurde abgerufen, der vollständige Normtext mit seinen Maßtabellen war hier nicht zugänglich. Daher sind die neu eingetragenen 27/45/85/125-mm-Angaben nicht als unabhängig am vollständigen Normtext verifiziert freigegeben. Andere Ratgeber wurden nicht zum Ersatz einer Normprüfung erklärt.

**Vorschlag/Abnahme:** Entweder Grafik ausdrücklich als schematisch kennzeichnen oder die Positionen konsistent zum dokumentierten Normraster ausrichten. Normausgabe und geprüfte Tabellen/Abschnitte dokumentieren; Feldaußenkante, Texteinzug, Form-A/B-Höhen und Informationsblock getrennt prüfen. Die Form-B-y-Korrektur auf 45 mm ist im gebauten SVG-Datensatz angekommen. [DIN Media, aktuelle Normausgabe](https://www.dinmedia.de/de/norm/din-5008/318422674).

## Stand-Hinweise und Konsistenz

- **Verständlich:** Basiszinssatz-Hinweise erklären Lernenden, warum die Aufgabe einen Zinssatz vorgibt und wo reale Werte nachgesehen werden. Das ist hilfreicher als ein redaktioneller „Zu prüfen“-Auftrag.
- **Arbeitszeit:** Unterschied zwischen bereits bestehender Erfassungspflicht und noch nicht umgesetzter allgemeiner ArbZG-Neuregelung ist verständlich. Die bestehende Pflicht ist durch BMAS und den aktuellen § 16 ArbZG eingeordnet. Die konkrete Aussage „Oktober 2026 noch nicht verabschiedet“ sollte bei jeder nächsten Inhaltsfreigabe erneut datiert geprüft werden, nicht nur jährlich.
- **Leasing:** „Stand:“ gefolgt von einer allgemeinen Vertragsabhängigkeit ist sprachlich eher ein Geltungs-/Annahmenhinweis als ein zeitlicher Stand. Niedrige redaktionelle Priorität; die fachliche Reparatur K02 ist wichtiger.
- **Verpackungsrecht:** K01 zeigt die Grenze der Umstellung. Ein offener Fachprüfpunkt darf erst dann zum ruhigen Stand-Hinweis werden, wenn die konkrete Aussage tatsächlich belegt ist.
- **Konsistenz bestätigt:** Gehaltsbeträge und Buchungsdaten; Skontobuchungen; Restwertformel; ABC-Gegenfall; Inlandspauschalen. **Noch offen:** die in K03/K04 beschriebenen abweichenden Aussagen sowie K06.

## Eigene technische Verifikation

1. **Rechencheck:** [Skript](belege-2026-10-27-inhaltreview/rechencheck.cjs), [Ergebnis](belege-2026-10-27-inhaltreview/rechencheck.json). Ausgeführt mit dem unveränderten `quellen/aufgaben.js` in einer Node-VM. Unabhängige Centrechnung für sämtliche 51 neuen Skontowerte; korrekte Antworten direkt in den vom Originalbewerter gelesenen Speicher geschrieben. 1.000 zusätzliche Ziehungen; Quellen-/Build-Aufgabeninhalt stimmt nach Berücksichtigung der vom Build ergänzten Metadaten überein. Keine gemeldeten Fehler. Das ist kein Browserlauf und keine Prüfung aller Aufgabenvarianten der App.
2. **Rendervergleich:** Alle **26 Lernfeldseiten** mit dem Originalrenderer erneut in temporäre HTML-Dateien gerendert und mit den eingecheckten Seiten verglichen: **26/26 bytegleich**. Alle **6 Stand-Hinweise** werden ausgegeben; keine sichtbaren `pruefmarke`-Kästen. [Vergleich](belege-2026-10-27-inhaltreview/rendercheck.json), [Buildausgabe](belege-2026-10-27-inhaltreview/rendercheck.txt). Das bestätigt die Auslieferungskonsistenz, nicht die fachliche Richtigkeit oder Mobilansicht.
3. **IK-Test:** eigener Lauf **8.271 Prüfungen, 0 Fehler, 285 Aufgaben**, [Protokoll](belege-2026-10-27-inhaltreview/ik-test.txt).
4. **Browsergrenze:** `python quellen/funktionstest.py` endet hier beim Import mit `ModuleNotFoundError: No module named 'playwright'`. Playwright ist auch im geprüften primären Python-Runtime nicht verfügbar. Claudes 269/269, Lernkern-Audit und visuelle Prüfung sind als dessen Belege übernommen, **nicht als hier wiederholte eigene Tests**. Keine produktiven Auth-/Communitytests ausgeführt.
5. Nur Dokumentation und Reviewbelege ergänzt. Keine Reviewskripte unter `quellen/`, keine Änderung der generierten Appseiten.

## Quellen und nächster Schritt

Primärquellen abgerufen am 27.10.2026. Ergänzend zu den Quellen bei den Befunden:

- [GKV-Spitzenverband, durchschnittlicher Zusatzbeitrag](https://www.gkv-spitzenverband.de/krankenversicherung/kv_grundprinzipien/finanzierung/zusatzbeitragssatz/zusatzbeitragssatz.jsp), [BMG, Finanzierung der Pflegeversicherung](https://www.bundesgesundheitsministerium.de/themen/pflege/online-ratgeber-pflege/die-pflegeversicherung/finanzierung).
- [§ 17 UStG, amtliche Bereitstellung](https://www.gesetze-im-internet.juris.de/ustg_1980/__17.html).
- [§ 9 Abs. 4a EStG](https://www.gesetze-im-internet.de/estg/__9.html), [§ 33 UStDV](https://www.gesetze-im-internet.de/ustdv_1980/__33.html).
- [DSGVO, Art. 12](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=de). Der direkte EUR-Lex-Abruf war durch eine Robotprüfung blockiert; Frist und Mitteilungspflicht wurden über die [Datenschutzaufsicht Baden-Württemberg](https://www.baden-wuerttemberg.datenschutz.de/betroffenenrechte/) und die amtliche BfDI-Suchausgabe zum Erfahrungsaustausch 2024 gegengeprüft.
- [BMAS, Regelungen zur Arbeitszeit](https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Arbeitnehmerrechte/Regelungen-zur-Arbeitszeit/regelungen-zur-arbeitszeit-art.html), [§ 16 ArbZG](https://www.gesetze-im-internet.de/arbzg/__16.html).

**Übergabe an Claude:** K01–K05 gezielt nachbessern, K06 sauber eingrenzen/nachweisen; Kurztext, Langtext, Grafik und Aufgaben dabei gemeinsam abgleichen. Anschließend korrigierte Gegenfälle und erforderliche Regression dokumentieren. Danach gezielte Schlussprüfung; **Lukes entscheidet über den Merge**. Dieser Bericht erteilt weder Merge- noch Live-Freigabe und erweitert den Auftrag nicht auf Lehrplanlücken oder allgemeine Langfassungen.
