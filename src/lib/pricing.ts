/** Pricing rules for the prototype. Shown product prices exclude VAT. */
export const VAT_RATE = 0.05;
export const FREE_DELIVERY_THRESHOLD = 1000;
export const PROMO_CODES: Record<string, number> = { GREEN10: 0.1 };

export type Emirate =
  | "abu-dhabi"
  | "dubai"
  | "sharjah"
  | "ajman"
  | "umm-al-quwain"
  | "ras-al-khaimah"
  | "fujairah";

export const EMIRATES: { id: Emirate; en: string; ar: string }[] = [
  { id: "abu-dhabi", en: "Abu Dhabi", ar: "أبوظبي" },
  { id: "dubai", en: "Dubai", ar: "دبي" },
  { id: "sharjah", en: "Sharjah", ar: "الشارقة" },
  { id: "ajman", en: "Ajman", ar: "عجمان" },
  { id: "umm-al-quwain", en: "Umm Al Quwain", ar: "أم القيوين" },
  { id: "ras-al-khaimah", en: "Ras Al Khaimah", ar: "رأس الخيمة" },
  { id: "fujairah", en: "Fujairah", ar: "الفجيرة" },
];

/** Abu Dhabi & Dubai have our nursery and branch, so delivery is cheaper there. */
export function deliveryFee(subtotal: number, emirate?: Emirate | undefined): number {
  if (subtotal <= 0) return 0;
  if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
  if (!emirate || emirate === "abu-dhabi" || emirate === "dubai") return 75;
  return 120;
}

export function promoRate(code: string): number {
  return PROMO_CODES[code.trim().toUpperCase()] ?? 0;
}

export function computeTotals(subtotal: number, opts: { promo?: string | undefined; emirate?: Emirate | undefined } = {}) {
  const discount = round2(subtotal * promoRate(opts.promo ?? ""));
  const delivery = deliveryFee(subtotal - discount, opts.emirate);
  const taxable = subtotal - discount + delivery;
  const vat = round2(taxable * VAT_RATE);
  return { subtotal, discount, delivery, vat, total: round2(taxable + vat) };
}

export function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function formatAED(n: number, lang: "en" | "ar" = "en") {
  const v = n.toLocaleString(lang === "ar" ? "ar-AE" : "en-AE", {
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return lang === "ar" ? `${v} د.إ` : `AED ${v}`;
}
