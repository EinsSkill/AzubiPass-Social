/* AzubiPass · Lernstand am Konto
   ---------------------------------------------------------------------------
   Gleicht den Lernstand aus kern.js (Kapitel, Karteikarten, Übungsfragen,
   Lesezeichen, Probeklausur-Ergebnisse, Prüfungstermin …) mit dem
   Community-Konto ab. Entscheidung Lukes, 20.10.2026: „alles über den Account
   speichern“.

   Grundsätze
   - Ohne Anmeldung bleibt alles wie bisher: Der Lernstand liegt im Browser.
   - Der Browser bleibt der Arbeitsspeicher; das Konto ist die Ablage. Lernen
     und Üben funktionieren auch offline, abgeglichen wird, sobald Netz da ist.
   - Kein blindes Überschreiben: Jeder Schreibvorgang nennt die zuletzt
     gesehene Serverversion. Hat ein anderes Gerät inzwischen gespeichert,
     wird zusammengeführt (dieselbe Regel wie beim Einspielen einer Sicherung)
     und erneut gesendet.
   - Ein anderes Konto auf demselben Gerät bekommt nie den Lernstand des
     vorherigen Kontos, sondern seinen eigenen (oder einen leeren).
   - LS01: Der Gerätestand kennt sein Konto, sobald eine Anmeldung bekannt ist –
     nicht erst nach dem ersten erfolgreichen Abgleich. Beim Kontowechsel wird
     getrennt, bevor irgendetwas angezeigt oder gesendet wird. Noch nicht
     gesendete Änderungen des bisherigen Kontos werden für dessen nächste
     Anmeldung auf diesem Gerät zurückgelegt, nie ins andere Konto übernommen.
     Nur ein Gerätestand ohne Konto (nie angemeldet) geht beim ersten Abgleich
     ins Konto, wie bisher.
   - LS02: Mehrere Tabs teilen sich den Lernstand im Browser. Vor jeder
     Entscheidung holt der Abgleich erst den Merkzettel und dann den aktuellen
     Stand aus dem Browser in diesen Tab (AP.kontoAuffrischen). So gehört die
     Versionsbasis immer zu Inhalt, den dieser Tab wirklich hat.
   - Eine laufende Probeklausur bleibt bis zur Abgabe auf dem Gerät; ihr
     Ergebnis gehört danach zum Lernstand und wird mit abgeglichen.

   Der Merkzettel heißt bewusst „azubipass-lernsync“ ohne Doppelpunkt:
   kern.js hält alles mit „azubipass:“ für alten Lernstand.                   */

