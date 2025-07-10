import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { TICKET_ICONS } from '../constants/ticket-icons';
import { TICKET_STATUS } from '../constants/ticket-status';
import { Ticket } from '../types/ticket';

type TicketCardProps = {
  ticket: Ticket;
};

export const TicketCard = ({ ticket }: TicketCardProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className='text-xl'>{ticket.title}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <span className='text-muted-foreground'>{ticket.content}</span>
        </CardContent>

        <div className='border-border mx-5 flex items-center justify-between border-t p-0 pt-3'>
          <span className='text-primary text-sm'>
            {TICKET_STATUS[ticket.status]}
          </span>

          <Button asChild size='sm'>
            <Link href={`/ticket/${ticket.id}`}>Ver mais</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};
