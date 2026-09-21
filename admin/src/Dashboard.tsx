import { useEffect, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { getIntegrity, getStats, type AdminIntegrity, type AdminStats } from "./api";
import { Page, PageHeader, Section, ErrorBanner } from "./ui";
import { IconBook, IconFolder, IconPencil, IconTag, IconUsers } from "./Icons";

const BANK_LABELS: Record<string, string> = {
  PRINCIPAL: "Banco principal",
  INTERNATO: "Internato",
};

export function Dashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [integrity, setIntegrity] = useState<AdminIntegrity | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStats().then(setStats).catch((e) => setError(e.message));
    getIntegrity().then(setIntegrity).catch((e) => setError(e.message));
  }, []);

  return (
    <Page>
      <PageHeader
        eyebrow="Painel de gestão"
        title="Visão geral"
        description="Estado atual do banco de questões, direto do banco de dados."
      />

      {error && <ErrorBanner>{error}</ErrorBanner>}

      {!error && !stats && (
        <SectionGrid>
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </SectionGrid>
      )}

      {integrity && (
        <Section title="Integridade de dados">
          <IntegrityBanner integrity={integrity} />
        </Section>
      )}

      {stats && (
        <>
          <Section title="Saúde do conteúdo">
            <SectionGrid>
              <Card Icon={IconBook} label="Questões no banco" value={stats.totalQuestions} accent />
              <Card Icon={IconUsers} label="Usuários" value={stats.totalUsuarios} />
              <Card Icon={IconPencil} label="Sem explicação" value={stats.semExplicacao} warn={stats.semExplicacao > 0} />
              <Card Icon={IconTag} label="Internato sem tema" value={stats.semTema} warn={stats.semTema > 0} />
            </SectionGrid>
          </Section>

          <Section title="Por banco">
            <SectionGrid>
              {Object.entries(stats.porBanco).map(([bank, count]) => (
                <Card key={bank} Icon={IconFolder} label={BANK_LABELS[bank] || bank} value={count} />
              ))}
            </SectionGrid>
          </Section>
        </>
      )}
    </Page>
  );
}

function IntegrityBanner({ integrity }: { integrity: AdminIntegrity }) {
  const rows: { label: string; fonte: number; banco: number }[] = [
    { label: "Questões", ...integrity.questoes },
    { label: "Alternativas", ...integrity.alternativas },
    { label: "Explicações", ...integrity.explicacoes },
  ];
  const problemas = integrity.imagensFaltando.length + integrity.semAlternativas.length + integrity.semAno.length + integrity.orfaos.length;

  return (
    <div
      className="glass-card"
      style={{
        padding: "18px 20px",
        borderColor: integrity.sincronizado ? undefined : "var(--warn)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span
          aria-hidden
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: integrity.sincronizado ? "var(--success)" : "var(--warn)",
            flex: "none",
            boxShadow: `0 0 0 3px ${integrity.sincronizado ? "rgba(52,199,89,0.16)" : "rgba(240,182,74,0.16)"}`,
          }}
        />
        <span style={{ fontSize: 14.5, fontWeight: 700 }}>
          {integrity.sincronizado ? "Arquivos e banco sincronizados" : "Divergência entre arquivos estáticos e o banco"}
        </span>
      </div>

      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", marginBottom: problemas ? 16 : 0 }}>
        {rows.map((row) => (
          <div key={row.label}>
            <div style={{ fontSize: 11.5, color: "var(--text-secondary)", fontWeight: 600, marginBottom: 3 }}>{row.label}</div>
            <div style={{ fontSize: 16, fontWeight: 700, fontVariantNumeric: "tabular-nums", color: row.fonte === row.banco ? "var(--text-main)" : "var(--warn)" }}>
              {row.fonte.toLocaleString("pt-BR")} <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>arquivos</span>
              {" · "}
              {row.banco.toLocaleString("pt-BR")} <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>banco</span>
            </div>
          </div>
        ))}
      </div>

      {problemas > 0 && (
        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          {integrity.semAlternativas.length > 0 && (
            <span style={{ fontSize: 12.5, color: "var(--warn)" }}>
              {integrity.semAlternativas.length} questão(ões) sem nenhuma alternativa
            </span>
          )}
          {integrity.imagensFaltando.length > 0 && (
            <span style={{ fontSize: 12.5, color: "var(--warn)" }}>
              {integrity.imagensFaltando.length} imagem(ns) referenciada(s) mas ausente(s) no disco
            </span>
          )}
          {integrity.semAno.length > 0 && (
            <span style={{ fontSize: 12.5, color: "var(--warn)" }}>
              {integrity.semAno.length} questão(ões) sem ano detectável (o filtro "Ano" nunca acha essas)
            </span>
          )}
          {integrity.orfaos.length > 0 && (
            <span style={{ fontSize: 12.5, color: "var(--warn)" }}>
              {integrity.orfaos.length} questão(ões) no banco que não existem mais nos arquivos-fonte
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function SectionGrid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
      {children}
    </div>
  );
}

function Card({ Icon, label, value, warn, accent }: { Icon: ComponentType<SVGProps<SVGSVGElement>>; label: string; value: number; warn?: boolean; accent?: boolean }) {
  return (
    <div className="glass-card stat-card">
      <div className="stat-card-head">
        <span className={`stat-card-icon ${accent ? "stat-card-icon-accent" : warn ? "stat-card-icon-warn" : ""}`}>
          <Icon />
        </span>
        <span className="stat-card-label">{label}</span>
      </div>
      <div className="stat-card-value" style={{ color: warn ? "var(--warn)" : accent ? "var(--brand-300)" : "var(--text-main)" }}>
        {value.toLocaleString("pt-BR")}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="glass-card" style={{ padding: "18px 20px", height: 96 }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(255,255,255,0.06)", marginBottom: 14 }} />
      <div style={{ width: "40%", height: 24, borderRadius: 6, background: "rgba(255,255,255,0.08)" }} />
    </div>
  );
}
