import type { Product } from "@/data/products";

export type CartItem = Product & { quantity: number };

type CartSidebarProps = {
  open: boolean;
  items: CartItem[];
  onRemove: (id: string) => void;
  onClose: () => void;
  onCheckout: () => void;
};

export function CartSidebar({
  open,
  items,
  onRemove,
  onClose,
  onCheckout,
}: CartSidebarProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed inset-y-0 right-0 z-40 w-full max-w-sm transform bg-[#0e0e12] text-white shadow-2xl shadow-black/60 transition duration-300 ease-out ${
        open ? "translate-x-0" : "translate-x-full"
      } flex flex-col`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">Cart</p>
          <p className="text-lg font-semibold">
            {items.length === 0 ? "Empty" : `${items.length} item${items.length > 1 ? "s" : ""}`}
          </p>
        </div>
        <button
          type="button"
          className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {items.length === 0 && (
          <p className="text-sm text-white/60">Add a score to begin.</p>
        )}
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3"
            >
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-white/60">
                  €{item.price.toFixed(2)} · Qty {item.quantity}
                </p>
              </div>
              <button
                type="button"
                className="text-sm text-amber-300 transition hover:text-amber-200"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-white/10 px-5 py-4">
        <div className="flex items-center justify-between text-sm text-white/80">
          <span>Subtotal</span>
          <span className="text-base font-semibold text-amber-200">
            €{total.toFixed(2)}
          </span>
        </div>
        <button
          type="button"
          className="mt-3 w-full rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          Go to checkout
        </button>
      </div>
    </div>
  );
}
