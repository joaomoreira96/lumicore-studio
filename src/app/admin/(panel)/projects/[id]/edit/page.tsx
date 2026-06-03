import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types/database";
import Link from "next/link";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("*").eq("id", id).single();

  if (!data) notFound();

  const project = data as Project;

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
