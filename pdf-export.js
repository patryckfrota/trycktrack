/* ==========================================================================
   TRYCKTRACK — geração de PDF real (texto vetorial, não "imprimir a tela")
   Usa pdf-lib + fontkit (vendor/) para desenhar o PDF diretamente em bytes,
   contornando as limitações do window.print() no iOS (cabeçalho/rodapé do
   sistema, paginação inconsistente). Layout mobile: margens estreitas e
   simétricas, coluna única em ambos os documentos.
     - buildQuestionsPdf(): caderno de questões, fluxo contínuo.
     - buildRapidReviewPdf(): apostila de revisão rápida, fluxo contínuo.
   ========================================================================== */
(function (global) {
    'use strict';

    const { PDFDocument, rgb } = PDFLib;

    /* ---------- unidades e geometria (margens mobile, um pouco mais folgadas) ---------- */
    const MM = 2.834645669;
    const mm = v => v * MM;
    const PAGE_W = mm(210);
    const PAGE_H = mm(297);
    const SIDE_MARGIN = mm(12);
    const HEADER_LOGO_SIZE = mm(20);
    const WORDMARK_SIZE = 32;

    /* Distâncias medidas do TOPO da página para baixo (mais intuitivo para
       compor o cabeçalho); convertidas para y-de-baixo-para-cima do pdf-lib
       só na hora de desenhar (PAGE_H - distância). Cabeçalho = só a logo e
       a palavra "trycktrack", nada mais, alinhados na mesma linha. */
    const HEADER_BOX_TOP = mm(14);
    const HEADER_BOX_HEIGHT = mm(24);
    const HEADER_BOX_BOTTOM = HEADER_BOX_TOP + HEADER_BOX_HEIGHT;
    const CONTENT_TOP_FIRST = HEADER_BOX_BOTTOM + mm(6);
    const CONTENT_TOP_OTHER = mm(14);

    /* ---------- paleta (mesma da versão HTML/CSS) ---------- */
    const COLOR = {
        brand: rgb(0x67 / 255, 0x47 / 255, 0xbd / 255),
        divider: rgb(0x4b / 255, 0x2e / 255, 0x8f / 255),
        footerLine: rgb(0x8b / 255, 0x6b / 255, 0xe0 / 255),
        text: rgb(0x20 / 255, 0x20 / 255, 0x27 / 255),
        secondary: rgb(0x5d / 255, 0x59 / 255, 0x65 / 255),
        muted: rgb(0x68 / 255, 0x63 / 255, 0x6f / 255),
        tableBorder: rgb(0xcf / 255, 0xcb / 255, 0xd6 / 255),
        tableHeadBg: rgb(0xf0 / 255, 0xeb / 255, 0xf7 / 255),
        tableHeadText: rgb(0x33 / 255, 0x24 / 255, 0x5a / 255),
        calloutBg: rgb(0xf7 / 255, 0xf5 / 255, 0xfa / 255),
        calloutBar: rgb(0x8b / 255, 0x6b / 255, 0xe0 / 255),
        explainBg: rgb(0xf9 / 255, 0xf7 / 255, 0xfd / 255),
    };

    /* ---------- carregamento de fontes/logo (cache em memória) ---------- */
    let fontBytesCache = null;
    async function fetchFontBytes() {
        if (fontBytesCache) return fontBytesCache;
        const [regular, medium, semibold, bold] = await Promise.all([
            fetch('vendor/fonts/Inter-Regular.ttf').then(r => r.arrayBuffer()),
            fetch('vendor/fonts/Inter-Medium.ttf').then(r => r.arrayBuffer()),
            fetch('vendor/fonts/Inter-SemiBold.ttf').then(r => r.arrayBuffer()),
            fetch('vendor/fonts/Inter-Bold.ttf').then(r => r.arrayBuffer()),
        ]);
        fontBytesCache = { regular, medium, semibold, bold };
        return fontBytesCache;
    }

    let logoBytesCache = null;
    async function fetchLogoBytes() {
        if (logoBytesCache) return logoBytesCache;
        logoBytesCache = await fetch('icon-180-transparent.png').then(r => r.arrayBuffer());
        return logoBytesCache;
    }

    async function embedFonts(pdfDoc) {
        pdfDoc.registerFontkit(fontkit);
        const bytes = await fetchFontBytes();
        const [regular, medium, semibold, bold] = await Promise.all([
            pdfDoc.embedFont(bytes.regular, { subset: true }),
            pdfDoc.embedFont(bytes.medium, { subset: true }),
            pdfDoc.embedFont(bytes.semibold, { subset: true }),
            pdfDoc.embedFont(bytes.bold, { subset: true }),
        ]);
        return { regular, medium, semibold, bold };
    }

    /* ---------- utilitários de texto: quebra de linha com "runs" ---------- */
    // Um "run" é um pedaço de texto com um estilo (peso) só. Um parágrafo é
    // uma lista de runs. wrapRuns quebra em linhas respeitando maxWidth,
    // preservando o estilo de cada palavra. Sempre alinhado à esquerda —
    // sem justificação, para não abrir espaços irregulares entre palavras.
    function splitWords(text) {
        return text.split(/(\s+)/).filter(s => s !== '');
    }

    function wrapRuns(runs, fonts, size, maxWidth) {
        const lines = [];
        let current = [];
        let currentWidth = 0;

        const pushLine = () => {
            while (current.length && /^\s+$/.test(current[current.length - 1].text)) {
                currentWidth -= current.pop().width;
            }
            lines.push(current);
            current = [];
            currentWidth = 0;
        };

        for (const run of runs) {
            const font = fonts[run.weight || 'regular'];
            const words = splitWords(run.text);
            for (const word of words) {
                const width = font.widthOfTextAtSize(word, size);
                const isSpace = /^\s+$/.test(word);
                if (!isSpace && currentWidth + width > maxWidth && current.length) {
                    pushLine();
                }
                current.push({ text: word, font, width, color: run.color || COLOR.text, size });
                currentWidth += width;
            }
        }
        if (current.length) pushLine();
        return lines;
    }

    // Desenha uma linha já quebrada, esticando os espaços para justificar
    // (preenchendo exatamente targetWidth) — exceto a última linha de cada
    // bloco, que segue a convenção tipográfica padrão e fica à esquerda.
    function drawLine(page, line, x, y, targetWidth, justify) {
        if (justify) {
            const spaceIdx = [];
            line.forEach((r, i) => { if (/^\s+$/.test(r.text)) spaceIdx.push(i); });
            const natural = line.reduce((s, r) => s + r.width, 0);
            const extra = targetWidth - natural;
            if (spaceIdx.length && extra > 0.01) {
                const add = extra / spaceIdx.length;
                let rx = x;
                line.forEach((run, i) => {
                    if (run.text && !/^\s+$/.test(run.text)) {
                        page.drawText(run.text, { x: rx, y, size: run.size, font: run.font, color: run.color });
                    }
                    rx += run.width + (spaceIdx.includes(i) ? add : 0);
                });
                return;
            }
        }
        let rx = x;
        line.forEach(run => {
            if (!run.text) return;
            page.drawText(run.text, { x: rx, y, size: run.size, font: run.font, color: run.color });
            rx += run.width;
        });
    }

    /* ---------- construtor de páginas com fluxo/paginação em coluna única ---------- */
    class Flow {
        constructor(pdfDoc, fonts, opts) {
            this.pdfDoc = pdfDoc;
            this.fonts = fonts;
            this.title = opts.title;
            this.contentBottom = opts.contentBottom;
            this.footerTextY = opts.footerTextY;
            this.footerLineY = opts.footerLineY;
            this.pages = [];
            this.page = null;
            this.y = 0;
            this.cursorY = 0;
            this.contentLeft = SIDE_MARGIN;
            this.contentRight = PAGE_W - SIDE_MARGIN;
            this.contentWidth = this.contentRight - this.contentLeft;
            this.logoImage = null;
        }

        async init() {
            this.logoImage = await this.pdfDoc.embedPng(await fetchLogoBytes());
            this.newPage(true);
        }

        newPage(includeHeader) {
            const page = this.pdfDoc.addPage([PAGE_W, PAGE_H]);
            this.pages.push(page);
            this.page = page;
            if (includeHeader) this.drawHeader();
            this.y = includeHeader ? PAGE_H - CONTENT_TOP_FIRST : PAGE_H - CONTENT_TOP_OTHER;
            this.cursorY = this.y;
            this.drawFooterSkeleton();
        }

        spaceLeft() { return this.cursorY - this.contentBottom; }

        ensure(height) {
            if (height <= this.spaceLeft() || this.cursorY === this.y) return;
            this.newPage(false);
        }

        drawHeader() {
            const p = this.page;
            const logoDim = HEADER_LOGO_SIZE;
            const logoTopFromPageTop = HEADER_BOX_TOP + (HEADER_BOX_HEIGHT - logoDim) / 2;
            const logoY = PAGE_H - logoTopFromPageTop - logoDim;
            p.drawImage(this.logoImage, {
                x: this.contentLeft, y: logoY, width: logoDim, height: logoDim,
            });
            // A logo e a palavra "trycktrack" são os ÚNICOS elementos do
            // cabeçalho — sem modo/descrição — alinhadas na mesma linha
            // vertical (centro da logo = centro visual do texto).
            const textX = this.contentLeft + logoDim + mm(5);
            const capHeight = WORDMARK_SIZE * 0.727;
            const boxCenterFromTop = HEADER_BOX_TOP + HEADER_BOX_HEIGHT / 2;
            const wordmarkBaselineFromTop = boxCenterFromTop + capHeight / 2;
            p.drawText('trycktrack', {
                x: textX, y: PAGE_H - wordmarkBaselineFromTop,
                size: WORDMARK_SIZE, font: this.fonts.bold, color: COLOR.brand,
            });
            p.drawLine({
                start: { x: this.contentLeft, y: PAGE_H - HEADER_BOX_BOTTOM },
                end: { x: this.contentRight, y: PAGE_H - HEADER_BOX_BOTTOM },
                thickness: 0.5, color: COLOR.tableBorder,
            });
        }

        drawFooterSkeleton() {
            const p = this.page;
            p.drawLine({
                start: { x: this.contentLeft, y: this.footerLineY },
                end: { x: this.contentRight, y: this.footerLineY },
                thickness: 0.85, color: COLOR.footerLine,
            });
            p.drawText(`trycktrack · ${this.title}`, {
                x: this.contentLeft, y: this.footerTextY, size: 7.5,
                font: this.fonts.regular, color: COLOR.muted,
            });
        }

        finalizePageNumbers() {
            this.pages.forEach((p, i) => {
                const label = String(i + 1);
                const font = this.fonts.medium;
                const size = 7.5;
                const w = font.widthOfTextAtSize(label, size);
                p.drawText(label, {
                    x: this.contentRight - w, y: this.footerTextY, size,
                    font, color: COLOR.text,
                });
            });
        }

        drawParagraphRuns(runs, size, { color, indent = 0, lineHeightMul = 1.42, gapAfter = mm(3), justify = true } = {}) {
            const maxWidth = this.contentWidth - indent;
            const lines = wrapRuns(runs, this.fonts, size, maxWidth);
            const lineHeight = size * lineHeightMul;
            lines.forEach((line, li) => {
                this.ensure(lineHeight);
                this.cursorY -= lineHeight;
                if (color) line.forEach(run => { run.color = color; });
                drawLine(this.page, line, this.contentLeft + indent, this.cursorY, maxWidth, justify && li < lines.length - 1);
            });
            this.cursorY -= gapAfter;
        }
    }

    /* ==========================================================================
       CADERNO DE QUESTÕES — coluna única, largura total, fluxo livre
       ========================================================================== */

    const Q_CONTENT_BOTTOM = mm(18);
    const Q_FOOTER_LINE_Y = mm(14);
    const Q_FOOTER_TEXT_Y = mm(9);
    const Q_BLANK_LINE = mm(6); // "pelo menos uma linha inteira" de respiro entre questões

    function questionFragmentsAsRuns(question, index, includeAnswer) {
        const frags = [];
        const numberText = `QUESTÃO ${String(index + 1).padStart(2, '0')}${question.source ? ' · ' + question.source.toUpperCase() : ''}`;
        frags.push({
            kind: 'number',
            runs: [{ text: numberText, weight: 'bold', color: COLOR.brand }],
            size: 8,
        });
        frags.push({
            kind: 'stem',
            runs: [{ text: question.stem || '', weight: 'regular' }],
            size: 9.6,
        });

        if (question.questionType === 'discursive') {
            frags.push({
                kind: 'note',
                runs: [{ text: 'Questão discursiva — responda no espaço de sua preferência.', weight: 'regular' }],
                size: 9,
            });
        } else {
            Object.entries(question.options || {}).forEach(([letter, text]) => {
                frags.push({
                    kind: 'option',
                    label: `${letter})`,
                    runs: [{ text: text || '', weight: 'regular' }],
                    size: 8.9,
                });
            });
        }

        if (includeAnswer && question.answer) {
            const runs = [{ text: `Gabarito: ${question.answer}`, weight: 'bold' }];
            if (question.explanation) runs.push({ text: ` — ${question.explanation}`, weight: 'regular' });
            frags.push({ kind: 'answer', runs, size: 8.6 });
        }

        return frags;
    }

    function measureFragment(frag, fonts, maxWidth) {
        const indent = frag.kind === 'option' ? mm(6) : 0;
        const lines = wrapRuns(frag.runs, fonts, frag.size, maxWidth - indent);
        const lineHeight = frag.size * 1.32;
        return { lines, indent, lineHeight, height: lines.length * lineHeight };
    }

    // Desenha um único fragmento (já medido) na largura útil do fluxo.
    function drawQuestionFragment(flow, fonts, maxWidth, frag, measured) {
        const x = flow.contentLeft + measured.indent;
        const lineTargetWidth = maxWidth - measured.indent;
        let ty = flow.cursorY;
        measured.lines.forEach((line, li) => {
            ty -= measured.lineHeight;
            if (li === 0 && frag.kind === 'option') {
                flow.page.drawText(frag.label, {
                    x: flow.contentLeft, y: ty, size: frag.size, font: fonts.bold, color: COLOR.text,
                });
            }
            const isLast = li === measured.lines.length - 1;
            drawLine(flow.page, line, x, ty, lineTargetWidth, !isLast);
        });
        flow.cursorY -= measured.height + mm(1.3);
    }

    // Desenha todos os fragmentos de UMA questão (cabeçalho+enunciado sempre
    // junto do primeiro bloco, para não deixar o cabeçalho "órfão").
    function drawQuestionFragments(flow, fonts, maxWidth, frags) {
        const measuredHead = measureFragment(frags[0], fonts, maxWidth);
        const measuredFirst = frags[1] ? measureFragment(frags[1], fonts, maxWidth) : null;
        const comboHeight = measuredHead.height + mm(1.3) + (measuredFirst ? measuredFirst.height : 0);

        if (comboHeight > flow.spaceLeft() && flow.cursorY !== flow.y) {
            flow.newPage(false);
        }
        drawQuestionFragment(flow, fonts, maxWidth, frags[0], measuredHead);
        let i = 1;
        if (frags[1]) {
            drawQuestionFragment(flow, fonts, maxWidth, frags[1], measuredFirst);
            i = 2;
        }
        for (; i < frags.length; i += 1) {
            const m = measureFragment(frags[i], fonts, maxWidth);
            if (m.height > flow.spaceLeft() && flow.cursorY !== flow.y) {
                flow.newPage(false);
            }
            drawQuestionFragment(flow, fonts, maxWidth, frags[i], m);
        }
    }

    // Caixa lavanda clara para gabarito/explicação — usada tanto no modo
    // Guiado (uma por questão, logo em seguida dela) quanto no bloco final
    // do Simulado (uma sequência delas, após o quadro de respostas).
    // O texto de explicação, na base, já começa repetindo "Resposta correta
    // — X." — redundante com o "Gabarito: X" que já desenhamos antes dele.
    function stripRedundantAnswerPrefix(explanation, answer) {
        if (!explanation) return explanation;
        const pattern = answer
            ? new RegExp(`^\\s*Resposta correta\\s*[—-]\\s*${answer}\\.\\s*`, 'i')
            : /^\s*Resposta correta\s*[—-]\s*[A-Z]\.\s*/;
        return explanation.replace(pattern, '');
    }

    function drawExplanationBox(flow, fonts, maxWidth, { label, answer, explanation }) {
        if (!answer && !explanation) return;
        explanation = stripRedundantAnswerPrefix(explanation, answer);
        const pad = mm(3.5);
        const size = 8.8;
        const innerWidth = maxWidth - pad * 2;
        const runs = [];
        if (label) runs.push({ text: `${label} `, weight: 'bold', color: COLOR.brand });
        if (answer) runs.push({ text: `Gabarito: ${answer}`, weight: 'bold', color: COLOR.brand });
        if (explanation) runs.push({ text: `${answer ? ' — ' : ''}${explanation}`, weight: 'regular', color: COLOR.text });
        const lines = wrapRuns(runs, fonts, size, innerWidth);
        const lineHeight = size * 1.42;
        const boxHeight = lines.length * lineHeight + pad * 2;
        flow.ensure(boxHeight);
        const boxTop = flow.cursorY;
        const boxBottom = boxTop - boxHeight;
        flow.page.drawRectangle({ x: flow.contentLeft, y: boxBottom, width: maxWidth, height: boxHeight, color: COLOR.explainBg });
        let ty = boxTop - pad - lineHeight * 0.78;
        lines.forEach((line, li) => {
            const isLast = li === lines.length - 1;
            drawLine(flow.page, line, flow.contentLeft + pad, ty, innerWidth, !isLast);
            ty -= lineHeight;
        });
        flow.cursorY = boxBottom - mm(4);
    }

    async function buildQuestionsPdf({ questions, title, includeAnswer }) {
        const pdfDoc = await PDFDocument.create();
        const fonts = await embedFonts(pdfDoc);
        const flow = new Flow(pdfDoc, fonts, {
            title, contentBottom: Q_CONTENT_BOTTOM, footerLineY: Q_FOOTER_LINE_Y, footerTextY: Q_FOOTER_TEXT_Y,
        });
        await flow.init();

        const maxWidth = flow.contentWidth;

        for (let index = 0; index < questions.length; index += 1) {
            const frags = questionFragmentsAsRuns(questions[index], index, includeAnswer);
            // espaço em branco de uma linha inteira antes de cada nova questão
            // (a primeira, no topo da página, não precisa desse respiro extra)
            if (index > 0 && flow.cursorY !== flow.y) flow.cursorY -= Q_BLANK_LINE;
            drawQuestionFragments(flow, fonts, maxWidth, frags);
        }

        flow.finalizePageNumbers();
        return pdfDoc.save();
    }

    /* ==========================================================================
       RESULTADO DE SESSÃO — Guiado (questão + explicação intercaladas) ou
       Simulado (todas as questões, depois gabarito resumido, depois todas
       as explicações em sequência)
       ========================================================================== */

    async function buildQuestionsResultPdf({ questions, answers, mode, title }) {
        const pdfDoc = await PDFDocument.create();
        const fonts = await embedFonts(pdfDoc);
        const flow = new Flow(pdfDoc, fonts, {
            title, contentBottom: Q_CONTENT_BOTTOM, footerLineY: Q_FOOTER_LINE_Y, footerTextY: Q_FOOTER_TEXT_Y,
        });
        await flow.init();
        const maxWidth = flow.contentWidth;
        const isGuided = mode !== 'exam';

        if (isGuided) {
            // Guiado: questão, explicação, questão, explicação...
            for (let index = 0; index < questions.length; index += 1) {
                const question = questions[index];
                if (index > 0 && flow.cursorY !== flow.y) flow.cursorY -= Q_BLANK_LINE;
                const frags = questionFragmentsAsRuns(question, index, false);
                drawQuestionFragments(flow, fonts, maxWidth, frags);
                drawExplanationBox(flow, fonts, maxWidth, { answer: question.answer, explanation: question.explanation });
            }
        } else {
            // Simulado: todas as questões primeiro...
            for (let index = 0; index < questions.length; index += 1) {
                if (index > 0 && flow.cursorY !== flow.y) flow.cursorY -= Q_BLANK_LINE;
                const frags = questionFragmentsAsRuns(questions[index], index, false);
                drawQuestionFragments(flow, fonts, maxWidth, frags);
            }

            // ...depois o quadro-resumo com as respostas, na ordem em que
            // foram respondidas...
            flow.cursorY -= Q_BLANK_LINE;
            flow.ensure(20);
            flow.drawParagraphRuns([{ text: 'GABARITO', weight: 'bold', color: COLOR.divider }], 11, { gapAfter: mm(2), justify: false });
            const answerRuns = questions.map((q, i) => ({ text: `${i + 1} - ${answers[i] || '—'}${i < questions.length - 1 ? ',  ' : ''}`, weight: 'semibold' }));

            const pad = mm(3.5);
            const size = 9;
            const innerWidth = maxWidth - pad * 2;
            const lines = wrapRuns(answerRuns, fonts, size, innerWidth);
            const lineHeight = size * 1.5;
            const boxHeight = lines.length * lineHeight + pad * 2;
            flow.ensure(boxHeight);
            const boxTop = flow.cursorY;
            const boxBottom = boxTop - boxHeight;
            flow.page.drawRectangle({ x: flow.contentLeft, y: boxBottom, width: maxWidth, height: boxHeight, color: COLOR.explainBg });
            let ty = boxTop - pad - lineHeight * 0.78;
            lines.forEach(line => {
                drawLine(flow.page, line, flow.contentLeft + pad, ty, innerWidth, false);
                ty -= lineHeight;
            });
            flow.cursorY = boxBottom - mm(6);

            // ...depois todas as explicações, uma em seguida da outra.
            flow.ensure(20);
            flow.drawParagraphRuns([{ text: 'EXPLICAÇÕES', weight: 'bold', color: COLOR.divider }], 11, { gapAfter: mm(2), justify: false });
            questions.forEach((question, index) => {
                if (!question.answer && !question.explanation) return;
                drawExplanationBox(flow, fonts, maxWidth, {
                    label: `Questão ${String(index + 1).padStart(2, '0')} ·`,
                    answer: question.answer,
                    explanation: question.explanation,
                });
            });
        }

        flow.finalizePageNumbers();
        return pdfDoc.save();
    }

    /* ==========================================================================
       RAPID REVIEW — 1 coluna contínua, quebra de página só em nova "Parte"
       ========================================================================== */

    const RR_CONTENT_BOTTOM = mm(20); // respiro extra no rodapé
    const RR_FOOTER_LINE_Y = mm(15);
    const RR_FOOTER_TEXT_Y = mm(10);

    function resolveUrl(src) {
        try { return new URL(src, document.baseURI).href; } catch (e) { return src; }
    }

    const imageCache = new Map();
    async function embedImageFromUrl(pdfDoc, src) {
        const url = resolveUrl(src);
        if (imageCache.has(url)) return imageCache.get(url);
        const promise = (async () => {
            const res = await fetch(url);
            const bytes = await res.arrayBuffer();
            const isPng = /\.png(\?|$)/i.test(url) || (res.headers.get('content-type') || '').includes('png');
            try {
                return isPng ? await pdfDoc.embedPng(bytes) : await pdfDoc.embedJpg(bytes);
            } catch (e) {
                try { return await pdfDoc.embedPng(bytes); } catch (e2) { return await pdfDoc.embedJpg(bytes); }
            }
        })();
        imageCache.set(url, promise);
        return promise;
    }

    // Converte um nó DOM (parágrafo, li, etc.) em uma lista de runs {text, weight}
    function nodeToRuns(node, weight) {
        const runs = [];
        const walk = (n, w) => {
            if (n.nodeType === Node.TEXT_NODE) {
                if (n.textContent) runs.push({ text: n.textContent, weight: w });
                return;
            }
            if (n.nodeType !== Node.ELEMENT_NODE) return;
            const tag = n.tagName.toLowerCase();
            if (tag === 'br') { runs.push({ text: '\n', weight: w }); return; }
            let nw = w;
            if (tag === 'strong' || tag === 'b') nw = 'semibold';
            if (tag === 'code') nw = 'medium';
            [...n.childNodes].forEach(c => walk(c, nw));
        };
        walk(node, weight || 'regular');
        return runs;
    }

    function parseBodyHtml(html) {
        const holder = document.createElement('div');
        holder.innerHTML = html || '';
        const blocks = [];
        [...holder.children].forEach(el => parseBlock(el, blocks));
        return blocks;
    }

    function parseBlock(el, blocks) {
        const tag = el.tagName.toLowerCase();
        if (el.classList.contains('reader-checklist-category')) {
            blocks.push({ type: 'checklistCategory', runs: nodeToRuns(el) });
        } else if (el.classList.contains('reader-checklist-item')) {
            const numEl = el.querySelector('.reader-checklist-num');
            const textEl = el.querySelector('.reader-checklist-text');
            blocks.push({
                type: 'checklistItem',
                num: numEl ? numEl.textContent.trim() : '',
                runs: textEl ? nodeToRuns(textEl) : nodeToRuns(el),
            });
        } else if (tag === 'p') {
            blocks.push({ type: 'p', runs: nodeToRuns(el) });
        } else if (tag === 'ul' || tag === 'ol') {
            const items = [...el.children].filter(c => c.tagName.toLowerCase() === 'li')
                .map(li => nodeToRuns(li));
            blocks.push({ type: 'list', ordered: tag === 'ol', items });
        } else if (tag === 'table') {
            const rows = [...el.querySelectorAll('tr')].map(tr => ({
                isHead: !!tr.closest('thead'),
                cells: [...tr.children].map(td => nodeToRuns(td)),
            }));
            blocks.push({ type: 'table', rows });
        } else if (tag === 'blockquote' || el.classList.contains('reader-callout')) {
            const runs = [];
            [...el.children].forEach(c => runs.push(...nodeToRuns(c), { text: '\n', weight: 'regular' }));
            blocks.push({ type: 'callout', runs: runs.length ? runs : nodeToRuns(el) });
        } else if (tag === 'pre') {
            blocks.push({ type: 'pre', text: el.textContent || '' });
        } else if (tag === 'figure') {
            const img = el.querySelector('img');
            const caption = el.querySelector('figcaption');
            if (img) blocks.push({ type: 'img', src: img.getAttribute('src'), caption: caption ? caption.textContent : '' });
        } else if (tag === 'img') {
            blocks.push({ type: 'img', src: el.getAttribute('src'), caption: '' });
        } else if (/^h[1-6]$/.test(tag)) {
            blocks.push({ type: 'subhead', runs: nodeToRuns(el) });
        } else if (el.classList.contains('pb') || el.classList.contains('reader-tag') || el.classList.contains('reader-chapter-tags')) {
            // ignorado na impressão, igual à versão HTML/CSS
        } else if (el.children.length) {
            [...el.children].forEach(c => parseBlock(c, blocks));
        } else if (el.textContent && el.textContent.trim()) {
            blocks.push({ type: 'p', runs: nodeToRuns(el) });
        }
    }

    async function drawRapidBlock(flow, fonts, pdfDoc, block) {
        switch (block.type) {
            case 'p':
                flow.drawParagraphRuns(block.runs, 9.4, {});
                break;
            case 'subhead':
                flow.ensure(16);
                flow.drawParagraphRuns(block.runs.map(r => ({ ...r, weight: 'semibold' })), 10.5, { gapAfter: mm(2) });
                break;
            case 'checklistCategory':
                flow.ensure(16);
                flow.drawParagraphRuns(
                    block.runs.map(r => ({ ...r, weight: 'bold', color: COLOR.brand, text: r.text.toUpperCase() })),
                    10.5, { gapAfter: mm(2), justify: false }
                );
                break;
            case 'checklistItem': {
                // número em roxo, com respiro fixo antes do texto do item
                // (a marcação original vinha colada ao texto, sem espaço).
                const indent = mm(8);
                flow.ensure(9.4 * 1.42);
                const maxWidth = flow.contentWidth - indent;
                const lines = wrapRuns(block.runs, fonts, 9.4, maxWidth);
                const lineHeight = 9.4 * 1.4;
                lines.forEach((line, li) => {
                    flow.ensure(lineHeight);
                    flow.cursorY -= lineHeight;
                    if (li === 0) {
                        flow.page.drawText(block.num || '', {
                            x: flow.contentLeft, y: flow.cursorY, size: 9.4, font: fonts.bold, color: COLOR.brand,
                        });
                    }
                    const isLast = li === lines.length - 1;
                    drawLine(flow.page, line, flow.contentLeft + indent, flow.cursorY, maxWidth, !isLast);
                });
                flow.cursorY -= mm(1.5);
                break;
            }
            case 'list': {
                let n = 1;
                for (const itemRuns of block.items) {
                    const marker = block.ordered ? `${n++}.` : '•';
                    const indent = mm(5);
                    flow.ensure(9.4 * 1.42);
                    const maxWidth = flow.contentWidth - indent;
                    const lines = wrapRuns(itemRuns, fonts, 9.4, maxWidth);
                    const lineHeight = 9.4 * 1.4;
                    lines.forEach((line, li) => {
                        flow.ensure(lineHeight);
                        flow.cursorY -= lineHeight;
                        if (li === 0) {
                            flow.page.drawText(marker, { x: flow.contentLeft, y: flow.cursorY, size: 9.4, font: fonts.semibold, color: COLOR.brand });
                        }
                        const isLast = li === lines.length - 1;
                        drawLine(flow.page, line, flow.contentLeft + indent, flow.cursorY, maxWidth, !isLast);
                    });
                    flow.cursorY -= mm(1.2);
                }
                flow.cursorY -= mm(2);
                break;
            }
            case 'callout': {
                const pad = mm(3);
                const maxWidth = flow.contentWidth - pad * 2;
                const lines = wrapRuns(block.runs, fonts, 9, maxWidth);
                const lineHeight = 9 * 1.4;
                const boxHeight = lines.length * lineHeight + pad * 2;
                flow.ensure(boxHeight);
                const boxTop = flow.cursorY;
                const boxBottom = boxTop - boxHeight;
                flow.page.drawRectangle({
                    x: flow.contentLeft, y: boxBottom, width: flow.contentWidth, height: boxHeight,
                    color: COLOR.calloutBg,
                });
                flow.page.drawRectangle({
                    x: flow.contentLeft, y: boxBottom, width: mm(1), height: boxHeight,
                    color: COLOR.calloutBar,
                });
                let ty = boxTop - pad;
                lines.forEach((line, li) => {
                    ty -= lineHeight;
                    const isLast = li === lines.length - 1;
                    drawLine(flow.page, line, flow.contentLeft + pad, ty, maxWidth, !isLast);
                });
                flow.cursorY = boxBottom - mm(3);
                break;
            }
            case 'pre': {
                const pad = mm(2.5);
                const size = 7.6;
                const rawLines = block.text.split('\n');
                const lineHeight = size * 1.35;
                const boxHeight = rawLines.length * lineHeight + pad * 2;
                flow.ensure(boxHeight);
                const boxTop = flow.cursorY;
                const boxBottom = boxTop - boxHeight;
                flow.page.drawRectangle({ x: flow.contentLeft, y: boxBottom, width: flow.contentWidth, height: boxHeight, color: COLOR.calloutBg });
                let ty = boxTop - pad;
                rawLines.forEach(l => {
                    ty -= lineHeight;
                    flow.page.drawText(l, { x: flow.contentLeft + pad, y: ty, size, font: fonts.medium, color: COLOR.text });
                });
                flow.cursorY = boxBottom - mm(3);
                break;
            }
            case 'table': {
                if (!block.rows.length) break;
                const colCount = Math.max(...block.rows.map(r => r.cells.length));
                const colWidth = flow.contentWidth / colCount; // sempre 100% da largura útil
                const cellPad = mm(3); // padding generoso, pedido no ajuste de legibilidade
                const size = 8;
                const lineHeight = size * 1.3;
                for (const row of block.rows) {
                    const cellLines = row.cells.map(runs => wrapRuns(runs, fonts, size, colWidth - cellPad * 2));
                    const rowLines = Math.max(1, ...cellLines.map(l => l.length));
                    const textBlockHeight = rowLines * lineHeight;
                    const rowHeight = textBlockHeight + cellPad * 2;
                    flow.ensure(rowHeight);
                    const rowTop = flow.cursorY;
                    const rowBottom = rowTop - rowHeight;
                    if (row.isHead) {
                        flow.page.drawRectangle({ x: flow.contentLeft, y: rowBottom, width: flow.contentWidth, height: rowHeight, color: COLOR.tableHeadBg });
                    }
                    row.cells.forEach((runs, ci) => {
                        const cx = flow.contentLeft + ci * colWidth;
                        flow.page.drawRectangle({
                            x: cx, y: rowBottom, width: colWidth, height: rowHeight,
                            borderColor: COLOR.tableBorder, borderWidth: 0.4,
                        });
                        // centraliza o bloco de texto verticalmente dentro da célula
                        const cellTextHeight = cellLines[ci].length * lineHeight;
                        let ty = rowTop - (rowHeight - cellTextHeight) / 2 - lineHeight * 0.78;
                        const cellTargetWidth = colWidth - cellPad * 2;
                        cellLines[ci].forEach((line, li) => {
                            if (row.isHead) line.forEach(run => { run.font = fonts.semibold; run.color = COLOR.tableHeadText; });
                            const isLast = li === cellLines[ci].length - 1;
                            drawLine(flow.page, line, cx + cellPad, ty, cellTargetWidth, !isLast);
                            ty -= lineHeight;
                        });
                    });
                    flow.cursorY = rowBottom;
                }
                flow.cursorY -= mm(3);
                break;
            }
            case 'img': {
                try {
                    const img = await embedImageFromUrl(pdfDoc, block.src);
                    const maxW = flow.contentWidth * 0.85;
                    const scale = Math.min(1, maxW / img.width);
                    const w = img.width * scale;
                    const h = img.height * scale;
                    flow.ensure(h + mm(2));
                    const x = flow.contentLeft + (flow.contentWidth - w) / 2;
                    flow.page.drawImage(img, { x, y: flow.cursorY - h, width: w, height: h });
                    flow.cursorY -= h + mm(1.5);
                    if (block.caption) {
                        flow.drawParagraphRuns([{ text: block.caption, weight: 'regular', color: COLOR.secondary }], 7.8, { gapAfter: mm(2) });
                    } else {
                        flow.cursorY -= mm(1.5);
                    }
                } catch (e) {
                    /* imagem indisponível — segue sem quebrar o documento */
                }
                break;
            }
            default: break;
        }
    }

    // Altura estimada de um bloco, usada só para o controle de órfão do
    // título de capítulo (mantém o título junto do primeiro parágrafo).
    function estimateBlockHeight(flow, fonts, block) {
        if (block.type === 'p' || block.type === 'subhead') {
            const size = block.type === 'subhead' ? 10.5 : 9.4;
            const lines = wrapRuns(block.runs, fonts, size, flow.contentWidth);
            return lines.length * size * (block.type === 'subhead' ? 1.3 : 1.42) + mm(3);
        }
        return mm(20); // estimativa genérica para tabelas/listas/callouts/imagens
    }

    async function buildRapidReviewPdf({ topic }) {
        const pdfDoc = await PDFDocument.create();
        const fonts = await embedFonts(pdfDoc);
        const title = topic.title || topic.area || 'Rapid Review';
        const flow = new Flow(pdfDoc, fonts, {
            title, contentBottom: RR_CONTENT_BOTTOM, footerLineY: RR_FOOTER_LINE_Y, footerTextY: RR_FOOTER_TEXT_Y,
        });
        await flow.init();

        for (let sectionIndex = 0; sectionIndex < topic.sections.length; sectionIndex += 1) {
            const section = topic.sections[sectionIndex];
            if (sectionIndex > 0) flow.newPage(false);

            flow.ensure(20);
            flow.page.drawText((section.title || '').toUpperCase(), {
                x: flow.contentLeft, y: (flow.cursorY -= 12), size: 12,
                font: fonts.bold, color: COLOR.divider,
            });
            flow.cursorY -= mm(3);

            for (const chapter of section.subchapters || []) {
                const heading = `${chapter.num || ''} ${chapter.title || ''}`.trim();
                const blocks = parseBodyHtml(chapter.bodyHtml);

                // título do capítulo + primeiro bloco entram sempre juntos,
                // para não deixar o título "órfão" no fim da página.
                const headingHeight = 11.5 * 1.3 + mm(2.5);
                const firstBlockHeight = blocks[0] ? estimateBlockHeight(flow, fonts, blocks[0]) : 0;
                flow.ensure(headingHeight + firstBlockHeight);

                flow.drawParagraphRuns([{ text: heading, weight: 'bold' }], 11.5, { gapAfter: mm(2.5) });

                for (const block of blocks) {
                    await drawRapidBlock(flow, fonts, pdfDoc, block);
                }
            }
        }

        flow.finalizePageNumbers();
        return pdfDoc.save();
    }

    /* ---------- download helper ---------- */
    function downloadBytes(bytes, filename) {
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 30000);
    }

    global.TryckPdf = { buildQuestionsPdf, buildQuestionsResultPdf, buildRapidReviewPdf, downloadBytes };
})(window);
