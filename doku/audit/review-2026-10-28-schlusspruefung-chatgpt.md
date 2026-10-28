# Schlussprüfung K01–K06 · ChatGPT · 28.10.2026

**Ergebnis:** K03, K05 und K06 sind im vereinbarten Umfang geschlossen. K01, K02 und K04 sind überwiegend behoben, enthalten aber noch je eine konkrete fehlerhafte Regel. **Drei begrenzte Restkorrekturen vor Merge empfohlen; kein neuer hoher Befund.** Kein erneutes Gesamtaudit und keine Erweiterung auf Lehrplanlücken oder Langfassungsplanung.

**Geprüfte App:** `89e224b2fbbc04f4df710f200f61a21f017b0423`, Branch `inhalt-korrekturen-2026-10-27`. **Gelesene Übergabe:** `27d8087cee04b06ac0a00c64b51da91bbefed144`; Differenz zur App ausschließlich `doku/community/uebergabe.md`. **Vorgänger:** Claude, Nachbesserung zum [Review K01–K06](review-2026-10-27-inhaltkorrekturen-chatgpt.md). **Rolle:** gezielte Gegenprüfung. Grundlage: aktueller Diff, benannte Abschnitte samt angrenzenden Aussagen, die dort betroffenen Aufgaben/Glossare und erneut abgerufene Primärquellen.

## Status der sechs Punkte

| Kennung | Status | Feststellung |
|---|---|---|
| K01 | Teilweise behoben; Rest mittel | PPWR/VerpackDG, Rollenunterscheidung und konkrete MAKEL-Fälle sind ergänzt. Die Registrierungspflicht wird daneben weiterhin falsch auf jeden Vertreiber ausgedehnt. |
| K02 | Teilweise behoben; Rest mittel | Vertrag ohne Option/ohne Spezialleasing und Kaufoptions-Gegenfall sind korrekt eingegrenzt. Die neu formulierte Aussage zur Eigenkapitalquote beim Kreditkauf ist rechnerisch falsch. |
| K03 | Geschlossen | Langfassung, Beispiel, Prüfungsbezug und Zusammenfassung unterscheiden steuerpflichtige Vorteile und zusätzlich gewährtes begünstigtes Jobticket; die Aufgabe erklärt die Ausnahme ebenfalls. |
| K04 | Teilweise behoben; Rest mittel | „Mehr als“, Beginn nach Finanzamtsmitteilung, § 241a samt Neugründung und Einzelkaufmann/GmbH-Grenzfällen sind umgesetzt. Im neu geschriebenen AO-Glossar stimmt der Bezugszeitraum des Umsatzes nicht. |
| K05 | Geschlossen | Hinweis vor verbindlicher Verbraucherbestellung und ausdrückliche gesonderte Vereinbarung sind zutreffend benannt; ein später Hinweis in der Bestellbestätigung reicht nicht. |
| K06 | Geschlossen im vereinbarten Umfang | Schematische Kennzeichnung sichtbar; Textzonen x=25 mm, Breite 165 mm auf A4 ergeben 20 mm rechten Rand. Anschriftfeldkante x=20 mm und Anschrifttext ab 25 mm werden unterschieden. **Keine Bestätigung der vollständigen DIN-Konformität:** Normvolltext wurde nicht geprüft. |

## K01 · Rest: Herstellerpflicht wird weiterhin jedem Vertreiber zugeschrieben

**Datei/Fundstellen:** `quellen/ik2024-lf07-k05.kapitel.json:56` (Langfassung a3) und `:147` (Kurzfassung a3).

**Fehler:** In beiden Fassungen steht pauschal, wer verpackte Ware in Deutschland vertreibe, sei/müsse in LUCID registriert sein; der Kurztext fügt pauschal Mengenmeldungen hinzu. § 6 VerpackDG adressiert jedoch **Hersteller** im gesetzlichen Sinn. Nicht jeder nachgelagerte Händler ist für jede von ihm weiterverkaufte Verpackung selbst Hersteller. Die zutreffende Rollenunterscheidung zu Beginn wird durch diesen anschließenden Satz wieder aufgehoben.

