import { cookies } from "next/headers";
import { isAdminUserId } from "@/lib/auth/is-admin-server";
import { createClient } from "@/lib/supabase/server";

export async function hasSupabaseAuthCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .some(({ name }) => name.includes("-auth-token"));
}

export async function verifyAdminSession() {
  if (!(await hasSupabaseAuthCookie())) {
    return { ok: false as const, reason: "auth" as const };
  }

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
