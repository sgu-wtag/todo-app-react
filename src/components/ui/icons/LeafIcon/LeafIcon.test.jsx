import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import LeafIcon from "./LeafIcon";

describe("LeafIcon component", () => {
    const testId = "svg-icon-leaf";

    it("renders correctly with default props", () => {
        render(<LeafIcon />);
        const iconElement = screen.getByTestId(testId);

        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveClass("icon-base");
    });

    it("applies the provided custom className", () => {
        const customClassName = "custom class";
        render(<LeafIcon className={customClassName} />);
        const iconElement = screen.getByTestId(testId);

        expect(iconElement).toHaveClass(customClassName);
    });
});
