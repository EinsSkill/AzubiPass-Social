#!/usr/bin/env python3
"""
AzubiPass · Lerngruppen, Wochenaufgaben, Hilfreich – Oberfläche [mock]

    AXE_PFAD=…/axe.min.js python3 community_gruppen_test.py [--bilder ORDNER]

Die echten Module laufen gegen die nachgebildete Schnittstelle aus
community_korrekturen_test.py, erweitert um Gruppen-Tabellen und -RPCs.
Die Serverseite prüft supabase/tests/gruppen_test.sql. Keine Zugangsdaten.
"""

import functools
import socketserver
import sys
import threading

from playwright.sync_api import sync_playwright

import community_korrekturen_test as basis

pruefe = basis.pruefe
B1 = "00000000-0000-4000-a000-0000000000b1"
G1 = "00000000-0000-4000-a000-0000000000f1"     # offene Gruppe von Ben
G2 = "00000000-0000-4000-a000-0000000000f2"     # geschlossene Gruppe von Ben, Code BENCODE1

GRUPPEN_JS = r"""
(() => {
  const F = window.FAKE, jetzt = () => new Date().toISOString();
  const heute = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const plus = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  try { localStorage.setItem("azubipass-sitzung", "{}"); } catch (e) {}
  const B1 = "%B1%", G1 = "%G1%", G2 = "%G2%";
  F.db.beitrag.push({ id: B1, autor_id: F.BEN, art: "frage", titel: "Wie buche ich Skonto?", text: "Bitte mit Beispiel.", erstellt_am: "2026-10-14T08:00:00Z" });
  F.db.gruppe = [
    { id: G1, name: "Offene Lerngruppe", beschreibung: "Für alle", offen: true, erstellt_von: F.BEN, erstellt_am: jetzt() },
    { id: G2, name: "Bens geschlossene Gruppe", beschreibung: "", offen: false, erstellt_von: F.BEN, erstellt_am: jetzt() }];
  F.db.mitglied = [{ gruppe_id: G1, nutzer_id: F.BEN, rolle: "leitung" }, { gruppe_id: G2, nutzer_id: F.BEN, rolle: "leitung" }];
  F.db.gruppe_code = [{ gruppe_id: G1, code: "OFFEN123" }, { gruppe_id: G2, code: "BENCODE1" }];
  F.db.wochenaufgabe = []; F.db.erledigt = []; F.db.hilfreich = [];
  const ich = () => (F.aktuell() || {}).id;
  const name = (id) => id === F.ICH ? "Anna" : "Ben";
  const mitglied = (g) => F.db.mitglied.some(m => m.gruppe_id === g && m.nutzer_id === ich());
  F.sicht.gruppe_liste = () => F.db.gruppe.filter(g => g.offen || mitglied(g.id)).map(g => Object.assign({}, g, {
    mitglieder: F.db.mitglied.filter(m => m.gruppe_id === g.id).length,
    meine_rolle: (F.db.mitglied.find(m => m.gruppe_id === g.id && m.nutzer_id === ich()) || {}).rolle || null }));
  F.sicht.gruppe_code = () => F.db.gruppe_code.filter(c => mitglied(c.gruppe_id));
  F.sicht.mitglied = () => F.db.mitglied.map(m => Object.assign({}, m, { profil: { anzeigename: name(m.nutzer_id), rolle: "azubi", lehrjahr: 2 } }));
  F.sicht.aufgabe_liste = () => F.db.wochenaufgabe.filter(a => !a.gruppe_id || mitglied(a.gruppe_id)).map(a => Object.assign({}, a, {
    gruppe_name: a.gruppe_id ? (F.db.gruppe.find(g => g.id === a.gruppe_id) || {}).name : null,
    erledigt_zahl: F.db.erledigt.filter(e => e.aufgabe_id === a.id).length,
    von_mir_erledigt: F.db.erledigt.some(e => e.aufgabe_id === a.id && e.nutzer_id === ich()) }));
  F.sicht.beitrag_liste = () => F.db.beitrag.filter(b => !b.gruppe_id || mitglied(b.gruppe_id)).map(b => Object.assign({
    gruppe_id: null, lernfeld: null, kapitel: null, datei_pfad: null, datei_art: null, an_mentoren: false, geloest: false,
    versteckt: false, bearbeitet_am: null, autor_rolle: "azubi", autor_lehrjahr: 2, beruf: "kfb", autor_beruf: "kfb" }, b, {
    autor_name: name(b.autor_id), gruppe_name: b.gruppe_id ? (F.db.gruppe.find(g => g.id === b.gruppe_id) || {}).name : null,
    antworten: F.db.antwort.filter(a => a.beitrag_id === b.id).length,
    hilfreich_zahl: F.db.hilfreich.filter(h => h.beitrag_id === b.id).length,
    von_mir_hilfreich: F.db.hilfreich.some(h => h.beitrag_id === b.id && h.nutzer_id === ich()) }));
  const passt = (z, filter) => filter.every(([k, v]) => v === null ? z[k] == null : z[k] === v);
  F.aendern = (tab, modus, filter) => {
    const liste = F.db[tab];
    if (modus[0] === "insert") {
      const z = Object.assign({ id: crypto.randomUUID(), nutzer_id: ich(), erstellt_von: ich(), erstellt_am: jetzt() }, modus[1]);
      if (tab === "hilfreich" && liste.some(h => h.beitrag_id === z.beitrag_id && h.nutzer_id === z.nutzer_id))
        return { data: null, error: { message: "duplicate key", code: "23505" }, status: 409 };
      if (tab === "mitglied") z.rolle = "mitglied";
      liste.push(z);
      return F.ok(z);
    }
    if (modus[0] === "delete") { F.db[tab] = liste.filter(z => !passt(z, filter)); return F.ok(null); }
    if (modus[0] === "update") { liste.filter(z => passt(z, filter)).forEach(z => Object.assign(z, modus[1])); return F.ok(null); }
    return F.ok(null);
  };
  Object.assign(F.logik, {
    gruppe_gruenden: (a) => {
      const id = crypto.randomUUID();
      F.db.gruppe.push({ id, name: a.p_name, beschreibung: a.p_beschreibung, offen: a.p_offen, erstellt_von: ich(), erstellt_am: jetzt() });
      F.db.gruppe_code.push({ gruppe_id: id, code: "NEUCODE9" });
      F.db.mitglied.push({ gruppe_id: id, nutzer_id: ich(), rolle: "leitung" });
      return F.ok(id);
    },
    gruppe_beitreten: (a) => {
      const c = F.db.gruppe_code.find(x => x.code === String(a.p_code).toUpperCase());
      if (!c) return F.fehler("P0001", "Zu diesem Code gibt es keine Gruppe.");
      if (!mitglied(c.gruppe_id)) F.db.mitglied.push({ gruppe_id: c.gruppe_id, nutzer_id: ich(), rolle: "mitglied" });
      return F.ok(c.gruppe_id);
    },
    gruppe_verlassen: (a) => { F.db.mitglied = F.db.mitglied.filter(m => !(m.gruppe_id === a.p_gruppe && m.nutzer_id === ich())); return F.ok(null); },
    gruppe_beitrag_veroeffentlichen: (a) => {
      const da = F.db.beitrag.find(b => b.id === a.p_vorgang);
      if (da) return F.ok(da.id);
      if (!mitglied(a.p_gruppe)) return F.fehler("P0001", "Du bist nicht Mitglied dieser Gruppe.");
      F.db.vorgang[a.p_vorgang] = "angelegt";
      F.db.beitrag.push({ id: a.p_vorgang, autor_id: ich(), gruppe_id: a.p_gruppe, art: a.p_art, titel: a.p_titel, text: a.p_text, erstellt_am: jetzt() });
      return F.ok(a.p_vorgang);
    }
  });
  F.aufgabeAnlegen = (gruppe, titel) => { const id = crypto.randomUUID();
    F.db.wochenaufgabe.push({ id, gruppe_id: gruppe, titel, beschreibung: "", beginn: heute(), ende: plus(3), erstellt_von: F.BEN, erstellt_am: jetzt() }); return id; };
  F.teamwerden = () => { F.db.profil[0].rolle = "team"; };
})();
""".replace("%B1%", B1).replace("%G1%", G1).replace("%G2%", G2)


