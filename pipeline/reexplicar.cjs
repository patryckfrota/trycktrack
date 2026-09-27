#!/usr/bin/env node
/**
 * pipeline/reexplicar.cjs
 * 
 * Atualiza explicações antigas do banco principal (Revalida/INEP, etc.)
 * para o padrão novo UEPA de 4 seções (NÚCLEO, ARMADILHA, ALTERNATIVA POR ALTERNATIVA, FIXAÇÃO 80/20)
 * sem re-extrair nada de PDF.
 * 
 * Uso:
 *   node pipeline/reexplicar.cjs --dry-run
 *   node pipeline/reexplicar.cjs --limit 8
 *   node pipeline/reexplicar.cjs --limit 50
 *   node pipeline/reexplicar.cjs --filter "cg-inep" --limit 16
 * 
 * Regras Estritas:
 * 1. Zero duplicatas (atualiza pelo ID canônico existente).
 * 2. Nunca toca no Internato (questions-internato.js e question-explanations-internato.js são excluídos).
 * 3. Validação determinística no portão (validarItem de pipeline/validar.cjs).
 * 4. Isolamento de sub-lote: se um chunk falhar, isola e segue pro próximo.
 * 5. Sem push automático de conteúdo (L7).
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const { problemaTaxonomia, ajudaTaxonomia } = require('../taxonomia/validar.cjs');
const { validarItem, impressao, CATEGORIAS } = require('./validar.cjs');

// Helpers de formatação e limpeza
function cleanJsonOutput(rawText) {
  const trimmed = String(rawText || '').trim();
  const match = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return match ? match[1].trim() : trimmed;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function cleanSectionHeader(text, headerRegex) {
  return String(text || '').replace(headerRegex, '').trim();
}

function formatFullExplanation(exp, answerLetter) {
  const nucleo = cleanSectionHeader(exp.nucleo, /^NÚCLEO(?:\s+DA\s+QUESTÃO)?:?\s*/i);
  const armadilha = cleanSectionHeader(exp.armadilha, /^ARMADILHA(?:\s*[—–-]\s*ONDE\s+SE\s+ERRA)?:?\s*/i);
  const alternativas = cleanSectionHeader(exp.alternativas, /^ALTERNATIVA\s+POR\s+ALTERNATIVA:?\s*/i);
  let fixacao = cleanSectionHeader(exp.fixacao, /^FIXAÇÃO(?:\s+80\/20)?:?\s*/i);

  const finalAnswerLine = answerLetter
    ? `Portanto, o gabarito é a alternativa ${answerLetter}.`
    : 'Portanto, a questão foi anulada pela banca.';

  if (answerLetter) {
    fixacao = fixacao.replace(/Portanto,\s*(?:o\s+gabarito\s+é\s+a\s+alternativa|a\s+questão\s+foi\s+anulada)[^.]*\.?/gi, '').trim();
  }

  const fixacaoBody = `${fixacao}\n${finalAnswerLine}`;

  return `NÚCLEO DA QUESTÃO
${nucleo}

ARMADILHA — ONDE SE ERRA
${armadilha}

ALTERNATIVA POR ALTERNATIVA
${alternativas}

FIXAÇÃO 80/20
${fixacaoBody.trim()}`;
}

/**
 * Carrega dinamicamente o banco de questões principal e suas explicações,
 * excluindo terminantemente o Internato.
 */
function carregarBancoPrincipal() {
  const context = { window: {} };
  vm.createContext(context);

  const files = fs.readdirSync(ROOT).filter(f => /^questions-.*\.js$/.test(f) && f !== 'questions-internato.js');
  files.sort();

  for (const f of files) {
    const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
    vm.runInContext(code, context);
  }

  const expFile = path.join(ROOT, 'question-explanations.js');
  if (fs.existsSync(expFile)) {
    const expCode = fs.readFileSync(expFile, 'utf8');
    vm.runInContext(expCode, context);
  }

  const bank = context.window.TRYCKTRACK_QUESTION_BANK || [];
  const explanations = context.window.TRYCKTRACK_QUESTION_EXPLANATIONS || {};
  const aliases = context.window.TRYCKTRACK_QUESTION_EXPLANATION_ALIASES || {};

  return { bank, explanations, aliases };
}

