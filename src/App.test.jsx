import store from "@app/store";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it } from "vitest";
import App from "./App";

describe("App Component", () => {
    it("renders correctly", () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>,
        );
    });
});
