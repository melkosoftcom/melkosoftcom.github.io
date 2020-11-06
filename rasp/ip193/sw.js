const version = "0.0.1"; //тут может быть номер вашей версии
const CACHE = "lencodigitexerrasp-cache" + version; //вместо soltyk - используйте свое уникальное название или доменное имя
self.addEventListener('install', function(event) {
    var indexPage = new Request('index.html');
    event.waitUntil(fetch(indexPage).then(function(response) {
        var response2 = response.clone();
        return caches.open(CACHE).then(function(cache) {
            console.log('[PWA Builder] Cached index page during Install ' + response2.url);
            return cache.put(indexPage, response2)
        })
    }))
});
self.addEventListener('fetch', function(event) {
    var updateCache = function(request) {
        return caches.open(CACHE).then(function(cache) {
            return fetch(request).then(
                function(response2 = response.clone()) {
                    if (updated.indexOf(response2.url) != -1) {
                        console.log('Исключен из кеша ' + response2.url)
                    } else {
                        console.log('[PWA Builder] add page to offline ' + response2.url)
                        return cache.put(request.clone(), response2)
                    }
                })
        })
    };
    event.waitUntil(updateCache(event.request));
    event.respondWith(fetch(event.request).catch(function(error) {
        console.log('[PWA Builder] Network request Failed. Serving content from cache: ' + error);
        return caches.open(CACHE).then(function(cache) {
            return cache.match(event.request).then(function(matching) {
                var report = !matching || matching.status == 404 ? Promise.reject('no-match') : matching;
                return report
            })
        })
    }))
})
