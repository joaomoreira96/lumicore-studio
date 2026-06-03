"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveProject, type ProjectFormState } from "@/lib/actions/admin";
import type { Project, ProjectStatus } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const statuses: ProjectStatus[] = ["completed", "in_development", "archived"];

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(saveProject, null);

  useEffect(() => {
    if (state?.success && project) {
      router.refresh();
    }
  }, [state, project, router]);

  return (
    <form action={formAction} className="space-y-4">
      {project && <input type="hidden" name="id" value={project.id} />}
      {project?.image_url && (
        <input type="hidden" name="existing_image_url" value={project.image_url} />
      )}

      <FormFeedback state={state} />

      <Field label="Title" name="title" defaultValue={project?.title} required />
      <Field label="Slug" name="slug" defaultValue={project?.slug} placeholder="auto-from-title" />
      <TextField
        label="Short description"
        name="short_description"
        defaultValue={project?.short_description}
        required
      />
      <TextField
        label="Long description"
        name="long_description"
        defaultValue={project?.long_description ?? ""}
        rows={5}
      />

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

      <ImageField currentUrl={project?.image_url} />
      <Field
        label="Site URL"
        name="url_site"
        type="url"
        defaultValue={project?.url_site ?? project?.project_url ?? ""}
        placeholder="https://example.com"
      />
      <Field
        label="Technologies (comma-separated)"
        name="technologies"
        defaultValue={project?.technologies?.join(", ") ?? ""}
      />
      <Field
        label="Sort order"
        name="sort_order"
        type="number"
        defaultValue={String(project?.sort_order ?? 0)}
      />

      <CheckboxField
        label="Featured on homepage"
        name="featured"
        defaultChecked={project?.featured ?? true}
      />
      <CheckboxField
        label="Visible on public website"
        name="isVisible"
        defaultChecked={project?.isVisible ?? false}
        hint="When disabled, project is only visible in admin."
      />

      <Button
        type="submit"
        disabled={pending}
        className="bg-lumi-blue hover:bg-lumi-blue/90"
      >
        {pending ? "A guardar…" : project ? "Update project" : "Create project"}
      </Button>
    </form>
  );
}

function FormFeedback({ state }: { state: ProjectFormState }) {
  if (!state?.success && !state?.error) return null;

  return (
    <div
      role="status"
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        state.success
          ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-400"
          : "border-red-500/25 bg-red-500/10 text-red-400"
      )}
    >
      {state.success ? state.message : state.error}
    </div>
  );
}

function ImageField({ currentUrl }: { currentUrl?: string | null }) {
  return (
    <div>
      <label htmlFor="image" className="mb-1.5 block text-sm text-lumi-muted">
        Project image
      </label>
      {currentUrl && (
        <div className="mb-3 overflow-hidden rounded-lg border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={currentUrl} alt="Current project" className="max-h-40 w-full object-cover" />
          <p className="px-3 py-2 text-xs text-lumi-muted">
            Imagem atual — escolhe um ficheiro para substituir
          </p>
        </div>
      )}
      <Input
        id="image"
        name="image"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="border-white/10 bg-lumi-bg file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-sm file:text-lumi-text"
      />
      <p className="mt-1.5 text-xs text-lumi-muted">JPEG, PNG, WebP ou GIF — máx. 5 MB</p>
    </div>
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
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  rows?: number;
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
        rows={rows}
        className="border-white/10 bg-lumi-bg"
      />
    </div>
  );
}

function CheckboxField({
  label,
  name,
  defaultChecked,
  hint,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 bg-lumi-bg/50 p-3">
      <input
        type="checkbox"
        name={name}
        value="true"
        defaultChecked={defaultChecked}
        className="mt-0.5 size-4 rounded border-white/20 accent-lumi-blue"
      />
      <span>
        <span className="block text-sm font-medium text-lumi-text">{label}</span>
        {hint && <span className="mt-0.5 block text-xs text-lumi-muted">{hint}</span>}
      </span>
    </label>
  );
}
