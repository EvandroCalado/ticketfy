import { Metadata } from 'next';
import { Suspense } from 'react';

import { PageTitle } from '@/components/shared/page-title';
import { Spinner } from '@/components/shared/spinner';
import { ticketsPath } from '@/utils/paths';

import { TicketsList } from './components/tickets-list';

export const metadata: Metadata = {
  title: 'Tickets',
};

const TicketsPage = async () => {
  const breadcrumbs = [
    {
      title: 'Tickets',
      href: ticketsPath(),
    },
  ];

  return (
    <>
      <PageTitle title='Tickets' breadcrumbs={breadcrumbs} />
      <Suspense
        fallback={
          <Spinner
            size='16'
            className='flex h-full flex-1 items-center justify-center'
          />
        }
      >
        <TicketsList />
      </Suspense>
    </>
  );
};

export default TicketsPage;
