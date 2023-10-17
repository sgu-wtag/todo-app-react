import PropTypes from "prop-types";
import "@components/ui/icons/_iconBase.scss";

function LeafIcon({ className, ...rest }) {
    return (
        <svg
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-testid="svg-icon-leaf"
            className={className}
            {...rest}
        >
            <path
                d="M33.5793 4.4657C29.902 1.67903 24.2431 0.0153503 18.4417 0.0153503C11.2658 0.0153503 5.41856 2.52072 2.39927 6.88906C0.981229 8.94068 0.196905 11.3701 0.0681433 14.1099C-0.0465403 16.5494 0.36312 19.2473 1.28617 22.1499C4.43628 12.7074 13.2333 5.31251 23.3751 5.31251C23.3751 5.31251 13.8848 7.81045 7.91822 15.5454C7.91451 15.55 7.83542 15.648 7.69862 15.8342C6.50065 17.4372 5.45615 19.2595 4.67454 21.3237C3.35074 24.4723 2.12508 28.7926 2.12508 34H6.37508C6.37508 34 5.72994 29.9419 6.85187 25.2746C8.70759 25.5254 10.3667 25.65 11.8606 25.65C15.7679 25.65 18.5467 24.8046 20.6059 22.9896C22.451 21.3634 23.468 19.1783 24.5446 16.8651C26.189 13.332 28.0527 9.32763 33.4648 6.23502C33.7746 6.05799 33.9748 5.73724 33.9979 5.38117C34.0209 5.0251 33.8637 4.68125 33.5793 4.4657Z"
                fill="#7A8DFD"
            />
        </svg>
    );
}

LeafIcon.defaultProps = {
    className: "icon-base",
};

LeafIcon.propTypes = {
    className: PropTypes.string,
    strokeWidth: PropTypes.number,
};

export default LeafIcon;
