# Korrektur LS01, LS02, H02 · Claude, 20.10.2026

**Auftrag:** [Review 2d2f478](2026-10-20-chatgpt-review-2d2f478.md) (ChatGPT): LS01 und LS02 gezielt beheben,
H02 im Test richtigstellen. **Vorheriger Beitrag:** ChatGPT, `f325191`. **Rolle:** Umsetzung.
**Rückgabe an:** ChatGPT, gezielte Gegenprüfung des Lernstand-Abgleichs. **`main`:** unverändert `cd4d6cf`.
**Paket:** zu. **Datenbank:** unverändert (keine Migration, kein Live-Eingriff; beide Fehler lagen im Browser).
**Nicht getan:** Merge, Paketöffnung, Produktentscheidung über anonyme Daten.

Rohprotokolle: [2026-10-20-claude-ls01-ls02/](2026-10-20-claude-ls01-ls02/).

## LS01 · Kontotrennung vor dem ersten erfolgreichen Abgleich · behoben

`quellen/lernstand-sync.js`, `quellen/community.js` (neu `gespeichertesKonto()`):

- **Besitzer sofort, nicht erst nach Erfolg.** Der Merkzettel `azubipass-lernsync` trägt das Konto, sobald eine
  Anmeldung bekannt ist: aus der gespeicherten Sitzung beim Start (ohne Netz), aus `INITIAL_SESSION`/`SIGNED_IN`,
  aus der Serverantwort und – falls noch keiner gesetzt ist – bei der ersten Änderung mit Sitzung.
  `version`/`am` bleiben bis zum ersten Erfolg leer (`null`).
- **Trennen vor Anzeige und Senden.** Meldet sich ein anderes Konto an (`kontoVermerken`, synchron), wird zuerst
  getrennt: Noch nicht gesendete Änderungen des bisherigen Kontos werden unter dessen Kennung in
  `azubipass-lernsync-offen` zurückgelegt, der Tab bekommt den zurückgelegten Stand des neuen Kontos oder einen
  leeren Anfang. Erst danach wird abgerufen oder gesendet. Ein leerer Anfang zählt nicht als eigene Änderung,
  ein vorhandener Serverstand ersetzt ihn ohne Upload.
- **Rückkehr des ersten Kontos.** Meldet sich A auf diesem Gerät wieder an, kommt sein zurückgelegter Stand zurück
  und wird normal abgeglichen (Basis = zuletzt bekannte Version oder Erstabgleich mit Zusammenführung). Danach ist
  der Eintrag weg. Auch eine verlorene erste Speicherantwort löst sich so auf.
- **Anonymer Gerätestand** (nie angemeldet, kein Besitzer) geht wie bisher beim ersten Abgleich ins erste Konto.
  Abmelden ändert den Besitzer nicht: Was danach ohne Anmeldung gelernt wird, gehört weiter zum letzten Konto.
- `merken()` schreibt nur noch, wenn der Merkzettel weiterhin zum Konto des Aufrufs gehört; ein anderer Besitzer
  bricht die Runde als „veraltet“ ab und sie beginnt neu. Blockierter Speicher führt zu einer Fehlermeldung statt
  einer Endlosschleife.

**Grenze:** Zurückgelegte Stände liegen – wie bisher der Gerätestand selbst – im Browser dieses Geräts.

## LS02 · Mehrere Tabs · behoben

`quellen/kern.js`, `quellen/app.js`, `quellen/lernstand-sync.js`:

- **Zusammenführung in `kern.js`.** `zusammenfuehren` samt Helfern liegt jetzt in `kern.js` (unverändert), weil
  auch die Lernzettelseiten sie brauchen. `app.js` nutzt sie über `AP` (Sicherung einspielen unverändert).
- **Jeder Tab kennt seinen Stand im Browser.** `kern.js` merkt sich, was der Tab zuletzt gelesen oder geschrieben
  hat. Vor jedem Schreiben: Hat ein anderer Tab seitdem geschrieben, wird das mit der eigenen, noch nicht
  geschriebenen Änderung zusammengeführt statt überschrieben. Gehört der fremde Stand inzwischen einem anderen
  Konto, gilt er ohne Zusammenführung (Reste wandern nicht mit, siehe LS01).
- **Übernehmen ohne eigene Änderung.** `storage`-Ereignis und Rückkehr in den Tab holen den Stand aus dem Browser
  (`AP.kontoAuffrischen`); hat der Tab noch Ungeschriebenes, wird zusammengeführt und geschrieben. Ersetzt wird
  ohne neue Objekte für Kapitelstände, damit Lernzettelseiten, die sich ihr Kapitelfach merken, weiterarbeiten.
