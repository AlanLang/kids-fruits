/* Bump this version whenever a cached application file changes. */
const CACHE_PREFIX = 'kids-fruits-shell-';
const CACHE_NAME = CACHE_PREFIX + '20261031-pwa-v1';
const SHELL = [
  '/', '/index.html', '/game.js', '/illustrations.js', '/pwa.js',
  '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png',
  '/icons/icon-maskable-512.png', '/icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache =>
    cache.addAll(SHELL.map(url => new Request(url, { cache: 'reload' })))
  ));
  // Keep the entire shell on the same version while any old window is open.
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  const key = event.request.mode === 'navigate' && (url.pathname === '/' || url.pathname === '/index.html')
    ? '/' : url.pathname;
  if (!SHELL.includes(key)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match(key) || fetch(event.request);
  })());
});
