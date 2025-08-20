import { Metadata } from 'next';
import { Suspense } from 'react';

import { SearchParams } from 'nuqs/server';

import { Spinner } from '@/components/shared/spinner';

import { TicketDetails } from '../../components/ticket-details';
import { searchParamsCache } from '../../search-params';

export const metadata: Metadata = {
  title: 'Ticket',
};

type TicketPageParams = {
  params: Promise<{ ticketId: string }>;
  searchParams: Promise<SearchParams>;
};

const TicketPage = async ({ params, searchParams }: TicketPageParams) => {
  const { ticketId } = await params;
  const parsedSearchParams = await searchParamsCache.parse(searchParams);

  return (
    <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col'>
      <Suspense
        fallback={
          <Spinner
            size='16'
            className='flex h-full flex-1 items-center justify-center'
          />
        }
      >
        <TicketDetails
          ticketId={ticketId}
          parsedSearchParams={parsedSearchParams}
        />
      </Suspense>
    </main>
  );
};

export default TicketPage;
