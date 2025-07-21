'use client';

import { useActionState } from 'react';

import { TICKET_STATUS } from '@/app/(root)/tickets/constants/ticket-status';
import { DatePicker } from '@/components/shared/date-picker';
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
import { fromCent } from '@/utils/format-currency';
import { formatErrorMessage } from '@/utils/format-error-message';

import { INITIAL_ACTION_STATE } from '../../../../../../constants/initial-create-state';
import { updateTicket } from '../actions/update-ticket';
import { Ticket } from '/prisma/index';

type TicketEditFormProps = {
  ticket: Ticket;
};

export const TicketEditForm = ({ ticket }: TicketEditFormProps) => {
  const [state, dispatch, isPending] = useActionState(
    (_prevState: unknown, formData: FormData) =>
      updateTicket(ticket.id, formData),
    INITIAL_ACTION_STATE,
  );

  const { fieldErrors } = state;

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

          {fieldErrors?.title && (
            <p className='text-destructive absolute -bottom-5 text-xs'>
              {formatErrorMessage(fieldErrors.title)}
            </p>
          )}
        </div>

        <div className='relative w-full md:w-[180px]'>
          <Label className='text-muted-foreground mb-2'>Status</Label>
          <Select name='status' defaultValue={ticket.status}>
            <SelectTrigger
              className='w-full md:w-[180px]'
              aria-label='Status do ticket'
              title='Status do ticket'
            >
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(TICKET_STATUS).map(status => (
                <SelectItem key={status} value={status}>
                  {TICKET_STATUS[status as keyof typeof TICKET_STATUS]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {fieldErrors?.status && (
            <p className='text-destructive absolute -bottom-5 text-xs'>
              {formatErrorMessage(fieldErrors.status)}
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

      <div className='flex items-center gap-5'>
        <div className='relative w-full'>
          <Label htmlFor='deadline' className='text-muted-foreground mb-2'>
            Prazo
          </Label>
          <DatePicker
            id='deadline'
            name='deadline'
            defaultValue={ticket.deadline}
          />

          {fieldErrors?.deadline && (
            <p className='text-destructive absolute -bottom-5 text-xs'>
              {formatErrorMessage(fieldErrors.deadline)}
            </p>
          )}
        </div>

        <div className='relative w-full'>
          <Label htmlFor='bounty' className='text-muted-foreground mb-2'>
            Bônus(R$)
          </Label>
          <Input
            id='bounty'
            name='bounty'
            type='number'
            placeholder='Bônus do ticket'
            defaultValue={fromCent(ticket.bounty)}
          />

          {fieldErrors?.bounty && (
            <p className='text-destructive absolute -bottom-5 text-xs'>
              {formatErrorMessage(fieldErrors.bounty)}
            </p>
          )}
        </div>
      </div>

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? 'Atualizando...' : 'Atualizar'}
      </Button>
    </Form>
  );
};
