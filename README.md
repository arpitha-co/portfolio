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
| Projects: problem, approach, architecture, contribution, results, demos | `src/content/projects.ts` |
| Which videos have a WebM version | `src/content/media.ts` |
| Skills | `src/content/skills.ts` |
| "What I'm Exploring" + "Beyond Technology" | `src/content/interests.ts` |
| Education | `src/content/education.ts` |
| GitHub repos shown | `src/content/github.ts` |

- **Profile photo:** `public/images/profile.jpg`
- **CV:** replace `public/cv/Arpitha_Thimmegowda_CV.pdf` (same name)
- **Images:** `public/images/projects/`, listed in a project's `images` (first image = cover if there is no `coverVideo`).
- **Research progress:** edit the `pipeline` stages of `vla-robotic-manipulation` (`done` / `active` / `next`).

## Videos

All videos live in `public/videos/<project>/` and are played by one component, `src/components/VideoPlayer.tsx`
(lazy loading, poster, loading spinner, error message with a direct file link, native controls incl. fullscreen,
one player at a time). Clips have no audio track.

Each clip needs `<name>.mp4` (H.264) and `<name>.jpg` (poster); a `<name>.webm` (VP9) is optional and is only
used if listed in `src/content/media.ts`. Reference clips in `projects.ts` with `video("<project>/<name>", "description")`.

```bash
# MP4 for the web (no audio, starts streaming immediately)
ffmpeg -i input.mov -an -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart out.mp4
# Poster frame
ffmpeg -ss 5 -i out.mp4 -frames:v 1 -q:v 3 out.jpg
# Optional WebM (only keep it if it is clearly smaller than the MP4)
ffmpeg -i out.mp4 -an -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 out.webm
```

Demo layouts (`demos` in `projects.ts`): `grid` (captioned clips), `feature` (one long video with chapter buttons)
and `episodes` (tabbed training-episode selector).

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

The site is deployed on **Vercel** from the GitHub repo `arpitha-co/portfolio`: every push to `main` rebuilds and
publishes it automatically. `npm run build` produces a fully static site in `out/` that also works on any static host.

If you change domains, update `site.url` in `src/content/site.ts` (used for canonical URLs, sitemap and link previews).
