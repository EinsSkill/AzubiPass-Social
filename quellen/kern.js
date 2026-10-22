/* AzubiPass · Kern
   ---------------------------------------------------------------------------
   Was App und Lernzettel gemeinsam brauchen: das Konto, in dem der Lernstand
   liegt, der Sprungverteiler, die Leiste unten, das Blatt von unten.

   Alles hängt an window.AP. Kein Baukasten, keine Abhängigkeit — die Seiten
   laden diese Datei einmal und der Zwischenspeicher behält sie.                */

window.AP = (function () {
  "use strict";

  /* ================================================== Kleinkram */

  function el(tag, klasse, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  /* Auszeichnungssyntax — dieselbe wie im Fließtext, hier für Texte, die erst
     im Browser entstehen (Karten, Suchtreffer, Grafikbeschriftungen). */
  function mk(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\{\{(?:begriff|par):[a-z0-9-]+\|(.+?)\}\}/g, "$1")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(?<!\w)\*(.+?)\*(?!\w)/g, "<em>$1</em>")
      .replace(/==(.+?)==/g, "<mark>$1</mark>");
  }

  function mkEl(tag, klasse, text) {
    var e = el(tag, klasse);
    e.innerHTML = mk(text);
    return e;
  }

  /* Zahl aus einem Eingabefeld — mit Komma.

     Am deutschen Handy tippt man „12,5". <input type=number> nimmt aber nur den
     Punkt und liefert dann einen leeren Wert: Der Rechner rechnet einfach nicht
     und niemand sieht, warum. Deshalb stehen die Rechenfelder auf type=text mit
     inputmode=decimal — Zahlentastatur, aber wir lesen selbst. */
  function zahl(feld, ersatz) {
    var roh = String(feld && feld.value != null ? feld.value : "").trim().replace(",", ".");
    var n = parseFloat(roh);
    return isNaN(n) ? (ersatz === undefined ? 0 : ersatz) : n;
  }

  /* Macht aus einem Zahlenfeld eines, das Komma versteht. */
  function kommafeld(input, schritt) {
    input.type = "text";
    input.inputMode = "decimal";
    input.autocomplete = "off";
    if (schritt) input.dataset.schritt = schritt;
    return input;
  }

  var datumsformat = new Intl.DateTimeFormat("de-DE", {
    day: "numeric", month: "long", year: "numeric"
  });

  function tagesschluessel(d) {
    d = d || new Date();
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }

  function plusTage(n) {
    var d = new Date();
    d.setDate(d.getDate() + n);
    return tagesschluessel(d);
  }

  function tageBis(schluessel) {
    if (!schluessel) return 0;
    var teile = schluessel.split("-").map(Number);
    var ziel = new Date(teile[0], teile[1] - 1, teile[2]);
    var heute = new Date();
    heute.setHours(0, 0, 0, 0);
    return Math.round((ziel - heute) / 86400000);
  }

  /* Ist das ein Tagesschlüssel, den tageBis rechnen kann?

     Nicht nur die Form prüfen: "2026-02-31" passt aufs Muster und wird vom
     Date-Objekt klaglos zum 3. März — der Countdown zeigt dann einen Tag an,
     den es nie gab. Deshalb zurückrechnen und vergleichen. */
  function istDatum(s) {
    if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
    var t = s.split("-").map(Number);
    var d = new Date(t[0], t[1] - 1, t[2]);
    return d.getFullYear() === t[0] && d.getMonth() === t[1] - 1 && d.getDate() === t[2];
  }

  /* ================================================== Konto

     Ein Eintrag für alles. Vorher lag pro Lernzettel ein eigener, und keiner
     wusste vom anderen — ein Gesamtfortschritt, eine Suche über alles oder ein
     Kartenstapel aus allen Lernfeldern waren damit nicht zu haben.

     Geschrieben wird verzögert: Beim Tippen im Selbsttest sonst bei jedem
     Zeichen.                                                                   */

  var SCHLUESSEL = "azubipass:konto";
  /* Eine laufende Probeklausur bleibt getrennt vom Konto. Sobald sie abgegeben
     ist, liegt nur noch ihre kompakte Auswertung im Konto. Der Name gehört hier
     hin, damit Zurücksetzen und der Klausurteil garantiert denselben Schlüssel
     benutzen. */
  var PROBEKLAUSUR_SCHLUESSEL = "azubipass:probeklausur:v1";
  /* Das Konto bleibt unter demselben localStorage-Schlüssel erreichbar. Die
     Fassung steht im Inhalt, damit wir vorhandene Spielstände kontrolliert
     weiterentwickeln können, ohne die alten Daten still zu verwerfen. */
  var FASSUNG = 4;

  /* Fassung 4 (Industriekaufleute, 22.10.2026): Ein Konto kann zwei
     Ausbildungsgänge enthalten. Fortschritt, Karten, Quiz und Vokabeln bleiben
     gemeinsame Sammlungen – ihre Kennungen sind je Beruf verschieden
     (lf1-… gegenüber ik2024-lf01-…). Was es pro Beruf nur einmal gibt
     (zuletzt gelesenes Kapitel, eigener Prüfungstermin), liegt für
     Büromanagement weiter oben im Konto und für jeden weiteren Beruf unter
     berufe[kurz]. Ein Konto der Fassung 3 gehört damit ohne Umdeuten zu
     Büromanagement (doku/industriekaufleute/03-umsetzung-und-abnahme.md §3). */
  var STANDARDBERUF = "kfb";
  var BERUFE = ["kfb", "ik"];

  var leer = {
    version: FASSUNG,
    fortschritt: {},      // "lf10-k4" → { ziele, checks, zuordnen, test, fertig }
    karten: {},           // "lf10-k4-b2-m1" → { fach, faellig, fehler }
    vokabeln: {},         // "grund-buero-appointment" → { fach, faellig, fehler }
    quiz: {},             // Übungsteil: "lf10-k4-b2-c1" → { r: richtig?, n: Versuche }
    lesezeichen: [],      // { zu, titel, lernfeld }
    aktivitaet: [],       // Tage, an denen etwas gelernt wurde
    zuletzt: null,        // { zu, lernfeld, kapitel, titel }
    pruefungstermin: null,// eigener Termin; null = der aus landing.config.json
    geaendertAm: null,    // ISO-Zeitpunkt der letzten lokalen Kontenänderung
    stimmung: "hell",
    uebernommen: false,
    probeklausuren: [],   // abgeschlossene Ergebnisse; laufende Klausur bleibt separat
    beruf: "kfb",         // aktiver Ausbildungsgang (Fassung 4)
    berufe: {}            // "ik" → { zuletzt, pruefungstermin } (Fassung 4)
  };

  function frisch() { return JSON.parse(JSON.stringify(leer)); }

  var stand = laden();

  function laden() {
    var roh;
    try {
      roh = localStorage.getItem(SCHLUESSEL);
    } catch (e) {
      // Privater Modus oder Speicher gesperrt: Die App muss trotzdem laufen,
      // sie merkt sich dann eben nichts.
      return frisch();
    }
    if (!roh) return uebernehmen(frisch());
    try {
      return normalisieren(JSON.parse(roh));
    } catch (e) {
      return frisch();
    }
  }

  /* Ein kaputtes oder altes Konto darf nicht dazu führen, dass einzelne
     Ansichten mit null statt mit einer leeren Sammlung arbeiten. Die Migration
     ist absichtlich verlustarm: Bekannte Felder werden übernommen, fehlende
     Felder erhalten ihren aktuellen Standardwert, unbekannte Altlasten werden
     nicht weitergeschrieben. */
  function normalisieren(k) {
    if (!k || typeof k !== "object" || Array.isArray(k)) return frisch();

    var neu = frisch();
    Object.keys(leer).forEach(function (f) {
      if (Object.prototype.hasOwnProperty.call(k, f)) neu[f] = k[f];
    });
    neu.version = FASSUNG;

    if (!neu.fortschritt || typeof neu.fortschritt !== "object" ||
        Array.isArray(neu.fortschritt)) neu.fortschritt = {};
    Object.keys(neu.fortschritt).forEach(function (id) {
      var f = neu.fortschritt[id];
      if (!f || typeof f !== "object" || Array.isArray(f)) {
        delete neu.fortschritt[id];
        return;
      }
      if (!Array.isArray(f.ziele)) f.ziele = [];
      ["checks", "zuordnen", "test"].forEach(function (feld) {
        if (!f[feld] || typeof f[feld] !== "object" || Array.isArray(f[feld])) {
          f[feld] = {};
        }
      });
      f.fertig = f.fertig === true;
    });

    ["karten", "quiz", "vokabeln"].forEach(function (feld) {
      if (!neu[feld] || typeof neu[feld] !== "object" || Array.isArray(neu[feld])) {
        neu[feld] = {};
      }
    });
    if (!Array.isArray(neu.lesezeichen)) neu.lesezeichen = [];
    if (!Array.isArray(neu.aktivitaet)) neu.aktivitaet = [];
    if (!Array.isArray(neu.probeklausuren)) neu.probeklausuren = [];
    if (typeof neu.geaendertAm !== "string") neu.geaendertAm = null;
    neu.uebernommen = neu.uebernommen === true;

    /* Auch die einzelnen Einträge prüfen (Gesamtaudit A01): Ein einziges
       null in einer Liste hat sonst die Ich-Ansicht samt Wiederherstellung
       lahmgelegt. Unbrauchbares fällt weg, Brauchbares wird ergänzt. */
    Object.keys(neu.fortschritt).forEach(function (id) {
      var f = neu.fortschritt[id];
      f.ziele = f.ziele.filter(einfacherWert);
    });
    ["karten", "vokabeln"].forEach(function (feld) {
      Object.keys(neu[feld]).forEach(function (id) {
        var k = neu[feld][id];
        if (!istObjekt(k)) { delete neu[feld][id]; return; }
        k.fach = ganzzahl(k.fach, 1, 1);
        if (!istDatum(k.faellig)) k.faellig = tagesschluessel();
        k.fehler = ganzzahl(k.fehler, 0, 0);
      });
    });
    Object.keys(neu.quiz).forEach(function (id) {
      if (!istObjekt(neu.quiz[id])) delete neu.quiz[id];
    });
    var gesehen = {};
    neu.lesezeichen = neu.lesezeichen.filter(function (e) {
      if (!istObjekt(e) || typeof e.zu !== "string" || !e.zu || gesehen[e.zu]) return false;
      gesehen[e.zu] = true;
      if (typeof e.titel !== "string") e.titel = "";
      if (typeof e.lernfeld !== "string") e.lernfeld = "";
      return true;
    });
    var tage = {};
    neu.aktivitaet = neu.aktivitaet.filter(function (t) {
      if (!istDatum(t) || tage[t]) return false;
      tage[t] = true;
      return true;
    }).slice(-400);
    neu.probeklausuren = neu.probeklausuren.filter(istObjekt).slice(0, 50);
    if (!istObjekt(neu.zuletzt) || typeof neu.zuletzt.zu !== "string" || !neu.zuletzt.zu) neu.zuletzt = null;
    if (!istDatum(neu.pruefungstermin)) neu.pruefungstermin = null;
    if (typeof neu.stimmung !== "string") neu.stimmung = "hell";
    if (BERUFE.indexOf(neu.beruf) < 0) neu.beruf = STANDARDBERUF;
    var berufeRoh = istObjekt(neu.berufe) ? neu.berufe : {};
    neu.berufe = {};
    Object.keys(berufeRoh).forEach(function (b) {
      if (b === STANDARDBERUF || BERUFE.indexOf(b) < 0 || !istObjekt(berufeRoh[b])) return;
      var e = berufeRoh[b];
      neu.berufe[b] = {
        zuletzt: istObjekt(e.zuletzt) && typeof e.zuletzt.zu === "string" && e.zuletzt.zu
          ? e.zuletzt : null,
        pruefungstermin: istDatum(e.pruefungstermin) ? e.pruefungstermin : null
      };
    });
    return neu;
  }

  /* ================================================== Ausbildungsgang

     Zu welchem Beruf ein Lernfeld gehört, steht in seiner Kennung: Neue
     Berufe haben ein Präfix (ik2024-…), Büromanagement nicht. So ordnet eine
     Lernzettelseite ihre Aktionen dem geöffneten Inhalt zu – auch wenn in
     einem anderen Tab gerade der Beruf gewechselt wurde (Plan §3). */
  function berufVon(lernfeld) {
    return /^ik2024-/.test(String(lernfeld || "")) ? "ik" : STANDARDBERUF;
  }

  function aktiverBeruf() {
    return BERUFE.indexOf(stand.beruf) >= 0 ? stand.beruf : STANDARDBERUF;
  }

  function berufSetzen(b) {
    if (BERUFE.indexOf(b) < 0 || stand.beruf === b) return false;
    stand.beruf = b;
    sichern();
    return true;
  }

  function berufsfach(b, anlegen) {
    if (!istObjekt(stand.berufe)) stand.berufe = {};
    if (!stand.berufe[b] && anlegen) stand.berufe[b] = { zuletzt: null, pruefungstermin: null };
    return stand.berufe[b] || null;
  }

  function zuletzt(b) {
    b = b || aktiverBeruf();
    if (b === STANDARDBERUF) return stand.zuletzt;
    var f = berufsfach(b, false);
    return f ? f.zuletzt : null;
  }

  /* Das zuletzt geöffnete Kapitel – beim Beruf des Kapitels, nicht beim
     gerade aktiven. */
  function zuletztSetzen(eintrag) {
    var b = berufVon(eintrag && eintrag.lernfeld);
    if (b === STANDARDBERUF) stand.zuletzt = eintrag;
    else berufsfach(b, true).zuletzt = eintrag;
    sichern();
  }

  function pruefungstermin(b) {
    b = b || aktiverBeruf();
    var wert = b === STANDARDBERUF ? stand.pruefungstermin
                                   : (berufsfach(b, false) || {}).pruefungstermin;
    return istDatum(wert) ? wert : null;
  }

  function pruefungsterminSetzen(b, wert) {
    b = b || aktiverBeruf();
    var neu = istDatum(wert) ? wert : null;
    if (b === STANDARDBERUF) stand.pruefungstermin = neu;
    else berufsfach(b, true).pruefungstermin = neu;
    sichern();
  }

  function istObjekt(w) { return !!w && typeof w === "object" && !Array.isArray(w); }
  function einfacherWert(w) { return typeof w === "string" || (typeof w === "number" && isFinite(w)); }
  function ganzzahl(w, standard, min) {
    return typeof w === "number" && isFinite(w) && w >= min ? Math.floor(w) : standard;
  }

  /* Prüft eine Sicherung, bevor irgendetwas davon übernommen wird. Gibt eine
     Liste der Probleme zurück – leer heißt: brauchbar. Streng mit den Typen,
     großzügig mit fehlenden Feldern: Ältere Sicherungen (v1, v2) haben nicht
     alles, was es heute gibt, und sollen trotzdem eingespielt werden können. */
  function sicherungPruefen(k) {
    var p = [];
    function nennen(was) { if (p.indexOf(was) < 0) p.push(was); }
    if (!istObjekt(k) || !istObjekt(k.fortschritt)) return ["kein Lernstand"];
    Object.keys(k.fortschritt).forEach(function (id) {
      var f = k.fortschritt[id];
      if (!istObjekt(f)) return nennen("Kapitelfortschritt");
      if ("ziele" in f && !(Array.isArray(f.ziele) && f.ziele.every(einfacherWert))) nennen("Lernziele");
      ["checks", "zuordnen", "test"].forEach(function (feld) {
        if (feld in f && !istObjekt(f[feld])) nennen("Kapitelfortschritt");
      });
      if ("fertig" in f && typeof f.fertig !== "boolean") nennen("Kapitelfortschritt");
    });
    [["karten", "Karteikarten"], ["vokabeln", "Vokabeln"]].forEach(function (x) {
      if (!(x[0] in k)) return;
      if (!istObjekt(k[x[0]])) return nennen(x[1]);
      Object.keys(k[x[0]]).forEach(function (id) {
        var e = k[x[0]][id];
        if (!istObjekt(e) || ("fach" in e && typeof e.fach !== "number") ||
            ("faellig" in e && typeof e.faellig !== "string") ||
            ("fehler" in e && typeof e.fehler !== "number")) nennen(x[1]);
      });
    });
    if ("quiz" in k && !(istObjekt(k.quiz) &&
        Object.keys(k.quiz).every(function (id) { return istObjekt(k.quiz[id]); }))) nennen("Übungsfragen");
    if ("lesezeichen" in k && !(Array.isArray(k.lesezeichen) && k.lesezeichen.every(function (e) {
      return istObjekt(e) && typeof e.zu === "string" && e.zu;
    }))) nennen("Lesezeichen");
    if ("aktivitaet" in k && !(Array.isArray(k.aktivitaet) &&
        k.aktivitaet.every(function (t) { return typeof t === "string"; }))) nennen("Lerntage");
    if ("probeklausuren" in k && !(Array.isArray(k.probeklausuren) &&
        k.probeklausuren.every(istObjekt))) nennen("Probeklausuren");
    if ("zuletzt" in k && k.zuletzt !== null &&
        !(istObjekt(k.zuletzt) && typeof k.zuletzt.zu === "string")) nennen("zuletzt geöffnetes Kapitel");
    if ("geaendertAm" in k && k.geaendertAm !== null && typeof k.geaendertAm !== "string") nennen("Zeitstempel");
    if ("berufe" in k && !istObjekt(k.berufe)) nennen("Ausbildungsgänge");
    return p;
  }

  /* Setzt einen fertigen Lernstand ein, ohne Objekte auszutauschen, die
     Ansichten festhalten (LS03). Nicht nur das Konto und die Kapitelstände:
     Lernzettelseiten merken sich auch die einzelnen Aufgabeneinträge
     (Selbsttest, Checks, Zuordnen) und schreiben später hinein. Deshalb wird
     bis in jede Ebene angeglichen: Objekte, die es weiter gibt, bleiben
     dieselben und bekommen nur neue Werte; Listen behalten ihr Objekt und
     bekommen neuen Inhalt. Schreibt nichts. */
  function schlicht(o) { return !!o && typeof o === "object" && !Array.isArray(o); }

  function angleichen(ziel, quelle) {
    Object.keys(ziel).forEach(function (k) {
      if (!Object.prototype.hasOwnProperty.call(quelle, k)) delete ziel[k];
    });
    Object.keys(quelle).forEach(function (k) {
      var a = ziel[k], b = quelle[k];
      if (a === b) return;
      if (schlicht(a) && schlicht(b)) angleichen(a, b);
      else if (Array.isArray(a) && Array.isArray(b)) {
        a.length = 0;
        b.forEach(function (x) { a.push(x); });
      } else ziel[k] = b;
    });
  }

  function einsetzen(sauber) { angleichen(stand, sauber); }

  /* Für Lernzettelseiten (LS03): Vor dem Speichern sicherstellen, dass das
     Kapitelfach und – falls genannt – der bearbeitete Aufgabeneintrag noch im
     Lernstand hängen. Nur nötig, wenn ein anderer Tab den Eintrag inzwischen
     entfernt hat (z. B. Zurücksetzen): Dann gilt, was auf dem Bildschirm steht. */
  function kapitelfachBinden(lernfeld, kapitel, f, art, id, eintrag, gen) {
    // LS04: Nach einem Kontowechsel gehört das festgehaltene Fach dem vorherigen
    // Konto. Nichts wieder anhängen – sonst wandern dessen Antworten mit.
    if (gen !== undefined && gen !== generation) return false;
    var s = lernfeld + "-" + kapitel;
    var jetzt = stand.fortschritt[s];
    if (jetzt !== f) {
      if (schlicht(jetzt)) {
        // Inzwischen neu angelegt: Einträge, die nur dort stehen, mitnehmen.
        ["checks", "zuordnen", "test"].forEach(function (x) {
          if (!schlicht(f[x])) f[x] = {};
          Object.keys(schlicht(jetzt[x]) ? jetzt[x] : {}).forEach(function (id2) {
            if (!(id2 in f[x])) f[x][id2] = jetzt[x][id2];
          });
        });
        if (!Array.isArray(f.ziele)) f.ziele = [];
        (Array.isArray(jetzt.ziele) ? jetzt.ziele : []).forEach(function (z) {
          if (f.ziele.indexOf(z) === -1) f.ziele.push(z);
        });
      }
      stand.fortschritt[s] = f;
    }
    if (art && id && eintrag) {
      if (!schlicht(f[art])) f[art] = {};
      if (f[art][id] !== eintrag) f[art][id] = eintrag;
    }
    return true;
  }

  /* Ersetzt den Inhalt des Kontos in einem Schritt und schreibt sofort.
     Bewusst ohne Abgleich mit anderen Tabs: Wer ersetzt, hat entschieden. */
  function kontoErsetzen(neu) {
    einsetzen(normalisieren(neu));
    stand.geaendertAm = new Date().toISOString();
    gemeldet();
    return schreiben(true);
  }

  /* ================================================== Zusammenführen

     Dieselbe Regel für das Einspielen einer Sicherung, den Abgleich mit dem
     Konto und – neu (LS02) – für Änderungen aus einem anderen Tab. Liegt in
     kern.js, weil auch die Lernzettelseiten sie brauchen. */
  function probeklausurId(e) {
    return e && (e.id || [e.ende, e.seed, e.prozent].join("|"));
  }

  function probeklausurZeit(e) {
    if (!e) return 0;
    var t = Date.parse(e.aktualisiertAm || e.beendetAm || "");
    return isNaN(t) ? 0 : t;
  }

  function zeitstempel(wert) {
    var t = Date.parse(wert || "");
    return isNaN(t) ? 0 : t;
  }

  function objekt(wert) {
    return wert && typeof wert === "object" && !Array.isArray(wert) ? wert : {};
  }

  function werteZusammenfuehren(lokal, fremd, fremdIstNeuer) {
    var alt = objekt(lokal), neu = objekt(fremd), raus = {};
    Object.keys(alt).forEach(function (id) { raus[id] = alt[id]; });
    Object.keys(neu).forEach(function (id) {
      if (!Object.prototype.hasOwnProperty.call(raus, id) || fremdIstNeuer) {
        raus[id] = neu[id];
      }
    });
    return raus;
  }

  function fortschrittZusammenfuehren(lokal, fremd, fremdIstNeuer) {
    var alt = objekt(lokal), neu = objekt(fremd);
    var raus = {
      ziele: Array.isArray(alt.ziele) ? alt.ziele.slice() : [],
      checks: werteZusammenfuehren(alt.checks, neu.checks, fremdIstNeuer),
      zuordnen: werteZusammenfuehren(alt.zuordnen, neu.zuordnen, fremdIstNeuer),
      test: werteZusammenfuehren(alt.test, neu.test, fremdIstNeuer),
      fertig: alt.fertig === true
    };
    (Array.isArray(neu.ziele) ? neu.ziele : []).forEach(function (ziel) {
      if (raus.ziele.indexOf(ziel) === -1) raus.ziele.push(ziel);
    });
    if (fremdIstNeuer && typeof neu.fertig === "boolean") raus.fertig = neu.fertig;
    else if (neu.fertig === true) raus.fertig = true;
    return raus;
  }

  /* Führt eine geprüfte Sicherung in ziel (eine Kopie des Kontos) zusammen. */
  function zusammenfuehren(stand, neu) {
    var lokaleZeit = zeitstempel(stand.geaendertAm);
    var fremdeZeit = zeitstempel(neu.geaendertAm);
    var fremdeSicherungIstNeuer = fremdeZeit > lokaleZeit;
    /* Zusammenführen statt überschreiben: Wer auf zwei Geräten gelernt hat,
       soll nicht die Hälfte verlieren. Eine ältere Sicherung darf dabei
       keinen neueren Kapitelstand zurücksetzen. */
    Object.keys(neu.fortschritt || {}).forEach(function (k) {
      if (!stand.fortschritt[k]) {
        stand.fortschritt[k] = fortschrittZusammenfuehren({}, neu.fortschritt[k], true);
      } else {
        stand.fortschritt[k] = fortschrittZusammenfuehren(
          stand.fortschritt[k], neu.fortschritt[k], fremdeSicherungIstNeuer);
      }
    });
    Object.keys(neu.karten || {}).forEach(function (id) {
      var alt = stand.karten[id];
      if (!alt || (neu.karten[id].fach || 0) > (alt.fach || 0) ||
          ((neu.karten[id].fach || 0) === (alt.fach || 0) && fremdeSicherungIstNeuer)) {
        stand.karten[id] = neu.karten[id];
      }
    });
    Object.keys(neu.vokabeln || {}).forEach(function (id) {
      var alt = stand.vokabeln[id];
      if (!alt || (neu.vokabeln[id].fach || 0) > (alt.fach || 0) ||
          ((neu.vokabeln[id].fach || 0) === (alt.fach || 0) && fremdeSicherungIstNeuer)) {
        stand.vokabeln[id] = neu.vokabeln[id];
      }
    });
    stand.quiz = werteZusammenfuehren(stand.quiz, neu.quiz, fremdeSicherungIstNeuer);
    (neu.aktivitaet || []).forEach(function (t) {
      if (stand.aktivitaet.indexOf(t) === -1) stand.aktivitaet.push(t);
    });
    (neu.lesezeichen || []).forEach(function (e) {
      if (!stand.lesezeichen.some(function (x) { return x.zu === e.zu; })) {
        stand.lesezeichen.push(e);
      }
    });
    /* Klausurergebnisse gehören zum Konto und müssen deshalb beim
       Zusammenführen ebenfalls erhalten bleiben. Die laufende Klausur hat
       weiterhin ihren eigenen Schlüssel; hier liegen nur abgeschlossene
       Ergebniszusammenfassungen. */
    (Array.isArray(neu.probeklausuren) ? neu.probeklausuren : []).forEach(function (e) {
      if (!e || typeof e !== "object") return;
      var id = probeklausurId(e);
      var i = stand.probeklausuren.findIndex(function (x) {
        return probeklausurId(x) === id;
      });
      if (i < 0) {
        stand.probeklausuren.push(e);
        return;
      }
      var alt = stand.probeklausuren[i];
      var neuAbgeschlossen = e.status === "abgeschlossen";
      var altAbgeschlossen = alt && alt.status === "abgeschlossen";
      if ((neuAbgeschlossen && !altAbgeschlossen) ||
          probeklausurZeit(e) >= probeklausurZeit(alt)) {
        stand.probeklausuren[i] = e;
      }
    });
    if (stand.probeklausuren.length > 50) stand.probeklausuren = stand.probeklausuren.slice(0, 50);
    if (neu.zuletzt && (!stand.zuletzt || fremdeSicherungIstNeuer)) {
      stand.zuletzt = neu.zuletzt;
    }
    // Nur übernehmen, was der Countdown auch rechnen kann — sonst schleppt
    // eine alte Sicherung einen kaputten Termin ins frische Konto.
    if (istDatum(neu.pruefungstermin) &&
        (!stand.pruefungstermin || fremdeSicherungIstNeuer)) {
      stand.pruefungstermin = neu.pruefungstermin;
    }
    /* Fassung 4: Dieselbe Regel für jeden weiteren Beruf. Eine alte
       Sicherung ohne berufe löscht nichts, was neuer ist. */
    if (!istObjekt(stand.berufe)) stand.berufe = {};
    Object.keys(istObjekt(neu.berufe) ? neu.berufe : {}).forEach(function (b) {
      var fremd = neu.berufe[b];
      if (b === STANDARDBERUF || BERUFE.indexOf(b) < 0 || !istObjekt(fremd)) return;
      var hier = stand.berufe[b] || (stand.berufe[b] = { zuletzt: null, pruefungstermin: null });
      if (istObjekt(fremd.zuletzt) && typeof fremd.zuletzt.zu === "string" &&
          (!hier.zuletzt || fremdeSicherungIstNeuer)) hier.zuletzt = fremd.zuletzt;
      if (istDatum(fremd.pruefungstermin) &&
          (!hier.pruefungstermin || fremdeSicherungIstNeuer)) hier.pruefungstermin = fremd.pruefungstermin;
    });
    if (BERUFE.indexOf(neu.beruf) >= 0 && fremdeSicherungIstNeuer) stand.beruf = neu.beruf;
  }

  function lernstandZusammenfuehren(ziel, neu) { zusammenfuehren(ziel, neu); }

  /* Der alte Bestand: ein Eintrag je Lernzettel, benannt azubipass:<lernfeld>.
     Die Haken, Checks, Zuordnungen und Selbsttest-Texte lassen sich sauber
     übernehmen — sie hängen an Abschnitts- und Aufgabennummern.

     Der Kartenstand wird bewusst NICHT übernommen. Er lag unter der Position im
     Stapel, nicht unter einer Kennung; genau daran ist er ja verrutscht. Ihn zu
     übertragen hieße, den Fehler mitzunehmen. Lieber einmal von vorn. */
  function uebernehmen(neu) {
    var gefunden = 0;
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var name = localStorage.key(i);
        if (!name || name.indexOf("azubipass:") !== 0 || name === SCHLUESSEL) continue;
        var lernfeld = name.slice("azubipass:".length);
        var alt;
        try { alt = JSON.parse(localStorage.getItem(name)); } catch (e) { continue; }
        if (!alt || typeof alt !== "object") continue;

        Object.keys(alt).forEach(function (kap) {
          if (kap.charAt(0) === "#" || kap === "karten") return;
          var f = alt[kap];
          if (!f || typeof f !== "object") return;
          neu.fortschritt[lernfeld + "-" + kap] = {
            ziele: f.ziele || [],
            checks: f.checks || {},
            zuordnen: f.zuordnen || {},
            test: f.test || {},
            fertig: false
          };
          gefunden++;
        });
        if (alt["#kap"] && !neu.zuletzt) {
          neu.zuletzt = { zu: lernfeld + ".html#" + alt["#kap"], lernfeld: lernfeld };
        }
      }
    } catch (e) { /* Speicher nicht lesbar — dann eben ohne */ }
    neu.uebernommen = gefunden > 0;
    return normalisieren(neu);
  }

  /* Speichern (Gesamtaudit A05): Früher wartete jede Änderung 400 ms – wer
     direkt danach neu lud, verlor sie. Jetzt wird die erste Änderung sofort
     geschrieben; erst weitere Änderungen in kurzer Folge (Tippen im Selbsttest)
     werden gebündelt. Beim Verlassen, Neuladen oder Wechsel in den
     Hintergrund wird Ausstehendes sofort geschrieben. */
  var wartet = null, geschriebenUm = 0, BUENDEL = 400;

  /* Mehrere Tabs (LS02): App und Lernzettelseiten teilen sich einen Eintrag
     im Browser, halten den Lernstand aber jeweils im eigenen Arbeitsspeicher.
     Früher schrieb jeder Tab blind seinen Stand – ein länger offener Tab hat
     so neuere Änderungen eines anderen überschrieben, im Browser und über den
     Abgleich auch im Konto. Jetzt merkt sich jeder Tab, was er zuletzt
     gelesen oder geschrieben hat. Hat ein anderer Tab seitdem geschrieben,
     wird das vor dem eigenen Schreiben übernommen (ohne eigene Änderung) oder
     zusammengeführt (mit eigener, noch nicht geschriebener Änderung).

     Gehört der fremde Stand inzwischen einem anderen Konto (Wechsel im
     anderen Tab, LS01), gilt er ohne Zusammenführung: Reste dieses Tabs
     gehören zum vorherigen Konto und dürfen nicht hinüberwandern. Ein Stand
     ohne Besitzer (nie angemeldet) darf dagegen wie bisher ins erste Konto. */
  var BESITZ = "azubipass-lernsync";        // Merkzettel aus lernstand-sync.js
  var zuletztRoh = (function () {
    try { return localStorage.getItem(SCHLUESSEL); } catch (e) { return null; }
  })();
  var besitzer = besitzerLesen();

  function besitzerLesen() {
    try {
      var m = JSON.parse(localStorage.getItem(BESITZ));
      return m && typeof m.nutzer === "string" ? m.nutzer : null;
    } catch (e) { return null; }
  }

  // Was ein anderer Tab seit unserem letzten Lesen/Schreiben abgelegt hat, oder null.
  function fremderStand() {
    var roh = localStorage.getItem(SCHLUESSEL);
    if (roh === null || roh === zuletztRoh) return null;
    try { return { roh: roh, stand: normalisieren(JSON.parse(roh)) }; }
    catch (e) { return null; }
  }

  /* LS04: Kontogeneration. Wechselt der Besitzer des Gerätestands von einem
     Konto zu einem anderen, zählt sie hoch. Ansichten, die Teile des
     Lernstands festhalten (Lernzettelseiten), binden sich an die Generation
     ihres Aufbaus und hängen nach einem Wechsel nichts mehr an; sie werden
     neu aufgebaut. Ohne Besitzer → erstes Konto ist kein Wechsel. */
  var generation = 0, wechselHoerer = [];

  function besitzPruefen() {
    var jetzt = besitzerLesen();
    if (besitzer !== null && jetzt !== besitzer) {
      besitzer = jetzt;
      generation++;
      // Noch nicht Geschriebenes gehört dem vorherigen Konto: verwerfen, nicht
      // später in den Stand des neuen Kontos zusammenführen.
      if (wartet) { clearTimeout(wartet); wartet = null; }
      try {
        var fremd = fremderStand();
        if (fremd) { einsetzen(fremd.stand); zuletztRoh = fremd.roh; }
      } catch (e) {}
      setTimeout(function () {
        wechselHoerer.slice().forEach(function (h) { try { h(); } catch (e) {} });
      }, 0);
    } else besitzer = jetzt;
  }

  function kontoGeneration() { return generation; }
  function beiKontowechsel(h) { wechselHoerer.push(h); }

  function uebernommen(roh) { zuletztRoh = roh; besitzPruefen(); }

  function schreiben(erzwingen) {
    if (wartet) { clearTimeout(wartet); wartet = null; }
    geschriebenUm = Date.now();
    try {
      if (!erzwingen) {
        var fremd = fremderStand();
        var jetzt = besitzerLesen();
        if (fremd && besitzer !== null && jetzt !== besitzer) {
          einsetzen(fremd.stand);              // anderes Konto: dessen Stand gilt
          uebernommen(fremd.roh);
          gemeldet();
          return true;
        }
        if (fremd) {
          var eigeneZeit = stand.geaendertAm;
          var ziel = JSON.parse(JSON.stringify(stand));
          zusammenfuehren(ziel, fremd.stand);
          ziel.geaendertAm = String(eigeneZeit || "") > String(fremd.stand.geaendertAm || "")
            ? eigeneZeit : fremd.stand.geaendertAm;
          einsetzen(normalisieren(ziel));
        }
      }
      var roh = JSON.stringify(stand);
      localStorage.setItem(SCHLUESSEL, roh);
      uebernommen(roh);
      return true;
    } catch (e) {
      // Speicher voll oder gesperrt. Nichts kaputtmachen, nichts behaupten.
      return false;
    }
  }

  /* Holt Änderungen anderer Tabs in diesen Tab. Hat dieser Tab selbst noch
     Ungeschriebenes, wird zusammengeführt und geschrieben. true = geändert.
     lernstand-sync.js ruft das vor jeder Entscheidung über den Abgleich. */
  function kontoAuffrischen() {
    try {
      if (wartet) { var vorher = zuletztRoh; schreiben(); return zuletztRoh !== vorher; }
      var fremd = fremderStand();
      if (!fremd) return false;
      einsetzen(fremd.stand);
      uebernommen(fremd.roh);
      return true;
    } catch (e) { return false; }
  }

  var fremdHoerer = [];
  function beiFremdemStand(h) { fremdHoerer.push(h); }

  function nachFremdemSchreiben() {
    if (!kontoAuffrischen()) return;
    fremdHoerer.slice().forEach(function (h) { try { h(); } catch (e) {} });
    try { if (window.AP && window.AP.appNeuZeichnen) window.AP.appNeuZeichnen(); } catch (e) {}
  }
  try {
    window.addEventListener("storage", function (e) {
      if (e.key === SCHLUESSEL || e.key === null) nachFremdemSchreiben();
      if (e.key === BESITZ || e.key === null) besitzPruefen();
    });
  } catch (e) {}

  // Lernstand-Abgleich mit dem Konto (lernstand-sync.js, nur in der App).
  function gemeldet() { try { if (window.AP && window.AP.nachSichern) window.AP.nachSichern(); } catch (e) {} }

  function sichern() {
    stand.geaendertAm = new Date().toISOString();
    gemeldet();
    if (wartet) return;
    var seit = Date.now() - geschriebenUm;
    if (seit >= BUENDEL) { schreiben(); return; }
    wartet = setTimeout(schreiben, BUENDEL - seit);
  }

  // Jetzt schreiben, auch wenn gerade gebündelt wird. true = gespeichert.
  function sofortSichern() {
    stand.geaendertAm = new Date().toISOString();
    gemeldet();
    return schreiben();
  }

  function ausstehendSchreiben() { if (wartet) schreiben(); }
  try {
    window.addEventListener("pagehide", ausstehendSchreiben);
    window.addEventListener("beforeunload", ausstehendSchreiben);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") ausstehendSchreiben();
    });
  } catch (e) {}

  /* Eine abgegebene Probeklausur ist ein Ergebnis des Lernstands. Antworten
     und Eingaben bleiben im separaten Klausurbogen; im Konto genügt die
     Zusammenfassung, die exportiert, importiert und angezeigt werden kann. */
  function probeklausurErgebnisSpeichern(ergebnis) {
    if (!ergebnis || typeof ergebnis !== "object" || !ergebnis.id) return false;
    var eintrag;
    try { eintrag = JSON.parse(JSON.stringify(ergebnis)); }
    catch (e) { return false; }
    if (!Array.isArray(stand.probeklausuren)) stand.probeklausuren = [];

    var i = stand.probeklausuren.findIndex(function (x) {
      return x && x.id === eintrag.id;
    });
    if (i >= 0) stand.probeklausuren[i] = eintrag;
    else stand.probeklausuren.unshift(eintrag);
    /* Ein Lernkonto soll nicht durch viele Varianten unhandlich werden. Die
       letzten 50 Ergebnisse reichen für Wiederholung und Verlauf. */
    if (stand.probeklausuren.length > 50) {
      stand.probeklausuren = stand.probeklausuren.slice(0, 50);
    }
    sichern();
    return true;
  }

  /* Jeder Beruf hat seinen eigenen laufenden Klausurbogen. Büromanagement
     behält den bisherigen Schlüssel, damit ein laufender Bogen das Update
     übersteht; eine begonnene Klausur wird beim Berufswechsel weder
     abgegeben noch überschrieben (Plan §3). */
  var PROBEKLAUSUR_SCHLUESSEL_BERUF = { ik: "azubipass:probeklausur:industriekaufleute-2024:v1" };

  function probeklausurSchluessel(b) {
    b = b || aktiverBeruf();
    return PROBEKLAUSUR_SCHLUESSEL_BERUF[b] || PROBEKLAUSUR_SCHLUESSEL;
  }

  /* Zurücksetzen erfasst die Bögen aller Berufe. */
  function probeklausurZuruecksetzen() {
    try {
      localStorage.removeItem(PROBEKLAUSUR_SCHLUESSEL);
      Object.keys(PROBEKLAUSUR_SCHLUESSEL_BERUF).forEach(function (b) {
        localStorage.removeItem(PROBEKLAUSUR_SCHLUESSEL_BERUF[b]);
      });
    } catch (e) {}
  }

  /* Fach eines Kapitels. Kein Textabdruck mehr auf dieser Ebene — der sitzt
     jetzt am einzelnen Baustein. Ein korrigiertes Komma hat vorher den ganzen
     Kapitelstand weggeworfen. */
  function kapitelfach(lernfeld, kapitel) {
    var s = lernfeld + "-" + kapitel;
    var f = stand.fortschritt[s];
    if (!f) {
      f = stand.fortschritt[s] = { ziele: [], checks: {}, zuordnen: {}, test: {}, fertig: false };
    }
    ["ziele", "checks", "zuordnen", "test"].forEach(function (k) {
      if (!f[k]) f[k] = (k === "ziele" ? [] : {});
    });
    return f;
  }

  /* Billiger Abdruck — jedes siebte Zeichen genügt, um eine Textänderung zu
     sehen. Wird nur noch für einzelne Aufgaben benutzt: Ändert sich die Frage,
     ist die gespeicherte Antwort wertlos und wird verworfen. Ändert sich der
     Absatz daneben, bleibt sie. */
  function abdruck(s) {
    var h = 0;
    for (var i = 0; i < s.length; i += 7) h = (h * 31 + s.charCodeAt(i)) | 0;
    return h;
  }

  function heuteGelernt() {
    var t = tagesschluessel();
    if (stand.aktivitaet.indexOf(t) === -1) {
      stand.aktivitaet.push(t);
      if (stand.aktivitaet.length > 400) stand.aktivitaet = stand.aktivitaet.slice(-400);
      sichern();
    }
  }

  /* ================================================== Karten · Leitner mit Wartezeit

     Fünf Fächer, jedes mit einer Wartezeit. Der alte Kasten kannte nur Fächer:
     Man konnte eine Karte dreimal in derselben Minute „gewusst" klicken und sie
     galt als sitzend. Verteiltes Wiederholen ist aber genau die Zeitkomponente. */

  var WARTEN = [0, 1, 3, 7, 21];        // Tage bis zur nächsten Vorlage je Fach
  var FAECHER = WARTEN.length;

  /* Nachsehen und Eintragen sind zwei verschiedene Dinge.

     Vorher legte schon die Frage „ist diese Karte fällig?" einen Eintrag an —
     einmal den Übungsteil geöffnet und es standen 139 Karteileichen im Konto,
     alle mit demselben Standardwert. Das bläht die Sicherungsdatei auf und
     täuscht einen Lernstand vor, den es nicht gibt. Geschrieben wird jetzt
     erst, wenn jemand eine Karte tatsächlich bewertet. */
  function kartenblick(id) {
    return stand.karten[id] || { fach: 1, faellig: tagesschluessel(), fehler: 0 };
  }

  function kartenstand(id) {
    if (!stand.karten[id]) stand.karten[id] = kartenblick(id);
    return stand.karten[id];
  }

  function istFaellig(id) {
    return tageBis(kartenblick(id).faellig) <= 0;
  }

  function kartewerten(id, gewusst) {
    var k = kartenstand(id);
    if (gewusst) {
      k.fach = Math.min(k.fach + 1, FAECHER);
    } else {
      k.fach = 1;
      k.fehler = (k.fehler || 0) + 1;
    }
    k.faellig = plusTage(WARTEN[k.fach - 1]);
    heuteGelernt();
    sichern();
    return k;
  }

  /* ================================================== Karten-Trainer

     Steht hier und nicht im Lernzettel, weil ihn zwei Stellen brauchen: der
     Trainer am Ende eines Lernfelds und der Übungsteil der App, der über alle
     Lernfelder geht. Zwei Fassungen hießen zwei Leitner-Regeln.                */

  function trainer(buehne, anzeige, karten, beiWechsel) {
    if (!buehne) return;
    var vorarbeiten = false;

    function neu(id) {
      return !Object.prototype.hasOwnProperty.call(stand.karten, id);
    }

    function faellig() {
      /* Wiederholungen haben Vorrang. Neue Karten kommen erst danach, damit
         ein frischer Bestand nicht wie eine Warteschlange voller überfälliger
         Aufgaben wirkt und die eigentliche Wiederholung nicht verdrängt. */
      var wiederholen = karten.filter(function (k) {
        return !neu(k.id) && (vorarbeiten || istFaellig(k.id));
      });
      if (wiederholen.length) return wiederholen;
      return karten.filter(function (k) { return neu(k.id); });
    }

    function ziehen() {
      var rest = faellig();
      if (!rest.length) return null;
      var tiefstes = Math.min.apply(null, rest.map(function (k) { return kartenblick(k.id).fach; }));
      var topf = rest.filter(function (k) { return kartenblick(k.id).fach === tiefstes; });
      return topf[Math.floor(Math.random() * topf.length)];
    }

    function faecherZeichnen() {
      if (!anzeige) return;
      anzeige.innerHTML = "";
      for (var f = 1; f <= FAECHER; f++) {
        var n = karten.filter(function (k) { return kartenblick(k.id).fach === f; }).length;
        var s = el("div", "tr-fach" + (f === FAECHER ? " sitzt" : ""));
        s.appendChild(el("b", null, String(n)));
        s.appendChild(el("span", null, f === FAECHER ? "sitzt" : "Fach " + f));
        anzeige.appendChild(s);
      }
    }

    /* Keine fälligen Karten heißt nicht „nichts zu tun" — es heißt „du bist
       durch". Ein leerer Bildschirm sagt das nicht, also sagt es der Text. */
    function ruhepause() {
      buehne.innerHTML = "";
      var naechster = karten.reduce(function (min, k) {
        var t = tageBis(kartenblick(k.id).faellig);
        return t < min ? t : min;
      }, 9999);

      var box = el("div", "tr-fertig");
      box.appendChild(el("h3", null, "Für heute durch."));
      box.appendChild(el("p", null, naechster >= 9999
        ? "Es sind keine Karten hinterlegt."
        : naechster <= 1
          ? "Die nächsten Karten sind morgen wieder dran. Verteiltes Wiederholen wirkt genau deshalb — jetzt noch einmal durchzugehen bringt kaum etwas."
          : "Die nächsten " + karten.filter(function (k) {
              return tageBis(kartenblick(k.id).faellig) === naechster;
            }).length + " Karten sind in " + naechster + " Tagen dran."));
      var weiter = el("button", "start", "Trotzdem weiter üben");
      weiter.addEventListener("click", function () {
        vorarbeiten = true;
        naechste();
      });
      box.appendChild(weiter);
      buehne.appendChild(box);
    }

    function naechste() {
      var k = ziehen();
      if (!k) return ruhepause();

      buehne.innerHTML = "";
      var karte = el("div", "tr-karte");

      var vorn = el("div", "tr-seite");
      var herkunft = k.lernfeldTitel
        ? k.lernfeldTitel + " · " + k.kapitel
        : k.kapitel;
      vorn.appendChild(el("div", "tr-herkunft", herkunft));
      vorn.appendChild(mkEl("p", "tr-frage", k.frage));
      var zeigen = el("button", "dreher", "Antwort zeigen");
      vorn.appendChild(zeigen);
      karte.appendChild(vorn);
      buehne.appendChild(karte);
      zeigen.focus({ preventScroll: true });

      zeigen.addEventListener("click", function () {
        var hinten = el("div", "tr-antwort");
        hinten.appendChild(el("div", "bk", "Merksatz"));
        hinten.appendChild(mkEl("p", null, k.antwort));

        var reihe = el("div", "tr-urteil");
        var nochmal = el("button", "tr-nochmal", "Nochmal");
        var gewusst = el("button", "tr-gewusst", "Wusste ich");
        nochmal.addEventListener("click", function () { werten(k, false); });
        gewusst.addEventListener("click", function () { werten(k, true); });
        reihe.appendChild(nochmal);
        reihe.appendChild(gewusst);
        hinten.appendChild(reihe);

        zeigen.remove();
        karte.appendChild(hinten);
        requestAnimationFrame(function () { hinten.classList.add("da"); });
        gewusst.focus({ preventScroll: true });
      });
    }

    function werten(k, gewusst) {
      kartewerten(k.id, gewusst);
      faecherZeichnen();
      if (beiWechsel) beiWechsel();
      naechste();
    }

    faecherZeichnen();
    naechste();
  }

  /* ================================================== Sprungverteiler

     Ein Kapitel bekommt eine Adresse. Vorher änderte ein Kapitelwechsel nichts
     an der Adresse — die Zurück-Taste des Handys verließ deshalb die Seite,
     statt ein Kapitel zurückzugehen, und ein Kapitel ließ sich nicht verlinken.

     Absichtlich über die Raute und nicht über die History-API: So funktioniert
     dieselbe Seite auch, wenn jemand sie als Datei öffnet.                     */

  function verteiler(zeigen, anfang) {
    function jetzt() {
      return decodeURIComponent(location.hash.replace(/^#/, "")) || anfang;
    }
    window.addEventListener("hashchange", function () { zeigen(jetzt()); });
    zeigen(jetzt());
    return { jetzt: jetzt, geheZu: function (id) { location.hash = "#" + id; } };
  }

  /* „Zum Inhalt springen“ (Gesamtaudit A07): Der Link zeigt auf #inhalt –
     das ist aber auch die Adresse, an der der Verteiler die Ansicht abliest.
     Deshalb hier abfangen: nicht die Adresse ändern, sondern den sichtbaren
     Hauptinhalt fokussieren (erste sichtbare Überschrift, sonst <main>). */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a.sprung");
    if (!a) return;
    e.preventDefault();
    var main = document.getElementById("inhalt") || document.querySelector("main");
    if (!main) return;
    var ziel = null;
    var kandidaten = main.querySelectorAll("h1, h2");
    for (var i = 0; i < kandidaten.length; i++) {
      var h = kandidaten[i];
      if (h.offsetParent !== null && h.getClientRects().length) { ziel = h; break; }
    }
    ziel = ziel || main;
    if (!ziel.hasAttribute("tabindex")) ziel.setAttribute("tabindex", "-1");
    ziel.focus({ preventScroll: false });
    if (ziel.scrollIntoView) ziel.scrollIntoView({ block: "start" });
  });

  /* Breite Tabellen scrollen seitlich in ihrer Hülle. Wer nur die Tastatur
     benutzt, braucht dafür einen Fokus auf der Hülle – aber nur, wenn sie
     wirklich scrollt; sonst wäre es ein leerer Tab-Halt (Scan 13.10.2026). */
  function tabellenFokus() {
    var h = document.querySelectorAll(".tab-huelle");
    for (var i = 0; i < h.length; i++) {
      var scrollt = h[i].scrollWidth > h[i].clientWidth + 1;
      if (scrollt) h[i].setAttribute("tabindex", "0");
      else h[i].removeAttribute("tabindex");
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tabellenFokus);
  else tabellenFokus();
  window.addEventListener("resize", tabellenFokus);
  window.addEventListener("hashchange", function () { setTimeout(tabellenFokus, 50); });
  window.addEventListener("load", tabellenFokus);

  /* ================================================== Leiste unten */

  function leiste() {
    var bar = document.querySelector(".tableiste");
    if (!bar) return;

    // Aktiven Reiter aus dem Bereich der Seite bestimmen
    var bereich = document.body.dataset.bereich;
    if (bereich) {
      var treffer = bar.querySelector('.tab[href$="#' + bereich + '"]');
      if (treffer) { treffer.classList.add("an"); treffer.setAttribute("aria-current", "page"); }
    }

    // Beim Lesen weichen: 56 px dauerhaft vom Lesefenster sind am Handy viel.
    var letzte = window.scrollY, ruht = false;
    window.addEventListener("scroll", function () {
      if (ruht) return;
      ruht = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (Math.abs(y - letzte) > 6) {
          bar.classList.toggle("weg", y > letzte && y > 140);
          letzte = y;
        }
        ruht = false;
      });
    }, { passive: true });
  }

  /* ================================================== Zwischenspeicher

     Registriert wird hier und nicht in der App: Wer einen Lernzettel direkt
     geschickt bekommt und nie die Startseite öffnet, soll ihn trotzdem danach
     ohne Netz lesen können.                                                    */

  function sw() {
    if (!("serviceWorker" in navigator) || location.protocol === "file:") {
      return Promise.resolve(null);
    }
    return navigator.serviceWorker.register("sw.js").catch(function () { return null; });
  }

  /* ================================================== Lesezeichen */

  function gemerkt(zu) {
    return stand.lesezeichen.some(function (e) { return e.zu === zu; });
  }

  function merken(eintrag) {
    var i = stand.lesezeichen.map(function (e) { return e.zu; }).indexOf(eintrag.zu);
    if (i >= 0) stand.lesezeichen.splice(i, 1);
    else stand.lesezeichen.push(eintrag);
    sichern();
    return i < 0;
  }

  // Alte Konten und importierte Sicherungen bleiben kompatibel.
  // Die frühere Farbauswahl wird auf die feste helle Darstellung umgestellt.
  document.documentElement.dataset.stimmung = "hell";
  if (stand.stimmung !== "hell") {
    stand.stimmung = "hell";
    sichern();
  }
  document.addEventListener("DOMContentLoaded", function () { leiste(); sw(); });

  return {
    el: el, mk: mk, mkEl: mkEl, zahl: zahl, kommafeld: kommafeld,
    tagesschluessel: tagesschluessel, plusTage: plusTage, tageBis: tageBis,
    istDatum: istDatum, datumsformat: datumsformat,
    stand: stand, sichern: sichern, kapitelfach: kapitelfach, abdruck: abdruck,
    heuteGelernt: heuteGelernt, frisch: frisch, SCHLUESSEL: SCHLUESSEL,
    sofortSichern: sofortSichern, sicherungPruefen: sicherungPruefen, kontoErsetzen: kontoErsetzen,
    kontoAuffrischen: kontoAuffrischen, lernstandZusammenfuehren: lernstandZusammenfuehren,
    kapitelfachBinden: kapitelfachBinden, kontoGeneration: kontoGeneration, beiKontowechsel: beiKontowechsel,
    beiFremdemStand: beiFremdemStand,
    probeklausurId: probeklausurId, probeklausurZeit: probeklausurZeit,
    PROBEKLAUSUR_SCHLUESSEL: PROBEKLAUSUR_SCHLUESSEL,
    probeklausurSchluessel: probeklausurSchluessel,
    berufVon: berufVon, beruf: aktiverBeruf, berufSetzen: berufSetzen,
    zuletzt: zuletzt, zuletztSetzen: zuletztSetzen,
    pruefungstermin: pruefungstermin, pruefungsterminSetzen: pruefungsterminSetzen,
    probeklausurErgebnisSpeichern: probeklausurErgebnisSpeichern,
    probeklausurZuruecksetzen: probeklausurZuruecksetzen,
    FASSUNG: FASSUNG,
    kartenstand: kartenstand, istFaellig: istFaellig, kartewerten: kartewerten,
    WARTEN: WARTEN, FAECHER: FAECHER, trainer: trainer,
    verteiler: verteiler, sw: sw,
    gemerkt: gemerkt, merken: merken
  };
})();
