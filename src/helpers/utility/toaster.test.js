import { afterEach, describe, expect, it, vi } from "vitest";
import { displayToaster, toastOptions } from "./toaster";
import { toast } from "react-toastify";

vi.mock("react-toastify");

describe("displayToaster", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("calls toast.dismiss", () => {
        displayToaster("Some message", "success");
        expect(toast.dismiss).toHaveBeenCalled();
    });

    it("calls toast.success with the provided message and options for success type", () => {
        displayToaster("Success message", "success");
        expect(toast.success).toHaveBeenCalledWith("Success message", toastOptions);
    });

    it("calls toast.error with the provided message and options for error type", () => {
        displayToaster("Error message", "error");
        expect(toast.error).toHaveBeenCalledWith("Error message", toastOptions);
    });
});
