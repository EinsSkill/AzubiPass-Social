# Abschluss Claude · R04–R07 und Abnahmestand Klassen-Beta (19.10.2026)

**Auftrag:** [2026-10-19-chatgpt-auftrag-abschluss-r04-r07.md](2026-10-19-chatgpt-auftrag-abschluss-r04-r07.md)
auf `a936ed2`/`68ca76c`. **Rolle:** Claude – Umsetzung und Abnahme. **Rückgabe an:** ChatGPT –
gezielte Gegenprüfung der Korrekturen und betroffenen Regressionen; danach Lukes.
**Branch:** `community-zugang`. **`main`:** unverändert `0c472bb`. **Nicht getan:** Merge,
Deployment, Paketöffnung, Rollenvergabe, `DROP`-Dateien, Einspielung der neuen Migrationen.

| Stufe | Commit | Inhalt |
|---|---|---|
| 1 | `9a9bb60` | R04, R05 (Client) + Regressionstests + Gegenprobe |
| 2 | `b8055a0` | R06, R07 (drei neue Migrationen, nicht live) + SQL-/Konkurrenztests + Gegenprobe |
| 3 | dieser Commit | `docs/` neu gebaut, Gesamtprüfung, Bericht, Restliste, Übergabe |

**Geprüfter Anwendungsstand:** `quellen/` und `supabase/` wie in `b8055a0`; `docs/` in diesem
Commit daraus gebaut (Abweichung zu `b8055a0` nur Build-Zeitstempel und Cache-Kennung in
`sw.js`, `inhalt.json`, `aufgaben.json`). Die vier Community-Module sind in `quellen/` und
`docs/mittel/` bytegleich; Logo-Dateien unverändert.

Rohprotokolle: [2026-10-19-claude-abschluss/](2026-10-19-claude-abschluss/).

## 1 · Befunde und Korrekturen

### R04 · hoch · bestätigt und behoben (`9a9bb60`)

**Ursache wie im Review:** Dialoge hängen an `document.body`, `vergessen()` ließ sie offen, der
Meldedialog prüfte die Bindung erst nach dem Aufruf, die Datenschicht band an das *dann*
angemeldete Konto.

**Korrektur:**
- `community-ansicht.js`: Dialogregister `AP.communityDialoge`. `vergessen()` (Abmelden,
  Kontowechsel) und jeder Ansichtsaufbau (`zeichnen()`, also auch Offline und Routenwechsel)
  schließen alle Dialoge, leeren ihren Inhalt und entfernen sie. Ihre close-Handler laufen
  danach **ohne Folgeaktion** (kein Senden, Verwerfen, Bestätigen, keine Vorlagen-Rückstellung).
  Gilt für Meldedialog, Bestätigungs- und Vorlagen-Rückfragen, Verwerfen-Rückfrage, Regeldialog.
- `community-moderation.js`: Bindungsprüfung `ctx.gilt()` **vor** jedem Versand, jeder
  Wiederholung, jedem Status-/Klärschritt und vor dem Ausführen einer Bestätigung; ein spätes
  Ergebnis setzt keine Erfolgsmeldung für eine neue Ansicht.
- `community.js`: Schreibaufrufe (`meldungSenden`, `entscheiden`, `pruefanfrageSenden`,
  `vorgangKlaeren`) tragen das erwartete Konto. Ist ein anderes angemeldet, wird **nichts
  gesendet** (`veraltet`).

**Grenze (bewusst):** Ein offener Meldedialog schließt auch bei Offline, Routenwechsel oder der
Neuprüfung nach über einer Minute im Hintergrund; ein ungesendeter Hinweis geht dabei verloren.
Doppelte Meldungen entstehen dadurch nicht (Server erkennt die vorhandene Meldung).

### R05 · mittel · bestätigt und behoben (`9a9bb60`)

