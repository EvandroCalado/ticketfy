import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageTitle } from '@/components/shared/page-title';
import { ticketPath, ticketsPath } from '@/utils/paths';

import { getTicket } from '../../../ticket/[ticketId]/actions/get-ticket';
import { TicketEditForm } from './components/ticket-edit-form';

export const metadata: Metadata = {
  title: 'Editar ticket',
};

type TicketEditPageParams = {
  params: Promise<{ ticketId: string }>;
};

const TicketEditPage = async ({ params }: TicketEditPageParams) => {
  const { ticketId } = await params;

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
    <main className='space-y-10'>
      <PageTitle title='Editar ticket' breadcrumbs={breadcrumbs} />
      <TicketEditForm
        ticket={ticket}
        className='mx-auto w-full max-w-3xl space-y-10 p-5'
      />
    </main>
  );
};

export default TicketEditPage;
