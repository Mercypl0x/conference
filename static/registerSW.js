if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/conference/sw.js", {
    scope: "/conference/"
  });
}
