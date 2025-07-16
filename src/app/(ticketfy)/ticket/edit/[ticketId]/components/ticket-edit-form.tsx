'use client';

import { useActionState } from 'react';

import { FileUpIcon, Loader2Icon } from 'lucide-react';

import { Form } from '@/components/shared/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { CREATE_TICKET_STATE } from '../../../create/constants/initial-create-state';
import { updateTicket } from '../actions/update-ticket';
import { Ticket } from '/prisma/index';

type TicketEditFormProps = {
  ticket: Ticket;
};

export const TicketEditForm = ({ ticket }: TicketEditFormProps) => {
  const [state, dispatch, isPending] = useActionState(
    (_prevState: unknown, formData: FormData) =>
      updateTicket(ticket.id, formData),
    CREATE_TICKET_STATE,
  );

  return (
    <Form state={state} action={dispatch}>
      <div className='flex flex-col items-center gap-5 md:flex-row'>
        <div className='relative w-full'>
          <Label htmlFor='title' className='text-muted-foreground mb-2'>
            Título
          </Label>
          <Input
            id='title'
            name='title'
            placeholder='Título do ticket'
            defaultValue={ticket.title}
          />

          {state.fieldErrors?.title && (
            <p className='text-destructive absolute -bottom-5 text-xs'>
              {state.fieldErrors.title.join(', ')}
            </p>
          )}
        </div>

        <div className='relative w-full md:w-[180px]'>
          <Label className='text-muted-foreground mb-2'>Status</Label>
          <Select
            name='status'
            aria-label='Status do ticket'
            defaultValue={ticket.status}
          >
            <SelectTrigger className='w-full md:w-[180px]'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='OPEN'>Em aberto</SelectItem>
              <SelectItem value='IN_PROGRESS'>Em andamento</SelectItem>
              <SelectItem value='DONE'>Concluído</SelectItem>
            </SelectContent>
          </Select>

          {state.fieldErrors?.status && (
            <p className='text-destructive absolute -bottom-5 text-xs'>
              {state.fieldErrors.status.join(', ')}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor='content' className='text-muted-foreground mb-2'>
          Conteúdo
        </Label>
        <Textarea
          id='content'
          name='content'
          className='min-h-48'
          placeholder='Conteúdo do ticket'
          defaultValue={ticket.content}
        />
      </div>

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? <Loader2Icon className='animate-spin' /> : <FileUpIcon />}
        {isPending ? 'Atualizando...' : 'Atualizar'}
      </Button>
    </Form>
  );
};
