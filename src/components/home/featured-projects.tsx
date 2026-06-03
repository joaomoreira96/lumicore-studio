import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { FadeIn } from "@/components/shared/fade-in";
import { PageContainer, Section } from "@/components/shared/page-shell";
import { Pagination } from "@/components/shared/pagination";
import type { Project } from "@/lib/types/database";

type FeaturedProjectsSectionProps = {
  projects: Project[];
  page: number;
  totalPages: number;
  title: string;
  subtitle: string;
  viewAllLabel: string;
  paginationLabels?: { previous: string; next: string };
};

export function FeaturedProjectsSection({
  projects,
  page,
  totalPages,
  title,
  subtitle,
  viewAllLabel,
  paginationLabels,
}: FeaturedProjectsSectionProps) {
  if (projects.length === 0 && page === 1) return null;

  return (
    <Section
      id="featured-projects"
      className="scroll-mt-24 border-t border-white/5 bg-lumi-bg-secondary/50"
    >
      <PageContainer>
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-heading text-2xl font-bold md:text-3xl">{title}</h2>
              <p className="mt-2 text-lumi-muted">{subtitle}</p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-lumi-blue transition-colors hover:text-lumi-cyan"
            >
              {viewAllLabel}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </FadeIn>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.05}>
              <ProjectCard project={project} variant="featured" />
            </FadeIn>
          ))}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          basePath="/"
          labels={paginationLabels}
          scrollAnchor="featured-projects"
        />
      </PageContainer>
    </Section>
  );
}
