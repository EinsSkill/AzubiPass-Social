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
  var inhalt = null;                                   // Lernkatalog für Filter und Lernziele
  var schirm = null;

  /* Was bleibt, solange die Seite offen ist: welche Ansicht, welche Adresse,
     was im Formular stand. Nichts davon landet im dauerhaften Speicher. */
  var z = {
    ansicht: null,        // anmeldung | versendet | pruefen | profil | drin | offline |
                          // profilfehler | unklar | nichtda | gesperrt | freigabeFehler |
                          // beitraege | beitrag | schreiben
    mail: "",
    hinweis: null,        // { text, fehler } – eine Zeile oben in der Ansicht
    laeuft: false,        // eine Anfrage ist unterwegs: kein zweiter Klick
    profil: null,
    nutzer: null,         // Konto, zu dem Profil und Formular gehören
    formular: leeresFormular(),
    ziel: null,           // gemerktes Ziel von vor der Anmeldung
    unter: "",            // was gerade hinter #community/ steht
    vonListe: false,      // Detail aus der Übersicht geöffnet: „Zurück" = history.back()
    frei: null            // Paketsperre (Spec 05): true/false nach der letzten Prüfung, null = unbekannt
  };

  function leeresFormular() {
    return { code: "", name: "", lehrjahr: "", alter: false, regeln: false };
  }

  /* Jede Prüfung, jede Anfrage und jeder Kontowechsel zieht eine neue Nummer.
     Kommt eine Antwort an, deren Nummer nicht mehr die aktuelle ist, gehört sie
     zu einem Konto oder einer Ansicht von vorhin und wird verworfen – sie darf
     nichts mehr anzeigen und nichts mehr ändern. */
  var lauf = 0;
  function neuerLauf() { return ++lauf; }
  function gilt(n) { return n === lauf; }

  /* Alles vergessen, was zu einem Konto gehört: Profil, Formularentwurf samt
     Bestätigungen, Adresse, gemerktes Ziel. Der Lernstand ist nicht betroffen. */
  function vergessen() {
    z.profil = null;
    z.nutzer = null;
    z.mail = "";
    z.formular = leeresFormular();
    z.ziel = null;
    z.laeuft = false;
    z.vonListe = false;
    z.frei = null;
    try { sessionStorage.removeItem(ZIEL_SCHLUESSEL); } catch (e) {}
    // Beiträge, Filter, Position und geladene Dateien des alten Kontos auch.
    if (AP.communityBeitraege) AP.communityBeitraege.vergessen();
  }

  // Zeichen zählen wie die Datenbank (char_length): Codepunkte, nicht UTF-16.
  function zeichen(t) { return Array.from(String(t || "").trim()).length; }

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
    if (o.pflicht) label.appendChild(el("span", "cm-pflicht", typeof o.pflicht === "string" ? o.pflicht : "Pflicht"));
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
    if (o.pflicht) eingabe.setAttribute("aria-required", "true");
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

  function haken(text, an, pflicht) {
    var id = "cm-f" + (++feldNr);
    var box = el("div", "cm-feld cm-haken-feld");
    var label = el("label", "cm-haken");
    label.htmlFor = id;
    var eingabe = el("input");
    eingabe.type = "checkbox";
    eingabe.id = id;
    eingabe.checked = !!an;              // nie vorausgewählt: kommt nur aus dem eigenen Klick
    label.appendChild(eingabe);
    var wort = el("span", null, text);
    if (pflicht) {
      wort.appendChild(el("span", "cm-pflicht", "Pflicht"));     // direkt hinter dem Text
      eingabe.setAttribute("aria-required", "true");
    }
    label.appendChild(wort);
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
    var neu = ansicht !== z.ansicht;
    z.ansicht = ansicht;
    z.hinweis = hinweis || null;
    zeichnen(neu || !!hinweis);
  }

  // Die eine Stelle, die entscheidet, was man sieht. Nie aus Vermutungen –
  // immer aus dem, was Supabase gerade über Sitzung und Profil sagt.
  function pruefen(hinweis) {
    var n = neuerLauf();
    z.laeuft = false;
    if (offline()) { setze("offline"); return; }
    var vorher = z.ansicht;
    z.ansicht = "pruefen";
    z.hinweis = null;
    zeichnen(vorher !== "pruefen");
    var link = AP.community.linkEinloesung;
    AP.community.linkEinloesung = null;
    Promise.resolve(link)
      .then(function () { return AP.community.sitzung(); })
      .then(function (s) {
        if (!gilt(n)) return;
        if (!s) {
          if (z.nutzer) vergessen();                       // Sitzung ist weg
          // Wer gerade auf den Link wartet, bleibt dort – mit Adresse und Codefeld.
          setze(vorher === "versendet" && z.mail ? "versendet" : "anmeldung", hinweis);
          return;
        }
        // Anderes Konto als vorhin (z. B. in einem anderen Tab gewechselt):
        // nichts vom alten übernehmen.
        if (z.nutzer && z.nutzer !== s.user.id) vergessen();
        z.nutzer = s.user.id;
        ladetext("Profil wird geladen …");
        return AP.community.profil(true).then(function (p) {
          if (!gilt(n)) return;
          z.profil = p;
          if (!p) { setze("profil", hinweis); return; }
          ankommen(hinweis);
        }, function (f) {
          if (!gilt(n)) return;
          if (f.art === "anmeldung") return abgelaufen();
          if (f.art === "netz" && offline()) return setze("offline");
          setze("profilfehler");
        });
      })
      .catch(function (f) {
        if (!gilt(n)) return;
        if (f && f.art === "netz" && offline()) return setze("offline");
        if (f && f.art === "anmeldung") {
          // Ungültiger, abgelaufener oder fremder Link: zurück zur Anmeldung.
          setze("anmeldung", { fehler: true,
            text: "Dieser Anmeldelink ist nicht mehr gültig. Lass dir einen neuen Link schicken." });
          return;
        }
        setze("pruefFehler");
      });
  }

  // Nur den Text der Prüfansicht tauschen – kein neuer Fokus, kein Springen.
  function ladetext(t) {
    var h = schirm && schirm.querySelector(".cm-kopf h1");
    if (h && z.ansicht === "pruefen") h.textContent = t;
  }

  function abgelaufen() {
    vergessen();
    neuerLauf();
    setze("anmeldung", { text: "Deine Anmeldung ist abgelaufen. Lass dir einen neuen Link schicken.",
                         fehler: true });
  }

  /* Zugang erteilt: jetzt erst das Ziel anfassen. Bekannt sind
       (leer)            C04 Beiträge
       profil            eigenes Profil, Regeln, Abmelden
       beitrag/<id>      C05 Beitrag
       schreiben         C06 Beitrag schreiben
     Alles andere (z. B. Gruppen, die es noch nicht gibt) bekommt nur den
     neutralen Rückweg, ohne etwas über das Ziel zu verraten.
     Vor C04/C05/C06 fragt die App die serverseitige Paketsperre ab (Spec 05,
     Entscheidung 13.10.2026). Gesperrt: keine einzige Beitragsabfrage, auch
     nicht über Direktlinks. Scheitert die Prüfung, bleibt das Paket zu. */
  var BEITRAG_ZIEL = /^beitrag\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;

  function ankommen(hinweis) {
    var weg = z.ziel !== null && z.ziel !== undefined ? z.ziel : z.unter;
    z.ziel = null;
    try { sessionStorage.removeItem(ZIEL_SCHLUESSEL); } catch (e) {}
    weg = String(weg || "");
    if (weg !== z.unter) {
      // Nach der Anmeldung zum gemerkten Ziel: Adresse anpassen, ohne neuen Verlaufseintrag.
      z.unter = weg;
      try { history.replaceState(null, "", location.pathname + location.search + "#community" + (weg ? "/" + weg : "")); } catch (e) {}
    }
    if (weg === "profil") return setze("drin", hinweis);
    var ziel = !weg ? "beitraege" : weg === "schreiben" ? "schreiben"
      : BEITRAG_ZIEL.test(weg) ? "beitrag" : null;
    if (!ziel) return setze("nichtda", hinweis);
    var n = lauf, konto = z.nutzer;
    ladetext("Zugang wird geprüft …");
    AP.community.beitraegeFrei().then(function (frei) {
      if (!gilt(n) || z.nutzer !== konto) return;
      z.frei = frei;
      setze(frei ? ziel : "gesperrt", hinweis);
    }, function (f) {
      if (!gilt(n) || z.nutzer !== konto) return;
      if (f && f.art === "veraltet") return;
      if (f && f.art === "anmeldung") return abgelaufen();
      if (f && f.art === "netz" && offline()) return setze("offline");
      setze("freigabeFehler", hinweis);
    });
  }

  /* Eine Anfrage starten: sperrt weitere Klicks und liefert eine Prüfung, ob
     die Antwort, wenn sie kommt, noch zu Konto und Ansicht passt. */
  function anfrage() {
    var n = neuerLauf();
    var konto = z.nutzer;
    z.laeuft = true;
    return function () { return gilt(n) && z.nutzer === konto; };
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
      profilfehler: ansichtProfilfehler, unklar: ansichtUnklar, nichtda: ansichtNichtDa,
      pruefFehler: ansichtPruefFehler,
      beitraege: function (r) { AP.communityBeitraege.liste(r, kontext()); },
      gesperrt: ansichtGesperrt, freigabeFehler: ansichtFreigabeFehler,
      beitrag: function (r) { AP.communityBeitraege.detail(r, BEITRAG_ZIEL.exec(z.unter)[1], kontext()); },
      schreiben: function (r) { AP.communityBeitraege.schreiben(r, kontext()); }
    }[z.ansicht] || ansichtPruefen;
    bauer(rahmen);
    if (fokus && sichtbar()) {
      var h = rahmen.querySelector("h1");
      if (h) h.focus({ preventScroll: false });
      window.scrollTo(0, 0);
    }
  }

  /* Was die Beitragsansichten (community-beitraege.js) von hier bekommen.
     gilt(): Die Antwort gehört noch zu dieser Ansicht, diesem Konto und
     diesem Ziel – sonst wird sie verworfen. */
  function kontext() {
    var n = lauf, konto = z.nutzer, unter = z.unter, bindung = AP.community.bindung();
    return {
      konto: konto,
      gilt: function () { return gilt(n) && z.nutzer === konto && z.unter === unter && bindung() && sichtbar(); },
      kopf: kopf, feld: feld, haken: haken, hinweiszeile: hinweiszeile, zurueckKnopf: zurueckKnopf,
      fehlerSetzen: fehlerSetzen, fehleruebersicht: fehleruebersicht, sperren: sperren, freigeben: freigeben,
      inhalt: function () { return inhalt; },
      offline: offline,
      offlineZeigen: function () { neuerLauf(); setze("offline"); },
      abgelaufen: abgelaufen,
      nichtDa: function () { setze("nichtda"); },
      // Der Server meldet die Paketsperre (z. B. inzwischen geschlossen).
      gesperrt: function () { neuerLauf(); z.frei = false; setze("gesperrt"); },
      merkeHerkunft: function () { z.vonListe = true; },
      vonListe: function () { var v = z.vonListe; z.vonListe = false; return v; }
    };
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
      label: "E-Mail-Adresse", typ: "email", wert: z.mail, pflicht: true,
      hilfe: "Du brauchst kein Passwort. Halte deinen Beta-Zugangscode bereit, wenn du neu dabei bist.",
      attr: { autocomplete: "email", inputmode: "email", autocapitalize: "off", spellcheck: "false" }
    });
    form.appendChild(mail.box);

    var senden = el("button", "kn-haupt cm-haupt", "Anmeldelink senden");
    senden.type = "submit";
    form.appendChild(senden);
    form.appendChild(verweis("Datenschutzerklärung", "datenschutz.html", "cm-verweis cm-leise"));
    form.appendChild(verweis("Ohne Anmeldung weiterlernen", "app.html#lernen", "kn-neben cm-neben"));

    function mailFehler(wert) {
      if (!wert) return "Gib deine E-Mail-Adresse ein.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert)) return "Prüfe deine E-Mail-Adresse.";
      return "";
    }
    // Nach dem ersten Absenden prüft das Feld bei jeder Korrektur mit.
    var versucht = false;
    mail.eingabe.addEventListener("input", function () {
      z.mail = mail.eingabe.value.trim();
      if (versucht) fehlerSetzen(mail, mailFehler(z.mail));
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (z.laeuft) return;
      versucht = true;
      var wert = mail.eingabe.value.trim();
      z.mail = wert;
      var f = mailFehler(wert);
      fehlerSetzen(mail, f);
      if (f) { mail.eingabe.focus(); return; }
      if (offline()) { setze("offline"); return; }
      var passt = anfrage();
      sperren(senden, "Anmeldelink wird gesendet …");
      AP.community.anmeldenPerMail(wert).then(function (a) {
        if (!passt()) return;
        z.laeuft = false;
        z.mail = a;
        setze("versendet");
      }, function (f) {
        if (!passt()) return;
        z.laeuft = false;
        freigeben(senden);
        if (f.art === "netz" && offline()) { setze("offline"); return; }
        if (f.art === "eingabe") { fehlerSetzen(mail, "Prüfe deine E-Mail-Adresse."); mail.eingabe.focus(); return; }
        zeigeHinweis(r, { fehler: true, text: f.art === "bremse"
          ? "Du hast gerade einen Link angefordert. Warte kurz und versuch es erneut."
          : "Der Link konnte nicht gesendet werden. Versuch es erneut." });
        senden.focus();
      });
    });
    r.appendChild(form);
  }

  /* ---------- B · Mail versendet – Link oder Code */
  function ansichtVersendet(r) {
    r.appendChild(zurueckKnopf());
    // Geschützter Bindestrich (U+2011): sieht gleich aus, trennt aber nicht hinter „E-“.
    var k = kopf("Schau in dein E‑Mail‑Postfach");
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
      label: "Anmeldecode aus der E-Mail", pflicht: "Pflicht bei Anmeldung mit Code",
      hilfe: "Du kannst auch den sechsstelligen Code aus derselben E-Mail hier eingeben. Das ist besonders praktisch in der installierten App.",
      attr: { autocomplete: "one-time-code", inputmode: "numeric", maxlength: "12",
              autocapitalize: "off", spellcheck: "false" }
    });
    code.eingabe.classList.add("cm-mono");
    form.appendChild(code.box);
    var mitCode = el("button", "kn-haupt cm-haupt", "Mit Code anmelden");
    mitCode.type = "submit";
    form.appendChild(mitCode);

    // Leerzeichen aus dem Einfügen sind egal, führende Nullen bleiben stehen.
    function codeWert() { return code.eingabe.value.replace(/\s+/g, ""); }
    function codeFehler(w) { return /^\d{6}$/.test(w) ? "" : "Der Anmeldecode besteht aus sechs Ziffern."; }
    var versucht = false;
    code.eingabe.addEventListener("input", function () {
      if (versucht) fehlerSetzen(code, codeFehler(codeWert()));
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (z.laeuft) return;
      versucht = true;
      var wert = codeWert();
      var fe = codeFehler(wert);
      fehlerSetzen(code, fe);
      if (fe) { code.eingabe.focus(); return; }
      if (offline()) { setze("offline"); return; }
      var passt = anfrage();
      sperren(mitCode, "Anmeldung wird geprüft …");
      AP.community.codePruefen(z.mail, wert).then(function () {
        if (!passt()) return;
        pruefen();
      }, function (f) {
        if (!passt()) return;
        z.laeuft = false;
        freigeben(mitCode);
        if (f.art === "netz" && offline()) { setze("offline"); return; }
        fehlerSetzen(code, f.art === "bremse"
          ? "Zu viele Versuche in kurzer Zeit. Warte einen Moment und versuch es erneut."
          : f.art === "netz" || f.art === "server"
            ? "Die Anmeldung mit dem E-Mail-Code hat nicht geklappt. Versuch es erneut."
            : "Der Code ist abgelaufen oder stimmt nicht. Lass dir einen neuen schicken.");
        code.eingabe.focus();
      });
    });
    r.appendChild(form);

    var weitere = el("div", "cm-reihe");
    var nochmal = knopf("Link erneut senden", "kn-neben cm-neben", function () {
      if (z.laeuft) return;
      if (offline()) { setze("offline"); return; }
      var passt = anfrage();
      sperren(nochmal, "Anmeldelink wird gesendet …");
      AP.community.anmeldenPerMail(z.mail).then(function () {
        if (!passt()) return;
        z.laeuft = false;
        freigeben(nochmal);
        zeigeHinweis(r, { text: "Ein neuer Anmeldelink wurde gesendet." });
      }, function (f) {
        if (!passt()) return;
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
      if (z.laeuft) return;
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
    var code = feld({ label: "Beta-Zugangscode", wert: f.code, pflicht: true,
      hilfe: "Den Code bekommst du vom Team für die Beta.",
      attr: { autocomplete: "off", autocapitalize: "characters", spellcheck: "false" } });
    code.eingabe.classList.add("cm-mono");
    var name = feld({ label: "Anzeigename", wert: f.name, pflicht: true,
      hilfe: "2 bis 30 Zeichen. Diesen Namen sehen andere Mitglieder bei deinen Beiträgen und Antworten.",
      attr: { autocomplete: "off", maxlength: "60", spellcheck: "false" } });
    var jahr = feld({ label: "Lehrjahr (optional)", wert: f.lehrjahr,
      select: [["", "Keine Angabe"], ["1", "1. Lehrjahr"], ["2", "2. Lehrjahr"], ["3", "3. Lehrjahr"]] });
    var alter = haken("Ich bin mindestens 16 Jahre alt.", f.alter, true);
    var regelnOk = haken("Ich akzeptiere die Community-Regeln.", f.regeln, true);
    var felder = { code: code, name: name, jahr: jahr, alter: alter, regeln: regelnOk };
    var reihenfolge = ["code", "name", "jahr", "alter", "regeln"];

    reihenfolge.forEach(function (k) { form.appendChild(felder[k].box); });

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

    /* Fehler kommen aus zwei Quellen: aus der Prüfung hier (Pflichtfeld,
       Länge, Häkchen) und vom Server (Code ungültig, Name vergeben). Hier
       geprüfte Fehler verschwinden, sobald sie behoben sind; ein Serverfehler
       verschwindet, sobald man das betroffene Feld ändert. */
    var versucht = false;
    var serverFehler = {};

    function lokaleFehler() {
      var fe = {};
      if (!f.code.trim()) fe.code = "Gib deinen Beta-Zugangscode ein.";
      var n = zeichen(f.name);
      if (n < 2 || n > 30) fe.name = "Dein Anzeigename muss 2 bis 30 Zeichen lang sein.";
      if (["", "1", "2", "3"].indexOf(f.lehrjahr) < 0) fe.jahr = "Wähle ein Lehrjahr von 1 bis 3 oder Keine Angabe.";
      if (!f.alter) fe.alter = "Die Community ist ab 16 Jahren. Lernen und Üben kannst du ohne Community-Profil nutzen.";
      if (!f.regeln) fe.regeln = "Bitte lies und akzeptiere die Community-Regeln, um ein Profil anzulegen.";
      return fe;
    }

    // Zeigt den aktuellen Stand aller Fehler und gibt die Felder mit Fehler zurück.
    function fehlerZeigen() {
      var lokal = lokaleFehler();
      var mitFehler = [];
      reihenfolge.forEach(function (k) {
        var text = lokal[k] || serverFehler[k] || "";
        fehlerSetzen(felder[k], text);
        if (text) mitFehler.push(felder[k]);
      });
      oben.innerHTML = "";
      if (mitFehler.length > 1) oben.appendChild(fehleruebersicht(mitFehler));
      return mitFehler;
    }

    // Was man eintippt, bleibt erhalten, solange die Seite offen ist – auch beim
    // Blick in die Regeln oder einem Fehler vom Server.
    function merken(e) {
      f.code = code.eingabe.value;
      f.name = name.eingabe.value;
      f.lehrjahr = jahr.eingabe.value;
      f.alter = alter.eingabe.checked;
      f.regeln = regelnOk.eingabe.checked;
      if (e && e.target) {
        reihenfolge.forEach(function (k) { if (felder[k].eingabe === e.target) delete serverFehler[k]; });
      }
      if (versucht) fehlerZeigen();
    }
    form.addEventListener("input", merken);
    form.addEventListener("change", merken);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (z.laeuft) return;
      merken();
      versucht = true;
      var mitFehler = fehlerZeigen();
      if (mitFehler.length) { mitFehler[0].eingabe.focus(); return; }
      if (offline()) { setze("offline"); return; }

      var passt = anfrage();
      sperren(anlegen, "Profil wird angelegt …");
      AP.community.profilAnlegen({
        anzeigename: f.name.trim(), lehrjahr: f.lehrjahr ? Number(f.lehrjahr) : null,
        code: f.code, mindestens16: f.alter, regeln: f.regeln
      }).then(function (p) {
        if (!passt()) return;
        // Erfolg erst mit einem tatsächlich geladenen Profil – sonst nachsehen.
        if (p && p.id) angelegt(p);
        else nachFehler({ art: "server", message: "" }, passt);
      }, function (fehler) {
        if (!passt()) return;
        nachFehler(fehler, passt);
      });
    });

    function angelegt(p) {
      z.laeuft = false;
      z.profil = p;
      // Den Beta-Zugangscode nicht länger als nötig im Speicher halten.
      z.formular = leeresFormular();
      ankommen({ text: "Dein Profil ist angelegt." });
    }

    /* Nach jedem Fehler zuerst nachsehen, ob es das Profil inzwischen gibt –
       aus einem zweiten Tab oder weil nur die Antwort verloren ging. Erst wenn
       es sicher fehlt, gilt der Fehler. */
    function nachFehler(fehler, passt) {
      if (fehler.art === "anmeldung") { abgelaufen(); return; }
      if (fehler.art === "netz" && offline()) { setze("offline"); return; }
      AP.community.profil(true).then(function (p) {
        if (!passt()) return;
        if (p && p.id) { angelegt(p); return; }
        z.laeuft = false;
        freigeben(anlegen);
        var text = fehler.message || "";
        var feldname = /Zugangscode/.test(text) ? "code"
          : /Anzeigenamen|gibt es schon/.test(text) ? "name"
          : /16/.test(text) ? "alter"
          : /Regeln/.test(text) ? "regeln" : null;
        if (!feldname) {
          zeigeHinweis(r, { text: "Dein Profil konnte nicht angelegt werden. Versuch es erneut.", fehler: true });
          anlegen.focus();
          return;
        }
        serverFehler[feldname] = {
          code: "Dieser Beta-Zugangscode ist nicht gültig oder nicht mehr verfügbar. Prüfe den Code oder frag das Team.",
          name: "Dieser Anzeigename ist schon vergeben. Wähle einen anderen.",
          alter: "Die Community ist ab 16 Jahren. Lernen und Üben kannst du ohne Community-Profil nutzen.",
          regeln: "Bitte lies und akzeptiere die Community-Regeln, um ein Profil anzulegen."
        }[feldname];
        fehlerZeigen();
        felder[feldname].eingabe.focus();
      }, function (pf) {
        if (!passt()) return;
        // Wir wissen nicht, ob es geklappt hat. Nichts behaupten, nachsehen lassen.
        z.laeuft = false;
        if (pf.art === "anmeldung") { abgelaufen(); return; }
        if (pf.art === "netz" && offline()) { setze("offline"); return; }
        setze("unklar");
      });
    }
    r.appendChild(form);
  }

  function abmeldeKnopf(r) {
    var b = knopf("Abmelden", "kn-neben cm-neben", function () {
      if (z.laeuft) return;
      var passt = anfrage();
      sperren(b, "Abmelden …");
      AP.community.abmelden().then(function () {
        // Das eigene SIGNED_OUT hat meist schon aufgeräumt (kontoWeg). Ist
        // inzwischen ein anderes Konto da oder läuft etwas Neues, bleibt es dabei.
        if (!passt() || AP.community.kontoJetzt()) return;
        // Alles vom alten Konto vergessen – der Lernstand bleibt, wo er ist.
        vergessen();
        neuerLauf();
        setze("anmeldung");
      }, function () {
        if (!passt()) return;
        z.laeuft = false;
        freigeben(b);
        zeigeHinweis(r, { text: "Du konntest gerade nicht abgemeldet werden. Versuch es erneut.", fehler: true });
      });
    });
    return b;
  }

  /* ---------- Eigenes Profil (#community/profil)
     Seit C04 ist die Übersicht der Beiträge der Startpunkt. Hier bleiben
     Profil, Regeln und Abmelden (04-beitraege.md, Abschnitt 2). Einleitung:
     Entscheidung vom 12.10.2026. */
  function ansichtDrin(r) {
    r.appendChild(zurueckKnopf());
    r.appendChild(kopf("Profil", "Hier findest du dein Community-Profil und die Regeln."));
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
    var weg = el("div", "cm-reihe");
    if (z.frei !== false) weg.appendChild(verweis("Zu Beiträgen", "#community", "kn-neben cm-neben"));
    weg.appendChild(verweis("Zu Lernen", "app.html#lernen", "kn-neben cm-neben"));
    r.appendChild(weg);
  }

  /* ---------- Offline */
  function ansichtOffline(r) {
    // Mit Profil ging es um Inhalte, ohne um Anmeldung und Profil.
    var entwurf = z.profil && AP.communityBeitraege && AP.communityBeitraege.hatEntwurf(z.nutzer);
    r.appendChild(kopf("Community", entwurf
      ? "Du bist offline. Für die Community brauchst du Internet. Deine Eingaben bleiben in diesem geöffneten Tab."
      : z.profil
      ? "Du bist offline. Für die Community brauchst du Internet. Lernen und Üben kannst du weiter nutzen."
      : "Du bist offline. Zum Anmelden und Anlegen deines Profils brauchst du Internet. Lernen und Üben kannst du weiter nutzen."));
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
    reihe.appendChild(knopf("Profilstatus prüfen", "kn-haupt cm-haupt", function () { pruefen(); }));
    reihe.appendChild(verweis("Zu Lernen", "app.html#lernen", "kn-neben cm-neben"));
    r.appendChild(reihe);
  }

  /* ---------- Sitzung ließ sich nicht prüfen (kein Offline, kein Linkfehler) */
  function ansichtPruefFehler(r) {
    r.appendChild(zurueckKnopf());
    r.appendChild(kopf("Community"));
    z.hinweis = { text: "Die Anmeldung konnte nicht geprüft werden. Versuch es erneut.", fehler: true };
    r.appendChild(hinweiszeile());
    var reihe = el("div", "cm-reihe");
    reihe.appendChild(knopf("Erneut versuchen", "kn-haupt cm-haupt", function () { pruefen(); }));
    reihe.appendChild(verweis("Zu Lernen", "app.html#lernen", "kn-neben cm-neben"));
    r.appendChild(reihe);
  }

  /* ---------- Paketsperre (Spec 05): Profil, Regeln und Abmelden bleiben */
  function ansichtGesperrt(r) {
    r.appendChild(zurueckKnopf());
    r.appendChild(kopf("Community", "Beiträge sind für die Klassen-Beta noch nicht freigeschaltet."));
    r.appendChild(hinweiszeile());
    var reihe = el("div", "cm-reihe");
    reihe.appendChild(verweis("Zu Lernen", "app.html#lernen", "kn-haupt cm-haupt"));
    reihe.appendChild(verweis("Profil", "#community/profil", "kn-neben cm-neben"));
    var lesen = knopf("Community-Regeln lesen", "kn-neben cm-neben", function () { regelnZeigen(lesen); });
    reihe.appendChild(lesen);
    reihe.appendChild(abmeldeKnopf(r));
    r.appendChild(reihe);
  }

  /* ---------- Freigabe ließ sich nicht prüfen: Paket bleibt zu */
  function ansichtFreigabeFehler(r) {
    r.appendChild(zurueckKnopf());
    r.appendChild(kopf("Community"));
    z.hinweis = { text: "Der Zugang zu den Beiträgen konnte nicht geprüft werden. Versuch es erneut.", fehler: true };
    r.appendChild(hinweiszeile());
    var reihe = el("div", "cm-reihe");
    reihe.appendChild(knopf("Erneut versuchen", "kn-haupt cm-haupt", function () { pruefen(); }));
    reihe.appendChild(verweis("Profil", "#community/profil", "kn-neben cm-neben"));
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
    z.unter = String(unter || "").replace(/\/+$/, "");
    if (AP.communityBeitraege) AP.communityBeitraege.dateienFreigeben();
    if (unter) {
      z.ziel = unter;
      try { sessionStorage.setItem(ZIEL_SCHLUESSEL, unter); } catch (e) {}
    } else if (z.ziel === null) {
      try { z.ziel = sessionStorage.getItem(ZIEL_SCHLUESSEL); } catch (e) {}
    }
    // Läuft gerade eine Anfrage, bleibt die Ansicht stehen, wie sie ist (der
    // Schirm war nur versteckt). Sonst immer frisch prüfen: Sitzung oder Profil
    // können sich in einem anderen Tab geändert haben. Eingetippte Werte
    // bleiben dabei erhalten – solange es dasselbe Konto ist.
    if (z.laeuft && schirm.firstChild) return;
    pruefen();
  }

  // Abgemeldet (hier, in einem anderen Tab oder weil die Sitzung abgelaufen
  // ist): alles vom Konto vergessen und nichts davon stehen lassen – auch
  // nicht im versteckten Schirm.
  function kontoWeg() {
    vergessen();
    neuerLauf();
    z.ansicht = null;
    if (sichtbar()) pruefen();
    else if (schirm) schirm.innerHTML = "";
  }

  function init(daten) {
    inhalt = daten || null;
    regeln = daten && daten.communityRegeln || null;
    AP.community.beiAenderung(function (ereignis, sitzung) {
      if (ereignis === "SIGNED_OUT") { kontoWeg(); return; }
      if (ereignis !== "SIGNED_IN" || !sitzung) return;
      var id = sitzung.user && sitzung.user.id;
      if (z.nutzer && id !== z.nutzer) {
        // Ein anderes Konto hat sich angemeldet (anderer Tab): Entwürfe und
        // laufende Antworten des alten Kontos verwerfen.
        kontoWeg();
        return;
      }
      if (sichtbar() && !z.laeuft && (z.ansicht === "anmeldung" || z.ansicht === "versendet")) pruefen();
    });
    window.addEventListener("online", function () { if (sichtbar() && z.ansicht === "offline") pruefen(); });
    // Verbindung weg, während die Community offen ist: sofort sagen – auch
    // mitten in einer Anfrage. Deren Antwort wird danach nicht mehr angezeigt;
    // ob sie angekommen ist, prüft die App, sobald das Netz zurück ist.
    window.addEventListener("offline", function () {
      if (!sichtbar()) return;
      neuerLauf();
      z.laeuft = false;
      // Keine Beiträge oder Dateien aus dem Speicher weiterzeigen.
      if (AP.communityBeitraege) AP.communityBeitraege.dateienFreigeben();
      setze("offline");
    });
    // Zurück aus dem Hintergrund: Was man sieht, könnte inzwischen entzogen,
    // ausgeblendet oder gelöscht sein. Nach mehr als einer Minute neu prüfen
    // (Übersicht kommt mit Filtern und Position zurück).
    var weg = 0;
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { weg = Date.now(); return; }
      if (!weg || Date.now() - weg < 60000) return;
      weg = 0;
      if (sichtbar() && !z.laeuft && (z.ansicht === "beitraege" || z.ansicht === "beitrag" || z.ansicht === "gesperrt")) {
        if (z.ansicht === "beitraege") AP.communityBeitraege.zurueckholen();
        pruefen();
      }
    });
  }

  AP.communityAnsicht = {
    init: init, zeigen: zeigen, heuteAbschnitt: heuteAbschnitt, ichZeile: ichZeile,
    regelnZeigen: regelnZeigen,
    _zustand: function () { return JSON.parse(JSON.stringify({ ansicht: z.ansicht, ziel: z.ziel })); }
  };
})();
