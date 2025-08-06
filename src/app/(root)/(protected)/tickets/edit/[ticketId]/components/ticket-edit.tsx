import { notFound } from 'next/navigation';

import { PageTitle } from '@/components/shared/page-title';
import { ticketPath, ticketsPath } from '@/utils/paths';

import { getTicket } from '../../../[ticketId]/actions/get-ticket';
import { TicketEditForm } from './ticket-edit-form';

type TicketEditPageProps = {
  ticketId: string;
};

export const TicketEdit = async ({ ticketId }: TicketEditPageProps) => {
  const ticket = await getTicket(ticketId);

  if (!ticket) notFound();

  const breadcrumbs = [
    {
      title: 'Tickets',
      href: ticketsPath(),
    },
    {
      title: 'Ticket',
      href: ticketPath(ticketId),
    },
    {
      title: ticket.title,
    },
  ];

  return (
    <div className='animate-fade-from-top'>
      <PageTitle title='Editar ticket' breadcrumbs={breadcrumbs} />
      <TicketEditForm ticket={ticket} className='space-y-10' />
    </div>
  );
};
