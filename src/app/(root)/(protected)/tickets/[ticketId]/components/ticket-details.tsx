import { notFound } from 'next/navigation';

import { SearchParams } from 'nuqs';

import { getAuth } from '@/actions/get-auth';
import { PageTitle } from '@/components/shared/page-title';
import { ticketsPath } from '@/utils/paths';

import { getComments } from '../actions/get-comments';
import { getTicket } from '../actions/get-ticket';
import { TicketComments } from './ticket-comments';
import { TicketContent } from './ticket-content';
import { TicketDropdown } from './ticket-dropdown';

type TicketDetailsProps = {
  ticketId: string;
  parsedSearchParams: SearchParams;
};

export const TicketDetails = async ({
  ticketId,
  parsedSearchParams,
}: TicketDetailsProps) => {
  const { user } = await getAuth();

  const ticketPromise = getTicket(ticketId);
  const commentsPromise = getComments(ticketId, parsedSearchParams);

  const [ticket, paginatedComments] = await Promise.all([
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
    <div className='animate-fade-from-top space-y-10'>
      <PageTitle title='Ticket' breadcrumbs={breadcrumbs} />

      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold md:text-3xl'>{ticket.title}</h2>

        <TicketDropdown ticketId={ticketId} />
      </div>

      <TicketContent ticket={ticket} />

      <TicketComments
        ticketId={ticketId}
        paginatedComments={paginatedComments}
        user={user}
      />
    </div>
  );
};
