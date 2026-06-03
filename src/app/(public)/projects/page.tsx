"use client";

import { ProjectGrid } from "@/components/projects/project-grid";
import { FadeIn } from "@/components/shared/fade-in";
import { PageContainer, PageHeader, Section } from "@/components/shared/page-shell";
import { useLanguage } from "@/providers/language-provider";

export default function ProjectsPage() {
  const { dict } = useLanguage();

  return (
    <Section>
      <PageContainer>
        <FadeIn>
          <PageHeader title={dict.projects.title} subtitle={dict.projects.subtitle} />
        </FadeIn>
        <div className="mt-12">
          <ProjectGrid />
        </div>
      </PageContainer>
    </Section>
  );
}
