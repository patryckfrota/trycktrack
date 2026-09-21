import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, loginWithEmail, logout, resetPassword, signUpWithEmail } from "./firebase";
import { Dashboard } from "./Dashboard";
import { Layout, type PanelView } from "./Layout";
import { Questions } from "./Questions";
import { Quality } from "./Quality";
import { Users } from "./Users";
import { Errors } from "./Errors";
import logo from "./assets/logo.png";

export function App() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [view, setView] = useState<PanelView>("dashboard");
  const [questionsFilter, setQuestionsFilter] = useState<{ bank?: string; rodizio?: string }>();

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  if (user === undefined) {
    return <Centered>Carregando…</Centered>;
  }

  if (!user) {
    return (
      <Centered>
        <LoginForm />
      </Centered>
    );
  }

  return (
    <Layout email={user.email || ""} view={view} onNavigate={setView} onLogout={() => logout()}>
      {view === "questoes" && <Questions initialFilter={questionsFilter} />}
      {view === "qualidade" && (
        <Quality
          onDrill={(filter) => {
            setQuestionsFilter(filter);
            setView("questoes");
          }}
        />
      )}
      {view === "usuarios" && <Users />}
      {view === "erros" && <Errors />}
      {view === "dashboard" && <Dashboard />}
    </Layout>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      await loginWithEmail(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao entrar.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp() {
    if (!email || !password) {
      setError("Preencha e-mail e senha antes de criar a conta.");
      return;
    }
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      await signUpWithEmail(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    if (!email) {
      setError("Preencha o e-mail antes de pedir redefinição.");
      return;
    }
    setError(null);
    setInfo(null);
    try {
      await resetPassword(email);
      setInfo("Link de redefinição enviado — confere seu e-mail.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar o link.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card"
      style={{ display: "flex", flexDirection: "column", gap: 14, width: 320, padding: "32px 30px" }}
    >
      <div style={{ marginBottom: 6, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12 }}>
        <img src={logo} alt="" style={{ width: 44, height: 44, borderRadius: 13, boxShadow: "0 8px 22px rgba(139,107,224,0.35)" }} />
        <div>
          <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: -0.3, lineHeight: 1.1 }}>
            tryck<span style={{ color: "var(--brand-400)" }}>track</span>
          </div>
          <div style={{ fontSize: 11.5, color: "var(--text-secondary)", marginTop: 3, textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 600 }}>
            Painel de gestão
          </div>
        </div>
      </div>

      <label>
        <span style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 6 }}>E-mail</span>
        <input
          className="input-field"
          type="email"
          placeholder="voce@trycktrack.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%" }}
        />
      </label>
      <label>
        <span style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 6 }}>Senha</span>
        <input
          className="input-field"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%" }}
        />
      </label>
      <button className="btn-primary" type="submit" disabled={loading} style={{ marginTop: 4 }}>
        {loading ? "Entrando…" : "Entrar"}
      </button>
      {error && <p style={{ color: "var(--danger)", fontSize: 12.5 }}>{error}</p>}
      {info && <p style={{ color: "var(--success)", fontSize: 12.5 }}>{info}</p>}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, paddingTop: 12, borderTop: "1px solid var(--border-color)" }}>
        <button type="button" className="btn-link" onClick={handleSignUp}>Criar conta</button>
        <button type="button" className="btn-link" onClick={handleReset}>Esqueci a senha</button>
      </div>
    </form>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      {children}
    </div>
  );
}
