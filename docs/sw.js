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

var SPEICHER = "azubipass-12b12b9dcac152e6";
var VORRAT = {
  "./": "5040e109d57c047b0f99b69e1c1ecf77089cbc251a0243c49bc7f0370cb3d03e",
  "app.html": "5040e109d57c047b0f99b69e1c1ecf77089cbc251a0243c49bc7f0370cb3d03e",
  "buchfuehrung.html": "c256842895cd38f2f3d8dd1c34ca4d49db6fb77a9832695a04bc2189baaa3a4b",
  "datenschutz.html": "c9be0d453d4e436c0f0f12116d364dbad0d08340bb842683107c8cfba3b348ee",
  "ik2024-lf01.html": "be11a3c8294df5673c74cc1d5c18b0ded1f21bffde8239a56aa979cdc4869cb9",
  "ik2024-lf02.html": "f2111b08bfb905effbb8e52fdf159ac0f27612728643bf2c596b231905ae0ade",
  "ik2024-lf03.html": "f584ef8c12dccdb0f0c2c0376b1706af629b464cf45e8638957abbf6b5baecf5",
  "ik2024-lf04.html": "4dd9b4e4c97a3a2750021a90f29d2e42a965b883a55eb48ea01f5c0c43764c4b",
  "ik2024-lf05.html": "c9e7beedab70517dce332fcebed82fd7846acacc2b1a8680c4f87ea7d7e3914c",
  "ik2024-lf06.html": "f1749578cc99c0e2bbc2a4ba008b1958c60d09ddb96abcad62f89064d42ef05d",
  "ik2024-lf07.html": "628a33f1bebe428d5a59a612b02d4741e5b7ceaef9f70c9b11ac6b55c49cff2a",
  "ik2024-lf08.html": "1768b03863cc9ad029e6fc34db6d17bc336e96d386bbaf8986c8445f81618c85",
  "ik2024-lf09.html": "16e4559f1a33c8645491fba1a48af471a378ab9e7e2f3e0ecc52bb4ce92c09b3",
  "ik2024-lf10.html": "68691ea847aa0a563f8ce87cc6db006e71a1539be3273d450b7cc5d730b4b254",
  "ik2024-lf11.html": "17d31c2dc8c74bb2708722d437f1b62832f3416c36452cb109e6126e0d0c8db7",
  "ik2024-lf12.html": "ba08d750f7d8f0fb16ec8b572b1f4beb85df8378fcba13de5a6ec35395454128",
  "ik2024-lf13.html": "be18803f00546a54aea053d28a902e2e21289a85d17234150096b48ea26a5ef3",
  "impressum.html": "5c7dddb5aae1ce5ee624d064dd310364d8c59549bb94bf84e0cc551cb8cc0548",
  "index.html": "5040e109d57c047b0f99b69e1c1ecf77089cbc251a0243c49bc7f0370cb3d03e",
  "landing.html": "ae2f8488c7c19fd7a482c984bdc3c72eabe8eb61c1329bb9b5adb72d357a1a93",
  "lf1.html": "30b6a18ec1ab94452fd2e5bd401e8729ed56e4b74485b6eebfcd140661fe5b8c",
  "lf10.html": "a999b17c96002dea72991588fccab05156185f064fcca62d4b96ceaa7dba2aec",
  "lf11.html": "eae2c2e7b04fe787785476aa378b4541b9bdcf63cb7c954eed3c49b11f31b414",
  "lf12.html": "ba5fc8f8037f4d521e2ac0d575db938e4ae311931332f169ea7844cca113aa9b",
  "lf13.html": "4879229e49f9a2daf440ae70e8e4b64d8c2977dca7c4b5694929130c3d4b6f8e",
  "lf2.html": "569909c19d805e0e98c69c788f75adff58e35a6e163236682ecf5ff5ff8c449c",
  "lf3.html": "9b7032d106b2ad56be100ad1cbb3c6a964f76dea879ee0bcbb612bf60705777f",
  "lf4.html": "bcbe082de38c598392b0efd73a407ff843b0d4fdc3f978664c13982eedcf6768",
  "lf5.html": "3d94d77f434deb53b4f926b55a67e4900a599fb38de8e28ff315316f85c8f64e",
  "lf7.html": "6e3d8cb638222487db4c2339fed055b9a8aaa20f21eade45862fa5f906d8102e",
  "lf8.html": "80d6907b9ed76c06172e4c17200d036a977ecc5acb1c40c6b7e1207ec90efe98",
  "lf9.html": "ce8fdf49d1f240f73d75bf2c39e5389295a0d431dc216a944c97d528f6b59502",
  "manifest.webmanifest": "2494f22d045fc9647f6b1ae68a6b9cf0c029572ab26dc09f90778f9e42d7ca0a",
  "mittel/app.js": "49e2f946051d0f3e1dfb60f5f7ea5ee3ec1db923636b71f29f1a848c269cdfd5",
  "mittel/aufgaben.js": "3da2279f3048ff8233db6f053e2ac066cc5b31b8e17c21e6ed7f6c8c9b1022f3",
  "mittel/aufgaben.json": "b4e44950039b8c8f927b4d6f6ad9ba5ac0316e011dbc5616eb0806df4f616a59",
  "mittel/azubipass-logo.png": "6fbfaa65da67de20b628b6d5415a8a46c95ceeaa5c6638492e2860e7d6e98973",
  "mittel/azubipass-symbol.png": "82cddbb695cbba0a09d3b933eb4b178e221463e015b962d8013cdff580d4a692",
  "mittel/azubipass.css": "7d7c88c815cb1ecfb359a93bf842cce1cb9b3f0ed63aab18168bd9ec9253e992",
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
  "mittel/inhalt.json": "33b1cd570d68cdb74944c6c6172a2d63554508f9281facf7ca0cb1201f2d57c4",
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
  "mittel/suche.json": "ee1471efc74696c75383d3fcba93efc82c5ef1ee56f11a352e5ad63bc84e5418",
  "mittel/supabase.js": "50db96e85947966782e7a3f4252a59dd8285f1ca00c1718a4079ed621e10bae1",
  "mittel/symbol-v1-180.png": "f14f43e7cfbea4027a315422543530209aabb5f6a8ef73a219956c06c34ab0de",
  "mittel/symbol-v1-192.png": "a7b93cd17439685ad3cdc1a547faf83f6c14c41f4240c4c835d219a05c30684c",
  "mittel/symbol-v1-32.png": "88536423b076b6241792e1c01b447ad9800b1047fe4d257b955d1569f914b1bb",
  "mittel/symbol-v1-512.png": "e8e1643bf38baf16b18fad478da4aa2bf708bd7c019ba138d272599325bfea0a"
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
