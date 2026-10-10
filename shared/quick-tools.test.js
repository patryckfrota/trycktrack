import test from 'node:test';
import assert from 'node:assert/strict';
import { gestationalMilestones, gestationalAge, parseDay } from './quick-tools.js';

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

test('marcos: 20s cai em start+140 dias e só um é "next"', () => {
    const r = gestationalAge({ method: 'dum', dum: '2026-01-01', ref: '2026-04-11' }); // 14s2d
    const m = gestationalMilestones(r.start, '2026-04-11');
    assert.equal(r.start, parseDay('2026-01-01'));
    assert.equal(m.find(x => x.week === 20).date, parseDay('2026-01-01') + 140 * 86400000);
    assert.deepEqual(m.map(x => x.status), ['past', 'next', 'later', 'later', 'later', 'later', 'later']);
});
