import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  CalendarCheckIcon,
  CalendarIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FilePenIcon,
  MoveLeftIcon,
  SquareCheckBigIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { ticketEditPath, ticketsPath } from '@/utils/paths';

import { TICKET_STATUS } from '../../tickets/constants/ticket-status';
import { getTicket } from './actions/get-ticket';
import { DeleteButton } from './components/delete-button';

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

  return (
    <div className='container mx-auto max-w-4xl flex-1 space-y-10 p-5'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold md:text-3xl'>{ticket.title}</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              aria-label='Opções'
              title='Opções'
            >
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={ticketEditPath(ticketId)}
                aria-label='Editar'
                title='Editar'
              >
                <FilePenIcon /> Editar
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className='text-muted-foreground text-sm md:text-base'>
        {ticket.content}
      </p>

      <div className='flex flex-col gap-6'>
        <div
          className='text-muted-foreground flex items-center gap-2'
          aria-label='Status do ticket'
          title='Status do ticket'
        >
          <SquareCheckBigIcon className='size-5' />

          {TICKET_STATUS[ticket.status]}
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

        <span
          className='text-muted-foreground flex items-center gap-2 font-semibold'
          aria-label='Bônus do ticket'
          title='Bônus do ticket'
        >
          <CreditCardIcon className='size-5' />
          {formatCurrency(ticket.bounty)}
        </span>
      </div>

      <div className='flex items-center justify-between gap-2'>
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

        <DeleteButton ticketId={ticketId} />
      </div>
    </div>
  );
};

export default TicketPage;
