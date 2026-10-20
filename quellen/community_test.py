#!/usr/bin/env python3
"""
AzubiPass · Community-Test gegen das echte Supabase-Projekt

    COMMUNITY_TEST_PASSWORT=… COMMUNITY_TEST_CODE=DEMO-… python3 community_test.py

Spielt mit den beiden Demo-Konten (demo-anna@…, demo-ben@…) im echten
Browser einmal alles durch, was die Datenschicht community.js kann:
Profil, Gruppe gründen und beitreten, Beiträge mit Datei, Antworten,
beste Antwort, Hilfreich, Wochenaufgabe, Melden (Spec 06), Abmelden – und räumt am
Ende wieder auf. Passwort und Demo-Code stehen bewusst nicht im Repo.

Die Demo-Konten haben ein Passwort, weil Anmelde-Mails ohne eigenen
Mailversand nicht ankommen. Die App selbst bietet nur den Mail-Link an.

Rückgabewert 1 bei einem Fehler.
"""

import functools
import http.server
import os
import socketserver
import sys
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

DOCS = Path(__file__).resolve().parent.parent / "docs"
ANNA = "demo-anna@azubipass.invalid"
BEN = "demo-ben@azubipass.invalid"
TEAM = "test-neu1@azubipass.invalid"     # Testkonto mit Rolle „team“ (supabase/README.md)

fehler = []


def pruefe(bedingung, text, wert=""):
    print(f"  {'OK  ' if bedingung else 'FEHL'} {text}" + (f"  {wert}" if wert != "" else ""))
    if not bedingung:
        fehler.append(text)


