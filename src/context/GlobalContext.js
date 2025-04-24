'use client';

import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  const value = {
    isLogin,
    setIsLogin,
  };

  return (
    <GlobalContext.Provider value={value}>
      <div>{children}</div>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
