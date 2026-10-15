# 06 · Technikplan Melden und Moderation

> Status: PLAN · Version 2 · Stand: 2026-10-14 · Autor: Claude
>
> v2 nach ChatGPT-Gegenprüfung von `3bed8d1`: sechs Planbefunde P1–P6
> eingearbeitet (Abschnitt 11 listet die Änderungen). Ergänzt nach der
> Gegenprüfung von `89968be`: R02 (Wiedererkennung nach dem Warten) und R03
> (`antwort_senden` sperrt vor der Prüfung), Abschnitt 12.
>
> Gegenprüfung von `06-melden-moderation.md` **v2** (ChatGPT) und konkreter
> Plan. **Nichts umgesetzt, nichts eingespielt**, Paketsperre zu, `main`
> unverändert. Einspielen erst nach Lukes' Freigabe dieses Plans und der
> offenen Punkte in Abschnitt 9. G03–G05 bleiben Gegenstand ihres eigenen
> Reviews; dieser Plan setzt deren Stand (`9bfd293`) nur voraus.

## 0. Grundlage

- Branch `community-zugang` @ `9bfd293` (v2 nennt `237a62a` als letzte von
  ChatGPT geprüfte Grundlage; dazwischen liegen nur `9039160` Plan G03–G05
  und `9bfd293` Umsetzung G03–G05). Arbeitsbaum sauber, `main` auf `0c472bb`.
- Datenbank `pjbxozskvuhxtrotqpkr`: 21 Migrationen, identisch mit
  `supabase/migrations/`. Lesend geprüft am 14.10.:
  0 Meldungen, 0 ausgeblendete Beiträge/Antworten, 0 beste Antworten auf
  ausgeblendeten Inhalten, Paket `beitraege` geschlossen, **genau ein
  Teamprofil** (Testkonto `test-neu1`).
- Gelesen: `AGENTS.md`, oberste Übergabe, Spec 06 v1 (Repo) und v2 (Anhang,
  jetzt im Repo), SQL unter `supabase/migrations/`, `quellen/community.js`.

## 1. Befunde am Ist-Stand

| Nr. | Befund | Folge für den Plan |
|---|---|---|
| B1 | `moderieren()` prüft nur `ist_team()`, keine Paketsperre, meldet fehlendes Ziel als Erfolg, schließt pauschal **alle** offenen Meldungen. | Ersetzen durch `moderation_entscheiden`; alten Weg per `revoke` sperren, `drop` später. |
| B2 | Team darf `meldung.status` direkt per UPDATE setzen (Grant + Regel „Team bearbeitet“). | Grant und Regel entfernen: Abschluss nur noch über die Entscheidung, sonst kein Protokoll. |
| B3 | Melden ist ein direktes INSERT. Die Spam-Bremse (Before-Trigger) läuft **vor** der Eindeutigkeitsprüfung: Eine Wiederholung nach verlorener Bestätigung kann als „zu viele Meldungen“ statt „bereits gemeldet“ enden. Client kürzt den Hinweis mit UTF-16-`slice`. | RPC `meldung_senden`, die zuerst die vorhandene eigene Meldung sucht und erst dann bremst und einfügt. |
| B4 | Automatische Ausblendung zählt ohne Sperre: Zwei gleichzeitige Meldungen Nr. 2 und Nr. 3 sehen je nur zwei Personen – **die Schwelle kann verfehlt werden**. Sie setzt `beste`/`geloest` nicht zurück und hinterlässt keine Spur. | Sperre auf dem Beitrag vor dem Einfügen; Ausblendung über denselben Kernweg wie das Team. |
| B5 | Antwort-Leseregel verlangt einen lesbaren Elternbeitrag. Wer unter einem fremden, ausgeblendeten Beitrag geantwortet hat, sieht seine eigene Antwort nicht mehr. | Eigene Lese-RPC, Leseregeln bleiben unverändert. |
| B6 | Die Meldung-Leseregel prüft weder Profil noch Paketsperre. | Regel um `ist_freigeschaltet()` und `beitraege_frei()` ergänzen. |
| B7 | `antwort` hat kein `bearbeitet_am`. Eine während der Prüfung geänderte Antwort ist nicht erkennbar. | Spalte und Trigger ergänzen; Entscheidung prüft den gesehenen Stand. |
| B8 | Das Team darf fremde Beiträge/Antworten direkt löschen (Regeln „eigenen oder als Team löschen“). Das umgeht Protokoll und Spec-Grenze „keine Löschung fremder Inhalte“. | Vorschlag: Teamanteil der Löschregeln entfernen (Entscheidung E10). |
| B9 | Autor:innen dürfen `geloest` frei setzen (Grant, `beitragAendern`). Nach Ausblenden einer besten Antwort könnte die Frage ohne beste Antwort wieder „gelöst“ werden. | Vorschlag: Grant entziehen, `geloest` nur über `beste_antwort_setzen` (E11). |
| B10 | Altbestand leer, aber der Plan muss trotzdem mit früher ausgeblendeten Inhalten ohne Entscheidung umgehen können. | Nachtrag `quelle = 'altbestand'` ohne erfundene Person/Zeit. |

## 2. Datenmodell

Alle neuen Tabellen: RLS an, **keine** Grants an `anon`/`authenticated`,
Zugriff nur über `security definer`-Funktionen mit leerem `search_path`.
Textgrenzen zählen Codepunkte (`char_length`) nach `btrim`; gespeichert wird
der getrimmte Text.

### 2.1 `ausblendung` – die aktive Ausblendungsentscheidung

| Spalte | Typ | Bedeutung |
|---|---|---|
| `id` | uuid pk | stabile Entscheidungsreferenz (D09) |
| `beitrag_id` / `antwort_id` | uuid, FK `on delete cascade`, genau eines | Ziel |
| `autor_id` | uuid FK profil `on delete cascade` | betroffene Person zum Zeitpunkt der Ausblendung |
| `quelle` | `automatisch` \| `team` \| `altbestand` | wie die Ausblendung entstand |
| `erstellt_am` | timestamptz null | Serverzeit; **null bei `altbestand`** |
| `erstellt_von` | uuid null FK profil `on delete set null` | null bei `automatisch`/`altbestand` |
| `bestaetigt_am`, `bestaetigt_von` | null | erste Teamentscheidung; bei `team` gleich Erstellung |
| `kategorie` | Meldegrund-Wert null | gewählte Vorlagenkategorie; bestimmt die Dringlichkeit einer Prüfanfrage |
| `begruendung_autor` | text null, 1–500 | was die betroffene Person sieht; Pflicht, sobald bestätigt |
| `aufgehoben_am`, `aufgehoben_durch` | null / FK auf Protokoll | Ende der Ausblendung |

