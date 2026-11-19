import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Banknote, CreditCard, Landmark, Lock, ShoppingBag } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Container, EmptyState, PageBanner } from "@/components/site/bits";
import { Field, FormCard, NativeSelect, TextArea, TextInput } from "@/components/site/form";
import { TotalsRows, useTotals } from "@/components/site/OrderSummary";
import { useI18n } from "@/lib/i18n";
import { EMIRATES, formatAED, type Emirate } from "@/lib/pricing";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Pheladelfia Agricultural" },
      { name: "description", content: "Secure checkout with delivery across all seven Emirates. Pay by card, cash on delivery or bank transfer." },
      { property: "og:title", content: "Checkout — Pheladelfia" },
      { property: "og:description", content: "Complete your plant order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

type Pay = "card" | "cod" | "bank";

function Checkout() {
  const { t, p, lang } = useI18n();
  const { lines, clear, setLastOrder } = useStore();
  const navigate = useNavigate();
  const [emirate, setEmirate] = useState<Emirate>("abu-dhabi");
  const [pay, setPay] = useState<Pay>("card");
  const [submitting, setSubmitting] = useState(false);
  const totals = useTotals(emirate);

  const minDate = new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    const em = EMIRATES.find((x) => x.id === emirate)!;
    setTimeout(() => {
      setLastOrder({
        id: `PH-${Math.floor(10000 + Math.random() * 89999)}`,
        name: String(fd.get("name")),
        email: String(fd.get("email")),
        emirate: lang === "ar" ? em.ar : em.en,
        date: String(fd.get("date")),
        payment: pay,
        items: lines.map((l) => ({ name: p(l.product.name), variant: p(l.variant.label), qty: l.qty, lineTotal: l.lineTotal })),
        totals,
      });
      clear();
      navigate({ to: "/order-confirmation" });
    }, 700);
  };

  if (lines.length === 0) {
    return (
      <>
        <PageBanner title={t("Checkout", "إتمام الشراء")} crumbs={[{ label: t("Checkout", "إتمام الشراء") }]} />
        <Container className="py-12">
          <EmptyState icon={<ShoppingBag className="h-7 w-7" />} title={t("Nothing to check out yet", "لا يوجد ما يمكن شراؤه بعد")} sub={t("Add some plants to your cart first.", "أضف بعض النباتات إلى سلتك أولاً.")} action={<Button asChild><Link to="/shop">{t("Shop plants", "تسوّق النباتات")}</Link></Button>} />
        </Container>
      </>
    );
  }

  const payOptions: { id: Pay; icon: typeof CreditCard; label: string; sub: string }[] = [
    { id: "card", icon: CreditCard, label: t("Credit / debit card", "بطاقة ائتمان / خصم"), sub: "Visa · Mastercard · Apple Pay" },
    { id: "cod", icon: Banknote, label: t("Cash on delivery", "الدفع عند الاستلام"), sub: t("Pay cash or card on arrival", "ادفع نقداً أو بالبطاقة عند الوصول") },
    { id: "bank", icon: Landmark, label: t("Bank transfer", "تحويل بنكي"), sub: t("For company & project orders", "لطلبات الشركات والمشاريع") },
  ];

  return (
    <>
      <PageBanner title={t("Checkout", "إتمام الشراء")} crumbs={[{ label: t("Cart", "السلة") }, { label: t("Checkout", "إتمام الشراء") }]} />
      <Container className="py-12">
        <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="space-y-6">
            <FormCard step={1} title={t("Contact details", "بيانات التواصل")}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t("Full name", "الاسم الكامل")} htmlFor="name"><TextInput id="name" name="name" required autoComplete="name" /></Field>
                <Field label={t("Phone", "الهاتف")} htmlFor="phone"><TextInput id="phone" name="phone" type="tel" required placeholder="+971 5x xxx xxxx" dir="ltr" /></Field>
                <Field label={t("Email", "البريد الإلكتروني")} htmlFor="email" className="sm:col-span-2"><TextInput id="email" name="email" type="email" required autoComplete="email" /></Field>
              </div>
            </FormCard>

            <FormCard step={2} title={t("Delivery address", "عنوان التوصيل")}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t("Emirate", "الإمارة")} htmlFor="emirate">
                  <NativeSelect id="emirate" value={emirate} onChange={(e) => setEmirate(e.target.value as Emirate)}>
                    {EMIRATES.map((em) => <option key={em.id} value={em.id}>{lang === "ar" ? em.ar : em.en}</option>)}
                  </NativeSelect>
                </Field>
                <Field label={t("Area / community", "المنطقة / المجمع")} htmlFor="area"><TextInput id="area" name="area" required /></Field>
                <Field label={t("Street, building or villa no.", "الشارع، المبنى أو رقم الفيلا")} htmlFor="street" className="sm:col-span-2"><TextInput id="street" name="street" required /></Field>
                <Field label={t("Preferred delivery date", "تاريخ التوصيل المفضل")} htmlFor="date" hint={t("Earliest available: 2 days from today", "أقرب موعد: بعد يومين من اليوم")}><TextInput id="date" name="date" type="date" required min={minDate} defaultValue={minDate} /></Field>
                <Field label={t("Delivery notes (optional)", "ملاحظات التوصيل (اختياري)")} htmlFor="notes"><TextArea id="notes" name="notes" className="min-h-11" rows={1} /></Field>
              </div>
            </FormCard>

            <FormCard step={3} title={t("Payment", "الدفع")}>
              <div role="radiogroup" aria-label={t("Payment method", "طريقة الدفع")} className="grid gap-3 sm:grid-cols-3">
                {payOptions.map(({ id, icon: Icon, label, sub }) => (
                  <button type="button" role="radio" aria-checked={pay === id} key={id} onClick={() => setPay(id)} className={cn("flex flex-col items-start gap-2 rounded-xl border p-4 text-start transition", pay === id ? "border-primary bg-secondary/60 ring-1 ring-primary" : "hover:border-primary")}>
                    <Icon className="h-5 w-5 text-primary" aria-hidden />
                    <span className="text-sm font-semibold">{label}</span>
                    <span className="text-xs text-muted-foreground">{sub}</span>
                  </button>
                ))}
              </div>
              {pay === "card" && (
                <div className="mt-6 grid gap-4 sm:grid-cols-4">
                  <Field label={t("Card number", "رقم البطاقة")} htmlFor="cc" className="sm:col-span-2"><TextInput id="cc" inputMode="numeric" placeholder="4242 4242 4242 4242" dir="ltr" /></Field>
                  <Field label={t("Expiry", "تاريخ الانتهاء")} htmlFor="exp"><TextInput id="exp" placeholder="MM/YY" dir="ltr" /></Field>
                  <Field label="CVC" htmlFor="cvc"><TextInput id="cvc" placeholder="123" dir="ltr" /></Field>
                </div>
              )}
              {pay === "bank" && (
                <p className="mt-6 rounded-xl bg-muted p-4 text-sm text-muted-foreground">{t("Bank details and a pro-forma invoice will be emailed after you place the order. Delivery is scheduled once payment is received.", "سيتم إرسال بيانات البنك وفاتورة مبدئية بالبريد الإلكتروني بعد تأكيد الطلب. تتم جدولة التوصيل بعد استلام الدفعة.")}</p>
              )}
              {pay === "cod" && (
                <p className="mt-6 rounded-xl bg-muted p-4 text-sm text-muted-foreground">{t("Our driver accepts cash or card on arrival.", "يقبل السائق الدفع نقداً أو بالبطاقة عند الوصول.")}</p>
              )}
            </FormCard>
          </div>

          <aside className="h-fit space-y-6 rounded-2xl border bg-card p-6 shadow-soft lg:sticky lg:top-44">
            <h2 className="text-2xl text-primary">{t("Order summary", "ملخص الطلب")}</h2>
            <ul className="space-y-4">
              {lines.map((l) => (
                <li key={l.productSlug + l.variantId} className="flex items-center gap-3">
                  <span className="relative shrink-0">
                    <img src={l.product.images[0]} alt="" className="h-14 w-12 rounded-lg object-cover" />
                    <span className="absolute -end-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-foreground">{l.qty}</span>
                  </span>
                  <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{p(l.product.name)}</span><span className="text-xs text-muted-foreground">{p(l.variant.label)}</span></span>
                  <span className="text-sm tabular-nums">{formatAED(l.lineTotal, lang)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-5"><TotalsRows emirate={emirate} /></div>
            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              <Lock /> {submitting ? t("Placing order…", "جارٍ تأكيد الطلب…") : t(`Place order · ${formatAED(totals.total, "en")}`, `تأكيد الطلب · ${formatAED(totals.total, "ar")}`)}
            </Button>
            <p className="text-center text-xs text-muted-foreground">{t("Prototype checkout — no payment is taken.", "نموذج تجريبي — لن يتم خصم أي مبلغ.")}</p>
          </aside>
        </form>
      </Container>
    </>
  );
}
