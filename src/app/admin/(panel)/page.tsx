import Link from "next/link";
import { getAnalyticsSummary } from "@/lib/analytics";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [projectsRes, faqsRes, analytics] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("faqs").select("id", { count: "exact", head: true }),
    getAnalyticsSummary().catch(() => ({
      todayVisitors: 0,
      weekVisitors: 0,
      totalVisitors: 0,
      todayVisits: 0,
      devices: [],
      cities: [],
    })),
  ]);

  const stats = [
    { label: "Projects", value: projectsRes.count ?? 0, href: "/admin/projects" },
    { label: "FAQs", value: faqsRes.count ?? 0, href: "/admin/faqs" },
    { label: "Today's Visitors", value: analytics.todayVisitors, href: "/admin/analytics" },
    { label: "Weekly Visitors", value: analytics.weekVisitors, href: "/admin/analytics" },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-lumi-muted">Overview of your studio website.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-white/10 bg-lumi-bg-secondary p-6 transition-colors hover:border-white/15"
          >
            <p className="text-sm text-lumi-muted">{stat.label}</p>
            <p className="mt-2 font-heading text-3xl font-bold">{stat.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