/**
 * Constrói o mapa de impressões de enunciado para checagem de duplicata
 */
function construirMapaImpressoes(bank) {
  const porImpressao = new Map();
  for (const q of bank) {
    const k = impressao(q);
    if (k && !porImpressao.has(k)) {
      porImpressao.set(k, q.id);
    }
  }
  return porImpressao;
}

/**
 * Identifica dinamicamente as questões alvo que necessitam de modernização
 */
function identificarAlvos(bank, aliases, options = {}) {
  const { filterRegex, offset = 0, limit = Infinity } = options;

  // Filtra questões sem NÚCLEO DA QUESTÃO na explicação (apenas objetivas, com >= 2 alternativas)
  const semNucleo = bank.filter(q => {
    const exp = q.explanation || '';
    const isObjective = Object.keys(q.options || {}).length >= 2;
    return isObjective && !exp.includes('NÚCLEO DA QUESTÃO');
  });

  // Deduplica por ID canônico para não processar a mesma explicação duas vezes
  const vistos = new Set();
  const alvosUnicos = [];

  for (const q of semNucleo) {
    const canonicalId = aliases[q.id] || q.id;
    if (vistos.has(canonicalId)) continue;
    vistos.add(canonicalId);

    if (filterRegex && !filterRegex.test(q.id) && !filterRegex.test(q.area || '')) {
      continue;
    }

    alvosUnicos.push(q);
  }

  const fatiados = alvosUnicos.slice(offset, offset + limit);
  return {
    totalSemNucleo: semNucleo.length,
    totalAlvosUnicos: alvosUnicos.length,
    selecionados: fatiados
  };
}

/**
 * Constrói o prompt clínico de Estágio 2 para o Gemini
 */
function buildPrompt(questions) {
  const simplified = questions.map(q => ({
    id: q.id,
    number: q.number,
    stem: q.stem,
    options: q.options,
    answer: q.answer,
    area: q.area,
    assunto: q.assunto,
    topico: q.topico,
    source: q.source,
    explicacaoLegada: q.explanation ? q.explanation.slice(0, 1000) : undefined
  }));

  return `Você é um Médico Especialista e Professor de Residência Médica de elite (Padrão UEPA / Estratégia MED).
Para cada uma das questões médicas fornecidas abaixo, sua missão é redigir a resolução comentada no padrão ouro do projeto (extensão de 200 a 400 palavras por questão), seguindo ESTRITAMENTE as 4 seções:

DIRETRIZES CLÍNICAS E DE FORMAÇÃO:
1. "nucleo": Regra geral clínica universal que extrapola este caso específico (2 a 4 frases densas, ~40 palavras). Proibido resumir enunciado ou usar "neste caso".
2. "armadilha": OBRIGATORIAMENTE DOIS PARÁGRAFOS DENSOS (60 a 150 palavras):
   - Parágrafo 1 (O erro): Nomear a pista concreta do enunciado que seduz o aluno para o distrator mais tentador e apontar o viés de raciocínio (ex: Ancoragem, Fechamento prematuro, Troca de comando, Erro de conceito).
   - Parágrafo 2 (O raciocínio correto): Raciocínio fisiopatológico e semiológico passo a passo na ordem que o médico pensa, citando a DIRETRIZ OFICIAL NACIONAL DA ESPECIALIDADE (ex: SBC, SBPT, SBP, FEBRASGO, PCDT/MS, ATLS).
3. "alternativas": Análise minuciosa de TODAS as alternativas presentes na questão (A, B, C, D e E se houver).
   - Inicie CADA uma obrigatoriamente com a letra e parêntese: "A) Correta (ou Errada)...", "B) Errada...", etc.
   - Para as alternativas ERRADAS: justifique por que não serve para este paciente E EM QUAL SITUAÇÃO CLÍNICA ELA SERIA A RESPOSTA CERTA ("seria indicado se houvesse...", "é reservado para casos de...").
   - Proibido apenas dizer "está errada". NUNCA comente apenas a alternativa correta; a omissão de qualquer letra causa reprovação imediata no portão.
4. "fixacao": Síntese prática mnemônica (2 a 4 frases) com os números-chave e regras de ouro do tema.
   - OBRIGATORIAMENTE deve terminar com a frase exata: "Portanto, o gabarito é a alternativa X." (ou "Portanto, a questão foi anulada pela banca.").
5. Gabarito e anulação: O gabarito oficial ("answer") já foi validado e fornecido. NÃO altere o gabarito e NÃO marque como anulada a menos que a questão já seja anulada.
6. Taxonomia: Você pode confirmar ou ajustar "area" (uma das 20 especialidades oficiais), "assunto" e "topico".

QUESTÕES A RESOLVER:
${JSON.stringify(simplified, null, 2)}

SCHEMA JSON ESPERADO:
{
  "items": [
    {
      "questionId": "ID_DA_QUESTAO",
      "area": "Especialidade Oficial",
      "assunto": "Nome do Assunto",
      "topico": "Nome do Tópico",
      "explanation": {
        "questionId": "ID_DA_QUESTAO",
        "nucleo": "...",
        "armadilha": "...",
        "alternativas": "...",
        "fixacao": "..."
      }
    }
  ]
}

Retorne SOMENTE o JSON válido, sem markdown antes ou depois.`;
}

