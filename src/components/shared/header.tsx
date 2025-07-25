'use client';

import Link from 'next/link';

import { useAuth } from '@/hooks/use-auth';
import { signInPath } from '@/utils/paths';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { DarkMode } from './dark-mode';
import { HeaderLinks } from './header-links';
import { Logo } from './logo';

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

          {!user && (
            <Button asChild>
              <Link href={signInPath()}>Entrar</Link>
            </Button>
          )}
        </div>
      </Card>
    </header>
  );
};
