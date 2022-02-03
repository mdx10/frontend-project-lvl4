import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AutnContext = createContext({});

const AutnProvider = ({ children }) => {
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
      navigate('/login', { replace: true });
    },
  };

  return (
    <AutnContext.Provider value={authProviderValues}>
      {children}
    </AutnContext.Provider>
  );
};

export { AutnContext, AutnProvider };
