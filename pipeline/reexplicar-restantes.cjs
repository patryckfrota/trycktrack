#!/usr/bin/env node
/**
 * pipeline/reexplicar-restantes.cjs
 * 
 * Processa as 47 chaves restantes fora do Internato que ainda não possuíam
 * a seção NÚCLEO DA QUESTÃO em question-explanations.js.
 * 
 * - 37 chaves: Sincroniza com as explicações canônicas já modernizadas no padrão de 4 seções.
 * - 10 questões discursivas: Moderniza via Gemini para a estrutura de 4 seções adaptada para questões discursivas:
 *     NÚCLEO DA QUESTÃO
 *     ARMADILHA — ONDE SE ERRA
 *     ESPELHO DA BANCA — ITEM POR ITEM
 *     FIXAÇÃO 80/20
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { GoogleGenAI } = require('@google/genai');

const ROOT = path.resolve(__dirname, '..');
const { updatePrincipalExplanations } = require(path.join(ROOT, 'backend/src/staticPrincipalWriter.js'));

const MAPPING_37 = {
  "pediatria-inep-006": "prev-inep-083",
  "pediatria-inep-015": "ginecologia-inep-015",
  "pediatria-inep-033": "cm-infectologia-030",
  "pediatria-inep-040": "ginecologia-inep-028",
  "pediatria-inep-043": "cm-infectologia-032",
  "pediatria-inep-060": "cg-inep-056",
  "pediatria-inep-064": "obstetricia-inep-045",
  "ginecologia-inep-016": "prev-inep-088",
  "cg-inep-069": "pediatria-inep-069",
  "cg-inep-109": "pediatria-inep-098",
  "cg-inep-115": "pediatria-inep-107",
  "cm-cardiologia-001": "cm-endocrinologia-002",
  "cm-dermatologia-015": "prev-inep-024",
  "cm-endocrinologia-012": "cm-nefrologia-009",
  "cm-hematologia-004": "pediatria-inep-032",
  "cm-hematologia-006": "pediatria-inep-048",
  "cm-hematologia-016": "cm-neurologia-022",
  "cm-hematologia-021": "pediatria-inep-111",
  "cm-infectologia-003": "cm-nefrologia-002",
  "cm-infectologia-006": "cm-reumatologia-003",
  "cm-infectologia-022": "cg-inep-023",
  "cm-infectologia-023": "cm-nefrologia-007",
  "cm-infectologia-024": "obstetricia-inep-023",
  "cm-infectologia-047": "cm-dermatologia-012",
  "cm-infectologia-056": "cm-pneumologia-011",
  "cm-infectologia-063": "cm-reumatologia-010",
  "cm-infectologia-071": "cg-inep-112",
  "cm-pneumologia-006": "prev-inep-003",
  "cm-pneumologia-010": "prev-inep-002",
  "cm-pneumologia-013": "cg-inep-090",
  "cm-reumatologia-016": "pediatria-inep-039",
  "cm-neurologia-005": "cg-inep-016",
  "cm-neurologia-020": "pediatria-inep-069",
  "cm-neurologia-027": "prev-inep-001",
  "revalida-2025-2-095": "cm-infectologia-018",
  "revalida-2023-2-101": "revalida-2023-2-061",
  "revalida-2026-1-049": "prev-inep-066"
};

const DISCURSIVE_10 = [
  "revalida-2022-1-028", "revalida-2022-1-042", "revalida-2022-1-075", "revalida-2022-1-082", "revalida-2022-1-105",
  "revalida-2025-1-101", "revalida-2025-1-102", "revalida-2025-1-103", "revalida-2025-1-104", "revalida-2025-1-105"
];

function carregarBanco() {
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
  return {
    bank: context.window.TRYCKTRACK_QUESTION_BANK || [],
    explanations: context.window.TRYCKTRACK_QUESTION_EXPLANATIONS || {},
    aliases: context.window.TRYCKTRACK_QUESTION_EXPLANATION_ALIASES || {}
  };
}

function cleanJson(text) {
  const trimmed = String(text || '').trim();
  const match = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return match ? match[1].trim() : trimmed;
}

async function callGeminiDiscursive(ai, q, legacyExp) {
  const prompt = `Você é um preceptor médico especialista em bancas de Revalida/INEP e provas de Residência Médica.
Sua tarefa é reestruturar a resolução desta questão DISCURSIVA oficial do Revalida para o padrão pedagógico de alta performance Trycktrack.

Dados da Questão Discursiva:
ID: ${q.id}
Área: ${q.area}
Prova: ${q.source || q.examName}
Enunciado completo:
${q.stem}

Gabarito Oficial / Resposta Esperada Legada:
${legacyExp}

Estruture a resposta estritamente no seguinte formato JSON:
{
  "nucleo": "Texto claro e direto do conceito central do caso clínico (diagnóstico, conduta emergencial ou fisiopatologia principal).",
  "armadilha": "Onde os candidatos mais perdem pontos na resposta discursiva (erros comuns de nomenclatura, omissão de condutas prioritárias, exames equivocados).",
  "espelho": "Espelho da banca estruturado item a item (a, b, c, d), detalhando exatamente os critérios esperados e a pontuação quando informada.",
  "fixacao": "Regra de ouro 80/20 em 1 a 2 linhas para memorização rápida."
}

Retorne APENAS o JSON válido sem nenhum texto adicional.`;

  const models = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: 0.1,
          responseMimeType: 'application/json'
        }
      });
      const parsed = JSON.parse(cleanJson(response.text));
      if (parsed.nucleo && parsed.espelho) {
        return parsed;
      }
    } catch (err) {
      console.warn(`[Gemini] Falha no modelo ${model}: ${err.message}. Tentando próximo...`);
    }
  }
  throw new Error(`Não foi possível gerar explicação discursiva para ${q.id}`);
}

function formatSection(val) {
  if (!val) return '';
  if (typeof val === 'string') return val.trim();
  if (Array.isArray(val)) {
    return val.map(item => (typeof item === 'object' ? JSON.stringify(item) : String(item))).join('\n');
  }
  if (typeof val === 'object') {
    return Object.entries(val)
      .map(([k, v]) => `${k}) ${typeof v === 'object' ? JSON.stringify(v) : v}`)
      .join('\n\n');
  }
  return String(val).trim();
}

async function main() {
  console.log('=== INICIANDO MODERNIZAÇÃO DAS 47 CHAVES RESTANTES ===\n');
  const { bank, explanations } = carregarBanco();

  const updates = {};

  // 1. Sincronizar 37 chaves mapeadas com a explicação canônica já modernizada
  console.log('Passo 1: Sincronizando 37 chaves com suas explicações canônicas...');
  let mappedSuccess = 0;
  for (const [orphanId, canonicalId] of Object.entries(MAPPING_37)) {
    const canonExp = explanations[canonicalId];
    if (canonExp && canonExp.includes('NÚCLEO DA QUESTÃO')) {
      updates[orphanId] = canonExp;
      mappedSuccess++;
    } else {
      console.warn(`⚠️ Alerta: Canônico ${canonicalId} para ${orphanId} não possui NÚCLEO DA QUESTÃO!`);
    }
  }
  console.log(`✅ ${mappedSuccess}/37 chaves sincronizadas com sucesso.`);

  // 2. Modernizar as 10 questões discursivas
  console.log('\nPasso 2: Modernizando as 10 questões discursivas via Gemini...');
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY não configurada.');
  }
  const ai = new GoogleGenAI({ apiKey });

  for (const qid of DISCURSIVE_10) {
    const q = bank.find(x => x.id === qid);
    const legacyExp = explanations[qid] || (q && q.explanation) || '';
    if (legacyExp.includes('NÚCLEO DA QUESTÃO')) {
      console.log(`[Discursiva] ${qid} já possui NÚCLEO DA QUESTÃO. Pulando.`);
      updates[qid] = legacyExp;
      continue;
    }
    console.log(`[Discursiva] Processando ${qid}...`);
    try {
      const parsed = await callGeminiDiscursive(ai, q, legacyExp);
      const nucleoStr = formatSection(parsed.nucleo);
      const armadilhaStr = formatSection(parsed.armadilha);
      const espelhoStr = formatSection(parsed.espelho);
      const fixacaoStr = formatSection(parsed.fixacao);

      const fullExplanation = `NÚCLEO DA QUESTÃO
${nucleoStr}

ARMADILHA — ONDE SE ERRA
${armadilhaStr}

ESPELHO DA BANCA — ITEM POR ITEM
${espelhoStr}

FIXAÇÃO 80/20
${fixacaoStr}`;

      updates[qid] = fullExplanation;
      console.log(`  ✅ ${qid} concluído.`);
    } catch (err) {
      console.error(`  ❌ Erro em ${qid}:`, err.message);
    }
  }

  // 3. Gravar todas as atualizações de forma atômica
  console.log(`\nPasso 3: Gravando ${Object.keys(updates).length} atualizações em question-explanations.js...`);
  updatePrincipalExplanations(updates);
  console.log('✅ Gravação concluída com sucesso!');

  // 4. Verificação de integridade
  console.log('\nPasso 4: Verificando integridade das explicações pós-atualização...');
  const pos = carregarBanco();
  const pendentesPos = Object.entries(pos.explanations)
    .filter(([k, v]) => !k.startsWith('internato-') && !v.includes('NÚCLEO DA QUESTÃO'))
    .map(([k]) => k);

  console.log(`🔍 Total de chaves fora do Internato sem NÚCLEO DA QUESTÃO: ${pendentesPos.length}`);
  if (pendentesPos.length > 0) {
    console.log('Restantes:', pendentesPos);
  } else {
    console.log('🎉 100% DAS EXPLICAÇÕES FORA DO INTERNATO AGORA POSSUEM O PADRÃO NOVO!');
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
