import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import store from "@app/store";
import TaskBoard from "./TaskBoard";
import { TASK_STATE_ALL, TASK_STATE_COMPLETE, TASK_STATE_INCOMPLETE } from "@helpers/constants";

describe("TaskBoard component", () => {
    it("renders correctly with default state", () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <TaskBoard />
            </Provider>,
        );

        const heading = getByText("Add Tasks");
        expect(heading).toBeInTheDocument();

        const createButton = getByText("Create");
        expect(createButton).toBeInTheDocument();
        expect(createButton).not.toBeDisabled();
        expect(createButton).toContainElement(getByTestId("svg-icon-plus"));

        const allFilterButton = getByText(TASK_STATE_ALL);
        expect(allFilterButton).toBeInTheDocument();
        expect(allFilterButton).toHaveClass("btn--active");

        const incompleteFilterButton = getByText(TASK_STATE_INCOMPLETE);
        expect(incompleteFilterButton).toBeInTheDocument();
        expect(incompleteFilterButton).not.toHaveClass("btn--active");

        const completeFilterButton = getByText(TASK_STATE_COMPLETE);
        expect(completeFilterButton).toBeInTheDocument();
        expect(completeFilterButton).not.toHaveClass("btn--active");

        const taskList = getByTestId("task-list");
        expect(taskList).toBeInTheDocument();

        expect(screen.queryByTestId("loader")).toBeNull();
    });

    it("toggles task creation", () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <TaskBoard />
            </Provider>,
        );

        const createButton = getByText("Create");
        fireEvent.click(createButton);

        const createTaskCard = getByTestId("create-task-card");
        expect(createTaskCard).toBeInTheDocument();

        fireEvent.click(createButton);
        expect(createTaskCard).not.toBeInTheDocument();
    });
});
