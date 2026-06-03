import { createAdminClient } from "@/lib/supabase/admin";

function todayDateString() {
  return new Date().toISOString().slice(0, 10);
}

function detectDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/tablet|ipad/.test(ua)) return "tablet";
  if (/mobile|android|iphone/.test(ua)) return "mobile";
  return "desktop";
}

export async function trackVisit(params: {
  visitorId: string;
  userAgent: string;
  country?: string | null;
  city?: string | null;
}) {
  const supabase = createAdminClient();
  const today = todayDateString();
  const deviceType = detectDeviceType(params.userAgent);

  const { data: existingSession } = await supabase
    .from("visitor_sessions")
    .select("visitor_id")
    .eq("visitor_id", params.visitorId)
    .eq("date", today)
    .maybeSingle();

  const isNewVisitor = !existingSession;

  if (isNewVisitor) {
    await supabase.from("visitor_sessions").insert({
      visitor_id: params.visitorId,
      date: today,
    });
  }

  const { data: existingStats } = await supabase
    .from("daily_stats")
    .select("*")
    .eq("date", today)
    .maybeSingle();

  if (existingStats) {
    await supabase
      .from("daily_stats")
      .update({
        visits: existingStats.visits + 1,
        visitors: isNewVisitor
          ? existingStats.visitors + 1
          : existingStats.visitors,
      })
      .eq("id", existingStats.id);
  } else {
    await supabase.from("daily_stats").insert({
      date: today,
      visits: 1,
      visitors: 1,
    });
  }

  if (!isNewVisitor) {
    return;
  }

  const { data: deviceStats } = await supabase
    .from("daily_device_stats")
    .select("*")
    .eq("date", today)
    .eq("device_type", deviceType)
    .maybeSingle();

  if (deviceStats) {
    await supabase
      .from("daily_device_stats")
      .update({ visitors: deviceStats.visitors + 1 })
      .eq("id", deviceStats.id);
  } else {
    await supabase.from("daily_device_stats").insert({
      date: today,
      device_type: deviceType,
      visitors: 1,
    });
  }

  const country = params.country ?? "Unknown";
  const city = params.city ?? "Unknown";

  const { data: cityStats } = await supabase
    .from("daily_city_stats")
    .select("*")
    .eq("date", today)
    .eq("country", country)
    .eq("city", city)
    .maybeSingle();

  if (cityStats) {
    await supabase
      .from("daily_city_stats")
      .update({ visitors: cityStats.visitors + 1 })
      .eq("id", cityStats.id);
  } else {
    await supabase.from("daily_city_stats").insert({
      date: today,
      country,
      city,
      visitors: 1,
    });
  }
}

export async function getAnalyticsSummary() {
  const supabase = createAdminClient();
  const today = todayDateString();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoStr = weekAgo.toISOString().slice(0, 10);

  const [todayRes, weekRes, deviceRes, cityRes, totalRes] = await Promise.all([
    supabase.from("daily_stats").select("*").eq("date", today).maybeSingle(),
    supabase
      .from("daily_stats")
      .select("visitors, visits")
      .gte("date", weekAgoStr),
    supabase
      .from("daily_device_stats")
      .select("device_type, visitors")
      .gte("date", weekAgoStr),
    supabase
      .from("daily_city_stats")
      .select("country, city, visitors")
      .gte("date", weekAgoStr),
    supabase.from("daily_stats").select("visitors, visits"),
  ]);

  const weekVisitors =
    weekRes.data?.reduce((sum, row) => sum + row.visitors, 0) ?? 0;
  const totalVisitors =
    totalRes.data?.reduce((sum, row) => sum + row.visitors, 0) ?? 0;

  const deviceMap = new Map<string, number>();
  deviceRes.data?.forEach((row) => {
    deviceMap.set(
      row.device_type,
      (deviceMap.get(row.device_type) ?? 0) + row.visitors
    );
  });

  const cityMap = new Map<string, { country: string; city: string; visitors: number }>();
  cityRes.data?.forEach((row) => {
    const key = `${row.country ?? "Unknown"}|${row.city ?? "Unknown"}`;
    const existing = cityMap.get(key);
    if (existing) {
      existing.visitors += row.visitors;
    } else {
      cityMap.set(key, {
        country: row.country ?? "Unknown",
        city: row.city ?? "Unknown",
        visitors: row.visitors,
      });
    }
  });

  return {
    todayVisitors: todayRes.data?.visitors ?? 0,
    todayVisits: todayRes.data?.visits ?? 0,
    weekVisitors,
    totalVisitors,
    devices: Array.from(deviceMap.entries()).map(([device_type, visitors]) => ({
      device_type,
      visitors,
    })),
    cities: Array.from(cityMap.values()).sort((a, b) => b.visitors - a.visitors),
  };
}
