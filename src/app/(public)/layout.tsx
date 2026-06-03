import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { getServerLocale } from "@/lib/i18n/server";
import { LanguageProvider } from "@/providers/language-provider";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getServerLocale();

  return (
    <LanguageProvider initialLocale={locale}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
