# Lernfeld-Audit gegen die KMK-Rahmenlehrpläne

**Stand:** 27.10.2026 · **Geprüft von:** Claude · **Repo-Stand:** main f943f65
**Grundlage:** KMK-Rahmenlehrplan Kaufleute für Büromanagement vom 27.09.2013 i. d. F. vom 20.03.2025 · KMK-Rahmenlehrplan Industriekaufleute vom 15.12.2023
**Umfang:** 26 Lernfelder, 160 Kapitel (KfB 75, IK 85), Kurzfassung, Langfassung und Aufgaben

Kennungen: **L** = Lücke gegenüber dem Lehrplan, **K** = zu knapp, **F** = fachlicher Fehler, **S** = Struktur, **V** = Verbesserung der Langfassung.

---

## 1. Kurzfazit

- **Industriekaufleute:** Sehr nah am Lehrplan. Jede Kernformulierung des RLP 2023 findet sich in einem Kapitel wieder; nur vier kleine Lücken (Abschnitt 4). Langfassung durchgehend vollständig (alle 340 Abschnitte mit allen acht Pflichtfeldern).
- **Büromanagement:** Gutes Grundgerüst, aber gegenüber dem RLP i. d. F. 2025 **deutlich lückenhafter**. Mehrere ausdrücklich genannte Mindestinhalte fehlen ganz — am schwersten wiegen **Rechtsformen (LF 9)**, **Konfliktgespräche (LF 7)**, **Werbeplanung (LF 5)**, **Mutterschutz/Entgeltfortzahlung/Inklusion (LF 8)** und **Gesundheit/Selbstmanagement (LF 2)**.
- **Fachfehler:** Wenige, aber zwei betreffen die Buchführung direkt (Skonto-Buchung, § 141 AO). Arithmetik wurde maschinell nachgerechnet (294 Rechenketten) — keine echten Rechenfehler gefunden.
- **Live sichtbar:** In 12 Dateien stehen „Zu prüfen“-Hinweise, die in der App als Kasten angezeigt werden — an vier Stellen fehlen dadurch Werte, die Lernende brauchen (Verpflegungspauschalen, Kleinbetragsrechnung, DIN-5008-Maße, DSGVO-Frist).
- **Langfassung KfB:** Formal vollständig, inhaltlich oft **kürzer als die Kurzfassung** (Median der Erklärung: 43 Wörter je Abschnitt; IK: 66). Sie ist eher eine Kästchen-Sammlung als eine ausführliche Fassung.

---

## 2. Sofort beheben (Fehler, die heute live sind)

