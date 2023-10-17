import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TrashIcon from "./TrashIcon";

describe("TrashIcon component", () => {
    const testId = "svg-icon-trash";

    it("renders correctly with default props", () => {
        render(<TrashIcon />);
        const iconElement = screen.getByTestId(testId);

        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveClass("icon-base");
    });

    it("applies the provided custom className", () => {
        const customClassName = "custom class";
        render(<TrashIcon className={customClassName} />);
        const iconElement = screen.getByTestId(testId);

        expect(iconElement).toHaveClass(customClassName);
    });
});
