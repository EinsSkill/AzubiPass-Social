# 06 · Melden und Moderation

> Status: SPEC · Version: 2 · Stand: 2026-10-14 · Autor: ChatGPT
>
> Überarbeiteter Entwurf nach fünf Fragerunden mit Lukes; die Einzelentscheidungen unten sind im Chat getroffen. Die vollständige Spec und der konkrete Technikplan bleiben vor Umsetzung zu prüfen. Zuletzt selbst geprüfte technische Grundlage: `community-zugang` @ `237a62a`, Specs 00–05, Community-Regeln, Entscheidungen, tatsächliche Datenschicht und SQL. Kein Merge, Deployment oder Öffnen der Beiträge freigegeben. Die technischen Änderungswünsche unten brauchen vor dem Einspielen einen konkreten Plan.

## Teamvertrag und Entscheidungen aus der Fragerunde

Vorheriger Beitrag: Claude – Umsetzung Spec 05; ChatGPT – Review G03–G05 und Spec 06 v1; Lukes – Produktentscheidungen am 14.10.2026. Rolle ChatGPT: Spezifikation, kein Anwendungscode. Rückgabe: Lukes prüft die Gesamtfassung, danach Claude konkretisiert den Technikplan und setzt erst den freigegebenen Umfang um.

Diese v2 ersetzt v1 als aktuellen Entwurf. Claudes laufende Änderungen wurden dafür nicht neu auditiert. Vor dem Technikplan muss Claude den aktuellen Branch, Status, oberste Übergabe und Unterschiede zur Grundlage `237a62a6b508d69d4bab6c2c1c5341274fd2ff2f` prüfen. Der frühere Reviewbericht und sein ZIP bleiben historische Prüfbelege; die darin enthaltene v1 ist nicht die aktuelle Spec. `entscheidungen.md` bleibt Lukes vorbehalten.

| Nr. | Von Lukes im Chat entschieden |
|---|---|
| D01 | Zunächst moderiert Lukes allein. |
| D02 | Ein einfacher fachlicher Fehler bleibt sichtbar und wird korrigiert. |
| D03 | Die Korrektur erscheint als gekennzeichnete Teamantwort unter dem Beitrag. |
| D04 | Intern wird festgehalten, wer wann und warum entschieden hat. |
| D05 | Die betroffene Person sieht die Ausblendung mit kurzer verständlicher Begründung. |
| D06 | Direkt am ausgeblendeten Inhalt ist eine einmalige erneute Prüfanfrage möglich. |
| D07 | Autor:innen sehen den eigenen ausgeblendeten Text und die eigene Datei samt Begründung weiter. |
| D08 | Eine kurze Begründung der Prüfanfrage ist Pflicht. |
| D09 | Eine Prüfanfrage ist einmal pro Ausblendungsentscheidung erlaubt. |
| D10 | Hinweis mit Anzahl direkt in der App; keine E-Mailbenachrichtigung. |
| D11 | Potentiell schädliche Inhalte zuerst, danach die ältesten Fälle derselben Dringlichkeit. |
| D12 | Meldende sehen den Status Offen oder Abgeschlossen. |
| D13 | Lukes kann direkt am Beitrag oder an der Antwort ausblenden, auch ohne Meldung. |
| D14 | Ausblendungsbegründungen nutzen auswählbare, anpassbare Vorlagen. |

Weitere Routen, Prioritätszuordnung, Textgrenzen und konkrete Vorlagentexte sind Vorschläge von ChatGPT zur Umsetzung dieser Entscheidungen; sie wurden nicht einzeln von Lukes ausgewählt. Die neuen Datenanforderungen sind in Abschnitt 7 ausgewiesen.

## 1. Zweck

Azubis melden einen problematischen Beitrag oder eine Antwort verständlich und ohne doppelte Meldung; das Team prüft den betroffenen Inhalt und entscheidet nachvollziehbar über seine Sichtbarkeit.

Dieses Paket ergänzt C05 um C13 „Inhalt melden“ und C15 um C14 „Moderation“. Enthalten sind sechs vorhandene Meldegründe, optionaler Hinweis, Meldestatus, offene Fälle, reversible Aus-/Einblendung mit Begründung, Teamkorrekturen, Entscheidungsprotokoll, eigene ausgeblendete Inhalte, Prüfanfragen und ein Hinweiszähler in der App. Die drei Beiträge-Pakete werden erst gemeinsam nach Lukes' gesonderter Freigabe für die Klasse geöffnet.

Nicht Teil dieses Pakets: Löschung fremder Inhalte/Dateien, Sperren von Konten, Rollenvergabe, Gruppenoberflächen, private Nachrichten, Meldungen über Profile, automatische fachliche Bewertung, E-Mail-/Pushversand und ein weitergehendes Beschwerdeportal. Die einmalige Prüfanfrage in dieser Spec ist enthalten. Die bestehenden acht Community-Regeln bleiben unverändert.

## 2. Einstieg

