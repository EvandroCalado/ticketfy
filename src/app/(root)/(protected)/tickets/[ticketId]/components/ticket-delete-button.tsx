'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { toast } from 'sonner';

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
import { ACTION_STATE } from '@/constants/action-state';
import { ticketsPath } from '@/utils/paths';

import { deleteTicket } from '../actions/delete-ticket';

type DeleteButtonProps = {
  ticketId: string;
};

export const DeleteButton = ({ ticketId }: DeleteButtonProps) => {
  const [state, formAction, isPending] = useActionState(
    deleteTicket.bind(null, ticketId),
    ACTION_STATE,
  );

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push(ticketsPath());
    }

    if (!state.success && state.message) {
      toast.error(state.message);
      router.refresh();
    }
  }, [router, state.message, state.success]);

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
          <form action={formAction}>
            <input type='hidden' name='ticketId' value={ticketId} />

            <Button
              type='submit'
              variant='destructive'
              disabled={isPending}
              title='Excluir ticket'
              aria-label='Excluir ticket'
            >
              {isPending ? 'Excluindo...' : 'Confirmar'}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
