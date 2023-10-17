import PropTypes from "prop-types";
import "@components/ui/icons/_iconBase.scss";

function TrashIcon({ className, ...rest }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fillRule="evenodd"
            clipRule="evenodd"
            data-testid="svg-icon-trash"
            className={className}
            {...rest}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"
            />
        </svg>
    );
}

TrashIcon.defaultProps = {
    className: "icon-base",
};

TrashIcon.propTypes = {
    className: PropTypes.string,
    strokeWidth: PropTypes.number,
};

export default TrashIcon;
