const CACHE_NAME = 'trycktrack-v2';

// Arquivos essenciais para abrir o aplicativo mesmo sem conexão,
// depois da primeira visita online.
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-180.png',
  './icon-180-transparent.png',
  './logo-clean-v2.png',
  './questions-cirurgia.js',
  './questions-psiquiatria.js',
  './questions-preventiva.js',
  './questions-obstetricia.js',
  './questions-ginecologia.js',
  './questions-pediatria.js',
  './questions-clinica-medica.js',
  './questions-revalida.js',
  './question-explanations.js',
  './assets/logo-enamed-sigla.png',
  './assets/logo-uepa-sigla.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Chamadas do Firebase e outros domínios seguem pela rede; somente os
  // recursos do próprio Trycktrack são armazenados para leitura offline.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const network = fetch(event.request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached || caches.match('./index.html'));

      // Para HTML, busca uma versão nova quando há internet. Para o restante,
      // responde instantaneamente do cache e atualiza em segundo plano.
      return event.request.mode === 'navigate' ? network : (cached || network);
    })
  );
});
