/**
 * Camada de TRIAGEM: quais perguntas precisam ser respondidas para o
 * resultado ter bom grau de certeza.
 *
 * Critério (derivado da própria tabela da OMS, MEC 2025): uma pergunta é
 * DECISIVA para um método quando alguma opção dela leva esse método à
 * categoria 3, 4 ou "não se aplica" (início ou continuação). Se a paciente
 * não foi perguntada sobre uma condição decisiva, a categoria mostrada pode
 * estar subestimada. As 36 perguntas decisivas foram agrupadas em 16 itens
 * de triagem, no formato de uma anamnese ("Fuma?", "Tem hipertensão?").
 *
 * Um item está RESPONDIDO quando a resposta é "Não" (nada se aplica) ou
 * "Sim" com ao menos uma opção marcada. Um método está CONFIRMADO quando
 * todos os itens que podem restringi-lo estão respondidos. Condições raras
 * fora dos 16 itens (por exemplo, obesidade, dislipidemia) só mudam a
 * categoria para 2 e continuam disponíveis no perfil.
 */
import { SECTIONS, METHOD_IDS, METHOD_LIST, METHODS } from './contraception-data.js';
import { resolveCell } from './contraception-engine.js';

export const SCREENING = [
    { id: 'age', title: 'Idade', prompt: 'Qual é a idade da paciente?', kind: 'choice', members: ['age'], why: 'A idade muda a categoria dos combinados (a partir de 40 anos), do injetável trimestral (menores de 18 e maiores de 45) e dos DIUs (menores de 20), e define como ler tabagismo e enxaqueca.' },
    { id: 'pregnancy', title: 'Gravidez', prompt: 'Há gravidez suspeita ou confirmada?', noLabel: 'Descartada', yesLabel: 'Suspeita ou confirmada', members: ['pregnancy'], why: 'Nenhum método deve ser iniciado sem descartar gravidez; o DIU é categoria 4 nela.' },
    { id: 'postpartum', title: 'Pós-parto, amamentação e aborto', prompt: 'Está no pós-parto, amamentando ou teve aborto recente?', members: ['postpartum', 'ppiud', 'abortion'], why: 'Os combinados são desaconselhados ou contraindicados no pós-parto, e o DIU depende do tempo desde o parto ou aborto.' },
    { id: 'smoking', title: 'Tabagismo', prompt: 'Fuma?', members: ['smoking'], why: 'A partir de 35 anos, o tabagismo restringe os combinados (categorias 3 e 4); o aplicativo usa a idade já informada.' },
    { id: 'htn', title: 'Pressão alta', prompt: 'Tem hipertensão ou pressão elevada?', members: ['htn'], why: 'Restringe os combinados e, em níveis mais altos, o injetável trimestral.' },
    { id: 'headache', title: 'Enxaqueca', prompt: 'Tem enxaqueca ou outra cefaleia?', members: ['headache'], why: 'Enxaqueca com aura contraindica os combinados (categoria 4); sem aura, a categoria sobe a partir de 35 anos, e o aplicativo usa a idade já informada.' },
    { id: 'thrombosis', title: 'Trombose', prompt: 'Já teve trombose ou tem risco para trombose (mutação, cirurgia recente)?', members: ['vte', 'thrombogenic', 'surgery'], why: 'TVP/TEP e trombofilia contraindicam os combinados e restringem os progestagênios.' },
    { id: 'cardio', title: 'Coração e vasos', prompt: 'Tem doença do coração, AVC, valvopatia ou vários fatores de risco cardiovascular?', members: ['ihd', 'stroke', 'valvular', 'cvRisk'], why: 'Doença isquêmica e AVC restringem quase todos os hormonais.' },
    { id: 'diabetes', title: 'Diabetes', prompt: 'Tem diabetes?', members: ['diabetes'], why: 'Com lesão de órgão-alvo ou doença vascular, restringe os combinados e o injetável trimestral.' },
    { id: 'breast', title: 'Câncer de mama', prompt: 'Tem ou já teve câncer de mama, ou nódulo mamário?', members: ['breast'], why: 'Câncer de mama atual contraindica todos os hormonais (categoria 4).' },
    { id: 'liver', title: 'Fígado e vesícula', prompt: 'Tem doença do fígado ou da vesícula, ou hepatite?', members: ['cirrhosis', 'liverTumor', 'hepatitis', 'gallbladder', 'cholestasis'], why: 'Cirrose descompensada e tumores hepáticos restringem os hormonais.' },
    { id: 'lupus', title: 'Lúpus', prompt: 'Tem lúpus?', members: ['sle'], why: 'Com antifosfolípide positivo, restringe os combinados e os progestagênios.' },
    { id: 'bleeding', title: 'Sangramento sem explicação', prompt: 'Tem sangramento vaginal sem explicação?', members: ['unexplainedBleeding'], why: 'Antes de avaliar, o DIU é categoria 4 para iniciar e o implante e o injetável trimestral, categoria 3.' },
    { id: 'drugs', title: 'Medicamentos', prompt: 'Usa anticonvulsivante, rifampicina/rifabutina ou antirretroviral?', members: ['anticonvulsant', 'antimicrobial', 'art'], why: 'Indutores enzimáticos reduzem a eficácia de vários hormonais; o efavirenz também.' },
    { id: 'pelvic', title: 'Infecção pélvica', prompt: 'Tem ou teve IST, DIP ou tuberculose pélvica?', members: ['sti', 'pid', 'tb'], why: 'Cervicite, clamídia, gonorreia e DIP atuais contraindicam a inserção do DIU.' },
    { id: 'uterus', title: 'Útero e colo', prompt: 'Tem alteração do útero ou do colo, mioma ou câncer ginecológico?', members: ['anatomy', 'fibroids', 'cervicalCancer', 'endometrialCancer', 'ovarianCancer', 'gtd'], why: 'Distorção da cavidade uterina e cânceres ginecológicos restringem o DIU.' },
    { id: 'hiv', title: 'HIV', prompt: 'Vive com HIV ou tem alto risco de HIV?', members: ['hiv'], why: 'No HIV avançado, o DIU é categoria 3 na inserção.' }
];

