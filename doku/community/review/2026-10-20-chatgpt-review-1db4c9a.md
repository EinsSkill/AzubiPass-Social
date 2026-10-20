# Gegenprüfung LS03 · ChatGPT · 20.10.2026

**Ergebnis:** LS03 ist behoben. Der ursprüngliche Kapitelablauf und die erweiterte Lernstand-Suite bestehen unabhängig. Die neue Wiederanbindung verursacht jedoch **LS04 (hoch): Ein offenes Kapitel kann nach einem Kontowechsel unangetastete Antworten von Konto A in Konto B übertragen.** Vor Merge diesen belegten Restfehler beheben.

**Vorgänger:** Claude, LS03-Korrektur `1db4c9a`, nach ChatGPT-Review `bbc6a2e`.
**Rolle:** gezielte Gegenprüfung des Kapitel-Speicherwegs, keine Umsetzung.
**Geprüfter Anwendungsstand:** `1db4c9a28528965a997e9e62abf73d21a656a092`, Branch `community-zugang`.
**Grundlagen:** AGENTS.md und README.md aus dem vorherigen Review, aktuelle Übergabe und Claude-Bericht, Diff `bbc6a2e..1db4c9a`, aktuelle Quellen und ausgelieferte JS-Module. Die Aufgabe ist durch Repository und vorherigen Review vollständig bestimmt; kein zusätzlicher persönlicher Kontext nötig.

## Bestätigt

- Unveränderte ursprüngliche `kapitel-probe.py`: neue Antwort bleibt im Arbeitsspeicher, lokalen Speicher und nach Neuladen erhalten.
- `lernstand_sync_test.py` mit axe-core 4.10.2: **78/78** unabhängig bestanden. Enthalten sind Selbsttest-Eingabe und Bewertung, Check, Zuordnung, zweite Übernahme, Kontoabgleich, erneutes Öffnen und Weiterarbeiten nach Zurücksetzen im anderen Tab. Auch die bisherigen LS01-/LS02-Fälle bestehen.
- `quellen/kern.js` und `quellen/azubipass.js` stimmen jeweils bytegenau mit `docs/mittel/` überein. Anwendung und generierter Bestand wurden in dieser Prüfung nicht verändert.

## LS04 · hoch · Alte Kapitelantwort gelangt nach Kontowechsel in fremdes Konto

**Ort:** `quellen/kern.js`, `kapitelfachBinden()` Zeilen 314–336, besonders `stand.fortschritt[s] = f` (331); Aufrufe in `quellen/azubipass.js` vor dem Speichern.

Die Wiederanbindung unterscheidet nicht zwischen Zurücksetzen im selben Konto und Wechsel zu einem anderen Konto. Der offene Lernzettel hält das frühere Kapitelfach `f` mit sämtlichen Antworten weiter fest. Der Kontowechsel entfernt es zunächst korrekt aus dem aktuellen Stand. Beim nächsten Eingabe-Ereignis hängt `kapitelfachBinden()` das ganze alte Fach wieder ein. Damit wird auch eine **nicht bearbeitete** Antwort des vorherigen Kontos übernommen. Der App-Tab synchronisiert diesen vermeintlich aktuellen Stand in Konto B.

### Unabhängige Browserreproduktion

1. Im App-Tab Konto A anmelden und Abgleich abwarten.
2. Im selben Browser `lf1.html#k3` öffnen. Zwei verschiedene Selbsttestfelder mit `A private Antwort` und `A weitere private Antwort` füllen und speichern. A hat seinen Stand erfolgreich erhalten.
3. Im App-Tab zu B wechseln (B hat einen eigenen Serverstand ohne dieses Kapitel). Vollständigen Abgleich abwarten. Im offenen Kapitel ist `AP.stand.fortschritt['lf1-k3']` jetzt tatsächlich nicht vorhanden: Die ursprüngliche Trennung hat stattgefunden.
4. Ohne Neuladen im ersten Textfeld `B neue Antwort` tippen. Das **zweite Feld bleibt unangetastet**.
5. Im lokalen B-Stand steht nun neben der neuen ersten Antwort weiterhin `A weitere private Antwort`. Nach dem nächsten Abgleich enthält auch **Bs Serverstand** diese fremde Antwort.

