"use client";

/* Slim horizontal "soundtrack" band. Tapping "Play happy song" starts a HIDDEN
   YouTube player (Kungs - Never Going Home, from 0:30) with sound — the tap is
   the browser gesture, and it keeps playing as you scroll into the finale. */

import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "QH2a6V-W87U";
const START = 30;

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  unMute: () => void;
  setVolume: (v: number) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (el: string, opts: unknown) => YTPlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function HappySong() {
  const playerRef = useRef<YTPlayer | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [passed, setPassed] = useState(false);

  // once you scroll past the band, stick a mini-player at the top
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setPassed(!e.isIntersecting && e.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const init = () => {
      if (cancelled || !window.YT) return;
      playerRef.current = new window.YT.Player("happy-song-frame", {
        width: 320,
        height: 180,
        videoId: VIDEO_ID,
        playerVars: { start: START, controls: 0, disablekb: 1, modestbranding: 1, rel: 0, playsinline: 1, fs: 0 },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e: { data: number }) => {
            const S = window.YT!.PlayerState;
            if (e.data === S.PLAYING) setPlaying(true);
            else if (e.data === S.PAUSED || e.data === S.ENDED) setPlaying(false);
          },
        },
      });
    };
    if (window.YT && window.YT.Player) {
      init();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); init(); };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(s);
      }
    }
    return () => { cancelled = true; try { playerRef.current?.destroy(); } catch {} };
  }, []);

  const toggle = () => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) p.pauseVideo();
    else { p.unMute(); p.setVolume(100); p.playVideo(); }
  };

  return (
    <section ref={sectionRef} className="relative flex min-h-[36vh] items-center justify-center overflow-hidden px-6 py-16 text-center">
      <style dangerouslySetInnerHTML={{ __html: "@keyframes hsPing{0%{transform:scale(1);opacity:.4}70%,100%{transform:scale(1.35);opacity:0}}@keyframes hsBar{0%,100%{transform:scaleY(0.35)}50%{transform:scaleY(1)}}" }} />

      {/* sticky mini-player — appears once you scroll past the band, keeps the song controllable through the finale */}
      <div
        aria-hidden={!passed}
        className="fixed left-4 top-4 z-40 transition-all duration-300"
        style={{
          opacity: passed ? 1 : 0,
          transform: passed ? "translateY(0)" : "translateY(-12px)",
          pointerEvents: passed ? "auto" : "none",
        }}
      >
        <div
          className="flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] ring-1 ring-white/10 backdrop-blur"
          style={{ background: "rgba(26,22,18,0.82)" }}
        >
          <button
            type="button"
            onClick={toggle}
            disabled={!ready}
            aria-label={playing ? "Pause happy song" : "Play happy song"}
            className="grid size-9 place-items-center rounded-full transition-transform hover:scale-105 disabled:opacity-50"
            style={{ background: "var(--color-forme-bone)", color: "var(--color-forme-ink)" }}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
            )}
          </button>

          {/* animated equalizer while playing, static note otherwise */}
          <span className="flex h-4 items-end gap-[3px]" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-[3px] rounded-full"
                style={{
                  height: "100%",
                  background: "var(--color-forme-bone)",
                  transformOrigin: "bottom",
                  opacity: playing ? 0.9 : 0.4,
                  animation: playing ? `hsBar 0.9s ease-in-out ${i * 0.15}s infinite` : "none",
                  transform: playing ? undefined : "scaleY(0.4)",
                }}
              />
            ))}
          </span>

          <span className="text-[0.7rem] font-medium tracking-wide" style={{ color: "var(--color-forme-bone)" }}>
            {playing ? "Never Going Home" : "Play the song"}
          </span>
        </div>
      </div>

      {/* hidden audio player */}
      <div aria-hidden style={{ position: "fixed", left: "-9999px", bottom: 0, width: 1, height: 1, overflow: "hidden", pointerEvents: "none" }}>
        <div id="happy-song-frame" />
      </div>

      <div className="flex flex-col items-center gap-5">
        <p className="label">The soundtrack</p>

        <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
          <p className="font-[family-name:var(--font-cormorant)] text-2xl italic sm:text-[1.7rem]" style={{ color: "var(--color-forme-stone)" }}>
            Best enjoyed with the volume up.
          </p>

          <div className="flex items-center gap-3">
            {/* play — bold, compact, subtle pulse */}
            <span className="relative inline-flex">
              {ready && !playing ? (
                <span aria-hidden className="absolute inset-0 rounded-full" style={{ background: "var(--color-forme-ink)", animation: "hsPing 1.8s ease-out infinite" }} />
              ) : null}
              <button
                type="button"
                onClick={toggle}
                disabled={!ready}
                className="relative inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.16em] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ background: "var(--color-forme-ink)", color: "var(--color-forme-bone)" }}
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
                )}
                {playing ? "Pause happy song" : "Play happy song"}
              </button>
            </span>

            {/* listen on YouTube — ghost */}
            <a
              href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors hover:bg-[rgba(30,26,20,0.05)]"
              style={{ borderColor: "rgba(30,26,20,0.22)", color: "var(--color-forme-ink)" }}
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12zM9.8 15.3V8.7l6 3.3-6 3.3z" />
              </svg>
              Listen on YouTube
            </a>
          </div>
        </div>

        <p className="text-xs" style={{ color: "var(--color-forme-stone)", opacity: 0.72 }}>
          {playing ? "♪ Now playing - let it ride as you scroll." : "“Never Going Home” · Kungs"}
        </p>
      </div>
    </section>
  );
}
