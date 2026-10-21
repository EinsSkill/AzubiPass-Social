# Gegenprüfung B01–B03 und Fotoverkleinerung

**Vorgänger:** Claude, Korrektur/Einspielen `29ce674` nach ChatGPT-Review `e067492`.
**Rolle:** gezielte Gegenprüfung. **Geprüfter Anwendungsstand:** `29ce674a0f5a132c709022d67a345b941d773a4f`, Branch `community-zugang`.
**Rückgabe:** Claude für B04, danach gezielte Abschlussgegenprüfung; Merge/Paketöffnung bleiben bei Lukes.

**Ergebnis:** **B01, B02 und B03 sind in den gezielten Abnahmen behoben.** Die normale Fotoverkleinerung funktioniert. Ein neuer, reproduzierter Formularfehler **B04** in der asynchronen Vorbereitung sollte vor dem Merge korrigiert werden. Kein neuer allgemeiner Audit und keine weitere Migration für B04 erforderlich.

## B01–B03 abgeschlossen

| Befund | Gegenprüfung / Ergebnis |
|---|---|
| B01: Veröffentlichungen zwischen Migrationen verlieren Anhang | Die fünf aktuellen Migrationen auf PostgreSQL-WASM ausgeführt. Frühere Originalprobe: alter RPC nach Schritt 1 → **Beitrag=1/Anhang=1**; nach allen fünf Schritten weiterhin **1/1**, anderes berechtigtes Konto sieht **Datei=1**. Der unveränderte alte RPC schreibt über den Trigger ab Schritt 1. Leseregel wird zuletzt umgestellt und behält den berechtigten Spiegelpfad. |
| B02: fehlgeschlagene Bereinigung ohne Wiederholungsweg | Bildsuite unabhängig: Fehlerobjekt, Rejection und still nicht entfernt jeweils mit erreichbarem „Jetzt entfernen“; erfolgreiche Wiederholung entfernt die alten drei Dateien und erhält die drei des neuen Beitrags. Endstatus bleibt getrennt von Bereinigung, Merkzettel kontogebunden außerhalb des Lernstand-Namensraums. |
| B03: beschädigte Bildbytes ohne Fehleroberfläche | Bildsuite unabhängig mit gültigen PNG-Normaldaten und beschädigten Gegenproben: Feed, Galerie und Großansicht zeigen Fehler/Wiederholen; Wiederholung lädt neu und endet mit `naturalWidth > 0`. |

Originales `anhang_test.sql` auf dem nachgestellten Einspielweg und einer zweiten sauberen Datenbank: jeweils ohne `FEHLER:`, **`invariante=0`**, inklusive der lokalen DELETE-Prüfungen. Die SQL-Engine war PGlite 0.5.10 / PostgreSQL 18.6 mit den unveränderten Projektmigrationen und den Supabase-Grundobjekten aus dem Repository. **Keine eigene Prüfung mit zwei nativen Verbindungen.** Claudes 73/73 und seine dokumentierte Warteprobe des laufenden alten RPC sind fremde Belege, keine hier erneut ausgeführten Tests. Der Triggeraufbau mit Sperre vor der Bestandsübernahme passt zur Korrektur.

## Fotoverkleinerung: Normalfall bestätigt, B04 beim Wiederöffnen

Die unabhängige Bildsuite besteht **75/75**, darunter die neuen Größenfälle, Verkleinerung eines echten großen PNG, JPEG-Uploadpfad, Ablehnung nicht lesbarer Auswahl und die bisherigen sieben axe-Zustände (axe-core 4.10.2). Bilder bis zur Grenze bleiben unverändert. Die Verkleinerung nutzt die Originaldekodierung und Canvas, der Hinweis zur Schriftlesbarkeit erscheint.

### B04 · Mittel: Vorbereitung aktualisiert ein altes Formular und überschreibt neue Eingaben

**Ort:** `quellen/community-beitraege.js:1872–1904` (Vorbereitungsabschluss, insbesondere `merke()`, `bilderAnzeigen()`, `vorbereitenAnzeigen()`), `1911–1917` (Sperren/Status); Wiederaufbau in `schreiben()`.

**Reproduktion mit echten Clientmodulen:**

1. Titel „Foto wird vorbereitet“ und Text eingeben; gültiges PNG mit 5 MiB + 1 Byte auswählen. Die Probe hält lediglich den Aufruf von `createImageBitmap` an; beim Freigeben laufen die originale Dekodierung und JPEG-Verkleinerung weiter.
2. Während „Bilder werden vorbereitet …“ zu „Heute“ und wieder ins Schreibformular wechseln. Der Entwurf wird für dasselbe Konto weiterverwendet, das Formular neu aufgebaut.
3. Dort den Titel zu „Neuer Titel im wieder geöffneten Formular“ ändern und die Dekodierung freigeben.

