import test from 'node:test';
import assert from 'node:assert/strict';
import { METHOD_IDS, SECTIONS } from './contraception-data.js';
import { evaluate, resolveCell, toggleAnswer, searchQuestions, allQuestions } from './contraception-engine.js';

const by = (r) => Object.fromEntries(r.methods.map(m => [m.id, m]));
const pick = (...pairs) => pairs.reduce((a, [q, o]) => toggleAnswer(a, q, o), {});

/* ---------- integridade dos dados ---------- */

test('dados: ids únicos, 7 colunas por opção e toda célula é válida nas duas fases', () => {
    const qids = new Set();
    for (const s of SECTIONS) for (const q of s.questions) {
        assert.ok(!qids.has(q.id), `pergunta repetida: ${q.id}`);
        qids.add(q.id);
        assert.ok(['single', 'multi'].includes(q.type), q.id);
        assert.ok(q.page >= 159 && q.page <= 175, `${q.id}: página fora da tabela-resumo`);
        const oids = new Set();
        for (const o of q.options) {
            assert.ok(!oids.has(o.id), `${q.id}.${o.id} repetida`);
            oids.add(o.id);
            assert.equal(o.cats.length, METHOD_IDS.length, `${q.id}.${o.id}`);
            for (const c of o.cats) for (const phase of ['start', 'continue']) {
                const r = resolveCell(c, phase);
                if (r && !r.na) assert.ok(r.min >= 1 && r.max <= 4 && r.min <= r.max, `${q.id}.${o.id}: ${JSON.stringify(c)}`);
            }
        }
    }
    assert.ok(qids.size >= 50);
});

/* ---------- casos conferidos na tabela-resumo da OMS ---------- */

test('sem respostas: todos os métodos categoria 1, nenhum "melhor opção"', () => {
    const r = evaluate({});
    assert.ok(r.methods.every(m => m.category === 1 && m.section === 'indicated' && !m.best));
});

test('enxaqueca com aura: combinados 4; progestagênios 2 no início e 3 na continuação', () => {
    const a = pick(['headache', 'aura']);
    const start = by(evaluate(a, { phase: 'start' }));
    assert.deepEqual([start.coc.category, start.cic.category, start.pop.category, start.imp.category, start.cu.category, start.lng.category], [4, 4, 2, 2, 1, 2]);
    const cont = by(evaluate(a, { phase: 'continue' }));
    assert.equal(cont.pop.category, 3);
    assert.equal(cont.pop.section, 'discouraged');
    assert.equal(cont.cu.section, 'indicated');
});

test('tabagismo ≥35 anos e ≥15 cig/dia: combinado 4, injetável mensal 3, demais 1', () => {
    const r = by(evaluate(pick(['smoking', 'ge35_ge15'])));
    assert.deepEqual([r.coc.category, r.cic.category, r.pop.category, r.dmpa.category], [4, 3, 1, 1]);
});

test('TVP/TEP aguda: nenhum hormonal é indicado; DIU de cobre 1', () => {
    const r = by(evaluate(pick(['vte', 'acute'])));
    assert.deepEqual(METHOD_IDS.map(id => r[id].category), [4, 4, 3, 3, 3, 1, 3]);
    assert.equal(r.cu.section, 'indicated');
});

test('lúpus com antifosfolípide: combinados 4, demais hormonais 3, cobre 1', () => {
    const r = by(evaluate(pick(['sle', 'apl'])));
    assert.deepEqual(METHOD_IDS.map(id => r[id].category), [4, 4, 3, 3, 3, 1, 3]);
});

test('câncer de mama atual: tudo 4 exceto DIU de cobre', () => {
    const r = by(evaluate(pick(['breast', 'current'])));
    assert.deepEqual(METHOD_IDS.map(id => r[id].category), [4, 4, 4, 4, 4, 1, 4]);
});

test('DIP atual: DIUs 4 no início e 2 na continuação (continuar não é contraindicado)', () => {
    const a = pick(['pid', 'current']);
    assert.equal(by(evaluate(a, { phase: 'start' })).cu.section, 'contraindicated');
    assert.equal(by(evaluate(a, { phase: 'continue' })).cu.category, 2);
});

