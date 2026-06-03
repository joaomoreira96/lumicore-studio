import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { getAdminProjectById } from "@/lib/data/admin";
import Link from "next/link";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getAdminProjectById(id);

  if (!project) notFound();

  return (
    <div>
      <Link href="/admin/projects" className="text-sm text-lumi-muted hover:text-lumi-text">
        ← Back to projects
      </Link>
      <h1 className="mt-4 font-heading text-3xl font-bold">Edit Project</h1>
      <div className="mt-8 max-w-xl rounded-xl border border-white/10 bg-lumi-bg-secondary p-6">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
