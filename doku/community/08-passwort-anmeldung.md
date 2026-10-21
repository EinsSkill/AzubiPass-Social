# 08 · Mit E-Mail und Passwort anmelden

> Stand: 21.10.2026 · Autor: ChatGPT · Rolle: Spec / Übergabe an Claude
> Status: Produktänderung von Lukes beauftragt; konkrete Ausarbeitung zur Umsetzung. Noch keine Passwortoberfläche implementiert.
> Grundlage: `community-zugang` @ `a02348892efecba53d5ac26a7c655164769c5c9e`, ausgelieferter Anwendungsstand `main` @ `e4a4210523101a36bbf540f2a2fb1ff9572ef19f`.

**Quelle:** Lukes: „Lass es uns so machen, das man sich per passwort anmelden kann, so das man nicht immer mit einer mailmarbeiten muss“.

## 1. Ziel und bestehender Stand

Die reguläre Anmeldung erfolgt mit **E-Mail-Adresse und Passwort**, ohne für jede Anmeldung einen Link oder Code aus dem Postfach zu benötigen. Anmeldung und Registrierung werden sichtbar getrennt. Bestehende Konten, Profile und Lernstände bleiben dieselben; wer bisher nur Mail-Links nutzte, kann für dieses Konto ein Passwort festlegen.

Aktueller Code: `community.js:177–187` bietet nur `anmeldenPerMail()` mit `signInWithOtp` und `shouldCreateUser: true`. `community-ansicht.js:519ff` zeichnet ein gemeinsames E-Mail-Formular. Eine gültige Sitzung ohne Profil führt zur Profilanlage, ein vorhandenes Profil überspringt sie. Das ist kein belegter allgemeiner Defekt der Profilzuordnung; die neue Trennung löst das von Lukes benannte Bedienungsproblem.

Supabase unterstützt Passwortanmeldung bereits; die internen Testkonten verwenden sie laut `supabase/README.md`. Die mitgelieferte Browserbibliothek meldet `supabase-js/2.117.3`. Kein zweites Benutzerverzeichnis und keine eigene Passworttabelle einführen. Dieser Auftrag ersetzt die Vorgabe „ohne Passwort“ in Spec 02 für den regulären Zugang; Profil-/Beta-/Rechteanforderungen bleiben bestehen.

## 2. Einstieg und Kontowechsel

Ich → Community sowie geschützte Community-Ziele ohne Sitzung öffnen standardmäßig **Anmelden**. Daneben ist **Konto erstellen** erreichbar. „Ohne Anmeldung weiterlernen“ bleibt vorhanden. Eine gültige Sitzung benötigt weder erneute Anmeldung noch ein zwangsweise gesetztes Passwort.

Nach bestätigter Authentifizierung **das Profil des authentifizierten Kontos** laden: vorhanden → berechtigtes ursprüngliches App-Ziel, fehlend → vorhandene Profilanlage mit Beta-Code. Ein technischer Profil-Lesefehler bleibt ein Fehler mit „Erneut versuchen“ und darf keine neue Profilanlage auslösen. Bestehende Profile nicht überschreiben oder neu anlegen.

Aus einer bereits geöffneten Profilanlage bleibt „Abmelden“ als Kontowechsel erreichbar, ergänzt um die Erklärung: „Schon mit einem anderen Konto registriert? Melde dich ab und mit dessen E-Mail-Adresse an.“ Keine automatischen Kontozusammenführungen anhand eines Anzeigenamens.

## 3. Oberflächen und Aktionen

Bestehende App-Gestaltung, Farben, Komponenten und mobile Abstände aus Spec 02 und `DESIGN.md` weiterverwenden. Keine neue Markenwelt.

