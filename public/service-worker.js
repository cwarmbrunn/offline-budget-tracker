// Set up app prefix
const APP_PREFIX = "BudgetTracker-";

// Set up version
const VERSION = "version_01";

// Set up files to cache
const FILES_TO_CACHE = [
  // HTML START //
  "./index.html",
  // HTML END //

  // STYLESHEET START //
  "./css/style.css",
  // STYLESHEET END //

  // ICONS START //
  "./icons/icon-72x72.png",
  "./icons/icon-96x96.png",
  "./icons/icon-128x128.png",
  "./icons/icon-144x144.png",
  "./icons/icon-152x152.png",
  "./icons/icon-192x192.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png",
  // ICONS END //

  // JAVASCRIPT START //
  "./js/idb.js",
  "./js/index.js",
  // JAVASCRIPT END //

  // MANIFEST START //
  "./manifest.json",
  //MANIFEST END //
];

// Install the service worker
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Installing cache:" + CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});
// Activate the service worker
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys(),
    then(function (keyList) {
      let cacheKeeplist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      cacheKeeplist.push(CACHE_NAME);
      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheKeeplist.indexOf(key) === -1) {
            console.log("Deleting cache:" + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});

// Fetch
self.addEventListener("fetch", function (e) {
  console.log("Fetch request: " + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        // If cache is there - respond with cache
        console.log("Responding with cache: " + e.request.url);
        return request;
      } else {
        // If there's no cache - try to fetch request
        console.log(
          "File is not cached - attempting to fetch: " + e.request.url
        );
        return fetch(e.request);
      }
    })
  );
});
