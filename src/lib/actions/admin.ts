"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminUserId } from "@/lib/auth/is-admin-server";
import { uploadProjectImage } from "@/lib/storage/project-images";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { ProjectStatus } from "@/lib/types/database";

export type FaqFormState = {
  success?: boolean;
  message?: string;
  error?: string;
} | null;

export type ProjectFormState = FaqFormState;

async function requireAdminSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const allowed = await isAdminUserId(user.id);
  if (!allowed) throw new Error("Unauthorized");

  return user;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function requireAdminDb() {
  await requireAdminSession();
  return createAdminClient();
}

function parseCheckbox(value: FormDataEntryValue | null) {
  return value === "true" || value === "on";
}

function revalidatePublicProjectPaths() {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/faq");
}

export async function saveProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  try {
    const supabase = await requireAdminDb();

    const id = (formData.get("id") as string | null) || null;
    const projectId = id ?? crypto.randomUUID();
    const titlePt = formData.get("title_pt") as string;
    const titleEn = formData.get("title_en") as string;
    const shortDescriptionPt = formData.get("short_description_pt") as string;
    const shortDescriptionEn = formData.get("short_description_en") as string;
    const longDescriptionPt = (formData.get("long_description_pt") as string) || null;
    const longDescriptionEn = (formData.get("long_description_en") as string) || null;
    const status = formData.get("status") as ProjectStatus;
    const urlSite = (formData.get("url_site") as string) || null;
    const existingImageUrl = (formData.get("existing_image_url") as string) || null;
    const imageFile = formData.get("image") as File | null;
    const technologies = ((formData.get("technologies") as string) || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const sortOrder = Number(formData.get("sort_order") || 0);
    const featured = parseCheckbox(formData.get("featured"));
    const isVisible = parseCheckbox(formData.get("isVisible"));
    const slug = slugify(
      (formData.get("slug") as string) || titleEn || titlePt
    );

    let imageUrl = existingImageUrl || null;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadProjectImage(imageFile, projectId);
    }

    const payload = {
      slug,
      title_pt: titlePt,
      title_en: titleEn,
      short_description_pt: shortDescriptionPt,
      short_description_en: shortDescriptionEn,
      long_description_pt: longDescriptionPt,
      long_description_en: longDescriptionEn,
      status,
      image_url: imageUrl,
      url_site: urlSite,
      technologies,
      sort_order: sortOrder,
      featured,
      isVisible,
    };

    if (id) {
      const { error } = await supabase.from("projects").update(payload).eq("id", id);
      if (error) return { error: error.message };
    } else {
      const { error } = await supabase.from("projects").insert({ ...payload, id: projectId });
      if (error) return { error: error.message };
    }

    revalidatePublicProjectPaths();
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${slug}`);
    if (id) revalidatePath(`/admin/projects/${id}/edit`);

    return {
      success: true,
      message: id ? "Projeto atualizado com sucesso." : "Projeto criado com sucesso.",
    };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Erro ao guardar o projeto.",
    };
  }
}

export async function deleteProject(id: string) {
  const supabase = await requireAdminDb();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePublicProjectPaths();
  revalidatePath("/admin/projects");
}

export async function toggleProjectVisibility(id: string, isVisible: boolean) {
  const supabase = await requireAdminDb();
  const { error } = await supabase
    .from("projects")
    .update({ isVisible })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePublicProjectPaths();
  revalidatePath("/admin/projects");
}

export async function saveFaq(
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  try {
    const supabase = await requireAdminDb();

    const id = formData.get("id") as string | null;
    const questionPt = formData.get("question_pt") as string;
    const answerPt = formData.get("answer_pt") as string;
    const questionEn = formData.get("question_en") as string;
    const answerEn = formData.get("answer_en") as string;
    const sortOrder = Number(formData.get("sort_order") || 0);
    const isVisible = parseCheckbox(formData.get("isVisible"));

    const payload = {
      question_pt: questionPt,
      answer_pt: answerPt,
      question_en: questionEn,
      answer_en: answerEn,
      sort_order: sortOrder,
      isVisible,
    };

    if (id) {
      const { error } = await supabase.from("faqs").update(payload).eq("id", id);
      if (error) return { error: error.message };
    } else {
      const { error } = await supabase.from("faqs").insert(payload);
      if (error) return { error: error.message };
    }

    revalidatePublicProjectPaths();
    revalidatePath("/admin/faqs");
    if (id) revalidatePath(`/admin/faqs/${id}/edit`);

    return {
      success: true,
      message: id ? "FAQ atualizada com sucesso." : "FAQ criada com sucesso.",
    };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Erro ao guardar a FAQ.",
    };
  }
}

export async function deleteFaq(id: string) {
  const supabase = await requireAdminDb();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePublicProjectPaths();
  revalidatePath("/admin/faqs");
}

export async function toggleFaqVisibility(id: string, isVisible: boolean) {
  const supabase = await requireAdminDb();
  const { error } = await supabase
    .from("faqs")
    .update({ isVisible })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePublicProjectPaths();
  revalidatePath("/admin/faqs");
}

export async function markContactAnswered(id: string, isAnswered: boolean) {
  await requireAdminSession();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("contact_requests")
    .update({ isAnswered })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/contacts");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
