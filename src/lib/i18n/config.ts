export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "lumi_locale";
export const LOCALE_STORAGE_KEY = "lumi_locale";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  pt: "PT",
};

export type LocalizedString = Record<Locale, string>;

export function t(value: LocalizedString, locale: Locale): string {
  return value[locale];
}
