#!/usr/bin/env python3
"""
AzubiPass · Korrekturen G03–G05 nach dem ChatGPT-Review von Spec 05

    AXE_PFAD=…/axe.min.js python3 community_korrekturen_test.py [--bilder ORDNER]

Alle Fälle sind [mock]: Die echten Module community.js, community-ansicht.js
und community-beitraege.js laufen im Browser gegen eine nachgebildete
Supabase-Schnittstelle (window.supabase.createClient). So lassen sich
verlorene Bestätigungen, HTTP 503, verspätet ankommende Originale und
angehaltene Freigabeprüfungen gezielt auslösen. Die Serverseite derselben
Regeln prüft supabase/tests/korrekturen_g03_g05_test.sql gegen die echte
Datenbank (bestanden 14.10.2026). Keine Zugangsdaten nötig.

Rückgabewert 1 bei einem Fehler.
"""

import functools
import http.server
import os
import socketserver
import struct
import sys
import threading
import zlib
from pathlib import Path

from playwright.sync_api import sync_playwright

DOCS = Path(__file__).resolve().parent.parent / "docs"
# axe-core 4.10.2 (npm), Pfad über AXE_PFAD – optional, liegt bewusst nicht im Repo.
AXE = Path(os.environ.get("AXE_PFAD", "node_modules/axe-core/axe.min.js"))
fehler = []
BILDER = Path(sys.argv[sys.argv.index("--bilder") + 1]) if "--bilder" in sys.argv else None


def pruefe(bedingung, text, wert=""):
    print(f"  {'OK  ' if bedingung else 'FEHL'} [mock] {text}" + (f"  {wert}" if wert != "" else ""))
    if not bedingung:
        fehler.append(text)


class Stiller(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def png(w=40, h=30):
    zeile = b"\x00" + b"\x1b\x43\x32" * w
    roh = zeile * h

    def stueck(t, d):
        return struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xffffffff)
    return (b"\x89PNG\r\n\x1a\n" + stueck(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0))
            + stueck(b"IDAT", zlib.compress(roh)) + stueck(b"IEND", b""))


