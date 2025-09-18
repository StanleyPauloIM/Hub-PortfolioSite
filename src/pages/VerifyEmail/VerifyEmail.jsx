import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { applyActionCode, getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import app, { db } from '../../firebase/firebase';

// Página que consome o link de verificação enviado por email e marca emailLinkVerified=true no Firestore
export default function VerifyEmail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState({ loading: true, ok: false, error: '' });

  const oobCode = params.get('oobCode') || '';
  const next = params.get('next') || '/generateurportfolio';
  const uidFromQuery = params.get('uid') || '';

  const message = useMemo(() => {
    if (state.loading) return 'A verificar o seu email…';
    if (state.ok) return 'Email verificado! Pode continuar.';
    return state.error || 'Falha ao verificar o email.';
  }, [state]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!oobCode) throw new Error('Código inválido.');
        const auth = getAuth(app);
        await applyActionCode(auth, oobCode);

        // Se tivermos uid por query, marcar no Firestore
        try {
          if (uidFromQuery) {
            const ref = doc(db, 'users', uidFromQuery);
            const snap = await getDoc(ref);
            if (!snap.exists()) {
              await setDoc(ref, {
                uid: uidFromQuery,
                emailLinkVerified: true,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              }, { merge: true });
            } else {
              await setDoc(ref, { emailLinkVerified: true, updatedAt: serverTimestamp() }, { merge: true });
            }
          }
        } catch {}

        if (!cancelled) setState({ loading: false, ok: true, error: '' });
        // Redireciona após um curto delay
        setTimeout(() => { try { navigate(next, { replace: true }); } catch {} }, 1200);
      } catch (err) {
        if (!cancelled) setState({ loading: false, ok: false, error: err?.message || 'Falha ao verificar o email.' });
      }
    })();
    return () => { cancelled = true; };
  }, [oobCode, next, navigate, uidFromQuery]);

  return (
    <div style={{minHeight:'60vh', display:'grid', placeItems:'center', padding:'24px'}}>
      <div style={{maxWidth:560, textAlign:'center'}}>
        <h1 style={{marginBottom:12}}>Verificação de email</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}

