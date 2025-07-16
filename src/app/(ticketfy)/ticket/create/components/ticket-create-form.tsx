'use client';

import { useActionState } from 'react';

import { FileUpIcon, Loader2Icon } from 'lucide-react';

import { Form } from '@/components/shared/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { createTicket } from '../actions/create-ticket';
import { CREATE_TICKET_STATE } from '../constants/initial-create-state';

export const TicketCreateForm = () => {
  const [state, dispatch, isPending] = useActionState(
    createTicket,
    CREATE_TICKET_STATE,
  );

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
          defaultValue={(state.payload?.get('title') as string) || ''}
        />

        {state.fieldErrors?.title && (
          <p className='text-destructive absolute -bottom-5 text-xs'>
            {state.fieldErrors.title.join(', ')}
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
          defaultValue={(state.payload?.get('content') as string) || ''}
        />

        {state.fieldErrors?.content && (
          <p className='text-destructive absolute -bottom-5 text-xs'>
            {state.fieldErrors.content.join(', ')}
          </p>
        )}
      </div>

      <div className='flex items-center gap-5'>
        <div className='relative w-full'>
          <Label htmlFor='deadline' className='text-muted-foreground mb-2'>
            Prazo
          </Label>
          <Input
            id='deadline'
            name='deadline'
            type='date'
            placeholder='Prazo do ticket'
            defaultValue={(state.payload?.get('deadline') as string) || ''}
          />

          {state.fieldErrors?.deadline && (
            <p className='text-destructive absolute -bottom-5 text-xs'>
              {state.fieldErrors.deadline.join(', ')}
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
            defaultValue={(state.payload?.get('bounty') as string) || ''}
          />

          {state.fieldErrors?.bounty && (
            <p className='text-destructive absolute -bottom-5 text-xs'>
              {state.fieldErrors.bounty.join(', ')}
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
