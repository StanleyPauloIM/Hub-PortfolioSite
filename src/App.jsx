// Componente raiz que carrega as rotas da aplicação
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;
