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
        if (ereignis === "SIGNED_OUT") profilCache = undefined;
        if (ereignis === "SIGNED_IN" || ereignis === "TOKEN_REFRESHED") {
          if (!sitzung || !profilCache || profilCache.id !== sitzung.user.id) profilCache = undefined;
        }
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
    var c6 = String(code || "").replace(/\D/g, "");
    if (c6.length < 6) return Promise.reject(fehler("Der Code hat sechs Ziffern.", "eingabe"));
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
      profilCache = undefined;
      return c.auth.signOut({ scope: "local" }).then(auspacken);
    });
  }

  function ich() {
    return sitzung().then(function (s) {
      if (!s) throw fehler("Bitte melde dich zuerst an.", "anmeldung");
      return s.user;
    });
  }

  // Kam die Seite gerade aus einem Anmelde-Link? Dann sofort verbinden, damit
  // der Code eingelöst wird, und die Adresse danach aufräumen.
  function linkEinloesen() {
    var q = new URLSearchParams(location.search);
    if (!q.has("code") && !q.has("error_description") && !q.has("anmeldung")) return Promise.resolve(null);
    var meldung = q.get("error_description");
    return verbinden().then(function (c) {
      return c.auth.getSession();
    }).then(function (r) {
      aufraeumen();
      if (meldung) throw fehler(/expired/i.test(meldung)
        ? "Der Anmelde-Link ist abgelaufen. Lass dir einen neuen schicken."
        : "Der Anmelde-Link hat nicht funktioniert. Lass dir einen neuen schicken.", "anmeldung");
      return r && r.data ? r.data.session : null;
    }).catch(function (f) { aufraeumen(); throw uebersetzen(f); });
  }

  function aufraeumen() {
    try {
      history.replaceState(null, "", location.pathname + (location.hash || "#community"));
    } catch (e) {}
  }

  /* ================================================== Profil */

  var profilCache;                                    // undefined = unbekannt, null = keins
  var PROFIL = "id, anzeigename, lehrjahr, ueber_mich, rolle, erstellt_am";

  function profil(frisch) {
    if (profilCache !== undefined && !frisch) return Promise.resolve(profilCache);
    return ich().then(function (u) {
      return client.from("profil").select(PROFIL).eq("id", u.id).maybeSingle().then(auspacken);
    }).then(function (p) { profilCache = p || null; return profilCache; })
      .catch(function (f) { throw uebersetzen(f); });
  }

  function profilAnlegen(eingabe) {
    var e = eingabe || {};
    var name = String(e.anzeigename || "").trim();
    if (name.length < 2 || name.length > 30)
      return Promise.reject(fehler("Der Anzeigename braucht 2 bis 30 Zeichen.", "eingabe"));
    var jahr = e.lehrjahr ? Number(e.lehrjahr) : null;
    if (jahr !== null && [1, 2, 3].indexOf(jahr) < 0)
      return Promise.reject(fehler("Lehrjahr 1, 2 oder 3.", "eingabe"));
    return mit(function (c) {
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
    return ich().then(function (u) {
      return client.from("profil").update(erlaubt).eq("id", u.id).select(PROFIL).single().then(auspacken);
    }).then(function (p) { profilCache = p; return p; })
      .catch(function (f) { throw uebersetzen(f); });
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

  /* filter: { gruppe: id | "alle" (nur öffentliche) | undefined (alles Sichtbare),
               art, lernfeld, kapitel, anMentoren, offen (nur ungelöste Fragen),
               vor (ISO-Zeit für die nächste Seite), anzahl } */
  function beitraege(filter) {
    var f = filter || {};
    return mit(function (c) {
      var q = c.from("beitrag_liste").select(LISTE)
        .order("erstellt_am", { ascending: false }).limit(f.anzahl || CFG.seite);
      if (f.gruppe === "alle") q = q.is("gruppe_id", null);
      else if (f.gruppe) q = q.eq("gruppe_id", f.gruppe);
      if (f.art) q = q.eq("art", f.art);
      if (f.lernfeld) q = q.eq("lernfeld", f.lernfeld);
      if (f.kapitel) q = q.eq("kapitel", f.kapitel);
      if (f.anMentoren) q = q.eq("an_mentoren", true);
      if (f.offen) q = q.eq("geloest", false);
      if (f.vor) q = q.lt("erstellt_am", f.vor);
      return q.then(auspacken);
    });
  }

  function beitrag(id) {
    return mit(function (c) { return c.from("beitrag_liste").select(LISTE).eq("id", id).maybeSingle().then(auspacken); });
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

  /* e: { art, titel, text, lernfeld, kapitel, gruppe, anMentoren, datei (File) } */
  function veroeffentlichen(e) {
    e = e || {};
    if (ARTEN.indexOf(e.art) < 0) return Promise.reject(fehler("Unbekannte Beitragsart.", "eingabe"));
    var titel = String(e.titel || "").trim();
    if (titel.length < 3 || titel.length > 120)
      return Promise.reject(fehler("Der Titel braucht 3 bis 120 Zeichen.", "eingabe"));
    if (String(e.text || "").length > 4000)
      return Promise.reject(fehler("Der Text darf höchstens 4000 Zeichen lang sein.", "eingabe"));
    if (e.kapitel && !e.lernfeld)
      return Promise.reject(fehler("Zum Kapitel gehört ein Lernfeld.", "eingabe"));
    if (e.art === "lernzettel" && !e.datei)
      return Promise.reject(fehler("Ein Lernzettel braucht eine Datei.", "eingabe"));
    var dateiFehler = dateiPruefen(e.datei);
    if (dateiFehler) return Promise.reject(dateiFehler);

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
        // Ohne Beitrag soll keine verwaiste Datei liegen bleiben.
        if (pfad) client.storage.from(CFG.bucket).remove([pfad]).catch(function () {});
        throw uebersetzen(f);
      });
  }

  function beitragAendern(id, felder) {
    var erlaubt = {};
    ["titel", "text", "lernfeld", "kapitel", "an_mentoren", "geloest"].forEach(function (k) {
      if (felder && Object.prototype.hasOwnProperty.call(felder, k)) erlaubt[k] = felder[k];
    });
    return mit(function (c) { return c.from("beitrag").update(erlaubt).eq("id", id).then(auspacken); });
  }

  function beitragLoeschen(id) {
    return mit(function (c) {
      return c.from("beitrag").select("datei_pfad").eq("id", id).maybeSingle().then(auspacken)
        .then(function (b) {
          return c.from("beitrag").delete().eq("id", id).then(auspacken).then(function () {
            if (b && b.datei_pfad) return c.storage.from(CFG.bucket).remove([b.datei_pfad]).catch(function () {});
          });
        });
    });
  }

  // Dateien liegen privat. Angezeigt wird über einen Link, der eine Stunde gilt.
  // Zwischengespeichert wird nur 60 Sekunden – sonst bliebe ein gelöschter
  // oder ausgeblendeter Lernzettel über einen alten Link noch eine Weile sichtbar.
  function dateiAdresse(pfad) {
    return mit(function (c) {
      return c.storage.from(CFG.bucket).createSignedUrl(pfad, 3600).then(auspacken)
        .then(function (d) { return d.signedUrl; });
    });
  }

  /* ================================================== Antworten und Hilfreich */

  function antworten(beitragId) {
    return mit(function (c) {
      return c.from("antwort")
        .select("id, beitrag_id, autor_id, text, beste, versteckt, erstellt_am, autor:profil(anzeigename, rolle, lehrjahr)")
        .eq("beitrag_id", beitragId)
        .order("beste", { ascending: false }).order("erstellt_am")
        .then(auspacken);
    });
  }

  function antwortSchreiben(beitragId, text) {
    var t = String(text || "").trim();
    if (!t) return Promise.reject(fehler("Die Antwort ist leer.", "eingabe"));
    if (t.length > 2000) return Promise.reject(fehler("Die Antwort darf höchstens 2000 Zeichen lang sein.", "eingabe"));
    return mit(function (c) {
      return c.from("antwort").insert({ beitrag_id: beitragId, text: t }).select("id").single()
        .then(auspacken).then(function (d) { return d.id; });
    });
  }

  function antwortAendern(id, text) {
    return mit(function (c) { return c.from("antwort").update({ text: String(text || "").trim() }).eq("id", id).then(auspacken); });
  }

  function antwortLoeschen(id) {
    return mit(function (c) { return c.from("antwort").delete().eq("id", id).then(auspacken); });
  }

  function besteAntwort(antwortId) {
    return mit(function (c) { return c.rpc("beste_antwort", { p_antwort: antwortId }).then(auspacken); });
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
    anmeldenPerMail: anmeldenPerMail, codePruefen: codePruefen,
    sitzung: sitzung, abmelden: abmelden,
    profil: profil, profilAnlegen: profilAnlegen, profilAendern: profilAendern,
    gruppen: gruppen, gruppe: gruppe, gruppeGruenden: gruppeGruenden,
    gruppeBeitreten: gruppeBeitreten, offenerGruppeBeitreten: offenerGruppeBeitreten,
    gruppeVerlassen: gruppeVerlassen, gruppeAendern: gruppeAendern, gruppenCode: gruppenCode,
    mitglieder: mitglieder, mitgliedRolle: mitgliedRolle, mitgliedEntfernen: mitgliedEntfernen,
    beitraege: beitraege, beitrag: beitrag, veroeffentlichen: veroeffentlichen,
    beitragAendern: beitragAendern, beitragLoeschen: beitragLoeschen, dateiAdresse: dateiAdresse,
    dateiPruefen: dateiPruefen,
    antworten: antworten, antwortSchreiben: antwortSchreiben, antwortAendern: antwortAendern,
    antwortLoeschen: antwortLoeschen, besteAntwort: besteAntwort, hilfreich: hilfreich,
    aufgaben: aufgaben, aufgabeStellen: aufgabeStellen, aufgabeLoeschen: aufgabeLoeschen,
    erledigt: erledigt, erledigtVon: erledigtVon,
    melden: melden, offeneMeldungen: offeneMeldungen, moderieren: moderieren,
    meldungErledigt: meldungErledigt, rolleSetzen: rolleSetzen,
    live: live
  };

  // Aus einem Anmelde-Link geöffnet? Dann gleich einlösen.
  if (/[?&](code|anmeldung|error_description)=/.test(location.search)) {
    linkEinloesen().catch(function (f) { AP.community.letzterFehler = f; });
  }
})();
