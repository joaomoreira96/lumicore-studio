import { ProjectDetailView } from "@/components/projects/project-detail-view";
import { mockProjects } from "@/lib/mock/data";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetailView slug={slug} />;
}

export function generateStaticParams() {
  return mockProjects.map((project) => ({ slug: project.slug }));
}