- Eindeutig: höchstens **eine aktive** Ausblendung je Ziel
  (`unique (beitrag_id) where aufgehoben_am is null`, ebenso `antwort_id`).
- Invariante: `versteckt = true` ⇔ aktive Ausblendung existiert. `versteckt`
  bleibt ohne Grant; nur die Kernfunktionen schreiben beides gemeinsam. Der
  SQL-Test prüft die Invariante nach jedem Fall.
- **Zuordnung automatisch → Team:** Die automatische Ausblendung legt die
  Zeile an (`quelle = automatisch`, `bestaetigt_am = null`). „Weiter
  ausgeblendet lassen“ bestätigt **dieselbe Zeile** (setzt `bestaetigt_*`,
  `kategorie`, `begruendung_autor`). Es entsteht keine neue ID, also kein
  neues Anfragerecht.
- „Erklärung korrigieren“ ändert `begruendung_autor` derselben Zeile; der alte
  Text bleibt im Protokoll. Gleiche ID, kein neues Anfragerecht.
- Neue ID nur nach tatsächlichem Aufheben und späterem erneuten Ausblenden.

### 2.2 `pruefanfrage`

| Spalte | Typ |
|---|---|
| `id` | uuid pk = Vorgangskennung des Clients |
| `ausblendung_id` | uuid FK `on delete cascade`, **unique** |
| `autor_id` | uuid FK profil `on delete cascade` |
| `begruendung` | text 1–500 |
| `erstellt_am` | timestamptz default now() |
| `status` | `offen` \| `abgeschlossen` |
| `ergebnis` | `aufgehoben` \| `bestaetigt` null |
| `ergebnis_begruendung` | text 1–500 null |
| `abgeschlossen_am`, `entscheidung_id` | null |

`unique (ausblendung_id)` macht D09 serverseitig hart: eine Anfrage je
Ausblendungsentscheidung, egal ob Tab, API oder Wiederholung. Abgelehnte
oder bestätigte Anfrage lässt die Zeile bestehen, das Recht bleibt verbraucht.

### 2.3 `moderation_entscheidung` – Protokoll (nur anhängen)

| Spalte | Bedeutung |
|---|---|
| `id` uuid pk | Vorgangskennung des Clients bzw. `gen_random_uuid()` beim Automatismus |
| `beitrag_id` / `antwort_id` | **ohne FK**, damit das Protokoll das Löschen des Inhalts überlebt |
| `aktion` | `ausblenden`, `weiter_ausblenden`, `einblenden`, `sichtbar_lassen`, `korrektur`, `anfrage_aufheben`, `anfrage_bestaetigen`, `erklaerung_aendern`, `automatisch_ausgeblendet` |
| `vorher_versteckt`, `nachher_versteckt` | bestätigter Zustand vor/nach |
| `akteur` | `team` \| `automatik` |
| `akteur_id` | uuid null FK profil `on delete set null` (Server aus `auth.uid()`) |
| `zeit` | `now()` des Servers |
| `interne_begruendung` | text 1–500, Pflicht bei `team`, null bei `automatik` |
| `ausblendung_id`, `pruefanfrage_id`, `korrektur_antwort_id` | Bezüge |
| `alte_erklaerung` | nur bei `erklaerung_aendern` |

Unveränderlich: Trigger lehnt UPDATE/DELETE ab, außer dem `set null` auf
`akteur_id` bei Kontolöschung. Korrekturen sind neue Zeilen (Spec §7).

### 2.4 Änderungen an bestehenden Tabellen

- `meldung`: `erledigt_durch uuid null` (Bezug aufs Protokoll),
  `erledigt_am timestamptz null`. Jede abgeschlossene Meldung zeigt so,
  welche Entscheidung sie abgeschlossen hat („geprüfter Umfang“ belegbar).
- `antwort`: `team_korrektur boolean not null default false` (kein Grant,
  nur über die Entscheidung setzbar, bleibt bei späterem Rollenwechsel
  erhalten); `bearbeitet_am timestamptz` + Trigger wie beim Beitrag;
  optional `bezug_antwort_id uuid null` (E7).
- `beitrag` und `antwort`: `mod_version integer not null default 0` (kein
  Grant). Jede Änderung am Moderationsstand **oder** am Inhalt erhöht sie in
  derselben Transaktion: Meldung, automatische Ausblendung, Prüfanfrage, jede
  Teamentscheidung inklusive `erklaerung_aendern`, und per Before-Update-Trigger
  jede Änderung an Titel/Text/Lernfeld/Kapitel/Datei (P3). Der Client liest
  sie mit dem Fall und schickt sie als `p_version` zurück.
- `vorgang.art` um `entscheidung` und `pruefanfrage` erweitern, damit der
  bestehende Klärweg aus G03 (`vorgang_klaeren`) auch hier „verworfen“
  endgültig machen kann.

### 2.5 `begruendung_vorlage`

`id`, `kategorie` (Meldegrund-Wert), `titel`, `text` (0–500; leer erlaubt
für „Sonstiges“), `aktiv`, `reihenfolge`, `geaendert_am`, `geaendert_von`.
Startbestand per Migration (Texte siehe 8.3). Gespeichert wird in der
Ausblendung immer der **fertige Text**, nie nur der Vorlagenbezug – spätere
Vorlagenänderungen verändern keine alte Erklärung.

## 3. Sperr- und Konkurrenzstrategie

Ein einziger Sperrpunkt je Thread: die **Beitragszeile** (bei einer Antwort
deren Elternbeitrag) mit `select … for update`. Diesen Punkt nutzen bereits
`beste_antwort_setzen` und künftig alle Wege:

1. `meldung_senden` (vor dem Einfügen) und damit auch die automatische Ausblendung,
2. `moderation_entscheiden`,
3. `pruefanfrage_senden`,
4. `beste_antwort_setzen` (unverändert).

Damit gilt:

- **Schwelle (B4):** Meldungen auf denselben Thread laufen nacheinander; die
  Zählung verschiedener Personen ist exakt.
- **Neue Meldung während einer Entscheidung:** Die Entscheidung liest die
  offenen Meldungen erst nach der Sperre. Sie verlangt, dass die übergebene
  Menge `p_meldungen` **genau** der aktuellen offenen Menge entspricht. Ist
  eine neue hinzugekommen oder eine gesehene schon geschlossen → Fehler
  `APF01` „Der Fall hat sich geändert …“. Eine Meldung, die erst nach der
  Entscheidung festgeschrieben wird, bleibt offen und erzeugt einen neuen Fall.
- **Zwei Teamentscheidungen gleichzeitig:** Die zweite wartet auf die Sperre
  und scheitert dann an der veränderten Ausblendungs-ID oder Meldungsmenge
  (`APF01`). Kein stilles Überschreiben.
