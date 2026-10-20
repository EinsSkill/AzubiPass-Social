#!/usr/bin/env python3
"""
AzubiPass · Lernstand am Konto – Abgleich im Browser [mock]

    AXE_PFAD=…/axe.min.js python3 lernstand_sync_test.py

Die echten Module (kern.js, app.js, community.js, lernstand-sync.js) laufen
gegen die nachgebildete Schnittstelle aus community_korrekturen_test.py,
erweitert um Tabelle lernstand und RPC lernstand_speichern (Vergleich mit der
Basisversion wie in supabase/migrations/20261020100000_lernstand.sql).
Die Serverseite prüft supabase/tests/lernstand_test.sql. Keine Zugangsdaten.
"""

import functools
import json
import socketserver
import sys
import threading

from playwright.sync_api import sync_playwright

import community_korrekturen_test as basis

pruefe = basis.pruefe

LERN_JS = r"""
(() => {
  const F = window.FAKE;
  window.AZUBIPASS_SYNC_MS = 300;
  F.db.lernstand = [];
  F.sicht.lernstand = () => F.db.lernstand.filter(z => z.nutzer_id === (F.aktuell() || {}).id);
  F.logik.lernstand_speichern = (a) => {
    const u = (F.aktuell() || {}).id;
    if (!F.db.profil.some(p => p.id === u)) return F.fehler("P0001", "Lege zuerst dein Community-Profil an.");
    if (F.dazwischen) { const f = F.dazwischen; F.dazwischen = null; f(); }   // anderes Gerät speichert genau jetzt
    const z = F.db.lernstand.find(x => x.nutzer_id === u);
    if (!z) {
      if ((a.p_basis || 0) !== 0) return F.ok({ ok: false, version: null, daten: null });
      F.db.lernstand.push({ nutzer_id: u, daten: JSON.parse(JSON.stringify(a.p_daten)), version: 1 });
      return F.ok({ ok: true, version: 1 });
    }
    if (a.p_basis !== z.version) return F.ok({ ok: false, version: z.version, daten: z.daten });
    z.daten = JSON.parse(JSON.stringify(a.p_daten)); z.version++;
    return F.ok({ ok: true, version: z.version });
  };
  F.lesezeichen = (zu) => ({ zu, titel: zu, lernfeld: "lf1" });
  F.serverStand = (u, lz, version) => F.db.lernstand.push({ nutzer_id: u, version,
    daten: { version: 3, fortschritt: {}, lesezeichen: lz.map(F.lesezeichen), geaendertAm: "2026-10-20T07:00:00.000Z" } });
})();
"""


def geraet(lesezeichen, am="2026-10-20T08:00:00.000Z", meta=None, sitzung=True):
    """Init-Skript: Lernstand dieses Geräts (und optional Merkzettel/Sitzung)."""
    konto = {"version": 3, "fortschritt": {}, "lesezeichen": [{"zu": z, "titel": z, "lernfeld": "lf1"} for z in lesezeichen],
             "geaendertAm": am}
    js = f"try {{ localStorage.setItem('azubipass:konto', {json.dumps(json.dumps(konto))});"
    if meta:
        js += f" localStorage.setItem('azubipass-lernsync', {json.dumps(json.dumps(meta))});"
    if sitzung:
        js += " localStorage.setItem('azubipass-sitzung', '{}');"
    return js + " } catch (e) {}"


