import Image from "next/image";
import type { Product } from "@/data/products";

type QuickViewModalProps = {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
};

export function QuickViewModal({ product, open, onClose, onAdd }: QuickViewModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className="mx-auto mt-16 w-full max-w-xl rounded-2xl border border-white/10 bg-[#0b0b0f] px-5 py-6 text-white shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        {product ? (
          <>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <button
                type="button"
                className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
                onClick={onClose}
              >
                Close
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <div className="relative h-52 w-full overflow-hidden rounded-xl border border-white/10 sm:w-1/2">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 640px) 240px, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                {product.description && (
                  <p className="text-sm leading-relaxed text-white/70">
                    {product.description}
                  </p>
                )}
                <p className="text-lg font-semibold text-amber-200">
                  €{product.price.toFixed(2)}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
                    onClick={() => {
                      onAdd(product);
                      onClose();
                    }}
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                    onClick={onClose}
                  >
                    Keep browsing
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-white/70">Select a title to preview.</p>
        )}
      </div>
    </div>
  );
}
