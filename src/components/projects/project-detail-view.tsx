"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";
import { PageContainer, Section } from "@/components/shared/page-shell";
import {
  getProjectBySlug,
  localizeProject,
  statusBadgeClass,
} from "@/lib/mock/data";
import { useLanguage } from "@/providers/language-provider";
import { cn } from "@/lib/utils";

export function ProjectDetailView({ slug }: { slug: string }) {
  const { locale, dict } = useLanguage();
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const item = localizeProject(project, locale);

  return (
    <Section>
      <PageContainer>
        <FadeIn>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-lumi-muted transition-colors hover:text-lumi-text"
          >
            <ArrowLeft className="size-4" />
            {dict.projectDetail.back}
          </Link>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
            <h1 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
              {item.title}
            </h1>
            <Badge
              variant="outline"
              className={cn("border", statusBadgeClass[project.status])}
            >
              {dict.projects.status[project.status]}
            </Badge>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-lumi-blue/10 via-lumi-purple/10 to-lumi-cyan/5">
            {project.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="font-heading text-6xl font-bold gradient-text">
                  {item.title.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mt-10 max-w-3xl text-base leading-relaxed text-lumi-muted md:text-lg">
            {item.longDescription}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10">
            <h2 className="font-heading text-lg font-semibold">
              {dict.projectDetail.technologies}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-lumi-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {project.projectUrl && (
          <FadeIn delay={0.25}>
            <Button asChild className="mt-10 bg-lumi-blue hover:bg-lumi-blue/90">
              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                {dict.projectDetail.visitProject}
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </FadeIn>
        )}
      </PageContainer>
    </Section>
  );
}