- In C05 nach dem Beitragstext und gegebenenfalls der Datei: „Beitrag melden“ als zurückhaltende Textaktion mit mindestens 44 × 44 px Fläche.
- An jeder aktuell sichtbaren Antwort nach Autor/Datum: „Antwort melden“. Zugänglicher Name ergänzt „von {Anzeigename}“; keine identischen ununterscheidbaren Knöpfe.
- Die Aktion öffnet C13 als modalen Dialog in derselben Ansicht. Der Kontext bleibt erhalten, der Inhalt wird nicht in einen ungeschützten Route-Parameter kopiert. Kein neuer Direktweg für Meldedialoge nötig.
- Vorschlag: eigene Inhalte ebenfalls melden erlauben, entsprechend den bestehenden Rechten. Eigene Löschung wird damit nicht vorweggenommen.
- Berechtigte Teamkonten erhalten direkt am Beitrag und an jeder Antwort „Inhalt ausblenden“, auch ohne vorhandene Meldung. Dies öffnet denselben Entscheidungsdialog wie C14; keine Selbstmeldung als Umweg.
- Community-Übersicht und Profil zeigen „Moderation · {n} offene Fälle“ ausschließlich nach aktueller Prüfung auf `rolle = team` und aktive Paketfreigabe. Neuer Unterweg `#community/moderation`.
- Ein Direktlink durchläuft Sitzung, Profil, Paketfreigabe und zusätzliche Teamprüfung. Unberechtigte erhalten einen neutralen Rückweg ohne Meldungszahlen, Inhalte oder Namen. `mentor` ist keine Moderationsrolle; eine Teamrolle allein umgeht die geschlossene Paketfreigabe nicht.

- Profil ergänzt „Meine Meldungen“ und „Eigene ausgeblendete Inhalte“. Vorgeschlagene Wege: `#community/meine-meldungen`, `#community/eigene-ausblendungen`, `#community/eigener-inhalt/<art>/<id>`. Jede Route prüft Sitzung, Profil, Paketfreigabe und benötigte Autorschaft. Bei Beitragsdirektlinks erhalten Autor:innen dieselben Informationen zum eigenen ausgeblendeten Inhalt.
- Der Hinweiszähler zählt verschiedene Zielinhalte mit offenen Meldungen oder offener Prüfanfrage. Mehrere Meldungen und eine Prüfanfrage zum selben Ziel ergeben einen Fall. Während Ladefehlern keine 0 erfinden. Aktualisierung beim Öffnen, nach Aktionen, Wiederverbindung und bestehender Rückkehrprüfung aus dem Hintergrund. Keine sofortige Benachrichtigung versprechen; kein neuer Moderationsfeed auf Heute.
- Zunächst moderiert Lukes allein. Die tatsächliche Konto-ID und administrativ gesetzte Teamrolle müssen vor Nutzung abgeglichen werden. Diese Spec vergibt keine Rolle automatisch.

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
2. Drei lokale Bereiche: „Offene Fälle“, „Ausgeblendete Inhalte“ und „Protokoll“, semantisch als lokale Navigation. Offene Fälle enthalten Meldungen und Prüfanfragen, mit Filtern „Alle“, „Meldungen“, „Prüfanfragen“. Keine zusätzliche globale Tab-Leiste und keine Dashboard-Kacheln.
3. Offene Fälle als ruhige Liste **nach betroffenem Inhalt gebündelt**, nicht eine Karte je melderbezogener Zeile. Potentiell schädliche Inhalte zuerst; innerhalb derselben Dringlichkeit ältester offener Vorgang zuerst, dann Art und Inhalts-ID. Vorgeschlagene objektive Sortierung: gemeldeter Grund Persönliche Daten oder Beleidigung → hohe Stufe; übrige Gründe → normale Stufe. Bei mehreren Meldungen höchste Stufe verwenden. Prüfanfragen übernehmen die Stufe des zugehörigen Ausblendungsfalls. Dies bewertet die Dringlichkeit nach gemeldeter Kategorie, nicht die Wahrheit eines Vorwurfs; keine KI-Klassifizierung hinzufügen. Zu jedem Fall: Beitrag/Antwort, vorhandener Titel oder Antwortkontext, Zustand „Sichtbar“/„Ausgeblendet“, Anzahl offener Meldungen, Datum des ältesten offenen Vorgangs und gegebenenfalls Kennzeichnung „Prüfanfrage“; „Prüfen“ öffnet die Prüfung im Moderationsbereich.
4. Ausgeblendete Inhalte: Beiträge und Antworten ohne erforderliche offene Meldung, damit das Team eine abgeschlossene Ausblendung wieder rückgängig machen kann. Sortierung nach der neu protokollierten Ausblendungszeit und ID; bei Altinhalten ohne protokollierte Zeit die vorhandene Erstellungszeit ausdrücklich als solche verwenden, keine Ausblendungshistorie erfinden. Bei Antworten zu einem ausgeblendeten Beitrag steht „Der zugehörige Beitrag ist ausgeblendet.“ Das Einblenden der Antwort öffnet den übergeordneten Beitrag nicht.
5. Nachladen über „Weitere Fälle laden“ / „Weitere Inhalte laden“, stabile Seitennavigation. Hinweiszähler, Prioritäten und Bündelung müssen über den gesamten berechtigten Datenbestand stimmen, nicht nur die ersten geladenen Zeilen. Kein stilles Limit von 120 Fällen. Ein gebündelter Fall darf keine ausgeblendeten zusätzlichen Meldungen wegen eines Abfragelimits unterschlagen; alle zugehörigen offenen Meldungen und Prüfanfragen beim Prüfen laden.
6. Protokoll: Entscheidungsart, Zielreferenz, tatsächlich handelnde Person oder Automatismus, serverseitiger Zeitpunkt und Begründung. Nur Teamzugriff. Protokollierung beginnt mit ihrer Einführung; frühere unbekannte Entscheidungen nicht nachträglich erfinden.

### Einen Fall prüfen

