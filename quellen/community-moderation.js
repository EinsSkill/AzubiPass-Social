/* AzubiPass · Community – Melden und Moderation
   ---------------------------------------------------------------------------
   Nach doku/community/06-melden-moderation.md (v2) und 06-technik-plan.md
   (freigegeben 15.10.2026, E1–E12):

     C13  Inhalt melden            Dialog am Beitrag und an jeder Antwort
     C14  Moderation (Team)        Offene Fälle · Ausgeblendete Inhalte · Protokoll
          Inhalt prüfen            Fall mit Meldungen, Prüfanfrage, Entscheidung
     ––   Meine Meldungen          Status Offen / Abgeschlossen
     ––   Eigene ausgeblendete Inhalte, eigener Inhalt mit Begründung und
          einmaliger Prüfanfrage je Ausblendungsentscheidung

   Rechte entscheidet nur die Datenbank (moderation_* und Co. prüfen Team,
   Profil und Paketsperre). Die Oberfläche zeigt Team-Einstiege nur als
   Bequemlichkeit. Schreibende Vorgänge folgen dem Muster aus Spec 05:
   fester Versandstand, gesperrte Eingaben, „unklar“ mit Status prüfen,
   gleiche Kennung bei Wiederholung. Nutzertext immer als Text.               */