| ID | Ort | Befund | Korrektur |
|---|---|---|---|
| F01 | KfB LF 6 K5 (`k5-warenkonten`) | Skonto wird als **„Skontoertrag“ / „Skontoaufwand“** gebucht. Das ist die alte GKR-Logik; im IKR (den der RLP empfiehlt und den MAKEL im eigenen Kontenplan führt) gibt es diese Konten nicht. Liefererskonto → **6001 Nachlässe** (bzw. Unterkonto des Aufwandskontos), Kundenskonto → **5001 Erlösberichtigungen**. Die IK-Kapitel machen es bereits richtig. | Tabelle, Merke, Eselsbrücke und Aufgaben in K5 auf Nachlass/Erlösberichtigung umstellen; Kontonummern aus `musterunternehmen.json` verwenden. |
| F02 | KfB LF 6 K5/K6 | Skonto, Rücksendung und nachträglicher Nachlass werden **ohne Steuerberichtigung** gebucht; auch K6 (Umsatzsteuer) holt das nicht nach. Die Vorsteuer-/Umsatzsteuerkorrektur ist klassischer Prüfungsstoff. | In K6 einen Abschnitt „Buchen mit Steuerberichtigung“ ergänzen (Skonto beim Einkauf und Verkauf, Rücksendung, Mängelnachlass) mit Rechenweg brutto → netto → Steuer. |
| F03 | KfB LF 6 K1 (`k1-grundlagen`, Kapitel, Lernfeld-Datei, Aufgaben — 5 Stellen) | § 141 AO mit **600.000 € Umsatz / 60.000 € Gewinn**. Seit 2024 gelten **800.000 € / 80.000 €** (Wachstumschancengesetz). | Alle fünf Stellen ersetzen; „Stand 2026“ ergänzen. |
| F04 | KfB LF 4 K4, Langfassung b1 | Beispiel: „MAKEL **fragt** 200 Hoodies … an. Der Lieferer bestätigt 180 … Damit ist der ursprüngliche **Antrag** nicht angenommen.“ Eine Anfrage ist kein Antrag (das Kapitel sagt selbst: unverbindlich). | „MAKEL **bestellt** 200 Hoodies zu 52 €“ — dann stimmt die Aussage zu § 150 BGB. |
| F05 | KfB LF 12 K4 (`lf12-k4-reisekosten`) | Lernende sehen den Satz „… vor Veröffentlichung prüfen und die Euro-Beträge in der folgenden Tabelle eintragen“, die Tabelle zeigt nur „kleiner Satz / großer Satz“ **ohne Beträge**. | Inland 2026: **14 €** (mehr als 8 Std. sowie An-/Abreisetag), **28 €** (24 Std.); Kürzung Frühstück 5,60 €, Mittag/Abend je 11,20 €. Prüfhinweis entfernen. |
| F06 | KfB LF 3 K5 (`lf3-k5-rechnung`) | Kleinbetragsrechnung ohne Betragsgrenze, dafür „Zu prüfen“-Kasten. | **250 € brutto** (§ 33 UStDV). |
| F07 | KfB LF 3 K6 (`lf3-k6-din5008`) | Briefgrafik ohne Millimeterangaben, „Zu prüfen“-Kasten. | Maße nach DIN 5008:2020 eintragen (u. a. linker Rand 25 mm, Anschriftfeld Form A ab 27 mm, Form B ab 45 mm von oben) und einmal gegen die Norm halten. |
| F08 | KfB LF 2 K5 (`lf2-k5-datenschutz`) | Auskunftsfrist steht im Text richtig (ein Monat), der Kasten fordert trotzdem eine Prüfung. | Ergänzen: Verlängerung um **weitere zwei Monate** möglich (Art. 12 Abs. 3 DSGVO), Kasten entfernen. |
| S01 | alle „pruefen“-Felder (12 Dateien) | `build.py` rendert sie als sichtbaren Kasten „Zu prüfen: …“. Redaktionelle Notizen gehören nicht in die Klassenversion. | Entweder Werte eintragen und Feld löschen, oder Feld in ein internes Feld umbenennen, das nur der Build als Warnung ausgibt. Bleibende Jahreswerte als neutralen Hinweis „Stand 2026“ formulieren. |

Offen bleiben dürfen die zwei bekannten echten Rechtsunsicherheiten (IK LF 7 K5 Verpackungsrecht, IK LF 12 K4 ArbZG-Neuregelung) — dort sollte der Kasten aber für Lernende formuliert sein („Neuregelung in Arbeit, Stand Oktober 2026“), nicht als Redaktionsauftrag.

---

## 3. Büromanagement: Abdeckung je Lernfeld

Gelesen gegen den RLP-Wortlaut; *kursiv* markierte RLP-Mindestinhalte sind die, nach denen gesucht wurde.

### LF 1 — Die eigene Rolle im Betrieb mitgestalten (40 Std.) · gut abgedeckt
- **L01** *Ziele des Betriebs* (Sach-/Formalziele, ökonomisch/ökologisch/sozial, Zielkonflikte) und Leitbild fehlen — der RLP verlangt „die Ziele ihres Betriebes analysieren“.
- **L02** *Möglichkeiten beruflicher Fort- und Weiterbildung* und lebenslanges Lernen fehlen (z. B. Fachwirt, Bilanzbuchhalter, duales Studium, Aufstiegs-BAföG).
- **K01** *Nachhaltigkeit bei den Produktionsfaktoren* nur zweimal erwähnt.

