'use client';

import { useActionState } from 'react';

import { Loader2Icon, LogOutIcon } from 'lucide-react';

import { signOut } from '@/actions/sign-out';
import { INITIAL_ACTION_STATE } from '@/constants/initial-create-state';

import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Form } from './form';

export const SidebarLogout = () => {
  const [state, dispatch, isPending] = useActionState(
    signOut,
    INITIAL_ACTION_STATE,
  );

  return (
    <div className='mt-auto'>
      <Separator />

      <Form state={state} action={dispatch} className='p-3'>
        <Button
          type='submit'
          disabled={isPending}
          className='text-destructive hover:text-destructive hover:bg-destructive/10 w-full justify-start bg-transparent'
        >
          {isPending ? (
            <Loader2Icon className='animate-spin' />
          ) : (
            <LogOutIcon />
          )}
          <span className='pointer-events-none text-left transition-opacity duration-200 md:invisible md:opacity-0 md:group-hover:visible md:group-hover:opacity-100'>
            {isPending ? 'Saindo...' : 'Sair'}
          </span>
        </Button>
      </Form>
    </div>
  );
};
