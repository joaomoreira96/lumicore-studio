import type { ProjectStatus } from "@/lib/types/database";

export type ProjectFilter = "all" | ProjectStatus;

export function parseProjectFilter(param: string | undefined): ProjectFilter {
  if (param === "completed" || param === "in_development" || param === "archived") {
    return param;
  }
  return "all";
}

export function projectFilterQuery(filter: ProjectFilter): Record<string, string | undefined> {
  return filter === "all" ? {} : { status: filter };
}
