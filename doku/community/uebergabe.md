# Übergabe · AzubiPass Social

Briefkasten zwischen den KIs. **Vor jedem Arbeitsschritt lesen, danach den
eigenen Abschnitt oben ergänzen.** Neueste Übergabe steht oben. Belege sind
Commits, Dateien und Tests, nicht Erinnerungen.

Rollen (Regeln: `AGENTS.md`, Second Brain `_System/SCHEMA.md` §7):

- **ChatGPT** – Spec: Ideen, Bildschirm-Entwürfe, Texte. Schreibt keinen Code.
- **Claude** – Umsetzung: einziger Schreiber in `quellen/`, `supabase/`, `docs/`.
- **Gemini** – Gegenprüfung nach Bedarf.
- **Lukes** – entscheidet, gibt frei, trägt Freigaben in `entscheidungen.md` ein.

Ablauf pro Bildschirm: `IDEE → SPEC (ChatGPT) → FREIGEGEBEN (Lukes) → UMSETZUNG (Claude) → REVIEW (ChatGPT) → LIVE`

## 2026-10-08 (3) · Claude → ChatGPT (Review) → Lukes

**Vorheriger Beitrag:** ChatGPT – `01-uebersicht.md` und `02-anmeldung-profil.md`
(Version 3), `03-community-regeln.md`; Lukes – Freigabe der fünf Punkte in
`entscheidungen.md`.
**Rolle:** Umsetzung. **Grundlage:** Branch `community-zugang`, abgezweigt von
`main` @ `0c472bb`; Datenschicht @ `3386b94`.
**Nächste Übergabe an:** ChatGPT zum Review, danach Lukes für die offenen
Entscheidungen unten. **Nicht gemergt, nicht live** – `main` bleibt unverändert.

### Umgesetzt (nur das freigegebene Zugangspaket)

- **A Anmeldung, B Mail versendet (Link oder 6-stelliger Code), C Prüfen,
  D Profil anlegen, C17 Regeln** – `quellen/community-ansicht.js`, Texte wörtlich
  aus 02, Regeltext wird beim Bau aus `03-community-regeln.md` gelesen
  (eine Quelle, Build bricht ab, wenn es nicht genau 8 Regeln sind).
- **Einstiege:** Ich → Zeile „Community"; Heute → „Gemeinsam lernen" mit
  „Zur Community" (ohne Wochenaufgabe, lädt keine Community-Daten). Vier Tabs
  bleiben, in der Community ist „Ich" aktiv.
- **Datenschicht:** Link-Einlösung als Versprechen, abgelaufene/fremde Links
  erkannt, Abmelden räumt alle `azubipass-sitzung*`-Schlüssel weg.
- **Drei Codes klar getrennt:** „Anmeldecode aus der E-Mail" (nur B, Ziffern,
  `one-time-code`), „Beta-Zugangscode" (nur D), Gruppen-Code kommt nicht vor.

### Belege

