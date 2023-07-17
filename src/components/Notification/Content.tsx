import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useNotificationStore } from '@/store';
import { shallow } from 'zustand/shallow';

export default function NotificationContent() {
  const { isNotificationOpen, toggleNotification, notificationProps } =
    useNotificationStore((state) => state, shallow);
  const { icon: Icon, title, description } = notificationProps;

  return (
    <Transition
      show={isNotificationOpen}
      as={Fragment}
      enter='transform ease-out duration-300 transition'
      enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
      enterTo='translate-y-0 opacity-100 sm:translate-x-0'
      leave='transition ease-in duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div className='pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
        <div className='p-4'>
          <div className='flex items-start'>
            <div className='flex-shrink-0'>{Icon ? <Icon /> : null}</div>
            <div className='ml-3 w-0 flex-1 pt-0.5'>
              <p className='text-sm font-medium text-gray-900'>{title}</p>
              <p className='mt-1 text-sm text-gray-500'>{description}</p>
              <div className='mt-3 flex space-x-7'>
                <button
                  type='button'
                  className='rounded-md bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  onClick={() => {
                    toggleNotification(false);
                  }}
                >
                  Dismiss
                </button>
              </div>
            </div>
            <div className='ml-4 flex flex-shrink-0'>
              <button
                type='button'
                className='inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                onClick={() => {
                  toggleNotification(false);
                }}
              >
                <span className='sr-only'>Close</span>
                <XMarkIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