test('risco aumentado de IST: DIU é faixa 2/3 no início ("depende") e 2 na continuação', () => {
    const a = pick(['sti', 'risk']);
    const start = by(evaluate(a, { phase: 'start' }));
    assert.equal(start.cu.display, '2/3');
    assert.equal(start.cu.section, 'depends');
    assert.equal(by(evaluate(a, { phase: 'continue' })).cu.section, 'indicated');
});

test('diabetes com nefropatia: combinado 3/4 (depende); injetável trimestral 3', () => {
    const r = by(evaluate(pick(['diabetes', 'micro'])));
    assert.equal(r.coc.display, '3/4');
    assert.equal(r.coc.section, 'depends');
    assert.equal(r.dmpa.section, 'discouraged');
});

test('várias condições: vale a pior categoria por método, com a causa nos drivers', () => {
    const r = by(evaluate(pick(['obesity', 'bmi30'], ['htn', 'sbp140'], ['smoking', 'ge35_lt15'])));
    assert.equal(r.coc.category, 3);
    assert.deepEqual(r.coc.drivers.map(d => d.questionId).sort(), ['htn', 'obesity', 'smoking']);
    assert.equal(r.imp.category, 1);
});

test('categoria firme vence faixa de mesmo máximo (2/3 + 3 firme → desaconselhado)', () => {
    const r = by(evaluate(pick(['sti', 'risk'], ['gtd', 'falling'])));
    assert.equal(r.cu.category, 3);
    assert.equal(r.cu.ranged, false);
    assert.equal(r.cu.section, 'discouraged');
});

test('gravidez: hormonais "não se aplicam", DIUs contraindicados, e o resultado avisa', () => {
    const r = evaluate(pick(['pregnancy', 'yes']));
    const m = by(r);
    assert.equal(m.coc.section, 'na');
    assert.equal(m.cu.section, 'contraindicated');
    assert.equal(r.pregnancy, true);
});

test('pós-parto amamentando <6 semanas: combinados 4; progestagênios 2', () => {
    const r = by(evaluate(pick(['postpartum', 'bf_lt6w'])));
    assert.deepEqual([r.coc.category, r.pop.category, r.imp.category, r.cu.category], [4, 2, 2, 1]);
});

test('idade <18 anos: injetável trimestral e DIUs categoria 2', () => {
    const r = by(evaluate(pick(['age', 'lt18'])));
    assert.deepEqual([r.dmpa.category, r.cu.category, r.lng.category, r.coc.category], [2, 2, 2, 1]);
});

/* ---------- ordenação, preferências e respostas ---------- */

test('ordena por seção, depois preferência, categoria e eficácia; "melhor opção" é o 1º indicado', () => {
    const r = evaluate(pick(['headache', 'aura']));
    assert.equal(r.methods[0].id, 'cu');   // categoria 1
    assert.equal(r.methods[0].best, true);
    assert.equal(r.methods.at(-1).section, 'contraindicated');
    assert.equal(r.groups[0].id, 'indicated');
});

test('preferência "sem hormônio" põe o DIU de cobre à frente e marca os hormonais', () => {
    const r = evaluate(pick(['age', '20_39']), { prefs: { noHormone: true } });
    assert.equal(r.methods[0].id, 'cu');
    assert.ok(r.methods.filter(m => m.hormonal).every(m => m.misses));
});

test('toggleAnswer: single troca e desmarca; multi acumula; é imutável', () => {
    const a = pick(['age', 'lt18']);
    const b = toggleAnswer(a, 'age', 'gt45');
    assert.deepEqual(b.age, ['gt45']);
    assert.deepEqual(a.age, ['lt18']);
    assert.equal(toggleAnswer(b, 'age', 'gt45').age, undefined);
    const m = pick(['art', 'nrti'], ['art', 'efv']);
    assert.deepEqual(m.art, ['nrti', 'efv']);
    assert.equal(toggleAnswer(a, 'age', 'inexistente'), a);
});

test('busca ignora acento e caixa e exige todos os termos', () => {
    assert.ok(searchQuestions('ENXAQUECA aura').get('headache').has('aura'));
    assert.ok(searchQuestions('rifampicina').has('antimicrobial'));
    assert.equal(searchQuestions('   '), null);
    assert.equal(searchQuestions('xyzabc').size, 0);
});

test('busca encontra toda pergunta pelo título', () => {
    for (const q of allQuestions()) assert.ok(searchQuestions(q.title).has(q.id), q.id);
});
