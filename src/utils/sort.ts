import type { Product, SortOption } from "../types/product";

/**
 * Sorts products according to `sort.field` and `sort.direction`.
 * Returns a new array; must not mutate the input.
 */
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const multiplier = sort.direction === "asc" ? 1 : -1;

  const sorted = [...products].sort((a, b) => {
    if (sort.field === "name") {
      return a.name.localeCompare(b.name) * multiplier;
    }

    if (sort.field === "price") {
      return (a.price - b.price) * multiplier;
    }

    return (a.rating - b.rating) * multiplier;
  });

  return sorted;
}
