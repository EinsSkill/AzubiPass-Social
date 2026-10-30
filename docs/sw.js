/* AzubiPass · Zwischenspeicher
   Erzeugt von quellen/gemeinsames.py — nicht von Hand bearbeiten.

   Eine Fassung = ein Speicher mit genau den Dateien dieses Baus. Jede Datei
   hat einen Prüfwert (SHA-256). Installiert wird nur, wenn ALLE Dateien
   ankommen und ALLE Prüfwerte stimmen – sonst bleibt die bisherige Fassung
   unverändert in Betrieb, und beim nächsten Besuch wird es neu versucht.
   Später wird nichts aus dem Netz in den Speicher einer Fassung nachgefüllt:
   So kann es kein Gemisch aus zwei Fassungen geben (Gesamtaudit A04).

   Bewusst ohne skipWaiting: Eine neue Fassung übernimmt nicht mitten im Lesen,
   sondern meldet sich in der App und wartet, bis jemand sie anfordert. */

var SPEICHER = "azubipass-1c29a38e912013d2";
var VORRAT = {
  "./": "4a6fb745b3dc7cdaa6104f6669d576cb6b92146262b0b8743424c7bf27b0dbd9",
  "app.html": "4a6fb745b3dc7cdaa6104f6669d576cb6b92146262b0b8743424c7bf27b0dbd9",
  "buchfuehrung.html": "c214c51f9efbfd3a2733e7cfe9cc640a22090666fc427e8891fd95bfc532c02b",
  "datenschutz.html": "a8d08f21769436967fe55ac5a594f338c8b060bac3555778c3f7b34dac5354a5",
  "ik2024-lf01.html": "d92d14e5d6858225ad6b5a3b365c0489efc5a6dfcf7c3454017ff1bb634f1e03",
  "ik2024-lf02.html": "7a588995430aa68806ac109ee7facab9b58f947219ff03da128bc261e2f8e431",
  "ik2024-lf03.html": "d44b5106195345684475a8ce2cc5df3c4cf554c236188e2b365d8e9154e9fd92",
  "ik2024-lf04.html": "c401fe4e7222fd45319ad65b81380a8cfbd54d15ed5d4f1bd25ae5bc4203c8cf",
  "ik2024-lf05.html": "3cbb6119227c4158066e8f8733f644b67468559828cdfcb08aa14e4b420a239f",
  "ik2024-lf06.html": "2fa9093425be7160350d04d26859700956ec9a7e36dbc566c205ee2bf17ae7c4",
  "ik2024-lf07.html": "514eb683f3d0653fff5ff123e4de5419bf8fddcfab10841f116e27aaafe3e0ad",
  "ik2024-lf08.html": "b57d0d52b24d935044d6c1c4d47e3f992500133e05a4a301516c7b3034afc733",
  "ik2024-lf09.html": "10fe2a334719a13ef11eca3f87c8b1618ea8ddcdeb7bc74affef5daab6a53a9f",
  "ik2024-lf10.html": "2a6718658806451e2c2daac73fed3ce785ba65e888dc35fa803380811a881f7d",
  "ik2024-lf11.html": "9e8ac1b6e3579c41db90bc39653838fe55d49b3c994580f28e086d239d9d6de3",
  "ik2024-lf12.html": "d0e6aa184ff0469b312e46cbf7577a659ce55d07d26aab027c98c2cfff31f6ee",
  "ik2024-lf13.html": "83d180ae3fa40b2fee254260cf918d2bfd7f93ca1afc51fb19d3cdbcebb063fe",
  "impressum.html": "5c7dddb5aae1ce5ee624d064dd310364d8c59549bb94bf84e0cc551cb8cc0548",
  "index.html": "4a6fb745b3dc7cdaa6104f6669d576cb6b92146262b0b8743424c7bf27b0dbd9",
  "landing.html": "ae2f8488c7c19fd7a482c984bdc3c72eabe8eb61c1329bb9b5adb72d357a1a93",
  "lf1.html": "26834c78c0737a423a7a38b1830e10c75998b9027e0ced2701103626edd7310b",
  "lf10.html": "b3fdc41240823da9cfb2f8b1a54a976d6fb779df914efdd348f5769426f2d9a1",
  "lf11.html": "674b110586f4bf0679c97f2e9ddf34938c3a4b1bda33b58f758321094fbe9ea3",
  "lf12.html": "cf781131c14b2ecc3aa49a7c580d27995928ff48824b2ba8ab71c4e444ba05dc",
  "lf13.html": "b707235cbef348cf78279ea39a1b233469d553bbc1713c3d701c9ae0c0b6705a",
  "lf2.html": "dcbc1218756fc939c556fa87aff9d6798a05cf37e32648e1581e7d0221ff7d8b",
  "lf3.html": "449d29533eb7049d83f2e8557bf0271cbd9ac158a287e1d3f680e9ae7dc3c73f",
  "lf4.html": "8ea997e11a703dd8921ae11417220da1fbb4610f23b0f3e84476b039cef190f2",
  "lf5.html": "1bd0f558921b76c9f22bcd524ede288bddc5c5af6303a1e9fe516f1b9e3d96c8",
  "lf7.html": "5069989d907b17be1396889b2dfeb5b7cab0abc1c483ef13fcc989398fb7d8e4",
  "lf8.html": "fdab2517c61219b941a2332ff36d3c049cd4bdabbc440caaf0b7a6e799fc07d2",
  "lf9.html": "0fad145127d8453328d5842f0238bdf2d47da69be25fb79831d0678d6bea3e7c",
  "manifest.webmanifest": "2494f22d045fc9647f6b1ae68a6b9cf0c029572ab26dc09f90778f9e42d7ca0a",
  "mittel/app.js": "49e2f946051d0f3e1dfb60f5f7ea5ee3ec1db923636b71f29f1a848c269cdfd5",
  "mittel/aufgaben.js": "3da2279f3048ff8233db6f053e2ac066cc5b31b8e17c21e6ed7f6c8c9b1022f3",
  "mittel/aufgaben.json": "acb7d5fbc42484fa9c6ede0cb25865ef1871ad41e5a35bd0483bac5ca993ecfa",
  "mittel/azubipass-logo.png": "6fbfaa65da67de20b628b6d5415a8a46c95ceeaa5c6638492e2860e7d6e98973",
  "mittel/azubipass-symbol.png": "82cddbb695cbba0a09d3b933eb4b178e221463e015b962d8013cdff580d4a692",
  "mittel/azubipass.css": "dbdda5a25c8b09c501afcfaff31b2541ebe7ef77dc8344839e0f28fff09f1647",
  "mittel/azubipass.js": "5838e9767cc4c4e733382ddbfeb2f7aff6ed6d731a5fc3b86a96af66cb2f43cf",
  "mittel/community-ansicht.js": "00e3cbae412cc79188537f71b3edbc4ff78741ea60c17e2358157f65ea98a781",
  "mittel/community-beitraege.js": "3b5e08ef5991386cc473798cb3d53c86d37a9e19375d87ec948924e7b06f15ab",
  "mittel/community-gruppen.js": "a519bc6fbcc8b66019c4cdecbb14f8472d77f9bccf3e65493c24f4d7389cbe7a",
  "mittel/community-moderation.js": "a4857c4397ac6b43598aedb399d74edb761c2c388b5e7428e98a905a28617c3a",
  "mittel/community.js": "ac8211fb2d0d87fb41f18a4a66c6ac1389162fc2f6c99398965a261bf8dbedf7",
  "mittel/ibm-plex-mono-400-latin-ext.woff2": "6bc0f226a5b7884a8170e3f62c63d7675609d4631bdc5931b5cdab81821f00eb",
  "mittel/ibm-plex-mono-400-latin.woff2": "08949f728dc52d528e69b1667d15c89a5686a4ee9a296ff90983985f99c380f7",
  "mittel/ibm-plex-mono-500-latin-ext.woff2": "6bb06407c97584b0867a959e05e8874693bfeb8c317de190811c51598f2d99ea",
  "mittel/ibm-plex-mono-500-latin.woff2": "01d285447409c8a588692162439a038b8cbd7871309ee20267b0d2d91c6e8e22",
  "mittel/ibm-plex-sans-400-latin-ext.woff2": "d160e20920ae4d6556518d352d3af27a74e9b0de3d8fe17b1c1044fc75aa2f81",
  "mittel/ibm-plex-sans-400-latin.woff2": "e2291e842cf5af167122a22881a740c7f2dda7716f1e8cd76680264f4a859470",
  "mittel/ibm-plex-sans-500-latin-ext.woff2": "d160e20920ae4d6556518d352d3af27a74e9b0de3d8fe17b1c1044fc75aa2f81",
  "mittel/ibm-plex-sans-500-latin.woff2": "e2291e842cf5af167122a22881a740c7f2dda7716f1e8cd76680264f4a859470",
  "mittel/ibm-plex-sans-600-latin-ext.woff2": "d160e20920ae4d6556518d352d3af27a74e9b0de3d8fe17b1c1044fc75aa2f81",
  "mittel/ibm-plex-sans-600-latin.woff2": "e2291e842cf5af167122a22881a740c7f2dda7716f1e8cd76680264f4a859470",
  "mittel/inhalt.json": "9756cc6d9feac9642401e2a3cbc50a40706a9010aaa0b7ff93f643f1d80e54db",
  "mittel/kern.js": "fe047655aad844758254282a3d4a0d3e8942970b8eafc0d606c6076aaef74bef",
  "mittel/landing.css": "c1d299ad11bd6a3fd4b8515d08334b45741b6616da271a4899acf51353596f45",
  "mittel/landing.js": "d5a83cc74c9e6b6f398dca81c807891a96a1547bae6da083e01828081c0d724d",
  "mittel/lernstand-sync.js": "dd5ccafff9424a58f6a9d211b6f6950db3b1f1a1d87b485c5810accebf126fa9",
  "mittel/schriften.css": "751fec1c351de1ff2d2d9274f9d5fa1ef3578751b4ad664489fbed92144a69b1",
  "mittel/source-serif-4-400-latin-ext.woff2": "155f6e701097cc269cf8d5d7ac86795f263f1afbeb47c14d1d747108c9335389",
  "mittel/source-serif-4-400-latin.woff2": "f2ea9c12d2fe9bd3a9589b02ad2c0909da88f30938c91adc838c4f4098f9f9e0",
  "mittel/source-serif-4-600-kursiv-latin-ext.woff2": "ce3fd3b624f3c6749b967c4cbf14aefb887f169d8fddc1053c745d91a6de439a",
  "mittel/source-serif-4-600-kursiv-latin.woff2": "a73991f26aea1fd32b8d172d29f5c8c86d458ad8671401caacb3fc3fd558b375",
  "mittel/source-serif-4-600-latin-ext.woff2": "155f6e701097cc269cf8d5d7ac86795f263f1afbeb47c14d1d747108c9335389",
  "mittel/source-serif-4-600-latin.woff2": "f2ea9c12d2fe9bd3a9589b02ad2c0909da88f30938c91adc838c4f4098f9f9e0",
  "mittel/source-serif-4-700-latin-ext.woff2": "155f6e701097cc269cf8d5d7ac86795f263f1afbeb47c14d1d747108c9335389",
  "mittel/source-serif-4-700-latin.woff2": "f2ea9c12d2fe9bd3a9589b02ad2c0909da88f30938c91adc838c4f4098f9f9e0",
  "mittel/suche.json": "52844079b0e7aeb56152a7c5df2bf191aaf8cc37544f44fb8af6b74d120ec8d6",
  "mittel/supabase.js": "50db96e85947966782e7a3f4252a59dd8285f1ca00c1718a4079ed621e10bae1",
  "mittel/symbol-v1-180.png": "718223b0c01694f646fc25b5d0c384fcbc825381b2d7fdc484ae8d1bee5e2711",
  "mittel/symbol-v1-192.png": "e0b355299d9fce7756c6e251095869599ad87706b7d8f4bbb6abdde89493f63e",
  "mittel/symbol-v1-32.png": "3d3c534fed31bcc2a086ec56f744bb0a5a2defd0246c8f6bd81ba6f9b82e6998",
  "mittel/symbol-v1-512.png": "689d35e853287622462aa23a4a4153ac9a1c7a2e0a72ab179956dbe56959896c"
};

