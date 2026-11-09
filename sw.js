const prefix = 'progress-knight-' + self.registration.scope + '-';
const cacheName = prefix + 'v1';
self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll([
    './', './index.html', './Magnus.png', './Isabella.png', './icon-192.png', './icon-512.png', './manifest.webmanifest'
  ])));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith(prefix) && key !== cacheName).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.registration.scope)) return;
  event.respondWith(caches.open(cacheName).then(async cache => {
    const cached = await cache.match(event.request.mode === 'navigate' ? './index.html' : event.request);
    return cached || fetch(event.request);
  }));
});
