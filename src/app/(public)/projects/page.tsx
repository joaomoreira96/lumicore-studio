import { ProjectGrid } from "@/components/projects/project-grid";
import { FadeIn } from "@/components/shared/fade-in";
import { PageContainer, PageHeader, Section } from "@/components/shared/page-shell";
import { Pagination } from "@/components/shared/pagination";
import { getPublicProjectsPage } from "@/lib/data/public";
import { getServerDictionary } from "@/lib/i18n/server";
import { parsePage } from "@/lib/pagination";
import { parseProjectFilter, projectFilterQuery } from "@/lib/projects-filter";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const { page: pageParam, status: statusParam } = await searchParams;
  const page = parsePage(pageParam);
  const filter = parseProjectFilter(statusParam);

  const [{ items: projects, totalPages }, { dict, locale }] = await Promise.all([
    getPublicProjectsPage(page, undefined, filter),
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
          <ProjectGrid projects={projects} filter={filter} />
          <Pagination
            page={page}
            totalPages={totalPages}
            basePath="/projects"
            labels={paginationLabels}
            queryParams={projectFilterQuery(filter)}
          />
        </div>
      </PageContainer>
    </Section>
  );
}
