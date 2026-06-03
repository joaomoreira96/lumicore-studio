import { FaqList } from "@/components/faq/faq-list";
import { FadeIn } from "@/components/shared/fade-in";
import { PageContainer, PageHeader, Section } from "@/components/shared/page-shell";
import { Pagination } from "@/components/shared/pagination";
import { getPublicFaqsPage } from "@/lib/data/public";
import { getServerDictionary } from "@/lib/i18n/server";
import { parsePage } from "@/lib/pagination";

export default async function FaqPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = parsePage(pageParam);

  const [{ items: faqs, totalPages }, { dict, locale }] = await Promise.all([
    getPublicFaqsPage(page),
    getServerDictionary(),
  ]);

  const paginationLabels =
    locale === "pt"
      ? { previous: "Anterior", next: "Seguinte" }
      : { previous: "Previous", next: "Next" };

  return (
    <Section>
      <PageContainer>
        <FadeIn>
          <PageHeader title={dict.faq.title} subtitle={dict.faq.subtitle} />
        </FadeIn>
        <div className="mt-12 max-w-3xl">
          <FaqList key={page} faqs={faqs} />
          <Pagination
            page={page}
            totalPages={totalPages}
            basePath="/faq"
            labels={paginationLabels}
          />
        </div>
      </PageContainer>
    </Section>
  );
}
