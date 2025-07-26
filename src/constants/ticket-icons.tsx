import { FileCheck2Icon, FilePenIcon, FileTextIcon } from 'lucide-react';

export const TICKET_ICONS = {
  OPEN: (
    <div className='rounded-md bg-blue-500/10 p-2 text-blue-500'>
      <FileTextIcon className='size-5' />
    </div>
  ),
  IN_PROGRESS: (
    <div className='rounded-md bg-yellow-500/10 p-2 text-yellow-500'>
      <FilePenIcon className='size-5' />
    </div>
  ),
  DONE: (
    <div className='rounded-md bg-green-500/10 p-2 text-green-500'>
      <FileCheck2Icon className='size-5' />
    </div>
  ),
};
