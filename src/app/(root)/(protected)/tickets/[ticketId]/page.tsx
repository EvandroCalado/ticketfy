import { Metadata } from 'next';
import { Suspense } from 'react';

import { Spinner } from '@/components/shared/spinner';

import { TicketDetails } from './components/ticket-details';

export const metadata: Metadata = {
  title: 'Ticket',
};

type TicketPageParams = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TicketPageParams) => {
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
        <TicketDetails ticketId={ticketId} />
      </Suspense>
    </main>
  );
};

export default TicketPage;
