# Übergabe an Claude · R04–R07 abschließen und Beta-Abnahme vorbereiten

**Datum:** 19.10.2026. **Repository:** `EinsSkill/AzubiPass-Social`.
**Branch bei Übergabe:** `community-zugang` @ `a936ed2d893b22fc7f05ad16a2a842371da7b711`.
**Geprüfter Anwendungsstand:** `8273f7b09358b91bc6305741f95c178c51d608cf`.
`a936ed2` ergänzt nur Review, Belege und Übergabe. Am 19.10. wurden beide Branches erneut auf GitHub gelesen: Arbeitsbranch weiterhin `a936ed2`, `main` weiterhin `0c472bb20b602e46d154af0828502bed41b636d4`. Heute keine neue Anwendungsprüfung und kein Live-Datenbankabruf.

**Vorheriger Beitrag:** ChatGPT – [Review 8273f7b](2026-10-15-chatgpt-review-8273f7b.md), R04 hoch, R05–R07 mittel.
**Rolle jetzt:** Claude – Umsetzung und Abnahme; danach ChatGPT – gezielte Gegenprüfung.
**Nutzerauftrag:** Lukes am 19.10.2026: „Dann bereite Übergabe vor, wir müssen das ding so langsam fertig bringen“.
Das setzt die Übergabe und den Abschluss des bestehenden Pakets fort; es benennt kein Teamkonto und erteilt keine neue pauschale Livefreigabe.

## Ziel dieser Runde

Die vier belegten Restfehler vollständig bearbeiten und eine konkret prüfbare Abgabe herstellen. Arbeite die unabhängig möglichen Schritte bis zum Ende ab. Fehlende Kontodaten dürfen die lokalen Korrekturen, Tests und Dokumentation nicht aufhalten. Keine neuen Produktfunktionen oder zusätzliche Gestaltungsrunde beginnen; Gruppen und Wochenaufgaben bleiben spätere Pakete.

Lies zuerst `AGENTS.md`, `README.md`, den obersten Abschnitt in [uebergabe.md](../uebergabe.md), den verlinkten Review mit Rohbelegen sowie `entscheidungen.md`. Prüfe Branch/HEAD und `git status --short`, bevor du schreibst. Erhalte Logo, freigegebene Texte und fremde Arbeitsänderungen.

## Stufe 1 · R04 und R05 im Client korrigieren

### R04 · Kontobindung und Dialog-Lebenszyklus

Der an `document.body` angehängte Meldedialog bleibt nach Abmeldung/Kontowechsel offen. Sein alter Hinweis kann mit dem neuen Konto gesendet werden, weil `ctx.gilt()` erst nach dem RPC geprüft wird.

- Dialoge samt Zustand beim Verlust des ursprünglichen Kontos/Ansichtskontexts schließen, entfernen und leeren.
- Bindung vor jedem neuen Schreibschritt und jeder Wiederholung prüfen; spätere alte Ergebnisse dürfen keine neue Ansicht beeinflussen.
- Bestätigungs- und Vorlagen-Rückfragen sowie Offline/Ansichtswechsel im selben Lebenszyklus berücksichtigen.

**Abnahme:** offen/sendend/unklar × Abmelden/direkter Kontowechsel. Kein alter Text oder Dialog, kein alter Entwurf als neues Konto, kein verspäteter Erfolg im neuen Kontext. Tatsächliche Auth-Ereignisse nachbilden; Oberfläche und Datenschicht gemeinsam ausführen.

### R05 · Ein verbindlicher Vorgang pro Moderationsfall

Die oberen Fallaktionen dürfen das Formular eines laufenden oder unklaren Vorgangs nicht durch einen neuen Zustand samt neuer Kennung ersetzen.

- Fallaktionen während Versand/Klärung zuverlässig sperren oder in denselben Klärweg führen.
- Fester Versandstand und Kennung bleiben erhalten, bis der Ausgang bestätigt oder über `vorgang_klaeren` endgültig verworfen ist.
- Ungesendete eigene Eingaben beim Aktionswechsel nicht still verlieren.

**Abnahme:** alle oberen Aktionen während angehaltener Antwort und bei unklarem Ergebnis prüfen. Kein zweites Formular mit neuer Kennung. Nach bestätigtem `verworfen` sind geänderte Eingaben mit neuer Kennung wieder möglich.

