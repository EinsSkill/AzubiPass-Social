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
    ansicht: null,        // anmeldung | registrieren | bestaetigen | vergessen | linkVersendet |
                          // neuesPasswort | mailLogin | versendet | pruefen | profil | drin | offline |
                          // profilfehler | unklar | nichtda | gesperrt | freigabeFehler |
                          // beitraege | beitrag | schreiben
    mail: "",
    pwZweck: "vergessen", // Spec 08: Wiederherstellung als „vergessen“ oder „festlegen“ (Mail-Konto)
    kontoMail: "",        // Adresse der jetzigen Sitzung, nur für „Neues Passwort festlegen“
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

  var BERUFE = [["kfb", "Kaufleute für Büromanagement"], ["ik", "Industriekaufleute"]];
  function berufName(b) { return b === "ik" ? "Industriekaufleute" : "Kaufleute für Büromanagement"; }

  function leeresFormular() {
    return { code: "", name: "", lehrjahr: "", beruf: "kfb", alter: false, regeln: false };
  }

  /* Jede Prüfung, jede Anfrage und jeder Kontowechsel zieht eine neue Nummer.
     Kommt eine Antwort an, deren Nummer nicht mehr die aktuelle ist, gehört sie
     zu einem Konto oder einer Ansicht von vorhin und wird verworfen – sie darf
     nichts mehr anzeigen und nichts mehr ändern. */
  var lauf = 0;
  function neuerLauf() { return ++lauf; }

  /* R04: Dialoge hängen an document.body, also außerhalb des Schirms. Sie
     gehören trotzdem zu Konto und Ansicht: Bei Abmeldung, Kontowechsel,
     Offline oder jedem Ansichtswechsel werden alle geschlossen, entfernt und
     ihr Inhalt geleert – ohne dass ihre Folgeaktionen (Senden, Verwerfen,
     Bestätigen) noch laufen. merken() liefert die Prüfung „verworfen?“ für den
     eigenen close-Handler. */
  var dialoge = [];
  function dialogMerken(d, beiVerwerfen) {
    var eintrag = { d: d, weg: false, bei: beiVerwerfen };
    dialoge.push(eintrag);
    d.addEventListener("close", function () {
      var i = dialoge.indexOf(eintrag);
      if (i >= 0) dialoge.splice(i, 1);
    });
    return function () { return eintrag.weg; };
  }
  function dialogeSchliessen() {
    dialoge.splice(0).forEach(function (x) {
      x.weg = true;
      try { if (x.bei) x.bei(); } catch (e) {}
      try { if (x.d.open) x.d.close(); } catch (e) {}
      x.d.remove();
    });
  }
  AP.communityDialoge = { merken: dialogMerken, schliessen: dialogeSchliessen };
  function gilt(n) { return n === lauf; }

  /* Alles vergessen, was zu einem Konto gehört: Profil, Formularentwurf samt
     Bestätigungen, Adresse, gemerktes Ziel. Der Lernstand ist nicht betroffen. */
  function vergessen() {
    dialogeSchliessen();
    z.profil = null;
    z.nutzer = null;
    z.mail = "";
    z.kontoMail = "";
    z.pwOffen = false;
    z.formular = leeresFormular();
    z.ziel = null;
    z.laeuft = false;
    z.vonListe = false;
    z.frei = null;
    try { sessionStorage.removeItem(ZIEL_SCHLUESSEL); } catch (e) {}
    // Beiträge, Filter, Position und geladene Dateien des alten Kontos auch.
    if (AP.communityBeitraege) AP.communityBeitraege.vergessen();
    if (AP.communityModeration) AP.communityModeration.vergessen();
    if (AP.communityGruppen) AP.communityGruppen.vergessen();
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
    var linkInfo = null;
    Promise.resolve(link)
      .then(function (l) { linkInfo = l; return AP.community.sitzung(); })
      .then(function (s) {
        if (!gilt(n)) return;
        if (!s) {
          if (z.nutzer) vergessen();                       // Sitzung ist weg
          // Wer gerade in einem Anmeldeschritt ist (z. B. auf den Link wartet),
          // bleibt dort – Passwortfelder sind beim Neuzeichnen leer.
          setze(VOR_ANMELDUNG.indexOf(vorher) >= 0 && (z.mail || ["registrieren", "vergessen", "mailLogin"].indexOf(vorher) >= 0)
            ? vorher : "anmeldung", hinweis);
          return;
        }
        // Anderes Konto als vorhin (z. B. in einem anderen Tab gewechselt):
        // nichts vom alten übernehmen.
        if (z.nutzer && z.nutzer !== s.user.id) vergessen();
        z.nutzer = s.user.id;
        z.kontoMail = s.user.email || "";
        // Spec 08: Bestätigte Wiederherstellung für genau dieses Konto zuerst –
        // vor Profil, Ziel und Paketprüfung.
        if (AP.community.wiederherstellungOffen(s.user.id)) { setze("neuesPasswort", hinweis); return; }
        // Passwort-Link hier nicht bestätigt, aber angemeldet: direkt im Profil festlegen.
        if (linkInfo && linkInfo.unbestaetigt && linkInfo.sitzung && linkInfo.sitzung.user.id === s.user.id) {
          z.ziel = "profil";
          z.pwOffen = true;
          hinweis = { text: "Der Link konnte in diesem Browser nicht bestätigt werden. Du bist hier aber als "
            + (s.user.email || "dein Konto") + " angemeldet und kannst dein Passwort unten direkt festlegen." };
        }
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
          // Ungültiger, abgelaufener, verbrauchter oder fremder Link (Spec 08):
          // Wiederherstellung → neuen Link anfordern; sonst zur Anmeldung.
          var text = f.message || "Dieser Anmeldelink ist nicht mehr gültig. Melde dich mit deinem Passwort an oder lass dir einen neuen Link schicken.";
          if (f.zweck === "passwort") { z.pwZweck = "vergessen"; setze("vergessen", { fehler: true, text: text }); return; }
          setze("anmeldung", { fehler: true, text: text });
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
    setze("anmeldung", { text: "Deine Anmeldung ist abgelaufen. Melde dich erneut an.", fehler: true });
  }

  // Ansichten vor der Anmeldung (ohne Konto).
  var VOR_ANMELDUNG = ["anmeldung", "registrieren", "bestaetigen", "vergessen", "linkVersendet", "mailLogin", "versendet"];

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
  // Spec 06: Moderation (Team), eigene Meldungen und eigene ausgeblendete Inhalte.
  var UUID = "([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})";
  var MOD_ZIEL = /^moderation(?:\/(ausgeblendet|protokoll))?$/;
  var FALL_ZIEL = new RegExp("^moderation\\/fall\\/(beitrag|antwort)\\/" + UUID + "$", "i");
  var EIGEN_ZIEL = new RegExp("^eigener-inhalt\\/(beitrag|antwort)\\/" + UUID + "$", "i");
  // Lerngruppen und Wochenaufgaben (20.10.2026).
  var GRUPPE_ZIEL = new RegExp("^gruppe\\/" + UUID + "$", "i");
  var GRUPPE_SCHREIBEN = new RegExp("^gruppe\\/" + UUID + "\\/schreiben$", "i");
  var GRUPPE_AUFGABE = new RegExp("^gruppe\\/" + UUID + "\\/aufgabe$", "i");
  var AUFGABE_ZIEL = new RegExp("^aufgabe\\/" + UUID + "$", "i");

  function zielArt(weg) {
    if (!weg) return "beitraege";
    if (weg === "schreiben") return "schreiben";
    if (BEITRAG_ZIEL.test(weg)) return "beitrag";
    if (MOD_ZIEL.test(weg)) return "moderation";
    if (FALL_ZIEL.test(weg)) return "fall";
    if (weg === "meine-meldungen") return "meineMeldungen";
    if (weg === "eigene-ausblendungen") return "eigeneListe";
    if (EIGEN_ZIEL.test(weg)) return "eigenerInhalt";
    if (weg === "gruppen") return "gruppen";
    if (weg === "gruppen/neu") return "gruppeNeu";
    if (weg === "gruppen/beitreten") return "gruppeBeitreten";
    if (GRUPPE_ZIEL.test(weg)) return "gruppe";
    if (GRUPPE_SCHREIBEN.test(weg)) return "gruppeSchreiben";
    if (GRUPPE_AUFGABE.test(weg)) return "gruppeAufgabe";
    if (weg === "aufgabe-neu") return "aufgabeNeu";
    if (AUFGABE_ZIEL.test(weg)) return "aufgabe";
    return null;
  }

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
    var ziel = zielArt(weg);
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
    dialogeSchliessen();             // R04: neue Ansicht – keine alten Dialoge darüber
    feldNr = 0;
    schirm.innerHTML = "";
    var rahmen = el("div", "cm-rahmen");
    schirm.appendChild(rahmen);
    var bauer = {
      pruefen: ansichtPruefen, anmeldung: ansichtAnmeldung, versendet: ansichtVersendet,
      registrieren: ansichtRegistrieren, bestaetigen: ansichtBestaetigen, vergessen: ansichtVergessen,
      linkVersendet: ansichtLinkVersendet, neuesPasswort: ansichtNeuesPasswort, mailLogin: ansichtMailLogin,
      profil: ansichtProfil, drin: ansichtDrin, offline: ansichtOffline,
      profilfehler: ansichtProfilfehler, unklar: ansichtUnklar, nichtda: ansichtNichtDa,
      pruefFehler: ansichtPruefFehler,
      beitraege: function (r) { AP.communityBeitraege.liste(r, kontext()); },
      gesperrt: ansichtGesperrt, freigabeFehler: ansichtFreigabeFehler,
      beitrag: function (r) { AP.communityBeitraege.detail(r, BEITRAG_ZIEL.exec(z.unter)[1], kontext()); },
      schreiben: function (r) { AP.communityBeitraege.schreiben(r, kontext()); },
      moderation: function (r) { AP.communityModeration.moderation(r, kontext(), MOD_ZIEL.exec(z.unter)[1] || ""); },
      fall: function (r) { var m = FALL_ZIEL.exec(z.unter); AP.communityModeration.fall(r, kontext(), m[1], m[2].toLowerCase()); },
      meineMeldungen: function (r) { AP.communityModeration.meineMeldungen(r, kontext()); },
      eigeneListe: function (r) { AP.communityModeration.eigeneListe(r, kontext()); },
      eigenerInhalt: function (r) { var m = EIGEN_ZIEL.exec(z.unter); AP.communityModeration.eigenerInhalt(r, kontext(), m[1], m[2].toLowerCase()); },
      gruppen: function (r) { AP.communityGruppen.liste(r, kontext()); },
      gruppeNeu: function (r) { AP.communityGruppen.gruenden(r, kontext()); },
      gruppeBeitreten: function (r) { AP.communityGruppen.beitreten(r, kontext()); },
      gruppe: function (r) { AP.communityGruppen.gruppe(r, kontext(), GRUPPE_ZIEL.exec(z.unter)[1].toLowerCase()); },
      gruppeAufgabe: function (r) { AP.communityGruppen.aufgabeNeu(r, kontext(), GRUPPE_AUFGABE.exec(z.unter)[1].toLowerCase()); },
      aufgabeNeu: function (r) {
        var c = kontext();
        if (c.rolle() !== "team") return ansichtNichtDa(r);
        AP.communityGruppen.aufgabeNeu(r, c, null);
      },
      aufgabe: function (r) { AP.communityGruppen.aufgabe(r, kontext(), AUFGABE_ZIEL.exec(z.unter)[1].toLowerCase()); },
      gruppeSchreiben: function (r) {
        // Erst prüfen, ob man Mitglied ist; dann das Formular mit festem Ziel.
        var c = kontext(), id = GRUPPE_SCHREIBEN.exec(z.unter)[1].toLowerCase();
        r.appendChild(kopf("Beitrag schreiben"));
        AP.community.gruppe(id).then(function (g) {
          if (!c.gilt()) return;
          if (!g || !g.meine_rolle) return c.nichtDa();
          r.innerHTML = "";
          AP.communityBeitraege.schreiben(r, c, { gruppe: id, gruppeName: g.name });
          var h = r.querySelector("h1");
          if (h) h.focus();
        }, function (f) {
          if (!c.gilt()) return;
          if (f && f.art === "anmeldung") return c.abgelaufen();
          if (f && f.art === "netz" && c.offline()) return c.offlineZeigen();
          z.hinweis = { text: "Die Gruppe konnte nicht geladen werden. Versuch es erneut.", fehler: true };
          r.appendChild(hinweiszeile());
        });
      }
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
      // Nur Anzeige von Einstiegen; Rechte prüft immer die Datenbank.
      rolle: function () { return z.profil && z.profil.rolle || "azubi"; },
      beruf: function () { return z.profil && z.profil.beruf === "ik" ? "ik" : "kfb"; },
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

  /* ================================================== Spec 08 · Anmeldung mit Passwort

     Passwörter stehen nur in den Eingabefeldern – nie in z, nie im Speicher,
     nie in einer Meldung. Jeder Ansichtswechsel baut den Schirm neu; damit
     sind sie weg. Die E-Mail-Adresse darf in z.mail für die nächste Ansicht
     bleiben. */

  var ERFOLG_PASSWORT = "Dein Passwort wurde gespeichert. Du kannst dich jetzt mit E-Mail-Adresse und Passwort anmelden.";

  function mindestens() { return AP.community.CFG.passwortMin; }

  function mailFeld(hilfe, autocomplete) {
    return feld({
      label: "E-Mail-Adresse", typ: "email", wert: z.mail, pflicht: true, hilfe: hilfe,
      attr: { autocomplete: autocomplete || "email", inputmode: "email", autocapitalize: "off", spellcheck: "false" }
    });
  }

  function mailFehler(wert) {
    if (!wert) return "Gib deine E-Mail-Adresse ein.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert)) return "Prüfe deine E-Mail-Adresse.";
    return "";
  }

  function passwortFeld(label, neu, hilfe) {
    return feld({
      label: label, typ: "password", pflicht: true, hilfe: hilfe,
      attr: { autocomplete: neu ? "new-password" : "current-password",
              autocapitalize: "off", autocorrect: "off", spellcheck: "false" }
    });
  }

  // Neue Passwörter: Länge wie angezeigt (Codepunkte); entscheiden tut der Server.
  function neuesPasswortFehler(w) {
    if (!w) return "Gib ein Passwort ein.";
    if (Array.from(w).length < mindestens()) return "Das Passwort muss mindestens " + mindestens() + " Zeichen lang sein.";
    return "";
  }

  /* Ein Knopf für alle Passwortfelder des Formulars. Wert, Fokus und Cursor
     bleiben, wo sie sind; die Beschriftung sagt, was ein Klick tut. */
  function anzeigenKnopf(felder) {
    var b = knopf("Passwort anzeigen", "cm-verweis cm-anzeigen");
    b.setAttribute("aria-controls", felder.map(function (f) { return f.eingabe.id; }).join(" "));
    b.addEventListener("mousedown", function (e) { e.preventDefault(); });
    b.addEventListener("click", function () {
      var an = felder[0].eingabe.type === "password";
      felder.forEach(function (f) {
        var e = f.eingabe, aktiv = document.activeElement === e;
        var von = e.selectionStart, bis = e.selectionEnd;
        e.type = an ? "text" : "password";
        if (aktiv) {
          // Manche Browser setzen den Cursor beim Typwechsel zurück – auch erst danach.
          var zurueck = function () { try { e.setSelectionRange(von, bis); } catch (x) {} };
          zurueck();
          setTimeout(zurueck, 0);
        }
      });
      b.textContent = an ? "Passwort verbergen" : "Passwort anzeigen";
    });
    return b;
  }

  function authHinweis(f, standard) {
    if (f && f.art === "mailLimit") return f.message;
    if (f && f.art === "bremse") return "Zu viele Versuche in kurzer Zeit. Warte einen Moment und versuch es erneut.";
    if (f && f.art === "netz") return "Keine Verbindung zum Server. Prüfe dein Internet und versuch es erneut.";
    if (f && (f.art === "vorhanden" || f.art === "server") && f.message && !/^Da ist etwas/.test(f.message)) return f.message;
    return standard;
  }

  function wechseln(ansicht, zweck) {
    if (z.laeuft) return;
    if (zweck) z.pwZweck = zweck;
    setze(ansicht);
  }

  /* Ein Formular: Feldfehler nach dem ersten Absenden, danach bei jeder
     Korrektur neu; kein zweites Absenden, solange eins läuft; die Antwort
     zählt nur, wenn Ansicht und Konto noch dieselben sind. */
  function formularLauf(form, o) {
    var versucht = false;
    function pruefe() {
      var mit = [];
      o.felder.forEach(function (x) {
        var t = x.pruef();
        fehlerSetzen(x.f, t);
        if (t) mit.push(x.f);
      });
      if (o.oben) {
        o.oben.innerHTML = "";
        if (mit.length > 1) o.oben.appendChild(fehleruebersicht(mit));
      }
      return mit;
    }
    form.addEventListener("input", function () { if (versucht) pruefe(); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (z.laeuft) return;
      versucht = true;
      var mit = pruefe();
      if (mit.length) { mit[0].eingabe.focus(); return; }
      if (offline()) { setze("offline"); return; }
      var passt = anfrage();
      sperren(o.knopf, o.laufText);
      Promise.resolve().then(o.senden).then(function (r) {
        if (!passt()) return;
        z.laeuft = false;
        o.ok(r);
      }, function (f) {
        if (!passt()) return;
        z.laeuft = false;
        freigeben(o.knopf);
        if (f && f.art === "netz" && offline()) { setze("offline"); return; }
        o.fehler(f || {});
      });
    });
  }

  // Ein Knopf, der eine Mail anfordert (erneut senden).
  function mailKnopf(r, text, aktion, erfolg, fehltext) {
    var b = knopf(text, "kn-neben cm-neben", function () {
      if (z.laeuft) return;
      if (offline()) { setze("offline"); return; }
      var passt = anfrage();
      sperren(b, "Link wird gesendet …");
      aktion().then(function () {
        if (!passt()) return;
        z.laeuft = false;
        freigeben(b);
        zeigeHinweis(r, { text: erfolg });
      }, function (f) {
        if (!passt()) return;
        z.laeuft = false;
        freigeben(b);
        if (f && f.art === "netz" && offline()) { setze("offline"); return; }
        zeigeHinweis(r, { fehler: true, text: authHinweis(f, fehltext) });
      });
    });
    return b;
  }

  function bestaetigungKnopf(r) {
    return mailKnopf(r, "Bestätigungs-Mail erneut senden",
      function () { return AP.community.bestaetigungSenden(z.mail); },
      "Falls die Registrierung noch nicht bestätigt ist, ist eine neue E-Mail unterwegs.",
      "Die E-Mail konnte nicht gesendet werden. Versuch es erneut.");
  }

  function unten(r) {
    var u = el("div", "cm-reihe");
    u.appendChild(verweis("Datenschutzerklärung", "datenschutz.html", "cm-verweis cm-leise"));
    u.appendChild(verweis("Ohne Anmeldung weiterlernen", "app.html#lernen", "kn-neben cm-neben"));
    r.appendChild(u);
  }

  /* ---------- A · Anmelden (Standard) */
  function ansichtAnmeldung(r) {
    r.appendChild(zurueckKnopf());
    r.appendChild(kopf("In der Community anmelden",
      "Melde dich mit deiner E-Mail-Adresse und deinem Passwort an."));
    r.appendChild(hinweiszeile());

    var form = el("form", "cm-form");
    form.noValidate = true;
    var mail = mailFeld(null, "username");
    var pw = passwortFeld("Passwort", false);
    form.appendChild(mail.box);
    form.appendChild(pw.box);
    form.appendChild(anzeigenKnopf([pw]));
    var los = el("button", "kn-haupt cm-haupt", "Anmelden");
    los.type = "submit";
    form.appendChild(los);
    var danach = el("div");                    // Platz für „Bestätigung erneut senden“
    form.appendChild(danach);
    mail.eingabe.addEventListener("input", function () { z.mail = mail.eingabe.value.trim(); });

    formularLauf(form, {
      felder: [
        { f: mail, pruef: function () { return mailFehler(mail.eingabe.value.trim()); } },
        // Beim Login nur „nicht leer“: alte, kürzere Passwörter entscheidet der Server.
        { f: pw, pruef: function () { return pw.eingabe.value ? "" : "Gib dein Passwort ein."; } }
      ],
      knopf: los, laufText: "Anmeldung wird geprüft …",
      senden: function () {
        z.mail = mail.eingabe.value.trim();
        danach.innerHTML = "";
        return AP.community.anmeldenMitPasswort(z.mail, pw.eingabe.value);
      },
      ok: function () { pruefen(); },
      fehler: function (f) {
        if (f.art === "eingabe") {
          if (/Passwort/.test(f.message)) { fehlerSetzen(pw, f.message); pw.eingabe.focus(); }
          else { fehlerSetzen(mail, "Prüfe deine E-Mail-Adresse."); mail.eingabe.focus(); }
          return;
        }
        if (f.art === "zugang") { zeigeHinweis(r, { fehler: true, text: f.message }); pw.eingabe.focus(); return; }
        if (f.art === "unbestaetigt") {
          zeigeHinweis(r, { fehler: true, text: f.message });
          danach.appendChild(bestaetigungKnopf(r));
          return;
        }
        zeigeHinweis(r, { fehler: true, text: authHinweis(f, "Die Anmeldung hat nicht geklappt. Versuch es erneut.") });
        los.focus();
      }
    });
    r.appendChild(form);

    var reihe = el("div", "cm-reihe");
    reihe.appendChild(knopf("Passwort vergessen?", "kn-neben cm-neben", function () { wechseln("vergessen", "vergessen"); }));
    reihe.appendChild(knopf("Konto erstellen", "kn-neben cm-neben", function () { wechseln("registrieren"); }));
    r.appendChild(reihe);

    var alt = el("div", "cm-reihe cm-alternativ");
    alt.appendChild(knopf("Bisher nur per E-Mail angemeldet? Passwort festlegen", "cm-verweis",
      function () { wechseln("vergessen", "festlegen"); }));
    alt.appendChild(knopf("Alternativ per E-Mail anmelden", "cm-verweis", function () { wechseln("mailLogin"); }));
    r.appendChild(alt);
    unten(r);
  }

  /* ---------- A2 · Konto erstellen */
  function ansichtRegistrieren(r) {
    r.appendChild(zurueckKnopf());
    r.appendChild(kopf("Konto erstellen",
      "Erstelle dein Konto mit E-Mail-Adresse und Passwort. Danach legst du mit deinem Beta-Zugangscode dein Community-Profil an."));
    r.appendChild(hinweiszeile());

    var form = el("form", "cm-form");
    form.noValidate = true;
    var oben = el("div");
    form.appendChild(oben);
    var mail = mailFeld(null, "email");
    var pw1 = passwortFeld("Passwort", true, "Mindestens " + mindestens() + " Zeichen.");
    var pw2 = passwortFeld("Passwort wiederholen", true);
    [mail, pw1, pw2].forEach(function (f) { form.appendChild(f.box); });
    form.appendChild(anzeigenKnopf([pw1, pw2]));
    var los = el("button", "kn-haupt cm-haupt", "Konto erstellen");
    los.type = "submit";
    form.appendChild(los);
    mail.eingabe.addEventListener("input", function () { z.mail = mail.eingabe.value.trim(); });

    formularLauf(form, {
      oben: oben,
      felder: [
        { f: mail, pruef: function () { return mailFehler(mail.eingabe.value.trim()); } },
        { f: pw1, pruef: function () { return neuesPasswortFehler(pw1.eingabe.value); } },
        { f: pw2, pruef: function () {
          if (!pw2.eingabe.value) return "Wiederhole dein Passwort.";
          return pw2.eingabe.value === pw1.eingabe.value ? "" : "Die Passwörter stimmen nicht überein.";
        } }
      ],
      knopf: los, laufText: "Konto wird erstellt …",
      senden: function () {
        z.mail = mail.eingabe.value.trim();
        return AP.community.registrieren(z.mail, pw1.eingabe.value);
      },
      // Sitzung nur, wenn Supabase sie wirklich liefert; sonst Mail bestätigen.
      ok: function (e) { if (e && e.sitzung) pruefen(); else setze("bestaetigen"); },
      fehler: function (f) {
        if (f.art === "eingabe") { fehlerSetzen(mail, "Prüfe deine E-Mail-Adresse."); mail.eingabe.focus(); return; }
        if (f.art === "passwort") { fehlerSetzen(pw1, f.message); pw1.eingabe.focus(); return; }
        zeigeHinweis(r, { fehler: true, text: authHinweis(f, "Das Konto konnte nicht erstellt werden. Versuch es erneut.") });
        los.focus();
      }
    });
    r.appendChild(form);

    var reihe = el("div", "cm-reihe");
    reihe.appendChild(knopf("Schon ein Konto? Anmelden", "kn-neben cm-neben", function () { wechseln("anmeldung"); }));
    r.appendChild(reihe);
    unten(r);
  }

  /* ---------- A3 · Registrierung bestätigen */
  function ansichtBestaetigen(r) {
    r.appendChild(zurueckKnopf());
    // Geschützter Bindestrich (U+2011): trennt nicht hinter „E-“.
    var k = kopf("Schau in dein E‑Mail‑Postfach",
      "Prüfe dein E-Mail-Postfach, um die Registrierung abzuschließen. Falls du schon ein Konto hast, melde dich an oder setze dein Passwort zurück.");
    k.appendChild(el("p", null, "Keine E-Mail angekommen? Schau auch im Spam-Ordner nach."));
    k.appendChild(el("p", null, "Öffne den Link am besten in diesem Browser. Geht er woanders auf, melde dich nach der Bestätigung hier mit E-Mail-Adresse und Passwort an."));
    r.appendChild(k);
    r.appendChild(hinweiszeile());
    var reihe = el("div", "cm-reihe");
    reihe.appendChild(knopf("Zur Anmeldung", "kn-haupt cm-haupt", function () { wechseln("anmeldung"); }));
    reihe.appendChild(bestaetigungKnopf(r));
    reihe.appendChild(knopf("Passwort vergessen?", "kn-neben cm-neben", function () { wechseln("vergessen", "vergessen"); }));
    r.appendChild(reihe);
    unten(r);
  }

  /* ---------- A4 · Passwort vergessen / für ein bisheriges Mail-Konto festlegen
     Beides ist dieselbe Wiederherstellung des bestehenden Kontos. */
  function ansichtVergessen(r) {
    var festlegen = z.pwZweck === "festlegen";
    r.appendChild(zurueckKnopf());
    r.appendChild(festlegen
      ? kopf("Passwort festlegen", "Du legst ein Passwort für dein bestehendes Konto fest. Profil, Lernstand und Beiträge bleiben erhalten.")
      : kopf("Passwort vergessen", "Wir schicken dir einen Link, mit dem du ein neues Passwort festlegst."));
    r.appendChild(hinweiszeile());

    var form = el("form", "cm-form");
    form.noValidate = true;
    var mail = mailFeld(festlegen
      ? "Die E-Mail-Adresse, mit der du dich bisher per Link angemeldet hast."
      : null, "email");
    form.appendChild(mail.box);
    var los = el("button", "kn-haupt cm-haupt", festlegen ? "Link zum Festlegen senden" : "Link zum Zurücksetzen senden");
    los.type = "submit";
    form.appendChild(los);
    mail.eingabe.addEventListener("input", function () { z.mail = mail.eingabe.value.trim(); });

    formularLauf(form, {
      felder: [{ f: mail, pruef: function () { return mailFehler(mail.eingabe.value.trim()); } }],
      knopf: los, laufText: "Link wird gesendet …",
      senden: function () {
        z.mail = mail.eingabe.value.trim();
        return AP.community.passwortLinkSenden(z.mail);
      },
      ok: function (a) { z.mail = a; setze("linkVersendet"); },
      fehler: function (f) {
        if (f.art === "eingabe") { fehlerSetzen(mail, "Prüfe deine E-Mail-Adresse."); mail.eingabe.focus(); return; }
        zeigeHinweis(r, { fehler: true, text: authHinweis(f, "Der Link konnte nicht gesendet werden. Versuch es erneut.") });
        los.focus();
      }
    });
    r.appendChild(form);
    var reihe = el("div", "cm-reihe");
    reihe.appendChild(knopf("Zur Anmeldung", "kn-neben cm-neben", function () { wechseln("anmeldung"); }));
    r.appendChild(reihe);
    unten(r);
  }

  /* ---------- A5 · Link zum Zurücksetzen/Festlegen versendet (neutral) */
  function ansichtLinkVersendet(r) {
    r.appendChild(zurueckKnopf());
    var k = kopf("Schau in dein E‑Mail‑Postfach",
      "Falls für diese E-Mail-Adresse ein Konto besteht, erhältst du eine E-Mail mit den nächsten Schritten.");
    k.appendChild(el("p", null, "Keine E-Mail angekommen? Schau auch im Spam-Ordner nach."));
    // PKCE: Der Link gilt nur in dem Browser, in dem er angefordert wurde.
    k.appendChild(el("p", null, "Wichtig: Öffne den Link auf diesem Gerät und in diesem Browser – auf einem anderen Gerät funktioniert er nicht."));
    r.appendChild(k);
    r.appendChild(hinweiszeile());

    var form = el("form", "cm-form");
    form.noValidate = true;
    var code = feld({
      label: "Code aus der E-Mail", pflicht: "Pflicht bei Bestätigung mit Code",
      hilfe: "Steht in der E-Mail ein Code, kannst du ihn hier eingeben – praktisch, wenn der Link in einem anderen Browser oder außerhalb der installierten App aufgeht.",
      attr: { autocomplete: "one-time-code", inputmode: "numeric", maxlength: "12", autocapitalize: "off", spellcheck: "false" }
    });
    code.eingabe.classList.add("cm-mono");
    form.appendChild(code.box);
    var los = el("button", "kn-haupt cm-haupt", "Code bestätigen");
    los.type = "submit";
    form.appendChild(los);
    formularLauf(form, {
      felder: [{ f: code, pruef: function () {
        return /^\d{6,10}$/.test(code.eingabe.value.replace(/\s+/g, "")) ? "" : "Gib den Code aus der E-Mail ein (nur Ziffern).";
      } }],
      knopf: los, laufText: "Code wird geprüft …",
      senden: function () { return AP.community.wiederherstellungsCode(z.mail, code.eingabe.value); },
      ok: function () { pruefen(); },
      fehler: function (f) {
        fehlerSetzen(code, f.art === "code" || f.art === "eingabe" ? f.message
          : authHinweis(f, "Der Code konnte nicht geprüft werden. Versuch es erneut."));
        code.eingabe.focus();
      }
    });
    r.appendChild(form);

    var reihe = el("div", "cm-reihe");
    reihe.appendChild(mailKnopf(r, "Link erneut senden",
      function () { return AP.community.passwortLinkSenden(z.mail); },
      "Falls für diese E-Mail-Adresse ein Konto besteht, ist ein neuer Link unterwegs.",
      "Der Link konnte nicht gesendet werden. Versuch es erneut."));
    reihe.appendChild(knopf("Zur Anmeldung", "kn-neben cm-neben", function () { wechseln("anmeldung"); }));
    r.appendChild(reihe);
    unten(r);
  }

  /* ---------- A6 · Neues Passwort nach bestätigter Wiederherstellung
     Nur erreichbar, wenn Supabase PASSWORD_RECOVERY für genau das Konto der
     jetzigen Sitzung gemeldet hat (community.js). Profil- und Zielprüfung
     kommen erst danach. Nach dem Speichern bleibt man mit dieser Sitzung
     angemeldet; beim nächsten Mal gilt das neue Passwort. */
  function ansichtNeuesPasswort(r) {
    var k = kopf("Neues Passwort festlegen", "Du legst ein neues Passwort für dein Konto fest.");
    if (z.kontoMail) {
      var p = el("p");
      p.textContent = "Konto: " + z.kontoMail;
      k.appendChild(p);
    }
    r.appendChild(k);
    r.appendChild(hinweiszeile());
    passwortFormular(r, { konto: z.nutzer, fertig: function () { pruefen({ text: ERFOLG_PASSWORT }); } });
    var reihe = el("div", "cm-reihe");
    reihe.appendChild(abmeldeKnopf(r));
    r.appendChild(reihe);
  }

  /* Passwort setzen/ändern für das angemeldete Konto (o.konto). Verlangt
     Supabase eine erneute Bestätigung (Secure Password Change), erscheint ein
     Codefeld; der Code kommt per Mail. Nichts wird als Erfolg gemeldet, bevor
     Supabase das Update für dasselbe Konto bestätigt hat. */
  function passwortFormular(r, o) {
    var form = el("form", "cm-form cm-passwort-form");
    form.noValidate = true;
    var oben = el("div");
    form.appendChild(oben);
    var pw1 = passwortFeld("Neues Passwort", true, "Mindestens " + mindestens() + " Zeichen.");
    var pw2 = passwortFeld("Neues Passwort wiederholen", true);
    form.appendChild(pw1.box);
    form.appendChild(pw2.box);
    form.appendChild(anzeigenKnopf([pw1, pw2]));
    var nachweisBox = el("div");
    form.appendChild(nachweisBox);
    var speichern = el("button", "kn-haupt cm-haupt", "Passwort speichern");
    speichern.type = "submit";
    form.appendChild(speichern);
    var status = el("div");
    form.appendChild(status);

    function melden(text, istFehler) {
      status.innerHTML = "";
      var m = el("p", istFehler ? "meldung fehler" : "meldung", text);
      m.setAttribute("role", istFehler ? "alert" : "status");
      status.appendChild(m);
    }

    var felder = [
      { f: pw1, pruef: function () { return neuesPasswortFehler(pw1.eingabe.value); } },
      { f: pw2, pruef: function () {
        if (!pw2.eingabe.value) return "Wiederhole dein neues Passwort.";
        return pw2.eingabe.value === pw1.eingabe.value ? "" : "Die Passwörter stimmen nicht überein.";
      } }
    ];

    var nachweis = null;
    function codeSenden(b) {
      if (z.laeuft) return;
      var passt = anfrage();
      if (b) sperren(b, "Code wird gesendet …");
      AP.community.nachweisSenden(o.konto).then(function () {
        if (!passt()) return;
        z.laeuft = false;
        if (b) freigeben(b);
        melden("Wir haben dir einen Bestätigungscode an deine E-Mail-Adresse geschickt.");
      }, function (f) {
        if (!passt()) return;
        z.laeuft = false;
        if (b) freigeben(b);
        if (f && f.art === "anmeldung") return abgelaufen();
        melden(authHinweis(f, "Der Bestätigungscode konnte nicht gesendet werden. Versuch es erneut."), true);
      });
    }
    function nachweisZeigen() {
      if (nachweis) return;
      nachweis = feld({
        label: "Bestätigungscode aus der E-Mail", pflicht: true,
        hilfe: "Zur Sicherheit verlangt die Anmeldung einen Code aus deinem E-Mail-Postfach. Gib ihn ein und speichere erneut.",
        attr: { autocomplete: "one-time-code", inputmode: "numeric", maxlength: "12", autocapitalize: "off", spellcheck: "false" }
      });
      nachweis.eingabe.classList.add("cm-mono");
      nachweisBox.appendChild(nachweis.box);
      var nochmal = knopf("Code erneut senden", "cm-verweis", function () { codeSenden(nochmal); });
      nachweisBox.appendChild(nochmal);
      felder.push({ f: nachweis, pruef: function () {
        return /^\d{6,10}$/.test(nachweis.eingabe.value.replace(/\s+/g, "")) ? "" : "Gib den Bestätigungscode aus der E-Mail ein.";
      } });
    }

    formularLauf(form, {
      oben: oben, felder: felder, knopf: speichern, laufText: "Passwort wird gespeichert …",
      senden: function () {
        status.innerHTML = "";
        return AP.community.passwortSetzen(pw1.eingabe.value, nachweis ? nachweis.eingabe.value : null, o.konto);
      },
      ok: function () { o.fertig(); },
      fehler: function (f) {
        if (f.art === "veraltet") return;                 // anderes Konto: dessen Ansicht kommt
        if (f.art === "anmeldung") return abgelaufen();
        if (f.art === "passwort" || f.art === "eingabe") { fehlerSetzen(pw1, f.message); pw1.eingabe.focus(); return; }
        if (f.art === "nachweis") {
          var neu = !nachweis;
          nachweisZeigen();
          if (neu) codeSenden(null);
          nachweis.eingabe.focus();
          return;
        }
        if (f.art === "code" && nachweis) { fehlerSetzen(nachweis, f.message); nachweis.eingabe.focus(); return; }
        if (f.art === "unklar") {
          melden("Wir wissen nicht, ob dein neues Passwort gespeichert wurde. Versuch es erneut – oder melde dich ab und mit dem neuen Passwort an.", true);
          return;
        }
        melden(authHinweis(f, "Das Passwort konnte nicht gespeichert werden. Versuch es erneut."), true);
      }
    });
    r.appendChild(form);
    return form;
  }

  /* ---------- B · Alternativ per E-Mail anmelden (bisheriger Weg, nur vorhandene Konten) */
  function ansichtMailLogin(r) {
    r.appendChild(zurueckKnopf());
    r.appendChild(kopf("Per E-Mail anmelden",
      "Für bestehende Konten: Wir schicken dir einen Anmeldelink und einen Code. Ein neues Konto erstellst du mit „Konto erstellen“."));
    r.appendChild(hinweiszeile());

    var form = el("form", "cm-form");
    form.noValidate = true;
    var mail = mailFeld(null, "email");
    form.appendChild(mail.box);
    var senden = el("button", "kn-haupt cm-haupt", "Anmeldelink senden");
    senden.type = "submit";
    form.appendChild(senden);
    mail.eingabe.addEventListener("input", function () { z.mail = mail.eingabe.value.trim(); });

    formularLauf(form, {
      felder: [{ f: mail, pruef: function () { return mailFehler(mail.eingabe.value.trim()); } }],
      knopf: senden, laufText: "Anmeldelink wird gesendet …",
      senden: function () {
        z.mail = mail.eingabe.value.trim();
        return AP.community.anmeldenPerMail(z.mail);
      },
      ok: function (a) { z.mail = a; setze("versendet"); },
      fehler: function (f) {
        if (f.art === "eingabe") { fehlerSetzen(mail, "Prüfe deine E-Mail-Adresse."); mail.eingabe.focus(); return; }
        zeigeHinweis(r, { fehler: true, text: f.art === "bremse"
          ? "Du hast gerade einen Link angefordert. Warte kurz und versuch es erneut."
          : authHinweis(f, "Der Link konnte nicht gesendet werden. Versuch es erneut.") });
        senden.focus();
      }
    });
    r.appendChild(form);
    var reihe = el("div", "cm-reihe");
    reihe.appendChild(knopf("Mit Passwort anmelden", "kn-neben cm-neben", function () { wechseln("anmeldung"); }));
    r.appendChild(reihe);
    unten(r);
  }

  /* ---------- B2 · Mail versendet – Link oder Code */
  function ansichtVersendet(r) {
    r.appendChild(zurueckKnopf());
    // Geschützter Bindestrich (U+2011): sieht gleich aus, trennt aber nicht hinter „E-“.
    var k = kopf("Schau in dein E‑Mail‑Postfach");
    var text = el("p");
    // Adresse als Text, nicht als Markup – und nur hier, im privaten Anmeldeschritt.
    // Neutral: Ob es zur Adresse ein Konto gibt, verrät die App nicht.
    text.textContent = "Falls für " + z.mail
      + " ein Konto besteht, haben wir einen Anmeldelink geschickt. Öffne den Link, um weiterzumachen.";
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
    formularLauf(form, {
      felder: [{ f: code, pruef: function () { return /^\d{6}$/.test(codeWert()) ? "" : "Der Anmeldecode besteht aus sechs Ziffern."; } }],
      knopf: mitCode, laufText: "Anmeldung wird geprüft …",
      senden: function () { return AP.community.codePruefen(z.mail, codeWert()); },
      ok: function () { pruefen(); },
      fehler: function (f) {
        fehlerSetzen(code, f.art === "bremse"
          ? "Zu viele Versuche in kurzer Zeit. Warte einen Moment und versuch es erneut."
          : f.art === "netz" || f.art === "server"
            ? "Die Anmeldung mit dem E-Mail-Code hat nicht geklappt. Versuch es erneut."
            : "Der Code ist abgelaufen oder stimmt nicht. Lass dir einen neuen schicken.");
        code.eingabe.focus();
      }
    });
    r.appendChild(form);

    var weitere = el("div", "cm-reihe");
    weitere.appendChild(mailKnopf(r, "Link erneut senden",
      function () { return AP.community.anmeldenPerMail(z.mail); },
      "Falls für diese E-Mail-Adresse ein Konto besteht, ist ein neuer Anmeldelink unterwegs.",
      "Der Link konnte nicht gesendet werden. Versuch es erneut."));
    weitere.appendChild(knopf("E-Mail-Adresse ändern", "kn-neben cm-neben", function () {
      if (z.laeuft) return;
      setze("mailLogin");
      var f = schirm.querySelector("input[type=email]");
      if (f) { f.focus(); f.select(); }
    }));
    weitere.appendChild(knopf("Mit Passwort anmelden", "kn-neben cm-neben", function () { wechseln("anmeldung"); }));
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
    var beruf = feld({ label: "Ausbildung", wert: f.beruf || "kfb", select: BERUFE,
      hilfe: "Danach richten sich die Lernfelder, denen du Beiträge zuordnest. Du kannst das später im Profil ändern." });
    var alter = haken("Ich bin mindestens 16 Jahre alt.", f.alter, true);
    var regelnOk = haken("Ich akzeptiere die Community-Regeln.", f.regeln, true);
    var felder = { code: code, name: name, jahr: jahr, beruf: beruf, alter: alter, regeln: regelnOk };
    var reihenfolge = ["code", "name", "jahr", "beruf", "alter", "regeln"];

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
    // Spec 08, Abschnitt 2: Kontowechsel statt Zusammenführen.
    form.appendChild(el("p", "cm-hilfe cm-sichtbar",
      "Schon mit einem anderen Konto registriert? Melde dich ab und mit dessen E-Mail-Adresse an."));

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
      f.beruf = beruf.eingabe.value === "ik" ? "ik" : "kfb";
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
      var gewaehlt = f.beruf;
      // Mit dem Profil kann der Lernstand ans Konto (lernstand-sync.js).
      if (AP.lernstandSync) AP.lernstandSync.abgleichen();
      // Den Beta-Zugangscode nicht länger als nötig im Speicher halten.
      z.formular = leeresFormular();
      if (gewaehlt !== "ik" || p.beruf === "ik") {
        z.laeuft = false;
        z.profil = p;
        return ankommen({ text: "Dein Profil ist angelegt." });
      }
      // Ausbildung als zweiter Schritt (profil_anlegen kennt den Beruf nicht).
      var konto = z.nutzer;
      AP.community.profilAendern({ beruf: "ik" }).then(function (neu) {
        if (z.nutzer !== konto) return;
        z.laeuft = false;
        z.profil = neu || p;
        ankommen({ text: "Dein Profil ist angelegt." });
      }, function () {
        if (z.nutzer !== konto) return;
        z.laeuft = false;
        z.profil = p;
        ankommen({ text: "Dein Profil ist angelegt. Die Ausbildung konnte nicht gespeichert werden – ändere sie bitte im Profil.", fehler: true });
      });
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
    angabe("Ausbildung", berufName(p.beruf));
    if (p.rolle && p.rolle !== "azubi") angabe("Rolle", p.rolle === "mentor" ? "Mentor:in" : "Team");
    g.appendChild(liste);
    // Ausbildung ändern (20.10.2026): bestimmt die Lernfelder beim Schreiben und Filtern.
    var bForm = el("form", "cm-form cm-beruf-form");
    bForm.noValidate = true;
    var bFeld = feld({ label: "Ausbildung ändern", wert: p.beruf || "kfb", select: BERUFE });
    bForm.appendChild(bFeld.box);
    var bStatus = el("div");
    var bSpeichern = el("button", "kn-neben cm-neben", "Ausbildung speichern");
    bSpeichern.type = "submit";
    bForm.appendChild(bSpeichern);
    bForm.appendChild(bStatus);
    bForm.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (z.laeuft || bFeld.eingabe.value === (z.profil && z.profil.beruf)) return;
      if (offline()) return setze("offline");
      var passt = anfrage();
      sperren(bSpeichern, "Wird gespeichert …");
      AP.community.profilAendern({ beruf: bFeld.eingabe.value === "ik" ? "ik" : "kfb" }).then(function (neu) {
        if (!passt()) return;
        z.laeuft = false;
        z.profil = neu;
        setze("drin", { text: "Deine Ausbildung ist gespeichert: " + berufName(neu.beruf) + "." });
      }, function (fe) {
        if (!passt()) return;
        z.laeuft = false;
        freigeben(bSpeichern);
        if (fe && fe.art === "anmeldung") return abgelaufen();
        bStatus.innerHTML = "";
        var m = el("p", "meldung fehler", "Die Ausbildung konnte nicht gespeichert werden. Versuch es erneut.");
        m.setAttribute("role", "alert");
        bStatus.appendChild(m);
      });
    });
    g.appendChild(bForm);
    var reihe = el("div", "cm-reihe");
    var lesen = knopf("Community-Regeln lesen", "kn-neben cm-neben", function () { regelnZeigen(lesen); });
    reihe.appendChild(lesen);
    reihe.appendChild(abmeldeKnopf(r));
    g.appendChild(reihe);
    r.appendChild(g);
    // Spec 08: Passwort festlegen oder ändern – dasselbe Konto, dasselbe Profil.
    var pg = el("section", "feldgruppe");
    var ph = el("h2");
    ph.appendChild(el("span", null, "Passwort"));
    pg.appendChild(ph);
    pg.appendChild(el("p", "cm-hilfe cm-sichtbar",
      "Mit einem Passwort meldest du dich ohne Link aus dem Postfach an. Profil, Lernstand und Beiträge bleiben dieselben."));
    function formularOeffnen() {
      passwortFormular(pg, { konto: z.nutzer, fertig: function () { setze("drin", { text: ERFOLG_PASSWORT }); } });
    }
    if (z.pwOffen) {
      z.pwOffen = false;
      formularOeffnen();
    } else {
      var oeffnen = knopf("Passwort festlegen oder ändern", "kn-neben cm-neben", function () {
        if (z.laeuft) return;
        oeffnen.remove();
        formularOeffnen();
        var erstes = pg.querySelector("input");
        if (erstes) erstes.focus();
      });
      pg.appendChild(oeffnen);
    }
    r.appendChild(pg);
    if (z.frei !== false) {
      // Spec 06: eigene Meldungen, eigene ausgeblendete Inhalte, Moderation fürs Team.
      var m = el("section", "feldgruppe");
      var mh = el("h2");
      mh.appendChild(el("span", null, "Meldungen und Moderation"));
      m.appendChild(mh);
      var mr = el("div", "cm-reihe");
      mr.appendChild(verweis("Meine Meldungen", "#community/meine-meldungen", "kn-neben cm-neben"));
      mr.appendChild(verweis("Eigene ausgeblendete Inhalte", "#community/eigene-ausblendungen", "kn-neben cm-neben"));
      if (p.rolle === "team") mr.appendChild(AP.communityModeration.zaehlerVerweis(kontext()));
      m.appendChild(mr);
      r.appendChild(m);
    }
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
      if (verworfen()) return;
      if (ausloeser && document.contains(ausloeser)) ausloeser.focus();
    });
    var verworfen = dialogMerken(d);
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
    // Höchstens eine laufende, noch offene Wochenaufgabe (01-uebersicht, Heute).
    if (AP.communityGruppen) {
      var platz = el("div", "hm-aufgabe-platz");
      box.appendChild(platz);
      try { AP.communityGruppen.heuteAufgabe(platz); } catch (e) {}
    }
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
      // Spec 08: PASSWORD_RECOVERY meldet ebenfalls ein (vielleicht anderes) Konto an.
      if ((ereignis !== "SIGNED_IN" && ereignis !== "PASSWORD_RECOVERY") || !sitzung) return;
      var id = sitzung.user && sitzung.user.id;
      if (z.nutzer && id !== z.nutzer) {
        // Ein anderes Konto hat sich angemeldet (anderer Tab): Entwürfe und
        // laufende Antworten des alten Kontos verwerfen.
        kontoWeg();
        return;
      }
      if (sichtbar() && !z.laeuft && VOR_ANMELDUNG.indexOf(z.ansicht) >= 0) pruefen();
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
      if (sichtbar() && !z.laeuft && ["beitraege", "beitrag", "gesperrt", "moderation", "meineMeldungen", "eigeneListe", "gruppen", "gruppe", "aufgabe"].indexOf(z.ansicht) >= 0) {
        if (z.ansicht === "beitraege") AP.communityBeitraege.zurueckholen();
        pruefen();
      }
    });
  }

  AP.communityAnsicht = {
    init: init, zeigen: zeigen, verlassen: dialogeSchliessen, heuteAbschnitt: heuteAbschnitt, ichZeile: ichZeile,
    regelnZeigen: regelnZeigen,
    _zustand: function () { return JSON.parse(JSON.stringify({ ansicht: z.ansicht, ziel: z.ziel })); }
  };
})();