- **Ein Vergleichswert statt mehrerer (P3):** Die Entscheidung vergleicht
  nach der Sperre `p_version` mit `mod_version` des Ziels. Jede Abweichung –
  neue Meldung, neue Anfrage, zweite Erklärungskorrektur, Inhaltsänderung,
  parallele Entscheidung – ergibt `APF01`. Zwei gleichzeitige
  `erklaerung_aendern` mit derselben gelesenen Version: die zweite scheitert.
  Die Prüfung der Meldungsmenge bleibt als zweite Sicherung bestehen.
- Feste Reihenfolge Beitrag → Antwort → Ausblendung → Meldung/Anfrage: keine
  Verklemmung mit `beste_antwort_setzen`.

**Alle erlaubten Schreibwege (P6)** – nach Umsetzung von E10, E11 und den
Grant-Änderungen unten:

| Weg | Sperrt | Zusammenspiel mit einer Entscheidung |
|---|---|---|
| Autor:in ändert Beitrag (direktes UPDATE) | Beitragszeile (implizit) | Konflikt mit `for update` der Entscheidung → strikt nacheinander. Kommt die Änderung zuerst, erhöht der Trigger `mod_version` → Entscheidung `APF01`. Kommt sie danach, ändert sie einen schon entschiedenen Stand und erhöht die Version für den nächsten Fall. |
| Autor:in ändert Antwort (direktes UPDATE) | nur Antwortzeile | Die Entscheidung sperrt bei Antwortzielen **Beitrag und danach Antwort** `for update` und liest die Antwort erst nach der Sperre → gleiches Ergebnis wie oben. |
| Autor:in löscht Beitrag/Antwort (direktes DELETE) | Zeile | Vorher: Entscheidung findet das Ziel nicht → `APZ01`. Nachher: Löschen wartet, löscht danach; Protokoll bleibt (kein FK). |
| Antwort senden (`antwort_senden`) | **neu:** Beitrag `for share` vor der Prüfung (R03) | **Heute falsch:** Die RPC liest den Beitrag ohne Sperre, prüft „sichtbar“ und wartet erst später beim Fremdschlüssel – danach keine neue Prüfung (ChatGPT lokal reproduziert: Antwort unter ausgeblendetem Beitrag). Änderung siehe 12.2. |
| Direktes Antwort-INSERT | Beitrag `key share` | **Vorschlag: Grant entziehen** (wie G06 beim Beitrag). Die Insert-Regel prüft „Beitrag sichtbar“ vor dem Warten und würde eine Antwort unter einem gerade ausgeblendeten Beitrag zulassen. Der Client nutzt nur noch `antwort_senden`. |
| Hilfreich markieren | Beitrag `key share` | ändert keinen Moderationsstand, keine Versionsänderung. |
| `beste_antwort_setzen` | Beitrag `for update` | nacheinander; Ausblenden der besten Antwort setzt `beste`/`geloest` im selben Schritt zurück. |
| Team löscht fremde Inhalte | – | entfällt mit E10. |
| `geloest` direkt setzen | – | entfällt mit E11. |
| Meldung, Prüfanfrage, Entscheidung | Beitrag (+ Antwort) `for update` | über die RPCs, erhöhen `mod_version`. |

Fehlercodes (eigene SQLSTATE, damit der Client sicher unterscheidet):
`APF01` Fall geändert · `APZ01` Ziel fehlt/nicht im Umfang · `APR01` Recht
fehlt · `APP01` Paket zu · `APD01` Anfrage schon gestellt · `APV01`
Vorgangskennung verworfen/vergeben · `APB01` Spam-Bremse · `APE01` Eingabe
ungültig (Länge, Pflicht).

## 4. RPC-Signaturen

Alle: `security definer`, `search_path = ''`, prüfen zuerst Sitzung, Profil
(`ist_freigeschaltet`), `beitraege_frei()` und – wo nötig – `ist_team()`
frisch in derselben Transaktion. Konto-ID, Rolle und Zeit kommen nie aus der
Nutzlast. Umfang dieser Phase: nur `gruppe_id is null`.

### 4.1 Melden (Azubis)

```
meldung_senden(p_art text, p_ziel uuid, p_grund text, p_hinweis text)
  returns table (meldung_id uuid, status text, neu boolean, gleich boolean)
```
Ablauf (P1 – Wiedererkennung **vor** der Sichtbarkeitsprüfung):
1. Sitzung, Profil, Paketsperre prüfen.
2. **Eigene Meldung zu (Konto, Art, Ziel-ID) suchen.** Vorhanden →
   `neu = false`, `gleich` = Grund/Hinweis identisch, Status zurück. Es kommen
   nur Werte zurück, die der Client schon hat (seine Meldungs-ID, Grund,
   Status) – nie Titel, Text oder Sichtbarkeit des Ziels. So erkennt eine
   Wiederholung nach verlorener Bestätigung ihre Meldung auch dann, wenn
   genau diese dritte Meldung den Inhalt ausgeblendet hat.
3. Thread sperren (`select … from beitrag where id = … for update`; bei einer
   Antwort deren Elternbeitrag).
4. **Nach der Sperre die eigene Meldung erneut suchen (R02)** – eigene
   Anweisung, sieht also alles, was bis zum Ende des Wartens festgeschrieben
   wurde. Vorhanden → wie Schritt 2 zurück, **vor** Sichtbarkeitsprüfung und
   Bremse.
5. Erst dann: Ziel mit den Bedingungen der Leseregel prüfen (sonst `APZ01`
   „Dieser Inhalt ist für dich nicht verfügbar.“), Bremse (30/h, `APB01`),
   Insert, automatische Ausblendung, `mod_version` erhöhen.
6. Dritte Sicherung: Der Eindeutigkeitsindex bleibt; ein `23505` beim Insert
   wird abgefangen und wie Schritt 2 beantwortet.

Natürlicher Schlüssel (Konto, Ziel) ersetzt eine Vorgangskennung. Zwei
gleichzeitige Erstversuche desselben Kontos auf einen Inhalt mit zwei
fremden Meldungen: A sperrt, legt die dritte Meldung an, blendet aus,
schreibt fest. B wartet in Schritt 3, findet in Schritt 4 die Meldung von A
und gibt sie zurück – die inzwischen eingetretene Ausblendung und eine
inzwischen erreichte Bremse spielen für B keine Rolle mehr.

Die bisherige Meldungs-Bremse im Trigger `bremse()` (P0001) entfällt für
`meldung`; die RPC prüft selbst mit `APB01`. Beitrags- und Antwort-Bremse
bleiben unverändert.

