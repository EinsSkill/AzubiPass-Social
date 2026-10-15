/* AzubiPass · Community – Beiträge lesen
   ---------------------------------------------------------------------------
   C04 Übersicht und C05 Lesedetail nach doku/community/04-beitraege.md
   (Version 1) und den Entscheidungen vom 12.10.2026:

     – nur allgemeine Beiträge (gruppe_id = null), Gruppen kommen später
     – Filter Beitragsart und Lernfeld, neueste zuerst
     – „Weitere Beiträge laden" mit stabiler Zeit-/ID-Navigation
     – Dateien nur über den angemeldeten Abruf (aktuelle Rechteprüfung)
     – Hilfreich ist hier eine reine Anzeige. Melden, Teamkorrekturen und
       eigene ausgeblendete Inhalte kommen seit 15.10.2026 mit Spec 06
       (community-moderation.js); hier stehen nur die Einstiege.

   Dazu seit 13.10.2026 nach doku/community/05-schreiben-antworten.md (v1):
     C06 Beitrag schreiben (#community/schreiben), Antworten im Detail und
     „beste Antwort" für die Person, die gefragt hat. Gesendet wird mit
     Vorgangskennung – ein zweiter Versuch legt nichts doppelt an.

   Der Zugang (Sitzung, Profil) ist vorher geprüft – das macht
   community-ansicht.js. Jede Antwort vom Server wird nur angezeigt, wenn
   Ansicht, Konto und Ziel noch dieselben sind (ctx.gilt).
   Nutzertext kommt immer als Text in die Seite, nie als HTML.               */