| Ansicht | Felder und Aktionen | Ergebnis |
|---|---|---|
| **Anmelden** (Standard) | E-Mail-Adresse; Passwort; „Passwort anzeigen“; primär „Anmelden“; „Passwort vergessen?“; „Konto erstellen“; untergeordnet „Bisher nur per E-Mail angemeldet? Passwort festlegen“ | Nur `signInWithPassword`; ein falsches Passwort darf weder Registrierung noch automatischen Mailversand auslösen. |
| **Konto erstellen** | E-Mail-Adresse; Passwort; Passwort wiederholen; Anzeigen/Verbergen; primär „Konto erstellen“; „Schon ein Konto? Anmelden“ | `signUp` für neue Konten. Anschließend je nach tatsächlichem Auth-Ergebnis Bestätigungsmail-Ansicht oder authentifizierte Profilprüfung. |
| **Passwort vergessen** | E-Mail-Adresse; „Link zum Zurücksetzen senden“; „Zur Anmeldung“ | `resetPasswordForEmail`; neutrale Versandbestätigung ohne Aussage, ob die Adresse registriert ist. |
| **Passwort festlegen** für bisherige Mail-Konten | Bei Abmeldung vorhandene E-Mail abfragen, „Link zum Festlegen senden“; Erklärung „Du legst ein Passwort für dein bestehendes Konto fest.“ | Recovery des bestehenden Auth-Kontos; niemals `signUp` als Nachrüstweg benutzen. Keine neue Nutzer-ID. |
| **Neues Passwort festlegen** nach verifiziertem Recovery | Neues Passwort; Passwort wiederholen; Anzeigen/Verbergen; „Passwort speichern“ | `updateUser` für die nachweislich wiederhergestellte Identität; Erfolg erst nach bestätigter Antwort. |
| **Passwort festlegen oder ändern** im angemeldeten Konto | Erreichbar im Community-Profil/Kontobereich; neue Passwortfelder, gegebenenfalls vom Backend verlangte Reauthentifizierung | Dieselbe Nutzer-ID und dasselbe Profil. Bestehende Sitzung ohne Passwort bleibt bis zum expliziten Setzen nutzbar. |

„Passwort festlegen“ und „Passwort vergessen“ dürfen dieselbe technische Recovery-Strecke mit passender Erklärung verwenden. Regulärer Passwortlogin, Registrierung und Recovery bleiben verschiedene Aktionen. Den bisherigen Mail-Link-Zugang für die Umstellung untergeordnet erreichbar halten („Alternativ per E-Mail anmelden“); neue Mail-Fallback-Aufrufe nur für vorhandene Konten (`shouldCreateUser: false`). Bereits verschickte gültige Links und Codes kontrolliert weiter behandeln.

**E-Mail-Bestätigung:** Die Bestätigung bei neuen Konten bleibt entsprechend der vorhandenen Auth-Konfiguration erhalten. Sie wird nicht abgeschaltet, um Mailversand zu umgehen. Nach Bestätigung auf demselben Konto weiterarbeiten; bei erforderlichem Browserwechsel gegebenenfalls regulär mit E-Mail/Passwort anmelden. Kein doppeltes Konto, kein erneuter Beta-Code für ein vorhandenes Profil. An ein schon bestehendes Konto darf ein Registrierungsversuch kein neues Passwort anhängen.

**Passwortregeln:** Die tatsächliche Serverkonfiguration vor Umsetzung lesen und im Formular verständlich wiedergeben; keinen geratenen Grenzwert als geltende Backend-Regel ausgeben. Neue Passwortregeln gelten für Erstellung/Änderung; beim Login bestehender Konten nur eine nicht leere Eingabe verlangen und das Backend entscheiden lassen. Passwort unverändert übertragen: keine Trimmung, Kleinschreibung oder stille Kürzung. Passwortmanager, Einfügen und Autovervollständigung zulassen (`current-password` beim Login, `new-password` beim Setzen/Registrieren). Anzeigen/Verbergen verändert weder Wert noch Fokusposition. Passwörter beim Ansichts-/Kontowechsel aus Feldern und Entwürfen entfernen; E-Mail darf für die nächste Ansicht erhalten bleiben.

## 4. Bestehende Konten und Wiederherstellung

1. Bestehende Nutzer-ID ist die Identität für Profil, Beiträge, Rollen, Gruppen und Lernstand. Passwortsetzung ist **ein Update desselben Auth-Kontos**. Keine neuen Profil- oder Lernstanddatensätze auf Verdacht erzeugen.
2. Ein bereits angemeldeter Nutzer kann den Setzen-/Ändern-Weg öffnen. Wenn Supabase aktuelle Anmeldung, bisherigen Passwortnachweis oder einen Reauthentifizierungscode verlangt, diesen echten Zustand abbilden. Keine Sicherheitskonfiguration abschwächen, um eine Bestandskonto-Demo durchzubekommen. Aktuelles Passwort nicht für reine Mail-Konten erzwingen; dafür die authentifizierte Recovery-Strecke nutzen.
3. Bei Abmeldung einmal den Link zum Festlegen öffnen; danach neues Passwort setzen und künftig normal mit Passwort anmelden. Fehlender Mailzugang ist kein Anlass für ein Ersatzkonto oder ein vom Team gesetztes bekanntes Standardpasswort.
4. Ein erfolgreicher Reset soll zu einer klaren Bestätigung und regulären Anmeldung mit dem neuen Passwort führen. Die von Claude gewählte Behandlung der Recovery-Sitzung explizit dokumentieren; keine unbelegte Aussage „alle Geräte abgemeldet“. Kein automatisches Absenden eines vorher geöffneten Beitrags.

