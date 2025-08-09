'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { Label } from '@radix-ui/react-label';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ACTION_STATE } from '@/constants/action-state';
import { ticketsPath } from '@/utils/paths';

import { createTicket } from '../actions/create-ticket';

export const TicketCreateForm = () => {
  const [state, formAction, isPending] = useActionState(
    createTicket,
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
    <form action={formAction} className='space-y-6'>
      <div className='relative'>
        <Label htmlFor='title' className='mb-1'>
          Título
        </Label>
        <Input
          id='title'
          type='text'
          name='title'
          defaultValue={(state.payload?.get('title') as string) || ''}
        />

        {state.fieldErrors?.title && (
          <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
            {state.fieldErrors.title}
          </span>
        )}
      </div>

      <div className='relative'>
        <Label htmlFor='content' className='mb-1'>
          Conteúdo
        </Label>
        <Textarea
          id='content'
          name='content'
          defaultValue={(state.payload?.get('content') as string) || ''}
        />

        {state.fieldErrors?.content && (
          <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
            {state.fieldErrors.content}
          </span>
        )}
      </div>

      <div className='flex items-center gap-4'>
        <div className='relative w-full'>
          <Label htmlFor='deadline' className='mb-1'>
            Data
          </Label>
          <Input
            id='deadline'
            type='date'
            name='deadline'
            defaultValue={(state.payload?.get('deadline') as string) || ''}
          />

          {state.fieldErrors?.deadline && (
            <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
              {state.fieldErrors.deadline}
            </span>
          )}
        </div>

        <div className='relative w-full'>
          <Label htmlFor='bounty' className='mb-1'>
            Bônus
          </Label>
          <Input
            id='bounty'
            type='number'
            name='bounty'
            defaultValue={(state.payload?.get('bounty') as string) || ''}
          />

          {state.fieldErrors?.bounty && (
            <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
              {state.fieldErrors.bounty}
            </span>
          )}
        </div>
      </div>

      <Button type='submit' disabled={isPending} className='mt-4 w-full'>
        {isPending ? 'Criando...' : 'Criar'}
      </Button>
    </form>
  );
};
