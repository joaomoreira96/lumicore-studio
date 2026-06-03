import { createClient } from "@/lib/supabase/server";
import type { Faq, Project } from "@/lib/types/database";

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch projects:", error.message);
    return [];
  }

  return (data ?? []) as Project[];
}

export async function getFaqs(): Promise<Faq[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch FAQs:", error.message);
    return [];
  }

  return (data ?? []) as Faq[];
}