/**
 * Normaliza variações estruturais da resposta do modelo
 */
function normalizarRespostaModelo(rawItems, targetQuestions) {
  const questionMap = new Map(targetQuestions.map(q => [q.id, q]));
  const normalized = [];

  for (const raw of rawItems) {
    const qId = raw.questionId || raw.id || raw.explanation?.questionId;
    const originalQ = questionMap.get(qId);
    if (!originalQ) continue;

    const exp = raw.explanation || raw;
    let alternativas = exp.alternativas;
    if (Array.isArray(alternativas)) {
      alternativas = alternativas.join('\n');
    } else if (alternativas && typeof alternativas === 'object') {
      alternativas = Object.entries(alternativas)
        .map(([k, v]) => `${k}) ${v}`)
        .join('\n');
    }

    let armadilha = exp.armadilha;
    if (Array.isArray(armadilha)) {
      armadilha = armadilha.join('\n\n');
    }

    let fixacao = exp.fixacao || '';
    const answerLetter = originalQ.answer;
    if (!fixacao.includes('Portanto, o gabarito é a alternativa') && !fixacao.includes('Portanto, a questão foi anulada')) {
      const closing = answerLetter
        ? `Portanto, o gabarito é a alternativa ${answerLetter}.`
        : 'Portanto, a questão foi anulada pela banca.';
      fixacao = `${fixacao.trim()}\n${closing}`;
    }

    const explanationObj = {
      questionId: originalQ.id,
      nucleo: String(exp.nucleo || '').trim(),
      armadilha: String(armadilha || '').trim(),
      alternativas: String(alternativas || '').trim(),
      fixacao: String(fixacao || '').trim()
    };

    // Preserva a taxonomia oficial já validada da questão original (só aceita sugestão do modelo se a questão original tiver problema)
    let fullQuestion = { ...originalQ };
    if (problemaTaxonomia(originalQ)) {
      fullQuestion = {
        ...originalQ,
        ...(raw.area ? { area: raw.area } : {}),
        ...(raw.assunto ? { assunto: raw.assunto } : {}),
        ...(raw.topico ? { topico: raw.topico } : {})
      };
    }

    // Autocorreção taxonômica determinística (0 tokens)
    if (problemaTaxonomia(fullQuestion)) {
      const orientacao = ajudaTaxonomia(fullQuestion);
      const mArea = orientacao.match(/area:\s*"([^"]+)"/);
      const mAssunto = orientacao.match(/assunto:\s*"([^"]+)"/);
      const mTopico = orientacao.match(/topico:\s*"([^"]+)"/);
      if (mArea && mAssunto && mTopico) {
        const candidate = {
          ...fullQuestion,
          area: mArea[1],
          assunto: mAssunto[1],
          topico: mTopico[1]
        };
        if (!problemaTaxonomia(candidate)) {
          fullQuestion.area = mArea[1];
          fullQuestion.assunto = mAssunto[1];
          fullQuestion.topico = mTopico[1];
        }
      }
    }

    normalized.push({
      question: fullQuestion,
      explanation: explanationObj
    });
  }

  return normalized;
}

