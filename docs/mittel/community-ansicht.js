/* AzubiPass · Community – Zugang
   ---------------------------------------------------------------------------
   Die Oberfläche für den Weg in die Community, gebaut nach
   doku/community/02-anmeldung-profil.md (Version 3) und den Entscheidungen
   vom 08.10.2026:

     A  Anmeldung              E-Mail eingeben, Link anfordern
     B  Mail versendet         Link öffnen oder sechsstelligen Code eingeben
     C  Prüfen                 Link einlösen, Sitzung und Profil prüfen
     D  Profil anlegen         Beta-Zugangscode, Anzeigename, Lehrjahr,
                               zwei Bestätigungen
     R  Community-Regeln       Dialog, aus D und aus dem Profil erreichbar

   Dazu die beiden Einstiege: die Zeile „Community" unter Ich und der kleine
   Abschnitt „Gemeinsam lernen" auf Heute.

   Mit dem Server spricht nur AP.community (community.js). Was hier steht,
   entscheidet nie über Rechte – das tun die Regeln in der Datenbank. Die
   Oberfläche zeigt nur nichts an, bevor die Prüfung durch ist.

   Drei Codes, die man nicht verwechseln darf, heißen überall gleich:
     Anmeldecode aus der E-Mail   sechs Ziffern, nur in B
     Beta-Zugangscode             vom Team, nur in D
     Gruppen-Code                 kommt erst mit den Lerngruppen             */