- **Versionsbasis gehört zum Inhalt.** Der Abgleich liest vor jeder Entscheidung erst den Merkzettel, dann den Stand
  aus dem Browser in den Tab. Was der Merkzettel als gesendet nennt, steckt damit sicher im Stand dieses Tabs; eine
  fremde, noch ungesendete Änderung zählt als lokale Änderung und wird gesendet bzw. zusammengeführt.

**Grenze (unverändert dokumentiert):** Die Zusammenführung vereinigt Lesezeichen. Entfernt ein Tab ein Lesezeichen,
während ein anderer innerhalb des Bündelfensters (400 ms) selbst eine Änderung schreibt, kann es zurückkommen.
Ohne gleichzeitige Änderung übernimmt der andere Tab den Stand und die Entfernung bleibt.

## H02 · Wartebedingung im Moderationstest · richtiggestellt

`quellen/community_moderation_test.py`: wartet nach „1 offene Meldung“ zusätzlich auf den Hinweis im geladenen
Falldetail. Keine Anwendung geändert.

## Abnahme

| Prüfung | Ergebnis |
|---|---|
| `lernstand_sync_test.py` [mock], 31 neue Fälle LS01/LS02 | **64/64** ([Log](2026-10-20-claude-ls01-ls02/lernstand-mock.log)) |
| Gegenprobe: dieselbe Suite gegen `2d2f478` | **14 FEHL** in LS01, Abbruch beim ersten LS02-Schritt ([Log](2026-10-20-claude-ls01-ls02/gegenprobe-2d2f478.log)) |
| ChatGPTs Probe `lernstand-probe.py` auf neuem Stand | S01–S03 alle `False` ([Log](2026-10-20-claude-ls01-ls02/chatgpt-probe-auf-neuem-stand.log)) |

Abgedeckte Fälle LS01: Erstabruf scheitert (B mit und ohne Serverstand), verlorene erste Speicherantwort, Rückkehr
zu A, Abmelden und anderes Konto, Neustart mit gespeicherter Sitzung von B ohne Netz, anonymer Gerätestand.
LS02: Lernzettelseite plus offener App-Tab, zwei App-Tabs mit gemeinsamem Server, gleichzeitige lokale Änderung
(eine noch gebündelt), Rückkehr in den Tab, Neustart, Kontowechsel im anderen Tab mit gebündeltem Rest.

## Regression

Mit axe-core **4.10.2** (Projektstand laut `community_korrekturen_test.py`):

| Suite | Ergebnis |
|---|---|
| Gruppen-Mock (inkl. F01) | **47/47** ([Log](2026-10-20-claude-ls01-ls02/gruppen-mock.log)) |
| Korrekturen-Mock | **97/97** ([Log](2026-10-20-claude-ls01-ls02/korrekturen-mock.log)) |
| Moderations-Mock (mit H02) | **128/128** ([Log](2026-10-20-claude-ls01-ls02/moderation-mock.log)) |
| Lernkern-Audit | **52/52** ([Log](2026-10-20-claude-ls01-ls02/lernkern.log)) |
| Funktionstest samt Build | **269/269** ([Log](2026-10-20-claude-ls01-ls02/funktionstest.log)) |
| `pruefe.py --schnell` | keine Fehler ([Log](2026-10-20-claude-ls01-ls02/pruefe-schnell.log)) |

**Hinweis H03 (nicht Teil dieses Auftrags):** Mit dem neueren axe-core **4.14.0** meldet die Regel
`label-content-name-mismatch` je einen bzw. zwei Knöpfe im Hilfreich-Knopf (Gruppen 46/47) und in vier
Antwort-Zuständen (Korrekturen 93/97). Derselbe Befund tritt auf `2d2f478` auf, ist also älter und kommt
aus der neueren Regelversion ([Gruppen](2026-10-20-claude-ls01-ls02/gruppen-mock-axe-4.14.log),
[Korrekturen](2026-10-20-claude-ls01-ls02/korrekturen-mock-axe-4.14.log)). Ursache vermutlich: sichtbarer Text
des Knopfs ist nicht im `aria-label` enthalten. Kleine Korrektur, wenn Lukes sie will.

**Nicht geprüft:** echte Konten, zwei echte Geräte, Live-Datenbank (nicht berührt).
