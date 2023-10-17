import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import store from "@app/store";
import Navbar from "./Navbar";
import { act } from "react-dom/test-utils";
import { searchTask } from "@features/filter/filterSlice";

describe("Navbar component", () => {
    it("renders the component with the search box hidden by default", () => {
        const onSearching = vi.fn();
        const { queryByRole, getByText, getByTestId } = render(
            <Provider store={store}>
                <Navbar onSearching={onSearching} />
            </Provider>,
        );
        const leafIconElement = getByTestId("svg-icon-leaf");
        const logoTextSpanElement = getByText("Todos");
        const searchInputElement = queryByRole("textbox");
        const searchButtonElement = getByTestId("toggle-search-button");
        const magnifierIconElement = getByTestId("svg-icon-magnifier");

        expect(leafIconElement).toBeInTheDocument();
        expect(logoTextSpanElement).toBeInTheDocument();
        expect(searchInputElement).toBeNull();
        expect(searchButtonElement).toContainElement(magnifierIconElement);
    });

    it("toggles the search box visibility when the button is clicked", () => {
        const onSearching = vi.fn();
        const { queryByRole, getByTestId } = render(
            <Provider store={store}>
                <Navbar onSearching={onSearching} />
            </Provider>,
        );
        const searchButtonElement = getByTestId("toggle-search-button");
        let searchInputElement = queryByRole("textbox");

        expect(searchInputElement).toBeNull();

        fireEvent.click(searchButtonElement);
        searchInputElement = queryByRole("textbox");
        expect(searchInputElement).toBeInTheDocument();

        fireEvent.click(searchButtonElement);
        searchInputElement = queryByRole("textbox");
        expect(searchInputElement).toBeNull();
    });

    it("updates the search input and dispatches searchTask action", async () => {
        vi.useFakeTimers();

        const onSearching = vi.fn();
        const { queryByRole, getByTestId } = render(
            <Provider store={store}>
                <Navbar onSearching={onSearching} />
            </Provider>,
        );

        const searchButtonElement = getByTestId("toggle-search-button");
        fireEvent.click(searchButtonElement);

        const searchInputElement = queryByRole("textbox");
        const searchValue = "New Search Value";
        fireEvent.change(searchInputElement, { target: { value: searchValue } });

        await act(async () => vi.runAllTimers());

        expect(searchInputElement.value).toBe(searchValue);

        store.dispatch(searchTask(searchValue));
        expect(store.getState().filter.search).toBe(searchValue);
    });
});
