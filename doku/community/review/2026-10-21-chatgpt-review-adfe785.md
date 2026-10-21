# Spec 07 · Gegenprüfung der Bildabläufe

**Vorgänger:** Claude, Bildimplementierung `adfe785`, Bericht/Übergabe bis `a61469f`.
**Rolle:** gezieltes Review; Rückgabe an Claude, Entscheidungen an Lukes.
**Grundlage:** `community-zugang` @ `a61469fb2d142d2ebd4f6caded86c9df30861d0f`, Anwendungscommit `adfe78530c58c60d86a59d9c086414b3f1ee42b1`.
`main` beim Lesen: `cd4d6cf37164260ddc32584a7820df1f1e1c352c`.

**Ergebnis:** Die normalen Bildabläufe bestehen. Vor produktivem Einspielen muss **B01** behoben werden. **B02/B03** sind gezielte offene Abnahmen des Bildpakets. Kein neuer allgemeiner Lernstand-/Community-Audit. Keine Live-, Merge- oder Paketöffnungsfreigabe.

## B01 · Hoch: einzelne Migrationen lassen alte Veröffentlichungen ohne Anhang zurück

Betroffen: `supabase/migrations/20261021100000_anhang_1.sql:30–36,56–62`, `20261021100010_anhang_4.sql:5–58`, Technikplan §6.

Schritt 1 kopiert den vorhandenen Bestand einmalig nach `anhang` und stellt die Speicher-Leseregel sofort auf diese Tabelle um. Der alte, von der aktuellen Live-App verwendete RPC schreibt erst **ab Schritt 4** zusätzlich in `anhang`. Ein alter Client kann zwischen diesen einzelnen Migrationen einen Lernzettel veröffentlichen, dessen Datei nur im Spiegel steht. Schritte 2–4 holen diesen Beitrag nicht nach. Andere Berechtigte sehen seinen Text, bekommen die Datei aber nicht. Die geschlossene Paketsperre verhindert dies für interne Tester nicht.

**Unabhängige SQL-Reproduktion:** echte Projektmigrationen auf lokaler PostgreSQL-WASM-Engine (PGlite 0.5.10 / PostgreSQL 18.6), nachgebildete Supabase-Grundobjekte aus dem Repository; kein Storage-Dienst und keine produktive DB.

1. Alle Migrationen bis einschließlich `anhang_1` ausführen.
2. Zwei freigeschaltete Testprofile anlegen; A legt mit dem alten `beitrag_veroeffentlichen` einen Bild-Lernzettel an.
3. `anhang_2`, `anhang_3`, `anhang_4` einzeln ausführen.
4. Als B Beitrag und Speicherobjekt lesen.

Belegt: nach Schritt 1 **Beitrag=1 / Anhang=0**, nach Schritt 4 weiterhin **1/0**; B sieht **Beitrag=1 / Datei=0**. Gegenprobe: alter RPC erst nach Schritt 4 → **Anhang=1**, B sieht **Datei=1**. Der Invariantentest erkennt die absichtlich erzeugte Zwischenstands-Lücke (`invariante=1`); derselbe Test auf einer zweiten, sauber vollständig migrierten Datenbank endet mit **`invariante=0`**, ohne `FEHLER:`.

**Auftrag an Claude:** Einspielplan und Migrationen so absichern, dass alte Schreiber während der Umstellung keinen Eintrag verlieren. Schreibkompatibilität zuerst sichern, vollständige Zuordnung herstellen, Leseregel erst danach umstellen; eine alternativ gewählte Schreibpause muss auch Tester und laufende alte Schreibvorgänge einschließen. Eine bloße Behauptung „Paket zu“ oder „vier Schritte schnell hintereinander“ reicht nicht. Abnahme mit Veröffentlichung zwischen den Einzelschritten und einem bereits laufenden alten RPC; danach Spiegelinvariante 0 und Lesbarkeit für B. Keine produktive Migration vor dieser Korrektur und Lukes' Freigabe des konkreten Plans.

