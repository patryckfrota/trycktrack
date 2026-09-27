import 'dotenv/config';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crawlInepRevalida } from './crawler.js';
import { extractQuestionsFromPdf } from './extractor.js';
import { formatFullExplanation } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..', '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'tmp');

async function runPipeline() {
  console.log('='.repeat(70));
  console.log('  TRYCKTRACK — PIPELINE ETL DE INGESTÃO AUTÔNOMA DE PROVAS');
  console.log('='.repeat(70));
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Ambiente Node: ${process.version}\n`);

  try {
    const args = process.argv.slice(2);
    let targetYear = 2024;
    let targetEdition: string | undefined = undefined;
    let limitQuestions = 3;
    let startQuestion = 1;
    let genericUrl = '';
    let genericPrefix = '';
    let maxAttempts = 5;

    args.forEach((arg, index) => {
      if (arg === '--year' && args[index + 1]) {
        targetYear = parseInt(args[index + 1], 10);
      }
      if (arg === '--limit' && args[index + 1]) {
        limitQuestions = parseInt(args[index + 1], 10);
      }
      if (arg === '--start' && args[index + 1]) {
        startQuestion = parseInt(args[index + 1], 10);
      }
      if (arg === '--edition' && args[index + 1]) {
        targetEdition = args[index + 1];
      }
      if (arg === '--url' && args[index + 1]) {
        genericUrl = args[index + 1];
      }
      if (arg === '--prefix' && args[index + 1]) {
        genericPrefix = args[index + 1];
      }
      if (arg === '--max-attempts' && args[index + 1]) {
        maxAttempts = parseInt(args[index + 1], 10);
      }
    });

    // -------------------------------------------------------------
    // PASSO A: Buscador / Crawler Autônomo
    // -------------------------------------------------------------
    console.log('-------------------------------------------------------------');
    
    let downloadResult;
    
    if (genericUrl && genericPrefix) {
      console.log(`PASSO A: EXECUTANDO CRAWLER GENÉRICO EM URL CUSTOMIZADA`);
      console.log('-------------------------------------------------------------');
      const { crawlGenericOpenRepository } = await import('./crawler.js');
      downloadResult = await crawlGenericOpenRepository(genericUrl, genericPrefix);
    } else {
      console.log(`PASSO A: EXECUTANDO CRAWLER NO REPOSITÓRIO PÚBLICO (INEP) - ANO ${targetYear} (Edição: ${targetEdition || 'Mais recente'})`);
      console.log('-------------------------------------------------------------');
      downloadResult = await crawlInepRevalida(targetYear, targetEdition);
    }

    console.log('\n[Pipeline] Arquivos obtidos com sucesso pelo Crawler:');
    console.log(`- Caderno de Questões: ${downloadResult.cadernoPdfPath}`);
    if (downloadResult.gabaritoPdfPath) {
      console.log(`- Gabarito Oficial:    ${downloadResult.gabaritoPdfPath}`);
    }
    console.log(`- Identificador da Prova: ${downloadResult.examId}`);
    console.log(`- Nome Oficial: ${downloadResult.examName}\n`);

    // -------------------------------------------------------------
    // PASSO B: Extração Multimodal e Loop de Retroalimentação Zod
    // -------------------------------------------------------------
    console.log('-------------------------------------------------------------');
    console.log(`PASSO B: EXTRAÇÃO MULTIMODAL & FEEDBACK LOOP COM ZOD (Q${startQuestion} a Q${startQuestion + limitQuestions - 1})`);
    console.log('-------------------------------------------------------------');

    const extractedBatch = await extractQuestionsFromPdf(
      downloadResult.cadernoPdfPath,
      {
        examId: downloadResult.examId,
        examName: downloadResult.examName,
        source: downloadResult.source
      },
      {
        startQuestion: startQuestion,
        limitQuestions: limitQuestions,
        maxAttempts: maxAttempts
      }
    );

    console.log('\n' + '='.repeat(70));
    console.log(`  RESULTADO DA EXTRAÇÃO: ${extractedBatch.items.length} QUESTÕES PROCESSADAS`);
    console.log('='.repeat(70) + '\n');

    extractedBatch.items.forEach((item, index) => {
      const q = item.question;
      const exp = item.explanation;

      console.log(`--- [QUESTÃO ${q.number}] (ID: ${q.id}) ---`);
      console.log(`Área: ${q.area} | Assunto: ${q.assunto || 'Geral'} | Gabarito: [${q.answer || 'ANULADA'}]`);
      console.log(`Enunciado: ${q.stem.slice(0, 160)}...`);
      console.log('\nAlternativas:');
      Object.entries(q.options).forEach(([letter, text]) => {
        const marker = letter === q.answer ? '✓' : ' ';
        console.log(`  [${marker}] ${letter}) ${text}`);
      });

      console.log('\nResolução Comentada (Padrão 4 seções):');
      const formatted = formatFullExplanation(exp, q.answer);
      console.log(formatted.split('\n').map(line => `    ${line}`).join('\n'));
      console.log('\n' + '-'.repeat(70) + '\n');
    });

    // -------------------------------------------------------------
    // PASSO B2: Extração Multimodal de Imagens & Recursos Visuais
    // -------------------------------------------------------------
    console.log('-------------------------------------------------------------');
    console.log('PASSO B2: EXTRAÇÃO DE IMAGENS E RECURSOS VISUAIS COM GEMINI MULTIMODAL');
    console.log('-------------------------------------------------------------');
    try {
      const { extractVisualAssetsFromExam } = await import('./visual-extractor.js');
      const bancaPrefix = downloadResult.examId.split('-')[0];
      const visualMap = await extractVisualAssetsFromExam({
        pdfPath: downloadResult.cadernoPdfPath,
        examId: downloadResult.examId,
        assetsDirName: bancaPrefix
      });

      if (visualMap && Object.keys(visualMap).length > 0) {
        extractedBatch.items.forEach(item => {
          const qNum = item.question.number;
          if (visualMap[qNum] && visualMap[qNum].length > 0) {
            item.question.images = visualMap[qNum];
            console.log(`[Visual] 📸 Questão Q${qNum} associada a ${visualMap[qNum].length} imagem(ns): ${visualMap[qNum].join(', ')}`);
          }
        });
      }
    } catch (visErr: any) {
      console.warn(`[Visual] ⚠️ Extração visual concluída sem novas figuras ou com alerta: ${visErr?.message}`);
    }

    // Grava dump em JSON para auditoria na pasta tmp/
    const dumpPath = path.join(OUTPUT_DIR, `extracted-${downloadResult.examId}.json`);
    fs.writeFileSync(dumpPath, JSON.stringify(extractedBatch, null, 2), 'utf-8');
    console.log(`[Pipeline] ✅ Dump completo salvo em: ${dumpPath}`);

    // -------------------------------------------------------------
    // PASSO C: Injetar no Banco de Dados Estático (Writer) e Validar
    // -------------------------------------------------------------
    console.log('-------------------------------------------------------------');
    console.log('PASSO C: INSERINDO QUESTÕES NO BANCO DE DADOS LOCAL E VALIDANDO');
    console.log('-------------------------------------------------------------');
    
    // Import do writer usando lazy load ou import direto
    const { writeExtractedData } = await import('./writer.js');
    writeExtractedData(dumpPath);

    console.log('\n' + '='.repeat(70));
    console.log('  PIPELINE ETL CONCLUÍDO COM SUCESSO!');
    console.log('='.repeat(70));

  } catch (error) {
    console.error('\n❌ [Pipeline] Erro crítico durante o processamento ETL:');
    console.error((error as Error).message);
    if ((error as Error).stack) {
      console.error((error as Error).stack);
    }
    process.exit(1);
  }
}

runPipeline();
