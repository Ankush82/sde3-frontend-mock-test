import type { Filters, Product } from "../types/product";

/**
 * Filters products by search text (matches product name), category, and
 * stock availability. `filters.search` should match case-insensitively.
 * `filters.category === "all"` means no category filtering.
 * `filters.inStockOnly === true` means only in-stock products should be returned.
 */
export function filterProducts(products: Product[], filters: Filters): Product[] {
  return products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = filters.category === "all" || p.category === filters.category;
    const matchesStock = !filters.inStockOnly || p.inStock;
    return matchesSearch && matchesCategory && matchesStock;
  });
}
