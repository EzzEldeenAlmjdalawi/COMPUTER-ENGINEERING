/**
 * COMPUTER ENGINEERING IUG — SERVICE WORKER
 * Offline Cache & High-Speed Asset Acceleration
 */

const CACHE_NAME = 'ce-iug-pwa-v2';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './index.css',
  './main.js',
  './subjects-data.js',
  './themes.css',
  './manifest.json',
  './favicon.png',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable.png',
  './app-icon.png',
  './Com.png',
  './firstYear.html',
  './secndYear.html',
  './thirdYear.html',
  './fourthYear.html',
  './fifthYear.html',
  './university-requirements.html',
  './gpa-calculator.html',
  './gpa-calculator.js',
  './gpa.css',
  './final-calculator.html',
  './final-calculator.css',
  './final-calculator.js',
  './schedule-builder.html',
  './schedule-builder.css',
  './schedule-builder.js',
  './degree-tracker.html',
  './degree-tracker.css',
  './degree-tracker.js',
  './quran-wird.html',
  './quran-wird.css',
  './quran-wird.js',
  './quran-data.js',
  './study-tools.html',
  './search.html',
  './search.css',
  './search.js'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('PWA Precache partial fail:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Strategy: Network First, Fallback to Cache
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/index.html');
          }
        });
      })
  );
});
