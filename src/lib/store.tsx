import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product, type Variant } from "@/data/catalog";

export type PlacedOrder = {
  id: string;
  name: string;
  email: string;
  emirate: string;
  date: string;
  payment: string;
  items: { name: string; variant: string; qty: number; lineTotal: number }[];
  totals: { subtotal: number; discount: number; delivery: number; vat: number; total: number };
};

export type CartLine = { productSlug: string; variantId: string; qty: number };
export type ResolvedLine = CartLine & { product: Product; variant: Variant; unit: number; lineTotal: number };

type StoreValue = {
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  add: (slug: string, variantId: string, qty?: number) => void;
  setQty: (slug: string, variantId: string, qty: number) => void;
  remove: (slug: string, variantId: string) => void;
  clear: () => void;
  cartOpen: boolean;
  setCartOpen: (o: boolean) => void;
  wishlist: string[];
  toggleWish: (slug: string) => void;
  isWished: (slug: string) => boolean;
  promo: string;
  setPromo: (c: string) => void;
  lastOrder: PlacedOrder | null;
  setLastOrder: (o: PlacedOrder) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

/** Cart and wishlist live in memory only (no localStorage) — prototype requirement. */
export function StoreProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [promo, setPromo] = useState("");
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(null);

  const add = useCallback((slug: string, variantId: string, qty = 1) => {
    setRaw((prev) => {
      const i = prev.findIndex((l) => l.productSlug === slug && l.variantId === variantId);
      if (i >= 0) {
        return prev.map((l, j) => (j === i ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { productSlug: slug, variantId, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, variantId: string, qty: number) => {
    setRaw((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.productSlug === slug && l.variantId === variantId))
        : prev.map((l) => (l.productSlug === slug && l.variantId === variantId ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((slug: string, variantId: string) => {
    setRaw((prev) => prev.filter((l) => !(l.productSlug === slug && l.variantId === variantId)));
  }, []);

  const toggleWish = useCallback((slug: string) => {
    setWishlist((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug]));
  }, []);

  const value = useMemo<StoreValue>(() => {
    const lines: ResolvedLine[] = raw.flatMap((l) => {
      const product = getProduct(l.productSlug);
      const variant = product?.variants.find((v) => v.id === l.variantId);
      if (!product || !variant || variant.price == null) return [];
      return [{ ...l, product, variant, unit: variant.price, lineTotal: variant.price * l.qty }];
    });
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.lineTotal, 0),
      add,
      setQty,
      remove,
      clear: () => setRaw([]),
      cartOpen,
      setCartOpen,
      wishlist,
      toggleWish,
      isWished: (s) => wishlist.includes(s),
      promo,
      setPromo,
      lastOrder,
      setLastOrder,
    };
  }, [raw, add, setQty, remove, cartOpen, wishlist, toggleWish, promo, lastOrder]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