(function () {
  "use strict";

  var AP = window.AP;
  var el = AP.el;
  function T() { return AP.communityBeitraege.teile; }

  var GRUND = { falsch: "Fachlich falsch", urheberrecht: "Urheberrecht", beleidigung: "Beleidigung",
                spam: "Spam", persoenliche_daten: "Persönliche Daten", sonstiges: "Sonstiges" };
  var GRUND_REIHE = ["falsch", "urheberrecht", "beleidigung", "spam", "persoenliche_daten", "sonstiges"];
  var AKTION = {
    ausblenden: "Inhalt ausgeblendet", weiter_ausblenden: "Weiter ausgeblendet", einblenden: "Wieder eingeblendet",
    sichtbar_lassen: "Meldungen abgeschlossen", korrektur: "Fachliche Korrektur ergänzt",
    anfrage_aufheben: "Prüfanfrage: Ausblendung aufgehoben", anfrage_bestaetigen: "Prüfanfrage: Ausblendung bestätigt",
    erklaerung_aendern: "Erklärung geändert", automatisch_ausgeblendet: "Nach drei Meldungen vorläufig ausgeblendet"
  };
  var ERFOLG = {
    ausblenden: "Der Inhalt wurde ausgeblendet.", sichtbar_lassen: "Die geprüften Meldungen wurden abgeschlossen.",
    weiter_ausblenden: "Der Inhalt bleibt ausgeblendet.", einblenden: "Der Inhalt wurde wieder eingeblendet.",
    korrektur: "Die Teamkorrektur wurde veröffentlicht.", anfrage_aufheben: "Die Ausblendung wurde aufgehoben.",
    anfrage_bestaetigen: "Die Ausblendung wurde nach erneuter Prüfung bestätigt.",
    erklaerung_aendern: "Die Erklärung wurde geändert."
  };
  var T_GEAENDERT = "Der Fall hat sich geändert. Prüfe die aktuellen Meldungen erneut.";
  var T_NICHT_VERFUEGBAR = "Dieser Bereich ist für dich nicht verfügbar.";
  var T_LADEFEHLER = "Die Moderation konnte nicht geladen werden. Versuch es erneut.";
  var T_VORLAEUFIG = "Dieser Inhalt wurde nach mehreren Meldungen vorläufig ausgeblendet. Das Team hat noch nicht entschieden.";

  // Bestätigung nach einer Entscheidung, angezeigt in der frisch geladenen Liste.
  var nachEntscheidung = null;     // { konto, text }
  // Direkter Weg vom Beitrag (D13): die Fallansicht öffnet gleich das Formular.
  var vorwahl = null;              // { konto, art, id, aktion }

  /* ================================================== kleine Hilfen */

  function meldung(text, fehler) {
    var p = el("p", fehler ? "meldung fehler" : "meldung", text);
    p.setAttribute("role", fehler ? "alert" : "status");
    p.tabIndex = -1;
    return p;
  }

  // Gemeinsame Fehlerwege beim Lesen. true = erledigt (Ansicht gewechselt).
  function lesefehler(ctx, f) {
    if (f && f.art === "veraltet") return true;
    if (f && f.art === "anmeldung") { ctx.abgelaufen(); return true; }
    if (f && f.art === "gesperrt") { ctx.gesperrt(); return true; }
    if (f && f.art === "netz" && ctx.offline()) { ctx.offlineZeigen(); return true; }
    return false;
  }

  function nichtVerfuegbar(r) {
    r.appendChild(meldung(T_NICHT_VERFUEGBAR, true));
    var reihe = el("div", "cm-reihe");
    reihe.appendChild(T().verweis("Zum Profil", "#community/profil", "kn-haupt cm-haupt"));
    reihe.appendChild(T().verweis("Zu Lernen", "app.html#lernen"));
    r.appendChild(reihe);
  }

  function ladefehler(box, text, nochmal) {
    box.innerHTML = "";
    var p = meldung(text || T_LADEFEHLER, true);
    box.appendChild(p);
    var reihe = el("div", "cm-reihe");
    reihe.appendChild(T().knopf("Erneut versuchen", "kn-haupt cm-haupt", nochmal));
    reihe.appendChild(T().verweis("Zu Lernen", "app.html#lernen"));
    box.appendChild(reihe);
    return p;
  }

  function zeit(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  // Rückfrage als echter Dialog: Escape/Abbrechen = nein, Fokus zurück.
  function frage(ausloeser, titel, text, ja, beiJa, beiNein) {
    var d = el("dialog", "cm-dialog");
    var id = "cm-frage-" + Date.now();
    d.setAttribute("aria-labelledby", id);
    var innen = el("div", "cm-dialog-innen");
    var h = el("h2", "cm-dialog-frage", titel);
    h.id = id;
    h.tabIndex = -1;
    innen.appendChild(h);
    if (text) innen.appendChild(el("p", null, text));
    var entschieden = false;
    var reihe = el("div", "cm-reihe");
    var jaKnopf = T().knopf(ja, "kn-haupt cm-haupt", function () { entschieden = true; d.close(); });
    reihe.appendChild(jaKnopf);
    reihe.appendChild(T().knopf("Abbrechen", "kn-neben cm-neben cm-dialog-neben", function () { d.close(); }));
    innen.appendChild(reihe);
    d.appendChild(innen);
    d.addEventListener("close", function () {
      d.remove();
      // R04: Beim Kontowechsel/Ansichtswechsel verworfen – keine Folgeaktion.
      if (verworfen()) return;
      if (entschieden) return beiJa();
      if (beiNein) beiNein();
      if (ausloeser && document.contains(ausloeser)) ausloeser.focus();
    });
    var verworfen = AP.communityDialoge.merken(d);
    document.body.appendChild(d);
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
    h.focus();
  }

  function laenge(t) { return AP.community.laenge(String(t || "").trim()); }

  /* ================================================== C13 · Inhalt melden

     o: { ctx, art, ziel, kontext ("Beitrag: …" / "Antwort von …"), ausloeser,
          fertig(text) – Rückmeldung am Ursprung }
     Wiederholen ist immer sicher: Konto und Ziel sind in der Datenbank
     eindeutig, eine zweite Meldung entsteht nie. */
  function meldenDialog(o) {
    var ctx = o.ctx;
    var e = { grund: "", hinweis: "", zustand: null, versand: null, versuche: 0 };
    var d = el("dialog", "cm-dialog cm-melden");
    d.setAttribute("aria-labelledby", "cm-melden-titel");
    var innen = el("div", "cm-dialog-innen");
    var h = el("h2", null, "Inhalt melden");
    h.id = "cm-melden-titel";
    h.tabIndex = -1;
    innen.appendChild(h);
    innen.appendChild(el("p", "cm-melden-kontext", o.kontext || ""));
    innen.appendChild(el("p", null, "Was ist an diesem Inhalt problematisch? Wähle den passenden Grund."));
    var form = el("form", "cm-form");
    form.noValidate = true;

    var gruppe = el("fieldset", "cm-feld cm-arten");
    var leg = el("legend", null, "Grund");
    leg.appendChild(el("span", "cm-pflicht", "Pflicht"));
    gruppe.appendChild(leg);
    var gFehler = el("p", "cm-fehler");
    gFehler.id = "cm-melden-grund-fehler";
    gFehler.hidden = true;
    GRUND_REIHE.forEach(function (g) {
      var lab = el("label", "cm-haken cm-wahl");
      var i = el("input");
      i.type = "radio";
      i.name = "cm-melden-grund";
      i.value = g;
      i.setAttribute("aria-describedby", gFehler.id);
      i.addEventListener("change", function () {
        if (e.zustand) return;
        e.grund = g;
        gFehler.hidden = true;
        gFehler.textContent = "";
      });
      lab.appendChild(i);
      lab.appendChild(el("span", null, GRUND[g]));
      gruppe.appendChild(lab);
    });
    gruppe.appendChild(gFehler);
    form.appendChild(gruppe);

    var hinweis = T().mehrzeilig(ctx, { label: "Hinweis (optional)", wert: "", zeilen: 4,
      hilfe: "Beschreibe kurz, welche Stelle du meinst. Kopiere keine persönlichen Daten in den Hinweis." });
    var ansage = T().vorlesen();
    T().zaehler(hinweis, 500, function (drueber) {
      T().grenzMeldung(hinweis, drueber, "Der Hinweis darf höchstens 500 Zeichen lang sein.", ansage);
    });
    hinweis.eingabe.addEventListener("input", function () {
      if (e.zustand) { hinweis.eingabe.value = e.hinweis; return; }
      e.hinweis = hinweis.eingabe.value;
    });
    form.appendChild(hinweis.box);
    form.appendChild(ansage);
    var platz = el("div", "cm-schreib-status");
    form.appendChild(platz);
    var reihe = el("div", "cm-reihe");
    var senden = el("button", "kn-haupt cm-haupt", "Meldung senden");
    senden.type = "submit";
    var abbr = T().knopf("Abbrechen", "kn-neben cm-neben cm-dialog-neben", abbrechen);
    reihe.appendChild(senden);
    reihe.appendChild(abbr);
    form.appendChild(reihe);
    innen.appendChild(form);
    d.appendChild(innen);

    var ergebnis = null;      // Text, der nach dem Schließen am Ursprung angesagt wird
    function zu(text) {
      ergebnis = text || null;
      if (d.open) d.close();
    }
    d.addEventListener("cancel", function (ev) { ev.preventDefault(); abbrechen(); });
    d.addEventListener("close", function () {
      d.remove();
      if (verworfen()) return;
      if (ergebnis && o.fertig) o.fertig(ergebnis);
      else if (o.ausloeser && document.contains(o.ausloeser)) o.ausloeser.focus();
    });

    function darstellen(text, fehler, mitKlaerung) {
      if (e.zustand === "sendet") ctx.sperren(senden, "Meldung wird gesendet …");
      else { ctx.freigeben(senden); senden.disabled = !!e.zustand; }
      abbr.disabled = e.zustand === "sendet" || e.zustand === "pruefen";
      T().eingabenSperren(form, !!e.zustand);
      platz.innerHTML = "";
      if (!text) return;
      var p = meldung(text, fehler);
      platz.appendChild(p);
      if (mitKlaerung) {
        var k = el("div", "cm-reihe");
        var sp = T().knopf("Status prüfen", "kn-neben cm-neben cm-dialog-neben", statusPruefen);
        var er = T().knopf("Erneut senden", "kn-neben cm-neben cm-dialog-neben", function () { abschicken(); });
        k.appendChild(sp);
        k.appendChild(er);
        platz.appendChild(k);
        if (e.zustand === "pruefen") { ctx.sperren(sp, "Status wird geprüft …"); er.disabled = true; }
      }
      p.focus();
    }

    function pruefe() {
      var ok = true;
      if (!e.grund) {
        gFehler.textContent = "Wähle einen Grund für deine Meldung.";
        gFehler.hidden = false;
        ok = false;
      }
      if (laenge(e.hinweis) > 500) {
        ctx.fehlerSetzen(hinweis, "Der Hinweis darf höchstens 500 Zeichen lang sein.");
        ok = false;
      } else ctx.fehlerSetzen(hinweis, "");
      return ok;
    }

    function abschicken() {
      // R04: Vor JEDEM Versand (auch „Erneut senden“) Konto und Ansicht prüfen.
      if (!ctx.gilt()) return zu();
      if (ctx.offline()) {
        return darstellen("Du bist offline. Für die Community brauchst du Internet. Deine Eingaben bleiben in diesem geöffneten Tab.", true);
      }
      if (!e.versand) e.versand = Object.freeze({ grund: e.grund, hinweis: e.hinweis });
      e.zustand = "sendet";
      e.versuche++;
      darstellen();
      AP.community.meldungSenden({ art: o.art, ziel: o.ziel, grund: e.versand.grund, hinweis: e.versand.hinweis,
                                   konto: ctx.konto })
        .then(function (m) {
          if (!ctx.gilt()) return zu();
          e.zustand = null;
          // Neu, oder dieselbe Meldung nach verlorener Bestätigung wiedergefunden.
          if (m && (m.neu || (m.gleich && e.versuche > 1))) return zu("Danke. Das Team prüft deine Meldung.");
          zu("Du hast diesen Inhalt bereits gemeldet. Das Team prüft deine Meldung.");
        }, fehlgeschlagen);
    }

    function fehlgeschlagen(f) {
      if (!ctx.gilt()) return zu();
      if (f && f.art === "veraltet") return zu();
      if (f && f.art === "unklar") {
        e.zustand = "unklar";
        return darstellen("Wir konnten nicht prüfen, ob deine Meldung gesendet wurde. Prüfe den Status, bevor du erneut sendest.", true, true);
      }
      e.zustand = null;
      e.versand = null;
      if (f && f.art === "anmeldung") { zu(); return ctx.abgelaufen(); }
      if (f && f.art === "gesperrt") { zu(); return ctx.gesperrt(); }
      if (f && f.art === "netz" && ctx.offline())
        return darstellen("Du bist offline. Für die Community brauchst du Internet. Deine Eingaben bleiben in diesem geöffneten Tab.", true);
      if (f && f.art === "bremse") return darstellen("Du hast gerade viele Meldungen gesendet. Versuch es später erneut.", true);
      if (f && f.art === "nichtda") {
        darstellen("Dieser Inhalt ist für dich nicht verfügbar.", true);
        senden.disabled = true;
        return;
      }
      darstellen("Deine Meldung wurde nicht gesendet. Deine Eingaben sind noch da.", true);
    }

    function statusPruefen() {
      if (e.zustand !== "unklar") return;
      if (!ctx.gilt()) return zu();
      e.zustand = "pruefen";
      darstellen("Status wird geprüft …", false, true);
      AP.community.meldungStatus(o.art, o.ziel).then(function (m) {
        if (!ctx.gilt()) return zu();
        if (m) { e.zustand = null; return zu("Danke. Das Team prüft deine Meldung."); }
        e.zustand = "unklar";
        darstellen("Die Meldung wurde noch nicht gefunden. Der Ausgang ist weiterhin unklar.", true, true);
      }, function (f) {
        if (f && f.art === "veraltet") return zu();
        e.zustand = "unklar";
        if (f && f.art === "anmeldung") { zu(); return ctx.abgelaufen(); }
        darstellen("Wir konnten nicht prüfen, ob deine Meldung gesendet wurde. Prüfe den Status, bevor du erneut sendest.", true, true);
      });
    }

    function abbrechen() {
      if (e.zustand === "sendet" || e.zustand === "pruefen") return;
      // Ausgang offen: nichts verwerfen, nur schließen – die Meldung kann angekommen sein.
      if (e.zustand === "unklar" || (!e.grund && !e.hinweis.trim())) return zu();
      T().verwerfenFragen(abbr, function () { zu(); });
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (e.zustand) return;
      if (!pruefe()) {
        (e.grund ? hinweis.eingabe : gruppe.querySelector("input")).focus();
        return;
      }
      e.versand = null;                 // neuer, gültiger Versandstand
      abschicken();
    });

    // R04: Dialog und Entwurf gehören zu Konto und Ansicht. Wechselt eines
    // davon, wird beides geleert und der Dialog ohne Folgeaktion entfernt.
    var verworfen = AP.communityDialoge.merken(d, function () {
      e = { grund: "", hinweis: "", zustand: "weg", versand: null, versuche: 0 };
      form.reset();
      hinweis.eingabe.value = "";
    });
    document.body.appendChild(d);
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
    h.focus();
  }

  /* ================================================== Zähler (D10) */

  // „Moderation · {n} offene Fälle“ als Link; ohne Teamrecht verschwindet die Zeile.
  function zaehlerVerweis(ctx, klasse) {
    var a = el("a", klasse || "kn-neben cm-neben", "Moderation …");
    a.href = "#community/moderation";
    a.setAttribute("aria-busy", "true");
    AP.community.moderationZaehler().then(function (n) {
      if (!ctx.gilt()) return;
      a.removeAttribute("aria-busy");
      a.textContent = n === 1 ? "Moderation · 1 offener Fall" : "Moderation · " + n + " offene Fälle";
    }, function (f) {
      if (!ctx.gilt()) return;
      a.removeAttribute("aria-busy");
      if (f && (f.art === "rechte" || f.art === "gesperrt")) { a.remove(); return; }
      // Keine erfundene 0.
      a.textContent = "Moderation";
      var p = el("p", "cm-hilfe", "Der Moderationsstatus konnte nicht geladen werden.");
      if (a.parentNode) a.parentNode.insertBefore(p, a.nextSibling);
    });
    return a;
  }

  /* ================================================== C14 · Moderation */

  var BEREICHE = [["", "Offene Fälle"], ["ausgeblendet", "Ausgeblendete Inhalte"], ["protokoll", "Protokoll"]];

  function moderation(r, ctx, bereich) {
    var oben = el("div", "cm-oben");
    oben.appendChild(T().verweis("‹ Zurück zum Profil", "#community/profil", "kn-neben cm-zurueck"));
    r.appendChild(oben);
    r.appendChild(ctx.kopf("Moderation", "Nur für das Team."));
    var nav = el("nav", "cm-lokalnav");
    nav.setAttribute("aria-label", "Bereiche der Moderation");
    var ul = el("ul", "liste-schlicht");
    BEREICHE.forEach(function (b) {
      var li = el("li");
      var a = el("a", "cm-lokalnav-ziel", b[1]);
      a.href = "#community/moderation" + (b[0] ? "/" + b[0] : "");
      if (b[0] === bereich) a.setAttribute("aria-current", "page");
      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(ul);
    r.appendChild(nav);
    var status = el("div", "cm-mod-status");
    r.appendChild(status);
    var box = el("div", "cm-mod-bereich");
    r.appendChild(box);
    if (nachEntscheidung && nachEntscheidung.konto === ctx.konto) {
      status.appendChild(meldung(nachEntscheidung.text, false));
    }
    var nachher = nachEntscheidung && nachEntscheidung.konto === ctx.konto ? nachEntscheidung : null;
    nachEntscheidung = null;
    if (bereich === "ausgeblendet") return ausgeblendet(box, ctx, nachher, status);
    if (bereich === "protokoll") return protokoll(box, ctx);
    faelle(box, ctx, nachher, status);
  }

  // Liste mit „Weitere … laden“ (Keyset vom Server).
  function blaetterliste(box, ctx, o) {
    var liste = el("ul", "liste-schlicht cm-beitraege cm-mod-liste");
    var mehr = el("div", "cm-mehr");
    var nach = null, nr = 0;
    function seite(erste) {
      var n = ++nr;
      if (erste) {
        box.innerHTML = "";
        if (o.oben) box.appendChild(o.oben);
        var lade = el("p", "cm-hilfe", o.ladetext);
        lade.setAttribute("role", "status");
        box.appendChild(lade);
      }
      mehr.innerHTML = "";
      o.laden(nach).then(function (zeilen) {
        if (!ctx.gilt() || n !== nr) return;
        zeilen = zeilen || [];
        if (erste) {
          box.innerHTML = "";
          if (o.oben) box.appendChild(o.oben);
          if (!zeilen.length) { box.appendChild(el("p", "cm-leer", o.leer)); if (o.fertig) o.fertig(); return; }
          box.appendChild(liste);
          box.appendChild(mehr);
          liste.innerHTML = "";
        }
        zeilen.forEach(function (z) { liste.appendChild(o.zeile(z)); });
        nach = zeilen.length ? o.merke(zeilen[zeilen.length - 1]) : nach;
        if (zeilen.length >= o.anzahl) {
          mehr.appendChild(T().knopf(o.mehrText, "kn-neben cm-neben", function () { seite(false); }));
        }
        if (erste && o.fertig) o.fertig();
      }, function (f) {
        if (!ctx.gilt() || n !== nr) return;
        if (lesefehler(ctx, f)) return;
        if (f && f.art === "rechte") { box.innerHTML = ""; return nichtVerfuegbar(box); }
        if (erste) {
          var p = ladefehler(box, o.fehlertext, function () { seite(true); });
          if (o.fehler) o.fehler(p);
          return;
        }
        mehr.innerHTML = "";
        mehr.appendChild(meldung("Weitere Einträge konnten nicht geladen werden.", true));
        mehr.appendChild(T().knopf("Erneut versuchen", "kn-neben cm-neben", function () { seite(false); }));
      });
    }
    seite(true);
    return { neu: function () { nach = null; seite(true); } };
  }

  function nachLaden(status, nachher, fehlerP) {
    // Bestätigte Entscheidung bleibt bestätigt, auch wenn die Liste nicht kommt.
    if (!nachher) return;
    status.innerHTML = "";
    status.appendChild(meldung("Die Entscheidung wurde gespeichert. Die Liste konnte noch nicht neu geladen werden.", true));
    if (fehlerP) {
      fehlerP.remove();
      var k = fehlerP.parentNode;
      if (k) Array.prototype.forEach.call(k.querySelectorAll("button"), function (b) { b.textContent = "Liste erneut laden"; });
    }
  }

  function faelle(box, ctx, nachher, status) {
    var filterWert = "alle";
    var oben = el("div", "cm-filter");
    var filter = ctx.feld({ label: "Fälle anzeigen", wert: "alle",
      select: [["alle", "Alle"], ["meldungen", "Meldungen"], ["pruefanfragen", "Prüfanfragen"]] });
    oben.appendChild(filter.box);
    var l;
    filter.eingabe.addEventListener("change", function () { filterWert = filter.eingabe.value; l.neu(); });
    l = blaetterliste(box, ctx, {
      oben: oben, anzahl: 25, ladetext: "Meldungen werden geladen …", leer: "Es gibt keine offenen Fälle.",
      mehrText: "Weitere Fälle laden",
      laden: function (nach) { return AP.community.moderationFaelle(filterWert, nach, 25); },
      merke: function (z) { return { stufe: z.stufe, aeltester: z.aeltester, art: z.art, ziel: z.ziel }; },
      zeile: fallZeile,
      fertig: function () {
        if (nachher) { var p = status.querySelector(".meldung"); if (p) p.focus(); }
      },
      fehler: function (p) { nachLaden(status, nachher, p); }
    });
  }

  function fallZeile(z) {
    var li = el("li", "cm-beitrag");
    var oben = el("p", "cm-zeile-oben");
    if (z.stufe === 1) oben.appendChild(T().marke("Potentiell schädlich"));
    oben.appendChild(el("span", null, z.art === "beitrag" ? "Beitrag" : "Antwort"));
    oben.appendChild(el("span", null, z.versteckt ? "Ausgeblendet" : "Sichtbar"));
    if (z.pruefanfrage) oben.appendChild(T().marke("Prüfanfrage"));
    li.appendChild(oben);
    var titel = el("p", "cm-zeile-titel");
    var a = el("a", null, z.art === "beitrag" ? (z.titel || "Beitrag") : "Antwort zu „" + (z.titel || "Beitrag") + "“");
    a.href = "#community/moderation/fall/" + z.art + "/" + z.ziel;
    titel.appendChild(a);
    li.appendChild(titel);
    if (z.art === "antwort" && z.antwort_auszug) li.appendChild(el("p", "cm-hilfe cm-auszug", z.antwort_auszug));
    var meta = [];
    if (z.meldungen) meta.push(z.meldungen === 1 ? "1 offene Meldung" : z.meldungen + " offene Meldungen");
    meta.push("Ältester offener Vorgang " + T().datum(z.aeltester));
    if (z.autor) meta.push("von " + z.autor);
    li.appendChild(el("p", "cm-zeile-meta", meta.join(" · ")));
    var pr = T().verweis("Prüfen", a.href, "kn-neben cm-neben cm-mod-pruefen");
    pr.setAttribute("aria-label", "Prüfen: " + a.textContent);
    li.appendChild(pr);
    return li;
  }

  function ausgeblendet(box, ctx, nachher, status) {
    blaetterliste(box, ctx, {
      anzahl: 25, ladetext: "Ausgeblendete Inhalte werden geladen …", leer: "Es gibt keine ausgeblendeten Inhalte.",
      mehrText: "Weitere Inhalte laden",
      laden: function (nach) { return AP.community.moderationAusgeblendet(nach, 25); },
      merke: function (z) { return { sortzeit: z.sortzeit, id: z.id }; },
      zeile: function (z) {
        var li = el("li", "cm-beitrag");
        var oben = el("p", "cm-zeile-oben");
        oben.appendChild(el("span", null, z.art === "beitrag" ? "Beitrag" : "Antwort"));
        oben.appendChild(el("span", null, z.quelle === "automatisch" && !z.bestaetigt_am ? "Vorläufig (automatisch)"
          : z.quelle === "altbestand" ? "Ausgeblendet vor dem Protokoll" : "Ausgeblendet"));
        li.appendChild(oben);
        var titel = el("p", "cm-zeile-titel");
        var a = el("a", null, z.art === "beitrag" ? (z.titel || "Beitrag") : "Antwort zu „" + (z.titel || "Beitrag") + "“");
        a.href = "#community/moderation/fall/" + z.art + "/" + z.ziel;
        titel.appendChild(a);
        li.appendChild(titel);
        if (z.antwort_auszug) li.appendChild(el("p", "cm-hilfe cm-auszug", z.antwort_auszug));
        if (z.eltern_ausgeblendet) li.appendChild(el("p", "cm-hilfe", "Der zugehörige Beitrag ist ausgeblendet."));
        li.appendChild(el("p", "cm-zeile-meta", z.erstellt_am
          ? "Ausgeblendet am " + zeit(z.erstellt_am)
          : "Erstellt am " + T().datum(z.inhalt_erstellt_am) + " (Zeitpunkt der Ausblendung nicht bekannt)"));
        return li;
      },
      fehler: function (p) { nachLaden(status, nachher, p); }
    });
  }

  function protokoll(box, ctx) {
    blaetterliste(box, ctx, {
      anzahl: 25, ladetext: "Protokoll wird geladen …", leer: "Es wurden noch keine Entscheidungen protokolliert.",
      mehrText: "Weitere Einträge laden",
      laden: function (nach) { return AP.community.moderationProtokoll(nach, 25); },
      merke: function (z) { return { zeit: z.zeit, id: z.id }; },
      zeile: function (z) {
        var li = el("li", "cm-beitrag");
        var oben = el("p", "cm-zeile-oben");
        oben.appendChild(el("span", null, AKTION[z.aktion] || z.aktion));
        oben.appendChild(el("span", null, z.art === "beitrag" ? "Beitrag" : "Antwort"));
        if (z.korrektur) oben.appendChild(T().marke("Korrektur"));
        li.appendChild(oben);
        li.appendChild(el("p", "cm-zeile-titel", z.titel ? (z.art === "beitrag" ? z.titel : "Antwort zu „" + z.titel + "“")
                                                         : "Inhalt nicht mehr vorhanden oder nicht lesbar"));
        if (z.interne_begruendung) li.appendChild(el("p", "cm-text cm-mod-grund", z.interne_begruendung));
        var wer = z.akteur === "automatik" ? "Automatisch" : (z.akteur_name || "Gelöschtes Konto");
        var meta = [wer, zeit(z.zeit)];
        if (z.meldungen) meta.push(z.meldungen === 1 ? "1 Meldung abgeschlossen" : z.meldungen + " Meldungen abgeschlossen");
        li.appendChild(el("p", "cm-zeile-meta", meta.join(" · ")));
        return li;
      }
    });
  }

  /* ================================================== Inhalt prüfen */

  function fall(r, ctx, art, id) {
    var oben = el("div", "cm-oben");
    oben.appendChild(T().verweis("‹ Zurück zur Moderation", "#community/moderation", "kn-neben cm-zurueck"));
    r.appendChild(oben);
    var kopf = ctx.kopf("Inhalt prüfen");
    r.appendChild(kopf);
    var box = el("div", "cm-detail cm-mod-fall");
    r.appendChild(box);
    var vor = vorwahl && vorwahl.konto === ctx.konto && vorwahl.art === art && vorwahl.id === id ? vorwahl : null;
    vorwahl = null;

    function laden(hinweis) {
      box.innerHTML = "";
      var lade = el("p", "cm-hilfe", "Fall wird geladen …");
      lade.setAttribute("role", "status");
      box.appendChild(lade);
      AP.community.moderationFall(art, id).then(function (f) {
        if (!ctx.gilt()) return;
        if (!f) { box.innerHTML = ""; return box.appendChild(meldung("Dieser Inhalt ist für dich nicht verfügbar.", true)); }
        zeigen(f, hinweis);
      }, function (f) {
        if (!ctx.gilt()) return;
        if (lesefehler(ctx, f)) return;
        box.innerHTML = "";
        if (f && f.art === "rechte") return nichtVerfuegbar(box);
        if (f && f.art === "nichtda") return box.appendChild(meldung("Dieser Inhalt ist für dich nicht verfügbar.", true));
        ladefehler(box, null, function () { laden(); });
      });
    }

    function zeigen(f, hinweis) {
      box.innerHTML = "";
      if (hinweis) box.appendChild(meldung(hinweis.text, hinweis.fehler));
      var b = f.beitrag || {}, a = f.antwort;
      var zo = el("p", "cm-zeile-oben");
      zo.appendChild(el("span", null, art === "beitrag" ? "Beitrag" : "Antwort"));
      zo.appendChild(el("span", null, f.versteckt ? "Ausgeblendet" : "Sichtbar"));
      box.appendChild(zo);
      box.appendChild(el("h2", "cm-abschnitt", art === "beitrag" ? b.titel : "Antwort zu „" + b.titel + "“"));
      var person = (art === "beitrag" ? b.autor : a.autor) || {};
      var meta = [T().personText(person.anzeigename, person.rolle, person.lehrjahr),
                  T().datum(art === "beitrag" ? b.erstellt_am : a.erstellt_am)];
      var bearb = art === "beitrag" ? b.bearbeitet_am : a.bearbeitet_am;
      if (bearb) meta.push("bearbeitet " + T().datum(bearb));
      box.appendChild(el("p", "cm-zeile-meta", meta.join(" · ")));
      if (art === "antwort") {
        box.appendChild(T().verweis("Beitrag im Moderationsbereich prüfen", "#community/moderation/fall/beitrag/" + b.id, "cm-verweis"));
        if (b.versteckt) box.appendChild(el("p", "cm-hilfe", "Der zugehörige Beitrag ist ausgeblendet."));
      }
      box.appendChild(el("p", "cm-hilfe", "Aktueller Inhalt. Er kann vom gemeldeten Stand abweichen."));
      var text = art === "beitrag" ? b.text : a.text;
      if (text) box.appendChild(el("div", "cm-text", text));
      if (art === "beitrag" && b.datei_pfad) box.appendChild(dateiPruefen(ctx, b.datei_pfad, b.datei_art, b.titel, b.id));

      // Meldungen (ohne Meldernamen)
      var ms = f.meldungen || [];
      var sm = el("section", "cm-mod-teil");
      sm.appendChild(el("h3", null, ms.length === 1 ? "1 offene Meldung" : ms.length + " offene Meldungen"));
      if (!ms.length) sm.appendChild(el("p", "cm-hilfe", "Es gibt keine offenen Meldungen."));
      else {
        var ul = el("ul", "liste-schlicht");
        ms.forEach(function (m) {
          var li = el("li", "cm-mod-meldung");
          li.appendChild(el("p", "cm-zeile-oben", GRUND[m.grund] || m.grund));
          if (m.hinweis) li.appendChild(el("p", "cm-text cm-mod-grund", m.hinweis));
          li.appendChild(el("p", "cm-zeile-meta", T().datum(m.erstellt_am)));
          ul.appendChild(li);
        });
        sm.appendChild(ul);
      }
      box.appendChild(sm);

      if (f.ausblendung) {
        var x = f.ausblendung;
        var sa = el("section", "cm-mod-teil");
        sa.appendChild(el("h3", null, "Ausblendung"));
        sa.appendChild(el("p", null, x.quelle === "automatisch" && !x.bestaetigt_am ? T_VORLAEUFIG
          : x.quelle === "altbestand" ? "Ausgeblendet vor Einführung des Protokolls." : "Vom Team ausgeblendet."));
        if (x.begruendung_autor) {
          sa.appendChild(el("p", "cm-hilfe", "Begründung für die betroffene Person:"));
          sa.appendChild(el("p", "cm-text cm-mod-grund", x.begruendung_autor));
        }
        if (x.bestaetigt_am) sa.appendChild(el("p", "cm-zeile-meta", "Entschieden am " + zeit(x.bestaetigt_am)));
        box.appendChild(sa);
      }
      if (f.pruefanfrage) {
        var sq = el("section", "cm-mod-teil");
        sq.appendChild(el("h3", null, "Prüfanfrage"));
        sq.appendChild(el("p", "cm-text cm-mod-grund", f.pruefanfrage.begruendung));
        sq.appendChild(el("p", "cm-zeile-meta", zeit(f.pruefanfrage.erstellt_am)));
        box.appendChild(sq);
      }
      if ((f.verlauf || []).length) {
        var sv = el("section", "cm-mod-teil");
        sv.appendChild(el("h3", null, "Bisherige Entscheidungen"));
        var uv = el("ul", "liste-schlicht");
        f.verlauf.forEach(function (v) {
          uv.appendChild(el("li", "cm-zeile-meta", (AKTION[v.aktion] || v.aktion) + " · " + zeit(v.zeit) +
            (v.interne_begruendung ? " · " + v.interne_begruendung : "")));
        });
        sv.appendChild(uv);
        box.appendChild(sv);
      }

      var formPlatz = el("div", "cm-mod-entscheidung");
      var aktionen = el("section", "cm-mod-teil cm-mod-aktionen");
      aktionen.appendChild(el("h3", null, "Entscheidung"));
      var reihe = el("div", "cm-reihe");
      /* R05: Pro Fall gibt es genau einen Vorgang. Solange er läuft oder sein
         Ausgang offen ist, sind die anderen Aktionen gesperrt – Versandstand
         und Kennung bleiben, bis „Status prüfen“ den Erfolg bestätigt oder
         „Eingaben ändern“ den Vorgang endgültig verworfen hat. Ungesendete
         Eingaben gehen beim Wechsel nicht still verloren. */
      var offen = null, knoepfe = [];
      var sperrHinweis = el("p", "cm-hilfe",
        "Solange die Entscheidung gespeichert wird oder ihr Ergebnis unklar ist, kannst du keine andere Aktion wählen.");
      sperrHinweis.hidden = true;
      function zustand(gebunden) {
        knoepfe.forEach(function (b) { b.disabled = gebunden; });
        sperrHinweis.hidden = !gebunden;
      }
      aktionenFuer(f).forEach(function (x) {
        var k = T().knopf(x[1], x[2] ? "kn-haupt cm-haupt" : "kn-neben cm-neben", function () {
          if (offen && offen.gebunden()) return;
          function oeffnen() {
            offen = formular(formPlatz, ctx, f, x[0], x[3], k, laden, zustand, function () { offen = null; });
          }
          if (offen && offen.hatEingaben()) return T().verwerfenFragen(k, oeffnen);
          oeffnen();
        });
        knoepfe.push(k);
        reihe.appendChild(k);
        if (vor && vor.aktion === x[0] && !vor.offen) { vor.offen = true; setTimeout(function () { k.click(); }, 0); }
      });
      aktionen.appendChild(reihe);
      aktionen.appendChild(sperrHinweis);
      box.appendChild(aktionen);
      box.appendChild(formPlatz);
    }

    laden();
  }

  // [aktion, Knopftext, Hauptaktion?, mitKorrektur?]
  function aktionenFuer(f) {
    var a = f.ausblendung, ms = (f.meldungen || []).length;
    if (f.pruefanfrage) return [["anfrage_aufheben", "Ausblendung aufheben", true],
                                ["anfrage_aufheben", "Ausblendung aufheben und korrigieren", false, true],
                                ["anfrage_bestaetigen", "Ausblendung bestätigen", false]];
    if (!f.versteckt) {
      var l = [["ausblenden", "Inhalt ausblenden", false], ["korrektur", "Fachliche Korrektur ergänzen", false, true]];
      if (ms) l.unshift(["sichtbar_lassen", "Meldungen abschließen", false]);
      return l;
    }
    var v = [];
    if (a && !a.bestaetigt_am) v.push(["weiter_ausblenden", "Weiter ausgeblendet lassen", true]);
    else if (ms) v.push(["weiter_ausblenden", "Weiter ausgeblendet lassen", true]);
    v.push(["einblenden", "Wieder einblenden", false]);
    if (!(f.antwort && f.beitrag && f.beitrag.versteckt)) v.push(["einblenden", "Wieder einblenden und korrigieren", false, true]);
    if (a && a.bestaetigt_am) v.push(["erklaerung_aendern", "Erklärung ändern", false]);
    return v;
  }

  /* Spec 07: Ein Beitrag kann bis zu fünf Anhänge haben. Abgerufen wird erst
     auf „Datei prüfen“ (nicht im Fallüberblick); die Liste kommt mit denselben
     Regeln wie der Beitrag, jede Datei einzeln über den angemeldeten Abruf.
     Moderationsaktionen betreffen immer den ganzen Beitrag mit allen Bildern. */
  function dateiPruefen(ctx, pfad, dateiArt, titel, beitragId) {
    var box = el("section", "cm-datei");
    box.setAttribute("aria-label", dateiArt === "pdf" ? "PDF" : "Anhänge");
    function eine(liste, i, platz) {
      var x = liste[i];
      var teil = el("div", "cm-datei-teil");
      platz.appendChild(teil);
      var st = el("p", "cm-hilfe", liste.length > 1 ? "Datei " + (i + 1) + " von " + liste.length + " wird geladen …" : "Datei wird geladen …");
      st.setAttribute("role", "status");
      teil.appendChild(st);
      return AP.community.dateiLaden(x.pfad).then(function (d) {
        if (!ctx.gilt()) { AP.community.dateiFreigeben(d); return; }
        T().dateiMerken(d);
        teil.innerHTML = "";
        if (x.art === "bild") {
          var img = el("img", "cm-bild");
          img.src = d.url;
          img.alt = x.beschreibung || ((liste.length > 1 ? "Bild " + (i + 1) + " von " + liste.length + " zu " : "Datei zu ") + "„" + (titel || "Inhalt") + "“");
          teil.appendChild(img);
        }
        var a = el("a", "kn-neben cm-neben", x.art === "pdf" ? "PDF öffnen" : (liste.length > 1 ? "Bild " + (i + 1) + " öffnen" : "Bild öffnen"));
        a.href = d.url;
        a.target = "_blank";
        a.rel = "noopener";
        teil.appendChild(a);
      });
    }
    function los() {
      box.innerHTML = "";
      var st = el("p", "cm-hilfe", "Dateien werden geladen …");
      st.setAttribute("role", "status");
      box.appendChild(st);
      var liste = beitragId ? AP.community.anhaenge(beitragId) : Promise.resolve([]);
      liste.then(function (l) {
        if (!ctx.gilt()) return;
        if (!l.length) l = [{ pfad: pfad, art: dateiArt, beschreibung: "" }];
        box.innerHTML = "";
        return l.reduce(function (k, x, i) { return k.then(function () { if (ctx.gilt()) return eine(l, i, box); }); }, Promise.resolve());
      }).then(null, function (f) {
        if (!ctx.gilt()) return;
        if (lesefehler(ctx, f)) return;
        box.innerHTML = "";
        box.appendChild(meldung("Die Datei konnte nicht geladen werden.", true));
        box.appendChild(T().knopf("Erneut versuchen", "kn-neben cm-neben", los));
      });
    }
    box.appendChild(T().knopf("Datei prüfen", "kn-neben cm-neben", los));
    return box;
  }

  /* ---------- Entscheidungsformular (Vorlagen, Vorschau, Begründungen) */

  var vorlagenCache = null;      // { konto, liste }
  function vorlagen(ctx) {
    if (vorlagenCache && vorlagenCache.konto === ctx.konto) return Promise.resolve(vorlagenCache.liste);
    return AP.community.moderationVorlagen().then(function (l) {
      vorlagenCache = { konto: ctx.konto, liste: l || [] };
      return vorlagenCache.liste;
    });
  }

  function gebundenZustand(z) { return z === "sendet" || z === "unklar" || z === "pruefen" || z === "klaeren"; }

  /* Gibt { gebunden(), hatEingaben() } zurück. beiZustand(gebunden) meldet
     jeden Zustandswechsel an die Fallansicht (R05), beiZu() das Schließen. */
  function formular(platz, ctx, f, aktion, mitKorrektur, ausloeser, neuLaden, beiZustand, beiZu) {
    beiZustand = beiZustand || function () {};
    beiZu = beiZu || function () {};
    platz.innerHTML = "";
    var braucheAutor = aktion === "ausblenden" || aktion === "erklaerung_aendern" ||
      aktion === "anfrage_aufheben" || aktion === "anfrage_bestaetigen" ||
      (aktion === "weiter_ausblenden" && f.ausblendung && !f.ausblendung.bestaetigt_am);
    var braucheKategorie = aktion === "ausblenden" || (aktion === "weiter_ausblenden" && f.ausblendung && !f.ausblendung.bestaetigt_am);
    var gruppe = aktion.indexOf("anfrage_") === 0 ? "pruefergebnis" : "ausblendung";
    var korrekturPflicht = aktion === "korrektur";
    var mitKorr = korrekturPflicht || !!mitKorrektur;
    var e = { id: null, zustand: null, versand: null, kategorie: "", autor: "", intern: "", korrektur: "", bearbeitet: false };
    if (aktion === "erklaerung_aendern" && f.ausblendung) e.autor = f.ausblendung.begruendung_autor || "";
    var startAutor = e.autor;

    var form = el("form", "cm-form cm-mod-form");
    form.noValidate = true;
    var titel = { ausblenden: "Inhalt ausblenden", weiter_ausblenden: "Weiter ausgeblendet lassen",
      einblenden: mitKorr ? "Wieder einblenden und korrigieren" : "Wieder einblenden",
      sichtbar_lassen: "Meldungen abschließen", korrektur: "Fachliche Korrektur ergänzen",
      anfrage_aufheben: mitKorr ? "Ausblendung aufheben und korrigieren" : "Ausblendung aufheben",
      anfrage_bestaetigen: "Ausblendung bestätigen", erklaerung_aendern: "Erklärung ändern" }[aktion];
    var h = el("h3", null, titel);
    h.tabIndex = -1;
    form.appendChild(h);
    var ms = (f.meldungen || []).length;
    if (ms && aktion !== "erklaerung_aendern")
      form.appendChild(el("p", "cm-hilfe", ms === 1 ? "Die geprüfte Meldung wird dabei abgeschlossen."
                                                   : "Die " + ms + " geprüften Meldungen werden dabei abgeschlossen."));
    var ansage = T().vorlesen();

    var vorlage = null, autor = null, vorschau = null;
    if (braucheAutor) {
      vorlage = ctx.feld({ label: "Vorlage", pflicht: braucheKategorie, wert: "", select: [["", "Vorlage wählen …"]] });
      form.appendChild(vorlage.box);
      vorlagen(ctx).then(function (l) {
        if (!ctx.gilt()) return;
        l.filter(function (v) { return v.gruppe === gruppe; }).forEach(function (v) {
          var o = el("option", null, v.titel);
          o.value = v.id;
          o.dataset.kategorie = v.kategorie;
          o.dataset.text = v.text;
          vorlage.eingabe.appendChild(o);
        });
      }, function () {});
      autor = T().mehrzeilig(ctx, { label: "Begründung", pflicht: true, wert: e.autor, zeilen: 4,
        hilfe: "Kurz und sachlich. Keine Namen von Meldenden und keine persönlichen Daten." });
      T().zaehler(autor, 500, function (d) { T().grenzMeldung(autor, d, "Die Begründung darf höchstens 500 Zeichen lang sein.", ansage); });
      form.appendChild(autor.box);
      var vs = el("section", "cm-vorschau");
      vs.appendChild(el("p", "cm-zeile-oben", "Das sieht die betroffene Person"));
      vorschau = el("p", "cm-text", e.autor || "–");
      vs.appendChild(vorschau);
      form.appendChild(vs);
      autor.eingabe.addEventListener("input", function () {
        if (e.zustand) { autor.eingabe.value = e.autor; return; }
        e.autor = autor.eingabe.value;
        e.bearbeitet = true;
        vorschau.textContent = e.autor.trim() || "–";
      });
      var vorher = "";
      vorlage.eingabe.addEventListener("change", function () {
        if (e.zustand) { vorlage.eingabe.value = vorher; return; }
        var o = vorlage.eingabe.selectedOptions[0];
        var neuText = o && o.dataset.text !== undefined ? o.dataset.text : "";
        function setzen() {
          vorher = vorlage.eingabe.value = o ? o.value : "";
          e.kategorie = o && o.dataset.kategorie && gruppe === "ausblendung" ? o.dataset.kategorie : "";
          if (!o || !o.value) return;
          e.autor = neuText;
          e.bearbeitet = false;
          autor.eingabe.value = neuText;
          autor.eingabe.dispatchEvent(new Event("input"));
          e.bearbeitet = false;
          if (o.dataset.kategorie === "sonstiges") ansage.textContent = "Beschreibe kurz, weshalb dieser Inhalt ausgeblendet wird.";
        }
        if (e.bearbeitet && e.autor.trim() && neuText !== e.autor) {
          // Abbrechen stellt die bisherige Vorlage samt Kategorie wieder her.
          frage(vorlage.eingabe, "Deine Begründung ersetzen?", "Die Vorlage überschreibt den Text, den du geändert hast.",
                "Ersetzen", setzen, function () { vorlage.eingabe.value = vorher; });
          return;
        }
        setzen();
      });
    }

    var intern = T().mehrzeilig(ctx, { label: braucheAutor ? "Interne Begründung (optional)" : "Interne Begründung",
      pflicht: !braucheAutor, wert: "", zeilen: 3,
      hilfe: braucheAutor ? "Bleibt leer, wird die Begründung oben ins Protokoll übernommen. Nur für das Team sichtbar."
                          : "Nur für das Team sichtbar." });
    T().zaehler(intern, 500, function (d) { T().grenzMeldung(intern, d, "Die Begründung darf höchstens 500 Zeichen lang sein.", ansage); });
    intern.eingabe.addEventListener("input", function () {
      if (e.zustand) { intern.eingabe.value = e.intern; return; }
      e.intern = intern.eingabe.value;
    });
    form.appendChild(intern.box);

    var korr = null;
    if (mitKorr) {
      korr = T().mehrzeilig(ctx, { label: "Fachliche Korrektur", pflicht: true, wert: "", zeilen: 5,
        hilfe: "Erscheint als Antwort mit der Kennzeichnung „Team · Fachliche Korrektur“. Der Originaltext bleibt unverändert." +
               (f.antwort ? " Nenne die betroffene Stelle der Antwort." : "") });
      T().zaehler(korr, 2000, function (d) { T().grenzMeldung(korr, d, "Die Korrektur braucht 1 bis 2000 Zeichen.", ansage); });
      korr.eingabe.addEventListener("input", function () {
        if (e.zustand) { korr.eingabe.value = e.korrektur; return; }
        e.korrektur = korr.eingabe.value;
      });
      form.appendChild(korr.box);
    }
    form.appendChild(ansage);
    var status = el("div", "cm-schreib-status");
    form.appendChild(status);
    var reihe = el("div", "cm-reihe");
    var senden = el("button", "kn-haupt cm-haupt", titel);
    senden.type = "submit";
    var abbr = T().knopf("Abbrechen", "kn-neben cm-neben", function () {
      if (gebundenZustand(e.zustand)) return;      // erst klären
      function zu() {
        platz.innerHTML = "";
        beiZustand(false);
        beiZu();
        if (ausloeser && document.contains(ausloeser)) ausloeser.focus();
      }
      if (hatEingaben()) return T().verwerfenFragen(abbr, zu);
      zu();
    });
    function hatEingaben() {
      return !!((e.autor !== startAutor && e.autor.trim()) || e.intern.trim() || e.korrektur.trim());
    }
    reihe.appendChild(senden);
    reihe.appendChild(abbr);
    form.appendChild(reihe);
    platz.appendChild(form);
    h.focus();

    function darstellen(text, fehler, klaeren) {
      beiZustand(gebundenZustand(e.zustand));
      if (e.zustand === "sendet") ctx.sperren(senden, "Entscheidung wird gespeichert …");
      else { ctx.freigeben(senden); senden.disabled = !!e.zustand; }
      abbr.disabled = !!e.zustand;
      T().eingabenSperren(form, !!e.zustand);
      status.innerHTML = "";
      if (!text) return;
      var p = meldung(text, fehler);
      status.appendChild(p);
      if (klaeren) {
        var k = el("div", "cm-reihe");
        var sp = T().knopf("Status prüfen", "kn-neben cm-neben", statusPruefen);
        var er = T().knopf("Erneut senden", "kn-neben cm-neben", function () { if (e.zustand === "unklar") abschicken(); });
        var ae = T().knopf("Eingaben ändern", "kn-neben cm-neben", eingabenAendern);
        [sp, er, ae].forEach(function (x) { k.appendChild(x); if (e.zustand !== "unklar") x.disabled = true; });
        status.appendChild(el("p", "cm-hilfe", "Mit ‚Erneut senden‘ wiederholen wir denselben Vorgang. Eine zweite Entscheidung wird dabei nicht angelegt. " +
          "Mit ‚Eingaben ändern‘ prüfen wir den offenen Versuch. Wurde noch nichts gespeichert, wird er endgültig verworfen."));
        status.appendChild(k);
      }
      p.focus();
    }

    function pruefe() {
      var falsch = [];
      if (braucheKategorie && !e.kategorie) { ctx.fehlerSetzen(vorlage, "Wähle eine Vorlage für die Begründung."); falsch.push(vorlage); }
      else if (vorlage) ctx.fehlerSetzen(vorlage, "");
      if (autor) {
        var n = laenge(e.autor);
        var t = !n ? "Gib eine kurze Begründung ein." : n > 500 ? "Die Begründung darf höchstens 500 Zeichen lang sein."
          : /…/.test(e.autor) ? "Ersetze „…“ durch die konkrete Stelle." : "";
        ctx.fehlerSetzen(autor, t);
        if (t) falsch.push(autor);
      }
      var ni = laenge(e.intern);
      var ti = !braucheAutor && !ni ? "Gib eine kurze Begründung ein." : ni > 500 ? "Die Begründung darf höchstens 500 Zeichen lang sein." : "";
      ctx.fehlerSetzen(intern, ti);
      if (ti) falsch.push(intern);
      if (korr) {
        var nk = laenge(e.korrektur);
        var tk = !nk || nk > 2000 ? "Die Korrektur braucht 1 bis 2000 Zeichen." : "";
        ctx.fehlerSetzen(korr, tk);
        if (tk) falsch.push(korr);
      }
      if (falsch.length) falsch[0].eingabe.focus();
      return !falsch.length;
    }

    function erfolg(z) {
      // R04: Ein spätes Ergebnis darf keine neue Ansicht oder ein anderes Konto erreichen.
      if (!ctx.gilt()) return;
      e.zustand = null;
      nachEntscheidung = { konto: ctx.konto, text: ERFOLG[aktion] || "Die Entscheidung wurde gespeichert." };
      location.hash = "#community/moderation";
    }

    function fehlgeschlagen(x) {
      if (x && x.art === "veraltet") return;
      if (!ctx.gilt()) return;
      if (x && x.art === "unklar") {
        e.zustand = "unklar";
        return darstellen("Wir konnten nicht prüfen, ob die Entscheidung gespeichert wurde. Prüfe den Status, bevor du erneut entscheidest.", true, true);
      }
      e.zustand = null;
      if (x && x.art === "anmeldung") return ctx.abgelaufen();
      if (x && x.art === "gesperrt") return ctx.gesperrt();
      if (x && x.art === "rechte") { platz.innerHTML = ""; return nichtVerfuegbar(platz); }
      if (x && (x.art === "geaendert" || x.art === "nichtda")) {
        e.id = null; e.versand = null;
        e.zustand = "geaendert";
        darstellen(x.art === "nichtda" ? "Dieser Inhalt ist für dich nicht verfügbar." : T_GEAENDERT, true);
        var k = T().knopf("Fall neu laden", "kn-haupt cm-haupt", function () { neuLaden(); });
        status.appendChild(k);
        k.focus();
        return;
      }
      if (x && x.art === "vorgang") { e.id = null; e.versand = null; }
      darstellen("Die Entscheidung wurde nicht gespeichert. Deine Eingaben sind noch da." +
                 (x && x.art === "eingabe" && x.message ? " " + x.message : ""), true);
    }

    function abschicken() {
      if (!ctx.gilt()) return;
      if (ctx.offline()) return ctx.offlineZeigen();
      e.zustand = "sendet";
      darstellen();
      AP.community.entscheiden(Object.assign({ konto: ctx.konto }, e.versand)).then(erfolg, fehlgeschlagen);
    }

    function statusPruefen() {
      if (e.zustand !== "unklar" || !ctx.gilt()) return;
      e.zustand = "pruefen";
      darstellen("Status wird geprüft …", false, true);
      AP.community.entscheidungStatus(e.id).then(function (z) {
        if (!ctx.gilt()) return;
        if (z) return erfolg(z);
        e.zustand = "unklar";
        darstellen("Die Entscheidung wurde noch nicht gefunden. Der Ausgang ist weiterhin unklar.", true, true);
      }, function (x) {
        if (x && x.art === "veraltet") return;
        e.zustand = "unklar";
        if (x && x.art === "anmeldung") return ctx.abgelaufen();
        darstellen("Wir konnten nicht prüfen, ob die Entscheidung gespeichert wurde. Prüfe den Status, bevor du erneut entscheidest.", true, true);
      });
    }

    function eingabenAendern() {
      if (e.zustand !== "unklar" || !ctx.gilt()) return;
      if (ctx.offline()) return ctx.offlineZeigen();
      e.zustand = "klaeren";
      darstellen("Wird geklärt …", false, true);
      AP.community.vorgangKlaeren(e.id, "entscheidung", null, ctx.konto).then(function (z) {
        if (!ctx.gilt()) return;
        if (z === "angelegt") return erfolg();
        e.zustand = null; e.id = null; e.versand = null;
        darstellen("Die Entscheidung wurde nicht gespeichert. Du kannst deine Eingaben jetzt ändern.", true);
      }, function (x) {
        if (x && x.art === "veraltet") return;
        e.zustand = "unklar";
        if (x && x.art === "anmeldung") return ctx.abgelaufen();
        darstellen("Wir konnten nicht prüfen, ob die Entscheidung gespeichert wurde. Prüfe den Status, bevor du erneut entscheidest.", true, true);
      });
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (e.zustand) return;
      if (!pruefe()) return;
      function los() {
        if (!ctx.gilt() || e.zustand) return;
        if (!e.id) e.id = AP.community.neueVorgangskennung();
        e.versand = Object.freeze({
          id: e.id, art: f.art, ziel: f.ziel, aktion: aktion,
          meldungen: (f.meldungen || []).map(function (m) { return m.id; }),
          pruefanfrage: f.pruefanfrage ? f.pruefanfrage.id : null,
          ausblendung: f.ausblendung ? f.ausblendung.id : null,
          version: f.version, intern: e.intern.trim(), autorText: braucheAutor ? e.autor.trim() : null,
          kategorie: braucheKategorie ? e.kategorie : null, korrektur: mitKorr ? e.korrektur.trim() : null
        });
        abschicken();
      }
      if (aktion === "ausblenden" || aktion === "einblenden" || aktion === "anfrage_aufheben") {
        var t = aktion === "ausblenden" ? "Diesen Inhalt ausblenden?" : "Diesen Inhalt wieder einblenden?";
        var j = aktion === "ausblenden" ? "Inhalt ausblenden" : aktion === "einblenden" ? "Wieder einblenden" : "Ausblendung aufheben";
        return frage(senden, t, null, j, los);
      }
      los();
    });
    return { gebunden: function () { return gebundenZustand(e.zustand); }, hatEingaben: hatEingaben };
  }

  /* ================================================== Meine Meldungen (D12) */

  function meineMeldungen(r, ctx) {
    r.appendChild(T().verweis("‹ Zurück zum Profil", "#community/profil", "kn-neben cm-zurueck"));
    r.appendChild(ctx.kopf("Meine Meldungen", "Hier siehst du, ob deine Meldungen noch offen oder abgeschlossen sind."));
    var box = el("div");
    r.appendChild(box);
    blaetterliste(box, ctx, {
      anzahl: 30, ladetext: "Meldungen werden geladen …", leer: "Du hast noch keine Inhalte gemeldet.",
      mehrText: "Weitere Meldungen laden", fehlertext: "Deine Meldungen konnten nicht geladen werden. Versuch es erneut.",
      laden: function (nach) { return AP.community.meineMeldungen(nach, 30); },
      merke: function (z) { return { zeit: z.erstellt_am, id: z.id }; },
      zeile: function (m) {
        var li = el("li", "cm-beitrag");
        var oben = el("p", "cm-zeile-oben");
        oben.appendChild(T().marke(m.status === "offen" ? "Offen" : "Abgeschlossen"));
        oben.appendChild(el("span", null, GRUND[m.grund] || m.grund));
        li.appendChild(oben);
        var t = !m.titel ? "Gemeldeter Inhalt" : m.art === "beitrag" ? m.titel : "Antwort zu „" + m.titel + "“";
        var p = el("p", "cm-zeile-titel");
        if (m.titel && m.art === "beitrag" && m.ziel_id) {
          var a = el("a", null, t);
          a.href = "#community/beitrag/" + m.ziel_id;
          p.appendChild(a);
        } else p.textContent = t;
        li.appendChild(p);
        li.appendChild(el("p", "cm-zeile-meta", "Gemeldet am " + T().datum(m.erstellt_am)));
        return li;
      }
    });
  }

  /* ================================================== Eigene ausgeblendete Inhalte */

  function eigeneListe(r, ctx) {
    r.appendChild(T().verweis("‹ Zurück zum Profil", "#community/profil", "kn-neben cm-zurueck"));
    r.appendChild(ctx.kopf("Eigene ausgeblendete Inhalte"));
    var box = el("div");
    r.appendChild(box);
    blaetterliste(box, ctx, {
      anzahl: 1000, ladetext: "Inhalte werden geladen …", leer: "Es gibt keine ausgeblendeten eigenen Inhalte.",
      mehrText: "", fehlertext: "Deine Inhalte konnten nicht geladen werden. Versuch es erneut.",
      laden: function (nach) { return nach ? Promise.resolve([]) : AP.community.eigeneAusblendungen(); },
      merke: function () { return {}; },
      zeile: function (z) {
        var li = el("li", "cm-beitrag");
        var x = z.ausblendung || {};
        var oben = el("p", "cm-zeile-oben");
        oben.appendChild(el("span", null, z.art === "beitrag" ? "Beitrag" : "Antwort"));
        oben.appendChild(T().marke(z.zustand === "eltern_ausgeblendet" ? "Beitrag ausgeblendet"
          : z.zustand === "aufgehoben" ? "Wieder sichtbar" : x.vorlaeufig ? "Vorläufig ausgeblendet" : "Ausgeblendet"));
        if (x.pruefanfrage) oben.appendChild(el("span", null, x.pruefanfrage.status === "offen" ? "Prüfanfrage offen" : "Prüfanfrage abgeschlossen"));
        li.appendChild(oben);
        var p = el("p", "cm-zeile-titel");
        var a = el("a", null, z.titel || (z.antwort_auszug ? "Deine Antwort: " + z.antwort_auszug : "Dein Inhalt"));
        a.href = "#community/eigener-inhalt/" + z.art + "/" + z.id;
        p.appendChild(a);
        li.appendChild(p);
        if (z.zustand === "eltern_ausgeblendet") li.appendChild(el("p", "cm-hilfe", "Der Beitrag, zu dem deine Antwort gehört, ist ausgeblendet."));
        return li;
      }
    });
  }

  /* Eigener Inhalt mit Begründung und Prüfanfrage. Auch eingebettet im
     Beitragsdetail (eigener ausgeblendeter Beitrag). */
  function eigenerInhalt(r, ctx, art, id, eingebettet) {
    if (!eingebettet) {
      r.appendChild(T().verweis("‹ Eigene ausgeblendete Inhalte", "#community/eigene-ausblendungen", "kn-neben cm-zurueck"));
      r.appendChild(ctx.kopf(art === "beitrag" ? "Dein Beitrag" : "Deine Antwort"));
    }
    var box = el("div", "cm-detail cm-eigen");
    r.appendChild(box);
    var entwurf = { text: "", id: null, zustand: null, versand: null, offen: false };

    function laden(hinweis) {
      box.innerHTML = "";
      var st = el("p", "cm-hilfe", "Wird geladen …");
      st.setAttribute("role", "status");
      box.appendChild(st);
      AP.community.eigenerInhalt(art, id).then(function (x) {
        if (!ctx.gilt()) return;
        if (!x) { box.innerHTML = ""; return box.appendChild(meldung("Dieser Inhalt ist für dich nicht verfügbar.", true)); }
        zeigen(x, hinweis);
      }, function (f) {
        if (!ctx.gilt()) return;
        if (lesefehler(ctx, f)) return;
        box.innerHTML = "";
        if (f && (f.art === "nichtda" || f.art === "rechte")) return box.appendChild(meldung("Dieser Inhalt ist für dich nicht verfügbar.", true));
        ladefehler(box, "Dein Inhalt konnte nicht geladen werden. Versuch es erneut.", function () { laden(); });
      });
    }

    function anfrageText(q) {
      if (!q) return null;
      if (q.status === "offen") return "Prüfanfrage offen";
      return "Prüfanfrage abgeschlossen. " + (q.ergebnis === "aufgehoben" ? "Die Ausblendung wurde aufgehoben."
        : "Die Ausblendung wurde nach erneuter Prüfung bestätigt.");
    }

    function zeigen(x, hinweis) {
      box.innerHTML = "";
      if (hinweis) box.appendChild(meldung(hinweis.text, hinweis.fehler));
      var a = x.ausblendung;
      var s = el("section", "cm-mod-teil cm-eigen-status");
      if (a) {
        s.appendChild(el("p", "cm-zeile-oben", a.vorlaeufig ? "Vorläufig ausgeblendet" : "Ausgeblendet"));
        if (a.vorlaeufig) s.appendChild(el("p", null, T_VORLAEUFIG));
        else {
          s.appendChild(el("p", null, "Dieser Inhalt ist für andere nicht sichtbar."));
          if (a.begruendung) {
            s.appendChild(el("p", "cm-hilfe", "Begründung"));
            s.appendChild(el("p", "cm-text cm-mod-grund", a.begruendung));
          }
          if (a.zeit) s.appendChild(el("p", "cm-zeile-meta", "Entschieden am " + zeit(a.zeit)));
        }
        var q = a.pruefanfrage;
        if (q) {
          s.appendChild(el("p", null, anfrageText(q)));
          if (q.ergebnis_begruendung) s.appendChild(el("p", "cm-text cm-mod-grund", q.ergebnis_begruendung));
        }
      } else if (x.eltern_ausgeblendet) {
        s.appendChild(el("p", null, "Der Beitrag, zu dem deine Antwort gehört, ist ausgeblendet."));
      } else {
        s.appendChild(el("p", null, "Dieser Inhalt ist sichtbar."));
      }
      if (x.fruehere && x.fruehere.pruefanfrage) {
        s.appendChild(el("p", null, anfrageText(x.fruehere.pruefanfrage)));
        if (x.fruehere.pruefanfrage.ergebnis_begruendung)
          s.appendChild(el("p", "cm-text cm-mod-grund", x.fruehere.pruefanfrage.ergebnis_begruendung));
      }
      box.appendChild(s);
      if (!eingebettet) {
        if (x.titel) box.appendChild(el("h2", "cm-abschnitt", x.titel));
        var meta = [T().datum(x.erstellt_am)];
        if (x.bearbeitet_am) meta.push("bearbeitet " + T().datum(x.bearbeitet_am));
        box.appendChild(el("p", "cm-zeile-meta", meta.join(" · ")));
        if (x.text) box.appendChild(el("div", "cm-text", x.text));
        if (x.datei_pfad) box.appendChild(dateiPruefen(ctx, x.datei_pfad, x.datei_art, x.titel, art === "beitrag" ? id : null));
        if (art === "antwort" && x.eltern_id) box.appendChild(T().verweis("Zum Beitrag", "#community/beitrag/" + x.eltern_id, "cm-verweis"));
      }
      if (a && a.anfrage_moeglich) anfrageBereich(a);
    }

    function anfrageBereich(a) {
      var platz = el("div", "cm-mod-entscheidung");
      box.appendChild(platz);
      if (!entwurf.offen) {
        var k = T().knopf("Erneute Prüfung anfragen", "kn-haupt cm-haupt", function () { entwurf.offen = true; anfrageForm(platz, a, true); });
        platz.appendChild(k);
        return;
      }
      anfrageForm(platz, a, false);
    }

    function anfrageForm(platz, a, fokus) {
      platz.innerHTML = "";
      var form = el("form", "cm-form");
      form.noValidate = true;
      var h = el("h3", null, "Warum soll die Ausblendung erneut geprüft werden?");
      h.tabIndex = -1;
      form.appendChild(h);
      var feld = T().mehrzeilig(ctx, { label: "Begründung", pflicht: true, wert: entwurf.text, zeilen: 4 });
      var ansage = T().vorlesen();
      T().zaehler(feld, 500, function (d) { T().grenzMeldung(feld, d, "Die Begründung darf höchstens 500 Zeichen lang sein.", ansage); });
      feld.eingabe.addEventListener("input", function () {
        if (entwurf.zustand) { feld.eingabe.value = entwurf.text; return; }
        entwurf.text = feld.eingabe.value;
      });
      form.appendChild(feld.box);
      form.appendChild(ansage);
      var status = el("div", "cm-schreib-status");
      form.appendChild(status);
      var reihe = el("div", "cm-reihe");
      var senden = el("button", "kn-haupt cm-haupt", "Prüfanfrage senden");
      senden.type = "submit";
      var abbr = T().knopf("Abbrechen", "kn-neben cm-neben", function () {
        if (entwurf.zustand) return;
        function zu() { entwurf.offen = false; entwurf.text = ""; laden(); }
        if (!entwurf.text.trim()) return zu();
        T().verwerfenFragen(abbr, zu);
      });
      reihe.appendChild(senden);
      reihe.appendChild(abbr);
      form.appendChild(reihe);
      platz.appendChild(form);
      if (fokus) h.focus();

      function darstellen(text, fehler, klaeren) {
        if (entwurf.zustand === "sendet") ctx.sperren(senden, "Prüfanfrage wird gesendet …");
        else { ctx.freigeben(senden); senden.disabled = !!entwurf.zustand; }
        abbr.disabled = !!entwurf.zustand;
        T().eingabenSperren(form, !!entwurf.zustand);
        status.innerHTML = "";
        if (!text) return;
        var p = meldung(text, fehler);
        status.appendChild(p);
        if (klaeren) {
          var k = el("div", "cm-reihe");
          var sp = T().knopf("Status prüfen", "kn-neben cm-neben", statusPruefen);
          var er = T().knopf("Erneut senden", "kn-neben cm-neben", function () { if (entwurf.zustand === "unklar") abschicken(); });
          var ae = T().knopf("Eingaben ändern", "kn-neben cm-neben", eingabenAendern);
          [sp, er, ae].forEach(function (x) { k.appendChild(x); if (entwurf.zustand !== "unklar") x.disabled = true; });
          status.appendChild(el("p", "cm-hilfe", "Mit ‚Erneut senden‘ wiederholen wir dieselbe Anfrage. Eine zweite Prüfanfrage wird dabei nicht angelegt. " +
            "Mit ‚Eingaben ändern‘ prüfen wir den offenen Versuch. Wurde noch nichts gesendet, wird er endgültig verworfen."));
          status.appendChild(k);
        }
        p.focus();
      }
      var UNKLAR = "Wir konnten nicht prüfen, ob deine Prüfanfrage gesendet wurde. Prüfe den Status, bevor du erneut sendest.";

      function gesendet() {
        entwurf.zustand = null; entwurf.offen = false; entwurf.text = ""; entwurf.id = null; entwurf.versand = null;
        if (!ctx.gilt()) return;
        laden({ text: "Deine Prüfanfrage wurde gesendet." });
      }
      function fehlgeschlagen(f) {
        if (f && f.art === "veraltet") return;
        if (!ctx.gilt()) return;
        if (f && f.art === "unklar") { entwurf.zustand = "unklar"; return darstellen(UNKLAR, true, true); }
        entwurf.zustand = null;
        if (f && f.art === "anmeldung") return ctx.abgelaufen();
        if (f && f.art === "gesperrt") return ctx.gesperrt();
        if (f && f.art === "doppelt") return laden({ text: "Du hast für diese Ausblendung bereits eine Prüfung angefragt.", fehler: true });
        if (f && f.art === "geaendert") return laden({ text: "Die Ausblendung hat sich geändert. Lade die Seite neu.", fehler: true });
        if (f && f.art === "vorgang") { entwurf.id = null; }
        entwurf.versand = null;
        darstellen("Deine Prüfanfrage wurde nicht gesendet. Deine Eingaben sind noch da.", true);
      }
      function abschicken() {
        if (!ctx.gilt()) return;
        if (ctx.offline()) return ctx.offlineZeigen();
        entwurf.zustand = "sendet";
        darstellen();
        AP.community.pruefanfrageSenden(entwurf.versand.id, a.id, entwurf.versand.text, ctx.konto).then(gesendet, fehlgeschlagen);
      }
      function statusPruefen() {
        if (entwurf.zustand !== "unklar" || !ctx.gilt()) return;
        entwurf.zustand = "pruefen";
        darstellen("Status wird geprüft …", false, true);
        AP.community.pruefanfrageStatus(a.id).then(function (q) {
          if (!ctx.gilt()) return;
          if (q && q.id === entwurf.id) return gesendet();
          entwurf.zustand = "unklar";
          darstellen("Die Prüfanfrage wurde noch nicht gefunden. Der Ausgang ist weiterhin unklar.", true, true);
        }, function (f) {
          if (f && f.art === "veraltet") return;
          entwurf.zustand = "unklar";
          if (f && f.art === "anmeldung") return ctx.abgelaufen();
          darstellen(UNKLAR, true, true);
        });
      }
      function eingabenAendern() {
        if (entwurf.zustand !== "unklar" || !ctx.gilt()) return;
        if (ctx.offline()) return ctx.offlineZeigen();
        entwurf.zustand = "klaeren";
        darstellen("Wird geklärt …", false, true);
        AP.community.vorgangKlaeren(entwurf.id, "pruefanfrage", null, ctx.konto).then(function (z) {
          if (!ctx.gilt()) return;
          if (z === "angelegt") return gesendet();
          entwurf.zustand = null; entwurf.id = null; entwurf.versand = null;
          darstellen("Deine Prüfanfrage wurde nicht gesendet. Du kannst deine Eingaben jetzt ändern.", true);
        }, function (f) {
          if (f && f.art === "veraltet") return;
          entwurf.zustand = "unklar";
          if (f && f.art === "anmeldung") return ctx.abgelaufen();
          darstellen(UNKLAR, true, true);
        });
      }
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        if (entwurf.zustand) return;
        var n = laenge(entwurf.text);
        var t = !n ? "Gib eine kurze Begründung ein." : n > 500 ? "Die Begründung darf höchstens 500 Zeichen lang sein." : "";
        ctx.fehlerSetzen(feld, t);
        if (t) { feld.eingabe.focus(); return; }
        if (!entwurf.id) entwurf.id = AP.community.neueVorgangskennung();
        entwurf.versand = Object.freeze({ id: entwurf.id, text: entwurf.text.trim() });
        abschicken();
      });
      darstellen();
    }

    laden();
  }

  /* ================================================== Nach außen */

  AP.communityModeration = {
    meldenDialog: meldenDialog, zaehlerVerweis: zaehlerVerweis,
    moderation: moderation, fall: fall, meineMeldungen: meineMeldungen,
    eigeneListe: eigeneListe, eigenerInhalt: eigenerInhalt,
    // D13: vom Beitrag direkt zur Entscheidung „Inhalt ausblenden“.
    vorwahl: function (konto, art, id, aktion) { vorwahl = { konto: konto, art: art, id: id, aktion: aktion }; },
    vergessen: function () { nachEntscheidung = null; vorwahl = null; vorlagenCache = null; }
  };
})();
