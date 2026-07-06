/**
 * Returns the slice of `items` for the given 1-indexed `page`, given
 * `pageSize` items per page.
 */
export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return items.slice(start, end);
}

/**
 * Returns the total number of pages needed to display `totalItems` items,
 * `pageSize` items per page. Must return at least 1, even when totalItems is 0.
 */
export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}
