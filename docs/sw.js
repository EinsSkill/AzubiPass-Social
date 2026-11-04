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

var SPEICHER = "azubipass-18c68ac187072a05";
var VORRAT = {
  "./": "ababbe2b791f4382e3af13a7d2e0d742b6fc1c212b4a410a3714dd1e0ef533a1",
  "app.html": "ababbe2b791f4382e3af13a7d2e0d742b6fc1c212b4a410a3714dd1e0ef533a1",
  "buchfuehrung.html": "3eb24111980fbccd59499aa263caef2910a0f0ef34049c8bfd8edfbeaef8043f",
  "datenschutz.html": "246d0894edfa66f1725721d4c224f8853cb6bb6894bd3fe7004c72a02b2923e0",
  "ik2024-lf01.html": "82c2f85cd0ecdd0309ed7ef33417b8ca2e8f547b8c8af4bf337c6ef4c9fa708e",
  "ik2024-lf02.html": "6e0a6a6a338437c13b2bf7aaf0300db85765b3ba1e131ca74663e5baa782b5db",
  "ik2024-lf03.html": "5af24950acf7ec5b24911b213b98bc668408b458b264a6ff55fd84a36ee425d3",
  "ik2024-lf04.html": "c6929dec8eeeb59ddf6d67a32f049256dbc1478ed45e33b68ec159d929eea554",
  "ik2024-lf05.html": "e2b829cb68ae8efce0d756176cd0dc7e049df2504bc050b33158ea1831346f2b",
  "ik2024-lf06.html": "d1fb2f4d5f0da9bce9b23a33cea4b92997da7c6a44c64851de7bd2fc3420f033",
  "ik2024-lf07.html": "3b2c8babfbd80657ccba33672e39f159efc1f7d95ff51fed6eff9ffad61099f3",
  "ik2024-lf08.html": "d8d302df73bf30b92db7dd05f0ae1ca788b90cc5ba79809adc0e4bd7c284c299",
  "ik2024-lf09.html": "f84fb1198797fe9446ab366596f046d7ce9562dafba6ebf8b2c1b0855094b0a9",
  "ik2024-lf10.html": "69c507c07c14d155072c2f8250d463bdc19b55b077b62fa955d1917df75d7c96",
  "ik2024-lf11.html": "64feb338cb73c458e27ce648372904b9fd0c97de8718f892876bd59848adac92",
  "ik2024-lf12.html": "70fec9839e06e77474aa885daec2fe73588e5e34bf847aa2579a74cd9ba43246",
  "ik2024-lf13.html": "00a90ad29f608c791f3326c8e83f4d416327389fb54380dd772b1552d39f96d8",
  "impressum.html": "5c7dddb5aae1ce5ee624d064dd310364d8c59549bb94bf84e0cc551cb8cc0548",
  "index.html": "ababbe2b791f4382e3af13a7d2e0d742b6fc1c212b4a410a3714dd1e0ef533a1",
  "landing.html": "ae2f8488c7c19fd7a482c984bdc3c72eabe8eb61c1329bb9b5adb72d357a1a93",
  "lf1.html": "c9bda3c913cf1087d125cb47083bd2181b4ae61b7744954759e6dbdd3eb84674",
  "lf10.html": "432725bcdb9bb5d0db5221cb14c5f0f1605a02c6a7c5b31342cdcfaf1b536eb8",
  "lf11.html": "9205cd5d3eace7a8465301cbbda13915a55fde91f40c94b1f47b2f7e201a59e3",
  "lf12.html": "a2560d68203d4bd69c8e8aa715ad82342af19bd23841a9fdfbd69908f5cd67cc",
  "lf13.html": "f42650e5966b3f85abbadf26fa4684513a09624b8ea2b682dc85908417e0e118",
  "lf2.html": "279ad5004d4b8b747a5772f1651e56c5ba46cf87e36c827771c1219fbaaab1f9",
  "lf3.html": "198f381f2d0385ad55855a6bf0ee796806606b64cfe2a0aea8fdfa809ddb111d",
  "lf4.html": "b2b36cbce1a3b10aa84b961b83f01cd8fd683505ea7382dea62d92f8dca5e4a0",
  "lf5.html": "c571ac060961bef4e7c8262cafc18168cd1bed81e5b730544f08f5b0f9c145d2",
  "lf7.html": "67dcf3e1fb00fb2e82afc1ed7b18395f1206345007d2eea8a60b8ac156099aa7",
  "lf8.html": "9179a714d89a489e44178b2134eb1fbb2ed33955ce25e32d94fcd5e12444b906",
  "lf9.html": "58c0198830f8057f673415f3ea48d6ffdd16efba3ded5a1b5f73f9dc5a285573",
  "manifest.webmanifest": "2494f22d045fc9647f6b1ae68a6b9cf0c029572ab26dc09f90778f9e42d7ca0a",
  "mittel/app.js": "82a3d850e4974460f4185b2971090858462008429ce5ca3f2e0144613b71f12b",
  "mittel/aufgaben.js": "7e2db1b7678489727b0d78d3cb61fc82784553e34449bcbcfbbf45bbfd4becb2",
  "mittel/aufgaben.json": "f8b556dec0f11cda1bf089ba0c12dc6564cf93a78c6fcfd360801e8663b185b3",
  "mittel/azubipass-logo.png": "6fbfaa65da67de20b628b6d5415a8a46c95ceeaa5c6638492e2860e7d6e98973",
  "mittel/azubipass-symbol.png": "82cddbb695cbba0a09d3b933eb4b178e221463e015b962d8013cdff580d4a692",
  "mittel/azubipass.css": "a3693f88b7c65a00e549bc8f187f13392290fd416fdbda5407839795b909e573",
  "mittel/azubipass.js": "2fbfe245fcb0a2e317f067c5bf85c26038af453f76e69ab211e599584eeba59f",
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
  "mittel/inhalt.json": "c3be9f5e38061e3d02347880a0c2536f6ec48e7548aacb1b06e1d28d635a862f",
  "mittel/kern.js": "00826d2faa0618a08da8e250be1883f64d06fc9399eaaa76ec6d2f1d7bbd3b57",
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
  "mittel/suche.json": "a318080698c1d09b494be20d8624ad0c0603c2b0237d73181f37e9891c6790d9",
  "mittel/supabase.js": "50db96e85947966782e7a3f4252a59dd8285f1ca00c1718a4079ed621e10bae1",
  "mittel/symbol-v1-180.png": "718223b0c01694f646fc25b5d0c384fcbc825381b2d7fdc484ae8d1bee5e2711",
  "mittel/symbol-v1-192.png": "e0b355299d9fce7756c6e251095869599ad87706b7d8f4bbb6abdde89493f63e",
  "mittel/symbol-v1-32.png": "3d3c534fed31bcc2a086ec56f744bb0a5a2defd0246c8f6bd81ba6f9b82e6998",
  "mittel/symbol-v1-512.png": "689d35e853287622462aa23a4a4153ac9a1c7a2e0a72ab179956dbe56959896c",
  "mittel/training.js": "4770e17484421911a5a66c69e1bfbf746f967a95cf84d69655f0608347bd2e9c"
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
