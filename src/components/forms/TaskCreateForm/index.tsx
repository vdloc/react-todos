import { database } from '@/firebase/firestore';
import { useDialogStore, useTaskStore, useUserStore } from '@/store';
import { TaskCreateFormValues } from '@/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import FormLayout from '../FormLayout';
import TaskCreateFormContent from './Content';
import TaskCreateFormFooter from './Footer';
import TaskCreateFormHeader from './Header';

export default function TaskCreateForm() {
  const { toggleTaskCreateDialog } = useDialogStore();
  const { createTask } = useTaskStore();
  const { user } = useUserStore();
  const { control, handleSubmit } = useForm<TaskCreateFormValues>({
    defaultValues: {
      createDate: new Date().toDateString(),
      dueDate: new Date().toDateString(),
      title: '',
      description: '',
      id: uuidv4(),
      tags: [],
    },
  });
  const onSubmit: SubmitHandler<TaskCreateFormValues> = async (data: TaskCreateFormValues) => {
    const updatedTask = {
      ...data,
      status: false,
      tags: data.tags || [],
      userID: user?.uid as string,
    };

    await database.createTask(updatedTask);
    createTask(updatedTask);
    toggleTaskCreateDialog(false);
  };

  return (
    <FormLayout
      Header={TaskCreateFormHeader}
      Content={() => <TaskCreateFormContent control={control} />}
      Footer={TaskCreateFormFooter}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