/**
 * Processa um único chunk de questões chamando o Gemini e validando no portão
 */
async function processarChunk(ai, chunkQuestions, bancoImpressao, modelName, maxAttempts = 3) {
  const prompt = buildPrompt(chunkQuestions);
  let activeModel = modelName;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      let response;
      let apiRetry = 0;
      const MAX_API_RETRIES = 5;

      while (true) {
        try {
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout de 40s na requisição à API do Gemini')), 40000)
          );

          response = await Promise.race([
            ai.models.generateContent({
              model: activeModel,
              contents: [{ role: 'user', parts: [{ text: prompt }] }],
              config: { responseMimeType: 'application/json' }
            }),
            timeoutPromise
          ]);
          break;
        } catch (apiErr) {
          const errMsg = apiErr?.message || '';

          // Se esgotou a cota diária de 500 RPD daquele modelo específico, alterna automaticamente para o modelo irmão
          const isDailyQuotaExceeded = errMsg.includes('GenerateRequestsPerDayPerProjectPerModel-FreeTier') || 
                                       errMsg.includes('limit: 500');
          if (isDailyQuotaExceeded) {
            if (activeModel === 'gemini-3.5-flash-lite') {
              console.warn(`[Reexplicar] 🔄 Cota diária esgotada para gemini-3.5-flash-lite. Alternando para gemini-3.1-flash-lite...`);
              activeModel = 'gemini-3.1-flash-lite';
              apiRetry = 0;
              await sleep(1500);
              continue;
            } else if (activeModel === 'gemini-3.1-flash-lite') {
              console.warn(`[Reexplicar] 🔄 Cota diária esgotada para gemini-3.1-flash-lite. Alternando para gemini-3.5-flash-lite...`);
              activeModel = 'gemini-3.5-flash-lite';
              apiRetry = 0;
              await sleep(1500);
              continue;
            }
          }

          const isTransient = errMsg.includes('503') || errMsg.includes('429') ||
                              errMsg.includes('high demand') || errMsg.includes('ResourceExhausted') ||
                              errMsg.includes('UNAVAILABLE') || errMsg.includes('overloaded');

          if (isTransient && apiRetry < MAX_API_RETRIES) {
            apiRetry++;
            const backoffMs = Math.min(30000, Math.pow(2, apiRetry) * 3000 + Math.floor(Math.random() * 1000));
            console.warn(`[Reexplicar] ⏳ Erro transitório da API (${errMsg.slice(0, 80)}...). Backoff de ${(backoffMs / 1000).toFixed(1)}s (tentativa ${apiRetry}/${MAX_API_RETRIES})...`);
            await sleep(backoffMs);
            continue;
          }
          throw apiErr;
        }
      }

      const cleaned = cleanJsonOutput(response.text || '');
      const parsed = JSON.parse(cleaned);
      const rawItems = Array.isArray(parsed?.items) ? parsed.items : (Array.isArray(parsed) ? parsed : []);

      if (rawItems.length === 0) {
        throw new Error('Modelo retornou lista vazia de resoluções.');
      }

      const normalizedItems = normalizarRespostaModelo(rawItems, chunkQuestions);
      if (normalizedItems.length !== chunkQuestions.length) {
        console.warn(`[Reexplicar] ⚠️ Quantidade retornada (${normalizedItems.length}) diverge do pedido (${chunkQuestions.length}).`);
      }

      // Validação estrita de cada item pelo Portão (validarItem de pipeline/validar.cjs)
      const vistosNoLote = new Map();
      const itensComErro = [];

      for (const item of normalizedItems) {
        const v = validarItem(item, bancoImpressao, vistosNoLote);
        if (v.erros && v.erros.length > 0) {
          itensComErro.push({ id: item.question.id, erros: v.erros });
        }
      }

      if (itensComErro.length > 0) {
        console.warn(`[Reexplicar] ⚠️ Tentativa ${attempt}: ${itensComErro.length} questão(ões) reprovada(s) no portão:`);
        for (const f of itensComErro) {
          console.warn(`   - ${f.id}: ${f.erros.map(e => `${e.cat}: ${e.msg}`).join('; ')}`);
        }
        if (attempt < maxAttempts) {
          await sleep(2000 * attempt);
          continue;
        }
        throw new Error(`Reprovado no portão de validação: ${itensComErro.map(e => e.id).join(', ')}`);
      }

      // Sucesso total no chunk!
      return normalizedItems;

    } catch (err) {
      console.warn(`[Reexplicar] ⚠️ Tentativa ${attempt}/${maxAttempts} falhou: ${err.message}`);
      if (attempt >= maxAttempts) throw err;
      await sleep(2000 * attempt);
    }
  }

  throw new Error('Falha após esgotar tentativas.');
}