**Abschluss Stufe 1:** gezielte Regressionstests und bestehende Korrektur-/Moderations-Mocks ausführen; eigener nachvollziehbarer Commit.

## Stufe 2 · R06 und R07 in neuen Migrationen korrigieren

Bereits eingespielte Migrationsdateien unverändert erhalten. Korrektur und Sperrreihenfolge im Repository konkret dokumentieren; lokal umsetzen und prüfen, ohne dafür eine erneute pauschale Konzeptfreigabe anzufordern.

### R06 · Wiederholung nach Konflikt vollständig abgleichen

In `moderation_entscheiden` muss auch der Zweig nach dem Warten auf `vorgang` Konto, Aktion, Ziel-ID und Zielart abgleichen. Abweichungen ergeben `APV01`, keinen Erfolg für das andere Ziel.

**Abnahme mit zwei echten Verbindungen:**

1. Gleiche Kennung, gleiches Konto, gleiche Aktion und gleiches Ziel → eine Entscheidung, beide Aufrufe liefern dasselbe Ergebnis.
2. Gleiche Kennung, anderes Ziel bzw. andere Zielart → zweiter Aufruf `APV01`, keine Wirkung auf das zweite Ziel.
3. Sequentielle Wiederholung und Kollision mit fremdem Konto/anderer Aktion bleiben korrekt.

### R07 · Meldebremse pro Konto atomar machen

Die Threadsperre allein schützt die kontoweite Grenze nicht. 29 vorhandene Meldungen plus zwei parallele neue Meldungen an unterschiedliche Threads ergaben im Review 31.

- Kontobezogene Serialisierung oder eine atomare Reservierung verwenden.
- Einheitliche Sperrreihenfolge über die betroffenen Schreibwege prüfen; keine neue Verklemmung durch Konto-/Threadsperren einführen.
- Vorhandene eigene Meldungen weiterhin vor der Bremse erkennen, einschließlich erneuter Suche nach dem Warten (R02).

**Abnahme mit zwei echten Verbindungen:**

1. Bei 29 bestehenden Meldungen können parallele neue Ziele zusammen höchstens eine weitere Meldung erzeugen; die übrigen erhalten `APB01`.
2. Wiederholungen vorhandener Meldungen funktionieren an der Grenze weiterhin.
3. Gleichzeitige dritte Meldung und automatische Ausblendung funktionieren weiter; G06/R03 und die Versionsprüfung bleiben erhalten.
4. Betroffene Konkurrenzwege mit Sperrbeobachtung und begrenzter Wartezeit prüfen; Gegenprobe am alten Stand für die beiden neuen Befunde sichern.

**Abschluss Stufe 2:** neue Migrationen lokal auf Basis aller echten Migrationen prüfen; SQL-Regeltests und gezielte Konkurrenztests ausführen; eigener nachvollziehbarer Commit. Keine produktive Einspielung der neuen R06-/R07-Korrekturmigrationen allein aus dieser Dokumentationsübergabe ableiten. Bereite dafür ein vollständig geprüftes Paket mit Dateinamen, Auswirkungen und Belegen vor. Vorhandene Freigaben für G06/R03/Spec 06 bleiben im dokumentierten Umfang bestehen.

## Stufe 3 · Gebauten Stand prüfen und Abschlussunterlagen liefern

1. `docs/` regulär aus `quellen/` bauen. Das verbindliche Logo erhalten.
2. Gezielte neue Tests plus die betroffenen vorhandenen Tests gemäß `README.md` ausführen. Funktionsprüfung, Lernkernprüfung und relevante Sicht-/Barrierefreiheitsprüfung mit tatsächlichem Ergebnis nennen. Unveränderte Altbefunde mit Beleg abgrenzen, nicht verschweigen.
3. Den bekannten Timingfehler im Vorlagen-Abbrechen-Test durch Warten auf den abgeschlossenen Zustandswechsel korrigieren; keine bloße Wartezeit und keine abgeschwächte Erwartung. Im letzten Review bestanden so 50/50; der unveränderte Test hatte 49/50.
4. Browser und Build-Unterprozesse vor dem Lauf funktionsfähig konfigurieren. Der frühere 268/269-Lauf hatte ausschließlich ein fehlendes Standard-Browserprogramm im Unterprozess; die gezielte Build-Nachprüfung bestand 6/6. Neue Ergebnisse nicht mit alten Summen vermischen.
5. Vorhandene echte Kontotests und den G06-Storage-API-Weg ausführen, **wenn die benötigten Zugangsdaten tatsächlich verfügbar sind**. Passwörter, Schlüssel und Codes weder ins Repository noch in Logs schreiben. Fehlen sie, die übrigen Stufen abschließen und exakt Testname, fehlenden Zugang und noch unbelegte Aussage nennen.
6. Nur als bestanden ausweisen, was tatsächlich ausgeführt wurde. Lokale Datenbank-, Live-Datenbank-, Storage-API- und Browser-Mock-Tests getrennt halten.

