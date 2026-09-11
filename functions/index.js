/**
 * Cloud Functions do Trycktrack.
 *
 * generateOsceStation: gera uma estação OSCE inédita com a API do Gemini.
 * A chave da IA fica só aqui no servidor (Secret Manager) — o app cliente
 * (GitHub Pages/PWA) nunca a recebe. O cliente manda área/tema/subtema/
 * formato (do catálogo curricular fixo) e recebe de volta um JSON já
 * validado, no MESMO formato usado pelas estações estáticas de
 * osce-stations.js — assim o app reaproveita o fluxo local existente
 * (normalizeLocalOsceStation → osceStationsCache → startOsceSession)
 * sem precisar de nenhuma mudança na tela de prática.
 */

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const { setGlobalOptions } = require('firebase-functions/v2');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { z } = require('zod');

setGlobalOptions({ region: 'southamerica-east1', maxInstances: 10 });

const GEMINI_API_KEY = defineSecret('GEMINI_API_KEY');
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

const OSCE_FORMATS = [
    'ANAMNESE_FOCADA', 'EXAME_FISICO', 'RACIOCINIO_DIAGNOSTICO', 'CONDUTA',
    'PROCEDIMENTO', 'COMUNICACAO', 'URGENCIA_EMERGENCIA', 'ESTACAO_COMPLETA'
];

const AXES = ['COMMUNICATION', 'HISTORY', 'PHYSICAL_EXAM', 'DIAGNOSTIC_REASONING', 'MANAGEMENT'];

// --- validação do pedido do cliente -----------------------------------

const requestSchema = z.object({
    areaSlug: z.string().min(1).max(80),
    areaName: z.string().min(1).max(120),
    themeCode: z.enum(['A', 'B']),
    themeName: z.string().min(1).max(120),
    subthemeSlug: z.string().min(1).max(120),
    subthemeName: z.string().min(1).max(400),
    format: z.enum(OSCE_FORMATS),
    difficulty: z.enum(['BÁSICA', 'INTERMEDIÁRIA', 'AVANÇADA']).optional()
});

// --- validação do conteúdo gerado pela IA -------------------------------
// Espelha o schema oficial de importação (backend/src/osceStation.schema.js).
// A Function é quem preenche schemaVersion/externalId/metadata a partir do
// pedido validado — a IA só precisa gerar o conteúdo clínico do caso.

const checklistItemSchema = z.object({
    id: z.string().min(1),
    axis: z.enum(AXES),
    description: z.string().min(1),
    points: z.number().positive(),
    critical: z.boolean()
});

const taskSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    candidateInstructions: z.string().min(1),
    checklist: z.array(checklistItemSchema).min(4).max(10),
    answerKey: z.string().min(1)
});

const generatedContentSchema = z.object({
    title: z.string().min(1).max(140),
    difficulty: z.enum(['BÁSICA', 'INTERMEDIÁRIA', 'AVANÇADA']),
    estimatedMinutes: z.number().int().positive().max(20),
    scenario: z.object({
        environment: z.string().min(1),
        materials: z.array(z.string().min(1)).min(1)
    }),
    doorInstructions: z.object({
        patientName: z.string().min(1),
        age: z.union([z.string(), z.number()]),
        chiefComplaint: z.string().min(1),
        triageData: z.record(z.string(), z.string())
    }),
    patientScript: z.object({
        profile: z.object({
            behavior: z.string().min(1),
            tone: z.string().min(1),
            emotionalState: z.string().min(1),
            understanding: z.string().min(1),
            concerns: z.string().min(1),
            baseline: z.string().min(1)
        }),
        openingStatement: z.string().min(1),
        responses: z.array(z.object({
            trigger: z.string().min(1),
            response: z.string().min(1),
            releaseRule: z.string().min(1)
        })).min(6),
        hiddenInformation: z.array(z.string().min(1)).min(1)
    }),
    physicalExam: z.array(z.object({
        system: z.string().min(1),
        request: z.string().min(1),
        findings: z.array(z.string().min(1)).min(1)
    })).min(1),
    complementaryTests: z.array(z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        releaseRule: z.string().min(1),
        result: z.string().min(1)
    })).default([]),
    evolution: z.array(z.object({
        trigger: z.string().min(1),
        change: z.string().min(1)
    })).default([]),
    tasks: z.array(taskSchema).min(1).max(4),
    finalAnswer: z.object({
        expectedDiagnosis: z.string().min(1),
        expectedManagement: z.array(z.string().min(1)).min(1),
        criticalErrors: z.array(z.string().min(1)).min(1),
        explanation: z.string().min(1)
    })
});

