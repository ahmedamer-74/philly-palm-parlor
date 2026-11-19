import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/catalog";
import { company } from "@/data/content";
import { img } from "@/data/images";
import { useI18n } from "@/lib/i18n";

export function Newsletter() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    toast.success(t("You're subscribed — welcome to the garden!", "تم الاشتراك — أهلاً بك في حديقتنا!"));
    setEmail("");
  };
  return (
    <section className="bg-sand/60">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <span className="eyebrow">{t("Newsletter", "النشرة البريدية")}</span>
          <h2 className="mt-2 text-3xl text-primary">{t("Seasonal planting tips & offers", "نصائح زراعة موسمية وعروض")}</h2>
          <p className="mt-2 text-muted-foreground">{t("One calm email a month. No spam.", "رسالة واحدة شهرياً. بلا إزعاج.")}</p>
        </div>
        <form onSubmit={submit} className="flex w-full max-w-md gap-2">
          <label className="sr-only" htmlFor="nl-email">{t("Email address", "البريد الإلكتروني")}</label>
          <input
            id="nl-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("Your email address", "بريدك الإلكتروني")}
            className="h-12 min-w-0 flex-1 rounded-full border bg-card px-5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/25"
          />
          <Button type="submit" size="lg">{t("Subscribe", "اشترك")}</Button>
        </form>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const { t, p } = useI18n();
  return (
    <footer className="bg-forest-deep text-primary-foreground/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <div className="inline-block rounded-2xl bg-ivory p-4 shadow-card">
            <img src={img.logoFull} alt="Pheladelfia Agricultural LLC" className="h-24 w-auto" width={1140} height={851} loading="lazy" />
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            {t(
              "Growing premium palms, trees and shrubs in Abu Dhabi since 2004 — and creating landscapes across the UAE.",
              "نزرع أجود النخيل والأشجار والشجيرات في أبوظبي منذ 2004 — وننفذ المسطحات الخضراء في جميع أنحاء الإمارات.",
            )}
          </p>
        </div>
        <div>
          <h3 className="mb-5 font-display text-lg text-gold-light">{t("Shop", "المتجر")}</h3>
          <ul className="space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to="/shop" search={{ category: c.id }} className="hover:text-gold-light">
                  {p(c.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 font-display text-lg text-gold-light">{t("Company", "الشركة")}</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/services" className="hover:text-gold-light">{t("Services", "الخدمات")}</Link></li>
            <li><Link to="/projects" className="hover:text-gold-light">{t("Projects", "المشاريع")}</Link></li>
            <li><Link to="/about" className="hover:text-gold-light">{t("About us", "من نحن")}</Link></li>
            <li><Link to="/contact" className="hover:text-gold-light">{t("Contact", "اتصل بنا")}</Link></li>
            <li><Link to="/account" className="hover:text-gold-light">{t("My account", "حسابي")}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-5 font-display text-lg text-gold-light">{t("Visit & contact", "تواصل وزيارة")}</h3>
          <ul className="space-y-3.5 text-sm">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden /><span>{p(company.nursery)}<br />{p(company.branch)}</span></li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden /><a href={company.phoneHref} dir="ltr" className="hover:text-gold-light">{company.phone}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden /><a href={`mailto:${company.email}`} className="hover:text-gold-light">{company.email}</a></li>
            <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden /><span>{p(company.hours)}</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <span>© 2026 {p(company.name)}. {t("All rights reserved.", "جميع الحقوق محفوظة.")}</span>
          <span>{t("Prices in AED, excluding 5% VAT.", "الأسعار بالدرهم الإماراتي، غير شاملة ضريبة القيمة المضافة 5%.")}</span>
        </div>
      </div>
    </footer>
  );
}
