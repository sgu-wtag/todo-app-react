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
import "@components/TaskCard/TaskCard.scss";

function TaskCard({ task }) {
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
    };

    const handleDelete = () => {
        if (isEditing) {
            setIsEditing(false);
            return;
        }
        dispatch(deleteTask(id));
    };

    const handleMarkAsDone = () => {
        if (isEditing) {
            onEditTask();
        }
        dispatch(markAsDone(id));
    };

    const handleTextareaKeyDown = (event) => {
        if (event.key === ENTER_KEY && !event.shiftKey) {
            event.preventDefault();
            onEditTask();
        }
    };

    return (
        <div className="task-card">
            {isEditing ? (
                <TextArea
                    className="task-card__input"
                    value={editTitle}
                    onChange={handleTitleChange}
                    onKeyUp={handleTextareaKeyDown}
                />
            ) : (
                <h2
                    className={classNames("task-card__title", {
                        "task-card__title--complete": isCompleted,
                    })}
                >
                    {title}
                </h2>
            )}
            <span>Created At: {formatDate(createdAt)}</span>
            <div className="task-card__body">
                <div className="task-card__actions-wrapper">
                    {isEditing && <Button onClick={onEditTask}>Save</Button>}
                    {!isCompleted && <IconButton icon={<CheckIcon />} onClick={handleMarkAsDone} />}
                    {!isEditing && !isCompleted && (
                        <IconButton icon={<PencilIcon />} onClick={() => setIsEditing(true)} />
                    )}
                    <IconButton icon={<TrashIcon />} onClick={handleDelete} />
                </div>
            </div>
            {completedAt && (
                <span>
                    Completed in {daysElapsed === null ? "N/A" : daysElapsed} {pluralizedDayText}
                </span>
            )}
        </div>
    );
}

TaskCard.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        createdAt: PropTypes.string,
        completedAt: PropTypes.string,
        isCompleted: PropTypes.bool,
    }),
};

export default TaskCard;
