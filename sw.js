const CACHE_NAME = 'muscle-dialogue-v1.9.51.9.5';
const ASSETS = [
    './',
    './index.html',
    './style.css?v=1.9.1',
    './app.js?v=1.9.1',
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

    // 繝ｭ繝ｼ繧ｫ繝ｫ髢狗匱迺ｰ蠅・ｼ・ocalhost遲会ｼ峨・蝣ｴ蜷医・繧ｭ繝｣繝・す繝･繧貞ｮ悟・縺ｫ繝舌う繝代せ縺吶ｋ
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
        event.respondWith(
            fetch(event.request).catch(() => {
                // 繧ｵ繝ｼ繝舌・縺瑚誠縺｡縺ｦ縺・ｋ蝣ｴ蜷医・蜿､縺・く繝｣繝・す繝･繧定ｿ斐＆縺壹√お繝ｩ繝ｼ繝・く繧ｹ繝医ｒ霑斐☆
                return new Response("Muscle Dialogue v1.9.5 | Power!! 潮 繝ｭ繝ｼ繧ｫ繝ｫ髢狗匱繧ｵ繝ｼ繝舌・縺瑚ｵｷ蜍輔＠縺ｦ縺・↑縺・°縲√い繧ｯ繧ｻ繧ｹ縺ｧ縺阪∪縺帙ｓ縲ゅし繝ｼ繝舌・繧定ｵｷ蜍輔＠縺ｦ縺上□縺輔＞・√ヱ繝ｯ繝ｼ・・, {
                    status: 503,
                    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
                });
            })
        );
        return;
    }

    // Gemini API縺ｸ縺ｮ繝ｪ繧ｯ繧ｨ繧ｹ繝医・繧ｭ繝｣繝・す繝･縺励↑縺・    if (event.request.url.includes('generativelanguage.googleapis.com')) {
        event.respondWith(fetch(event.request));
        return;
    }

    // Network First 謌ｦ逡･・域怙譁ｰ縺ｮ繝輔ぃ繧､繝ｫ繧貞━蜈医＠縲√ム繝｡縺ｪ繧峨く繝｣繝・す繝･繧剃ｽｿ縺・ｼ・    event.respondWith(
        fetch(event.request)
            .then(response => {
                // 騾壻ｿ｡謌仙粥縺励◆繧峨く繝｣繝・す繝･繧よ怙譁ｰ蛹悶☆繧・                if (response && response.status === 200 && response.type === 'basic') {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                }
                return response;
            })
            .catch(() => {
                // 繧ｪ繝輔Λ繧､繝ｳ譎ゅ・繧ｭ繝｣繝・す繝･繧定ｿ斐☆
                return caches.match(event.request);
            })
    );
});
