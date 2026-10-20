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
   - Eine laufende Probeklausur bleibt bis zur Abgabe auf dem Gerät; ihr
     Ergebnis gehört danach zum Lernstand und wird mit abgeglichen.

   Der Merkzettel heißt bewusst „azubipass-lernsync“ ohne Doppelpunkt:
   kern.js hält alles mit „azubipass:“ für alten Lernstand.                   */

(function () {
  "use strict";

  var AP = window.AP;
  if (!AP || !AP.community || !AP.stand || !AP.kontoErsetzen) return;

  var META = "azubipass-lernsync";
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

  function merken(konto, version, am) {
    try { localStorage.setItem(META, JSON.stringify({ nutzer: konto, version: version, am: am || null })); }
    catch (e) {}
    setzen("aktuell", { um: new Date() });
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
      var konto = r.konto, e = r.eintrag, m = meta();

      // Auf diesem Gerät war zuletzt ein anderes Konto: dessen Stand nicht mitnehmen.
      if (m && m.nutzer !== konto) {
        if (e && brauchbar(e.daten)) {
          ersetzen(e.daten);
          merken(konto, e.version, AP.stand.geaendertAm);
          return;
        }
        ersetzen(AP.frisch());
        return senden(konto, e ? e.version : 0, n);
      }

      // Das Konto hat noch keinen Lernstand: den von diesem Gerät hochladen.
      if (!e) return senden(konto, 0, n);

      // Unbrauchbarer Serverstand (sollte nicht vorkommen): mit dem Gerätestand ersetzen.
      if (!brauchbar(e.daten)) return senden(konto, e.version, n);

      // Server unverändert seit dem letzten Abgleich.
      if (m && m.version === e.version) {
        if (lokalGeaendert(m)) return senden(konto, e.version, n);
        merken(konto, e.version, m.am);
        return;
      }

      // Server neuer, auf dem Gerät nichts geändert: übernehmen.
      if (m && !lokalGeaendert(m)) {
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
  AP.nachSichern = function () { if (!intern) planen(VERZOEGERUNG); };

  document.addEventListener("visibilitychange", function () {
    if (!AP.community.hatGespeicherteSitzung()) return;
    if (document.visibilityState === "visible") planen(300);
    else if (lokalGeaendert(meta())) abgleichen();     // beim Wegwechseln: Ausstehendes sofort
  });

  window.addEventListener("online", function () { planen(300); });

  function anmeldungBeobachten() {
    AP.community.beiAenderung(function (ereignis) {
      if (ereignis === "SIGNED_IN" || ereignis === "INITIAL_SESSION") planen(300);
      else if (ereignis === "SIGNED_OUT") setzen("lokal");
    });
  }

  function los() {
    anmeldungBeobachten();
    if (AP.community.hatGespeicherteSitzung()) planen(800);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", los);
  else los();

  AP.lernstandSync = {
    abgleichen: abgleichen,
    status: function () { return status; },
    beiStatus: beiStatus
  };
})();
