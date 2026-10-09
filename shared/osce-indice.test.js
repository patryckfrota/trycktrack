import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filtrarIndice, gruposDoIndice, sortearEstacao, temasDoRodizio, gruposVisiveis, ROTACOES_INTERNATO, AREAS_REVALIDA } from './osce-indice.js';

const e = (id, titulo, area, rodizio) => ({ id, titulo, area, rodizio, nivelAtencao: 'UPA 24h' });
const lista = [
    e('a', 'Dor no peito em homem', 'clinica-medica', 'urgencia'),
    e('b', 'Criança com febre e tosse', 'pediatria', 'pediatria'),
    e('c', 'Gestante com sangramento', 'ginecologia-obstetricia', 'go'),
    e('d', 'Dispneia súbita', 'clinica-medica', 'urgencia')
];

test('grupos mostram só o que tem estação e quantas', () => {
    assert.deepEqual(gruposDoIndice(lista, 'revalida'), [
        { slug: 'clinica-medica', quantidade: 2 }, { slug: 'pediatria', quantidade: 1 }, { slug: 'ginecologia-obstetricia', quantidade: 1 }
    ]);
    assert.deepEqual(gruposDoIndice(lista, 'internato').map(g => g.slug), ['urgencia', 'pediatria', 'go']);
});

test('filtra por grupo conforme a visão escolhida', () => {
    assert.deepEqual(filtrarIndice(lista, { visao: 'revalida', grupo: 'clinica-medica' }).map(x => x.id), ['a', 'd']);
    assert.deepEqual(filtrarIndice(lista, { visao: 'internato', grupo: 'go' }).map(x => x.id), ['c']);
});

test('busca ignora acento e maiúsculas e exige todos os termos', () => {
    assert.deepEqual(filtrarIndice(lista, { busca: 'DISPNEIA subita' }).map(x => x.id), ['d']);
    assert.deepEqual(filtrarIndice(lista, { busca: 'crianca tosse' }).map(x => x.id), ['b']);
    assert.deepEqual(filtrarIndice(lista, { busca: 'dispneia tosse' }), []);
});

test('"só as que ainda não fiz" esconde as já feitas', () => {
    assert.deepEqual(filtrarIndice(lista, { soNaoFeitas: true, jaFeitas: new Set(['a', 'b']) }).map(x => x.id), ['c', 'd']);
});

test('sorteio prefere as não feitas e cai em todas quando todas foram feitas', () => {
    assert.equal(sortearEstacao(lista, new Set(['a', 'b', 'c']), () => 0).id, 'd');
    assert.equal(sortearEstacao(lista, new Set(['a', 'b', 'c', 'd']), () => 0.99).id, 'd');
    assert.equal(sortearEstacao([], new Set()), null);
});

const matriz = [{ slug: 'urgencia', themes: [
    { code: 'A', subthemes: [{ slug: 'a-1', name: 'Suporte de vida' }, { slug: 'a-2', name: 'Lesão renal aguda' }] },
    { code: 'B', subthemes: [{ slug: 'b-4', name: 'Síndromes coronarianas agudas' }] }
] }];
const comTema = [
    { ...e('a', 'Dor no peito', 'clinica-medica', 'urgencia'), topico: 'B', temaSlug: 'b-4' },
    { ...e('d', 'Dispneia', 'clinica-medica', 'urgencia'), topico: 'A', temaSlug: 'a-1' },
    { ...e('b', 'Febre', 'pediatria', 'pediatria'), topico: 'A', temaSlug: 'a-1' }
];

