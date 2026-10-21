#!/usr/bin/env python3
"""
AzubiPass · Spec 08: Anmeldung mit E-Mail und Passwort (Simulation)

    AXE_PFAD=…/axe.min.js python3 community_passwort_test.py [--bilder ORDNER]

Alle Fälle sind [mock]: Die echten Module (community.js, community-ansicht.js,
lernstand-sync.js …) laufen im Browser gegen eine nachgebildete
Supabase-Auth. Sie bildet das Verhalten der gebündelten supabase-js 2.117.3
nach, soweit es hier zählt:
  - PKCE: Ein Link (?code=…) wird nur mit dem Prüfwert aus demselben Browser
    eingelöst; sonst bleibt die Sitzung, wie sie war.
  - Wiederherstellung: Nach dem Einlösen meldet die Bibliothek
    PASSWORD_RECOVERY in einem eigenen Takt (setTimeout 0), nach getSession.
  - Fehlercodes: invalid_credentials, email_not_confirmed, weak_password
    (Mindestlänge aus der Servermeldung), reauthentication_needed,
    otp_disabled (Mail-Rückfall ohne Kontoanlage), 429.
Das echte Projekt ist damit nicht geprüft (siehe Bericht). Die Testpasswörter
sind Platzhalter dieser Simulation; sie werden nicht ausgegeben.

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
AXE = Path(os.environ.get("AXE_PFAD", "node_modules/axe-core/axe.min.js"))
BILDER = Path(sys.argv[sys.argv.index("--bilder") + 1]) if "--bilder" in sys.argv else None
fehler = []

# Platzhalter der Simulation – mit Leerzeichen, um „kein trim“ zu prüfen.
PW_ANNA = " anna pw 1 "
PW_BEN_NEU = "ben-neu-2026"


def pruefe(bedingung, text, wert=""):
    print(f"  {'OK  ' if bedingung else 'FEHL'} [mock] {text}" + (f"  {wert}" if wert != "" else ""))
    if not bedingung:
        fehler.append(text)


class Stiller(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


FAKE_JS = r"""
(() => {
  const ANNA = { id: "00000000-0000-4000-a000-00000000a001", email: "anna@test.invalid" };
  const BEN = { id: "00000000-0000-4000-a000-00000000b001", email: "ben@test.invalid" };
  const NEU = { id: "00000000-0000-4000-a000-00000000c001", email: "neu@test.invalid" };
  const jetzt = () => new Date().toISOString();
  // Konten des simulierten Auth-Servers (über Seitenaufrufe hinweg in localStorage)
  const LS = "fake-auth";
  const start = { konten: {
      "anna@test.invalid": { u: ANNA, pw: " anna pw 1 ", bestaetigt: true },
      "ben@test.invalid": { u: BEN, pw: null, bestaetigt: true },            // bisher nur Mail-Link
      "neu@test.invalid": { u: NEU, pw: "neu-konto-1", bestaetigt: true },   // ohne Profil
      "offen@test.invalid": { u: { id: "00000000-0000-4000-a000-00000000d001", email: "offen@test.invalid" }, pw: "offen-1234", bestaetigt: false }
    }, sitzung: null, verifier: null, serverMin: 6, frei: true };
  let S;
  try { S = JSON.parse(localStorage.getItem(LS)) || start; } catch (e) { S = start; }
  const sichern = () => { try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) {} };
  const F = window.FAKE = { aufrufe: {}, plan: {}, gehalten: {}, lesen: {}, S: S, sichern,
    freigeben(n) { const g = F.gehalten[n] || []; F.gehalten[n] = []; g.forEach(f => f()); return g.length; } };
  const merke = (n, a) => (F.aufrufe[n] = F.aufrufe[n] || []).push(a);
  const ok = (d) => ({ data: d, error: null });
  const aerr = (code, message, status, extra) => ({ data: { user: null, session: null },
    error: Object.assign({ name: "AuthApiError", code, message, status }, extra || {}) });
  const netz = () => ({ data: { user: null, session: null }, error: { name: "AuthRetryableFetchError", message: "Failed to fetch", status: 0 } });
  const sitz = (u) => u ? { user: u, access_token: "x", expires_at: 9999999999 } : null;
  const ich = () => S.sitzung ? Object.values(S.konten).find(k => k.u.id === S.sitzung).u : null;
  const hoerer = [];
  const melden = (ev) => hoerer.slice().forEach(cb => cb(ev, sitz(ich())));
  function plan(n, ausfuehren) {
    const p = (F.plan[n] || []).shift();
    if (p === "halten") return new Promise(ja => (F.gehalten[n] = F.gehalten[n] || []).push(() => ja(ausfuehren())));
    if (p === "verlieren") { ausfuehren(); return Promise.resolve(netz()); }
    if (p === "bremse") return Promise.resolve(aerr("over_request_rate_limit", "Request rate limit reached", 429));
    if (p === "netz") return Promise.resolve(netz());
    return Promise.resolve().then(ausfuehren);
  }
  function anmelden(k, ev) { S.sitzung = k.u.id; sichern(); melden(ev || "SIGNED_IN"); }
  const schwach = (pw) => pw.length < S.serverMin
    ? aerr("weak_password", "Password should be at least " + S.serverMin + " characters.", 422, { name: "AuthWeakPasswordError", reasons: ["length"] })
    : null;

  // detectSessionInUrl (PKCE) wie in supabase-js: Tausch nur mit Prüfwert dieses Browsers.
  let fertigInit;
  const init = new Promise((ja) => { fertigInit = ja; });
  // Wie supabase-js: Der Tausch startet mit createClient (danach erst onAuthStateChange).
  function starten() { new Promise((fertig) => {
    const q = new URLSearchParams(location.search);
    const code = q.get("code");
    if (code) {
      const [art, mail] = code.split(":");
      const k = S.konten[mail];
      if (k && S.verifier === art) {
        S.verifier = null; S.sitzung = k.u.id; sichern();
        F.tausch = "ok";
        fertig();
        setTimeout(() => melden(art === "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN"), 0);
        return;
      }
      F.tausch = "ohnePruefwert";
    }
    fertig();
  }).then(fertigInit); }

  const auth = {
    getSession: () => init.then(() => ok({ session: sitz(ich()) })),
    getUser: () => init.then(() => ich() ? ok({ user: ich() }) : { data: { user: null }, error: { message: "Auth session missing!" } }),
    onAuthStateChange(cb) { hoerer.push(cb); init.then(() => cb("INITIAL_SESSION", sitz(ich()))); return { data: { subscription: { unsubscribe() {} } } }; },
    signInWithPassword({ email, password }) {
      const k = S.konten[email];
      merke("signInWithPassword", { email, pwGleich: !!k && k.pw === password, laenge: password.length });
      return plan("signInWithPassword", () => {
        if (!k || k.pw === null || k.pw !== password) return aerr("invalid_credentials", "Invalid login credentials", 400);
        if (!k.bestaetigt) return aerr("email_not_confirmed", "Email not confirmed", 400);
        anmelden(k);
        return ok({ user: k.u, session: sitz(k.u) });
      });
    },
    signUp({ email, password, options }) {
      merke("signUp", { email, redirect: options && options.emailRedirectTo });
      return plan("signUp", () => {
        const w = schwach(password); if (w) return w;
        if (S.konten[email]) return ok({ user: { id: "11111111-1111-4111-a111-111111111111", identities: [] }, session: null });
        const u = { id: "00000000-0000-4000-a000-0000000" + String(Object.keys(S.konten).length).padStart(5, "0"), email };
        S.konten[email] = { u, pw: password, bestaetigt: false }; S.verifier = "signup"; sichern();
        return ok({ user: u, session: null });
      });
    },
    resend(a) { merke("resend", { type: a.type, email: a.email, redirect: a.options && a.options.emailRedirectTo }); return plan("resend", () => ok({})); },
    resetPasswordForEmail(email, o) {
      merke("resetPasswordForEmail", { email, redirect: o && o.redirectTo });
      return plan("resetPasswordForEmail", () => { S.verifier = "recovery"; sichern(); return ok({}); });
    },
    verifyOtp({ email, token, type }) {
      merke("verifyOtp", { email, type });
      return plan("verifyOtp", () => {
        const k = S.konten[email];
        if (!k || token !== "123456") return aerr("otp_expired", "Token has expired or is invalid", 403);
        anmelden(k, type === "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN");
        return ok({ user: k.u, session: sitz(k.u) });
      });
    },
    signInWithOtp({ email, options }) {
      merke("signInWithOtp", { email, shouldCreateUser: options && options.shouldCreateUser });
      return plan("signInWithOtp", () => S.konten[email] || (options && options.shouldCreateUser)
        ? ok({}) : aerr("otp_disabled", "Signups not allowed for otp", 422));
    },
    updateUser(d) {
      const u = ich();
      merke("updateUser", { konto: u && u.id, nonce: d.nonce || null });
      return plan("updateUser", () => {
        if (!u) return aerr("session_not_found", "Auth session missing!", 401);
        if (F.nachweisNoetig && d.nonce !== "654321")
          return d.nonce ? aerr("reauthentication_not_valid", "Reauthentication nonce is invalid", 401)
                         : aerr("reauthentication_needed", "Password update requires reauthentication", 401);
        const w = schwach(d.password); if (w) return w;
        const k = Object.values(S.konten).find(x => x.u.id === u.id);
        if (k.pw === d.password) return aerr("same_password", "New password should be different from the old password.", 422);
        k.pw = d.password; sichern(); melden("USER_UPDATED");
        return ok({ user: u });
      });
    },
    reauthenticate() { merke("reauthenticate", { konto: S.sitzung }); return plan("reauthenticate", () => ok({})); },
    signOut() { S.sitzung = null; sichern(); melden("SIGNED_OUT"); return Promise.resolve({ error: null }); }
  };
  F.anmeldenAls = (mail) => anmelden(S.konten[mail]);

  // Daten: nur, was Anmeldung, Profil und Paketprüfung brauchen.
  const profile = {};
  profile[ANNA.id] = { id: ANNA.id, anzeigename: "Anna", lehrjahr: 2, ueber_mich: "", rolle: "azubi", beruf: "kfb", erstellt_am: jetzt() };
  profile[BEN.id] = { id: BEN.id, anzeigename: "Ben", lehrjahr: 1, ueber_mich: "", rolle: "azubi", beruf: "kfb", erstellt_am: jetzt() };
  function abfrage(name) {
    const filter = [];
    let einzeln = false;
    const q = {
      select() { return q; }, order() { return q; }, limit() { return q; }, range() { return q; }, or() { return q; },
      lt() { return q; }, gt() { return q; }, is() { return q; }, neq() { return q; }, in() { return q; }, not() { return q; },
      eq(k, v) { filter.push([k, v]); return q; }, maybeSingle() { einzeln = true; return q; }, single() { einzeln = true; return q; },
      then(ja, nein) {
        F.lesen[name] = (F.lesen[name] || 0) + 1;
        let r = [];
        if (name === "profil") r = Object.values(profile).filter(p => filter.every(([k, v]) => p[k] === v));
        return Promise.resolve(ok(einzeln ? (r[0] || null) : r)).then(ja, nein);
      }
    };
    return q;
  }
  function rpc(name, a) {
    merke("rpc:" + name, { konto: S.sitzung });
    if (name === "beitraege_frei") return Promise.resolve(ok(S.frei));
    if (name === "lernstand_speichern") return Promise.resolve(ok({ ok: true, version: 1 }));
    return Promise.resolve(ok(null));
  }
  const client = { auth, from: abfrage, rpc,
    channel() { const c = { on() { return c; }, subscribe() { return c; } }; return c; }, removeChannel() {},
    storage: { from: () => ({ list: () => Promise.resolve(ok([])), remove: () => Promise.resolve(ok([])) }) } };
  let gestartet = false;
  window.supabase = { createClient: () => { if (!gestartet) { gestartet = true; starten(); } return client; } };
})();
"""


def main():
    handler = functools.partial(Stiller, directory=str(DOCS))
    with socketserver.TCPServer(("127.0.0.1", 0), handler) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        basis = f"http://127.0.0.1:{srv.server_address[1]}/"
        with sync_playwright() as p:
            browser = p.chromium.launch()
            konsole = []

            def neuer_browser(breite=390):
                ctx = browser.new_context(viewport={"width": breite, "height": 844},
                                          service_workers="block", locale="de-DE")
                ctx.add_init_script(FAKE_JS)
                return ctx

            def oeffnen(ctx, ziel="app.html#community/profil"):
                s = ctx.new_page()
                s.on("console", lambda m: konsole.append(m.text))
                s.on("pageerror", lambda e: konsole.append("pageerror " + str(e)))
                s.goto(basis + ziel)
                s.wait_for_function("window.AP && AP.community && AP.communityAnsicht")
                return s

            def h1(s, text, timeout=5000):
                try:
                    s.locator("#community h1", has_text=text).first.wait_for(timeout=timeout)
                    return True
                except Exception:
                    return False

            def text_da(s, text, timeout=5000):
                try:
                    s.get_by_text(text, exact=False).first.wait_for(timeout=timeout)
                    return True
                except Exception:
                    return False

            def aufrufe(s, n):
                return s.evaluate("n => (FAKE.aufrufe[n] || []).length", n)

            def letzter(s, n):
                return s.evaluate("n => { const a = FAKE.aufrufe[n] || []; return a[a.length - 1] || null; }", n)

            def knopf(s, name):
                return s.get_by_role("button", name=name, exact=True)

            def axe(s, name):
                if BILDER:
                    BILDER.mkdir(parents=True, exist_ok=True)
                    s.screenshot(path=str(BILDER / f"{name}.png"), full_page=True)
                if not AXE.exists():
                    print(f"  ---- [mock] axe übersprungen ({name}): AXE_PFAD fehlt")
                    return
                s.add_script_tag(path=str(AXE))
                v = s.evaluate("""async () => (await axe.run(document.querySelector('#community'),
                    { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] })).violations.map(x => x.id + ':' + x.nodes.length)""")
                pruefe(not v, f"axe ohne WCAG-Verstöße: {name}", ", ".join(v))

            def speicher_ohne(s, geheim):
                return s.evaluate("""g => { const alle = [];
                    for (const st of [localStorage, sessionStorage]) for (let i = 0; i < st.length; i++) {
                      const k = st.key(i); if (k !== 'fake-auth') alle.push(st.getItem(k)); }
                    return !alle.some(v => v && v.indexOf(g) >= 0); }""", geheim)

            def pw_login(s):
                return s.locator("#community input[autocomplete=current-password]")

            def pw_neu(s, i):
                return s.locator("#community input[autocomplete=new-password]").nth(i)

            def mail_pw(s, mail, pw):
                s.get_by_label("E-Mail-Adresse").fill(mail)
                pw_login(s).fill(pw)

            # ------------------------------------------------------------ P01
            print("P01 · Standard ist „Anmelden“ mit Passwort")
            ctx = neuer_browser()
            s = oeffnen(ctx)
            pruefe(h1(s, "In der Community anmelden"), "Ohne Sitzung öffnet „Anmelden“")
            pruefe(text_da(s, "Melde dich mit deiner E-Mail-Adresse und deinem Passwort an."), "Einführungstext aus Spec 08")
            pw = pw_login(s)
            pruefe(pw.get_attribute("type") == "password" and pw.get_attribute("autocomplete") == "current-password",
                   "Passwortfeld verdeckt, autocomplete current-password")
            for name in ["Anmelden", "Passwort vergessen?", "Konto erstellen",
                         "Bisher nur per E-Mail angemeldet? Passwort festlegen", "Alternativ per E-Mail anmelden",
                         "Passwort anzeigen"]:
                pruefe(knopf(s, name).count() == 1, f"Knopf „{name}“ vorhanden")
            pruefe(s.get_by_role("link", name="Ohne Anmeldung weiterlernen").count() == 1, "„Ohne Anmeldung weiterlernen“ bleibt")
            pruefe(s.get_by_text("kein Passwort").count() == 0, "Kein Text „kein Passwort“ mehr")
            axe(s, "p01-anmelden")

            print("P02 · Leeres Passwort, falsche Daten, unbekannte Adresse")
            s.get_by_label("E-Mail-Adresse").fill("anna@test.invalid")
            knopf(s, "Anmelden").click()
            pruefe(text_da(s, "Gib dein Passwort ein."), "Leeres Passwort: „Gib dein Passwort ein.“")
            pruefe(aufrufe(s, "signInWithPassword") == 0, "Ohne Passwort keine Anfrage")
            pw.fill("falsch")
            knopf(s, "Anmelden").click()
            pruefe(text_da(s, "E-Mail-Adresse oder Passwort stimmen nicht."), "Falsches Passwort: neutraler Text")
            s.get_by_label("E-Mail-Adresse").fill("niemand@test.invalid")
            pw.fill("irgendwas")
            knopf(s, "Anmelden").click()
            s.wait_for_function("FAKE.aufrufe.signInWithPassword.length === 2")
            pruefe(text_da(s, "E-Mail-Adresse oder Passwort stimmen nicht."), "Unbekannte Adresse: derselbe Text")
            pruefe(aufrufe(s, "signUp") + aufrufe(s, "signInWithOtp") + aufrufe(s, "resetPasswordForEmail") == 0,
                   "Kein Konto angelegt, kein automatischer Mailversand")

            print("P03 · Anzeigen/Verbergen ändert weder Wert noch Fokus")
            pw.fill("abc def")
            pw.focus()
            s.evaluate("() => document.querySelector('#community input[autocomplete=current-password]').setSelectionRange(2, 4)")
            knopf(s, "Passwort anzeigen").click()
            s.wait_for_timeout(50)
            zustand = s.evaluate("""() => { const e = document.querySelector('#community input[autocomplete=current-password]');
                return [e.type, e.value, document.activeElement === e, e.selectionStart, e.selectionEnd]; }""")
            pruefe(zustand == ["text", "abc def", True, 2, 4], "Sichtbar, gleicher Wert, Fokus und Auswahl bleiben", zustand)
            pruefe(knopf(s, "Passwort verbergen").count() == 1, "Beschriftung wechselt zu „Passwort verbergen“")
            knopf(s, "Passwort verbergen").click()
            pruefe(pw.get_attribute("type") == "password", "Wieder verdeckt")

            print("P04 · Ansichtswechsel leert Passwörter, E-Mail bleibt")
            s.get_by_label("E-Mail-Adresse").fill("anna@test.invalid")
            pw.fill("geheim-zwischen")
            knopf(s, "Konto erstellen").click()
            pruefe(h1(s, "Konto erstellen"), "„Konto erstellen“ geöffnet")
            pruefe(s.get_by_label("E-Mail-Adresse").input_value() == "anna@test.invalid", "E-Mail übernommen")
            knopf(s, "Schon ein Konto? Anmelden").click()
            h1(s, "In der Community anmelden")
            pruefe(pw_login(s).input_value() == "", "Passwortfeld nach Rückkehr leer")
            pruefe(speicher_ohne(s, "geheim-zwischen"), "Passwort in keinem Browser-Speicher")

            print("P05 · Login mit Leerzeichen im Passwort, Doppelklick")
            s.evaluate("FAKE.plan.signInWithPassword = ['halten']")
            mail_pw(s, "anna@test.invalid", PW_ANNA)
            knopf(s, "Anmelden").dblclick()
            pruefe(text_da(s, "Anmeldung wird geprüft …"), "Laufender Zustand „Anmeldung wird geprüft …“")
            knopf(s, "Anmeldung wird geprüft …").click(force=True)
            pruefe(aufrufe(s, "signInWithPassword") == 3, "Doppelklick: nur eine Anfrage", aufrufe(s, "signInWithPassword"))
            s.evaluate("FAKE.freigeben('signInWithPassword')")
            pruefe(h1(s, "Profil"), "Angemeldet: Profilansicht desselben Kontos")
            l = letzter(s, "signInWithPassword")
            pruefe(l["pwGleich"] and l["laenge"] == len(PW_ANNA), "Passwort unverändert übertragen (kein trim)")
            pruefe(s.evaluate("AP.community.kontoJetzt()") == "00000000-0000-4000-a000-00000000a001", "Gleiche Nutzer-ID")
            pruefe(text_da(s, "Anna"), "Bestehendes Profil geladen, nicht neu angelegt")
            pruefe(aufrufe(s, "rpc:profil_anlegen") == 0, "Keine Profilanlage")
            pruefe(speicher_ohne(s, PW_ANNA), "Passwort in keinem Browser-Speicher")

            print("P06 · Passwort im Profil ändern; Server verlangt Bestätigungscode")
            knopf(s, "Passwort festlegen oder ändern").click()
            neu1 = pw_neu(s, 0)
            pruefe(neu1.get_attribute("autocomplete") == "new-password", "Neue Passwörter: autocomplete new-password")
            neu1.fill("kurz")
            pw_neu(s, 1).fill("anders")
            knopf(s, "Passwort speichern").click()
            pruefe(text_da(s, "Das Passwort muss mindestens 6 Zeichen lang sein."), "Mindestlänge (gelesener Serverwert)")
            pruefe(text_da(s, "Die Passwörter stimmen nicht überein."), "Abweichende Wiederholung")
            pruefe(aufrufe(s, "updateUser") == 0, "Keine Anfrage bei Feldfehlern")
            axe(s, "p06-passwort-aendern")
            s.evaluate("FAKE.nachweisNoetig = true")
            neu1.fill("anna-neu-1")
            pw_neu(s, 1).fill("anna-neu-1")
            knopf(s, "Passwort speichern").click()
            pruefe(text_da(s, "Bestätigungscode aus der E-Mail"), "Reauthentifizierung: Codefeld erscheint")
            s.wait_for_function("(FAKE.aufrufe.reauthenticate || []).length === 1")
            pruefe(aufrufe(s, "reauthenticate") == 1, "Bestätigungscode einmal angefordert")
            pruefe(s.get_by_text("Dein Passwort wurde gespeichert").count() == 0, "Kein Erfolg ohne Nachweis")
            s.get_by_label("Bestätigungscode aus der E-Mail").fill("111111")
            knopf(s, "Passwort speichern").click()
            pruefe(text_da(s, "Der Bestätigungscode ist abgelaufen oder stimmt nicht."), "Falscher Code: Feldfehler")
            s.get_by_label("Bestätigungscode aus der E-Mail").fill("654321")
            knopf(s, "Passwort speichern").click()
            pruefe(text_da(s, "Dein Passwort wurde gespeichert. Du kannst dich jetzt mit E-Mail-Adresse und Passwort anmelden."),
                   "Erfolg erst nach bestätigter Antwort")
            pruefe(s.evaluate("FAKE.S.konten['anna@test.invalid'].pw") == "anna-neu-1", "Passwort desselben Kontos geändert")
            s.evaluate("FAKE.nachweisNoetig = false")

            print("P07 · Unklare Antwort, verspätete Antwort nach Kontowechsel")
            knopf(s, "Passwort festlegen oder ändern").click()
            s.evaluate("FAKE.plan.updateUser = ['verlieren']")
            pw_neu(s, 0).fill("anna-neu-2")
            pw_neu(s, 1).fill("anna-neu-2")
            knopf(s, "Passwort speichern").click()
            pruefe(text_da(s, "Wir wissen nicht, ob dein neues Passwort gespeichert wurde."), "Verlorene Antwort: kein Erfolg behauptet")
            s.evaluate("FAKE.plan.updateUser = ['halten']")
            knopf(s, "Passwort speichern").click()
            s.wait_for_function("(FAKE.gehalten.updateUser || []).length === 1")
            s.evaluate("FAKE.anmeldenAls('ben@test.invalid')")
            s.evaluate("FAKE.freigeben('updateUser')")
            s.wait_for_timeout(300)
            pruefe(s.get_by_text("Dein Passwort wurde gespeichert").count() == 0, "Antwort für Anna erscheint nicht bei Ben")
            pruefe(s.evaluate("AP.community.kontoJetzt()") == "00000000-0000-4000-a000-00000000b001", "Jetzt Bens Konto")
            ctx.close()

            print("P08 · Unbestätigte Adresse, Rate Limit")
            ctx = neuer_browser()
            s = oeffnen(ctx)
            h1(s, "In der Community anmelden")
            mail_pw(s, "offen@test.invalid", "offen-1234")
            knopf(s, "Anmelden").click()
            pruefe(text_da(s, "Bestätige zuerst deine E-Mail-Adresse."), "Unbestätigt: eigener Text")
            knopf(s, "Bestätigungs-Mail erneut senden").click()
            s.wait_for_function("(FAKE.aufrufe.resend || []).length === 1")
            l = letzter(s, "resend")
            pruefe(l["type"] == "signup" and "zweck=registrierung" in l["redirect"], "Erneuter Versand: Typ signup, Rückweg Registrierung")
            s.evaluate("FAKE.plan.signInWithPassword = ['bremse']")
            knopf(s, "Anmelden").click()
            pruefe(text_da(s, "Zu viele Versuche in kurzer Zeit."), "429: Wiederholungsweg statt Rohfehler")

            print("P09 · Konto erstellen")
            knopf(s, "Konto erstellen").click()
            h1(s, "Konto erstellen")
            p1, p2 = pw_neu(s, 0), pw_neu(s, 1)
            pruefe(p1.get_attribute("autocomplete") == "new-password" and p2.get_attribute("autocomplete") == "new-password",
                   "Registrierung: new-password")
            pruefe(text_da(s, "Mindestens 6 Zeichen."), "Geltende Regel sichtbar")
            s.get_by_label("E-Mail-Adresse").fill("frisch@test.invalid")
            p1.fill("12345")
            p2.fill("12346")
            knopf(s, "Konto erstellen").click()
            pruefe(text_da(s, "Bitte prüfe deine Eingaben:"), "Mehrere Fehler: Übersicht")
            pruefe(aufrufe(s, "signUp") == 0, "Keine Registrierung bei Feldfehlern")
            axe(s, "p09-konto-erstellen")
            p1.fill("frisch-pw-1")
            p2.fill("frisch-pw-1")
            pruefe(s.locator("#community .cm-fehler:not([hidden])").count() == 0, "Fehler verschwinden beim Korrigieren")
            knopf(s, "Konto erstellen").click()
            pruefe(text_da(s, "Prüfe dein E-Mail-Postfach, um die Registrierung abzuschließen. Falls du schon ein Konto hast, melde dich an oder setze dein Passwort zurück."),
                   "Ohne Sitzung: Bestätigungsansicht mit Spec-Text")
            pruefe("zweck=registrierung" in letzter(s, "signUp")["redirect"], "Rückweg mit Zweck Registrierung")
            pruefe(s.evaluate("AP.community.kontoJetzt()") is None, "Keine Sitzung abgeleitet")
            axe(s, "p09-bestaetigen")

            print("P10 · Vorhandene Adresse registrieren; Serverregel")
            knopf(s, "Zur Anmeldung").click()
            knopf(s, "Konto erstellen").click()
            s.get_by_label("E-Mail-Adresse").fill("anna@test.invalid")
            pw_neu(s, 0).fill("uebernahme-1")
            pw_neu(s, 1).fill("uebernahme-1")
            knopf(s, "Konto erstellen").click()
            pruefe(text_da(s, "Falls du schon ein Konto hast"), "Vorhandene Adresse: gleicher neutraler Text, kein Erfolg")
            pruefe(s.evaluate("FAKE.S.konten['anna@test.invalid'].pw") == PW_ANNA, "Passwort des vorhandenen Kontos unverändert")
            s.evaluate("FAKE.S.serverMin = 8")
            knopf(s, "Zur Anmeldung").click()
            knopf(s, "Konto erstellen").click()
            s.get_by_label("E-Mail-Adresse").fill("streng@test.invalid")
            pw_neu(s, 0).fill("sieben7")
            pw_neu(s, 1).fill("sieben7")
            knopf(s, "Konto erstellen").click()
            pruefe(text_da(s, "Das Passwort muss mindestens 8 Zeichen lang sein."), "Serverregel aus der Antwort erklärt")
            pruefe(s.get_by_text("Password should").count() == 0, "Kein Rohfehler")
            s.evaluate("FAKE.S.serverMin = 6")

            print("P11 · Passwort vergessen / festlegen (neutral, Wiederherstellung)")
            knopf(s, "Schon ein Konto? Anmelden").click()
            knopf(s, "Passwort vergessen?").click()
            pruefe(h1(s, "Passwort vergessen"), "„Passwort vergessen“ geöffnet")
            s.get_by_label("E-Mail-Adresse").fill("niemand@test.invalid")
            knopf(s, "Link zum Zurücksetzen senden").click()
            neutral = "Falls für diese E-Mail-Adresse ein Konto besteht, erhältst du eine E-Mail mit den nächsten Schritten."
            pruefe(text_da(s, neutral), "Unbekannte Adresse: neutrale Versandbestätigung")
            pruefe("zweck=passwort" in letzter(s, "resetPasswordForEmail")["redirect"], "Rückweg mit Zweck Passwort")
            axe(s, "p11-link-versendet")
            knopf(s, "Zur Anmeldung").click()
            knopf(s, "Bisher nur per E-Mail angemeldet? Passwort festlegen").click()
            pruefe(h1(s, "Passwort festlegen"), "„Passwort festlegen“ geöffnet")
            pruefe(text_da(s, "Du legst ein Passwort für dein bestehendes Konto fest."), "Erklärung für bestehende Konten")
            s.get_by_label("E-Mail-Adresse").fill("ben@test.invalid")
            vor = aufrufe(s, "signUp")
            knopf(s, "Link zum Festlegen senden").click()
            pruefe(text_da(s, neutral), "Bekannte Adresse: derselbe Text")
            pruefe(aufrufe(s, "signUp") == vor, "Nachrüsten nie über signUp")
            axe(s, "p11-festlegen")

            print("P11b · Mail-Kontingent erschöpft (429 over_email_send_rate_limit)")
            s.evaluate("""() => { const a = window.supabase.createClient().auth, alt = a.resetPasswordForEmail;
                a.resetPasswordForEmail = () => { a.resetPasswordForEmail = alt; return Promise.resolve({ data: {}, error:
                  { name: 'AuthApiError', code: 'over_email_send_rate_limit', message: 'email rate limit exceeded', status: 429 } }); }; }""")
            knopf(s, "Link erneut senden").click()
            pruefe(text_da(s, "Gerade wurden zu viele E-Mails verschickt. Versuch es in etwa einer Stunde erneut."),
                   "Mail-Limit: ehrliche Wartezeit statt „kurz warten“")
            pruefe(s.get_by_text("Warte einen Moment").count() == 0, "Kein „Warte einen Moment“ beim Mail-Limit")

            print("P12 · Code aus der Wiederherstellungs-Mail")
            s.get_by_label("Code aus der E-Mail").fill("000000")
            knopf(s, "Code bestätigen").click()
            pruefe(text_da(s, "Der Code ist abgelaufen oder stimmt nicht."), "Falscher Code: verständlicher Fehler")
            s.get_by_label("Code aus der E-Mail").fill("123 456")
            knopf(s, "Code bestätigen").click()
            pruefe(h1(s, "Neues Passwort festlegen"), "Gültiger Code: Passwortansicht vor dem Profil")
            pruefe(text_da(s, "Konto: ben@test.invalid"), "Zeigt, für welches Konto")
            pruefe(letzter(s, "verifyOtp")["type"] == "recovery", "verifyOtp mit Typ recovery")
            ctx.close()

            print("P13 · Wiederherstellungslink im selben Browser, Reload, Speichern")
            ctx = neuer_browser()
            s = oeffnen(ctx)
            h1(s, "In der Community anmelden")
            knopf(s, "Bisher nur per E-Mail angemeldet? Passwort festlegen").click()
            s.get_by_label("E-Mail-Adresse").fill("ben@test.invalid")
            knopf(s, "Link zum Festlegen senden").click()
            text_da(s, "Falls für diese E-Mail-Adresse")
            s.goto(basis + "app.html?anmeldung=1&zweck=passwort&code=recovery:ben@test.invalid#community/profil")
            s.wait_for_function("window.AP && AP.communityAnsicht")
            pruefe(h1(s, "Neues Passwort festlegen"), "Gültiger Link: Passwortansicht")
            pruefe("code=" not in s.url and "zweck" not in s.url, "Adresse ohne Code und Zweck", s.url)
            pruefe(s.evaluate("FAKE.lesen.profil || 0") == 0, "Kein Profil geladen, keine Weiterleitung davor")
            axe(s, "p13-neues-passwort")
            s.reload()
            s.wait_for_function("window.AP && AP.communityAnsicht")
            pruefe(h1(s, "Neues Passwort festlegen"), "Nach Reload weiter in der Passwortansicht")
            pw_neu(s, 0).fill(PW_BEN_NEU)
            pw_neu(s, 1).fill(PW_BEN_NEU + "x")
            knopf(s, "Passwort speichern").click()
            pruefe(text_da(s, "Die Passwörter stimmen nicht überein."), "Abweichende Wiederholung")
            pw_neu(s, 1).fill(PW_BEN_NEU)
            knopf(s, "Passwort speichern").click()
            pruefe(text_da(s, "Dein Passwort wurde gespeichert. Du kannst dich jetzt mit E-Mail-Adresse und Passwort anmelden."), "Erfolgstext")
            pruefe(h1(s, "Profil"), "Danach normale Profilprüfung: vorhandenes Profil")
            pruefe(s.evaluate("sessionStorage.getItem('azubipass-wiederherstellung')") is None, "Wiederherstellungsvermerk gelöscht")
            pruefe(s.evaluate("FAKE.aufrufe.updateUser.length") == 1, "Ein updateUser")
            pruefe(s.evaluate("FAKE.aufrufe.updateUser[0].konto") == "00000000-0000-4000-a000-00000000b001", "Für Bens Nutzer-ID")
            knopf(s, "Abmelden").first.click()
            h1(s, "In der Community anmelden")
            mail_pw(s, "ben@test.invalid", PW_BEN_NEU)
            knopf(s, "Anmelden").click()
            pruefe(h1(s, "Profil") and text_da(s, "Ben"), "Danach Passwortlogin: gleiche ID, gleiches Profil")
            pruefe(speicher_ohne(s, PW_BEN_NEU), "Neues Passwort in keinem Browser-Speicher")
            ctx.close()

            print("P14 · Link in anderem Browser, Fehlerlink, fremde Sitzung")
            ctx = neuer_browser()
            s = oeffnen(ctx, "app.html?anmeldung=1&zweck=passwort&code=recovery:ben@test.invalid#community")
            pruefe(text_da(s, "Dieser Link konnte nicht bestätigt werden. Fordere einen neuen Link an."), "Ohne Prüfwert: neuer Link nötig")
            pruefe(h1(s, "Passwort vergessen"), "Rückweg: Link neu anfordern")
            pruefe(s.evaluate("AP.community.kontoJetzt()") is None, "Keine Sitzung")
            s.goto(basis + "app.html?anmeldung=1&zweck=passwort&error=access_denied&error_description=Email+link+is+invalid+or+has+expired#community")
            s.wait_for_function("window.AP && AP.communityAnsicht")
            pruefe(text_da(s, "Dieser Link konnte nicht bestätigt werden."), "Abgelaufener Link: derselbe Rückweg")
            # Anna ist angemeldet, ein Link für Ben ohne Prüfwert: Anna bekommt keine Passwortansicht.
            s.evaluate("FAKE.anmeldenAls('anna@test.invalid')")
            s.goto(basis + "app.html?anmeldung=1&zweck=passwort&code=recovery:ben@test.invalid#community/profil")
            s.wait_for_function("window.AP && AP.communityAnsicht")
            pruefe(text_da(s, "Der Link konnte in diesem Browser nicht bestätigt werden. Du bist hier aber als anna@test.invalid angemeldet"),
                   "Sitzung A + nicht bestätigter Link: Hinweis mit angemeldetem Konto")
            pruefe(h1(s, "Profil") and pw_neu(s, 0).count() == 1, "Profil mit geöffnetem Passwortformular für A")
            pruefe(s.get_by_text("Neues Passwort festlegen").count() == 0, "A bekommt keine Wiederherstellungsansicht")
            pruefe(s.evaluate("(FAKE.aufrufe.updateUser || []).length") == 0, "Kein updateUser")
            # ?zweck=passwort ohne Code beweist nichts
            s.goto(basis + "app.html?anmeldung=1&zweck=passwort#community/profil")
            s.wait_for_function("window.AP && AP.communityAnsicht")
            pruefe(h1(s, "Profil"), "Nur Parameter: normale Profilprüfung für A")
            ctx.close()

            print("P15 · Sitzung A + gültiger Link für B im selben Browser")
            ctx = neuer_browser()
            s = oeffnen(ctx)
            h1(s, "In der Community anmelden")
            mail_pw(s, "anna@test.invalid", PW_ANNA)
            knopf(s, "Anmelden").click()
            h1(s, "Profil")
            s.evaluate("FAKE.S.verifier = 'recovery'; FAKE.sichern()")
            s.goto(basis + "app.html?anmeldung=1&zweck=passwort&code=recovery:ben@test.invalid#community/profil")
            s.wait_for_function("window.AP && AP.communityAnsicht")
            pruefe(h1(s, "Neues Passwort festlegen") and text_da(s, "Konto: ben@test.invalid"), "Ansicht für B (nachgewiesene Identität)")
            pruefe(s.evaluate("JSON.parse(localStorage.getItem('azubipass-lernsync') || '{}').nutzer")
                   == "00000000-0000-4000-a000-00000000b001", "Lernstand-Merkzettel jetzt bei B (Trennung von A)")
            pw_neu(s, 0).fill("ben-aus-a-1")
            pw_neu(s, 1).fill("ben-aus-a-1")
            knopf(s, "Passwort speichern").click()
            text_da(s, "Dein Passwort wurde gespeichert.")
            konten = s.evaluate("[FAKE.S.konten['anna@test.invalid'].pw, FAKE.S.konten['ben@test.invalid'].pw]")
            pruefe(konten == [PW_ANNA, "ben-aus-a-1"], "Nur B hat ein neues Passwort, A unverändert")
            ctx.close()

            print("P16 · Alternativ per E-Mail (nur vorhandene Konten)")
            ctx = neuer_browser()
            s = oeffnen(ctx)
            h1(s, "In der Community anmelden")
            knopf(s, "Alternativ per E-Mail anmelden").click()
            pruefe(h1(s, "Per E-Mail anmelden"), "Mail-Rückfall erreichbar")
            s.get_by_label("E-Mail-Adresse").fill("niemand@test.invalid")
            knopf(s, "Anmeldelink senden").click()
            pruefe(text_da(s, "Falls für niemand@test.invalid ein Konto besteht"), "Unbekannte Adresse: neutral, kein Konto")
            pruefe(letzter(s, "signInWithOtp")["shouldCreateUser"] is False, "shouldCreateUser: false")
            s.get_by_label("Anmeldecode aus der E-Mail").fill("123456")
            knopf(s, "Mit Code anmelden").click()
            pruefe(text_da(s, "Der Code ist abgelaufen oder stimmt nicht."), "Code ohne Konto: Fehler, keine Anlage")
            knopf(s, "E-Mail-Adresse ändern").click()
            s.get_by_label("E-Mail-Adresse").fill("ben@test.invalid")
            knopf(s, "Anmeldelink senden").click()
            text_da(s, "Falls für ben@test.invalid")
            s.get_by_label("Anmeldecode aus der E-Mail").fill("123456")
            knopf(s, "Mit Code anmelden").click()
            pruefe(h1(s, "Profil") and text_da(s, "Ben"), "Bisheriger Code-Weg für vorhandenes Konto")
            ctx.close()

            print("P17 · Profilanlage: Erklärung und Abmelden; geschlossenes Paket")
            ctx = neuer_browser(320)
            s = oeffnen(ctx, "app.html#community")
            h1(s, "In der Community anmelden")
            pruefe(s.evaluate("document.documentElement.scrollWidth") <= 320, "320 px: kein waagrechtes Scrollen")
            mail_pw(s, "neu@test.invalid", "neu-konto-1")
            knopf(s, "Anmelden").click()
            pruefe(h1(s, "Dein Community-Profil"), "Konto ohne Profil: Profilanlage")
            pruefe(text_da(s, "Schon mit einem anderen Konto registriert? Melde dich ab und mit dessen E-Mail-Adresse an."),
                   "Erklärung zum Kontowechsel")
            pruefe(knopf(s, "Abmelden").count() == 1, "Abmelden erreichbar")
            knopf(s, "Abmelden").click()
            h1(s, "In der Community anmelden")
            s.evaluate("FAKE.S.frei = false; FAKE.sichern()")
            mail_pw(s, "anna@test.invalid", PW_ANNA)
            knopf(s, "Anmelden").click()
            pruefe(text_da(s, "Beiträge sind für die Klassen-Beta noch nicht freigeschaltet.", 6000), "Geschlossenes Paket bleibt zu")
            pruefe(s.evaluate("(FAKE.lesen.beitrag_liste || 0)") == 0, "Keine Beitragsabfrage")

            print("P18 · Offline")
            knopf_ab = s.get_by_role("button", name="Abmelden")
            s.evaluate("location.hash = '#community/profil'")
            h1(s, "Profil")
            knopf_ab.first.click()
            h1(s, "In der Community anmelden")
            vorher = aufrufe(s, "signInWithPassword")
            ctx.set_offline(True)
            pruefe(text_da(s, "Du bist offline."), "Offline-Hinweis")
            ctx.set_offline(False)
            s.wait_for_timeout(400)
            pruefe(aufrufe(s, "signInWithPassword") == vorher, "Kein automatischer Auth-Versand bei Wiederverbindung")
            ctx.close()

            pruefe(not any(x in m for m in konsole for x in [PW_ANNA.strip(), PW_BEN_NEU, "anna-neu-1", "frisch-pw-1"]),
                   "Keine Passwörter in der Konsole")
            pruefe(not any(m.startswith("pageerror") for m in konsole), "Keine Seitenfehler",
                   [m for m in konsole if m.startswith("pageerror")][:3])
            browser.close()

    print()
    print(f"{'ALLES OK' if not fehler else str(len(fehler)) + ' FEHLER'}")
    for f in fehler:
        print("  -", f)
    return 1 if fehler else 0


if __name__ == "__main__":
    sys.exit(main())
