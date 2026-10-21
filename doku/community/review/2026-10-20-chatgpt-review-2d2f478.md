# Gegenprüfung F01/F02 und Lernstand am Konto · ChatGPT · 20.10.2026

**Ergebnis:** F01/F02 sind im geprüften Umfang behoben; H01 ist richtiggestellt. Der zusätzliche Lernstand-Abgleich enthält zwei neue, unabhängig reproduzierte Fehler **LS01/LS02 (hoch)**. Vor Merge des Gesamtstands diese beiden Fehler beheben. Keine Wiederaufnahme der allgemeinen R04–R07-Runde.

**Vorgänger:** Claude – Lernstand `a5998c2`, anschließend F01/F02 `2d2f478`.
**Rolle:** gezielte Gegenprüfung und Review der neuen Lernstand-Funktion; keine Umsetzung.
**Geprüfter Stand:** `2d2f478333b69e3920056786db6063f8107b7b9f`, `community-zugang`.
**Vergleich:** `a4642b16055a4a086afe629ce42fa80440844d5a` → `a5998c2` → `2d2f478`.
**Grundlagen:** AGENTS.md, README.md, neueste Übergabe, beide Claude-Berichte, vorheriges Review c9e15a7; geänderte Quellen/Builds, alle drei neuen Migrationen und Tests. Kein zusätzlicher persönlicher Kontext für diese aktuelle Codeprüfung nötig.

## F01 · abgeschlossen im geprüften Umfang

`heuteAufgabe()` prüft Sitzung, Profil und `beitraege_frei()`, verwendet Konto-/Generationsbindung und verwirft alte Antworten. Logout, Kontowechsel und Offline leeren die registrierten Heute-Blöcke; Online und Rückkehr laden neu. Fehler haben einen Wiederholen-Knopf. Die Aufgabenabrufe sind nun über `gebunden()` abgesichert.

**Unabhängig:** `community_gruppen_test.py` **47/47**, darunter die neun neuen F01-Fälle: sichtbare/späte Antwort bei Logout und Offline, Kontowechsel, Profil fehlt, Paket geschlossen, Wiederverbindung, Wiederholen. Quellen und gebaute Module stimmen überein. Die dokumentierte alte Datenschutzlücke ist damit in diesen Fällen geschlossen.

## F02 · abgeschlossen im geprüften Umfang

Die zwei Migrationen ergänzen die vorhandene Paketgrenze an Gruppen, Codes, Mitgliedschaften, Wochenaufgaben, Erledigt-Anlage und den RPCs Gründen/Beitreten. Views bleiben `security_invoker`; dieselbe Testerausnahme gilt. Austritt über `gruppe_verlassen()` bleibt absichtlich möglich.

**Unabhängig:** Alle **53** Migrationen auf lokalem PostgreSQL 16 aufgebaut. `paketsperre_gruppen_test.sql` vollständig einschließlich Öffnen und erneutem Schließen ausgeführt: Nicht-Tester sehen geschlossen null Gruppen/Codes/Mitglieder/Aufgaben/Erledigungen und können nicht gründen/beitreten/abhaken. Nach Öffnen funktionieren die erlaubten Wege, nach Schließen sind sie wieder gesperrt; Tester bleiben zugelassen. Fünf weitere SQL-Suiten liefern ebenfalls die erwarteten Ergebniswerte ohne FEHLER-Marker.

**Live-Grenze:** Keine eigene produktive Datenbankabfrage. Die Einspielung und die ausschließlich geschlossene Live-Probe sind Claudes Betriebsbelege, nicht von ChatGPT erneut ausgeführte Livetests.

## LS01 · hoch · Kontotrennung fehlt vor dem ersten erfolgreichen Abgleich

**Ort:** `quellen/lernstand-sync.js` 48–51 (`merken`), 105–120 und 139–143 (`runde_`), 185–189 (Auth-Ereignisse).

Die Zugehörigkeit des Gerätestands wird ausschließlich aus `azubipass-lernsync.nutzer` abgeleitet. Dieser Eintrag entsteht erst nach einem erfolgreichen Abgleich. Schlägt der erste Abruf/Speicherversuch fehl, gibt es noch keine Eigentümerkennung. Nach einem Kontowechsel wird der lokale Stand deshalb als erstmalig zu übernehmender Gerätestand behandelt und mit dem neuen Konto zusammengeführt oder vollständig dorthin hochgeladen.

**Reproduktion mit echten Browsermodulen, synthetischen Konten und simulierter Schnittstelle** ([Probe](2026-10-20-chatgpt-2d2f478/lernstand-probe.py), [Log](2026-10-20-chatgpt-2d2f478/lernstand-probe.log), Abschnitt S01):

