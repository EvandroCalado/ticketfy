'use client';

import Link from 'next/link';

import { signOut } from '@/actions/sign-out';
import { useAuth } from '@/hooks/use-auth';
import { signInPath, signUpPath } from '@/utils/paths';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { DarkMode } from './dark-mode';
import { HeaderLinks } from './header-links';
import { Logo } from './logo';
import { SubmitButton } from './submit-button';

export const Header = () => {
  const [user, isFetchUser] = useAuth();

  if (!isFetchUser) return null;

  return (
    <header className='border-border animate-header-from-top bg-background absolute top-0 right-0 left-0 z-50 m-5'>
      <Card className='mx-auto flex max-w-3xl flex-row items-center justify-between p-3'>
        <Logo />

        <HeaderLinks />

        <div className='flex items-center gap-2 md:gap-3'>
          <DarkMode />

          {user ? (
            <form action={signOut}>
              <SubmitButton className='w-24'>Sair</SubmitButton>
            </form>
          ) : (
            <>
              <Button variant='ghost' className='w-24' asChild>
                <Link href={signUpPath()}>Cadastrar</Link>
              </Button>

              <Button className='w-24' asChild>
                <Link href={signInPath()}>Entrar</Link>
              </Button>
            </>
          )}
        </div>
      </Card>
    </header>
  );
};
