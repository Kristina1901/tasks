import { ReactNode } from "react";
export interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  file: File | null;
}
export interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}
export interface FormProps {
  close: () => void;
  addItem: (item: Task) => void;
  selectedTaskItem: Task | null;
  resetSelectedTaskItem: () => void;
  updateTasksList: (item: Task) => void;
}
export interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}
export interface TasksListProps {
  tasksList: Task[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}
