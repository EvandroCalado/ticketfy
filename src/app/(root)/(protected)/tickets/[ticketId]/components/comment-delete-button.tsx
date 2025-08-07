'use client';

import { useTransition } from 'react';

import { Loader2Icon, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { INITIAL_ACTION_STATE } from '@/constants/initial-create-state';

import { deleteComment } from '../actions/delete-comment';

type CommentDeleteButtonProps = {
  commentId: string;
  onDelete: (commentId: string) => void;
};

export const CommentDeleteButton = ({
  commentId,
  onDelete,
}: CommentDeleteButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteComment = () => {
    startTransition(async () => {
      const result = await deleteComment(
        commentId,
        INITIAL_ACTION_STATE,
        new FormData(),
      );
      if (result.status === 'success' && result.message) {
        toast.success(result.message);
      }

      if (result.status === 'error' && result.message) {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      variant='destructive'
      size='icon'
      disabled={isPending}
      onClick={() => {
        handleDeleteComment();
        onDelete(commentId);
      }}
    >
      {isPending ? <Loader2Icon className='animate-spin' /> : <TrashIcon />}
    </Button>
  );
};
