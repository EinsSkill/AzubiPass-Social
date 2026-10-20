**AzubiPass Social – Rückgabe an Claude nach ChatGPT-Review**

Repository: `EinsSkill/AzubiPass-Social`  
Geprüfter Stand: `community-zugang` @ `3bed8d13605aa5a1b892c23170e26185813aa3b3`

Vorheriger Beitrag: ChatGPT – Gegenprüfung der Client-Korrekturen G07/G08/C01 sowie der Technikpläne G06 und Spec 06 v2.

**Dein Auftrag:** Befunde gegenprüfen, G07 gezielt nachbessern und den Spec-06-Technikplan überarbeiten. Keine Migration einspielen, kein Merge, Deployment oder Öffnen der Paketsperre. Diese Übergabe ist keine G06-/E14-Freigabe. `entscheidungen.md` bleibt Lukes vorbehalten.

**1. G07 bleibt teilweise offen**

Die ursprünglichen einseitigen Nachladefehler sind adressiert. Es gibt jedoch einen Umweg:

- Lösungsänderung ausführen.
- Beim gemeinsamen Nachladen scheitert der Beitragskopf.
- Danach eine neue Antwort absenden.
- `gesendet()` ruft `laden({ neu: id })` auf.
- Dieser Weg lädt nur Antworten und ruft `zeichnen(alle, nach, true)` auf: Lösungsaktionen sind wieder aktiv, obwohl der Beitragskopf weiterhin ungeklärt ist. Die Antwort-Erfolgsmeldung kann den Nachladefehler ersetzen.

Beleg: `quellen/community-beitraege.js`, insbesondere `laden()` um Zeilen 581–591 und `gesendet()` um 775–781.

Bitte den ungeklärten Lösungsstand dauerhaft bis zum erfolgreichen gemeinsamen Nachladen berücksichtigen. Ein Antwortversand darf diese Sperre nicht aufheben. Ergänze einen Regressionstest.

Zusätzlich übernimmt `loesungNeuLaden()` vom neu geladenen Kopf nur `geloest`. `b.versteckt` bleibt veraltet. Prüfe den Fall „Beitrag währenddessen ausgeblendet“ und verhindere weiterhin angebotene Schreib-/Lösungsaktionen anhand des alten Zustands.

**2. G08 und C01**

G08 ist nach Codeprüfung passend korrigiert: erst Vorgang klären, bei `angelegt` Beitrag öffnen, bei unklarer Klärung Entwurf behalten. Fehlgeschlagene Dateibereinigung bleibt als bekannte Grenze bestehen.

C01 ist im geprüften Umfang akzeptabel. ChatGPT hat 13 Fehlercode-/Statuskombinationen direkt mit der vorhandenen Funktion ausgeführt. Bekannte geprüfte Ablehnungen und unklare PostgREST-Fehler werden korrekt getrennt. Keine erneute pauschale Gruppenfreigabe einführen.

**3. G06 – Plan grundsätzlich tragfähig, Freigabe noch offen**

ChatGPT empfiehlt die separate Freigabe des Plans durch Lukes:

- Speicherzeile zuerst sperren, danach Verwendung prüfen.
- Direkten Beitrags-Insert auf Gruppenbeiträge ohne Datei begrenzen.
- Beide Konkurrenzreihenfolgen und die geschlossene Paketsperre echt testen.
- Zusätzlich den tatsächlichen Storage-API-Weg prüfen; lokale SQL-Tests nicht als Storage-Ende-zu-Ende-Beleg darstellen.

Das ist eine Review-Empfehlung, keine bereits erteilte Erlaubnis zum Einspielen.

**4. Spec 06 – Technikplan vor Freigabe ergänzen**

Bitte diese sechs Punkte konkret lösen:

1. **Meldungswiederholung nach automatischer Ausblendung:** Aktuell sieht der geplante Ablauf die Sichtbarkeitsprüfung vor dem Wiedererkennen der eigenen Meldung vor. Nach der dritten Meldung und verlorener Bestätigung kann das scheitern. Nach aktueller Konto-/Paketprüfung vorhandene eigene Meldungen zuverlässig wiedererkennen, ohne verborgenen Inhalt preiszugeben.

2. **Prüfanfrage-Wiederholung nach Aufhebung:** Dieselbe Vorgangskennung muss ihr gespeichertes Ergebnis auch liefern können, wenn die Anfrage inzwischen abgeschlossen und die Ausblendung aufgehoben wurde. Wiederholungserkennung vor den Bedingungen für eine neue Anfrage.

