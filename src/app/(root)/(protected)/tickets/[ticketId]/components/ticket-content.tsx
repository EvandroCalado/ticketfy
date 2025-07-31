import {
  CalendarCheckIcon,
  CalendarIcon,
  CreditCardIcon,
  SquareCheckBigIcon,
} from 'lucide-react';

import { TICKET_STATUS } from '@/constants/ticket-status';
import { Ticket } from '@/generated/prisma';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';

type TicketContentProps = {
  ticket: Ticket;
};

export const TicketContent = ({ ticket }: TicketContentProps) => {
  return (
    <>
      <p className='text-muted-foreground text-sm md:text-base'>
        {ticket.content}
      </p>

      <div className='flex flex-col gap-2'>
        <div
          className='text-muted-foreground flex items-center gap-2'
          aria-label='Status do ticket'
          title='Status do ticket'
        >
          <SquareCheckBigIcon className='size-5' />

          {TICKET_STATUS[ticket.status]}
        </div>

        <div className='text-muted-foreground flex flex-col justify-between gap-6 text-sm sm:flex-row sm:items-center'>
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
    </>
  );
};
