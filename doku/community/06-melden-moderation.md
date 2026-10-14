# 06 · Melden und Moderation

> Status: SPEC · Version: 1 · Stand: 2026-10-14 · Autor: ChatGPT
>
> Entwurf für Lukes; Umsetzung durch Claude nach dokumentierter Freigabe. Grundlage: `community-zugang` @ `237a62a`, Specs 00–05, Community-Regeln, Entscheidungen, tatsächliche Datenschicht und SQL. Kein Merge, Deployment oder Öffnen der Beiträge freigegeben. Die technischen Änderungswünsche unten brauchen vor dem Einspielen einen konkreten Plan.

## 1. Zweck

Azubis melden einen problematischen Beitrag oder eine Antwort verständlich und ohne doppelte Meldung; das Team prüft den betroffenen Inhalt und entscheidet nachvollziehbar über seine Sichtbarkeit.

Dieses Paket ergänzt C05 um C13 „Inhalt melden“ und C15 um C14 „Moderation“. Enthalten sind sechs vorhandene Meldegründe, optionaler Hinweis, offene Meldungen, ausgeblendete Inhalte und reversible Aus-/Einblendung. Die drei Beiträge-Pakete werden erst gemeinsam nach Lukes' gesonderter Freigabe für die Klasse geöffnet.

Nicht Teil dieses Pakets: Löschung fremder Inhalte/Dateien, Sperren von Konten, Rollenvergabe, Gruppenoberflächen, private Nachrichten, Meldungen über Profile, automatische fachliche Bewertung, Benachrichtigungen und ein Beschwerdeportal. Die bestehenden acht Community-Regeln bleiben unverändert.

## 2. Einstieg

- In C05 nach dem Beitragstext und gegebenenfalls der Datei: „Beitrag melden“ als zurückhaltende Textaktion mit mindestens 44 × 44 px Fläche.
- An jeder aktuell sichtbaren Antwort nach Autor/Datum: „Antwort melden“. Zugänglicher Name ergänzt „von {Anzeigename}“; keine identischen ununterscheidbaren Knöpfe.
- Die Aktion öffnet C13 als modalen Dialog in derselben Ansicht. Der Kontext bleibt erhalten, der Inhalt wird nicht in einen ungeschützten Route-Parameter kopiert. Kein neuer Direktweg für Meldedialoge nötig.
- Vorschlag: eigene Inhalte ebenfalls melden erlauben, entsprechend den bestehenden Rechten. Eigene Löschung wird damit nicht vorweggenommen.
- Profil zeigt „Moderation“ ausschließlich nach aktueller Prüfung auf `rolle = team` und aktive Paketfreigabe. Neuer Unterweg `#community/moderation`.
- Ein Direktlink durchläuft Sitzung, Profil, Paketfreigabe und zusätzliche Teamprüfung. Unberechtigte erhalten einen neutralen Rückweg ohne Meldungszahlen, Inhalte oder Namen. `mentor` ist keine Moderationsrolle; eine Teamrolle allein umgeht die geschlossene Paketfreigabe nicht.

## 3. Aufbau von oben nach unten

### C13 · Inhalt melden

1. Überschrift „Inhalt melden“; Kontext „Beitrag: {Titel}“ oder „Antwort von {Anzeigename}“. Nur bereits berechtigt geladene Daten; keinen gesamten sensiblen Text erneut wiedergeben.
2. Einleitung „Was ist an diesem Inhalt problematisch? Wähle den passenden Grund.“
3. Pflichtfeld „Grund“ als native Radiogruppe, nichts vorausgewählt: Fachlich falsch / Urheberrecht / Beleidigung / Spam / Persönliche Daten / Sonstiges.
4. „Hinweis (optional)“, mehrzeilig, höchstens 500 Codepunkte nach Trimmen. Zählung „{n} / 500 Zeichen“, keine laut angesagte Zählung bei jedem Tastendruck. Auch bei Sonstiges bleibt der Hinweis optional.
5. Hilfetext „Beschreibe kurz, welche Stelle du meinst. Kopiere keine persönlichen Daten in den Hinweis.“
6. Fehlerbereich mit Feldbezug; Aktionen „Meldung senden“ und „Abbrechen“.
7. Erfolg erst nach Bestätigung: Dialog schließen, Rückmeldung „Danke. Das Team prüft deine Meldung.“ am Ursprung ankündigen. Dies ist keine Zusage einer Bearbeitungsfrist oder einer begründeten Rückantwort.

