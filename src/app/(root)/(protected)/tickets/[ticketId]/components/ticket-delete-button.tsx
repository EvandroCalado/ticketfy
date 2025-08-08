'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { Form } from '@/components/ui/form';
import { ticketsPath } from '@/utils/paths';

import { deleteTicket } from '../actions/delete-ticket';
import {
  DeleteTicketSchema,
  deleteTicketSchema,
} from '../schemas/delete-ticket';

type DeleteButtonProps = {
  ticketId: string;
};

export const DeleteButton = ({ ticketId }: DeleteButtonProps) => {
  const router = useRouter();

  const form = useForm<DeleteTicketSchema>({
    resolver: zodResolver(deleteTicketSchema),
    defaultValues: {
      ticketId,
    },
    mode: 'onChange',
  });

  const onsubmit = async (data: DeleteTicketSchema) => {
    const result = await deleteTicket(data.ticketId);

    if (result.success) {
      toast.success(result.message);
    }

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    router.push(ticketsPath());
  };

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}>
              <input type='hidden' name='ticketId' value={ticketId} />

              <Button
                type='submit'
                variant='destructive'
                disabled={form.formState.isSubmitting}
                title='Excluir ticket'
                aria-label='Excluir ticket'
              >
                {form.formState.isSubmitting ? 'Excluindo...' : 'Confirmar'}
              </Button>
            </form>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
