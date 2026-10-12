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

var SPEICHER = "azubipass-d70a66354214ed9c";
var VORRAT = {
  "./": "f658030841846927ffa3d5213980d53830bbfda17c8db6504ff939652b675aaa",
  "app.html": "f658030841846927ffa3d5213980d53830bbfda17c8db6504ff939652b675aaa",
  "buchfuehrung.html": "aa1d04776ab371a2b0bf7c11161d4fb6be80d2d472ff01ca198e618bcd9d7b30",
  "datenschutz.html": "7b7738e995f914d5f30854c5212c9f7f04099fef560d1d5e1f4ae7d7377d0014",
  "impressum.html": "a3f887f0d3922269425f7f454449a15c762bbde11021a96425775eb647364970",
  "index.html": "f658030841846927ffa3d5213980d53830bbfda17c8db6504ff939652b675aaa",
  "landing.html": "6df54d38005a56190df4ad1a60e1db2ec3d9627ab9290b097493ae8f644912ef",
  "lf1.html": "087f117500da18b7dcc3464d74b9ec4497ae2d9f0fbe47c2e245b422eddde173",
  "lf10.html": "42f6ba6a3de45f3a25f9bf63da803a9e8f1aeb47c81dce4cada70645122f180d",
  "lf11.html": "80e7a6ce212fc72fd568aad70a71c83b2b3bae5856b5a5856a2dc359892daeba",
  "lf12.html": "ce2e7f870692ddad8dea239ff3cde79f120ea1ef30e361040a2790b24ed9a900",
  "lf13.html": "0bd08765ad0fb042c95cc01241295781b000f7a2ad7f1036abd4cc997903e9b8",
  "lf2.html": "65cff44940997febd1fa4bbd46d991f772f4ada76cc6963de86e9ed36d52fd68",
  "lf3.html": "2ad82d5084f3d5a011ef7599745ae84cbd66c61eec28d9bfae3a06b75eeea026",
  "lf4.html": "be32a9cdb404f278c54239664350d414612ffa4e8e0a6e8f6100e940d0498bcf",
  "lf5.html": "96049f7df78d8192c0aa39e6d66cfc7d975f2956e1874da52f13c2d0db178b7c",
  "lf7.html": "84d35421c05bdcd8ed4dd0cb2b68cfa49a2bcc56a1daa37c827211c63484935a",
  "lf8.html": "b5203fd53a1c57717109228a5efdd2d07b8b095a6b77899f02edf007967626bb",
  "lf9.html": "6b6bb0e2d81b90053f865f4aac55d8fce978c8a71b0f39b99c54906a66694c42",
  "manifest.webmanifest": "1a5dbb48c799333f7f316780c6384a62e365767e94163efd5999c5b1ffdabb30",
  "mittel/app.js": "821192f36e10f533504b020b950c78b1f0f9f09970bac3a2efd5a6b394ac393d",
  "mittel/aufgaben.js": "7952f59103ce5788077a3088db4ef5fc465bb0cb3af76d375c69bd30e00acbb6",
  "mittel/aufgaben.json": "ff86d839bf84a4faf9052c68243c0de301b7320219384e9a0836791d2657c15f",
  "mittel/azubipass.css": "3f1b8eb584892ad79321b4889e5e5fc25f6b5a2142ab88372ed9ce41af7c52fa",
  "mittel/azubipass.js": "9ede6fe34c9633efca35edeb1bb652d14a0dc9d1d28525a4d47e8b516f22e644",
  "mittel/community-ansicht.js": "7f43df039b85bae269221a44b9a1c1dfbcd1c6b34bbe5cee3b780eb19bb3e0d1",
  "mittel/community-beitraege.js": "0cb4e446ab7d15398ad1c58d718abe8ef7e18bbc8e0161f254653c8bd918b883",
  "mittel/community.js": "4b28d2d0d5026a0250e0f45dd3f7f5ee3380fa363150fe61dc995e68395bab62",
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
  "mittel/inhalt.json": "c73762621b4c26a14384bcba48f1b77949da41f5ae04696f85e277fee00fdc89",
  "mittel/kern.js": "cc1407c5f73788333c2fc882947379c4190d8974515ed92ed4928f4c25c15f90",
  "mittel/landing.css": "1e71506f41a1d31bf915931569dd36dc5f74cdefbc42bfdb3331937c049c5c8f",
  "mittel/landing.js": "d5a83cc74c9e6b6f398dca81c807891a96a1547bae6da083e01828081c0d724d",
  "mittel/schriften.css": "751fec1c351de1ff2d2d9274f9d5fa1ef3578751b4ad664489fbed92144a69b1",
  "mittel/source-serif-4-400-latin-ext.woff2": "155f6e701097cc269cf8d5d7ac86795f263f1afbeb47c14d1d747108c9335389",
  "mittel/source-serif-4-400-latin.woff2": "f2ea9c12d2fe9bd3a9589b02ad2c0909da88f30938c91adc838c4f4098f9f9e0",
  "mittel/source-serif-4-600-kursiv-latin-ext.woff2": "ce3fd3b624f3c6749b967c4cbf14aefb887f169d8fddc1053c745d91a6de439a",
  "mittel/source-serif-4-600-kursiv-latin.woff2": "a73991f26aea1fd32b8d172d29f5c8c86d458ad8671401caacb3fc3fd558b375",
  "mittel/source-serif-4-600-latin-ext.woff2": "155f6e701097cc269cf8d5d7ac86795f263f1afbeb47c14d1d747108c9335389",
  "mittel/source-serif-4-600-latin.woff2": "f2ea9c12d2fe9bd3a9589b02ad2c0909da88f30938c91adc838c4f4098f9f9e0",
  "mittel/source-serif-4-700-latin-ext.woff2": "155f6e701097cc269cf8d5d7ac86795f263f1afbeb47c14d1d747108c9335389",
  "mittel/source-serif-4-700-latin.woff2": "f2ea9c12d2fe9bd3a9589b02ad2c0909da88f30938c91adc838c4f4098f9f9e0",
  "mittel/suche.json": "a34ed7197d7ab9d1980957a1d98673e7d6a7668a22de095371ec6dead0c6dc5f",
  "mittel/supabase.js": "50db96e85947966782e7a3f4252a59dd8285f1ca00c1718a4079ed621e10bae1",
  "mittel/symbol-180.png": "9d0d5b7da1fbbe83acb8a36860a0a0985acb44b6556257c48e47547c650cd725",
  "mittel/symbol-192.png": "66bf4661004725ae6bc2055c78fda382993cf10b204bd89e4041e9654d65173c",
  "mittel/symbol-512.png": "77e06e1dce440c6b5cdc347286a4b22cba3f71dccc720b1c5370f1955292873e",
  "mittel/symbol.svg": "099d1c97d88352f40a9852a9234ac45c89cc8d58dbfc3fdf80f93f48e97350ce"
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

self.addEventListener("fetch", function (e) {
  var anfrage = e.request;
  if (anfrage.method !== "GET") return;
  var url = new URL(anfrage.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(caches.open(SPEICHER).then(function (c) {
    // Nur aus der eigenen Fassung – nie aus einem anderen Speicher.
    return c.match(anfrage, { ignoreSearch: true }).then(function (treffer) {
      if (treffer) return treffer;
      // Nicht im Vorrat: durchreichen, aber nicht in diese Fassung legen.
      return fetch(anfrage).catch(function () {
        return anfrage.mode === "navigate" ? c.match("app.html") : Response.error();
      });
    });
  }));
});
