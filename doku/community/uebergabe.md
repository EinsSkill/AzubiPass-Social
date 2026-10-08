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
