'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ACTION_STATE } from '@/constants/action-state';
import { ticketsPath } from '@/utils/paths';

import { verifyEmail } from '../actions/verify-email';

export const VerifyEmailForm = () => {
  const [state, formAction, isPending] = useActionState(
    verifyEmail,
    ACTION_STATE,
  );

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push(ticketsPath());
    }

    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [router, state]);

  return (
    <form action={formAction} className='space-y-6'>
      <div className='relative'>
        <Label htmlFor='code' className='mb-1'>
          Código de verificação
        </Label>
        <Input type='text' id='code' name='code' />

        {state.fieldErrors?.code && (
          <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
            {state.fieldErrors.code}
          </span>
        )}
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending ? 'Verificando...' : 'Verificar'}
      </Button>
    </form>
  );
};