### LF 2 — Büroprozesse gestalten (80 Std.) · größte Lücke im 1. Jahr
- **L03** *Gesundheit am Arbeitsplatz*: Stress, Burnout, Mobbing, Bewegung, Ernährung, Suchtprävention — kein eigener Inhalt.
- **L04** *Büroraumkonzepte, Homeoffice, mobiles Arbeiten* fehlen in LF 2 (nur LF 8 streift Homeoffice).
- **L05** *Techniken des Selbstmanagements* (Selbstbeobachtung, Zielsetzung, Selbstkontrolle) und *Resilienz* fehlen; Eisenhower ist da, ABC-Analyse als Zeitmethode nicht.
- **L06** *Protokolle* (Ergebnis- vs. Verlaufsprotokoll, Aufbau) — Sitzungen werden erwähnt, Protokollführung nicht erklärt.
- **K02** *Posteingang/Postausgang und Versandarten* (Einschreiben-Varianten, Sicherheit, Kosten, Rechtsverbindlichkeit) nur gestreift.
- **K03** *Teamarbeit, Kommunikation, Inklusion* — RLP-Absatz ohne Gegenstück.
- *Hinweis:* Arbeitsstättenverordnung wird nicht genannt (Gefährdungsbeurteilung nach ArbSchG ist da).

### LF 3 — Aufträge bearbeiten (80 Std.)
- **L07** *Dreisatz und Prozentrechnung* sind ausdrücklich verlangt, kommen in LF 3 aber nicht vor (nur verstreut in LF 6).
- **L08** *Verlangtes und unverlangtes Angebot* fehlt.
- **K04** *Kundenzufriedenheit/Erfolgskontrolle*, *interkulturelle Kommunikation/Fremdsprache* und *Corporate Design* fehlen oder sind nur angedeutet.
- **S02** LF 3 (1. Jahr) verweist zweimal auf „die Handelskalkulation/Skontorechnung **kennst du aus Lernfeld 6**“ — LF 6 kommt erst im 2. Jahr.

### LF 4 — Beschaffen und Verträge schließen (120 Std.) · inhaltlich stark, aber Vertragsarten fehlen
- **L09** *Vertragsarten*: Mietvertrag, Werkvertrag, Dienstvertrag (Abgrenzung zum Kaufvertrag) — fehlen komplett.
- **L10** *Nichtigkeit und Anfechtung* stehen in LF 3 (Geschäftsfähigkeit), nicht im Vertragskontext von LF 4; Anfechtung fehlt ganz.
- **K05** *Lagerung* (Eigen-/Fremdlager, Lagerkennzahlen) und *optimale Bestellmenge* nur knapp.
- **K06** *Bezahlsysteme* (Überweisung, Lastschrift, Karte, Online-Bezahldienste) fehlen in LF 4.
- **K07** *Nachhaltige Beschaffung* und *Excel-Funktionen* (WENN, SVERWEIS …) — RLP nennt beides ausdrücklich.
- F04 (oben) betrifft K4.

### LF 5 — Kunden akquirieren und binden (80 Std.)
- **L11** *Werbeplanung*: Werbeziel, Zielgruppe/Streukreis, **Streugebiet, Streuzeit**, Werbeetat, Werbemittel/-träger — fehlt. AIDA ist da, der Werbeplan nicht.
- **L12** *Soziale Netzwerke* in der Kommunikationspolitik fehlen.
- **L13** *Werbeerfolgskontrolle* und *ethische Grenzen der Werbung* fehlen (UWG ist da).
- **K08** *Serienbrief/Werbebrief* fehlt (Handlungsprodukt im RLP).
- **S03** In `ausbildungsgaenge.json` steht LF 5 bei **Lehrjahr 1**; RLP und Lernfeld-Untertitel sagen **2. Ausbildungsjahr**.

### LF 6 — Werteströme erfassen und beurteilen (80 Std.)
- **F01–F03** siehe oben.
- **L14** *Eigenkapitalrentabilität* und *Wirtschaftlichkeit* sind ausdrücklich verlangt und fehlen.
- **K09** *Aufwandsrechnerisches Verfahren* wird angewendet, aber nicht benannt und nicht vom bestandsrechnerischen abgegrenzt.
- **S04** Titel lautet „Buchführung“, Untertitel ohne Zeitrichtwert — der offizielle Titel ist „Werteströme erfassen und beurteilen“, 2. Jahr, 80 Std.
- *Positiv:* Belege, HGB/AO/UStG, Voranmeldung, Inventur sind da; K9 (Jahresabschluss) geht über den RLP hinaus.

