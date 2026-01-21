"use client";

import Link from "next/link";
import eventsData from "@/events.json";

type EventItem = {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  ticketUrl?: string;
};

const fallbackEvents: EventItem[] = [
  {
    id: "evt-1",
    title: "Piazzolla Seasons · Helsinki",
    date: "2025-03-15",
    time: "19:00",
    location: "Helsinki Music Centre",
    description: "Live energy, new arrangements, and signature Bålder sound.",
  },
  {
    id: "evt-2",
    title: "Nordic Nights",
    date: "2025-04-05",
    time: "20:00",
    location: "Oslo Concert Hall",
    description: "Nordic tones and tango fire in one program.",
  },
];

const events: EventItem[] =
  Array.isArray(eventsData) && eventsData.length > 0 ? (eventsData as EventItem[]) : fallbackEvents;

export default function EventsPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-16 lg:px-6">
      <div className="absolute inset-x-0 top-10 -z-10 h-80 bg-gradient-to-b from-amber-500/10 via-amber-400/5 to-transparent blur-3xl" />
      <div className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Events</p>
        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Shows & Concerts
        </h1>
        <p className="max-w-2xl text-white/70">
          Upcoming performances and special programs. Grab tickets and meet us on stage.
        </p>
      </div>

      <section className="mt-10 space-y-6">
        {events.map((event) => (
          <article
            key={event.id}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl shadow-black/30 backdrop-blur"
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">{event.title}</h2>
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                  <span className="rounded-full border border-white/15 px-3 py-1">
                    {event.date}
                  </span>
                  {event.time && (
                    <span className="rounded-full border border-white/15 px-3 py-1">
                      {event.time}
                    </span>
                  )}
                  {event.location && (
                    <span className="rounded-full border border-white/15 px-3 py-1">
                      {event.location}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {event.ticketUrl ? (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
                  >
                    Get tickets
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
                  >
                    Get tickets
                  </Link>
                )}
              </div>
            </div>
            {event.description && <p className="text-white/70">{event.description}</p>}
          </article>
        ))}
      </section>
    </main>
  );
}
