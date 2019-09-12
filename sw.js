// This is the service worker with the Cache-first network

const cacheVersion = "blackc4t-precache";
const urlsToPrefetch = [
  "/",
  "/PWA.BlackC4t/"
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