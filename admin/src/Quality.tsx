import { useEffect, useState } from "react";
import { getQuality, type AdminQuality } from "./api";
import { QuestionEditor } from "./QuestionEditor";
import { Page, PageHeader, ErrorBanner, Section, EmptyState } from "./ui";

export function Quality({ onDrill }: { onDrill: (filter: { bank?: string; rodizio?: string }) => void }) {
  const [quality, setQuality] = useState<AdminQuality | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    getQuality().then(setQuality).catch((e) => setError(e.message));
  }, []);

  return (
    <Page>
      <PageHeader
        eyebrow="Curadoria"
        title="Qualidade"
        description="Furos de conteúdo por rodízio e por área — clique numa linha pra ver as questões."
      />

      {error && <ErrorBanner>{error}</ErrorBanner>}

      {quality && (
        <>
          <Section title="Internato — por rodízio">
            <QualityTable
              rows={quality.internato.map((r) => ({
                key: r.rodizio || "—",
                label: r.rodizio || "sem rodízio",
                total: r.total,
                gaps: [
                  { label: "sem explicação", value: r.semExplicacao },
                  { label: "sem tema", value: r.semTema },
                  { label: "anuladas", value: r.anuladas, neutral: true },
                ],
                onClick: () => r.rodizio && onDrill({ bank: "INTERNATO", rodizio: r.rodizio }),
              }))}
            />
          </Section>

          <Section title="Matriz curricular do OSCE">
            {quality.osce.questoesForaDaMatriz.length === 0 ? (
              <div className="glass-card" style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)", boxShadow: "0 0 0 3px rgba(52,199,89,0.16)" }} />
                <span style={{ fontSize: 13, fontWeight: 600 }}>Todas as questões do Internato batem com a matriz do OSCE.</span>
              </div>
            ) : (
              <div className="glass-card" style={{ padding: "14px 16px" }}>
                <p style={{ fontSize: 12.5, color: "var(--text-secondary)", marginBottom: 10 }}>
                  {quality.osce.questoesForaDaMatriz.length} questão(ões) com rodízio/tópico/tema que não bate
                  exatamente com a matriz do OSCE — somem do filtro por tema no app sem aviso nenhum. Clique pra abrir e corrigir.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {quality.osce.questoesForaDaMatriz.map((id) => (
                    <button
                      key={id}
                      onClick={() => setEditingId(id)}
                      style={{
                        fontSize: 11,
                        fontFamily: "var(--font-family-mono)",
                        padding: "4px 8px",
                        borderRadius: 6,
                        border: "1px solid var(--border-color)",
                        background: "rgba(255,255,255,0.04)",
                        color: "var(--text-main)",
                        cursor: "pointer",
                      }}
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Section>

          <Section title="Banco principal — por área">
            <QualityTable
              rows={quality.principal.map((r) => ({
                key: r.area,
                label: r.area,
                total: r.total,
                gaps: [
                  { label: "sem explicação", value: r.semExplicacao },
                  { label: "anuladas", value: r.anuladas, neutral: true },
                ],
                onClick: () => onDrill({ bank: "PRINCIPAL" }),
              }))}
            />
          </Section>
        </>
      )}

      {editingId && (
        <QuestionEditor id={editingId} onClose={() => setEditingId(null)} onSaved={() => getQuality().then(setQuality)} />
      )}
    </Page>
  );
}

interface QualityRow {
  key: string;
  label: string;
  total: number;
  gaps: { label: string; value: number; neutral?: boolean }[];
  onClick: () => void;
}

function QualityTable({ rows }: { rows: QualityRow[] }) {
  if (rows.length === 0) return <EmptyState>Nada por aqui.</EmptyState>;
  return (
    <div className="glass-card" style={{ overflow: "hidden" }}>
      {rows.map((row, i) => (
        <div
          key={row.key}
          onClick={row.onClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "12px 16px",
            borderBottom: i < rows.length - 1 ? "1px solid var(--border-color)" : "none",
            cursor: "pointer",
            transition: "background 0.12s var(--ease)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{row.label}</span>
          <span style={{ fontSize: 11.5, color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums" }}>
            {row.total} questões
          </span>
          {row.gaps.map((gap) => (
            <span
              key={gap.label}
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
                color: gap.value === 0 ? "var(--text-secondary)" : gap.neutral ? "var(--text-main)" : "var(--warn)",
                minWidth: 110,
                textAlign: "right",
              }}
            >
              {gap.value} {gap.label}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
