"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// This page relies on runtime query params; skip prerender.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-black/40 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Payment</p>
        <h1 className="mt-2 text-3xl font-semibold">Thank you for your order!</h1>
        <p className="mt-3 text-white/70">
          Your payment was successful. We&apos;ll send your scores to the email you provided.
        </p>
        {sessionId && (
          <p className="mt-3 text-xs text-white/50">Stripe session: {sessionId}</p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
          >
            Back to shop
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/60 shadow-2xl shadow-black/40 backdrop-blur">
            Loading your order...
          </div>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
