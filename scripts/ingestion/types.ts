import { z } from 'zod';

export const QuestionOptionLetterSchema = z.enum(['A', 'B', 'C', 'D', 'E']);
export type QuestionOptionLetter = z.infer<typeof QuestionOptionLetterSchema>;

export const QuestionOptionsSchema = z.record(
  z.string().regex(/^[A-E]$/, 'A chave da alternativa deve ser uma letra de A a E'),
  z.string().min(1, 'O texto da alternativa não pode ser vazio')
);

export const QuestionSchema = z.object({
  id: z.string().min(1, 'ID da questão é obrigatório'),
  number: z.number().int().positive('O número da questão deve ser positivo'),
  stem: z.string().min(10, 'Enunciado deve conter pelo menos 10 caracteres'),
  options: QuestionOptionsSchema,
  answer: QuestionOptionLetterSchema.nullable(),
  area: z.string().min(1, 'Área clínica é obrigatória'),
  assunto: z.string().optional(),
  topico: z.string().optional(),
  subtopico: z.string().optional(),
  annulled: z.boolean().default(false),
  images: z.array(z.string()).default([]),
  source: z.string().min(1, 'Fonte da prova é obrigatória'),
  examId: z.string().min(1, 'Identificador da prova é obrigatório'),
  examName: z.string().min(1, 'Nome formal da prova é obrigatório')
});
export type Question = z.infer<typeof QuestionSchema>;

export const QuestionExplanationSchema = z.object({
  questionId: z.string().min(1, 'ID da questão associada é obrigatório'),
  nucleo: z.string().min(20, 'NÚCLEO DA QUESTÃO deve conter a regra geral clínica universal'),
  armadilha: z.string().min(60, 'ARMADILHA deve detalhar o erro/distrator e o raciocínio correto'),
  alternativas: z.string().min(60, 'ALTERNATIVA POR ALTERNATIVA deve justificar cada letra'),
  fixacao: z.string().min(30, 'FIXAÇÃO 80/20 deve sintetizar o aprendizado prático')
}).refine((data) => {
  return data.fixacao.includes('Portanto, o gabarito é a alternativa') ||
         data.fixacao.includes('Portanto, a questão foi anulada');
}, {
  message: 'A seção FIXAÇÃO 80/20 deve obrigatoriamente finalizar com a fórmula: "Portanto, o gabarito é a alternativa X." ou "Portanto, a questão foi anulada..."'
});
export type QuestionExplanation = z.infer<typeof QuestionExplanationSchema>;

export const ExtractedItemSchema = z.object({
  question: QuestionSchema,
  explanation: QuestionExplanationSchema
});
export type ExtractedItem = z.infer<typeof ExtractedItemSchema>;

export const ExtractedBatchSchema = z.object({
  examId: z.string(),
  items: z.array(ExtractedItemSchema).min(1, 'O lote deve conter pelo menos uma questão extraída')
});
export type ExtractedBatch = z.infer<typeof ExtractedBatchSchema>;

export function formatFullExplanation(exp: QuestionExplanation, answerLetter: string | null): string {
  const hasClosure = exp.fixacao.includes('Portanto, o gabarito é a alternativa') ||
                     exp.fixacao.includes('Portanto, a questão foi anulada');

  const finalAnswerLine = answerLetter
    ? `Portanto, o gabarito é a alternativa ${answerLetter}.`
    : 'Portanto, a questão foi anulada pela banca.';

  const fixacaoBody = hasClosure
    ? exp.fixacao
    : `${exp.fixacao.trim()}\n${finalAnswerLine}`;

  return `NÚCLEO DA QUESTÃO
${exp.nucleo.trim()}

ARMADILHA — ONDE SE ERRA
${exp.armadilha.trim()}

ALTERNATIVA POR ALTERNATIVA
${exp.alternativas.trim()}

FIXAÇÃO 80/20
${fixacaoBody.trim()}`;
}
