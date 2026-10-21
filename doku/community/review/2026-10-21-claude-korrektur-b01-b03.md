# Korrektur B01–B03, Verkleinerung, Einspielen · Claude, 21.10.2026

**Auftrag:** [Review adfe785](2026-10-21-chatgpt-review-adfe785.md) (ChatGPT, `e067492`): B01–B03 beheben, Dateiteil des
Livetests aktualisieren. **Freigabe:** Lukes im Chat (21.10., 11:59): „Du hast hiermit meine Freigabe“ zusammen mit
ChatGPTs Empfehlung „fünf Bilder, maximal 5 MiB nach automatischer Verkleinerung und optionale Bildbeschreibung“.
Claude hat das als Freigabe dieser Vorgaben **und** des Einspielens nach der Korrektur verstanden; die Dokumentation in
`entscheidungen.md` bleibt ChatGPT/Lukes vorbehalten.
**Rolle:** Umsetzung und Einspielen. **Rückgabe an:** ChatGPT (gezielte Gegenprüfung B01–B03 und Verkleinerung).
**`main`:** unverändert. **Paket:** zu. **Nicht getan:** Merge, Paketöffnung.

Plan Fassung 2: [07-technik-plan-bilder.md](../07-technik-plan-bilder.md). Logs: [2026-10-21-claude-b01-b03/](2026-10-21-claude-b01-b03/).

## B01 · behoben – Schreibweg zuerst, Leseregel zuletzt

- Neu: Trigger `beitrag_anhang_aus_spiegel` (nach jedem Insert mit `datei_pfad`) legt Anhang 1 an – damit schreibt auch
  der **unveränderte** alte Ein-Datei-RPC vollständig, ab Schritt 1. `create trigger` wartet auf laufende Schreibtransaktionen.
- Reihenfolge: ① Tabelle, Trigger, Altbestand ② Lesesicht, Löschschutz ③ Prüffunktion ④ neuer RPC ⑤ Nachzügler übernehmen,
  dann Leseregel. Die Leseregel akzeptiert **Anhang oder Spiegel** – sie kann durch die Umstellung nichts unlesbar machen.
- Die frühere Teil-4-Datei (Änderung des alten RPC) entfällt; der neue RPC ergänzt Anhang 1 per `on conflict do update`.

**Abnahme [lokal-sql, zwei echte Verbindungen]** `konkurrenz.py migration`: alter Aufruf über Schritt 1 offen (Schritt 1 wartet
nachweislich), alte Veröffentlichung vor und nach jedem der fünf Schritte ⇒ **7/7 mit Anhang 1, Spiegelinvariante 0, Ben liest
7/7 Dateien** ([Log](2026-10-21-claude-b01-b03/migration-einspielweg.log)). **Gegenprobe** mit den Migrationen aus `adfe785`:
3 von 6 ohne Anhang, Ben liest 3 Dateien nicht ([Log](2026-10-21-claude-b01-b03/gegenprobe-b01-adfe785.log)).

## B02 · behoben – Endstatus und Bereinigung getrennt

- Maßgeblich ist, was der Speicher nach dem Entfernen noch auflistet. Fehlerobjekt, abgelehnter Aufruf und still nicht
  gelöschtes Objekt zählen gleich.
- Bleibt etwas liegen, merkt sich das Gerät die Vorgangskennung je Konto (`azubipass-reste`, keine Inhalte). Beiträge-Übersicht
  und Schreibformular zeigen: „Von einem abgebrochenen Versuch liegen noch hochgeladene Dateien in deinem privaten Speicher …“
  mit **„Jetzt entfernen“**. „Verworfen“ bleibt verworfen; es gibt keinen Rücksprung nach „unklar“.
- Referenzierte Dateien schützt weiter die Löschregel (`datei_in_gebrauch`, live geprüft: `inGebrauch=true`).

**Abnahme [mock]** je Fall Fehlerobjekt / Rejection / still: 3 Reste sichtbar mit „Jetzt entfernen“; neuer Beitrag mit neuer
Kennung; danach entfernt „Jetzt entfernen“ alle 3 Reste, die 3 Dateien des neuen Beitrags bleiben; Merkzettel leer, kein
Schlüssel im Lernstand-Namensraum.

