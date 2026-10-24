const CACHE='deal-hunter-v2-20261024-1';
const ASSETS=['./','./index.html','./app.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const scope=new URL(self.registration.scope);
const shellPaths=new Set(ASSETS.map(p=>new URL(p,scope).pathname));
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('deal-hunter-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==scope.origin||!shellPaths.has(url.pathname))return;event.respondWith(fetch(event.request).catch(()=>caches.match(new Request(url.origin+url.pathname)).then(response=>response||Response.error())))});
