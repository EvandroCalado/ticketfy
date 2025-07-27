import { Metadata } from 'next';
import { Suspense } from 'react';

import { SearchParams } from 'nuqs/server';

import { PageTitle } from '@/components/shared/page-title';
import { Spinner } from '@/components/shared/spinner';
import { ticketsPath } from '@/utils/paths';

import { TicketsList } from './components/tickets-list';
import { searchParamsCache } from './search-params';

export const metadata: Metadata = {
  title: 'Tickets',
};

type TicketsPageParams = {
  searchParams: Promise<SearchParams>;
};

const TicketsPage = async ({ searchParams }: TicketsPageParams) => {
  const parsedSearchParams = await searchParamsCache.parse(searchParams);

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
        <TicketsList searchParams={parsedSearchParams} />
      </Suspense>
    </>
  );
};

export default TicketsPage;
