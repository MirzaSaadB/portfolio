const CACHE_NAME = 'saad-portfolio-v1';
const urlsToCache = [
  '/portfolio/',
  '/portfolio/index.html',
  '/portfolio/favicon.svg',
  '/portfolio/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
