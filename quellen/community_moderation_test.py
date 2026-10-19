#!/usr/bin/env python3
"""
AzubiPass · Spec 06 Melden und Moderation – Oberfläche

    AXE_PFAD=…/axe.min.js python3 community_moderation_test.py [--bilder ORDNER]

Alle Fälle sind [mock]: community.js, community-ansicht.js,
community-beitraege.js und community-moderation.js laufen im Browser gegen
die nachgebildete Supabase-Schnittstelle aus community_korrekturen_test.py,
erweitert um die RPCs aus Spec 06 (FAKE.logik). Die Serverseite derselben
Regeln prüfen supabase/tests/moderation_test.sql (Datenbank, echt) und
supabase/tests/lokal/konkurrenz.py (zwei Verbindungen, lokal).
Keine Zugangsdaten nötig. Rückgabewert 1 bei einem Fehler.
"""

import functools
import socketserver
import sys
import threading

from playwright.sync_api import sync_playwright

import community_korrekturen_test as basis

pruefe = basis.pruefe

B1 = "00000000-0000-4000-a000-0000000000b1"   # Bens Beitrag
B2 = "00000000-0000-4000-a000-0000000000b2"   # Annas ausgeblendeter Beitrag
A1 = "00000000-0000-4000-a000-0000000000a1"   # Bens Antwort
A2 = "00000000-0000-4000-a000-0000000000a2"   # Teamkorrektur zu A1
A3 = "00000000-0000-4000-a000-0000000000a3"   # Annas ausgeblendete Antwort
M1 = "00000000-0000-4000-a000-0000000000e1"
X1 = "00000000-0000-4000-a000-0000000000c1"   # Ausblendung von B2

# Spec-06-Logik der nachgebildeten Datenbank. Rechte: F.rolle steuert, ob die
# Team-RPCs APR01 liefern – wie mod_team_pruefen.
MOD_JS = r"""
(() => {
  const F = window.FAKE, jetzt = () => new Date().toISOString();
  const B1 = "%B1%", B2 = "%B2%", A1 = "%A1%", A2 = "%A2%", A3 = "%A3%", M1 = "%M1%", X1 = "%X1%";
  F.rolle = "azubi";
  F.db.beitrag.push(
    { id: B1, autor_id: F.BEN, art: "frage", titel: "Wie buche ich Skonto?", text: "Bitte mit Beispiel.", erstellt_am: "2026-10-14T08:00:00Z", mod_version: 3 },
    { id: B2, autor_id: F.ICH, art: "tipp", titel: "Mein ausgeblendeter Tipp", text: "Text", versteckt: true, erstellt_am: "2026-10-13T08:00:00Z" });
  F.db.antwort.push(
    { id: A1, beitrag_id: B1, autor_id: F.BEN, text: "Skonto ist ein Rabatt.", beste: false, versteckt: false, erstellt_am: "2026-10-14T09:00:00Z" },
    { id: A2, beitrag_id: B1, autor_id: "00000000-0000-4000-a000-00000000c0de", text: "Skonto ist ein Preisnachlass bei schneller Zahlung.",
      beste: false, versteckt: false, team_korrektur: true, bezug_antwort_id: A1, erstellt_am: "2026-10-14T10:00:00Z" },
    { id: A3, beitrag_id: B1, autor_id: F.ICH, text: "Meine ausgeblendete Antwort", beste: false, versteckt: true, erstellt_am: "2026-10-14T11:00:00Z" });
  F.db.meldung = [];
  F.db.entscheidung = [];
  F.db.pruefanfrage = [];
  F.db.ausblendung = { id: X1, aktiv: true, vorlaeufig: false, begruendung: "Dein Inhalt enthält eine Telefonnummer.",
                       zeit: "2026-10-14T12:00:00Z", anfrage_moeglich: true, pruefanfrage: null };
  const team = () => F.rolle === "team" ? null : F.fehler("APR01", "Dieser Bereich ist für dich nicht verfügbar.");
  const fall = () => ({ art: "beitrag", ziel: B1, version: 3, versteckt: false,
    beitrag: { id: B1, titel: "Wie buche ich Skonto?", text: "Bitte mit Beispiel.", erstellt_am: "2026-10-14T08:00:00Z",
               versteckt: false, autor: { anzeigename: "Ben", rolle: "azubi", lehrjahr: 2 } },
    antwort: null,
    meldungen: [{ id: M1, grund: "persoenliche_daten", hinweis: "Telefonnummer im Text", erstellt_am: "2026-10-14T13:00:00Z" }],
    ausblendung: null, pruefanfrage: null, verlauf: [] });
  Object.assign(F.logik, {
    meldung_senden: (a) => {
      const da = F.db.meldung.find(m => m.art === a.p_art && m.ziel === a.p_ziel);
      if (da) return F.ok([{ meldung_id: da.id, status: "offen", neu: false, gleich: da.grund === a.p_grund }]);
      const m = { id: crypto.randomUUID(), art: a.p_art, ziel: a.p_ziel, grund: a.p_grund, hinweis: a.p_hinweis, erstellt_am: jetzt() };
      F.db.meldung.push(m);
      return F.ok([{ meldung_id: m.id, status: "offen", neu: true, gleich: false }]);
    },
    meldung_status: (a) => {
      const da = F.db.meldung.find(m => m.art === a.p_art && m.ziel === a.p_ziel);
      return F.ok(da ? [{ meldung_id: da.id, status: "offen" }] : []);
    },
    meine_meldungen: () => F.ok(F.db.meldung.map(m => ({ id: m.id, grund: m.grund, status: "offen", erstellt_am: m.erstellt_am,
                                                        art: m.art, ziel_id: m.ziel, titel: "Wie buche ich Skonto?" }))),
    moderation_zaehler: () => team() || F.ok(2),
    moderation_faelle: () => team() || F.ok([
      { art: "beitrag", ziel: B1, stufe: 1, aeltester: "2026-10-14T13:00:00Z", meldungen: 1, pruefanfrage: false,
        versteckt: false, titel: "Wie buche ich Skonto?", antwort_auszug: null, autor: "Ben" },
      { art: "antwort", ziel: A1, stufe: 2, aeltester: "2026-10-14T14:00:00Z", meldungen: 2, pruefanfrage: false,
        versteckt: false, titel: "Wie buche ich Skonto?", antwort_auszug: "Skonto ist ein Rabatt.", autor: "Ben" }]),
    moderation_fall: () => team() || F.ok(fall()),
    moderation_vorlagen: () => team() || F.ok([
      { id: "v1", gruppe: "ausblendung", kategorie: "persoenliche_daten", titel: "Persönliche Daten",
        text: "Dein Inhalt wurde ausgeblendet, weil er persönliche Daten enthält. Die betroffene Stelle: …" },
      { id: "v2", gruppe: "ausblendung", kategorie: "spam", titel: "Spam", text: "Dein Inhalt wurde als Spam ausgeblendet." }]),
    moderation_entscheiden: (a) => {
      const r = team(); if (r) return r;
      const da = F.db.entscheidung.find(e => e.entscheidung_id === a.p_id);
      if (da) return F.ok(Object.assign({}, da, { wiederholung: true }));
      const e = { entscheidung_id: a.p_id, aktion: a.p_aktion, versteckt: a.p_aktion === "ausblenden", wiederholung: false };
      F.db.entscheidung.push(e);
      return F.ok(e);
    },
    entscheidung_status: (a) => F.ok(F.db.entscheidung.find(e => e.entscheidung_id === a.p_id) || null),
    eigene_ausblendungen: () => F.ok([{ art: "beitrag", id: B2, titel: "Mein ausgeblendeter Tipp", antwort_auszug: null,
                                         zustand: "ausgeblendet", ausblendung: F.db.ausblendung }]),
    eigener_inhalt: (a) => F.ok(a.p_id === B2 ? { titel: "Mein ausgeblendeter Tipp", text: "Text", beitrag_art: "tipp",
        erstellt_am: "2026-10-13T08:00:00Z", versteckt: true, eltern_ausgeblendet: false, ausblendung: F.db.ausblendung, fruehere: null } : null),
    pruefanfrage_senden: (a) => {
      const da = F.db.pruefanfrage.find(q => q.id === a.p_id);
      if (da) return F.ok(Object.assign({ wiederholung: true }, da));
      if (F.db.pruefanfrage.length) return F.fehler("APD01", "Für diese Ausblendung wurde bereits eine Prüfung angefragt.");
      const q = { id: a.p_id, status: "offen", ergebnis: null, ergebnis_begruendung: null, erstellt_am: jetzt() };
      F.db.pruefanfrage.push(q);
      F.db.ausblendung = Object.assign({}, F.db.ausblendung, { anfrage_moeglich: false, pruefanfrage: q });
      return F.ok(Object.assign({ wiederholung: false }, q));
    },
    pruefanfrage_status: () => F.ok(F.db.pruefanfrage[0] || null)
  });
  F.teamwerden = () => { F.rolle = "team"; F.db.profil[0].rolle = "team"; };
})();
""".replace("%B1%", B1).replace("%B2%", B2).replace("%A1%", A1).replace("%A2%", A2).replace("%A3%", A3) \
   .replace("%M1%", M1).replace("%X1%", X1)

