import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireSubscription = false }) => {
  const { user, isSubscriber } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireSubscription && !isSubscriber) {
    return <Navigate to="/subscription-plans" />;
  }

  return children;
};

export default ProtectedRoute;