test('filtro do Internato por tópico e por tema (só vale na visão internato)', () => {
    assert.deepEqual(filtrarIndice(comTema, { visao: 'internato', grupo: 'urgencia', topico: 'B' }).map(x => x.id), ['a']);
    assert.deepEqual(filtrarIndice(comTema, { visao: 'internato', grupo: 'urgencia', tema: 'a-1' }).map(x => x.id), ['d']);
    assert.deepEqual(filtrarIndice(comTema, { visao: 'internato', grupo: 'urgencia', topico: 'B', tema: 'a-1' }), []);
    assert.deepEqual(filtrarIndice(comTema, { visao: 'revalida', topico: 'B' }).length, 3, 'tópico/tema não afetam a visão Revalida');
});

test('temas da rotação listam todos os da matriz, com a contagem de estações (inclusive zero)', () => {
    assert.deepEqual(temasDoRodizio(comTema, matriz, 'urgencia'), [
        { slug: 'a-1', nome: 'Suporte de vida', topico: 'A', quantidade: 1 },
        { slug: 'a-2', nome: 'Lesão renal aguda', topico: 'A', quantidade: 0 },
        { slug: 'b-4', nome: 'Síndromes coronarianas agudas', topico: 'B', quantidade: 1 }
    ]);
    assert.deepEqual(temasDoRodizio(comTema, matriz, 'urgencia', 'B').map(t => t.slug), ['b-4']);
    assert.deepEqual(temasDoRodizio(comTema, matriz, 'inexistente'), []);
});

test('índice real: toda estação aprovada carrega rotação, tópico e tema que existem na matriz do app', async () => {
    const fs = await import('node:fs');
    const indice = JSON.parse(fs.readFileSync(new URL('../osce/indice.json', import.meta.url), 'utf8'));
    const app = fs.readFileSync(new URL('../app-app.js', import.meta.url), 'utf8');
    const matrizReal = JSON.parse(app.match(/const OSCE_CURRICULUM_MATRIX = (\[.*?\]);\n/s)[1]);
    for (const est of indice.estacoes) {
        const tema = temasDoRodizio([est], matrizReal, est.rodizio, est.topico).find(t => t.slug === est.temaSlug);
        assert.ok(tema, `${est.id}: ${est.rodizio}/${est.topico}/${est.temaSlug} não existe na matriz`);
        assert.equal(tema.quantidade, 1);
    }
});

test('as 6 rotações do Internato têm sigla própria e batem com a matriz do app (slug e nome)', async () => {
    const fs = await import('node:fs');
    const app = fs.readFileSync(new URL('../app-app.js', import.meta.url), 'utf8');
    const matrizReal = JSON.parse(app.match(/const OSCE_CURRICULUM_MATRIX = (\[.*?\]);\n/s)[1]);
    assert.deepEqual(ROTACOES_INTERNATO.map(r => r.slug).sort(), matrizReal.map(a => a.slug).sort());
    for (const r of ROTACOES_INTERNATO) assert.equal(r.nome, matrizReal.find(a => a.slug === r.slug).name);
    assert.deepEqual(ROTACOES_INTERNATO.map(r => r.sigla), ['UE', 'PREV', 'PED', 'GO', 'CG', 'CM']);
    assert.equal(new Set(ROTACOES_INTERNATO.map(r => r.sigla)).size, 6);
});

test('grupos visíveis listam TODAS as rotações/áreas, com quantidade (inclusive zero)', () => {
    const lista = [{ id: 'a', area: 'clinica-medica', rodizio: 'urgencia-e-emergencia-saude-mental' }, { id: 'b', area: 'pediatria', rodizio: 'pediatria' }];
    const int = gruposVisiveis(lista, 'internato');
    assert.equal(int.length, 6);
    assert.deepEqual(int.map(g => `${g.sigla}:${g.quantidade}`), ['UE:1', 'PREV:0', 'PED:1', 'GO:0', 'CG:0', 'CM:0']);
    const rev = gruposVisiveis(lista, 'revalida');
    assert.deepEqual(rev.map(g => `${g.sigla}:${g.quantidade}`), ['CM:1', 'CG:0', 'GO:0', 'PED:1', 'MFC:0']);
    assert.equal(AREAS_REVALIDA.length, 5);
});
