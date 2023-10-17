import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button Component", () => {
    it("renders correctly provided with a text child", () => {
        const buttonText = "Click me";
        render(<Button>{buttonText}</Button>);
        const buttonElement = screen.getByText(buttonText);

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement.textContent).toBe(buttonText);
    });

    it("applies the provided custom className", () => {
        const customClassName = "custom class";
        render(<Button className={customClassName}>Click me</Button>);
        const buttonElement = screen.getByRole("button");

        expect(buttonElement).toHaveClass(customClassName);
    });

    it("has a default type of 'button'", () => {
        render(<Button>Default button</Button>);
        const buttonElement = screen.getByRole("button");

        expect(buttonElement).toHaveAttribute("type", "button");
    });

    it("accepts a custom type when provided", () => {
        const buttonType = "submit";
        render(<Button type={buttonType}>Default button</Button>);
        const buttonElement = screen.getByRole("button");

        expect(buttonElement).toHaveAttribute("type", buttonType);
    });

    it("handles a click event", async () => {
        const user = userEvent.setup();
        const onClickMock = vi.fn();

        render(<Button onClick={onClickMock}>Click me</Button>);
        const buttonElement = screen.getByRole("button");

        await user.click(buttonElement);
        expect(onClickMock).toHaveBeenCalledOnce();
    });
});
