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
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, applyAuthPersistence, db } from '../firebase/firebase';
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
    'auth/account-exists-with-different-credential': 'Já existe uma conta com este email por outro provedor. Entre pelo provedor associado e ligue contas nas definições.',
    'auth/popup-blocked': 'O navegador bloqueou a janela. Tente novamente ou use outro navegador.',
  };
  return map[code] || 'Falha na autenticação. Tente novamente.';
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      // Do not block UI while ensuring the user doc exists
      (async () => {
        try {
          if (u) {
            const ref = doc(db, 'users', u.uid);
            const snap = await getDoc(ref);
            if (!snap.exists()) {
              await setDoc(ref, {
                uid: u.uid,
                email: u.email || '',
                displayName: u.displayName || '',
                photoURL: u.photoURL || '',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              });
            } else {
              await setDoc(ref, { updatedAt: serverTimestamp() }, { merge: true });
            }
          }
        } catch {}
      })();
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function signUp({ email, password, displayName }) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) { try { await updateProfile(cred.user, { displayName }); } catch {} }
      try { await sendEmailVerification(cred.user); } catch {}
      try {
        const ref = doc(db, 'users', cred.user.uid);
        await setDoc(ref, {
          uid: cred.user.uid,
          email: cred.user.email || email,
          displayName: cred.user.displayName || displayName || '',
          photoURL: cred.user.photoURL || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch {}
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

  async function signInWithGoogle({ remember = true } = {}) {
    try {
      await applyAuthPersistence(!!remember);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const cred = await signInWithPopup(auth, provider);
      return { ok: true, user: cred.user };
    } catch (err) {
      if (err?.code === 'auth/popup-blocked' || err?.code === 'auth/cancelled-popup-request') {
        try {
          const provider = new GoogleAuthProvider();
          provider.setCustomParameters({ prompt: 'select_account' });
          await signInWithRedirect(auth, provider);
          return { ok: true, redirect: true };
        } catch (e2) {
          return { ok: false, error: mapAuthError(e2), code: e2?.code };
        }
      }
      return { ok: false, error: mapAuthError(err), code: err?.code };
    }
  }

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

  const value = useMemo(() => ({ user, loading, signIn, signUp, signOut, resetPassword, resendVerification, signInWithGoogle }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

