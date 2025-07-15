'use client';

import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';

import { toast } from 'sonner';

import { CreateTicketState } from '@/app/(ticketfy)/ticket/create/constants/initial-create-state';
import { useStateFeedback } from '@/app/(ticketfy)/ticket/create/hooks/use-state-feedback';
import { ticketsPath } from '@/utils/paths';

type FormProps = ComponentProps<'form'> & {
  state: CreateTicketState;
};

export const Form = ({ state, ...props }: FormProps) => {
  const router = useRouter();

  useStateFeedback(state, {
    onSuccess: ({ state }) => {
      toast.success(state.message);
      router.push(ticketsPath());
    },
    onError: ({ state }) => {
      toast.error(state.message);
    },
  });

  return (
    <form {...props} className='space-y-6'>
      {props.children}
    </form>
  );
};
