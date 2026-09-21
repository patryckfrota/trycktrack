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
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 300, padding: 28 }}
    >
      <div style={{ marginBottom: 4, display: "flex", alignItems: "center", gap: 10 }}>
        <img src={logo} alt="" style={{ width: 36, height: 36, borderRadius: 10 }} />
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.3, lineHeight: 1.1 }}>
            tryck<span style={{ color: "var(--brand-400)" }}>track</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Painel de gestão</div>
        </div>
      </div>
      <input
        className="input-field"
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="input-field"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="btn-primary" type="submit" disabled={loading} style={{ marginTop: 4 }}>
        {loading ? "Entrando…" : "Entrar"}
      </button>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
        <button type="button" className="btn-link" onClick={handleSignUp}>Criar conta</button>
        <button type="button" className="btn-link" onClick={handleReset}>Esqueci a senha</button>
      </div>
      {error && <p style={{ color: "var(--danger)", fontSize: 13 }}>{error}</p>}
      {info && <p style={{ color: "var(--success)", fontSize: 13 }}>{info}</p>}
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
