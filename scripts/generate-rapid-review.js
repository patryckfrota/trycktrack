import { GoogleGenAI, Type } from "@google/genai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Defina a API Key (aqui estou usando a do seu teste)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
    const exam = process.argv[2]; // 'uepa' ou 'enamed'
    const area = process.argv[3]; // ex: 'Infectologia'
    
    if (!exam || !area) {
        console.error("Uso: node generate-rapid-review.js <exam> <area>");
        console.error("Exemplo: node generate-rapid-review.js uepa Infectologia");
        process.exit(1);
    }
    
    // Mapeamento do arquivo de questões
    let questionsFile = '';
    let windowVar = '';
    if (exam.toLowerCase() === 'uepa') {
        questionsFile = 'questions-uepa.js';
        windowVar = 'window.QUESTIONS_UEPA = ';
    } else if (exam.toLowerCase() === 'enamed') {
        questionsFile = 'questions-revalida.js'; // ou questions-internato, dependendo da fonte
        windowVar = 'window.QUESTIONS_REVALIDA = '; // Ajuste se for outro
    } else {
        console.error("Exam deve ser 'uepa' ou 'enamed'");
        process.exit(1);
    }
    
    const filePath = path.join(__dirname, '..', questionsFile);
    if (!fs.existsSync(filePath)) {
        console.error(`Arquivo ${filePath} não encontrado.`);
        process.exit(1);
    }
    
    // Ler e fazer o parse básico (isso pode precisar de ajustes dependendo do formato exato)
    let rawContent = fs.readFileSync(filePath, 'utf-8');
    
    // Remover a declaração inicial para conseguir parsear como JSON se possível
    
    
    
    
    let questions = [];
    try {
        const marker = 'concat([';
        const startIndex = rawContent.indexOf(marker);
        if (startIndex === -1) throw new Error("Marcador não encontrado.");
        const endIndex = rawContent.lastIndexOf('])');
        const jsonStr = rawContent.substring(startIndex + 7, endIndex + 1);
        questions = JSON.parse(jsonStr);
    } catch (e) {
        console.error("Erro ao parsear questões:", e.message);
        process.exit(1);
    }




    
    // Filtrar pela área
    const areaQuestions = questions.filter(q => q.area && q.area.toLowerCase() === area.toLowerCase());
    if (areaQuestions.length === 0) {
        console.log(`Nenhuma questão encontrada para a área ${area} no exame ${exam}.`);
        process.exit(0);
    }
    
    console.log(`Encontradas ${areaQuestions.length} questões para ${area}. Analisando com Gemini...`);
    
    // Extrair apenas os resumos/tópicos para não estourar o limite de tokens se houver muitas
    const promptsData = areaQuestions.map(q => ({
        assunto: q.assunto,
        topico: q.topico,
        stem: q.stem,
        answer: q.answer
    }));

    const schema = {
      type: Type.OBJECT,
      properties: {
        area: { type: Type.STRING },
        title: { type: Type.STRING },
        isExample: { type: Type.BOOLEAN },
        sections: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              subchapters: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    num: { type: Type.STRING },
                    title: { type: Type.STRING },
                    paragraphs: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ["num", "title", "paragraphs"]
                }
              }
            },
            required: ["title", "subchapters"]
          }
        }
      },
      required: ["area", "title", "isExample", "sections"]
    };

    
    const prompt = `
Você é o mais avançado engenheiro de provas médicas (focado em ${exam.toUpperCase()}). Seu objetivo é criar o "Rapid Review" (revisão de véspera) definitivo para a área de ${area}.
Você está proibido de usar "conhecimento genérico de livro" que fuja do escopo da prova. Você DEVE realizar uma ENGENHARIA REVERSA ABSOLUTA baseada ÚNICA E EXCLUSIVAMENTE nas questões fornecidas abaixo.

DADOS DA PROVA (${exam.toUpperCase()} - ${area}):
${JSON.stringify(promptsData).substring(0, 45000)}

INSTRUÇÕES E DIRETRIZES DE FORMATAÇÃO ESTRITAS (O "ROTEIRO SEM FUROS"):

1. AGRUPAMENTO INTELIGENTE (Sections): Agrupe os tópicos ('subchapters') em grandes blocos sindrômicos lógicos (ex: "Doenças Exantemáticas", "Doenças Tropicais"). 

2. ANATOMIA EXATA DO SUBCAPÍTULO:
Todo 'paragraphs' de um 'subchapter' deve obrigatoriamente seguir a divisão abaixo (crie 3 a 4 parágrafos focados):
- PARÁGRAFO 1 (O Gatilho da Banca): Como a banca descreve o quadro clínico clássico. (Ex: "Perfil clássico da banca: paciente X com sintoma Y").
- PARÁGRAFO 2 (Fluxo Diagnóstico): Qual o exame inicial vs Padrão-ouro que foram cobrados?
- PARÁGRAFO 3 (Conduta Inegociável): Focado exclusivamente no tratamento exigido pelos gabaritos.
- PARÁGRAFO 4 (🚨 Autópsia das Pegadinhas): Exponha onde os candidatos erram. Extraia isso olhando para os distratores das questões. (Ex: "Erros fatais: A banca tenta te fazer marcar X, mas a regra real é Y").

3. ENGENHARIA DE FORMATAÇÃO (HTML PURO, ZERO MARKDOWN):
- Use <strong> para "Buzzwords", drogas, doses e exames vitais.
- Use <ul class="reader-list"><li>Item</li></ul> para critérios diagnósticos, indicações ou listas. NUNCA use marcadores do tipo '-' ou '*'.
- Seja telegráfico. Frases curtas.

Retorne APENAS um objeto JSON válido, aderindo EXATAMENTE à estrutura de dados RAPID_REVIEW_DATA exigida pelo app. O schema de saída é um objeto cujas propriedades são: area, title, isExample (false) e sections (com title e array de subchapters). Cada subchapter tem num, title e paragraphs.
`;


    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            }
        });
        
        const outputPath = path.join(__dirname, '..', `rr-${exam}-${area.toLowerCase()}.json`);
        fs.writeFileSync(outputPath, response.text);
        console.log(`Rapid Review gerado com sucesso em: ${outputPath}`);
        console.log(`Você pode agora copiar o conteúdo e colar no app-reader.js (no bloco RAPID_REVIEW_DATA) ou criar uma automação de importação.`);
    } catch (e) {
        console.error("Erro na geração:", e);
    }
}

run();
