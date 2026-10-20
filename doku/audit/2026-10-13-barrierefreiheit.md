# AzubiPass · Barrierefreiheits-Scan · 13.10.2026

Stand: `community-zugang` @ `a0954dc` (enthält `lernkern-audit`). Nur geprüft,
nichts geändert. Werkzeug: axe-core 4.10.2 in Chromium (Regeln WCAG 2.0/2.1/2.2
A und AA plus „best practice“), 390 × 844, helles und dunkles Systemschema.

**Geprüft (43 Ansichten):** Heute, Lernen, Üben, Suche, Ich, Probeklausur-Auswahl;
Kapitel LF1 K1 (Kette), LF1 K2 (Vergleich), LF4 K6, Buchführung K1 (auch mit
umgedrehter Karte), Deckblatt LF1; Landing Page, Hinweise, Datenschutz – jeweils hell und
dunkel. Community: Anmeldung, Mail versendet/Code, Code-Fehler, Profil anlegen
(leer und mit Fehlern), Regeldialog, Beiträge, Filter ohne Treffer, Beitrag mit
Bild und Antwort, Profil, nicht verfügbar, offline. Für die Community-Ansichten
lag kurz ein echter Testbeitrag vor; er ist wieder gelöscht.

## Ergebnis

| Bereich | WCAG-Verstöße | Hinweise (best practice) |
|---|---|---|
| App (Heute, Lernen, Üben, Suche, Ich) | 0 | 0 |
| Community (alle 13 Ansichten) | 0 | 0 |
| Hinweise, Datenschutz | 0 | 0 |
| Kapitelseiten | 1 Regel (Tabellen per Tastatur) | 2 Regeln |
| Deckblatt LF1, Landing Page | 1 Regel (Kontrast Tab-Leiste) | 3 Regeln (nur Landing) |

## Echte WCAG-Verstöße

**1 · Scrollbare Tabellen nicht per Tastatur erreichbar** (WCAG 2.1.1, ernst) –
24 Stellen in den geprüften Kapiteln. Breite Tabellen stecken in
`.tab-huelle` (`overflow-x:auto`). Wer nur die Tastatur benutzt, kann sie auf
schmalen Bildschirmen nicht seitlich scrollen.
*Vorschlag:* In `build.py` bekommt die Hülle `tabindex="0"`, `role="region"`
und eine Beschriftung aus der Tabellenüberschrift, dazu ein sichtbarer Fokusring. Kleine
Änderung, betrifft alle Kapitel.

**2 · Kontrast knapp zu niedrig** (WCAG 1.4.3) –
Deckblatt LF1: die Tab-Leiste („Heute“, „Üben“ …) hat #63685F auf durchscheinendem
Hellgrau (gemessen #E3E5DF) bei 10,5 px, also **4,49 : 1** statt 4,5 : 1.
*Korrektur nach dem ersten Bericht:* Auf der Landing Page sind es zwei andere
Stellen – der kleine goldene Knopf in der Navigation (die Navigation setzt alle
Links auf 82 % Deckkraft, **3,61 : 1**) und die Fußzeilen-Links (**4,43 : 1**).

## Hinweise (keine WCAG-Pflicht, aber sinnvoll)

- **Kapitelseiten ohne `<h1>`** – der Kapiteltitel ist `<h2>`. Bildschirmleser
  springen gern zur Hauptüberschrift. *Vorschlag:* Titel des sichtbaren Kapitels als
  `<h1>` (Achtung: Folgen für Gliederung und CSS prüfen).
- **Randspalte `<aside>` im `<main>`** (Kapitel) – Bildschirmleser melden sie als
  eigenen Bereich an der falschen Stelle. Gering.
- **Landing Page:** kein `<main>`, zwei Navigationen ohne unterscheidenden Namen,
  Inhalte außerhalb von Bereichen. *Vorschlag:* `<main>` um die Abschnitte,
  `aria-label` für die Navigation.

## Nicht eindeutig (manuell prüfen)

195 Stellen in 21 Ansichten meldet axe als „Kontrast nicht bestimmbar“, meist
weil Hintergründe Verläufe oder Bilder sind oder Elemente überlappen (z. B.
Antwortfelder in Kapiteln, Community-Formular auf dem grünen Verlauf). Das sind
**keine** nachgewiesenen Fehler; `pruefe.py` misst die Kontraste der wichtigsten
Elemente selbst und meldet keine Fehler.

## Was dieser Scan nicht leistet

Ein automatischer Scan findet erfahrungsgemäß nur einen Teil der Probleme. Offen
bleiben weiter: echte Bildschirmleser (VoiceOver, TalkBack, NVDA), die
Bildschirmtastatur auf echten Geräten, der Zoom von Betriebssystem/Browser
(Umbrechen bei 320 px ist geprüft: alle 75 Kapitel ohne Überlauf), die übrigen
14 Grafiktypen und SVG-Hotspots per Tastatur. Ein Versuch, 200 % Zoom per CSS
nachzustellen, war nicht aussagekräftig und ist deshalb hier nicht gewertet.

## Behoben (Entscheidung Lukes 13.10.2026, Branch `lernkern-audit`)

- Tabellen: Hülle ist ein benannter Bereich (`role="region"`, `aria-label`), per
  Tastatur erreichbar (`tabindex="0"`), **sobald sie tatsächlich scrollt**
  (`kern.js`, auch bei Größenänderung); sichtbarer Fokusring.
- Tab-Leiste auf hellen Seiten #5C6158 (5,0 : 1); dunkle Bereiche unverändert.
- Landing: goldener Knopf in der Navigation voll deckend (5,91 : 1), Fußzeile
  heller (6,24 : 1).
- Erneuter Scan der Lernansichten: **0 WCAG-Verstöße**; übrig sind nur die
  Hinweise oben (`<h1>`, `<aside>`, Landing-Bereiche) – die bleiben bis zur
  Entscheidung offen.
- Regression: `lernkern_audit_test.py`, Abschnitt BF.
