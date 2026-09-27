import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildStudyBlocks, studyCandidates } from './trail-blocks.js';

test('continuação: o que sobra de um assunto grande volta em blocos seguintes, até acabar', () => {
    const blocks = buildStudyBlocks([s('big', 'Pneumo', 30, 0.5), s('other', 'Cardio', 3, 0.1)], { targetSize: 12 });
    const bigBlocks = blocks.filter((b) => b.subjects.some((x) => x.key === 'big'));
    assert.equal(bigBlocks.reduce((n, b) => n + b.subjects.find((x) => x.key === 'big').questions, 0), 30);
    assert.equal(bigBlocks[0].subjects[0].continuation, false);
    assert.equal(bigBlocks[1].subjects[0].continuation, true);
});

test('studyCandidates: assunto iniciado continua candidato enquanto tiver questão não vista', () => {
    const subjects = [
        { key: 'A > x', area: 'A', assunto: 'x', weight: 0.5, questionIds: ['x1', 'x2', 'x3', 'x4'], status: { studied: 2, accuracy: 0.3 } },
        { key: 'B > y', area: 'B', assunto: 'y', weight: 0.1, questionIds: ['y1'], status: { studied: 0 } },
        { key: 'C > z', area: 'C', assunto: 'z', weight: 0.9, questionIds: ['z1'], status: { studied: 1, accuracy: 1 } },
    ];
    const queue = { x1: {}, x2: {}, z1: {} };
    const c = studyCandidates(subjects, queue, 0.8);
    assert.deepEqual(c.map((k) => k.key), ['A > x', 'B > y']); // z: tudo visto
    assert.deepEqual(c[0].questionIds, ['x3', 'x4']);
    assert.equal(c[0].started, true);
});

const s = (key, area, n, weight = 0.01) => ({ key, area, assunto: key, weight, questionIds: Array.from({ length: n }, (_, i) => `${key}-${i}`) });

test('junta assuntos pequenos da mesma área num bloco de tamanho útil', () => {
    const blocks = buildStudyBlocks([s('a1', 'Pneumo', 3), s('b1', 'Cardio', 3), s('a2', 'Pneumo', 4), s('a3', 'Pneumo', 5)], { targetSize: 12 });
    assert.equal(blocks[0].area, 'Pneumo');
    assert.deepEqual(blocks[0].subjects.map((x) => x.key), ['a1', 'a2', 'a3']);
    assert.equal(blocks[0].questions, 12);
    assert.deepEqual(blocks[1].subjects.map((x) => x.key), ['b1']);
});

test('ordem dos blocos segue a prioridade do assunto que abre cada bloco', () => {
    const blocks = buildStudyBlocks([s('c', 'Cardio', 3), s('p', 'Pneumo', 3), s('c2', 'Cardio', 3)], { targetSize: 12 });
    assert.deepEqual(blocks.map((b) => b.area), ['Cardio', 'Pneumo']);
});

test('assunto grande (banco com provas irmãs) enche o bloco sozinho, limitado ao alvo', () => {
    const blocks = buildStudyBlocks([s('big', 'Pneumo', 60), s('small', 'Pneumo', 3)], { targetSize: 12 });
    assert.equal(blocks[0].subjects.length, 1);
    assert.equal(blocks[0].questions, 12);
    assert.equal(blocks[1].subjects[0].key, 'small');
});

test('nunca passa do tamanho máximo do bloco', () => {
    const blocks = buildStudyBlocks([s('a', 'X', 10), s('b', 'X', 10), s('c', 'X', 10)], { targetSize: 15, maxSize: 20 });
    assert.ok(blocks.every((b) => b.questions <= 20));
    assert.equal(blocks[0].questions, 20);
});

test('peso do bloco é a soma dos assuntos; assunto sem questão é ignorado', () => {
    const blocks = buildStudyBlocks([s('a', 'X', 3, 0.05), s('b', 'X', 3, 0.02), s('vazio', 'X', 0, 0.5)]);
    assert.equal(blocks.length, 1);
    assert.ok(Math.abs(blocks[0].weight - 0.07) < 1e-9);
});