### LF 7 — Gesprächssituationen gestalten (40 Std.) · zweitgrößte Lücke
- **L15** *Konflikte*: Konfliktursachen, Konfliktgespräche, **Eisbergmodell**, **gewaltfreie Kommunikation** — fehlen komplett (das Wort „Konflikt“ kommt in LF 7 nicht vor).
- **L16** *Beratungsgespräch*, *Einwandbehandlung*, *Zusatzangebote/Service* und *Beschwerdemanagement als Kundenbindung* fehlen in LF 7.
- **K10** LF 7 K2 hat eine alte Langfassung (weicht in den Abschnittstiteln ab, nur ~400 Wörter, mehrere Pflichtfelder fehlen).

### LF 8 — Personalwirtschaft (80 Std.)
- **L17** *Mutterschutzgesetz* fehlt (nur als unzulässige Frage im Vorstellungsgespräch).
- **L18** *Entgeltfortzahlung* und *arbeitsrechtliche Fristen überwachen* (Probezeit, Mutterschutz, Entgeltfortzahlung, Kündigung) — Entgeltfortzahlung fehlt ganz.
- **L19** *Inklusion, Demografie, Migration* als Rahmen der Personalplanung fehlen.
- **K11** *Personalakte und Datenschutz*, *Arbeitspapiere* bei Einstellung, *Arbeitsvertragsarten* (befristet, Teilzeit, Minijob) nur knapp; K4/K5 sind die dünnsten Kapitel.

### LF 9 — Liquidität sichern und Finanzierung vorbereiten (80 Std.) · wichtigste inhaltliche Lücke
- **L20** *Rechtsformen* (Einzelunternehmung, KG, GmbH): Vertretung, Geschäftsführung, Haftung, **Gewinnverteilung** — fehlt vollständig. Der RLP stellt sie in den Leitsatz des Lernfelds; zugleich ist das WiSo-Prüfungsstoff.
- **L21** *Eigentumsvorbehalt einfach/verlängert/erweitert* als Kreditsicherheit fehlt (nur einfacher EV in LF 4).
- **L22** *Beteiligungsfinanzierung* fehlt; *Selbstfinanzierung* nur zweimal erwähnt.
- **K12** *Mahnwesen, Verzugszinsen, gerichtliches Mahnverfahren, Verjährung* stehen in LF 4 K7 — inhaltlich gut, aber LF 9 sollte darauf aufbauen (Kulanzabwägung, Liquiditätssicht).
- **K13** *Liquidität 2. Grades* nur einmal erwähnt; *Budgetplanung* fehlt in LF 9.
- *Hinweis:* K6 (Investitionsrechnung) steht nicht im KfB-RLP — darf bleiben, ist aber Zusatz.

### LF 10 — Wertschöpfungsprozesse steuern (80 Std.)
- **L23** *Ergebnistabelle* (tabellarische Abgrenzungsrechnung) fehlt — die Abgrenzung wird nur begrifflich erklärt.
- **L24** *Normal- und Istkosten, Kostenüber- und -unterdeckung* sowie *Nachkalkulation* fehlen.
- **K14** *Kalkulatorische Abschreibung* nur in einem Satz.
- **S05** Registry: LF 9 und LF 10 stehen auf **Lehrjahr 2**, RLP und Untertitel sagen **3. Jahr**.

### LF 11 — Geschäftsprozesse darstellen und optimieren (40 Std.)
- **L25** *Ereignisgesteuerte Prozesskette (EPK)* ist ausdrücklich verlangt und fehlt.
- **K15** *Leitungssysteme* (Einlinien, Stablinien, Matrix) stehen nur in LF 1; LF 11 verlangt sie im Prozesskontext. *KVP* ist inhaltlich da (PDCA), aber der Begriff fehlt. *Handbücher/Verfahrensanweisungen* nur zweimal.

