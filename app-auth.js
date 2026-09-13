        // Usada por código em app-auth.js, app-reader.js e app-app.js —
        // fica logo no início do primeiro arquivo carregado (nenhum defer
        // aqui, os três executam em sequência, sincronamente, na ordem em
        // que os <script src> aparecem no index.html) porque algumas
        // funções já são chamadas no nível superior do próprio app-auth.js
        // (ex.: renderCurrentUser()), antes de app-app.js sequer começar
        // a carregar.
        function escapeHtml(value) { return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])); }

        /* ============================================================
           AUTENTICAÇÃO — UI e integração com window.__fb (Firebase)
           ------------------------------------------------------------
           As credenciais do projeto Firebase ficam no bloco <script
           type="module"> logo acima. Configuração do lado do Firebase
           necessária para isto funcionar de ponta a ponta:
           1. Console → Authentication → Sign-in method: ativar
              "Email/senha" e "Google".
           2. Console → Firestore Database: criar o banco (modo
              produção).
           3. Firestore → Regras:
                rules_version = '2';
                service cloud.firestore {
                  match /databases/{database}/documents {
                    match /users/{userId} {
                      allow read, write: if request.auth != null && request.auth.uid == userId;
                    }
                  }
                }
           Se o Firebase falhar ao inicializar (rede bloqueada, config
           inválida etc.), o app libera o acesso direto, sem tela de
           login, para não travar o uso local.
           ============================================================ */
        let firebaseReady = false;
        let currentFirebaseUser = null;
        let authMode = 'signin'; // 'signin' | 'signup'

        function toggleAuthMode() {
            authMode = authMode === 'signin' ? 'signup' : 'signin';
            updateAuthUI();
        }

        function updateAuthUI() {
            const nameField = document.getElementById('authNameField');
            const submitBtn = document.getElementById('authSubmitBtn');
            const switchText = document.getElementById('authSwitchText');
            const switchBtn = document.getElementById('authSwitchBtn');
            hideAuthError();
            if (authMode === 'signup') {
                nameField.hidden = false;
                submitBtn.textContent = 'Criar conta';
                switchText.textContent = 'Já tem conta?';
                switchBtn.textContent = 'Entrar';
            } else {
                nameField.hidden = true;
                submitBtn.textContent = 'Entrar';
                switchText.textContent = 'Não tem conta?';
                switchBtn.textContent = 'Criar conta';
            }
        }

        function showAuthError(message) {
            const el = document.getElementById('authError');
            el.textContent = message;
            el.hidden = false;
        }

        function hideAuthError() {
            const el = document.getElementById('authError');
            el.hidden = true;
            el.textContent = '';
        }

        function authErrorMessage(code) {
            const map = {
                'auth/invalid-email': 'Email inválido.',
                'auth/user-disabled': 'Esta conta foi desativada.',
                'auth/user-not-found': 'Não encontramos uma conta com este email.',
                'auth/wrong-password': 'Senha incorreta.',
                'auth/invalid-credential': 'Email ou senha incorretos.',
                'auth/email-already-in-use': 'Já existe uma conta com este email.',
                'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
                'auth/too-many-requests': 'Muitas tentativas. Tente novamente em alguns minutos.',
                'auth/network-request-failed': 'Falha de conexão. Verifique sua internet.',
                'auth/popup-closed-by-user': 'Login cancelado.',
                'auth/configuration-not-found': 'O login por email/senha ainda não foi ativado no Firebase (Console → Authentication → Sign-in method).',
                'auth/operation-not-allowed': 'Este método de login ainda não foi ativado no Firebase (Console → Authentication → Sign-in method).',
                'auth/unauthorized-domain': 'Este domínio ainda não está autorizado no Firebase (Console → Authentication → Settings → Authorized domains).'
            };
            return map[code] || 'Não foi possível concluir. Tente novamente.';
        }

        async function handleAuthSubmit(event) {
            event.preventDefault();
            if (!firebaseReady) { showAuthError('Login ainda não configurado neste app.'); return; }
            hideAuthError();
            const email = document.getElementById('authEmail').value.trim();
            const password = document.getElementById('authPassword').value;
            const name = document.getElementById('authName').value.trim();
            const submitBtn = document.getElementById('authSubmitBtn');
            submitBtn.disabled = true;
            submitBtn.textContent = authMode === 'signup' ? 'Criando conta...' : 'Entrando...';
            try {
                if (authMode === 'signup') {
                    await window.__fb.signUp(email, password, name);
                } else {
                    await window.__fb.signIn(email, password);
                }
                // O listener de onAuthStateChanged pode ter disparado
                // antes do updateProfile (nome) terminar — busca o
                // usuário mais atualizado e re-renderiza para não
                // mostrar o email no lugar do nome logo após o cadastro.
                currentFirebaseUser = window.__fb.getCurrentUser();
                renderCurrentUser();
                updateHeaderTitle('inicio');
            } catch (e) {
                submitBtn.disabled = false;
                submitBtn.textContent = authMode === 'signup' ? 'Criar conta' : 'Entrar';
                showAuthError(authErrorMessage(e.code));
            }
        }

        async function handleGoogleSignIn() {
            if (!firebaseReady) { showAuthError('Login ainda não configurado neste app.'); return; }
            hideAuthError();
            try {
                await window.__fb.signInWithGoogle();
            } catch (e) {
                if (e.code !== 'auth/popup-closed-by-user') showAuthError(authErrorMessage(e.code));
            }
        }

        function handleSignOut() {
            if (!firebaseReady) return;
            window.__fb.signOut();
        }

        async function syncProgressFromCloud(uid) {
            try {
                const cloudProgress = await window.__fb.getProgress(uid);
                if (cloudProgress) {
                    saveProgressData(cloudProgress);
                } else {
                    const local = getProgressData();
                    if (Object.keys(local).length > 0) {
                        await window.__fb.setProgress(uid, local);
                    }
                }
            } catch (e) {
                console.error('Falha ao sincronizar progresso:', e);
            }
            updateAllCardProgress();
            renderLastReadCard();
        }

        function pushProgressToCloud(data) {
            if (!firebaseReady || !currentFirebaseUser) return;
            // setDoc() do Firestore pode lançar de forma SÍNCRONA (antes de
            // devolver uma Promise) se algum campo vier "undefined" — sem
            // o try/catch aqui, isso quebraria quem chamou esta função no
            // meio da execução, antes de terminar o que estava fazendo.
            try {
                window.__fb.setProgress(currentFirebaseUser.uid, data)
                    .catch(e => console.error('Falha ao salvar progresso na nuvem:', e));
            } catch (e) { console.error('Falha ao salvar progresso na nuvem:', e); }
        }

        async function syncProfilePhotoFromCloud(uid) {
            try {
                const cloudPhoto = await window.__fb.getProfilePhoto(uid);
                if (cloudPhoto) {
                    localStorage.setItem(PROFILE_PHOTO_STORAGE_KEY, cloudPhoto);
                } else {
                    const local = getStoredProfilePhoto();
                    if (local) await window.__fb.setProfilePhoto(uid, local);
                }
            } catch (e) {
                console.error('Falha ao sincronizar foto de perfil:', e);
            }
            renderCurrentUser();
        }

        function pushProfilePhotoToCloud(dataUrl) {
            if (!firebaseReady || !currentFirebaseUser) return;
            try {
                window.__fb.setProfilePhoto(currentFirebaseUser.uid, dataUrl)
                    .catch(e => console.error('Falha ao salvar foto de perfil na nuvem:', e));
            } catch (e) { console.error('Falha ao salvar foto de perfil na nuvem:', e); }
        }

        /* ============================================================
           HISTÓRICO DE SESSÕES DE QUESTÕES — guarda um retrato leve de
           cada sessão concluída (Guiado/Simulado/Imersão) com data/hora de
           início, para poder reabrir e revisar acertos/erros depois, na
           aba Dashboard. Sincroniza com a conta do mesmo jeito que a foto
           de perfil e o progresso do Rapid Review.
           ============================================================ */
        const QUESTION_HISTORY_KEY = 'trycktrack-question-history-v1';
        const QUESTION_HISTORY_MAX = 30; // limite para não inchar o localStorage/Firestore

        function getQuestionHistory() {
            try { return JSON.parse(localStorage.getItem(QUESTION_HISTORY_KEY) || '[]'); }
            catch (_) { return []; }
        }

        function saveQuestionHistory(list) {
            try { localStorage.setItem(QUESTION_HISTORY_KEY, JSON.stringify(list)); }
            catch (_) { /* armazenamento indisponível/cheio — segue sem persistir */ }
        }

        // Reconstrói uma questão do histórico a partir do seu ID, buscando
        // no banco já carregado no cliente (window.TRYCKTRACK_QUESTION_BANK)
        // em vez de guardar o conteúdo inteiro (enunciado, alternativas,
        // explicação) dentro de cada sessão salva. Guardar o conteúdo é o
        // que fazia o documento do usuário no Firestore se aproximar do
        // teto de 1MB com poucas dezenas de sessões — o ID sozinho custa
        // menos de 1% disso.
        // Aceita os dois formatos: string (ID, formato atual) ou objeto
        // (retrato completo, formato antigo — sessões salvas antes desta
        // mudança), para não quebrar o histórico de quem já tinha sessões
        // gravadas.
        function resolveHistoryQuestion(item) {
            if (item && typeof item === 'object') return item;
            const bank = Array.isArray(window.TRYCKTRACK_QUESTION_BANK) ? window.TRYCKTRACK_QUESTION_BANK : [];
            return bank.find(q => q.id === item) || {
                id: item, number: null, area: '', source: '', stem: 'Esta questão não foi encontrada no banco atual.',
                options: {}, answer: null, explanation: '', questionType: null, annulled: false, needsVisualReview: false,
            };
        }

        function buildQuestionHistoryEntry(session, correctCount) {
            const areas = [...new Set(session.questions.map(q => q.area).filter(Boolean))];
            // Discursivas não pontuam — não entram no denominador do
            // desempenho da sessão, senão "8/10" mentiria sobre uma
            // sessão em que só 8 questões tinham gabarito de letra.
            const scoredTotal = session.questions.filter(q => q.questionType !== 'discursive').length;
            return {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                mode: session.mode,
                startedAt: session.startedAt || new Date().toISOString(),
                finishedAt: new Date().toISOString(),
                correct: correctCount,
                total: scoredTotal,
                area: areas.length === 1 ? areas[0] : (areas.length ? 'Áreas mistas' : ''),
                // Só o ID — o conteúdo é resolvido de volta pelo banco na
                // hora de exibir (resolveHistoryQuestion). Ver comentário
                // acima.
                questions: session.questions.map(q => q.id ?? null),
                answers: session.answers.map(a => a ?? null),
                // R-05 (versão inicial): tempo de tela por questão, em ms —
                // um objeto esparso ({ "0": 42000, "2": 118000, ... }), só
                // com as questões que de fato foram exibidas.
                questionTimesMs: session.questionTimesMs || {},
            };
        }

        function appendQuestionHistory(entry) {
            const list = [entry, ...getQuestionHistory()].slice(0, QUESTION_HISTORY_MAX);
            saveQuestionHistory(list);
            pushQuestionHistoryToCloud(list);
            return list;
        }

        function pushQuestionHistoryToCloud(list) {
            if (!firebaseReady || !currentFirebaseUser) return;
            try {
                window.__fb.setQuestionHistory(currentFirebaseUser.uid, list)
                    .catch(e => console.error('Falha ao salvar histórico de questões na nuvem:', e));
            } catch (e) { console.error('Falha ao salvar histórico de questões na nuvem:', e); }
        }

        async function syncQuestionHistoryFromCloud(uid) {
            try {
                const cloud = await window.__fb.getQuestionHistory(uid);
                if (cloud && cloud.length) {
                    saveQuestionHistory(cloud);
                } else {
                    const local = getQuestionHistory();
                    if (local.length) await window.__fb.setQuestionHistory(uid, local);
                }
            } catch (e) {
                console.error('Falha ao sincronizar histórico de questões:', e);
            }
            renderDashboard();
        }

        function openQuestionHistoryEntry(id) {
            const entry = getQuestionHistory().find(item => item.id === id);
            if (!entry) return;
            document.getElementById('questionPlayer').hidden = false;
            document.body.style.overflow = 'hidden';
            showQuestionResults({ ...entry, questions: (entry.questions || []).map(resolveHistoryQuestion) });
        }

        function formatQuestionHistoryDate(iso) {
            try {
                const date = new Date(iso);
                const dateLabel = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                const timeLabel = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                return `${dateLabel} · ${timeLabel}`;
            } catch (_) { return ''; }
        }

        function animateSplashIntoApp() {
            // A marca do splash e a marca do cabeçalho são independentes.
            // Isso evita que a animação atravesse cards ou o conteúdo inicial.
            showApp();
        }

        function showApp() {
            document.getElementById('authScreen').hidden = true;
            document.getElementById('appContainer').hidden = false;
            const nav = document.querySelector('.bottom-nav');
            if (nav) nav.hidden = false;
            if (window.moveNavIndicator) window.moveNavIndicator(0, true);
            renderCurrentUser();
            updateHeaderTitle('inicio');
            renderFeedbackBanner();
            if (!hasSeenOnboarding()) openOnboarding();
        }

        /* ============================================================
           TUTORIAL DE PRIMEIRO ACESSO — aparece uma vez (por dispositivo)
           na primeira vez que o app abre: apresenta o menu e depois como
           o app funciona. Pode ser revisto a qualquer momento em Ajuda.
           ============================================================ */
        const ONBOARDING_KEY = 'trycktrack-onboarding-done-v1';
        function hasSeenOnboarding() {
            try { return localStorage.getItem(ONBOARDING_KEY) === '1'; } catch (_) { return false; }
        }
        function markOnboardingSeen() {
            try { localStorage.setItem(ONBOARDING_KEY, '1'); } catch (_) { /* sem storage disponível */ }
        }

        const ONBOARDING_SLIDES = [
            {
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v16l16-8Z"/></svg>',
                title: 'Bem-vindo ao trycktrack',
                body: '<p>Seu espaço para revisar rápido, treinar questões e acompanhar sua evolução até a prova. Vamos te mostrar rapidinho como tudo funciona — leva menos de um minuto.</p>'
            },
            {
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="6" y1="20" x2="6" y2="13"/><line x1="12" y1="20" x2="12" y2="5"/><line x1="18" y1="20" x2="18" y2="10"/></svg>',
                title: 'O menu principal',
                body: `<div class="onboarding-menu-list">
                    <div class="onboarding-menu-item"><span class="onboarding-menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1V10.5Z"/></svg></span><div><strong>Início</strong><span>Contagem para a prova, atalho para continuar de onde parou.</span></div></div>
                    <div class="onboarding-menu-item"><span class="onboarding-menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="4.2" cy="6" r="1.15" fill="currentColor" stroke="none"/><line x1="8.5" y1="6" x2="20" y2="6"/><circle cx="4.2" cy="12" r="1.15" fill="currentColor" stroke="none"/><line x1="8.5" y1="12" x2="20" y2="12"/><circle cx="4.2" cy="18" r="1.15" fill="currentColor" stroke="none"/><line x1="8.5" y1="18" x2="20" y2="18"/></svg></span><div><strong>Trilhas</strong><span>Fases de estudo organizadas por objetivo, passo a passo.</span></div></div>
                    <div class="onboarding-menu-item"><span class="onboarding-menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M8 12.3 10.8 15 16 8.5"/></svg></span><div><strong>QuestHub</strong><span>Pratique no Guiado, Simulado, OSCE ou Imersão completa.</span></div></div>
                    <div class="onboarding-menu-item"><span class="onboarding-menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="6" y1="20" x2="6" y2="13"/><line x1="12" y1="20" x2="12" y2="5"/><line x1="18" y1="20" x2="18" y2="10"/></svg></span><div><strong>Dashboard</strong><span>Seu desempenho geral e o histórico de todas as sessões.</span></div></div>
                    <div class="onboarding-menu-item"><span class="onboarding-menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v5a6 6 0 0 0 12 0V3"/><path d="M3.7 3h2.6M15.7 3h2.6"/></svg></span><div><strong>Rapid Review</strong><span>Resumos rápidos por grande área, para revisar antes da prova.</span></div></div>
                </div>`
            },
            {
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg>',
                title: 'Como o app funciona',
                body: '<p>Leia os temas no <strong>Rapid Review</strong>, treine o que aprendeu no <strong>QuestHub</strong> e acompanhe tudo no <strong>Dashboard</strong> — inclusive revisitando sessões antigas para rever o que errou. As <strong>Trilhas</strong> ajudam a organizar essa rotina por etapas.</p>'
            },
            {
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
                title: 'Pronto para começar',
                body: '<p>Você pode rever este tutorial quando quiser, em <strong>Perfil → Ajuda</strong>. Bons estudos!</p>',
                last: true
            }
        ];
        let onboardingStep = 0;

        function openOnboarding() {
            onboardingStep = 0;
            renderOnboardingStep();
            document.getElementById('onboardingOverlay').hidden = false;
            requestAnimationFrame(() => document.getElementById('onboardingOverlay').classList.add('active'));
        }

        function renderOnboardingStep() {
            const slide = ONBOARDING_SLIDES[onboardingStep];
            document.getElementById('onboardingSlide').innerHTML = `<div class="onboarding-slide-icon">${slide.icon}</div><h2 id="onboardingTitle">${slide.title}</h2>${slide.body}`;
            document.getElementById('onboardingDots').innerHTML = ONBOARDING_SLIDES.map((_, i) => `<span class="${i === onboardingStep ? 'active' : ''}"></span>`).join('');
            document.getElementById('onboardingNextBtn').textContent = slide.last ? 'Começar a usar' : 'Avançar';
            document.getElementById('onboardingSlide').closest('.onboarding-card').scrollTop = 0;
        }

        function nextOnboardingStep() {
            if (onboardingStep < ONBOARDING_SLIDES.length - 1) {
                onboardingStep += 1;
                renderOnboardingStep();
            } else {
                closeOnboarding();
            }
        }

        function skipOnboarding() { closeOnboarding(); }

        function closeOnboarding() {
            markOnboardingSeen();
            const overlay = document.getElementById('onboardingOverlay');
            overlay.classList.remove('active');
            setTimeout(() => { overlay.hidden = true; }, 250);
        }

        /* ============================================================
           BANNER "APP NOVO" + CAIXA DE SUGESTÃO — as mensagens enviadas
           vão para a coleção "feedback" no Firestore, visível no Console
           do Firebase (Firestore Database > feedback) para quem administra
           o projeto.
           ============================================================ */
        const FEEDBACK_BANNER_KEY = 'trycktrack-feedback-banner-dismissed-v1';

        function renderFeedbackBanner() {
            const slot = document.getElementById('feedbackBannerSlot');
            if (!slot) return;
            let dismissed = false;
            try { dismissed = localStorage.getItem(FEEDBACK_BANNER_KEY) === '1'; } catch (_) { /* ignora */ }
            if (dismissed) { slot.innerHTML = ''; return; }
            slot.innerHTML = `<div class="feedback-banner">
                <button type="button" class="feedback-banner-close" onclick="dismissFeedbackBanner()" aria-label="Dispensar aviso">×</button>
                <div class="feedback-banner-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg></div>
                <div class="feedback-banner-copy">
                    <strong>O trycktrack é um app novo</strong>
                    <p>Ainda estamos construindo e melhorando tudo. Se algo travou, ficou confuso ou faltou, seu retorno ajuda muito.</p>
                    <div class="feedback-banner-actions">
                        <button type="button" class="feedback-banner-btn" onclick="openFeedbackModal()">Enviar sugestão</button>
                        <button type="button" class="feedback-banner-dismiss-btn" onclick="dismissFeedbackBanner()">Agora não</button>
                    </div>
                </div>
            </div>`;
        }

        function dismissFeedbackBanner() {
            try { localStorage.setItem(FEEDBACK_BANNER_KEY, '1'); } catch (_) { /* ignora */ }
            renderFeedbackBanner();
        }

        function openFeedbackModal() {
            document.getElementById('sidebar')?.classList.remove('active');
            document.getElementById('sidebarBackdrop')?.classList.remove('active');
            document.getElementById('feedbackModalText').value = '';
            document.getElementById('feedbackModalStatus').textContent = '';
            document.getElementById('feedbackModalBackdrop').classList.add('active');
        }

        function closeFeedbackModal() {
            document.getElementById('feedbackModalBackdrop').classList.remove('active');
        }

        async function submitFeedbackMessage() {
            const textEl = document.getElementById('feedbackModalText');
            const statusEl = document.getElementById('feedbackModalStatus');
            const message = textEl.value.trim();
            if (!message) { statusEl.textContent = 'Escreva algo antes de enviar.'; return; }
            const btn = document.getElementById('feedbackModalSubmitBtn');
            btn.disabled = true;
            statusEl.textContent = 'Enviando...';
            const payload = {
                message,
                userEmail: currentFirebaseUser?.email || null,
                userId: currentFirebaseUser?.uid || null,
                page: document.querySelector('.tab-content.active')?.id || null,
            };
            try {
                if (firebaseReady) {
                    await window.__fb.submitFeedback(payload);
                    statusEl.textContent = 'Obrigado! Sua sugestão foi enviada.';
                    textEl.value = '';
                    setTimeout(closeFeedbackModal, 1400);
                } else {
                    statusEl.textContent = 'Sem conexão com o servidor agora — tente novamente mais tarde.';
                }
            } catch (e) {
                console.error('Falha ao enviar feedback:', e);
                statusEl.textContent = 'Não foi possível enviar agora. Tente novamente.';
            } finally {
                btn.disabled = false;
            }
        }

        function showAuthScreen() {
            document.getElementById('appContainer').hidden = true;
            document.getElementById('authScreen').hidden = false;
            const nav = document.querySelector('.bottom-nav');
            if (nav) nav.hidden = true;
        }

        // Tira a classe .splash do card: a logo encolhe pro tamanho
        // final e .auth-extra (formulário, Google, etc.) se expande —
        // toda a transição é feita em CSS a partir dessa única troca
        // de classe.
        function revealLoginForm() {
            showAuthScreen();
            const card = document.getElementById('authCard');
            // A própria expansão do formulário reposiciona a marca para
            // cima. Não aplicamos compensação FLIP aqui, pois ela criava
            // um breve movimento para baixo antes da subida.
            card.classList.remove('splash');
        }

        function releaseAppWithoutLogin() {
            // Sem Firebase disponível (config inválida, rede bloqueada
            // etc.) — libera o app direto, sem formulário de login, pra
            // não travar o uso local. O splash ainda aparece por um
            // instante (é a própria #authScreen), só não abre o form.
            showApp();
        }

        // ------------------------------------------------------------
        // Splash de abertura: a #authScreen já nasce visível no HTML
        // (só com a logo, via .auth-card.splash), então o "menos de um
        // segundo" pedido é só isso renderizando antes de qualquer JS.
        // Daqui pra frente, só decide o que vem DEPOIS do splash: some
        // no app (usuário já logado / Firebase indisponível) ou abre o
        // formulário completo (revealLoginForm). Espera as duas coisas
        // — o tempo mínimo de splash E a autenticação resolvida — antes
        // de agir, pra nunca "piscar" a decisão errada primeiro.
        // ------------------------------------------------------------
        const SPLASH_MIN_MS = 700;
        let splashMinTimeDone = false;
        let authDecision; // undefined | 'app' | 'login'

        function proceedAfterSplash() {
            if (!splashMinTimeDone || authDecision === undefined) return;
            if (authDecision === 'app') {
                animateSplashIntoApp();
            } else {
                revealLoginForm();
            }
        }

        setTimeout(function () {
            splashMinTimeDone = true;
            proceedAfterSplash();
        }, SPLASH_MIN_MS);

        // Rede lenta, bloqueada, ou o módulo do Firebase falhou antes de
        // conseguir disparar 'firebase-ready' — não deixa a pessoa presa
        // no splash pra sempre.
        setTimeout(function () {
            if (authDecision === undefined) {
                authDecision = 'app';
                proceedAfterSplash();
            }
        }, 5000);

        // O bloco <script type="module"> que inicializa o Firebase roda
        // depois deste script (módulos são sempre deferidos), por isso
        // toda a integração com window.__fb só pode começar aqui, a
        // partir deste evento — nunca no nível superior do script.
        window.addEventListener('firebase-ready', function (event) {
            firebaseReady = !!(event.detail && event.detail.ready);
            if (firebaseReady) {
                window.__fb.onAuthStateChanged(function (user) {
                    // Usa sempre o usuário mais atual (auth.currentUser)
                    // em vez do objeto recebido aqui: este listener pode
                    // disparar com uma referência antiga do usuário —
                    // de antes de um updateProfile(nome) terminar, por
                    // exemplo — e sobrescrever dados mais recentes.
                    currentFirebaseUser = user ? window.__fb.getCurrentUser() : null;
                    if (currentFirebaseUser) {
                        syncProgressFromCloud(currentFirebaseUser.uid);
                        syncProfilePhotoFromCloud(currentFirebaseUser.uid);
                        syncQuestionHistoryFromCloud(currentFirebaseUser.uid);
                        authDecision = 'app';
                    } else {
                        authDecision = 'login';
                    }
                    proceedAfterSplash();
                });
            } else {
                authDecision = 'app';
                proceedAfterSplash();
            }
        });

        /* ============================================================
           USUÁRIO ATUAL
           Lê da conta autenticada via Firebase quando disponível; cai
           para o placeholder "Estudante" fora do modo logado (config
           do Firebase ainda não preenchida). Tudo que mostra nome/
           iniciais do usuário (saudação, avatar) lê daqui, nunca de
           texto fixo espalhado pelo HTML.
           ============================================================ */
        function getCurrentUser() {
            if (currentFirebaseUser) {
                const name = (currentFirebaseUser.displayName || currentFirebaseUser.email || 'Estudante').trim();
                const parts = name.split(' ').filter(Boolean);
                return {
                    firstName: parts[0] || 'Estudante',
                    secondName: parts[1] || '',
                    lastName: parts.slice(1).join(' ') || ''
                };
            }
            return { firstName: 'Estudante', secondName: '', lastName: '' };
        }

        const PROFILE_PHOTO_STORAGE_KEY = 'trycktrack-profile-photo-v1';

        function getStoredProfilePhoto() {
            try { return localStorage.getItem(PROFILE_PHOTO_STORAGE_KEY) || ''; }
            catch (_) { return ''; }
        }

        function renderCurrentUser() {
            const user = getCurrentUser();
            const initials = ((user.firstName[0] || '') + (user.secondName[0] || '')).toUpperCase() || 'E';
            const displayName = [user.firstName, user.secondName].filter(Boolean).join(' ') || 'Estudante';
            const email = currentFirebaseUser?.email || 'Conta local';
            const photo = getStoredProfilePhoto();
            const avatarMarkup = photo
                ? `<img src="${escapeHtml(photo)}" alt="Foto do perfil">`
                : escapeHtml(initials);

            const avatarEl = document.getElementById('avatarTrigger');
            if (avatarEl) avatarEl.innerHTML = avatarMarkup;

            const sidebarAvatar = document.getElementById('sidebarProfileAvatar');
            if (sidebarAvatar) sidebarAvatar.innerHTML = avatarMarkup;
            const sidebarName = document.getElementById('sidebarProfileName');
            if (sidebarName) sidebarName.textContent = displayName;
            const sidebarEmail = document.getElementById('sidebarProfileEmail');
            if (sidebarEmail) sidebarEmail.textContent = email;
        }

        let profileCropState = null;

        function drawProfileCrop() {
            if (!profileCropState) return;
            const { image, zoom, x, y } = profileCropState;
            const canvas = document.getElementById('profileCropCanvas');
            if (!canvas) return;
            const context = canvas.getContext('2d');
            const size = Math.min(image.naturalWidth, image.naturalHeight) / zoom;
            const sx = (image.naturalWidth - size) / 2 + x * (image.naturalWidth - size) / 2;
            const sy = (image.naturalHeight - size) / 2 + y * (image.naturalHeight - size) / 2;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = '#191622';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, sx, sy, size, size, 0, 0, canvas.width, canvas.height);
        }

        function updateProfileCrop(axis, value) {
            if (!profileCropState) return;
            profileCropState[axis] = Number(value);
            drawProfileCrop();
        }

        function closeProfileCrop() {
            document.getElementById('profileCropBackdrop')?.classList.remove('active');
            profileCropState = null;
        }

        function openProfileCrop(file) {
            const reader = new FileReader();
            reader.onload = event => {
                const image = new Image();
                image.onload = () => {
                    profileCropState = { image, zoom: 1, x: 0, y: 0, dragging: false, startX: 0, startY: 0, startCropX: 0, startCropY: 0 };
                    ['profileCropZoom', 'profileCropX', 'profileCropY'].forEach(id => { const el = document.getElementById(id); if (el) el.value = id === 'profileCropZoom' ? '1' : '0'; });
                    document.getElementById('profileCropBackdrop')?.classList.add('active');
                    drawProfileCrop();
                };
                image.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }

        function handleProfilePhotoChange(input) {
            const file = input?.files?.[0];
            if (!file || !file.type.startsWith('image/')) return;
            openProfileCrop(file);
            input.value = '';
        }

        function saveProfileCrop() {
            if (!profileCropState) return;
            const canvas = document.getElementById('profileCropCanvas');
            try {
                const dataUrl = canvas.toDataURL('image/jpeg', .86);
                localStorage.setItem(PROFILE_PHOTO_STORAGE_KEY, dataUrl);
                pushProfilePhotoToCloud(dataUrl);
                closeProfileCrop();
                renderCurrentUser();
                openSidebarPanel('perfil');
            } catch (_) {
                alert('Não foi possível salvar esta foto neste dispositivo.');
            }
        }

        (function setupProfileCropDrag() {
            const stage = document.getElementById('profileCropStage');
            if (!stage) return;
            stage.addEventListener('pointerdown', event => {
                if (!profileCropState) return;
                profileCropState.dragging = true;
                profileCropState.startX = event.clientX;
                profileCropState.startY = event.clientY;
                profileCropState.startCropX = profileCropState.x;
                profileCropState.startCropY = profileCropState.y;
                stage.setPointerCapture?.(event.pointerId);
            });
            stage.addEventListener('pointermove', event => {
                if (!profileCropState?.dragging) return;
                const distance = Math.max(1, stage.clientWidth);
                const delta = 2 / Math.max(1, profileCropState.zoom);
                profileCropState.x = Math.max(-1, Math.min(1, profileCropState.startCropX - ((event.clientX - profileCropState.startX) / distance) * delta));
                profileCropState.y = Math.max(-1, Math.min(1, profileCropState.startCropY - ((event.clientY - profileCropState.startY) / distance) * delta));
                document.getElementById('profileCropX').value = profileCropState.x;
                document.getElementById('profileCropY').value = profileCropState.y;
                drawProfileCrop();
            });
            stage.addEventListener('pointerup', () => { if (profileCropState) profileCropState.dragging = false; });
            stage.addEventListener('pointercancel', () => { if (profileCropState) profileCropState.dragging = false; });
        })();

        function removeProfilePhoto() {
            localStorage.removeItem(PROFILE_PHOTO_STORAGE_KEY);
            if (firebaseReady && currentFirebaseUser) {
                window.__fb.deleteProfilePhoto(currentFirebaseUser.uid)
                    .catch(e => console.error('Falha ao remover foto de perfil na nuvem:', e));
            }
            renderCurrentUser();
            openSidebarPanel('perfil');
        }

        renderCurrentUser();

        // A saudação com o nome só aparece na Início. Nas outras abas, o
        // mesmo espaço no topo vira o título da página — por isso os <h2>
        // internos de cada aba foram removidos, pra não duplicar o título.
        const PAGE_TITLES = {
            trilhas: 'Trilhas',
            review: 'Rapid Review',
            questoes: 'QuestHub',
            metricas: 'Dashboard'
        };

        function updateHeaderTitle(pagina) {
            const greetingEl = document.getElementById('greetingName');
            if (!greetingEl) return;
            const dashboardPeriod = document.getElementById('dashboardHeaderPeriod');
            if (dashboardPeriod) {
                const isDashboard = pagina === 'metricas';
                dashboardPeriod.hidden = !isDashboard;
                dashboardPeriod.classList.toggle('visible', isDashboard);
            }

            if (pagina === 'inicio') {
                const user = getCurrentUser();
                const shortName = [user.firstName, user.secondName].filter(Boolean).map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ');
                greetingEl.innerHTML = `<span class="greeting-hi">Olá,</span> <span class="greeting-name">${shortName}</span>`;
            } else {
                greetingEl.innerHTML = `<span class="greeting-name">${PAGE_TITLES[pagina] || ''}</span>`;
            }
        }

        updateHeaderTitle('inicio');

        // Inicializar progresso das cards quando a página carrega
        setTimeout(() => { updateAllCardProgress(); renderLastReadCard(); startEnamedCountdown(); renderMedUpdatesCarousel(); }, 300);