1. „Zurück zur Moderation“, Überschrift „Inhalt prüfen“, tatsächlicher Titel und Autor/Rolle/Datum. Bei einer Antwort zusätzlich berechtigter Beitragstitel und Link zum Moderationskontext des Beitrags.
2. Aktueller Inhalt als Klartext mit Umbrüchen und Zuordnung aus dem Katalog. Kein Bearbeitungsformular für fremden Text. Eine inzwischen bearbeitete Beitragsfassung kann vom gemeldeten Stand abweichen; es gibt derzeit keinen Meldungs-Snapshot. Das nicht als historische Originalfassung ausgeben.
3. Datei nicht sofort laden. „Datei prüfen“ lädt sie nach aktueller Team-/Paket-/Speicherprüfung; danach vorhandene Bild-/PDF-Aktionen. Keine automatische Ausführung eingebetteter Dokumentinhalte, kein neuer signierter Link und keine dauerhafte Offline-Ablage. Auch der Falltitel und der Hinweis bleiben ohne Dateizugriff lesbar.
4. Meldungen: Grund, Hinweis, Datum; Prüfanfragen: Pflichtbegründung, Zeitpunkt und zugehörige Ausblendungsentscheidung; Melder-ID oder Name wird in der Oberfläche nicht gezeigt. Das bestehende Datenmodell speichert `melder_id` und die Teamrechte erlauben den Zugriff; eine serverseitige Anonymität ist damit **nicht** gegeben und wird nicht versprochen. Die betroffene Autor:in und andere normale Konten sehen keine fremden Meldungen/Hinweise.
5. Aktionsbereich je aktuellem Zustand. Jede manuelle Entscheidung bekommt eine nichtleere interne Begründung, vorgeschlagene Grenze 1–500 Codepunkte nach Trimmen. Bei Ausblendung beziehungsweise Abschluss einer Prüfanfrage wird eine geeignete kurze Erklärung auch der betroffenen Autor:in angezeigt. Melderidentitäten und persönliche Daten anderer gehören nicht in diese Erklärung. Die sachliche Erklärung kann zugleich die interne Begründung sein. Nicht allgemein veröffentlichen.
6. Der direkte Weg ohne Meldung verwendet dieselbe aktuelle Zielprüfung und Protokollierung; keine Meldungszeilen erfinden.

Aktionsmatrix:

| Zustand | Aktion | Bestätigtes Ergebnis |
|---|---|---|
| Sichtbar, einfacher fachlicher Fehler | „Fachliche Korrektur ergänzen“ | Teamantwort veröffentlicht; Inhalt bleibt sichtbar; geprüfte Meldungen abgeschlossen |
| Sichtbar, Regelverstoß, auch ohne Meldung | „Inhalt ausblenden“ | Inhalt verborgen; Autorbegründung und interne Entscheidung gespeichert; geprüfte Meldungen abgeschlossen |
| Sichtbar, offene Meldungen | „Meldungen abschließen“ | Sichtbarkeit unverändert; die tatsächlich geprüften Meldungen abgeschlossen |
| Ausgeblendet, offene Meldungen | „Weiter ausgeblendet lassen“ | Inhalt bleibt verborgen; die tatsächlich geprüften Meldungen abgeschlossen |
| Ausgeblendet | „Wieder einblenden“ | Inhalt sichtbar, soweit der übergeordnete Beitrag zugänglich ist; geprüfte offene Meldungen abgeschlossen |
| Offene Prüfanfrage | „Ausblendung aufheben“ / „Ausblendung bestätigen“ | Gewünschte Sichtbarkeit, begründetes Ergebnis, Prüfanfrage abgeschlossen und Entscheidung protokolliert |

Für Ein-/Ausblenden eine kurze Rückfrage mit dem beabsichtigten Ergebnis: „Diesen Inhalt ausblenden?“ / „Diesen Inhalt wieder einblenden?“ Hauptaktion gleichnamig, Nebenaktion „Abbrechen“. „Weiter ausgeblendet lassen“ und „Meldungen abschließen“ erklären vor Auslösung, dass die geprüften Meldungen abgeschlossen werden. Kein pauschaler Knopf „Erledigt“, der die Sichtbarkeit unbemerkt ändert.

Nach bestätigter Entscheidung zur frisch geladenen Liste zurückkehren, Erfolg ankündigen und Fokus sinnvoll zum nächsten Fall oder zur Abschnittsüberschrift führen. Bei fehlerhaftem Nachladen bleibt die Entscheidung als bestätigt stehen; Wiederholung lädt nur die Liste.

### Teamkorrektur

„Fachliche Korrektur ergänzen“ nutzt ein Antwortfeld mit 1–2000 Codepunkten nach Trimmen und der sichtbaren Kennzeichnung „Team · Fachliche Korrektur“. Fremder Originaltext wird nicht geändert. Die Kennzeichnung entsteht durch einen serverseitig berechtigten Teamvorgang; normale Nutzende können sie nicht selbst setzen. Sie bleibt als Kennzeichnung des damaligen Vorgangs erkennbar, auch wenn später eine Rolle geändert wird.

Teamantwort, zugehörige Antwort-ID im Entscheidungsprotokoll und Abschluss tatsächlich geprüfter Meldungen müssen konsistent gespeichert werden. Kein Abschluss vor bestätigter Veröffentlichung und keine zweite Korrektur bei Wiederholung. Kein automatisches Setzen als beste Antwort oder amtliche Qualitätsbestätigung. Die Antwort erscheint normal unter dem Beitrag; bei Fragen bleibt eine vorhandene beste Antwort nach bisheriger Regel zuerst. Bei einem Fehler in einer einzelnen Antwort beschreibt die Teamkorrektur im bestehenden Antwortbereich die betreffende Stelle; kein Antwort-auf-Antwort-System hinzufügen.

