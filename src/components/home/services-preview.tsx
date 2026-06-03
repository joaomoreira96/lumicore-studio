"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCards } from "@/components/services/service-cards";
import { FadeIn } from "@/components/shared/fade-in";
import { PageContainer, Section } from "@/components/shared/page-shell";
import { useLanguage } from "@/providers/language-provider";

export function ServicesPreviewSection() {
  const { dict } = useLanguage();

  return (
    <Section>
      <PageContainer>
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                {dict.home.servicesTitle}
              </h2>
              <p className="mt-2 text-lumi-muted">{dict.home.servicesSubtitle}</p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm text-lumi-blue transition-colors hover:text-lumi-cyan"
            >
              {dict.home.viewAllServices}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </FadeIn>

        <div className="mt-10">
          <ServiceCards variant="compact" />
        </div>
      </PageContainer>
    </Section>
  );
}
