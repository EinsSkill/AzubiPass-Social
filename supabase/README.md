# Supabase · AzubiPass Social

Projekt: `azubipass-social` (Region Frankfurt, eu-central-1).

- `migrations/` – genau die Migrationen, die in der Datenbank eingespielt sind,
  benannt nach ihrer Version in `supabase_migrations.schema_migrations`.
- `ausstehend/` – vorbereitet, aber noch **nicht** eingespielt.
- `tests/regeln_test.sql` – prüft die Zugriffsregeln mit drei Testnutzern und
  rollt danach alles zurück. Nach jeder Änderung an Regeln oder Rechten laufen lassen.

## Grundsätze

- Alles liegt hinter Row Level Security. Ohne Profil (und damit ohne gültigen
  Beta-Zugangscode) sieht ein angemeldetes Konto nichts; anonyme Zugriffe gar nichts.
- Schreibrechte sind auf einzelne Spalten begrenzt (z. B. kann niemand selbst
  `rolle` oder `versteckt` setzen).
- Aktionen mit Sonderrechten (Profil anlegen, Gruppe gründen/beitreten,
  beste Antwort, Moderation) laufen als RPC-Funktionen mit eigener Rechteprüfung.
- Zugangscodes stehen nur in der Datenbank, nie im Repo.
- Die Rolle `team` wird nur direkt in der Datenbank vergeben.

## Demo-Konten

`demo-anna@azubipass.invalid` und `demo-ben@azubipass.invalid` haben ein
Passwort (nicht im Repo), weil Anmelde-Mails ohne eigenen Mailversand nicht
ankommen. Sie dienen `quellen/community_test.py` und der Präsentation. Die App
selbst bietet nur die Anmeldung per Mail an.

    cd quellen
    COMMUNITY_TEST_PASSWORT=… COMMUNITY_TEST_CODE=DEMO-… python3 community_test.py

## Team-Testkonto

`test-neu1@azubipass.invalid` hat seit 12.10.2026 die Rolle `team` (direkt in
der Datenbank gesetzt). Nur für Tests: `community_test.py` und
`community_beitraege_test.py` blenden damit Testbeiträge aus und wieder ein.

    cd quellen
    COMMUNITY_TEST_PASSWORT=… python3 community_beitraege_test.py [--bilder ORDNER]

## Testkonten ohne Profil

`quellen/community_zugang_test.py` braucht neun Konten **ohne** Profil
(`COMMUNITY_TEST_NEU`); nach einem Lauf haben sie eins. Angelegt sind
alle `@azubipass.invalid` (gleiches Passwort wie die Demo-Konten). Stand 12.10.2026 (abends): `test-neu1` bis `test-neu88`; noch **ohne** Profil: 51, 52,
55–88 (36 Konten). Der Zugangstest braucht neun davon je Lauf. Alle Testkonten tragen in `raw_app_meta_data` den Eintrag `"demo": true`.
Neue Konten im SQL-Editor anlegen (`<HASH>` = bcrypt-Hash des Testpassworts,
steht nicht im Repo; `<VON>`/`<BIS>` = Nummernbereich):

```sql
with neu as (
  select gen_random_uuid() as id, 'test-neu' || n || '@azubipass.invalid' as email
  from generate_series(<VON>, <BIS>) n
), u as (
  insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token,
    email_change_token_new, email_change, email_change_token_current, reauthentication_token,
    phone_change, phone_change_token)
  select '00000000-0000-0000-0000-000000000000', id, 'authenticated', 'authenticated', email,
    '<HASH>', now(), '{"provider":"email","providers":["email"],"demo":true}', '{}', now(), now(),
    '', '', '', '', '', '', '', ''
  from neu returning id, email
)
insert into auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
select id::text, id, json_build_object('sub', id::text, 'email', email, 'email_verified', true),
       'email', now(), now(), now() from u;
```

## Dateizugriff (Entscheidung 12.10.2026)

Die App holt Dateien nur noch **angemeldet** (`storage.download` mit der
Sitzung der Person, `AP.community.dateiLaden`). Es gibt keine signierten,
weitergebbaren Links mehr. Bei jedem Abruf prüft die Regel
„lernzettel: sehen, wenn der Beitrag sichtbar ist“ neu:

- freigeschaltetes Profil (seit `20261012132518_dateien_rechte`, auch für den
  eigenen Ordner – die frühere Ausnahme ist damit geschlossen),
- und eigener Ordner **oder** ein Beitrag mit diesem Pfad, den die Person laut
  den Regeln von `beitrag` gerade sehen darf (ausgeblendet, gelöscht, fremde
  Gruppe ⇒ kein Abruf).

Belegt in `quellen/community_test.py`: ausblenden ⇒ der nächste Abruf einer
anderen Person scheitert sofort; wieder einblenden ⇒ Abruf klappt; Autor:in
sieht die eigene Datei weiter.

Verbleibende Grenzen – ehrlich benannt:

- Was schon im Browser angekommen ist, lässt sich nicht zurückholen: eine
  angezeigte oder heruntergeladene Datei bleibt beim Gegenüber. Die App gibt
  ihre blob:-Adressen beim Ansichtswechsel, Offline und Kontowechsel frei.
- Jeder Abruf trägt einen eigenen `cacheNonce`, damit kein Zwischenspeicher
  eine alte Antwort liefert. Der Browser darf die Antwort laut `cacheControl`
  (60 s) trotzdem kurz vorhalten; die App fragt aber mit neuer Adresse.
