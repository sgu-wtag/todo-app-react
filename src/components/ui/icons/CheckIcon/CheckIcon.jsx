import PropTypes from "prop-types";
import "@components/ui/icons/_iconBase.scss";

function CheckIcon({ className, ...rest }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-testid="svg-icon-check"
            className={className}
            {...rest}
        >
            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
        </svg>
    );
}

CheckIcon.defaultProps = {
    className: "icon-base",
};

CheckIcon.propTypes = {
    className: PropTypes.string,
};

export default CheckIcon;
