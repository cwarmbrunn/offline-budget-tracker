// Set up cache name
const CACHE_NAME = "my-budget";
// Set up data cache name
const DATA_CACHE_NAME = "budget-data-cache";
// Set up files to cache
const FILES_TO_CACHE = [
  // HTML START //
  "/index.html",
  // HTML END //

  // STYLESHEET START //
  "/css/style.css",
  // STYLESHEET END //

  // ICONS START //
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-144x144.png",
  "/icons/icon-152x152.png",
  "/icons/icon-192x192.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png",
  // ICONS END //

  // JAVASCRIPT START //
  "/js/idb.js",
  "/js/index.js",
  // JAVASCRIPT END //

  // MANIFEST START //
  "/manifest.json",
  //MANIFEST END //
];

// Install the service worker
self.addEventListener("install", function (evt) {
  evt.waitUnitl(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Your files were pre-cached successfully! ✅");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate the service worker and remove old data from cache
self.addEventListener("activate", function (evt) {
  evt.waitUnitl(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data...", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Intercept fetch requests
