'use client';

import { useActionState } from 'react';

import { Loader2Icon, TrashIcon } from 'lucide-react';

import { Form } from '@/components/shared/form';
import { Button } from '@/components/ui/button';
import { INITIAL_ACTION_STATE } from '@/constants/initial-create-state';

import { deleteComment } from '../actions/delete-comment';

type CommentDeleteButtonProps = {
  commentId: string;
};

export const CommentDeleteButton = ({
  commentId,
}: CommentDeleteButtonProps) => {
  const [state, dispatch, isPending] = useActionState(
    deleteComment.bind(null, commentId),
    INITIAL_ACTION_STATE,
  );

  return (
    <Form state={state} action={dispatch}>
      <Button
        type='submit'
        variant='destructive'
        size='icon'
        disabled={isPending}
      >
        {isPending ? <Loader2Icon className='animate-spin' /> : <TrashIcon />}
      </Button>
    </Form>
  );
};