### Gebündelte Restliste für Lukes

Lege im abschließenden Abnahmebericht eine einzige kompakte Tabelle an: Punkt, aktueller Beleg/Status, nächste konkrete Aktion, wer sie ausführt, zwingend vor Klassenöffnung oder spätere Bereinigung. Bereits erledigte Punkte nicht erneut abfragen.

Mindestens diese bekannten Punkte frisch abgleichen:

| Punkt | Bekannte Ausgangslage; keine Entscheidung erfinden |
|---|---|
| E13 | Konkrete Konto-ID oder Mailadresse des Teamkontos fehlt. Kein Konto aus Memory, GitHub oder `test-neu1` ableiten. |
| Kontotests / Storage | Im letzten Bericht fehlte das Testpasswort; echter Storage-API-Durchlauf G06 war offen. |
| Mailversand | SMTP und echter Anmeldeweg für die Klasse müssen belegt sein. Konfiguration und benötigte Nutzeraktion konkret benennen; keinen erfolgreichen Versand annehmen. |
| Datenschutzangaben | `quellen/rechtliches.json` enthält am 19.10. weiterhin Platzhalter für Anbieteranschrift/-kontakt sowie Community-Anbieter, Garantien, Maildienst und Fristen. Technisch belegbare Werte vorbereiten, persönliche Angaben und nicht entschiedene Fristen nicht erraten. Keine neue Rechtsfreigabe behaupten. |
| Ergänzte Texte | Exakte noch unbestätigte Wortlaute einmal zusammenstellen. Die vier bereits bestätigten Texte gelten weiter. Zwei präzisierte Klärleisten sind Empfehlungen im Review, keine neue Nutzerfreigabe. |
| Alte abgeschaltete Funktion | `moderieren_entfernen.sql` bleibt ohne Bestätigung unausgeführt. Prüfen und erklären, ob entzogene Rechte die Beta bereits absichern; reine Bereinigung nicht pauschal zum neuen Produktblocker erklären. |
| Veröffentlichung | Geprüften Zielcommit und erforderliche Schritte für Merge/Deployment/Paketöffnung konkret vorbereiten; Ausführung bleibt Lukes' gesonderter Freigabe vorbehalten. |

Wenn alle verfügbaren Arbeiten fertig sind, fehlende Angaben/Freigaben **einmal gesammelt und konkret** vorlegen. Keine pauschale neue Freigabe für bereits freigegebene Arbeiten verlangen. Zugangsdatenmangel nicht als Grund nehmen, die Korrekturen halb fertig abzugeben.

## Fertig bedeutet für diese Rückgabe

- R04–R07 jeweils mit betroffener Datei, Korrekturcommit, neuem Regressionsnachweis und tatsächlichem Ergebnis dokumentiert; ein nicht bestätigter Befund ist technisch begründet.
- Client, Migrationen und gebauter Stand sind vollständig reviewbar und auf `community-zugang` gepusht; keine fremden Änderungen übernommen.
- Offene Einspielungen, fehlende Kontotests und tatsächliche Beta-Voraussetzungen sind klar benannt; keine Lücke als bestanden ausgegeben.
- Ein Abschlussbericht unter `doku/community/review/` und ein neuer oberster Abschnitt in `uebergabe.md` nennen geprüften Anwendungscommit, Testbefehle, Belege, Grenzen und genau den nächsten Schritt.
- Rückgabe an ChatGPT für **gezielte Gegenprüfung der Korrekturen und betroffenen Regressionen**. Neue erhebliche Fehler müssen weiterhin benannt werden; aus bloßen Komfortideen entsteht keine neue Erweiterungsrunde.

Dieser Auftrag bereitet die bestehende Klassen-Beta zur Abnahme vor. Er umfasst kein Deployment, keinen Merge nach `main`, keine Paketöffnung, keine geratene Rollenvergabe und keine zurückgestellten Löschaktionen.
