import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProductDetailModal } from "../components/ProductDetailModal";
import type { Product } from "../types/product";

const product: Product = {
  id: "1",
  name: "iPhone 15",
  category: "Phones",
  price: 79900,
  rating: 4.6,
  inStock: true,
};

describe("ProductDetailModal", () => {
  it("renders nothing when product is null", () => {
    const { container } = render(<ProductDetailModal product={null} onClose={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("closes when the backdrop is clicked", async () => {
    const onClose = vi.fn();
    render(<ProductDetailModal product={product} onClose={onClose} />);
    await userEvent.click(screen.getByText("iPhone 15").closest(".modal-backdrop")!);
    expect(onClose).toHaveBeenCalled();
  });

  it("does NOT close when clicking inside the modal card", async () => {
    const onClose = vi.fn();
    render(<ProductDetailModal product={product} onClose={onClose} />);
    await userEvent.click(screen.getByText("iPhone 15"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes when Escape is pressed", () => {
    const onClose = vi.fn();
    render(<ProductDetailModal product={product} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });
});
