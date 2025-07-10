import { TicketCard } from './components/ticket-card';

const initialTickets = [
  {
    id: '1',
    title: 'Ticket 1',
    content: 'Content 1',
    status: 'OPEN' as const,
  },
  {
    id: '2',
    title: 'Ticket 2',
    content: 'Content 2',
    status: 'IN_PROGRESS' as const,
  },
  {
    id: '3',
    title: 'Ticket 3',
    content: 'Content 3',
    status: 'DONE' as const,
  },
  {
    id: '4',
    title: 'Ticket 4',
    content: 'Content 4',
    status: 'IN_PROGRESS' as const,
  },
  {
    id: '5',
    title: 'Ticket 5',
    content: 'Content 5',
    status: 'DONE' as const,
  },
  {
    id: '6',
    title: 'Ticket 6',
    content: 'Content 6',
    status: 'OPEN' as const,
  },
];

const TicketsPage = () => {
  return (
    <div className='container mx-auto flex-1 space-y-10 p-5'>
      <div>
        <h1 className='text-4xl font-semibold tracking-tighter'>Tickets</h1>
        <p className='text-muted-foreground'>Todos os seus tickets</p>
      </div>

      <div className='border-border border-b pb-5 text-xs'>
        6 <span className='text-muted-foreground/60'>Tickets encontrados</span>
      </div>

      <div className='animate-fade-from-top grid h-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {initialTickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
