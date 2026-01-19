"use client";

import { useEffect, useRef, useState } from "react";

type LevelEvent = {
  level: number;
  playing: boolean;
};

export function AudioWidget() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const rafRef = useRef<number>();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      setIsPlaying(false);
      dispatchLevel({ level: 0, playing: false });
    };
    const handleCanPlay = () => setIsReady(true);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplay", handleCanPlay);
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplay", handleCanPlay);
      cancelAnimationFrame(rafRef.current ?? 0);
    };
  }, []);

  const dispatchLevel = (detail: LevelEvent) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent<LevelEvent>("balder-audio-level", { detail }));
  };

  const ensureAnalyser = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (!sourceRef.current) {
      sourceRef.current = ctx.createMediaElementSource(audio);
    }
    if (!analyserRef.current) {
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      sourceRef.current.connect(analyser);
      analyser.connect(ctx.destination);
    }
  };

  const startLevelLoop = () => {
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    if (!analyser || !dataArray) return;

    const loop = () => {
      analyser.getByteTimeDomainData(dataArray);
      let sumSquares = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const value = dataArray[i] - 128;
        sumSquares += value * value;
      }
      const rms = Math.sqrt(sumSquares / dataArray.length) / 128; // 0..~1
      const level = Math.min(1, rms * 4); // scale up a bit
      dispatchLevel({ level, playing: true });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  };

  const startFromOffset = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const offset = 142; // seconds
    if (audio.duration && offset > audio.duration) {
      audio.currentTime = 0;
    } else {
      audio.currentTime = offset;
    }
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      cancelAnimationFrame(rafRef.current ?? 0);
      dispatchLevel({ level: 0, playing: false });
      return;
    }

    ensureAnalyser();
    if (audioCtxRef.current?.state === "suspended") {
      await audioCtxRef.current.resume();
    }

    startFromOffset();
    try {
      await audio.play();
      setIsPlaying(true);
      startLevelLoop();
    } catch (err) {
      console.error("Audio play failed", err);
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/Instead of a Tango_mix1.wav" preload="auto" />
      <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/15 bg-black/70 px-4 py-2 text-white shadow-2xl shadow-black/50 backdrop-blur">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-black transition hover:bg-amber-400"
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">Now playing</span>
          <span className="text-sm font-semibold">Instead of a Tango</span>
          {!isReady && (
            <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/40">
              Loading...
            </span>
          )}
        </div>
      </div>
    </>
  );
}