Der Meldegrund bezieht sich bei einem Lernzettel auch auf seine Bild-/PDF-Datei. Es gibt keine getrennte Dateimeldung: Das Team prüft den ganzen Beitrag einschließlich der Datei bei Bedarf.

### C14 · Moderation

1. „Zurück zum Profil“, Augenbraue „Ich · Community“, Überschrift „Moderation“; Hinweis „Nur für das Team.“
2. Zwei lokale Bereiche: „Offene Meldungen“ und „Ausgeblendete Inhalte“, semantisch als lokale Navigation. Keine zusätzliche globale Tab-Leiste und keine Dashboard-Kacheln.
3. Offene Meldungen als ruhige Liste **nach betroffenem Inhalt gebündelt**, nicht eine Karte je melderbezogener Zeile. Älteste offene Meldung zuerst, bei Gleichstand Art und Inhalts-ID als stabile Reihenfolge. Zu jedem Fall: Beitrag/Antwort, vorhandener Titel oder Antwortkontext, Zustand „Sichtbar“/„Ausgeblendet“, Anzahl offener Meldungen, Datum der ältesten Meldung; „Prüfen“ öffnet die Prüfung im Moderationsbereich.
4. Ausgeblendete Inhalte: Beiträge und Antworten ohne erforderliche offene Meldung, damit das Team eine abgeschlossene Ausblendung wieder rückgängig machen kann. Sortierung nach vorhandener Erstellungszeit und ID; **keine erfundene Ausblendungszeit**. Bei Antworten zu einem ausgeblendeten Beitrag steht „Der zugehörige Beitrag ist ausgeblendet.“ Das Einblenden der Antwort öffnet den übergeordneten Beitrag nicht.
5. Nachladen über „Weitere Fälle laden“ / „Weitere Inhalte laden“, stabile Seitennavigation. Kein stilles Limit von 120 Fällen. Ein gebündelter Fall darf keine ausgeblendeten zusätzlichen Meldungen wegen eines Abfragelimits unterschlagen; alle zugehörigen offenen Meldungen beim Prüfen laden.

### Einen Fall prüfen

1. „Zurück zur Moderation“, Überschrift „Inhalt prüfen“, tatsächlicher Titel und Autor/Rolle/Datum. Bei einer Antwort zusätzlich berechtigter Beitragstitel und Link zum Moderationskontext des Beitrags.
2. Aktueller Inhalt als Klartext mit Umbrüchen und Zuordnung aus dem Katalog. Kein Bearbeitungsformular für fremden Text. Eine inzwischen bearbeitete Beitragsfassung kann vom gemeldeten Stand abweichen; es gibt derzeit keinen Meldungs-Snapshot. Das nicht als historische Originalfassung ausgeben.
3. Datei nicht sofort laden. „Datei prüfen“ lädt sie nach aktueller Team-/Paket-/Speicherprüfung; danach vorhandene Bild-/PDF-Aktionen. Keine automatische Ausführung eingebetteter Dokumentinhalte, kein neuer signierter Link und keine dauerhafte Offline-Ablage. Auch der Falltitel und der Hinweis bleiben ohne Dateizugriff lesbar.
4. Meldungen: Grund, Hinweis, Datum; Melder-ID oder Name wird in der Oberfläche nicht gezeigt. Das bestehende Datenmodell speichert `melder_id` und die Teamrechte erlauben den Zugriff; eine serverseitige Anonymität ist damit **nicht** gegeben und wird nicht versprochen. Die betroffene Autor:in und andere normale Konten sehen keine fremden Meldungen/Hinweise.
5. Aktionsbereich je aktuellem Zustand:

