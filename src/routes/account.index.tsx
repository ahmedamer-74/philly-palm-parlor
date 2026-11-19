import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, TextInput } from "@/components/site/form";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account/")({
  component: SignIn,
});

function SignIn() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    toast.success(mode === "login" ? t("Welcome back!", "مرحباً بعودتك!") : t("Account created", "تم إنشاء الحساب"));
    navigate({ to: "/account/orders" });
  };
  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-card p-8 shadow-card">
      <div className="mb-8 grid grid-cols-2 rounded-full bg-muted p-1">
        {(["login", "register"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={cn("rounded-full py-2 text-sm font-medium transition", mode === m ? "bg-card text-primary shadow-soft" : "text-muted-foreground")}>
            {m === "login" ? t("Sign in", "تسجيل الدخول") : t("Register", "حساب جديد")}
          </button>
        ))}
      </div>
      <h2 className="text-3xl text-primary">{mode === "login" ? t("Welcome back", "مرحباً بعودتك") : t("Create your account", "أنشئ حسابك")}</h2>
      <form onSubmit={submit} className="mt-6 space-y-4">
        {mode === "register" && <Field label={t("Full name", "الاسم الكامل")} htmlFor="aname"><TextInput id="aname" required /></Field>}
        <Field label={t("Email", "البريد الإلكتروني")} htmlFor="aemail"><TextInput id="aemail" type="email" required /></Field>
        <Field label={t("Password", "كلمة المرور")} htmlFor="apass"><TextInput id="apass" type="password" required minLength={6} /></Field>
        <Button type="submit" size="lg" className="w-full">{mode === "login" ? t("Sign in", "تسجيل الدخول") : t("Create account", "إنشاء حساب")}</Button>
        <p className="text-center text-xs text-muted-foreground">{t("Prototype — no real account is created.", "نموذج تجريبي — لا يتم إنشاء حساب فعلي.")}</p>
      </form>
    </div>
  );
}
