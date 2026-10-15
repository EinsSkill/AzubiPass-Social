#!/usr/bin/env python3
"""
AzubiPass Social · Konkurrenztests mit zwei echten Datenbankverbindungen.

    PGHOST=/var/tmp/pgtest PGPORT=54329 python3 konkurrenz.py g06 [--alt]

Läuft gegen die LOKALE Testdatenbank (supabase_grundlage.sql + echte
Migrationen, aufgebaut mit aufbauen.sh). --alt baut nur bis vor die zu
prüfende Migration auf (Gegenprobe am alten Stand). Kein Test gegen das Supabase-Projekt, keine Storage-API.

Ausgabe: OK/FEHL je Fall [lokal-sql]; Rückgabewert 1 bei einem Fehler.
"""
import json
import os
import subprocess
import sys
import threading
import time
import uuid
from pathlib import Path

import psycopg

HIER = Path(__file__).resolve().parent
SUPA = HIER.parent.parent
DB = os.environ.get("PGDATABASE", "azubipass_test")
fehler = []


def pruefe(bed, text, wert=""):
    print(f"  {'OK  ' if bed else 'FEHL'} [lokal-sql] {text}" + (f"  {wert}" if wert != "" else ""))
    if not bed:
        fehler.append(text)


def aufbauen(bis=None, neu_dateien=()):
    """Alle Migrationen (oder nur bis einschließlich `bis`), danach optionale neue Dateien."""
    subprocess.run(["sh", str(HIER / "aufbauen.sh")] + ([bis] if bis else []), check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, env=dict(os.environ, PGDATABASE=DB))
    for f in neu_dateien:
        subprocess.run(["psql", "-U", "postgres", "-d", DB, "-q", "-v", "ON_ERROR_STOP=1", "-f", str(f)],
                       check=True, stdout=subprocess.DEVNULL)


def verbindung():
    return psycopg.connect(dbname=DB, user="postgres", autocommit=False)


def als(c, nutzer):
    """Transaktion als angemeldete Person: Rolle authenticated + JWT-Claims."""
    c.execute("set local role authenticated")
    c.execute("select set_config('request.jwt.claims', %s, true)",
              (json.dumps({"sub": str(nutzer), "role": "authenticated"}),))


def wartet(pid, sekunden=3.0):
    """Wartet die Verbindung mit dieser PID auf eine Sperre?"""
    with psycopg.connect(dbname=DB, user="postgres", autocommit=True) as w:
        ende = time.time() + sekunden
        while time.time() < ende:
            r = w.execute("select wait_event_type from pg_stat_activity where pid = %s", (pid,)).fetchone()
            if r and r[0] == "Lock":
                return True
            time.sleep(0.05)
    return False


def im_hintergrund(f):
    erg = {}

    def lauf():
        try:
            erg["wert"] = f()
        except Exception as e:  # noqa: BLE001 – Ergebnis wird geprüft
            erg["fehler"] = e
    t = threading.Thread(target=lauf)
    t.start()
    return t, erg


def nutzer_anlegen(code, *namen, tester=True):
    ids = {}
    with verbindung() as c:
        c.execute("insert into public.zugangscode (code, bezeichnung) values (%s, 'Test') on conflict do nothing", (code,))
        for n in namen:
            i = uuid.uuid4()
            ids[n] = i
            c.execute("insert into auth.users (id, email, aud, role) values (%s, %s, 'authenticated', 'authenticated')",
                      (i, f"{n}-{i.hex[:6]}@test.invalid"))
            if tester:
                c.execute("insert into public.beitraege_tester (nutzer_id) values (%s)", (i,))
        c.commit()
        for n, i in ids.items():
            als(c, i)
            c.execute("select public.profil_anlegen(%s, 2::smallint, %s, true, true)", (n.capitalize(), code.replace("-", "")))
            c.commit()
    return ids


def datei(nutzer):
    pfad = f"{nutzer}/{uuid.uuid4()}.png"
    with verbindung() as c:
        c.execute("insert into storage.objects (bucket_id, name, owner) values ('lernzettel', %s, %s)", (pfad, nutzer))
        c.commit()
    return pfad


def zaehle(sql, *a):
    with psycopg.connect(dbname=DB, user="postgres", autocommit=True) as c:
        return c.execute(sql, a).fetchone()[0]


def veroeffentlichen(c, vorgang, pfad):
    c.execute("select public.beitrag_veroeffentlichen(%s, 'lernzettel', 'Lernzettel Test', '', null, null, false, %s, 'bild')",
              (vorgang, pfad))