3. **Konkurrierende Erklärungskorrekturen:** Ausblendungs-ID, Meldungsmenge und Inhaltszeitstempel erkennen zwei Änderungen derselben Erklärung nicht zuverlässig. Eine Version des Moderationsstands ergänzen und vor Änderungen vergleichen.

4. **Neue SQLSTATE-Codes im Client:** `APF01`, `APE01` usw. werden derzeit von `sicherAbgelehnt` nicht erkannt. Explizite sichere Einstufung der vorgesehenen Rollback-Fehler und passende deutsche Meldungen in den Umsetzungsplan aufnehmen.

5. **Prüfanfrage aufheben plus Teamkorrektur:** Auch bei `anfrage_aufheben` eine atomare Kombination aus Wiedereinblenden, Korrektur, Anfrageabschluss, Meldungsabschluss und Protokollierung vorsehen.

6. **Alle Schreibwege in die Sperrstrategie aufnehmen:** Für direktes Bearbeiten/Löschen von Antworten konkret beschreiben, wann Beitrag und Antwort gesperrt werden und wann der gelesene Inhaltsstand erneut geprüft wird. Die vier aufgeführten RPCs allein belegen noch nicht alle erlaubten Schreibwege.

Für jeden Punkt passende Abnahmefälle ergänzen. Das sind Planbefunde; noch keine Fehlernachweise an implementierten Moderations-RPCs.

**5. Empfehlungen E1–E14 – noch keine Entscheidungen von Lukes**

- E1: Ja, Prüfanfrage erst nach erster Teamentscheidung.
- E2: Ja, Wiedereinblenden und Korrektur gemeinsam; ebenso beim Aufheben einer Prüfanfrage.
- E3: Neutrale Vorlage ja; konkrete Begründung verlangen.
- E4: Ja, Autortext bei leerem internem Feld serverseitig übernehmen.
- E5: Ja, Vorlagenverwaltung später.
- E6: Ja, eigene Antwort ohne fremde Elterninhalte zugänglich halten.
- E7: Ja, Antwortbezug mit aktueller Sichtbarkeitsprüfung.
- E8: Öffentlich „Team · Fachliche Korrektur“, intern handelndes Konto. Keine Anonymität gegenüber direkten Datenabfragen versprechen.
- E9: Noch konkretisieren: fester Prüftermin und anschließende Aufbewahrungs-/Löschentscheidung.
- E10: Ja, direkte Teamlöschung fremder Inhalte entfernen.
- E11: Ja, `geloest` nur über kontrollierte Abläufe.
- E12: Ja, eigene ausgeblendete Inhalte bearbeitbar lassen; aktuellen Stand vor Entscheidung prüfen.
- E13: Lukes muss das gewünschte Teamkonto nennen. Keine Mailadresse erraten und `test-neu1` nicht automatisch übernehmen.
- E14: Noch keine Einspielfreigabe; zuerst überarbeiteten Plan zurückgeben.

**6. Drei Texte – Vorschläge zur Bestätigung durch Lukes**

1. „Mit ‚Eingaben ändern‘ prüfen wir den offenen Versuch. Wurde noch nichts veröffentlicht, wird er endgültig verworfen. Wurde dein Beitrag bereits veröffentlicht, öffnen wir ihn.“

   Antwortvariante: „Mit ‚Eingaben ändern‘ prüfen wir den offenen Versuch. Wurde noch nichts gesendet, wird er endgültig verworfen. Wurde deine Antwort bereits gesendet, zeigen wir sie.“

2. „Solange der Versand läuft oder sein Ergebnis unklar ist, kannst du deine Eingaben nicht ändern.“

3. „Deine Eingaben konnten noch nicht verworfen werden. Versuch es erneut.“

Nicht als bereits bestätigte Texte in `entscheidungen.md` eintragen.

**Prüfbelege und Grenzen**

ChatGPT hat Quellen, Diff, vorherigen Reviewbericht, beide Pläne und Spec 06 v2 geprüft sowie 13 Fehlerklassifizierungen ausgeführt. Deine 74/74 Browser-Mocktests wurden nicht unabhängig wiederholt: Chromium-Download fehlgeschlagen. Keine Live-Datenbank-/Storage-Prüfung, keine Repository-Änderungen.

**Rückgabe:** Gezielte G07-Korrektur mit Tests und überarbeiteter Spec-06-Technikplan; Befunde einzeln bestätigt oder mit Belegen widerlegt. Echte und simulierte Tests klar trennen. Danach erneut an ChatGPT zur Gegenprüfung und an Lukes für die offenen Freigaben.