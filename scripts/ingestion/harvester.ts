import { execSync } from 'node:child_process';

interface BatchRunOptions {
  year?: number;
  totalQuestions?: number;
  batchSize?: number;
  start?: number;
}

const args = process.argv.slice(2);
let year = 2024;
let edition: string | undefined = undefined;
let total = 20;
let batchSize = 5;
let start = 1;

args.forEach((arg, i) => {
  if (arg === '--year' && args[i + 1]) year = parseInt(args[i + 1], 10);
  if (arg === '--edition' && args[i + 1]) edition = args[i + 1];
  if (arg === '--total' && args[i + 1]) total = parseInt(args[i + 1], 10);
  if (arg === '--batch' && args[i + 1]) batchSize = parseInt(args[i + 1], 10);
  if (arg === '--start' && args[i + 1]) start = parseInt(args[i + 1], 10);
});

async function runAutoHarvester() {
  console.log('='.repeat(70));
  console.log(`🚜 TRYCKTRACK HARVESTER - PROCESSAMENTO AUTOMÁTICO EM LINHA`);
  console.log(`Prova: Revalida ${year}${edition ? `.${edition}` : ''} | Início: Q${start} | Total: ${total} | Lote: ${batchSize}`);
  console.log('='.repeat(70) + '\n');

  let currentStart = start;
  const targetEnd = start + total - 1;

  while (currentStart <= targetEnd) {
    const currentLimit = Math.min(batchSize, targetEnd - currentStart + 1);
    console.log(`\n>>> [Lote] Processando questões ${currentStart} até ${currentStart + currentLimit - 1}...`);

    try {
      const editionFlag = edition ? `--edition ${edition}` : '';
      execSync(`npm run ingest -- --year ${year} ${editionFlag} --start ${currentStart} --limit ${currentLimit}`, {
        stdio: 'inherit',
        encoding: 'utf-8'
      });
      console.log(`>>> [Lote] ✅ Concluído com sucesso: Q${currentStart} a Q${currentStart + currentLimit - 1}`);
    } catch (err: any) {
      console.error(`>>> [Lote] ❌ Erro ao processar intervalo Q${currentStart}-${currentStart + currentLimit - 1}:`, err.message);
    }

    currentStart += currentLimit;
  }

  console.log('\n========================================');
  console.log('🎉 Todos os lotes foram processados e sincronizados incrementalmente com o Postgres!');
  console.log('========================================');
}

runAutoHarvester();
