import Link from "next/link";
import {
  BarChart3,
  FolderKanban,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Mail,
} from "lucide-react";
import { signOut } from "@/lib/actions/admin";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/contacts", label: "Contacts", icon: Mail, badge: true },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function AdminSidebar({
  unansweredContacts,
}: {
  unansweredContacts: number;
}) {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-white/5 p-6 md:block">
      <Link href="/admin" className="font-heading text-lg font-semibold gradient-text">
        Lumicore Admin
      </Link>
      <nav className="mt-8 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-lumi-muted transition-colors hover:bg-white/5 hover:text-lumi-text"
          >
            <span className="flex items-center gap-2">
              <item.icon className="size-4" />
              {item.label}
            </span>
            {item.badge && unansweredContacts > 0 && (
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400">
                {unansweredContacts}
              </span>
            )}
          </Link>
        ))}
      </nav>
      <form action={signOut} className="mt-8">
        <button
          type="submit"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-lumi-muted transition-colors hover:bg-white/5 hover:text-lumi-text"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </form>
    </aside>
  );
}

export function UnansweredContactsAlert({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  if (count === 0) return null;

  return (
    <Link
      href="/admin/contacts"
      className={cn(
        "block rounded-2xl border border-amber-500/25 bg-amber-500/10 p-6 transition-colors hover:border-amber-500/40",
        className
      )}
    >
      <p className="text-sm font-medium text-amber-400">Contact requests</p>
      <p className="mt-2 font-heading text-2xl font-bold text-lumi-text">
        {count} awaiting reply
      </p>
      <p className="mt-1 text-sm text-lumi-muted">Review and mark as answered</p>
    </Link>
  );
}
