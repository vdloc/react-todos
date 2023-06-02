import { useForm, SubmitHandler } from 'react-hook-form';
import FormHeader from '../forms/FormHeader';
import Input from '../forms/Input';
import TextArea from '../forms/TextArea';
import Toggle from '../forms/Toggle';
import DateTimePicker from '../forms/DateTimePicker';
import { useStore } from '@/store';
import { TaskEditFormValues, TodoItem } from '@/types';
import Tags from '../Tags';

export default function TaskEditForm() {
  const selectingTask = useStore((state) => state.selectingTask);
  const updateTask = useStore((state) => state.updateTask);
  const toggleTaskUpdateDialog = useStore(
    (state) => state.toggleTaskUpdateDialog
  );

  const { control, handleSubmit } = useForm<TaskEditFormValues>({
    defaultValues: { ...selectingTask },
  });
  const onSubmit: SubmitHandler<TaskEditFormValues> = (data: TodoItem) => {
    const updatedTask = { ...selectingTask, ...data };
    toggleTaskUpdateDialog(false);
    updateTask(updatedTask);
  };

  return (
    <form
      className='flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex-1'>
        <FormHeader
          onClose={toggleTaskUpdateDialog}
          title='Edit task'
          description='Update task status, change due date or delete task'
        />
        <div className='flex flex-1 flex-col justify-between '>
          <div className='divide-y divide-gray-200 px-4 sm:px-6'>
            <div className='space-y-2 pt-6 pb-5'>
              <Input
                label='Title'
                id='task-title'
                control={control}
                name='title'
              />
              <TextArea
                label='Description'
                id='task-description'
                control={control}
                name='description'
              />

              <div className='grid grid-cols-2 items-center gap-4'>
                <DateTimePicker
                  title='Choose start date'
                  label='Start date'
                  control={control}
                  name='startDate'
                />
                <Toggle
                  label='Status'
                  control={control}
                  id='task-stastus'
                  name='status'
                />
              </div>
              <div className='flex gap-4'>
                <DateTimePicker
                  title='Choose end date'
                  label='End date'
                  name='endDate'
                  control={control}
                />
                <DateTimePicker
                  title='Choose due date'
                  label='Due date'
                  name='dueDate'
                  control={control}
                />
              </div>

              <Tags />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-shrink-0 justify-end px-4 py-4'>
        <button
          type='button'
          className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          onClick={() => toggleTaskUpdateDialog(false)}
        >
          Cancel
        </button>
        <button
          type='submit'
          className='ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Save
        </button>
      </div>
    </form>
  );
}
