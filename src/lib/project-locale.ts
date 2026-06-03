import type { Locale } from "@/lib/i18n/config";
import type { Project } from "@/lib/types/database";

export function getProjectTitle(project: Project, locale: Locale): string {
  return locale === "pt" ? project.title_pt : project.title_en;
}

export function getProjectShortDescription(project: Project, locale: Locale): string {
  return locale === "pt" ? project.short_description_pt : project.short_description_en;
}

export function getProjectLongDescription(project: Project, locale: Locale): string | null {
  const long = locale === "pt" ? project.long_description_pt : project.long_description_en;
  if (long) return long;
  return getProjectShortDescription(project, locale);
}
