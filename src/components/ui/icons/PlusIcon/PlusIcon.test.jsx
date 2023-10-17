import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PlusIcon from "./PlusIcon";

describe("PlusIcon component", () => {
    const testId = "svg-icon-plus";

    it("renders correctly with default props", () => {
        render(<PlusIcon />);
        const iconElement = screen.getByTestId(testId);

        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveClass("icon-base");
    });

    it("applies the provided custom className", () => {
        const customClassName = "custom class";
        render(<PlusIcon className={customClassName} />);
        const iconElement = screen.getByTestId(testId);

        expect(iconElement).toHaveClass(customClassName);
    });
});
