# B04 behoben, Merge und Deployment · Claude, 21.10.2026

**Auftrag:** Übergabe Lukes → Claude (`68fee73`), [Merge-Freigabe vom 21.10.2026](../entscheidungen.md#merge-freigabe-2026-10-21);
Befund B04 aus [Review 29ce674](2026-10-21-chatgpt-review-29ce674.md). **Rolle:** Umsetzung, Merge, Deployment-Prüfung.
**Paket:** zu (unverändert). Logs: [2026-10-21-claude-b04-merge/](2026-10-21-claude-b04-merge/).

## B04 · behoben (`c622120`)

Ursache wie im Review: Der Abschluss der Bildvorbereitung war an die DOM-Elemente des ersten Formulars gebunden und las mit
`merke()` dessen alten Titel in den weiterverwendeten Entwurf zurück. Korrektur in `quellen/community-beitraege.js`:

- Das Ergebnis gehört dem Entwurf: Bilder, Zähler und Hinweistexte (`vorbereitungsText`) liegen im Entwurf; es werden
  **keine Eingaben** aus einem Formular zurückgelesen (nur die Merker „geändert“ werden gesetzt).
- Jedes aufgebaute Formular setzt `e.nachVorbereitung` auf seine eigene Fassung; der Abschluss informiert nur das gerade offene
  Formular (Prüfung `ctx.gilt()` und Formular im Dokument).
- Ein wieder geöffnetes Formular zeigt eine laufende Vorbereitung („Bilder werden vorbereitet …“) und sperrt Senden; ein schon
  fertiges Ergebnis oder ein Ablehnungsgrund erscheint beim Öffnen.
- Keine Datenbankänderung.

**Abnahme [mock, echte Dekodierung/Canvas, angehaltenes `createImageBitmap`]** (`community_bilder_test.py`, Abschnitt B04):
Vorbereitung anhalten → Heute → Formular → Titel ändern → freigeben: Bild im aktuellen Formular, Senden frei, neuer Titel bleibt,
auch nach erneutem Öffnen, und wird gesendet · Rückkehr erst nach Abschluss · Dekodierfehler während der Abwesenheit (Grund im
aktuellen Formular, Titel bleibt) · Kontowechsel (kein Bild, kein Titel, kein Upload) · Verwerfen (kein spätes Bild).
**Gegenprobe** gegen den Build von `29ce674`: erster B04-Fall FEHL, danach Abbruch ([Log](2026-10-21-claude-b04-merge/gegenprobe-b04-29ce674.log)).

| Prüfung | Ergebnis |
|---|---|
| mock Bilder (inkl. B04) / Korrekturen | **84/84** / **97/97** |
| mock Gruppen / Lernstand / Moderation | **47/47** / **90/90** / **128/128** |
| lokal `funktionstest.py` / `lernkern_audit_test.py` / `pruefe.py --schnell` | **269/269** / in Ordnung / keine Fehler |
| SQL/Konkurrenz | unverändert seit `29ce674` (keine Datenbankänderung) |

## Merge und Deployment

- **Merge-Commit `e4a4210`** auf `main` (vorher `cd4d6cf`), `community-zugang` @ `c622120`, konfliktfrei, per `git push`.
  Ein Pull Request war nicht möglich (GitHub-CLI ohne gültige Anmeldung in der Sitzung).
- **GitHub Pages:** nach etwa einer Minute ausgeliefert; neun Kerndateien live byte-gleich mit `docs/` (SHA-256).
- **Rauchtest live:** Heute, Community-Anmeldung, neue Module geladen, keine Konsolenfehler.
- **Datenbank:** Paket zu, 58 Migrationen; Bildmigrationen nicht erneut ausgeführt.

## Offen

- **Echter Bild-/PDF-Upload, Mehrbildansicht, Verkleinerung mit internem Testkonto:** nicht geprüft – in der Sitzung gibt es kein
  Testpasswort. Vorschlag: Lukes postet als Tester (Paket bleibt zu, Tester sehen den Bereich) eine Frage mit 2–3 Handyfotos
  und einen PDF-Lernzettel.
- Echte Handys/HEIC, Zwei-Geräte-Lernstand, Brevo, Datenschutzwerte und -abschnitt zu Beiträgen/Bildern, Paketöffnung (gesondert).
