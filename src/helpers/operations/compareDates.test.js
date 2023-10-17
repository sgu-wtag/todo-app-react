import { describe, expect, it } from "vitest";
import { compareDates } from "./compareDates";

describe("compareDates function", () => {
    const validDateString1 = "2023-01-01";
    const validDateString2 = "2023-01-05";

    it("correctly compares two valid dates", () => {
        const expectedDayDifference = 5;
        const daysDifference = compareDates(validDateString1, validDateString2);

        expect(daysDifference).toBe(expectedDayDifference);
    });

    it("returns 1 if both the dates are same", () => {
        const expectedDayDifference = 1;
        const daysDifference = compareDates(validDateString1, validDateString1);

        expect(daysDifference).toBe(expectedDayDifference);
    });

    it("correctly calculates days for larger date ranges", () => {
        const dateString1 = "2023-01-01";
        const dateString2 = "2023-12-31";
        const expectedDayDifference = 365;
        const daysDifference = compareDates(dateString1, dateString2);

        expect(daysDifference).toBe(expectedDayDifference);
    });

    it("correctly calculates days for leap year", () => {
        const dateString1 = "2024-02-01";
        const dateString2 = "2024-03-01";
        const expectedDayDifference = 30;
        const daysDifference = compareDates(dateString1, dateString2);

        expect(daysDifference).toBe(expectedDayDifference);
    });

    it("returns null if any of the dates are invalid", () => {
        const invalidDate = "invalid-date";
        const daysDifference1 = compareDates(validDateString1, invalidDate);
        const daysDifference2 = compareDates(invalidDate, validDateString1);

        expect(daysDifference1).toBeNull();
        expect(daysDifference2).toBeNull();
    });

    it("returns null if any of the dates are missing", () => {
        const daysDifference1 = compareDates(validDateString1);
        const daysDifference2 = compareDates();

        expect(daysDifference1).toBeNull();
        expect(daysDifference2).toBeNull();
    });

    it("should handle date strings in different formats", () => {
        const differentDateString = "2023/01/11";
        const expectedDayDifference = 10;
        const daysDifference = compareDates(validDateString1, differentDateString);

        expect(daysDifference).toBe(expectedDayDifference);
    });
});
