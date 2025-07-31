'use client';

import { useActionState } from 'react';

import { Form } from '@/components/shared/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { INITIAL_ACTION_STATE } from '@/constants/initial-create-state';
import { formatErrorMessage } from '@/utils/format-error-message';

import { createComment } from '../actions/create-comment';

type CommentCreateFormProps = {
  ticketId: string;
};

export const CommentCreateForm = ({ ticketId }: CommentCreateFormProps) => {
  const [state, dispatch, isPending] = useActionState(
    createComment.bind(null, ticketId),
    INITIAL_ACTION_STATE,
  );

  return (
    <Form className='flex flex-col items-end' state={state} action={dispatch}>
      <div className='relative w-full'>
        <Textarea
          name='content'
          placeholder='Deixe seu comentário...'
          disabled={isPending}
        />

        {state.fieldErrors?.content && (
          <p className='text-destructive absolute -bottom-5 text-xs'>
            {formatErrorMessage(state.fieldErrors.content)}
          </p>
        )}
      </div>

      <Button type='submit' disabled={isPending}>
        {isPending ? 'Enviando...' : 'Enviar'}
      </Button>
    </Form>
  );
};
