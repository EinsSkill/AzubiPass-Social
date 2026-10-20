# 02 · Anmeldung und Profil anlegen

> Status: SPEC · Version: 3 · Stand: 2026-10-08 · Autor: ChatGPT

> **Teamvertrag**
> Vorheriger Beitrag: Claude – Mail-Link-Anmeldung, Beta-Profil und RLS/RPC-Grundlage in uebergabe.md vom 2026-10-08 beschrieben.
> Meine Rolle jetzt: Spec – Zugang, Formularführung, Zustände und wörtliche Texte; kein Code.
> Meine Grundlage: EinsSkill/AzubiPass-Social auf main; uebergabe.md, PRODUCT.md, DESIGN.md, 00-vorlage.md, entscheidungen.md und supabase/README.md; Übergabe-Commit 7733c6f6f98a050c3fcf7558f080d3c74614dd6a. Second Brain SCHEMA §7 und Business/AzubiPass.md gelesen.
> Nächste Übergabe an: Lukes zur Freigabe von Version 3 und den offenen Entscheidungen, danach Claude als alleiniger Umsetzer.


> **Freigabestand vom 2026-10-08:** Lukes hat Ich → Community, vier Haupttabs, den konkreten Heute-Abschnitt und die acht Community-Regeln ausdrücklich bestätigt. Der Regeltext steht in 03-community-regeln.md. Die übrige Bildschirmübersicht bleibt ein Plan für spätere Detail-Specs. Kein Merge oder Deployment freigegeben.
> **Aktueller Technikabgleich:** Neue Claude-Übergabe und quellen/community.js auf main gelesen; zugehöriger Commit 3386b94d42750531a75632621520ba1e199b1e31. Anmeldung unterstützt zusätzlich einen sechsstelligen E-Mail-Code. Claudes Testbericht wurde gelesen, nicht selbst ausgeführt. Diese Ergänzung ersetzt die ältere reine Mail-Link-Annahme.

## 1. Zweck

Man meldet sich ohne Passwort per E-Mail-Link oder E-Mail-Code an und legt mit einem gültigen Beta-Zugangscode ein Profil an, bevor Community-Inhalte zugänglich werden.

Eine einzige Strecke mit den Teilansichten A Anmeldung, B Mail versendet, C Link/Sitzung prüfen und D Profil anlegen. Bestehende Profile überspringen D. Kein künstlicher Fortschrittsbalken: Der Weg unterscheidet sich für neue und bestehende Nutzer.

## 2. Einstieg

- Von Lukes bestätigter Einstieg: Ich → Community; zusätzlich Heute → Gemeinsam lernen → Zur Community. Hauptnavigation bleibt verfügbar; kein Anmeldezwang für Lernen und Üben.
- Geschützter Community-Link ohne Sitzung → A; ursprüngliches app-internes Ziel vorübergehend merken und nach Erfolg auf Zugriff prüfen.
- Mail-Link → C. Sichere Rückleitungsziele nach vorhandener Auth-Konfiguration; keine beliebige externe Rückleitungsadresse übernehmen.
- Gültige Sitzung ohne Profil → D. Ein bereits angemeldetes Konto braucht keinen neuen Mail-Link.
- Gültige Sitzung mit Profil → zulässiges ursprüngliches Community-Ziel, sonst Beiträge. Kein erneuter Beta-Code, keine erneute Profilanlage.
- Ungültiger/abgelaufener Link → A mit verständlicher Meldung und Möglichkeit für einen neuen Link.
- Unterbrechung nach Anmeldung: Sitzung/Profilstatus neu prüfen, vorhandenes Profil nicht überschreiben. Bei Reload keinen gespeicherten Entwurf versprechen.

## 3. Aufbau von oben nach unten

### Gemeinsame Gestaltung

