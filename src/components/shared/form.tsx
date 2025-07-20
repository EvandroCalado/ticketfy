'use client';

import { ComponentProps, FormHTMLAttributes } from 'react';

import { toast } from 'sonner';

import { InitialState } from '@/app/(root)/ticket/create/constants/initial-create-state';
import { useStateFeedback } from '@/hooks/use-state-feedback';

type FormProps = ComponentProps<'form'> & {
  state: InitialState;
  action: FormHTMLAttributes<HTMLFormElement>;
};

export const Form = ({ state, action, ...props }: FormProps) => {
  useStateFeedback(state, {
    onSuccess: ({ state }) => {
      toast.success(state.message);
    },
    onError: ({ state }) => {
      toast.error(state.message);
    },
  });

  return (
    <form {...props} className='space-y-6' action={action}>
      {props.children}
    </form>
  );
};
