import { Link, useNavigate } from "@tanstack/react-router";
import { Clock, Heart, Languages, Menu, Phone, Search, ShoppingBag, Truck, User } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { company } from "@/data/content";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { Logo } from "./bits";

export function useNavItems() {
  const { t } = useI18n();
  return [
    { to: "/shop", label: t("Shop", "المتجر") },
    { to: "/services", label: t("Services", "الخدمات") },
    { to: "/projects", label: t("Projects", "المشاريع") },
    { to: "/about", label: t("About", "من نحن") },
    { to: "/contact", label: t("Contact", "اتصل بنا") },
  ] as const;
}

function SearchBox({ onDone, className }: { onDone?: () => void; className?: string }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: q.trim() || undefined } });
    onDone?.();
  };
  return (
    <form onSubmit={submit} role="search" className={className}>
      <label className="relative block">
        <span className="sr-only">{t("Search plants", "ابحث عن النباتات")}</span>
        <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("Search palms, trees, shrubs…", "ابحث عن النخيل والأشجار والشجيرات…")}
          className="h-11 w-full rounded-full border bg-muted/60 ps-11 pe-4 text-sm outline-none transition focus:border-gold focus:bg-card focus:ring-2 focus:ring-gold/25"
        />
      </label>
    </form>
  );
}

export function SiteHeader() {
  const { t, toggle, isAr } = useI18n();
  const { count, setCartOpen, wishlist } = useStore();
  const nav = useNavItems();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
      <div className="hidden bg-primary text-primary-foreground/85 md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
          <span className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5 text-gold-light" aria-hidden />
            {t("Free delivery across the UAE on orders over AED 1,000", "توصيل مجاني لجميع الإمارات للطلبات فوق 1,000 درهم")}
          </span>
          <span className="flex items-center gap-5">
            <a href={company.phoneHref} className="flex items-center gap-1.5 hover:text-gold-light" dir="ltr">
              <Phone className="h-3.5 w-3.5 text-gold-light" aria-hidden />
              {company.phone}
            </a>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gold-light" aria-hidden />
              {t(company.hours.en, company.hours.ar)}
            </span>
          </span>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t("Open menu", "فتح القائمة")}>
                <Menu className="!h-5 !w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isAr ? "right" : "left"} className="w-80 bg-background">
              <SheetHeader>
                <SheetTitle className="text-start font-display text-primary">{t("Menu", "القائمة")}</SheetTitle>
              </SheetHeader>
              <SearchBox className="mt-4" onDone={() => setMenuOpen(false)} />
              <nav className="mt-6 flex flex-col" aria-label={t("Mobile navigation", "قائمة الجوال")}>
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setMenuOpen(false)}
                    className="border-b py-3.5 font-display text-lg text-primary"
                    activeProps={{ className: "text-gold" }}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Logo />
        </div>

        <SearchBox className="mx-auto hidden w-full max-w-md md:block" />

        <div className="flex items-center justify-end gap-0.5 sm:gap-1">
          <Button variant="ghost" size="sm" onClick={toggle} className="h-10 gap-1.5 px-3" aria-label={t("Switch to Arabic", "التبديل إلى الإنجليزية")}>
            <Languages />
            <span className={isAr ? "font-sans" : "font-arabic"}>{isAr ? "EN" : "عربي"}</span>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
            <Link to="/account/wishlist" aria-label={t("Wishlist", "المفضلة")} className="relative">
              <Heart className="!h-5 !w-5" />
              {wishlist.length > 0 && (
                <span className="absolute end-1 top-1 h-2 w-2 rounded-full bg-gold" aria-hidden />
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/account" aria-label={t("Account", "الحساب")}>
              <User className="!h-5 !w-5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setCartOpen(true)}
            aria-label={t(`Cart, ${count} items`, `السلة، ${count} منتجات`)}
          >
            <ShoppingBag className="!h-5 !w-5" />
            {count > 0 && (
              <span className="absolute -end-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[0.65rem] font-bold text-gold-foreground">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>

      <nav className="hidden border-t lg:block" aria-label={t("Main navigation", "القائمة الرئيسية")}>
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-8">
          <ul className="flex items-center gap-9">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="relative py-3 text-sm font-medium text-foreground/80 transition-colors hover:text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100"
                  activeProps={{ className: "!text-primary after:!scale-x-100" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/shop" search={{ category: "palms" }} className="flex items-center gap-2 text-sm font-semibold text-gold hover:text-primary">
            {t("Shop palms — free delivery over AED 1,000", "تسوّق النخيل — توصيل مجاني فوق 1,000 درهم")}
            <span aria-hidden className="rtl:rotate-180">→</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
