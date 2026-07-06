import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onSelect: (product: Product) => void;
}

/**
 * Requirements:
 * - while `loading` is true, render an element with role="status" (e.g. "Loading products...")
 * - if `error` is set, render an element with role="alert" showing the error message
 * - if not loading, no error, and `products` is empty, render a "No products found" message
 * - otherwise render a ProductCard for each product
 */
export function ProductList({ products, loading, error, onSelect }: ProductListProps) {
  if (loading) {
    return <p role="status">Loading products...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (products.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelect} />
      ))}
    </div>
  );
}
