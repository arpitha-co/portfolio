# Arpitha Thimmegowda — Portfolio

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.
Built as a fully static site (`out/`) that can be hosted anywhere.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

## Editing content (no component changes needed)

| What | File |
|---|---|
| Name, headline, intro, "Currently" banner, email, links, CV path | `src/content/site.ts` |
| Experience + About timeline | `src/content/experience.ts` |
| Projects (cards + detail pages at `/projects/<slug>/`) | `src/content/projects.ts` |
| Skills | `src/content/skills.ts` |
| "What I'm Exploring" + "Beyond Technology" | `src/content/interests.ts` |
| Education | `src/content/education.ts` |
| GitHub repos shown | `src/content/github.ts` |

- **Profile photo:** `public/images/profile.jpg`
- **CV:** replace `public/cv/Arpitha_Thimmegowda_CV.pdf` (same name)
- **Project images:** put them in `public/images/projects/` and list them in the project's `images` array (the first image is the cover). Projects with no images show a labelled schematic placeholder.
- **Hobby photos:** put them in `public/images/personal/` and set `photo` on the hobby.
- **Research progress:** update the `pipeline` stages of `vla-robotic-manipulation` (`done` / `active` / `next`). The Research section and project page update automatically.

## GitHub data

Repo stats (language, last push, stars/forks when > 0) are fetched from the GitHub API **at build time**, so rebuild to refresh them.
If the API fails or hits a rate limit, the curated values in `src/content/github.ts` are used instead and the build still succeeds.
Set `GITHUB_TOKEN` to avoid rate limits in CI.
The contribution calendar loads in the browser from `github-contributions-api.jogruber.de` and hides itself if that service is unavailable.

## Contact form

Without configuration, the form opens the visitor's mail app with the message pre-filled.
To receive messages directly: create a free form at https://formspree.io, then set

```
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

in `.env.local` (and in your host's environment variables).

## Deploy

- **Vercel:** import the folder/repo; no settings needed.
- **GitHub Pages / Netlify / any static host:** run `npm run build` and upload `out/`.

Before deploying, set `site.url` in `src/content/site.ts` to your real domain (used for SEO, sitemap and social previews).
