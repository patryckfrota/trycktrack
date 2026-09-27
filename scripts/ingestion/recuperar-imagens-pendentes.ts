import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..', '..');

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error('❌ GEMINI_API_KEY não encontrada.');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

interface PendingTarget {
  id: string;
  pdfPath: string;
  page: number;
  questionNumber: number;
  targetFile: string;
  description: string;
}

const TARGETS: PendingTarget[] = [
  {
    id: 'obstetricia-inep-063',
    pdfPath: path.join(ROOT_DIR, 'tmp', 'pdfs', 'revalida-2023-1-caderno.pdf'),
    page: 17,
    questionNumber: 64,
    targetFile: 'questions-obstetricia.js',
    description: 'Foto de apresentação fetal'
  },
  {
    id: 'cm-dermatologia-013',
    pdfPath: path.join(ROOT_DIR, 'tmp', 'pdfs', 'revalida-2023-2-caderno.pdf'),
    page: 8,
    questionNumber: 27,
    targetFile: 'questions-clinica-medica.js',
    description: 'Foto de lesão dermatológica na face'
  },
  {
    id: 'cg-inep-076',
    pdfPath: path.join(ROOT_DIR, 'tmp', 'pdfs', 'revalida-2023-2-caderno.pdf'),
    page: 22,
    questionNumber: 76,
    targetFile: 'questions-cirurgia.js',
    description: 'Radiografia simples de abdome de RN'
  },
  {
    id: 'pediatria-inep-051',
    pdfPath: path.join(ROOT_DIR, 'tmp', 'pdfs', 'revalida-2024-2-caderno.pdf'),
    page: 21,
    questionNumber: 73,
    targetFile: 'questions-pediatria.js',
    description: 'Gráfico / Nomograma de Bhutani'
  },
  {
    id: 'prev-inep-033',
    pdfPath: path.join(ROOT_DIR, 'tmp', 'pdfs', 'revalida-2024-2-caderno.pdf'),
    page: 4,
    questionNumber: 10,
    targetFile: 'questions-preventiva.js',
    description: 'Gráfico de quintis de riqueza'
  }
];

