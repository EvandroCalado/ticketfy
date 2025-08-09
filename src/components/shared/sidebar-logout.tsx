'use client';

import { useActionState } from 'react';

import { Loader2Icon, LogOutIcon } from 'lucide-react';

import { signOut } from '@/actions/sign-out';
import { ACTION_STATE } from '@/constants/action-state';

import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export const SidebarLogout = () => {
  const [, formAction, isPending] = useActionState(signOut, ACTION_STATE);

  return (
    <div className='mt-auto'>
      <Separator />

      <form action={formAction} className='p-3'>
        <Button
          type='submit'
          disabled={isPending}
          className='text-destructive hover:text-destructive hover:bg-destructive/10 w-full justify-start bg-transparent'
          title='Sair'
          aria-label='Sair'
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
      </form>
    </div>
  );
};
