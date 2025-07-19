import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';

import { TICKET_ICONS } from '../constants/ticket-icons';
import { TICKET_STATUS } from '../constants/ticket-status';
import { Ticket } from '/prisma/index';

type TicketCardProps = {
  ticket: Ticket;
};

export const TicketCard = ({ ticket }: TicketCardProps) => {
  return (
    <Link
      href={`/ticket/${ticket.id}`}
      className='duration-150 ease-in-out hover:-translate-y-2'
    >
      <Card className='p-4'>
        <CardHeader className='px-0'>
          <CardTitle className='flex items-center gap-2'>
            {TICKET_ICONS[ticket.status]}

            <span className='text-xl'>{ticket.title}</span>
          </CardTitle>
        </CardHeader>

        <CardContent className='grow px-0'>
          <span className='text-muted-foreground line-clamp-2'>
            {ticket.content}
          </span>
        </CardContent>

        <div className='border-border flex items-center justify-between border-t px-0 pt-3'>
          {TICKET_STATUS[ticket.status]}

          <div className='flex items-center gap-2'>
            <span className='text-xs'>{formatDate(ticket.deadline)}</span>
            <span className='text-primary text-lg font-semibold'>
              {formatCurrency(ticket.bounty)}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
