# Erweiterter Modus · Gesamtabnahme (Claude)

**Stand:** 02.11.2026. **Branch:** `erweiterter-modus-2026-10-28`. **Basis:** `main` @ `d0cfb8a` (unverändert). **Geprüfter Anwendungsstand:** `d7e4a18`. **Vorgänger:** ChatGPT-Fortschrittsprüfung [2026-11-02 · 5380a00](../../community/review/2026-11-02-erweiterter-modus-5380a00.md). Kein Merge, kein Deployment.

## Ergebnis

Beide Berufe sind vollständig im erweiterten Modus: **26 Lernfelder, 161 Kapitel, 602 von 602 Abschnitten** (567 aus dem Abschnittsplan, alle vorhanden, plus 35 neue Abschnitte aus den Lehrplanergänzungen). Alle 49 Aufträge L01–L30 und K01–K19 sind umgesetzt und in [`ergaenzungen.csv`](../gesamtvorbereitung/ergaenzungen.csv) mit Entscheidung, Ziel, Beleg und Commit eingetragen. Die drei Review-Befunde N01–N03 sind berichtigt und an den verlangten Gegenfällen geprüft. Technische Abnahme G01–G14 grün.

**Nicht ersetzt:** Die Fachprüfung ist Claudes eigene Prüfung (Text gelesen, Zahlen nachgerechnet, Recht/Jahreswerte an Primärquellen, Belege in den [Kapitelnotizen](kapitelnotizen.md)) plus ChatGPTs Stichproben. Eine unabhängige Lesekontrolle aller 602 Abschnitte hat niemand außer Claude gemacht. Das entscheidet Lukes bei der Mergefreigabe.

## Review 5380a00 · N01–N03

| Befund | Korrektur | Gegenfälle geprüft |
|---|---|---|
| **N01** KG-Mitsprache und Haftung (KfB LF9 K7, Aufgaben) | Primärquelle 02.11.2026 gelesen: § 164 HGB lautet seit MoPeG nur noch „Die Kommanditisten sind von der Geschäftsführungsbefugnis ausgeschlossen; § 116 Absatz 2 Satz 1 bleibt unberührt.“ Ein Widerspruchsrecht steht dort nicht mehr; für Geschäfte über den gewöhnlichen Betrieb hinaus ist ein Beschluss aller Gesellschafter nötig. Berichtigt: Tabellendetail Geschäftsführung, Merksatz, Zusammenfassung, Selbsttest „Wissen“ und „Fall“, Absatz b2-p2, Tabelle b2-t1 (Werkstattkauf ohne Zustimmung: nach außen wirksam, intern fehlt der Beschluss), Frage/Antwort b2-f1 (Innenbefugnis und Außenwirkung getrennt, Vorbehalt Gesellschaftsvertrag), Abwägungsabsatz b3-p5. Haftung nach §§ 171/172 HGB: b3-Frage nennt jetzt Haftsumme ausdrücklich; Aufgabe lf9-k7-01 Zuordnungsziel „bis zur eingetragenen Haftsumme, soweit die Einlage noch nicht geleistet ist“, Erklärung mit Rückzahlung und Verlustrisiko getrennt; lf9-k7-03 Musterlösung und Raster: laufende Geschäfte allein, außergewöhnliche mit Zustimmung, „nicht mitarbeiten“ ≠ „ohne Mitsprache“. | Farbenbestellung (gewöhnlich, Jonas allein) gegen zweite Werkstatt (Zustimmung der Tante nötig; ohne Zustimmung nach außen wirksam, intern Pflichtverletzung). Haftsumme 40.000 €, voll geleistet ohne Rückzahlung → Außenhaftung 0 €; erst 25.000 € geleistet → noch 15.000 € (Aufgabenerklärung). b3: 60.000 € − 40.000 € = 20.000 €. Andere Kapitel mit „Kommanditist“ (IK LF1 K5, IK LF10 K8, KfB LF9 K2) enthalten keine Widerspruchsaussage; ihre Kurzformel „haftet bis zur Einlage“ ist Altbestand mit Lernstands-Fingerabdruck und bleibt (Hinweis für Lukes unten). |
| **N02** Eingabefelder der Bestellmengengrafik ohne Namen | Gemeinsame Hilfsfunktion `verbinde(label, input)` in `azubipass.js`: seitenweit fortlaufende IDs `ap-feld-n`, `label.htmlFor`. Nicht nur in `gBestellmenge`, sondern an allen neun Stellen mit demselben Muster (Bilanzrechner, Lagerkurve, Liquidität, Break-even, Durchlaufzeit, Bestellmenge, Bauplan-Verzug, Staffel Jahre/Datum). | Browserlauf (Chromium, Playwright) über alle 26 Lernfeldseiten, jedes Kapitel geöffnet: **80 Grafikfelder, 0 ohne zugänglichen Namen, keine doppelten IDs**. Zum Vergleich `main` (`d0cfb8a`) mit demselben Skript: **43 Felder ohne Namen auf 12 Seiten**. Bestellmengengrafik: alle drei Felder per `getByLabel` auffindbar; Klick auf jedes Label fokussiert sein Feld; Jahresbedarf 20.000 → q* ≈ 1.000 Stück, 2.000 €; Zurücksetzen → neue IDs (`ap-feld-8…10`), Startwerte, q* ≈ 707 Stück, ≈ 1.414,21 €, weiterhin beschriftet, keine Doppel-IDs. axe (wcag2a/aa) auf allen Grafiken: keine `label`-Verstöße mehr. Beleg: `n02probe.py`/`n02probe.json` (Scratchpad, Ergebnis hier übernommen). |
| **N03** Urlaubsbeispiel (IK LF12 K07 a3) | Korrekturweg „gleiches Berechnungsregime“: Vertragsannahme in der Tabelle ausdrücklich (30 Tage, Zwölftelung bei Austritt in der ersten Jahreshälfte, keine eigene Rundungsregel für Mehrurlaub). Rechnung 30 × 3 ÷ 12 = 7,5 → aufgerundet 8 Tage (§ 5 Abs. 2 BUrlG, Gleichlauf nach BAG 9 AZR 579/16 Rn. 56), dann 8 − 2 = **6 Tage**. Fazit nennt die Reihenfolge (erst runden, dann abziehen). Detail a3-d1 neu: kein Satz mehr, dass Mehrurlaub nur bei ausdrücklicher Vereinbarung gerundet werde; stattdessen der zweite, klar geregelte Fall. | Fall 1 (Vertrag ohne eigene Regel): 6 Tage. Fall 2 (Vertrag: „Bruchteile von Mehrurlaubstagen werden nicht aufgerundet“): 5 + 2,5 = 7,5, Rest 5,5 Tage. Keine wechselnden Annahmen zwischen Tabelle, Fazit und Detail. Aufgabe `ik2024-lf12-k07-02` geprüft: Variablen (24/30 Tage × 2/4/6 Monate) ergeben nur ganze Tage, keine Rundungsfrage, unverändert. |

