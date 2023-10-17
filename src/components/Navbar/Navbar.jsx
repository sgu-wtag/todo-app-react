import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Input } from "@components/ui/form";
import { LeafIcon, MagnifierIcon } from "@components/ui/icons";
import { searchTask } from "@features/filter/filterSlice";
import { TASK_SEARCH_DELAY_IN_MS } from "@helpers/constants";
import purify from "@helpers/text/purify";
import useDebounce from "@hooks/useDebounce";
import "./Navbar.scss";
import IconButton from "@components/ui/form/IconButton";

function Navbar({ onSearching }) {
    const PLACEHOLDER = "Search...";
    const [isSearchboxShowing, setIsSearchboxShowing] = useState(false);
    const dispatch = useDispatch();
    const textToSearch = useSelector((state) => state.filter.search);
    const [text, setText] = useState(textToSearch);
    const typingTimerRef = useRef();

    const debouncedDispatch = useDebounce(() => {
        const purifiedText = purify(text);

        dispatch(searchTask(purifiedText));
    });

    const toggleSearching = () => {
        onSearching(true);

        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = setTimeout(() => {
            onSearching(false);
        }, TASK_SEARCH_DELAY_IN_MS);
    };

    const handleInputChange = (event) => {
        const textToSearch = event.target.value;

        setText(textToSearch);
        debouncedDispatch();
        toggleSearching();
    };

    const handleToggleSearchbox = () => {
        setIsSearchboxShowing((prevIsSearchboxShowing) => !prevIsSearchboxShowing);
    };

    return (
        <nav className="nav">
            <div className="nav__container">
                <div className="nav__logo-wrapper">
                    <LeafIcon className="nav__logo-icon" />
                    <span className="nav__logo-text">Todos</span>
                </div>
                <div className="nav__search-box-wrapper">
                    {isSearchboxShowing && (
                        <Input
                            className="nav__search-box-input"
                            value={text}
                            placeholder={PLACEHOLDER}
                            onChange={handleInputChange}
                        />
                    )}
                    <IconButton data-testid="toggle-search-button" onClick={handleToggleSearchbox}>
                        <MagnifierIcon />
                    </IconButton>
                </div>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    onSearching: PropTypes.func.isRequired,
};

export default Navbar;
