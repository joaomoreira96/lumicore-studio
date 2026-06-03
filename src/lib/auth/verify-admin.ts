import { isAdminUserId } from "@/lib/auth/is-admin-server";
import { createClient } from "@/lib/supabase/server";

export async function verifyAdminSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, reason: "auth" as const };
  }

  const allowed = await isAdminUserId(user.id);

  if (!allowed) {
    return { ok: false as const, reason: "unauthorized" as const };
  }

  return { ok: true as const, user };
}
