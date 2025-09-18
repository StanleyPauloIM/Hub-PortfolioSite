import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Loader from '../components/Loader';

export default function ProtectedRoute({ children, requireVerified = false }) {
  const { user, userDoc, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader visible={true} />;
  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/signin?next=${next}`} replace />;
  }

  if (requireVerified) {
    const hasEmailVerified = !!user.emailVerified;
    const hasLinkVerified = !!(userDoc && userDoc.emailLinkVerified === true);
    if (!hasEmailVerified || !hasLinkVerified) {
      const next = encodeURIComponent(location.pathname + location.search);
      return <Navigate to={`/signin?verify=1&next=${next}`} replace />;
    }
  }

  return children;
}