(function () {
  "use strict";

  var AP = window.AP;
  var el = AP.el;

  var ARTNAME = { lernzettel: "Lernzettel", frage: "Frage", tipp: "Tipp" };
  var ROLLE = { mentor: "Mentor:in", team: "Team" };

  /* Was die Übersicht sich merkt, solange die Seite offen ist – immer nur für
     ein Konto. Beim Zurückkommen werden die Zeilen neu geladen (nie aus diesem
     Speicher gezeigt), nur Filter, Anzahl und Position bleiben. */
  var stand = leererStand(null);
  var dateien = [];          // geladene Dateien (blob:-Adressen) zum Freigeben
  var entwurf = null;        // C06-Entwurf, nur im Arbeitsspeicher, an ein Konto gebunden
  var antwortEntwurf = null; // { konto, beitrag, text, vorgang }
  var gerade = null;         // { id, text } – Bestätigung nach dem Veröffentlichen

  function leererStand(konto) {
    return { konto: konto, art: "", lernfeld: "", geladen: 0, scroll: 0, zuletzt: null, zurueck: false };
  }

  function vergessen() {
    stand = leererStand(null);
    entwurf = null;
    antwortEntwurf = null;
    gerade = null;
    dateienFreigeben();
  }

  function dateienFreigeben() {
    dateien.forEach(function (d) { AP.community.dateiFreigeben(d); });
    dateien = [];
  }

  /* ================================================== Hilfen */

  function knopf(text, klasse, beiKlick) {
    var b = el("button", klasse || "kn-neben cm-neben", text);
    b.type = "button";
    if (beiKlick) b.addEventListener("click", beiKlick);
    return b;
  }

  function verweis(text, ziel, klasse) {
    var a = el("a", klasse || "kn-neben cm-neben", text);
    a.href = ziel;
    return a;
  }

  function datum(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  function anzahlAntworten(n) { return n === 1 ? "1 Antwort" : n + " Antworten"; }

  function lernfelder(ctx) {
    var lf = (ctx.inhalt() && ctx.inhalt().lernfelder) || [];
    return lf.slice().sort(function (a, b) { return (a.nummer || 99) - (b.nummer || 99); });
  }

  function lernfeldVon(ctx, id) {
    return lernfelder(ctx).filter(function (x) { return x.id === id; })[0] || null;
  }

  // Zuordnung nur aus dem tatsächlich geladenen Katalog – veraltete Kennungen
  // werden weggelassen, nicht als toter Verweis gezeigt.
  function zuordnung(ctx, b) {
    var lf = b.lernfeld ? lernfeldVon(ctx, b.lernfeld) : null;
    if (!lf) return null;
    var k = b.kapitel ? (lf.kapitel || []).filter(function (x) { return x.id === b.kapitel; })[0] : null;
    return { lf: lf, k: k || null };
  }

  function zuordnungText(z) {
    if (!z) return "";
    return z.k ? z.lf.kurz + ", Kapitel " + z.k.nummer + " " + z.k.titel : z.lf.kurz;
  }

  function personText(name, rolle, lehrjahr) {
    var teile = [name || ""];
    if (ROLLE[rolle]) teile.push(ROLLE[rolle]);
    if (lehrjahr) teile.push(lehrjahr + ". Lehrjahr");
    return teile.join(" · ");
  }

  function marke(text) { return el("span", "cm-marke", text); }

  /* ================================================== C04 · Übersicht */

  function liste(r, ctx) {
    if (stand.konto !== ctx.konto) stand = leererStand(ctx.konto);
    dateienFreigeben();

    var kopf = ctx.kopf("Beiträge", "Fragen, Lernzettel und Tipps aus der Community.");
    var oben = el("div", "cm-oben");
    oben.appendChild(ctx.zurueckKnopf());
    oben.appendChild(verweis("Profil", "#community/profil", "kn-neben cm-neben cm-kopfaktion"));
    r.appendChild(oben);
    r.appendChild(kopf);
    r.appendChild(ctx.hinweiszeile());
    var schreibReihe = el("div", "cm-reihe cm-schreiben-reihe");
    var schreibLink = verweis("Beitrag schreiben", "#community/schreiben", "kn-haupt cm-haupt");
    schreibLink.addEventListener("click", function () {
      stand.scroll = window.scrollY;
      stand.zurueck = true;
      ctx.merkeHerkunft();
    });
    schreibReihe.appendChild(schreibLink);
    // D10: offene Fälle nur als Hinweis für das Team; das Recht prüft der Server.
    if (ctx.rolle() === "team") schreibReihe.appendChild(AP.communityModeration.zaehlerVerweis(ctx));
    r.appendChild(schreibReihe);

    // Filter: dauerhaft beschriftet, kein Absenden nötig.
    var filter = el("div", "cm-filter");
    var art = ctx.feld({ label: "Beitragsart", wert: stand.art,
      select: [["", "Alle Arten"], ["lernzettel", "Lernzettel"], ["frage", "Frage"], ["tipp", "Tipp"]] });
    var lfWahl = [["", "Alle Lernfelder"]].concat(lernfelder(ctx).map(function (lf) {
      return [lf.id, lf.kurz + " · " + lf.titel];
    }));
    var lf = ctx.feld({ label: "Lernfeld", wert: stand.lernfeld, select: lfWahl });
    filter.appendChild(art.box);
    filter.appendChild(lf.box);
    var zuruecksetzen = knopf("Filter zurücksetzen", "cm-verweis", function () {
      art.eingabe.value = "";
      lf.eingabe.value = "";
      filterGeaendert(art.eingabe);
    });
    filter.appendChild(zuruecksetzen);
    r.appendChild(filter);

    // Kurze Rückmeldung nach Filterwechsel und Nachladen, nicht der ganze Feed.
    var meldung = el("p", "cm-hilfe cm-ergebnis");
    meldung.setAttribute("role", "status");
    r.appendChild(meldung);

    var bereich = el("div", "cm-liste");
    r.appendChild(bereich);
    var mehrBox = el("div", "cm-mehr");
    r.appendChild(mehrBox);

    var nr = 0;              // jede neue Abfrage der Liste zieht eine Nummer
    var weiter = null;
    var zeilen = 0;

    function aktiv() { return !!(stand.art || stand.lernfeld); }
    function abfrage() {
      return { gruppe: "alle", ohneAusgeblendete: true,
               art: stand.art || undefined, lernfeld: stand.lernfeld || undefined };
    }
    function zuruecksetzenZeigen() { zuruecksetzen.hidden = !aktiv(); }
    zuruecksetzenZeigen();

    function filterGeaendert(fokus) {
      stand.art = art.eingabe.value;
      stand.lernfeld = lf.eingabe.value;
      stand.geladen = 0;
      stand.zuletzt = null;
      zuruecksetzenZeigen();
      laden(false, fokus);
    }
    art.eingabe.addEventListener("change", function () { filterGeaendert(art.eingabe); });
    lf.eingabe.addEventListener("change", function () { filterGeaendert(lf.eingabe); });

    // Erste Seite (oder beim Zurückkommen: so viele Zeilen wie vorher).
    /* Erste Seite – beim Zurückkommen so viele Seiten, bis wieder so viele
       Zeilen da sind wie vorher (Gegenprüfung G02: früher höchstens 120).
       Jede Seite kommt frisch vom Server über die stabile Zeit-/ID-Navigation;
       Entzogenes taucht deshalb nicht wieder auf. */
    function laden(meldenNachher, fokus) {
      var n = ++nr;
      var CFG = AP.community.CFG;
      var ziel = Math.max(CFG.seite, stand.geladen || 0);
      bereich.innerHTML = "";
      mehrBox.innerHTML = "";
      bereich.setAttribute("aria-busy", "true");
      bereich.appendChild(el("p", "cm-hilfe", "Beiträge werden geladen …"));
      var gesammelt = [];
      function seiteHolen(nach) {
        var q = abfrage();
        q.anzahl = Math.min(Math.max(ziel - gesammelt.length, CFG.seite), 120);
        if (nach) q.nach = nach;
        return AP.community.beitragSeite(q).then(function (seite) {
          if (!ctx.gilt() || n !== nr) return null;
          gesammelt = gesammelt.concat(seite.zeilen);
          if (seite.weiter && gesammelt.length < ziel) return seiteHolen(seite.weiter);
          return { zeilen: gesammelt, weiter: seite.weiter };
        });
      }
      seiteHolen(null).then(function (seite) {
        if (!seite || !ctx.gilt() || n !== nr) return;
        bereich.removeAttribute("aria-busy");
        bereich.innerHTML = "";
        zeilen = 0;
        weiter = seite.weiter;
        if (!seite.zeilen.length) {
          leer();
          return;
        }
        var ul = el("ul", "liste-schlicht cm-beitraege");
        bereich.appendChild(ul);
        anhaengen(ul, seite.zeilen);
        mehrZeigen();
        meldung.classList.remove("cm-nur-vorlesen");
        if (fokus) meldung.textContent = zeilen === 1 ? "1 Beitrag" : zeilen + " Beiträge";
        if (stand.zurueck) {
          stand.zurueck = false;
          var ziel2 = stand.zuletzt && bereich.querySelector('a[data-id="' + stand.zuletzt + '"]');
          if (ziel2) ziel2.focus({ preventScroll: true });
          window.scrollTo(0, stand.scroll || 0);
        }
      }, function (f) {
        if (!ctx.gilt() || n !== nr) return;
        bereich.removeAttribute("aria-busy");
        if (f && f.art === "veraltet") return;
        if (f && f.art === "anmeldung") return ctx.abgelaufen();
        if (f && f.art === "gesperrt") return ctx.gesperrt();
        if (f && f.art === "netz" && ctx.offline()) return ctx.offlineZeigen();
        bereich.innerHTML = "";
        var box = el("div", "cm-fehlerbox");
        var p = el("p", "meldung fehler", "Die Beiträge konnten nicht geladen werden. Versuch es erneut.");
        p.setAttribute("role", "alert");
        box.appendChild(p);
        var reihe = el("div", "cm-reihe");
        reihe.appendChild(knopf("Erneut versuchen", "kn-haupt cm-haupt", function () { laden(false, null); }));
        reihe.appendChild(verweis("Zu Lernen", "app.html#lernen"));
        box.appendChild(reihe);
        bereich.appendChild(box);
      });
    }

    function leer() {
      if (aktiv()) {
        bereich.appendChild(el("p", "cm-leer", "Zu diesen Filtern gibt es keine Beiträge."));
        // Einmal sichtbar, für Bildschirmleser über die Statuszeile angesagt.
        meldung.textContent = "Zu diesen Filtern gibt es keine Beiträge.";
        meldung.classList.add("cm-nur-vorlesen");
        var reihe = el("div", "cm-reihe");
        reihe.appendChild(knopf("Filter zurücksetzen", "kn-neben cm-neben", function () {
          art.eingabe.value = ""; lf.eingabe.value = ""; filterGeaendert(art.eingabe);
        }));
        bereich.appendChild(reihe);
      } else {
        meldung.textContent = "";
        bereich.appendChild(el("p", "cm-leer", "Hier gibt es noch keine Beiträge."));
        bereich.appendChild(el("p", "cm-hilfe", "Stell eine Frage oder teile einen Lernzettel oder Tipp."));
      }
    }

    function anhaengen(ul, liste) {
      liste.forEach(function (b) {
        if (b.versteckt || b.gruppe_id) return;      // gehört nicht in die allgemeine Übersicht
        ul.appendChild(zeile(b));
        zeilen++;
      });
      stand.geladen = zeilen;
    }

    function zeile(b) {
      var li = el("li", "cm-beitrag");
      var oben = el("p", "cm-zeile-oben");
      var zo = zuordnung(ctx, b);
      oben.appendChild(el("span", null, ARTNAME[b.art] || ""));
      if (zo) oben.appendChild(el("span", null, zuordnungText(zo)));
      if (b.art === "frage" && b.geloest) oben.appendChild(marke("Gelöst"));
      if (b.an_mentoren) oben.appendChild(marke("An Mentor:innen"));
      li.appendChild(oben);
      var h = el("h2", "cm-zeile-titel");
      var a = el("a", null, b.titel);
      a.href = "#community/beitrag/" + b.id;
      a.dataset.id = b.id;
      a.addEventListener("click", function () {
        stand.scroll = window.scrollY;
        stand.zuletzt = b.id;
        stand.zurueck = true;
        ctx.merkeHerkunft();
      });
      h.appendChild(a);
      li.appendChild(h);
      li.appendChild(el("p", "cm-zeile-meta",
        [personText(b.autor_name, b.autor_rolle, null), datum(b.erstellt_am)].join(" · ")));
      var zahl = Number(b.antworten) || 0, hilf = Number(b.hilfreich_zahl) || 0;
      li.appendChild(el("p", "cm-zeile-meta", anzahlAntworten(zahl) + " · " + hilf + " hilfreich"));
      return li;
    }

    function mehrZeigen() {
      mehrBox.innerHTML = "";
      if (!weiter) return;
      var b = knopf("Weitere Beiträge laden", "kn-neben cm-neben", function () {
        if (b.disabled) return;
        var n = nr;               // gehört zu dieser Liste; ein Filterwechsel macht sie ungültig
        var q = abfrage();
        q.nach = weiter;
        b.disabled = true;
        b.setAttribute("aria-busy", "true");
        var alt = mehrBox.querySelector(".meldung");
        if (alt) alt.remove();
        AP.community.beitragSeite(q).then(function (seite) {
          if (!ctx.gilt() || n !== nr) return;
          var ul = bereich.querySelector("ul");
          var vorher = zeilen;
          // Doppelte ausschließen, falls sich die Liste dazwischen verändert hat.
          var da = {};
          Array.prototype.forEach.call(bereich.querySelectorAll("a[data-id]"), function (x) { da[x.dataset.id] = 1; });
          anhaengen(ul, seite.zeilen.filter(function (z) { return !da[z.id]; }));
          weiter = seite.weiter;
          mehrZeigen();
          var neu = zeilen - vorher;
          meldung.textContent = neu === 1 ? "1 weiterer Beitrag geladen." : neu + " weitere Beiträge geladen.";
          // Fokus bleibt beim Auslöser; ist er weg (keine weiteren), auf den ersten neuen Beitrag.
          var knopfNeu = mehrBox.querySelector("button");
          if (knopfNeu) knopfNeu.focus({ preventScroll: true });
          else {
            var erste = ul.querySelectorAll("a[data-id]")[vorher];
            if (erste) erste.focus({ preventScroll: true });
          }
        }, function (f) {
          if (!ctx.gilt() || n !== nr) return;
          b.disabled = false;
          b.removeAttribute("aria-busy");
          if (f && f.art === "veraltet") return;
          if (f && f.art === "anmeldung") return ctx.abgelaufen();
          if (f && f.art === "netz" && ctx.offline()) return ctx.offlineZeigen();
          var p = el("p", "meldung fehler", "Weitere Beiträge konnten nicht geladen werden.");
          p.setAttribute("role", "alert");
          mehrBox.insertBefore(p, b);
        });
      });
      mehrBox.appendChild(b);
    }

    laden(false, null);
  }

  /* ================================================== C05 · Detail */

  function detail(r, id, ctx) {
    dateienFreigeben();
    var oben = el("div", "cm-oben");
    oben.appendChild(knopf("‹ Zurück zu Beiträgen", "kn-neben cm-zurueck", function () {
      if (ctx.vonListe()) history.back();
      else location.hash = "#community";
    }));
    r.appendChild(oben);
    var kopf = ctx.kopf("Beitrag wird geladen …");
    kopf.querySelector("h1").setAttribute("aria-live", "polite");
    r.appendChild(kopf);
    var inhalt = el("div", "cm-detail");
    r.appendChild(inhalt);

    var bestaetigt = gerade && gerade.id === id && gerade.konto === ctx.konto ? gerade : null;
    gerade = null;

    function laden() {
      AP.community.beitrag(id).then(function (b) {
        if (!ctx.gilt()) return;
        // Nicht vorhanden, nicht erlaubt oder (noch) in einer Gruppe: neutral.
        if (!b || b.gruppe_id) return ctx.nichtDa();
        zeigen(b);
        if (bestaetigt) {
          var ok = el("p", "meldung", bestaetigt.text);
          ok.setAttribute("role", "status");
          inhalt.insertBefore(ok, inhalt.firstChild);
          bestaetigt = null;
        }
      }, function (f) {
        if (!ctx.gilt()) return;
        if (f && f.art === "veraltet") return;
        if (f && f.art === "anmeldung") return ctx.abgelaufen();
        if (f && f.art === "gesperrt") return ctx.gesperrt();
        if (f && f.art === "netz" && ctx.offline()) return ctx.offlineZeigen();
        var h = r.querySelector("h1");
        h.textContent = "Beitrag";
        h.removeAttribute("aria-live");
        inhalt.innerHTML = "";
        // Gerade veröffentlicht, aber nicht anzeigbar: Erfolg nicht zurücknehmen.
        var p = el("p", "meldung fehler", bestaetigt
          ? "Dein Beitrag wurde veröffentlicht. Er konnte noch nicht angezeigt werden."
          : "Der Beitrag konnte nicht geladen werden. Versuch es erneut.");
        p.setAttribute("role", "alert");
        inhalt.appendChild(p);
        var reihe = el("div", "cm-reihe");
        reihe.appendChild(knopf(bestaetigt ? "Beitrag erneut laden" : "Erneut versuchen", "kn-haupt cm-haupt", function () {
          h.textContent = "Beitrag wird geladen …";
          inhalt.innerHTML = "";
          laden();
        }));
        reihe.appendChild(verweis("Zu Lernen", "app.html#lernen"));
        inhalt.appendChild(reihe);
      });
    }

    // Kopfzeile über dem Titel: Art, Zuordnung, Status – als Text, nicht nur Farbe.
    function kopfZeile(b) {
      var h = r.querySelector("h1");
      var alt = kopf.querySelector(".cm-zeile-oben");
      if (alt) alt.remove();
      var zo = zuordnung(ctx, b);
      var zeileOben = el("p", "cm-zeile-oben");
      zeileOben.appendChild(el("span", null, ARTNAME[b.art] || ""));
      zeileOben.appendChild(el("span", null, "Für alle in der Community"));
      if (zo) zeileOben.appendChild(el("span", null, zuordnungText(zo)));
      if (b.art === "frage" && b.geloest) zeileOben.appendChild(marke("Gelöst"));
      if (b.an_mentoren) zeileOben.appendChild(marke("An Mentor:innen"));
      if (b.versteckt) zeileOben.appendChild(marke("Ausgeblendet"));
      kopf.insertBefore(zeileOben, h);
      return zeileOben;
    }

    /* C13/D13: „… melden“ für fremde Inhalte, „Inhalt ausblenden“ für das
       Team. Die Rückmeldung erscheint direkt unter den Knöpfen. */
    function meldeReihe(art, id, autorId, kontextText, text, label) {
      var box = el("div", "cm-melde-box");
      var reihe = el("div", "cm-reihe cm-melde-reihe");
      var platz = el("div");
      if (autorId !== ctx.konto) {
        var k = knopf(text, "cm-verweis cm-melden-knopf", function () {
          platz.innerHTML = "";
          AP.communityModeration.meldenDialog({ ctx: ctx, art: art, ziel: id, kontext: kontextText, ausloeser: k,
            fertig: function (t) {
              if (!ctx.gilt()) return;
              var p = el("p", "meldung", t);
              p.setAttribute("role", "status");
              p.tabIndex = -1;
              platz.innerHTML = "";
              platz.appendChild(p);
              p.focus();
            } });
        });
        k.setAttribute("aria-label", label);
        reihe.appendChild(k);
      }
      if (ctx.rolle() === "team") {
        var a = knopf("Inhalt ausblenden", "cm-verweis", function () {
          AP.communityModeration.vorwahl(ctx.konto, art, id, "ausblenden");
          location.hash = "#community/moderation/fall/" + art + "/" + id;
        });
        a.setAttribute("aria-label", label.replace(/ melden$/, " ausblenden"));
        reihe.appendChild(a);
      }
      if (!reihe.childNodes.length) return box;
      box.appendChild(reihe);
      box.appendChild(platz);
      return box;
    }

    function zeigen(b) {
      var h = r.querySelector("h1");
      h.removeAttribute("aria-live");
      var zo = zuordnung(ctx, b);
      var aug = kopf.querySelector(".schirm-augenbraue");
      kopfZeile(b);
      if (aug) aug.textContent = "Ich · Community · Beiträge";
      h.textContent = b.titel;
      inhalt.innerHTML = "";

      if (b.versteckt) {
        // Nur Autor:in oder Team bekommen ausgeblendete Beiträge überhaupt zu sehen.
        inhalt.appendChild(el("p", "meldung", "Dieser Beitrag ist ausgeblendet."));
        var reihe = el("div", "cm-reihe");
        if (b.autor_id === ctx.konto) {
          // Eigener Beitrag: Status, Begründung und Prüfanfrage direkt hier (Spec 06 §7).
          AP.communityModeration.eigenerInhalt(inhalt, ctx, "beitrag", b.id, true);
          reihe.appendChild(verweis("Inhalt und Begründung ansehen", "#community/eigener-inhalt/beitrag/" + b.id, "kn-neben cm-neben"));
        } else if (ctx.rolle() === "team") {
          reihe.appendChild(verweis("In der Moderation prüfen", "#community/moderation/fall/beitrag/" + b.id, "kn-neben cm-neben"));
        }
        reihe.appendChild(verweis("Zur Community", "#community"));
        reihe.appendChild(verweis("Zu Lernen", "app.html#lernen"));
        inhalt.appendChild(reihe);
        return;
      }

      var meta = [personText(b.autor_name, b.autor_rolle, b.autor_lehrjahr), datum(b.erstellt_am)];
      if (b.bearbeitet_am && datum(b.bearbeitet_am) !== datum(b.erstellt_am))
        meta.push("bearbeitet " + datum(b.bearbeitet_am));
      inhalt.appendChild(el("p", "cm-zeile-meta cm-detail-meta", meta.join(" · ")));
      // Hilfreich nur als Zahl – Markieren kommt mit der eigenen Spec.
      inhalt.appendChild(el("p", "cm-zeile-meta cm-detail-hilfreich", (Number(b.hilfreich_zahl) || 0) + " hilfreich"));

      if (b.text) inhalt.appendChild(el("div", "cm-text", b.text));   // textContent, Zeilenumbrüche per CSS

      if (b.datei_pfad) inhalt.appendChild(dateiBereich(b));

      inhalt.appendChild(meldeReihe("beitrag", b.id, b.autor_id, "Beitrag: " + b.titel,
        "Beitrag melden", "Beitrag „" + b.titel + "“ melden"));

      if (zo) {
        var lern = el("div", "cm-reihe");
        lern.appendChild(zo.k
          ? verweis("Kapitel in Lernen öffnen", zo.lf.seite + "#" + zo.k.id)
          : verweis("Lernfeld in Lernen öffnen", zo.lf.seite));
        inhalt.appendChild(lern);
      }

      inhalt.appendChild(antwortBereich(b));
    }

    function dateiBereich(b) {
      var box = el("section", "cm-datei");
      box.setAttribute("aria-label", b.datei_art === "pdf" ? "PDF" : "Bild");
      function laden() {
        box.innerHTML = "";
        var st = el("p", "cm-hilfe", "Datei wird geladen …");
        st.setAttribute("role", "status");
        box.appendChild(st);
        AP.community.dateiLaden(b.datei_pfad).then(function (d) {
          if (!ctx.gilt()) { AP.community.dateiFreigeben(d); return; }
          dateien.push(d);
          box.innerHTML = "";
          if (b.datei_art === "bild") {
            var img = el("img", "cm-bild");
            img.src = d.url;
            img.alt = "Bild zum Beitrag „" + b.titel + "“";
            box.appendChild(img);
          }
          // Die Aktion gibt es erst, wenn der berechtigte Abruf gelungen ist.
          var a = el("a", "kn-neben cm-neben", b.datei_art === "pdf" ? "PDF öffnen" : "Bild öffnen");
          a.href = d.url;
          a.target = "_blank";
          a.rel = "noopener";
          box.appendChild(a);
        }, function (f) {
          if (!ctx.gilt()) return;
          if (f && f.art === "veraltet") return;
          if (f && f.art === "anmeldung") return ctx.abgelaufen();
          box.innerHTML = "";
          var p = el("p", "meldung fehler", "Die Datei konnte nicht geladen werden.");
          p.setAttribute("role", "alert");
          box.appendChild(p);
          // Wiederholen heißt: Rechte neu prüfen lassen, nicht alte Adresse nehmen.
          box.appendChild(knopf("Erneut versuchen", "kn-neben cm-neben", laden));
        });
      }
      laden();
      return box;
    }

    /* Antworten lesen, schreiben (Spec 05) und – nur für die Person, die
       gefragt hat – die beste Antwort setzen oder zurücknehmen. Die Liste
       kommt immer frisch vom Server; ein Erfolg wird erst nach der
       Serverbestätigung gezeigt. */
    function antwortBereich(b) {
      var box = el("section", "cm-antworten");
      var h = el("h2", "cm-abschnitt", "Antworten");
      box.appendChild(h);
      var zahl = el("p", "cm-zeile-meta");
      box.appendChild(zahl);
      var liste = el("div");
      box.appendChild(liste);
      var meldungBox = el("div", "cm-antwort-meldung");
      box.appendChild(meldungBox);
      var formBox = el("div", "cm-antwort-form");
      box.appendChild(formBox);
      var darfLoesen = b.art === "frage" && !!ctx.konto && b.autor_id === ctx.konto;
      var markiert = false;          // eine Lösungsänderung läuft
      // G07: Nach einer Lösungsänderung ist der Stand ungeklärt, bis Kopf und
      // Antworten GEMEINSAM neu geladen sind. Kein anderer Ladeweg (etwa nach
      // dem Senden einer Antwort) hebt das auf.
      var standOffen = false;
      var STAND_FEHLER = "Der aktuelle Stand konnte nicht geladen werden.";

      function melden(text, fehler, knopfText, beiKlick) {
        meldungBox.innerHTML = "";
        if (!text) return null;
        var p = el("p", fehler ? "meldung fehler" : "meldung", text);
        p.setAttribute("role", fehler ? "alert" : "status");
        p.tabIndex = -1;
        meldungBox.appendChild(p);
        if (knopfText) meldungBox.appendChild(knopf(knopfText, "kn-neben cm-neben", beiKlick));
        return p;
      }

      /* nach: { neu: Antwort-ID } nach eigenem Senden, { loesung: Antwort-ID }
         nach Lösungsänderung – dann bekommt der Knopf derselben Antwort den Fokus. */
      /* Zeichnet einen geladenen Antwortstand. mitKnoepfen = false: Der Stand
         ist nicht gemeinsam mit dem Kopf bestätigt – keine Lösungsaktionen (G07). */
      function zeichnen(alle, nach, mitKnoepfen) {
        // Ausgeblendete Antworten gehören nicht in die normale Ansicht. Eigene
        // (und fürs Team alle) erscheinen nur als Platzhalter mit Weg zum Status.
        var sichtbar = (alle || []).filter(function (a) { return !a.versteckt; });
        var team = ctx.rolle() === "team";
        var gezeigt = (alle || []).filter(function (a) { return !a.versteckt || a.autor_id === ctx.konto || team; });
        var nachId = {};
        sichtbar.forEach(function (a) { nachId[a.id] = a; });
        liste.innerHTML = "";
        zahl.textContent = anzahlAntworten(sichtbar.length);
        if (nach.neu && !standOffen) melden("Deine Antwort wurde gesendet.", false);
        if (!gezeigt.length) { liste.appendChild(el("p", "cm-leer", "Noch keine Antworten.")); return; }
        var ol = el("ol", "liste-schlicht cm-antwortliste");
        gezeigt.forEach(function (a) {
          var li = el("li", "cm-antwort");
          li.dataset.id = a.id;
          if (a.versteckt) {
            li.classList.add("cm-antwort-aus");
            var eigen = a.autor_id === ctx.konto;
            li.appendChild(el("p", "cm-hilfe", eigen ? "Deine Antwort ist ausgeblendet." : "Ausgeblendete Antwort"));
            li.appendChild(verweis(eigen ? "Inhalt und Begründung ansehen" : "In der Moderation prüfen",
              eigen ? "#community/eigener-inhalt/antwort/" + a.id : "#community/moderation/fall/antwort/" + a.id, "cm-verweis"));
            ol.appendChild(li);
            return;
          }
          var p = a.autor || {};
          var name = a.team_korrektur ? "Team" : (p.anzeigename || "");
          if (a.beste || a.team_korrektur) {
            var zo = li.appendChild(el("p", "cm-zeile-oben", ""));
            if (a.team_korrektur) zo.appendChild(marke("Team · Fachliche Korrektur"));
            if (a.beste) zo.appendChild(marke("Beste Antwort"));
          }
          // Bezug nur nennen, wenn die gemeinte Antwort hier sichtbar ist.
          var bezug = a.bezug_antwort_id && nachId[a.bezug_antwort_id];
          if (bezug) {
            var bp = bezug.autor || {};
            li.appendChild(el("p", "cm-hilfe", "Bezieht sich auf die Antwort von " +
              (bezug.team_korrektur ? "Team" : bp.anzeigename || "") + "."));
          }
          li.appendChild(el("div", "cm-text", a.text));
          // Teamkorrekturen nennen öffentlich nur „Team“, keine Person.
          li.appendChild(el("p", "cm-zeile-meta", a.team_korrektur ? ["Team", datum(a.erstellt_am)].join(" · ")
            : [personText(p.anzeigename, p.rolle, p.lehrjahr), datum(a.erstellt_am)].join(" · ")));
          if (mitKnoepfen && !standOffen && darfLoesen && !b.versteckt) li.appendChild(loesenKnopf(a));
          li.appendChild(meldeReihe("antwort", a.id, a.autor_id, "Antwort von " + name,
            "Antwort melden", "Antwort von " + name + " melden"));
          ol.appendChild(li);
        });
        liste.appendChild(ol);
        var ziel = nach.neu ? ol.querySelector('li[data-id="' + nach.neu + '"]')
          : nach.loesung ? ol.querySelector('li[data-id="' + nach.loesung + '"] .cm-loesen') : null;
        if (ziel) {
          if (nach.neu) ziel.tabIndex = -1;
          ziel.focus({ preventScroll: false });
        }
      }

      // Nur der jüngste Ladevorgang darf zeichnen.
      var ladeNr = 0;

      function laden(nach) {
        nach = nach || {};
        var nr = ++ladeNr;
        zahl.textContent = "";
        liste.innerHTML = "";
        var st = el("p", "cm-hilfe", "Antworten werden geladen …");
        st.setAttribute("role", "status");
        liste.appendChild(st);
        AP.community.antworten(b.id).then(function (alle) {
          if (!ctx.gilt() || nr !== ladeNr) return;
          zeichnen(alle, nach, true);
          if (standOffen) standFehler(nach.neu ? "Deine Antwort wurde gesendet. " + STAND_FEHLER : STAND_FEHLER, false);
        }, function (f) {
          if (!ctx.gilt() || nr !== ladeNr) return;
          if (f && f.art === "veraltet") return;
          if (f && f.art === "anmeldung") return ctx.abgelaufen();
          if (f && f.art === "gesperrt") return ctx.gesperrt();
          liste.innerHTML = "";
          if (pruefHinweis && meldungBox.contains(pruefHinweis)) { meldungBox.innerHTML = ""; pruefHinweis = null; }
          // R01: Ist der Lösungsstand ungeklärt, gibt es nur den gemeinsamen Weg –
          // „Erneut laden“ holt Kopf und Antworten zusammen.
          if (standOffen) {
            return standFehler(nach.neu ? "Deine Antwort wurde gesendet. " + STAND_FEHLER : STAND_FEHLER, false);
          }
          // Bestätigt gesendet, nur das Nachladen klappt nicht: Erfolg bleibt stehen.
          var p = el("p", "meldung fehler", nach.neu
            ? "Deine Antwort wurde gesendet. Die Antworten konnten noch nicht neu geladen werden."
            : "Die Antworten konnten nicht geladen werden.");
          p.setAttribute("role", "alert");
          liste.appendChild(p);
          liste.appendChild(knopf("Erneut versuchen", "kn-neben cm-neben", function () { laden(); }));
          if (nach.neu) meldungBox.innerHTML = "";
        });
      }

      /* G05/G07: Nach Bestätigung oder unklarem Ausgang Kopf und Antworten als
         EIN Stand frisch holen. Lösungsaktionen gibt es erst wieder, wenn beide
         Abrufe gelungen sind. Scheitert einer, bleibt der Fehler mit „Erneut
         laden“ sichtbar; ein gelungener Teil wird ohne Lösungsaktionen gezeigt. */
      var pruefHinweis = null;
      function ergebnis(p) {
        return p.then(function (d) { return { ok: true, d: d }; }, function (f) { return { ok: false, f: f }; });
      }
      // Fehler zum ungeklärten Stand mit dem einzigen Wiederholungsweg.
      function standFehler(text, fokus) {
        var p = melden(text, true, "Erneut laden", function () { meldungBox.innerHTML = ""; loesungNeuLaden(null, false); });
        if (p && fokus) p.focus();
      }
      function loesungNeuLaden(antwortId, unklar) {
        var nr = ++ladeNr;
        standOffen = true;
        Array.prototype.forEach.call(liste.querySelectorAll(".cm-loesen"), function (k) { k.disabled = true; });
        Promise.all([ergebnis(AP.community.beitrag(b.id)), ergebnis(AP.community.antworten(b.id))]).then(function (r) {
          if (!ctx.gilt() || nr !== ladeNr) return;
          var kopf = r[0], ant = r[1];
          var fehlerArt = function (x) { return !x.ok && x.f ? x.f.art : null; };
          if (fehlerArt(kopf) === "veraltet" || fehlerArt(ant) === "veraltet") return;
          if (fehlerArt(kopf) === "anmeldung" || fehlerArt(ant) === "anmeldung") return ctx.abgelaufen();
          if (fehlerArt(kopf) === "gesperrt" || fehlerArt(ant) === "gesperrt") return ctx.gesperrt();
          if (kopf.ok && !kopf.d) return ctx.nichtDa();
          // Inzwischen ausgeblendet oder wieder sichtbar: die ganze Ansicht aus
          // dem neuen Stand aufbauen – keine Aktion nach altem Zustand anbieten.
          if (kopf.ok && !!kopf.d.versteckt !== !!b.versteckt) return zeigen(kopf.d);
          if (kopf.ok) { b.geloest = kopf.d.geloest; kopfZeile(kopf.d); }
          if (pruefHinweis && meldungBox.contains(pruefHinweis)) meldungBox.innerHTML = "";
          pruefHinweis = null;
          if (kopf.ok && ant.ok) {
            standOffen = false;
            meldungBox.innerHTML = "";
            return zeichnen(ant.d, { loesung: antwortId, unklar: unklar }, true);
          }
          if (ant.ok) zeichnen(ant.d, {}, false);
          standFehler(STAND_FEHLER, true);
        });
      }

      function loesenKnopf(a) {
        var ziel = !a.beste;          // gewünschter Zustand aus dem zuletzt geladenen Stand
        var kb = knopf(a.beste ? "Markierung entfernen" : "Als beste Antwort markieren", "kn-neben cm-neben cm-loesen", function () {
          if (markiert || kb.disabled) return;
          markiert = true;
          kb.disabled = true;
          kb.setAttribute("aria-busy", "true");
          var alt = kb.parentNode.querySelector(".cm-loesen-fehler");
          if (alt) alt.remove();
          AP.community.besteAntwort(a.id, ziel).then(function () {
            markiert = false;
            if (!ctx.gilt()) return;
            loesungNeuLaden(a.id, false);
          }, function (f) {
            markiert = false;
            if (!ctx.gilt()) return;
            if (f && f.art === "veraltet") return;
            if (f && f.art === "anmeldung") return ctx.abgelaufen();
            if (f && f.art === "gesperrt") return ctx.gesperrt();
            if (f && f.art === "unklar") {
              // Kein Freigeben mit alter Beschriftung: erst den Stand vom Server holen.
              pruefHinweis = melden("Wir prüfen, ob die Markierung geändert wurde …", false);
              return loesungNeuLaden(a.id, true);
            }
            kb.disabled = false;
            kb.removeAttribute("aria-busy");
            // Alter, bestätigter Zustand bleibt stehen.
            var p = el("p", "meldung fehler cm-loesen-fehler", "Die Markierung konnte nicht geändert werden. Versuch es erneut.");
            p.setAttribute("role", "alert");
            kb.parentNode.insertBefore(p, kb);
          });
        });
        return kb;
      }

      /* ---------- Antwortformular */
      function meinEntwurf() {
        var a = antwortEntwurf;
        return a && a.konto === ctx.konto && a.beitrag === b.id ? a : null;
      }

      function formular(fokus) {
        formBox.innerHTML = "";
        if (b.versteckt) return;
        var ae = meinEntwurf();
        if (!ae || !ae.offen) {
          var oeffnen = knopf("Antwort schreiben", "kn-haupt cm-haupt", function () {
            if (!meinEntwurf()) antwortEntwurf = neuerAntwortEntwurf(ctx.konto, b.id);
            antwortEntwurf.offen = true;
            formular("feld");
          });
          formBox.appendChild(oeffnen);
          if (fokus === "knopf") oeffnen.focus();
          return;
        }
        var form = el("form", "cm-form cm-antwortform");
        form.noValidate = true;
        var feld = mehrzeilig(ctx, { label: "Deine Antwort", pflicht: true, wert: ae.text, zeilen: 5 });
        var z = zaehler(feld, GRENZE.antwort, function (drueber) {
          grenzMeldung(feld, drueber, "Die Antwort braucht 1 bis 2000 Zeichen.", ansage);
        });
        var ansage = vorlesen();
        form.appendChild(feld.box);
        form.appendChild(ansage);
        var platz = el("div", "cm-antwort-status");
        form.appendChild(platz);
        var reihe = el("div", "cm-reihe");
        var senden = el("button", "kn-haupt cm-haupt", "Antwort senden");
        senden.type = "submit";
        var abbr = knopf("Abbrechen", "kn-neben cm-neben", function () {
          if (ae.zustand === "sendet" || ae.zustand === "pruefen" || ae.zustand === "klaeren") return;
          function zu() {
            if (antwortEntwurf === ae) antwortEntwurf = ae.zustand === "unklar" ? ae : null;
            ae.offen = false;
            formular("knopf");
          }
          // Solange offen ist, ob sie angekommen ist, wird nichts verworfen.
          if (ae.zustand === "unklar" || !ae.text.trim()) return zu();
          verwerfenFragen(abbr, zu);
        });
        var sperrHinweis = el("p", "cm-hilfe", TEXT_GESPERRT);
        sperrHinweis.hidden = true;
        form.insertBefore(sperrHinweis, platz);
        reihe.appendChild(senden);
        reihe.appendChild(abbr);
        form.appendChild(reihe);
        formBox.appendChild(form);
        var versucht = false;

        feld.eingabe.addEventListener("input", function () {
          if (ae.zustand) { feld.eingabe.value = ae.text; return; }   // gesperrt (G04)
          ae.text = feld.eingabe.value;
          ae.veraendert = true;
          if (versucht) pruefe();
        });

        function pruefe() {
          var n = laenge(ae.text.trim());
          var falsch = n < 1 || n > GRENZE.antwort;
          ctx.fehlerSetzen(feld, falsch ? "Die Antwort braucht 1 bis 2000 Zeichen." : "");
          return !falsch;
        }

        var gezeigt = null, gezeigtZ = null;
        function darstellen(fokusMeldung) {
          var z = ae.zustand;
          if (z === "sendet") ctx.sperren(senden, "Antwort wird gesendet …");
          else {
            ctx.freigeben(senden);
            senden.disabled = !!z;
          }
          abbr.disabled = z === "sendet" || z === "pruefen" || z === "klaeren";
          eingabenSperren(form, !!z);
          sperrHinweis.hidden = !z;
          if (gezeigt === ae.meldung && gezeigtZ === z) return;
          var hatteFokus = platz.contains(document.activeElement);
          gezeigt = ae.meldung;
          gezeigtZ = z;
          platz.innerHTML = "";
          if (!ae.meldung) return;
          var p = el("p", ae.meldung.fehler ? "meldung fehler" : "meldung", ae.meldung.text);
          p.setAttribute("role", ae.meldung.fehler ? "alert" : "status");
          p.tabIndex = -1;
          platz.appendChild(p);
          if (offenerAusgang(z))
            klaerung(ctx, platz, z, { pruefen: statusPruefen, erneut: erneutSenden, aendern: eingabenAendern },
                     hatteFokus && !fokusMeldung, "antwort");
          if (fokusMeldung) p.focus();
        }
        ae.anzeigen = function (fokusMeldung) { if (ctx.gilt() && document.contains(form)) darstellen(fokusMeldung); };

        var UNKLAR = "Wir konnten nicht prüfen, ob deine Antwort gesendet wurde. Prüfe den Status, bevor du erneut sendest.";

        function gesendet(id) {
          if (antwortEntwurf === ae) antwortEntwurf = null;
          ae.zustand = null;
          if (!ctx.gilt() || !document.contains(form)) return;
          formular();
          laden({ neu: id });
        }

        function fehlgeschlagen(f) {
          if (antwortEntwurf !== ae) return;
          if (f && f.art === "veraltet") return;
          if (f && f.art === "unklar") {
            ae.zustand = "unklar";
            ae.meldung = { text: UNKLAR, fehler: true };
            return ae.anzeigen(true);
          }
          ae.zustand = null;
          var lebt = ctx.gilt();
          if (f && f.art === "anmeldung") return lebt ? ctx.abgelaufen() : null;
          if (f && f.art === "gesperrt") return lebt ? ctx.gesperrt() : null;
          ae.meldung = { fehler: true, text:
            f && f.art === "bremse" ? "Du hast gerade viele Antworten gesendet. Versuch es später erneut."
            : f && (f.art === "rechte" || /nicht beantworten/.test(f.message || ""))
              ? "Du kannst diesen Beitrag gerade nicht bearbeiten oder beantworten."
            : "Deine Antwort wurde nicht gesendet. Deine Eingabe ist noch da." };
          if (f && f.art === "netz" && ctx.offline() && lebt) return ctx.offlineZeigen();
          ae.anzeigen(true);
        }

        /* G03: Ein leerer Status beweist nichts – der Ausgang bleibt offen. */
        function statusPruefen() {
          if (ae.zustand !== "unklar") return;
          ae.zustand = "pruefen";
          ae.anzeigen();
          AP.community.antwortStatus(ae.vorgang).then(function (id) {
            if (antwortEntwurf !== ae) return;
            if (id) return gesendet(id);
            ae.zustand = "unklar";
            ae.meldung = { text: "Die Antwort wurde noch nicht gefunden. Der Ausgang ist weiterhin unklar.", fehler: true };
            ae.anzeigen(true);
          }, function (f) {
            if (antwortEntwurf !== ae) return;
            if (f && f.art === "veraltet") return;
            ae.zustand = "unklar";
            if (f && f.art === "anmeldung" && ctx.gilt()) return ctx.abgelaufen();
            ae.meldung = { text: UNKLAR, fehler: true };
            ae.anzeigen(true);
          });
        }

        // Denselben, beim ersten Senden festgehaltenen Stand mit derselben Kennung.
        function abschicken(versand) {
          ae.zustand = "sendet";
          ae.meldung = null;
          meldungBox.innerHTML = "";
          darstellen();
          AP.community.antwortSchreiben(b.id, versand.text, versand.vorgang).then(gesendet, fehlgeschlagen);
        }

        function erneutSenden() {
          if (ae.zustand !== "unklar" || !ae.versand) return;
          if (ctx.offline()) return ctx.offlineZeigen();
          abschicken(ae.versand);
        }

        // Endgültig klären: angelegt ⇒ Erfolg; verworfen ⇒ Eingabe wieder frei.
        function eingabenAendern() {
          if (ae.zustand !== "unklar") return;
          if (ctx.offline()) return ctx.offlineZeigen();
          ae.zustand = "klaeren";
          ae.anzeigen();
          AP.community.vorgangKlaeren(ae.vorgang, "antwort").then(function (z) {
            if (antwortEntwurf !== ae) return;
            if (z === "angelegt") return gesendet(ae.vorgang);
            ae.zustand = null;
            ae.vorgang = null;
            ae.versand = null;
            ae.meldung = { text: "Deine Antwort wurde nicht gesendet. Du kannst deine Eingabe jetzt ändern.", fehler: true };
            ae.anzeigen(true);
          }, function (f) {
            if (antwortEntwurf !== ae) return;
            if (f && f.art === "veraltet") return;
            ae.zustand = "unklar";
            if (f && f.art === "anmeldung" && ctx.gilt()) return ctx.abgelaufen();
            ae.meldung = { text: UNKLAR, fehler: true };
            ae.anzeigen(true);
          });
        }

        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          if (ae.zustand) return;                 // läuft, wird geklärt oder ist unklar
          versucht = true;
          if (!pruefe()) { feld.eingabe.focus(); return; }
          if (ctx.offline()) return ctx.offlineZeigen();
          function los() {
            // Unveränderte Wiederholung nach sicherer Ablehnung: dieselbe Kennung.
            if (!ae.vorgang) ae.vorgang = AP.community.neueVorgangskennung();
            ae.versand = Object.freeze({ vorgang: ae.vorgang, text: ae.text });
            ae.veraendert = false;
            abschicken(ae.versand);
          }
          if (!ae.vorgang || !ae.veraendert) return los();
          // Eingabe nach einem früheren Versuch geändert: den alten Vorgang erst
          // endgültig schließen, dann mit neuer Kennung senden (G03).
          ae.zustand = "klaeren";
          ae.meldung = null;
          darstellen();
          AP.community.vorgangKlaeren(ae.vorgang, "antwort").then(function (z) {
            if (antwortEntwurf !== ae) return;
            if (z === "angelegt") return gesendet(ae.vorgang);
            ae.zustand = null;
            ae.vorgang = null;
            los();
          }, function (f) {
            if (antwortEntwurf !== ae) return;
            if (f && f.art === "veraltet") return;
            ae.zustand = null;
            if (f && f.art === "anmeldung" && ctx.gilt()) return ctx.abgelaufen();
            ae.meldung = { text: "Deine Antwort wurde nicht gesendet. Deine Eingabe ist noch da.", fehler: true };
            ae.anzeigen(true);
          });
        });

        darstellen();
        if (fokus === "feld") feld.eingabe.focus();
      }

      laden();
      formular();
      return box;
    }

    laden();
  }

  /* ================================================== Formularteile (Spec 05) */

  var GRENZE = { titel: 120, text: 4000, antwort: 2000 };
  var DATEI_MAX = 5242880;                        // 5 MiB
  var DATEI_TYPEN = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

  function laenge(t) { return AP.community.laenge(t); }

  /* G04: Eingaben gegen Bearbeitung sperren, solange ein Vorgang läuft oder
     sein Ausgang offen ist. Textfelder bleiben lesbar und fokussierbar
     (readOnly), Auswahlfelder und Dateiknöpfe werden deaktiviert. Knöpfe der
     Klasse cm-sperrbar gehören zur Eingabe (z. B. „Datei entfernen“). */
  function eingabenSperren(form, an) {
    Array.prototype.forEach.call(form.querySelectorAll("input, textarea, select"), function (x) {
      if (x.type === "submit" || x.type === "button") return;
      if (x.tagName === "TEXTAREA" || x.type === "text" || x.type === "search") {
        x.readOnly = an;
        if (an) x.setAttribute("aria-readonly", "true"); else x.removeAttribute("aria-readonly");
      } else {
        x.disabled = an;
      }
    });
    Array.prototype.forEach.call(form.querySelectorAll(".cm-sperrbar"), function (k) { k.disabled = an; });
  }

  // Bestätigte Texte vom 15.10.2026 (entscheidungen.md, Texte 1 und 2).
  var TEXT_GESPERRT = "Solange der Versand läuft oder sein Ergebnis unklar ist, kannst du deine Eingaben nicht ändern.";
  var TEXT_ERNEUT = "„Erneut senden“ schickt dieselben Eingaben noch einmal – doppelt veröffentlicht wird dabei nichts. ";
  var TEXT_AENDERN = {
    beitrag: "Mit ‚Eingaben ändern‘ prüfen wir den offenen Versuch. Wurde noch nichts veröffentlicht, wird er " +
             "endgültig verworfen. Wurde dein Beitrag bereits veröffentlicht, öffnen wir ihn.",
    antwort: "Mit ‚Eingaben ändern‘ prüfen wir den offenen Versuch. Wurde noch nichts gesendet, wird er " +
             "endgültig verworfen. Wurde deine Antwort bereits gesendet, zeigen wir sie."
  };

  function offenerAusgang(z) { return z === "unklar" || z === "pruefen" || z === "klaeren"; }

  /* G03: Aktionen bei offenem Ausgang. „Status prüfen“ liest nur, „Erneut
     senden“ schickt denselben Versandstand mit derselben Kennung, „Eingaben
     ändern“ klärt den Vorgang endgültig. Ein laufender Schritt sperrt alle drei. */
  function klaerung(ctx, platz, z, a, hatteFokus, art) {
    var reihe = el("div", "cm-reihe cm-klaerung");
    var sp = knopf("Status prüfen", "kn-neben cm-neben", a.pruefen);
    var er = knopf("Erneut senden", "kn-neben cm-neben", a.erneut);
    var ae = knopf("Eingaben ändern", "kn-neben cm-neben", a.aendern);
    [sp, er, ae].forEach(function (k) { reihe.appendChild(k); });
    platz.appendChild(el("p", "cm-hilfe", TEXT_ERNEUT + TEXT_AENDERN[art || "beitrag"]));
    platz.appendChild(reihe);
    if (z === "pruefen") ctx.sperren(sp, "Status wird geprüft …");
    if (z === "klaeren") ctx.sperren(ae, "Wird geklärt …");
    if (z !== "unklar") [sp, er, ae].forEach(function (k) { k.disabled = true; });
    if (hatteFokus) (z === "klaeren" ? ae : sp).focus();
  }

  // Unsichtbare Statuszeile: sagt Grenzverletzungen an, nicht jedes Zeichen.
  function vorlesen() {
    var p = el("p", "cm-ergebnis cm-nur-vorlesen");
    p.setAttribute("role", "status");
    return p;
  }

  function beschreibtDazu(eingabe, id) {
    var alt = eingabe.getAttribute("aria-describedby");
    eingabe.setAttribute("aria-describedby", (alt ? alt + " " : "") + id);
  }

  // Mehrzeiliges Feld mit denselben Labels/Hilfen wie ctx.feld.
  function mehrzeilig(ctx, o) {
    var f = ctx.feld(o);
    var t = el("textarea", "cm-eingabe cm-mehrzeilig");
    ["id", "aria-describedby", "aria-required"].forEach(function (k) {
      var v = f.eingabe.getAttribute(k);
      if (v !== null) t.setAttribute(k, v);
    });
    t.rows = o.zeilen || 6;
    t.value = o.wert || "";
    f.box.replaceChild(t, f.eingabe);
    f.eingabe = t;
    return f;
  }

  // „{n} / 120 Zeichen“ – gezählt wie die Datenbank (Codepunkte, ohne äußere Leerzeichen).
  function zaehler(f, grenze, beiGrenze) {
    var p = el("p", "cm-hilfe cm-zaehler");
    p.id = f.eingabe.id + "-z";
    f.box.insertBefore(p, f.fehler);
    beschreibtDazu(f.eingabe, p.id);
    var war = false;
    function neu() {
      var n = laenge(String(f.eingabe.value || "").trim());
      p.textContent = n + " / " + grenze + " Zeichen";
      var drueber = n > grenze;
      if (drueber !== war) { war = drueber; beiGrenze(drueber); }
    }
    f.eingabe.addEventListener("input", neu);
    neu();
    return { box: p, neu: neu };
  }

  function grenzMeldung(f, drueber, text, ansage) {
    if (drueber) {
      f.fehler.textContent = text;
      f.fehler.hidden = false;
      f.eingabe.setAttribute("aria-invalid", "true");
      f.box.classList.add("hat-fehler");
      if (ansage) ansage.textContent = text;
    } else if (f.fehler.textContent === text) {
      f.fehler.textContent = "";
      f.fehler.hidden = true;
      f.eingabe.removeAttribute("aria-invalid");
      f.box.classList.remove("hat-fehler");
    }
  }

  function groesse(bytes) {
    if (bytes < 1024 * 1024) return Math.max(1, Math.round(bytes / 1024)) + " KB";
    return (bytes / 1024 / 1024).toFixed(1).replace(".", ",") + " MB";
  }

  function dateiFehlerText(d) {
    if (!d) return "";
    if (DATEI_TYPEN.indexOf(d.type) < 0) return "Erlaubt sind JPG, PNG, WebP oder PDF.";
    if (d.size > DATEI_MAX) return "Die Datei darf höchstens 5 MiB groß sein.";
    return "";
  }

  /* Rückfrage vor dem Verwerfen: echter Dialog, Escape = weiter schreiben,
     Fokus zurück zum Auslöser. */
  function verwerfenFragen(ausloeser, verwerfen) {
    var d = el("dialog", "cm-dialog");
    d.setAttribute("aria-labelledby", "cm-verwerfen-titel");
    var innen = el("div", "cm-dialog-innen");
    var h = el("h2", "cm-dialog-frage", "Deine Eingaben wurden noch nicht gesendet. Möchtest du sie verwerfen?");
    h.id = "cm-verwerfen-titel";
    h.tabIndex = -1;
    innen.appendChild(h);
    var entschieden = false;
    var reihe = el("div", "cm-reihe");
    var weiter = knopf("Weiter schreiben", "kn-haupt cm-haupt", function () { d.close(); });
    reihe.appendChild(weiter);
    reihe.appendChild(knopf("Eingaben verwerfen", "kn-neben cm-neben cm-dialog-neben", function () {
      entschieden = true;
      d.close();
    }));
    innen.appendChild(reihe);
    d.appendChild(innen);
    d.addEventListener("close", function () {
      d.remove();
      if (entschieden) verwerfen();
      else if (ausloeser && document.contains(ausloeser)) ausloeser.focus();
    });
    document.body.appendChild(d);
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
    weiter.focus();
  }

  function neuerEntwurf(konto) {
    return { konto: konto, art: "frage", titel: "", text: "", datei: null, dateiFehler: "",
             lernfeld: "", kapitel: "", mentor: false,
             geaendert: false,   // überhaupt etwas eingegeben
             veraendert: false,  // seit dem letzten Sendeversuch geändert → alten Vorgang klären, neue Kennung
             vorgang: null, versand: null /* eingefrorener Versandstand (G04) */,
             zustand: null /* sendet | unklar | pruefen | klaeren */, schritt: null,
             meldung: null, ergebnis: null, ctx: null, anzeigen: null };
  }

  function neuerAntwortEntwurf(konto, beitrag) {
    return { konto: konto, beitrag: beitrag, text: "", offen: false, vorgang: null, versand: null,
             veraendert: false, zustand: null, meldung: null, anzeigen: function () {} };
  }

  // Gibt es ungesendete Eingaben dieses Kontos? (Offline-Hinweis, Tab schließen)
  function hatEntwurf(konto) {
    if (!konto) return false;
    var e = entwurf, a = antwortEntwurf;
    return !!((e && e.konto === konto && (e.geaendert || e.zustand)) ||
              (a && a.konto === konto && (a.text.trim() || a.zustand)));
  }

  /* ================================================== C06 · Beitrag schreiben */

  /* Der Entwurf lebt nur im Arbeitsspeicher dieses Tabs und gehört einem
     Konto (vergessen() bei Abmeldung/Kontowechsel). Ablauf beim Absenden:
     lokale Prüfung → Freigabe prüfen → (Datei hochladen →) veröffentlichen.
     Jede Antwort landet im Entwurf, auch wenn die Ansicht inzwischen eine
     andere ist; gezeigt wird sie, sobald C06 wieder offen ist. */
  function schreiben(r, ctx) {
    dateienFreigeben();
    if (!entwurf || entwurf.konto !== ctx.konto) entwurf = neuerEntwurf(ctx.konto);
    var e = entwurf;
    e.ctx = ctx;
    if (e.ergebnis) return fertig(e);

    var oben = el("div", "cm-oben");
    var zurueck = knopf("‹ Zurück zu Beiträgen", "kn-neben cm-zurueck", function () { abbrechen(zurueck, true); });
    oben.appendChild(zurueck);
    r.appendChild(oben);
    var kopf = ctx.kopf("Beitrag schreiben", "Stell eine Frage oder teile einen Lernzettel oder Tipp.");
    var aug = kopf.querySelector(".schirm-augenbraue");
    if (aug) aug.textContent = "Ich · Community · Beiträge";
    var ziel = el("p", "cm-zeile-oben");
    ziel.appendChild(el("span", null, "Für alle in der Community"));
    kopf.insertBefore(ziel, kopf.lastChild);
    r.appendChild(kopf);

    var form = el("form", "cm-form cm-schreiben");
    form.noValidate = true;
    var uebersichtPlatz = el("div");
    form.appendChild(uebersichtPlatz);
    var ansage = vorlesen();

    // Beitragsart
    var arten = el("fieldset", "cm-feld cm-arten");
    var legende = el("legend", null, "Beitragsart");
    legende.appendChild(el("span", "cm-pflicht", "Pflicht"));
    arten.appendChild(legende);
    var radios = {};
    [["frage", "Frage"], ["lernzettel", "Lernzettel"], ["tipp", "Tipp"]].forEach(function (w) {
      var lab = el("label", "cm-haken cm-wahl");
      var i = el("input");
      i.type = "radio";
      i.name = "cm-beitragsart";
      i.value = w[0];
      i.checked = e.art === w[0];
      i.addEventListener("change", function () { if (i.checked && !e.zustand) artGewechselt(w[0]); });
      lab.appendChild(i);
      lab.appendChild(el("span", null, w[1]));
      arten.appendChild(lab);
      radios[w[0]] = i;
    });
    var artHinweis = el("p", "cm-hilfe", "Die ausgewählte Datei wird bei dieser Beitragsart nicht veröffentlicht.");
    arten.appendChild(artHinweis);
    form.appendChild(arten);

    // Titel
    var titel = ctx.feld({ label: "Titel", pflicht: true, wert: e.titel, attr: { autocomplete: "off" } });
    zaehler(titel, GRENZE.titel, function (d) { grenzMeldung(titel, d, "Der Titel braucht 3 bis 120 Zeichen.", ansage); });
    form.appendChild(titel.box);

    // Text / Beschreibung
    var text = mehrzeilig(ctx, { label: "Text", pflicht: true, wert: e.text, zeilen: 8 });
    zaehler(text, GRENZE.text, function (d) { grenzMeldung(text, d, "Der Text darf höchstens 4000 Zeichen lang sein.", ansage); });
    form.appendChild(text.box);

    // Datei (nur Lernzettel) – Auswahl nur lokal, hochgeladen wird erst beim Veröffentlichen.
    var datei = ctx.feld({ label: "Datei", pflicht: true, typ: "file", hilfe: "JPG, PNG, WebP oder PDF, höchstens 5 MiB.",
      attr: { accept: ".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf" } });
    var auswahl = el("p", "cm-hilfe cm-auswahl");
    auswahl.id = datei.eingabe.id + "-a";
    datei.box.insertBefore(auswahl, datei.fehler);
    beschreibtDazu(datei.eingabe, auswahl.id);
    var entfernen = knopf("Datei entfernen", "kn-neben cm-neben cm-sperrbar", function () {
      if (e.zustand) return;                // gesperrt (G04)
      e.datei = null;
      e.dateiFehler = "";
      merke();
      datei.eingabe.value = "";
      dateiAnzeigen();
      if (versucht) pruefeAlles();
      datei.eingabe.focus();
    });
    datei.box.insertBefore(entfernen, datei.fehler);
    var hochHinweis = el("p", "cm-hilfe",
      "Lade nur Inhalte hoch, die du teilen darfst. Keine echten IHK-Prüfungsaufgaben und keine persönlichen Daten anderer Personen. " +
      "Prüfe auch Bilder, Screenshots und Dokumente vor dem Hochladen.");
    datei.box.appendChild(hochHinweis);
    datei.eingabe.addEventListener("change", function () {
      if (e.zustand) return;                // gesperrt (G04)
      var d = datei.eingabe.files && datei.eingabe.files[0];
      if (!d) return;                       // Auswahl abgebrochen: bisherige Datei bleibt
      var fehler = dateiFehlerText(d);
      if (fehler) {
        e.datei = null;
        e.dateiFehler = fehler;
        datei.eingabe.value = "";
        ctx.fehlerSetzen(datei, fehler);
        ansage.textContent = fehler;
      } else {
        e.datei = d;
        e.dateiFehler = "";
        ctx.fehlerSetzen(datei, "");
      }
      merke();
      dateiAnzeigen();
      if (versucht) pruefeAlles();
    });
    form.appendChild(datei.box);

    function dateiAnzeigen() {
      auswahl.textContent = e.datei ? "Ausgewählt: " + e.datei.name + " · " + groesse(e.datei.size) : "Keine Datei ausgewählt.";
      entfernen.hidden = !e.datei;
      artHinweis.hidden = !(e.datei && e.art !== "lernzettel");
    }
    // Nach dem Neuzeichnen die gewählte Datei wieder ins Feld setzen, wo der Browser das kann.
    if (e.datei) {
      try { var dt = new DataTransfer(); dt.items.add(e.datei); datei.eingabe.files = dt.files; } catch (x) {}
    }

    // Lernfeld / Kapitel – nur aus dem geladenen Katalog.
    if (e.lernfeld && !lernfeldVon(ctx, e.lernfeld)) { e.lernfeld = ""; e.kapitel = ""; }
    var lfWahl = [["", "Kein Lernfeld"]].concat(lernfelder(ctx).map(function (x) { return [x.id, x.kurz + " · " + x.titel]; }));
    var lf = ctx.feld({ label: "Lernfeld (optional)", wert: e.lernfeld, select: lfWahl });
    form.appendChild(lf.box);
    var kap = ctx.feld({ label: "Kapitel (optional)", select: [["", "Kein Kapitel"]] });
    var kapHinweis = el("p", "cm-hilfe", "Das Kapitel wurde zurückgesetzt, weil du das Lernfeld gewechselt hast.");
    kapHinweis.id = kap.eingabe.id + "-r";
    kapHinweis.hidden = true;
    kap.box.insertBefore(kapHinweis, kap.fehler);
    beschreibtDazu(kap.eingabe, kapHinweis.id);
    form.appendChild(kap.box);
    function kapitelFuellen() {
      var x = e.lernfeld ? lernfeldVon(ctx, e.lernfeld) : null;
      kap.eingabe.innerHTML = "";
      [["", "Kein Kapitel"]].concat(((x && x.kapitel) || []).map(function (k) {
        return [k.id, "Kapitel " + k.nummer + " · " + k.titel];
      })).forEach(function (w) {
        var o = el("option", null, w[1]);
        o.value = w[0];
        kap.eingabe.appendChild(o);
      });
      if (e.kapitel && !((x && x.kapitel) || []).some(function (k) { return k.id === e.kapitel; })) e.kapitel = "";
      kap.eingabe.value = e.kapitel || "";
      kap.box.hidden = !x;
    }
    kapitelFuellen();
    lf.eingabe.addEventListener("change", function () {
      if (e.zustand) return;
      var hatte = !!e.kapitel;
      e.lernfeld = lf.eingabe.value;
      e.kapitel = "";
      merke();
      kapitelFuellen();
      kapHinweis.hidden = !(hatte && e.lernfeld);
      if (hatte) ansage.textContent = "Das Kapitel wurde zurückgesetzt, weil du das Lernfeld gewechselt hast.";
    });
    kap.eingabe.addEventListener("change", function () {
      if (e.zustand) return;
      e.kapitel = kap.eingabe.value;
      kapHinweis.hidden = true;
      merke();
    });

    // Mentor:innen (nur Frage)
    var mentor = ctx.haken("Frage an Mentor:innen richten", e.mentor, false);
    var mHilfe = el("p", "cm-hilfe", "Das kennzeichnet deine Frage für Mentor:innen. Eine Antwort ist nicht garantiert.");
    mHilfe.id = mentor.eingabe.id + "-h";
    mentor.box.insertBefore(mHilfe, mentor.fehler);
    beschreibtDazu(mentor.eingabe, mHilfe.id);
    mentor.eingabe.addEventListener("change", function () { if (e.zustand) return; e.mentor = mentor.eingabe.checked; merke(); });
    form.appendChild(mentor.box);

    // Status und Aktionen
    var sperrHinweis = el("p", "cm-hilfe", TEXT_GESPERRT);
    sperrHinweis.hidden = true;
    form.appendChild(sperrHinweis);
    var platz = el("div", "cm-schreib-status");
    form.appendChild(platz);
    form.appendChild(ansage);
    var reihe = el("div", "cm-reihe");
    var senden = el("button", "kn-haupt cm-haupt", "Beitrag veröffentlichen");
    senden.type = "submit";
    var abbr = knopf("Abbrechen", "kn-neben cm-neben", function () { abbrechen(abbr, false); });
    reihe.appendChild(senden);
    reihe.appendChild(abbr);
    form.appendChild(reihe);
    r.appendChild(form);

    var versucht = false;

    function merke() {
      if (e.zustand) {                       // gesperrt (G04): Felder zeigen den Versandstand
        titel.eingabe.value = e.titel;
        text.eingabe.value = e.text;
        return;
      }
      e.titel = titel.eingabe.value;
      e.text = text.eingabe.value;
      e.geaendert = true;
      e.veraendert = true;
    }
    [titel, text].forEach(function (f) {
      f.eingabe.addEventListener("input", function () { merke(); if (versucht) pruefeAlles(); });
    });

    function artAnzeigen() {
      var lz = e.art === "lernzettel";
      var label = text.box.querySelector("label");
      label.textContent = lz ? "Beschreibung (optional)" : "Text";
      if (!lz) label.appendChild(el("span", "cm-pflicht", "Pflicht"));
      if (lz) text.eingabe.removeAttribute("aria-required");
      else text.eingabe.setAttribute("aria-required", "true");
      datei.box.hidden = !lz;
      mentor.box.hidden = e.art !== "frage";
      dateiAnzeigen();
    }

    function artGewechselt(neu) {
      var alt = e.art;
      e.art = neu;
      merke();
      artAnzeigen();
      if (alt === "lernzettel" && e.datei) ansage.textContent = "Die ausgewählte Datei wird bei dieser Beitragsart nicht veröffentlicht.";
      if (versucht) pruefeAlles();
    }

    // Prüft alle Felder, setzt die Fehler und gibt die fehlerhaften Felder zurück.
    function pruefeAlles() {
      var t = laenge(e.titel.trim());
      var tx = e.text.trim();
      var paare = [
        [titel, t < 3 || t > GRENZE.titel ? "Der Titel braucht 3 bis 120 Zeichen." : ""],
        [text, laenge(tx) > GRENZE.text ? "Der Text darf höchstens 4000 Zeichen lang sein."
          : !tx && e.art === "frage" ? "Gib einen Text für deine Frage ein."
          : !tx && e.art === "tipp" ? "Gib einen Text für deinen Tipp ein." : ""],
        [datei, e.art !== "lernzettel" ? ""
          : e.datei ? dateiFehlerText(e.datei)
          : e.dateiFehler || "Wähle eine Datei für deinen Lernzettel."]
      ];
      var falsch = [];
      paare.forEach(function (p) {
        ctx.fehlerSetzen(p[0], p[1]);
        if (p[1]) falsch.push(p[0]);
      });
      // Übersicht nur verkleinern, nie neu ansagen.
      var box = uebersichtPlatz.firstChild;
      if (box) {
        var ids = falsch.map(function (f) { return f.eingabe.id; });
        Array.prototype.forEach.call(box.querySelectorAll("li"), function (li) {
          var a = li.querySelector("a");
          var id = a.getAttribute("href").slice(1);
          var i = ids.indexOf(id);
          if (i < 0) li.remove();
          else a.textContent = falsch[i].fehler.textContent;
        });
        if (!box.querySelector("li")) uebersichtPlatz.innerHTML = "";
      }
      return falsch;
    }

    var gezeigt = null, gezeigtZ = null;
    function darstellen(fokusMeldung) {
      var z = e.zustand, v = e.versand;
      if (z === "sendet") {
        ctx.sperren(senden, v && v.datei && e.schritt !== "veroeffentlichen"
          ? "Datei wird hochgeladen …" : "Beitrag wird veröffentlicht …");
      } else {
        ctx.freigeben(senden);
        senden.disabled = !!z;
      }
      abbr.disabled = z === "sendet" || z === "pruefen" || z === "klaeren";
      eingabenSperren(form, !!z);
      sperrHinweis.hidden = !z;
      if (gezeigt === e.meldung && gezeigtZ === z) return;
      var hatteFokus = platz.contains(document.activeElement);
      gezeigt = e.meldung;
      gezeigtZ = z;
      platz.innerHTML = "";
      if (!e.meldung) return;
      var p = el("p", e.meldung.fehler ? "meldung fehler" : "meldung", e.meldung.text);
      p.setAttribute("role", e.meldung.fehler ? "alert" : "status");
      p.tabIndex = -1;
      platz.appendChild(p);
      if (offenerAusgang(z))
        klaerung(ctx, platz, z, { pruefen: statusPruefen, erneut: erneutSenden, aendern: eingabenAendern },
                 hatteFokus && !fokusMeldung, "beitrag");
      if (fokusMeldung) p.focus();
    }
    e.anzeigen = function (fokusMeldung) {
      if (ctx.gilt() && document.contains(form)) darstellen(fokusMeldung);
    };

    function abbrechen(ausloeser, istZurueck) {
      function weg() {
        if (ctx.vonListe()) history.back();
        else location.hash = "#community";
      }
      // Während des Sendens: zurück geht, abgebrochen wird nichts.
      if (e.zustand === "sendet" || e.zustand === "pruefen" || e.zustand === "klaeren") { if (istZurueck) weg(); return; }
      // Ausgang offen: Entwurf bleibt, bis der Status geklärt ist.
      if (e.zustand === "unklar") return weg();
      if (!e.geaendert) { if (entwurf === e) entwurf = null; return weg(); }
      verwerfenFragen(ausloeser, function () {
        if (entwurf !== e) return weg();
        if (!e.vorgang) { entwurf = null; return weg(); }
        // G08: Es gab schon einen (sicher abgelehnten) Versuch, vielleicht mit
        // hochgeladener Datei. Erst endgültig klären: „verworfen“ entfernt die
        // Datei dieses Vorgangs, „angelegt“ heißt, der Beitrag ist doch da.
        e.zustand = "klaeren";
        e.meldung = null;
        e.anzeigen();
        AP.community.vorgangKlaeren(e.vorgang, "beitrag", e.versand && e.versand.datei).then(function (z) {
          if (entwurf !== e) return;
          if (z === "angelegt") return erfolg(e, e.vorgang);
          entwurf = null;
          weg();
        }, function (f) {
          if (entwurf !== e) return;
          if (f && f.art === "veraltet") return;
          e.zustand = null;
          if (f && f.art === "anmeldung" && e.ctx.gilt()) return e.ctx.abgelaufen();
          e.meldung = { text: "Deine Eingaben konnten noch nicht verworfen werden. Versuch es erneut.", fehler: true };
          e.anzeigen(true);
        });
      });
    }

    /* G03: Ein leerer Status beweist nichts – der Ausgang bleibt offen. */
    function statusPruefen() {
      if (e.zustand !== "unklar") return;
      e.zustand = "pruefen";
      e.anzeigen();
      AP.community.beitragStatus(e.vorgang).then(function (id) {
        if (entwurf !== e) return;
        if (id) return erfolg(e, id);
        e.zustand = "unklar";
        e.meldung = { text: "Der Beitrag wurde noch nicht gefunden. Der Ausgang ist weiterhin unklar.", fehler: true };
        e.anzeigen(true);
      }, function (f) {
        if (entwurf !== e) return;
        if (f && f.art === "veraltet") return;
        e.zustand = "unklar";
        if (f && f.art === "anmeldung" && e.ctx.gilt()) return e.ctx.abgelaufen();
        e.meldung = { text: UNKLAR_BEITRAG, fehler: true };
        e.anzeigen(true);
      });
    }

    function erneutSenden() {
      if (e.zustand !== "unklar" || !e.versand) return;
      if (ctx.offline()) return ctx.offlineZeigen();
      abschicken(e, false);
    }

    // Endgültig klären: angelegt ⇒ Erfolg; verworfen ⇒ Eingaben wieder frei,
    // die Datei dieses Vorgangs wird entfernt.
    function eingabenAendern() {
      if (e.zustand !== "unklar") return;
      if (ctx.offline()) return ctx.offlineZeigen();
      e.zustand = "klaeren";
      e.anzeigen();
      AP.community.vorgangKlaeren(e.vorgang, "beitrag", e.versand && e.versand.datei).then(function (z) {
        if (entwurf !== e) return;
        if (z === "angelegt") return erfolg(e, e.vorgang);
        e.zustand = null;
        e.vorgang = null;
        e.versand = null;
        e.meldung = { text: "Dein Beitrag wurde nicht veröffentlicht. Du kannst deine Eingaben jetzt ändern.", fehler: true };
        e.anzeigen(true);
      }, function (f) {
        if (entwurf !== e) return;
        if (f && f.art === "veraltet") return;
        e.zustand = "unklar";
        if (f && f.art === "anmeldung" && e.ctx.gilt()) return e.ctx.abgelaufen();
        e.meldung = { text: UNKLAR_BEITRAG, fehler: true };
        e.anzeigen(true);
      });
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (e.zustand) return;                   // läuft, wird geklärt oder ist unklar
      e.titel = titel.eingabe.value;
      e.text = text.eingabe.value;
      versucht = true;
      var falsch = pruefeAlles();
      if (falsch.length) {
        uebersichtPlatz.innerHTML = "";
        var box = ctx.fehleruebersicht(falsch);
        box.tabIndex = -1;
        uebersichtPlatz.appendChild(box);
        box.focus();
        return;
      }
      uebersichtPlatz.innerHTML = "";
      if (ctx.offline()) return ctx.offlineZeigen();
      function los() {
        // Unveränderte Wiederholung nach sicherer Ablehnung: dieselbe Kennung.
        if (!e.vorgang) e.vorgang = AP.community.neueVorgangskennung();
        // G04: Genau dieser geprüfte Stand wird gesendet – auch bei jeder Wiederholung.
        e.versand = Object.freeze({
          vorgang: e.vorgang, art: e.art, titel: e.titel, text: e.text.trim(),
          lernfeld: e.lernfeld || null, kapitel: e.kapitel || null,
          anMentoren: e.art === "frage" && e.mentor,
          datei: e.art === "lernzettel" ? e.datei : null
        });
        e.veraendert = false;
        abschicken(e, true);
      }
      if (!e.vorgang || !e.veraendert) return los();
      // Eingaben nach einem früheren Versuch geändert: den alten Vorgang erst
      // endgültig schließen (und seine Datei entfernen), dann neue Kennung (G03).
      e.zustand = "klaeren";
      e.meldung = null;
      darstellen();
      var alt = e.versand;
      AP.community.vorgangKlaeren(e.vorgang, "beitrag", alt && alt.datei).then(function (z) {
        if (entwurf !== e) return;
        if (z === "angelegt") return erfolg(e, e.vorgang);
        e.zustand = null;
        e.vorgang = null;
        los();
      }, function (f) {
        if (entwurf !== e) return;
        if (f && f.art === "veraltet") return;
        e.zustand = null;
        if (f && f.art === "anmeldung" && e.ctx.gilt()) return e.ctx.abgelaufen();
        e.meldung = { text: "Dein Beitrag wurde nicht veröffentlicht. Deine Eingaben sind noch da.", fehler: true };
        e.anzeigen(true);
      });
    });

    artAnzeigen();
    darstellen();
  }

  var UNKLAR_BEITRAG = "Wir konnten nicht prüfen, ob dein Beitrag veröffentlicht wurde. Prüfe den Status, bevor du erneut sendest.";

  /* Sendet den festgehaltenen Versandstand g.versand. pruefen: vorher die
     Paketfreigabe abfragen (erster Versuch); eine Wiederholung aus dem
     unklaren Zustand verlässt sich auf die Prüfung in der RPC. */
  function abschicken(g, pruefen) {
    var v = g.versand;
    g.zustand = "sendet";
    g.schritt = null;
    g.meldung = null;
    g.anzeigen();
    var frei = pruefen ? AP.community.beitraegeFrei() : Promise.resolve(true);
    frei.then(function (ok) {
      if (entwurf !== g) return;
      if (!ok) return fehlschlag(g, { art: "gesperrt" });
      return AP.community.veroeffentlichen({
        vorgang: v.vorgang, art: v.art, titel: v.titel, text: v.text,
        lernfeld: v.lernfeld, kapitel: v.kapitel, anMentoren: v.anMentoren, datei: v.datei,
        schritt: function (s) { g.schritt = s; if (g.zustand === "sendet") g.anzeigen(); }
      }).then(function (id) { erfolg(g, id); }, function (f) { fehlschlag(g, f); });
    }, function (f) { fehlschlag(g, f); });
  }

  function erfolg(g, id) {
    if (entwurf !== g) return;
    g.zustand = null;
    g.ergebnis = id;
    if (g.ctx && g.ctx.gilt()) fertig(g);
  }

  // Bestätigte ID: Entwurf erst jetzt löschen und C05 des eigenen Beitrags öffnen.
  function fertig(g) {
    if (entwurf === g) entwurf = null;
    gerade = { id: g.ergebnis, konto: g.konto, text: "Dein Beitrag wurde veröffentlicht." };
    location.replace(location.pathname + location.search + "#community/beitrag/" + g.ergebnis);
  }

  function fehlschlag(g, f) {
    if (entwurf !== g) return;
    if (f && f.art === "veraltet") return;     // Konto gewechselt: alles schon vergessen
    var ctx = g.ctx, lebt = ctx && ctx.gilt();
    if (f && f.art === "unklar") {
      g.zustand = "unklar";
      g.meldung = { text: UNKLAR_BEITRAG, fehler: true };
      return g.anzeigen(true);
    }
    g.zustand = null;
    g.schritt = null;
    if (f && f.art === "anmeldung") return lebt ? ctx.abgelaufen() : null;
    if (f && f.art === "gesperrt") return lebt ? ctx.gesperrt() : null;
    var text = "Dein Beitrag wurde nicht veröffentlicht. Deine Eingaben sind noch da.";
    if (f && f.art === "bremse") text = "Du hast gerade viele Beiträge veröffentlicht. Versuch es später erneut.";
    else if (f && f.art === "eingabe" && f.message) text += " " + f.message;
    g.meldung = { text: text, fehler: true };
    if (f && f.art === "netz" && lebt && ctx.offline()) return ctx.offlineZeigen();
    g.anzeigen(true);
  }

  // Tab schließen oder neu laden mit ungesendeten Eingaben: so weit der Browser es kann.
  window.addEventListener("beforeunload", function (ev) {
    var konto = AP.community && AP.community.kontoJetzt ? AP.community.kontoJetzt() : null;
    if (!hatEntwurf(konto)) return;
    ev.preventDefault();
    ev.returnValue = "";
  });

  // Die Übersicht wird gleich neu gezeichnet: Filter und Position mitnehmen.
  function zurueckholen() {
    stand.scroll = window.scrollY;
    stand.zurueck = true;
  }

  // Gemeinsame Bausteine für community-moderation.js (Spec 06).
  var teile = { knopf: knopf, verweis: verweis, datum: datum, personText: personText, marke: marke,
                mehrzeilig: mehrzeilig, zaehler: zaehler, grenzMeldung: grenzMeldung, vorlesen: vorlesen,
                eingabenSperren: eingabenSperren, verwerfenFragen: verwerfenFragen,
                dateiMerken: function (d) { dateien.push(d); } };

  AP.communityBeitraege = { liste: liste, detail: detail, schreiben: schreiben, vergessen: vergessen,
                            hatEntwurf: hatEntwurf, teile: teile,
                            dateienFreigeben: dateienFreigeben, zurueckholen: zurueckholen };
})();
