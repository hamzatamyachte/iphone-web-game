// Bump VERSION after changing any file so installed copies pick up the update.
const VERSION = 'dodge-v12';
const FILES = ['./', 'index.html', 'manifest.json', 'worlds.js', 'icons/fox-180.png', 'icons/fox-192.png', 'icons/fox-512.png', 'icons/fox-32.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

// Network first, cache fallback: fresh while developing, still works offline.
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
