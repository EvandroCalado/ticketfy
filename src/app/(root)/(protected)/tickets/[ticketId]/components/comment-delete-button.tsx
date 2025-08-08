'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { deleteComment } from '../actions/delete-comment';
import {
  DeleteCommentSchema,
  deleteCommentSchema,
} from '../schemas/delete-comment';

type CommentDeleteButtonProps = {
  commentId: string;
};

export const CommentDeleteButton = ({
  commentId,
}: CommentDeleteButtonProps) => {
  const form = useForm<DeleteCommentSchema>({
    resolver: zodResolver(deleteCommentSchema),
    defaultValues: { commentId },
  });

  const onSubmit = async (data: DeleteCommentSchema) => {
    const result = await deleteComment(data);

    if (result.success) {
      toast.success(result.message);
    }

    if (!result.success) {
      toast.error(result.message);
      return;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input type='hidden' {...form.register('commentId')} />

        <Button
          variant='destructive'
          size='icon'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2Icon className='animate-spin' />
          ) : (
            <TrashIcon />
          )}
        </Button>
      </form>
    </Form>
  );
};
