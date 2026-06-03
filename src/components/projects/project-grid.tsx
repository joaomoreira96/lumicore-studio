"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { FadeIn } from "@/components/shared/fade-in";
import {
  getAllProjects,
  type MockProject,
  type ProjectStatus,
} from "@/lib/mock/data";
import { useLanguage } from "@/providers/language-provider";
import { cn } from "@/lib/utils";

type FilterValue = "all" | ProjectStatus;

export function ProjectGrid({ projects }: { projects?: MockProject[] }) {
  const { dict } = useLanguage();
  const [filter, setFilter] = useState<FilterValue>("all");
  const allProjects = projects ?? getAllProjects();

  const filters: { value: FilterValue; label: string }[] = [
    { value: "all", label: dict.projects.filters.all },
    { value: "completed", label: dict.projects.filters.completed },
    { value: "in_development", label: dict.projects.filters.in_development },
    { value: "archived", label: dict.projects.filters.archived },
  ];

  const filtered = useMemo(() => {
    if (filter === "all") return allProjects;
    return allProjects.filter((p) => p.status === filter);
  }, [allProjects, filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm transition-colors",
              filter === f.value
                ? "border-lumi-blue/40 bg-lumi-blue/10 text-lumi-text"
                : "border-white/10 text-lumi-muted hover:border-white/20 hover:text-lumi-text"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-lumi-muted">{dict.projects.noProjects}</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {filtered.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.05}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
