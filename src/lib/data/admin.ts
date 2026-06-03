import {
  ADMIN_FAQ_PAGE_SIZE,
  ADMIN_PROJECT_PAGE_SIZE,
  clampPage,
  pageRange,
  totalPages,
  type PaginatedResult,
} from "@/lib/pagination";
import { verifyAdminSession } from "@/lib/auth/verify-admin";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Faq, Project } from "@/lib/types/database";

async function adminDb() {
  const session = await verifyAdminSession();
  if (!session.ok) return null;
  return createAdminClient();
}

export async function getAdminFaqsPage(
  page: number,
  pageSize = ADMIN_FAQ_PAGE_SIZE
): Promise<PaginatedResult<Faq>> {
  const supabase = await adminDb();
  if (!supabase) {
    return { items: [], total: 0, page: 1, pageSize, totalPages: 1 };
  }

  const { count, error: countError } = await supabase
    .from("faqs")
    .select("id", { count: "exact", head: true });

  if (countError) {
    console.error("Failed to count admin FAQs:", countError.message);
    return { items: [], total: 0, page: 1, pageSize, totalPages: 1 };
  }

  const total = count ?? 0;
  const safePage = clampPage(page, total, pageSize);
  const { from, to } = pageRange(safePage, pageSize);

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Failed to fetch admin FAQs:", error.message);
    return { items: [], total, page: safePage, pageSize, totalPages: totalPages(total, pageSize) };
  }

  return {
    items: (data ?? []) as Faq[],
    total,
    page: safePage,
    pageSize,
    totalPages: totalPages(total, pageSize),
  };
}

export async function getAdminFaqs(): Promise<Faq[]> {
  const result = await getAdminFaqsPage(1, 1000);
  return result.items;
}

export async function getAdminFaqById(id: string): Promise<Faq | null> {
  const supabase = await adminDb();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch admin FAQ:", error.message);
    return null;
  }

  return (data as Faq | null) ?? null;
}

export async function getAdminProjectsPage(
  page: number,
  pageSize = ADMIN_PROJECT_PAGE_SIZE
): Promise<PaginatedResult<Project>> {
  const supabase = await adminDb();
  if (!supabase) {
    return { items: [], total: 0, page: 1, pageSize, totalPages: 1 };
  }

  const { count, error: countError } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true });

  if (countError) {
    console.error("Failed to count admin projects:", countError.message);
    return { items: [], total: 0, page: 1, pageSize, totalPages: 1 };
  }

  const total = count ?? 0;
  const safePage = clampPage(page, total, pageSize);
  const { from, to } = pageRange(safePage, pageSize);

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Failed to fetch admin projects:", error.message);
    return {
      items: [],
      total,
      page: safePage,
      pageSize,
      totalPages: totalPages(total, pageSize),
    };
  }

  return {
    items: (data ?? []) as Project[],
    total,
    page: safePage,
    pageSize,
    totalPages: totalPages(total, pageSize),
  };
}

export async function getAdminProjects(): Promise<Project[]> {
  const result = await getAdminProjectsPage(1, 1000);
  return result.items;
}

export async function getAdminProjectById(id: string): Promise<Project | null> {
  const supabase = await adminDb();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch admin project:", error.message);
    return null;
  }

  return (data as Project | null) ?? null;
}

export async function getAdminProjectCount(): Promise<number> {
  const supabase = await adminDb();
  if (!supabase) return 0;

  const { count, error } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("Failed to count admin projects:", error.message);
    return 0;
  }

  return count ?? 0;
}

export async function getAdminFaqCount(): Promise<number> {
  const supabase = await adminDb();
  if (!supabase) return 0;

  const { count, error } = await supabase
    .from("faqs")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("Failed to count admin FAQs:", error.message);
    return 0;
  }

  return count ?? 0;
}
