import { createAdminClient } from "@/lib/supabase/admin";
import { getLocalDayString } from "@/lib/analytics/visit-day";

function detectDevice(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/tablet|ipad/.test(ua)) return "tablet";
  if (/mobile|android|iphone/.test(ua)) return "mobile";
  return "desktop";
}

export async function trackVisit(params: { day: string; userAgent: string }) {
  const supabase = createAdminClient();
  const device = detectDevice(params.userAgent);

  const { data: dailyRow } = await supabase
    .from("daily_stats")
    .select("total_visits")
    .eq("day", params.day)
    .maybeSingle();

  if (dailyRow) {
    const { error } = await supabase
      .from("daily_stats")
      .update({ total_visits: dailyRow.total_visits + 1 })
      .eq("day", params.day);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("daily_stats")
      .insert({ day: params.day, total_visits: 1 });
    if (error) throw error;
  }

  const { data: deviceRow } = await supabase
    .from("daily_device_stats")
    .select("visits")
    .eq("day", params.day)
    .eq("device", device)
    .maybeSingle();

  if (deviceRow) {
    const { error } = await supabase
      .from("daily_device_stats")
      .update({ visits: deviceRow.visits + 1 })
      .eq("day", params.day)
      .eq("device", device);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("daily_device_stats").insert({
      day: params.day,
      device,
      visits: 1,
    });
    if (error) throw error;
  }
}

export type DailyVisitPoint = {
  day: string;
  label: string;
  visits: number;
};

export type AnalyticsSummary = {
  todayVisits: number;
  weekVisits: number;
  totalVisits: number;
  devices: { device: string; visits: number }[];
  dailySeries: DailyVisitPoint[];
};

function formatDayLabel(day: string): string {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function buildDailySeries(
  rows: { day: string; total_visits: number }[],
  days: number
): DailyVisitPoint[] {
  const map = new Map(rows.map((r) => [r.day, r.total_visits]));
  const series: DailyVisitPoint[] = [];
  const cursor = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(cursor);
    date.setDate(cursor.getDate() - i);
    const day = getLocalDayString(date);
    series.push({
      day,
      label: formatDayLabel(day),
      visits: map.get(day) ?? 0,
    });
  }

  return series;
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const supabase = createAdminClient();
  const today = getLocalDayString();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 6);
  const weekStart = getLocalDayString(weekAgo);
  const chartStart = new Date();
  chartStart.setDate(chartStart.getDate() - 13);
  const chartStartDay = getLocalDayString(chartStart);

  const [todayRes, weekRes, allRes, deviceRes, seriesRes] = await Promise.all([
    supabase.from("daily_stats").select("total_visits").eq("day", today).maybeSingle(),
    supabase.from("daily_stats").select("total_visits").gte("day", weekStart),
    supabase.from("daily_stats").select("total_visits"),
    supabase.from("daily_device_stats").select("device, visits").gte("day", weekStart),
    supabase
      .from("daily_stats")
      .select("day, total_visits")
      .gte("day", chartStartDay)
      .order("day", { ascending: true }),
  ]);

  const weekVisits = weekRes.data?.reduce((sum, row) => sum + row.total_visits, 0) ?? 0;
  const totalVisits = allRes.data?.reduce((sum, row) => sum + row.total_visits, 0) ?? 0;

  const deviceMap = new Map<string, number>();
  deviceRes.data?.forEach((row) => {
    deviceMap.set(row.device, (deviceMap.get(row.device) ?? 0) + row.visits);
  });

  return {
    todayVisits: todayRes.data?.total_visits ?? 0,
    weekVisits,
    totalVisits,
    devices: Array.from(deviceMap.entries())
      .map(([device, visits]) => ({ device, visits }))
      .sort((a, b) => b.visits - a.visits),
    dailySeries: buildDailySeries(seriesRes.data ?? [], 14),
  };
}
