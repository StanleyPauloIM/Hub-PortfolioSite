// Configura e exporta a instância do Firebase
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// Auth
const auth = getAuth(app);
try { auth.languageCode = 'pt'; } catch {}

// Firestore (tentar evitar problemas de rede com auto-deteção de long polling)
const db = initializeFirestore(app, {
  ignoreUndefinedProperties: true,
  experimentalAutoDetectLongPolling: true,
});

// Storage
const storage = getStorage(app);

// Inicializa analytics apenas quando suportado para evitar erros em dev/ambientes sem window
let analytics = null;
try {
  if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
    analytics = getAnalytics(app);
  }
} catch {}

// App Check opcional (reCAPTCHA v3) — só liga se a key estiver definida
let appCheck = null;
try {
  if (typeof window !== 'undefined') {
    const siteKey = import.meta.env.VITE_APP_CHECK_SITE_KEY;
    if (siteKey) {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(siteKey),
        isTokenAutoRefreshEnabled: true,
      });
    }
  }
} catch {}

// Helper para aplicar persistência baseada em "Lembrar-me"
async function applyAuthPersistence(remember) {
  try {
    await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
  } catch {}
}

// Constrói as opções do link de verificação de e‑mail com continue URL para nossa rota /verify-email
function buildEmailActionSettings(uid) {
  try {
    const base = (typeof window !== 'undefined' && window?.location?.origin) ? window.location.origin : 'http://localhost:5173';
    const url = `${base}/verify-email?uid=${encodeURIComponent(uid)}`;
    return { url, handleCodeInApp: true };
  } catch {
    return { url: 'http://localhost:5173/verify-email', handleCodeInApp: true };
  }
}

export { analytics, auth, db, storage, appCheck, applyAuthPersistence, buildEmailActionSettings };
export default app;
