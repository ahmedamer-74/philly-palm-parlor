import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Droplets, Heart, Leaf, Mountain, ShieldCheck, ShoppingBag, Sun, Thermometer, Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container, Price, SectionHeading } from "@/components/site/bits";
import { ProductCard, QtyStepper, StockBadge, useAddToCart } from "@/components/site/commerce";
import { getCategory, getProduct, products, sunLabels, trunkLabels, waterLabels } from "@/data/catalog";
import { useI18n } from "@/lib/i18n";
import { formatAED, VAT_RATE } from "@/lib/pricing";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug };
  },
  head: ({ loaderData }) => {
    const prod = loaderData ? getProduct(loaderData.slug) : undefined;
    if (!prod) return { meta: [{ title: "Plant not found — Pheladelfia" }, { name: "robots", content: "noindex" }] };
    const title = `${prod.name.en} (${prod.botanical}) — Pheladelfia Nursery UAE`;
    return {
      meta: [
        { title },
        { name: "description", content: prod.short.en + " Grown in Abu Dhabi, delivered across the UAE." },
        { property: "og:title", content: title },
        { property: "og:description", content: prod.short.en },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <Container className="py-24 text-center">
      <h1 className="text-4xl text-primary">Plant not found</h1>
      <Button className="mt-6" asChild><Link to="/shop">Back to shop</Link></Button>
    </Container>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  return <ProductView key={slug} slug={slug} />;
}

function ProductView({ slug }: { slug: string }) {
  const product = getProduct(slug)!;
  const { t, p, lang } = useI18n();
  const { toggleWish, isWished } = useStore();
  const addToCart = useAddToCart();
  const [imgIdx, setImgIdx] = useState(0);
  const [variantId, setVariantId] = useState(product.variants.find((v) => v.price != null)?.id ?? product.variants[0]!.id);
  const [qty, setQty] = useState(1);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]!;
  const cat = getCategory(product.category)!;
  const buyable = variant.price != null && product.stock !== "out";
  const related = products.filter((x) => x.category === product.category && x.slug !== product.slug).concat(products.filter((x) => x.category !== product.category && x.bestseller)).slice(0, 4);
  const wished = isWished(product.slug);

  const careRows = [
    { icon: Sun, label: t("Sun", "الشمس"), value: p(product.care.sun) },
    { icon: Droplets, label: t("Water", "الري"), value: p(product.care.water) },
    { icon: Mountain, label: t("Soil", "التربة"), value: p(product.care.soil) },
    { icon: Thermometer, label: t("UAE climate suitability", "الملاءمة لمناخ الإمارات"), value: p(product.care.climate) },
  ];

  return (
    <>
      <Container className="py-6">
        <nav aria-label={t("Breadcrumb", "مسار التنقل")} className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">{t("Home", "الرئيسية")}</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary">{t("Shop", "المتجر")}</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" search={{ category: cat.id }} className="hover:text-primary">{p(cat.name)}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{p(product.name)}</span>
        </nav>
      </Container>

      <Container className="grid gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-4 self-start sm:flex-row sm:items-start">
          <div className="no-scrollbar flex gap-3 overflow-x-auto sm:flex-col">
            {product.images.map((src, i) => (
              <button key={src + i} onClick={() => setImgIdx(i)} aria-label={t(`Show image ${i + 1}`, `عرض الصورة ${i + 1}`)} className={cn("h-24 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition", i === imgIdx ? "border-gold" : "border-transparent opacity-70 hover:opacity-100")}>
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="gold-frame relative min-w-0 flex-1 overflow-hidden rounded-2xl bg-muted shadow-card">
            <img src={product.images[imgIdx]} alt={`${p(product.name)} — ${product.botanical}`} className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <StockBadge stock={product.stock} />
            <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
          </div>
          <h1 className="mt-4 text-4xl font-medium text-primary sm:text-5xl">{p(product.name)}</h1>
          <p className="mt-2 font-display text-lg italic text-muted-foreground">{product.botanical}</p>
          <p className="mt-1 text-sm text-muted-foreground">{lang === "en" ? product.name.ar : product.name.en}</p>

          <div className="mt-6 flex items-baseline gap-3 border-y py-5">
            <Price value={variant.price} className="text-3xl" />
            {variant.price != null && (
              <span className="text-sm text-muted-foreground">
                {t(`excl. ${VAT_RATE * 100}% VAT · ${formatAED(variant.price * (1 + VAT_RATE), "en")} incl. VAT`, `غير شامل ضريبة ${VAT_RATE * 100}% · ${formatAED(variant.price * (1 + VAT_RATE), "ar")} شامل الضريبة`)}
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-foreground/85">{p(product.short)}</p>

          <fieldset className="mt-7">
            <legend className="text-sm font-semibold text-primary">{t("Height / size", "الارتفاع / الحجم")}: <span className="font-normal text-muted-foreground">{p(variant.label)}</span></legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button key={v.id} type="button" onClick={() => setVariantId(v.id)} aria-pressed={v.id === variantId} className={cn("rounded-xl border px-4 py-2.5 text-start text-sm transition", v.id === variantId ? "border-primary bg-primary text-primary-foreground shadow-soft" : "bg-card hover:border-primary")}>
                  <span className="block font-semibold">{p(v.label)}</span>
                  <span className={cn("block text-xs", v.id === variantId ? "text-primary-foreground/75" : "text-muted-foreground")}>{v.price != null ? formatAED(v.price, lang) : "—"}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {buyable && <QtyStepper value={qty} onChange={setQty} />}
            {buyable ? (
              <Button size="lg" onClick={() => addToCart(product, variant.id, qty)}><ShoppingBag /> {t("Add to cart", "أضف إلى السلة")}</Button>
            ) : (
              <Button size="lg" variant="outline" disabled>{t("Out of stock", "غير متوفر حالياً")}</Button>
            )}
            <Button size="icon" variant="outline" onClick={() => toggleWish(product.slug)} aria-pressed={wished} aria-label={t("Wishlist", "المفضلة")} className="h-12 w-12">
              <Heart className={cn(wished && "fill-gold text-gold")} />
            </Button>
          </div>

          <ul className="mt-8 grid gap-3 rounded-2xl bg-secondary/50 p-5 text-sm sm:grid-cols-3">
            <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" aria-hidden />{t("UAE-wide delivery", "توصيل لكل الإمارات")}</li>
            <li className="flex items-center gap-2"><Leaf className="h-4 w-4 text-primary" aria-hidden />{t("Acclimatized stock", "نباتات متأقلمة")}</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" aria-hidden />{t("30-day health guarantee", "ضمان صحة 30 يوماً")}</li>
          </ul>

          <dl className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="rounded-xl border bg-card p-3"><dt className="text-muted-foreground">{t("Trunk", "الجذع")}</dt><dd className="mt-1 font-semibold text-primary">{p(trunkLabels[product.trunk])}</dd></div>
            <div className="rounded-xl border bg-card p-3"><dt className="text-muted-foreground">{t("Sun", "الشمس")}</dt><dd className="mt-1 font-semibold text-primary">{p(sunLabels[product.sun])}</dd></div>
            <div className="rounded-xl border bg-card p-3"><dt className="text-muted-foreground">{t("Water", "الري")}</dt><dd className="mt-1 font-semibold text-primary">{p(waterLabels[product.water])}</dd></div>
          </dl>
        </div>
      </Container>

      <Container className="pb-20">
        <Tabs defaultValue="description" dir={lang === "ar" ? "rtl" : "ltr"}>
          <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto rounded-full bg-muted p-1.5 sm:w-auto">
            <TabsTrigger value="description" className="rounded-full px-5 py-2">{t("Description", "الوصف")}</TabsTrigger>
            <TabsTrigger value="care" className="rounded-full px-5 py-2">{t("Care Guide", "دليل العناية")}</TabsTrigger>
            <TabsTrigger value="delivery" className="rounded-full px-5 py-2">{t("Delivery & Planting", "التوصيل والزراعة")}</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-8 max-w-3xl text-lg leading-relaxed text-foreground/85">{p(product.description)}</TabsContent>
          <TabsContent value="care" className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {careRows.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4 rounded-2xl border bg-card p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Icon className="h-5 w-5" aria-hidden /></span>
                  <div><h3 className="font-display text-lg text-primary">{label}</h3><p className="mt-1 text-sm text-muted-foreground">{value}</p></div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="delivery" className="mt-8 max-w-3xl space-y-4 text-foreground/85">
            <p>{t("Delivered by our own crane-equipped trucks across all seven Emirates. Abu Dhabi & Dubai: AED 75, other Emirates: AED 120. Free on orders over AED 1,000.", "التوصيل بشاحناتنا المجهزة برافعات إلى جميع الإمارات السبع. أبوظبي ودبي: 75 درهماً، باقي الإمارات: 120 درهماً. مجاني للطلبات فوق 1,000 درهم.")}</p>
            <p>{t("Large palms (4 m+) are delivered with root-ball protection and can be planted by our team on request. Planting service is arranged per site.", "يتم توصيل النخيل الكبير (4 م فأكثر) مع حماية كتلة الجذور، ويمكن لفريقنا زراعته عند الطلب. يتم ترتيب خدمة الزراعة حسب الموقع.")}</p>
            <p>{t("Typical lead time: 2–4 working days for stock items.", "مدة التوصيل المعتادة: 2–4 أيام عمل للمنتجات المتوفرة.")}</p>
          </TabsContent>
        </Tabs>
      </Container>

      <section className="bg-sand/50 py-20">
        <Container>
          <SectionHeading align="start" eyebrow={t("You may also like", "قد يعجبك أيضاً")} title={t("Related plants", "نباتات ذات صلة")} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => <ProductCard key={r.slug} product={r} />)}
          </div>
        </Container>
      </section>
    </>
  );
}
