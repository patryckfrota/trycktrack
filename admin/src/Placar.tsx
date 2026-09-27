import { useEffect, useState } from "react";
import { getPlacar, type AgentePlacar } from "./api";
import { EmptyState, ErrorBanner, Page, PageHeader, Section } from "./ui";

const NOMES: Record<string, string> = { gemini: "Gemini", claude: "Claude" };
const pct = (x: number) => `${Math.round(x * 100)}%`;

export function Placar() {
  const [agentes, setAgentes] = useState<AgentePlacar[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPlacar().then((r) => setAgentes(r.agentes)).catch((e) => setError(e.message));
  }, []);

  return (
    <Page>
      <PageHeader
        eyebrow="Laço de revisão"
        title="Placar Gemini ⇄ Claude"
        description="Quanto do conteúdo de cada agente é reprovado na revisão, em que tipo de erro, e se melhora lote a lote."
      />

      {error && <ErrorBanner>{error}</ErrorBanner>}
      {agentes && agentes.length === 0 && (
        <EmptyState>Nenhuma revisão registrada ainda. Os registros aparecem quando o validador roda num lote.</EmptyState>
      )}

      {agentes?.map((a) => (
        <Section key={a.autor} title={NOMES[a.autor] || a.autor}>
          <div className="glass-card" style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              <Numero rotulo="Reprovação" valor={pct(a.taxaReprovacao)} alerta={a.taxaReprovacao > 0.2} />
              <Numero rotulo="Questões revisadas" valor={a.itens.toLocaleString("pt-BR")} />
              <Numero rotulo="Lotes" valor={String(a.lotes)} />
            </div>

            <div>
              <Rotulo>Onde erra</Rotulo>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {a.categorias.map((c) => (
                  <div key={c.cat} style={{ display: "grid", gridTemplateColumns: "110px 1fr 90px", alignItems: "center", gap: 12, fontSize: 12.5 }}>
                    <span style={{ fontWeight: 600 }}>{c.nome}</span>
                    <div style={{ height: 6, borderRadius: 3, background: "var(--surface-hover)", overflow: "hidden" }}>
                      <div style={{ width: pct(c.taxa), height: "100%", background: "var(--warn)" }} />
                    </div>
                    <span style={{ color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums", textAlign: "right" }}>
                      {c.itens} ({pct(c.taxa)})
                    </span>
                  </div>
                ))}
                {a.categorias.length === 0 && <span style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>Nenhum erro registrado.</span>}
              </div>
            </div>

            <div>
              <Rotulo>Evolução da reprovação por lote</Rotulo>
              <Evolucao pontos={a.evolucao.map((e) => e.taxaReprovacao)} />
            </div>
          </div>
        </Section>
      ))}
    </Page>
  );
}

function Numero({ rotulo, valor, alerta }: { rotulo: string; valor: string; alerta?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 11.5, color: "var(--text-secondary)", fontWeight: 600, marginBottom: 2 }}>{rotulo}</div>
      <div style={{ fontSize: 24, fontWeight: 800, fontVariantNumeric: "tabular-nums", color: alerta ? "var(--warn)" : "var(--text-main)" }}>{valor}</div>
    </div>
  );
}

function Rotulo({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
      {children}
    </div>
  );
}

// Uma linha simples: cada ponto é um lote, de 0% (base) a 100% (topo).
function Evolucao({ pontos }: { pontos: number[] }) {
  if (pontos.length < 2) return <span style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>Precisa de pelo menos 2 lotes.</span>;
  const W = 480, H = 60;
  const xy = pontos.map((p, i) => `${(i / (pontos.length - 1)) * W},${H - p * H}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H + 4}`} style={{ width: "100%", maxWidth: W, height: "auto", overflow: "visible" }} role="img" aria-label="Taxa de reprovação por lote">
      <line x1="0" y1={H} x2={W} y2={H} stroke="var(--border-color)" />
      <polyline points={xy} fill="none" stroke="var(--brand-300)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
