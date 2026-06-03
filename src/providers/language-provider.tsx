"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  defaultLocale,
  isValidLocale,
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { dictionary as enDictionary } from "@/lib/i18n/dictionaries/en";
import { dictionary as ptDictionary } from "@/lib/i18n/dictionaries/pt";

const dictionaries: Record<Locale, Dictionary> = {
  en: enDictionary,
  pt: ptDictionary,
};

type LanguageContextValue = {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function persistLocale(locale: Locale) {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
  document.documentElement.lang = locale;
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && isValidLocale(stored)) {
      setLocaleState(stored);
      document.documentElement.lang = stored;
      if (stored !== initialLocale) {
        document.cookie = `${LOCALE_COOKIE}=${stored};path=/;max-age=31536000;samesite=lax`;
      }
    }
  }, [initialLocale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    persistLocale(next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      dict: dictionaries[locale],
      setLocale,
    }),
    [locale, setLocale]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      locale: defaultLocale as Locale,
      dict: enDictionary,
      setLocale: () => {},
    };
  }
  return ctx;
}
