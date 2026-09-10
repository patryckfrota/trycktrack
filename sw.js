const CACHE_NAME = 'trycktrack-v6';

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
  './osce-stations.js',
  './assets/logo-enamed-sigla.png',
  './assets/logo-uepa-sigla.png',
  './pdf-export.js',
  './vendor/pdf-lib.min.js',
  './vendor/fontkit.umd.min.js',
  './vendor/fonts/Inter-Regular.ttf',
  './vendor/fonts/Inter-Medium.ttf',
  './vendor/fonts/Inter-SemiBold.ttf',
  './vendor/fonts/Inter-Bold.ttf'
];

self.addEventListener('install', event => {
  // Sem skipWaiting() aqui: um service worker novo instala e fica
  // "esperando" até o app pedir pra assumir (mensagem SKIP_WAITING, vinda
  // do botão "Atualizar agora"). Isso é o que permite mostrar o aviso
  // dentro do app em vez de trocar a versão em uso sem avisar ninguém.
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

// O botão "Atualizar agora" do app manda essa mensagem para o worker que
// está esperando — só então ele assume (skipWaiting) e dispara o
// 'controllerchange' que o app usa pra recarregar a página já na versão nova.
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
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
