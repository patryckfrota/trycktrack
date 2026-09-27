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
    
    console.log(`Encontradas ${areaQuestions.length} questões para ${area}. Analisando com o Super Prompt First Aid (v2)...`);
    
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
Você é o mais avançado engenheiro de provas médicas, especialista em criar materiais "First Aid" e fazer engenharia reversa de bancas.
Seu objetivo é criar o "Rapid Review" definitivo, DE ALTÍSSIMO RENDIMENTO E ABSOLUTAMENTE COMPLETO, para a área de ${area} focado na banca ${exam.toUpperCase()}.

DADOS DA PROVA:
${JSON.stringify(promptsData).substring(0, 100000)}

FILOSOFIA DO MATERIAL (FIRST AID):
O material deve responder: "O que eu preciso saber para acertar uma questão desse tema e de seus TEMAS ADJACENTES?".
ATENÇÃO: É ESTRITAMENTE PROIBIDO SUPRIMIR ASSUNTOS. Você deve mapear 100% dos assuntos cobrados nas questões. Além disso, VOCÊ DEVE CRIAR SUBCAPÍTULOS EXTRAS PARA TEMAS ADJACENTES IMPORTANTES (por exemplo, se caiu asma, adicione DPOC e bronquiolite; se caiu sarampo, coloque todas as doenças exantemáticas; etc). Não tenha medo de gerar um texto longo! Extraia TODO o conteúdo e expanda profundamente o conhecimento necessário para cercar a banca.

AGRUPAMENTO E ESTRUTURA DO JSON:
Crie "sections" agrupando grandes áreas.
Dentro de cada "section", crie MUITOS "subchapters" para cada doença cobrada e também para suas correlatas (assuntos adjacentes).

FORMATO HTML OBRIGATÓRIO (bodyHtml):
O conteúdo de cada "subchapter" DEVE ser gerado em HTML, utilizando ESTRITAMENTE a seguinte anatomia dentro do campo \`bodyHtml\`:

<ul class="reader-list">
  <li>🔥 <strong>O QUE MAIS CAI:</strong> [Resumo do que é prioritário naquele tema]</li>
  <li>🎯 <strong>PADRÃO DA BANCA:</strong> [Resumo de como o caso clínico típico aparece]</li>
  <li>🔎 <strong>RECONHEÇA:</strong> [Pistas clínicas e laboratoriais matadoras]</li>
  <li>🩺 <strong>DIAGNÓSTICO:</strong> [Critérios, exames essenciais, padrão-ouro]</li>
  <li>💊 <strong>CONDUTA / TRATAMENTO:</strong> [Formato: Se X → faça Y. 1ª linha e alternativas]</li>
  <li>⚠️ <strong>PEGADINHAS DA BANCA:</strong> [Distratores comuns, o que o aluno costuma errar]</li>
  <li>📌 <strong>HIGH-YIELD:</strong> [Fatos obrigatórios de memorizar]</li>
</ul>

TABELAS HTML OBRIGATÓRIAS:
Para a seção de "⚖️ NÃO CONFUNDA" ou para comparar medicamentos, sinais clínicos, faixas etárias ou critérios, você DEVE CRIAR TABELAS HTML RICAS ilustrativas em vez de texto corrido. Insira as tabelas logo após a lista (ou dentro de um item da lista). Use a seguinte estrutura HTML para as tabelas:
<div style="overflow-x:auto;">
  <table border="1" style="border-collapse: collapse; width: 100%; text-align: left; margin: 10px 0;">
    <thead style="background-color: #f2f2f2;">
      <tr>
        <th style="padding: 8px;">Característica</th>
        <th style="padding: 8px;">Doença A</th>
        <th style="padding: 8px;">Doença B</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 8px;">Clínica</td>
        <td style="padding: 8px;">...</td>
        <td style="padding: 8px;">...</td>
      </tr>
    </tbody>
  </table>
</div>

ALGORITMOS VISUAIS:
Sempre que houver uma sequência de decisão, insira uma caixa com fluxo usando a tag <pre class="reader-pre-card">. Exemplo:
<pre class="reader-pre-card">Paciente com X
↓
Avaliar Y
↓
Se Z → conduta A
Se W → conduta B</pre>

REGRAS RÍGIDAS:
- EXPLORE ASSUNTOS ADJACENTES! Gere muitos subcapítulos. É essencial ser exaustivo.
- USE TABELAS (<table border="1">) SEMPRE que for comparar entidades clínicas ou condutas.
- NUNCA use formatação Markdown. Use apenas HTML.

Retorne APENAS um JSON válido.
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
