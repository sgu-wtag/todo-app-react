import TextArea from "@components/ui/form/TextArea";
import Button from "@components/ui/form/button";
import { addTask } from "@features/task/taskSlice";
import { sanitizeAndTrim } from "@utils/sanitizeAndTrim";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";

function TaskItemInput({ onTaskCreation }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");

    const resetInput = () => {
        setTitle("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const cleanTitle = sanitizeAndTrim(title);

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
    };

    return (
        <form className="task-list__item" onSubmit={handleSubmit}>
            <TextArea value={title} onChange={(e) => setTitle(e.target.value)} autoFocus required />
            <Button type="submit">Add task</Button>
        </form>
    );
}

TaskItemInput.propTypes = {
    onTaskCreation: PropTypes.func.isRequired,
};

export default TaskItemInput;
