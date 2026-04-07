const CACHE_NAME = 'muscle-dialogue-v198'; // 筋肥大アイコンの表示不具合を完全修正
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './app.js?v=183',
    './manifest.json',
    './sw.js',
    './biceps.png',
    './kinnikun_spinner.png',
    './icon_calendar.svg',
    './icon_training.svg',
    './icon_profile.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // Gemini APIへのリクエストはキャッシュしない
    if (event.request.url.includes('generativelanguage.googleapis.com')) {
        event.respondWith(fetch(event.request));
        return;
    }

    // Network First 戦略（最新のファイルを優先し、ダメならキャッシュを使う）
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // 通信成功したらキャッシュも最新化する
                if (response && response.status === 200 && response.type === 'basic') {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                }
                return response;
            })
            .catch(() => {
                // オフライン時はキャッシュを返す
                return caches.match(event.request);
            })
    );
});
