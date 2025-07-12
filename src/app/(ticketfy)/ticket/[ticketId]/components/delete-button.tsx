'use client';

import { useTransition } from 'react';

import { TrashIcon } from 'lucide-react';

import { Spinner } from '@/components/shared/spinner';
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
        <Button aria-label='Excluir ticket' title='Excluir ticket'>
          <TrashIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza?</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Esta será permanentemente excluída
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            aria-label='Excluir ticket'
            title='Excluir ticket'
            disabled={isPending}
            onClick={() => startTransition(() => deleteTicket(ticketId))}
          >
            {isPending && <Spinner size='4' />}
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
