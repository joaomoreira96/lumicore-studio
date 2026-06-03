import { NextResponse } from "next/server";
import { trackVisit } from "@/lib/analytics";
import {
  getLocalDayString,
  isValidDayString,
  readTrackedDayFromCookie,
  VISIT_TRACKED_COOKIE,
} from "@/lib/analytics/visit-day";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const day = (body.day as string | undefined) ?? getLocalDayString();

    if (!isValidDayString(day)) {
      return NextResponse.json({ error: "Invalid day" }, { status: 400 });
    }

    const cookieHeader = request.headers.get("cookie");
    if (readTrackedDayFromCookie(cookieHeader) === day) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const userAgent = request.headers.get("user-agent") ?? "";
    await trackVisit({ day, userAgent });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(VISIT_TRACKED_COOKIE, day, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      httpOnly: false,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
  }
}
