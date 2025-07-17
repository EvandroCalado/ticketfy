import { Metadata } from 'next';
import { Suspense } from 'react';

import { Spinner } from '@/components/shared/spinner';

import { TicketsList } from './components/tickets-list';
import { TicketsTitle } from './components/tickets-title';

export const metadata: Metadata = {
  title: 'Tickets',
};

const TicketsPage = async () => {
  return (
    <>
      <TicketsTitle />
      <Suspense fallback={<Spinner size='16' />}>
        <TicketsList />
      </Suspense>
    </>
  );
};

export default TicketsPage;
