import type { Project } from "@/lib/types/database";

/** Public site link — prefers url_site, falls back to legacy project_url */
export function getProjectSiteUrl(project: Project): string | null {
  return project.url_site ?? project.project_url ?? null;
}
