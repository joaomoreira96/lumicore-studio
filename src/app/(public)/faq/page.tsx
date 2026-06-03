"use client";

import { FaqList } from "@/components/faq/faq-list";
import { FadeIn } from "@/components/shared/fade-in";
import { PageContainer, PageHeader, Section } from "@/components/shared/page-shell";
import { useLanguage } from "@/providers/language-provider";

export default function FaqPage() {
  const { dict } = useLanguage();

  return (
    <Section>
      <PageContainer>
        <FadeIn>
          <PageHeader title={dict.faq.title} subtitle={dict.faq.subtitle} />
        </FadeIn>
        <div className="mt-12 max-w-3xl">
          <FaqList />
        </div>
      </PageContainer>
    </Section>
  );
}
