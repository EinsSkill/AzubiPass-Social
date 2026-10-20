# Logo v1.0 · Einbindung und Prüfbelege

Stand: 15.10.2026. Grundlage: Markenfreigabe `e39f010`, aufgebaut auf dem Community-Stand `a22ee325`.

## Auftrag und Ergebnis

Nach der Freigabe und GitHub-Ablage wies Lukes ChatGPT/Codex mit „Dann mach das“ an, die noch offene Website-Einbindung auszuführen. Dieser Folgeauftrag ist auf die Marke begrenzt; er ändert keine Community-Berechtigungen, Datenbankregeln oder bestehende Moderationsfreigaben.

- Die App zeigt auf „Heute“ das freigegebene Logo anstelle des bisherigen Textschriftzugs.
- Die Projektseite verwendet es im Kopf und Fuß; die gemeinsamen Fußleisten der App, Lernkapitel und Rechtsseiten verwenden dieselbe Datei.
- Auf dunklen Flächen trägt ein cremefarbener Anzeigerahmen das Original. Die Darstellung blendet nur transparenten Außenrand aus, ohne das Zeichen zu verzerren oder neu zu zeichnen.
- Browser-, Apple- und PWA-Icons entstehen beim App-Build aus dem korrigierten einzelnen Symbol. Größen: 32, 180, 192 und 512 Pixel. Die sichtbare Form liegt innerhalb des sicheren Kreises für Systemmasken.
- Die versionierten Icon-Pfade ersetzen das frühere Rautensymbol; der Build entfernt die alten Icon-Ausgaben.
- Alle Markenbilder und Icons stehen im bestehenden Offline-Vorrat mit SHA-256-Prüfwerten. Der vorhandene Update-Ablauf bleibt erhalten.

Die beiden Originale unter `doku/marke/` bleiben bytegenau unverändert. `gemeinsames.py` kopiert sie beim regulären Build nach `docs/mittel/`. Es gibt keine zweite, separat zu pflegende Quelldatei und keine behauptete SVG-Masterdatei.

## Quellen und Build

Geändert: `quellen/app.js`, `quellen/azubipass.css`, `quellen/landing.css`, `quellen/build_app.py`, `quellen/build_landing.py` und `quellen/gemeinsames.py`.

`docs/` wurde ausschließlich mit den regulären Build-Skripten erzeugt. Die vorhandenen lokalen Schriften waren bereits im Repository enthalten.

```bash
cd quellen
python build.py
python build_app.py
python build_landing.py
python funktionstest.py
python lernkern_audit_test.py
python pruefe.py app.html landing.html buchfuehrung.html
```

Playwright und ein vorhandenes Chromium wurden in der Ausführungsumgebung über einen externen Testadapter verbunden; der Adapter gilt auch für vom Funktionstest gestartete Build-Prozesse. Er ist kein Teil des Anwendungscodes.

## Prüfung

- Die drei Build-Schritte sind erfolgreich.
- Funktionstest: **269 von 269 bestanden**, einschließlich Offline-Übernahme, Laden von App/Lernzettel ohne Netz und erneutem reproduzierbarem Build.
- Sichtprüfung von App, Projektseite und Buchführung bei Handy/Desktop sowie heller/dunkler Geräteeinstellung: **keine Fehler**.
- Zusätzliche Browserkontrolle von App, Projektseite und Buchführung bei 320, 390 und 1440 Pixeln: Markenbilder geladen, korrekte Alternativtexte, keine Seitenfehler und kein seitlicher Überlauf der geprüften Einstiegsansichten.
- App-Icon-Maske: keine deutlich sichtbaren Symbolpixel außerhalb des sicheren Kreises (Radius 40 % der Iconbreite).
- Originaldateien in `docs/mittel/` und `doku/marke/` sind bytegleich. Größen und Hintergrund der vier Icon-Dateien wurden geprüft.
- Der Offline-Vorrat enthält alle sechs neuen Marken-/Icon-Dateien. Alle 59 Datei-Prüfwerte des vollständigen Vorrats stimmen mit den gebauten Dateien überein.

### Bereits vorhandener Befund

`lernkern_audit_test.py`: **51 Prüfungen bestanden, eine fehlgeschlagen**. A09 meldet bei 320 Pixeln im Kapitel `buchfuehrung.html#k6` eine Seitenbreite von 321 Pixeln. Die isolierte Gegenprobe `--nur A09` am unveränderten Vorherstand `e39f010` meldet exakt denselben Überlauf. Das ist kein neuer Logo-Befund; alle übrigen Abschnitte des Lernkern-Tests bestanden. Der Gesamt-Lernkern-Test wird ausdrücklich nicht als vollständig grün geführt.

## Sichtbelege

- [App auf dem Handy (390 px)](pruefung/app-390.png)
- [Projektseite am Desktop (1440 px)](pruefung/landing-1440.png)

## Umfang der Veröffentlichung

Die Einbindung wird im Markenbranch geprüft und über den Pull Request in `community-zugang` übernommen. `main`, produktive Datenbank, Paketsperre und Website-Deployment gehören nicht zu dieser Änderung. Ein bereits installiertes PWA-Symbol kann zusätzlich vom Betriebssystem zwischengespeichert werden; die neuen Dateipfade liegen im Manifest vor.
