"use client";

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import type { VideoAsset } from "@/content/types";

export interface VideoPlayerHandle {
  play(): void;
  seek(seconds: number): void;
}

type Status = "idle" | "loading" | "ready" | "error";

const PLAY_EVENT = "portfolio:video-play";

/**
 * The single video component used across the site.
 *
 * - `player`  (default): poster + native controls (play/pause, scrub, mute,
 *   fullscreen). Never autoplays unless `autoPlay` is set after a user action.
 * - `ambient`: muted loop for card/page covers; plays only while visible and
 *   not at all for visitors who prefer reduced motion.
 *
 * Sources are attached only when the player is near the viewport (lazy
 * loading). WebM is offered first where available, MP4 is always present.
 * Starting one player pauses any other player on the page.
 */
export function VideoPlayer({
  video,
  variant = "player",
  autoPlay = false,
  fill = false,
  fit = "contain",
  className = "",
  ref,
}: {
  video: VideoAsset;
  variant?: "player" | "ambient";
  /** Start playing (muted) as soon as the clip can play. Use only after a user action. */
  autoPlay?: boolean;
  /** Fill a positioned parent (cover use) instead of sizing by the clip's aspect ratio. */
  fill?: boolean;
  /** How the frame fills the box: letterbox ("contain") or crop ("cover"). */
  fit?: "contain" | "cover";
  className?: string;
  ref?: Ref<VideoPlayerHandle>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const pending = useRef<{ play: boolean; seek: number | null }>({ play: autoPlay, seek: null });
  const ambient = variant === "ambient";
  const mp4 = video.sources.find((s) => s.type === "video/mp4")?.src ?? video.sources[0]?.src;

  // Lazy-load: attach sources once the player is within ~400px of the viewport.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  // Once sources are attached, (re)load and apply any pending play/seek.
  useEffect(() => {
    const el = videoRef.current;
    if (!near || !el) return;
    el.muted = true; // clips have no audio track; muted also satisfies autoplay policies
    el.defaultMuted = true;
    el.load();
  }, [near]);

  // Ambient clips: play while visible, pause otherwise.
  useEffect(() => {
    const el = videoRef.current;
    if (!ambient || !near || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ambient, near]);

  // Only one interactive player plays at a time.
  useEffect(() => {
    if (ambient) return;
    const onOther = (e: Event) => {
      const el = videoRef.current;
      if (el && (e as CustomEvent).detail !== el && !el.paused) el.pause();
    };
    document.addEventListener(PLAY_EVENT, onOther);
    return () => document.removeEventListener(PLAY_EVENT, onOther);
  }, [ambient]);

  useImperativeHandle(ref, () => ({
    play() {
      const el = videoRef.current;
      if (!near || !el || el.readyState < 1) {
        pending.current.play = true;
        setNear(true);
        return;
      }
      el.play().catch(() => {});
    },
    seek(seconds: number) {
      const el = videoRef.current;
      if (!near || !el || el.readyState < 1) {
        pending.current.seek = seconds;
        pending.current.play = true;
        setNear(true);
        return;
      }
      el.currentTime = seconds;
      el.play().catch(() => {});
    },
  }));

  const applyPending = () => {
    const el = videoRef.current;
    if (!el) return;
    if (pending.current.seek !== null) {
      el.currentTime = pending.current.seek;
      pending.current.seek = null;
    }
    if (pending.current.play) {
      pending.current.play = false;
      el.play().catch(() => {});
    }
  };

  const onError = () => setStatus("error");

  return (
    <div
      ref={wrapRef}
      className={`${fill ? "absolute inset-0" : "relative"} overflow-hidden bg-black ${className}`}
      style={fill ? undefined : { aspectRatio: video.aspect }}
    >
      <video
        ref={videoRef}
        poster={video.poster}
        aria-label={video.title}
        title={ambient ? undefined : video.title}
        muted
        playsInline
        loop={ambient}
        controls={!ambient}
        preload={near ? "metadata" : "none"}
        tabIndex={ambient ? -1 : undefined}
        className={`absolute inset-0 size-full ${fit === "cover" ? "object-cover" : "object-contain"}`}
        onLoadedMetadata={applyPending}
        onWaiting={() => setStatus("loading")}
        onSeeking={() => setStatus("loading")}
        onCanPlay={() => setStatus((s) => (s === "error" ? s : "ready"))}
        onPlaying={(e) => {
          setStatus("ready");
          if (!ambient) document.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: e.currentTarget }));
        }}
        onError={onError}
      >
        {near
          ? video.sources.map((s, i) => (
              <source key={s.src} src={s.src} type={s.type} onError={i === video.sources.length - 1 ? onError : undefined} />
            ))
          : null}
        Your browser can&apos;t play this video.
      </video>

      {status === "loading" && !ambient ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/30" role="status">
          <Loader2 className="size-7 animate-spin text-white/90" aria-hidden />
          <span className="sr-only">Loading video</span>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="absolute inset-0 grid place-items-center bg-black/75 p-4 text-center" role="alert">
          <div>
            <AlertTriangle className="mx-auto size-6 text-accent" aria-hidden />
            <p className="mt-2 text-sm text-fg">This video couldn&apos;t be loaded.</p>
            {!ambient && mp4 ? (
              <a href={mp4} className="mt-2 inline-block text-sm text-accent underline underline-offset-4">
                Open the video file
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
