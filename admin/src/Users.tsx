import { useEffect, useState } from "react";
import { listUsers, type AdminUser } from "./api";
import { Page, PageHeader, ErrorBanner, initials } from "./ui";

export function Users() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function load(reset: boolean) {
    setLoading(true);
    setError(null);
    listUsers({ search: search || undefined, cursor: reset ? undefined : cursor || undefined })
      .then((res) => {
        setUsers((prev) => (reset ? res.users : [...prev, ...res.users]));
        setCursor(res.nextCursor);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    load(true);
  }

  return (
    <Page>
      <PageHeader eyebrow="Contas" title="Usuários" description="Contas registradas, direto do banco de dados." />

      <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        <input
          className="input-field"
          placeholder="Buscar por e-mail…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
        <button className="btn-primary" type="submit" disabled={loading}>Buscar</button>
      </form>

      {error && <ErrorBanner>{error}</ErrorBanner>}

      <div className="glass-card" style={{ overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Desde</th>
              <th>Respostas</th>
              <th>Revisões</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className="sidebar-avatar" style={{ width: 26, height: 26, fontSize: 10.5 }}>
                      {initials(u.displayName, u.email)}
                    </span>
                    <div>
                      <div style={{ fontWeight: 600 }}>{u.email}</div>
                      {u.displayName && <div style={{ fontSize: 11.5, color: "var(--text-secondary)" }}>{u.displayName}</div>}
                    </div>
                  </div>
                </td>
                <td style={{ color: "var(--text-secondary)" }}>
                  {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                </td>
                <td style={{ fontVariantNumeric: "tabular-nums" }}>{u.respostas}</td>
                <td style={{ fontVariantNumeric: "tabular-nums" }}>{u.revisoes}</td>
              </tr>
            ))}
            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={4} className="empty-state">Nenhum usuário ainda.</td>
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
    </Page>
  );
}
