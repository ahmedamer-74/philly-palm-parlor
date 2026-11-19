import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Building2, Calendar, Leaf, Quote, Sprout, Sun, Trees, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Container, SectionHeading } from "@/components/site/bits";
import { ProductCard } from "@/components/site/commerce";
import { Newsletter } from "@/components/site/SiteFooter";
import { categories, products } from "@/data/catalog";
import { services, testimonials } from "@/data/content";
import { img } from "@/data/images";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pheladelfia Agricultural — Premium Palms & Trees, Grown in the UAE" },
      { name: "description", content: "Shop UAE-acclimatized palms, trees, shrubs and ground covers from Pheladelfia's Abu Dhabi nursery. Landscaping and maintenance since 2004." },
      { property: "og:title", content: "Premium Palms & Trees, Grown in the UAE — Pheladelfia" },
      { property: "og:description", content: "UAE-acclimatized palms, trees and shrubs from our Abu Dhabi nursery, delivered across the Emirates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, p, dir } = useI18n();
  const best = products.filter((x) => x.bestseller);

  const trust = [
    { icon: Calendar, label: t("Since 2004", "منذ 2004"), sub: t("Two decades of growing", "عقدان من الزراعة") },
    { icon: Sun, label: t("UAE-adapted plants", "نباتات متأقلمة مع الإمارات"), sub: t("Acclimatized in Abu Dhabi", "متأقلمة في أبوظبي") },
    { icon: Truck, label: t("Delivery across the UAE", "توصيل لجميع الإمارات"), sub: t("Free over AED 1,000", "مجاني فوق 1,000 درهم") },
    { icon: Trees, label: t("Landscaping services", "خدمات تنسيق الحدائق"), sub: t("Design to maintenance", "من التصميم إلى الصيانة") },
  ];

  const why = [
    { icon: Sprout, title: t("Locally acclimatized", "متأقلمة محلياً"), body: t("Every plant is hardened in our Abu Dhabi nursery to thrive in UAE heat, wind and soil.", "كل نبتة تتأقلم في مشتلنا بأبوظبي لتزدهر في حرارة الإمارات ورياحها وتربتها.") },
    { icon: Leaf, title: t("Wide variety", "تشكيلة واسعة"), body: t("From rare specimen palms to native Ghaf and ground covers — hundreds of species in stock.", "من النخيل النادر إلى الغاف المحلي والمغطيات الأرضية — مئات الأصناف المتوفرة.") },
    { icon: Users, title: t("Experienced team", "فريق خبير"), body: t("Horticulturists and landscape engineers with 20+ years of regional experience.", "مهندسون زراعيون ومهندسو حدائق بخبرة تتجاوز 20 عاماً في المنطقة.") },
    { icon: Building2, title: t("Large-scale capacity", "قدرة على المشاريع الكبرى"), body: t("Thousands of mature palms ready to supply government and developer projects.", "آلاف النخيل الناضج جاهزة لتوريد المشاريع الحكومية ومشاريع المطورين.") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate min-h-[78vh] overflow-hidden">
        <img src={img.palmNurseryRows} alt={t("Rows of mature Washingtonia palms at the Pheladelfia nursery in Abu Dhabi", "صفوف من نخيل الواشنطونيا الناضج في مشتل فيلادلفيا بأبوظبي")} className="animate-slow-zoom absolute inset-0 -z-10 h-full w-full object-cover" fetchPriority="high" />
        <div className="bg-hero-overlay absolute inset-0 -z-10" aria-hidden />
        <Container className="flex min-h-[78vh] flex-col justify-center py-20">
          <div className="max-w-2xl text-primary-foreground">
            <span className="animate-fade-up flex items-center gap-3">
              <span className="gold-rule" />
              <span className="eyebrow text-gold-light">{t("Abu Dhabi nursery · Est. 2004", "مشتل أبوظبي · منذ 2004")}</span>
            </span>
            <h1 className="animate-fade-up mt-6 text-5xl font-medium leading-[1.05] sm:text-6xl lg:text-7xl [animation-delay:120ms]">
              {t("Premium Palms & Trees,", "نخيل وأشجار فاخرة،")} <em className="text-gradient-gold not-italic sm:italic rtl:not-italic">{t("Grown in the UAE", "مزروعة في الإمارات")}</em>
            </h1>
            <p className="animate-fade-up mt-6 max-w-xl text-lg text-primary-foreground/85 [animation-delay:240ms]">
              {t(
                "Specimen palms, native trees and flowering shrubs — acclimatized in our Abu Dhabi nursery and delivered ready to plant across the Emirates.",
                "نخيل مميز وأشجار محلية وشجيرات مزهرة — متأقلمة في مشتلنا بأبوظبي وتصلك جاهزة للزراعة في جميع أنحاء الإمارات.",
              )}
            </p>
            <div className="animate-fade-up mt-9 flex flex-wrap gap-3 [animation-delay:360ms]">
              <Button variant="gold" size="lg" asChild>
                <Link to="/shop">{t("Shop Plants", "تسوّق النباتات")} <ArrowRight className="rtl:rotate-180" /></Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/shop" search={{ category: "palms" }}>{t("Browse Palms", "تصفح النخيل")}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust bar */}
      <section className="relative z-10 -mt-12">
        <Container>
          <ul className="grid grid-cols-2 overflow-hidden rounded-2xl border bg-card shadow-card lg:grid-cols-4">
            {trust.map(({ icon: Icon, label, sub }) => (
              <li key={label} className="flex flex-col items-start gap-3 border-b border-e p-4 last:border-e-0 sm:flex-row sm:items-center sm:gap-4 sm:p-6 lg:border-b-0">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-primary sm:h-12 sm:w-12"><Icon className="h-5 w-5" aria-hidden /></span>
                <span className="min-w-0">
                  <span className="block font-display text-[0.95rem] font-semibold text-primary sm:text-base">{label}</span>
                  <span className="block text-xs text-muted-foreground">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-24">
        <Container>
          <SectionHeading eyebrow={t("Shop by category", "تسوّق حسب الفئة")} title={t("Everything for a thriving landscape", "كل ما تحتاجه لمساحة خضراء مزدهرة")} sub={t("Browse our nursery by plant type — every item grown or selected for the UAE climate.", "تصفح مشتلنا حسب نوع النبات — كل صنف مزروع أو مختار لمناخ الإمارات.")} />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {categories.map((c) => (
              <Link key={c.id} to="/shop" search={{ category: c.id }} className="group relative isolate aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
                <img src={c.image} alt={p(c.name)} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="bg-fade-up absolute inset-0 -z-10" aria-hidden />
                <div className="flex h-full flex-col justify-end p-5 text-primary-foreground sm:p-7">
                  <span className="text-xs text-gold-light">{p(c.blurb)}</span>
                  <span className="mt-1 flex items-center justify-between gap-2 font-display text-xl sm:text-2xl">
                    {p(c.name)}
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary-foreground/40 transition group-hover:border-gold group-hover:bg-gold group-hover:text-gold-foreground"><ArrowRight className="h-4 w-4 rtl:rotate-180" /></span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Best sellers */}
      <section className="bg-sand/50 py-24">
        <Container>
          <Carousel key={dir} opts={{ align: "start", direction: dir }} className="w-full">
            <SectionHeading
              align="start"
              eyebrow={t("Best sellers", "الأكثر مبيعاً")}
              title={t("Our most-loved plants", "النباتات الأكثر طلباً")}
              action={
                <div className="flex gap-2">
                  <CarouselPrevious className="static h-10 w-10 translate-y-0 rtl:[&_svg]:rotate-180" />
                  <CarouselNext className="static h-10 w-10 translate-y-0 rtl:[&_svg]:rotate-180" />
                </div>
              }
            />
            <CarouselContent className="-ms-5">
              {best.map((prod) => (
                <CarouselItem key={prod.slug} className="basis-[80%] ps-5 sm:basis-1/2 lg:basis-1/4">
                  <ProductCard product={prod} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Container>
      </section>

      {/* Services */}
      <section className="py-24">
        <Container>
          <SectionHeading eyebrow={t("Our services", "خدماتنا")} title={t("Beyond the nursery", "ما هو أبعد من المشتل")} sub={t("We design, build and care for landscapes for commercial and public clients across the UAE.", "نصمم وننفذ ونصون المساحات الخضراء للعملاء التجاريين والجهات العامة في جميع أنحاء الإمارات.")} />
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <article key={s.id} className="group overflow-hidden rounded-2xl border bg-card shadow-soft transition hover:shadow-lift">
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={s.image} alt={p(s.title)} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-primary">{p(s.title)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p(s.short)}</p>
                  <Link to="/services" hash={s.id} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-primary">
                    {t("Learn more", "اعرف المزيد")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Why */}
      <section className="relative overflow-hidden bg-gradient-forest py-24 text-primary-foreground">
        <div className="leaf-pattern absolute inset-0" aria-hidden />
        <Container className="relative grid items-center gap-14 lg:grid-cols-2">
          <div className="gold-frame overflow-hidden rounded-2xl">
            <img src={img.palmSingle} alt={t("A specimen fan palm at our nursery", "نخلة مروحية مميزة في مشتلنا")} loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div>
            <span className="flex items-center gap-3"><span className="gold-rule" /><span className="eyebrow text-gold-light">{t("Why Pheladelfia", "لماذا فيلادلفيا")}</span></span>
            <h2 className="mt-4 text-4xl font-medium sm:text-5xl">{t("Rooted in the Emirates for over 20 years", "متجذرون في الإمارات لأكثر من 20 عاماً")}</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {why.map(({ icon: Icon, title, body }) => (
                <div key={title}>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/50 text-gold-light"><Icon className="h-5 w-5" aria-hidden /></span>
                  <h3 className="mt-4 text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Bulk banner */}
      <section className="py-24">
        <Container>
          <div className="relative isolate overflow-hidden rounded-3xl shadow-lift">
            <img src={img.boulevard} alt="" aria-hidden className="absolute inset-0 -z-10 h-full w-full object-cover" loading="lazy" />
            <div className="bg-hero-overlay absolute inset-0 -z-10" aria-hidden />
            <div className="max-w-xl p-8 text-primary-foreground sm:p-14">
              <Award className="h-8 w-8 text-gold-light" aria-hidden />
              <h2 className="mt-4 text-3xl font-medium sm:text-4xl">{t("10% off your first order", "خصم 10% على طلبك الأول")}</h2>
              <p className="mt-3 text-primary-foreground/85">
                {t(
                  "Use code GREEN10 at checkout. Free delivery across the UAE on orders over AED 1,000.",
                  "استخدم الكود GREEN10 عند الدفع. توصيل مجاني لجميع الإمارات للطلبات فوق 1,000 درهم.",
                )}
              </p>
              <Button variant="gold" size="lg" className="mt-8" asChild>
                <Link to="/shop">{t("Shop now", "تسوّق الآن")} <ArrowRight className="rtl:rotate-180" /></Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="pb-24">
        <Container>
          <SectionHeading eyebrow={t("Testimonials", "آراء العملاء")} title={t("Trusted by developers, hotels & homeowners", "موضع ثقة المطورين والفنادق وأصحاب المنازل")} />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((q) => (
              <figure key={q.name.en} className="flex flex-col rounded-2xl border bg-card p-7 shadow-soft">
                <Quote className="h-7 w-7 text-gold rtl:-scale-x-100" aria-hidden />
                <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed text-primary">“{p(q.quote)}”</blockquote>
                <figcaption className="mt-6 border-t pt-4">
                  <span className="block font-semibold text-foreground">{p(q.name)}</span>
                  <span className="text-sm text-muted-foreground">{p(q.role)}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <Newsletter />
    </>
  );
}
