import { repos, type RepoConfig } from "@/content/github";
import { site } from "@/content/site";

export interface RepoView extends RepoConfig {
  url: string;
  stars: number;
  forks: number;
  updated: string | null;
  live: boolean;
}

interface ApiRepo {
  name: string;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
}

/**
 * Runs at build time (static export). Merges live GitHub stats into the
 * curated list. On any API failure (rate limit, offline) it falls back to the
 * manual config so the build never breaks.
 */
export async function getRepos(): Promise<{ repos: RepoView[]; live: boolean }> {
  const user = site.social.githubUser;
  const fallback = (): RepoView[] =>
    repos.map((r) => ({
      ...r,
      url: `https://github.com/${user}/${r.name}`,
      stars: 0,
      forks: 0,
      updated: null,
      live: false,
    }));

  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100`, {
      headers,
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = (await res.json()) as ApiRepo[];
    const byName = new Map(data.map((r) => [r.name, r]));
    const merged = repos
      .filter((r) => byName.has(r.name)) // never show a repo that no longer exists
      .map((r) => {
        const api = byName.get(r.name)!;
        return {
          ...r,
          url: api.html_url,
          language: api.language ?? r.language,
          stars: api.stargazers_count,
          forks: api.forks_count,
          updated: api.pushed_at,
          live: true,
        };
      });
    return { repos: merged.length ? merged : fallback(), live: merged.length > 0 };
  } catch (err) {
    console.warn("[github] falling back to manual repo config:", (err as Error).message);
    return { repos: fallback(), live: false };
  }
}