**Korrektur:** Ein Vorgang pro Fall. `formular()` meldet seinen Zustand an die Fallansicht.
Während `sendet`, `unklar`, `pruefen`, `klaeren` sind alle oberen Fallaktionen gesperrt, mit
sichtbarem Hinweis; der Klick-Handler prüft zusätzlich selbst. Kennung und fester Versandstand
bleiben, bis „Status prüfen“ den Erfolg findet oder „Eingaben ändern“ über `vorgang_klaeren`
`verworfen` bestätigt; erst dann entsteht beim nächsten Senden eine neue Kennung.
Aktionswechsel und „Abbrechen“ mit ungesendeten Eingaben fragen „Deine Eingaben wurden noch
nicht gesendet. Möchtest du sie verwerfen?“ (vorhandener Dialog).

### R06 · mittel · bestätigt und behoben (`b8055a0`, nicht live)

Zusätzlich gefunden: Auch der **erste** Wiederholungszweig prüfte die Zielart nicht
(`coalesce(beitrag_id, antwort_id) = p_ziel`) – gleiche Kennung mit `art = 'antwort'` und der
Beitrags-ID meldete sequentiell Erfolg. Beide Zweige nutzen jetzt `mod_gleicher_vorgang`
(Konto, Aktion, Ziel-ID, Zielart), sonst `APV01`. Details: [06-korrektur-r06-r07.md](../06-korrektur-r06-r07.md).

### R07 · mittel · bestätigt und behoben (`b8055a0`, nicht live)

Advisory-Kontosperre in `meldung_senden` nach Thread-Sperre und R02-Nachsuche, direkt vor
Zählung und Anlage. Sperrreihenfolge Thread → Konto, kein anderer Weg nimmt die Kontosperre →
kein Zyklus. Details und Begründung: [06-korrektur-r06-r07.md](../06-korrektur-r06-r07.md).

## 2 · Prüfbelege (getrennt nach Art)

### Browser mit nachgebildeter Schnittstelle [mock] – echte Module, keine echte Datenbank

| Befehl | Ergebnis |
|---|---|
| `AXE_PFAD=… python3 community_moderation_test.py` | **88/88**, axe ohne WCAG-Verstöße in 7 Zuständen ([Log](2026-10-19-claude-abschluss/stufe3-moderation.log)) |
| `AXE_PFAD=… python3 community_korrekturen_test.py` | **97/97** ([Log](2026-10-19-claude-abschluss/stufe3-korrekturen.log)) |
| Gegenprobe: neue Moderationstests gegen gebauten Stand `8273f7b` | R04: 19 Prüfungen FEHL, darunter Versand von Annas Hinweis mit Bens Konto; R05: 4 FEHL, danach Abbruch (Rückfrage fehlt am alten Stand) ([Log](2026-10-19-claude-abschluss/stufe1-gegenprobe-8273f7b.log)) |

Neu im Moderationstest: R04 als Matrix offen/sendend/unklar × Abmelden/direkter Kontowechsel
über die registrierten Auth-Callbacks (`SIGNED_OUT`/`SIGNED_IN`, `getSession`/`getUser` liefern
danach das neue Konto bzw. keins), späte Antworten freigegeben bzw. verspätet ausgeführt;
Datenschicht-Bindung; Bestätigungs- und Vorlagen-Rückfrage bei Kontowechsel; Offline. R05:
angehaltene Antwort, unklarer Ausgang mit allen drei oberen Aktionen (auch erzwungen),
„Erneut senden“ mit gleicher Kennung, `verworfen` → neue Kennung, Verlustschutz.
**Timingfix Vorlagen-Abbrechen:** wartet jetzt, bis der Dialog entfernt ist **und** der Fokus
auf der Vorlagenauswahl liegt – das setzt der close-Handler erst nach dem Zurückstellen.
Keine Wartezeit, Erwartung unverändert.

### Echte Datenbank lokal – PostgreSQL 16.15, Grundlage + alle 45 Migrationsdateien

