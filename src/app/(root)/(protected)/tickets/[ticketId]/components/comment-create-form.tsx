'use client';

import { useState, useTransition } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { INITIAL_ACTION_STATE } from '@/constants/initial-create-state';
import { formatErrorMessage } from '@/utils/format-error-message';

import { createComment } from '../actions/create-comment';

type CommentCreateFormProps = {
  ticketId: string;
};

export const CommentCreateForm = ({ ticketId }: CommentCreateFormProps) => {
  const [fieldErrors, setFieldErrors] = useState(
    INITIAL_ACTION_STATE.fieldErrors,
  );
  const [isPending, startTransition] = useTransition();

  const handleCreateComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await createComment(
        ticketId,
        INITIAL_ACTION_STATE,
        formData,
      );
      if (result.status === 'success' && result.message) {
        toast.success(result.message);
        form.reset();
      }

      if (result.status === 'error' && result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
      }

      if (result.status === 'error' && result.message) {
        toast.error(result.message);
      }
    });
  };

  return (
    <form
      className='flex flex-col items-end gap-2'
      onSubmit={handleCreateComment}
    >
      <div className='relative w-full'>
        <Textarea
          name='content'
          placeholder='Deixe seu comentário...'
          disabled={isPending}
        />

        {fieldErrors?.content && (
          <p className='text-destructive absolute -bottom-5 text-xs'>
            {formatErrorMessage(fieldErrors.content)}
          </p>
        )}
      </div>

      <Button type='submit' disabled={isPending} className='w-fit'>
        {isPending ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
};
