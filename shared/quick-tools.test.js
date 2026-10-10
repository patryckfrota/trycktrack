import test from 'node:test';
import assert from 'node:assert/strict';
import { gestationalAge, recommendContraception, parseDay, CONTRACEPTIVE_CONDITIONS } from './quick-tools.js';

test('DUM: 280 dias = 40s0d e DPP em +280', () => {
    const r = gestationalAge({ method: 'dum', dum: '2026-01-01', ref: '2026-10-08' });
    assert.equal(r.weeks, 40);
    assert.equal(r.days, 0);
    assert.equal(r.term, 'Termo completo');
    assert.equal(r.daysToDpp, 0);
});

test('DUM: 100 dias = 14s2d, 2º trimestre', () => {
    const r = gestationalAge({ method: 'dum', dum: '2026-01-01', ref: '2026-04-11' });
    assert.deepEqual([r.weeks, r.days, r.trimester], [14, 2, 2]);
});

test('ultrassom: 8s3d em 01/03 → 10s3d em 15/03; DPP = ref + 280 - dias', () => {
    const r = gestationalAge({ method: 'us', usDate: '2026-03-01', usWeeks: 8, usDays: 3, ref: '2026-03-15' });
    assert.deepEqual([r.weeks, r.days], [10, 3]);
    assert.equal(r.dpp, parseDay('2026-03-15') + (280 - 73) * 86400000);
});

test('rejeita data futura, data inválida e IG absurda', () => {
    assert.ok(gestationalAge({ method: 'dum', dum: '2026-05-01', ref: '2026-04-01' }).error);
    assert.ok(gestationalAge({ method: 'dum', dum: '2026-02-31', ref: '2026-04-01' }).error);
    assert.ok(gestationalAge({ method: 'dum', dum: '2024-01-01', ref: '2026-04-01' }).error);
    assert.ok(gestationalAge({ method: 'us', usDate: '2026-03-01', usWeeks: 8, usDays: 7, ref: '2026-03-15' }).error);
});

test('contracepção sem condições: tudo categoria 1, implante primeiro', () => {
    const r = recommendContraception([]);
    assert.ok(r.every(m => m.category === 1));
    assert.equal(r[0].id, 'imp');
});

test('enxaqueca com aura: combinado = 4 e vai para o fim', () => {
    const r = recommendContraception(['migA']);
    const last = r[r.length - 1];
    assert.equal(last.id, 'chc');
    assert.equal(last.category, 4);
    assert.deepEqual(last.drivers, ['Enxaqueca com aura']);
});

test('maior categoria entre as condições prevalece; DIP exclui DIUs', () => {
    const r = recommendContraception(['obesity', 'pid']);
    const by = Object.fromEntries(r.map(m => [m.id, m.category]));
    assert.equal(by.chc, 2);
    assert.equal(by.cu, 4);
    assert.equal(by.lng, 4);
});

test('preferência "sem hormônio" põe o DIU de cobre antes dos hormonais da mesma categoria', () => {
    const r = recommendContraception([], { noHormone: true });
    assert.equal(r[0].id, 'cu');
});

test('toda condição tem 6 categorias entre 1 e 4', () => {
    for (const c of CONTRACEPTIVE_CONDITIONS) {
        assert.equal(c.cats.length, 6, c.id);
        assert.ok(c.cats.every(n => n >= 1 && n <= 4), c.id);
    }
});
