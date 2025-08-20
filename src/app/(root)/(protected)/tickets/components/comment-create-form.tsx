'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ACTION_STATE } from '@/constants/action-state';

import { createComment } from '../actions/create-comment';

type CommentCreateFormProps = {
  ticketId: string;
};

export const CommentCreateForm = ({ ticketId }: CommentCreateFormProps) => {
  const [state, formAction, isPending] = useActionState(
    createComment.bind(null, ticketId),
    ACTION_STATE,
  );

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.refresh();
    }

    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [router, state]);

  return (
    <form action={formAction} className='flex flex-col items-end gap-2'>
      <div className='relative w-full'>
        <Textarea id='content' name='content' />

        {state.fieldErrors?.content && (
          <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
            {state.fieldErrors.content}
          </span>
        )}
      </div>

      <Button type='submit' disabled={isPending} className='w-fit'>
        {isPending ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
};