# Nachgebildete Supabase-Schnittstelle. Steuerung über window.FAKE:
#   plan[rpcName] = ["verlieren" | "spaet" | "503" | "503-ausgefuehrt" | "halten" | "bremse", …]
#   tabFehler[tabelle] = Anzahl folgender Lesefehler
#   aufrufe[rpcName] = [args, …], entfernt = [pfade], spaetAusfuehren(), freigeben(name)
FAKE_JS = r"""
(() => {
  const ICH = { id: "00000000-0000-4000-a000-00000000a001", email: "anna@test.invalid" };
  const BEN = "00000000-0000-4000-a000-00000000b001";
  const jetzt = () => new Date().toISOString();
  const F = window.FAKE = {
    db: { profil: [{ id: ICH.id, anzeigename: "Anna", lehrjahr: 2, ueber_mich: "", rolle: "azubi", erstellt_am: jetzt() }],
          beitrag: [], antwort: [], vorgang: {}, dateien: {} },
    plan: {}, tabFehler: {}, aufrufe: {}, entfernt: [], spaet: [], gehalten: {},
    spaetAusfuehren() { const s = F.spaet.splice(0); return s.map(f => f()); },
    freigeben(name) { const g = F.gehalten[name] || []; F.gehalten[name] = []; g.forEach(f => f()); return g.length; }
  };
  const fetchFehler = () => ({ data: null, error: { message: "TypeError: Failed to fetch", details: "", hint: "", code: "" }, status: 0 });
  const p0001 = (m) => ({ data: null, error: { message: m, details: null, hint: null, code: "P0001" }, status: 400 });
  const ok = (d) => ({ data: d, error: null, status: 200 });

  function zeile(b) {
    const zahl = F.db.antwort.filter(a => a.beitrag_id === b.id && !a.versteckt).length;
    return Object.assign({ gruppe_id: null, lernfeld: null, kapitel: null, datei_pfad: null, datei_art: null,
      an_mentoren: false, geloest: false, versteckt: false, bearbeitet_am: null, autor_name: b.autor_id === ICH.id ? "Anna" : "Ben",
      autor_rolle: "azubi", autor_lehrjahr: 2, gruppe_name: null, hilfreich_zahl: 0, von_mir_hilfreich: false }, b, { antworten: zahl });
  }
  function tabelle(name) {
    if (name === "beitrag_liste") return F.db.beitrag.map(zeile);
    if (name === "antwort") return F.db.antwort.map(a => Object.assign({}, a,
      { autor: { anzeigename: a.autor_id === ICH.id ? "Anna" : "Ben", rolle: "azubi", lehrjahr: 2 } }));
    return F.db[name] || [];
  }

  const LOGIK = {
    beitraege_frei: () => ok(true),
    beitrag_veroeffentlichen: (a) => {
      const v = F.db.vorgang[a.p_vorgang];
      const da = F.db.beitrag.find(b => b.id === a.p_vorgang);
      if (da) return ok(da.id);
      if (v === "verworfen") return p0001("Dieser Vorgang wurde abgebrochen.");
      F.db.vorgang[a.p_vorgang] = "angelegt";
      F.db.beitrag.push({ id: a.p_vorgang, autor_id: ICH.id, art: a.p_art, titel: a.p_titel, text: a.p_text,
        lernfeld: a.p_lernfeld, kapitel: a.p_kapitel, an_mentoren: a.p_an_mentoren,
        datei_pfad: a.p_datei_pfad, datei_art: a.p_datei_art, erstellt_am: jetzt() });
      return ok(a.p_vorgang);
    },
    antwort_senden: (a) => {
      const da = F.db.antwort.find(x => x.id === a.p_vorgang);
      if (da) return ok(da.id);
      if (F.db.vorgang[a.p_vorgang] === "verworfen") return p0001("Dieser Vorgang wurde abgebrochen.");
      F.db.vorgang[a.p_vorgang] = "angelegt";
      F.db.antwort.push({ id: a.p_vorgang, beitrag_id: a.p_beitrag, autor_id: ICH.id, text: a.p_text,
        beste: false, versteckt: false, erstellt_am: jetzt() });
      return ok(a.p_vorgang);
    },
    vorgang_klaeren: (a) => {
      if (!F.db.vorgang[a.p_vorgang]) {
        const da = (a.p_art === "beitrag" ? F.db.beitrag : F.db.antwort).some(x => x.id === a.p_vorgang);
        F.db.vorgang[a.p_vorgang] = da ? "angelegt" : "verworfen";
      }
      return ok(F.db.vorgang[a.p_vorgang]);
    },
    beste_antwort_setzen: (a) => {
      const an = F.db.antwort.find(x => x.id === a.p_antwort);
      const b = F.db.beitrag.find(x => x.id === an.beitrag_id);
      if (an.beste !== a.p_beste) {
        if (a.p_beste) F.db.antwort.forEach(x => { if (x.beitrag_id === b.id) x.beste = false; });
        an.beste = a.p_beste;
        b.geloest = a.p_beste;
      }
      return ok(a.p_beste);
    }
  };

  function rpc(name, args) {
    (F.aufrufe[name] = F.aufrufe[name] || []).push(JSON.parse(JSON.stringify(args || {})));
    const schritt = (F.plan[name] || []).shift();
    const logik = () => LOGIK[name] ? LOGIK[name](args || {}) : ok(null);
    if (schritt === "verlieren") { logik(); return Promise.resolve(fetchFehler()); }
    if (schritt === "spaet") { F.spaet.push(logik); return Promise.resolve(fetchFehler()); }
    if (schritt === "503") return Promise.resolve({ data: null, error: { message: "Service Unavailable", code: "" }, status: 503 });
    if (schritt === "503-ausgefuehrt") { logik(); return Promise.resolve({ data: null, error: { message: "Service Unavailable", code: "" }, status: 503 }); }
    if (schritt === "bremse") return Promise.resolve(p0001("Kurz durchatmen: zu viele Beiträge in kurzer Zeit."));
    if (schritt === "halten") return new Promise(ja => (F.gehalten[name] = F.gehalten[name] || []).push(() => ja(logik())));
    return Promise.resolve(logik());
  }

  function abfrage(name) {
    const filter = [];
    let einzeln = null;
    const q = {
      select() { return q; }, order() { return q; }, limit() { return q; }, range() { return q; },
      or() { return q; }, lt() { return q; }, gt() { return q; }, lte() { return q; }, gte() { return q; },
      is() { return q; }, neq() { return q; }, in() { return q; },
      eq(k, v) { filter.push([k, v]); return q; },
      maybeSingle() { einzeln = "vielleicht"; return q; }, single() { einzeln = "genau"; return q; },
      then(ja, nein) {
        if (F.tabFehler[name] > 0) { F.tabFehler[name]--; return Promise.resolve(fetchFehler()).then(ja, nein); }
        let r = tabelle(name).filter(z => filter.every(([k, v]) => z[k] === v));
        const d = einzeln ? (r[0] || null) : r;
        return Promise.resolve(ok(d)).then(ja, nein);
      }
    };
    return q;
  }

  const sitzung = { user: ICH, access_token: "x", expires_at: 9999999999 };
  const client = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: sitzung }, error: null }),
      getUser: () => Promise.resolve({ data: { user: ICH }, error: null }),
      // Wie supabase-js: INITIAL_SESSION kommt vor dem ersten getSession-Ergebnis.
      onAuthStateChange(cb) { cb("INITIAL_SESSION", sitzung); return { data: { subscription: { unsubscribe() {} } } }; },
      signOut: () => Promise.resolve({ error: null })
    },
    from: abfrage,
    rpc,
    storage: { from: () => ({
      upload(pfad, datei) { if (F.db.dateien[pfad]) return Promise.resolve({ data: null, error: { message: "The resource already exists", statusCode: "409" } });
                            F.db.dateien[pfad] = true; return Promise.resolve({ data: { path: pfad }, error: null }); },
      remove(pfade) { pfade.forEach(p => { F.entfernt.push(p); delete F.db.dateien[p]; }); return Promise.resolve({ data: pfade.map(n => ({ name: n })), error: null }); },
      download() { return Promise.resolve({ data: new Blob(["x"], { type: "image/png" }), error: null }); }
    }) }
  };
  window.supabase = { createClient: () => client };
  F.ICH = ICH.id; F.BEN = BEN;
})();
"""


