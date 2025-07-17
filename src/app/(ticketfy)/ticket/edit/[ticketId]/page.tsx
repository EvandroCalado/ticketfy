import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { MoveLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ticketPath } from '@/utils/paths';

import { getTicket } from '../../[ticketId]/actions/get-ticket';
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

  return (
    <main className='container mx-auto max-w-4xl flex-1 space-y-10 p-5'>
      <h1 className='text-xl font-semibold md:text-3xl'>Editar ticket</h1>

      <TicketEditForm ticket={ticket} />

      <Button
        asChild
        variant='outline'
        aria-label='Voltar para tickets'
        title='Voltar para tickets'
      >
        <Link href={ticketPath(ticketId)}>
          <MoveLeftIcon /> Voltar
        </Link>
      </Button>
    </main>
  );
};

export default TicketEditPage;
