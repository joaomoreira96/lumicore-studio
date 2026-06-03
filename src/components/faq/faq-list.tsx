"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/shared/fade-in";
import { localizeFaq, mockFaqs, type MockFaq } from "@/lib/mock/data";
import { useLanguage } from "@/providers/language-provider";
import { cn } from "@/lib/utils";

export function FaqList({ faqs = mockFaqs }: { faqs?: MockFaq[] }) {
  const { locale } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const sorted = [...faqs].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-lumi-bg-secondary/50">
      {sorted.map((faq, i) => {
        const item = localizeFaq(faq, locale);
        const isOpen = openId === faq.id;
        return (
          <FadeIn key={faq.id} delay={i * 0.04}>
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
              >
                <span className="font-medium text-lumi-text">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-lumi-muted transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm leading-relaxed text-lumi-muted sm:px-6">
                  {item.answer}
                </div>
              )}
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
