# 08 · Technikplan Passwortanmeldung

> Stand: 21.10.2026 · Autor: Claude · Rolle: Umsetzung
> Grundlage: Spec [08-passwort-anmeldung.md](08-passwort-anmeldung.md) @ `4889779`, Arbeitsbranch `community-zugang`.
> Status: auf dem Arbeitsbranch umgesetzt und simuliert getestet; **nicht** auf `main`, nicht live. Kein Merge ohne neue Freigabe von Lukes.

## 1. Gelesene Auth-Konfiguration (Projekt `pjbxozskvuhxtrotqpkr`)

| Punkt | Wert | Quelle / Beleg |
|---|---|---|
| E-Mail-Provider / Passwortzugang | an | `GET /auth/v1/settings` → `external.email: true` |
| Registrierung | erlaubt | `disable_signup: false` |
| Bestätigung neuer Konten | **erforderlich** | `mailer_autoconfirm: false` |
| Mindestlänge neuer Passwörter | **6 Zeichen** | Probe `POST /auth/v1/signup` mit 1-Zeichen-Passwort an eine `.invalid`-Adresse → `422 weak_password`, „Password should be at least 6 characters.“, `reasons: ["length"]`. Kein Konto angelegt (`auth.users` ohne Probe-Konto geprüft). |
| Zeichenregeln | keine | Dieselbe Probe meldet nur `length`, nicht `characters` |
| Leaked-Password-Schutz | nicht belegt | nur Pro-Plan; die App erklärt `pwned`, falls der Server es meldet |
| Secure Password Change (Reauthentifizierung) | **unbekannt** | nicht über öffentliche Schnittstellen lesbar. Die App unterstützt beide Fälle (siehe 4). |
| Aktuelles Passwort beim Ändern verlangen | **unbekannt** | Falls Lukes das einschaltet, fehlt in der App das Feld „Aktuelles Passwort“ (bewusst nicht gebaut, weil reine Mail-Konten keins haben; Spec 08 §4.2). Bitte ausgeschaltet lassen. |
| SMTP | Standardversand von Supabase (Brevo offen) | Bekannter offener Punkt: Ohne eigenes SMTP erreichen Mails nur Team-Adressen der Organisation. |
| Site URL / Redirect-Freigaben | **von Lukes im Dashboard zu prüfen** | nicht lesbar |
| Mailvorlagen | **von Lukes zu prüfen** | nicht lesbar |

Keine Einstellung wurde geändert. Keine neue Tabelle, keine SQL-Migration: Passwörter liegen nur in Supabase Auth (bcrypt), dieselbe `auth.users`-ID bleibt Schlüssel für Profil, Rollen, Gruppen, Beiträge und Lernstand. Keine Rechte/RLS/Paketfreigabe hängt an der Anmeldeart.

## 2. Nötige Dashboard-Schritte für Lukes (vor echtem Test/Auslieferung)

1. **URL Configuration → Redirect URLs:** Die Rückwege sind jetzt
   `…/app.html?anmeldung=1#community` (Mail-Link),
   `…/app.html?anmeldung=1&zweck=registrierung#community` (Bestätigung) und
   `…/app.html?anmeldung=1&zweck=passwort#community` (Zurücksetzen/Festlegen).
   Ist dort heute nur die exakte erste Adresse eingetragen, braucht es einen Eintrag mit `**` (z. B. `https://einsskill.github.io/AzubiPass-Social/**`), sonst leitet Supabase auf die Site URL ohne Zweck um.
2. **Email Templates → Reset Password:** `{{ .ConfirmationURL }}` behalten. Für die installierte App zusätzlich `{{ .Token }}` als Code aufnehmen; die App bietet „Code aus der E-Mail“ an (verifyOtp `recovery`). Ohne Token in der Vorlage funktioniert nur der Link, und nur im anfordernden Browser.
3. **Confirm signup:** unverändert lassen; Bestätigung bleibt Pflicht.
4. **Reauthentication** (falls Secure Password Change an ist): Vorlage muss `{{ .Token }}` enthalten.
5. **SMTP (Brevo):** Für Registrierung und Wiederherstellung an Klassenadressen nötig. Normaler Passwortlogin braucht keine Mail.

## 3. Abläufe und Bibliotheksverhalten (supabase-js 2.117.3, gebündelt)

| Ansicht | Aufruf | Ergebnis |
|---|---|---|
| Anmelden (Standard) | `signInWithPassword` | Fehler ohne Kontoaussage; kein Rückfall auf Mail/Registrierung |
| Konto erstellen | `signUp` mit `emailRedirectTo …zweck=registrierung` | Sitzung nur, wenn Supabase sie liefert; sonst Bestätigungsansicht (auch für schon vorhandene Adressen – Supabase antwortet dann gleich) |
| Bestätigung erneut | `resend({type:"signup"})` | neutraler Hinweis |
| Passwort vergessen / festlegen | `resetPasswordForEmail` mit `redirectTo …zweck=passwort` | neutraler Spec-Text; nie `signUp` |
| Code aus der Mail | `verifyOtp({type:"recovery"})` | Bibliothek meldet selbst `PASSWORD_RECOVERY` |
| Neues Passwort / Profil „Passwort festlegen oder ändern“ | `updateUser({password[, nonce]})`, ggf. `reauthenticate()` | Erfolg nur bei Antwort für dieselbe Nutzer-ID |
| Alternativ per E-Mail | `signInWithOtp({shouldCreateUser:false})` | „kein Konto“ (`otp_disabled`) wird wie versendet behandelt |