def main():
    PNG = png()
    handler = functools.partial(Stiller, directory=str(DOCS))
    with socketserver.TCPServer(("127.0.0.1", 0), handler) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        basis = f"http://127.0.0.1:{srv.server_address[1]}/"
        with sync_playwright() as p:
            browser = p.chromium.launch()

            def neue_seite(ziel):
                ctx = browser.new_context(viewport={"width": 390, "height": 844},
                                          service_workers="block", locale="de-DE")
                ctx.add_init_script(FAKE_JS)
                s = ctx.new_page()
                s.on("dialog", lambda d: d.accept())
                s.goto(basis + "app.html#heute")
                s.wait_for_function("window.AP && AP.community && AP.communityBeitraege")
                return ctx, s

            def ev(s, js, arg=None):
                return s.evaluate(js, arg)

            def warte_text(s, text, timeout=5000):
                s.get_by_text(text, exact=False).first.wait_for(timeout=timeout)

            def c06(s, titel="Wie buche ich Skonto?", text="Bitte mit Beispiel.", art=None):
                s.evaluate("location.hash = '#community/schreiben'")
                s.get_by_label("Titel").wait_for()
                if art:
                    s.get_by_label(art, exact=True).check()
                s.get_by_label("Titel").fill(titel)
                if text is not None:
                    s.locator("form.cm-schreiben textarea").fill(text)

            def senden_c06(s):
                s.get_by_role("button", name="Beitrag veröffentlichen").click()

            def zahl(s, js):
                return ev(s, js)

            def axe(s, name):
                if BILDER:
                    BILDER.mkdir(parents=True, exist_ok=True)
                    datei = name.lower().replace(" ", "-").replace("ä", "ae").replace("ö", "oe").replace("ü", "ue")
                    s.screenshot(path=str(BILDER / f"{datei}.png"), full_page=True)
                if not AXE.exists():
                    print(f"  ---- [mock] axe übersprungen ({name}): AXE_PFAD fehlt")
                    return
                s.add_script_tag(path=str(AXE))
                v = s.evaluate("""async () => (await axe.run(document.querySelector('#community'),
                    { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] })).violations.map(x => x.id + ':' + x.nodes.length)""")
                pruefe(not v, f"axe ohne WCAG-Verstöße: {name}", ", ".join(v))

            print("G03 · unklarer Ausgang, Beitrag")
            ctx, s = neue_seite("")
            c06(s)
            ev(s, "FAKE.plan.beitrag_veroeffentlichen = ['spaet']")
            senden_c06(s)
            warte_text(s, "Wir konnten nicht prüfen, ob dein Beitrag veröffentlicht wurde.")
            titel = s.get_by_label("Titel")
            pruefe(titel.evaluate("e => e.readOnly") is True, "Titel ist im Zustand „unklar“ gesperrt")
            pruefe(s.get_by_role("button", name="Beitrag veröffentlichen").is_disabled(), "Veröffentlichen gesperrt")
            s.get_by_role("button", name="Status prüfen").click()
            warte_text(s, "Der Beitrag wurde noch nicht gefunden. Der Ausgang ist weiterhin unklar.")
            pruefe(s.get_by_text("Dein Beitrag wurde nicht veröffentlicht").count() == 0,
                   "Leerer Status behauptet keinen Fehlschlag")
            pruefe(titel.evaluate("e => e.readOnly") is True, "Nach leerem Status weiter gesperrt")
            axe(s, "C06 unklar mit Klärungsaktionen")
            ev(s, "FAKE.spaetAusfuehren()")                       # Original kommt verspätet an
            s.get_by_role("button", name="Erneut senden").click()
            s.wait_for_function("location.hash.indexOf('#community/beitrag/') === 0")
            a = ev(s, "FAKE.aufrufe.beitrag_veroeffentlichen")
            pruefe(len(a) == 2 and a[0] == a[1], "Wiederholung sendet denselben Stand mit derselben Kennung")
            pruefe(zahl(s, "FAKE.db.beitrag.length") == 1, "Verspätetes Original + Wiederholung = genau ein Beitrag")
            ctx.close()

            print("G03 · Eingaben ändern nach unklarem Ausgang")
            ctx, s = neue_seite("")
            c06(s, titel="Erster Titel")
            ev(s, "FAKE.plan.beitrag_veroeffentlichen = ['spaet']")
            senden_c06(s)
            warte_text(s, "Wir konnten nicht prüfen")
            s.get_by_role("button", name="Eingaben ändern").click()
            warte_text(s, "Dein Beitrag wurde nicht veröffentlicht. Du kannst deine Eingaben jetzt ändern.")
            pruefe(s.get_by_label("Titel").evaluate("e => e.readOnly") is False, "Nach „verworfen“ wieder bearbeitbar")
            r = ev(s, "FAKE.spaetAusfuehren()")
            pruefe(r and r[0]["error"] and "abgebrochen" in r[0]["error"]["message"],
                   "Verspätetes Original nach „verworfen“ wird abgelehnt")
            pruefe(zahl(s, "FAKE.db.beitrag.length") == 0, "Kein Beitrag aus dem verworfenen Vorgang")
            s.get_by_label("Titel").fill("Geänderter Titel")
            senden_c06(s)
            s.wait_for_function("location.hash.indexOf('#community/beitrag/') === 0")
            a = ev(s, "FAKE.aufrufe.beitrag_veroeffentlichen")
            pruefe(a[0]["p_vorgang"] != a[1]["p_vorgang"], "Geänderte Eingaben bekommen erst nach Klärung eine neue Kennung")
            pruefe(zahl(s, "FAKE.db.beitrag.length") == 1 and ev(s, "FAKE.db.beitrag[0].titel") == "Geänderter Titel",
                   "Genau ein Beitrag mit dem geänderten Titel")
            ctx.close()

            print("G03 · HTTP 503 und Datei")
            for plan, erwartet in (("503-ausgefuehrt", "gefunden"), ("503", "verworfen")):
                ctx, s = neue_seite("")
                c06(s, titel="Lernzettel Skonto", text="", art="Lernzettel")
                s.locator("form.cm-schreiben input[type=file]").set_input_files(
                    files=[{"name": "zettel.png", "mimeType": "image/png", "buffer": PNG}])
                ev(s, f"FAKE.plan.beitrag_veroeffentlichen = ['{plan}']")
                senden_c06(s)
                warte_text(s, "Wir konnten nicht prüfen, ob dein Beitrag veröffentlicht wurde.")
                pruefe(ev(s, "FAKE.entfernt.length") == 0, f"{plan}: Datei nach 503 nicht entfernt")
                pruefe(s.locator("form.cm-schreiben input[type=file]").is_disabled(), f"{plan}: Dateiauswahl gesperrt")
                if erwartet == "gefunden":
                    s.get_by_role("button", name="Status prüfen").click()
                    s.wait_for_function("location.hash.indexOf('#community/beitrag/') === 0")
                    pruefe(ev(s, "FAKE.db.beitrag.length") == 1 and ev(s, "FAKE.entfernt.length") == 0,
                           "503 nach Festschreiben: Status findet den Beitrag, Datei bleibt")
                else:
                    s.get_by_role("button", name="Eingaben ändern").click()
                    warte_text(s, "Du kannst deine Eingaben jetzt ändern.")
                    v = ev(s, "FAKE.aufrufe.beitrag_veroeffentlichen[0].p_vorgang")
                    pruefe(ev(s, "FAKE.entfernt") == [f"{ev(s, 'FAKE.ICH')}/{v}.png"],
                           "503 ohne Ausführung: Datei erst nach „verworfen“ entfernt")
                ctx.close()

            print("G03 · sichere Ablehnung (Spam-Bremse)")
            ctx, s = neue_seite("")
            c06(s)
            ev(s, "FAKE.plan.beitrag_veroeffentlichen = ['bremse']")
            senden_c06(s)
            warte_text(s, "Du hast gerade viele Beiträge veröffentlicht.")
            pruefe(s.get_by_label("Titel").evaluate("e => e.readOnly") is False, "Nach sicherer Ablehnung bearbeitbar")
            senden_c06(s)                                       # unverändert: dieselbe Kennung
            s.wait_for_function("location.hash.indexOf('#community/beitrag/') === 0")
            a = ev(s, "FAKE.aufrufe.beitrag_veroeffentlichen")
            pruefe(a[0]["p_vorgang"] == a[1]["p_vorgang"] and not ev(s, "FAKE.aufrufe.vorgang_klaeren"),
                   "Unveränderte Wiederholung: dieselbe Kennung, keine Klärung nötig")
            ctx.close()
            ctx, s = neue_seite("")
            c06(s)
            ev(s, "FAKE.plan.beitrag_veroeffentlichen = ['bremse']")
            senden_c06(s)
            warte_text(s, "Du hast gerade viele Beiträge veröffentlicht.")
            s.get_by_label("Titel").fill("Neuer Titel nach Ablehnung")
            senden_c06(s)
            s.wait_for_function("location.hash.indexOf('#community/beitrag/') === 0")
            a = ev(s, "FAKE.aufrufe.beitrag_veroeffentlichen")
            k = ev(s, "FAKE.aufrufe.vorgang_klaeren")
            pruefe(k and k[0]["p_vorgang"] == a[0]["p_vorgang"] and a[1]["p_vorgang"] != a[0]["p_vorgang"],
                   "Geändert nach Ablehnung: alter Vorgang geklärt, dann neue Kennung")
            ctx.close()

            print("G04 · Eingaben während des Sendens")
            ctx, s = neue_seite("")
            c06(s, titel="Ursprünglicher Titel", text="Ursprünglicher Text")
            ev(s, "FAKE.plan.beitraege_frei = ['halten']")
            senden_c06(s)
            s.wait_for_function("(FAKE.gehalten.beitraege_frei || []).length === 1")
            gesperrt = ev(s, """() => {
              const f = document.querySelector('form.cm-schreiben');
              const els = [...f.querySelectorAll('input, textarea, select')].filter(x => x.type !== 'submit');
              return els.every(x => x.readOnly || x.disabled);
            }""")
            pruefe(gesperrt, "Alle Eingaben während der Freigabeprüfung gesperrt")
            pruefe(s.get_by_text("Während des Sendens kannst du deine Eingaben nicht ändern.").is_visible(), "Sperrhinweis sichtbar")
            s.locator("form.cm-schreiben textarea").focus()
            s.keyboard.type(" Nach dem Absenden ergänzt")
            ev(s, """() => { const t = document.querySelector('form.cm-schreiben textarea');
                    t.value = 'Per Skript geändert'; t.dispatchEvent(new Event('input', { bubbles: true })); }""")
            pruefe(s.get_by_role("button", name="‹ Zurück zu Beiträgen").is_enabled(), "Rückweg bleibt bedienbar")
            axe(s, "C06 gesperrt während des Sendens")
            ev(s, "FAKE.freigeben('beitraege_frei')")
            s.wait_for_function("location.hash.indexOf('#community/beitrag/') === 0")
            a = ev(s, "FAKE.aufrufe.beitrag_veroeffentlichen[0]")
            pruefe(a["p_text"] == "Ursprünglicher Text" and a["p_titel"] == "Ursprünglicher Titel",
                   "Gesendet wird der validierte Stand", a["p_text"])
            ctx.close()

            print("G03/G04 · Antworten")
            ctx, s = neue_seite("")
            ev(s, """FAKE.db.beitrag.push({ id: '00000000-0000-4000-a000-0000000f0001', autor_id: FAKE.BEN, art: 'frage',
                      titel: 'Frage von Ben', text: 'Was ist Skonto?', erstellt_am: new Date().toISOString() })""")
            ev(s, "location.hash = '#community/beitrag/00000000-0000-4000-a000-0000000f0001'")
            s.get_by_role("button", name="Antwort schreiben").click()
            feld = s.get_by_label("Deine Antwort")
            feld.fill("Antwort A")
            ev(s, "FAKE.plan.antwort_senden = ['halten']")
            s.get_by_role("button", name="Antwort senden").click()
            s.wait_for_function("(FAKE.gehalten.antwort_senden || []).length === 1")
            pruefe(feld.evaluate("e => e.readOnly") is True, "Antwortfeld während des Sendens gesperrt")
            feld.focus()
            s.keyboard.type(" B nach Versand")
            ev(s, "FAKE.freigeben('antwort_senden')")
            warte_text(s, "Deine Antwort wurde gesendet.")
            pruefe(ev(s, "FAKE.aufrufe.antwort_senden[0].p_text") == "Antwort A", "Gesendet wurde „Antwort A“")
            s.get_by_role("button", name="Antwort schreiben").click()
            s.get_by_label("Deine Antwort").fill("Zweite Antwort")
            ev(s, "FAKE.plan.antwort_senden = ['spaet']")
            s.get_by_role("button", name="Antwort senden").click()
            warte_text(s, "Wir konnten nicht prüfen, ob deine Antwort gesendet wurde.")
            s.get_by_role("button", name="Status prüfen").click()
            warte_text(s, "Die Antwort wurde noch nicht gefunden. Der Ausgang ist weiterhin unklar.")
            pruefe(s.get_by_label("Deine Antwort").evaluate("e => e.readOnly") is True, "Antwort nach leerem Status weiter gesperrt")
            axe(s, "Antwort unklar")
            ev(s, "FAKE.spaetAusfuehren()")
            s.get_by_role("button", name="Erneut senden").click()
            warte_text(s, "Deine Antwort wurde gesendet.")
            a = ev(s, "FAKE.aufrufe.antwort_senden")
            pruefe(a[1] == a[2], "Antwort: Wiederholung mit derselben Kennung und demselben Text")
            pruefe(ev(s, "FAKE.db.antwort.filter(x => x.text === 'Zweite Antwort').length") == 1, "Antwort: genau eine Antwort")
            ctx.close()

            print("G05 · beste Antwort")
            ctx, s = neue_seite("")
            ev(s, """(() => { const b = '00000000-0000-4000-a000-0000000f0002';
                FAKE.db.beitrag.push({ id: b, autor_id: FAKE.ICH, art: 'frage', titel: 'Meine Frage', text: 'x', erstellt_am: new Date().toISOString() });
                FAKE.db.antwort.push({ id: '00000000-0000-4000-a000-0000000a0001', beitrag_id: b, autor_id: FAKE.BEN, text: 'Antwort eins', beste: false, versteckt: false, erstellt_am: '2026-10-14T08:00:00Z' });
                FAKE.db.antwort.push({ id: '00000000-0000-4000-a000-0000000a0002', beitrag_id: b, autor_id: FAKE.BEN, text: 'Antwort zwei', beste: false, versteckt: false, erstellt_am: '2026-10-14T09:00:00Z' });
                location.hash = '#community/beitrag/' + b; })()""")
            s.get_by_role("button", name="Als beste Antwort markieren").first.wait_for()
            ev(s, "FAKE.plan.beste_antwort_setzen = ['verlieren']")
            s.get_by_role("button", name="Als beste Antwort markieren").first.click()
            s.get_by_role("button", name="Markierung entfernen").wait_for()
            pruefe(ev(s, "FAKE.aufrufe.beste_antwort_setzen[0].p_beste") is True, "Markieren sendet p_beste = true")
            pruefe(s.get_by_text("Die Markierung konnte nicht geändert werden").count() == 0,
                   "Verlorene Bestätigung: kein falscher Fehler, Stand neu geladen")
            pruefe(s.get_by_text("Gelöst").count() >= 1, "Kopf zeigt „Gelöst“ aus dem geladenen Stand")
            ev(s, "FAKE.plan.beste_antwort_setzen = ['verlieren']")
            s.get_by_role("button", name="Markierung entfernen").click()
            s.get_by_role("button", name="Als beste Antwort markieren").nth(1).wait_for()
            pruefe(ev(s, "FAKE.aufrufe.beste_antwort_setzen[1].p_beste") is False, "Entfernen sendet p_beste = false")
            pruefe(ev(s, "FAKE.db.antwort.filter(a => a.beste).length") == 0, "Kein unbeabsichtigtes Umschalten")
            ev(s, "FAKE.tabFehler.beitrag_liste = 1")
            s.get_by_role("button", name="Als beste Antwort markieren").first.click()
            warte_text(s, "Der aktuelle Stand konnte nicht geladen werden.")
            pruefe(s.get_by_role("button", name="Erneut laden").is_visible(), "Nachladefehler sichtbar mit „Erneut laden“")
            axe(s, "C05 Nachladefehler beste Antwort")
            s.get_by_role("button", name="Erneut laden").click()
            s.get_by_text("Gelöst").first.wait_for()
            pruefe(s.get_by_text("Der aktuelle Stand konnte nicht geladen werden.").count() == 0, "Erneut laden stellt den Stand her")
            ctx.close()

            browser.close()

    print()
    print(f"{'Alles bestanden' if not fehler else str(len(fehler)) + ' Fehler'}")
    return 1 if fehler else 0


if __name__ == "__main__":
    sys.exit(main())
