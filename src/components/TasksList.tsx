import React from "react";
import TaskItem from "./TaskItem";
import { TasksListProps } from "../interfaces";

const TasksList: React.FC<TasksListProps> = ({
  tasksList,
  onDelete,
  onEdit,
}) => {
  return (
    <ul className="mt-36">
      {tasksList.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TasksList;