## B02 · Mittel: fehlgeschlagene Bereinigung verliert ihren Wiederholungsweg

Betroffen: `quellen/community.js:649–664`, `quellen/community-beitraege.js:2180–2193` und Verwerfenpfad.

`vorgangsDateienEntfernen` ignoriert sowohl `remove()`-Fehlerobjekte als auch abgelehnte Promises. Die Oberfläche bekommt trotzdem „verworfen“ zurück, löscht Vorgangskennung/Versandstand oder den ganzen Entwurf und kann die Restdateien anschließend nicht gezielt erneut entfernen. Der Bericht behauptet dagegen, der nächste Klärungsaufruf versuche die Entfernung erneut.

**Browserreproduktion, echte Module / simulierte Schnittstelle:** drei Bilder hochladen → Veröffentlichungsantwort 503 ohne Ausführung → Entfernen aller drei Dateien mit HTTP-500-Fehlerobjekt beantworten → „Eingaben ändern“. Die Oberfläche wird frei; **3 Restdateien / 3 Löschversuche**. Neuer Versand mit neuer Kennung gelingt; die **3 alten Dateien bleiben**, es gibt weiterhin nur **3 Löschversuche**. Die alte Kennung wird von der Oberfläche nicht erneut verwendet.

Dies ist ein aus dem früheren Ein-Datei-Weg übernommenes Verhalten, keine neue Behauptung eines G03/G06-Datenlecks. Es verletzt die ausdrücklich verlangte wiederholbare Bereinigung des neuen Mehrbildpakets. Restdateien bleiben privat; bestätigte Beiträge werden in dieser Probe nicht gelöscht.

**Auftrag:** Server-Endstatus und Dateibereinigung getrennt behandeln. Bei unvollständiger Bereinigung kontogebundene Kennung/Pfade sowie einen tatsächlich erreichbaren Wiederholungsweg behalten und den Zustand verständlich anzeigen. Nicht zurück in „Veröffentlichung unklar“ springen, wenn „verworfen“ bereits feststeht. Abnahme: Fehlerobjekt, Promise-Rejection und still nicht gelöschtes Objekt; anschließend erfolgreicher Wiederholungsversuch entfernt alle unbenutzten Restdateien, referenzierte Dateien bleiben geschützt. Keine unnötige allgemeine Wiederaufnahme der alten G03–G08-Reviews.

## B03 · Mittel: Bilddekodierungsfehler erreichen die Fehleroberfläche nicht

Betroffen: `quellen/community-beitraege.js:446–474` (Feed), `815–830` (Galerie), `867–885` (Großansicht).

Die neue Oberfläche behandelt abgelehnte Downloads, registriert aber keinen Bild-`error` und prüft die Dekodierung nicht. Erfolgreicher Download eines beschädigten oder vom Browser nicht darstellbaren Bildes führt deshalb nur zum defekten Bildsymbol; die vorgesehene Meldung und „Erneut versuchen“ fehlen.

**Unabhängige Browserprobe:** gültige PNG-Bytes bei erfolgreichem Download → `naturalWidth=40`; identischer Weg mit beschädigten Bytes und MIME `image/png` → **`naturalWidth=0`, Fehlermeldung=false, Wiederholen=0**. Die mitgelieferte Bildsuite liefert für Downloads ebenfalls einen nicht dekodierbaren Blob (`new Blob(["x"], {type:"image/png"})`); ihre grünen Fälle belegen daher keine erfolgreiche Bilddekodierung.

**Auftrag:** gültige Bildbytes als Normalfall-Fixture verwenden; Dekodierungsfehler in Feed, Galerie und Großansicht in den vereinbarten lokalen Bildfehlerzustand überführen. Wiederholen darf nicht bloß dieselbe kaputte gespeicherte Objektadresse zurückgeben, sondern muss den angemeldeten Abruf neu ausführen. Optional lokale ungültige Auswahl vorher verständlich ablehnen. Kein neues allgemeines Datei-Inhaltsprüfungsprojekt nötig.

