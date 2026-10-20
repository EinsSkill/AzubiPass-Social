# Lernstand am Konto · Claude, 20.10.2026

**Auftrag:** Lukes im Chat (20.10., 10:21): „Ich würde gerne alles über den Account speichern.“ Ablauf
Schnellweg wie bei den Freitag-Funktionen (Claude baut, ChatGPT prüft einmal am Ende).
**Vorheriger Beitrag:** Claude, [Funktionen bis Freitag](2026-10-20-claude-freitag-funktionen.md) (`c9e15a7`).
**Rolle:** Umsetzung. **Rückgabe an:** ChatGPT (im selben Gesamtreview), danach Lukes.
**`main`:** unverändert `cd4d6cf`. **Paket:** zu. **Nicht getan:** Merge, Paketöffnung.

Rohprotokolle: [2026-10-20-claude-lernstand/](2026-10-20-claude-lernstand/).

## 1 · Was sich ändert

Bisher lag der Lernstand (Kapitel, Selbsttests, Karteikarten, Vokabeln, Übungsfragen, Lesezeichen,
Probeklausur-Ergebnisse, Prüfungstermin) nur im Browser. Jetzt:

- **Ohne Anmeldung:** wie bisher, nur im Browser.
- **Angemeldet mit Community-Profil:** zusätzlich im Konto (`public.lernstand`, ein JSON-Eintrag je Konto).
  Auf jedem Gerät mit derselben Anmeldung derselbe Stand.
- **Ausnahme:** Eine *laufende* Probeklausur bleibt bis zur Abgabe auf dem Gerät; ihr Ergebnis wird danach
  mit abgeglichen.
- **Ich → Deine Daten** zeigt, wo der Lernstand liegt (nur Browser / im Konto, zuletzt abgeglichen um … /
  offline / Profil fehlt), dazu „Jetzt abgleichen“. Sicherungsdatei und Zurücksetzen bleiben; die
  Zurücksetzen-Rückfrage nennt angemeldet „auch in deinem Konto und auf deinen anderen Geräten“.

## 2 · Wie abgeglichen wird

**Server** (`supabase/migrations/20261020093832_lernstand.sql`, live): Tabelle mit RLS (nur eigene Zeile
lesbar, kein direktes Schreiben), Größengrenze 1 MB, Löschen mit dem Konto (`on delete cascade`). Schreiben nur
über `lernstand_speichern(p_daten, p_basis)`: verlangt ein Community-Profil (wie die Community: Beta-Code nötig)
und speichert nur, wenn `p_basis` der aktuellen Version entspricht; sonst kommt der Serverstand zurück.

**Browser** (`quellen/lernstand-sync.js`, nur in der App): Der Browser bleibt Arbeitsspeicher, Lernen und
Üben laufen weiter offline. Merkzettel `azubipass-lernsync` (Konto, Version, Zeitstempel des letzten Abgleichs;
bewusst ohne Doppelpunkt, sonst hielte `kern.js` ihn für alten Lernstand).

| Lage | Verhalten |
|---|---|
| Konto hat noch keinen Stand | Gerätestand hochladen |
| Server unverändert, Gerät geändert | senden |
| Server neuer, Gerät unverändert | Serverstand übernehmen |
| beide geändert / erster Abgleich auf diesem Gerät | zusammenführen (dieselbe Regel wie „Sicherung einspielen“), senden |
| gleichzeitig gespeichert (Basis veraltet) | neu holen, zusammenführen, erneut senden (bis 3 Runden) |
| zuletzt war ein **anderes Konto** auf dem Gerät | dessen Stand nie übernehmen: eigenen Serverstand laden oder leer beginnen |

Auslöser: App-Start, Anmeldung, Profilanlage, Rückkehr in die App, wieder online, 15 s nach einer Änderung,
beim Wegwechseln sofort. Nach einer Übernahme baut die App Heute, Lernen oder Ich neu auf (nicht Üben und
Community, um laufende Eingaben nicht zu unterbrechen).

**Bekannte Grenzen**
- Die Lernzettel-Seiten (z. B. `buchfuehrung.html`) laden das Modul nicht. Was dort gelernt wird, gleicht die
  App beim nächsten Öffnen ab.
- Zusammenführen vereinigt: Ein auf Gerät A entferntes Lesezeichen kann zurückkommen, wenn Gerät B es
  gleichzeitig noch hatte. Zurücksetzen wirkt nur sicher, wenn das andere Gerät seitdem nichts geändert hat.
- Ungesendete Änderungen eines Kontos gehen verloren, wenn auf demselben Gerät vor dem Abgleich ein anderes
  Konto angemeldet wird.
- Abmelden lässt den Lernstand im Browser (wie bisher dokumentiert).

## 3 · Prüfungen

| Art | Befehl / Ort | Ergebnis |
|---|---|---|
| **live** | `lernstand_test.sql` ohne Kaskadenprüfung (`DELETE`), Rollback | ERGEBNIS ohne FEHLER ([Log](2026-10-20-claude-lernstand/live-lernstand-test.log)); Rückstände 0, 51 Migrationen = 51 Dateien, `anon` ohne Ausführrecht, Paket zu |
| lokal | `lernstand_test.sql` vollständig (inkl. `kaskade=0`) | ohne FEHLER ([Log](2026-10-20-claude-lernstand/lokal-lernstand-test.log)); übrige vier SQL-Suiten ohne FEHLER |
| mock | `lernstand_sync_test.py` (neu) | **33/33**, axe ohne WCAG-Verstöße in 3 Zuständen ([Log](2026-10-20-claude-lernstand/lernstand-mock.log)) |
| mock | Gruppen / Korrekturen / Moderation | **38/38**, **97/97**, **128/128** |
| lokal | `funktionstest.py`, `lernkern_audit_test.py`, `pruefe.py --schnell` | **269/269**, in Ordnung, keine Fehler |

**Nicht geprüft:** Abgleich mit echten Konten auf zwei echten Geräten (kein Testpasswort in der Sitzung).
Empfehlung vor Freitag: Lukes meldet sich auf Handy und Rechner an, hakt auf einem Gerät ein Kapitel ab und
prüft unter Ich, ob es auf dem anderen ankommt.

## 4 · Datenschutzerklärung (von Claude ergänzt, bitte prüfen)

`build_app.py`, Abschnitt „Lernen und Üben“ und „Supabase“: Lernstand im Konto, Zweck, Art. 6 Abs. 1 lit. b,
Löschung mit dem Konto, Zurücksetzen auch im Konto. **Weiterhin veraltet** (nicht von mir geändert): der Satz
„Beiträge und Lerngruppen sind im hier beschriebenen Zugangspaket noch nicht verfügbar.“ – vor der
Paketöffnung muss ChatGPT/Lukes den Abschnitt für Beiträge, Lernzettel-Dateien, Gruppen, Aufgaben und
Meldungen ergänzen.

## 5 · Nächster Schritt

ChatGPT prüft diesen Commit zusammen mit dem Freitag-Paket. Lukes: Merge, Zwei-Geräte-Test, Datenschutzwerte.