### LF 12 — Veranstaltungen und Geschäftsreisen (40 Std.)
- **F05** siehe oben.
- **K16** *Veranstaltungsarten* (Sitzung, Konferenz, **Videokonferenz**, Kongress, Messe, Seminar, **Webinar**, Tagung) nur gestreift; digitale Formate fehlen.
- **K17** *Nachhaltigkeit bei der Reiseplanung* fehlt.

### LF 13 — Ein Projekt planen und durchführen (40 Std.)
- **L26** *Kreativitätstechniken* zur Ideenfindung fehlen.
- **L27** *Projektmanagementmethode wählen* (klassisch vs. agil, Scrum/Kanban) fehlt.
- **K18** *Projektinformationssystem/Kommunikationsplan*, *Qualitäts- und Kapazitätsplan*, *Teamregeln zur Konfliktlösung* nur angedeutet.
- *Positiv:* PSP, Balkenplan, Meilensteine, Soll-Ist sind gut.

---

## 4. Industriekaufleute: Abdeckung

Alle 13 Lernfelder decken den RLP 2023 inhaltlich ab. Kleine Lücken:

- **L28** IK LF 1: *lebenslanges Lernen / Selbstmanagement* nur ein Satz.
- **L29** IK LF 4: *optimale Bestellmenge visualisieren* (Diagramm) und *globale/soziokulturelle Auswirkungen der Beschaffung* (Lieferketten, Sozialstandards) fehlen.
- **L30** IK LF 9: *Kreativitätstechniken bei der Strategieplanung* fehlen.
- **K19** IK LF 3 und LF 6: *Nachhaltigkeit* und *Datenschutz bei der Auftragserfassung* nur je ein Satz.

---

## 5. Struktur und Konsistenz

- **S03/S05** `ausbildungsgaenge.json` (KfB): LF 5 → Lehrjahr 2, LF 9/10 → Lehrjahr 3. Falls die Einordnung bewusst anders ist (z. B. nach Schulplan), sollte das im `_hinweis` stehen, sonst passen Untertitel und Registry nicht zusammen.
- **S04** LF 6 KfB: offiziellen Titel und Zeitrichtwert ergänzen; „Buchführung“ kann Kurztitel bleiben.
- **S02** Rückwärtsverweise aus dem 1. Jahr auf LF 6 umformulieren („kommt ausführlich in Lernfeld 6“).
- **S06** KfB-Buchungssätze nutzen Kontobezeichnungen, IK-Kapitel Kontonummern. Für eine App mit gemeinsamem Musterunternehmen wäre einheitlich „Nummer + Name“ besser (war schon als offener Punkt notiert).

---

## 6. Die ausführliche Fassung: Bewertung und Verbesserung

### Befund

| | KfB | IK |
|---|---|---|
| Abschnitte mit Langfassung | 227 | 340 |
| alle acht Pflichtfelder vorhanden | 221 (Ausnahmen: LF 4 K4, LF 7 K2) | 340 |
| Erklärung, Median Wörter | **43** | 66 |
| Langfassung kürzer als Kurzfassung | in **58 von 75** Kapiteln | in keinem |
| Abschnitte je Kapitel | meist 3 | 4 |

Die Langfassung ist fachlich sauber, folgt aber starr dem Acht-Felder-Raster mit je ein bis drei Sätzen. Sie wiederholt oft die Kurzfassung in anderen Worten, statt tiefer zu gehen. Gerade bei Rechen- und Rechtsthemen fehlt das, was eine ausführliche Fassung ausmacht: der vollständige Rechenweg, die Begründung, der Grenzfall.

### Verbesserungen

