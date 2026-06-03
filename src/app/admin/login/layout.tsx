import { Navbar } from "@/components/layout/navbar";
import { getServerLocale } from "@/lib/i18n/server";
import { LanguageProvider } from "@/providers/language-provider";

export default async function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getServerLocale();

  return (
    <LanguageProvider initialLocale={locale}>
      <Navbar isAdmin={false} />
      {children}
    </LanguageProvider>
  );
}
