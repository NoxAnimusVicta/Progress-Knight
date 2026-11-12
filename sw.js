const prefix = 'progress-knight-' + self.registration.scope + '-';
const cacheName = prefix + 'post-chairman-1';
self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll([
    './', './index.html', './previous.html','./centenarians.jpg','./isabella-100.jpg','./save-tools.js','./balance.js','./remastered.js','./remastered-art.jpg','./void-icons.webp','./void-catalog.webp','./neon-city.webp','./chronotech.webp','./city-portraits.webp','./void-forms.svg','./game.js', './late-art.jpg', './activity-art.jpg', './Magnus.png', './Isabella.png', './icon-180.png','./icon-192.png', './icon-512.png', './manifest.webmanifest'
  ].map(url=>new Request(url,{cache:"reload"})))));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith(prefix) && key !== cacheName).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.registration.scope)) return;
  event.respondWith(caches.open(cacheName).then(async cache => {
    const cached = await cache.match(event.request.mode === 'navigate' && new URL(event.request.url).pathname === new URL(self.registration.scope).pathname ? './index.html' : event.request);
    return cached || fetch(event.request);
  }));
});









self.addEventListener("message", event => { if(event.data?.type==="activate-release")event.waitUntil(self.skipWaiting()); });
