'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ticketsPath } from '@/utils/paths';

import { createTicket } from '../actions/create-ticket';
import {
  CreateTicketSchema,
  createTicketSchema,
} from '../schemas/create-ticket';

export const TicketCreateForm = () => {
  const router = useRouter();

  const form = useForm<CreateTicketSchema>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: '',
      content: '',
      deadline: '',
      bounty: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: CreateTicketSchema) => {
    const result = await createTicket(data);

    if (result.success) {
      toast.success(result.message);
    }

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    router.push(ticketsPath());
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel htmlFor='title'>Título</FormLabel>
              <FormControl>
                <Input id='title' type='text' {...field} />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel htmlFor='content'>Conteúdo</FormLabel>
              <FormControl>
                <Textarea id='content' {...field} />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs' />
            </FormItem>
          )}
        />

        <div className='flex items-center gap-4'>
          <FormField
            control={form.control}
            name='deadline'
            render={({ field }) => (
              <FormItem className='relative w-full'>
                <FormLabel htmlFor='deadline'>Data</FormLabel>
                <FormControl>
                  <Input id='deadline' type='date' {...field} />
                </FormControl>
                <FormMessage className='absolute -bottom-5 text-xs' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bounty'
            render={({ field }) => (
              <FormItem className='relative w-full'>
                <FormLabel htmlFor='bounty'>Bônus</FormLabel>
                <FormControl>
                  <Input id='bounty' type='number' {...field} />
                </FormControl>
                <FormMessage className='absolute -bottom-5 text-xs' />
              </FormItem>
            )}
          />
        </div>

        <Button
          type='submit'
          disabled={form.formState.isSubmitting}
          className='mt-4 w-full'
        >
          {form.formState.isSubmitting ? 'Criando...' : 'Criar'}
        </Button>
      </form>
    </Form>
  );
};
