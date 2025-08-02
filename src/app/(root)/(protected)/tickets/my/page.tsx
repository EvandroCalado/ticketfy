import { Metadata } from 'next';
import { Suspense } from 'react';

import { SearchParams } from 'nuqs';

import { getAuth } from '@/actions/get-auth';
import { PageTitle } from '@/components/shared/page-title';
import { Spinner } from '@/components/shared/spinner';
import { ticketsPath } from '@/utils/paths';

import { TicketsList } from '../components/tickets-list';
import { searchParamsCache } from '../search-params';

export const metadata: Metadata = {
  title: 'Meus tickets',
};

type MyTicketsPageParams = {
  searchParams: Promise<SearchParams>;
};

const MyTicketsPage = async ({ searchParams }: MyTicketsPageParams) => {
  const parsedSearchParams = await searchParamsCache.parse(searchParams);

  const { user } = await getAuth();

  const breadcrumbs = [
    {
      title: 'Tickets',
      href: ticketsPath(),
    },
    {
      title: 'Meus tickets',
    },
  ];

  return (
    <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col space-y-10'>
      <PageTitle title='Meus tickets' breadcrumbs={breadcrumbs} />
      <Suspense
        fallback={
          <Spinner
            size='16'
            className='flex h-full flex-1 items-center justify-center'
          />
        }
      >
        <TicketsList searchParams={parsedSearchParams} userId={user?.id} />
      </Suspense>
    </main>
  );
};

export default MyTicketsPage;
