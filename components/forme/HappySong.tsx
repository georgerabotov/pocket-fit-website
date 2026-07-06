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
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

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
    <section className="relative flex min-h-[52vh] items-center justify-center overflow-hidden px-6 py-24">
      <style dangerouslySetInnerHTML={{ __html: "@keyframes hsPing{0%{transform:scale(1);opacity:.55}70%,100%{transform:scale(1.4);opacity:0}}" }} />

      {/* hidden audio player */}
      <div aria-hidden style={{ position: "fixed", left: "-9999px", bottom: 0, width: 1, height: 1, overflow: "hidden", pointerEvents: "none" }}>
        <div id="happy-song-frame" />
      </div>

      {/* bold soundtrack card */}
      <div
        className="w-full max-w-lg rounded-[1.75rem] px-8 py-10 text-center shadow-[0_40px_80px_-40px_rgba(30,26,20,0.5)] sm:px-12"
        style={{ background: "var(--color-forme-ink)", color: "var(--color-forme-bone)" }}
      >
        <div className="mx-auto mb-5 grid size-12 place-items-center rounded-full" style={{ background: "rgba(243,237,226,0.12)" }}>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </div>

        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.34em]" style={{ color: "rgba(243,237,226,0.6)" }}>
          The soundtrack
        </p>
        <h3 className="mt-3 font-[family-name:var(--font-cormorant)] text-3xl italic sm:text-4xl">
          Best enjoyed with the volume up.
        </h3>
        <p className="mt-2 text-sm" style={{ color: "rgba(243,237,226,0.6)" }}>
          &ldquo;Never Going Home&rdquo; &middot; Kungs
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/* primary — big, bold */}
          <span className="relative inline-flex">
            {ready && !playing ? (
              <span aria-hidden className="absolute inset-0 rounded-full" style={{ background: "var(--color-forme-bone)", animation: "hsPing 1.8s ease-out infinite" }} />
            ) : null}
            <button
              type="button"
              onClick={toggle}
              disabled={!ready}
              className="relative inline-flex items-center gap-3 rounded-full px-9 py-4 text-base font-bold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ background: "var(--color-forme-bone)", color: "var(--color-forme-ink)" }}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
              )}
              {playing ? "Pause happy song" : "Play happy song"}
            </button>
          </span>

          {/* secondary — listen on YouTube */}
          <a
            href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-4 text-[0.82rem] font-medium uppercase tracking-[0.14em] transition-colors"
            style={{ borderColor: "rgba(243,237,226,0.28)", color: "var(--color-forme-bone)" }}
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
              <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12zM9.8 15.3V8.7l6 3.3-6 3.3z" />
            </svg>
            Listen on YouTube
          </a>
        </div>

        <p className="mt-5 text-xs" style={{ color: "rgba(243,237,226,0.55)" }}>
          {playing ? "♪ Now playing - let it ride as you scroll." : "One tap, then keep scrolling."}
        </p>
      </div>
    </section>
  );
}
