"use client";

import Link from "next/link";
import { ProjectCard } from "@/components/projects/project-card";
import { FadeIn } from "@/components/shared/fade-in";
import { buildPathWithQuery } from "@/components/shared/pagination";
import type { Project } from "@/lib/types/database";
import type { ProjectFilter } from "@/lib/projects-filter";
import { useLanguage } from "@/providers/language-provider";
import { cn } from "@/lib/utils";

type FilterValue = ProjectFilter;

export function ProjectGrid({
  projects,
  filter,
}: {
  projects: Project[];
  filter: FilterValue;
}) {
  const { dict } = useLanguage();

  const filters: { value: FilterValue; label: string }[] = [
    { value: "all", label: dict.projects.filters.all },
    { value: "completed", label: dict.projects.filters.completed },
    { value: "in_development", label: dict.projects.filters.in_development },
    { value: "archived", label: dict.projects.filters.archived },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f.value}
            href={buildPathWithQuery(
              "/projects",
              f.value === "all" ? undefined : { status: f.value }
            )}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm transition-colors",
              filter === f.value
                ? "border-lumi-blue/40 bg-lumi-blue/10 text-lumi-text"
                : "border-white/10 text-lumi-muted hover:border-white/20 hover:text-lumi-text"
            )}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {projects.length === 0 ? (
        <p className="mt-12 text-center text-lumi-muted">{dict.projects.noProjects}</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.05}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
