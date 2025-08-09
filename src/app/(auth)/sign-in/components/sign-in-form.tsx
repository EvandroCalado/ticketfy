'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ACTION_STATE } from '@/constants/action-state';
import { ticketsPath } from '@/utils/paths';

import { signIn } from '../actions/sign-in';

export const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(signIn, ACTION_STATE);

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push(ticketsPath());
    }

    if (!state.success && state.message) {
      toast.error(state.message);
      router.refresh();
    }
  }, [router, state.message, state.success]);

  return (
    <form action={formAction} className='space-y-6'>
      <div className='relative'>
        <Label htmlFor='email' className='mb-1'>
          Email
        </Label>
        <Input
          id='email'
          type='email'
          name='email'
          defaultValue={(state.payload?.get('email') as string) || ''}
        />

        {state.fieldErrors?.email && (
          <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
            {state.fieldErrors.email}
          </span>
        )}
      </div>

      <div className='relative'>
        <Label htmlFor='password' className='mb-1'>
          Senha
        </Label>
        <Input
          id='password'
          type='password'
          name='password'
          defaultValue={(state.payload?.get('password') as string) || ''}
        />

        {state.fieldErrors?.password && (
          <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
            {state.fieldErrors.password}
          </span>
        )}
      </div>

      <Link
        href='/forgot-password'
        className='text-primary block text-right text-sm hover:underline hover:underline-offset-4'
      >
        Esqueceu a senha?
      </Link>

      <Button type='submit' className='mt-4 w-full' disabled={isPending}>
        {isPending ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  );
};
