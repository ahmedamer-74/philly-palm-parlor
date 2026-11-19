import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, PageBanner } from "@/components/site/bits";
import { services } from "@/data/content";
import { img } from "@/data/images";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Landscaping & Grounds Maintenance Services UAE — Pheladelfia" },
      { name: "description", content: "Landscaping design & installation, grounds maintenance and interior plant maintenance for commercial and public clients across the UAE." },
      { property: "og:title", content: "Landscaping Services — Pheladelfia Agricultural" },
      { property: "og:description", content: "Design, installation and maintenance of landscapes across the UAE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

function Services() {
  const { t, p } = useI18n();
  return (
    <>
      <PageBanner title={t("Our Services", "خدماتنا")} sub={t("Complete landscape solutions for developers, contractors, hotels and government entities.", "حلول متكاملة للمسطحات الخضراء للمطورين والمقاولين والفنادق والجهات الحكومية.")} crumbs={[{ label: t("Services", "الخدمات") }]} image={img.villa} />
      <Container className="space-y-24 py-20">
        {services.map((s, i) => (
          <article key={s.id} id={s.id} className="grid scroll-mt-44 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={cn("gold-frame overflow-hidden rounded-2xl shadow-card", i % 2 === 1 && "lg:order-2")}>
              <img src={s.image} alt={p(s.title)} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div>
              <span className="eyebrow">{t(`Service 0${i + 1}`, `الخدمة 0${i + 1}`)}</span>
              <h2 className="mt-3 text-3xl font-medium text-primary sm:text-4xl">{p(s.title)}</h2>
              <p className="mt-5 leading-relaxed text-foreground/80">{p(s.body)}</p>
              <ul className="mt-6 space-y-3">
                {s.points.map((pt) => (
                  <li key={pt.en} className="flex items-center gap-3 text-sm"><span className="grid h-6 w-6 place-items-center rounded-full bg-secondary text-primary"><Check className="h-3.5 w-3.5" /></span>{p(pt)}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild><Link to="/contact">{t("Contact us", "تواصل معنا")}</Link></Button>
                <Button variant="outline" asChild><Link to="/projects">{t("See our projects", "شاهد مشاريعنا")}</Link></Button>
              </div>
            </div>
          </article>
        ))}
      </Container>
    </>
  );
}
