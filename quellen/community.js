/* AzubiPass · Community – Datenschicht
   ---------------------------------------------------------------------------
   Alles, was die Community mit dem Server bespricht: Anmeldung, Profil,
   Lerngruppen, Beiträge, Antworten, Wochenaufgaben, Meldungen, Dateien.
   Keine Oberfläche – die entsteht nach den freigegebenen Entwürfen in
   doku/community/. Jede Funktion gibt ein Promise zurück; Fehler kommen als
   Error mit verständlicher deutscher Meldung (fehler.message) und einer
   groben Art (fehler.art: "netz", "anmeldung", "rechte", "eingabe",
   "bremse", "server").

   Lernen und Üben bleiben offline. Die Bibliothek (mittel/supabase.js)
   wird erst geladen, wenn jemand die Community braucht – oder sofort, wenn
   die Seite gerade aus einem Anmelde-Link geöffnet wurde.

   Der Sitzungsschlüssel heißt bewusst „azubipass-sitzung" und nicht
   „azubipass:…": kern.js hält alles mit Doppelpunkt für alten Lernstand.     */

(function () {
  "use strict";

  var AP = window.AP = window.AP || {};

  var CFG = {
    url: "https://pjbxozskvuhxtrotqpkr.supabase.co",
    // Öffentlicher Schlüssel: gehört in den Browser. Geschützt wird über die
    // Zugriffsregeln in der Datenbank, nicht über Geheimhaltung.
    schluessel: "sb_publishable_USAutB__rzLYPaBkbOJ6WQ_K13tabfq",
    bibliothek: "mittel/supabase.js",
    sitzung: "azubipass-sitzung",
    bucket: "lernzettel",
    dateiGroesse: 5 * 1024 * 1024,
    dateiArten: {
      "image/jpeg": ["bild", "jpg"], "image/png": ["bild", "png"],
      "image/webp": ["bild", "webp"], "application/pdf": ["pdf", "pdf"]
    },
    seite: 30
  };

  var GRUENDE = ["falsch", "urheberrecht", "beleidigung", "spam", "persoenliche_daten", "sonstiges"];
  var ARTEN = ["lernzettel", "frage", "tipp"];

  /* ================================================== Verbindung */

  var ladend = null, client = null;

  function bibliothek() {
    if (window.supabase && window.supabase.createClient) return Promise.resolve(window.supabase);
    if (ladend) return ladend;
    ladend = new Promise(function (ja, nein) {
      var s = document.createElement("script");
      s.src = CFG.bibliothek;
      s.async = true;
      s.onload = function () {
        if (window.supabase && window.supabase.createClient) ja(window.supabase);
        else nein(fehler("Die Community konnte nicht geladen werden.", "server"));
      };
      s.onerror = function () {
        ladend = null;
        nein(fehler("Die Community braucht eine Internetverbindung.", "netz"));
      };
      document.head.appendChild(s);
    });
    return ladend;
  }

  function verbinden() {
    if (client) return Promise.resolve(client);
    return bibliothek().then(function (sb) {
      if (client) return client;
      client = sb.createClient(CFG.url, CFG.schluessel, {
        auth: {
          storageKey: CFG.sitzung,
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          // PKCE: Der Link kommt als ?code=… zurück, nicht im #-Teil – der
          // gehört dem Sprungverteiler der App.
          flowType: "pkce"
        }
      });
      client.auth.onAuthStateChange(function (ereignis, sitzung) {
        kontoMerken(sitzung && sitzung.user ? sitzung.user.id : null);
        hoerer.forEach(function (h) { try { h(ereignis, sitzung); } catch (e) {} });
      });
      return client;
    });
  }

  /* ================================================== Fehler */

  function fehler(meldung, art, ursache) {
    var e = new Error(meldung);
    e.art = art || "server";
    if (ursache) e.ursache = ursache;
    return e;
  }

  // Übersetzt, was Supabase oder die Datenbank meldet. Die eigenen Funktionen
  // in der Datenbank melden schon auf Deutsch – die reichen wir durch.
  function uebersetzen(f) {
    if (!f) return fehler("Unbekannter Fehler.");
    if (f.art) return f;
    var text = String(f.message || f.error_description || f.msg || f);
    var code = String(f.code || "");
    var status = f.status || 0;

    if (/Failed to fetch|NetworkError|Load failed|network/i.test(text) || (!navigator.onLine))
      return fehler("Keine Verbindung. Die Community braucht Internet.", "netz", f);
    if (status === 429 || /rate limit|too many/i.test(text))
      return fehler("Zu viele Versuche in kurzer Zeit. Warte einen Moment.", "bremse", f);
    if (/Email address not authorized/i.test(text))
      return fehler("An diese Adresse können gerade keine Anmelde-Mails gehen. Sag dem AzubiPass-Team Bescheid.", "server", f);
    if (/invalid.*email|email.*invalid|Unable to validate email/i.test(text))
      return fehler("Diese Mail-Adresse sieht nicht gültig aus.", "eingabe", f);
    if (/Token has expired|otp.*expired|invalid.*otp|Invalid token/i.test(text))
      return fehler("Der Code ist abgelaufen oder stimmt nicht. Lass dir einen neuen schicken.", "anmeldung", f);
    if (/JWT|not authenticated|Auth session missing|refresh token/i.test(text))
      return fehler("Du bist nicht mehr angemeldet. Bitte melde dich neu an.", "anmeldung", f);
    if (/noch nicht freigeschaltet/i.test(text))                  // Paketsperre (Spec 05)
      return fehler("Beiträge sind für die Klassen-Beta noch nicht freigeschaltet.", "gesperrt", f);
    if (code === "P0001")                                         // raise exception
      return fehler(text.replace(/^ERROR:\s*/, ""), /durchatmen|zu viele/i.test(text) ? "bremse" : "eingabe", f);
    if (code === "23505") return fehler("Das gibt es schon.", "eingabe", f);
    if (code === "23514" || code === "22001") return fehler("Eine Eingabe ist zu kurz oder zu lang.", "eingabe", f);
    if (code === "42501" || /row-level security|permission denied/i.test(text))
      return fehler("Dafür fehlen dir die Rechte.", "rechte", f);
    if (/exceeded the maximum allowed size|Payload too large/i.test(text))
      return fehler("Die Datei ist größer als 5 MB.", "eingabe", f);
    if (/mime type|invalid_mime_type/i.test(text))
      return fehler("Erlaubt sind nur JPG, PNG, WebP oder PDF.", "eingabe", f);
    return fehler("Da ist etwas schiefgegangen. Versuch es gleich noch einmal.", "server", f);
  }

  // Wandelt { data, error } in ein Promise mit übersetztem Fehler.
  function auspacken(antwort) {
    if (antwort && antwort.error) throw uebersetzen(antwort.error);
    return antwort ? antwort.data : null;
  }

  function mit(fn) {
    return verbinden().then(fn).catch(function (f) { throw uebersetzen(f); });
  }

  /* ================================================== Anmeldung */

  var hoerer = [];
  function beiAenderung(h) {
    hoerer.push(h);
    return function () { hoerer = hoerer.filter(function (x) { return x !== h; }); };
  }

  // Wohin der Link aus der Mail zurückführt: dieselbe Seite, Community-Tab.
  function rueckweg() {
    return location.origin + location.pathname.replace(/[^/]*$/, "") + "app.html?anmeldung=1#community";
  }

  function mailPruefen(adresse) {
    var a = String(adresse || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(a))
      return Promise.reject(fehler("Diese Mail-Adresse sieht nicht gültig aus.", "eingabe"));
    return Promise.resolve(a);
  }

  function anmeldenPerMail(adresse) {
    return mailPruefen(adresse).then(function (a) {
      return mit(function (c) {
        return c.auth.signInWithOtp({
          email: a,
          options: { emailRedirectTo: rueckweg(), shouldCreateUser: true }
        }).then(auspacken).then(function () { return a; });
      });
    });
  }

  // Rückfall für installierte Apps: Der Link öffnet oft den Browser statt der
  // App. Dann tippt man den sechsstelligen Code aus derselben Mail hier ein.
  function codePruefen(adresse, code) {
    // Wie in der Oberfläche: Leerzeichen sind egal, sonst genau sechs Ziffern.
    var c6 = String(code || "").replace(/\s+/g, "");
    if (!/^\d{6}$/.test(c6)) return Promise.reject(fehler("Der Anmeldecode besteht aus sechs Ziffern.", "eingabe"));
    return mailPruefen(adresse).then(function (a) {
      return mit(function (c) {
        return c.auth.verifyOtp({ email: a, token: c6, type: "email" }).then(auspacken);
      });
    });
  }

  function sitzung() {
    return mit(function (c) {
      return c.auth.getSession().then(auspacken).then(function (d) { return d.session || null; });
    });
  }

  function abmelden() {
    return mit(function (c) {
      wechsel();                      // Antworten, die jetzt noch kommen, gelten nicht mehr
      var g = generation;
      return c.auth.signOut({ scope: "local" }).then(auspacken).then(function () {
        // Erlaubt ist höchstens das eigene SIGNED_OUT (g + 1). Ist inzwischen
        // jemand anderes angemeldet, ist diese Antwort alt: nichts aufräumen,
        // sonst verschwände die Sitzung des neuen Kontos.
        if (generation > g + 1 || kontoId) throw VERALTET();
        aufraeumenSpeicher();
      });
    });
  }

  // Nach dem Abmelden bleibt nichts von der Anmeldung im Browser – auch keine
  // Prüfwerte halb erledigter Mail-Anmeldungen. Der Lernstand (azubipass:…)
  // hat einen anderen Namen und bleibt unberührt.
  function aufraeumenSpeicher() {
    try {
      Object.keys(localStorage).forEach(function (k) {
        if (k.indexOf(CFG.sitzung) === 0) localStorage.removeItem(k);
      });
    } catch (e) {}
  }

  function ich() {
    return sitzung().then(function (s) {
      if (!s) throw fehler("Bitte melde dich zuerst an.", "anmeldung");
      return s.user;
    });
  }

  /* Kontobindung: Jede Abmeldung und jeder Wechsel zu einem anderen Konto
     erhöht die Generation. Eine Antwort, die zu einer älteren Generation oder
     einem anderen Konto gehört, wird verworfen – sie darf weder einen
     Zwischenspeicher füllen noch als Ergebnis zurückkommen. */
  var generation = 0, kontoId;        // kontoId: undefined = noch unbekannt

  function wechsel() { generation++; profilCache = undefined; }

  function kontoMerken(id) {
    if (kontoId !== undefined && id !== kontoId) wechsel();
    kontoId = id;
  }

  function VERALTET() {
    return fehler("Du bist inzwischen mit einem anderen Konto angemeldet oder abgemeldet.", "veraltet");
  }

  function aktuell(g, uid) { return g === generation && (kontoId === undefined || kontoId === uid); }

  // fn(u, client) läuft für das gerade angemeldete Konto; ihr Ergebnis kommt
  // nur zurück, wenn sich das Konto in der Zwischenzeit nicht geändert hat.
  function gebunden(fn) {
    return verbinden().then(function () { return ich(); }).then(function (u) {
      var g = generation;
      return Promise.resolve(fn(u, client)).then(function (r) {
        if (!aktuell(g, u.id)) throw VERALTET();
        return r;
      }, function (f) {
        if (!aktuell(g, u.id)) throw VERALTET();
        throw f;
      });
    }).catch(function (f) { throw uebersetzen(f); });
  }

  // Kam die Seite gerade aus einem Anmelde-Link? Dann sofort verbinden, damit
  // der Code eingelöst wird, und die Adresse danach aufräumen.
  /* Kam die Seite gerade aus einem Anmelde-Link? Dann sofort verbinden, damit
     der Code eingelöst wird, und die Adresse danach aufräumen.

     Mögliche Rückkehr aus der Mail:
       ?anmeldung=1&code=…                   gültig – Code gegen Sitzung tauschen
       ?…error_description=… oder #error…    abgelaufen, schon benutzt, ungültig
     Mit PKCE gelingt der Tausch nur im Browser, in dem der Link angefordert
     wurde. In einem anderen Browser bleibt die Sitzung leer – das melden wir
     wie einen ungültigen Link; dort hilft der Code aus derselben Mail. */
  var LINK_UNGUELTIG = "Dieser Anmeldelink ist nicht mehr gültig. Lass dir einen neuen Link schicken.";

  function linkParameter() {
    var q = new URLSearchParams(location.search);
    var h = /error_description=|error=/.test(location.hash)
      ? new URLSearchParams(location.hash.replace(/^#/, "")) : new URLSearchParams("");
    return {
      code: q.has("code"),
      fehler: q.get("error_description") || q.get("error") || h.get("error_description") || h.get("error"),
      aus: q.has("code") || q.has("anmeldung") || q.has("error") || q.has("error_description") ||
           h.has("error") || h.has("error_description")
    };
  }

  function linkEinloesen() {
    var p = linkParameter();
    if (!p.aus) return Promise.resolve(null);
    if (p.fehler) { aufraeumen(); return Promise.reject(fehler(LINK_UNGUELTIG, "anmeldung")); }
    if (!p.code) { aufraeumen(); return Promise.resolve(null); }
    return verbinden().then(function (c) {
      return c.auth.getSession();
    }).then(function (r) {
      aufraeumen();
      var s = r && r.data ? r.data.session : null;
      if (!s) throw fehler(LINK_UNGUELTIG, "anmeldung");
      return s;
    }).catch(function (f) { aufraeumen(); throw uebersetzen(f); });
  }

  function aufraeumen() {
    try {
      var hash = /error/.test(location.hash) || !location.hash ? "#community" : location.hash;
      history.replaceState(null, "", location.pathname + hash);
    } catch (e) {}
  }

  /* ================================================== Profil */

  // { konto, wert } – wert: null = kein Profil. Gehört immer zu genau einem Konto.
  var profilCache;
  var PROFIL = "id, anzeigename, lehrjahr, ueber_mich, rolle, erstellt_am";

  function profil(frisch) {
    return gebunden(function (u, c) {
      if (!frisch && profilCache && profilCache.konto === u.id) return profilCache;
      return c.from("profil").select(PROFIL).eq("id", u.id).maybeSingle().then(auspacken)
        .then(function (p) { return { konto: u.id, wert: p || null }; });
    }).then(cacheFuellen);
  }

  // Nur füllen, wenn das Ergebnis noch zum angemeldeten Konto gehört.
  function cacheFuellen(r) {
    if (kontoId !== undefined && r.konto !== kontoId) throw VERALTET();
    profilCache = r;
    return r.wert;
  }

  function profilAnlegen(eingabe) {
    var e = eingabe || {};
    var name = String(e.anzeigename || "").trim();
    // Zählen wie die Datenbank (char_length): Codepunkte, nicht UTF-16-Einheiten.
    var laenge = Array.from(name).length;
    if (laenge < 2 || laenge > 30)
      return Promise.reject(fehler("Der Anzeigename braucht 2 bis 30 Zeichen.", "eingabe"));
    var jahr = e.lehrjahr ? Number(e.lehrjahr) : null;
    if (jahr !== null && [1, 2, 3].indexOf(jahr) < 0)
      return Promise.reject(fehler("Lehrjahr 1, 2 oder 3.", "eingabe"));
    return gebunden(function (u, c) {
      return c.rpc("profil_anlegen", {
        p_anzeigename: name, p_lehrjahr: jahr, p_code: String(e.code || ""),
        p_mindestens_16: e.mindestens16 === true, p_regeln: e.regeln === true
      }).then(auspacken);
    }).then(function () { return profil(true); });
  }

  function profilAendern(felder) {
    var erlaubt = {};
    ["anzeigename", "lehrjahr", "ueber_mich"].forEach(function (k) {
      if (felder && Object.prototype.hasOwnProperty.call(felder, k)) erlaubt[k] = felder[k];
    });
    return gebunden(function (u, c) {
      return c.from("profil").update(erlaubt).eq("id", u.id).select(PROFIL).single().then(auspacken)
        .then(function (p) { return { konto: u.id, wert: p }; });
    }).then(cacheFuellen);
  }

  /* ================================================== Lerngruppen */

  function gruppen(nurMeine) {
    return mit(function (c) {
      var q = c.from("gruppe_liste")
        .select("id, name, beschreibung, offen, erstellt_am, mitglieder, meine_rolle")
        .order("name");
      if (nurMeine) q = q.not("meine_rolle", "is", null);
      return q.then(auspacken);
    });
  }

  function gruppe(id) {
    return mit(function (c) {
      return c.from("gruppe_liste")
        .select("id, name, beschreibung, offen, erstellt_am, erstellt_von, mitglieder, meine_rolle")
        .eq("id", id).maybeSingle().then(auspacken);
    });
  }

  function gruppeGruenden(e) {
    var name = String((e && e.name) || "").trim();
    if (name.length < 3 || name.length > 60)
      return Promise.reject(fehler("Der Gruppenname braucht 3 bis 60 Zeichen.", "eingabe"));
    return mit(function (c) {
      return c.rpc("gruppe_gruenden", {
        p_name: name, p_beschreibung: String(e.beschreibung || "").trim(), p_offen: e.offen === true
      }).then(auspacken);
    });
  }

  function gruppeBeitreten(code) {
    return mit(function (c) { return c.rpc("gruppe_beitreten", { p_code: String(code || "") }).then(auspacken); });
  }

  function offenerGruppeBeitreten(gruppeId) {
    return ich().then(function (u) {
      return client.from("mitglied").insert({ gruppe_id: gruppeId, nutzer_id: u.id }).then(auspacken);
    }).catch(function (f) { throw uebersetzen(f); });
  }

  function gruppeVerlassen(gruppeId) {
    return mit(function (c) { return c.rpc("gruppe_verlassen", { p_gruppe: gruppeId }).then(auspacken); });
  }

  function gruppeAendern(gruppeId, felder) {
    var erlaubt = {};
    ["name", "beschreibung", "offen"].forEach(function (k) {
      if (felder && Object.prototype.hasOwnProperty.call(felder, k)) erlaubt[k] = felder[k];
    });
    return mit(function (c) { return c.from("gruppe").update(erlaubt).eq("id", gruppeId).then(auspacken); });
  }

  function gruppenCode(gruppeId) {
    return mit(function (c) {
      return c.from("gruppe_code").select("code").eq("gruppe_id", gruppeId).maybeSingle()
        .then(auspacken).then(function (d) { return d ? d.code : null; });
    });
  }

  function mitglieder(gruppeId) {
    return mit(function (c) {
      return c.from("mitglied")
        .select("nutzer_id, rolle, beigetreten_am, profil(anzeigename, lehrjahr, rolle)")
        .eq("gruppe_id", gruppeId).order("beigetreten_am").then(auspacken);
    });
  }

  function mitgliedRolle(gruppeId, nutzerId, rolle) {
    return mit(function (c) {
      return c.from("mitglied").update({ rolle: rolle })
        .eq("gruppe_id", gruppeId).eq("nutzer_id", nutzerId).then(auspacken);
    });
  }

  function mitgliedEntfernen(gruppeId, nutzerId) {
    return mit(function (c) {
      return c.from("mitglied").delete().eq("gruppe_id", gruppeId).eq("nutzer_id", nutzerId).then(auspacken);
    });
  }

  /* ================================================== Beiträge */

  var LISTE = "id, autor_id, gruppe_id, art, titel, text, lernfeld, kapitel, datei_pfad, datei_art, " +
              "an_mentoren, geloest, versteckt, erstellt_am, bearbeitet_am, autor_name, autor_rolle, " +
              "autor_lehrjahr, gruppe_name, antworten, hilfreich_zahl, von_mir_hilfreich";

  /* filter: { gruppe: id | "alle" (nur allgemeine) | undefined (alles Sichtbare),
               art, lernfeld, kapitel, anMentoren, offen (nur ungelöste Fragen),
               ohneAusgeblendete (Autor:in und Team bekommen sonst auch
               ausgeblendete Beiträge), nach ({ zeit, id } aus beitragSeite),
               anzahl }
     Reihenfolge: neueste zuerst, bei gleicher Zeit nach id – so ist die
     nächste Seite eindeutig, auch wenn mehrere Beiträge dieselbe Zeit haben. */
  function beitragAbfrage(c, f, anzahl) {
    var q = c.from("beitrag_liste").select(LISTE)
      .order("erstellt_am", { ascending: false }).order("id", { ascending: false }).limit(anzahl);
    if (f.gruppe === "alle") q = q.is("gruppe_id", null);
    else if (f.gruppe) q = q.eq("gruppe_id", f.gruppe);
    if (f.art) q = q.eq("art", f.art);
    if (f.lernfeld) q = q.eq("lernfeld", f.lernfeld);
    if (f.kapitel) q = q.eq("kapitel", f.kapitel);
    if (f.anMentoren) q = q.eq("an_mentoren", true);
    if (f.offen) q = q.eq("geloest", false);
    if (f.ohneAusgeblendete) q = q.eq("versteckt", false);
    if (f.nach) {
      var zeit = String(f.nach.zeit).replace(/"/g, ""), id = String(f.nach.id).replace(/[^0-9a-f-]/gi, "");
      q = q.or('erstellt_am.lt."' + zeit + '",and(erstellt_am.eq."' + zeit + '",id.lt.' + id + ')');
    }
    return q;
  }

  function beitraege(filter) {
    var f = filter || {};
    return gebunden(function (u, c) { return beitragAbfrage(c, f, f.anzahl || CFG.seite).then(auspacken); });
  }

  // Eine Seite samt Merkzeichen für die nächste: { zeilen, weiter: {zeit,id} | null }.
  function beitragSeite(filter) {
    var f = filter || {};
    var n = Math.max(1, Math.min(f.anzahl || CFG.seite, 120));
    return gebunden(function (u, c) {
      return beitragAbfrage(c, f, n + 1).then(auspacken).then(function (zeilen) {
        zeilen = zeilen || [];
        var mehr = zeilen.length > n;
        if (mehr) zeilen = zeilen.slice(0, n);
        var letzte = zeilen[zeilen.length - 1];
        return { zeilen: zeilen, weiter: mehr && letzte ? { zeit: letzte.erstellt_am, id: letzte.id } : null };
      });
    });
  }

  function beitrag(id) {
    return gebunden(function (u, c) {
      return c.from("beitrag_liste").select(LISTE).eq("id", id).maybeSingle().then(auspacken);
    });
  }

  function dateiPruefen(datei) {
    if (!datei) return null;
    var art = CFG.dateiArten[datei.type];
    if (!art) return fehler("Erlaubt sind nur JPG, PNG, WebP oder PDF.", "eingabe");
    if (datei.size > CFG.dateiGroesse) return fehler("Die Datei ist größer als 5 MB.", "eingabe");
    return null;
  }

  function zufallsname() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  // Zeichen zählen wie SQL char_length: Codepunkte, nicht UTF-16-Einheiten.
  function laenge(t) { return Array.from(String(t || "")).length; }

  function neueVorgangskennung() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    var h = Array.from({ length: 32 }, function () { return Math.floor(Math.random() * 16).toString(16); }).join("");
    return h.slice(0, 8) + "-" + h.slice(8, 12) + "-4" + h.slice(13, 16) + "-a" + h.slice(17, 20) + "-" + h.slice(20, 32);
  }

  // Gilt der Beitragsteil für dieses Konto? (serverseitige Paketsperre, Spec 05)
  function beitraegeFrei() {
    return gebunden(function (u, c) { return c.rpc("beitraege_frei").then(auspacken); })
      .then(function (r) { return r === true; });
  }

  function unklar(meldung, vorgang, ursache) {
    var e = fehler(meldung, "unklar", ursache);
    e.vorgang = vorgang;
    return e;
  }

  /* G03/C01: Steht fest, dass der Server die Anfrage nicht ausgeführt oder
     zurückgerollt hat? Nur bei einem Postgres-Fehlercode (die Transaktion ist
     beendet) oder einem einzeln aufgeführten PostgREST-Code, der vor der
     Ausführung entsteht: Anfrage nicht lesbar (PGRST100–108, 117), Funktion
     oder Spalte nicht im Schema (PGRST200–205), Anmeldung ungültig
     (PGRST300–303). Bewusst NICHT dabei: Fehler bei der Antwortbildung
     (z. B. PGRST111, 112, 116, 121) und jeder unbekannte Code – auch aus
     derselben Gruppe. Alles andere, Verbindungsabbruch, HTTP 5xx und Gateway
     inklusive, heißt: Ausgang unklar. r = { error, status } von supabase-js. */
  var VOR_AUSFUEHRUNG = ["PGRST100", "PGRST101", "PGRST102", "PGRST103", "PGRST105", "PGRST106",
                         "PGRST107", "PGRST108", "PGRST117", "PGRST200", "PGRST201", "PGRST202",
                         "PGRST203", "PGRST204", "PGRST205", "PGRST300", "PGRST301", "PGRST302",
                         "PGRST303"];
  function sicherAbgelehnt(r) {
    var e = (r && r.error) || {};
    var code = String(e.code || "");
    var st = Number((r && r.status) || 0);
    if (/^(P0001|22\w{3}|23\w{3}|42\w{3}|40001|40P01|57014)$/.test(code)) return true;
    if (VOR_AUSFUEHRUNG.indexOf(code) >= 0 && st > 0 && st < 500) return true;
    if (!code && (st === 401 || st === 403 || st === 429)) return true;
    return false;
  }

  // Ergebnis einer Schreib-RPC: Daten, sichere Ablehnung oder "unklar".
  function rpcErgebnis(r, vorgang, unklarText) {
    if (!r.error) return r.data;
    if (sicherAbgelehnt(r)) throw uebersetzen(r.error);
    throw unklar(unklarText, vorgang, r.error);
  }

  function dateiPfad(konto, vorgang, datei) {
    var art = datei && CFG.dateiArten[datei.type];
    return art ? konto + "/" + vorgang + "." + art[1] : null;
  }

  /* G03: Klärt einen Vorgang endgültig. Ergebnis "angelegt" (Inhalt existiert
     oder wird gerade festgeschrieben) oder "verworfen" (kann nie mehr
     ankommen). Erst bei "verworfen" wird die Datei des Vorgangs entfernt; ein
     Fehler dabei lässt sie im eigenen privaten Ordner liegen. Wiederholbar. */
  function vorgangKlaeren(vorgang, art, datei) {
    if (!vorgang || (art !== "beitrag" && art !== "antwort"))
      return Promise.reject(fehler("Vorgangskennung fehlt.", "eingabe"));
    var text = "Wir konnten nicht prüfen, ob der Vorgang abgeschlossen ist.";
    return gebunden(function (u, c) {
      return c.rpc("vorgang_klaeren", { p_vorgang: vorgang, p_art: art }).then(function (r) {
        var zustand = rpcErgebnis(r, vorgang, text);
        var pfad = zustand === "verworfen" ? dateiPfad(u.id, vorgang, datei) : null;
        if (!pfad) return zustand;
        return c.storage.from(CFG.bucket).remove([pfad]).then(function () { return zustand; },
                                                             function () { return zustand; });
      }, function (f) { throw unklar(text, vorgang, f); });
    });
  }

  /* e: { vorgang, art, titel, text, lernfeld, kapitel, anMentoren, datei (File),
          schritt (optional: wird nach dem Hochladen mit "veroeffentlichen" gerufen) }
     Spec 05: Jeder Vorgang hat eine Kennung, die zur Beitrags-ID wird. Wer mit
     derselben Kennung erneut sendet, bekommt denselben Beitrag – nie zwei.
     Ergebnis: Beitrags-ID. Fehlerarten: "eingabe", "bremse", "rechte" … =
     sicher nicht veröffentlicht (sicherAbgelehnt); "unklar" = Ausgang offen:
     Status lesen (beitragStatus), unverändert mit derselben Kennung wiederholen
     oder mit vorgangKlaeren endgültig klären. Nach einem Fehler wird die Datei
     hier nie entfernt (G03) – das macht nur vorgangKlaeren bei "verworfen".
     Ziel ist immer „für alle“.
     Mit e.gruppe bleibt der alte direkte Weg (nur Datenschicht-Tests). */
  function veroeffentlichen(e) {
    e = e || {};
    if (ARTEN.indexOf(e.art) < 0) return Promise.reject(fehler("Unbekannte Beitragsart.", "eingabe"));
    var titel = String(e.titel || "").trim();
    if (laenge(titel) < 3 || laenge(titel) > 120)
      return Promise.reject(fehler("Der Titel braucht 3 bis 120 Zeichen.", "eingabe"));
    if (laenge(e.text) > 4000)
      return Promise.reject(fehler("Der Text darf höchstens 4000 Zeichen lang sein.", "eingabe"));
    if (e.kapitel && !e.lernfeld)
      return Promise.reject(fehler("Zum Kapitel gehört ein Lernfeld.", "eingabe"));
    if (e.art === "lernzettel" && !e.datei)
      return Promise.reject(fehler("Ein Lernzettel braucht eine Datei.", "eingabe"));
    var datei = e.art === "lernzettel" ? e.datei : null;    // nie als Anhang einer Frage/eines Tipps
    var dateiFehler = dateiPruefen(datei);
    if (dateiFehler) return Promise.reject(dateiFehler);
    if (e.gruppe) return veroeffentlichenDirekt(e, titel);

    var vorgang = e.vorgang || neueVorgangskennung();
    var pfad = null, dateiArt = null;
    return gebunden(function (u, c) {
      var g = generation;
      function nochGleich() { if (g !== generation || (kontoId !== undefined && kontoId !== u.id)) throw VERALTET(); }
      var hoch = Promise.resolve();
      if (datei) {
        var art = CFG.dateiArten[datei.type];
        pfad = u.id + "/" + vorgang + "." + art[1];
        dateiArt = art[0];
        hoch = c.storage.from(CFG.bucket)
          .upload(pfad, datei, { contentType: datei.type, upsert: false, cacheControl: "60" })
          .then(function (r) {
            // Schon da (zweiter Versuch desselben Vorgangs): gilt als hochgeladen.
            if (r && r.error && !/exists|Duplicate/i.test(String(r.error.message || r.error.error || ""))
                && Number(r.error.statusCode) !== 409) throw r.error;
          });
      }
      return hoch.then(function () {
        nochGleich();
        if (datei && typeof e.schritt === "function") { try { e.schritt("veroeffentlichen"); } catch (x) {} }
        return c.rpc("beitrag_veroeffentlichen", {
          p_vorgang: vorgang, p_art: e.art, p_titel: titel, p_text: String(e.text || ""),
          p_lernfeld: e.lernfeld || null, p_kapitel: e.kapitel || null,
          p_an_mentoren: e.art === "frage" && e.anMentoren === true,
          p_datei_pfad: pfad, p_datei_art: dateiArt
        }).then(function (r) {
          return rpcErgebnis(r, vorgang, "Wir konnten nicht prüfen, ob dein Beitrag veröffentlicht wurde.");
        }, function (f) {
          throw unklar("Wir konnten nicht prüfen, ob dein Beitrag veröffentlicht wurde.", vorgang, f);
        });
      });
    });
  }

  // Alter, direkter Weg – nur noch für Gruppenbeiträge der Datenschicht-Tests.
  function veroeffentlichenDirekt(e, titel) {
    var pfad = null, dateiArt = null;
    return ich().then(function (u) {
      if (!e.datei) return null;
      var art = CFG.dateiArten[e.datei.type];
      pfad = u.id + "/" + zufallsname() + "." + art[1];
      dateiArt = art[0];
      return client.storage.from(CFG.bucket)
        .upload(pfad, e.datei, { contentType: e.datei.type, upsert: false, cacheControl: "60" })
        .then(auspacken);
    }).then(function () {
      return client.from("beitrag").insert({
        art: e.art, titel: titel, text: String(e.text || ""),
        lernfeld: e.lernfeld || null, kapitel: e.kapitel || null,
        gruppe_id: e.gruppe || null, an_mentoren: e.anMentoren === true,
        datei_pfad: pfad, datei_art: dateiArt
      }).select("id").single().then(auspacken);
    }).then(function (d) { return d.id; })
      .catch(function (f) {
        if (pfad) client.storage.from(CFG.bucket).remove([pfad]).catch(function () {});
        throw uebersetzen(f);
      });
  }

  // Gibt es den Beitrag zu dieser Vorgangskennung? id oder null.
  function beitragStatus(vorgang) {
    return gebunden(function (u, c) {
      return c.from("beitrag").select("id").eq("id", vorgang).eq("autor_id", u.id).maybeSingle().then(auspacken);
    }).then(function (d) { return d ? d.id : null; });
  }

  function beitragAendern(id, felder) {
    var erlaubt = {};
    ["titel", "text", "lernfeld", "kapitel", "an_mentoren", "geloest"].forEach(function (k) {
      if (felder && Object.prototype.hasOwnProperty.call(felder, k)) erlaubt[k] = felder[k];
    });
    return mit(function (c) { return c.from("beitrag").update(erlaubt).eq("id", id).then(auspacken); });
  }

  /* Löscht den Beitrag und danach seine Datei. Gelingt nur das Löschen der
     Datei nicht, kommt ein Fehler der Art "datei" mit f.dateiPfad zurück –
     dateiEntfernen(f.dateiPfad) versucht es erneut. Andere sehen die Datei
     schon nach dem Löschen des Beitrags nicht mehr (die Leseregel verlangt
     einen sichtbaren Beitrag); der Rest betrifft nur den eigenen Ordner. */
  function beitragLoeschen(id) {
    return mit(function (c) {
      return c.from("beitrag").select("datei_pfad").eq("id", id).maybeSingle().then(auspacken)
        .then(function (b) {
          return c.from("beitrag").delete().eq("id", id).then(auspacken).then(function () {
            if (b && b.datei_pfad) return dateiEntfernen(b.datei_pfad);
          });
        });
    });
  }

  function dateiEntfernen(pfad) {
    function nichtGeloescht(ursache) {
      var e = fehler("Der Beitrag ist gelöscht, seine Datei aber noch nicht. Versuch es erneut.", "datei", ursache);
      e.dateiPfad = pfad;
      return e;
    }
    return verbinden().then(function (c) {
      return c.storage.from(CFG.bucket).remove([pfad]);
    }).then(function (r) {
      if (r && r.error) throw nichtGeloescht(r.error);
      // remove() meldet still „nichts gelöscht“, wenn die Regel es verbietet.
      var weg = r && r.data ? r.data.length : 0;
      if (!weg) throw nichtGeloescht();
      return true;
    }, function (f) { throw nichtGeloescht(f); });
  }

  /* Dateien liegen privat und kommen nur über den angemeldeten Abruf: Bei
     jedem Abruf prüft die Speicherregel neu, ob der zugehörige Beitrag für
     diese Person gerade sichtbar ist. Es gibt keine weitergebbaren Links.
     Ergebnis: { blob, url, art } – url ist eine Adresse nur in diesem Tab
     (blob:…); freigeben() gibt sie wieder frei. Grenzen stehen in
     supabase/README.md („Dateizugriff“). */
  function dateiLaden(pfad) {
    if (!pfad) return Promise.reject(fehler("Zu diesem Beitrag gehört keine Datei.", "eingabe"));
    return gebunden(function (u, c) {
      return c.storage.from(CFG.bucket).download(pfad, { cacheNonce: String(Date.now()) }).then(function (r) {
        if (r && r.error) {
          var st = Number(r.error.statusCode || r.error.status || 0);
          if (st === 400 || st === 404 || /not found|Object not found/i.test(String(r.error.message || "")))
            throw fehler("Die Datei ist für dich nicht verfügbar.", "rechte", r.error);
          throw r.error;
        }
        return r.data;
      });
    }).then(function (blob) {
      return { blob: blob, url: URL.createObjectURL(blob), art: blob.type };
    });
  }

  function dateiFreigeben(d) { try { if (d && d.url) URL.revokeObjectURL(d.url); } catch (e) {} }

  /* ================================================== Antworten und Hilfreich */

  function antworten(beitragId) {
    return gebunden(function (u, c) {
      return c.from("antwort")
        .select("id, beitrag_id, autor_id, text, beste, versteckt, erstellt_am, autor:profil(anzeigename, rolle, lehrjahr)")
        .eq("beitrag_id", beitragId)
        .order("beste", { ascending: false }).order("erstellt_am").order("id")
        .then(auspacken);
    });
  }

  /* Spec 05: wie veroeffentlichen mit Vorgangskennung; "unklar" heißt Status
     prüfen (antwortStatus), nicht blind neu senden. */
  function antwortSchreiben(beitragId, text, vorgang) {
    var t = String(text || "").trim();
    if (!t) return Promise.reject(fehler("Die Antwort braucht 1 bis 2000 Zeichen.", "eingabe"));
    if (laenge(t) > 2000) return Promise.reject(fehler("Die Antwort braucht 1 bis 2000 Zeichen.", "eingabe"));
    var v = vorgang || neueVorgangskennung();
    return gebunden(function (u, c) {
      return c.rpc("antwort_senden", { p_vorgang: v, p_beitrag: beitragId, p_text: t }).then(function (r) {
        return rpcErgebnis(r, v, "Wir konnten nicht prüfen, ob deine Antwort gesendet wurde.");
      }, function (f) { throw unklar("Wir konnten nicht prüfen, ob deine Antwort gesendet wurde.", v, f); });
    });
  }

  function antwortStatus(vorgang) {
    return gebunden(function (u, c) {
      return c.from("antwort").select("id").eq("id", vorgang).eq("autor_id", u.id).maybeSingle().then(auspacken);
    }).then(function (d) { return d ? d.id : null; });
  }

  function antwortAendern(id, text) {
    return mit(function (c) { return c.from("antwort").update({ text: String(text || "").trim() }).eq("id", id).then(auspacken); });
  }

  function antwortLoeschen(id) {
    return mit(function (c) { return c.from("antwort").delete().eq("id", id).then(auspacken); });
  }

  /* G05: setzt den gewünschten Zustand (beste = true/false), schaltet nie um.
     Eine Wiederholung nach verlorener Bestätigung bewirkt nichts Gegenteiliges.
     "unklar" = Zustand neu lesen, bevor erneut geklickt werden kann. */
  function besteAntwort(antwortId, beste) {
    if (typeof beste !== "boolean")
      return Promise.reject(fehler("Gewünschter Zustand fehlt.", "eingabe"));
    var text = "Wir konnten nicht prüfen, ob die Markierung geändert wurde.";
    return gebunden(function (u, c) {
      return c.rpc("beste_antwort_setzen", { p_antwort: antwortId, p_beste: beste }).then(function (r) {
        return rpcErgebnis(r, antwortId, text);
      }, function (f) { throw unklar(text, antwortId, f); });
    });
  }

  // Gibt den neuen Zustand zurück: true = jetzt hilfreich markiert.
  function hilfreich(beitragId, an) {
    return mit(function (c) {
      if (an) {
        return c.from("hilfreich").insert({ beitrag_id: beitragId }).then(function (r) {
          if (r.error && r.error.code === "23505") return true;     // war schon markiert
          auspacken(r); return true;
        });
      }
      return ich().then(function (u) {
        return c.from("hilfreich").delete().eq("beitrag_id", beitragId).eq("nutzer_id", u.id)
          .then(auspacken).then(function () { return false; });
      });
    });
  }

  /* ================================================== Wochenaufgaben */

  function aufgaben(filter) {
    var f = filter || {};
    return mit(function (c) {
      var q = c.from("aufgabe_liste")
        .select("id, gruppe_id, gruppe_name, titel, beschreibung, lernfeld, kapitel, beginn, ende, erstellt_am, erledigt_zahl, von_mir_erledigt")
        .order("ende", { ascending: true });
      if (f.gruppe === "alle") q = q.is("gruppe_id", null);
      else if (f.gruppe) q = q.eq("gruppe_id", f.gruppe);
      if (f.laufend) {
        var heute = AP.tagesschluessel ? AP.tagesschluessel() : new Date().toISOString().slice(0, 10);
        q = q.lte("beginn", heute).gte("ende", heute);
      }
      return q.then(auspacken);
    });
  }

  function aufgabeStellen(e) {
    e = e || {};
    var titel = String(e.titel || "").trim();
    if (titel.length < 3 || titel.length > 120)
      return Promise.reject(fehler("Der Titel braucht 3 bis 120 Zeichen.", "eingabe"));
    var zeile = { titel: titel, beschreibung: String(e.beschreibung || ""), gruppe_id: e.gruppe || null,
                  lernfeld: e.lernfeld || null, kapitel: e.kapitel || null };
    if (e.beginn) zeile.beginn = e.beginn;
    if (e.ende) zeile.ende = e.ende;
    return mit(function (c) {
      return c.from("wochenaufgabe").insert(zeile).select("id").single()
        .then(auspacken).then(function (d) { return d.id; });
    });
  }

  function aufgabeLoeschen(id) {
    return mit(function (c) { return c.from("wochenaufgabe").delete().eq("id", id).then(auspacken); });
  }

  function erledigt(aufgabeId, an) {
    return mit(function (c) {
      if (an) {
        return c.from("erledigt").insert({ aufgabe_id: aufgabeId }).then(function (r) {
          if (r.error && r.error.code === "23505") return true;
          auspacken(r); return true;
        });
      }
      return ich().then(function (u) {
        return c.from("erledigt").delete().eq("aufgabe_id", aufgabeId).eq("nutzer_id", u.id)
          .then(auspacken).then(function () { return false; });
      });
    });
  }

  // Wer hat erledigt? Für die stille Liste in der Gruppe – Namen, keine Punkte.
  function erledigtVon(aufgabeId) {
    return mit(function (c) {
      return c.from("erledigt").select("nutzer_id, erledigt_am, profil(anzeigename)")
        .eq("aufgabe_id", aufgabeId).order("erledigt_am").then(auspacken);
    });
  }

  /* ================================================== Melden und Moderation */

  /* e: { beitrag | antwort, grund, hinweis } */
  function melden(e) {
    e = e || {};
    if (GRUENDE.indexOf(e.grund) < 0) return Promise.reject(fehler("Bitte wähle einen Grund.", "eingabe"));
    if (!!e.beitrag === !!e.antwort) return Promise.reject(fehler("Was soll gemeldet werden?", "eingabe"));
    return mit(function (c) {
      return c.from("meldung").insert({
        beitrag_id: e.beitrag || null, antwort_id: e.antwort || null,
        grund: e.grund, hinweis: String(e.hinweis || "").slice(0, 500)
      }).then(function (r) {
        if (r.error && r.error.code === "23505") throw fehler("Das hast du schon gemeldet. Das Team schaut es sich an.", "eingabe");
        return auspacken(r);
      });
    });
  }

  function offeneMeldungen() {
    return mit(function (c) {
      return c.from("meldung")
        .select("id, grund, hinweis, status, erstellt_am, beitrag_id, antwort_id, " +
                "beitrag(id, titel, art, versteckt), antwort(id, text, versteckt, beitrag_id)")
        .eq("status", "offen").order("erstellt_am").then(auspacken);
    });
  }

  function moderieren(art, id, versteckt) {
    return mit(function (c) {
      return c.rpc("moderieren", { p_art: art, p_id: id, p_versteckt: versteckt === true }).then(auspacken);
    });
  }

  function meldungErledigt(id) {
    return mit(function (c) { return c.from("meldung").update({ status: "erledigt" }).eq("id", id).then(auspacken); });
  }

  function rolleSetzen(nutzerId, rolle) {
    return mit(function (c) { return c.rpc("rolle_setzen", { p_nutzer: nutzerId, p_rolle: rolle }).then(auspacken); });
  }

  /* ================================================== Live */

  // Meldet neue Beiträge und Antworten, solange die Community offen ist.
  // Gibt eine Funktion zum Abmelden zurück.
  function live(beiNeuem) {
    var kanal = null, aus = false;
    verbinden().then(function (c) {
      if (aus) return;
      kanal = c.channel("community")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "beitrag" },
            function (p) { beiNeuem("beitrag", p.new); })
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "antwort" },
            function (p) { beiNeuem("antwort", p.new); })
        .subscribe();
    }).catch(function () {});
    return function () { aus = true; if (kanal && client) client.removeChannel(kanal); };
  }

  /* ================================================== Nach außen */

  AP.community = {
    CFG: CFG, GRUENDE: GRUENDE, ARTEN: ARTEN,
    verbinden: verbinden, beiAenderung: beiAenderung, linkEinloesen: linkEinloesen,
    // Wer ist laut letztem Auth-Ereignis angemeldet? undefined = noch unbekannt, null = niemand.
    kontoJetzt: function () { return kontoId; },
    // Prüffunktion für eine Anfrage: true, solange Konto und Generation gleich sind.
    bindung: function () { var g = generation, k = kontoId; return function () { return g === generation && k === kontoId; }; },
    anmeldenPerMail: anmeldenPerMail, codePruefen: codePruefen,
    sitzung: sitzung, abmelden: abmelden,
    profil: profil, profilAnlegen: profilAnlegen, profilAendern: profilAendern,
    gruppen: gruppen, gruppe: gruppe, gruppeGruenden: gruppeGruenden,
    gruppeBeitreten: gruppeBeitreten, offenerGruppeBeitreten: offenerGruppeBeitreten,
    gruppeVerlassen: gruppeVerlassen, gruppeAendern: gruppeAendern, gruppenCode: gruppenCode,
    mitglieder: mitglieder, mitgliedRolle: mitgliedRolle, mitgliedEntfernen: mitgliedEntfernen,
    beitraege: beitraege, beitragSeite: beitragSeite, beitrag: beitrag, veroeffentlichen: veroeffentlichen,
    beitragStatus: beitragStatus, beitraegeFrei: beitraegeFrei, neueVorgangskennung: neueVorgangskennung, laenge: laenge,
    vorgangKlaeren: vorgangKlaeren, sicherAbgelehnt: sicherAbgelehnt,
    beitragAendern: beitragAendern, beitragLoeschen: beitragLoeschen, dateiEntfernen: dateiEntfernen,
    dateiLaden: dateiLaden, dateiFreigeben: dateiFreigeben,
    dateiPruefen: dateiPruefen,
    antworten: antworten, antwortSchreiben: antwortSchreiben, antwortStatus: antwortStatus, antwortAendern: antwortAendern,
    antwortLoeschen: antwortLoeschen, besteAntwort: besteAntwort, hilfreich: hilfreich,
    aufgaben: aufgaben, aufgabeStellen: aufgabeStellen, aufgabeLoeschen: aufgabeLoeschen,
    erledigt: erledigt, erledigtVon: erledigtVon,
    melden: melden, offeneMeldungen: offeneMeldungen, moderieren: moderieren,
    meldungErledigt: meldungErledigt, rolleSetzen: rolleSetzen,
    live: live
  };

  // Aus einem Anmelde-Link geöffnet? Dann gleich einlösen. Die Oberfläche
  // wartet auf dieses Versprechen, bevor sie irgendetwas über die Sitzung sagt.
  AP.community.linkEinloesung = null;
  if (linkParameter().aus) {
    AP.community.linkEinloesung = linkEinloesen();
    AP.community.linkEinloesung.catch(function () {});
  }
})();
