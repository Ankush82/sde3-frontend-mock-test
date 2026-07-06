interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Requirements:
 * - Prev/Next buttons (already implemented) must be disabled at the first/last page.
 * - Additionally render a clickable button for each page number from 1..totalPages,
 *   with the current page visually marked (e.g. aria-current="page") -- not yet implemented.
 */
export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </div>
  );
}
