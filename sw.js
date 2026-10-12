// O Trycktrack mudou para https://trycktrack.vercel.app/.
// Este service worker substitui o antigo só para se desligar: apaga o cache
// da versão velha, se remove e recarrega as abas abertas, que então caem na
// página de aviso (index.html) e seguem para o endereço novo.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
        await self.registration.unregister();
        const abas = await self.clients.matchAll({ type: 'window' });
        abas.forEach((aba) => aba.navigate(aba.url));
    })());
});
