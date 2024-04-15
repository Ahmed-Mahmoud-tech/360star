/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'my-react-app-cache2';

self.addEventListener('install', event => {
  console.log("object0");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll([
        '/',
        '/index.html',
        '/static/js/bundle.js',
        '/static/css/main.css',
        '/assets/images/star/09.png',
        

      ]))
      .catch(error => console.error('Cache open failed:', error))
  );
});

self.addEventListener('fetch', event => {
  console.log("=> fetch");
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheItems => {
      return Promise.all(
        cacheItems.filter(cacheItem => {
          return cacheItem !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});