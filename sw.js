const cacheVersion = "fredhappyface.github.io-2019.11.6";
const urlsToPrefetch = [
	"/",
];

self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open(cacheVersion).then(function (cache) {
			return cache.addAll(urlsToPrefetch);
		})
	);
});

self.addEventListener("activate", function (event) {
	event.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== cacheVersion) {
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
	event.respondWith(fromNetwork(event.request, 400).catch(function () {
		return fromCache(event.request);
	}));
});

function fromNetwork(request, timeout) {
	return new Promise(function (fulfill, reject) {
		var timeoutId = setTimeout(reject, timeout);
		fetch(request).then(function (response) {
			clearTimeout(timeoutId);
			fulfill(response);
		}, reject);
	});
}

function fromCache(request) {
	return caches.open(cacheVersion).then(function (cache) {
		return cache.match(request).then(function (matching) {
			return matching || Promise.reject('no-match');
		});
	});
}
