import { Link } from "@tanstack/react-router";
import { Eye, Heart, Minus, Plus, ShoppingBag, Trash2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { fromPrice, stockLabels, sunLabels, waterLabels, type Product } from "@/data/catalog";
import { company } from "@/data/content";
import { useI18n } from "@/lib/i18n";
import { deliveryFee, formatAED, FREE_DELIVERY_THRESHOLD } from "@/lib/pricing";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { EmptyState, Price } from "./bits";

export function useAddToCart() {
  const { add, setCartOpen } = useStore();
  const { t, p } = useI18n();
  return (product: Product, variantId: string, qty = 1) => {
    add(product.slug, variantId, qty);
    const v = product.variants.find((x) => x.id === variantId);
    toast.success(t("Added to cart", "تمت الإضافة إلى السلة"), {
      description: `${p(product.name)}${v ? ` · ${p(v.label)}` : ""} × ${qty}`,
      action: { label: t("View cart", "عرض السلة"), onClick: () => setCartOpen(true) },
    });
  };
}

export function QtyStepper({ value, onChange, min = 1 }: { value: number; onChange: (n: number) => void; min?: number }) {
  const { t } = useI18n();
  return (
    <div className="inline-flex h-10 items-center rounded-full border bg-card">
      <button type="button" className="grid h-10 w-10 place-items-center text-primary disabled:opacity-40" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={t("Decrease quantity", "تقليل الكمية")}>
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">{value}</span>
      <button type="button" className="grid h-10 w-10 place-items-center text-primary" onClick={() => onChange(value + 1)} aria-label={t("Increase quantity", "زيادة الكمية")}>
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function StockBadge({ stock }: { stock: Product["stock"] }) {
  const { p } = useI18n();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold",
        stock === "in" && "bg-secondary text-secondary-foreground",
        stock === "low" && "bg-accent text-accent-foreground",
        stock === "out" && "bg-muted text-muted-foreground",
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", stock === "in" ? "bg-success" : stock === "low" ? "bg-gold" : "bg-muted-foreground")} aria-hidden />
      {p(stockLabels[stock])}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { t, p, lang } = useI18n();
  const { toggleWish, isWished } = useStore();
  const addToCart = useAddToCart();
  const [quick, setQuick] = useState(false);
  const price = fromPrice(product);
  const firstBuyable = product.variants.find((v) => v.price != null);
  const canBuy = !!firstBuyable && product.stock !== "out";
  const wished = isWished(product.slug);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Link to="/product/$slug" params={{ slug: product.slug }} aria-label={p(product.name)}>
          <img src={product.images[0]} alt={`${p(product.name)} — ${product.botanical}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </Link>
        <div className="absolute start-3 top-3"><StockBadge stock={product.stock} /></div>
        <button
          type="button"
          onClick={() => toggleWish(product.slug)}
          aria-pressed={wished}
          aria-label={wished ? t("Remove from wishlist", "إزالة من المفضلة") : t("Add to wishlist", "أضف إلى المفضلة")}
          className="absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-primary shadow-soft backdrop-blur transition hover:scale-110"
        >
          <Heart className={cn("h-4 w-4", wished && "fill-gold text-gold")} />
        </button>
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <Button variant="secondary" size="sm" className="w-full bg-card/95 backdrop-blur" onClick={() => setQuick(true)}>
            <Eye /> {t("Quick view", "عرض سريع")}
          </Button>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs italic text-muted-foreground">{product.botanical}</p>
        <h3 className="mt-1 text-lg leading-snug text-primary">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-gold">{p(product.name)}</Link>
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{p(product.short)}</p>
        <div className="mt-3 flex flex-wrap gap-1.5 text-[0.7rem] text-muted-foreground">
          <span className="rounded-full bg-muted px-2 py-0.5">{product.variants[0]!.label[lang]}–{product.variants.at(-1)!.label[lang]}</span>
          <span className="rounded-full bg-muted px-2 py-0.5">☀ {p(sunLabels[product.sun])}</span>
          <span className="rounded-full bg-muted px-2 py-0.5">💧 {p(waterLabels[product.water])}</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <div className="min-w-0 text-sm">
            {price != null && <span className="block text-[0.7rem] text-muted-foreground">{t("From", "ابتداءً من")}</span>}
            <Price value={price} className={price != null ? "text-base" : "text-sm"} />
          </div>
          {canBuy ? (
            <Button size="sm" onClick={() => addToCart(product, firstBuyable!.id)} aria-label={t(`Add ${product.name.en} to cart`, `أضف ${product.name.ar} إلى السلة`)}>
              <ShoppingBag /> {t("Add", "أضف")}
            </Button>
          ) : (
            <Button size="sm" variant="outline" disabled>
              {t("Sold out", "نفدت الكمية")}
            </Button>
          )}
        </div>
      </div>
      <QuickView product={product} open={quick} onOpenChange={setQuick} />
    </article>
  );
}

export function QuickView({ product, open, onOpenChange }: { product: Product; open: boolean; onOpenChange: (o: boolean) => void }) {
  const { t, p } = useI18n();
  const addToCart = useAddToCart();
  const [variantId, setVariantId] = useState(product.variants[0]!.id);
  const [qty, setQty] = useState(1);
  const variant = product.variants.find((v) => v.id === variantId)!;
  const buyable = variant.price != null && product.stock !== "out";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden rounded-2xl p-0">
        <div className="grid md:grid-cols-2">
          <img src={product.images[0]} alt={p(product.name)} className="aspect-square h-full w-full object-cover md:aspect-auto" />
          <div className="flex flex-col p-6 sm:p-8">
            <p className="text-xs italic text-muted-foreground">{product.botanical}</p>
            <DialogTitle className="mt-1 font-display text-2xl font-medium text-primary">{p(product.name)}</DialogTitle>
            <DialogDescription className="mt-3 text-sm leading-relaxed">{p(product.short)}</DialogDescription>
            <div className="mt-5">
              <Price value={variant.price} className="text-2xl" />
              {variant.price != null && <span className="ms-2 text-xs text-muted-foreground">{t("+ 5% VAT", "+ 5% ضريبة")}</span>}
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground rtl:tracking-normal">{t("Size", "الحجم")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button key={v.id} type="button" onClick={() => setVariantId(v.id)} className={cn("rounded-full border px-3.5 py-1.5 text-sm transition", v.id === variantId ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary")}>
                  {p(v.label)}
                </button>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {buyable ? (
                <>
                  <QtyStepper value={qty} onChange={setQty} />
                  <Button onClick={() => { addToCart(product, variantId, qty); onOpenChange(false); }}>
                    <ShoppingBag /> {t("Add to cart", "أضف إلى السلة")}
                  </Button>
                </>
              ) : (
                <Button variant="outline" disabled>
                  {t("Out of stock", "غير متوفر حالياً")}
                </Button>
              )}
            </div>
            <Link to="/product/$slug" params={{ slug: product.slug }} className="mt-auto pt-6 text-sm font-medium text-gold hover:text-primary" onClick={() => onOpenChange(false)}>
              {t("View full details →", "عرض التفاصيل الكاملة ←")}
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function MiniCart() {
  const { t, p, lang, isAr } = useI18n();
  const { lines, subtotal, cartOpen, setCartOpen, setQty, remove } = useStore();
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal;
  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side={isAr ? "left" : "right"} className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b p-6">
          <SheetTitle className="text-start font-display text-2xl font-medium text-primary">{t("Your cart", "سلة التسوق")}</SheetTitle>
        </SheetHeader>
        {lines.length === 0 ? (
          <div className="flex flex-1 items-center p-6">
            <EmptyState
              icon={<ShoppingBag className="h-7 w-7" />}
              title={t("Your cart is empty", "سلتك فارغة")}
              sub={t("Explore our palms and trees to get started.", "تصفح النخيل والأشجار للبدء.")}
              action={<Button asChild onClick={() => setCartOpen(false)}><Link to="/shop">{t("Shop plants", "تسوّق النباتات")}</Link></Button>}
            />
          </div>
        ) : (
          <>
            <div className="border-b bg-secondary/50 px-6 py-3 text-xs text-secondary-foreground">
              {remaining > 0
                ? t(`Add ${formatAED(remaining, "en")} more for free delivery`, `أضف ${formatAED(remaining, "ar")} للحصول على توصيل مجاني`)
                : t("You've unlocked free delivery 🌿", "حصلت على توصيل مجاني 🌿")}
            </div>
            <ul className="flex-1 divide-y overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.productSlug + l.variantId} className="flex gap-4 py-5">
                  <img src={l.product.images[0]} alt={p(l.product.name)} className="h-20 w-16 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-primary">{p(l.product.name)}</p>
                    <p className="text-xs text-muted-foreground">{p(l.variant.label)} · {formatAED(l.unit, lang)}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <QtyStepper value={l.qty} onChange={(n) => setQty(l.productSlug, l.variantId, n)} />
                      <button onClick={() => remove(l.productSlug, l.variantId)} className="text-muted-foreground hover:text-destructive" aria-label={t("Remove item", "إزالة المنتج")}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t bg-card p-6">
              <div className="flex justify-between text-sm"><span>{t("Subtotal", "المجموع الفرعي")}</span><span className="font-semibold">{formatAED(subtotal, lang)}</span></div>
              <div className="flex justify-between text-xs text-muted-foreground"><span>{t("Delivery (est.)", "التوصيل (تقديري)")}</span><span>{deliveryFee(subtotal) === 0 ? t("Free", "مجاني") : formatAED(deliveryFee(subtotal), lang)}</span></div>
              <p className="text-xs text-muted-foreground">{t("5% VAT calculated at checkout.", "تُحتسب ضريبة 5% عند الدفع.")}</p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant="outline" asChild onClick={() => setCartOpen(false)}><Link to="/cart">{t("View cart", "عرض السلة")}</Link></Button>
                <Button asChild onClick={() => setCartOpen(false)}><Link to="/checkout">{t("Checkout", "إتمام الشراء")}</Link></Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function WhatsAppFab() {
  const { t } = useI18n();
  return (
    <a
      href={company.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label={t("Chat with us on WhatsApp", "تواصل معنا عبر واتساب")}
      className="fixed bottom-5 end-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp opacity-30" aria-hidden />
    </a>
  );
}
