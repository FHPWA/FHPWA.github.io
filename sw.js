const cacheVersion = "fredhappyface.github.io-2019.11.3";
const urlsToPrefetch = [
	"/",
	"/PWA.Home/",
];


self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open(cacheVersion).then(function (cache) {
			return cache.addAll(urlsToPrefetch);
		})
	);
});

self.addEventListener("activate", function(event) {
	event.waitUntil(
		caches.keys().then(function(keyList){
			return Promise.all(keyList.map(function(key){
				if (key !== cacheVersion){
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  let responsePromise = caches.match(event.request).then((response) => {
    return response || fetch(event.request);
  });

  event.respondWith(responsePromise);
});
