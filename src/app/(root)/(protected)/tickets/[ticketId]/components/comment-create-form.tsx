'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { createComment } from '../actions/create-comment';
import {
  CreateCommentSchema,
  createCommentSchema,
} from '../schemas/create-comment';

type CommentCreateFormProps = {
  ticketId: string;
};

export const CommentCreateForm = ({ ticketId }: CommentCreateFormProps) => {
  const form = useForm<CreateCommentSchema>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      content: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: CreateCommentSchema) => {
    const result = await createComment(ticketId, data);

    if (result.success) {
      toast.success(result.message);
    }

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    form.reset();
  };
  return (
    <Form {...form}>
      <form
        className='flex flex-col items-end gap-2'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem className='relative w-full'>
              <FormControl>
                <Textarea id='content' {...field} />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs' />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={form.formState.isSubmitting}
          className='w-fit'
        >
          {form.formState.isSubmitting ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>
    </Form>
  );
};
