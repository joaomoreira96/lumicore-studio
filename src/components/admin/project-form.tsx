"use client";

import { saveProject } from "@/lib/actions/admin";
import type { Project, ProjectStatus } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const statuses: ProjectStatus[] = ["completed", "in_development", "archived"];

export function ProjectForm({ project }: { project?: Project }) {
  return (
    <form action={saveProject} className="space-y-4">
      {project && <input type="hidden" name="id" value={project.id} />}

      <Field label="Title (EN)" name="title" defaultValue={project?.title} required />
      <Field label="Title (PT)" name="title_pt" defaultValue={project?.title_pt ?? ""} />
      <Field label="Slug" name="slug" defaultValue={project?.slug} placeholder="auto-from-title" />
      <TextField label="Description (EN)" name="description" defaultValue={project?.description} required />
      <TextField label="Description (PT)" name="description_pt" defaultValue={project?.description_pt ?? ""} />

      <div>
        <label htmlFor="status" className="mb-1.5 block text-sm text-lumi-muted">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={project?.status ?? "in_development"}
          className="w-full rounded-lg border border-white/10 bg-lumi-bg px-3 py-2 text-sm"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <Field label="Image URL" name="image_url" defaultValue={project?.image_url ?? ""} />
      <Field label="Project URL" name="project_url" defaultValue={project?.project_url ?? ""} />
      <Field
        label="Technologies (comma-separated)"
        name="technologies"
        defaultValue={project?.technologies.join(", ") ?? ""}
      />
      <Field
        label="Sort Order"
        name="sort_order"
        type="number"
        defaultValue={String(project?.sort_order ?? 0)}
      />

      <Button type="submit" className="bg-lumi-blue hover:bg-lumi-blue/90">
        {project ? "Update Project" : "Create Project"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-lumi-muted">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="border-white/10 bg-lumi-bg"
      />
    </div>
  );
}

function TextField({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-lumi-muted">
        {label}
      </label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        rows={3}
        className="border-white/10 bg-lumi-bg"
      />
    </div>
  );
}
