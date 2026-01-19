import Image from "next/image";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
  onQuickView: (product: Product) => void;
};

export function ProductCard({ product, onAdd, onQuickView }: ProductCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur">
      <div
        className="relative h-64 w-full cursor-pointer overflow-hidden"
        onClick={() => onQuickView(product)}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 250px, 45vw"
          className="object-cover transition duration-500 ease-out group-hover:scale-105"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-4 py-3 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold leading-6">{product.name}</h3>
            {product.description && (
              <p className="mt-1 text-sm text-white/60">{product.description}</p>
            )}
          </div>
          <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-amber-200">
            €{product.price.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            className="w-full rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
            onClick={() => onAdd(product)}
          >
            Add to cart
          </button>
          <button
            type="button"
            className="rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            onClick={() => onQuickView(product)}
          >
            Quick view
          </button>
        </div>
      </div>
    </article>
  );
}
