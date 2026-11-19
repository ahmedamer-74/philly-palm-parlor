import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, EmptyState } from "@/components/site/bits";
import { useI18n } from "@/lib/i18n";
import { formatAED } from "@/lib/pricing";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Pheladelfia Agricultural" },
      { name: "description", content: "Thank you for your order. Your plants are being prepared at our Abu Dhabi nursery." },
      { property: "og:title", content: "Order Confirmed — Pheladelfia" },
      { property: "og:description", content: "Your plants are being prepared." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Confirmation,
});

function Confirmation() {
  const { t, lang } = useI18n();
  const { lastOrder: o } = useStore();
  const payLabel = { card: t("Card", "بطاقة"), cod: t("Cash on delivery", "الدفع عند الاستلام"), bank: t("Bank transfer", "تحويل بنكي") } as Record<string, string>;

  if (!o) {
    return (
      <Container className="py-20">
        <EmptyState icon={<Package className="h-7 w-7" />} title={t("No recent order", "لا يوجد طلب حديث")} sub={t("Place an order to see its confirmation here.", "أكمل طلباً لتظهر تفاصيله هنا.")} action={<Button asChild><Link to="/shop">{t("Shop plants", "تسوّق النباتات")}</Link></Button>} />
      </Container>
    );
  }

  return (
    <Container className="max-w-3xl py-16">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-success" aria-hidden />
        <span className="eyebrow mt-6 block">{t("Order confirmed", "تم تأكيد الطلب")}</span>
        <h1 className="mt-3 text-4xl text-primary sm:text-5xl">{t(`Thank you, ${o.name.split(" ")[0]}!`, `شكراً لك، ${o.name.split(" ")[0]}!`)}</h1>
        <p className="mt-4 text-muted-foreground">{t(`A confirmation has been sent to ${o.email}. Our team will call you to confirm the delivery slot.`, `تم إرسال التأكيد إلى ${o.email}. سيتصل بك فريقنا لتأكيد موعد التوصيل.`)}</p>
      </div>
      <div className="mt-10 overflow-hidden rounded-2xl border bg-card shadow-card">
        <dl className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
          {[
            [t("Order no.", "رقم الطلب"), o.id],
            [t("Delivery date", "تاريخ التوصيل"), o.date],
            [t("Emirate", "الإمارة"), o.emirate],
            [t("Payment", "الدفع"), payLabel[o.payment]],
          ].map(([k, v]) => (
            <div key={k} className="bg-card p-5"><dt className="text-xs text-muted-foreground">{k}</dt><dd className="mt-1 font-semibold text-primary">{v}</dd></div>
          ))}
        </dl>
        <ul className="divide-y border-t px-6">
          {o.items.map((i) => (
            <li key={i.name + i.variant} className="flex justify-between py-4 text-sm"><span>{i.name} · {i.variant} × {i.qty}</span><span className="tabular-nums">{formatAED(i.lineTotal, lang)}</span></li>
          ))}
        </ul>
        <dl className="space-y-2 border-t bg-muted/40 p-6 text-sm">
          <div className="flex justify-between"><dt>{t("Subtotal", "المجموع الفرعي")}</dt><dd>{formatAED(o.totals.subtotal, lang)}</dd></div>
          {o.totals.discount > 0 && <div className="flex justify-between text-success"><dt>{t("Discount", "الخصم")}</dt><dd>− {formatAED(o.totals.discount, lang)}</dd></div>}
          <div className="flex justify-between"><dt>{t("Delivery", "التوصيل")}</dt><dd>{o.totals.delivery === 0 ? t("Free", "مجاني") : formatAED(o.totals.delivery, lang)}</dd></div>
          <div className="flex justify-between"><dt>{t("VAT (5%)", "الضريبة (5%)")}</dt><dd>{formatAED(o.totals.vat, lang)}</dd></div>
          <div className="flex justify-between pt-2 font-display text-xl text-primary"><dt>{t("Total", "الإجمالي")}</dt><dd>{formatAED(o.totals.total, lang)}</dd></div>
        </dl>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button asChild><Link to="/shop">{t("Continue shopping", "متابعة التسوق")}</Link></Button>
        <Button variant="outline" asChild><Link to="/account/orders">{t("View my orders", "عرض طلباتي")}</Link></Button>
      </div>
    </Container>
  );
}
