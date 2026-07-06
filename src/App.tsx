import { useState } from "react";
import { FilterPanel } from "./components/FilterPanel";
import { Pagination } from "./components/Pagination";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { ProductList } from "./components/ProductList";
import { SearchBar } from "./components/SearchBar";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import { useProducts } from "./hooks/useProducts";
import type { Filters, Product, SortOption } from "./types/product";
import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "all",
    inStockOnly: false,
  });
  const [sort, setSort] = useState<SortOption>({ field: "name", direction: "asc" });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const effectiveFilters: Filters = { ...filters, search: debouncedSearch };

  const { products, allCategories, loading, error, page, totalPages, setPage } = useProducts(
    effectiveFilters,
    sort
  );

  return (
    <div className="app">
      <h1>Product Inventory Dashboard</h1>

      <SearchBar value={searchInput} onChange={setSearchInput} />

      <FilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        sort={sort}
        onSortChange={setSort}
        categories={allCategories}
      />

      <ProductList
        products={products}
        loading={loading}
        error={error}
        onSelect={setSelectedProduct}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}

export default App;