### Vorlagen für Ausblendungsbegründungen

Kategorie auswählen, Vorlage in das editierbare Pflichtfeld „Begründung“ übernehmen, Vorschau „Das sieht die betroffene Person“. Grenze als Vorschlag: 1–500 Codepunkte. Ein Vorlagenwechsel nach eigener Bearbeitung überschreibt Text nur nach Rückfrage. Meldungshinweise werden nicht automatisch kopiert. Keine persönlichen Daten erneut in Begründungen veröffentlichen.

| Kategorie | Vorlagentext als Entwurf |
|---|---|
| Beleidigung | Dein Inhalt wurde ausgeblendet, weil er andere Personen beleidigt oder herabsetzt. Bitte bleib bei sachlicher und respektvoller Kritik. |
| Persönliche Daten | Dein Inhalt wurde ausgeblendet, weil er persönliche oder vertrauliche Daten anderer enthält. Solche Daten gehören nicht in die Community. |
| Urheberrecht | Dein Inhalt wurde ausgeblendet, weil Zweifel bestehen, ob du ihn hier teilen darfst. Bitte teile nur Inhalte, für die du die nötigen Rechte hast. |
| Spam | Dein Inhalt wurde ausgeblendet, weil er Werbung, Spam oder wiederholt denselben Inhalt enthält. Beiträge sollen beim Lernen und in der Ausbildung helfen. |
| Fachlich falsch | Dein Inhalt wurde ausgeblendet, weil die fachliche Aussage in diesem Fall besonders irreführend ist. Die konkrete problematische Stelle erläutere ich hier: … |
| Sonstiges | Kein fertiger Vorwurf; Hilfetext „Beschreibe kurz, weshalb dieser Inhalt ausgeblendet wird.“ |

Die Fachlich-falsch-Vorlage ist für begründete Ausnahmefälle, nicht die normale Reaktion auf einen einfachen Fehler. D02/D03 gelten: sichtbar lassen, Teamkorrektur ergänzen. Die Vorlagen ändern weder die Community-Regeln noch die automatische Ausblendungsschwelle.

### Eigene ausgeblendete Inhalte

Autor:innen können eigenen Text, eigene Datei, Ausblendungszustand und kurze Begründung weiterhin sehen; Zeitpunkt nur soweit wirklich bekannt. Keine fremden Meldungen und keine Meldernamen anzeigen. Die Autor:in einer Antwort unter einem fremden ausgeblendeten Beitrag erhält nur die eigene Antwort und deren eigene Entscheidung, keine Inhalte/Dateien des fremden Elternbeitrags oder andere Antworten. Dafür nötige eng begrenzte serverseitige Rechte ausdrücklich planen; die bestehenden Antwortrechte setzen aktuell einen lesbaren Elternbeitrag voraus.

Für eine noch automatische Ausblendung: „Dieser Inhalt wurde nach mehreren Meldungen vorläufig ausgeblendet. Das Team hat noch nicht entschieden.“ Keine persönliche Entscheidung von Lukes erfinden. Die bestehende Drei-Personen-Schwelle gilt weiter für alle vorhandenen Gründe; auch eine fachliche Meldung kann zunächst zur vorläufigen Ausblendung führen. Ein einfacher Fehler wird nach der Prüfung wieder sichtbar und durch eine Teamkorrektur ergänzt.

### Erneute Prüfung anfragen

Direkt am eigenen ausgeblendeten Inhalt „Erneute Prüfung anfragen“. Dialogüberschrift „Warum soll die Ausblendung erneut geprüft werden?“, Pflichtfeld „Begründung“, vorgeschlagene Grenze 1–500 Codepunkte nach Trimmen, keine Anhänge. Zugang nur für die tatsächlich betroffene Autor:in zur aktiven Ausblendungsentscheidung.

Nach bestätigtem Versand „Deine Prüfanfrage wurde gesendet.“ und „Prüfanfrage offen“. Kein zweiter Versand in anderem Tab, per direkter API oder nach verlorener Bestätigung. Die Einmaligkeit gilt serverseitig pro betroffener Person und aktiver Ausblendungsentscheidung, nicht nur durch einen gesperrten Button.

Konkretisierung von D09 zur Prüfung der Gesamtfassung: Die aktive Ausblendung hat eine stabile Entscheidungsreferenz. Beibehalten derselben Ausblendung, Ablehnen der Prüfanfrage, Korrigieren der Erklärung oder Wiederholen desselben Vorgangs erzeugt kein neues Anfragerecht. Nach tatsächlichem Wiedereinblenden und einer späteren neuen Ausblendung gibt es eine neue Entscheidung und erneut eine Prüfanfrage. Automatische Ausblendung und ihre erstmalige Teamprüfung müssen dieselbe aktive Ausblendung zuordnen; Claude beschreibt diese Zuordnung im Plan. Keine Schleife durch fortlaufend neue IDs bei „weiter ausgeblendet lassen“.

Lukes entscheidet „Ausblendung aufheben“ oder „Ausblendung bestätigen“, mit kurzer begründeter Rückmeldung. Danach „Prüfanfrage abgeschlossen“; bei Bestätigung bleibt das Anfragerecht für diese Entscheidung verbraucht. Nach Aufhebung ist der normale zulässige Inhalt wieder erreichbar; das Ergebnis bleibt in einer eigenen bisherigen Prüfanfrage beziehungsweise im eigenen Entscheidungsbereich auffindbar, auch wenn der Inhalt nicht mehr auf der Liste ausgeblendeter Inhalte steht. Kein weiterer automatischer Eskalationsweg oder Bearbeitungstermin zugesagt.

