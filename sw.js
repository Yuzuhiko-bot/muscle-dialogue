const CACHE_NAME = 'muscle-dialogue-v1.10.3';
const ASSETS = [
    './',
    './index.html',
    './style.css?v=1.10.3',
    './app.js?v=1.10.3',
    './manifest.json',
    './sw.js',
    './biceps.png',
    './kinnikun_spinner.png',
    './rpe_smile.png',
    './bike.png',
    './image_10ad84.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // ローカル開発環境（localhost等）の場合はキャッシュを完全にバイパスする
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
        event.respondWith(
            fetch(event.request).catch(() => {
                // サーバーが落ちている場合は古いキャッシュを返さず、エラーテキストを返す
                return new Response("Muscle Dialogue v1.9.2 | Power!! 💪 ローカル開発サーバーが起動していないか、アクセスできません。サーバーを起動してください！パワー！", {
                    status: 503,
                    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
                });
            })
        );
        return;
    }

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
