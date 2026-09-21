import { useEffect, useState } from "react";
import { getQuality, type AdminQuality } from "./api";
import { QuestionEditor } from "./QuestionEditor";

export function Quality({ onDrill }: { onDrill: (filter: { bank?: string; rodizio?: string }) => void }) {
  const [quality, setQuality] = useState<AdminQuality | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    getQuality().then(setQuality).catch((e) => setError(e.message));
  }, []);

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>Qualidade</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 13.5, marginTop: 2 }}>
          Furos de conteúdo por rodízio e por área — clique numa linha pra ver as questões.
        </p>
      </div>

      {error && (
        <div className="glass-card" style={{ padding: 16, borderColor: "var(--danger)", color: "var(--danger)", marginBottom: 16 }}>
          {error}
        </div>
      )}

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

          {quality.osce.questoesForaDaMatriz.length > 0 && (
            <Section title="Divergências com a matriz curricular do OSCE">
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
                        fontFamily: "monospace",
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
            </Section>
          )}

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
    </div>
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
  if (rows.length === 0) {
    return (
      <div className="glass-card" style={{ padding: 20, textAlign: "center", color: "var(--text-secondary)", fontSize: 13 }}>
        Nada por aqui.
      </div>
    );
  }
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
          }}
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2
        style={{
          fontSize: 12.5,
          fontWeight: 700,
          color: "var(--text-secondary)",
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
