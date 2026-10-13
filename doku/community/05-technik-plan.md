# 05 · Technik-Plan: Paketsperre, verlässliches Senden, beste Antwort

Stand 13.10.2026 · Claude · zur Freigabe durch Lukes **vor** dem Einspielen
(Entscheidung 13.10.: „Claude benennt die Datenbank-/Rechteänderungen vor dem
Einspielen“). Keine neuen fachlichen Felder.

## 1 · Paketsperre (serverseitig, startet geschlossen)

**Neu:**

- Tabelle `public.freigabe (schalter text primary key, offen boolean not null default false, geaendert_am timestamptz)` mit genau einer Zeile `('beitraege', false)`.
  Lesbar für angemeldete Nutzer, **kein** Schreibrecht für irgendwen außer der Datenbankverwaltung.
- Tabelle `public.beitraege_tester (nutzer_id uuid primary key references auth.users on delete cascade)` – die ausdrücklich benannten internen Testkonten. Nur die Datenbankverwaltung schreibt. Start-Inhalt: `demo-anna`, `demo-ben`, `test-neu1` (Team-Testkonto). Weitere (z. B. dein eigenes Konto für die Vorführung) per SQL.
- Funktion `public.beitraege_frei()` (security definer, stable): `true`, wenn der Schalter offen ist **oder** das angemeldete Konto in `beitraege_tester` steht.

Ich nehme bewusst **nicht** die vorhandene `demo`-Markierung in `app_metadata`: Die
tragen alle 88 Testkonten, also wäre die Ausnahme zu breit. Rollen `mentor`/`team`
öffnen nichts automatisch.

**Geänderte Regeln (je um `and (select public.beitraege_frei())` ergänzt):**

| Regel | Wirkung bei geschlossenem Schalter |
|---|---|
| `beitrag` SELECT, INSERT | nichts lesen, nichts anlegen |
| `antwort`, `hilfreich`, `meldung` | wirken schon über „Beitrag sichtbar“ mit – ohne sichtbaren Beitrag kein Lesen/Schreiben; keine Änderung nötig |
| Speicher `lernzettel` SELECT, INSERT | keine Dateien hochladen oder abrufen, auch nicht im eigenen Ordner |
| RPC `beste_antwort`, neue RPCs (unten) | prüfen den Schalter selbst |

Die Oberfläche fragt nach der Zugangsprüfung `beitraege_frei()` ab. Bei `false`:
Profil, Regeln, Abmelden und „Beiträge sind für die Klassen-Beta noch nicht
freigeschaltet.“ mit „Zu Lernen“ – keine Beitragsabfragen, Direktlinks enden dort.

**Öffnen** (nur nach deiner Freigabe): `update public.freigabe set offen = true where schalter = 'beitraege';`

## 2 · Verlässliches Senden (Idempotenz, Statusprüfung)

Die App erzeugt pro Vorgang eine **Vorgangskennung** (UUID), bevor sie sendet.
Diese Kennung wird zur ID des Beitrags bzw. der Antwort. Ein zweiter Versuch mit
derselben Kennung legt nichts doppelt an.

- RPC `beitrag_veroeffentlichen(p_vorgang uuid, p_art, p_titel, p_text, p_lernfeld, p_kapitel, p_an_mentoren, p_datei_pfad, p_datei_art) returns uuid` (security definer). Prüft: angemeldet, Profil, `beitraege_frei()`, Ziel fest „für alle“ (`gruppe_id = null`), Datei nur im eigenen Ordner **und** tatsächlich im Speicher vorhanden. `insert … (id = p_vorgang) on conflict (id) do nothing`; gehört die Kennung schon einem eigenen Beitrag, kommt dessen ID zurück, bei fremdem Besitz ein Fehler. Längen, Spam-Bremse und alle Prüfregeln der Tabelle gelten unverändert.
- RPC `antwort_senden(p_vorgang uuid, p_beitrag uuid, p_text) returns uuid` – gleiches Muster; Beitrag muss für mich sichtbar und nicht ausgeblendet sein.
- **Statusprüfung:** ein normaler Lesezugriff `beitrag`/`antwort` mit `id = Vorgangskennung` (eigene Inhalte darf man schon lesen) – keine neue Funktion nötig.
- **Datei:** Pfad `‹konto›/‹vorgang›.‹endung›`. Beim Wiederholen ist die Datei ggf. schon da (gilt als Erfolg). Gelöscht wird sie nur, wenn der Beitrag **sicher nicht** angelegt wurde (Fehlerantwort des Servers **und** Statusprüfung ohne Treffer) – nie nach bloßem Verbindungsverlust.
- Der direkte Insert in `beitrag`/`antwort` bleibt technisch erlaubt (Tests nutzen ihn), unterliegt aber derselben Sperre. Die App benutzt nur noch die RPCs.

## 3 · Beste Antwort

`beste_antwort` prüft zusätzlich: Beitrag ist eine **Frage**, Beitrag und Antwort
sind **nicht ausgeblendet**, `beitraege_frei()`. Zurücknehmen bleibt wie bisher
(zweiter Aufruf auf dieselbe Antwort).

## 4 · Datenschicht (keine Datenbank)

- Zeichen zählen wie SQL `char_length` (Codepunkte) in `veroeffentlichen`/`antwortSchreiben`.
- Ganzer Schreibablauf (Upload → Veröffentlichen → Nachladen) an Konto und Generation gebunden; nach jedem Schritt geprüft, bevor der nächste startet.

## Folgen für bestehende Tests

Der Zugangstest landet nach der Profilanlage mit neuen Testkonten künftig in der
gesperrten Ansicht statt in „Beiträge“ – das ist gewollt und wird angepasst.
Datenschicht- und Beitragstests laufen mit den freigeschalteten Testkonten.
