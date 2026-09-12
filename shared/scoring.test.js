import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isQuestionAnswerCorrect, matchPatientResponse, osceChatWords } from './scoring.js';

test('isQuestionAnswerCorrect: discursiva não pontua (null), não conta como erro', () => {
    const discursiva = { questionType: 'discursive', answer: null };
    assert.equal(isQuestionAnswerCorrect(discursiva, 'discursive'), null);
});

test('isQuestionAnswerCorrect: questão anulada é sempre correta, qualquer resposta', () => {
    const anulada = { annulled: true, answer: 'B' };
    assert.equal(isQuestionAnswerCorrect(anulada, 'A'), true);
});

test('isQuestionAnswerCorrect: alternativa certa e errada', () => {
    const questao = { answer: 'C' };
    assert.equal(isQuestionAnswerCorrect(questao, 'C'), true);
    assert.equal(isQuestionAnswerCorrect(questao, 'D'), false);
});

test('isQuestionAnswerCorrect: questão nula não quebra e não conta como correta', () => {
    assert.equal(isQuestionAnswerCorrect(null, 'A'), false);
});

test('matchPatientResponse: casa pergunta curta com >=2 palavras em comum', () => {
    const responses = [
        { trigger: 'Pergunta sobre falta de ar aos esforços', response: 'Sim, sinto falta de ar ao subir escadas.' },
        { trigger: 'Pergunta sobre uso de medicações contínuas', response: 'Uso losartana.' },
    ];
    const match = matchPatientResponse(responses, 'Você sente falta de ar?');
    assert.equal(match?.response, 'Sim, sinto falta de ar ao subir escadas.');
});

test('matchPatientResponse: uma palavra só casa se for específica (>=4 letras)', () => {
    const responses = [{ trigger: 'Pergunta sobre falta de ar (dispneia)', response: 'Sim, sinto falta de ar aos esforços.' }];
    assert.equal(matchPatientResponse(responses, 'dispneia?')?.response, 'Sim, sinto falta de ar aos esforços.');
    // uma palavra genérica curta sozinha não deve casar
    assert.equal(matchPatientResponse(responses, 'e?'), null);
});

test('matchPatientResponse: nenhum trigger parecido devolve null', () => {
    const responses = [{ trigger: 'Pergunta sobre histórico familiar de câncer', response: 'Não há casos na família.' }];
    assert.equal(matchPatientResponse(responses, 'Você fuma?'), null);
});

test('osceChatWords: remove stopwords e acentuação', () => {
    assert.deepEqual(osceChatWords('Você tem dor de cabeça?'), ['dor', 'cabeca']);
});
