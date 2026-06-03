import { ProjectGrid } from "@/components/projects/project-grid";
import { FadeIn } from "@/components/shared/fade-in";
import { PageContainer, PageHeader, Section } from "@/components/shared/page-shell";
import { Pagination } from "@/components/shared/pagination";
import { getPublicProjectsPage } from "@/lib/data/public";
import { getServerDictionary } from "@/lib/i18n/server";
import { parsePage } from "@/lib/pagination";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = parsePage(pageParam);

  const [{ items: projects, totalPages }, { dict, locale }] = await Promise.all([
    getPublicProjectsPage(page),
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
          <PageHeader title={dict.projects.title} subtitle={dict.projects.subtitle} />
        </FadeIn>
        <div className="mt-12">
          <ProjectGrid key={page} projects={projects} />
          <Pagination
            page={page}
            totalPages={totalPages}
            basePath="/projects"
            labels={paginationLabels}
          />
        </div>
      </PageContainer>
    </Section>
  );
}
