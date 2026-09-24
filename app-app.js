        /* ============================================================
           VISIBILIDADE DE ERROS EM PRODUÇÃO
           Antes disso, um erro de JS não tratado na tela do aluno
           simplesmente sumia — sem log nenhum, em lugar nenhum. Reporta
           pro backend (POST /api/errors, sem exigir login — muitos erros
           acontecem antes do usuário logar) de forma best-effort: nunca
           lança, nunca bloqueia, nunca reporta o próprio erro de
           reportar. Roda o mais cedo possível no arquivo pra capturar
           qualquer coisa que quebre depois daqui.
           ============================================================ */
        (function initClientErrorReporting() {
            const ENDPOINT = 'https://trycktrack.onrender.com/api/errors';
            function report(message, stack) {
                try {
                    const body = JSON.stringify({
                        message: String(message || 'Erro desconhecido').slice(0, 2000),
                        stack: stack ? String(stack).slice(0, 8000) : undefined,
                        url: location.href.slice(0, 500),
                        userAgent: navigator.userAgent.slice(0, 500),
                        userId: (window.__fb?.getCurrentUser?.()?.uid || undefined)
                    });
                    if (navigator.sendBeacon) {
                        navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
                    } else {
                        fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
                    }
                } catch (_) { /* nunca deixa o report quebrar o app */ }
            }
            window.addEventListener('error', event => report(event.message, event.error && event.error.stack));
            window.addEventListener('unhandledrejection', event => report(
                event.reason && event.reason.message ? event.reason.message : String(event.reason),
                event.reason && event.reason.stack
            ));
        })();

        /* ============================================================
           PAINÉIS DO MENU LATERAL
           Um único painel reutilizável mantém Perfil, Configurações,
           Ajuda e Sobre com a mesma linguagem visual, sem duplicar
           modais nem misturar conteúdo dessas áreas na tela principal.
           ============================================================ */
        function closeSidebarPanel() {
            const panel = document.getElementById('sidebarDetailPanel');
            const backdrop = document.getElementById('sidebarDetailBackdrop');
            if (!panel || !backdrop) return;
            panel.classList.remove('active');
            backdrop.classList.remove('active');
            panel.setAttribute('aria-hidden', 'true');
        }

        function applyGlobalFontScale(scale) {
            const safeScale = Math.max(.9, Math.min(1.2, Number(scale) || 1));
            localStorage.setItem('trycktrack-global-font-scale', String(safeScale));
            const excluded = '.reader-view, .question-player, .fontsize-sheet, .profile-crop-backdrop, .question-print-root, .rapid-print-root';
            const textElements = document.querySelectorAll('#appContainer *, #sidebar *, #sidebarDetailPanel *');
            textElements.forEach(element => {
                if (element.closest(excluded) || element.matches('svg, path, img, input[type="range"]')) return;
                if (!element.matches('h1,h2,h3,h4,h5,h6,p,span,strong,small,label,button,a,li,select,option,legend')) return;
                if (!element.dataset.globalFontBase) {
                    const base = parseFloat(getComputedStyle(element).fontSize);
                    if (!Number.isFinite(base)) return;
                    element.dataset.globalFontBase = String(base);
                }
                element.style.fontSize = `${parseFloat(element.dataset.globalFontBase) * safeScale}px`;
            });
        }

        function setGlobalFontScale(scale) {
            applyGlobalFontScale(scale);
        }

        function openSidebarPanel(panelKey) {
            const panel = document.getElementById('sidebarDetailPanel');
            const backdrop = document.getElementById('sidebarDetailBackdrop');
            const title = document.getElementById('sidebarDetailTitle');
            const subtitle = document.getElementById('sidebarDetailSubtitle');
            const body = document.getElementById('sidebarDetailBody');
            if (!panel || !backdrop || !title || !subtitle || !body) return;

            document.getElementById('sidebar')?.classList.remove('active');
            document.getElementById('sidebarBackdrop')?.classList.remove('active');

            const user = getCurrentUser();
            const displayName = [user.firstName, user.secondName].filter(Boolean).join(' ') || 'Estudante';
            const email = currentFirebaseUser?.email || 'Conta local do aplicativo';
            const initials = ((user.firstName?.[0] || '') + (user.secondName?.[0] || '')).toUpperCase() || 'E';
            const themeMode = getStoredThemeMode();
            const globalFontScale = Number(localStorage.getItem('trycktrack-global-font-scale')) || 1;
            const themeName = { system: 'Sistema', on: 'Escura', off: 'Clara' }[themeMode] || 'Sistema';
            const profilePhoto = getStoredProfilePhoto();
            const profilePhotoMarkup = profilePhoto
                ? `<img src="${escapeHtml(profilePhoto)}" alt="Foto do perfil">`
                : `<span>${escapeHtml(initials)}</span>`;

            const panels = {
                perfil: {
                    title: 'Perfil',
                    subtitle: 'Seus dados e sua conta',
                    html: `<div class="sidebar-detail-card"><div class="sidebar-profile"><div class="sidebar-profile-avatar" id="sidebarDetailAvatar">${profilePhotoMarkup}</div><div class="sidebar-profile-copy"><strong>${escapeHtml(displayName)}</strong><span>${escapeHtml(email)}</span></div></div><div class="sidebar-photo-actions"><label class="sidebar-photo-button" for="sidebarPhotoInput">Escolher foto</label><input id="sidebarPhotoInput" type="file" accept="image/*" hidden onchange="handleProfilePhotoChange(this)"><button type="button" class="sidebar-photo-remove" onclick="removeProfilePhoto()">Remover foto</button></div><p class="sidebar-photo-note">${currentFirebaseUser ? 'A foto fica salva na sua conta e sincroniza entre dispositivos.' : 'A foto é salva neste dispositivo. Conecte uma conta para sincronizá-la entre dispositivos.'} Escolha uma imagem quadrada para um melhor resultado.</p></div><div class="sidebar-detail-card"><h3>Dados do perfil</h3><div class="sidebar-setting-row"><div><strong>Nome exibido</strong><br><span>${escapeHtml(displayName)}</span></div></div><div class="sidebar-setting-row" style="margin-top:12px"><div><strong>Email da conta</strong><br><span>${escapeHtml(email)}</span></div></div></div><div class="sidebar-detail-card"><h3>Seu espaço de estudo</h3><p>Seu progresso, preferências e leituras ficam associados a esta conta quando o acesso está conectado.</p><ul><li>Rapid Reviews lidos e último ponto de leitura;</li><li>histórico de sessões e desempenho;</li><li>preferências de tema e tamanho de fonte.</li></ul></div><div class="sidebar-detail-card"><h3>Conta conectada</h3><p>${currentFirebaseUser ? 'Sua conta está conectada e pronta para sincronizar o progresso.' : 'Você está usando o modo local. Ao conectar uma conta, seus dados poderão acompanhar você em outros dispositivos.'}</p></div><div class="sidebar-detail-card"><h3>Privacidade</h3><p>Você pode controlar a foto, as preferências locais e o uso da sua conta. Para solicitar acesso, correção ou exclusão de dados pessoais, utilize o canal de contato do projeto.</p></div>`
                },
                configuracoes: {
                    title: 'Configurações',
                    subtitle: 'Controles do aplicativo',
                    html: `<div class="sidebar-detail-card"><div class="sidebar-setting-row"><div><strong>Aparência</strong><br><span>Escolha o tema do aplicativo</span></div><span>${escapeHtml(themeName)}</span></div><div class="sidebar-setting-actions"><button type="button" data-theme-panel-mode="system" class="${themeMode === 'system' ? 'active' : ''}" onclick="setThemeMode('system'); openSidebarPanel('configuracoes')">Sistema</button><button type="button" data-theme-panel-mode="on" class="${themeMode === 'on' ? 'active' : ''}" onclick="setThemeMode('on'); openSidebarPanel('configuracoes')">Escura</button><button type="button" data-theme-panel-mode="off" class="${themeMode === 'off' ? 'active' : ''}" onclick="setThemeMode('off'); openSidebarPanel('configuracoes')">Clara</button></div></div><div class="sidebar-detail-card"><h3>Tamanho do Texto</h3><div class="sidebar-setting-actions"><button type="button" class="${globalFontScale === .9 ? 'active' : ''}" onclick="setGlobalFontScale(.9); openSidebarPanel('configuracoes')">A−</button><button type="button" class="${globalFontScale === 1 ? 'active' : ''}" onclick="setGlobalFontScale(1); openSidebarPanel('configuracoes')">Padrão</button><button type="button" class="${globalFontScale === 1.1 ? 'active' : ''}" onclick="setGlobalFontScale(1.1); openSidebarPanel('configuracoes')">A+</button><button type="button" class="${globalFontScale === 1.2 ? 'active' : ''}" onclick="setGlobalFontScale(1.2); openSidebarPanel('configuracoes')">A++</button></div></div>`
                },
                ajuda: {
                    title: 'Ajuda',
                    subtitle: 'Um guia para aproveitar melhor o app',
                    html: `<div class="sidebar-detail-card"><h3>Como começar</h3><p>Comece pela tela inicial e escolha o próximo passo de acordo com seu momento de estudo.</p><ul><li>Use o menu inferior para alternar entre Início, Trilhas, QuestHub, Dashboard e Rapid Review.</li><li>Abra uma grande área para continuar de onde parou.</li><li>Use o menu lateral para acessar seu perfil e suas preferências.</li></ul><button type="button" class="sidebar-photo-button" style="margin-top:12px" onclick="closeSidebarPanel(); openOnboarding()">Rever tutorial de primeiro acesso</button></div><div class="sidebar-detail-card"><h3>Rapid Review</h3><p>Escolha uma grande área e leia os temas em sequência. O aplicativo registra seu progresso e tenta retomar a leitura no ponto em que você parou.</p><ul><li>Use <strong>Aa</strong> para ajustar o tamanho do texto.</li><li>Abra “Trocar o tema” para navegar diretamente entre os capítulos.</li><li>Use o botão de download quando quiser gerar uma versão para estudo offline ou impressão.</li></ul></div><div class="sidebar-detail-card"><h3>Banco de questões</h3><p>Escolha o modo de treino e configure os filtros disponíveis antes de iniciar uma sessão.</p><ul><li><strong>Guiado:</strong> veja a explicação após responder.</li><li><strong>Simulado:</strong> responda sem interrupções e confira o resultado ao final.</li><li><strong>OSCE:</strong> pratique estações clínicas estruturadas.</li><li><strong>Imersão:</strong> faça uma prova completa.</li></ul></div><div class="sidebar-detail-card"><h3>Trilhas de estudo</h3><p>As trilhas organizam fases de estudo por objetivo. Conforme você avança, novas etapas podem ser liberadas.</p></div><div class="sidebar-detail-card"><h3>Progresso e conta</h3><p>Quando estiver conectado, seu progresso pode ser sincronizado. No modo local, as preferências e os dados ficam salvos neste dispositivo.</p></div><div class="sidebar-detail-card"><h3>Quando algo não carregar</h3><ul><li>Atualize a página ou reabra o aplicativo.</li><li>Confira sua conexão com a internet.</li><li>Se o conteúdo continuar ausente, confirme se você está usando a versão mais recente.</li><li>Ao testar no celular, use o endereço da rede local ou o domínio publicado — “localhost” funciona apenas no computador que hospeda o app.</li></ul></div><div class="sidebar-detail-card"><h3>Precisa de suporte?</h3><p>Anote a tela em que o problema ocorreu, o dispositivo utilizado e o que você fez antes do erro. Essas informações ajudam a localizar a causa com mais rapidez.</p></div>`
                },
                sobre: {
                    title: 'Sobre',
                    subtitle: 'Um espaço para estudar com clareza',
                    html: `<div class="sidebar-detail-card"><h3>Trycktrack</h3><p>O Trycktrack é um ambiente de preparação para residência médica criado para transformar um grande volume de conteúdo em uma rotina de estudo mais organizada, visual e contínua. Também foi pensado para apoiar a preparação das provas teóricas e práticas do internato.</p></div><div class="sidebar-detail-card"><h3>Uma experiência construída para o seu ritmo</h3><p>O aplicativo combina leitura, prática e acompanhamento para que você saiba o que estudar, onde retomar e como evoluir ao longo da preparação.</p></div><div class="sidebar-detail-card"><h3>O que você encontra</h3><ul><li><strong>Rapid Reviews:</strong> resumos estruturados por grandes áreas e temas.</li><li><strong>QuestHub:</strong> diferentes formatos de treino, provas e explicações.</li><li><strong>Trilhas:</strong> caminhos de estudo organizados por objetivo.</li><li><strong>OSCE:</strong> estações práticas para raciocínio clínico e comunicação.</li><li><strong>Dashboard:</strong> visão do seu progresso e desempenho.</li></ul></div><div class="sidebar-detail-card"><h3>Conteúdo que evolui com você</h3><p>Os materiais, questões e estações podem ser atualizados, revisados e ampliados para acompanhar as necessidades da preparação e as referências educacionais utilizadas.</p></div><div class="sidebar-detail-card"><h3>Privacidade e autonomia</h3><p>Suas preferências de aparência, progresso local e foto de perfil permanecem sob seu controle. Quando uma conta estiver conectada, os dados permitidos podem ser sincronizados para manter sua experiência entre dispositivos.</p></div><div class="sidebar-detail-card"><h3>Nosso compromisso</h3><p>Oferecer uma experiência consistente, acessível e cuidadosa para que cada sessão de estudo seja mais objetiva — sem substituir diretrizes oficiais, supervisão ou avaliação profissional.</p></div>`
                },
                termos: {
                    title: 'Termos de uso',
                    subtitle: 'Regras de utilização do aplicativo',
                    html: `<div class="sidebar-detail-card"><h3>1. Aceitação</h3><p>Ao acessar e utilizar o Trycktrack, você concorda com estas condições de uso. Caso não concorde com alguma delas, interrompa a utilização do aplicativo.</p></div><div class="sidebar-detail-card"><h3>2. Finalidade educacional</h3><p>O Trycktrack é uma ferramenta de apoio à preparação acadêmica, incluindo provas teóricas e práticas do internato e exames de residência médica. Ele não substitui aulas, supervisão médica, diretrizes oficiais, protocolos institucionais ou avaliação profissional.</p></div><div class="sidebar-detail-card"><h3>3. Conta e segurança</h3><p>Você é responsável pelas informações fornecidas, pela confidencialidade da senha e pelas atividades realizadas na sua conta. Não compartilhe credenciais nem permita o uso da sua conta por terceiros.</p></div><div class="sidebar-detail-card"><h3>4. Conteúdo clínico</h3><p>Questões, Rapid Reviews, trilhas e estações OSCE devem ser utilizados como material de estudo. Informações médicas podem ser revisadas e atualizadas; confirme condutas, doses e recomendações em fontes oficiais e atuais antes de aplicá-las na prática.</p></div><div class="sidebar-detail-card"><h3>5. Uso adequado</h3><ul><li>Não tente acessar, copiar, modificar ou explorar áreas restritas do aplicativo.</li><li>Não use o Trycktrack para diagnosticar ou tratar pessoas.</li><li>Não publique, redistribua ou comercialize materiais sem autorização.</li><li>Não utilize o aplicativo para prejudicar outros usuários ou comprometer seu funcionamento.</li></ul></div><div class="sidebar-detail-card"><h3>6. Privacidade e LGPD</h3><p>O tratamento de dados pessoais deve observar a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018), especialmente os princípios de finalidade, necessidade, transparência, segurança e prevenção. O Trycktrack deve utilizar apenas os dados necessários para autenticação, funcionamento, sincronização do progresso e personalização da experiência.</p><p>Quando aplicável, o titular pode solicitar confirmação de tratamento, acesso, correção, atualização, eliminação de dados tratados com base em consentimento, informação sobre compartilhamento e revogação do consentimento, observadas as hipóteses legais de conservação. Solicitações relacionadas a dados devem ser encaminhadas ao responsável indicado pelo projeto.</p><p>Não envie informações de pacientes, prontuários ou outros dados sensíveis reais para o aplicativo. A foto de perfil e preferências salvas localmente permanecem no dispositivo até que você as remova ou limpe os dados do navegador.</p></div><div class="sidebar-detail-card"><h3>7. Segurança dos dados</h3><p>São adotadas medidas técnicas e administrativas compatíveis com o projeto para reduzir riscos de acesso indevido, perda ou alteração. Nenhum serviço conectado à internet é totalmente livre de riscos; mantenha seus dispositivos e credenciais protegidos.</p></div><div class="sidebar-detail-card"><h3>8. Propriedade intelectual</h3><p>A identidade visual, o código, a organização da plataforma e os materiais próprios do Trycktrack pertencem aos seus respectivos titulares. O acesso ao aplicativo não transfere direitos de propriedade intelectual ao usuário.</p></div><div class="sidebar-detail-card"><h3>9. Disponibilidade</h3><p>Podem ocorrer indisponibilidades temporárias para manutenção, atualização, falhas de conexão ou limitações de serviços externos. O aplicativo pode funcionar parcialmente no modo local, mas alguns recursos dependem de internet e autenticação.</p></div><div class="sidebar-detail-card"><h3>10. Atualizações</h3><p>Os recursos, conteúdos e estes termos podem ser aprimorados ou alterados para manter o aplicativo seguro, útil e compatível com novas plataformas. A versão mais recente ficará disponível nesta seção.</p></div><div class="sidebar-detail-card"><h3>11. Dúvidas e solicitações</h3><p>Se você encontrar um erro, conteúdo desatualizado ou dificuldade de acesso, registre a tela afetada, o dispositivo utilizado e os passos que levaram ao problema. Para exercer direitos relacionados aos seus dados pessoais, utilize o canal de contato informado pelo responsável pelo projeto.</p></div>`
                }
            };

            const selected = panels[panelKey] || panels.sobre;
            title.textContent = selected.title;
            subtitle.textContent = selected.subtitle;
            body.innerHTML = selected.html;
            applyGlobalFontScale(Number(localStorage.getItem('trycktrack-global-font-scale')) || 1);
            panel.classList.add('active');
            backdrop.classList.add('active');
            panel.setAttribute('aria-hidden', 'false');
        }

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') closeSidebarPanel();
        });

        window.addEventListener('DOMContentLoaded', () => {
            applyGlobalFontScale(Number(localStorage.getItem('trycktrack-global-font-scale')) || 1);
            syncTrackCapsuleUI();
        });

        /* ============================================================
           TEMA (claro/escuro) — Sistema / Ligado / Desligado
           "Ligado"/"Desligado" se referem ao modo escuro:
           - system → segue prefers-color-scheme do SO/navegador,
             e continua acompanhando em tempo real se ele mudar
           - on     → força escuro
           - off    → força claro
           ============================================================ */
        const THEME_STORAGE_KEY = 'trycktrack-theme-mode';
        const systemDarkQuery = window.matchMedia('(prefers-color-scheme: light)');

        function resolveTheme(mode) {
            if (mode === 'on') return 'dark';
            if (mode === 'off') return 'light';
            return systemDarkQuery.matches ? 'light' : 'dark';
        }

        function applyTheme(mode) {
            const resolved = resolveTheme(mode);
            document.documentElement.setAttribute('data-theme', resolved);

            const metaTheme = document.querySelector('meta[name="theme-color"]');
            if (metaTheme) {
                metaTheme.setAttribute('content', resolved === 'light' ? '#F3F2F6' : '#15161A');
            }

            document.querySelectorAll('.theme-option').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.mode === mode);
            });
        }

        function setThemeMode(mode) {
            localStorage.setItem(THEME_STORAGE_KEY, mode);
            applyTheme(mode);
        }

        function getStoredThemeMode() {
            return localStorage.getItem(THEME_STORAGE_KEY) || 'system';
        }

        // Reage a mudanças de tema do sistema em tempo real, mas só quando
        // o modo escolhido é "Sistema" — nos outros modos, o app ignora
        // o SO de propósito (é uma escolha forçada pelo usuário).
        systemDarkQuery.addEventListener('change', () => {
            if (getStoredThemeMode() === 'system') applyTheme('system');
        });

        window.addEventListener('DOMContentLoaded', () => applyTheme(getStoredThemeMode()));

        const tabMap = {
            'inicio': 'inicioTab',
            'trilhas': 'trilhasTab',
            'review': 'reviewTab',
            'questoes': 'questoesTab',
            'metricas': 'metricasTab'
        };
        const paginas = ['inicio', 'trilhas', 'questoes', 'metricas', 'review'];

        // Trilhas agora estão disponíveis. O bloqueio acontece dentro
        // da própria trilha, fase a fase, conforme a progressão real.
        const PAGINAS_BLOQUEADAS = [];

        const TRAIL_STORAGE_KEY = 'trycktrack-dynamic-trails-v1';
        let activeTrailPhase = null;
        const TRAIL_CATALOG = {
            enamed: {
                name: 'Trilha Enamed',
                logo: 'assets/logo-enamed-sigla.png',
                description: 'Prioriza incidência nacional e o seu desempenho.',
                phases: [
                    { id: 'clinica', title: 'Clínica Médica', area: 'Clínica Médica', topicKey: 'clinica-medica', focus: 'Cardiologia, Infectologia e Pneumologia', incidence: 96 },
                    { id: 'go', title: 'Ginecologia e Obstetrícia', area: 'Ginecologia e Obstetrícia', topicKey: 'go-completo', focus: 'Pré-natal, parto e urgências obstétricas', incidence: 88 },
                    { id: 'pediatria', title: 'Pediatria', area: 'Pediatria', topicKey: 'pediatria-completo', focus: 'Neonatologia, crescimento e imunizações', incidence: 84 },
                    { id: 'cirurgia', title: 'Cirurgia Geral', area: 'Cirurgia Geral', topicKey: 'cirurgia-geral', focus: 'Trauma, abdome agudo e emergências', incidence: 80 },
                    { id: 'preventiva', title: 'Medicina Preventiva', area: 'Medicina Preventiva', topicKey: 'medicina-preventiva', focus: 'SUS, vigilância e epidemiologia', incidence: 76 }
                ]
            },
            uepa: {
                name: 'Trilha UEPA',
                logo: 'assets/logo-uepa-sigla.png',
                description: 'Organiza o estudo com a matriz de prioridade UEPA.',
                phases: [
                    { id: 'clinica', title: 'Clínica Médica', area: 'Clínica Médica', topicKey: 'clinica-medica', focus: 'Clínica aplicada e emergências', incidence: 91 },
                    { id: 'pediatria', title: 'Pediatria', area: 'Pediatria', topicKey: 'pediatria-completo', focus: 'Atenção à criança e neonatologia', incidence: 90 },
                    { id: 'preventiva', title: 'Medicina Preventiva', area: 'Medicina Preventiva', topicKey: 'medicina-preventiva', focus: 'APS, SUS e saúde coletiva', incidence: 87 },
                    { id: 'go', title: 'Ginecologia e Obstetrícia', area: 'Ginecologia e Obstetrícia', topicKey: 'go-completo', focus: 'Assistência pré-natal e parto', incidence: 82 },
                    { id: 'cirurgia', title: 'Cirurgia Geral', area: 'Cirurgia Geral', topicKey: 'cirurgia-geral', focus: 'Trauma e cuidados perioperatórios', incidence: 74 }
                ]
            }
        };

        function getTrailState() {
            try { return JSON.parse(localStorage.getItem(TRAIL_STORAGE_KEY) || '{"active":"enamed","tracks":{}}'); }
            catch (_) { return { active: 'enamed', tracks: {} }; }
        }

        function saveTrailState(state) {
            localStorage.setItem(TRAIL_STORAGE_KEY, JSON.stringify(state));
        }

        function getTrailTrack(state, trailId) {
            state.tracks = state.tracks || {};
            if (!state.tracks[trailId]) state.tracks[trailId] = { diagnosis: null, phaseProgress: {}, recalibrations: [] };
            return state.tracks[trailId];
        }

        // calculatePathPriority não é mais definida aqui — vem de
        // shared/trail-priority.js via window.calculatePathPriority,
        // exposta pelo <script type="module"> do Firebase (que sempre
        // termina de rodar antes do DOMContentLoaded, então já está
        // disponível em qualquer handler/callback deste script clássico).
        // Mesmo arquivo que o backend usa — ver comentário lá.
        function getTrailPlan(trailId, track) {
            const catalog = TRAIL_CATALOG[trailId];
            if (!track.diagnosis) return catalog.phases;
            const byId = Object.fromEntries(catalog.phases.map(item => [item.id, item]));
            const orderedIds = track.orderedPhaseIds || window.calculatePathPriority({ topics: catalog.phases, results: track.diagnosis.results }).map(item => item.id);
            return orderedIds.map(id => byId[id]).filter(Boolean);
        }

        function renderTrails() {
            const hub = document.getElementById('trailHub');
            if (!hub) return;
            // Trilhas hoje só existem pro lado Residência (ENAMED/UEPA) —
            // não há trilha de rodízio pro Internato ainda (fica pra sessão
            // dedicada de redesign de Trilhas). Estado vazio simples em vez
            // de esconder a aba inteira.
            if (activeTrackCapsule === 'curso') {
                hub.className = 'dashboard-empty';
                hub.innerHTML = '<div class="dashboard-empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg></div><span>Trilha de Internato ainda não existe — pratique pelo QuestHub, na cápsula Curso, por enquanto.</span>';
                return;
            }
            hub.className = 'trail-hub';
            const state = getTrailState();
            const trailId = state.active || 'enamed';
            const track = getTrailTrack(state, trailId);
            saveTrailState(state);
            const catalog = TRAIL_CATALOG[trailId];
            const plan = getTrailPlan(trailId, track);
            const completed = Object.values(track.phaseProgress || {}).filter(value => value >= 100).length;
            const diagnosticDone = !!track.diagnosis;

            const diagnosisCard = {
                id: 'diagnostico', title: 'Diagnóstico inicial global', focus: '20 questões distribuídas entre as cinco grandes áreas', progress: diagnosticDone ? 100 : 0,
                unlocked: true, action: diagnosticDone ? 'Diagnóstico concluído' : 'Iniciar diagnóstico'
            };
            const recalibrationRequired = diagnosticDone && completed >= 2 && !(track.recalibrations || []).length && completed < plan.length;
            const phases = [diagnosisCard, ...plan.map((phase, index) => {
                const beforeRecalibration = recalibrationRequired && index >= completed;
                const priorComplete = diagnosticDone && !beforeRecalibration && plan.slice(0, index).every(item => (track.phaseProgress[item.id] || 0) >= 100);
                const progress = Number(track.phaseProgress[phase.id] || 0);
                return { ...phase, progress, unlocked: priorComplete || progress > 0, action: progress >= 100 ? 'Concluída' : progress >= 50 ? 'Iniciar bateria' : 'Abrir Rapid Review' };
            })];
            if (recalibrationRequired) {
                phases.splice(completed + 1, 0, {
                    id: 'recalibragem', title: 'Simulado de recalibragem',
                    focus: '20 questões gerais para reorganizar as próximas fases', progress: 0,
                    unlocked: true, action: 'Iniciar simulado', recalibration: true
                });
            }

            hub.innerHTML = `
                <div class="trail-hub-header">
                    <span class="beta-pill">Beta</span>
                </div>
                <div class="trail-switch">
                    ${Object.entries(TRAIL_CATALOG).map(([id, item]) => `<button class="trail-switch-button${id === trailId ? ' active' : ''}" onclick="selectTrail('${id}')" aria-label="${item.name}" aria-pressed="${id === trailId}"><img class="trail-switch-logo" src="${item.logo}" alt="${item.name}">${id === trailId ? '<span class="trail-switch-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span>' : ''}</button>`).join('')}
                </div>
                <div class="trail-status"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg><span>${diagnosticDone ? `${completed} de ${plan.length} fases concluídas. Próximas fases priorizadas pelo seu diagnóstico.` : 'Comece pelo diagnóstico para personalizar automaticamente a ordem das fases.'}</span></div>
                <div class="trail-path">
                    ${phases.map((phase, index) => {
                        const locked = !phase.unlocked;
                        const isDiagnosis = phase.id === 'diagnostico';
                        const isRecalibration = !!phase.recalibration;
                        const icon = locked
                            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>'
                            : phase.progress >= 100
                                ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"/></svg>'
                                : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
                        const click = locked ? '' : isDiagnosis ? `onclick="startTrailDiagnostic('${trailId}')"` : isRecalibration ? `onclick="startTrailRecalibration('${trailId}')"` : `onclick="startTrailPhase('${trailId}','${phase.id}')"`;
                        const step = isDiagnosis ? 'Etapa 0 · calibração' : isRecalibration ? 'Ponto de recalibragem' : `Fase ${index} · ${phase.progress >= 50 ? 'bateria de fixação' : 'Rapid Review'}`;
                        return `<article class="trail-phase${locked ? ' locked' : ''}" ${click}>
                            <span class="trail-phase-marker"></span>
                            <div class="trail-phase-content"><div class="trail-phase-kicker">${step}</div><h3>${phase.title}</h3><p>${phase.focus}</p><div class="trail-phase-progress"><span style="width:${phase.progress}%"></span></div></div>
                            <span class="trail-phase-action" aria-label="${locked ? 'Fase bloqueada' : phase.action}">${icon}</span>
                        </article>`;
                    }).join('')}
                </div>`;
        }

        function selectTrail(trailId) {
            const state = getTrailState();
            state.active = trailId;
            getTrailTrack(state, trailId);
            saveTrailState(state);
            renderTrails();
        }

        function randomSample(items, count) {
            const copy = [...items];
            for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
            return copy.slice(0, count);
        }

        // Com busca ativa (R-4), `questions` já chega ordenada por
        // relevância (filterQuestionBank/filterInternatoBank, via
        // rankQuestionsBySearch) — embaralhar e cortar aqui jogaria fora
        // essa ordem, entregando questões aleatórias entre as que bateram
        // com a busca em vez das que bateram MELHOR. Sem busca, mantém o
        // sorteio de sempre (randomSample).
        function selectStudyQuestions(questions, count, searchActive) {
            return searchActive ? questions.slice(0, Math.min(count, questions.length)) : randomSample(questions, count);
        }

        // Cápsula Curso (Internato/OSCE, foco faculdade) / Residência
        // (Guiado/Simulado/Imersão + Trilhas + Rapid Review, foco provas de
        // residência) no topo do QuestHub. Só decide visibilidade — não
        // mexe em getActiveQuestionBank nem na lógica de cada modo.
        const TRACK_CAPSULE_KEY = 'trycktrack-track-capsule';
        const CAPSULE_MODES = { curso: ['internato', 'osce'], residencia: ['practice', 'exam', 'full-exam'] };
        let activeTrackCapsule = localStorage.getItem(TRACK_CAPSULE_KEY) === 'curso' ? 'curso' : 'residencia';

        function filterQuestionModesByCapsule() {
            // .question-mode tem "display: grid !important" (regra de
            // autor, pro layout 2x2) — nem .hidden nem style.display
            // normal vencem um !important; setProperty com 'important'
            // explícito é a única forma de sobrepor.
            document.querySelectorAll('.question-mode[data-question-mode]').forEach(btn => {
                const mode = btn.dataset.questionMode;
                if (mode === 'review') { btn.style.removeProperty('display'); return; }
                const visibleModes = CAPSULE_MODES[activeTrackCapsule] || [];
                if (visibleModes.includes(mode)) btn.style.removeProperty('display');
                else btn.style.setProperty('display', 'none', 'important');
            });
        }

        function syncTrackCapsuleUI() {
            document.querySelectorAll('[data-track-capsule]').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.trackCapsule === activeTrackCapsule);
            });
            filterQuestionModesByCapsule();
        }

        function setTrackCapsule(button) {
            activeTrackCapsule = button.dataset.trackCapsule === 'curso' ? 'curso' : 'residencia';
            localStorage.setItem(TRACK_CAPSULE_KEY, activeTrackCapsule);
            syncTrackCapsuleUI();
            if (document.getElementById('trailHub')?.innerHTML) renderTrails();
            if (document.getElementById('dashboardScore')) renderDashboard();
        }

        // Cada Rapid Review de Clínica Médica (Cardiologia, Endocrinologia
        // etc.) é sua própria área no banco de questões, mas a Trilha/
        // edital enxerga isso como uma fase só ("Clínica Médica") — igual
        // já acontecia com Ginecologia+Obstetrícia.
        const CLINICA_MEDICA_AREAS = ['Cardiologia', 'Dermatologia', 'Endocrinologia', 'Gastroenterologia', 'Hematologia', 'Hepatologia', 'Infectologia', 'Nefrologia', 'Neurologia', 'Pneumologia', 'Reumatologia'];

        function toTrailArea(area) {
            if (area === 'Ginecologia' || area === 'Obstetrícia') return 'Ginecologia e Obstetrícia';
            if (CLINICA_MEDICA_AREAS.includes(area)) return 'Clínica Médica';
            return area;
        }

        // R-3: agrupa por área na mesma convenção de trailQuestionsForArea.
        function groupQuestionsByTrailArea(questions) {
            const groups = {};
            questions.forEach(question => {
                const key = toTrailArea(question.area);
                (groups[key] = groups[key] || []).push(question);
            });
            return groups;
        }

        // Simulado "Todas as áreas" (sem tema nem busca escolhidos) sorteia
        // ponderado pela incidência do edital × desempenho da pessoa em
        // vez de chance igual pra qualquer área (R-3) — usa a mesma
        // trilha ativa (ENAMED/UEPA) e os mesmos dados de incidência já
        // usados pra ordenar as Trilhas (TRAIL_CATALOG), e o mesmo
        // trycktrack-question-stats.byArea que já alimenta o Dashboard,
        // sem precisar de histórico novo. Com tema específico ou busca
        // ativa, a ponderação por área não faz sentido (o recorte já foi
        // escolhido a dedo) — cai no sorteio uniforme de sempre.
        function selectExamQuestions(filtered, count) {
            const theme = document.getElementById('questionConfigTheme')?.value || 'Todas';
            const searchActive = !!document.getElementById('questionConfigSearch')?.value.trim();
            if (theme !== 'Todas' || searchActive || !filtered.length) {
                return selectStudyQuestions(filtered, count, searchActive);
            }
            const trailState = getTrailState();
            const track = TRAIL_CATALOG[trailState.active] || TRAIL_CATALOG.enamed;
            const statsByArea = getQuestionStats().byArea?.residencia || {};
            const sampled = window.weightedSampleByIncidence(groupQuestionsByTrailArea(filtered), track.phases, statsByArea, count);
            // Nenhuma área do recorte bateu com o TRAIL_CATALOG (ex.: só
            // Psiquiatria, que não tem fase própria na trilha) — cai no
            // sorteio uniforme em vez de devolver uma sessão vazia.
            return sampled.length ? sampled : selectStudyQuestions(filtered, count, false);
        }

        function trailQuestionsForArea(area, count) {
            const bank = Array.isArray(window.TRYCKTRACK_QUESTION_BANK) ? window.TRYCKTRACK_QUESTION_BANK : [];
            const matching = area === 'Ginecologia e Obstetrícia' ? bank.filter(q => ['Ginecologia', 'Obstetrícia'].includes(q.area))
                : area === 'Clínica Médica' ? bank.filter(q => CLINICA_MEDICA_AREAS.includes(q.area))
                : bank.filter(q => q.area === area);
            return randomSample(matching, count);
        }

        // As "grandes áreas" do diagnóstico/recalibração vêm das fases da
        // trilha ativa (TRAIL_CATALOG) em vez de uma lista solta — as
        // duas trilhas (enamed/uepa) têm as mesmas 5 áreas hoje, mas se
        // uma ganhar/perder uma fase um dia, isso segue sozinho, sem
        // precisar lembrar de atualizar uma cópia separada aqui.
        function trailDiagnosticAreas(trailId) {
            const catalog = TRAIL_CATALOG[trailId] || TRAIL_CATALOG.enamed;
            return catalog.phases.map(phase => phase.area);
        }

        async function startTrailDiagnostic(trailId) {
            const groups = trailDiagnosticAreas(trailId);
            const questions = groups.flatMap(area => trailQuestionsForArea(area, 4));
            if (questions.length < 20) { revealQuestionNotice('Ainda faltam questões em uma das grandes áreas para formar o diagnóstico.'); return; }
            await ensureQuestionExplanationsLoaded().catch(() => {});
            activeQuestionSession = { mode: 'exam', questions: randomSample(questions, 20), index: 0, answers: [], trailDiagnostic: trailId, startedAt: new Date().toISOString() };
            document.getElementById('questionPlayer').hidden = false;
            document.body.style.overflow = 'hidden';
            renderQuestionPlayer();
        }

        async function startTrailRecalibration(trailId) {
            const groups = trailDiagnosticAreas(trailId);
            const questions = groups.flatMap(area => trailQuestionsForArea(area, 4));
            if (questions.length < 20) { revealQuestionNotice('Ainda faltam questões em uma das grandes áreas para formar o simulado.'); return; }
            await ensureQuestionExplanationsLoaded().catch(() => {});
            activeQuestionSession = { mode: 'exam', questions: randomSample(questions, 20), index: 0, answers: [], trailRecalibration: trailId, startedAt: new Date().toISOString() };
            document.getElementById('questionPlayer').hidden = false;
            document.body.style.overflow = 'hidden';
            renderQuestionPlayer();
        }

        async function startTrailPhase(trailId, phaseId) {
            const state = getTrailState();
            const track = getTrailTrack(state, trailId);
            const phase = getTrailPlan(trailId, track).find(item => item.id === phaseId);
            if (!phase) return;
            const progress = Number(track.phaseProgress[phaseId] || 0);
            if (progress >= 100) return;
            if (progress < 50) {
                track.phaseProgress[phaseId] = 50;
                saveTrailState(state);
                activeTrailPhase = { trailId, phaseId };
                openReader(phase.topicKey);
                return;
            }
            const questions = trailQuestionsForArea(phase.area, 10);
            if (!questions.length) { revealQuestionNotice(`Ainda não há questões importadas de ${phase.area}.`); return; }
            await ensureQuestionExplanationsLoaded().catch(() => {});
            activeQuestionSession = { mode: 'practice', questions, index: 0, answers: [], trailPhase: { trailId, phaseId }, startedAt: new Date().toISOString() };
            document.getElementById('questionPlayer').hidden = false;
            document.body.style.overflow = 'hidden';
            renderQuestionPlayer();
        }

        function completeTrailDiagnostic(trailId, session) {
            const results = session.questions.map((question, index) => ({ area: toTrailArea(question.area), correct: window.isQuestionAnswerCorrect(question, session.answers[index]) }));
            const state = getTrailState();
            const track = getTrailTrack(state, trailId);
            track.diagnosis = { completedAt: Date.now(), results };
            track.orderedPhaseIds = window.calculatePathPriority({ topics: TRAIL_CATALOG[trailId].phases, results }).map(item => item.id);
            saveTrailState(state);
            renderTrails();
        }

        function completeTrailRecalibration(trailId, session) {
            const results = session.questions.map((question, index) => ({ area: toTrailArea(question.area), correct: window.isQuestionAnswerCorrect(question, session.answers[index]) }));
            const state = getTrailState();
            const track = getTrailTrack(state, trailId);
            const completedIds = Object.entries(track.phaseProgress || {}).filter(([, progress]) => progress >= 100).map(([id]) => id);
            const ranking = window.calculatePathPriority({ topics: TRAIL_CATALOG[trailId].phases, results }).map(item => item.id);
            const previous = track.orderedPhaseIds || [];
            track.orderedPhaseIds = [...previous.filter(id => completedIds.includes(id)), ...ranking.filter(id => !completedIds.includes(id))];
            track.recalibrations = [...(track.recalibrations || []), { completedAt: Date.now(), results }];
            saveTrailState(state);
            renderTrails();
        }

        function completeTrailPhase(trailPhase) {
            if (!trailPhase) return;
            const state = getTrailState();
            const track = getTrailTrack(state, trailPhase.trailId);
            track.phaseProgress[trailPhase.phaseId] = 100;
            saveTrailState(state);
            renderTrails();
        }

        function animarProgresso(tab) {
            tab.querySelectorAll('.progress-fill').forEach(bar => {
                const target = bar.getAttribute('data-progress') || 0;
                bar.style.width = '0%';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        bar.style.width = target + '%';
                    });
                });
            });
        }

        // Desliza a cápsula única (.nav-indicator) até o centro do item
        // ativo. A posição depende do layout flex real da barra, então
        // precisa de uma leitura de geometria — mas é UMA leitura (o item
        // + a barra), não uma varredura, e só acontece na troca de aba,
        // nunca em loop/scroll.
        function moveNavIndicator(index, instant) {
            const indicator = document.getElementById('navIndicator');
            const nav = document.querySelector('.bottom-nav');
            const navItems = document.querySelectorAll('.nav-item');
            const item = navItems[index];
            if (!indicator || !nav || !item) return;
            const itemRect = item.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();
            if (!itemRect.width || !navRect.width) return;
            const x = itemRect.left - navRect.left + itemRect.width / 2;
            if (instant) indicator.style.transitionDuration = '0s';
            indicator.style.transform = `translate(${x}px, -50%)`;
            if (instant) requestAnimationFrame(() => { indicator.style.transitionDuration = ''; });
        }

        window.addEventListener('resize', () => {
            const navItems = Array.from(document.querySelectorAll('.nav-item'));
            const index = navItems.indexOf(document.querySelector('.nav-item.active'));
            if (index >= 0) moveNavIndicator(index, true);
        });

        // Ondinha (ripple) no ponto exato do toque + a cápsula "afunda"
        // enquanto o dedo/mouse está pressionado. Delegado num único
        // listener na barra (não por item) pra não precisar tocar nos
        // onclick="mudarPagina(...)" já existentes em cada item.
        (function initNavTouchFeedback() {
            const nav = document.querySelector('.bottom-nav');
            const indicator = document.getElementById('navIndicator');
            if (!nav || !indicator) return;

            nav.addEventListener('pointerdown', (e) => {
                const item = e.target.closest('.nav-item');
                if (!item) return;
                indicator.classList.add('is-pressed');

                const rect = item.getBoundingClientRect();
                const ripple = document.createElement('span');
                ripple.className = 'nav-ripple';
                ripple.style.left = `${e.clientX - rect.left}px`;
                ripple.style.top = `${e.clientY - rect.top}px`;
                item.appendChild(ripple);
                ripple.addEventListener('animationend', () => ripple.remove());
            });

            ['pointerup', 'pointercancel', 'pointerleave'].forEach(evt => {
                nav.addEventListener(evt, () => indicator.classList.remove('is-pressed'));
            });
        })();

        function mudarPagina(pagina) {
            if (PAGINAS_BLOQUEADAS.includes(pagina)) {
                const index = paginas.indexOf(pagina);
                const navItems = document.querySelectorAll('.nav-item');
                const item = navItems[index];
                if (item) {
                    item.classList.remove('shake');
                    void item.offsetWidth; // reinicia a animação se already em curso
                    item.classList.add('shake');
                    setTimeout(() => item.classList.remove('shake'), 400);
                }
                return;
            }

            const atual = document.querySelector('.tab-content.active');
            if (atual && atual.id === tabMap[pagina]) return;

            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

            const navItems = document.querySelectorAll('.nav-item');
            const index = paginas.indexOf(pagina);

            const novaTab = document.getElementById(tabMap[pagina]);
            // Só o que muda o que a pessoa está olhando NA HORA do toque
            // (o item do menu inferior fica ativo — é o "badge" que
            // desliza/acende — e a aba troca) acontece aqui, síncrono,
            // isolado de qualquer trabalho de conteúdo. O navegador só
            // pinta a tela depois que TODO o JavaScript síncrono termina;
            // se renderTrails/renderDashboard rodassem no mesmo instante
            // (mesmo sendo rápidos no desenvolvimento, um Mac não é um
            // iPhone), o primeiro frame da transição do menu ficava
            // esperando esse trabalho terminar, e a badge "não corria
            // logo" — exatamente o relatado.
            novaTab.classList.add('active');
            if (index >= 0) { navItems[index].classList.add('active'); moveNavIndicator(index); }
            document.querySelector('.content').scrollTo({ top: 0, behavior: 'smooth' });
            updateHeaderTitle(pagina);

            // Todo o trabalho de conteúdo (renderização de página,
            // prefetch, marcação de cards) fica pra depois que o
            // navegador já teve a chance de pintar a troca de aba/badge
            // acima — não compete pelo mesmo frame.
            requestAnimationFrame(() => {
                animarProgresso(novaTab);
                if (pagina === 'inicio') renderLastReadCard();
                if (pagina === 'trilhas') renderTrails();
                if (pagina === 'review') syncRapidReviewMenu();
                if (pagina === 'metricas') renderDashboard();
                if (pagina === 'questoes') { updateReviewQueueHint(); syncTrackCapsuleUI(); }
                // Prefetch silencioso: Questões e Trilhas são as duas
                // telas de onde uma sessão pode começar, então já adianta
                // o download de question-explanations.js aqui — na hora
                // de responder a primeira questão, o arquivo já chegou.
                if (pagina === 'questoes' || pagina === 'trilhas') ensureQuestionExplanationsLoaded().catch(() => {});
                // Marca os cards da aba (estáticos e os que renderTrails/
                // renderDashboard acabaram de criar) — hoje só um
                // classList.add por elemento (ver tagCardReveal), sem
                // efeito visual próprio desde que a animação de entrada
                // foi removida.
                tagCardReveal(novaTab);
                enhanceClickableDivsForKeyboard(novaTab);
            });
        }

        const DASHBOARD_AREAS = [
            ['clinica-medica', 'Clínica Médica'],
            ['go-completo', 'Ginecologia e Obstetrícia'],
            ['pediatria-completo', 'Pediatria'],
            ['cirurgia-geral', 'Cirurgia Geral'],
            ['medicina-preventiva', 'Medicina Preventiva'],
            ['psiquiatria', 'Psiquiatria']
        ];
        // Rodízios do Internato (mesmos nomes/slugs de OSCE_CURRICULUM_MATRIX)
        // — lado Curso do detalhamento por área do Dashboard.
        const DASHBOARD_AREAS_CURSO = [
            ['atencao-primaria-a-saude', 'Atenção Primária à Saúde'],
            ['cirurgia', 'Cirurgia'],
            ['clinica-medica', 'Clínica Médica'],
            ['ginecologia-e-obstetricia', 'Ginecologia e Obstetrícia'],
            ['pediatria', 'Pediatria'],
            ['urgencia-e-emergencia-saude-mental', 'Urgência e Emergência / Saúde Mental']
        ];
        let dashboardPeriodDays = 7;

        function getQuestionStats() {
            try {
                return JSON.parse(localStorage.getItem('trycktrack-question-stats') || '{}');
            } catch (_) {
                return {};
            }
        }

        function setDashboardPeriod(button, days) {
            dashboardPeriodDays = days;
            button.parentElement.querySelectorAll('button').forEach(item => item.classList.remove('active'));
            button.classList.add('active');
            renderDashboard();
        }

        function renderDashboard() {
            const stats = getQuestionStats();
            const answered = Number(stats.answered || 0);
            const correct = Number(stats.correct || 0);
            const accuracy = answered ? Math.round((correct / answered) * 100) : 0;
            const minutes = Number(stats.studyMinutes || 0);
            const streak = Number(stats.streak || 0);

            const score = document.getElementById('dashboardScore');
            const ring = document.getElementById('dashboardScoreRing');
            if (!score || !ring) return;
            score.textContent = answered ? `${accuracy}%` : '0%';
            ring.style.setProperty('--score', accuracy);
            document.getElementById('dashboardQuestions').textContent = answered.toLocaleString('pt-BR');
            document.getElementById('dashboardTime').textContent = minutes >= 60 ? `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ''}` : `${minutes}m`;
            document.getElementById('dashboardStreak').textContent = `${streak}d`;
            document.getElementById('dashboardHeadline').textContent = answered ? (accuracy >= 80 ? 'Ótimo desempenho' : accuracy >= 60 ? 'Evolução consistente' : 'Vamos fortalecer a base') : 'Pronto para começar';
            document.getElementById('dashboardInsight').textContent = answered ? `${correct} acertos em ${answered} questões respondidas.` : 'Responda questões para construir uma análise personalizada.';

            // Casa cada dia por data (não por posição no array) — stats.daily
            // só ganha uma entrada nos dias em que houve estudo, então
            // indexar por posição deslocava o gráfico inteiro assim que
            // havia um intervalo sem responder nada.
            const dailyByDate = new Map((Array.isArray(stats.daily) ? stats.daily : []).map(item => [item.date, Number(item.count || 0)]));
            const today = new Date();
            const countForDaysAgo = (daysAgo) => {
                const date = new Date(today);
                date.setDate(date.getDate() - daysAgo);
                return dailyByDate.get(date.toISOString().slice(0, 10)) || 0;
            };
            let chartValues, dayLabels;
            if (dashboardPeriodDays === 7) {
                dayLabels = Array.from({ length: 7 }, (_, i) => {
                    const date = new Date(today); date.setDate(date.getDate() - (6 - i));
                    return date.toLocaleDateString('pt-BR', { weekday: 'narrow' });
                });
                chartValues = Array.from({ length: 7 }, (_, i) => countForDaysAgo(6 - i));
            } else {
                // 30 dias em 10 baldes de 3 dias — mantém a mesma densidade
                // visual de antes (10 barras), agora somando dias reais em
                // vez de indexar posições que não correspondiam a nada.
                const BUCKETS = 10, BUCKET_SIZE = 3;
                dayLabels = []; chartValues = [];
                for (let bucket = BUCKETS - 1; bucket >= 0; bucket--) {
                    let sum = 0;
                    const bucketEndDaysAgo = bucket * BUCKET_SIZE;
                    for (let offset = 0; offset < BUCKET_SIZE; offset++) sum += countForDaysAgo(bucketEndDaysAgo + offset);
                    const endDate = new Date(today); endDate.setDate(endDate.getDate() - bucketEndDaysAgo);
                    dayLabels.push(String(endDate.getDate()));
                    chartValues.push(sum);
                }
            }
            const maxValue = Math.max(1, ...chartValues);
            const chart = document.getElementById('dashboardChart');
            chart.innerHTML = chartValues.map((value, index) => `<div class="dashboard-day"><div class="dashboard-bar-track"><div class="dashboard-bar" style="height:${Math.max(3, Math.round((value / maxValue) * 100))}%"></div></div><label>${dayLabels[index]}</label></div>`).join('');
            document.getElementById('dashboardChartLabel').textContent = dashboardPeriodDays === 7 ? 'Últimos 7 dias' : 'Últimos 30 dias';

            const byArea = stats.byArea?.[activeTrackCapsule] || {};
            const dashboardAreaList = activeTrackCapsule === 'curso' ? DASHBOARD_AREAS_CURSO : DASHBOARD_AREAS;
            document.getElementById('dashboardAreas').innerHTML = dashboardAreaList.map(([key, name]) => {
                const area = byArea[key] || {};
                const areaAnswered = Number(area.answered || 0);
                const areaCorrect = Number(area.correct || 0);
                const value = areaAnswered ? Math.round((areaCorrect / areaAnswered) * 100) : 0;
                return `<div class="dashboard-area"><div class="dashboard-area-top"><span class="dashboard-area-name">${name}</span><span class="dashboard-area-value">${areaAnswered ? `${value}% · ${areaAnswered} questões` : 'Sem respostas'}</span></div><div class="dashboard-area-track"><div class="dashboard-area-fill" style="width:${value}%"></div></div></div>`;
            }).join('');

            const history = getQuestionHistory().filter(entry => entry.track === activeTrackCapsule);
            const recent = document.getElementById('dashboardRecent');
            if (!history.length) {
                recent.className = 'dashboard-empty';
                recent.innerHTML = '<div class="dashboard-empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 5.5v15M8 8h8M8 12h5"/></svg></div><span>Sua primeira sessão aparecerá aqui.</span>';
            } else {
                recent.className = 'dashboard-history-list';
                recent.innerHTML = history.map(entry => {
                    const modeLabel = entry.mode === 'exam' ? 'Simulado' : 'Guiado';
                    const pct = entry.total ? Math.round((entry.correct / entry.total) * 100) : 0;
                    return `<button type="button" class="dashboard-history-item" onclick="openQuestionHistoryEntry('${entry.id}')">
                        <div class="dashboard-history-item-main">
                            <strong>${escapeHtml(modeLabel)} · ${escapeHtml(entry.area || 'Áreas mistas')}</strong>
                            <span>${formatQuestionHistoryDate(entry.startedAt)}</span>
                        </div>
                        <div class="dashboard-history-item-score ${pct >= 60 ? 'good' : 'bad'}">${entry.correct}/${entry.total}</div>
                    </button>`;
                }).join('');
            }
        }

        function filtrar(btn) {
            btn.parentElement.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
        }

        let activeQuestionConfigMode = null;

        // O modo "Internato" usa um banco totalmente isolado
        // (window.TRYCKTRACK_INTERNATO_BANK, ver questions-internato.js) —
        // nunca misturado com Guiado/Simulado/OSCE/Imersão. Tudo que hoje
        // lê window.TRYCKTRACK_QUESTION_BANK direto pra montar a tela de
        // configuração ou a sessão passa por aqui, então o mesmo fluxo
        // (filtros de tema/ano/instituição, slider de quantidade) funciona
        // pros dois bancos sem duplicar a UI.
        function getActiveQuestionBank() {
            const bank = activeQuestionConfigMode === 'internato' ? window.TRYCKTRACK_INTERNATO_BANK : window.TRYCKTRACK_QUESTION_BANK;
            return Array.isArray(bank) ? bank : [];
        }

        // Índice invertido (R-4, shared/question-search.js) do banco ATIVO —
        // cacheado por banco (chave = 'principal'/'internato') e só
        // reconstruído quando o tamanho daquele banco muda, mesmo padrão de
        // getQuestionIndex (C-2). Sem isso, digitar na busca reprocessaria
        // o enunciado das ~1600/~1950 questões a cada tecla.
        const searchIndexCache = new Map(); // 'principal'|'internato' -> { index, size }
        function getSearchIndex() {
            const key = activeQuestionConfigMode === 'internato' ? 'internato' : 'principal';
            const bank = getActiveQuestionBank();
            const cached = searchIndexCache.get(key);
            if (cached && cached.size === bank.length) return cached.index;
            const index = window.buildSearchIndex(bank);
            searchIndexCache.set(key, { index, size: bank.length });
            return index;
        }

        function questionExamOptions() {
            return [...new Map((window.TRYCKTRACK_QUESTION_BANK || [])
                .filter(question => question.examId)
                .map(question => [question.examId, { id: question.examId, name: question.examName }])).values()];
        }

        function questionThemeOptions() {
            return [...new Set(getActiveQuestionBank().map(question => question.area).filter(Boolean))].sort();
        }

        function questionYearOptions() {
            return [...new Set(getActiveQuestionBank().flatMap(question => window.getQuestionYears(question)))].sort().reverse();
        }

        // "Instituição" e "Banca" eram dois <select> filtrando o MESMO
        // campo (source.includes(valor)) com a MESMA lista de opções —
        // os dados não têm uma banca examinadora separada da
        // instituição, então os dois campos sempre mostravam e faziam
        // exatamente a mesma coisa. Unificado num só campo. Opções vêm
        // do banco (mesmo padrão de questionThemeOptions/
        // questionYearOptions) — se uma prova de outra instituição
        // entrar um dia, o filtro já aparece sozinho, sem precisar
        // tocar em código.
        function questionSourceOptions() {
            // Extrai a sigla (token em maiúsculas, ex.: "INEP") de dentro
            // do source — "Revalida INEP 2025.2" e "INEP" viram a mesma
            // opção "INEP", sem misturar o ano (que já tem filtro próprio)
            // na lista. Continua batendo com o predicado do filtro
            // (source.includes(valorEscolhido)).
            return [...new Set(getActiveQuestionBank().flatMap(question => String(question.source || '').match(/\b[A-ZÀ-Ý]{2,}\b/g) || []))].sort();
        }

        // O modo Internato tem taxonomia própria (rodízio > tópico A/B >
        // tema, mais o semestre da prova) em vez de área/subárea — todas
        // as opções vêm só do que já existe em TRYCKTRACK_INTERNATO_BANK,
        // então um "semestre" novo (ex.: 2026.2) aparece sozinho assim que
        // questões com esse valor forem adicionadas ao arquivo.
        function internatoFieldOptions(field) {
            const bank = Array.isArray(window.TRYCKTRACK_INTERNATO_BANK) ? window.TRYCKTRACK_INTERNATO_BANK : [];
            return [...new Set(bank.map(question => question[field]).filter(Boolean))].sort();
        }

        // Todos os códigos de tema (A/B) usados na matriz do OSCE —
        // vira as opções do filtro "Tópico" do Internato.
        function osceThemeCodes() {
            return [...new Set(OSCE_CURRICULUM_MATRIX.flatMap(area => area.themes.map(theme => theme.code)))].sort();
        }

        // Tema (Internato) = subtemas da matriz do OSCE, filtrados pela
        // Rotação (área) e pelo Tópico (código A/B) escolhidos — os dois
        // disparam esta função (ver onchange nos dois selects acima).
        function updateInternatoTemas() {
            const rotacao = document.getElementById('questionConfigRodizio')?.value || 'Todos';
            const topico = document.getElementById('questionConfigTopico')?.value || 'Todos';
            const select = document.getElementById('questionConfigTema');
            if (!select) return;
            const areas = rotacao === 'Todos' ? OSCE_CURRICULUM_MATRIX : OSCE_CURRICULUM_MATRIX.filter(area => area.name === rotacao);
            const temas = new Set();
            areas.forEach(area => {
                const themes = topico === 'Todos' ? area.themes : (area.themes || []).filter(theme => theme.code === topico);
                themes.forEach(theme => (theme.subthemes || []).forEach(sub => temas.add(sub.name)));
            });
            const sorted = [...temas].sort();
            const current = select.value;
            select.innerHTML = '<option value="Todos">Todos</option>' + sorted.map(item => `<option value="${item}">${item}</option>`).join('');
            if (sorted.includes(current)) select.value = current;
            updateQuestionConfigAvailableCount();
        }

        // Lógica de filtragem em si (tema/subtema/instituição/ano/banca,
        // rodízio/tópico/tema/semestre do Internato, e o Filtro Avançado)
        // vive toda em shared/question-filters.js — window.filterQuestionBank
        // / window.filterInternatoBank, cobertos por node --test. Este
        // arquivo só lê DOM/localStorage e repassa: getFilteredQuestions-
        // ForConfig e startQuestionSession/startInternatoSession chamam a
        // MESMA função com os MESMOS dados, então nunca mais podem divergir
        // como aconteceu antes (o Filtro Avançado valia pro contador "N
        // questões disponíveis" mas não pra sessão de fato).
        function getInternatoFilteredQuestions(filters, { includeAdvancedFilter = true } = {}) {
            const bank = Array.isArray(window.TRYCKTRACK_INTERNATO_BANK) ? window.TRYCKTRACK_INTERNATO_BANK : [];
            const advancedFilterState = includeAdvancedFilter ? getAdvancedFilterState() : ADVANCED_FILTER_ALL_ON;
            return window.filterInternatoBank(bank, filters, advancedFilterState, getReviewQueue(), getSearchIndex());
        }

        function readInternatoConfigFilters() {
            return {
                rodizio: document.getElementById('questionConfigRodizio')?.value || 'Todos',
                topico: document.getElementById('questionConfigTopico')?.value || 'Todos',
                tema: document.getElementById('questionConfigTema')?.value || 'Todos',
                semestre: document.getElementById('questionConfigSemestre')?.value || 'Todos',
                search: document.getElementById('questionConfigSearch')?.value || ''
            };
        }

        // Tema/Subtema = a divisão real do Rapid Review (seção "PARTE..."
        // e subcapítulo) usada pra classificar cada questão — ver
        // questions-cirurgia.js. Em cascata com Área (igual Rotação →
        // Tópico → Tema do Internato): só lista o que existe de verdade
        // pra área escolhida, então uma área ainda não classificada
        // simplesmente não mostra opção nenhuma além de "Todos", sem
        // quebrar nada nem exigir mudança de código quando a
        // classificação de mais áreas for entrando.
        function updateQuestionConfigTemas() {
            const theme = document.getElementById('questionConfigTheme')?.value || 'Todas';
            const select = document.getElementById('questionConfigTema');
            if (!select) return;
            const temas = [...new Set(getActiveQuestionBank()
                .filter(question => (theme === 'Todas' || question.area === theme) && question.tema)
                .map(question => question.tema))].sort();
            const current = select.value;
            select.innerHTML = '<option value="Todos">Todos</option>' + temas.map(item => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join('');
            if (temas.includes(current)) select.value = current;
            updateQuestionConfigSubtemas();
        }

        function updateQuestionConfigSubtemas() {
            const theme = document.getElementById('questionConfigTheme')?.value || 'Todas';
            const tema = document.getElementById('questionConfigTema')?.value || 'Todos';
            const select = document.getElementById('questionConfigSubtema');
            if (!select) return;
            const subtemas = [...new Set(getActiveQuestionBank()
                .filter(question => (theme === 'Todas' || question.area === theme) && (tema === 'Todos' || question.tema === tema) && question.subtema)
                .map(question => question.subtema))].sort();
            select.innerHTML = '<option value="Todos">Todos</option>' + subtemas.map(item => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join('');
            updateQuestionConfigAvailableCount();
        }

        // Só o que os filtros de conteúdo (sem o slider de quantidade)
        // deixariam disponível — usado tanto pelo contador ao vivo
        // ("N questões disponíveis") quanto por getConfiguredQuestionSet
        // (que aplica o embaralhar + slice por cima disso) e por
        // startQuestionSession/startInternatoSession, que chamam esta
        // mesma função em vez de recalcular o filtro por conta própria —
        // é o que garante que a sessão sempre entrega exatamente o que o
        // contador anunciou, Filtro Avançado incluso.
        // includeAdvancedFilter:false serve só pra mensagem de "nenhuma
        // questão" distinguir "esse tema não tem questão nenhuma" de "os
        // Filtros Avançados zeraram o recorte" (ver startQuestionSession).
        function getFilteredQuestionsForConfig(mode, { includeAdvancedFilter = true } = {}) {
            const bank = getActiveQuestionBank();
            const advancedFilterState = includeAdvancedFilter ? getAdvancedFilterState() : ADVANCED_FILTER_ALL_ON;
            if (mode === 'internato') {
                return getInternatoFilteredQuestions(readInternatoConfigFilters(), { includeAdvancedFilter });
            }
            const filters = mode === 'full-exam'
                ? { examId: document.getElementById('questionConfigExam')?.value }
                : {
                    theme: document.getElementById('questionConfigTheme')?.value || 'Todas',
                    tema: document.getElementById('questionConfigTema')?.value || 'Todos',
                    subtema: document.getElementById('questionConfigSubtema')?.value || 'Todos',
                    institution: document.getElementById('questionConfigInstitution')?.value || 'Todas',
                    year: document.getElementById('questionConfigYear')?.value || 'Todos',
                    search: document.getElementById('questionConfigSearch')?.value || ''
                };
            return window.filterQuestionBank(bank, { mode, filters, advancedFilterState, reviewQueue: getReviewQueue(), searchIndex: getSearchIndex() });
        }

        // ---------- Filtro Avançado (tipo de questão + situação) ----------
        // Guardado no mesmo localStorage do resto (sem escopo por uid,
        // seguindo o padrão já usado por trycktrack-question-stats e
        // trycktrack-review-queue-v1 — é preferência de estudo do
        // dispositivo, não dado que precise seguir a pessoa). A "situação"
        // (já resolvi/não resolvi/acertei/errei) usa a MESMA fila de
        // revisão (getReviewQueue, REVIEW_QUEUE_KEY) que já alimenta a
        // revisão espaçada — cada pergunta respondida (não-discursiva) já
        // grava lá o último resultado, então não precisei criar um
        // histórico novo, só ler o que já existe.
        const ADVANCED_FILTER_KEY = 'trycktrack-advanced-filter-v1';
        const ADVANCED_FILTER_DEFAULT = {
            tipoCertoErrado: true,
            tipoMultiplaEscolha: true,
            tipoDiscursiva: false,
            situacaoResolvi: true,
            situacaoNaoResolvi: true,
            situacaoAcertei: false,
            situacaoErrei: false
        };
        const ADVANCED_FILTER_GROUPS = {
            tipo: ['tipoCertoErrado', 'tipoMultiplaEscolha', 'tipoDiscursiva'],
            situacao: ['situacaoResolvi', 'situacaoNaoResolvi', 'situacaoAcertei', 'situacaoErrei']
        };
        // Filtro Avançado "todo ligado" — usado só pra medir quantas
        // questões o conteúdo (tema/período) deixaria disponível SEM o
        // Filtro Avançado entrar na conta, pra mensagem de "nenhuma
        // questão" saber apontar a causa certa. Passa pela mesma função
        // pura (window.applyAdvancedFilter), não é um caminho à parte.
        const ADVANCED_FILTER_ALL_ON = {
            tipoCertoErrado: true, tipoMultiplaEscolha: true, tipoDiscursiva: true,
            situacaoResolvi: true, situacaoNaoResolvi: true, situacaoAcertei: true, situacaoErrei: true
        };

        function getAdvancedFilterState() {
            try {
                const saved = JSON.parse(localStorage.getItem(ADVANCED_FILTER_KEY) || 'null');
                if (saved && typeof saved === 'object') return { ...ADVANCED_FILTER_DEFAULT, ...saved };
            } catch (_) { /* estado corrompido — cai no padrão */ }
            return { ...ADVANCED_FILTER_DEFAULT };
        }

        function saveAdvancedFilterState(state) {
            try { localStorage.setItem(ADVANCED_FILTER_KEY, JSON.stringify(state)); }
            catch (_) { /* armazenamento indisponível — segue sem persistir */ }
        }

        // getQuestionTypeCategory/applyAdvancedFilter em si (a lógica pura)
        // vêm de shared/question-filters.js via window.* — ver comentário
        // acima de getInternatoFilteredQuestions. Mantidas com o mesmo
        // nome aqui só pra não precisar tocar cada chamada existente.
        function getQuestionTypeCategory(question) {
            return window.getQuestionTypeCategory(question);
        }

        function applyAdvancedFilter(questions) {
            return window.applyAdvancedFilter(questions, getAdvancedFilterState(), getReviewQueue());
        }

        function openAdvancedFilter() {
            const overlay = document.getElementById('advancedFilterOverlay');
            if (!overlay) return;
            const state = getAdvancedFilterState();
            overlay.querySelectorAll('input[data-filter-key]').forEach(input => {
                input.checked = !!state[input.dataset.filterKey];
            });
            overlay.hidden = false;
        }

        function closeAdvancedFilter() {
            document.getElementById('advancedFilterOverlay')?.setAttribute('hidden', '');
        }

        function onAdvancedFilterToggle(input) {
            const key = input.dataset.filterKey;
            const group = ADVANCED_FILTER_GROUPS.tipo.includes(key) ? ADVANCED_FILTER_GROUPS.tipo : ADVANCED_FILTER_GROUPS.situacao;
            const overlay = document.getElementById('advancedFilterOverlay');
            const state = getAdvancedFilterState();
            // Não deixa desligar o último interruptor ligado do grupo —
            // "Obrigatório" quer dizer que sempre precisa sobrar pelo
            // menos um critério ativo, senão o filtro não devolve nada.
            const otherKeysOn = group.filter(k => k !== key).some(k => state[k]);
            if (!input.checked && !otherKeysOn) {
                input.checked = true;
                return;
            }
            state[key] = input.checked;
            saveAdvancedFilterState(state);
            updateAdvancedFilterBadge();
            updateQuestionConfigAvailableCount();
        }

        function resetAdvancedFilter() {
            saveAdvancedFilterState({ ...ADVANCED_FILTER_DEFAULT });
            const overlay = document.getElementById('advancedFilterOverlay');
            overlay?.querySelectorAll('input[data-filter-key]').forEach(input => {
                input.checked = !!ADVANCED_FILTER_DEFAULT[input.dataset.filterKey];
            });
            updateAdvancedFilterBadge();
            updateQuestionConfigAvailableCount();
        }

        function updateAdvancedFilterBadge() {
            const badge = document.getElementById('advancedFilterBadge');
            if (!badge) return;
            const state = getAdvancedFilterState();
            const isDefault = Object.keys(ADVANCED_FILTER_DEFAULT).every(key => state[key] === ADVANCED_FILTER_DEFAULT[key]);
            const offCount = Object.values(state).filter(value => !value).length;
            badge.hidden = isDefault;
            badge.textContent = String(offCount);
        }

        // Mostra, no rodapé da caixa de filtros, quantas questões o
        // recorte atual (Guiado/Simulado/Internato) realmente tem —
        // recalculado a cada mudança de filtro, antes de aplicar o
        // slider de quantidade.
        function updateQuestionConfigAvailableCount() {
            const el = document.getElementById('questionConfigAvailable');
            if (!el) return;
            const total = getFilteredQuestionsForConfig(activeQuestionConfigMode).length;
            el.textContent = total === 1 ? '1 questão disponível com esse filtro' : `${total} questões disponíveis com esse filtro`;
        }

        function getConfiguredQuestionSet() {
            const mode = activeQuestionConfigMode;
            const questions = getFilteredQuestionsForConfig(mode);
            if (mode === 'full-exam') return questions;
            const count = Number(document.getElementById('questionConfigCount')?.value || 12);
            if (mode === 'exam') return selectExamQuestions(questions, count);
            const searchActive = !!document.getElementById('questionConfigSearch')?.value.trim();
            return selectStudyQuestions(questions, count, searchActive);
        }

        // pdf-lib + fontkit + pdf-export.js somam 1,25MB e só servem no
        // momento em que alguém baixa um PDF — não fazem sentido no
        // carregamento inicial do app. Carregados sob demanda, uma única
        // vez (chamadas seguintes reaproveitam a mesma promise/resultado).
        let pdfLibsLoadingPromise = null;
        function loadScriptOnce(src) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
                document.head.appendChild(script);
            });
        }
        // Ponto único de bloqueio de PDF no modo visitante — os três
        // fluxos que exportam PDF (Questões configuradas, resultado de
        // sessão, Rapid Review) passam todos por aqui antes de gerar
        // qualquer coisa, então travar aqui cobre os três de uma vez.
        function ensurePdfLibsLoaded() {
            if (window.isGuestMode) return Promise.reject(new Error('GUEST_PDF_BLOCKED'));
            if (window.TryckPdf) return Promise.resolve();
            if (!pdfLibsLoadingPromise) {
                pdfLibsLoadingPromise = loadScriptOnce('vendor/pdf-lib.min.js')
                    .then(() => loadScriptOnce('vendor/fontkit.umd.min.js'))
                    .then(() => loadScriptOnce('pdf-export.js'))
                    .catch(error => { pdfLibsLoadingPromise = null; throw error; });
            }
            return pdfLibsLoadingPromise;
        }
        function pdfErrorNotice(err, fallback) {
            return err?.message === 'GUEST_PDF_BLOCKED'
                ? 'Exportar PDF exige login. Crie uma conta pra liberar isso e salvar seu progresso.'
                : fallback;
        }

        // question-explanations.js (829KB) só importa pra quem chega a
        // responder uma questão — mutando question.explanation direto nos
        // itens de window.TRYCKTRACK_QUESTION_BANK já carregado. Chamado
        // de dois jeitos: como prefetch silencioso ao abrir Questões/
        // Trilhas (mudarPagina) e, de forma garantida, antes de qualquer
        // sessão de questões realmente começar — se o prefetch já tiver
        // terminado (caso comum), essa segunda chamada não espera nada.
        let questionExplanationsLoadingPromise = null;
        function ensureQuestionExplanationsLoaded() {
            if (window.TRYCKTRACK_QUESTION_EXPLANATIONS) return Promise.resolve();
            if (!questionExplanationsLoadingPromise) {
                questionExplanationsLoadingPromise = loadScriptOnce('question-explanations.js')
                    .catch(error => { questionExplanationsLoadingPromise = null; throw error; });
            }
            return questionExplanationsLoadingPromise;
        }

        // Mesmo padrão acima, pro banco do Internato — question-
        // explanations-internato.js (extraído de questions-internato.js,
        // que sozinho pesava 5,84MB no boot: 3,01MB eram só o campo
        // explanation, útil somente depois que a pessoa responde).
        // Função separada (não reaproveita ensureQuestionExplanationsLoaded)
        // porque muta um banco diferente e tem sua própria flag de "já
        // carregou" — os dois arquivos podem chegar em paralelo quando a
        // Revisão espaçada devolve questões dos dois bancos juntas.
        let internatoExplanationsLoadingPromise = null;
        function ensureInternatoExplanationsLoaded() {
            if (window.TRYCKTRACK_INTERNATO_QUESTION_EXPLANATIONS) return Promise.resolve();
            if (!internatoExplanationsLoadingPromise) {
                internatoExplanationsLoadingPromise = loadScriptOnce('question-explanations-internato.js')
                    .catch(error => { internatoExplanationsLoadingPromise = null; throw error; });
            }
            return internatoExplanationsLoadingPromise;
        }

        function escapeQuestionPdfText(value) {
            return String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
        }

        function setPdfDownloadProgress(element, progress, active = true) {
            if (!element) return;
            const value = Math.max(0, Math.min(100, Math.round(progress)));
            element.style.setProperty('--pdf-progress', `${value}%`);
            element.setAttribute('aria-valuenow', String(value));
            element.classList.toggle('is-active', active);
        }

        function beginPdfDownloadProgress(element) {
            setPdfDownloadProgress(element, 0, true);
        }

        function waitForPdfProgressPaint() {
            return new Promise(resolve => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve)));
        }

        function stopPdfDownloadProgressWhenPrinted(element) {
            if (!element) return;
            window.addEventListener('afterprint', () => {
                window.setTimeout(() => setPdfDownloadProgress(element, 100, false), 900);
            }, { once: true });
        }


        async function downloadConfiguredQuestionPdf(withAnswers) {
            const mode = activeQuestionConfigMode;
            if (!['practice', 'exam', 'full-exam', 'internato'].includes(mode)) return;
            const progress = document.getElementById('questionPdfProgress');
            beginPdfDownloadProgress(progress);
            const questions = getConfiguredQuestionSet();
            if (!questions.length) {
                setPdfDownloadProgress(progress, 0, false);
                revealQuestionNotice('Não há questões para os filtros selecionados.');
                return;
            }
            const title = mode === 'full-exam' ? (questions[0].examName || 'Imersão') : mode === 'internato' ? 'Internato' : (mode === 'exam' ? 'Simulado' : 'Guiado');
            // "Com gabarito" imprime a explicação de cada questão — pro
            // Internato ela só chega depois de question-explanations-
            // internato.js (ver M-1: extraído de questions-internato.js
            // pra não pesar 3MB no boot de quem nunca abre esse modo).
            if (mode === 'internato' && withAnswers) await ensureInternatoExplanationsLoaded().catch(() => {});
            try {
                setPdfDownloadProgress(progress, 15, true);
                await ensurePdfLibsLoaded();
                setPdfDownloadProgress(progress, 40, true);
                // Com gabarito: mesmo layout com caixa lavanda do resultado de
                // sessão (questão + explicação intercaladas no Guiado/Imersão;
                // gabarito resumido + explicações em bloco no Simulado). Sem
                // gabarito: a prova em branco, para responder antes de conferir.
                const bytes = withAnswers
                    ? await TryckPdf.buildQuestionsResultPdf({ questions, answers: questions.map(q => q.answer), mode: mode === 'exam' ? 'exam' : 'practice', title })
                    : await TryckPdf.buildQuestionsPdf({ questions, title, includeAnswer: false });
                setPdfDownloadProgress(progress, 96, true);
                await waitForPdfProgressPaint();
                const fileTitle = title.replace(/[^\p{L}\p{N}]+/gu, '-');
                const suffix = withAnswers ? '-gabarito' : '';
                TryckPdf.downloadBytes(bytes, `trycktrack-${fileTitle}${suffix}.pdf`);
                setPdfDownloadProgress(progress, 100, false);
            } catch (err) {
                console.error('Falha ao gerar PDF de questões', err);
                setPdfDownloadProgress(progress, 0, false);
                revealQuestionNotice(pdfErrorNotice(err, 'Não foi possível gerar o PDF. Tente novamente.'));
            }
        }

        async function downloadQuestionSessionResultPdf(session) {
            if (!session || !session.questions?.length) return;
            revealQuestionNotice('Gerando PDF...');
            try {
                await ensurePdfLibsLoaded();
                const title = session.mode === 'exam' ? 'Simulado' : 'Guiado';
                const bytes = await TryckPdf.buildQuestionsResultPdf({
                    questions: session.questions, answers: session.answers, mode: session.mode, title,
                });
                const fileTitle = title.replace(/[^\p{L}\p{N}]+/gu, '-');
                TryckPdf.downloadBytes(bytes, `trycktrack-resultado-${fileTitle}.pdf`);
            } catch (err) {
                console.error('Falha ao gerar PDF do resultado', err);
                revealQuestionNotice(pdfErrorNotice(err, 'Não foi possível gerar o PDF do resultado. Tente novamente.'));
            }
        }

        function updateQuestionCountSlider(el) {
            const min = Number(el.min) || 1;
            const max = Number(el.max) || 100;
            const pct = ((Number(el.value) - min) / (max - min)) * 100;
            el.style.setProperty('--range-pct', `${pct}%`);
            const label = document.getElementById('questionConfigCountValue');
            if (label) label.textContent = el.value;
        }

        function openQuestionConfig(mode) {
            activeQuestionConfigMode = mode;
            document.querySelectorAll('.question-mode').forEach(item => item.classList.toggle('active', item.dataset.questionMode === mode));
            const view = document.getElementById('questionConfigView');
            const body = document.getElementById('questionConfigBody');
            const kicker = document.getElementById('questionConfigKicker');
            const title = document.getElementById('questionConfigTitle');
            const description = document.getElementById('questionConfigDescription');
            const start = document.getElementById('questionConfigStart');
            if (!view || !body || !title || !description || !start) return;

            const config = {
                practice: { title: 'Guiado', description: 'Escolha a área e o número de questões. Você verá a correção após cada resposta.', button: 'Começar prática' },
                exam: { title: 'Simulado', description: 'Monte uma sessão com tempo e resultado liberado somente ao finalizar.', button: 'Começar simulado' },
                osce: { title: 'OSCE', description: 'Selecione o foco da estação e treine a sequência clínica com checklist.', button: 'Iniciar estação' },
                'full-exam': { title: 'Imersão', description: 'Escolha uma edição do Revalida e responda a prova completa em uma única sessão.', button: 'Começar prova' },
                internato: activeInternatoMode === 'exam'
                    ? { title: 'Internato', description: 'Só as questões das provas aplicadas no seu internato, em formato de prova: resultado liberado somente ao finalizar.', button: 'Começar simulado' }
                    : { title: 'Internato', description: 'Só as questões das provas aplicadas no seu internato. Você verá a correção após cada resposta.', button: 'Começar prática' }
            }[mode];
            kicker.textContent = mode === 'full-exam' ? 'Simulado oficial' : 'Configuração da modalidade';
            title.textContent = config.title;
            description.textContent = config.description;
            start.textContent = config.button;
            const pdfAction = document.getElementById('questionPdfAction');
            const internatoEmpty = mode === 'internato' && !getActiveQuestionBank().length;
            if (pdfAction) pdfAction.hidden = internatoEmpty || !['practice', 'exam', 'full-exam', 'internato'].includes(mode);

            if (mode === 'full-exam') {
                const exams = questionExamOptions();
                body.innerHTML = `<div class="question-config-fields"><div class="question-config-field"><label for="questionConfigExam">Edição da prova</label><select id="questionConfigExam">${exams.map(exam => `<option value="${escapeHtml(exam.id)}">${escapeHtml(exam.name)}</option>`).join('')}</select></div></div>`;
            } else if (mode === 'osce') {
                body.innerHTML = `<div class="osce-mode-choice" role="group" aria-label="Modo OSCE"><button type="button" class="active" data-osce-mode="CANDIDATE" onclick="selectOsceMode(this)">Avaliando</button><button type="button" data-osce-mode="EVALUATOR" onclick="selectOsceMode(this)">Avaliador</button></div><div class="question-config-fields">
                    <div class="question-config-divider">Assunto</div>
                    <div class="question-config-field osce-step" id="osceAreaStep"><label for="questionConfigArea">Rotação</label><select id="questionConfigArea" onchange="loadOsceStations()"><option value="">Selecione a rotação</option></select></div>
                    <div class="question-config-field osce-step" id="osceThemeStep" hidden><label for="questionConfigTheme">Tópico</label><select id="questionConfigTheme" onchange="loadOsceStations()" disabled><option value="">Selecione o tópico</option></select></div>
                    <div class="question-config-field osce-step" id="osceSubthemeStep" hidden><label for="questionConfigSubtheme">Tema</label><select id="questionConfigSubtheme" onchange="loadOsceStations()" disabled><option value="">Selecione o tema</option></select></div>
                    <div class="question-config-divider">Formato</div>
                    <div class="question-config-field osce-step" id="osceFormatStep" hidden><label for="questionConfigFormat">Formato da estação</label><select id="questionConfigFormat" onchange="loadOsceStations()" disabled><option value="">Selecione o formato</option></select></div>
                    <select id="questionConfigStation" hidden><option value="">Nenhuma estação carregada</option></select>
                    <div class="question-config-divider">Estação</div>
                    <div class="osce-station-status" id="osceStationStatus" role="status" aria-live="polite"><strong>Matriz OSCE</strong>Escolha uma rotação para começar.</div>
                    <div class="question-config-field osce-step osce-ai-step" id="osceAiStep" hidden><button type="button" class="osce-ai-generate-btn" id="osceAiGenerateBtn" onclick="generateOsceStationWithAI()"><span class="osce-ai-generate-icon">✨</span><span>Gerar estação com IA</span></button><span class="osce-ai-hint">Cria um caso clínico inédito para essa combinação, gerado com IA (Groq).</span><div class="osce-library-picker" id="osceLibraryPicker" hidden><label for="osceLibrarySelect">Ou escolha uma estação já gerada por outra pessoa</label><select id="osceLibrarySelect"></select><button type="button" class="osce-library-use-btn" onclick="useOsceLibraryStation()">Usar esta estação</button></div></div>
                </div>`;
                activeOsceMode = 'CANDIDATE';
                loadOsceStations();
            } else if (mode === 'internato' && !getActiveQuestionBank().length) {
                // Banco isolado ainda vazio (nenhuma prova de internato
                // importada) — mostra o mesmo aviso usado em outras áreas
                // sem questões, em vez de uma tela de filtros sem nada
                // pra filtrar.
                body.innerHTML = `<div class="question-coming visible">Ainda não há questões cadastradas aqui — assim que as provas do seu internato forem adicionadas, elas aparecem neste modo.</div>`;
                start.hidden = true;
            } else if (mode === 'internato') {
                start.hidden = false;
                // Rotação/Tópico/Tema vêm da MESMA matriz curricular do
                // OSCE (OSCE_CURRICULUM_MATRIX) — área vira Rotação, o
                // código A/B do tema vira Tópico, e os subtemas viram
                // Tema. Já mostra a árvore inteira mesmo antes de
                // qualquer prova importada; só o Semestre continua
                // vindo do banco de fato (não existe na matriz do OSCE).
                const rodizios = OSCE_CURRICULUM_MATRIX.map(area => area.name);
                const topicos = osceThemeCodes();
                const semestres = internatoFieldOptions('semestre');
                body.innerHTML = `<div class="osce-mode-choice" role="group" aria-label="Modo do Internato"><button type="button" class="${activeInternatoMode === 'exam' ? '' : 'active'}" data-internato-mode="practice" aria-pressed="${activeInternatoMode !== 'exam'}" onclick="selectInternatoMode(this)">Guiado</button><button type="button" class="${activeInternatoMode === 'exam' ? 'active' : ''}" data-internato-mode="exam" aria-pressed="${activeInternatoMode === 'exam'}" onclick="selectInternatoMode(this)">Simulado</button></div><div class="question-config-fields">
                    <div class="question-config-divider">Conteúdo</div>
                    <div class="question-config-field"><label for="questionConfigSearch">Buscar</label><input type="search" id="questionConfigSearch" placeholder="Ex.: síndrome de Guillain-Barré" oninput="updateQuestionConfigAvailableCount()"></div>
                    <div class="question-config-field"><label for="questionConfigRodizio">Rotação</label><select id="questionConfigRodizio" onchange="updateInternatoTemas()"><option value="Todos">Todos</option>${rodizios.map(item => `<option value="${item}">${item}</option>`).join('')}</select></div>
                    <div class="question-config-field"><label for="questionConfigTopico">Tópico</label><select id="questionConfigTopico" onchange="updateInternatoTemas()"><option value="Todos">Todos</option>${topicos.map(item => `<option value="${item}">${item}</option>`).join('')}</select></div>
                    <div class="question-config-field"><label for="questionConfigTema">Tema</label><select id="questionConfigTema" onchange="updateQuestionConfigAvailableCount()"><option value="Todos">Todos</option></select></div>
                    <div class="question-config-divider">Período</div>
                    <div class="question-config-field"><label for="questionConfigSemestre">Semestre</label><select id="questionConfigSemestre" onchange="updateQuestionConfigAvailableCount()"><option value="Todos">Todos</option>${semestres.map(item => `<option value="${item}">${item}</option>`).join('')}</select></div>
                    <div class="question-config-divider">Quantidade</div>
                    <div class="question-config-field question-config-field-slider">
                        <label for="questionConfigCount">Número de questões <span class="question-config-slider-value" id="questionConfigCountValue">12</span></label>
                        <input type="range" class="question-config-slider" id="questionConfigCount" min="1" max="100" value="12" step="1" style="--range-pct:11.11%" oninput="updateQuestionCountSlider(this)">
                        <span class="question-config-slider-hint">As questões serão escolhidas aleatoriamente.</span>
                    </div>
                    <button type="button" class="question-config-advanced-btn" onclick="openAdvancedFilter()"><span>Filtros Avançados</span><span class="question-config-advanced-badge" id="advancedFilterBadge" hidden>0</span></button>
                    <div class="question-config-available" id="questionConfigAvailable" role="status" aria-live="polite"></div>
                </div>`;
                updateInternatoTemas();
                updateAdvancedFilterBadge();
            } else {
                start.hidden = false;
                const themes = questionThemeOptions();
                const years = questionYearOptions();
                const sources = questionSourceOptions();
                body.innerHTML = `<div class="question-config-fields">
                    <div class="question-config-divider">Conteúdo</div>
                    <div class="question-config-field"><label for="questionConfigSearch">Buscar</label><input type="search" id="questionConfigSearch" placeholder="Ex.: síndrome de Guillain-Barré" oninput="updateQuestionConfigAvailableCount()"></div>
                    <div class="question-config-field"><label for="questionConfigTheme">Área</label><select id="questionConfigTheme" onchange="updateQuestionConfigTemas()"><option value="Todas">Todos</option>${themes.map(item => `<option value="${item}">${item}</option>`).join('')}</select></div>
                    <div class="question-config-field"><label for="questionConfigTema">Tema</label><select id="questionConfigTema" onchange="updateQuestionConfigSubtemas()"><option value="Todos">Todos</option></select></div>
                    <div class="question-config-field"><label for="questionConfigSubtema">Subtema</label><select id="questionConfigSubtema" onchange="updateQuestionConfigAvailableCount()"><option value="Todos">Todos</option></select></div>
                    <div class="question-config-divider">Filtros</div>
                    <div class="question-config-field"><label for="questionConfigInstitution">Instituição</label><select id="questionConfigInstitution" onchange="updateQuestionConfigAvailableCount()"><option value="Todas">Todas</option>${sources.map(item => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join('')}</select></div>
                    <div class="question-config-field"><label for="questionConfigYear">Ano</label><select id="questionConfigYear" onchange="updateQuestionConfigAvailableCount()"><option value="Todos">Todos</option>${years.map(item => `<option value="${item}">${item}</option>`).join('')}</select></div>
                    <div class="question-config-divider">Quantidade</div>
                    <div class="question-config-field question-config-field-slider">
                        <label for="questionConfigCount">Número de questões <span class="question-config-slider-value" id="questionConfigCountValue">12</span></label>
                        <input type="range" class="question-config-slider" id="questionConfigCount" min="1" max="100" value="12" step="1" style="--range-pct:11.11%" oninput="updateQuestionCountSlider(this)">
                        <span class="question-config-slider-hint">As questões serão escolhidas aleatoriamente.</span>
                    </div>
                    <button type="button" class="question-config-advanced-btn" onclick="openAdvancedFilter()"><span>Filtros Avançados</span><span class="question-config-advanced-badge" id="advancedFilterBadge" hidden>0</span></button>
                    <div class="question-config-available" id="questionConfigAvailable" role="status" aria-live="polite"></div>
                </div>`;
                updateQuestionConfigTemas();
                updateAdvancedFilterBadge();
            }
            view.hidden = false;
            view.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function closeQuestionConfig() {
            activeQuestionConfigMode = null;
            document.getElementById('questionConfigView')?.setAttribute('hidden', '');
            document.querySelectorAll('.question-mode').forEach(item => item.classList.remove('active'));
        }

        let activeOsceMode = 'CANDIDATE';
        // Catálogo curricular completo do OSCE (mesmas área/tema/subtema/
        // formato do backend, em backend/src/osceMatrix.js) — usado para a
        // pessoa escolher QUALQUER assunto e gerar uma estação nova com IA,
        // mesmo sem nenhuma estação estática cadastrada para ele ainda.
        const OSCE_CURRICULUM_MATRIX = [{"name":"Atenção Primária à Saúde","slug":"atencao-primaria-a-saude","themes":[{"code":"A","subthemes":[{"name":"Saúde e doença (prevenção primária, secundária, terceária e quarternária e modelos do processo saúde e doença) + Sistema de Saúde Suplementar - Agência Nacional de Saúde Suplementar.","slug":"a-1"},{"name":"Ética médica (Princípios e diretrizes do código de ética médica e sua aplicação).","slug":"a-2"},{"name":"Sistema Único de Saúde - SUS + Leis Orgânicas de Saúde (diretrizes do SUS, lei 8080 e lei 8142).","slug":"a-3"},{"name":"Dinâmica de transmissão e distribuição de doenças e Vigilância em Saúde com ênfase em Vigilância epidemiológica (Doenças de notificação compulsoria no Brasil, SINAN e Ficha de Notificação de agravo - preenchimento e fluxo de informação, Vigilâcia Epidemiológica - conceito, importancia e atuação).","slug":"a-4"},{"name":"Transição epidemiológica, demográfica e nutricional.","slug":"a-5"},{"name":"Aspectos biológicos e fisiologia do envelhecimento (diferença entre senilidade e senescência e suas implicações clínicas, envelhecimento saudável)","slug":"a-6"},{"name":"Avaliacao global do Idoso (exame físico do idoso, MEEM, Escala de Depressão Geriatrica, e outras ferramentas de avaliação).","slug":"a-7"},{"name":"Instabilidade postural e quedas (critérios diagnósticos, manifestações clínicas e os métodos de avaliação para a instabilidade postural em idosos e fatores de risco para quedas.).","slug":"a-8"},{"name":"Violência e maus-tratos contra os idosos.","slug":"a-9"},{"name":"Sindrome Gripal (conceito da síndrome gripal, características clínicas e diagnosticos diferenciais e plano terapeutico.).","slug":"a-10"},{"name":"Rastreamento de doenças na APS I (foco em neoplasias: colo de útero, mama, próstata, colorretal).","slug":"a-11"},{"name":"Rastreamento de doenças na APS II (foco em HAS, DM, Dislipidemia, Obesidade).","slug":"a-12"}]},{"code":"B","subthemes":[{"name":"Atenção Primária à Saúde e Estratégia de Saúde da Família (Promoção à saúde, Atributos da APS, composição e atribuições da equipe de SF.).","slug":"b-1"},{"name":"Medicina de Família e Comunidade e Programa Mais Médicos.","slug":"b-2"},{"name":"Análise de métodos diagnósticos e Estudos epidemiológicos (Sensibilidade, especificidade, valor preditivo positivo e negativo, prevalência e incidência.).","slug":"b-3"},{"name":"Medicina legal (principais documentos médicos).","slug":"b-4"},{"name":"Medicina baseada em evidências, revisão sistemática e meta-análise.","slug":"b-5"},{"name":"Visitas Domiciliares e Atenção Domiciliar na ESF.","slug":"b-6"},{"name":"Complexidade e Integralidade na APS e DCNT.","slug":"b-7"},{"name":"DM e HAS Centrada na Pessoa.","slug":"b-8"},{"name":"Violência e maus-tratos contra a criança e a adolescente.","slug":"b-9"},{"name":"Vacinação (indicações, contra-indicações, efeitos adversos, faixa etária).","slug":"b-10"},{"name":"Violência Sexual e Autoprovocada + Doencas de notificação compulsória.","slug":"b-11"},{"name":"Saúde do Trabalhador + CAT.","slug":"b-12"}]}]},{"name":"Cirurgia","slug":"cirurgia","themes":[{"code":"A","subthemes":[{"name":"Abdome agudo inflamatório e suas complicações (apendicite, colicistite, diverticulite)","slug":"a-1"},{"name":"Hérnias de Parede Abdominal","slug":"a-2"},{"name":"Complicações e cuidados pós-operatórias; Infecção em cirurgia - Hematoma - Seroma - Deiscência - Evisceração.","slug":"a-3"},{"name":"Resposta endócrino metabólica ao trauma","slug":"a-4"},{"name":"Cuidados pré-operatórios; Risco cirúrgico (ASA - Goldman)","slug":"a-5"},{"name":"Afecções hepáticas: diagnósgtico/tratamento/complicações (Hipertensão portal; nódulos e abcessos hepáticos;)","slug":"a-6"},{"name":"Afecções da árvore biliar: colecistolitíase, coledocolitíase, íleo biliar, colangiocarcinoma","slug":"a-7"},{"name":"Afecções do pâncreas (Pancreatite aguda e crônica, pseudocisto, neoplasias císticas, adenocarcinoma): diagnóstico/tratamento/complicações","slug":"a-8"},{"name":"Câncer de cólon e reto (Diagnóstico clinico, laboratorial, radiologico e Condução clínica.","slug":"a-9"},{"name":"Condutas intervencionistas em derrame pleural Toracocentese","slug":"a-10"},{"name":"Tipos de fios, suturas e feridas.","slug":"a-11"},{"name":"Doenças orificiais: Doença hemorroidária, fissura anal, fístula anal, abscesso anorretal","slug":"a-12"}]},{"code":"B","subthemes":[{"name":"ATLS- Aspectos históricos, exame primário e secundário, fase de cada um dos exames, aspectos intervencionistas no exameprimário e secundário","slug":"b-1"},{"name":"Cicatrização","slug":"b-2"},{"name":"Via áerea cirurgica","slug":"b-3"},{"name":"Trauma torácico (Pneumotórax aberto, fechado e hipertensivo, hemotórax, contusão pulmonar, tórax instável e tamponamento cardíaco)","slug":"b-4"},{"name":"Trauma abdominal e pélvico","slug":"b-5"},{"name":"Acesso venoso central","slug":"b-6"},{"name":"Queimaduras / síndrome compartimental","slug":"b-7"},{"name":"DAOP + Obstrução arterial aguda; Aneurisma de aorta","slug":"b-8"},{"name":"Insuficiência venosa crônica; Trombose Venosa Profunda - TVP","slug":"b-9"},{"name":"Noções de anestesia periférica","slug":"b-10"},{"name":"Urgências urológicas: Torção testicular, priapismo, urolitíase e orquiedpidimite","slug":"b-11"},{"name":"Abdome agudo em pediatria: intussuscepção, vólvulo, má rotação intestinal","slug":"b-12"}]}]},{"name":"Clínica Médica","slug":"clinica-medica","themes":[{"code":"A","subthemes":[{"name":"Asma e DPOC (Exame físico e exames complementares, incluindo espirometria, Tratamento da DPOC pelo ABE do GOLD, tratamento da exacerbação)","slug":"a-1"},{"name":"Diabetes mellitus - Classificação, diagnóstico, tratamento e complicações","slug":"a-2"},{"name":"Dengue, Zika, Chikungunya e Febre Amarela","slug":"a-3"},{"name":"Doenças do Pericárdio, Miocardites e Endocardites","slug":"a-4"},{"name":"HIV e Criptococosse","slug":"a-5"},{"name":"Cirrose e complicações (PBE, Asciste, Encefalopatia hepática, Síndrome hepatorrenal)","slug":"a-6"},{"name":"Doenças Eritematodescamativas (Psoríase, Dermatite Atópica)","slug":"a-7"},{"name":"Injúria Renal Aguda e Doença Renal Crônica","slug":"a-8"},{"name":"Doenças Tubulointersticiais e Glomerulares","slug":"a-9"},{"name":"Infecção de Trato Urinário, Nefrolitíase","slug":"a-10"},{"name":"Síndrome metabólica e dislipidemias","slug":"a-11"},{"name":"Doenças da hipófise e da tireóide - Rastreio de nódulos tireóidianos","slug":"a-12"}]},{"code":"B","subthemes":[{"name":"Insuficiencia cardíaca e valvopatias","slug":"b-1"},{"name":"Hipertensão arterial sistêmica, Emergências Hipertensivas, Encefalopatia hipertensiva, Crise hipertensiva, Conceitos fundamentais e condução clínica","slug":"b-2"},{"name":"Cefaleia na urgência / Principais cefaleias primárias: Cefaleia tensional, enxaqueca e cefaleias em salva","slug":"b-3"},{"name":"Tuberculose e Hanseníase (epidemiologia, fatores de risco, características do bacilo de koch, mecanismos de infecção e latência, tuberculose extrapulmonar, prevenção e controle, propedêutica clínica, diagnóstico e tratamento).","slug":"b-4"},{"name":"DRGE e Dispepsia (Dispepsia funcional, gastrites - incluindo quadro clínico, fisiopatologia, diagnóstico e tratamento)","slug":"b-5"},{"name":"Doenças inflamatórias intestinais (doença de crohn, retocolite ulcerativa)","slug":"b-6"},{"name":"Hemoragias digestivas (alta, média e baixa)","slug":"b-7"},{"name":"TVP e Tromboembolismo pulmonar (fatores de risco, exames complementares, tratamento e profilaxia)","slug":"b-8"},{"name":"Anemias (carenciais, hemolíticas e de doença crônica)","slug":"b-9"},{"name":"Neoplasias Hematológicas (Linfoma e Leucemia - Avaliação inicial e triagem laboratorial)","slug":"b-10"},{"name":"Pneumonias Bacterianas, virais e atípicas.","slug":"b-11"},{"name":"Poliartrites: Artrite Reumatóiide e Osteoartrite","slug":"b-12"}]}]},{"name":"Ginecologia e Obstetrícia","slug":"ginecologia-e-obstetricia","themes":[{"code":"A","subthemes":[{"name":"Assistência pré-natal","slug":"a-1"},{"name":"O parto: assistência clínica, mecanismos, períodos e manobras","slug":"a-2"},{"name":"Amenorreia primária e secundária","slug":"a-3"},{"name":"Síndrome dos ovários policísticos","slug":"a-4"},{"name":"Neoplasias mamárias e rastreio","slug":"a-5"},{"name":"Incontinência urinária e distopias genitais","slug":"a-6"},{"name":"Climatério","slug":"a-7"},{"name":"Pré-natal de alto risco (Diabetes e Gemelaridade)","slug":"a-8"},{"name":"Prematuridade (Trabalho de parto prematuro, amniorr​​exe prematura)","slug":"a-9"},{"name":"Restrição de crescimento fetal intrauterino (CIUR)","slug":"a-10"},{"name":"Infecções na gestação (Toxoplasmose, Citomegalovirus, Rubéola, Herpes e Sífilis)","slug":"a-11"},{"name":"Modificações locais e sistêmicas no organismo materno na gravidez","slug":"a-12"}]},{"code":"B","subthemes":[{"name":"Anticoncepção","slug":"b-1"},{"name":"HPV, neoplasias cervicais e rastreio","slug":"b-2"},{"name":"Doença inflamatória pélvica","slug":"b-3"},{"name":"Sangramento Uterino Anormal","slug":"b-4"},{"name":"Endometriose","slug":"b-5"},{"name":"Vulvovaginites, cervicites (Cândidiase, tricomoníase, vaginose bacteriana, vaginite atrófica - incluir tratamento na gestante)","slug":"b-6"},{"name":"Infecções sexualmente transmissíveis ( sífilis, herpes genital, cancro mole, gonorreia, linfogranuloma venéreo, donovanose)","slug":"b-7"},{"name":"Síndromes hipertensivas da gestação (Pré-Eclâmpsia , Pré-Eclâmpsia superposta, Eclâmpsia, Hipertensão crônica e gestacional)","slug":"b-8"},{"name":"Vitalidade fetal - Cardiotocografia e ultrassonografias na gestação","slug":"b-9"},{"name":"Sangramentos de primeira metade da gestação (gravidez ectópica, gravidez molar, abortamento)","slug":"b-10"},{"name":"Sangramentos de segunda metade da gestação (descolamento prematuro de placenta, placenta prévia, rotura uterina, vasa prévia)","slug":"b-11"},{"name":"Puerpério","slug":"b-12"}]}]},{"name":"Pediatria","slug":"pediatria","themes":[{"code":"A","subthemes":[{"name":"Imunizações","slug":"a-1"},{"name":"Diarréia aguda e desidratação. Parasitose.","slug":"a-2"},{"name":"Aleitamento materno, introdução alimentar e alergia alimentar.","slug":"a-3"},{"name":"Infecções congênitas: toxoplasmose, rubéola, sífilis, citomegalovírus, herpes simples, Zika vírus.","slug":"a-4"},{"name":"Icterícia neonatal","slug":"a-5"},{"name":"Assistência ao recem nascido na sala de parto > ou igual a 34 semanas","slug":"a-6"},{"name":"Anafilaxia. Dermatite atópica.","slug":"a-7"},{"name":"Infecção de vias aéreas superiores","slug":"a-8"},{"name":"Doenças exantemáticas (Sarampo, Rubéola, Eritema infeccioso, Exantema súbito, Mononucleose infecciosa, Varicela, Escarlatina, Doença de Kawasaki, Síndrome mão pé boca)","slug":"a-9"},{"name":"Infecção do trato urinário","slug":"a-10"},{"name":"Crescimento e desenvolvimento da criança até 5 anos.","slug":"a-11"},{"name":"GNDA e Síndrome nefrótica.","slug":"a-12"}]},{"code":"B","subthemes":[{"name":"Suporte básico e Suporte avançado de vida","slug":"b-1"},{"name":"Asma na criança + rinite alérgica","slug":"b-2"},{"name":"Meningites e meningoencefalites","slug":"b-3"},{"name":"Convulsões na criança","slug":"b-4"},{"name":"Pneumonia adquirida na comunidade/ Bronquiolite","slug":"b-5"},{"name":"TDAH e autismo","slug":"b-6"},{"name":"Patologias dermatológicas: impetigo/ectima, erisipela/celulite, foliculite/furunculose, síndrome da pele escaldada, estrófulo, escabiose, Tinea, Pitiríase alba, Pitiríase Versicolor e Molusco.","slug":"b-7"},{"name":"Anemias: anemia ferropriva, anemia megaloblástica e falciforme","slug":"b-8"},{"name":"Sepse em pediatria.(Reconhecer SEPSE, entender os conceitos e abordagem)","slug":"b-9"},{"name":"Febre reumática.","slug":"b-10"},{"name":"Crescimento e desenvolvimento puberal do adolescente (fisiologia da puberdade normal, exame físico e estadiamento puberal, diferenciar desenvolvimento puberal fisiológico do patológico, baseado nas alterações clínicas e exames complementares, síndrome da adolescencia normal).Puberdade precoce.","slug":"b-11"},{"name":"Febre sem sinais localizatórios","slug":"b-12"}]}]},{"name":"Urgência e Emergência / Saúde Mental","slug":"urgencia-e-emergencia-saude-mental","themes":[{"code":"A","subthemes":[{"name":"Suporte básico de vida e avançado: PALS e ACLS","slug":"a-1"},{"name":"Lesão renal aguda (Pré Renal, Renal e Pós Renal)","slug":"a-2"},{"name":"Psicopatologia e exame do estado mental- principais conceitos de psicopatologia, exame do estado mental, incluindo as manifestações clínicas nas principais desordens (esquizofrenia, transtornos afetivos e transtornos de ansiedade).","slug":"a-3"},{"name":"Sindrome respiratória aguda grave","slug":"a-4"},{"name":"Insuficiência respiratória (tipo I – hipoxêmica / tipo II – hipercápnica/ Mista)","slug":"a-5"},{"name":"Vias aéreas básica/ avançada (Extra glótica + Via aérea definitiva)","slug":"a-6"},{"name":"Cuidados paliativos e manejo da dor","slug":"a-7"},{"name":"Psicofarmacologia - antidepressivos (tricíclicos, inibidores da MAO, atípicos, moduladores de serotonina, Inibidores seletivos de recaptação de serotonina).","slug":"a-8"},{"name":"Emergências em Psiquiatria (tentativa de auto-extermínio, crise de ansiedade e surto psicótico)","slug":"a-9"},{"name":"Esquizofrenia e outros transtornos psicóticos (transtorno delirante, esquizoafetivo, psicótico)","slug":"a-10"},{"name":"Distúrbios do equilíbrio acidobásico","slug":"a-11"},{"name":"Intoxicações exógenas agudas","slug":"a-12"}]},{"code":"B","subthemes":[{"name":"Transtornos de Ansiedade (generalizada, pânico, fobias, TOC), Transtornos alimentares (bulimia, anorexia, compulsão)","slug":"b-1"},{"name":"Transtornos do humor (depressão maior, bipolar)","slug":"b-2"},{"name":"Choque septico e hipovolemico","slug":"b-3"},{"name":"Síndromes coronárianas agudas","slug":"b-4"},{"name":"Transtornos de personalidade (paranoide, esquizoide, antissocial, boderline, histriônica)","slug":"b-5"},{"name":"Insuficiencia cardíaca descompensada e Edema agudo pulmonar","slug":"b-6"},{"name":"Arritimias cardíacas","slug":"b-7"},{"name":"Transtornos mentais orgânicos (Delirium, Demência, Alzheimer, Parkinson)","slug":"b-8"},{"name":"Drogas vasoativas na urgência e emergência. Principais drogas vasoativas, Mecanismos de ação em receptores/doses/diluições, Vasopressores: Noradrenalina/Adrenalina/Vasopressina, Vasodilatadores:Nitroglicerina/Nitroprussiato de Sódio, Inotrópicos:Dobutamina/ Milrinone/ Levosimendan","slug":"b-9"},{"name":"Acidente com animais peçonhentos (ofídicos, aracnídeos, escorpiônicos) e Choque anafilático.","slug":"b-10"},{"name":"Cetoacidose diabética","slug":"b-11"},{"name":"AVE","slug":"b-12"}]}]}];
        const OSCE_CURRICULUM_FORMATS = ["ANAMNESE_FOCADA","EXAME_FISICO","RACIOCINIO_DIAGNOSTICO","CONDUTA","PROCEDIMENTO","COMUNICACAO","URGENCIA_EMERGENCIA","ESTACAO_COMPLETA"];

        let osceStationsCache = [];

        // A biblioteca local deixa o OSCE disponível no app publicado, no celular e offline.
        // O backend continua opcional para a futura versão com sincronização entre usuários.
        function findOsceCurriculumArea(areaSlug) {
            return OSCE_CURRICULUM_MATRIX.find(area => area.slug === areaSlug) || null;
        }

        function findOsceCurriculumSubtheme(areaSlug, themeCode, subthemeSlug) {
            const area = findOsceCurriculumArea(areaSlug);
            const theme = area?.themes.find(item => item.code === themeCode);
            return theme?.subthemes.find(item => item.slug === subthemeSlug) || null;
        }

        function normalizeLocalOsceStation(source, index) {
            const metadata = source?.metadata || {};
            const area = findOsceCurriculumArea(metadata.areaSlug);
            const subthemeEntry = findOsceCurriculumSubtheme(metadata.areaSlug, metadata.themeCode, metadata.subthemeSlug);
            const theme = `Tópico ${metadata.themeCode || ''}`.trim();
            const subtheme = subthemeEntry?.name || metadata.subthemeSlug || 'Subtema';
            const tasks = (source?.tasks || []).map(task => ({
                id: task.id,
                title: task.title || 'Tarefa da estação',
                instructions: task.candidateInstructions || task.instructions || '',
                checklist: task.checklist || [],
                answerKey: task.answerKey || ''
            }));
            return {
                id: source.externalId || `osce-local-${index + 1}`,
                area: area?.name || metadata.areaSlug || 'Área não informada',
                theme,
                subtheme,
                format: metadata.format || 'ESTACAO_COMPLETA',
                title: metadata.title || 'Estação OSCE',
                version: metadata.version || 1,
                timeLimitSeconds: Math.max(1, Number(metadata.estimatedMinutes || 8)) * 60,
                doorInstructions: source.doorInstructions || {},
                tasks,
                evaluatorContentJson: {
                    scenario: source.scenario || {},
                    patientScript: source.patientScript || {},
                    physicalExam: source.physicalExam || [],
                    complementaryTests: source.complementaryTests || [],
                    evolution: source.evolution || [],
                    tasks,
                    finalAnswer: source.finalAnswer || {}
                },
                isLocal: true
            };
        }

        function getLocalOsceStations() {
            const source = Array.isArray(window.TRYCKTRACK_OSCE_STATIONS) ? window.TRYCKTRACK_OSCE_STATIONS : [];
            return source.map(normalizeLocalOsceStation);
        }

        function stationById(id) {
            return osceStationsCache.find(station => station.id === id);
        }

        // Internato em dois modos: Guiado (correção a cada resposta) ou
        // Simulado (pode pular, resultado só no fim, aviso de em branco).
        let activeInternatoMode = 'practice';
        function selectInternatoMode(button) {
            activeInternatoMode = button.dataset.internatoMode === 'exam' ? 'exam' : 'practice';
            document.querySelectorAll('[data-internato-mode]').forEach(item => {
                const on = item === button;
                item.classList.toggle('active', on);
                item.setAttribute('aria-pressed', String(on));
            });
            const exam = activeInternatoMode === 'exam';
            document.getElementById('questionConfigDescription').textContent = exam
                ? 'Só as questões das provas aplicadas no seu internato, em formato de prova: resultado liberado somente ao finalizar.'
                : 'Só as questões das provas aplicadas no seu internato. Você verá a correção após cada resposta.';
            document.getElementById('questionConfigStart').textContent = exam ? 'Começar simulado' : 'Começar prática';
        }

        function selectOsceMode(button) {
            activeOsceMode = button.dataset.osceMode || 'CANDIDATE';
            document.querySelectorAll('[data-osce-mode]').forEach(item => item.classList.toggle('active', item === button));
        }

        function uniqueOsceValues(key, filters = {}) {
            return [...new Set(osceStationsCache.filter(station => Object.entries(filters).every(([field, value]) => !value || station[field] === value)).map(station => station[key]).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
        }

        function fillOsceSelect(id, values, placeholder) {
            const select = document.getElementById(id);
            if (!select) return;
            const current = select.value;
            select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>` + values.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('');
            if (values.includes(current)) select.value = current;
        }

        function setOsceStep(stepId, visible) {
            const step = document.getElementById(stepId);
            if (step) step.hidden = !visible;
        }

        function resetOsceSelect(id, placeholder) {
            const select = document.getElementById(id);
            if (!select) return;
            select.innerHTML = `<option value="">${placeholder}</option>`;
            select.value = '';
            select.disabled = true;
        }

        function truncateText(value, max) {
            const text = String(value || '');
            return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
        }

        // As opções vêm do catálogo curricular completo (OSCE_CURRICULUM_MATRIX),
        // não só do que já existe na biblioteca estática — assim dá para pedir
        // uma estação de IA sobre QUALQUER assunto do edital, mesmo sem nenhum
        // caso cadastrado ainda para ele.
        async function loadOsceStations() {
            const status = document.getElementById('osceStationStatus');
            if (!status || activeQuestionConfigMode !== 'osce') return;
            try {
                const areaSelect = document.getElementById('questionConfigArea');
                const themeSelect = document.getElementById('questionConfigTheme');
                const subthemeSelect = document.getElementById('questionConfigSubtheme');
                const formatSelect = document.getElementById('questionConfigFormat');
                if (!osceStationsCache.length) osceStationsCache = getLocalOsceStations();

                if (areaSelect.dataset.filled !== '1') {
                    areaSelect.innerHTML = '<option value="">Selecione a rotação</option>' + OSCE_CURRICULUM_MATRIX.map(area => `<option value="${area.slug}">${escapeHtml(area.name)}</option>`).join('');
                    areaSelect.dataset.filled = '1';
                }

                const areaSlug = areaSelect?.value || '';
                const themeCode = themeSelect?.value || '';
                const subthemeSlug = subthemeSelect?.value || '';
                const formatValue = formatSelect?.value || '';

                if (!areaSlug) {
                    setOsceStep('osceThemeStep', false); setOsceStep('osceSubthemeStep', false); setOsceStep('osceFormatStep', false); setOsceStep('osceAiStep', false);
                    resetOsceSelect('questionConfigTheme', 'Selecione o tópico'); resetOsceSelect('questionConfigSubtheme', 'Selecione o tema'); resetOsceSelect('questionConfigFormat', 'Selecione o formato');
                    status.innerHTML = '<strong>Escolha uma rotação</strong>Depois escolha o tópico, o tema e o formato da estação.';
                    return;
                }

                const area = findOsceCurriculumArea(areaSlug);
                themeSelect.disabled = false;
                // O value do <option> continua o código A/B (usado pra
                // casar com a biblioteca de estações) — só o texto exibido
                // vira "Tópico X" em vez de "Tema X", pra bater com o nome
                // do filtro no Internato.
                themeSelect.innerHTML = '<option value="">Selecione o tópico</option>' + (area?.themes || []).map(theme => `<option value="${theme.code}">Tópico ${theme.code}</option>`).join('');
                if (themeCode) themeSelect.value = themeCode;
                setOsceStep('osceThemeStep', true);
                if (!themeCode) { setOsceStep('osceSubthemeStep', false); setOsceStep('osceFormatStep', false); setOsceStep('osceAiStep', false); resetOsceSelect('questionConfigSubtheme', 'Selecione o tema'); resetOsceSelect('questionConfigFormat', 'Selecione o formato'); status.innerHTML = '<strong>Agora escolha o tópico</strong>'; return; }

                const theme = area?.themes.find(item => item.code === themeCode);
                subthemeSelect.disabled = false;
                subthemeSelect.innerHTML = '<option value="">Selecione o tema</option>' + (theme?.subthemes || []).map(sub => `<option value="${sub.slug}" title="${escapeHtml(sub.name)}">${escapeHtml(truncateText(sub.name, 78))}</option>`).join('');
                if (subthemeSlug) subthemeSelect.value = subthemeSlug;
                setOsceStep('osceSubthemeStep', true);
                if (!subthemeSlug) { setOsceStep('osceFormatStep', false); setOsceStep('osceAiStep', false); resetOsceSelect('questionConfigFormat', 'Selecione o formato'); status.innerHTML = '<strong>Agora escolha o tema</strong>'; return; }

                formatSelect.disabled = false;
                formatSelect.innerHTML = '<option value="">Selecione o formato</option>' + OSCE_CURRICULUM_FORMATS.map(value => `<option value="${value}">${escapeHtml(value.replaceAll('_', ' '))}</option>`).join('');
                if (formatValue) formatSelect.value = formatValue;
                setOsceStep('osceFormatStep', true);
                if (!formatValue) { setOsceStep('osceAiStep', false); status.innerHTML = '<strong>Agora escolha o formato</strong>'; return; }

                setOsceStep('osceAiStep', true);
                const subthemeEntry = findOsceCurriculumSubtheme(areaSlug, themeCode, subthemeSlug);
                const themeLabel = `Tópico ${themeCode}`;
                const matches = osceStationsCache.filter(station => station.area === area?.name && station.theme === themeLabel && station.subtheme === subthemeEntry?.name && station.format === formatValue);
                const stationSelect = document.getElementById('questionConfigStation');
                if (matches.length) {
                    if (stationSelect) stationSelect.innerHTML = `<option value="${matches[0].id}">${matches[0].id}</option>`;
                    status.innerHTML = `<strong>${matches.length} estação(ões) já cadastrada(s)</strong>Pronto para iniciar, ou gere uma estação nova e inédita com IA.`;
                } else {
                    if (stationSelect) stationSelect.innerHTML = '<option value="">Nenhuma estação carregada</option>';
                    status.innerHTML = '<strong>Nenhuma estação cadastrada ainda para esse assunto</strong>Gere uma estação com IA para treinar.';
                }
                refreshOsceLibraryPicker(osceLibraryBucketId(areaSlug, themeCode, subthemeSlug, formatValue));
            } catch (_) {
                status.innerHTML = '<strong>Biblioteca OSCE indisponível</strong>Não foi possível carregar o catálogo de estações.';
            }
        }

        // A geração de estações passa por um proxy (cloudflare-worker/) em
        // vez de chamar a Groq direto do navegador — a chave da API não
        // pode viver aqui, porque qualquer visitante consegue lê-la e
        // consumir a cota diária compartilhada de todo mundo. O Worker
        // guarda a chave como secret e só a usa depois de conferir que
        // quem chamou está logado (token do Firebase).
        const OSCE_PROXY_URL = 'https://trycktrack-osce-proxy.patryckfrota-trycktrack.workers.dev';

        async function callGroqForOsceStation(prompt) {
            const idToken = await window.__fb?.getIdToken?.();
            if (!idToken) throw new Error('Faça login para gerar uma estação com IA.');
            const response = await fetch(OSCE_PROXY_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
                body: JSON.stringify({ prompt })
            });
            if (!response.ok) {
                const text = await response.text().catch(() => '');
                throw new Error(`Proxy da Groq respondeu ${response.status}: ${text.slice(0, 300)}`);
            }
            const data = await response.json();
            const text = data.choices?.[0]?.message?.content;
            if (!text) throw new Error('Resposta do Groq sem conteúdo.');
            return JSON.parse(text);
        }

        function buildOsceGenerationPrompt({ areaName, themeName, subthemeName, format, difficulty }) {
            return `Você é um especialista em educação médica brasileira, criador de estações de OSCE (Objective Structured Clinical Examination) para prova de residência médica (padrão Revalida/Enamed).

Crie UMA estação OSCE inédita, em português do Brasil, sobre o seguinte tema curricular:
- Área: ${areaName}
- Tema: ${themeName}
- Subtema/assunto: ${subthemeName}
- Formato da estação: ${format}
- Dificuldade alvo: ${difficulty || 'INTERMEDIÁRIA'}

Regras obrigatórias:
1. O paciente é fictício (nome, idade e detalhes inventados) — nunca use pessoas reais.
2. O caso deve ser clinicamente coerente e conservador, alinhado a diretrizes brasileiras/internacionais amplamente aceitas para o tema.
3. Adapte o foco das tarefas e do checklist ao formato pedido (ex.: EXAME_FISICO foca em exame físico; COMUNICACAO foca em habilidades de comunicação; CONDUTA foca em decisão terapêutica).
4. Gere entre 1 e 3 tarefas ("tasks"), cada uma com 4 a 8 itens de checklist, distribuídos entre os eixos COMMUNICATION, HISTORY, PHYSICAL_EXAM, DIAGNOSTIC_REASONING e MANAGEMENT. Pelo menos um item do checklist geral deve ter "critical": true (erro que compromete a segurança do paciente).
5. "patientScript.responses" deve ter pelo menos 8 pares de pergunta-esperada/resposta cobrindo história, sintomas associados, gravidade, medicações, antecedentes e expectativas do paciente.
6. Preencha "complementaryTests" apenas se fizer sentido clínico para o formato/tema.
7. "doorInstructions.triageSummary" deve resumir os sinais vitais/triagem em uma frase (ex.: "PA 128/78 mmHg, FC 118 bpm, SpO2 90% em ar ambiente").
8. Responda em português, com linguagem natural de prontuário/simulação clínica.`;
        }

        // Biblioteca compartilhada: cada combinação área/tema/subtema/formato
        // vira um "balde" no Firestore com as estações já geradas por
        // qualquer pessoa — reaproveitável quando a cota da IA acabar ou
        // quando alguém preferir simplesmente escolher uma já pronta.
        function osceLibraryBucketId(areaSlug, themeCode, subthemeSlug, format) {
            return `${areaSlug}__${themeCode}__${subthemeSlug}__${format}`;
        }

        let osceLibraryCache = [];

        // Checagem estrutural mínima antes de gravar na biblioteca
        // compartilhada: garante que a resposta da IA tem os campos que o
        // resto do app espera (a chamada ao Groq usa strict: false, então
        // nada obriga isso) e que o documento não é absurdamente grande.
        // Não é validação clínica — só impede lixo estrutural de entrar
        // num acervo que outras pessoas vão usar para estudar.
        const OSCE_LIBRARY_REQUIRED_FIELDS = ['schemaVersion', 'externalId', 'metadata', 'doorInstructions', 'patientScript', 'tasks', 'finalAnswer'];
        const OSCE_LIBRARY_MAX_BYTES = 250000;

        function isValidOsceLibraryPayload(raw) {
            if (!raw || typeof raw !== 'object') return false;
            if (!OSCE_LIBRARY_REQUIRED_FIELDS.every(field => raw[field] != null)) return false;
            if (!Array.isArray(raw.tasks) || !raw.tasks.length) return false;
            if (!raw.tasks.every(task => Array.isArray(task?.checklist) && task.checklist.length)) return false;
            try { return new Blob([JSON.stringify(raw)]).size <= OSCE_LIBRARY_MAX_BYTES; }
            catch (_) { return false; }
        }

        function selectStationFromLibrary(station) {
            const normalized = normalizeLocalOsceStation(station, osceStationsCache.length);
            osceStationsCache.unshift(normalized);
            const stationSelect = document.getElementById('questionConfigStation');
            if (stationSelect) stationSelect.innerHTML = `<option value="${normalized.id}">${normalized.id}</option>`;
            return normalized;
        }

        async function refreshOsceLibraryPicker(bucketId) {
            const wrap = document.getElementById('osceLibraryPicker');
            const select = document.getElementById('osceLibrarySelect');
            if (!wrap || !select) return;
            osceLibraryCache = [];
            wrap.hidden = true;
            if (!window.__fb?.ready) return;
            try {
                osceLibraryCache = await window.__fb.getOsceLibrary(bucketId);
            } catch (error) {
                console.warn('Não foi possível carregar a biblioteca de estações OSCE:', error);
                return;
            }
            if (!osceLibraryCache.length) return;
            select.innerHTML = osceLibraryCache.map((item, index) => `<option value="${index}">${escapeHtml(item.metadata?.title || `Estação ${index + 1}`)}</option>`).join('');
            wrap.hidden = false;
        }

        function useOsceLibraryStation() {
            const select = document.getElementById('osceLibrarySelect');
            const status = document.getElementById('osceStationStatus');
            const raw = osceLibraryCache[Number(select?.value)];
            if (!raw) return;
            const station = selectStationFromLibrary(raw);
            if (status) status.innerHTML = `<strong>Estação escolhida (não revisada)</strong>“${escapeHtml(station.title)}” · gerada por outra pessoa, pronta para iniciar.`;
        }

        async function generateOsceStationWithAI() {
            const status = document.getElementById('osceStationStatus');
            const button = document.getElementById('osceAiGenerateBtn');
            const areaSlug = document.getElementById('questionConfigArea')?.value || '';
            const themeCode = document.getElementById('questionConfigTheme')?.value || '';
            const subthemeSlug = document.getElementById('questionConfigSubtheme')?.value || '';
            const format = document.getElementById('questionConfigFormat')?.value || '';
            const area = findOsceCurriculumArea(areaSlug);
            const subthemeEntry = findOsceCurriculumSubtheme(areaSlug, themeCode, subthemeSlug);
            if (!area || !themeCode || !subthemeEntry || !format) {
                revealQuestionNotice('Escolha área, tema, subtema e formato antes de gerar a estação.');
                return;
            }
            if (!window.__fb?.ready || !window.__fb?.getCurrentUser?.()) {
                revealQuestionNotice('Faça login para gerar uma estação com IA.');
                return;
            }
            const bucketId = osceLibraryBucketId(areaSlug, themeCode, subthemeSlug, format);
            if (button) { button.disabled = true; button.classList.add('is-loading'); }
            if (status) status.innerHTML = '<strong>Gerando estação com IA (Groq)…</strong>Isso pode levar alguns segundos.';
            try {
                const prompt = buildOsceGenerationPrompt({
                    areaName: area.name, themeName: `Tópico ${themeCode}`, subthemeName: subthemeEntry.name, format
                });
                let content;
                try {
                    content = await callGroqForOsceStation(prompt);
                } catch (firstError) {
                    console.warn('Primeira tentativa de gerar estação falhou, tentando novamente:', firstError);
                    content = await callGroqForOsceStation(prompt);
                }
                const raw = {
                    schemaVersion: '1.0.0',
                    externalId: `ai-${areaSlug}-${themeCode}-${subthemeSlug}-${Date.now()}`,
                    metadata: {
                        areaSlug, themeCode, subthemeSlug, format,
                        title: content.title, version: 1,
                        difficulty: content.difficulty, estimatedMinutes: content.estimatedMinutes
                    },
                    scenario: content.scenario,
                    doorInstructions: {
                        patientName: content.doorInstructions?.patientName,
                        age: content.doorInstructions?.age,
                        chiefComplaint: content.doorInstructions?.chiefComplaint,
                        triageData: { Resumo: content.doorInstructions?.triageSummary || '' }
                    },
                    patientScript: content.patientScript,
                    physicalExam: content.physicalExam,
                    complementaryTests: content.complementaryTests,
                    evolution: content.evolution,
                    tasks: content.tasks,
                    finalAnswer: content.finalAnswer
                };
                const station = selectStationFromLibrary(raw);
                if (status) status.innerHTML = `<strong>Estação gerada com IA (Groq)</strong>“${escapeHtml(station.title)}” · pronta para iniciar.`;
                // Salva na biblioteca compartilhada em segundo plano — se
                // falhar (ex.: regras do Firestore) ou não passar na
                // checagem estrutural, a estação já gerada continua
                // funcionando normalmente para quem a gerou agora, só não
                // fica salva pra outras pessoas reaproveitarem depois.
                if (isValidOsceLibraryPayload(raw)) {
                    window.__fb.saveOsceToLibrary(bucketId, raw).catch(error => console.warn('Não foi possível salvar a estação na biblioteca:', error));
                } else {
                    console.warn('Estação gerada não passou na checagem estrutural — não foi salva na biblioteca compartilhada.', raw);
                }
            } catch (error) {
                console.error('Falha ao gerar estação OSCE com IA:', error);
                await refreshOsceLibraryPicker(bucketId);
                if (osceLibraryCache.length) {
                    const fallback = selectStationFromLibrary(osceLibraryCache[Math.floor(Math.random() * osceLibraryCache.length)]);
                    // Nenhuma estação da biblioteca passou por revisão
                    // humana — é honesto avisar que veio direto da IA de
                    // outra pessoa, não um caso curado.
                    if (status) status.innerHTML = `<strong>Cota da IA esgotada por agora</strong>Usando uma estação já gerada por outra pessoa (não revisada): “${escapeHtml(fallback.title)}”.`;
                } else {
                    if (status) status.innerHTML = '<strong>Não foi possível gerar a estação</strong>Tente novamente em instantes.';
                    revealQuestionNotice('Não foi possível gerar a estação com IA agora.');
                }
            } finally {
                if (button) { button.disabled = false; button.classList.remove('is-loading'); }
            }
        }

        function selectQuestionMode(button) {
            document.querySelectorAll('.question-mode').forEach(item => item.classList.remove('active'));
            button.classList.add('active');
            const startButton = document.querySelector('.question-start');
            const examPanel = document.getElementById('questionExamPanel');
            const isFullExam = button.dataset.questionMode === 'full-exam';
            if (examPanel) examPanel.hidden = !isFullExam;
            if (isFullExam) {
                const countSelect = document.getElementById('questionCount');
                if (countSelect) countSelect.value = 'full';
                const select = document.getElementById('questionExamSelect');
                const exams = [...new Map((window.TRYCKTRACK_QUESTION_BANK || [])
                    .filter(question => question.examId)
                    .map(question => [question.examId, { id: question.examId, name: question.examName }])).values()];
                if (select) select.innerHTML = exams.map(exam => `<option value="${escapeHtml(exam.id)}">${escapeHtml(exam.name)}</option>`).join('');
            } else {
                const countSelect = document.getElementById('questionCount');
                if (countSelect?.value === 'full') countSelect.value = '12';
            }
            if (startButton) {
                const labels = {
                    practice: 'Começar sessão',
                    exam: 'Configurar simulado',
                    osce: 'Iniciar estação OSCE',
                    'full-exam': 'Começar prova'
                };
                startButton.textContent = labels[button.dataset.questionMode] || 'Começar sessão';
            }
        }

        function revealQuestionNotice(message, action) {
            const notice = document.getElementById('questionComing');
            if (!notice) return;
            notice.textContent = message;
            if (action) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'question-coming-action';
                btn.textContent = action.label;
                btn.onclick = action.onClick;
                notice.appendChild(btn);
            }
            notice.classList.remove('visible');
            void notice.offsetWidth;
            notice.classList.add('visible');
        }

        let activeQuestionSession = null;
        let lastCompletedQuestionSession = null;

        // Todo backend/src/*.js que sustentaria o modo remoto nunca foi
        // publicado (ver E-01) — toda estação que chega a osceStationsCache
        // (local, gerada por IA, ou vinda da biblioteca compartilhada) já
        // passa por normalizeLocalOsceStation, que sempre marca isLocal:
        // true. Não existe mais um segundo caminho a manter.
        function startOsceSession() {
            const stationId = document.getElementById('questionConfigStation')?.value;
            const localStation = stationId && stationById(stationId);
            if (!localStation) {
                revealQuestionNotice('Nenhuma estação OSCE está disponível para os filtros selecionados.');
                return;
            }
            activeOsceSession = {
                sessionId: `local-${stationId}-${Date.now()}`,
                station: localStation,
                mode: activeOsceMode,
                startedAt: Date.now(),
                events: [],
                selfAssessments: {},
                evaluatorChecklist: {},
                isLocal: true
            };
            renderOsceDoor(localStation);
        }

        let activeOsceSession = null;
        let osceTimer = null;
        // renderOsceDoor substitui TODO o conteúdo de #questionPlayer (a
        // mesma seção usada pelo player normal de questões) pela própria
        // marcação do OSCE — inclusive o cabeçalho e o rodapé com os IDs
        // que renderQuestionPlayer/showQuestionResults esperam encontrar.
        // Sem restaurar essa estrutura ao sair, a próxima sessão de
        // Guiado/Simulado chama document.getElementById(...).textContent
        // num elemento que não existe mais, estoura um TypeError no meio
        // de renderQuestionPlayer e a tela fica travada mostrando o
        // gabarito da última estação de OSCE. Capturado uma única vez,
        // aqui, antes de qualquer função ter chance de sobrescrever.
        const QUESTION_PLAYER_PRISTINE_HTML = document.getElementById('questionPlayer')?.innerHTML || '';

        function osceReadableValue(value) {
            if (value === null || value === undefined || value === '') return '';
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
            if (Array.isArray(value)) return value.map(osceReadableValue).filter(Boolean).join(' · ');
            return Object.entries(value).map(([key, item]) => `${key.replaceAll('_', ' ')}: ${osceReadableValue(item)}`).filter(Boolean).join(' — ');
        }

        function osceTextList(items) {
            const values = Array.isArray(items) ? items.filter(Boolean) : [];
            return values.length ? `<ul>${values.map(item => `<li>${escapeHtml(osceReadableValue(item))}</li>`).join('')}</ul>` : '<p>Nenhum item disponível.</p>';
        }

        function evaluatorPreparationMarkup(station) {
            const content = station?.evaluatorContentJson || {};
            const scenario = content.scenario || {};
            const script = content.patientScript || {};
            const tests = content.complementaryTests || [];
            const evolution = content.evolution || [];
            const tasks = content.tasks || [];
            return `<details class="osce-evaluator-case" open><summary>Caso completo do avaliador</summary><div class="osce-case-grid"><div class="osce-info-card"><small>Ambiente</small><strong>${escapeHtml(scenario.environment || 'Estação clínica')}</strong></div><div class="osce-info-card"><small>Paciente</small><strong>${escapeHtml(station.doorInstructions?.patientName || 'Paciente simulado')}</strong></div></div><section class="osce-evaluator-section"><h3>Perfil e fala inicial</h3><p>${escapeHtml(script.openingStatement || '')}</p></section><section class="osce-evaluator-section"><h3>Tarefas da estação</h3>${tasks.map((task, index) => `<div class="osce-resource-card"><small>Tarefa ${index + 1}</small><strong>${escapeHtml(task.title)}</strong><p>${escapeHtml(task.candidateInstructions)}</p></div>`).join('')}</section><section class="osce-evaluator-section"><h3>Gatilhos de evolução</h3>${osceTextList(evolution.map(item => `${item.trigger}: ${item.change}`))}</section><section class="osce-evaluator-section"><h3>Atalhos do avaliador</h3><div class="osce-quick-actions"><button type="button" onclick="showOsceResource('patient')">Respostas do paciente</button><button type="button" onclick="showOsceResource('physical')">Exame físico</button><button type="button" onclick="showOsceResource('tests')">Exames (${tests.length})</button></div><div id="osceResourceOutput"></div></section></details>`;
        }

        function renderOsceDoor(station) {
            const player = document.getElementById('questionPlayer');
            if (!player) return;
            player.hidden = false;
            document.body.style.overflow = 'hidden';
            const isEvaluator = activeOsceSession?.mode === 'EVALUATOR';
            const door = station.doorInstructions || {};
            const tasks = Array.isArray(station.tasks) ? station.tasks : [];
            const doorText = typeof door === 'string' ? door : [door.chiefComplaint, ...(door.candidateTasks || [])].filter(Boolean).join('<br>');
            const evaluatorDetails = isEvaluator ? evaluatorPreparationMarkup(station) : '';
            const taskList = !isEvaluator && tasks.length ? `<div class="osce-task-list">${tasks.map((task, index) => `<div class="osce-task${index === 0 ? ' active' : ''}" data-task-index="${index}"><span>${index + 1}</span><strong>${escapeHtml(task.title)}</strong></div>`).join('')}</div>` : '';
            player.innerHTML = `<div class="osce-door"><div class="question-player-top"><button class="osce-close-button" type="button" aria-label="Fechar estação" title="Fechar estação" onclick="closeOsceSession()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>Sair</button></div><div class="osce-door-label">${isEvaluator ? 'Preparação do avaliador' : 'Instruções da porta'}</div><div class="osce-door-card"><span class="question-config-kicker">${isEvaluator ? 'Modo avaliador' : 'Modo avaliando'}</span><h2>${escapeHtml(station.area)} · ${escapeHtml(station.theme)}</h2><p>${escapeHtml(doorText).replaceAll('&lt;br&gt;', '<br>')}</p>${taskList}${evaluatorDetails}<div class="osce-timer-wrap"><div class="osce-timer-head"><span class="osce-timer-label">Tempo da estação</span><div class="osce-timer" id="osceTimer">${formatOsceTime(station.timeLimitSeconds)}</div></div><div class="osce-timer-track" aria-label="Tempo decorrido"><div class="osce-timer-fill" id="osceTimerFill"></div></div></div><button class="question-start" type="button" onclick="beginOsceStation()">${isEvaluator ? 'Iniciar avaliação' : 'Iniciar estação'}</button></div></div>`;
        }

        // escapeHtml agora vive em app-auth.js (carregado primeiro) — ver
        // comentário lá.

        function showOsceResource(kind) {
            const output = document.getElementById('osceResourceOutput');
            if (!output || !activeOsceSession?.sessionId) return;
            const content = activeOsceSession.station?.evaluatorContentJson || {};
            const payload = {
                patientScript: (content.patientScript?.responses || []).map(item => `${item.trigger}: ${item.response}`),
                physicalExamFindings: (content.physicalExam || []).map(item => `${item.system}: ${(item.findings || []).join(' · ')}`),
                tests: (content.complementaryTests || []).map(item => `${item.name}: ${item.result}`)
            };
            const value = kind === 'patient' ? payload.patientScript : kind === 'physical' ? payload.physicalExamFindings : payload.tests;
            const entries = Array.isArray(value) ? value : Object.entries(value || {}).map(([key, item]) => `${key.replaceAll('_', ' ')}: ${osceReadableValue(item)}`);
            output.innerHTML = `<div class="osce-resource-card"><small>${kind === 'patient' ? 'Respostas liberáveis' : kind === 'physical' ? 'Achados sob solicitação' : 'Exames sob solicitação'}</small>${osceTextList(entries)}</div>`;
        }

        function formatOsceTime(seconds) { const value = Math.max(0, Number(seconds) || 0); return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`; }

        const OSCE_AXIS_LABELS = { COMMUNICATION: 'Comunicação', HISTORY: 'Anamnese', PHYSICAL_EXAM: 'Exame físico', DIAGNOSTIC_REASONING: 'Raciocínio diagnóstico', MANAGEMENT: 'Conduta' };

        // Só cuida da pontuação (total + desempenho por eixo). O gabarito e a
        // explicação do caso têm sua própria seção estruturada, em
        // osceFinalAnswerMarkup — nunca mais um dump genérico de chave/valor.
        function osceResultMarkup(summary) {
            if (!summary) return '<p>Nenhum resultado detalhado disponível.</p>';
            const { totalPoints = 0, maxPoints = 0, percent = 0, performanceByAxis = {} } = summary;
            const axisEntries = Object.entries(performanceByAxis).filter(([, stats]) => stats?.maxPoints);
            return `<div class="osce-score-hero">
                <span class="osce-score-hero-label">Pontuação final</span>
                <strong class="osce-score-hero-value">${escapeHtml(String(totalPoints))}<span>/ ${escapeHtml(String(maxPoints))}</span></strong>
                <span class="osce-score-hero-percent">${escapeHtml(String(percent))}% de aproveitamento</span>
            </div>
            ${axisEntries.length ? `<div class="osce-result-grid">${axisEntries.map(([axis, stats]) => `<div class="osce-result-card"><small>${escapeHtml(OSCE_AXIS_LABELS[axis] || axis)}</small><strong>${escapeHtml(String(stats.points))} de ${escapeHtml(String(stats.maxPoints))}</strong><span class="osce-result-card-percent">${escapeHtml(String(stats.percent ?? 0))}%</span></div>`).join('')}</div>` : ''}`;
        }

        // Cartão único e estruturado com o gabarito/explicação do caso — em
        // português, com rótulos fixos (nunca a chave em inglês do JSON).
        function osceFinalAnswerMarkup(finalAnswer) {
            if (!finalAnswer || typeof finalAnswer !== 'object') return '';
            const { expectedDiagnosis, expectedManagement, criticalErrors, explanation } = finalAnswer;
            const sections = [
                expectedDiagnosis ? `<div class="osce-answer-section"><small>Diagnóstico esperado</small><strong>${escapeHtml(expectedDiagnosis)}</strong></div>` : '',
                Array.isArray(expectedManagement) && expectedManagement.length ? `<div class="osce-answer-section"><small>Conduta esperada</small>${osceTextList(expectedManagement)}</div>` : '',
                Array.isArray(criticalErrors) && criticalErrors.length ? `<div class="osce-answer-section osce-answer-section-critical"><small>Erros críticos</small>${osceTextList(criticalErrors)}</div>` : '',
                explanation ? `<div class="osce-answer-section"><small>Explicação do caso</small><p>${escapeHtml(explanation)}</p></div>` : ''
            ].filter(Boolean);
            if (!sections.length) return '';
            return `<div class="osce-answer-key"><span class="question-config-kicker">Gabarito e elucidação do caso</span>${sections.join('')}</div>`;
        }

        function beginOsceStation() {
            const limit = Number(activeOsceSession?.station?.timeLimitSeconds || 480);
            let remaining = limit;
            clearInterval(osceTimer);
            document.querySelector('.osce-door-card')?.classList.add('started');
            const timer = document.getElementById('osceTimer');
            const fill = document.getElementById('osceTimerFill');
            osceTimer = setInterval(() => { remaining -= 1; if (timer) timer.textContent = formatOsceTime(remaining); if (fill) fill.style.width = `${Math.min(100, Math.max(0, ((limit - remaining) / limit) * 100))}%`; if (remaining <= 0) finishOsceStation(); }, 1000);
            if (activeOsceSession?.mode === 'CANDIDATE') {
                renderPatientChat(activeOsceSession.station);
                renderOsceTask(activeOsceSession.station, activeOsceSession.currentTaskIndex || 0);
            }
            if (activeOsceSession?.mode === 'EVALUATOR') {
                document.querySelector('.osce-task-active')?.remove();
                renderEvaluatorChecklist(activeOsceSession.station);
            }
        }

        function renderEvaluatorChecklist(station, taskIndex = 0) {
            const card = document.querySelector('.osce-door-card');
            const tasks = station?.evaluatorContentJson?.tasks || station?.content?.evaluation?.tasks || [];
            if (!card || !tasks.length) return;
            card.querySelector('.osce-task-active')?.remove();
            const task = tasks[taskIndex];
            if (!task) return;
            activeOsceSession.currentTaskIndex = taskIndex;
            const isLast = taskIndex >= tasks.length - 1;
            const section = document.createElement('section'); section.className = 'osce-task-active';
            // Chave é a posição (tarefa:item), não o "id" que a IA manda —
            // a chamada ao Groq usa strict: false, então nada garante que
            // esse id exista ou seja único entre tarefas; um id repetido
            // fazia as marcações de uma tarefa sobrescreverem as de outra
            // em saveEvaluatorChecklist, zerando parte da nota. Posição no
            // array é sempre única, sem depender do que a IA devolveu.
            section.innerHTML = `<span class="question-config-kicker">Checklist do avaliador · Tarefa ${taskIndex + 1} de ${tasks.length}</span><fieldset><legend>${escapeHtml(task.title || task.name || '')}</legend>${(task.checklist || []).map((item, itemIndex) => { const id = `${taskIndex}:${itemIndex}`; const name = `evaluator-${taskIndex}-${itemIndex}`; return `<div class="osce-evaluator-item"><span class="osce-evaluator-criterion">${escapeHtml(item.description || item.item || item.criterion || item.title || 'Item de avaliação')}</span><div class="osce-status-options"><label><input type="radio" name="${name}" data-evaluator-item="${id}" value="DONE">Realizado</label><label><input type="radio" name="${name}" data-evaluator-item="${id}" value="PARTIAL">Parcial</label><label><input type="radio" name="${name}" data-evaluator-item="${id}" value="NOT_DONE">Não realizado</label></div></div>`; }).join('')}</fieldset><button class="question-start" type="button" onclick="saveEvaluatorChecklist(${taskIndex})">${isLast ? 'Salvar e concluir avaliação' : 'Salvar e avançar'}</button>`;
            card.appendChild(section);
        }

        function saveEvaluatorChecklist(taskIndex) {
            if (!activeOsceSession?.sessionId) return;
            try {
                const checklist = [...new Set([...document.querySelectorAll('[data-evaluator-item]')].map(input => input.dataset.evaluatorItem))].map(id => { const selected = document.querySelector(`[data-evaluator-item="${CSS.escape(id)}"]:checked`); return { id, status: selected?.value || 'NOT_DONE' }; });
                const tasks = activeOsceSession.station?.evaluatorContentJson?.tasks || activeOsceSession.station?.content?.evaluation?.tasks || [];
                const nextTaskIndex = (taskIndex ?? activeOsceSession.currentTaskIndex ?? 0) + 1;
                if (!activeOsceSession.evaluatorChecklist) activeOsceSession.evaluatorChecklist = {};
                const merged = (activeOsceSession.evaluatorChecklist.all || []).filter(item => !checklist.some(current => current.id === item.id));
                activeOsceSession.evaluatorChecklist.all = [...merged, ...checklist];
                if (nextTaskIndex >= tasks.length) finishOsceStation();
                else renderEvaluatorChecklist(activeOsceSession.station, nextTaskIndex);
            } catch (error) {
                console.error('Falha ao salvar marcações do avaliador:', error);
                revealQuestionNotice('Não foi possível salvar as marcações. Tente novamente.');
            }
        }

        // Igual numa prova real: a porta só mostra a queixa e a tarefa. Sinais
        // vitais, exame físico e exames complementares só aparecem quando o
        // candidato "solicita" durante a tarefa — nunca o checklist/gabarito.
        function candidateResourceMarkup(station) {
            const content = station?.evaluatorContentJson || {};
            const testCount = (content.complementaryTests || []).length;
            return `<div class="osce-candidate-resources"><div class="osce-quick-actions"><button type="button" onclick="showCandidateResource('vitals')">Sinais vitais</button><button type="button" onclick="showCandidateResource('physical')">Exame físico</button><button type="button" onclick="showCandidateResource('tests')">Exames (${testCount})</button></div><div id="osceCandidateResourceOutput"></div></div>`;
        }

        function showCandidateResource(kind) {
            const output = document.getElementById('osceCandidateResourceOutput');
            const station = activeOsceSession?.station;
            if (!output || !station) return;
            const content = station.evaluatorContentJson || {};
            let label, entries;
            if (kind === 'vitals') {
                label = 'Sinais vitais / triagem';
                entries = Object.entries(station.doorInstructions?.triageData || {}).map(([key, value]) => `${key}: ${value}`);
            } else if (kind === 'physical') {
                label = 'Achados ao exame físico';
                entries = (content.physicalExam || []).map(item => `${item.system}: ${(item.findings || []).join(' · ')}`);
            } else {
                label = 'Resultados de exames';
                entries = (content.complementaryTests || []).map(item => `${item.name}: ${item.result}`);
            }
            output.innerHTML = `<div class="osce-resource-card"><small>${escapeHtml(label)}</small>${osceTextList(entries.length ? entries : ['Nenhuma informação disponível para esta estação.'])}</div>`;
        }

        // normalizeOsceChatText/osceChatWords/matchPatientResponse não são
        // mais definidas aqui — vêm de shared/scoring.js via
        // window.matchPatientResponse (mesma ponte do
        // window.calculatePathPriority, ver comentário lá), agora com
        // cobertura de node --test em shared/scoring.test.js.

        function renderPatientChat(station) {
            const card = document.querySelector('.osce-door-card');
            if (!card || card.querySelector('.osce-patient-chat')) return;
            const script = station?.evaluatorContentJson?.patientScript || {};
            const opening = script.openingStatement || '';
            const section = document.createElement('section');
            section.className = 'osce-patient-chat';
            section.innerHTML = `<span class="question-config-kicker">Converse com a paciente</span>
                <div class="osce-chat-log" id="osceChatLog">${opening ? `<div class="osce-chat-msg osce-chat-msg-patient"><strong>Paciente</strong><p>${escapeHtml(opening)}</p></div>` : ''}</div>
                <form class="osce-chat-form" onsubmit="return sendOscePatientMessage(event)">
                    <input type="text" id="osceChatInput" placeholder="Pergunte algo à paciente…" autocomplete="off">
                    <button type="submit">Perguntar</button>
                </form>`;
            card.appendChild(section);
        }

        function sendOscePatientMessage(event) {
            event.preventDefault();
            const input = document.getElementById('osceChatInput');
            const question = input?.value.trim();
            if (!question) return false;
            const log = document.getElementById('osceChatLog');
            log.insertAdjacentHTML('beforeend', `<div class="osce-chat-msg osce-chat-msg-candidate"><strong>Você</strong><p>${escapeHtml(question)}</p></div>`);
            const responses = activeOsceSession?.station?.evaluatorContentJson?.patientScript?.responses || [];
            const match = window.matchPatientResponse(responses, question);
            const answer = match?.response || 'Desculpa, não entendi bem. Pode perguntar de outro jeito?';
            log.insertAdjacentHTML('beforeend', `<div class="osce-chat-msg osce-chat-msg-patient"><strong>Paciente</strong><p>${escapeHtml(answer)}</p></div>`);
            log.scrollTop = log.scrollHeight;
            input.value = '';
            return false;
        }

        function renderOsceTask(station, taskIndex) {
            const task = station?.tasks?.[taskIndex];
            if (!task) return;
            const card = document.querySelector('.osce-door-card');
            if (!card) return;
            const existing = card.querySelector('.osce-task-active');
            if (existing) existing.remove();
            const section = document.createElement('section');
            section.className = 'osce-task-active';
            section.innerHTML = `<span class="question-config-kicker">Tarefa ${taskIndex + 1} de ${station.tasks.length}</span><h3>${escapeHtml(task.title)}</h3><p>${escapeHtml(task.instructions || 'Conclua esta tarefa sem consultar o checklist.')}</p>${candidateResourceMarkup(station)}<button class="question-start" type="button" onclick="completeOsceTask(this)">Encerrar tarefa</button></section>`;
            card.appendChild(section);
        }

        function completeOsceTask(button) {
            if (!activeOsceSession?.sessionId) return;
            if (activeOsceSession.completingTask) return;
            activeOsceSession.completingTask = true;
            if (button) { button.disabled = true; button.textContent = 'Processando…'; }
            try {
                const index = activeOsceSession.currentTaskIndex || 0;
                const task = activeOsceSession.station?.tasks?.[index];
                if (!task) {
                    revealQuestionNotice('Não foi possível carregar esta tarefa. Feche e reabra a estação.');
                    return;
                }
                const card = document.querySelector('.osce-door-card');
                card?.querySelector('.osce-task-active')?.remove();
                const feedback = document.createElement('div');
                feedback.className = 'osce-task-feedback';
                // Mesma razão do checklist do avaliador: chave pela posição
                // (tarefa:item), não pelo "id" que a IA manda.
                feedback.innerHTML = `<strong>Autoavaliação da tarefa</strong><div class="osce-self-checklist">${(task.checklist || []).map((item, itemIndex) => { const id = `${index}:${itemIndex}`; const name = `self-${index}-${itemIndex}`; return `<div class="osce-self-check-item"><span class="osce-self-check-criterion">${escapeHtml(item.description || item.item || item.criterion || 'Critério da tarefa')}</span><div class="osce-self-check-options"><label><input type="radio" name="${name}" data-osce-check-id="${id}" value="DONE">Realizado</label><label><input type="radio" name="${name}" data-osce-check-id="${id}" value="PARTIAL">Parcial</label><label><input type="radio" name="${name}" data-osce-check-id="${id}" value="NOT_DONE">Não realizado</label></div></div>`; }).join('')}</div><button class="question-start" type="button" onclick="submitOsceSelfAssessment(${index})">Confirmar e avançar</button>`;
                card?.appendChild(feedback);
            } catch (error) {
                console.error('Falha ao concluir tarefa OSCE:', error);
                revealQuestionNotice('Não foi possível concluir a tarefa. Tente novamente.');
            } finally {
                // Garante que o botão nunca fica "travado": qualquer caminho
                // (sucesso, erro, tarefa ausente) sempre libera um novo clique.
                activeOsceSession.completingTask = false;
                if (button) { button.disabled = false; button.textContent = 'Encerrar tarefa'; }
            }
        }

        function submitOsceSelfAssessment(taskIndex) {
            const ids = [...new Set([...document.querySelectorAll('[data-osce-check-id]')].map(field => field.dataset.osceCheckId))];
            const checklist = ids.map(id => ({ id, status: document.querySelector(`[data-osce-check-id="${CSS.escape(id)}"]:checked`)?.value }));
            if (checklist.some(item => !item.status)) return revealQuestionNotice('Avalie todos os itens antes de avançar.');
            activeOsceSession.selfAssessments[taskIndex] = checklist;
            document.querySelector('.osce-task-feedback')?.remove();
            const nextTaskIndex = taskIndex + 1;
            activeOsceSession.currentTaskIndex = nextTaskIndex;
            if (nextTaskIndex >= activeOsceSession.station.tasks.length) finishOsceStation();
            else renderOsceTask(activeOsceSession.station, nextTaskIndex);
        }

        function closeOsceSession() {
            clearInterval(osceTimer);
            activeOsceSession = null;
            const player = document.getElementById('questionPlayer');
            if (player) {
                player.setAttribute('hidden', '');
                // Devolve #questionPlayer à estrutura original que
                // renderOsceDoor substituiu — ver comentário em
                // QUESTION_PLAYER_PRISTINE_HTML.
                player.innerHTML = QUESTION_PLAYER_PRISTINE_HTML;
            }
            document.body.style.overflow = '';
        }

        function localOsceSummary(session) {
            const axis = {};
            let points = 0;
            let maxPoints = 0;
            (session.station?.tasks || []).forEach((task, taskIndex) => {
                const answers = new Map((session.selfAssessments?.[taskIndex] || session.evaluatorChecklist?.all || []).map(item => [item.id, item.status]));
                (task.checklist || []).forEach((item, itemIndex) => {
                    const itemPoints = Number(item.points || 1);
                    // Mesma chave posicional usada ao renderizar o checklist
                    // (renderEvaluatorChecklist/completeOsceTask) — nunca
                    // item.id, que pode faltar ou repetir entre tarefas.
                    const status = answers.get(`${taskIndex}:${itemIndex}`) || 'NOT_DONE';
                    const awarded = status === 'DONE' ? itemPoints : status === 'PARTIAL' ? itemPoints / 2 : 0;
                    const axisKey = item.axis || 'MANAGEMENT';
                    if (!axis[axisKey]) axis[axisKey] = { points: 0, maxPoints: 0 };
                    axis[axisKey].points += awarded; axis[axisKey].maxPoints += itemPoints;
                    points += awarded; maxPoints += itemPoints;
                });
            });
            Object.values(axis).forEach(item => item.percent = item.maxPoints ? Math.round(item.points / item.maxPoints * 100) : 0);
            return {
                totalPoints: Number(points.toFixed(1)),
                maxPoints,
                percent: maxPoints ? Math.round(points / maxPoints * 100) : 0,
                performanceByAxis: axis,
                finalAnswer: session.station?.evaluatorContentJson?.finalAnswer || null
            };
        }

        function finishOsceStation() {
            clearInterval(osceTimer);
            if (!activeOsceSession?.sessionId) return;
            const summary = localOsceSummary(activeOsceSession);
            const card = document.querySelector('.osce-door-card');
            if (activeOsceSession.mode === 'CANDIDATE') {
                if (card) card.innerHTML = `<span class="question-config-kicker">Resultado consolidado</span><h2>Estação finalizada</h2>${osceResultMarkup(summary)}${osceFinalAnswerMarkup(summary.finalAnswer)}<p class="osce-answer-lock-note">Esta sessão está bloqueada para alterações.</p>`;
            } else if (card) {
                card.insertAdjacentHTML('beforeend', `<section class="osce-task-feedback"><strong>Resultado da avaliação</strong>${osceResultMarkup(summary)}${osceFinalAnswerMarkup(summary.finalAnswer)}<p class="osce-answer-lock-note">O resultado está pronto para ser apresentado ao candidato.</p></section>`);
            }
        }

        async function startQuestionSession() {
            const mode = activeQuestionConfigMode || document.querySelector('.question-mode.active')?.dataset.questionMode;
            if (mode === 'osce') {
                startOsceSession();
                return;
            }
            if (mode === 'internato') {
                await startInternatoSession();
                return;
            }
            const isFullExam = mode === 'full-exam';
            const selectedExam = document.getElementById('questionConfigExam')?.value;
            const countValue = document.getElementById('questionConfigCount')?.value || '12';
            const requestedCount = Number(countValue);
            // Mesmo recorte que getFilteredQuestionsForConfig(mode) — a
            // função por trás do contador "N questões disponíveis" e do
            // PDF — em vez de recalcular tema/subtema/instituição/ano/
            // banca/Filtro Avançado aqui de novo: essa duplicação foi
            // exatamente o que deixou o Filtro Avançado valendo só pro
            // contador e não pra sessão de fato.
            let filtered = getFilteredQuestionsForConfig(mode);
            if (!isFullExam && filtered.length === 0) {
                // Distingue "esse tema não tem questão nenhuma" de "os
                // Filtros Avançados zeraram o recorte" — senão o aviso
                // manda procurar importação faltando quando o problema é
                // um interruptor que o próprio usuário desligou.
                const withoutAdvancedFilter = getFilteredQuestionsForConfig(mode, { includeAdvancedFilter: false });
                if (withoutAdvancedFilter.length > 0) {
                    revealQuestionNotice('Nenhuma questão sobrou com os Filtros Avançados ativos.', { label: 'Abrir Filtros Avançados', onClick: openAdvancedFilter });
                    return;
                }
            }
            if (!filtered.length) {
                revealQuestionNotice(isFullExam ? 'Não foi possível carregar essa edição da prova.' : 'Ainda não há questões importadas com esse filtro.');
                return;
            }
            await ensureQuestionExplanationsLoaded().catch(() => {});
            // Imersão sempre entrega a prova completa embaralhada (nunca
            // fatiada pela quantidade nem ordenada por busca/incidência —
            // Imersão é uma prova real específica, sem esses dois campos).
            // Simulado com "Todas as áreas" e sem busca pondera por
            // incidência do edital (R-3); com busca ativa (R-4), entram as
            // questões MAIS relevantes; sem nenhum dos dois, sorteio de
            // sempre.
            const sessionQuestions = isFullExam
                ? randomSample(filtered, filtered.length)
                : mode === 'exam'
                    ? selectExamQuestions(filtered, requestedCount)
                    : selectStudyQuestions(filtered, requestedCount, !!document.getElementById('questionConfigSearch')?.value.trim());
            activeQuestionSession = { mode: isFullExam ? 'exam' : (mode === 'exam' ? 'exam' : 'practice'), questions: sessionQuestions, index: 0, answers: [], startedAt: new Date().toISOString(), examId: isFullExam ? selectedExam : null };
            document.getElementById('questionPlayer').hidden = false;
            document.body.style.overflow = 'hidden';
            renderQuestionPlayer();
        }

        // O modo Internato não compartilha a lógica de tema/subtema acima —
        // filtra só por rodízio/tópico/tema/semestre (ver
        // getInternatoFilteredQuestions). Roda como Guiado ou Simulado,
        // conforme a escolha na configuração (activeInternatoMode).
        async function startInternatoSession() {
            const countValue = document.getElementById('questionConfigCount')?.value || '12';
            const requestedCount = Number(countValue);
            const filtered = getFilteredQuestionsForConfig('internato');
            if (!filtered.length) {
                const withoutAdvancedFilter = getFilteredQuestionsForConfig('internato', { includeAdvancedFilter: false });
                revealQuestionNotice(withoutAdvancedFilter.length > 0
                    ? 'Nenhuma questão sobrou com os Filtros Avançados ativos.'
                    : 'Nenhuma questão encontrada para esse filtro.',
                    withoutAdvancedFilter.length > 0 ? { label: 'Abrir Filtros Avançados', onClick: openAdvancedFilter } : undefined);
                return;
            }
            const searchActive = !!document.getElementById('questionConfigSearch')?.value.trim();
            const sessionQuestions = selectStudyQuestions(filtered, requestedCount, searchActive);
            await ensureInternatoExplanationsLoaded().catch(() => {});
            activeQuestionSession = { mode: activeInternatoMode === 'exam' ? 'exam' : 'practice', questions: sessionQuestions, index: 0, answers: [], startedAt: new Date().toISOString() };
            document.getElementById('questionPlayer').hidden = false;
            document.body.style.overflow = 'hidden';
            renderQuestionPlayer();
        }

        // R-05 (versão inicial — só o cronômetro por questão; a análise
        // detalhada com sugestões vem depois): soma o tempo de tela em
        // cada questão, mesmo se ela for revisitada mais de uma vez
        // (Simulado/Imersão permitem voltar). Chamada aqui, no topo de
        // cada render, e de novo em finishExamSession pra fechar a conta
        // da última questão vista antes de a sessão terminar.
        // Imagens/tabelas/elementos visuais do enunciado original (hoje só
        // usado pelo banco do Internato — question.images é um array de
        // caminhos, ex.: ["assets/internato/img/i12-1.png"]). O aviso de
        // "precisa de revisão visual" (needsVisualReview, do banco
        // principal) só aparece quando NÃO há imagem de verdade anexada —
        // com question.images preenchido, a imagem já resolve o caso.
        function renderQuestionStemMedia(question) {
            const container = document.getElementById('questionStemMedia');
            const warning = document.getElementById('questionVisualWarning');
            const images = Array.isArray(question?.images) ? question.images.filter(Boolean) : [];
            if (container) {
                container.innerHTML = images.map(src => `<img src="${escapeHtml(src)}" alt="Imagem da questão" loading="lazy" onclick="openMediaLightbox('${escapeHtml(src).replace(/'/g, "\\'")}')">`).join('');
                container.hidden = !images.length;
            }
            if (warning) warning.hidden = !question?.needsVisualReview || images.length > 0;
        }

        // Zoom de imagem só dentro deste visualizador em tela cheia — o
        // resto do app tem o zoom do navegador desativado (viewport
        // user-scalable=no) para nunca rolar a tela pro lado sem querer.
        // Pinch/duplo-toque são implementados na mão (não pelo zoom nativo
        // do navegador) porque o iOS Safari ignora touch-action:pinch-zoom
        // por elemento quando user-scalable=no está setado no viewport.
        const mediaLightboxState = { scale: 1, x: 0, y: 0, pointers: new Map(), startDist: 0, startScale: 1, startMid: null, lastTapAt: 0 };

        function openMediaLightbox(src) {
            const overlay = document.getElementById('mediaLightbox');
            const img = document.getElementById('mediaLightboxImg');
            if (!overlay || !img) return;
            img.src = src;
            resetMediaLightboxTransform();
            overlay.hidden = false;
        }

        function closeMediaLightbox() {
            const overlay = document.getElementById('mediaLightbox');
            if (overlay) overlay.hidden = true;
        }

        function resetMediaLightboxTransform() {
            mediaLightboxState.scale = 1;
            mediaLightboxState.x = 0;
            mediaLightboxState.y = 0;
            applyMediaLightboxTransform();
        }

        function applyMediaLightboxTransform() {
            const img = document.getElementById('mediaLightboxImg');
            if (!img) return;
            const { scale, x, y } = mediaLightboxState;
            img.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        }

        function clampMediaLightboxPan() {
            const viewport = document.getElementById('mediaLightboxViewport');
            const img = document.getElementById('mediaLightboxImg');
            if (!viewport || !img) return;
            const s = mediaLightboxState.scale;
            // Com a imagem centralizada e transform-origin:center, ela cresce
            // simetricamente a partir do centro — o quanto dá pra arrastar é
            // só a metade do quanto ela passou do tamanho do viewport.
            const maxX = Math.max(0, (img.clientWidth * s - viewport.clientWidth) / 2);
            const maxY = Math.max(0, (img.clientHeight * s - viewport.clientHeight) / 2);
            mediaLightboxState.x = Math.max(-maxX, Math.min(maxX, mediaLightboxState.x));
            mediaLightboxState.y = Math.max(-maxY, Math.min(maxY, mediaLightboxState.y));
        }

        (function setupMediaLightboxGestures() {
            const viewport = document.getElementById('mediaLightboxViewport');
            if (!viewport) return;
            const st = mediaLightboxState;

            function midpoint(a, b) { return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; }
            function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

            viewport.addEventListener('touchstart', e => {
                for (const t of e.changedTouches) st.pointers.set(t.identifier, { x: t.clientX, y: t.clientY });
                if (st.pointers.size === 2) {
                    const [a, b] = [...st.pointers.values()];
                    st.startDist = dist(a, b);
                    st.startScale = st.scale;
                    st.startMid = midpoint(a, b);
                } else if (st.pointers.size === 1) {
                    const now = Date.now();
                    if (now - st.lastTapAt < 300) {
                        st.scale = st.scale > 1 ? 1 : 2.5;
                        if (st.scale === 1) { st.x = 0; st.y = 0; }
                        applyMediaLightboxTransform();
                    }
                    st.lastTapAt = now;
                    st.dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY, ox: st.x, oy: st.y };
                }
            }, { passive: true });

            viewport.addEventListener('touchmove', e => {
                for (const t of e.changedTouches) {
                    if (st.pointers.has(t.identifier)) st.pointers.set(t.identifier, { x: t.clientX, y: t.clientY });
                }
                if (st.pointers.size === 2) {
                    e.preventDefault();
                    const [a, b] = [...st.pointers.values()];
                    const newDist = dist(a, b);
                    st.scale = Math.max(1, Math.min(5, st.startScale * (newDist / (st.startDist || newDist))));
                    clampMediaLightboxPan();
                    applyMediaLightboxTransform();
                } else if (st.pointers.size === 1 && st.scale > 1 && st.dragStart) {
                    e.preventDefault();
                    const t = e.touches[0];
                    st.x = st.dragStart.ox + (t.clientX - st.dragStart.x);
                    st.y = st.dragStart.oy + (t.clientY - st.dragStart.y);
                    clampMediaLightboxPan();
                    applyMediaLightboxTransform();
                }
            }, { passive: false });

            function endTouch(e) {
                for (const t of e.changedTouches) st.pointers.delete(t.identifier);
                if (st.pointers.size < 2) { st.startDist = 0; }
                if (st.pointers.size === 0) st.dragStart = null;
            }
            viewport.addEventListener('touchend', endTouch, { passive: true });
            viewport.addEventListener('touchcancel', endTouch, { passive: true });

            // Duplo clique no desktop, equivalente ao duplo-toque no mobile.
            viewport.addEventListener('dblclick', () => {
                st.scale = st.scale > 1 ? 1 : 2.5;
                if (st.scale === 1) { st.x = 0; st.y = 0; }
                applyMediaLightboxTransform();
            });
        })();

        function flushQuestionTime(session) {
            if (!session || session.questionRenderedAt == null || session.lastRenderedIndex == null) return;
            const elapsedMs = Date.now() - session.questionRenderedAt;
            session.questionTimesMs = session.questionTimesMs || {};
            session.questionTimesMs[session.lastRenderedIndex] = (session.questionTimesMs[session.lastRenderedIndex] || 0) + elapsedMs;
            session.questionRenderedAt = null;
        }

        function renderQuestionPlayer() {
            if (!activeQuestionSession) return;
            applyQuestionFontSize(Number(localStorage.getItem(QUESTION_FONT_KEY)) || 16);
            const session = activeQuestionSession;
            flushQuestionTime(session);
            session.questionRenderedAt = Date.now();
            session.lastRenderedIndex = session.index;
            const question = session.questions[session.index];
            const total = session.questions.length;
            // Simulado/Imersão (mode 'exam') seguem o formato real de
            // prova: dá pra pular, voltar e trocar de resposta antes de
            // entregar — Guiado continua sequencial, com correção
            // imediata a cada resposta.
            const isExam = session.mode === 'exam';
            document.getElementById('questionPlayerMode').textContent = isExam ? 'Simulado' : 'Guiado';
            document.getElementById('questionPlayerArea').textContent = question.area;
            document.getElementById('questionPlayerCount').textContent = `${session.index + 1}/${total}`;
            document.getElementById('questionPlayerProgress').style.width = `${((session.index + 1) / total) * 100}%`;
            document.getElementById('questionSource').textContent = question.source;
            document.getElementById('questionNumber').textContent = `Questão ${question.number}`;
            document.getElementById('questionStem').textContent = question.stem;
            renderQuestionStemMedia(question);
            document.getElementById('questionFeedback').hidden = true;
            document.getElementById('questionReviewRating').hidden = true;
            // Toda sessão nova entra por aqui — garante que a tela de
            // questão fica por cima de qualquer resultado/navegador que
            // tenha ficado visível de uma sessão anterior, mesmo que algo
            // chame renderQuestionPlayer() sem passar por closeQuestionPlayer().
            document.getElementById('questionResultsView').hidden = true;
            document.getElementById('questionNavView').hidden = true;
            document.getElementById('questionPlayQuestion').hidden = false;
            document.getElementById('questionPlayerFooter').hidden = false;
            document.getElementById('questionPlayerProgressWrap').hidden = false;
            document.getElementById('questionFontsizeBtn').hidden = false;
            document.getElementById('questionResultsBackBtn').hidden = true;
            const markBtn = document.getElementById('questionMarkBtn');
            markBtn.hidden = !isExam;
            markBtn.classList.toggle('active', !!session.markedForReview?.[session.index]);
            document.getElementById('questionNavBtn').hidden = !isExam;
            const blankQueue = isExam ? session.blankQueue : null;
            document.getElementById('questionPrev').hidden = !isExam || (blankQueue ? session.blankPos === 0 : session.index === 0);
            const next = document.getElementById('questionNext');
            // Guiado só libera "Próxima" depois de responder; Simulado
            // permite pular uma questão em branco e voltar a ela depois.
            next.disabled = !isExam;
            if (blankQueue) {
                next.textContent = session.blankPos === blankQueue.length - 1 ? 'Finalizar simulado' : 'Próxima em branco';
                document.getElementById('questionPlayerCount').textContent = `Em branco ${session.blankPos + 1}/${blankQueue.length}`;
            } else {
                next.textContent = session.index === total - 1 ? (isExam ? 'Finalizar simulado' : 'Finalizar sessão') : (isExam ? 'Pular / Próxima' : 'Próxima questão');
            }
            const optionsContainer = document.getElementById('questionOptions');
            if (question.questionType === 'discursive') {
                // Markup fixo, sem dado da questão dentro — innerHTML aqui não corre risco.
                optionsContainer.innerHTML = '<div class="question-discursive"><span>Questão discursiva</span><p>Estruture sua resposta no papel ou mentalmente. Depois, abra a resposta esperada para conferir os pontos essenciais.</p><button class="question-option question-discursive-action" onclick="answerQuestion(\'discursive\')"><span class="question-option-letter">✓</span><span>Ver resposta esperada</span></button></div>';
            } else {
                // Construído via DOM + textContent (não innerHTML com string
                // interpolada) — o texto da alternativa vem do banco de
                // questões, que já teve alguns casos com "<", ">" e "&"
                // crus ou pré-escapados. Isso garante que qualquer um desses
                // caracteres sempre aparece como texto, nunca é interpretado
                // como HTML, sem depender de o dado estar "limpo".
                optionsContainer.innerHTML = '';
                Object.entries(question.options).forEach(([letter, text]) => {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'question-option';
                    // No Simulado, ao voltar pra uma questão já respondida,
                    // reabre com a alternativa escolhida destacada — sem
                    // isso, cada visita "esqueceria" a resposta na tela
                    // (o dado continua salvo em session.answers, só o
                    // destaque visual precisa ser reconstruído).
                    if (isExam && session.answers[session.index] === letter) button.style.borderColor = 'var(--lavender-active)';
                    button.onclick = () => answerQuestion(letter);
                    const letterEl = document.createElement('span');
                    letterEl.className = 'question-option-letter';
                    letterEl.textContent = letter;
                    const textEl = document.createElement('span');
                    textEl.className = 'question-option-text';
                    textEl.textContent = text;
                    button.append(letterEl, textEl);
                    optionsContainer.appendChild(button);
                });
            }
            document.getElementById('questionPlayerBody').scrollTop = 0;
        }

        // isQuestionAnswerCorrect não é mais definida aqui — vem de
        // shared/scoring.js via window.isQuestionAnswerCorrect (mesma
        // ponte do window.calculatePathPriority), agora coberta por
        // node --test em shared/scoring.test.js.

        function answerQuestion(letter) {
            if (!activeQuestionSession) return;
            const session = activeQuestionSession;
            // Guiado trava depois da primeira resposta (correção
            // imediata); Simulado/Imersão permitem trocar quantas vezes
            // quiser antes de avançar ou finalizar.
            if (session.mode === 'practice' && session.answers[session.index]) return;
            const question = session.questions[session.index];
            session.answers[session.index] = letter;
            const buttons = [...document.querySelectorAll('.question-option')];
            if (question.questionType === 'discursive') {
                buttons.forEach(button => {
                    button.classList.add('correct');
                    button.disabled = true;
                });
                document.getElementById('questionFeedbackTitle').textContent = 'Resposta esperada';
                document.getElementById('questionFeedbackText').textContent = question.explanation || 'O espelho de resposta desta questão ainda não foi cadastrado.';
                document.getElementById('questionFeedback').hidden = false;
                document.getElementById('questionNext').disabled = false;
                return;
            }
            if (session.mode === 'practice') {
                buttons.forEach(button => {
                    const value = button.querySelector('.question-option-letter').textContent;
                    if ((!question.annulled && value === question.answer) || (question.annulled && value === letter)) button.classList.add('correct');
                    else if (value === letter) button.classList.add('wrong');
                    button.disabled = true;
                });
                const correct = window.isQuestionAnswerCorrect(question, letter);
                document.getElementById('questionFeedbackTitle').textContent = question.annulled ? 'Questão anulada' : (correct ? 'Resposta correta' : `Resposta incorreta · alternativa ${question.answer}`);
                document.getElementById('questionFeedbackText').textContent = question.explanation || `Gabarito oficial: alternativa ${question.answer}. O PDF fornecido não contém a explicação comentada.`;
                document.getElementById('questionFeedback').hidden = false;
                recordQuestionResult(question, correct, letter);
                // R-1: errar já é o próprio sinal (Errei, sem precisar
                // perguntar nada) — só quando acerta é que faz sentido
                // diferenciar "acertei com certeza" de "acertei mas quase
                // não lembrava", que carregam informação bem diferente
                // pra estabilidade da memória. session.pendingReview fica
                // pendente até rateReviewDifficulty ou até a pessoa avançar
                // sem escolher (flushPendingReviewRating aplica "Bom").
                if (correct) {
                    session.pendingReview = { questionId: question.id };
                    document.getElementById('questionReviewRating').hidden = false;
                } else {
                    updateReviewQueue(question.id, window.RATING.AGAIN);
                }
            } else {
                // Simulado/Imersão: sem feedback de certo/errado agora — só
                // destaca a escolha atual. Os botões continuam habilitados
                // de propósito, pra dar pra trocar de resposta.
                buttons.forEach(button => {
                    button.style.borderColor = button.querySelector('.question-option-letter').textContent === letter ? 'var(--lavender-active)' : '';
                });
            }
            document.getElementById('questionNext').disabled = false;
        }

        function retreatQuestion() {
            const session = activeQuestionSession;
            if (session?.blankQueue) {
                if (session.blankPos <= 0) return;
                session.blankPos -= 1;
                session.index = session.blankQueue[session.blankPos];
                renderQuestionPlayer();
                return;
            }
            if (!activeQuestionSession || activeQuestionSession.index <= 0) return;
            activeQuestionSession.index -= 1;
            renderQuestionPlayer();
        }

        function toggleMarkForReview() {
            const session = activeQuestionSession;
            if (!session) return;
            if (!Array.isArray(session.markedForReview)) session.markedForReview = new Array(session.questions.length).fill(false);
            session.markedForReview[session.index] = !session.markedForReview[session.index];
            document.getElementById('questionMarkBtn')?.classList.toggle('active', session.markedForReview[session.index]);
        }

        // Navegador do Simulado/Imersão: uma grade com todas as questões
        // do bloco (a mesma ideia visual da tela de desempenho, mas
        // durante a prova — sem certo/errado, só respondida/em branco/
        // marcada), pra dar pra pular direto pra qualquer uma.
        function openQuestionNavigator() {
            const session = activeQuestionSession;
            if (!session) return;
            document.getElementById('questionPlayQuestion').hidden = true;
            document.getElementById('questionNavView').hidden = false;
            document.getElementById('questionPlayerFooter').hidden = true;
            document.getElementById('questionNavGrid').innerHTML = session.questions.map((_, index) => {
                const answered = !!session.answers[index];
                const marked = !!session.markedForReview?.[index];
                const current = index === session.index;
                const classes = ['result-bubble', answered ? 'nav-answered' : 'nav-empty', marked ? 'nav-marked' : '', current ? 'nav-current' : ''].filter(Boolean).join(' ');
                const statusLabel = `${answered ? 'respondida' : 'em branco'}${marked ? ', marcada para revisão' : ''}`;
                return `<button type="button" class="${classes}" onclick="jumpToQuestion(${index})" aria-label="Ir para a questão ${index + 1}, ${statusLabel}"><span>${index + 1}</span></button>`;
            }).join('');
        }

        function closeQuestionNavigator() {
            document.getElementById('questionPlayQuestion').hidden = false;
            document.getElementById('questionNavView').hidden = true;
            document.getElementById('questionPlayerFooter').hidden = false;
        }

        function jumpToQuestion(index) {
            const session = activeQuestionSession;
            if (!session || index < 0 || index >= session.questions.length) return;
            session.index = index;
            session.blankQueue = null; // navegador livre sai do modo "só as em branco"
            closeQuestionNavigator();
            renderQuestionPlayer();
        }

        function advanceQuestion() {
            if (!activeQuestionSession) return;
            const session = activeQuestionSession;
            // Guiado exige responder para seguir; Simulado/Imersão deixam
            // pular uma questão em branco (fica marcável e reaberta pelo
            // navegador depois).
            if (session.mode === 'practice' && !session.answers[session.index]) return;
            flushPendingReviewRating(session);
            // Modo "só as em branco": segue a fila e, na última, pede para
            // confirmar a entrega.
            if (session.blankQueue) {
                if (session.blankPos < session.blankQueue.length - 1) {
                    session.blankPos += 1;
                    session.index = session.blankQueue[session.blankPos];
                    renderQuestionPlayer();
                } else {
                    confirmFinishExam(session);
                }
                return;
            }
            if (session.index < session.questions.length - 1) {
                session.index += 1;
                renderQuestionPlayer();
                return;
            }
            requestFinishExam(session);
        }

        // Escolha de Difícil/Bom/Fácil (R-1) depois de acertar no Guiado —
        // ver session.pendingReview em answerQuestion.
        function rateReviewDifficulty(rating) {
            const session = activeQuestionSession;
            if (!session?.pendingReview) return;
            updateReviewQueue(session.pendingReview.questionId, rating);
            session.pendingReview = null;
            document.getElementById('questionReviewRating').hidden = true;
        }

        // Se a pessoa avança (ou sai) sem escolher Difícil/Bom/Fácil,
        // aplica "Bom" — não trava o fluxo de estudo por causa de um
        // detalhe que a pessoa optou por não informar.
        function flushPendingReviewRating(session) {
            if (!session?.pendingReview) return;
            updateReviewQueue(session.pendingReview.questionId, window.RATING.GOOD);
            session.pendingReview = null;
        }

        // Fecha e pontua a sessão — chamada pelo fim natural (advanceQuestion
        // na última questão) e por finishExamNow (entrega antecipada do
        // navegador). Questão em branco conta como errada, igual numa
        // prova real.
        function finishExamSession(session) {
            flushQuestionTime(session);
            if (session.mode === 'exam') {
                session.questions.forEach((question, index) => {
                    const correctAnswer = window.isQuestionAnswerCorrect(question, session.answers[index]);
                    recordQuestionResult(question, correctAnswer, session.answers[index], session.questionTimesMs?.[index]);
                    // Simulado/Imersão não têm a UI de Difícil/Bom/Fácil por
                    // questão (o resultado só aparece no fim, todo de uma
                    // vez) — rating automático: Bom se acertou, Errei se
                    // errou. Discursiva (correctAnswer===null) não entra na
                    // fila de revisão, mesma regra de recordQuestionResult.
                    if (correctAnswer !== null) updateReviewQueue(question.id, correctAnswer ? window.RATING.GOOD : window.RATING.AGAIN);
                });
            }
            const correct = session.questions.reduce((sum, question, index) => sum + (window.isQuestionAnswerCorrect(question, session.answers[index]) ? 1 : 0), 0);
            if (session.trailDiagnostic) completeTrailDiagnostic(session.trailDiagnostic, session);
            if (session.trailRecalibration) completeTrailRecalibration(session.trailRecalibration, session);
            if (session.trailPhase) completeTrailPhase(session.trailPhase);
            recordStudyMinutes(session);
            lastCompletedQuestionSession = { mode: session.mode, questions: session.questions, answers: session.answers.slice(), questionTimesMs: session.questionTimesMs || {} };
            activeQuestionSession = null;
            appendQuestionHistory(buildQuestionHistoryEntry(session, correct));
            showQuestionResults(lastCompletedQuestionSession);
            updateQuestionHubStats();
            renderDashboard();
            flushReviewSync(); // best-effort — nunca trava o fim da sessão
        }

        function finishExamNow() {
            const session = activeQuestionSession;
            if (!session || session.mode !== 'exam') return;
            requestFinishExam(session);
        }

        // Antes de entregar um Simulado/Imersão com questões em branco,
        // avisa dentro do app (não com confirm) e oferece um botão para
        // cada questão em branco — em branco conta como erro.
        function requestFinishExam(session) {
            const blanks = session.questions.map((_, i) => session.answers[i] ? -1 : i).filter(i => i >= 0);
            if (session.mode !== 'exam' || !blanks.length) { finishExamSession(session); return; }
            session.pendingBlanks = blanks;
            const n = blanks.length;
            showExamDialog(`<h2 id="blankDialogTitle">${n === 1 ? 'Você deixou 1 questão em branco' : `Você deixou ${n} questões em branco`}</h2>`
                + `<p>Em branco conta como erro, como na prova. Toque numa questão para responder.</p>`
                + `<div class="blank-dialog-list">${blanks.map(i => `<button type="button" onclick="rescueBlankQuestion(${i})">${String(i + 1).padStart(2, '0')}</button>`).join('')}</div>`
                + `<div class="blank-dialog-actions">`
                + `<button type="button" class="results-primary" onclick="rescueBlankQuestion(${blanks[0]})">${n === 1 ? 'Responder a questão em branco' : 'Ir para a primeira em branco'}</button>`
                + `<button type="button" class="results-secondary" onclick="finishExamFromDialog()">Entregar mesmo assim</button>`
                + `</div>`);
        }
        // Fim da fila de questões em branco: confirma antes de entregar.
        function confirmFinishExam(session) {
            const left = session.questions.filter((_, i) => !session.answers[i]).length;
            showExamDialog(`<h2 id="blankDialogTitle">Finalizar o simulado?</h2>`
                + `<p>${left ? (left === 1 ? 'Ainda há 1 questão em branco, que conta como erro.' : `Ainda há ${left} questões em branco, que contam como erro.`) : 'Todas as questões foram respondidas.'}</p>`
                + `<div class="blank-dialog-actions">`
                + `<button type="button" class="results-primary" onclick="finishExamFromDialog()">Finalizar simulado</button>`
                + `<button type="button" class="results-secondary" onclick="closeBlankDialog()">Voltar</button>`
                + `</div>`);
        }
        function showExamDialog(content) {
            let dialog = document.getElementById('blankQuestionsDialog');
            if (!dialog) {
                dialog = document.createElement('div');
                dialog.id = 'blankQuestionsDialog';
                dialog.className = 'blank-dialog';
                dialog.setAttribute('role', 'dialog');
                dialog.setAttribute('aria-modal', 'true');
                dialog.setAttribute('aria-labelledby', 'blankDialogTitle');
                document.getElementById('questionPlayer').appendChild(dialog);
            }
            dialog.innerHTML = `<div class="blank-dialog-card">${content}</div>`;
            dialog.hidden = false;
            dialog.querySelector('.results-primary').focus();
        }
        function closeBlankDialog() {
            const dialog = document.getElementById('blankQuestionsDialog');
            if (dialog) dialog.hidden = true;
        }
        // Entra no modo "só as em branco" a partir da questão tocada.
        function rescueBlankQuestion(index) {
            closeBlankDialog();
            const session = activeQuestionSession;
            if (!session) return;
            closeQuestionNavigator();
            session.blankQueue = session.pendingBlanks || [index];
            session.blankPos = Math.max(0, session.blankQueue.indexOf(index));
            session.index = index;
            renderQuestionPlayer();
        }
        function finishExamFromDialog() {
            closeBlankDialog();
            const session = activeQuestionSession;
            if (!session) return;
            session.blankQueue = null;
            finishExamSession(session);
        }

        let activeResultsSession = null;

        // Substitui o antigo aviso "Sessão concluída" por uma página de
        // desempenho dentro do próprio player: uma bolha por questão, verde
        // se acertou e vermelha se errou, cada uma abrindo a questão em modo
        // de revisão (somente leitura).
        function showQuestionResults(session) {
            if (session) activeResultsSession = session;
            if (!activeResultsSession) return;
            const player = document.getElementById('questionPlayer');
            player.hidden = false;
            document.body.style.overflow = 'hidden';

            document.getElementById('questionPlayQuestion').hidden = true;
            document.getElementById('questionResultsView').hidden = false;
            document.getElementById('questionPlayerProgressWrap').hidden = true;
            document.getElementById('questionPlayerFooter').hidden = true;
            document.getElementById('questionFontsizeBtn').hidden = true;
            document.getElementById('questionResultsBackBtn').hidden = true;
            document.getElementById('questionPlayerCount').textContent = '';

            const { questions, answers, mode } = activeResultsSession;
            const correctCount = questions.reduce((sum, q, i) => sum + (window.isQuestionAnswerCorrect(q, answers[i]) ? 1 : 0), 0);
            // Discursivas não têm gabarito de letra — ficam de fora do
            // denominador do placar (senão a fração mentiria), mas ainda
            // aparecem na grade de bolhas, num terceiro estado neutro.
            const scoredTotal = questions.filter(q => q.questionType !== 'discursive').length;
            document.getElementById('questionPlayerMode').textContent = mode === 'exam' ? 'Simulado' : 'Guiado';
            document.getElementById('questionPlayerArea').textContent = 'Desempenho da sessão';
            // Cartão-resposta: uma linha por questão, alternativas como
            // bolinhas de marcar (a marcada preenchida, o gabarito circulado
            // quando errou) e o resultado em texto no fim da linha.
            const wrongIndexes = questions.map((q, i) => window.isQuestionAnswerCorrect(q, answers[i]) === false ? i : -1).filter(i => i >= 0);
            const reviewLabel = wrongIndexes.length === 1 ? 'Revisar o erro' : `Revisar os ${wrongIndexes.length} erros`;
            document.getElementById('questionResultsScore').innerHTML = `<h2 class="results-title">${correctCount} de ${scoredTotal} acertos</h2>`
                + `<div class="results-actions">`
                + (wrongIndexes.length ? `<button type="button" class="results-primary" onclick="reviewErrors()">${reviewLabel}</button>` : '')
                + `<button type="button" class="results-secondary" onclick="downloadQuestionSessionResultPdf(activeResultsSession)">Baixar PDF</button></div>`;
            const sheet = document.getElementById('questionResultsGrid');
            // A classe vem do JS (não do HTML) para que um HTML novo com JS
            // antigo em cache continue mostrando a grade antiga inteira.
            sheet.className = 'answer-sheet';
            answerSheetRows = questions.map((q, i) => {
                const answer = answers[i];
                const correct = window.isQuestionAnswerCorrect(q, answer);
                const state = correct === null ? 'neutral' : (correct ? 'correct' : 'wrong');
                const marks = Object.keys(q.options || {}).map(letter => {
                    const cls = ['sheet-mark', answer === letter ? 'marked' : '', correct === false && letter === q.answer ? 'key' : ''].filter(Boolean).join(' ');
                    return `<span class="${cls}">${letter}</span>`;
                }).join('');
                let result = '';
                let label = 'sem pontuação';
                if (correct === true) { result = '<b>✓</b>'; label = 'acertou'; }
                else if (correct === false) {
                    const detail = answer ? `${answer}, era ${q.answer}` : `em branco, era ${q.answer}`;
                    result = `<b>✕</b><span>${detail}</span>`;
                    label = answer ? `errou: marcou ${answer}, gabarito ${q.answer}` : `em branco, gabarito ${q.answer}`;
                } else result = '<span>discursiva</span>';
                return `<button type="button" class="sheet-row ${state}" onclick="reviewFromSheet(${i})" aria-label="Questão ${i + 1}, ${label}"><span class="sheet-num">${String(i + 1).padStart(2, '0')}</span><span class="sheet-marks" aria-hidden="true">${marks}</span><span class="sheet-result" aria-hidden="true">${result}</span></button>`;
            });
            document.getElementById('questionPlayerBody').scrollTop = 0;
            sheet.innerHTML = '';
            layoutAnswerSheet();
            hideReviewNav();
        }

        // Navegação na revisão: "Revisar os N erros" percorre só os erros;
        // tocar numa linha do cartão percorre todas as questões a partir dela.
        let reviewList = [];
        let reviewPos = 0;
        let reviewKind = '';
        function reviewErrors() {
            if (!activeResultsSession) return;
            const { questions, answers } = activeResultsSession;
            const wrong = questions.map((q, i) => window.isQuestionAnswerCorrect(q, answers[i]) === false ? i : -1).filter(i => i >= 0);
            if (wrong.length) startResultsReview(wrong, 0, 'Erro');
        }
        function reviewFromSheet(index) {
            if (!activeResultsSession) return;
            startResultsReview(activeResultsSession.questions.map((_, i) => i), index, 'Questão');
        }
        function startResultsReview(list, pos, kind) {
            reviewList = list;
            reviewPos = pos;
            reviewKind = kind;
            showReviewAt();
        }
        function stepResultsReview(delta) {
            const next = reviewPos + delta;
            if (next < 0) return;
            if (next >= reviewList.length) { showQuestionResults(); return; }
            reviewPos = next;
            showReviewAt();
        }
        function showReviewAt() {
            reviewQuestionResult(reviewList[reviewPos]);
            let nav = document.getElementById('reviewNavFooter');
            if (!nav) {
                nav = document.createElement('footer');
                nav.id = 'reviewNavFooter';
                nav.className = 'question-player-footer review-nav';
                document.getElementById('questionPlayerFooter').after(nav);
            }
            const last = reviewPos === reviewList.length - 1;
            nav.hidden = false;
            nav.innerHTML = `<button type="button" class="results-secondary" onclick="stepResultsReview(-1)" ${reviewPos === 0 ? 'disabled' : ''}>Anterior</button>`
                + `<span class="review-nav-count">${reviewKind} ${reviewPos + 1} de ${reviewList.length}</span>`
                + `<button type="button" class="results-primary" onclick="stepResultsReview(1)">${last ? 'Voltar ao cartão' : (reviewKind === 'Erro' ? 'Próximo erro' : 'Próxima')}</button>`;
        }
        function hideReviewNav() {
            const nav = document.getElementById('reviewNavFooter');
            if (nav) nav.hidden = true;
        }

        // Cartão-resposta: colunas pelo espaço disponível (iPhone 1, iPad 2-3,
        // Mac 3-4), lidas de cima para baixo como na folha de papel. Rola só
        // na vertical — o número de linhas acompanha a quantidade de questões,
        // então a grade nunca cria colunas extras para os lados.
        let answerSheetRows = [];
        function layoutAnswerSheet() {
            const sheet = document.getElementById('questionResultsGrid');
            const view = document.getElementById('questionResultsView');
            if (!sheet || !view || view.hidden || !answerSheetRows.length) return;
            const COL_MIN = 300, GAP = 32;
            const cols = Math.max(1, Math.min(4, Math.floor((sheet.parentElement.clientWidth + GAP) / (COL_MIN + GAP))));
            sheet.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
            sheet.style.setProperty('--sheet-rows', Math.ceil(answerSheetRows.length / cols));
            if (sheet.childElementCount !== answerSheetRows.length) sheet.innerHTML = answerSheetRows.join('');
        }
        window.addEventListener('resize', layoutAnswerSheet);

        // Mostra uma questão específica do resultado em modo de revisão
        // (opções já marcadas certo/errado, explicação visível, sem poder
        // responder de novo). O botão no canto superior direito volta para
        // a grade de bolhas.
        // R-05 (versão inicial): "1min 12s", "38s" — sem casas decimais,
        // sem soar mais preciso do que um cronômetro de tela realmente é
        // (a pessoa pode ter saído da aba no meio, por exemplo).
        function formatQuestionTime(ms) {
            const totalSeconds = Math.round((Number(ms) || 0) / 1000);
            if (totalSeconds < 60) return `${totalSeconds}s`;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            return seconds ? `${minutes}min ${seconds}s` : `${minutes}min`;
        }

        function reviewQuestionResult(index) {
            if (!activeResultsSession) return;
            const { questions, answers, mode, questionTimesMs } = activeResultsSession;
            const question = questions[index];
            const answer = answers[index];

            document.getElementById('questionResultsView').hidden = true;
            document.getElementById('questionPlayQuestion').hidden = false;
            document.getElementById('questionPlayerProgressWrap').hidden = true;
            document.getElementById('questionPlayerFooter').hidden = true;
            document.getElementById('questionFontsizeBtn').hidden = true;
            document.getElementById('questionResultsBackBtn').hidden = false;

            document.getElementById('questionPlayerMode').textContent = mode === 'exam' ? 'Simulado' : 'Guiado';
            document.getElementById('questionPlayerArea').textContent = question.area || '';
            document.getElementById('questionPlayerCount').textContent = `${index + 1}/${questions.length}`;
            document.getElementById('questionSource').textContent = question.source || '';
            const timeSpentMs = questionTimesMs?.[index];
            document.getElementById('questionNumber').textContent = `Questão ${question.number || index + 1}${timeSpentMs ? ` · ${formatQuestionTime(timeSpentMs)}` : ''}`;
            document.getElementById('questionStem').textContent = question.stem;
            renderQuestionStemMedia(question);

            const reviewOptionsContainer = document.getElementById('questionOptions');
            reviewOptionsContainer.innerHTML = '';
            if (question.questionType !== 'discursive') {
                // Mesma razão da renderização normal: construído via DOM +
                // textContent, não innerHTML com string interpolada.
                Object.entries(question.options || {}).forEach(([letter, text]) => {
                    let cls = '';
                    if (!question.annulled && letter === question.answer) cls = 'correct';
                    else if (question.annulled && letter === answer) cls = 'correct';
                    else if (letter === answer) cls = 'wrong';
                    const optionEl = document.createElement('div');
                    optionEl.className = cls ? `question-option ${cls}` : 'question-option';
                    optionEl.style.cursor = 'default';
                    const letterEl = document.createElement('span');
                    letterEl.className = 'question-option-letter';
                    letterEl.textContent = letter;
                    const textEl = document.createElement('span');
                    textEl.className = 'question-option-text';
                    textEl.textContent = text;
                    optionEl.append(letterEl, textEl);
                    reviewOptionsContainer.appendChild(optionEl);
                });
            }

            const correct = window.isQuestionAnswerCorrect(question, answer);
            document.getElementById('questionFeedbackTitle').textContent = question.questionType === 'discursive'
                ? 'Resposta esperada'
                : (question.annulled ? 'Questão anulada' : (correct ? 'Resposta correta' : `Resposta incorreta · alternativa ${question.answer}`));
            document.getElementById('questionFeedbackText').textContent = question.explanation || `Gabarito oficial: alternativa ${question.answer}. O PDF fornecido não contém a explicação comentada.`;
            document.getElementById('questionFeedback').hidden = false;
            document.getElementById('questionPlayerBody').scrollTop = 0;
        }

        // O botão "voltar" do topo é sensível ao contexto: durante a revisão
        // de uma questão específica, ele deve voltar para a grade de
        // desempenho (não fechar o player inteiro) — só fecha de fato quando
        // já está na grade (ou respondendo normalmente).
        function handleQuestionPlayerBack() {
            const navOpen = !document.getElementById('questionNavView').hidden;
            const reviewing = !document.getElementById('questionResultsBackBtn').hidden;
            if (navOpen) {
                closeQuestionNavigator();
            } else if (reviewing) {
                showQuestionResults();
            } else {
                closeQuestionPlayer();
            }
        }

        function closeQuestionPlayer() {
            hideReviewNav();
            closeBlankDialog();
            closeFontSizeSheet();
            flushPendingReviewRating(activeQuestionSession);
            flushReviewSync(); // best-effort — nunca trava o fechamento
            document.getElementById('questionPlayer').hidden = true;
            document.body.style.overflow = '';
            activeQuestionSession = null;
            activeResultsSession = null;
            // Restaura o player para o estado normal de "responder questão",
            // caso tenha ficado na tela de desempenho/revisão/navegador.
            document.getElementById('questionResultsView').hidden = true;
            document.getElementById('questionNavView').hidden = true;
            document.getElementById('questionPlayQuestion').hidden = false;
            document.getElementById('questionPlayerProgressWrap').hidden = false;
            document.getElementById('questionPlayerFooter').hidden = false;
            document.getElementById('questionFontsizeBtn').hidden = false;
            document.getElementById('questionResultsBackBtn').hidden = true;
        }

        // Mapa de área (como vem nas questões) -> slug usado no Dashboard
        // (DASHBOARD_AREAS, acima). "Revalida INEP" e afins não têm
        // correspondência — ficam de fora do detalhamento por área, mas
        // continuam contando no total geral de acertos.
        const QUESTION_AREA_DASHBOARD_SLUG = {
            'Ginecologia': 'go-completo',
            'Obstetrícia': 'go-completo',
            'Pediatria': 'pediatria-completo',
            'Cirurgia Geral': 'cirurgia-geral',
            'Medicina Preventiva': 'medicina-preventiva',
            'Psiquiatria': 'psiquiatria',
            ...Object.fromEntries(CLINICA_MEDICA_AREAS.map(area => [area, 'clinica-medica'])),
        };

        // Nome do rodízio (question.rodizio, Internato) -> slug do lado
        // Curso do Dashboard — mesmos nomes/slugs de OSCE_CURRICULUM_MATRIX,
        // não duplicados à mão.
        const RODIZIO_DASHBOARD_SLUG = Object.fromEntries(OSCE_CURRICULUM_MATRIX.map(area => [area.name, area.slug]));

        function recordQuestionResult(question, correct, chosen, elapsedMs) {
            // Discursiva não tem gabarito de letra — não é certo nem
            // errado, então não entra na contagem de acertos/erros.
            if (question?.questionType === 'discursive') return;
            queueResponseSyncPush(question, correct, chosen, elapsedMs);
            const stats = getQuestionStats();
            stats.answered = Number(stats.answered || 0) + 1;
            stats.correct = Number(stats.correct || 0) + (correct ? 1 : 0);
            stats.byArea = stats.byArea || {};
            // Internato (question.rodizio) e banco principal (question.area)
            // nunca colidem no mesmo campo — o discriminador natural de
            // qual trilha (Curso/Residência) essa resposta pertence.
            const track = question?.rodizio ? 'curso' : 'residencia';
            const key = track === 'curso' ? RODIZIO_DASHBOARD_SLUG[question?.rodizio] : QUESTION_AREA_DASHBOARD_SLUG[question?.area];
            if (key) {
                stats.byArea[track] = stats.byArea[track] || {};
                stats.byArea[track][key] = stats.byArea[track][key] || { answered: 0, correct: 0 };
                stats.byArea[track][key].answered += 1;
                stats.byArea[track][key].correct += correct ? 1 : 0;
            }
            const today = new Date().toISOString().slice(0, 10);
            stats.daily = Array.isArray(stats.daily) ? stats.daily : [];
            let day = stats.daily.find(item => item.date === today);
            if (!day) { day = { date: today, count: 0 }; stats.daily.push(day); }
            day.count += 1;
            // Ofensiva: só reavalia uma vez por dia (na primeira questão
            // respondida do dia), não a cada questão — soma 1 se o último
            // dia com atividade foi ontem, reinicia em 1 se houve um
            // intervalo, e não mexe se hoje já tinha sido contado.
            if (stats.lastActivityDate !== today) {
                const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayIso = yesterday.toISOString().slice(0, 10);
                stats.streak = stats.lastActivityDate === yesterdayIso ? Number(stats.streak || 0) + 1 : 1;
                stats.lastActivityDate = today;
            }
            localStorage.setItem('trycktrack-question-stats', JSON.stringify(stats));
            // Não chama mais updateReviewQueue aqui — quem chama esta
            // função decide o rating (1–4, ver window.RATING): o Guiado
            // pede Difícil/Bom/Fácil quando acerta (rateReviewDifficulty)
            // e manda Errei direto quando erra; Simulado/Imersão (sem
            // essa UI por questão) mandam Bom/Errei automaticamente em
            // finishExamSession.
            updateQuestionHubStats();
        }

        // Fila de revisão espaçada (R-1): modelo de memória por questão
        // (estabilidade/dificuldade, ver shared/spaced-repetition.js —
        // FSRS-inspirado, não a escada Leitner fixa de 1/3/7/21 dias que
        // existia antes). Guardado só no dispositivo (localStorage), sem
        // sincronização com a nuvem — é um cache de estudo, não um dado
        // que precise seguir a pessoa entre aparelhos.
        const REVIEW_QUEUE_KEY = 'trycktrack-review-queue-v1';

        function getReviewQueue() {
            let queue;
            try { queue = JSON.parse(localStorage.getItem(REVIEW_QUEUE_KEY) || '{}'); }
            catch (_) { return {}; }
            // Migra entradas do formato antigo (escada Leitner) na
            // primeira leitura — preserva o dueDate já agendado, então
            // ninguém é reagendado de surpresa só pela troca de algoritmo.
            // Grava de volta uma única vez pra não remigrar a cada leitura.
            let mudou = false;
            Object.keys(queue).forEach(id => {
                if (typeof queue[id]?.step === 'number') {
                    queue[id] = window.migrateLegacyReviewEntry(queue[id]);
                    mudou = true;
                }
            });
            if (mudou) saveReviewQueue(queue);
            return queue;
        }

        function saveReviewQueue(queue) {
            try { localStorage.setItem(REVIEW_QUEUE_KEY, JSON.stringify(queue)); }
            catch (_) { /* armazenamento indisponível/cheio — segue sem persistir */ }
        }

        function daysBetweenIsoDates(fromIso, toIso) {
            const from = new Date(fromIso).setHours(0, 0, 0, 0);
            const to = new Date(toIso).setHours(0, 0, 0, 0);
            return (to - from) / 86400000;
        }

        // rating: 1(Errei)/2(Difícil)/3(Bom)/4(Fácil) — ver window.RATING.
        // Simulado/Imersão (sem UI pra escolher a nuance) mandam sempre
        // GOOD ou AGAIN, derivado automaticamente de certo/errado; só o
        // Guiado usa os 4 valores de verdade (ver rateReviewDifficulty).
        function updateReviewQueue(questionId, rating) {
            if (!questionId) return;
            const queue = getReviewQueue();
            const previous = queue[questionId];
            const today = new Date().toISOString().slice(0, 10);
            // Dias desde a ÚLTIMA revisão de verdade (não desde a data em
            // que ela estava agendada) — é o que a curva de esquecimento
            // (retrievability) precisa pra estimar corretamente o quanto
            // foi "surpreendente" lembrar agora. migrateLegacyReviewEntry
            // não tem esse dado (formato antigo não guardava) — usa o
            // próprio dueDate como aproximação só nessa primeira transição.
            const elapsedDays = previous
                ? Math.max(0, daysBetweenIsoDates(previous.lastReviewedAt || previous.dueDate || today, today))
                : 0;
            const state = previous
                ? window.nextReviewState({ stability: previous.stability, difficulty: previous.difficulty }, rating, elapsedDays)
                : window.initReviewState(rating);
            const intervalDays = window.intervalDaysForStability(state.stability);
            const due = new Date();
            due.setDate(due.getDate() + intervalDays);
            queue[questionId] = {
                stability: state.stability,
                difficulty: state.difficulty,
                dueDate: due.toISOString().slice(0, 10),
                lastReviewedAt: today,
                lastResult: rating === window.RATING.AGAIN ? 'wrong' : 'correct',
                lastRating: rating
            };
            saveReviewQueue(queue);
            updateReviewQueueHint();
            queueReviewSyncPush();
        }

        // ---------- Sincronização de histórico por conta (R-5) ----------
        // backend/src/server.js expõe /api/sync/push e /api/sync/review-
        // queue (autenticado — Firebase, mesma verificação do Worker de
        // IA), publicado no Render. Best-effort de propósito: nunca trava
        // o estudo por causa de rede — falha (offline, backend
        // hibernado no plano gratuito, etc.) é engolida, não reportada à
        // pessoa estudando; sem login, os dois fetch abaixo nem chegam a
        // sair (getIdToken() resolve null antes).
        const SYNC_API_BASE = 'https://trycktrack.onrender.com';

        // Não dispara uma requisição por questão respondida — acumula e
        // manda de uma vez quando a sessão termina (ver flushReviewSync,
        // chamada em finishExamSession/closeQuestionPlayer). Um Set de
        // IDs "sujos" desde o último envio, não a fila inteira.
        let dirtyReviewQuestionIds = new Set();
        function queueReviewSyncPush() {
            dirtyReviewQuestionIds = new Set([...dirtyReviewQuestionIds, ...Object.keys(getReviewQueue())]);
        }

        // Log de respostas individuais (QuestionResponse no backend) —
        // ao contrário da fila de revisão, é só-acrescenta (cada resposta
        // é um evento independente, não um estado que precisa de merge
        // por "mais recente"), então acumula numa lista simples até o
        // próximo flush. É o que permite (no futuro) responder "quais
        // questões exatas essa pessoa errou", coisa que o agregado local
        // (trycktrack-question-stats) nunca guardou.
        let pendingResponses = [];
        function queueResponseSyncPush(question, correct, chosen, elapsedMs) {
            if (!question?.id) return;
            pendingResponses.push({
                questionId: question.id,
                chosen: chosen ?? null,
                correct: typeof correct === 'boolean' ? correct : null,
                elapsedMs: Number.isFinite(elapsedMs) ? Math.round(elapsedMs) : undefined,
                answeredAt: new Date().toISOString()
            });
        }

        async function flushReviewSync() {
            if (!SYNC_API_BASE || (!dirtyReviewQuestionIds.size && !pendingResponses.length)) return;
            const idToken = await window.__fb?.getIdToken?.().catch(() => null);
            if (!idToken) return; // sem login -> sem sync, sem barulho
            const queue = getReviewQueue();
            const reviewEntries = {};
            dirtyReviewQuestionIds.forEach(id => { if (queue[id]) reviewEntries[id] = queue[id]; });
            dirtyReviewQuestionIds = new Set();
            const responses = pendingResponses;
            pendingResponses = [];
            if (!Object.keys(reviewEntries).length && !responses.length) return;
            try {
                const response = await fetch(`${SYNC_API_BASE}/api/sync/push`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
                    body: JSON.stringify({ reviewEntries, responses })
                });
                if (!response.ok) return;
                const { reviewQueue: serverQueue } = await response.json();
                // O servidor devolve a fila já mesclada (ele também aplica
                // "mantém a mais recente" — mergeReviewEntry, mesma função)
                // — funde de volta no local pra pegar qualquer entrada que
                // outro dispositivo tenha mandado antes deste.
                saveReviewQueue(window.mergeReviewQueues(getReviewQueue(), serverQueue));
            } catch (_) {
                // offline ou backend fora do ar — devolve pro próximo
                // flush em vez de perder o que já foi acumulado.
                pendingResponses = [...responses, ...pendingResponses];
            }
        }

        // Chamada no login (ver app-auth.js) — traz o estado do servidor e
        // funde com o local, pra um dispositivo novo (ou um que ficou
        // offline um tempo) não começar do zero nem perder o que só ele
        // tinha.
        async function pullReviewSyncFromCloud() {
            if (!SYNC_API_BASE) return;
            const idToken = await window.__fb?.getIdToken?.().catch(() => null);
            if (!idToken) return;
            try {
                const response = await fetch(`${SYNC_API_BASE}/api/sync/review-queue`, {
                    headers: { 'Authorization': `Bearer ${idToken}` }
                });
                if (!response.ok) return;
                const { reviewQueue: serverQueue } = await response.json();
                saveReviewQueue(window.mergeReviewQueues(getReviewQueue(), serverQueue));
                updateReviewQueueHint();
            } catch (_) { /* offline ou backend fora do ar — segue só com o local */ }
        }

        // Índice id -> questão dos DOIS bancos. O Internato também grava na
        // fila de revisão (recordQuestionResult não distingue banco), então
        // procurar só em TRYCKTRACK_QUESTION_BANK descartava em silêncio
        // toda revisão vinda de lá. Os bancos chegam por <script defer>, por
        // isso o índice é montado no primeiro uso e refeito quando o total
        // de questões muda, em vez de uma vez no carregamento.
        let questionIndexCache = null;
        let questionIndexSize = -1;

        function getQuestionIndex() {
            const main = Array.isArray(window.TRYCKTRACK_QUESTION_BANK) ? window.TRYCKTRACK_QUESTION_BANK : [];
            const internato = Array.isArray(window.TRYCKTRACK_INTERNATO_BANK) ? window.TRYCKTRACK_INTERNATO_BANK : [];
            const size = main.length + internato.length;
            if (questionIndexCache && questionIndexSize === size) return questionIndexCache;
            questionIndexCache = new Map();
            questionIndexSize = size;
            for (const question of main) questionIndexCache.set(question.id, question);
            for (const question of internato) questionIndexCache.set(question.id, question);
            return questionIndexCache;
        }

        function getDueReviewQuestions() {
            const queue = getReviewQueue();
            const today = new Date().toISOString().slice(0, 10);
            const index = getQuestionIndex();
            return Object.entries(queue)
                .filter(([, entry]) => entry.dueDate <= today)
                .map(([id]) => index.get(id))
                .filter(Boolean);
        }

        function updateReviewQueueHint() {
            const hint = document.getElementById('reviewQueueHint');
            if (!hint) return;
            const dueCount = getDueReviewQuestions().length;
            // "questão" -> "questões" no plural troca a terminação inteira
            // (ão -> ões), não dá pra só grudar um sufixo em "questão".
            hint.textContent = dueCount
                ? `${dueCount} ${dueCount > 1 ? 'questões prontas' : 'questão pronta'} pra rever agora.`
                : 'Questões que você errou, no momento certo de rever.';
        }

        async function startReviewSession() {
            const questions = getDueReviewQuestions();
            if (!questions.length) {
                revealQuestionNotice('Nenhuma questão pronta pra revisão agora — volte mais tarde.');
                return;
            }
            // A fila de revisão mistura os dois bancos (ver C-2/getQuestionIndex)
            // — uma sessão de revisão pode devolver questões do Internato e do
            // banco principal juntas, então carrega as explicações dos dois.
            await Promise.all([
                ensureQuestionExplanationsLoaded().catch(() => {}),
                ensureInternatoExplanationsLoaded().catch(() => {})
            ]);
            activeQuestionSession = { mode: 'practice', questions, index: 0, answers: [], startedAt: new Date().toISOString(), isReview: true };
            document.getElementById('questionPlayer').hidden = false;
            document.body.style.overflow = 'hidden';
            renderQuestionPlayer();
        }

        // Tempo de estudo: soma a duração de cada sessão de questões ao
        // total acumulado. Chamado uma vez por sessão concluída (não por
        // questão), a partir de session.startedAt.
        function recordStudyMinutes(session) {
            const startedAt = session?.startedAt ? new Date(session.startedAt).getTime() : NaN;
            if (!Number.isFinite(startedAt)) return;
            const minutes = Math.round((Date.now() - startedAt) / 60000);
            if (minutes <= 0) return;
            const stats = getQuestionStats();
            stats.studyMinutes = Number(stats.studyMinutes || 0) + minutes;
            localStorage.setItem('trycktrack-question-stats', JSON.stringify(stats));
        }

        function updateQuestionHubStats() {
            const stats = getQuestionStats();
            const answered = Number(stats.answered || 0);
            const correct = Number(stats.correct || 0);
            const answeredEl = document.getElementById('questionAnsweredStat');
            const accuracyEl = document.getElementById('questionAccuracyStat');
            if (answeredEl) answeredEl.textContent = answered;
            if (accuracyEl) accuracyEl.textContent = answered ? `${Math.round((correct / answered) * 100)}%` : '—';
        }

        // A entrada dos cards agora é uma @keyframes pura em app.css — o
        // navegador dispara a animação sozinho sempre que um elemento com
        // a classe .card-reveal passa a ser renderizado (display:none ->
        // visível ao trocar de aba, ou inserido no DOM por um render
        // dinâmico). Essa função só GARANTE que a classe esteja presente
        // — não há observer, não há leitura de layout, não há timing pra
        // acertar. Isso substitui uma versão anterior baseada em
        // IntersectionObserver + getBoundingClientRect que reagia tarde
        // demais sob carga (cards presos em opacity:0 por tempo
        // perceptível) e cuja leitura de layout forçada competia com a
        // própria animação de troca de aba (o "engasgo" relatado).
        const CARD_REVEAL_SELECTOR = [
            '.rr-card', '.exam-countdown-card', '.question-hero', '.question-mode',
            '.question-count-control', '.question-session', '.question-coming',
            '.dashboard-hero', '.dashboard-kpi', '.dashboard-card', '.dashboard-area',
            '.dashboard-empty', '.trail-switch-button', '.trail-status', '.trail-phase'
        ].join(', ');

        function tagCardReveal(container) {
            (container || document).querySelectorAll(CARD_REVEAL_SELECTOR).forEach(card => {
                card.classList.add('card-reveal');
            });
        }

        // Vários cards/itens de navegação são <div onclick="..."> em vez de
        // <button> — herdados de quando a marcação foi escrita rápido e
        // nunca revisitados. Convertê-los todos para <button> mudaria
        // estilo padrão do navegador (borda, fundo, fonte) em muitos
        // componentes já estilizados; em vez disso, esta função dá a eles
        // o mesmo tratamento (role="button", tabindex, Enter/Espaço) que
        // .sidebar-profile-header já usava manualmente — assim funcionam
        // com teclado e leitor de tela sem versionar o CSS de novo.
        // Backdrops (fecham ao clicar fora) ficam de fora de propósito:
        // não são um controle para tabular até, são só a área de fechar.
        function enhanceClickableDivsForKeyboard(root) {
            (root || document).querySelectorAll('div[onclick]').forEach(el => {
                if (el.hasAttribute('role') || /backdrop/i.test(el.className)) return;
                el.setAttribute('role', 'button');
                if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
                el.addEventListener('keydown', event => {
                    if (event.key !== 'Enter' && event.key !== ' ') return;
                    event.preventDefault();
                    el.click();
                });
            });
        }

        function setupCardReveal() {
            const content = document.querySelector('.content');
            // tagCardReveal e enhanceClickableDivsForKeyboard agora só
            // adicionam classe/atributos (nada de observer, nada de
            // leitura de layout) — bem mais barato que a versão anterior,
            // então coalescer por requestAnimationFrame aqui é só pra não
            // repetir a varredura a cada mutação individual de uma rajada
            // grande (ex.: montar a grade toda do Simulado), não mais uma
            // exigência pra evitar travamento.
            // Reagir a mutação varrendo TODO o .content (todas as abas,
            // não só a visível) a cada innerHTML trocado em qualquer lugar
            // é caro em hardware real — foi a causa de um travamento sério
            // ao trocar de aba. Em vez de re-escanear tudo, escaneamos só
            // os nós que de fato foram adicionados nesta leva de mutações.
            let scheduled = false;
            let pendingNodes = new Set();
            const schedule = mutations => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) pendingNodes.add(node);
                    });
                });
                if (scheduled) return;
                scheduled = true;
                requestAnimationFrame(() => {
                    scheduled = false;
                    const nodes = pendingNodes;
                    pendingNodes = new Set();
                    nodes.forEach(node => {
                        if (!node.isConnected) return;
                        if (node.matches(CARD_REVEAL_SELECTOR)) node.classList.add('card-reveal');
                        tagCardReveal(node);
                        if (node.matches('div[onclick]')) enhanceClickableDivsForKeyboard(node.parentNode);
                        else enhanceClickableDivsForKeyboard(node);
                    });
                });
            };
            new MutationObserver(schedule)
                .observe(content || document.body, { childList: true, subtree: true });
            tagCardReveal(content || document.body);
        }

        window.addEventListener('DOMContentLoaded', () => {
            animarProgresso(document.getElementById('inicioTab'));
            updateQuestionHubStats();
            syncRapidReviewMenu();
            renderTrails();
            setupCardReveal();
            // Cobre o que está fora de .content desde o primeiro parse
            // (nav inferior, avatar, rodapé do leitor) — o resto (dentro
            // de .content) já é pego pelo observer acima.
            enhanceClickableDivsForKeyboard(document);
        });
