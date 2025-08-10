'use client';

import { useActionState } from 'react';

import { Loader2Icon, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { ACTION_STATE } from '@/constants/action-state';
import { useFeedbackState } from '@/hooks/use-feedback-state';

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

  useFeedbackState(state, {
    onSuccess: () => {
      toast.success(state.message);
    },
    onError: () => {
      toast.error(state.message);
    },
  });

  return (
    <form action={formAction}>
      <Button
        type='submit'
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
