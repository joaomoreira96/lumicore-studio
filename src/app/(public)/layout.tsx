import { AnalyticsTracker } from "@/components/analytics-tracker";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { verifyAdminSession } from "@/lib/auth/verify-admin";
import { getSiteSettings } from "@/lib/data/site-settings";
import { getServerLocale } from "@/lib/i18n/server";
import { LanguageProvider } from "@/providers/language-provider";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, adminSession, siteSettings] = await Promise.all([
    getServerLocale(),
    verifyAdminSession(),
    getSiteSettings(),
  ]);

  return (
    <LanguageProvider initialLocale={locale}>
      <AnalyticsTracker />
      <Navbar isAdmin={adminSession.ok} />
      <main className="flex-1">{children}</main>
      <Footer settings={siteSettings} />
    </LanguageProvider>
  );
}
