import PropTypes from "prop-types";
import AddFileSVG from "@assets/svg/add-file.svg";
import { TASK_STATE_COMPLETE, EMPTY_TASK_MESSAGE_COMPLETE, EMPTY_TASK_MESSAGE_DEFAULT } from "@helpers/constants";

function TaskListEmpty({ isShowing, taskState }) {
    const message = taskState === TASK_STATE_COMPLETE ? EMPTY_TASK_MESSAGE_COMPLETE : EMPTY_TASK_MESSAGE_DEFAULT;

    return (
        <>
            {isShowing && (
                <div data-testid="task-list-empty" className="task-list__empty">
                    <img className="task-list__empty-logo" src={AddFileSVG} alt="Add file icon" />
                    <span className="task-list__empty-message">{message}</span>
                </div>
            )}
        </>
    );
}

TaskListEmpty.defaultProps = {
    isShowing: false,
};

TaskListEmpty.propTypes = {
    isShowing: PropTypes.bool,
    taskState: PropTypes.string.isRequired,
};

export default TaskListEmpty;
