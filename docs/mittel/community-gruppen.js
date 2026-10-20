/* AzubiPass · Community – Lerngruppen und Wochenaufgaben
   ---------------------------------------------------------------------------
   Nach doku/community/01-uebersicht.md (C07–C12, C16) und Lukes' Auftrag vom
   20.10.2026 (Schnellweg, Klassen-Beta am Freitag):

     C07  Lerngruppen               #community/gruppen
     C08  Gruppe per Code beitreten #community/gruppen/beitreten
     C10  Gruppe gründen            #community/gruppen/neu
     C09  Gruppe                    #community/gruppe/<id>   (Beiträge, Wochenaufgaben,
     C16  Gruppeninformationen                                Code, Mitglieder, Verlassen)
     C12  Wochenaufgabe stellen     #community/gruppe/<id>/aufgabe
                                    #community/aufgabe-neu   (Team: für alle)
     C11  Wochenaufgabe             #community/aufgabe/<id>

   Rechte prüft die Datenbank (RLS, gruppe_* und gruppe_beitrag_*). Jede
   Antwort wird nur gezeigt, wenn Ansicht und Konto noch gelten (ctx.gilt).
   Schreibende Schritte sperren ihren Knopf; bei unklarem Ausgang wird der
   Stand neu gelesen statt geraten. Nutzertext immer als Text.               */

