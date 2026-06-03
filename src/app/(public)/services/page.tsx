"use client";

import { ServiceCards } from "@/components/services/service-cards";
import { FadeIn } from "@/components/shared/fade-in";
import { PageContainer, PageHeader, Section } from "@/components/shared/page-shell";
import { useLanguage } from "@/providers/language-provider";

export default function ServicesPage() {
  const { dict } = useLanguage();

  return (
    <Section>
      <PageContainer>
        <FadeIn>
          <PageHeader title={dict.services.title} subtitle={dict.services.subtitle} />
        </FadeIn>
        <div className="mt-12">
          <ServiceCards />
        </div>
      </PageContainer>
    </Section>
  );
}
