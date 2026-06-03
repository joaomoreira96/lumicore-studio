import type { Locale } from "@/lib/i18n/config";
import type { Faq, Project, ProjectStatus } from "@/lib/types/database";

export function localizedProject(project: Project, locale: Locale) {
  return {
    ...project,
    title:
      locale === "pt" && project.title_pt ? project.title_pt : project.title,
    description:
      locale === "pt" && project.description_pt
        ? project.description_pt
        : project.description,
  };
}

export function localizedFaq(faq: Faq, locale: Locale) {
  return {
    ...faq,
    question:
      locale === "pt" && faq.question_pt ? faq.question_pt : faq.question,
    answer:
      locale === "pt" && faq.answer_pt ? faq.answer_pt : faq.answer,
  };
}

export const statusBadgeClass: Record<ProjectStatus, string> = {
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  in_development: "bg-lumi-blue/15 text-lumi-blue border-lumi-blue/20",
  archived: "bg-white/5 text-lumi-muted border-white/10",
};

export const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "PostgreSQL",
] as const;

export const SITE_EMAIL = "hello@lumicore.studio";
export const SITE_GITHUB = "https://github.com/lumicore-studio";
export const SITE_LINKEDIN = "https://linkedin.com/company/lumicore-studio";
