'use client';

import { useActionState } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ACTION_STATE } from '@/constants/action-state';
import { useFeedbackState } from '@/hooks/use-feedback-state';

import { forgotPassword } from '../actions/forgot-password';

export const ForgotPasswordForm = () => {
  const [state, formAction, isPending] = useActionState(
    forgotPassword,
    ACTION_STATE,
  );

  useFeedbackState(state, {
    onSuccess: () => {
      toast.success(state.message);
    },
    onError: () => {
      toast.error(state.message);
    },
  });

  return (
    <form action={formAction} className='space-y-6'>
      <div className='relative'>
        <Label htmlFor='email' className='mb-1'>
          Email
        </Label>
        <Input type='email' id='email' name='email' />

        {state.fieldErrors?.email && (
          <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
            {state.fieldErrors.email}
          </span>
        )}
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
};
