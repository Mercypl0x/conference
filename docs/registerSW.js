(function () {
  function basePath(url) {
    return url.pathname.substring(0, url.pathname.lastIndexOf("/"));
  }

  if("serviceWorker" in navigator) {
    const url = new URL(document.currentScript.src, self.location.href);
    const scope = `${basePath(url)}/`;
    navigator.serviceWorker
      .register(`${scope}sw.js`, { scope })
      .then(function(registration) {
      });

    navigator.serviceWorker
      .ready
      .then(function(registration) {
      });
  }

})();
