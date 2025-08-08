'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { TICKET_STATUS } from '@/constants/ticket-status';
import { Prisma } from '@/generated/prisma';
import { fromCent } from '@/utils/format-currency';
import { ticketPath } from '@/utils/paths';

import { updateTicket } from '../actions/update-ticket';
import { UpdateTicketSchema } from '../schemas/update-ticket';

type TicketEditFormProps = {
  ticket: Prisma.TicketGetPayload<{
    include: { user: { select: { name: true } } };
  }>;
};

export const TicketEditForm = ({ ticket }: TicketEditFormProps) => {
  const router = useRouter();

  const form = useForm<UpdateTicketSchema>({
    defaultValues: {
      title: ticket.title,
      content: ticket.content,
      status: ticket.status,
      deadline: ticket.deadline,
      bounty: fromCent(ticket.bounty.toString()),
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: UpdateTicketSchema) => {
    const result = await updateTicket(ticket.id, data);

    if (result.success) {
      toast.success(result.message);
    }

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    router.push(ticketPath(ticket.id));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='flex items-center gap-4'>
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
        </div>

        {/* <div className='flex flex-col items-center gap-5 md:flex-row'>
          <div className='relative w-full'>
            <Label htmlFor='title' className='text-muted-foreground mb-2'>
              Título
            </Label>
            <Input
              id='title'
              name='title'
              placeholder='Título do ticket'
              defaultValue={ticket.title}
            />

            {fieldErrors?.title && (
              <p className='text-destructive absolute -bottom-5 text-xs'>
                {formatErrorMessage(fieldErrors.title)}
              </p>
            )}
          </div>

          <div className='relative w-full md:w-[180px]'>
            <Label className='text-muted-foreground mb-2'>Status</Label>
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

            {fieldErrors?.status && (
              <p className='text-destructive absolute -bottom-5 text-xs'>
                {formatErrorMessage(fieldErrors.status)}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor='content' className='text-muted-foreground mb-2'>
            Conteúdo
          </Label>
          <Textarea
            id='content'
            name='content'
            className='min-h-48'
            placeholder='Conteúdo do ticket'
            defaultValue={ticket.content}
          />
        </div>

        <div className='flex items-center gap-5'>
          <div className='relative w-full'>
            <Label htmlFor='deadline' className='text-muted-foreground mb-2'>
              Prazo
            </Label>
            <DatePicker
              id='deadline'
              name='deadline'
              defaultValue={ticket.deadline}
            />

            {fieldErrors?.deadline && (
              <p className='text-destructive absolute -bottom-5 text-xs'>
                {formatErrorMessage(fieldErrors.deadline)}
              </p>
            )}
          </div>

          <div className='relative w-full'>
            <Label htmlFor='bounty' className='text-muted-foreground mb-2'>
              Bônus(R$)
            </Label>
            <Input
              id='bounty'
              name='bounty'
              type='number'
              placeholder='Bônus do ticket'
              defaultValue={fromCent(ticket.bounty)}
            />

            {fieldErrors?.bounty && (
              <p className='text-destructive absolute -bottom-5 text-xs'>
                {formatErrorMessage(fieldErrors.bounty)}
              </p>
            )}
          </div>
        </div> */}

        <Button
          type='submit'
          disabled={form.formState.isSubmitting}
          className='w-full'
        >
          {form.formState.isSubmitting ? 'Atualizando...' : 'Atualizar'}
        </Button>
      </form>
    </Form>
  );
};