def main():
    handler = functools.partial(basis.Stiller, directory=str(basis.DOCS))
    with socketserver.TCPServer(("127.0.0.1", 0), handler) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        url = f"http://127.0.0.1:{srv.server_address[1]}/"
        with sync_playwright() as p:
            browser = p.chromium.launch()

            def neue_seite(ziel, team=False, vorher=""):
                ctx = browser.new_context(viewport={"width": 390, "height": 844}, service_workers="block", locale="de-DE")
                ctx.add_init_script(basis.FAKE_JS)
                ctx.add_init_script(GRUPPEN_JS)
                if vorher:
                    ctx.add_init_script(vorher)
                if team:
                    ctx.add_init_script("window.FAKE.teamwerden();")
                s = ctx.new_page()
                s.goto(url + "app.html#" + ziel)
                s.wait_for_function("window.AP && AP.communityGruppen")
                return ctx, s

            def ev(s, js, arg=None):
                return s.evaluate(js, arg)

            def warte(s, text, timeout=6000):
                s.get_by_text(text, exact=False).first.wait_for(timeout=timeout)

            def axe(s, name):
                if basis.BILDER:
                    basis.BILDER.mkdir(parents=True, exist_ok=True)
                    s.screenshot(path=str(basis.BILDER / (name.lower().replace(" ", "-") + ".png")), full_page=True)
                if not basis.AXE.exists():
                    print(f"  ---- [mock] axe übersprungen ({name})")
                    return
                s.add_script_tag(path=str(basis.AXE))
                v = s.evaluate("""async () => (await axe.run(document.querySelector('#community'),
                    { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] })).violations.map(x => x.id + ':' + x.nodes.length)""")
                pruefe(not v, f"axe ohne WCAG-Verstöße: {name}", ", ".join(v))

            print("Lerngruppen · Übersicht und lokale Navigation")
            ctx, s = neue_seite("community")
            s.get_by_role("link", name="Lerngruppen").first.wait_for()
            pruefe(ev(s, "document.querySelector('.cm-lokalnav a[aria-current=page]').textContent") == "Beiträge",
                   "Beiträge-Übersicht: lokale Navigation mit aktivem Bereich")
            s.get_by_role("link", name="Lerngruppen").first.click()
            warte(s, "Offene Lerngruppe")
            pruefe(s.get_by_text("Du bist noch in keiner Gruppe.").count() == 1, "Meine Gruppen leer")
            pruefe(s.get_by_text("Bens geschlossene Gruppe").count() == 0, "Fremde geschlossene Gruppe unsichtbar")
            pruefe(s.get_by_role("link", name="Aufgabe für alle stellen").count() == 0, "Ohne Team keine Aufgabe für alle")
            axe(s, "Lerngruppen Übersicht")
            ctx.close()

            print("Lerngruppen · gründen")
            ctx, s = neue_seite("community/gruppen/neu")
            s.get_by_label("Name der Gruppe").wait_for()
            s.get_by_role("button", name="Gruppe gründen").click()
            warte(s, "Der Name braucht 3 bis 60 Zeichen.")
            axe(s, "Gruppe gründen Fehler")
            s.get_by_label("Name der Gruppe").fill("Prüfungsvorbereitung LF4")
            s.locator("textarea").fill("Wir üben jede Woche.")
            s.get_by_role("button", name="Gruppe gründen").click()
            warte(s, "Deine Gruppe wurde gegründet.")
            a = ev(s, "FAKE.aufrufe.gruppe_gruenden[0]")
            pruefe(a["p_name"] == "Prüfungsvorbereitung LF4" and a["p_offen"] is False, "Gegründet: Name, geschlossen")
            warte(s, "NEUCODE9")
            pruefe(s.get_by_text("Du leitest die Gruppe").count() == 1 and
                   s.get_by_role("link", name="Wochenaufgabe stellen").count() == 1, "Leitung sieht Aufgabe stellen")
            axe(s, "Gruppe Detail Leitung")
            ctx.close()

            print("Lerngruppen · mit Code beitreten")
            ctx, s = neue_seite("community/gruppen/beitreten")
            s.get_by_label("Gruppencode").wait_for()
            s.get_by_label("Gruppencode").fill("falsch12")
            s.get_by_role("button", name="Beitreten").click()
            warte(s, "Zu diesem Code gibt es keine Gruppe.")
            s.get_by_label("Gruppencode").fill("bencode1")
            s.get_by_role("button", name="Beitreten").click()
            warte(s, "Du bist jetzt Mitglied dieser Gruppe.")
            pruefe(ev(s, "location.hash") == "#community/gruppe/" + G2, "Nach Beitritt in der Gruppe")
            warte(s, "Noch keine Beiträge.")
            pruefe(s.get_by_role("link", name="Wochenaufgabe stellen").count() == 0, "Mitglied stellt keine Aufgaben")
            ctx.close()

            print("Lerngruppen · offener Gruppe beitreten, Beitrag in der Gruppe")
            ctx, s = neue_seite("community/gruppe/" + G1)
            s.get_by_role("button", name="Gruppe beitreten").click()
            warte(s, "Du bist jetzt Mitglied dieser Gruppe.")
            s.get_by_role("link", name="Beitrag schreiben").click()
            s.get_by_label("Titel").wait_for()
            pruefe(s.get_by_label("Lernzettel", exact=True).count() == 0, "In Gruppen kein Lernzettel")
            pruefe(s.get_by_text("Nur für die Gruppe „Offene Lerngruppe“").count() == 1, "Ziel klar: nur die Gruppe")
            s.get_by_label("Titel").fill("Wer lernt am Mittwoch mit?")
            s.locator("form.cm-schreiben textarea").fill("Treffpunkt Bibliothek")
            ev(s, "FAKE.plan.gruppe_beitrag_veroeffentlichen = ['spaet']")
            s.get_by_role("button", name="Beitrag veröffentlichen").click()
            warte(s, "Wir konnten nicht prüfen, ob dein Beitrag veröffentlicht wurde.")
            ev(s, "FAKE.spaetAusfuehren()")
            s.get_by_role("button", name="Status prüfen").click()
            s.wait_for_function("location.hash.indexOf('#community/beitrag/') === 0")
            warte(s, "Gruppe „Offene Lerngruppe“")
            pruefe(s.get_by_role("button", name="‹ Zurück zur Gruppe").count() == 1, "Detail führt zurück zur Gruppe")
            a = ev(s, "FAKE.aufrufe.gruppe_beitrag_veroeffentlichen")
            pruefe(len(a) == 1 and a[0]["p_gruppe"] == G1 and a[0]["p_art"] == "frage", "Gruppen-RPC mit Gruppe und Art")
            s.get_by_role("button", name="‹ Zurück zur Gruppe").click()
            warte(s, "Wer lernt am Mittwoch mit?")
            pruefe(True, "Beitrag erscheint in der Gruppe")
            axe(s, "Gruppe Detail Mitglied")
            ctx.close()

            print("Wochenaufgaben · stellen, abhaken, Heute")
            ctx, s = neue_seite("community/gruppe/" + G1, vorher=f"window.FAKE.db.mitglied.push({{ gruppe_id: '{G1}', nutzer_id: window.FAKE.ICH, rolle: 'leitung' }});")
            s.get_by_role("link", name="Wochenaufgabe stellen").click()
            s.get_by_label("Titel").wait_for()
            s.get_by_role("button", name="Aufgabe stellen").click()
            warte(s, "Der Titel braucht 3 bis 120 Zeichen.")
            axe(s, "Wochenaufgabe stellen Fehler")
            s.get_by_label("Titel").fill("Fünf Buchungssätze zu Skonto")
            s.get_by_role("button", name="Aufgabe stellen").click()
            warte(s, "Die Wochenaufgabe wurde gestellt.")
            pruefe(ev(s, "FAKE.db.wochenaufgabe[0].gruppe_id") == G1, "Aufgabe gehört zur Gruppe")
            s.get_by_role("button", name="Als erledigt markieren").click()
            warte(s, "Gut gemacht!")
            pruefe(s.get_by_text("1 hat die Aufgabe erledigt.").count() == 1, "Zahl erledigt: 1")
            axe(s, "Wochenaufgabe")
            s.get_by_role("button", name="Erledigt – zurücknehmen").click()
            warte(s, "Markierung zurückgenommen.")
            pruefe(s.get_by_text("0 haben die Aufgabe erledigt.").count() == 1, "Zurückgenommen: 0")
            ev(s, "location.hash = '#heute'")
            s.wait_for_function("document.documentElement.dataset.bereich === 'heute'")
            ctx.close()
            ctx, s = neue_seite("heute", vorher=f"window.FAKE.db.mitglied.push({{ gruppe_id: '{G1}', nutzer_id: window.FAKE.ICH, rolle: 'mitglied' }}); window.FAKE.aufgabeAnlegen('{G1}', 'Kapitel 3 wiederholen');")
            warte(s, "Wochenaufgabe: Kapitel 3 wiederholen")
            pruefe(s.get_by_text("Aufgabe ansehen").count() == 1, "Heute zeigt die laufende Aufgabe mit Link")
            ctx.close()
            ctx, s = neue_seite("heute", vorher="localStorage.removeItem('azubipass-sitzung');")
            s.wait_for_timeout(800)
            pruefe(s.get_by_text("Wochenaufgabe:").count() == 0 and not ev(s, "Object.keys(FAKE.aufrufe).length"),
                   "Ohne gespeicherte Sitzung lädt Heute nichts")
            ctx.close()

            print("Hilfreich")
            ctx, s = neue_seite("community/beitrag/" + B1)
            k = s.get_by_role("button", name="Als hilfreich markieren")
            k.wait_for()
            k.click()
            s.get_by_role("button", name="Hilfreich markiert").wait_for()
            pruefe(s.get_by_text("1 hilfreich").count() >= 1 and
                   ev(s, "document.querySelector('.cm-hilfreich-knopf').getAttribute('aria-pressed')") == "true",
                   "Markiert: Zahl 1, aria-pressed")
            s.get_by_role("button", name="Hilfreich markiert").click()
            s.get_by_role("button", name="Als hilfreich markieren").wait_for()
            pruefe(s.get_by_text("0 hilfreich").count() >= 1, "Zurückgenommen: 0")
            ev(s, "FAKE.plan['tab:hilfreich'] = [{ code: '', status: 503 }]")
            s.get_by_role("button", name="Als hilfreich markieren").click()
            warte(s, "Die Markierung konnte nicht gespeichert werden.")
            pruefe(s.get_by_text("0 hilfreich").count() >= 1, "Nach Fehler: Stand neu gelesen, nichts geraten")
            axe(s, "Hilfreich")
            ctx.close()

            print("Lerngruppen · verlassen")
            ctx, s = neue_seite("community/gruppe/" + G1, vorher=f"window.FAKE.db.mitglied.push({{ gruppe_id: '{G1}', nutzer_id: window.FAKE.ICH, rolle: 'mitglied' }});")
            s.get_by_role("button", name="Gruppe verlassen").click()
            s.locator("dialog[open]").get_by_role("button", name="Gruppe verlassen").click()
            warte(s, "Du hast die Gruppe „Offene Lerngruppe“ verlassen.")
            pruefe(ev(s, "location.hash") == "#community/gruppen", "Zurück in der Übersicht")
            ctx.close()

            print("Team · Aufgabe für alle")
            ctx, s = neue_seite("community/gruppen", team=True)
            s.get_by_role("link", name="Aufgabe für alle stellen").click()
            s.get_by_label("Titel").wait_for()
            s.get_by_label("Titel").fill("Klassenaufgabe: Lernfeld 2 wiederholen")
            s.get_by_role("button", name="Aufgabe stellen").click()
            warte(s, "Die Wochenaufgabe wurde gestellt.")
            pruefe(ev(s, "FAKE.db.wochenaufgabe[0].gruppe_id") is None, "Aufgabe für alle ohne Gruppe")
            ctx.close()
            ctx, s = neue_seite("community/aufgabe-neu")
            warte(s, "Dieser Inhalt ist für dich nicht verfügbar.")
            pruefe(True, "Ohne Team: Aufgabe für alle nicht erreichbar")
            ctx.close()

            browser.close()

    print()
    print(f"{'Alles bestanden' if not basis.fehler else str(len(basis.fehler)) + ' Fehler'}")
    return 1 if basis.fehler else 0


if __name__ == "__main__":
    sys.exit(main())
