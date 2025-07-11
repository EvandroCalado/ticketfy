import { notFound } from 'next/navigation';

import { getTicket } from '../actions/get-ticket';

type TicketPageParams = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TicketPageParams) => {
  const { ticketId } = await params;

  const ticket = await getTicket(ticketId);

  if (!ticket) notFound();

  return (
    <div className='container mx-auto flex-1 p-5'>
      <h1>{ticket.title}</h1>
    </div>
  );
};

export default TicketPage;