// -------------------------------------------------------------
// CLI Principal
// -------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);

  let limit = 16;
  let chunkSize = 8;
  let dryRun = false;
  let modelName = 'gemini-3.1-flash-lite';
  let delayMs = 2000;
  let filterRegex = null;
  let offset = 0;

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--dry-run') dryRun = true;
    else if (a === '--limit' && args[i + 1]) {
      const v = args[++i];
      limit = (v === 'all' || v === '0') ? Infinity : parseInt(v, 10);
    }
    else if (a === '--chunk-size' && args[i + 1]) chunkSize = parseInt(args[++i], 10);
    else if (a === '--model' && args[i + 1]) modelName = args[++i];
    else if (a === '--delay' && args[i + 1]) delayMs = parseInt(args[++i], 10);
    else if (a === '--offset' && args[i + 1]) offset = parseInt(args[++i], 10);
    else if (a === '--filter' && args[i + 1]) filterRegex = new RegExp(args[++i], 'i');
    else if (a === '--help' || a === '-h') {
      console.log(`
Uso: node pipeline/reexplicar.cjs [opções]

Opções:
  --dry-run             Apenas analisa o banco e mostra as questões alvo sem chamar a API nem alterar arquivos
  --limit <N|all>       Número de questões a re-explicar (padrão: 16)
  --chunk-size <N>      Tamanho de cada sub-lote enviado ao modelo (padrão: 8)
  --delay <ms>          Pausa em ms entre os chunks (padrão: 2000)
  --offset <N>          Pula os primeiros N alvos (padrão: 0)
  --filter <regex>      Filtra questões por ID ou especialidade (ex: "cg-inep" ou "Pediatria")
  --model <nome>        Modelo Gemini a utilizar (padrão: gemini-3.5-flash-lite)
  --help                Exibe esta ajuda
      `);
      return 0;
    }
  }

  console.log('===========================================================');
  console.log('🩺 Trycktrack — Re-explicação Clínica para Padrão UEPA');
  console.log('===========================================================');

  const { bank, explanations, aliases } = carregarBancoPrincipal();
  console.log(`[Banco] Total de questões no banco principal: ${bank.length}`);
  console.log(`[Banco] Total de explicações mapeadas: ${Object.keys(explanations).length}`);

  const alvosInfo = identificarAlvos(bank, aliases, { filterRegex, offset, limit });
  console.log(`[Alvos] Total de questões sem 'NÚCLEO DA QUESTÃO': ${alvosInfo.totalSemNucleo}`);
  console.log(`[Alvos] Questões únicas (deduplicadas por canônico): ${alvosInfo.totalAlvosUnicos}`);
  console.log(`[Alvos] Selecionadas para esta execução: ${alvosInfo.selecionados.length}`);

  if (alvosInfo.selecionados.length === 0) {
    console.log('🎉 Nenhuma questão pendente de re-explicação encontrada!');
    return 0;
  }

  // Estatística por área das selecionadas
  const contagemArea = {};
  for (const q of alvosInfo.selecionados) {
    contagemArea[q.area] = (contagemArea[q.area] || 0) + 1;
  }
  console.log('[Distribuição das selecionadas]:');
  for (const [area, n] of Object.entries(contagemArea).sort((a, b) => b[1] - a[1])) {
    console.log(`   - ${area}: ${n}`);
  }

  if (dryRun) {
    console.log('\n[Dry-Run] Amostra das primeiras 5 questões que seriam re-explicadas:');
    for (const q of alvosInfo.selecionados.slice(0, 5)) {
      console.log(`   * ${q.id} (${q.area}): ${q.stem.slice(0, 100)}...`);
    }
    console.log('\n[Dry-Run] Execução simulada com sucesso. Nenhuma alteração foi realizada.');
    return 0;
  }

  // Carrega dependências dinâmicas para execução real
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error('❌ ERRO: GEMINI_API_KEY não configurada no ambiente.');
    return 1;
  }

  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey });

  const { updatePrincipalExplanations } = await import('../backend/src/staticPrincipalWriter.js');
  const bancoImpressao = construirMapaImpressoes(bank);

  const selecionados = alvosInfo.selecionados;
  const totalChunks = Math.ceil(selecionados.length / chunkSize);
  console.log(`\n📦 Dividindo em ${totalChunks} lote(s) de até ${chunkSize} questões (Modelo: ${modelName})...\n`);

  let aprovadas = 0;
  let reprovadas = 0;
  const falhas = [];

  for (let i = 0; i < selecionados.length; i += chunkSize) {
    const chunkIdx = Math.floor(i / chunkSize) + 1;
    const chunk = selecionados.slice(i, i + chunkSize);
    console.log(`[Lote ${chunkIdx}/${totalChunks}] Processando ${chunk.length} questão(ões): ${chunk.map(q => q.id).join(', ')}...`);

    try {
      const itemsAprovados = await processarChunk(ai, chunk, bancoImpressao, modelName);

      // Gravação atômica do chunk no question-explanations.js
      const batchUpdates = {};
      for (const item of itemsAprovados) {
        const formatted = formatFullExplanation(item.explanation, item.question.answer);
        batchUpdates[item.question.id] = formatted;
      }

      updatePrincipalExplanations(batchUpdates);
      aprovadas += itemsAprovados.length;
      console.log(`✅ [Lote ${chunkIdx}/${totalChunks}] ${itemsAprovados.length} explicações atualizadas e salvas com sucesso!`);

    } catch (chunkErr) {
      console.error(`❌ [Lote ${chunkIdx}/${totalChunks}] Falha no lote: ${chunkErr.message}`);
      reprovadas += chunk.length;
      falhas.push({
        lote: chunkIdx,
        ids: chunk.map(q => q.id),
        erro: chunkErr.message
      });
      // Salva pendência isolada
      try {
        const pendenciasDir = path.join(__dirname, 'pendencias');
        fs.mkdirSync(pendenciasDir, { recursive: true });
        const pendenciaFile = path.join(pendenciasDir, `reexplicar-pendente-lote-${chunkIdx}-${Date.now()}.json`);
        fs.writeFileSync(pendenciaFile, JSON.stringify({ ids: chunk.map(q => q.id), erro: chunkErr.message }, null, 2));
      } catch (e) {}
    }

    if (i + chunkSize < selecionados.length) {
      console.log(`[Reexplicar] Aguardando ${delayMs / 1000}s antes do próximo lote...`);
      await sleep(delayMs);
    }
  }

  console.log('\n===========================================================');
  console.log('📊 RESUMO DA EXECUÇÃO');
  console.log('===========================================================');
  console.log(`Questões selecionadas: ${selecionados.length}`);
  console.log(`Aprovadas e atualizadas: ${aprovadas}`);
  console.log(`Reprovadas / Pendentes: ${reprovadas}`);

  // Re-avalia o banco após as gravações para mostrar saldo restante
  const posBanco = carregarBancoPrincipal();
  const posAlvos = identificarAlvos(posBanco.bank, posBanco.aliases);
  console.log(`Saldo de questões legadas restantes no banco: ${posAlvos.totalSemNucleo}`);

  if (falhas.length > 0) {
    console.warn(`\n⚠️ Lotes com falha salvos em pipeline/pendencias/.`);
    return 1;
  }

  console.log('\n✨ Todas as questões deste lote foram atualizadas para o padrão UEPA!');
  return 0;
}

if (require.main === module) {
  main().then(code => process.exit(code || 0)).catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

module.exports = {
  carregarBancoPrincipal,
  identificarAlvos,
  buildPrompt,
  formatFullExplanation
};
