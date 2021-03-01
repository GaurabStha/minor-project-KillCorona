self.addEventListener('install', function(event) {
    console.log('SW installed.');
    event.waitUntil(
        caches.open('static')
        .then(function(cache) {
            cache.addAll([
                '/',
                'public/css',
                'public/images',
                'public/js',
                'manifest.json',
                'logo.png',
                '../views/layouts/main.hbs',
                '../views/partials/footer.hbs',
                '../views/partials/header.hbs',
                '../views/partials/informationHeader.hbs',
                '../views/index.hbs',
            ]);
        })
    );
});

self.addEventListener('activate', function() {
    console.log('SW activated.');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(res) {
            if (res) {
                return res;
            } else {
                return fetch(event.request);
            }
        })
    )
})