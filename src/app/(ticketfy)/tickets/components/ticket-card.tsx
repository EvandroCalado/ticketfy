import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        <span className='text-muted-foreground line-clamp-3'>
          {ticket.content}
        </span>
      </CardContent>

      <div className='border-border flex items-center justify-between border-t px-0 pt-3'>
        {TICKET_STATUS[ticket.status]}

        <Button asChild size='sm'>
          <Link href={`/ticket/${ticket.id}`}>Ver mais</Link>
        </Button>
      </div>
    </Card>
  );
};