## Technische Abnahme G01–G14

| Kennung | Ergebnis | Beleg |
|---|---|---|
| G01 Registries gegen Arbeitsliste | 161 Kapitel; alle 567 Plan-Abschnitte vorhanden, 35 neu (u. a. BF K9 i4, LF4 K4 b4–b6, LF8 K1 a4, LF9 K7 b1–b3), keine Duplikate | Abgleich `abschnittsplan.csv` ↔ `quellen/*.lernfeld.json`/`ausfuehrlich.abschnitte` |
| G02 Vollfassungen validiert | 602/602 Vollfassungen nach Originalvalidator gültig; kein Legacy-Fallback als fertig gezählt | `erweiterter_modus_test.py`, `industriekaufleute_test.py` |
| G03 E01-Negativfall | Ungültige ausdrückliche Darstellung bricht verständlich ab; Altformat weiterhin kompatibel | `erweiterter_modus_test.py` (E01) |
| G04 Tabelle/Grafik ohne Absatz (M01) | Basis einmal, kein Dummytext, Eingaben bleiben | `erweiterter_modus_test.py` (M01) |
| G05 Grafik/Check, mehrfach umschalten | Gleiche Instanzen/IDs, Antworten und Werte unverändert | `erweiterter_modus_test.py` A05–A08 |
| G06 Haupttext-/Detail-/Frage-Treffer | Ziele sichtbar, Antworten verborgen und nicht im Index (A13) | `erweiterter_modus_test.py` A13, A26 |
| G07 Detail-Link neu laden | Ziel offen; ohne Parameter kompakt | `erweiterter_modus_test.py` |
| G08 KfB/IK, Konto-/Kapitelwechsel, Reset | Kein berufsfremder Inhalt/Zustand (A16), keine Lernstandsmigration; alte Kennungen erhalten (einzige belegte Ausnahme T02) | `erweiterter_modus_test.py`, `lernstand_sync_test.py` |
| G09 320/375 px, Tastatur, axe | Kein Seitenüberlauf; axe-Prüfung im Modustest grün; Grafikfelder beschriftet (N02) | `erweiterter_modus_test.py` mit axe, `sicht.py` je Lernfeld, N02-Lauf |
| G10 Offline nach Cacheaufbau | SW übernimmt, 75 Dateien im Cache; offline geöffnet: IK LF10 K06 (4 Vollfassungen, Details offen) und die drei korrigierten Stellen (KfB LF9 K7 b2/b3, IK LF12 K07 a3, Bestellmengengrafik beschriftet); `suche.json` offline aus dem Cache mit den neuen Texten | `gchecks.py`, `g10n.py`; `funktionstest.py` Offlineprüfungen |
| G11 Vollständiger Build | Quellen, HTML, Suchindex und Cacheversion passen zusammen; Renderer reproduzierbar | `build.py`, `build_app.py`, `funktionstest.py` „Build ist reproduzierbar“ |
| G12 Größte Seite mobil | `buchfuehrung.html` 419.033 Bytes; Laden 0,14 s, Kapitelwechsel + Aufklappen 0,49 s bei 375 px, lokal; kein Überlauf, keine Fehler | `gchecks.py` |
| G13 Druck kompakt/ausführlich | Keine doppelte Textfassung (Vollfassungsabsatz einmal, in Kompakt nicht enthalten), Tabellen intakt. Es gibt keine Druckregeln (`@media print` fehlt): Untere Navigation wiederholt sich, nur die sichtbare Ansicht wird gedruckt. Vorbestehend, kein Teil dieses Auftrags | `gchecks.py` (PDF-Text 2.403 vs. 17.235 Zeichen) |
| G14 Alle L/K zugeordnet | 49/49 Zeilen mit Ist-Entscheidung (32 „neu ergänzt“, 17 „erweitert“), Ziel, Beleg, Commit | `ergaenzungen.csv` |

