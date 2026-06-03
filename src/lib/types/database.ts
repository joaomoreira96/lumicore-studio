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
  day: string;
  total_visits: number;
  created_at: string;
  updated_at: string;
}

export interface DailyDeviceStats {
  day: string;
  device: string;
  visits: number;
  created_at: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface SiteSettings {
  id: number;
  email: string | null;
  linkedin: string | null;
  github: string | null;
  facebook: string | null;
  instagram: string | null;
  footer_text_pt: string;
  footer_text_en: string;
  updated_at: string;
}
