import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextArea from "./TextArea";

describe("Input Component", () => {
    it("renders correctly with default props", () => {
        render(<TextArea />);
        const textAreaElement = screen.getByRole("textbox");

        expect(textAreaElement).toBeInTheDocument();
        expect(textAreaElement).toHaveClass("input-textarea");
    });

    it("applies the provided custom className", () => {
        const customClassName = "custom class";
        render(<TextArea className={customClassName} />);
        const textAreaElement = screen.getByRole("textbox");

        expect(textAreaElement).toHaveClass(customClassName);
    });

    it("handles user input correctly", async () => {
        const user = userEvent.setup();
        const onChangeMock = vi.fn();
        render(<TextArea onChange={onChangeMock} />);
        const textAreaInput = screen.getByRole("textbox");

        const inputValue = "Test Input";
        await user.type(textAreaInput, inputValue);

        expect(textAreaInput).toHaveValue(inputValue);
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({
                    value: inputValue,
                }),
            }),
        );
    });
});
