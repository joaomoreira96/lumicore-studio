import { NextResponse } from "next/server";
import { trackVisit } from "@/lib/analytics";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const visitorId = body.visitorId as string | undefined;

    if (!visitorId) {
      return NextResponse.json({ error: "Missing visitorId" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") ?? "";
    const country = request.headers.get("x-vercel-ip-country");
    const city = request.headers.get("x-vercel-ip-city");

    await trackVisit({
      visitorId,
      userAgent,
      country,
      city: city ? decodeURIComponent(city) : null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
  }
}
