import { useEffect, useState } from "react";
import { listQuestions, type AdminQuestion } from "./api";
import { QuestionEditor } from "./QuestionEditor";
import { Page, PageHeader, ErrorBanner } from "./ui";

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
    <Page>
      <PageHeader
        eyebrow="Conteúdo"
        title="Questões"
        description={
          <>
            Busca direta no banco de dados — a fonte que o app do aluno lê.
            {rodizio && <> · filtrado por <strong>{rodizio}</strong></>}
          </>
        }
      />

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

      {error && <ErrorBanner>{error}</ErrorBanner>}

      <div className="glass-card" style={{ overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Enunciado</th>
              <th>Banco</th>
              <th>Rodízio / Tema</th>
              <th>Explicação</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id} onClick={() => setEditingId(q.id)} className="is-clickable">
                <td style={{ maxWidth: 460 }}>
                  <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.stem}</div>
                  {q.annulled && <span style={{ fontSize: 10.5, color: "var(--warn)", fontWeight: 700 }}>ANULADA</span>}
                </td>
                <td style={{ color: "var(--text-secondary)" }}>{BANK_LABELS[q.bank] || q.bank}</td>
                <td style={{ color: "var(--text-secondary)" }}>
                  {q.rodizio || "—"}{q.tema ? ` · ${q.tema}` : ""}
                </td>
                <td>
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
                <td colSpan={4} className="empty-state">Nenhuma questão encontrada.</td>
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
    </Page>
  );
}
