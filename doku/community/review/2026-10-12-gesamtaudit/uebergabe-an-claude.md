# AzubiPass · Technische Übergabe an Claude

Rolle: Du bist Implementierer. Dieser Audit ist eine Gegenprüfung, keine Umsetzung.
Repository: EinsSkill/AzubiPass-Social.
Geprüft: community-zugang a4436079ff6e22ba77a9ccd93208391d4a3ba957.
main bei Prüfung: 0c472bb20b602e46d154af0828502bed41b636d4.
Vor Beginn AGENTS.md, Community-Übergabe, aktuellen Git-Stand und eigene
laufende Änderungen abgleichen. Auditbefunde nicht ungeprüft auf neuere
Commits übertragen. Nur quellen/ bearbeiten; docs/ durch Build erzeugen.

Zuerst A01: Import vollständig validieren/migrieren, anschließend atomar
mergen. Repro: {"fortschritt":{},"lesezeichen":[null]}, aktivitaet:42 und
karten:{"x":null}. Abnahme: keine Exception, verständliche Ablehnung,
Speicher unverändert, Ich/Import weiterhin erreichbar; gültige/v1-Dateien
behalten Fortschritt, Karten, Vokabeln und Lesezeichen.

A02/A03: Profilcache + alle asynchronen Kontoaktionen an Benutzer-ID und
Sitzungsgeneration binden. A pending -> B anmelden/B laden -> A resolves:
profil() muss B liefern. Alter Logout-Erfolg nach B darf weder Ansicht noch
Sitzungsschlüssel von B zurücksetzen. Auch profilAnlegen/profilAendern und
aufraeumenSpeicher berücksichtigen. Keine fremden realen Konten testen.

A05: Speichern besitzt 400-ms-Verlustfenster. Repro Lesezeichen + Reload
nach 0/100 ms; 500 ms besteht. Verlässlichen Flush/Persistenz entwerfen.

A04: build_app.py-SW-Generator akzeptiert fehlende Precache-Dateien und
füllt später aus dem aktuellen Netz auf. Repro lf13.html initial503,
dann V2-Datei: identischer Cache enthält alte App + neues Kapitel.
Atomare Releaseaktivierung/versionsgebundene Ressourcen; alte intakte
Fassung bei Fehler erhalten. Update mit zwei Tabs und offline prüfen.

A06: .kglied/.vgl-punkt in azubipass.js sind nur klickbare DIVs.
Native fokussierbare Bedienung, Enter/Space, aria-expanded, Fokus sichtbar.
A07: Skiplink #inhalt kollidiert mit Hashrouter; aktiven Inhalt fokussieren,
ohne die Route zu wechseln.
A11: CSS-Regel .seite > .dreher überschreibt dunkle Kartenrückseite;
Umdrehen #6C5208 auf #12301F hat ca. 1,94:1. Zustände getrennt korrigieren.
A09: 320-px-Überlauf Datenschutz, LF5K6, LF10K3, BuchführungK9.
Ursache reparieren, kein globales overflow-x:hidden als Verdeckung.
A10: Alle Kapitel fertig + zuletzt=null soll Prüfungstraining anbieten.

Produktentscheidung A08 erst mit Lukes abstimmen: Preisaussagen passen
nicht zu kein Verkauf. Keine Zahlungs-/Beitrags-/Gruppenfunktion ergänzen.
R01: dateiAdresse verlangt 3600s, Upload cacheControl60 ist kein Widerruf.
Echte Link-/Storageprüfung erst mit vorgesehenen Testkonten und Testdateien.

Belege: ZIP evidence/ und audit-tools/. Originalfunktionstest:188 OK,
2 FEHL (Heute), danach veraltete Navigation an Zeile913. Fortsetzung67/67.
Layouttest4 Meldungen desselben Kartenkontrasts,6 Inhalts-Hinweiszeilen.
Community-UI-Stubs18/18; separate Races reproduzieren A02/A03.
354 Chromium-Layoutzustände;17 Firefox-Ansichten;96 Grafiken/16Typen.
Kein echter Server-/Mail-/PWA-/Screenreader-Freigabenachweis.

Lieferumfang je Korrektur: Problem, Änderung, gezielter Regressionstest,
Build, verbleibende Grenzen. Erst danach gemeinsame Gegenprüfung.
Merge/Deployment sind durch diesen Auditauftrag nicht autorisiert.
