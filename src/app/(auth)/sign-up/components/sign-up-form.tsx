'use client';

import { useActionState } from 'react';

import { Form } from '@/components/shared/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { INITIAL_ACTION_STATE } from '@/constants/initial-create-state';
import { formatErrorMessage } from '@/utils/format-error-message';
import { ticketsPath } from '@/utils/paths';

import { signUp } from '../actions/sign-up';

export const SignUpForm = () => {
  const [state, dispatch, isPending] = useActionState(
    signUp,
    INITIAL_ACTION_STATE,
  );

  const { fieldErrors, payload } = state;

  return (
    <Form state={state} action={dispatch} redirect={ticketsPath()}>
      <div className='relative'>
        <Label htmlFor='username' className='mb-1'>
          Usuário
        </Label>
        <Input
          id='username'
          name='username'
          type='text'
          defaultValue={(payload?.get('username') as string) || ''}
        />

        {fieldErrors?.username && (
          <p className='text-destructive absolute -bottom-5 text-xs'>
            {formatErrorMessage(fieldErrors.username)}
          </p>
        )}
      </div>

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

      <div className='relative'>
        <Label htmlFor='confirmPassword' className='mb-1'>
          Confirmar Senha
        </Label>
        <Input
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          defaultValue={(payload?.get('confirmPassword') as string) || ''}
        />

        {fieldErrors?.confirmPassword && (
          <p className='text-destructive absolute -bottom-5 text-xs'>
            {formatErrorMessage(fieldErrors.confirmPassword)}
          </p>
        )}
      </div>

      <Button type='submit' className='mt-4 w-full' disabled={isPending}>
        {isPending ? 'Cadastrando...' : 'Cadastrar'}
      </Button>
    </Form>
  );
};
