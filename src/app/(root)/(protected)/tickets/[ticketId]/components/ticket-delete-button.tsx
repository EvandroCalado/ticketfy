'use client';

import { useActionState } from 'react';

import { Form } from '@/components/shared/form';
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
import { INITIAL_ACTION_STATE } from '@/constants/initial-create-state';
import { ticketsPath } from '@/utils/paths';

import { deleteTicket } from '../actions/delete-ticket';

type DeleteButtonProps = {
  ticketId: string;
};

export const DeleteButton = ({ ticketId }: DeleteButtonProps) => {
  const [state, dispatch, isPending] = useActionState(
    deleteTicket,
    INITIAL_ACTION_STATE,
  );

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
          <Form state={state} action={dispatch} redirect={ticketsPath()}>
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
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
