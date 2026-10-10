// IMPORTANTE: mude este número a cada deploy que altera qualquer arquivo
// do APP_SHELL abaixo (qualquer app-*.js, app.css, index.html...). O
// registro do Service Worker só detecta "há versão nova" quando os
// BYTES do próprio sw.js mudam — se só os arquivos que ele cacheia
// mudarem e este número ficar parado, o app instalado (ícone na tela de
// início) nunca mostra o banner "Atualizar agora" e continua servindo
// os arquivos antigos do cache indefinidamente (a atualização em
// segundo plano do fetch handler existe, mas no iOS um PWA em background
// é suspenso antes dela terminar — já aconteceu, não é hipotético).
const CACHE_NAME = 'trycktrack-v259';

// Arquivos essenciais para abrir o aplicativo mesmo sem conexão,
// depois da primeira visita online.
const APP_SHELL = [
  './',
  './index.html',
  './app.css',
  './manifest.json',
  './icon-180.png',
  './icon-180-transparent.png',
  './logo-clean-v2.png',
  './shared/trail-priority.js',
  './shared/scoring.js',
  './shared/osce-pep.js',
  './shared/osce-indice.js',
  './shared/osce-validar.js',
  './shared/text-normalize.js',
  './shared/question-filters.js',
  './shared/question-search.js',
  './shared/weighted-sampling.js',
  './shared/spaced-repetition.js',
  './shared/sync-merge.js',
  './shared/activity-log.js',
  './shared/activity-insights.js',
  // Trilha por assunto e painel da trilha — importados pelo mesmo bloco
  // <script type="module"> do index.html; se um faltar offline, o bloco
  // inteiro falha (inclusive o Firebase), então entram no pré-cache.
  './shared/subject-weights.js',
  './shared/trail-subjects.js',
  './shared/trail-metrics.js',
  './shared/trail-pace.js',
  './shared/trail-exam.js',
  './shared/exam-areas.js',
  './shared/trail-schedule.js',
  './shared/trail-blocks.js',
  './app-auth.js',
  './app-reader.js',
  './app-bullets.js',
  './app-essentials.js',
  './app-search.js',
  './app-reading-extras.js',
  './app-app.js',
  './app-osce.js',
  './osce/catalogo.json',
  './osce/indice.json',
  './questions-cirurgia.js',
  './questions-psiquiatria.js',
  './questions-preventiva.js',
  './questions-obstetricia.js',
  './questions-ginecologia.js',
  './questions-pediatria.js',
  './questions-clinica-medica.js',
  './questions-revalida.js',
  './questions-uepa.js',
  './questions-usp.js',
  './questions-sus.js',
  './questions-enare.js',
  './questions-internato.js',
  './question-explanations.js',
  './question-explanations-internato.js',
  './bullets-pediatria.js',
  './bullets-clinica-medica.js',
  './bullets-go.js',
  './bullets-cirurgia.js',
  './bullets-preventiva.js',
  './essentials-pediatria.js',
  './essentials-data/pediatria-aleitamento-materno.js',
  './essentials-data/pediatria-asma.js',
  './essentials-data/pediatria-cardiopatias-congenitas.js',
  './essentials-data/pediatria-choque-pediatria.js',
  './essentials-data/pediatria-crescimento-desenvolvimento.js',
  './essentials-data/pediatria-dermatologia-pediatrica.js',
  './essentials-data/pediatria-diarreia-aguda.js',
  './essentials-data/pediatria-disturbios-crescimento.js',
  './essentials-data/pediatria-disturbios-gi-funcionais.js',
  './essentials-data/pediatria-disturbios-metabolicos.js',
  './essentials-data/pediatria-doencas-exantematicas.js',
  './essentials-data/pediatria-imunizacao.js',
  './essentials-data/pediatria-infeccoes-respiratorias-1.js',
  './essentials-data/pediatria-infeccoes-respiratorias-2.js',
  './essentials-data/pediatria-itu-urologia.js',
  './essentials-data/pediatria-neonatologia-2.js',
  './essentials-data/pediatria-pals.js',
  './essentials-data/pediatria-sindromes-emeticas.js',
  './essentials-data/pediatria-sindromes-geneticas.js',
  './essentials-preventiva.js',
  './essentials-data/preventiva-declaracao-obito-etica.js',
  './essentials-data/preventiva-epidemiologia-clinica.js',
  './essentials-data/preventiva-estudos-epidemiologicos.js',
  './essentials-data/preventiva-medidas-saude-coletiva.js',
  './essentials-data/preventiva-saude-trabalhador-etica.js',
  './essentials-data/preventiva-sus.js',
  './essentials-data/preventiva-vigilancia-saude.js',
  './essentials-clinica-medica.js',
  './essentials-data/clinica-cirrose-causas.js',
  './essentials-data/clinica-cirrose-complicacoes.js',
  './essentials-data/clinica-diverticulose-polipose-cancer-colon.js',
  './essentials-data/clinica-doencas-esofago.js',
  './essentials-data/clinica-doencas-estomago.js',
  './essentials-data/clinica-hepatologia-hepatites-virais.js',
  './essentials-data/clinica-ma-absorcao-dii-gastroenterite.js',
  './essentials-data/clinica-obstrucao-intestinal.js',
  './essentials-data/clinica-pancreas.js',
  './essentials-data/clinica-tumores-hepatobiliares.js',
  './essentials-data/clinica-vias-biliares-ictericia.js',
  './essentials-data/clinica-anemias-1.js',
  './essentials-data/clinica-anemias-2.js',
  './essentials-data/clinica-arritmias-1.js',
  './essentials-data/clinica-arritmias-2.js',
  './essentials-data/clinica-disturbios-hemostasia.js',
  './essentials-data/clinica-doenca-arterial-coronariana.js',
  './essentials-data/clinica-has-dislipidemia.js',
  './essentials-data/clinica-insuficiencia-cardiaca.js',
  './essentials-data/clinica-leucemias-pancitopenias.js',
  './essentials-data/clinica-linfomas-mieloma.js',
  './essentials-data/clinica-valvopatias.js',
  './essentials-data/clinica-cancer-prostata-bexiga.js',
  './essentials-data/clinica-cancer-renal-bexiga.js',
  './essentials-data/clinica-diabetes-mellitus.js',
  './essentials-data/clinica-disturbio-acidobasico.js',
  './essentials-data/clinica-disturbios-hidroeletroliticos.js',
  './essentials-data/clinica-glomerulopatias-1.js',
  './essentials-data/clinica-glomerulopatias-2.js',
  './essentials-data/clinica-insuficiencia-renal.js',
  './essentials-data/clinica-nefrolitiase-hpb.js',
  './essentials-data/clinica-supra-renal.js',
  './essentials-data/clinica-tireoide-1.js',
  './essentials-data/clinica-tireoide-2.js',
  './essentials-data/clinica-tubulointersticiais-vasculares.js',
  './essentials-data/clinica-asma-dpoc.js',
  './essentials-data/clinica-cancer-pulmao-tep.js',
  './essentials-data/clinica-colagenoses-1.js',
  './essentials-data/clinica-colagenoses-2.js',
  './essentials-data/clinica-derrame-pleural.js',
  './essentials-data/clinica-gota-febre-reumatica-osteoartrose.js',
  './essentials-data/clinica-introducao-reumatologia-artrites.js',
  './essentials-data/clinica-tuberculose.js',
  './essentials-data/clinica-vasculites.js',
  './essentials-data/clinica-aids.js',
  './essentials-data/clinica-covid-19.js',
  './essentials-data/clinica-endocardite-meningite-itu-celulite.js',
  './essentials-data/clinica-intoxicacoes-peconhentos.js',
  './essentials-data/clinica-monkeypox.js',
  './essentials-data/clinica-parasitoses-intestinais.js',
  './essentials-data/clinica-pneumonia-complicacoes.js',
  './essentials-data/clinica-sindromes-febris.js',
  './essentials-data/clinica-terapia-intensiva.js',
  './essentials-data/clinica-cuidados-paliativos.js',
  './essentials-data/clinica-dermatologia.js',
  './essentials-data/clinica-neurologia-1.js',
  './essentials-data/clinica-neurologia-2.js',
  './essentials-data/clinica-neurologia-3.js',
  './essentials-data/clinica-oftalmologia.js',
  './essentials-data/clinica-prevencao-geriatria.js',
  './essentials-data/clinica-psiquiatria-1.js',
  './essentials-data/clinica-psiquiatria-2.js',
  './essentials-ginecologia.js',
  './essentials-data/ginecologia-amenorreia-sop.js',
  './essentials-data/ginecologia-ciclo-anticoncepcao.js',
  './essentials-data/ginecologia-climaterio-distopia-incontinencia.js',
  './essentials-data/ginecologia-ist.js',
  './essentials-data/ginecologia-lesoes-precursoras-colo-endometrio.js',
  './essentials-data/ginecologia-mamas-ovarios.js',
  './essentials-data/ginecologia-sua-endometriose-infertilidade.js',
  './essentials-obstetricia.js',
  './essentials-data/obstetricia-diagnostico-gravidez-prenatal.js',
  './essentials-data/obstetricia-hipertensao-diabetes.js',
  './essentials-data/obstetricia-mecanismo-assistencia-parto.js',
  './essentials-data/obstetricia-sangramentos-primeira-metade.js',
  './essentials-data/obstetricia-sangramentos-segunda-metade.js',
  './essentials-data/obstetricia-sofrimento-fetal-forceps-puerperio.js',
  './essentials-cirurgia.js',
  './essentials-data/cirurgia-anestesiologia-1.js',
  './essentials-data/cirurgia-anestesiologia-2.js',
  './essentials-data/cirurgia-cicatrizacao-queimadura-remit.js',
  './essentials-data/cirurgia-cirurgia-pediatrica.js',
  './essentials-data/cirurgia-cirurgia-plastica.js',
  './essentials-data/cirurgia-dor-abdominal.js',
  './essentials-data/cirurgia-dor-lombar.js',
  './essentials-data/cirurgia-hemorragia-digestiva.js',
  './essentials-data/cirurgia-hernias-parede-abdominal.js',
  './essentials-data/cirurgia-mordedura-tetano-raiva.js',
  './essentials-data/cirurgia-obesidade.js',
  './essentials-data/cirurgia-oncologia.js',
  './essentials-data/cirurgia-ortopedia-1.js',
  './essentials-data/cirurgia-ortopedia-2.js',
  './essentials-data/cirurgia-preparo-pre-operatorio.js',
  './essentials-data/cirurgia-proctologia.js',
  './essentials-data/cirurgia-suporte-nutricional.js',
  './essentials-data/cirurgia-trauma-1.js',
  './essentials-data/cirurgia-trauma-2.js',
  './essentials-data/cirurgia-vascular.js',
  './essentials-data/cirurgia-vias-aereas.js',
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
