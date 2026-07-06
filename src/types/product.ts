export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  inStock: boolean;
}

export type SortField = "name" | "price" | "rating";
export type SortDirection = "asc" | "desc";

export interface Filters {
  search: string;
  category: string | "all";
  inStockOnly: boolean;
}

export interface SortOption {
  field: SortField;
  direction: SortDirection;
}