(function () {
  "use strict";

  var AP = window.AP;
  if (!AP || !AP.community || !AP.stand || !AP.kontoErsetzen || !AP.kontoAuffrischen) return;

  var META = "azubipass-lernsync";
  var OFFEN = "azubipass-lernsync-offen";   // zurückgelegte, ungesendete Stände je Konto
  // Nach einer Änderung gebündelt senden. AZUBIPASS_SYNC_MS nur für Tests.
  var VERZOEGERUNG = window.AZUBIPASS_SYNC_MS || 15000;
  var RUNDEN = 3;                     // Wiederholungen bei gleichzeitigem Speichern

  var status = { art: "lokal" };
  var hoerer = [];
  var laeuft = null, nochmal = false, zeitgeber = null, intern = false;

  /* ---------------------------------------------- Merkzettel und Status */

  function meta() {
    try {
      var m = JSON.parse(localStorage.getItem(META));
      return m && typeof m === "object" && typeof m.nutzer === "string" ? m : null;
    } catch (e) { return null; }
  }

  function metaSchreiben(m) {
    try { localStorage.setItem(META, JSON.stringify(m)); } catch (e) {}
  }

  function merken(konto, version, am) {
    var m = meta();
    if (m && m.nutzer !== konto) return;      // inzwischen anderes Konto auf dem Gerät
    metaSchreiben({ nutzer: konto, version: version, am: am || null });
    setzen("aktuell", { um: new Date() });
  }

  /* ---------------------------------------------- Konto des Gerätestands (LS01) */

  function offenLesen() {
    try {
      var o = JSON.parse(localStorage.getItem(OFFEN));
      return o && typeof o === "object" && !Array.isArray(o) ? o : {};
    } catch (e) { return {}; }
  }

  function offenSchreiben(o) {
    try {
      if (Object.keys(o).length) localStorage.setItem(OFFEN, JSON.stringify(o));
      else localStorage.removeItem(OFFEN);
    } catch (e) {}
  }

  /* Ein Konto ist auf diesem Gerät angemeldet. Gehört der Gerätestand noch
     niemandem, gehört er ab jetzt diesem Konto. Gehört er einem anderen,
     wird jetzt getrennt – synchron, vor Anzeige und Senden. */
  function kontoVermerken(konto) {
    if (!konto) return;
    AP.kontoAuffrischen();
    var m = meta();
    if (!m) { metaSchreiben({ nutzer: konto, version: null, am: null }); return; }
    if (m.nutzer === konto) return;

    var offen = offenLesen();
    if (lokalGeaendert(m)) {
      offen[m.nutzer] = { daten: kopie(AP.stand), version: m.version == null ? null : m.version, am: m.am || null };
    }
    var eigen = offen[konto];
    delete offen[konto];
    offenSchreiben(offen);

    // Merkzettel zuerst: kern.js ordnet Schreibvorgänge anderer Tabs danach zu.
    if (eigen && brauchbar(eigen.daten)) {
      // Zurückgelegter, noch nicht gesendeter Stand dieses Kontos: gilt als
      // eigene Änderung (neuer Zeitstempel) und wird beim Abgleich gesendet.
      metaSchreiben({ nutzer: konto, version: eigen.version, am: eigen.am });
      ersetzen(eigen.daten);
    } else {
      metaSchreiben({ nutzer: konto, version: null, am: null });
      ersetzen(AP.frisch());
      // Leerer Anfang ist keine eigene Änderung: Serverstand darf ihn ersetzen.
      metaSchreiben({ nutzer: konto, version: null, am: AP.stand.geaendertAm });
    }
    setzen("sendet");
  }

  function sitzungsKonto() {
    return AP.community.gespeichertesKonto ? AP.community.gespeichertesKonto() : null;
  }

  function setzen(art, extra) {
    status = { art: art };
    Object.keys(extra || {}).forEach(function (k) { status[k] = extra[k]; });
    hoerer.slice().forEach(function (h) { try { h(status); } catch (e) {} });
  }

  function beiStatus(h) {
    hoerer.push(h);
    try { h(status); } catch (e) {}
    return function () { hoerer = hoerer.filter(function (x) { return x !== h; }); };
  }

  // Hat sich der Lernstand auf diesem Gerät seit dem letzten Abgleich geändert?
  function lokalGeaendert(m) {
    if (!m || !m.am) return true;
    return String(AP.stand.geaendertAm || "") > String(m.am);
  }

  function kopie(o) { return JSON.parse(JSON.stringify(o)); }

  function brauchbar(daten) {
    return !!daten && typeof daten === "object" && !Array.isArray(daten) &&
           (!AP.sicherungPruefen || AP.sicherungPruefen(daten).length === 0);
  }

  // Ersetzt den Lernstand im Browser, ohne dabei selbst einen Abgleich anzustoßen.
  function ersetzen(daten) {
    intern = true;
    try { AP.kontoErsetzen(daten); } finally { intern = false; }
    try { if (AP.appNeuZeichnen) AP.appNeuZeichnen(); } catch (e) {}
  }

  /* ---------------------------------------------- Abgleich */

  function senden(konto, basis, runde) {
    var daten = kopie(AP.stand);
    var am = AP.stand.geaendertAm;
    setzen("sendet");
    return AP.community.lernstandSpeichern(daten, basis, konto).then(function (r) {
      if (r && r.ok) { merken(konto, r.version, am); return; }
      // Ein anderes Gerät hat inzwischen gespeichert: neu holen und zusammenführen.
      return runde_(runde + 1);
    });
  }

  function runde_(n) {
    if (n > RUNDEN) {
      var f = new Error("Der Lernstand wurde gleichzeitig auf einem anderen Gerät gespeichert. Wir versuchen es gleich noch einmal.");
      f.art = "server";
      return Promise.reject(f);
    }
    return AP.community.lernstandHolen().then(function (r) {
      var konto = r.konto, e = r.eintrag;

      // Gehört der Gerätestand einem anderen Konto, wird hier zuerst getrennt (LS01).
      kontoVermerken(konto);
      // Erst den Merkzettel, dann den Stand aus dem Browser lesen (LS02): Was der
      // Merkzettel als gesendet nennt, steckt dann sicher im Stand dieses Tabs.
      var m = meta();
      AP.kontoAuffrischen();
      if (!m) return Promise.reject(new Error("Dieser Browser speichert gerade nichts. Der Abgleich ist so nicht möglich."));
      // Ein anderer Tab hat das Gerät gerade einem anderen Konto zugeordnet: neu beginnen.
      if (m.nutzer !== konto) return Promise.reject(Object.assign(new Error("veraltet"), { art: "veraltet" }));

      // Das Konto hat noch keinen Lernstand: den von diesem Gerät hochladen.
      if (!e) return senden(konto, 0, n);

      // Unbrauchbarer Serverstand (sollte nicht vorkommen): mit dem Gerätestand ersetzen.
      if (!brauchbar(e.daten)) return senden(konto, e.version, n);

      // Server unverändert seit dem letzten Abgleich.
      if (m.version === e.version) {
        if (lokalGeaendert(m)) return senden(konto, e.version, n);
        merken(konto, e.version, m.am);
        return;
      }

      // Server neuer, auf dem Gerät nichts geändert: übernehmen.
      if (!lokalGeaendert(m)) {
        ersetzen(e.daten);
        merken(konto, e.version, AP.stand.geaendertAm);
        return;
      }

      // Beide geändert, oder erster Abgleich auf diesem Gerät: zusammenführen.
      var ziel = kopie(AP.stand);
      AP.lernstandZusammenfuehren(ziel, e.daten);
      ersetzen(ziel);
      return senden(konto, e.version, n);
    });
  }

  function abgleichen() {
    if (zeitgeber) { clearTimeout(zeitgeber); zeitgeber = null; }
    if (laeuft) { nochmal = true; return laeuft; }
    if (!AP.community.hatGespeicherteSitzung()) { setzen("lokal"); return Promise.resolve(status); }
    if (!AP.lernstandZusammenfuehren) { setzen("fehler", { text: "Der Abgleich ist gerade nicht verfügbar." }); return Promise.resolve(status); }

    laeuft = runde_(0).catch(function (f) {
      var text = f && f.message ? f.message : "Der Abgleich hat nicht geklappt.";
      if (f && f.art === "anmeldung") setzen("lokal");
      else if (f && f.art === "veraltet") nochmal = true;
      else if (/Profil/.test(text)) setzen("ohneProfil");
      else if (f && f.art === "netz") setzen("offline");
      else setzen("fehler", { text: text });
    }).then(function () {
      laeuft = null;
      if (nochmal) { nochmal = false; return abgleichen(); }
      return status;
    });
    return laeuft;
  }

  function planen(ms) {
    if (!AP.community.hatGespeicherteSitzung()) return;
    if (zeitgeber) clearTimeout(zeitgeber);
    zeitgeber = setTimeout(function () { zeitgeber = null; abgleichen(); }, ms);
  }

  /* ---------------------------------------------- Auslöser */

  // kern.js meldet jede Änderung des Lernstands.
  AP.nachSichern = function () {
    if (intern) return;
    // Mitten im Speichern (kern.js meldet vor dem Schreiben): nur das Konto
    // vermerken, nichts aus dem Browser nachladen – das würde die Änderung verdrängen.
    if (!meta() && AP.community.hatGespeicherteSitzung()) {
      var k = sitzungsKonto();
      if (k) metaSchreiben({ nutzer: k, version: null, am: null });
    }
    planen(VERZOEGERUNG);
  };

  document.addEventListener("visibilitychange", function () {
    if (!AP.community.hatGespeicherteSitzung()) return;
    if (document.visibilityState === "visible") { AP.kontoAuffrischen(); planen(300); }
    else if (lokalGeaendert(meta())) abgleichen();     // beim Wegwechseln: Ausstehendes sofort
  });

  window.addEventListener("online", function () { planen(300); });

  function anmeldungBeobachten() {
    AP.community.beiAenderung(function (ereignis, sitzung) {
      if ((ereignis === "SIGNED_IN" || ereignis === "INITIAL_SESSION") && sitzung && sitzung.user) {
        kontoVermerken(sitzung.user.id);
        planen(300);
      }
      else if (ereignis === "SIGNED_OUT") setzen("lokal");
    });
  }

  function los() {
    anmeldungBeobachten();
    if (AP.community.hatGespeicherteSitzung()) {
      kontoVermerken(sitzungsKonto());        // ohne Netz: Konto aus der gespeicherten Sitzung
      planen(800);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", los);
  else los();

  AP.lernstandSync = {
    abgleichen: abgleichen,
    status: function () { return status; },
    beiStatus: beiStatus
  };
})();
