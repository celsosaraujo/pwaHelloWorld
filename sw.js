const cacheName = 'ola-pwa';
var filesToCache = [
  './',
  './manifest.webmanifest',
  './index.html',
  './css/style.css',
  './js/main.js'
];

/* Inicia o Service Worker e armazene em cache o conteúdo do aplicativo*/
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

/* Servidor de armazenamento de cache quando estiver offline*/
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('push', event => {
  const data = event.data.json();
  console.log('Push received:', data);

  const options = {
    body: data.body,
    icon: 'icon.png'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
