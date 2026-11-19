import { createFileRoute, Link } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockOrders } from "@/data/content";
import { useI18n } from "@/lib/i18n";
import { formatAED } from "@/lib/pricing";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/account/orders")({
  component: Orders,
});

function Orders() {
  const { t, p, lang } = useI18n();
  const { lastOrder } = useStore();
  const rows = [
    ...(lastOrder ? [{ id: lastOrder.id, date: new Date().toISOString().slice(0, 10), status: { en: "Processing", ar: "قيد التجهيز" }, total: lastOrder.totals.total, items: lastOrder.items.reduce((s, i) => s + i.qty, 0) }] : []),
    ...mockOrders,
  ];
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-start text-xs uppercase tracking-wider text-muted-foreground rtl:tracking-normal">
          <tr>
            <th className="px-6 py-3 text-start">{t("Order", "الطلب")}</th>
            <th className="hidden px-6 py-3 text-start sm:table-cell">{t("Date", "التاريخ")}</th>
            <th className="px-6 py-3 text-start">{t("Status", "الحالة")}</th>
            <th className="hidden px-6 py-3 text-start sm:table-cell">{t("Items", "المنتجات")}</th>
            <th className="px-6 py-3 text-end">{t("Total", "الإجمالي")}</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((o) => (
            <tr key={o.id}>
              <td className="px-6 py-4 font-semibold text-primary"><span className="flex items-center gap-2"><Package className="h-4 w-4 text-gold" aria-hidden />{o.id}</span></td>
              <td className="hidden px-6 py-4 sm:table-cell">{o.date}</td>
              <td className="px-6 py-4"><span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">{p(o.status)}</span></td>
              <td className="hidden px-6 py-4 sm:table-cell">{o.items}</td>
              <td className="px-6 py-4 text-end tabular-nums">{formatAED(o.total, lang)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t p-5 text-end"><Button variant="outline" size="sm" asChild><Link to="/shop">{t("Shop again", "تسوّق مجدداً")}</Link></Button></div>
    </div>
  );
}