class Stiller(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


# Läuft im Browser. Jede Zeile gibt ein Ergebnis zurück, Fehler werden als
# {fehler, art} gemeldet statt geworfen – so sieht man sie im Bericht.
JS_HILFE = """
window.T = {
  versuch: async (fn) => { try { return { ok: true, wert: await fn() }; }
                           catch (e) { return { ok: false, fehler: e.message, art: e.art }; } },
  anmelden: async (mail, pw) => {
    const c = await AP.community.verbinden();
    const r = await c.auth.signInWithPassword({ email: mail, password: pw });
    if (r.error) throw new Error(r.error.message);
    return r.data.user.id;
  },
  bild: () => new Promise((ja) => {
    const cv = document.createElement('canvas'); cv.width = 40; cv.height = 30;
    const g = cv.getContext('2d'); g.fillStyle = '#1B4332'; g.fillRect(0, 0, 40, 30);
    cv.toBlob((b) => ja(new File([b], 'lernzettel.png', { type: 'image/png' })), 'image/png');
  })
};
"""


def main():
    pw = os.environ.get("COMMUNITY_TEST_PASSWORT")
    code = os.environ.get("COMMUNITY_TEST_CODE")
    if not pw or not code:
        print("COMMUNITY_TEST_PASSWORT und COMMUNITY_TEST_CODE setzen.")
        return 2

    handler = functools.partial(Stiller, directory=str(DOCS))
    with socketserver.TCPServer(("127.0.0.1", 0), handler) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        basis = f"http://127.0.0.1:{srv.server_address[1]}/"

        with sync_playwright() as p:
            browser = p.chromium.launch()
            # Ohne Zwischenspeicher: Er würde die Seite beim ersten Besuch neu laden.
            seite = browser.new_context(service_workers="block").new_page()
            seite.goto(basis + "app.html")
            seite.wait_for_load_state("networkidle")
            seite.wait_for_function("window.AP && AP.community")
            seite.evaluate(JS_HILFE)
            ev = lambda js, *a: seite.evaluate(js, *a)

            # Reste eines abgebrochenen Laufs: Beide Demo-Konten verlassen alte
            # Testgruppen – ist die letzte Person weg, löscht die Datenbank die Gruppe.
            for konto in (BEN, ANNA):
                ev("([m, p]) => T.anmelden(m, p)", [konto, pw])
                if ev("() => AP.community.profil(true)"):
                    for alt in ev("() => AP.community.gruppen(true)"):
                        if alt["name"] == "Testgruppe LF6":
                            ev("(g) => AP.community.gruppeVerlassen(g)", alt["id"])
                ev("() => AP.community.abmelden()")

            print("Ohne Anmeldung")
            r = ev("T.versuch(() => AP.community.beitraege())")
            pruefe(not r["ok"] and r["art"] in ("rechte", "anmeldung"), "Ohne Anmeldung keine Beiträge", r.get("fehler"))
            r = ev("T.versuch(() => AP.community.profil())")
            pruefe(not r["ok"] and r["art"] == "anmeldung", "Profil verlangt Anmeldung", r.get("fehler"))
            r = ev("T.versuch(() => AP.community.anmeldenPerMail('keine-mail'))")
            pruefe(not r["ok"] and r["art"] == "eingabe", "Ungültige Mail wird abgefangen", r.get("fehler"))

            print("Anna")
            anna = ev("([m, p]) => T.anmelden(m, p)", [ANNA, pw])
            pruefe(bool(anna), "Anna angemeldet")
            r = ev("T.versuch(() => AP.community.profil(true))")
            if r["ok"] and r["wert"] is None:
                f = ev("T.versuch(() => AP.community.profilAnlegen({anzeigename:'Anna (Demo)', lehrjahr:2, code:'falsch', mindestens16:true, regeln:true}))")
                pruefe(not f["ok"] and "Zugangscode" in f["fehler"], "Falscher Zugangscode abgelehnt", f.get("fehler"))
                f = ev("T.versuch(() => AP.community.profilAnlegen({anzeigename:'Anna (Demo)', lehrjahr:2, code:%r, mindestens16:false, regeln:true}))" % code)
                pruefe(not f["ok"] and "16" in f["fehler"], "Ohne 16-Häkchen abgelehnt", f.get("fehler"))
                r = ev("T.versuch(() => AP.community.profilAnlegen({anzeigename:'Anna (Demo)', lehrjahr:2, code:%r, mindestens16:true, regeln:true}))" % code.lower().replace("-", " "))
            pruefe(r["ok"] and r["wert"] and r["wert"]["anzeigename"] == "Anna (Demo)", "Annas Profil steht", r.get("wert") or r.get("fehler"))
            pruefe("zugang" not in (r.get("wert") or {}), "Zugangscode nicht im Profil lesbar")

            g = ev("T.versuch(() => AP.community.gruppeGruenden({name:'Testgruppe LF6', beschreibung:'Automatischer Test', offen:false}))")
            pruefe(g["ok"], "Gruppe gegründet", g.get("fehler", ""))
            gid = g.get("wert")
            gcode = ev("(id) => AP.community.gruppenCode(id)", gid)
            pruefe(bool(gcode) and len(gcode) == 8, "Gruppencode hat 8 Zeichen", gcode)

            f1 = ev("(g) => T.versuch(() => AP.community.veroeffentlichen({art:'frage', titel:'Wie buche ich Skonto?', text:'Beim Einkauf mit 2 %', lernfeld:'buchfuehrung', kapitel:'k5', gruppe:g}))", gid)
            pruefe(f1["ok"], "Frage in der Gruppe veröffentlicht", f1.get("fehler", ""))
            l1 = ev("async () => T.versuch(async () => AP.community.veroeffentlichen({art:'lernzettel', titel:'Mein Lernzettel Bilanz', datei: await T.bild()}))")
            pruefe(l1["ok"], "Lernzettel mit Bild veröffentlicht", l1.get("fehler", ""))
            r = ev("T.versuch(() => AP.community.veroeffentlichen({art:'lernzettel', titel:'Ohne Datei'}))")
            pruefe(not r["ok"] and r["art"] == "eingabe", "Lernzettel ohne Datei abgelehnt", r.get("fehler"))
            r = ev("() => { const e = AP.community.dateiPruefen(new File(['x'], 'a.exe', {type:'application/x-msdownload'})); return e && e.message; }")
            pruefe(bool(r) and "JPG" in r, "Falscher Dateityp abgelehnt", r)

            b = ev("(id) => AP.community.beitrag(id)", l1.get("wert"))
            lz_pfad = b["datei_pfad"]
            d = ev("(p) => T.versuch(async () => { const d = await AP.community.dateiLaden(p); return [d.url.slice(0, 5), d.blob.size, d.art]; })", lz_pfad)
            pruefe(d["ok"] and d["wert"][0] == "blob:" and d["wert"][1] > 0, "Datei angemeldet abrufbar, nur als Adresse im Tab", d.get("wert") or d.get("fehler"))

            print("Ben")
            ev("() => AP.community.abmelden()")
            r = ev("T.versuch(() => AP.community.beitraege())")
            pruefe(not r["ok"], "Nach dem Abmelden keine Beiträge")
            ev("([m, p]) => T.anmelden(m, p)", [BEN, pw])
            r = ev("T.versuch(() => AP.community.profil(true))")
            if r["ok"] and r["wert"] is None:
                r = ev("T.versuch(() => AP.community.profilAnlegen({anzeigename:'Ben (Demo)', lehrjahr:1, code:%r, mindestens16:true, regeln:true}))" % code)
            pruefe(r["ok"], "Bens Profil steht", r.get("fehler", ""))
            liste = ev("(g) => AP.community.beitraege({gruppe:g})", gid)
            pruefe(len(liste) == 0, "Fremde Gruppe ist unsichtbar", len(liste))
            r = ev("T.versuch(() => AP.community.gruppeBeitreten('XXXXXXXX'))")
            pruefe(not r["ok"] and "keine Gruppe" in r["fehler"], "Falscher Gruppencode abgelehnt", r.get("fehler"))
            r = ev("(c) => T.versuch(() => AP.community.gruppeBeitreten(c.toLowerCase()))", gcode)
            pruefe(r["ok"] and r["wert"] == gid, "Mit Code beigetreten")
            liste = ev("(g) => AP.community.beitraege({gruppe:g})", gid)
            pruefe(len(liste) == 1 and liste[0]["autor_name"] == "Anna (Demo)", "Gruppenfrage jetzt sichtbar, mit Autorin", len(liste))
            a1 = ev("(b) => T.versuch(() => AP.community.antwortSchreiben(b, 'Skonto mindert die Anschaffungskosten.'))", f1["wert"])
            pruefe(a1["ok"], "Antwort geschrieben", a1.get("fehler", ""))
            r = ev("(a) => T.versuch(() => AP.community.besteAntwort(a, true))", a1.get("wert"))
            pruefe(not r["ok"], "Ben kann nicht selbst die beste Antwort wählen", r.get("fehler"))
            r = ev("(b) => AP.community.hilfreich(b, true)", f1["wert"])
            pruefe(r is True, "Als hilfreich markiert")
            r = ev("(b) => AP.community.hilfreich(b, true)", f1["wert"])
            pruefe(r is True, "Doppelt markieren schadet nicht")
            r = ev("(b) => T.versuch(() => AP.community.meldungSenden({art:'beitrag', ziel:b, grund:'spam', hinweis:'Test'}))", l1["wert"])
            pruefe(r["ok"] and r["wert"]["neu"], "Beitrag gemeldet (Spec 06: meldung_senden)", r.get("fehler", ""))
            r = ev("(b) => T.versuch(() => AP.community.meldungSenden({art:'beitrag', ziel:b, grund:'spam'}))", l1["wert"])
            pruefe(r["ok"] and not r["wert"]["neu"], "Zweite Meldung legt nichts an", r.get("wert"))
            r = ev("(g) => T.versuch(() => AP.community.aufgabeStellen({titel:'Fünf Buchungssätze', gruppe:g}))", gid)
            pruefe(not r["ok"] and r["art"] == "rechte", "Mitglied darf keine Wochenaufgabe stellen", r.get("fehler"))

            print("Wieder Anna")
            ev("() => AP.community.abmelden()")
            ev("([m, p]) => T.anmelden(m, p)", [ANNA, pw])
            r = ev("(a) => T.versuch(() => AP.community.besteAntwort(a, true))", a1["wert"])
            pruefe(r["ok"], "Anna wählt die beste Antwort", r.get("fehler", ""))
            b = ev("(id) => AP.community.beitrag(id)", f1["wert"])
            pruefe(b["geloest"] and b["antworten"] == 1 and b["hilfreich_zahl"] == 1, "Frage gelöst, 1 Antwort, 1× hilfreich",
                   (b["geloest"], b["antworten"], b["hilfreich_zahl"]))
            ant = ev("(id) => AP.community.antworten(id)", f1["wert"])
            pruefe(len(ant) == 1 and ant[0]["beste"] and ant[0]["autor"]["anzeigename"] == "Ben (Demo)", "Antwort mit Name und Markierung")
            w = ev("(g) => T.versuch(() => AP.community.aufgabeStellen({titel:'Fünf Buchungssätze', gruppe:g}))", gid)
            pruefe(w["ok"], "Leitung stellt Wochenaufgabe", w.get("fehler", ""))
            r = ev("(id) => AP.community.erledigt(id, true)", w["wert"])
            pruefe(r is True, "Wochenaufgabe abgehakt")
            auf = ev("(g) => AP.community.aufgaben({gruppe:g, laufend:true})", gid)
            pruefe(len(auf) == 1 and auf[0]["erledigt_zahl"] == 1 and auf[0]["von_mir_erledigt"], "Laufende Aufgabe mit 1× erledigt")
            mg = ev("(g) => AP.community.mitglieder(g)", gid)
            pruefe(len(mg) == 2 and mg[0]["rolle"] == "leitung", "Zwei Mitglieder, Anna leitet", [m["profil"]["anzeigename"] for m in mg])
            r = ev("T.versuch(() => AP.community.moderationZaehler())")
            pruefe(not r["ok"] and r["art"] in ("rechte", "gesperrt"), "Ohne Team-Rolle keine Moderation", r.get("art"))

            print("Aufräumen")
            r = ev("(id) => T.versuch(() => AP.community.beitragLoeschen(id))", l1["wert"])
            pruefe(r["ok"], "Lernzettel samt Datei gelöscht", r.get("fehler", ""))
            # Nicht über den alten Link prüfen: Den hält das Netz von Supabase
            # bis zu 60 Sekunden vor. Maßgeblich ist, ob die Datei noch im Speicher liegt.
            rest = ev("""async (pfad) => { const c = await AP.community.verbinden();
                const [ordner, name] = pfad.split('/');
                const r = await c.storage.from('lernzettel').list(ordner, { search: name });
                return (r.data || []).length; }""", lz_pfad)
            pruefe(rest == 0, "Datei ist aus dem Speicher gelöscht", rest)
            r = ev("(g) => T.versuch(() => AP.community.gruppeVerlassen(g))", gid)
            pruefe(r["ok"], "Anna verlässt die Gruppe")
            ev("() => AP.community.abmelden()")
            ev("([m, p]) => T.anmelden(m, p)", [BEN, pw])
            g2 = ev("(g) => AP.community.gruppe(g)", gid)
            pruefe(g2 and g2["meine_rolle"] == "leitung", "Ben übernimmt die Leitung")
            ev("(g) => AP.community.gruppeVerlassen(g)", gid)
            meine = ev("() => AP.community.gruppen(true)")
            pruefe(all(x["id"] != gid for x in meine), "Leere Gruppe ist verschwunden")
            ev("() => AP.community.abmelden()")

            # ------------------------------------------------ Review a443607 (12.10.)
            print("Dateizugriff mit aktueller Rechteprüfung")
            laden = "(p) => T.versuch(async () => { const d = await AP.community.dateiLaden(p); AP.community.dateiFreigeben(d); return d.blob.size; })"
            ev("([m, p]) => T.anmelden(m, p)", [ANNA, pw])
            l2 = ev("async () => T.versuch(async () => AP.community.veroeffentlichen({art:'lernzettel', titel:'Test Dateizugriff', datei: await T.bild()}))")
            pruefe(l2["ok"], "Lernzettel für den Dateitest veröffentlicht", l2.get("fehler", ""))
            pfad2 = ev("(id) => AP.community.beitrag(id)", l2["wert"])["datei_pfad"]
            ev("() => AP.community.abmelden()")
            ev("([m, p]) => T.anmelden(m, p)", [BEN, pw])
            r = ev(laden, pfad2)
            pruefe(r["ok"], "Ben lädt die Datei des sichtbaren Beitrags", r.get("fehler", ""))
            ev("() => AP.community.abmelden()")
            ev("([m, p]) => T.anmelden(m, p)", [TEAM, pw])
            r = ev("(id) => T.versuch(() => (async () => { const f = await AP.community.moderationFall('beitrag', id); return AP.community.entscheiden({ id: AP.community.neueVorgangskennung(), art: 'beitrag', ziel: id, aktion: 'ausblenden', meldungen: f.meldungen.map(m => m.id), ausblendung: f.ausblendung ? f.ausblendung.id : null, version: f.version, intern: 'Automatischer Test', autorText: 'Dein Testinhalt wurde für einen automatischen Test ausgeblendet.', kategorie: 'sonstiges' }); })())", l2["wert"])
            pruefe(r["ok"], "Team blendet den Beitrag aus", r.get("fehler", ""))
            ev("() => AP.community.abmelden()")
            ev("([m, p]) => T.anmelden(m, p)", [BEN, pw])
            r = ev(laden, pfad2)
            pruefe(not r["ok"] and r["art"] == "rechte", "Gleich danach: Ben bekommt die Datei nicht mehr", r.get("fehler") or r.get("wert"))
            pruefe(ev("(id) => AP.community.beitrag(id)", l2["wert"]) is None, "… und sieht den Beitrag nicht")
            ev("() => AP.community.abmelden()")
            ev("([m, p]) => T.anmelden(m, p)", [ANNA, pw])
            r = ev(laden, pfad2)
            pruefe(r["ok"], "Anna sieht ihre eigene Datei weiter", r.get("fehler", ""))
            ev("() => AP.community.abmelden()")
            ev("([m, p]) => T.anmelden(m, p)", [TEAM, pw])
            ev("(id) => (async () => { const f = await AP.community.moderationFall('beitrag', id); return AP.community.entscheiden({ id: AP.community.neueVorgangskennung(), art: 'beitrag', ziel: id, aktion: 'einblenden', meldungen: f.meldungen.map(m => m.id), ausblendung: f.ausblendung ? f.ausblendung.id : null, version: f.version, intern: 'Automatischer Test', autorText: null, kategorie: null }); })()", l2["wert"])
            ev("() => AP.community.abmelden()")
            ev("([m, p]) => T.anmelden(m, p)", [BEN, pw])
            r = ev(laden, pfad2)
            pruefe(r["ok"], "Wieder eingeblendet: Ben lädt die Datei wieder", r.get("fehler", ""))
            ev("() => AP.community.abmelden()")

            ev("([m, p]) => T.anmelden(m, p)", [ANNA, pw])
            def loeschen_weg(route):
                if route.request.method == "DELETE": route.abort()
                else: route.continue_()
            seite.route("**/storage/v1/object/lernzettel**", loeschen_weg)
            r = ev("(id) => T.versuch(async () => { try { await AP.community.beitragLoeschen(id); return 'ok'; }"
                   " catch (e) { return [e.art, e.dateiPfad]; } })", l2["wert"])
            seite.unroute("**/storage/v1/object/lernzettel**")
            pruefe(r["ok"] and r["wert"] == ["datei", pfad2], "Datei-Löschfehler wird gemeldet, nicht verschluckt", r.get("wert"))
            r = ev("(p) => T.versuch(() => AP.community.dateiEntfernen(p))", pfad2)
            pruefe(r["ok"] and r["wert"] is True, "Erneuter Versuch löscht die Datei", r.get("fehler", ""))
            rest = ev("""async (pfad) => { const c = await AP.community.verbinden();
                const [ordner, name] = pfad.split('/');
                const r = await c.storage.from('lernzettel').list(ordner, { search: name });
                return (r.data || []).length; }""", pfad2)
            pruefe(rest == 0, "Datei ist danach aus dem Speicher weg", rest)
            r = ev("(p) => T.versuch(() => AP.community.dateiEntfernen(p))", pfad2)
            pruefe(not r["ok"] and r["art"] == "datei", "Schon gelöschte Datei: kein falsches „gelöscht“", r.get("fehler"))
            ev("() => AP.community.abmelden()")

            print("Kontobindung des Profils (R1)")
            anna_id = ev("([m, p]) => T.anmelden(m, p)", [ANNA, pw])
            gehalten = []
            def profil_a(route):
                if anna_id in route.request.url: gehalten.append(route)
                else: route.continue_()
            seite.route("**/rest/v1/profil?**", profil_a)
            ev("() => { window.__a = T.versuch(() => AP.community.profil(true)); }")
            for _ in range(50):
                if gehalten: break
                seite.wait_for_timeout(100)
            pruefe(bool(gehalten), "Profilabruf für Anna hängt")
            ben_id = ev("([m, p]) => T.anmelden(m, p)", [BEN, pw])
            b = ev("() => AP.community.profil(true)")
            pruefe(b and b["id"] == ben_id, "Ben ist angemeldet und geladen")
            for g_ in gehalten: g_.continue_()
            a = ev("() => window.__a")
            pruefe(not a["ok"] and a["art"] == "veraltet", "Späte Antwort für Anna wird verworfen", a.get("fehler") or a.get("wert"))
            b = ev("() => AP.community.profil()")
            pruefe(b and b["id"] == ben_id, "Normaler Profilabruf liefert weiter Ben", b and b.get("id"))
            # Dasselbe nach dem Abmelden
            gehalten.clear()
            ev("() => AP.community.abmelden()")
            ev("([m, p]) => T.anmelden(m, p)", [ANNA, pw])
            ev("() => { window.__a = T.versuch(() => AP.community.profil(true)); }")
            for _ in range(50):
                if gehalten: break
                seite.wait_for_timeout(100)
            ev("() => AP.community.abmelden()")
            for g_ in gehalten: g_.continue_()
            a = ev("() => window.__a")
            pruefe(not a["ok"], "Späte Antwort nach dem Abmelden kommt nicht als Erfolg zurück", a.get("art"))
            seite.unroute("**/rest/v1/profil?**")
            ev("([m, p]) => T.anmelden(m, p)", [BEN, pw])
            b = ev("() => AP.community.profil()")
            pruefe(b and b["id"] == ben_id, "Danach kein Profil von Anna im Zwischenspeicher", b and b.get("id"))
            ev("() => AP.community.abmelden()")

            browser.close()

    print()
    print("Alles in Ordnung." if not fehler else f"{len(fehler)} Fehler: " + "; ".join(fehler))
    return 1 if fehler else 0


if __name__ == "__main__":
    sys.exit(main())
