# Industriekaufleute · Auftrag an Claude

Stand: 20.10.2026. Vorheriger Beitrag: ChatGPT hat gemeinsam mit Lukes den zweiten Ausbildungsgang geplant. Rolle dieses Pakets: Spezifikation und Übergabe. Rolle von Claude: fachliche Ausarbeitung, technische Umsetzung und belegte Prüfung.

## Ziel

Erstelle den vollständigen zweiten Ausbildungsgang **Industriekaufmann und Industriekauffrau, Neuordnung 2024**, innerhalb der bestehenden AzubiPass-App. Er soll den vorhandenen Büromanagement-Aufbau einschließlich Kurz-/Langfassung, Lernhilfen, Üben, Vokabeln, Probeklausuren, Suche und Offline-Nutzung erhalten.

Es wird keine zweite unabhängige App und kein neues Erscheinungsbild entworfen. Die vorhandenen Büromanagement-Inhalte, Links und Lernstände müssen weiter funktionieren. Keine neue Anmeldung für den Lernbereich und keine Änderung der derzeitigen nichtkommerziellen Ausrichtung.

## Von Lukes getroffene Entscheidungen

- Einen zweiten Ausbildungsgang für Industriekaufleute vorbereiten.
- Den aktuellen Lehrplan zugrunde legen und die Planung gemeinsam erarbeiten.
- Den Aufbau wie beim vorhandenen Büromanagement-Bereich übernehmen.
- MAKEL Studio GmbH weiterverwenden und Produktion genauer ausarbeiten; andere Branchen nur sinnvoll ergänzen.
- Am 20.10.2026: die gesamte Planung so fertigstellen, dass Claude die Erstellung übernehmen kann.

Die Aufteilung in 85 Kapitel und die Einzelaufgaben sind die fachliche Konkretisierung durch ChatGPT. Sie sind kein amtlicher Kapitelkatalog. Du darfst sachlich nötige Korrekturen, sinnvolle Abschnittsteilungen und technische Anpassungen eigenständig vornehmen; protokolliere wesentliche Abweichungen samt Begründung. Stelle Lukes keine Routinefragen, die du aus Quellen, Bestand und diesem Paket selbst lösen kannst.

## Zuerst lesen

1. `AGENTS.md`, `README.md` und den neuesten Abschnitt in `doku/community/uebergabe.md`, um laufende fremde Arbeit zu erkennen.
2. [01-gesamtplan.md](01-gesamtplan.md): 85 Kapitel mit 255 Lernzielen, 340 Abschnitten und 170 Aufgabenentwürfen.
3. [02-makel-und-pruefungen.md](02-makel-und-pruefungen.md): Produktionswelt, Datenregeln, Vokabelpakete und Prüfungspfade.
4. [03-umsetzung-und-abnahme.md](03-umsetzung-und-abnahme.md): Berufstrennung, Datenmodell, Arbeitspakete und Abnahmekriterien.
5. Bestehende Kapitel-, Aufgaben- und Fortschrittsdokumentation sowie tatsächlichen aktuellen Code.

Technische Planungsreferenz: `EinsSkill/AzubiPass-Social`, `main` bei `cd4d6cf37164260ddc32584a7820df1f1e1c352c`. Die erste Bestandsaufnahme lag einen Tag zuvor bei `0c472bb`; dieser alte Commit darf nicht als heutiger Integrationsstand verwendet werden. Vor Beginn Branch, Git-Status und neuere Commits prüfen.

## Umfang der Erstellung

1. Alle 13 Lernfelder und 85 geplanten Kapitel vollständig ausformulieren.
2. Vorhandene Erklärungen gezielt verwenden, aber auf Ausbildungsordnung, neue Lernziele und industriellen Fall prüfen. Nicht pauschal alte Lernfelder umbenennen.
3. Pro Kapitel Kurzfassung und abschnittsgebundene Langfassung, Lernziele, geeignete Darstellungen, Definitionen, Merksätze, typische Fehler und begründete Lösungen erstellen.
4. Die 170 Aufgabenentwürfe in das bestehende Aufgabensystem umsetzen oder fachlich gleichwertig verbessern. Zusätzlich bestehende Checks, Selbsttests und Karteikartenmechanik des Kapitelaufbaus bedienen. Ein Aufgabenentwurf ist nicht immer genau ein einzelner Formularschritt.
5. Die Berufsauswahl und die zuverlässige Trennung aller berufsbezogenen Ansichten und Lernstände umsetzen.
6. Einen eigenen berufsbezogenen Englischbestand mit vier 20er-Blöcken erstellen. Gemeinsamer kaufmännischer Grundwortschatz bleibt nutzbar, ohne fremden Lernstand zu duplizieren.
7. AP1-, AP2- und WiSo-Übungspfade sowie einen eigenständigen Vorbereitungsleitfaden für die Fachaufgabe im Einsatzgebiet erstellen.
8. Quellen und Kompetenzabdeckung nachvollziehbar dokumentieren. Besonders Rechts- und Jahreswerte vor Verwendung prüfen; keine offenen Marker als fachlich freigegebenen Inhalt ausliefern.
9. Build, relevante Regressionen, fachliche Rechnungen, Mobil-/Desktopansicht und Offline-Verhalten prüfen.