| Befehl | Ergebnis |
|---|---|
| `psql -f supabase/tests/moderation_test.sql` (+ `andereArt`, `anderesZiel`) | ERGEBNIS-Rollback ohne FEHLER, beide `APV01`, Invariante 0 |
| `regeln_test.sql`, `korrekturen_g03_g05_test.sql` | ERGEBNIS-Rollback ohne FEHLER ([Log](2026-10-19-claude-abschluss/stufe2-sql-tests-lokal.log)) |
| `python3 supabase/tests/lokal/konkurrenz.py g06 r03 moderation r06 r07` | **58/58** ([Log](2026-10-19-claude-abschluss/stufe2-konkurrenz-lokal.log)) |
| dasselbe `r06 r07 --alt` (Stand vor den neuen Migrationen) | R06: anderes Ziel / andere Zielart ⇒ `wiederholung=True`; R07: kein Warten, **32** Meldungen ([Log](2026-10-19-claude-abschluss/stufe2-gegenprobe-r06-r07.log)) |
| `g06 r03 moderation --alt` | erwartete Altbefunde ([Log](2026-10-19-claude-abschluss/stufe2-gegenprobe-bestehend.log)); `moderation --alt` baut jetzt korrekt den Stand vor Spec 06 |

### Live-Datenbank (nur lesend, 19.10.2026)

42 Migrationen live, identisch mit den 42 bis `20261015130848` im Repo; die drei neuen fehlen
dort wie beabsichtigt (`mod_gleicher_vorgang` nicht vorhanden, `meldung_senden` ohne
Kontosperre). Paket `beitraege`: **zu**. Testerfreigaben: 3. Profile mit Rolle `team`: 1
(Testkonto). Alte Funktionen `moderieren` und `beste_antwort`: Ausführen nur für `postgres`
und `service_role`, nicht für `anon`/`authenticated`. Meldungen live: 0. Invariante
Ausblendung ⇔ versteckt (Beiträge): 0.

### Build und Gesamtprüfung (lokal)

| Befehl | Ergebnis |
|---|---|
| `python3 build_app.py` | erfolgreich; Warnung: Datenschutzangaben unvollständig (siehe Restliste) |
| `python3 funktionstest.py` | **269/269** (voller Lauf, inkl. Build-Reproduzierbarkeit) |
| `python3 lernkern_audit_test.py` | **52/52** |
| `python3 pruefe.py --schnell` (alle Seiten, Handy, hell) | keine Fehler; Hinweise: offene Prüf-Marker in lf1, lf2, lf3, lf4, lf9, lf12 (Lerninhalte, von diesem Paket nicht berührt) |
| `pruefe.py` voller Lauf (beide Größen, beide Stimmungen) | **nicht ausgeführt** – brach am 15.10. am 15-Minuten-Limit dieser Umgebung ab |

### Nicht ausgeführt (fehlender Zugang)

| Test | Fehlender Zugang | Unbelegte Aussage |
|---|---|---|
| `community_test.py`, `community_zugang_test.py`, `community_beitraege_test.py`, `community_schreiben_test.py` | `COMMUNITY_TEST_PASSWORT` (und `COMMUNITY_TEST_CODE`, `COMMUNITY_TEST_NEU`) in dieser Sitzung nicht vorhanden | Spec-06-Weg mit echten Konten gegen Supabase; umgestellte Aufrufe (`meldungSenden`, `entscheiden`) live |
| G06 über die Storage-API (in `community_schreiben_test.py`) | dasselbe Passwort | Dateischutz Ende zu Ende über `storage/v1`; belegt ist nur die Datenbankseite |

## 3 · Gebündelte Restliste für Lukes

Bereits erledigt und hier nicht erneut gefragt: Freigaben G06/R03/Spec 06 (E1–E12, E14), die
vier Texte vom 15.10., Logo.

