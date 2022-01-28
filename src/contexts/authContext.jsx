import React, { createContext, useState } from 'react';

const AutnContext = createContext({});

const AutnProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const authProviderValues = {
    user,
    logIn: (userData) => {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    },
    logOut: () => {
      localStorage.removeItem('user');
      setUser(null);
    },
  };

  return (
    <AutnContext.Provider value={authProviderValues}>
      {children}
    </AutnContext.Provider>
  );
};

export { AutnContext, AutnProvider };
