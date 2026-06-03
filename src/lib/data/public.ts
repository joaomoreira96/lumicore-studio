import { createClient } from "@/lib/supabase/server";
import { createAnonClient } from "@/lib/supabase/anon";
import {
  clampPage,
  HOME_FEATURED_PAGE_SIZE,
  pageRange,
  PUBLIC_FAQ_PAGE_SIZE,
  PUBLIC_PROJECT_PAGE_SIZE,
  totalPages,
  type PaginatedResult,
} from "@/lib/pagination";
import type { Faq, Project } from "@/lib/types/database";
import type { ProjectFilter } from "@/lib/projects-filter";

export async function getPublicProjectsPage(
  page: number,
  pageSize = PUBLIC_PROJECT_PAGE_SIZE,
  filter: ProjectFilter = "all"
): Promise<PaginatedResult<Project>> {
  const supabase = await createClient();

  let countQuery = supabase
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("isVisible", true);
  if (filter !== "all") {
    countQuery = countQuery.eq("status", filter);
  }

  const { count, error: countError } = await countQuery;

  if (countError) {
    console.error("Failed to count projects:", countError.message);
    return { items: [], total: 0, page: 1, pageSize, totalPages: 1 };
  }

  const total = count ?? 0;
  const safePage = clampPage(page, total, pageSize);
  const { from, to } = pageRange(safePage, pageSize);

  let dataQuery = supabase
    .from("projects")
    .select("*")
    .eq("isVisible", true)
    .order("sort_order", { ascending: true })
    .range(from, to);
  if (filter !== "all") {
    dataQuery = dataQuery.eq("status", filter);
  }

  const { data, error } = await dataQuery;

  if (error) {
    console.error("Failed to fetch projects:", error.message);
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

export async function getPublicProjects(): Promise<Project[]> {
  const result = await getPublicProjectsPage(1, 1000);
  return result.items;
}

export async function getFeaturedProjectsPage(
  page: number,
  pageSize = HOME_FEATURED_PAGE_SIZE
): Promise<PaginatedResult<Project>> {
  const supabase = await createClient();

  const { count, error: countError } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("isVisible", true)
    .eq("featured", true);

  if (countError) {
    console.error("Failed to count featured projects:", countError.message);
    return { items: [], total: 0, page: 1, pageSize, totalPages: 1 };
  }

  const total = count ?? 0;
  const safePage = clampPage(page, total, pageSize);
  const { from, to } = pageRange(safePage, pageSize);

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("isVisible", true)
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Failed to fetch featured projects:", error.message);
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

export async function getFeaturedProjects(): Promise<Project[]> {
  const result = await getFeaturedProjectsPage(1, HOME_FEATURED_PAGE_SIZE);
  return result.items;
}

export async function getPublicProjectBySlug(
  slug: string
): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("isVisible", true)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch project:", error.message);
    return null;
  }

  return (data as Project | null) ?? null;
}

export async function getPublicFaqsPage(
  page: number,
  pageSize = PUBLIC_FAQ_PAGE_SIZE
): Promise<PaginatedResult<Faq>> {
  const supabase = await createClient();

  const { count, error: countError } = await supabase
    .from("faqs")
    .select("id", { count: "exact", head: true })
    .eq("isVisible", true);

  if (countError) {
    console.error("Failed to count FAQs:", countError.message);
    return { items: [], total: 0, page: 1, pageSize, totalPages: 1 };
  }

  const total = count ?? 0;
  const safePage = clampPage(page, total, pageSize);
  const { from, to } = pageRange(safePage, pageSize);

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("isVisible", true)
    .order("sort_order", { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Failed to fetch FAQs:", error.message);
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

export async function getPublicFaqs(): Promise<Faq[]> {
  const result = await getPublicFaqsPage(1, 1000);
  return result.items;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("projects")
    .select("slug")
    .eq("isVisible", true);

  if (error) return [];
  return (data ?? []).map((row) => row.slug as string);
}
