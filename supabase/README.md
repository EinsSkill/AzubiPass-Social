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
