'use client';

import { useActionState, useEffect } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ACTION_STATE } from '@/constants/action-state';

import { changePassword } from '../actions/change-password';

export const ChangePasswordForm = () => {
  const [state, formAction, isPending] = useActionState(
    changePassword,
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
    <form action={formAction} className='space-y-6'>
      <div className='relative'>
        <Label htmlFor='password' className='mb-1'>
          Senha
        </Label>
        <Input type='password' id='password' name='password' />

        {state.fieldErrors?.password && (
          <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
            {state.fieldErrors.password}
          </span>
        )}
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
};
