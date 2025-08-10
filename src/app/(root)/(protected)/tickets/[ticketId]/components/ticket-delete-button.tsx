'use client';

import { Button } from '@/components/ui/button';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { ticketsPath } from '@/utils/paths';

import { deleteTicket } from '../actions/delete-ticket';

type DeleteButtonProps = {
  ticketId: string;
};

export const TicketDeleteButton = ({ ticketId }: DeleteButtonProps) => {
  const [dialogTrigger, dialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticketId),
    onSuccessRedirect: ticketsPath(),
    trigger: (
      <Button
        aria-label='Excluir ticket'
        title='Excluir ticket'
        className='text-destructive hover:bg-destructive/10 w-full justify-start bg-transparent p-2'
      >
        Excluir
      </Button>
    ),
  });

  return (
    <>
      {dialogTrigger}
      {dialog}
    </>
  );
};
