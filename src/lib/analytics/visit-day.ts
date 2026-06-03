export const VISIT_TRACKED_COOKIE = "lumi_visit_date";

/** Local calendar day YYYY-MM-DD (midnight-to-midnight in user timezone) */
export function getLocalDayString(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function readTrackedDayFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|;\s*)lumi_visit_date=([^;]+)/);
  return match?.[1] ?? null;
}

export function isValidDayString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}
