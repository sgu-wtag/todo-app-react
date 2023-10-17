import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TaskListEmpty from "./TaskListEmpty";
import { EMPTY_TASK_MESSAGE_COMPLETE, EMPTY_TASK_MESSAGE_DEFAULT, TASK_STATE_COMPLETE } from "@helpers/constants";

describe("TaskListEmpty component", () => {
    it("doesn't render when isShowing prop is false", () => {
        const { queryByTestId } = render(<TaskListEmpty isShowing={false} taskState={TASK_STATE_COMPLETE} />);

        expect(queryByTestId("task-list-empty")).toBeNull();
    });

    it("renders when isShowing prop is true", () => {
        const { getByTestId } = render(<TaskListEmpty isShowing={true} taskState={TASK_STATE_COMPLETE} />);

        expect(getByTestId("task-list-empty")).toBeInTheDocument();
    });

    it("displays the correct message for TASK_STATE_COMPLETE", () => {
        const { getByText } = render(<TaskListEmpty isShowing={true} taskState={TASK_STATE_COMPLETE} />);

        expect(getByText(EMPTY_TASK_MESSAGE_COMPLETE)).toBeInTheDocument();
    });

    it("displays the correct message for default taskState", () => {
        const { getByText } = render(<TaskListEmpty isShowing={true} taskState={"default"} />);

        expect(getByText(EMPTY_TASK_MESSAGE_DEFAULT)).toBeInTheDocument();
    });
});
