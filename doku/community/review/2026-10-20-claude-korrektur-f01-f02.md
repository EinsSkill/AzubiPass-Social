# Korrektur F01, F02, H01 · Claude, 20.10.2026

**Auftrag:** [Review c9e15a7](2026-10-20-chatgpt-review-c9e15a7.md) (ChatGPT): F01 und F02 gezielt beheben,
H01 im Bericht richtigstellen. **Vorheriger Beitrag:** ChatGPT, `a4642b1`; dazwischen Claude, Lernstand am
Konto (`a5998c2`). **Rolle:** Umsetzung. **Rückgabe an:** ChatGPT, gezielte Gegenprüfung (F01/F02 und
Lernstand). **`main`:** unverändert `cd4d6cf`. **Paket:** zu. **Nicht getan:** Merge, Paketöffnung,
neue Produktentscheidung zu H01.

Rohprotokolle: [2026-10-20-claude-f01-f02/](2026-10-20-claude-f01-f02/).

## F01 · Heute-Wochenaufgabe · behoben

`quellen/community-gruppen.js` (`heuteAufgabe`), `quellen/community.js` (`aufgaben`, `aufgabe`):

- `aufgaben()`/`aufgabe()` laufen jetzt über `gebunden()` statt `mit()` (Konto und Generation; optional an ein
  bestimmtes Konto gebunden).
- Heute fragt nur nach, wenn eine Sitzung besteht, ein **Profil** vorhanden und **`beitraege_frei()`** wahr ist.
- Jede Antwort wird nur angezeigt, wenn Lauf, Konto/Generation (Bindung nach dem Laden der Sitzung), Block im
  Dokument und Onlinestatus noch stimmen.
- **Abmelden** (`SIGNED_OUT`, auch über `vergessen()` beim Kontoverlust) und **Offline** leeren jeden
  Heute-Block sofort; **Anmeldung/Kontowechsel** (`SIGNED_IN`), **wieder online** und **Rückkehr in die App**
  laden mit neu geprüften Rechten.
- Fehler: „Die Wochenaufgabe konnte nicht geladen werden.“ mit **Erneut versuchen**.

**Abnahme [mock]** (`community_gruppen_test.py`, Abschnitt „Heute · F01“): Abmelden leert; Kontowechsel leert
sofort; Offline leert, wieder online lädt neu; späte Antwort nach Abmelden bzw. Offline zeigt nichts; ohne
Profil keine Aufgabenabfrage; Paket zu: keine Aufgabe; Fehler → Erneut versuchen lädt.
**Gegenprobe:** dieselben Tests gegen den Build von `c9e15a7`: **7 FEHL** im F01-Abschnitt, danach Abbruch
(kein „Erneut versuchen“) ([Log](2026-10-20-claude-f01-f02/gegenprobe-c9e15a7.log)).

## F02 · Paketsperre für Gruppen und Wochenaufgaben · behoben und live

`supabase/migrations/20261020094755_paketsperre_gruppen.sql` (nur `alter policy`) und
`20261020094802_paketsperre_gruppen_rpc.sql` (`create or replace`, sonst Wort für Wort wie bisher):

| Weg | vorher | jetzt |
|---|---|---|
| `gruppe` lesen / Leitung ändert | Profil | + `beitraege_frei()` |
| `gruppe_code` lesen | Mitglied | + `beitraege_frei()` |
| `mitglied` lesen / offener Gruppe beitreten / Rollen | Profil bzw. Leitung | + `beitraege_frei()` |
| `wochenaufgabe` lesen / stellen / ändern | Profil, Leitung, Team | + `beitraege_frei()` |
| `erledigt` abhaken | eigene, laufende Aufgabe | + `beitraege_frei()`; lesen hängt an „Aufgabe sichtbar“ |
| `gruppe_gruenden`, `gruppe_beitreten` | Profil | + `beitraege_frei()` (Fehlermeldung „Lerngruppen sind für die Klassen-Beta noch nicht freigeschaltet.“) |
| Views `gruppe_liste`, `aufgabe_liste` | security_invoker | erben die Regeln |
| **bewusst ohne Sperre** | | austreten (`gruppe_verlassen`, eigene Mitgliedschaft löschen), Gruppe/Aufgabe löschen, eigenes Erledigt zurücknehmen |

Wie bei Beiträgen gilt die Sperre auch für das Team; ausgenommen ist nur `beitraege_tester`. Lukes ist Tester.

**Prüfungen**

| Art | Ergebnis |
|---|---|
| lokal, `paketsperre_gruppen_test.sql` (neu) | ohne FEHLER: Nicht-Tester bei geschlossenem Paket kann weder gründen noch beitreten (P0001), sieht 0 Gruppen/Codes/Mitglieder/Aufgaben/Erledigt, kann nicht abhaken oder offener Gruppe beitreten (42501), **austreten geht**; Team ohne Testerfreigabe kann keine Aufgabe stellen; nach Öffnung gehen dieselben Wege; nach erneutem Schließen 0, Tester weiter 3 ([Log](2026-10-20-claude-f01-f02/sql-paketsperre_gruppen_test.log)) |
| lokal, Gegenprobe ohne die zwei Migrationen | Nicht-Tester tritt der geschlossenen Gruppe bei (Test bricht an der doppelten Mitgliedschaft ab) |
| lokal, übrige fünf SQL-Suiten | ohne FEHLER |
| **live**, `paketsperre_gruppen_test.sql` **ohne Öffnungsteil** (das Paket wird live auch nicht in einer zurückgerollten Transaktion geöffnet) | `paketZu=1 testerSieht=1 frei=false gruenden=P0001 beitreten=P0001 gruppen=0 codes=0 mitglieder=0 aufgaben=0 erledigt=0 abhaken=42501 austretenGeht=true offenBeitreten=42501 teamAufgabe=42501 teamGruppen=0` |
| **live**, Gruppen-Kernablauf mit Testern | `code=true bensBeitritt=1 geschlossenFremd=0 mitgliedSieht=1 erledigt=1/true klassenaufgabe=1` |
| live, danach | Testcodes 0, Testkonten 0, Paket zu, 53 Migrationen = 53 Dateien |

## H01 · berichtigt

Der Gruppencode ist für **alle Mitglieder** sichtbar (bestehende RLS `gruppe_code: nur Mitglieder`), nicht nur für
Gründende. [Freitag-Bericht](2026-10-20-claude-freitag-funktionen.md) korrigiert. Keine Änderung am Verhalten;
eine Beschränkung auf die Leitung wäre eine Entscheidung für Lukes.

## Gesamtlauf nach allen Änderungen

| Befehl | Ergebnis |
|---|---|
| `community_gruppen_test.py` [mock] | **47/47** (38 + 9 F01), axe ohne WCAG-Verstöße |
| `lernstand_sync_test.py` [mock] | **33/33** |
| `community_korrekturen_test.py` / `community_moderation_test.py` [mock] | **97/97** / **128/128** |
| sechs SQL-Suiten lokal, 53 Migrationen | ohne FEHLER |
| `funktionstest.py` / `lernkern_audit_test.py` / `pruefe.py --schnell` | **269/269** / in Ordnung / keine Fehler |

Logs: [2026-10-20-claude-f01-f02/](2026-10-20-claude-f01-f02/).
