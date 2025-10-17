import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Language = "ka" | "en"; // Georgian and English

interface LanguageContextType {
  currentLanguage: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage && (savedLanguage === "ka" || savedLanguage === "en")
      ? savedLanguage
      : "ka";
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    localStorage.setItem("language", currentLanguage);
    document.documentElement.lang =
      currentLanguage === "ka" ? "ka-GE" : "en-US";
  }, [currentLanguage]);

  const toggleLanguage = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentLanguage((prev) => (prev === "ka" ? "en" : "ka"));

      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 150);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
