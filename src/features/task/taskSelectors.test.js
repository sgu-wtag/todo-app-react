import { TASK_STATE_COMPLETE, TASK_STATE_INCOMPLETE } from "@helpers/constants";
import { selectFilteredTasks } from "./taskSelectors";
import { describe, expect, it } from "vitest";

describe("selectFilteredTasks selector", () => {
    const mockTasks = [
        { id: 1, title: "Task 1", isCompleted: true },
        { id: 2, title: "Task 2", isCompleted: false },
        { id: 3, title: "Task 3", isCompleted: true },
    ];

    it("returns all tasks when no filter or search text is applied", () => {
        const filterState = null;
        const textToSearch = "";
        const result = selectFilteredTasks.resultFunc(mockTasks, filterState, textToSearch);

        expect(result).toEqual(mockTasks);
    });

    it("filters tasks by completion state (complete)", () => {
        const filterState = TASK_STATE_COMPLETE;
        const textToSearch = "";
        const result = selectFilteredTasks.resultFunc(mockTasks, filterState, textToSearch);

        expect(result).toEqual([mockTasks[0], mockTasks[2]]);
    });

    it("filters tasks by completion state (incomplete)", () => {
        const filterState = TASK_STATE_INCOMPLETE;
        const textToSearch = "";
        const result = selectFilteredTasks.resultFunc(mockTasks, filterState, textToSearch);

        expect(result).toEqual([mockTasks[1]]);
    });

    it("filters tasks by search text (case insensitive)", () => {
        const filterState = null;
        const textToSearch = "task 2";
        const result = selectFilteredTasks.resultFunc(mockTasks, filterState, textToSearch);

        expect(result).toEqual([mockTasks[1]]);
    });

    it("filters tasks by search text and completion state", () => {
        const filterState = TASK_STATE_COMPLETE;
        const textToSearch = "task";
        const result = selectFilteredTasks.resultFunc(mockTasks, filterState, textToSearch);

        expect(result).toEqual([mockTasks[0], mockTasks[2]]);
    });
});