## Arbeitsweise

- Auf einem eigenen Implementierungsbranch arbeiten. Diesen Dokumentationsbranch nicht mit der laufenden Community-Arbeit vermischen. Basis ist der dann aktuelle geeignete Integrationsstand; Abweichungen begründen.
- Den vollständigen Ausbau in überprüfbaren Etappen umsetzen: Daten und Berufstrennung, Referenzkapitel, LF 1–7, LF 8–13, Prüfungspfade, abschließende Gesamtprüfung. Nach erfolgreicher Etappe weiterarbeiten; nicht nach jedem Lernfeld eine zusätzliche Zustimmung erfragen.
- Vor Änderungen Quelle und Verhalten prüfen. Fremde uncommitted Änderungen nicht aufnehmen oder überschreiben. Den Ein-Schreiber-Ablauf aus `AGENTS.md` beachten.
- Ein begrenztes anfängliches Referenzkapitel dient der Qualitätssicherung, nicht als Ersatz für den Gesamtauftrag.
- Bei zeitlicher Begrenzung den nachweisbaren Zwischenstand committen und einen konkreten Fortsetzungsauftrag hinterlassen. Keine fehlenden Kapitel durch automatisch umformulierte Inhaltsverzeichnisse als fertig ausweisen.

## Grenzen dieses Auftrags

Dieses Paket dokumentiert einen Erstellungsauftrag, sobald Lukes ihn an Claude weitergibt. Es enthält **keine neue Freigabe für Merge, produktives Deployment, Änderung der Community-Sperren, Rollenvergabe oder Datenbankmigrationen**. Diese Schritte sind für die lokale Erstellung des Lernbereichs nicht notwendig. Kommerzielle Tarife, Community-Berufsräume und neue serverseitige Lernstandsspeicherung sind nicht beauftragt.

Für fachlich noch ungeprüfte Details ist die Quellenprüfung Teil deiner Arbeit. Behebe erkennbare Mängel am neuen Inhalt selbstständig. Sachfremde Altbefunde dokumentieren, nicht ungefragt als eigenes Projekt ausweiten.

## Abzugebendes Ergebnis

- Eigener Arbeitsbranch und Commit(s) mit vollständiger Umsetzung.
- Neue Übergabe unter `doku/industriekaufleute/uebergabe.md`, neuesten Abschnitt oben: Umfang, Referenz, tatsächlich fertiggestellte Kapitel, Aufgaben, Quellenprüfung, Tests, Grenzen und nächster Schritt.
- Abnahmebericht mit reproduzierbaren Befehlen und Ergebnissen. Tests des Bestands getrennt von neuen Tests ausweisen; keine früheren Prüfergebnisse als aktuelle eigene Ergebnisse übernehmen.
- Kompetenzmatrix mit Verweisen auf die tatsächlich erstellten Kapitel/Abschnitte und mindestens eine geeignete Nachweisaufgabe pro Kompetenzgruppe.
- Liste verbliebener fachlicher oder technischer Mängel. Kein „vollständig“, wenn Kapitel, Langfassungen, Übungen oder Prüfungspfade fehlen.

Danach an ChatGPT zur gezielten Gegenprüfung zurückgeben. Lukes entscheidet anschließend über den Einsatz der fertigen Version.

## Stand dieser Übergabe

ChatGPT hat in diesem Paket ausschließlich Dokumentation erstellt. Es wurden keine App-Quelldateien, generierten Seiten oder Datenbankdateien geändert. Validiert wurden Struktur, Kapitelzählung und 103 arithmetische Kontrollwerte; siehe [04-planungspruefung.md](04-planungspruefung.md). Die Integrität der Dokumentationsübergabe wird nach dem Commit geprüft. Die spätere App wurde hier nicht gebaut oder funktional getestet.