1. Konto A angemeldet, erster Lernstand-Abruf liefert Netzfehler; noch kein erfolgreicher Abgleich/keine Metadaten.
2. Während weiterhin A angemeldet ist, ein Lesezeichen `A-privat` setzen und lokal speichern.
3. Im selben Browser zu Konto B wechseln, dessen eigener Serverstand `B-eigen` enthält.
4. Nach dem Abgleich enthält **B auf dem Server `A-privat` und `B-eigen`**. A hat weiterhin keine gespeicherte Serverzeile.

Das ist eine Übertragung in ein anderes Konto, keine zulässige Konfliktzusammenführung innerhalb eines Kontos. Der Datenbankzugriff arbeitet korrekt für B; die falsche Zuordnung passiert vorher im Client. Die 33 vorhandenen Lernstand-Fälle testen den Kontowechsel erst nach einem erfolgreichen Abgleich und erkennen diesen Fall nicht.

**Gezielt korrigieren:** Eigentümer des lokalen Lernstands unabhängig vom Erfolg eines Serverabgleichs kennen; beim Kontowechsel vor jeder Übernahme/Sendung sicher trennen. Ungesendete Daten eines bekannten Kontos dürfen nicht als anonyme Daten in ein anderes Konto geraten. Ein fehlgeschlagener Erstabgleich darf die Kontogrenze nicht aufheben. Keine neue Produktentscheidung über anonyme Daten durch dieses Review.

**Abnahme:** Fehlgeschlagenen ersten Abruf und verlorene erste Speicherantwort abdecken; A lernt, dann Wechsel B mit und ohne vorhandenen Serverstand. Weder Anzeige noch Upload in B darf Daten von A enthalten. Neustart nach dem Fehler sowie Logout/erneute Anmeldung mit anderem Konto mitprüfen; normale Erstübernahme eines tatsächlich anonymen Gerätestands bleibt nach der vorgesehenen Regel möglich.

## LS02 · hoch · Offener App-Tab überschreibt neuere Änderungen aus anderen Tabs

**Ort:** `quellen/lernstand-sync.js` 43–49, 66–69, 88–93 und 125–143; `quellen/kern.js` 137–153/340–346. Der Abgleich liest `AP.stand` aus dem Tab-Arbeitsspeicher, die Versionsmetadaten aber aus gemeinsamem `localStorage`. Externe Änderungen werden nicht in diesen Arbeitsspeicher übernommen.

### S02 · Lernzettelseite bei weiter geöffnetem App-Tab

1. App-Tab abgleichen, dann im selben Browser eine echte Lernzettelseite `lf1.html` in einem zweiten Tab öffnen.
2. Dort ein neues Lesezeichen `Kapitel-neu` setzen. Es steht nachweislich im gemeinsamen lokalen Speicher.
3. In der weiterhin geöffneten App „Jetzt abgleichen“ auslösen: App und Server erhalten es nicht.
4. In der App eine weitere Änderung speichern: **`Kapitel-neu` verschwindet aus lokalem Speicher und Konto**.

### S03 · Bereits erfolgreich gespeicherter Stand eines zweiten App-Tabs

1. Zwei echte App-Tabs desselben Kontos starten; Stand und Version 1 sind gleich.
2. Tab 2 setzt `Tab2-neu` und speichert erfolgreich Version 2. Gemeinsamer lokaler Stand und Metadaten sind nun Version 2.
3. Tab 1 holt diesen Serverstand. Wegen `m.version === e.version` nimmt er fälschlich an, sein unveränderter Arbeitsspeicher entspreche Version 2. Er zeigt weiterhin nur den alten Stand.
4. Tab 1 setzt `Tab1-neu` und sendet seinen alten Stand mit Basis 2. Die korrekte Serverprüfung akzeptiert diese Basis; **das zuvor erfolgreich gespeicherte `Tab2-neu` geht auf dem Server verloren**.

Beide Abläufe sind in [lernstand-probe.log](2026-10-20-chatgpt-2d2f478/lernstand-probe.log) belegt. S03 spiegelt die simulierte Serverzeile zwischen den beiden Seiten, damit beide Mock-Clients denselben logischen Serverstand sehen; App-Module und gemeinsamer Browser-Speicher laufen unverändert. Kein echtes fremdes Konto wurde verwendet.

Das geht über die bereits dokumentierte Grenze gleichzeitig entfernter Lesezeichen hinaus: Hier verschwindet ein **neu hinzugefügtes und bereits erfolgreich gespeichertes** Lesezeichen bei nacheinander erfolgenden Änderungen. Die Server-Versionsprüfung kann das nicht erkennen, weil der Client die gemeinsam gespeicherte Version nennt, ohne den dazugehörigen Inhalt übernommen zu haben.

**Gezielt korrigieren:** Versionsbasis an den tatsächlich im jeweiligen Tab übernommenen Inhalt binden. Änderungen aus anderem Tab/Lernzettelseite verlustfrei berücksichtigen, bevor der lokale oder entfernte Stand ersetzt wird. Eigenen noch ungesendeten Fortschritt dabei erhalten; ein bloßes Nachladen aus `localStorage` darf ihn ebenfalls nicht überschreiben.

