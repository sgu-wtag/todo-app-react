import { describe, expect, it } from "vitest";
import taskSliceReducer, { addTask, deleteTask, markAsDone, updateTask } from "./taskSlice";

describe("taskSlice", () => {
    it("returns the initial state", () => {
        const initialState = { tasks: [] };
        const state = taskSliceReducer(undefined, { type: undefined });

        expect(state).toEqual(initialState);
    });

    it("adds a task", () => {
        const initialState = { tasks: [] };
        const newTask = {
            id: Date.now().toString(),
            title: "test-title",
            createdAt: new Date().toISOString,
            isCompleted: false,
        };
        const nextState = taskSliceReducer(initialState, addTask(newTask));

        expect(nextState.tasks).toHaveLength(1);
        expect(nextState.tasks[0]).toEqual(newTask);
    });

    it("deletes a task", () => {
        const ID = Date.now().toString();
        const initialState = {
            tasks: [
                {
                    id: ID,
                    title: "test-title",
                    createdAt: new Date().toISOString,
                    isCompleted: false,
                },
            ],
        };
        const nextState = taskSliceReducer(initialState, deleteTask(ID));

        expect(nextState.tasks).toHaveLength(0);
    });

    it("marks a task as done", () => {
        const ID = Date.now().toString();
        const initialState = {
            tasks: [
                {
                    id: ID,
                    title: "test-title",
                    createdAt: new Date().toISOString,
                    isCompleted: false,
                },
            ],
        };
        const nextState = taskSliceReducer(initialState, markAsDone(ID));

        expect(nextState.tasks[0].isCompleted).toBeTruthy();
        expect(nextState.tasks[0].completedAt).toBeDefined();
    });

    it("updates a task", () => {
        const ID = Date.now().toString();
        const initialState = {
            tasks: [
                {
                    id: ID,
                    title: "test-title",
                    createdAt: new Date().toISOString,
                    isCompleted: false,
                },
            ],
        };
        const editTitle = "updated-task";
        const nextState = taskSliceReducer(initialState, updateTask({ id: ID, editTitle }));

        expect(nextState.tasks[0].title).toBe(editTitle);
    });
});
