import Link from 'next/link';

import { SearchParams } from 'nuqs';

import { EmptyError } from '@/components/shared/empty-error';
import { Button } from '@/components/ui/button';
import { ticketCreatePath } from '@/utils/paths';

import { getTickets } from '../actions/get-tickets';
import { ticketSelectOptions } from '../constants/ticket-select-options';
import { TicketCard } from './ticket-card';
import { TicketsPagination } from './tickets-pagination';
import { TicketsSearch } from './tickets-search';
import { TicketsSelect } from './tickets-select';

type TicketsListProps = {
  searchParams: SearchParams;
};

export const TicketsList = async ({ searchParams }: TicketsListProps) => {
  const { tickets, metadata } = await getTickets(undefined, searchParams);

  return (
    <div className='animate-fade-from-top mx-auto mt-5 flex w-full max-w-7xl flex-1 flex-col space-y-10'>
      <div className='border-border flex items-center justify-between gap-2 border-b pb-5'>
        <div className='flex items-center gap-2'>
          <TicketsSearch placeholder='Procurar ticket...' />
          <TicketsSelect options={ticketSelectOptions} />
        </div>

        <Button asChild>
          <Link href={ticketCreatePath()}>Adicionar</Link>
        </Button>
      </div>

      {tickets.length === 0 && (
        <EmptyError
          label='Nenhum ticket encontrado'
          description='Não há tickets para exibir'
        />
      )}

      <div className='grid h-full flex-1 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {tickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>

      <TicketsPagination metadata={metadata} />
    </div>
  );
};
