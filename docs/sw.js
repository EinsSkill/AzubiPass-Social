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

var SPEICHER = "azubipass-63c01aab1184411d";
var VORRAT = {
  "./": "f658030841846927ffa3d5213980d53830bbfda17c8db6504ff939652b675aaa",
  "app.html": "f658030841846927ffa3d5213980d53830bbfda17c8db6504ff939652b675aaa",
  "buchfuehrung.html": "a6559ad41089f4a12eb1a1b4f2e4dda863371f8dd87d4bfce9a81114fef07a2a",
  "datenschutz.html": "d061470af77a056fd35b39e9b6da94347c544caeb033a47f28f631ad752bc525",
  "impressum.html": "a3f887f0d3922269425f7f454449a15c762bbde11021a96425775eb647364970",
  "index.html": "f658030841846927ffa3d5213980d53830bbfda17c8db6504ff939652b675aaa",
  "landing.html": "c9dddc4ca00df876007bc21a3c069fa37dc19339e5bca4bf9bab9d3d730c8f0c",
  "lf1.html": "db34bc71214339686e76d871cab821cd54515544b272dfdd3a13ad02b96e6ab3",
  "lf10.html": "ba87a7232841953b60f10867fe7411171708ce0d183246ddb76c4be5357cf796",
  "lf11.html": "bd8bdfe0ae4cc1e6d474056ce8e9c96443105f12f37a2e21d2904cc1548de8fd",
  "lf12.html": "0f37c882686054ab83d70cb830b58c7262f40e18d2a854d73b820661b59cc35c",
  "lf13.html": "b6bf17878640c55091a4f7e7f05de24849a3b1da18c5d3605591c9d086d3cdfb",
  "lf2.html": "e6e8f28b7afe1b042989fcb99e72ac458a7f55238ee1e41f2cffc19590a68a1e",
  "lf3.html": "84f9f8220bea51ab1d3d7fae49b96260c3df0d5250476da4e95db0ea1fbeab95",
  "lf4.html": "c09c8a279eb3941c50e7d126e80e45a5927888692e69ec5a2f682964c651b256",
  "lf5.html": "331064aa22e8d2cc52ee3e9a61142d751f33eca5b7d0d617e547516b5efbc98e",
  "lf7.html": "8e380fdda2a5245caa3a62d514cc90ac24538bace7762aaf6ca29b02c7b0d476",
  "lf8.html": "e7fa1f78e93de0181eb8d5e7c98973629b00408994774e7581f837619e1dcb9e",
  "lf9.html": "6774aa582097ee6a6d8111c7dc94b61cc3f969bca4ad1b9b0adbc67191e57ac1",
  "manifest.webmanifest": "1a5dbb48c799333f7f316780c6384a62e365767e94163efd5999c5b1ffdabb30",
  "mittel/app.js": "821192f36e10f533504b020b950c78b1f0f9f09970bac3a2efd5a6b394ac393d",
  "mittel/aufgaben.js": "7952f59103ce5788077a3088db4ef5fc465bb0cb3af76d375c69bd30e00acbb6",
  "mittel/aufgaben.json": "b0a024e8ea3ad964f51db540384955f8acba9f6c464055695396d39a0335c3d1",
  "mittel/azubipass.css": "49c2358eaf844f3e44e09afcb45cdff6407e95753968cdccc0a2c9ec79e87332",
  "mittel/azubipass.js": "9ede6fe34c9633efca35edeb1bb652d14a0dc9d1d28525a4d47e8b516f22e644",
  "mittel/community-ansicht.js": "1e13a4871809c86f6a3a0e4195c0748770d72c85633842a413189d1d5f5257dd",
  "mittel/community-beitraege.js": "e355dbc68417bd0a1acea2f818e345cb7d2e4b8312bdf5302acce19ba511a219",
  "mittel/community.js": "07db1c051e1a83975d60e618d77fb8ce2e4aba96b97653469d0d1c546595d5c9",
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
  "mittel/inhalt.json": "5ec9ef985c7bf1fa5fa0f271f6f10d47ed3cb75bd186617af9b97240edb3e841",
  "mittel/kern.js": "0d2d49706c2c4051219b2f1bf63562f28c92615418b660fb94504f6bda9ed093",
  "mittel/landing.css": "1fdb11f9aa0073f44b5918efae16093d11222d96f435349de8304caab72bb31a",
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