```
meldung_status(p_art text, p_ziel uuid) returns table (meldung_id, status, erstellt_am)
meine_meldungen(p_nach_zeit timestamptz, p_nach_id uuid, p_anzahl int)
  returns table (id, grund, status, erstellt_am, art, ziel_id, titel)
```
`meine_meldungen` liefert `titel`/`ziel_id` nur, wenn das Ziel **jetzt**
für das Konto lesbar ist; sonst null → „Gemeldeter Inhalt“. Keine Begründung,
kein Ergebnis (D12).

### 4.2 Entscheiden (Team)

```
moderation_entscheiden(
  p_id uuid,               -- Vorgangskennung, Idempotenzschlüssel
  p_art text, p_ziel uuid,
  p_aktion text,           -- siehe Matrix unten
  p_meldungen uuid[],      -- gesehene offene Meldungen (leer erlaubt)
  p_pruefanfrage uuid,     -- gesehene offene Anfrage oder null
  p_ausblendung uuid,      -- gesehene aktive Ausblendung oder null
  p_version int,           -- gesehene mod_version (P3)
  p_intern text,           -- interne Begründung (optional, s. E4)
  p_autor_text text,       -- Erklärung für die Autor:in
  p_kategorie text,        -- gewählte Vorlagenkategorie
  p_korrektur text         -- Text der Teamkorrektur (1–2000)
) returns jsonb   -- {entscheidung_id, versteckt, ausblendung_id, korrektur_antwort_id, wiederholung}
```

Idempotenz: **Vor jeder Zustandsprüfung** (Sichtbarkeit, Version, offene
Anfrage) die Protokollzeile mit `p_id` suchen. Existiert sie → **ihr Ergebnis**
zurückgeben
(`wiederholung = true`), wenn Ziel und Aktion gleich sind, sonst `APV01`.
Erst danach Vorgangszeile `('entscheidung', 'angelegt')`; ist der Vorgang
`verworfen` → `APV01`. Damit erzeugt eine Wiederholung keine
zweite Entscheidung, keine zweite Teamantwort und kein neues Anfragerecht.

| Zustand (nach Sperre) | `p_aktion` | Pflicht | Wirkung |
|---|---|---|---|
| sichtbar | `ausblenden` | autor_text, kategorie | neue Ausblendung (team, bestätigt), beste zurücksetzen, gesehene Meldungen schließen. Auch ohne Meldung (D13). |
| sichtbar, Meldungen | `sichtbar_lassen` | intern | Meldungen schließen |
| sichtbar | `korrektur` | korrektur, intern | Teamantwort einfügen, Meldungen schließen; auch ohne Meldung |
| ausgeblendet automatisch | `weiter_ausblenden` | autor_text, kategorie | dieselbe Ausblendung bestätigen, Meldungen schließen |
| ausgeblendet bestätigt, neue Meldungen | `weiter_ausblenden` | intern | Meldungen schließen, Ausblendung unverändert |
| ausgeblendet | `einblenden` | intern; korrektur optional | Ausblendung aufheben; optional zugleich Teamkorrektur (s. 8.2) |
| ausgeblendet | `erklaerung_aendern` | autor_text | Text ersetzen, alter Text ins Protokoll |
| offene Prüfanfrage | `anfrage_aufheben` | autor_text (Ergebnis); korrektur optional | aufheben, optional Teamkorrektur, Anfrage `aufgehoben`, gesehene Meldungen schließen – alles in einer Transaktion (P5) |
| offene Prüfanfrage | `anfrage_bestaetigen` | autor_text (Ergebnis) | bleibt verborgen, Anfrage `bestaetigt` |

Gültigkeitsregeln: unpassende Aktion zum aktuellen Zustand → `APF01`;
`sichtbar_lassen` ohne Meldungen → `APE01`; bei offener Prüfanfrage sind nur
die beiden Anfrage-Aktionen erlaubt (sonst würde eine Anfrage still liegen
bleiben); Teamkorrektur nur, wenn der Elternbeitrag sichtbar ist (bzw. nach
`einblenden` bzw. `anfrage_aufheben` sichtbar wird). Alle Meldungen in `p_meldungen` bekommen
`status = erledigt`, `erledigt_durch = p_id`, `erledigt_am = now()` – im
selben Statement mit Prüfung der betroffenen Zeilenzahl.

```
entscheidung_status(p_id uuid) returns jsonb   -- Protokollzeile oder null
```
Für „Status prüfen“ nach unklarem Ausgang. Endgültig wird ein leerer Befund
nur über `vorgang_klaeren(p_id, 'entscheidung')` (→ `verworfen`), danach
darf der Client eine neue Entscheidung mit neuer Kennung senden.

### 4.3 Lesen (Team)

```
moderation_zaehler() returns int
moderation_faelle(p_filter text, p_nach jsonb, p_anzahl int)          -- alle | meldungen | pruefanfragen
moderation_fall(p_art text, p_ziel uuid) returns jsonb
moderation_ausgeblendet(p_nach jsonb, p_anzahl int)
moderation_protokoll(p_nach jsonb, p_anzahl int)
moderation_vorlagen() returns setof begruendung_vorlage
```
- Zähler und Fälle rechnen über den **gesamten** Bestand: ein Fall = ein Ziel
  mit ≥ 1 offener Meldung oder offener Prüfanfrage.
- Sortierung als Schlüssel `(stufe, aeltester_offener_vorgang, art, id)`,
  Blättern per Keyset (`p_nach`), `p_anzahl` ≤ 50. Keine Obergrenze von 120.
- `moderation_fall` liefert alle offenen Meldungen (Grund, Hinweis, Datum,
  **ohne** `melder_id`), offene Anfrage, aktive Ausblendung, Inhalt mit
  `stand`, Autor:in, bei Antworten Elterntitel. Die Datei lädt der Client
  weiterhin über den Speicher („Datei prüfen“), die Speicherregel erlaubt
  dem Team das bereits.
- `moderation_ausgeblendet` sortiert nach `ausblendung.erstellt_am desc, id`;
  Altbestand mit `erstellt_am = null` am Ende, mit Kennzeichen, die
  Oberfläche zeigt dann die Erstellungszeit des Inhalts ausdrücklich als
  solche.

### 4.4 Eigene Inhalte und Prüfanfrage (Autor:innen)

```
eigene_ausblendungen(p_nach jsonb, p_anzahl int)
eigener_inhalt(p_art text, p_id uuid) returns jsonb
pruefanfrage_senden(p_id uuid, p_ausblendung uuid, p_begruendung text) returns jsonb
pruefanfrage_status(p_ausblendung uuid) returns jsonb
```
- `eigene_ausblendungen`: eigene aktive Ausblendungen, frühere mit
  Prüfanfrage (Ergebnis bleibt auffindbar, Spec §3) und eigene **sichtbare**
  Antworten unter fremden ausgeblendeten Beiträgen (E6).
