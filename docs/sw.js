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

var SPEICHER = "azubipass-65dc32ee4ca2825f";
var VORRAT = {
  "./": "4a6fb745b3dc7cdaa6104f6669d576cb6b92146262b0b8743424c7bf27b0dbd9",
  "app.html": "4a6fb745b3dc7cdaa6104f6669d576cb6b92146262b0b8743424c7bf27b0dbd9",
  "buchfuehrung.html": "c214c51f9efbfd3a2733e7cfe9cc640a22090666fc427e8891fd95bfc532c02b",
  "datenschutz.html": "07945420b168f4ac719e8fe9768193d356d24e48800ee4000970f97ef9f0f94c",
  "ik2024-lf01.html": "4fe05fb8e3cfabeb22e28bacdfb129562b9a73a6bc09803cabf559db58dc181f",
  "ik2024-lf02.html": "36a4c0c12c17e43a1f6b70effcf80ee6cc5a4ffc1d7a01662bfc6c572931ad3f",
  "ik2024-lf03.html": "80cbe5f3a6f9f058c3c1f9608e3f825df6d4dbd75b0937854865533047d4715d",
  "ik2024-lf04.html": "0297496456ec9e308494d8c79761f2722ed2527c9077ba5bc476e68940f79c15",
  "ik2024-lf05.html": "33c579b4079eb5f63ac5754a6ec71c9b84f2d9085fbeeb1b35a3fb15f1d0b80b",
  "ik2024-lf06.html": "a001f04a4def821e95205ea3298fad152c406b038e4dec79569685d133be2c08",
  "ik2024-lf07.html": "66f0cead46b6afd93098c1e87d0aed2f144e993ba3678cb7f4301c60563905c1",
  "ik2024-lf08.html": "bd96faa7fe05aaadb0edda8cbbf7d96d104fb005748a5851dc86f0799ccb2180",
  "ik2024-lf09.html": "f10418108a47d73d1e6ad05a2e80e948998f26febcf487d341605bdf2654d328",
  "ik2024-lf10.html": "df01b49321b17b16bf8592e7ed281e2dc570105b3d52e83a5154df5556f32883",
  "ik2024-lf11.html": "d2bd6c304115bb6014380ec612f4dae2179a0f8d1bf5a183133bed30590b786c",
  "ik2024-lf12.html": "cd1c1d477db6bf23510f36a52ee06c7bafe78e3dc33e105da6eeb7747824bb77",
  "ik2024-lf13.html": "b230ca5174ddb34efdb968d8cc4ef861cbc84328a6d7b2da386ec3db726e4d54",
  "impressum.html": "5c7dddb5aae1ce5ee624d064dd310364d8c59549bb94bf84e0cc551cb8cc0548",
  "index.html": "4a6fb745b3dc7cdaa6104f6669d576cb6b92146262b0b8743424c7bf27b0dbd9",
  "landing.html": "ae2f8488c7c19fd7a482c984bdc3c72eabe8eb61c1329bb9b5adb72d357a1a93",
  "lf1.html": "f14dd41bf9b7f8e073fdccce2b8352112002201311f2ee375d1b72330aabc753",
  "lf10.html": "b3fdc41240823da9cfb2f8b1a54a976d6fb779df914efdd348f5769426f2d9a1",
  "lf11.html": "d1f7b04cac3192fe1e3280f443e7031226cda7b4a3d1e046b0906e5a9ca8e30d",
  "lf12.html": "9f2e739caa8ba5d7217df99abcffb8355b1678a4324ecaf4e62f076a6469fb3c",
  "lf13.html": "7a583b78a3a5fb2600d4814290442fe258a3008913703fb1a8e6804e18cce0f6",
  "lf2.html": "e10f925201eb8411ad82636267fb4f266f26ff9862c1be75fd372424eab142e1",
  "lf3.html": "1f96c6b10edeef1fbfac6bfac4af6b9429b8cdebc73e4e0f26df48daa13de393",
  "lf4.html": "8ea997e11a703dd8921ae11417220da1fbb4610f23b0f3e84476b039cef190f2",
  "lf5.html": "bba73a7aa2ea1ea57fbcfad55e0b18925279a83c83d16c94c11f0c92c122684d",
  "lf7.html": "477d114dfc125a339f98c047dbedcf7a1278396d12352a4ae05935245fd7cd9c",
  "lf8.html": "fdab2517c61219b941a2332ff36d3c049cd4bdabbc440caaf0b7a6e799fc07d2",
  "lf9.html": "116cd7a6406dd4f7cdeefd6bf5c8d6a0bdbe5432249372073de92fcbd6fa7fda",
  "manifest.webmanifest": "2494f22d045fc9647f6b1ae68a6b9cf0c029572ab26dc09f90778f9e42d7ca0a",
  "mittel/app.js": "49e2f946051d0f3e1dfb60f5f7ea5ee3ec1db923636b71f29f1a848c269cdfd5",
  "mittel/aufgaben.js": "3da2279f3048ff8233db6f053e2ac066cc5b31b8e17c21e6ed7f6c8c9b1022f3",
  "mittel/aufgaben.json": "fe0695cfa02059877bff51486b352d5a2af3a586c37c52b4a15f67ffdb742be2",
  "mittel/azubipass-logo.png": "6fbfaa65da67de20b628b6d5415a8a46c95ceeaa5c6638492e2860e7d6e98973",
  "mittel/azubipass-symbol.png": "82cddbb695cbba0a09d3b933eb4b178e221463e015b962d8013cdff580d4a692",
  "mittel/azubipass.css": "401358f6096238cbfb2e3ce783c5c3d62960ea08c024a4d629d9e8175a325c51",
  "mittel/azubipass.js": "cf0e9e5eadbbab18c3f9eb832b479cfb97d9f5a7cd8adbffdc744203938056e1",
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
  "mittel/inhalt.json": "21779e0e51922c5720425fa9c88d2f0f3911ddfbb410ee98178189cd4221e9ea",
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
  "mittel/suche.json": "5d185793f49f042f4d3e81cd6950d4abbaf16b8af813851c89d33332df634262",
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
