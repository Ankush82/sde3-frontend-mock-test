import { useEffect } from "react";
import type { Product } from "../types/product";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

/**
 * Requirements:
 * - Clicking the backdrop (the dimmed area outside the modal card) must close it.
 * - Pressing the Escape key must close it, whenever the modal is open.
 * - Clicking inside the modal card itself must NOT close it.
 */
export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>{product.name}</h2>
        <p>Category: {product.category}</p>
        <p>Price: ₹{product.price.toLocaleString("en-IN")}</p>
        <p>Rating: ★ {product.rating}</p>
        <p>{product.inStock ? "In stock" : "Out of stock"}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
