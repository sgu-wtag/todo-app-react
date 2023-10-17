import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import TaskList from "@components/TaskList";
import { Button } from "@components/ui/form";
import { PlusIcon, SpinnerIcon } from "@components/ui/icons";
import { filterTask } from "@features/filter/filterSlice";
import { TASK_STATE_ALL, TASK_STATE_COMPLETE, TASK_STATE_INCOMPLETE } from "@helpers/constants";
import "./TaskBoard.scss";

function TaskBoard({ isSearching }) {
    const dispatch = useDispatch();
    const [isTaskCreating, setIsTaskCreating] = useState(false);
    const filterState = useSelector((state) => state.filter.status);

    const toggleCreation = () => {
        setIsTaskCreating((prevIsTaskCreating) => !prevIsTaskCreating);
    };

    const handleFilterClick = (filterState) => {
        dispatch(filterTask(filterState));
    };

    const isDisabled = (isSearching, filterState, taskState) => {
        return isSearching || filterState === taskState;
    };

    return (
        <section className="task-board">
            <div className="task-board__container">
                <h1 className="task-board__heading">Add Tasks</h1>
                <div className="task-board__action-wrapper">
                    <Button className="btn--primary" disabled={isSearching} onClick={toggleCreation}>
                        <PlusIcon className="task-board__action-icon" />
                        Create
                    </Button>
                    <div className="task-board__filter-buttons">
                        <Button
                            className={classNames({
                                "btn--active": filterState === TASK_STATE_ALL,
                            })}
                            disabled={isDisabled(isSearching, filterState, TASK_STATE_ALL)}
                            onClick={() => handleFilterClick(TASK_STATE_ALL)}
                        >
                            {TASK_STATE_ALL}
                        </Button>
                        <Button
                            className={classNames({
                                "btn--active": filterState === TASK_STATE_INCOMPLETE,
                            })}
                            disabled={isDisabled(isSearching, filterState, TASK_STATE_INCOMPLETE)}
                            onClick={() => handleFilterClick(TASK_STATE_INCOMPLETE)}
                        >
                            {TASK_STATE_INCOMPLETE}
                        </Button>
                        <Button
                            className={classNames({
                                "btn--active": filterState === TASK_STATE_COMPLETE,
                            })}
                            disabled={isDisabled(isSearching, filterState, TASK_STATE_COMPLETE)}
                            onClick={() => handleFilterClick(TASK_STATE_COMPLETE)}
                        >
                            {TASK_STATE_COMPLETE}
                        </Button>
                    </div>
                </div>

                <TaskList isDisabled={isSearching} isTaskCreating={isTaskCreating} onTaskCreation={toggleCreation} />

                {isSearching && (
                    <div data-testid="loader" className="task-board__loader-wrapper">
                        <SpinnerIcon className="task-board__loader" />
                    </div>
                )}
            </div>
        </section>
    );
}

TaskBoard.defaultProps = {
    isSearching: false,
};

TaskBoard.propTypes = {
    isSearching: PropTypes.bool,
};

export default TaskBoard;
