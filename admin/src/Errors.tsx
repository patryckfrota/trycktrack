import { useEffect, useState } from "react";
import { listErrors, type AdminClientError } from "./api";
import { Page, PageHeader, ErrorBanner, EmptyState } from "./ui";

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
    <Page>
      <PageHeader
        eyebrow="Observabilidade"
        title="Erros em produção"
        description="Exceções de JS não tratadas capturadas no app do aluno, mais recentes primeiro."
      />

      {error && <ErrorBanner>{error}</ErrorBanner>}

      {!loading && errors.length === 0 && !error && <EmptyState>Nenhum erro registrado.</EmptyState>}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {errors.map((e) => (
          <div key={e.id} className="glass-card" style={{ padding: "14px 16px" }}>
            <div
              onClick={() => setExpandedId(expandedId === e.id ? null : e.id)}
              style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                      padding: "2px 6px",
                      borderRadius: 4,
                      flex: "none",
                      color: e.source === "backend" ? "var(--brand-300)" : "var(--warn)",
                      background: e.source === "backend" ? "rgba(196,181,253,0.14)" : "rgba(240,182,74,0.14)",
                    }}
                  >
                    {e.source === "backend" ? "backend" : "cliente"}
                  </span>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--danger)" }}>{e.message}</div>
                </div>
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
    </Page>
  );
}
