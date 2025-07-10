import { TicketsList } from './components/tickets-list';

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
    <div className='container mx-auto flex flex-1 flex-col space-y-10 p-5'>
      <TicketsList tickets={initialTickets} />
    </div>
  );
};

export default TicketsPage;
