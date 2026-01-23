import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getTranslation } from "@/lib/i18n";

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const router = useRouter();

  const [locale, setLocale] = useState(router.locale || "sv");

  useEffect(() => {
    if (!router.locale) {
      setLocale("sv");
    } else if (router.locale !== locale) {
      setLocale(router.locale);
    }
  }, [router.locale]);

  const t = getTranslation(locale);

  const changeLanguage = (newLocale) => {
    setLocale(newLocale);
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <TranslationContext.Provider value={{ t, locale, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
