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

            # ------------------------------------------------------------------
            # LS01 · Kontotrennung auch vor dem ersten erfolgreichen Abgleich
            # (Review 2d2f478). A = Anna (FAKE.ICH), B = Ben (FAKE.BEN).

            BEN_PROFIL = "FAKE.db.profil.push({ id: FAKE.BEN, anzeigename: 'Ben', rolle: 'azubi' });"

            def server_lz(s, u):
                z = ev(s, f"(FAKE.db.lernstand.find(z => z.nutzer_id === FAKE.{u}) || null)")
                return None if z is None else sorted(e["zu"] for e in z["daten"]["lesezeichen"])

            def lernen(s, zu, sofort=True):
                ev(s, f"AP.stand.lesezeichen.push({{ zu: '{zu}', titel: '{zu}', lernfeld: 'lf1' }}); AP.{'sofortSichern' if sofort else 'sichern'}();")

            def a_lernt_offline(nachher, erster_fehler="FAKE.tabFehler.lernstand = 1;"):
                ctx, s = neue_seite(geraet([]), nachher=erster_fehler + BEN_PROFIL + nachher)
                warte_status(s, "offline")
                lernen(s, "A-privat")
                return ctx, s

            def nach_wechsel_zu_ben(s):
                ev(s, "FAKE.anmelden(FAKE.BEN_KONTO)")
                s.wait_for_function("AP.lernstandSync.status().art === 'aktuell' && JSON.parse(localStorage.getItem('azubipass-lernsync')).nutzer === FAKE.BEN", timeout=6000)

            print("LS01: Erstabruf scheitert, A lernt, Wechsel zu B mit Serverstand")
            ctx, s = a_lernt_offline("FAKE.serverStand(FAKE.BEN, ['B-eigen'], 1);")
            m = ev(s, "JSON.parse(localStorage.getItem('azubipass-lernsync'))")
            pruefe(m and m["nutzer"] == ev(s, "FAKE.ICH"), "Gerätestand gehört schon vor dem ersten Erfolg zu A", m)
            nach_wechsel_zu_ben(s)
            pruefe(lz(s) == ["B-eigen"], "Anzeige in B nur mit Bs Stand", lz(s))
            pruefe(server_lz(s, "BEN") == ["B-eigen"], "Bs Server ohne Daten von A", server_lz(s, "BEN"))
            pruefe(all("A-privat" not in json.dumps(c) for c in ev(s, "FAKE.aufrufe.lernstand_speichern || []")),
                   "Kein Upload mit Daten von A")
            print("LS01: zurück zu A – zurückgelegter Stand kommt in As Konto")
            ev(s, "FAKE.anmelden({ id: FAKE.ICH, email: 'anna@test.invalid' })")
            s.wait_for_function("AP.lernstandSync.status().art === 'aktuell' && JSON.parse(localStorage.getItem('azubipass-lernsync')).nutzer === FAKE.ICH", timeout=6000)
            pruefe(lz(s) == ["A-privat"], "A sieht seinen offline gelernten Stand wieder", lz(s))
            pruefe(server_lz(s, "ICH") == ["A-privat"], "As Server hat ihn jetzt", server_lz(s, "ICH"))
            pruefe(server_lz(s, "BEN") == ["B-eigen"], "Bs Server weiter unverändert")
            pruefe(ev(s, "localStorage.getItem('azubipass-lernsync-offen')") is None, "Zurückgelegter Stand danach aufgeräumt")
            ctx.close()

            print("LS01: Erstabruf scheitert, Wechsel zu B ohne Serverstand")
            ctx, s = a_lernt_offline("")
            nach_wechsel_zu_ben(s)
            pruefe(lz(s) == [], "B beginnt leer", lz(s))
            pruefe(server_lz(s, "BEN") == [], "Bs erster Upload ohne Daten von A", server_lz(s, "BEN"))
            ctx.close()

            print("LS01: erste Speicherantwort verloren")
            ctx, s = neue_seite(geraet([]), nachher="FAKE.plan.lernstand_speichern = ['verlieren'];" + BEN_PROFIL + "FAKE.serverStand(FAKE.BEN, ['B-eigen'], 1);")
            warte_status(s, "offline")
            pruefe(server_lz(s, "ICH") == [], "Server hat As ersten Stand, Antwort kam nicht an")
            lernen(s, "A-privat")
            nach_wechsel_zu_ben(s)
            pruefe(lz(s) == ["B-eigen"] and server_lz(s, "BEN") == ["B-eigen"], "B weder angezeigt noch gesendet mit Daten von A", lz(s))
            ev(s, "FAKE.anmelden({ id: FAKE.ICH, email: 'anna@test.invalid' })")
            s.wait_for_function("AP.lernstandSync.status().art === 'aktuell' && JSON.parse(localStorage.getItem('azubipass-lernsync')).nutzer === FAKE.ICH", timeout=6000)
            pruefe(server_lz(s, "ICH") == ["A-privat"], "A: verlorene Antwort aufgelöst, Stand im Konto", server_lz(s, "ICH"))
            ctx.close()

            print("LS01: Abmelden, dann anderes Konto")
            ctx, s = a_lernt_offline("FAKE.serverStand(FAKE.BEN, ['B-eigen'], 1);")
            ev(s, "FAKE.anmelden(null)")
            warte_status(s, "lokal")
            lernen(s, "nach-abmeldung")
            nach_wechsel_zu_ben(s)
            pruefe(lz(s) == ["B-eigen"] and server_lz(s, "BEN") == ["B-eigen"], "B ohne As Stand nach Abmelden", lz(s))
            ctx.close()

            print("LS01: Neustart nach dem Fehler, gespeicherte Sitzung gehört schon B")
            meta_a = {"nutzer": "00000000-0000-4000-a000-00000000a001", "version": None, "am": None}
            sitz_b = "localStorage.setItem('azubipass-sitzung', JSON.stringify({ user: { id: '00000000-0000-4000-a000-00000000b001' } }));"
            ctx, s = neue_seite(geraet(["A-privat"], meta=meta_a) + sitz_b,
                                nachher="FAKE.anmelden(FAKE.BEN_KONTO); FAKE.tabFehler.lernstand = 1;" + BEN_PROFIL)
            pruefe(lz(s) == [], "Ohne Netz: B sieht sofort nichts von A", lz(s))
            warte_status(s, "offline")
            pruefe(lz(s) == [] and server_lz(s, "BEN") is None, "Nichts von A in B, nichts gesendet")
            ctx.close()

            print("LS01: tatsächlich anonymer Gerätestand geht weiter ins erste Konto")
            ctx, s = neue_seite(geraet(["anonym"]))
            warte_status(s, "aktuell")
            pruefe(server_lz(s, "ICH") == ["anonym"], "Erstübernahme wie bisher", server_lz(s, "ICH"))
            ctx.close()

            # ------------------------------------------------------------------
            # LS02 · Mehrere Tabs teilen sich den Lernstand im Browser

            def kontext():
                ctx = browser.new_context(viewport={"width": 390, "height": 844}, service_workers="block", locale="de-DE")
                ctx.add_init_script(basis.FAKE_JS)
                ctx.add_init_script(LERN_JS)
                return ctx

            def app_tab(ctx, vorher=""):
                s = ctx.new_page()
                if vorher:
                    s.add_init_script(vorher)
                s.goto(url + "app.html#ich")
                s.wait_for_function("window.AP && AP.lernstandSync")
                return s

            def lokal_lz(s):
                return sorted(e["zu"] for e in ev(s, "JSON.parse(localStorage.getItem('azubipass:konto')).lesezeichen"))

            print("LS02: Lernzettelseite bei offenem App-Tab")
            ctx = kontext()
            s = app_tab(ctx, geraet(["Start"]))
            warte_status(s, "aktuell")
            t2 = ctx.new_page()
            t2.goto(url + "lf1.html")
            t2.wait_for_function("window.AP && AP.stand")
            lernen(t2, "Kapitel-neu")
            s.wait_for_function("AP.stand.lesezeichen.some(e => e.zu === 'Kapitel-neu')", timeout=3000)
            pruefe(True, "App-Tab übernimmt die Änderung der Lernzettelseite")
            ev(s, "AP.lernstandSync.abgleichen()")
            s.wait_for_function("(FAKE.db.lernstand[0] || {}).version === 2", timeout=5000)
            pruefe(server_lz(s, "ICH") == ["Kapitel-neu", "Start"], "Jetzt abgleichen sendet sie", server_lz(s, "ICH"))
            lernen(s, "App-neu")
            s.wait_for_function("(FAKE.db.lernstand[0] || {}).version === 3", timeout=5000)
            pruefe(server_lz(s, "ICH") == ["App-neu", "Kapitel-neu", "Start"] and lokal_lz(s) == ["App-neu", "Kapitel-neu", "Start"],
                   "Nächste App-Änderung verdrängt nichts", (server_lz(s, "ICH"), lokal_lz(s)))
            t2.reload(); t2.wait_for_function("window.AP && AP.stand")
            pruefe(lz(t2) == ["App-neu", "Kapitel-neu", "Start"], "Lernzettelseite nach Neuladen vollständig", lz(t2))
            ctx.close()

            print("LS02: zwei App-Tabs, Tab 2 speichert zuerst erfolgreich")
            ctx = kontext()
            s = app_tab(ctx, geraet(["Start"]))
            warte_status(s, "aktuell")
            t2 = app_tab(ctx, "FAKE.db.lernstand = " + json.dumps(ev(s, "FAKE.db.lernstand")) + ";")
            warte_status(t2, "aktuell")
            lernen(t2, "Tab2-neu")
            t2.wait_for_function("(FAKE.db.lernstand[0] || {}).version >= 2", timeout=5000)
            ev(s, "rows => { FAKE.db.lernstand = rows; }", ev(t2, "FAKE.db.lernstand"))   # beide Tabs: ein Server
            ev(s, "AP.lernstandSync.abgleichen()")
            warte_status(s, "aktuell")
            pruefe(lz(s) == ["Start", "Tab2-neu"], "Tab 1 zeigt nach dem Abgleich auch Tab2-neu", lz(s))
            lernen(s, "Tab1-neu")
            s.wait_for_function("(FAKE.db.lernstand[0] || {}).version >= 3", timeout=5000)
            pruefe(server_lz(s, "ICH") == ["Start", "Tab1-neu", "Tab2-neu"], "Server behält beide Änderungen", server_lz(s, "ICH"))
            # Neu geöffneter Tab (ohne erneute Test-Saat aus dem Init-Skript) = Neuladen
            n = ctx.new_page(); n.goto(url + "lf1.html"); n.wait_for_function("window.AP && AP.stand")
            pruefe(lz(n) == ["Start", "Tab1-neu", "Tab2-neu"], "Nach Neuladen beide da", lz(n))
            ctx.close()

            print("LS02: gleichzeitige lokale Änderungen in zwei Tabs")
            ctx = kontext()
            s = app_tab(ctx, geraet(["Start"]))
            warte_status(s, "aktuell")
            t2 = ctx.new_page(); t2.goto(url + "lf1.html"); t2.wait_for_function("window.AP && AP.stand")
            lernen(s, "eins")
            lernen(s, "zwei", sofort=False)                        # noch gebündelt, nicht geschrieben
            pruefe(ev(s, "JSON.parse(localStorage.getItem('azubipass:konto')).lesezeichen.length") == 2, "zwei wartet noch im Tab")
            lernen(t2, "drei")
            s.wait_for_timeout(700)
            pruefe(lokal_lz(s) == ["Start", "drei", "eins", "zwei"] and lz(s) == ["Start", "drei", "eins", "zwei"],
                   "Beide Änderungen im Browser und im Tab", (lokal_lz(s), lz(s)))
            lernen(t2, "vier")
            s.wait_for_function("AP.stand.lesezeichen.length === 5", timeout=3000)
            pruefe(True, "Weitere Änderung der Lernzettelseite kommt an")
            print("LS02: Rückkehr aus dem Hintergrund und Neustart")
            ev(s, """() => { const k = JSON.parse(localStorage.getItem('azubipass:konto'));
                k.lesezeichen.push({ zu: 'verpasst', titel: 'verpasst', lernfeld: 'lf1' });
                k.geaendertAm = new Date().toISOString();
                localStorage.setItem('azubipass:konto', JSON.stringify(k));
                document.dispatchEvent(new Event('visibilitychange')); }""")
            pruefe("verpasst" in lz(s), "Rückkehr holt verpasste Änderung in den Tab", lz(s))
            s.wait_for_function("FAKE.db.lernstand[0].daten.lesezeichen.length === 6", timeout=6000)
            pruefe(server_lz(s, "ICH") == ["Start", "drei", "eins", "verpasst", "vier", "zwei"], "Server hat alles", server_lz(s, "ICH"))
            s.close()
            n = ctx.new_page(); n.goto(url + "app.html#ich"); n.wait_for_function("window.AP && AP.stand")
            pruefe(len(lz(n)) == 6, "Nach Neustart alles da", lz(n))
            ctx.close()

            print("LS02: Kontowechsel im anderen Tab – Reste wandern nicht mit")
            ctx = kontext()
            s = app_tab(ctx, geraet(["Start"], sitzung=False) + "localStorage.setItem('azubipass-lernsync', JSON.stringify({ nutzer: '00000000-0000-4000-a000-00000000a001', version: null, am: null }));")
            t2 = ctx.new_page(); t2.goto(url + "lf1.html"); t2.wait_for_function("window.AP && AP.stand")
            lernen(t2, "A-eins")
            lernen(t2, "A-rest", sofort=False)                     # noch gebündelt
            ev(s, """() => { localStorage.setItem('azubipass-lernsync', JSON.stringify({ nutzer: '00000000-0000-4000-a000-00000000b001', version: null, am: null }));
                AP.kontoErsetzen({ lesezeichen: [{ zu: 'B', titel: 'B', lernfeld: 'lf1' }] }); }""")
            t2.wait_for_timeout(700)
            pruefe(lokal_lz(t2) == ["B"] and lz(t2) == ["B"], "Bündel von A landet nicht im Stand von B", (lokal_lz(t2), lz(t2)))
            ctx.close()

            browser.close()

    print()
    print(f"{'Alles bestanden' if not basis.fehler else str(len(basis.fehler)) + ' Fehler'}")
    return 1 if basis.fehler else 0


if __name__ == "__main__":
    sys.exit(main())
