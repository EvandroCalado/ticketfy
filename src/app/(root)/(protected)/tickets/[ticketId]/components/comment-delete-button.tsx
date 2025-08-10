'use client';

import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    deleteComment.bind(null, commentId),
    ACTION_STATE,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.refresh();
    }

    if (!state.success && state.message) {
      toast.error(state.message);
      router.refresh();
    }
  }, [state, router]);

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
