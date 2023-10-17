import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import store from "@app/store";
import TaskCard from "./TaskCard";
import { addTask, deleteTask, markAsDone } from "@features/task/taskSlice";

describe("TaskCard component", () => {
    const task = {
        id: "1",
        title: "Sample Task",
        createdAt: "2023-10-10T10:00:00.000Z",
        isCompleted: false,
        completedAt: null,
    };

    it("renders a task card correctly", () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <TaskCard task={task} isDisabled={false} />
            </Provider>,
        );

        expect(getByText("Sample Task")).toBeInTheDocument();
        expect(getByText("Created At: 10.10.23")).toBeInTheDocument();

        expect(getByTestId("btn-mark-as-done")).toBeInTheDocument();
        expect(getByTestId("btn-edit")).toBeInTheDocument();
        expect(getByTestId("btn-delete")).toBeInTheDocument();
    });

    it("allows editing a task", () => {
        const { getByText, getByRole, getByDisplayValue, getByTestId } = render(
            <Provider store={store}>
                <TaskCard task={task} isDisabled={false} />
            </Provider>,
        );

        const editButton = getByTestId("btn-edit");
        fireEvent.click(editButton);

        expect(getByRole("textbox")).toBeInTheDocument();
        expect(getByDisplayValue("Sample Task")).toBeInTheDocument();
        expect(getByText("Save")).toBeInTheDocument();
    });

    it("marks a task as done", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <TaskCard task={task} isDisabled={false} />
            </Provider>,
        );

        const markAsDoneButton = getByTestId("btn-mark-as-done");
        fireEvent.click(markAsDoneButton);
        store.dispatch(addTask(task));

        store.dispatch(markAsDone(task.id));
        expect(store.getState().todo.tasks[0].isCompleted).toBe(true);
    });

    it("deletes a task", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <TaskCard task={task} isDisabled={false} />
            </Provider>,
        );

        const markAsDoneButton = getByTestId("btn-delete");
        fireEvent.click(markAsDoneButton);
        store.dispatch(addTask(task));

        store.dispatch(deleteTask(task.id));
        expect(store.getState().todo.tasks.length).toBe(0);
    });
});
