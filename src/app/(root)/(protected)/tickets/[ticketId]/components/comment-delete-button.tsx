'use client';

import { useActionState, useEffect } from 'react';

import { Loader2Icon, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { ACTION_STATE } from '@/constants/action-state';

import { deleteComment } from '../actions/delete-comment';

type CommentDeleteButtonProps = {
  commentId: string;
};

export const CommentDeleteButton = ({
  commentId,
}: CommentDeleteButtonProps) => {
  const [state, formAction, isPending] = useActionState(
    deleteComment.bind(null, commentId),
    ACTION_STATE,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }

    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state.message, state.success]);

  return (
    <form action={formAction}>
      <Button
        variant='destructive'
        size='icon'
        disabled={isPending}
        title='Apagar comentário'
        aria-label='Apagar comentário'
      >
        {isPending ? <Loader2Icon className='animate-spin' /> : <TrashIcon />}
      </Button>
    </form>
  );
};