- `eigener_inhalt` liefert nur eigenen Text/Dateipfad, Ausblendungszustand,
  `begruendung_autor`, Zeit nur bei `quelle = team` bzw. nach Bestätigung,
  eigene Anfrage. Vom fremden Elternbeitrag: **nichts** außer „ausgeblendet“.
  Keine Meldungen, keine Melder, kein internes Protokoll.
- `pruefanfrage_senden` (P2 – Wiederholung **zuerst**):
  1. Sitzung, Profil, Paketsperre.
  2. Anfrage mit `id = p_id` suchen. Vorhanden und eigene → ihr gespeicherter
     Stand zurück (`status`, `ergebnis`, `ergebnis_begruendung`) – auch wenn sie
     längst abgeschlossen und die Ausblendung aufgehoben ist. Vorhanden mit
     anderer `ausblendung_id` oder fremd → `APV01`.
  3. Erst dann die Bedingungen für eine **neue** Anfrage: Thread sperren,
     Ausblendung aktiv und bestätigt (sonst `APF01`), eigene (sonst `APR01`),
     noch keine Anfrage zu dieser Ausblendung (sonst `APD01` „bereits
     angefragt“), Begründung 1–500 (sonst `APE01`), Insert, `mod_version` erhöhen.
- Eigene Datei: bestehende Speicherregel (eigener Ordner) reicht.

### 4.5 Eigene Fehlercodes im Client (P4)

Alle `AP…`-Codes werden per `raise exception … using errcode` vor dem Ende der
Transaktion ausgelöst; PostgREST rollt zurück und antwortet mit HTTP 4xx. Sie
kommen als **einzeln aufgeführte** Werte in die Liste sicherer Ablehnungen von
`sicherAbgelehnt` (kein Muster `AP\w+`), nur mit HTTP < 500. Unbekannte
`AP…`-Codes bleiben „unklar“.

| Code | Bedeutung | Text in der Oberfläche |
|---|---|---|
| `APF01` | Fall/Stand geändert | Der Fall hat sich geändert. Prüfe die aktuellen Meldungen erneut. · Prüfanfrage: Die Ausblendung hat sich geändert. Lade die Seite neu. |
| `APZ01` | Ziel fehlt/nicht verfügbar | Dieser Inhalt ist für dich nicht verfügbar. |
| `APR01` | Recht fehlt | Dieser Bereich ist für dich nicht verfügbar. |
| `APP01` | Paket zu | bestehender Sperrtext aus Spec 05 |
| `APD01` | Anfrage schon gestellt | Du hast für diese Ausblendung bereits eine Prüfung angefragt. |
| `APV01` | Vorgangskennung verworfen/vergeben | Dieser Vorgang wurde bereits abgeschlossen. Lade die Seite neu. |
| `APB01` | Bremse | Du hast gerade viele Meldungen gesendet. Versuch es später erneut. |
| `APE01` | Eingabe ungültig | feldbezogen: „Gib eine kurze Begründung ein.“ / „Die Begründung darf höchstens 500 Zeichen lang sein.“ usw. aus Spec v2 §5 |

Die Spam-Bremse der Meldungen wechselt von `P0001` auf `APB01`, damit der
Client sie sicher von anderen `P0001`-Fehlern unterscheidet. Bestehende
Bremsen für Beiträge/Antworten bleiben unverändert.

## 5. Rechte und Regeln

| Änderung | Begründung |
|---|---|
| `revoke insert` auf `meldung`, Regel „selbst melden“ entfernen | nur noch `meldung_senden` (B3) |
| `revoke update (status)` auf `meldung`, Regel „Team bearbeitet“ entfernen | Abschluss nur mit Protokoll (B2) |
| Regel „meldung: eigene sehen, Team alle“ + `ist_freigeschaltet()` und `beitraege_frei()` | B6 |
| `revoke execute` auf `moderieren`; `drop` in `supabase/ausstehend/moderieren_entfernen.sql` | B1, Muster wie `beste_antwort` |
| neue Tabellen ohne Grants, RLS an | nur über RPC |
| `grant execute` der neuen RPCs an `authenticated` | Rechteprüfung innen |
| optional: Teamanteil der Löschregeln entfernen | B8 / E10 |
| optional: `revoke update (geloest)` auf `beitrag` | B9 / E11 |
| `revoke insert` auf `antwort` (Client nutzt nur `antwort_senden`) | P6, wie G06 |
| Trigger `mod_version_inhalt` (before update) auf `beitrag`, `antwort` | P3 |

Bestehende Leseregeln für `beitrag`/`antwort` bleiben **unverändert**; die
Eigenansicht unter fremdem ausgeblendetem Beitrag läuft ausschließlich über
`eigener_inhalt`/`eigene_ausblendungen`.

## 6. Migrationen (je unter 5 KB, Supabase-MCP-Grenze)

| Datei | Inhalt |
|---|---|
| `…_moderation_tabellen.sql` | `ausblendung`, `pruefanfrage`, `moderation_entscheidung`, `begruendung_vorlage` + Startbestand, Spalten an `meldung`/`antwort`, `vorgang.art`, Indizes, RLS an |
| `…_moderation_kern.sql` | interne Helfer `_thread_sperren`, `_verbergen` (inkl. beste/gelöst), `_aufheben`, `_stufe`; Trigger `antwort_bearbeitet`, Protokoll-Schutz |
| `…_melden.sql` | `meldung_senden`, `meldung_status`, `meine_meldungen`; neue automatische Ausblendung; Meldungsregeln/Grants |
| `…_entscheiden.sql` | `moderation_entscheiden`, `entscheidung_status`, `vorgang_klaeren` erweitert |
| `…_moderation_lesen.sql` | Zähler, Fälle, Fall, Ausgeblendet, Protokoll, Vorlagen |
| `…_eigene_inhalte.sql` | `eigene_ausblendungen`, `eigener_inhalt`, Prüfanfrage senden/Status |
| `…_moderation_rechte.sql` | `revoke moderieren`, Altbestand-Nachtrag, optionale E10/E11 |
| `…_antwort_senden_sperre.sql` | `antwort_senden` mit Beitragssperre vor der Prüfung (R03); kann unabhängig von Spec 06 früher eingespielt werden, weil der Fehler auch mit dem heutigen `moderieren` und der automatischen Ausblendung besteht |

**Altbestand:** Für jeden Inhalt mit `versteckt = true` ohne aktive
Ausblendung eine Zeile `quelle = altbestand`, `erstellt_am = null`, ohne
Protokolleintrag. Heute betrifft das 0 Zeilen; die Anweisung bleibt für
die Migrationsreihe korrekt. Früher erledigte Meldungen behalten
`erledigt_durch = null` („vor dem Protokoll“). Nichts wird erfunden.

