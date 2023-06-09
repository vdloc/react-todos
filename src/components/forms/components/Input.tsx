import { FormInputProps } from '@/types';
import { useController } from 'react-hook-form';

export default function Input({
  control,
  name,
  label,
  id,
  className,
}: FormInputProps) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div className={className}>
      <label htmlFor={id} className='block text-sm font-medium text-gray-900'>
        {label}
      </label>
      <div className='mt-1'>
        <input
          type='text'
          id={id}
          className='block w-full p-2 rounded-md border border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          name={field.name}
          value={field.value}
          onChange={field.onChange}
        />
      </div>
    </div>
  );
}