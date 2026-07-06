import type { Product } from "../types/product";

const CATALOG: Product[] = [
  { id: "p1", name: "iPhone 15", category: "Phones", price: 79900, rating: 4.6, inStock: true },
  { id: "p2", name: "Galaxy S24", category: "Phones", price: 74999, rating: 4.4, inStock: true },
  { id: "p3", name: "Pixel 9", category: "Phones", price: 59999, rating: 4.3, inStock: false },
  { id: "p4", name: "ThinkPad X1", category: "Laptops", price: 129999, rating: 4.7, inStock: true },
  { id: "p5", name: "MacBook Air", category: "Laptops", price: 114900, rating: 4.8, inStock: true },
  { id: "p6", name: "Dell XPS 13", category: "Laptops", price: 109999, rating: 4.2, inStock: false },
  { id: "p7", name: "Sony WH-1000XM5", category: "Audio", price: 29990, rating: 4.7, inStock: true },
  { id: "p8", name: "AirPods Pro", category: "Audio", price: 24900, rating: 4.5, inStock: true },
  { id: "p9", name: "Bose QC45", category: "Audio", price: 27900, rating: 4.3, inStock: true },
  { id: "p10", name: "iPad Pro", category: "Tablets", price: 99900, rating: 4.6, inStock: true },
  { id: "p11", name: "Galaxy Tab S9", category: "Tablets", price: 84999, rating: 4.2, inStock: false },
  { id: "p12", name: "Kindle Paperwhite", category: "Tablets", price: 13999, rating: 4.5, inStock: true },
];

/**
 * Simulates a network call. Pass `shouldFail: true` to simulate a server error
 * (used by tests to exercise the error path).
 */
export function fetchProducts(shouldFail = false): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Failed to load products"));
        return;
      }
      resolve(CATALOG);
    }, 50);
  });
}

export function getCategories(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.category))).sort();
}