### Meine Meldungen

Eigene Meldungen mit Datum, Grund und Status „Offen“/„Abgeschlossen“. `status = erledigt` erhält die Beschriftung „Abgeschlossen“. Keine zusätzliche Zwischenstufe oder persönliche Entscheidungsbegründung für Meldende vorsehen. Keine fremden Meldungen zeigen.

Titel und Zielverweis nur solange aktuell lesbar. Bei entzogenem Leserecht bleiben eigene Meldung und Status im erlaubten Umfang, mit neutralem „Gemeldeter Inhalt“ statt alter fremder Metadaten. Die autorseitige Ausblendungsbegründung ist für die betroffene Autor:in, nicht eine allgemeine Rückmeldung an jede meldende Person. Keine Frist versprechen.

## 4. Aktionen und Sicherheitsgrenzen

| Aktion | Wer darf | Verhalten |
|---|---|---|
| Melden | Sitzung, Profil, Paketfreigabe und aktuell lesbarer Zielinhalt | Eine Meldung pro Konto und Inhalt, entsprechend vorhandenen eindeutigen Indizes |
| Meldestatus prüfen | Dasselbe Konto | Eigene vorhandene Meldung zum exakten Ziel prüfen; keine neue Meldung senden |
| Moderation laden | Aktuell `team`, Profil und Paketfreigabe | Nur der berechtigte Moderationsumfang; zunächst allgemeine Beiträge und deren Antworten |
| Datei prüfen | Aktuell berechtigtes Teamkonto | Angemeldeter frischer Abruf, Blob beim Verlassen/Offline/Kontowechsel freigeben |
| Sichtbarkeit setzen | Team und aktive Paketfreigabe | Gewünschten Zustand explizit setzen, nicht umschalten; fehlendes Ziel ist kein Erfolg |
| Geprüfte Meldungen abschließen | Team und aktive Paketfreigabe | Ausschließlich bestätigten Prüfumfang in einer konsistenten Entscheidung abschließen |
| Teamkorrektur | Aktuelles Teamkonto und Paketfreigabe | Eindeutig gekennzeichnete Antwort, Protokoll und Abschluss geprüfter Meldungen konsistent |
| Prüfanfrage senden | Autor:in des eigenen ausgeblendeten Inhalts | Einmal zur aktiven Entscheidung, mit Pflichtbegründung |
| Prüfanfrage abschließen | Team und Paketfreigabe | Aufheben oder bestätigen, verständliche Erklärung und Protokoll |
| Eigene Ausblendung ansehen | Betroffene Autor:in und Paketfreigabe | Nur eigener Text/Datei und autorseitige Entscheidung, keine fremden Inhalte |
| Abbrechen | Berechtigter Dialogkontext | Ungesendeten Hinweis/gewählten Grund nur nach Rückfrage verwerfen; laufender oder unklarer Vorgang wird nicht als abgebrochen behauptet |

**Verlässliches Senden:** Beim Absenden einen unveränderlichen Versandstand festhalten; währenddessen Eingaben sperren. Meldung ist anhand Konto und genau eines Zieles eindeutig. Ein Duplikatfehler darf nicht blind als neue Ablehnung ausgegeben werden: vorhandene eigene Meldung abgleichen. Verlorene Bestätigung bleibt unklar. Ein leerer Statusabruf ist kein endgültiger Fehlschlag. Eine erlaubte Wiederholung desselben Vorgangs sendet denselben Grund/Hinweis und kann aufgrund der eindeutigen Indizes keine zweite Meldung erzeugen. Vor dem Umgang mit Duplikaten und der realen Spam-Bremse serverseitig das konkrete Verhalten prüfen: Ein Trigger kann vor der Eindeutigkeitsprüfung abbrechen.

Alle asynchronen Lese- und Schreibvorgänge sind an Konto und Generation gebunden, auch vor dem nächsten Schreibschritt. Rollenentzug, Kontowechsel, Abmeldung und geschlossene Paketfreigabe entfernen den Moderationsinhalt. Ein späterer alter Erfolg verändert die Ansicht des neuen Kontos nicht.

**Neue Meldungen während einer Entscheidung:** Das Team darf nicht unbemerkt Meldungen abschließen, die erst nach dem Öffnen des Falls eingegangen sind. Claude plant eine transaktionale Prüfung der tatsächlich gesehenen Meldungs-IDs und des aktuellen Zielzustands. Hat sich der Prüfumfang geändert, Entscheidung nicht als erledigt behaupten: „Der Fall hat sich geändert. Prüfe die aktuellen Meldungen erneut.“ Keine neue Meldung durch ein pauschales UPDATE aller offenen Meldungen verlieren. Dasselbe gilt für ungeprüfte neue Prüfanfragen. Sichtbarkeit, autorseitige Erklärung, interne Protokollierung und Abschluss geprüfter Vorgänge müssen als konsistente Entscheidung gespeichert werden. Leeres UPDATE oder verschwundenes Ziel ist kein Erfolg. Zwei parallele Entscheidungen dürfen sich nicht unbemerkt überschreiben.

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

### Zusätzliche Zustände aus den Chatentscheidungen

