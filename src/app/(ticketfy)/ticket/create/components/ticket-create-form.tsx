'use client';

import { useActionState } from 'react';

import { Loader2Icon, SaveAllIcon } from 'lucide-react';

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

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? <Loader2Icon className='animate-spin' /> : <SaveAllIcon />}
        {isPending ? 'Criando...' : 'Criar'}
      </Button>
    </Form>
  );
};