| Prüfung | Ergebnis |
|---|---|
| `community_zugang_test.py` (neu, echter Browser + echtes Supabase) | **70 von 70 Prüfungen OK** |
| `community_test.py` (Datenschicht) | 39 OK, 0 Fehler |
| `pruefe.py app.html` (2 Größen × 2 Stimmungen, jetzt **inkl. Community**) | Keine Fehler; Gegenprobe mit absichtlich zu kleinem Knopf wurde erkannt |
| `funktionstest.py` | 188 OK, 2 FEHL, Abbruch bei „Eigene Probeklausur" – **identisch mit dem Original `EinsSkill/AzubiPass` @ 0feae83** (dort ebenfalls 188 OK, dieselben 2 FEHL, derselbe Abbruch). Altfehler: „Alle Kapitel fertig: Prüfungstraining öffnen", „Alle fertig: Ziel ist der Übungsteil", Abbruch „Eigene Probeklausur". Ein zwischenzeitlicher neuer Fehler („0 fällige Karten: kein toter Knopf") kam vom Community-Link und ist behoben. |
| `supabase/tests/regeln_test.sql` | nicht erneut ausgeführt – keine Änderung an Regeln oder Rechten |

Die Fälle aus 02 §9 einzeln: kein Zugriff ohne Sitzung/Profil (keine
`/rest/v1`-Anfrage vor Anmeldung, auch nicht auf Heute) · Code: falsche Länge,
Buchstaben, führende Null bleibt erhalten (echter Server lehnt ab), Rate-Limit,
erfolgreicher Code führt zu D · falscher Beta-Code, belegter Name (andere
Groß-/Kleinschreibung), fehlende Bestätigungen mit Fehlerübersicht, übrige
Eingaben bleiben · Doppelklick: genau ein Versand, genau eine Profilanlage ·
zwei Tabs: zweiter Tab übernimmt das Profil des ersten, keine zweite Anlage ·
verlorene Antwort: Profil wird gefunden · Antwort UND Nachsehen scheitern:
„Wir konnten nicht prüfen …", danach „Status prüfen" findet es · Profil-Lesefehler
führt nicht zu D · wiederkehrend ohne Beta-Code · unbekanntes Ziel nach Login:
keine Daten · abgelaufener Link und Link aus fremdem Browser: klarer Rückweg,
Adresse aufgeräumt · offline: kein Versand, kein Absenden, Heute sagt es,
Lernen bleibt erreichbar · Abmelden: kein Name mehr sichtbar, Sitzung weg,
Lernstand (`azubipass:konto`) Byte für Byte unverändert · Tastaturreihenfolge D
wie in 02 §8, Regeldialog: Escape, Fokus zurück, kein Haken · alle Tippziele
≥ 44 × 44 px in A, B, D, Regeln, Community · 320 px ohne seitliches Scrollen.

**Wie getestet:** Wo eine echte Mail nötig wäre, ersetzt der Test nur die
Antwort des Mailservers (`/auth/v1/otp`, `/auth/v1/verify`); beim Code kommt
eine **echte** Sitzung zurück. Alles andere geht an das echte Projekt. Screenshots:
`doku/community/review/2026-10-08-zugang/`.

### Abweichungen und Entscheidungsbedarf (bitte nicht still übernehmen)

1. **Ziel nach erfolgreichem Zugang.** 02 sagt „Beiträge" – die sind nicht
   freigegeben. Übergangsweise zeigt die Community nur das eigene Profil
   (Name, Lehrjahr, ggf. Rolle) mit „Community-Regeln lesen" und „Abmelden",
   darunter **erfundener Text**: „Beiträge und Lerngruppen kommen mit der
   nächsten Version." → ChatGPT/Lukes: Text und Ansicht festlegen.
2. **Selbst ergänzte Texte** (in 02 nicht vorgegeben): Augenbraue „Ich ·
   Community"; „‹ Zurück"; „Schließen" im Regeldialog; „Bitte prüfe deine
   Eingaben:" über der Fehlerübersicht; Knopf „Status prüfen"; Ladetext
   „Abmelden …"; Überschrift „Community" für Offline-, Nicht-verfügbar- und
   Unklar-Ansicht; Gruppentitel unter Ich „Gemeinsam lernen"; Code-Fehler bei
   Rate-Limit „Zu viele Versuche in kurzer Zeit. Warte einen Moment und versuch
   es erneut."; bei Netzfehler „Das hat gerade nicht geklappt. Versuch es
   erneut."; Prüffehler „Die Anmeldung konnte nicht geprüft werden. Versuch es
   erneut." → Review.
3. **„Öffne den Link in diesem Browser."** wird immer gezeigt: technisch nötig,
   weil der Link (PKCE) nur im anfordernden Browser gilt.
4. **Datenschutzerklärung** (`datenschutz.html`, verlinkt aus A) sagt noch
   „kein externer Dienst" und kennt keine Konten. **Vor der Klassen-Beta
   anpassen** – Rechtstext, also Entwurf durch ChatGPT, Entscheidung Lukes.
5. **Code-Länge:** Die App erwartet 6 Ziffern. In Supabase unter
   Authentication → Providers → Email muss „Email OTP Length" 6 sein (prüfen).
6. **Mail-Link Ende zu Ende** ist ohne SMTP nicht testbar; getestet sind
   Fehlerwege und der Code-Weg mit echter Sitzung.
7. Schlägt ein Abruf fehl, wiederholt die Supabase-Bibliothek ihn selbst; der
   unklare Ausgang erscheint deshalb nach gut 10 Sekunden (Knopf zeigt so lange
   „Profil wird angelegt …").
8. Testkonten: 21 von 28 `test-neu*` verbraucht, Stand in `supabase/README.md`.

## Offene Aufgaben (Lukes)

- [ ] **Mail-Sache – bewusst auf später verschoben.** Bis dahin kommen
  Anmelde-Mails nicht bei der Klasse an; getestet wird mit den Demo-Konten.
  - eigener Mailversand in Supabase (Authentication → Emails → SMTP),
    Vorschlag Gmail mit App-Passwort, `smtp.gmail.com:587`
  - Rate Limit für Mails auf ca. 60 pro Stunde (Authentication → Rate Limits)
- [x] GitHub Pages läuft: https://einsskill.github.io/AzubiPass-Social/ (Demo-Anmeldung dort getestet)
- [x] Site URL, Redirect-URL und Mailvorlage erledigt (Lukes, 08.10.)
- [ ] „Konto löschen" einspielen (`supabase/ausstehend/`), braucht Bestätigung

---

## 2026-10-08 · ChatGPT → Lukes (eingetragen von Claude, Wortlaut aus 01/02)

„2026-10-08 · ChatGPT → Lukes: 01-uebersicht.md und 02-anmeldung-profil.md,
Version 3: Navigation, Heute-Gestaltung und Regeltext im Chat freigegeben; neue
Mail-Code-Unterstützung mit Claudes Datenschicht abgeglichen. Nächster Schritt:
Lukes entscheidet und dokumentiert die freigegebene Version; Claude implementiert
danach den freigegebenen Umfang."

„ChatGPT → Lukes, 2026-10-08: Zugangsspec Version 3: bestätigte Einstiege,
freigegebener Regeltext und Mail-Code-Unterstützung. Übergabe zur Umsetzung des
aktuellen Zugangspakets. Claude setzt nach dokumentierter Freigabe A–D um und
belegt Zugriffsschutz sowie Fehler-/Offline-Fälle."

---

## 2026-10-08 (2) · Claude → ChatGPT / Lukes

**Vorheriger Beitrag:** Claude – Datenbank und Regeln (`supabase/`).
**Rolle:** Umsetzung. **Grundlage:** `main`, siehe `git log`.
**Nächste Übergabe an:** ChatGPT – weiterhin `01-uebersicht.md` und
`02-anmeldung-profil.md`. Die Technik dahinter ist fertig, die Oberfläche
wartet auf die freigegebenen Entwürfe.

### Neu

- `quellen/community.js` – Datenschicht ohne Oberfläche (`AP.community`):
  Anmeldung per Mail-Link **und** per 6-stelligem Code aus derselben Mail
  (für die installierte App, wo der Link oft im Browser statt in der App
  aufgeht), Profil, Gruppen, Beiträge mit Datei, Antworten, beste Antwort,
  Hilfreich, Wochenaufgaben, Melden, Moderation, Live-Meldungen.
  Fehlermeldungen kommen fertig auf Deutsch – die Entwürfe können sie
  wörtlich übernehmen oder bessere vorschlagen.
- `quellen/supabase.js` – Bibliothek lokal statt von fremden Servern; wird
  erst geladen, wenn jemand die Community öffnet.
- `quellen/community_test.py` – ~~45~~ **39 bis 42 Prüfungen** (je nachdem,
  ob die Demo-Profile schon bestehen) mit zwei Demo-Konten gegen das echte
  Projekt, alle bestanden. *Korrektur 08.10.: Die Zahl 45 war nicht gezählt,
  sondern geschätzt.* Passwort und Demo-Code hat nur Lukes.

### Für die Entwürfe wichtig

- Anmeldung: Nach „Link schicken" braucht der Bildschirm zwei Wege –
  Link in der Mail antippen **oder** Code eintippen.
- Hochgeladene Dateien sind privat und werden über Links angezeigt, die eine
  Stunde gelten. Vorschaubilder also nachladen, nicht dauerhaft speichern.
- Fehlerarten, nach denen die Oberfläche unterscheiden kann:
  `netz`, `anmeldung`, `rechte`, `eingabe`, `bremse`, `server`.

### Bekannte Grenzen

- `funktionstest.py` scheitert bei „Eigene Probeklausur" – **schon im
  Original** (`EinsSkill/AzubiPass` @ 0feae83) so, nicht durch die Community.
  Eigene Aufgabe, nicht Teil dieses Projekts.
- „Konto löschen" (`supabase/ausstehend/`) wartet auf Lukes' Bestätigung.
- Anmelde-Mails gehen erst an die Klasse, wenn eigener Mailversand (SMTP)
  eingerichtet ist.

---

## 2026-10-08 · Claude → ChatGPT

**Vorheriger Beitrag:** Lukes – Repo angelegt, Rollen festgelegt.
**Rolle:** Umsetzung. **Grundlage:** `main` @ siehe `git log`.
**Nächste Übergabe an:** ChatGPT – Übersicht aller Community-Bildschirme
(`01-uebersicht.md`) und erster Bildschirm „Anmeldung und Profil anlegen"
(`02-anmeldung-profil.md`), beides im Format von `00-vorlage.md`.

### Was schon steht (nicht neu entwerfen, darauf aufbauen)

- Supabase-Projekt `azubipass-social` (Frankfurt). Schema, Regeln und Test
  unter `supabase/` – siehe `supabase/README.md`.
- **Anmeldung:** Link per Mail (kein Passwort). Danach legt man ein **Profil**
  an: Beta-Zugangscode, Anzeigename (2–30 Zeichen, eindeutig), Lehrjahr 1–3
  (optional), Häkchen „mindestens 16", Häkchen „Community-Regeln".
  Ohne Profil sieht man in der Community nichts.
- **Rollen:** `azubi`, `mentor` (vergibt das Team), `team` (nur Datenbank).
- **Lerngruppen:** gründen (Name 3–60, Beschreibung bis 500, offen oder
  geschlossen), beitreten per 8-stelligem Code oder bei offenen Gruppen direkt,
  verlassen. Rollen in der Gruppe: `leitung`, `mitglied`. Max. 10 gegründete
  Gruppen pro Person.
- **Beiträge** (für alle oder für eine Gruppe), drei Arten: `lernzettel`
  (mit Datei Bild/PDF bis 5 MB), `frage`, `tipp`. Titel 3–120, Text bis 4000,
  optional Lernfeld und Kapitel. Fragen können „an Mentor:innen" gehen.
- **Antworten** bis 2000 Zeichen; wer gefragt hat, markiert die **beste
  Antwort** → Frage gilt als gelöst.
- **„Hilfreich"** – eine Markierung pro Person und Beitrag.
- **Wochenaufgaben** (Challenges): von der Gruppenleitung oder vom Team,
  laufen höchstens 31 Tage, man hakt sie als erledigt ab; sichtbar ist, wie
  viele erledigt haben.
- **Melden** mit Grund (falsch, Urheberrecht, Beleidigung, Spam, persönliche
  Daten, sonstiges). Drei Meldungen blenden einen Inhalt automatisch aus, bis
  das Team entscheidet. Team kann aus- und einblenden.
- **Spam-Bremse:** 20 Beiträge / 60 Antworten / 30 Meldungen pro Stunde.

### Grenzen für die Entwürfe

- Eine Designsprache: `PRODUCT.md`, `DESIGN.md`. Waldgrün, Creme, Gold als
  Orientierung; Source Serif 4 / IBM Plex Sans / IBM Plex Mono.
- Keine Emojis, kein Konfetti, keine Punkte/Streaks/Ranglisten-Jagd,
  keine generischen Dashboard-Kacheln, keine erfundenen Kennzahlen.
- Mobil zuerst, Tippziele mindestens 44 × 44 px, Tastatur bedienbar.
- Lernen und Üben bleiben offline nutzbar. **Community braucht Internet** –
  der Offline-Zustand muss entworfen werden.
- Ton: Azubi zu Azubi, direkt, ohne Werbesprache.
- Rechtlich: keine echten IHK-Prüfungsaufgaben hochladen lassen
  (Hinweis beim Upload), Mindestalter 16.

### Offene Fragen an Lukes (bitte in `entscheidungen.md` beantworten)

1. Die App hat heute eine Vierer-Tab-Leiste (Heute, Lernen, Üben, Ich).
   Community als **fünfter Tab** oder ersetzt/erweitert sie einen bestehenden?
2. Soll die Community auf „Heute" auftauchen (z. B. laufende Wochenaufgabe)?
