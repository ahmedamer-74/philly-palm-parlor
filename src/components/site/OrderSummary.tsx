import { useI18n } from "@/lib/i18n";
import { computeTotals, formatAED, type Emirate } from "@/lib/pricing";
import { useStore } from "@/lib/store";

export function useTotals(emirate?: Emirate | undefined) {
  const { subtotal, promo } = useStore();
  return computeTotals(subtotal, { promo, emirate });
}

export function TotalsRows({ emirate, estimate }: { emirate?: Emirate | undefined; estimate?: boolean }) {
  const { t, lang } = useI18n();
  const { promo } = useStore();
  const tt = useTotals(emirate);
  const row = (label: string, value: string, cls = "") => (
    <div className={`flex justify-between text-sm ${cls}`}><dt>{label}</dt><dd className="tabular-nums">{value}</dd></div>
  );
  return (
    <dl className="space-y-3">
      {row(t("Subtotal", "المجموع الفرعي"), formatAED(tt.subtotal, lang))}
      {tt.discount > 0 && row(t(`Promo (${promo.toUpperCase()})`, `كود الخصم (${promo.toUpperCase()})`), `− ${formatAED(tt.discount, lang)}`, "text-success")}
      {row(estimate ? t("Delivery estimate", "تقدير التوصيل") : t("Delivery", "التوصيل"), tt.delivery === 0 ? t("Free", "مجاني") : formatAED(tt.delivery, lang))}
      {row(t("VAT (5%)", "ضريبة القيمة المضافة (5%)"), formatAED(tt.vat, lang))}
      <div className="flex justify-between border-t pt-4 font-display text-xl text-primary"><dt>{t("Total", "الإجمالي")}</dt><dd className="tabular-nums">{formatAED(tt.total, lang)}</dd></div>
    </dl>
  );
}
