import type { ReactNode } from "react";
import logo from "./assets/logo.png";
import { initials } from "./ui";
import { IconAlertTriangle, IconBook, IconCheckShield, IconChart, IconLogout, IconUpload, IconUsers } from "./Icons";

export type PanelView = "dashboard" | "questoes" | "qualidade" | "importar" | "usuarios" | "erros";

const NAV_ITEMS: { key: PanelView; label: string; Icon: typeof IconChart; enabled: boolean }[] = [
  { key: "dashboard", label: "Visão geral", Icon: IconChart, enabled: true },
  { key: "questoes", label: "Questões", Icon: IconBook, enabled: true },
  { key: "qualidade", label: "Qualidade", Icon: IconCheckShield, enabled: true },
  { key: "usuarios", label: "Usuários", Icon: IconUsers, enabled: true },
  { key: "erros", label: "Erros", Icon: IconAlertTriangle, enabled: true },
  { key: "importar", label: "Importar prova", Icon: IconUpload, enabled: false },
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
      <aside className="sidebar">
        <div className="sidebar-brand">
          <img src={logo} alt="" />
          <div>
            <div className="sidebar-brand-name">trycktrack</div>
            <div className="sidebar-brand-tag">Gestão</div>
          </div>
        </div>

        <div>
          <div className="sidebar-section-label">Conteúdo</div>
          <nav className="sidebar-nav">
            {NAV_ITEMS.map(({ key, label, Icon, enabled }) => (
              <div
                key={key}
                onClick={() => enabled && onNavigate(key)}
                className={`sidebar-item ${enabled && view === key ? "sidebar-item-active" : ""} ${!enabled ? "sidebar-item-disabled" : ""}`}
              >
                <Icon style={{ flex: "none" }} />
                {label}
                {!enabled && <span className="sidebar-item-soon">em breve</span>}
              </div>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-avatar">{initials(null, email)}</div>
          <div className="sidebar-footer-info">
            <div className="sidebar-footer-email" title={email}>{email}</div>
          </div>
          <button className="sidebar-logout" onClick={onLogout} title="Sair" aria-label="Sair">
            <IconLogout style={{ width: 15, height: 15 }} />
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
    </div>
  );
}
