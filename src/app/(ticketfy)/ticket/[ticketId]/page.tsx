import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  CalendarCheckIcon,
  CalendarIcon,
  CreditCardIcon,
  FilePenIcon,
  MoveLeftIcon,
  SquareCheckBigIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
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

      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <div
            className='text-muted-foreground flex items-center gap-2'
            aria-label='Status do ticket'
            title='Status do ticket'
          >
            <SquareCheckBigIcon className='size-5' />

            {TICKET_STATUS[ticket.status]}
          </div>
        </div>

        <div className='text-muted-foreground flex flex-col justify-between gap-6 sm:flex-row sm:items-center'>
          <div
            className='flex items-center gap-2'
            aria-label='Data de criação do ticket'
            title='Data de criação do ticket'
          >
            <CalendarIcon className='size-5' />

            {formatDate(ticket.createdAt.toString())}
          </div>

          <div
            className='flex items-center gap-2'
            aria-label='Data de prazo do ticket'
            title='Data de prazo do ticket'
          >
            <CalendarCheckIcon className='size-5' />
            {formatDate(ticket.deadline.toString())}
          </div>
        </div>

        <div className='flex flex-col justify-between gap-6 sm:flex-row sm:items-center'>
          <span
            className='text-muted-foreground flex items-center gap-2 font-semibold'
            aria-label='Bônus do ticket'
            title='Bônus do ticket'
          >
            <CreditCardIcon className='size-5' />
            {formatCurrency(ticket.bounty)}
          </span>

          <div
            className='flex items-center gap-2'
            aria-label='Ações do ticket'
            title='Ações do ticket'
          >
            <Button
              asChild
              variant='outline'
              aria-label='Editar ticket'
              title='Editar ticket'
              className='w-24'
            >
              <Link href={ticketEditPath(ticketId)}>
                <FilePenIcon /> Editar
              </Link>
            </Button>

            <DeleteButton ticketId={ticketId} />
          </div>
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
