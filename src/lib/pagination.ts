export const ADMIN_FAQ_PAGE_SIZE = 5;
export const PUBLIC_FAQ_PAGE_SIZE = 10;
export const ADMIN_PROJECT_PAGE_SIZE = 5;
export const PUBLIC_PROJECT_PAGE_SIZE = 4;
export const HOME_FEATURED_PAGE_SIZE = 4;

export function parsePage(param: string | undefined): number {
  const n = Number(param);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
}

export function totalPages(total: number, pageSize: number): number {
  if (total === 0) return 1;
  return Math.ceil(total / pageSize);
}

export function pageRange(page: number, pageSize: number): { from: number; to: number } {
  const from = (page - 1) * pageSize;
  return { from, to: from + pageSize - 1 };
}

export function clampPage(page: number, total: number, pageSize: number): number {
  const max = totalPages(total, pageSize);
  return Math.min(Math.max(1, page), max);
}

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
