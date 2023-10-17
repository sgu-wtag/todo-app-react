import { renderHook, act } from "@testing-library/react";
import usePaginate from "./usePaginate";
import { describe, expect, it } from "vitest";

describe("usePaginate hook", () => {
    const collection = Array.from({ length: 10 }, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    it("paginates the collection based on default settings", () => {
        const { result } = renderHook(() => usePaginate({ collection }));

        expect(result.current.currentPage).toBe(1);
        expect(result.current.data).toEqual([1, 2, 3, 4, 5]);
        expect(result.current.hasMore).toBe(true);
        expect(result.current.isLastPage).toBe(false);
    });

    it("goes to the next page while retaining previous page data", () => {
        const { result } = renderHook(() => usePaginate({ collection }));

        act(() => result.current.next());

        expect(result.current.currentPage).toBe(2);
        expect(result.current.data).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(result.current.hasMore).toBe(false);
        expect(result.current.isLastPage).toBe(true);
    });

    it("goes to the previous page", () => {
        const { result } = renderHook(() => usePaginate({ collection, startPage: 2 }));

        act(() => result.current.previous());

        expect(result.current.currentPage).toBe(1);
        expect(result.current.data).toEqual([1, 2, 3, 4, 5]);
        expect(result.current.hasMore).toBe(true);
        expect(result.current.isLastPage).toBe(false);
    });

    it("doesn't go to the previous page if current page is 1", () => {
        const { result } = renderHook(() => usePaginate({ collection, startPage: 1 }));

        act(() => result.current.previous());

        expect(result.current.currentPage).toBe(1);
        expect(result.current.hasMore).toBe(true);
        expect(result.current.isLastPage).toBe(false);
    });

    it("resets to the initial page", () => {
        const { result } = renderHook(() => usePaginate({ collection, startPage: 2 }));

        act(() => result.current.reset());

        expect(result.current.currentPage).toBe(2);
        expect(result.current.data).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(result.current.hasMore).toBe(false);
        expect(result.current.isLastPage).toBe(true);
    });

    it("correctly handles custom perPage and startIndex values", () => {
        const { result } = renderHook(() => usePaginate({ collection, perPage: 4, startIndex: 6 }));

        expect(result.current.data).toEqual([7, 8, 9, 10]);
        expect(result.current.hasMore).toBe(true);
        expect(result.current.isLastPage).toBe(false);
    });

    it("correctly handles isCollectionCreating", () => {
        const { result } = renderHook(() => usePaginate({ collection, isCollectionCreating: true }));

        expect(result.current.currentPage).toBe(1);
        expect(result.current.data).toEqual([1, 2, 3, 4]);
        expect(result.current.hasMore).toBe(true);
        expect(result.current.isLastPage).toBe(false);
    });
});