Bestehende tiefgrüne App-Hülle (#12301F), helle Schrift (#F5F5F0), offene Flächen und feine Linien. Seitentitel in Source Serif 4, Formulare/Hilfe in IBM Plex Sans, kurze Code-/Statusmetadaten bei Bedarf IBM Plex Mono. Primäraktion Gold nach bestehender Komponente; Fokus #E3C558. Keine neue helle Kartenwelt, keine Illustration, keine Emojis, kein Konfetti. Inhalt auf Desktop auf ungefähr 32 rem begrenzen; mobil verfügbare Breite mit vorhandenen Seitenabständen nutzen.

### A · Anmeldung

1. Kopf mit Zurück und Kontext Community.
2. Titel „In der Community anmelden“.
3. Erklärung „Stell Fragen, teile Lernzettel und lerne mit anderen. Zum Anmelden schicken wir dir einen Link per E-Mail.“
4. Dauerhaft sichtbares Label „E-Mail-Adresse“, leeres E-Mail-Feld; Autovervollständigung unterstützen.
5. Hilfe „Du brauchst kein Passwort. Halte deinen Beta-Zugangscode bereit, wenn du neu dabei bist.“
6. Primäraktion „Anmeldelink senden“.
7. Kurzer Link zur vorhandenen Datenschutzerklärung. Kein erfundenes Datenschutz-Einwilligungskästchen.
8. Sekundäraktion „Ohne Anmeldung weiterlernen“ → Lernen.

### B · Mail versendet – Link oder Code

1. Kopf und Titel „Schau in dein E-Mail-Postfach“.
2. Bestätigung mit der eben selbst eingegebenen Adresse als Text, nicht öffentliches Profildatum.
3. Hinweis auf Spam-Ordner und denselben Browser, sofern die vorhandene Auth-Konfiguration das verlangt; genaue Texte in Abschnitt 6.
4. Zusätzlich ein zusammenhängendes Feld „Anmeldecode aus der E-Mail“ und die Aktion „Mit Code anmelden“. Hilfe: „Du kannst auch den sechsstelligen Code aus derselben E-Mail hier eingeben. Das ist besonders praktisch in der installierten App.“ Genau sechs Ziffern prüfen; führende Nullen erhalten, Einfügen und Einmalcode-Autovervollständigung erlauben. Keine sechs getrennten Eingabefelder und kein automatisches Absenden nach der letzten Ziffer. Bestehende Funktion AP.community.codePruefen mit der zugehörigen E-Mail-Adresse verwenden; Erfolg führt durch C zur Profilprüfung.
5. „Link erneut senden“; während Anfrage deaktiviert. Ein Server-Warteintervall respektieren, keinen erfundenen Countdown anzeigen.
6. „E-Mail-Adresse ändern“ → A mit bisheriger Adresse bearbeitbar.
7. „Ohne Anmeldung weiterlernen“ → Lernen. Kein automatischer Sprung in irgendeine Mail-App.

### C · Link und Sitzung prüfen

1. Titel „Anmeldung wird geprüft …“, kurze zugängliche Statusmeldung.
2. Nach Auth-Erfolg Profilstatus prüfen. Erst danach geschützte Ansicht öffnen; keine kurz sichtbare Beitragsliste vor Profilprüfung.
3. Vorhandenes Profil → berechtigtes Ziel; fehlendes Profil → D.
4. Technischer Fehler beim Lesen eines Profils ist nicht gleich fehlendes Profil: Erneut versuchen anbieten, keine doppelte Profilanlage starten.
5. Wenn der Browserwechsel/Linkverbrauch vom vorhandenen Auth-Verfahren nicht unterstützt wird: verständlicher Rückweg zu A. Den bereits vorhandenen sechsstelligen E-Mail-Code als Rückfall anbieten; keine weitere Login-Methode oder Passwortfunktion ergänzen.

### D · Profil anlegen

1. Kopf mit Kontext Community und Titel „Dein Community-Profil“.
2. Erklärung „Wähle einen Namen, unter dem dich andere sehen. Dein Lehrjahr kannst du freiwillig angeben.“
3. „Beta-Zugangscode“ – Pflichtfeld. Kein öffentlich eingeblendeter Beispielcode und keine Zeichenlänge erfinden: Der 8-stellige Code der Übergabe gilt für Gruppen, nicht nachgewiesen für die Beta.
4. „Anzeigename“ – Pflichtfeld, 2–30 Zeichen, eindeutig. Hilfe zur Sichtbarkeit und Fehlermeldung bei Belegung.
5. „Lehrjahr (optional)“ – Auswahl „Keine Angabe“, „1. Lehrjahr“, „2. Lehrjahr“, „3. Lehrjahr“. Standard Keine Angabe; nicht aus dem lokalen Lernprofil vorausfüllen.
6. Nicht vorangekreuzte Pflichtbestätigung „Ich bin mindestens 16 Jahre alt.“
7. Nicht vorangekreuzte Pflichtbestätigung „Ich akzeptiere die Community-Regeln.“; separat erreichbarer Link „Community-Regeln lesen“ öffnet C17 mit Rückkehr ohne Eingabeverlust. Das Öffnen bestätigt nichts automatisch.
8. Hilfe „Deine E-Mail-Adresse und dein Beta-Zugangscode werden anderen Mitgliedern nicht angezeigt.“ Vor Auslieferung anhand der bestehenden Leserechte prüfen.
9. Primäraktion „Profil anlegen“. Während Anfrage „Profil wird angelegt …“ und Schutz vor doppeltem Absenden.
10. Sekundäraktion „Später weiterlernen“ → Lernen; Konto bleibt angemeldet, aber Community bleibt ohne Profil gesperrt.
11. Aktion „Abmelden“ für einen Kontowechsel; anschließend A, sensible Formularwerte verwerfen, lokale Lerndaten behalten.

Nach bestätigter Profilanlage Profil und Rechte erneut laden, eingegebenen Beta-Code aus dem Formular entfernen und ohne zusätzliche Begrüßungsseite das zulässige Ziel öffnen. Erfolg als kurze Statusmeldung „Dein Profil ist angelegt.“ anzeigen. Keine Newsletter-Anmeldung, kein Profilbild und keine Auswahl einer privilegierten Rolle hinzufügen.

## 4. Aktionen

| Aktion | Wer darf | Was passiert danach |
|---|---|---|
| Anmeldelink senden | Nicht angemeldete Person mit formal gültiger Adresse | Bestehender Auth-Versand; B erst nach Versandbestätigung; Antwort verrät nicht, ob bereits ein Konto existiert |
| Mit Code anmelden | Person auf B mit zugehöriger E-Mail und sechs Ziffern | Bestehende codePruefen-Funktion; C und Profilprüfung; niemals direkte Freigabe allein durch Eingabelänge |
| Link erneut senden | Person auf B, nach zulässigem Serverintervall | Neue Anfrage; Bestätigung oder konkrete Fehleransicht; kein automatisches Wiederholen |
| Adresse ändern | Person auf B | A, Fokus im E-Mail-Feld; alter Link wird nicht als sicher widerrufen behauptet |
| Mail-Link öffnen | Person mit Link | C; Sitzung verifizieren, danach Profilprüfung |
| Regeln lesen | Person in D oder im Community-Profil | Gültigen Text zeigen; beim Schließen Fokus am Link und Formular erhalten |
| Profil anlegen | Verifizierte Sitzung ohne Profil, gültige Eingaben und beide Bestätigungen | Bestehende Profil-RPC prüft Code, Name und Regeln; erst nach Erfolg Community-Zugang |
| Später weiterlernen | Alle | Lernen bleibt offline und ohne Profil nutzbar |
| Abmelden | Verifizierte Sitzung | Community-Daten und sensible Formulare schließen; lokaler Lernfortschritt bleibt erhalten |
| Geschütztes Ziel öffnen | Verifizierte Sitzung mit Profil und passenden Zielrechten | Ziel öffnen; andernfalls neutrale Nicht-verfügbar-Ansicht mit Zurück zu Beiträge |

Validierung beim Absenden, danach feldbezogen nach Korrektur. Kein Servercheck des Anzeigenamens bei jedem Tastendruck. Bei einem Fehler Fokus auf das erste fehlerhafte Feld; bei mehreren Fehlern zusätzlich kurze verlinkte Fehlerübersicht. Leere Felder durch Absenden erklären, statt den Hauptknopf ohne Begründung dauerhaft zu deaktivieren. Offline und laufende Anfrage sind erkennbare Ausnahmen.

## 5. Zustände

- **Leer:** A ohne vorgeschlagene persönliche Adresse. D ohne Anzeigename/Beta-Code, Lehrjahr Keine Angabe, beide Bestätigungen aus. Nach erfolgreichem Profil, aber noch leerer Community, gelten die Leerzustände aus Datei 01.
- **Lädt:** „Anmeldelink wird gesendet …“, „Anmeldung wird geprüft …“, „Profil wird geladen …“ und „Profil wird angelegt …“ passend zur Operation. Keine erfundenen Prozentanzeigen. Keine zweite identische Schreibanfrage zulassen.
- **Fehler:** Wortlaut nach Tabelle unten. Erfolgreiche Eingaben im geöffneten Formular erhalten. Beta-Code nicht protokollieren oder in Fehlermeldungen zurückgeben. Rohfehler/RPC-Namen bleiben außerhalb der Nutzeroberfläche.
- **Offline:** „Du bist offline. Zum Anmelden und Anlegen deines Profils brauchst du Internet. Lernen und Üben kannst du weiter nutzen.“ Versand und Profilanlage nicht ausführen; „Verbindung prüfen“ sowie „Zu Lernen“ anbieten. Nach Wiederverbindung nicht automatisch absenden. Community-Anmeldung/-Daten nicht in den Lern-Offline-Cache übernehmen.
- **Ohne Profil / ohne Berechtigung:** Authentifiziert ohne Profil immer D; anonym A. Abgewiesener Beta-Code lässt D geöffnet. Kein Beitrag, Gruppenname oder Dateiname vor erfolgreicher Zugangskontrolle.
- **Alter nicht bestätigt:** „Die Community ist ab 16 Jahren. Lernen und Üben kannst du ohne Community-Profil nutzen.“ Kein Eingabefeld für Geburtsdatum ergänzen.
- **Sitzung abgelaufen:** „Deine Anmeldung ist abgelaufen. Lass dir einen neuen Link schicken.“ Zurück zu A; keine automatische Übertragung von Profilentwürfen in ein anderes Konto.
- **Ergebnis einer Anfrage unklar:** „Wir konnten nicht prüfen, ob dein Profil angelegt wurde. Prüfe den Status erneut.“ Profilstatus lesen, bevor eine weitere Erstellung angeboten wird. Ist es vorhanden, weiterleiten; bei sicher fehlendem Profil D erneut anbieten. Den unsicheren Ausgang nicht als Fehlschlag oder Erfolg ausgeben.
- **Paralleler Tab:** Wenn zwischen Prüfung und Anlage bereits ein Profil entstand, bestehendes Profil laden und weiterleiten. Kein Überschreiben und keine zweite Codeverwendung erzwingen.

### Wörtliche Fehlerzuordnung

| Ursache | Meldung | Korrektur |
|---|---|---|
| Adresse leer | Gib deine E-Mail-Adresse ein. | Fokus E-Mail |
| Adresse formal ungültig | Prüfe deine E-Mail-Adresse. | Eingabe erhalten |
| Versand technisch fehlgeschlagen | Der Link konnte nicht gesendet werden. Versuch es erneut. | Erneut senden |
| Versand zu häufig | Du hast gerade einen Link angefordert. Warte kurz und versuch es erneut. | Serverintervall respektieren |
| Link ungültig, abgelaufen oder bereits verwendet | Dieser Anmeldelink ist nicht mehr gültig. Lass dir einen neuen Link schicken. | A; ohne Sitzung keinen Erfolg behaupten |
| Profilprüfung fehlgeschlagen | Dein Profil konnte nicht geladen werden. Versuch es erneut. | Erneut prüfen, nicht Profil neu anlegen |
| E-Mail-Code nicht genau sechs Ziffern | Der Anmeldecode besteht aus sechs Ziffern. | Eingabe korrigieren; führende Nullen erhalten |
| E-Mail-Code ungültig/abgelaufen | Der Code ist abgelaufen oder stimmt nicht. Lass dir einen neuen schicken. | B; erneuten Versand ermöglichen |
| Beta-Code fehlt | Gib deinen Beta-Zugangscode ein. | Fokus Code |
| Beta-Code vom Backend abgewiesen | Dieser Beta-Zugangscode ist nicht gültig oder nicht mehr verfügbar. Prüfe den Code oder frag das Team. | Code bearbeitbar |
| Anzeigename fehlt/zu kurz/zu lang | Dein Anzeigename muss 2 bis 30 Zeichen lang sein. | Fokus Anzeigename |
| Anzeigename belegt | Dieser Anzeigename ist schon vergeben. Wähle einen anderen. | Übrige Werte erhalten |
| Ungültiges Lehrjahr | Wähle ein Lehrjahr von 1 bis 3 oder Keine Angabe. | Fokus Auswahl |
| Altersbestätigung fehlt | Die Community ist ab 16 Jahren. Lernen und Üben kannst du ohne Community-Profil nutzen. | Bestätigung oder Zu Lernen |
| Regelbestätigung fehlt | Bitte lies und akzeptiere die Community-Regeln, um ein Profil anzulegen. | Link und Bestätigung erreichbar |
| Anlage sicher fehlgeschlagen | Dein Profil konnte nicht angelegt werden. Versuch es erneut. | Eingaben erhalten; Status prüfen, falls Ausgang unklar |
| Abmeldung nicht bestätigt | Du konntest gerade nicht abgemeldet werden. Versuch es erneut. | Keinen abgeschlossenen Kontowechsel vortäuschen |

Fehlerkategorien sind UX-Vorgaben, keine behaupteten vorhandenen Backend-Fehlercodes. Claude ordnet sie den tatsächlichen Rückgaben zu. Zusätzliche Namensregeln nur anzeigen, wenn das bestehende Backend sie wirklich verlangt.

## 6. Texte (wörtlich)

| Stelle | Text |
|---|---|
| Titel A | In der Community anmelden |
| Einführung A | Stell Fragen, teile Lernzettel und lerne mit anderen. Zum Anmelden schicken wir dir einen Link per E-Mail. |
| E-Mail-Label | E-Mail-Adresse |
| Hilfe A | Du brauchst kein Passwort. Halte deinen Beta-Zugangscode bereit, wenn du neu dabei bist. |
| Senden | Anmeldelink senden |
| Datenschutzlink | Datenschutzerklärung |
| Ausstieg A/B | Ohne Anmeldung weiterlernen |
| Titel B | Schau in dein E-Mail-Postfach |
| Versandhinweis | Wir haben einen Anmeldelink an {E-Mail-Adresse} geschickt. Öffne den Link, um weiterzumachen. |
| Postfachhilfe | Keine E-Mail angekommen? Schau auch im Spam-Ordner nach. |
| Browserhilfe, nur wenn technisch nötig | Öffne den Link in diesem Browser. |
| Erneuter Versand | Link erneut senden |
| Versandbestätigung | Ein neuer Anmeldelink wurde gesendet. |
| Adresse ändern | E-Mail-Adresse ändern |
| Code-Anmeldung | Mit Code anmelden |
| E-Mail-Code-Label | Anmeldecode aus der E-Mail |
| E-Mail-Code-Hilfe | Du kannst auch den sechsstelligen Code aus derselben E-Mail hier eingeben. Das ist besonders praktisch in der installierten App. |
| Titel D | Dein Community-Profil |
| Einführung D | Wähle einen Namen, unter dem dich andere sehen. Dein Lehrjahr kannst du freiwillig angeben. |
| Code-Label | Beta-Zugangscode |
| Code-Hilfe | Den Code bekommst du vom Team für die Beta. |
| Namenslabel | Anzeigename |
| Namenshilfe | 2 bis 30 Zeichen. Diesen Namen sehen andere Mitglieder bei deinen Beiträgen und Antworten. |
| Lehrjahr | Lehrjahr (optional) |
| Auswahl | Keine Angabe / 1. Lehrjahr / 2. Lehrjahr / 3. Lehrjahr |
| Alter | Ich bin mindestens 16 Jahre alt. |
| Regeln | Ich akzeptiere die Community-Regeln. |
| Regeln öffnen | Community-Regeln lesen |
| Sichtbarkeit | Deine E-Mail-Adresse und dein Beta-Zugangscode werden anderen Mitgliedern nicht angezeigt. |
| Anlage | Profil anlegen |
| Erfolg | Dein Profil ist angelegt. |
| Ausstieg D | Später weiterlernen |
| Kontowechsel | Abmelden |
| Offline-Aktionen | Verbindung prüfen / Zu Lernen |

Variable Adressen/Namen als Text ausgeben, nicht als interpretierbares Markup. E-Mail-Adresse ausschließlich im privaten Anmeldekontext zeigen. Keine Behauptung, dass E-Mails innerhalb einer bestimmten Zeit eintreffen.

## 7. Daten

| Feld / Information | Eingabe oder Anzeige | Vorgabe und Umgang |
|---|---|---|
| E-Mail-Adresse | Auth-Eingabe, privater Versandhinweis | Mail-Link-Verfahren; kein Passwort; nicht zum öffentlichen Profil hinzufügen |
| Sitzung und Profil vorhanden | Interne Zugangsentscheidung | Nur aus verifiziertem Auth-/Backend-Ergebnis; kein neues Profilfeld |
| E-Mail-Anmeldecode | Alternative Auth-Eingabe | Sechs Ziffern aus derselben Mail; kein Profilfeld; getrennt vom Beta-Code und Gruppen-Code; nicht dauerhaft speichern |
| Beta-Zugangscode | Pflicht zur ersten Profilanlage | Vorhandene RPC prüft Gültigkeit; keine erfundene Länge; nicht in URL, Analytics, Protokoll oder allgemeinem Offline-Speicher |
| Anzeigename | Pflicht | 2–30 Zeichen, eindeutig; maßgeblich sind serverseitige Zähl-/Normalisierungsregeln |
| Lehrjahr | Freiwillige Auswahl | 1–3 oder keine Angabe; keine Angabe gemäß bestehendem Schema, keinen neuen Wert 0 erfinden |
| Mindestalter | Pflichtbestätigung | Mindestens 16; kein Geburtsdatum erfassen |
| Community-Regeln | Pflichtbestätigung | Gültigen Regeltext erreichbar machen; keine zusätzliche Versions-/Zeitstempelspalte ohne Änderungswunsch |
| Rolle | Keine Eingabe bei Anlage | azubi gemäß vorhandener Anlagefunktion; mentor durch Team, team nur Datenbank |
| Ursprüngliches Ziel | Kurzlebiger Navigationszustand | App-intern, nach Login Berechtigung prüfen; kein neues Datenbankfeld |

**Änderungswünsche am Datenmodell: keine.** Kein Avatar, Klarname, Schule, Arbeitgeber, Biografie, Telefonnummer oder Datensync. Lokaler Lernstand wird weder gelöscht noch automatisch hochgeladen. Formularwerte nur während der geöffneten Strecke erhalten; kein permanenter Entwurf und keine Offline-Schreibwarteschlange zugesagt.

## 8. Barrierefreiheit

- Fokusfolge A: Zurück → E-Mail → Senden → Datenschutzerklärung → Weiterlernen → bestehende Hauptnavigation.
- Fokusfolge B: Zurück → Anmeldecode → Mit Code anmelden → Link erneut senden → E-Mail-Adresse ändern → Weiterlernen → Hauptnavigation. Beim Ändern der Adresse alten Code verwerfen.
- Fokusfolge D: Zurück → Beta-Code → Anzeigename → Lehrjahr → Altersbestätigung → Regeln-Bestätigung → Regeln lesen → Profil anlegen → Später weiterlernen → Abmelden → Hauptnavigation. Sichtbare Reihenfolge entsprechend anordnen.
- Jede Eingabe mit dauerhaft sichtbarem Label; Pflichtangabe textlich erklären, Lehrjahr ausdrücklich optional. Platzhalter sind keine Labels.
- Hilfen und Fehler programmatisch mit dem Feld verbinden; Pflichtbestätigungen als echte Checkboxen mit großer anklickbarer Beschriftung.
- Alle Ziele mindestens 44 × 44 px. Code-Einfügen und Passwortmanager/E-Mail-Autovervollständigung nicht blockieren.
- Beim Ansichtswechsel Fokus auf Überschrift; bei Validierungsfehlern erste fehlerhafte Eingabe. Lade-/Erfolgsmeldungen zurückhaltend ankündigen, Fehler unmittelbar zugänglich machen.
- Regeln-Ansicht: bei Dialog Fokus halten, Schließen per Escape, Fokus zurück zum auslösenden Link; Scrollen setzt kein Häkchen.
- Keine Information allein durch Grün/Gold. Tastaturfokus sichtbar; getestete Text-/Fokuskontraste gemäß bestehendem System.
- Formulare bei 320 CSS-px, 200 Prozent Textgröße und geöffnetem Bildschirmkeyboard prüfen. Keine fest positionierte Aktion darf Inhalte verdecken.
- Keine erzwungene Animation, keine dekorative Erfolgssequenz; reduzierte Bewegung respektieren.

## 9. Offene Fragen an Lukes

Für den jetzigen Übergabeschritt sind Navigation, konkrete Heute-Gestaltung und Community-Regeltext entschieden. Nicht erneut abfragen. Der Regeltext ist in [03-community-regeln.md](03-community-regeln.md) enthalten.

Für spätere Arbeit offen: Reihenfolge der weiteren Detail-Specs. Vorschlag: Beiträge/Fragen/Antworten einschließlich Melden und Moderation, anschließend Gruppen und Wochenaufgaben. SMTP-Einrichtung vor Klassenversand bleibt ein gesonderter operativer Schritt; Konto löschen ist nicht Teil dieser Freigabe.

### Übergabe an Claude

Nach ausdrücklicher Freigabe von Datei/Version in entscheidungen.md die Strecke A–D mit dem bestehenden Auth-Verfahren und der vorhandenen Profil-RPC implementieren. Einstieg gemäß Lukes' Navigationsentscheidung; vorhandene Gestaltung und Komponenten verwenden. Bestehende Mail-Link- und Mail-Code-Funktionen nutzen; kein Schema-Neuentwurf.

Vor Codeänderungen uebergabe.md erneut lesen; Basis-Commit und git status --short feststellen. Auth-Rückleitung einschließlich Browserwechsel, Session-Erneuerung, RPC-Parameter, sichere Fehlerzuordnung und Namens-Eindeutigkeit im vorhandenen Code/Schema prüfen. Beta-Codes nie in Repo oder Übergabetexte schreiben. Abweichungen an Lukes melden.

Für das Review mindestens diese Fälle mit tatsächlichen Ergebnissen belegen:

| Fall | Erwartetes Ergebnis |
|---|---|
| Code-Anmeldung in installierter App | Sechsstelliger Code mit zugehöriger E-Mail funktioniert; falsche Länge, führende Null, falscher/abgelaufener Code und Rate-Limit geprüft |
| Neue gültige Anmeldung und Profilanlage | Erst nach Servererfolg Community-Zugang; Profil genau einmal vorhanden |
| Wiederkehrende Person | Kein erneuter Beta-Code, vorhandenes Profil wird benutzt |
| Angemeldet ohne Profil | Keine Community-Daten sichtbar, auch bei Direktlink/Reload |
| Ungültiger Code, belegter Name, fehlende Bestätigungen | Verständlicher Feldfehler; keine Teilfreigabe; übrige Eingaben bleiben |
| Abgelaufener/verwendeter Link und Browserwechsel | Bestehende Auth-Regeln eingehalten; klarer Rückweg statt Endlosschleife |
| Profilabfrage scheitert | Nicht als fehlendes Profil behandeln |
| Doppelklick, zwei Tabs, unterbrochene Erfolgsantwort | Keine doppelte Profilanlage; Status vor Wiederholung prüfen |
| Offline während Versand/Anlage | Kein falscher Erfolg, kein automatisches Nachsenden; Lernen/Üben nutzbar |
| Logout oder Kontowechsel | Community-Inhalte des alten Kontos unsichtbar; lokaler Lernstand unverändert |
| Unberechtigtes Gruppenziel nach Login | Keine Datenvorschau; verständlicher Rückweg |
| Tastatur, Bildschirmleser, schmales Display | Fokus-/Fehlerführung, Labels und Tippziele nutzbar |

Vorhandene Tests gemäß README im passenden Arbeitsverzeichnis ausführen und Ergebnisse berichten. Bei Änderungen an Zugriffsregeln zusätzlich supabase/tests/regeln_test.sql gemäß Backend-Anleitung ausführen; eine bestandene Sichtprüfung ersetzt keine Rechteprüfung. Anschließend Dateien/Commit/Tests und verbleibende Grenzen an ChatGPT zum Review übergeben.

Briefkasteneintrag zum Übernehmen nach Sichtung: „ChatGPT → Lukes, 2026-10-08: Zugangsspec Version 3: bestätigte Einstiege, freigegebener Regeltext und Mail-Code-Unterstützung. Übergabe zur Umsetzung des aktuellen Zugangspakets. Claude setzt nach dokumentierter Freigabe A–D um und belegt Zugriffsschutz sowie Fehler-/Offline-Fälle.“

**Stand dieser Lieferung:** Übergabespec mit oben dokumentierten Freigaben. Kein Code, kein Commit und keine durch ChatGPT getestete oder live geschaltete Anmeldung. Repository und Second Brain wurden ausschließlich gelesen.
