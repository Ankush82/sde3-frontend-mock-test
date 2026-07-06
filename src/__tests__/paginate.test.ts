import { describe, expect, it } from "vitest";
import { getTotalPages, paginate } from "../utils/paginate";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe("paginate", () => {
  it("returns the first page", () => {
    expect(paginate(items, 1, 4)).toEqual([1, 2, 3, 4]);
  });

  it("returns the second page", () => {
    expect(paginate(items, 2, 4)).toEqual([5, 6, 7, 8]);
  });

  it("returns a partial last page", () => {
    expect(paginate(items, 3, 4)).toEqual([9, 10]);
  });

  it("returns an empty array past the last page", () => {
    expect(paginate(items, 4, 4)).toEqual([]);
  });
});

describe("getTotalPages", () => {
  it("computes total pages when evenly divisible", () => {
    expect(getTotalPages(10, 5)).toBe(2);
  });

  it("rounds up for a partial last page", () => {
    expect(getTotalPages(10, 4)).toBe(3);
  });

  it("returns 1 when there are zero items", () => {
    expect(getTotalPages(0, 4)).toBe(1);
  });
});