| Situation | Vorgeschlagener Text |
|---|---|
| Eigene Meldestatus | Offen / Abgeschlossen |
| Eigene Meldungen leer | Du hast noch keine Inhalte gemeldet. |
| Eigene Ausblendungen leer | Es gibt keine ausgeblendeten eigenen Inhalte. |
| Pflichtbegründung fehlt | Gib eine kurze Begründung ein. |
| Begründung zu lang | Die Begründung darf höchstens 500 Zeichen lang sein. |
| Prüfanfrage sendet | Prüfanfrage wird gesendet … |
| Prüfanfrage bestätigt | Deine Prüfanfrage wurde gesendet. |
| Prüfanfragestatus | Prüfanfrage offen / Prüfanfrage abgeschlossen |
| Bereits angefragt | Du hast für diese Ausblendung bereits eine Prüfung angefragt. |
| Prüfanfrage unklar | Wir konnten nicht prüfen, ob deine Prüfanfrage gesendet wurde. Prüfe den Status, bevor du erneut sendest. |
| Noch kein Treffer | Die Prüfanfrage wurde noch nicht gefunden. Der Ausgang ist weiterhin unklar. |
| Prüfanfrage sicher abgelehnt | Deine Prüfanfrage wurde nicht gesendet. Deine Eingaben sind noch da. |
| Prüfergebnis | Die Ausblendung wurde aufgehoben. / Die Ausblendung wurde nach erneuter Prüfung bestätigt. |
| Korrektur bestätigt | Die Teamkorrektur wurde veröffentlicht. |
| Keine offenen Fälle | Es gibt keine offenen Fälle. |
| Leeres Protokoll | Es wurden noch keine Entscheidungen protokolliert. |
| Zählerfehler | Der Moderationsstatus konnte nicht geladen werden. |

G03–G05 gelten auch für diese Vorgänge: unveränderlicher Versandstand, ehrlicher unklarer Ausgang, sichere Wiederholung mit gleichem Vorgang, kein doppelter Protokolleintrag/Prüfantrag/Teamantwort und kein Umschalten durch Wiederholung. Für Teamkorrekturen und Prüfanfragen dasselbe Muster aus Laden, bestätigtem Erfolg, sicherer Ablehnung und unklarem Ergebnis textlich verwenden. Fehlgeschlagenes Nachladen nach bestätigtem Erfolg bietet nur eine Lese-Wiederholung.

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
| Bereiche | Offene Fälle / Ausgeblendete Inhalte / Protokoll |
| Fallfilter | Alle / Meldungen / Prüfanfragen |
| Eigene Wege | Meine Meldungen / Eigene ausgeblendete Inhalte |
| Zähler | Moderation · {n} offene Fälle; bei 1 „Moderation · 1 offener Fall“ |
| Korrektur | Fachliche Korrektur ergänzen / Team · Fachliche Korrektur |
| Autorvorschau | Das sieht die betroffene Person |
| Begründung | Begründung · Pflicht / Vorlage |
| Prüfanfrage | Erneute Prüfung anfragen / Prüfanfrage senden |
| Prüfentscheidung | Ausblendung aufheben / Ausblendung bestätigen |
| Prüfen | Prüfen / Inhalt prüfen |
| Zustände | Sichtbar / Ausgeblendet |
| Entscheidung | Inhalt ausblenden / Meldungen abschließen / Weiter ausgeblendet lassen / Wieder einblenden |
| Datei | Datei prüfen |
| Klärung | Status prüfen |

Die Texte in Abschnitt 5 sind ebenfalls verbindlich vorgeschlagene UI-Texte. Hinweise und Nutzerinhalte als Klartext darstellen. Kein öffentliches Urteil „fachlich geprüft“, keine E-Mail-/Pushnachricht an die Autor:in, keine Bearbeitungsfrist behaupten.

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

### Neue ausdrückliche Datenmodellanforderungen in Version 2

Die frühere Empfehlung aus v1, zunächst keine Protokoll-/Prüfanfragedaten einzuführen, ist durch D04–D09 ersetzt. Folgende fachliche Informationen sind erforderlich; die genannten Bezeichnungen sind Vorschläge, keine fertig gewählten SQL-Tabellen oder Migrationen:

| Neuer Bedarf | Benötigte Informationen und Vertrauensgrenze |
|---|---|
| Entscheidungsprotokoll | Entscheidung/Vorgang, Inhaltstyp und ID, Aktion, bestätigter vorheriger/nachheriger Zustand, handelndes Teamkonto oder Automatismus, serverseitige Zeit, interne Begründung; optional Korrektur-Antwort-ID und Referenz zur geprüften Anfrage |
| Aktive Ausblendung | Stabile Entscheidungsreferenz, Ziel, aktiver/aufgehobener Zustand, autorseitige kurze Begründung, Zeitpunkt und Bezug zur Protokollentscheidung; automatische vorläufige Ausblendung ausdrücklich unterscheiden |
| Prüfanfrage | ID/Vorgang, aktive Ausblendungsentscheidung, betroffene Autor:in, Pflichtbegründung, serverseitige Zeit, offen/abgeschlossen, Ergebnis und verständliche Ergebnisbegründung; serverseitige Eindeutigkeit pro Autor:in und Entscheidung |
| Teamkorrektur | Vorhandene Antwort plus eindeutige fachliche Kennzeichnung eines berechtigten Teamvorgangs; Referenz im Protokoll; nicht durch normale Konten fälschbar |
| Geprüfter Umfang | Belegbarer Abschluss genau der tatsächlich geprüften Meldungen/Prüfanfragen; Plan benennt die konsistente Zuordnung und Konkurrenzprüfung |