// Um exemplo compacto e já validado, usado como referência de formato
// (few-shot) — não é sobre o mesmo tema pedido, só mostra a "forma" certa.
const FEW_SHOT_EXAMPLE = {
    title: 'Pessoa adulta com falta de ar e chiado',
    difficulty: 'INTERMEDIÁRIA',
    estimatedMinutes: 10,
    scenario: {
        environment: 'Unidade de pronto atendimento, sala de atendimento clínico inicial.',
        materials: ['Estetoscópio', 'Oxímetro de pulso', 'Aerossol dosimetrado com espaçador', 'Corticoide sistêmico']
    },
    doorInstructions: {
        patientName: 'Mariana Costa',
        age: 32,
        chiefComplaint: 'Falta de ar e chiado no peito há algumas horas.',
        triageData: { PA: '128/78 mmHg', FC: '118 bpm', FR: '30 irpm', SpO2: '90% em ar ambiente' }
    },
    patientScript: {
        profile: {
            behavior: 'Colaborativa, mas desconfortável.',
            tone: 'Fala entrecortada pela falta de ar.',
            emotionalState: 'Ansiosa com a piora rápida da respiração.',
            understanding: 'Sabe que tem crises de chiado, mas não entende a gravidade atual.',
            concerns: 'Medo de precisar ser intubada.',
            baseline: 'Rinite alérgica, uso irregular de salbutamol.'
        },
        openingStatement: 'Doutor, estou com muita falta de ar e meu peito está chiando.',
        responses: [
            { trigger: 'Pergunta sobre início e evolução da falta de ar.', response: 'Começou no fim da tarde e foi piorando.', releaseRule: 'Liberar se investigar cronologia.' },
            { trigger: 'Pergunta sobre sintomas associados (tosse, febre, dor torácica).', response: 'Tossindo um pouco, sem febre, sem dor localizada.', releaseRule: 'Liberar se investigar sintomas associados.' },
            { trigger: 'Pergunta sobre gravidade percebida e limitação funcional.', response: 'Não consigo terminar frases longas hoje.', releaseRule: 'Liberar se avaliar impacto funcional.' },
            { trigger: 'Pergunta sobre uso de medicações e adesão ao tratamento.', response: 'Uso só salbutamol, sem corticoide inalatório diário.', releaseRule: 'Liberar se perguntar sobre medicações.' },
            { trigger: 'Pergunta sobre crises prévias e internações.', response: 'Já fui ao pronto atendimento duas vezes este ano.', releaseRule: 'Liberar se investigar história de exacerbações.' },
            { trigger: 'Pergunta sobre gatilhos e exposição ambiental.', response: 'Limpei um quarto com poeira e mofo hoje.', releaseRule: 'Liberar se investigar gatilhos.' },
            { trigger: 'Pergunta sobre comorbidades, tabagismo ou gestação.', response: 'Não fumo, não uso drogas, não estou grávida.', releaseRule: 'Liberar se investigar comorbidades.' },
            { trigger: 'Pergunta sobre expectativas e preocupações da paciente.', response: 'Só quero conseguir respirar melhor.', releaseRule: 'Liberar se explorar preocupações.' }
        ],
        hiddenInformation: ['Não faz corticoide inalatório de manutenção.']
    },
    physicalExam: [
        { system: 'Respiratório', request: 'Se solicitar ausculta pulmonar.', findings: ['Sibilos expiratórios difusos bilaterais.'] }
    ],
    complementaryTests: [],
    evolution: [],
    tasks: [
        {
            id: 'tarefa-001',
            title: 'Avaliação inicial',
            candidateInstructions: 'Realize a abordagem inicial da paciente.',
            checklist: [
                { id: 'criterio-001', axis: 'COMMUNICATION', description: 'Apresenta-se e conduz a entrevista com frases curtas.', points: 1, critical: false },
                { id: 'criterio-002', axis: 'HISTORY', description: 'Investiga cronologia, gravidade e uso prévio de medicação de alívio.', points: 1, critical: false },
                { id: 'criterio-003', axis: 'PHYSICAL_EXAM', description: 'Realiza ausculta pulmonar e avalia sinais vitais.', points: 1, critical: false },
                { id: 'criterio-004', axis: 'MANAGEMENT', description: 'Reconhece sinais de desconforto respiratório e prioriza estabilização.', points: 2, critical: true }
            ],
            answerKey: 'Reconhecer exacerbação respiratória potencialmente grave e priorizar estabilização.'
        }
    ],
    finalAnswer: {
        expectedDiagnosis: 'Exacerbação de asma moderada a grave.',
        expectedManagement: ['Avaliar ABCDE.', 'Administrar broncodilatador inalatório.'],
        criticalErrors: ['Não reconhecer hipoxemia.'],
        explanation: 'Caso compatível com exacerbação de asma em adulto.'
    }
};

