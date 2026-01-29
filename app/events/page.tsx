"use client";

import Link from "next/link";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section
        className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 md:py-16"
        style={{
          backgroundImage: "url('/theBQShow-withinfo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative flex flex-col items-center gap-6 text-center max-w-3xl">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">The Bålder Show</h1>
          <p className="text-base text-white/80 sm:text-lg">
            Grab your tickets via Lippu.fi and join us for the full experience.
          </p>
          <Link
            href="https://www.lippu.fi/artist/balder-quartet/"
            className="w-full sm:w-auto rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
          >
            Get Tickets
          </Link>
        </div>
      </section>
    </main>
  );
}