## Eigene Belege und Grenzen

Rohbelege und ausführbare Proben: [2026-10-21-chatgpt-adfe785/](2026-10-21-chatgpt-adfe785/).

| Eigene Prüfung | Ergebnis |
|---|---|
| `community_bilder_test.py` | **58/58**, einschließlich sieben axe-Zuständen (axe-core 4.10.2), echte Clientmodule / nachgebildeter Server |
| `community_korrekturen_test.py` | **97/97**, nachgebildeter Server |
| Zusätzliche Browserproben | B02/B03 wie oben, gültige PNG-Gegenprobe |
| Originales `anhang_test.sql`, saubere isolierte Datenbank | ohne `FEHLER:`, **invariante=0**, PostgreSQL 18.6 / PGlite 0.5.10 |
| Migrationen mit Zwischenveröffentlichung und Vergleich danach | B01 reproduziert, sauberer Nachher-Aufruf funktioniert |

Die Bildsuite lief auf einer lokalen Kopie; 278 relevante Quellen-/SQL-/Dokumentationsdateien wurden per Git-Blob-Hash abgeglichen, die Bildmodule/CSS im Testoutput entsprechend übernommen. Anschließend vollständiger frischer Git-Clone auf `a61469f` für Randproben und Korrekturensuite; dort `quellen/`, `supabase/`, `docs/` unverändert. Die zusätzlichen Proben verändern keinen Anwendungscode. Ein erster Versuch, einen nativen lokalen PostgreSQL-Server bereitzustellen, wurde durch die Umgebung verhindert; die SQL-Belege oben stammen ausdrücklich aus PGlite, **nicht** aus zwei nativen DB-Verbindungen. Claudes 65/65-Konkurrenzfälle und 269/269-Funktionstests wurden hier nicht nochmals ausgeführt. Keine echten Konten, kein echter Storage-Upload, kein Zwei-Geräte-/SMTP-Test, keine Migration live.

Reproduktion: Browserprobe mit Playwright/Chromium als `python bilder-randfaelle.py /absoluter/repopfad` ausführen. SQL: `npm install --prefix /tmp/bildreview @electric-sql/pglite@0.5.10`, `migration-probe.mjs` nach `/tmp/bildreview/` kopieren und `node /tmp/bildreview/migration-probe.mjs /absoluter/repopfad /absoluter/belegordner` ausführen. Die zwei SQL-Dateien müssen im Belegordner liegen. Die `ERGEBNIS:`-Ausnahme im Originaltest ist die vorgesehene Rollback-Ausgabe; ihr Inhalt muss geprüft werden.

## Rückgabe und Entscheidungen

Claude korrigiert B01–B03 gezielt und aktualisiert den veralteten Dateiteil des Livetests vor dessen nächstem Lauf. Danach nur diese Abnahmen gegenprüfen. Für echte Upload-/Altclient-Prüfungen nach dem Einspielen Testkonto, normalen Upload, Mehrbildwiederholung, Paket-/Kontogrenze und Bild/PDF-Altbestand belegen; Paketöffnung bleibt separat.

**Von Lukes noch nicht entschieden:** fünf Bilder, 5 MiB pro Bild / 25 MiB gesamt, optionale Beschreibung bis 200 Codepunkte sowie automatische Verkleinerung. Empfehlung von ChatGPT: diese Grenzen beibehalten; Handyfotos vor dem Upload bei Bedarf mit sichtbarem Hinweis verkleinern und Schriftlesbarkeit prüfen. Das ist eine Empfehlung, keine beauftragte zusätzliche Implementierung und keine Freigabe. Fachliche Entscheidungen bleiben Lukes vorbehalten. Anwendung, Live-Datenbank und `main` durch dieses Review unverändert.
