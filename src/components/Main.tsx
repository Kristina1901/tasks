import React, { useState } from "react";
import Form from "./Form";
import Modal from "./Modal";
import { Task } from "../interfaces";
import TasksList from "./TasksList";

const Main: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [selectedTaskItem, setselectedTaskItem] = useState<Task | null>(null);
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const addItem = (item: Task) => {
    setTasksList((prevTasksList) => [...prevTasksList, item]);
  };
  const deleteItem = (id: string) => {
    setTasksList((prevTasksList) =>
      prevTasksList.filter((task) => task.id !== id)
    );
  };
  const editTaskItem = (id: string): void => {
    toggleModal();
    const selectedTask = tasksList.find((task) => task.id === id) || null;
    setselectedTaskItem(selectedTask);
  };
  const resetSelectedTaskItem = () => {
    setselectedTaskItem(null);
  };
  const updateTasksList = (updatedTask: Task) => {
    setTasksList((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };
  return (
    <div>
      <button onClick={toggleModal}>Add task</button>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <Form
          close={toggleModal}
          addItem={addItem}
          selectedTaskItem={selectedTaskItem}
          resetSelectedTaskItem={resetSelectedTaskItem}
          updateTasksList={updateTasksList}
        />
      </Modal>
      <TasksList
        tasksList={tasksList}
        onDelete={deleteItem}
        onEdit={editTaskItem}
      />
    </div>
  );
};

export default Main;
