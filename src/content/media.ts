import type { VideoAsset } from "./types";

/**
 * WebM (VP9) versions exist only where they are meaningfully smaller than the MP4.
 * Every clip has an MP4 (H.264, yuv420p, faststart) that plays in all browsers.
 * Keep this list in sync with /public/videos/**.webm.
 */
const WEBM = new Set([
  "connect4/demo",
  "racing/episode-10",
  "vla/cover-ft7000-success",
  "vla/ft5000-cube-fell",
  "vla/ft5000-success",
  "vla/ft5000-timeout",
  "vla/ft7000-cube-fell",
  "vla/ft7000-success",
  "vla/ft7000-timeout",
  "vla/zs-openvla-oft",
  "vla/zs-pi05",
]);

/** Build a VideoAsset from a path under /public/videos without extension. */
export function video(base: string, title: string, aspect = "16 / 9"): VideoAsset {
  const sources = [{ src: `/videos/${base}.mp4`, type: "video/mp4" }];
  if (WEBM.has(base)) sources.unshift({ src: `/videos/${base}.webm`, type: "video/webm" });
  return { sources, poster: `/videos/${base}.jpg`, aspect, title };
}
