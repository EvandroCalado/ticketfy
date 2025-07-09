import Link from 'next/link';

import { MessageSquareWarningIcon, TicketIcon } from 'lucide-react';

import { TicketListEmpty } from '@/components/ticket/ticket-list-empty';
import { Button } from '@/components/ui/button';

type TicketPageParams = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TicketPageParams) => {
  const ticket = [];

  if (!ticket.length) {
    return (
      <TicketListEmpty
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

  const { ticketId } = await params;

  console.log(ticketId);

  return (
    <div className='container mx-auto p-5'>
      <h1>TicketPage</h1>
    </div>
  );
};

export default TicketPage;
