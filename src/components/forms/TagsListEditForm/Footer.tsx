import { useStore } from '@/store';

export default function TagsListEditFormFooter() {
  const toggleTagsListEditDialog = useStore(
    (state) => state.toggleTagsListEditDialog
  );

  function handleCloseDialog() {
    toggleTagsListEditDialog(false);
  }

  return (
    <button
      type='button'
      className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      onClick={handleCloseDialog}
    >
      Close
    </button>
  );
}
