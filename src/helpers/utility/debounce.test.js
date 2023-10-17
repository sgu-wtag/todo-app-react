import { describe, expect, it, vi } from "vitest";
import { debounce } from "./debounce";

describe("debounce function", () => {
    vi.useFakeTimers();

    it("debounces a function call with default delay", () => {
        const originalFunction = vi.fn();
        const debouncedFunction = debounce(originalFunction);

        debouncedFunction();

        const fastForwardTimer = 500;
        vi.advanceTimersByTime(fastForwardTimer);

        expect(originalFunction).toHaveBeenCalledOnce();
    });

    it("debounces a function call with a custom delay", () => {
        const originalFunction = vi.fn();
        const customDelay = 1000;
        const debouncedFunction = debounce(originalFunction, customDelay);

        debouncedFunction();
        vi.advanceTimersByTime(customDelay);

        expect(originalFunction).toHaveBeenCalledOnce();
    });

    it("preserves the context of the original function", () => {
        const context = { value: 1 };
        const originalFunction = function () {
            expect(this).toBe(context);
        };
        const debouncedFunction = debounce(originalFunction);
        debouncedFunction.call(context);
    });
});
