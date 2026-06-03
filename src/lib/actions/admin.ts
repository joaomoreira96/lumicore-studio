"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ProjectStatus } from "@/lib/types/database";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data: appUser } = await supabase
    .from("app_users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!appUser || appUser.role !== "admin") throw new Error("Unauthorized");

  return supabase;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveProject(formData: FormData) {
  const supabase = await requireAdmin();

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const titlePt = (formData.get("title_pt") as string) || null;
  const description = formData.get("description") as string;
  const descriptionPt = (formData.get("description_pt") as string) || null;
  const status = formData.get("status") as ProjectStatus;
  const imageUrl = (formData.get("image_url") as string) || null;
  const projectUrl = (formData.get("project_url") as string) || null;
  const technologies = ((formData.get("technologies") as string) || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const sortOrder = Number(formData.get("sort_order") || 0);
  const slug = slugify((formData.get("slug") as string) || title);

  const payload = {
    title,
    title_pt: titlePt,
    slug,
    description,
    description_pt: descriptionPt,
    status,
    image_url: imageUrl,
    project_url: projectUrl,
    technologies,
    sort_order: sortOrder,
  };

  if (id) {
    const { error } = await supabase.from("projects").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("projects").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function saveFaq(formData: FormData) {
  const supabase = await requireAdmin();

  const id = formData.get("id") as string | null;
  const question = formData.get("question") as string;
  const questionPt = (formData.get("question_pt") as string) || null;
  const answer = formData.get("answer") as string;
  const answerPt = (formData.get("answer_pt") as string) || null;
  const sortOrder = Number(formData.get("sort_order") || 0);

  const payload = {
    question,
    question_pt: questionPt,
    answer,
    answer_pt: answerPt,
    sort_order: sortOrder,
  };

  if (id) {
    const { error } = await supabase.from("faqs").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("faqs").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin/faqs");
}

export async function deleteFaq(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/faqs");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
