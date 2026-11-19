// Gerado por tools/build-pwa.cjs — não editar à mão.
const VERSION = '7fa1310e94';
const CACHE = 'sq-' + VERSION;
const SHELL = ["./","2649099.json","__game-scripts.js","__loading__.js","__start__.js","config.json","logo.png","manifest.webmanifest","playcanvas-stable.min.js","pwa/apple-touch-icon.png","pwa/icon-192.png","pwa/icon-512.png","pwa/maskable-192.png","pwa/maskable-512.png","styles.css"];
self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys()
        .then((ks) => Promise.all(ks.filter((k) => k.startsWith('sq-') && k !== CACHE).map((k) => caches.delete(k))))
        .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
    const req = e.request;
    if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
    // A página em si: rede primeiro, para pegar um build novo assim que ele sair.
    if (req.mode === 'navigate') {
        e.respondWith(fetch(req).catch(() => caches.match('./')));
        return;
    }
    // O resto: cache primeiro (cada build tem um cache só seu); rede para encher o cache.
    e.respondWith(caches.open(CACHE).then((c) => c.match(req, { ignoreSearch: true }).then((hit) => hit ||
        fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }))));
});
