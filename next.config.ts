import type { NextConfig } from "next";

// Static export: `npm run build` writes a fully static site to ./out,
// deployable to Vercel, GitHub Pages, Netlify or any static host.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
