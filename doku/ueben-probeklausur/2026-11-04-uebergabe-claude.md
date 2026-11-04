# Übergabe an Claude · Üben und Probeklausur

**Datum** 04.11.2026  
**Repo** EinsSkill/AzubiPass-Social  
**Arbeitsbranch** ueben-probeklausur-2026-11-04  
**Anwendungsbasis** main bei 512b525844485bf142492b491a9b857921841c64  
**Rolle** ChatGPT hat den Bestand geprüft und die Umsetzung spezifiziert. Claude übernimmt Code, Fachredaktion, Builds und Tests. Lukes entscheidet über Merge und Veröffentlichung.

## 1. Auftrag und Reihenfolge

Lukes hat die vorgeschlagene Richtung für Üben positiv aufgenommen, eine Verbesserung der Probeklausur angestoßen und um eine detaillierte Übergabe an Claude gebeten. Das Ergebnis soll einen vollständigen Weg vom Lernen über kurze Übungen und gezielte Wiederholung bis zur Klausur und zurück ins Training anbieten.

1. **Kern und Fehlerkorrekturen.** Themenrunden, Link aus dem Kapitel, brauchbare Fehlerliste und zuverlässige Klausurzeit sowie Bearbeitungsanzeige.
2. **Drei Übungspiloten und Rückweg aus der Klausur.** Vorhandene Bausteine für Einzeltraining nutzbar machen, Feedback und Varianten pilotieren, Klausurfehler gezielt weiterüben.
3. **Tagesrunde und Fallblock.** „5 Minuten üben“, verbesserte Klausurvarianten und ein zusammenhängender KfB-LF4-MAKEL-Fall. Die Pilotabnahme kommt vor einer Ausweitung auf alle Kapitel.

Die Detailvorschläge für Rundengröße, Wiederholungsregeln, Beschriftungen und Fallzahlen sind Arbeitsvorgaben für den Pilot. Sie dokumentieren keine separat von Lukes beschlossenen Produktregeln. Abweichungen mit Grund in die Rückübergabe aufnehmen. Kapitelauswahl und Zeitvorschau bleiben Kern der eigenen Probeklausur für die nächste Klassenarbeit. Der bestehende Beschluss zur letzten Auswertung nach Abgabe und Neuladen gilt weiter. Vier Haupttabs, Offline-Fähigkeit und lokale Nutzbarkeit ohne Konto sind Teil des Bestands.

## 2. Befunde und Einstiegspunkte

