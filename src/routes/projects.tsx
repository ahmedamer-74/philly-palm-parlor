import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Container, PageBanner } from "@/components/site/bits";
import { projects } from "@/data/content";
import { img } from "@/data/images";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects & Gallery — Pheladelfia Landscaping UAE" },
      { name: "description", content: "Selected landscaping, palm supply and maintenance projects by Pheladelfia across Abu Dhabi, Dubai and the UAE." },
      { property: "og:title", content: "Projects — Pheladelfia Agricultural" },
      { property: "og:description", content: "Boulevards, resorts, villas and parks planted by Pheladelfia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Projects,
});

function Projects() {
  const { t, p } = useI18n();
  return (
    <>
      <PageBanner title={t("Projects & Gallery", "المشاريع ومعرض الصور")} sub={t("A selection of landscapes we have supplied, built and maintained.", "مجموعة مختارة من المساحات الخضراء التي وردناها ونفذناها وصنّاها.")} crumbs={[{ label: t("Projects", "المشاريع") }]} image={img.boulevard} />
      <Container className="py-16">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {projects.map((pr) => (
            <figure key={pr.title.en} className="group relative break-inside-avoid overflow-hidden rounded-2xl shadow-soft">
              <img src={pr.image} alt={p(pr.title)} loading="lazy" className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${pr.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
              <div className="bg-fade-up absolute inset-0" aria-hidden />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
                <span className="inline-block rounded-full bg-gold px-2.5 py-0.5 text-[0.7rem] font-semibold text-gold-foreground">{p(pr.tag)}</span>
                <h2 className="mt-3 font-display text-xl">{p(pr.title)}</h2>
                <p className="text-sm text-primary-foreground/75">{p(pr.client)}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="gold" size="lg" asChild><Link to="/shop">{t("Shop the plants", "تسوّق النباتات")}</Link></Button>
        </div>
      </Container>
    </>
  );
}
