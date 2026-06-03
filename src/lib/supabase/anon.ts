import { createClient } from "@supabase/supabase-js";

/** Supabase client for build-time/static generation (no cookies). */
export function createAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
