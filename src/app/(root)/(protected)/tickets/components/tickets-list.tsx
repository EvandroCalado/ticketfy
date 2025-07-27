import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ticketCreatePath } from '@/utils/paths';

import { getTickets } from '../actions/get-tickets';
import { TicketCard } from './ticket-card';

export const TicketsList = async () => {
  const { tickets, count } = await getTickets();

  return (
    <div className='animate-fade-from-top mx-auto flex w-full max-w-7xl flex-1 flex-col space-y-10'>
      <div className='border-border flex items-center justify-between border-b pb-5'>
        <div className='text-xs'>
          <span className='mr-1 font-semibold'>{count}</span>
          <span className='text-muted-foreground/60'>Tickets encontrados</span>
        </div>

        <Button asChild>
          <Link href={ticketCreatePath()}>Adicionar</Link>
        </Button>
      </div>

      <div className='grid h-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {tickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};