**Testläufe am korrigierten Stand:** `funktionstest.py` 269/269; `industriekaufleute_test.py` 9.219 bestanden, 0 Fehler, 285 Aufgaben; `lernkern_audit_test.py` alles in Ordnung; `lernstand_sync_test.py` alles bestanden; `erweiterter_modus_test.py` mit axe 163 OK, 0 FEHL, „Alles in Ordnung“; `node --check` ohne Fehler.

**Build-Hinweis:** `build_app.py` schreibt das Tagesdatum als „Stand“ in Datenschutz und Impressum und deren Hash in `sw.js`. Wird `datenschutz.html` danach per `git checkout` zurückgesetzt, passt der Hash nicht mehr und der Service Worker installiert nicht („Zwischenspeicher übernimmt“ fällt durch). Für diesen Stand mit festem Datum 30.10.2026 gebaut (Datenschutz inhaltlich unverändert). Vorschlag für später: Stand-Datum aus einer Quelle statt aus `date.today()` nehmen.

**`pruefe_vorbereitung.py`:** ChatGPTs Vorbereitungsprüfung erwartet die ursprünglichen 160 Kapitel und bricht mit 161 ab. Das ist der gewollte neue Stand (KfB LF9 K7); das Skript bleibt unverändert als Beleg der Vorbereitung.

## Für Lukes zur Entscheidung oder Kenntnis

1. **Neue Grafikvarianten** `epk` (KfB LF11), `pauschale` (KfB LF12) und `bestellmenge` (IK LF4) sowie Ausnahme `GRAFIK_AUSNAHMEN = {"ik2024-lf04/k02": 2}` im IK-Test.
2. **Neues Kapitel KfB LF9 K7 Rechtsformen** mit drei Aufgaben (AFB I–III).
3. **Fachkorrekturen am Altbestand** mit Lernstandsfolge: IKR 6001/6002 (BF), Antwortkorrektur T02 (LF7 K1 a2). Belege in den Kapitelnotizen.
4. **MAKEL-Skalierung/Übungsauszüge** wie in den Kapitelnotizen beschrieben.
5. **Kurzformel Kommanditistenhaftung** „haftet bis zur Höhe der Einlage“ steht im Altbestand (IK LF1 K5, IK LF10 K8). Fachlich verkürzt, aber nicht falsch im Sinne des Reviews; Änderung würde Check-/Lernstandsabdrücke berühren. Bei Wunsch gezielt nachziehen.
6. **Schreibweise „Voss“/„Voß“** uneinheitlich; nicht geändert, weil Checktexte in den Lernstandsabdruck eingehen.
7. **Druck ohne Druckregeln** (G13) und **Stand-Datum im Build** (oben).
8. **Altbefunde axe außerhalb der Grafikfelder**, identisch auf `main`: Farbkontrast der Fächerleiste `.tr-fach` (alle Seiten) und `nested-interactive` im Bauplan-Gitter `.bp-gitter` (5 Seiten). Kosmetisch: Die Rechtsformtabelle KfB LF9 K7 b1 ist am Desktop 13 px breiter als die Spalte und scrollt (Bereich fokussierbar).

## Nächster Schritt

Mergevorlage an Lukes. Erst nach seiner ausdrücklichen Freigabe Merge nach `main` und Deployment.
