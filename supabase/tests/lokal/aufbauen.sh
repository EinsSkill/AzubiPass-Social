#!/bin/sh
# Lokale Testdatenbank neu aufbauen: Grundlage + alle Migrationen in Reihenfolge.
#   PGHOST=/var/tmp/pgtest PGPORT=54329 sh supabase/tests/lokal/aufbauen.sh [bis-version]
# Ohne Argument alle Migrationen; mit Argument nur bis einschließlich dieser Version.
set -e
cd "$(dirname "$0")/../.."
DB=${PGDATABASE:-azubipass_test}
psql -U postgres -d postgres -qc "drop database if exists $DB" -c "create database $DB"
psql -U postgres -d "$DB" -q -v ON_ERROR_STOP=1 -f tests/lokal/supabase_grundlage.sql
for f in migrations/*.sql; do
  v=$(basename "$f" | cut -d_ -f1)
  if [ -n "$1" ] && [ "$v" \> "$1" ]; then break; fi
  psql -U postgres -d "$DB" -q -v ON_ERROR_STOP=1 -f "$f" >/dev/null
done
psql -U postgres -d "$DB" -tAc "select 'Migrationen bis: ' || coalesce('$1', 'alle')"