Das Protokoll wird serverseitig aus bestätigten Vorgängen geschrieben; normale Konten schreiben/ändern/löschen keine Protokolleinträge. Auch das Team soll frühere Entscheidungen nicht still überschreiben: Korrekturen als neue verknüpfte Ereignisse. Keine erfundenen Entscheider oder Zeiten bei automatischen/alten Ausblendungen. Autor:innen erhalten nur ihre eigene Erklärung und eigene Prüfanfrage, nicht das vollständige interne Protokoll oder fremde Meldungen. Wer Konto-ID, Rolle oder Zeit selbst in einer Nutzlast behauptet, bestimmt diese Werte nicht; der Server leitet sie aus Sitzung und eigenem Zeitpunkt ab.

Neue Ausblendung, Erklärung, Protokoll und geprüfte Abschlussmenge müssen konsistent bestätigt werden. Wiederholung darf keine zweite Entscheidung oder neues Anfragerecht erzeugen. Aufbewahrung, Verhalten bei Konto-/Inhaltslöschung und Umgang mit bestehenden Ausblendungen beschreibt Claude im Plan; keine beliebige Dauer oder vollständige historische Wiederherstellbarkeit als bereits entschieden ausgeben. Kein Inhalts-/Datei-Snapshot ist mit dieser Version verlangt. Eine während der Bearbeitung veränderte Fassung muss als aktueller Inhalt erkennbar bleiben.

Die private Eigenansicht einer Antwort bei unlesbarem Elternbeitrag braucht eng begrenzte neue Serverrechte oder eine dafür geprüfte RPC; vorhandene allgemeine Lesepolicies nicht pauschal öffnen. Dateizugriff bleibt angemeldet und aktuell geprüft. Protokoll, Zähler, Fallprioritäten und Prüfanfragen hängen serverseitig an Paketfreigabe und Rolle/Autorschaft.

Der Technikplan nennt außerdem sichere Signaturen für Meldestatus, eigene Ausblendungen/Prüfanfragen, Teamkorrektur, direkten Entscheidungsweg, Statusklärung nach unklarem Ausgang und Fall-/Zählerabfragen. Die Produktentscheidung zu einer Information ist kein Auftrag, eine bestimmte neue Tabelle ungeprüft anzulegen.

## 8. Barrierefreiheit und Gestaltung

- DESIGN/PRODUCT und C04/C05 fortführen: tiefgrüne App-Hülle, offene Listen mit feinen Linien, sparsame goldene Hauptaktion. Keine neue Formularwelt.
- Dialog mit benannter Überschrift, Fokusbindung, Escape und Fokus zurück zum richtigen Beitrag/Antwortknopf. Entfällt der Inhalt nach Ausblendung, Fokus auf den neutralen Hinweis oder den Rückweg.
- Radio-Gruppe mit Legende; Textfeld mit dauerhaftem Label, Hilfe, Zählung und Feldfehler per `aria-describedby`. Grenzen ankündigen, kein Live-Sprechen jedes Zeichens.
- Lokale Navigation, Zustand und Anzahl textlich benennen; alle Aktionen ≥ 44 × 44 px, klare sichtbare Fokusmarkierung, keine reine Farbkennzeichnung.
- Lange Titel, Hinweise und Dateinamen umbrechen; 320/390 px, Desktop, 200 % Textgröße und Bildschirmtastatur prüfen. Aktionen bleiben ohne verdeckende Fixleiste erreichbar.
- Versandergebnis und Entscheidung ankündigen, nicht den gesamten Fall erneut vorlesen. Nach Nachladen Fokus stabil halten.
- Reduzierte Bewegung beachten; keine animierte Dringlichkeit, keine öffentlichen Meldezähler als Motivation.
- Dateien können unzugänglich sein; Kontexttext bleibt nutzbar. Echte Screenreader-/Geräteprüfungen zusätzlich zum axe-Scan durchführen.

## 9. Gesamtprüfung und nächste Freigabe

Die 14 Entscheidungen aus der Fragerunde sind oben dokumentiert und werden nicht erneut abgefragt. Als Nächstes prüft Lukes diese vollständige v2 einschließlich ChatGPTs Konkretisierungen: Prioritätsregel, 500-Zeichen-Grenzen, Vorlagentexte, Eigenansichten und stabile aktive Ausblendungsreferenz. Sie wird danach als freigegebene Version im vorgesehenen Entscheidungsweg dokumentiert. Die Chatantworten sind keine Freigabe sämtlicher inzwischen ergänzter Details oder Datenbankmigrationen.

Claude erstellt auf seinem tatsächlichen aktuellen Stand den konkreten Technikplan mit neuen Daten, RPCs, Rechten, Transaktionen, Idempotenz, Altbestand und Tests. Einspielen folgt nach der dafür vorgesehenen Freigabe. Keine pauschale Rollenvergabe oder Auswahl eines Kontos allein aufgrund des Namens „Lukes“.

Die bereits entschiedene Paketsperre bleibt geschlossen. Kein Merge, Deployment, E-Mailversand oder Öffnen folgt automatisch aus dieser Spec.

### Abnahmefälle und Übergabe an Claude

Nach dokumentierter Freigabe dieser Version und des Technik-Plans umsetzen; G03–G05 aus dem Spec-05-Review zuerst beziehungsweise zusammen mit der passenden Versandtechnik beheben. In `uebergabe.md` konkreten Commit, Änderungen, Tests und verbleibende Grenzen an ChatGPT zurückgeben. `entscheidungen.md` bleibt Lukes vorbehalten.

Mindestens prüfen:

