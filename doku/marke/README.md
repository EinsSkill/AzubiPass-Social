# AzubiPass · Verbindliches Logo v1.0

**Status:** Von Lukes am 15.10.2026 als festes AzubiPass-Logo bestätigt.
**Gültige Richtung:** weicher abstrakter Verbund, grünes „Azubi“, goldenes „Pass“.

## Verbindliche Dateien

| Datei | Verwendung | Format / Größe |
|---|---|---|
| [azubipass-logo.png](azubipass-logo.png) | Vollständige Wort-Bild-Marke, z. B. Website-Kopfzeile | PNG, RGBA, transparent, 2172 × 724 px |
| [azubipass-symbol.png](azubipass-symbol.png) | Einzelnes Symbol, Grundlage für App-Symbol und Profilbilder | PNG, RGBA, transparent, 1254 × 1254 px |

Das einzelne Symbol ist die **korrigierte Fassung ohne den dunklen Fleck auf der rechten grünen Fläche**. Die vorherige fehlerhafte Fassung und frühere Entwürfe sind keine gültigen Markenassets. Dateiprüfsummen und technische Daten stehen in [manifest.json](manifest.json).

![AzubiPass Logo](azubipass-logo.png)

![AzubiPass Symbol](azubipass-symbol.png)

## Getroffene Markenentscheidungen

- Schreibweise: **AzubiPass** (großes A und P).
- Perspektive der Marke: Azubis aller Ausbildungsberufe; dies beschreibt die Markenvision, nicht den aktuell verfügbaren Fachinhaltsumfang der App.
- Versprechen: schwierige Inhalte verstehen und gemeinsam durch die Ausbildung kommen.
- Wirkung: vertrauenswürdig, kompetent, hochwertig und anspruchsvoll.
- „Pass“ bezieht sich auf das Bestehen von Prüfungen („to pass“).
- Zeichen: eigenständiger abstrakter Verbund mit weichen Formen und Goldakzent.
- Schriftzug: markante Serifengestaltung mit klassischen Details; „Azubi“ grün, „Pass“ gold. Die freigegebene Gestaltung liegt als Bild vor, nicht als verbindlich identifizierte Schriftdatei.
- Ausgeschlossen: Buch, Abschlusskappe, Stift, Krone, Lorbeerkranz, Menschenfiguren und Händedruck.

### Farbreferenz für begleitende Gestaltung

| Farbe | Referenz |
|---|---|
| Royal Green | `#1B4332` |
| Deep Green | `#12301F` |
| Matte Gold | `#A88A2C` |
| Warm Cream | `#F5F5F0` |

Die freigegebenen PNGs sind die verbindlichen Bilddateien. Die Farbreferenzen definieren die begleitende Gestaltung; die gerasterten Bilder enthalten auch Kantenglättung und leichte Tonabstufungen.

## Verwendung und Änderungen

- Seitenverhältnis beibehalten; das Zeichen nicht verzerren, beschneiden oder neu generieren. Anzeigerahmen dürfen den transparenten Außenrand ausblenden.
- Das vollständige Logo auf hellen, vorzugsweise cremefarbenen Flächen einsetzen. Der transparente Hintergrund gehört zur Datei.
- Keine neuen Symbole oder zusätzlichen Motive hinzufügen.
- App-Icon-Exporte werden beim Build aus dem freigegebenen Symbol abgeleitet: `symbol-v1-32.png` (Browser), `symbol-v1-180.png` (Apple), `symbol-v1-192.png` und `symbol-v1-512.png` (PWA, auch maskable). Cremefarbene Flächen sichern den Kontrast; die Originaldatei bleibt unverändert.
- Geliefert sind PNG-Rasterdateien. Eine echte SVG-/Vektormasterdatei ist damit nicht erstellt.
- Gestalterische Änderungen am verbindlichen Logo benötigen eine neue Entscheidung von Lukes; Varianten als neue Versionen ablegen.

## Freigabebeleg und Übergabe

Nach der Variante mit goldenem „Pass“ bestätigte Lukes: „Yes das ist geil“.
Nach der Korrektur des einzelnen Symbols folgte der Auftrag:
„Okay dann lege die jetzt als festes logo fest und lade es auch auf github hoch“.

ChatGPT/Codex übernimmt in dieser Phase die Gestaltung, Dokumentation und Ablage der freigegebenen Assets. Claude bleibt Umsetzungseigner für `quellen/`, `supabase/` und `docs/`; bei einer beauftragten Markeneinbindung ist dieses Paket die Grundlage.

Die Erstfestlegung `e39f010` enthielt nur Markenassets und Dokumentation. Danach beauftragte Lukes auf die noch offene Website-Einbindung hin ausdrücklich: „Dann mach das“. ChatGPT/Codex setzt damit in diesem klar begrenzten Folgeauftrag die Logo-Einbindung um; die sonstige Community-Umsetzung bleibt bei Claude.

Die Einbindung umfasst die App-Startansicht, Projektseite, gemeinsamen Fußleisten, Browser-/Apple-/PWA-Icons und den Offline-Vorrat. Sie erfolgt über die Quellen und den regulären Build. Die Originaldateien werden unverändert übernommen. Siehe [Einbindung und Prüfbelege](einbindung.md).
