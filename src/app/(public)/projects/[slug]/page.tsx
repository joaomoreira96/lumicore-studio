import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/projects/project-detail-view";
import {
  getAllProjectSlugs,
  getPublicProjectBySlug,
} from "@/lib/data/public";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}
