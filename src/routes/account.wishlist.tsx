import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/site/bits";
import { ProductCard } from "@/components/site/commerce";
import { getProduct } from "@/data/catalog";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/account/wishlist")({
  component: Wishlist,
});

function Wishlist() {
  const { t } = useI18n();
  const { wishlist } = useStore();
  const items = wishlist.map(getProduct).filter((x) => !!x);
  if (!items.length)
    return (
      <EmptyState icon={<Heart className="h-7 w-7" />} title={t("Your wishlist is empty", "قائمة المفضلة فارغة")} sub={t("Tap the heart on any plant to save it here.", "اضغط على القلب في أي نبات لحفظه هنا.")} action={<Button asChild><Link to="/shop">{t("Browse plants", "تصفح النباتات")}</Link></Button>} />
    );
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((p) => <ProductCard key={p.slug} product={p} />)}
    </div>
  );
}
