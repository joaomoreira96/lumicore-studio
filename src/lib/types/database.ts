export type ProjectStatus = "completed" | "in_development" | "archived";

export type AppUserRole = "admin";

export interface Project {
  id: string;
  slug: string;
  title_pt: string;
  title_en: string;
  short_description_pt: string;
  short_description_en: string;
  long_description_pt: string | null;
  long_description_en: string | null;
  status: ProjectStatus;
  image_url: string | null;
  project_url: string | null;
  url_site: string | null;
  technologies: string[];
  featured: boolean;
  sort_order: number;
  isVisible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Faq {
  id: string;
  question_pt: string;
  answer_pt: string;
  question_en: string;
  answer_en: string;
  sort_order: number;
  isVisible: boolean;
  created_at: string;
  updated_at: string;
}

export interface AppUser {
  id: string;
  email: string;
  role: AppUserRole;
  created_at: string;
}

export interface DailyStats {
  id: string;
  date: string;
  visitors: number;
  visits: number;
  created_at: string;
  updated_at: string;
}

export interface DailyDeviceStats {
  id: string;
  date: string;
  device_type: string;
  visitors: number;
}

export interface DailyCityStats {
  id: string;
  date: string;
  country: string | null;
  city: string | null;
  visitors: number;
}

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  message: string;
}