def main():
    handler = functools.partial(basis.Stiller, directory=str(basis.DOCS))
    with socketserver.TCPServer(("127.0.0.1", 0), handler) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        url = f"http://127.0.0.1:{srv.server_address[1]}/"
        with sync_playwright() as p:
            browser = p.chromium.launch()

            def neue_seite(vorher, ziel="ich", nachher=""):
                ctx = browser.new_context(viewport={"width": 390, "height": 844}, service_workers="block", locale="de-DE")
                ctx.add_init_script(basis.FAKE_JS)
                ctx.add_init_script(LERN_JS)
                ctx.add_init_script(vorher)
                if nachher:
                    ctx.add_init_script(nachher)
                s = ctx.new_page()
                s.goto(url + "app.html#" + ziel)
                s.wait_for_function("window.AP && AP.lernstandSync")
                return ctx, s

            def ev(s, js, arg=None):
                return s.evaluate(js, arg)

            def warte_status(s, art, timeout=6000):
                s.wait_for_function(f"AP.lernstandSync.status().art === '{art}'", timeout=timeout)

            def lz(s):
                return sorted(ev(s, "AP.stand.lesezeichen.map(e => e.zu)"))

            def server(s, u="ICH"):
                return ev(s, f"(FAKE.db.lernstand.find(z => z.nutzer_id === FAKE.{u}) || null)")

            def ich_text(s):
                return ev(s, "(document.querySelector('#ich .lernsync') || {}).textContent || ''")

            def axe(s, name):
                if not basis.AXE.exists():
                    print(f"  ---- [mock] axe übersprungen ({name})")
                    return
                s.add_script_tag(path=str(basis.AXE))
                v = s.evaluate("""async () => (await axe.run(document.querySelector('#ich'),
                    { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] })).violations.map(x => x.id + ':' + x.nodes.length)""")
                pruefe(not v, f"axe ohne WCAG-Verstöße: {name}", ", ".join(v))

            print("Ohne Anmeldung")
            ctx, s = neue_seite(geraet(["a"], sitzung=False))
            s.locator("#ich .lernsync").wait_for()
            s.wait_for_timeout(1200)
            pruefe(ev(s, "AP.lernstandSync.status().art") == "lokal", "Status lokal")
            pruefe("nur in diesem Browser" in ich_text(s), "Ich: nur in diesem Browser, Hinweis auf Anmeldung", ich_text(s)[:60])
            pruefe(ev(s, "!(FAKE.aufrufe.lernstand_speichern || []).length"), "Nichts gesendet")
            pruefe(not s.get_by_role("button", name="Jetzt abgleichen").is_visible(), "Kein Abgleich-Knopf")
            axe(s, "Ich ohne Anmeldung")
            ctx.close()

            print("Erste Anmeldung: Gerätestand hochladen")
            ctx, s = neue_seite(geraet(["a", "b"]))
            warte_status(s, "aktuell")
            z = server(s)
            pruefe(z and z["version"] == 1 and sorted(e["zu"] for e in z["daten"]["lesezeichen"]) == ["a", "b"], "Server hat den Gerätestand, Version 1")
            pruefe(ev(s, "FAKE.aufrufe.lernstand_speichern[0].p_basis") == 0, "Basis 0")
            m = ev(s, "JSON.parse(localStorage.getItem('azubipass-lernsync'))")
            pruefe(m["nutzer"] == ev(s, "FAKE.ICH") and m["version"] == 1, "Merkzettel: Konto und Version", m)
            pruefe(ev(s, "Object.keys(localStorage).filter(k => k.indexOf('azubipass:') === 0)") == ["azubipass:konto"],
                   "Merkzettel nicht im alten Lernstand-Namensraum")
            s.wait_for_function("document.querySelector('#ich .lernsync').textContent.includes('in deinem Konto gespeichert')")
            pruefe(True, "Ich: in deinem Konto gespeichert")
            pruefe(s.get_by_role("button", name="Jetzt abgleichen").is_visible(), "Abgleich-Knopf sichtbar")
            axe(s, "Ich angemeldet")

            print("Änderung wird gebündelt gesendet")
            ev(s, "AP.stand.lesezeichen.push({ zu: 'c', titel: 'c', lernfeld: 'lf1' }); AP.sichern();")
            s.wait_for_function("(FAKE.db.lernstand[0] || {}).version === 2", timeout=5000)
            pruefe(sorted(e["zu"] for e in server(s)["daten"]["lesezeichen"]) == ["a", "b", "c"], "Server Version 2 mit neuer Änderung")
            n = ev(s, "FAKE.aufrufe.lernstand_speichern.length")
            ev(s, "AP.lernstandSync.abgleichen()")
            warte_status(s, "aktuell")
            s.wait_for_timeout(300)
            pruefe(ev(s, "FAKE.aufrufe.lernstand_speichern.length") == n, "Ohne Änderung kein erneutes Senden")

            print("Zurücksetzen gilt auch im Konto")
            texte = []
            s.on("dialog", lambda d: (texte.append(d.message), d.accept()))
            s.get_by_role("button", name="Alles zurücksetzen").click()
            s.wait_for_function("(FAKE.db.lernstand[0] || {}).version === 3", timeout=5000)
            pruefe(texte and "auch in deinem Konto" in texte[0], "Rückfrage nennt das Konto", texte[:1])
            pruefe(server(s)["daten"]["lesezeichen"] == [], "Server nach Zurücksetzen leer")
            ctx.close()

            print("Anderes Gerät war neuer, hier nichts geändert: übernehmen")
            meta = {"nutzer": "00000000-0000-4000-a000-00000000a001", "version": 2, "am": "2026-10-20T08:00:00.000Z"}
            ctx, s = neue_seite(geraet(["a"], meta=meta), nachher="FAKE.serverStand(FAKE.ICH, ['a', 'x', 'y'], 3);")
            warte_status(s, "aktuell")
            pruefe(lz(s) == ["a", "x", "y"], "Gerät hat den Serverstand", lz(s))
            pruefe(ev(s, "!(FAKE.aufrufe.lernstand_speichern || []).length"), "Nichts gesendet")
            s.wait_for_function("document.querySelector('#ich .lernsync').textContent.includes('in deinem Konto')")
            ctx.close()

            print("Beide geändert: zusammenführen")
            meta = {"nutzer": "00000000-0000-4000-a000-00000000a001", "version": 2, "am": "2026-10-20T07:30:00.000Z"}
            ctx, s = neue_seite(geraet(["a", "hier"], meta=meta), nachher="FAKE.serverStand(FAKE.ICH, ['a', 'dort'], 3);")
            warte_status(s, "aktuell")
            pruefe(lz(s) == ["a", "dort", "hier"], "Gerät: beide Stände vereint", lz(s))
            z = server(s)
            pruefe(z["version"] == 4 and sorted(e["zu"] for e in z["daten"]["lesezeichen"]) == ["a", "dort", "hier"], "Server Version 4 vereint")
            pruefe(ev(s, "FAKE.aufrufe.lernstand_speichern[0].p_basis") == 3, "Gesendet mit Basis 3")
            ctx.close()

            print("Gleichzeitig gespeichert: neu holen, zusammenführen, erneut senden")
            ctx, s = neue_seite(geraet(["a"]), nachher="""FAKE.serverStand(FAKE.ICH, ['s1'], 1);
                FAKE.dazwischen = () => { const z = FAKE.db.lernstand[0]; z.version = 2;
                  z.daten = Object.assign({}, z.daten, { lesezeichen: z.daten.lesezeichen.concat([FAKE.lesezeichen('s2')]) }); };""")
            warte_status(s, "aktuell")
            pruefe(lz(s) == ["a", "s1", "s2"], "Gerät hat alle drei", lz(s))
            pruefe([c["p_basis"] for c in ev(s, "FAKE.aufrufe.lernstand_speichern")] == [1, 2], "Basis 1 abgelehnt, dann Basis 2",
                   [c["p_basis"] for c in ev(s, "FAKE.aufrufe.lernstand_speichern")])
            pruefe(server(s)["version"] == 3, "Server Version 3")
            ctx.close()

            print("Anderes Konto auf diesem Gerät")
            meta = {"nutzer": "00000000-0000-4000-a000-0000000000b0", "version": 5, "am": "2026-10-20T08:00:00.000Z"}
            ctx, s = neue_seite(geraet(["bens-stand"], meta=meta), nachher="FAKE.serverStand(FAKE.ICH, ['annas-stand'], 2);")
            warte_status(s, "aktuell")
            pruefe(lz(s) == ["annas-stand"], "Eigener Stand statt des vorherigen Kontos", lz(s))
            pruefe(ev(s, "!(FAKE.aufrufe.lernstand_speichern || []).length"), "Vorheriger Stand nicht ins Konto geschrieben")
            ctx.close()
            ctx, s = neue_seite(geraet(["bens-stand"], meta=meta))
            warte_status(s, "aktuell")
            pruefe(lz(s) == [] and server(s)["daten"]["lesezeichen"] == [], "Konto ohne Stand: leer beginnen, nichts übernommen")
            ctx.close()

            print("Kontowechsel während der Sitzung")
            ctx, s = neue_seite(geraet(["a"]), nachher="FAKE.serverStand(FAKE.BEN, ['ben'], 1); FAKE.db.profil.push({ id: FAKE.BEN, anzeigename: 'Ben', rolle: 'azubi' });")
            warte_status(s, "aktuell")
            ev(s, "FAKE.anmelden(FAKE.BEN_KONTO)")
            s.wait_for_function("AP.stand.lesezeichen.map(e => e.zu).join() === 'ben'", timeout=5000)
            pruefe(True, "Nach Wechsel zu Ben: Bens Stand")
            pruefe(sorted(e["zu"] for e in server(s, "ICH")["daten"]["lesezeichen"]) == ["a"], "Annas Konto unverändert")
            ctx.close()

            print("Ohne Profil, ohne Netz")
            ctx, s = neue_seite(geraet(["a"]), nachher="FAKE.db.profil = [];")
            warte_status(s, "ohneProfil")
            s.wait_for_function("document.querySelector('#ich .lernsync').textContent.includes('noch kein Community-Profil')")
            pruefe(lz(s) == ["a"], "Gerätestand bleibt")
            ctx.close()
            ctx, s = neue_seite(geraet(["a"]), nachher="FAKE.tabFehler.lernstand = 1;")
            warte_status(s, "offline")
            s.wait_for_function("document.querySelector('#ich .lernsync').textContent.includes('sobald du wieder online bist')")
            pruefe(lz(s) == ["a"], "Gerätestand bleibt offline")
            s.get_by_role("button", name="Jetzt abgleichen").click()
            warte_status(s, "aktuell")
            pruefe(server(s) is not None, "Jetzt abgleichen holt nach")
            axe(s, "Ich nach Abgleich")
            ctx.close()

            browser.close()

    print()
    print(f"{'Alles bestanden' if not basis.fehler else str(len(basis.fehler)) + ' Fehler'}")
    return 1 if basis.fehler else 0


if __name__ == "__main__":
    sys.exit(main())