TEAM_JS = "window.FAKE.teamwerden();"


def main():
    handler = functools.partial(basis.Stiller, directory=str(basis.DOCS))
    with socketserver.TCPServer(("127.0.0.1", 0), handler) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        url = f"http://127.0.0.1:{srv.server_address[1]}/"
        with sync_playwright() as p:
            browser = p.chromium.launch()

            def neue_seite(ziel, team=False):
                ctx = browser.new_context(viewport={"width": 390, "height": 844},
                                          service_workers="block", locale="de-DE")
                ctx.add_init_script(basis.FAKE_JS)
                ctx.add_init_script(MOD_JS)
                if team:
                    ctx.add_init_script(TEAM_JS)
                s = ctx.new_page()
                s.goto(url + "app.html#community/" + ziel)
                s.wait_for_function("window.AP && AP.communityModeration")
                return ctx, s

            def ev(s, js, arg=None):
                return s.evaluate(js, arg)

            def warte(s, text, timeout=5000):
                s.get_by_text(text, exact=False).first.wait_for(timeout=timeout)

            def axe(s, name, wurzel="#community"):
                if basis.BILDER:
                    basis.BILDER.mkdir(parents=True, exist_ok=True)
                    datei = name.lower().replace(" ", "-").replace("ä", "ae").replace("ö", "oe").replace("ü", "ue")
                    s.screenshot(path=str(basis.BILDER / f"{datei}.png"), full_page=True)
                if not basis.AXE.exists():
                    print(f"  ---- [mock] axe übersprungen ({name}): AXE_PFAD fehlt")
                    return
                s.add_script_tag(path=str(basis.AXE))
                v = s.evaluate("""async (w) => (await axe.run(document.querySelector(w),
                    { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] })).violations.map(x => x.id + ':' + x.nodes.length)""", wurzel)
                pruefe(not v, f"axe ohne WCAG-Verstöße: {name}", ", ".join(v))

            def warte_bis(s, js, text, ms=4000):
                # Begrenzte Wartezeit: Bleibt der Zustand aus, ist das ein Befund, kein Abbruch.
                try:
                    s.wait_for_function(js, timeout=ms)
                    return True
                except Exception:
                    pruefe(False, text + " (Zustand nicht erreicht)")
                    return False

            def dialog(s):
                return s.locator("dialog[open]").last

            print("C13 · Beitrag melden")
            ctx, s = neue_seite("beitrag/" + B1)
            warte(s, "Skonto ist ein Preisnachlass")
            k = s.get_by_role("button", name="Beitrag „Wie buche ich Skonto?“ melden")
            pruefe(k.count() == 1, "Fremder Beitrag hat „Beitrag melden“ mit Kontext im Namen")
            pruefe(s.get_by_role("button", name="Antwort von Ben melden").count() == 1, "Antwort trägt „Antwort von Ben melden“")
            pruefe(s.get_by_role("button", name="Inhalt ausblenden").count() == 0, "Ohne Teamrolle kein „Inhalt ausblenden“")
            pruefe(s.get_by_text("Team · Fachliche Korrektur").count() == 1, "Teamkorrektur gekennzeichnet")
            pruefe(s.get_by_text("Bezieht sich auf die Antwort von Ben.").count() == 1, "Bezug auf sichtbare Antwort genannt")
            meta = ev(s, f"document.querySelector('li[data-id=\"{A2}\"] .cm-zeile-meta').textContent")
            pruefe(meta.startswith("Team ·"), "Teamkorrektur nennt öffentlich nur „Team“", meta)
            pruefe(s.get_by_text("Deine Antwort ist ausgeblendet.").count() == 1, "Eigene ausgeblendete Antwort als Platzhalter")
            pruefe(s.get_by_text("Meine ausgeblendete Antwort").count() == 0, "Text der ausgeblendeten Antwort steht nicht in der Liste")
            pruefe(s.get_by_text("3 Antworten").count() == 0 and s.get_by_text("2 Antworten").count() == 1,
                   "Antwortzahl zählt nur sichtbare Antworten")
            k.click()
            d = dialog(s)
            d.get_by_role("heading", name="Inhalt melden").wait_for()
            pruefe(ev(s, "document.activeElement.textContent") == "Inhalt melden", "Fokus auf dem Dialogtitel")
            d.get_by_role("button", name="Meldung senden").click()
            warte(s, "Wähle einen Grund für deine Meldung.")
            pruefe(not ev(s, "FAKE.aufrufe.meldung_senden"), "Ohne Grund wird nichts gesendet")
            axe(s, "C13 Meldedialog mit Fehler", "dialog[open]")
            d.get_by_label("Persönliche Daten").check()
            d.locator("textarea").fill("Telefonnummer im zweiten Absatz")
            d.get_by_role("button", name="Meldung senden").click()
            warte(s, "Danke. Das Team prüft deine Meldung.")
            pruefe(s.locator("dialog[open]").count() == 0, "Dialog schließt nach Bestätigung")
            a = ev(s, "FAKE.aufrufe.meldung_senden")
            pruefe(a and a[0]["p_grund"] == "persoenliche_daten" and a[0]["p_art"] == "beitrag" and a[0]["p_ziel"] == B1,
                   "Gesendet: Art, Ziel, Grund")
            pruefe(ev(s, "document.activeElement.textContent") == "Danke. Das Team prüft deine Meldung.",
                   "Rückmeldung am Ursprung bekommt den Fokus")
            k.click()
            dialog(s).get_by_label("Spam").check()
            dialog(s).get_by_role("button", name="Meldung senden").click()
            warte(s, "Du hast diesen Inhalt bereits gemeldet. Das Team prüft deine Meldung.")
            pruefe(ev(s, "FAKE.db.meldung.length") == 1, "Zweite Meldung legt nichts an")
            ctx.close()

            print("C13 · unklarer Ausgang und sichere Ablehnungen")
            ctx, s = neue_seite("beitrag/" + B1)
            warte(s, "Skonto ist ein Preisnachlass")
            ev(s, "FAKE.plan.meldung_senden = ['spaet']")
            s.get_by_role("button", name="Antwort von Ben melden").click()
            d = dialog(s)
            d.get_by_label("Fachlich falsch").check()
            d.locator("textarea").fill("Rabatt ist ungenau")
            d.get_by_role("button", name="Meldung senden").click()
            warte(s, "Wir konnten nicht prüfen, ob deine Meldung gesendet wurde.")
            pruefe(d.get_by_label("Spam").is_disabled() and d.locator("textarea").evaluate("e => e.readOnly"),
                   "Bei unklarem Ausgang sind Grund und Hinweis gesperrt")
            d.get_by_role("button", name="Status prüfen").click()
            warte(s, "Die Meldung wurde noch nicht gefunden. Der Ausgang ist weiterhin unklar.")
            axe(s, "C13 Meldung unklar", "dialog[open]")
            ev(s, "FAKE.spaetAusfuehren()")
            d.get_by_role("button", name="Erneut senden").click()
            warte(s, "Danke. Das Team prüft deine Meldung.")
            a = ev(s, "FAKE.aufrufe.meldung_senden")
            pruefe(len(a) == 2 and a[0] == a[1], "Erneut senden schickt denselben festen Versandstand")
            pruefe(ev(s, "FAKE.db.meldung.length") == 1, "Verspätetes Original + Wiederholung = eine Meldung")
            ctx.close()
            for code, text in (("APB01", "Du hast gerade viele Meldungen gesendet. Versuch es später erneut."),
                               ("APZ01", "Dieser Inhalt ist für dich nicht verfügbar.")):
                ctx, s = neue_seite("beitrag/" + B1)
                warte(s, "Skonto ist ein Preisnachlass")
                ev(s, f"FAKE.plan.meldung_senden = [{{ code: '{code}', status: 400 }}]")
                s.get_by_role("button", name="Antwort von Ben melden").click()
                dialog(s).get_by_label("Spam").check()
                dialog(s).get_by_role("button", name="Meldung senden").click()
                warte(s, text)
                pruefe(s.get_by_text("Wir konnten nicht prüfen").count() == 0, f"{code}: sichere Ablehnung, kein „unklar“")
                ctx.close()

            print("Meine Meldungen und eigene ausgeblendete Inhalte")
            ctx, s = neue_seite("profil")
            s.get_by_role("link", name="Meine Meldungen").wait_for()
            pruefe(s.locator("a[href='#community/moderation']").count() == 0, "Ohne Teamrolle kein Moderationszähler im Profil")
            ev(s, f"FAKE.db.meldung.push({{ id: '{M1}', art: 'beitrag', ziel: '{B1}', grund: 'spam', erstellt_am: '2026-10-14T13:00:00Z' }})")
            s.get_by_role("link", name="Meine Meldungen").click()
            warte(s, "Gemeldet am 14.10.2026")
            pruefe(s.get_by_text("Offen", exact=True).count() == 1, "Status als Text „Offen“")
            axe(s, "Meine Meldungen")
            s.evaluate("location.hash = '#community/eigene-ausblendungen'")
            s.get_by_role("link", name="Mein ausgeblendeter Tipp").click()
            warte(s, "Dein Inhalt enthält eine Telefonnummer.")
            pruefe(s.get_by_text("Dieser Inhalt ist für andere nicht sichtbar.").count() == 1, "Status klar benannt")
            s.get_by_role("button", name="Erneute Prüfung anfragen").click()
            s.get_by_role("button", name="Prüfanfrage senden").click()
            warte(s, "Gib eine kurze Begründung ein.")
            pruefe(not ev(s, "FAKE.aufrufe.pruefanfrage_senden"), "Leere Begründung wird nicht gesendet")
            axe(s, "Eigener Inhalt mit Prüfanfrage")
            s.get_by_label("Begründung").fill("Die Nummer ist die öffentliche Nummer der Berufsschule.")
            ev(s, "FAKE.plan.pruefanfrage_senden = ['verlieren']")
            s.get_by_role("button", name="Prüfanfrage senden").click()
            warte(s, "Wir konnten nicht prüfen, ob deine Prüfanfrage gesendet wurde.")
            s.get_by_role("button", name="Status prüfen").click()
            warte(s, "Deine Prüfanfrage wurde gesendet.")
            warte(s, "Prüfanfrage offen")
            pruefe(s.get_by_role("button", name="Erneute Prüfung anfragen").count() == 0,
                   "Nach der Anfrage kein zweites Anfragerecht")
            pruefe(ev(s, "FAKE.db.pruefanfrage.length") == 1, "Genau eine Prüfanfrage")
            ctx.close()

            print("Eigener ausgeblendeter Beitrag im Detail")
            ctx, s = neue_seite("beitrag/" + B2)
            warte(s, "Dein Inhalt enthält eine Telefonnummer.")
            pruefe(s.get_by_text("Dieser Beitrag ist ausgeblendet.").count() == 1, "Hinweis bleibt")
            pruefe(s.get_by_role("button", name="Erneute Prüfung anfragen").count() == 1, "Prüfanfrage direkt im Detail")
            ctx.close()

            print("C14 · Rechte ohne Teamrolle")
            ctx, s = neue_seite("moderation")
            warte(s, "Dieser Bereich ist für dich nicht verfügbar.")
            pruefe(s.locator(".cm-beitrag").count() == 0, "Keine Fälle ohne Teamrecht")
            ctx.close()

            print("C14 · Zähler")
            ctx, s = neue_seite("profil", team=True)
            warte(s, "Moderation · 2 offene Fälle")
            pruefe(True, "Zähler „Moderation · 2 offene Fälle“ im Profil")
            ctx.close()
            ctx, s = neue_seite("profil", team=True)
            ev(s, "FAKE.plan.moderation_zaehler = [{ code: '', status: 503 }]")
            s.evaluate("location.hash = '#community'; ")
            warte(s, "Der Moderationsstatus konnte nicht geladen werden.")
            pruefe(s.get_by_text("0 offene Fälle").count() == 0, "Ladefehler zeigt keine erfundene 0")
            ctx.close()

            print("C14 · Fälle und Entscheidung „Inhalt ausblenden“")
            ctx, s = neue_seite("moderation", team=True)
            warte(s, "Antwort zu „Wie buche ich Skonto?“")
            reihen = ev(s, "[...document.querySelectorAll('.cm-mod-liste > li')].map(l => l.textContent)")
            pruefe(len(reihen) == 2 and "Potentiell schädlich" in reihen[0], "Schädliche Fälle zuerst, als Text markiert")
            pruefe(s.get_by_text("Telefonnummer").count() == 0 and "Anna" not in "".join(reihen), "Liste nennt keine Meldenden")
            axe(s, "C14 Offene Fälle")
            s.get_by_role("link", name="Prüfen: Wie buche ich Skonto?").click()
            warte(s, "1 offene Meldung")
            pruefe(s.get_by_text("Telefonnummer im Text").count() == 1, "Hinweis der Meldung sichtbar, ohne Namen")
            s.get_by_role("button", name="Inhalt ausblenden").first.click()
            form = s.locator("form.cm-mod-form")
            form.wait_for()
            form.get_by_role("button", name="Inhalt ausblenden").click()
            warte(s, "Wähle eine Vorlage für die Begründung.")
            form.get_by_label("Vorlage").select_option(label="Persönliche Daten")
            pruefe("persönliche Daten" in form.locator("textarea").first.input_value(),
                   "Vorlage füllt die Begründung")
            pruefe("Die betroffene Stelle: …" in s.locator(".cm-vorschau").text_content(), "Vorschau „Das sieht die betroffene Person“")
            form.get_by_role("button", name="Inhalt ausblenden").click()
            warte(s, "Ersetze „…“ durch die konkrete Stelle.")
            axe(s, "C14 Entscheidung mit Fehler")
            form.locator("textarea").first.fill(
                "Dein Inhalt wurde ausgeblendet, weil er persönliche Daten enthält. Die betroffene Stelle: zweiter Absatz.")
            form.get_by_label("Vorlage").select_option(label="Spam")
            dialog(s).get_by_role("heading", name="Deine Begründung ersetzen?").wait_for()
            dialog(s).get_by_role("button", name="Abbrechen").click()
            # Abgeschlossener Zustandswechsel: Der close-Handler entfernt den Dialog,
            # stellt die Vorlage zurück und gibt erst danach den Fokus an die Auswahl.
            s.wait_for_function("!document.querySelector('dialog') && "
                                "document.activeElement === document.querySelector('form.cm-mod-form select')")
            pruefe(form.get_by_label("Vorlage").input_value() == "v1" and "zweiter Absatz" in
                   form.locator("textarea").first.input_value(),
                   "Abbrechen behält eigenen Text und bisherige Vorlage",
                   [form.get_by_label("Vorlage").input_value(), form.locator("textarea").first.input_value()[-30:]])
            ev(s, "FAKE.plan.moderation_entscheiden = ['spaet']")
            form.get_by_role("button", name="Inhalt ausblenden").click()
            dialog(s).get_by_role("heading", name="Diesen Inhalt ausblenden?").wait_for()
            dialog(s).get_by_role("button", name="Inhalt ausblenden").click()
            warte(s, "Wir konnten nicht prüfen, ob die Entscheidung gespeichert wurde.")
            pruefe(form.locator("textarea").first.evaluate("e => e.readOnly"), "Unklar: Eingaben gesperrt")
            s.get_by_role("button", name="Status prüfen").click()
            warte(s, "Die Entscheidung wurde noch nicht gefunden. Der Ausgang ist weiterhin unklar.")
            ev(s, "FAKE.spaetAusfuehren()")
            s.get_by_role("button", name="Status prüfen").click()
            warte(s, "Der Inhalt wurde ausgeblendet.")
            a = ev(s, "FAKE.aufrufe.moderation_entscheiden")[0]
            pruefe(a["p_aktion"] == "ausblenden" and a["p_version"] == 3 and a["p_meldungen"] == [M1]
                   and a["p_kategorie"] == "persoenliche_daten" and "zweiter Absatz" in a["p_autor_text"],
                   "Entscheidung mit Version, gesehenen Meldungen, Kategorie und Begründung")
            pruefe(ev(s, "location.hash") == "#community/moderation", "Zurück in der Liste")
            ctx.close()

            print("C14 · Fall hat sich geändert (APF01)")
            ctx, s = neue_seite("moderation/fall/beitrag/" + B1, team=True)
            warte(s, "1 offene Meldung")
            s.get_by_role("button", name="Meldungen abschließen").click()
            form = s.locator("form.cm-mod-form")
            form.get_by_label("Interne Begründung").fill("Kein Verstoß erkennbar.")
            ev(s, "FAKE.plan.moderation_entscheiden = [{ code: 'APF01', status: 400 }]")
            form.get_by_role("button", name="Meldungen abschließen").click()
            warte(s, "Der Fall hat sich geändert. Prüfe die aktuellen Meldungen erneut.")
            pruefe(s.get_by_role("button", name="Fall neu laden").count() == 1, "Weg: Fall neu laden")
            pruefe(s.get_by_text("Wir konnten nicht prüfen").count() == 0, "APF01 ist kein „unklar“")
            s.get_by_role("button", name="Fall neu laden").click()
            warte(s, "1 offene Meldung")
            pruefe(ev(s, "FAKE.aufrufe.moderation_fall.length") == 2, "Fall wurde frisch geladen")
            ctx.close()

            print("C14 · Direktweg vom Beitrag (D13)")
            ctx, s = neue_seite("beitrag/" + B1, team=True)
            warte(s, "Skonto ist ein Preisnachlass")
            s.get_by_role("button", name="Beitrag „Wie buche ich Skonto?“ ausblenden").click()
            s.locator("form.cm-mod-form").wait_for()
            pruefe(ev(s, "location.hash") == "#community/moderation/fall/beitrag/" + B1 and
                   s.locator("form.cm-mod-form h3").text_content() == "Inhalt ausblenden",
                   "Fallansicht öffnet direkt das Formular „Inhalt ausblenden“")
            ctx.close()


            # ------------------------------------------------------------ R04
            HINWEIS = "Privater Hinweis von Anna"
            spuren_js = f"""() => [...document.querySelectorAll('textarea, input')].some(x => (x.value || '').includes('{HINWEIS}'))
                           || document.body.textContent.includes('{HINWEIS}')"""
            for zustand in ("offen", "sendet", "unklar"):
                for weg in ("abmelden", "wechsel"):
                    print(f"R04 · Meldedialog {zustand} × {weg}")
                    ctx, s = neue_seite("beitrag/" + B1)
                    warte(s, "Skonto ist ein Preisnachlass")
                    s.get_by_role("button", name="Antwort von Ben melden").click()
                    d = dialog(s)
                    d.get_by_label("Spam").check()
                    d.locator("textarea").fill(HINWEIS)
                    if zustand == "sendet":
                        ev(s, "FAKE.plan.meldung_senden = ['halten']")
                        d.get_by_role("button", name="Meldung senden").click()
                        s.wait_for_function("(FAKE.gehalten.meldung_senden || []).length === 1")
                    elif zustand == "unklar":
                        ev(s, "FAKE.plan.meldung_senden = ['spaet']")
                        d.get_by_role("button", name="Meldung senden").click()
                        warte(s, "Wir konnten nicht prüfen, ob deine Meldung gesendet wurde.")
                    vorher = len(ev(s, "FAKE.aufrufe.meldung_senden || []"))
                    ev(s, "FAKE.anmelden(null)" if weg == "abmelden" else "FAKE.anmelden(FAKE.BEN_KONTO)")
                    geschlossen = warte_bis(s, "!document.querySelector('dialog')", f"{zustand}/{weg}: Dialog geschlossen")
                    pruefe(not ev(s, spuren_js), f"{zustand}/{weg}: Dialog und alter Hinweis entfernt")
                    if not geschlossen:
                        # Gegenprobe-Pfad: verbliebenen Dialog wie im Review erneut absenden.
                        knopf = s.locator("dialog[open] button[type=submit]").last
                        if knopf.count() and knopf.is_enabled():
                            knopf.click()
                            s.wait_for_timeout(300)
                    # Späte Antwort des alten Versands darf nichts mehr anzeigen.
                    if zustand == "sendet":
                        ev(s, "FAKE.freigeben('meldung_senden')")
                    if zustand == "unklar":
                        ev(s, "FAKE.spaetAusfuehren()")
                    s.wait_for_timeout(200)
                    pruefe(s.get_by_text("Danke. Das Team prüft deine Meldung.").count() == 0,
                           f"{zustand}/{weg}: kein verspäteter Erfolg im neuen Kontext")
                    konten = ev(s, "FAKE.konten.meldung_senden || []")
                    pruefe(len(konten) == vorher and all(k == ev(s, "FAKE.ICH") for k in konten),
                           f"{zustand}/{weg}: kein Versand aus dem alten Entwurf als neues Konto", konten)
                    if weg == "wechsel":
                        # Neues Konto hat eine frische Ansicht; der alte Entwurf taucht nicht wieder auf.
                        s.wait_for_function("document.querySelector('#community h1')")
                        pruefe(not ev(s, spuren_js), f"{zustand}/{weg}: neues Konto sieht keinen alten Entwurf")
                    ctx.close()

            print("R04 · Datenschicht bindet den Schreibaufruf an das Konto")
            ctx, s = neue_seite("beitrag/" + B1)
            warte(s, "Skonto ist ein Preisnachlass")
            ev(s, "FAKE.anmelden(FAKE.BEN_KONTO)")
            r = ev(s, f"""async () => {{ try {{ await AP.community.meldungSenden({{ art: 'beitrag', ziel: '{B1}', grund: 'spam',
                        hinweis: 'x', konto: FAKE.ICH }}); return 'gesendet'; }} catch (f) {{ return f.art; }} }}""")
            pruefe(r == "veraltet" and not ev(s, "FAKE.aufrufe.meldung_senden"),
                   "Aufruf für Anna, angemeldet ist Ben: nichts gesendet", r)
            ctx.close()

            print("R04 · Rückfragen im Moderationsfall bei Kontowechsel")
            ctx, s = neue_seite("moderation/fall/beitrag/" + B1, team=True)
            warte(s, "1 offene Meldung")
            s.get_by_role("button", name="Inhalt ausblenden").first.click()
            form = s.locator("form.cm-mod-form")
            form.get_by_label("Vorlage").select_option(label="Spam")
            form.locator("textarea").first.fill("Dein Inhalt wurde als Spam ausgeblendet. Eigener Zusatz.")
            form.get_by_role("button", name="Inhalt ausblenden").click()
            dialog(s).get_by_role("heading", name="Diesen Inhalt ausblenden?").wait_for()
            ev(s, "FAKE.anmelden(FAKE.BEN_KONTO)")
            warte_bis(s, "!document.querySelector('dialog')", "Bestätigungsfrage geschlossen")
            pruefe(not ev(s, "FAKE.aufrufe.moderation_entscheiden") and s.locator("form.cm-mod-form").count() == 0,
                   "Bestätigungsfrage verworfen, keine Entscheidung, kein altes Formular")
            ctx.close()
            ctx, s = neue_seite("moderation/fall/beitrag/" + B1, team=True)
            warte(s, "1 offene Meldung")
            s.get_by_role("button", name="Inhalt ausblenden").first.click()
            form = s.locator("form.cm-mod-form")
            form.get_by_label("Vorlage").select_option(label="Spam")
            form.locator("textarea").first.fill("Mein eigener Text")
            form.get_by_label("Vorlage").select_option(label="Persönliche Daten")
            dialog(s).get_by_role("heading", name="Deine Begründung ersetzen?").wait_for()
            ev(s, "FAKE.anmelden(null)")
            warte_bis(s, "!document.querySelector('dialog')", "Vorlagen-Rückfrage geschlossen")
            pruefe(s.get_by_text("Mein eigener Text").count() == 0 and s.locator("form.cm-mod-form").count() == 0,
                   "Vorlagen-Rückfrage samt Formular nach Abmeldung entfernt")
            ctx.close()

            print("R04 · Offline während des Meldedialogs")
            ctx, s = neue_seite("beitrag/" + B1)
            warte(s, "Skonto ist ein Preisnachlass")
            s.get_by_role("button", name="Antwort von Ben melden").click()
            dialog(s).locator("textarea").fill(HINWEIS)
            ctx.set_offline(True)
            warte_bis(s, "!document.querySelector('dialog')", "Offline: Dialog geschlossen")
            pruefe(not ev(s, spuren_js), "Offline: Dialog geschlossen, Hinweis nicht über der Offline-Ansicht")
            ctx.set_offline(False)
            ctx.close()

            # ------------------------------------------------------------ R05
            print("R05 · Ein Vorgang pro Fall: angehaltene Antwort")
            ctx, s = neue_seite("moderation/fall/beitrag/" + B1, team=True)
            warte(s, "1 offene Meldung")
            # Obere Fallaktionen (über die Überschrift gefunden, damit die Gegenprobe am alten Stand greift).
            oben = "(() => [...[...document.querySelectorAll('section.cm-mod-teil')].find(x => (x.querySelector('h3') || {}).textContent === 'Entscheidung').querySelectorAll('.cm-reihe button')])()"
            s.get_by_role("button", name="Fachliche Korrektur ergänzen").first.click()
            form = s.locator("form.cm-mod-form")
            form.get_by_label("Interne Begründung").fill("Präzisierung")
            form.get_by_label("Fachliche Korrektur").fill("Korrektur A")
            ev(s, "FAKE.plan.moderation_entscheiden = ['halten']")
            form.get_by_role("button", name="Fachliche Korrektur ergänzen").click()
            s.wait_for_function("(FAKE.gehalten.moderation_entscheiden || []).length === 1")
            gesperrt = ev(s, f"{oben}.map(b => b.disabled)")
            pruefe(gesperrt and all(gesperrt), "Während des Versands sind alle oberen Aktionen gesperrt", gesperrt)
            pruefe(s.get_by_text("Solange die Entscheidung gespeichert wird oder ihr Ergebnis unklar ist").is_visible(),
                   "Hinweis erklärt die Sperre")
            ev(s, f"""() => {oben}.forEach(b => {{ b.disabled = false; b.click(); }})""")
            pruefe(s.locator("form.cm-mod-form").count() == 1 and
                   s.locator("form.cm-mod-form textarea").last.input_value() == "Korrektur A",
                   "Auch erzwungene Klicks ersetzen das laufende Formular nicht")
            ev(s, "FAKE.freigeben('moderation_entscheiden')")
            warte_bis(s, "location.hash === '#community/moderation'", "Erfolg nach Freigabe")
            pruefe(len(ev(s, "FAKE.aufrufe.moderation_entscheiden")) == 1, "Genau ein Versand")
            ctx.close()

            print("R05 · Ein Vorgang pro Fall: unklares Ergebnis")
            ctx, s = neue_seite("moderation/fall/beitrag/" + B1, team=True)
            warte(s, "1 offene Meldung")
            s.get_by_role("button", name="Fachliche Korrektur ergänzen").first.click()
            form = s.locator("form.cm-mod-form")
            form.get_by_label("Interne Begründung").fill("Präzisierung")
            form.get_by_label("Fachliche Korrektur").fill("Korrektur A")
            ev(s, "FAKE.plan.moderation_entscheiden = [{ code: '', status: 503 }]")
            form.get_by_role("button", name="Fachliche Korrektur ergänzen").click()
            warte(s, "Wir konnten nicht prüfen, ob die Entscheidung gespeichert wurde.")
            namen = ev(s, f"{oben}.map(b => b.textContent)")
            for n in namen:
                ev(s, f"""() => {{ const b = {oben}.find(x => x.textContent === {n!r});
                                  b.disabled = false; b.click(); }}""")
            pruefe(s.locator("form.cm-mod-form").count() == 1 and
                   s.get_by_role("button", name="Status prüfen").count() == 1 and
                   s.locator("form.cm-mod-form textarea").last.input_value() == "Korrektur A",
                   f"Alle {len(namen)} oberen Aktionen lassen Klärleiste und Versandstand stehen", namen)
            s.get_by_role("button", name="Erneut senden").click()
            warte(s, "Die Teamkorrektur wurde veröffentlicht.")
            ids = [a["p_id"] for a in ev(s, "FAKE.aufrufe.moderation_entscheiden")]
            pruefe(len(ids) == 2 and ids[0] == ids[1], "Erneut senden: dieselbe Kennung, kein zweiter Vorgang", ids)
            ctx.close()

            print("R05 · Nach bestätigtem „verworfen“ neue Kennung erlaubt")
            ctx, s = neue_seite("moderation/fall/beitrag/" + B1, team=True)
            warte(s, "1 offene Meldung")
            s.get_by_role("button", name="Fachliche Korrektur ergänzen").first.click()
            form = s.locator("form.cm-mod-form")
            form.get_by_label("Interne Begründung").fill("Präzisierung")
            form.get_by_label("Fachliche Korrektur").fill("Korrektur A")
            ev(s, "FAKE.plan.moderation_entscheiden = [{ code: '', status: 503 }]")
            form.get_by_role("button", name="Fachliche Korrektur ergänzen").click()
            warte(s, "Wir konnten nicht prüfen, ob die Entscheidung gespeichert wurde.")
            s.get_by_role("button", name="Eingaben ändern").click()
            warte(s, "Die Entscheidung wurde nicht gespeichert. Du kannst deine Eingaben jetzt ändern.")
            k = ev(s, "FAKE.aufrufe.vorgang_klaeren")
            pruefe(k and k[0]["p_art"] == "entscheidung" and k[0]["p_vorgang"] == ev(s, "FAKE.aufrufe.moderation_entscheiden[0].p_id"),
                   "Klärung mit der Kennung des offenen Vorgangs")
            gesperrt = ev(s, f"{oben}.map(b => b.disabled)")
            pruefe(not any(gesperrt), "Nach „verworfen“ sind die Aktionen wieder frei")
            form.get_by_label("Fachliche Korrektur").fill("Korrektur B")
            form.get_by_role("button", name="Fachliche Korrektur ergänzen").click()
            warte(s, "Die Teamkorrektur wurde veröffentlicht.")
            a = ev(s, "FAKE.aufrufe.moderation_entscheiden")
            pruefe(a[0]["p_id"] != a[1]["p_id"] and a[1]["p_korrektur"] == "Korrektur B",
                   "Geänderte Eingaben erst nach Verwerfen mit neuer Kennung")
            ctx.close()

            print("R05 · Ungesendete Eingaben gehen beim Aktionswechsel nicht verloren")
            ctx, s = neue_seite("moderation/fall/beitrag/" + B1, team=True)
            warte(s, "1 offene Meldung")
            s.get_by_role("button", name="Fachliche Korrektur ergänzen").first.click()
            s.locator("form.cm-mod-form").get_by_label("Fachliche Korrektur").fill("Ungesendeter Entwurf")
            s.get_by_role("button", name="Inhalt ausblenden").first.click()
            if warte_bis(s, "!!document.querySelector('dialog[open]')", "Aktionswechsel fragt vor dem Verwerfen"):
                dialog(s).get_by_role("button", name="Weiter schreiben").click()
                s.wait_for_function("!document.querySelector('dialog')")
            pruefe(s.locator("form.cm-mod-form").get_by_label("Fachliche Korrektur").input_value() == "Ungesendeter Entwurf",
                   "„Weiter schreiben“ behält den Entwurf")
            s.locator("form.cm-mod-form").get_by_role("button", name="Abbrechen").click()
            if warte_bis(s, "!!document.querySelector('dialog[open]')", "Abbrechen mit Eingaben fragt vor dem Verwerfen"):
                dialog(s).get_by_role("button", name="Weiter schreiben").click()
                s.wait_for_function("!document.querySelector('dialog')")
            pruefe(s.locator("form.cm-mod-form").count() == 1, "Abbrechen mit Eingaben fragt vorher")
            if s.locator("form.cm-mod-form").count() == 0:
                s.get_by_role("button", name="Fachliche Korrektur ergänzen").first.click()
                s.locator("form.cm-mod-form").get_by_label("Fachliche Korrektur").fill("Ungesendeter Entwurf")
            s.get_by_role("button", name="Inhalt ausblenden").first.click()
            if warte_bis(s, "!!document.querySelector('dialog[open]')", "Wechsel fragt vor dem Verwerfen"):
                dialog(s).get_by_role("button", name="Eingaben verwerfen").click()
            s.wait_for_function("document.querySelector('form.cm-mod-form h3')?.textContent === 'Inhalt ausblenden'")
            pruefe(True, "Nach „Eingaben verwerfen“ öffnet die gewählte Aktion")
            axe(s, "R05 Fall mit Formular")
            ctx.close()


            # ------------------------------------------------------------ R04-Routenrest
            def melden_offen(s, zustand):
                warte(s, "Skonto ist ein Preisnachlass")
                s.get_by_role("button", name="Antwort von Ben melden").click()
                d = dialog(s)
                d.get_by_label("Spam").check()
                d.locator("textarea").fill(HINWEIS)
                if zustand == "sendet":
                    ev(s, "FAKE.plan.meldung_senden = ['halten']")
                    d.get_by_role("button", name="Meldung senden").click()
                    s.wait_for_function("(FAKE.gehalten.meldung_senden || []).length === 1")
                elif zustand == "unklar":
                    ev(s, "FAKE.plan.meldung_senden = ['spaet']")
                    d.get_by_role("button", name="Meldung senden").click()
                    warte(s, "Wir konnten nicht prüfen, ob deine Meldung gesendet wurde.")

            def nach_verlassen(s, text, bereich, zustand):
                warte_bis(s, f"document.documentElement.dataset.bereich === '{bereich}'", f"{text}: Bereich {bereich} sichtbar")
                warte_bis(s, "!document.querySelector('dialog')", f"{text}: kein Dialog über {bereich}")
                pruefe(not ev(s, spuren_js), f"{text}: alter Hinweis weg")
                vorher = len(ev(s, "FAKE.aufrufe.meldung_senden || []"))
                if zustand == "sendet":
                    ev(s, "FAKE.freigeben('meldung_senden')")
                if zustand == "unklar":
                    ev(s, "FAKE.spaetAusfuehren()")
                s.wait_for_timeout(200)
                pruefe(s.get_by_text("Danke. Das Team prüft deine Meldung.").count() == 0
                       and s.get_by_text("Du hast diesen Inhalt bereits gemeldet").count() == 0
                       and len(ev(s, "FAKE.aufrufe.meldung_senden || []")) == vorher
                       and not ev(s, "!!document.querySelector('dialog')"),
                       f"{text}: späte Antwort bleibt still, kein neuer Versand")

            for zustand in ("offen", "sendet", "unklar"):
                for ziel in ("heute", "lernen", "ueben", "ich"):
                    print(f"R04 · Community verlassen: Meldedialog {zustand} → #{ziel}")
                    ctx, s = neue_seite("beitrag/" + B1)
                    melden_offen(s, zustand)
                    ev(s, f"location.hash = '#{ziel}'")
                    nach_verlassen(s, f"{zustand}/#{ziel}", ziel, zustand)
                    ctx.close()

            for zustand in ("offen", "sendet", "unklar"):
                print(f"R04 · Zurück aus der Community: Meldedialog {zustand}")
                ctx, s = neue_seite("beitrag/" + B1)
                ev(s, "location.hash = '#heute'")
                s.wait_for_function("document.documentElement.dataset.bereich === 'heute'")
                ev(s, f"location.hash = '#community/beitrag/{B1}'")
                melden_offen(s, zustand)
                ev(s, "history.back()")
                nach_verlassen(s, f"Zurück/{zustand}", "heute", zustand)
                ctx.close()

                print(f"R04 · Vorwärts aus der Community: Meldedialog {zustand}")
                ctx, s = neue_seite("beitrag/" + B1)
                warte(s, "Skonto ist ein Preisnachlass")
                ev(s, "location.hash = '#lernen'")
                s.wait_for_function("document.documentElement.dataset.bereich === 'lernen'")
                ev(s, "history.back()")
                melden_offen(s, zustand)
                ev(s, "history.forward()")
                nach_verlassen(s, f"Vorwärts/{zustand}", "lernen", zustand)
                ctx.close()

            print("R04 · Community verlassen mit offener Bestätigungsfrage")
            ctx, s = neue_seite("moderation/fall/beitrag/" + B1, team=True)
            warte(s, "1 offene Meldung")
            s.get_by_role("button", name="Inhalt ausblenden").first.click()
            form = s.locator("form.cm-mod-form")
            form.get_by_label("Vorlage").select_option(label="Spam")
            form.get_by_role("button", name="Inhalt ausblenden").click()
            dialog(s).get_by_role("heading", name="Diesen Inhalt ausblenden?").wait_for()
            ev(s, "location.hash = '#ueben'")
            warte_bis(s, "!document.querySelector('dialog')", "Bestätigungsfrage nach #ueben entfernt")
            s.wait_for_timeout(200)
            pruefe(not ev(s, "FAKE.aufrufe.moderation_entscheiden") and ev(s, "document.documentElement.dataset.bereich") == "ueben",
                   "Keine Entscheidung ohne Bestätigung, Üben sichtbar")
            ctx.close()

            print("R04 · Community verlassen mit offener Verwerfen-Rückfrage")
            ctx, s = neue_seite("moderation/fall/beitrag/" + B1, team=True)
            warte(s, "1 offene Meldung")
            s.get_by_role("button", name="Fachliche Korrektur ergänzen").first.click()
            s.locator("form.cm-mod-form").get_by_label("Fachliche Korrektur").fill("Privater Entwurf im Fall")
            s.get_by_role("button", name="Inhalt ausblenden").first.click()
            dialog(s).get_by_role("button", name="Eingaben verwerfen").wait_for()
            ev(s, "location.hash = '#ich'")
            warte_bis(s, "!document.querySelector('dialog')", "Verwerfen-Rückfrage nach #ich entfernt")
            pruefe(ev(s, "document.documentElement.dataset.bereich") == "ich"
                   and not ev(s, "[...document.querySelectorAll('dialog')].length"),
                   "Ich sichtbar, keine Rückfrage darüber")
            ev(s, f"location.hash = '#community/moderation/fall/beitrag/{B1}'")
            warte(s, "1 offene Meldung")
            pruefe(s.locator("form.cm-mod-form").count() == 0, "Zurück in der Community: frische Fallansicht, kein Folgeformular")
            ctx.close()

            print("R04 · Rückfrage im Schreibformular beim Verlassen")
            ctx, s = neue_seite("schreiben")
            s.get_by_label("Titel").wait_for()
            s.get_by_label("Titel").fill("Entwurfstitel")
            s.get_by_role("button", name="Abbrechen").click()
            dialog(s).get_by_role("button", name="Eingaben verwerfen").wait_for()
            ev(s, "location.hash = '#lernen'")
            warte_bis(s, "!document.querySelector('dialog')", "Verwerfen-Rückfrage im Schreiben nach #lernen entfernt")
            ev(s, "location.hash = '#community/schreiben'")
            s.get_by_label("Titel").wait_for()
            pruefe(s.get_by_label("Titel").input_value() == "Entwurfstitel",
                   "Verwerfen lief nicht als Folgeaktion: Entwurf desselben Kontos bleibt erhalten")
            ctx.close()

            browser.close()

    print()
    print(f"{'Alles bestanden' if not basis.fehler else str(len(basis.fehler)) + ' Fehler'}")
    return 1 if basis.fehler else 0


if __name__ == "__main__":
    sys.exit(main())
