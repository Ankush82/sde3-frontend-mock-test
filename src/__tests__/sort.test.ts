import { describe, expect, it } from "vitest";
import { sortProducts } from "../utils/sort";
import type { Product } from "../types/product";

const products: Product[] = [
  { id: "1", name: "Banana Phone", category: "Phones", price: 300, rating: 3.5, inStock: true },
  { id: "2", name: "Apple Watch", category: "Wearables", price: 500, rating: 4.8, inStock: true },
  { id: "3", name: "Cherry Buds", category: "Audio", price: 100, rating: 4.1, inStock: false },
];

describe("sortProducts", () => {
  it("sorts by name ascending", () => {
    const result = sortProducts(products, { field: "name", direction: "asc" });
    expect(result.map((p) => p.name)).toEqual(["Apple Watch", "Banana Phone", "Cherry Buds"]);
  });

  it("sorts by name descending", () => {
    const result = sortProducts(products, { field: "name", direction: "desc" });
    expect(result.map((p) => p.name)).toEqual(["Cherry Buds", "Banana Phone", "Apple Watch"]);
  });

  it("sorts by price ascending", () => {
    const result = sortProducts(products, { field: "price", direction: "asc" });
    expect(result.map((p) => p.price)).toEqual([100, 300, 500]);
  });

  it("sorts by price descending", () => {
    const result = sortProducts(products, { field: "price", direction: "desc" });
    expect(result.map((p) => p.price)).toEqual([500, 300, 100]);
  });

  it("sorts by rating descending", () => {
    const result = sortProducts(products, { field: "rating", direction: "desc" });
    expect(result.map((p) => p.rating)).toEqual([4.8, 4.1, 3.5]);
  });

  it("does not mutate the input array", () => {
    const copy = [...products];
    sortProducts(products, { field: "price", direction: "asc" });
    expect(products).toEqual(copy);
  });
});