## 5. Auth-Callback und Kontogrenzen

`community.js` verwendet PKCE mit `detectSessionInUrl: true`, `flowType: "pkce"` und einem gemeinsamen Sitzungsclient. Der bisherige Rückweg räumt Auth-Parameter weg und führt jede erfolgreiche Sitzung in die normale Profilprüfung. Für Passwort-Recovery reicht es deshalb nicht, nur zwei Passwortfelder einzubauen.

- Registrierung/Bestätigung, normaler Mail-Login und Passwort-Recovery als unterschiedliche Rückkehrzwecke behandeln. Konkrete sichere Callback-URL und Redirect-Freigaben im Technikplan festlegen. Keine externen Weiterleitungsziele aus ungeprüften URL-Parametern übernehmen.
- Recovery-Kontext vor normaler Zielnavigation erkennen, insbesondere das echte Ereignis `PASSWORD_RECOVERY`; abgelaufene, verbrauchte und fremde Links zeigen einen verständlichen Rückweg. Ein `?reset=1` oder Hash allein beweist keine Recovery-Authentifizierung. Bei einer schon vorhandenen Sitzung A und einem Recovery-Link für B muss nachgewiesen sein, welches Konto der Link tatsächlich verifiziert hat; A darf nicht versehentlich ein neues Passwort bekommen.
- Nur ein gültiger Auth-Nachweis erlaubt `updateUser`. Bei fehlendem/gescheitertem Linkaustausch keine beliebige alte Sitzung als Recovery-Erfolg verwenden. Die Wiederherstellungsansicht darf nicht durch `SIGNED_IN`, Profilweiterleitung oder Paket-Zielnavigation übersprungen werden. Ein bewusst geöffneter Passwort-Ändern-Weg in einer normalen Sitzung bleibt davon getrennt.
- PKCE-Verifier, Linkparameter, Recovery-Kontext und das Verhalten bei Reload/Browserwechsel mit der tatsächlich gebündelten Bibliothek prüfen. Technische Grenzen erklären; keine generelle geräteübergreifende Linkfunktion versprechen. Nach Bearbeitung URL um Geheimnisse bereinigen, ohne den Recovery-Zweck vorher zu verlieren.
- `PASSWORD_RECOVERY`, `INITIAL_SESSION`, `SIGNED_IN`, `USER_UPDATED`, `TOKEN_REFRESHED` und `SIGNED_OUT` bewusst zuordnen. Auth-Listener kurz halten, Folgeoperationen außerhalb des Callbacks ausführen. Authentifizierung und nachlaufende Profil-/Passwortantworten an Konto/Generation binden.
- Der Lernstand-Sync hört bislang auf `SIGNED_IN`/`INITIAL_SESSION`. Nach Recovery und Passwortsetzung muss er weiterhin das richtige Konto kennen. LS01–LS04 und die Upload-/Entwurfsgrenzen erhalten; kein lokaler Stand von A darf beim Reset für B in B hochgeladen werden. Wenn Recovery eine andere Identität verifiziert, gelten die vorhandenen Kontowechselregeln sofort.

## 6. Fehler, Zustände und wörtliche Texte