| Zustand | Aktion | Bestätigtes Ergebnis |
|---|---|---|
| Sichtbar, offene Meldungen | „Inhalt ausblenden“ | Inhalt verborgen; die tatsächlich geprüften Meldungen abgeschlossen |
| Sichtbar, offene Meldungen | „Meldungen abschließen“ | Sichtbarkeit unverändert; die tatsächlich geprüften Meldungen abgeschlossen |
| Ausgeblendet, offene Meldungen | „Weiter ausgeblendet lassen“ | Inhalt bleibt verborgen; die tatsächlich geprüften Meldungen abgeschlossen |
| Ausgeblendet | „Wieder einblenden“ | Inhalt sichtbar, soweit der übergeordnete Beitrag zugänglich ist; geprüfte offene Meldungen abgeschlossen |

Für Ein-/Ausblenden eine kurze Rückfrage mit dem beabsichtigten Ergebnis: „Diesen Inhalt ausblenden?“ / „Diesen Inhalt wieder einblenden?“ Hauptaktion gleichnamig, Nebenaktion „Abbrechen“. „Weiter ausgeblendet lassen“ und „Meldungen abschließen“ erklären vor Auslösung, dass die geprüften Meldungen abgeschlossen werden. Kein pauschaler Knopf „Erledigt“, der die Sichtbarkeit unbemerkt ändert.

Nach bestätigter Entscheidung zur frisch geladenen Liste zurückkehren, Erfolg ankündigen und Fokus sinnvoll zum nächsten Fall oder zur Abschnittsüberschrift führen. Bei fehlerhaftem Nachladen bleibt die Entscheidung als bestätigt stehen; Wiederholung lädt nur die Liste.

## 4. Aktionen und Sicherheitsgrenzen

| Aktion | Wer darf | Verhalten |
|---|---|---|
| Melden | Sitzung, Profil, Paketfreigabe und aktuell lesbarer Zielinhalt | Eine Meldung pro Konto und Inhalt, entsprechend vorhandenen eindeutigen Indizes |
| Meldestatus prüfen | Dasselbe Konto | Eigene vorhandene Meldung zum exakten Ziel prüfen; keine neue Meldung senden |
| Moderation laden | Aktuell `team`, Profil und Paketfreigabe | Nur der berechtigte Moderationsumfang; zunächst allgemeine Beiträge und deren Antworten |
| Datei prüfen | Aktuell berechtigtes Teamkonto | Angemeldeter frischer Abruf, Blob beim Verlassen/Offline/Kontowechsel freigeben |
| Sichtbarkeit setzen | Team und aktive Paketfreigabe | Gewünschten Zustand explizit setzen, nicht umschalten; fehlendes Ziel ist kein Erfolg |
| Geprüfte Meldungen abschließen | Team und aktive Paketfreigabe | Ausschließlich bestätigten Prüfumfang in einer konsistenten Entscheidung abschließen |
| Abbrechen | Berechtigter Dialogkontext | Ungesendeten Hinweis/gewählten Grund nur nach Rückfrage verwerfen; laufender oder unklarer Vorgang wird nicht als abgebrochen behauptet |

**Verlässliches Senden:** Beim Absenden einen unveränderlichen Versandstand festhalten; währenddessen Eingaben sperren. Meldung ist anhand Konto und genau eines Zieles eindeutig. Ein Duplikatfehler darf nicht blind als neue Ablehnung ausgegeben werden: vorhandene eigene Meldung abgleichen. Verlorene Bestätigung bleibt unklar. Ein leerer Statusabruf ist kein endgültiger Fehlschlag. Eine erlaubte Wiederholung desselben Vorgangs sendet denselben Grund/Hinweis und kann aufgrund der eindeutigen Indizes keine zweite Meldung erzeugen. Vor dem Umgang mit Duplikaten und der realen Spam-Bremse serverseitig das konkrete Verhalten prüfen: Ein Trigger kann vor der Eindeutigkeitsprüfung abbrechen.

Alle asynchronen Lese- und Schreibvorgänge sind an Konto und Generation gebunden, auch vor dem nächsten Schreibschritt. Rollenentzug, Kontowechsel, Abmeldung und geschlossene Paketfreigabe entfernen den Moderationsinhalt. Ein späterer alter Erfolg verändert die Ansicht des neuen Kontos nicht.

