'use client';

import { Button } from '@/components/ui/button';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { TrashIcon } from '@/icons';
import { ticketPath } from '@/utils/paths';

import { deleteComment } from '../actions/delete-comment';

type CommentDeleteButtonProps = {
  ticketId: string;
  commentId: string;
};

export const CommentDeleteButton = ({
  ticketId,
  commentId,
}: CommentDeleteButtonProps) => {
  const [dialogTrigger, dialog] = useConfirmDialog({
    action: deleteComment.bind(null, commentId),
    onSuccessRedirect: ticketPath(ticketId),
    trigger: (
      <Button
        type='button'
        size='icon'
        variant='destructive'
        aria-label='Apagar comentário'
        title='Apagar comentário'
      >
        <TrashIcon />
      </Button>
    ),
  });

  return (
    <>
      {dialogTrigger}
      {dialog}
    </>
  );
};
