import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { verifyAdminSession } from "@/lib/auth/verify-admin";
import { getServerLocale } from "@/lib/i18n/server";
import { LanguageProvider } from "@/providers/language-provider";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, adminSession] = await Promise.all([
    getServerLocale(),
    verifyAdminSession(),
  ]);

  return (
    <LanguageProvider initialLocale={locale}>
      <Navbar isAdmin={adminSession.ok} />
      <main className="flex-1">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