**Gegenfall:** Ein Einzelhändler kauft bereits verpackte Markenware von einem inländischen Lieferanten und verkauft sie unverändert im Laden weiter, ohne Eigenmarke, Import, eigene Versand- oder Serviceverpackung. Der bloße Weiterverkauf macht ihn für diese Verpackung nicht automatisch zum registrierungspflichtigen Hersteller. Ob er für andere Verpackungen eigene Pflichten hat, ist gesondert zu prüfen.

**Kurze Ersatzformulierung für beide Fassungen:** „Ist MAKEL für eine Verpackung Hersteller im Sinne der PPWR, muss MAKEL die dafür geltenden Registrierungs- und Meldepflichten erfüllen. Ein bloßer nachgelagerter Weiterverkauf bereits verpackter Ware begründet diese Herstellerrolle nicht automatisch.“ Danach die bereits vorhandenen konkreten MAKEL-Fälle anschließen; Meldepflichten nach Verpackungsart und Rolle einordnen.

**Abnahme:** Hersteller im MAKEL-Logo-Versandfall und bloßer Händler im Gegenfall dürfen nicht gleichgesetzt werden. Die korrigierte Regel muss in Kurz- und Langfassung stehen.

**Quellen, erneut abgerufen 28.10.2026:** [§ 6 VerpackDG](https://www.gesetze-im-internet.de/verpackdg/__6.html), [ZSVR Rollen/Pflichten](https://www.verpackungsregister.org/hilfe/rollen-pflichten), [ZSVR Rollenabgrenzung](https://www.verpackungsregister.org/erste-schritte/abgrenzung-erzeuger-hersteller). Die vorhandene Einordnung des Logo-Onlineversands wird durch die [ZSVR-Seite Versand/Onlinehandel](https://www.verpackungsregister.org/themen/versand-und-onlinehandel) gestützt.

## K02 · Rest: Eigenkapitalquote steigt beim Kreditkauf nicht

**Datei/Fundstelle:** `quellen/lf9-k5-leasing.kapitel.json:138`, Grafikdetail „Meist nicht in der Bilanz des Nutzers“.

**Fehler:** „Bilanzsumme und Eigenkapitalquote steigen also nicht wie beim Kreditkauf.“ Beim kreditfinanzierten Kauf steigen im vereinfachten unmittelbaren Vergleich Vermögen und Fremdkapital. Das Eigenkapital bleibt zunächst gleich; die Eigenkapitalquote **sinkt**. Das gegenüberliegende Kauf-Detail in Zeile 116 erklärt das bereits richtig. Die beiden Seiten derselben Grafik widersprechen sich.

**Unabhängiger Gegenfall:** Vorher Bilanzsumme 100.000 €, Eigenkapital 40.000 €: EK-Quote 40 %. Nach Kreditaufnahme und Maschinenkauf von 20.000 €: Bilanzsumme 120.000 €, Eigenkapital weiterhin 40.000 €: EK-Quote 33,33 %. Ausgaben-/Steuer-/Periodeneffekte bleiben für diesen unmittelbaren Strukturvergleich bewusst außen vor.

**Ersatz:** „Beim entsprechenden Kreditkauf steigt zunächst die Bilanzsumme; bei unverändertem Eigenkapital sinkt dadurch die Eigenkapitalquote. Diese kreditbedingte Bilanzverlängerung entfällt im hier beschriebenen Leasingfall. Leasingraten beeinflussen dennoch Ergebnis und Liquidität.“

**Abnahme:** Kauf- und Leasingseite derselben Grafik widersprechen sich nicht. Den inzwischen richtig begrenzten Vertragstyp und den Kaufoptions-Gegenfall beibehalten.

## K04 · Rest: Umsatzgrenze nach Kalenderjahr, nicht Wirtschaftsjahr

**Datei/Fundstelle:** `quellen/gemeinsam.json:1099`, neu formulierter Langtext zu `ao-141`.

**Fehler:** „mehr als 800.000 € Umsatz oder mehr als 80.000 € Gewinn im Wirtschaftsjahr“ legt beide Größen auf dasselbe Wirtschaftsjahr. § 141 Abs. 1 AO unterscheidet: Umsatz im **Kalenderjahr**, gewerblicher Gewinn im **Wirtschaftsjahr**; Gewinn aus Land-/Forstwirtschaft wiederum im Kalenderjahr. Das ist gerade bei einem abweichenden Wirtschaftsjahr relevant.

**Ersatz:** „Die Umsatzgrenze beträgt mehr als 800.000 € im Kalenderjahr. Die Gewinngrenze beträgt mehr als 80.000 € bei Gewerbebetrieben im Wirtschaftsjahr und bei Land- und Forstwirten im Kalenderjahr. Der Pflichtbeginn richtet sich nach der Mitteilung der Finanzbehörde.“ Den bereits richtigen Folgesatz zum Beginn beibehalten.

**Abnahme:** Bei einem gewerblichen Betrieb mit Wirtschaftsjahr Juli–Juni wird für die Umsatzgrenze dennoch Januar–Dezember ausgewertet. Die bereits korrigierten Grenzbeträge, §-241a-Ausnahme und Neugründungsregel bleiben unverändert.

**Quellen, erneut abgerufen 28.10.2026:** [§ 141 Abs. 1/2 AO](https://www.gesetze-im-internet.de/ao_1977/__141.html), [§ 241a HGB](https://www.gesetze-im-internet.de/hgb/__241a.html).

## Verifikation und Grenzen

- Die neun geänderten Quelldateien wurden auf die K01–K06-Stellen abgeglichen. K03-Jobticket-Ausnahme anhand [§ 3 Nr. 15 EStG](https://www.gesetze-im-internet.de/estg/__3.html), K05 anhand [§ 476 Abs. 1 BGB](https://www.gesetze-im-internet.de/bgb/__476.html) nachgeprüft.
- Alle **26 Lernfeldseiten** mit dem unveränderten Originalrenderer in temporären Dateien neu erzeugt: **26/26 bytegleich** mit den eingecheckten HTML-Seiten. Damit sind die gelesenen Quelländerungen im gebauten Bestand enthalten. [Skript](belege-2026-10-28-schlusspruefung/rendercheck.py), [Vergleich](belege-2026-10-28-schlusspruefung/rendercheck.json), [Protokoll](belege-2026-10-28-schlusspruefung/rendercheck.txt).
- Keine erneute große Browserregression: nur die sechs Fundstellen beauftragt, keine Änderung an Rechenmodul/Renderer durch die Nachbesserung. Claudes 269/269, Lernkern-Audit, IK-Test 8.271/0 und Sichtprüfungen sind dessen Übergabebelege, keine in dieser Schlussprüfung selbst wiederholten Ergebnisse.
- K06 schließt die vereinbarte Alternative „schematisch kennzeichnen und intern konsistent ausrichten“. Die dokumentierte fehlende Volltextprüfung der DIN bleibt eine fachliche Grenze; daraus wird weder eine neue Implementierungsrunde noch eine vollständige Normfreigabe abgeleitet.
- Nur Reviewdokumentation und Belege geändert. Kein Anwendungscode, keine Datenbank, kein Merge, keine Live-Freigabe.

**Nächster Schritt:** Claude ersetzt die drei benannten Regelstellen einschließlich der Wiederholung von K01. Danach genügt eine gezielte Bestätigung dieser Änderungen und ihres gebauten Stands; eine erneute Ausweitung des Reviews ist nicht beauftragt. **Lukes entscheidet anschließend über den Merge.**