function buildPrompt(input) {
    const { areaName, themeName, subthemeName, format, difficulty } = input;
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
7. Responda em português, com linguagem natural de prontuário/simulação clínica.
8. Devolva SOMENTE um objeto JSON válido, sem markdown, sem comentários, sem texto fora do JSON, seguindo EXATAMENTE esta estrutura (as chaves são obrigatórias, os valores abaixo são só um exemplo de formato sobre outro tema):

${JSON.stringify(FEW_SHOT_EXAMPLE, null, 2)}`;
}

function extractJson(text) {
    const trimmed = String(text || '').trim();
    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const candidate = fenced ? fenced[1] : trimmed;
    return JSON.parse(candidate);
}

async function callGemini(model, prompt) {
    const result = await model.generateContent(prompt);
    return result.response.text();
}

exports.generateOsceStation = onCall({ secrets: [GEMINI_API_KEY], timeoutSeconds: 60, memory: '512MiB' }, async (request) => {
    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Faça login para gerar uma estação OSCE.');
    }

    const parsedInput = requestSchema.safeParse(request.data);
    if (!parsedInput.success) {
        throw new HttpsError('invalid-argument', 'Área, tema, subtema e formato são obrigatórios.');
    }
    const input = parsedInput.data;

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY.value());
    const model = genAI.getGenerativeModel({
        model: GEMINI_MODEL,
        generationConfig: { responseMimeType: 'application/json', temperature: 0.95, maxOutputTokens: 8192 }
    });

    const basePrompt = buildPrompt(input);
    let lastError = null;

    for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
            const prompt = attempt === 0
                ? basePrompt
                : `${basePrompt}\n\nSua resposta anterior não seguiu o schema corretamente. Erro de validação: ${lastError}\n\nGere novamente o JSON completo, corrigindo esse problema, seguindo estritamente a mesma estrutura.`;

            const text = await callGemini(model, prompt);
            const raw = extractJson(text);
            const content = generatedContentSchema.parse(raw);

            const station = {
                schemaVersion: '1.0.0',
                externalId: `ai-${input.areaSlug}-${input.themeCode}-${input.subthemeSlug}-${Date.now()}`,
                metadata: {
                    areaSlug: input.areaSlug,
                    themeCode: input.themeCode,
                    subthemeSlug: input.subthemeSlug,
                    format: input.format,
                    title: content.title,
                    version: 1,
                    difficulty: content.difficulty,
                    estimatedMinutes: content.estimatedMinutes
                },
                scenario: content.scenario,
                doorInstructions: content.doorInstructions,
                patientScript: content.patientScript,
                physicalExam: content.physicalExam,
                complementaryTests: content.complementaryTests,
                evolution: content.evolution,
                tasks: content.tasks,
                finalAnswer: content.finalAnswer,
                generationSource: 'GEMINI_AI'
            };

            return station;
        } catch (error) {
            lastError = error instanceof z.ZodError ? error.message : String(error?.message || error);
            console.error(`generateOsceStation: tentativa ${attempt + 1} falhou`, lastError);
        }
    }

    throw new HttpsError('internal', 'Não foi possível gerar a estação agora. Tente novamente em instantes.');
});
