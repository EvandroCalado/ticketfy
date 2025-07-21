import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';

import { TICKET_ICONS } from '../constants/ticket-icons';
import { TICKET_STATUS } from '../constants/ticket-status';
import { Prisma } from '/prisma/index';

type TicketCardProps = {
  ticket: Prisma.TicketGetPayload<{ include: { user: true } }>;
};

export const TicketCard = ({ ticket }: TicketCardProps) => {
  return (
    <Link
      href={`/ticket/${ticket.id}`}
      className='duration-150 ease-in-out hover:-translate-y-2'
    >
      <Card className='min-h-[229px] p-4'>
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

        <div className='border-border border-t px-0 pt-3'>
          <div className='flex items-center justify-between gap-2'>
            {TICKET_STATUS[ticket.status]}
            <span className='text-xs'>{formatDate(ticket.deadline)}</span>
          </div>

          <div className='flex items-center justify-between gap-2'>
            <span className='text-primary text-xs font-semibold'>
              {ticket.user.name}
            </span>
            <span className='text-lg font-bold'>
              {formatCurrency(ticket.bounty)}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
