const staticCacheName = 'site-static-v2';
const assets = [
    '/',
    '/index.html',
    '/restaurant.html?id=1',
    '/restaurant.html?id=2',
    '/restaurant.html?id=3',
    '/restaurant.html?id=4',
    '/restaurant.html?id=5',
    '/restaurant.html?id=6',
    '/restaurant.html?id=7',
    '/restaurant.html?id=8',
    '/restaurant.html?id=9',
    '/restaurant.html?id=10',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/js/dbhelper.js',
    '/css/styles.css?v=1.1',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
];


// install service worker 
self.addEventListener('install', function(evt){
//console.log('service worker has been installed!');
evt.waitUntil(caches.open(staticCacheName).then(function(cache){
    console.log('caching shell assetes');
cache.addAll(assets);
    })
  );
});


// activate event 
self.addEventListener('activate', function(evt){
   // console.log('service worker has been activated!');
   evt.waitUntil(
     caches.keys().then(function(keys){
        console.log(keys);
       return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
        )
     })
   );
});


// fetch event
self.addEventListener('fetch', function(evt){
   // console.log('fetch event', evt);
   evt.respondWith(
       caches.match(evt.request).then(function(cacheRes){
     return cacheRes || fetch(evt.request);
       })
   );
});