(function () {
  "use strict";

  var AP = window.AP;
  var el = AP.el;

  var ZIEL_SCHLUESSEL = "azubipass-community-ziel";   // sessionStorage, kein Doppelpunkt
  var regeln = null;                                   // aus inhalt.json
  var schirm = null;

  /* Was bleibt, solange die Seite offen ist: welche Ansicht, welche Adresse,
     was im Formular stand. Nichts davon landet im dauerhaften Speicher. */
  var z = {
    ansicht: null,        // anmeldung | versendet | pruefen | profil | drin | offline |
                          // profilfehler | unklar | nichtda
    mail: "",
    hinweis: null,        // { text, fehler } – eine Zeile oben in der Ansicht
    laeuft: false,        // eine Anfrage ist unterwegs: kein zweiter Klick
    profil: null,
    formular: { code: "", name: "", lehrjahr: "", alter: false, regeln: false },
    ziel: null
  };

  /* ================================================== Kleine Bauteile */

  function knopf(text, klasse, beiKlick) {
    var b = el("button", klasse || "kn-neben", text);
    b.type = "button";
    if (beiKlick) b.addEventListener("click", beiKlick);
    return b;
  }

  function verweis(text, ziel, klasse) {
    var a = el("a", klasse || "cm-verweis", text);
    a.href = ziel;
    return a;
  }

  // Die Überschrift einer Ansicht bekommt beim Wechsel den Fokus – so hört ein
  // Bildschirmleser, wo man jetzt ist, und die Tastatur fängt oben an.
  function kopf(titel, unter) {
    var k = el("div", "schirm-kopf cm-kopf");
    k.appendChild(el("p", "schirm-augenbraue", "Ich · Community"));
    var h = el("h1", null, titel);
    h.tabIndex = -1;
    k.appendChild(h);
    if (unter) k.appendChild(el("p", null, unter));
    return k;
  }

  function zurueckKnopf() {
    return knopf("‹ Zurück", "kn-neben cm-zurueck", function () {
      if (history.length > 1) history.back();
      else location.hash = "#ich";
    });
  }

  function hinweiszeile() {
    var p = el("p", "meldung");
    p.setAttribute("role", z.hinweis && z.hinweis.fehler ? "alert" : "status");
    if (z.hinweis) {
      if (z.hinweis.fehler) p.className = "meldung fehler";
      p.textContent = z.hinweis.text;
    }
    return p;
  }

  var feldNr = 0;
  /* Ein Eingabefeld mit dauerhaft sichtbarem Label, Hilfe und Fehlerzeile,
     beide über aria-describedby mit dem Feld verbunden. */
  function feld(o) {
    var id = "cm-f" + (++feldNr);
    var box = el("div", "cm-feld");
    var label = el("label", null, o.label);
    label.htmlFor = id;
    box.appendChild(label);
    var eingabe = o.select ? el("select") : el("input");
    eingabe.id = id;
    eingabe.className = "cm-eingabe";
    if (!o.select) {
      eingabe.type = o.typ || "text";
      Object.keys(o.attr || {}).forEach(function (k) { eingabe.setAttribute(k, o.attr[k]); });
    } else {
      o.select.forEach(function (w) {
        var opt = el("option", null, w[1]);
        opt.value = w[0];
        eingabe.appendChild(opt);
      });
    }
    eingabe.value = o.wert || "";
    box.appendChild(eingabe);
    var beschreibt = [];
    if (o.hilfe) {
      var hilfe = el("p", "cm-hilfe", o.hilfe);
      hilfe.id = id + "-h";
      box.appendChild(hilfe);
      beschreibt.push(hilfe.id);
    }
    var fehler = el("p", "cm-fehler");
    fehler.id = id + "-e";
    fehler.hidden = true;
    box.appendChild(fehler);
    beschreibt.push(fehler.id);
    eingabe.setAttribute("aria-describedby", beschreibt.join(" "));
    return { box: box, eingabe: eingabe, fehler: fehler, label: o.label };
  }

  function haken(text, an) {
    var id = "cm-f" + (++feldNr);
    var box = el("div", "cm-feld cm-haken-feld");
    var label = el("label", "cm-haken");
    label.htmlFor = id;
    var eingabe = el("input");
    eingabe.type = "checkbox";
    eingabe.id = id;
    eingabe.checked = !!an;              // nie vorausgewählt: kommt nur aus dem eigenen Klick
    label.appendChild(eingabe);
    label.appendChild(el("span", null, text));
    box.appendChild(label);
    var fehler = el("p", "cm-fehler");
    fehler.id = id + "-e";
    fehler.hidden = true;
    box.appendChild(fehler);
    eingabe.setAttribute("aria-describedby", fehler.id);
    return { box: box, eingabe: eingabe, fehler: fehler, label: text };
  }

  function fehlerSetzen(f, text) {
    f.fehler.textContent = text || "";
    f.fehler.hidden = !text;
    if (text) f.eingabe.setAttribute("aria-invalid", "true");
    else f.eingabe.removeAttribute("aria-invalid");
    f.box.classList.toggle("hat-fehler", !!text);
  }

  // Mehrere Fehler auf einmal: eine kurze, verlinkte Übersicht über dem Formular.
  function fehleruebersicht(liste) {
    var box = el("div", "cm-uebersicht");
    box.setAttribute("role", "alert");
    box.appendChild(el("p", null, "Bitte prüfe deine Eingaben:"));
    var ul = el("ul");
    liste.forEach(function (f) {
      var li = el("li");
      var a = el("a", null, f.fehler.textContent);
      a.href = "#" + f.eingabe.id;
      a.addEventListener("click", function (e) { e.preventDefault(); f.eingabe.focus(); });
      li.appendChild(a);
      ul.appendChild(li);
    });
    box.appendChild(ul);
    return box;
  }

  function sperren(b, text) {
    b.dataset.text = b.textContent;
    b.textContent = text;
    b.disabled = true;
    b.setAttribute("aria-busy", "true");
  }

  function freigeben(b) {
    if (b.dataset.text) b.textContent = b.dataset.text;
    b.disabled = false;
    b.removeAttribute("aria-busy");
  }

  function offline() { return navigator.onLine === false; }

  function sichtbar() { return schirm && !schirm.hidden; }

  /* ================================================== Ablauf */

  function setze(ansicht, hinweis) {
    z.ansicht = ansicht;
    z.hinweis = hinweis || null;
    zeichnen(true);
  }

  // Die eine Stelle, die entscheidet, was man sieht. Nie aus Vermutungen –
  // immer aus dem, was Supabase gerade über Sitzung und Profil sagt.
  function pruefen(hinweis) {
    if (offline()) { setze("offline"); return; }
    var vorher = z.ansicht;
    z.ansicht = "pruefen";
    zeichnen(false);
    var link = AP.community.linkEinloesung;
    AP.community.linkEinloesung = null;
    Promise.resolve(link)
      .then(function () { return AP.community.sitzung(); })
      .then(function (s) {
        if (!s) {
          // Wer gerade auf den Link wartet, bleibt dort – mit Adresse und Codefeld.
          setze(vorher === "versendet" && z.mail ? "versendet" : "anmeldung", hinweis);
          return;
        }
        return AP.community.profil(true).then(function (p) {
          z.profil = p;
          if (!p) { setze("profil", hinweis); return; }
          ankommen(hinweis);
        }, function (f) {
          if (f.art === "anmeldung") return abgelaufen();
          if (f.art === "netz" && offline()) return setze("offline");
          setze("profilfehler");
        });
      })
      .catch(function (f) {
        if (f && f.art === "netz" && offline()) return setze("offline");
        // Ungültiger, abgelaufener oder fremder Link: zurück zur Anmeldung.
        setze("anmeldung", { text: f && f.art === "anmeldung"
          ? "Dieser Anmeldelink ist nicht mehr gültig. Lass dir einen neuen Link schicken."
          : "Die Anmeldung konnte nicht geprüft werden. Versuch es erneut.", fehler: true });
      });
  }

  function abgelaufen() {
    setze("anmeldung", { text: "Deine Anmeldung ist abgelaufen. Lass dir einen neuen Link schicken.",
                         fehler: true });
  }

  // Zugang erteilt. Gibt es ein gemerktes Ziel, das wir (noch) nicht kennen,
  // zeigen wir nichts davon – nur einen ehrlichen Rückweg.
  function ankommen(hinweis) {
    var ziel = z.ziel;
    z.ziel = null;
    try { sessionStorage.removeItem(ZIEL_SCHLUESSEL); } catch (e) {}
    setze(ziel ? "nichtda" : "drin", hinweis);
  }

  /* ================================================== Zeichnen */

  function zeichnen(fokus) {
    if (!schirm) return;
    feldNr = 0;
    schirm.innerHTML = "";
    var rahmen = el("div", "cm-rahmen");
    schirm.appendChild(rahmen);
    var bauer = {
      pruefen: ansichtPruefen, anmeldung: ansichtAnmeldung, versendet: ansichtVersendet,
      profil: ansichtProfil, drin: ansichtDrin, offline: ansichtOffline,
      profilfehler: ansichtProfilfehler, unklar: ansichtUnklar, nichtda: ansichtNichtDa
    }[z.ansicht] || ansichtPruefen;
    bauer(rahmen);
    if (fokus && sichtbar()) {
      var h = rahmen.querySelector("h1");
      if (h) h.focus({ preventScroll: false });
      window.scrollTo(0, 0);
    }
  }

  /* ---------- C · Prüfen */
  function ansichtPruefen(r) {
    r.appendChild(kopf("Anmeldung wird geprüft …"));
    r.querySelector("h1").setAttribute("aria-live", "polite");
  }

  /* ---------- A · Anmeldung */
  function ansichtAnmeldung(r) {
    r.appendChild(zurueckKnopf());
    r.appendChild(kopf("In der Community anmelden",
      "Stell Fragen, teile Lernzettel und lerne mit anderen. Zum Anmelden schicken wir dir einen Link per E-Mail."));
    r.appendChild(hinweiszeile());

    var form = el("form", "cm-form");
    form.noValidate = true;
    var mail = feld({
      label: "E-Mail-Adresse", typ: "email", wert: z.mail,
      hilfe: "Du brauchst kein Passwort. Halte deinen Beta-Zugangscode bereit, wenn du neu dabei bist.",
      attr: { autocomplete: "email", inputmode: "email", autocapitalize: "off", spellcheck: "false" }
    });
    form.appendChild(mail.box);

    var senden = el("button", "kn-haupt cm-haupt", "Anmeldelink senden");
    senden.type = "submit";
    form.appendChild(senden);
    form.appendChild(verweis("Datenschutzerklärung", "datenschutz.html", "cm-verweis cm-leise"));
    form.appendChild(verweis("Ohne Anmeldung weiterlernen", "app.html#lernen", "kn-neben cm-neben"));

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (z.laeuft) return;
      var wert = mail.eingabe.value.trim();
      z.mail = wert;
      fehlerSetzen(mail, "");
      if (!wert) { fehlerSetzen(mail, "Gib deine E-Mail-Adresse ein."); mail.eingabe.focus(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert)) {
        fehlerSetzen(mail, "Prüfe deine E-Mail-Adresse."); mail.eingabe.focus(); return;
      }
      if (offline()) { setze("offline"); return; }
      z.laeuft = true;
      sperren(senden, "Anmeldelink wird gesendet …");
      AP.community.anmeldenPerMail(wert).then(function (a) {
        z.laeuft = false;
        z.mail = a;
        setze("versendet");
      }, function (f) {
        z.laeuft = false;
        freigeben(senden);
        if (f.art === "netz" && offline()) { setze("offline"); return; }
        if (f.art === "eingabe") { fehlerSetzen(mail, "Prüfe deine E-Mail-Adresse."); mail.eingabe.focus(); return; }
        z.hinweis = { text: f.art === "bremse"
          ? "Du hast gerade einen Link angefordert. Warte kurz und versuch es erneut."
          : "Der Link konnte nicht gesendet werden. Versuch es erneut.", fehler: true };
        var alt = r.querySelector(".meldung");
        alt.replaceWith(hinweiszeile());
        senden.focus();
      });
    });
    r.appendChild(form);
  }

  /* ---------- B · Mail versendet – Link oder Code */
  function ansichtVersendet(r) {
    r.appendChild(zurueckKnopf());
    // Geschützter Bindestrich (U+2011): sieht gleich aus, trennt aber nicht hinter „E-“.
    var k = kopf("Schau in dein E\u2011Mail\u2011Postfach");
    var text = el("p");
    // Adresse als Text, nicht als Markup – und nur hier, im privaten Anmeldeschritt.
    text.textContent = "Wir haben einen Anmeldelink an " + z.mail
      + " geschickt. Öffne den Link, um weiterzumachen.";
    k.appendChild(text);
    k.appendChild(el("p", null, "Keine E-Mail angekommen? Schau auch im Spam-Ordner nach."));
    // Nötig, weil der Link nur in dem Browser gilt, der ihn angefordert hat (PKCE).
    k.appendChild(el("p", null, "Öffne den Link in diesem Browser."));
    r.appendChild(k);
    r.appendChild(hinweiszeile());

    var form = el("form", "cm-form");
    form.noValidate = true;
    var code = feld({
      label: "Anmeldecode aus der E-Mail",
      hilfe: "Du kannst auch den sechsstelligen Code aus derselben E-Mail hier eingeben. Das ist besonders praktisch in der installierten App.",
      attr: { autocomplete: "one-time-code", inputmode: "numeric", maxlength: "12",
              autocapitalize: "off", spellcheck: "false" }
    });
    code.eingabe.classList.add("cm-mono");
    form.appendChild(code.box);
    var mitCode = el("button", "kn-haupt cm-haupt", "Mit Code anmelden");
    mitCode.type = "submit";
    form.appendChild(mitCode);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (z.laeuft) return;
      // Leerzeichen aus dem Einfügen sind egal, führende Nullen bleiben stehen.
      var wert = code.eingabe.value.replace(/\s+/g, "");
      fehlerSetzen(code, "");
      if (!/^\d{6}$/.test(wert)) {
        fehlerSetzen(code, "Der Anmeldecode besteht aus sechs Ziffern.");
        code.eingabe.focus();
        return;
      }
      if (offline()) { setze("offline"); return; }
      z.laeuft = true;
      sperren(mitCode, "Anmeldung wird geprüft …");
      AP.community.codePruefen(z.mail, wert).then(function () {
        z.laeuft = false;
        pruefen();
      }, function (f) {
        z.laeuft = false;
        freigeben(mitCode);
        if (f.art === "netz" && offline()) { setze("offline"); return; }
        fehlerSetzen(code, f.art === "bremse"
          ? "Zu viele Versuche in kurzer Zeit. Warte einen Moment und versuch es erneut."
          : f.art === "netz" || f.art === "server"
            ? "Das hat gerade nicht geklappt. Versuch es erneut."
            : "Der Code ist abgelaufen oder stimmt nicht. Lass dir einen neuen schicken.");
        code.eingabe.focus();
      });
    });
    r.appendChild(form);

    var weitere = el("div", "cm-reihe");
    var nochmal = knopf("Link erneut senden", "kn-neben cm-neben", function () {
      if (z.laeuft) return;
      if (offline()) { setze("offline"); return; }
      z.laeuft = true;
      sperren(nochmal, "Anmeldelink wird gesendet …");
      AP.community.anmeldenPerMail(z.mail).then(function () {
        z.laeuft = false;
        freigeben(nochmal);
        zeigeHinweis(r, { text: "Ein neuer Anmeldelink wurde gesendet." });
      }, function (f) {
        z.laeuft = false;
        freigeben(nochmal);
        if (f.art === "netz" && offline()) { setze("offline"); return; }
        zeigeHinweis(r, { fehler: true, text: f.art === "bremse"
          ? "Du hast gerade einen Link angefordert. Warte kurz und versuch es erneut."
          : "Der Link konnte nicht gesendet werden. Versuch es erneut." });
      });
    });
    weitere.appendChild(nochmal);
    weitere.appendChild(knopf("E-Mail-Adresse ändern", "kn-neben cm-neben", function () {
      setze("anmeldung");
      var f = schirm.querySelector("input[type=email]");
      if (f) { f.focus(); f.select(); }
    }));
    weitere.appendChild(verweis("Ohne Anmeldung weiterlernen", "app.html#lernen", "kn-neben cm-neben"));
    r.appendChild(weitere);
  }

  function zeigeHinweis(r, h) {
    z.hinweis = h;
    var alt = r.querySelector(".meldung");
    if (alt) alt.replaceWith(hinweiszeile());
  }

  /* ---------- D · Profil anlegen */
  function ansichtProfil(r) {
    r.appendChild(zurueckKnopf());
    r.appendChild(kopf("Dein Community-Profil",
      "Wähle einen Namen, unter dem dich andere sehen. Dein Lehrjahr kannst du freiwillig angeben."));
    r.appendChild(hinweiszeile());

    var form = el("form", "cm-form");
    form.noValidate = true;
    var oben = el("div");                                  // Platz für die Fehlerübersicht
    form.appendChild(oben);

    var f = z.formular;
    var code = feld({ label: "Beta-Zugangscode", wert: f.code,
      hilfe: "Den Code bekommst du vom Team für die Beta.",
      attr: { autocomplete: "off", autocapitalize: "characters", spellcheck: "false" } });
    code.eingabe.classList.add("cm-mono");
    var name = feld({ label: "Anzeigename", wert: f.name,
      hilfe: "2 bis 30 Zeichen. Diesen Namen sehen andere Mitglieder bei deinen Beiträgen und Antworten.",
      attr: { autocomplete: "off", maxlength: "60", spellcheck: "false" } });
    var jahr = feld({ label: "Lehrjahr (optional)", wert: f.lehrjahr,
      select: [["", "Keine Angabe"], ["1", "1. Lehrjahr"], ["2", "2. Lehrjahr"], ["3", "3. Lehrjahr"]] });
    var alter = haken("Ich bin mindestens 16 Jahre alt.", f.alter);
    var regelnOk = haken("Ich akzeptiere die Community-Regeln.", f.regeln);

    [code, name, jahr, alter, regelnOk].forEach(function (x) { form.appendChild(x.box); });

    var lesen = knopf("Community-Regeln lesen", "cm-verweis cm-regeln-lesen", function () {
      regelnZeigen(lesen);
    });
    form.appendChild(lesen);
    form.appendChild(el("p", "cm-hilfe cm-sichtbar",
      "Deine E-Mail-Adresse und dein Beta-Zugangscode werden anderen Mitgliedern nicht angezeigt."));

    var anlegen = el("button", "kn-haupt cm-haupt", "Profil anlegen");
    anlegen.type = "submit";
    form.appendChild(anlegen);

    var weitere = el("div", "cm-reihe");
    weitere.appendChild(verweis("Später weiterlernen", "app.html#lernen", "kn-neben cm-neben"));
    weitere.appendChild(abmeldeKnopf(r));
    form.appendChild(weitere);

    // Was man eintippt, bleibt erhalten, solange die Seite offen ist – auch beim
    // Blick in die Regeln oder einem Fehler vom Server.
    function merken() {
      f.code = code.eingabe.value;
      f.name = name.eingabe.value;
      f.lehrjahr = jahr.eingabe.value;
      f.alter = alter.eingabe.checked;
      f.regeln = regelnOk.eingabe.checked;
    }
    form.addEventListener("input", merken);
    form.addEventListener("change", merken);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (z.laeuft) return;
      merken();
      oben.innerHTML = "";
      [code, name, jahr, alter, regelnOk].forEach(function (x) { fehlerSetzen(x, ""); });

      var fehlerliste = [];
      if (!f.code.trim()) { fehlerSetzen(code, "Gib deinen Beta-Zugangscode ein."); fehlerliste.push(code); }
      var n = f.name.trim().length;
      if (n < 2 || n > 30) { fehlerSetzen(name, "Dein Anzeigename muss 2 bis 30 Zeichen lang sein."); fehlerliste.push(name); }
      if (["", "1", "2", "3"].indexOf(f.lehrjahr) < 0) {
        fehlerSetzen(jahr, "Wähle ein Lehrjahr von 1 bis 3 oder Keine Angabe."); fehlerliste.push(jahr);
      }
      if (!f.alter) {
        fehlerSetzen(alter, "Die Community ist ab 16 Jahren. Lernen und Üben kannst du ohne Community-Profil nutzen.");
        fehlerliste.push(alter);
      }
      if (!f.regeln) {
        fehlerSetzen(regelnOk, "Bitte lies und akzeptiere die Community-Regeln, um ein Profil anzulegen.");
        fehlerliste.push(regelnOk);
      }
      if (fehlerliste.length) {
        if (fehlerliste.length > 1) oben.appendChild(fehleruebersicht(fehlerliste));
        fehlerliste[0].eingabe.focus();
        return;
      }
      if (offline()) { setze("offline"); return; }

      z.laeuft = true;
      sperren(anlegen, "Profil wird angelegt …");
      AP.community.profilAnlegen({
        anzeigename: f.name.trim(), lehrjahr: f.lehrjahr ? Number(f.lehrjahr) : null,
        code: f.code, mindestens16: f.alter, regeln: f.regeln
      }).then(function (p) {
        angelegt(p);
      }, function (fehler) {
        nachFehler(fehler);
      });
    });

    function angelegt(p) {
      z.laeuft = false;
      z.profil = p;
      // Den Beta-Zugangscode nicht länger als nötig im Speicher halten.
      z.formular = { code: "", name: "", lehrjahr: "", alter: false, regeln: false };
      ankommen({ text: "Dein Profil ist angelegt." });
    }

    /* Nach jedem Fehler zuerst nachsehen, ob es das Profil inzwischen gibt –
       aus einem zweiten Tab oder weil nur die Antwort verloren ging. Erst wenn
       es sicher fehlt, gilt der Fehler. */
    function nachFehler(fehler) {
      AP.community.profil(true).then(function (p) {
        if (p) { angelegt(p); return; }
        z.laeuft = false;
        freigeben(anlegen);
        var text = fehler.message || "";
        if (fehler.art === "anmeldung") { abgelaufen(); return; }
        if (/Zugangscode/.test(text)) {
          fehlerSetzen(code, "Dieser Beta-Zugangscode ist nicht gültig oder nicht mehr verfügbar. Prüfe den Code oder frag das Team.");
          code.eingabe.focus();
        } else if (/Anzeigenamen|gibt es schon/.test(text)) {
          fehlerSetzen(name, "Dieser Anzeigename ist schon vergeben. Wähle einen anderen.");
          name.eingabe.focus();
        } else if (/16/.test(text)) {
          fehlerSetzen(alter, "Die Community ist ab 16 Jahren. Lernen und Üben kannst du ohne Community-Profil nutzen.");
          alter.eingabe.focus();
        } else if (/Regeln/.test(text)) {
          fehlerSetzen(regelnOk, "Bitte lies und akzeptiere die Community-Regeln, um ein Profil anzulegen.");
          regelnOk.eingabe.focus();
        } else {
          zeigeHinweis(r, { text: "Dein Profil konnte nicht angelegt werden. Versuch es erneut.", fehler: true });
          anlegen.focus();
        }
      }, function (pf) {
        // Wir wissen nicht, ob es geklappt hat. Nichts behaupten, nachsehen lassen.
        z.laeuft = false;
        if (pf.art === "anmeldung") { abgelaufen(); return; }
        setze("unklar");
      });
    }
    r.appendChild(form);
  }

  function abmeldeKnopf(r) {
    var b = knopf("Abmelden", "kn-neben cm-neben", function () {
      if (z.laeuft) return;
      z.laeuft = true;
      sperren(b, "Abmelden …");
      AP.community.abmelden().then(function () {
        z.laeuft = false;
        // Alles vom alten Konto vergessen – der Lernstand bleibt, wo er ist.
        z.profil = null;
        z.mail = "";
        z.ziel = null;
        z.formular = { code: "", name: "", lehrjahr: "", alter: false, regeln: false };
        try { sessionStorage.removeItem(ZIEL_SCHLUESSEL); } catch (e) {}
        setze("anmeldung");
      }, function () {
        z.laeuft = false;
        freigeben(b);
        zeigeHinweis(r, { text: "Du konntest gerade nicht abgemeldet werden. Versuch es erneut.", fehler: true });
      });
    });
    return b;
  }

  /* ---------- Angemeldet mit Profil
     Die Beiträge (C04) sind noch nicht freigegeben. Bis dahin zeigt die
     Community nur das eigene Profil – nichts von anderen. */
  function ansichtDrin(r) {
    r.appendChild(zurueckKnopf());
    r.appendChild(kopf("Community", "Fragen stellen, Wissen teilen und gemeinsam lernen."));
    r.appendChild(hinweiszeile());
    var p = z.profil || {};
    var g = el("section", "feldgruppe");
    var h = el("h2");
    h.appendChild(el("span", null, "Dein Community-Profil"));
    g.appendChild(h);
    var liste = el("dl", "cm-angaben");
    function angabe(dt, dd) {
      liste.appendChild(el("dt", null, dt));
      liste.appendChild(el("dd", null, dd));
    }
    angabe("Anzeigename", p.anzeigename || "");
    angabe("Lehrjahr", p.lehrjahr ? p.lehrjahr + ". Lehrjahr" : "Keine Angabe");
    if (p.rolle && p.rolle !== "azubi") angabe("Rolle", p.rolle === "mentor" ? "Mentor:in" : "Team");
    g.appendChild(liste);
    var reihe = el("div", "cm-reihe");
    var lesen = knopf("Community-Regeln lesen", "kn-neben cm-neben", function () { regelnZeigen(lesen); });
    reihe.appendChild(lesen);
    reihe.appendChild(abmeldeKnopf(r));
    g.appendChild(reihe);
    r.appendChild(g);
    r.appendChild(el("p", "cm-hilfe", "Beiträge und Lerngruppen kommen mit der nächsten Version."));
  }

  /* ---------- Offline */
  function ansichtOffline(r) {
    r.appendChild(kopf("Community",
      "Du bist offline. Zum Anmelden und Anlegen deines Profils brauchst du Internet. Lernen und Üben kannst du weiter nutzen."));
    var reihe = el("div", "cm-reihe");
    reihe.appendChild(knopf("Verbindung prüfen", "kn-haupt cm-haupt", function () { pruefen(); }));
    reihe.appendChild(verweis("Zu Lernen", "app.html#lernen", "kn-neben cm-neben"));
    r.appendChild(reihe);
  }

  /* ---------- Profil ließ sich nicht lesen – das ist nicht „kein Profil" */
  function ansichtProfilfehler(r) {
    r.appendChild(zurueckKnopf());
    r.appendChild(kopf("Community"));
    z.hinweis = { text: "Dein Profil konnte nicht geladen werden. Versuch es erneut.", fehler: true };
    r.appendChild(hinweiszeile());
    var reihe = el("div", "cm-reihe");
    reihe.appendChild(knopf("Erneut versuchen", "kn-haupt cm-haupt", function () { pruefen(); }));
    reihe.appendChild(verweis("Zu Lernen", "app.html#lernen", "kn-neben cm-neben"));
    r.appendChild(reihe);
  }

  /* ---------- Ausgang einer Profilanlage unklar */
  function ansichtUnklar(r) {
    r.appendChild(kopf("Community"));
    z.hinweis = { text: "Wir konnten nicht prüfen, ob dein Profil angelegt wurde. Prüfe den Status erneut.",
                  fehler: true };
    r.appendChild(hinweiszeile());
    var reihe = el("div", "cm-reihe");
    reihe.appendChild(knopf("Status prüfen", "kn-haupt cm-haupt", function () { pruefen(); }));
    reihe.appendChild(verweis("Zu Lernen", "app.html#lernen", "kn-neben cm-neben"));
    r.appendChild(reihe);
  }

  /* ---------- Ziel unbekannt oder nicht erlaubt */
  function ansichtNichtDa(r) {
    r.appendChild(kopf("Community", "Dieser Inhalt ist für dich nicht verfügbar."));
    r.appendChild(hinweiszeile());
    var reihe = el("div", "cm-reihe");
    reihe.appendChild(verweis("Zur Community", "app.html#community", "kn-haupt cm-haupt"));
    reihe.appendChild(verweis("Zu Lernen", "app.html#lernen", "kn-neben cm-neben"));
    r.appendChild(reihe);
  }

  /* ================================================== Regeln (C17) */

  /* Ein echter modaler Dialog: hält den Fokus, schließt mit Escape und gibt den
     Fokus an den Knopf zurück, der ihn geöffnet hat. Lesen und Scrollen setzen
     kein Häkchen. */
  function regelnZeigen(ausloeser) {
    var d = el("dialog", "cm-dialog");
    d.setAttribute("aria-labelledby", "cm-regeln-titel");
    var innen = el("div", "cm-dialog-innen");
    var h = el("h2", null, "Unsere Community-Regeln");
    h.id = "cm-regeln-titel";
    h.tabIndex = -1;
    innen.appendChild(h);
    var r = regeln || { einleitung: "", regeln: [] };
    if (r.einleitung) innen.appendChild(el("p", null, r.einleitung));
    var ol = el("ol", "cm-regelliste");
    r.regeln.forEach(function (x) {
      var li = el("li");
      li.appendChild(el("b", null, x.titel));
      li.appendChild(el("p", null, x.text));
      ol.appendChild(li);
    });
    innen.appendChild(ol);
    var zu = knopf("Schließen", "kn-haupt cm-haupt", function () { d.close(); });
    innen.appendChild(zu);
    d.appendChild(innen);
    d.addEventListener("close", function () {
      d.remove();
      if (ausloeser && document.contains(ausloeser)) ausloeser.focus();
    });
    // Klick auf den abgedunkelten Rand schließt auch.
    d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
    document.body.appendChild(d);
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
    h.focus();
  }

  /* ================================================== Einstiege */

  /* Heute: ein kleiner Abschnitt nach den eigenen Lernaktionen. Lädt nichts aus
     der Community – solange es die Wochenaufgaben-Ansicht nicht gibt, ist das
     der einfache Einstieg aus 01-uebersicht.md. */
  function heuteAbschnitt() {
    var box = el("div", "hm-gemeinsam");
    box.appendChild(el("p", "hm-titelchen", "Gemeinsam lernen"));
    // Eigene Klasse statt „hm-pflicht": Das ist keine Lernpflicht, und der
    // Funktionstest zählt Pflicht-Links, um tote Knöpfe zu finden.
    var a = el("a", "hm-gemeinsam-link");
    a.href = "app.html#community";
    var lbl = el("span", "hm-lbl");
    var wert = el("span", "hm-wert", "Zur Community");
    function text() {
      lbl.textContent = offline()
        ? "Community braucht Internet. Lernen und Üben bleiben verfügbar."
        : "Fragen stellen, Wissen teilen und gemeinsam lernen.";
    }
    text();
    window.addEventListener("online", text);
    window.addEventListener("offline", text);
    a.appendChild(lbl);
    a.appendChild(wert);
    box.appendChild(a);
    return box;
  }

  /* Ich: die beschriftete Zeile in die Community. */
  function ichZeile() {
    var g = el("section", "feldgruppe");
    var h = el("h2");
    h.appendChild(el("span", null, "Gemeinsam lernen"));
    g.appendChild(h);
    var ul = el("ul", "liste-schlicht");
    var li = el("li");
    var a = el("a", "reihe");
    a.href = "app.html#community";
    var o = el("div", "reihe-oben");
    o.appendChild(el("span", "reihe-titel", "Community"));
    a.appendChild(o);
    a.appendChild(el("div", "reihe-quelle", "Fragen stellen, Wissen teilen und gemeinsam lernen."));
    li.appendChild(a);
    ul.appendChild(li);
    g.appendChild(ul);
    return g;
  }

  /* ================================================== Nach außen */

  /* Vom Verteiler der App gerufen, sobald #community oder #community/… dran ist.
     Alles hinter dem Schrägstrich ist ein Ziel für später (Gruppe, Beitrag …).
     Es wird gemerkt und erst nach der Zugangsprüfung angefasst. */
  function zeigen(s, unter) {
    schirm = s;
    if (unter) {
      z.ziel = unter;
      try { sessionStorage.setItem(ZIEL_SCHLUESSEL, unter); } catch (e) {}
    } else if (z.ziel === null) {
      try { z.ziel = sessionStorage.getItem(ZIEL_SCHLUESSEL); } catch (e) {}
    }
    // Läuft gerade eine Anfrage, nur neu zeichnen. Sonst immer frisch prüfen:
    // Sitzung oder Profil können sich in einem anderen Tab geändert haben.
    // Eingetippte Werte (Adresse, Profilformular) bleiben dabei erhalten.
    if (z.laeuft) { zeichnen(false); return; }
    pruefen();
  }

  function init(inhalt) {
    regeln = inhalt && inhalt.communityRegeln || null;
    // Meldet sich das Konto in einem anderen Tab an oder ab, hier nachziehen.
    AP.community.beiAenderung(function (ereignis) {
      if (!sichtbar() || z.laeuft) return;
      if (ereignis === "SIGNED_OUT") { z.profil = null; pruefen(); }
      if (ereignis === "SIGNED_IN" && (z.ansicht === "anmeldung" || z.ansicht === "versendet")) pruefen();
    });
    window.addEventListener("online", function () { if (sichtbar() && z.ansicht === "offline") pruefen(); });
  }

  AP.communityAnsicht = {
    init: init, zeigen: zeigen, heuteAbschnitt: heuteAbschnitt, ichZeile: ichZeile,
    regelnZeigen: regelnZeigen,
    _zustand: function () { return JSON.parse(JSON.stringify({ ansicht: z.ansicht, ziel: z.ziel })); }
  };
})();
