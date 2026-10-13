/* AzubiPass · Community – Beiträge lesen
   ---------------------------------------------------------------------------
   C04 Übersicht und C05 Lesedetail nach doku/community/04-beitraege.md
   (Version 1) und den Entscheidungen vom 12.10.2026:

     – nur allgemeine Beiträge (gruppe_id = null), Gruppen kommen später
     – Filter Beitragsart und Lernfeld, neueste zuerst
     – „Weitere Beiträge laden" mit stabiler Zeit-/ID-Navigation
     – Dateien nur über den angemeldeten Abruf (aktuelle Rechteprüfung)
     – keine Schreib-, Melde- oder Reaktionsknöpfe: Das kommt mit den
       eigenen Specs. Hilfreich und „Gelöst" sind hier reine Anzeigen.

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

  function leererStand(konto) {
    return { konto: konto, art: "", lernfeld: "", geladen: 0, scroll: 0, zuletzt: null, zurueck: false };
  }

  function vergessen() {
    stand = leererStand(null);
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
        // „Stell eine Frage …" und „Beitrag schreiben" erst mit freigegebenem C06.
        bereich.appendChild(el("p", "cm-leer", "Hier gibt es noch keine Beiträge."));
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

    function laden() {
      AP.community.beitrag(id).then(function (b) {
        if (!ctx.gilt()) return;
        // Nicht vorhanden, nicht erlaubt oder (noch) in einer Gruppe: neutral.
        if (!b || b.gruppe_id) return ctx.nichtDa();
        zeigen(b);
      }, function (f) {
        if (!ctx.gilt()) return;
        if (f && f.art === "veraltet") return;
        if (f && f.art === "anmeldung") return ctx.abgelaufen();
        if (f && f.art === "netz" && ctx.offline()) return ctx.offlineZeigen();
        var h = r.querySelector("h1");
        h.textContent = "Beitrag";
        h.removeAttribute("aria-live");
        inhalt.innerHTML = "";
        var p = el("p", "meldung fehler", "Der Beitrag konnte nicht geladen werden. Versuch es erneut.");
        p.setAttribute("role", "alert");
        inhalt.appendChild(p);
        var reihe = el("div", "cm-reihe");
        reihe.appendChild(knopf("Erneut versuchen", "kn-haupt cm-haupt", function () {
          h.textContent = "Beitrag wird geladen …";
          inhalt.innerHTML = "";
          laden();
        }));
        reihe.appendChild(verweis("Zu Lernen", "app.html#lernen"));
        inhalt.appendChild(reihe);
      });
    }

    function zeigen(b) {
      var h = r.querySelector("h1");
      h.removeAttribute("aria-live");
      // Kopfzeile über dem Titel: Art, Zuordnung, Status – als Text, nicht nur Farbe.
      var zo = zuordnung(ctx, b);
      var aug = kopf.querySelector(".schirm-augenbraue");
      var zeileOben = el("p", "cm-zeile-oben");
      zeileOben.appendChild(el("span", null, ARTNAME[b.art] || ""));
      zeileOben.appendChild(el("span", null, "Für alle in der Community"));
      if (zo) zeileOben.appendChild(el("span", null, zuordnungText(zo)));
      if (b.art === "frage" && b.geloest) zeileOben.appendChild(marke("Gelöst"));
      if (b.an_mentoren) zeileOben.appendChild(marke("An Mentor:innen"));
      kopf.insertBefore(zeileOben, h);
      if (aug) aug.textContent = "Ich · Community · Beiträge";
      h.textContent = b.titel;
      inhalt.innerHTML = "";

      if (b.versteckt) {
        // Nur Autor:in oder Team bekommen ausgeblendete Beiträge überhaupt zu sehen.
        zeileOben.appendChild(marke("Ausgeblendet"));
        inhalt.appendChild(el("p", "meldung", "Dieser Beitrag ist ausgeblendet."));
        var reihe = el("div", "cm-reihe");
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

    function antwortBereich(b) {
      var box = el("section", "cm-antworten");
      var h = el("h2", "cm-abschnitt", "Antworten");
      box.appendChild(h);
      var zahl = el("p", "cm-zeile-meta");
      box.appendChild(zahl);
      var liste = el("div");
      box.appendChild(liste);
      function laden() {
        zahl.textContent = "";
        liste.innerHTML = "";
        var st = el("p", "cm-hilfe", "Antworten werden geladen …");
        st.setAttribute("role", "status");
        liste.appendChild(st);
        AP.community.antworten(b.id).then(function (alle) {
          if (!ctx.gilt()) return;
          // Ausgeblendete Antworten gehören nicht in die normale Ansicht.
          var sichtbar = (alle || []).filter(function (a) { return !a.versteckt; });
          liste.innerHTML = "";
          zahl.textContent = anzahlAntworten(sichtbar.length);
          if (!sichtbar.length) { liste.appendChild(el("p", "cm-leer", "Noch keine Antworten.")); return; }
          var ol = el("ol", "liste-schlicht cm-antwortliste");
          sichtbar.forEach(function (a) {
            var li = el("li", "cm-antwort");
            if (a.beste) li.appendChild(el("p", "cm-zeile-oben", "")).appendChild(marke("Beste Antwort"));
            li.appendChild(el("div", "cm-text", a.text));
            var p = a.autor || {};
            li.appendChild(el("p", "cm-zeile-meta",
              [personText(p.anzeigename, p.rolle, p.lehrjahr), datum(a.erstellt_am)].join(" · ")));
            ol.appendChild(li);
          });
          liste.appendChild(ol);
        }, function (f) {
          if (!ctx.gilt()) return;
          if (f && f.art === "veraltet") return;
          if (f && f.art === "anmeldung") return ctx.abgelaufen();
          liste.innerHTML = "";
          var p = el("p", "meldung fehler", "Die Antworten konnten nicht geladen werden.");
          p.setAttribute("role", "alert");
          liste.appendChild(p);
          liste.appendChild(knopf("Erneut versuchen", "kn-neben cm-neben", laden));
        });
      }
      laden();
      return box;
    }

    laden();
  }

  // Die Übersicht wird gleich neu gezeichnet: Filter und Position mitnehmen.
  function zurueckholen() {
    stand.scroll = window.scrollY;
    stand.zurueck = true;
  }

  AP.communityBeitraege = { liste: liste, detail: detail, vergessen: vergessen,
                            dateienFreigeben: dateienFreigeben, zurueckholen: zurueckholen };
})();
