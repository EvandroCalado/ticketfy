'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ACTION_STATE } from '@/constants/action-state';
import { homePath } from '@/utils/paths';

import { signUp } from '../actions/sign-up';

export const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState(signUp, ACTION_STATE);

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push(homePath());
    }

    if (!state.success && state.message) {
      toast.error(state.message);
      router.refresh();
    }
  }, [router, state.message, state.success]);

  return (
    <form action={formAction} className='space-y-6'>
      <div className='relative'>
        <Label htmlFor='name' className='mb-1'>
          Nome
        </Label>
        <Input
          id='name'
          type='text'
          name='name'
          defaultValue={(state.payload?.get('name') as string) || ''}
        />

        {state.fieldErrors?.email && (
          <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
            {state.fieldErrors.email}
          </span>
        )}
      </div>

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

      <div className='relative'>
        <Label htmlFor='confirmPassword' className='mb-1'>
          Confirme a senha
        </Label>
        <Input
          id='confirmPassword'
          type='password'
          name='confirmPassword'
          defaultValue={(state.payload?.get('confirmPassword') as string) || ''}
        />

        {state.fieldErrors?.confirmPassword && (
          <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
            {state.fieldErrors.confirmPassword}
          </span>
        )}
      </div>

      <Button type='submit' className='mt-4 w-full' disabled={isPending}>
        {isPending ? 'Cadastrando...' : 'Cadastrar'}
      </Button>
    </form>
  );
};
