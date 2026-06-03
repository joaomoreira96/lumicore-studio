import type { LocalizedString, Locale } from "@/lib/i18n/config";

export type ProjectStatus = "completed" | "in_development" | "archived";

export type MockProject = {
  id: string;
  slug: string;
  title: LocalizedString;
  shortDescription: LocalizedString;
  longDescription: LocalizedString;
  status: ProjectStatus;
  technologies: string[];
  featured: boolean;
  sortOrder: number;
  projectUrl: string | null;
  imageUrl: string | null;
  gallery: string[];
};

export const mockProjects: MockProject[] = [
  {
    id: "1",
    slug: "business-website",
    title: {
      en: "Business Website",
      pt: "Website Empresarial",
    },
    shortDescription: {
      en: "Business website with custom administration dashboard.",
      pt: "Website empresarial com painel de administração personalizado.",
    },
    longDescription: {
      en: "A complete business website with a custom administration dashboard. Built for clarity, performance and easy content management. The platform enables the client team to update pages, manage leads and monitor analytics without technical knowledge.",
      pt: "Um website empresarial completo com painel de administração personalizado. Construído para clareza, performance e gestão fácil de conteúdo. A plataforma permite à equipa do cliente atualizar páginas, gerir leads e monitorizar analytics sem conhecimentos técnicos.",
    },
    status: "completed",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    featured: true,
    sortOrder: 1,
    projectUrl: null,
    imageUrl: null,
    gallery: [],
  },
  {
    id: "2",
    slug: "future-games-hub",
    title: {
      en: "Future Games Hub",
      pt: "Future Games Hub",
    },
    shortDescription: {
      en: "Interactive multiplayer mini-games platform inspired by modern browser gaming experiences.",
      pt: "Plataforma interativa de mini-jogos multijogador inspirada em experiências modernas de jogos no browser.",
    },
    longDescription: {
      en: "An interactive multiplayer mini-games platform designed for real-time engagement. Players can join rooms, compete in browser-based games and track scores. Built with scalability and low-latency interactions in mind.",
      pt: "Uma plataforma interativa de mini-jogos multijogador desenhada para envolvimento em tempo real. Os jogadores podem entrar em salas, competir em jogos no browser e acompanhar pontuações. Construída com escalabilidade e interações de baixa latência.",
    },
    status: "in_development",
    technologies: ["Next.js", "React", "TypeScript", "Supabase"],
    featured: true,
    sortOrder: 2,
    projectUrl: null,
    imageUrl: null,
    gallery: [],
  },
  {
    id: "3",
    slug: "internal-ops-dashboard",
    title: {
      en: "Internal Ops Dashboard",
      pt: "Dashboard de Operações Internas",
    },
    shortDescription: {
      en: "Custom internal tool for workflow automation and team coordination.",
      pt: "Ferramenta interna personalizada para automação de fluxos e coordenação de equipa.",
    },
    longDescription: {
      en: "A bespoke internal operations dashboard that centralizes team workflows, task assignments and reporting. Designed to replace fragmented spreadsheets with a unified, role-based platform.",
      pt: "Um dashboard de operações internas feito à medida que centraliza fluxos de trabalho, atribuição de tarefas e relatórios. Desenhado para substituir folhas de cálculo fragmentadas por uma plataforma unificada baseada em roles.",
    },
    status: "archived",
    technologies: ["React", "TypeScript", "PostgreSQL"],
    featured: false,
    sortOrder: 3,
    projectUrl: null,
    imageUrl: null,
    gallery: [],
  },
];

export function getFeaturedProjects() {
  return mockProjects
    .filter((p) => p.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getAllProjects() {
  return [...mockProjects].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProjectBySlug(slug: string) {
  return mockProjects.find((p) => p.slug === slug) ?? null;
}

export function localizeProject(project: MockProject, locale: Locale) {
  return {
    ...project,
    title: project.title[locale],
    shortDescription: project.shortDescription[locale],
    longDescription: project.longDescription[locale],
  };
}

export const statusBadgeClass: Record<ProjectStatus, string> = {
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  in_development: "bg-lumi-blue/15 text-lumi-blue border-lumi-blue/20",
  archived: "bg-white/5 text-lumi-muted border-white/10",
};

export type MockFaq = {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
  sortOrder: number;
};

export const mockFaqs: MockFaq[] = [
  {
    id: "1",
    question: {
      en: "How much does a project cost?",
      pt: "Quanto custa um projeto?",
    },
    answer: {
      en: "Every project is unique. After an initial consultation, a custom proposal will be prepared.",
      pt: "Cada projeto é único. Após uma consulta inicial, será preparada uma proposta personalizada.",
    },
    sortOrder: 1,
  },
  {
    id: "2",
    question: {
      en: "How long does a project take?",
      pt: "Quanto tempo demora um projeto?",
    },
    answer: {
      en: "Project timelines depend on scope and complexity.",
      pt: "Os prazos dependem do âmbito e complexidade do projeto.",
    },
    sortOrder: 2,
  },
  {
    id: "3",
    question: {
      en: "Do you provide maintenance?",
      pt: "Oferecem manutenção?",
    },
    answer: {
      en: "Yes. Ongoing maintenance and support services are available.",
      pt: "Sim. Serviços de manutenção e suporte contínuos estão disponíveis.",
    },
    sortOrder: 3,
  },
  {
    id: "4",
    question: {
      en: "Can you build custom software?",
      pt: "Constroem software personalizado?",
    },
    answer: {
      en: "Yes. Lumicore Studio develops custom software tailored to business requirements.",
      pt: "Sim. A Lumicore Studio desenvolve software personalizado adaptado às necessidades do negócio.",
    },
    sortOrder: 4,
  },
];

export function localizeFaq(faq: MockFaq, locale: Locale) {
  return {
    ...faq,
    question: faq.question[locale],
    answer: faq.answer[locale],
  };
}

export const SITE_EMAIL = "hello@lumicore.studio";
export const SITE_GITHUB = "https://github.com/lumicore-studio";
export const SITE_LINKEDIN = "https://linkedin.com/company/lumicore-studio";
