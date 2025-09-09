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
