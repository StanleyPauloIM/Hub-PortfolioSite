// Define as rotas principais da aplicação
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import SignInUp from '../pages/SignInUp/SignInUp';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInUp />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
