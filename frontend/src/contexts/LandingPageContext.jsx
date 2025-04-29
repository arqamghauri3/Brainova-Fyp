import { createContext, useState } from "react";

export const LandingPageContext = createContext();

export const LandingPageProvider = ({ children }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth >= 640); 

  return (
    <LandingPageContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </LandingPageContext.Provider>
  );
};