**Löschen und Aufbewahrung:** Löscht eine Autor:in ihren Inhalt (bleibt
erlaubt, auch wenn ausgeblendet), verschwinden per Cascade Meldungen,
Ausblendung und Prüfanfrage; das Protokoll bleibt mit der nackten Ziel-ID und
der internen Begründung. Kontolöschung setzt `akteur_id` auf null. Eine
Aufbewahrungsfrist lege ich nicht fest (E9).

## 7. Client (nach Freigabe, kurz)

- `community.js`: `melden` → `meldung_senden` mit Codepunktprüfung ohne
  Kürzen; neue Funktionen je RPC; `offeneMeldungen`, `moderieren`,
  `meldungErledigt` entfallen. Versandmuster aus G03/G04 (eingefrorener
  Stand, „unklar“, „Status prüfen“, Klären) wiederverwenden.
- `community-beitraege.js`: C13-Dialog, Team-Aktion „Inhalt ausblenden“,
  Kennzeichnung „Team · Fachliche Korrektur“, Eigenansicht am eigenen
  ausgeblendeten Inhalt mit „Erneute Prüfung anfragen“.
- neues Modul `community-moderation.js` (C14: Fälle, Ausgeblendet,
  Protokoll, Prüfen, Entscheidungsdialog mit Vorlagen und Vorschau).
- `community-ansicht.js`: Routen `#community/moderation`,
  `#community/meine-meldungen`, `#community/eigene-ausblendungen`,
  `#community/eigener-inhalt/<art>/<id>`; Zähler in Übersicht und Profil.

## 8. Abweichungen und Ergänzungen zu ChatGPTs Konkretisierungen

### 8.1 Prüfanfrage und automatische Ausblendung
v2 lässt offen, ob eine Anfrage schon während der **vorläufigen**
automatischen Ausblendung möglich ist. Vorschlag: **nein** – der Fall liegt
ohnehin offen beim Team; „Erneute Prüfung anfragen“ erscheint erst nach
„Weiter ausgeblendet lassen“ und hängt dann an derselben Ausblendungs-ID.
Sonst würde die Autor:in ihr einziges Recht vor der ersten
Teambegründung verbrauchen (E1).

### 8.2 Aktionsmatrix fehlt eine Kombination
Abnahmefall v2: „Drei fachliche Meldungen → vorläufig ausgeblendet;
Teamprüfung → Wiedereinblenden **mit** Korrektur“. Die Matrix kennt nur
getrennte Aktionen. Vorschlag: `einblenden` **und `anfrage_aufheben`** mit optionaler Korrektur
in **einer** Entscheidung (Knöpfe „Wieder einblenden und korrigieren“ /
„Ausblendung aufheben und korrigieren“), damit Sichtbarkeit, Teamantwort,
Anfrageabschluss, Meldungsabschluss und Protokoll konsistent sind (E2, P5).

### 8.3 Vorlagentexte
- „Fachlich falsch“ spricht in der Ich-Form („erläutere ich hier“) und
  verrät eine Einzelperson; alle anderen sind neutral. Vorschlag: „Dein
  Inhalt wurde ausgeblendet, weil die fachliche Aussage hier besonders
  irreführend ist. Die betroffene Stelle: …“ und der Client verlangt, dass
  „…“ ersetzt wurde (E3).
- Die Vorlagen beginnen alle mit „wurde ausgeblendet“. Für „Ausblendung
  bestätigen“ nach einer Prüfanfrage passt das nicht. Vorschlag: zweite
  Vorlagengruppe „Prüfergebnis“ (bestätigt / aufgehoben) oder freier Text.
- D14 „anpassbar“: v2 liest das als editierbares Feld nach Auswahl; der
  Abnahmefall nennt aber „Vorlagen ergänzen“. Vorschlag für diese Phase:
  Vorlagen in der Datenbank, pro Entscheidung frei änderbar; **Verwaltung der
  Vorlagen selbst** (neu/ändern/deaktivieren) erst später oder per Migration (E5).

### 8.4 Begründungsfelder
v2: interne Begründung Pflicht und „die sachliche Erklärung kann zugleich die
interne Begründung sein“. Vorschlag: Bei Aktionen mit Autortext ist das
interne Feld optional; leer = Server übernimmt den Autortext. Bei
`sichtbar_lassen`/`weiter_ausblenden` ohne Autortext ist es Pflicht. So bleibt
D04 (immer ein Warum) ohne Doppeleingabe erfüllt (E4).

### 8.5 Zeichengrenzen
500 für Hinweis, Begründungen und Prüfanfrage und 2000 für die Korrektur
(= bestehende Antwortgrenze) passen zum Schema. Keine Änderung.

### 8.6 Prioritäten
„Persönliche Daten“ und „Beleidigung“ = hoch, Rest normal, Stufe des Ziels =
höchste offene Meldung: übernommen. Präzisierung für „Prüfanfrage übernimmt
die Stufe des Ausblendungsfalls“: Die Stufe kommt aus `ausblendung.kategorie`
(bei direkter Ausblendung ohne Meldung gibt es sonst keine Quelle).
Gleichzeitig offene Meldungen und Anfrage → höhere Stufe.

### 8.7 Weitere Lücken in v2
- **Eigene Antwort unter fremdem ausgeblendeten Beitrag, selbst nicht
  ausgeblendet:** v2 regelt nur „deren eigene Entscheidung“. Ohne Regel
  verschwindet der eigene Text still. Vorschlag: in „Eigene ausgeblendete
  Inhalte“ mit Hinweis „Der Beitrag, zu dem deine Antwort gehört, ist
  ausgeblendet.“, ohne Titel des fremden Beitrags (E6).
- **Teamkorrektur zu einer Antwort:** v2 sagt, die Korrektur beschreibt die
  Stelle im Text. Optional `bezug_antwort_id` für die Zeile „Bezieht sich auf
  die Antwort von {Name}“ – ohne Antwort-auf-Antwort-System (E7).
- **Name an der Teamkorrektur:** Zeigt die Korrektur Lukes' Anzeigenamen oder
  nur „Team“? Da Lukes allein moderiert, macht der Name die Moderation
  persönlich zuordenbar (E8).
- **Gemeldeter Inhalt gelöscht:** Die Meldung verschwindet per Cascade auch
  aus „Meine Meldungen“. v2 nennt nur entzogenes Leserecht. Vorschlag:
  akzeptieren und so dokumentieren.
- **Bearbeiten während der Ausblendung:** Autor:innen dürfen ausgeblendete
  Inhalte heute bearbeiten. Die Entscheidung erkennt das über `mod_version` (P3).
  Vorschlag: erlaubt lassen (Fehler lassen sich so beheben, die Prüfanfrage
  sieht den aktuellen Stand) (E12).
