/**
 * OSCE v2 — player do modo Avaliando no padrão do PEP do Revalida.
 *
 * O candidato age escolhendo ações clínicas de um catálogo (com busca),
 * em vez de digitar perguntas: cada ação vira um evento, o paciente e o
 * exame respondem a partir do que a estação declara, e a nota sai da
 * mesma função pura usada nos testes (window.pontuarEstacao, de
 * shared/osce-pep.js). Modelo da estação: osce/MODELO-ESTACAO.md.
 *
 * Renderiza dentro de #questionPlayer (o mesmo contêiner do player de
 * questões) e devolve a estrutura original ao sair, via closeOsceSession.
 */
(function () {
    const CHAVE_ATIVA = 'trycktrack-osce2-ativa';
    const CHAVE_HISTORICO = 'trycktrack-osce2-historico';
    const CHAVE_VISTO = 'trycktrack-osce2-visto';
    const CHAVE_AVALIACOES = 'trycktrack-osce2-avaliacoes';
    // Worker do Cloudflare que escreve as estações (valida e audita antes de devolver).
    // Desligado até a API de IA ser definida; o Worker e o núcleo de geração já estão prontos.
    const GERACAO_IA_ATIVA = false;
    const OSCE_PROXY_URL = 'https://trycktrack-osce-proxy.patryckfrota-trycktrack.workers.dev';
    const MARCOS_ANUNCIO = [300, 120, 60, 30];

    const ABAS = [
        { id: 'conversar', rotulo: 'Conversar', dica: 'Pergunte ao paciente' },
        { id: 'examinar', rotulo: 'Examinar', dica: 'Peça o exame físico' },
        { id: 'exames', rotulo: 'Exames', dica: 'Solicite exames e interprete' },
        { id: 'hipoteses', rotulo: 'Hipótese', dica: 'Registre o diagnóstico' },
        { id: 'conduta', rotulo: 'Conduta', dica: 'Decida o tratamento' },
        { id: 'orientar', rotulo: 'Orientar', dica: 'Converse com o paciente' }
    ];
    const COM_CONVERSA = new Set(['com.apresentar', 'com.identificacao', 'com.motivo', 'com.higiene-maos', 'com.privacidade', 'com.consentimento', 'com.expectativas', 'com.empatia', 'com.acompanhante']);
    const COM_ORIENTACAO = new Set(['com.explicar-diagnostico', 'com.explicar-conduta', 'com.explicar-riscos', 'com.checar-entendimento', 'com.sinais-alarme', 'com.adesao', 'com.estilo-vida', 'com.cessar-tabagismo', 'com.explicar-encaminhamento', 'com.empatia']);
    const pertenceAba = {
        conversar: id => id.startsWith('anam.') || COM_CONVERSA.has(id),
        examinar: id => id.startsWith('ef.'),
        exames: id => id.startsWith('ex.') || id.startsWith('int.'),
        hipoteses: id => id.startsWith('dx.'),
        conduta: id => id.startsWith('cd.'),
        orientar: id => COM_ORIENTACAO.has(id)
    };
    const VERBO = { anam: 'Pergunta', ef: 'Examina', ex: 'Solicita', int: 'Interpreta', dx: 'Hipótese', cd: 'Conduta' };

    let catalogo = null;
    let catalogoPorId = new Map();
    let indice = null;
    let est = null;      // estação carregada
    let S = null;        // sessão em andamento
    let tick = null;
    let prazo = 0;
    let papel = 'avaliando';
    let consulta = '';
    let consultaAtor = '';
    let selecaoExames = [];

    const esc = texto => (typeof escapeHtml === 'function' ? escapeHtml(texto) : String(texto ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])));
    const norm = texto => String(texto || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const $ = id => document.getElementById(id);
    const fmtTempo = s => `${String(Math.floor(Math.max(0, s) / 60)).padStart(2, '0')}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;
    const fmtNota = n => Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 3 });
    const rotulo = id => catalogoPorId.get(id)?.rotulo || id;

    // Diálogo acessível: Tab/Shift+Tab ficam dentro da caixa, Esc fecha e o
    // foco volta ao botão que abriu.
    function prenderFoco(caixa, aoFechar) {
        const origem = document.activeElement;
        const focaveis = () => [...caixa.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')].filter(el => !el.disabled);
        caixa.addEventListener('keydown', evento => {
            if (evento.key === 'Escape') { evento.stopPropagation(); fechar(); return; }
            if (evento.key !== 'Tab') return;
            const itens = focaveis();
            if (!itens.length) return;
            const primeiro = itens[0], ultimo = itens[itens.length - 1];
            if (evento.shiftKey && document.activeElement === primeiro) { evento.preventDefault(); ultimo.focus(); }
            else if (!evento.shiftKey && document.activeElement === ultimo) { evento.preventDefault(); primeiro.focus(); }
        });
        function fechar() { caixa.remove(); aoFechar?.(); origem?.focus?.(); }
        return fechar;
    }
    const pontosTxt = n => `${Number.isInteger(Number(n)) ? Number(n) : fmtNota(n)} ${Number(n) === 1 ? 'ponto' : 'pontos'}`;

    function ler(chave) { try { return JSON.parse(localStorage.getItem(chave) || 'null'); } catch (_) { return null; } }
    function gravar(chave, valor) { try { valor === null ? localStorage.removeItem(chave) : localStorage.setItem(chave, JSON.stringify(valor)); } catch (_) { /* sem armazenamento: segue sem salvar */ } }

    async function buscarJson(url) {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error(`${url}: ${resposta.status}`);
        return resposta.json();
    }

    async function carregarBase() {
        if (catalogo && indice) return;
        [catalogo, indice] = await Promise.all([buscarJson('osce/catalogo.json'), buscarJson('osce/indice.json')]);
        catalogoPorId = new Map();
        for (const [prefixo, categoria] of Object.entries(catalogo.categorias)) {
            categoria.itens.forEach(item => catalogoPorId.set(item.id, { ...item, prefixo }));
        }
    }

    const historico = () => ler(CHAVE_HISTORICO) || {};
    function melhorNota(id) {
        const notas = (historico()[id] || []).filter(t => t.modo === 'prova').map(t => t.nota);
        return notas.length ? Math.max(...notas) : null;
    }

    /* ------------------------------ lista ------------------------------ */

    const filtros = { visao: 'revalida', grupo: null, topico: null, tema: null, busca: '', soNaoFeitas: false };
    let prefetchFeito = false;
    const geradasCache = new Map();      // id -> estação gerada (biblioteca + recém-geradas)
    const geradasPorBucket = new Map();  // bucket do tema -> [ids]

    const AREAS = { 'clinica-medica': 'Clínica Médica', cirurgia: 'Cirurgia', 'ginecologia-obstetricia': 'Ginecologia e Obstetrícia', pediatria: 'Pediatria', 'medicina-familia-comunidade': 'Medicina de Família' };
    // Transparência editorial: enquanto nenhum profissional revisou a estação,
    // o aluno vê isso, e a avaliação dele é o que alimenta a melhoria.
    const seloHtml = () => (est.revisao?.revisaoProfissional
        ? ''
        : '<p class="o2-selo" role="note"><strong>Elaborada com apoio de IA</strong> e conferida em diretriz. Ainda sem revisão por profissional: sua avaliação ao final ajuda a melhorar a estação.</p>');

    function areaRotulo(slug) { return AREAS[slug] || slug; }
    function grupoRotulo(visao, slug) {
        if (visao === 'revalida') return areaRotulo(slug);
        const matriz = typeof OSCE_CURRICULUM_MATRIX !== 'undefined' ? OSCE_CURRICULUM_MATRIX : [];
        return matriz.find(a => a.slug === slug)?.name || slug;
    }

    const feitasIds = () => new Set(Object.keys(historico()).filter(id => (historico()[id] || []).length));

    async function renderLista(container) {
        if (!container) return;
        container.innerHTML = '<p class="o2-vazio" role="status">Carregando estações…</p>';
        try {
            await carregarBase();
        } catch (erro) {
            console.error('OSCE v2: não foi possível carregar o catálogo/índice', erro);
            container.innerHTML = '<p class="o2-vazio" role="alert">Não foi possível carregar as estações agora. Confira a conexão e tente de novo.</p>';
            return;
        }
        const ativa = ler(CHAVE_ATIVA);
        const retomar = ativa && (indice.estacoes.find(e => e.id === ativa.estacaoId) || ativa.estacaoGerada);
        container.innerHTML = `${retomar ? `<div class="o2-retomar" role="status"><span>Você tem uma estação em andamento: <strong>${esc(retomar.titulo)}</strong></span><button type="button" class="o2-botao" onclick="Osce2.retomar()">Retomar</button></div>` : ''}
            <div class="o2-filtros">
                <div class="o2-segmento" role="group" aria-label="Organizar estações por" id="o2-segmento"></div>
                <div class="o2-rotacoes" role="group" aria-label="Filtrar por rotação" id="o2-chips"></div>
                <p class="o2-rotacao-nome" id="o2-rotacao-nome" role="status" aria-live="polite"></p>
                <div class="o2-subfiltros" id="o2-subfiltros"></div>
                <div class="o2-busca-linha">
                    <label for="o2-busca-lista" class="o2-sr">Buscar estação</label>
                    <input id="o2-busca-lista" type="search" placeholder="Buscar estação…" autocomplete="off" value="${esc(filtros.busca)}">
                </div>
                <label class="o2-check"><input type="checkbox" id="o2-so-novas" ${filtros.soNaoFeitas ? 'checked' : ''}><span>Só as que ainda não fiz</span></label>
            </div>
            <div class="o2-contagem" id="o2-contagem" role="status" aria-live="polite"></div>
            <ul class="o2-lista-cartoes" id="o2-cartoes"></ul>
            <div class="o2-gerar" id="o2-gerar"></div>
            <button type="button" class="o2-botao o2-botao-suave o2-aleatoria" id="o2-aleatoria">Estação aleatória</button>`;
        $('o2-busca-lista').addEventListener('input', e => { filtros.busca = e.target.value; renderCartoes(); });
        $('o2-so-novas').addEventListener('change', e => { filtros.soNaoFeitas = e.target.checked; renderCartoes(); });
        $('o2-segmento').addEventListener('click', e => {
            const b = e.target.closest('[data-visao]');
            if (!b || b.dataset.visao === filtros.visao) return;
            filtros.visao = b.dataset.visao; filtros.grupo = null; filtros.topico = null; filtros.tema = null;
            renderFiltros(); renderCartoes();
        });
        $('o2-chips').addEventListener('click', e => {
            const b = e.target.closest('[data-grupo]');
            if (!b) return;
            filtros.grupo = filtros.grupo === b.dataset.grupo ? null : (b.dataset.grupo || null);
            filtros.topico = null; filtros.tema = null;
            renderFiltros(); renderCartoes();
        });
        $('o2-subfiltros').addEventListener('click', e => {
            const b = e.target.closest('[data-topico]');
            if (!b) return;
            filtros.topico = b.dataset.topico || null;
            const ainda = temasDaRotacao().find(t => t.slug === filtros.tema);
            if (!ainda) filtros.tema = null;
            renderSubfiltros(); renderCartoes();
        });
        $('o2-subfiltros').addEventListener('change', e => {
            if (e.target.id !== 'o2-tema') return;
            filtros.tema = e.target.value || null;
            renderCartoes();
            const t = temaAtual();
            if (t) carregarGeradas(t);
        });
        $('o2-aleatoria').addEventListener('click', () => {
            const alvo = window.osceIndice.sortearEstacao(todosFiltrados(), feitasIds());
            if (alvo) abrir(alvo.id); else avisarLista('Nenhuma estação para sortear com esses filtros.');
        });
        renderFiltros();
        renderCartoes();
        prefetchEstacoes();
    }

    function filtrados() {
        return window.osceIndice.filtrarIndice(indice.estacoes, { ...filtros, jaFeitas: feitasIds() });
    }

    // Estações geradas por IA do tema escolhido, no mesmo formato do índice,
    // pra passarem pelos mesmos filtros e cartões.
    function geradasComoIndice() {
        const t = temaAtual();
        if (!t) return [];
        return (geradasPorBucket.get(bucketDo(t)) || []).map(id => geradasCache.get(id)).filter(Boolean).map(e => ({
            id: e.id, titulo: e.titulo, area: e.classificacao.revalidaArea, nivelAtencao: e.cenario.nivelAtencao,
            tempoMinutos: e.tempoMinutos, dificuldade: e.dificuldade || null, ia: true,
            rodizio: e.classificacao.internato.rodizio, topico: e.classificacao.internato.topico, temaSlug: e.classificacao.internato.temaSlug
        }));
    }

    function todosFiltrados() {
        return filtrados().concat(window.osceIndice.filtrarIndice(geradasComoIndice(), { ...filtros, jaFeitas: feitasIds() }));
    }

    const bucketDo = t => `${t.rodizio}__${t.topico}__${t.temaSlug}`;
    function temaAtual() {
        if (filtros.visao !== 'internato' || !filtros.grupo || !filtros.tema) return null;
        const t = temasDaRotacao().find(x => x.slug === filtros.tema);
        return t ? { rodizio: filtros.grupo, topico: t.topico, temaSlug: t.slug, nome: t.nome } : null;
    }
    const temFicha = t => (indice.fichas || []).includes(`${t.rodizio}/${t.topico}/${t.temaSlug}`);

    async function carregarGeradas(t) {
        const bucket = bucketDo(t);
        if (!window.__fb?.ready || !window.__fb.getCurrentUser?.() || !temFicha(t)) return;
        try {
            const lista = await window.__fb.getOsceLibrary(bucket);
            // nunca joga o que não passa no validador (documento adulterado ou de versão antiga)
            const validas = lista.filter(e => e?.id && String(e.id).startsWith('ia-') && e.status === 'GERADA' && window.osceValidar(e, catalogo).length === 0);
            validas.forEach(e => geradasCache.set(e.id, e));
            geradasPorBucket.set(bucket, [...new Set([...(geradasPorBucket.get(bucket) || []), ...validas.map(e => e.id)])]);
        } catch (erro) {
            console.warn('OSCE v2: não foi possível carregar a biblioteca de estações geradas', erro);
        }
        const atual = temaAtual();
        if (atual && bucketDo(atual) === bucket) { renderCartoes(); }
    }

    function renderGerar() {
        const el = $('o2-gerar');
        if (!el) return;
        const t = temaAtual();
        if (!GERACAO_IA_ATIVA || !t) { el.innerHTML = ''; return; }
        if (!temFicha(t)) { el.innerHTML = '<p class="o2-dica">Geração por IA ainda indisponível para este tema: falta a ficha de diretriz.</p>'; return; }
        const emAndamento = el.dataset.gerando === bucketDo(t);
        el.innerHTML = `<section class="o2-gerar-card" aria-labelledby="o2-gerar-t">
            <h3 id="o2-gerar-t">Gerar uma estação com IA</h3>
            <p>Cria um caso novo para <strong>${esc(encurtar(t.nome, 90))}</strong>, escrito a partir da ficha de diretriz do tema e verificado automaticamente. Leva de 1 a 2 minutos e aparece com o selo de IA.</p>
            <button type="button" class="o2-botao" id="o2-gerar-btn" ${emAndamento ? 'disabled' : ''}>${emAndamento ? 'Gerando…' : 'Gerar estação'}</button>
            <p class="o2-gerar-status" id="o2-gerar-status" role="status" aria-live="polite"></p></section>`;
        $('o2-gerar-btn').addEventListener('click', gerarEstacaoIA);
    }

    function mensagemDeErroDeGeracao(erro) {
        const texto = String(erro?.message || '');
        if (/failed to fetch|networkerror|load failed/i.test(texto)) return 'Sem conexão com o servidor agora. Confira a internet e tente de novo.';
        if (/^Erro \d+$/.test(texto) || !texto) return 'O servidor não respondeu como esperado. Tente de novo em instantes.';
        return texto;
    }

    async function gerarEstacaoIA() {
        const t = temaAtual();
        const status = $('o2-gerar-status');
        const botao = $('o2-gerar-btn');
        if (!t || !status || !botao) return;
        if (!window.__fb?.ready || !window.__fb.getCurrentUser?.()) {
            status.textContent = 'Entre na sua conta para gerar uma estação com IA.';
            return;
        }
        const bucket = bucketDo(t);
        $('o2-gerar').dataset.gerando = bucket;
        botao.disabled = true;
        botao.textContent = 'Gerando…';
        status.textContent = 'Escrevendo e verificando a estação. Isso leva de 1 a 2 minutos; não feche esta tela.';
        try {
            const token = await window.__fb.getIdToken();
            const resposta = await fetch(OSCE_PROXY_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ rodizio: t.rodizio, topico: t.topico, temaSlug: t.temaSlug })
            });
            const dados = await resposta.json().catch(() => ({}));
            if (!resposta.ok) {
                const falha = new Error(dados.error || `Erro ${resposta.status}`);
                falha.detalhes = Array.isArray(dados.detalhes) ? dados.detalhes : [];
                throw falha;
            }
            const estacao = dados.estacao;
            if (!estacao || window.osceValidar(estacao, catalogo).length) throw new Error('A estação recebida não passou na verificação do aplicativo. Tente de novo.');
            geradasCache.set(estacao.id, estacao);
            geradasPorBucket.set(bucket, [estacao.id, ...(geradasPorBucket.get(bucket) || [])]);
            window.__fb.saveOsceToLibrary?.(bucket, estacao).catch(erro => console.warn('OSCE v2: não foi possível salvar na biblioteca', erro));
            delete $('o2-gerar')?.dataset.gerando;
            abrir(estacao.id);
        } catch (erro) {
            console.error('OSCE v2: falha ao gerar estação', erro);
            const el = $('o2-gerar');
            if (el) delete el.dataset.gerando;
            renderGerar();
            const novo = $('o2-gerar-status');
            if (novo) {
                novo.textContent = mensagemDeErroDeGeracao(erro);
                if (erro.detalhes?.length) {
                    console.error('OSCE v2: motivos da reprovação', erro.detalhes);
                    const detalhes = document.createElement('details');
                    detalhes.className = 'o2-detalhe o2-detalhes-tecnicos';
                    detalhes.innerHTML = `<summary>Detalhes técnicos (para quem mantém o app)</summary><ul>${erro.detalhes.map(d => `<li>${esc(d)}</li>`).join('')}</ul>`;
                    novo.insertAdjacentElement('afterend', detalhes);
                }
            }
        }
    }

    const matrizDoApp = () => (typeof OSCE_CURRICULUM_MATRIX !== 'undefined' ? OSCE_CURRICULUM_MATRIX : []);
    const encurtar = (texto, max = 78) => (texto.length > max ? `${texto.slice(0, max - 1).trimEnd()}…` : texto);
    const temasDaRotacao = () => (filtros.visao === 'internato' && filtros.grupo
        ? window.osceIndice.temasDoRodizio(indice.estacoes, matrizDoApp(), filtros.grupo, filtros.topico) : []);

    // Tópico (A/B) e tema da matriz do Internato. Os temas sem estação ficam
    // visíveis (marcados) porque são o mapa do que ainda falta produzir.
    function renderSubfiltros() {
        const el = $('o2-subfiltros');
        if (!el) return;
        if (filtros.visao !== 'internato' || !filtros.grupo) { el.innerHTML = ''; return; }
        const temas = temasDaRotacao();
        const opcao = t => `<option value="${esc(t.slug)}" ${filtros.tema === t.slug ? 'selected' : ''} title="${esc(t.nome)}">${esc(encurtar(t.nome))} · ${t.quantidade ? `${t.quantidade} ${t.quantidade === 1 ? 'estação' : 'estações'}` : 'sem estação ainda'}</option>`;
        const porTopico = ['A', 'B'].map(cod => ({ cod, lista: temas.filter(t => t.topico === cod) })).filter(g => g.lista.length);
        el.innerHTML = `<div class="o2-segmento o2-segmento-3" role="group" aria-label="Tópico">
                ${[['', 'Todos'], ['A', 'Tópico A'], ['B', 'Tópico B']].map(([cod, nome]) => `<button type="button" data-topico="${cod}" aria-pressed="${(filtros.topico || '') === cod}">${nome}</button>`).join('')}
            </div>
            <label class="o2-campo" for="o2-tema"><span>Tema</span>
                <select id="o2-tema"><option value="">Todos os temas (${temas.length})</option>
                    ${porTopico.map(g => `<optgroup label="Tópico ${g.cod}">${g.lista.map(opcao).join('')}</optgroup>`).join('')}
                </select></label>`;
    }

    function renderFiltros() {
        const seg = $('o2-segmento');
        const chips = $('o2-chips');
        if (!seg || !chips) return;
        seg.innerHTML = [['revalida', 'Revalida'], ['internato', 'Internato']].map(([id, nome]) => `<button type="button" data-visao="${id}" aria-pressed="${filtros.visao === id}">${nome}</button>`).join('');
        const grupos = window.osceIndice.gruposVisiveis(indice.estacoes, filtros.visao);
        chips.style.setProperty('--colunas', grupos.length);
        chips.innerHTML = grupos.map(g => `<button type="button" data-grupo="${esc(g.slug)}" aria-pressed="${filtros.grupo === g.slug}" aria-label="${esc(g.nome)}: ${g.quantidade} ${g.quantidade === 1 ? 'estação' : 'estações'}" class="${g.quantidade ? '' : 'o2-vazia'}"><b>${esc(g.sigla)}</b><small>${g.quantidade}</small></button>`).join('');
        const atual = grupos.find(g => g.slug === filtros.grupo);
        const nome = $('o2-rotacao-nome');
        if (nome) nome.innerHTML = atual
            ? `<strong>${esc(atual.nome)}</strong> · ${atual.quantidade} ${atual.quantidade === 1 ? 'estação' : 'estações'}. Toque de novo para ver todas.`
            : `${filtros.visao === 'internato' ? 'Rotações' : 'Áreas'}: ${grupos.map(g => `<b>${esc(g.sigla)}</b> ${esc(g.nome)}`).join(' · ')}`;
        renderSubfiltros();
    }

    function renderCartoes() {
        const lista = $('o2-cartoes');
        if (!lista) return;
        const itens = todosFiltrados();
        const feitas = historico();
        const contagem = $('o2-contagem');
        if (contagem) contagem.textContent = itens.length === 1 ? '1 estação' : `${itens.length} estações`;
        if (!itens.length) {
            const temaSemEstacao = filtros.tema && !filtros.busca && !filtros.soNaoFeitas;
            const grupoSemEstacao = filtros.grupo && !filtros.tema && !filtros.topico && !filtros.busca && !filtros.soNaoFeitas;
            if (grupoSemEstacao) {
                lista.innerHTML = `<li class="o2-vazio"><strong>Ainda não há estação ${filtros.visao === 'internato' ? 'nesta rotação' : 'nesta área'}.</strong><br>Toque na sigla de novo para ver todas as estações disponíveis.</li>`;
                return;
            }
            lista.innerHTML = temaSemEstacao
                ? '<li class="o2-vazio"><strong>Ainda não há estação para este tema.</strong><br>Escolha outro tema ou veja todos os temas da rotação: os que têm estação mostram a quantidade.</li>'
                : '<li class="o2-vazio">Nenhuma estação com esses filtros. Limpe a busca ou escolha outro grupo.</li>';
            renderGerar();
            return;
        }
        renderGerar();
        lista.innerHTML = itens.map(e => {
            const tentativas = (feitas[e.id] || []).length;
            const melhor = melhorNota(e.id);
            const situacao = !tentativas ? 'Ainda não feita'
                : `${tentativas} ${tentativas === 1 ? 'tentativa' : 'tentativas'}${melhor === null ? ' (só em modo estudo)' : ` · melhor nota ${fmtNota(melhor)} de 10`}`;
            return `<li><button type="button" class="o2-cartao" onclick="Osce2.abrir('${esc(e.id)}')">
                <span class="o2-cartao-topo"><span class="o2-chip">${esc(areaRotulo(e.area))}</span>${e.ia ? '<span class="o2-chip o2-chip-ia">IA</span>' : ''}<span class="o2-chip o2-chip-suave">${e.tempoMinutos} min</span>${e.dificuldade ? `<span class="o2-chip o2-chip-suave">${esc(e.dificuldade.toLowerCase())}</span>` : ''}</span>
                <strong>${esc(e.titulo)}</strong>
                <span class="o2-cartao-meta">${esc(e.nivelAtencao)}</span>
                <span class="o2-cartao-nota">${esc(situacao)}</span>
            </button></li>`;
        }).join('');
    }

    function avisarLista(texto) {
        const c = $('o2-contagem');
        if (c) c.textContent = texto;
    }

    // Baixa as estações em segundo plano (o service worker guarda cada
    // arquivo), pra a lista funcionar offline depois da primeira visita
    // sem carregar tudo na abertura do app.
    function prefetchEstacoes() {
        if (prefetchFeito || !indice) return;
        prefetchFeito = true;
        const baixar = () => indice.estacoes.forEach(e => fetch(e.arquivo).catch(() => {}));
        (window.requestIdleCallback || (f => setTimeout(f, 2000)))(baixar);
    }

    /* ------------------------------ porta ------------------------------ */

    function abrirContainer() {
        const player = $('questionPlayer');
        if (!player) return null;
        player.hidden = false;
        document.body.style.overflow = 'hidden';
        return player;
    }

    async function abrir(id, papelForcado) {
        papel = papelForcado || (typeof activeOsceMode !== 'undefined' && activeOsceMode === 'EVALUATOR' ? 'avaliador' : 'avaliando');
        const player = abrirContainer();
        if (!player) return;
        player.innerHTML = '<div class="o2"><p class="o2-vazio" role="status">Carregando estação…</p></div>';
        try {
            await carregarBase();
            est = geradasCache.get(id) || await buscarJson(indice.estacoes.find(e => e.id === id).arquivo);
        } catch (erro) {
            console.error('OSCE v2: falha ao abrir estação', erro);
            player.innerHTML = '<div class="o2"><p class="o2-vazio" role="alert">Não foi possível abrir a estação. Confira a conexão e tente de novo.</p><button type="button" class="o2-botao" onclick="Osce2.sair()">Voltar</button></div>';
            return;
        }
        renderPorta();
    }

    function renderPorta(modo = 'prova') {
        if (papel === 'avaliador') return renderPreparacao(modo);
        const tri = Object.entries(est.paciente.sinaisTriagem || {}).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
        $('questionPlayer').innerHTML = `<div class="o2 o2-porta">
            <header class="o2-topo"><button type="button" class="o2-sair" onclick="Osce2.sair()">Sair</button></header>
            <main class="o2-conteudo">
                <p class="o2-kicker">Instruções da porta</p>
                <h2 id="o2-titulo" tabindex="-1">${esc(est.titulo)}</h2>
                ${seloHtml()}
                <section aria-labelledby="o2-h-cenario"><h3 id="o2-h-cenario">Cenário</h3>
                    <p><strong>${esc(est.cenario.nivelAtencao)}.</strong> ${esc(est.cenario.descricao)}</p>
                    <details class="o2-detalhe"><summary>O que há disponível nesta unidade</summary>
                        <ul>${est.cenario.recursos.map(r => `<li>${esc(r)}</li>`).join('')}</ul>
                        ${est.cenario.indisponivel?.length ? `<p class="o2-nao">Não disponível: ${est.cenario.indisponivel.map(esc).join('; ')}.</p>` : ''}
                    </details></section>
                <section aria-labelledby="o2-h-caso"><h3 id="o2-h-caso">Caso</h3><p>${esc(est.caso.descricao)}</p>
                    <dl class="o2-triagem">${tri}</dl></section>
                <section aria-labelledby="o2-h-tarefas"><h3 id="o2-h-tarefas">Nos próximos ${est.tempoMinutos} minutos, você deverá</h3>
                    <ol class="o2-tarefas">${est.caso.tarefas.map(t => `<li>${esc(t)}</li>`).join('')}</ol></section>
                <details class="o2-detalhe o2-como" ${ler(CHAVE_VISTO) ? '' : 'open'}><summary>Como funciona</summary>
                    <ol><li>Você atende o paciente escolhendo ações nas abas (Conversar, Examinar, Exames, Hipótese, Conduta e Orientar). Use a busca para achar rápido.</li>
                    <li>O paciente responde e os resultados dos exames chegam como impressos, só depois que você pede.</li>
                    <li>Ao encerrar, você vê a nota no padrão da prova do Revalida e o que faltou, item a item.</li></ol></details>
                <fieldset class="o2-modos"><legend>Modo</legend>
                    <label><input type="radio" name="o2-modo" value="prova" ${modo === 'prova' ? 'checked' : ''}><span><strong>Prova</strong> ${est.tempoMinutos} minutos, como na banca</span></label>
                    <label><input type="radio" name="o2-modo" value="estudo" ${modo === 'estudo' ? 'checked' : ''}><span><strong>Estudo</strong> sem cronômetro e com aviso de conduta perigosa</span></label>
                </fieldset>
                <button type="button" class="o2-botao o2-botao-grande" onclick="Osce2.iniciar()">Iniciar estação</button>
            </main></div>`;
        $('o2-titulo')?.focus();
    }

    /* ----------------------------- sessão ------------------------------ */

    function iniciar() {
        const modo = document.querySelector('input[name="o2-modo"]:checked')?.value || 'prova';
        gravar(CHAVE_VISTO, true);
        const guardarGerada = () => { if (est.revisao?.geradaPorIA) S.estacaoGerada = est; };
        if (papel === 'avaliador') {
            S = { papel, estacaoId: est.id, modo, marcas: [], perigosas: [], entregues: [], ditas: [], restante: est.tempoMinutos * 60, aba: 'ator', finalizada: false };
            guardarGerada();
            salvar();
            comecarAvaliacao();
            return;
        }
        S = { papel, estacaoId: est.id, modo, eventos: [], seq: 1, linha: [], restante: est.tempoMinutos * 60, aba: 'conversar', perguntou: [], finalizada: false };
        guardarGerada();
        salvar();
        comecarEstacao();
    }

    async function retomar() {
        const ativa = ler(CHAVE_ATIVA);
        if (!ativa) return;
        const player = abrirContainer();
        try {
            await carregarBase();
            est = ativa.estacaoGerada || await buscarJson(indice.estacoes.find(e => e.id === ativa.estacaoId).arquivo);
        } catch (erro) {
            console.error('OSCE v2: falha ao retomar', erro);
            if (player) player.innerHTML = '<div class="o2"><p class="o2-vazio" role="alert">Não foi possível retomar a estação agora.</p><button type="button" class="o2-botao" onclick="Osce2.sair()">Voltar</button></div>';
            return;
        }
        S = ativa;
        papel = S.papel || 'avaliando';
        if (papel === 'avaliador') comecarAvaliacao(); else comecarEstacao();
    }

    function salvar() { if (S && !S.finalizada) gravar(CHAVE_ATIVA, S); }
    const feitas = () => new Set(S.eventos.filter(e => e.tipo === 'acao').map(e => e.acao));
    const impressoLiberado = id => S.eventos.some(e => e.tipo === 'impresso' && e.id === id);

    function comecarEstacao() {
        consulta = '';
        selecaoExames = [];
        $('questionPlayer').innerHTML = `<div class="o2 o2-estacao">
            <header class="o2-topo">
                <button type="button" class="o2-sair" onclick="Osce2.pausarESair()" aria-label="Pausar e sair. Você pode retomar depois.">Sair</button>
                <div class="o2-titulo-mini">${esc(est.titulo)}</div>
                <div class="o2-relogio" id="o2-relogio" ${S.modo === 'estudo' ? 'hidden' : ''}><span class="o2-sr">Tempo restante: </span><span id="o2-tempo">${fmtTempo(S.restante)}</span></div>
                ${S.modo === 'estudo' ? '<span class="o2-chip">Modo estudo</span>' : ''}
                <button type="button" class="o2-botao o2-botao-pequeno" onclick="Osce2.pedirEncerrar()">Encerrar</button>
            </header>
            <details class="o2-trilho"><summary>Tarefas da estação</summary><ol>${est.caso.tarefas.map(t => `<li>${esc(t)}</li>`).join('')}</ol></details>
            <div class="o2-linha" id="o2-linha" role="log" aria-live="polite" aria-relevant="additions" aria-label="Atendimento"></div>
            <div class="o2-sr" id="o2-anuncio" role="status" aria-live="assertive"></div>
            <section class="o2-dock" aria-label="Ações clínicas">
                <div class="o2-abas" role="tablist" aria-label="Tipo de ação" id="o2-abas"></div>
                <div class="o2-painel" id="o2-painel" role="tabpanel"></div>
            </section></div>`;
        if (!S.linha.length) {
            adicionarLinha({ tipo: 'paciente', texto: est.paciente.abertura, quem: est.paciente.nome });
        }
        renderLinha();
        renderAbas();
        renderPainel();
        iniciarRelogio();
    }

    // O tempo sai do relógio (prazo - agora), não de "menos 1 por tick": com o
    // app em segundo plano o navegador atrasa o setInterval e a contagem
    // derrapava. Ao voltar à tela, o tempo se acerta na hora.
    function iniciarRelogio() {
        clearInterval(tick);
        if (S.modo !== 'prova') return;
        prazo = Date.now() + S.restante * 1000;
        tick = setInterval(passarSegundo, 1000);
    }

    function passarSegundo() {
        if (!S || S.finalizada || S.modo !== 'prova') return;
        const antes = S.restante;
        S.restante = Math.max(0, Math.ceil((prazo - Date.now()) / 1000));
        const rel = $('o2-tempo');
        if (rel) rel.textContent = fmtTempo(S.restante);
        const marco = MARCOS_ANUNCIO.find(m => antes > m && S.restante <= m);
        if (marco !== undefined) {
            const a = $('o2-anuncio');
            if (a) a.textContent = marco >= 120 ? `Faltam ${marco / 60} minutos.` : marco === 60 ? 'Falta 1 minuto.' : `Faltam ${marco} segundos.`;
            $('o2-relogio')?.classList.toggle('o2-urgente', marco <= 120);
        }
        if (S.restante % 5 === 0 || marco !== undefined) salvar();
        if (S.restante <= 0) finalizar(true);
    }

    document.addEventListener('visibilitychange', () => { if (!document.hidden && S && tick) passarSegundo(); });

    function adicionarLinha(item) {
        S.linha.push(item);
        salvar();
    }

    function renderLinha() {
        const el = $('o2-linha');
        if (!el) return;
        el.innerHTML = S.linha.map(item => {
            if (item.tipo === 'paciente') return `<div class="o2-msg o2-paciente"><small>${esc(item.quem || 'Paciente')}</small><p>${esc(item.texto)}</p></div>`;
            if (item.tipo === 'voce') return `<div class="o2-msg o2-voce"><small>Você</small><p>${esc(item.texto)}</p></div>`;
            if (item.tipo === 'achado') return `<div class="o2-msg o2-achado"><small>Achado</small><p>${esc(item.texto)}</p></div>`;
            if (item.tipo === 'impresso') return `<div class="o2-msg o2-impresso"><details open><summary>${esc(item.titulo)}</summary><dl>${item.itens.map(i => `<div>${item.itens.length === 1 && i.rotulo === item.titulo ? '' : `<dt>${esc(i.rotulo)}</dt>`}<dd>${esc(i.resultado)}</dd></div>`).join('')}</dl></details></div>`;
            return `<div class="o2-msg o2-sistema"><p>${esc(item.texto)}</p></div>`;
        }).join('');
        el.scrollTop = el.scrollHeight;
    }

    /* --------------------------- abas e lista --------------------------- */

    function renderAbas() {
        const el = $('o2-abas');
        if (!el) return;
        el.innerHTML = ABAS.map(aba => `<button type="button" role="tab" id="o2-aba-${aba.id}" aria-selected="${S.aba === aba.id}" aria-controls="o2-painel" tabindex="${S.aba === aba.id ? 0 : -1}" data-aba="${aba.id}">${aba.rotulo}</button>`).join('');
        el.querySelector('[aria-selected="true"]')?.scrollIntoView({ inline: 'center', block: 'nearest' });
        el.onclick = evento => { const b = evento.target.closest('[data-aba]'); if (b) trocarAba(b.dataset.aba); };
        el.onkeydown = evento => {
            if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(evento.key)) return;
            const i = ABAS.findIndex(a => a.id === S.aba);
            const alvo = evento.key === 'Home' ? 0 : evento.key === 'End' ? ABAS.length - 1 : (i + (evento.key === 'ArrowRight' ? 1 : -1) + ABAS.length) % ABAS.length;
            evento.preventDefault();
            trocarAba(ABAS[alvo].id);
            $(`o2-aba-${ABAS[alvo].id}`)?.focus();
        };
    }

    function trocarAba(id) {
        S.aba = id;
        consulta = '';
        salvar();
        renderAbas();
        renderPainel();
    }

    function acoesDaAba() {
        const aba = S.aba;
        const itens = [];
        for (const item of catalogoPorId.values()) {
            if (!pertenceAba[aba](item.id)) continue;
            if (item.id.startsWith('int.') && !impressoLiberadoParaExame(item.requer)) continue;
            itens.push(item);
        }
        return itens;
    }

    function impressoLiberadoParaExame(acaoExame) {
        const pedidos = feitas();
        return pedidos.has(acaoExame) && est.impressos.some(i => i.itens.some(it => it.acao === acaoExame) && impressoLiberado(i.id));
    }

    function filtrar(itens) {
        const termos = norm(consulta).split(/\s+/).filter(Boolean);
        if (!termos.length) return itens;
        return itens.filter(item => {
            const alvo = norm(`${item.rotulo} ${(item.sin || []).join(' ')}`);
            return termos.every(t => alvo.includes(t));
        });
    }

    function renderPainel() {
        const painel = $('o2-painel');
        if (!painel) return;
        const aba = ABAS.find(a => a.id === S.aba);
        painel.setAttribute('aria-labelledby', `o2-aba-${aba.id}`);
        painel.innerHTML = `<div class="o2-busca"><label for="o2-q" class="o2-sr">Buscar em ${esc(aba.rotulo)}</label>
            <input id="o2-q" type="search" placeholder="Buscar em ${esc(aba.rotulo.toLowerCase())}…" autocomplete="off" value="${esc(consulta)}"></div>
            <div class="o2-acoes" id="o2-acoes"></div>
            ${S.aba === 'exames' ? '<div class="o2-solicitar"><button type="button" class="o2-botao" id="o2-solicitar" onclick="Osce2.solicitarExames()">Solicitar exames selecionados</button></div>' : ''}`;
        $('o2-q').addEventListener('input', evento => { consulta = evento.target.value; renderAcoes(); });
        renderAcoes();
    }

    function renderAcoes() {
        const el = $('o2-acoes');
        if (!el) return;
        const feito = feitas();
        const itens = filtrar(acoesDaAba());
        if (!itens.length) {
            el.innerHTML = '<p class="o2-vazio">Nada encontrado. Tente outra palavra.</p>';
        } else {
            el.innerHTML = itens.map(item => {
                const jaFeito = feito.has(item.id);
                const selecionado = selecaoExames.includes(item.id);
                const ehExame = item.id.startsWith('ex.');
                const estado = jaFeito ? (ehExame ? 'Solicitado' : 'Feito') : (selecionado ? 'Selecionado' : '');
                return `<button type="button" class="o2-acao${jaFeito ? ' o2-feita' : ''}${selecionado ? ' o2-sel' : ''}" data-acao="${esc(item.id)}" ${jaFeito ? 'aria-disabled="true"' : ''} ${ehExame && !jaFeito ? `aria-pressed="${selecionado}"` : ''}>
                    <span class="o2-acao-texto">${esc(item.rotulo)}</span>${estado ? `<span class="o2-acao-estado">${estado}</span>` : ''}</button>`;
            }).join('');
        }
        el.onclick = evento => { const b = evento.target.closest('[data-acao]'); if (b) tocar(b.dataset.acao); };
        const botao = $('o2-solicitar');
        if (botao) {
            botao.disabled = !selecaoExames.length;
            botao.textContent = selecaoExames.length ? `Solicitar ${selecaoExames.length} exame${selecaoExames.length > 1 ? 's' : ''}` : 'Selecione os exames que deseja solicitar';
        }
    }

    function avisar(texto) {
        const a = $('o2-anuncio');
        if (a) { a.textContent = ''; setTimeout(() => { a.textContent = texto; }, 30); }
        adicionarLinha({ tipo: 'sistema', texto });
        renderLinha();
    }

    function tocar(acao) {
        if (S.finalizada) return;
        if (feitas().has(acao)) { avisar('Você já fez isso.'); return; }
        if (acao.startsWith('ex.')) {
            selecaoExames = selecaoExames.includes(acao) ? selecaoExames.filter(a => a !== acao) : [...selecaoExames, acao];
            renderAcoes();
            return;
        }
        registrar(acao);
    }

    /* ----------------------------- ações ------------------------------- */

    function fraseVoce(acao) {
        const prefixo = acao.split('.')[0];
        return prefixo === 'com' ? rotulo(acao) : `${VERBO[prefixo] || 'Ação'}: ${rotulo(acao)}`;
    }

    function registrar(acao) {
        S.eventos.push({ seq: S.seq++, tipo: 'acao', acao });
        adicionarLinha({ tipo: 'voce', texto: fraseVoce(acao) });
        const prefixo = acao.split('.')[0];
        const pac = est.paciente;

        if (prefixo === 'anam' || prefixo === 'com') {
            const resposta = pac.respostas.find(r => r.acoes.includes(acao));
            if (resposta) adicionarLinha({ tipo: 'paciente', texto: resposta.fala, quem: pac.nome });
            else if (prefixo === 'anam') adicionarLinha({ tipo: 'paciente', texto: pac.padrao.anamnese, quem: pac.nome });
            else if (acao === 'com.identificacao') adicionarLinha({ tipo: 'paciente', texto: `Meu nome é ${pac.nome}, tenho ${pac.idade} anos e sou ${String(pac.ocupacao || '').toLowerCase()}.`, quem: pac.nome });
            else if (acao === 'com.motivo') adicionarLinha({ tipo: 'paciente', texto: pac.abertura, quem: pac.nome });
        }
        if (prefixo === 'ef') {
            const achado = est.exameFisico.find(e => e.acoes.includes(acao));
            adicionarLinha({ tipo: 'achado', texto: achado ? achado.achado : pac.padrao.exameFisico });
        }
        for (const pergunta of pac.perguntasAoCandidato || []) {
            const chave = pergunta.quando.join('|');
            if (pergunta.quando.includes(acao) && !S.perguntou.includes(chave)) {
                S.perguntou.push(chave);
                adicionarLinha({ tipo: 'paciente', texto: pergunta.fala, quem: pac.nome });
            }
        }
        if (S.modo === 'estudo' && (est.condutasDanosas || []).includes(acao)) {
            adicionarLinha({ tipo: 'sistema', texto: `Atenção: esta conduta é perigosa neste caso. Na prova seria um erro crítico e descontaria ${pontosTxt(est.penalidadeDanosa || 0)}.` });
        }
        salvar();
        renderLinha();
        renderAcoes();
    }

    function solicitarExames() {
        if (!selecaoExames.length || S.finalizada) return;
        const pedidos = [...selecaoExames];
        selecaoExames = [];
        pedidos.forEach(acao => {
            S.eventos.push({ seq: S.seq++, tipo: 'acao', acao });
            adicionarLinha({ tipo: 'voce', texto: fraseVoce(acao) });
        });
        for (const impresso of est.impressos) {
            const itens = impresso.itens.filter(i => pedidos.includes(i.acao));
            if (!itens.length) continue;
            S.eventos.push({ seq: S.seq++, tipo: 'impresso', id: impresso.id });
            adicionarLinha({ tipo: 'impresso', titulo: impresso.titulo, itens: itens.map(i => ({ rotulo: rotulo(i.acao), resultado: i.resultado })) });
        }
        const semImpresso = pedidos.filter(a => !est.impressos.some(i => i.itens.some(it => it.acao === a)));
        semImpresso.forEach(a => adicionarLinha({ tipo: 'impresso', titulo: rotulo(a), itens: [{ rotulo: rotulo(a), resultado: est.paciente.padrao.exame || 'Sem alterações relevantes.' }] }));
        salvar();
        renderLinha();
        renderAcoes();
        const a = $('o2-anuncio');
        if (a) a.textContent = 'Resultados dos exames recebidos.';
    }

    /* ---------------------------- encerramento ------------------------- */

    function pedirEncerrar() {
        if (!S || S.finalizada) return;
        const avisos = [];
        if (papel === 'avaliador') {
            if (!S.marcas.length) avisos.push('Nenhum item do PEP foi marcado ainda.');
        } else {
            const feito = feitas();
            if (![...feito].some(a => a.startsWith('dx.'))) avisos.push('Você ainda não registrou uma hipótese diagnóstica.');
            if (![...feito].some(a => a.startsWith('cd.'))) avisos.push('Você ainda não definiu nenhuma conduta.');
        }
        const caixa = document.createElement('div');
        caixa.className = 'o2-modal';
        caixa.innerHTML = `<div class="o2-modal-corpo" role="dialog" aria-modal="true" aria-labelledby="o2-modal-t">
            <h3 id="o2-modal-t">${papel === 'avaliador' ? 'Encerrar a avaliação?' : 'Encerrar a estação?'}</h3>
            ${avisos.length ? `<ul class="o2-avisos">${avisos.map(a => `<li>${esc(a)}</li>`).join('')}</ul>` : `<p>${papel === 'avaliador' ? 'Depois de encerrar, o resultado fica pronto para mostrar ao candidato.' : 'Depois de encerrar, você vê a nota e o gabarito.'}</p>`}
            <div class="o2-modal-acoes"><button type="button" class="o2-botao o2-botao-suave" id="o2-voltar">Voltar à estação</button><button type="button" class="o2-botao" id="o2-confirmar">Encerrar e ver a nota</button></div></div>`;
        $('questionPlayer').appendChild(caixa);
        $('o2-voltar').focus();
        const fecharModal = prenderFoco(caixa);
        $('o2-voltar').onclick = fecharModal;
        $('o2-confirmar').onclick = () => { caixa.remove(); finalizar(false); };
    }

    function finalizar(tempoEsgotado) {
        if (!S || S.finalizada) return;
        clearInterval(tick);
        S.finalizada = true;
        gravar(CHAVE_ATIVA, null);
        if (papel === 'avaliador') {
            renderResultado(window.pontuarMarcacoes(est, S.marcas, S.perigosas), tempoEsgotado);
            return;
        }
        const resultado = window.pontuarEstacao(est, S.eventos);
        const todo = historico();
        const anterior = (todo[est.id] || []).filter(t => t.modo === S.modo).slice(-1)[0] || null;
        (todo[est.id] ||= []).push({ data: new Date().toISOString(), nota: resultado.total, modo: S.modo });
        gravar(CHAVE_HISTORICO, todo);
        renderResultado(resultado, tempoEsgotado, anterior);
    }

    function renderResultado(r, tempoEsgotado, anterior = null) {
        const secoes = Object.entries(r.porSecao).map(([nome, s]) => `<li><span>${esc(nome)}</span><span class="o2-barra" role="img" aria-label="${fmtNota(s.pontos)} de ${fmtNota(s.peso)}"><i style="width:${s.peso ? Math.round(s.pontos / s.peso * 100) : 0}%"></i></span><span class="o2-secao-nota">${fmtNota(s.pontos)} / ${fmtNota(s.peso)}</span></li>`).join('');
        const nivelRotulo = { adequado: 'Adequado', parcial: 'Parcial', inadequado: 'Inadequado' };
        const itens = r.itens.map(item => {
            const pep = est.pep.itens.find(i => i.id === item.id);
            const subs = pep.subelementos.map(s => {
                const ok = item.cumpridos.includes(s.id);
                return `<li class="${ok ? 'o2-ok' : 'o2-falta'}"><span class="o2-marca" aria-hidden="true">${ok ? '✓' : '✗'}</span><span class="o2-sr">${ok ? 'Feito: ' : 'Faltou: '}</span>${esc(s.texto)}</li>`;
            }).join('');
            return `<li><details ${item.nivel === 'adequado' ? '' : 'open'}><summary><span class="o2-nivel o2-nivel-${item.nivel}">${nivelRotulo[item.nivel]}</span><span class="o2-item-titulo">${esc(pep.texto.split(':')[0])}</span><span class="o2-item-nota">${fmtNota(item.pontos)} / ${fmtNota(item.peso)}</span></summary>
                <div class="o2-item-corpo"><p class="o2-item-texto">${esc(pep.texto)}</p><ul class="o2-subs">${subs}</ul><p class="o2-ensino"><strong>Por que importa:</strong> ${esc(pep.ensino)}</p></div></details></li>`;
        }).join('');
        const g = est.gabarito;
        $('questionPlayer').innerHTML = `<div class="o2 o2-resultado">
            <header class="o2-topo"><button type="button" class="o2-sair" onclick="Osce2.sair()">Sair</button><div class="o2-titulo-mini">${esc(est.titulo)}</div></header>
            <main class="o2-conteudo">
                ${tempoEsgotado ? '<p class="o2-aviso" role="status">O tempo acabou e a estação foi encerrada.</p>' : ''}
                <p class="o2-kicker">Resultado</p>
                <h2 id="o2-nota" tabindex="-1"><span class="o2-nota-valor">${fmtNota(r.total)}</span><span class="o2-nota-de"> de 10</span></h2>
                <p class="o2-modo-info">${papel === 'avaliador' ? 'Avaliação em dupla' : S.modo === 'estudo' ? 'Modo estudo' : 'Modo prova'}${anterior ? ` · tentativa anterior: ${fmtNota(anterior.nota)} (${r.total === anterior.nota ? 'mesma nota' : r.total > anterior.nota ? `+${fmtNota(r.total - anterior.nota)}` : `−${fmtNota(anterior.nota - r.total)}`})` : ''}</p>
                ${seloHtml()}
                <ul class="o2-secoes">${secoes}</ul>
                ${r.penalidade > 0 ? `<p class="o2-penalidade" role="status">Soma dos itens: <strong>${fmtNota(r.bruto)}</strong> · Penalidade por conduta perigosa: <strong>−${fmtNota(r.penalidade)}</strong>${r.penalidade < r.errosCriticos.length * (est.penalidadeDanosa || 0) ? ' <small>(o desconto não passa da soma dos itens)</small>' : ''}</p>` : ''}
                ${r.errosCriticos.length ? `<section class="o2-erro-critico" aria-labelledby="o2-h-crit"><h3 id="o2-h-crit">Erros críticos</h3><p>Cada conduta perigosa desconta ${pontosTxt(est.penalidadeDanosa || 0)} da nota.</p><ul>${r.errosCriticos.map(a => `<li>${esc(rotulo(a))}</li>`).join('')}</ul></section>` : ''}
                ${r.desnecessarias.length ? `<section aria-labelledby="o2-h-desn"><h3 id="o2-h-desn">Condutas desnecessárias neste caso</h3><ul>${r.desnecessarias.map(a => `<li>${esc(rotulo(a))}</li>`).join('')}</ul></section>` : ''}
                <section aria-labelledby="o2-h-pep"><h3 id="o2-h-pep">Padrão esperado, item a item</h3><ul class="o2-itens">${itens}</ul></section>
                <section class="o2-gabarito" aria-labelledby="o2-h-gab"><h3 id="o2-h-gab">Gabarito e elucidação do caso</h3>
                    <p><strong>Diagnóstico:</strong> ${esc(g.diagnosticoPrincipal)}</p>
                    <h4>Conduta esperada</h4><ul>${g.condutaEsperada.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
                    <h4>Erros críticos da estação</h4><ul>${g.errosCriticos.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
                    <h4>Explicação</h4><p>${esc(g.explicacao)}</p>
                    <h4>Referências</h4><ul>${g.referencias.map(x => `<li>${esc(x.fonte)} (${esc(x.ano)})</li>`).join('')}</ul></section>
                ${papel === 'avaliando' && S.linha?.length ? `<details class="o2-detalhe o2-rever"><summary>Rever o seu atendimento (${S.linha.filter(l => l.tipo === 'voce').length} passos)</summary><ol>${S.linha.filter(l => l.tipo !== 'sistema').map(l => `<li><strong>${l.tipo === 'voce' ? 'Você' : l.tipo === 'paciente' ? esc(l.quem || 'Paciente') : l.tipo === 'achado' ? 'Achado' : esc(l.titulo)}:</strong> ${esc(l.texto || l.itens?.map(i => i.resultado).join(' / '))}</li>`).join('')}</ol></details>` : ''}
                <details class="o2-detalhe o2-como"><summary>Como a nota é calculada</summary><p>Cada item do padrão esperado tem um peso e a soma dos pesos é 10. Cumprir o que o item pede dá o peso inteiro (adequado), cumprir parte dá metade (parcial) e não cumprir não dá nada. Condutas perigosas descontam ${esc(pontosTxt(est.penalidadeDanosa || 0))} cada. É o mesmo critério da prova prática do Revalida.</p></details>
                ${blocoAvaliacao()}
                <div class="o2-fim-acoes"><button type="button" class="o2-botao" onclick="Osce2.abrir('${esc(est.id)}', '${papel}')">${papel === 'avaliador' ? 'Nova avaliação' : 'Refazer a estação'}</button><button type="button" class="o2-botao o2-botao-suave" onclick="Osce2.sair()">Voltar às estações</button></div>
            </main></div>`;
        $('o2-nota')?.focus();
        ligarAvaliacao(r);
    }

    /* --------------------- avaliação da estação (retroalimentação) --------------------- */

    const PROBLEMAS = [
        ['realismo', 'Caso pouco realista'],
        ['conduta', 'Conduta ou dose duvidosa'],
        ['nota', 'Pontuação injusta'],
        ['catalogo', 'Faltou uma ação na lista'],
        ['texto', 'Texto confuso ou com erro'],
        ['nivel', 'Nível inadequado (fácil ou difícil demais)']
    ];

    const avaliacoes = () => ler(CHAVE_AVALIACOES) || {};

    function blocoAvaliacao() {
        const anterior = (avaliacoes()[est.id] || []).slice(-1)[0];
        const partes = ['<option value="geral">A estação como um todo</option>']
            .concat(est.pep.itens.map(i => `<option value="${esc(i.id)}">Item: ${esc(resumoItem(i))}</option>`))
            .concat('<option value="gabarito">O gabarito e as explicações</option>').join('');
        return `<section class="o2-avaliacao" id="o2-avaliacao" aria-labelledby="o2-h-aval">
            <h3 id="o2-h-aval">Como foi esta estação?</h3>
            <p>Sua avaliação orienta a revisão: estações mal avaliadas são corrigidas primeiro.</p>
            ${anterior ? `<p class="o2-aval-ok" role="status">Você já avaliou esta estação (${anterior.nota} de 5). Pode enviar outra avaliação se mudou de ideia.</p>` : ''}
            <div class="o2-estrelas" role="radiogroup" aria-label="Nota da estação, de 1 a 5">
                ${[1, 2, 3, 4, 5].map(n => `<button type="button" role="radio" aria-checked="false" data-estrela="${n}" aria-label="${n} de 5${n === 1 ? ', muito ruim' : n === 5 ? ', excelente' : ''}">${n}</button>`).join('')}
            </div>
            <fieldset class="o2-problemas"><legend>O que pode melhorar? (opcional)</legend>
                ${PROBLEMAS.map(([id, nome]) => `<label><input type="checkbox" value="${id}"><span>${nome}</span></label>`).join('')}
            </fieldset>
            <label class="o2-campo" for="o2-aval-parte"><span>Sobre qual parte</span><select id="o2-aval-parte">${partes}</select></label>
            <label class="o2-campo" for="o2-aval-texto"><span>Comentário (opcional)</span><textarea id="o2-aval-texto" rows="3" maxlength="600" placeholder="O que você mudaria?"></textarea></label>
            <button type="button" class="o2-botao" id="o2-aval-enviar" disabled>Enviar avaliação</button>
            <p class="o2-aval-status" id="o2-aval-status" role="status" aria-live="polite"></p>
        </section>`;
    }

    function ligarAvaliacao(r) {
        const raiz = $('o2-avaliacao');
        if (!raiz) return;
        let nota = 0;
        const botoes = [...raiz.querySelectorAll('[data-estrela]')];
        const marcar = n => {
            nota = n;
            botoes.forEach(b => { const on = Number(b.dataset.estrela) === n; b.setAttribute('aria-checked', String(on)); b.classList.toggle('o2-estrela-on', Number(b.dataset.estrela) <= n); b.tabIndex = on || (!n && b === botoes[0]) ? 0 : -1; });
            $('o2-aval-enviar').disabled = !n;
        };
        marcar(0);
        raiz.querySelector('.o2-estrelas').addEventListener('click', e => { const b = e.target.closest('[data-estrela]'); if (b) marcar(Number(b.dataset.estrela)); });
        raiz.querySelector('.o2-estrelas').addEventListener('keydown', e => {
            if (!['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
            e.preventDefault();
            const n = Math.min(5, Math.max(1, (nota || 0) + (e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : -1)));
            marcar(n);
            botoes[n - 1].focus();
        });
        $('o2-aval-enviar').addEventListener('click', async () => {
            const dados = {
                tipo: 'osce-estacao',
                estacaoId: est.id,
                versao: est.revisao?.dataRascunho || null,
                geradaPorIA: !!est.revisao?.geradaPorIA,
                nota,
                problemas: [...raiz.querySelectorAll('.o2-problemas input:checked')].map(i => i.value),
                parte: $('o2-aval-parte').value,
                comentario: $('o2-aval-texto').value.trim().slice(0, 600),
                papel,
                modo: S?.modo || null,
                notaObtida: r.total,
                quando: new Date().toISOString()
            };
            const todas = avaliacoes();
            (todas[est.id] ||= []).push(dados);
            gravar(CHAVE_AVALIACOES, todas);
            const status = $('o2-aval-status');
            $('o2-aval-enviar').disabled = true;
            const usuario = window.__fb?.getCurrentUser?.();
            if (window.__fb?.ready && usuario) {
                try {
                    await window.__fb.submitFeedback({ ...dados, message: `Avaliação da estação ${est.id}: ${nota}/5`, userEmail: usuario.email || null, userId: usuario.uid || null, page: 'osce' });
                    status.textContent = 'Obrigado! Sua avaliação foi enviada.';
                } catch (erro) {
                    console.error('OSCE v2: falha ao enviar avaliação', erro);
                    status.textContent = 'Guardamos sua avaliação no aparelho, mas não foi possível enviar agora.';
                    $('o2-aval-enviar').disabled = false;
                }
            } else {
                status.textContent = 'Guardamos sua avaliação neste aparelho. Entre na sua conta para enviá-la e ajudar a melhorar as estações.';
            }
        });
    }

    /* ----------------------- modo avaliador (dupla) ---------------------- */

    const ABAS_AV = [{ id: 'ator', rotulo: 'Ator' }, { id: 'pep', rotulo: 'PEP ao vivo' }, { id: 'impressos', rotulo: 'Impressos' }];
    const resumoItem = item => item.texto.split(':')[0];

    function htmlModos(modo, textoProva) {
        return `<fieldset class="o2-modos"><legend>Modo</legend>
            <label><input type="radio" name="o2-modo" value="prova" ${modo === 'prova' ? 'checked' : ''}><span><strong>Prova</strong> ${textoProva}</span></label>
            <label><input type="radio" name="o2-modo" value="estudo" ${modo === 'estudo' ? 'checked' : ''}><span><strong>Sem cronômetro</strong> para ensaiar ou ler com calma</span></label>
        </fieldset>`;
    }

    function renderPreparacao(modo = 'prova') {
        const pac = est.paciente;
        const tri = Object.entries(pac.sinaisTriagem || {}).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
        $('questionPlayer').innerHTML = `<div class="o2 o2-porta">
            <header class="o2-topo"><button type="button" class="o2-sair" onclick="Osce2.sair()">Sair</button><div class="o2-titulo-mini">Preparação do avaliador</div></header>
            <main class="o2-conteudo">
                <p class="o2-kicker">Modo avaliador, em dupla</p>
                <h2 id="o2-titulo" tabindex="-1">${esc(est.titulo)}</h2>
                <p>Uma pessoa faz o paciente e a outra avalia, no mesmo aparelho. Leia a estação antes de chamar o candidato.</p>
                ${seloHtml()}
                <section aria-labelledby="o2-h-cenario"><h3 id="o2-h-cenario">Cenário</h3><p><strong>${esc(est.cenario.nivelAtencao)}.</strong> ${esc(est.cenario.descricao)}</p></section>
                <section aria-labelledby="o2-h-porta"><h3 id="o2-h-porta">O que o candidato recebe na porta</h3><p>${esc(est.caso.descricao)}</p>
                    <dl class="o2-triagem">${tri}</dl>
                    <p><strong>Nos próximos ${est.tempoMinutos} minutos, o candidato deverá:</strong></p>
                    <ol class="o2-tarefas">${est.caso.tarefas.map(t => `<li>${esc(t)}</li>`).join('')}</ol></section>
                <section aria-labelledby="o2-h-pac"><h3 id="o2-h-pac">Paciente que você vai interpretar</h3>
                    <p><strong>${esc(pac.nome)}, ${esc(pac.idade)} anos, ${esc(String(pac.ocupacao || '').toLowerCase())}.</strong> ${esc(pac.perfil)}</p>
                    <p>Fala de abertura: “${esc(pac.abertura)}”</p></section>
                <section aria-labelledby="o2-h-pep"><h3 id="o2-h-pep">Padrão esperado (resumo)</h3>
                    <ol class="o2-resumo-pep">${est.pep.itens.map(i => `<li><strong>${esc(resumoItem(i))}</strong><span>${String(i.peso).replace('.', ',')} pt</span></li>`).join('')}</ol></section>
                ${htmlModos(modo, `${est.tempoMinutos} minutos, com avisos de 2 minutos e 1 minuto`)}
                <button type="button" class="o2-botao o2-botao-grande" onclick="Osce2.iniciar()">Iniciar avaliação</button>
            </main></div>`;
        $('o2-titulo')?.focus();
    }

    function comecarAvaliacao() {
        consultaAtor = '';
        $('questionPlayer').innerHTML = `<div class="o2 o2-estacao o2-av">
            <header class="o2-topo">
                <button type="button" class="o2-sair" onclick="Osce2.pausarESair()" aria-label="Pausar e sair. Você pode retomar depois.">Sair</button>
                <div class="o2-titulo-mini">${esc(est.titulo)}</div>
                <div class="o2-relogio" id="o2-relogio" ${S.modo === 'estudo' ? 'hidden' : ''}><span class="o2-sr">Tempo restante: </span><span id="o2-tempo">${fmtTempo(S.restante)}</span></div>
                <button type="button" class="o2-botao o2-botao-pequeno" onclick="Osce2.pedirEncerrar()">Encerrar</button>
            </header>
            <div class="o2-nota-viva" id="o2-nota-viva" role="status"></div>
            <div class="o2-abas o2-abas-topo" role="tablist" aria-label="Painel do avaliador" id="o2-abas"></div>
            <div class="o2-av-painel" id="o2-painel" role="tabpanel" tabindex="0"></div>
            <div class="o2-sr" id="o2-anuncio" role="status" aria-live="assertive"></div></div>`;
        renderAbasAv();
        renderPainelAv();
        atualizarNotaViva();
        iniciarRelogio();
    }

    function renderAbasAv() {
        const el = $('o2-abas');
        el.innerHTML = ABAS_AV.map(a => `<button type="button" role="tab" id="o2-aba-${a.id}" aria-selected="${S.aba === a.id}" aria-controls="o2-painel" tabindex="${S.aba === a.id ? 0 : -1}" data-aba="${a.id}">${a.rotulo}</button>`).join('');
        el.onclick = e => { const b = e.target.closest('[data-aba]'); if (b) { S.aba = b.dataset.aba; salvar(); renderAbasAv(); renderPainelAv(); } };
        el.onkeydown = e => {
            if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
            const i = ABAS_AV.findIndex(a => a.id === S.aba);
            const alvo = ABAS_AV[(i + (e.key === 'ArrowRight' ? 1 : -1) + ABAS_AV.length) % ABAS_AV.length].id;
            e.preventDefault();
            S.aba = alvo; salvar(); renderAbasAv(); renderPainelAv();
            $(`o2-aba-${alvo}`)?.focus();
        };
    }

    function renderPainelAv() {
        const painel = $('o2-painel');
        painel.setAttribute('aria-labelledby', `o2-aba-${S.aba}`);
        painel.onclick = null;
        painel.onchange = null;
        if (S.aba === 'ator') renderAtor(painel);
        else if (S.aba === 'pep') renderPepVivo(painel);
        else renderImpressosAv(painel);
    }

    function entradasDoAtor() {
        const pac = est.paciente;
        const rot = acoes => acoes.map(rotulo).join('; ');
        const sin = acoes => acoes.map(a => (catalogoPorId.get(a)?.sin || []).join(' ')).join(' ');
        const falas = [
            { id: 'abertura', titulo: 'Fala de abertura (diga ao começar)', fala: pac.abertura, busca: 'abertura inicio comeco' },
            ...pac.respostas.map(r => ({ id: r.id, titulo: `Se perguntarem: ${rot(r.acoes)}`, fala: r.fala, busca: `${rot(r.acoes)} ${sin(r.acoes)}` })),
            ...(pac.perguntasAoCandidato || []).map((q, i) => ({ id: `q${i}`, titulo: `Pergunte ao candidato (após: ${rot(q.quando)})`, fala: q.fala, busca: `pergunta candidato ${rot(q.quando)}` })),
            { id: 'padrao', titulo: 'Se perguntarem algo que não está no roteiro', fala: pac.padrao.anamnese, busca: 'padrao nao previsto outro' }
        ];
        const exame = [
            ...est.exameFisico.map(e => ({ id: e.id, titulo: `Se pedirem: ${rot(e.acoes)}`, fala: e.achado, busca: `${rot(e.acoes)} ${sin(e.acoes)}` })),
            { id: 'ef-padrao', titulo: 'Qualquer outro exame físico', fala: pac.padrao.exameFisico, busca: 'padrao outro exame fisico' }
        ];
        return { falas, exame };
    }

    function renderAtor(painel) {
        painel.innerHTML = `<div class="o2-busca"><label for="o2-q-av" class="o2-sr">Buscar no roteiro</label><input id="o2-q-av" type="search" placeholder="Buscar no roteiro…" autocomplete="off" value="${esc(consultaAtor)}"></div><div id="o2-ator-lista"></div>`;
        $('o2-q-av').addEventListener('input', e => { consultaAtor = e.target.value; renderAtorLista(); });
        painel.onclick = e => {
            const b = e.target.closest('[data-dita]');
            if (!b) return;
            const id = b.dataset.dita;
            S.ditas = S.ditas.includes(id) ? S.ditas.filter(x => x !== id) : [...S.ditas, id];
            salvar();
            renderAtorLista();
        };
        renderAtorLista();
    }

    function renderAtorLista() {
        const termos = norm(consultaAtor).split(/\s+/).filter(Boolean);
        const { falas, exame } = entradasDoAtor();
        const passa = e => termos.every(t => norm(`${e.titulo} ${e.fala} ${e.busca}`).includes(t));
        const cartao = e => `<article class="o2-fala${S.ditas.includes(e.id) ? ' o2-dita' : ''}"><h4>${esc(e.titulo)}</h4><p>${esc(e.fala)}</p>
            <button type="button" class="o2-marcar" data-dita="${esc(e.id)}" aria-pressed="${S.ditas.includes(e.id)}">${S.ditas.includes(e.id) ? 'Já informado' : 'Marcar como informado'}</button></article>`;
        const f = falas.filter(passa), x = exame.filter(passa);
        $('o2-ator-lista').innerHTML = (f.length ? `<h3 class="o2-sec">Falas do paciente</h3>${f.map(cartao).join('')}` : '')
            + (x.length ? `<h3 class="o2-sec">Exame físico: informe só se o candidato pedir</h3>${x.map(cartao).join('')}` : '')
            + (!f.length && !x.length ? '<p class="o2-vazio">Nada encontrado no roteiro.</p>' : '');
    }

    function nivelRotuloAv(n) { return { adequado: 'Adequado', parcial: 'Parcial', inadequado: 'Inadequado' }[n]; }

    function renderPepVivo(painel) {
        const entregue = id => S.entregues.find(e => e.id === id);
        const nota = item => {
            const r = item.regras || {};
            if (r.antesDoImpresso) {
                const e = entregue(r.antesDoImpresso);
                return `Só vale se for pedido antes de receber o impresso${r.primeirosN ? `, e só os ${r.primeirosN} primeiros exames citados contam` : ''}.${e ? ` Impresso já entregue${e.em != null ? ` aos ${fmtTempo(e.em)}` : ''}.` : ''}`;
            }
            if (r.ordemPrefixos) return 'Conferir a ordem: anamnese, exame físico, exames, hipótese e conduta.';
            return '';
        };
        painel.innerHTML = est.pep.itens.map(item => `<section class="o2-item-av" aria-labelledby="o2-i-${esc(item.id)}">
            <header><div><small>${esc(item.secao)}</small><h4 id="o2-i-${esc(item.id)}">${esc(resumoItem(item))}</h4></div>
                <div class="o2-item-situacao"><span class="o2-nivel o2-nivel-inadequado" data-nivel-item="${esc(item.id)}">Inadequado</span><span class="o2-item-nota" data-pontos-item="${esc(item.id)}">0,00 / ${fmtNota(item.peso)}</span></div></header>
            ${nota(item) ? `<p class="o2-regra">${esc(nota(item))}</p>` : ''}
            <div class="o2-subs-av">${item.subelementos.map(sub => `<label class="o2-sub"><input type="checkbox" data-sub="${esc(sub.id)}" ${S.marcas.includes(sub.id) ? 'checked' : ''}><span>${esc(sub.texto)}</span></label>`).join('')}</div></section>`).join('')
            + `<section class="o2-item-av o2-perigo"><header><div><small>Erro crítico</small><h4>Condutas perigosas tomadas pelo candidato</h4></div></header>
            <p class="o2-regra">Cada conduta marcada desconta ${esc(pontosTxt(est.penalidadeDanosa || 0))} da nota.</p>
            <div class="o2-subs-av">${(est.condutasDanosas || []).map(a => `<label class="o2-sub"><input type="checkbox" data-perigo="${esc(a)}" ${S.perigosas.includes(a) ? 'checked' : ''}><span>${esc(rotulo(a))}</span></label>`).join('')}</div></section>`;
        painel.onchange = e => {
            const sub = e.target.dataset.sub, perigo = e.target.dataset.perigo;
            if (sub) S.marcas = e.target.checked ? [...new Set([...S.marcas, sub])] : S.marcas.filter(x => x !== sub);
            else if (perigo) S.perigosas = e.target.checked ? [...new Set([...S.perigosas, perigo])] : S.perigosas.filter(x => x !== perigo);
            else return;
            salvar();
            atualizarNotaViva();
        };
        atualizarNotaViva();
    }

    function atualizarNotaViva() {
        const r = window.pontuarMarcacoes(est, S.marcas, S.perigosas);
        const el = $('o2-nota-viva');
        if (el) el.innerHTML = `Nota parcial: <strong>${fmtNota(r.total)}</strong> de 10${r.errosCriticos.length ? ` · <span class="o2-alerta">${r.errosCriticos.length} erro${r.errosCriticos.length > 1 ? 's' : ''} crítico${r.errosCriticos.length > 1 ? 's' : ''}${r.penalidade > 0 ? ` (−${fmtNota(r.penalidade)})` : ''}</span>` : ''}`;
        for (const item of r.itens) {
            const pill = document.querySelector(`[data-nivel-item="${item.id}"]`);
            if (!pill) continue;
            pill.className = `o2-nivel o2-nivel-${item.nivel}`;
            pill.textContent = nivelRotuloAv(item.nivel);
            document.querySelector(`[data-pontos-item="${item.id}"]`).textContent = `${fmtNota(item.pontos)} / ${fmtNota(item.peso)}`;
        }
    }

    function renderImpressosAv(painel) {
        painel.innerHTML = '<p class="o2-dica">Toque para mostrar o impresso ao candidato. Entregue só o que ele pedir.</p>'
            + est.impressos.map(imp => {
                const e = S.entregues.find(x => x.id === imp.id);
                return `<article class="o2-fala"><h4>${esc(imp.titulo)}</h4><p>${imp.itens.length} ${imp.itens.length === 1 ? 'resultado' : 'resultados'}: ${imp.itens.map(i => esc(rotulo(i.acao))).join('; ')}</p>
                    ${e ? `<p class="o2-entregue">Entregue${e.em != null ? ` aos ${fmtTempo(e.em)}` : ''}</p>` : ''}
                    <button type="button" class="o2-botao" data-mostrar="${esc(imp.id)}">Mostrar ao candidato</button></article>`;
            }).join('');
        painel.onclick = e => { const b = e.target.closest('[data-mostrar]'); if (b) mostrarImpresso(b.dataset.mostrar); };
    }

    function mostrarImpresso(id) {
        const imp = est.impressos.find(i => i.id === id);
        if (!imp) return;
        if (!S.entregues.some(e => e.id === id)) {
            S.entregues.push({ id, em: S.modo === 'prova' ? est.tempoMinutos * 60 - S.restante : null });
            salvar();
        }
        const caixa = document.createElement('div');
        caixa.className = 'o2-mostrar';
        caixa.innerHTML = `<div class="o2-mostrar-corpo" role="dialog" aria-modal="true" aria-labelledby="o2-mostrar-t">
            <h2 id="o2-mostrar-t">${esc(imp.titulo)}</h2>
            <dl>${imp.itens.map(i => `<div><dt>${esc(rotulo(i.acao))}</dt><dd>${esc(i.resultado)}</dd></div>`).join('')}</dl>
            <button type="button" class="o2-botao o2-botao-grande" id="o2-fechar-mostrar">Fechar</button></div>`;
        $('questionPlayer').appendChild(caixa);
        $('o2-fechar-mostrar').focus();
        const fechar = prenderFoco(caixa, () => { if (S && papel === 'avaliador' && (S.aba === 'impressos' || S.aba === 'pep')) renderPainelAv(); });
        $('o2-fechar-mostrar').onclick = fechar;
    }

    /* ------------------------------ saída ------------------------------ */

    function pausarESair() { salvar(); sair(); }

    function sair() {
        clearInterval(tick);
        S = null;
        if (typeof closeOsceSession === 'function') closeOsceSession();
        const lista = $('osce2Lista');
        if (lista) renderLista(lista);
    }

    window.Osce2 = { gerarEstacaoIA, renderLista, abrir, iniciar, retomar, solicitarExames, pedirEncerrar, pausarESair, sair };
})();
