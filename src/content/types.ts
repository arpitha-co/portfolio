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

/** A video file served from /public/videos. Built with `video()` in media.ts. */
export interface VideoAsset {
  /** Sources in preference order (WebM first when it is smaller, MP4 always). */
  sources: { src: string; type: string }[];
  poster: string;
  /** CSS aspect ratio of the encoded file, e.g. "16 / 9". */
  aspect: string;
  /** Accessible description of what the clip shows. */
  title: string;
}

export interface Demo {
  video: VideoAsset;
  label: string;
  caption: string;
  tone?: "ok" | "warn" | "fail" | "neutral";
}

export interface Chapter {
  /** Seconds from the start of the video. */
  t: number;
  label: string;
}

export interface Episode {
  episode: number;
  stage: "Early training" | "Intermediate training" | "Later training";
  /** What the recorded rollout shows: observed, not measured. */
  observation: string;
  video: VideoAsset;
}

/** One block of demonstrations on a project page. */
export type DemoBlock =
  | { kind: "grid"; title: string; intro?: string; columns: 1 | 2; items: Demo[] }
  | { kind: "feature"; title: string; intro?: string; video: VideoAsset; chapters?: Chapter[] }
  | { kind: "episodes"; title: string; intro?: string; episodes: Episode[] };

export interface ArchitectureStep {
  label: string;
  detail: string;
}

export interface Project {
  slug: string;
  title: string;
  shortTitle?: string;
  tagline: string;
  period: string;
  status: Status;
  context: string;
  /** One or two sentences for the project card. */
  description: string;
  /** What problem the project addresses. */
  problem: string;
  /** How it was approached (paragraphs). */
  approach: string[];
  /** System workflow, rendered as a step diagram. */
  architecture: ArchitectureStep[];
  /** What I built / did. Only things evidenced by code, CV or the user. */
  contribution: string[];
  highlights: string[];
  tech: string[];
  /** Real results only. Leave empty rather than estimating. */
  results?: { value: string; label: string }[];
  resultsTable?: { caption: string; head: string[]; rows: string[][] };
  pipeline?: PipelineStage[];
  /** Muted, looping clip on the card and page header (falls back to images[0]). */
  coverVideo?: VideoAsset;
  demos?: DemoBlock[];
  /** Extra titled lists on the detail page (e.g. challenges). */
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
