import { useEffect, useState } from "react";
import { getQuestion, updateQuestion, type AdminQuestionDetail } from "./api";

export function QuestionEditor({ id, onClose, onSaved }: { id: string; onClose: () => void; onSaved: () => void }) {
  const [question, setQuestion] = useState<AdminQuestionDetail | null>(null);
  const [tema, setTema] = useState("");
  const [annulled, setAnnulled] = useState(false);
  const [explanationBody, setExplanationBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    setQuestion(null);
    setError(null);
    setSaved(null);
    getQuestion(id)
      .then((q) => {
        setQuestion(q);
        setTema(q.tema || "");
        setAnnulled(q.annulled);
        setExplanationBody(q.explanation || "");
      })
      .catch((e) => setError(e.message));
  }, [id]);

  async function handleSave() {
    if (!question) return;
    setSaving(true);
    setError(null);
    setSaved(null);
    try {
      const fields: { tema?: string; annulled?: boolean; explanationBody?: string } = {
        annulled,
        explanationBody,
      };
      if (question.bank === "INTERNATO") fields.tema = tema;
      const res = await updateQuestion(id, fields);
      setSaved(res.fileWriteback ? "Salvo — gravado no arquivo-fonte e no banco." : "Salvo só no Postgres (esse banco ainda não tem gravação em arquivo-fonte).");
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: 480,
          maxWidth: "100%",
          height: "100%",
          borderRadius: 0,
          overflowY: "auto",
          padding: "24px 26px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 800 }}>Editar questão</h2>
            <span style={{ fontSize: 11.5, color: "var(--text-secondary)", fontFamily: "monospace" }}>{id}</span>
          </div>
          <button className="btn-ghost" onClick={onClose} style={{ padding: "4px 10px" }}>Fechar</button>
        </div>

        {error && (
          <div className="glass-card" style={{ padding: 12, borderColor: "var(--danger)", color: "var(--danger)", fontSize: 13 }}>
            {error}
          </div>
        )}

        {!question && !error && <p style={{ color: "var(--text-secondary)", fontSize: 13.5 }}>Carregando…</p>}

        {question && (
          <>
            <div>
              <Label>Enunciado</Label>
              <p style={{ fontSize: 13.5, lineHeight: 1.5 }}>{question.stem}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {question.options.map((opt) => (
                <div key={opt.letter} style={{ fontSize: 13, display: "flex", gap: 8 }}>
                  <strong style={{ color: opt.letter === question.answer ? "var(--success)" : "var(--text-secondary)" }}>
                    {opt.letter}.
                  </strong>
                  <span>{opt.text}</span>
                </div>
              ))}
            </div>

            {question.bank === "INTERNATO" && (
              <div>
                <Label>Tema</Label>
                <input className="input-field" value={tema} onChange={(e) => setTema(e.target.value)} style={{ width: "100%" }} />
              </div>
            )}

            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
              <input type="checkbox" checked={annulled} onChange={(e) => setAnnulled(e.target.checked)} />
              Questão anulada
            </label>

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Label>Explicação</Label>
              <textarea
                className="input-field"
                value={explanationBody}
                onChange={(e) => setExplanationBody(e.target.value)}
                rows={10}
                style={{ width: "100%", resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }}
              />
            </div>

            {saved && <p style={{ fontSize: 12.5, color: "var(--success)" }}>{saved}</p>}

            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Salvando…" : "Salvar"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 6 }}>
      {children}
    </div>
  );
}
