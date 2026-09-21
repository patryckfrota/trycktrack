import type { ReactNode } from "react";
import logo from "./assets/logo.png";
import { IconAlertTriangle, IconBook, IconCheckShield, IconChart, IconLogout, IconUpload, IconUsers } from "./Icons";

export type PanelView = "dashboard" | "questoes" | "qualidade" | "importar" | "usuarios" | "erros";

const NAV_ITEMS: { key: PanelView; label: string; Icon: typeof IconChart; enabled: boolean }[] = [
  { key: "dashboard", label: "Visão geral", Icon: IconChart, enabled: true },
  { key: "questoes", label: "Questões", Icon: IconBook, enabled: true },
  { key: "qualidade", label: "Qualidade", Icon: IconCheckShield, enabled: true },
  { key: "importar", label: "Importar prova", Icon: IconUpload, enabled: false },
  { key: "usuarios", label: "Usuários", Icon: IconUsers, enabled: true },
  { key: "erros", label: "Erros", Icon: IconAlertTriangle, enabled: true },
];

interface LayoutProps {
  email: string;
  view: PanelView;
  onNavigate: (view: PanelView) => void;
  onLogout: () => void;
  children: ReactNode;
}

export function Layout({ email, view, onNavigate, onLogout, children }: LayoutProps) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 220,
          flex: "none",
          borderRight: "1px solid var(--border-color)",
          padding: "22px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 6px" }}>
          <img src={logo} alt="" style={{ width: 28, height: 28, borderRadius: 8 }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: -0.2 }}>trycktrack</div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>Gestão</div>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_ITEMS.map(({ key, label, Icon, enabled }) => (
            <div
              key={key}
              onClick={() => enabled && onNavigate(key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 10px",
                borderRadius: 10,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: enabled ? "pointer" : "default",
                color: enabled ? "var(--text-main)" : "var(--text-secondary)",
                background: enabled && view === key ? "rgba(255,255,255,0.1)" : enabled ? "rgba(255,255,255,0.04)" : "transparent",
                boxShadow: enabled && view === key ? "inset 0 0 0 1px var(--border-color)" : "none",
                opacity: enabled ? 1 : 0.55,
              }}
            >
              <Icon style={{ flex: "none", opacity: 0.85 }} />
              {label}
              {!enabled && (
                <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--text-secondary)" }}>em breve</span>
              )}
            </div>
          ))}
        </nav>

        <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--border-color)" }}>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8, wordBreak: "break-all" }}>
            {email}
          </div>
          <button
            className="btn-ghost"
            onClick={onLogout}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            <IconLogout style={{ width: 15, height: 15 }} />
            Sair
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
    </div>
  );
}
