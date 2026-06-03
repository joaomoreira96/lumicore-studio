"use client";

import { ContactForm } from "@/components/contact/contact-form";
import { FadeIn } from "@/components/shared/fade-in";
import { PageContainer, PageHeader, Section } from "@/components/shared/page-shell";
import { useLanguage } from "@/providers/language-provider";

export default function ContactPage() {
  const { dict } = useLanguage();

  return (
    <Section>
      <PageContainer>
        <FadeIn>
          <PageHeader title={dict.contact.title} subtitle={dict.contact.subtitle} />
        </FadeIn>
        <div className="mt-12">
          <ContactForm />
        </div>
      </PageContainer>
    </Section>
  );
}
