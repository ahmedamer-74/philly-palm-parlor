import { describe, expect, it } from "vitest";
import { computeTotals, deliveryFee, promoRate, VAT_RATE } from "./pricing";

describe("pricing rules", () => {
  it("charges 5% VAT", () => {
    expect(VAT_RATE).toBe(0.05);
    expect(computeTotals(1000).vat).toBe(50);
  });

  it("delivers free from AED 1,000", () => {
    expect(deliveryFee(1000, "sharjah")).toBe(0);
    expect(deliveryFee(999, "dubai")).toBe(75);
  });

  it("charges AED 75 in Abu Dhabi/Dubai and AED 120 elsewhere", () => {
    expect(deliveryFee(200, "abu-dhabi")).toBe(75);
    expect(deliveryFee(200, "fujairah")).toBe(120);
  });

  it("GREEN10 takes 10% off before VAT", () => {
    expect(promoRate("green10")).toBe(0.1);
    const t = computeTotals(2000, { promo: "GREEN10", emirate: "dubai" });
    expect(t.discount).toBe(200);
    expect(t.vat).toBe(90);
    expect(t.total).toBe(1890);
  });
});
