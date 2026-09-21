import { useEffect, useState } from "react";
import { listQuestions, type AdminQuestion } from "./api";
import { QuestionEditor } from "./QuestionEditor";

const BANK_LABELS: Record<string, string> = {
  PRINCIPAL: "Banco principal",
  INTERNATO: "Internato",
};

export function Questions({ initialFilter }: { initialFilter?: { bank?: string; rodizio?: string } }) {
  const [bank, setBank] = useState(initialFilter?.bank || "");
  const [rodizio] = useState(initialFilter?.rodizio || "");
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  function load(reset: boolean) {
    setLoading(true);
    setError(null);
    listQuestions({ bank: bank || undefined, rodizio: rodizio || undefined, search: search || undefined, cursor: reset ? undefined : cursor || undefined })
      .then((res) => {
        setQuestions((prev) => (reset ? res.questions : [...prev, ...res.questions]));
        setCursor(res.nextCursor);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bank]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    load(true);
  }

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>Questões</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 13.5, marginTop: 2 }}>
          Busca direta no banco de dados — a fonte que o app do aluno lê.
          {rodizio && <> · filtrado por <strong>{rodizio}</strong></>}
        </p>
      </div>

      <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        <input
          className="input-field"
          placeholder="Buscar no enunciado…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
        <select
          className="input-field"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          style={{ width: 180 }}
        >
          <option value="">Todos os bancos</option>
          <option value="PRINCIPAL">Banco principal</option>
          <option value="INTERNATO">Internato</option>
        </select>
        <button className="btn-primary" type="submit" disabled={loading}>Buscar</button>
      </form>

      {error && (
        <div className="glass-card" style={{ padding: 16, borderColor: "var(--danger)", color: "var(--danger)", marginBottom: 16 }}>
          {error}
        </div>
      )}

      <div className="glass-card" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border-color)" }}>
              <Th>Enunciado</Th>
              <Th>Banco</Th>
              <Th>Rodízio / Tema</Th>
              <Th>Explicação</Th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr
                key={q.id}
                onClick={() => setEditingId(q.id)}
                style={{ borderBottom: "1px solid var(--border-color)", cursor: "pointer" }}
              >
                <td style={{ padding: "10px 14px", maxWidth: 460 }}>
                  <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.stem}</div>
                  {q.annulled && <span style={{ fontSize: 10.5, color: "var(--warn)", fontWeight: 700 }}>ANULADA</span>}
                </td>
                <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>{BANK_LABELS[q.bank] || q.bank}</td>
                <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>
                  {q.rodizio || "—"}{q.tema ? ` · ${q.tema}` : ""}
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: q.temExplicacao ? "var(--success)" : "var(--warn)",
                    }}
                  >
                    {q.temExplicacao ? "sim" : "faltando"}
                  </span>
                </td>
              </tr>
            ))}
            {!loading && questions.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: 24, textAlign: "center", color: "var(--text-secondary)" }}>
                  Nenhuma questão encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {cursor && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <button className="btn-ghost" onClick={() => load(false)} disabled={loading}>
            {loading ? "Carregando…" : "Carregar mais"}
          </button>
        </div>
      )}

      {editingId && (
        <QuestionEditor
          id={editingId}
          onClose={() => setEditingId(null)}
          onSaved={() => load(true)}
        />
      )}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.4 }}>
      {children}
    </th>
  );
}
