# AzubiPass Social · Review Spec 05

Stand: 14.10.2026 · ChatGPT → Lukes → Claude  
Repository: EinsSkill/AzubiPass-Social  
Geprüft: `community-zugang` @ `237a62a6b508d69d4bab6c2c1c5341274fd2ff2f`  
`main` bei Abfrage: `0c472bb20b602e46d154af0828502bed41b636d4`.

## Ergebnis

**Gezielte Nachbesserung nötig. Keine Freigabe zum Öffnen der Beitragssperre.**

Die Umsetzung deckt den größten Teil der Spec ab. Drei reproduzierte Fehler betreffen jedoch verlässliches Senden, den Schutz neuer Eingaben und die Lösungsmarkierung. Die dokumentierte Grenze beim Wechsel der Vorgangskennung ist eine Einschränkung des freigegebenen Ziels, keine durch Dokumentation erledigte Abnahme.

Vorheriger Beitrag: Claude, Umsetzung nach Lukes' Entscheidungen und freigegebenem Technik-Plan vom 13.10. Meine Rolle: Review sowie nächste Spec. Grundlage: oberste Übergabe, Specs 04/05, Technik-Plan, Entscheidungen, tatsächliche JS-Quellen, SQL-Migrationen und Prüfungen. Rückgabe: Lukes zur Entscheidung, anschließend Claude. Die Anwendungsquellen, Datenbank, Branch und Freigabeschalter wurden nicht verändert. Der Funktionstest baut die Ausgabe mit aktuellen Datumswerten neu; diese ausschließlich lokal erzeugten Ausgabedifferenzen wurden nach der Prüfung zurückgenommen. Die eigenen Prüfscripte liegen außerhalb des Arbeitsbaums.

