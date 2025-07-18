import { Metadata } from 'next';
import Link from 'next/link';

import { TicketIcon } from 'lucide-react';

import { EmptyError } from '@/components/shared/empty-error';
import { Button } from '@/components/ui/button';
import { ticketsPath } from '@/utils/paths';

export const metadata: Metadata = {
  title: 'Ticket não encontrado',
};

const NotFound = () => {
  return (
    <EmptyError
      label='Ticket não encontrado!'
      button={
        <Button asChild>
          <Link href={ticketsPath()}>
            <TicketIcon /> Voltar para Tickets
          </Link>
        </Button>
      }
    />
  );
};

export default NotFound;
