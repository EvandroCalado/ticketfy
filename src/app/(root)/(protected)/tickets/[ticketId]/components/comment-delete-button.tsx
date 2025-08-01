'use client';

import { TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';

import { deleteComment } from '../actions/delete-comment';

type CommentDeleteButtonProps = {
  commentId: string;
};

export const CommentDeleteButton = ({
  commentId,
}: CommentDeleteButtonProps) => {
  const [trigger, dialog] = useConfirmDialog({
    action: deleteComment.bind(null, commentId),
    trigger: (
      <Button variant='destructive' size='icon'>
        <TrashIcon />
      </Button>
    ),
  });

  return (
    <>
      {trigger}
      {dialog}
    </>
  );
};
