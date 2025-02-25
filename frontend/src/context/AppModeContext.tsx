import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AppModeContextProps {
  appMode: string
}

const AppModeContext = createContext<AppModeContextProps | undefined>(undefined);

export const AppModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // TODO: Set DEMO vs PROD based onsome domain related prop
  const [appMode, _setAppMode] = useState<AppModeContextProps>({
    appMode: "demo"
  });

  return (
    <AppModeContext.Provider value={appMode}>
      {children}
    </AppModeContext.Provider>
  );
};

export const useAppMode = () => {
  const context = useContext(AppModeContext);
  if (!context) {
    throw new Error('useAppMode must be used within a AppModeProvider');
  }
  return context;
};