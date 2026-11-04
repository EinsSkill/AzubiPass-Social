/* AzubiPass · Übungsrunden
   ---------------------------------------------------------------------------
   Kurze Runden aus dem, was es schon gibt: Kapitelchecks, Zuordnungen,
   Selbsttests, Karteikarten und Klausurbausteine. Ablauf je Aufgabe:
   Aufgabe → eigener Versuch → prüfen → Erklärung → weiter.

   Renderer und Bewertung der Bausteine kommen aus aufgaben.js (APK.uebung).
   Die Runde hat ihren eigenen Stand: Sie liegt außerhalb des Kontos unter
   AP.rundenSchluessel(beruf) und berührt keinen Klausurbogen. Ins Konto gehen
   nur die Versuche (AP.versuchMerken), nie die eingegebenen Antworten.        */

window.APT = (function () {
  "use strict";

  var AP = window.AP;
  var el = AP.el, mkEl = AP.mkEl;

  var GROESSE = 5, KURZE = 3;
  var FASSUNG = 1;
  var STATUS = { selbst: "eigenständig gelöst", hilfe: "mit Hilfe gelöst",
                 offen: "noch offen", loesung: "Lösung angesehen" };

  var helfer = null;       // von app.js: inhalt, alles, schwachstellen, faelligeKarten …
  var buehne = null;
  var runde = null;
  var wahl = { beruf: null, lernfeld: "", kapitel: "" };
  var lauf = 0;            // verwirft verspätete Antworten beim Laden der Aufgaben

  function knopf(klasse, text, beiKlick) {
    var b = el("button", klasse, text);
    b.type = "button";
    if (beiKlick) b.addEventListener("click", beiKlick);
    return b;
  }

  function nurText(s) { return AP.mk(s).replace(/<[^>]+>/g, ""); }

  function uebung() { return window.APK && window.APK.uebung; }

  function mischen(folge) {
    for (var i = folge.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = folge[i]; folge[i] = folge[j]; folge[j] = t;
    }
    return folge;
  }

  /* ================================================== Rundenstand */

  function ablegen() {
    if (!runde) return;
    try { localStorage.setItem(AP.rundenSchluessel(runde.beruf), JSON.stringify(runde)); }
    catch (e) { /* Speicher voll: Die Runde läuft in diesem Tab weiter */ }
  }

  /* Defensiv wie beim Klausurbogen: Was hier liegt, kann alt oder von Hand
     verstellt sein. Im Zweifel gibt es eben keine laufende Runde. */
  function rundeLaden() {
    var beruf = AP.beruf();
    try {
      var r = JSON.parse(localStorage.getItem(AP.rundenSchluessel(beruf)));
      if (!r || r.v !== FASSUNG || r.beruf !== beruf || !Array.isArray(r.folge) || !r.folge.length) {
        return null;
      }
      if (typeof r.pos !== "number" || r.pos < 0 || r.pos > r.folge.length) r.pos = 0;
      return r;
    } catch (e) { return null; }
  }

  function rundeLoeschen() {
    try { localStorage.removeItem(AP.rundenSchluessel(AP.beruf())); } catch (e) {}
    runde = null;
  }

  function laufendeRunde() {
    var r = rundeLaden();
    return r && !r.fertig ? r : null;
  }

  function neueRunde(art, titel, kapitel, folge) {
    runde = {
      v: FASSUNG, id: Date.now().toString(36) + "-" + Math.floor(Math.random() * 46656).toString(36),
      art: art, titel: titel, kapitel: kapitel || null, beruf: AP.beruf(),
      folge: folge.map(function (s, i) {
        s.seed = (s.seed || "") + Date.now().toString(36) + "#" + i;
        s.antworten = {}; s.werte = {}; s.selbst = {};
        s.hinweise = 0; s.geprueft = false; s.status = null;
        return s;
      }),
      pos: 0, fertig: false
    };
    ablegen();
    /* Neuladen setzt die Runde fort und startet keine neue. */
    try { history.replaceState(history.state, "", "#ueben/runde"); } catch (e) {}
    zeichnen();
  }

  /* ================================================== Aufgabenvorrat */

  function fragen() { return helfer.inhalt().quiz; }

  function frageZu(id) { return fragen().filter(function (q) { return q.id === id; })[0] || null; }

  function testZu(id) {
    return helfer.inhalt().tests.filter(function (t) { return t.id === id; })[0] || null;
  }

  function karteZu(id) {
    return helfer.inhalt().karten.filter(function (k) { return k.id === id; })[0] || null;
  }

  function kapitelVonZu(zu) { return String(zu || "").replace(".html#", ":"); }

  function kapitelInfo(schluessel) {
    var t = String(schluessel).split(":"), raus = null;
    helfer.inhalt().lernfelder.forEach(function (lf) {
      if (lf.id !== t[0]) return;
      lf.kapitel.forEach(function (k) { if (k.id === t[1]) raus = { lf: lf, k: k }; });
    });
    return raus;
  }

  function kapitelText(schluessel) {
    var i = kapitelInfo(schluessel);
    return i ? i.lf.kurz + " · K" + i.k.nummer + " · " + i.k.titel : schluessel;
  }

  /* Geübtes nach hinten, Offenes nach vorn. Ein Zweitfall kommt nicht zufällig
     in eine Runde: Er ist die Folgeaktion nach dem ersten Fall. */
  function gewichtet(liste, idVon) {
    var q = AP.stand.quiz || {};
    return mischen(liste.slice()).sort(function (a, b) {
      var x = q[idVon(a)], y = q[idVon(b)];
      return (x && x.s === "selbst" ? 1 : 0) - (y && y.s === "selbst" ? 1 : 0);
    });
  }

  function bausteineFuer(kapitel) {
    var u = uebung();
    if (!u || !u.vorrat()) return [];
    var alle = [];
    kapitel.forEach(function (k) { alle = alle.concat(u.bausteineZu(k)); });
    var zweit = {};
    alle.forEach(function (b) { if (b.uebung && b.uebung.zweitfall) zweit[b.uebung.zweitfall] = true; });
    return alle.filter(function (b) { return !zweit[b.id]; });
  }

  function vorratFuer(kapitel) {
    return {
      kurz: fragen().filter(function (q) { return kapitel.indexOf(kapitelVonZu(q.zu)) !== -1; }),
      bausteine: bausteineFuer(kapitel)
    };
  }

  function bestand(kapitel) {
    var v = vorratFuer(kapitel);
    return v.kurz.length + v.bausteine.length;
  }

  /* Kurze Checks zuerst, dann Anwendung. Bei kleinem Bestand wird die Runde
     einfach kürzer. */
  function slotsThema(kapitel, fokus) {
    var v = vorratFuer(kapitel);
    var kurz = gewichtet(v.kurz, function (q) { return q.id; });
    var lang = gewichtet(v.bausteine, function (b) { return b.id; }).sort(function (a, b) {
      return (b.uebung ? 1 : 0) - (a.uebung ? 1 : 0);
    });
    var raus = [], gesehen = {};
    function dazu(s) {
      if (gesehen[s.id] || raus.length >= GROESSE) return;
      gesehen[s.id] = true;
      raus.push(s);
    }
    if (fokus) {
      var s = slotZu(fokus);
      if (s) dazu(s);
    }
    kurz.slice(0, KURZE).forEach(function (q) { dazu({ id: q.id, typ: "quiz" }); });
    lang.forEach(function (b) { dazu({ id: b.id, typ: "baustein" }); });
    kurz.forEach(function (q) { dazu({ id: q.id, typ: "quiz" }); });
    return raus;
  }

  function slotZu(id) {
    if (frageZu(id)) return { id: id, typ: "quiz" };
    if (testZu(id)) return { id: id, typ: "test" };
    if (karteZu(id)) return { id: id, typ: "karte" };
    var u = uebung();
    if (u && u.vorrat() && u.baustein(id)) return { id: id, typ: "baustein" };
    return null;
  }

  function slotAusFehler(f) { return slotZu(f.id); }

  /* Fünf Minuten: bis zu zwei fällige Karten, zwei offene Fehler, eine Aufgabe
     zum aktuellen Thema. Was fehlt, füllt das Thema auf; ohne Lernhistorie ist
     das eine kleine Grundrunde. Die Minuten sind eine Schätzung, keine Uhr. */
  function kapitelVonZuletzt() {
    var z = AP.zuletzt ? AP.zuletzt() : null;
    var k = z && kapitelVonZu(z.zu);
    if (k && kapitelInfo(k)) return k;
    var lf = helfer.inhalt().lernfelder[0];
    return lf && lf.kapitel[0] ? lf.id + ":" + lf.kapitel[0].id : null;
  }

  function slotsTagesrunde() {
    var raus = [], gesehen = {};
    function dazu(s) {
      if (!s || gesehen[s.id] || raus.length >= GROESSE) return false;
      gesehen[s.id] = true;
      raus.push(s);
      return true;
    }
    var karten = mischen(helfer.faelligeKarten().slice());
    var fehler = helfer.schwachstellen();
    karten.slice(0, 2).forEach(function (k) { dazu({ id: k.id, typ: "karte" }); });
    fehler.slice(0, 2).forEach(function (f) { dazu(slotAusFehler(f)); });
    var k = kapitelVonZuletzt();
    var thema = k ? slotsThema([k]) : [];
    if (thema.length) dazu(thema[0]);
    karten.forEach(function (x) { dazu({ id: x.id, typ: "karte" }); });
    fehler.forEach(function (f) { dazu(slotAusFehler(f)); });
    thema.forEach(dazu);
    return raus;
  }

  /* ================================================== Einstieg */

  function zurueck() {
    return knopf("kn-neben", "‹ Übersicht", function () { location.hash = "#ueben"; });
  }

  function zeige(s, ansicht, felder) {
    buehne = s;
    var nr = ++lauf;
    s.innerHTML = "";
    var fertig = function () {
      if (nr !== lauf) return;
      s.innerHTML = "";
      if (ansicht === "runde") zeigeRunde(felder || {});
      else zeigeThema(felder || {});
    };
    if (window.APK) window.APK.laden().then(fertig, fertig);
    else fertig();
  }

  function zeigeRunde(felder) {
    if (felder.art === "tages") {
      var offen = laufendeRunde();
      if (offen && offen.art === "tages") { runde = offen; ersetzeAdresse(); return zeichnen(); }
      var slots = slotsTagesrunde();
      if (!slots.length) return meldung("Für heute ist nichts vorbereitet.",
        "Thema üben", "#ueben/thema");
      return neueRunde("tages", "5 Minuten üben", null, slots);
    }
    if (felder.art === "fehler") {
      var liste = helfer.schwachstellen().map(slotAusFehler).filter(Boolean).slice(0, GROESSE);
      if (!liste.length) return meldung("Gerade ist nichts offen.", "Thema üben", "#ueben/thema");
      return neueRunde("fehler", "Fehler nochmal üben", null, liste);
    }
    if (felder.aufgabe) {
      var s = slotZu(felder.aufgabe);
      if (s) return neueRunde("einzeln", "Nochmal üben", null, [s]);
      /* Keine verlässliche Zuordnung: ins richtige Kapitel statt ins Leere. */
      var e = (AP.stand.quiz || {})[felder.aufgabe];
      return meldung("Diese Aufgabe gibt es so nicht mehr.",
        e && e.k ? "Kapitel öffnen" : "Thema üben",
        e && e.k ? e.k.replace(":", ".html#") : "#ueben/thema");
    }
    runde = rundeLaden();
    if (!runde) return zeigeThema({});
    zeichnen();
  }

  function ersetzeAdresse() {
    try { history.replaceState(history.state, "", "#ueben/runde"); } catch (e) {}
  }

  function meldung(text, knopftext, ziel) {
    buehne.innerHTML = "";
    buehne.appendChild(zurueck());
    var k = el("div", "leer");
    k.appendChild(el("p", null, text));
    if (knopftext) {
      k.appendChild(knopf("start", knopftext, function () {
        if (ziel.charAt(0) === "#") location.hash = ziel; else location.href = ziel;
      }));
    }
    buehne.appendChild(k);
  }

  /* ---------------------------------------- Thema wählen */

  function zeigeThema(felder) {
    var inhalt = helfer.inhalt();
    if (wahl.beruf !== inhalt.beruf.kurz) {
      wahl = { beruf: inhalt.beruf.kurz, lernfeld: "", kapitel: "" };
    }
    var hinweis = null;
    if (felder.kapitel) {
      if (kapitelInfo(felder.kapitel)) {
        var t = felder.kapitel.split(":");
        wahl.lernfeld = t[0];
        wahl.kapitel = felder.kapitel;
        var laufend = laufendeRunde();
        if (felder.fokus) return neueRunde("thema", kapitelText(felder.kapitel),
          felder.kapitel, slotsThema([felder.kapitel], felder.fokus));
        if (laufend && laufend.kapitel === felder.kapitel) {
          runde = laufend;
          ersetzeAdresse();
          return zeichnen();
        }
      } else {
        hinweis = fremderBeruf(felder.kapitel);
      }
    }

    buehne.appendChild(zurueck());
    buehne.appendChild(helfer.kopfzeile("Thema üben",
      "Eine kurze Runde zu genau dem, was du gerade lernst.", "Üben"));
    if (hinweis) buehne.appendChild(hinweis);

    var offen = laufendeRunde();
    if (offen) {
      var k = el("div", "pk--hinweis");
      k.appendChild(el("p", null, "Deine Runde „" + offen.titel + "“ läuft noch: Aufgabe "
        + (offen.pos + 1) + " von " + offen.folge.length + "."));
      k.appendChild(knopf("kn-haupt", "Runde fortsetzen", function () {
        runde = offen;
        location.hash = "#ueben/runde";
      }));
      buehne.appendChild(k);
    }

    var form = el("div", "tr-wahl");
    var lfWahl = auswahl("Lernfeld");
    var kapWahl = auswahl("Kapitel");
    form.appendChild(lfWahl.feld);
    form.appendChild(kapWahl.feld);
    buehne.appendChild(form);

    var option = function (sel, wert, text) {
      var o = el("option", null, text);
      o.value = wert;
      sel.appendChild(o);
    };
    option(lfWahl.select, "", "Lernfeld wählen");
    inhalt.lernfelder.forEach(function (lf) {
      option(lfWahl.select, lf.id, lf.kurz + " · " + lf.titel);
    });
    option(lfWahl.select, "alle", "Alle Lernfelder gemischt");
    lfWahl.select.value = wahl.lernfeld;

    var info = el("p", "tr-info");
    info.setAttribute("role", "status");
    var ausweich = el("div");
    var start = knopf("start", "Runde starten", starten);
    buehne.appendChild(info);
    buehne.appendChild(ausweich);
    buehne.appendChild(start);

    function auswahlKapitel() {
      if (wahl.lernfeld === "alle") return [];
      if (wahl.kapitel) return [wahl.kapitel];
      var lf = inhalt.lernfelder.filter(function (x) { return x.id === wahl.lernfeld; })[0];
      return lf ? lf.kapitel.map(function (k2) { return lf.id + ":" + k2.id; }) : [];
    }

    function kapitelOptionen() {
      kapWahl.select.innerHTML = "";
      var lf = inhalt.lernfelder.filter(function (x) { return x.id === wahl.lernfeld; })[0];
      kapWahl.feld.hidden = !lf;
      if (!lf) return;
      option(kapWahl.select, "", "Ganzes Lernfeld");
      lf.kapitel.forEach(function (k2) {
        option(kapWahl.select, lf.id + ":" + k2.id, "K" + k2.nummer + " · " + k2.titel);
      });
      kapWahl.select.value = wahl.kapitel;
    }

    function auffrischen() {
      ausweich.innerHTML = "";
      if (wahl.lernfeld === "alle") {
        info.textContent = inhalt.quiz.length + " Fragen aus allen Lernfeldern, ohne feste Länge.";
        start.textContent = "Gemischte Fragen öffnen";
        start.disabled = false;
        return;
      }
      start.textContent = "Runde starten";
      var kap = auswahlKapitel();
      if (!kap.length) {
        info.textContent = "Wähle ein Lernfeld.";
        start.disabled = true;
        return;
      }
      var n = bestand(kap);
      start.disabled = !n;
      if (n) {
        var groesse = Math.min(n, GROESSE);
        info.textContent = groesse === 1 ? "1 Aufgabe" : (n > GROESSE ? "Bis zu " : "") + groesse
          + " Aufgaben aus " + n + " verfügbaren.";
      } else {
        info.textContent = "Zu dieser Auswahl gibt es noch keine Aufgaben.";
        alternativen(ausweich);
      }
    }

    function alternativen(ziel) {
      var liste = el("ul", "liste-schlicht"), n = 0;
      inhalt.lernfelder.forEach(function (lf) {
        lf.kapitel.forEach(function (k2) {
          var s = lf.id + ":" + k2.id;
          if (n >= 3 || !bestand([s])) return;
          n++;
          var li = el("li");
          var a = el("a", "reihe");
          a.href = "#ueben/thema?kapitel=" + encodeURIComponent(s);
          a.appendChild(el("div", "reihe-titel", kapitelText(s)));
          li.appendChild(a);
          liste.appendChild(li);
        });
      });
      if (n) {
        ziel.appendChild(el("p", "tr-info", "Damit kannst du stattdessen üben:"));
        ziel.appendChild(liste);
      }
    }

    function starten() {
      if (wahl.lernfeld === "alle") { location.hash = "#ueben/quiz"; return; }
      var kap = auswahlKapitel();
      var slots = slotsThema(kap);
      if (!slots.length) return;
      neueRunde("thema", wahl.kapitel ? kapitelText(wahl.kapitel) : lernfeldText(), wahl.kapitel || null, slots);
    }

    function lernfeldText() {
      var lf = inhalt.lernfelder.filter(function (x) { return x.id === wahl.lernfeld; })[0];
      return lf ? lf.kurz + " · " + lf.titel : "Thema üben";
    }

    lfWahl.select.addEventListener("change", function () {
      wahl.lernfeld = lfWahl.select.value;
      wahl.kapitel = "";
      kapitelOptionen();
      auffrischen();
    });
    kapWahl.select.addEventListener("change", function () {
      wahl.kapitel = kapWahl.select.value;
      auffrischen();
    });
    kapitelOptionen();
    auffrischen();
  }

  function auswahl(name) {
    var feld = el("label", "tr-feld");
    feld.appendChild(el("span", null, name));
    var select = el("select");
    feld.appendChild(select);
    return { feld: feld, select: select };
  }

  /* Ein Kapitel des anderen Berufs: sagen, was los ist, und fragen. Der Beruf
     wird nie still umgestellt. */
  function fremderBeruf(schluessel) {
    var k = el("div", "pk--hinweis");
    k.setAttribute("role", "status");
    var alles = helfer.alles();
    var lfId = String(schluessel).split(":")[0];
    var treffer = (alles.lernfelder || []).filter(function (lf) { return lf.id === lfId; })[0];
    var aktiv = helfer.inhalt().beruf;
    if (treffer && (treffer.beruf || "kfb") !== aktiv.kurz) {
      var info = (alles.berufe || []).filter(function (b) { return b.kurz === treffer.beruf; })[0];
      var name = info ? info.kurzname : "dem anderen Ausbildungsgang";
      k.appendChild(el("p", null, "Dieses Kapitel gehört zu " + name + ". Du übst gerade "
        + aktiv.kurzname + "."));
      k.appendChild(knopf("kn-haupt", "Zu " + name + " wechseln", function () {
        helfer.berufWechseln(treffer.beruf);
        zeige(buehne, "thema", { kapitel: schluessel });
      }));
      return k;
    }
    k.appendChild(el("p", null, "Dieses Kapitel haben wir nicht gefunden. Wähle unten ein Thema."));
    return k;
  }

  /* ================================================== Eine Aufgabe */

  function zeichnen() {
    if (!runde || !buehne) return;
    buehne.innerHTML = "";
    if (runde.fertig || runde.pos >= runde.folge.length) return ergebnisZeichnen();
    var slot = runde.folge[runde.pos];
    var inhaltDa = aufgabeBauen(slot);
    if (!inhaltDa) {
      /* Eine Aufgabe, die es nicht mehr gibt, hält die Runde nicht auf. */
      runde.folge.splice(runde.pos, 1);
      ablegen();
      return zeichnen();
    }
    window.scrollTo(0, 0);
  }

  function positionskopf() {
    buehne.appendChild(zurueck());
    buehne.appendChild(helfer.kopfzeile(runde.titel, null, "Übungsrunde"));
    var p = el("p", "tr-position", "Aufgabe " + (runde.pos + 1) + " von " + runde.folge.length);
    buehne.appendChild(p);
  }

  function aufgabeBauen(slot) {
    if (slot.typ === "quiz") {
      var q = frageZu(slot.id);
      if (!q) return false;
      positionskopf();
      if (q.art === "check") aufgabeCheck(slot, q);
      else aufgabeZuordnen(slot, q);
      return true;
    }
    if (slot.typ === "karte") {
      var k = karteZu(slot.id);
      if (!k) return false;
      positionskopf();
      aufgabeKarte(slot, k);
      return true;
    }
    if (slot.typ === "test") {
      var t = testZu(slot.id);
      if (!t) return false;
      positionskopf();
      aufgabeTest(slot, t);
      return true;
    }
    var u = uebung();
    var roh = u && u.baustein(slot.id);
    if (!roh) return false;
    try {
      if (!slot.werte[slot.id]) slot.werte[slot.id] = u.werteZiehen(roh, slot.seed);
    } catch (e) { return false; }
    positionskopf();
    aufgabeBaustein(slot, roh);
    return true;
  }

  /* Ein Versuch steht fest. Im zweiten Tab derselben Runde kann er schon
     geprüft sein: Dann gilt jener Stand, und nichts wird doppelt gezählt. */
  function schonEntschieden() {
    var frisch = rundeLaden();
    if (frisch && frisch.id === runde.id && frisch.folge[runde.pos] &&
        frisch.folge[runde.pos].geprueft && !runde.folge[runde.pos].geprueft) {
      runde = frisch;
      zeichnen();
      return true;
    }
    return runde.folge[runde.pos].geprueft;
  }

  function versuch(slot, status, zusatz) {
    slot.geprueft = true;
    slot.status = status;
    if (slot.typ !== "karte") {
      AP.versuchMerken(slot.id, status, runde.id + ":" + slot.seed, zusatz || null);
    }
    ablegen();
    zeichnen();
  }

  function kasten(q) {
    var k = el("div", "check tr-aufgabe");
    if (q.lernfeldTitel) k.appendChild(el("div", "check-kopf", q.lernfeldTitel));
    return k;
  }

  function lernlink(eintrag, text) {
    var zu = eintrag.zu;
    if (!zu) return null;
    if (eintrag.abschnitt) {
      var t = zu.split("#");
      zu = t[0] + "?ansicht=ausfuehrlich#" + t[1] + "-" + eintrag.abschnitt;
    }
    var a = el("a", "kn-neben");
    a.href = zu;
    a.textContent = text || "Abschnitt nachlesen";
    return a;
  }

  function steuerung() {
    var r = el("div", "knopfreihe tr-steuer");
    return r;
  }

  function weiterReihe(eintrag) {
    var r = steuerung();
    var letzte = runde.pos >= runde.folge.length - 1;
    var w = knopf("kn-haupt", letzte ? "Zum Ergebnis" : "Weiter", function () {
      runde.pos++;
      if (runde.pos >= runde.folge.length) runde.fertig = true;
      ablegen();
      zeichnen();
    });
    r.appendChild(w);
    var hin = eintrag && lernlink(eintrag);
    if (hin) r.appendChild(hin);
    return { reihe: r, fokus: w };
  }

  function echoZeile(slot) {
    var p = el("p", "tr-status tr-status-" + slot.status, STATUS[slot.status] || "");
    p.setAttribute("role", "status");
    return p;
  }

  /* ---------------------------------------- Check */

  function aufgabeCheck(slot, q) {
    var k = kasten(q);
    k.appendChild(mkEl("p", "check-frage", q.frage));
    var opts = el("div", "optionen");
    opts.setAttribute("role", "group");
    opts.setAttribute("aria-label", "Antwortmöglichkeiten");
    if (!slot.reihe) { slot.reihe = mischen(q.optionen.map(function (_, i) { return i; })); }
    var pruefen = knopf("kn-haupt", "Antwort prüfen", function () {
      if (schonEntschieden()) return;
      var o = q.optionen[slot.gewaehlt];
      if (!o) return;
      versuch(slot, o.richtig ? "selbst" : "offen");
    });
    pruefen.disabled = slot.gewaehlt == null;

    slot.reihe.forEach(function (i) {
      var o = q.optionen[i];
      if (!o) return;
      var b = el("button", "opt");
      b.type = "button";
      b.innerHTML = AP.mk(o.text);
      var gewaehlt = slot.gewaehlt === i;
      b.setAttribute("aria-pressed", gewaehlt ? "true" : "false");
      if (gewaehlt) b.classList.add("gewaehlt");
      if (slot.geprueft) {
        b.disabled = true;
        if (o.richtig) b.classList.add("richtig");
        else if (gewaehlt) b.classList.add("falsch");
      } else {
        b.addEventListener("click", function () {
          slot.gewaehlt = i;
          ablegen();
          opts.querySelectorAll(".opt").forEach(function (x) {
            x.classList.remove("gewaehlt");
            x.setAttribute("aria-pressed", "false");
          });
          b.classList.add("gewaehlt");
          b.setAttribute("aria-pressed", "true");
          pruefen.disabled = false;
        });
      }
      opts.appendChild(b);
    });
    k.appendChild(opts);

    if (slot.geprueft) {
      k.appendChild(echoZeile(slot));
      var o = q.optionen[slot.gewaehlt];
      if (o && o.echo) k.appendChild(mkEl("p", "check-echo da", o.echo));
      var w = weiterReihe(q);
      k.appendChild(w.reihe);
      buehne.appendChild(k);
      w.fokus.focus({ preventScroll: true });
      return;
    }
    var r = steuerung();
    r.appendChild(pruefen);
    r.appendChild(knopf("kn-neben", "Lösung ansehen", function () {
      if (!schonEntschieden()) versuch(slot, "loesung");
    }));
    k.appendChild(r);
    buehne.appendChild(k);
  }

  /* ---------------------------------------- Zuordnung */

  function aufgabeZuordnen(slot, q) {
    var k = kasten(q);
    k.appendChild(mkEl("p", "check-frage", q.frage));
    if (!slot.zuordnung) slot.zuordnung = {};
    var pruefen = knopf("kn-haupt", "Antwort prüfen", function () {
      if (schonEntschieden()) return;
      var alle = q.aufgaben.every(function (a, i) { return a.loesung === slot.zuordnung[i]; });
      versuch(slot, alle ? "selbst" : "offen");
    });
    function bereit() {
      pruefen.disabled = q.aufgaben.some(function (_, i) { return slot.zuordnung[i] == null; });
    }
    q.aufgaben.forEach(function (a, i) {
      var r = el("div", "zu-reihe");
      r.appendChild(mkEl("span", "zu-text", a.text));
      var kn = el("span", "zu-knoepfe");
      kn.setAttribute("role", "group");
      kn.setAttribute("aria-label", nurText(a.text));
      q.kategorien.forEach(function (kat) {
        var b = el("button", "zu-btn", kat);
        b.type = "button";
        var an = slot.zuordnung[i] === kat;
        b.setAttribute("aria-pressed", an ? "true" : "false");
        if (an) b.classList.add("gewaehlt");
        if (slot.geprueft) {
          b.disabled = true;
          if (kat === a.loesung) b.classList.add("richtig");
          else if (an) b.classList.add("falsch");
        } else {
          b.addEventListener("click", function () {
            slot.zuordnung[i] = kat;
            ablegen();
            kn.querySelectorAll(".zu-btn").forEach(function (x) {
              var hier = x === b;
              x.classList.toggle("gewaehlt", hier);
              x.setAttribute("aria-pressed", hier ? "true" : "false");
            });
            bereit();
          });
        }
        kn.appendChild(b);
      });
      r.appendChild(kn);
      k.appendChild(r);
    });
    if (slot.geprueft) {
      k.appendChild(echoZeile(slot));
      var w = weiterReihe(q);
      k.appendChild(w.reihe);
      buehne.appendChild(k);
      w.fokus.focus({ preventScroll: true });
      return;
    }
    bereit();
    var st = steuerung();
    st.appendChild(pruefen);
    st.appendChild(knopf("kn-neben", "Lösung ansehen", function () {
      if (!schonEntschieden()) versuch(slot, "loesung");
    }));
    k.appendChild(st);
    buehne.appendChild(k);
  }

  /* ---------------------------------------- Karte und Selbsttest */

  function aufgabeKarte(slot, karte) {
    var k = kasten(karte);
    k.appendChild(mkEl("p", "check-frage", karte.frage));
    if (slot.geprueft || slot.offenGelegt) {
      k.appendChild(mkEl("p", "check-echo da", karte.antwort));
    }
    if (slot.geprueft) {
      k.appendChild(echoZeile(slot));
      var w = weiterReihe(karte);
      k.appendChild(w.reihe);
      buehne.appendChild(k);
      w.fokus.focus({ preventScroll: true });
      return;
    }
    var r = steuerung();
    if (slot.offenGelegt) {
      function werten(gewusst) {
        if (schonEntschieden()) return;
        AP.kartewerten(slot.id, gewusst);
        versuch(slot, gewusst ? "selbst" : "offen");
      }
      r.appendChild(knopf("kn-haupt", "Wusste ich", function () { werten(true); }));
      r.appendChild(knopf("kn-neben", "Nochmal", function () { werten(false); }));
    } else {
      r.appendChild(knopf("kn-haupt", "Antwort zeigen", function () {
        slot.offenGelegt = true;
        ablegen();
        zeichnen();
      }));
    }
    k.appendChild(r);
    buehne.appendChild(k);
  }

  function aufgabeTest(slot, t) {
    var k = kasten(t);
    k.appendChild(el("p", "tr-info", "Selbsttest: Erkläre es dir selbst, dann schätz dich ehrlich ein."));
    k.appendChild(mkEl("p", "check-frage", t.frage));
    if (slot.geprueft) {
      k.appendChild(echoZeile(slot));
      var w = weiterReihe(t);
      k.appendChild(w.reihe);
      buehne.appendChild(k);
      w.fokus.focus({ preventScroll: true });
      return;
    }
    var r = steuerung();
    r.appendChild(knopf("kn-haupt", "Kann ich erklären", function () {
      if (!schonEntschieden()) versuch(slot, "selbst");
    }));
    r.appendChild(knopf("kn-neben", "Noch unsicher", function () {
      if (!schonEntschieden()) versuch(slot, "offen");
    }));
    k.appendChild(r);
    buehne.appendChild(k);
  }

  /* ---------------------------------------- Baustein */

  function bausteinZusatz(roh) {
    return { k: uebung().kapitelSchluessel(roh), b: roh.beruf || "kfb",
             l: (roh.uebung && roh.uebung.kompetenz) || kapitelText(uebung().kapitelSchluessel(roh)) };
  }

  function eintragVon(roh) {
    return { zu: roh.lernfeld + ".html#" + roh.kapitel, abschnitt: roh.abschnitt };
  }

  function aufgabeBaustein(slot, roh) {
    var u = uebung();
    var st = { antworten: slot.antworten, werte: slot.werte, selbst: slot.selbst,
               gesperrt: slot.geprueft, sichern: ablegen };
    var b = u.nebenstand(roh, st);
    var k = el("article", "pk--bogen tr-aufgabe");
    k.appendChild(el("p", "pk--aufgabenmeta", "ca. " + roh.dauer_min + " Min."));
    var felder = u.ansicht(b, k);
    var werte = slot.werte[slot.id] || {};
    var ue = roh.uebung || {};
    var istSelbst = roh.bewertung.art === "selbstbewertung";

    var hinweise = ue.hinweise || [];
    var hinweisBox = el("div", "tr-hinweise");
    hinweisBox.setAttribute("aria-live", "polite");
    hinweise.slice(0, slot.hinweise).forEach(function (h, i) {
      var p = mkEl("p", "tr-hinweis", u.fuellen(h, werte));
      p.insertBefore(el("b", null, (i === 0 ? "Denkanstoß" : "Zwischenschritt") + ": "), p.firstChild);
      hinweisBox.appendChild(p);
    });
    k.appendChild(hinweisBox);

    function erledigteAnsicht() {
      felder.querySelectorAll("input,textarea,select,button").forEach(function (x) { x.disabled = true; });
      var box = el("div", "tr-feedback");
      box.appendChild(echoZeile(slot));
      if (!istSelbst || slot.gezeigt) {
        var e = u.bewerte(b);
        if (!istSelbst) {
          box.appendChild(el("p", "tr-punkte", String(e.punkte).replace(".", ",") + " von "
            + e.moeglich + " Punkten"));
        }
      }
      if (istSelbst) u.raster(b, box);
      else u.loesung(b, box);
      roh.eingabe.forEach(function (blk) {
        (blk.elemente || []).forEach(function (x) {
          if (x.warum) box.appendChild(mkEl("p", "tr-warum", x.text + ": " + x.warum));
        });
      });
      if (roh.erklaerung) box.appendChild(mkEl("p", "pk--erklaerung", u.fuellen(roh.erklaerung, werte)));
      (ue.schritte || []).forEach(function (t) {
        box.appendChild(mkEl("p", "pk--erklaerung", u.fuellen(t, werte)));
      });
      if (ue.typischer_fehler) {
        var f = mkEl("p", "tr-hinweis", u.fuellen(ue.typischer_fehler, werte));
        f.insertBefore(el("b", null, "Typischer Fehler: "), f.firstChild);
        box.appendChild(f);
      }
      return box;
    }

    if (slot.geprueft) {
      k.appendChild(erledigteAnsicht());
      var w = weiterReihe(eintragVon(roh));
      k.appendChild(w.reihe);
      buehne.appendChild(k);
      w.fokus.focus({ preventScroll: true });
      return;
    }

    if (slot.vergleich) {
      /* Offene Antwort: erst vergleichen, dann ehrlich einschätzen. */
      st.gesperrt = true;
      felder.querySelectorAll("input,textarea,select,button").forEach(function (x) { x.disabled = true; });
      var box = el("div", "tr-feedback");
      u.raster(b, box);
      k.appendChild(box);
      var r2 = steuerung();
      r2.appendChild(knopf("kn-haupt", "Bewertung übernehmen", function () {
        if (schonEntschieden()) return;
        var e = u.bewerte(b);
        var gut = e.punkte >= e.moeglich * 0.75;
        versuch(slot, gut ? (slot.hinweise ? "hilfe" : "selbst") : "offen", bausteinZusatz(roh));
      }));
      k.appendChild(r2);
      buehne.appendChild(k);
      return;
    }

    var r = steuerung();
    var pruefen = knopf("kn-haupt", istSelbst ? "Mit Musterlösung vergleichen" : "Antwort prüfen", function () {
      if (schonEntschieden()) return;
      if (u.bearbeitung(b) === "offen") {
        melde.textContent = "Trag erst deinen eigenen Versuch ein.";
        return;
      }
      if (istSelbst) { slot.vergleich = true; ablegen(); return zeichnen(); }
      var e = u.bewerte(b);
      var richtig = e.punkte >= e.moeglich - 1e-9;
      versuch(slot, richtig ? (slot.hinweise ? "hilfe" : "selbst") : "offen", bausteinZusatz(roh));
    });
    r.appendChild(pruefen);
    if (slot.hinweise < hinweise.length) {
      r.appendChild(knopf("kn-neben", slot.hinweise ? "Zwischenschritt zeigen" : "Hinweis zeigen", function () {
        slot.hinweise++;
        ablegen();
        zeichnen();
      }));
    }
    r.appendChild(knopf("kn-neben", "Lösung ansehen", function () {
      if (schonEntschieden()) return;
      slot.gezeigt = true;
      versuch(slot, "loesung", bausteinZusatz(roh));
    }));
    k.appendChild(r);
    var melde = el("p", "tr-info");
    melde.setAttribute("role", "status");
    k.appendChild(melde);
    buehne.appendChild(k);
  }

  /* ================================================== Ergebnis */

  function wiederholung(slot) {
    if (slot.typ !== "baustein" || !uebung()) return null;
    var roh = uebung().baustein(slot.id);
    if (!roh) return null;
    if (roh.uebung && roh.uebung.zweitfall) {
      return { text: "Zweiten Fall lösen", id: roh.uebung.zweitfall };
    }
    return { text: roh.variablen ? "Neue Werte üben" : "Aufgabe erneut lösen", id: slot.id };
  }

  function titelVon(slot) {
    if (slot.typ === "quiz") { var q = frageZu(slot.id); return q ? nurText(q.frage) : slot.id; }
    if (slot.typ === "karte") { var k = karteZu(slot.id); return k ? nurText(k.frage) : slot.id; }
    if (slot.typ === "test") { var t = testZu(slot.id); return t ? nurText(t.frage) : slot.id; }
    var roh = uebung() && uebung().baustein(slot.id);
    return roh ? (roh.uebung && roh.uebung.kompetenz) || roh.operator : slot.id;
  }

  function ergebnisZeichnen() {
    runde.fertig = true;
    ablegen();
    buehne.appendChild(zurueck());
    buehne.appendChild(helfer.kopfzeile("Runde geschafft", null, runde.titel));
    var zahl = { selbst: 0, hilfe: 0, offen: 0, loesung: 0 };
    runde.folge.forEach(function (s) { if (s.status) zahl[s.status]++; });
    var werte = el("ul", "tr-zahlen");
    Object.keys(STATUS).forEach(function (s) {
      var li = el("li");
      li.appendChild(el("b", null, String(zahl[s])));
      li.appendChild(el("span", null, STATUS[s]));
      werte.appendChild(li);
    });
    buehne.appendChild(werte);

    var liste = el("ul", "liste-schlicht");
    runde.folge.forEach(function (s, i) {
      var li = el("li", "tr-ergebnis");
      li.appendChild(el("div", "reihe-titel", titelVon(s)));
      li.appendChild(el("div", "reihe-quelle", STATUS[s.status] || "nicht bearbeitet"));
      var w = wiederholung(s);
      if (w && s.status !== "selbst") {
        li.appendChild(knopf("kn-neben", w.text, function () {
          neueRunde("einzeln", "Nochmal üben", runde.kapitel, [slotZu(w.id)].filter(Boolean));
        }));
      } else if (w && w.text === "Zweiten Fall lösen") {
        li.appendChild(knopf("kn-neben", w.text, function () {
          neueRunde("einzeln", "Zweiter Fall", runde.kapitel, [slotZu(w.id)].filter(Boolean));
        }));
      }
      liste.appendChild(li);
    });
    buehne.appendChild(liste);

    var reihe = el("div", "knopfreihe");
    var offene = runde.folge.filter(function (s) { return s.status !== "selbst"; });
    if (offene.length) {
      var kopfOffen = knopf("kn-haupt", "Fehler nochmal üben", function () {
        neueRunde("fehler", "Fehler nochmal üben", runde.kapitel,
          offene.map(function (s) { return { id: s.id, typ: s.typ }; }));
      });
      reihe.appendChild(kopfOffen);
    } else if (runde.kapitel) {
      var kap = runde.kapitel;
      reihe.appendChild(knopf("kn-haupt", "Neue Runde", function () {
        var titel = runde.titel;
        neueRunde("thema", titel, kap, slotsThema([kap]));
      }));
    }
    var quelle = offene[0] || runde.folge[0];
    var eintrag = quelle && eintragZuSlot(quelle);
    var hin = eintrag && lernlink(eintrag);
    if (hin) reihe.appendChild(hin);
    var pk = window.APK && uebung();
    if (pk && runde.kapitel) {
      var a = el("a", "kn-neben");
      a.href = "#ueben/probeklausur?kapitel=" + encodeURIComponent(runde.kapitel);
      a.textContent = "Zur Probeklausur";
      reihe.appendChild(a);
    }
    buehne.appendChild(reihe);
  }

  function eintragZuSlot(s) {
    if (s.typ === "quiz") return frageZu(s.id);
    if (s.typ === "karte") return karteZu(s.id);
    if (s.typ === "test") return testZu(s.id);
    var roh = uebung() && uebung().baustein(s.id);
    return roh ? eintragVon(roh) : null;
  }

  /* ================================================== Dienste */

  function init(h) {
    helfer = h;
    /* Ein anderes Konto bekommt keine Runde des vorherigen: Sie kann eingegebene
       Antworten enthalten. */
    if (AP.beiKontowechsel) {
      AP.beiKontowechsel(function () {
        ["kfb", "ik"].forEach(function (b) {
          try { localStorage.removeItem(AP.rundenSchluessel(b)); } catch (e) {}
        });
        runde = null;
      });
    }
  }

  return {
    init: init, zeige: zeige, laufendeRunde: laufendeRunde,
    pruefstand: { slotsTagesrunde: slotsTagesrunde, slotsThema: slotsThema, bestand: bestand }
  };
})();