**Neue Meldungen während einer Entscheidung:** Das Team darf nicht unbemerkt Meldungen abschließen, die erst nach dem Öffnen des Falls eingegangen sind. Claude plant eine transaktionale Prüfung der tatsächlich gesehenen Meldungs-IDs und des aktuellen Zielzustands. Hat sich der Prüfumfang geändert, Entscheidung nicht als erledigt behaupten: „Der Fall hat sich geändert. Prüfe die aktuellen Meldungen erneut.“ Keine neue Meldung durch ein pauschales UPDATE aller offenen Meldungen verlieren.

**Automatische Ausblendung:** Die vorhandene Schwelle bleibt: drei verschiedene Personen mit offenen Meldungen. Das ist eine vorläufige Maßnahme, keine Feststellung eines Regelverstoßes. Sie wird nur für berechtigte allgemeine Inhalte dieser Phase benötigt; keine Gruppenoberfläche freigeben. Weder fehlende Anzahl bis zur Schwelle noch Namen der Meldenden öffentlich anzeigen.

**Beste Antwort:** Wird die beste Antwort manuell oder automatisch ausgeblendet, `beste` entfernen und die Frage als ungelöst führen. Wieder-Einblenden setzt die Markierung nicht automatisch zurück. Nur der Fragesteller kann sie neu setzen. Diese Konsistenz muss serverseitig für alle Ausblendungswege gesichert werden; kein verborgenes Lösungsetikett auf der normalen Leseseite.

Ausgeblendete Beiträge blockieren Antworten und den Dateizugriff anderer Personen. Schon heruntergeladene Daten können nicht zurückgeholt werden. Es wird keine sofortige Entfernung vom untätigen Bildschirm versprochen; beim erneuten Abruf und bekannt gewordenen Entzug frisch prüfen und die normale Ansicht neutral ersetzen. Dateilöschung ist kein Bestandteil einer Ausblendung.

## 5. Zustände

| Situation | Text / Verhalten |
|---|---|
| Grund fehlt | „Wähle einen Grund für deine Meldung.“ |
| Hinweis zu lang | „Der Hinweis darf höchstens 500 Zeichen lang sein.“ Eingabe nicht still abschneiden. |
| Versand | „Meldung wird gesendet …“ |
| Erfolg | „Danke. Das Team prüft deine Meldung.“ |
| Bereits gemeldet | „Du hast diesen Inhalt bereits gemeldet. Das Team prüft deine Meldung.“ |
| Sicher abgelehnt | „Deine Meldung wurde nicht gesendet. Deine Eingaben sind noch da.“ Nur bei belegtem endgültigen Fehlschlag. |
| Unklar | „Wir konnten nicht prüfen, ob deine Meldung gesendet wurde. Prüfe den Status, bevor du erneut sendest.“ Aktion „Status prüfen“. |
| Status ohne Treffer, Ausgang weiter offen | „Die Meldung wurde noch nicht gefunden. Der Ausgang ist weiterhin unklar.“ |
| Spam-Bremse | „Du hast gerade viele Meldungen gesendet. Versuch es später erneut.“ Eingaben erhalten. |
| Ziel nicht mehr zugänglich | „Dieser Inhalt ist für dich nicht verfügbar.“ Fremde Metadaten entfernen. Kein erneuter Versand. |
| Offline | „Du bist offline. Für die Community brauchst du Internet. Deine Eingaben bleiben in diesem geöffneten Tab.“ Zusätzlich „Zu Lernen“; kein Hintergrundversand. |
| Leere Meldungsliste | „Es gibt keine offenen Meldungen.“ |
| Keine ausgeblendeten Inhalte | „Es gibt keine ausgeblendeten Inhalte.“ |
| Liste lädt | „Meldungen werden geladen …“ / „Ausgeblendete Inhalte werden geladen …“ |
| Ladefehler | „Die Moderation konnte nicht geladen werden. Versuch es erneut.“ Aktionen „Erneut versuchen“, „Zu Lernen“. |
| Entscheidung läuft | „Entscheidung wird gespeichert …“ |
| Entscheidung bestätigt | „Der Inhalt wurde ausgeblendet.“ / „Die geprüften Meldungen wurden abgeschlossen.“ / „Der Inhalt bleibt ausgeblendet.“ / „Der Inhalt wurde wieder eingeblendet.“ |
| Entscheidung unklar | „Wir konnten nicht prüfen, ob die Entscheidung gespeichert wurde. Prüfe den Status, bevor du erneut entscheidest.“ |
| Prüfumfang geändert | „Der Fall hat sich geändert. Prüfe die aktuellen Meldungen erneut.“ |
| Bestätigt, Nachladen scheitert | „Die Entscheidung wurde gespeichert. Die Liste konnte noch nicht neu geladen werden.“ Aktion „Liste erneut laden“. |
| Fehlendes/entzogenes Teamrecht | „Dieser Bereich ist für dich nicht verfügbar.“ Keine Fall-/Meldeinformationen, „Zum Profil“, „Zu Lernen“. |
| Paket zu | Bestehender Sperrtext aus Spec 05; Moderationszugriff serverseitig ebenfalls geschlossen. |

