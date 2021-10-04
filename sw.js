importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.setConfig({
  debug: false,
});
self.__precacheManifest =[  '/index.html',
    '/aframe-cursor-teleport-component.min.js',
  '/aframe-environment-component.js',
   '/models/col_mesh.glb',
    '/aframe-environment-map-component.js',
  '/aframe-environment-map-component.min.js',
    "https://aframe.io/releases/1.2.0/aframe.min.js",
    "https://rawgit.com/fernandojsg/aframe-teleport-controls/master/dist/aframe-teleport-controls.min.js",
    "https://cdn.glitch.com/073d2935-5bcc-443b-a9a8-5a1ebaf21213%2F3bhk_Wallcelling.glb?v=1633341871755",
    "https://cdn.glitch.com/073d2935-5bcc-443b-a9a8-5a1ebaf21213%2F3bhk_Bathrooms.glb?v=1633341876429",
    "https://cdn.glitch.com/073d2935-5bcc-443b-a9a8-5a1ebaf21213%2F3bhk_Bedroom.glb?v=1633341872951",
    "https://cdn.glitch.com/073d2935-5bcc-443b-a9a8-5a1ebaf21213%2F3bhk_GuestBed.glb?v=1633341856189",
    "https://cdn.glitch.com/073d2935-5bcc-443b-a9a8-5a1ebaf21213%2F3bhk_kitchen.glb?v=1633341862605",
    "https://cdn.glitch.com/073d2935-5bcc-443b-a9a8-5a1ebaf21213%2F3bhk_Living.glb?v=1633341884605",
    "https://cdn.glitch.com/073d2935-5bcc-443b-a9a8-5a1ebaf21213%2F3bhk_MasterBed.glb?v=1633341878333"
]
workbox.precaching.precacheAndRoute(self.__precacheManifest);
// const OFFLINE_URL = "/exterior";
// const staticCacheName = 'Exterior';
// Demonstrates using default cache
workbox.routing.registerRoute(
    new RegExp('.*\\.(?:js|css|ico|map|woff2|)'),
    new workbox.strategies.CacheFirst(),
);

// Demonstrates a custom cache name for a route.
// workbox.routing.registerRoute(
//     new RegExp('.*\\.(?:png|jpg|jpeg|svg|gif|png)'),
//     new workbox.strategies.CacheFirst({
//       cacheName: 'image-cache',
//       plugins: [
//         new workbox.expiration.ExpirationPlugin({
//           maxEntries: 3,
//         }),
//       ],
//     }),
// );


self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
var progress=0;

const interval = setInterval(() => {
  
  caches.open(workbox.core.cacheNames.precache).then(cache => {
      cache.keys().then(keys => {
        progress=(keys.length/self.__precacheManifest.length)/100;

        self.clients.matchAll().then(clients => {
          clients.forEach(client => client.postMessage({type:'progress',percent:progress}))
      })
          if (keys.length >= self.__precacheManifest.length) {
              clearInterval(interval)
              // self.clients.matchAll().then(clients => {
              //     clients.forEach(client => client.postMessage('afterPrecache'))
              // })
          }
      })
  })
}, 1000)
