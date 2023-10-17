import { CheckIcon } from "@components/ui/icons";
import "./SuccessToasterMessage.scss";
import PropTypes from "prop-types";

function SuccessToasterMessage({ message }) {
    return (
        <div data-testid="success-toaster-message" className="toast-success-message">
            <div className="toast-success-message__wrapper">
                <CheckIcon className="toast-success-message__icon" />
                <span className="toast-success-message__message">{message}</span>
            </div>
        </div>
    );
}

SuccessToasterMessage.defaultProps = {
    message: "Changes are saved successfully",
};

SuccessToasterMessage.propTypes = {
    message: PropTypes.string,
};

export default SuccessToasterMessage;
