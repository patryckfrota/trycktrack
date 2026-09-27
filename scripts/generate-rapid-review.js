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
    
    console.log(`Encontradas ${areaQuestions.length} questões para ${area}. Analisando com o modelo Mestre ENAMED...`);
    
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
                    tags: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
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
Você é o engenheiro responsável por construir o Rapid Review definitivo de ${area} para a banca ${exam.toUpperCase()}.
Abaixo está o roteiro oficial de confecção (Modelo Mestre ENAMED) que você deve seguir RIGOROSAMENTE para o estilo de redação, adaptado para nossa saída em JSON web.

ROTEIRO DE ESTILO E REDAÇÃO (Baseado no Padrão ENAMED/Revalida):
- **O conteúdo deve cobrir a área inteira**. Temas que não estão nas questões entram como ADJACENTES e devem ser exaustivamente mapeados.
- **Nenhum bullet é vinculado a uma questão específica**. A questão calibra o texto; não aparece nele.
- **Regras de escrita (Fase 4 do padrão):**
  - O formato é denso e corrido: um bloco de bullets (<ul class="reader-list"><li>...</li></ul>) por doença, contendo quadro clínico, diagnóstico, conduta, tratamento e seguimento juntos no mesmo bloco lógico.
  - **Pistas e pegadinhas INLINE:** a palavra-chave do enunciado e o distrator clássico ficam DENTRO do bullet do tema (ex: "<strong>Pegadinha:</strong>...", "<strong>Palavra-chave:</strong>...").
  - **Tabelas HTML** (<table border="1" style="border-collapse: collapse; width: 100%;">) para comparar diferenciais, critérios, antídotos, esquemas, calendários. Integradas ao texto, nunca como enfeite.
  - **Fluxogramas em bloco de código monoespaçado** (<pre class="reader-pre-card">) quando o raciocínio é de decisão ou diagnóstico diferencial (ex: "Paciente com X ↓ Avaliar Y ↓ Se Z").
  - Nada de caixas coloridas isoladas que fragmentam o texto.
  - Nada de subtítulos separados ("Diagnóstico", "Tratamento") quebrando a leitura. Tudo em bullets ricos.

DADOS DA PROVA (Questões para análise de frequência e perfil):
${JSON.stringify(promptsData).substring(0, 100000)}

INSTRUÇÕES DE ESTRUTURA DO JSON:
1. Analise as questões, extraia a frequência e o perfil da banca.
2. Crie \`sections\` ordenadas da mais frequente para a menos frequente. A última seção deve ser "Checklist Final e Temas Adjacentes" ou alocada logicamente.
3. Para cada \`subchapter\`, preencha o \`bodyHtml\` usando ESTRITAMENTE HTML (<ul>, <li>, <table>, <pre>, <strong>) seguindo as regras de escrita acima. O conteúdo deve ser incrivelmente denso e detalhado, simulando o PDF do Revalida.
4. Preencha o array \`tags\` do subchapter com "ja" se o assunto caiu nas questões da banca, ou "adj" se for um tema adjacente inserido por você para completar a área médica.

Retorne APENAS um JSON válido. É VITAL SER EXAUSTIVO E LONGO. NÃO OMITA NADA, SEJA VERBOSO E COMPLETO.
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