**PKCE:** Der Prüfwert liegt im anfordernden Browser (`azubipass-sitzung-code-verifier`, bei Recovery mit Suffix `/recovery`). Die Bibliothek tauscht `?code=` beim Start (`detectSessionInUrl`) und meldet bei Recovery `PASSWORD_RECOVERY` per `setTimeout(0)` – also **nach** dem ersten `getSession`. `linkEinloesen()` wartet deshalb zwei Takte. Ein späterer Antrag überschreibt den Prüfwert eines früheren (nur der jüngste Link gilt im Browser). Anderer Browser/PWA auf iOS: kein Prüfwert → keine Sitzung → „Dieser Link konnte nicht bestätigt werden. Fordere einen neuen Link an.“ Dort hilft der Code (Vorlage, Punkt 2.2). Beim gescheiterten Tausch lässt diese Version eine vorhandene Sitzung A bestehen.

**Wiederherstellung belegen:** Nur das Ereignis `PASSWORD_RECOVERY` setzt den Vermerk, und nur für die Nutzer-ID der Ereignissitzung (`community.js`, Speicher + `sessionStorage` `azubipass-wiederherstellung`, enthält nur die ID). `?zweck=passwort` bestimmt nur den Fehlertext. Beim Link zählt nur ein Ereignis aus diesem Seitenaufruf. Jede andere Sitzung, `SIGNED_OUT` oder erfolgreiches `updateUser` löscht den Vermerk. `pruefen()` zeigt bei offenem Vermerk für die jetzige Sitzung die Passwortansicht **vor** Profil-, Ziel- und Paketprüfung; nach Reload im selben Tab ebenso.

**Ereignisse:** `PASSWORD_RECOVERY` → Vermerk + Kontobindung (`kontoMerken`), Oberfläche wie `SIGNED_IN` (Kontowechsel verwirft alles vom alten Konto), Lernstand-Sync wie `SIGNED_IN` (`kontoVermerken` trennt sofort, LS01). `INITIAL_SESSION`/`SIGNED_IN` unverändert. `USER_UPDATED`/`TOKEN_REFRESHED`: gleiche ID, nichts zu tun. `SIGNED_OUT`: Vermerk weg, bisherige Aufräumlogik. Folgearbeit läuft außerhalb der Callbacks.

**Recovery-Sitzung (Entscheidung Claude, Spec 08 §4.4):** Nach erfolgreichem Speichern bleibt man mit der bestätigten Sitzung angemeldet und kommt in die normale Profilprüfung mit dem Text „Dein Passwort wurde gespeichert. Du kannst dich jetzt mit E-Mail-Adresse und Passwort anmelden.“ Andere Geräte werden **nicht** abgemeldet (keine Aussage dazu in der App). Kein Ziel wird automatisch abgesendet.

**Reauthentifizierung:** Antwortet Supabase `reauthentication_needed`, erscheint „Bestätigungscode aus der E-Mail“, `reauthenticate()` schickt den Code einmal, erneutes Speichern sendet `nonce`. Falscher Code → Feldfehler. Netzfehler/5xx beim Update → „Wir wissen nicht, ob dein neues Passwort gespeichert wurde …“ statt Erfolg.

## 4. Passwortregeln in der App

- Login: nur „nicht leer“; Wert unverändert (kein trim), `autocomplete=current-password`.
- Erstellen/Ändern: Hinweis „Mindestens 6 Zeichen.“ aus `CFG.passwortMin` (gelesener Wert), Vorprüfung in Codepunkten; Serverantwort `weak_password` wird mit der Zahl aus der Servermeldung erklärt (bleibt richtig, wenn Lukes die Länge erhöht – dann `CFG.passwortMin` mitziehen). `new-password`, Wiederholung, ein gemeinsamer Knopf „Passwort anzeigen/verbergen“ (Wert, Fokus und Auswahl bleiben).
- Passwörter nur in den Feldern; nicht in `z`, Entwürfen, Speicher, Fehlern oder Logs. Jeder Ansichtswechsel baut die Felder neu (leer), die E-Mail-Adresse bleibt.

## 5. Geänderte Dateien

`quellen/community.js` (Auth-Datenschicht, Vermerk, Rückwege, Mail-Rückfall ohne Kontoanlage), `quellen/community-ansicht.js` (Ansichten anmeldung, registrieren, bestaetigen, vergessen, linkVersendet, neuesPasswort, mailLogin, versendet; Passwortbereich im Profil; Erklärung in der Profilanlage), `quellen/lernstand-sync.js` (`PASSWORD_RECOVERY` wie `SIGNED_IN`), `quellen/build_app.py` (Datenschutztext), `quellen/community_passwort_test.py` (neu), `quellen/community_zugang_test.py` / `community_test.py` (Texte/Weg angepasst, nicht live gelaufen), `docs/` (nur gebaut).
