#!/usr/bin/env python3
"""
AzubiPass Social · Konkurrenztests mit zwei echten Datenbankverbindungen.

    PGHOST=/var/tmp/pgtest PGPORT=54329 python3 konkurrenz.py [g06] [r03] [moderation] [r06] [r07] [--alt]

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
    # Offene Verbindungen früherer Fälle beenden, sonst scheitert das Neuanlegen der Datenbank.
    with psycopg.connect(dbname="postgres", user="postgres", autocommit=True) as w:
        w.execute("select pg_terminate_backend(pid) from pg_stat_activity where datname = %s and pid <> pg_backend_pid()", (DB,))
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

# ------------------------------------------------------------------ Spec 06 Moderation
NEU = ["1_moderation_tabellen", "2_moderation_kern", "3_melden", "4a_wirkung", "4_entscheiden",
       "5_moderation_lesen", "5a_moderation_fall", "6_eigene_inhalte", "7_moderation_rechte"]


def moderation_dateien():
    """Noch nicht eingespielte Dateien aus supabase/neu/, sonst nichts (dann sind es Migrationen)."""
    return [SUPA / "neu" / f"{n}.sql" for n in NEU if (SUPA / "neu" / f"{n}.sql").exists()]


ALT_MELDEN = False


def melden(c, nutzer, art, ziel, grund="spam"):
    als(c, nutzer)
    if ALT_MELDEN:      # Stand vor Spec 06: direktes INSERT, Trigger zählt ohne Sperre
        spalte = "beitrag_id" if art == "beitrag" else "antwort_id"
        return c.execute(f"insert into public.meldung ({spalte}, grund) values (%s, %s) returning id, true",
                         (ziel, grund)).fetchone()
    return c.execute("select meldung_id, neu from public.meldung_senden(%s, %s, %s, '')", (art, ziel, grund)).fetchone()


def fall(nutzer, art, ziel):
    with verbindung() as c:
        als(c, nutzer)
        return c.execute("select public.moderation_fall(%s, %s)", (art, ziel)).fetchone()[0]


def entscheiden(c, team, f, aktion, autor=None, intern=None, kategorie=None, korr=None, meldungen=None):
    als(c, team)
    ids = meldungen if meldungen is not None else [m["id"] for m in f["meldungen"]]
    aus = (f.get("ausblendung") or {}).get("id")
    anf = (f.get("pruefanfrage") or {}).get("id")
    return c.execute("select public.moderation_entscheiden(%s, %s, %s, %s, %s::uuid[], %s, %s, %s, %s, %s, %s, %s)",
                     (uuid.uuid4(), f["art"], f["ziel"], aktion, ids, anf, aus, f["version"], intern, autor,
                      kategorie, korr)).fetchone()[0]


def moderation(alt):
    global ALT_MELDEN
    ALT_MELDEN = alt
    # alt: Stand vor Spec 06 (ohne 20261015130421_moderation_tabellen_1 und Folgende)
    aufbauen("20261015130420" if alt else None, [] if alt else moderation_dateien())
    ids = nutzer_anlegen("TEST-MOD-K1", "anna", "ben", "cem", "dana", "team")
    a, b, c_, d, t = (ids[n] for n in ("anna", "ben", "cem", "dana", "team"))
    with verbindung() as c:
        c.execute("update public.profil set rolle = 'team' where id = %s", (t,))
        c.commit()

    def neuer_beitrag():
        with verbindung() as c:
            return frage(c, a)

    print("Fall 1 · Meldung 2 und 3 gleichzeitig (zwei Konten) → genau eine Ausblendung")
    f = neuer_beitrag()
    with verbindung() as c:
        melden(c, b, "beitrag", f); c.commit()
    c1, c2 = verbindung(), verbindung()
    melden(c1, c_, "beitrag", f)                             # Meldung 2, offen
    t2, erg = im_hintergrund(lambda: melden(c2, d, "beitrag", f))
    gewartet = wartet(c2.info.backend_pid)
    c1.commit(); t2.join(10); c2.commit()
    versteckt = zaehle("select versteckt::int from public.beitrag where id = %s", f)
    if alt:
        pruefe(versteckt == 0 and not gewartet, "Gegenprobe alter Stand: drei Meldungen, nicht ausgeblendet (B4)",
               f"gewartet={gewartet} versteckt={versteckt}")
    else:
        pruefe(gewartet, "Meldung 3 wartet auf die laufende Meldung 2")
        pruefe(versteckt == 1 and zaehle("select count(*) from public.ausblendung where beitrag_id = %s", f) == 1
               and zaehle("select count(*) from public.moderation_entscheidung where beitrag_id = %s", f) == 1,
               "Ausgeblendet, eine Ausblendung, ein Protokolleintrag")
    c1.close(); c2.close()
    if alt:
        return

    print("Fall 19 · R02: dasselbe Konto meldet doppelt gleichzeitig, dritte Meldung blendet aus")
    f = neuer_beitrag()
    with verbindung() as c:
        melden(c, b, "beitrag", f); c.commit()
        melden(c, c_, "beitrag", f); c.commit()
    c1, c2 = verbindung(), verbindung()
    r1 = melden(c1, d, "beitrag", f)                         # dritte, blendet aus, offen
    t2, erg = im_hintergrund(lambda: melden(c2, d, "beitrag", f))
    pruefe(wartet(c2.info.backend_pid), "Zweiter Aufruf wartet auf die Sperre")
    c1.commit(); t2.join(10); c2.commit()
    r2 = erg.get("wert")
    pruefe(r2 is not None and str(r2[0]) == str(r1[0]) and r2[1] is False,
           "Beide Aufrufe: dieselbe Meldung, kein APZ01", str(erg.get("fehler", r2))[:70])
    pruefe(zaehle("select count(*) from public.meldung where beitrag_id = %s and melder_id = %s", f, d) == 1
           and zaehle("select count(*) from public.ausblendung where beitrag_id = %s", f) == 1,
           "Genau eine Meldung, eine Ausblendung")

    print("Fall 19b · R02 mit Bremse: erster Aufruf erreicht die 30, zweiter erkennt die Meldung")
    b = nutzer_anlegen("TEST-MOD-K2", "emil")["emil"]                # frisches Konto ohne Meldungen
    f = neuer_beitrag()
    with verbindung() as c:
        c.execute("insert into public.beitrag (autor_id, art, titel, text) select %s, 'tipp', 'Füll ' || g, '' "
                  "from generate_series(1, 29) g", (b,))
        c.execute("insert into public.meldung (melder_id, beitrag_id, grund) select %s, id, 'spam' from public.beitrag "
                  "where titel like 'Füll %%'", (b,))
        c.commit()
    c1, c2 = verbindung(), verbindung()
    r1 = melden(c1, b, "beitrag", f)                         # Meldung Nr. 30 des Kontos
    t2, erg = im_hintergrund(lambda: melden(c2, b, "beitrag", f))
    pruefe(wartet(c2.info.backend_pid), "Zweiter Aufruf wartet")
    c1.commit(); t2.join(10); c2.commit()
    r2 = erg.get("wert")
    weiteres = neuer_beitrag()
    with verbindung() as c:          # Gegenprobe: ein neues Ziel scheitert jetzt an der Bremse
        try:
            melden(c, b, "beitrag", weiteres); bremse = "keine"
        except psycopg.Error as e:
            bremse = e.sqlstate
    pruefe(bremse == "APB01", "Danach greift die Bremse für neue Ziele", bremse)
    pruefe(r2 is not None and str(r2[0]) == str(r1[0]), "Zweiter Aufruf: vorhandene Meldung statt APB01",
           str(erg.get("fehler", r2))[:70])

    print("Fall 15 · P3: zwei Erklärungskorrekturen auf dieselbe Version")
    f = neuer_beitrag()
    fa = fall(t, "beitrag", f)
    with verbindung() as c:
        entscheiden(c, t, fa, "ausblenden", autor="Erste Erklärung", kategorie="spam"); c.commit()
    fa = fall(t, "beitrag", f)
    c1, c2 = verbindung(), verbindung()
    entscheiden(c1, t, fa, "erklaerung_aendern", autor="Zweite A")
    t2, erg = im_hintergrund(lambda: entscheiden(c2, t, fa, "erklaerung_aendern", autor="Zweite B"))
    pruefe(wartet(c2.info.backend_pid), "Zweite Korrektur wartet")
    c1.commit(); t2.join(10)
    e = erg.get("fehler")
    c2.rollback()
    pruefe(e is not None and getattr(e, "sqlstate", "") == "APF01", "Zweite scheitert mit APF01", getattr(e, "sqlstate", e))
    pruefe(zaehle("select count(*) from public.moderation_entscheidung where beitrag_id = %s and aktion = 'erklaerung_aendern'", f) == 1,
           "Genau ein Protokolleintrag")
    c1.close(); c2.close()

    print("Fall 18 · P6: Autor:in ändert die Antwort während einer Entscheidung")
    f = neuer_beitrag()
    with verbindung() as c:
        als(c, b); an = c.execute("select public.antwort_senden(%s, %s, 'Antwort')", (uuid.uuid4(), f)).fetchone()[0]; c.commit()
        melden(c, c_, "antwort", an); c.commit()
    # Reihenfolge 1: Änderung zuerst (offen), Entscheidung wartet und scheitert an der Version
    fa = fall(t, "antwort", an)
    c1, c2 = verbindung(), verbindung()
    als(c1, b); c1.execute("update public.antwort set text = 'Geändert' where id = %s", (an,))
    t2, erg = im_hintergrund(lambda: entscheiden(c2, t, fa, "sichtbar_lassen", intern="ok"))
    pruefe(wartet(c2.info.backend_pid), "Entscheidung wartet auf die laufende Änderung")
    c1.commit(); t2.join(10)
    e = erg.get("fehler"); c2.rollback()
    pruefe(e is not None and getattr(e, "sqlstate", "") == "APF01", "Änderung zuerst ⇒ Entscheidung APF01", getattr(e, "sqlstate", e))
    # Reihenfolge 2: Entscheidung zuerst (offen), Änderung wartet und läuft danach
    fa = fall(t, "antwort", an)
    c1, c2 = verbindung(), verbindung()
    entscheiden(c1, t, fa, "sichtbar_lassen", intern="ok")
    als(c2, b)
    t2, erg = im_hintergrund(lambda: c2.execute("update public.antwort set text = 'Danach' where id = %s", (an,)).rowcount)
    pruefe(wartet(c2.info.backend_pid), "Änderung wartet auf die laufende Entscheidung")
    c1.commit(); t2.join(10); c2.commit()
    pruefe(erg.get("wert") == 1 and zaehle("select mod_version from public.antwort where id = %s", an) == fa["version"] + 2,
           "Danach geändert, Version zweimal erhöht")

    print("Fall 18 · P6: Autor:in löscht den Beitrag während einer Entscheidung")
    f = neuer_beitrag()
    fa = fall(t, "beitrag", f)
    c1, c2 = verbindung(), verbindung()
    entscheiden(c1, t, fa, "ausblenden", autor="Weg damit", kategorie="spam")
    als(c2, a)
    t2, erg = im_hintergrund(lambda: c2.execute("delete from public.beitrag where id = %s", (f,)).rowcount)
    pruefe(wartet(c2.info.backend_pid), "Löschen wartet auf die Entscheidung")
    c1.commit(); t2.join(10); c2.commit()
    pruefe(erg.get("wert") == 1 and zaehle("select count(*) from public.moderation_entscheidung where beitrag_id = %s", f) == 1,
           "Beitrag gelöscht, Protokoll bleibt")
    f = neuer_beitrag()
    fa = fall(t, "beitrag", f)
    c1, c2 = verbindung(), verbindung()
    als(c1, a); c1.execute("delete from public.beitrag where id = %s", (f,))
    t2, erg = im_hintergrund(lambda: entscheiden(c2, t, fa, "ausblenden", autor="Weg", kategorie="spam"))
    pruefe(wartet(c2.info.backend_pid), "Entscheidung wartet auf das Löschen")
    c1.commit(); t2.join(10)
    e = erg.get("fehler"); c2.rollback()
    pruefe(e is not None and getattr(e, "sqlstate", "") == "APZ01", "Gelöscht zuerst ⇒ APZ01", getattr(e, "sqlstate", e))
    c1.close(); c2.close()

    print("Fall 6 · gleiche Kennung gleichzeitig ⇒ eine Entscheidung")
    f = neuer_beitrag()
    fa = fall(t, "beitrag", f)
    kennung = uuid.uuid4()

    def mit_kennung(c):
        als(c, t)
        return c.execute("select public.moderation_entscheiden(%s, 'beitrag', %s, 'ausblenden', '{}'::uuid[], null, null, %s, null, 'Weg', 'spam', null)",
                         (kennung, f, fa["version"])).fetchone()[0]
    c1, c2 = verbindung(), verbindung()
    mit_kennung(c1)
    t2, erg = im_hintergrund(lambda: mit_kennung(c2))
    pruefe(wartet(c2.info.backend_pid), "Zweiter Aufruf wartet")
    c1.commit(); t2.join(10); c2.commit()
    pruefe(erg.get("wert", {}).get("wiederholung") is True
           and zaehle("select count(*) from public.moderation_entscheidung where id = %s", kennung) == 1,
           "Zweiter erhält das gespeicherte Ergebnis", str(erg.get("fehler", ""))[:60])
    c1.close(); c2.close()


# ------------------------------------------------------------------ R06 / R07 (Review 8273f7b)
R06_VOR = "20261019115959"      # alt: ohne 20261019120000/…120005_entscheiden_wiederholung
R07_VOR = "20261019120099"      # alt: ohne 20261019120100_meldebremse_konto


def begrenzt(c, sekunden=5):
    """Begrenzte Wartezeit: Eine Verklemmung oder ein Hänger endet als Fehler, nicht als Stillstand."""
    c.execute(f"set lock_timeout = '{sekunden}s'")
    c.commit()


def sperrart(pid):
    with psycopg.connect(dbname=DB, user="postgres", autocommit=True) as w:
        r = w.execute("select l.locktype from pg_locks l where l.pid = %s and not l.granted limit 1", (pid,)).fetchone()
        return r[0] if r else None


def r06(alt):
    aufbauen(R06_VOR if alt else None)
    ids = nutzer_anlegen("TEST-R06", "anna", "team", "zweit")
    a, t, t2 = ids["anna"], ids["team"], ids["zweit"]
    with verbindung() as c:
        c.execute("update public.profil set rolle = 'team' where id = any(%s)", ([t, t2],))
        c.commit()

    def neuer():
        with verbindung() as c:
            return frage(c, a)

    def korrektur(c, wer, kennung, art, ziel, version, aktion="korrektur"):
        als(c, wer)
        return c.execute("select public.moderation_entscheiden(%s, %s, %s, %s, '{}'::uuid[], null, null, %s, 'Präzisierung', null, null, %s)",
                         (kennung, art, ziel, aktion, version,
                          "Teamkorrektur" if aktion == "korrektur" else None)).fetchone()[0]

    def parallel(text, zweiter, erwartet):
        p, q = neuer(), neuer()
        vp, vq = fall(t, "beitrag", p)["version"], fall(t, "beitrag", q)["version"]
        x = uuid.uuid4()
        c1, c2 = verbindung(), verbindung()
        begrenzt(c1); begrenzt(c2)
        korrektur(c1, t, x, "beitrag", p, vp)
        t_, erg = im_hintergrund(lambda: zweiter(c2, x, p, q, vp, vq))
        gew = wartet(c2.info.backend_pid)
        c1.commit(); t_.join(10)
        f = erg.get("fehler"); w = erg.get("wert")
        c2.rollback()
        q_korr = zaehle("select count(*) from public.antwort where beitrag_id = %s and team_korrektur", q)
        q_ver = zaehle("select mod_version from public.beitrag where id = %s", q)
        ergebnis = getattr(f, "sqlstate", None) or (("wiederholung=" + str(w.get("wiederholung"))) if w else str(f))
        if alt:
            print(f"  ---- [lokal-sql] Gegenprobe {text}: gewartet={gew} Ergebnis={ergebnis} Ziel2-Korrekturen={q_korr}")
        else:
            pruefe(gew, f"{text}: zweiter Aufruf wartet auf die Kennung")
            pruefe(ergebnis == erwartet and q_korr == 0 and q_ver == vq, f"{text}: {erwartet}, keine Wirkung auf Ziel 2",
                   f"{ergebnis} korrekturen={q_korr} version={q_ver}/{vq}")
        c1.close(); c2.close()
        return ergebnis

    print("R06 · gleiche Kennung, gleiches Konto, gleiche Aktion, gleiches Ziel (parallel)")
    p = neuer()
    vp = fall(t, "beitrag", p)["version"]
    x = uuid.uuid4()
    c1, c2 = verbindung(), verbindung()
    begrenzt(c1); begrenzt(c2)
    r1 = korrektur(c1, t, x, "beitrag", p, vp)
    t_, erg = im_hintergrund(lambda: korrektur(c2, t, x, "beitrag", p, vp))
    gew = wartet(c2.info.backend_pid)
    c1.commit(); t_.join(10); c2.commit()
    r2 = erg.get("wert") or {}
    if not alt:
        pruefe(gew and r2.get("wiederholung") is True and r2.get("entscheidung_id") == r1.get("entscheidung_id")
               and r2.get("korrektur_antwort_id") == r1.get("korrektur_antwort_id")
               and zaehle("select count(*) from public.moderation_entscheidung where id = %s", x) == 1
               and zaehle("select count(*) from public.antwort where beitrag_id = %s and team_korrektur", p) == 1,
               "Eine Entscheidung, eine Korrektur, beide Aufrufe dasselbe Ergebnis", str(erg.get("fehler", ""))[:60])
    c1.close(); c2.close()

    print("R06 · gleiche Kennung, anderes Ziel (parallel)")
    parallel("anderes Ziel", lambda c, x, p, q, vp, vq: korrektur(c, t, x, "beitrag", q, vq), "APV01")
    print("R06 · gleiche Kennung, gleiche Ziel-ID, andere Zielart (parallel)")
    parallel("andere Zielart", lambda c, x, p, q, vp, vq: korrektur(c, t, x, "antwort", p, vp), "APV01")
    print("R06 · gleiche Kennung, fremdes Teamkonto (parallel)")
    parallel("fremdes Konto", lambda c, x, p, q, vp, vq: korrektur(c, t2, x, "beitrag", p, vp), "APV01")
    print("R06 · gleiche Kennung, andere Aktion (parallel)")
    parallel("andere Aktion", lambda c, x, p, q, vp, vq: korrektur(c, t, x, "beitrag", p, vp, aktion="sichtbar_lassen"), "APV01")

    print("R06 · sequentielle Wiederholung und Kollisionen")
    p, q = neuer(), neuer()
    vp, vq = fall(t, "beitrag", p)["version"], fall(t, "beitrag", q)["version"]
    x = uuid.uuid4()
    with verbindung() as c:
        r1 = korrektur(c, t, x, "beitrag", p, vp); c.commit()
        r2 = korrektur(c, t, x, "beitrag", p, vp); c.commit()
        ergebnisse = []
        for wer, art, ziel, aktion in ((t, "beitrag", q, "korrektur"), (t, "antwort", p, "korrektur"),
                                       (t2, "beitrag", p, "korrektur"), (t, "beitrag", p, "sichtbar_lassen")):
            try:
                korrektur(c, wer, x, art, ziel, vp, aktion=aktion); ergebnisse.append("erfolg")
            except psycopg.Error as e:
                ergebnisse.append(e.sqlstate)
            c.rollback()
    if alt:
        print(f"  ---- [lokal-sql] Gegenprobe sequentiell: {ergebnisse}")
    else:
        pruefe(r2.get("wiederholung") is True and r2.get("entscheidung_id") == r1.get("entscheidung_id"),
               "Sequentielle Wiederholung liefert das gespeicherte Ergebnis")
        pruefe(ergebnisse == ["APV01"] * 4, "Anderes Ziel, andere Art, fremdes Konto, andere Aktion: APV01", ergebnisse)


def r07(alt):
    aufbauen(R07_VOR if alt else None)
    ids = nutzer_anlegen("TEST-R07", "anna", "bea", "cem", "dana", "emil", "team")
    a, bea, cem, dana, emil, t = (ids[n] for n in ("anna", "bea", "cem", "dana", "emil", "team"))
    with verbindung() as c:
        c.execute("update public.profil set rolle = 'team' where id = %s", (t,))
        c.commit()

    def neuer():
        with verbindung() as c:
            return frage(c, a)

    def neunundzwanzig(wer):
        with verbindung() as c:
            c.execute("insert into public.beitrag (autor_id, art, titel, text) select %s, 'tipp', 'R07 ' || %s || ' ' || g, '' "
                      "from generate_series(1, 29) g", (wer, str(wer)))      # Füllbeiträge vom meldenden Konto selbst
            c.execute("insert into public.meldung (melder_id, beitrag_id, grund) select %s, id, 'spam' from public.beitrag "
                      "where titel like %s", (wer, f"R07 {wer} %"))
            c.commit()

    def anzahl(wer):
        return zaehle("select count(*) from public.meldung where melder_id = %s and erstellt_am > now() - interval '1 hour'", wer)

    def versuch(c, wer, ziel):
        try:
            r = melden(c, wer, "beitrag", ziel)
            return ("neu" if r[1] else "vorhanden", r)
        except psycopg.Error as e:
            return (e.sqlstate, None)

    print("R07 · 29 Meldungen + drei parallele neue Ziele ⇒ höchstens eine weitere")
    neunundzwanzig(bea)
    p, q, r = neuer(), neuer(), neuer()
    c1, c2, c3 = verbindung(), verbindung(), verbindung()
    for c in (c1, c2, c3):
        begrenzt(c)
    e1 = versuch(c1, bea, p)                                    # Meldung 30, offen
    t2, g2 = im_hintergrund(lambda: versuch(c2, bea, q))
    t3, g3 = im_hintergrund(lambda: versuch(c3, bea, r))
    w2, w3 = wartet(c2.info.backend_pid), wartet(c3.info.backend_pid)
    art2 = sperrart(c2.info.backend_pid)
    c1.commit(); t2.join(10); t3.join(10)
    ergebnisse = [e1[0], g2.get("wert", ("?",))[0], g3.get("wert", ("?",))[0]]
    c2.commit(); c3.commit()
    gesamt = anzahl(bea)
    if alt:
        print(f"  ---- [lokal-sql] Gegenprobe: gewartet={w2}/{w3} Ergebnisse={ergebnisse} Meldungen in der Stunde={gesamt}")
    else:
        pruefe(w2 and w3 and art2 == "advisory", "Parallele neue Meldungen warten auf die Kontosperre", f"{w2}/{w3} {art2}")
        pruefe(sorted(ergebnisse) == ["APB01", "APB01", "neu"] and gesamt == 30, "Eine neue, zwei APB01, insgesamt 30",
               f"{ergebnisse} gesamt={gesamt}")
    for c in (c1, c2, c3):
        c.close()
    if alt:
        return

    print("R07 · Wiederholung vorhandener Meldungen an der Grenze")
    with verbindung() as c:
        begrenzt(c)
        e = versuch(c, bea, p); c.commit()
    pruefe(e[0] == "vorhanden", "Erneute Meldung desselben Ziels bei 30: vorhandene Meldung statt APB01", e[0])
    c1, c2 = verbindung(), verbindung()
    begrenzt(c1); begrenzt(c2)
    s = neuer()
    e1 = versuch(c1, bea, s)                                     # neues Ziel → APB01 (Transaktion endet im Fehler)
    e2 = versuch(c2, bea, p)                                     # Wiederholung parallel
    c1.rollback(); c2.commit()
    pruefe(e1[0] == "APB01" and e2[0] == "vorhanden", "Parallel: neues Ziel APB01, Wiederholung erfolgreich", f"{e1[0]}/{e2[0]}")

    print("R07 · dritte Meldung blendet automatisch aus, während dasselbe Konto ein anderes Ziel meldet")
    neunundzwanzig(emil)
    p, q = neuer(), neuer()
    with verbindung() as c:
        melden(c, cem, "beitrag", p); c.commit()
        melden(c, dana, "beitrag", p); c.commit()
    c1, c2 = verbindung(), verbindung()
    begrenzt(c1); begrenzt(c2)
    e1 = versuch(c1, emil, p)                                    # Meldung 30 des Kontos = dritte für p
    t2, g2 = im_hintergrund(lambda: versuch(c2, emil, q))
    w = wartet(c2.info.backend_pid)
    c1.commit(); t2.join(10)
    e2 = g2.get("wert", ("?",))[0]
    c2.rollback()
    pruefe(w and e1[0] == "neu" and e2 == "APB01", "Konto: Meldung 30 angelegt, parallele Meldung APB01", f"{w} {e1[0]}/{e2}")
    pruefe(zaehle("select versteckt::int from public.beitrag where id = %s", p) == 1
           and zaehle("select count(*) from public.ausblendung where beitrag_id = %s", p) == 1
           and zaehle("select count(*) from public.moderation_entscheidung where beitrag_id = %s and akteur = 'automatik'", p) == 1,
           "Dritte Meldung blendet aus: eine Ausblendung, ein Automatik-Protokoll")
    c1.close(); c2.close()

    print("R07 · kreuzende Meldungen zweier Konten und Entscheidung im selben Thread ohne Verklemmung")
    p, q = neuer(), neuer()
    vp = fall(t, "beitrag", p)["version"]
    cs = [verbindung() for _ in range(5)]
    for c in cs:
        begrenzt(c)
    aufgaben = [lambda: versuch(cs[0], cem, p), lambda: versuch(cs[1], dana, q),
                lambda: versuch(cs[2], cem, q), lambda: versuch(cs[3], dana, p),
                lambda: (als(cs[4], t), cs[4].execute(
                    "select public.moderation_entscheiden(%s, 'beitrag', %s, 'korrektur', '{}'::uuid[], null, null, %s, 'x', null, null, 'Korrektur')",
                    (uuid.uuid4(), p, vp)).fetchone()[0])[1]]
    def mit_commit(f, c):
        def lauf():
            try:
                r = f()
                c.commit()            # jede Transaktion endet selbst – wer wartet, wartet nur auf echte Sperren
                return r
            except Exception:
                c.rollback()
                raise
        return lauf
    laeufe = [im_hintergrund(mit_commit(f, c)) for f, c in zip(aufgaben, cs)]
    for th, _ in laeufe:
        th.join(15)
    fehlercodes = []
    for (th, erg), c in zip(laeufe, cs):
        f = erg.get("fehler")
        if f is not None:
            fehlercodes.append(getattr(f, "sqlstate", str(f)))
        w = erg.get("wert")
        if isinstance(w, tuple) and w[0] not in ("neu", "vorhanden"):
            fehlercodes.append(w[0])
        c.close()
    haengt = [th.is_alive() for th, _ in laeufe]
    pruefe(not any(haengt) and "40P01" not in fehlercodes and "55P03" not in fehlercodes,
           "Alle fünf Transaktionen enden, keine Verklemmung (40P01) und kein Sperr-Timeout (55P03)",
           f"hängt={haengt} fehler={fehlercodes}")
    pruefe(zaehle("select count(*) from public.meldung where melder_id = any(%s) and beitrag_id = any(%s)", [cem, dana], [p, q]) == 4,
           "Alle vier kreuzenden Meldungen angelegt")


FAELLE = {"g06": g06, "r03": r03, "moderation": moderation, "r06": r06, "r07": r07}

if __name__ == "__main__":
    welche = [a for a in sys.argv[1:] if not a.startswith("--")] or list(FAELLE)
    alt = "--alt" in sys.argv
    for w in welche:
        FAELLE[w](alt)
    print()
    print("Alles bestanden" if not fehler else f"{len(fehler)} Fehler")
    sys.exit(1 if fehler else 0)