# ------------------------------------------------------------------ G06
def g06(alt):
    aufbauen("20261015125054" if alt else None)   # alt: ohne 20261015125055_dateischutz_sperre
    ids = nutzer_anlegen("TEST-G06-01", "anna", "kim")
    ids.update(nutzer_anlegen("TEST-G06-02", "ohne", tester=False))
    a = ids["anna"]

    print("G06 Fall A · Veröffentlichen zuerst, Löschen wartet")
    pfad, v = datei(a), uuid.uuid4()
    c1, c2 = verbindung(), verbindung()
    als(c1, a)
    veroeffentlichen(c1, v, pfad)                         # hält FOR SHARE, offen
    als(c2, a)
    t, erg = im_hintergrund(lambda: c2.execute(
        "delete from storage.objects where bucket_id = 'lernzettel' and name = %s", (pfad,)).rowcount)
    pruefe(wartet(c2.info.backend_pid), "Löschen wartet auf die laufende Veröffentlichung")
    c1.commit()
    t.join(10)
    c2.commit()
    geloescht = erg.get("wert")
    beitraege = zaehle("select count(*) from public.beitrag where id = %s", v)
    objekte = zaehle("select count(*) from storage.objects where name = %s", pfad)
    if alt:
        pruefe(beitraege == 1 and objekte == 0, "Gegenprobe alter Stand: Beitrag ohne Datei (Lücke vorhanden)",
               f"geloescht={geloescht} beitraege={beitraege} objekte={objekte}")
    else:
        pruefe(geloescht == 0 and beitraege == 1 and objekte == 1, "0 gelöscht, Beitrag und Datei vorhanden",
               f"geloescht={geloescht} beitraege={beitraege} objekte={objekte}")
    c1.close(); c2.close()

    print("G06 Fall B · Löschen zuerst, Veröffentlichen wartet")
    pfad, v = datei(a), uuid.uuid4()
    c1, c2 = verbindung(), verbindung()
    als(c2, a)
    n = c2.execute("delete from storage.objects where bucket_id = 'lernzettel' and name = %s", (pfad,)).rowcount
    als(c1, a)
    t, erg = im_hintergrund(lambda: veroeffentlichen(c1, v, pfad))
    pruefe(n == 1 and wartet(c1.info.backend_pid), "Veröffentlichen wartet auf das laufende Löschen")
    c2.commit()
    t.join(10)
    f = erg.get("fehler")
    c1.rollback()
    pruefe(f is not None and "nicht hochgeladen" in str(f), "Veröffentlichen abgelehnt: Datei nicht hochgeladen", str(f)[:80])
    pruefe(zaehle("select count(*) from public.beitrag where id = %s", v) == 0
           and zaehle("select count(*) from storage.objects where name = %s", pfad) == 0,
           "Kein Beitrag, keine Datei")
    c1.close(); c2.close()

    print("G06 Fall C · geschlossene Paketsperre (Konto ohne Testerfreigabe)")
    o = ids["ohne"]
    pfad, v = datei(o), uuid.uuid4()
    with verbindung() as c:
        als(c, o)
        try:
            veroeffentlichen(c, v, pfad)
            pruefe(False, "Veröffentlichen bei geschlossener Sperre abgelehnt")
        except psycopg.Error as e:
            pruefe("nicht freigeschaltet" in str(e), "Veröffentlichen bei geschlossener Sperre abgelehnt", str(e)[:60])
        c.rollback()
        als(c, o)
        n = c.execute("delete from storage.objects where bucket_id = 'lernzettel' and name = %s", (pfad,)).rowcount
        c.commit()
        # Wie vor G06: Ohne Freigabe sind auch eigene Dateien nicht lesbar (Leseregel
        # mit beitraege_frei), also nicht löschbar. Hochladen geht dann ebenfalls nicht.
        pruefe(n == 0, "Bei geschlossener Sperre: eigene Datei weder lesbar noch löschbar (unverändert)", n)

    print("G06 Fall D · direkter Beitrags-Insert")
    k = ids["kim"]
    with verbindung() as c:
        als(c, k)
        gid = c.execute("select public.gruppe_gruenden('Testgruppe G06', '', true)").fetchone()[0]
        c.commit()

    def direkt(werte, name):
        with verbindung() as c:
            als(c, k)
            try:
                c.execute("insert into public.beitrag (gruppe_id, art, titel, text, datei_pfad, datei_art) "
                          "values (%s, %s, %s, '', %s, %s)", werte)
                c.commit()
                return "ok"
            except psycopg.Error as e:
                c.rollback()
                return "abgelehnt" if "row-level security" in str(e) else str(e)[:60]
    kd = datei(k)
    r1 = direkt((None, "tipp", "Allgemein direkt", None, None), "allgemein")
    r2 = direkt((gid, "lernzettel", "Gruppe mit Datei", kd, "bild"), "datei")
    r3 = direkt((gid, "tipp", "Gruppe ohne Datei", None, None), "gruppe")
    if alt:
        pruefe(r1 == "ok" and r2 == "ok", "Gegenprobe alter Stand: allgemein und mit Datei direkt möglich", f"{r1} {r2}")
    else:
        pruefe(r1 == "abgelehnt", "Allgemeiner Beitrag direkt abgelehnt", r1)
        pruefe(r2 == "abgelehnt", "Gruppenbeitrag mit Datei direkt abgelehnt", r2)
    pruefe(r3 == "ok", "Gruppen-Textbeitrag ohne Datei weiter möglich", r3)

