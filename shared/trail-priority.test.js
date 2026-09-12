import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculatePathPriority } from './trail-priority.js';

test('tema sem nenhum resultado ainda fica com urgência neutra (1.10)', () => {
    const [top] = calculatePathPriority({ topics: [{ id: 'a', area: 'Cirurgia Geral', incidence: 10 }], results: [] });
    assert.equal(top.priorityScore, Number((10 * 1.10).toFixed(2)));
});

test('desempenho ruim (<40%) empurra o tema para o topo', () => {
    const topics = [
        { id: 'bom', area: 'Cirurgia Geral', incidence: 50 },
        { id: 'ruim', area: 'Pediatria', incidence: 50 },
    ];
    const results = [
        { area: 'Cirurgia Geral', correct: true }, { area: 'Cirurgia Geral', correct: true },
        { area: 'Pediatria', correct: false }, { area: 'Pediatria', correct: false }, { area: 'Pediatria', correct: false },
    ];
    const ranked = calculatePathPriority({ topics, results });
    assert.equal(ranked[0].id, 'ruim');
});

test('completedThemeIds exclui temas já concluídos do resultado', () => {
    const topics = [{ id: 'a', area: 'X', incidence: 10 }, { id: 'b', area: 'Y', incidence: 90 }];
    const ranked = calculatePathPriority({ topics, results: [], completedThemeIds: ['b'] });
    assert.equal(ranked.length, 1);
    assert.equal(ranked[0].id, 'a');
});

test('casa por themeId quando presente, senão por area', () => {
    const topics = [{ id: 'theme-1', area: 'Clínica Médica', incidence: 20 }];
    const results = [{ themeId: 'theme-1', correct: false }, { themeId: 'theme-1', correct: false }];
    const [top] = calculatePathPriority({ topics, results });
    assert.equal(top.accuracy, 0);
});
