'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import { Form } from '@/components/shared/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { INITIAL_ACTION_STATE } from '@/constants/initial-create-state';
import { formatErrorMessage } from '@/utils/format-error-message';
import { ticketsPath } from '@/utils/paths';

import { signIn } from '../actions/sign-in';

export const SignInForm = () => {
  const [state, dispatch, isPending] = useActionState(
    signIn,
    INITIAL_ACTION_STATE,
  );

  const { fieldErrors, payload } = state;

  return (
    <Form state={state} action={dispatch} redirect={ticketsPath()}>
      <div className='relative'>
        <Label htmlFor='email' className='mb-1'>
          Email
        </Label>
        <Input
          id='email'
          name='email'
          type='email'
          defaultValue={(payload?.get('email') as string) || ''}
        />

        {fieldErrors?.email && (
          <p className='text-destructive absolute -bottom-5 text-xs'>
            {formatErrorMessage(fieldErrors.email)}
          </p>
        )}
      </div>

      <div className='relative'>
        <Label htmlFor='password' className='mb-1'>
          Senha
        </Label>
        <Input
          id='password'
          name='password'
          type='password'
          defaultValue={(payload?.get('password') as string) || ''}
        />

        {fieldErrors?.password && (
          <p className='text-destructive absolute -bottom-5 text-xs'>
            {formatErrorMessage(fieldErrors.password)}
          </p>
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
    </Form>
  );
};
