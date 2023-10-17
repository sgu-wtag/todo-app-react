import { describe, expect, it } from "vitest";
import formatDate from "./formatDate";

describe("FormatDate Function", () => {
    it("formats a valid date with default configuration", () => {
        const inputDate = new Date("2023-01-01");
        const formattedDate = formatDate(inputDate);

        expect(formattedDate).toBe("01.01.23");
    });

    it("formats a valid date with a custom configuration", () => {
        const inputDate = new Date("2023-01-01");
        const config = {
            day: "numeric",
            month: "long",
            year: "numeric",
            separator: "/",
            locale: "en-US",
        };
        const formattedDate = formatDate(inputDate, config);

        expect(formattedDate).toBe("January 1, 2023");
    });

    it("handles invalid date input", () => {
        const invalidDate = "invalid-date";
        const formattedDate = formatDate(invalidDate);

        expect(formattedDate).toBe("Invalid date input");
    });

    it("handles null date input", () => {
        const nullDate = null;
        const formattedDate = formatDate(nullDate);

        expect(formattedDate).toBe("Invalid date input");
    });
});
