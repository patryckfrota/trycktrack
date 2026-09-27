// Garante que todo questions-*.js da raiz esteja carregado pelo app
// (<script> no index.html) e disponível offline (APP_SHELL do sw.js).
// O motor de ingestão cria um arquivo novo por banca (questions-sus.js,
// questions-usp.js...) e, sem isso, a prova entrava no repositório mas
// ficava invisível pro aluno. O import do Postgres já descobre os arquivos
// sozinho. Idempotente: rodar de novo não duplica nada.
//
//   node pipeline/registrar-bancos.cjs
//
// Quando adiciona algo, sobe a versão do cache do sw.js (sem isso o PWA
// instalado nunca baixa o arquivo novo).
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INDEX = path.join(ROOT, 'index.html');
const SW = path.join(ROOT, 'sw.js');
// Âncoras: os novos entram logo depois do último banco principal já listado,
// antes do bloco do Internato, mantendo a ordem que question-explanations.js
// exige (todos os bancos carregados antes das explicações).
const ANCORA_INDEX = '<script src="questions-uepa.js" defer></script>';
const ANCORA_SW = "'./questions-uepa.js',";

const bancos = fs.readdirSync(ROOT)
    .filter(f => /^questions-.*\.js$/.test(f) && f !== 'questions-internato.js')
    .sort();

let index = fs.readFileSync(INDEX, 'utf8');
let sw = fs.readFileSync(SW, 'utf8');
const novos = [];

for (const f of bancos) {
    if (!index.includes(`src="${f}"`)) {
        if (!index.includes(ANCORA_INDEX)) throw new Error('Âncora do index.html não encontrada — atualize ANCORA_INDEX.');
        index = index.replace(ANCORA_INDEX, `${ANCORA_INDEX}\n    <script src="${f}" defer></script>`);
        novos.push(f);
    }
    if (!sw.includes(`'./${f}'`)) {
        if (!sw.includes(ANCORA_SW)) throw new Error('Âncora do sw.js não encontrada — atualize ANCORA_SW.');
        sw = sw.replace(ANCORA_SW, `${ANCORA_SW}\n  './${f}',`);
        if (!novos.includes(f)) novos.push(f);
    }
}

if (novos.length) {
    sw = sw.replace(/const CACHE_NAME = 'trycktrack-v(\d+)';/, (_, v) => `const CACHE_NAME = 'trycktrack-v${Number(v) + 1}';`);
    fs.writeFileSync(INDEX, index);
    fs.writeFileSync(SW, sw);
    console.log(`Registrados no app: ${novos.join(', ')}`);
} else {
    console.log('Todos os bancos já estão registrados.');
}
