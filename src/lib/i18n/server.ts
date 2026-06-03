import { cookies } from "next/headers";
import {
  defaultLocale,
  isValidLocale,
  LOCALE_COOKIE,
  type Locale,
} from "./config";
import { getDictionary } from "./get-dictionary";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return value && isValidLocale(value) ? value : defaultLocale;
}

export async function getServerDictionary() {
  const locale = await getServerLocale();
  return { locale, dict: await getDictionary(locale) };
}
