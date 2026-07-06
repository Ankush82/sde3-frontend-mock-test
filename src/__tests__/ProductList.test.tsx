import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProductList } from "../components/ProductList";
import type { Product } from "../types/product";

const products: Product[] = [
  { id: "1", name: "iPhone 15", category: "Phones", price: 79900, rating: 4.6, inStock: true },
];

describe("ProductList", () => {
  it("shows a loading indicator while loading", () => {
    render(<ProductList products={[]} loading={true} error={null} onSelect={vi.fn()} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows an error message when error is set", () => {
    render(
      <ProductList products={[]} loading={false} error="Failed to load products" onSelect={vi.fn()} />
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Failed to load products");
  });

  it("shows an empty state when there are no products and no error", () => {
    render(<ProductList products={[]} loading={false} error={null} onSelect={vi.fn()} />);
    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });

  it("renders a card per product", () => {
    render(<ProductList products={products} loading={false} error={null} onSelect={vi.fn()} />);
    expect(screen.getByText("iPhone 15")).toBeInTheDocument();
  });
});
