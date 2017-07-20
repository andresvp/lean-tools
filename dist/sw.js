self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/server.js',
       '/sw.js',
       '/app.3c5e57d50d8fb774299414013c5ae958.css',
       '/js/app.js',
       '/js/manifest.js',
       '/js/vendor.js'
     ])
   })
 )
})