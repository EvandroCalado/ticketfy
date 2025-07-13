import Link from 'next/link';

import { MessageSquareWarningIcon, TicketIcon } from 'lucide-react';

import { EmptyError } from '@/components/shared/empty-error';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <EmptyError
      label='Ticket não encontrado!'
      icon={MessageSquareWarningIcon}
      button={
        <Button asChild>
          <Link href='/tickets'>
            <TicketIcon /> Voltar para Tickets
          </Link>
        </Button>
      }
    />
  );
};

export default NotFound;
