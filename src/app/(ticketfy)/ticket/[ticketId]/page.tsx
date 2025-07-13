import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  CalendarIcon,
  EditIcon,
  MoveLeftIcon,
  SquareCheckBigIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ticketEditPath, ticketsPath } from '@/utils/paths';

import { TICKET_STATUS } from '../../tickets/constants/ticket-status';
import { getTicket } from './actions/get-ticket';
import { DeleteButton } from './components/delete-button';

type TicketPageParams = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TicketPageParams) => {
  const { ticketId } = await params;

  const ticket = await getTicket(ticketId);

  if (!ticket) notFound();

  return (
    <div className='container mx-auto max-w-4xl flex-1 space-y-10 p-5'>
      <h1 className='text-xl font-semibold md:text-3xl'>{ticket.title}</h1>

      <p className='text-muted-foreground text-sm md:text-base'>
        {ticket.content}
      </p>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <div
            className='text-muted-foreground flex items-center gap-2'
            aria-label='Status do ticket'
            title='Status do ticket'
          >
            <SquareCheckBigIcon className='size-5' />

            {TICKET_STATUS[ticket.status]}
          </div>

          <DeleteButton ticketId={ticketId} />
        </div>

        <div className='flex items-center justify-between'>
          <div
            className='text-muted-foreground flex items-center gap-2'
            aria-label='Data de criação do ticket'
            title='Data de criação do ticket'
          >
            <span className='font-semibold'>
              <CalendarIcon className='size-5' />
            </span>

            {ticket.createdAt.toLocaleDateString('pt-BR', {
              dateStyle: 'long',
            })}
          </div>

          <Button
            asChild
            variant='outline'
            size='icon'
            aria-label='Editar ticket'
            title='Editar ticket'
          >
            <Link href={ticketEditPath(ticketId)}>
              <EditIcon />
            </Link>
          </Button>
        </div>
      </div>

      <Button
        asChild
        variant='outline'
        aria-label='Voltar para tickets'
        title='Voltar para tickets'
      >
        <Link href={ticketsPath()}>
          <MoveLeftIcon /> Voltar
        </Link>
      </Button>
    </div>
  );
};

export default TicketPage;