(function () {
  "use strict";

  var AP = window.AP;
  var el = AP.el;
  function T() { return AP.communityBeitraege.teile; }

  // Bestätigung für die nächste Ansicht (nur für dasselbe Konto).
  var hinweis = null;     // { konto, text }
  function hinweisSetzen(ctx, text) { hinweis = { konto: ctx.konto, text: text }; }
  function hinweisNehmen(ctx) {
    var h = hinweis && hinweis.konto === ctx.konto ? hinweis.text : null;
    hinweis = null;
    return h;
  }

  function meldung(text, fehler) {
    var p = el("p", fehler ? "meldung fehler" : "meldung", text);
    p.setAttribute("role", fehler ? "alert" : "status");
    p.tabIndex = -1;
    return p;
  }

  function lesefehler(ctx, f) {
    if (f && f.art === "veraltet") return true;
    if (f && f.art === "anmeldung") { ctx.abgelaufen(); return true; }
    if (f && f.art === "gesperrt") { ctx.gesperrt(); return true; }
    if (f && f.art === "netz" && ctx.offline()) { ctx.offlineZeigen(); return true; }
    return false;
  }

  function ladefehler(box, text, nochmal) {
    box.innerHTML = "";
    box.appendChild(meldung(text, true));
    var reihe = el("div", "cm-reihe");
    reihe.appendChild(T().knopf("Erneut versuchen", "kn-haupt cm-haupt", nochmal));
    reihe.appendChild(T().verweis("Zu Lernen", "app.html#lernen"));
    box.appendChild(reihe);
  }

  // Server-Meldungen aus raise exception sind für Menschen geschrieben.
  function fehlertext(f, standard) {
    if (f && f.art === "eingabe" && f.message) return f.message;
    if (f && f.art === "rechte") return "Dafür fehlen dir die Rechte.";
    if (f && f.art === "bremse") return f.message || "Zu viele Versuche in kurzer Zeit. Warte einen Moment.";
    return standard;
  }

  function heuteIso() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function plusTage(iso, n) {
    var t = iso.split("-").map(Number);
    var d = new Date(t[0], t[1] - 1, t[2] + n);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function tag(iso) {
    if (!iso) return "";
    var t = String(iso).slice(0, 10).split("-");
    return t.length === 3 ? t[2] + "." + t[1] + "." + t[0] : iso;
  }
  function laeuft(a) { var h = heuteIso(); return a.beginn <= h && a.ende >= h; }

  function frage(ausloeser, titel, text, ja, beiJa) {
    var d = el("dialog", "cm-dialog");
    var id = "cm-gfrage-" + Date.now();
    d.setAttribute("aria-labelledby", id);
    var innen = el("div", "cm-dialog-innen");
    var h = el("h2", "cm-dialog-frage", titel);
    h.id = id;
    h.tabIndex = -1;
    innen.appendChild(h);
    if (text) innen.appendChild(el("p", null, text));
    var entschieden = false;
    var reihe = el("div", "cm-reihe");
    reihe.appendChild(T().knopf(ja, "kn-haupt cm-haupt", function () { entschieden = true; d.close(); }));
    reihe.appendChild(T().knopf("Abbrechen", "kn-neben cm-neben cm-dialog-neben", function () { d.close(); }));
    innen.appendChild(reihe);
    d.appendChild(innen);
    d.addEventListener("close", function () {
      d.remove();
      if (verworfen()) return;
      if (entschieden) return beiJa();
      if (ausloeser && document.contains(ausloeser)) ausloeser.focus();
    });
    var verworfen = AP.communityDialoge.merken(d);
    document.body.appendChild(d);
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
    h.focus();
  }

  /* Lokale Navigation der Community-Hauptansichten (01-uebersicht, §2). */
  function lokalnav(aktiv) {
    var nav = el("nav", "cm-lokalnav");
    nav.setAttribute("aria-label", "Bereiche der Community");
    var ul = el("ul", "liste-schlicht");
    [["beitraege", "Beiträge", "#community"], ["gruppen", "Lerngruppen", "#community/gruppen"]].forEach(function (x) {
      var li = el("li");
      var a = el("a", "cm-lokalnav-ziel", x[1]);
      a.href = x[2];
      if (x[0] === aktiv) a.setAttribute("aria-current", "page");
      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(ul);
    return nav;
  }

  function kopfOben(r, ctx, zurueckText, zurueckZiel) {
    var oben = el("div", "cm-oben");
    if (zurueckZiel) oben.appendChild(T().verweis(zurueckText, zurueckZiel, "kn-neben cm-zurueck"));
    else oben.appendChild(ctx.zurueckKnopf());
    oben.appendChild(T().verweis("Profil", "#community/profil", "kn-neben cm-neben cm-kopfaktion"));
    r.appendChild(oben);
  }

  function augenbraue(kopf, text) {
    var aug = kopf.querySelector(".schirm-augenbraue");
    if (aug) aug.textContent = text || "Ich · Community · Lerngruppen";
  }

  /* ================================================== C07 · Lerngruppen */

  function liste(r, ctx) {
    kopfOben(r, ctx);
    var kopf = ctx.kopf("Lerngruppen", "Lernt gemeinsam in kleinen Gruppen – mit eigenen Fragen, Tipps und Wochenaufgaben.");
    augenbraue(kopf);
    r.appendChild(kopf);
    r.appendChild(lokalnav("gruppen"));
    var status = el("div");
    r.appendChild(status);
    var h = hinweisNehmen(ctx);
    if (h) status.appendChild(meldung(h, false));
    var reihe = el("div", "cm-reihe cm-schreiben-reihe");
    reihe.appendChild(T().verweis("Gruppe gründen", "#community/gruppen/neu", "kn-haupt cm-haupt"));
    reihe.appendChild(T().verweis("Mit Code beitreten", "#community/gruppen/beitreten", "kn-neben cm-neben"));
    if (ctx.rolle() === "team") reihe.appendChild(T().verweis("Aufgabe für alle stellen", "#community/aufgabe-neu", "kn-neben cm-neben"));
    r.appendChild(reihe);
    var box = el("div", "cm-gruppen");
    r.appendChild(box);

    function zeile(g) {
      var li = el("li", "cm-beitrag");
      var oben = el("p", "cm-zeile-oben");
      oben.appendChild(el("span", null, g.offen ? "Offene Gruppe" : "Geschlossene Gruppe"));
      if (g.meine_rolle === "leitung") oben.appendChild(T().marke("Leitung"));
      li.appendChild(oben);
      var t = el("p", "cm-zeile-titel");
      var a = el("a", null, g.name);
      a.href = "#community/gruppe/" + g.id;
      t.appendChild(a);
      li.appendChild(t);
      if (g.beschreibung) li.appendChild(el("p", "cm-hilfe cm-auszug", g.beschreibung));
      var n = Number(g.mitglieder) || 0;
      li.appendChild(el("p", "cm-zeile-meta", n === 1 ? "1 Mitglied" : n + " Mitglieder"));
      return li;
    }

    function abschnitt(titel, zeilen, leer) {
      var s = el("section", "cm-abschnitt-block");
      s.appendChild(el("h2", "cm-abschnitt", titel));
      if (!zeilen.length) s.appendChild(el("p", "cm-leer", leer));
      else {
        var ul = el("ul", "liste-schlicht cm-beitraege");
        zeilen.forEach(function (g) { ul.appendChild(zeile(g)); });
        s.appendChild(ul);
      }
      return s;
    }

    function laden() {
      box.innerHTML = "";
      var st = el("p", "cm-hilfe", "Lerngruppen werden geladen …");
      st.setAttribute("role", "status");
      box.appendChild(st);
      AP.community.gruppen(false).then(function (alle) {
        if (!ctx.gilt()) return;
        alle = alle || [];
        box.innerHTML = "";
        box.appendChild(abschnitt("Meine Gruppen", alle.filter(function (g) { return !!g.meine_rolle; }),
          "Du bist noch in keiner Gruppe. Gründe eine oder tritt mit einem Code bei."));
        box.appendChild(abschnitt("Offene Gruppen", alle.filter(function (g) { return !g.meine_rolle && g.offen; }),
          "Gerade gibt es keine offenen Gruppen, denen du beitreten kannst."));
      }, function (f) {
        if (!ctx.gilt() || lesefehler(ctx, f)) return;
        ladefehler(box, "Die Lerngruppen konnten nicht geladen werden. Versuch es erneut.", laden);
      });
    }
    laden();
  }

  /* ================================================== C10 · Gruppe gründen */

  function gruenden(r, ctx) {
    kopfOben(r, ctx, "‹ Zurück zu Lerngruppen", "#community/gruppen");
    var kopf = ctx.kopf("Gruppe gründen", "Du leitest die Gruppe und kannst Wochenaufgaben stellen.");
    augenbraue(kopf);
    r.appendChild(kopf);
    var form = el("form", "cm-form");
    form.noValidate = true;
    var ansage = T().vorlesen();
    var name = ctx.feld({ label: "Name der Gruppe", pflicht: true, attr: { autocomplete: "off" } });
    T().zaehler(name, 60, function (d) { T().grenzMeldung(name, d, "Der Name braucht 3 bis 60 Zeichen.", ansage); });
    form.appendChild(name.box);
    var beschr = T().mehrzeilig(ctx, { label: "Beschreibung (optional)", zeilen: 4,
      hilfe: "Worum geht es in der Gruppe? Zum Beispiel: „Wir üben jede Woche Buchungssätze für die Prüfung.“" });
    T().zaehler(beschr, 500, function (d) { T().grenzMeldung(beschr, d, "Die Beschreibung darf höchstens 500 Zeichen lang sein.", ansage); });
    form.appendChild(beschr.box);
    var offen = ctx.haken("Offene Gruppe: Alle in der Community sehen sie und können beitreten.", false, false);
    form.appendChild(offen.box);
    form.appendChild(el("p", "cm-hilfe", "Ohne Haken ist die Gruppe geschlossen. Dann kommt nur hinein, wer den Gruppencode von dir bekommt."));
    form.appendChild(ansage);
    var status = el("div", "cm-schreib-status");
    form.appendChild(status);
    var reihe = el("div", "cm-reihe");
    var senden = el("button", "kn-haupt cm-haupt", "Gruppe gründen");
    senden.type = "submit";
    reihe.appendChild(senden);
    reihe.appendChild(T().verweis("Abbrechen", "#community/gruppen", "kn-neben cm-neben"));
    form.appendChild(reihe);
    r.appendChild(form);
    var laeuftGerade = false;

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (laeuftGerade) return;
      status.innerHTML = "";
      var n = AP.community.laenge(name.eingabe.value.trim());
      var tn = n < 3 || n > 60 ? "Der Name braucht 3 bis 60 Zeichen." : "";
      var tb = AP.community.laenge(beschr.eingabe.value.trim()) > 500 ? "Die Beschreibung darf höchstens 500 Zeichen lang sein." : "";
      ctx.fehlerSetzen(name, tn);
      ctx.fehlerSetzen(beschr, tb);
      if (tn) return name.eingabe.focus();
      if (tb) return beschr.eingabe.focus();
      if (ctx.offline()) return ctx.offlineZeigen();
      laeuftGerade = true;
      ctx.sperren(senden, "Gruppe wird gegründet …");
      T().eingabenSperren(form, true);
      AP.community.gruppeGruenden({ name: name.eingabe.value, beschreibung: beschr.eingabe.value, offen: offen.eingabe.checked })
        .then(function (id) {
          laeuftGerade = false;
          if (!ctx.gilt()) return;
          hinweisSetzen(ctx, "Deine Gruppe wurde gegründet. Teile den Gruppencode mit allen, die mitmachen sollen.");
          location.hash = "#community/gruppe/" + id;
        }, function (f) {
          laeuftGerade = false;
          if (!ctx.gilt()) return;
          ctx.freigeben(senden);
          T().eingabenSperren(form, false);
          if (f && f.art === "anmeldung") return ctx.abgelaufen();
          if (f && (f.art === "netz" || f.art === "server")) {
            // Ausgang offen: Nicht blind wiederholen, sonst entstehen zwei Gruppen.
            status.appendChild(meldung("Wir konnten nicht prüfen, ob die Gruppe gegründet wurde. Sieh zuerst in deinen Lerngruppen nach.", true));
            status.appendChild(T().verweis("Zu meinen Lerngruppen", "#community/gruppen", "kn-neben cm-neben"));
            return status.firstChild.focus();
          }
          status.appendChild(meldung(fehlertext(f, "Die Gruppe wurde nicht gegründet. Deine Eingaben sind noch da."), true));
          status.firstChild.focus();
        });
    });
  }

  /* ================================================== C08 · Mit Code beitreten */

  function beitreten(r, ctx) {
    kopfOben(r, ctx, "‹ Zurück zu Lerngruppen", "#community/gruppen");
    var kopf = ctx.kopf("Mit Code beitreten", "Den Gruppencode bekommst du von der Gruppenleitung.");
    augenbraue(kopf);
    r.appendChild(kopf);
    var form = el("form", "cm-form");
    form.noValidate = true;
    var code = ctx.feld({ label: "Gruppencode", pflicht: true, hilfe: "8 Zeichen, zum Beispiel K7Q2M9XA.",
      attr: { autocomplete: "off", autocapitalize: "characters", spellcheck: "false", maxlength: "12" } });
    form.appendChild(code.box);
    var status = el("div", "cm-schreib-status");
    form.appendChild(status);
    var reihe = el("div", "cm-reihe");
    var senden = el("button", "kn-haupt cm-haupt", "Beitreten");
    senden.type = "submit";
    reihe.appendChild(senden);
    reihe.appendChild(T().verweis("Abbrechen", "#community/gruppen", "kn-neben cm-neben"));
    form.appendChild(reihe);
    r.appendChild(form);
    var laeuftGerade = false;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (laeuftGerade) return;
      status.innerHTML = "";
      var wert = code.eingabe.value.replace(/[^A-Za-z0-9]/g, "");
      ctx.fehlerSetzen(code, wert ? "" : "Gib den Gruppencode ein.");
      if (!wert) return code.eingabe.focus();
      if (ctx.offline()) return ctx.offlineZeigen();
      laeuftGerade = true;
      ctx.sperren(senden, "Wird geprüft …");
      AP.community.gruppeBeitreten(wert).then(function (id) {
        laeuftGerade = false;
        if (!ctx.gilt()) return;
        hinweisSetzen(ctx, "Du bist jetzt Mitglied dieser Gruppe.");
        location.hash = "#community/gruppe/" + id;
      }, function (f) {
        laeuftGerade = false;
        if (!ctx.gilt()) return;
        ctx.freigeben(senden);
        if (f && f.art === "anmeldung") return ctx.abgelaufen();
        // Beitreten ist wiederholbar: doppelt Mitglied werden geht nicht.
        status.appendChild(meldung(fehlertext(f, "Das hat nicht geklappt. Versuch es erneut – doppelt beitreten kannst du nicht."), true));
        status.firstChild.focus();
      });
    });
  }

  /* ================================================== C09 · Gruppe (mit C16) */

  function gruppe(r, ctx, id) {
    kopfOben(r, ctx, "‹ Zurück zu Lerngruppen", "#community/gruppen");
    var kopf = ctx.kopf("Gruppe wird geladen …");
    augenbraue(kopf);
    r.appendChild(kopf);
    var box = el("div", "cm-detail cm-gruppe");
    r.appendChild(box);
    var bestaetigt = hinweisNehmen(ctx);

    function laden(meld) {
      box.innerHTML = "";
      AP.community.gruppe(id).then(function (g) {
        if (!ctx.gilt()) return;
        if (!g) return ctx.nichtDa();
        zeigen(g, meld || bestaetigt);
        bestaetigt = null;
      }, function (f) {
        if (!ctx.gilt() || lesefehler(ctx, f)) return;
        ladefehler(box, "Die Gruppe konnte nicht geladen werden. Versuch es erneut.", function () { laden(); });
      });
    }

    function zeigen(g, meld) {
      var h = r.querySelector("h1");
      h.textContent = g.name;
      box.innerHTML = "";
      var zo = el("p", "cm-zeile-oben");
      zo.appendChild(el("span", null, g.offen ? "Offene Gruppe" : "Geschlossene Gruppe"));
      if (g.meine_rolle === "leitung") zo.appendChild(T().marke("Du leitest die Gruppe"));
      var alt = kopf.querySelector(".cm-zeile-oben");
      if (alt) alt.remove();
      kopf.insertBefore(zo, h);
      if (meld) box.appendChild(meldung(meld, false));
      if (g.beschreibung) box.appendChild(el("div", "cm-text", g.beschreibung));
      var n = Number(g.mitglieder) || 0;
      box.appendChild(el("p", "cm-zeile-meta", n === 1 ? "1 Mitglied" : n + " Mitglieder"));
      var mitglied = !!g.meine_rolle;
      var team = ctx.rolle() === "team";

      if (!mitglied) {
        if (g.offen) box.appendChild(beitretenBereich(g));
        if (!team) return;
        box.appendChild(el("p", "cm-hilfe", "Du siehst diese Gruppe, weil du zum Team gehörst."));
      }
      box.appendChild(beitraegeBereich(g, mitglied));
      box.appendChild(aufgabenBereich(g, team));
      if (mitglied) box.appendChild(infoBereich(g));
      var m = box.querySelector(".meldung");
      if (m) m.focus();
    }

    function beitretenBereich(g) {
      var s = el("div", "cm-reihe");
      var status = el("div");
      var k = T().knopf("Gruppe beitreten", "kn-haupt cm-haupt", function () {
        if (k.disabled || !ctx.gilt()) return;
        ctx.sperren(k, "Wird beigetreten …");
        AP.community.offenerGruppeBeitreten(g.id).then(function () {
          if (!ctx.gilt()) return;
          laden("Du bist jetzt Mitglied dieser Gruppe.");
        }, function (f) {
          if (!ctx.gilt()) return;
          if (f && f.art === "anmeldung") return ctx.abgelaufen();
          // „Das gibt es schon“: Mitgliedschaft besteht bereits – Stand neu lesen.
          if (f && f.art === "eingabe" && /schon/.test(f.message || "")) return laden("Du bist Mitglied dieser Gruppe.");
          ctx.freigeben(k);
          status.innerHTML = "";
          status.appendChild(meldung(fehlertext(f, "Beitreten hat nicht geklappt. Versuch es erneut."), true));
        });
      });
      s.appendChild(k);
      var wrap = el("div");
      wrap.appendChild(s);
      wrap.appendChild(status);
      return wrap;
    }

    function beitraegeBereich(g, mitglied) {
      var s = el("section", "cm-mod-teil cm-gruppe-teil");
      s.appendChild(el("h2", "cm-abschnitt", "Beiträge der Gruppe"));
      if (mitglied) {
        var rw = el("div", "cm-reihe cm-schreiben-reihe");
        var a = T().verweis("Beitrag schreiben", "#community/gruppe/" + g.id + "/schreiben", "kn-haupt cm-haupt");
        a.addEventListener("click", function () { ctx.merkeHerkunft(); });
        rw.appendChild(a);
        s.appendChild(rw);
      }
      var liste = el("div");
      s.appendChild(liste);
      var mehr = el("div", "cm-mehr");
      s.appendChild(mehr);
      var weiter = null;
      function seite(erste) {
        if (erste) {
          liste.innerHTML = "";
          var st = el("p", "cm-hilfe", "Beiträge werden geladen …");
          st.setAttribute("role", "status");
          liste.appendChild(st);
        }
        mehr.innerHTML = "";
        var q = { gruppe: g.id, ohneAusgeblendete: true, anzahl: 20 };
        if (!erste && weiter) q.nach = weiter;
        AP.community.beitragSeite(q).then(function (x) {
          if (!ctx.gilt()) return;
          if (erste) liste.innerHTML = "";
          var ul = liste.querySelector("ul");
          if (!x.zeilen.length && erste) {
            liste.appendChild(el("p", "cm-leer", mitglied ? "Noch keine Beiträge. Stell die erste Frage!" : "Noch keine Beiträge."));
            return;
          }
          if (!ul) { ul = el("ul", "liste-schlicht cm-beitraege"); liste.appendChild(ul); }
          x.zeilen.forEach(function (b) {
            var li = el("li", "cm-beitrag");
            var o = el("p", "cm-zeile-oben");
            o.appendChild(el("span", null, b.art === "frage" ? "Frage" : b.art === "tipp" ? "Tipp" : "Lernzettel"));
            if (b.art === "frage" && b.geloest) o.appendChild(T().marke("Gelöst"));
            li.appendChild(o);
            var t = el("p", "cm-zeile-titel");
            var a = el("a", null, b.titel);
            a.href = "#community/beitrag/" + b.id;
            a.addEventListener("click", function () { ctx.merkeHerkunft(); });
            t.appendChild(a);
            li.appendChild(t);
            var antworten = Number(b.antworten) || 0;
            li.appendChild(el("p", "cm-zeile-meta", [T().personText(b.autor_name, b.autor_rolle, b.autor_lehrjahr),
              T().datum(b.erstellt_am), antworten === 1 ? "1 Antwort" : antworten + " Antworten"].join(" · ")));
            ul.appendChild(li);
          });
          weiter = x.weiter;
          if (weiter) mehr.appendChild(T().knopf("Weitere Beiträge laden", "kn-neben cm-neben", function () { seite(false); }));
        }, function (f) {
          if (!ctx.gilt() || lesefehler(ctx, f)) return;
          if (erste) liste.innerHTML = "";
          var p = meldung("Die Beiträge konnten nicht geladen werden.", true);
          (erste ? liste : mehr).appendChild(p);
          (erste ? liste : mehr).appendChild(T().knopf("Erneut versuchen", "kn-neben cm-neben", function () { seite(erste); }));
        });
      }
      seite(true);
      return s;
    }

    function aufgabenBereich(g, team) {
      var s = el("section", "cm-mod-teil cm-gruppe-teil");
      s.appendChild(el("h2", "cm-abschnitt", "Wochenaufgaben"));
      if (g.meine_rolle === "leitung") {
        var rw = el("div", "cm-reihe cm-schreiben-reihe");
        rw.appendChild(T().verweis("Wochenaufgabe stellen", "#community/gruppe/" + g.id + "/aufgabe", "kn-haupt cm-haupt"));
        s.appendChild(rw);
      }
      var liste = el("div");
      s.appendChild(liste);
      function laden() {
        liste.innerHTML = "";
        var st = el("p", "cm-hilfe", "Wochenaufgaben werden geladen …");
        st.setAttribute("role", "status");
        liste.appendChild(st);
        AP.community.aufgaben({ gruppe: g.id }).then(function (alle) {
          if (!ctx.gilt()) return;
          liste.innerHTML = "";
          alle = alle || [];
          if (!alle.length) {
            liste.appendChild(el("p", "cm-leer", g.meine_rolle === "leitung"
              ? "Noch keine Wochenaufgabe. Stell der Gruppe die erste!" : "Gerade gibt es keine Wochenaufgabe."));
            return;
          }
          // Laufende zuerst (nächstes Ende zuerst), danach die beendeten (neueste zuerst).
          var lauf = alle.filter(laeuft), rest = alle.filter(function (a) { return !laeuft(a); });
          rest.sort(function (a, b) { return a.ende < b.ende ? 1 : -1; });
          var ul = el("ul", "liste-schlicht cm-beitraege");
          lauf.concat(rest).forEach(function (a) { ul.appendChild(aufgabeZeile(a)); });
          liste.appendChild(ul);
        }, function (f) {
          if (!ctx.gilt() || lesefehler(ctx, f)) return;
          liste.innerHTML = "";
          liste.appendChild(meldung("Die Wochenaufgaben konnten nicht geladen werden.", true));
          liste.appendChild(T().knopf("Erneut versuchen", "kn-neben cm-neben", laden));
        });
      }
      laden();
      return s;
    }

    function infoBereich(g) {
      var s = el("section", "cm-mod-teil cm-gruppe-teil");
      s.appendChild(el("h2", "cm-abschnitt", "Gruppe"));
      var codeBox = el("div");
      s.appendChild(codeBox);
      AP.community.gruppenCode(g.id).then(function (c) {
        if (!ctx.gilt() || !c) return;
        var dl = el("dl", "cm-angaben");
        dl.appendChild(el("dt", null, "Gruppencode"));
        dl.appendChild(el("dd", "cm-gruppencode", c));
        codeBox.appendChild(dl);
        codeBox.appendChild(el("p", "cm-hilfe", "Teile den Code nur mit Leuten, die in die Gruppe sollen."));
      }, function () {});
      var mBox = el("div");
      s.appendChild(mBox);
      AP.community.mitglieder(g.id).then(function (ms) {
        if (!ctx.gilt()) return;
        mBox.appendChild(el("h3", null, "Mitglieder"));
        var ul = el("ul", "liste-schlicht cm-mitglieder");
        (ms || []).forEach(function (m) {
          var p = m.profil || {};
          var li = el("li", "cm-zeile-meta", T().personText(p.anzeigename, p.rolle, p.lehrjahr) +
            (m.rolle === "leitung" ? " · Leitung" : ""));
          ul.appendChild(li);
        });
        mBox.appendChild(ul);
      }, function () {
        if (!ctx.gilt()) return;
        mBox.appendChild(el("p", "cm-hilfe", "Die Mitglieder konnten nicht geladen werden."));
      });
      var status = el("div");
      var k = T().knopf("Gruppe verlassen", "kn-neben cm-neben", function () {
        var leitung = g.meine_rolle === "leitung";
        frage(k, "Gruppe verlassen?", leitung
          ? "Die Leitung geht an das Mitglied, das am längsten dabei ist. Bist du allein, wird die Gruppe gelöscht."
          : "Du kannst später mit dem Code oder – bei offenen Gruppen – direkt wieder beitreten.",
          "Gruppe verlassen", function () {
            if (!ctx.gilt()) return;
            ctx.sperren(k, "Wird verlassen …");
            AP.community.gruppeVerlassen(g.id).then(function () {
              if (!ctx.gilt()) return;
              hinweisSetzen(ctx, "Du hast die Gruppe „" + g.name + "“ verlassen.");
              location.hash = "#community/gruppen";
            }, function (f) {
              if (!ctx.gilt()) return;
              if (f && f.art === "anmeldung") return ctx.abgelaufen();
              ctx.freigeben(k);
              status.innerHTML = "";
              // Verlassen ist wiederholbar: wer nicht mehr Mitglied ist, wird übersprungen.
              status.appendChild(meldung("Das hat nicht geklappt. Versuch es erneut.", true));
            });
          });
      });
      var rw = el("div", "cm-reihe");
      rw.appendChild(k);
      s.appendChild(rw);
      s.appendChild(status);
      return s;
    }

    laden();
  }

  function aufgabeZeile(a) {
    var li = el("li", "cm-beitrag");
    var o = el("p", "cm-zeile-oben");
    o.appendChild(el("span", null, laeuft(a) ? "Läuft bis " + tag(a.ende) : a.beginn > heuteIso() ? "Ab " + tag(a.beginn) : "Beendet am " + tag(a.ende)));
    if (a.von_mir_erledigt) o.appendChild(T().marke("Erledigt"));
    li.appendChild(o);
    var t = el("p", "cm-zeile-titel");
    var l = el("a", null, a.titel);
    l.href = "#community/aufgabe/" + a.id;
    t.appendChild(l);
    li.appendChild(t);
    var n = Number(a.erledigt_zahl) || 0;
    li.appendChild(el("p", "cm-zeile-meta", (a.gruppe_name ? a.gruppe_name + " · " : "Für alle · ") +
      (n === 1 ? "1 hat sie erledigt" : n + " haben sie erledigt")));
    return li;
  }

  /* ================================================== C12 · Wochenaufgabe stellen */

  function aufgabeNeu(r, ctx, gruppeId) {
    var zurueck = gruppeId ? "#community/gruppe/" + gruppeId : "#community/gruppen";
    kopfOben(r, ctx, gruppeId ? "‹ Zurück zur Gruppe" : "‹ Zurück zu Lerngruppen", zurueck);
    var kopf = ctx.kopf("Wochenaufgabe stellen", gruppeId
      ? "Eine kleine Aufgabe für deine Gruppe, die alle bis zum Enddatum abhaken können."
      : "Eine Aufgabe für alle in der Community. Sie erscheint auch auf Heute.");
    augenbraue(kopf);
    r.appendChild(kopf);
    var form = el("form", "cm-form");
    form.noValidate = true;
    var ansage = T().vorlesen();
    var titel = ctx.feld({ label: "Titel", pflicht: true, attr: { autocomplete: "off" },
      hilfe: "Zum Beispiel: „Fünf Buchungssätze zu Skonto lösen“." });
    T().zaehler(titel, 120, function (d) { T().grenzMeldung(titel, d, "Der Titel braucht 3 bis 120 Zeichen.", ansage); });
    form.appendChild(titel.box);
    var beschr = T().mehrzeilig(ctx, { label: "Beschreibung (optional)", zeilen: 5 });
    T().zaehler(beschr, 1000, function (d) { T().grenzMeldung(beschr, d, "Die Beschreibung darf höchstens 1000 Zeichen lang sein.", ansage); });
    form.appendChild(beschr.box);
    var heute = heuteIso();
    var ende = ctx.feld({ label: "Läuft bis", pflicht: true, typ: "date", wert: plusTage(heute, 6),
      hilfe: "Die Aufgabe beginnt heute und läuft höchstens 31 Tage.",
      attr: { min: heute, max: plusTage(heute, 31) } });
    form.appendChild(ende.box);
    form.appendChild(ansage);
    var status = el("div", "cm-schreib-status");
    form.appendChild(status);
    var reihe = el("div", "cm-reihe");
    var senden = el("button", "kn-haupt cm-haupt", "Aufgabe stellen");
    senden.type = "submit";
    reihe.appendChild(senden);
    reihe.appendChild(T().verweis("Abbrechen", zurueck, "kn-neben cm-neben"));
    form.appendChild(reihe);
    r.appendChild(form);
    var laeuftGerade = false;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (laeuftGerade) return;
      status.innerHTML = "";
      var nt = AP.community.laenge(titel.eingabe.value.trim());
      var tt = nt < 3 || nt > 120 ? "Der Titel braucht 3 bis 120 Zeichen." : "";
      var tb = AP.community.laenge(beschr.eingabe.value) > 1000 ? "Die Beschreibung darf höchstens 1000 Zeichen lang sein." : "";
      var e = ende.eingabe.value;
      var te = !e || e < heute || e > plusTage(heute, 31) ? "Wähle ein Enddatum zwischen heute und in 31 Tagen." : "";
      ctx.fehlerSetzen(titel, tt);
      ctx.fehlerSetzen(beschr, tb);
      ctx.fehlerSetzen(ende, te);
      if (tt) return titel.eingabe.focus();
      if (tb) return beschr.eingabe.focus();
      if (te) return ende.eingabe.focus();
      if (ctx.offline()) return ctx.offlineZeigen();
      laeuftGerade = true;
      ctx.sperren(senden, "Aufgabe wird gestellt …");
      T().eingabenSperren(form, true);
      AP.community.aufgabeStellen({ gruppe: gruppeId || null, titel: titel.eingabe.value, beschreibung: beschr.eingabe.value,
                                    beginn: heute, ende: e })
        .then(function (id) {
          laeuftGerade = false;
          if (!ctx.gilt()) return;
          hinweisSetzen(ctx, "Die Wochenaufgabe wurde gestellt.");
          location.hash = "#community/aufgabe/" + id;
        }, function (f) {
          laeuftGerade = false;
          if (!ctx.gilt()) return;
          ctx.freigeben(senden);
          T().eingabenSperren(form, false);
          if (f && f.art === "anmeldung") return ctx.abgelaufen();
          if (f && (f.art === "netz" || f.art === "server")) {
            status.appendChild(meldung("Wir konnten nicht prüfen, ob die Aufgabe gestellt wurde. Sieh zuerst in der Gruppe nach.", true));
            status.appendChild(T().verweis(gruppeId ? "Zur Gruppe" : "Zu Lerngruppen", zurueck, "kn-neben cm-neben"));
            return status.firstChild.focus();
          }
          status.appendChild(meldung(fehlertext(f, "Die Aufgabe wurde nicht gestellt. Deine Eingaben sind noch da."), true));
          status.firstChild.focus();
        });
    });
  }

  /* ================================================== C11 · Wochenaufgabe */

  function aufgabe(r, ctx, id) {
    var oben = el("div", "cm-oben");
    var zurueck = T().verweis("‹ Zurück zu Lerngruppen", "#community/gruppen", "kn-neben cm-zurueck");
    oben.appendChild(zurueck);
    oben.appendChild(T().verweis("Profil", "#community/profil", "kn-neben cm-neben cm-kopfaktion"));
    r.appendChild(oben);
    var kopf = ctx.kopf("Wochenaufgabe wird geladen …");
    augenbraue(kopf);
    r.appendChild(kopf);
    var box = el("div", "cm-detail");
    r.appendChild(box);
    var bestaetigt = hinweisNehmen(ctx);

    function laden(meld) {
      AP.community.aufgabe(id).then(function (a) {
        if (!ctx.gilt()) return;
        if (!a) return ctx.nichtDa();
        zeigen(a, meld || bestaetigt);
        bestaetigt = null;
      }, function (f) {
        if (!ctx.gilt() || lesefehler(ctx, f)) return;
        ladefehler(box, "Die Wochenaufgabe konnte nicht geladen werden. Versuch es erneut.", function () { laden(); });
      });
    }

    function zeigen(a, meld) {
      r.querySelector("h1").textContent = a.titel;
      if (a.gruppe_id) {
        zurueck.textContent = "‹ Zurück zur Gruppe";
        zurueck.href = "#community/gruppe/" + a.gruppe_id;
      }
      var alt = kopf.querySelector(".cm-zeile-oben");
      if (alt) alt.remove();
      var zo = el("p", "cm-zeile-oben");
      zo.appendChild(el("span", null, a.gruppe_name ? "Gruppe „" + a.gruppe_name + "“" : "Für alle in der Community"));
      zo.appendChild(el("span", null, laeuft(a) ? "Läuft bis " + tag(a.ende) : "Beendet am " + tag(a.ende)));
      kopf.insertBefore(zo, r.querySelector("h1"));
      box.innerHTML = "";
      if (meld) box.appendChild(meldung(meld, false));
      if (a.beschreibung) box.appendChild(el("div", "cm-text", a.beschreibung));
      box.appendChild(el("p", "cm-zeile-meta", "Zeitraum: " + tag(a.beginn) + " bis " + tag(a.ende)));
      var n = Number(a.erledigt_zahl) || 0;
      var zahl = el("p", "cm-zeile-meta", n === 1 ? "1 hat die Aufgabe erledigt." : n + " haben die Aufgabe erledigt.");
      box.appendChild(zahl);
      var status = el("div");
      var reihe = el("div", "cm-reihe");
      if (laeuft(a) || a.von_mir_erledigt) {
        var k = T().knopf(a.von_mir_erledigt ? "Erledigt – zurücknehmen" : "Als erledigt markieren",
          a.von_mir_erledigt ? "kn-neben cm-neben" : "kn-haupt cm-haupt", function () {
          if (k.disabled || !ctx.gilt()) return;
          ctx.sperren(k, "Wird gespeichert …");
          status.innerHTML = "";
          AP.community.erledigt(a.id, !a.von_mir_erledigt).then(function () {
            if (!ctx.gilt()) return;
            laden(a.von_mir_erledigt ? "Markierung zurückgenommen." : "Gut gemacht! Die Aufgabe ist als erledigt markiert.");
          }, function (f) {
            if (!ctx.gilt()) return;
            if (f && f.art === "anmeldung") return ctx.abgelaufen();
            // Den tatsächlichen Stand neu lesen, statt einen Zustand zu raten.
            laden();
            setTimeout(function () {
              if (!ctx.gilt()) return;
              box.insertBefore(meldung(fehlertext(f, "Das konnte nicht gespeichert werden. Versuch es erneut."), true), box.firstChild);
            }, 0);
          });
        });
        reihe.appendChild(k);
      } else {
        box.appendChild(el("p", "cm-hilfe", "Die Aufgabe ist beendet. Abhaken geht nur, solange sie läuft."));
      }
      box.appendChild(reihe);
      box.appendChild(status);
      // Löschen: Leitung der Gruppe oder Team. Ob es erlaubt ist, entscheidet die Datenbank.
      var darf = ctx.rolle() === "team" || a.erstellt_von === ctx.konto;
      if (darf) {
        var rl = el("div", "cm-reihe");
        var lk = T().knopf("Aufgabe löschen", "cm-verweis", function () {
          frage(lk, "Diese Wochenaufgabe löschen?", "Auch die Erledigt-Markierungen werden gelöscht.", "Aufgabe löschen", function () {
            if (!ctx.gilt()) return;
            ctx.sperren(lk, "Wird gelöscht …");
            AP.community.aufgabeLoeschen(a.id).then(function () {
              if (!ctx.gilt()) return;
              hinweisSetzen(ctx, "Die Wochenaufgabe wurde gelöscht.");
              location.hash = a.gruppe_id ? "#community/gruppe/" + a.gruppe_id : "#community/gruppen";
            }, function (f) {
              if (!ctx.gilt()) return;
              ctx.freigeben(lk);
              status.innerHTML = "";
              status.appendChild(meldung(fehlertext(f, "Die Aufgabe wurde nicht gelöscht. Versuch es erneut."), true));
            });
          });
        });
        rl.appendChild(lk);
        box.appendChild(rl);
      }
      var m = box.querySelector(".meldung");
      if (m) m.focus();
    }
    laden();
  }

  /* ================================================== Heute: eine laufende Aufgabe */

  /* Nur mit gespeicherter Sitzung und Internet; ohne Profil liefert die
     Datenbank nichts. Lädt nichts, wenn niemand angemeldet ist. */
  function heuteAufgabe(platz) {
    if (!AP.community.hatGespeicherteSitzung() || navigator.onLine === false) return;
    var st = el("p", "cm-hilfe hm-aufgabe-lade", "Wochenaufgabe wird geladen …");
    platz.appendChild(st);
    AP.community.aufgaben({ laufend: true }).then(function (alle) {
      platz.innerHTML = "";
      var offen = (alle || []).filter(function (a) { return !a.von_mir_erledigt; });
      offen.sort(function (a, b) {
        return a.ende !== b.ende ? (a.ende < b.ende ? -1 : 1) : a.titel.localeCompare(b.titel, "de") || (a.id < b.id ? -1 : 1);
      });
      var a = offen[0];
      if (!a) return;
      var l = el("a", "hm-gemeinsam-link hm-aufgabe");
      l.href = "app.html#community/aufgabe/" + a.id;
      var lbl = el("span", "hm-lbl");
      lbl.appendChild(document.createTextNode("Wochenaufgabe: " + a.titel));
      lbl.appendChild(el("span", "hm-aufgabe-meta", (a.gruppe_name ? a.gruppe_name + " · " : "") + "bis " + tag(a.ende)));
      l.appendChild(lbl);
      l.appendChild(el("span", "hm-wert", "Aufgabe ansehen"));
      platz.appendChild(l);
    }, function (f) {
      platz.innerHTML = "";
      if (f && (f.art === "anmeldung" || f.art === "veraltet")) return;
      platz.appendChild(el("p", "cm-hilfe", "Die Wochenaufgabe konnte nicht geladen werden."));
    });
  }

  AP.communityGruppen = {
    liste: liste, gruenden: gruenden, beitreten: beitreten, gruppe: gruppe,
    aufgabeNeu: aufgabeNeu, aufgabe: aufgabe, lokalnav: lokalnav, heuteAufgabe: heuteAufgabe,
    vergessen: function () { hinweis = null; }
  };
})();
