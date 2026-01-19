"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "balder-ad-popup-shown";

export function AdPopup() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored === "true") return;

    if (lastPathRef.current === null) {
      // first render, just store the path
      lastPathRef.current = pathname;
      return;
    }

    if (lastPathRef.current !== pathname) {
      setVisible(true);
      localStorage.setItem(STORAGE_KEY, "true");
    }
    lastPathRef.current = pathname;
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0f1016] p-6 text-white shadow-2xl shadow-black/60">
        <button
          type="button"
          className="absolute right-3 top-3 rounded-full border border-white/20 px-2 py-1 text-xs text-white/60 transition hover:border-white/50 hover:text-white"
          onClick={() => setVisible(false)}
        >
          Close
        </button>
        <div className="h-40 w-full overflow-hidden rounded-xl border border-dashed border-white/20 bg-white/5 grid place-items-center text-xs uppercase tracking-[0.2em] text-white/50">
          add picture link here
        </div>
        <div className="mt-4 rounded-xl border border-dashed border-white/20 bg-white/5 p-3 text-sm text-white/70">
          add text here
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            onClick={() => setVisible(false)}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
