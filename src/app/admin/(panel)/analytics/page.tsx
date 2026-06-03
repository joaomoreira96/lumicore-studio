import { VisitsChart } from "@/components/admin/visits-chart";
import { getAnalyticsSummary } from "@/lib/analytics";

export default async function AdminAnalyticsPage() {
  const analytics = await getAnalyticsSummary().catch(() => ({
    todayVisits: 0,
    weekVisits: 0,
    totalVisits: 0,
    devices: [] as { device: string; visits: number }[],
    dailySeries: [],
  }));

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold">Analytics</h1>
      <p className="mt-2 text-lumi-muted">
        Unique visits per day (one count per visitor, midnight to midnight).
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Today", value: analytics.todayVisits },
          { label: "Last 7 days", value: analytics.weekVisits },
          { label: "All time", value: analytics.totalVisits },
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

      <div className="mt-10 rounded-2xl border border-white/10 bg-lumi-bg-secondary p-6">
        <h2 className="font-heading text-lg font-semibold">Visits — last 14 days</h2>
        <VisitsChart data={analytics.dailySeries} />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-lumi-bg-secondary p-6">
        <h2 className="font-heading text-lg font-semibold">Devices — last 7 days</h2>
        <div className="mt-4 space-y-3">
          {analytics.devices.length === 0 ? (
            <p className="text-sm text-lumi-muted">No data yet.</p>
          ) : (
            analytics.devices.map((row) => {
              const total = analytics.devices.reduce((s, d) => s + d.visits, 0) || 1;
              const pct = Math.round((row.visits / total) * 100);
              return (
                <div key={row.device}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="capitalize text-lumi-muted">{row.device}</span>
                    <span className="font-medium">
                      {row.visits} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-lumi-blue"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
