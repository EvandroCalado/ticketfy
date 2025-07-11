import Link from 'next/link';

import { MessageSquareWarningIcon, TicketIcon } from 'lucide-react';

import { EmptyError } from '@/components/shared/empty-error';
import { Button } from '@/components/ui/button';

import { getTicket } from '../actions/get-ticket';

type TicketPageParams = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TicketPageParams) => {
  const { ticketId } = await params;

  const ticket = await getTicket(ticketId);

  if (!ticket) {
    return (
      <EmptyError
        label='Ticket não encontrado!'
        icon={MessageSquareWarningIcon}
        button={
          <Button asChild>
            <Link href='/tickets'>
              <TicketIcon /> Voltar para Tickets
            </Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className='container mx-auto flex-1 p-5'>
      <h1>{ticket.title}</h1>
    </div>
  );
};

export default TicketPage;
