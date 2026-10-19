# R04-Rest behoben, R06/R07 live · Claude, 19.10.2026

**Auftrag:** oberster Abschnitt in [uebergabe.md](../uebergabe.md) (ChatGPT, `643192d`) und
Freigabe in [entscheidungen.md](../entscheidungen.md#freigabequelle-19102026).
**Vorheriger Beitrag:** ChatGPT, [Gegenprüfung 1289140](2026-10-19-chatgpt-review-1289140.md):
R05–R07 bestätigt, R04-Routenrest offen.
**Rolle:** Claude, Umsetzung und Einspielung. **Rückgabe an:** ChatGPT, gezielte R04-Gegenprüfung,
danach Lukes. **`main`:** unverändert `0c472bb`. **Paket:** zu. **Nicht getan:** Merge, Deployment,
Paketöffnung, Rollenvergabe, `DROP`-Dateien.

| Schritt | Commit | Inhalt |
|---|---|---|
| R04-Rest | `cc6af07` | Dialogabbau beim Verlassen der Community + Regressionstests |
| R06/R07 live + Bericht | dieser Commit | Einspielung, Live-Prüfung, umbenannte Migrationsdateien, Restliste |

**Geprüfter Anwendungsstand:** `quellen/`, `docs/` und `supabase/migrations/` wie in diesem Commit.
`docs/` ist aus `quellen/` gebaut; `app.js` und die vier Community-Module sind bytegleich.
Rohprotokolle: [2026-10-19-claude-r04-live/](2026-10-19-claude-r04-live/).

## 1 · R04-Rest · behoben (`cc6af07`)

**Ursache bestätigt:** Der Bereichsverteiler `quellen/app.js` (`zeige()`) versteckte beim Wechsel
nach Heute, Lernen, Üben oder Ich nur den Community-Schirm. Den Dialogabbau rief er nicht auf.

**Korrektur:** `zeige()` ruft vor jedem Wechsel aus der Community `AP.communityAnsicht.verlassen()`
auf. Das gilt für Tab, Zurück/Vorwärts und direkt gesetzte Adressen. `verlassen()` ist der
vorhandene Dialogabbau aus R04: alle Community-Dialoge schließen, leeren und entfernen, ohne
Folgeaktion. Das betrifft Meldedialog, Bestätigungsfrage, Vorlagen- und Verwerfen-Rückfrage.
Späte Antworten bleiben still, weil die Ansicht nicht mehr sichtbar ist (`ctx.gilt()`), und die
Bindungsprüfung vor jedem Versand bleibt erhalten.

**Abnahme [mock]** (`community_moderation_test.py`, neu im Abschnitt „R04 · Community verlassen“):

- Meldedialog offen / sendend / unklar × `#heute`, `#lernen`, `#ueben`, `#ich` (12 Fälle): Zielbereich
  sichtbar, kein Dialog, alter Hinweis weg; danach angehaltene Antwort freigegeben bzw. verspätetes
  Original ausgeführt; keine Erfolgsmeldung, kein neuer Versand.
- Zurück (`history.back()` nach Heute) und Vorwärts (`history.forward()` nach Lernen), jeweils in allen
  drei Zuständen.
- Offene Bestätigungsfrage „Diesen Inhalt ausblenden?“ → `#ueben`: entfernt, keine Entscheidung.
- Offene Verwerfen-Rückfrage im Moderationsfall → `#ich`: entfernt; zurück in der Community frische
  Fallansicht ohne Folgeformular.
- Offene Verwerfen-Rückfrage im Schreibformular → `#lernen`: entfernt, „Verwerfen“ lief nicht; der
  Entwurf desselben Kontos ist zurück in der Community noch da. Das bisherige Verhalten für Entwürfe
  bleibt damit unverändert.

| Befehl | Ergebnis |
|---|---|
| `AXE_PFAD=… python3 community_moderation_test.py` | **128/128**, axe ohne WCAG-Verstöße in 7 Zuständen ([Log](2026-10-19-claude-r04-live/r04-moderation-mock.log)) |
| `AXE_PFAD=… python3 community_korrekturen_test.py` | **97/97** ([Log](2026-10-19-claude-r04-live/r04-korrekturen-mock.log)) |
| Gegenprobe: dieselben Tests gegen den Build von `1289140` | **52 FEHL**, alle im neuen Routenteil; alle älteren Fälle bestehen dort ([Log](2026-10-19-claude-r04-live/r04-gegenprobe-1289140.log)) |
| `python3 funktionstest.py` (nach der app.js-Änderung) | **269/269** ([Log](2026-10-19-claude-r04-live/funktionstest.log)) |
| `python3 lernkern_audit_test.py` | 52/52 in dieser Umgebung (A09 bei 320 px ohne Überlauf). ChatGPT misst in seiner Umgebung 51/52 (1 px in unverändertem `buchfuehrung.html#k6`); Abweichung der Umgebung, nicht durch dieses Paket ([Log](2026-10-19-claude-r04-live/lernkern.log)) |
| `python3 pruefe.py --schnell` (alle Seiten, Handy, hell) | keine Fehler; nur die bekannten Hinweise auf offene Prüf-Marker in Lernfeldern ([Log](2026-10-19-claude-r04-live/pruefe-schnell.log)) |

## 2 · R06/R07 · live eingespielt

**Vorher:** 42 Migrationen live, identisch mit dem Repo bis `20261015130848`; die drei neuen fehlten.

**Eingespielt** in der freigegebenen Reihenfolge, Inhalt Wort für Wort aus dem Repo. Das Werkzeug
vergibt eigene Versionsnummern; die Dateien sind entsprechend umbenannt, der Inhalt ist unverändert:

| vorher im Repo | live und jetzt im Repo |
|---|---|
| `20261019120000_entscheiden_wiederholung_1.sql` | `20261019133804_entscheiden_wiederholung_1.sql` |
| `20261019120005_entscheiden_wiederholung_2.sql` | `20261019133825_entscheiden_wiederholung_2.sql` |
| `20261019120100_meldebremse_konto.sql` | `20261019133843_meldebremse_konto.sql` |

`konkurrenz.py` nutzt für die Gegenprobe die neuen Grenzen; `r06 r07` erneut 19/19 lokal, `--alt` zeigt
weiter die alten Fehler.

**Live-Prüfung (Supabase, 19.10.2026):**

| Prüfung | Ergebnis |
|---|---|
| Migrationsliste | 45 Einträge = 45 Dateien im Repo, gleiche Versionen und Namen |
| Funktionsdefinitionen `mod_gleicher_vorgang`, `moderation_entscheiden`, `meldung_senden` | md5 von `pg_get_functiondef` live = lokal (aufgebaut aus allen 45 Dateien) |
| `moderation_test.sql`, Live-Fassung mit Rollback (vier Lösch-Prüfungen ausgelassen: das Werkzeug bricht Anweisungen mit `DELETE` ab) | ERGEBNIS ohne FEHLER, u. a. `andereAktion=APV01 andereArt=APV01 anderesZiel=APV01 bremse=APB01 bremseWiederholt=false`, **Invariante 0** ([Log](2026-10-19-claude-r04-live/live-moderation-test.log)) |
| Rückstände des Tests | Testcode 0, Testkonten 0, Meldungen 0, Entscheidungen 0 (Rollback wirksam) |
| Rechte | `mod_gleicher_vorgang` für `anon`/`authenticated` nicht ausführbar; `meldung_senden`, `moderation_entscheiden` weiter nur `authenticated` |
| Paketsperre | `freigabe.beitraege.offen = false` |
| Invariante Ausblendung ⇔ versteckt (Beiträge und Antworten) | 0 |
| Sicherheitsberater (Advisors) | keine neuen Hinweise durch R06/R07; bestehende Hinweise betreffen bewusst freigegebene RPCs und das deaktivierte Passwort-Leak-Prüfen (Anmeldung läuft ohne Passwort über Mail-Link) |

**Nicht live geprüft:** gleichzeitige Aufrufe (nur lokal mit echten Verbindungen, 58/58 bzw. 19/19),
Livetests mit Konten und G06 über die Storage-API (kein Testpasswort in der Sitzung).

## 3 · Aktualisierte Restliste für Lukes

Erledigt seit dem letzten Bericht: **R06/R07 eingespielt und live geprüft**, **R04 vollständig**
(vorbehaltlich ChatGPTs Gegenprüfung).

| Punkt | Aktueller Stand | Nächste konkrete Aktion | Wer | Vor Klassenöffnung? |
|---|---|---|---|---|
| **E13 Teamkonto** | Kein Konto genannt; live hat nur ein Testkonto die Rolle `team` | Mailadresse deines Kontos nennen (braucht ein Community-Profil). Ich setze dann `rolle = 'team'` und, solange das Paket zu ist, die Testerfreigabe | Lukes → Claude | **ja** |
| **Mailversand** | Eingebauter Supabase-Dienst: nur an Adressen des eigenen Organisationsteams, 2 Mails/Stunde. Eigener SMTP-Zugang nicht belegt | Anbieter wählen (im Second Brain vorgemerkt: Gmail mit App-Passwort, `smtp.gmail.com:587`) und im Dashboard eintragen: Authentication → SMTP Settings. Danach Anmeldung an eine echte Klassenadresse testen | Lukes | **ja** |
| **Kontotests und Storage** | Nicht gelaufen | `COMMUNITY_TEST_PASSWORT` (dazu `COMMUNITY_TEST_CODE`, für den Zugangstest `COMMUNITY_TEST_NEU`) in einer Sitzung als Umgebungsvariable setzen, nicht in den Chat. Ich führe die vier Livetests aus | Lukes → Claude | **ja** |
| **Datenschutzangaben** (`quellen/rechtliches.json`) | Offen: Anschrift, Kontakt-E-Mail, Supabase-Vertragspartner, Garantien, Maildienst, drei Fristen | Anschrift, Kontakt-E-Mail, Fristen und Mailanbieter festlegen. Vorschlag zum Prüfen gegen den eigenen Account: Supabase Pte. Ltd (Singapur), EU-Standardvertragsklauseln laut aktuellem DPA | Lukes | **ja** |
| **Ergänzte Texte** | Liste unverändert: [ergaenzte-texte.md](2026-10-19-claude-abschluss/ergaenzte-texte.md) | Liste A bestätigen oder einzelne Zeilen geändert zurückgeben | Lukes | ja (Liste A) |
| **`moderieren_entfernen.sql`** | Alte Funktion live für `anon`/`authenticated` nicht ausführbar | Spätere Bereinigung | Lukes → Claude | nein |
| **Offene Prüf-Marker in Lernfeldern** | Hinweise aus `pruefe.py`, nicht Teil des Community-Pakets | Inhaltlich prüfen, wenn Zeit ist | Lukes | nein |
| **Veröffentlichung** | Zielcommit: dieser Commit oder ein Folgecommit nach ChatGPTs Gegenprüfung | ① ChatGPT-Gegenprüfung R04 ② E13, SMTP, Datenschutz, Livetests ③ Merge `community-zugang` → `main` (GitHub Pages geht sofort live) ④ Paket öffnen: `update public.freigabe set offen = true where schalter = 'beitraege'`. ③ und ④ nur mit gesonderter Freigabe | Lukes gibt frei, Claude führt aus | ③ ④ sind die Öffnung |

## 4 · Nächster Schritt

ChatGPT prüft gezielt den R04-Routenrest (`cc6af07`) und den Live-Stand von R06/R07 auf diesem
Commit. Danach entscheidet Lukes die Restliste oben.
