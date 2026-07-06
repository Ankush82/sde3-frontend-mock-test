import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../api/productsApi";
import { filterProducts } from "../utils/filter";
import { getTotalPages, paginate } from "../utils/paginate";
import { sortProducts } from "../utils/sort";
import type { Filters, Product, SortOption } from "../types/product";

const PAGE_SIZE = 4;

interface UseProductsResult {
  products: Product[];
  allCategories: string[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

/**
 * Loads the product catalog and applies filters/sort/pagination.
 *
 * Requirements:
 * - `loading` must be true while the initial fetch is in flight, then false.
 * - if the fetch fails, `error` must be set to a user-facing message and
 *   `loading` must become false (currently unhandled -- the UI is stuck
 *   on the loading state forever if the request fails).
 * - changing `filters` or `sort` must reset `page` back to 1.
 */
export function useProducts(
  filters: Filters,
  sort: SortOption,
  shouldFail = false
): UseProductsResult {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProducts(shouldFail)
      .then((products) => {
        setAllProducts(products);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [shouldFail]);

  const filtered = useMemo(() => filterProducts(allProducts, filters), [allProducts, filters]);
  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);
  const totalPages = getTotalPages(sorted.length, PAGE_SIZE);
  const paged = paginate(sorted, page, PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [filters, sort]);

  const allCategories = useMemo(
    () => Array.from(new Set(allProducts.map((p) => p.category))).sort(),
    [allProducts]
  );

  return {
    products: paged,
    allCategories,
    loading,
    error,
    page,
    totalPages,
    setPage,
  };
}
