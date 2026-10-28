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

var SPEICHER = "azubipass-b1001b3496bedcd4";
var VORRAT = {
  "./": "4a6fb745b3dc7cdaa6104f6669d576cb6b92146262b0b8743424c7bf27b0dbd9",
  "app.html": "4a6fb745b3dc7cdaa6104f6669d576cb6b92146262b0b8743424c7bf27b0dbd9",
  "buchfuehrung.html": "6b76f56aa6b64f26396294e8af4d45c0d6fa41d101443c03601d1c9d6d796a07",
  "datenschutz.html": "07945420b168f4ac719e8fe9768193d356d24e48800ee4000970f97ef9f0f94c",
  "ik2024-lf01.html": "be11a3c8294df5673c74cc1d5c18b0ded1f21bffde8239a56aa979cdc4869cb9",
  "ik2024-lf02.html": "f2111b08bfb905effbb8e52fdf159ac0f27612728643bf2c596b231905ae0ade",
  "ik2024-lf03.html": "72b490fdbcd564157eb7b00debd7fce091fa17b5424ce0c2f1dfd61c5c234d4f",
  "ik2024-lf04.html": "4dd9b4e4c97a3a2750021a90f29d2e42a965b883a55eb48ea01f5c0c43764c4b",
  "ik2024-lf05.html": "c9e7beedab70517dce332fcebed82fd7846acacc2b1a8680c4f87ea7d7e3914c",
  "ik2024-lf06.html": "f1749578cc99c0e2bbc2a4ba008b1958c60d09ddb96abcad62f89064d42ef05d",
  "ik2024-lf07.html": "71b6caf781b8e518c33897d1d0d5d4335718ab2044e2b5832b100ab1f384999b",
  "ik2024-lf08.html": "1768b03863cc9ad029e6fc34db6d17bc336e96d386bbaf8986c8445f81618c85",
  "ik2024-lf09.html": "7757894c96463b8c27b462746455473e8e57c805cc5a276d2187351891bd18db",
  "ik2024-lf10.html": "68691ea847aa0a563f8ce87cc6db006e71a1539be3273d450b7cc5d730b4b254",
  "ik2024-lf11.html": "17d31c2dc8c74bb2708722d437f1b62832f3416c36452cb109e6126e0d0c8db7",
  "ik2024-lf12.html": "b98cc7996f170f431a60a45f782fd970a2fe31568a30765729ed4962923d83fd",
  "ik2024-lf13.html": "214c477e9cb99e0cd08a8fa0bbdcf636c1a3419252f1484ed6d5ce36b1c836ef",
  "impressum.html": "5c7dddb5aae1ce5ee624d064dd310364d8c59549bb94bf84e0cc551cb8cc0548",
  "index.html": "4a6fb745b3dc7cdaa6104f6669d576cb6b92146262b0b8743424c7bf27b0dbd9",
  "landing.html": "ae2f8488c7c19fd7a482c984bdc3c72eabe8eb61c1329bb9b5adb72d357a1a93",
  "lf1.html": "0e3e32272ce52d8a3b1d80b5af91474c6fe3bd1bb8705e4c49c571c469c4d567",
  "lf10.html": "a999b17c96002dea72991588fccab05156185f064fcca62d4b96ceaa7dba2aec",
  "lf11.html": "eae2c2e7b04fe787785476aa378b4541b9bdcf63cb7c954eed3c49b11f31b414",
  "lf12.html": "f25a98c14d48ee3bf1a31218ba3157ab074580077ed51f283f5f309fe4a3e9db",
  "lf13.html": "4879229e49f9a2daf440ae70e8e4b64d8c2977dca7c4b5694929130c3d4b6f8e",
  "lf2.html": "263ad3c777828ff3e4a1729a576a217efceee17a85277af6cf9622c7b03edba6",
  "lf3.html": "c491fd3df755c96eb00d3a41fad6918693d9a7dec6df4ceedfabb706ed3392d4",
  "lf4.html": "b63046004f5338a52f05bd49384d4202154cfe7c93767493717861b3e3263b26",
  "lf5.html": "3d94d77f434deb53b4f926b55a67e4900a599fb38de8e28ff315316f85c8f64e",
  "lf7.html": "6e3d8cb638222487db4c2339fed055b9a8aaa20f21eade45862fa5f906d8102e",
  "lf8.html": "a01af75e631c5a627aa51d3d90c44cb4cd4976dd2a0101dd595b585ee6adbe9f",
  "lf9.html": "ad6131063ecfae7368ef86aba9b3b107b3e98e0eaa6cf237aeae544ecd07b84f",
  "manifest.webmanifest": "2494f22d045fc9647f6b1ae68a6b9cf0c029572ab26dc09f90778f9e42d7ca0a",
  "mittel/app.js": "49e2f946051d0f3e1dfb60f5f7ea5ee3ec1db923636b71f29f1a848c269cdfd5",
  "mittel/aufgaben.js": "3da2279f3048ff8233db6f053e2ac066cc5b31b8e17c21e6ed7f6c8c9b1022f3",
  "mittel/aufgaben.json": "221992d2fb2f360d2408b9dd4c31678051db46e8837bd80ae513104497583dc0",
  "mittel/azubipass-logo.png": "6fbfaa65da67de20b628b6d5415a8a46c95ceeaa5c6638492e2860e7d6e98973",
  "mittel/azubipass-symbol.png": "82cddbb695cbba0a09d3b933eb4b178e221463e015b962d8013cdff580d4a692",
  "mittel/azubipass.css": "225abb85572688c51a133b4ed4dc5be9570e528bd4b80901380a6b91d2b4b1bc",
  "mittel/azubipass.js": "fc127d71e90ce823dd4757a72849833ffb50fbe04439c985c206416222687255",
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
  "mittel/inhalt.json": "52b599aa937826a43945312cf9a38e469daedf829c2eac94f78ce128c3219c48",
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
  "mittel/suche.json": "12dd0d9c22897a36e339bc6ae4a129bc2de74f885284e75277fff82cf7c8570c",
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
