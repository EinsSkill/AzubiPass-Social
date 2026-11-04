/* AzubiPass · Eigene Probeklausur
   ---------------------------------------------------------------------------
   Der Nutzer wählt die Kapitel seiner nächsten Klassenarbeit, AzubiPass stellt
   daraus örtlich eine Probeklausur zusammen. Keine amtliche IHK-Simulation,
   keine KI: Der „Generator" ist ein regelbasierter Zusammensteller.

   Warum eine eigene Datei und kein Anbau an app.js: Das hier ist ein
   geschlossener Gegenstand — Rechner, Zusammensteller, Renderer, Bewertung und
   Oberfläche einer Prüfung. In app.js stünde es als Fremdkörper, der die fünf
   Schirme dort auf das Doppelte bringt.

   Alles hängt an window.APK. app.js ruft genau eine Sache auf: APK.zeige().    */

window.APK = (function () {
  "use strict";

  var AP = window.AP;
  var el = AP.el, mkEl = AP.mkEl;

  var SCHLUESSEL = AP.PROBEKLAUSUR_SCHLUESSEL || "azubipass:probeklausur:v1";
  /* Fassung 4: Jeder Beruf hat seinen eigenen laufenden Bogen. Büromanagement
     behält den alten Schlüssel. Ein Bogen merkt sich seinen Beruf und wird
     immer unter dessen Schlüssel geschrieben – auch wenn inzwischen in einem
     anderen Bildschirm der Beruf gewechselt wurde. */
  function aktiverBeruf() { return AP.beruf ? AP.beruf() : "kfb"; }
  function schluesselFuer(b) {
    return AP.probeklausurSchluessel ? AP.probeklausurSchluessel(b) : SCHLUESSEL;
  }
  var FASSUNG = 1;

  var DAUERN = [30, 45, 60, 90];
  var DAUER_STANDARD = 60;
  var EIGEN_MIN = 15, EIGEN_MAX = 180, EIGEN_SCHRITT = 5;

  var vorrat = null;          // mittel/aufgaben.json
  var laedt = null;
  var ersterBlick = true;     // siehe laeuft()

  /* ================================================== Kleinkram */

  function zahlText(n) {
    return Number(n).toLocaleString("de-DE",
      { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  /* Punkte sehen ohne Nachkommastelle ruhiger aus — halbe gibt es aber, sobald
     ein Buchungssatz nur zur Hälfte stimmt. Also nur zeigen, was da ist. */
  function punkteText(n) {
    var g = Math.round(n * 10) / 10;
    return (Number.isInteger(g) ? String(g) : g.toFixed(1).replace(".", ","));
  }

  /* Klausurdauern nennt man in Minuten — „90 Min." liest sich in einer Prüfung
     richtiger als „1,5 Std.". */
  function minutenText(m) {
    return m + " Min.";
  }

  /* Eine getippte Zahl lesen.

     Am deutschen Handy kommt „1.234,56", auf einer Rechnertastatur „1234.56".
     Beide müssen gehen. Steht nur ein Punkt drin, ist er mehrdeutig: „1.500"
     meint im Rechnungswesen tausendfünfhundert, „1.5" anderthalb. Entschieden
     wird an der Gruppenlänge — drei Ziffern hinter dem letzten Punkt und
     Ziffern davor heißt Tausendertrennung. */
  function zahlLesen(roh) {
    var s = String(roh == null ? "" : roh).trim()
      .replace(/\s/g, "").replace(/€/g, "");
    if (!s) return null;
    if (s.indexOf(",") !== -1) {
      s = s.replace(/\./g, "").replace(",", ".");
    } else {
      var teile = s.split(".");
      if (teile.length > 2 || (teile.length === 2 && teile[1].length === 3 && teile[0].length)) {
        s = teile.join("");
      }
    }
    if (!/^-?\d*\.?\d*$/.test(s)) return null;
    var n = parseFloat(s);
    return isNaN(n) ? null : n;
  }

  function knopf(klasse, text, beiKlick) {
    var b = el("button", klasse, text);
    b.type = "button";
    if (beiKlick) b.addEventListener("click", beiKlick);
    return b;
  }

  /* ================================================== Formelrechner

     Die Aufgaben rechnen: „ak - kumuliert", „runde(ak / nutzungsdauer, 2)",
     „saldo > 5000". Das mit new Function auszuwerten wäre drei Zeilen kurz und
     eine offene Tür: Was in einer Aufgabendatei steht, liefe dann als
     JavaScript im Browser des Nutzers.

     Deshalb ein eigener, winziger Rechner. Er kennt Zahlen, die Variablen der
     Aufgabe, sieben Rechenzeichen, Vergleiche und sechs Funktionen — sonst
     nichts. Alles andere ist ein Fehler, und zwar ein lauter.

     abrunden und aufrunden gibt es, weil manche Ergebnisse nur als ganze Zahl
     einen Sinn ergeben: Eine Break-Even-Menge von 342,86 Stück kann niemand
     verkaufen.                                                                 */

  var FUNKTIONEN = {
    runde: function (x, n) {
      var f = Math.pow(10, n === undefined ? 0 : n);
      return Math.round((x + Number.EPSILON) * f) / f;
    },
    abrunden: Math.floor,
    aufrunden: Math.ceil,
    min: Math.min,
    max: Math.max,
    abs: Math.abs
  };

  var MARKEN = /\s*(\d+\.?\d*|[A-Za-z_][A-Za-z0-9_]*|>=|<=|==|!=|&&|\|\||[-+*/(),<>])/g;

  function zerlegen(quelle) {
    var marken = [], pos = 0, m;
    MARKEN.lastIndex = 0;
    while ((m = MARKEN.exec(quelle)) !== null) {
      if (m.index !== pos) break;
      marken.push(m[1]);
      pos = MARKEN.lastIndex;
    }
    if (pos !== quelle.length) {
      throw new Error("Unverständlicher Ausdruck ab Zeichen " + (pos + 1) + ": " + quelle);
    }
    return marken;
  }

  function rechne(ausdruck, werte) {
    var marken = zerlegen(String(ausdruck)), i = 0;

    function schau() { return marken[i]; }
    function nimm(erwartet) {
      var t = marken[i++];
      if (erwartet && t !== erwartet) {
        throw new Error("„" + erwartet + "“ erwartet, „" + t + "“ gefunden");
      }
      return t;
    }

    function oder() {
      var l = und();
      while (schau() === "||") { nimm(); l = (und() || l); }
      return l;
    }
    function und() {
      var l = vergleich();
      while (schau() === "&&") { nimm(); var r = vergleich(); l = (l && r); }
      return l;
    }
    function vergleich() {
      var l = summe();
      var op = schau();
      if (op === ">" || op === "<" || op === ">=" || op === "<=" ||
          op === "==" || op === "!=") {
        nimm();
        var r = summe();
        if (op === ">") return l > r;
        if (op === "<") return l < r;
        if (op === ">=") return l >= r;
        if (op === "<=") return l <= r;
        if (op === "==") return Math.abs(l - r) < 1e-9;
        return Math.abs(l - r) >= 1e-9;
      }
      return l;
    }
    function summe() {
      var l = produkt();
      while (schau() === "+" || schau() === "-") {
        var op = nimm();
        var r = produkt();
        l = op === "+" ? l + r : l - r;
      }
      return l;
    }
    function produkt() {
      var l = vorzeichen();
      while (schau() === "*" || schau() === "/") {
        var op = nimm();
        var r = vorzeichen();
        if (op === "/" && r === 0) throw new Error("Teilung durch null: " + ausdruck);
        l = op === "*" ? l * r : l / r;
      }
      return l;
    }
    function vorzeichen() {
      if (schau() === "-") { nimm(); return -vorzeichen(); }
      if (schau() === "+") { nimm(); return vorzeichen(); }
      return wert();
    }
    function wert() {
      var t = schau();
      if (t === undefined) throw new Error("Ausdruck bricht ab: " + ausdruck);
      if (t === "(") { nimm(); var w = oder(); nimm(")"); return w; }
      if (/^\d/.test(t)) { nimm(); return parseFloat(t); }
      if (/^[A-Za-z_]/.test(t)) {
        nimm();
        if (schau() === "(") {
          if (!Object.prototype.hasOwnProperty.call(FUNKTIONEN, t)) {
            throw new Error("Unbekannte Funktion: " + t);
          }
          nimm("(");
          var args = [];
          if (schau() !== ")") {
            args.push(oder());
            while (schau() === ",") { nimm(); args.push(oder()); }
          }
          nimm(")");
          return FUNKTIONEN[t].apply(null, args);
        }
        if (!werte || !Object.prototype.hasOwnProperty.call(werte, t)) {
          throw new Error("Unbekannte Größe: " + t);
        }
        return werte[t];
      }
      throw new Error("Unerwartetes Zeichen „" + t + "“ in: " + ausdruck);
    }

    var ergebnis = oder();
    if (i !== marken.length) throw new Error("Rest nach dem Ausdruck: " + ausdruck);
    return ergebnis;
  }

  /* ================================================== Zufall mit Gedächtnis

     Ein Seed, eine Klausur. Ohne das wäre „dieselbe Klausur noch einmal" nicht
     möglich und ein Neuladen mitten in der Bearbeitung würde alle Zahlen
     austauschen.                                                              */

  function saat(text) {
    var h = 2166136261;
    text = String(text);
    for (var i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function wuerfel(seed) {
    var a = saat(seed) || 1;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function neuerSeed() {
    return Date.now().toString(36) + "-" +
      Math.floor(Math.random() * 1679616).toString(36);
  }

  /* ================================================== Werte ziehen */

  var VERSUCHE = 240;

  function werteZiehen(b, seed) {
    if (!b.variablen) return {};
    for (var runde = 0; runde < VERSUCHE; runde++) {
      var w = {}, r = wuerfel(seed + "#" + b.id + "#" + runde), name;
      for (name in b.variablen) {
        if (!Object.prototype.hasOwnProperty.call(b.variablen, name)) continue;
        var v = b.variablen[name];
        if (typeof v === "number") { w[name] = v; continue; }
        if (v.fest !== undefined) { w[name] = v.fest; continue; }
        var schritt = v.schritt || 1;
        var stufen = Math.floor((v.bis - v.von) / schritt) + 1;
        w[name] = v.von + Math.floor(r() * stufen) * schritt;
        // Gleitkommareste bei Schrittweiten wie 0,5 wegputzen
        w[name] = Math.round(w[name] * 1e6) / 1e6;
      }
      for (name in (b.abgeleitet || {})) {
        if (!Object.prototype.hasOwnProperty.call(b.abgeleitet, name)) continue;
        w[name] = rechne(b.abgeleitet[name], w);
      }
      if (!b.pruefung_variablen || rechne(b.pruefung_variablen, w) === true) {
        return w;
      }
    }
    throw new Error("Baustein " + b.id + ": pruefung_variablen ist in " +
                    VERSUCHE + " Ziehungen nie erfüllt worden.");
  }

  /* ================================================== Kontenplan

     Die Aufgabendateien nennen Konten mal als Nummer („2800"), mal als
     Bezeichnung („Bank"). Beides muss auf dasselbe Konto zeigen — und zwar
     innen. Angezeigt wird immer die Bezeichnung; die Nummer steht daneben,
     weil Buchungssätze im Unterricht über Nummern laufen.                     */

  var kontenIndex = null;

  function schluessel(s) {
    return String(s || "").toLowerCase()
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/[^a-z0-9]/g, "");
  }

  function kontenAufbauen() {
    kontenIndex = { nach: {}, liste: [] };
    (vorrat && vorrat.kontenplan ? vorrat.kontenplan : []).forEach(function (k) {
      var eintrag = { nr: k.nr, name: k.name, klasse: k.klasse, alias: k.alias || [] };
      kontenIndex.liste.push(eintrag);
      kontenIndex.nach[k.nr] = eintrag;
      kontenIndex.nach[schluessel(k.name)] = eintrag;
      (k.alias || []).forEach(function (a) { kontenIndex.nach[schluessel(a)] = eintrag; });
    });
  }

  function konto(bezeichner) {
    if (!kontenIndex) kontenAufbauen();
    if (bezeichner == null || bezeichner === "") return null;
    var roh = String(bezeichner).trim();
    // „2800 — Guthaben bei Kreditinstituten" aus der Vervollständigung
    var vorn = roh.match(/^(\d{3,5})\b/);
    if (vorn && kontenIndex.nach[vorn[1]]) return kontenIndex.nach[vorn[1]];
    return kontenIndex.nach[roh] || kontenIndex.nach[schluessel(roh)] || null;
  }

  function kontoName(bezeichner) {
    var k = konto(bezeichner);
    return k ? k.name : String(bezeichner || "");
  }

  function alleKonten() {
    if (!kontenIndex) kontenAufbauen();
    return kontenIndex.liste;
  }

  /* ================================================== Zusammensteller

     Regelbasiert, nicht zufällig. Die Reihenfolge der Regeln ist die
     Reihenfolge, in der eine Lehrkraft eine Arbeit zusammenstellt: erst jedes
     Thema einmal, dann auffüllen, dabei Aufgabenarten und Niveaus mischen und
     die Zeit im Blick behalten.                                               */

  function kapitelSchluessel(b) { return b.lernfeld + ":" + b.kapitel; }

  function typen(b) {
    var raus = [];
    (b.eingabe || []).forEach(function (e) {
      if (raus.indexOf(e.block) === -1) raus.push(e.block);
    });
    return raus;
  }

  function bausteineZu(kapitel, ausschluss) {
    var gewaehlt = {};
    kapitel.forEach(function (k) { gewaehlt[k] = true; });
    return (vorrat ? vorrat.bausteine : []).filter(function (b) {
      return gewaehlt[kapitelSchluessel(b)] && !(ausschluss && ausschluss[b.id]);
    });
  }

  /* Zusammenhängende Fälle (doku/AzubiPass_Aufgabenbausteine.md): Ein Fall ist
     ein gemeinsamer Belegsatz mit mehreren Teilaufgaben und kommt nur ganz oder
     gar nicht vor. */
  function faelleZu(kapitel, beruf, ausschluss) {
    return ((vorrat && vorrat.faelle) || []).filter(function (f) {
      return (!beruf || (f.beruf || "kfb") === beruf) &&
        f.kapitel.every(function (k) { return kapitel.indexOf(k) !== -1; }) &&
        !f.schritte.some(function (s) { return ausschluss && ausschluss[s.id]; });
    });
  }

  function fallZu(b) {
    if (!b || !b.fall || !vorrat) return null;
    return (vorrat.faelle || []).filter(function (f) { return f.id === b.fall; })[0] || null;
  }

  /* Wie lange dauert eine Klausur mindestens, wenn jedes gewählte Kapitel
     vorkommen soll? Die kürzeste Aufgabe je Kapitel, aufsummiert. Darunter
     lässt sich die Auswahl nicht ehrlich abdecken — und dann wird das gesagt
     statt still ein Kapitel weggelassen. */
  function mindestdauer(kapitel, ausschluss) {
    var summe = 0;
    kapitel.forEach(function (k) {
      var kandidaten = bausteineZu([k], ausschluss);
      if (!kandidaten.length) return;
      summe += Math.min.apply(null, kandidaten.map(function (b) { return b.dauer_min; }));
    });
    return summe;
  }

  function stelleZusammen(wahl) {
    var kapitel = (wahl.kapitel || []).slice();
    var dauer = wahl.dauer || DAUER_STANDARD;
    var seed = wahl.seed || neuerSeed();
    var vorher = {};
    (wahl.vorher || []).forEach(function (id) { vorher[id] = true; });
    var ausschluss = wahl.ausschluss || null;

    var kandidaten = bausteineZu(kapitel, ausschluss);
    if (!kapitel.length || !kandidaten.length) {
      return { fehler: "leer", kapitel: kapitel, seed: seed, dauer: dauer, aufgaben: [] };
    }

    var noetig = mindestdauer(kapitel, ausschluss);
    if (noetig > dauer) {
      return { fehler: "zu_kurz", mindestdauer: noetig, kapitel: kapitel,
               seed: seed, dauer: dauer, aufgaben: [] };
    }

    var r = wuerfel(seed + "|auswahl");
    // Ein fester Rauschwert je Baustein: gleicher Seed, gleiche Reihenfolge —
    // aber nicht immer die ersten Aufgaben einer Datei.
    var rauschen = {};
    kandidaten.forEach(function (b) { rauschen[b.id] = r(); });

    var gewaehlt = [], benutzt = {};
    var typZahl = {}, afbZahl = {}, kapZahl = {};
    var verbraucht = 0;

    function bewerte(b, restzeit, nurAbdeckung) {
      if (benutzt[b.id]) return -Infinity;
      if (b.dauer_min > restzeit) return -Infinity;
      var s = 0;
      typen(b).forEach(function (t) { s += typZahl[t] ? -2.2 : 2.4; });
      s -= (afbZahl[b.anforderungsbereich] || 0) * 1.6;
      if (!nurAbdeckung) s -= (kapZahl[kapitelSchluessel(b)] || 0) * 1.3;
      /* Stärker als Aufgabenart und Niveau zusammen: Wo es bei gleicher Abdeckung
         und Zeit eine andere Aufgabe gibt, soll die neue Variante sie nehmen. */
      if (vorher[b.id]) s -= 7;
      // Zeit ausnutzen, aber schwach gewichtet: Sonst gewinnen immer die
      // langen offenen Aufgaben, und die Klausur besteht aus Aufsätzen.
      s += (b.dauer_min / Math.max(restzeit, 1)) * 0.4;
      return s + rauschen[b.id] * 0.8;
    }

    function nimm(b) {
      gewaehlt.push(b);
      benutzt[b.id] = true;
      verbraucht += b.dauer_min;
      typen(b).forEach(function (t) { typZahl[t] = (typZahl[t] || 0) + 1; });
      afbZahl[b.anforderungsbereich] = (afbZahl[b.anforderungsbereich] || 0) + 1;
      var k = kapitelSchluessel(b);
      kapZahl[k] = (kapZahl[k] || 0) + 1;
    }

    function besterAus(menge, nurAbdeckung) {
      var best = null, bestwert = -Infinity;
      menge.forEach(function (b) {
        var w = bewerte(b, dauer - verbraucht, nurAbdeckung);
        if (w > bestwert) { bestwert = w; best = b; }
      });
      return bestwert === -Infinity ? null : best;
    }

    /* Schritt 0 — ein passender Fall, wenn er ganz hineinpasst und die Abdeckung
       der übrigen Kapitel erhalten bleibt. Sonst decken Einzelaufgaben ab. */
    var fall = null;
    var moegliche = faelleZu(kapitel, kandidaten[0].beruf || "kfb", ausschluss)
      .map(function (f) {
        var neu = !f.schritte.some(function (b) { return vorher[b.id]; });
        return { f: f, rang: (neu ? 1 : 0) + wuerfel(seed + "|fall|" + f.id)() / 2 };
      }).sort(function (a, b) { return b.rang - a.rang; });
    moegliche.some(function (m) {
      var reserve = 0;
      kapitel.forEach(function (k) {
        if (m.f.kapitel.indexOf(k) === -1) reserve += mindestdauer([k], ausschluss);
      });
      if (m.f.minuten + reserve > dauer) return false;
      fall = m.f;
      m.f.schritte.forEach(nimm);
      return true;
    });

    // Schritt 1 — jedes gewählte Kapitel einmal, in gewürfelter, aber
    // reproduzierbarer Reihenfolge. Sonst käme K1 immer zuerst dran und
    // bekäme bei knapper Zeit systematisch die besten Plätze.
    var reihenfolge = kapitel.slice().sort(function (a, b) {
      return wuerfel(seed + "|k|" + a)() - wuerfel(seed + "|k|" + b)();
    });
    /* Wer zuerst drankommt, darf nicht die ganze Zeit aufbrauchen: Für jedes
       noch nicht abgedeckte Kapitel bleibt seine kürzeste Aufgabe reserviert.
       Sonst nimmt K1 eine Sieben-Minuten-Aufgabe und für K9 ist nichts mehr da
       — genau die stille Auslassung, die es nicht geben soll. */
    reihenfolge.forEach(function (k, pos) {
      if (kapZahl[k]) return;                 // schon über den Fall abgedeckt
      var reserve = 0;
      reihenfolge.slice(pos + 1).forEach(function (rest) {
        if (!kapZahl[rest]) reserve += mindestdauer([rest], ausschluss);
      });
      var frei = dauer - verbraucht - reserve;
      var b = null, bestwert = -Infinity;
      bausteineZu([k], ausschluss).forEach(function (kandidat) {
        var wert = bewerte(kandidat, frei, true);
        if (wert > bestwert) { bestwert = wert; b = kandidat; }
      });
      if (bestwert > -Infinity && b) nimm(b);
    });

    // Schritt 2 — auffüllen, solange etwas passt
    for (var n = 0; n < 60; n++) {
      var b2 = besterAus(kandidaten, false);
      if (!b2) break;
      nimm(b2);
    }

    // Schritt 3 — Reihenfolge im Bogen: nach Kapitel, darin nach
    // Anforderungsbereich. Eine Klausur springt nicht zwischen Themen.
    var kapPos = {};
    (vorrat.kapitel || []).forEach(function (k, i) { kapPos[k.schluessel] = i; });
    gewaehlt.sort(function (a, b) {
      var d = (kapPos[kapitelSchluessel(a)] || 0) - (kapPos[kapitelSchluessel(b)] || 0);
      if (d) return d;
      // Schritte eines Falles stehen direkt hintereinander, am Ende des Kapitels.
      d = (a.fall ? 1 : 0) - (b.fall ? 1 : 0);
      if (d) return d;
      if (a.fall) return a.schritt - b.schritt;
      d = a.anforderungsbereich - b.anforderungsbereich;
      return d || (a.id < b.id ? -1 : 1);
    });

    return {
      seed: seed, dauer: dauer, kapitel: kapitel,
      aufgaben: gewaehlt.map(function (b) { return b.id; }),
      minuten: verbraucht,
      punkte: gewaehlt.reduce(function (s, b) { return s + b.punkte; }, 0),
      abgedeckt: Object.keys(kapZahl).length,
      fall: fall ? fall.id : null
    };
  }

  /* Vorschau und Bogen sind dieselbe Klausur: Die Werte werden hier gezogen und
     unverändert gestartet. Lässt sich eine Aufgabe nicht ziehen, kommt eine
     geprüfte Alternative oder ein ehrlicher Hinweis statt einer stillen Lücke. */
  function vorbereiten(wahl) {
    var ausschluss = {};
    for (var runde = 0; runde < 12; runde++) {
      var v = stelleZusammen({ kapitel: wahl.kapitel, dauer: wahl.dauer, seed: wahl.seed,
                               vorher: wahl.vorher, ausschluss: ausschluss });
      if (v.fehler) {
        if (Object.keys(ausschluss).length) { v.fehler = "ungueltig"; v.aufgaben = []; }
        return v;
      }
      var werte = {}, kaputt = [];
      v.aufgaben.forEach(function (id) {
        try { werte[id] = werteZiehen(baustein(id), v.seed); } catch (e) { kaputt.push(id); }
      });
      if (!kaputt.length) { v.werte = werte; return v; }
      kaputt.forEach(function (id) { ausschluss[id] = true; });
    }
    return { fehler: "ungueltig", seed: wahl.seed, dauer: wahl.dauer, kapitel: wahl.kapitel,
             aufgaben: [] };
  }

  /* Was sich gegenüber der letzten Klausur wirklich wiederholt. */
  function ueberschneidung(v, alt) {
    var raus = { gleich: 0, neueWerte: 0 };
    if (!alt || !v.aufgaben) return raus;
    v.aufgaben.forEach(function (id) {
      if ((alt.aufgaben || []).indexOf(id) === -1) return;
      var a = (alt.werte || {})[id] || {}, n = (v.werte || {})[id] || {};
      if (JSON.stringify(a) !== JSON.stringify(n)) raus.neueWerte++;
      else raus.gleich++;
    });
    return raus;
  }

  function baustein(id) {
    if (!vorrat) return null;
    if (!vorrat._nachId) {
      vorrat._nachId = {};
      vorrat.bausteine.concat(vorrat.uebungen || []).forEach(function (b) {
        vorrat._nachId[b.id] = b;
      });
      (vorrat.faelle || []).forEach(function (f) {
        f.schritte.forEach(function (b) { vorrat._nachId[b.id] = b; });
      });
    }
    return vorrat._nachId[id] || null;
  }

  /* ================================================== Klausurzustand

     Getrennt von azubipass:konto. Der Lernstand eines Jahres darf nicht daran
     hängen, dass eine Probeklausur sauber endet — und umgekehrt soll eine
     halbe Klausur den Lernstand nicht aufblähen.                              */

  var zustand = null;

  function frischerZustand() {
    return { v: FASSUNG, id: null, seed: null, kapitel: [], dauer: DAUER_STANDARD,
             ende: null, gestartet: false, abgegeben: false, aufgaben: [],
             werte: {}, antworten: {}, markiert: [], aktuell: 0, selbst: {},
             vorher: [], abgelaufen: false, beendetAm: null, beruf: aktiverBeruf() };
  }

  /* Defensiv laden: Was hier liegt, kann aus einer älteren Fassung stammen,
     von Hand verstellt oder halb geschrieben sein. Nichts davon darf die App
     zerlegen — im Zweifel gibt es eben keine laufende Klausur. */
  function zustandLaden() {
    var roh;
    var beruf = aktiverBeruf();
    try { roh = localStorage.getItem(schluesselFuer(beruf)); } catch (e) { return null; }
    if (!roh) return null;
    var z;
    try { z = JSON.parse(roh); } catch (e) { return null; }
    if (!z || typeof z !== "object" || z.v !== FASSUNG) return null;
    z.beruf = beruf;
    if (!Array.isArray(z.aufgaben) || !z.aufgaben.length) return null;
    var frisch = frischerZustand();
    Object.keys(frisch).forEach(function (f) {
      if (z[f] === undefined || (Array.isArray(frisch[f]) && !Array.isArray(z[f]))) {
        z[f] = frisch[f];
      }
    });
    /* Alte laufende Bögen hatten noch keine eigene Kennung. Der Seed ist pro
       Variante eindeutig und reicht deshalb für die Ergebnis-Historie. */
    if (!z.id && z.seed) z.id = "pk-" + z.seed;
    /* Aufgaben, die es nicht mehr gibt, still fallen lassen statt abstürzen —
       aber nur, wenn der Vorrat überhaupt schon geladen ist. Sonst gäbe es vor
       dem ersten fetch keine einzige gültige Aufgabe und jede laufende Klausur
       sähe verloren aus. */
    if (vorrat) {
      z.aufgaben = z.aufgaben.filter(function (id) { return !!baustein(id); });
      if (!z.aufgaben.length) return null;
    }
    if (z.aktuell >= z.aufgaben.length) z.aktuell = 0;
    /* Ältere Fassungen schrieben die Reihenfolge schon beim Anzeigen. Ein so
       entstandener, unberührter Stand ist keine Antwort. Nur laufende, noch
       nicht abgelaufene Bögen: Gesicherte Abgaben bleiben, wie sie sind. */
    if (vorrat && z.rf !== 1 && !z.abgegeben && !z.abgelaufen &&
        !(z.ende && Date.now() >= z.ende)) {
      z.aufgaben.forEach(function (id) {
        var a = z.antworten[id], b = baustein(id);
        if (!a || !b) return;
        (b.eingabe || []).forEach(function (e, i) {
          if (e.block !== "reihenfolge" || !Array.isArray(a[i])) return;
          if (a[i].every(function (x, platz) { return x === platz; })) delete a[i];
        });
      });
      z.rf = 1;
    }
    return z;
  }

  function zustandSichern() {
    if (!zustand) return;
    if (fremdeAbgabeUebernehmen()) return;
    try { localStorage.setItem(schluesselFuer(zustand.beruf || "kfb"), JSON.stringify(zustand)); }
    catch (e) { /* Speicher voll oder gesperrt — die Klausur läuft trotzdem */ }
  }

  /* Zwei Tabs mit demselben Bogen: Eine Abgabe im anderen Tab ist endgültig.
     Dieser Tab darf sie nicht mit seinem älteren Stand zurückdrehen. */
  function fremdeAbgabeUebernehmen() {
    if (!zustand || zustand.abgegeben) return false;
    var roh = null;
    try { roh = JSON.parse(localStorage.getItem(schluesselFuer(zustand.beruf || "kfb"))); }
    catch (e) {}
    if (!roh || roh.id !== zustand.id || !roh.abgegeben) return false;
    zustand = roh;
    if (ansicht === "klausur") {
      ansicht = "auswertung";
      if (buehne) buehne.classList.remove("pk--imbogen");
      neuZeichnen();
    }
    return true;
  }

  /* Nur den Klausurschlüssel entfernen. localStorage.clear() würde den
     Lernstand eines Jahres mitnehmen. */
  function zustandVerwerfen() {
    try { localStorage.removeItem(schluesselFuer(zustand && zustand.beruf || aktiverBeruf())); } catch (e) {}
    zustand = null;
  }

  /* ================================================== Bewertung */

  /* Bewertung und Eingabefelder arbeiten auf dem Klausurbogen oder, in einer
     Übungsrunde, auf einem eigenen Stand. Die Übung reicht dafür eine Kopie des
     Bausteins mit `_stand` herein; einen zweiten Renderer gibt es nicht, und der
     Klausurbogen bleibt von der Übung unberührt. */
  function standVon(b) { return (b && b._stand) || zustand; }

  function blockPunkte(b, e) {
    if (typeof e.punkte === "number") return e.punkte;
    return b.punkte;
  }

  function antwortVon(b, i) {
    var a = standVon(b).antworten[b.id];
    return a ? a[i] : undefined;
  }

  function werteVon(b) { return standVon(b).werte[b.id] || {}; }

  /* Sollwert eines Zahlenfelds: entweder eine Größe der Aufgabe oder eine
     feste Zahl in der Lösung. */
  function sollwert(e, w) {
    if (typeof e.loesung === "number") return e.loesung;
    if (Object.prototype.hasOwnProperty.call(w, e.loesung)) return w[e.loesung];
    return rechne(e.loesung, w);
  }

  function bewerteZahl(b, e, i) {
    var w = werteVon(b);
    var soll = sollwert(e, w);
    var ist = zahlLesen(antwortVon(b, i));
    var p = blockPunkte(b, e);
    var tol = e.toleranz != null ? e.toleranz : 0.01;
    if (ist == null) return { punkte: 0, soll: soll, folgefehler: false };
    if (Math.abs(ist - soll) <= tol) return { punkte: p, soll: soll, folgefehler: false };

    /* Folgefehler: Wer sich oben verrechnet, unten aber mit dem eigenen Wert
       korrekt weiterrechnet, bekommt den Schritt. Ohne diese Regel wird jede
       mehrstufige Rechenaufgabe unfair. */
    if (e.folgefehler_aus && e.folgefehler_aus.length) {
      var eigene = {}, ersetzt = {};
      Object.keys(w).forEach(function (k) { eigene[k] = w[k]; });
      var vollstaendig = true;
      e.folgefehler_aus.forEach(function (name) {
        var pos = -1;
        b.eingabe.forEach(function (x, xi) {
          if (x.block === "zahl" && x.loesung === name) pos = xi;
        });
        var v = pos >= 0 ? zahlLesen(antwortVon(b, pos)) : null;
        if (v == null) vollstaendig = false;
        else { eigene[name] = v; ersetzt[name] = true; }
      });
      /* Die Zwischenwerte einsetzen genügt nicht — alles, was auf ihnen
         aufbaut, muss mit ihnen neu gerechnet werden. Sonst stünde in eigene
         weiterhin das richtige Endergebnis und die Regel liefe ins Leere. */
      Object.keys(b.abgeleitet || {}).forEach(function (name) {
        if (ersetzt[name]) return;
        try { eigene[name] = rechne(b.abgeleitet[name], eigene); } catch (err) {}
      });
      if (vollstaendig) {
        var erwartet;
        try { erwartet = sollwert(e, eigene); } catch (err) { erwartet = null; }
        if (erwartet != null && Math.abs(ist - erwartet) <= tol) {
          return { punkte: p, soll: soll, folgefehler: true };
        }
      }
    }
    return { punkte: 0, soll: soll, folgefehler: false };
  }

  /* Mehrfachauswahl: je richtig Angekreuztem ein Anteil, je falsch
     Angekreuztem derselbe Anteil wieder ab, nie unter null. Eine Regel, überall
     dieselbe — „alles oder nichts" bestraft eine von vier Lücken wie gar nichts
     gewusst zu haben. */
  function bewerteAuswahl(b, e, i) {
    var p = blockPunkte(b, e);
    var a = antwortVon(b, i);
    if (!e.mehrfach) {
      var richtig = e.optionen.findIndex(function (o) { return !!o.richtig; });
      return { punkte: a === richtig ? p : 0, richtige: [richtig] };
    }
    var richtige = [];
    e.optionen.forEach(function (o, oi) { if (o.richtig) richtige.push(oi); });
    var gewaehlt = Array.isArray(a) ? a : [];
    var treffer = gewaehlt.filter(function (x) { return richtige.indexOf(x) !== -1; }).length;
    var daneben = gewaehlt.length - treffer;
    var anteil = richtige.length ? p / richtige.length : 0;
    return { punkte: Math.max(0, (treffer - daneben) * anteil), richtige: richtige };
  }

  function bewerteZuordnung(b, e, i) {
    var a = antwortVon(b, i) || {};
    var jeTreffer = b.bewertung.punkte_je_treffer;
    var treffer = 0;
    e.elemente.forEach(function (x, xi) { if (a[xi] === x.loesung) treffer++; });
    var p = jeTreffer != null ? treffer * jeTreffer
          : (e.elemente.length ? blockPunkte(b, e) * treffer / e.elemente.length : 0);
    return { punkte: p, treffer: treffer };
  }

  function bewerteReihenfolge(b, e, i) {
    var a = antwortVon(b, i);
    var jeTreffer = b.bewertung.punkte_je_treffer;
    var treffer = 0;
    if (Array.isArray(a)) {
      a.forEach(function (xi, platz) {
        if (e.elemente[xi] && e.elemente[xi].position === platz + 1) treffer++;
      });
    }
    var p = jeTreffer != null ? treffer * jeTreffer
          : (e.elemente.length ? blockPunkte(b, e) * treffer / e.elemente.length : 0);
    return { punkte: p, treffer: treffer };
  }

  /* Buchungssatz: Zeilen sind gleichwertig.

     Wer „Bank an Forderungen" in umgekehrter Zeilenfolge einträgt, hat den
     Satz trotzdem gebildet. Deshalb wird nicht Zeile gegen Zeile geprüft,
     sondern jede Lösungszeile bekommt die am besten passende, noch freie
     Eingabezeile. Punkte gibt es je Bestandteil: Seite plus Konto, und der
     Betrag.                                                                    */
  function bewerteBuchungssatz(b, e, i) {
    var w = werteVon(b);
    var eingaben = antwortVon(b, i) || [];
    var loesung = e.loesung || [];
    var jeZeile = b.bewertung.punkte_je_zeile;
    var proZeile = jeZeile != null ? jeZeile
                 : (loesung.length ? blockPunkte(b, e) / loesung.length : 0);

    function betragSoll(z) {
      if (z.betrag == null) return null;
      if (typeof z.betrag === "number") return z.betrag;
      return Object.prototype.hasOwnProperty.call(w, z.betrag)
        ? w[z.betrag] : rechne(z.betrag, w);
    }

    function passung(soll, ist) {
      if (!ist) return 0;
      var seite = soll.soll != null ? "soll" : "haben";
      var kSoll = konto(soll[seite]);
      var kIst = konto(ist.konto);
      var kontoOk = ist.seite === seite && kSoll && kIst && kSoll.nr === kIst.nr ? 1 : 0;
      var b1 = betragSoll(soll);
      var b2 = zahlLesen(ist.betrag);
      var betragOk = (b1 != null && b2 != null && Math.abs(b1 - b2) <= 0.01) ? 1 : 0;
      return kontoOk + betragOk;
    }

    var frei = eingaben.map(function (_, n) { return n; });
    var punkte = 0, zeilen = [];
    loesung.forEach(function (z) {
      var bestPos = -1, bestWert = 0;
      frei.forEach(function (n) {
        var v = passung(z, eingaben[n]);
        if (v > bestWert) { bestWert = v; bestPos = n; }
      });
      if (bestPos >= 0) frei.splice(frei.indexOf(bestPos), 1);
      punkte += proZeile * bestWert / 2;
      var seite = z.soll != null ? "soll" : "haben";
      zeilen.push({ seite: seite, konto: konto(z[seite]), betrag: betragSoll(z),
                    erreicht: bestWert });
    });
    return { punkte: punkte, zeilen: zeilen };
  }

  /* Offene Antworten bewertet der Nutzer selbst — aber nicht nach Gefühl.
     Er hakt einzelne Kriterien ab, und nur die zählen. Nicht angesehen heißt
     null Punkte, nicht „wird schon gestimmt haben". */
  function bewerteSelbst(b) {
    var haken = standVon(b).selbst[b.id] || [];
    var raster = (b.bewertung.raster || []);
    var p = 0;
    var angehakt = 0;
    raster.forEach(function (k, ki) { if (haken[ki]) { p += k.punkte; angehakt++; } });
    return { punkte: p, offen: angehakt === 0 };
  }

  function bewerteBaustein(b) {
    if (b.bewertung.art === "selbstbewertung") {
      var s = bewerteSelbst(b);
      return { punkte: s.punkte, moeglich: b.punkte, selbst: true, offen: s.offen };
    }
    var summe = 0;
    b.eingabe.forEach(function (e, i) {
      if (e.block === "zahl") summe += bewerteZahl(b, e, i).punkte;
      else if (e.block === "auswahl") summe += bewerteAuswahl(b, e, i).punkte;
      else if (e.block === "zuordnung") summe += bewerteZuordnung(b, e, i).punkte;
      else if (e.block === "reihenfolge") summe += bewerteReihenfolge(b, e, i).punkte;
      else if (e.block === "buchungssatz") summe += bewerteBuchungssatz(b, e, i).punkte;
    });
    return { punkte: Math.min(summe, b.punkte), moeglich: b.punkte, selbst: false };
  }

  function ergebnis() {
    var jeKapitel = {}, erreicht = 0, moeglich = 0, offen = 0;
    zustand.aufgaben.forEach(function (id) {
      var b = baustein(id);
      if (!b) return;
      var e = bewerteBaustein(b);
      erreicht += e.punkte;
      moeglich += e.moeglich;
      if (e.selbst && e.offen) offen++;
      var k = kapitelSchluessel(b);
      if (!jeKapitel[k]) jeKapitel[k] = { erreicht: 0, moeglich: 0, schluessel: k };
      jeKapitel[k].erreicht += e.punkte;
      jeKapitel[k].moeglich += e.moeglich;
    });
    return {
      erreicht: erreicht, moeglich: moeglich, offen: offen,
      prozent: moeglich ? Math.round(erreicht / moeglich * 1000) / 10 : 0,
      kapitel: Object.keys(jeKapitel).map(function (k) { return jeKapitel[k]; })
    };
  }

  /* Nur die Auswertung kommt ins gemeinsame Konto. Die Antworten, Zufallswerte
     und offenen Texte bleiben im separaten Klausurbogen und werden nicht in
     Sicherungen kopiert. */
  function probeklausurZusammenfassung(e) {
    if (!zustand || !zustand.abgegeben || !zustand.id || !AP.probeklausurErgebnisSpeichern) {
      return;
    }
    e = e || ergebnis();
    AP.probeklausurErgebnisSpeichern({
      id: zustand.id,
      beruf: zustand.beruf || "kfb",
      status: e.offen ? "in_auswertung" : "abgeschlossen",
      beendetAm: zustand.beendetAm || null,
      aktualisiertAm: new Date().toISOString(),
      seed: zustand.seed,
      kapitel: (zustand.kapitel || []).slice(),
      kapitelErgebnisse: e.kapitel,
      dauer: zustand.dauer,
      aufgaben: zustand.aufgaben.length,
      abgelaufen: !!zustand.abgelaufen,
      erreicht: e.erreicht,
      moeglich: e.moeglich,
      prozent: e.prozent,
      offen: e.offen
    });
  }

  /* ================================================== Belege

     Die Vorlage ist eigener HTML-Code aus quellen/belege/ und darf deshalb als
     HTML eingesetzt werden. Die eingefüllten Werte dürfen es nicht — sie
     stammen aus den Aufgabendaten. Also wird jeder Wert vor dem Einsetzen
     entschärft.                                                                */

  function entschaerfen(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Ein Wert kann selbst noch einen Platzhalter enthalten — „{netto}" aus den
     Vorgaben wird erst hier zur gewürfelten Zahl. */
  function fuellen(text, w) {
    return String(text == null ? "" : text).replace(/\{([A-Za-z_][A-Za-z0-9_]*)\}/g,
      function (ganz, name) {
        if (w && Object.prototype.hasOwnProperty.call(w, name)) {
          return typeof w[name] === "number" ? zahlText(w[name]) : String(w[name]);
        }
        return ganz;
      });
  }

  function belegHtml(anlage, w) {
    var vorlage = vorrat.belege[anlage.beleg];
    var gefuellt = anlage.beleg_gefuellt || { werte: {}, zeilen: [] };
    if (!vorlage) return null;
    var werte = {}, k;
    for (k in gefuellt.werte) werte[k] = fuellen(gefuellt.werte[k], w);
    var zeilen = (gefuellt.zeilen || []).map(function (z) {
      var neu = {};
      for (var f in z) neu[f] = fuellen(z[f], w);
      return neu;
    });

    if (vorlage.saldo_fortschreiben) {
      var alt = zahlLesen(werte.saldo_alt) || 0;
      zeilen.forEach(function (z) {
        alt += (zahlLesen(z.haben) || 0) - (zahlLesen(z.soll) || 0);
      });
      werte.saldo_neu = zahlText(alt);
      werte.saldo_alt = zahlText(zahlLesen(werte.saldo_alt) || 0);
    }

    var marke = vorlage.marke;
    var html = vorlage.html;
    if (marke) {
      var muster = new RegExp("<!--\\s*" + marke + ":start\\s*-->([\\s\\S]*?)<!--\\s*" +
                              marke + ":ende\\s*-->");
      var treffer = html.match(muster);
      if (treffer) {
        var block = treffer[1];
        html = html.replace(muster, zeilen.map(function (z) {
          return block.replace(/\{([a-z0-9_]+)\.([a-z0-9_]+)\}/gi, function (ganz, m, feld) {
            return m === marke ? entschaerfen(z[feld] == null ? "" : z[feld]) : ganz;
          });
        }).join(""));
      }
    }
    return html.replace(/\{([a-z0-9_]+)\}/gi, function (ganz, name) {
      return Object.prototype.hasOwnProperty.call(werte, name)
        ? entschaerfen(werte[name]) : "";
    });
  }

  /* ================================================== Anzeige einer Aufgabe

     Klausurmodus, und nur der. Keine Farbe für richtig oder falsch, kein Echo,
     keine Erklärung, keine mitlaufende Summe. Verweise werden auf das reine
     Wort reduziert — AP.mk macht genau das.                                    */

  function anzeigeBlock(a, w) {
    if (a.block === "text") {
      return mkEl("p", "pk--text", fuellen(a.inhalt, w));
    }
    if (a.block === "tabelle") {
      return tabelle(a, w);
    }
    if (a.block === "anlage") {
      var d = el("details", "pk--anlage");
      if (!a.zugeklappt) d.open = true;
      var s = el("summary", null, a.titel || "Anlage");
      d.appendChild(s);
      var innen = el("div", "pk--anlage-inhalt");
      if (a.beleg) {
        var html = belegHtml(a, w);
        if (html) {
          var huelle = el("div", "pk--beleg-rahmen");
          huelle.innerHTML = html;
          innen.appendChild(huelle);
        } else {
          innen.appendChild(el("p", "pk--fehlt", "Beleg „" + a.beleg + "“ fehlt."));
        }
      } else if (a.inhalt && a.inhalt.block === "tabelle") {
        innen.appendChild(tabelle(a.inhalt, w));
      } else if (a.inhalt) {
        innen.appendChild(mkEl("p", null, fuellen(a.inhalt, w)));
      }
      d.appendChild(innen);
      return d;
    }
    return null;
  }

  function tabelle(t, w) {
    var rahmen = el("div", "pk--tabellenrahmen");
    var tb = el("table", "pk--tabelle");
    var kopf = el("tr");
    (t.spalten || []).forEach(function (s, i) {
      var th = el("th", i > 0 ? "pk--rechts" : null, s);
      th.scope = "col";
      kopf.appendChild(th);
    });
    var thead = el("thead"); thead.appendChild(kopf); tb.appendChild(thead);
    var body = el("tbody");
    (t.zeilen || []).forEach(function (z) {
      var tr = el("tr");
      z.forEach(function (c, i) {
        tr.appendChild(mkEl("td", i > 0 ? "pk--zahl" : null, fuellen(c, w)));
      });
      body.appendChild(tr);
    });
    tb.appendChild(body);
    rahmen.appendChild(tb);
    return rahmen;
  }

  /* Die Endzeit ist absolut. Timer laufen im Hintergrund verspätet, deshalb
     entscheidet hier jede einzelne Änderung selbst und nicht die Uhr im Kopf. */
  function bogenGesperrt() {
    return !!(zustand && (zustand.abgegeben || zustand.abgelaufen ||
                          (zustand.ende && Date.now() >= zustand.ende)));
  }

  function ablaufAnwenden() {
    if (!zustand || zustand.abgegeben || zustand.abgelaufen || !bogenGesperrt()) return false;
    zustand.abgelaufen = true;
    zustandSichern();
    if (ansicht === "klausur" && buehne && !buehne.hidden) neuZeichnen();
    return true;
  }

  function antwortSetzen(b, i, wert) {
    var z = standVon(b);
    if (z === zustand) {
      fremdeAbgabeUebernehmen();
      if (z !== zustand || bogenGesperrt()) { ablaufAnwenden(); return false; }
    } else if (z.gesperrt) {
      return false;
    }
    if (!z.antworten[b.id]) z.antworten[b.id] = {};
    z.antworten[b.id][i] = wert;
    if (z === zustand) { zustand.rf = 1; zustandSichern(); }
    else if (z.sichern) z.sichern();
    return true;
  }

  /* Eingaben arbeiten auf einer Kopie: Eine abgelehnte Änderung darf den
     gespeicherten Stand auch im Arbeitsspeicher nicht berühren. */
  function kopie(w) { return w === undefined ? w : JSON.parse(JSON.stringify(w)); }

  function eingabeBlock(b, e, i) {
    if (e.block === "zahl") return feldZahl(b, e, i);
    if (e.block === "auswahl") return feldAuswahl(b, e, i);
    if (e.block === "zuordnung") return feldZuordnung(b, e, i);
    if (e.block === "reihenfolge") return feldReihenfolge(b, e, i);
    if (e.block === "buchungssatz") return feldBuchungssatz(b, e, i);
    if (e.block === "textfeld") return feldText(b, e, i);
    var p = el("p", "pk--fehlt", "Aufgabentyp „" + e.block + "“ wird noch nicht dargestellt.");
    return p;
  }

  var laufendeNr = 0;
  function kennung(vorsilbe) { return vorsilbe + "-" + (++laufendeNr); }

  function feldZahl(b, e, i) {
    var zeile = el("div", "pk--feldzeile");
    var id = kennung("pkz");
    var lab = el("label", "pk--feldname", e.label || "Ergebnis");
    lab.htmlFor = id;
    var eingabe = el("input", "pk--zahlfeld");
    eingabe.id = id;
    AP.kommafeld(eingabe);
    eingabe.value = antwortVon(b, i) || "";
    eingabe.addEventListener("input", function () {
      antwortSetzen(b, i, eingabe.value);
    });
    var einheit = el("span", "pk--einheit", (e.einheit || "") +
      (e.punkte != null ? " · " + punkteText(e.punkte) + " P." : ""));
    zeile.appendChild(lab);
    zeile.appendChild(eingabe);
    zeile.appendChild(einheit);
    return zeile;
  }

  function feldAuswahl(b, e, i) {
    var box = el("fieldset", "pk--auswahl");
    var lg = el("legend", "pk--frage");
    lg.innerHTML = AP.mk((e.frage || e.label || b.operator) +
      (e.mehrfach ? " (Mehrfachauswahl)" : ""));
    box.appendChild(lg);
    var name = kennung("pka");
    var gewaehlt = antwortVon(b, i);

    e.optionen.forEach(function (o, oi) {
      var id = name + "-" + oi;
      var lab = el("label", "pk--option");
      lab.htmlFor = id;
      var feld = el("input");
      feld.type = e.mehrfach ? "checkbox" : "radio";
      feld.name = name;
      feld.id = id;
      feld.value = String(oi);
      if (e.mehrfach) {
        feld.checked = Array.isArray(gewaehlt) && gewaehlt.indexOf(oi) !== -1;
      } else {
        feld.checked = gewaehlt === oi;
      }
      feld.addEventListener("change", function () {
        if (e.mehrfach) {
          var liste = Array.isArray(antwortVon(b, i)) ? antwortVon(b, i).slice() : [];
          var pos = liste.indexOf(oi);
          if (feld.checked && pos === -1) liste.push(oi);
          if (!feld.checked && pos !== -1) liste.splice(pos, 1);
          liste.sort(function (x, y) { return x - y; });
          antwortSetzen(b, i, liste);
        } else {
          antwortSetzen(b, i, oi);
        }
      });
      lab.appendChild(feld);
      lab.appendChild(mkEl("span", null, o.text));
      box.appendChild(lab);
    });
    return box;
  }

  /* Zuordnung ohne Ziehen.

     Antippen, Ziel antippen — das geht am Handy, mit der Maus und mit der
     Tastatur, weil alles Knöpfe sind. Ziehen wäre hübscher und am Handy
     zuverlässig schlechter. Der Zustand steht als Text im Ziel, nicht nur als
     Farbe.                                                                     */
  function feldZuordnung(b, e, i) {
    var box = el("div", "pk--zuordnung");
    if (e.lead) box.appendChild(mkEl("p", "pk--frage", e.lead));

    var gewaehltesEl = null;
    var stand = kopie(antwortVon(b, i)) || {};
    var melder = el("p", "pk--status");
    melder.setAttribute("role", "status");
    melder.setAttribute("aria-live", "polite");

    var raster = el("div", "pk--zu-raster");
    var stapel = el("div", "pk--zu-stapel");
    var ziele = el("div", "pk--zu-ziele");
    raster.appendChild(stapel);
    raster.appendChild(ziele);

    function zeichnen() {
      stapel.innerHTML = "";
      stapel.appendChild(el("p", "pk--titelchen", "Zum Zuordnen antippen"));
      e.elemente.forEach(function (x, xi) {
        if (stand[xi] !== undefined) return;
        var b1 = el("button", "pk--zu-el");
        b1.type = "button";
        b1.innerHTML = AP.mk(x.text);
        b1.setAttribute("aria-pressed", gewaehltesEl === xi ? "true" : "false");
        if (gewaehltesEl === xi) b1.classList.add("gewaehlt");
        b1.addEventListener("click", function () {
          gewaehltesEl = gewaehltesEl === xi ? null : xi;
          melder.textContent = gewaehltesEl === null ? "Auswahl aufgehoben."
            : "Ausgewählt. Jetzt ein Ziel antippen.";
          zeichnen();
        });
        stapel.appendChild(b1);
      });
      if (!stapel.querySelector(".pk--zu-el")) {
        stapel.appendChild(el("p", "pk--leise", "Alle zugeordnet."));
      }

      ziele.innerHTML = "";
      e.ziele.forEach(function (z) {
        var kasten = el("div", "pk--zu-ziel");
        var kopf = el("button", "pk--zu-zielkopf", z);
        kopf.type = "button";
        kopf.setAttribute("aria-label", "Ziel " + z +
          (gewaehltesEl === null ? "" : " — hier ablegen"));
        kopf.addEventListener("click", function () {
          if (gewaehltesEl === null) { melder.textContent = "Erst ein Element antippen."; return; }
          stand[gewaehltesEl] = z;
          if (!antwortSetzen(b, i, kopie(stand))) return;
          melder.textContent = "Zugeordnet zu " + z + ".";
          gewaehltesEl = null;
          zeichnen();
        });
        kasten.appendChild(kopf);
        var drin = el("div", "pk--zu-drin");
        Object.keys(stand).forEach(function (xi) {
          if (stand[xi] !== z) return;
          var raus = el("button", "pk--zu-gesetzt");
          raus.type = "button";
          raus.innerHTML = AP.mk(e.elemente[xi].text);
          raus.appendChild(el("span", "pk--zu-weg", "zurücklegen"));
          raus.addEventListener("click", function () {
            delete stand[xi];
            if (!antwortSetzen(b, i, kopie(stand))) return;
            melder.textContent = "Zurückgelegt.";
            zeichnen();
          });
          drin.appendChild(raus);
        });
        if (!drin.children.length) drin.appendChild(el("p", "pk--leise", "leer"));
        kasten.appendChild(drin);
        ziele.appendChild(kasten);
      });
    }

    zeichnen();
    box.appendChild(raster);
    box.appendChild(melder);
    return box;
  }

  function feldReihenfolge(b, e, i) {
    var box = el("div", "pk--reihenfolge");
    if (e.lead) box.appendChild(mkEl("p", "pk--frage", e.lead));
    var stand = Array.isArray(antwortVon(b, i)) ? antwortVon(b, i).slice() : null;
    if (!stand || stand.length !== e.elemente.length) {
      stand = e.elemente.map(function (_, xi) { return xi; });
    }
    /* Die Ausgangsreihenfolge ist keine Antwort. Gespeichert wird erst nach einer
       Verschiebung oder einer ausdrücklichen Bestätigung. */
    var bestaetigen = knopf("kn-neben pk--rf-bestaetigen", "Reihenfolge so übernehmen", function () {
      if (!antwortSetzen(b, i, stand.slice())) return;
      melder.textContent = "Reihenfolge übernommen.";
      bestaetigen.hidden = true;
    });
    bestaetigen.hidden = Array.isArray(antwortVon(b, i));
    var liste = el("ol", "pk--rf-liste");
    var melder = el("p", "pk--status");
    melder.setAttribute("role", "status");
    melder.setAttribute("aria-live", "polite");

    function zeichnen(fokus) {
      liste.innerHTML = "";
      stand.forEach(function (xi, platz) {
        var li = el("li", "pk--rf-zeile");
        li.appendChild(mkEl("span", "pk--rf-text", e.elemente[xi].text));
        var steuer = el("span", "pk--rf-steuer");
        var hoch = knopf("pk--rf-knopf", "▲", function () { schieben(platz, -1); });
        var runter = knopf("pk--rf-knopf", "▼", function () { schieben(platz, 1); });
        hoch.setAttribute("aria-label", "„" + e.elemente[xi].text + "“ nach oben");
        runter.setAttribute("aria-label", "„" + e.elemente[xi].text + "“ nach unten");
        hoch.disabled = platz === 0;
        runter.disabled = platz === stand.length - 1;
        hoch.dataset.platz = platz;
        steuer.appendChild(hoch);
        steuer.appendChild(runter);
        li.appendChild(steuer);
        liste.appendChild(li);
      });
      if (fokus != null) {
        var ziel = liste.querySelectorAll(".pk--rf-zeile")[fokus];
        var k = ziel && ziel.querySelector(".pk--rf-knopf:not(:disabled)");
        if (k) k.focus({ preventScroll: true });
      }
    }

    function schieben(platz, richtung) {
      var neu = platz + richtung;
      if (neu < 0 || neu >= stand.length) return;
      var kandidat = stand.slice();
      var t = kandidat[platz]; kandidat[platz] = kandidat[neu]; kandidat[neu] = t;
      if (!antwortSetzen(b, i, kandidat.slice())) return;
      stand = kandidat;
      bestaetigen.hidden = true;
      melder.textContent = "Auf Platz " + (neu + 1) + " von " + stand.length + ".";
      zeichnen(neu);
    }

    zeichnen(null);
    box.appendChild(liste);
    box.appendChild(bestaetigen);
    box.appendChild(melder);
    return box;
  }

  /* Buchungssatz.

     Eine Zeile ist: Seite, Konto, Betrag. Genau so steht sie auch in der
     Lösung, deshalb bleibt die Bewertung nachvollziehbar. Die Vervollständigung
     durchsucht den ganzen Kontenplan und bevorzugt nichts — sonst wäre sie eine
     versteckte Hilfe. */
  function feldBuchungssatz(b, e, i) {
    var box = el("div", "pk--buchungssatz");
    if (e.label) box.appendChild(el("p", "pk--titelchen", e.label));
    var zahlZeilen = e.zeilen || (e.loesung ? e.loesung.length : 2);
    var stand = Array.isArray(antwortVon(b, i)) ? kopie(antwortVon(b, i)) : [];
    function sichernZeilen() { return antwortSetzen(b, i, kopie(stand)); }
    // Keine Seite vorbelegt: Soll oder Haben ist Teil der Antwort, nicht der
    // Aufgabenstellung. Ein voreingestelltes „Soll" wäre eine halbe Lösung.
    while (stand.length < zahlZeilen) stand.push({ seite: "", konto: "", betrag: "" });

    var kopf = el("div", "pk--bs-kopf");
    ["Seite", "Konto", "Betrag in €"].forEach(function (t) {
      kopf.appendChild(el("span", null, t));
    });
    box.appendChild(kopf);

    stand.forEach(function (z, zi) {
      var zeile = el("div", "pk--bs-zeile");

      var seiten = el("div", "pk--bs-seite");
      seiten.setAttribute("role", "group");
      seiten.setAttribute("aria-label", "Zeile " + (zi + 1) + ": Seite");
      [["soll", "Soll"], ["haben", "Haben"]].forEach(function (s) {
        var k = knopf("pk--bs-seitenknopf" + (z.seite === s[0] ? " an" : ""), s[1], function () {
          var vorher = z.seite;
          z.seite = s[0];
          if (!sichernZeilen()) { z.seite = vorher; return; }
          seiten.querySelectorAll(".pk--bs-seitenknopf").forEach(function (x) {
            x.classList.toggle("an", x.dataset.seite === z.seite);
            x.setAttribute("aria-pressed", x.dataset.seite === z.seite ? "true" : "false");
          });
        });
        k.dataset.seite = s[0];
        k.setAttribute("aria-pressed", z.seite === s[0] ? "true" : "false");
        seiten.appendChild(k);
      });
      zeile.appendChild(seiten);

      var kontoFeld = el("input", "pk--bs-konto");
      kontoFeld.type = "text";
      kontoFeld.autocomplete = "off";
      kontoFeld.setAttribute("list", "pk--kontenliste");
      kontoFeld.setAttribute("aria-label", "Zeile " + (zi + 1) + ": Konto");
      kontoFeld.placeholder = "Nummer oder Bezeichnung";
      kontoFeld.value = z.konto || "";
      kontoFeld.addEventListener("input", function () {
        z.konto = kontoFeld.value;
        sichernZeilen();
      });
      zeile.appendChild(kontoFeld);

      var betrag = el("input", "pk--bs-betrag");
      AP.kommafeld(betrag);
      betrag.setAttribute("aria-label", "Zeile " + (zi + 1) + ": Betrag in Euro");
      betrag.placeholder = "Betrag";
      betrag.value = z.betrag || "";
      betrag.addEventListener("input", function () {
        z.betrag = betrag.value;
        sichernZeilen();
      });
      zeile.appendChild(betrag);
      box.appendChild(zeile);
    });

    if (e.punkte != null) {
      box.appendChild(el("p", "pk--leise", punkteText(e.punkte) + " Punkte"));
    }
    return box;
  }

  function feldText(b, e, i) {
    var box = el("div", "pk--textfeld");
    var id = kennung("pkt");
    if (e.frage) {
      var lab = el("label", "pk--frage");
      lab.htmlFor = id;
      lab.innerHTML = AP.mk(e.frage);
      box.appendChild(lab);
    }
    var feld = el("textarea");
    feld.id = id;
    feld.rows = e.zeilen || 6;
    feld.value = antwortVon(b, i) || "";
    feld.addEventListener("input", function () { antwortSetzen(b, i, feld.value); });
    box.appendChild(feld);
    return box;
  }

  /* Bearbeitungsstand: offen, teilweise oder vollständig. Er sagt nur, ob alles
     Geforderte ausgefüllt ist, nie ob es stimmt. Mehrfachauswahl gilt deshalb
     mit dem ersten Kreuz als bearbeitet: Sonst verriete der Stand die Zahl der
     richtigen Optionen. */
  function blockStand(e, v) {
    if (v === undefined || v === null || v === "") return "offen";
    if (e.block === "zuordnung") {
      var n = Object.keys(v).length;
      return !n ? "offen" : n >= e.elemente.length ? "vollstaendig" : "teilweise";
    }
    if (e.block === "reihenfolge") {
      return Array.isArray(v) && v.length === e.elemente.length ? "vollstaendig" : "offen";
    }
    if (e.block === "buchungssatz") {
      var voll = 0, angefangen = 0;
      (Array.isArray(v) ? v : []).forEach(function (z) {
        var teile = [z.seite, String(z.konto || "").trim(), String(z.betrag || "").trim()]
          .filter(Boolean).length;
        if (teile === 3) voll++;
        else if (teile) angefangen++;
      });
      if (!voll && !angefangen) return "offen";
      return voll >= (e.loesung || []).length && !angefangen ? "vollstaendig" : "teilweise";
    }
    if (Array.isArray(v)) return v.length ? "vollstaendig" : "offen";
    return String(v).trim() !== "" ? "vollstaendig" : "offen";
  }

  function bearbeitungsstand(b) {
    var a = standVon(b).antworten[b.id] || {};
    var staende = (b.eingabe || []).map(function (e, i) { return blockStand(e, a[i]); });
    if (staende.every(function (x) { return x === "vollstaendig"; })) return "vollstaendig";
    return staende.every(function (x) { return x === "offen"; }) ? "offen" : "teilweise";
  }

  function staendeZaehlen() {
    var raus = { offen: [], teilweise: [], vollstaendig: [] };
    zustand.aufgaben.forEach(function (id, n) {
      var b = baustein(id);
      if (b) raus[bearbeitungsstand(b)].push(n + 1);
    });
    return raus;
  }

  /* ================================================== Oberfläche */

  var buehne = null;     // der #ueben-Schirm
  var zurueckZurUebersicht = null;
  var ansicht = "auswahl";
  var wahlKapitel = {}, wahlDauer = DAUER_STANDARD, wahlEigen = DAUER_STANDARD;
  var uhr = null;
  /* Das Kapitel, mit dem die Adresse hereingekommen ist. Nur zum Anzeigen —
     die Wahrheit über die Auswahl steht in wahlKapitel. */
  var vorgewaehlt = null;

  /* Nur die Kapitel des aktiven Berufs. Ein älterer Bau ohne Berufsangabe
     gehört komplett zu Büromanagement. */
  function kapitelListe() {
    var b = aktiverBeruf();
    return (vorrat ? vorrat.kapitel : []).filter(function (k) {
      return (k.beruf || "kfb") === b;
    });
  }

  function lernfelder() {
    var raus = [], nach = {};
    kapitelListe().forEach(function (k) {
      if (!nach[k.lernfeld]) {
        nach[k.lernfeld] = { id: k.lernfeld, titel: k.lernfeldTitel, kapitel: [] };
        raus.push(nach[k.lernfeld]);
      }
      nach[k.lernfeld].kapitel.push(k);
    });
    return raus;
  }

  function gewaehlteKapitel() {
    return kapitelListe().map(function (k) { return k.schluessel; })
      .filter(function (s) { return wahlKapitel[s]; });
  }

  function kapitelName(schluessel) {
    var t = kapitelListe().filter(function (k) { return k.schluessel === schluessel; })[0];
    return t ? "K" + t.nummer + " · " + t.titel : schluessel;
  }

  function kapitelZiel(schluessel) {
    var t = kapitelListe().filter(function (k) { return k.schluessel === schluessel; })[0];
    return t ? t.zu : null;
  }

  function neuZeichnen() {
    if (!buehne) return;
    buehne.innerHTML = "";
    laufendeNr = 0;
    if (uhr) { clearInterval(uhr); uhr = null; }
    if (ansicht === "auswahl") ansichtAuswahl();
    else if (ansicht === "pruefen") ansichtZusammenfassung();
    else if (ansicht === "klausur") ansichtKlausur();
    else if (ansicht === "auswertung") ansichtAuswertung();
    window.scrollTo(0, 0);
  }

  /* Derselbe Bereichskopf wie in app.js — Mono-Augenbraue in Gold, Titel in
     Source Serif 4, Beitext in IBM Plex Sans. Die Probeklausur soll nicht wie
     eine angehängte Fremdseite wirken, sondern wie ein Teil derselben App. */
  function kopfzeile(titel, unter, augenbraue) {
    var k = el("div", "schirm-kopf pk--kopf");
    if (augenbraue) k.appendChild(el("p", "schirm-augenbraue", augenbraue));
    k.appendChild(el("h1", null, titel));
    if (unter) k.appendChild(el("p", null, unter));
    return k;
  }

  function zurueckKnopf(text, beiKlick) {
    var b = knopf("kn-neben pk--zurueck", text, beiKlick);
    return b;
  }

  /* ---------------------------------------- Auswahl */

  function ansichtAuswahl() {
    buehne.appendChild(zurueckKnopf("‹ Übersicht", function () {
      if (zurueckZurUebersicht) zurueckZurUebersicht();
    }));
    buehne.appendChild(kopfzeile("Prüf genau das, was du brauchst.",
      "Wähle die Kapitel deiner nächsten Klassenarbeit, leg die Dauer fest und "
      + "starte ohne Umwege.", "Eigene Probeklausur"));

    if (!kapitelListe().length) {
      buehne.appendChild(hinweiskasten(
        "Für dieses Lernfeld sind noch keine Aufgaben hinterlegt. Sobald welche "
        + "da sind, kannst du hier eine Probeklausur zusammenstellen."));
      return;
    }

    var laufend = zustandLaden();
    if (laufend && laufend.gestartet && !laufend.abgegeben) {
      buehne.appendChild(fortsetzkasten(laufend));
    }

    /* Aus einem Kapitel hereingekommen: sagen, was vorgewählt wurde. Ein still
       gesetztes Häkchen weiter unten sieht sonst aus wie ein Rest von gestern. */
    if (vorgewaehlt && wahlKapitel[vorgewaehlt]) {
      var kasten = el("div", "pk--hinweis pk--vorwahl");
      kasten.appendChild(el("p", null,
        "Vorgewählt aus dem Kapitel: " + kapitelName(vorgewaehlt)
        + ". Du kannst weitere Kapitel dazunehmen."));
      buehne.appendChild(kasten);
    }

    var lf = lernfelder();
    lf.forEach(function (feld) {
      buehne.appendChild(lernfeldGruppe(feld));
    });

    buehne.appendChild(dauerwahl());
    buehne.appendChild(aktionszone());
    standAktualisieren();
  }

  function hinweiskasten(text, knopftext, beiKlick) {
    var k = el("div", "pk--hinweis");
    k.appendChild(el("p", null, text));
    if (knopftext) k.appendChild(knopf("kn-haupt", knopftext, beiKlick));
    return k;
  }

  function fortsetzkasten(laufend) {
    var k = el("div", "pk--hinweis pk--laufend");
    var rest = Math.max(0, Math.round((laufend.ende - Date.now()) / 60000));
    var vorbei = laufend.abgelaufen || (laufend.ende && Date.now() >= laufend.ende);
    k.appendChild(el("p", null, vorbei
      ? "Bei deiner Probeklausur ist die Zeit abgelaufen. Deine Antworten sind "
        + "gesichert. Du kannst sie ansehen und abgeben."
      : "Du hast eine begonnene Probeklausur: " + laufend.aufgaben.length + " Aufgaben, "
        + (laufend.ende ? "noch etwa " + rest + " Min. Die Zeit läuft weiter." : "ohne Restzeit.")));
    var reihe = el("div", "knopfreihe");
    reihe.appendChild(knopf("kn-haupt", vorbei ? "Ansehen und abgeben" : "Weiterschreiben", function () {
      zustand = laufend;
      ansicht = "klausur";
      neuZeichnen();
    }));
    reihe.appendChild(knopf("kn-neben", "Verwerfen", function () {
      if (!window.confirm("Die begonnene Probeklausur wirklich verwerfen? "
          + "Deine Antworten darin gehen verloren. Dein Lernstand bleibt unberührt.")) return;
      zustandVerwerfen();
      neuZeichnen();
    }));
    k.appendChild(reihe);
    return k;
  }

  function lernfeldGruppe(feld) {
    var gruppe = el("section", "pk--gruppe");
    var kopf = el("div", "pk--gruppenkopf");

    var auf = el("button", "pk--gruppenauf");
    auf.type = "button";
    auf.setAttribute("aria-expanded", "true");
    var pfeil = el("span", "pk--pfeil", "▾");
    auf.appendChild(pfeil);
    auf.appendChild(el("span", "pk--gruppenname", feld.titel));
    var zaehler = el("span", "pk--gruppenzahl");
    auf.appendChild(zaehler);

    var alle = el("button", "pk--gruppenalle");
    alle.type = "button";

    kopf.appendChild(auf);
    kopf.appendChild(alle);
    gruppe.appendChild(kopf);

    var liste = el("div", "pk--kapitelliste");
    feld.kapitel.forEach(function (k) {
      liste.appendChild(kapitelZeile(k));
    });
    gruppe.appendChild(liste);

    auf.addEventListener("click", function () {
      var offen = auf.getAttribute("aria-expanded") === "true";
      auf.setAttribute("aria-expanded", offen ? "false" : "true");
      liste.hidden = offen;
      pfeil.textContent = offen ? "▸" : "▾";
    });

    alle.addEventListener("click", function () {
      var voll = feld.kapitel.every(function (k) { return wahlKapitel[k.schluessel]; });
      feld.kapitel.forEach(function (k) { wahlKapitel[k.schluessel] = !voll; });
      liste.querySelectorAll("input[type=checkbox]").forEach(function (c) {
        c.checked = !voll;
      });
      standAktualisieren();
    });

    gruppe._auffrischen = function () {
      var n = feld.kapitel.filter(function (k) { return wahlKapitel[k.schluessel]; }).length;
      var voll = n === feld.kapitel.length;
      zaehler.textContent = n ? n + " von " + feld.kapitel.length + " gewählt"
                              : feld.kapitel.length + " Kapitel";
      gruppe.dataset.stand = voll ? "voll" : n ? "teils" : "keins";
      alle.textContent = voll ? "Alle abwählen" : "Ganzes Lernfeld";
      alle.setAttribute("aria-label",
        (voll ? "Alle Kapitel abwählen in " : "Alle Kapitel wählen in ") + feld.titel);
    };
    return gruppe;
  }

  function kapitelZeile(k) {
    var lab = el("label", "pk--kapitel");
    var box = el("input");
    box.type = "checkbox";
    box.checked = !!wahlKapitel[k.schluessel];
    box.addEventListener("change", function () {
      wahlKapitel[k.schluessel] = box.checked;
      standAktualisieren();
    });
    lab.appendChild(box);
    var text = el("span", "pk--kapiteltext");
    var oben = el("span", "pk--kapitelzeile");
    oben.appendChild(el("span", "pk--kapitelnr", "K" + k.nummer));
    oben.appendChild(el("span", "pk--kapiteltitel", k.titel));
    text.appendChild(oben);
    text.appendChild(el("span", "pk--kapitelmeta",
      k.bausteine + " Aufgaben · " + k.punkte + " Punkte"
      + (((vorrat && vorrat.faelle) || []).some(function (f) {
          return f.kapitel.indexOf(k.schluessel) !== -1;
        }) ? " · mit Fallblock" : "")));
    lab.appendChild(text);
    return lab;
  }

  function dauerwahl() {
    var box = el("section", "pk--dauer");
    box.appendChild(el("h2", "abschnittstitel", "Wie lange soll die Klausur dauern?"));

    var reihe = el("div", "pk--dauerknoepfe");
    reihe.setAttribute("role", "group");
    reihe.setAttribute("aria-label", "Bearbeitungsdauer");

    var eigenBox = el("div", "pk--eigenzeit");
    var eigenId = kennung("pkd");
    var eigenLab = el("label", null, "Eigene Dauer: ");
    eigenLab.htmlFor = eigenId;
    var eigenWert = el("output", "pk--eigenwert", minutenText(wahlEigen));
    eigenLab.appendChild(eigenWert);
    var schieber = el("input");
    schieber.type = "range";
    schieber.id = eigenId;
    schieber.min = String(EIGEN_MIN);
    schieber.max = String(EIGEN_MAX);
    schieber.step = String(EIGEN_SCHRITT);
    schieber.value = String(wahlEigen);
    schieber.addEventListener("input", function () {
      wahlEigen = parseInt(schieber.value, 10);
      wahlDauer = wahlEigen;
      eigenWert.textContent = minutenText(wahlEigen);
      knoepfeAuffrischen();
      standAktualisieren();
    });
    eigenBox.appendChild(eigenLab);
    eigenBox.appendChild(schieber);

    function knoepfeAuffrischen() {
      reihe.querySelectorAll("button").forEach(function (b) {
        var an = parseInt(b.dataset.dauer, 10) === wahlDauer;
        b.classList.toggle("an", an);
        b.setAttribute("aria-pressed", an ? "true" : "false");
      });
      eigenBox.classList.toggle("an", DAUERN.indexOf(wahlDauer) === -1);
    }

    DAUERN.forEach(function (d) {
      var b = knopf(null, d + " Min.", function () {
        wahlDauer = d;
        knoepfeAuffrischen();
        standAktualisieren();
      });
      b.dataset.dauer = String(d);
      reihe.appendChild(b);
    });

    box.appendChild(reihe);
    box.appendChild(eigenBox);
    knoepfeAuffrischen();
    return box;
  }

  /* Wie viele Aufgaben die aktuelle Auswahl ergibt. Fester Seed: Die Zahl soll
     eine Eigenschaft der Auswahl sein und nicht bei jedem Neuzeichnen eine
     andere. */
  function aufgabenSchaetzung(gewaehlt) {
    var probe = stelleZusammen({ kapitel: gewaehlt, dauer: wahlDauer, seed: "schaetzung" });
    return probe.aufgaben.length;
  }

  var zoneText = null, zoneKnopf = null, zoneWarnung = null;

  function aktionszone() {
    var zone = el("div", "pk--aktionszone");
    zoneWarnung = el("p", "pk--zonewarnung");
    zoneWarnung.setAttribute("role", "status");
    zoneText = el("p", "pk--zonetext");
    zoneKnopf = knopf("kn-haupt pk--zonknopf", "Auswahl prüfen", function () {
      ansicht = "pruefen";
      neuZeichnen();
    });
    zone.appendChild(zoneWarnung);
    var innen = el("div", "pk--zoneinnen");
    innen.appendChild(zoneText);
    innen.appendChild(zoneKnopf);
    zone.appendChild(innen);
    return zone;
  }

  function standAktualisieren() {
    buehne.querySelectorAll(".pk--gruppe").forEach(function (g) {
      if (g._auffrischen) g._auffrischen();
    });
    var gewaehlt = gewaehlteKapitel();
    if (!zoneText) return;

    /* Kapitelzahl, Dauer und wie viele Aufgaben daraus ungefähr entstehen.
       Die Zahl ist nicht geraten: Sie kommt aus demselben Zusammensteller, der
       die Klausur später baut — nur mit festem Seed, damit sie beim Tippen
       nicht bei jedem Klick zappelt. Vor dem Start kann sie sich noch um eine
       Aufgabe verschieben, deshalb steht „ca." davor. */
    zoneText.textContent = gewaehlt.length
      ? gewaehlt.length + (gewaehlt.length === 1 ? " Kapitel" : " Kapitel")
        + " · " + minutenText(wahlDauer) + " · ca. " + aufgabenSchaetzung(gewaehlt)
        + " Aufgaben"
      : "Noch kein Kapitel gewählt";
    zoneKnopf.disabled = !gewaehlt.length;

    var noetig = gewaehlt.length ? mindestdauer(gewaehlt) : 0;
    /* Wie viel Abwechslung die Auswahl hergibt, steht vor dem Start. */
    if (gewaehlt.length && noetig <= wahlDauer) {
      var verfuegbar = bausteineZu(gewaehlt).length;
      var schaetzung = aufgabenSchaetzung(gewaehlt);
      zoneWarnung.textContent = verfuegbar <= schaetzung
        ? "Zu dieser Auswahl gibt es nur " + verfuegbar + " Aufgaben. Sie wiederholen "
          + "sich bei jeder Variante, nur Zahlen können sich ändern. Mehr Kapitel "
          + "bringen mehr Abwechslung."
        : verfuegbar + " Aufgaben stehen zur Auswahl.";
      zoneWarnung.hidden = false;
    } else if (gewaehlt.length && noetig > wahlDauer) {
      zoneWarnung.textContent = "Für " + gewaehlt.length + " Kapitel brauchst du "
        + "mindestens " + noetig + " Minuten — sonst bliebe ein Kapitel außen vor.";
      zoneWarnung.hidden = false;
      zoneKnopf.disabled = true;
    } else {
      zoneWarnung.hidden = true;
      zoneWarnung.textContent = "";
    }
  }

  /* ---------------------------------------- Zusammenfassung */

  var vorschau = null;

  function ansichtZusammenfassung() {
    var gewaehlt = gewaehlteKapitel();
    var altBogen = zustandLaden();
    vorschau = vorbereiten({
      kapitel: gewaehlt, dauer: wahlDauer, seed: neuerSeed(),
      vorher: altBogen ? altBogen.aufgaben || [] : []
    });

    buehne.appendChild(zurueckKnopf("‹ Auswahl ändern", function () {
      ansicht = "auswahl";
      neuZeichnen();
    }));
    buehne.appendChild(kopfzeile("Bereit?", null, "Deine Probeklausur"));

    if (vorschau.fehler === "zu_kurz") {
      buehne.appendChild(hinweiskasten(
        "Damit jedes gewählte Kapitel vorkommt, brauchst du mindestens "
        + vorschau.mindestdauer + " Minuten. Gewählt sind " + wahlDauer
        + ". Nimm mehr Zeit oder weniger Kapitel — still ein Kapitel wegzulassen "
        + "wäre die schlechtere Lösung.",
        "Zurück zur Auswahl", function () { ansicht = "auswahl"; neuZeichnen(); }));
      return;
    }
    if (vorschau.fehler === "ungueltig") {
      buehne.appendChild(hinweiskasten(
        "Für diese Auswahl lässt sich gerade keine vollständige Klausur vorbereiten, "
        + "weil eine Aufgabe nicht erstellt werden konnte. Nimm weitere Kapitel dazu "
        + "oder wähle eine andere Dauer.",
        "Zurück zur Auswahl", function () { ansicht = "auswahl"; neuZeichnen(); }));
      return;
    }
    if (vorschau.fehler || !vorschau.aufgaben.length) {
      buehne.appendChild(hinweiskasten(
        "Zu dieser Auswahl gibt es keine Aufgaben.",
        "Zurück zur Auswahl", function () { ansicht = "auswahl"; neuZeichnen(); }));
      return;
    }

    var liste = el("dl", "pk--zusammenfassung");
    function zeile(name, wert) {
      liste.appendChild(el("dt", null, name));
      liste.appendChild(el("dd", null, wert));
    }
    zeile("Kapitel", String(gewaehlt.length));
    zeile("Gewählte Dauer", minutenText(wahlDauer));
    zeile("Aufgaben", String(vorschau.aufgaben.length));
    zeile("Erreichbare Punkte", String(vorschau.punkte));
    zeile("Geschätzte Bearbeitungszeit", minutenText(vorschau.minuten));
    if (altBogen) {
      var gleich = ueberschneidung(vorschau, altBogen);
      zeile("Aus der letzten Klausur", gleich.gleich + gleich.neueWerte
        ? (gleich.gleich + gleich.neueWerte) + " von " + vorschau.aufgaben.length
          + " Aufgaben wiederholt"
          + (gleich.neueWerte ? ", davon " + gleich.neueWerte + " mit neuen Zahlen" : "")
        : "keine Wiederholung");
    }
    if (vorschau.fall) {
      var derFall = ((vorrat && vorrat.faelle) || []).filter(function (f) {
        return f.id === vorschau.fall;
      })[0];
      if (derFall) zeile("Zusammenhängender Fall", derFall.titel);
    }
    buehne.appendChild(liste);

    var kap = el("ul", "pk--kapitelchips");
    gewaehlt.forEach(function (s) {
      kap.appendChild(el("li", "pk--chip", kapitelName(s)));
    });
    buehne.appendChild(kap);

    if (vorschau.minuten < wahlDauer - 5) {
      buehne.appendChild(el("p", "pk--leise",
        "Die Aufgaben füllen die Zeit nicht ganz aus — mehr passt aus diesen "
        + "Kapiteln nicht sinnvoll hinein. Angezeigt ist die ehrliche Schätzung."));
    }

    buehne.appendChild(el("p", "pk--merksatz",
      "Während der Klausur werden keine Lösungen gezeigt. Erlaubt sind Kontenplan "
      + "und Taschenrechner — beide findest du oben in der Klausur."));

    var zone = el("div", "pk--aktionszone");
    var innen = el("div", "pk--zoneinnen");
    innen.appendChild(el("p", "pk--zonetext",
      vorschau.aufgaben.length + " Aufgaben · " + vorschau.punkte + " Punkte"));
    innen.appendChild(knopf("kn-haupt pk--zonknopf", "Probeklausur starten", starten));
    zone.appendChild(innen);
    buehne.appendChild(zone);
  }

  function starten() {
    var alt = zustandLaden();
    var vorher = alt ? alt.aufgaben : [];
    zustand = frischerZustand();
    zustand.seed = vorschau.seed;
    zustand.id = "pk-" + zustand.seed;
    zustand.kapitel = vorschau.kapitel;
    zustand.dauer = vorschau.dauer;
    zustand.aufgaben = vorschau.aufgaben;
    zustand.vorher = vorher;
    zustand.gestartet = true;
    zustand.rf = 1;
    // Absolute Endzeit, kein Herunterzählen: Wer die App schließt, verliert
    // Zeit — genau wie in einer echten Klausur. Und ein Neuladen setzt nichts
    // zurück.
    zustand.ende = Date.now() + vorschau.dauer * 60000;
    // Dieselben Werte wie in der Vorschau, nichts wird neu gezogen.
    zustand.werte = vorschau.werte || {};
    zustandSichern();
    ansicht = "klausur";
    neuZeichnen();
  }

  /* ---------------------------------------- Klausur */

  function restsekunden() {
    if (!zustand || !zustand.ende) return null;
    return Math.max(0, Math.round((zustand.ende - Date.now()) / 1000));
  }

  function uhrText(s) {
    if (s == null) return "—";
    var m = Math.floor(s / 60), r = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
  }

  function ansichtKlausur() {
    if (!zustand || !zustand.aufgaben.length) {
      ansicht = "auswahl"; neuZeichnen(); return;
    }
    var b = baustein(zustand.aufgaben[zustand.aktuell]);
    if (!b) { zustand.aktuell = 0; b = baustein(zustand.aufgaben[0]); }

    /* Beim Öffnen eines abgelaufenen Bogens gibt es keinen einzigen Moment mit
       offenen Feldern: Der Stand wird vor dem ersten Zeichnen festgeschrieben. */
    if (!zustand.abgelaufen && bogenGesperrt()) {
      zustand.abgelaufen = true;
      zustandSichern();
    }

    buehne.classList.add("pk--imbogen");
    buehne.appendChild(klausurkopf());
    if (zustand.abgelaufen) buehne.appendChild(ablaufmeldung());

    var bogen = el("article", "pk--bogen");
    var kopf = el("header", "pk--aufgabenkopf");
    kopf.appendChild(el("span", "pk--aufgabennr",
      "Aufgabe " + (zustand.aktuell + 1) + " von " + zustand.aufgaben.length));
    kopf.appendChild(el("span", "pk--aufgabenmeta",
      b.punkte + " Punkte · ca. " + b.dauer_min + " Min."));
    bogen.appendChild(kopf);
    var fall = fallZu(b);
    if (fall) {
      bogen.appendChild(el("p", "pk--fallzeile", "Fall: " + fall.titel + " · Teil "
        + b.schritt + " von " + fall.schritte.length));
      bogen.appendChild(fallUnterlagen(fall));
    }
    bogen.appendChild(el("p", "pk--operator", b.operator));

    var w = werteVon(b);
    (b.anzeige || []).forEach(function (a) {
      var teil = anzeigeBlock(a, w);
      if (teil) bogen.appendChild(teil);
    });
    var eingaben = el("div", "pk--eingaben");
    (b.eingabe || []).forEach(function (e, i) {
      eingaben.appendChild(eingabeBlock(b, e, i));
    });
    if (zustand.abgelaufen) {
      eingaben.setAttribute("aria-disabled", "true");
      eingaben.querySelectorAll("input,textarea,select,button").forEach(function (x) {
        x.disabled = true;
      });
    }
    bogen.appendChild(eingaben);
    buehne.appendChild(bogen);

    buehne.appendChild(kontenliste());
    buehne.appendChild(navigation(b));
    starteUhr();
  }

  /* Die gemeinsamen Unterlagen eines Falles, in jedem Teil griffbereit. */
  function fallUnterlagen(fall) {
    var d = el("details", "pk--anlage pk--fallunterlagen");
    d.open = true;
    d.appendChild(el("summary", null, "Fallunterlagen: " + fall.titel));
    var innen = el("div", "pk--anlage-inhalt");
    (fall.anzeige || []).forEach(function (a) {
      var teil = anzeigeBlock(a, {});
      if (teil) innen.appendChild(teil);
    });
    d.appendChild(innen);
    return d;
  }

  function klausurkopf() {
    var kopf = el("div", "pk--klausurkopf");

    var oben = el("div", "pk--kk-oben");
    oben.appendChild(el("span", "pk--kk-marke", "Probeklausur"));
    var uhrfeld = el("span", "pk--kk-uhr");
    uhrfeld.id = "pk-uhr";
    uhrfeld.setAttribute("role", "timer");
    uhrfeld.setAttribute("aria-live", "off");
    oben.appendChild(uhrfeld);
    kopf.appendChild(oben);

    var balken = el("div", "pk--fortschritt");
    var span = el("span");
    span.style.width = Math.round((zustand.aktuell + 1) / zustand.aufgaben.length * 100) + "%";
    balken.appendChild(span);
    balken.setAttribute("role", "progressbar");
    balken.setAttribute("aria-valuemin", "1");
    balken.setAttribute("aria-valuemax", String(zustand.aufgaben.length));
    balken.setAttribute("aria-valuenow", String(zustand.aktuell + 1));
    balken.setAttribute("aria-label", "Fortschritt in der Klausur");
    kopf.appendChild(balken);

    /* Position und Arbeitsstand sind zwei Angaben. „Aufgabe 8 von 8" heißt nicht,
       dass acht Aufgaben bearbeitet sind. */
    var staende = staendeZaehlen();
    var arbeit = el("p", "pk--arbeitsstand");
    arbeit.id = "pk-arbeitsstand";
    arbeit.textContent = arbeitsstandText(staende);
    kopf.appendChild(arbeit);

    var werkzeuge = el("div", "pk--werkzeuge");
    werkzeuge.appendChild(knopf("pk--wz", "Übersicht", uebersichtOeffnen));
    werkzeuge.appendChild(knopf("pk--wz", "Kontenplan", kontenplanOeffnen));
    werkzeuge.appendChild(knopf("pk--wz", "Rechner", rechnerOeffnen));
    var merk = knopf("pk--wz pk--merk", "", markieren);
    merk.id = "pk-merk";
    werkzeuge.appendChild(merk);
    werkzeuge.appendChild(knopf("pk--wz pk--verlassen", "Verlassen · Zeit läuft weiter", function () {
      zustandSichern();
      ansicht = "auswahl";
      buehne.classList.remove("pk--imbogen");
      neuZeichnen();
    }));
    kopf.appendChild(werkzeuge);
    // Erst jetzt beschriften: Über die Kennung wäre der Knopf noch nicht zu
    // finden — der Kopf hängt in diesem Moment noch nicht im Dokument.
    merkKnopfAuffrischen(merk);
    return kopf;
  }

  function arbeitsstandText(staende) {
    return "Aufgabe " + (zustand.aktuell + 1) + " von " + zustand.aufgaben.length + " · "
      + staende.vollstaendig.length + " von " + zustand.aufgaben.length
      + " vollständig bearbeitet";
  }

  function ablaufmeldung() {
    var k = el("div", "pk--hinweis pk--abgelaufen");
    k.setAttribute("role", "alert");
    k.appendChild(el("p", null,
      "Die Zeit ist abgelaufen. Deine Antworten sind gesichert und lassen sich "
      + "nicht mehr ändern. Du kannst sie noch ansehen und dann abgeben."));
    k.appendChild(knopf("kn-haupt", "Jetzt abgeben", abgeben));
    return k;
  }

  function markieren() {
    if (bogenGesperrt()) { ablaufAnwenden(); return; }
    var id = zustand.aufgaben[zustand.aktuell];
    var pos = zustand.markiert.indexOf(id);
    if (pos === -1) zustand.markiert.push(id); else zustand.markiert.splice(pos, 1);
    zustandSichern();
    merkKnopfAuffrischen();
  }

  function merkKnopfAuffrischen(knopfEl) {
    var b = knopfEl || document.getElementById("pk-merk");
    if (!b) return;
    var an = zustand.markiert.indexOf(zustand.aufgaben[zustand.aktuell]) !== -1;
    b.textContent = an ? "★ Gemerkt" : "☆ Später ansehen";
    b.classList.toggle("an", an);
    b.setAttribute("aria-pressed", an ? "true" : "false");
    b.disabled = !!zustand.abgelaufen;
  }

  function navigation(b) {
    var nav = el("div", "pk--aktionszone");
    var innen = el("div", "pk--zoneinnen pk--navzone");
    var zurueck = knopf("kn-neben", "‹ Zurück", function () {
      if (zustand.aktuell > 0) { zustand.aktuell--; zustandSichern(); neuZeichnen(); }
    });
    zurueck.disabled = zustand.aktuell === 0;
    innen.appendChild(zurueck);

    if (zustand.aktuell < zustand.aufgaben.length - 1) {
      innen.appendChild(knopf("kn-haupt", "Weiter ›", function () {
        zustand.aktuell++;
        zustandSichern();
        neuZeichnen();
      }));
    } else {
      innen.appendChild(knopf("kn-haupt", "Abgeben", abgeben));
    }
    nav.appendChild(innen);
    return nav;
  }

  function starteUhr() {
    var feld = document.getElementById("pk-uhr");
    if (!feld) return;
    function tick() {
      var s = restsekunden();
      feld.textContent = uhrText(s);
      // Der Zustand darf nicht nur an der Farbe hängen — das Wort steht daneben.
      feld.classList.toggle("knapp", s != null && s <= 300);
      feld.setAttribute("aria-label", s == null ? "Keine Restzeit"
        : "Restzeit " + Math.floor(s / 60) + " Minuten"
          + (s <= 300 ? ", weniger als fünf Minuten" : ""));
      feld.dataset.knapp = s != null && s <= 300 ? "wenig Zeit" : "";
      var stand = document.getElementById("pk-arbeitsstand");
      if (stand) stand.textContent = arbeitsstandText(staendeZaehlen());
      if (s === 0) ablaufAnwenden();
    }
    tick();
    uhr = setInterval(tick, 1000);
  }

  /* ---------------------------------------- Blätter von unten */

  function blatt(titel, aufbau) {
    var huelle = el("div", "pk--blatt");
    huelle.setAttribute("role", "dialog");
    huelle.setAttribute("aria-modal", "true");
    huelle.setAttribute("aria-label", titel);
    var innen = el("div", "pk--blatt-innen");
    var kopf = el("div", "pk--blatt-kopf");
    kopf.appendChild(el("h2", null, titel));
    var zu = knopf("pk--blatt-zu", "Schließen", schliessen);
    kopf.appendChild(zu);
    innen.appendChild(kopf);
    var koerper = el("div", "pk--blatt-koerper");
    aufbau(koerper, schliessen);
    innen.appendChild(koerper);
    huelle.appendChild(innen);
    huelle.addEventListener("click", function (ev) {
      if (ev.target === huelle) schliessen();
    });
    function beiTaste(ev) { if (ev.key === "Escape") schliessen(); }
    function schliessen() {
      document.removeEventListener("keydown", beiTaste);
      huelle.remove();
    }
    document.addEventListener("keydown", beiTaste);
    document.body.appendChild(huelle);
    zu.focus({ preventScroll: true });
    return huelle;
  }

  function uebersichtOeffnen() {
    blatt("Aufgabenübersicht", function (koerper, zu) {
      var gitter = el("div", "pk--uebersicht");
      var STANDTEXT = { offen: "offen", teilweise: "teilweise bearbeitet",
                        vollstaendig: "vollständig bearbeitet" };
      zustand.aufgaben.forEach(function (id, n) {
        var b = baustein(id);
        var bearbeitung = bearbeitungsstand(b);
        var fertig = bearbeitung === "vollstaendig";
        var gemerkt = zustand.markiert.indexOf(id) !== -1;
        var k = knopf("pk--ue-feld", String(n + 1), function () {
          zustand.aktuell = n;
          zustandSichern();
          zu();
          neuZeichnen();
        });
        k.classList.toggle("fertig", fertig);
        k.classList.toggle("teilweise", bearbeitung === "teilweise");
        k.classList.toggle("gemerkt", gemerkt);
        k.classList.toggle("hier", n === zustand.aktuell);
        k.setAttribute("aria-label", "Aufgabe " + (n + 1) + ": "
          + STANDTEXT[bearbeitung] + (gemerkt ? ", gemerkt" : "")
          + (n === zustand.aktuell ? ", aktuell" : ""));
        if (gemerkt) k.appendChild(el("span", "pk--ue-stern", "★"));
        gitter.appendChild(k);
      });
      koerper.appendChild(gitter);
      var staende = staendeZaehlen();
      koerper.appendChild(el("p", "pk--leise",
        staende.vollstaendig.length + " vollständig · " + staende.teilweise.length
        + " teilweise · " + staende.offen.length + " offen."));
      koerper.appendChild(el("p", "pk--leise",
        "Ausgefüllt = vollständig, Rand = teilweise, ★ = später noch einmal ansehen."));
      koerper.appendChild(knopf("kn-neben", "Abgeben", function () { zu(); abgeben(); }));
    });
  }

  function kontenplanOeffnen() {
    blatt("Kontenplan", function (koerper) {
      var suche = el("input", "pk--kp-suche");
      suche.type = "search";
      suche.placeholder = "Nummer oder Bezeichnung …";
      suche.setAttribute("aria-label", "Im Kontenplan suchen");
      koerper.appendChild(suche);
      var liste = el("ul", "pk--kp-liste");
      koerper.appendChild(liste);
      function zeichnen() {
        var frage = schluessel(suche.value);
        liste.innerHTML = "";
        alleKonten().forEach(function (k) {
          // Auch unter der Schulbezeichnung finden: Wer „Bank" sucht, meint
          // 2800 und soll nicht erst wissen, dass es dort anders heißt.
          var heu = schluessel(k.nr + k.name + k.alias.join(""));
          if (frage && heu.indexOf(frage) === -1) return;
          var li = el("li");
          li.appendChild(el("span", "pk--kp-nr", k.nr));
          var name = el("span", "pk--kp-name", k.name);
          if (k.alias.length) {
            name.appendChild(el("small", "pk--kp-alias", "auch: " + k.alias.join(", ")));
          }
          li.appendChild(name);
          liste.appendChild(li);
        });
        if (!liste.children.length) {
          liste.appendChild(el("li", "pk--leise", "Kein Konto gefunden."));
        }
      }
      suche.addEventListener("input", zeichnen);
      zeichnen();
    });
  }

  /* Ein Taschenrechner, mehr nicht: vier Grundrechenarten und Prozent.
     Ausgewertet wird mit demselben Rechner wie die Aufgabenformeln — kein
     zweiter Weg, auf dem Text zu Code werden könnte. */
  function rechnerOeffnen() {
    blatt("Taschenrechner", function (koerper) {
      var anzeige = el("output", "pk--rechner-anzeige", "0");
      var feld = el("input", "pk--rechner-feld");
      AP.kommafeld(feld);
      feld.setAttribute("aria-label", "Rechenaufgabe, zum Beispiel 1250 * 0,19");
      feld.placeholder = "z. B. 1250 * 0,19";
      function rechnen() {
        var text = feld.value.trim().replace(/,/g, ".");
        if (!text) { anzeige.textContent = "0"; return; }
        try {
          var wert = rechne(text, {});
          anzeige.textContent = typeof wert === "number" ? zahlText(wert) : String(wert);
        } catch (e) {
          anzeige.textContent = "—";
        }
      }
      feld.addEventListener("input", rechnen);
      koerper.appendChild(feld);
      koerper.appendChild(anzeige);
      koerper.appendChild(el("p", "pk--leise",
        "Plus, minus, mal, geteilt und Klammern. Komma oder Punkt, beides geht."));
      feld.focus({ preventScroll: true });
    });
  }

  /* ---------------------------------------- Abgabe */

  function abgeben() {
    if (fremdeAbgabeUebernehmen() || !zustand || zustand.abgegeben) return;
    if (!zustand.abgelaufen && bogenGesperrt()) { ablaufAnwenden(); return; }
    var staende = staendeZaehlen();
    if ((staende.offen.length || staende.teilweise.length) && !zustand.abgelaufen) {
      var teile = [];
      if (staende.offen.length) {
        teile.push(staende.offen.length + " offen (Aufgabe " + staende.offen.join(", ") + ")");
      }
      if (staende.teilweise.length) {
        teile.push(staende.teilweise.length + " teilweise (Aufgabe "
          + staende.teilweise.join(", ") + ")");
      }
      if (!window.confirm("Noch nicht vollständig bearbeitet: " + teile.join(" und ")
          + ". Trotzdem abgeben?")) return;
    }
    zustand.abgegeben = true;
    if (!zustand.beendetAm) zustand.beendetAm = new Date().toISOString();
    zustand.ende = null;
    zustandSichern();
    probeklausurZusammenfassung();
    if (uhr) { clearInterval(uhr); uhr = null; }
    buehne.classList.remove("pk--imbogen");
    ansicht = "auswertung";
    neuZeichnen();
  }

  /* ---------------------------------------- Auswertung */

  function ansichtAuswertung() {
    var offeneAufgaben = zustand.aufgaben.map(baustein).filter(function (b) {
      return b && b.bewertung.art === "selbstbewertung";
    });

    buehne.appendChild(kopfzeile("Auswertung", null));

    var summe = el("div", "pk--summe");
    summe.id = "pk-summe";
    buehne.appendChild(summe);

    if (offeneAufgaben.length) {
      buehne.appendChild(el("h2", "abschnittstitel", "Offene Antworten selbst bewerten"));
      buehne.appendChild(el("p", "pk--leise",
        "Ein Rechner kann einen Fließtext nicht bewerten. Lies deine Antwort neben "
        + "der Musterlösung und hake genau das ab, was wirklich darin steht. Nur "
        + "abgehakte Kriterien zählen."));
      offeneAufgaben.forEach(function (b) {
        buehne.appendChild(selbstbewertung(b));
      });
    }

    var weiter = el("div");
    weiter.id = "pk-weiter";
    buehne.appendChild(weiter);
    summeZeichnen();

    buehne.appendChild(el("h2", "abschnittstitel", "Ergebnis je Kapitel"));
    var kapitelBox = el("div");
    kapitelBox.id = "pk-kapitel";
    buehne.appendChild(kapitelBox);
    kapitelZeichnen();

    buehne.appendChild(el("h2", "abschnittstitel", "Aufgaben im Einzelnen"));
    zustand.aufgaben.forEach(function (id, n) {
      var b = baustein(id);
      if (b) buehne.appendChild(loesungsblock(b, n));
    });

    // Am Ende der Auswertung klebt nichts: Hier ist man fertig, und ein
    // schwebender Balken über den Lösungen wäre nur im Weg.
    var zone = el("div", "pk--aktionszone pk--zoneende");
    var innen = el("div", "pk--zoneinnen");
    innen.appendChild(knopf("kn-haupt", "Neue Variante erstellen", function () {
      wahlKapitel = {};
      zustand.kapitel.forEach(function (k) { wahlKapitel[k] = true; });
      wahlDauer = zustand.dauer;
      ansicht = "pruefen";
      neuZeichnen();
    }));
    innen.appendChild(knopf("kn-neben", "Auswahl ändern", function () {
      wahlKapitel = {};
      zustand.kapitel.forEach(function (k) { wahlKapitel[k] = true; });
      wahlDauer = zustand.dauer;
      ansicht = "auswahl";
      neuZeichnen();
    }));
    zone.appendChild(innen);
    buehne.appendChild(zone);
  }

  function summeZeichnen() {
    var e = ergebnis();
    probeklausurZusammenfassung(e);
    signaleSchreiben();
    weiterZeichnen();
    var kasten = document.getElementById("pk-summe");
    if (!kasten) return;
    kasten.innerHTML = "";
    var gross = el("p", "pk--punktzahl");
    gross.appendChild(el("b", null, punkteText(e.erreicht)));
    gross.appendChild(document.createTextNode(" von " + e.moeglich + " Punkten"));
    kasten.appendChild(gross);
    kasten.appendChild(el("p", "pk--prozent",
      String(e.prozent).replace(".", ",") + " %"));
    if (e.offen) {
      kasten.appendChild(el("p", "pk--leise", e.offen === 1
        ? "Eine offene Antwort ist noch nicht bewertet und zählt bis dahin null Punkte."
        : e.offen + " offene Antworten sind noch nicht bewertet und zählen bis "
          + "dahin null Punkte."));
    }
    kasten.appendChild(el("p", "pk--leise",
      "Keine Note: Notenschlüssel unterscheiden sich von Schule zu Schule."));
  }

  /* Was eine Aufgabe in dieser Klausur ergeben hat. Unbearbeitet, falsch und
     offene Selbstbewertung sind verschiedene Dinge und werden nie vermischt.
     Ein anerkannter Folgefehler kostet keine Punkte: Er steht als Hinweis da und
     zählt nicht als eigene Fehlstelle. */
  function aufgabenLage(b) {
    var e = bewerteBaustein(b);
    var folge = false;
    (b.eingabe || []).forEach(function (blk, i) {
      if (blk.block === "zahl" && bewerteZahl(b, blk, i).folgefehler) folge = true;
    });
    var art;
    if (bearbeitungsstand(b) === "offen") art = "leer";
    else if (e.selbst && e.offen) art = "zu_bewerten";
    else if (e.punkte >= e.moeglich - 1e-9) art = "ok";
    else if (e.selbst ? e.punkte >= e.moeglich * 0.75 : false) art = "ok";
    else if (e.punkte <= 1e-9) art = "falsch";
    else art = "teil";
    return { art: art, folgefehler: folge, punkte: e.punkte, moeglich: e.moeglich };
  }

  var LAGETEXT = { leer: "nicht bearbeitet", zu_bewerten: "noch selbst zu bewerten",
                   ok: "richtig", falsch: "falsch", teil: "teilweise richtig" };

  function aufgabenName(b) {
    return (b.uebung && b.uebung.kompetenz) || kapitelName(kapitelSchluessel(b));
  }

  /* Erst nach der Abgabe. Der Bogen selbst bleibt unberührt, ins Konto geht nur
     die Einstufung. */
  function signaleSchreiben() {
    if (!zustand || !zustand.abgegeben || !zustand.id || !AP.klausurSignal) return;
    var zeit = Date.parse(zustand.beendetAm || "") || Date.now();
    zustand.aufgaben.forEach(function (id) {
      var b = baustein(id);
      if (!b) return;
      var lage = aufgabenLage(b);
      if (lage.art === "zu_bewerten") return;
      AP.klausurSignal(id, { a: lage.art, k: kapitelSchluessel(b), b: b.beruf || "kfb",
                             l: aufgabenName(b) }, zustand.id, zeit);
    });
  }

  /* Bis zu drei Folgeübungen, je Kapitel eine, die größte Schwäche zuerst. */
  function folgeuebungen() {
    var RANG = { falsch: 3, teil: 2, leer: 1 };
    var je = {};
    zustand.aufgaben.forEach(function (id) {
      var b = baustein(id);
      if (!b) return;
      var lage = aufgabenLage(b);
      if (!RANG[lage.art]) return;
      var k = kapitelSchluessel(b);
      var verlust = lage.moeglich - lage.punkte;
      if (!je[k] || RANG[lage.art] > RANG[je[k].lage.art] ||
          (RANG[lage.art] === RANG[je[k].lage.art] && verlust > je[k].verlust)) {
        je[k] = { b: b, lage: lage, verlust: verlust, kapitel: k };
      }
    });
    return Object.keys(je).map(function (k) { return je[k]; }).sort(function (x, y) {
      return (RANG[y.lage.art] - RANG[x.lage.art]) || (y.verlust - x.verlust);
    }).slice(0, 3);
  }

  function weiterZeichnen() {
    var kasten = document.getElementById("pk-weiter");
    if (!kasten) return;
    kasten.innerHTML = "";
    var liste = folgeuebungen();
    var offen = zustand.aufgaben.map(baustein).filter(function (b) {
      return b && aufgabenLage(b).art === "zu_bewerten";
    }).length;
    if (!liste.length && !offen) return;
    kasten.appendChild(el("h2", "abschnittstitel", "Gezielt weiterüben"));
    if (liste.length) {
      var ul = el("ul", "liste-schlicht");
      liste.forEach(function (f) {
        var li = el("li");
        var a = el("a", "reihe pk--folge");
        a.href = "#ueben/thema?kapitel=" + encodeURIComponent(f.kapitel)
          + "&fokus=" + encodeURIComponent(f.b.id);
        var oben = el("div", "reihe-oben");
        oben.appendChild(el("span", "reihe-titel", aufgabenName(f.b)));
        oben.appendChild(el("span", "reihe-meta", LAGETEXT[f.lage.art]));
        a.appendChild(oben);
        a.appendChild(el("div", "reihe-quelle", kapitelName(f.kapitel) + " · jetzt üben"));
        li.appendChild(a);
        ul.appendChild(li);
      });
      kasten.appendChild(ul);
    }
    if (offen) {
      kasten.appendChild(el("p", "pk--leise", offen === 1
        ? "Eine offene Antwort ist noch zu bewerten. Danach kann sie hier erscheinen."
        : offen + " offene Antworten sind noch zu bewerten. Danach können sie hier erscheinen."));
    }
  }

  function kapitelZeichnen() {
    var kasten = document.getElementById("pk-kapitel");
    if (!kasten) return;
    var e = ergebnis();
    kasten.innerHTML = "";
    var ul = el("ul", "liste-schlicht");
    var schwach = [];
    e.kapitel.sort(function (a, b) {
      return (a.erreicht / a.moeglich) - (b.erreicht / b.moeglich);
    }).forEach(function (k) {
      var anteil = k.moeglich ? k.erreicht / k.moeglich : 0;
      if (anteil < 0.6) schwach.push(k);
      var li = el("li");
      var ziel = kapitelZiel(k.schluessel);
      var zeile = ziel ? el("a", "reihe") : el("div", "reihe");
      if (ziel) zeile.href = ziel;
      var oben = el("div", "reihe-oben");
      oben.appendChild(el("span", "reihe-titel", kapitelName(k.schluessel)));
      oben.appendChild(el("span", "reihe-meta",
        punkteText(k.erreicht) + "/" + k.moeglich + " · " + Math.round(anteil * 100) + " %"));
      zeile.appendChild(oben);
      var latte = el("div", "messlatte");
      var s = el("span");
      s.style.width = Math.round(anteil * 100) + "%";
      latte.appendChild(s);
      zeile.appendChild(latte);
      if (k.moeglich - k.erreicht > 0) {
        zeile.appendChild(el("div", "reihe-quelle",
          punkteText(k.moeglich - k.erreicht) + " Punkte verloren"
          + (ziel ? " · im Kapitel nachlesen" : "")));
      }
      li.appendChild(zeile);
      ul.appendChild(li);
    });
    kasten.appendChild(ul);
    if (schwach.length) {
      kasten.appendChild(el("p", "pk--merksatz", "Diese Kapitel solltest du wiederholen: "
        + schwach.map(function (k) { return kapitelName(k.schluessel); }).join(", ") + "."));
    }
  }

  function selbstbewertung(b) {
    var box = el("section", "pk--selbst");
    box.appendChild(el("h3", "pk--selbst-titel", b.operator));
    var w = werteVon(b);
    var fallS = fallZu(b);
    if (fallS) box.appendChild(fallUnterlagen(fallS));
    (b.anzeige || []).forEach(function (a) {
      var teil = anzeigeBlock(a, w);
      if (teil) box.appendChild(teil);
    });

    var meine = el("div", "pk--selbst-meine");
    meine.appendChild(el("p", "pk--titelchen", "Deine Antwort"));
    var text = "";
    b.eingabe.forEach(function (e, i) {
      if (e.block === "textfeld") text = antwortVon(b, i) || "";
    });
    meine.appendChild(el("p", "pk--selbst-text", text || "— keine Antwort —"));
    box.appendChild(meine);

    var muster = el("details", "pk--anlage");
    muster.appendChild(el("summary", null, "Musterlösung"));
    var mi = el("div", "pk--anlage-inhalt");
    mi.appendChild(mkEl("p", null, fuellen(b.bewertung.musterloesung || "", w)));
    muster.appendChild(mi);
    box.appendChild(muster);

    box.appendChild(el("p", "pk--titelchen", "Was steht wirklich in deiner Antwort?"));
    var haken = zustand.selbst[b.id] || [];
    var raster = el("div", "pk--raster");
    (b.bewertung.raster || []).forEach(function (k, ki) {
      var lab = el("label", "pk--kriterium");
      var box2 = el("input");
      box2.type = "checkbox";
      box2.checked = !!haken[ki];
      box2.addEventListener("change", function () {
        var stand = (zustand.selbst[b.id] || []).slice();
        stand[ki] = box2.checked;
        zustand.selbst[b.id] = stand;
        zustandSichern();
        summeZeichnen();
        kapitelZeichnen();
      });
      lab.appendChild(box2);
      lab.appendChild(el("span", "pk--kriteriumtext", k.kriterium));
      lab.appendChild(el("span", "pk--kriteriumpunkte", punkteText(k.punkte) + " P."));
      raster.appendChild(lab);
    });
    box.appendChild(raster);
    if (!zustand.selbst[b.id]) {
      zustand.selbst[b.id] = (b.bewertung.raster || []).map(function () { return false; });
      zustandSichern();
    }
    return box;
  }

  function loesungsblock(b, n) {
    var box = el("section", "pk--loesung");
    var e = bewerteBaustein(b);
    var kopf = el("header", "pk--aufgabenkopf");
    kopf.appendChild(el("span", "pk--aufgabennr", "Aufgabe " + (n + 1)));
    kopf.appendChild(el("span", "pk--aufgabenmeta",
      punkteText(e.punkte) + " von " + e.moeglich + " Punkten"));
    box.appendChild(kopf);
    box.appendChild(el("p", "pk--operator", b.operator));
    var lage = aufgabenLage(b);
    var lageZeile = el("p", "pk--lage pk--lage-" + lage.art, LAGETEXT[lage.art]
      + (lage.folgefehler ? " · Folgefehler anerkannt" : ""));
    lageZeile.dataset.lage = lage.art;
    box.appendChild(lageZeile);

    var w = werteVon(b);
    var d = el("details", "pk--anlage");
    d.appendChild(el("summary", null, "Aufgabe und Lösung ansehen"));
    var innen = el("div", "pk--anlage-inhalt");
    var fallL = fallZu(b);
    if (fallL) innen.appendChild(fallUnterlagen(fallL));
    (b.anzeige || []).forEach(function (a) {
      var teil = anzeigeBlock(a, w);
      if (teil) innen.appendChild(teil);
    });
    b.eingabe.forEach(function (blk, i) {
      innen.appendChild(loesungZuBlock(b, blk, i, w));
    });
    if (b.erklaerung) {
      innen.appendChild(mkEl("p", "pk--erklaerung", b.erklaerung));
    }
    innen.appendChild(el("p", "pk--leise", "Quelle: " + (b.quelle || "—")));
    d.appendChild(innen);
    box.appendChild(d);
    return box;
  }

  function loesungZuBlock(b, e, i, w) {
    var box = el("div", "pk--loesungsteil");
    var name = e.label || e.frage || e.lead || "";
    if (name) box.appendChild(mkEl("p", "pk--titelchen", name));

    if (e.block === "zahl") {
      var r = bewerteZahl(b, e, i);
      box.appendChild(vergleichszeile(
        antwortVon(b, i) || "—",
        zahlText(r.soll) + " " + (e.einheit || ""),
        r.punkte > 0,
        r.folgefehler ? "Folgefehler anerkannt" : null));
    } else if (e.block === "auswahl") {
      var a = bewerteAuswahl(b, e, i);
      var ul = el("ul", "pk--loesungsliste");
      e.optionen.forEach(function (o, oi) {
        var gewaehlt = e.mehrfach
          ? (antwortVon(b, i) || []).indexOf(oi) !== -1
          : antwortVon(b, i) === oi;
        var li = el("li", "pk--loesungszeile");
        li.appendChild(el("span", "pk--marke",
          o.richtig ? "richtig" : gewaehlt ? "falsch" : "—"));
        li.appendChild(mkEl("span", null, o.text + (gewaehlt ? " (deine Wahl)" : "")));
        if (gewaehlt && o.echo) li.appendChild(mkEl("p", "pk--echo", o.echo));
        ul.appendChild(li);
      });
      box.appendChild(ul);
      box.appendChild(el("p", "pk--leise", punkteText(a.punkte) + " Punkte"));
    } else if (e.block === "zuordnung") {
      var z = antwortVon(b, i) || {};
      var ul2 = el("ul", "pk--loesungsliste");
      e.elemente.forEach(function (x, xi) {
        var li = el("li", "pk--loesungszeile");
        li.appendChild(el("span", "pk--marke", z[xi] === x.loesung ? "richtig" : "falsch"));
        li.appendChild(mkEl("span", null, x.text));
        li.appendChild(el("span", "pk--loesungswert",
          "deine Antwort: " + (z[xi] || "—") + " · richtig: " + x.loesung));
        ul2.appendChild(li);
      });
      box.appendChild(ul2);
    } else if (e.block === "reihenfolge") {
      var rf = antwortVon(b, i) || [];
      var ol = el("ol", "pk--loesungsliste");
      e.elemente.slice().sort(function (x, y) { return x.position - y.position; })
        .forEach(function (x) {
          var xi = e.elemente.indexOf(x);
          var li = el("li", "pk--loesungszeile");
          li.appendChild(el("span", "pk--marke",
            rf[x.position - 1] === xi ? "richtig" : "falsch"));
          li.appendChild(mkEl("span", null, x.text));
          ol.appendChild(li);
        });
      box.appendChild(ol);
    } else if (e.block === "buchungssatz") {
      var bs = bewerteBuchungssatz(b, e, i);
      var deine = antwortVon(b, i) || [];
      var t1 = el("div", "pk--loesungssatz");
      t1.appendChild(el("p", "pk--titelchen", "Deine Eingabe"));
      deine.forEach(function (z) {
        t1.appendChild(el("p", "pk--satzzeile",
          (z.seite === "haben" ? "Haben" : "Soll") + "  "
          + (kontoName(z.konto) || "—") + "  " + (z.betrag || "—")));
      });
      box.appendChild(t1);
      var t2 = el("div", "pk--loesungssatz");
      t2.appendChild(el("p", "pk--titelchen", "Lösung"));
      bs.zeilen.forEach(function (z) {
        t2.appendChild(el("p", "pk--satzzeile",
          (z.seite === "haben" ? "Haben" : "Soll") + "  "
          + (z.konto ? z.konto.nr + " " + z.konto.name : "?") + "  "
          + (z.betrag != null ? zahlText(z.betrag) + " €" : "")));
      });
      box.appendChild(t2);
      box.appendChild(el("p", "pk--leise", punkteText(bs.punkte) + " Punkte"));
    } else if (e.block === "textfeld") {
      box.appendChild(el("p", "pk--leise",
        "Diese Antwort hast du oben selbst bewertet."));
    }
    return box;
  }

  function vergleichszeile(deine, richtige, ok, zusatz) {
    var p = el("div", "pk--vergleich");
    p.appendChild(el("span", "pk--marke", ok ? "richtig" : "falsch"));
    p.appendChild(el("span", "pk--loesungswert",
      "deine Antwort: " + deine + " · richtig: " + richtige));
    if (zusatz) p.appendChild(el("span", "pk--zusatz", zusatz));
    return p;
  }

  /* Die Vervollständigungsliste für Buchungssätze. Einmal im Dokument, für
     alle Felder — sie enthält den ganzen Kontenplan und bevorzugt nichts. */
  function kontenliste() {
    var dl = document.getElementById("pk--kontenliste");
    if (dl) return el("span");
    dl = document.createElement("datalist");
    dl.id = "pk--kontenliste";
    alleKonten().forEach(function (k) {
      var o = document.createElement("option");
      o.value = k.nr + " — " + k.name;
      dl.appendChild(o);
    });
    return dl;
  }

  /* ================================================== Einstieg */

  function laden() {
    if (vorrat) return Promise.resolve(vorrat);
    if (laedt) return laedt;
    laedt = fetch("mittel/aufgaben.json")
      .then(function (a) { return a.json(); })
      .then(function (d) { vorrat = d; kontenIndex = null; return d; })
      .catch(function (fehler) { laedt = null; throw fehler; });
    return laedt;
  }

  /* ================================================== Für die Übungsrunden

     training.js fragt hier nach, statt Renderer und Bewertung zu verdoppeln.
     `nebenstand(b, stand)` bindet einen Baustein an den Rundenstand; dadurch
     schreibt keine einzige Eingabe in den Klausurbogen. */
  function nebenstand(b, st) {
    var kopieB = Object.create(b);
    kopieB._stand = st;
    return kopieB;
  }

  function uebungAnsicht(b, huelle) {
    var w = werteVon(b);
    huelle.appendChild(el("p", "pk--operator", b.operator));
    (b.anzeige || []).forEach(function (a) {
      var teil = anzeigeBlock(a, w);
      if (teil) huelle.appendChild(teil);
    });
    var eingaben = el("div", "pk--eingaben");
    (b.eingabe || []).forEach(function (e, i) { eingaben.appendChild(eingabeBlock(b, e, i)); });
    huelle.appendChild(eingaben);
    if (b.eingabe.some(function (e) { return e.block === "buchungssatz"; })) {
      huelle.appendChild(kontenliste());
    }
    return eingaben;
  }

  function uebungLoesung(b, huelle) {
    var w = werteVon(b);
    b.eingabe.forEach(function (blk, i) { huelle.appendChild(loesungZuBlock(b, blk, i, w)); });
  }

  function uebungRaster(b, huelle, geaendert) {
    var st = standVon(b), w = werteVon(b);
    huelle.appendChild(el("p", "pk--titelchen", "Musterlösung"));
    huelle.appendChild(mkEl("p", null, fuellen(b.bewertung.musterloesung || "", w)));
    huelle.appendChild(el("p", "pk--titelchen", "Was steht wirklich in deiner Antwort?"));
    var raster = el("div", "pk--raster");
    (b.bewertung.raster || []).forEach(function (k, ki) {
      var lab = el("label", "pk--kriterium");
      var box = el("input");
      box.type = "checkbox";
      box.checked = !!(st.selbst[b.id] || [])[ki];
      box.addEventListener("change", function () {
        var neu = (st.selbst[b.id] || []).slice();
        neu[ki] = box.checked;
        st.selbst[b.id] = neu;
        if (st.sichern) st.sichern();
        if (geaendert) geaendert();
      });
      lab.appendChild(box);
      lab.appendChild(el("span", "pk--kriteriumtext", k.kriterium));
      lab.appendChild(el("span", "pk--kriteriumpunkte", punkteText(k.punkte) + " P."));
      raster.appendChild(lab);
    });
    huelle.appendChild(raster);
  }

  var uebung = {
    nebenstand: nebenstand, ansicht: uebungAnsicht, loesung: uebungLoesung,
    raster: uebungRaster, bewerte: function (b) { return bewerteBaustein(b); },
    bearbeitung: function (b) { return bearbeitungsstand(b); },
    werteZiehen: werteZiehen, fuellen: fuellen, baustein: baustein,
    bausteineZu: function (k) {
      var raus = bausteineZu([k]);
      return raus.concat(((vorrat && vorrat.uebungen) || []).filter(function (b) {
        return kapitelSchluessel(b) === k;
      }));
    },
    kapitelSchluessel: kapitelSchluessel,
    vorrat: function () { return vorrat; }
  };

  /* Von app.js aufgerufen. Alles Weitere passiert hier drin.

     `vorwahl` ist die Kapitelkennung aus der Adresse — der direkte Weg aus
     einem Kapitel heraus (`#ueben/probeklausur?kapitel=buchfuehrung:k3`).
     Eine unbekannte Kennung ist kein Fehler: Sie wird still übergangen und es
     erscheint die normale Auswahl. Nichts Gespeichertes wird davon berührt. */
  function zeige(schirm, zurueck, vorwahl) {
    buehne = schirm;
    zurueckZurUebersicht = zurueck;
    buehne.innerHTML = "";
    buehne.appendChild(el("p", "pk--leise", "Aufgaben werden geladen …"));

    laden().then(function () {
      var laufend = zustandLaden();
      if (laufend && laufend.gestartet) {
        /* Eine gespeicherte Klausur geht allem vor — auch einer Kapitelkennung
           in der Adresse. Nach dem Start steht die Kennung nämlich weiterhin
           dort. So landet ein Neuladen mitten im Bogen wieder im Bogen und eine
           offene Selbstauswertung bleibt nach dem Abgeben fortsetzbar. */
        vorgewaehlt = null;
        zustand = laufend;
        ansicht = laufend.abgegeben ? "auswertung" : "klausur";
        neuZeichnen();
        return;
      }

      var gewuenscht = vorwahl && kapitelListe().some(function (k) {
        return k.schluessel === vorwahl;
      }) ? vorwahl : null;

      vorgewaehlt = gewuenscht;
      if (gewuenscht) {
        // Aus einem Kapitel gekommen: genau dieses Kapitel steht an, sonst nichts.
        wahlKapitel = {};
        wahlKapitel[gewuenscht] = true;
      }
      ansicht = "auswahl";
      neuZeichnen();
    }).catch(function () {
      buehne.innerHTML = "";
      buehne.appendChild(zurueckKnopf("‹ Übersicht", function () {
        if (zurueckZurUebersicht) zurueckZurUebersicht();
      }));
      buehne.appendChild(kopfzeile("Aufgaben nicht gefunden",
        "mittel/aufgaben.json ließ sich nicht laden. Wurde build_app.py schon "
        + "ausgeführt — und läuft die Seite über einen Server statt per Doppelklick?"));
    });
  }

  /* Läuft gerade eine Klausur — und ist das die erste Frage seit dem Laden?

     app.js springt damit nach einem Neuladen sofort zurück in die begonnene
     Klausur, statt den Nutzer erst wieder durch die Übungsliste zu schicken.
     Nur beim ersten Mal: Sonst käme man aus der Klausur nie wieder heraus,
     weil „‹ Übersicht" jedes Mal zurückgeworfen würde. */
  function laeuft() {
    if (!ersterBlick) return false;
    ersterBlick = false;
    var z = zustandLaden();
    return !!(z && z.gestartet && !z.abgegeben);
  }

  /* Die Übersicht braucht eine reine Zustandsabfrage. Anders als laeuft()
     darf sie keinen einmaligen Wiederaufnahmeimpuls verbrauchen: Ein Nutzer
     soll die laufende Klausur sehen können, ohne automatisch hineingezogen zu
     werden. */
  function hatLaufende() {
    var z = zustandLaden();
    return !!(z && z.gestartet && !z.abgegeben);
  }

  function hatAbgelaufene() {
    var z = zustandLaden();
    return !!(z && z.gestartet && !z.abgegeben && (z.abgelaufen || (z.ende && Date.now() >= z.ende)));
  }

  function verlassen() {
    if (uhr) { clearInterval(uhr); uhr = null; }
    if (buehne) buehne.classList.remove("pk--imbogen");
    ansichtVerlassen();
  }

  function ansichtVerlassen() { if (ansicht === "klausur") ansicht = "auswahl"; }

  /* Ein Tab im Hintergrund lässt seine Uhr verspätet laufen. Beim Zurückkommen
     zählt die Endzeit sofort, nicht erst der nächste Timerschritt. */
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && zustand && ansicht === "klausur") ablaufAnwenden();
  });
  window.addEventListener("focus", function () {
    if (zustand && ansicht === "klausur") ablaufAnwenden();
  });
  window.addEventListener("storage", function (ev) {
    if (zustand && ev.key === schluesselFuer(zustand.beruf || "kfb")) fremdeAbgabeUebernehmen();
  });

  /* ================================================== Prüfstand

     Was funktionstest.py von außen nicht sehen kann: dass 100 Ziehungen je
     Baustein plausibel sind, dass ein Seed reproduziert und dass ein unbekannter
     Ausdruck abgelehnt wird. Der Test fährt diese Funktionen im Browser an —
     ein zweiter Rechner in Python wäre ein zweiter Rechner, der abweichen kann. */

  var pruefstand = {
    laden: laden,
    rechne: rechne,
    werteZiehen: werteZiehen,
    stelleZusammen: stelleZusammen,
    vorbereiten: vorbereiten,
    ueberschneidung: ueberschneidung,
    staende: function () { zustand = zustandLaden(); return staendeZaehlen(); },
    konto: konto,
    zahlLesen: zahlLesen,
    vorrat: function () { return vorrat; },
    baustein: baustein,
    /* Bewerten und Auswerten arbeiten auf dem gespeicherten Zustand. Der Test
       schreibt ihn direkt in den Speicher und lässt hier rechnen — dieselbe
       Rechnung, die auch die Auswertung anzeigt. */
    bewerte: function (id) { zustand = zustandLaden(); return bewerteBaustein(baustein(id)); },
    ergebnis: function () { zustand = zustandLaden(); return ergebnis(); }
  };

  return {
    zeige: zeige, verlassen: verlassen, laden: laden, laeuft: laeuft,
    hatLaufende: hatLaufende, hatAbgelaufene: hatAbgelaufene, uebung: uebung,
    SCHLUESSEL: SCHLUESSEL, pruefstand: pruefstand
  };
})();
