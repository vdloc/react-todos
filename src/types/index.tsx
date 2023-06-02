import type { Control } from 'react-hook-form';

export type TodoItem = {
  id: string | number;
  title: string;
  description: string;
  status: boolean;
  tags?: string[];
  createDate?: string;
  dueDate?: string;
  endDate?: string;
};

export interface StoreState {
  isTaskUpdateDialogOpen: boolean;
  isTaskCreateCreateOpen: boolean;
  selectingTask: TodoItem | null;
  tasks: TodoItem[] | [];
  setSelectingTask: (task: TodoItem) => void;
  toggleTaskUpdateDialog: (isOpen: boolean) => void;
  toggleTaskCreateDialog: (isOpen: boolean) => void;
  updateTask: (task: TodoItem) => void;
  fetchTasks: () => void;
}

export type TaskEditFormValues = {
  title: string;
  description: string;
  status: boolean;
  id: string | number;
};

export type InputProps = {
  control: Control<TaskEditFormValues>;
  name: any;
  label: string;
  id?: string;
};
