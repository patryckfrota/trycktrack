import { useEffect, useState } from "react";
import { listErrors, type AdminClientError } from "./api";

export function Errors() {
  const [errors, setErrors] = useState<AdminClientError[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function load(reset: boolean) {
    setLoading(true);
    setError(null);
    listErrors({ cursor: reset ? undefined : cursor || undefined })
      .then((res) => {
        setErrors((prev) => (reset ? res.errors : [...prev, ...res.errors]));
        setCursor(res.nextCursor);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>Erros em produção</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 13.5, marginTop: 2 }}>
          Exceções de JS não tratadas capturadas no app do aluno, mais recentes primeiro.
        </p>
      </div>

      {error && (
        <div className="glass-card" style={{ padding: 16, borderColor: "var(--danger)", color: "var(--danger)", marginBottom: 16 }}>
          {error}
        </div>
      )}

      {!loading && errors.length === 0 && !error && (
        <div className="glass-card" style={{ padding: 24, textAlign: "center", color: "var(--text-secondary)", fontSize: 13 }}>
          Nenhum erro registrado.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {errors.map((e) => (
          <div key={e.id} className="glass-card" style={{ padding: "14px 16px" }}>
            <div
              onClick={() => setExpandedId(expandedId === e.id ? null : e.id)}
              style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--danger)" }}>{e.message}</div>
                <div style={{ fontSize: 11.5, color: "var(--text-secondary)", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {e.url || "—"}
                </div>
              </div>
              <span style={{ fontSize: 11, color: "var(--text-secondary)", flex: "none", whiteSpace: "nowrap" }}>
                {new Date(e.createdAt).toLocaleString("pt-BR")}
              </span>
            </div>
            {expandedId === e.id && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border-color)", fontSize: 11.5, color: "var(--text-secondary)" }}>
                {e.userAgent && <div style={{ marginBottom: 6 }}>Navegador: {e.userAgent}</div>}
                {e.userId && <div style={{ marginBottom: 6 }}>Usuário (uid): {e.userId}</div>}
                {e.stack && (
                  <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: 11, background: "rgba(0,0,0,0.2)", padding: 10, borderRadius: 6, overflowX: "auto" }}>
                    {e.stack}
                  </pre>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {cursor && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <button className="btn-ghost" onClick={() => load(false)} disabled={loading}>
            {loading ? "Carregando…" : "Carregar mais"}
          </button>
        </div>
      )}
    </div>
  );
}