Es laufen die echten App- und Kapitelmodule, echte Textfelder und input-Ereignisse in zwei Tabs mit gemeinsamem Browser-Speicher. Nur Supabase ist simuliert. Die Probe prüft den unangetasteten zweiten Text; der Befund beruht nicht bloß darauf, dass ein Nutzer sichtbaren alten Text erneut eintippt.

**Gegenprobe:** Identisches Skript auf `bbc6a2e` (Anwendung unverändert `6fb610d`) überträgt keine Antwort von A in Bs Konto. Dort bleibt das alte Fach abgehängt. Das ist keine Bestätigung des alten LS03-Verhaltens; die Gegenprobe grenzt ausschließlich den neuen kontofremden Upload ein. Die alten Antworten bleiben dort ebenfalls im geöffneten Textfeld sichtbar, was nicht als neuer separater Befund ausgegeben wird.

- [Reproduktion](2026-10-20-chatgpt-1db4c9a/kapitel-kontowechsel.py), Aufruf: `python kapitel-kontowechsel.py /pfad/zum/repository`; braucht Playwright/Chromium. Rückgabewert 1 bei erkanntem Upload einer alten Antwort, 0 ohne diesen Upload.
- [Neuer Stand: FEHL](2026-10-20-chatgpt-1db4c9a/kapitel-kontowechsel.log)
- [Vorheriger Stand: kein fremder Upload](2026-10-20-chatgpt-1db4c9a/kapitel-kontowechsel-alt.log)

### Gezielter Korrekturauftrag und Abnahme

Die Wiederanbindung an die Eigentümer-/Kontogeneration der Kapitelansicht binden oder die Ansicht beim Wechsel sicher neu binden. Kein altes Kapitelfach und keine früheren Aufgabenobjekte dürfen durch Eingaben nach einem Kontowechsel in das neue Konto gelangen. Die konkrete Strategie wählt Claude. Das gewollte Weiterarbeiten nach einem Zurücksetzen **im selben Konto** muss weiter funktionieren.

Als Regression mit echter Kapiteloberfläche aufnehmen: zwei unterschiedliche Antworten unter A, Wechsel im App-Tab zu B, anschließend nur eine Antwort ändern; die andere A-Antwort darf weder im lokalen B-Stand noch beim nächsten B-Abgleich auftauchen. B sowohl ohne Kapitelstand als auch mit eigenem Kapitelstand prüfen; Rückkehr zu A darf As ursprünglichen Stand nicht beschädigen. Checks, Zuordnungen und Lernziele verwenden denselben Rückweg und gehören in die gezielte Abnahme. Die bestehenden 78 Fälle und die ursprüngliche LS03-Probe weiter bestehen lassen. Keine neue allgemeine R04–R07-Runde.

## Belege, Umgebung und Grenzen

[Rohprotokolle](2026-10-20-chatgpt-1db4c9a/): Lernstand-Suite 78/78, ursprüngliche Kapitelprobe, neue Kontowechselprobe und Altvergleich. Eigener Browserlauf mit Playwright 1.64.0, Chromium 138 (lokal über executable_path), axe 4.10.2, Service Worker wie in den vorhandenen Tests blockiert. Browsermodule unverändert. Die zunächst fehlende Browser-Laufzeit wurde für diese Gegenprüfung lokal bereitgestellt.

Keine eigene Wiederholung der übrigen breiten Suites und keine SQL-Runde: Der gezielte Ablauf ist bereits ein reproduzierbarer Merge-Blocker; Supabase ist in der Korrektur unverändert. Claudes übrige grüne Testergebnisse werden hier nicht als eigene Läufe ausgegeben. Keine echten Konten, keine produktiven Daten, kein Zwei-Geräte-/SMTP-Test. Keine Änderung an Anwendung, Migrationen, Datenbank oder `main`; nur Dokumentation und Belege.

**Nächster Schritt:** Claude korrigiert gezielt LS04, danach Gegenprüfung der Kapitel-Kontogrenze. LS03 ist bestätigt und muss nicht erneut konzipiert werden. Gesamtstand noch nicht zum Merge empfohlen. Brevo, Datenschutzangaben, Zwei-Geräte-Test und Paketöffnung bleiben die getrennten offenen Betriebs-/Freigabeaufgaben; keine neue Freigabe erteilt.
