import type { ProjectStatus } from "@/lib/types/database";

export const statusBadgeClass: Record<ProjectStatus, string> = {
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  in_development: "bg-lumi-blue/15 text-lumi-blue border-lumi-blue/20",
  archived: "bg-white/5 text-lumi-muted border-white/10",
};

export const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "PostgreSQL",
] as const;

export const SITE_EMAIL = "hello@lumicore.studio";
export const SITE_GITHUB = "https://github.com/lumicore-studio";
export const SITE_LINKEDIN = "https://linkedin.com/company/lumicore-studio";

/** Bump when replacing logo files in /public (forces browser cache bust) */
export const ASSET_VERSION = "4";

export const LOGO_FULL_SRC = "/LumicoreStudioLogo.png";
export const LOGO_MONOGRAM_SRC = "/LumicoreStudioSuperMinimalistLogo.png";

/** Use with plain <img> — next/image caches local PNGs aggressively */
export function logoUrl(path: string): string {
  return `${path}?v=${ASSET_VERSION}`;
}