**Beobachtet:** Die aktuelle Oberfläche bleibt auch nach Fertigstellung bei **0 sichtbaren Bildern / Senden gesperrt**, ohne Vorbereitungsstatus. Beim erneuten Weggehen und Öffnen erscheint das fertig vorbereitete Bild und Senden ist wieder frei; der Titel ist aber auf **„Foto wird vorbereitet“ zurückgesetzt**. Der im neu geöffneten Formular eingegebene Titel ist verloren.

**Kontrollfälle:** Ohne Ansichtswechsel → nach Fertigstellung **1 Bild / Senden frei**. Kontowechsel A→B während der angehaltenen Dekodierung → **0 Bilder von A, 0 Uploads, 0 Veröffentlichungen** unter B.

**Ursache:** Die Promise-Abschlussfunktion ist an die DOM-Elemente des ersten Formulars gebunden. `entwurf === e` bleibt beim Wiederöffnen wahr; anschließend liest `merke()` den alten Titel aus dem alten Formular zurück in den weiterverwendeten Entwurf. Vorschau und Sperren werden ebenfalls nur dort aktualisiert. Die Gültigkeits-/DOM-Prüfung kommt erst danach. Das betrifft die neue asynchrone Vorbereitungsphase, nicht die bestätigten B01–B03-Korrekturen.

**Gezielter Auftrag an Claude:** Vorbereitungszustand und Ergebnis im kontogebundenen Entwurf führen und die jeweils aktuelle Formularansicht informieren. Aus dem Vorbereitungsabschluss keine Eingaben des verlassenen Formulars zurückschreiben. Beim Wiederöffnen laufende Vorbereitung konsistent anzeigen/sperren; nach Abschluss die aktuelle Vorschau, Zähler und Senden aktualisieren. Keine neue Datenbankänderung und kein Eingriff in die abgeschlossenen Lernstand-Korrekturen.

**Abnahme B04:** Vorbereitung anhalten → weg/Zurück → Titel im aktuellen Formular ändern → freigeben: Bild erscheint dort, Senden wird frei, neuer Titel bleibt auch nach erneutem Öffnen erhalten. Zusätzlich Rückkehr erst nach Abschluss, abgelehnte Dekodierung und Kontowechsel/Verwerfen prüfen. Bestehende Bild-/Korrekturfälle erhalten. Danach nur diese Korrektur gegenprüfen; keine neue breite Review-Runde.

## Eigene Belege / Grenzen

[Rohbelege und ausführbare Proben](2026-10-21-chatgpt-29ce674/): `bilder.log` **75/75**, `korrekturen.log` **97/97**, `vorbereitung-probe.py/.log`, `migration-probe.mjs`, zwei SQL-Dateien und `migration.log`. Der Browserlauf nutzt einen nachgebildeten Server; Bilddekodierung und JPEG-Erzeugung laufen im echten Chromium. Die erste Fassung der Zusatzprobe wartete irrtümlich auf die Entfernung des versteckten Community-DOM statt auf `hidden`; das wurde im Test korrigiert. Der abgelegte vollständige Lauf verwendet die tatsächliche App-Navigation und endet regulär.

Browserprobe: `python vorbereitung-probe.py /absoluter/repopfad` mit Playwright/Chromium. SQL: `npm install --prefix /tmp/bildreview @electric-sql/pglite@0.5.10`, `migration-probe.mjs` dorthin kopieren und `node /tmp/bildreview/migration-probe.mjs /absoluter/repopfad /absoluter/belegordner`. Der Belegordner enthält beide SQL-Dateien. Die `ERGEBNIS:`-Ausnahme des Originaltests ist dessen beabsichtigte Rollback-Ausgabe.

Keine eigene produktive Konto-/Storage-/Handy-/HEIC-Probe; kein eigener erneuter allgemeiner Funktionstest. Live-Stand, Sicherheitsberater und Migrationenzahl werden nur aus Claudes Bericht/Log übernommen, nicht als unabhängig verifiziert bezeichnet. Seine dokumentierte Freigabeinterpretation bleibt als solche bestehen; dieses Review erteilt keine zusätzliche Produkt-, Merge- oder Paketöffnungsfreigabe und trägt keine unbeobachtete Entscheidung in `entscheidungen.md` ein.

Es wurden nur Review, Übergabe und Belege geschrieben. `quellen/`, `supabase/`, `docs/`, Live-Datenbank und `main` durch ChatGPT unverändert. Nächster Schritt: **Claude korrigiert ausschließlich B04**, danach gezielte Abschlussgegenprüfung; anschließend Lukes' Merge-Entscheidung und echter Upload-Test mit internem Testkonto bei weiter geschlossener Paketsperre.
