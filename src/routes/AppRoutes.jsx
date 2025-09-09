// Define as rotas principais da aplicação
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import SignInUp from '../pages/SignInUp/SignInUp';
import ChooseUrCharacter from '../pages/ChooseUrCharacter/ChooseUrCharacter';
import GenerateUrPortfolio from '../pages/GenerateUrPortfolio/GenerateUrPortfolio';
import ThePortfolio from '../pages/ThePortfolio/ThePortfolio';
import Terms from '../pages/Terms/Terms';

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
