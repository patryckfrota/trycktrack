import test from 'node:test';
import assert from 'node:assert/strict';
import { METHOD_IDS, METHOD_LIST, SECTIONS } from './contraception-data.js';
import { SCREENING, requiredItems, itemDone, screeningProgress, certainty, itemOfQuestion, screeningItem } from './contraception-screening.js';
import { RATES, RATES_SOURCE, effectCategory, typicalRate } from './contraception-rates.js';
import { evaluate, evaluateAll, methodConditions, lamStatus, resolveCell, toggleAnswer, searchQuestions, allQuestions, getQuestion } from './contraception-engine.js';
import { EXTENSIONS } from './contraception-extensions.js';
import { METHOD_USE, VASECTOMY, PREGNANCY_CHECK } from './contraception-use.js';
import { PRESCRIBE, SOURCES, VASECTOMY_LAW } from './contraception-prescribe.js';
import { METHOD_INFO, WHY, REVISED, GUIDANCE, CHANGES_6TH } from './contraception-content.js';

const by = (r) => Object.fromEntries(r.methods.map(m => [m.id, m]));
const pick = (...pairs) => pairs.reduce((a, [q, o]) => toggleAnswer(a, q, o), {});

/* ---------- integridade dos dados ---------- */

test('dados: ids únicos, 7 colunas por opção e toda célula é válida nas duas fases', () => {
    const qids = new Set();
    for (const s of SECTIONS) for (const q of s.questions) {
        assert.ok(!qids.has(q.id), `pergunta repetida: ${q.id}`);
        qids.add(q.id);
        assert.ok(['single', 'multi'].includes(q.type), q.id);
        assert.ok(q.page === 12 || (q.page >= 159 && q.page <= 175), `${q.id}: página fora da fonte`);
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

test('tabagismo usa a idade já informada: 35+ e ≥15 cig/dia → combinado 4, injetável mensal 3, demais 1', () => {
    const r = by(evaluate(pick(['age', '35_39'], ['smoking', 'ge15'])));
    assert.deepEqual([r.coc.category, r.cic.category, r.pop.category, r.dmpa.category], [4, 3, 1, 1]);
    const novo = by(evaluate(pick(['age', '20_34'], ['smoking', 'ge15'])));
    assert.deepEqual([novo.coc.category, novo.cic.category], [2, 2]);          // menos de 35 anos: categoria 2
    const lt15 = by(evaluate(pick(['age', '40_45'], ['smoking', 'lt15'])));
    assert.deepEqual([lt15.coc.category, lt15.cic.category], [3, 2]);
});

test('sem idade informada, tabagismo e enxaqueca valem pela pior faixa (conservador)', () => {
    assert.equal(by(evaluate(pick(['smoking', 'ge15']))).coc.category, 4);
    // enxaqueca sem aura nos combinados: início 2 (<35) ou 3 (35+); continuação 3 ou 4
    assert.equal(by(evaluate(pick(['headache', 'mig']))).coc.category, 3);
    assert.equal(by(evaluate(pick(['headache', 'mig']), { phase: 'continue' })).coc.category, 4);
    assert.equal(by(evaluate(pick(['age', '20_34'], ['headache', 'mig']))).coc.category, 2);
    assert.equal(by(evaluate(pick(['age', '20_34'], ['headache', 'mig']), { phase: 'continue' })).coc.category, 3);
    assert.equal(by(evaluate(pick(['age', '35_39'], ['headache', 'mig']))).coc.category, 3);
});

test('obesidade em menor de 18 anos: injetável trimestral 2 só com a idade <18', () => {
    assert.equal(by(evaluate(pick(['age', 'lt18'], ['obesity', 'bmi30']))).dmpa.category, 2);
    assert.equal(by(evaluate(pick(['age', '20_34'], ['obesity', 'bmi30']))).dmpa.category, 1);
});

test('ficha mostra a dependência de idade: tabagismo do combinado lista as duas faixas', () => {
    const item = methodConditions('coc').groups.flatMap(g => g.items).find(i => i.option.includes('15 ou mais'));
    assert.ok(item.note.includes('Menos de 35 anos: 2') && item.note.includes('35 anos ou mais: 4'), item.note);
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
    const r = by(evaluate(pick(['age', '35_39'], ['obesity', 'bmi30'], ['htn', 'sbp140'], ['smoking', 'lt15'])));
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

test('ordena por seção, depois preferência, categoria e eficácia', () => {
    const r = evaluate(pick(['headache', 'aura']));
    assert.equal(r.methods[0].id, 'cu');   // categoria 1
    assert.equal(r.methods.at(-1).section, 'contraindicated');
    assert.equal(r.groups[0].id, 'indicated');
});

test('preferência "sem hormônio" põe o DIU de cobre à frente e marca os hormonais', () => {
    const r = evaluate(pick(['age', '20_34']), { prefs: { noHormone: true } });
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

/* ---------- extensões: barreira, emergência e percepção da fertilidade ---------- */

test('extensões: links apontam para opções que existem e as colunas batem com os métodos', () => {
    for (const ext of EXTENSIONS) {
        const ids = new Set(ext.methods.map(m => m.id));
        assert.equal(ids.size, ext.methods.length, ext.id);
        for (const l of ext.links) {
            const q = getQuestion(l.q);
            assert.ok(q && !q.family, `${ext.id}: pergunta ${l.q}`);
            assert.ok(q.options.some(o => o.id === l.o), `${ext.id}: opção ${l.q}.${l.o}`);
            assert.equal(l.cats.length, ext.methods.length, `${ext.id}.${l.q}.${l.o}`);
            l.cats.forEach(c => resolveCell(c, 'start', ext.scale));
        }
        for (const q of ext.ownQuestions) {
            assert.equal(getQuestion(q.id).family, ext.id);
            for (const o of q.options) {
                assert.equal(o.cats.length, ext.methods.length, `${q.id}.${o.id}`);
                o.cats.forEach(c => resolveCell(c, 'start', ext.scale));
            }
        }
    }
});

test('conteúdo: toda explicação e todo item "revisado" aponta para uma pergunta ou opção real', () => {
    for (const id of Object.keys(WHY)) assert.ok(getQuestion(id), `WHY.${id}`);
    for (const [q, opts] of Object.entries(REVISED)) for (const o of opts) assert.ok(getQuestion(q).options.some(x => x.id === o), `${q}.${o}`);
    assert.deepEqual(Object.keys(GUIDANCE), ['1', '2', '3', '4']);
    assert.equal(CHANGES_6TH.length, 6);
});

test('barreira: HIV de alto risco → espermicida/diafragma 4 e preservativo 1; alergia a látex → preservativo 3', () => {
    const hiv = evaluateAll(pick(['hiv', 'highrisk'])).barrier;
    const m = by(hiv);
    assert.equal(m.condom.category, 1);
    assert.equal(m.diaphragm.section, 'contraindicated');
    const latex = by(evaluateAll(pick(['latex', 'yes'])).barrier);
    assert.equal(latex.condom.category, 3);
    assert.ok(latex.condom.drivers[0].note.includes('plástico'));
});

test('barreira: pós-parto <6 semanas → diafragma não se aplica', () => {
    const m = by(evaluateAll(pick(['postpartum', 'bf_lt6w'])).barrier);
    assert.equal(m.diaphragm.section, 'na');
    assert.equal(m.condom.section, 'indicated');
});

test('emergência: DIU de cobre herda os critérios do DIU de cobre (DIP atual → 4) e a gravidez barra tudo', () => {
    const pid = by(evaluateAll(pick(['pid', 'current'])).emergency);
    assert.equal(pid.eiud.section, 'contraindicated');
    assert.equal(pid.ecp_lng.section, 'indicated');
    const preg = by(evaluateAll(pick(['pregnancy', 'yes'])).emergency);
    assert.equal(preg.ecp_lng.section, 'na');
    assert.equal(preg.eiud.section, 'contraindicated');
});

test('emergência: amamentando → ulipristal 2 com orientação; violência sexual com alto risco de IST → DIU 3', () => {
    const bf = by(evaluateAll(pick(['postpartum', 'bf_gt6m'])).emergency);
    assert.equal(bf.ecp_upa.category, 2);
    assert.ok(bf.ecp_upa.drivers[0].note.includes('1 semana'));
    assert.equal(bf.ecp_lng.category, 1);
    assert.equal(bf.ecp_lng.drivers.length, 0); // a nota do ulipristal não vaza para os outros
    const rape = by(evaluateAll(pick(['ecRape', 'high'])).emergency);
    assert.equal(rape.eiud.category, 3);
    assert.equal(rape.ecp_upa.category, 1);
});

test('emergência: efavirenz mantém categoria 1 mas avisa sobre eficácia (nota aparece mesmo na categoria 1)', () => {
    const m = by(evaluateAll(pick(['art', 'efv'])).emergency);
    assert.equal(m.ecp_lng.category, 1);
    assert.ok(m.ecp_lng.drivers.some(d => d.note.includes('efavirenz')));
});

test('percepção da fertilidade (A/C/D): amamentando <6 sem → D/D; sem amamentar 3-6 sem → sintomas A/D (depende)', () => {
    const bf = by(evaluateAll(pick(['postpartum', 'bf_lt6w'])).fab);
    assert.deepEqual([bf.fab_sym.display, bf.fab_cal.display], ['D', 'D']);
    assert.equal(bf.fab_sym.section, 'delay');
    const nbf = by(evaluateAll(pick(['postpartum', 'nbf_21_42_no'])).fab);
    assert.equal(nbf.fab_sym.display, 'A/D');
    assert.equal(nbf.fab_sym.section, 'depends');
    assert.equal(nbf.fab_cal.section, 'delay');
});

test('percepção da fertilidade: sem respostas tudo A; condições próprias entram só na sua família', () => {
    const none = evaluateAll({});
    assert.ok(none.fab.methods.every(m => m.section === 'indicated' && m.display === 'A'));
    // pergunta própria da FAB não altera o núcleo nem a barreira
    const a = pick(['fabDischarge', 'yes']);
    assert.ok(evaluateAll(a).core.methods.every(m => m.category === 1));
    assert.ok(evaluateAll(a).barrier.methods.every(m => m.category === 1));
    const fab = by(evaluateAll(a).fab);
    assert.equal(fab.fab_sym.section, 'delay');
    assert.equal(fab.fab_cal.section, 'indicated');
});

test('DII: aviso de "sem recomendação" sem alterar nenhuma categoria', () => {
    const r = evaluateAll(pick(['ibd', 'yes'])).core;
    assert.equal(r.notices.length, 1);
    assert.ok(r.methods.every(m => m.category === 1));
});

test('LAM: precisa dos 3 critérios ao mesmo tempo', () => {
    assert.equal(lamStatus({ amenorrhea: true, fullBf: true, lt6m: true }).met, true);
    const s = lamStatus({ amenorrhea: true, fullBf: false, lt6m: true });
    assert.equal(s.met, false);
    assert.deepEqual(s.missing, ['Amamentação exclusiva ou quase exclusiva']);
});

test('ids de perguntas são únicos entre a tabela-resumo e todas as extensões', () => {
    const seen = new Set();
    for (const s of SECTIONS) for (const q of s.questions) { assert.ok(!seen.has(q.id), q.id); seen.add(q.id); }
    for (const ext of EXTENSIONS) for (const q of ext.ownQuestions) { assert.ok(!seen.has(q.id), q.id); seen.add(q.id); }
    assert.equal(allQuestions().length, seen.size);
});

test('esterilização: pior situação vence (D > S > C > A) e faixa C/D cai em "depende"', () => {
    const t = (...pairs) => by(evaluateAll(pick(...pairs)).ster).tubal;
    assert.equal(t().section, 'indicated');
    assert.equal(t(['htn', 'sbp160']).section, 'special');
    assert.equal(t(['htn', 'controlled']).section, 'caution');
    assert.equal(t(['pregnancy', 'yes']).section, 'delay');
    assert.equal(t(['sterTime', '7_42']).section, 'delay');
    assert.equal(t(['sterTime', 'lt7']).section, 'indicated');
    assert.equal(t(['htn', 'sbp160'], ['sterObstetric', 'preSevere']).display, 'D');
    assert.equal(t(['ihd', 'yes']).display, 'C/D');
    assert.equal(t(['ihd', 'yes']).section, 'depends');
    assert.equal(t(['sterConcurrent', 'cesarean']).section, 'indicated');
});

test('esterilização: nuliparidade é A com aviso de aconselhamento; jovem é C', () => {
    const nul = by(evaluateAll(pick(['parity', 'nullip'])).ster).tubal;
    assert.equal(nul.section, 'indicated');
    assert.ok(nul.drivers[0].note.includes('permanência'));
    assert.equal(by(evaluateAll(pick(['sterYoung', 'yes'])).ster).tubal.section, 'caution');
});

/* ---------- ficha do método ---------- */

test('ficha: toda opção de método tem texto, ou seja, METHOD_INFO cobre todos os métodos', () => {
    const ids = [...METHOD_LIST, ...EXTENSIONS.flatMap(e => e.methods.map(m => m.id))];
    for (const id of ids) {
        const info = METHOD_INFO[id];
        assert.ok(info && info.subtitle && info.about.length && info.source, id);
        assert.ok(methodConditions(id), id);
    }
});

test('ficha do combinado: enxaqueca com aura em "contraindicado"; categoria 2 vira grupo "Cautela"; categoria 1 não aparece', () => {
    const f = methodConditions('coc');
    const g = Object.fromEntries(f.groups.map(x => [x.id, x]));
    assert.ok(g.contraindicated.items.some(i => i.option.includes('Enxaqueca com aura')));
    assert.ok(g.care.items.some(i => i.option.includes('Obesidade') || i.option.includes('IMC')));
    assert.ok(!f.groups.flatMap(x => x.items).some(i => i.option === 'Menos de 18 anos (desde a menarca)'));
    assert.equal(f.groups[0].id, 'contraindicated');
});

test('ficha: início e continuação diferentes aparecem juntos (minipílula, enxaqueca com aura: 2 e 3)', () => {
    const pop = methodConditions('pop');
    const item = pop.groups.flatMap(x => x.items).find(i => i.option.includes('Enxaqueca com aura'));
    assert.equal(item.display, 'início 2 · continuação 3');
});

test('ficha do DIU de emergência herda a lista do DIU de cobre; a de esterilização usa D/S/C', () => {
    const e = methodConditions('eiud');
    assert.ok(e.groups.flatMap(x => x.items).some(i => i.option.includes('DIP atual')));
    const t = methodConditions('tubal');
    assert.deepEqual(t.groups.map(g => g.id).slice(0, 2), ['delay', 'special']);
});

test('como usar (SPR): só métodos reais, seções com itens, e vasectomia com as 4 classes', () => {
    const ids = new Set([...METHOD_LIST, ...EXTENSIONS.flatMap(e => e.methods.map(m => m.id))]);
    for (const [id, use] of Object.entries(METHOD_USE)) {
        assert.ok(ids.has(id), id);
        assert.ok(use.source && use.sections.length, id);
        for (const sec of use.sections) {
            assert.ok(sec.title && sec.items.length, `${id}.${sec.title}`);
            for (const it of sec.items) assert.ok(it.k && it.t, `${id}.${sec.title}`);
        }
    }
    for (const id of ['coc', 'patch', 'cvr', 'cic', 'pop', 'dmpa', 'imp', 'cu', 'lng', 'ecp_upa', 'ecp_lng', 'ecp_coc', 'eiud', 'fab_cal']) assert.ok(METHOD_USE[id], id);
    assert.deepEqual(VASECTOMY.conditions.map(c => c.cat), ['D', 'S', 'C', 'A']);
    assert.equal(PREGNANCY_CHECK.criteria.length, 6);
});

/* ---------- cartões separados, taxas de eficácia e "maior eficácia" ---------- */

test('pílula, adesivo e anel são cartões diferentes que compartilham a coluna do combinado', () => {
    const r = by(evaluate(pick(['headache', 'aura'])));
    for (const id of ['coc', 'patch', 'cvr']) { assert.equal(r[id].category, 4, id); assert.equal(r[id].section, 'contraindicated'); }
    assert.equal(evaluate({}).methods.length, METHOD_LIST.length);
    assert.equal(new Set(evaluate({}).methods.map(m => m.name)).size, METHOD_LIST.length);
});

test('taxas (OMS SPR 2025, tabela 1.1): valores conferidos e categorias de eficácia', () => {
    assert.deepEqual(RATES.lng[0], { perfect: 0.3, typical: 0.4, intl: null });
    assert.deepEqual([RATES.imp[0].typical, RATES.dmpa[0].typical, RATES.coc[0].typical], [0.1, 4, 7]);
    assert.equal(RATES.condom[0].typical, 13);
    assert.deepEqual([0.8, 4, 7, 13, 23].map(effectCategory), [1, 2, 2, 3, 3]);
    assert.equal(typicalRate('cic'), null);
    assert.equal(RATES_SOURCE.noMethod, 85);
    for (const rows of Object.values(RATES)) for (const r of rows) if (r.perfect != null) assert.ok(r.typical >= r.perfect - 0.001 || r.typical == null);
});

test('"maior eficácia entre os indicados": menor uso típico entre os indicados; muda quando o implante não é indicado', () => {
    const none = evaluate(pick(['age', '20_34']));
    assert.equal(none.methods.find(m => m.best).id, 'imp');
    assert.equal(none.methods.filter(m => m.best).length, 1);
    const noImplant = evaluate(pick(['breast', 'current']));   // implante e DIU-LNG categoria 4; sobra o DIU de cobre
    assert.equal(noImplant.methods.find(m => m.best).id, 'cu');
    assert.equal(evaluate({}).methods.some(m => m.best), false); // sem perfil não destaca
});

test('"maior eficácia" respeita preferência: sem hormônio → DIU de cobre', () => {
    const r = evaluate(pick(['age', '20_34']), { prefs: { noHormone: true } });
    assert.equal(r.methods.find(m => m.best).id, 'cu');
});

/* ---------- triagem: quais respostas dão certeza ao resultado ---------- */

test('triagem: membros existem, não se repetem e cobrem toda pergunta decisiva (categoria 3, 4 ou NA)', () => {
    const seen = new Set();
    for (const item of SCREENING) for (const q of item.members) {
        assert.ok(getQuestion(q) && !getQuestion(q).family, `${item.id}.${q}`);
        assert.ok(!seen.has(q), `${q} em dois itens`);
        seen.add(q);
    }
    const decisive = new Set();
    for (const s of SECTIONS) for (const q of s.questions) for (const o of q.options) o.cats.forEach(c => {
        for (const ph of ['start', 'continue']) { const r = resolveCell(c, ph); if (r && (r.na || r.max >= 3)) decisive.add(q.id); }
    });
    for (const q of decisive) assert.ok(itemOfQuestion(q), `${q} decisiva sem item de triagem`);
    assert.equal(SCREENING.length, 17);
});

test('triagem: itens exigidos por método seguem a tabela (combinado x DIU)', () => {
    const coc = requiredItems('coc');
    assert.ok(['age', 'smoking', 'htn', 'headache', 'thrombosis', 'cardio', 'diabetes', 'breast', 'liver', 'lupus', 'drugs', 'postpartum', 'pregnancy'].every(i => coc.includes(i)));
    assert.ok(!coc.includes('pelvic') && !coc.includes('uterus') && !coc.includes('hiv'));
    const cu = requiredItems('cu');
    assert.ok(['age', 'pelvic', 'uterus', 'hiv', 'bleeding', 'postpartum', 'pregnancy'].every(i => cu.includes(i)));
    assert.ok(!cu.includes('smoking') && !cu.includes('htn') && !cu.includes('headache'));
    assert.deepEqual(requiredItems('patch'), requiredItems('coc'));
});

test('triagem: "não" responde; "sim" só responde com opção marcada', () => {
    const item = screeningItem('headache');
    assert.equal(itemDone(item, {}, {}), false);
    assert.equal(itemDone(item, { headache: 'no' }, {}), true);
    assert.equal(itemDone(item, { headache: 'yes' }, {}), false);
    assert.equal(itemDone(item, { headache: 'yes' }, pick(['headache', 'aura'])), true);
    // idade é uma pergunta de escolha: respondida quando uma faixa está marcada
    assert.equal(itemDone(screeningItem('age'), {}, {}), false);
    assert.equal(itemDone(screeningItem('age'), {}, pick(['age', '20_34'])), true);
    const p = screeningProgress({ headache: 'no', htn: 'no' }, {});
    assert.deepEqual([p.done, p.total], [2, 17]);
});

test('triagem: método só é confirmado quando todos os itens exigidos estão respondidos', () => {
    assert.equal(certainty({}, {}).cu.confirmed, false);
    const screen = Object.fromEntries(requiredItems('cu').map(i => [i, 'no']));
    const ageAnswer = pick(['age', '20_34']);
    assert.equal(certainty(screen, {}).cu.confirmed, false);   // sem a idade, nada se confirma
    const c = certainty(screen, ageAnswer);
    assert.equal(c.cu.confirmed, true);
    assert.equal(c.coc.confirmed, false);
    assert.deepEqual(c.coc.missing.sort(), requiredItems('coc').filter(i => !requiredItems('cu').includes(i)).sort());
});

test('"maior eficácia" só vale entre métodos confirmados', () => {
    const answers = pick(['age', '20_34']);
    assert.equal(evaluate(answers, { confirmed: [] }).methods.some(m => m.best), false);
    // o implante é o de menor taxa entre todos os indicados: sem ele confirmado, nenhum selo
    assert.equal(evaluate(answers, { confirmed: ['cu', 'lng'] }).methods.some(m => m.best), false);
    assert.equal(evaluate(answers, { confirmed: ['coc'] }).methods.some(m => m.best), false);
    assert.equal(evaluate(answers, { confirmed: ['imp', 'cu'] }).methods.find(m => m.best).id, 'imp');
});

/* ---------- como prescrever ---------- */

test('como prescrever: só métodos reais, fontes existentes, modelos de receita com via e posologia', () => {
    const ids = new Set([...METHOD_LIST, ...EXTENSIONS.flatMap(e => e.methods.map(m => m.id))]);
    for (const [id, p] of Object.entries(PRESCRIBE)) {
        assert.ok(ids.has(id), id);
        assert.ok(p.substances.length && (p.dosing || p.blocks).length && p.sources.length, id);
        for (const s of p.sources) assert.ok(SOURCES[s] && (SOURCES[s].url === null || /^https:\/\//.test(SOURCES[s].url)), `${id}: fonte ${s}`);
        for (const pr of p.substances) assert.ok(pr.name && pr.form && typeof pr.sus === 'boolean' && Array.isArray(pr.brands), `${id}.${pr.name}`);
        for (const r of p.rx) { assert.ok(r.lines[0].startsWith('USO '), `${id}: ${r.title}`); assert.ok(r.lines.length >= 3, `${id}: ${r.title}`); }
        for (const d of p.dosing || p.blocks.flatMap(b => b.items)) assert.ok(d.k && d.t, id);
    }
    for (const id of ['coc', 'patch', 'cvr', 'cic', 'pop', 'dmpa', 'imp', 'cu', 'lng', 'ecp_lng', 'eiud', 'tubal']) assert.ok(PRESCRIBE[id], id);
    assert.equal(VASECTOMY_LAW.length, 3);
});

test('como prescrever: doses conferidas nas bulas e protocolos oficiais', () => {
    const text = (id) => JSON.stringify(PRESCRIBE[id]);
    assert.ok(text('coc').includes('levonorgestrel 0,15 mg + etinilestradiol 0,03 mg'));
    assert.ok(text('cvr').includes('11,7 mg') && text('cvr').includes('2,7 mg'));
    assert.ok(text('cic').includes('50 mg') && text('cic').includes('5 mg'));
    assert.ok(text('dmpa').includes('150 mg') && text('dmpa').includes('91 dias'));
    assert.ok(text('imp').includes('68 mg') && text('imp').includes('3 anos'));
    assert.ok(text('pop').includes('75 mcg') && text('pop').includes('0,35 mg'));
    assert.ok(text('ecp_lng').includes('1,5 mg') && text('ecp_lng').includes('120 horas'));
    assert.ok(text('tubal').includes('60 dias') && text('tubal').includes('21 anos'));
});

test('implante: manual do Ministério da Saúde está nos blocos (SUS 2025, registro, retorno, retirada, TCLE)', () => {
    const text = JSON.stringify(PRESCRIBE.imp);
    for (const s of ['Portarias SECTICS/MS 47 e 48', '14 a 49 anos', '03.01.04.017-6', '03.01.04.018-4', 'Z300', 'espironolactona', 'Termo (Anexo I do manual)', 'radiografia simples', 'Ácido tranexâmico 500 mg', 'braço contralateral', 'Parecer COFEN 277/2017']) assert.ok(text.includes(s), s);
    assert.ok(PRESCRIBE.imp.blocks.length >= 8);
});
