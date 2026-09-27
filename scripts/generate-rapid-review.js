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
        const endIndex = rawContent.lastIndexOf('])');
        const jsonStr = rawContent.substring(startIndex + 7, endIndex + 1);
        questions = JSON.parse(jsonStr);
    } catch (e) {
        process.exit(1);
    }
    
    const areaQuestions = questions.filter(q => q.area && q.area.toLowerCase() === area.toLowerCase());
    if (areaQuestions.length === 0) process.exit(0);
    
    console.log(`Encontradas ${areaQuestions.length} questões para ${area}. Analisando com o modelo Original Expandido...`);
    
    const promptsData = areaQuestions.map(q => ({
        assunto: q.assunto, stem: q.stem, answer: q.answer
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
Você é o mais avançado engenheiro de provas médicas. Seu objetivo é criar o "Rapid Review" para a área de ${area}.
O usuário gostou muito do seu modelo de "Autópsia de Casos da Banca", mas pediu para ser BEM MAIS EXPANDIDO, abrangendo todos os casos, sub-assuntos e temas adjacentes sem agrupar demais.

DADOS DA PROVA:
${JSON.stringify(promptsData).substring(0, 100000)}

INSTRUÇÕES:
1. DESAGRUPE E EXPANDA: Não coloque várias doenças em um único subcapítulo só para economizar espaço. Se a prova cobrou Asma, Pneumonia e Bronquiolite, crie um subcapítulo individual para cada uma. Extraia TODOS os cenários clínicos das questões.
2. ADICIONE TEMAS ADJACENTES: Se a prova cobrou um cenário, crie também subcapítulos para cenários clássicos que fazem diagnóstico diferencial com ele (mesmo que não estejam explícitos nas questões).
3. FORMATO DO SUBCAPÍTULO (paragraphs): Para cada tema/cenário, você deve preencher o array de \`paragraphs\` seguindo ESTRITAMENTE esta narrativa de 4 a 5 parágrafos (você pode usar <strong>texto</strong> para negrito):
   - Parágrafo 1: "Perfil clássico da banca: [Descreva com detalhes o caso clínico típico, idade, sintomas, laboratório]"
   - Parágrafo 2: "Fluxo Diagnóstico: [Explique o raciocínio, exames padrão-ouro]"
   - Parágrafo 3: "Conduta Inegociável: [O tratamento exato, doses se clássicas]"
   - Parágrafo 4: "Erros fatais e Distratores: [Explique as pegadinhas e alternativas falsas comuns]"

Retorne APENAS um JSON válido. O material deve ser gigante e cobrir dezenas de casos distintos.
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
