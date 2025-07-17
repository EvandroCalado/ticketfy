'use client';

import { useActionState } from 'react';

import { FileUpIcon, Loader2Icon } from 'lucide-react';

import { DatePicker } from '@/components/shared/date-picker';
import { Form } from '@/components/shared/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatErrorMessage } from '@/utils/format-error-message';

import { createTicket } from '../actions/create-ticket';
import { CREATE_TICKET_STATE } from '../constants/initial-create-state';

export const TicketCreateForm = () => {
  const [state, dispatch, isPending] = useActionState(
    createTicket,
    CREATE_TICKET_STATE,
  );

  const { fieldErrors, payload } = state;

  return (
    <Form state={state} action={dispatch}>
      <div className='relative'>
        <Label htmlFor='title' className='text-muted-foreground mb-2'>
          Título
        </Label>
        <Input
          id='title'
          name='title'
          placeholder='Título do ticket'
          defaultValue={(payload?.get('title') as string) || ''}
        />

        {fieldErrors?.title && (
          <p className='text-destructive absolute -bottom-5 text-xs'>
            {formatErrorMessage(fieldErrors.title)}
          </p>
        )}
      </div>

      <div className='relative'>
        <Label htmlFor='content' className='text-muted-foreground mb-2'>
          Conteúdo
        </Label>
        <Textarea
          id='content'
          name='content'
          className='min-h-48'
          placeholder='Conteúdo do ticket'
          defaultValue={(payload?.get('content') as string) || ''}
        />

        {fieldErrors?.content && (
          <p className='text-destructive absolute -bottom-5 text-xs'>
            {formatErrorMessage(fieldErrors.content)}
          </p>
        )}
      </div>

      <div className='flex items-center gap-5'>
        <div className='relative w-full'>
          <Label htmlFor='deadline' className='text-muted-foreground mb-2'>
            Prazo
          </Label>
          <DatePicker
            id='deadline'
            name='deadline'
            defaultValue={(payload?.get('deadline') as string) || ''}
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
            defaultValue={(payload?.get('bounty') as string) || ''}
          />

          {fieldErrors?.bounty && (
            <p className='text-destructive absolute -bottom-5 text-xs'>
              {formatErrorMessage(fieldErrors.bounty)}
            </p>
          )}
        </div>
      </div>

      <Button type='submit' disabled={isPending} className='mt-4 w-full'>
        {isPending ? <Loader2Icon className='animate-spin' /> : <FileUpIcon />}
        {isPending ? 'Criando...' : 'Criar'}
      </Button>
    </Form>
  );
};
