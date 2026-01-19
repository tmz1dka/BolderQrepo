"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type LevelEventDetail = { level: number; playing: boolean };

export function LogoWave() {
  const letters = useMemo(() => "BÅLDER QUARTET".split(""), []);
  const [level, setLevel] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<LevelEventDetail>).detail;
      if (!detail) return;
      setLevel(detail.level);
      setPlaying(detail.playing);
    };
    window.addEventListener("balder-audio-level", handler as EventListener);
    return () => window.removeEventListener("balder-audio-level", handler as EventListener);
  }, []);

  useEffect(() => {
    const loop = (now: number) => {
      setTime(now);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current ?? 0);
  }, []);

  const intensity = playing ? Math.max(0, Math.min(1, level)) : 0;
  const amplitude = 12; // max px movement
  const speed = 240; // lower is faster

  return (
    <div
      className="logo-wave"
      style={{
        fontFamily: "var(--font-poppins)",
        gap: "6px",
        fontSize: "clamp(32px, 6vw, 64px)",
      }}
    >
      {letters.map((char, idx) => {
        const phase = idx * 0.6;
        const offset = Math.sin(time / speed + phase) * amplitude * intensity;
        return (
          <span
            key={`${char}-${idx}`}
            style={{
              transform: `translateY(${offset}px)`,
              transition: "transform 0.08s linear",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
