import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminSession } from "@/lib/auth/verify-admin";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-settings";
import type { SiteSettings } from "@/lib/types/database";

export const SITE_SETTINGS_TAG = "site-settings";

async function fetchSiteSettingsFromDb(): Promise<SiteSettings> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch site settings:", error.message);
    throw new Error(`site_settings fetch failed: ${error.message}`);
  }

  return (data as SiteSettings | null) ?? DEFAULT_SITE_SETTINGS;
}

const getCachedSiteSettings = unstable_cache(
  fetchSiteSettingsFromDb,
  [SITE_SETTINGS_TAG, "v2"],
  { revalidate: 300, tags: [SITE_SETTINGS_TAG] }
);

/** Cached public footer/contact settings (server-only service role) */
export const getSiteSettings = cache(getCachedSiteSettings);

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
