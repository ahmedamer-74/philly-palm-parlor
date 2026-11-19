import { describe, expect, it } from "vitest";
import { products } from "./catalog";

describe("sales-only catalog", () => {
  it("gives every product size a fixed price so it can be bought directly", () => {
    const unpriced = products.flatMap((p) => p.variants.filter((v) => v.price == null).map((v) => `${p.slug}/${v.id}`));
    expect(unpriced).toEqual([]);
  });
});
