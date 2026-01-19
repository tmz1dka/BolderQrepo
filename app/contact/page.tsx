"use client";

import { useState } from "react";
import Link from "next/link";

type Status = { type: "idle" | "submitting" | "success" | "error"; message?: string };

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", message: "Please fill in all fields correctly." });
      return;
    }

    setStatus({ type: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to send message.");
      }
      setStatus({ type: "success", message: data?.message || "Your message has been sent!" });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Network error. Please try again.",
      });
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-140px)] max-w-5xl flex-col items-center px-4 py-16 lg:px-6">
      <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-black/40 backdrop-blur">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.05),_transparent_30%)]" />
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Contact</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Questions, bookings, collaborations</h1>
          <p className="text-white/70">We usually respond within 1–2 business days.</p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-semibold text-white">
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-base text-white placeholder:text-white/40 outline-none transition focus:border-amber-300/60 focus:bg-white/15 focus:ring-2 focus:ring-amber-300/30"
              placeholder="Your full name"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-white">
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-base text-white placeholder:text-white/40 outline-none transition focus:border-amber-300/60 focus:bg-white/15 focus:ring-2 focus:ring-amber-300/30"
              placeholder="you@example.com"
              type="email"
              required
            />
          </label>

          <label className="sm:col-span-2 flex flex-col gap-2 text-sm font-semibold text-white">
            Message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[160px] w-full rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-base text-white placeholder:text-white/40 outline-none transition focus:border-amber-300/60 focus:bg-white/15 focus:ring-2 focus:ring-amber-300/30"
              placeholder="Your message..."
              required
            />
          </label>

          <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={status.type === "submitting"}
              className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status.type === "submitting" ? "Sending..." : "Send message"}
            </button>
            <Link
              href="/"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Back home
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Visit shop
            </Link>
          </div>
        </form>

        {status.type === "error" && (
          <p className="mt-4 text-center text-sm font-semibold text-rose-200">
            {status.message}
          </p>
        )}
        {status.type === "success" && (
          <p className="mt-4 text-center text-sm font-semibold text-emerald-200">
            {status.message}
          </p>
        )}
      </div>
    </main>
  );
}
