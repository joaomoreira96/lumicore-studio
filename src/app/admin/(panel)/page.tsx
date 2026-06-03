import Link from "next/link";
import { UnansweredContactsAlert } from "@/components/admin/admin-sidebar";
import { getAnalyticsSummary } from "@/lib/analytics";
import { getAdminFaqCount, getAdminProjectCount } from "@/lib/data/admin";
import { getUnansweredContactCount } from "@/lib/data/contact-requests";

export default async function AdminDashboardPage() {
  const [projectCount, faqCount, unansweredContacts, analytics] = await Promise.all([
    getAdminProjectCount(),
    getAdminFaqCount(),
    getUnansweredContactCount(),
    getAnalyticsSummary().catch(() => ({
      todayVisits: 0,
      weekVisits: 0,
      totalVisits: 0,
      devices: [],
      dailySeries: [],
    })),
  ]);

  const stats = [
    { label: "Projects", value: projectCount, href: "/admin/projects" },
    {
      label: "Awaiting reply",
      value: unansweredContacts,
      href: "/admin/contacts",
      highlight: unansweredContacts > 0,
    },
    { label: "FAQs", value: faqCount, href: "/admin/faqs" },
    { label: "Today's visits", value: analytics.todayVisits, href: "/admin/analytics" },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-lumi-muted">Overview of your studio website.</p>

      <UnansweredContactsAlert count={unansweredContacts} className="mt-8" />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={
              stat.highlight
                ? "rounded-2xl border border-amber-500/25 bg-amber-500/10 p-6 transition-colors hover:border-amber-500/40"
                : "rounded-2xl border border-white/10 bg-lumi-bg-secondary p-6 transition-colors hover:border-white/15"
            }
          >
            <p
              className={
                stat.highlight ? "text-sm text-amber-400" : "text-sm text-lumi-muted"
              }
            >
              {stat.label}
            </p>
            <p className="mt-2 font-heading text-3xl font-bold">{stat.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
