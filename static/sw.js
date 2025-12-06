(function () {
  const MS_WAIT = 400;

  const CACHE_VERSION = 'v2';
  const CACHE = `cached-${CACHE_VERSION}`;

  // This array gets replaced by gencache.sh during CI
  // Example: let CACHED = ["css/foo.css", "index.html", ...];
  let CACHED = [];

  self.addEventListener("install", (event) => {
    // Turn relative paths into absolute URLs under the SW scope.
    // This works for GitHub Pages project sites (/conference/) and root sites alike.
    const scope = self.registration.scope; // e.g. https://mercypl0x.github.io/conference/
    CACHED = CACHED.map((f) => new URL(f, scope).toString());

    event.waitUntil(precache());
    self.skipWaiting();
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(
      (async () => {
        const keys = await caches.keys();

        await Promise.all(
          keys
            .filter((key) => key !== CACHE)
            .map((key) => caches.delete(key))
        );

        await self.clients.claim();
      })()
    );
  });

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      fromNetwork(event.request, MS_WAIT).catch(() => fromCache(event.request))
    );
  });

  function precache() {
    return caches.open(CACHE).then((cache) => cache.addAll(CACHED));
  }

  function fromNetwork(request, timeout) {
    return new Promise((fulfill, reject) => {
      const timeoutId = setTimeout(reject, timeout);

      fetch(request).then(
        (response) => {
          clearTimeout(timeoutId);
          fulfill(response);
        },
        (err) => {
          clearTimeout(timeoutId);
          reject(err);
        }
      );
    });
  }

  function fromCache(request) {
    return caches.open(CACHE).then((cache) =>
      cache.match(request).then((matching) => matching || Promise.reject('no-match'))
    );
  }
})();
