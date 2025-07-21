'use client';

import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { deleteTicket } from '../actions/delete-ticket';

type DeleteButtonProps = {
  ticketId: string;
};

export const DeleteButton = ({ ticketId }: DeleteButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='destructive'
          aria-label='Excluir ticket'
          title='Excluir ticket'
          className='w-24'
        >
          Excluir
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza?</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Este ticket será permanentemente
            excluído e não poderá ser recuperado.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant='destructive'
            aria-label='Excluir ticket'
            title='Excluir ticket'
            disabled={isPending}
            onClick={() => startTransition(() => deleteTicket(ticketId))}
          >
            {isPending ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
