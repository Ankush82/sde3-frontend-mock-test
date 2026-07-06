import { describe, expect, it } from "vitest";
import { filterProducts } from "../utils/filter";
import type { Product } from "../types/product";

const products: Product[] = [
  { id: "1", name: "iPhone 15", category: "Phones", price: 79900, rating: 4.6, inStock: true },
  { id: "2", name: "Galaxy S24", category: "Phones", price: 74999, rating: 4.4, inStock: false },
  { id: "3", name: "iPad Pro", category: "Tablets", price: 99900, rating: 4.6, inStock: true },
];

describe("filterProducts", () => {
  it("matches search case-insensitively", () => {
    const result = filterProducts(products, { search: "iphone", category: "all", inStockOnly: false });
    expect(result.map((p) => p.name)).toEqual(["iPhone 15"]);
  });

  it("filters by category", () => {
    const result = filterProducts(products, { search: "", category: "Phones", inStockOnly: false });
    expect(result.map((p) => p.name)).toEqual(["iPhone 15", "Galaxy S24"]);
  });

  it("returns everything when category is 'all' and search is empty", () => {
    const result = filterProducts(products, { search: "", category: "all", inStockOnly: false });
    expect(result).toHaveLength(3);
  });

  it("filters to in-stock only when inStockOnly is true", () => {
    const result = filterProducts(products, { search: "", category: "all", inStockOnly: true });
    expect(result.map((p) => p.name)).toEqual(["iPhone 15", "iPad Pro"]);
  });

  it("combines search, category, and inStockOnly", () => {
    const result = filterProducts(products, { search: "galaxy", category: "Phones", inStockOnly: true });
    expect(result).toHaveLength(0);
  });
});
