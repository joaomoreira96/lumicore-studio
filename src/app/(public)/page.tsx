import { FeaturedProjectsSection } from "@/components/home/featured-projects";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesPreviewSection } from "@/components/home/services-preview";
import { CtaSection } from "@/components/shared/cta-section";
import { getFeaturedProjectsPage } from "@/lib/data/public";
import { getServerDictionary } from "@/lib/i18n/server";
import { parsePage } from "@/lib/pagination";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = parsePage(pageParam);

  const [{ items: projects, totalPages }, { dict, locale }] = await Promise.all([
    getFeaturedProjectsPage(page),
    getServerDictionary(),
  ]);

  const paginationLabels =
    locale === "pt"
      ? { previous: "Anterior", next: "Seguinte" }
      : { previous: "Previous", next: "Next" };

  return (
    <>
      <HeroSection />
      <FeaturedProjectsSection
        projects={projects}
        page={page}
        totalPages={totalPages}
        title={dict.home.featuredTitle}
        subtitle={dict.home.featuredSubtitle}
        viewAllLabel={dict.home.viewAllProjects}
        paginationLabels={paginationLabels}
      />
      <ServicesPreviewSection />
      <CtaSection />
    </>
  );
}
