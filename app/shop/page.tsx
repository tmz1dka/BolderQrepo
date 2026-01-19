"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { products, type Product } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { QuickViewModal } from "@/components/shop/QuickViewModal";
import { CartSidebar, type CartItem } from "@/components/shop/CartSidebar";

export default function ShopPage() {
  const router = useRouter();
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("quartet-cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        setCart(parsed);
      } catch {
        // ignore parsing errors and reset cart
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("quartet-cart", JSON.stringify(cart));
    }
  }, [cart, hydrated]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const next = prev.filter((item) => item.id !== id);
      if (next.length === 0) setCartOpen(false);
      return next;
    });
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-16 lg:px-6">
      <div className="absolute inset-x-0 top-24 -z-10 h-72 bg-gradient-to-b from-amber-500/10 via-amber-400/5 to-transparent blur-3xl" />
      <div className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Scores</p>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Shop chamber music
          </h1>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            Local storage cart · Instant download ready
          </div>
        </div>
        <p className="max-w-2xl text-white/70">
          Each edition includes careful bowings and page turns tested on stage. Preview a
          score, add it to your cart, and check out when you&apos;re ready.
        </p>
      </div>

      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={addToCart}
            onQuickView={setQuickView}
          />
        ))}
      </section>

      <button
        type="button"
        onClick={() => setCartOpen((open) => !open)}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-black shadow-xl shadow-amber-500/30 transition hover:bg-amber-400"
      >
        Cart
        {cartCount > 0 && (
          <span className="rounded-full bg-black/80 px-2 py-0.5 text-xs font-bold text-white">
            {cartCount}
          </span>
        )}
      </button>

      <CartSidebar
        open={cartOpen}
        items={cart}
        onRemove={removeFromCart}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <QuickViewModal
        product={quickView}
        open={Boolean(quickView)}
        onClose={() => setQuickView(null)}
        onAdd={addToCart}
      />

      {cartOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
        />
      )}
    </main>
  );
}
