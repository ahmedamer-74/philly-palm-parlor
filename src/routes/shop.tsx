import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SearchX, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Container, EmptyState, PageBanner } from "@/components/site/bits";
import { ProductCard } from "@/components/site/commerce";
import {
  categories,
  fromPrice,
  getCategory,
  products,
  sunLabels,
  trunkLabels,
  waterLabels,
  type CategoryId,
  type Sun,
  type Trunk,
  type Water,
} from "@/data/catalog";
import { useI18n } from "@/lib/i18n";
import { formatAED } from "@/lib/pricing";
import { cn } from "@/lib/utils";

type ShopSearch = { category?: CategoryId | undefined; q?: string | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): ShopSearch => ({
    category: typeof s["category"] === "string" && getCategory(s["category"]) ? (s["category"] as CategoryId) : undefined,
    q: typeof s["q"] === "string" && s["q"] ? s["q"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Palms, Trees & Shrubs — Pheladelfia Nursery UAE" },
      { name: "description", content: "Browse UAE-acclimatized palms, trees, shrubs, ground covers, indoor plants and planters. Prices in AED with delivery across the Emirates." },
      { property: "og:title", content: "Shop Plants — Pheladelfia Agricultural" },
      { property: "og:description", content: "Palms, trees, shrubs and more from our Abu Dhabi nursery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

const PER_PAGE = 9;
const MAX_H = 7;
const MAX_P = 7000;

function Shop() {
  const { t, p, lang } = useI18n();
  const { category, q } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });

  const [height, setHeight] = useState<[number, number]>([0, MAX_H]);
  const [price, setPrice] = useState<[number, number]>([0, MAX_P]);
  const [trunks, setTrunks] = useState<Trunk[]>([]);
  const [suns, setSuns] = useState<Sun[]>([]);
  const [waters, setWaters] = useState<Water[]>([]);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    const needle = q?.toLowerCase();
    let list = products.filter((x) => {
      if (category && x.category !== category) return false;
      if (needle && ![x.name.en, x.name.ar, x.botanical, x.short.en].some((s) => s.toLowerCase().includes(needle))) return false;
      const hs = x.variants.map((v) => v.heightM);
      if (Math.max(...hs) < height[0] || Math.min(...hs) > height[1]) return false;
      if (trunks.length && !trunks.includes(x.trunk)) return false;
      if (suns.length && !suns.includes(x.sun)) return false;
      if (waters.length && !waters.includes(x.water)) return false;
      const fp = fromPrice(x);
      if (fp != null && (fp < price[0] || fp > price[1])) return false;
      return true;
    });
    const val = (x: (typeof products)[number]) => fromPrice(x) ?? Number.POSITIVE_INFINITY;
    if (sort === "price-asc") list = [...list].sort((a, b) => val(a) - val(b));
    if (sort === "price-desc") list = [...list].sort((a, b) => (fromPrice(b) ?? 1e9) - (fromPrice(a) ?? 1e9));
    if (sort === "name") list = [...list].sort((a, b) => p(a.name).localeCompare(p(b.name), lang));
    if (sort === "featured") list = [...list].sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
    return list;
  }, [category, q, height, price, trunks, suns, waters, sort, lang, p]);

  // Brief skeleton when filters change — mimics a real catalogue fetch.
  const key = JSON.stringify([category, q, height, price, trunks, suns, waters, sort]);
  const [lastKey, setLastKey] = useState(key);
  useEffect(() => {
    if (key === lastKey) return;
    setLastKey(key);
    setPage(1);
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(id);
  }, [key, lastKey]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const cat = category ? getCategory(category) : undefined;
  const title = cat ? p(cat.name) : q ? t(`Results for “${q}”`, `نتائج البحث عن «${q}»`) : t("Shop all plants", "جميع النباتات");

  const resetAll = () => {
    setHeight([0, MAX_H]);
    setPrice([0, MAX_P]);
    setTrunks([]);
    setSuns([]);
    setWaters([]);
    navigate({ search: {} });
  };

  const toggle = <T,>(arr: T[], set: (v: T[]) => void, v: T) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filters = (
    <div className="space-y-8">
      <FilterGroup title={t("Category", "الفئة")}>
        <ul className="space-y-1">
          <li>
            <button onClick={() => navigate({ search: (s) => ({ ...s, category: undefined }) })} className={cn("w-full rounded-lg px-3 py-2 text-start text-sm transition hover:bg-muted", !category && "bg-secondary font-semibold text-primary")}>
              {t("All plants", "كل النباتات")}
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <button onClick={() => navigate({ search: (s) => ({ ...s, category: c.id }) })} className={cn("flex w-full justify-between rounded-lg px-3 py-2 text-start text-sm transition hover:bg-muted", category === c.id && "bg-secondary font-semibold text-primary")}>
                {p(c.name)}
                <span className="text-xs text-muted-foreground">{products.filter((x) => x.category === c.id).length}</span>
              </button>
            </li>
          ))}
        </ul>
      </FilterGroup>
      <FilterGroup title={t("Height range", "نطاق الارتفاع")}>
        <Slider min={0} max={MAX_H} step={0.5} value={height} onValueChange={(v) => setHeight([v[0] ?? 0, v[1] ?? MAX_H])} aria-label={t("Height range", "نطاق الارتفاع")} />
        <p className="mt-3 text-sm text-muted-foreground">{t(`${height[0]} m – ${height[1]} m+`, `${height[0]} م – ${height[1]} م+`)}</p>
      </FilterGroup>
      <FilterGroup title={t("Price range", "نطاق السعر")}>
        <Slider min={0} max={MAX_P} step={50} value={price} onValueChange={(v) => setPrice([v[0] ?? 0, v[1] ?? MAX_P])} aria-label={t("Price range", "نطاق السعر")} />
        <p className="mt-3 text-sm text-muted-foreground">{formatAED(price[0], lang)} – {formatAED(price[1], lang)}</p>
      </FilterGroup>
      <CheckGroup title={t("Trunk type", "نوع الجذع")} options={(["single", "multi", "clumping"] as Trunk[]).map((v) => ({ v, label: p(trunkLabels[v]) }))} value={trunks} onToggle={(v) => toggle(trunks, setTrunks, v)} />
      <CheckGroup title={t("Sun exposure", "التعرض للشمس")} options={(["full", "partial", "shade"] as Sun[]).map((v) => ({ v, label: p(sunLabels[v]) }))} value={suns} onToggle={(v) => toggle(suns, setSuns, v)} />
      <CheckGroup title={t("Water needs", "الاحتياج المائي")} options={(["low", "moderate", "high"] as Water[]).map((v) => ({ v, label: p(waterLabels[v]) }))} value={waters} onToggle={(v) => toggle(waters, setWaters, v)} />
      <Button variant="outline" className="w-full" onClick={resetAll}>{t("Reset filters", "إعادة ضبط الفلاتر")}</Button>
    </div>
  );

  return (
    <>
      <PageBanner title={title} sub={cat ? p(cat.blurb) : t("UAE-acclimatized plants from our Abu Dhabi nursery.", "نباتات متأقلمة مع الإمارات من مشتلنا في أبوظبي.")} crumbs={cat ? [{ label: t("Shop", "المتجر"), to: "/shop" }, { label: p(cat.name) }] : [{ label: t("Shop", "المتجر") }]} image={cat?.image} />
      <Container className="grid gap-10 py-12 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden lg:block" aria-label={t("Filters", "الفلاتر")}>
          <div className="sticky top-44">{filters}</div>
        </aside>
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden"><SlidersHorizontal /> {t("Filters", "الفلاتر")}</Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-3xl bg-background">
                  <SheetHeader><SheetTitle className="text-start font-display text-primary">{t("Filters", "الفلاتر")}</SheetTitle></SheetHeader>
                  <div className="mt-6">{filters}</div>
                </SheetContent>
              </Sheet>
              <p className="text-sm text-muted-foreground" aria-live="polite">{t(`${filtered.length} products`, `${filtered.length} منتجات`)}</p>
              {q && (
                <button onClick={() => navigate({ search: (s) => ({ ...s, q: undefined }) })} className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                  “{q}” <X className="h-3 w-3" aria-label={t("Clear search", "مسح البحث")} />
                </button>
              )}
            </div>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-52 rounded-full bg-card" aria-label={t("Sort by", "ترتيب حسب")}><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">{t("Featured", "المميزة")}</SelectItem>
                <SelectItem value="price-asc">{t("Price: low to high", "السعر: من الأقل للأعلى")}</SelectItem>
                <SelectItem value="price-desc">{t("Price: high to low", "السعر: من الأعلى للأقل")}</SelectItem>
                <SelectItem value="name">{t("Name A–Z", "الاسم أ–ي")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-xl border bg-card">
                  <Skeleton className="aspect-[4/5] rounded-none" />
                  <div className="space-y-2 p-4"><Skeleton className="h-3 w-1/3" /><Skeleton className="h-5 w-2/3" /><Skeleton className="h-4 w-full" /><Skeleton className="mt-4 h-8 w-1/2" /></div>
                </div>
              ))}
            </div>
          ) : visible.length === 0 ? (
            <EmptyState
              icon={<SearchX className="h-7 w-7" />}
              title={t("No plants match your filters", "لا توجد نباتات مطابقة للفلاتر")}
              sub={t("Try widening the height or price range, or clear your search.", "جرّب توسيع نطاق الارتفاع أو السعر، أو امسح البحث.")}
              action={<Button onClick={resetAll}>{t("Reset filters", "إعادة ضبط الفلاتر")}</Button>}
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((prod) => <ProductCard key={prod.slug} product={prod} />)}
            </div>
          )}

          {pages > 1 && !loading && (
            <nav className="mt-12 flex justify-center gap-2" aria-label={t("Pagination", "ترقيم الصفحات")}>
              {Array.from({ length: pages }).map((_, i) => (
                <button key={i} onClick={() => { setPage(i + 1); window.scrollTo({ top: 300, behavior: "smooth" }); }} aria-current={page === i + 1 ? "page" : undefined} className={cn("grid h-10 w-10 place-items-center rounded-full border text-sm transition", page === i + 1 ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary")}>
                  {i + 1}
                </button>
              ))}
            </nav>
          )}

          <div className="mt-16 flex flex-col items-start justify-between gap-4 rounded-2xl bg-secondary/60 p-7 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl text-primary">{t("Free delivery on orders over AED 1,000", "توصيل مجاني للطلبات فوق 1,000 درهم")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t("Use code GREEN10 for 10% off your first order.", "استخدم الكود GREEN10 لخصم 10% على طلبك الأول.")}</p>
            </div>
            <Button variant="gold" asChild><Link to="/cart">{t("View cart", "عرض السلة")}</Link></Button>
          </div>
        </div>
      </Container>
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 font-display text-lg text-primary">{title}</legend>
      {children}
    </fieldset>
  );
}

function CheckGroup<T extends string>({ title, options, value, onToggle }: { title: string; options: { v: T; label: string }[]; value: T[]; onToggle: (v: T) => void }) {
  return (
    <FilterGroup title={title}>
      <div className="space-y-2.5">
        {options.map((o) => (
          <label key={o.v} className="flex cursor-pointer items-center gap-3 text-sm">
            <Checkbox checked={value.includes(o.v)} onCheckedChange={() => onToggle(o.v)} />
            {o.label}
          </label>
        ))}
      </div>
    </FilterGroup>
  );
}
