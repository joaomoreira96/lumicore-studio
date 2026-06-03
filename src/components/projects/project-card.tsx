"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { statusBadgeClass } from "@/lib/constants";
import {
  getProjectShortDescription,
  getProjectTitle,
} from "@/lib/project-locale";
import type { Project } from "@/lib/types/database";
import { useLanguage } from "@/providers/language-provider";
import { cn } from "@/lib/utils";

type ProjectCardVariant = "default" | "compact" | "featured";

export function ProjectCard({
  project,
  compact = false,
  variant,
}: {
  project: Project;
  compact?: boolean;
  variant?: ProjectCardVariant;
}) {
  const { dict, locale } = useLanguage();
  const resolvedVariant: ProjectCardVariant = variant ?? (compact ? "compact" : "default");
  const isFeatured = resolvedVariant === "featured";
  const isCompact = resolvedVariant === "compact";
  const title = getProjectTitle(project, locale);
  const shortDescription = getProjectShortDescription(project, locale);

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-white/10 bg-lumi-bg-secondary transition-colors hover:border-white/15",
        isFeatured && "rounded-xl"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-lumi-bg",
          isFeatured ? "aspect-[4/3]" : "aspect-[16/10]"
        )}
      >
        {project.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image_url}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-lumi-blue/10 via-lumi-purple/10 to-lumi-cyan/5">
            <span
              className={cn(
                "font-heading font-bold gradient-text",
                isFeatured ? "text-2xl" : "text-4xl"
              )}
            >
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className={cn("p-5", (isCompact || isFeatured) && "p-3 sm:p-3")}>
        <div className="flex items-start justify-between gap-2">
          <h3
            className={cn(
              "font-heading font-semibold leading-snug",
              isFeatured
                ? "text-sm line-clamp-2"
                : isCompact
                  ? "text-base md:text-lg"
                  : "text-lg md:text-xl"
            )}
          >
            {title}
          </h3>
          {!isFeatured && (
            <Badge
              variant="outline"
              className={cn("shrink-0 border text-xs", statusBadgeClass[project.status])}
            >
              {dict.projects.status[project.status]}
            </Badge>
          )}
        </div>

        <p
          className={cn(
            "mt-1.5 leading-relaxed text-lumi-muted",
            isFeatured ? "line-clamp-2 text-xs" : "line-clamp-2 text-sm"
          )}
        >
          {shortDescription}
        </p>

        {resolvedVariant === "default" && (project.technologies?.length ?? 0) > 0 && (
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
          className={cn(
            "inline-flex items-center gap-1 text-lumi-blue transition-colors hover:text-lumi-cyan",
            isFeatured ? "mt-2 text-xs" : "mt-4 text-sm"
          )}
        >
          {dict.projects.viewProject}
          <ExternalLink className={isFeatured ? "size-3" : "size-3.5"} />
        </Link>
      </div>
    </article>
  );
}
