import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Mesmo projeto Firebase do app do aluno (index.html) — o painel só
// precisa de login, não de conta nova; quem tem acesso é decidido no
// backend (ADMIN_EMAILS), não aqui.
const firebaseConfig = {
  apiKey: "AIzaSyBJai7AzEKiYj1pVYnyhq8VymGKwxTi8ks",
  authDomain: "trycktrack-eebae.firebaseapp.com",
  projectId: "trycktrack-eebae",
  storageBucket: "trycktrack-eebae.firebasestorage.app",
  messagingSenderId: "240947780643",
  appId: "1:240947780643:web:ad28805630df692934e596",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

// Bootstrap: cria a conta do primeiro admin quando ela ainda não existe
// no Firebase Auth. Continua exigindo que o e-mail esteja na allowlist
// ADMIN_EMAILS do backend pra acessar qualquer rota — isso só cria a
// credencial de login, não dá acesso sozinho.
export function signUpWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}
