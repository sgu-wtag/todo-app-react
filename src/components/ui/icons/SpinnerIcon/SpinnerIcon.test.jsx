import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SpinnerIcon from "./SpinnerIcon";

describe("SpinnerIcon component", () => {
    const testId = "svg-icon-spinner";

    it("renders correctly with default props", () => {
        render(<SpinnerIcon />);
        const iconElement = screen.getByTestId(testId);

        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveClass("icon-base");
    });

    it("applies the provided custom className", () => {
        const customClassName = "custom class";
        render(<SpinnerIcon className={customClassName} />);
        const iconElement = screen.getByTestId(testId);

        expect(iconElement).toHaveClass(customClassName);
    });
});