| Befund am Anwendungsstand | Referenz |
|---|---|
| 269 Quizfragen (KfB 145, IK 124), 513 Karten und 532 Klausurbausteine (KfB 247, IK 285) im Build. Das Kurzquiz mischt alle Fragen des aktiven Berufs und hat aktuell keine kurze Themenrunde. | [App und Kurzquiz](../../quellen/app.js#L1080), [Inhaltsbestand](../../docs/mittel/inhalt.json), [Aufgabenbestand](../../docs/mittel/aufgaben.json) |
| Die Fehlerliste sammelt Kapitelchecks, Zuordnungen, Selbsttests und Kurzquiz. Reproduktion mit Originalfunktion: Ein älterer falscher Kapitelcheck bleibt in der Liste, wenn dieselbe Frage im Quiz später richtig beantwortet wurde. Ein Klausurergebnis allein erzeugt keinen Eintrag. | [Schwachstellen](../../quellen/app.js#L289) |
| Die Klausur behält eine absolute Endzeit. Beim Ablauf wird ein Hinweis angezeigt, die Eingabeblöcke werden aber wieder aufgebaut. Reproduktion mit Originalfunktion: Die Antwortspeicherung nimmt eine Eingabe trotz gesetztem Ablaufstatus und vergangener Endzeit an. | [Antwortspeicherung](../../quellen/aufgaben.js#L923), [Klausurbogen](../../quellen/aufgaben.js#L1710), [Timer](../../quellen/aufgaben.js#L1839) |
| Der Klausurbalken zeigt die Position. Die Übersicht nutzt eine Prüfung, bei der eine einzige bearbeitete Teilfrage für den Status „beantwortet“ reicht. | [Antwortprüfung](../../quellen/aufgaben.js#L1238), [Klausurkopf](../../quellen/aufgaben.js#L1747) |
| Der Generator bevorzugt Vielfalt und benachteiligt IDs der letzten Klausur. Stichprobe mit Originalgenerator: LF4 K5/K6/K7, 30 Minuten, zehn feste Seeds, je sechs aus neun Bausteinen. Ab Runde zwei überlappten jeweils drei IDs mit der vorigen Runde. Bei LF4 K6 allein waren es immer dieselben drei Bausteine bei zwölf geschätzten Arbeitsminuten. | [Zusammensteller](../../quellen/aufgaben.js#L343), [Auswertung und neue Variante](../../quellen/aufgaben.js#L2012) |

Vor Beginn Branch und Arbeitsbaum prüfen und [AGENTS.md](../../AGENTS.md), [README](../../README.md), [Übergabe](../community/uebergabe.md), [Produktentscheidungen](../community/entscheidungen.md), [Übungskonzept](../AzubiPass_Uebungskonzept.md), [Eigene Probeklausur](../eigene-probeklausur.md) und [Aufgabenbausteine](../AzubiPass_Aufgabenbausteine.md) lesen. Der Code und die gebauten Daten entscheiden bei Abweichungen von älteren Konzepten. Die Befunde stammen aus Quellcode, Daten und isolierten Aufrufen der Originalfunktionen. Browser-, Offline- und Mobilprüfungen sind Teil von Claudes Abnahme.

## 3. Üben · Bildschirm und Sitzungen

### 3.1 Übersicht und Kapitel-Einstieg

- Primäre Einstiege **„5 Minuten üben“** und **„Thema üben“**, dazu **„Meine Fehler“**, Karteikarten, Englisch-Vokabeltrainer und **„Eigene Probeklausur“**. Bis zur fertigen Tagesrunde ist „Thema üben“ der primäre Einstieg. Eine laufende Klausur erhält weiter eine klar sichtbare Fortsetzen-Aktion ohne automatische Weiterleitung.
- „Thema üben“ bietet Lernfeld und optional Kapitel des aktiven Berufs. „Alle Lernfelder“ hält den bisherigen gemischten Einstieg verfügbar. „Dieses Thema üben“ im Kapitel öffnet die passende Themenrunde mit Vorwahl. Der bestehende Kapitel-Link zur Probeklausur bleibt erhalten.
- Vorschlag für den Einstieg **#ueben/thema?kapitel=lf4:k6**. Bestehende #ueben/quiz- und #ueben/schwach-Links bleiben benutzbar. Bei ungültiger Kapitelkennung erscheint die Themenauswahl mit Hinweis. Ein fremder Beruf wird dabei nicht still umgestellt.
- Vor dem Start Umfang anzeigen, im Pilot standardmäßig bis zu fünf Aufgaben. Bei kleinem Bestand entsprechend kürzer. Bei leerem Bestand Alternativen desselben Berufs anbieten. Während der Runde steht die Position sichtbar. Nach der letzten Aufgabe kommen Ergebnis und eine passende Folgeaktion, etwa **„Fehler nochmal üben“** oder **„Abschnitt nachlesen“**. Eine Hin-und-zurück-Navigation zum Kapitel soll die aktuelle Runde auf demselben Gerät wiederherstellen.

### 3.2 Aufgaben und Feedback

- Kurze Checks und Zuordnungen als Einstieg nutzen. Für Anwendung vorhandene Bausteine für Zahl, Buchung, Auswahl, Zuordnung, Reihenfolge und Freitext einbinden, sobald die jeweilige Darstellung getestet ist. Bestehenden Renderer, Formelauswertung und fachliche Bewertung soweit sinnvoll wiederverwenden. Rundenzustand und Klausurentwurf bleiben getrennt.
- Ablauf **Aufgabe → eigener Versuch → prüfen → Erklärung → weiter**. Ein freiwilliger Hinweis kann zuerst einen Denkanstoß und danach einen Zwischenschritt geben. Musterlösung und korrekte Auswahl erst nach Prüfung oder explizitem Aufdecken. Zuordnungen sollen bei Pilotaufgaben auch erklären, warum die Lösung passt. Offene Antworten mit Musterlösung und Kriterien zur Selbstbewertung.
- Lernlinks auf stabile Anker stützen. Wo der zugehörige Abschnitt im erweiterten Lernen liegt, die bereits vorhandene Deep-Link-Konvention nutzen. Bei fehlendem Abschnittsanker zum richtigen Kapitel zurückfallen.
- Versuch im Ergebnis unterscheidbar machen als **eigenständig gelöst**, **mit Hilfe gelöst**, **noch offen** oder **Lösung angesehen**. Ein richtiges Ergebnis mit Hinweis zählt als Übungserfolg und bleibt für eine spätere eigenständige Wiederholung verfügbar. Variante bedeutet neue Werte oder ein geändertes fachlich relevantes Falldetail. Beim selben Wortlaut und denselben Werten „Aufgabe erneut lösen“ anzeigen.

### 3.3 Fehlerliste und Tagesrunde

- Wiederholung nach stabiler Aufgaben- oder Kompetenz-ID, dem aktiven Beruf und dem jüngsten aussagekräftigen Ereignis. Gleiche Aufgabe aus Kapitel und Quiz zusammenführen, wenn die IDs oder eine explizite Zuordnung das belegen. Bestehende historische Einträge ohne verlässliche Zeitordnung als Altstand behandeln. Ein neuer eigenständiger Versuch löst für diese Aufgabe den aktuellen Zustand ab. Alte Fehler bleiben als Verlauf interpretierbar.
- „Jetzt nochmal üben“ startet eine konkrete Aufgabe oder einen passenden Ersatz. Für reine Selbsttest-Einträge kann der Nutzer erneut selbst einschätzen oder eine redaktionell zugeordnete Frage lösen. Ohne verlässliche Zuordnung den Einstieg ins richtige Kapitel anbieten.
- Klausurfehler erst nach Abgabe übernehmen. Je nach Aufgabe ein fachlich nachvollziehbares Signal speichern, etwa „Zahlungsfristen unterscheiden“. Unbearbeitet, fachlich falsch und offene Selbstbewertung getrennt behandeln. Anerkannte Folgefehler nicht noch einmal als eigenständige Fehlstelle werten. Solange eine offene Antwort nicht bewertet ist, bleibt ihr Fehlerstatus offen.
- „5 Minuten üben“ als kleine vorbereitete Runde, ohne laufende Uhr. Startmischung als Pilotvorgabe bis zu zwei fällige Karten, zwei offene Fehler und eine aktuelle Themenaufgabe. Leere Kategorien sinnvoll mit passenden Aufgaben auffüllen, denselben Gegenstand nicht zweimal in derselben Runde zeigen und bei kleinerem Vorrat früher abschließen. Ohne Historie dient das zuletzt besuchte Kapitel als Einstieg, andernfalls eine kleine Grundrunde des gewählten Berufs. Fünf Minuten sind eine Schätzung.

## 4. Probeklausur · konkrete Änderungen

### 4.1 Zeitablauf und Fortsetzen

- Bei Erreichen der absoluten Endzeit den Antwortstand einfrieren. Den Zeitcheck sowohl bei Wiederaufnahme und Darstellung als auch vor jeder Antwortänderung anwenden. Timer-Intervalle können im Hintergrund verspätet laufen. Alle Eingabetypen und bereits offene Eingabedialoge einbeziehen. Nach Ablauf Navigation und Sichtprüfung erlauben. **„Jetzt abgeben“** führt einmalig zur normalen Auswertung. Direktes Abgeben vor Ablauf bleibt möglich.
- **„Verlassen · Zeit läuft weiter“** oder ein gleichwertiger eindeutiger Text am bestehenden Fortsetzen-Weg. Die Restzeit zählt bei Tabwechsel, Neuladen und geschlossener App weiter. Beim Öffnen eines abgelaufenen Entwurfs sofort die gesicherte Nur-Lese-Ansicht zeigen. Die Uhr taucht in der abgegebenen Auswertung nicht auf.
- Position und Arbeitsstand getrennt anzeigen, etwa **„Aufgabe 4 von 8“** und **„3 von 8 vollständig bearbeitet“**. Der Bearbeitungszustand ist offen, teilweise oder vollständig. Markiert bleibt ein unabhängiges Merkmal. Vollständig bedeutet, dass alle geforderten Eingaben bearbeitet sind. Für Zuordnung alle geforderten Zeilen, für Buchung die nötigen befüllten Zeilen und Felder, für Reihenfolge eine bewusste Aktion oder Bestätigung. Dabei weder Ergebnisrichtigkeit noch die Anzahl richtiger Auswahloptionen verraten. Vor freiwilliger Abgabe offene und teilweise Aufgaben nennen.

### 4.2 Auswertung und Weiterüben

- Oben Ergebnisübersicht und gut sichtbare noch offene Selbstbewertungen. Darunter **„Gezielt weiterüben“** mit bis zu drei konkreten Folgeübungen zu erkennbaren Schwächen. Automatisch bewertbare Aufgaben können schon vor Abschluss der Freitext-Selbstbewertung passende Übungen vorschlagen. Offene Freitextantworten zunächst nur als zu bewerten kennzeichnen.
- Nach Abschluss einer Folgeübung muss die letzte Klausurauswertung über „Eigene Probeklausur“ erreichbar bleiben. Wiederholungsversuche dürfen den gespeicherten Klausurbogen, dessen Punkte oder die ursprüngliche Abgabezeit nicht verändern. Kapitel- und Aufgabenlösungen sowie „Neue Variante erstellen“ und „Auswahl ändern“ beibehalten.
- Im Konto synchronisierte Zusammenfassungen führen bisher Kapitelwerte, keine einzelnen Antworten. Für gezieltes Üben den lokalen Bogen oder explizit vorgesehene kompakte Signale nutzen. Auf einem zweiten Gerät ohne Aufgabenbefunde ggf. Kapiteltraining anbieten. Keine Rohantworten, Belegeingaben oder offenen Texte in Sync, Export oder Sicherung aufnehmen.

### 4.3 Auswahl und Variation

- Gewählte Kapitel abdecken, zeitlich passende Aufgaben und Mischung der Anforderungsbereiche bevorzugen. Vor Start verfügbare Bausteine und erwartbare Überschneidung verständlich machen, wenn wenige Kapitel gewählt sind. Für die vorbereitete Klausur die tatsächliche Zahl wiederverwendeter Aufgaben-IDs ausweisen. Geänderte Zahlen separat benennen, wenn sie tatsächlich anders gezogen wurden.
- Bei gleicher Auswahl Alternativen bevorzugen, soweit es Zeit, Abdeckung und Mischung erlauben. Die letzte Klausur als Vergleichsbasis reicht für den Pilot. Wo weniger Wiederholung redaktionell möglich ist, gezielt neue Wertevarianten und geänderte Falldetails schreiben. Bei unzureichender Aufgabenmenge ehrlich bleiben und zusätzliche Kapitel oder kürzere Dauer anbieten.
- Vorschau, gezogene Werte und tatsächlich gestarteter Bogen müssen zusammenpassen. Der heutige Start kann Aufgaben mit fehlgeschlagener Wertziehung nach der Vorschau auslassen. Die vorbereitete Variante daher vor Start validieren. Bei einer fehlerhaften Aufgabe eine valide Alternative mit geprüfter Abdeckung ziehen oder den Start mit verständlichem Hinweis verhindern. Bereits gestartete Klausuren stabil laden.

## 5. Redaktioneller Pilot

| Strang | Vorhandener Ausgangspunkt | Abnahme der Übung |
|---|---|---|
| **KfB LF4 K6 · Mangelhafte Ware** | [lf4-k6-mangel](../../quellen/lf4-k6-mangel.aufgaben.json), Bausteine 01 bis 03 | Stofflieferung sichten, Sachverhalt zuordnen und nächsten Schritt begründen. Zweiter Fall ändert ein entscheidendes Detail. Feedback erklärt, welche Angabe die Entscheidung beeinflusst. |
| **KfB LF6 K5 · Warenkonten** | [k5-warenkonten](../../quellen/k5-warenkonten.aufgaben.json), insbesondere buchfuehrung-k5-03 | Beleg auswerten, Buchungssatz erfassen, Konto, Seite und Betrag getrennt erläutern. Zweiter Beleg mit anderen Werten. Buchungslogik und Behandlung der Umsatzsteuer ausdrücklich angeben. |
| **IK LF4 K04 · Angebote vergleichen** | [ik2024-lf04-k04](../../quellen/ik2024-lf04-k04.aufgaben.json), insbesondere 01 | Ziel- und Bezugspreis aus einem Angebot berechnen. Fracht, Rabatt und Skonto sauber unterscheiden. Zweiter Seed liefert andere Werte. Feedback zeigt einen typischen falschen Rechenweg und die korrekte Bezugsgröße. |

### Zusammenhängender Klausurfall in KfB LF4

Pilotname **„Stofflieferung für die Winterkollektion“**. Ein gemeinsamer Belegsatz in drei Teilen, die im Klausurmodus jederzeit am Fallblock abrufbar sind. Redaktioneller Testdatensatz für eine neu auszuarbeitende Variante:

| Unterlage | Entwurfsdaten |
|---|---|
| Bestellung B-2026-118-P | 100 Rollen Stoff zu je 48,00 € netto, vereinbarter Liefertermin 16.11. |
| Lieferschein L-2026-331-P | Anlieferung 16.11., 100 Rollen, Wareneingang vermerkt bei 20 Rollen Feuchtigkeitsschäden. |
| Rechnung R-2026-444-P | 100 Rollen zu je 48,00 € netto. Interne Anweisung im Fall: Rechnung bei einem dokumentierten Mangel zur Klärung an den Einkauf geben. |

1. **Belege abgleichen.** Termin und Menge stimmen überein. Die Auffälligkeit betrifft den Zustand von 20 Rollen. Lernziel ist, die relevante Stelle in der Anlage zu finden und den Fall richtig einzuordnen.
2. **Auswirkung berechnen.** 20 × 48,00 € = 960,00 € netto Warenwert der betroffenen Rollen. Aufgabe und Auswertung kennzeichnen dies als Warenwert der betroffenen Position, nicht als automatisch abzuziehenden Rechnungsbetrag.
3. **Nächsten Schritt begründen.** Vermerk zum Wareneingang und internen Ablauf auswerten. Kurz an den Einkauf schreiben und das weitere Vorgehen zur Prüfung des Mangels begründen. Muster und Raster getrennt für Belegbezug, zutreffenden nächsten Schritt und nachvollziehbare Begründung. Aussagen zu Rechten, Pflichten oder Fristen fachlich gegen Kapitel und bei Bedarf gegen die aktuelle Primärquelle prüfen. Konkrete Rechtsannahmen im Sachverhalt ausdrücklich nennen.

Zweiter Fall mit anderer Menge und geänderter Beleglage, damit mindestens eine Entscheidung neu getroffen werden muss. Belegnummern und Namen gegen den vorhandenen MAKEL-Bestand prüfen. Verknüpfte Schritte orientieren sich an der Vorgangsidee aus der Baustein-Spec. Das bestehende Feld **passt_zu** ist ein Anknüpfungspunkt. Den kleinsten brauchbaren Fallmechanismus bauen, mit einem gemeinsamen Anlagenkontext und stabilen Teilaufgaben-IDs. Alle für den Fall benötigten Kapitel müssen gewählt sein, der ganze Fall muss zeitlich passen und die Abdeckung anderer gewählter Kapitel erhalten. Andernfalls Einzelaufgaben nutzen. Schritte desselben Falles zusammen anzeigen oder in direkter Folge mit Zugriff auf dieselben Anlagen. Folgefragen so formulieren, dass sie eigenständig lösbar bleiben oder eine fachlich begründete Folgefehlerregel besitzen. Feedback und Lösungen erst nach Abgabe.

## 6. Daten, Kompatibilität und Abnahme

- An normalen Einstiegspunkten arbeiten. Quelländerungen unter quellen/ vornehmen und docs/ über den vorhandenen Build erzeugen. Bestehende Aufgaben-, Kapitel- und Karten-IDs erhalten. Stabile Zuordnung zwischen Lernzielen, Übungen und Klausuraufgaben hinzufügen, wo der Pilot sie benötigt.
- Altstand ohne neue Felder laden. Speichern, Reset, Backup und Wiederherstellen berücksichtigen. Konto-Sync für neue Signale erst nach Prüfung des bestehenden Formats und der Zusammenführungsregeln anbinden. Ohne Anmeldung bleibt der neue Übungsweg nutzbar. Wiederholtes Speichern, Neuladen und mehrere Tabs dürfen Versuche nicht doppelt zählen oder einen neueren Stand durch einen älteren überschreiben. Beim Berufswechsel Training, Fehler und Klausuren passend filtern.
- Keine neue Datenbank oder Infrastruktur für diesen Pilot einplanen. Klassenarbeitsmodus, Kapitelwahl, Kontenplan, Rechner, Tastaturbedienung und Auswertung nach Abgabe mit vorhandenen Einstiegen erhalten.

| Test | Erwartung |
|---|---|
| U01 · Themenrunde | Direkter Kapitelstart, richtiger Beruf, stabile Aufgabe bei Rückkehr, klare Abschlussansicht. Leeres Kapitel und kleiner Bestand funktionieren. |
| U02 · Fehlerverlauf | Alter Kapitelcheck falsch, neuer eigenständiger Versuch richtig, kein offener Doppeleintrag. Aufdecken und richtige Antwort mit Hinweis bleiben von eigenständiger Lösung unterscheidbar. Doppelklick, Neuladen und mehrere Tabs erzeugen keinen Doppelversuch. |
| U03 · Bausteine | Alle drei Piloten durchlaufen. Zahl mit deutschem Komma, Buchung in gültiger alternativer Zeilenreihenfolge, korrekte Teilpunkte und bedienbarer Freitextvergleich. Hinweise und Lösungen erscheinen zur vorgesehenen Zeit. |
| U04 · Tagesrunde | Mit und ohne Lernhistorie, mit und ohne fällige Karten, bei kleinem Bestand sowie nach Berufswechsel. Keine Aufgaben aus dem anderen Beruf und eindeutiger Abschluss. |
| K01 · Zeitablauf | Vor und nach der Frist testen, einschließlich Tab im Hintergrund, Neuladen und geöffneter Eingabe. Eingabe nach Endzeit kann den gesicherten Stand nicht ändern. Abgabe und Wiederaufruf der letzten Auswertung funktionieren. |
| K02 · Bearbeitungsstand | Leer, teilweise, vollständig, danach Antwort löschen und wieder teilweise. Markierung unabhängig. Abgabedialog nennt offen und teilweise. Reihenfolge ohne Aktion gilt als offen. |
| K03 · Varianten | Fixe Seeds reproduzieren Aufgaben und Werte. Knappe Auswahl, LF4 K5–K7 mit 30 Minuten und absichtlich fehlerhafte Wertziehung prüfen. Keine ungesehene Änderung zwischen Vorschau und Bogen. |
| K04 · Auswertung | Falsche, leere, richtig mit Folgefehler und offene Selbstbewertung unterscheiden. Folgeübung startet im richtigen Beruf und lässt Klausurergebnis und Abgabezeit intakt. |
| K05 · MAKEL-Fall | Nur bei geeigneter Kapitelauswahl und Zeit. Anlagen bleiben im Bogen erreichbar. Belege, Zahlen, Zeit, Punkte und Raster sind innerhalb jeder Variante konsistent. Wenn der Fall nicht passt, bleiben Kapitel über Einzelaufgaben abgedeckt. |
| R01 · Regression und Offline | Alter Lernstand und laufender Entwurf, Berufswechsel, Offline-Neuladen nach Cache-Befüllung, echter Wechsel zwischen Üben und Klausur, Mobilansicht, Tastatur, sichtbarer Fokus und angekündigte Statusmeldungen. |

Build und Prüfung nach README. Mindestens build.py, build_app.py und bei betroffenen Einstiegsdaten den weiteren üblichen Build, danach pruefe.py, funktionstest.py, lernkern_audit_test.py, industriekaufleute_test.py und lernstand_sync_test.py, soweit betroffen. Die gezielten Grenzfälle oben als reproduzierbare Tests ergänzen, wenn die bestehende Suite sie nicht abdeckt. Läufe mit Ergebnis, Commit und bekannten Grenzen dokumentieren.

## 7. Rückübergabe

Die Umsetzung in nachvollziehbaren Commits auf diesem Arbeitsbranch vorbereiten. Nach Abschluss in [doku/community/uebergabe.md](../community/uebergabe.md) ganz oben den neuen Übergabeabschnitt ergänzen. Darin den tatsächlich geprüften Code-Commit, Funktionsumfang pro Beruf, Testergebnisse, fachliche Prüfstellen, Abweichungen vom Pilot und offene Punkte nennen. ChatGPT übernimmt anschließend die Gegenprüfung. Merge und Veröffentlichung sind eigene Schritte nach Lukes' Freigabe.
