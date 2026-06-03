import { NextResponse } from "next/server";
import { isAdminUserId } from "@/lib/auth/is-admin-server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ ok: false, reason: "auth" });
    }

    const allowed = await isAdminUserId(user.id);

    if (!allowed) {
      return NextResponse.json({ ok: false, reason: "unauthorized" });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, reason: "error" }, { status: 500 });
  }
}
