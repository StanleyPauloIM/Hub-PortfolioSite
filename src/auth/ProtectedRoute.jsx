import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Loader from '../components/Loader';

export default function ProtectedRoute({ children, requireVerified = false }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader visible={true} />;
  if (!user) return <Navigate to="/signin" replace />;

  if (requireVerified) {
    const isPasswordProvider = user.providerData?.some(p => (p.providerId||'').includes('password'));
    if (isPasswordProvider && !user.emailVerified) {
      return <Navigate to="/signin?verify=1" replace />;
    }
  }

  return children;
}
