'use client';

import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

import { toast } from 'sonner';

import { SubmitButton } from '@/components/shared/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ticketsPath } from '@/utils/paths';

import { createTicket } from '../actions/create-ticket';
import { CREATE_TICKET_STATE } from '../constants/initial-create-state';
import { useStateFeedback } from '../hooks/use-state-feedback';

export const TicketCreateForm = () => {
  const [state, dispatch] = useActionState(createTicket, CREATE_TICKET_STATE);

  const router = useRouter();

  useStateFeedback(state, {
    onSuccess: ({ state }) => {
      toast.success(state.message);
      router.push(ticketsPath());
    },
    onError: ({ state }) => {
      toast.error(state.message);
    },
  });

  return (
    <form className='space-y-6' action={dispatch}>
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

      <SubmitButton />
    </form>
  );
};
