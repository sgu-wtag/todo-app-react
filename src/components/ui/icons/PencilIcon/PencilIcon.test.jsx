import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PencilIcon from "./PencilIcon";

describe("PencilIcon component", () => {
    const testId = "svg-icon-pencil";

    it("renders correctly with default props", () => {
        render(<PencilIcon />);
        const iconElement = screen.getByTestId(testId);

        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveClass("icon-base");
    });

    it("applies the provided custom className", () => {
        const customClassName = "custom class";
        render(<PencilIcon className={customClassName} />);
        const iconElement = screen.getByTestId(testId);

        expect(iconElement).toHaveClass(customClassName);
    });
});
