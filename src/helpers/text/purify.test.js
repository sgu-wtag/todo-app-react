import { describe, expect, it } from "vitest";
import purify from "./purify";

describe("purify function", () => {
    it("purifies and trims a valid HTML string with default configuration", () => {
        const dirtyText = '<p>Some <em>text</em> with <script>alert("dangerous code");</script>HTML.</p>';
        const purifiedText = purify(dirtyText);
        const expectedText = "Some text with HTML.";

        expect(purifiedText).toBe(expectedText);
    });

    it("handles non-string input and throw an error", () => {
        const nonStringInput = 123;

        expect(() => purify(nonStringInput)).toThrowError("Input must be a string");
    });

    it("handles empty input and return an empty string", () => {
        const emptyInput = "";
        const purifiedText = purify(emptyInput);

        expect(purifiedText).toBe("");
    });
});
