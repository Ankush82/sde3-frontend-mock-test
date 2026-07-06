import type { Product, SortOption } from "../types/product";

/**
 * Sorts products according to `sort.field` and `sort.direction`.
 * Returns a new array; must not mutate the input.
 */
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products].sort((a, b) => {
    if (sort.field === "name") {
      return a.name.localeCompare(b.name);
    }

    if (sort.field === "price") {
      return a.price - b.price;
    }

    throw new Error(`Sorting by "${sort.field}" is not implemented yet`);
  });

  return sorted;
}
