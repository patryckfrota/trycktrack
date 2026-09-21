import { useEffect, useState } from "react";
import { listUsers, type AdminUser } from "./api";

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
    <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>Usuários</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 13.5, marginTop: 2 }}>
          Contas registradas, direto do banco de dados.
        </p>
      </div>

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

      {error && (
        <div className="glass-card" style={{ padding: 16, borderColor: "var(--danger)", color: "var(--danger)", marginBottom: 16 }}>
          {error}
        </div>
      )}

      <div className="glass-card" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border-color)" }}>
              <Th>E-mail</Th>
              <Th>Nome</Th>
              <Th>Desde</Th>
              <Th>Respostas</Th>
              <Th>Revisões</Th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                <td style={{ padding: "10px 14px" }}>{u.email}</td>
                <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>{u.displayName || "—"}</td>
                <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>
                  {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                </td>
                <td style={{ padding: "10px 14px", fontVariantNumeric: "tabular-nums" }}>{u.respostas}</td>
                <td style={{ padding: "10px 14px", fontVariantNumeric: "tabular-nums" }}>{u.revisoes}</td>
              </tr>
            ))}
            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: 24, textAlign: "center", color: "var(--text-secondary)" }}>
                  Nenhum usuário ainda.
                </td>
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
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 0.4 }}>
      {children}
    </th>
  );
}
