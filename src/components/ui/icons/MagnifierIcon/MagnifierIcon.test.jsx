import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import MagnifierIcon from "./MagnifierIcon";

describe("MagnifierIcon component", () => {
    const testId = "svg-icon-magnifier";

    it("renders correctly with default props", () => {
        render(<MagnifierIcon />);
        const iconElement = screen.getByTestId(testId);

        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveClass("icon-base");
    });

    it("applies the provided custom className", () => {
        const customClassName = "custom class";
        render(<MagnifierIcon className={customClassName} />);
        const iconElement = screen.getByTestId(testId);

        expect(iconElement).toHaveClass(customClassName);
    });
});