- **Teamkonto:** Einziges Teamprofil ist `test-neu1`. Für D01 muss Lukes
  sein echtes Konto (Mail) nennen; Rolle `team` + `beitraege_tester` setze
  ich nur auf ausdrückliche Anweisung direkt in der Datenbank.

## 9. Entscheidungen an Lukes

| Nr. | Frage | Empfehlung |
|---|---|---|
| E1 | Prüfanfrage erst nach Teambestätigung einer automatischen Ausblendung | Ja |
| E2 | „Wieder einblenden/Ausblendung aufheben und korrigieren“ als eine Entscheidung | Ja |
| E3 | Neutrale Fassung der Vorlage „Fachlich falsch“ | Ja |
| E4 | Internes Feld optional, wenn Autortext vorhanden | Ja |
| E5 | Vorlagenverwaltung nicht in diesem Paket | Ja |
| E6 | Eigene Antworten unter fremdem ausgeblendeten Beitrag in der Eigenansicht | Ja |
| E7 | Bezug „zur Antwort von …“ an der Teamkorrektur | Optional, eher ja |
| E8 | Teamkorrektur mit Namen oder nur „Team“ | Öffentlich nur „Team · Fachliche Korrektur“, intern das handelnde Konto; keine Anonymität gegenüber direkten Datenabfragen versprechen |
| E9 | Aufbewahrung des Protokolls | fester Prüftermin (Vorschlag: Ende der Klassen-Beta, spätestens 31.12.2026), dann Entscheidung Löschen/Behalten; bis dahin keine automatische Löschung |
| E10 | Team darf fremde Inhalte nicht mehr direkt löschen | Ja |
| E11 | `geloest` nicht mehr frei änderbar | Ja |
| E12 | Bearbeiten ausgeblendeter eigener Inhalte bleibt erlaubt | Ja |
| E13 | Welches Konto ist dein Teamkonto? | Mailadresse nennen |
| E14 | Freigabe dieses Plans zum Einspielen | – |

## 10. Abnahmefälle (zusätzlich zu Spec v2 §9)

Echte Datenbank (`supabase/tests/moderation_test.sql`, rollt zurück):

1. Drei Konten melden → genau eine automatische Ausblendung + ein
   Protokolleintrag `automatik`; zwei bleiben sichtbar; eigene Wiederholung
   zählt nicht. **Parallel:** Meldung 2 und 3 in zwei Sitzungen → ausgeblendet.
2. Wiederholung `meldung_senden` bei erreichter Bremse → „bereits gemeldet“,
   nicht Bremse; 501 Codepunkte (Emoji) → `APE01`.
3. Normales Konto, `mentor`, Team ohne Paket: jede Moderations-RPC → `APR01`/`APP01`;
   direktes UPDATE/INSERT auf `meldung`, Protokoll, Ausblendung → abgelehnt.
4. Jede Zeile der Matrix 4.2; Invariante `versteckt` ⇔ aktive Ausblendung
   nach jedem Fall.
5. Neue Meldung zwischen Lesen und Entscheiden; gesehene Meldung schon
   geschlossen; Inhalt bearbeitet; zweite Entscheidung auf alten Stand →
   jeweils `APF01`, nichts geändert.
6. Gleiche `p_id` zweimal → eine Protokollzeile, eine Teamantwort, Ergebnis
   gleich; gleiche `p_id` mit anderer Aktion → `APV01`; nach `vorgang_klaeren`
   verworfen → spätes Original `APV01`.
7. Beste Antwort manuell/automatisch ausblenden → `beste = false`,
   `geloest = false`; Einblenden setzt nichts zurück.
8. Prüfanfrage: fremde/aufgehobene/vorläufige Ausblendung abgelehnt; zweite
   Anfrage → `APD01`; Wiederholung gleiche `p_id` → gleiches Ergebnis;
   `weiter_ausblenden`, `erklaerung_aendern`, `anfrage_bestaetigen` → keine neue
   Ausblendungs-ID; aufheben + neu ausblenden → neue ID, neue Anfrage möglich.
9. Antwortautor:in unter fremdem ausgeblendeten Beitrag: `eigener_inhalt`
   liefert nur die eigene Antwort, keinen fremden Titel/Text/Pfad; direkte
   Tabellenabfragen bleiben leer.
10. `meine_meldungen`: entzogenes Ziel → `titel = null`; gelöschtes Ziel →
    Zeile weg; keine Begründungen.
11. Zähler/Fälle mit 60 Zielen: Zähler stimmt, Keyset ohne Lücke/Doppel bei
    identischen Zeiten, Stufe hoch vor normal.
12. Protokoll: UPDATE/DELETE durch Team abgelehnt; Kontolöschung setzt nur
    `akteur_id` auf null.

Zusätzlich für v2 des Plans:

13. **P1:** Dritte Meldung blendet aus, Bestätigung geht verloren, Wiederholung
    → `neu = false`, `gleich = true`, kein Titel/Text im Ergebnis; Konto ohne
    Meldung zum ausgeblendeten Ziel → `APZ01`. Zwei gleichzeitige Erstversuche
    desselben Kontos → eine Meldung.
14. **P2:** Anfrage senden, Bestätigung verloren, Team hebt auf, dann
    Wiederholung mit gleicher `p_id` → gespeichertes Ergebnis `aufgehoben`,
    kein Fehler, keine zweite Zeile.
15. **P3:** Zwei Sitzungen lesen dieselbe Version und senden je
    `erklaerung_aendern` → genau eine gelingt, die andere `APF01`; Protokoll
    hat eine Zeile. Autor:in ändert Text zwischen Lesen und Entscheiden → `APF01`.
16. **P4 [mock]:** Jeder `AP…`-Code mit HTTP 400 → sichere Ablehnung mit dem
    Text aus 4.5; derselbe Code mit HTTP 503 und ein unbekannter `AP99`
    → unklar.
17. **P5:** `anfrage_aufheben` mit Korrektur: Sichtbarkeit, eine Teamantwort,
    Anfrage `aufgehoben`, Meldungen geschlossen, ein Protokolleintrag; Abbruch
    mitten drin (erzwungener Fehler nach der Teamantwort) → nichts davon bleibt.
18. **P6:** Je ein Durchlauf pro Zeile der Schreibwege-Tabelle in zwei
    Sitzungen, beide Reihenfolgen (Antwort ändern/löschen, Beitrag ändern/
    löschen, Antwort senden während Ausblenden); direktes Antwort-INSERT nach
    `revoke` → abgelehnt.

Client: Mock-Tests nach dem Muster von `community_korrekturen_test.py`
(unklarer Ausgang, Doppelklick, Kontowechsel, Fokus, axe) und – mit
`COMMUNITY_TEST_PASSWORT` – Livetests. Echte und simulierte Fälle getrennt.

