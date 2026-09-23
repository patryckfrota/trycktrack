import { auth } from "./firebase";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001";

export interface AdminStats {
  totalQuestions: number;
  totalUsuarios: number;
  semExplicacao: number;
  semTema: number;
  porBanco: Record<string, number>;
}

export interface AdminIntegrity {
  sincronizado: boolean;
  questoes: { fonte: number; banco: number };
  alternativas: { fonte: number; banco: number };
  explicacoes: { fonte: number; banco: number };
  imagensFaltando: { questionId: string; path: string }[];
  semAlternativas: string[];
  semAno: string[];
  orfaos: string[];
}

export interface AdminQuality {
  internato: { rodizio: string | null; total: number; semExplicacao: number; semTema: number; anuladas: number }[];
  principal: { area: string; total: number; semExplicacao: number; anuladas: number }[];
  osce: {
    questoesForaDaMatriz: string[];
    temasSemQuestao: { rodizio: string; topico: string; tema: string }[];
  };
}

export interface AdminClientError {
  id: string;
  source: "client" | "backend";
  message: string;
  stack: string | null;
  url: string | null;
  userAgent: string | null;
  userId: string | null;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  displayName: string | null;
  createdAt: string;
  respostas: number;
  revisoes: number;
}

export interface AdminQuestion {
  id: string;
  bank: string;
  area: string;
  rodizio: string | null;
  topico: string | null;
  tema: string | null;
  semestre: string | null;
  stem: string;
  annulled: boolean;
  temExplicacao: boolean;
}

export interface AdminQuestionDetail extends AdminQuestion {
  answer: string | null;
  options: { letter: string; text: string }[];
  explanation: string | null;
}

async function authedFetch(path: string, init?: RequestInit) {
  const user = auth.currentUser;
  if (!user) throw new Error("Não autenticado.");
  const token = await user.getIdToken();
  const res = await fetch(`${API_BASE}/api/admin${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init?.body ? { "Content-Type": "application/json" } : {}), ...init?.headers },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Erro ${res.status}`);
  }
  return res.json();
}

export function getStats(): Promise<AdminStats> {
  return authedFetch("/stats");
}

export function getIntegrity(): Promise<AdminIntegrity> {
  return authedFetch("/integrity");
}

export function getQuality(): Promise<AdminQuality> {
  return authedFetch("/quality");
}

export function listQuestions(params: { bank?: string; rodizio?: string; search?: string; cursor?: string } = {}) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v) as [string, string][],
  );
  return authedFetch(`/questions?${qs.toString()}`) as Promise<{
    questions: AdminQuestion[];
    nextCursor: string | null;
  }>;
}

export function listErrors(params: { cursor?: string } = {}) {
  const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]);
  return authedFetch(`/errors?${qs.toString()}`) as Promise<{
    errors: AdminClientError[];
    nextCursor: string | null;
  }>;
}

export function listUsers(params: { search?: string; cursor?: string } = {}) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v) as [string, string][],
  );
  return authedFetch(`/users?${qs.toString()}`) as Promise<{
    users: AdminUser[];
    nextCursor: string | null;
  }>;
}

export function getQuestion(id: string): Promise<AdminQuestionDetail> {
  return authedFetch(`/questions/${encodeURIComponent(id)}`);
}

export function updateQuestion(
  id: string,
  fields: { tema?: string; annulled?: boolean; explanationBody?: string },
): Promise<{ ok: boolean; fileWriteback: boolean }> {
  return authedFetch(`/questions/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(fields),
  });
}
