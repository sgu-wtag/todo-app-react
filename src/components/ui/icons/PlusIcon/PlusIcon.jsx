import "@components/ui/icons/_iconBase.scss";
import PropTypes from "prop-types";

function PlusIcon({ className, ...rest }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-testid="svg-icon-plus"
            className={className}
            {...rest}
        >
            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
        </svg>
    );
}

PlusIcon.defaultProps = {
    className: "icon-base",
};

PlusIcon.propTypes = {
    className: PropTypes.string,
    strokeWidth: PropTypes.number,
};

export default PlusIcon;
