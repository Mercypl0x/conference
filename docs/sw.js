(function () {
  const MS_WAIT = 400;
  const CACHE = 'cached';

  let CACHED = [];

  function fileName(url) {
    return url.href.replace(/^.*[\\\/]/, '');
  }

  function basePath(url) {
    return url.pathname.substring(0, url.pathname.lastIndexOf("/"));
  }

  self.addEventListener("install", event => {
    const url = new URL(self.location);

    if (url !== `/${fileName(url)}`) {
      const path = basePath(url);
      CACHED = CACHED.map((f) => `${path}${f}`);
    }
    event.waitUntil(precache());
  });

  self.addEventListener('fetch', event => {
    event.respondWith(
      fromNetwork(event.request, MS_WAIT).catch(function () {
        return fromCache(event.request);
      })
    );
  });

  function precache() {
    return caches.open(CACHE).then( cache => {
      return cache.addAll(CACHED);
    });
  }

  function fromNetwork(request, timeout) {
    return new Promise( function (fulfill, reject) {

      const timeoutId = setTimeout(reject, timeout);

      fetch(request).then(response => {
        clearTimeout(timeoutId);
        fulfill(response);
      }, reject);
    });
  }

  function fromCache(request) {
    return caches.open(CACHE).then(cache => {
      return cache.match(request).then(matching => {
        return matching || Promise.reject('no-match');
      });
    });
  }
})();
