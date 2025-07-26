import Link from 'next/link';

import { EllipsisVerticalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ticketEditPath } from '@/utils/paths';

type TicketDropdownProps = {
  ticketId: string;
};

export const TicketDropdown = ({ ticketId }: TicketDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
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
            Editar
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
