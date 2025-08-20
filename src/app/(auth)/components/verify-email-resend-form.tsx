'use client';

import { useActionState, useEffect } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { ACTION_STATE } from '@/constants/action-state';

import { verifyEmailResendAction } from '../actions/verify-email-resend';

export const VerifyEmailResendForm = () => {
  const [state, formAction, isPending] = useActionState(
    verifyEmailResendAction,
    ACTION_STATE,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }

    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Button className='w-full' variant={'outline'}>
        {isPending ? 'Reenviando...' : 'Reenviar código'}
      </Button>
    </form>
  );
};
