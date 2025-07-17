import Link from 'next/link';

import { FileSymlinkIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
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
    <Card className='p-4'>
      <CardHeader className='px-0'>
        <CardTitle className='flex items-center gap-2'>
          {TICKET_ICONS[ticket.status]}

          <span className='text-xl'>{ticket.title}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className='grow px-0'>
        <div className='flex h-full flex-col justify-between'>
          <span className='text-muted-foreground line-clamp-2'>
            {ticket.content}
          </span>

          <div className='text-muted-foreground/40 mt-4 flex items-center justify-between text-sm font-semibold'>
            <span>{formatDate(ticket.deadline)}</span>
            <span>{formatCurrency(ticket.bounty)}</span>
          </div>
        </div>
      </CardContent>

      <div className='border-border flex items-center justify-between border-t px-0 pt-3'>
        {TICKET_STATUS[ticket.status]}

        <Button asChild size='icon' aria-label='Ver ticket' title='Ver ticket'>
          <Link href={`/ticket/${ticket.id}`}>
            <FileSymlinkIcon />
          </Link>
        </Button>
      </div>
    </Card>
  );
};
