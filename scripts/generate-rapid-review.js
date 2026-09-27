import { GoogleGenAI, Type } from "@google/genai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
    const exam = process.argv[2]; 
    const area = process.argv[3]; 
    
    if (!exam || !area) process.exit(1);
    
    let questionsFile = exam.toLowerCase() === 'uepa' ? 'questions-uepa.js' : 'questions-revalida.js';
    const filePath = path.join(__dirname, '..', questionsFile);
    if (!fs.existsSync(filePath)) process.exit(1);
    
    let rawContent = fs.readFileSync(filePath, 'utf-8');
    let questions = [];
    try {
        const marker = 'concat([';
        const startIndex = rawContent.indexOf(marker);
        if (startIndex === -1) throw new Error("Marcador não encontrado.");
        const endIndex = rawContent.lastIndexOf('])');
        const jsonStr = rawContent.substring(startIndex + 7, endIndex + 1);
        questions = JSON.parse(jsonStr);
    } catch (e) {
        process.exit(1);
    }
    
    const areaQuestions = questions.filter(q => q.area && q.area.toLowerCase() === area.toLowerCase());
    if (areaQuestions.length === 0) process.exit(0);
    
    console.log(`Encontradas ${areaQuestions.length} questões para ${area}. Analisando de forma exaustiva...`);
    
    const promptsData = areaQuestions.map(q => ({
        assunto: q.assunto, topico: q.topico, stem: q.stem, answer: q.answer
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
                    bodyHtml: { type: Type.STRING }
                  },
                  required: ["num", "title", "bodyHtml"]
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
Você é o mais avançado engenheiro de provas médicas. Seu objetivo é criar o "Rapid Review" (revisão de véspera) definitivo, ABSOLUTAMENTE EXAUSTIVO E PROFUNDO para a área de ${area}.

DADOS DA PROVA:
${JSON.stringify(promptsData).substring(0, 100000)}

INSTRUÇÕES E DIRETRIZES:
1. COBERTURA EXAUSTIVA: Você NÃO pode resumir ou omitir. Extraia TODOS os temas cobrados nas questões. Além disso, adicione TODOS os TEMAS ADJACENTES e correlatos que costumam cair (ex: diagnóstico diferencial crítico, manejo de complicações). O material deve ser do tamanho e da qualidade do SanarFlix / Medcurso.
2. AGRUPAMENTO INTELIGENTE: Crie \`sections\` para os grandes blocos (ex: "Doenças Exantemáticas", "Neonatologia").
3. FORMATO HTML OBRIGATÓRIO NO bodyHtml: O conteúdo do \`bodyHtml\` não deve ser texto corrido. Deve usar <ul class="reader-list"><li>...</li></ul> extensamente. Use <strong> para buzzwords. Se houver fluxogramas, simule com <pre class="reader-pre-card">. NUNCA USE MARKDOWN. Siga a estrutura de review rica em HTML.

Retorne APENAS um JSON válido de acordo com o schema especificado.
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
        console.log(`Gerado com sucesso em: ${outputPath}`);
    } catch (e) {
        console.error("Erro na geração:", e);
    }
}
run();
