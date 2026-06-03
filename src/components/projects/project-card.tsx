"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  localizeProject,
  statusBadgeClass,
  type MockProject,
} from "@/lib/mock/data";
import { useLanguage } from "@/providers/language-provider";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  compact = false,
}: {
  project: MockProject;
  compact?: boolean;
}) {
  const { locale, dict } = useLanguage();
  const item = localizeProject(project, locale);

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-lumi-bg-secondary transition-colors hover:border-white/15">
      <div className="relative aspect-[16/10] overflow-hidden bg-lumi-bg">
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-lumi-blue/10 via-lumi-purple/10 to-lumi-cyan/5">
            <span className="font-heading text-4xl font-bold gradient-text">
              {item.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className={cn("p-5", compact && "p-4")}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-lg font-semibold md:text-xl">
            {item.title}
          </h3>
          <Badge
            variant="outline"
            className={cn("shrink-0 border text-xs", statusBadgeClass[project.status])}
          >
            {dict.projects.status[project.status]}
          </Badge>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-lumi-muted line-clamp-2">
          {item.shortDescription}
        </p>

        {!compact && project.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-lumi-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/projects/${project.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-lumi-blue transition-colors hover:text-lumi-cyan"
        >
          {dict.projects.viewProject}
          <ExternalLink className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}
