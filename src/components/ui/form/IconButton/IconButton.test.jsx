import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeafIcon } from "@components/ui/icons";
import IconButton from "./IconButton";

describe("IconButton Component", () => {
    it("renders correctly provided with an icon child", () => {
        render(<IconButton>{<LeafIcon />}</IconButton>);
        const leafSvgElement = screen.getByTestId("svg-icon-leaf");

        expect(leafSvgElement).toBeInTheDocument();
    });

    it("applies the provided custom className", () => {
        const customClassName = "custom class";
        render(<IconButton className={customClassName}>{<LeafIcon />}</IconButton>);
        const buttonElement = screen.getByRole("button");

        expect(buttonElement).toHaveClass(customClassName);
    });

    it("has a default type of 'button'", () => {
        render(
            <IconButton>
                <LeafIcon />
            </IconButton>,
        );
        const buttonElement = screen.getByRole("button");

        expect(buttonElement).toHaveAttribute("type", "button");
    });

    it("accepts a custom type when provided", () => {
        const buttonType = "submit";
        render(
            <IconButton type={buttonType}>
                <LeafIcon />
            </IconButton>,
        );
        const buttonElement = screen.getByRole("button");

        expect(buttonElement).toHaveAttribute("type", buttonType);
    });

    it("handles a click event", async () => {
        const user = userEvent.setup();
        const onClickMock = vi.fn();

        render(
            <IconButton onClick={onClickMock}>
                <LeafIcon />
            </IconButton>,
        );
        const buttonElement = screen.getByRole("button");

        await user.click(buttonElement);
        expect(onClickMock).toHaveBeenCalledOnce();
    });
});
