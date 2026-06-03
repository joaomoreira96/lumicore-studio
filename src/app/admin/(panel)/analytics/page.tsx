import { getAnalyticsSummary } from "@/lib/analytics";

export default async function AdminAnalyticsPage() {
  const analytics = await getAnalyticsSummary().catch(() => ({
    todayVisitors: 0,
    todayVisits: 0,
    weekVisitors: 0,
    totalVisitors: 0,
    devices: [] as { device_type: string; visitors: number }[],
    cities: [] as { country: string; city: string; visitors: number }[],
  }));

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold">Analytics</h1>
      <p className="mt-2 text-lumi-muted">Visitor statistics from Supabase.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Today (visitors)", value: analytics.todayVisitors },
          { label: "Today (visits)", value: analytics.todayVisits },
          { label: "This week", value: analytics.weekVisitors },
          { label: "All time", value: analytics.totalVisitors },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-lumi-bg-secondary p-6"
          >
            <p className="text-sm text-lumi-muted">{stat.label}</p>
            <p className="mt-2 font-heading text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-lumi-bg-secondary p-6">
          <h2 className="font-heading text-lg font-semibold">Device Breakdown</h2>
          <div className="mt-4 space-y-3">
            {analytics.devices.length === 0 ? (
              <p className="text-sm text-lumi-muted">No data yet.</p>
            ) : (
              analytics.devices.map((device) => (
                <div
                  key={device.device_type}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="capitalize text-lumi-muted">{device.device_type}</span>
                  <span className="font-medium">{device.visitors}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-lumi-bg-secondary p-6">
          <h2 className="font-heading text-lg font-semibold">Geographic Breakdown</h2>
          <div className="mt-4 space-y-3">
            {analytics.cities.length === 0 ? (
              <p className="text-sm text-lumi-muted">No data yet.</p>
            ) : (
              analytics.cities.slice(0, 10).map((city) => (
                <div
                  key={`${city.country}-${city.city}`}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-lumi-muted">
                    {city.city}, {city.country}
                  </span>
                  <span className="font-medium">{city.visitors}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
