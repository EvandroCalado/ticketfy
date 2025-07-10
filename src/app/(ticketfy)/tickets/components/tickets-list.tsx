import { getTickets } from '../actions/get-tickets';
import { TicketCard } from './ticket-card';

// type TicketsListProps = {
//   tickets: Ticket[];
// };

export const TicketsList = async () => {
  const tickets = await getTickets();

  return (
    <div className='container mx-auto flex flex-1 flex-col space-y-10 p-5'>
      <div>
        <h1 className='text-4xl font-semibold tracking-tighter'>Tickets</h1>
        <p className='text-muted-foreground'>Todos os seus tickets</p>
      </div>

      <div className='border-border border-b pb-5 text-xs'>
        <span className='mr-1 font-semibold'>{tickets.length}</span>
        <span className='text-muted-foreground/60'>Tickets encontrados</span>
      </div>

      <div className='animate-fade-from-top grid h-full grow grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {tickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};
