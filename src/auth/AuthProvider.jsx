// Contexto de autenticação sem ProtectedRoute
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, applyAuthPersistence } from '../firebase/firebase';
import { sendEmailVerification as sendEmailVerificationDirect } from 'firebase/auth';

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}

function mapAuthError(err) {
  const code = err?.code || '';
  const map = {
    'auth/invalid-email': 'Email inválido.',
    'auth/missing-password': 'Informe a password.',
    'auth/weak-password': 'Password fraca. Use no mínimo 8 caracteres.',
    'auth/email-already-in-use': 'Este email já está em uso.',
    'auth/invalid-credential': 'Credenciais inválidas.',
    'auth/user-not-found': 'Utilizador não encontrado.',
    'auth/wrong-password': 'Email ou password incorretos.',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente em instantes.',
    'auth/popup-closed-by-user': 'Operação cancelada pelo utilizador.',
  };
  return map[code] || 'Falha na autenticação. Tente novamente.';
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function signUp({ email, password, displayName }) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) { try { await updateProfile(cred.user, { displayName }); } catch {} }
      try { await sendEmailVerification(cred.user); } catch {}
      return { ok: true, user: cred.user };
    } catch (err) {
      return { ok: false, error: mapAuthError(err) };
    }
  }

  async function signIn({ email, password, remember }) {
    try {
      await applyAuthPersistence(!!remember);
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return { ok: true, user: cred.user };
    } catch (err) {
      return { ok: false, error: mapAuthError(err) };
    }
  }

  async function signOut() { try { await firebaseSignOut(auth); } catch {} }

  async function resetPassword(email) {
    try { await sendPasswordResetEmail(auth, email); return { ok: true }; }
    catch (err) { return { ok: false, error: mapAuthError(err) }; }
  }

  async function resendVerification() {
    try {
      if (!auth.currentUser) return { ok: false, error: 'Sessão expirada. Faça login novamente.' };
      await sendEmailVerificationDirect(auth.currentUser);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: mapAuthError(err) };
    }
  }

  const value = useMemo(() => ({ user, loading, signIn, signUp, signOut, resetPassword, resendVerification }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

