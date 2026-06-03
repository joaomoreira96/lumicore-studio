"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/shared/fade-in";
import { getFaqAnswer, getFaqQuestion } from "@/lib/faq-locale";
import type { Faq } from "@/lib/types/database";
import { useLanguage } from "@/providers/language-provider";
import { cn } from "@/lib/utils";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const { locale, dict } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  if (faqs.length === 0) {
    return (
      <p className="text-center text-lumi-muted">{dict.faq.empty}</p>
    );
  }

  return (
    <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-lumi-bg-secondary/50">
      {faqs.map((faq, i) => {
        const isOpen = openId === faq.id;
        const question = getFaqQuestion(faq, locale);
        const answer = getFaqAnswer(faq, locale);

        return (
          <FadeIn key={faq.id} delay={i * 0.04}>
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
              >
                <span className="font-medium text-lumi-text">{question}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-lumi-muted transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm leading-relaxed text-lumi-muted sm:px-6">
                  {answer}
                </div>
              )}
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
