import { useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import TaskCard from "@components/TaskCard";
import CreateTaskCard from "@components/CreateTaskCard";
import { Button } from "@components/ui/form";
import { selectFilteredTasks } from "@features/task/taskSelectors";
import usePaginate from "@hooks/usePaginate";
import "./TaskList.scss";
import TaskListEmpty from "@components/TaskListEmpty";

const TASK_PER_PAGE = import.meta.env.VITE_TASK_PER_PAGE;

function TaskList({ isDisabled, isTaskCreating, onTaskCreation }) {
    const { status: filterState, search: textToSearch } = useSelector((state) => state.filter);
    const tasks = useSelector((state) => selectFilteredTasks(state, filterState, textToSearch));
    const {
        data: chunkedTasks,
        hasMore,
        isLastPage,
        next,
        reset,
    } = usePaginate({
        collection: tasks,
        isCollectionCreating: isTaskCreating,
        perPage: TASK_PER_PAGE,
    });
    const isEmptyCardShowing = !isTaskCreating && chunkedTasks.length === 0;

    const taskCards = chunkedTasks.map((task) => {
        return <TaskCard key={task.id} task={task} isDisabled={isDisabled} />;
    });

    useEffect(() => {
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterState, textToSearch]);

    return (
        <div data-testid="task-list" className="task-list">
            <div className="task-list__grid">
                {isTaskCreating && <CreateTaskCard onTaskCreation={onTaskCreation} />}
                {taskCards}
            </div>
            {(hasMore || isLastPage) && (
                <div className="task-list__paginate-buttons">
                    {hasMore && (
                        <Button className="btn--secondary" onClick={next}>
                            Load More
                        </Button>
                    )}
                    {isLastPage && (
                        <Button className="btn--secondary" onClick={reset}>
                            Show Less
                        </Button>
                    )}
                </div>
            )}

            <TaskListEmpty isShowing={isEmptyCardShowing} taskState={filterState} />
        </div>
    );
}

TaskList.defaultProps = {
    isDisabled: false,
};

TaskList.propTypes = {
    isDisabled: PropTypes.bool,
    isTaskCreating: PropTypes.bool.isRequired,
    onTaskCreation: PropTypes.func.isRequired,
};

export default TaskList;
