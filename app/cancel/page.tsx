import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-black/40 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Payment</p>
        <h1 className="mt-2 text-3xl font-semibold">Payment canceled</h1>
        <p className="mt-3 text-white/70">
          Your payment was not completed. You can return to the shop to try again or keep browsing.
        </p>
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
