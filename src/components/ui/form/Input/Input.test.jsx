import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input Component", () => {
    it("renders correctly with default props", () => {
        render(<Input />);
        const inputElement = screen.getByRole("textbox");

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveClass("input");
        expect(inputElement).toHaveAttribute("type", "text");
    });

    it("applies the provided custom className", () => {
        const customClassName = "custom class";
        render(<Input className={customClassName} />);
        const inputElement = screen.getByRole("textbox");

        expect(inputElement).toHaveClass(customClassName);
    });

    it("accepts a custom type when provided", () => {
        const inputType = "email";
        render(<Input type={inputType} />);
        const inputElement = screen.getByRole("textbox");

        expect(inputElement).toHaveAttribute("type", inputType);
    });

    it("handles user input correctly", async () => {
        const user = userEvent.setup();
        const onChangeMock = vi.fn();
        render(<Input onChange={onChangeMock} />);
        const inputElement = screen.getByRole("textbox");

        const inputValue = "Test Input";
        await user.type(inputElement, inputValue);

        expect(inputElement).toHaveValue(inputValue);
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({
                    value: inputValue,
                }),
            }),
        );
    });
});
