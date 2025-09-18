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
const TemplatesGallery = lazy(() => import('../pages/TemplatesGallery/TemplatesGallery'));
const TemplateExample = lazy (() => import('../pages/TemplateExample/TemplateExample'));
const AccountLazy = lazy(() => import('../pages/Account/Account'));
const SettingsLazy = lazy(() => import('../pages/Settings/Settings'));
const VerifyEmail = lazy(() => import('../pages/VerifyEmail/VerifyEmail'));
const PublicPortfolio = lazy(() => import('../pages/PublicPortfolio/PublicPortfolio'));
const NotificationsPage = lazy(() => import('../pages/Notifications/Notifications'));

import ProtectedRoute from '../auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInUp />} />
      <Route path="/verify-email" element={<React.Suspense fallback={null}><VerifyEmail /></React.Suspense>} />
      <Route path="/chooseurcharacter" element={<ProtectedRoute><ChooseUrCharacter /></ProtectedRoute>} />
      <Route path="/generateurportfolio" element={<ProtectedRoute requireVerified><GenerateUrPortfolio /></ProtectedRoute>} />
      <Route path="/theportfolio" element={<ProtectedRoute><ThePortfolio /></ProtectedRoute>} />
      <Route path="/templates" element={<TemplatesGallery />} />
      <Route path="/templates/:slug" element={<TemplateExample />} />
      <Route path="/p/:slug" element={<React.Suspense fallback={null}><PublicPortfolio /></React.Suspense>} />
      <Route path="/account" element={<ProtectedRoute><React.Suspense fallback={null}><AccountLazy /></React.Suspense></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><React.Suspense fallback={null}><SettingsLazy /></React.Suspense></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><React.Suspense fallback={null}><NotificationsPage /></React.Suspense></ProtectedRoute>} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
};

export default AppRoutes;
