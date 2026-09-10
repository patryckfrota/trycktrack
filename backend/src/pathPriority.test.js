import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePathPriority } from './pathPriority.js';

test('erros relevantes puxam o tema para frente, sem ignorar incidência', () => {
  const ordered = calculatePathPriority({
    topics: [
      { id: 'cardio', area: 'Clínica Médica', incidence: 90 },
      { id: 'pedi', area: 'Pediatria', incidence: 70 }
    ],
    results: [
      { themeId: 'cardio', correct: true },
      { themeId: 'cardio', correct: true },
      { themeId: 'pedi', correct: false },
      { themeId: 'pedi', correct: false }
    ]
  });
  assert.equal(ordered[0].id, 'pedi');
  assert.equal(ordered[1].id, 'cardio');
});