| Fall | Text / Verhalten |
|---|---|
| Einführung Login | „Melde dich mit deiner E-Mail-Adresse und deinem Passwort an.“ |
| Passwort leer | „Gib dein Passwort ein.“ |
| Falsche Zugangsdaten / unbekannte Adresse | „E-Mail-Adresse oder Passwort stimmen nicht.“ Keine kontobestandsabhängigen Sondertexte. |
| Registrierung benötigt Mailbestätigung | „Prüfe dein E-Mail-Postfach, um die Registrierung abzuschließen. Falls du schon ein Konto hast, melde dich an oder setze dein Passwort zurück.“ Nicht allein aus `data.user` eine neue erfolgreiche Registrierung oder eine Sitzung ableiten. |
| Nicht bestätigte E-Mail beim Passwortlogin | „Bestätige zuerst deine E-Mail-Adresse.“ Passenden bestehenden Bestätigungsweg und erneuten Versand anbieten, soweit das tatsächliche Backend diesen Zustand meldet. |
| Reset-/Festlegen-Versand bestätigt | „Falls für diese E-Mail-Adresse ein Konto besteht, erhältst du eine E-Mail mit den nächsten Schritten.“ |
| Neues Passwort wiederholt abweichend | „Die Passwörter stimmen nicht überein.“ |
| Passwort durch Serverregel abgelehnt | Tatsächlich geltende Passwortanforderung konkret erklären; keine Rohfehler/Interna anzeigen. |
| Recovery ungültig/abgelaufen/anderer Browser | „Dieser Link konnte nicht bestätigt werden. Fordere einen neuen Link an.“ Browserhinweis nur, wenn zutreffend. |
| Passwort erfolgreich gesetzt | „Dein Passwort wurde gespeichert. Du kannst dich jetzt mit E-Mail-Adresse und Passwort anmelden.“ |
| Laufend | „Anmeldung wird geprüft …“, „Konto wird erstellt …“, „Link wird gesendet …“, „Passwort wird gespeichert …“ entsprechend der Aktion; Doppelsenden sperren. |
| Offline | „Du bist offline. Zum Anmelden brauchst du Internet. Lernen und Üben kannst du weiter nutzen.“ Kein automatischer Auth-Versand bei Wiederverbindung. |
| Rate Limit / Netzfehler | Verständlicher Wiederholungsweg; Serverlimit respektieren. Bei unklarem Passwort-Update nicht Erfolg behaupten, Zustand durch erneute Anmeldung/gezielte Wiederholung klären. |

Sichtbare Labels, benannte Anzeigen-/Verbergen-Knöpfe, Tastatur und 320-px-Ansicht beibehalten. Feldfehler nach Submit, danach beim Korrigieren aktualisieren. Passwörter in Screenshots, Fehlerreports, Testlogs und Instrumentierung maskieren bzw. auslassen.

## 7. Technischer Umfang für Claude

Konkreten Umsetzungs-/Auth-Konfigurationsplan mit aktuellen Werten und nötigen Änderungen vorlegen und die beauftragten App-Abläufe auf dem Arbeitsbranch umsetzen:

- Datenschicht: `signInWithPassword`, `signUp`, `resetPasswordForEmail`, authentifiziertes `updateUser`, gegebenenfalls `reauthenticate` / unterstützter `current_password`-Nachweis; vorhandene Sitzung und Kontogeneration verwenden. Passwortprüfung/-speicherung verbleibt vollständig bei Supabase Auth.
- Ansicht: getrennte Zugänge, Setzen/Ändern und Recovery-Zustände, kontrollierte Rückkehr zur vorhandenen Profilprüfung. Ergänzende lokale Zustände ohne Passwörter im dauerhaften Speicher. Session-Tokens weiterhin über die vorhandene Auth-Bibliothek verwalten.
- Auth-Projektkonfiguration lesen: E-Mail-Provider/Passwortzugang, Bestätigungsanforderung, Passwortregeln, Secure Password Change, Site URL/Redirects, SMTP und passende Bestätigungs-/Recovery-Mailvorlagen. Öffentliche Schlüssel bleiben öffentlich; keine Service-Role-Schlüssel oder Adminpasswortsetzung im Browser.
- Den offenen Brevo-/Mailversandpunkt berücksichtigen: regulärer Passwortlogin braucht keine Anmeldemail; Registrierung/Recovery müssen dennoch mit tatsächlich funktionierendem Versand belegt werden. Vorhandene Demo-Passwortkonten ersetzen diesen Nachweis nicht. Keine Testmails an Dritte oder ungefragte Massenumstellung bestehender Nutzer.
- Voraussichtlich keine neue Community-Tabelle oder SQL-Migration erforderlich; dies nach Technikabgleich begründen, nicht pauschal behaupten. Keine Rollen-/RLS-/Paketfreigaben aus einer Passwortanmeldung ableiten.
- Bestehende Datenschutz-/Hilfe-/Sitzungsablauftexte („kein Passwort“, ausschließlich Mail-Anmeldung) nach tatsächlicher Implementierung korrigieren. `docs/` nur bauen. Kein unnötiges Bibliotheksupdate, solange die gebündelte Version den geprüften Ablauf unterstützt.

## 8. Abnahme

