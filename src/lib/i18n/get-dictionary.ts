import type { Locale } from "./config";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    projects: string;
    services: string;
    faq: string;
    contact: string;
    getInTouch: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    viewProjects: string;
    getInTouch: string;
  };
  home: {
    featuredTitle: string;
    featuredSubtitle: string;
    viewAllProjects: string;
    servicesTitle: string;
    servicesSubtitle: string;
    viewAllServices: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  projects: {
    title: string;
    subtitle: string;
    filters: {
      all: string;
      completed: string;
      in_development: string;
      archived: string;
    };
    status: {
      completed: string;
      in_development: string;
      archived: string;
    };
    viewProject: string;
    noProjects: string;
    technologies: string;
  };
  projectDetail: {
    back: string;
    visitProject: string;
    gallery: string;
    technologies: string;
    notFound: string;
  };
  services: {
    title: string;
    subtitle: string;
    web: { title: string; description: string };
    software: { title: string; description: string };
    interactive: { title: string; description: string };
  };
  faq: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    cta: string;
    workflow: string;
    name: string;
    email: string;
    company: string;
    message: string;
    send: string;
    success: string;
  };
  footer: {
    tagline: string;
    copyright: string;
    admin: string;
  };
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.dictionary),
  pt: () => import("./dictionaries/pt").then((m) => m.dictionary),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
