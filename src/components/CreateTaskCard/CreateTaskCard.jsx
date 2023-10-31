import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextArea } from "@components/ui/form";
import { addTask } from "@features/task/taskSlice";
import { ENTER_KEY } from "@helpers/constants";
import purify from "@helpers/text/purify";
import { displayToaster } from "@helpers/utility/toaster";
import "@components/TaskCard/TaskCard.scss";

function CreateTaskCard({ onTaskCreation }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const resetInput = () => {
        setTitle("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const cleanTitle = purify(title);

        if (cleanTitle === "") {
            resetInput();
            return;
        }

        const newTask = {
            id: Date.now().toString(),
            title: cleanTitle,
            createdAt: new Date().toISOString(),
            isCompleted: false,
        };

        dispatch(addTask(newTask));
        resetInput();
        onTaskCreation();
        displayToaster("Task is created", "success");
    };

    const handleTextareaKeyDown = (event) => {
        if (event.key === ENTER_KEY && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    return (
        <form className="task-card" onSubmit={handleSubmit}>
            <TextArea
                className="task-card__input"
                value={title}
                onChange={handleTitleChange}
                autoFocus
                required
                onKeyDown={handleTextareaKeyDown}
            />
            <div className="task-card__body">
                <Button type="submit">Add task</Button>
            </div>
        </form>
    );
}

CreateTaskCard.propTypes = {
    onTaskCreation: PropTypes.func.isRequired,
};

export default CreateTaskCard;
