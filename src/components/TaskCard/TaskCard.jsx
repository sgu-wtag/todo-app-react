import { useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Button, TextArea } from "@components/ui/form";
import IconButton from "@components/ui/form/IconButton";
import { CheckIcon, PencilIcon, TrashIcon } from "@components/ui/icons";
import { deleteTask, markAsDone, updateTask } from "@features/task/taskSlice";
import { ENTER_KEY } from "@helpers/constants";
import formatDate from "@helpers/formatting/formatDate";
import { compareDates } from "@helpers/operations/compareDates";
import purify from "@helpers/text/purify";
import { displayToaster } from "@helpers/utility/toaster";
import "@components/TaskCard/TaskCard.scss";
import SuccessToasterMessage from "@components/ui/toaster/SuccessMessage";

function TaskCard({ task, isDisabled }) {
    const { id, title, createdAt, isCompleted, completedAt } = task;
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);

    const currentDate = new Date().toISOString();
    const daysElapsed = compareDates(currentDate, completedAt);
    const pluralizedDayText = daysElapsed === 1 ? "day" : "days";

    const handleTitleChange = (event) => {
        setEditTitle(event.target.value);
    };

    const onEditTask = () => {
        const purifiedEditTitle = purify(editTitle);

        if (purifiedEditTitle === "") {
            setEditTitle("");
            return;
        }

        dispatch(updateTask({ id, editTitle: purifiedEditTitle }));
        setIsEditing(false);
        setEditTitle(purifiedEditTitle);
        displayToaster(<SuccessToasterMessage />, "success");
    };

    const handleDelete = () => {
        if (isEditing) {
            setIsEditing(false);
            return;
        }
        dispatch(deleteTask(id));
        displayToaster("Task is deleted", "error");
    };

    const handleMarkAsDone = () => {
        if (isEditing) {
            onEditTask();
        }
        dispatch(markAsDone(id));
        displayToaster(<SuccessToasterMessage />, "success");
    };

    const handleTextareaKeyDown = (event) => {
        if (event.key === ENTER_KEY && !event.shiftKey) {
            event.preventDefault();
            onEditTask();
        }
    };

    return (
        <div
            className={classNames("task-card", {
                "task-card--complete": isCompleted,
                "task-card--disabled": isDisabled,
            })}
        >
            <div className="task-card__header">
                {isEditing ? (
                    <TextArea
                        className="task-card__input"
                        value={editTitle}
                        onChange={handleTitleChange}
                        onKeyUp={handleTextareaKeyDown}
                        disabled={isDisabled}
                    />
                ) : (
                    <>
                        <h2 className="task-card__title">{title}</h2>
                        <span className="task-card__created-date">Created At: {formatDate(createdAt)}</span>
                    </>
                )}
            </div>
            <div className="task-card__body">
                <div className="task-card__actions-wrapper">
                    {isEditing && (
                        <Button onClick={onEditTask} disabled={isDisabled}>
                            Save
                        </Button>
                    )}

                    {!isCompleted && (
                        <IconButton data-testid="btn-mark-as-done" onClick={handleMarkAsDone} disabled={isDisabled}>
                            <CheckIcon />
                        </IconButton>
                    )}

                    {!isEditing && !isCompleted && (
                        <IconButton data-testid="btn-edit" onClick={() => setIsEditing(true)} disabled={isDisabled}>
                            <PencilIcon />
                        </IconButton>
                    )}

                    <IconButton data-testid="btn-delete" onClick={handleDelete} disabled={isDisabled}>
                        <TrashIcon />
                    </IconButton>
                </div>
                {completedAt && (
                    <span className="task-card__completed-in">
                        Completed in {daysElapsed === null ? "N/A" : daysElapsed} {pluralizedDayText}
                    </span>
                )}
            </div>
        </div>
    );
}

TaskCard.defaultProps = {
    isDisabled: false,
    task: {},
};

TaskCard.propTypes = {
    isDisabled: PropTypes.bool,
    task: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        createdAt: PropTypes.string,
        completedAt: PropTypes.string,
        isCompleted: PropTypes.bool,
    }),
};

export default TaskCard;
