'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslations, Language } from '@/lib/translations';

interface LanguageContextType {
  t: (key: string) => string;
  lang: Language;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ 
  children, 
  language 
}: { 
  children: ReactNode; 
  language: Language;
}) {
  const { t, lang } = useTranslations(language);

  return (
    <LanguageContext.Provider value={{ t, lang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback si no está en un provider
    return {
      t: (key: string) => key,
      lang: 'es' as Language
    };
  }
  return context;
}