Quellbelege: [Übergabe](https://github.com/EinsSkill/AzubiPass-Social/blob/237a62a/doku/community/uebergabe.md), [Beitragsoberfläche](https://github.com/EinsSkill/AzubiPass-Social/blob/237a62a/quellen/community-beitraege.js), [Datenschicht](https://github.com/EinsSkill/AzubiPass-Social/blob/237a62a/quellen/community.js), [Technik-Plan](https://github.com/EinsSkill/AzubiPass-Social/blob/237a62a/doku/community/05-technik-plan.md), [Grenzen](https://github.com/EinsSkill/AzubiPass-Social/blob/237a62a/supabase/README.md).

## G03 · Ein leerer Statusabruf beweist keinen Fehlschlag — hoch

**Belege:** `quellen/community-beitraege.js`, beide `statusPruefen()`-Funktionen und beide Submit-Handler; `quellen/community.js`, `veroeffentlichen()` und `antwortSchreiben()`; README „Verlässliches Senden“.

Nach einem unklaren Ausgang liefert ein aktueller SELECT keinen Treffer. Die App meldet daraufhin wörtlich „Dein Beitrag wurde nicht veröffentlicht. Deine Eingaben sind noch da.“ beziehungsweise den entsprechenden Antworttext. Sie entsperrt den Versand. Eine Eingabeänderung setzt `veraendert`; der nächste Versuch erhält eine neue UUID.

**Nachgestellt im tatsächlichen Formular, Transport simuliert:** erster Versuch → unklar → Status ohne Treffer → Text ändern → nochmals senden. Beide Versuche haben unterschiedliche UUIDs. Die RPC-Idempotenz schützt nur dieselbe UUID. Wird die erste Anfrage sehr spät abgeschlossen, können deshalb zwei Inhalte entstehen. Der Test in `community_schreiben_test.py` nennt einen leeren Status bereits „sicher nicht veröffentlicht“ und prüft nur die unveränderte Wiederholung. Er bildet den verzögerten ersten Abschluss nicht ab.

**Zusätzlicher Dateifall, echte Datenschicht mit simulierten Antworten:** Die RPC liefert HTTP 503 / „Service Unavailable“, der Statusabruf keinen Treffer. `veroeffentlichen()` klassifiziert dies als `server` und ruft `storage.remove()` auf. Ein Gatewayfehler ist keine gesicherte Transaktionsablehnung; eine bereits laufende Veröffentlichung könnte die Datei noch benötigen. Auch hier darf ein leerer Abruf nicht die endgültige Nichtexistenz des Vorgangs behaupten.

**Empfehlung:** gestarteten Versuch mit Konto, UUID und unveränderlichem Inhalt festhalten. Bei leerem Status „Der Vorgang wurde noch nicht gefunden. Der Ausgang ist weiterhin unklar.“ anzeigen. Kein neuer Versuch mit neuer UUID und keine Dateibereinigung, solange der ursprüngliche Ausgang offen ist. Eine erlaubte Wiederholung nutzt denselben ursprünglichen Inhalt und dieselbe UUID; geänderte Eingaben dürfen nicht heimlich denselben Vorgang ersetzen. Falls Änderungen und verlässliche endgültige Ablehnung benötigt werden, soll Claude dafür einen gesonderten technischen Plan mit serverseitigem Endstatus/Abbruchsemantik vorlegen. Nur belegte Transaktionsablehnungen erlauben „nicht veröffentlicht“; Netzwerkfehler und ungesicherte 5xx bleiben unklar.

**Abnahme:** Originalanfrage läuft noch, Status zunächst leer, Original kommt anschließend an; geänderte Eingaben; Beiträge und Antworten; 502/503/504 nach möglichem Commit; keine Doppelanlage, keine vorzeitige Löschung, kein falscher Fehlschlagtext. Keine Aussage über die Häufigkeit in der echten Datenbank: Verzögerung und 503 wurden simuliert.

## G04 · Neue Eingaben während des Sendens werden gelöscht — mittel

**Belege:** `community-beitraege.js`, C06 `darstellen()`/`merke()`/`erfolg()` und Antwortformular `darstellen()`/`gesendet()`.

Die Aktionen sind gesperrt, die Eingabefelder bleiben während des Sendens editierbar. Nach der Übergabe des Inhalts an die Datenschicht kann weitergeschrieben werden. Sobald der ursprüngliche Versand bestätigt ist, wird der gesamte Entwurf gelöscht.

**Nachgestellt:** Beitragstext „Ursprünglicher Text“ senden, vor Bestätigung auf „Nach dem Absenden ergänzt“ ändern, Erfolg freigeben. Gesendet wurde der ursprüngliche Text; C06 ist danach leer. Derselbe Ablauf bei Antworten: „Antwort A“ gesendet, „Antwort B nach Versand“ eingetippt, nach Erfolg leeres Feld.

Während der vorgeschalteten Freigabeprüfung liest C06 die veränderlichen Entwurfswerte sogar erst nach dem asynchronen Abruf erneut aus. Die zuvor validierte Eingabe ist damit nicht zwingend die gesendete Eingabe.

**Empfehlung:** nach erfolgreicher lokaler Validierung einen unveränderlichen Versandstand erzeugen. Art, Text, Datei, Zuordnung und Mentor:innen-Option während Freigabeprüfung, Upload und Versand gegen Bearbeitung sperren; nur die Bearbeitung, nicht den Lernrückweg blockieren. Falls später paralleles Weiterschreiben gewünscht wird, braucht es einen getrennten Folgeentwurf, den ein alter Erfolg nicht löscht.

**Abnahme:** angehaltene Freigabeprüfung, Upload und RPC; Änderungsversuche bei Beitrag und Antwort; keine ungeprüften Werte senden, keine ungesendeten Änderungen löschen; nach sicherem Fehler Bearbeitung wieder möglich.

## G05 · Verlorene Bestätigung der besten Antwort macht Wiederholen gegenteilig — mittel

**Belege:** `community-beitraege.js`, `loesenKnopf()`; `community.js`, `besteAntwort()`; Migration `20261013151520_beste_antwort_streng.sql`.

Die RPC schaltet um: dieselbe Antwort ein zweites Mal aufzurufen entfernt die Markierung. Bei einer verlorenen Antwort zeigt die Oberfläche dagegen den bisherigen Zustand und „Versuch es erneut.“ Der erste Aufruf kann serverseitig bereits erfolgreich gewesen sein.

**Nachgestellt im echten Detailformular mit simuliertem Serverzustand:** erster Aufruf markiert, Bestätigung geht verloren; Knopf bleibt „Als beste Antwort markieren“. Erneuter Klick entfernt die vorhandene Markierung. Dasselbe Problem besteht in umgekehrter Richtung beim Entfernen. Der bestehende Fehlerfall im Test verwirft die Anfrage vor der Ausführung; er prüft nicht den verlorenen Rückweg nach Erfolg.

**Empfehlung:** gewünschten Zustand explizit setzen (`markiert = true/false`) statt umschalten; nach Transportfehler erst Zustand erneut lesen. Bis zur Klärung keine gegenteilige Wiederholung ermöglichen. Claude konkretisiert die sichere RPC-Änderung vor dem Einspielen. Einen Fehler beim Nachladen des bestätigten Lösungsstatus sichtbar melden; der aktuelle leere Fehlerhandler verschweigt ihn.

**Abnahme:** Markieren und Entfernen jeweils serverseitig erfolgreich, Bestätigung verloren; sichere Wiederholung erreicht den gewünschten Zustand, kein unbeabsichtigtes Umschalten; Nachladefehler und gleichzeitige Änderungen.

## Von Claude ergänzte Texte und Verhaltensentscheidungen

| Stelle | Empfehlung |
|---|---|
| „Zugang wird geprüft …“ und fehlgeschlagene Freigabeprüfung | Übernehmen. Klarer Vorgang, sinnvoller Wiederholungsweg, Paket bleibt geschlossen. |
| Uploadhinweis aus Regel 4, Dateizeile, „Keine Datei ausgewählt.“, „Kein Lernfeld“/„Kein Kapitel“, Kapitel-Rücksetzung | Übernehmen. Kein neuer Regelinhalt und keine neue Bestätigungspflicht. |
| „Status wird geprüft …“ | Übernehmen; Ergebnis ohne Treffer nach G03 korrigieren. |
| Datei bei Artwechsel bleibt lokal; sichtbarer und angesagter Hinweis; keine Übertragung an Frage/Tipp | Übernehmen. Rückwechsel bewahrt die Auswahl; der Upload erfolgt erst beim Absenden. |
| Senden bei unklarem Ausgang gesperrt, Abbrechen/Zurück bewahren den offenen Vorgang | Übernehmen, mit G03. Ein bloßer Nulltreffer darf die Sperre nicht endgültig aufheben. |
| C05 ersetzt C06 im Verlauf | Übernehmen. Rückweg führt nicht ins leere Formular. |
| Beste Antwort ohne separate Erfolgsmeldung, Fokus am Knopf | Grundsätzlich passend, nach G05 zuverlässig an bestätigten Zustand binden. |
| `beforeunload`-Rückfrage | Passend innerhalb der dokumentierten Browsergrenzen. Keine Wiederherstellung des Entwurfs nach Neuladen zugesagt. |
| Antworten prüfen die Sperre in der RPC | Passend. Eine zusätzliche UI-Abfrage ist für die Servergrenze nicht erforderlich. |
| Verwaiste Datei nach Kontowechsel | Als bekannte interne Grenze vertretbar: kein Versand unter anderem Konto; gezielte Bereinigung später. Nicht behaupten, die Datei sei gelöscht. |

Diese Empfehlungen sind noch kein Eintrag von Lukes in `entscheidungen.md`.

## Positiv geprüft und Grenzen

Die serverseitige Paketfreigabe verwendet eine administrativ gepflegte Liste benannter Testkonten statt frei editierbarer Nutzer-Metadaten. Die Migrationen hängen Lesen/Anlegen und Dateizugriff an die Freigabe; die neuen Schreib-RPCs prüfen sie ebenfalls. Die Oberfläche prüft sie vor C04/C05/C06 und fragt bei gesperrtem Ergebnis keine Beitragsdaten ab. Das ist im Code nachvollziehbar; das eingespielte Datenbankschema wurde in diesem Review nicht live ausgelesen.

Codepunktzählung, feste allgemeine Zielgruppe, spätes Hochladen, keine Anhänge an Fragen/Tipps, Klartextdarstellung, Kontobindung zwischen Upload und RPC sowie bestätigte ID als normaler Erfolgsweg passen weitgehend zur Spec. Beste Antwort prüft Art und sichtbaren Inhalt beim Setzen.

Second Brain: die über Google Drive verfügbare Datei `Second Brain/Second Brain/Business/AzubiPass.md` wurde gelesen. Ihr Stand ist 16.08.; für diesen Review waren die aktuelleren Repo-Dateien maßgeblich. Keine Vault-Datei geändert.

### Prüfbelege dieses Reviews

| Selbst ausgeführte Prüfung | Ergebnis |
|---|---|
| `funktionstest.py` | 269/269 bestanden, einschließlich Build-Prüfung |
| `lernkern_audit_test.py` | 52/52 bestanden, einschließlich G01 und Kontrastkorrekturen |
| `pruefe.py app.html landing.html buchfuehrung.html` | 0 Fehler, Handy/Schreibtisch × Hell/Dunkel |
| Eigene gezielte Formular-/Datenschichtfälle | 5 reproduzierte Fälle für G03–G05; Transport/Serverzustand simuliert |
| Finaler lokaler Arbeitsbaum | sauber; keine Änderungen committed oder gepusht |

Der erste Versuch eines vollständigen `pruefe.py`-Laufs lieferte keinen verwertbaren Bericht und wurde abgebrochen; danach erfolgte der obige gezielte Lauf. Das Ergebnis ist keine Bestätigung aller HTML-Seiten und kein erneuter axe-Scan. Die automatisierte Formulierung „Freigabe möglich“ im Sichtprüfungslog ist nur das Urteil dieses begrenzten Scans, keine Produkt-/Mergefreigabe.

Die Community-Suiten benötigen `COMMUNITY_TEST_PASSWORT`, der Zugangstest zusätzlich weitere Konten und einen Zugangscode. Diese Zugangsdaten wurden nicht bereitgestellt. Claudes 108/91/56/103 Community-Prüfungen bleiben daher berichtete Ergebnisse, keine von mir neu bestätigten Zahlen. Meine fünf gezielten Browser-/Datenschichtfälle verwenden ausschließlich simulierte Serverantworten und den unveränderten JS-Code dieses Commits.

Nicht geprüft: echte Geräte, Screenreader, Bildschirmtastatur, installierte PWA, Mail-Link Ende zu Ende, Live-Datenbankmigrationen und reale Spamgrenzen. Der angehängte Prüfbeleg enthält die externen Prüfscripte, Ergebnisse und lokalen Testlogs; keine Zugangsdaten.

## Nächste Entscheidung und Übergabe

Empfehlung an Lukes:

1. Claudes ergänzte Texte und Artwechsel-Verhalten gemäß Tabelle übernehmen.
2. G03–G05 vor Abnahme des Beiträge-Pakets durch Claude beheben lassen; nötige RPC-/Datenbankänderungen zuerst konkret vorlegen.
3. Spec 06 „Melden und Moderation“ v1 als nächsten Entwurf prüfen. Technische Änderungen daraus werden erst nach dem konkreten Plan eingespielt.
4. Beitragssperre geschlossen halten. Kein Merge, Deployment oder Öffnen mit diesem Review freigegeben.

Übergabe an Claude nach Lukes' Entscheidung: am tatsächlich aktuellen Branch beginnen, diese drei Fälle ergänzen, sichere Versandsemantik und Moderationsplan benennen, nur freigegebenen Umfang umsetzen und erneut mit Commit sowie echten/simulierten Belegen an ChatGPT zurückgeben. `main`, die geöffneten Paketgrenzen und `entscheidungen.md` nicht still ändern.
