import { render } from "@testing-library/react";
import SuccessToasterMessage from "./SuccessToasterMessage";
import { describe, expect, it } from "vitest";

describe("SuccessToasterMessage component", () => {
    it("renders with the default message", () => {
        const expectedText = "Changes are saved successfully";
        const { getByText } = render(<SuccessToasterMessage />);

        expect(getByText(expectedText)).toBeInTheDocument();
    });

    it("renders with a custom message", () => {
        const customMessage = "Custom Success Message";
        const { getByText } = render(<SuccessToasterMessage message={customMessage} />);

        expect(getByText(customMessage)).toBeInTheDocument();
    });

    it("renders the CheckIcon", () => {
        const { getByTestId } = render(<SuccessToasterMessage />);

        expect(getByTestId("svg-icon-check")).toBeInTheDocument();
    });
});
