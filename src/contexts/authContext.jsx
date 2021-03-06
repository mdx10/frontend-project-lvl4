import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate();

  const authProviderValues = {
    user,
    logIn: (userData) => {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    },
    logOut: () => {
      localStorage.removeItem('user');
      setUser(null);
      navigate(routes.loginPagePath(), { replace: true });
    },
  };

  return (
    <AuthContext.Provider value={authProviderValues}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