- Löscht das **Team** einen fremden Beitrag, bleibt die Datei im Ordner der
  Autor:in liegen (Löschregel: nur eigener Ordner). Lesen kann sie dann nur
  noch die Autor:in selbst. Gehört ins Paket Melden/Moderation.
- Fehler beim Löschen der Datei werden gemeldet (`fehler.art = "datei"`,
  `fehler.dateiPfad`); `AP.community.dateiEntfernen(pfad)` wiederholt.
- Echte Uploads sind damit technisch abgesichert, aber erst mit dem Paket
  „Beitrag erstellen“ freigegeben.

## Paketsperre Beiträge (Entscheidung 13.10.2026, Spec 05)

Das ganze Beiträge-Paket (Übersicht, Detail, Schreiben, Antworten, Dateien)
startet **geschlossen**. Technik und Begründung: `doku/community/05-technik-plan.md`.

- Schalter `public.freigabe` (`schalter = 'beitraege'`, `offen = false`). Nur
  die Datenbankverwaltung ändert ihn.
- Ausnahmen: `public.beitraege_tester` – ausdrücklich benannte interne
  Testkonten (`demo-anna`, `demo-ben`, `test-neu1`). Keine Policy, keine
  Rechte für `anon`/`authenticated`: Nur die Datenbankverwaltung pflegt sie.
- `public.beitraege_frei()` ist Teil der Regeln für `beitrag` (lesen,
  anlegen) und `storage.objects` im Bucket `lernzettel` (lesen, hochladen).
  Antworten, Hilfreich und Meldungen hängen über „Beitrag sichtbar“ mit dran.
  `beitrag_veroeffentlichen`, `antwort_senden` und `beste_antwort` prüfen die
  Sperre selbst.

Weiteres internes Testkonto (z. B. für eine Vorführung) aufnehmen:

```sql
insert into public.beitraege_tester (nutzer_id)
select id from auth.users where email = '…';
```

**Öffnen nur nach gesonderter Freigabe von Lukes** (Spec 05, Abschnitt 2:
C04/C05, C06/Antworten, Melden und Moderation gemeinsam geprüft, Mailversand
und Datenschutz bereit):

```sql
update public.freigabe set offen = true, geaendert_am = now() where schalter = 'beitraege';
```

Belegt in `quellen/community_schreiben_test.py` (Klassenkonto `test-neu2`):
kein Lesen, kein Veröffentlichen (RPC und alter Insert), keine Antwort, kein
Upload in den eigenen Ordner; die Oberfläche fragt bei gesperrtem Konto keine
Beiträge, Antworten oder Dateien ab.

## Verlässliches Senden (Spec 05, Korrekturen G03/G05 vom 14.10.2026)

`beitrag_veroeffentlichen(p_vorgang, …)` und `antwort_senden(p_vorgang, …)`
nehmen eine Vorgangskennung aus der App, die zur ID der neuen Zeile wird. Ein
zweiter Versuch mit derselben Kennung liefert dieselbe ID, nie eine zweite
Zeile. Dateien liegen unter `‹konto›/‹vorgang›.‹endung›`.

**Endstatus** (`public.vorgang`, nur über Funktionen erreichbar): Das Senden
trägt vor dem Anlegen `angelegt` ein, `vorgang_klaeren(p_vorgang, p_art)`
trägt `verworfen` ein, falls noch nichts da ist. Der Primärschlüssel
serialisiert beide; wer zuerst kommt, gewinnt. Ein verworfener Vorgang kann
nie mehr veröffentlicht werden („Dieser Vorgang wurde abgebrochen.“). Eine
sichere Ablehnung rollt die Vorgangszeile mit zurück. Inhalte aus der Zeit vor
der Tabelle gelten beim Klären als `angelegt`.

**App:** Nur ein Postgres-Fehlercode (oder eine Ablehnung vor der Ausführung)
gilt als sicher abgelehnt; Abbruch, HTTP 5xx und Gateway-Fehler sind „unklar“.
Bei „unklar“ sind die Eingaben gesperrt; „Status prüfen“ liest nur (ohne
Treffer bleibt der Ausgang offen), „Erneut senden“ schickt denselben
eingefrorenen Stand mit derselben Kennung, „Eingaben ändern“ klärt endgültig.
Geänderte Eingaben bekommen erst nach `verworfen` eine neue Kennung. Die
Datei eines Vorgangs wird nur nach `verworfen` entfernt.

**Löschschutz:** Die Speicherregel „lernzettel: eigene löschen“ verbietet das
Löschen einer Datei, auf die ein Beitrag zeigt (`datei_in_gebrauch`, security
definer, auch bei geschlossener Paketsperre). `beitrag_veroeffentlichen`
sperrt die Dateizeile (`for share`) bis zum Festschreiben.

**Beste Antwort:** `beste_antwort_setzen(p_antwort, p_beste)` setzt den
gewünschten Zustand, schaltet nie um; die Beitragszeile wird gesperrt.
Der alte Umschalt-Weg `beste_antwort(uuid)` ist für Konten gesperrt (revoke);
das endgültige Entfernen liegt in `ausstehend/beste_antwort_entfernen.sql`
(das Supabase-MCP verlangt für `drop` eine eigene Bestätigung).

Prüfung gegen die echte Datenbank: `tests/korrekturen_g03_g05_test.sql`
(rollt alles zurück). Bekannte Grenzen: Die Tabelle `vorgang` wächst um eine
Zeile pro Sendung (Aufräumen später). Bei einem Kontowechsel zwischen Upload
und Veröffentlichen bleibt die hochgeladene Datei im Ordner des alten Kontos.
Schlägt das Entfernen nach `verworfen` fehl, bleibt die Datei im eigenen,
privaten Ordner.
