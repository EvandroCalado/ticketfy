import { Metadata } from 'next';
import { Suspense } from 'react';

import { Spinner } from '@/components/shared/spinner';

import { TicketEdit } from '../../../components/ticket-edit';

export const metadata: Metadata = {
  title: 'Editar ticket',
};

type TicketEditPageParams = {
  params: Promise<{ ticketId: string }>;
};

const TicketEditPage = async ({ params }: TicketEditPageParams) => {
  const { ticketId } = await params;

  return (
    <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col space-y-10'>
      <Suspense
        fallback={
          <Spinner
            size='16'
            className='flex h-full flex-1 items-center justify-center'
          />
        }
      >
        <TicketEdit ticketId={ticketId} />
      </Suspense>
    </main>
  );
};

export default TicketEditPage;
