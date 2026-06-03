export type ProjectStatus = "completed" | "in_development" | "archived";

export type AppUserRole = "admin";

export interface Project {
  id: string;
  title: string;
  title_pt: string | null;
  slug: string;
  description: string;
  description_pt: string | null;
  status: ProjectStatus;
  image_url: string | null;
  project_url: string | null;
  technologies: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Faq {
  id: string;
  question: string;
  question_pt: string | null;
  answer: string;
  answer_pt: string | null;
  sort_order: number;
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
  message: string;
}
