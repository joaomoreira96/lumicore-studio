"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { FadeIn } from "@/components/shared/fade-in";
import { PageContainer, Section } from "@/components/shared/page-shell";
import { getFeaturedProjects } from "@/lib/mock/data";
import { useLanguage } from "@/providers/language-provider";

export function FeaturedProjectsSection() {
  const { dict } = useLanguage();
  const projects = getFeaturedProjects();

  return (
    <Section className="border-t border-white/5 bg-lumi-bg-secondary/50">
      <PageContainer>
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                {dict.home.featuredTitle}
              </h2>
              <p className="mt-2 text-lumi-muted">{dict.home.featuredSubtitle}</p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-lumi-blue transition-colors hover:text-lumi-cyan"
            >
              {dict.home.viewAllProjects}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.08}>
              <ProjectCard project={project} compact />
            </FadeIn>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
}