# ------------------------------------------------------------------ R03
def frage(c, autor):
    v = uuid.uuid4()
    als(c, autor)
    c.execute("select public.beitrag_veroeffentlichen(%s, 'frage', 'Frage R03', 'Text', null, null, false, null, null)", (v,))
    c.commit()
    return v


def ausblenden_offen(c, beitrag):
    """Wie eine Moderation: Beitrag FOR UPDATE sperren und ausblenden, ohne Commit."""
    c.execute("select 1 from public.beitrag where id = %s for update", (beitrag,))
    c.execute("update public.beitrag set versteckt = true where id = %s", (beitrag,))


def antworten(c, nutzer, vorgang, beitrag):
    als(c, nutzer)
    return c.execute("select public.antwort_senden(%s, %s, 'Antwort R03')", (vorgang, beitrag)).fetchone()[0]


def r03(alt):
    aufbauen("20261015125102" if alt else None)   # alt: ohne 20261015125103_antwort_senden_sperre
    ids = nutzer_anlegen("TEST-R03-01", "anna", "ben")
    a, b = ids["anna"], ids["ben"]

    print("R03 Fall 20/23 · Moderation zuerst, Antwort wartet")
    with verbindung() as c:
        f = frage(c, a)
    c1, c2 = verbindung(), verbindung()
    ausblenden_offen(c1, f)
    v = uuid.uuid4()
    t, erg = im_hintergrund(lambda: antworten(c2, b, v, f))
    pruefe(wartet(c2.info.backend_pid), "Antwort wartet auf die laufende Ausblendung")
    c1.commit()
    t.join(10)
    if "fehler" in erg: c2.rollback()
    else: c2.commit()
    n = zaehle("select count(*) from public.antwort where beitrag_id = %s", f)
    vz = zaehle("select count(*) from public.vorgang where id = %s", v)
    if alt:
        pruefe(n == 1, "Gegenprobe alter Stand: Antwort unter ausgeblendetem Beitrag (Lücke vorhanden)", f"antworten={n}")
    else:
        pruefe("fehler" in erg and "nicht beantworten" in str(erg["fehler"]), "Antwort nach dem Warten abgelehnt",
               str(erg.get("fehler", erg.get("wert")))[:60])
        pruefe(n == 0 and vz == 0, "Keine Antwort, keine Vorgangszeile", f"antworten={n} vorgang={vz}")
    c1.close(); c2.close()

    print("R03 Fall 21 · Antwort zuerst, Moderation wartet, keine Verklemmung")
    with verbindung() as c:
        f = frage(c, a)
    c1, c2 = verbindung(), verbindung()
    v = uuid.uuid4()
    antworten(c2, b, v, f)                                # offen
    c1.execute("set local lock_timeout = '5s'")
    t, erg = im_hintergrund(lambda: ausblenden_offen(c1, f))
    pruefe(wartet(c1.info.backend_pid), "Moderation wartet auf die laufende Antwort")
    c2.commit()
    t.join(10)
    pruefe("fehler" not in erg, "Kein Sperr-Timeout, keine Verklemmung", str(erg.get("fehler", ""))[:60])
    c1.commit()
    pruefe(zaehle("select count(*) from public.antwort where id = %s", v) == 1
           and zaehle("select versteckt::int from public.beitrag where id = %s", f) == 1,
           "Antwort vorhanden, Beitrag danach ausgeblendet")
    c1.close(); c2.close()

    print("R03 Fall 22 · Wiederholung nach späterer Ausblendung")
    with verbindung() as c:
        r = antworten(c, b, v, f)
        c.commit()
    pruefe(str(r) == str(v) and zaehle("select count(*) from public.antwort where id = %s", v) == 1,
           "Gleiche Kennung ⇒ dieselbe ID, keine zweite Antwort")

    print("R03 · zwei Antworten gleichzeitig blockieren sich nicht")
    with verbindung() as c:
        f = frage(c, a)
    c1, c2 = verbindung(), verbindung()
    antworten(c1, a, uuid.uuid4(), f)
    t, erg = im_hintergrund(lambda: antworten(c2, b, uuid.uuid4(), f))
    t.join(3)
    pruefe(not t.is_alive() and "fehler" not in erg, "Zweite Antwort läuft ohne Warten durch")
    c1.commit(); c2.commit(); c1.close(); c2.close()


FAELLE = {"g06": g06, "r03": r03}

if __name__ == "__main__":
    welche = [a for a in sys.argv[1:] if not a.startswith("--")] or list(FAELLE)
    alt = "--alt" in sys.argv
    for w in welche:
        FAELLE[w](alt)
    print()
    print("Alles bestanden" if not fehler else f"{len(fehler)} Fehler")
    sys.exit(1 if fehler else 0)
