import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Target, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, PageBanner, SectionHeading } from "@/components/site/bits";
import { company } from "@/data/content";
import { img } from "@/data/images";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Pheladelfia Agricultural — Abu Dhabi Nursery Since 2004" },
      { name: "description", content: "Since 2004 Pheladelfia has grown palms, trees and shrubs at its Abu Dhabi nursery, with a branch in Dubai serving landscapes across the UAE." },
      { property: "og:title", content: "About Pheladelfia Agricultural" },
      { property: "og:description", content: "An Abu Dhabi nursery and landscaping company since 2004." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  const { t, p } = useI18n();
  const stats = [
    { n: "2004", l: t("Founded in Abu Dhabi", "تأسست في أبوظبي") },
    { n: "50,000+", l: t("Plants in the nursery", "نبتة في المشتل") },
    { n: "350+", l: t("Projects delivered", "مشروع منجز") },
    { n: "7", l: t("Emirates served", "إمارات نخدمها") },
  ];
  return (
    <>
      <PageBanner title={t("Our story", "قصتنا")} sub={t("Two decades of growing the green heart of the Emirates.", "عقدان من زراعة القلب الأخضر للإمارات.")} crumbs={[{ label: t("About", "من نحن") }]} image={img.palmGroveFan} />
      <Container className="grid items-center gap-12 py-20 lg:grid-cols-2">
        <div>
          <span className="eyebrow">{t("Since 2004", "منذ 2004")}</span>
          <h2 className="mt-3 text-4xl font-medium text-primary">{t("From a single nursery to a UAE landscaping partner", "من مشتل واحد إلى شريك في تنسيق الحدائق بالإمارات")}</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-foreground/80">
            <p>{t("Pheladelfia Agricultural LLC began in 2004 with a simple belief: plants for the UAE should be grown in the UAE. Our Abu Dhabi nursery acclimatizes every palm, tree and shrub to local heat, soil and water so it thrives from the day it is planted.", "بدأت فيلادلفيا الزراعية عام 2004 بقناعة بسيطة: نباتات الإمارات يجب أن تُزرع في الإمارات. يقوم مشتلنا في أبوظبي بتأقلم كل نخلة وشجرة وشجيرة مع الحرارة والتربة والمياه المحلية لتزدهر منذ يوم زراعتها.")}</p>
            <p>{t("Today we supply developers, contractors, hotels and government entities, and our landscaping and maintenance teams care for gardens, parks and interiors across all seven Emirates — supported by our branch in Dubai.", "اليوم نورّد للمطورين والمقاولين والفنادق والجهات الحكومية، وتعتني فرق التنسيق والصيانة لدينا بالحدائق والمتنزهات والمساحات الداخلية في جميع الإمارات السبع — بدعم من فرعنا في دبي.")}</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3 rounded-xl border bg-card p-4"><MapPin className="h-5 w-5 shrink-0 text-gold" aria-hidden /><span className="text-sm">{p(company.nursery)}</span></div>
            <div className="flex gap-3 rounded-xl border bg-card p-4"><MapPin className="h-5 w-5 shrink-0 text-gold" aria-hidden /><span className="text-sm">{p(company.branch)}</span></div>
          </div>
        </div>
        <div className="gold-frame overflow-hidden rounded-2xl shadow-card">
          <img src={img.palmSingle} alt={t("Specimen palm at the Pheladelfia nursery", "نخلة مميزة في مشتل فيلادلفيا")} loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </div>
      </Container>

      <section className="bg-gradient-forest py-16 text-primary-foreground">
        <Container className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="text-gradient-gold font-display text-5xl font-medium">{s.n}</p>
              <p className="mt-2 text-sm text-primary-foreground/75">{s.l}</p>
            </div>
          ))}
        </Container>
      </section>

      <Container className="py-20">
        <SectionHeading eyebrow={t("What drives us", "ما يحركنا")} title={t("Mission & vision", "الرسالة والرؤية")} />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-8 shadow-soft">
            <Target className="h-8 w-8 text-gold" aria-hidden />
            <h3 className="mt-4 text-2xl text-primary">{t("Our mission", "رسالتنا")}</h3>
            <p className="mt-3 text-muted-foreground">{t("To provide healthy, locally acclimatized plants and dependable landscaping services that make UAE communities greener, cooler and more beautiful.", "تقديم نباتات صحية متأقلمة محلياً وخدمات تنسيق موثوقة تجعل مجتمعات الإمارات أكثر خضرة وبرودة وجمالاً.")}</p>
          </div>
          <div className="rounded-2xl border bg-card p-8 shadow-soft">
            <Eye className="h-8 w-8 text-gold" aria-hidden />
            <h3 className="mt-4 text-2xl text-primary">{t("Our vision", "رؤيتنا")}</h3>
            <p className="mt-3 text-muted-foreground">{t("To be the most trusted name in UAE horticulture — championing native species and water-wise landscapes for a sustainable future.", "أن نكون الاسم الأكثر ثقة في البستنة بالإمارات — ندعم الأنواع المحلية والحدائق الموفرة للمياه من أجل مستقبل مستدام.")}</p>
          </div>
        </div>
        <div className="mt-12 text-center"><Button size="lg" asChild><Link to="/contact">{t("Visit our nursery", "زر مشتلنا")}</Link></Button></div>
      </Container>
    </>
  );
}
