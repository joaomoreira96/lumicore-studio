import type { Locale } from "@/lib/i18n/config";
import type { Faq } from "@/lib/types/database";

export function getFaqQuestion(faq: Faq, locale: Locale): string {
  return locale === "pt" ? faq.question_pt : faq.question_en;
}

export function getFaqAnswer(faq: Faq, locale: Locale): string {
  return locale === "pt" ? faq.answer_pt : faq.answer_en;
}
