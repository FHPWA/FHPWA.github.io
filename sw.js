const cacheVersion = "fredhappyface";
const urlsToPrefetch = [
  "/",
  "/PWA.Home/"
];



this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheVersion).then(function(cache) {
      return cache.addAll(urlsToPrefetch);
    })
  );
});


this.addEventListener('fetch', event => {
  let responsePromise = caches.match(event.request).then(response => {
    return response || fetch(event.request)
  });

  event.respondWith(responsePromise);
});