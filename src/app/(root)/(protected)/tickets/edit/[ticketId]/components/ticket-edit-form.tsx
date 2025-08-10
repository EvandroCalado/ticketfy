'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ACTION_STATE } from '@/constants/action-state';
import { TICKET_STATUS } from '@/constants/ticket-status';
import { Prisma } from '@/generated/prisma';
import { fromCent } from '@/utils/format-currency';
import { ticketPath } from '@/utils/paths';

import { updateTicket } from '../actions/update-ticket';

type TicketEditFormProps = {
  ticket: Prisma.TicketGetPayload<{
    include: { user: { select: { name: true } } };
  }>;
};

export const TicketEditForm = ({ ticket }: TicketEditFormProps) => {
  const [state, formAction, isPending] = useActionState(
    updateTicket.bind(null, ticket.id),
    ACTION_STATE,
  );

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push(ticketPath(ticket.id));
    }

    if (!state.success && state.message) {
      toast.error(state.message);
      router.refresh();
    }
  }, [router, state.message, state.success, ticket.id]);

  return (
    <form action={formAction} className='space-y-6'>
      <div className='flex items-center gap-6'>
        <div className='relative w-full'>
          <Label htmlFor='title' className='mb-1'>
            Título
          </Label>
          <Input
            id='title'
            type='text'
            name='title'
            defaultValue={ticket.title}
          />

          {state.fieldErrors?.title && (
            <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
              {state.fieldErrors.title}
            </span>
          )}
        </div>

        <div className='relative'>
          <Label className='mb-1'>Status</Label>
          <Select name='status' defaultValue={ticket.status}>
            <SelectTrigger
              className='w-full md:w-[180px]'
              aria-label='Status do ticket'
              title='Status do ticket'
            >
              <SelectValue placeholder='Status' />
            </SelectTrigger>

            <SelectContent>
              {Object.keys(TICKET_STATUS).map(status => (
                <SelectItem key={status} value={status}>
                  {TICKET_STATUS[status as keyof typeof TICKET_STATUS]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {state.fieldErrors?.status && (
            <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
              {state.fieldErrors.status}
            </span>
          )}
        </div>
      </div>

      <div className='relative'>
        <Label htmlFor='content' className='mb-1'>
          Conteúdo
        </Label>
        <Textarea id='content' name='content' defaultValue={ticket.content} />

        {state.fieldErrors?.content && (
          <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
            {state.fieldErrors.content}
          </span>
        )}
      </div>

      <div className='flex items-center gap-4'>
        <div className='relative w-full'>
          <Label htmlFor='deadline' className='mb-1'>
            Data
          </Label>
          <Input
            id='deadline'
            type='date'
            name='deadline'
            defaultValue={ticket.deadline.split('T')[0]}
          />

          {state.fieldErrors?.deadline && (
            <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
              {state.fieldErrors.deadline}
            </span>
          )}
        </div>

        <div className='relative w-full'>
          <Label htmlFor='bounty' className='mb-1'>
            Bônus
          </Label>
          <Input
            id='bounty'
            type='number'
            name='bounty'
            defaultValue={fromCent(ticket.bounty.toString())}
          />

          {state.fieldErrors?.bounty && (
            <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
              {state.fieldErrors.bounty}
            </span>
          )}
        </div>
      </div>

      {/* <div className='flex items-center gap-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='relative w-full'>
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
          name='status'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel htmlFor='title'>Status</FormLabel>
              <Select
                name='status'
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger
                    className='w-full md:w-[180px]'
                    aria-label='Status do ticket'
                    title='Status do ticket'
                  >
                    <SelectValue placeholder='Status' />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {Object.keys(TICKET_STATUS).map(status => (
                    <SelectItem key={status} value={status}>
                      {TICKET_STATUS[status as keyof typeof TICKET_STATUS]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className='absolute -bottom-5 text-xs' />
            </FormItem>
          )}
        />
      </div>

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
      </div> */}

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? 'Atualizando...' : 'Atualizar'}
      </Button>
    </form>
  );
};
