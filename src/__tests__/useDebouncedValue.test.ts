import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

describe("useDebouncedValue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("keeps the initial value immediately", () => {
    const { result } = renderHook(() => useDebouncedValue("a", 300));
    expect(result.current).toBe("a");
  });

  it("only commits the final value after rapid updates, not every intermediate one", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 300), {
      initialProps: { value: "a" },
    });

    rerender({ value: "ab" });
    act(() => vi.advanceTimersByTime(100));
    rerender({ value: "abc" });
    act(() => vi.advanceTimersByTime(100));
    rerender({ value: "abcd" });

    // Only 200ms have passed since the first keystroke; nothing should have
    // committed yet because each new keystroke should reset the timer.
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(300));

    // Now it should have committed the LAST value only, having skipped
    // "ab" and "abc" entirely.
    expect(result.current).toBe("abcd");
  });

  it("updates after the delay elapses with no further changes", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 300), {
      initialProps: { value: "a" },
    });

    rerender({ value: "z" });
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("z");
  });
});
