import { notFound } from 'next/navigation';

import { PageTitle } from '@/components/shared/page-title';
import { ticketsPath } from '@/utils/paths';

import { getComments } from '../actions/get-comments';
import { getTicket } from '../actions/get-ticket';
import { CommentCreateForm } from './comment-create-form';
import { TicketComments } from './ticket-comments';
import { TicketContent } from './ticket-content';
import { DeleteButton } from './ticket-delete-button';
import { TicketDropdown } from './ticket-dropdown';

type TicketDetailsProps = {
  ticketId: string;
};

export const TicketDetails = async ({ ticketId }: TicketDetailsProps) => {
  const ticketPromise = getTicket(ticketId);
  const commentsPromise = getComments(ticketId);

  const [ticket, comments] = await Promise.all([
    ticketPromise,
    commentsPromise,
  ]);

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
    <div className='animate-fade-from-top space-y-4'>
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
      <TicketComments comments={comments} />
    </div>
  );
};
