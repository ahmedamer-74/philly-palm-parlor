import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Container, PageBanner } from "@/components/site/bits";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Pheladelfia Agricultural" },
      { name: "description", content: "Sign in to view your orders, wishlist and saved addresses." },
      { property: "og:title", content: "My Account — Pheladelfia" },
      { property: "og:description", content: "Your orders and wishlist." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AccountLayout,
});

function AccountLayout() {
  const { t } = useI18n();
  const tabs = [
    { to: "/account", label: t("Sign in / Register", "تسجيل الدخول / حساب جديد") },
    { to: "/account/orders", label: t("My orders", "طلباتي") },
    { to: "/account/wishlist", label: t("Wishlist", "المفضلة") },
  ] as const;
  return (
    <>
      <PageBanner title={t("My account", "حسابي")} crumbs={[{ label: t("Account", "الحساب") }]} />
      <Container className="py-10">
        <nav className="no-scrollbar mb-8 flex gap-2 overflow-x-auto" aria-label={t("Account sections", "أقسام الحساب")}>
          {tabs.map((tb) => (
            <Link key={tb.to} to={tb.to} activeOptions={{ exact: true }} className="shrink-0 rounded-full border bg-card px-5 py-2 text-sm transition hover:border-primary" activeProps={{ className: "!border-primary !bg-primary text-primary-foreground" }}>
              {tb.label}
            </Link>
          ))}
        </nav>
        <Outlet />
      </Container>
    </>
  );
}