async function recoverImages() {
  console.log('='.repeat(70));
  console.log('📸 RECUPERAÇÃO DE RECURSOS VISUAIS PENDENTES');
  console.log('='.repeat(70));

  const targetImgDir = path.join(ROOT_DIR, 'assets', 'revalida', 'img');
  fs.mkdirSync(targetImgDir, { recursive: true });

  const renderTmpDir = path.join(ROOT_DIR, 'tmp', 'render_pending');
  fs.mkdirSync(renderTmpDir, { recursive: true });

  for (const target of TARGETS) {
    console.log(`\n-------------------------------------------------------------`);
    console.log(`🔍 [${target.id}] Processando Q${target.questionNumber} (Página ${target.page}): ${target.description}`);
    console.log(`   PDF: ${target.pdfPath}`);

    if (!fs.existsSync(target.pdfPath)) {
      console.warn(`   ⚠️ PDF não encontrado: ${target.pdfPath}`);
      continue;
    }

    const pagePrefix = path.join(renderTmpDir, `page-${target.id}`);
    execSync(`pdftoppm -png -r 150 -f ${target.page} -l ${target.page} "${target.pdfPath}" "${pagePrefix}"`);

    const renderedFile = fs.readdirSync(renderTmpDir).find(f => f.startsWith(`page-${target.id}`) && f.endsWith('.png'));
    if (!renderedFile) {
      console.warn(`   ⚠️ Falha ao renderizar página ${target.page}.`);
      continue;
    }

    const pageFilePath = path.join(renderTmpDir, renderedFile);
    const imageBytes = fs.readFileSync(pageFilePath);
    const base64 = imageBytes.toString('base64');

    console.log(`   🤖 Chamando Gemini Vision para localizar coordenadas...`);

    const prompt = `Analise a página da prova médica em anexo.
Identifique com precisão as coordenadas da figura, fotografia, radiografia, exame de imagem, gráfico, tabela ou partograma pertencente especificamente à QUESTÃO ${target.questionNumber}.
Retorne ESTRITAMENTE um JSON no formato:
{
  "box_2d": [ymin, xmin, ymax, xmax]
}
Onde as coordenadas são números inteiros normalizados de 0 a 1000.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              { inlineData: { mimeType: 'image/png', data: base64 } }
            ]
          }
        ],
        config: { responseMimeType: 'application/json' }
      });

      const cleaned = (response.text || '{}').trim().replace(/```(?:json)?\s*([\s\S]*?)```/i, '$1').trim();
      const parsed = JSON.parse(cleaned);

      let box = Array.isArray(parsed) ? (parsed[0]?.box_2d || parsed[0]) : (parsed?.box_2d || parsed);
      if (Array.isArray(box) && Array.isArray(box[0])) box = box[0];

      if (!Array.isArray(box) || box.length < 4) {
        console.warn(`   ⚠️ Coordenadas box_2d inválidas recebidas:`, box);
        continue;
      }

      const [ymin, xmin, ymax, xmax] = box;
      const outputFileName = `${target.id}-1.png`;
      const outputPath = path.join(targetImgDir, outputFileName);
      const relativeAssetPath = `assets/revalida/img/${outputFileName}`;

      // Recorta com Python PIL com margem de segurança de 1.5%
      const padY = Math.max(0, (ymax - ymin) * 0.015);
      const padX = Math.max(0, (xmax - xmin) * 0.015);
      const cYmin = Math.max(0, Math.floor(ymin - padY));
      const cXmin = Math.max(0, Math.floor(xmin - padX));
      const cYmax = Math.min(1000, Math.ceil(ymax + padY));
      const cXmax = Math.min(1000, Math.ceil(xmax + padX));

      execSync(`python3 -c "
from PIL import Image
im = Image.open('${pageFilePath}')
W, H = im.size
left = int(${cXmin} * W / 1000)
top = int(${cYmin} * H / 1000)
right = int(${cXmax} * W / 1000)
bottom = int(${cYmax} * H / 1000)
cropped = im.crop((left, top, right, bottom))
cropped.save('${outputPath}', optimize=True)
"`);

      console.log(`   ✅ Imagem recortada e salva com sucesso: ${relativeAssetPath}`);

      // Atualiza o arquivo de questões correspondente
      const targetFilePath = path.join(ROOT_DIR, target.targetFile);
      let content = fs.readFileSync(targetFilePath, 'utf8');

      // Procura a questão e atualiza images
      const idPattern = new RegExp(`("id":\\s*"${target.id}"[\\s\\S]*?"images":\\s*)\\[[^\\]]*\\]`);
      if (idPattern.test(content)) {
        content = content.replace(idPattern, `$1${JSON.stringify([relativeAssetPath])}`);
        fs.writeFileSync(targetFilePath, content, 'utf8');
        console.log(`   📝 ${target.targetFile} atualizado com images: [ "${relativeAssetPath}" ]`);
      } else {
        // Se a questão não tinha campo "images", adiciona
        const objPattern = new RegExp(`("id":\\s*"${target.id}"[\\s\\S]*?)(,"stem"|,"options")`);
        if (objPattern.test(content)) {
          content = content.replace(objPattern, `$1,"images": ${JSON.stringify([relativeAssetPath])}$2`);
          fs.writeFileSync(targetFilePath, content, 'utf8');
          console.log(`   📝 Campo images inserido em ${target.id} em ${target.targetFile}`);
        } else {
          console.warn(`   ⚠️ Não foi possível localizar o padrão da questão ${target.id} em ${target.targetFile}`);
        }
      }

    } catch (err: any) {
      console.error(`   ❌ Erro ao processar ${target.id}:`, err.message);
    }
  }

  // Limpa pasta temporária
  fs.rmSync(renderTmpDir, { recursive: true, force: true });
  console.log(`\n🎉 Processamento de imagens concluído!`);
}

recoverImages().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
