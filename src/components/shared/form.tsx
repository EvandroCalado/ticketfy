'use client';

import { useRouter } from 'next/navigation';
import { ComponentProps, useActionState } from 'react';

import { toast } from 'sonner';

import { createTicket } from '@/app/(ticketfy)/ticket/create/actions/create-ticket';
import { CREATE_TICKET_STATE } from '@/app/(ticketfy)/ticket/create/constants/initial-create-state';
import { useStateFeedback } from '@/app/(ticketfy)/ticket/create/hooks/use-state-feedback';
import { ticketsPath } from '@/utils/paths';

type FormProps = ComponentProps<'form'>;
export const Form = ({ children, ...props }: FormProps) => {
  const [state, dispatch] = useActionState(createTicket, CREATE_TICKET_STATE);

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
    <form {...props} className='space-y-6' action={dispatch}>
      {children}
    </form>
  );
};
