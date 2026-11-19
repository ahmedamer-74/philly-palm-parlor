import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { img } from "@/data/images";
import { useI18n } from "@/lib/i18n";
import { formatAED } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <Link to="/" className={cn("flex shrink-0 items-center gap-3", className)} aria-label={t("Pheladelfia home", "الصفحة الرئيسية")}>
      <img src={img.logoMark} alt="Pheladelfia Agricultural LLC" className="h-11 w-auto sm:h-12" width={1140} height={690} />
      <span className="hidden flex-col leading-tight lg:flex">
        <span className="font-display text-[0.95rem] font-semibold text-primary">{t("Pheladelfia", "فيلادلفيا")}</span>
        <span className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground rtl:tracking-normal">
          {t("Agricultural LLC", "الزراعية ذ.م.م")}
        </span>
      </span>
    </Link>
  );
}

export function Price({ value, className }: { value: number | null; className?: string }) {
  const { lang, t } = useI18n();
  if (value == null) return <span className={cn("font-medium text-muted-foreground", className)}>{t("Unavailable", "غير متوفر")}</span>;
  return <span className={cn("font-semibold text-primary", className)}>{formatAED(value, lang)}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  action,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "center" | "start";
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start sm:flex-row sm:items-end sm:justify-between",
      )}
    >
      <div className={cn("flex flex-col gap-3", align === "center" && "items-center")}>
        {eyebrow && (
          <span className="flex items-center gap-3">
            <span className="gold-rule" />
            <span className="eyebrow">{eyebrow}</span>
            {align === "center" && <span className="gold-rule" />}
          </span>
        )}
        <h2 className="max-w-2xl text-3xl font-medium text-primary sm:text-4xl">{title}</h2>
        {sub && <p className="max-w-xl text-muted-foreground">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export type Crumb = { label: string; to?: "/shop" | "/services" | "/account" };

export function PageBanner({ title, sub, crumbs, image }: { title: string; sub?: string | undefined; crumbs: Crumb[]; image?: string | undefined }) {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden bg-gradient-forest text-primary-foreground">
      {image && <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />}
      <div className="leaf-pattern absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <nav aria-label={t("Breadcrumb", "مسار التنقل")} className="mb-5">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-primary-foreground/70">
            <li>
              <Link to="/" className="hover:text-gold-light">
                {t("Home", "الرئيسية")}
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden />
                {c.to ? (
                  <Link to={c.to} className="hover:text-gold-light">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-gold-light">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-4xl font-medium sm:text-5xl">{title}</h1>
        {sub && <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">{sub}</p>}
        <span className="gold-rule mt-6 w-20" />
      </div>
    </section>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function EmptyState({ icon, title, sub, action }: { icon: ReactNode; title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
      <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-secondary text-primary">{icon}</div>
      <h3 className="text-2xl text-primary">{title}</h3>
      {sub && <p className="mt-2 max-w-sm text-muted-foreground">{sub}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
