import { toast } from "react-toastify";

export const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeButton: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
    icon: false,
};

export function displayToaster(message, type) {
    toast.dismiss();

    if (type === "success") {
        return toast.success(message, toastOptions);
    } else if (type === "error") {
        return toast.error(message, toastOptions);
    }

    return toast(message, toastOptions);
}
