import { unstable_noStore as noStore } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminSession } from "@/lib/auth/verify-admin";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-settings";
import type { SiteSettings } from "@/lib/types/database";

/** Public footer data — service role avoids RLS gaps on site_settings */
export async function getSiteSettings(): Promise<SiteSettings> {
  noStore();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch site settings:", error.message);
    return DEFAULT_SITE_SETTINGS;
  }

  return (data as SiteSettings | null) ?? DEFAULT_SITE_SETTINGS;
}

export async function getAdminSiteSettings(): Promise<SiteSettings> {
  const session = await verifyAdminSession();
  if (!session.ok) return DEFAULT_SITE_SETTINGS;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch admin site settings:", error.message);
    return DEFAULT_SITE_SETTINGS;
  }

  return (data as SiteSettings | null) ?? DEFAULT_SITE_SETTINGS;
}
