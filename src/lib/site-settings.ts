import { SITE_EMAIL, SITE_GITHUB, SITE_LINKEDIN } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/config";
import type { SiteSettings } from "@/lib/types/database";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: 1,
  email: SITE_EMAIL,
  linkedin: SITE_LINKEDIN,
  github: SITE_GITHUB,
  facebook: null,
  instagram: null,
  footer_text_pt: "Software • Web • Experiências Interativas",
  footer_text_en: "Software • Web • Interactive Experiences",
  updated_at: "",
};

export function getFooterText(settings: SiteSettings, locale: Locale): string {
  return locale === "pt" ? settings.footer_text_pt : settings.footer_text_en;
}

export function getContactEmail(settings: SiteSettings): string {
  return settings.email ?? SITE_EMAIL;
}
