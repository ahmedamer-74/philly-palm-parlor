import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";
export type Localized = { en: string; ar: string };

type I18nValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  isAr: boolean;
  toggle: () => void;
  setLang: (l: Lang) => void;
  /** Inline bilingual string: t("Shop", "تسوّق") */
  t: (en: string, ar: string) => string;
  /** Pick the active language from a localized object */
  p: (v: Localized) => string;
  num: (n: number) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === "en" ? "ar" : "en")), []);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      isAr: lang === "ar",
      toggle,
      setLang,
      t: (en, ar) => (lang === "ar" ? ar : en),
      p: (v) => v[lang],
      num: (n) => n.toLocaleString(lang === "ar" ? "ar-AE" : "en-AE"),
    }),
    [lang, toggle],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
