import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Container, EmptyState, PageBanner } from "@/components/site/bits";
import { QtyStepper } from "@/components/site/commerce";
import { TotalsRows } from "@/components/site/OrderSummary";
import { useI18n } from "@/lib/i18n";
import { formatAED, promoRate } from "@/lib/pricing";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Pheladelfia Agricultural" },
      { name: "description", content: "Review your plants, sizes and quantities, with VAT and delivery estimate in AED." },
      { property: "og:title", content: "Your Cart — Pheladelfia" },
      { property: "og:description", content: "Review your plant order before checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { t, p, lang } = useI18n();
  const { lines, setQty, remove, promo, setPromo } = useStore();
  const [code, setCode] = useState(promo);

  const apply = (e: FormEvent) => {
    e.preventDefault();
    if (promoRate(code) > 0) {
      setPromo(code.trim().toUpperCase());
      toast.success(t("Promo code applied", "تم تطبيق كود الخصم"));
    } else {
      toast.error(t("That code isn't valid. Try GREEN10.", "هذا الكود غير صالح. جرّب GREEN10."));
    }
  };

  return (
    <>
      <PageBanner title={t("Your cart", "سلة التسوق")} crumbs={[{ label: t("Cart", "السلة") }]} />
      <Container className="py-12">
        {lines.length === 0 ? (
          <EmptyState icon={<ShoppingBag className="h-7 w-7" />} title={t("Your cart is empty", "سلتك فارغة")} sub={t("Find the perfect palms and trees for your space.", "اعثر على النخيل والأشجار المثالية لمساحتك.")} action={<Button asChild><Link to="/shop">{t("Shop plants", "تسوّق النباتات")}</Link></Button>} />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="overflow-hidden rounded-2xl border bg-card">
              <div className="hidden grid-cols-[minmax(0,1fr)_140px_120px_40px] gap-4 border-b bg-muted/50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:grid rtl:tracking-normal">
                <span>{t("Product", "المنتج")}</span><span>{t("Quantity", "الكمية")}</span><span className="text-end">{t("Total", "الإجمالي")}</span><span />
              </div>
              <ul className="divide-y">
                {lines.map((l) => (
                  <li key={l.productSlug + l.variantId} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 sm:grid-cols-[minmax(0,1fr)_140px_120px_40px]">
                    <div className="flex min-w-0 items-center gap-4">
                      <img src={l.product.images[0]} alt={p(l.product.name)} className="h-20 w-16 shrink-0 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <Link to="/product/$slug" params={{ slug: l.productSlug }} className="block truncate font-display text-lg text-primary hover:text-gold">{p(l.product.name)}</Link>
                        <p className="text-xs text-muted-foreground">{p(l.variant.label)} · {formatAED(l.unit, lang)} · SKU {l.product.sku}</p>
                      </div>
                    </div>
                    <QtyStepper value={l.qty} onChange={(n) => setQty(l.productSlug, l.variantId, n)} />
                    <span className="hidden text-end font-semibold tabular-nums sm:block">{formatAED(l.lineTotal, lang)}</span>
                    <button onClick={() => remove(l.productSlug, l.variantId)} className="hidden text-muted-foreground hover:text-destructive sm:block" aria-label={t("Remove item", "إزالة المنتج")}><Trash2 className="h-4 w-4" /></button>
                  </li>
                ))}
              </ul>
              <div className="border-t px-6 py-4"><Link to="/shop" className="text-sm font-medium text-gold hover:text-primary">{t("← Continue shopping", "→ متابعة التسوق")}</Link></div>
            </div>
            <aside className="h-fit space-y-6 rounded-2xl border bg-card p-6 shadow-soft lg:sticky lg:top-44">
              <h2 className="text-2xl text-primary">{t("Order summary", "ملخص الطلب")}</h2>
              <form onSubmit={apply} className="flex gap-2">
                <label htmlFor="promo" className="sr-only">{t("Promo code", "كود الخصم")}</label>
                <div className="relative flex-1">
                  <Tag className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                  <input id="promo" value={code} onChange={(e) => setCode(e.target.value)} placeholder={t("Promo code", "كود الخصم")} className="h-10 w-full rounded-full border bg-background ps-9 pe-3 text-sm uppercase outline-none focus:border-gold" />
                </div>
                <Button type="submit" variant="outline">{t("Apply", "تطبيق")}</Button>
              </form>
              <TotalsRows estimate />
              <p className="text-xs text-muted-foreground">{t("Delivery shown for Abu Dhabi & Dubai. Final fee is confirmed at checkout.", "التوصيل المعروض لأبوظبي ودبي. يتم تأكيد الرسوم النهائية عند الدفع.")}</p>
              <Button size="lg" className="w-full" asChild><Link to="/checkout">{t("Proceed to checkout", "المتابعة للدفع")} <ArrowRight className="rtl:rotate-180" /></Link></Button>
            </aside>
          </div>
        )}
      </Container>
    </>
  );
}
