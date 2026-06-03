import { createAdminClient } from "@/lib/supabase/admin";

export async function isAdminUserId(userId: string): Promise<boolean> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("app_users")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("app_users lookup failed:", error.message);
    return false;
  }

  return data?.role === "admin";
}