const ITEM_OF = new Map();
SCREENING.forEach(item => item.members.forEach(q => ITEM_OF.set(q, item.id)));
export function itemOfQuestion(questionId) { return ITEM_OF.get(questionId) || null; }
export function screeningItem(id) { return SCREENING.find(i => i.id === id); }

// Perguntas decisivas por coluna da tabela: alguma opção chega a 3, 4 ou NA.
function decisiveByColumn() {
    const out = METHOD_IDS.map(() => new Set());
    for (const s of SECTIONS) for (const q of s.questions) for (const o of q.options) {
        for (const cats of [o.cats, ...Object.values(o.byAge || {})]) cats.forEach((cell, col) => {
            for (const phase of ['start', 'continue']) {
                const r = resolveCell(cell, phase);
                if (r && (r.na || r.max >= 3)) out[col].add(q.id);
            }
        });
    }
    return out;
}
const DECISIVE = decisiveByColumn();

/** Itens de triagem que podem restringir o método (pelos cartões da tabela). */
export function requiredItems(methodId) {
    const col = METHOD_IDS.indexOf(METHODS[methodId]?.column);
    if (col < 0) return [];
    // a idade é sempre exigida: muda categorias de vários métodos e a leitura de tabagismo e enxaqueca
    return SCREENING.filter(item => item.id === 'age' || item.members.some(q => DECISIVE[col].has(q))).map(i => i.id);
}

/**
 * screen = { [itemId]: 'no' | 'yes' };  answers = respostas do perfil.
 * Item respondido: "no", ou "yes" com ao menos uma opção marcada.
 */
export function itemDone(item, screen = {}, answers = {}) {
    if (item.kind === 'choice') return item.members.some(q => (answers[q] || []).length > 0);
    const v = screen[item.id];
    if (v === 'no') return true;
    return v === 'yes' && item.members.some(q => (answers[q] || []).length > 0);
}

export function screeningProgress(screen = {}, answers = {}) {
    const done = SCREENING.filter(i => itemDone(i, screen, answers));
    return { done: done.length, total: SCREENING.length, doneIds: done.map(i => i.id), pending: SCREENING.filter(i => !done.includes(i)).map(i => i.id) };
}

/** Certeza do resultado de cada método do núcleo: confirmado quando nada obrigatório falta. */
export function certainty(screen = {}, answers = {}) {
    const out = {};
    for (const id of METHOD_LIST) {
        const required = requiredItems(id);
        const missing = required.filter(itemId => !itemDone(screeningItem(itemId), screen, answers));
        out[id] = { required, missing, confirmed: missing.length === 0 };
    }
    return out;
}