Für Fälle mit verlorener Bestätigung erst aktuellen Zustand sowie Abschluss der betreffenden Meldungen prüfen. „Status prüfen“ sendet keine neue Entscheidung. Eine erneut freigegebene Aktion setzt denselben gewünschten Zustand. Browser-/Tab-Schließen warnt nur soweit der Browser dies unterstützt. Der Entwurf lebt ausschließlich im Arbeitsspeicher des geöffneten Tabs und wird nicht nach Neuladen garantiert wiederhergestellt.

## 6. Texte (wörtlich)

| Stelle | Text |
|---|---|
| Meldeaktionen | Beitrag melden / Antwort melden |
| Dialog | Inhalt melden |
| Grund | Grund · Pflicht |
| Hinweis | Hinweis (optional) |
| Zählung | {n} / 500 Zeichen |
| Senden / Rückweg | Meldung senden / Abbrechen |
| Profil-Einstieg | Moderation |
| Bereiche | Offene Meldungen / Ausgeblendete Inhalte |
| Prüfen | Prüfen / Inhalt prüfen |
| Zustände | Sichtbar / Ausgeblendet |
| Entscheidung | Inhalt ausblenden / Meldungen abschließen / Weiter ausgeblendet lassen / Wieder einblenden |
| Datei | Datei prüfen |
| Klärung | Status prüfen |

Die Texte in Abschnitt 5 sind ebenfalls verbindlich vorgeschlagene UI-Texte. Hinweise und Nutzerinhalte als Klartext darstellen. Kein öffentliches Urteil „fachlich geprüft“, keine automatische Nachricht an die Autor:in, keine Bearbeitungsfrist behaupten.

## 7. Daten und ausdrückliche technische Änderungswünsche

| Daten | Bereits vorhanden |
|---|---|
| Meldung | `id`, `melder_id`, exakt eines von `beitrag_id`/`antwort_id`, `grund`, `hinweis` ≤ 500, `status` offen/erledigt, `erstellt_am` |
| Inhalt | Vorhandene Beitrags-/Antwortfelder, `versteckt`, bestehende Zuordnung und Dateipfad |
| Lösung | Antwort `beste`, Beitrag `geloest` |
| Rolle/Freigabe | Profil `rolle`, gemeinsame Paketfreigabe und benannte Testausnahmen aus Spec 05 |
| Prüfumfang | Lokale Liste geladener Meldungs-IDs und beabsichtigter Zustand, kontogebunden |

Die vorhandenen Funktionen sind **keine fertige Umsetzung dieser Spec**:

