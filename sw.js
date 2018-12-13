

// Names of the two caches used in this version of the service worker.
// Change to v2 (must be as v(num) - no idea why), etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE_ID = 'precache-v20181213';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const URLS = [
  'index.html',
  '2kotp.html',
  'public.html',
  'password.html',
  './', 
  'theme.css',
  'scripts/jquery-3.3.1.min.js',
  'scripts/script.js',
  'scripts/otp.js',
  'scripts/2kotp.js',
  'scripts/public.js',
  'resources/10k.txt'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(PRECACHE_ID)
      .then(cache => cache.addAll(URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE_ID, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});