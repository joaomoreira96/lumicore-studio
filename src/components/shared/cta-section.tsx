"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";
import { PageContainer } from "@/components/shared/page-shell";
import { useLanguage } from "@/providers/language-provider";

export function CtaSection() {
  const { dict } = useLanguage();

  return (
    <div className="border-t border-white/5 bg-lumi-bg-secondary/50">
      <PageContainer className="py-16 md:py-20">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-lumi-blue/10 via-lumi-purple/5 to-transparent p-8 md:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-lumi-purple/20 blur-[80px]" />
            <div className="relative max-w-xl">
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                {dict.home.ctaTitle}
              </h2>
              <p className="mt-3 text-lumi-muted">{dict.home.ctaSubtitle}</p>
              <Button
                asChild
                size="lg"
                className="mt-8 bg-lumi-blue hover:bg-lumi-blue/90"
              >
                <Link href="/contact">
                  {dict.home.ctaButton}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </PageContainer>
    </div>
  );
}
