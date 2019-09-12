// This is the service worker with the Cache-first network

const CACHE = "blackc4t-precache";
const precacheFiles = [
  "/",
  "/PWA.BlackC4t/index.html",
  "/PWA.BlackC4t/2kotp.html",
  "/PWA.BlackC4t/public.html",
  "/PWA.BlackC4t/password.html",
  "/PWA.BlackC4t/info.html",
  "/PWA.BlackC4t/settings.html",
  "css/main.css",
  "css/theme/light.css",
  "css/theme/dark.css",
  "css/theme/black.css",
  "scripts/script.js",
  "/PWA.BlackC4t/scripts/otp.js",
  "/PWA.BlackC4t/scripts/2kotp.js",
  "/PWA.BlackC4t/scripts/public.js",
  "/PWA.BlackC4t/scripts/password.js",
  "/PWA.BlackC4t/scripts/settings.js",
  "/PWA.BlackC4t/resources/10k.txt"
];


function fromCache(request) {
  // Check to see if you have it in the cache
  // Return response
  // If not in the cache, then return
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }

      return matching;
    });
  });
}

function updateCache(request, response) {
  return caches.open(CACHE).then(function (cache) {
    return cache.put(request, response);
  });
}

self.addEventListener("install", function (event) {
  //console.log("[PWA Builder] Install Event processing");

  //console.log("[PWA Builder] Skip waiting on install");
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      //console.log("[PWA Builder] Caching pages during install");
      return cache.addAll(precacheFiles);
    })
  );
});

// Allow sw to control of current page
self.addEventListener("activate", function (event) {
  //console.log("[PWA Builder] Claiming clients for current page");
  event.waitUntil(self.clients.claim());
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") {return;}

  event.respondWith(
    fromCache(event.request).then(
      function (response) {
        // The response was found in the cache so we respond with it and update the entry

        // This is where we call the server to get the newest version of the
        // file to use the next time we show view
        event.waitUntil(
          fetch(event.request).then(function (response) {
            return updateCache(event.request, response);
          })
        );

        return response;
      },
      function () {
        // The response was not found in the cache so we look for it on the server
        return fetch(event.request)
          .then(function (response) {
            // If request was success, add or update it in the cache
            event.waitUntil(updateCache(event.request, response.clone()));

            return response;
          })
          .catch(function (error) {
            //console.log("[PWA Builder] Network request failed and no cache." + error);
          });
      }
    )
  );
});
