import Link from "next/link";
import { ProjectForm } from "@/components/admin/project-form";
import {
  VisibilityBadge,
  VisibilityToggle,
} from "@/components/admin/visibility-toggle";
import { Pagination } from "@/components/shared/pagination";
import { deleteProject, toggleProjectVisibility } from "@/lib/actions/admin";
import { getAdminProjectsPage } from "@/lib/data/admin";
import { parsePage } from "@/lib/pagination";
import { Button } from "@/components/ui/button";

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = parsePage(pageParam);
  const { items: projects, totalPages, total } = await getAdminProjectsPage(page);

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold">Projects</h1>
      <p className="mt-2 text-lumi-muted">
        Manage portfolio projects. Toggle visibility to show or hide on the public site.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-heading text-lg font-semibold">All projects</h2>
            {total > 0 && (
              <span className="text-xs text-lumi-muted">{total} total</span>
            )}
          </div>
          {projects.length === 0 ? (
            <p className="text-sm text-lumi-muted">No projects yet.</p>
          ) : (
            <>
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-white/10 bg-lumi-bg-secondary p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{project.title_pt}</p>
                        <VisibilityBadge isVisible={project.isVisible} />
                        {project.featured && (
                          <span className="rounded-md bg-lumi-blue/15 px-2 py-0.5 text-xs text-lumi-blue">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-lumi-muted">{project.title_en}</p>
                      <p className="mt-1 text-xs text-lumi-muted">
                        {project.status} · order {project.sort_order}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <VisibilityToggle
                        id={project.id}
                        isVisible={project.isVisible}
                        onToggle={toggleProjectVisibility}
                      />
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
              ))}
              <Pagination page={page} totalPages={totalPages} basePath="/admin/projects" />
            </>
          )}
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold">Add project</h2>
          <div className="mt-4 rounded-xl border border-white/10 bg-lumi-bg-secondary p-6">
            <ProjectForm />
          </div>
        </div>
      </div>
    </div>
  );
}
