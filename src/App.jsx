// Componente raiz que carrega as rotas da aplicação
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader';

function AppInner() {
  const location = useLocation();
  const [routeLoading, setRouteLoading] = useState(false);
  const lastPath = useRef(location.pathname);

  // Apply theme on app mount and keep it in sync
  useEffect(() => {
    const getPreferredTheme = () => {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
      try { return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; } catch { return 'dark'; }
    };

    const apply = (t) => { try { document.documentElement.setAttribute('data-theme', t); } catch {} };

    // initial
    apply(getPreferredTheme());

    // listen to system preference changes only if user didn't explicitly set a theme
    let mq;
    try {
      mq = window.matchMedia('(prefers-color-scheme: light)');
      const onMQ = () => { if (!localStorage.getItem('theme')) apply(mq.matches ? 'light' : 'dark'); };
      if (mq.addEventListener) mq.addEventListener('change', onMQ); else if (mq.addListener) mq.addListener(onMQ);
      // cleanup
      return () => {
        try { if (mq.removeEventListener) mq.removeEventListener('change', onMQ); else if (mq.removeListener) mq.removeListener(onMQ); } catch {}
      };
    } catch { /* noop */ }
  }, []);

  // keep in sync with other tabs/windows
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        try { document.documentElement.setAttribute('data-theme', e.newValue); } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    // Quando o path muda, mostra o overlay por um curto período
    if (location.pathname !== lastPath.current) {
      lastPath.current = location.pathname;
      setRouteLoading(true);
      const t = setTimeout(() => setRouteLoading(false), 420); // sensação de suavidade
      return () => clearTimeout(t);
    }
  }, [location.pathname]);

  const currentPath = location.pathname.toLowerCase();
  const hideGlobalNav = ['/chooseurcharacter', '/generateurportfolio', '/theportfolio'].some(p => currentPath.startsWith(p));

  return (
    <>
      {!hideGlobalNav && <Navbar />}
      <Suspense fallback={<Loader visible={true} />}>
        <AppRoutes />
      </Suspense>
      <Footer />
      <Loader visible={routeLoading} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;
