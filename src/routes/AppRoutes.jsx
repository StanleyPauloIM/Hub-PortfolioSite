// Define as rotas principais da aplicação
import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Code‑splitting das páginas para permitir fallback do loader
const LandingPage = lazy(() => import('../pages/LandingPage/LandingPage'));
const SignInUp = lazy(() => import('../pages/SignInUp/SignInUp'));
const ChooseUrCharacter = lazy(() => import('../pages/ChooseUrCharacter/ChooseUrCharacter'));
const GenerateUrPortfolio = lazy(() => import('../pages/GenerateUrPortfolio/GenerateUrPortfolio'));
const ThePortfolio = lazy(() => import('../pages/ThePortfolio/ThePortfolio'));
const Terms = lazy(() => import('../pages/Terms/Terms'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInUp />} />
      <Route path="/chooseurcharacter" element={<ChooseUrCharacter />} />
      <Route path="/generateurportfolio" element={<GenerateUrPortfolio />} />
      <Route path="/theportfolio" element={<ThePortfolio />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
};

export default AppRoutes;
