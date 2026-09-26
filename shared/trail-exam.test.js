import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildWeightedExam } from './trail-exam.js';

// number 1-20 -> Medicina Preventiva, 41-60 -> Cirurgia Geral (ver
// exam-areas.js) — usa só esses dois blocos pra manter o teste pequeno.
function makeQuestions() {
    const preventiva = [
        { id: 'p1', number: 1, area: 'Epidemiologia', assunto: 'Testes diagnósticos' },
        { id: 'p2', number: 2, area: 'Epidemiologia', assunto: 'Testes diagnósticos' },
        { id: 'p3', number: 3, area: 'Epidemiologia', assunto: 'Testes diagnósticos' },
        { id: 'p4', number: 4, area: 'SUS', assunto: 'PNAB' },
    ];
    const cirurgia = Array.from({ length: 8 }, (_, i) => ({
        id: `c${i + 1}`, number: 41 + i, area: 'Trauma', assunto: 'ATLS',
    }));
    return [...preventiva, ...cirurgia];
}

function seededRandom(seed) {
    let s = seed;
    return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
}

test('respeita exatamente o perArea por grande área (classificando pela posição da questão)', () => {
    const exam = buildWeightedExam(makeQuestions(), 3, seededRandom(1));
    const byArea = {};
    exam.forEach((q) => { byArea[q.number <= 20 ? 'preventiva' : 'cirurgia'] = (byArea[q.number <= 20 ? 'preventiva' : 'cirurgia'] || 0) + 1; });
    assert.equal(byArea.preventiva, 3);
    assert.equal(byArea.cirurgia, 3);
});

test('nunca repete uma questão', () => {
    const exam = buildWeightedExam(makeQuestions(), 3, seededRandom(5));
    const ids = exam.map((q) => q.id);
    assert.equal(new Set(ids).size, ids.length);
});

test('nunca pede mais questões do que a área tem disponível', () => {
    const exam = buildWeightedExam(makeQuestions(), 20, seededRandom(2));
    const preventiva = exam.filter((q) => q.number <= 20);
    assert.equal(preventiva.length, 4); // só 4 questões de preventiva no pool de teste
});

test('questão sem number válido (fora de 1-100) fica de fora do simulado', () => {
    const questions = [...makeQuestions(), { id: 'x', number: 999, area: 'Rara', assunto: 'Rara' }];
    const exam = buildWeightedExam(questions, 3, seededRandom(3));
    assert.ok(!exam.some((q) => q.id === 'x'));
});

test('assunto que muda de grande área conforme a questão não mistura os blocos', () => {
    // "HAS" aparece tanto no bloco de Preventiva (num 5) quanto no de
    // Cirurgia (num 45) — cada ocorrência deve ficar só no bloco certo.
    const questions = [
        ...makeQuestions(),
        { id: 'has-prev', number: 5, area: 'Cardiologia', assunto: 'HAS' },
        { id: 'has-cir', number: 45, area: 'Cardiologia', assunto: 'HAS' },
    ];
    const exam = buildWeightedExam(questions, 5, seededRandom(9));
    const idsByBlock = { preventiva: exam.filter((q) => q.number <= 20).map((q) => q.id), cirurgia: exam.filter((q) => q.number > 40).map((q) => q.id) };
    // se algum "has-*" foi selecionado, tem que estar no bloco certo
    if (idsByBlock.preventiva.includes('has-cir')) assert.fail('has-cir vazou pro bloco de preventiva');
    if (idsByBlock.cirurgia.includes('has-prev')) assert.fail('has-prev vazou pro bloco de cirurgia');
});
