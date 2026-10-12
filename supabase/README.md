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

## Testkonten ohne Profil

`quellen/community_zugang_test.py` braucht neun Konten **ohne** Profil
(`COMMUNITY_TEST_NEU`); nach einem Lauf haben sie eins. Angelegt sind
alle `@azubipass.invalid` (gleiches Passwort wie die Demo-Konten). Stand 12.10.2026: `test-neu1` bis `test-neu88`; noch **ohne** Profil: 26–28, 33,
34, 37, 42, 43, 46, 51, 52, 55–88 (45 Konten). Der Zugangstest braucht seit dem
12.10. neun davon je Lauf. Alle Testkonten tragen in `raw_app_meta_data` den Eintrag `"demo": true`.
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

## Bekannte Grenzen

- Speicherregel „lernzettel: sehen …“ erlaubt das Lesen von Dateien im **eigenen**
  Ordner ohne Profilprüfung. Relevant nur, wenn ein Profil entfernt wird, aber
  Dateien bleiben. Hinweis aus ChatGPTs Review vom 12.10.2026; bewusst noch nicht
  geändert (kein Auftrag für Regeländerungen).