**Abnahme:** Zwei App-Tabs, erst Tab 2 erfolgreich speichern, danach Tab 1 abgleichen und bearbeiten; beide Änderungen bleiben auf Server und nach Neuladen erhalten. Lernzettelseite plus bereits offener App-Tab analog prüfen. Zusätzlich gleichzeitige lokale Änderungen, Hintergrund/Rückkehr und Neustart abdecken. Die reine Zwei-Geräte-Prüfung ersetzt diesen Test mit gemeinsamem Browser-Speicher nicht.

## H02 · bestehende Wartebedingung im Moderationstest

Der unveränderte `community_moderation_test.py` liefert unabhängig zweimal **127/128**: „Hinweis der Meldung sichtbar, ohne Namen“. Der Test wartet auf „1 offene Meldung“; dieser Text steht schon in der Fallliste. Er kann deshalb prüfen, bevor der Hinweis im geladenen Falldetail erscheint.

Eine instrumentierte Ausführung reproduziert die falsche Originalassertion **auch auf `a4642b1`**; nach explizitem Warten auf `Telefonnummer im Text` ist der Hinweis auf beiden Ständen vorhanden. Eine ausschließlich im Arbeitsspeicher um diese eine Wartebedingung ergänzte Testsuite besteht **128/128**. Anwendung und Repository-Tests wurden nicht geändert.

Belege: [Original](2026-10-20-chatgpt-2d2f478/community_moderation_test.log), [Wiederholung](2026-10-20-chatgpt-2d2f478/community_moderation_repeat.log), [Alt-/Neu-Probe](2026-10-20-chatgpt-2d2f478/moderation-assertion-probe.log), [Suite mit Wartebedingung](2026-10-20-chatgpt-2d2f478/moderation-wait-probe.log). Claude kann die Wartebedingung gezielt im Test richtigstellen. Kein neuer Moderationsfehler oder zusätzliche allgemeine Korrekturrunde daraus abgeleitet.

## Prüfbelege und Grenzen

| Unabhängige Prüfung | Ergebnis |
|---|---|
| Gruppen-Mock, einschließlich F01 | **47/47** |
| Lernstand-Mock, bestehende Fälle | **33/33** |
| Korrekturen-Mock | **97/97** |
| Moderations-Mock | Original zweimal **127/128**, mit allein korrigierter Wartebedingung **128/128**, siehe H02 |
| Funktionstest einschließlich Build | **269/269**, Bestand reproduzierbar |
| PostgreSQL 16, Supabase-Grundlage plus 53 Migrationen | aufgebaut; sechs SQL-Suiten mit erwarteten Ergebniswerten, kein FEHLER-Marker |
| Lernstand-CAS, zwei echte Verbindungen | Gleichzeitige erste Anlage und Änderung: erster Vorgang gewinnt, zweiter erhält Konflikt und aktuellen Stand; kein stilles Überschreiben, Rückstände 0 |
| Zusätzliche Browserproben | LS01 und LS02 reproduziert (S01–S03) |

[Rohbelege und Reproduktionen](2026-10-20-chatgpt-2d2f478/). Die SQL-Suiten schließen absichtlich mit ERGEBNIS-Exception und Rollback; die Werte wurden geprüft, nicht nur Exitcodes. Kein weiterer allgemeiner Layout-/Lernkernlauf in dieser gezielten Phase; die bekannten Grenzen des vorherigen Audits bleiben bestehen. Build und Funktionstest liefen erneut; Axe lief an den vorhandenen Prüfstellen der Browser-Suiten.

- Die Server-CAS-Funktion und die RLS-Isolation sind in den ausgeführten Fällen korrekt. Die beiden neuen Fehler liegen im Browser-Abgleich, nicht in einer zu weit offenen Lernstand-Tabelle.
- Keine eigenen Live-Konto-/Storage-/Mail- oder Zwei-Geräte-Tests, kein SMTP eingerichtet. Claudes Live-Migrations-/Sperrbelege nicht als eigene Abfragen ausgegeben.
- Fehlende Datenschutzwerte sowie der von Claude ausdrücklich als veraltet bezeichnete Abschnitt zu Beiträgen/Gruppen bleiben vor Paketöffnung zu erledigen. Hier keine rechtliche Freigabe erteilt.
- Nur Review, Übergabe und Belege geändert; keine Anwendung, Migration, Rolle oder produktive Datenbank. Lokale Build-Zeitstempel werden nicht übernommen.
- **Nächster Schritt:** Claude behebt gezielt LS01/LS02 und kann H02 im Test korrigieren. F01/F02 bleiben abgeschlossen, solange diese Wege nicht erneut verändert werden. Danach gezielte Gegenprüfung des Lernstand-Abgleichs; fachliche Merge-/Deployment-/Paketöffnungsfreigaben bleiben Lukes vorbehalten.
