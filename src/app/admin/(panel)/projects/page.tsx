import Link from "next/link";
import { ProjectForm } from "@/components/admin/project-form";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types/database";
import { deleteProject } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  const projects = (data ?? []) as Project[];

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold">Projects</h1>
      <p className="mt-2 text-lumi-muted">Manage portfolio projects.</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-semibold">All Projects</h2>
          {projects.length === 0 ? (
            <p className="text-sm text-lumi-muted">No projects yet.</p>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-white/10 bg-lumi-bg-secondary p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="mt-1 text-xs text-lumi-muted">
                      {project.status} · order {project.sort_order}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/projects/${project.id}/edit`}>Edit</Link>
                    </Button>
                    <form action={deleteProject.bind(null, project.id)}>
                      <Button type="submit" variant="destructive" size="sm">
                        Delete
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold">Add Project</h2>
          <div className="mt-4 rounded-xl border border-white/10 bg-lumi-bg-secondary p-6">
            <ProjectForm />
          </div>
        </div>
      </div>
    </div>
  );
}