- Alle sechs Gründe, Pflichtfeld, 500/501 Codepunkte einschließlich Emojis, kein stilles Kürzen; eigenes und fremdes Ziel; nie beide Ziel-IDs gleichzeitig.
- Doppelklick, vorhandene Meldung, verlorene Antwort nach tatsächlichem Commit, leerer Status bei noch laufendem Original, Spam-Bremse auch beim Wiederholen; kein falscher Fehlschlag, kein zweites Meldeobjekt.
- Drei verschiedene Konten blenden aus; wiederholtes eigenes Melden zählt nicht zusätzlich; zwei bleiben sichtbar. Reale SQL-Regelprüfung mit danach bereinigten Testdaten statt ausschließlich Mock.
- Meldende sehen nur eigene Meldung; Autor:innen keine fremden Hinweise; ohne Profil, `mentor`, normales Konto und Team ohne Paketfreigabe kein Moderationszugriff, auch per direkter API und Direktlink.
- Team kann ausgeblendeten Inhalt samt Datei nach aktueller Prüfung lesen; normale Leser können beim nächsten Abruf nicht; eigene bekannte Dateizugriffsgrenze ehrlich beibehalten.
- Alle Entscheidungen der Aktionsmatrix; nicht vorhandenes Ziel; veränderte Sichtbarkeit; neue Meldung zwischen Öffnen und Speichern; zwei Teamentscheidungen gleichzeitig; kein Abschluss ungesehener Meldungen.
- Beste Antwort manuell/automatisch ausblenden: Markierung und gelöst zurücksetzen; Wiedereinblenden stellt die Lösung nicht automatisch wieder her. Beitrag ausblenden: Antworten/Datei nicht öffentlich nachladbar.
- Viele Fälle über mehrere Seiten, stabile Reihenfolge bei identischen Zeiten, vollständiger Prüfumfang; Wiederauffinden ausgeblendeter Inhalte ohne offene Meldung.
- Konto-/Rollenwechsel und Abmeldung während Lesen, Upload/Dateiabruf oder Entscheiden; keine späten fremden Daten/Erfolge. Offline vor/während Versand; kein Hintergrundversand.
- Bestätigte Entscheidung mit anschließendem Ladefehler; unklarer Rückweg; nur gewünschte Zustände setzen, kein versehentliches Umschalten.
- 320 px, 200 % Text, Tastatur, Dialog/Escape/Fokus, echte Bildschirmtastatur, Screenreader und axe. Echte und simulierte Fälle getrennt berichten.

### Zusätzliche Abnahme für Version 2

- Direkt ausblenden ohne vorhandene Meldung; identische Gründe-/Rechte-/Protokollprüfung wie in C14; kein künstliches Meldeobjekt.
- Jede manuelle Entscheidung mit korrektem serverseitigem Wer/Wann/Warum; automatische Ausblendung als Automatismus; Wiederholung kein zweites Ereignis. Alte Ereignisse nicht erfinden, unbefugte Protokolländerung ablehnen.
- Vorlagen auswählen/ergänzen, Pflicht und Codepunkte, Rückfrage vor Überschreiben eigener Begründung, Vorschau und keine Melderidentitäten in Autoransicht.
- Einfacher fachlicher Fehler: gekennzeichnete Teamantwort, Original sichtbar; Korrektur und Meldungsabschluss konsistent. Verlorene Bestätigung, Doppelklick und Wiederholung erzeugen keine zweite Antwort oder zweite Entscheidung. Normale Konten können die Teamkennzeichnung nicht setzen.
- Drei fachliche Meldungen → vorläufig ausgeblendet; Teamprüfung → Wiedereinblenden mit Korrektur. Keine heimliche Änderung der bekannten Schwelle.
- Autor:in liest eigenen verborgenen Text und eigene Datei; andere normale Konten nicht. Antwortautor:in unter verborgenem fremden Beitrag bekommt nur die eigene Antwort/Entscheidung, keine fremden Metadaten, Texte, Antworten oder Datei.
- Prüfanfrage Pflichtbegründung, 500/501 Codepunkte, nur eigene aktive Ausblendung, einmal serverseitig pro Entscheidung, konkurrierende Tabs und verlorene Bestätigung. Beibehalten/Ablehnen/Wiederholen erzeugt kein neues Anfragerecht. Nach tatsächlichem Wieder-Einblenden und neuer Ausblendung neuer Antrag möglich.
- Aufheben/Bestätigen mit verständlichem Ergebnis, Protokoll und konsistentem Antragsabschluss; Ergebnis für die Autor:in auch nach Wiedereinblenden noch auffindbar.
- Meldende sehen nur eigene Offen/Abgeschlossen-Zustände; entzogene Ziele neutral, keine alte Begründung/fremden Inhalte aus Cache. Kein persönliches Moderationsurteil für unberechtigte Meldende.
- Hinweiszähler zählt eindeutige offene Ziele mit Meldung/Prüfanfrage; tatsächlicher Wert bei vielen Seiten; Fehler nicht 0. Prioritäten Persönliche Daten/Beleidigung vor normalen Fällen, innerhalb der Stufe stabile älteste Reihenfolge, konkurrierende neue Meldungen und Rollenwechsel.
- Neue Eigen-/Protokoll-/Prüfanfrageansichten mit den bestehenden Mobil-, Tastatur-, Screenreader- und Offlinefällen prüfen. Echte und simulierte Tests getrennt berichten.

Die Spec schließt keine bestehenden Mailversand-, Datenschutz- oder Geräte-Abnahmelücken. Die Freigabe von Spec und Technik ist kein Öffnen der Klassen-Beta.