| Punkt | Aktueller Beleg / Status | Nächste konkrete Aktion | Wer | Vor Klassenöffnung? |
|---|---|---|---|---|
| **R06/R07 einspielen** | Lokal geprüft, live nicht vorhanden | Nach ChatGPT-Gegenprüfung: Lukes schreibt „R06/R07 einspielen“. Claude spielt die drei Dateien ein und führt `moderation_test.sql` live aus | Lukes → Claude | **ja** |
| **E13 Teamkonto** | Keine Konto-ID/Mailadresse genannt; live hat nur ein Testkonto Rolle `team` | Lukes nennt die Mailadresse seines Kontos (es braucht ein Community-Profil). Claude setzt dann `rolle = 'team'` und, solange das Paket zu ist, die Testerfreigabe (sonst sperrt die Moderation mit `APP01`) | Lukes → Claude | **ja** |
| **Mailversand** | Laut [Supabase-Doku](https://supabase.com/docs/guides/auth/auth-smtp) schickt der eingebaute Dienst nur an Adressen des eigenen Organisationsteams, höchstens 2 Mails pro Stunde. Ein eigener SMTP-Zugang ist nicht belegt | Lukes wählt einen Anbieter (im Second Brain vermerkt: Gmail mit App-Passwort, `smtp.gmail.com:587`) und trägt ihn im Supabase-Dashboard ein: Authentication → SMTP Settings. Danach eine Anmeldung an eine echte Klassenadresse testen | Lukes | **ja** |
| **Kontotests und Storage** | Nicht gelaufen, Passwort fehlt | Lukes setzt in einer Sitzung `COMMUNITY_TEST_PASSWORT` (nicht in den Chat, nicht ins Repo). Claude führt die vier Livetests aus | Lukes → Claude | **ja** |
| **Datenschutzangaben** (`quellen/rechtliches.json`) | Offen: Anschrift, Kontakt-E-Mail, Supabase-Vertragspartner, Garantien, Maildienst, drei Fristen | Lukes gibt Anschrift und Kontakt-E-Mail an, entscheidet die Fristen und den Mailanbieter. Vorbereiteter, technisch belegbarer Wert (bitte gegen den eigenen Account prüfen): Vertragspartner laut [Supabase-DPA](https://supabase.com/legal/customer-resources/data-processing-addendum) (Fassung 1. August 2026, abgerufen 19.10.): **Supabase Pte. Ltd, 65 Chulia Street #38-02/03, OCBC Centre, Singapur 049513**; Garantien: **EU-Standardvertragsklauseln** (Durchführungsbeschluss (EU) 2021/914, Modul 2), Teil des DPA; Datenbankregion Frankfurt (eu-central-1). Keine Rechtsberatung, keine Rechtsfreigabe | Lukes | **ja** (die Seite warnt sonst sichtbar) |
| **Ergänzte Texte** | Liste A (8 inhaltliche Texte) sowie B/C (Beschriftungen und Zustände): [ergaenzte-texte.md](2026-10-19-claude-abschluss/ergaenzte-texte.md) | Lukes bestätigt die Liste oder gibt einzelne Zeilen geändert zurück | Lukes | ja (Liste A) |
| **`moderieren_entfernen.sql`** | Alte Funktion live ohne Ausführungsrecht für `anon` und `authenticated`. Die Beta ist dadurch schon abgesichert | Bereinigung später nach Bestätigung | Lukes → Claude | nein, spätere Bereinigung |
| **Offene Prüf-Marker in Lernfeldern** | 8 Hinweise aus `pruefe.py` in lf1, lf2, lf3, lf4, lf9, lf12, nicht Teil des Community-Pakets | Inhaltlich prüfen, wenn Zeit ist | Lukes | nein |
| **Veröffentlichung** | Zielcommit: dieser Abschlusscommit (oder ein Folgecommit nach Gegenprüfung und Einspielung) | Reihenfolge: ① ChatGPT-Gegenprüfung ② R06/R07 einspielen + Livetest ③ E13, SMTP, Datenschutz ④ Merge `community-zugang` → `main` (GitHub Pages geht sofort live) ⑤ Paket öffnen: `update public.freigabe set offen = true where schalter = 'beitraege'`. ④ und ⑤ jeweils nur mit gesonderter ausdrücklicher Freigabe | Lukes gibt frei, Claude führt aus | ④ ⑤ sind die Öffnung |

## 4 · Nächster Schritt

ChatGPT prüft gezielt R04–R07 und die betroffenen Regressionen auf diesem Commit. Danach
entscheidet Lukes die Restliste oben in einer Antwort.
