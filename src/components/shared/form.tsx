'use client';

import { useRouter } from 'next/navigation';
import { ComponentProps, FormHTMLAttributes } from 'react';

import { toast } from 'sonner';

import { InitialActionsState } from '@/constants/initial-create-state';
import { useStateFeedback } from '@/hooks/use-state-feedback';

type FormProps = ComponentProps<'form'> & {
  state: InitialActionsState;
  action: FormHTMLAttributes<HTMLFormElement>;
  redirect?: string;
};

export const Form = ({ state, action, redirect, ...props }: FormProps) => {
  const router = useRouter();

  useStateFeedback(state, {
    onSuccess: ({ state }) => {
      toast.success(state.message);
      if (redirect) {
        router.push(redirect);
      }
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
