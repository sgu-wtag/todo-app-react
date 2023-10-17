import store from "./store";
import taskReducer from "@features/task/taskSlice";
import filterReducer from "@features/filter/filterSlice";
import { describe, expect, it } from "vitest";

describe("Redux Store Configuration", () => {
    it("has the taskReducer and filterReducer in the store", () => {
        const storeReducers = store.getState();

        expect(storeReducers).toHaveProperty("todo", taskReducer(undefined, {}));
        expect(storeReducers).toHaveProperty("filter", filterReducer(undefined, {}));
    });
});
