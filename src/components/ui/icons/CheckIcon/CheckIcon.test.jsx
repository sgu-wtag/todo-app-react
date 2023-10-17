import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CheckIcon from "./CheckIcon";

describe("CheckIcon component", () => {
    const testId = "svg-icon-check";

    it("renders correctly with default props", () => {
        render(<CheckIcon />);
        const iconElement = screen.getByTestId(testId);

        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveClass("icon-base");
    });

    it("applies the provided custom className", () => {
        const customClassName = "custom class";
        render(<CheckIcon className={customClassName} />);
        const iconElement = screen.getByTestId(testId);

        expect(iconElement).toHaveClass(customClassName);
    });
});
