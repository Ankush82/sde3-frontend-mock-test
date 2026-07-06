import type { Filters, SortDirection, SortField, SortOption } from "../types/product";

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  categories: string[];
}

export function FilterPanel({
  filters,
  onFiltersChange,
  sort,
  onSortChange,
  categories,
}: FilterPanelProps) {
  return (
    <div className="filter-panel">
      <label>
        Category:
        <select
          value={filters.category}
          onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
        >
          <option value="all">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        <input
          type="checkbox"
          checked={filters.inStockOnly}
          onChange={(e) => onFiltersChange({ ...filters, inStockOnly: e.target.checked })}
        />
        In stock only
      </label>

      <label>
        Sort by:
        <select
          value={sort.field}
          onChange={(e) => onSortChange({ ...sort, field: e.target.value as SortField })}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </label>

      <label>
        Direction:
        <select
          value={sort.direction}
          onChange={(e) => onSortChange({ ...sort, direction: e.target.value as SortDirection })}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
}
