# Funktionen bis Freitag · Claude, 20.10.2026

**Auftrag:** Lukes im Chat (20.10.): Lerngruppen, Wochenaufgaben, Hilfreich-Knopf und die Auswahl
Industriekaufleute bis Freitag, damit die Klasse den Bereich echt nutzt. Ablauf **Schnellweg**: Claude baut
direkt nach [01-uebersicht.md](../01-uebersicht.md), ChatGPT prüft einmal am Ende.
**Vorheriger Beitrag:** Claude, E13 vollzogen (`f0169a6`). **Rolle:** Umsetzung.
**Rückgabe an:** ChatGPT (ein Gesamtreview), danach Lukes.
**`main`:** unverändert `cd4d6cf` (Merge #2). **Paket:** zu. **Nicht getan:** Merge, Paketöffnung, `DROP`-Dateien,
Einträge in `entscheidungen.md`.

| Commit | Inhalt |
|---|---|
| `5ce71b2` | Datenbank: Beruf, Gruppenbeiträge per RPC, Gruppeninhalte in der zentralen Moderation (live eingespielt) |
| `8ad228c` | Oberfläche: Lerngruppen, Wochenaufgaben, Hilfreich |
| `5e78d07` | Oberfläche: Ausbildung Industriekaufleute |
| dieser Commit | Live-Test, Bericht, Übergabe |

Rohprotokolle: [2026-10-20-claude-freitag/](2026-10-20-claude-freitag/).

## 1 · Was neu ist

**Lerngruppen** (C07–C10, C16): Übersicht „Meine Gruppen“ und offene Gruppen, gründen (offen oder mit Code),
mit Code beitreten, Gruppenseite mit Beiträgen, Wochenaufgaben, Code (nur für Gründende sichtbar), Mitgliedern
und „Gruppe verlassen“ (Rückfrage im registrierten Dialog). In Gruppen nur **Frage** und **Tipp**, keine
Lernzettel und keine Dateien. Gruppenbeiträge laufen über die neue RPC `gruppe_beitrag_veroeffentlichen` mit
Vorgangskennung (Wiederholung liefert denselben Beitrag) und Kontobindung wie beim normalen Veröffentlichen.
Lokale Navigation „Beiträge | Lerngruppen“ oben in der Community.

**Wochenaufgaben** (C11, C12): Gründende stellen Aufgaben in ihrer Gruppe, das Team zusätzlich „für alle“
(`gruppe_id = null`). Mitglieder haken ab; Zähler „x erledigt“. Heute zeigt die nächste offene Aufgabe.

**Hilfreich:** Umschaltknopf mit `aria-pressed` („Als hilfreich markieren“ / „Hilfreich markiert“) und Zähler;
der Stand wird nach jeder Änderung oder jedem Fehler neu geladen statt geraten.

**Industriekaufleute:** `profil.beruf` und `beitrag.beruf` (`kfb` | `ik`), Beruf wird beim Anlegen eines Beitrags
per Trigger aus dem Profil übernommen. Auswahl „Ausbildung“ bei der Profilanlage und im Profil änderbar.
IK-Beiträge tragen keine Kapitel (Constraint). Lernfeldliste für IK: die 13 Lernfelder des KMK-Rahmenlehrplans
vom 15.12.2023 (`LERNFELDER_IK` in `quellen/community-beitraege.js`). **Platzhalter:** Lukes bereitet eigene
Lernfelder mit ChatGPT vor; die Liste wird dann ersetzt, die IDs `lf1`–`lf13` können bleiben. IK-Beiträge haben
keinen Link nach „Lernen“, weil es dort noch keine IK-Inhalte gibt. Filter: beide Ausbildungen wählbar, eigene zuerst.

**Moderation:** Gruppeninhalte erscheinen jetzt in der zentralen Moderation (vorher ausgefiltert) und lassen
sich wie andere Inhalte entscheiden.

## 2 · Prüfungen

| Art | Befehl / Ort | Ergebnis |
|---|---|---|
| **live** | `gruppen_test.sql` ohne die `DELETE`-Zeile (Hilfreich zurücknehmen), Rollback | ERGEBNIS ohne FEHLER ([Log](2026-10-20-claude-freitag/live-gruppen-test.log)); Rückstände 0, Paket zu, 50 Migrationen = 50 Dateien |
| lokal | alle vier SQL-Suiten (PostgreSQL 16, Grundlage + 50 Migrationen) | ohne FEHLER (Stand `5ce71b2`) |
| mock | `community_gruppen_test.py` (neu) | **38/38**, axe ohne WCAG-Verstöße ([Log](2026-10-20-claude-freitag/gruppen-mock.log)) |
| mock | `community_korrekturen_test.py` | **97/97** ([Log](2026-10-20-claude-freitag/korrekturen-mock.log)) |
| mock | `community_moderation_test.py` | **128/128** ([Log](2026-10-20-claude-freitag/moderation-mock.log)) |
| lokal | `funktionstest.py` | **269/269** ([Log](2026-10-20-claude-freitag/funktionstest.log)) |
| lokal | `lernkern_audit_test.py`, `pruefe.py --schnell` | in Ordnung / keine Fehler ([Log](2026-10-20-claude-freitag/lernkern.log), [Log](2026-10-20-claude-freitag/pruefe-schnell.log)) |

**Nicht geprüft:** Oberfläche gegen die echte Datenbank mit echten Konten (kein Testpasswort in der Sitzung);
„Hilfreich zurücknehmen“ live (nur lokal); Konkurrenz für Gruppen (nur Vorgangskennung lokal).

**Bekannte Grenze:** Gruppe gründen ist nicht idempotent. Bei unklarem Ausgang sagt die Oberfläche „Prüfe deine
Gruppen, bevor du es erneut versuchst“ statt automatisch zu wiederholen.

## 3 · Was für Freitag noch fehlt (Lukes)

| Punkt | Aktion | Wer |
|---|---|---|
| **Merge** | `community-zugang` → `main` über https://github.com/EinsSkill/AzubiPass-Social/compare/main...community-zugang (GitHub Pages geht sofort live; Datenbank ist schon live und rückwärtsverträglich) | Lukes |
| **Mailversand Brevo** | Konto anlegen → Absender bestätigen → SMTP-Schlüssel unter *Settings → SMTP & API* → in Supabase *Authentication → Emails → SMTP Settings*: Host `smtp-relay.brevo.com`, Port `587`, Benutzer = der dort angezeigte SMTP-Login, Passwort = SMTP-Schlüssel (nicht API-Schlüssel). Danach Rate Limit für Mails auf Klassengröße prüfen und an eine echte Klassenadresse testen. Ohne eigene Domain ist ein Spam-Ordner möglich | Lukes |
| **Datenschutz** (`quellen/rechtliches.json`) | Anschrift, Kontakt-E-Mail, Fristen; Maildienst jetzt Brevo (Sendinblue SAS, Paris) | Lukes → Claude trägt ein |
| **Paket öffnen** | `update public.freigabe set offen = true where schalter = 'beitraege'` – nur mit gesonderter Freigabe | Lukes gibt frei, Claude führt aus |
| **IK-Lernfelder** | Eigene Liste aus dem ChatGPT-Chat übergeben | Lukes → Claude |
| **Codefeld** | Erzwingt Großbuchstaben; ändern? | Lukes entscheidet |

## 4 · Nächster Schritt

ChatGPT prüft einmal gesamt `5ce71b2`…dieser Commit (Schnellweg). Danach Merge und Brevo durch Lukes.
