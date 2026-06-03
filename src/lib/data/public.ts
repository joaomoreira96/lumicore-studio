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

const PROJECT_LIST_COLUMNS =
  "id, slug, title_pt, title_en, short_description_pt, short_description_en, status, image_url, technologies, featured, sort_order, isVisible";

const FAQ_LIST_COLUMNS =
  "id, question_pt, answer_pt, question_en, answer_en, sort_order, isVisible";

export async function getPublicProjectsPage(
  page: number,
  pageSize = PUBLIC_PROJECT_PAGE_SIZE,
  filter: ProjectFilter = "all"
): Promise<PaginatedResult<Project>> {
  const supabase = createAnonClient();
  const requestedPage = Math.max(1, page);
  const { from, to } = pageRange(requestedPage, pageSize);

  let countQuery = supabase
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("isVisible", true);
  let dataQuery = supabase
    .from("projects")
    .select(PROJECT_LIST_COLUMNS)
    .eq("isVisible", true)
    .order("sort_order", { ascending: true })
    .range(from, to);

  if (filter !== "all") {
    countQuery = countQuery.eq("status", filter);
    dataQuery = dataQuery.eq("status", filter);
  }

  const [{ count, error: countError }, { data, error }] = await Promise.all([
    countQuery,
    dataQuery,
  ]);

  if (countError) {
    console.error("Failed to count projects:", countError.message);
    return { items: [], total: 0, page: 1, pageSize, totalPages: 1 };
  }

  const total = count ?? 0;
  const safePage = clampPage(requestedPage, total, pageSize);

  if (safePage !== requestedPage && total > 0) {
    const retryRange = pageRange(safePage, pageSize);
    let retryQuery = supabase
      .from("projects")
      .select(PROJECT_LIST_COLUMNS)
      .eq("isVisible", true)
      .order("sort_order", { ascending: true })
      .range(retryRange.from, retryRange.to);
    if (filter !== "all") {
      retryQuery = retryQuery.eq("status", filter);
    }
    const { data: retryData, error: retryError } = await retryQuery;
    if (retryError) {
      console.error("Failed to fetch projects:", retryError.message);
    }
    return {
      items: (retryData ?? []) as Project[],
      total,
      page: safePage,
      pageSize,
      totalPages: totalPages(total, pageSize),
    };
  }

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
  const supabase = createAnonClient();
  const requestedPage = Math.max(1, page);
  const { from, to } = pageRange(requestedPage, pageSize);

  const [{ count, error: countError }, { data, error }] = await Promise.all([
    supabase
      .from("projects")
      .select("id", { count: "exact", head: true })
      .eq("isVisible", true)
      .eq("featured", true),
    supabase
      .from("projects")
      .select(PROJECT_LIST_COLUMNS)
      .eq("isVisible", true)
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .range(from, to),
  ]);

  if (countError) {
    console.error("Failed to count featured projects:", countError.message);
    return { items: [], total: 0, page: 1, pageSize, totalPages: 1 };
  }

  const total = count ?? 0;
  const safePage = clampPage(requestedPage, total, pageSize);

  if (safePage !== requestedPage && total > 0) {
    const retryRange = pageRange(safePage, pageSize);
    const { data: retryData, error: retryError } = await supabase
      .from("projects")
      .select(PROJECT_LIST_COLUMNS)
      .eq("isVisible", true)
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .range(retryRange.from, retryRange.to);

    if (retryError) {
      console.error("Failed to fetch featured projects:", retryError.message);
    }

    return {
      items: (retryData ?? []) as Project[],
      total,
      page: safePage,
      pageSize,
      totalPages: totalPages(total, pageSize),
    };
  }

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
  const supabase = createAnonClient();
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
  const supabase = createAnonClient();
  const requestedPage = Math.max(1, page);
  const { from, to } = pageRange(requestedPage, pageSize);

  const [{ count, error: countError }, { data, error }] = await Promise.all([
    supabase
      .from("faqs")
      .select("id", { count: "exact", head: true })
      .eq("isVisible", true),
    supabase
      .from("faqs")
      .select(FAQ_LIST_COLUMNS)
      .eq("isVisible", true)
      .order("sort_order", { ascending: true })
      .range(from, to),
  ]);

  if (countError) {
    console.error("Failed to count FAQs:", countError.message);
    return { items: [], total: 0, page: 1, pageSize, totalPages: 1 };
  }

  const total = count ?? 0;
  const safePage = clampPage(requestedPage, total, pageSize);

  if (safePage !== requestedPage && total > 0) {
    const retryRange = pageRange(safePage, pageSize);
    const { data: retryData, error: retryError } = await supabase
      .from("faqs")
      .select(FAQ_LIST_COLUMNS)
      .eq("isVisible", true)
      .order("sort_order", { ascending: true })
      .range(retryRange.from, retryRange.to);

    if (retryError) {
      console.error("Failed to fetch FAQs:", retryError.message);
    }

    return {
      items: (retryData ?? []) as Faq[],
      total,
      page: safePage,
      pageSize,
      totalPages: totalPages(total, pageSize),
    };
  }

  if (error) {
    console.error("Failed to fetch FAQs:", error.message);
    return {
      items: [],
      total,
      page: safePage,
      pageSize,
      totalPages: totalPages(total, pageSize),
    };
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
