import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Navbar } from "@/components/layout/navbar";
import { getUnansweredContactCount } from "@/lib/data/contact-requests";
import { verifyAdminSession } from "@/lib/auth/verify-admin";
import { getServerLocale } from "@/lib/i18n/server";
import { LanguageProvider } from "@/providers/language-provider";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unansweredContacts, locale, adminSession] = await Promise.all([
    getUnansweredContactCount(),
    getServerLocale(),
    verifyAdminSession(),
  ]);

  return (
    <LanguageProvider initialLocale={locale}>
      <Navbar isAdmin={adminSession.ok} />
      <div className="min-h-screen bg-lumi-bg text-lumi-text">
        <div className="mx-auto flex max-w-7xl">
          <AdminSidebar unansweredContacts={unansweredContacts} />
          <main className="flex-1 p-6 md:p-10">{children}</main>
        </div>
      </div>
    </LanguageProvider>
  );
}
