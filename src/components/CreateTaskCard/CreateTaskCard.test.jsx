import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import store from "@app/store";
import CreateTaskCard from "./CreateTaskCard";

describe("CreateTaskCard component", () => {
    it("renders the component correctly", () => {
        const onTaskCreation = vi.fn();
        const { getByRole, getByText } = render(
            <Provider store={store}>
                <CreateTaskCard onTaskCreation={onTaskCreation} />
            </Provider>,
        );
        const textareaElement = getByRole("textbox");
        const buttonElement = getByText("Add task");

        expect(textareaElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });

    it("allows entering and submitting a task", () => {
        const onTaskCreation = vi.fn();

        const { getByRole, getByText } = render(
            <Provider store={store}>
                <CreateTaskCard onTaskCreation={onTaskCreation} />
            </Provider>,
        );

        const textareaElement = getByRole("textbox");
        const buttonElement = getByText("Add task");

        fireEvent.change(textareaElement, { target: { value: "New Task" } });
        fireEvent.click(buttonElement);

        expect(onTaskCreation).toHaveBeenCalledOnce();
    });

    it("doesn't submit an empty task", () => {
        const onTaskCreation = vi.fn();

        const { getByRole, getByText } = render(
            <Provider store={store}>
                <CreateTaskCard onTaskCreation={onTaskCreation} />
            </Provider>,
        );

        const textareaElement = getByRole("textbox");
        const buttonElement = getByText("Add task");

        fireEvent.change(textareaElement, { target: { value: "" } });
        fireEvent.click(buttonElement);

        expect(onTaskCreation).not.toHaveBeenCalled();
    });

    it("submits a task when the Enter key is pressed", () => {
        const onTaskCreation = vi.fn();

        const { getByRole } = render(
            <Provider store={store}>
                <CreateTaskCard onTaskCreation={onTaskCreation} />
            </Provider>,
        );

        const textareaElement = getByRole("textbox");

        fireEvent.change(textareaElement, { target: { value: "New Task" } });
        fireEvent.keyDown(textareaElement, { key: "Enter", code: "Enter" });

        expect(onTaskCreation).toHaveBeenCalledOnce();
    });
});
