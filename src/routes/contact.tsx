import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Container, PageBanner } from "@/components/site/bits";
import { Field, FormCard, NativeSelect, TextArea, TextInput } from "@/components/site/form";
import { company } from "@/data/content";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Pheladelfia Agricultural — +971 2 555 1662" },
      { name: "description", content: "Call +971 2 555 1662, email nursery@pheladelfia.com or visit our Abu Dhabi nursery. Open Saturday–Thursday 8am–6pm." },
      { property: "og:title", content: "Contact Pheladelfia Agricultural" },
      { property: "og:description", content: "Visit our Abu Dhabi nursery or get in touch by phone, email or WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t, p } = useI18n();
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    toast.success(t("Message sent — we'll reply shortly.", "تم إرسال رسالتك — سنرد قريباً."));
    e.currentTarget.reset();
  };
  const cards = [
    { icon: Phone, label: t("Call us", "اتصل بنا"), value: company.phone, href: company.phoneHref, ltr: true },
    { icon: Mail, label: t("Email", "البريد الإلكتروني"), value: company.email, href: `mailto:${company.email}` },
    { icon: Clock, label: t("Opening hours", "ساعات العمل"), value: p(company.hours) },
    { icon: MapPin, label: t("Locations", "المواقع"), value: `${p(company.nursery)} · ${p(company.branch)}` },
  ];
  return (
    <>
      <PageBanner title={t("Contact us", "تواصل معنا")} sub={t("Questions about a plant, an order or a project? We're happy to help.", "لديك سؤال عن نبات أو طلب أو مشروع؟ يسعدنا مساعدتك.")} crumbs={[{ label: t("Contact", "اتصل بنا") }]} />
      <Container className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_420px]">
        <form onSubmit={submit}>
          <FormCard title={t("Send us a message", "أرسل لنا رسالة")}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t("Full name", "الاسم الكامل")} htmlFor="cname"><TextInput id="cname" required /></Field>
              <Field label={t("Phone", "الهاتف")} htmlFor="cphone"><TextInput id="cphone" type="tel" dir="ltr" /></Field>
              <Field label={t("Email", "البريد الإلكتروني")} htmlFor="cemail"><TextInput id="cemail" type="email" required /></Field>
              <Field label={t("Subject", "الموضوع")} htmlFor="csub">
                <NativeSelect id="csub">
                  <option>{t("Plant enquiry", "استفسار عن نبات")}</option>
                  <option>{t("Existing order", "طلب قائم")}</option>
                  <option>{t("Landscaping project", "مشروع تنسيق حدائق")}</option>
                  <option>{t("Maintenance contract", "عقد صيانة")}</option>
                </NativeSelect>
              </Field>
              <Field label={t("Message", "الرسالة")} htmlFor="cmsg" className="sm:col-span-2"><TextArea id="cmsg" required rows={5} /></Field>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg">{t("Send message", "إرسال")}</Button>
              {sent && <span className="text-sm text-success">{t("Thanks! We'll be in touch.", "شكراً! سنتواصل معك.")}</span>}
            </div>
          </FormCard>
        </form>
        <aside className="space-y-4">
          {cards.map(({ icon: Icon, label, value, href, ltr }) => (
            <div key={label} className="flex gap-4 rounded-2xl border bg-card p-5 shadow-soft">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Icon className="h-5 w-5" aria-hidden /></span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                {href ? <a href={href} dir={ltr ? "ltr" : undefined} className="font-semibold text-primary hover:text-gold">{value}</a> : <p className="font-semibold text-primary">{value}</p>}
              </div>
            </div>
          ))}
          <Button variant="whatsapp" size="lg" className="w-full" asChild>
            <a href={company.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle /> {t("Chat on WhatsApp", "تواصل عبر واتساب")}</a>
          </Button>
        </aside>
      </Container>
      <Container className="pb-20">
        <div className="leaf-pattern relative grid h-80 place-items-center overflow-hidden rounded-3xl border bg-secondary/60" role="img" aria-label={t("Map placeholder: Pheladelfia nursery, Al Wathba, Abu Dhabi", "خريطة: مشتل فيلادلفيا، الوثبة، أبوظبي")}>
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift"><MapPin className="h-6 w-6" /></span>
            <p className="mt-4 font-display text-xl text-primary">{p(company.nursery)}</p>
            <p className="text-sm text-muted-foreground">{t("Interactive map will appear here", "ستظهر الخريطة التفاعلية هنا")}</p>
          </div>
        </div>
      </Container>
    </>
  );
}