| Prüfung | Erwartung |
|---|---|
| Bestehendes Passwortkonto anmelden, ab-/erneut anmelden | Gleiche Nutzer-ID / gleiches Profil / gleicher Lernstand, keine Mail nötig. |
| Falsches Passwort, unbekannte Adresse, leeres Passwort | Kein Konto angelegt, kein automatischer Mail-Fallback, neutrale Fehler. |
| Bestehendes kürzeres Passwort / Leerzeichen / Passwortmanager | Login nicht durch neue Erstellungsregeln oder Trimmung verändert; Paste/Autofill funktioniert. |
| Neue Registrierung, Bestätigung, Profilanlage | Sitzungsstatus korrekt; Beta-Code/Alter/Regeln bleiben wirksam. Passwortfeld nie im dauerhaften Entwurf. |
| Bereits registrierte Adresse erneut registrieren | Kein Erfolg vortäuschen, keine Passwortänderung des vorhandenen Kontos, Anmelde-/Resetweg erreichbar. |
| Bisheriges Mail-Konto nachrüsten, danach Passwortlogin | Dieselbe Nutzer-ID; Profil, Rollen, Gruppe, Beiträge und Lernstand bleiben erhalten. |
| Passwort vergessen, gültiger/ungültiger/verbrauchter Link | Gültiger Link öffnet Setzen-Ansicht; Fehler bieten neuen Link; keine neue Profilanlage. |
| Sitzung A + Reset für B; verspätete Antwort nach Kontowechsel | Ausschließlich nachgewiesene Zielidentität betroffen; kein fremder Lernstand/Entwurf/Erfolg in A oder B. |
| Recovery-Callback, Reload, PWA/Browserwechsel | Zweck bleibt korrekt erkannt oder verständlicher Wiederholungsweg; kein normales Weiterleiten vor der Passwortansicht. |
| Passwort ändern mit Server-Reauthentifizierung | Vorgeschriebener Nachweis unterstützt; keine Abschwächung, keine falsche Erfolgsbestätigung. |
| Ansichtswechsel, Doppelklick, Offline, Rate Limit | Keine doppelten Auth-Aktionen; sensible Felder geleert; Entwürfe/Kontogrenzen bleiben korrekt. |
| Geschlossenes Paket / fehlendes Profil nach Passwortlogin | Bestehende Zugriffsschranken unverändert wirksam. |
| 320 px, Tastatur, Screenreader, Anzeigen/Verbergen | Formulare erreichbar, klare Namen/Fokus, keine Passwortausgabe in Logs. |

Clientabläufe zunächst gezielt mit simulierten Auth-Antworten testen; danach Login, Bestandskonto-Passwortsetzung, Registrierung und Recovery gegen echte Supabase-Auth mit freigegebenen eigenen Testkonten prüfen. Bericht unterscheidet Simulation, echte Auth, tatsächlichen Mailversand und Handy/PWA. Betroffene Zugangs-/Lernstand-/Communityprüfungen und Build passend ausführen; keine neue pauschale SQL-Audit-Runde ohne Rechteänderung. Noch fehlende Mail-/Kontozugänge konkret ausweisen.

## 9. Quellen und Übergabegrenze

Offizielle Primärquellen, geprüft am 21.10.2026:

- [Password-based Auth](https://supabase.com/docs/guides/auth/passwords): Passwortzugang, getrennte Registrierung und Recovery; E-Mail bleibt für Bestätigung/Reset relevant.
- [signUp](https://supabase.com/docs/reference/javascript/auth-signup): tatsächliches Registrierungs-/Sitzungsergebnis auswerten, keine Kontobestandsannahme aus der Antwort.
- [resetPasswordForEmail](https://supabase.com/docs/reference/javascript/auth-resetpasswordforemail) und [updateUser](https://supabase.com/docs/reference/javascript/auth-updateuser): Reset anfordern, verifizierte Sitzung für Passwortänderung.
- [PKCE](https://supabase.com/docs/guides/auth/sessions/pkce-flow): gebündelte Bibliothek, Verifier, Browserbindung und Rückleitung prüfen.
- [Password Security](https://supabase.com/docs/guides/auth/password-security): Serverregeln und gegebenenfalls erforderliche Reauthentifizierung berücksichtigen.

Claude ist Umsetzungseigner. Dieser Stand dokumentiert Lukes' Passwortauftrag und die konkrete Ausarbeitung, verändert jedoch keine Anwendung, keine Auth-Projektkonfiguration und keine Datenbank. Die frühere abgeschlossene Merge-Freigabe für B04 wird nicht als neue Freigabe dieses Auth-Pakets ausgegeben. Nach Umsetzung gezielter Review und konkreter Auslieferungsstand; Paketöffnung bleibt separat.
