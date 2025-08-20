'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { Label } from '@radix-ui/react-label';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ACTION_STATE } from '@/constants/action-state';
import { signInPath } from '@/utils/paths';

import { resetPassword } from '../actions/reset-password';

type ResetPasswordFormProps = {
  tokenId: string;
};

export const ResetPasswordForm = ({ tokenId }: ResetPasswordFormProps) => {
  const [state, formAction, isPending] = useActionState(
    resetPassword.bind(null, tokenId),
    ACTION_STATE,
  );

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push(signInPath());
    }

    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className='space-y-6'>
      <div className='relative'>
        <Label htmlFor='password' className='mb-1'>
          Senha
        </Label>
        <Input
          type='password'
          id='password'
          name='password'
          defaultValue={(state.payload?.get('password') as string) || ''}
        />

        {state.fieldErrors?.password && (
          <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
            {state.fieldErrors.password}
          </span>
        )}
      </div>

      <div className='relative'>
        <Label htmlFor='confirmPassword' className='mb-1'>
          Confirmar senha
        </Label>
        <Input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          defaultValue={(state.payload?.get('confirmPassword') as string) || ''}
        />

        {state.fieldErrors?.confirmPassword && (
          <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
            {state.fieldErrors.confirmPassword}
          </span>
        )}
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
};
