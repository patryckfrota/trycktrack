import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..', '..');

const ai = new GoogleGenAI();

interface VisualElement {
  questionNumber: number;
  type: string;
  description?: string;
  box_2d: number[] | number[][];
}

interface PageScanResult {
  visualElements: VisualElement[];
}

export interface VisualExtractionOptions {
  pdfPath: string;
  examId: string;
  startPage?: number;
  endPage?: number;
  assetsDirName?: string;
}

export async function extractVisualAssetsFromExam(options: VisualExtractionOptions) {
  const {
    pdfPath,
    examId,
    startPage = 1,
    endPage,
    assetsDirName = 'revalida'
  } = options;

  console.log('='.repeat(70));
  console.log(`🎨 TRYCKTRACK VISUAL ASSET EXTRACTOR - EXTRAÇÃO DE IMAGENS & TABELAS`);
  console.log(`PDF: ${pdfPath}`);
  console.log(`Exam ID: ${examId}`);
  console.log('='.repeat(70));

  if (!fs.existsSync(pdfPath)) {
    throw new Error(`Arquivo PDF não encontrado: ${pdfPath}`);
  }

  // Pasta de saída dos assets
  const targetImgDir = path.join(ROOT_DIR, 'assets', assetsDirName, 'img');
  if (!fs.existsSync(targetImgDir)) {
    fs.mkdirSync(targetImgDir, { recursive: true });
  }

  // Pasta temporária para renderização das páginas
  const renderTmpDir = path.join(ROOT_DIR, 'tmp', 'render_pages', examId);
  if (!fs.existsSync(renderTmpDir)) {
    fs.mkdirSync(renderTmpDir, { recursive: true });
  }

  // Descobre total de páginas se endPage não fornecido
  let maxPage = endPage;
  if (!maxPage) {
    try {
      const pdfInfo = execSync(`pdfinfo "${pdfPath}"`, { encoding: 'utf-8' });
      const pagesMatch = pdfInfo.match(/Pages:\s+(\d+)/);
      if (pagesMatch) {
        maxPage = parseInt(pagesMatch[1], 10);
      }
    } catch {
      maxPage = 40; // Fallback
    }
  }
  const lastPage = maxPage || 30;

  console.log(`[VisualExtractor] Processando páginas ${startPage} a ${lastPage}...`);

  // Renderiza todas as páginas com pdftoppm em 150 DPI (alta nitidez para visualização de bancas)
  console.log(`[VisualExtractor] Renderizando páginas do PDF via pdftoppm...`);
  const prefix = path.join(renderTmpDir, 'page');
  execSync(`pdftoppm -png -r 150 -f ${startPage} -l ${lastPage} "${pdfPath}" "${prefix}"`);

  const renderedFiles = fs.readdirSync(renderTmpDir)
    .filter(f => f.startsWith('page') && f.endsWith('.png'))
    .sort();

  console.log(`[VisualExtractor] ${renderedFiles.length} páginas renderizadas. Iniciando análise multimodal...`);

  const extractedMap: Record<number, string[]> = {};

  for (const file of renderedFiles) {
    const pageFilePath = path.join(renderTmpDir, file);
    const pageNumMatch = file.match(/page-0*(\d+)\.png/);
    const pageNum = pageNumMatch ? pageNumMatch[1] : file;

    console.log(`\n[VisualExtractor] Analisando Página ${pageNum}...`);

    const imageBytes = fs.readFileSync(pageFilePath);
    const base64 = imageBytes.toString('base64');

    let scanResult: PageScanResult = { visualElements: [] };

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Analise a página da prova de residência médica em anexo.
Identifique TODAS as figuras, fotografias de pacientes/lesões, exames médicos de imagem (raio-x, tomografia, ressonância, ultrassonografia, ecocardiograma), traçados de ECG, tabelas, quadros, fluxogramas, partogramas ou curvas de crescimento que pertençam às questões desta página.
Para cada elemento visual pertencente a uma questão, retorne um objeto no array visualElements contendo:
- questionNumber: número inteiro da questão à qual o elemento pertence (ex: 13, 38). Se estiver incerto, deduza pelo cabeçalho "QUESTÃO XX" mais próximo acima do elemento.
- type: "image" | "table" | "chart" | "ecg" | "radiology" | "partogram"
- description: descrição resumida do elemento (ex: "Radiografia de tórax", "Tabela de acompanhamento pré-natal", "Traçado de ECG")
- box_2d: [ymin, xmin, ymax, xmax] com coordenadas normalizadas de 0 a 1000 na imagem da página.

Ignore cabeçalhos gerais da página (como "Revalida", número de página, logotipos do ministério) e rodapés gerais.
Se a página contiver apenas texto puro das questões sem nenhuma figura ou tabela, retorne apenas {"visualElements": []}.`
              },
              {
                inlineData: {
                  mimeType: 'image/png',
                  data: base64
                }
              }
            ]
          }
        ],
        config: {
          responseMimeType: 'application/json'
        }
      });

      let rawText = response.text?.trim() || '{}';
      const fenceMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/i);
      if (fenceMatch) rawText = fenceMatch[1].trim();
      scanResult = JSON.parse(rawText);
    } catch (err: any) {
      console.warn(`[VisualExtractor] ⚠️ Erro na análise da página ${pageNum}:`, err.message);
      continue;
    }

    if (!scanResult.visualElements || scanResult.visualElements.length === 0) {
      console.log(`[VisualExtractor] Página ${pageNum}: Nenhum elemento visual identificado.`);
      continue;
    }

    console.log(`[VisualExtractor] 🎯 Página ${pageNum}: Identificados ${scanResult.visualElements.length} elementos visuais!`);

    for (let i = 0; i < scanResult.visualElements.length; i++) {
      const elem = scanResult.visualElements[i];
      let box = elem.box_2d;
      if (Array.isArray(box) && Array.isArray(box[0])) {
        box = (box as number[][])[0];
      }
      const [ymin, xmin, ymax, xmax] = box as number[];

      if (ymin == null || xmin == null || ymax == null || xmax == null) continue;

      const qNum = elem.questionNumber;
      const paddedNum = String(qNum).padStart(3, '0');
      const questionId = `${examId}-${paddedNum}`;

      if (!extractedMap[qNum]) extractedMap[qNum] = [];
      const imgIndex = extractedMap[qNum].length + 1;

      const outputFileName = `${examId}-${paddedNum}-${imgIndex}.png`;
      const outputPath = path.join(targetImgDir, outputFileName);
      const relativeAssetPath = `assets/${assetsDirName}/img/${outputFileName}`;

      // Recorta com Python PIL com margem de segurança de 1%
      const padY = Math.max(0, (ymax - ymin) * 0.015);
      const padX = Math.max(0, (xmax - xmin) * 0.015);
      const cYmin = Math.max(0, Math.floor(ymin - padY));
      const cXmin = Math.max(0, Math.floor(xmin - padX));
      const cYmax = Math.min(1000, Math.ceil(ymax + padY));
      const cXmax = Math.min(1000, Math.ceil(xmax + padX));

      try {
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

        console.log(`   ✅ [Q${qNum}] Recortado ${elem.type} (${elem.description || ''}) -> ${relativeAssetPath}`);
        extractedMap[qNum].push(relativeAssetPath);
      } catch (err: any) {
        console.error(`   ❌ Erro ao recortar elemento da Q${qNum}:`, err.message);
      }
    }
  }

  // Limpa pasta temporária
  fs.rmSync(renderTmpDir, { recursive: true, force: true });

  const totalQuestionsWithAssets = Object.keys(extractedMap).length;
  console.log('\n' + '='.repeat(70));
  console.log(`🎉 Extração visual concluída: ${totalQuestionsWithAssets} questões possuem novos assets visuais.`);
  console.log('='.repeat(70));

  if (totalQuestionsWithAssets === 0) {
    return;
  }

  // 1. Atualiza questions-revalida.js
  const revalidaFile = path.join(ROOT_DIR, 'questions-revalida.js');
  if (fs.existsSync(revalidaFile)) {
    console.log(`\n[VisualExtractor] Atualizando ${revalidaFile}...`);
    let fileContent = fs.readFileSync(revalidaFile, 'utf8');

    for (const [qNumStr, images] of Object.entries(extractedMap)) {
      const paddedNum = qNumStr.padStart(3, '0');
      const qId = `${examId}-${paddedNum}`;

      // Localiza a questão no arquivo JS e substitui/adiciona "images"
      const idRegex = new RegExp(`("id":\\s*"${qId}"[\\s\\S]*?"images":\\s*)\\[[^\\]]*\\]`);
      if (idRegex.test(fileContent)) {
        const replacement = `$1${JSON.stringify(images)}`;
        fileContent = fileContent.replace(idRegex, replacement);
        console.log(`   📝 ${qId}: images -> ${JSON.stringify(images)}`);
      }
    }

    fs.writeFileSync(revalidaFile, fileContent, 'utf8');
  }

  // 2. Atualiza Neon Postgres
  console.log(`\n[VisualExtractor] Sincronizando imagens com o banco de dados Neon Postgres...`);
  try {
    const updatedIds = Object.keys(extractedMap).map(qNumStr => {
      const paddedNum = qNumStr.padStart(3, '0');
      return `${examId}-${paddedNum}`;
    });

    if (updatedIds.length > 0) {
      const idsArg = updatedIds.join(',');
      console.log(`   ⚡ Executando sincronismo incremental para ${updatedIds.length} questões com imagens...`);
      execSync(`node backend/scripts/import-questions.js --ids "${idsArg}"`, {
        stdio: 'inherit',
        cwd: ROOT_DIR
      });
      console.log(`   🎉 Neon Postgres atualizado com sucesso para todas as questões com imagens!`);
    }
  } catch (err: any) {
    console.error(`   ❌ Erro ao sincronizar com Postgres:`, err.message);
  }
}

// Suporte para execução direta via CLI
if (process.argv[1] && process.argv[1].endsWith('visual-extractor.ts')) {
  const args = process.argv.slice(2);
  let year = 2024;
  let edition = '1';
  let pdfPath = '';
  let examId = '';

  let startPage: number | undefined;
  let endPage: number | undefined;

  args.forEach((arg, i) => {
    if (arg === '--year' && args[i + 1]) year = parseInt(args[i + 1], 10);
    if (arg === '--edition' && args[i + 1]) edition = args[i + 1];
    if (arg === '--pdf' && args[i + 1]) pdfPath = args[i + 1];
    if (arg === '--examId' && args[i + 1]) examId = args[i + 1];
    if (arg === '--startPage' && args[i + 1]) startPage = parseInt(args[i + 1], 10);
    if (arg === '--endPage' && args[i + 1]) endPage = parseInt(args[i + 1], 10);
  });

  if (!examId) examId = `revalida-${year}-${edition}`;
  if (!pdfPath) pdfPath = path.join(ROOT_DIR, 'tmp', 'pdfs', `${examId}-caderno.pdf`);

  extractVisualAssetsFromExam({ pdfPath, examId, startPage, endPage })
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
