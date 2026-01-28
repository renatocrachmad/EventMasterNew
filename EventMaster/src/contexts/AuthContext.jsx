import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    name: 'João Silva',
    email: 'joao@email.com',
    isSubscriber: true,
    subscriptionPlan: 'mensal',
    subscriptionStatus: 'ativo'
  });

  const login = async (credentials) => {
    // Lógica de login
  };

  const logout = () => {
    setUser(null);
  };

  const updateSubscription = (subscriptionData) => {
    setUser(prev => ({
      ...prev,
      ...subscriptionData
    }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      updateSubscription,
      isSubscriber: user?.isSubscriber,
      subscriptionStatus: user?.subscriptionStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};