- `melden()` schneidet Hinweise mit UTF-16 `slice(0, 500)` ab; auf Codepunktvalidierung ohne stilles Kürzen umstellen. Kontobindung, Ergebnis-/Duplikatprüfung und ehrlichen Statusweg ergänzen.
- `offeneMeldungen()` liefert Meldungszeilen und Teilkontext, keinen vollständigen Moderationsfall, keine ausgeblendete Historienliste und keine stabile vollständige Seitennavigation. Geeignete berechtigte Abrufe planen.
- `moderieren()` setzt zwar ausdrücklich einen booleschen Zustand, prüft aber derzeit nur `ist_team()`, bestätigt auch ein fehlendes Ziel ohne Änderung und schließt pauschal alle offenen Meldungen. Paket-/Zielprüfung, Prüfumfang, bestätigten Rückgabewert und konkurrierende Vorgänge serverseitig absichern.
- `meldungErledigt()` aktualisiert ohne nachgewiesene betroffene Zeile und ist nicht kontogebunden. Ein gemeinsamer sicherer Entscheidungsweg soll ungesehene Meldungen schützen; keine UI-Erfolgsmeldung allein wegen einer leeren erfolgreichen UPDATE-Antwort.
- Beim Ausblenden einer besten Antwort setzt der bestehende Automatismus `beste`/`geloest` nicht zurück. Alle manuellen und automatischen Wege konsistent machen.
- Der Paketumfang muss auch die Moderationslisten und -RPCs auf dem Server sperren. `team` ohne Testausnahme erhält keine Sonderöffnung. Normale Konten dürfen nur eigene Meldungen lesen; diese dürfen keine fremden Zielmetadaten über einen Rechteentzug hinweg verraten.

Claude legt RPC-Signaturen, RLS-/Spaltenrechte, Transaktions-/Sperrstrategie, Abfragen und Migrationen **vor Einspielen** konkret vor. Änderungen an Serverrechten und Funktionen sind hier ausdrücklich vorgeschlagen, nicht schon freigegeben. Keine clientseitige „Team“-Variable als Sicherheitsgrenze und keine Erweiterung frei beschreibbarer `versteckt`-/Rollenfelder.

Für Version 1 werden keine neuen fachlichen Felder verlangt. Ein Moderationsprotokoll mit Entscheider, Zeitpunkt und Begründung sowie ein Snapshot des gemeldeten Inhalts wäre ein eigener Datenmodellwunsch. Das bestehende Schema hat diese Informationen nicht; die Oberfläche darf daher keine lückenlose Entscheidungshistorie anbieten oder versprechen. Ausgeblendete Inhalte bleiben über ihren vorhandenen Zustand wieder auffindbar.

## 8. Barrierefreiheit und Gestaltung

- DESIGN/PRODUCT und C04/C05 fortführen: tiefgrüne App-Hülle, offene Listen mit feinen Linien, sparsame goldene Hauptaktion. Keine neue Formularwelt.
- Dialog mit benannter Überschrift, Fokusbindung, Escape und Fokus zurück zum richtigen Beitrag/Antwortknopf. Entfällt der Inhalt nach Ausblendung, Fokus auf den neutralen Hinweis oder den Rückweg.
- Radio-Gruppe mit Legende; Textfeld mit dauerhaftem Label, Hilfe, Zählung und Feldfehler per `aria-describedby`. Grenzen ankündigen, kein Live-Sprechen jedes Zeichens.
- Lokale Navigation, Zustand und Anzahl textlich benennen; alle Aktionen ≥ 44 × 44 px, klare sichtbare Fokusmarkierung, keine reine Farbkennzeichnung.
- Lange Titel, Hinweise und Dateinamen umbrechen; 320/390 px, Desktop, 200 % Textgröße und Bildschirmtastatur prüfen. Aktionen bleiben ohne verdeckende Fixleiste erreichbar.
- Versandergebnis und Entscheidung ankündigen, nicht den gesamten Fall erneut vorlesen. Nach Nachladen Fokus stabil halten.
- Reduzierte Bewegung beachten; keine animierte Dringlichkeit, keine öffentlichen Meldezähler als Motivation.
- Dateien können unzugänglich sein; Kontexttext bleibt nutzbar. Echte Screenreader-/Geräteprüfungen zusätzlich zum axe-Scan durchführen.

## 9. Offene Entscheidungen an Lukes