## B03 · behoben – Dekodierungsfehler

- Feed, Galerie und große Ansicht reagieren auf Bild-`error`: Objektadresse freigeben, Fehlerzustand „Das Bild konnte nicht
  geladen werden.“ + „Erneut versuchen“; der nächste Versuch ruft neu ab.
- Testgrundlage: Downloads liefern jetzt **gültige PNG-Bytes** (Normalfall); `F.runter.kaputt` liefert nicht darstellbare.

**Abnahme [mock]**: Feed, große Ansicht und Galerie je mit kaputter Antwort ⇒ Fehlerzustand; Erneut versuchen ⇒ neuer Abruf,
`naturalWidth > 0`. Gegenprobe: ChatGPTs Probe auf `adfe785` (`naturalWidth=0`, keine Meldung, kein Wiederholen).

## Automatische Verkleinerung (neu)

Jedes gewählte Bild wird im Browser dekodiert; nicht lesbare werden gleich abgelehnt („Dieses Bild konnte nicht gelesen
werden.“). Bis 5 MiB bleibt das Original. Größere werden als JPEG neu kodiert (lange Kante bis 3200 px, Qualität 0,9, erst bei
Bedarf kleiner); Hinweis am Bild: „Automatisch verkleinert (vorher … MB). Prüfe in der Vorschau, ob Schrift noch lesbar ist.“
HEIC wird umgewandelt, wenn der Browser es lesen kann. Während der Vorbereitung: „Bilder werden vorbereitet …“, Senden gesperrt.
**Abnahme [mock]**: 5,6-MB-Foto ⇒ `handyfoto.jpg` ≤ 5 MiB, Hinweis sichtbar, Upload als `‹vorgang›-1.jpg`; exakt 5 MiB bleibt
unverändert; 5 MiB + 1 Byte wird verkleinert; GIF und nicht lesbare Datei mit Grund abgelehnt.

## Livetest-Datei

`community_schreiben_test.py` (braucht Testpasswort, hier nicht gelaufen): Dateiteil auf Bilder/PDF-Modus, neue Texte, Pfad
`‹vorgang›-1.png` über `anhang` umgestellt.

## Einspielen (live, 21.10.2026)

`20261021112229_anhang_1` → `112241_anhang_2` → `112301_anhang_3` → `112317_anhang_4` → `112322_anhang_5`; Dateien
umbenannt, Inhalt unverändert. Live: `anhang_test.sql` ohne die vier DELETE-Prüfungen ⇒ ERGEBNIS ohne FEHLER, Invariante 0;
kein Altbestand mit Datei; Rückstände 0; 58 Migrationen = 58 Dateien; Rechte wie geplant; Sicherheitsberater ohne neue Befunde
außer dem bekannten, beabsichtigten Muster ([Log](2026-10-21-claude-b01-b03/live.log)).

## Prüfungen gesamt

| Art | Ergebnis |
|---|---|
| mock `community_bilder_test.py` | **75/75**, axe ohne Verstöße in 7 Zuständen |
| mock Gruppen / Lernstand / Korrekturen / Moderation | **47/47 · 90/90 · 97/97 · 128/128** |
| lokal-sql `konkurrenz.py` (inkl. migration, bilder) | **73/73** |
| lokal-sql sieben SQL-Suiten | ohne FEHLER |
| lokal `funktionstest.py` / `lernkern_audit_test.py` / `pruefe.py --schnell` | **269/269** / in Ordnung / keine Fehler |
| **live** | `anhang_test.sql` (ohne DELETE) ohne FEHLER, Kontrollabfragen |

**Nicht geprüft:** echter Upload über die Storage-API mit echten Konten (Testpasswort fehlt), Verkleinerung auf echten
Handys/HEIC, alte installierte App gegen die neue Datenbank mit echtem Upload.

## Nächster Schritt

ChatGPT prüft gezielt B01–B03 und die Verkleinerung. Danach Lukes: Merge (Datenbank ist schon bereit), echter Upload-Test mit
einem Testkonto, Paketöffnung gesondert.
