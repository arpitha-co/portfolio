export type Status = "ongoing" | "completed";

export interface Link {
  label: string;
  href: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  org: string;
  place: string;
  kind: "education" | "work" | "research";
  current?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  org: string;
  orgUrl?: string;
  period: string;
  location: string;
  status: Status;
  summary: string;
  /** Short, verifiable highlights shown prominently. */
  metrics?: { value: string; label: string }[];
  bullets: string[];
  tech: string[];
}

export interface PipelineStage {
  label: string;
  state: "done" | "active" | "next";
}

export interface ProjectImage {
  src: string;
  alt: string;
  /** Use "contain" for diagrams/maps that must not be cropped. */
  fit?: "cover" | "contain";
}

export interface Project {
  slug: string;
  title: string;
  shortTitle?: string;
  tagline: string;
  period: string;
  status: Status;
  context: string;
  description: string;
  /** Detail-page body paragraphs. */
  details: string[];
  highlights: string[];
  tech: string[];
  /** Real results only. Leave empty rather than estimating. */
  results?: { value: string; label: string }[];
  resultsTable?: { caption: string; head: string[]; rows: string[][] };
  pipeline?: PipelineStage[];
  /** Extra titled lists on the detail page (e.g. challenges, results). */
  sections?: { title: string; items: string[] }[];
  /** "Current research direction" paragraph on the detail page. */
  direction?: string;
  images: ProjectImage[];
  /** Set to null until a public repository exists. Never invent URLs. */
  github: string | null;
  featured: boolean;
}

export interface SkillGroup {
  title: string;
  icon: "code" | "brain" | "eye" | "bot" | "server" | "wrench";
  items: string[];
}

export interface Interest {
  title: string;
  blurb: string;
  icon: string;
}

export interface Hobby {
  title: string;
  blurb: string;
  illustration: "yarn" | "whisk" | "compass" | "speech" | "spark";
  /** Optional photo in /public/images/personal/. */
  photo?: string;
}
