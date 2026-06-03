import Link from "next/link";
import { BarChart3, FolderKanban, HelpCircle, LayoutDashboard, LogOut } from "lucide-react";
import { signOut } from "@/lib/actions/admin";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-lumi-bg text-lumi-text">
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden w-56 shrink-0 border-r border-white/5 p-6 md:block">
          <Link href="/admin" className="font-heading text-lg font-semibold gradient-text">
            Lumicore Admin
          </Link>
          <nav className="mt-8 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-lumi-muted transition-colors hover:bg-white/5 hover:text-lumi-text"
              >
                <item.icon className="size-4" />
                {item.label}
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
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