function hex(puffer) {
  return Array.prototype.map.call(new Uint8Array(puffer), function (b) {
    return ("0" + b.toString(16)).slice(-2);
  }).join("");
}

function holen(pfad, pruefwert) {
  return fetch(new Request(pfad, { cache: "reload" })).then(function (antwort) {
    if (!antwort.ok) throw new Error(pfad + ": " + antwort.status);
    return antwort.arrayBuffer().then(function (puffer) {
      return crypto.subtle.digest("SHA-256", puffer).then(function (wert) {
        if (hex(wert) !== pruefwert) throw new Error(pfad + ": andere Fassung");
        return [pfad, new Response(puffer, { status: 200, headers: antwort.headers })];
      });
    });
  });
}

self.addEventListener("install", function (e) {
  var namen = Object.keys(VORRAT);
  e.waitUntil(
    Promise.all(namen.map(function (n) { return holen(n, VORRAT[n]); }))
      .then(function (alle) {
        return caches.open(SPEICHER).then(function (c) {
          return Promise.all(alle.map(function (x) { return c.put(x[0], x[1]); }));
        });
      })
      .catch(function (fehler) {
        // Halbe Fassung wegwerfen; die Installation scheitert sichtbar.
        return caches.delete(SPEICHER).then(function () { throw fehler; });
      })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (namen) {
    return Promise.all(namen.map(function (n) {
      return n !== SPEICHER && n.indexOf("azubipass-") === 0 ? caches.delete(n) : null;
    }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("message", function (e) {
  if (e.data === "uebernehmen") self.skipWaiting();
});

/* Weg einer Anfrage relativ zum Geltungsbereich, so wie er im VORRAT steht
   ("./" für die Startseite). null = gehört nicht zu dieser App. */
function vorratsName(url) {
  var basis = new URL(self.registration.scope).pathname;
  if (url.pathname.indexOf(basis) !== 0) return null;
  var rest = decodeURIComponent(url.pathname.slice(basis.length));
  return rest === "" ? "./" : rest;
}

/* Gesamtaudit G01: Eine Datei, die zu dieser Fassung gehört, aber im Speicher
   fehlt (entfernt, Speicher geleert), kommt nur aus dem Netz, wenn ihr
   Prüfwert genau passt – dann wird sie auch wieder abgelegt. Sonst gibt es
   einen klaren Hinweis statt einer Datei aus einer anderen Fassung. */
function fehltImSpeicher(c, anfrage, name) {
  return holen(name, VORRAT[name]).then(function (x) {
    return c.put(x[0], x[1].clone()).then(function () { return x[1]; }, function () { return x[1]; });
  }).catch(function () {
    if (anfrage.mode === "navigate") {
      return new Response(
        '<!doctype html><html lang="de"><meta charset="utf-8">' +
        '<meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<title>AzubiPass</title><body style="font-family:system-ui,sans-serif;max-width:32rem;margin:15vh auto;padding:0 20px;line-height:1.5">' +
        '<h1 style="font-size:1.4rem">Diese Seite fehlt im Offline-Speicher</h1>' +
        '<p>Die gespeicherte Fassung der App ist unvollständig. Öffne die App mit Internetverbindung neu, dann wird sie wieder vollständig geladen.</p>' +
        '<p><a href="./">Zur Startseite</a></p></body></html>',
        { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } });
    }
    return new Response("", { status: 503, statusText: "Nicht in dieser Fassung verfuegbar" });
  });
}

self.addEventListener("fetch", function (e) {
  var anfrage = e.request;
  if (anfrage.method !== "GET") return;
  var url = new URL(anfrage.url);
  if (url.origin !== self.location.origin) return;
  var name = vorratsName(url);

  e.respondWith(caches.open(SPEICHER).then(function (c) {
    // Nur aus der eigenen Fassung – nie aus einem anderen Speicher.
    return c.match(anfrage, { ignoreSearch: true }).then(function (treffer) {
      if (treffer) return treffer;
      // Gehört zur Fassung, fehlt aber: nur mit passendem Prüfwert.
      if (name !== null && Object.prototype.hasOwnProperty.call(VORRAT, name)) {
        return fehltImSpeicher(c, anfrage, name);
      }
      // Nicht im Vorrat: durchreichen, aber nicht in diese Fassung legen.
      return fetch(anfrage).catch(function () {
        return anfrage.mode === "navigate" ? c.match("app.html") : Response.error();
      });
    });
  }));
});
