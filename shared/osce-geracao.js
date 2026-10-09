/**
 * Geração de estações OSCE v2 por IA, sob pedido do aluno.
 *
 * Núcleo puro e independente de provedor: quem fala com a IA é a função
 * `chamarIA(prompt)` injetada (o Worker liga Gemini ou Groq). Garantias,
 * na ordem: só gera para tema que tem FICHA de diretriz; a IA recebe a
 * ficha como única fonte de conduta e dose; o resultado passa pelo MESMO
 * validador das estações curadas; uma segunda chamada audita a estação
 * contra a ficha; reprovou, tenta de novo com os problemas apontados.
 * Nada que não passe nas duas barreiras sai daqui.
 */
import { validarEstacao } from './osce-validar.js';

export class ErroGeracao extends Error {
    constructor(tipo, mensagem, detalhes = []) {
        super(mensagem);
        this.tipo = tipo;
        this.detalhes = detalhes;
    }
}

const CHAVES_DO_SERVIDOR = ['schemaVersion', 'id', 'status', 'tempoMinutos', 'classificacao', 'revisao'];
const MAX_TENTATIVAS = 3;

export function extrairJson(texto) {
    const limpo = String(texto || '').replace(/```(?:json)?/gi, '');
    const ini = limpo.indexOf('{');
    const fim = limpo.lastIndexOf('}');
    if (ini === -1 || fim <= ini) throw new Error('resposta sem objeto JSON');
    return JSON.parse(limpo.slice(ini, fim + 1));
}

function catalogoEmTexto(catalogo) {
    return Object.entries(catalogo.categorias)
        .map(([prefixo, cat]) => `[${prefixo}] ${cat.rotulo}\n${cat.itens.map(i => `${i.id} | ${i.rotulo}`).join('\n')}`)
        .join('\n\n');
}

export function escolherCenario(ficha, cenarioId, aleatorio = Math.random) {
    const lista = ficha.cenariosPermitidos || [];
    if (!lista.length) return null;
    return lista.find(c => c.id === cenarioId) || lista[Math.min(lista.length - 1, Math.floor(aleatorio() * lista.length))];
}

const REGRAS = `REGRAS OBRIGATÓRIAS DA ESTAÇÃO (padrão da prova prática do Revalida/INEP)
1. Português do Brasil, linguagem de prontuário e de simulação clínica. Paciente fictício, nunca pessoa real.
2. Tempo de 10 minutos. O PEP tem de 8 a 14 itens, com pesos múltiplos de 0,25 entre 0,25 e 2,0 SOMANDO EXATAMENTE 10, e pelo menos 25 subelementos no total.
3. Cada item do PEP é composto: lista subelementos e o nível sai da contagem (niveis.adequado e niveis.parcial; parcial pode ser null). Cada subelemento aponta para ações do catálogo em "acoes" (vale se o candidato fez QUALQUER uma).
4. O PEP precisa ter item de comunicação (ações com.*), de hipótese diagnóstica (dx.*) e de conduta (cd.*). Inclua um último item "Realiza a sequência das tarefas" com regras.ordemPrefixos ["anam.","ef.","ex.","dx.","cd."], acoes [] no subelemento e peso 0,25.
5. TODA ação usada deve existir no catálogo abaixo (use o id exato). Nunca invente ids.
6. Se um subelemento cobra uma ação anam.*, o paciente precisa ter uma resposta em paciente.respostas para ela; ef.* exige um achado em exameFisico; ex.* exige um impresso (impressos[].itens[].acao) que o entregue; int.* exige o impresso do exame correspondente.
7. O título e a descrição do caso NÃO podem entregar o diagnóstico: liste em termosProibidosNoTitulo os termos que o entregariam (radicais curtos, sem acento).
8. condutasDanosas: pelo menos 1 conduta (ações cd.*) que seria erro crítico neste caso; penalidadeDanosa entre 0,25 e 2 (múltiplo de 0,25). Nada que seja danoso ou desnecessário pode ser cobrado no PEP. condutasDesnecessarias é opcional.
9. Cada item do PEP tem "ensino": uma ou duas frases com o porquê clínico, coerentes com a ficha.
10. gabarito: diagnosticoPrincipal (texto), diagnosticoId (id dx.* cobrado no PEP), condutaEsperada (3 ou mais itens), errosCriticos (1 ou mais), explicacao (100 caracteres ou mais) e referencias com fonte e ano.
11. Caso original: invente paciente, história e achados. Não copie texto de prova, curso ou livro.`;

export function montarPromptGeracao({ ficha, catalogo, exemplo, cenario, problemas = null, anterior = null }) {
    const referencia = JSON.stringify(exemplo);
    return `Você é um especialista em educação médica brasileira e autor de estações OSCE no padrão da prova prática do Revalida.

TAREFA: escreva UMA estação inédita sobre o tema "${ficha.tema.nome}".
CENÁRIO A ESCREVER: ${cenario ? `${cenario.resumo}` : 'qualquer cenário coerente com a ficha'}
Varie idade, sexo, profissão, nome e detalhes do paciente em relação ao exemplo de formato abaixo.

FICHA DO TEMA (ÚNICA FONTE PERMITIDA de conduta, dose, limiar e prazo; não afirme nada clínico que não esteja aqui):
${JSON.stringify(ficha)}

PROIBIDO COBRAR: tudo que está em "naoCobrirAteComplementar" na ficha.

${REGRAS}

CATÁLOGO DE AÇÕES (id | rótulo):
${catalogoEmTexto(catalogo)}

FORMATO DE SAÍDA: um único objeto JSON, sem texto fora dele, com exatamente estas chaves: titulo, dificuldade ("BÁSICA", "INTERMEDIÁRIA" ou "AVANÇADA"), cenario, caso, termosProibidosNoTitulo, paciente, exameFisico, impressos, pep, condutasDanosas, condutasDesnecessarias, penalidadeDanosa, gabarito. NÃO inclua schemaVersion, id, status, tempoMinutos, classificacao nem revisao (o servidor preenche).
Use o EXEMPLO ABAIXO apenas como molde de estrutura e de nível de detalhe; o caso, o paciente e os achados da sua estação devem ser diferentes:
${referencia}
${problemas ? `\nSUA TENTATIVA ANTERIOR TEVE PROBLEMAS. Corrija todos e devolva o objeto JSON COMPLETO:\n${problemas.map(p => `- ${p}`).join('\n')}\n\nTENTATIVA ANTERIOR:\n${JSON.stringify(anterior)}` : ''}`;
}

export function montarPromptAuditoria({ ficha, estacao }) {
    const clinico = { cenario: estacao.cenario, caso: estacao.caso, impressos: estacao.impressos, pep: estacao.pep.itens.map(i => ({ id: i.id, texto: i.texto, ensino: i.ensino, regras: i.regras })), condutasDanosas: estacao.condutasDanosas, condutasDesnecessarias: estacao.condutasDesnecessarias, gabarito: estacao.gabarito };
    return `AUDITORIA CLÍNICA DE ESTAÇÃO OSCE. Você é um revisor rigoroso. Compare a estação com a FICHA DO TEMA, que é a única fonte permitida.

Verifique, item por item:
1. Toda dose, limiar numérico, prazo e critério citado na estação (PEP, ensino, gabarito, cenário, impressos) coincide com a ficha.
2. Nada da lista "naoCobrirAteComplementar" da ficha é cobrado ou afirmado.
3. A conduta esperada é viável no nível de atenção e nos recursos do cenário (ex.: não exigir hemodinâmica numa UPA que não tem).
4. As condutas listadas como danosas são de fato danosas segundo a ficha, e nada danoso aparece como esperado.
5. O diagnóstico do gabarito é coerente com os achados dos impressos e do exame físico, e não há contradição entre sinais vitais, exames e conduta.
6. Nenhuma contraindicação da ficha é violada pela conduta esperada neste paciente (ex.: nitrato com hipotensão, fibrinólise com contraindicação presente).

Responda SOMENTE com JSON: {"aprovada": true|false, "divergencias": [{"onde": "...", "problema": "..."}]}. Aprove apenas se NÃO houver nenhuma divergência.

FICHA DO TEMA:
${JSON.stringify(ficha)}

ESTAÇÃO:
${JSON.stringify(clinico)}`;
}

export function completarEstacao(bruta, { ficha, modelo = null, agora = new Date().toISOString(), id }) {
    const limpa = { ...bruta };
    CHAVES_DO_SERVIDOR.forEach(chave => delete limpa[chave]);
    const { rodizio, topico, temaSlug, areasRevalida } = ficha.tema;
    return {
        schemaVersion: '2.0.0',
        id,
        status: 'GERADA',
        ...limpa,
        tempoMinutos: 10,
        classificacao: { revalidaArea: areasRevalida[0], internato: { rodizio, topico, temaSlug } },
        revisao: {
            geradaPorIA: true,
            modelo: typeof modelo === 'function' ? modelo() : modelo,
            fichaId: ficha.id,
            dataRascunho: agora.slice(0, 10),
            auditoriaIA: null,
            revisaoProfissional: false,
            aprovadoPor: null
        }
    };
}

/**
 * @param {object} p
 * @param {object} p.ficha      ficha do tema (null => ErroGeracao 'sem-ficha')
 * @param {object} p.catalogo   osce/catalogo.json
 * @param {object} p.exemplo    estação curada usada só como molde de formato
 * @param {(prompt:string)=>Promise<string>} p.chamarIA
 */
export async function gerarEstacao({ ficha, catalogo, exemplo, chamarIA, cenarioId = null, modelo = null, agora = new Date().toISOString(), aleatorio = Math.random }) {
    if (!ficha) throw new ErroGeracao('sem-ficha', 'Este tema ainda não tem ficha de diretriz, então não gero estação para ele.');
    const cenario = escolherCenario(ficha, cenarioId, aleatorio);
    const id = `ia-${ficha.tema.temaSlug}-${Date.parse(agora).toString(36)}`;

    let problemas = null;
    let anterior = null;
    // registro de tudo que deu errado em cada tentativa: vai junto do erro final,
    // pra dar pra ver POR QUE a IA não passou nas verificações.
    const registro = [];
    const anotar = (tentativa, etapa, lista) => lista.forEach(item => registro.push(`tentativa ${tentativa} (${etapa}): ${item}`));
    for (let tentativa = 1; tentativa <= MAX_TENTATIVAS; tentativa++) {
        let bruta;
        try {
            bruta = extrairJson(await chamarIA(montarPromptGeracao({ ficha, catalogo, exemplo, cenario, problemas, anterior })));
        } catch (erro) {
            // falha do provedor de IA (limite, chave, rede) não é culpa do texto: não adianta repetir
            if (erro instanceof ErroGeracao || erro.status) throw erro;
            problemas = [`A resposta anterior não era um JSON válido (${erro.message}). Devolva apenas o objeto JSON completo.`];
            anterior = null;
            anotar(tentativa, 'formato', problemas);
            continue;
        }

        const estacao = completarEstacao(bruta, { ficha, modelo, agora, id });
        const invalidos = validarEstacao(estacao, catalogo);
        if (invalidos.length) {
            problemas = invalidos;
            anterior = bruta;
            anotar(tentativa, 'validador', invalidos);
            continue;
        }

        let auditoria;
        try {
            auditoria = extrairJson(await chamarIA(montarPromptAuditoria({ ficha, estacao })));
        } catch (erro) {
            if (erro instanceof ErroGeracao || erro.status) throw erro;
            auditoria = { aprovada: false, divergencias: [{ onde: 'auditoria', problema: `a auditoria não devolveu JSON válido (${erro.message})` }] };
        }
        const divergencias = (auditoria.divergencias || []).map(d => `${d.onde || 'estação'}: ${d.problema}`);
        if (auditoria.aprovada === true && !divergencias.length) {
            estacao.revisao.auditoriaIA = { aprovada: true, data: agora.slice(0, 10) };
            return { estacao, auditoria: { aprovada: true, divergencias: [], tentativas: tentativa } };
        }
        problemas = divergencias.length ? divergencias : ['a auditoria reprovou a estação sem detalhar o motivo'];
        anterior = bruta;
        anotar(tentativa, 'auditoria', problemas);
    }
    throw new ErroGeracao('reprovada', 'Não consegui gerar uma estação que passasse nas verificações. Tente novamente.', registro.slice(-30));
}
