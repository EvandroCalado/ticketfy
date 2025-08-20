import Link from 'next/link';

import {
  LazyDropdownMenu as DropdownMenu,
  LazyDropdownMenuContent as DropdownMenuContent,
  LazyDropdownMenuItem as DropdownMenuItem,
  LazyDropdownMenuLabel as DropdownMenuLabel,
  LazyDropdownMenuSeparator as DropdownMenuSeparator,
  LazyDropdownMenuTrigger as DropdownMenuTrigger,
} from '@/components/shared/lazy-dropdown-menu';
import { Button } from '@/components/ui/button';
import { EllipsisVerticalIcon } from '@/icons';
import { ticketEditPath } from '@/utils/paths';

import { TicketDeleteButton } from './ticket-delete-button';

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
        <DropdownMenuItem asChild>
          <TicketDeleteButton ticketId={ticketId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
