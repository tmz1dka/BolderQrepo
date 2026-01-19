"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { CartItem } from "@/components/shop/CartSidebar";

type Status = { type: "idle" | "submitting" | "error"; message?: string };

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("quartet-cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        setCart(parsed);
      } catch {
        setCart([]);
      }
    }
    setHydrated(true);
  }, []);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart.length) {
      setStatus({ type: "error", message: "Your cart is empty." });
      return;
    }
    if (!name.trim() || !email.trim()) {
      setStatus({ type: "error", message: "Name and email are required." });
      return;
    }

    setStatus({ type: "submitting" });
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name, email, phone },
          cart,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Failed to start checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 lg:px-6">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-black/40 backdrop-blur"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Checkout</p>
          <h1 className="mt-2 text-3xl font-semibold">Billing details</h1>
          <p className="mt-2 text-white/70">
            Enter your info and we&apos;ll send the score download after payment.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold text-white">
              Full name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-base text-white placeholder:text-white/40 outline-none transition focus:border-amber-300/60 focus:bg-white/15 focus:ring-2 focus:ring-amber-300/30"
                placeholder="Name"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-white">
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-base text-white placeholder:text-white/40 outline-none transition focus:border-amber-300/60 focus:bg-white/15 focus:ring-2 focus:ring-amber-300/30"
                placeholder="you@example.com"
              />
            </label>
            <label className="sm:col-span-2 flex flex-col gap-2 text-sm font-semibold text-white">
              Phone (optional)
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-base text-white placeholder:text-white/40 outline-none transition focus:border-amber-300/60 focus:bg-white/15 focus:ring-2 focus:ring-amber-300/30"
                placeholder="+358 ..."
              />
            </label>
          </div>

          {status.type === "error" && (
            <p className="mt-4 text-sm font-semibold text-rose-200">{status.message}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={status.type === "submitting" || !cart.length}
              className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status.type === "submitting" ? "Redirecting..." : "Proceed to Stripe"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/shop")}
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Back to shop
            </button>
          </div>
        </form>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-black/40 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Order</p>
          <h2 className="mt-2 text-2xl font-semibold">Summary</h2>
          {!hydrated ? (
            <p className="mt-4 text-white/70">Loading cart...</p>
          ) : cart.length === 0 ? (
            <p className="mt-4 text-white/70">Your cart is empty.</p>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-white/60">Qty {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-amber-200">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex items-center justify-between text-sm text-white/80">
            <span>Subtotal</span>
            <span className="text-lg font-semibold text-amber-200">€{total.toFixed(2)}</span>
          </div>
          <p className="mt-2 text-xs text-white/60">
            You will be redirected to Stripe for secure payment.
          </p>
        </div>
      </div>
    </main>
  );
}