1. **Bedienung:** Meldedialog direkt im Detail, sechs vorhandene Gründe, Hinweis optional, eigene Inhalte ebenfalls meldbar? Empfehlung: ja.
2. **Teamentscheidung:** Meldungen nach Inhalt bündeln, offene Fälle und ausgeblendete Inhalte getrennt, reversible Sichtbarkeit mit den vier oben benannten Aktionen; fremde Löschung bleibt außerhalb? Empfehlung: ja.
3. **Datenumfang:** Version 1 nutzt vorhandene Melde-/Inhaltsfelder ohne neue Protokoll-/Snapshot-Tabelle und zeigt keine vollständige Entscheidungshistorie? Empfehlung: ja für die kleine interne Beta; eine Protokollerweiterung getrennt planen.
4. **Technik:** Claude konkretisiert die genannten Serveränderungen einschließlich Paketprüfung, sicherem Abschluss nur geprüfter Meldungen, Lösungsstatus und verlässlichen Ergebnissen, bevor sie eingespielt werden? Empfehlung: ja. Die bekannte Drei-Personen-Schwelle bleibt unverändert.

Die bereits entschiedene Paketfreigabe wird nicht erneut zur Wahl gestellt: geschlossen bis zu Lukes' gesonderter Öffnung nach gemeinsamem Review und fertigen Voraussetzungen. Für den tatsächlichen Klassenbetrieb muss feststehen, welches Teamkonto die Meldungen prüft; dafür keine Person oder Rolle automatisch ernennen.

### Abnahmefälle und Übergabe an Claude

Nach dokumentierter Freigabe dieser Version und des Technik-Plans umsetzen; G03–G05 aus dem Spec-05-Review zuerst beziehungsweise zusammen mit der passenden Versandtechnik beheben. In `uebergabe.md` konkreten Commit, Änderungen, Tests und verbleibende Grenzen an ChatGPT zurückgeben. `entscheidungen.md` bleibt Lukes vorbehalten.

Mindestens prüfen:

- Alle sechs Gründe, Pflichtfeld, 500/501 Codepunkte einschließlich Emojis, kein stilles Kürzen; eigenes und fremdes Ziel; nie beide Ziel-IDs gleichzeitig.
- Doppelklick, vorhandene Meldung, verlorene Antwort nach tatsächlichem Commit, leerer Status bei noch laufendem Original, Spam-Bremse auch beim Wiederholen; kein falscher Fehlschlag, kein zweites Meldeobjekt.
- Drei verschiedene Konten blenden aus; wiederholtes eigenes Melden zählt nicht zusätzlich; zwei bleiben sichtbar. Reale SQL-Regelprüfung mit danach bereinigten Testdaten statt ausschließlich Mock.
- Meldende sehen nur eigene Meldung; Autor:innen keine fremden Hinweise; ohne Profil, `mentor`, normales Konto und Team ohne Paketfreigabe kein Moderationszugriff, auch per direkter API und Direktlink.
- Team kann ausgeblendeten Inhalt samt Datei nach aktueller Prüfung lesen; normale Leser können beim nächsten Abruf nicht; eigene bekannte Dateizugriffsgrenze ehrlich beibehalten.
- Alle vier Entscheidungen; nicht vorhandenes Ziel; veränderte Sichtbarkeit; neue Meldung zwischen Öffnen und Speichern; zwei Teamentscheidungen gleichzeitig; kein Abschluss ungesehener Meldungen.
- Beste Antwort manuell/automatisch ausblenden: Markierung und gelöst zurücksetzen; Wiedereinblenden stellt die Lösung nicht automatisch wieder her. Beitrag ausblenden: Antworten/Datei nicht öffentlich nachladbar.
- Viele Fälle über mehrere Seiten, stabile Reihenfolge bei identischen Zeiten, vollständiger Prüfumfang; Wiederauffinden ausgeblendeter Inhalte ohne offene Meldung.
- Konto-/Rollenwechsel und Abmeldung während Lesen, Upload/Dateiabruf oder Entscheiden; keine späten fremden Daten/Erfolge. Offline vor/während Versand; kein Hintergrundversand.
- Bestätigte Entscheidung mit anschließendem Ladefehler; unklarer Rückweg; nur gewünschte Zustände setzen, kein versehentliches Umschalten.
- 320 px, 200 % Text, Tastatur, Dialog/Escape/Fokus, echte Bildschirmtastatur, Screenreader und axe. Echte und simulierte Fälle getrennt berichten.

Die Spec schließt keine bestehenden Mailversand-, Datenschutz- oder Geräte-Abnahmelücken. Die Freigabe von Spec und Technik ist kein Öffnen der Klassen-Beta.
