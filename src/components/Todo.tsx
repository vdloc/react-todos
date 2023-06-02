import { useStore } from '@/store';
import Button from './Button';
import type { TodoItem } from '@/types';
import { ChangeEvent } from 'react';

type TodoProps = {
  todo: TodoItem;
};

export default function Todo({ todo }: TodoProps) {
  const { id, title, description } = todo;
  const updateTask = useStore().updateTask;

  function handleTaskEditClick() {
    useStore.setState({ selectingTask: todo, isTaskUpdateDialogOpen: true });
  }

  function handleStatusChange(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;
    const updatingTask = { ...todo, status: target.checked };
    updateTask(updatingTask);
  }

  return (
    <div className='relative grid grid-cols-12 items-center py-4'>
      <div className='col-span-8'>
        <label
          htmlFor={`todo-${id}`}
          className='select-none font-medium text-md text-gray-700 cursor-pointer'
        >
          {title}
        </label>
        <p className='text-xs text-black mt-1'>{description}</p>
      </div>
      <div className='col-span-2 text-right pr-3'>
        <input
          id={`todo-${id}`}
          name={`todo-${id}`}
          type='checkbox'
          className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer'
          onChange={handleStatusChange}
        />
      </div>
      <div className='col-span-2 text-right'>
        <Button
          label='Edit'
          size='small'
          rounded={true}
          onClick={handleTaskEditClick}
        />
      </div>
    </div>
  );
}