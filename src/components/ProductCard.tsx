import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <button className="product-card" onClick={() => onSelect(product)}>
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p>₹{product.price.toLocaleString("en-IN")}</p>
      <p>★ {product.rating}</p>
      {!product.inStock && <p className="out-of-stock">Out of stock</p>}
    </button>
  );
}