- **V01 Gleiches Niveau für KfB:** KfB-Langfassungen auf IK-Niveau heben — vier Abschnitte, ca. 800–1.000 Wörter je Kapitel. Zuerst LF 4 K4 und LF 7 K2 (alte Fassungen) neu schreiben.
- **V02 „Neu gegenüber der Kurzfassung“ als Regel:** Jedes Feld muss etwas liefern, das die Kurzfassung nicht hat. Vorschlag für eine Prüfregel in `pruefe.py`: Satzähnlichkeit zwischen Kurz- und Langfassung messen, Abschnitte über einer Schwelle als Warnung ausgeben.
- **V03 Rechenwege als Tabelle:** Langfassung um Blocktypen erweitern (Tabelle, Schema, Grafik wie in der Kurzfassung). Ein Kalkulationsschema, eine Ergebnistabelle oder ein Liquiditätsplan lässt sich in Fließtext nicht sinnvoll ausführlich erklären.
- **V04 Ein IHK-Fall pro Kapitel:** Statt eines Fallbeispiels in drei Sätzen eine Situationsaufgabe im Prüfungsformat mit zwei bis drei Teilaufgaben, Musterlösung und Punkteraster — das verbindet Langfassung und Prüfungssimulator.
- **V05 Verständnisfragen aufklappbar:** Antworten stehen heute direkt hinter der Frage. Lösung erst nach Klick zeigen (gleiches Muster wie Selbsttest), sonst ist es keine Frage.
- **V06 „Warum“ und Grenzfall:** Pro Abschnitt eine Begründung (warum gilt die Regel, wem nützt sie) und ein Grenzfall/Gegenbeispiel („Was, wenn …“). Das trainiert genau die offenen Aufgaben in AP 2.
- **V07 Verknüpfungen:** Feld „Hängt zusammen mit“ — z. B. Skonto (LF 6) ↔ Lieferantenkredit (LF 9) ↔ Angebotsvergleich (LF 4). Das Wissen ist in der App verteilt; die Langfassung ist der richtige Ort, es zu verbinden.
- **V08 Stand und Quelle bei Werten:** Jahresabhängige Werte (Pauschalen, Beitragssätze, Grenzen) einheitlich mit „Stand 2026“ und Rechtsgrundlage auszeichnen — statt „Zu prüfen“-Kästen.
- **V09 Kontonummern:** In allen Buchungssätzen der Langfassung „Nummer + Konto“ aus dem MAKEL-Kontenplan.

---

## 7. Empfohlene Reihenfolge

1. **Sofort (klein, live sichtbar):** F01–F08, S01 — ein Durchgang, ca. 12 Dateien.
2. **KfB-Lücken mit Prüfungsgewicht:** L20 Rechtsformen (neues Kapitel LF 9), L15/L16 Konfliktgespräche (neues Kapitel LF 7), L11–L13 Werbeplanung (LF 5 K6 erweitern oder neues Kapitel), L17–L19 (LF 8), L23/L24 (LF 10), L09 Vertragsarten (LF 4), L03–L06 (LF 2 — ggf. neues Kapitel „Gesund und selbstorganisiert arbeiten“).
3. **Restliche L/K-Punkte KfB**, dann L28–L30 IK.
4. **Langfassung KfB** nach V01–V09; danach dieselben Regeln rückwirkend auf IK anwenden (V03–V07).
5. **Struktur** S02–S06 nebenbei.

---

## 8. Methode und Grenzen

- RLP-Texte wörtlich aus den KMK-PDFs extrahiert und je Lernfeld in Prüfbegriffe zerlegt; alle Kapitel (Kurz, Lang, Aufgaben) als Volltext durchsucht. Jede „fehlt“-Aussage wurde mit erweiterten Suchbegriffen gegengeprüft.
- Fachliche Prüfung: alle Paragrafenangaben der KfB-Kurzfassung gelesen, Jahreswerte 2026 stichprobenartig gegen aktuelle Quellen gehalten, 294 Rechenketten maschinell nachgerechnet. **Nicht** jeder Satz aller 160 Kapitel wurde einzeln fachlich gelesen; IK wurde zuvor bereits zweimal von ChatGPT geprüft.
- Die Lehrplanabdeckung prüft Inhalte, nicht die Unterrichtsmethode (Handlungsprodukte wie Serienbrief oder Kriterienkatalog sind nur dort genannt, wo sie fachlichen Inhalt tragen).
