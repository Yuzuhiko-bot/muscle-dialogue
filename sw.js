const CACHE_NAME = 'muscle-dialogue-v1.9.4';
const ASSETS = [
    './',
    './index.html',
    './style.css?v=1.9.4',
    './md_final_v194.js',
    './manifest.json',
    './biceps.png',
    './icon_calendar.svg',
    './icon_training.svg',
    './icon_profile.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('generativelanguage.googleapis.com')) {
        event.respondWith(fetch(event.request));
        return;
    }
    // Network First 戦略
    event.respondWith(
        fetch(event.request)
            .then(response => {
                if (response && response.status === 200 && response.type === 'basic') {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
                }
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
