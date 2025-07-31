import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageTitle } from '@/components/shared/page-title';
import { ticketsPath } from '@/utils/paths';

import { getTicket } from './actions/get-ticket';
import { CommentCreateForm } from './components/comment-create-form';
import { TicketComments } from './components/ticket-comments';
import { TicketContent } from './components/ticket-content';
import { DeleteButton } from './components/ticket-delete-button';
import { TicketDropdown } from './components/ticket-dropdown';

export const metadata: Metadata = {
  title: 'Ticket',
};

type TicketPageParams = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TicketPageParams) => {
  const { ticketId } = await params;

  const ticket = await getTicket(ticketId);

  if (!ticket) notFound();

  const breadcrumbs = [
    {
      title: 'Tickets',
      href: ticketsPath(),
    },
    {
      title: ticket.title,
    },
  ];

  return (
    <main className='mx-auto w-full max-w-5xl space-y-10'>
      <PageTitle title='Ticket' breadcrumbs={breadcrumbs} />

      <div className='mx-auto w-full space-y-10'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold md:text-3xl'>{ticket.title}</h1>

          <TicketDropdown ticketId={ticketId} />
        </div>

        <TicketContent ticket={ticket} />

        <div className='flex items-center justify-end'>
          <DeleteButton ticketId={ticketId} />
        </div>
      </div>

      <h3 className='border-border border-b pb-2 text-xl font-semibold'>
        Comentários
      </h3>
      <CommentCreateForm ticketId={ticketId} />
      <TicketComments ticketId={ticketId} />
    </main>
  );
};

export default TicketPage;
