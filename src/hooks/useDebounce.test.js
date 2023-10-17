import { renderHook, act } from "@testing-library/react";
import useDebounce from "./useDebounce";
import { describe, expect, it, vi } from "vitest";

describe("useDebounce hook", () => {
    vi.useFakeTimers();

    it("returns a debounced callback", () => {
        const callback = vi.fn();
        const delayInMilliseconds = 500;
        const { result } = renderHook(() => useDebounce(callback));
        const debouncedCallback = result.current;

        act(() => debouncedCallback());
        expect(callback).not.toBeCalled();

        vi.advanceTimersByTime(delayInMilliseconds);
        expect(callback).toBeCalled();
    });

    it("debounces with a custom delay", () => {
        const callback = vi.fn();
        const delayInMilliseconds = 1000;
        const { result } = renderHook(() => useDebounce(callback, delayInMilliseconds));
        const debouncedCallback = result.current;

        act(() => debouncedCallback());
        act(() => debouncedCallback());

        vi.advanceTimersByTime(delayInMilliseconds / 2);
        expect(callback).not.toBeCalled();

        vi.advanceTimersByTime(delayInMilliseconds / 2);
        expect(callback).toBeCalled();
    });
});