## 11. Änderungen in Version 2 (ChatGPT-Gegenprüfung von `3bed8d1`)

| Nr. | Befund | Bewertung | Änderung |
|---|---|---|---|
| P1 | Wiederholung einer Meldung nach automatischer Ausblendung scheitert an der Sichtbarkeitsprüfung | bestätigt | eigene Meldung zuerst suchen (4.1), Fall 13 |
| P2 | Wiederholung einer Prüfanfrage nach Aufhebung scheitert an den Neuanlage-Bedingungen | bestätigt | Wiederholung zuerst (4.4); dasselbe Prinzip ausdrücklich auch bei Entscheidungen (4.2), Fall 14 |
| P3 | Zwei Erklärungskorrekturen werden nicht erkannt | bestätigt | `mod_version` je Ziel (2.4, 3), Fall 15 |
| P4 | `AP…`-Codes gelten im Client als unklar | bestätigt | Liste und Texte (4.5), Fall 16 |
| P5 | Aufheben einer Prüfanfrage ohne Korrekturkombination | bestätigt | Matrix 4.2, 8.2, Fall 17 |
| P6 | Sperrstrategie deckt nicht alle Schreibwege | bestätigt | Tabelle der Schreibwege (3), `revoke insert` auf `antwort`, Fall 18 |

## 12. Ergänzungen nach der Gegenprüfung von `89968be`

### 12.1 R02 – Wiedererkennung nach dem Warten

Bestätigt: Meine v2 hat ausdrücklich gesagt, Schritt 2 werde nach dem Warten
nicht wiederholt, und sich auf den Eindeutigkeitsindex verlassen. Die
Sichtbarkeitsprüfung oder die Bremse brechen aber vorher ab. Behoben in 4.1
(Schritte 3–6).

### 12.2 R03 – `antwort_senden` sperrt vor der Prüfung

Bestätigt am Code (`20261014122131_senden_mit_endstatus.sql`): Der Beitrag
wird ohne Sperre gelesen; meine Tabelle in Abschnitt 3 hat das falsch
beschrieben. Neue Reihenfolge in der RPC:

1. Sitzung, Profil, Paketsperre, Vorgangskennung (unverändert).
2. **Wiederholung zuerst:** Antwort mit `id = p_vorgang` vorhanden und
   eigene → ihre ID zurück. Das bleibt **vor** jeder Sperre und
   Sichtbarkeitsprüfung, damit eine schon angelegte Antwort auch nach einer
   späteren Ausblendung idempotent bestätigt wird.
3. **Beitrag sperren und erst danach prüfen:**
   `select * into b from public.beitrag where id = p_beitrag for share;`
   In READ COMMITTED liefert eine Sperrabfrage nach dem Warten die zuletzt
   festgeschriebene Fassung der Zeile; geprüft wird also der Stand nach einer
   laufenden Moderation. `for share` statt `for update`, damit mehrere
   Antworten auf denselben Beitrag sich nicht gegenseitig blockieren; es
   kollidiert mit dem `for update` jeder Entscheidung und von
   `beste_antwort_setzen`.
4. Prüfung „vorhanden, nicht versteckt, Gruppe/Team“ wie bisher.
5. Vorgangszeile `('antwort', 'angelegt')` mit `on conflict` wie bisher, dann
   Insert der Antwort.

**Sperrreihenfolge:** Beitrag → Vorgangszeile → Antwort. `vorgang_klaeren`
sperrt keinen Beitrag und hält nur seine Vorgangszeile; Entscheidungen
sperren Beitrag → Antwort → Ausblendung → Meldung/Anfrage und berühren keine
Vorgangszeile einer Antwort. Es gibt also keinen Zyklus, keine Verklemmung.

**Abläufe:**

- *Moderation zuerst:* Entscheidung hält `for update`, setzt `versteckt`.
  `antwort_senden` wartet in Schritt 3, liest danach `versteckt = true` →
  „Du kannst diesen Beitrag gerade nicht beantworten.“, keine Vorgangszeile,
  keine Antwort.
- *Antwort zuerst:* `antwort_senden` hält `for share` bis zum Festschreiben.
  Die Entscheidung wartet und sieht danach die neue Antwort; eine
  Ausblendung des Beitrags verbirgt sie mit.
- *Wiederholung nach späterer Ausblendung:* Schritt 2 findet die Antwort →
  gleiche ID, kein Fehler, keine zweite Antwort.

Zusätzlich bleibt der Vorschlag, den direkten Insert-Grant auf `antwort`
zu entziehen (Abschnitt 5); er ersetzt diese Änderung nicht.

### 12.3 Abnahmefälle

19. **R02:** Inhalt mit zwei fremden Meldungen; dasselbe normale Konto ruft
    `meldung_senden` in zwei Sitzungen gleichzeitig auf (erste hält die Sperre
    per `pg_sleep` im Test-Wrapper). Ergebnis: genau eine neue Meldung, genau
    eine automatische Ausblendung, ein Protokolleintrag `automatik`, beide
    Aufrufe erhalten dieselbe `meldung_id`, keiner bekommt Titel/Text oder
    `APZ01`. Dasselbe, wenn das Konto mit der ersten Meldung die Bremse (30/h)
    erreicht: der zweite Aufruf erhält die vorhandene Meldung, nicht `APB01`.
20. **R03, Moderation zuerst:** Sitzung A sperrt den Beitrag `for update` und
    blendet aus, ohne festzuschreiben; Sitzung B ruft `antwort_senden` und
    wartet; A schreibt fest → B abgelehnt, 0 neue Antworten, keine
    Vorgangszeile `angelegt`.
21. **R03, Antwort zuerst:** B hält `antwort_senden` offen, A entscheidet →
    A wartet, danach Antwort vorhanden und mit ausgeblendet; keine
    Verklemmung (Test mit `lock_timeout` 5 s, Erwartung: kein Timeout).
22. **R03, Wiederholung:** Antwort angelegt, danach Beitrag ausgeblendet,
    `antwort_senden` mit derselben Kennung → dieselbe ID, keine zweite Zeile.
23. **R03 heute:** Derselbe Ablauf wie Fall 20 am unveränderten Stand liefert
    eine Antwort unter dem ausgeblendeten Beitrag (Gegenprobe, ChatGPT lokal
    bereits gezeigt; vor dem Einspielen erneut gegen eine Testdatenbank).

Die Fälle 19–23 laufen mit zwei echten Datenbankverbindungen (kleines
Python-Skript mit zwei Sitzungen gegen eine Supabase-Branch- oder lokale
Testdatenbank), nicht als Mock; Ergebnisse getrennt von den Mock-Tests.
